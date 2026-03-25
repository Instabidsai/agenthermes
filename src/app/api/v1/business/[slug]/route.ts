import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

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

    return NextResponse.json({
      ...business,
      connections_count: connectionCount ?? 0,
      transaction_volume: transactionVolume,
      transaction_count: transactionCount,
    })
  } catch (err) {
    console.error('[business/slug] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
