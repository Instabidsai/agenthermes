import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { getBusinessBySlug } from '@/lib/business'

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
