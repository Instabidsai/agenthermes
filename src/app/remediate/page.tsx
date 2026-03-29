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
} from 'lucide-react'
import clsx from 'clsx'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

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

// --- Helpers ---

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

// --- File Preview Component ---

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
// Main Page
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
    document.title = 'Remediate | AgentHermes'
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
        // Auto-trigger fetch via a deferred call
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
        'llms-txt': 'machine_readable_profile',
        'agent-card': 'machine_readable_profile',
        'openapi': 'mcp_api_endpoints',
        'onboarding': 'agent_native_onboarding',
        'payments': 'agent_payment_acceptance',
      }
      const targetCategory = generatorMap[fixParam]
      if (targetCategory) {
        setTimeout(() => {
          const el = document.getElementById(`cat-${targetCategory}`)
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
          Enter your domain to see what AI agents cannot access. We will show you exactly what to fix and generate the files your developer needs to deploy.
        </p>
      </div>

      {/* Domain Input */}
      <div className="mb-10">
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
              className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            id="remediate-scan-btn"
            type="button"
            onClick={fetchScore}
            disabled={phase === 'loading' || !domainInput.trim()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 disabled:text-amber-400 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
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
                  id={`cat-${cat.category}`}
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

                  {/* Fix Actions */}
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
                              Developer Required
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
                <FilePreview
                  key={file.type}
                  file={file}
                  copiedId={copiedFile}
                  onCopy={copyToClipboard}
                  onDownload={downloadFile}
                />
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

          {/* Re-audit + Register CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/audit?domain=${audit.domain}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-colors"
            >
              <Shield className="h-4 w-4" />
              Re-scan your score
            </Link>
            <Link
              href={`/register?domain=${audit.domain}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
            >
              Register your business
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

      {/* ================================================================== */}
      {/* Standalone Generators — always visible */}
      {/* ================================================================== */}

      <div className="mt-16 space-y-16">
        {/* ---- Divider ---- */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Standalone Generators
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <p className="text-sm text-zinc-500 text-center max-w-xl mx-auto -mt-8">
          These tools generate agent-readiness files for any domain {'\u2014'} no audit required. Share the output with your developer for deployment.
        </p>

        {/* ==== Schema.org Generator ==== */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Braces className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Schema.org Generator</h2>
              <p className="text-xs text-zinc-500">
                Generate JSON-LD structured data markup for your business.
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

        {/* ==== MCP Server Proxy Generator ==== */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Server className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">MCP Server Proxy Generator</h2>
                <span className="text-[10px] font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">For Developers</span>
              </div>
              <p className="text-xs text-zinc-500">
                Build a complete MCP server that wraps any REST API. Define your endpoints and get deployable code.
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

        {/* ==== OpenAPI-to-MCP Converter ==== */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Code2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">OpenAPI-to-MCP Converter</h2>
                <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">For Developers</span>
              </div>
              <p className="text-xs text-zinc-500">
                Paste an OpenAPI/Swagger JSON spec and get a fully generated MCP server.
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
                placeholder='{ "openapi": "3.0.0", "info": { "title": "My API" }, "paths": { ... } }'
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
      </div>
    </div>
  )
}

export default function RemediatePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://agenthermes.ai' },
        { name: 'Remediate', url: 'https://agenthermes.ai/remediate' },
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
