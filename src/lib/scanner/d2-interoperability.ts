// ---------------------------------------------------------------------------
// D2 — API Quality (weight: 0.15, renamed from Interoperability in v2)
// Can an agent actually call this business's endpoints and get structured data?
//
// v2 rebalance: REST API quality is now the PRIMARY driver (up to 40pts).
// MCP tools reduced to 10pts (bonus, not core). The best APIs in the world
// (Stripe, GitHub, Twilio) should score 70+ here based on REST alone.
//
// v2.1 auth-aware: 401/403 with JSON body = proof of a well-built API.
// Auth-protected endpoints that return structured JSON error responses
// score nearly as high as 200 responses. A 401 with JSON + proper headers
// (X-Request-Id, rate limits, API versioning) is BETTER than a 200 with HTML.
//
// Checks: REST API endpoints, OPTIONS support, JSON responses, response
//         times, HTTP status codes, auth-protected API quality, API
//         versioning headers, MCP tools/list (bonus)
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation, ProbeResult } from './types'
import { probeEndpoint, isJsonContentType, endpointExists, getApiSubdomains } from './types'
import { detectWooCommerceStore } from '@/lib/adapters/woocommerce'
import { detectShopifyStore } from '@/lib/adapters/shopify'

// ---------------------------------------------------------------------------
// Auth-protected API quality helpers
// ---------------------------------------------------------------------------

/** Headers that indicate a well-built API (present on 401/403 responses) */
const API_QUALITY_HEADERS = [
  'x-request-id',
  'request-id',
  'x-req-id',
  'x-trace-id',
  'x-correlation-id',
  'cf-ray',
  'x-ratelimit-limit',
  'x-ratelimit-remaining',
  'x-ratelimit-reset',
  'retry-after',
] as const

/** Headers that indicate API versioning support */
const API_VERSION_HEADERS = [
  'api-version',
  'stripe-version',
  'x-api-version',
  'x-version',
] as const

/** Check if a probe result is an auth-protected endpoint returning JSON */
function isAuthJsonResponse(r: ProbeResult): boolean {
  return (
    (r.status === 401 || r.status === 403) &&
    isJsonContentType(r.contentType) &&
    r.body !== null &&
    typeof r.body === 'object'
  )
}

/** Check if a probe result is an auth-protected endpoint returning non-JSON (HTML, etc.) */
function isAuthNonJsonResponse(r: ProbeResult): boolean {
  return (
    (r.status === 401 || r.status === 403) &&
    !isJsonContentType(r.contentType)
  )
}

/** Count how many API quality headers are present on a probe result */
function countQualityHeaders(r: ProbeResult): number {
  let count = 0
  for (const h of API_QUALITY_HEADERS) {
    if (r.headers[h]) count++
  }
  // Also count quality headers declared in Access-Control-Expose-Headers
  // (e.g., Stripe declares Request-Id in CORS expose headers)
  const exposeHeaders = r.headers['access-control-expose-headers'] || ''
  if (exposeHeaders) {
    for (const h of API_QUALITY_HEADERS) {
      if (!r.headers[h] && new RegExp(h.replace('-', '[-]?'), 'i').test(exposeHeaders)) {
        count++
      }
    }
  }
  return count
}

/** Check for API versioning headers on any probe result */
function getVersionHeader(r: ProbeResult): string | null {
  for (const h of API_VERSION_HEADERS) {
    if (r.headers[h]) return `${h}: ${r.headers[h]}`
  }
  return null
}

export async function scanInteroperability(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // 1. MCP endpoint — tools/list capability (up to 10 pts — reduced from 25)
  // Agent-native feature: main value now in Agent-Native Bonus (7% total)
  // -----------------------------------------------------------------------
  const mcpPaths = [
    '/.well-known/mcp.json',
    '/mcp',
    '/api/mcp',
    '/mcp.json',
  ]
  const mcpResults = await Promise.all(
    mcpPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const mcpHit = mcpResults.find((r) => r.found)

  if (mcpHit) {
    const body = mcpHit.body as Record<string, unknown> | null
    const isJson = isJsonContentType(mcpHit.contentType) && typeof body === 'object'

    if (isJson && body) {
      // Check if the MCP manifest has tools listed directly
      const hasTools = !!(
        body.tools ||
        body.capabilities ||
        body.methods ||
        body.resources
      )

      // If this is a discovery file (has 'endpoint'), try calling the actual MCP endpoint
      let mcpToolsFound = hasTools
      let mcpEndpointUrl = ''
      if (!hasTools && body.endpoint && typeof body.endpoint === 'string') {
        mcpEndpointUrl = body.endpoint as string
        // Resolve relative endpoints
        if (mcpEndpointUrl.startsWith('/')) mcpEndpointUrl = `${base}${mcpEndpointUrl}`
        try {
          const controller = new AbortController()
          const timer = setTimeout(() => controller.abort(), 5000)
          const mcpRes = await fetch(mcpEndpointUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
            signal: globalSignal || controller.signal,
          })
          clearTimeout(timer)
          if (mcpRes.ok) {
            const mcpData = await mcpRes.json() as Record<string, unknown>
            const result = mcpData.result as Record<string, unknown> | undefined
            if (result?.tools && Array.isArray(result.tools) && result.tools.length > 0) {
              mcpToolsFound = true
            }
          }
        } catch { /* MCP call failed — scored as partial */ }
      }

      // Also try JSON-RPC tools/list on the hit URL itself (for direct MCP servers like /api/mcp)
      if (!mcpToolsFound && !body.endpoint) {
        try {
          const controller = new AbortController()
          const timer = setTimeout(() => controller.abort(), 5000)
          const mcpRes = await fetch(mcpHit.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
            signal: globalSignal || controller.signal,
          })
          clearTimeout(timer)
          if (mcpRes.ok) {
            const mcpData = await mcpRes.json() as Record<string, unknown>
            const result = mcpData.result as Record<string, unknown> | undefined
            if (result?.tools && Array.isArray(result.tools) && result.tools.length > 0) {
              mcpToolsFound = true
            }
          }
        } catch { /* MCP call failed */ }
      }

      if (mcpToolsFound) {
        rawScore += 10
        checks.push({
          name: 'MCP Tools List',
          passed: true,
          details: `MCP server${mcpEndpointUrl ? ` at ${mcpEndpointUrl}` : ` at ${mcpHit.url}`} responds with callable tools`,
          points: 10,
        })
      } else {
        rawScore += 5
        checks.push({
          name: 'MCP Tools List',
          passed: false,
          details: `MCP discovery at ${mcpHit.url} but could not verify callable tools via JSON-RPC tools/list`,
          points: 5,
        })
        recommendations.push({
          action:
            'Ensure your MCP endpoint supports JSON-RPC 2.0 tools/list method and returns a tools array.',
          impact: '+5 points',
          difficulty: 'medium',
          auto_fixable: false,
        })
      }
    } else {
      rawScore += 3
      checks.push({
        name: 'MCP Tools List',
        passed: false,
        details: `MCP endpoint found at ${mcpHit.url} but response is not valid JSON`,
        points: 3,
      })
      recommendations.push({
        action:
          'Ensure your MCP endpoint returns a JSON manifest with tools array following the MCP specification.',
        impact: '+7 points',
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  } else {
    checks.push({
      name: 'MCP Tools List',
      passed: false,
      details: `No MCP endpoints found at ${mcpPaths.map((p) => `${base}${p}`).join(', ')}`,
      points: 0,
    })
    recommendations.push({
      action:
        'Expose an MCP server at /.well-known/mcp.json or /api/mcp so AI agents can discover and call your tools.',
      impact: '+10 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 2. REST API endpoints — test OPTIONS + GET (up to 40 pts — increased from 25)
  //    This is the CORE of API quality. A company with multiple responding
  //    API endpoints, JSON responses, and CORS support is genuinely useful
  //    to agents regardless of whether they support MCP.
  // -----------------------------------------------------------------------
  const apiPaths = [
    '/api',
    '/api/v1',
    '/api/v2',
    '/api/health',
    '/api/status',
    '/health',
    '/status',
    '/openapi.json',
    '/swagger.json',
    '/api/v1/discover',
  ]

  // Also probe common API subdomains (api.stripe.com, api.anthropic.com, etc.)
  // Include auth-protected resource paths that return 401/403 (still counts as existing)
  const apiSubdomains = getApiSubdomains(base)
  const subdomainApiPaths = apiSubdomains.flatMap((sub) => [
    sub,               // e.g. https://api.stripe.com
    `${sub}/v1`,       // e.g. https://api.stripe.com/v1
    `${sub}/v2`,
    `${sub}/health`,
    `${sub}/status`,
    // Common resource endpoints for auth-protected APIs
    `${sub}/v1/users`,
    `${sub}/v1/accounts`,
    `${sub}/v1/charges`,
    `${sub}/v1/customers`,
    `${sub}/v1/me`,
    `${sub}/v1/organizations`,
    `${sub}/v1/models`,
  ])

  // Test GET on base domain paths + subdomain paths
  const allApiUrls = [
    ...apiPaths.map((p) => `${base}${p}`),
    ...subdomainApiPaths,
  ]
  const getResults = await Promise.all(
    allApiUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const getHits = getResults.filter((r) => endpointExists(r))

  // Test OPTIONS on found endpoints to check CORS
  const optionsTargets = getHits.length > 0
    ? getHits.slice(0, 3).map((r) => r.url)
    : apiPaths.slice(0, 3).map((p) => `${base}${p}`)

  const optionsResults = await Promise.all(
    optionsTargets.map((url) => probeEndpoint(url, 'OPTIONS', globalSignal))
  )
  const optionsHits = optionsResults.filter((r) => r.found || r.status === 204)

  // Separate hits by type: 2xx, auth-JSON (401/403 with JSON), auth-non-JSON
  const okHits = getHits.filter((r) => r.found) // 2xx responses
  const authJsonHits = getHits.filter((r) => isAuthJsonResponse(r))
  const authNonJsonHits = getHits.filter((r) => isAuthNonJsonResponse(r))

  if (getHits.length > 0) {
    // -----------------------------------------------------------------------
    // Auth-aware endpoint scoring:
    //   - 2xx response: full credit per endpoint
    //   - 401/403 with JSON body: ~87% credit (proves endpoint exists + structured)
    //   - 401/403 with HTML/text: ~43% credit (endpoint exists but no structure)
    //
    // Weighted endpoint count: each ok = 1.0, authJson = 0.87, authNonJson = 0.43
    // This means 5 auth-JSON endpoints score like ~4.3 ok endpoints
    // -----------------------------------------------------------------------
    const weightedCount = okHits.length + authJsonHits.length * 0.87 + authNonJsonHits.length * 0.43

    // Scale: 1 equiv = 10pts, 2 = 18pts, 3 = 25pts, 4 = 30pts, 5+ = 35pts
    const pts = Math.min(
      weightedCount <= 1 ? 10 :
      weightedCount <= 2 ? 18 :
      weightedCount <= 3 ? 25 :
      weightedCount <= 4 ? 30 : 35,
      35
    )
    rawScore += pts

    // Build a descriptive breakdown
    const breakdown: string[] = []
    if (okHits.length > 0) breakdown.push(`${okHits.length} public (2xx)`)
    if (authJsonHits.length > 0) breakdown.push(`${authJsonHits.length} auth-protected with JSON`)
    if (authNonJsonHits.length > 0) breakdown.push(`${authNonJsonHits.length} auth-protected (non-JSON)`)

    checks.push({
      name: 'REST API Endpoints',
      passed: true,
      details: `${getHits.length} API endpoint(s) responding: ${breakdown.join(', ')}. URLs: ${getHits.slice(0, 5).map((r) => r.url).join(', ')}${getHits.length > 5 ? ` (+${getHits.length - 5} more)` : ''}`,
      points: pts,
    })

    // -----------------------------------------------------------------------
    // JSON responses (up to 10 pts) — auth JSON responses count fully here
    // A 401 with application/json proves the API returns structured data
    // -----------------------------------------------------------------------
    const allJsonHits = getHits.filter((r) => isJsonContentType(r.contentType))
    if (allJsonHits.length > 0) {
      const jsonPts = Math.min(allJsonHits.length * 3, 10)
      rawScore += jsonPts

      const jsonBreakdown: string[] = []
      const okJson = allJsonHits.filter((r) => r.found)
      const authJson = allJsonHits.filter((r) => !r.found)
      if (okJson.length > 0) jsonBreakdown.push(`${okJson.length} public`)
      if (authJson.length > 0) jsonBreakdown.push(`${authJson.length} auth-protected`)

      checks.push({
        name: 'JSON API Responses',
        passed: true,
        details: `${allJsonHits.length}/${getHits.length} endpoints return JSON (${jsonBreakdown.join(', ')})`,
        points: jsonPts,
      })
    } else {
      checks.push({
        name: 'JSON API Responses',
        passed: false,
        details: 'API endpoints found but none return JSON content-type',
        points: 0,
      })
      recommendations.push({
        action: 'Ensure your API endpoints return application/json content-type for agent compatibility.',
        impact: '+10 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }

    // -----------------------------------------------------------------------
    // Auth-protected API quality indicators (up to 8 pts — NEW)
    // Headers on 401/403 responses that prove API maturity:
    //   - X-Request-Id / trace headers = debugging support
    //   - Rate limit headers = production-grade infrastructure
    //   - API versioning headers = stable, evolving API
    // -----------------------------------------------------------------------
    if (authJsonHits.length > 0) {
      // Check quality headers across all auth responses
      const qualityHeaderCounts = authJsonHits.map(countQualityHeaders)
      const maxQualityHeaders = Math.max(...qualityHeaderCounts)
      const avgQualityHeaders = qualityHeaderCounts.reduce((a, b) => a + b, 0) / qualityHeaderCounts.length

      // Score: 1 quality header = 2pts, 2 = 4pts, 3+ = 6pts
      let authQualityPts = 0
      if (maxQualityHeaders >= 3) authQualityPts = 6
      else if (maxQualityHeaders >= 2) authQualityPts = 4
      else if (maxQualityHeaders >= 1) authQualityPts = 2

      if (authQualityPts > 0) {
        rawScore += authQualityPts

        // List which quality headers were found (direct + CORS expose)
        const foundHeaders: string[] = []
        for (const r of authJsonHits) {
          for (const h of API_QUALITY_HEADERS) {
            if (r.headers[h] && !foundHeaders.includes(h)) foundHeaders.push(h)
          }
          // Also check CORS expose headers
          const exposeHeaders = r.headers['access-control-expose-headers'] || ''
          if (exposeHeaders) {
            for (const h of API_QUALITY_HEADERS) {
              if (!foundHeaders.includes(h) && new RegExp(h.replace('-', '[-]?'), 'i').test(exposeHeaders)) {
                foundHeaders.push(`${h} (via CORS)`)
              }
            }
          }
        }

        checks.push({
          name: 'Auth Response Quality Headers',
          passed: true,
          details: `Auth-protected endpoints include ${foundHeaders.length} quality header(s): ${foundHeaders.join(', ')}. Avg ${avgQualityHeaders.toFixed(1)} per endpoint.`,
          points: authQualityPts,
        })
      } else {
        checks.push({
          name: 'Auth Response Quality Headers',
          passed: false,
          details: 'Auth-protected endpoints lack quality headers (X-Request-Id, rate limit headers, etc.)',
          points: 0,
        })
        recommendations.push({
          action: 'Add X-Request-Id and rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining) to all API responses including 401/403 errors. These help agents debug and respect rate limits.',
          impact: '+6 points',
          difficulty: 'easy',
          auto_fixable: true,
        })
      }

      // Check API versioning headers (up to 2 pts)
      const versionHeaders: string[] = []
      for (const r of [...authJsonHits, ...okHits]) {
        const vh = getVersionHeader(r)
        if (vh && !versionHeaders.includes(vh)) versionHeaders.push(vh)
      }

      if (versionHeaders.length > 0) {
        rawScore += 2
        checks.push({
          name: 'API Versioning Headers',
          passed: true,
          details: `API versioning detected: ${versionHeaders.join(', ')}`,
          points: 2,
        })
      } else {
        // Check URL-based versioning as fallback (/v1/, /v2/)
        const urlVersioned = getHits.some((r) => /\/v\d+\//i.test(r.url))
        if (urlVersioned) {
          rawScore += 1
          checks.push({
            name: 'API Versioning Headers',
            passed: true,
            details: 'URL-based API versioning detected (e.g., /v1/). Header-based versioning (API-Version, Stripe-Version) would be even better.',
            points: 1,
          })
        } else {
          checks.push({
            name: 'API Versioning Headers',
            passed: false,
            details: 'No API versioning detected (neither URL path /v1/ nor headers like API-Version)',
            points: 0,
          })
          recommendations.push({
            action: 'Add API versioning via URL paths (/v1/) or headers (API-Version, Stripe-Version). Versioning signals a stable, production API.',
            impact: '+2 points',
            difficulty: 'easy',
            auto_fixable: true,
          })
        }
      }
    } else if (okHits.length > 0) {
      // No auth endpoints, but check versioning on public endpoints
      const versionHeaders: string[] = []
      for (const r of okHits) {
        const vh = getVersionHeader(r)
        if (vh && !versionHeaders.includes(vh)) versionHeaders.push(vh)
      }
      if (versionHeaders.length > 0) {
        rawScore += 2
        checks.push({
          name: 'API Versioning Headers',
          passed: true,
          details: `API versioning detected: ${versionHeaders.join(', ')}`,
          points: 2,
        })
      } else {
        const urlVersioned = getHits.some((r) => /\/v\d+\//i.test(r.url))
        if (urlVersioned) {
          rawScore += 1
          checks.push({
            name: 'API Versioning Headers',
            passed: true,
            details: 'URL-based API versioning detected (e.g., /v1/)',
            points: 1,
          })
        }
      }
    }

    // Bonus for OPTIONS support (CORS, up to 5 pts)
    if (optionsHits.length > 0) {
      rawScore += 5
      checks.push({
        name: 'OPTIONS / CORS Support',
        passed: true,
        details: `${optionsHits.length} endpoint(s) respond to OPTIONS requests`,
        points: 5,
      })
    } else {
      checks.push({
        name: 'OPTIONS / CORS Support',
        passed: false,
        details: 'No endpoints respond to OPTIONS requests — may block cross-origin agent calls',
        points: 0,
      })
      recommendations.push({
        action:
          'Add CORS headers (Access-Control-Allow-Origin, Allow-Methods) so agents calling from different origins can reach your API.',
        impact: '+5 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'REST API Endpoints',
      passed: false,
      details: `No API endpoints detected at common paths: ${apiPaths.join(', ')}`,
      points: 0,
    })
    recommendations.push({
      action:
        'Expose a REST API at /api or /api/v1 returning JSON. This is fundamental for agent interoperability.',
      impact: '+40 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 3. Response quality — schema consistency + timing (up to 25 pts)
  //    Auth-protected responses count here too — response time for a 401
  //    is just as meaningful as for a 200. Fast 401 = good infrastructure.
  // -----------------------------------------------------------------------
  const responseTimes = getHits.map((r) => r.responseTimeMs)
  const avgResponseTime =
    responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      : 0

  if (responseTimes.length > 0) {
    // Score based on average response time
    let timingPoints = 0
    if (avgResponseTime < 200) timingPoints = 15
    else if (avgResponseTime < 500) timingPoints = 10
    else if (avgResponseTime < 1000) timingPoints = 7
    else if (avgResponseTime < 3000) timingPoints = 3
    else timingPoints = 1

    rawScore += timingPoints
    checks.push({
      name: 'Response Time',
      passed: avgResponseTime < 1000,
      details: `Average response time: ${Math.round(avgResponseTime)}ms across ${responseTimes.length} endpoints`,
      points: timingPoints,
    })

    if (avgResponseTime >= 1000) {
      recommendations.push({
        action: `Improve API response times (currently avg ${Math.round(avgResponseTime)}ms). Target <500ms for agent workflows.`,
        impact: `+${15 - timingPoints} points`,
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  } else {
    checks.push({
      name: 'Response Time',
      passed: false,
      details: 'No API endpoints to measure response time',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 4. Status code correctness (up to 10 pts)
  // -----------------------------------------------------------------------
  // Check that found endpoints return proper 2xx, not-found returns 404, etc.
  const notFoundResult = await probeEndpoint(
    `${base}/api/definitely-does-not-exist-${Date.now()}`,
    'GET',
    globalSignal
  )

  if (notFoundResult.status === 404) {
    rawScore += 10
    checks.push({
      name: 'Proper HTTP Status Codes',
      passed: true,
      details: 'Unknown routes correctly return 404',
      points: 10,
    })
  } else if (notFoundResult.status !== null) {
    rawScore += 3
    checks.push({
      name: 'Proper HTTP Status Codes',
      passed: false,
      details: `Unknown route returned ${notFoundResult.status} instead of 404 — agents cannot distinguish valid from invalid routes`,
      points: 3,
    })
    recommendations.push({
      action:
        'Return proper 404 for unknown routes. Agents rely on HTTP status codes to understand API boundaries.',
      impact: '+7 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  } else {
    checks.push({
      name: 'Proper HTTP Status Codes',
      passed: false,
      details: 'Could not verify HTTP status code behavior (request failed)',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Scale signal — reward breadth of API surface (up to 15 pts bonus)
  //    Companies with MORE endpoints are more mature. Finding 20+ REST
  //    endpoints (Stripe) is fundamentally different from finding 3
  //    (a hobby Next.js app). This separates enterprise APIs from toys.
  //    Uses total unique responding endpoints (2xx + auth-protected).
  // -----------------------------------------------------------------------
  const totalEndpointCount = getHits.length
  let scaleBonusPts = 0
  if (totalEndpointCount > 20) scaleBonusPts = 15
  else if (totalEndpointCount >= 11) scaleBonusPts = 10
  else if (totalEndpointCount >= 4) scaleBonusPts = 5
  // 1-3 endpoints: no bonus (score as-is)

  if (scaleBonusPts > 0) {
    rawScore += scaleBonusPts
    checks.push({
      name: 'API Scale',
      passed: true,
      details: `${totalEndpointCount} unique API endpoints detected — indicates ${totalEndpointCount > 20 ? 'enterprise-grade' : totalEndpointCount >= 11 ? 'comprehensive' : 'growing'} API surface`,
      points: scaleBonusPts,
    })
  } else {
    checks.push({
      name: 'API Scale',
      passed: false,
      details: `Only ${totalEndpointCount} endpoint(s) detected. Mature APIs expose 4+ distinct endpoints.`,
      points: 0,
    })
    if (totalEndpointCount > 0) {
      recommendations.push({
        action:
          'Expose more API endpoints (health, status, versioned resources). Agents benefit from a broader API surface with 4+ distinct endpoints.',
        impact: '+5 points',
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  }

  // -----------------------------------------------------------------------
  // 6. WooCommerce detection (informational — no score impact)
  //    If a site runs WooCommerce, note it in checks and recommend
  //    connecting via the WooCommerce adapter for auto-generated MCP tools.
  // -----------------------------------------------------------------------
  try {
    const wooResult = await detectWooCommerceStore(base)
    if (wooResult.detected) {
      checks.push({
        name: 'WooCommerce Store',
        passed: true,
        details: `${wooResult.details} (confidence: ${wooResult.confidence})`,
        points: 0, // informational — no score impact
      })
      recommendations.push({
        action:
          'WooCommerce store detected — connect to AgentHermes to auto-generate MCP tools (search_products, get_product_details, check_availability, get_categories, get_store_info).',
        impact: '+0 points (enables agent commerce)',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } catch {
    // WooCommerce detection is best-effort — never block the scan
  }

  // -----------------------------------------------------------------------
  // 7. Shopify detection (informational — no score impact)
  //    If a site runs Shopify, note it in checks and recommend connecting
  //    via the Shopify adapter for auto-generated MCP tools.
  // -----------------------------------------------------------------------
  try {
    const shopifyResult = await detectShopifyStore(base)
    if (shopifyResult.detected) {
      checks.push({
        name: 'Shopify Store',
        passed: true,
        details: `${shopifyResult.details} (confidence: ${shopifyResult.confidence})`,
        points: 0, // informational — no score impact
      })
      recommendations.push({
        action:
          'Shopify store detected — connect to AgentHermes to auto-generate MCP tools (search_products, get_product_details, check_availability, get_collections, get_store_info).',
        impact: '+0 points (enables agent commerce)',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } catch {
    // Shopify detection is best-effort — never block the scan
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D2',
    label: 'API Quality',
    score,
    weight: 0.15,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
