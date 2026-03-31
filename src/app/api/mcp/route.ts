import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { isStripeConfigured, transferFunds } from '@/lib/stripe'
import { runScan } from '@/lib/scanner'
import { listGatewayServices, callService, getServiceActions } from '@/lib/gateway/proxy'
import { logError } from '@/lib/error-logger'
import type { ServiceAction } from '@/lib/gateway/types'

// Payment tools that require authentication
const AUTH_REQUIRED_TOOLS = new Set(['initiate_payment', 'check_wallet_balance', 'call_service'])

// =====================================================================
// MCP Server — JSON-RPC 2.0 compatible
// =====================================================================
// Agents can POST JSON-RPC requests to /api/mcp to interact with
// the AgentHermes network: discover businesses, check wallets,
// initiate payments, etc.
// =====================================================================

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const SERVER_INFO = {
  name: 'agenthermes',
  version: '0.1.0',
  description:
    'AgentHermes — AI Business Network. Discover, audit, transact, and call services through the gateway with one API key.',
}

// --- Tool definitions ---------------------------------------------------

interface ToolDef {
  name: string
  description: string
  inputSchema: Record<string, unknown>
}

const TOOLS: ToolDef[] = [
  {
    name: 'discover_businesses',
    description:
      'Search businesses by capability, vertical, tier, or price range.',
    inputSchema: {
      type: 'object',
      properties: {
        q: { type: 'string', description: 'Free-text search query' },
        vertical: { type: 'string', description: 'Filter by vertical (e.g. sales, voice-ai, healthcare)' },
        capability: { type: 'string', description: 'Filter by capability (e.g. lead-management, voice-cloning)' },
        tier: {
          type: 'string',
          enum: ['bronze', 'silver', 'gold', 'platinum'],
          description: 'Minimum audit tier',
        },
        max_price: { type: 'number', description: 'Maximum price per API call in USD' },
        limit: { type: 'number', description: 'Max results (default 20, max 100)' },
      },
    },
  },
  {
    name: 'get_business_profile',
    description: 'Get full business profile by slug.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Business slug (e.g. "dropclose")' },
      },
      required: ['slug'],
    },
  },
  {
    name: 'get_business_manifest',
    description:
      'Get machine-readable manifest for a business (services, pricing, auth, readiness).',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Business slug' },
      },
      required: ['slug'],
    },
  },
  {
    name: 'run_audit',
    description:
      'Trigger an agent-readiness audit on a URL. Returns a scorecard.',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'The URL to audit' },
        business_id: { type: 'string', description: 'Optional: link audit results to a business' },
      },
      required: ['url'],
    },
  },
  {
    name: 'check_wallet_balance',
    description: "Check a business's wallet balance.",
    inputSchema: {
      type: 'object',
      properties: {
        business_id: { type: 'string', description: 'Business ID' },
      },
      required: ['business_id'],
    },
  },
  {
    name: 'initiate_payment',
    description:
      'Start a wallet-to-wallet payment between two businesses.',
    inputSchema: {
      type: 'object',
      properties: {
        from_business_id: { type: 'string', description: 'Paying business ID' },
        to_business_id: { type: 'string', description: 'Receiving business ID' },
        amount: { type: 'number', description: 'Amount in USD' },
        service_description: { type: 'string', description: 'What the payment is for' },
        agent_id: { type: 'string', description: 'Agent initiating the payment' },
        task_context: { type: 'string', description: 'Context about the task' },
      },
      required: ['from_business_id', 'to_business_id', 'amount', 'service_description'],
    },
  },
  {
    name: 'verify_hermes_json',
    description:
      'Verify a .well-known/agent-hermes.json file — checks HMAC signature, score accuracy, and certification status.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain to fetch and verify .well-known/agent-hermes.json from',
        },
        hermes_json: {
          type: 'object',
          description: 'Alternative: provide the hermes JSON content directly instead of fetching from domain',
        },
      },
    },
  },
  {
    name: 'list_gateway_services',
    description:
      'List all services available through the AgentHermes gateway. One API key gives you access to all connected business APIs.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Filter by category (ai, video, social, database, etc.)' },
        max_cost: { type: 'number', description: 'Maximum cost per call in USD' },
      },
    },
  },
  {
    name: 'call_service',
    description:
      'Execute an API call through the AgentHermes gateway. Requires a wallet with sufficient balance. Cost is automatically deducted.',
    inputSchema: {
      type: 'object',
      properties: {
        service_id: { type: 'string', description: 'ID of the gateway service to call' },
        action: { type: 'string', description: 'Name of the action to execute' },
        params: { type: 'object', description: 'Parameters to pass to the API' },
        wallet_id: { type: 'string', description: 'Your AgentHermes wallet ID' },
      },
      required: ['service_id', 'action', 'wallet_id'],
    },
  },
  {
    name: 'get_service_actions',
    description:
      'Get available actions for a specific gateway service, including costs and parameter schemas.',
    inputSchema: {
      type: 'object',
      properties: {
        service_id: { type: 'string', description: 'ID of the gateway service' },
      },
      required: ['service_id'],
    },
  },
]

// --- Dynamic gateway tool generation --------------------------------------
// When a new service connects to the gateway, its actions automatically
// appear as MCP tools without code changes.

interface GatewayToolMapping {
  service_id: string
  service_name: string
  action_name: string
}

let gatewayToolsCache: {
  tools: ToolDef[]
  mappings: Map<string, GatewayToolMapping>
  cachedAt: number
} | null = null

const GATEWAY_CACHE_TTL = 60_000 // 60 seconds

function sanitizeToolName(serviceName: string, actionName: string): string {
  return `gateway_${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${actionName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`
}

async function getGatewayTools(): Promise<{
  tools: ToolDef[]
  mappings: Map<string, GatewayToolMapping>
}> {
  // Return cached if still fresh
  if (gatewayToolsCache && Date.now() - gatewayToolsCache.cachedAt < GATEWAY_CACHE_TTL) {
    return { tools: gatewayToolsCache.tools, mappings: gatewayToolsCache.mappings }
  }

  const supabase = getServiceClient()
  const { data: gatewayServices, error } = await supabase
    .from('gateway_services')
    .select('id, name, description, actions, cost_per_call, our_margin, category')
    .eq('status', 'active')

  if (error) {
    console.error('[mcp] Failed to fetch gateway services for dynamic tools:', error.message)
    // Return empty on error — static tools still work
    return { tools: [], mappings: new Map() }
  }

  const tools: ToolDef[] = []
  const mappings = new Map<string, GatewayToolMapping>()

  for (const service of (gatewayServices || []) as Array<Record<string, unknown>>) {
    const actions = (service.actions as ServiceAction[]) || []
    const baseCost = service.cost_per_call as number
    const margin = service.our_margin as number
    const serviceName = service.name as string

    for (const action of actions) {
      const toolName = sanitizeToolName(serviceName, action.name)
      const actionCost = action.cost_override ?? baseCost
      const totalCost = actionCost * (1 + margin)

      // Build input schema from action's params_schema
      const properties: Record<string, unknown> = {
        wallet_id: { type: 'string', description: 'Your AgentHermes wallet ID for billing' },
      }
      const required: string[] = ['wallet_id']

      if (action.params_schema) {
        const schema = action.params_schema as Record<string, unknown>
        if (schema.properties && typeof schema.properties === 'object') {
          Object.assign(properties, schema.properties)
        }
        if (Array.isArray(schema.required)) {
          for (const r of schema.required) {
            if (typeof r === 'string' && !required.includes(r)) {
              required.push(r)
            }
          }
        }
      }

      tools.push({
        name: toolName,
        description: `[Gateway] ${serviceName}: ${action.description}. Cost: $${totalCost.toFixed(4)}/call`,
        inputSchema: {
          type: 'object',
          properties,
          required,
        },
      })

      mappings.set(toolName, {
        service_id: service.id as string,
        service_name: serviceName,
        action_name: action.name,
      })
    }
  }

  // Update cache
  gatewayToolsCache = { tools, mappings, cachedAt: Date.now() }

  return { tools, mappings }
}

// --- Resource definitions -------------------------------------------------

interface ResourceDef {
  uri: string
  name: string
  description: string
  mimeType: string
}

const RESOURCES: ResourceDef[] = [
  {
    uri: 'agenthermes://businesses',
    name: 'All Businesses',
    description: 'All businesses registered in the AgentHermes network',
    mimeType: 'application/json',
  },
  {
    uri: 'agenthermes://business/{slug}',
    name: 'Business Profile',
    description: 'Individual business profile by slug',
    mimeType: 'application/json',
  },
  {
    uri: 'agenthermes://audits/{domain}',
    name: 'Audit Results',
    description: 'Agent Readiness Score audit results for a domain',
    mimeType: 'application/json',
  },
  {
    uri: 'agenthermes://services',
    name: 'All Services',
    description: 'All active services across businesses in the network',
    mimeType: 'application/json',
  },
]

async function readResource(uri: string): Promise<{ uri: string; mimeType: string; text: string }> {
  const supabase = getServiceClient()

  // agenthermes://businesses
  if (uri === 'agenthermes://businesses') {
    const { data, error } = await supabase
      .from('businesses')
      .select('id, name, slug, domain, description, vertical, capabilities, audit_score, audit_tier, trust_score')
      .order('audit_score', { ascending: false })
      .limit(50)

    if (error) throw new Error(error.message)
    return { uri, mimeType: 'application/json', text: JSON.stringify(data || [], null, 2) }
  }

  // agenthermes://business/{slug}
  const businessMatch = uri.match(/^agenthermes:\/\/business\/([a-z0-9-]+)$/)
  if (businessMatch) {
    const slug = businessMatch[1]
    const { data, error } = await supabase
      .from('businesses')
      .select('id, name, slug, domain, description, logo_url, audit_score, audit_tier, trust_score, vertical, capabilities, mcp_endpoints, pricing_visible, agent_onboarding, created_at, updated_at, services(*)')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') throw new Error(`Business "${slug}" not found`)
      throw new Error('Failed to fetch business')
    }
    return { uri, mimeType: 'application/json', text: JSON.stringify(data, null, 2) }
  }

  // agenthermes://audits/{domain}
  const auditMatch = uri.match(/^agenthermes:\/\/audits\/(.+)$/)
  if (auditMatch) {
    const domain = auditMatch[1]

    // Look up business by domain first, then query audit_results by business_id
    const { data: bizData, error: bizError } = await supabase
      .from('businesses')
      .select('id')
      .eq('domain', domain)
      .single()

    if (bizError) {
      if (bizError.code === 'PGRST116') throw new Error(`No business found for domain "${domain}"`)
      throw new Error(bizError.message)
    }

    const { data, error } = await supabase
      .from('audit_results')
      .select('*')
      .eq('business_id', (bizData as any).id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw new Error(error.message)
    return { uri, mimeType: 'application/json', text: JSON.stringify(data || [], null, 2) }
  }

  // agenthermes://services
  if (uri === 'agenthermes://services') {
    const { data, error } = await supabase
      .from('services')
      .select('id, business_id, name, description, pricing_model, price_per_call, mcp_endpoint, auth_type, uptime_pct, avg_response_ms, status')
      .eq('status', 'active')
      .order('name')
      .limit(100)

    if (error) throw new Error(error.message)
    return { uri, mimeType: 'application/json', text: JSON.stringify(data || [], null, 2) }
  }

  throw new Error(`Unknown resource URI: "${uri}"`)
}

// --- Prompt definitions ---------------------------------------------------

interface PromptArgument {
  name: string
  description: string
  required: boolean
}

interface PromptDef {
  name: string
  description: string
  arguments: PromptArgument[]
}

const PROMPTS: PromptDef[] = [
  {
    name: 'audit-url',
    description: 'Run an Agent Readiness Score audit on a business URL',
    arguments: [
      { name: 'url', description: 'The URL to audit', required: true },
    ],
  },
  {
    name: 'find-service',
    description: 'Find a business service by capability or description',
    arguments: [
      { name: 'query', description: 'What kind of service you need', required: true },
      { name: 'max_price', description: 'Maximum price per call in USD', required: false },
    ],
  },
  {
    name: 'check-readiness',
    description: 'Check if a specific business is agent-ready',
    arguments: [
      { name: 'domain', description: 'Business domain to check', required: true },
    ],
  },
]

function getPromptMessages(
  name: string,
  args: Record<string, string>
): Array<{ role: string; content: { type: string; text: string } }> {
  switch (name) {
    case 'audit-url': {
      if (!args.url) throw new Error('Missing required argument: url')
      return [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Audit the agent readiness of ${args.url} and provide the score breakdown. Include checks for API availability, documentation quality, authentication support, uptime, and response times.`,
          },
        },
      ]
    }

    case 'find-service': {
      if (!args.query) throw new Error('Missing required argument: query')
      let text = `Find businesses on AgentHermes that offer ${args.query} services.`
      if (args.max_price) {
        text += ` Only show options under $${args.max_price} per call.`
      }
      text += ' Include pricing, uptime stats, and agent readiness tier for each result.'
      return [
        {
          role: 'user',
          content: { type: 'text', text },
        },
      ]
    }

    case 'check-readiness': {
      if (!args.domain) throw new Error('Missing required argument: domain')
      return [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Check the Agent Readiness Score for ${args.domain} and explain what they need to improve. Break down the score by category and provide specific, actionable recommendations.`,
          },
        },
      ]
    }

    default:
      throw new Error(`Unknown prompt: "${name}"`)
  }
}

// --- Auth helper for MCP tool calls --------------------------------------

function checkToolAuth(request: NextRequest): string | null {
  const apiKey = process.env.AGENTHERMES_API_KEY

  // If no API key is configured, allow all requests (dev mode)
  if (!apiKey) {
    return null
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return 'Authorization header required. Send a Bearer token to use payment tools.'
  }

  const token = authHeader.replace(/^Bearer\s+/i, '')
  if (token !== apiKey) {
    return 'Invalid API key. Access denied for payment tools.'
  }

  return null // Auth passed
}

// --- Tool implementations -----------------------------------------------

async function executeDiscover(params: Record<string, unknown>) {
  const supabase = getServiceClient()

  const limit = Math.min(Number(params.limit) || 20, 100)

  let query = supabase
    .from('businesses')
    .select('id, name, slug, domain, description, vertical, capabilities, audit_score, audit_tier, trust_score, mcp_endpoints')

  if (params.q && typeof params.q === 'string') {
    const safeQ = `%${params.q.replace(/[^a-zA-Z0-9\s-]/g, '')}%`
    query = query.or(
      `name.ilike.${safeQ},description.ilike.${safeQ},domain.ilike.${safeQ}`
    )
  }
  if (params.vertical && typeof params.vertical === 'string') {
    query = query.eq('vertical', params.vertical)
  }
  if (params.capability && typeof params.capability === 'string') {
    query = query.contains('capabilities', [params.capability])
  }
  if (params.tier && typeof params.tier === 'string') {
    const tierMinScores: Record<string, number> = { bronze: 40, silver: 60, gold: 75, platinum: 90 }
    if (tierMinScores[params.tier]) {
      query = query.gte('audit_score', tierMinScores[params.tier])
    }
  }

  query = query.order('audit_score', { ascending: false }).limit(limit)

  const { data, error } = await query

  if (error) throw new Error(error.message)

  let results = (data || []) as Array<Record<string, unknown>>

  // Post-filter: max_price
  if (params.max_price && typeof params.max_price === 'number') {
    const maxPrice = params.max_price
    // Need to fetch services for these businesses
    const bizIds = results.map((b) => b.id)
    if (bizIds.length > 0) {
      const { data: services } = await supabase
        .from('services')
        .select('business_id, price_per_call')
        .in('business_id', bizIds)

      const svcList = (services || []) as Array<Record<string, unknown>>
      const affordableBizIds = new Set<string>()
      for (const svc of svcList) {
        if ((svc.price_per_call as number) <= maxPrice) {
          affordableBizIds.add(svc.business_id as string)
        }
      }
      // Keep businesses with no services (unknown pricing) or affordable ones
      results = results.filter(
        (b) =>
          affordableBizIds.has(b.id as string) ||
          !svcList.some((s) => s.business_id === b.id)
      )
    }
  }

  return { businesses: results, count: results.length }
}

async function executeGetProfile(params: Record<string, unknown>) {
  const slug = params.slug as string
  if (!slug) throw new Error('slug is required')
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) throw new Error('Invalid slug format')

  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('businesses')
    .select('id, name, slug, domain, description, logo_url, audit_score, audit_tier, trust_score, vertical, capabilities, mcp_endpoints, pricing_visible, agent_onboarding, a2a_agent_card, created_at, updated_at, services(*), audit_results(*)')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') throw new Error(`Business "${slug}" not found`)
    throw new Error('Failed to fetch business profile')
  }

  return data
}

async function executeGetManifest(params: Record<string, unknown>) {
  const slug = params.slug as string
  if (!slug) throw new Error('slug is required')
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) throw new Error('Invalid slug format')

  const supabase = getServiceClient()

  const { data: bizRaw, error } = await supabase
    .from('businesses')
    .select('id, name, slug, domain, description, vertical, capabilities, audit_score, audit_tier, a2a_agent_card, mcp_endpoints, stripe_connect_id')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') throw new Error(`Business "${slug}" not found`)
    throw new Error('Failed to fetch business manifest')
  }

  const business = bizRaw as Record<string, unknown>

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('business_id', business.id as string)
    .eq('status', 'active')

  const { data: walletRaw } = await supabase
    .from('agent_wallets')
    .select('status')
    .eq('business_id', business.id as string)
    .maybeSingle()

  const wallet = walletRaw as Record<string, unknown> | null

  return {
    schema_version: '1.0',
    business: {
      name: business.name,
      slug: business.slug,
      domain: business.domain,
      description: business.description,
      vertical: business.vertical,
      capabilities: business.capabilities || [],
    },
    agent_readiness: {
      score: business.audit_score ?? 0,
      tier: business.audit_tier ?? 'unaudited',
    },
    a2a_agent_card: business.a2a_agent_card,
    mcp_endpoints: business.mcp_endpoints || [],
    services: (services || []).map((s: Record<string, unknown>) => ({
      name: s.name,
      description: s.description,
      pricing_model: s.pricing_model,
      price_per_call: s.price_per_call,
      endpoint: s.mcp_endpoint,
      auth_type: s.auth_type,
      uptime_pct: s.uptime_pct,
      avg_response_ms: s.avg_response_ms,
    })),
    payment: {
      accepts_agent_payments: !!business.stripe_connect_id,
      wallet_status: wallet?.status ?? null,
    },
  }
}

async function executeRunAudit(params: Record<string, unknown>) {
  const url = params.url as string
  if (!url) throw new Error('url is required')

  const vertical = typeof params.vertical === 'string' ? params.vertical : null
  const scanResult = await runScan(url, { vertical })

  return {
    url,
    business_id: params.business_id || null,
    hermes_id: scanResult.hermes_id,
    domain: scanResult.domain,
    total_score: scanResult.total_score,
    tier: scanResult.tier,
    dimensions: scanResult.dimensions,
    caps_applied: scanResult.caps_applied,
    scanned_at: scanResult.scanned_at,
    next_steps: scanResult.next_steps,
    vertical_applied: scanResult.vertical_applied,
  }
}

async function executeCheckBalance(params: Record<string, unknown>) {
  const businessId = params.business_id as string
  if (!businessId) throw new Error('business_id is required')

  const supabase = getServiceClient()

  const { data: walletData, error } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('business_id', businessId)
    .maybeSingle()

  if (error) throw new Error(error.message)

  const wallet = walletData as Record<string, unknown> | null

  if (!wallet) {
    return {
      business_id: businessId,
      has_wallet: false,
      balance: 0,
      status: null,
      stripe_connected: false,
    }
  }

  return {
    business_id: businessId,
    has_wallet: true,
    wallet_id: wallet.id,
    balance: wallet.balance,
    status: wallet.status,
    stripe_connected: !!wallet.stripe_connect_id,
    auto_reload_threshold: wallet.auto_reload_threshold,
    auto_reload_amount: wallet.auto_reload_amount,
  }
}

async function executeInitiatePayment(params: Record<string, unknown>) {
  const fromBizId = params.from_business_id as string
  const toBizId = params.to_business_id as string
  const amount = params.amount as number
  const description = params.service_description as string

  if (!fromBizId || !toBizId || !amount || !description) {
    throw new Error(
      'from_business_id, to_business_id, amount, and service_description are all required'
    )
  }

  if (amount <= 0) throw new Error('amount must be positive')
  if (fromBizId === toBizId) throw new Error('Cannot pay yourself')

  const supabase = getServiceClient()

  const { data: fromWalletRaw } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('business_id', fromBizId)
    .maybeSingle()

  const fromWallet = fromWalletRaw as Record<string, unknown> | null
  if (!fromWallet) throw new Error('Source business has no wallet')

  const { data: toWalletRaw } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('business_id', toBizId)
    .maybeSingle()

  const toWallet = toWalletRaw as Record<string, unknown> | null
  if (!toWallet) throw new Error('Destination business has no wallet')

  const transaction = await transferFunds(fromWallet.id as string, toWallet.id as string, amount, description, {
    agent_id: params.agent_id as string | undefined,
    task_context: params.task_context as string | undefined,
  })

  return {
    transaction_id: transaction.id,
    status: transaction.status,
    amount,
    from_business_id: fromBizId,
    to_business_id: toBizId,
    stripe_transfer_id: transaction.stripe_transfer_id,
    stripe_configured: isStripeConfigured(),
  }
}

async function executeVerifyHermesJson(params: Record<string, unknown>) {
  const domain = params.domain as string | undefined
  const hermesJson = params.hermes_json as Record<string, unknown> | undefined

  if (!domain && !hermesJson) {
    throw new Error('Provide either "domain" or "hermes_json"')
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agenthermes.ai'
  const response = await fetch(`${baseUrl}/api/v1/hermes-json/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, hermes_json: hermesJson }),
  })

  const result = await response.json()
  return result
}

async function executeListGatewayServices(params: Record<string, unknown>) {
  return listGatewayServices({
    category: params.category as string | undefined,
    max_cost: params.max_cost as number | undefined,
  })
}

async function executeCallService(params: Record<string, unknown>) {
  return callService({
    service_id: params.service_id as string,
    action: params.action as string,
    params: params.params as Record<string, unknown> | undefined,
    wallet_id: params.wallet_id as string,
  })
}

async function executeGetServiceActions(params: Record<string, unknown>) {
  return getServiceActions({
    service_id: params.service_id as string,
  })
}

// Tool dispatch map
const TOOL_HANDLERS: Record<
  string,
  (params: Record<string, unknown>) => Promise<unknown>
> = {
  discover_businesses: executeDiscover,
  get_business_profile: executeGetProfile,
  get_business_manifest: executeGetManifest,
  run_audit: executeRunAudit,
  check_wallet_balance: executeCheckBalance,
  initiate_payment: executeInitiatePayment,
  verify_hermes_json: executeVerifyHermesJson,
  list_gateway_services: executeListGatewayServices,
  call_service: executeCallService,
  get_service_actions: executeGetServiceActions,
}

// --- JSON-RPC types -----------------------------------------------------

interface JsonRpcRequest {
  jsonrpc: '2.0'
  id?: string | number | null
  method: string
  params?: Record<string, unknown>
}

interface JsonRpcResponse {
  jsonrpc: '2.0'
  id: string | number | null
  result?: unknown
  error?: { code: number; message: string; data?: unknown }
}

function jsonRpcError(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown
): JsonRpcResponse {
  return { jsonrpc: '2.0', id, error: { code, message, data } }
}

function jsonRpcSuccess(
  id: string | number | null,
  result: unknown
): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result }
}

// --- Main handler -------------------------------------------------------

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json(
      jsonRpcError(null, -32700, 'Parse error — invalid JSON'),
      { status: 400, headers: corsHeaders }
    )
  }

  // Handle batch requests (array body)
  if (Array.isArray(rawBody)) {
    return NextResponse.json(
      jsonRpcError(null, -32600, 'Batch requests are not supported'),
      { status: 400, headers: corsHeaders }
    )
  }

  const body = rawBody as JsonRpcRequest

  if (!body.jsonrpc || body.jsonrpc !== '2.0' || !body.method) {
    return NextResponse.json(
      jsonRpcError(body?.id ?? null, -32600, 'Invalid request — must be JSON-RPC 2.0'),
      { status: 400, headers: corsHeaders }
    )
  }

  const { method, params, id } = body
  const requestId = id ?? null

  try {
    switch (method) {
      // ---------------------------------------------------------------
      // initialize — return server info and capabilities
      // ---------------------------------------------------------------
      case 'initialize': {
        return NextResponse.json(
          jsonRpcSuccess(requestId, {
            protocolVersion: '2024-11-05',
            serverInfo: SERVER_INFO,
            capabilities: {
              tools: {},
              resources: { listChanged: false },
              prompts: { listChanged: false },
            },
          }),
          { headers: corsHeaders }
        )
      }

      // ---------------------------------------------------------------
      // notifications/initialized — client acknowledgement, no-op
      // ---------------------------------------------------------------
      case 'notifications/initialized': {
        return NextResponse.json(
          jsonRpcSuccess(requestId, {}),
          { headers: corsHeaders }
        )
      }

      // ---------------------------------------------------------------
      // ping — return pong
      // ---------------------------------------------------------------
      case 'ping': {
        return NextResponse.json(
          jsonRpcSuccess(requestId, { status: 'pong' }),
          { headers: corsHeaders }
        )
      }

      // ---------------------------------------------------------------
      // tools/list — return available tools (static + dynamic gateway)
      // ---------------------------------------------------------------
      case 'tools/list': {
        const { tools: gatewayTools } = await getGatewayTools()
        return NextResponse.json(
          jsonRpcSuccess(requestId, {
            tools: [...TOOLS, ...gatewayTools],
          }),
          { headers: corsHeaders }
        )
      }

      // ---------------------------------------------------------------
      // tools/call — execute a tool (static or dynamic gateway)
      // ---------------------------------------------------------------
      case 'tools/call': {
        const toolName = (params?.name as string) || ''
        const toolArgs = (params?.arguments as Record<string, unknown>) || {}

        // --- Dynamic gateway tool dispatch ---
        if (toolName.startsWith('gateway_')) {
          // Auth check — gateway calls touch wallets
          const authError = checkToolAuth(request)
          if (authError) {
            return NextResponse.json(
              jsonRpcSuccess(requestId, {
                content: [{ type: 'text', text: authError }],
                isError: true,
              }),
              { headers: corsHeaders }
            )
          }

          const { mappings } = await getGatewayTools()
          const mapping = mappings.get(toolName)
          if (!mapping) {
            return NextResponse.json(
              jsonRpcError(requestId, -32602, `Unknown gateway tool: "${toolName}". The service may have been deactivated.`),
              { headers: corsHeaders }
            )
          }

          const walletId = toolArgs.wallet_id as string
          if (!walletId) {
            return NextResponse.json(
              jsonRpcSuccess(requestId, {
                content: [{ type: 'text', text: 'wallet_id is required for gateway calls' }],
                isError: true,
              }),
              { headers: corsHeaders }
            )
          }

          // Build params: everything except wallet_id goes to the service
          const serviceParams: Record<string, unknown> = {}
          for (const [key, value] of Object.entries(toolArgs)) {
            if (key !== 'wallet_id') {
              serviceParams[key] = value
            }
          }

          try {
            const result = await callService({
              service_id: mapping.service_id,
              action: mapping.action_name,
              params: Object.keys(serviceParams).length > 0 ? serviceParams : undefined,
              wallet_id: walletId,
            })
            return NextResponse.json(
              jsonRpcSuccess(requestId, {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                  },
                ],
              }),
              { headers: corsHeaders }
            )
          } catch (toolErr) {
            const message =
              toolErr instanceof Error ? toolErr.message : 'Gateway call failed'
            return NextResponse.json(
              jsonRpcSuccess(requestId, {
                content: [{ type: 'text', text: message }],
                isError: true,
              }),
              { headers: corsHeaders }
            )
          }
        }

        // --- Static tool dispatch ---
        const handler = TOOL_HANDLERS[toolName]
        if (!handler) {
          const { tools: gatewayTools } = await getGatewayTools()
          return NextResponse.json(
            jsonRpcError(requestId, -32602, `Unknown tool: "${toolName}"`, {
              available_tools: [...TOOLS.map((t) => t.name), ...gatewayTools.map((t) => t.name)],
            }),
            { headers: corsHeaders }
          )
        }

        // Auth check for payment-related tools
        if (AUTH_REQUIRED_TOOLS.has(toolName)) {
          const authError = checkToolAuth(request)
          if (authError) {
            return NextResponse.json(
              jsonRpcSuccess(requestId, {
                content: [{ type: 'text', text: authError }],
                isError: true,
              }),
              { headers: corsHeaders }
            )
          }
        }

        try {
          const result = await handler(toolArgs)
          return NextResponse.json(
            jsonRpcSuccess(requestId, {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            }),
            { headers: corsHeaders }
          )
        } catch (toolErr) {
          const message =
            toolErr instanceof Error ? toolErr.message : 'Tool execution failed'
          return NextResponse.json(
            jsonRpcSuccess(requestId, {
              content: [{ type: 'text', text: message }],
              isError: true,
            }),
            { headers: corsHeaders }
          )
        }
      }

      // ---------------------------------------------------------------
      // resources/list — return available resources
      // ---------------------------------------------------------------
      case 'resources/list': {
        return NextResponse.json(
          jsonRpcSuccess(requestId, {
            resources: RESOURCES,
          }),
          { headers: corsHeaders }
        )
      }

      // ---------------------------------------------------------------
      // resources/read — read a resource by URI
      // ---------------------------------------------------------------
      case 'resources/read': {
        const uri = params?.uri as string
        if (!uri) {
          return NextResponse.json(
            jsonRpcError(requestId, -32602, 'Missing required parameter: uri'),
            { headers: corsHeaders }
          )
        }

        try {
          const resource = await readResource(uri)
          return NextResponse.json(
            jsonRpcSuccess(requestId, {
              contents: [resource],
            }),
            { headers: corsHeaders }
          )
        } catch (resErr) {
          const message =
            resErr instanceof Error ? resErr.message : 'Resource read failed'
          return NextResponse.json(
            jsonRpcError(requestId, -32602, message),
            { headers: corsHeaders }
          )
        }
      }

      // ---------------------------------------------------------------
      // prompts/list — return available prompt templates
      // ---------------------------------------------------------------
      case 'prompts/list': {
        return NextResponse.json(
          jsonRpcSuccess(requestId, {
            prompts: PROMPTS,
          }),
          { headers: corsHeaders }
        )
      }

      // ---------------------------------------------------------------
      // prompts/get — return a prompt with arguments filled in
      // ---------------------------------------------------------------
      case 'prompts/get': {
        const promptName = params?.name as string
        if (!promptName) {
          return NextResponse.json(
            jsonRpcError(requestId, -32602, 'Missing required parameter: name'),
            { headers: corsHeaders }
          )
        }

        const promptArgs = (params?.arguments as Record<string, string>) || {}

        try {
          const messages = getPromptMessages(promptName, promptArgs)
          return NextResponse.json(
            jsonRpcSuccess(requestId, {
              description: PROMPTS.find((p) => p.name === promptName)?.description ?? '',
              messages,
            }),
            { headers: corsHeaders }
          )
        } catch (promptErr) {
          const message =
            promptErr instanceof Error ? promptErr.message : 'Prompt retrieval failed'
          return NextResponse.json(
            jsonRpcError(requestId, -32602, message),
            { headers: corsHeaders }
          )
        }
      }

      default:
        return NextResponse.json(
          jsonRpcError(requestId, -32601, `Method not found: "${method}"`),
          { status: 404, headers: corsHeaders }
        )
    }
  } catch (err) {
    console.error('[mcp] Internal error:', err instanceof Error ? err.message : err)

    // Log to error_log table (fire-and-forget)
    logError('/api/mcp', 'POST', err instanceof Error ? err : new Error(String(err)), request.headers.get('x-request-id') || undefined)

    return NextResponse.json(
      jsonRpcError(requestId, -32603, 'Internal server error'),
      { status: 500, headers: corsHeaders }
    )
  }
}

// GET handler for discovery — agents can GET /api/mcp to see the server info
export async function GET() {
  let gatewayTools: ToolDef[] = []
  try {
    const result = await getGatewayTools()
    gatewayTools = result.tools
  } catch {
    // Non-critical — static tools still visible
  }

  const allTools = [...TOOLS, ...gatewayTools]

  return NextResponse.json(
    {
      ...SERVER_INFO,
      protocol: 'JSON-RPC 2.0 (MCP)',
      endpoint: '/api/mcp',
      method: 'POST',
      tools: allTools.map((t) => ({ name: t.name, description: t.description })),
      static_tool_count: TOOLS.length,
      gateway_tool_count: gatewayTools.length,
    },
    { headers: corsHeaders }
  )
}
