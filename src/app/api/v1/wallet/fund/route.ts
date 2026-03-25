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

    const supabase = getServiceClient()

    // Get or create wallet
    let { data: wallet, error: walletErr } = await supabase
      .from('agent_wallets')
      .select('*')
      .eq('business_id', business_id)
      .maybeSingle()

    if (walletErr) {
      return NextResponse.json({ error: walletErr.message }, { status: 500 })
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
        })
        .select()
        .single()

      if (createErr || !newWallet) {
        return NextResponse.json(
          { error: createErr?.message || 'Failed to create wallet' },
          { status: 500 }
        )
      }
      wallet = newWallet
    }

    if (isStripeConfigured() && wallet.stripe_connect_id) {
      // TODO: Create a Stripe PaymentIntent for real payment processing
      // For now, fall through to ledger-only mode
      console.log(
        `[wallet/fund] Stripe is configured but PaymentIntent creation is a placeholder. Falling back to ledger mode.`
      )
    }

    // Ledger-only mode: directly credit the wallet
    const newBalance = (wallet.balance ?? 0) + amount

    const { data: updated, error: updateErr } = await supabase
      .from('agent_wallets')
      .update({ balance: newBalance })
      .eq('id', wallet.id)
      .select()
      .single()

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 })
    }

    return NextResponse.json({
      wallet: updated,
      funded_amount: amount,
      mode: isStripeConfigured() ? 'stripe_placeholder' : 'ledger',
      message: `Successfully added $${amount.toFixed(2)} to wallet`,
    })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
