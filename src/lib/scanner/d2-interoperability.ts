// ---------------------------------------------------------------------------
// D2 — API Quality (weight: 0.15, renamed from Interoperability in v2)
// Can an agent actually call this business's endpoints and get structured data?
//
// v2 rebalance: REST API quality is now the PRIMARY driver (up to 40pts).
// MCP tools reduced to 10pts (bonus, not core). The best APIs in the world
// (Stripe, GitHub, Twilio) should score 70+ here based on REST alone.
//
// Checks: REST API endpoints, OPTIONS support, JSON responses, response
//         times, HTTP status codes, MCP tools/list (bonus)
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, endpointExists, getApiSubdomains } from './types'

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

  if (getHits.length > 0) {
    // Scale: 1 endpoint = 10pts, 2 = 18pts, 3 = 25pts, 4 = 30pts, 5+ = 35pts
    const pts = Math.min(getHits.length <= 1 ? 10 : getHits.length <= 2 ? 18 : getHits.length <= 3 ? 25 : getHits.length <= 4 ? 30 : 35, 35)
    rawScore += pts
    checks.push({
      name: 'REST API Endpoints',
      passed: true,
      details: `${getHits.length} API endpoint(s) responding: ${getHits.map((r) => r.url).join(', ')}`,
      points: pts,
    })

    // Bonus for JSON responses (up to 10 pts)
    const jsonHits = getHits.filter((r) => isJsonContentType(r.contentType))
    if (jsonHits.length > 0) {
      const jsonPts = Math.min(jsonHits.length * 3, 10)
      rawScore += jsonPts
      checks.push({
        name: 'JSON API Responses',
        passed: true,
        details: `${jsonHits.length}/${getHits.length} endpoints return JSON`,
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
