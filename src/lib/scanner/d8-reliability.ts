// ---------------------------------------------------------------------------
// D8 — Reliability (weight: 0.05)
// Can agents depend on this service being available and responsive?
// Checks: /health or /status endpoint, response time p95, 5xx rates,
//         published SLA
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
  // 1. Health / Status endpoint (up to 30 pts)
  // -----------------------------------------------------------------------
  const healthPaths = [
    '/health',
    '/api/health',
    '/api/v1/health',
    '/status',
    '/api/status',
    '/api/v1/status',
    '/healthz',
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

  const healthResults = await Promise.all(
    allHealthUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const healthHit = healthResults.find((r) => r.found)

  if (healthHit) {
    rawScore += 15
    checks.push({
      name: 'Health Endpoint',
      passed: true,
      details: `Health check endpoint at ${healthHit.url} (${healthHit.status}, ${healthHit.responseTimeMs}ms)`,
      points: 15,
    })

    // Bonus: structured health response
    if (isJsonContentType(healthHit.contentType) && typeof healthHit.body === 'object') {
      const body = healthHit.body as Record<string, unknown>
      if (hasField(body, 'status', 'healthy', 'ok', 'uptime', 'version')) {
        rawScore += 15
        checks.push({
          name: 'Structured Health Response',
          passed: true,
          details: `Health endpoint returns structured JSON with status/version fields`,
          points: 15,
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
          impact: '+10 points',
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
      impact: '+30 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 2. Response time analysis (up to 25 pts)
  // -----------------------------------------------------------------------
  // Make 5 sequential requests to the homepage to get response time distribution
  const timingTargets = [
    base,
    `${base}/api`,
    `${base}/api/v1`,
    `${base}/health`,
    `${base}/api/health`,
  ]

  const timingResults = await Promise.all(
    timingTargets.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const successfulTimings = timingResults.filter(
    (r) => r.status !== null && r.responseTimeMs > 0
  )

  if (successfulTimings.length > 0) {
    const times = successfulTimings.map((r) => r.responseTimeMs).sort((a, b) => a - b)
    const avg = times.reduce((a, b) => a + b, 0) / times.length
    const p95 = times[Math.floor(times.length * 0.95)] ?? times[times.length - 1]
    const max = times[times.length - 1]

    let timingPoints = 0
    if (p95 < 200) timingPoints = 25
    else if (p95 < 500) timingPoints = 20
    else if (p95 < 1000) timingPoints = 15
    else if (p95 < 2000) timingPoints = 8
    else if (p95 < 5000) timingPoints = 3
    else timingPoints = 1

    rawScore += timingPoints
    checks.push({
      name: 'Response Time p95',
      passed: p95 < 1000,
      details: `p95: ${Math.round(p95)}ms, avg: ${Math.round(avg)}ms, max: ${Math.round(max)}ms (${successfulTimings.length} samples)`,
      points: timingPoints,
    })

    if (p95 >= 1000) {
      recommendations.push({
        action: `Improve response times (p95 currently ${Math.round(p95)}ms). Agents prefer <500ms for reliable workflows.`,
        impact: `+${25 - timingPoints} points`,
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  } else {
    checks.push({
      name: 'Response Time p95',
      passed: false,
      details: 'No successful responses to measure timing',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 3. 5xx error rate (up to 20 pts)
  // -----------------------------------------------------------------------
  const totalResponses = timingResults.filter((r) => r.status !== null)
  const serverErrors = totalResponses.filter(
    (r) => r.status !== null && r.status >= 500
  )
  const errorRate =
    totalResponses.length > 0 ? serverErrors.length / totalResponses.length : 0

  if (totalResponses.length > 0) {
    if (errorRate === 0) {
      rawScore += 20
      checks.push({
        name: '5xx Error Rate',
        passed: true,
        details: `0% server errors across ${totalResponses.length} probe(s)`,
        points: 20,
      })
    } else {
      const errorPoints = errorRate < 0.2 ? 10 : errorRate < 0.5 ? 5 : 1
      rawScore += errorPoints
      checks.push({
        name: '5xx Error Rate',
        passed: false,
        details: `${Math.round(errorRate * 100)}% server errors (${serverErrors.length}/${totalResponses.length} returned 5xx)`,
        points: errorPoints,
      })
      recommendations.push({
        action: `Reduce 5xx error rate (currently ${Math.round(errorRate * 100)}%). Server errors break agent workflows.`,
        impact: `+${20 - errorPoints} points`,
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
  const slaResults = await Promise.all(
    allSlaUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const slaHit = slaResults.find((r) => r.found)

  // Also check homepage for SLA references
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  const homepageBody =
    typeof homepageResult.body === 'string' ? homepageResult.body : ''
  const mentionsSla = /sla|uptime|99\.\d+%|service.?level|availability/i.test(
    homepageBody
  )

  if (slaHit) {
    rawScore += 15
    checks.push({
      name: 'Published SLA',
      passed: true,
      details: `SLA or status page at ${slaHit.url}`,
      points: 15,
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
  // 5. Retry hints (up to 10 pts)
  // -----------------------------------------------------------------------
  const allHeaders = { ...homepageResult.headers }
  for (const r of timingResults) {
    Object.assign(allHeaders, r.headers)
  }
  // Also check API subdomain headers for rate-limit / retry hints
  for (const r of healthResults) {
    Object.assign(allHeaders, r.headers)
  }

  const hasRetryAfter = !!allHeaders['retry-after']
  const hasRateLimit = !!allHeaders['x-ratelimit-remaining']

  if (hasRetryAfter || hasRateLimit) {
    rawScore += 10
    checks.push({
      name: 'Retry Hints',
      passed: true,
      details: `Retry guidance headers present: ${[
        hasRetryAfter ? 'Retry-After' : '',
        hasRateLimit ? 'X-RateLimit-Remaining' : '',
      ]
        .filter(Boolean)
        .join(', ')}`,
      points: 10,
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
      impact: '+10 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D8',
    label: 'Reliability',
    score,
    weight: 0.05,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
