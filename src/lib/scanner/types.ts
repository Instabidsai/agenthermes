// ---------------------------------------------------------------------------
// Shared types for the 9-dimension scanner system
// ---------------------------------------------------------------------------

export interface Check {
  name: string
  passed: boolean
  details: string
  points: number
}

export interface Recommendation {
  action: string
  impact: string // e.g., "+15 points"
  difficulty: 'easy' | 'medium' | 'hard'
  auto_fixable: boolean
}

export interface DimensionResult {
  dimension: string
  label: string
  score: number // 0-100
  weight: number
  checks: Check[]
  recommendations: Recommendation[]
}

export interface CapApplied {
  rule: string
  capped_to: number
}

export interface ScanResult {
  hermes_id: string
  domain: string
  total_score: number
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'unaudited'
  dimensions: DimensionResult[]
  caps_applied: CapApplied[]
  scanned_at: string
  next_steps: string[]
}

// ---------------------------------------------------------------------------
// Probe helpers (shared across all scanners)
// ---------------------------------------------------------------------------

export interface ProbeResult {
  url: string
  found: boolean
  status: number | null
  contentType: string | null
  headers: Record<string, string>
  body: unknown
  error: string | null
  responseTimeMs: number
}

const FETCH_TIMEOUT_MS = 5_000

/** Fetch a URL with a per-request 5s timeout. Never throws. */
export async function probeEndpoint(
  url: string,
  method: 'GET' | 'HEAD' | 'OPTIONS' = 'GET',
  globalSignal?: AbortSignal
): Promise<ProbeResult> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    const onGlobalAbort = () => controller.abort()
    if (globalSignal) {
      if (globalSignal.aborted) {
        clearTimeout(timer)
        return {
          url,
          found: false,
          status: null,
          contentType: null,
          headers: {},
          body: null,
          error: 'Scan timeout exceeded',
          responseTimeMs: Date.now() - start,
        }
      }
      globalSignal.addEventListener('abort', onGlobalAbort, { once: true })
    }

    const res = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'AgentHermes-Scanner/2.0',
      },
      redirect: 'follow',
    })

    clearTimeout(timer)
    if (globalSignal) globalSignal.removeEventListener('abort', onGlobalAbort)

    const contentType = res.headers.get('content-type') ?? null

    // Collect response headers we care about
    const responseHeaders: Record<string, string> = {}
    const headerKeys = [
      'content-type',
      'strict-transport-security',
      'content-security-policy',
      'x-frame-options',
      'x-content-type-options',
      'x-request-id',
      'x-trace-id',
      'x-correlation-id',
      'traceparent',
      'api-version',
      'x-ratelimit-limit',
      'x-ratelimit-remaining',
      'x-ratelimit-reset',
      'retry-after',
      'access-control-allow-origin',
      'access-control-allow-methods',
      'access-control-allow-headers',
      'deprecation',
      'sunset',
      'link',
    ]
    for (const key of headerKeys) {
      const val = res.headers.get(key)
      if (val) responseHeaders[key] = val
    }

    let body: unknown = null
    try {
      const text = await res.text()
      try {
        body = JSON.parse(text)
      } catch {
        body = text.slice(0, 2_000)
      }
    } catch {
      // body stays null
    }

    return {
      url,
      found: res.ok,
      status: res.status,
      contentType,
      headers: responseHeaders,
      body,
      error: res.ok ? null : `HTTP ${res.status}`,
      responseTimeMs: Date.now() - start,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown fetch error'
    return {
      url,
      found: false,
      status: null,
      contentType: null,
      headers: {},
      body: null,
      error: message,
      responseTimeMs: Date.now() - start,
    }
  }
}

/** Check if a content-type looks like JSON */
export function isJsonContentType(ct: string | null): boolean {
  if (!ct) return false
  return ct.includes('application/json') || ct.includes('application/ld+json')
}

/** Check if a body object has any of the given fields (non-null) */
export function hasField(body: unknown, ...fields: string[]): boolean {
  if (!body || typeof body !== 'object') return false
  const obj = body as Record<string, unknown>
  return fields.some((f) => f in obj && obj[f] !== null && obj[f] !== undefined)
}

/** Returns true if the probe found an endpoint (2xx, or a common auth/method-guarded status) */
export function endpointExists(probe: ProbeResult): boolean {
  return (
    probe.found ||
    probe.status === 401 ||
    probe.status === 403 ||
    probe.status === 405
  )
}
