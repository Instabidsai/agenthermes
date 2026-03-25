import type {
  AuditCategory,
  AuditScorecard,
  Business,
} from '@/types/database'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EndpointCheckResult {
  url: string
  found: boolean
  status: number | null
  contentType: string | null
  body: unknown
  error: string | null
  responseTimeMs: number
}

interface CategoryResult {
  category: AuditCategory
  label: string
  score: number
  max_score: 20
  details: Record<string, unknown>
  recommendations: string[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FETCH_TIMEOUT_MS = 5_000

/** Fetch a URL with a hard timeout. Never throws — always returns a result. */
async function probeEndpoint(url: string): Promise<EndpointCheckResult> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'AgentHermes-Auditor/1.0',
      },
      redirect: 'follow',
    })

    clearTimeout(timer)

    const contentType = res.headers.get('content-type') ?? null
    let body: unknown = null
    try {
      const text = await res.text()
      // Try to parse as JSON first
      try {
        body = JSON.parse(text)
      } catch {
        body = text.slice(0, 2_000) // keep first 2KB of non-JSON
      }
    } catch {
      // body stays null
    }

    return {
      url,
      found: res.ok,
      status: res.status,
      contentType,
      body,
      error: res.ok ? null : `HTTP ${res.status}`,
      responseTimeMs: Date.now() - start,
    }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown fetch error'
    return {
      url,
      found: false,
      status: null,
      contentType: null,
      body: null,
      error: message,
      responseTimeMs: Date.now() - start,
    }
  }
}

function normalizeUrl(input: string): string {
  let url = input.trim()
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`
  }
  // Strip trailing slash for consistent concatenation
  return url.replace(/\/+$/, '')
}

function tierFromScore(score: number): Business['audit_tier'] {
  if (score >= 90) return 'platinum'
  if (score >= 75) return 'gold'
  if (score >= 60) return 'silver'
  if (score >= 40) return 'bronze'
  return 'unaudited'
}

function isJsonContentType(ct: string | null): boolean {
  if (!ct) return false
  return ct.includes('application/json') || ct.includes('application/ld+json')
}

function isValidAgentCard(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false
  const obj = body as Record<string, unknown>
  // A2A agent cards typically have a "name" and some capabilities / skills
  return !!(obj.name || obj.skills || obj.capabilities || obj.url)
}

function hasField(body: unknown, ...fields: string[]): boolean {
  if (!body || typeof body !== 'object') return false
  const obj = body as Record<string, unknown>
  return fields.some((f) => f in obj && obj[f] !== null && obj[f] !== undefined)
}

// ---------------------------------------------------------------------------
// Category Auditors
// ---------------------------------------------------------------------------

async function auditMachineReadableProfile(
  base: string
): Promise<CategoryResult> {
  const MAX = 20
  let score = 0
  const details: Record<string, unknown> = {}
  const recommendations: string[] = []

  // 1. A2A Agent Card (up to 10 pts)
  const agentCardPaths = [
    '/.well-known/agent.json',
    '/agent-card.json',
    '/agent.json',
  ]
  const agentCardResults = await Promise.all(
    agentCardPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const agentCard = agentCardResults.find((r) => r.found)

  if (agentCard) {
    details.agent_card_url = agentCard.url
    details.agent_card_status = agentCard.status
    if (isJsonContentType(agentCard.contentType) && isValidAgentCard(agentCard.body)) {
      score += 10
      details.agent_card_valid = true
      details.agent_card_body = agentCard.body
    } else if (agentCard.found) {
      score += 4 // exists but not well-formed
      details.agent_card_valid = false
      recommendations.push(
        'Agent card found but is not valid JSON or missing required fields (name, capabilities). Follow the A2A Agent Card spec.'
      )
    }
  } else {
    details.agent_card_found = false
    details.agent_card_paths_checked = agentCardPaths.map((p) => `${base}${p}`)
    recommendations.push(
      'No A2A Agent Card found. Create /.well-known/agent.json describing your service capabilities, supported protocols, and authentication.'
    )
  }

  // 2. llms.txt (up to 6 pts)
  const llmsPaths = ['/llms.txt', '/.well-known/llms.txt']
  const llmsResults = await Promise.all(
    llmsPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const llmsTxt = llmsResults.find((r) => r.found)

  if (llmsTxt) {
    details.llms_txt_url = llmsTxt.url
    const body = typeof llmsTxt.body === 'string' ? llmsTxt.body : ''
    const hasContent = body.length > 50
    score += hasContent ? 6 : 3
    details.llms_txt_length = body.length
    if (!hasContent) {
      recommendations.push(
        'llms.txt exists but is very short. Add detailed descriptions of what your service does, API endpoints, and usage examples so LLMs can understand your offering.'
      )
    }
  } else {
    details.llms_txt_found = false
    recommendations.push(
      'No llms.txt found. Create /llms.txt with a plain-text description of your service optimized for LLM consumption.'
    )
  }

  // 3. Structured metadata — robots.txt, sitemap, schema.org (up to 4 pts)
  const robotsResult = await probeEndpoint(`${base}/robots.txt`)
  const sitemapResult = await probeEndpoint(`${base}/sitemap.xml`)
  if (robotsResult.found) {
    score += 2
    details.robots_txt = true
  }
  if (sitemapResult.found) {
    score += 2
    details.sitemap_xml = true
  }
  if (!robotsResult.found && !sitemapResult.found) {
    recommendations.push(
      'Add robots.txt and sitemap.xml for basic machine-discoverability.'
    )
  }

  return {
    category: 'machine_readable_profile',
    label: 'Machine-Readable Profile',
    score: Math.min(score, MAX),
    max_score: MAX,
    details,
    recommendations,
  }
}

async function auditMcpApiEndpoints(
  base: string
): Promise<CategoryResult> {
  const MAX = 20
  let score = 0
  const details: Record<string, unknown> = {}
  const recommendations: string[] = []

  // 1. MCP endpoint discovery (up to 8 pts)
  const mcpPaths = [
    '/.well-known/mcp.json',
    '/mcp',
    '/api/mcp',
    '/mcp.json',
  ]
  const mcpResults = await Promise.all(
    mcpPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const mcpHits = mcpResults.filter((r) => r.found)

  if (mcpHits.length > 0) {
    score += 5
    details.mcp_endpoints_found = mcpHits.map((r) => r.url)
    // Bonus for well-formed JSON MCP config
    const jsonMcp = mcpHits.find(
      (r) => isJsonContentType(r.contentType) && typeof r.body === 'object'
    )
    if (jsonMcp) {
      score += 3
      details.mcp_json_valid = true
      details.mcp_body = jsonMcp.body
    } else {
      recommendations.push(
        'MCP endpoint found but does not return valid JSON. Ensure your MCP endpoint returns a JSON manifest of available tools.'
      )
    }
  } else {
    details.mcp_endpoints_found = []
    details.mcp_paths_checked = mcpPaths.map((p) => `${base}${p}`)
    recommendations.push(
      'No MCP endpoints found. Expose an MCP server at /.well-known/mcp.json or /api/mcp so AI agents can discover and call your tools.'
    )
  }

  // 2. API documentation (up to 6 pts)
  const docPaths = [
    '/openapi.json',
    '/swagger.json',
    '/api-docs',
    '/docs',
    '/api/docs',
    '/.well-known/openapi.json',
  ]
  const docResults = await Promise.all(
    docPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const docHits = docResults.filter((r) => r.found)

  if (docHits.length > 0) {
    details.api_docs_found = docHits.map((r) => r.url)
    const openApiDoc = docHits.find((r) => {
      if (!r.body || typeof r.body !== 'object') return false
      const obj = r.body as Record<string, unknown>
      return !!(obj.openapi || obj.swagger || obj.paths)
    })
    if (openApiDoc) {
      score += 6
      details.openapi_valid = true
    } else {
      score += 3 // docs exist but not OpenAPI
      details.openapi_valid = false
      recommendations.push(
        'API documentation found but not in OpenAPI/Swagger format. Convert to OpenAPI 3.x for maximum agent compatibility.'
      )
    }
  } else {
    details.api_docs_found = []
    recommendations.push(
      'No API documentation found. Publish an OpenAPI 3.x spec at /openapi.json so agents can understand your API surface.'
    )
  }

  // 3. Live API endpoint test (up to 6 pts)
  // Check common REST API patterns
  const apiPaths = [
    '/api',
    '/api/v1',
    '/api/health',
    '/api/status',
    '/health',
    '/status',
  ]
  const apiResults = await Promise.all(
    apiPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const apiHits = apiResults.filter((r) => r.found)

  if (apiHits.length > 0) {
    score += 3
    details.live_api_endpoints = apiHits.map((r) => ({
      url: r.url,
      status: r.status,
      responseTimeMs: r.responseTimeMs,
    }))
    // Bonus for JSON responses
    const jsonApi = apiHits.find((r) => isJsonContentType(r.contentType))
    if (jsonApi) {
      score += 3
      details.api_returns_json = true
    } else {
      recommendations.push(
        'API endpoints found but none return JSON. Agents work best with structured JSON responses.'
      )
    }
  } else {
    details.live_api_endpoints = []
    recommendations.push(
      'No live API endpoints detected at common paths (/api, /api/v1, /health). Expose a REST or GraphQL API for agent consumption.'
    )
  }

  return {
    category: 'mcp_api_endpoints',
    label: 'MCP & API Endpoints',
    score: Math.min(score, MAX),
    max_score: MAX,
    details,
    recommendations,
  }
}

async function auditAgentNativeOnboarding(
  base: string
): Promise<CategoryResult> {
  const MAX = 20
  let score = 0
  const details: Record<string, unknown> = {}
  const recommendations: string[] = []

  // 1. Programmatic signup / API key generation (up to 10 pts)
  const signupPaths = [
    '/api/signup',
    '/api/v1/signup',
    '/api/register',
    '/api/v1/register',
    '/api/auth/signup',
    '/api/auth/register',
    '/api/keys',
    '/api/v1/keys',
    '/api/api-keys',
  ]
  // We use GET to probe (not POST) — we just want to see if these routes exist
  const signupResults = await Promise.all(
    signupPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  // A route that returns 405 (Method Not Allowed) also counts — it means a POST endpoint exists
  const signupHits = signupResults.filter(
    (r) => r.found || r.status === 405 || r.status === 401 || r.status === 403
  )

  if (signupHits.length > 0) {
    score += 6
    details.signup_endpoints = signupHits.map((r) => ({
      url: r.url,
      status: r.status,
    }))
    // Bonus if there's a dedicated API keys endpoint
    const keysEndpoint = signupHits.find(
      (r) => r.url.includes('/keys') || r.url.includes('/api-keys')
    )
    if (keysEndpoint) {
      score += 4
      details.api_key_endpoint = keysEndpoint.url
    } else {
      recommendations.push(
        'Add a dedicated /api/keys or /api/api-keys endpoint for programmatic API key generation. This lets agents onboard without human intervention.'
      )
    }
  } else {
    details.signup_endpoints = []
    recommendations.push(
      'No programmatic signup endpoints found. Create /api/signup or /api/register that accepts JSON and returns an API key — enabling agents to self-onboard.'
    )
  }

  // 2. OAuth / Client Credentials flow (up to 5 pts)
  const oauthPaths = [
    '/.well-known/openid-configuration',
    '/.well-known/oauth-authorization-server',
    '/oauth/token',
    '/api/oauth/token',
    '/auth/token',
  ]
  const oauthResults = await Promise.all(
    oauthPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const oauthHits = oauthResults.filter(
    (r) => r.found || r.status === 405 || r.status === 401
  )

  if (oauthHits.length > 0) {
    score += 5
    details.oauth_endpoints = oauthHits.map((r) => ({
      url: r.url,
      status: r.status,
    }))
  } else {
    details.oauth_endpoints = []
    recommendations.push(
      'No OAuth/OIDC discovery found. Support OAuth 2.0 Client Credentials flow for server-to-server agent authentication.'
    )
  }

  // 3. Developer portal / docs for onboarding (up to 5 pts)
  const devPaths = [
    '/developers',
    '/developer',
    '/dev',
    '/api-docs',
    '/docs/api',
    '/docs/getting-started',
  ]
  const devResults = await Promise.all(
    devPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const devHits = devResults.filter((r) => r.found)

  if (devHits.length > 0) {
    score += 3
    details.developer_portal = devHits.map((r) => r.url)
    // Check for references to API keys in the page content
    const mentionsKeys = devHits.some((r) => {
      const text = typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
      return /api.?key|token|credentials|authenticate/i.test(text)
    })
    if (mentionsKeys) {
      score += 2
      details.docs_mention_auth = true
    }
  } else {
    details.developer_portal = []
    recommendations.push(
      'No developer portal or onboarding documentation found. Create a /developers page with clear instructions for programmatic integration.'
    )
  }

  return {
    category: 'agent_native_onboarding',
    label: 'Agent-Native Onboarding',
    score: Math.min(score, MAX),
    max_score: MAX,
    details,
    recommendations,
  }
}

async function auditStructuredPricing(
  base: string
): Promise<CategoryResult> {
  const MAX = 20
  let score = 0
  const details: Record<string, unknown> = {}
  const recommendations: string[] = []

  // 1. Machine-readable pricing (up to 10 pts)
  const pricingPaths = [
    '/api/pricing',
    '/api/v1/pricing',
    '/pricing.json',
    '/.well-known/pricing.json',
  ]
  const pricingResults = await Promise.all(
    pricingPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const pricingHit = pricingResults.find(
    (r) => r.found && isJsonContentType(r.contentType)
  )

  if (pricingHit) {
    score += 7
    details.pricing_api_url = pricingHit.url
    details.pricing_body = pricingHit.body
    // Bonus for per-call or per-unit structure
    const body = pricingHit.body as Record<string, unknown> | null
    if (
      body &&
      hasField(body, 'per_call', 'per_unit', 'price', 'plans', 'tiers', 'pricing')
    ) {
      score += 3
      details.pricing_structured = true
    } else {
      recommendations.push(
        'Pricing endpoint returns JSON but lacks clear per-call/per-unit pricing fields. Add explicit "price_per_call" or "plans" arrays.'
      )
    }
  } else {
    // Check if a human-readable pricing page exists
    const humanPricingPaths = ['/pricing', '/plans', '/prices']
    const humanResults = await Promise.all(
      humanPricingPaths.map((p) => probeEndpoint(`${base}${p}`))
    )
    const humanPricing = humanResults.find((r) => r.found)

    if (humanPricing) {
      score += 3
      details.human_pricing_url = humanPricing.url
      details.machine_readable_pricing = false
      recommendations.push(
        'Pricing page found but not machine-readable. Create /api/pricing returning JSON with plan names, prices, rate limits, and per-call costs.'
      )
    } else {
      details.pricing_found = false
      recommendations.push(
        'No pricing information found — neither machine-readable nor human-readable. Publish pricing at /pricing and /api/pricing so agents can evaluate cost before purchasing.'
      )
    }
  }

  // 2. Pricing in agent card (up to 5 pts)
  const agentCardResult = await probeEndpoint(`${base}/.well-known/agent.json`)
  if (agentCardResult.found && typeof agentCardResult.body === 'object') {
    const card = agentCardResult.body as Record<string, unknown>
    if (hasField(card, 'pricing', 'price', 'cost', 'rate', 'plans')) {
      score += 5
      details.agent_card_has_pricing = true
    } else {
      score += 1 // card exists but no pricing in it
      details.agent_card_has_pricing = false
      recommendations.push(
        'Agent card exists but lacks pricing information. Add a "pricing" field to your agent.json with per-call costs or plan references.'
      )
    }
  } else {
    details.agent_card_has_pricing = false
  }

  // 3. Free tier / trial availability (up to 5 pts)
  // Check for mentions of free tier in any pricing-related content
  const allBodies = [...pricingResults, ...([agentCardResult])].map((r) =>
    typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
  )
  const mentionsFree = allBodies.some((text) =>
    /free.?tier|free.?trial|freemium|sandbox|playground|\$0|free plan/i.test(text)
  )

  if (mentionsFree) {
    score += 5
    details.free_tier_available = true
  } else {
    details.free_tier_available = false
    recommendations.push(
      'No free tier or sandbox detected. Offer a free tier or sandbox mode so agents can test your service before committing to paid usage.'
    )
  }

  return {
    category: 'structured_pricing',
    label: 'Structured Pricing',
    score: Math.min(score, MAX),
    max_score: MAX,
    details,
    recommendations,
  }
}

async function auditAgentPaymentAcceptance(
  base: string
): Promise<CategoryResult> {
  const MAX = 20
  let score = 0
  const details: Record<string, unknown> = {}
  const recommendations: string[] = []

  // 1. Stripe integration signals (up to 8 pts)
  const stripePaths = [
    '/api/stripe',
    '/api/v1/stripe',
    '/api/payment',
    '/api/v1/payment',
    '/api/checkout',
    '/api/billing',
    '/api/subscribe',
  ]
  const stripeResults = await Promise.all(
    stripePaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const stripeHits = stripeResults.filter(
    (r) => r.found || r.status === 405 || r.status === 401 || r.status === 403
  )

  if (stripeHits.length > 0) {
    score += 5
    details.payment_endpoints = stripeHits.map((r) => ({
      url: r.url,
      status: r.status,
    }))
  }

  // Check the homepage / pricing page for Stripe JS references
  const homepageResult = await probeEndpoint(base)
  if (homepageResult.found && typeof homepageResult.body === 'string') {
    const html = homepageResult.body
    const hasStripe = /stripe|js\.stripe\.com/i.test(html)
    const hasCrypto = /crypto|ethereum|bitcoin|web3|wallet/i.test(html)
    const hasPayment = /payment|checkout|billing|subscribe/i.test(html)

    if (hasStripe) {
      score += 3
      details.stripe_detected_on_site = true
    }
    if (hasCrypto) {
      score += 2
      details.crypto_detected_on_site = true
    }
    if (hasPayment && !hasStripe && !hasCrypto) {
      score += 1
      details.generic_payment_references = true
    }
  }

  if (score === 0) {
    details.payment_endpoints = []
    recommendations.push(
      'No payment API endpoints or payment processor references detected. Integrate Stripe (or similar) with a programmatic checkout endpoint at /api/checkout so agents can pay for services autonomously.'
    )
  }

  // 2. Programmatic payment flow — can an agent pay without a browser? (up to 6 pts)
  const programmaticPaths = [
    '/api/checkout/session',
    '/api/v1/checkout',
    '/api/payment/intent',
    '/api/v1/payment/create',
    '/api/billing/usage',
  ]
  const progResults = await Promise.all(
    programmaticPaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const progHits = progResults.filter(
    (r) => r.found || r.status === 405 || r.status === 401
  )

  if (progHits.length > 0) {
    score += 6
    details.programmatic_payment_endpoints = progHits.map((r) => ({
      url: r.url,
      status: r.status,
    }))
  } else {
    details.programmatic_payment_endpoints = []
    recommendations.push(
      'No programmatic payment creation endpoints found. Build API routes that let an agent create a payment intent or checkout session via JSON — no browser redirect required.'
    )
  }

  // 3. Usage-based billing / metering (up to 6 pts)
  const usagePaths = [
    '/api/usage',
    '/api/v1/usage',
    '/api/billing/usage',
    '/api/metering',
  ]
  const usageResults = await Promise.all(
    usagePaths.map((p) => probeEndpoint(`${base}${p}`))
  )
  const usageHits = usageResults.filter(
    (r) => r.found || r.status === 401 || r.status === 403
  )

  if (usageHits.length > 0) {
    score += 6
    details.usage_billing_endpoints = usageHits.map((r) => ({
      url: r.url,
      status: r.status,
    }))
  } else {
    details.usage_billing_endpoints = []
    recommendations.push(
      'No usage-based billing or metering endpoints found. Agents prefer pay-per-call pricing — expose /api/usage so agents can track their consumption programmatically.'
    )
  }

  return {
    category: 'agent_payment_acceptance',
    label: 'Agent Payment Acceptance',
    score: Math.min(score, MAX),
    max_score: MAX,
    details,
    recommendations,
  }
}

// ---------------------------------------------------------------------------
// Main Audit Orchestrator
// ---------------------------------------------------------------------------

export async function runAudit(rawUrl: string): Promise<AuditScorecard> {
  const base = normalizeUrl(rawUrl)

  // Run all 5 category audits in parallel
  const [profile, endpoints, onboarding, pricing, payment] = await Promise.all([
    auditMachineReadableProfile(base),
    auditMcpApiEndpoints(base),
    auditAgentNativeOnboarding(base),
    auditStructuredPricing(base),
    auditAgentPaymentAcceptance(base),
  ])

  const categories = [profile, endpoints, onboarding, pricing, payment]
  const totalScore = categories.reduce((sum, c) => sum + c.score, 0)
  const tier = tierFromScore(totalScore)

  // Build top-level next steps: pick the highest-impact recommendations
  const nextSteps: string[] = []
  // Sort categories by score ascending — lowest-scoring categories are the biggest opportunities
  const sorted = [...categories].sort((a, b) => a.score - b.score)
  for (const cat of sorted) {
    if (cat.recommendations.length > 0 && nextSteps.length < 5) {
      nextSteps.push(
        `[${cat.label}] ${cat.recommendations[0]}`
      )
    }
  }

  // Try to extract a business name from the domain
  const domain = base.replace(/^https?:\/\//, '').replace(/^www\./, '')
  let businessName = domain.split('.')[0] ?? domain
  // Capitalize first letter
  businessName = businessName.charAt(0).toUpperCase() + businessName.slice(1)

  return {
    business_name: businessName,
    domain,
    total_score: totalScore,
    tier,
    categories,
    audited_at: new Date().toISOString(),
    next_steps: nextSteps,
  }
}

// Re-export helper for use in API routes
export { tierFromScore, normalizeUrl }
