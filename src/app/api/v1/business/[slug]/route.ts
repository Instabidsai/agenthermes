import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = getServiceClient()

    // Fetch business with services and audit results
    const { data: business, error: bizError } = await supabase
      .from('businesses')
      .select('*, services(*), audit_results(*)')
      .eq('slug', slug)
      .single()

    if (bizError || !business) {
      if (bizError?.code === 'PGRST116') {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
      }
      return NextResponse.json(
        { error: bizError?.message || 'Business not found' },
        { status: bizError ? 500 : 404 }
      )
    }

    // Get connections count
    const { count: connectionCount } = await supabase
      .from('connections')
      .select('*', { count: 'exact', head: true })
      .or(`business_a_id.eq.${business.id},business_b_id.eq.${business.id}`)

    // Get transaction volume (sum of completed transactions where this business is seller)
    const { data: walletData } = await supabase
      .from('agent_wallets')
      .select('id')
      .eq('business_id', business.id)

    let transactionVolume = 0
    let transactionCount = 0

    if (walletData && walletData.length > 0) {
      const walletIds = walletData.map((w) => w.id)
      const { data: txns } = await supabase
        .from('transactions')
        .select('amount')
        .in('seller_wallet_id', walletIds)
        .eq('status', 'completed')

      if (txns) {
        transactionCount = txns.length
        transactionVolume = txns.reduce((sum, t) => sum + (t.amount || 0), 0)
      }
    }

    return NextResponse.json({
      ...business,
      connections_count: connectionCount ?? 0,
      transaction_volume: transactionVolume,
      transaction_count: transactionCount,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
