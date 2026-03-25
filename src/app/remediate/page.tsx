'use client'

import { useState, useEffect } from 'react'
import {
  Wrench,
  Globe,
  Shield,
  FileText,
  Download,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
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

interface AuditData {
  business_name: string
  domain: string
  total_score: number
  tier: AuditTier
  categories: CategoryResult[]
  next_steps: string[]
}

type GeneratedFile = {
  type: 'llms-txt' | 'agent-card'
  content: string
  filename: string
  placement: string
}

const categoryLabels: Record<string, string> = {
  machine_readable_profile: 'Machine-Readable Profile',
  mcp_api_endpoints: 'MCP & API Endpoints',
  agent_native_onboarding: 'Agent-Native Onboarding',
  structured_pricing: 'Structured Pricing',
  agent_payment_acceptance: 'Agent Payment Acceptance',
}

const categoryDescriptions: Record<string, string> = {
  machine_readable_profile:
    'AI agents need structured data to understand your business. This includes llms.txt, agent-card.json, and schema.org markup.',
  mcp_api_endpoints:
    'MCP (Model Context Protocol) endpoints let agents call your services directly. REST APIs with OpenAPI specs also count.',
  agent_native_onboarding:
    'Can an agent sign up, authenticate, and start using your service without human intervention?',
  structured_pricing:
    'Machine-readable pricing lets agents compare costs and make purchasing decisions autonomously.',
  agent_payment_acceptance:
    'Accept payments from agent wallets, Stripe Connect, or other programmable payment methods.',
}

const categoryFixes: Record<string, { label: string; generator: 'llms-txt' | 'agent-card' | null; manual: string }[]> = {
  machine_readable_profile: [
    {
      label: 'Generate llms.txt',
      generator: 'llms-txt',
      manual: 'Place at your-domain.com/llms.txt so agents can understand your business.',
    },
    {
      label: 'Generate Agent Card',
      generator: 'agent-card',
      manual: 'Place at your-domain.com/.well-known/agent-card.json for A2A protocol discovery.',
    },
  ],
  mcp_api_endpoints: [
    {
      label: 'Add MCP Server',
      generator: null,
      manual:
        'Implement a JSON-RPC 2.0 endpoint at /api/mcp that responds to tools/list and tools/call methods. Use the MCP SDK or build a lightweight handler.',
    },
    {
      label: 'Publish OpenAPI Spec',
      generator: null,
      manual:
        'Serve an OpenAPI 3.0 spec at /openapi.json describing all your API endpoints, parameters, and response schemas.',
    },
  ],
  agent_native_onboarding: [
    {
      label: 'API Key Self-Service',
      generator: null,
      manual:
        'Provide a POST /api/v1/auth/register endpoint that lets agents create accounts and receive API keys programmatically.',
    },
  ],
  structured_pricing: [
    {
      label: 'Machine-Readable Pricing',
      generator: null,
      manual:
        'Add pricing to your agent card skills or serve a /api/v1/pricing endpoint with JSON pricing data (per-call, monthly, or usage-based).',
    },
  ],
  agent_payment_acceptance: [
    {
      label: 'Accept Agent Payments',
      generator: null,
      manual:
        'Integrate Stripe Connect or implement a wallet endpoint that accepts programmatic payments. Register on AgentHermes to get a business wallet.',
    },
  ],
}

export default function RemediatePage() {
  const [domainInput, setDomainInput] = useState('')
  const [phase, setPhase] = useState<'idle' | 'loading' | 'results' | 'error'>('idle')
  const [audit, setAudit] = useState<AuditData | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([])
  const [generating, setGenerating] = useState<string | null>(null)
  const [copiedFile, setCopiedFile] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Remediate | AgentHermes'
  }, [])

  const fetchScore = async () => {
    const domain = domainInput
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '')
    if (!domain) return

    setPhase('loading')
    setAudit(null)
    setGeneratedFiles([])
    setErrorMsg('')

    try {
      const res = await fetch('/api/v1/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: domain }),
      })

      if (!res.ok) {
        const errBody = await res.json().catch(() => null)
        throw new Error(errBody?.error || `Audit failed (${res.status})`)
      }

      const data = await res.json()
      setAudit({
        business_name: data.business_name || domain,
        domain: data.domain || domain,
        total_score: data.total_score,
        tier: data.tier as AuditTier,
        categories: data.categories || [],
        next_steps: data.next_steps || [],
      })
      setPhase('results')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Audit failed')
      setPhase('error')
    }
  }

  const generateFile = async (type: 'llms-txt' | 'agent-card') => {
    if (!audit) return

    setGenerating(type)

    try {
      const endpoint = `/api/v1/remediate/${type}`
      const payload: Record<string, string> = {
        domain: audit.domain,
        name: audit.business_name,
        description: `${audit.business_name} — business at ${audit.domain}`,
      }
      if (type === 'agent-card') {
        payload.api_base = `https://${audit.domain}/api`
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`Generation failed (${res.status})`)

      let content: string
      let filename: string
      let placement: string

      if (type === 'llms-txt') {
        content = await res.text()
        filename = 'llms.txt'
        placement = `Place at https://${audit.domain}/llms.txt`
      } else {
        const json = await res.json()
        content = JSON.stringify(json, null, 2)
        filename = 'agent-card.json'
        placement = `Place at https://${audit.domain}/.well-known/agent-card.json`
      }

      // Replace existing or add new
      setGeneratedFiles((prev) => {
        const filtered = prev.filter((f) => f.type !== type)
        return [...filtered, { type, content, filename, placement }]
      })
    } catch (err) {
      console.error(`Failed to generate ${type}:`, err)
    } finally {
      setGenerating(null)
    }
  }

  const downloadFile = (file: GeneratedFile) => {
    const blob = new Blob([file.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (file: GeneratedFile) => {
    navigator.clipboard.writeText(file.content).then(() => {
      setCopiedFile(file.type)
      setTimeout(() => setCopiedFile(null), 2000)
    })
  }

  const getStatus = (score: number, maxScore: number): 'pass' | 'warn' | 'fail' => {
    const pct = maxScore > 0 ? score / maxScore : 0
    if (pct >= 0.7) return 'pass'
    if (pct >= 0.35) return 'warn'
    return 'fail'
  }

  const statusIcon = (status: 'pass' | 'warn' | 'fail') => {
    if (status === 'pass') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    if (status === 'warn') return <AlertCircle className="h-4 w-4 text-amber-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const failingCategories = audit?.categories.filter(
    (c) => getStatus(c.score, c.max_score) !== 'pass'
  ) || []

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-5">
          <Wrench className="h-7 w-7 text-amber-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Fix Your Agent Readiness Score
        </h1>
        <p className="text-zinc-400 max-w-lg mx-auto">
          Enter your domain to see what is failing, then generate the files you
          need to become agent-ready. Download them and deploy.
        </p>
      </div>

      {/* Domain Input */}
      <div className="mb-10">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="yourbusiness.com"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && phase !== 'loading' && fetchScore()}
              disabled={phase === 'loading'}
              className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={fetchScore}
            disabled={phase === 'loading' || !domainInput.trim()}
            className="px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 disabled:text-amber-400 text-white font-semibold text-sm transition-colors flex items-center gap-2"
          >
            {phase === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Scan & Fix
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading */}
      {phase === 'loading' && (
        <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-zinc-300 mb-1">
            Scanning {domainInput.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')}
          </p>
          <p className="text-xs text-zinc-500">
            Checking machine-readable profiles, APIs, onboarding, pricing, and payments...
          </p>
        </div>
      )}

      {/* Error */}
      {phase === 'error' && (
        <div className="p-8 rounded-xl bg-red-950/20 border border-red-800/40 text-center">
          <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-sm font-medium text-red-300 mb-1">Scan Failed</p>
          <p className="text-xs text-red-400/80">{errorMsg}</p>
          <button
            type="button"
            onClick={fetchScore}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-800/50 hover:border-red-700/50 text-red-300 hover:text-red-200 text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {phase === 'results' && audit && (
        <div className="space-y-8">
          {/* Score Overview */}
          <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <ScoreGauge score={audit.total_score} size="lg" />
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                  <h2 className="text-xl font-bold">{audit.domain}</h2>
                  <TierBadge tier={audit.tier} size="md" />
                </div>
                <p className="text-sm text-zinc-400 mb-2">
                  Current score:{' '}
                  <span className="text-zinc-200 font-semibold">
                    {audit.total_score}/100
                  </span>
                </p>
                {failingCategories.length > 0 ? (
                  <p className="text-xs text-amber-400">
                    {failingCategories.length} categor{failingCategories.length === 1 ? 'y' : 'ies'} need
                    attention. Generate fixes below.
                  </p>
                ) : (
                  <p className="text-xs text-emerald-400">
                    All categories passing. Your business is agent-ready.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category Breakdown with Fixes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-200">Category Breakdown</h3>

            {audit.categories.map((cat) => {
              const status = getStatus(cat.score, cat.max_score)
              const pct = cat.max_score > 0 ? Math.round((cat.score / cat.max_score) * 100) : 0
              const fixes = categoryFixes[cat.category] || []
              const isFailing = status !== 'pass'

              return (
                <div
                  key={cat.category}
                  className={clsx(
                    'rounded-xl border overflow-hidden',
                    isFailing
                      ? 'bg-zinc-900/70 border-amber-800/30'
                      : 'bg-zinc-900/50 border-zinc-800/80'
                  )}
                >
                  {/* Category Header */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      {statusIcon(status)}
                      <span className="text-sm font-semibold text-zinc-200">
                        {categoryLabels[cat.category] || cat.label}
                      </span>
                      <span className="ml-auto text-xs font-mono text-zinc-500 tabular-nums">
                        {cat.score}/{cat.max_score} ({pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
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
                    <p className="text-xs text-zinc-500">
                      {categoryDescriptions[cat.category] || ''}
                    </p>
                  </div>

                  {/* Fix Actions — only show for failing categories */}
                  {isFailing && fixes.length > 0 && (
                    <div className="border-t border-zinc-800/80 p-5 space-y-3">
                      <h4 className="text-[10px] font-medium text-amber-500/80 uppercase tracking-wider">
                        Fixes Available
                      </h4>
                      {fixes.map((fix) => (
                        <div
                          key={fix.label}
                          className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/40"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-200 mb-1">
                              {fix.label}
                            </p>
                            <p className="text-xs text-zinc-500">{fix.manual}</p>
                          </div>
                          {fix.generator ? (
                            <button
                              type="button"
                              onClick={() => generateFile(fix.generator!)}
                              disabled={generating === fix.generator}
                              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 text-white text-xs font-semibold transition-colors"
                            >
                              {generating === fix.generator ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <FileText className="h-3 w-3" />
                              )}
                              Generate
                            </button>
                          ) : (
                            <span className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-400 text-xs font-medium">
                              Manual
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommendations */}
                  {cat.recommendations.length > 0 && (
                    <div className="border-t border-zinc-800/80 px-5 pb-5 pt-3">
                      <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                        Recommendations
                      </h4>
                      <ul className="space-y-1">
                        {cat.recommendations.map((rec, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-zinc-400"
                          >
                            <ArrowRight className="h-3 w-3 text-amber-500/60 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Generated Files */}
          {generatedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-200">
                Generated Files
              </h3>
              {generatedFiles.map((file) => (
                <div
                  key={file.type}
                  className="rounded-xl bg-zinc-900/50 border border-emerald-800/30 overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 border-b border-zinc-800/80">
                    <FileText className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-zinc-200">
                      {file.filename}
                    </span>
                    <span className="text-xs text-zinc-500 ml-1">
                      {file.placement}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(file)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors"
                      >
                        {copiedFile === file.type ? (
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
                      <button
                        type="button"
                        onClick={() => downloadFile(file)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 text-xs text-zinc-400 font-mono overflow-x-auto max-h-64 overflow-y-auto">
                    {file.content}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Deployment Instructions */}
          {generatedFiles.length > 0 && (
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                Deployment Instructions
              </h3>
              <ol className="space-y-2 text-xs text-zinc-400 list-decimal list-inside">
                <li>
                  <strong className="text-zinc-300">llms.txt</strong> — Place at
                  your website root so it is accessible at{' '}
                  <code className="text-amber-400/80">
                    https://{audit.domain}/llms.txt
                  </code>
                </li>
                <li>
                  <strong className="text-zinc-300">agent-card.json</strong> — Create
                  a{' '}
                  <code className="text-amber-400/80">.well-known</code> directory
                  at your web root and place the file there:{' '}
                  <code className="text-amber-400/80">
                    https://{audit.domain}/.well-known/agent-card.json
                  </code>
                </li>
                <li>
                  <strong className="text-zinc-300">Re-audit</strong> — After
                  deploying, come back and re-scan your domain. Your score will
                  update automatically.
                </li>
              </ol>
            </div>
          )}

          {/* AffixedAI CTA */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-amber-800/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-200 mb-1">
                  Need help getting agent-ready?
                </h3>
                <p className="text-xs text-zinc-500">
                  AffixedAI specializes in making businesses machine-readable and
                  agent-compatible. They can implement MCP servers, API endpoints,
                  structured pricing, and payment acceptance for you.
                </p>
              </div>
              <a
                href="https://affixed.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-colors flex-shrink-0"
              >
                Talk to AffixedAI
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
