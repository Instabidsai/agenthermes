import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServiceClient } from '@/lib/supabase'

// Stripe webhook handler
// Verifies signature when STRIPE_WEBHOOK_SECRET is set, otherwise accepts raw body.

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, { apiVersion: '2026-02-25.clover' })
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()

  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 503 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } else {
      // No webhook secret configured — parse raw (development mode)
      console.warn(
        '[stripe-webhook] STRIPE_WEBHOOK_SECRET not set — skipping signature verification'
      )
      event = JSON.parse(body) as Stripe.Event
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed'
    console.error('[stripe-webhook] Signature error:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = getServiceClient()

  try {
    switch (event.type) {
      // ---------------------------------------------------------------
      // account.updated — sync Connect account status to agent_wallets
      // ---------------------------------------------------------------
      case 'account.updated': {
        const account = event.data.object as Stripe.Account
        const businessId = account.metadata?.agenthermes_business_id

        if (!businessId) {
          console.warn(
            `[stripe-webhook] account.updated for ${account.id} — no agenthermes_business_id in metadata`
          )
          break
        }

        // Determine wallet status from account status
        const chargesEnabled = account.charges_enabled
        const payoutsEnabled = account.payouts_enabled
        let walletStatus: 'active' | 'frozen' = 'frozen'
        if (chargesEnabled && payoutsEnabled) {
          walletStatus = 'active'
        }

        // Upsert the wallet row
        const { data: existingWallet } = await supabase
          .from('agent_wallets')
          .select('id')
          .eq('business_id', businessId)
          .maybeSingle()

        if (existingWallet) {
          await supabase
            .from('agent_wallets')
            .update({
              stripe_connect_id: account.id,
              status: walletStatus,
            })
            .eq('id', existingWallet.id)
        } else {
          await supabase.from('agent_wallets').insert({
            business_id: businessId,
            stripe_connect_id: account.id,
            balance: 0,
            auto_reload_threshold: 10,
            auto_reload_amount: 100,
            status: walletStatus,
          })
        }

        // Also update the business row
        await supabase
          .from('businesses')
          .update({ stripe_connect_id: account.id })
          .eq('id', businessId)

        console.log(
          `[stripe-webhook] account.updated: business=${businessId} status=${walletStatus}`
        )
        break
      }

      // ---------------------------------------------------------------
      // transfer.created — update transaction status
      // ---------------------------------------------------------------
      case 'transfer.created': {
        const transfer = event.data.object as Stripe.Transfer
        const transactionId = transfer.metadata?.transaction_id

        if (transactionId) {
          await supabase
            .from('transactions')
            .update({
              status: 'completed',
              stripe_transfer_id: transfer.id,
            })
            .eq('id', transactionId)

          console.log(
            `[stripe-webhook] transfer.created: txn=${transactionId} transfer=${transfer.id}`
          )
        } else {
          console.warn(
            `[stripe-webhook] transfer.created for ${transfer.id} — no transaction_id in metadata`
          )
        }
        break
      }

      default:
        console.log(`[stripe-webhook] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook processing error'
    console.error(`[stripe-webhook] Error processing ${event.type}:`, message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
