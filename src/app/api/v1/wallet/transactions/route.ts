import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'

/**
 * GET /api/v1/wallet/transactions?business_id=...
 *
 * Returns paginated transactions where the business is buyer OR seller.
 * Joins with businesses for names.
 *
 * Query params:
 *   business_id — required
 *   limit       — results per page (max 100, default 20)
 *   offset      — pagination offset
 */
export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = request.nextUrl
    const businessId = searchParams.get('business_id')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    if (!businessId) {
      return NextResponse.json(
        { error: 'business_id query parameter is required' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // First, find all wallet IDs belonging to this business
    const { data: walletsRaw, error: walletErr } = await supabase
      .from('agent_wallets')
      .select('id')
      .eq('business_id', businessId)
    const wallets = (walletsRaw || []) as any[]

    if (walletErr) {
      console.error('[wallet/transactions] Wallet lookup error:', walletErr.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    if (wallets.length === 0) {
      return NextResponse.json({
        transactions: [],
        pagination: { total: 0, limit, offset, has_more: false },
      })
    }

    const walletIds = wallets.map((w: any) => w.id)

    // Fetch transactions where business is buyer OR seller
    // We need two queries since Supabase .or() with .in() is tricky
    const { data: txnsRaw, error: txnErr, count } = await supabase
      .from('transactions')
      .select('*', { count: 'exact' })
      .or(`buyer_wallet_id.in.(${walletIds.join(',')}),seller_wallet_id.in.(${walletIds.join(',')})`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (txnErr) {
      console.error('[wallet/transactions] Query error:', txnErr.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const txns = (txnsRaw || []) as any[]

    // Collect all unique wallet IDs to resolve business names
    const allWalletIds = new Set<string>()
    for (const txn of txns) {
      if (txn.buyer_wallet_id) allWalletIds.add(txn.buyer_wallet_id)
      if (txn.seller_wallet_id) allWalletIds.add(txn.seller_wallet_id)
    }

    // Look up wallet -> business mapping
    let walletBusinessMap: Record<string, { business_id: string; business_name: string }> = {}
    if (allWalletIds.size > 0) {
      const { data: walletBizRaw } = await supabase
        .from('agent_wallets')
        .select('id, business_id, businesses(name)')
        .in('id', Array.from(allWalletIds))
      const walletBiz = (walletBizRaw || []) as any[]

      for (const wb of walletBiz) {
        walletBusinessMap[wb.id] = {
          business_id: wb.business_id,
          business_name: wb.businesses?.name || 'Unknown',
        }
      }
    }

    // Enrich transactions with business names
    const transactions = txns.map((txn: any) => ({
      ...txn,
      buyer: walletBusinessMap[txn.buyer_wallet_id] || null,
      seller: walletBusinessMap[txn.seller_wallet_id] || null,
      direction: walletIds.includes(txn.buyer_wallet_id) ? 'outgoing' : 'incoming',
    }))

    return NextResponse.json({
      transactions,
      pagination: {
        total: count ?? 0,
        limit,
        offset,
        has_more: (count ?? 0) > offset + limit,
      },
    })
  } catch (err) {
    console.error('[wallet/transactions] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
