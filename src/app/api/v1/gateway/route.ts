import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'
import { encryptCredentials } from '@/lib/gateway/vault'
import type { ServiceAction } from '@/lib/gateway/types'

/**
 * GET /api/v1/gateway
 * List all active gateway services. Public endpoint.
 * Query params: ?category=ai&status=active
 */
export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category')
    const status = request.nextUrl.searchParams.get('status') || 'active'

    const supabase = getServiceClient()

    let query = supabase
      .from('gateway_services')
      .select('id, name, description, api_base_url, auth_type, actions, cost_per_call, cost_model, our_margin, rate_limit_per_min, category, status, uptime_pct, last_health_check, created_at')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('[gateway] List error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({
      services: data || [],
      count: (data || []).length,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=60',
      },
    })
  } catch (err) {
    console.error('[gateway] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/v1/gateway
 * Connect a new service to the gateway. Auth required.
 * Body: { name, description, api_base_url, auth_type, credentials, actions, cost_per_call, category, ... }
 */
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const {
      name,
      description,
      api_base_url,
      auth_type,
      auth_header,
      credentials,
      actions,
      cost_per_call,
      cost_model,
      our_margin,
      rate_limit_per_min,
      category,
      business_id,
    } = body

    // --- Validation ---
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }

    if (!api_base_url || typeof api_base_url !== 'string') {
      return NextResponse.json({ error: 'api_base_url is required' }, { status: 400 })
    }

    // Only allow HTTPS in production (SSRF protection)
    if (process.env.NODE_ENV === 'production' && !api_base_url.startsWith('https://')) {
      return NextResponse.json({ error: 'api_base_url must use HTTPS' }, { status: 400 })
    }

    const validAuthTypes = ['bearer', 'api_key_header', 'basic', 'oauth', 'query_param', 'none']
    if (!auth_type || !validAuthTypes.includes(auth_type)) {
      return NextResponse.json(
        { error: `auth_type must be one of: ${validAuthTypes.join(', ')}` },
        { status: 400 }
      )
    }

    if (actions !== undefined && !Array.isArray(actions)) {
      return NextResponse.json({ error: 'actions must be an array' }, { status: 400 })
    }

    // Validate each action if provided
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

    // Encrypt credentials if provided
    let encryptedCredentials: string | null = null
    if (credentials && typeof credentials === 'object' && Object.keys(credentials).length > 0) {
      encryptedCredentials = encryptCredentials(credentials as Record<string, string>)
    }

    const supabase = getServiceClient()

    // Check for duplicate name
    const { data: existing } = await supabase
      .from('gateway_services')
      .select('id')
      .eq('name', name.trim())
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: `A gateway service named "${name.trim()}" already exists` },
        { status: 409 }
      )
    }

    const { data, error } = await (supabase
      .from('gateway_services') as any)
      .insert({
        name: name.trim(),
        description: description || null,
        api_base_url: api_base_url.trim(),
        auth_type,
        auth_header: auth_header || 'Authorization',
        encrypted_credentials: encryptedCredentials,
        actions: actions || [],
        cost_per_call: cost_per_call ?? 0,
        cost_model: cost_model || 'per_call',
        our_margin: our_margin ?? 0.20,
        rate_limit_per_min: rate_limit_per_min ?? 60,
        category: category || null,
        business_id: business_id || null,
        status: 'active',
      })
      .select('id, name, description, api_base_url, auth_type, actions, cost_per_call, cost_model, our_margin, category, status, created_at')
      .single()

    if (error) {
      console.error('[gateway] Insert error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[gateway] POST unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
