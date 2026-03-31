'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
  Plus,
  Trash2,
  Code2,
  Upload,
  Server,
  Braces,
  Search,
  BookOpen,
  UserPlus,
  Link2,
  Activity,
  CreditCard,
  Zap,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react'
import clsx from 'clsx'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FadeIn } from '@/components/FadeIn'

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
  type: string
  content: string
  filename: string
  placement: string
}

// --- MCP Proxy Types ---
interface EndpointParam {
  name: string
  type: string
  required: boolean
}

interface EndpointRow {
  id: string
  method: string
  path: string
  description: string
  params: EndpointParam[]
  bodyFields: { name: string; type: string }[]
}

// --- Schema.org Types ---
type SchemaOrgType = 'SoftwareApplication' | 'Organization' | 'LocalBusiness' | 'Product'

// ==========================================================================
// 6-Step Fix Path Data
// ==========================================================================

interface FixStep {
  number: number
  label: string
  headline: string
  description: string
  icon: React.ReactNode
  color: string
  borderColor: string
  bgColor: string
  autoFixes: { label: string; description: string; generator: 'llms-txt' | 'agent-card' | null; scrollTo?: string }[]
  manualFixes: string[]
}

const fixSteps: FixStep[] = [
  {
    number: 1,
    label: 'FIND',
    headline: 'Add an agent card, llms.txt, and structured data so agents can discover you',
    description: 'AI agents crawl the web looking for machine-readable files. Without these, you are invisible.',
    icon: <Search className="h-5 w-5" />,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    autoFixes: [
      { label: 'Generate agent-card.json', description: 'A2A protocol discovery file for your .well-known directory', generator: 'agent-card' },
      { label: 'Generate llms.txt', description: 'Plain-text file that tells LLMs what your business does', generator: 'llms-txt' },
      { label: 'Generate Schema.org JSON-LD', description: 'Structured data markup for your homepage', generator: null, scrollTo: 'schema-generator' },
    ],
    manualFixes: [
      'Add Schema.org JSON-LD to your homepage <head>',
    ],
  },
  {
    number: 2,
    label: 'UNDERSTAND',
    headline: 'Publish an OpenAPI spec and improve your JSON responses',
    description: 'Agents need to know what your API does before they can call it. An OpenAPI spec is the instruction manual.',
    icon: <BookOpen className="h-5 w-5" />,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    autoFixes: [
      { label: 'Convert OpenAPI to MCP Server', description: 'Paste your OpenAPI spec and get a working MCP server', generator: null, scrollTo: 'openapi-converter' },
    ],
    manualFixes: [
      'Serve an OpenAPI 3.0 spec at /openapi.json',
      'Ensure all API responses return JSON with consistent schemas',
      'Add descriptive error messages in structured JSON format',
    ],
  },
  {
    number: 3,
    label: 'SIGN UP',
    headline: 'Enable programmatic account creation',
    description: 'If an agent cannot create an account without a human clicking buttons, your funnel is broken for the agent economy.',
    icon: <UserPlus className="h-5 w-5" />,
    color: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    bgColor: 'bg-violet-500/5',
    autoFixes: [],
    manualFixes: [
      'Add OAuth 2.0 / OIDC for machine-to-machine auth',
      'Provide API key self-service (POST /api/v1/auth/register)',
      'Offer a sandbox environment for agent testing',
    ],
  },
  {
    number: 4,
    label: 'CONNECT',
    headline: 'Expose REST/GraphQL endpoints with proper auth',
    description: 'Clean, well-documented endpoints with proper error handling are the interface agents use to talk to your business.',
    icon: <Link2 className="h-5 w-5" />,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/5',
    autoFixes: [
      { label: 'Generate MCP Server Proxy', description: 'Wrap your REST API in an MCP server for agent discovery', generator: null, scrollTo: 'mcp-generator' },
    ],
    manualFixes: [
      'Ensure 401/403 responses return structured JSON errors',
      'Add rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining)',
      'Support CORS for agent-originated requests',
    ],
  },
  {
    number: 5,
    label: 'USE',
    headline: 'Improve reliability and response quality',
    description: 'Agents need to trust that your service will respond consistently. Uptime, speed, and data quality matter.',
    icon: <Activity className="h-5 w-5" />,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    autoFixes: [],
    manualFixes: [
      'Add a health endpoint (GET /health or /api/v1/health)',
      'Publish an SLA or uptime commitment',
      'Use a CDN for static assets and API caching',
      'Return consistent pagination in list endpoints',
    ],
  },
  {
    number: 6,
    label: 'PAY',
    headline: 'Enable programmatic payments',
    description: 'The final step: let agents pay for your service without a human entering credit card details.',
    icon: <CreditCard className="h-5 w-5" />,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/5',
    autoFixes: [],
    manualFixes: [
      'Add usage-based billing via API (Stripe Metered Billing, etc.)',
      'Expose a /api/v1/pricing endpoint with machine-readable pricing',
      'List on AgentHermes gateway — we handle payments for you',
    ],
  },
]

// ==========================================================================
// Helpers
// ==========================================================================

function makeId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function downloadBlob(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ==========================================================================
// File Preview Component
// ==========================================================================

function FilePreview({
  file,
  copiedId,
  onCopy,
  onDownload,
}: {
  file: GeneratedFile
  copiedId: string | null
  onCopy: (file: GeneratedFile) => void
  onDownload: (file: GeneratedFile) => void
}) {
  return (
    <div className="rounded-xl bg-zinc-900/50 border border-emerald-800/30 overflow-hidden">
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
            onClick={() => onCopy(file)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors"
          >
            {copiedId === file.type ? (
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
            onClick={() => onDownload(file)}
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
  )
}

// ==========================================================================
// Fix Step Card Component
// ==========================================================================

function FixStepCard({
  step,
  isExpanded,
  onToggle,
  onAutoFix,
  generating,
}: {
  step: FixStep
  isExpanded: boolean
  onToggle: () => void
  onAutoFix: (generator: 'llms-txt' | 'agent-card' | null, scrollTo?: string) => void
  generating: string | null
}) {
  const hasAutoFixes = step.autoFixes.length > 0

  return (
    <div className={clsx(
      'rounded-xl border overflow-hidden transition-all duration-300',
      isExpanded ? step.borderColor : 'border-zinc-800/60',
      isExpanded ? step.bgColor : 'bg-zinc-900/30',
    )}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-zinc-800/20 transition-colors"
      >
        {/* Step Number */}
        <div className={clsx(
          'flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center border',
          step.borderColor,
          step.bgColor,
        )}>
          <span className={clsx('font-mono text-sm font-bold', step.color)}>{step.number}</span>
        </div>

        {/* Label + Headline */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={clsx('text-[10px] font-bold uppercase tracking-widest', step.color)}>{step.label}</span>
            {hasAutoFixes && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                <Zap className="h-2.5 w-2.5" />
                Auto-fix
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-zinc-200 truncate">{step.headline}</p>
        </div>

        {/* Chevron */}
        <div className="flex-shrink-0 text-zinc-500">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-4">
          <p className="text-xs text-zinc-500 pl-14">{step.description}</p>

          {/* Auto Fixes */}
          {step.autoFixes.length > 0 && (
            <div className="pl-14 space-y-2">
              <h4 className="text-[10px] font-medium text-emerald-500/80 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                We can do this for you
              </h4>
              {step.autoFixes.map((fix) => (
                <div
                  key={fix.label}
                  className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/40 border border-emerald-800/20"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 mb-0.5">{fix.label}</p>
                    <p className="text-xs text-zinc-500">{fix.description}</p>
                  </div>
                  {fix.generator ? (
                    <button
                      type="button"
                      onClick={() => onAutoFix(fix.generator, fix.scrollTo)}
                      disabled={generating === fix.generator}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-xs font-semibold transition-colors"
                    >
                      {generating === fix.generator ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Zap className="h-3 w-3" />
                      )}
                      Generate
                    </button>
                  ) : fix.scrollTo ? (
                    <button
                      type="button"
                      onClick={() => onAutoFix(null, fix.scrollTo)}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-semibold transition-colors"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Open Tool
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          {/* Manual Fixes */}
          {step.manualFixes.length > 0 && (
            <div className="pl-14 space-y-2">
              <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Developer checklist
              </h4>
              <ul className="space-y-1.5">
                {step.manualFixes.map((fix, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                    <div className="h-4 w-4 flex-shrink-0 rounded border border-zinc-700 mt-0.5" />
                    {fix}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ==========================================================================
// Main Page Content
// ==========================================================================

function RemediatePageContent() {
  const searchParams = useSearchParams()

  // --- Audit State ---
  const [domainInput, setDomainInput] = useState('')
  const [fixParam, setFixParam] = useState<string | null>(null)
  const [phase, setPhase] = useState<'idle' | 'loading' | 'results' | 'error'>('idle')
  const [audit, setAudit] = useState<AuditData | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([])
  const [generating, setGenerating] = useState<string | null>(null)
  const [copiedFile, setCopiedFile] = useState<string | null>(null)

  // --- Fix Path State ---
  const [expandedStep, setExpandedStep] = useState<number | null>(1)

  // --- Schema.org State ---
  const [schemaDomain, setSchemaDomain] = useState('')
  const [schemaName, setSchemaName] = useState('')
  const [schemaDesc, setSchemaDesc] = useState('')
  const [schemaType, setSchemaType] = useState<SchemaOrgType>('Organization')
  const [schemaResult, setSchemaResult] = useState<GeneratedFile | null>(null)
  const [schemaLoading, setSchemaLoading] = useState(false)

  // --- MCP Proxy State ---
  const [mcpName, setMcpName] = useState('')
  const [mcpApiBase, setMcpApiBase] = useState('')
  const [mcpAuthType, setMcpAuthType] = useState('api_key')
  const [mcpAuthHeader, setMcpAuthHeader] = useState('X-API-Key')
  const [mcpDomain, setMcpDomain] = useState('')
  const [mcpEndpoints, setMcpEndpoints] = useState<EndpointRow[]>([
    { id: makeId(), method: 'GET', path: '/users', description: 'List all users', params: [], bodyFields: [] },
  ])
  const [mcpResult, setMcpResult] = useState<GeneratedFile | null>(null)
  const [mcpLoading, setMcpLoading] = useState(false)

  // --- OpenAPI-to-MCP State ---
  const [openApiJson, setOpenApiJson] = useState('')
  const [openApiResult, setOpenApiResult] = useState<GeneratedFile | null>(null)
  const [openApiLoading, setOpenApiLoading] = useState(false)
  const [openApiError, setOpenApiError] = useState('')

  useEffect(() => {
    document.title = 'Fix It | AgentHermes'
  }, [])

  // Auto-fill domain from query params and auto-trigger scan
  useEffect(() => {
    const domainParam = searchParams.get('domain')
    const fixParamValue = searchParams.get('fix')
    if (domainParam && phase === 'idle') {
      const domain = domainParam.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
      if (domain) {
        setDomainInput(domain)
        if (fixParamValue) setFixParam(fixParamValue)
        setTimeout(() => {
          document.getElementById('remediate-scan-btn')?.click()
        }, 100)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Auto-scroll to fix section when results load and fix param is present
  useEffect(() => {
    if (phase === 'results' && fixParam) {
      const generatorMap: Record<string, string> = {
        'llms-txt': 'fix-path',
        'agent-card': 'fix-path',
        'openapi': 'openapi-converter',
        'onboarding': 'fix-path',
        'payments': 'fix-path',
      }
      const target = generatorMap[fixParam]
      if (target) {
        setTimeout(() => {
          const el = document.getElementById(target)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 300)
      }
      setFixParam(null)
    }
  }, [phase, fixParam])

  // ==== Audit Logic ====

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
    downloadBlob(file.content, file.filename)
  }

  const copyToClipboard = useCallback((file: GeneratedFile) => {
    navigator.clipboard.writeText(file.content).then(() => {
      setCopiedFile(file.type)
      setTimeout(() => setCopiedFile(null), 2000)
    })
  }, [])

  const handleAutoFix = (generator: 'llms-txt' | 'agent-card' | null, scrollTo?: string) => {
    if (generator && audit) {
      generateFile(generator)
    }
    if (scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(scrollTo)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const getStatus = (score: number, maxScore: number): 'pass' | 'warn' | 'fail' => {
    const pct = maxScore > 0 ? score / maxScore : 0
    if (pct >= 0.75) return 'pass'
    if (pct >= 0.4) return 'warn'
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

  // ==== Schema.org Logic ====

  const generateSchema = async () => {
    if (!schemaDomain.trim() || !schemaName.trim() || !schemaDesc.trim()) return
    setSchemaLoading(true)
    setSchemaResult(null)

    try {
      const res = await fetch('/api/v1/remediate/schema-org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: schemaDomain.trim(),
          name: schemaName.trim(),
          description: schemaDesc.trim(),
          type: schemaType,
        }),
      })

      if (!res.ok) throw new Error(`Generation failed (${res.status})`)

      const json = await res.json()
      const content = JSON.stringify(json, null, 2)
      const cleanDomain = schemaDomain.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')

      setSchemaResult({
        type: 'schema-org',
        content,
        filename: 'schema-org.jsonld',
        placement: `Add as <script type="application/ld+json"> in <head> of https://${cleanDomain}`,
      })
    } catch (err) {
      console.error('Schema.org generation failed:', err)
    } finally {
      setSchemaLoading(false)
    }
  }

  // ==== MCP Proxy Logic ====

  const addEndpoint = () => {
    setMcpEndpoints((prev) => [
      ...prev,
      { id: makeId(), method: 'GET', path: '/', description: '', params: [], bodyFields: [] },
    ])
  }

  const removeEndpoint = (id: string) => {
    setMcpEndpoints((prev) => prev.filter((ep) => ep.id !== id))
  }

  const updateEndpoint = (id: string, field: keyof EndpointRow, value: string) => {
    setMcpEndpoints((prev) =>
      prev.map((ep) => (ep.id === id ? { ...ep, [field]: value } : ep))
    )
  }

  const addParam = (epId: string) => {
    setMcpEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === epId
          ? { ...ep, params: [...ep.params, { name: '', type: 'string', required: false }] }
          : ep
      )
    )
  }

  const removeParam = (epId: string, idx: number) => {
    setMcpEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === epId ? { ...ep, params: ep.params.filter((_, i) => i !== idx) } : ep
      )
    )
  }

  const updateParam = (epId: string, idx: number, field: keyof EndpointParam, value: string | boolean) => {
    setMcpEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === epId
          ? {
              ...ep,
              params: ep.params.map((p, i) =>
                i === idx ? { ...p, [field]: value } : p
              ),
            }
          : ep
      )
    )
  }

  const addBodyField = (epId: string) => {
    setMcpEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === epId
          ? { ...ep, bodyFields: [...ep.bodyFields, { name: '', type: 'string' }] }
          : ep
      )
    )
  }

  const removeBodyField = (epId: string, idx: number) => {
    setMcpEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === epId ? { ...ep, bodyFields: ep.bodyFields.filter((_, i) => i !== idx) } : ep
      )
    )
  }

  const updateBodyField = (epId: string, idx: number, field: 'name' | 'type', value: string) => {
    setMcpEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === epId
          ? {
              ...ep,
              bodyFields: ep.bodyFields.map((bf, i) =>
                i === idx ? { ...bf, [field]: value } : bf
              ),
            }
          : ep
      )
    )
  }

  const generateMcpProxy = async () => {
    if (!mcpName.trim() || !mcpApiBase.trim() || mcpEndpoints.length === 0) return
    setMcpLoading(true)
    setMcpResult(null)

    const endpoints = mcpEndpoints
      .filter((ep) => ep.path.trim() && ep.description.trim())
      .map((ep) => {
        const result: Record<string, unknown> = {
          method: ep.method,
          path: ep.path.trim(),
          description: ep.description.trim(),
        }
        if (ep.params.length > 0) {
          result.params = ep.params
            .filter((p) => p.name.trim())
            .map((p) => ({ name: p.name.trim(), type: p.type, required: p.required }))
        }
        if (ep.bodyFields.length > 0) {
          const body: Record<string, string> = {}
          for (const bf of ep.bodyFields) {
            if (bf.name.trim()) body[bf.name.trim()] = bf.type
          }
          if (Object.keys(body).length > 0) result.body = body
        }
        return result
      })

    if (endpoints.length === 0) return

    try {
      const res = await fetch('/api/v1/remediate/mcp-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: mcpDomain.trim() || 'example.com',
          name: mcpName.trim(),
          api_base: mcpApiBase.trim(),
          endpoints,
          auth_type: mcpAuthType,
          auth_header: mcpAuthHeader.trim(),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || `Generation failed (${res.status})`)
      }

      const content = await res.text()
      const slug = mcpName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')

      setMcpResult({
        type: 'mcp-proxy',
        content,
        filename: `mcp-server-${slug}.ts`,
        placement: 'Save as src/app/api/mcp/route.ts in your Next.js app',
      })
    } catch (err) {
      console.error('MCP proxy generation failed:', err)
    } finally {
      setMcpLoading(false)
    }
  }

  // ==== OpenAPI-to-MCP Logic ====

  const generateFromOpenApi = async () => {
    setOpenApiError('')
    if (!openApiJson.trim()) return

    let parsed: Record<string, unknown>
    try {
      parsed = JSON.parse(openApiJson)
    } catch {
      setOpenApiError('Invalid JSON. Paste a valid OpenAPI spec.')
      return
    }

    setOpenApiLoading(true)
    setOpenApiResult(null)

    try {
      const res = await fetch('/api/v1/remediate/openapi-to-mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spec: parsed }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || `Conversion failed (${res.status})`)
      }

      const content = await res.text()
      const specTitle = (parsed as Record<string, Record<string, string>>).info?.title || 'api'
      const slug = specTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')

      setOpenApiResult({
        type: 'openapi-mcp',
        content,
        filename: `mcp-server-${slug}.ts`,
        placement: 'Save as src/app/api/mcp/route.ts in your Next.js app',
      })
    } catch (err) {
      setOpenApiError(err instanceof Error ? err.message : 'Conversion failed')
    } finally {
      setOpenApiLoading(false)
    }
  }

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

      {/* ================================================================ */}
      {/* Hero */}
      {/* ================================================================ */}
      <FadeIn>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
            <Wrench className="h-3.5 w-3.5" />
            The Fix-It Product
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Fix Your{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Agent Readiness Score
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            We show you exactly what{'\u2019'}s broken in your agent journey and help you fix it{' '}
            {'\u2014'} automatically where possible, with clear guides where not.
          </p>
        </div>
      </FadeIn>

      {/* ================================================================ */}
      {/* Scan Input */}
      {/* ================================================================ */}
      <FadeIn delay={100}>
        <div className="mb-12">
          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-semibold text-zinc-200">Scan your domain first</h2>
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              We will audit your site and show which of the 6 steps need work. Already know what to fix? Scroll down to the tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="yourbusiness.com"
                  aria-label="Domain to remediate"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && phase !== 'loading' && fetchScore()}
                  disabled={phase === 'loading'}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-colors disabled:opacity-50"
                />
              </div>
              <button
                id="remediate-scan-btn"
                type="button"
                onClick={fetchScore}
                disabled={phase === 'loading' || !domainInput.trim()}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 disabled:text-amber-400 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
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
        </div>
      </FadeIn>

      {/* Loading */}
      {phase === 'loading' && (
        <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center mb-12">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-zinc-300 mb-1">
            Scanning {domainInput.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')}
          </p>
          <p className="text-xs text-zinc-500">
            Checking discoverability, APIs, onboarding, connectivity, reliability, and payments...
          </p>
        </div>
      )}

      {/* Error */}
      {phase === 'error' && (
        <div className="p-8 rounded-xl bg-red-950/20 border border-red-800/40 text-center mb-12">
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

      {/* Results — Score Overview */}
      {phase === 'results' && audit && (
        <FadeIn>
          <div className="space-y-8 mb-12">
            {/* Score Card */}
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
                      {failingCategories.length} area{failingCategories.length === 1 ? '' : 's'} need
                      attention. Use the 6-step path below to fix them.
                    </p>
                  ) : (
                    <p className="text-xs text-emerald-400">
                      All categories passing. Your business is agent-ready.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Category Quick View */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {audit.categories.map((cat) => {
                const status = getStatus(cat.score, cat.max_score)
                const pct = cat.max_score > 0 ? Math.round((cat.score / cat.max_score) * 100) : 0
                return (
                  <div
                    key={cat.category}
                    className={clsx(
                      'rounded-lg border p-3',
                      status === 'pass' && 'border-emerald-800/30 bg-emerald-950/10',
                      status === 'warn' && 'border-amber-800/30 bg-amber-950/10',
                      status === 'fail' && 'border-red-800/30 bg-red-950/10',
                    )}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {statusIcon(status)}
                      <span className="text-[11px] font-medium text-zinc-300 truncate">{cat.label}</span>
                    </div>
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full',
                          status === 'pass' && 'bg-emerald-500',
                          status === 'warn' && 'bg-amber-500',
                          status === 'fail' && 'bg-red-500',
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">{cat.score}/{cat.max_score}</p>
                  </div>
                )
              })}
            </div>

            {/* Generated Files from scan */}
            {generatedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-zinc-200">Generated Files</h3>
                {generatedFiles.map((file) => (
                  <FilePreview
                    key={file.type}
                    file={file}
                    copiedId={copiedFile}
                    onCopy={copyToClipboard}
                    onDownload={downloadFile}
                  />
                ))}

                {/* Deployment Instructions */}
                <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <h4 className="text-sm font-semibold text-zinc-200 mb-3">Deployment Instructions</h4>
                  <ol className="space-y-2 text-xs text-zinc-400 list-decimal list-inside">
                    <li>
                      <strong className="text-zinc-300">llms.txt</strong> {'\u2014'} Place at your website root:{' '}
                      <code className="text-amber-400/80">https://{audit.domain}/llms.txt</code>
                    </li>
                    <li>
                      <strong className="text-zinc-300">agent-card.json</strong> {'\u2014'} Place in .well-known:{' '}
                      <code className="text-amber-400/80">https://{audit.domain}/.well-known/agent-card.json</code>
                    </li>
                    <li>
                      <strong className="text-zinc-300">Re-scan</strong> {'\u2014'} After deploying, come back and re-scan. Your score updates automatically.
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ================================================================ */}
      {/* The 6-Step Fix Path */}
      {/* ================================================================ */}
      <FadeIn delay={200}>
        <div id="fix-path" className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-zinc-800" />
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">The 6-Step Fix Path</h2>
              <p className="text-xs text-zinc-500 mt-1">Every step from invisible to fully agent-native</p>
            </div>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Step Progress Bar */}
          <div className="flex items-center gap-1 mb-8 px-2">
            {fixSteps.map((step, i) => (
              <div key={step.number} className="flex items-center flex-1">
                <button
                  type="button"
                  onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                  className={clsx(
                    'flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    expandedStep === step.number
                      ? `${step.bgColor} ${step.borderColor} border-2 ${step.color}`
                      : 'bg-zinc-800 border border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400',
                  )}
                >
                  {step.number}
                </button>
                {i < fixSteps.length - 1 && (
                  <div className="flex-1 h-px bg-zinc-800 mx-1" />
                )}
              </div>
            ))}
          </div>

          {/* Step Cards */}
          <div className="space-y-2">
            {fixSteps.map((step) => (
              <FixStepCard
                key={step.number}
                step={step}
                isExpanded={expandedStep === step.number}
                onToggle={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                onAutoFix={handleAutoFix}
                generating={generating}
              />
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ================================================================ */}
      {/* Auto-Remediation Tools */}
      {/* ================================================================ */}
      <div className="space-y-16">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 h-px bg-zinc-800" />
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Auto-Remediation Tools</h2>
              <p className="text-xs text-zinc-500 mt-1">Generate agent-readiness files for any domain {'\u2014'} no audit required</p>
            </div>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
        </FadeIn>

        {/* ==== Schema.org Generator ==== */}
        <FadeIn>
          <section id="schema-generator">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <Braces className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Schema.org Generator</h3>
                <p className="text-xs text-zinc-500">
                  Generate JSON-LD structured data markup for your business. Helps with Step 1: FIND.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Domain</label>
                  <input
                    type="text"
                    placeholder="example.com"
                    value={schemaDomain}
                    onChange={(e) => setSchemaDomain(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Business Name</label>
                  <input
                    type="text"
                    placeholder="Example Corp"
                    value={schemaName}
                    onChange={(e) => setSchemaName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description</label>
                <textarea
                  rows={2}
                  placeholder="What does the business do?"
                  value={schemaDesc}
                  onChange={(e) => setSchemaDesc(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Schema Type</label>
                <select
                  value={schemaType}
                  onChange={(e) => setSchemaType(e.target.value as SchemaOrgType)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors"
                >
                  <option value="Organization">Organization</option>
                  <option value="SoftwareApplication">Software Application</option>
                  <option value="LocalBusiness">Local Business</option>
                  <option value="Product">Product</option>
                </select>
              </div>

              <button
                type="button"
                onClick={generateSchema}
                disabled={schemaLoading || !schemaDomain.trim() || !schemaName.trim() || !schemaDesc.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:text-violet-400 text-white text-sm font-semibold transition-colors"
              >
                {schemaLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Braces className="h-4 w-4" />
                )}
                Generate Schema.org JSON-LD
              </button>
            </div>

            {schemaResult && (
              <div className="mt-4">
                <FilePreview
                  file={schemaResult}
                  copiedId={copiedFile}
                  onCopy={copyToClipboard}
                  onDownload={downloadFile}
                />
              </div>
            )}
          </section>
        </FadeIn>

        {/* ==== MCP Server Proxy Generator ==== */}
        <FadeIn>
          <section id="mcp-generator">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Server className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">MCP Server Proxy Generator</h3>
                  <span className="text-[10px] font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">For Developers</span>
                </div>
                <p className="text-xs text-zinc-500">
                  Build a complete MCP server that wraps any REST API. Helps with Step 4: CONNECT.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-6 space-y-5">
              {/* Server Config */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Server Name</label>
                  <input
                    type="text"
                    placeholder="Example Corp"
                    value={mcpName}
                    onChange={(e) => setMcpName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Domain</label>
                  <input
                    type="text"
                    placeholder="example.com"
                    value={mcpDomain}
                    onChange={(e) => setMcpDomain(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">API Base URL</label>
                <input
                  type="text"
                  placeholder="https://api.example.com"
                  value={mcpApiBase}
                  onChange={(e) => setMcpApiBase(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Auth Type</label>
                  <select
                    value={mcpAuthType}
                    onChange={(e) => setMcpAuthType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                  >
                    <option value="api_key">API Key</option>
                    <option value="bearer">Bearer Token</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Auth Header</label>
                  <input
                    type="text"
                    placeholder="X-API-Key"
                    value={mcpAuthHeader}
                    onChange={(e) => setMcpAuthHeader(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                  />
                </div>
              </div>

              {/* Endpoints Builder */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    API Endpoints ({mcpEndpoints.length})
                  </h4>
                  <button
                    type="button"
                    onClick={addEndpoint}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-cyan-800/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-700/50 text-xs font-medium transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add Endpoint
                  </button>
                </div>

                <div className="space-y-4">
                  {mcpEndpoints.map((ep) => (
                    <div
                      key={ep.id}
                      className="rounded-lg bg-zinc-800/40 border border-zinc-700/40 p-4 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <select
                          value={ep.method}
                          onChange={(e) => updateEndpoint(ep.id, 'method', e.target.value)}
                          className="px-2 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-600"
                        >
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="PATCH">PATCH</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                        <input
                          type="text"
                          placeholder="/users"
                          value={ep.path}
                          onChange={(e) => updateEndpoint(ep.id, 'path', e.target.value)}
                          className="flex-1 px-2 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-600"
                        />
                        <button
                          type="button"
                          onClick={() => removeEndpoint(ep.id)}
                          disabled={mcpEndpoints.length <= 1}
                          className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 disabled:opacity-30 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Description: e.g. List all users"
                        value={ep.description}
                        onChange={(e) => updateEndpoint(ep.id, 'description', e.target.value)}
                        className="w-full px-2 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-600"
                      />

                      {/* Query Params */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                            Query Params
                          </span>
                          <button
                            type="button"
                            onClick={() => addParam(ep.id)}
                            className="text-[10px] text-cyan-500 hover:text-cyan-400 font-medium"
                          >
                            + Add
                          </button>
                        </div>
                        {ep.params.map((p, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 mb-1.5">
                            <input
                              type="text"
                              placeholder="name"
                              value={p.name}
                              onChange={(e) => updateParam(ep.id, idx, 'name', e.target.value)}
                              className="flex-1 px-2 py-1 rounded bg-zinc-900 border border-zinc-700/50 text-[11px] font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-700"
                            />
                            <select
                              value={p.type}
                              onChange={(e) => updateParam(ep.id, idx, 'type', e.target.value)}
                              className="px-1.5 py-1 rounded bg-zinc-900 border border-zinc-700/50 text-[11px] text-zinc-300 focus:outline-none"
                            >
                              <option value="string">string</option>
                              <option value="number">number</option>
                              <option value="boolean">boolean</option>
                            </select>
                            <label className="flex items-center gap-1 text-[10px] text-zinc-500">
                              <input
                                type="checkbox"
                                checked={p.required}
                                onChange={(e) => updateParam(ep.id, idx, 'required', e.target.checked)}
                                className="rounded border-zinc-600"
                              />
                              req
                            </label>
                            <button
                              type="button"
                              onClick={() => removeParam(ep.id, idx)}
                              className="p-0.5 text-zinc-600 hover:text-red-400"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Body Fields (for POST/PUT/PATCH) */}
                      {['POST', 'PUT', 'PATCH'].includes(ep.method) && (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                              Body Fields
                            </span>
                            <button
                              type="button"
                              onClick={() => addBodyField(ep.id)}
                              className="text-[10px] text-cyan-500 hover:text-cyan-400 font-medium"
                            >
                              + Add
                            </button>
                          </div>
                          {ep.bodyFields.map((bf, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 mb-1.5">
                              <input
                                type="text"
                                placeholder="field name"
                                value={bf.name}
                                onChange={(e) => updateBodyField(ep.id, idx, 'name', e.target.value)}
                                className="flex-1 px-2 py-1 rounded bg-zinc-900 border border-zinc-700/50 text-[11px] font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-700"
                              />
                              <select
                                value={bf.type}
                                onChange={(e) => updateBodyField(ep.id, idx, 'type', e.target.value)}
                                className="px-1.5 py-1 rounded bg-zinc-900 border border-zinc-700/50 text-[11px] text-zinc-300 focus:outline-none"
                              >
                                <option value="string">string</option>
                                <option value="number">number</option>
                                <option value="boolean">boolean</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => removeBodyField(ep.id, idx)}
                                className="p-0.5 text-zinc-600 hover:text-red-400"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={generateMcpProxy}
                disabled={mcpLoading || !mcpName.trim() || !mcpApiBase.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 disabled:text-cyan-400 text-white text-sm font-semibold transition-colors"
              >
                {mcpLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Server className="h-4 w-4" />
                )}
                Generate MCP Server
              </button>
            </div>

            {mcpResult && (
              <div className="mt-4">
                <FilePreview
                  file={mcpResult}
                  copiedId={copiedFile}
                  onCopy={copyToClipboard}
                  onDownload={downloadFile}
                />
              </div>
            )}
          </section>
        </FadeIn>

        {/* ==== OpenAPI-to-MCP Converter ==== */}
        <FadeIn>
          <section id="openapi-converter">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Code2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">OpenAPI-to-MCP Converter</h3>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">For Developers</span>
                </div>
                <p className="text-xs text-zinc-500">
                  Paste an OpenAPI/Swagger JSON spec and get a fully generated MCP server. Helps with Step 2: UNDERSTAND.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  OpenAPI Spec (JSON)
                </label>
                <textarea
                  rows={10}
                  placeholder={'{ "openapi": "3.0.0", "info": { "title": "My API" }, "paths": { ... } }'}
                  value={openApiJson}
                  onChange={(e) => {
                    setOpenApiJson(e.target.value)
                    setOpenApiError('')
                  }}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors resize-y"
                />
                {openApiError && (
                  <p className="mt-1.5 text-xs text-red-400">{openApiError}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={generateFromOpenApi}
                  disabled={openApiLoading || !openApiJson.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-400 text-white text-sm font-semibold transition-colors"
                >
                  {openApiLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Code2 className="h-4 w-4" />
                  )}
                  Convert to MCP Server
                </button>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer">
                  <Upload className="h-4 w-4" />
                  Upload JSON
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onload = (ev) => {
                        const text = ev.target?.result
                        if (typeof text === 'string') {
                          setOpenApiJson(text)
                          setOpenApiError('')
                        }
                      }
                      reader.readAsText(file)
                      e.target.value = ''
                    }}
                  />
                </label>
              </div>
            </div>

            {openApiResult && (
              <div className="mt-4">
                <FilePreview
                  file={openApiResult}
                  copiedId={copiedFile}
                  onCopy={copyToClipboard}
                  onDownload={downloadFile}
                />
              </div>
            )}
          </section>
        </FadeIn>
      </div>

      {/* ================================================================ */}
      {/* Bottom CTAs */}
      {/* ================================================================ */}
      <FadeIn>
        <div className="mt-16 space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Next Steps</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Get Score */}
            <Link
              href="/audit"
              className="group rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-amber-800/30 p-6 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="font-semibold text-zinc-200">Get Your Score First</h3>
              </div>
              <p className="text-xs text-zinc-500 mb-3">
                Have not scanned yet? Get your Agent Readiness Score in 60 seconds. Free, no signup required.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 group-hover:text-amber-300 transition-colors">
                Scan now <ArrowRight className="h-3 w-3" />
              </span>
            </Link>

            {/* Connect to Gateway */}
            <Link
              href="/connect"
              className="group rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-emerald-800/30 p-6 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-zinc-200">Connect to Gateway</h3>
              </div>
              <p className="text-xs text-zinc-500 mb-3">
                Skip the fixing {'\u2014'} just connect your API to the AgentHermes gateway. We handle discovery, auth, and payments for you.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                Get connected <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>

          {/* AffixedAI CTA */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-amber-800/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-200 mb-1">
                  Need help getting agent-ready?
                </h3>
                <p className="text-xs text-zinc-500">
                  AffixedAI specializes in making businesses machine-readable and agent-compatible. MCP servers, API endpoints, structured pricing, payment acceptance {'\u2014'} done for you.
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
      </FadeIn>
    </div>
  )
}

export default function RemediatePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://agenthermes.ai' },
        { name: 'Fix It', url: 'https://agenthermes.ai/remediate' },
      ]} />
      <Suspense
        fallback={
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
            <Loader2 className="h-8 w-8 text-amber-500 animate-spin mx-auto" />
          </div>
        }
      >
        <RemediatePageContent />
      </Suspense>
    </>
  )
}
