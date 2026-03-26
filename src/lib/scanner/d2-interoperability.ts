// ---------------------------------------------------------------------------
// D2 — Interoperability (weight: 0.20)
// Can an agent actually call this business's endpoints and get structured data?
// Checks: MCP tools/list, REST API endpoints, OPTIONS support, response
//         schema validation, response times, HTTP status codes
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, endpointExists } from './types'

export async function scanInteroperability(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // 1. MCP endpoint — tools/list capability (up to 25 pts)
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
      // Check if the MCP manifest has tools listed
      const hasTools = !!(
        body.tools ||
        body.capabilities ||
        body.methods ||
        body.resources
      )
      if (hasTools) {
        rawScore += 25
        checks.push({
          name: 'MCP Tools List',
          passed: true,
          details: `MCP manifest at ${mcpHit.url} lists available tools/capabilities`,
          points: 25,
        })
      } else {
        rawScore += 12
        checks.push({
          name: 'MCP Tools List',
          passed: false,
          details: `MCP endpoint at ${mcpHit.url} returns JSON but no tools/capabilities listed`,
          points: 12,
        })
        recommendations.push({
          action:
            'Add a "tools" array to your MCP manifest listing available tools with name, description, and inputSchema.',
          impact: '+13 points',
          difficulty: 'medium',
          auto_fixable: false,
        })
      }
    } else {
      rawScore += 5
      checks.push({
        name: 'MCP Tools List',
        passed: false,
        details: `MCP endpoint found at ${mcpHit.url} but response is not valid JSON`,
        points: 5,
      })
      recommendations.push({
        action:
          'Ensure your MCP endpoint returns a JSON manifest with tools array following the MCP specification.',
        impact: '+20 points',
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
      impact: '+25 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 2. REST API endpoints — test OPTIONS + GET (up to 25 pts)
  // -----------------------------------------------------------------------
  const apiPaths = [
    '/api',
    '/api/v1',
    '/api/v2',
    '/api/health',
    '/api/status',
    '/health',
    '/status',
  ]

  // Test GET
  const getResults = await Promise.all(
    apiPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
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
    const pts = Math.min(getHits.length * 5, 15)
    rawScore += pts
    checks.push({
      name: 'REST API Endpoints',
      passed: true,
      details: `${getHits.length} API endpoint(s) responding: ${getHits.map((r) => r.url).join(', ')}`,
      points: pts,
    })

    // Bonus for JSON responses
    const jsonHits = getHits.filter((r) => isJsonContentType(r.contentType))
    if (jsonHits.length > 0) {
      rawScore += 5
      checks.push({
        name: 'JSON API Responses',
        passed: true,
        details: `${jsonHits.length}/${getHits.length} endpoints return JSON`,
        points: 5,
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
        impact: '+5 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }

    // Bonus for OPTIONS support (CORS)
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
      impact: '+25 points',
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
    label: 'Interoperability',
    score,
    weight: 0.2,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
