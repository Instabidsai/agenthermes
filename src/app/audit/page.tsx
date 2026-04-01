'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Shield,
  Globe,
  Server,
  UserCheck,
  CreditCard,
  Wallet,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Code2,
  Zap,
  Share2,
  Link2,
  Mail,
  Bell,
} from 'lucide-react'
import clsx from 'clsx'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'
import AgentJourneyScore from '@/components/AgentJourneyScore'

type AuditTier = 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'

interface CategoryResult {
  category: string
  label: string
  score: number
  max_score: number
  details: Record<string, unknown>
  recommendations: string[]
}

interface DimensionResult {
  dimension: string
  score: number
  label?: string
  weight?: number
}

interface ARLData {
  level: number
  name: string
  description: string
  nextLevel: {
    level: number
    name: string
    requirements: string[]
  } | null
  verticalContext?: string
}

interface AuditScorecard {
  business_name: string
  domain: string
  total_score: number
  tier: AuditTier
  categories: CategoryResult[]
  dimensions?: DimensionResult[]
  arl?: ARLData
  audited_at: string
  next_steps: string[]
  business_id?: string
  error?: string
}

interface AuditState {
  phase: 'idle' | 'running' | 'complete' | 'error'
  domain: string
  totalScore: number
  tier: AuditTier
  categories: CategoryResult[]
  dimensions: DimensionResult[]
  arl?: ARLData
  nextSteps: string[]
  errorMessage: string
  businessId?: string
}

const categoryIcons: Record<string, typeof Shield> = {
  machine_readable_profile: Globe,
  mcp_api_endpoints: Server,
  agent_native_onboarding: UserCheck,
  structured_pricing: CreditCard,
  agent_payment_acceptance: Wallet,
}

const tierDescriptions: Record<string, { label: string; description: string; color: string }> = {
  unaudited: { label: 'Not Scored', description: 'Invisible to AI agents', color: 'text-red-500' },
  bronze: { label: 'Bronze', description: 'Partially discoverable by AI agents', color: 'text-amber-500' },
  silver: { label: 'Silver', description: 'Agent-usable with friction', color: 'text-zinc-300' },
  gold: { label: 'Gold', description: 'Fully agent-native', color: 'text-yellow-500' },
  platinum: { label: 'Platinum', description: 'Certified, battle-tested, zero-friction', color: 'text-emerald-400' },
}

// Remediation CTAs based on category
const remediationActions: Record<string, { label: string; href: (domain: string) => string; icon: typeof Shield }[]> = {
  machine_readable_profile: [
    { label: 'Generate llms.txt', href: (d) => `/remediate?domain=${d}&fix=llms-txt`, icon: FileText },
    { label: 'Generate Agent Card', href: (d) => `/remediate?domain=${d}&fix=agent-card`, icon: Shield },
  ],
  mcp_api_endpoints: [
    { label: 'Generate OpenAPI Spec', href: (d) => `/remediate?domain=${d}&fix=openapi`, icon: Code2 },
  ],
  structured_pricing: [
    { label: 'Talk to AffixedAI', href: () => 'https://affixed.ai', icon: ExternalLink },
  ],
  agent_native_onboarding: [
    { label: 'Generate Onboarding Flow', href: (d) => `/remediate?domain=${d}&fix=onboarding`, icon: Zap },
  ],
  agent_payment_acceptance: [
    { label: 'Set Up Agent Payments', href: (d) => `/remediate?domain=${d}&fix=payments`, icon: Wallet },
  ],
}

function getStatus(score: number, maxScore: number): 'pass' | 'warn' | 'fail' {
  const pct = maxScore > 0 ? score / maxScore : 0
  if (pct >= 0.75) return 'pass'
  if (pct >= 0.4) return 'warn'
  return 'fail'
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-emerald-400'
  if (score >= 75) return 'text-yellow-500'
  if (score >= 60) return 'text-zinc-300'
  if (score >= 40) return 'text-amber-500'
  return 'text-red-500'
}

function getTierFromScore(score: number): string {
  if (score >= 90) return 'Platinum'
  if (score >= 75) return 'Gold'
  if (score >= 60) return 'Silver'
  if (score >= 40) return 'Bronze'
  return 'Failing'
}

function AuditPageContent() {
  const searchParams = useSearchParams()
  const [domainInput, setDomainInput] = useState('')
  const [audit, setAudit] = useState<AuditState>({
    phase: 'idle',
    domain: '',
    totalScore: 0,
    tier: 'unaudited',
    categories: [],
    dimensions: [],
    nextSteps: [],
    errorMessage: '',
  })
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  )
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const [subscribeState, setSubscribeState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [subscribeError, setSubscribeError] = useState('')
  const [displayScore, setDisplayScore] = useState(0)

  // Count-up animation for the big score number
  useEffect(() => {
    if (audit.phase !== 'complete') {
      setDisplayScore(0)
      return
    }
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayScore(audit.totalScore)
      return
    }
    const target = audit.totalScore
    const duration = 1500
    const start = performance.now()
    let raf: number
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setDisplayScore(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [audit.phase, audit.totalScore])

  // Auto-run audit if domain is in query params
  useEffect(() => {
    const domainParam = searchParams.get('domain')
    if (domainParam && audit.phase === 'idle') {
      setDomainInput(domainParam)
      runAuditForDomain(domainParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const runAuditForDomain = async (rawDomain: string) => {
    const domain = rawDomain.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    if (!domain) return

    setAudit({
      phase: 'running',
      domain,
      totalScore: 0,
      tier: 'unaudited',
      categories: [],
      dimensions: [],
      arl: undefined,
      nextSteps: [],
      errorMessage: '',
    })

    try {
      const res = await fetch('/api/v1/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: domain }),
      })

      if (!res.ok) {
        const errBody = await res.json().catch(() => null)
        throw new Error(errBody?.error || `Audit failed with status ${res.status}`)
      }

      const scorecard: AuditScorecard = await res.json()

      const completedState: AuditState = {
        phase: 'complete',
        domain: scorecard.domain || domain,
        totalScore: scorecard.total_score,
        tier: scorecard.tier as AuditTier,
        categories: scorecard.categories,
        dimensions: scorecard.dimensions || [],
        arl: scorecard.arl,
        nextSteps: scorecard.next_steps || [],
        errorMessage: '',
        businessId: scorecard.business_id,
      }
      setAudit(completedState)

      // Expand failing categories by default
      const failingCats = scorecard.categories
        .filter((c) => getStatus(c.score, c.max_score) !== 'pass')
        .map((c) => c.category)
      setExpandedCategories(new Set(failingCats))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Audit failed. Please try again.'
      setAudit((prev) => ({
        ...prev,
        phase: 'error',
        errorMessage: message,
      }))
    }
  }

  const runAudit = async () => {
    await runAuditForDomain(domainInput)
  }

  const statusIcon = (status: 'pass' | 'warn' | 'fail') => {
    if (status === 'pass') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    if (status === 'warn') return <AlertCircle className="h-4 w-4 text-amber-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const embedCode = `<a href="https://agenthermes.ai/business/${audit.domain}"><img src="https://agenthermes.ai/api/badge/${audit.domain}" alt="Agent Readiness Score" /></a>`

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2000)
  }

  const handleSubscribe = async () => {
    const emailTrimmed = subscribeEmail.trim()
    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setSubscribeError('Please enter a valid email address.')
      setSubscribeState('error')
      return
    }
    setSubscribeState('submitting')
    setSubscribeError('')
    try {
      const res = await fetch('/api/v1/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailTrimmed,
          domain: audit.domain,
          score: audit.totalScore,
          tier: audit.tier,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Subscription failed.')
      }
      setSubscribeState('success')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setSubscribeError(msg)
      setSubscribeState('error')
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Your Agent Readiness Score
        </h1>
        <p className="text-zinc-400 max-w-lg mx-auto">
          Enter your domain to get scored across 9 dimensions of AI agent readiness.
          Free. Takes 10-30 seconds.
        </p>
      </div>

      {/* Input */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="yourbusiness.com"
              aria-label="Domain or URL to audit"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && audit.phase !== 'running' && runAudit()}
              disabled={audit.phase === 'running'}
              className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={runAudit}
            disabled={audit.phase === 'running' || !domainInput.trim()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-400 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {audit.phase === 'running' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Scoring...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Get Score
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results / Status Area */}
      <div aria-live="polite">
      {/* Running State — Scanner animation */}
      {audit.phase === 'running' && (
        <div className="p-10 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center animate-in fade-in duration-300">
          {/* Scanner icon with pulse ring */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute h-16 w-16 rounded-full border-2 border-emerald-500/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute h-20 w-20 rounded-full border border-emerald-500/10 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="relative h-14 w-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center">
              <Shield className="h-6 w-6 text-emerald-500 animate-pulse" />
            </div>
          </div>
          <p className="text-lg font-semibold text-zinc-200 mb-2">
            Scanning {audit.domain}
          </p>
          <p className="text-sm text-zinc-500 mb-4">
            Analyzing across 9 dimensions of agent readiness...
          </p>
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5">
            {['Profiles', 'APIs', 'Onboarding', 'Pricing', 'Payments', 'Security', 'Reliability'].map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
                <span className="text-[9px] text-zinc-600 hidden sm:block">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-zinc-600 mt-4">
            This usually takes 10-30 seconds.
          </p>
        </div>
      )}

      {/* Error State */}
      {audit.phase === 'error' && (
        <div className="p-8 rounded-xl bg-red-950/20 border border-red-800/40 text-center">
          <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-sm font-medium text-red-300 mb-1">
            Score Calculation Failed
          </p>
          <p className="text-xs text-red-400/80">
            {audit.errorMessage}
          </p>
          <button
            type="button"
            onClick={runAudit}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-800/50 hover:border-red-700/50 text-red-300 hover:text-red-200 text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results — fade in like opening a credit report */}
      {audit.phase === 'complete' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* HUGE Score Display — Credit report style with radial gradient */}
          <div className="relative p-10 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
            {/* Radial gradient behind score */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: audit.totalScore >= 90
                  ? 'radial-gradient(ellipse at center top, rgba(16,185,129,0.15) 0%, transparent 60%)'
                  : audit.totalScore >= 75
                    ? 'radial-gradient(ellipse at center top, rgba(234,179,8,0.12) 0%, transparent 60%)'
                    : audit.totalScore >= 60
                      ? 'radial-gradient(ellipse at center top, rgba(161,161,170,0.10) 0%, transparent 60%)'
                      : audit.totalScore >= 40
                        ? 'radial-gradient(ellipse at center top, rgba(245,158,11,0.10) 0%, transparent 60%)'
                        : 'radial-gradient(ellipse at center top, rgba(239,68,68,0.10) 0%, transparent 60%)',
              }}
            />
            <div className="relative flex flex-col items-center text-center">
              {/* Report header */}
              <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/30">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Agent Readiness Report</span>
              </div>

              {/* Giant score gauge */}
              <div className="mb-4">
                <ScoreGauge score={audit.totalScore} size="lg" />
              </div>

              {/* Massive numeric score — animated count-up */}
              <div className={clsx('text-7xl sm:text-8xl md:text-9xl font-black tabular-nums tracking-tighter mb-1', getScoreColor(audit.totalScore))}>
                {displayScore}
              </div>
              <p className="text-sm text-zinc-600 mb-5 tabular-nums">out of 100</p>

              {/* Tier badge — prominent with glow */}
              <div className="mb-4">
                <TierBadge tier={audit.tier} size="lg" />
              </div>

              {/* Tier description */}
              <p className={clsx('text-lg font-semibold mb-2', tierDescriptions[audit.tier]?.color || 'text-zinc-400')}>
                {getTierFromScore(audit.totalScore)}
              </p>
              <p className="text-sm text-zinc-500 max-w-md">
                {tierDescriptions[audit.tier]?.description || 'Your business has been scored.'}
              </p>

              {/* Domain label */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <Globe className="h-4 w-4 text-zinc-500" />
                <span className="text-sm font-medium text-zinc-300">{audit.domain}</span>
              </div>
            </div>
          </div>

          {/* Share Your Score */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-zinc-500 font-medium mr-1">
              <Share2 className="h-3.5 w-3.5 inline -mt-0.5 mr-1" />
              Share your score
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I scored ${audit.totalScore}/100 on the Agent Readiness Score by @AgentHermes. Is your business agent-ready? Check yours free \u2192 agenthermes.ai`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600/50 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Post on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://agenthermes.ai/audit?domain=${audit.domain}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600/50 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`https://agenthermes.ai/audit?domain=${audit.domain}`)
                setCopiedLink(true)
                setTimeout(() => setCopiedLink(false), 2000)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600/50 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Link2 className="h-3.5 w-3.5" />
                  Copy Link
                </>
              )}
            </button>
          </div>

          {/* Email Capture — Score Change Notifications */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            {subscribeState === 'success' ? (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600/20 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-400">
                    You&apos;re subscribed!
                  </p>
                  <p className="text-xs text-zinc-500">
                    We&apos;ll email you when your score changes.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="h-4 w-4 text-zinc-400" />
                  <h3 className="text-sm font-semibold text-zinc-200">
                    Get notified when your score changes
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      aria-label="Email for score change notifications"
                      value={subscribeEmail}
                      onChange={(e) => {
                        setSubscribeEmail(e.target.value)
                        if (subscribeState === 'error') {
                          setSubscribeState('idle')
                          setSubscribeError('')
                        }
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && subscribeState !== 'submitting' && handleSubscribe()}
                      disabled={subscribeState === 'submitting'}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-700/50 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSubscribe}
                    disabled={subscribeState === 'submitting' || !subscribeEmail.trim()}
                    className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600/50 text-zinc-200 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    {subscribeState === 'submitting' ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                {subscribeState === 'error' && subscribeError && (
                  <p className="mt-2 text-xs text-red-400">{subscribeError}</p>
                )}
                <p className="mt-2.5 text-[11px] text-zinc-600">
                  We&apos;ll alert you when your Agent Readiness Score changes — improvements or drops.
                </p>
              </>
            )}
          </div>

          {/* Agent Journey — 6-step pipeline */}
          {audit.dimensions.length > 0 && (
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <AgentJourneyScore
                dimensions={audit.dimensions.map((d) => ({
                  dimension: d.dimension,
                  score: d.score,
                }))}
                arl={audit.arl}
              />
            </div>
          )}

          {/* Category Breakdown — Score cards */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-zinc-200">Score Breakdown</h2>
            <div className="space-y-3">
              {audit.categories.map((cat) => {
                const isExpanded = expandedCategories.has(cat.category)
                const Icon = categoryIcons[cat.category] || Shield
                const pct = cat.max_score > 0 ? Math.round((cat.score / cat.max_score) * 100) : 0
                const status = getStatus(cat.score, cat.max_score)
                const actions = remediationActions[cat.category] || []

                // Flatten details into readable strings for display
                const detailStrings: string[] = []
                if (cat.details && typeof cat.details === 'object') {
                  for (const [key, value] of Object.entries(cat.details)) {
                    if (key.startsWith('_')) continue
                    if (typeof value === 'boolean') {
                      detailStrings.push(`${key.replace(/_/g, ' ')}: ${value ? 'Yes' : 'No'}`)
                    } else if (typeof value === 'string' || typeof value === 'number') {
                      detailStrings.push(`${key.replace(/_/g, ' ')}: ${value}`)
                    } else if (Array.isArray(value) && value.length > 0) {
                      if (typeof value[0] === 'string') {
                        detailStrings.push(`${key.replace(/_/g, ' ')}: ${value.join(', ')}`)
                      } else {
                        detailStrings.push(`${key.replace(/_/g, ' ')}: ${value.length} found`)
                      }
                    }
                  }
                }

                return (
                  <div
                    key={cat.category}
                    className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden"
                  >
                    {/* Header */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.category)}
                      className="w-full flex items-center gap-4 p-5 text-left hover:bg-zinc-800/20 transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex-shrink-0">
                        <Icon className="h-5 w-5 text-zinc-300" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm font-semibold text-zinc-200">
                            {cat.label}
                          </span>
                          {statusIcon(status)}
                        </div>
                        {/* Score bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className={clsx(
                                'h-full rounded-full transition-all duration-500',
                                status === 'pass' && 'bg-emerald-500',
                                status === 'warn' && 'bg-amber-500',
                                status === 'fail' && 'bg-red-500'
                              )}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold font-mono tabular-nums flex-shrink-0">
                            <span className={clsx(
                              status === 'pass' && 'text-emerald-500',
                              status === 'warn' && 'text-amber-500',
                              status === 'fail' && 'text-red-500'
                            )}>
                              {cat.score}
                            </span>
                            <span className="text-zinc-600">/{cat.max_score}</span>
                          </span>
                        </div>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                      )}
                    </button>

                    {/* Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-0">
                        <div className="border-t border-zinc-800/80 pt-4 space-y-4">
                          {/* Findings */}
                          {detailStrings.length > 0 && (
                            <div>
                              <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                                Findings
                              </h4>
                              <ul className="space-y-1.5">
                                {detailStrings.map((d, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-xs text-zinc-400"
                                  >
                                    <span className="text-zinc-600 mt-0.5">-</span>
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Recommendations */}
                          {cat.recommendations.length > 0 && (
                            <div>
                              <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                                Recommendations
                              </h4>
                              <ul className="space-y-1.5">
                                {cat.recommendations.map((r, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-xs text-zinc-400"
                                  >
                                    <ArrowRight className="h-3 w-3 text-emerald-500/60 mt-0.5 flex-shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Remediation CTAs — only show for failing/warning categories */}
                          {status !== 'pass' && actions.length > 0 && (
                            <div>
                              <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                                Fix It
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {actions.map((action) => {
                                  const ActionIcon = action.icon
                                  const href = action.href(audit.domain)
                                  const isExternal = href.startsWith('http')

                                  if (isExternal) {
                                    return (
                                      <a
                                        key={action.label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors"
                                      >
                                        <ActionIcon className="h-3 w-3" />
                                        {action.label}
                                      </a>
                                    )
                                  }

                                  return (
                                    <Link
                                      key={action.label}
                                      href={href}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors"
                                    >
                                      <ActionIcon className="h-3 w-3" />
                                      {action.label}
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Score Badge Preview + Embed Code */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <h3 className="text-sm font-bold text-zinc-200 mb-4">
              Embed Your Score
            </h3>
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Badge preview */}
              <div className="flex-shrink-0 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    'text-2xl font-black tabular-nums',
                    getScoreColor(audit.totalScore)
                  )}>
                    {audit.totalScore}
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Agent Readiness</div>
                    <div className="text-xs font-semibold text-zinc-400">{audit.domain}</div>
                  </div>
                  <div className="ml-2 text-[9px] text-emerald-600 font-medium">AgentHermes</div>
                </div>
              </div>

              {/* Embed code */}
              <div className="flex-1 min-w-0 w-full">
                <div className="relative">
                  <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-500 font-mono overflow-x-auto whitespace-pre-wrap break-all">
                    {embedCode}
                  </pre>
                  <button
                    type="button"
                    onClick={copyEmbed}
                    className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-[10px] font-medium transition-colors"
                  >
                    {copiedEmbed ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/remediate?domain=${audit.domain}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
            >
              <Zap className="h-4 w-4" />
              Fix Your Score
            </Link>
            <button
              type="button"
              onClick={() => runAuditForDomain(audit.domain)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
            >
              <Shield className="h-4 w-4" />
              Re-scan
            </button>
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
            >
              <FileText className="h-4 w-4" />
              View industry benchmarks
            </Link>
          </div>

          {/* Bottom CTAs */}
          <div className="space-y-4">
            {/* AffixedAI consulting CTA */}
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-emerald-800/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-200 mb-1">
                    Want to improve your score?
                  </h3>
                  <p className="text-xs text-zinc-500">
                    AffixedAI specializes in making businesses machine-readable
                    and agent-compatible. Get a free consultation.
                  </p>
                </div>
                <a
                  href="https://affixed.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors flex-shrink-0"
                >
                  Talk to AffixedAI
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Register / Claim profile CTA */}
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-200 mb-1">
                    Own this profile
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Claim your business on AgentHermes to manage your score, track improvements, and appear in agent queries.
                  </p>
                </div>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors flex-shrink-0"
                >
                  Claim Your Profile
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Idle state — show what to expect */}
      {audit.phase === 'idle' && !searchParams.get('domain') && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-6">
            <Shield className="h-10 w-10 text-zinc-700" />
          </div>
          <p className="text-sm text-zinc-600 max-w-sm mx-auto">
            Enter a domain above to see how AI agents evaluate your business.
            We score 9 dimensions that determine whether agents can discover,
            use, and pay you.
          </p>
        </div>
      )}
      </div>
    </div>
  )
}

export default function AuditPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mx-auto" />
        </div>
      }
    >
      <AuditPageContent />
    </Suspense>
  )
}
