import Stripe from 'stripe'
import { getServiceClient } from '@/lib/supabase'

// --- Stripe client initialization (gracefully handles missing key) ---

let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
  if (stripeClient) return stripeClient

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. Stripe operations are unavailable.'
    )
  }

  stripeClient = new Stripe(key, { apiVersion: '2026-02-25.clover' })
  return stripeClient
}

/**
 * Check whether Stripe is configured and available.
 */
export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY
}

// -------------------------------------------------------------------------
// Stripe Connect helpers
// -------------------------------------------------------------------------

/**
 * Create a Stripe Connect Express account for a business.
 * Stores the resulting account ID in the businesses table.
 */
export async function createConnectAccount(business: {
  id: string
  name: string
  owner_email: string | null
  domain: string | null
}) {
  const stripe = getStripe()

  const account = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    email: business.owner_email ?? undefined,
    business_type: 'company',
    company: {
      name: business.name,
    },
    capabilities: {
      transfers: { requested: true },
    },
    metadata: {
      agenthermes_business_id: business.id,
      domain: business.domain ?? '',
    },
  })

  // Persist the connect ID
  const supabase = getServiceClient()
  await (supabase
    .from('businesses') as any)
    .update({ stripe_connect_id: account.id })
    .eq('id', business.id)

  return account
}

/**
 * Generate a Stripe Connect onboarding link so the business owner
 * can complete their account setup.
 */
export async function createAccountLink(
  accountId: string,
  businessSlug: string
) {
  const stripe = getStripe()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3013'

  const link = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${baseUrl}/business/${businessSlug}/connect/refresh`,
    return_url: `${baseUrl}/business/${businessSlug}/connect/complete`,
    type: 'account_onboarding',
  })

  return link
}

/**
 * Wallet-to-wallet transfer.
 *
 * Flow:
 *  1. Validate both wallets exist and are active.
 *  2. Check buyer has sufficient balance.
 *  3. Create a pending transaction row.
 *  4. Execute the Stripe transfer (if both wallets have connect accounts).
 *  5. Update balances and mark transaction completed.
 *
 * If Stripe is not configured, falls back to ledger-only mode.
 */
export async function transferFunds(
  fromWalletId: string,
  toWalletId: string,
  amount: number,
  description: string,
  extra?: { agent_id?: string; task_context?: string; service_id?: string }
) {
  const supabase = getServiceClient()

  // Fetch wallets
  const { data: fromWalletRaw, error: fwErr } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('id', fromWalletId)
    .single()
  const fromWallet = fromWalletRaw as any

  if (fwErr || !fromWallet) throw new Error('Source wallet not found')
  if (fromWallet.status !== 'active') throw new Error('Source wallet is not active')

  const { data: toWalletRaw, error: twErr } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('id', toWalletId)
    .single()
  const toWallet = toWalletRaw as any

  if (twErr || !toWallet) throw new Error('Destination wallet not found')
  if (toWallet.status !== 'active') throw new Error('Destination wallet is not active')

  if (fromWallet.balance < amount) {
    throw new Error(
      `Insufficient balance: wallet has $${fromWallet.balance}, transfer requires $${amount}`
    )
  }

  // Create pending transaction
  const { data: txnRaw, error: txnErr } = await supabase
    .from('transactions')
    .insert({
      buyer_wallet_id: fromWalletId,
      seller_wallet_id: toWalletId,
      amount,
      service_description: description,
      service_id: extra?.service_id ?? null,
      agent_id: extra?.agent_id ?? null,
      task_context: extra?.task_context ?? null,
      status: 'pending',
    } as any)
    .select()
    .single()
  const txn = txnRaw as any

  if (txnErr || !txn) throw new Error('Failed to create transaction record')

  let stripeTransferId: string | null = null

  // Attempt Stripe transfer if both accounts have Connect IDs
  if (
    isStripeConfigured() &&
    fromWallet.stripe_connect_id &&
    toWallet.stripe_connect_id
  ) {
    try {
      const stripe = getStripe()
      const transfer = await stripe.transfers.create({
        amount: Math.round(amount * 100), // cents
        currency: 'usd',
        destination: toWallet.stripe_connect_id,
        description,
        metadata: {
          transaction_id: txn.id,
          from_wallet: fromWalletId,
          to_wallet: toWalletId,
        },
      })
      stripeTransferId = transfer.id
    } catch (stripeErr) {
      // Mark transaction failed
      await (supabase
        .from('transactions') as any)
        .update({ status: 'failed' })
        .eq('id', txn.id)
      throw stripeErr
    }
  }

  // Update balances atomically (prevents race conditions)
  const { error: transferErr } = await supabase
    .rpc('atomic_transfer' as any, {
      p_from_id: fromWalletId,
      p_to_id: toWalletId,
      p_amount: amount,
    } as any)

  if (transferErr) {
    // Mark transaction failed if atomic transfer fails
    await (supabase
      .from('transactions') as any)
      .update({ status: 'failed' })
      .eq('id', txn.id)
    throw new Error(transferErr.message.includes('Insufficient balance')
      ? 'Insufficient balance'
      : `Transfer failed: ${transferErr.message}`)
  }

  // Mark completed
  await (supabase
    .from('transactions') as any)
    .update({
      status: 'completed',
      stripe_transfer_id: stripeTransferId,
    })
    .eq('id', txn.id)

  return { ...txn, status: 'completed', stripe_transfer_id: stripeTransferId }
}

/**
 * Get the balance for a Stripe Connect account.
 * Falls back to local ledger balance if Stripe is unavailable.
 */
export async function getBalance(accountId: string) {
  if (!isStripeConfigured()) {
    // Fallback: return ledger balance from Supabase
    const supabase = getServiceClient()
    const { data: balanceData } = await supabase
      .from('agent_wallets')
      .select('balance')
      .eq('stripe_connect_id', accountId)
      .single()
    const balanceRow = balanceData as any
    return {
      available: [{ amount: Math.round((balanceRow?.balance ?? 0) * 100), currency: 'usd' }],
      pending: [{ amount: 0, currency: 'usd' }],
      source: 'ledger',
    }
  }

  const stripe = getStripe()
  const balance = await stripe.balance.retrieve({
    stripeAccount: accountId,
  })
  return { ...balance, source: 'stripe' }
}
