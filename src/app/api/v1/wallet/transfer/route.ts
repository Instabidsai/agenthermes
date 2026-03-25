import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { transferFunds } from '@/lib/stripe'
import { postLearning } from '@/lib/hive-brain'

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
    const { data: fromWallet } = await supabase
      .from('agent_wallets')
      .select('*')
      .eq('business_id', from_business_id)
      .maybeSingle()

    if (!fromWallet) {
      return NextResponse.json(
        { error: 'Source business does not have a wallet' },
        { status: 404 }
      )
    }

    const { data: toWallet } = await supabase
      .from('agent_wallets')
      .select('*')
      .eq('business_id', to_business_id)
      .maybeSingle()

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
    const message = err instanceof Error ? err.message : 'Internal server error'
    // Distinguish between user errors and server errors
    const status = message.includes('Insufficient balance') ||
      message.includes('not active') ||
      message.includes('not found')
      ? 400
      : 500
    return NextResponse.json({ error: message }, { status })
  }
}
