import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import {
  generateMcpTools,
  toMcpProtocolFormat,
  type BusinessProfile,
} from '@/lib/verticals/mcp-generator'
import { routeFulfillment, type FulfillmentResult } from '@/lib/fulfillment/router'

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
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Agent-Id, X-Session-Id',
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

// --- Fulfillment routing (delegates to the fulfillment router) --------------

/**
 * Read-only info tools return static/DB data directly.
 * Action tools (book, quote, contact, etc.) go through the fulfillment router
 * which tries: API proxy -> webhook -> email -> lead capture.
 */
async function fulfillToolCall(
  business: Record<string, any>,
  profile: BusinessProfile,
  toolName: string,
  toolArgs: Record<string, unknown>,
  agentId: string | null
): Promise<{ result: unknown; method: string }> {
  // ---- Read-only info tools — return data directly ----

  if (toolName === 'get_business_info') {
    return {
      method: 'static',
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
      method: 'static',
      result: {
        services: services || [],
        count: (services || []).length,
      },
    }
  }

  if (toolName === 'check_availability') {
    // Return hours-based availability from the profile
    return {
      method: 'static',
      result: {
        business_name: profile.name,
        hours: profile.hours || 'Contact business for hours',
        service_area: profile.service_area || 'Contact business for service area',
        note: 'For real-time availability, contact the business directly.',
      },
    }
  }

  // ---- Action tools — route through fulfillment engine ----

  const fulfillmentResult: FulfillmentResult = await routeFulfillment({
    business_id: business.id,
    tool_called: toolName,
    input: toolArgs as Record<string, any>,
    agent_id: agentId || undefined,
    business_name: business.name,
  })

  // Shape the result for the MCP response
  if (fulfillmentResult.success) {
    return {
      method: fulfillmentResult.route_used,
      result: {
        status: fulfillmentResult.route_used === 'lead_capture' ? 'received' : 'fulfilled',
        message: fulfillmentResult.message,
        ...(fulfillmentResult.lead_id ? { lead_id: fulfillmentResult.lead_id } : {}),
        ...(fulfillmentResult.response_data ? { data: fulfillmentResult.response_data } : {}),
        business_name: business.name,
        business_phone: business.phone || null,
        business_email: business.owner_email || null,
      },
    }
  }

  // Fulfillment failed (all routes exhausted) — return error context
  return {
    method: fulfillmentResult.route_used,
    result: {
      status: 'error',
      message: fulfillmentResult.message || `Could not process "${toolName}" at this time.`,
      business_name: business.name,
      business_phone: business.phone || null,
    },
  }
}

// --- Route handlers ---------------------------------------------------------

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(
  request: NextRequest,
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

  // ---------------------------------------------------------------
  // SSE transport — MCP over Server-Sent Events
  // Claude Desktop and other MCP clients connect with Accept: text/event-stream
  // Protocol: client GETs to open SSE stream, then POSTs JSON-RPC to the
  // session endpoint provided in the initial "endpoint" event.
  // ---------------------------------------------------------------
  const acceptHeader = request.headers.get('accept') || ''
  if (acceptHeader.includes('text/event-stream')) {
    return handleSseTransport(request, businessSlug, entry)
  }

  // ---------------------------------------------------------------
  // Standard GET — return the MCP server manifest as JSON
  // ---------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// SSE Transport Handler
// ---------------------------------------------------------------------------
// MCP SSE protocol:
//   1. Client GETs with Accept: text/event-stream
//   2. Server sends "endpoint" event with the POST URL for JSON-RPC messages
//   3. Server holds the connection open and sends keep-alive pings
//   4. Client POSTs JSON-RPC requests to the endpoint URL
//   5. Server sends responses as SSE "message" events on the original stream
//
// Since Next.js App Router is request-response (no shared state between
// GET and POST), we implement a simplified SSE transport:
//   - The GET opens the SSE stream and sends the endpoint event
//   - The POST handler (above) still handles JSON-RPC requests independently
//   - The SSE stream provides server info + tools/list on connect, then pings
//
// This gives MCP clients everything they need for tool discovery and keeps
// the connection alive for monitoring. Tool calls still go through POST.
// ---------------------------------------------------------------------------

// Active SSE sessions keyed by session ID — used for cross-request messaging
const sseSessions = new Map<string, {
  controller: ReadableStreamDefaultController
  businessSlug: string
  createdAt: number
}>()

// Lazy cleanup of stale sessions (called on new session creation)
const SSE_SESSION_TTL = 300_000 // 5 min
let lastCleanup = 0
function cleanupStaleSessions() {
  const now = Date.now()
  if (now - lastCleanup < 60_000) return // at most once per minute
  lastCleanup = now
  for (const [id, session] of sseSessions) {
    if (now - session.createdAt > SSE_SESSION_TTL) {
      try { session.controller.close() } catch { /* already closed */ }
      sseSessions.delete(id)
    }
  }
}

function generateSessionId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < 24; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

function sseEvent(event: string, data: unknown): string {
  const json = JSON.stringify(data)
  return `event: ${event}\ndata: ${json}\n\n`
}

function handleSseTransport(
  request: NextRequest,
  businessSlug: string,
  entry: CachedBusiness
): Response {
  cleanupStaleSessions()
  const sessionId = generateSessionId()
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Register session for potential cross-request messaging
      sseSessions.set(sessionId, {
        controller,
        businessSlug,
        createdAt: Date.now(),
      })

      // 1. Send the endpoint event — tells the client where to POST JSON-RPC
      const endpointUrl = `https://agenthermes.ai/api/mcp/hosted/${businessSlug}`
      controller.enqueue(encoder.encode(
        sseEvent('endpoint', endpointUrl)
      ))

      // 2. Send server info
      controller.enqueue(encoder.encode(
        sseEvent('message', {
          jsonrpc: '2.0',
          method: 'notifications/initialized',
          params: {
            protocolVersion: '2024-11-05',
            serverInfo: {
              name: `${entry.business.name} MCP Server`,
              version: '1.0.0',
              description: `AI agent tools for ${entry.business.name} — powered by AgentHermes`,
            },
            capabilities: {
              tools: {},
            },
            session_id: sessionId,
          },
        })
      ))

      // 3. Send the tools list
      try {
        const generated = generateMcpTools(entry.profile)
        controller.enqueue(encoder.encode(
          sseEvent('message', {
            jsonrpc: '2.0',
            method: 'notifications/tools/list_changed',
            params: {
              tools: generated.tools.map((t) => ({
                name: t.name,
                description: t.description,
                inputSchema: t.inputSchema,
              })),
            },
          })
        ))
      } catch {
        // Unknown vertical — send minimal tools
        controller.enqueue(encoder.encode(
          sseEvent('message', {
            jsonrpc: '2.0',
            method: 'notifications/tools/list_changed',
            params: {
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
                    },
                    required: ['customer_name', 'message'],
                  },
                },
              ],
            },
          })
        ))
      }

      // 4. Keep-alive pings every 30s
      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': ping\n\n'))
        } catch {
          // Stream closed
          clearInterval(pingInterval)
          sseSessions.delete(sessionId)
        }
      }, 30_000)

      // Clean up on abort (client disconnect)
      request.signal.addEventListener('abort', () => {
        clearInterval(pingInterval)
        sseSessions.delete(sessionId)
        try { controller.close() } catch { /* already closed */ }
      })
    },

    cancel() {
      sseSessions.delete(sessionId)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      ...corsHeaders,
    },
  })
}

// ---------------------------------------------------------------------------
// Send a message to an active SSE session (called from POST handler)
// ---------------------------------------------------------------------------

function sendToSseSession(sessionId: string, data: unknown): boolean {
  const session = sseSessions.get(sessionId)
  if (!session) return false

  try {
    const encoder = new TextEncoder()
    session.controller.enqueue(encoder.encode(sseEvent('message', data)))
    return true
  } catch {
    sseSessions.delete(sessionId)
    return false
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

        const rpcResponse = rpcSuccess(requestId, {
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
        })

        // Bridge to SSE session if client sent X-Session-Id header
        const sseSessionId = request.headers.get('x-session-id')
        if (sseSessionId) {
          sendToSseSession(sseSessionId, rpcResponse)
        }

        return NextResponse.json(rpcResponse, { headers: corsHeaders })
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
