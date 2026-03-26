// ---------------------------------------------------------------------------
// D1 — Discoverability (weight: 0.20)
// Can an AI agent find this business and understand what it offers?
// Checks: agent-card.json, llms.txt, robots.txt, OpenAPI spec,
//         Schema.org/JSON-LD, /.well-known/mcp.json, AGENTS.md
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, hasField } from './types'

export async function scanDiscoverability(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // 1. A2A Agent Card (up to 25 pts)
  // -----------------------------------------------------------------------
  const agentCardPaths = [
    '/.well-known/agent.json',
    '/agent-card.json',
    '/agent.json',
  ]
  const agentCardResults = await Promise.all(
    agentCardPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const agentCard = agentCardResults.find((r) => r.found)

  if (agentCard) {
    const isJson = isJsonContentType(agentCard.contentType)
    const body = agentCard.body as Record<string, unknown> | null
    const hasRequiredFields =
      body &&
      typeof body === 'object' &&
      !!(body.name || body.skills || body.capabilities || body.url)

    if (isJson && hasRequiredFields) {
      rawScore += 25
      checks.push({
        name: 'Agent Card',
        passed: true,
        details: `Valid agent card at ${agentCard.url} with required fields`,
        points: 25,
      })
    } else {
      rawScore += 10
      checks.push({
        name: 'Agent Card',
        passed: false,
        details: `Agent card found at ${agentCard.url} but ${!isJson ? 'not valid JSON' : 'missing required fields (name, capabilities)'}`,
        points: 10,
      })
      recommendations.push({
        action:
          'Fix your agent card to return valid JSON with name, capabilities, and url fields per the A2A Agent Card spec.',
        impact: '+15 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'Agent Card',
      passed: false,
      details: `No agent card found. Checked: ${agentCardPaths.map((p) => `${base}${p}`).join(', ')}`,
      points: 0,
    })
    recommendations.push({
      action:
        'Create /.well-known/agent.json describing your service capabilities, supported protocols, and authentication methods.',
      impact: '+25 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 2. llms.txt (up to 20 pts)
  // -----------------------------------------------------------------------
  const llmsPaths = ['/llms.txt', '/.well-known/llms.txt']
  const llmsResults = await Promise.all(
    llmsPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const llmsTxt = llmsResults.find((r) => r.found)

  if (llmsTxt) {
    const body = typeof llmsTxt.body === 'string' ? llmsTxt.body : ''
    const hasContent = body.length > 100

    if (hasContent) {
      rawScore += 20
      checks.push({
        name: 'llms.txt',
        passed: true,
        details: `Found at ${llmsTxt.url} (${body.length} chars)`,
        points: 20,
      })
    } else {
      rawScore += 8
      checks.push({
        name: 'llms.txt',
        passed: false,
        details: `Found at ${llmsTxt.url} but very short (${body.length} chars). Add more detail.`,
        points: 8,
      })
      recommendations.push({
        action:
          'Expand your llms.txt with detailed descriptions of services, API endpoints, and usage examples so LLMs can understand your offering.',
        impact: '+12 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'llms.txt',
      passed: false,
      details: 'No llms.txt found at /llms.txt or /.well-known/llms.txt',
      points: 0,
    })
    recommendations.push({
      action:
        'Create /llms.txt with a plain-text description of your service optimized for LLM consumption.',
      impact: '+20 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 3. robots.txt (up to 10 pts)
  // -----------------------------------------------------------------------
  const robotsResult = await probeEndpoint(`${base}/robots.txt`, 'GET', globalSignal)

  if (robotsResult.found) {
    const body = typeof robotsResult.body === 'string' ? robotsResult.body : ''
    const allowsAgents =
      !body.includes('Disallow: /') ||
      body.includes('User-agent: AgentHermes') ||
      body.includes('User-agent: *\nAllow:')

    rawScore += allowsAgents ? 10 : 5
    checks.push({
      name: 'robots.txt',
      passed: true,
      details: `Found. ${allowsAgents ? 'Allows agent crawling.' : 'May block some agent crawlers.'}`,
      points: allowsAgents ? 10 : 5,
    })
    if (!allowsAgents) {
      recommendations.push({
        action:
          'Update robots.txt to explicitly allow AI agent user-agents (e.g., AgentHermes, Claude, GPTBot).',
        impact: '+5 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'robots.txt',
      passed: false,
      details: 'No robots.txt found',
      points: 0,
    })
    recommendations.push({
      action: 'Add a robots.txt file with appropriate crawl directives for AI agents.',
      impact: '+10 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 4. OpenAPI / Swagger spec (up to 15 pts)
  // -----------------------------------------------------------------------
  const openApiPaths = [
    '/openapi.json',
    '/swagger.json',
    '/.well-known/openapi.json',
    '/api-docs',
    '/api/docs',
  ]
  const openApiResults = await Promise.all(
    openApiPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const openApiHit = openApiResults.find((r) => r.found)

  if (openApiHit) {
    const body = openApiHit.body as Record<string, unknown> | null
    const isOpenApi =
      body &&
      typeof body === 'object' &&
      !!(body.openapi || body.swagger || body.paths)

    if (isOpenApi) {
      rawScore += 15
      checks.push({
        name: 'OpenAPI Spec',
        passed: true,
        details: `Valid OpenAPI/Swagger spec at ${openApiHit.url}`,
        points: 15,
      })
    } else {
      rawScore += 6
      checks.push({
        name: 'OpenAPI Spec',
        passed: false,
        details: `API docs found at ${openApiHit.url} but not in OpenAPI/Swagger format`,
        points: 6,
      })
      recommendations.push({
        action:
          'Convert your API documentation to OpenAPI 3.x format for maximum agent compatibility.',
        impact: '+9 points',
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  } else {
    checks.push({
      name: 'OpenAPI Spec',
      passed: false,
      details: 'No OpenAPI or Swagger specification found',
      points: 0,
    })
    recommendations.push({
      action:
        'Publish an OpenAPI 3.x spec at /openapi.json so agents can understand your API surface.',
      impact: '+15 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Schema.org / JSON-LD (up to 10 pts)
  // -----------------------------------------------------------------------
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  let hasJsonLd = false

  if (homepageResult.found && typeof homepageResult.body === 'string') {
    const html = homepageResult.body
    hasJsonLd =
      html.includes('application/ld+json') || html.includes('schema.org')

    if (hasJsonLd) {
      rawScore += 10
      checks.push({
        name: 'Schema.org / JSON-LD',
        passed: true,
        details: 'Homepage includes structured data (JSON-LD or Schema.org markup)',
        points: 10,
      })
    }
  }

  if (!hasJsonLd) {
    checks.push({
      name: 'Schema.org / JSON-LD',
      passed: false,
      details: 'No structured data (JSON-LD, Schema.org) detected on homepage',
      points: 0,
    })
    recommendations.push({
      action:
        'Add Schema.org JSON-LD markup to your homepage describing your Organization, products, and services.',
      impact: '+10 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 6. MCP Discovery (up to 10 pts)
  // -----------------------------------------------------------------------
  const mcpPaths = ['/.well-known/mcp.json', '/mcp.json']
  const mcpResults = await Promise.all(
    mcpPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const mcpHit = mcpResults.find((r) => r.found)

  if (mcpHit) {
    const isJson = isJsonContentType(mcpHit.contentType)
    if (isJson) {
      rawScore += 10
      checks.push({
        name: 'MCP Discovery',
        passed: true,
        details: `MCP manifest found at ${mcpHit.url}`,
        points: 10,
      })
    } else {
      rawScore += 4
      checks.push({
        name: 'MCP Discovery',
        passed: false,
        details: `MCP endpoint found at ${mcpHit.url} but does not return valid JSON`,
        points: 4,
      })
    }
  } else {
    checks.push({
      name: 'MCP Discovery',
      passed: false,
      details: 'No MCP manifest at /.well-known/mcp.json',
      points: 0,
    })
    recommendations.push({
      action:
        'Create /.well-known/mcp.json listing your available MCP tools so agents can discover your capabilities.',
      impact: '+10 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 7. AGENTS.md (up to 10 pts)
  // -----------------------------------------------------------------------
  const agentsMdPaths = ['/AGENTS.md', '/agents.md', '/.well-known/AGENTS.md']
  const agentsMdResults = await Promise.all(
    agentsMdPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const agentsMd = agentsMdResults.find((r) => r.found)

  if (agentsMd) {
    const body = typeof agentsMd.body === 'string' ? agentsMd.body : ''
    const hasContent = body.length > 50
    rawScore += hasContent ? 10 : 4
    checks.push({
      name: 'AGENTS.md',
      passed: hasContent,
      details: hasContent
        ? `Found at ${agentsMd.url} (${body.length} chars)`
        : `Found at ${agentsMd.url} but very short`,
      points: hasContent ? 10 : 4,
    })
  } else {
    checks.push({
      name: 'AGENTS.md',
      passed: false,
      details: 'No AGENTS.md found',
      points: 0,
    })
    recommendations.push({
      action:
        'Create /AGENTS.md with agent-specific instructions: auth methods, rate limits, preferred endpoints, and behavioral guidelines.',
      impact: '+10 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // Cap at 100
  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D1',
    label: 'Discoverability',
    score,
    weight: 0.2,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
