import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { getBusinessBySlug } from '@/lib/business'
import { requireAuth } from '@/lib/auth'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[services] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    const supabase = getServiceClient()
    const { data: services, error: svcError } = await supabase
      .from('services')
      .select('*')
      .eq('business_id', business.id)
      .order('created_at', { ascending: false })

    if (svcError) {
      console.error('[services] Query error:', svcError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ services: services || [] })
  } catch (err) {
    console.error('[services] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()

    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[services] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    const { name, description, pricing_model, price_per_call, mcp_endpoint, auth_type } = body

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      )
    }

    const validPricingModels = ['per_call', 'monthly', 'per_unit', 'custom']
    if (pricing_model && !validPricingModels.includes(pricing_model)) {
      return NextResponse.json(
        { error: `pricing_model must be one of: ${validPricingModels.join(', ')}` },
        { status: 400 }
      )
    }

    const validAuthTypes = ['api_key', 'oauth', 'jwt', 'none']
    if (auth_type && !validAuthTypes.includes(auth_type)) {
      return NextResponse.json(
        { error: `auth_type must be one of: ${validAuthTypes.join(', ')}` },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()
    const { data: service, error: insertError } = await supabase
      .from('services')
      .insert({
        business_id: business.id,
        name: name.trim(),
        description: description || null,
        pricing_model: pricing_model || 'per_call',
        price_per_call: typeof price_per_call === 'number' ? price_per_call : 0,
        mcp_endpoint: mcp_endpoint || null,
        auth_required: auth_type && auth_type !== 'none' ? true : false,
        auth_type: auth_type || 'none',
        calls_total: 0,
        calls_last_30d: 0,
        avg_response_ms: 0,
        uptime_pct: 100,
        status: 'active',
      } as any)
      .select()
      .single()

    if (insertError) {
      console.error('[services] Insert error:', insertError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json(service, { status: 201 })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[services] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { slug } = await params
    const body = await request.json()

    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[services] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    const { service_id, name, description, pricing_model, price_per_call, mcp_endpoint, auth_type, status } = body

    if (!service_id || typeof service_id !== 'string') {
      return NextResponse.json({ error: 'service_id is required' }, { status: 400 })
    }

    // Build update object with only provided fields
    const updates: Record<string, unknown> = {}

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'name must be a non-empty string' }, { status: 400 })
      }
      updates.name = name.trim()
    }

    if (description !== undefined) {
      updates.description = description || null
    }

    if (pricing_model !== undefined) {
      const validPricingModels = ['per_call', 'monthly', 'per_unit', 'custom']
      if (!validPricingModels.includes(pricing_model)) {
        return NextResponse.json(
          { error: `pricing_model must be one of: ${validPricingModels.join(', ')}` },
          { status: 400 }
        )
      }
      updates.pricing_model = pricing_model
    }

    if (price_per_call !== undefined) {
      if (typeof price_per_call !== 'number' || price_per_call < 0) {
        return NextResponse.json({ error: 'price_per_call must be a non-negative number' }, { status: 400 })
      }
      updates.price_per_call = price_per_call
    }

    if (mcp_endpoint !== undefined) {
      updates.mcp_endpoint = mcp_endpoint || null
    }

    if (auth_type !== undefined) {
      const validAuthTypes = ['api_key', 'oauth', 'jwt', 'none']
      if (!validAuthTypes.includes(auth_type)) {
        return NextResponse.json(
          { error: `auth_type must be one of: ${validAuthTypes.join(', ')}` },
          { status: 400 }
        )
      }
      updates.auth_type = auth_type
      updates.auth_required = auth_type !== 'none'
    }

    if (status !== undefined) {
      const validStatuses = ['active', 'inactive', 'deprecated']
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

    // Verify the service belongs to this business
    const { data: existing, error: checkErr } = await supabase
      .from('services')
      .select('id, business_id')
      .eq('id', service_id)
      .single()

    if (checkErr || !existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    if ((existing as any).business_id !== business.id) {
      return NextResponse.json({ error: 'Service does not belong to this business' }, { status: 403 })
    }

    const { data: updated, error: updateError } = await (supabase
      .from('services') as any)
      .update(updates)
      .eq('id', service_id)
      .select()
      .single()

    if (updateError) {
      console.error('[services] Update error:', updateError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[services] PATCH unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { slug } = await params

    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[services] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    // Accept service_id from body or query param
    let serviceId: string | null = null
    try {
      const body = await request.json()
      serviceId = body.service_id
    } catch {
      // Try query param
      serviceId = request.nextUrl.searchParams.get('service_id')
    }

    if (!serviceId || typeof serviceId !== 'string') {
      return NextResponse.json({ error: 'service_id is required' }, { status: 400 })
    }

    const supabase = getServiceClient()

    // Verify the service belongs to this business
    const { data: existing, error: checkErr } = await supabase
      .from('services')
      .select('id, business_id')
      .eq('id', serviceId)
      .single()

    if (checkErr || !existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    if ((existing as any).business_id !== business.id) {
      return NextResponse.json({ error: 'Service does not belong to this business' }, { status: 403 })
    }

    const { error: deleteError } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId)

    if (deleteError) {
      console.error('[services] Delete error:', deleteError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Service deleted', service_id: serviceId })
  } catch (err) {
    console.error('[services] DELETE unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
