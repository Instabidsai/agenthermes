import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Activity,
  Zap,
  Clock,
  DollarSign,
  Shield,
  Terminal,
  Code2,
  Key,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Wrench,
  BarChart3,
  Copy,
} from 'lucide-react'
import { getServiceClient } from '@/lib/supabase'
import type { ServiceAction } from '@/lib/gateway/types'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

export const revalidate = 60

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GatewayServiceDetail {
  id: string
  name: string
  description: string | null
  api_base_url: string
  auth_type: string
  actions: ServiceAction[]
  cost_per_call: number
  cost_model: string
  our_margin: number
  rate_limit_per_min: number
  category: string | null
  status: string
  uptime_pct: number | null
  last_health_check: string | null
  created_at: string
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getService(id: string): Promise<GatewayServiceDetail | null> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return null
  }

  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('gateway_services')
    .select(
      'id, name, description, api_base_url, auth_type, actions, cost_per_call, cost_model, our_margin, rate_limit_per_min, category, status, uptime_pct, last_health_check, created_at'
    )
    .eq('id', id)
    .single()

  if (error || !data) return null

  const row = data as Record<string, unknown>
  return {
    id: row.id as string,
    name: row.name as string,
    description: row.description as string | null,
    api_base_url: row.api_base_url as string,
    auth_type: row.auth_type as string,
    actions: (row.actions as ServiceAction[]) || [],
    cost_per_call: row.cost_per_call as number,
    cost_model: row.cost_model as string,
    our_margin: row.our_margin as number,
    rate_limit_per_min: row.rate_limit_per_min as number,
    category: row.category as string | null,
    status: row.status as string,
    uptime_pct: row.uptime_pct as number | null,
    last_health_check: row.last_health_check as string | null,
    created_at: row.created_at as string,
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCost(n: number): string {
  if (n === 0) return 'Free'
  if (n < 0.01) return `$${n.toFixed(4)}`
  if (n < 1) return `$${n.toFixed(3)}`
  return `$${n.toFixed(2)}`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: 'Operational', color: 'text-emerald-400', dot: 'bg-emerald-500' },
  maintenance: { label: 'Maintenance', color: 'text-amber-400', dot: 'bg-amber-500' },
  inactive: { label: 'Offline', color: 'text-red-400', dot: 'bg-red-500' },
}

const methodColors: Record<string, string> = {
  GET: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  POST: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  PUT: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  PATCH: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  DELETE: 'text-red-400 bg-red-500/10 border-red-500/20',
}

const categoryColors: Record<string, string> = {
  ai: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  video: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  voice: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  media: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  database: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  payments: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  communication: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  analytics: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
}

function CodeBlock({
  language,
  label,
  children,
}: {
  language: string
  label?: string
  children: string
}) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
      {label && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              {language}
            </span>
            <span className="text-[11px] text-zinc-600 font-mono">{label}</span>
          </div>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        <code className={`language-${language} text-zinc-300`}>{children}</code>
      </pre>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function GatewayServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = await getService(id)

  if (!service) {
    notFound()
  }

  const status = statusConfig[service.status] || statusConfig.inactive
  const catColor =
    categoryColors[service.category?.toLowerCase() || ''] ||
    'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
  const totalCostWithMargin = service.cost_per_call + service.cost_per_call * service.our_margin
  const firstAction = service.actions[0]

  // Build code examples
  const mcpExample = `{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "call_service",
    "arguments": {
      "service_id": "${service.id}",
      "action": "${firstAction?.name || 'your_action'}",
      "params": ${firstAction?.params_schema ? JSON.stringify({ '...': 'your params' }, null, 6).replace(/\n/g, '\n      ') : '{}'},
      "wallet_id": "YOUR_WALLET_ID"
    }
  },
  "id": 1
}`

  const curlExample = `curl -X POST https://agenthermes.ai/api/v1/gateway/call \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service_id": "${service.id}",
    "action": "${firstAction?.name || 'your_action'}",
    "params": {},
    "wallet_id": "YOUR_WALLET_ID"
  }'`

  const pythonExample = `from hermes import AgentHermes

client = AgentHermes(api_key="YOUR_API_KEY")

result = client.call_service(
    service_id="${service.id}",
    action="${firstAction?.name || 'your_action'}",
    params={},
    wallet_id="YOUR_WALLET_ID",
)

print(result.data)
print(f"Cost: ${'{'}result.billing.total_charged{'}'}")
print(f"Latency: ${'{'}result.meta.response_ms{'}'}ms")`

  return (
    <div className="relative">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://agenthermes.ai' },
          { name: 'Gateway', url: 'https://agenthermes.ai/gateway' },
          { name: service.name, url: `https://agenthermes.ai/gateway/${service.id}` },
        ]}
      />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Back link */}
        <Link
          href="/gateway"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gateway
        </Link>

        {/* =============================================================== */}
        {/* Hero                                                            */}
        {/* =============================================================== */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left: name, desc, badges */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {service.category && (
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider border ${catColor}`}
                  >
                    {service.category}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                  <span
                    className={`h-2 w-2 rounded-full ${status.dot} ${service.status === 'active' ? 'animate-subtle-pulse' : ''}`}
                  />
                  <span className={status.color}>{status.label}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {service.name}
              </h1>

              {service.description && (
                <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              )}
            </div>

            {/* Right: cost card */}
            <div className="flex-shrink-0 w-full lg:w-80">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2">
                  Cost per call
                </div>
                <div className="text-3xl font-bold font-mono tabular-nums text-zinc-100 mb-1">
                  {formatCost(totalCostWithMargin)}
                </div>
                <div className="text-xs text-zinc-600 mb-5">
                  Base {formatCost(service.cost_per_call)} + {Math.round(service.our_margin * 100)}%
                  gateway fee &middot; {service.cost_model}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5" />
                      Rate limit
                    </span>
                    <span className="font-mono text-zinc-300">
                      {service.rate_limit_per_min} req/min
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5" />
                      Auth type
                    </span>
                    <span className="font-mono text-zinc-300">
                      {service.auth_type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 flex items-center gap-2">
                      <Terminal className="h-3.5 w-3.5" />
                      Actions
                    </span>
                    <span className="font-mono text-zinc-300">{service.actions.length}</span>
                  </div>
                  {service.uptime_pct !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 flex items-center gap-2">
                        <Activity className="h-3.5 w-3.5" />
                        Uptime
                      </span>
                      <span className="font-mono text-emerald-400">
                        {service.uptime_pct.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-5 border-t border-zinc-800/80">
                  <div className="text-[10px] text-zinc-600 font-mono">
                    Added {formatDate(service.created_at)}
                    {service.last_health_check && (
                      <>
                        {' '}
                        &middot; Last check {formatDate(service.last_health_check)}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =============================================================== */}
        {/* Usage Stats Placeholder                                         */}
        {/* =============================================================== */}
        <section className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-5 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-zinc-500" />
            Usage Statistics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Total Calls',
                value: '--',
                sub: 'All time',
                icon: Activity,
              },
              {
                label: 'Revenue Generated',
                value: '--',
                sub: 'All time',
                icon: DollarSign,
              },
              {
                label: 'Avg Response Time',
                value: '--',
                sub: 'Last 24h',
                icon: Clock,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <stat.icon className="h-4 w-4 text-zinc-600" />
                  <span className="text-xs text-zinc-500 font-medium">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-zinc-300">
                  {stat.value}
                </div>
                <div className="text-[10px] text-zinc-600 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-600 mt-3">
            Usage statistics will populate once calls flow through this service.
          </p>
        </section>

        {/* =============================================================== */}
        {/* Actions Table                                                   */}
        {/* =============================================================== */}
        <section className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-5 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-zinc-500" />
            Available Actions
            <span className="text-sm font-normal text-zinc-600 ml-1">
              ({service.actions.length})
            </span>
          </h2>

          {service.actions.length === 0 ? (
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-8 text-center">
              <AlertCircle className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
              <p className="text-sm text-zinc-500">
                No actions have been configured for this service yet.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden">
              {/* Table header */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/60 text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
                <div className="col-span-3">Action</div>
                <div className="col-span-1">Method</div>
                <div className="col-span-2">Path</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-1 text-right">Cost</div>
                <div className="col-span-2 text-right">Parameters</div>
              </div>

              {/* Rows */}
              {service.actions.map((action, i) => {
                const cost = action.cost_override ?? service.cost_per_call
                const mc =
                  methodColors[action.method.toUpperCase()] ||
                  'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
                const paramCount = action.params_schema
                  ? Object.keys(action.params_schema).length
                  : 0

                return (
                  <div
                    key={action.name}
                    className={`px-5 py-4 ${i < service.actions.length - 1 ? 'border-b border-zinc-800/40' : ''} hover:bg-zinc-800/20 transition-colors`}
                  >
                    {/* Desktop layout */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                      <div className="col-span-3">
                        <code className="text-sm font-mono font-semibold text-zinc-200">
                          {action.name}
                        </code>
                      </div>
                      <div className="col-span-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${mc}`}
                        >
                          {action.method}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <code className="text-xs font-mono text-zinc-400">{action.path}</code>
                      </div>
                      <div className="col-span-3">
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          {action.description || '--'}
                        </p>
                      </div>
                      <div className="col-span-1 text-right">
                        <span className="text-xs font-mono text-zinc-300">
                          {formatCost(cost)}
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                        {paramCount > 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                            <Code2 className="h-3 w-3" />
                            {paramCount} param{paramCount !== 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-xs text-zinc-600">--</span>
                        )}
                      </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="lg:hidden space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${mc}`}
                        >
                          {action.method}
                        </span>
                        <code className="text-sm font-mono font-semibold text-zinc-200">
                          {action.name}
                        </code>
                      </div>
                      <code className="text-xs font-mono text-zinc-500 block">{action.path}</code>
                      {action.description && (
                        <p className="text-xs text-zinc-500">{action.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs">
                        <span className="font-mono text-zinc-300">{formatCost(cost)}</span>
                        {paramCount > 0 && (
                          <span className="text-zinc-600">
                            {paramCount} param{paramCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      {/* Param schema inline on mobile */}
                      {action.params_schema &&
                        Object.keys(action.params_schema).length > 0 && (
                          <div className="mt-2 rounded-lg border border-zinc-800/60 bg-zinc-950 p-3 overflow-x-auto">
                            <pre className="text-[11px] text-zinc-400 font-mono leading-relaxed">
                              {JSON.stringify(action.params_schema, null, 2)}
                            </pre>
                          </div>
                        )}
                    </div>

                    {/* Desktop param schema expandable */}
                    {action.params_schema &&
                      Object.keys(action.params_schema).length > 0 && (
                        <div className="hidden lg:block mt-3 ml-0 rounded-lg border border-zinc-800/60 bg-zinc-950 p-3 overflow-x-auto">
                          <div className="text-[10px] text-zinc-600 uppercase tracking-wider font-semibold mb-2">
                            Parameter Schema
                          </div>
                          <pre className="text-[11px] text-zinc-400 font-mono leading-relaxed">
                            {JSON.stringify(action.params_schema, null, 2)}
                          </pre>
                        </div>
                      )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* =============================================================== */}
        {/* Try It - Code Examples                                          */}
        {/* =============================================================== */}
        <section className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-zinc-500" />
            Try It
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Call this service through the AgentHermes gateway. One API key handles auth, billing,
            and logging.
          </p>

          <div className="space-y-6">
            {/* MCP */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20">
                  MCP
                </span>
                JSON-RPC via MCP Server
              </h3>
              <CodeBlock language="json" label="call_service tool">
                {mcpExample}
              </CodeBlock>
            </div>

            {/* REST */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  REST
                </span>
                cURL
              </h3>
              <CodeBlock language="bash" label="/api/v1/gateway/call">
                {curlExample}
              </CodeBlock>
            </div>

            {/* Python SDK */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20">
                  Python
                </span>
                SDK
              </h3>
              <CodeBlock language="python" label="pip install hermes-sdk">
                {pythonExample}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* =============================================================== */}
        {/* How To Use — Dual Payment Path                                  */}
        {/* =============================================================== */}
        <section className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-5 flex items-center gap-2">
            <Key className="h-5 w-5 text-zinc-500" />
            How to Use This Service
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Path 1: Through AgentHermes */}
            <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-6 relative">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  Recommended
                </span>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>

              <h3 className="text-base font-bold tracking-tight mb-2">
                Through AgentHermes Gateway
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Use our MCP server or REST API. We handle authentication, billing, and logging for every call.
              </p>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="text-zinc-300">
                    Cost: <span className="font-mono font-semibold">{formatCost(totalCostWithMargin)}</span>/call
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="text-zinc-300">One API key for all services</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="text-zinc-300">Built-in usage tracking & budgets</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="text-zinc-300">Encrypted credential vault</span>
                </div>
              </div>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                <Key className="h-4 w-4" />
                Get Started
              </Link>
            </div>

            {/* Path 2: Direct Connection */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 mb-4">
                <ExternalLink className="h-5 w-5 text-zinc-400" />
              </div>

              <h3 className="text-base font-bold tracking-tight mb-2">
                Direct Connection
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Visit {service.name} directly to get your own API key. Use their API without the gateway.
              </p>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" />
                  <span className="text-zinc-400">
                    Cost: <span className="font-mono">{formatCost(service.cost_per_call)}</span>/call (base rate)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" />
                  <span className="text-zinc-400">You manage your own API keys</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" />
                  <span className="text-zinc-400">You handle auth and billing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" />
                  <span className="text-zinc-400">No unified agent dashboard</span>
                </div>
              </div>

              <a
                href={service.api_base_url.replace(/\/+$/, '').replace(/\/api.*$/, '')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 text-sm font-medium transition-colors"
              >
                Visit {service.name}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* =============================================================== */}
        {/* Response Format                                                 */}
        {/* =============================================================== */}
        <section className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-5 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-zinc-500" />
            Response Format
          </h2>
          <CodeBlock language="json" label="200 OK">
            {`{
  "success": true,
  "data": { "..." },
  "billing": {
    "cost": ${service.cost_per_call.toFixed(4)},
    "margin": ${(service.cost_per_call * service.our_margin).toFixed(4)},
    "total_charged": ${totalCostWithMargin.toFixed(4)}
  },
  "meta": {
    "service_name": "${service.name}",
    "action_name": "${firstAction?.name || 'your_action'}",
    "status_code": 200,
    "response_ms": 142
  }
}`}
          </CodeBlock>
        </section>

        {/* =============================================================== */}
        {/* Bottom nav                                                      */}
        {/* =============================================================== */}
        <div className="flex items-center justify-between pt-8 border-t border-zinc-800/50">
          <Link
            href="/gateway"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Services
          </Link>
          <Link
            href="/developers"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            API Docs
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
