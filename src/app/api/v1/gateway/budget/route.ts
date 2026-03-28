import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * GET /api/v1/gateway/budget
 *
 * Return budget limits for a wallet.
 * Query params:
 *   wallet_id — required, UUID of the wallet
 *
 * Returns the budget configuration and current spend totals.
 */
export async function GET(request: NextRequest) {
  try {
    const walletId = request.nextUrl.searchParams.get('wallet_id')

    if (!walletId) {
      return NextResponse.json(
        { error: 'wallet_id query parameter is required' },
        { status: 400 }
      )
    }
    if (!UUID_RE.test(walletId)) {
      return NextResponse.json(
        { error: 'wallet_id must be a valid UUID' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Fetch wallet + budget info
    const { data: walletRaw, error: walletError } = await supabase
      .from('agent_wallets')
      .select('id, balance, status, budget_config')
      .eq('id', walletId)
      .single()

    if (walletError) {
      if (walletError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
      }
      console.error('[gateway/budget] Wallet query error:', walletError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const wallet = walletRaw as Record<string, unknown>

    // Default budget if none configured
    const defaultBudget = {
      max_per_transaction: 10.0,
      max_per_day: 100.0,
      max_per_service: 50.0,
      requires_approval_above: 5.0,
      auto_approved_services: [],
    }

    const budget = (wallet.budget_config as Record<string, unknown>) || defaultBudget

    // Calculate today's spend from gateway_usage
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { data: usageRaw, error: usageError } = await supabase
      .from('gateway_usage')
      .select('cost, margin, service_id')
      .eq('agent_wallet_id', walletId)
      .eq('success', true)
      .gte('created_at', todayStart.toISOString())

    if (usageError) {
      console.error('[gateway/budget] Usage query error:', usageError.message)
      // Non-critical — return budget without spend data
      return NextResponse.json({
        wallet_id: walletId,
        balance: wallet.balance,
        status: wallet.status,
        budget,
        today_spend: null,
      })
    }

    const usage = (usageRaw || []) as Array<Record<string, unknown>>

    let todayTotal = 0
    const perService: Record<string, number> = {}

    for (const record of usage) {
      const cost = ((record.cost as number) || 0) + ((record.margin as number) || 0)
      todayTotal += cost
      const svcId = record.service_id as string
      perService[svcId] = (perService[svcId] || 0) + cost
    }

    return NextResponse.json({
      wallet_id: walletId,
      balance: wallet.balance,
      status: wallet.status,
      budget,
      today_spend: {
        total: Math.round(todayTotal * 10000) / 10000,
        by_service: Object.entries(perService).map(([service_id, amount]) => ({
          service_id,
          amount: Math.round(amount * 10000) / 10000,
        })),
        transaction_count: usage.length,
      },
    })
  } catch (err) {
    console.error('[gateway/budget] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/v1/gateway/budget
 *
 * Create or update budget limits for a wallet.
 * Auth required.
 *
 * Body:
 *   wallet_id              — required, UUID of the wallet
 *   max_per_transaction    — optional, max USD per single API call
 *   max_per_day            — optional, max USD spend per day
 *   max_per_service        — optional, max USD per service per day
 *   requires_approval_above — optional, threshold above which human approval is needed
 *   auto_approved_services — optional, array of service IDs that skip approval
 */
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const {
      wallet_id,
      max_per_transaction,
      max_per_day,
      max_per_service,
      requires_approval_above,
      auto_approved_services,
    } = body

    // --- Validation ---
    if (!wallet_id || typeof wallet_id !== 'string') {
      return NextResponse.json(
        { error: 'wallet_id is required' },
        { status: 400 }
      )
    }
    if (!UUID_RE.test(wallet_id)) {
      return NextResponse.json(
        { error: 'wallet_id must be a valid UUID' },
        { status: 400 }
      )
    }

    // Validate numeric fields
    const numericFields: Record<string, unknown> = {
      max_per_transaction,
      max_per_day,
      max_per_service,
      requires_approval_above,
    }

    for (const [field, value] of Object.entries(numericFields)) {
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) {
          return NextResponse.json(
            { error: `${field} must be a non-negative number` },
            { status: 400 }
          )
        }
      }
    }

    if (auto_approved_services !== undefined) {
      if (!Array.isArray(auto_approved_services)) {
        return NextResponse.json(
          { error: 'auto_approved_services must be an array of service ID strings' },
          { status: 400 }
        )
      }
      for (const svcId of auto_approved_services) {
        if (typeof svcId !== 'string' || !UUID_RE.test(svcId)) {
          return NextResponse.json(
            { error: 'Each entry in auto_approved_services must be a valid UUID' },
            { status: 400 }
          )
        }
      }
    }

    const supabase = getServiceClient()

    // Check that wallet exists
    const { data: existingWallet, error: walletCheckError } = await supabase
      .from('agent_wallets')
      .select('id, budget_config')
      .eq('id', wallet_id)
      .single()

    if (walletCheckError) {
      if (walletCheckError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
      }
      console.error('[gateway/budget] Wallet check error:', walletCheckError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const existing = existingWallet as Record<string, unknown>

    // Merge with existing budget config (partial updates)
    const currentBudget = (existing.budget_config as Record<string, unknown>) || {}
    const updatedBudget: Record<string, unknown> = { ...currentBudget }

    if (max_per_transaction !== undefined) updatedBudget.max_per_transaction = max_per_transaction
    if (max_per_day !== undefined) updatedBudget.max_per_day = max_per_day
    if (max_per_service !== undefined) updatedBudget.max_per_service = max_per_service
    if (requires_approval_above !== undefined) updatedBudget.requires_approval_above = requires_approval_above
    if (auto_approved_services !== undefined) updatedBudget.auto_approved_services = auto_approved_services

    const { data, error } = await (supabase
      .from('agent_wallets') as any)
      .update({ budget_config: updatedBudget })
      .eq('id', wallet_id)
      .select('id, balance, status, budget_config')
      .single()

    if (error) {
      console.error('[gateway/budget] Update error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({
      wallet_id: (data as Record<string, unknown>).id,
      budget: (data as Record<string, unknown>).budget_config,
      message: 'Budget updated successfully',
    })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[gateway/budget] POST unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
