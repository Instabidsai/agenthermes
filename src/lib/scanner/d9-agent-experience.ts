// ---------------------------------------------------------------------------
// D9 — Agent Experience (weight: 0.05)
// How pleasant/efficient is it for an agent to interact with this service?
// Checks: X-Request-ID headers, error response structure, escalation paths,
//         SDK links, deprecation notices
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, hasField } from './types'

export async function scanAgentExperience(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // Probe several endpoints to collect header and response patterns
  const probePaths = [
    '',
    '/api',
    '/api/v1',
    '/api/health',
    '/health',
    '/status',
  ]

  const probeResults = await Promise.all(
    probePaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const successfulProbes = probeResults.filter(
    (r) => r.status !== null
  )

  // -----------------------------------------------------------------------
  // 1. X-Request-ID / trace headers (up to 20 pts)
  // -----------------------------------------------------------------------
  const hasRequestId = successfulProbes.some(
    (r) => !!r.headers['x-request-id']
  )
  // Also check for common trace header variations
  const traceHeaderNames = [
    'x-request-id',
    'x-trace-id',
    'x-correlation-id',
    'traceparent',
  ]

  let traceHeaderFound: string | null = null
  for (const probe of successfulProbes) {
    for (const header of traceHeaderNames) {
      if (probe.headers[header]) {
        traceHeaderFound = header
        break
      }
    }
    if (traceHeaderFound) break
  }

  if (traceHeaderFound) {
    rawScore += 20
    checks.push({
      name: 'Request Tracing',
      passed: true,
      details: `Request tracing header found: ${traceHeaderFound}`,
      points: 20,
    })
  } else {
    checks.push({
      name: 'Request Tracing',
      passed: false,
      details: 'No X-Request-ID, X-Trace-ID, or traceparent headers found',
      points: 0,
    })
    recommendations.push({
      action:
        'Add X-Request-ID headers to all responses. Agents use these for debugging, logging, and support ticket reference.',
      impact: '+20 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 2. Structured error responses (up to 25 pts)
  // -----------------------------------------------------------------------
  // Deliberately trigger error responses
  const errorProbes = await Promise.all([
    probeEndpoint(
      `${base}/api/nonexistent-endpoint-${Date.now()}`,
      'GET',
      globalSignal
    ),
    probeEndpoint(
      `${base}/api/v1/nonexistent-endpoint-${Date.now()}`,
      'GET',
      globalSignal
    ),
  ])

  const errorResponses = errorProbes.filter(
    (r) => r.status !== null && r.status >= 400
  )

  if (errorResponses.length > 0) {
    let structuredErrors = 0
    let hasErrorCode = false
    let hasMessage = false

    for (const err of errorResponses) {
      if (isJsonContentType(err.contentType) && typeof err.body === 'object') {
        structuredErrors++
        const body = err.body as Record<string, unknown>
        if (hasField(body, 'error', 'message', 'detail', 'msg')) {
          hasMessage = true
        }
        if (hasField(body, 'code', 'error_code', 'type', 'status')) {
          hasErrorCode = true
        }
      }
    }

    if (structuredErrors > 0 && hasMessage && hasErrorCode) {
      rawScore += 25
      checks.push({
        name: 'Structured Error Responses',
        passed: true,
        details: 'Error responses are structured JSON with error code and message fields',
        points: 25,
      })
    } else if (structuredErrors > 0 && hasMessage) {
      rawScore += 15
      checks.push({
        name: 'Structured Error Responses',
        passed: false,
        details: 'Error responses are JSON with message but missing error code',
        points: 15,
      })
      recommendations.push({
        action:
          'Add machine-readable error codes (e.g., "code": "NOT_FOUND") to error responses so agents can handle errors programmatically.',
        impact: '+10 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    } else if (structuredErrors > 0) {
      rawScore += 8
      checks.push({
        name: 'Structured Error Responses',
        passed: false,
        details: 'Error responses are JSON but lack standard error/message fields',
        points: 8,
      })
      recommendations.push({
        action:
          'Structure error responses as { "error": { "code": "...", "message": "..." } } for agent compatibility.',
        impact: '+17 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    } else {
      checks.push({
        name: 'Structured Error Responses',
        passed: false,
        details: 'Error responses are not JSON — agents cannot parse error details',
        points: 0,
      })
      recommendations.push({
        action:
          'Return JSON error responses with { "error": { "code": "...", "message": "..." } } instead of HTML error pages.',
        impact: '+25 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'Structured Error Responses',
      passed: false,
      details: 'Could not trigger error responses for analysis',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 3. Escalation / support paths (up to 15 pts)
  // -----------------------------------------------------------------------
  const supportPaths = [
    '/support',
    '/contact',
    '/help',
    '/api/support',
    '/docs/support',
  ]
  const supportResults = await Promise.all(
    supportPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const supportHits = supportResults.filter((r) => r.found)

  // Also check homepage for support contact info
  const homepage = probeResults.find((r) => r.url === base || r.url === `${base}/`)
  const homepageBody =
    typeof homepage?.body === 'string' ? homepage.body : ''
  const mentionsSupport =
    /support@|help@|contact@|discord\.|slack\.|community/i.test(homepageBody)

  if (supportHits.length > 0) {
    rawScore += 15
    checks.push({
      name: 'Escalation Paths',
      passed: true,
      details: `Support/help page(s) at: ${supportHits.map((r) => r.url).join(', ')}`,
      points: 15,
    })
  } else if (mentionsSupport) {
    rawScore += 8
    checks.push({
      name: 'Escalation Paths',
      passed: false,
      details: 'Support contact info found on site but no dedicated support page',
      points: 8,
    })
    recommendations.push({
      action:
        'Create a /support or /contact page with programmatic support options (API-based ticket creation, not just email).',
      impact: '+7 points',
      difficulty: 'easy',
      auto_fixable: false,
    })
  } else {
    checks.push({
      name: 'Escalation Paths',
      passed: false,
      details: 'No support, contact, or escalation paths found',
      points: 0,
    })
    recommendations.push({
      action:
        'Add a /support page with clear escalation paths. Agents need to know how to report issues or escalate to humans.',
      impact: '+15 points',
      difficulty: 'easy',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 4. SDK / client library links (up to 15 pts)
  // -----------------------------------------------------------------------
  const sdkPaths = [
    '/sdk',
    '/sdks',
    '/libraries',
    '/api/sdks',
    '/docs/sdks',
    '/docs/libraries',
    '/developers/sdks',
  ]
  const sdkResults = await Promise.all(
    sdkPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const sdkHits = sdkResults.filter((r) => r.found)

  // Check for SDK references in homepage or docs
  const allBodies = [...probeResults, ...supportResults, ...sdkResults].map(
    (r) => (typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? ''))
  )
  const mentionsSdk = allBodies.some((text) =>
    /npm install|pip install|gem install|go get|nuget|sdk|client library|package/i.test(text)
  )

  if (sdkHits.length > 0) {
    rawScore += 15
    checks.push({
      name: 'SDK / Client Libraries',
      passed: true,
      details: `SDK information at: ${sdkHits.map((r) => r.url).join(', ')}`,
      points: 15,
    })
  } else if (mentionsSdk) {
    rawScore += 7
    checks.push({
      name: 'SDK / Client Libraries',
      passed: false,
      details: 'SDK or package manager references found in content but no dedicated SDK page',
      points: 7,
    })
  } else {
    checks.push({
      name: 'SDK / Client Libraries',
      passed: false,
      details: 'No SDK or client library information found',
      points: 0,
    })
    recommendations.push({
      action:
        'Publish SDKs or client libraries (npm, pip) and link them from /sdks. Pre-built clients reduce integration friction for agents.',
      impact: '+15 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Deprecation / versioning notices (up to 15 pts)
  // -----------------------------------------------------------------------
  const allHeaders = Object.assign(
    {},
    ...successfulProbes.map((r) => r.headers)
  )

  const hasDeprecation = !!allHeaders['deprecation'] || !!allHeaders['sunset']
  const hasApiVersion =
    !!allHeaders['api-version'] ||
    successfulProbes.some((r) => /\/v\d+\//i.test(r.url) && (r.found || r.status === 401))

  if (hasDeprecation) {
    rawScore += 10
    checks.push({
      name: 'Deprecation Notices',
      passed: true,
      details: `Deprecation/Sunset headers present: ${
        allHeaders['deprecation'] ? `Deprecation: ${allHeaders['deprecation']}` : ''
      } ${allHeaders['sunset'] ? `Sunset: ${allHeaders['sunset']}` : ''}`.trim(),
      points: 10,
    })
  }

  if (hasApiVersion) {
    rawScore += 5
    checks.push({
      name: 'API Versioning',
      passed: true,
      details: 'API versioning detected (URL path versioning or API-Version header)',
      points: 5,
    })
  }

  if (!hasDeprecation && !hasApiVersion) {
    checks.push({
      name: 'Deprecation & Versioning',
      passed: false,
      details:
        'No deprecation notices or API versioning detected. Agents need version stability guarantees.',
      points: 0,
    })
    recommendations.push({
      action:
        'Implement API versioning (e.g., /api/v1/) and use Deprecation/Sunset headers when retiring endpoints. Agents rely on stable APIs.',
      impact: '+15 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 6. Documentation quality for agents (up to 10 pts)
  // -----------------------------------------------------------------------
  // Check agent card for detailed capabilities
  const agentCardResult = await probeEndpoint(
    `${base}/.well-known/agent.json`,
    'GET',
    globalSignal
  )

  if (agentCardResult.found && typeof agentCardResult.body === 'object') {
    const card = agentCardResult.body as Record<string, unknown>
    const detailFields = [
      'description',
      'authentication',
      'rate_limits',
      'examples',
      'input_schema',
      'output_schema',
    ]
    const presentFields = detailFields.filter((f) => f in card)

    if (presentFields.length >= 3) {
      rawScore += 10
      checks.push({
        name: 'Agent Documentation Quality',
        passed: true,
        details: `Agent card includes detailed fields: ${presentFields.join(', ')}`,
        points: 10,
      })
    } else if (presentFields.length > 0) {
      rawScore += 4
      checks.push({
        name: 'Agent Documentation Quality',
        passed: false,
        details: `Agent card has some detail fields (${presentFields.join(', ')}) but could be more comprehensive`,
        points: 4,
      })
      recommendations.push({
        action: `Enrich agent card with: ${detailFields.filter((f) => !presentFields.includes(f)).join(', ')}`,
        impact: '+6 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'Agent Documentation Quality',
      passed: false,
      details: 'No agent card to assess documentation quality',
      points: 0,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D9',
    label: 'Agent Experience',
    score,
    weight: 0.05,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
