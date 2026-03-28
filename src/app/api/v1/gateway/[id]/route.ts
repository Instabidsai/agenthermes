import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'
import { encryptCredentials } from '@/lib/gateway/vault'
import type { ServiceAction } from '@/lib/gateway/types'

/**
 * GET /api/v1/gateway/:id
 * Get a single gateway service with its actions. Public endpoint.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: 'Invalid service ID format' }, { status: 400 })
    }

    const supabase = getServiceClient()

    const { data, error } = await supabase
      .from('gateway_services')
      .select('id, name, description, api_base_url, auth_type, actions, cost_per_call, cost_model, our_margin, rate_limit_per_min, category, status, uptime_pct, last_health_check, created_at')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Gateway service not found' }, { status: 404 })
      }
      console.error('[gateway/id] Query error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Gateway service not found' }, { status: 404 })
    }

    const service = data as Record<string, unknown>
    const actions = (service.actions || []) as ServiceAction[]

    return NextResponse.json({
      ...service,
      action_count: actions.length,
      actions: actions.map((a) => ({
        name: a.name,
        method: a.method,
        path: a.path,
        description: a.description,
        params_schema: a.params_schema || null,
        cost_override: a.cost_override ?? null,
      })),
    }, {
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=60',
      },
    })
  } catch (err) {
    console.error('[gateway/id] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PATCH /api/v1/gateway/:id
 * Update a gateway service. Auth required.
 * Body: any subset of { name, description, api_base_url, auth_type, auth_header, credentials, actions, cost_per_call, cost_model, our_margin, rate_limit_per_min, category, status }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { id } = await params

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: 'Invalid service ID format' }, { status: 400 })
    }

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
      status,
    } = body

    const updates: Record<string, unknown> = {}

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'name must be a non-empty string' }, { status: 400 })
      }
      updates.name = name.trim()
    }

    if (description !== undefined) {
      updates.description = description
    }

    if (api_base_url !== undefined) {
      if (typeof api_base_url !== 'string' || api_base_url.trim().length === 0) {
        return NextResponse.json({ error: 'api_base_url must be a non-empty string' }, { status: 400 })
      }
      if (process.env.NODE_ENV === 'production' && !api_base_url.startsWith('https://')) {
        return NextResponse.json({ error: 'api_base_url must use HTTPS' }, { status: 400 })
      }
      updates.api_base_url = api_base_url.trim()
    }

    if (auth_type !== undefined) {
      const validAuthTypes = ['bearer', 'api_key_header', 'basic', 'oauth', 'query_param', 'none']
      if (!validAuthTypes.includes(auth_type)) {
        return NextResponse.json(
          { error: `auth_type must be one of: ${validAuthTypes.join(', ')}` },
          { status: 400 }
        )
      }
      updates.auth_type = auth_type
    }

    if (auth_header !== undefined) {
      updates.auth_header = auth_header
    }

    if (credentials !== undefined && typeof credentials === 'object' && Object.keys(credentials).length > 0) {
      updates.encrypted_credentials = encryptCredentials(credentials as Record<string, string>)
    }

    if (actions !== undefined) {
      if (!Array.isArray(actions)) {
        return NextResponse.json({ error: 'actions must be an array' }, { status: 400 })
      }
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i] as ServiceAction
        if (!action.name || !action.method || !action.path) {
          return NextResponse.json(
            { error: `actions[${i}] requires name, method, and path` },
            { status: 400 }
          )
        }
      }
      updates.actions = actions
    }

    if (cost_per_call !== undefined) updates.cost_per_call = cost_per_call
    if (cost_model !== undefined) updates.cost_model = cost_model
    if (our_margin !== undefined) updates.our_margin = our_margin
    if (rate_limit_per_min !== undefined) updates.rate_limit_per_min = rate_limit_per_min
    if (category !== undefined) updates.category = category

    if (status !== undefined) {
      const validStatuses = ['active', 'inactive', 'maintenance']
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: `status must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        )
      }
      updates.status = status
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const supabase = getServiceClient()

    const { data, error } = await (supabase
      .from('gateway_services') as any)
      .update(updates)
      .eq('id', id)
      .select('id, name, description, api_base_url, auth_type, actions, cost_per_call, cost_model, our_margin, rate_limit_per_min, category, status, created_at')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Gateway service not found' }, { status: 404 })
      }
      console.error('[gateway/id] Update error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[gateway/id] PATCH unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/v1/gateway/:id
 * Soft-delete (deactivate) a gateway service. Auth required.
 * Sets status to 'inactive' rather than actually deleting.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { id } = await params

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: 'Invalid service ID format' }, { status: 400 })
    }

    const supabase = getServiceClient()

    const { data, error } = await (supabase
      .from('gateway_services') as any)
      .update({ status: 'inactive' })
      .eq('id', id)
      .select('id, name, status')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Gateway service not found' }, { status: 404 })
      }
      console.error('[gateway/id] Delete error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Service deactivated', service: data })
  } catch (err) {
    console.error('[gateway/id] DELETE unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
