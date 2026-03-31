// ---------------------------------------------------------------------------
// Fulfillment Router
// Routes agent tool calls to business systems in priority order:
//   1. API proxy  — forward to business API endpoint
//   2. Webhook    — POST structured payload to webhook URL
//   3. Email      — send formatted email using templates
//   4. Lead capture — store in DB as fallback (always succeeds)
// ---------------------------------------------------------------------------

import { getServiceClient } from '@/lib/supabase'
import { renderTemplate, detectTemplate } from './templates'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FulfillmentRoute {
  type: 'api' | 'webhook' | 'email' | 'lead_capture'
  /** API base URL or webhook URL */
  endpoint?: string
  /** Email address for email route */
  email?: string
  /** HTTP method for API route (default POST) */
  method?: string
  /** Extra headers for API/webhook route */
  headers?: Record<string, string>
  /** Priority — lower = tried first */
  priority: number
}

export interface FulfillmentRequest {
  business_id: string
  tool_called: string
  input: Record<string, any>
  agent_id?: string
  routes?: FulfillmentRoute[]
  /** Business name for email templates */
  business_name?: string
}

export interface FulfillmentResult {
  success: boolean
  route_used: FulfillmentRoute['type']
  message: string
  /** ID of the lead row if lead_capture was used */
  lead_id?: string
  /** HTTP status if API/webhook was used */
  status_code?: number
  /** Response body from API/webhook */
  response_data?: unknown
}

// ---------------------------------------------------------------------------
// Main Router
// ---------------------------------------------------------------------------

/**
 * Route a tool call through the business's configured fulfillment chain.
 *
 * If `routes` is not provided on the request, attempts to load them from
 * the `business_fulfillment_routes` table. If none exist, falls through
 * directly to lead capture.
 *
 * Routes are tried in priority order. The first successful route wins.
 * Lead capture is always appended as the final fallback.
 */
export async function routeFulfillment(
  req: FulfillmentRequest
): Promise<FulfillmentResult> {
  let routes = req.routes || []

  // Load routes from DB if none provided
  if (routes.length === 0) {
    routes = await loadRoutes(req.business_id)
  }

  // Sort by priority (ascending — lower number = higher priority)
  routes = [...routes].sort((a, b) => a.priority - b.priority)

  // Ensure lead_capture is always the last resort
  const hasLeadCapture = routes.some((r) => r.type === 'lead_capture')
  if (!hasLeadCapture) {
    routes.push({ type: 'lead_capture', priority: 999 })
  }

  // Try each route in order
  for (const route of routes) {
    try {
      const result = await executeRoute(route, req)
      if (result.success) {
        return result
      }
      // Route failed — try next
      console.warn(
        `[fulfillment] Route ${route.type} failed for business ${req.business_id}: ${result.message}`
      )
    } catch (err) {
      console.error(
        `[fulfillment] Route ${route.type} threw for business ${req.business_id}:`,
        err instanceof Error ? err.message : err
      )
    }
  }

  // Should never reach here because lead_capture always succeeds,
  // but guard against it anyway.
  return {
    success: false,
    route_used: 'lead_capture',
    message: 'All fulfillment routes failed',
  }
}

// ---------------------------------------------------------------------------
// Route Executors
// ---------------------------------------------------------------------------

async function executeRoute(
  route: FulfillmentRoute,
  req: FulfillmentRequest
): Promise<FulfillmentResult> {
  switch (route.type) {
    case 'api':
      return executeApi(route, req)
    case 'webhook':
      return executeWebhook(route, req)
    case 'email':
      return executeEmail(route, req)
    case 'lead_capture':
      return executeLeadCapture(req)
    default:
      return {
        success: false,
        route_used: route.type,
        message: `Unknown route type: ${route.type}`,
      }
  }
}

/**
 * API proxy — forward the tool call payload to the business's API endpoint.
 */
async function executeApi(
  route: FulfillmentRoute,
  req: FulfillmentRequest
): Promise<FulfillmentResult> {
  if (!route.endpoint) {
    return { success: false, route_used: 'api', message: 'No API endpoint configured' }
  }

  const method = route.method || 'POST'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-AgentHermes-Tool': req.tool_called,
    ...(route.headers || {}),
  }
  if (req.agent_id) {
    headers['X-AgentHermes-Agent'] = req.agent_id
  }

  try {
    const response = await fetch(route.endpoint, {
      method,
      headers,
      body: JSON.stringify({
        tool: req.tool_called,
        input: req.input,
        agent_id: req.agent_id || null,
        business_id: req.business_id,
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(15_000),
    })

    const contentType = response.headers.get('content-type') || ''
    const data = contentType.includes('json')
      ? await response.json()
      : await response.text()

    if (response.ok) {
      return {
        success: true,
        route_used: 'api',
        message: `API responded ${response.status}`,
        status_code: response.status,
        response_data: data,
      }
    }

    return {
      success: false,
      route_used: 'api',
      message: `API returned ${response.status}`,
      status_code: response.status,
      response_data: data,
    }
  } catch (err) {
    const isTimeout = err instanceof DOMException && err.name === 'TimeoutError'
    return {
      success: false,
      route_used: 'api',
      message: isTimeout ? 'API timed out after 15s' : `API error: ${err instanceof Error ? err.message : 'unknown'}`,
    }
  }
}

/**
 * Webhook — POST a structured payload to the business's webhook URL.
 */
async function executeWebhook(
  route: FulfillmentRoute,
  req: FulfillmentRequest
): Promise<FulfillmentResult> {
  if (!route.endpoint) {
    return { success: false, route_used: 'webhook', message: 'No webhook URL configured' }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-AgentHermes-Event': 'fulfillment',
    ...(route.headers || {}),
  }

  try {
    const response = await fetch(route.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event: 'agent_fulfillment',
        tool: req.tool_called,
        input: req.input,
        agent_id: req.agent_id || null,
        business_id: req.business_id,
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (response.ok) {
      return {
        success: true,
        route_used: 'webhook',
        message: `Webhook delivered (${response.status})`,
        status_code: response.status,
      }
    }

    return {
      success: false,
      route_used: 'webhook',
      message: `Webhook returned ${response.status}`,
      status_code: response.status,
    }
  } catch (err) {
    const isTimeout = err instanceof DOMException && err.name === 'TimeoutError'
    return {
      success: false,
      route_used: 'webhook',
      message: isTimeout ? 'Webhook timed out after 10s' : `Webhook error: ${err instanceof Error ? err.message : 'unknown'}`,
    }
  }
}

/**
 * Email — render a template and log it (swap console.log for Resend/SendGrid).
 */
async function executeEmail(
  route: FulfillmentRoute,
  req: FulfillmentRequest
): Promise<FulfillmentResult> {
  if (!route.email) {
    return { success: false, route_used: 'email', message: 'No email address configured' }
  }

  const templateName = detectTemplate(req.tool_called)
  const rendered = renderTemplate(templateName, req.input, {
    businessName: req.business_name,
    toolName: req.tool_called,
    agentId: req.agent_id,
  })

  // -------------------------------------------------------------------
  // TODO: Replace with Resend/SendGrid
  //   import { Resend } from 'resend'
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({
  //     from: 'AgentHermes <notifications@agenthermes.ai>',
  //     to: route.email,
  //     subject: rendered.subject,
  //     text: rendered.body,
  //   })
  // -------------------------------------------------------------------
  console.log(
    `[fulfillment:email] To: ${route.email} | Subject: ${rendered.subject}\n${rendered.body}`
  )

  return {
    success: true,
    route_used: 'email',
    message: `Email queued to ${route.email}`,
  }
}

/**
 * Lead capture — store the tool call in the agent_leads table.
 * This is the always-on fallback that never fails.
 */
async function executeLeadCapture(
  req: FulfillmentRequest
): Promise<FulfillmentResult> {
  try {
    const supabase = getServiceClient()

    const { data, error } = await supabase
      .from('agent_leads')
      .insert({
        business_id: req.business_id || null,
        tool_called: req.tool_called,
        input: req.input,
        agent_id: req.agent_id || null,
        status: 'new',
      } as any)
      .select('id')
      .single()

    if (error) {
      console.error('[fulfillment:lead_capture] Insert failed:', error.message)
      return {
        success: false,
        route_used: 'lead_capture',
        message: `Lead capture DB error: ${error.message}`,
      }
    }

    const row = data as Record<string, any>
    return {
      success: true,
      route_used: 'lead_capture',
      message: 'Lead captured in database',
      lead_id: row.id,
    }
  } catch (err) {
    console.error('[fulfillment:lead_capture] Unexpected error:', err)
    return {
      success: false,
      route_used: 'lead_capture',
      message: `Lead capture error: ${err instanceof Error ? err.message : 'unknown'}`,
    }
  }
}

// ---------------------------------------------------------------------------
// DB Helpers
// ---------------------------------------------------------------------------

/**
 * Load fulfillment routes for a business from the
 * `business_fulfillment_routes` table.
 *
 * Falls back to empty array if the table doesn't exist yet.
 */
async function loadRoutes(businessId: string): Promise<FulfillmentRoute[]> {
  try {
    const supabase = getServiceClient()

    const { data, error } = await supabase
      .from('business_fulfillment_routes')
      .select('type, endpoint, email, method, headers, priority')
      .eq('business_id', businessId)
      .eq('active', true)
      .order('priority', { ascending: true })

    if (error) {
      // Table may not exist yet — fall through to lead capture
      console.warn('[fulfillment] Could not load routes:', error.message)
      return []
    }

    return (data || []).map((row: any) => ({
      type: row.type,
      endpoint: row.endpoint || undefined,
      email: row.email || undefined,
      method: row.method || undefined,
      headers: row.headers || undefined,
      priority: row.priority ?? 100,
    }))
  } catch {
    return []
  }
}
