// ---------------------------------------------------------------------------
// D8 — Reliability (weight: 0.13)
// Can agents depend on this service being available and responsive?
// v2: Weight increased from 0.05 to 0.13. Reliability is one of the MOST
// important qualities for agent workflows. An unreliable API breaks agent
// chains regardless of how many protocols it supports.
// v3: Added CDN detection, HTTP/2 support, multiple timing samples with
// median, and deeper status page / statuspage.io integration checks.
// Checks: /health or /status endpoint, response time (median of 3-5 samples),
//         5xx rates, published SLA, retry hints, CDN presence, HTTP/2 support
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, hasField, getApiSubdomains, extractDomain } from './types'

export async function scanReliability(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // 1. Health / Status endpoint (up to 25 pts)
  // -----------------------------------------------------------------------
  const healthPaths = [
    '/health',
    '/api/health',
    '/api/v1/health',
    '/status',
    '/api/status',
    '/api/v1/status',
    '/healthz',
    '/_health',
    '/readyz',
    '/livez',
  ]

  // Also check API subdomains and status subdomains
  const apiSubdomains = getApiSubdomains(base)
  const domain = extractDomain(base)
  const statusSubdomains = domain ? [
    `https://status.${domain}`,
    `https://status.${domain}/api/v2/status.json`,  // Statuspage.io format
    `https://status.${domain}/api/v2/summary.json`,
  ] : []
  const subdomainHealthPaths = apiSubdomains.flatMap((sub) => [
    `${sub}/health`,
    `${sub}/v1/health`,
    `${sub}/status`,
    `${sub}/healthz`,
  ])

  const allHealthUrls = [
    ...healthPaths.map((p) => `${base}${p}`),
    ...subdomainHealthPaths,
    ...statusSubdomains,
  ]

  const healthSettled = await Promise.allSettled(
    allHealthUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const healthResults = healthSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
  const healthHit = healthResults.find((r) => r.found)

  if (healthHit) {
    rawScore += 12
    checks.push({
      name: 'Health Endpoint',
      passed: true,
      details: `Health check endpoint at ${healthHit.url} (${healthHit.status}, ${healthHit.responseTimeMs}ms)`,
      points: 12,
    })

    // Bonus: structured health response
    if (isJsonContentType(healthHit.contentType) && typeof healthHit.body === 'object') {
      const body = healthHit.body as Record<string, unknown>
      if (hasField(body, 'status', 'healthy', 'ok', 'uptime', 'version')) {
        rawScore += 13
        checks.push({
          name: 'Structured Health Response',
          passed: true,
          details: 'Health endpoint returns structured JSON with status/version fields',
          points: 13,
        })
      } else {
        rawScore += 5
        checks.push({
          name: 'Structured Health Response',
          passed: false,
          details: 'Health endpoint returns JSON but lacks standard fields (status, uptime, version)',
          points: 5,
        })
        recommendations.push({
          action:
            'Include { status, uptime, version, dependencies } in your health endpoint response.',
          impact: '+8 points',
          difficulty: 'easy',
          auto_fixable: true,
        })
      }
    }
  } else {
    checks.push({
      name: 'Health Endpoint',
      passed: false,
      details: `No health or status endpoint found at ${healthPaths.length} common paths`,
      points: 0,
    })
    recommendations.push({
      action:
        'Create a /health or /api/health endpoint returning JSON { status: "ok", uptime, version }. Agents use this to verify availability before making requests.',
      impact: '+25 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 2. Response time analysis (up to 20 pts) — 3-5 samples, use median
  // -----------------------------------------------------------------------
  // Make 5 requests to different paths to get response time distribution
  const timingTargets = [
    base,
    `${base}/api`,
    `${base}/api/v1`,
    base,  // duplicate homepage for more samples
    `${base}/api/health`,
  ]

  const timingSettled = await Promise.allSettled(
    timingTargets.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const timingResults = timingSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
  const successfulTimings = timingResults.filter(
    (r) => r.status !== null && r.responseTimeMs > 0
  )

  if (successfulTimings.length > 0) {
    const times = successfulTimings.map((r) => r.responseTimeMs).sort((a, b) => a - b)
    const median = times[Math.floor(times.length / 2)]
    const avg = times.reduce((a, b) => a + b, 0) / times.length
    const min = times[0]
    const max = times[times.length - 1]

    let timingPoints = 0
    if (median < 200) timingPoints = 20
    else if (median < 500) timingPoints = 16
    else if (median < 1000) timingPoints = 12
    else if (median < 2000) timingPoints = 6
    else if (median < 5000) timingPoints = 3
    else timingPoints = 1

    rawScore += timingPoints
    checks.push({
      name: 'Response Time',
      passed: median < 1000,
      details: `median: ${Math.round(median)}ms, avg: ${Math.round(avg)}ms, min: ${Math.round(min)}ms, max: ${Math.round(max)}ms (${successfulTimings.length} samples)`,
      points: timingPoints,
    })

    if (median >= 1000) {
      recommendations.push({
        action: `Improve response times (median currently ${Math.round(median)}ms). Agents prefer <500ms for reliable workflows.`,
        impact: `+${20 - timingPoints} points`,
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  } else {
    checks.push({
      name: 'Response Time',
      passed: false,
      details: 'No successful responses to measure timing',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 3. 5xx error rate (up to 15 pts)
  // -----------------------------------------------------------------------
  const totalResponses = timingResults.filter((r) => r.status !== null)
  const serverErrors = totalResponses.filter(
    (r) => r.status !== null && r.status >= 500
  )
  const errorRate =
    totalResponses.length > 0 ? serverErrors.length / totalResponses.length : 0

  if (totalResponses.length > 0) {
    if (errorRate === 0) {
      rawScore += 15
      checks.push({
        name: '5xx Error Rate',
        passed: true,
        details: `0% server errors across ${totalResponses.length} probe(s)`,
        points: 15,
      })
    } else {
      const errorPoints = errorRate < 0.2 ? 8 : errorRate < 0.5 ? 4 : 1
      rawScore += errorPoints
      checks.push({
        name: '5xx Error Rate',
        passed: false,
        details: `${Math.round(errorRate * 100)}% server errors (${serverErrors.length}/${totalResponses.length} returned 5xx)`,
        points: errorPoints,
      })
      recommendations.push({
        action: `Reduce 5xx error rate (currently ${Math.round(errorRate * 100)}%). Server errors break agent workflows.`,
        impact: `+${15 - errorPoints} points`,
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  } else {
    checks.push({
      name: '5xx Error Rate',
      passed: false,
      details: 'No responses received to measure error rate',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 4. Published SLA / uptime status page (up to 15 pts)
  // -----------------------------------------------------------------------
  const slaPaths = [
    '/sla',
    '/status-page',
    '/uptime',
    '/api/v1/status',
    '/system-status',
  ]
  // Also check status subdomain (status.stripe.com, status.anthropic.com, etc.)
  const slaSubdomainUrls = domain ? [
    `https://status.${domain}`,
  ] : []
  const allSlaUrls = [
    ...slaPaths.map((p) => `${base}${p}`),
    ...slaSubdomainUrls,
  ]
  const slaSettled = await Promise.allSettled(
    allSlaUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const slaResults = slaSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
  const slaHit = slaResults.find((r) => r.found)

  // Also check homepage for SLA references
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  const homepageBody =
    typeof homepageResult.body === 'string' ? homepageResult.body : ''
  const mentionsSla = /sla|uptime|99\.\d+%|service.?level|availability/i.test(
    homepageBody
  )

  // Check if status page has statuspage.io integration
  const statusPageHit = slaResults.find(
    (r) => r.found && r.url?.includes('status.')
  )
  let isStatuspageIo = false
  if (statusPageHit) {
    const statusBody =
      typeof statusPageHit.body === 'string' ? statusPageHit.body : ''
    isStatuspageIo =
      statusBody.includes('statuspage') ||
      statusBody.includes('Atlassian') ||
      statusBody.includes('Statuspage') ||
      (typeof statusPageHit.body === 'object' &&
        statusPageHit.body !== null &&
        'page' in (statusPageHit.body as Record<string, unknown>))
  }

  if (slaHit) {
    const slaPoints = isStatuspageIo ? 15 : 12
    rawScore += slaPoints
    checks.push({
      name: 'Published SLA',
      passed: true,
      details: `SLA or status page at ${slaHit.url}${isStatuspageIo ? ' (Statuspage.io integration detected)' : ''}`,
      points: slaPoints,
    })
  } else if (mentionsSla) {
    rawScore += 7
    checks.push({
      name: 'Published SLA',
      passed: false,
      details: 'SLA or uptime references found on site but no dedicated status page',
      points: 7,
    })
    recommendations.push({
      action:
        'Create a dedicated /status or /sla page with uptime guarantees and real-time status.',
      impact: '+8 points',
      difficulty: 'easy',
      auto_fixable: false,
    })
  } else {
    checks.push({
      name: 'Published SLA',
      passed: false,
      details: 'No SLA, uptime guarantee, or status page found',
      points: 0,
    })
    recommendations.push({
      action:
        'Publish an SLA with uptime guarantees and a live status page. Agents need reliability assurance before committing to a service.',
      impact: '+15 points',
      difficulty: 'easy',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Retry hints (up to 8 pts)
  // -----------------------------------------------------------------------
  const allHeaders: Record<string, string> = { ...homepageResult.headers }
  for (const r of timingResults) {
    Object.assign(allHeaders, r.headers)
  }
  for (const r of healthResults) {
    Object.assign(allHeaders, r.headers)
  }

  const hasRetryAfter = !!allHeaders['retry-after']
  const hasRateLimit = !!allHeaders['x-ratelimit-remaining']

  if (hasRetryAfter || hasRateLimit) {
    rawScore += 8
    checks.push({
      name: 'Retry Hints',
      passed: true,
      details: `Retry guidance headers present: ${[
        hasRetryAfter ? 'Retry-After' : '',
        hasRateLimit ? 'X-RateLimit-Remaining' : '',
      ]
        .filter(Boolean)
        .join(', ')}`,
      points: 8,
    })
  } else {
    checks.push({
      name: 'Retry Hints',
      passed: false,
      details: 'No Retry-After or rate limit remaining headers found',
      points: 0,
    })
    recommendations.push({
      action:
        'Return Retry-After headers on 429/503 responses and X-RateLimit-Remaining so agents know when to retry.',
      impact: '+8 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 6. CDN detection (up to 10 pts)
  // -----------------------------------------------------------------------
  const cdnSignals: string[] = []

  // Check all collected headers for CDN indicators
  if (allHeaders['cf-ray']) cdnSignals.push('Cloudflare (CF-Ray)')
  if (allHeaders['x-cache']) cdnSignals.push(`X-Cache: ${allHeaders['x-cache']}`)
  if (allHeaders['x-cdn']) cdnSignals.push(`X-CDN: ${allHeaders['x-cdn']}`)
  if (allHeaders['x-served-by']) cdnSignals.push(`X-Served-By: ${allHeaders['x-served-by']}`)
  if (allHeaders['x-cache-hits']) cdnSignals.push(`X-Cache-Hits: ${allHeaders['x-cache-hits']}`)
  if (allHeaders['x-fastly-request-id']) cdnSignals.push('Fastly')
  if (allHeaders['x-amz-cf-id'] || allHeaders['x-amz-cf-pop']) cdnSignals.push('CloudFront')

  // Check Via header for CDN proxies
  const viaHeader = allHeaders['via']
  if (viaHeader) {
    if (/cloudfront|akamai|fastly|varnish|cloudflare|cdn/i.test(viaHeader)) {
      cdnSignals.push(`Via: ${viaHeader}`)
    }
  }

  // Check server header for CDN indicators
  const serverHeader = (allHeaders['server'] ?? '').toLowerCase()
  if (serverHeader.includes('cloudflare')) cdnSignals.push('Cloudflare (Server header)')
  if (serverHeader.includes('akamaghost') || serverHeader.includes('akamai'))
    cdnSignals.push('Akamai (Server header)')
  if (serverHeader.includes('cdn')) cdnSignals.push(`CDN (Server: ${allHeaders['server']})`)

  if (cdnSignals.length > 0) {
    rawScore += 10
    checks.push({
      name: 'CDN',
      passed: true,
      details: `CDN detected: ${cdnSignals.join('; ')}`,
      points: 10,
    })
  } else {
    checks.push({
      name: 'CDN',
      passed: false,
      details: 'No CDN detected (no CF-Ray, X-Cache, X-CDN, Via, or CDN server headers)',
      points: 0,
    })
    recommendations.push({
      action:
        'Deploy behind a CDN (Cloudflare, CloudFront, Fastly, etc.) for global edge caching and DDoS protection. CDNs dramatically improve latency for agents worldwide.',
      impact: '+10 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 7. HTTP/2 support (up to 7 pts)
  // -----------------------------------------------------------------------
  // We can detect HTTP/2 through several proxy signals since fetch() in
  // Node.js doesn't directly expose the protocol version:
  // - alt-svc header presence (common with HTTP/2+ servers)
  // - Server push indicators
  // - Modern CDN/server (Cloudflare, nginx, etc. default to HTTP/2)
  // Note: If a site is behind Cloudflare or a modern CDN, HTTP/2 is virtually guaranteed.

  // Check for alt-svc header which indicates HTTP/2+ support
  const altSvc = allHeaders['alt-svc'] || ''
  const hasHttp2Signals =
    altSvc.includes('h2') ||
    altSvc.includes('h3') ||
    cdnSignals.length > 0 || // CDNs universally serve HTTP/2
    serverHeader.includes('cloudflare') ||
    serverHeader.includes('nginx') ||
    serverHeader.includes('envoy') ||
    serverHeader.includes('apache/2.4')

  const hasHttp3 = altSvc.includes('h3')

  if (hasHttp3) {
    rawScore += 7
    checks.push({
      name: 'HTTP/2+ Support',
      passed: true,
      details: `HTTP/3 (h3) advertised via alt-svc: ${altSvc.slice(0, 100)}`,
      points: 7,
    })
  } else if (hasHttp2Signals) {
    rawScore += 5
    checks.push({
      name: 'HTTP/2+ Support',
      passed: true,
      details: `HTTP/2 likely supported (${altSvc ? `alt-svc: ${altSvc.slice(0, 80)}` : `modern server/CDN: ${serverHeader || 'CDN detected'}`})`,
      points: 5,
    })
  } else {
    checks.push({
      name: 'HTTP/2+ Support',
      passed: false,
      details: 'No HTTP/2 indicators detected (no alt-svc, no modern server/CDN signals)',
      points: 0,
    })
    recommendations.push({
      action:
        'Enable HTTP/2 on your server for multiplexed connections and reduced latency. Most modern servers and CDNs support it by default.',
      impact: '+7 points',
      difficulty: 'easy',
      auto_fixable: false,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D8',
    label: 'Reliability',
    score,
    weight: 0.13,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
