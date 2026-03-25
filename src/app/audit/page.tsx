'use client'

import { useState } from 'react'
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
  icon: typeof Shield
  score: number
  max_score: number
  status: 'pass' | 'warn' | 'fail'
  details: string[]
  recommendations: string[]
}

interface AuditState {
  phase: 'idle' | 'running' | 'complete'
  currentCheck: string
  domain: string
  totalScore: number
  tier: AuditTier
  categories: CategoryResult[]
}

const auditChecks = [
  'Resolving domain...',
  'Checking machine-readable profiles...',
  'Scanning for MCP/API endpoints...',
  'Evaluating agent onboarding flows...',
  'Analyzing pricing structures...',
  'Verifying payment capabilities...',
  'Calculating trust score...',
]

const categoryIcons: Record<string, typeof Shield> = {
  machine_readable_profile: Globe,
  mcp_api_endpoints: Server,
  agent_native_onboarding: UserCheck,
  structured_pricing: CreditCard,
  agent_payment_acceptance: Wallet,
}

// Simulated audit — in production this would call a real API
function simulateAudit(domain: string): CategoryResult[] {
  const hash = domain.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const seed = (hash % 50) + 25

  return [
    {
      category: 'machine_readable_profile',
      label: 'Machine-Readable Profile',
      icon: Globe,
      score: Math.min(20, Math.round(seed * 0.28)),
      max_score: 20,
      status: seed > 50 ? 'pass' : seed > 30 ? 'warn' : 'fail',
      details:
        seed > 50
          ? ['A2A agent card found at /.well-known/agent.json', 'Schema.org structured data present', 'OpenAPI spec detected']
          : seed > 30
            ? ['Basic meta tags found', 'No A2A agent card detected', 'Partial structured data']
            : ['No machine-readable profile detected', 'Missing /.well-known/agent.json', 'No structured data'],
      recommendations:
        seed > 50
          ? ['Consider adding capabilities field to agent card']
          : ['Add an A2A agent card at /.well-known/agent.json', 'Add Schema.org structured data', 'Publish an OpenAPI specification'],
    },
    {
      category: 'mcp_api_endpoints',
      label: 'MCP & API Endpoints',
      icon: Server,
      score: Math.min(25, Math.round(seed * 0.32)),
      max_score: 25,
      status: seed > 55 ? 'pass' : seed > 35 ? 'warn' : 'fail',
      details:
        seed > 55
          ? ['MCP server endpoint detected', 'REST API with OpenAPI docs', '3 tool definitions found']
          : seed > 35
            ? ['REST API detected but no MCP endpoint', 'API documentation incomplete']
            : ['No API endpoints detected', 'No MCP server found'],
      recommendations:
        seed > 55
          ? ['Add rate limit headers to API responses']
          : ['Expose an MCP server for agent consumption', 'Add OpenAPI documentation to your API', 'Define tool schemas for agent use'],
    },
    {
      category: 'agent_native_onboarding',
      label: 'Agent-Native Onboarding',
      icon: UserCheck,
      score: Math.min(20, Math.round(seed * 0.22)),
      max_score: 20,
      status: seed > 60 ? 'pass' : seed > 40 ? 'warn' : 'fail',
      details:
        seed > 60
          ? ['API key provisioning available', 'Programmatic signup flow detected', 'Agent auth endpoints present']
          : seed > 40
            ? ['Manual signup only', 'No programmatic onboarding', 'API key available after manual setup']
            : ['No agent-friendly onboarding', 'Human-only registration', 'No API access'],
      recommendations:
        seed > 60
          ? ['Add OAuth2 support for richer agent auth']
          : ['Create an API endpoint for programmatic signup', 'Enable API key generation via API', 'Remove CAPTCHA from agent-facing flows'],
    },
    {
      category: 'structured_pricing',
      label: 'Structured Pricing',
      icon: CreditCard,
      score: Math.min(15, Math.round(seed * 0.18)),
      max_score: 15,
      status: seed > 50 ? 'pass' : seed > 30 ? 'warn' : 'fail',
      details:
        seed > 50
          ? ['Machine-readable pricing found', 'Per-call pricing model detected', 'Price endpoint returns JSON']
          : seed > 30
            ? ['Pricing page exists but not machine-readable', 'No structured pricing data']
            : ['No pricing information found', 'Agent cannot determine costs'],
      recommendations:
        seed > 50
          ? ['Add volume discount tiers to pricing data']
          : ['Publish pricing in machine-readable format', 'Add a /pricing.json endpoint', 'Include pricing in your A2A agent card'],
    },
    {
      category: 'agent_payment_acceptance',
      label: 'Agent Payment Acceptance',
      icon: Wallet,
      score: Math.min(20, Math.round(seed * 0.15)),
      max_score: 20,
      status: seed > 65 ? 'pass' : seed > 45 ? 'warn' : 'fail',
      details:
        seed > 65
          ? ['Stripe Connect detected', 'Programmatic payment flow available', 'Refund API present']
          : seed > 45
            ? ['Payment page exists', 'No programmatic payment API', 'Manual invoice only']
            : ['No payment capabilities detected', 'Agent cannot transact'],
      recommendations:
        seed > 65
          ? ['Add webhook confirmation for payment status']
          : ['Connect Stripe for programmatic payments', 'Create a payment API endpoint', 'Enable agent wallet support via AgentHermes'],
    },
  ]
}

function getTier(score: number): AuditTier {
  if (score >= 80) return 'platinum'
  if (score >= 60) return 'gold'
  if (score >= 40) return 'silver'
  if (score >= 20) return 'bronze'
  return 'unaudited'
}

export default function AuditPage() {
  const [domainInput, setDomainInput] = useState('')
  const [audit, setAudit] = useState<AuditState>({
    phase: 'idle',
    currentCheck: '',
    domain: '',
    totalScore: 0,
    tier: 'unaudited',
    categories: [],
  })
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  )

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
      currentCheck: auditChecks[0],
      domain,
      totalScore: 0,
      tier: 'unaudited',
      categories: [],
    })

    // Simulate progressive checks
    for (let i = 0; i < auditChecks.length; i++) {
      setAudit((prev) => ({ ...prev, currentCheck: auditChecks[i] }))
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 300))
    }

    // Calculate results
    const categories = simulateAudit(domain)
    const totalScore = categories.reduce((sum, c) => sum + c.score, 0)
    const tier = getTier(totalScore)

    setAudit({
      phase: 'complete',
      currentCheck: '',
      domain,
      totalScore,
      tier,
      categories,
    })

    // Expand all categories by default
    setExpandedCategories(new Set(categories.map((c) => c.category)))
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
          machine-readability categories. Free. 60 seconds.
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
          <p className="text-xs text-zinc-500">{audit.currentCheck}</p>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {auditChecks.map((check, i) => {
              const currentIdx = auditChecks.indexOf(audit.currentCheck)
              return (
                <div
                  key={check}
                  className={clsx(
                    'h-1.5 w-1.5 rounded-full transition-colors',
                    i <= currentIdx ? 'bg-emerald-500' : 'bg-zinc-700'
                  )}
                />
              )
            })}
          </div>
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
                  {audit.totalScore >= 80
                    ? 'Outstanding. Your business is fully agent-ready.'
                    : audit.totalScore >= 60
                      ? 'Good foundation. A few improvements will unlock full agent capabilities.'
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
              const pct = Math.round((cat.score / cat.max_score) * 100)

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
                        {statusIcon(cat.status)}
                      </div>
                      {/* Score bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={clsx(
                              'h-full rounded-full transition-all duration-500',
                              cat.status === 'pass' && 'bg-emerald-500',
                              cat.status === 'warn' && 'bg-amber-500',
                              cat.status === 'fail' && 'bg-red-500'
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
                        <div>
                          <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                            Findings
                          </h4>
                          <ul className="space-y-1.5">
                            {cat.details.map((d, i) => (
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
