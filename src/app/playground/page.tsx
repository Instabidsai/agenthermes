'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  Terminal,
  Play,
  Copy,
  Check,
  ChevronDown,
  Clock,
  Loader2,
  AlertCircle,
  Globe,
  Search,
  Trophy,
  Plug,
  Heart,
} from 'lucide-react'
import clsx from 'clsx'

/* ─── Endpoint Definitions ─── */

interface EndpointParam {
  name: string
  type: 'path' | 'query'
  label: string
  placeholder: string
  defaultValue: string
  required?: boolean
}

interface EndpointDef {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  label: string
  path: string
  description: string
  icon: typeof Terminal
  params: EndpointParam[]
}

const BASE_URL = 'https://agenthermes.ai'

const ENDPOINTS: EndpointDef[] = [
  {
    id: 'score',
    method: 'GET',
    label: 'Score Domain',
    path: '/api/v1/score/{domain}',
    description:
      'Get the Agent Readiness Score for a domain. Returns a 0-100 score across 9 dimensions plus tier classification.',
    icon: Globe,
    params: [
      {
        name: 'domain',
        type: 'path',
        label: 'Domain',
        placeholder: 'stripe.com',
        defaultValue: 'stripe.com',
        required: true,
      },
    ],
  },
  {
    id: 'discover',
    method: 'GET',
    label: 'Discover Businesses',
    path: '/api/v1/discover',
    description:
      'Search the verified commerce network. Filter by vertical, tier, or free-text query. Returns matching businesses with scores.',
    icon: Search,
    params: [
      {
        name: 'q',
        type: 'query',
        label: 'Search query',
        placeholder: 'payment processing',
        defaultValue: 'payment processing',
      },
      {
        name: 'vertical',
        type: 'query',
        label: 'Vertical',
        placeholder: 'fintech',
        defaultValue: '',
      },
      {
        name: 'tier',
        type: 'query',
        label: 'Tier',
        placeholder: 'gold',
        defaultValue: '',
      },
      {
        name: 'limit',
        type: 'query',
        label: 'Limit',
        placeholder: '10',
        defaultValue: '10',
      },
    ],
  },
  {
    id: 'leaderboard',
    method: 'GET',
    label: 'Leaderboard',
    path: '/api/v1/leaderboard',
    description:
      'Top-scoring businesses ranked by Agent Readiness Score. Filter by vertical and limit results.',
    icon: Trophy,
    params: [
      {
        name: 'vertical',
        type: 'query',
        label: 'Vertical',
        placeholder: 'ecommerce',
        defaultValue: '',
      },
      {
        name: 'limit',
        type: 'query',
        label: 'Limit',
        placeholder: '25',
        defaultValue: '25',
      },
    ],
  },
  {
    id: 'gateway',
    method: 'GET',
    label: 'Gateway',
    path: '/api/v1/gateway',
    description:
      'Gateway service status and capabilities. Returns available proxy routes, vault status, and connected services.',
    icon: Plug,
    params: [],
  },
  {
    id: 'health',
    method: 'GET',
    label: 'Health Check',
    path: '/api/v1/health',
    description:
      'System health endpoint. Returns service status, version, uptime, and database connectivity.',
    icon: Heart,
    params: [],
  },
]

/* ─── Helpers ─── */

function buildUrl(endpoint: EndpointDef, values: Record<string, string>): string {
  let path = endpoint.path

  // Replace path params
  for (const param of endpoint.params) {
    if (param.type === 'path' && values[param.name]) {
      path = path.replace(`{${param.name}}`, encodeURIComponent(values[param.name]))
    }
  }

  // Build query string
  const queryParams = endpoint.params
    .filter((p) => p.type === 'query' && values[p.name])
    .map((p) => `${encodeURIComponent(p.name)}=${encodeURIComponent(values[p.name])}`)
    .join('&')

  return `${BASE_URL}${path}${queryParams ? '?' + queryParams : ''}`
}

function buildCurl(endpoint: EndpointDef, values: Record<string, string>): string {
  const url = buildUrl(endpoint, values)
  return `curl -s "${url}" \\\n  -H "Accept: application/json" | jq .`
}

function formatJson(data: unknown): string {
  try {
    return JSON.stringify(data, null, 2)
  } catch {
    return String(data)
  }
}

function getMethodColor(method: string): string {
  switch (method) {
    case 'GET':
      return 'text-emerald-400'
    case 'POST':
      return 'text-blue-400'
    case 'PUT':
      return 'text-amber-400'
    case 'DELETE':
      return 'text-red-400'
    default:
      return 'text-zinc-400'
  }
}

function getMethodBg(method: string): string {
  switch (method) {
    case 'GET':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    case 'POST':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'PUT':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    case 'DELETE':
      return 'bg-red-500/10 text-red-400 border-red-500/20'
    default:
      return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }
}

/* ─── JSON Syntax Highlighting ─── */

function highlightJson(json: string): React.ReactNode[] {
  const lines = json.split('\n')
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let key = 0

    // Match JSON tokens
    const tokenRegex =
      /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\b(?:true|false|null)\b)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],])/g
    let match: RegExpExecArray | null
    let lastIndex = 0

    while ((match = tokenRegex.exec(remaining)) !== null) {
      // Add any text before the match as whitespace
      if (match.index > lastIndex) {
        parts.push(
          <span key={key++} className="text-zinc-500">
            {remaining.slice(lastIndex, match.index)}
          </span>
        )
      }

      if (match[1]) {
        // Key (property name with colon)
        const colonIdx = match[1].lastIndexOf(':')
        parts.push(
          <span key={key++} className="text-emerald-300">
            {match[1].slice(0, colonIdx)}
          </span>
        )
        parts.push(
          <span key={key++} className="text-zinc-500">
            {match[1].slice(colonIdx)}
          </span>
        )
      } else if (match[2]) {
        // String value
        parts.push(
          <span key={key++} className="text-amber-300">
            {match[2]}
          </span>
        )
      } else if (match[3]) {
        // Boolean / null
        parts.push(
          <span key={key++} className="text-purple-400">
            {match[3]}
          </span>
        )
      } else if (match[4]) {
        // Number
        parts.push(
          <span key={key++} className="text-blue-400">
            {match[4]}
          </span>
        )
      } else if (match[5]) {
        // Punctuation
        parts.push(
          <span key={key++} className="text-zinc-500">
            {match[5]}
          </span>
        )
      }

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < remaining.length) {
      parts.push(
        <span key={key++} className="text-zinc-500">
          {remaining.slice(lastIndex)}
        </span>
      )
    }

    return (
      <div key={i} className="leading-relaxed">
        {parts.length > 0 ? parts : '\u00A0'}
      </div>
    )
  })
}

/* ─── Main Component ─── */

export default function PlaygroundPage() {
  const [selectedId, setSelectedId] = useState<string>('score')
  const [paramValues, setParamValues] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {}
    for (const ep of ENDPOINTS) {
      initial[ep.id] = {}
      for (const p of ep.params) {
        initial[ep.id][p.name] = p.defaultValue
      }
    }
    return initial
  })
  const [response, setResponse] = useState<{
    status: number | null
    statusText: string
    body: unknown
    duration: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [curlCopied, setCurlCopied] = useState(false)
  const [responseCopied, setResponseCopied] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const endpoint = useMemo(() => ENDPOINTS.find((e) => e.id === selectedId)!, [selectedId])
  const values = paramValues[selectedId] || {}

  const url = useMemo(() => buildUrl(endpoint, values), [endpoint, values])
  const curl = useMemo(() => buildCurl(endpoint, values), [endpoint, values])

  const setParam = useCallback(
    (name: string, value: string) => {
      setParamValues((prev) => ({
        ...prev,
        [selectedId]: { ...prev[selectedId], [name]: value },
      }))
    },
    [selectedId]
  )

  const sendRequest = useCallback(async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    const start = performance.now()
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
      })
      const duration = Math.round(performance.now() - start)

      let body: unknown
      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        body = await res.json()
      } else {
        body = await res.text()
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        body,
        duration,
      })
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - start)
      setError(err instanceof Error ? err.message : 'Request failed')
      setResponse({
        status: null,
        statusText: 'Error',
        body: null,
        duration,
      })
    } finally {
      setLoading(false)
    }
  }, [url])

  const copyToClipboard = useCallback(
    async (text: string, setter: (v: boolean) => void) => {
      try {
        await navigator.clipboard.writeText(text)
        setter(true)
        setTimeout(() => setter(false), 2000)
      } catch {
        /* clipboard not available */
      }
    },
    []
  )

  const statusColor =
    response?.status && response.status < 300
      ? 'text-emerald-400'
      : response?.status && response.status < 500
        ? 'text-amber-400'
        : 'text-red-400'

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Terminal className="h-5 w-5 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">API Playground</h1>
          </div>
          <p className="text-zinc-400 max-w-2xl">
            Test AgentHermes endpoints live. Select an endpoint, fill in parameters, and hit Send
            to see the response. Copy the equivalent curl command to use anywhere.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ─── Left Panel: Endpoint Selector + Params ─── */}
          <div className="space-y-5">
            {/* Endpoint selector */}
            <div className="relative">
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Endpoint
              </label>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-zinc-700/60 bg-zinc-900/80 hover:border-zinc-600 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={clsx(
                      'shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded border',
                      getMethodBg(endpoint.method)
                    )}
                  >
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-sm text-zinc-200 truncate">{endpoint.path}</span>
                </div>
                <ChevronDown
                  className={clsx(
                    'h-4 w-4 text-zinc-500 shrink-0 transition-transform',
                    dropdownOpen && 'rotate-180'
                  )}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute z-30 mt-1 w-full rounded-lg border border-zinc-700/60 bg-zinc-900 shadow-xl shadow-black/30 overflow-hidden">
                  {ENDPOINTS.map((ep) => {
                    const Icon = ep.icon
                    return (
                      <button
                        key={ep.id}
                        type="button"
                        onClick={() => {
                          setSelectedId(ep.id)
                          setDropdownOpen(false)
                        }}
                        className={clsx(
                          'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800/60 transition-colors',
                          ep.id === selectedId && 'bg-zinc-800/40'
                        )}
                      >
                        <Icon className="h-4 w-4 text-zinc-500 shrink-0" />
                        <span
                          className={clsx(
                            'shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded border',
                            getMethodBg(ep.method)
                          )}
                        >
                          {ep.method}
                        </span>
                        <div className="min-w-0">
                          <div className="font-mono text-sm text-zinc-200 truncate">{ep.path}</div>
                          <div className="text-xs text-zinc-500 truncate">{ep.label}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="px-4 py-3 rounded-lg bg-zinc-900/50 border border-zinc-800/60">
              <p className="text-sm text-zinc-400 leading-relaxed">{endpoint.description}</p>
            </div>

            {/* Parameters */}
            {endpoint.params.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                  Parameters
                </label>
                <div className="space-y-3">
                  {endpoint.params.map((param) => (
                    <div key={param.name}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <label
                          htmlFor={`param-${selectedId}-${param.name}`}
                          className="text-sm font-medium text-zinc-300"
                        >
                          {param.label}
                        </label>
                        <span
                          className={clsx(
                            'text-[10px] font-mono px-1.5 py-0.5 rounded',
                            param.type === 'path'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'
                          )}
                        >
                          {param.type}
                        </span>
                        {param.required && (
                          <span className="text-[10px] text-red-400 font-medium">required</span>
                        )}
                      </div>
                      <input
                        id={`param-${selectedId}-${param.name}`}
                        type="text"
                        value={values[param.name] ?? ''}
                        onChange={(e) => setParam(param.name, e.target.value)}
                        placeholder={param.placeholder}
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-700/60 bg-zinc-900/80 text-sm font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Send button */}
            <button
              type="button"
              onClick={sendRequest}
              disabled={loading}
              className={clsx(
                'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all',
                loading
                  ? 'bg-emerald-800/40 text-emerald-300/60 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-[0.98]'
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Send Request
                </>
              )}
            </button>

            {/* Request URL preview */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Request URL
              </label>
              <div className="px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800/60 font-mono text-xs text-zinc-400 break-all select-all">
                <span className={getMethodColor(endpoint.method)}>{endpoint.method}</span>{' '}
                {url}
              </div>
            </div>
          </div>

          {/* ─── Right Panel: Response Viewer ─── */}
          <div className="space-y-5">
            <div className="rounded-lg border border-zinc-700/60 bg-zinc-950 overflow-hidden flex flex-col" style={{ minHeight: 480 }}>
              {/* Response header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/60 bg-zinc-900/50 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Response
                  </span>
                  {response && (
                    <>
                      <span
                        className={clsx(
                          'text-xs font-mono font-bold px-2 py-0.5 rounded',
                          statusColor
                        )}
                      >
                        {response.status ?? '---'} {response.statusText}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Clock className="h-3 w-3" />
                        {response.duration}ms
                      </span>
                    </>
                  )}
                </div>
                {response?.body != null && (
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(formatJson(response.body), setResponseCopied)
                    }
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {responseCopied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {responseCopied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>

              {/* Response body */}
              <div className="flex-1 overflow-auto p-4">
                {!response && !loading && !error && (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                    <Terminal className="h-10 w-10 mb-3 opacity-40" />
                    <p className="text-sm">Hit Send to see the response</p>
                  </div>
                )}

                {loading && (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                    <Loader2 className="h-8 w-8 animate-spin mb-3 text-emerald-500/60" />
                    <p className="text-sm">Waiting for response...</p>
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                    <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-400">Request Failed</p>
                      <p className="text-xs text-red-400/70 mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {response?.body != null && !loading && (
                  <pre className="font-mono text-xs leading-relaxed">
                    <code>{highlightJson(formatJson(response.body))}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Bottom: Curl Command ─── */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              curl equivalent
            </label>
            <button
              type="button"
              onClick={() => copyToClipboard(curl, setCurlCopied)}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {curlCopied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {curlCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="rounded-lg border border-zinc-700/60 bg-zinc-950 px-4 py-3 overflow-x-auto">
            <pre className="font-mono text-xs text-zinc-300 whitespace-pre select-all">
              {curl}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
