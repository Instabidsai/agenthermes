import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { isStripeConfigured } from '@/lib/stripe'

/**
 * POST /api/v1/wallet/fund
 *
 * Add funds to a business's wallet.
 * When Stripe is configured, this would create a PaymentIntent.
 * For now it operates in ledger-only mode (adds balance directly).
 *
 * Body: { business_id: string, amount: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { business_id, amount } = body

    if (!business_id || typeof business_id !== 'string') {
      return NextResponse.json(
        { error: 'business_id is required' },
        { status: 400 }
      )
    }

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'amount must be a positive number' },
        { status: 400 }
      )
    }

    if (amount > 10000) {
      return NextResponse.json(
        { error: 'amount cannot exceed $10,000' },
        { status: 400 }
      )
    }

    if (Math.round(amount * 100) / 100 !== amount) {
      return NextResponse.json(
        { error: 'amount must have at most 2 decimal places' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Get or create wallet
    const { data: walletRaw, error: walletErr } = await supabase
      .from('agent_wallets')
      .select('*')
      .eq('business_id', business_id)
      .maybeSingle()
    let wallet = walletRaw as any

    if (walletErr) {
      console.error('[wallet/fund] Wallet fetch error:', walletErr.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    if (!wallet) {
      // Auto-create wallet for the business
      const { data: newWallet, error: createErr } = await supabase
        .from('agent_wallets')
        .insert({
          business_id,
          balance: 0,
          auto_reload_threshold: 10,
          auto_reload_amount: 100,
          status: 'active',
        } as any)
        .select()
        .single()

      if (createErr || !newWallet) {
        console.error('[wallet/fund] Wallet create error:', createErr?.message)
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        )
      }
      wallet = newWallet as any
    }

    if (isStripeConfigured() && wallet.stripe_connect_id) {
      // TODO: Create a Stripe PaymentIntent for real payment processing
      // For now, fall through to ledger-only mode
      console.log(
        `[wallet/fund] Stripe is configured but PaymentIntent creation is a placeholder. Falling back to ledger mode.`
      )
    }

    // Ledger-only mode: atomically credit the wallet (prevents race conditions)
    const { data: newBalance, error: rpcErr } = await supabase
      .rpc('atomic_fund' as any, {
        p_wallet_id: wallet.id,
        p_amount: amount,
      } as any)

    if (rpcErr) {
      console.error('[wallet/fund] Atomic fund error:', rpcErr.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    // Fetch the updated wallet for the response
    const { data: updated } = await supabase
      .from('agent_wallets')
      .select('*')
      .eq('id', wallet.id)
      .single()

    return NextResponse.json({
      wallet: updated,
      funded_amount: amount,
      new_balance: newBalance,
      mode: isStripeConfigured() ? 'stripe_placeholder' : 'ledger',
      message: `Successfully added $${amount.toFixed(2)} to wallet`,
    })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[wallet/fund] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
