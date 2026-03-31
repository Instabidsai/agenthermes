// ---------------------------------------------------------------------------
// D9 — Agent Experience (weight: 0.10)
// How pleasant/efficient is it for an agent to interact with this service?
// v2: Weight increased from 0.05 to 0.10. Good error handling, SDKs, and
// request tracing are fundamental API quality signals — not just nice-to-haves.
// Checks: X-Request-ID headers, error response structure, escalation paths,
//         SDK links, deprecation notices
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, hasField, getApiSubdomains } from './types'

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

  // Also probe API subdomains for headers (X-Request-ID, versioning, etc.)
  const apiSubdomains = getApiSubdomains(base)
  const subdomainProbePaths = apiSubdomains.flatMap((sub) => [
    sub,
    `${sub}/v1`,
    `${sub}/health`,
  ])

  const allProbeUrls = [
    ...probePaths.map((p) => `${base}${p}`),
    ...subdomainProbePaths,
  ]

  const probeResults = await Promise.all(
    allProbeUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const successfulProbes = probeResults.filter(
    (r) => r.status !== null
  )

  // -----------------------------------------------------------------------
  // 2. Structured error responses (up to 25 pts)
  //    (Run error probes first so we can combine results for tracing check)
  // -----------------------------------------------------------------------
  // Deliberately trigger error responses (also on API subdomains)
  // Include auth-protected resource paths (e.g., Stripe's api.X/v1/charges
  // returns structured 401 JSON with error/type/message/code)
  const errorProbeUrls = [
    `${base}/api/nonexistent-endpoint-${Date.now()}`,
    `${base}/api/v1/nonexistent-endpoint-${Date.now()}`,
    ...apiSubdomains.map((sub) => `${sub}/v1/nonexistent-endpoint-${Date.now()}`),
    // Auth-protected resource paths that return structured 401/403 JSON
    ...apiSubdomains.flatMap((sub) => [
      `${sub}/v1/charges`,
      `${sub}/v1/customers`,
      `${sub}/v1/users`,
      `${sub}/v1/me`,
      `${sub}/v1/accounts`,
    ]),
  ]
  const errorProbes = await Promise.all(
    errorProbeUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )

  const errorResponses = errorProbes.filter(
    (r) => r.status !== null && r.status >= 400
  )

  // -----------------------------------------------------------------------
  // 1. X-Request-ID / trace headers (up to 20 pts)
  //    Check ALL probes (initial + error) — auth-protected APIs like Stripe
  //    return Request-Id on every response including 401s
  // -----------------------------------------------------------------------
  // Also check for common trace header variations — covers:
  // Stripe (Request-Id → "request-id"), Cloudflare (cf-ray), standard (x-request-id)
  const traceHeaderNames = [
    'x-request-id',
    'request-id',
    'x-req-id',
    'x-trace-id',
    'x-correlation-id',
    'traceparent',
    'cf-ray',
  ]

  // Combine initial probes + error probes for comprehensive trace header detection
  const allProbesForTracing = [...successfulProbes, ...errorProbes.filter((r) => r.status !== null)]

  let traceHeaderFound: string | null = null
  for (const probe of allProbesForTracing) {
    for (const header of traceHeaderNames) {
      if (probe.headers[header]) {
        traceHeaderFound = header
        break
      }
    }
    if (traceHeaderFound) break
  }

  // Also check Access-Control-Expose-Headers for request ID signals.
  // Stripe declares "Request-Id" in expose headers even though it only
  // sends the actual header on authenticated requests. This is still
  // strong evidence of request tracing support.
  let traceInExposeHeaders: string | null = null
  if (!traceHeaderFound) {
    for (const probe of allProbesForTracing) {
      const exposeHeaders = probe.headers['access-control-expose-headers'] || ''
      if (/request-id|x-request-id|x-trace-id|traceparent/i.test(exposeHeaders)) {
        traceInExposeHeaders = exposeHeaders.split(',').find(h =>
          /request-id|x-request-id|x-trace-id|traceparent/i.test(h.trim())
        )?.trim() || 'Request-Id'
        break
      }
    }
  }

  if (traceHeaderFound) {
    rawScore += 20
    checks.push({
      name: 'Request Tracing',
      passed: true,
      details: `Request tracing header found: ${traceHeaderFound}`,
      points: 20,
    })
  } else if (traceInExposeHeaders) {
    // CORS expose headers declare request tracing support — partial credit
    rawScore += 15
    checks.push({
      name: 'Request Tracing',
      passed: true,
      details: `Request tracing supported: ${traceInExposeHeaders} declared in Access-Control-Expose-Headers (sent on authenticated requests)`,
      points: 15,
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

  if (errorResponses.length > 0) {
    let structuredErrors = 0
    let hasErrorCode = false
    let hasMessage = false

    for (const err of errorResponses) {
      if (isJsonContentType(err.contentType) && typeof err.body === 'object') {
        structuredErrors++
        const body = err.body as Record<string, unknown>

        // Check top-level fields
        if (hasField(body, 'error', 'message', 'detail', 'msg')) {
          hasMessage = true
        }
        if (hasField(body, 'code', 'error_code', 'type', 'status')) {
          hasErrorCode = true
        }

        // Check nested error objects (e.g., Stripe's { error: { type, message, code } })
        for (const v of Object.values(body)) {
          if (v && typeof v === 'object' && !Array.isArray(v)) {
            const nested = v as Record<string, unknown>
            if (hasField(nested, 'message', 'detail', 'msg')) {
              hasMessage = true
            }
            if (hasField(nested, 'code', 'error_code', 'type', 'status')) {
              hasErrorCode = true
            }
          }
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
    '/docs/api/libraries',
  ]
  // Also check docs subdomains for SDK references
  const sdkSubdomainUrls = apiSubdomains.flatMap((sub) => {
    const parts = new URL(sub)
    const domain = parts.hostname.replace(/^api\./, '')
    return [
      `https://docs.${domain}/sdks`,
      `https://docs.${domain}/libraries`,
      `https://docs.${domain}/api/libraries`,
    ]
  })
  const allSdkUrls = [
    ...sdkPaths.map((p) => `${base}${p}`),
    ...sdkSubdomainUrls,
  ]
  const sdkResults = await Promise.all(
    allSdkUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
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
  // 4b. SDK ecosystem breadth — multi-language SDK support (up to 15 pts bonus)
  //     Companies offering SDKs in multiple languages (Python, Node, Ruby, Go,
  //     Java, PHP, .NET) are fundamentally more agent-friendly. Agents may use
  //     any language, so breadth matters. Count language mentions across all
  //     probed pages (homepage, docs, SDK pages).
  // -----------------------------------------------------------------------
  const sdkLanguagePatterns: [string, RegExp][] = [
    ['Python', /\b(python|pip install|pypi|\.py\b)/i],
    ['Node.js', /\b(node\.?js|npm install|yarn add|npx|@[\w-]+\/[\w-]+)/i],
    ['Ruby', /\b(ruby|gem install|rubygems|\.rb\b)/i],
    ['Go', /\b(golang|go get|go module|go\.mod)/i],
    ['Java', /\b(java\b|maven|gradle|\.jar\b|jdk|javax)/i],
    ['PHP', /\b(php|composer require|packagist|\.php\b)/i],
    ['.NET', /\b(\.net|c#|csharp|nuget|dotnet)/i],
    ['Rust', /\b(rust|cargo add|crates\.io|\.rs\b)/i],
    ['Swift', /\b(swift|swiftpm|cocoapods|pod install)/i],
    ['Kotlin', /\b(kotlin|gradle.*kotlin)/i],
  ]

  const allPageBodies = [...probeResults, ...supportResults, ...sdkResults].map(
    (r) => (typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? ''))
  ).join(' ')

  const detectedLanguages: string[] = []
  for (const [lang, pattern] of sdkLanguagePatterns) {
    if (pattern.test(allPageBodies)) {
      detectedLanguages.push(lang)
    }
  }

  let sdkEcosystemPts = 0
  if (detectedLanguages.length >= 5) sdkEcosystemPts = 15
  else if (detectedLanguages.length >= 3) sdkEcosystemPts = 10
  else if (detectedLanguages.length >= 1) sdkEcosystemPts = 5

  if (sdkEcosystemPts > 0) {
    rawScore += sdkEcosystemPts
    checks.push({
      name: 'SDK Ecosystem Breadth',
      passed: detectedLanguages.length >= 3,
      details: `SDK/library mentions for ${detectedLanguages.length} language(s): ${detectedLanguages.join(', ')}`,
      points: sdkEcosystemPts,
    })
  } else {
    checks.push({
      name: 'SDK Ecosystem Breadth',
      passed: false,
      details: 'No SDK language mentions detected across probed pages. Multi-language SDKs signal mature developer ecosystems.',
      points: 0,
    })
    recommendations.push({
      action:
        'Offer SDKs or client libraries in multiple languages (Python, Node.js, Go, etc.) and mention them on your docs/homepage. Multi-language support dramatically improves agent integration.',
      impact: '+15 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Deprecation / versioning notices (up to 15 pts)
  // -----------------------------------------------------------------------
  // Combine all probes (initial + error) for header and versioning analysis
  const allRespondingProbes = [...successfulProbes, ...errorProbes.filter((r) => r.status !== null)]
  const allHeaders = Object.assign(
    {},
    ...allRespondingProbes.map((r) => r.headers)
  )

  const hasDeprecation = !!allHeaders['deprecation'] || !!allHeaders['sunset']
  const hasApiVersion =
    !!allHeaders['api-version'] ||
    allRespondingProbes.some((r) => /\/v\d+/i.test(r.url) && (r.found || r.status === 401 || r.status === 403 || r.status === 404))

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
    weight: 0.10,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
