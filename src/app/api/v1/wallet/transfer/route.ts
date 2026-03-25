import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { transferFunds } from '@/lib/stripe'
import { postLearning } from '@/lib/hive-brain'
import { requireAuth } from '@/lib/auth'

/**
 * POST /api/v1/wallet/transfer
 *
 * Transfer funds between two business wallets.
 *
 * Body: {
 *   from_business_id: string,
 *   to_business_id: string,
 *   amount: number,
 *   service_description: string,
 *   agent_id?: string,
 *   task_context?: string,
 *   service_id?: string
 * }
 */
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const {
      from_business_id,
      to_business_id,
      amount,
      service_description,
      agent_id,
      task_context,
      service_id,
    } = body

    // Validation
    if (!from_business_id || typeof from_business_id !== 'string') {
      return NextResponse.json(
        { error: 'from_business_id is required' },
        { status: 400 }
      )
    }
    if (!to_business_id || typeof to_business_id !== 'string') {
      return NextResponse.json(
        { error: 'to_business_id is required' },
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
    if (!service_description || typeof service_description !== 'string') {
      return NextResponse.json(
        { error: 'service_description is required' },
        { status: 400 }
      )
    }
    if (from_business_id === to_business_id) {
      return NextResponse.json(
        { error: 'Cannot transfer to the same business' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Look up wallets by business_id
    const { data: fromWalletRaw, error: fromErr } = await supabase
      .from('agent_wallets')
      .select('*')
      .eq('business_id', from_business_id)
      .maybeSingle()
    const fromWallet = fromWalletRaw as any

    if (fromErr) {
      console.error('[wallet/transfer] Error fetching source wallet:', fromErr.message)
      return NextResponse.json(
        { error: 'Failed to look up source wallet' },
        { status: 500 }
      )
    }

    if (!fromWallet) {
      return NextResponse.json(
        { error: 'Source business does not have a wallet' },
        { status: 404 }
      )
    }

    const { data: toWalletRaw, error: toErr } = await supabase
      .from('agent_wallets')
      .select('*')
      .eq('business_id', to_business_id)
      .maybeSingle()
    const toWallet = toWalletRaw as any

    if (toErr) {
      console.error('[wallet/transfer] Error fetching destination wallet:', toErr.message)
      return NextResponse.json(
        { error: 'Failed to look up destination wallet' },
        { status: 500 }
      )
    }

    if (!toWallet) {
      return NextResponse.json(
        { error: 'Destination business does not have a wallet' },
        { status: 404 }
      )
    }

    // Execute transfer
    const transaction = await transferFunds(
      fromWallet.id,
      toWallet.id,
      amount,
      service_description,
      { agent_id, task_context, service_id }
    )

    // Post learning to Hive Brain about the completed transaction
    try {
      await postLearning(
        agent_id || 'agenthermes-system',
        'AgentHermes',
        `Transaction completed: $${amount.toFixed(2)} from business ${from_business_id} to ${to_business_id} for "${service_description}"`
      )
    } catch {
      // Non-critical — don't fail the transfer if Hive Brain is unreachable
      console.warn('[wallet/transfer] Failed to post learning to Hive Brain')
    }

    return NextResponse.json({
      transaction,
      message: `Successfully transferred $${amount.toFixed(2)}`,
    })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    const rawMessage = err instanceof Error ? err.message : 'Internal server error'
    // Distinguish between user errors (safe to expose) and server errors
    const isUserError = rawMessage.includes('Insufficient balance') ||
      rawMessage.includes('not active') ||
      rawMessage.includes('not found')
    if (isUserError) {
      return NextResponse.json({ error: rawMessage }, { status: 400 })
    }
    console.error('[wallet/transfer] Unexpected error:', rawMessage)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
