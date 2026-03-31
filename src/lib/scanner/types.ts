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
      'referrer-policy',
      'x-request-id',
      'request-id',
      'x-req-id',
      'x-trace-id',
      'x-correlation-id',
      'traceparent',
      'api-version',
      'stripe-version',
      'x-api-version',
      'x-ratelimit-limit',
      'x-ratelimit-remaining',
      'x-ratelimit-reset',
      'retry-after',
      'access-control-allow-origin',
      'access-control-allow-methods',
      'access-control-allow-headers',
      'access-control-expose-headers',
      'deprecation',
      'sunset',
      'link',
      // CDN / caching headers
      'cf-ray',
      'x-cache',
      'x-cdn',
      'via',
      'x-served-by',
      'x-cache-hits',
      'x-fastly-request-id',
      'x-amz-cf-id',
      'x-amz-cf-pop',
      'server',
      'alt-svc',
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
        body = text.slice(0, 15_000)
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

// ---------------------------------------------------------------------------
// Subdomain discovery helpers
// ---------------------------------------------------------------------------

/**
 * Extract the registrable domain from a URL for subdomain probing.
 * e.g., "https://stripe.com/foo" -> "stripe.com"
 *       "https://www.stripe.com" -> "stripe.com"
 */
export function extractDomain(base: string): string {
  try {
    const hostname = new URL(base).hostname.replace(/^www\./, '')
    return hostname
  } catch {
    return ''
  }
}

/**
 * Generate common API-related subdomain URLs for a given base URL.
 * Returns array of base URLs to probe (e.g., "https://api.stripe.com").
 */
export function getApiSubdomains(base: string): string[] {
  const domain = extractDomain(base)
  if (!domain) return []
  return [
    `https://api.${domain}`,
    `https://developer.${domain}`,
    `https://developers.${domain}`,
  ]
}

/**
 * Generate common infrastructure subdomain URLs.
 * Returns URLs for status pages, docs, auth, etc.
 */
export function getInfraSubdomains(base: string): string[] {
  const domain = extractDomain(base)
  if (!domain) return []
  return [
    `https://docs.${domain}`,
    `https://status.${domain}`,
    `https://connect.${domain}`,
    `https://auth.${domain}`,
    `https://dashboard.${domain}`,
  ]
}

/**
 * Probe multiple URLs in parallel and return all results (including failures).
 * Useful for subdomain discovery where most will fail.
 */
export async function probeMultiple(
  urls: string[],
  method: 'GET' | 'HEAD' | 'OPTIONS' = 'GET',
  globalSignal?: AbortSignal
): Promise<ProbeResult[]> {
  return Promise.all(urls.map((url) => probeEndpoint(url, method, globalSignal)))
}
