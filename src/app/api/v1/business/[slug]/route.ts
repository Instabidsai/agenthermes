import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'
import { trackEvent } from '@/lib/analytics'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Validate slug format
    if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const supabase = getServiceClient()

    // Fetch business with services and audit results (exclude sensitive fields)
    const { data: businessRaw, error: bizError } = await supabase
      .from('businesses')
      .select('id, name, slug, domain, description, logo_url, audit_score, audit_tier, trust_score, vertical, capabilities, mcp_endpoints, pricing_visible, agent_onboarding, a2a_agent_card, created_at, updated_at, services(*), audit_results(*)')
      .eq('slug', slug)
      .single()
    const business = businessRaw as any

    if (bizError || !business) {
      if (bizError?.code === 'PGRST116' || !business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
      }
      console.error('[business/slug] Query error:', bizError!.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    // Get connections count
    const { count: connectionCount } = await supabase
      .from('connections')
      .select('*', { count: 'exact', head: true })
      .or(`business_a_id.eq.${business.id},business_b_id.eq.${business.id}`)

    // Get transaction volume (sum of completed transactions where this business is seller)
    const { data: walletDataRaw } = await supabase
      .from('agent_wallets')
      .select('id')
      .eq('business_id', business.id)
    const walletData = (walletDataRaw || []) as any[]

    let transactionVolume = 0
    let transactionCount = 0

    if (walletData.length > 0) {
      const walletIds = walletData.map((w: any) => w.id)
      const { data: txnsRaw } = await supabase
        .from('transactions')
        .select('amount')
        .in('seller_wallet_id', walletIds)
        .eq('status', 'completed')
      const txns = (txnsRaw || []) as any[]

      if (txns.length > 0) {
        transactionCount = txns.length
        transactionVolume = txns.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
      }
    }

    // Track profile view (fire-and-forget)
    trackEvent(business.id, 'profile_view', {
      agent_id: _request.headers.get('x-agent-id') || undefined,
      source: 'api',
    })

    return NextResponse.json({
      ...business,
      connections_count: connectionCount ?? 0,
      transaction_volume: transactionVolume,
      transaction_count: transactionCount,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=120',
      },
    })
  } catch (err) {
    console.error('[business/slug] Unexpected error:', err instanceof Error ? err.message : err)
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

    if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const body = await request.json()
    const { name, description, domain, vertical, capabilities, logo_url } = body

    // Build update object with only provided fields
    const updates: Record<string, unknown> = {}

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'name must be a non-empty string' }, { status: 400 })
      }
      if (name.length > 200) {
        return NextResponse.json({ error: 'name must be 200 characters or less' }, { status: 400 })
      }
      updates.name = name.trim()
    }

    if (description !== undefined) {
      if (description !== null && typeof description !== 'string') {
        return NextResponse.json({ error: 'description must be a string or null' }, { status: 400 })
      }
      updates.description = description
    }

    if (domain !== undefined) {
      if (domain !== null && (typeof domain !== 'string' || !/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(domain))) {
        return NextResponse.json({ error: 'Invalid domain format' }, { status: 400 })
      }
      updates.domain = domain
    }

    if (vertical !== undefined) {
      if (vertical !== null && typeof vertical !== 'string') {
        return NextResponse.json({ error: 'vertical must be a string or null' }, { status: 400 })
      }
      updates.vertical = vertical
    }

    if (capabilities !== undefined) {
      if (!Array.isArray(capabilities)) {
        return NextResponse.json({ error: 'capabilities must be an array' }, { status: 400 })
      }
      updates.capabilities = capabilities
    }

    if (logo_url !== undefined) {
      if (logo_url !== null && typeof logo_url !== 'string') {
        return NextResponse.json({ error: 'logo_url must be a string or null' }, { status: 400 })
      }
      updates.logo_url = logo_url
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    updates.updated_at = new Date().toISOString()

    const supabase = getServiceClient()

    const { data: updated, error: updateError } = await (supabase
      .from('businesses') as any)
      .update(updates)
      .eq('slug', slug)
      .select()
      .single()

    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
      }
      console.error('[business/slug] Update error:', updateError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[business/slug] PATCH unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
