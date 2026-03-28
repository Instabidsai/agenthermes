import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'

/**
 * GET /api/v1/wallet?business_id=...
 * Returns the wallet for a given business.
 */
export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const businessId = request.nextUrl.searchParams.get('business_id')

    if (!businessId) {
      return NextResponse.json(
        { error: 'business_id query parameter is required' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    const { data: wallet, error } = await supabase
      .from('agent_wallets')
      .select('id, business_id, balance, auto_reload_threshold, auto_reload_amount, status, created_at')
      .eq('business_id', businessId)
      .maybeSingle()

    if (error) {
      console.error('[wallet] Query error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    if (!wallet) {
      return NextResponse.json(
        { error: 'No wallet found for this business' },
        { status: 404 }
      )
    }

    return NextResponse.json(wallet)
  } catch (err) {
    console.error('[wallet] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
