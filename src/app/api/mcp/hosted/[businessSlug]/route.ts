import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import {
  generateMcpTools,
  toMcpProtocolFormat,
  type BusinessProfile,
} from '@/lib/verticals/mcp-generator'

// ---------------------------------------------------------------------------
// Hosted MCP Endpoint — /api/mcp/hosted/{businessSlug}
//
// Any business that fills out the /connect form gets a working MCP endpoint.
// Agents POST JSON-RPC 2.0 to this URL and get business-specific tools.
//
// Fulfillment routing:
//   1. Business has API  -> proxy to their API
//   2. Business has webhook -> POST to their webhook
//   3. Business has email -> send email notification (logged for now)
//   4. Default -> store as lead in agent_leads + email notification
// ---------------------------------------------------------------------------

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// --- JSON-RPC helpers -------------------------------------------------------

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

function rpcError(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown
): JsonRpcResponse {
  return { jsonrpc: '2.0', id, error: { code, message, data } }
}

function rpcSuccess(id: string | number | null, result: unknown): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result }
}

// --- Business lookup cache (per-request lifecycle in edge, short TTL) -------

interface CachedBusiness {
  business: Record<string, any>
  profile: BusinessProfile
  cachedAt: number
}

const businessCache = new Map<string, CachedBusiness>()
const CACHE_TTL = 60_000 // 60s

async function getBusinessBySlug(slug: string): Promise<CachedBusiness | null> {
  const cached = businessCache.get(slug)
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL) return cached

  const supabase = getServiceClient()
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  const biz = data as Record<string, any>

  // Build a BusinessProfile from the DB row
  const profile: BusinessProfile = {
    id: biz.id,
    name: biz.name,
    domain: biz.domain || undefined,
    description: biz.description || '',
    phone: biz.phone || '',
    email: biz.owner_email || '',
    address: biz.address || '',
    website: biz.domain ? `https://${biz.domain}` : undefined,
    hours: biz.hours || '',
    service_area: biz.service_area || '',
    vertical_id: biz.vertical_id || biz.vertical || 'general',
    vertical_data: biz.vertical_data || {},
  }

  const entry: CachedBusiness = { business: biz, profile, cachedAt: Date.now() }
  businessCache.set(slug, entry)
  return entry
}

// --- Fulfillment routing ----------------------------------------------------

type FulfillmentMethod = 'api' | 'webhook' | 'email' | 'lead'

function detectFulfillmentMethod(business: Record<string, any>): FulfillmentMethod {
  // Check gateway_services for API endpoints
  if (business.api_base_url || business.mcp_endpoints?.length > 0) return 'api'
  if (business.webhook_url) return 'webhook'
  if (business.owner_email) return 'email'
  return 'lead'
}

async function fulfillToolCall(
  business: Record<string, any>,
  profile: BusinessProfile,
  toolName: string,
  toolArgs: Record<string, unknown>,
  agentId: string | null
): Promise<{ result: unknown; method: FulfillmentMethod }> {
  const method = detectFulfillmentMethod(business)

  // For info tools, always return static data from the profile
  if (toolName === 'get_business_info') {
    return {
      method: 'lead',
      result: {
        name: profile.name,
        description: profile.description,
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
        website: profile.website,
        hours: profile.hours,
        service_area: profile.service_area,
      },
    }
  }

  if (toolName === 'get_services') {
    const supabase = getServiceClient()
    const { data: services } = await supabase
      .from('services')
      .select('name, description, pricing_model, price_per_call')
      .eq('business_id', business.id)
      .eq('status', 'active')

    return {
      method: 'lead',
      result: {
        services: services || [],
        count: (services || []).length,
      },
    }
  }

  // For action tools (book, quote, order, etc.), route by fulfillment method
  switch (method) {
    case 'api': {
      // Proxy to the business's gateway service if configured
      const supabase = getServiceClient()
      const { data: gatewayService } = await supabase
        .from('gateway_services')
        .select('id, api_base_url, actions, auth_type, encrypted_credentials')
        .eq('business_id', business.id)
        .eq('status', 'active')
        .limit(1)
        .single()

      if (gatewayService) {
        const gw = gatewayService as Record<string, any>
        const actions = (gw.actions || []) as Array<{ name: string; method: string; path: string }>
        const matchedAction = actions.find(
          (a) => a.name === toolName || a.name.toLowerCase() === toolName.toLowerCase()
        )

        if (matchedAction) {
          try {
            const apiUrl = `${gw.api_base_url}${matchedAction.path}`
            const res = await fetch(apiUrl, {
              method: matchedAction.method || 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: matchedAction.method !== 'GET' ? JSON.stringify(toolArgs) : undefined,
            })
            const data = await res.json()
            return { method: 'api', result: data }
          } catch (err) {
            // Fall through to lead storage on API failure
            console.error(`[hosted-mcp] API proxy failed for ${business.slug}:`, err)
          }
        }
      }

      // If no matching action or API call failed, fall through to lead storage
      return storeLead(business, toolName, toolArgs, agentId)
    }

    case 'webhook': {
      try {
        const res = await fetch(business.webhook_url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tool: toolName,
            input: toolArgs,
            agent_id: agentId,
            business_id: business.id,
            timestamp: new Date().toISOString(),
          }),
        })

        if (res.ok) {
          const data = await res.json().catch(() => ({}))
          return { method: 'webhook', result: { status: 'delivered', response: data } }
        }
      } catch (err) {
        console.error(`[hosted-mcp] Webhook failed for ${business.slug}:`, err)
      }

      // Fall through to lead storage on webhook failure
      return storeLead(business, toolName, toolArgs, agentId)
    }

    case 'email': {
      // Log email notification (email integration pending)
      console.log(
        `[hosted-mcp] Email notification for ${business.name} (${business.owner_email}): ` +
        `Tool "${toolName}" called by agent ${agentId || 'unknown'}. Input: ${JSON.stringify(toolArgs)}`
      )

      // Also store as lead
      return storeLead(business, toolName, toolArgs, agentId)
    }

    case 'lead':
    default:
      return storeLead(business, toolName, toolArgs, agentId)
  }
}

async function storeLead(
  business: Record<string, any>,
  toolName: string,
  toolArgs: Record<string, unknown>,
  agentId: string | null
): Promise<{ result: unknown; method: FulfillmentMethod }> {
  const supabase = getServiceClient()

  const { data: lead, error } = await supabase
    .from('agent_leads')
    .insert({
      business_id: business.id,
      tool_called: toolName,
      input: toolArgs,
      agent_id: agentId,
      status: 'new',
    } as any)
    .select()
    .single()

  if (error) {
    console.error(`[hosted-mcp] Failed to store lead for ${business.slug}:`, error.message)
    return {
      method: 'lead',
      result: {
        status: 'received',
        message: `Your request has been received by ${business.name}. They will follow up shortly.`,
      },
    }
  }

  // Log notification (email integration pending)
  if (business.owner_email) {
    console.log(
      `[hosted-mcp] New lead for ${business.name} (${business.owner_email}): ` +
      `Tool "${toolName}", Lead ID: ${(lead as any).id}`
    )
  }

  return {
    method: 'lead',
    result: {
      status: 'received',
      lead_id: (lead as any).id,
      message: `Your request has been received by ${business.name}. They will follow up shortly.`,
      business_name: business.name,
      business_phone: business.phone || null,
      business_email: business.owner_email || null,
    },
  }
}

// --- Route handlers ---------------------------------------------------------

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ businessSlug: string }> }
) {
  const { businessSlug } = await params

  if (!/^[a-z0-9-]{1,100}$/.test(businessSlug)) {
    return NextResponse.json({ error: 'Invalid business slug' }, { status: 400, headers: corsHeaders })
  }

  const entry = await getBusinessBySlug(businessSlug)
  if (!entry) {
    return NextResponse.json(
      { error: `Business "${businessSlug}" not found` },
      { status: 404, headers: corsHeaders }
    )
  }

  // GET returns the MCP server manifest (tools list, server info)
  try {
    const generated = generateMcpTools(entry.profile)
    const protocol = toMcpProtocolFormat(generated)

    return NextResponse.json(
      {
        ...protocol,
        endpoint: `https://agenthermes.ai/api/mcp/hosted/${businessSlug}`,
        business_id: entry.business.id,
        metadata: generated.metadata,
      },
      { headers: { ...corsHeaders, 'Cache-Control': 'public, max-age=60, s-maxage=120' } }
    )
  } catch (err) {
    // If vertical template is unknown, return a minimal server
    console.error(`[hosted-mcp] Tool generation failed for ${businessSlug}:`, err)
    return NextResponse.json(
      {
        name: `${entry.business.name} MCP Server`,
        version: '1.0.0',
        description: `AI agent tools for ${entry.business.name}`,
        tools: [
          {
            name: 'get_business_info',
            description: `Get business information for ${entry.business.name}`,
            inputSchema: { type: 'object', properties: {}, required: [] },
          },
          {
            name: 'contact_business',
            description: `Send an inquiry to ${entry.business.name}`,
            inputSchema: {
              type: 'object',
              properties: {
                customer_name: { type: 'string', description: 'Your name' },
                message: { type: 'string', description: 'Your message or request' },
                phone: { type: 'string', description: 'Contact phone number' },
                email: { type: 'string', description: 'Contact email' },
              },
              required: ['customer_name', 'message'],
            },
          },
        ],
        endpoint: `https://agenthermes.ai/api/mcp/hosted/${businessSlug}`,
        business_id: entry.business.id,
      },
      { headers: { ...corsHeaders, 'Cache-Control': 'public, max-age=60, s-maxage=120' } }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ businessSlug: string }> }
) {
  const { businessSlug } = await params

  if (!/^[a-z0-9-]{1,100}$/.test(businessSlug)) {
    return NextResponse.json(
      rpcError(null, -32600, 'Invalid business slug'),
      { status: 400, headers: corsHeaders }
    )
  }

  // Parse JSON-RPC request
  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json(
      rpcError(null, -32700, 'Parse error - invalid JSON'),
      { status: 400, headers: corsHeaders }
    )
  }

  const body = rawBody as JsonRpcRequest

  if (!body.jsonrpc || body.jsonrpc !== '2.0' || !body.method) {
    return NextResponse.json(
      rpcError(body?.id ?? null, -32600, 'Invalid request - must be JSON-RPC 2.0'),
      { status: 400, headers: corsHeaders }
    )
  }

  const { method, params: rpcParams, id } = body
  const requestId = id ?? null

  // Look up the business
  const entry = await getBusinessBySlug(businessSlug)
  if (!entry) {
    return NextResponse.json(
      rpcError(requestId, -32600, `Business "${businessSlug}" not found`),
      { status: 404, headers: corsHeaders }
    )
  }

  const { business, profile } = entry

  try {
    switch (method) {
      // ---------------------------------------------------------------
      // initialize
      // ---------------------------------------------------------------
      case 'initialize': {
        return NextResponse.json(
          rpcSuccess(requestId, {
            protocolVersion: '2024-11-05',
            serverInfo: {
              name: `${business.name} MCP Server`,
              version: '1.0.0',
              description: `AI agent tools for ${business.name} — powered by AgentHermes`,
            },
            capabilities: {
              tools: {},
            },
          }),
          { headers: corsHeaders }
        )
      }

      // ---------------------------------------------------------------
      // notifications/initialized
      // ---------------------------------------------------------------
      case 'notifications/initialized': {
        return NextResponse.json(rpcSuccess(requestId, {}), { headers: corsHeaders })
      }

      // ---------------------------------------------------------------
      // ping
      // ---------------------------------------------------------------
      case 'ping': {
        return NextResponse.json(
          rpcSuccess(requestId, { status: 'pong' }),
          { headers: corsHeaders }
        )
      }

      // ---------------------------------------------------------------
      // tools/list — generate business-specific tools
      // ---------------------------------------------------------------
      case 'tools/list': {
        try {
          const generated = generateMcpTools(profile)
          return NextResponse.json(
            rpcSuccess(requestId, {
              tools: generated.tools.map((t) => ({
                name: t.name,
                description: t.description,
                inputSchema: t.inputSchema,
              })),
            }),
            { headers: corsHeaders }
          )
        } catch {
          // Fallback for unknown verticals
          return NextResponse.json(
            rpcSuccess(requestId, {
              tools: [
                {
                  name: 'get_business_info',
                  description: `Get business information for ${business.name}`,
                  inputSchema: { type: 'object', properties: {}, required: [] },
                },
                {
                  name: 'contact_business',
                  description: `Send an inquiry to ${business.name}`,
                  inputSchema: {
                    type: 'object',
                    properties: {
                      customer_name: { type: 'string', description: 'Your name' },
                      message: { type: 'string', description: 'Your message or request' },
                      phone: { type: 'string', description: 'Contact phone number' },
                      email: { type: 'string', description: 'Contact email' },
                    },
                    required: ['customer_name', 'message'],
                  },
                },
              ],
            }),
            { headers: corsHeaders }
          )
        }
      }

      // ---------------------------------------------------------------
      // tools/call — route to fulfillment
      // ---------------------------------------------------------------
      case 'tools/call': {
        const toolName = (rpcParams?.name as string) || ''
        const toolArgs = (rpcParams?.arguments as Record<string, unknown>) || {}
        const agentId = (rpcParams?.agent_id as string) ||
          request.headers.get('x-agent-id') ||
          null

        if (!toolName) {
          return NextResponse.json(
            rpcError(requestId, -32602, 'Missing tool name in params.name'),
            { headers: corsHeaders }
          )
        }

        // Validate the tool exists
        let toolExists = false
        try {
          const generated = generateMcpTools(profile)
          toolExists = generated.tools.some((t) => t.name === toolName)
        } catch {
          // Unknown vertical — allow contact_business and get_business_info
          toolExists = ['get_business_info', 'contact_business'].includes(toolName)
        }

        if (!toolExists) {
          return NextResponse.json(
            rpcError(requestId, -32602, `Unknown tool: "${toolName}". Use tools/list to see available tools.`),
            { headers: corsHeaders }
          )
        }

        const { result, method: fulfillmentMethod } = await fulfillToolCall(
          business,
          profile,
          toolName,
          toolArgs,
          agentId
        )

        return NextResponse.json(
          rpcSuccess(requestId, {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
            _meta: {
              fulfillment_method: fulfillmentMethod,
              business_slug: businessSlug,
              tool: toolName,
            },
          }),
          { headers: corsHeaders }
        )
      }

      default:
        return NextResponse.json(
          rpcError(requestId, -32601, `Method not found: "${method}"`),
          { headers: corsHeaders }
        )
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    console.error(`[hosted-mcp] Error for ${businessSlug}/${method}:`, message)
    return NextResponse.json(
      rpcError(requestId, -32603, 'Tool execution failed', { message }),
      { status: 500, headers: corsHeaders }
    )
  }
}
