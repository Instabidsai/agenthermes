'use client'

import { useEffect, useState, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ComponentStatus = 'operational' | 'degraded' | 'down' | 'checking'

interface ComponentCheck {
  name: string
  description: string
  status: ComponentStatus
  latencyMs: number | null
  detail: string | null
}

interface StatusData {
  overall: ComponentStatus
  components: ComponentCheck[]
  checkedAt: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_COLORS: Record<ComponentStatus, string> = {
  operational: '#10b981', // emerald-500
  degraded: '#f59e0b',   // amber-500
  down: '#ef4444',       // red-500
  checking: '#71717a',   // zinc-500
}

const STATUS_LABELS: Record<ComponentStatus, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
  checking: 'Checking...',
}

const OVERALL_MESSAGES: Record<ComponentStatus, string> = {
  operational: 'All systems operational',
  degraded: 'Some systems experiencing issues',
  down: 'Major outage detected',
  checking: 'Checking system status...',
}

function deriveOverall(components: ComponentCheck[]): ComponentStatus {
  if (components.some((c) => c.status === 'checking')) return 'checking'
  if (components.some((c) => c.status === 'down')) return 'down'
  if (components.some((c) => c.status === 'degraded')) return 'degraded'
  return 'operational'
}

// ---------------------------------------------------------------------------
// Component checks — runs in the browser against live endpoints
// ---------------------------------------------------------------------------

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : ''

async function checkAPI(): Promise<ComponentCheck> {
  const name = 'API'
  const description = 'Core REST API'
  try {
    const start = performance.now()
    const res = await fetch(`${BASE_URL}/api/v1/health`, { cache: 'no-store' })
    const latencyMs = Math.round(performance.now() - start)
    if (!res.ok) {
      return { name, description, status: 'down', latencyMs, detail: `HTTP ${res.status}` }
    }
    const data = await res.json()
    if (data.status === 'healthy') {
      return { name, description, status: latencyMs > 3000 ? 'degraded' : 'operational', latencyMs, detail: null }
    }
    return { name, description, status: 'degraded', latencyMs, detail: `status: ${data.status}` }
  } catch (err) {
    return { name, description, status: 'down', latencyMs: null, detail: err instanceof Error ? err.message : 'Connection failed' }
  }
}

async function checkScoreAPI(): Promise<ComponentCheck> {
  const name = 'Score API'
  const description = 'Agent Readiness Score lookup'
  try {
    const start = performance.now()
    const res = await fetch(`${BASE_URL}/api/v1/score/agenthermes.ai`, { cache: 'no-store' })
    const latencyMs = Math.round(performance.now() - start)
    if (!res.ok) {
      return { name, description, status: 'down', latencyMs, detail: `HTTP ${res.status}` }
    }
    return { name, description, status: latencyMs > 5000 ? 'degraded' : 'operational', latencyMs, detail: null }
  } catch (err) {
    return { name, description, status: 'down', latencyMs: null, detail: err instanceof Error ? err.message : 'Connection failed' }
  }
}

async function checkMCP(): Promise<ComponentCheck> {
  const name = 'MCP Server'
  const description = 'JSON-RPC 2.0 Model Context Protocol'
  try {
    const start = performance.now()
    const res = await fetch(`${BASE_URL}/api/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 'status-ping', method: 'ping' }),
      cache: 'no-store',
    })
    const latencyMs = Math.round(performance.now() - start)
    if (!res.ok) {
      return { name, description, status: 'down', latencyMs, detail: `HTTP ${res.status}` }
    }
    const data = await res.json()
    if (data.result?.status === 'pong') {
      return { name, description, status: latencyMs > 5000 ? 'degraded' : 'operational', latencyMs, detail: null }
    }
    return { name, description, status: 'degraded', latencyMs, detail: 'Unexpected response' }
  } catch (err) {
    return { name, description, status: 'down', latencyMs: null, detail: err instanceof Error ? err.message : 'Connection failed' }
  }
}

async function checkBadge(): Promise<ComponentCheck> {
  const name = 'Badge Service'
  const description = 'SVG badge generation'
  try {
    const start = performance.now()
    const res = await fetch(`${BASE_URL}/api/badge/agenthermes.ai`, { cache: 'no-store' })
    const latencyMs = Math.round(performance.now() - start)
    if (!res.ok) {
      return { name, description, status: 'down', latencyMs, detail: `HTTP ${res.status}` }
    }
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('svg')) {
      return { name, description, status: 'degraded', latencyMs, detail: `Unexpected content-type: ${ct}` }
    }
    return { name, description, status: latencyMs > 5000 ? 'degraded' : 'operational', latencyMs, detail: null }
  } catch (err) {
    return { name, description, status: 'down', latencyMs: null, detail: err instanceof Error ? err.message : 'Connection failed' }
  }
}

async function checkScanner(): Promise<ComponentCheck> {
  const name = 'Scanner'
  const description = '9-dimension readiness scanner'
  // We do NOT trigger a real scan (expensive + rate-limited).
  // Instead, check if the score API returned data — if it has a recent score,
  // the scanner has been active. If no score at all, mark as degraded (not down,
  // since the endpoint itself may be fine — just no data).
  try {
    const start = performance.now()
    const res = await fetch(`${BASE_URL}/api/v1/score/agenthermes.ai`, { cache: 'no-store' })
    const latencyMs = Math.round(performance.now() - start)
    if (!res.ok) {
      return { name, description, status: 'degraded', latencyMs, detail: 'Could not verify recent scans' }
    }
    const data = await res.json()
    if (data.score !== null && data.score !== undefined) {
      // Check if last_audited is within the last 30 days
      if (data.last_audited) {
        const lastAudit = new Date(data.last_audited)
        const daysSince = (Date.now() - lastAudit.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSince > 30) {
          return { name, description, status: 'degraded', latencyMs, detail: `Last scan ${Math.round(daysSince)}d ago` }
        }
      }
      return { name, description, status: 'operational', latencyMs, detail: null }
    }
    return { name, description, status: 'degraded', latencyMs, detail: 'No recent scan data available' }
  } catch (err) {
    return { name, description, status: 'degraded', latencyMs: null, detail: err instanceof Error ? err.message : 'Check failed' }
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function StatusPage() {
  const [data, setData] = useState<StatusData>({
    overall: 'checking',
    components: [
      { name: 'API', description: 'Core REST API', status: 'checking', latencyMs: null, detail: null },
      { name: 'Score API', description: 'Agent Readiness Score lookup', status: 'checking', latencyMs: null, detail: null },
      { name: 'MCP Server', description: 'JSON-RPC 2.0 Model Context Protocol', status: 'checking', latencyMs: null, detail: null },
      { name: 'Badge Service', description: 'SVG badge generation', status: 'checking', latencyMs: null, detail: null },
      { name: 'Scanner', description: '9-dimension readiness scanner', status: 'checking', latencyMs: null, detail: null },
    ],
    checkedAt: new Date().toISOString(),
  })

  const runChecks = useCallback(async () => {
    const results = await Promise.all([
      checkAPI(),
      checkScoreAPI(),
      checkMCP(),
      checkBadge(),
      checkScanner(),
    ])
    setData({
      overall: deriveOverall(results),
      components: results,
      checkedAt: new Date().toISOString(),
    })
  }, [])

  useEffect(() => {
    runChecks()
    const interval = setInterval(runChecks, 30_000)
    return () => clearInterval(interval)
  }, [runChecks])

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#09090b]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            System Status
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            agenthermes.ai
          </p>
        </div>

        {/* Overall indicator */}
        <div
          className="rounded-xl border p-6 mb-8"
          style={{
            borderColor: data.overall === 'checking' ? '#27272a' : `${STATUS_COLORS[data.overall]}33`,
            backgroundColor: data.overall === 'checking' ? '#18181b' : `${STATUS_COLORS[data.overall]}08`,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full shrink-0"
              style={{
                backgroundColor: STATUS_COLORS[data.overall],
                boxShadow: data.overall !== 'checking' ? `0 0 8px ${STATUS_COLORS[data.overall]}66` : 'none',
              }}
            />
            <span
              className="text-lg font-semibold"
              style={{ color: STATUS_COLORS[data.overall] }}
            >
              {OVERALL_MESSAGES[data.overall]}
            </span>
          </div>
        </div>

        {/* Component list */}
        <div className="rounded-xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800/80">
          {data.components.map((component) => (
            <div
              key={component.name}
              className="flex items-center justify-between px-5 py-4 bg-zinc-900/40"
            >
              {/* Left side: name + description */}
              <div className="min-w-0">
                <div className="text-sm font-medium text-zinc-200">
                  {component.name}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {component.description}
                </div>
                {component.detail && (
                  <div className="text-xs text-zinc-600 mt-0.5 truncate max-w-[280px]">
                    {component.detail}
                  </div>
                )}
              </div>

              {/* Right side: status badge + latency */}
              <div className="flex items-center gap-3 shrink-0 ml-4">
                {component.latencyMs !== null && component.status !== 'checking' && (
                  <span className="text-xs text-zinc-600 tabular-nums">
                    {component.latencyMs}ms
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: STATUS_COLORS[component.status],
                      boxShadow: component.status === 'operational' ? `0 0 6px ${STATUS_COLORS.operational}66` : 'none',
                    }}
                  />
                  <span
                    className="text-xs font-medium whitespace-nowrap"
                    style={{ color: STATUS_COLORS[component.status] }}
                  >
                    {STATUS_LABELS[component.status]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: last checked + refresh info */}
        <div className="mt-6 flex items-center justify-between text-xs text-zinc-600">
          <div>
            Last checked:{' '}
            <time dateTime={data.checkedAt} className="text-zinc-500">
              {new Date(data.checkedAt).toLocaleTimeString()}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-subtle-pulse"
            />
            Auto-refreshes every 30s
          </div>
        </div>
      </div>
    </div>
  )
}
