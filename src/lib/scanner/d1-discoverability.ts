// ---------------------------------------------------------------------------
// D1 — Discoverability (weight: 0.12)
// Can an AI agent find this business and understand what it offers?
//
// v2 rebalance: Shifted weight from agent-native features (agent cards,
// llms.txt, MCP) toward universal discoverability signals (OpenAPI, docs,
// Schema.org, robots.txt). Agent-native features now primarily contribute
// to the separate Agent-Native Bonus (7% of total score).
//
// Checks: OpenAPI spec, Schema.org/JSON-LD, robots.txt, developer docs,
//         agent-card.json, llms.txt, /.well-known/mcp.json, AGENTS.md
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, hasField, getApiSubdomains, getInfraSubdomains, endpointExists } from './types'

export async function scanDiscoverability(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // 1. A2A Agent Card (up to 8 pts — reduced from 25 in v1)
  // Agent-native feature: main value now in Agent-Native Bonus (7% total)
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
      rawScore += 8
      checks.push({
        name: 'Agent Card',
        passed: true,
        details: `Valid agent card at ${agentCard.url} with required fields`,
        points: 8,
      })
    } else {
      rawScore += 3
      checks.push({
        name: 'Agent Card',
        passed: false,
        details: `Agent card found at ${agentCard.url} but ${!isJson ? 'not valid JSON' : 'missing required fields (name, capabilities)'}`,
        points: 3,
      })
      recommendations.push({
        action:
          'Fix your agent card to return valid JSON with name, capabilities, and url fields per the A2A Agent Card spec.',
        impact: '+5 points',
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
      impact: '+8 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 2. llms.txt (up to 7 pts — reduced from 20 in v1)
  // Agent-native feature: main value now in Agent-Native Bonus
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
      rawScore += 7
      checks.push({
        name: 'llms.txt',
        passed: true,
        details: `Found at ${llmsTxt.url} (${body.length} chars)`,
        points: 7,
      })
    } else {
      rawScore += 3
      checks.push({
        name: 'llms.txt',
        passed: false,
        details: `Found at ${llmsTxt.url} but very short (${body.length} chars). Add more detail.`,
        points: 3,
      })
      recommendations.push({
        action:
          'Expand your llms.txt with detailed descriptions of services, API endpoints, and usage examples so LLMs can understand your offering.',
        impact: '+4 points',
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
      impact: '+7 points',
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
    const rootDisallow = /Disallow:\s*\/\s*$/m.test(body)
    const allowsAgents =
      !rootDisallow ||
      body.includes('User-agent: AgentHermes') ||
      /User-agent:\s*\*[\s\S]*?Allow:/i.test(body)

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
  // 4. OpenAPI / Swagger spec (up to 25 pts — increased from 15 in v1)
  //    This is the GOLD STANDARD for API discoverability. A published OpenAPI
  //    spec tells agents exactly what endpoints exist, what parameters they
  //    accept, and what they return. Worth more than agent-native features.
  // -----------------------------------------------------------------------
  const openApiPaths = [
    '/openapi.json',
    '/swagger.json',
    '/.well-known/openapi.json',
    '/api-docs',
    '/api/docs',
  ]
  // Also check API subdomains for OpenAPI specs
  const apiSubdomains = getApiSubdomains(base)
  const subdomainOpenApiPaths = apiSubdomains.flatMap((sub) => [
    `${sub}/openapi.json`,
    `${sub}/swagger.json`,
    `${sub}/api-docs`,
  ])
  const allOpenApiPaths = [
    ...openApiPaths.map((p) => `${base}${p}`),
    ...subdomainOpenApiPaths,
  ]
  const openApiResults = await Promise.all(
    allOpenApiPaths.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const openApiHit = openApiResults.find((r) => r.found)

  if (openApiHit) {
    const body = openApiHit.body as Record<string, unknown> | null
    const isOpenApi =
      body &&
      typeof body === 'object' &&
      !!(body.openapi || body.swagger || body.paths)

    if (isOpenApi) {
      rawScore += 25
      checks.push({
        name: 'OpenAPI Spec',
        passed: true,
        details: `Valid OpenAPI/Swagger spec at ${openApiHit.url}`,
        points: 25,
      })
    } else {
      rawScore += 10
      checks.push({
        name: 'OpenAPI Spec',
        passed: false,
        details: `API docs found at ${openApiHit.url} but not in OpenAPI/Swagger format`,
        points: 10,
      })
      recommendations.push({
        action:
          'Convert your API documentation to OpenAPI 3.x format for maximum agent compatibility.',
        impact: '+15 points',
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
      impact: '+25 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Schema.org / JSON-LD (up to 15 pts — increased from 10 in v1)
  //    Structured data is how agents understand what a business IS.
  // -----------------------------------------------------------------------
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  let hasJsonLd = false

  if (homepageResult.found && typeof homepageResult.body === 'string') {
    const html = homepageResult.body
    hasJsonLd =
      html.includes('application/ld+json') || html.includes('schema.org')

    if (hasJsonLd) {
      rawScore += 15
      checks.push({
        name: 'Schema.org / JSON-LD',
        passed: true,
        details: 'Homepage includes structured data (JSON-LD or Schema.org markup)',
        points: 15,
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
      impact: '+15 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 6. MCP Discovery (up to 5 pts — reduced from 10 in v1)
  // Agent-native feature: main value now in Agent-Native Bonus
  // -----------------------------------------------------------------------
  const mcpPaths = ['/.well-known/mcp.json', '/mcp.json']
  const mcpResults = await Promise.all(
    mcpPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const mcpHit = mcpResults.find((r) => r.found)

  if (mcpHit) {
    const isJson = isJsonContentType(mcpHit.contentType)
    if (isJson) {
      rawScore += 5
      checks.push({
        name: 'MCP Discovery',
        passed: true,
        details: `MCP manifest found at ${mcpHit.url}`,
        points: 5,
      })
    } else {
      rawScore += 2
      checks.push({
        name: 'MCP Discovery',
        passed: false,
        details: `MCP endpoint found at ${mcpHit.url} but does not return valid JSON`,
        points: 2,
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
      impact: '+5 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 7. AGENTS.md (up to 5 pts — reduced from 10 in v1)
  // Agent-native feature: main value now in Agent-Native Bonus
  // -----------------------------------------------------------------------
  const agentsMdPaths = ['/AGENTS.md', '/agents.md', '/.well-known/AGENTS.md']
  const agentsMdResults = await Promise.all(
    agentsMdPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const agentsMd = agentsMdResults.find((r) => r.found)

  if (agentsMd) {
    const body = typeof agentsMd.body === 'string' ? agentsMd.body : ''
    const hasContent = body.length > 50
    rawScore += hasContent ? 5 : 2
    checks.push({
      name: 'AGENTS.md',
      passed: hasContent,
      details: hasContent
        ? `Found at ${agentsMd.url} (${body.length} chars)`
        : `Found at ${agentsMd.url} but very short`,
      points: hasContent ? 5 : 2,
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
      impact: '+5 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 8. Developer documentation on subdomains (up to 25 pts — increased from 10)
  //    Companies like Stripe (docs.stripe.com) and Anthropic (docs.anthropic.com)
  //    have excellent docs on subdomains. This is one of the MOST important
  //    signals for agent discoverability — comprehensive docs = agent-friendly.
  // -----------------------------------------------------------------------
  const infraSubdomains = getInfraSubdomains(base)
  const docsSubdomainUrls = infraSubdomains.filter(
    (u) => u.includes('docs.') || u.includes('developer')
  )
  const docsSubdomainResults = await Promise.all(
    docsSubdomainUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const docsSubdomainHit = docsSubdomainResults.find((r) => r.found)

  // Also check homepage HTML for links to developer docs, API references, OpenAPI specs
  let hasDevDocsLink = false
  if (homepageResult.found && typeof homepageResult.body === 'string') {
    const html = homepageResult.body
    hasDevDocsLink = /docs\.|developer\.|\/docs|\/api-reference|\/api-docs|openapi|swagger/i.test(html)
  }

  if (docsSubdomainHit) {
    rawScore += 25
    checks.push({
      name: 'Developer Docs (Subdomain)',
      passed: true,
      details: `Developer documentation found at ${docsSubdomainHit.url}`,
      points: 25,
    })
  } else if (hasDevDocsLink) {
    rawScore += 12
    checks.push({
      name: 'Developer Docs (Subdomain)',
      passed: false,
      details: 'Homepage links to developer documentation or API reference',
      points: 12,
    })
  } else {
    checks.push({
      name: 'Developer Docs (Subdomain)',
      passed: false,
      details: 'No developer documentation found on subdomains (docs.*, developer.*) or linked from homepage',
      points: 0,
    })
  }

  // Cap at 100
  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D1',
    label: 'Discoverability',
    score,
    weight: 0.12,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
