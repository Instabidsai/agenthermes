import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServiceClient } from '@/lib/supabase'
import { getStripe } from '@/lib/stripe'

// Stripe webhook handler
// Verifies signature using STRIPE_WEBHOOK_SECRET. Rejects all requests when secret is not configured.

export async function POST(request: NextRequest) {
  let stripe: Stripe
  try {
    stripe = getStripe()
  } catch {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 503 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 503 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    if (!signature) {
      throw new Error('Missing stripe-signature header')
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] Signature error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
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
        const { data: existingWalletRaw } = await supabase
          .from('agent_wallets')
          .select('id')
          .eq('business_id', businessId)
          .maybeSingle()
        const existingWallet = existingWalletRaw as any

        if (existingWallet) {
          const { error: updateErr } = await (supabase
            .from('agent_wallets') as any)
            .update({
              stripe_connect_id: account.id,
              status: walletStatus,
            })
            .eq('id', existingWallet.id)
          if (updateErr) {
            console.error('[stripe-webhook] Failed to update wallet:', updateErr.message)
          }
        } else {
          const { error: insertErr } = await supabase.from('agent_wallets').insert({
            business_id: businessId,
            stripe_connect_id: account.id,
            balance: 0,
            auto_reload_threshold: 10,
            auto_reload_amount: 100,
            status: walletStatus,
          } as any)
          if (insertErr) {
            console.error('[stripe-webhook] Failed to insert wallet:', insertErr.message)
          }
        }

        // Also update the business row
        const { error: bizUpdateErr } = await (supabase
          .from('businesses') as any)
          .update({ stripe_connect_id: account.id })
          .eq('id', businessId)
        if (bizUpdateErr) {
          console.error('[stripe-webhook] Failed to update business:', bizUpdateErr.message)
        }

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
          const { error: txnUpdateErr } = await (supabase
            .from('transactions') as any)
            .update({
              status: 'completed',
              stripe_transfer_id: transfer.id,
            })
            .eq('id', transactionId)
          if (txnUpdateErr) {
            console.error(`[stripe-webhook] Failed to update transaction ${transactionId}:`, txnUpdateErr.message)
          }

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
    console.error(`[stripe-webhook] Error processing ${event.type}:`, err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
