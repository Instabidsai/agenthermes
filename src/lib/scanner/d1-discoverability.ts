// ---------------------------------------------------------------------------
// D1 — Discoverability (weight: 0.12)
// Can an AI agent find this business and understand what it offers?
//
// v2 rebalance: Shifted weight from agent-native features (agent cards,
// llms.txt, MCP) toward universal discoverability signals (OpenAPI, docs,
// Schema.org, robots.txt). Agent-native features now primarily contribute
// to the separate Agent-Native Bonus (7% of total score).
//
// v3 improvements: Expanded doc subdomain detection (docs.X, developers.X,
// developer.X, api.X, reference.X), more OpenAPI/Swagger paths, HTML meta
// tag analysis for doc links, richer JSON-LD scoring, developer portal
// detection on separate subdomains.
//
// Checks: OpenAPI spec, Schema.org/JSON-LD, robots.txt, developer docs,
//         agent-card.json, llms.txt, /.well-known/mcp.json, AGENTS.md,
//         doc subdomains, meta tags, developer portal
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, hasField, getApiSubdomains, getInfraSubdomains, endpointExists, extractDomain } from './types'

// ---------------------------------------------------------------------------
// HTML analysis helpers
// ---------------------------------------------------------------------------

/** Extract API documentation links from HTML meta tags and link elements */
function extractDocLinksFromHtml(html: string): {
  hasApiDocMeta: boolean
  hasDocsLink: boolean
  links: string[]
} {
  const links: string[] = []

  // Check <link rel="api-documentation"> or <link rel="help">
  const linkRelMatches = html.match(/<link[^>]+rel\s*=\s*["'](api-documentation|help|documentation|service-desc)[^>]*>/gi) || []
  for (const match of linkRelMatches) {
    const hrefMatch = match.match(/href\s*=\s*["']([^"']+)["']/i)
    if (hrefMatch) links.push(hrefMatch[1])
  }

  // Check <meta name="api-docs"> or similar
  const hasApiDocMeta =
    /<meta[^>]+name\s*=\s*["'](api-docs|api-documentation|docs-url|developer-docs)[^>]*>/i.test(html) ||
    /<meta[^>]+property\s*=\s*["']og:see_also["'][^>]*content\s*=\s*["'][^"']*doc/i.test(html)

  // Check for <a href="..."> pointing to doc-like destinations
  const anchorMatches = html.match(/<a[^>]+href\s*=\s*["']([^"']*(?:docs|documentation|api-reference|developers|api-docs|reference)[^"']*)["'][^>]*>/gi) || []
  for (const match of anchorMatches) {
    const hrefMatch = match.match(/href\s*=\s*["']([^"']+)["']/i)
    if (hrefMatch) links.push(hrefMatch[1])
  }

  const hasDocsLink = links.length > 0

  return { hasApiDocMeta, hasDocsLink, links }
}

/** Analyze JSON-LD structured data quality */
function analyzeJsonLd(html: string): {
  hasJsonLd: boolean
  hasSchemaOrg: boolean
  types: string[]
  hasOrganization: boolean
  hasWebApi: boolean
  hasSoftwareApp: boolean
} {
  const hasJsonLd = html.includes('application/ld+json')
  const hasSchemaOrg = html.includes('schema.org')
  const types: string[] = []

  // Extract @type values from JSON-LD blocks
  const ldBlocks = html.match(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || []
  for (const block of ldBlocks) {
    const contentMatch = block.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
    if (contentMatch) {
      try {
        const data = JSON.parse(contentMatch[1])
        const extractTypes = (obj: Record<string, unknown>) => {
          if (obj['@type']) {
            const t = obj['@type']
            if (Array.isArray(t)) types.push(...t.map(String))
            else types.push(String(t))
          }
          if (obj['@graph'] && Array.isArray(obj['@graph'])) {
            for (const item of obj['@graph']) {
              if (item && typeof item === 'object') extractTypes(item as Record<string, unknown>)
            }
          }
        }
        if (data && typeof data === 'object') extractTypes(data)
      } catch {
        // Malformed JSON-LD — still counts as present
      }
    }
  }

  // Also check for microdata / RDFa schema.org types
  const microdataTypes = html.match(/itemtype\s*=\s*["']https?:\/\/schema\.org\/(\w+)["']/gi) || []
  for (const match of microdataTypes) {
    const typeMatch = match.match(/schema\.org\/(\w+)/i)
    if (typeMatch) types.push(typeMatch[1])
  }

  const hasOrganization = types.some((t) =>
    /^(Organization|Corporation|LocalBusiness|OnlineBusiness)$/i.test(t)
  )
  const hasWebApi = types.some((t) => /^(WebAPI|APIReference|TechArticle)$/i.test(t))
  const hasSoftwareApp = types.some((t) =>
    /^(SoftwareApplication|WebApplication|MobileApplication|SoftwareSourceCode)$/i.test(t)
  )

  return { hasJsonLd, hasSchemaOrg, types, hasOrganization, hasWebApi, hasSoftwareApp }
}

// ---------------------------------------------------------------------------
// Main scanner
// ---------------------------------------------------------------------------

export async function scanDiscoverability(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  const domain = extractDomain(base)

  // -----------------------------------------------------------------------
  // 0. Fetch homepage once — reused by multiple checks below
  // -----------------------------------------------------------------------
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  const homepageHtml =
    homepageResult.found && typeof homepageResult.body === 'string'
      ? homepageResult.body
      : ''

  // -----------------------------------------------------------------------
  // 1. A2A Agent Card (up to 8 pts — reduced from 25 in v1)
  // Agent-native feature: main value now in Agent-Native Bonus (7% total)
  // -----------------------------------------------------------------------
  const agentCardPaths = [
    '/.well-known/agent.json',
    '/agent-card.json',
    '/agent.json',
  ]
  const agentCardResults = await Promise.allSettled(
    agentCardPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const agentCard = agentCardResults
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
    .find((r) => r.found)

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
  const llmsSettled = await Promise.allSettled(
    llmsPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const llmsTxt = llmsSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
    .find((r) => r.found)

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
  //
  //    v3: Expanded paths — /openapi.yaml, /api/openapi, /v1/openapi.json,
  //    /v2/openapi.json, /docs/openapi.json. Also checks doc subdomains.
  // -----------------------------------------------------------------------
  const openApiPaths = [
    '/openapi.json',
    '/openapi.yaml',
    '/swagger.json',
    '/swagger.yaml',
    '/.well-known/openapi.json',
    '/api-docs',
    '/api/docs',
    '/api/openapi',
    '/api/openapi.json',
    '/api/openapi.yaml',
    '/api/swagger.json',
    '/docs/api',
    '/docs/openapi.json',
    '/v1/openapi.json',
    '/v2/openapi.json',
    '/v3/openapi.json',
  ]
  // Also check API subdomains for OpenAPI specs
  const apiSubdomains = getApiSubdomains(base)
  const subdomainOpenApiPaths = apiSubdomains.flatMap((sub) => [
    `${sub}/openapi.json`,
    `${sub}/openapi.yaml`,
    `${sub}/swagger.json`,
    `${sub}/api-docs`,
  ])
  // Check doc subdomains for OpenAPI specs too (e.g., docs.stripe.com/openapi)
  const docSubdomainOpenApiPaths = domain
    ? [
        `https://docs.${domain}/openapi.json`,
        `https://docs.${domain}/openapi.yaml`,
        `https://docs.${domain}/api/openapi.json`,
        `https://reference.${domain}/openapi.json`,
      ]
    : []
  const allOpenApiPaths = [
    ...openApiPaths.map((p) => `${base}${p}`),
    ...subdomainOpenApiPaths,
    ...docSubdomainOpenApiPaths,
  ]
  const openApiSettled = await Promise.allSettled(
    allOpenApiPaths.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const openApiHit = openApiSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
    .find((r) => r.found)

  if (openApiHit) {
    const body = openApiHit.body as Record<string, unknown> | null
    const bodyStr = typeof openApiHit.body === 'string' ? openApiHit.body : ''
    const isOpenApi =
      (body &&
        typeof body === 'object' &&
        !!(body.openapi || body.swagger || body.paths)) ||
      // YAML specs may come back as text — check for common markers
      /^(openapi|swagger):/m.test(bodyStr)

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
  //    v3: Deeper analysis — bonus for Organization type, WebAPI type, or
  //    SoftwareApplication type. Richer detail reporting.
  // -----------------------------------------------------------------------
  const jsonLdAnalysis = analyzeJsonLd(homepageHtml)

  if (jsonLdAnalysis.hasJsonLd || jsonLdAnalysis.hasSchemaOrg) {
    // Base credit for having any structured data
    let jsonLdPoints = 10
    const jsonLdDetails: string[] = ['Homepage includes structured data']

    // Bonus: identified Organization/Business type (+2)
    if (jsonLdAnalysis.hasOrganization) {
      jsonLdPoints += 2
      jsonLdDetails.push('Organization type detected')
    }

    // Bonus: identified WebAPI or API reference type (+2)
    if (jsonLdAnalysis.hasWebApi) {
      jsonLdPoints += 2
      jsonLdDetails.push('WebAPI/APIReference type detected')
    }

    // Bonus: identified SoftwareApplication type (+1)
    if (jsonLdAnalysis.hasSoftwareApp) {
      jsonLdPoints += 1
      jsonLdDetails.push('SoftwareApplication type detected')
    }

    jsonLdPoints = Math.min(jsonLdPoints, 15)

    if (jsonLdAnalysis.types.length > 0) {
      jsonLdDetails.push(`Types: ${[...new Set(jsonLdAnalysis.types)].slice(0, 5).join(', ')}`)
    }

    rawScore += jsonLdPoints
    checks.push({
      name: 'Schema.org / JSON-LD',
      passed: true,
      details: jsonLdDetails.join('. '),
      points: jsonLdPoints,
    })

    if (jsonLdPoints < 15) {
      const missing: string[] = []
      if (!jsonLdAnalysis.hasOrganization) missing.push('Organization')
      if (!jsonLdAnalysis.hasWebApi) missing.push('WebAPI')
      if (!jsonLdAnalysis.hasSoftwareApp) missing.push('SoftwareApplication')
      recommendations.push({
        action: `Enhance your JSON-LD with additional Schema.org types: ${missing.join(', ')}. This helps agents understand your business and API surface.`,
        impact: `+${15 - jsonLdPoints} points`,
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
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
  // 5b. HTML meta tags for API documentation links (up to 5 pts — NEW in v3)
  //     Companies often embed <link rel="api-documentation"> or <meta> tags
  //     pointing to their API docs. This is a lightweight discoverability
  //     signal that agents can parse from the homepage.
  // -----------------------------------------------------------------------
  const metaAnalysis = extractDocLinksFromHtml(homepageHtml)

  if (metaAnalysis.hasApiDocMeta || metaAnalysis.hasDocsLink) {
    const metaPoints = metaAnalysis.hasApiDocMeta ? 5 : 3
    rawScore += metaPoints
    const linkSample = metaAnalysis.links.slice(0, 3).join(', ')
    checks.push({
      name: 'Doc Meta Tags',
      passed: true,
      details: `Homepage contains ${metaAnalysis.hasApiDocMeta ? 'API documentation meta tags' : 'links to documentation'}${linkSample ? ` (${linkSample})` : ''}`,
      points: metaPoints,
    })
  } else {
    checks.push({
      name: 'Doc Meta Tags',
      passed: false,
      details: 'No API documentation meta tags or doc links found in homepage HTML',
      points: 0,
    })
    recommendations.push({
      action:
        'Add <link rel="api-documentation" href="..."> or <link rel="help" href="..."> meta tags to your homepage so agents can discover your docs programmatically.',
      impact: '+5 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 6. MCP Discovery (up to 5 pts — reduced from 10 in v1)
  // Agent-native feature: main value now in Agent-Native Bonus
  // -----------------------------------------------------------------------
  const mcpPaths = ['/.well-known/mcp.json', '/mcp.json']
  const mcpSettled = await Promise.allSettled(
    mcpPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const mcpHit = mcpSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
    .find((r) => r.found)

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
  const agentsMdSettled = await Promise.allSettled(
    agentsMdPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const agentsMd = agentsMdSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
    .find((r) => r.found)

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
  //
  //    v3: Expanded subdomain list — docs.X, developers.X, developer.X,
  //    api.X, reference.X. Also checks /docs, /documentation, /api-reference,
  //    /developers paths on the main domain.
  // -----------------------------------------------------------------------
  const docsSubdomainUrls = domain
    ? [
        `https://docs.${domain}`,
        `https://developer.${domain}`,
        `https://developers.${domain}`,
        `https://api.${domain}`,
        `https://reference.${domain}`,
      ]
    : []
  const docsPathUrls = [
    `${base}/docs`,
    `${base}/documentation`,
    `${base}/api-reference`,
    `${base}/developers`,
    `${base}/developer`,
    `${base}/api-docs`,
  ]
  const allDocsUrls = [...docsSubdomainUrls, ...docsPathUrls]
  const docsSettled = await Promise.allSettled(
    allDocsUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const docsResults = docsSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
  const docsSubdomainHit = docsResults.find((r) => r.found && docsSubdomainUrls.some((u) => r.url.startsWith(u)))
  const docsPathHit = docsResults.find((r) => r.found && docsPathUrls.some((u) => r.url.startsWith(u)))

  // Also check homepage HTML for links to developer docs, API references, OpenAPI specs
  let hasDevDocsLink = false
  if (homepageHtml) {
    hasDevDocsLink = /docs\.|developer\.|\/docs|\/api-reference|\/api-docs|\/documentation|openapi|swagger/i.test(homepageHtml)
  }

  if (docsSubdomainHit) {
    rawScore += 25
    const allDocsHits = docsResults.filter((r) => r.found).map((r) => r.url)
    checks.push({
      name: 'Developer Docs',
      passed: true,
      details: `Developer documentation on subdomain: ${docsSubdomainHit.url}${allDocsHits.length > 1 ? ` (+ ${allDocsHits.length - 1} more)` : ''}`,
      points: 25,
    })
  } else if (docsPathHit) {
    rawScore += 18
    checks.push({
      name: 'Developer Docs',
      passed: true,
      details: `Developer documentation found at ${docsPathHit.url}`,
      points: 18,
    })
    recommendations.push({
      action:
        'Consider hosting developer documentation on a dedicated subdomain (e.g., docs.yourdomain.com) for better discoverability by agents.',
      impact: '+7 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  } else if (hasDevDocsLink) {
    rawScore += 10
    checks.push({
      name: 'Developer Docs',
      passed: false,
      details: 'Homepage links to developer documentation or API reference but no dedicated docs page/subdomain detected',
      points: 10,
    })
    recommendations.push({
      action:
        'Ensure your documentation is accessible at a predictable path (/docs, /api-reference) or subdomain (docs.yourdomain.com).',
      impact: '+15 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  } else {
    checks.push({
      name: 'Developer Docs',
      passed: false,
      details: 'No developer documentation found on subdomains (docs.*, developer.*, api.*, reference.*) or common paths (/docs, /documentation, /api-reference)',
      points: 0,
    })
    recommendations.push({
      action:
        'Create developer documentation at /docs or docs.yourdomain.com. Comprehensive docs are the single most important signal for agent discoverability.',
      impact: '+25 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 8b. Developer Portal on separate subdomain (up to 5 pts — NEW in v3)
  //     A developer portal (separate from docs) with dev-focused content
  //     like getting-started guides, API explorers, changelogs, etc.
  // -----------------------------------------------------------------------
  const portalUrls = domain
    ? [
        `https://developer.${domain}`,
        `https://developers.${domain}`,
        `https://developer.${domain}/docs`,
        `https://developers.${domain}/docs`,
      ]
    : []
  // Reuse results from docs probing for portal subdomains
  const portalHits = docsResults.filter(
    (r) => r.found && (r.url.includes('developer.') || r.url.includes('developers.'))
  )
  // Check if portal content has developer-focused keywords
  const hasDevContent = portalHits.some((r) => {
    const text = typeof r.body === 'string' ? r.body : ''
    return /getting.?started|quickstart|api.?key|sdk|tutorial|changelog|playground/i.test(text)
  })

  if (portalHits.length > 0 && hasDevContent) {
    rawScore += 5
    checks.push({
      name: 'Developer Portal',
      passed: true,
      details: `Developer portal with dev-focused content at ${portalHits[0].url}`,
      points: 5,
    })
  } else if (portalHits.length > 0) {
    rawScore += 3
    checks.push({
      name: 'Developer Portal',
      passed: false,
      details: `Developer subdomain exists (${portalHits[0].url}) but lacks developer-focused content (quickstart, API keys, SDKs)`,
      points: 3,
    })
  } else {
    checks.push({
      name: 'Developer Portal',
      passed: false,
      details: 'No dedicated developer portal subdomain (developer.*, developers.*) detected',
      points: 0,
    })
    // Only recommend if they also lack docs
    if (!docsSubdomainHit && !docsPathHit) {
      recommendations.push({
        action:
          'Create a developer portal at developer.yourdomain.com with getting-started guides, API explorer, and SDK documentation.',
        impact: '+5 points',
        difficulty: 'hard',
        auto_fixable: false,
      })
    }
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
