import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'
import { encryptCredentials } from '@/lib/gateway/vault'
import { logError } from '@/lib/error-logger'
import type { ServiceAction } from '@/lib/gateway/types'

const SLUG_RE = /^[a-z0-9-]{1,100}$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const VALID_AUTH_TYPES = ['bearer', 'api_key_header', 'basic', 'oauth', 'query_param', 'none']
const VALID_CATEGORIES = ['ai', 'video', 'voice', 'payments', 'data', 'email', 'messaging', 'analytics', 'storage', 'search', 'other']
const VALID_PAYMENT_PREFS = ['gateway', 'direct']

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Generate MCP tool names from service name + actions.
 * E.g. "HeyGen Video API" + action "create_video" => "heygen_video_api__create_video"
 */
function generateMcpToolNames(serviceName: string, actions: ServiceAction[]): string[] {
  const prefix = serviceName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

  return actions.map((a) => `${prefix}__${a.name}`)
}

/**
 * POST /api/v1/gateway/connect
 *
 * Self-service connection: lets any business programmatically connect
 * their API service to AgentHermes in one call.
 *
 * Flow:
 * 1. Validate all inputs
 * 2. Look up business by slug (create if doesn't exist)
 * 3. Encrypt the API key via vault
 * 4. Verify the API works (test call to base URL)
 * 5. Create the gateway_services record
 * 6. Return service ID + auto-generated MCP tool names
 *
 * Auth required.
 */
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const {
      business_slug,
      business_id,
      service_name,
      description,
      api_base_url,
      auth_type,
      auth_header,
      api_key,
      credentials: rawCredentials,
      actions,
      cost_per_call,
      cost_model,
      our_margin,
      rate_limit_per_min,
      category,
      payment_preference,
    } = body

    // --- Validation ---
    if (!business_slug && !business_id) {
      return NextResponse.json(
        { error: 'business_slug or business_id is required' },
        { status: 400 }
      )
    }

    if (business_slug && typeof business_slug !== 'string') {
      return NextResponse.json(
        { error: 'business_slug must be a string' },
        { status: 400 }
      )
    }

    if (business_id && typeof business_id !== 'string') {
      return NextResponse.json(
        { error: 'business_id must be a string' },
        { status: 400 }
      )
    }

    if (business_id && !UUID_RE.test(business_id)) {
      return NextResponse.json(
        { error: 'business_id must be a valid UUID' },
        { status: 400 }
      )
    }

    if (!service_name || typeof service_name !== 'string' || service_name.trim().length === 0) {
      return NextResponse.json(
        { error: 'service_name is required' },
        { status: 400 }
      )
    }

    if (service_name.length > 200) {
      return NextResponse.json(
        { error: 'service_name must be 200 characters or less' },
        { status: 400 }
      )
    }

    if (!api_base_url || typeof api_base_url !== 'string') {
      return NextResponse.json(
        { error: 'api_base_url is required' },
        { status: 400 }
      )
    }

    // Only allow HTTPS in production (SSRF protection)
    if (process.env.NODE_ENV === 'production' && !api_base_url.startsWith('https://')) {
      return NextResponse.json(
        { error: 'api_base_url must use HTTPS' },
        { status: 400 }
      )
    }

    if (!auth_type || !VALID_AUTH_TYPES.includes(auth_type)) {
      return NextResponse.json(
        { error: `auth_type must be one of: ${VALID_AUTH_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` },
        { status: 400 }
      )
    }

    if (payment_preference && !VALID_PAYMENT_PREFS.includes(payment_preference)) {
      return NextResponse.json(
        { error: `payment_preference must be one of: ${VALID_PAYMENT_PREFS.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate actions array
    if (actions !== undefined && !Array.isArray(actions)) {
      return NextResponse.json({ error: 'actions must be an array' }, { status: 400 })
    }

    if (actions && actions.length > 0) {
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i] as ServiceAction
        if (!action.name || !action.method || !action.path) {
          return NextResponse.json(
            { error: `actions[${i}] requires name, method, and path` },
            { status: 400 }
          )
        }
        const validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        if (!validMethods.includes(action.method.toUpperCase())) {
          return NextResponse.json(
            { error: `actions[${i}].method must be one of: ${validMethods.join(', ')}` },
            { status: 400 }
          )
        }
      }
    }

    // Validate cost
    if (cost_per_call !== undefined && (typeof cost_per_call !== 'number' || cost_per_call < 0)) {
      return NextResponse.json(
        { error: 'cost_per_call must be a non-negative number' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // --- Step 2: Resolve or create business ---
    let resolvedBusinessId: string | null = null

    if (business_id) {
      // Verify business exists by ID
      const { data: biz, error: bizError } = await supabase
        .from('businesses')
        .select('id')
        .eq('id', business_id)
        .maybeSingle()

      if (bizError) {
        console.error('[gateway/connect] Business lookup error:', bizError.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }

      if (!biz) {
        return NextResponse.json(
          { error: `Business not found with id: ${business_id}` },
          { status: 404 }
        )
      }

      resolvedBusinessId = (biz as Record<string, any>).id
    } else if (business_slug) {
      const slug = SLUG_RE.test(business_slug) ? business_slug : slugify(business_slug)

      if (!slug) {
        return NextResponse.json(
          { error: 'Could not generate a valid slug from business_slug' },
          { status: 400 }
        )
      }

      // Try to find existing business
      const { data: existing, error: lookupError } = await supabase
        .from('businesses')
        .select('id')
        .eq('slug', slug)
        .maybeSingle()

      if (lookupError) {
        console.error('[gateway/connect] Business lookup error:', lookupError.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }

      if (existing) {
        resolvedBusinessId = (existing as Record<string, any>).id
      } else {
        // Auto-create business from slug
        const { data: newBiz, error: createError } = await supabase
          .from('businesses')
          .insert({
            name: business_slug,
            slug,
            description: null,
            owner_email: null,
            vertical: category || null,
            capabilities: [],
            mcp_endpoints: [],
            audit_score: 0,
            audit_tier: 'unaudited',
            trust_score: 0,
            pricing_visible: false,
            agent_onboarding: false,
          } as any)
          .select('id')
          .single()

        if (createError) {
          console.error('[gateway/connect] Business create error:', createError.message)
          return NextResponse.json({ error: 'Failed to create business' }, { status: 500 })
        }

        resolvedBusinessId = (newBiz as Record<string, any>).id
      }
    }

    // --- Step 3: Encrypt credentials ---
    let encryptedCredentials: string | null = null
    const credentials: Record<string, string> = {}

    if (api_key) {
      credentials.api_key = api_key
    }

    // Merge in any additional raw credentials (username, password, token, etc.)
    if (rawCredentials && typeof rawCredentials === 'object') {
      for (const [k, v] of Object.entries(rawCredentials)) {
        if (typeof v === 'string') {
          credentials[k] = v
        }
      }
    }

    if (Object.keys(credentials).length > 0) {
      encryptedCredentials = encryptCredentials(credentials)
    }

    // --- Step 4: Verify the API works (test call) ---
    let apiVerified = false
    let verifyError: string | null = null

    try {
      const testHeaders: Record<string, string> = {
        'Accept': 'application/json',
      }

      // Apply auth for test call
      if (auth_type === 'bearer' && credentials.api_key) {
        testHeaders[auth_header || 'Authorization'] = `Bearer ${credentials.api_key}`
      } else if (auth_type === 'api_key_header' && credentials.api_key) {
        testHeaders[auth_header || 'X-Api-Key'] = credentials.api_key
      } else if (auth_type === 'basic' && credentials.username && credentials.password) {
        const encoded = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')
        testHeaders[auth_header || 'Authorization'] = `Basic ${encoded}`
      }

      let testUrl = api_base_url.trim()
      if (auth_type === 'query_param' && credentials.api_key) {
        const separator = testUrl.includes('?') ? '&' : '?'
        const paramName = auth_header || 'api_key'
        testUrl = `${testUrl}${separator}${encodeURIComponent(paramName)}=${encodeURIComponent(credentials.api_key)}`
      }

      const testResponse = await fetch(testUrl, {
        method: 'GET',
        headers: testHeaders,
        signal: AbortSignal.timeout(10_000),
      })

      // Accept any non-5xx as "API is reachable"
      // Many APIs return 404 on base URL but that still proves connectivity
      if (testResponse.status < 500) {
        apiVerified = true
      } else {
        verifyError = `API returned ${testResponse.status}`
      }
    } catch (err) {
      const isTimeout = err instanceof DOMException && err.name === 'TimeoutError'
      verifyError = isTimeout
        ? 'API verification timed out after 10s'
        : `API unreachable: ${err instanceof Error ? err.message : 'Unknown error'}`
    }

    // --- Step 5: Check for duplicate service name ---
    const { data: existingService } = await supabase
      .from('gateway_services')
      .select('id')
      .eq('name', service_name.trim())
      .maybeSingle()

    if (existingService) {
      return NextResponse.json(
        { error: `A gateway service named "${service_name.trim()}" already exists` },
        { status: 409 }
      )
    }

    // --- Step 6: Create gateway_services record ---
    const normalizedActions = (actions || []).map((a: ServiceAction) => ({
      ...a,
      method: a.method.toUpperCase(),
    }))

    const serviceStatus = apiVerified ? 'active' : 'pending'

    const { data: serviceData, error: insertError } = await (supabase
      .from('gateway_services') as any)
      .insert({
        name: service_name.trim(),
        description: description || null,
        api_base_url: api_base_url.trim(),
        auth_type,
        auth_header: auth_header || (auth_type === 'api_key_header' ? 'X-Api-Key' : 'Authorization'),
        encrypted_credentials: encryptedCredentials,
        actions: normalizedActions,
        cost_per_call: cost_per_call ?? 0,
        cost_model: cost_model || 'per_call',
        our_margin: our_margin ?? 0.20,
        rate_limit_per_min: rate_limit_per_min ?? 60,
        category: category || null,
        business_id: resolvedBusinessId,
        status: serviceStatus,
      })
      .select('id, name, description, api_base_url, auth_type, actions, cost_per_call, cost_model, our_margin, rate_limit_per_min, category, business_id, status, created_at')
      .single()

    if (insertError) {
      console.error('[gateway/connect] Insert error:', insertError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const service = serviceData as Record<string, unknown>
    const serviceActions = (service.actions || []) as ServiceAction[]

    // --- Step 7: Build response ---
    const mcpToolNames = generateMcpToolNames(
      service.name as string,
      serviceActions
    )

    return NextResponse.json({
      service_id: service.id,
      business_id: resolvedBusinessId,
      name: service.name,
      status: serviceStatus,
      api_verified: apiVerified,
      verify_error: verifyError,
      actions: serviceActions.map((a) => ({
        name: a.name,
        method: a.method,
        path: a.path,
        description: a.description,
      })),
      mcp_tool_names: mcpToolNames,
      cost_per_call: service.cost_per_call,
      cost_model: service.cost_model,
      category: service.category,
      payment_preference: payment_preference || 'gateway',
      created_at: service.created_at,
      message: apiVerified
        ? 'Service connected and verified. Ready for agent calls.'
        : `Service created but API verification failed: ${verifyError}. Status set to "pending". Use /api/v1/gateway/activate to retry.`,
    }, { status: 201 })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[gateway/connect] Unexpected error:', err instanceof Error ? err.message : err)
    logError(
      '/api/v1/gateway/connect',
      'POST',
      err instanceof Error ? err : new Error(String(err)),
      request.headers.get('x-request-id') || undefined
    )
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
