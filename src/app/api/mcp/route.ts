import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { isStripeConfigured, transferFunds } from '@/lib/stripe'

// =====================================================================
// MCP Server — JSON-RPC 2.0 compatible
// =====================================================================
// Agents can POST JSON-RPC requests to /api/mcp to interact with
// the AgentHermes network: discover businesses, check wallets,
// initiate payments, etc.
// =====================================================================

const SERVER_INFO = {
  name: 'agenthermes',
  version: '0.1.0',
  description:
    'AgentHermes — AI Business Network. Discover, audit, and transact with agent-ready businesses.',
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
]

// --- Tool implementations -----------------------------------------------

async function executeDiscover(params: Record<string, unknown>) {
  const supabase = getServiceClient()

  const limit = Math.min(Number(params.limit) || 20, 100)

  let query = supabase
    .from('businesses')
    .select('id, name, slug, domain, description, vertical, capabilities, audit_score, audit_tier, trust_score, mcp_endpoints')

  if (params.q && typeof params.q === 'string') {
    query = query.or(
      `name.ilike.%${params.q}%,description.ilike.%${params.q}%,domain.ilike.%${params.q}%`
    )
  }
  if (params.vertical && typeof params.vertical === 'string') {
    query = query.eq('vertical', params.vertical)
  }
  if (params.capability && typeof params.capability === 'string') {
    query = query.contains('capabilities', [params.capability])
  }
  if (params.tier && typeof params.tier === 'string') {
    query = query.eq('audit_tier', params.tier)
  }

  query = query.order('audit_score', { ascending: false }).limit(limit)

  const { data, error } = await query

  if (error) throw new Error(error.message)

  let results = data || []

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

      const affordableBizIds = new Set<string>()
      for (const svc of services || []) {
        if (svc.price_per_call <= maxPrice) {
          affordableBizIds.add(svc.business_id)
        }
      }
      // Keep businesses with no services (unknown pricing) or affordable ones
      results = results.filter(
        (b) =>
          affordableBizIds.has(b.id) ||
          !(services || []).some((s) => s.business_id === b.id)
      )
    }
  }

  return { businesses: results, count: results.length }
}

async function executeGetProfile(params: Record<string, unknown>) {
  const slug = params.slug as string
  if (!slug) throw new Error('slug is required')

  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('businesses')
    .select('*, services(*), audit_results(*)')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') throw new Error(`Business "${slug}" not found`)
    throw new Error(error.message)
  }

  return data
}

async function executeGetManifest(params: Record<string, unknown>) {
  const slug = params.slug as string
  if (!slug) throw new Error('slug is required')

  const supabase = getServiceClient()

  const { data: business, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') throw new Error(`Business "${slug}" not found`)
    throw new Error(error.message)
  }

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('business_id', business.id)
    .eq('status', 'active')

  const { data: wallet } = await supabase
    .from('agent_wallets')
    .select('status')
    .eq('business_id', business.id)
    .maybeSingle()

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

  // Placeholder audit — in production this would run the full 5-category audit engine.
  // For now, return a synthetic scorecard.
  return {
    url,
    business_id: params.business_id || null,
    status: 'placeholder',
    message:
      'Full audit engine not yet wired to MCP endpoint. Use the /api/v1/audit route directly for real audits.',
    scorecard: {
      total_score: 0,
      tier: 'unaudited',
      categories: [
        { category: 'machine_readable_profile', score: 0, max_score: 25 },
        { category: 'mcp_api_endpoints', score: 0, max_score: 25 },
        { category: 'agent_native_onboarding', score: 0, max_score: 20 },
        { category: 'structured_pricing', score: 0, max_score: 15 },
        { category: 'agent_payment_acceptance', score: 0, max_score: 15 },
      ],
    },
  }
}

async function executeCheckBalance(params: Record<string, unknown>) {
  const businessId = params.business_id as string
  if (!businessId) throw new Error('business_id is required')

  const supabase = getServiceClient()

  const { data: wallet, error } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('business_id', businessId)
    .maybeSingle()

  if (error) throw new Error(error.message)

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

  const { data: fromWallet } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('business_id', fromBizId)
    .maybeSingle()

  if (!fromWallet) throw new Error('Source business has no wallet')

  const { data: toWallet } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('business_id', toBizId)
    .maybeSingle()

  if (!toWallet) throw new Error('Destination business has no wallet')

  const transaction = await transferFunds(fromWallet.id, toWallet.id, amount, description, {
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

export async function POST(request: NextRequest) {
  let body: JsonRpcRequest

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      jsonRpcError(null, -32700, 'Parse error — invalid JSON'),
      { status: 400 }
    )
  }

  if (!body.jsonrpc || body.jsonrpc !== '2.0' || !body.method) {
    return NextResponse.json(
      jsonRpcError(body?.id ?? null, -32600, 'Invalid request — must be JSON-RPC 2.0'),
      { status: 400 }
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
            },
          })
        )
      }

      // ---------------------------------------------------------------
      // tools/list — return available tools
      // ---------------------------------------------------------------
      case 'tools/list': {
        return NextResponse.json(
          jsonRpcSuccess(requestId, {
            tools: TOOLS,
          })
        )
      }

      // ---------------------------------------------------------------
      // tools/call — execute a tool
      // ---------------------------------------------------------------
      case 'tools/call': {
        const toolName = (params?.name as string) || ''
        const toolArgs = (params?.arguments as Record<string, unknown>) || {}

        const handler = TOOL_HANDLERS[toolName]
        if (!handler) {
          return NextResponse.json(
            jsonRpcError(requestId, -32602, `Unknown tool: "${toolName}"`, {
              available_tools: TOOLS.map((t) => t.name),
            })
          )
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
            })
          )
        } catch (toolErr) {
          const message =
            toolErr instanceof Error ? toolErr.message : 'Tool execution failed'
          return NextResponse.json(
            jsonRpcSuccess(requestId, {
              content: [{ type: 'text', text: message }],
              isError: true,
            })
          )
        }
      }

      default:
        return NextResponse.json(
          jsonRpcError(requestId, -32601, `Method not found: "${method}"`),
          { status: 404 }
        )
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json(
      jsonRpcError(requestId, -32603, message),
      { status: 500 }
    )
  }
}

// GET handler for discovery — agents can GET /api/mcp to see the server info
export async function GET() {
  return NextResponse.json({
    ...SERVER_INFO,
    protocol: 'JSON-RPC 2.0 (MCP)',
    endpoint: '/api/mcp',
    method: 'POST',
    tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
  })
}
