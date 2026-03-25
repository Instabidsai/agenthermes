'use client'

import { useState, useEffect } from 'react'
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
} from 'lucide-react'
import clsx from 'clsx'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

type AuditTier = 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'

interface CategoryResult {
  category: string
  label: string
  score: number
  max_score: number
  details: Record<string, unknown>
  recommendations: string[]
}

interface AuditScorecard {
  business_name: string
  domain: string
  total_score: number
  tier: AuditTier
  categories: CategoryResult[]
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
  nextSteps: string[]
  errorMessage: string
}

const categoryIcons: Record<string, typeof Shield> = {
  machine_readable_profile: Globe,
  mcp_api_endpoints: Server,
  agent_native_onboarding: UserCheck,
  structured_pricing: CreditCard,
  agent_payment_acceptance: Wallet,
}

function getStatus(score: number, maxScore: number): 'pass' | 'warn' | 'fail' {
  const pct = maxScore > 0 ? score / maxScore : 0
  if (pct >= 0.7) return 'pass'
  if (pct >= 0.35) return 'warn'
  return 'fail'
}

export default function AuditPage() {
  const [domainInput, setDomainInput] = useState('')
  const [audit, setAudit] = useState<AuditState>({
    phase: 'idle',
    domain: '',
    totalScore: 0,
    tier: 'unaudited',
    categories: [],
    nextSteps: [],
    errorMessage: '',
  })
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  )

  useEffect(() => {
    document.title = 'Audit | AgentHermes'
  }, [])

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const runAudit = async () => {
    const domain = domainInput.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    if (!domain) return

    setAudit({
      phase: 'running',
      domain,
      totalScore: 0,
      tier: 'unaudited',
      categories: [],
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

      setAudit({
        phase: 'complete',
        domain: scorecard.domain || domain,
        totalScore: scorecard.total_score,
        tier: scorecard.tier as AuditTier,
        categories: scorecard.categories,
        nextSteps: scorecard.next_steps || [],
        errorMessage: '',
      })

      // Expand all categories by default
      setExpandedCategories(new Set(scorecard.categories.map((c) => c.category)))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Audit failed. Please try again.'
      setAudit((prev) => ({
        ...prev,
        phase: 'error',
        errorMessage: message,
      }))
    }
  }

  const statusIcon = (status: 'pass' | 'warn' | 'fail') => {
    if (status === 'pass') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    if (status === 'warn') return <AlertCircle className="h-4 w-4 text-amber-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-5">
          <Shield className="h-7 w-7 text-emerald-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Agent-Readiness Audit
        </h1>
        <p className="text-zinc-400 max-w-md mx-auto">
          Enter your domain and we will score your business across 5
          machine-readability categories. Free. Takes 10-30 seconds.
        </p>
      </div>

      {/* Input */}
      <div className="mb-10">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="yourbusiness.com"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && audit.phase !== 'running' && runAudit()}
              disabled={audit.phase === 'running'}
              className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={runAudit}
            disabled={audit.phase === 'running' || !domainInput.trim()}
            className="px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-400 text-white font-semibold text-sm transition-colors flex items-center gap-2"
          >
            {audit.phase === 'running' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Auditing...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Run Audit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Running State */}
      {audit.phase === 'running' && (
        <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-zinc-300 mb-1">
            Auditing {audit.domain}
          </p>
          <p className="text-xs text-zinc-500">
            Scanning machine-readable profiles, MCP endpoints, onboarding flows, pricing, and payment capabilities...
          </p>
          <p className="text-xs text-zinc-600 mt-3">
            This usually takes 10-30 seconds.
          </p>
        </div>
      )}

      {/* Error State */}
      {audit.phase === 'error' && (
        <div className="p-8 rounded-xl bg-red-950/20 border border-red-800/40 text-center">
          <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-sm font-medium text-red-300 mb-1">
            Audit Failed
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

      {/* Results */}
      {audit.phase === 'complete' && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <ScoreGauge score={audit.totalScore} size="lg" />
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                  <h2 className="text-xl font-bold">{audit.domain}</h2>
                  <TierBadge tier={audit.tier} size="md" />
                </div>
                <p className="text-sm text-zinc-400 mb-3">
                  Your business scored{' '}
                  <span className="text-zinc-200 font-semibold">
                    {audit.totalScore}/100
                  </span>{' '}
                  on agent readiness.
                </p>
                <p className="text-xs text-zinc-500">
                  {audit.totalScore >= 90
                    ? 'Outstanding. Your business is fully agent-ready.'
                    : audit.totalScore >= 75
                      ? 'Great foundation. A few improvements will unlock full agent capabilities.'
                      : audit.totalScore >= 60
                        ? 'Good progress. Improvements needed for higher-tier agent transactions.'
                        : audit.totalScore >= 40
                          ? 'Moderate readiness. Significant improvements needed for agent transactions.'
                          : 'Low readiness. Your business is not yet discoverable by autonomous agents.'}
                </p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3">
            {audit.categories.map((cat) => {
              const isExpanded = expandedCategories.has(cat.category)
              const Icon = categoryIcons[cat.category] || Shield
              const pct = cat.max_score > 0 ? Math.round((cat.score / cat.max_score) * 100) : 0
              const status = getStatus(cat.score, cat.max_score)

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
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex-shrink-0">
                      <Icon className="h-4 w-4 text-zinc-300" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-zinc-200">
                          {cat.label}
                        </span>
                        {statusIcon(status)}
                      </div>
                      {/* Score bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
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
                        <span className="text-xs font-mono text-zinc-500 tabular-nums flex-shrink-0">
                          {cat.score}/{cat.max_score}
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
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          {audit.totalScore < 60 && (
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-emerald-800/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-200 mb-1">
                    Need help getting agent-ready?
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
          )}

          {/* Register CTA */}
          <div className="text-center pt-4">
            <p className="text-sm text-zinc-500 mb-3">
              Ready to join the network?
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
            >
              Register Your Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
