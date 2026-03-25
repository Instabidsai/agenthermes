import Stripe from 'stripe'
import { getServiceClient } from '@/lib/supabase'

// --- Stripe client initialization (gracefully handles missing key) ---

let stripeClient: Stripe | null = null

function getStripe(): Stripe {
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
  await supabase
    .from('businesses')
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
  const { data: fromWallet, error: fwErr } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('id', fromWalletId)
    .single()

  if (fwErr || !fromWallet) throw new Error('Source wallet not found')
  if (fromWallet.status !== 'active') throw new Error('Source wallet is not active')

  const { data: toWallet, error: twErr } = await supabase
    .from('agent_wallets')
    .select('*')
    .eq('id', toWalletId)
    .single()

  if (twErr || !toWallet) throw new Error('Destination wallet not found')
  if (toWallet.status !== 'active') throw new Error('Destination wallet is not active')

  if (fromWallet.balance < amount) {
    throw new Error(
      `Insufficient balance: wallet has $${fromWallet.balance}, transfer requires $${amount}`
    )
  }

  // Create pending transaction
  const { data: txn, error: txnErr } = await supabase
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
    })
    .select()
    .single()

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
      await supabase
        .from('transactions')
        .update({ status: 'failed' })
        .eq('id', txn.id)
      throw stripeErr
    }
  }

  // Update balances (ledger)
  await supabase
    .from('agent_wallets')
    .update({ balance: fromWallet.balance - amount })
    .eq('id', fromWalletId)

  await supabase
    .from('agent_wallets')
    .update({ balance: toWallet.balance + amount })
    .eq('id', toWalletId)

  // Mark completed
  await supabase
    .from('transactions')
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
    const { data } = await supabase
      .from('agent_wallets')
      .select('balance')
      .eq('stripe_connect_id', accountId)
      .single()
    return {
      available: [{ amount: Math.round((data?.balance ?? 0) * 100), currency: 'usd' }],
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
