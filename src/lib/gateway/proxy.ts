import { getServiceClient } from '@/lib/supabase'
import { decryptCredentials, applyAuth } from './vault'
import type { GatewayService, ServiceAction, GatewayCallResult } from './types'

// =====================================================================
// Gateway Proxy - Route API calls through AgentHermes
// =====================================================================

/**
 * List all services available through the gateway.
 * Optionally filter by category or max cost.
 */
export async function listGatewayServices(params: {
  category?: string
  max_cost?: number
}): Promise<{
  services: Array<{
    id: string
    name: string
    description: string | null
    category: string | null
    cost_per_call: number
    cost_model: string
    rate_limit_per_min: number
    action_count: number
    status: string
  }>
  count: number
}> {
  const supabase = getServiceClient()

  let query = supabase
    .from('gateway_services')
    .select('id, name, description, category, cost_per_call, cost_model, rate_limit_per_min, actions, status')
    .eq('status', 'active')
    .order('name')
    .limit(100)

  if (params.category && typeof params.category === 'string') {
    query = query.eq('category', params.category)
  }

  if (params.max_cost !== undefined && typeof params.max_cost === 'number') {
    query = query.lte('cost_per_call', params.max_cost)
  }

  const { data, error } = await query

  if (error) throw new Error(`Failed to list gateway services: ${error.message}`)

  const results = (data || []) as Array<Record<string, unknown>>

  const services = results.map((svc) => {
    const actions = (svc.actions as ServiceAction[]) || []
    return {
      id: svc.id as string,
      name: svc.name as string,
      description: svc.description as string | null,
      category: svc.category as string | null,
      cost_per_call: svc.cost_per_call as number,
      cost_model: svc.cost_model as string,
      rate_limit_per_min: svc.rate_limit_per_min as number,
      action_count: actions.length,
      status: svc.status as string,
    }
  })

  return { services, count: services.length }
}

/**
 * Get available actions for a specific gateway service.
 */
export async function getServiceActions(params: {
  service_id: string
}): Promise<{
  service_id: string
  service_name: string
  description: string | null
  cost_per_call: number
  cost_model: string
  actions: Array<{
    name: string
    method: string
    path: string
    description: string
    cost: number
    params_schema?: Record<string, unknown>
  }>
}> {
  if (!params.service_id) throw new Error('service_id is required')

  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('gateway_services')
    .select('id, name, description, cost_per_call, cost_model, actions')
    .eq('id', params.service_id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') throw new Error(`Gateway service not found: ${params.service_id}`)
    throw new Error(`Failed to fetch service: ${error.message}`)
  }

  const svc = data as Record<string, unknown>
  const rawActions = (svc.actions as ServiceAction[]) || []
  const baseCost = svc.cost_per_call as number

  return {
    service_id: svc.id as string,
    service_name: svc.name as string,
    description: svc.description as string | null,
    cost_per_call: baseCost,
    cost_model: svc.cost_model as string,
    actions: rawActions.map((a) => ({
      name: a.name,
      method: a.method,
      path: a.path,
      description: a.description,
      cost: a.cost_override ?? baseCost,
      params_schema: a.params_schema,
    })),
  }
}

/**
 * Execute an API call through the gateway.
 * Handles auth, routing, billing, and logging.
 */
export async function callService(params: {
  service_id: string
  action: string
  params?: Record<string, unknown>
  wallet_id: string
}): Promise<GatewayCallResult> {
  if (!params.service_id) throw new Error('service_id is required')
  if (!params.wallet_id) throw new Error('wallet_id is required')

  const supabase = getServiceClient()
  const startMs = Date.now()

  // 1. Fetch the service
  const { data: svcData, error: svcError } = await supabase
    .from('gateway_services')
    .select('*')
    .eq('id', params.service_id)
    .eq('status', 'active')
    .single()

  if (svcError) {
    if (svcError.code === 'PGRST116') {
      throw new Error('Gateway service not found or inactive: ' + params.service_id)
    }
    throw new Error('Failed to fetch service: ' + svcError.message)
  }

  const service = svcData as unknown as GatewayService

  // 2. Find the action
  const actions = service.actions || []
  const action = actions.find((a) => a.name === params.action)
  if (!action) {
    const available = actions.map((a) => a.name).join(', ')
    throw new Error('Action "' + params.action + '" not found. Available: ' + (available || 'none'))
  }

  // 3. Calculate cost
  const cost = action.cost_override ?? service.cost_per_call
  const margin = cost * service.our_margin

  // 4. Check wallet balance
  const { data: walletData, error: walletError } = await supabase
    .from('agent_wallets')
    .select('id, balance, status')
    .eq('id', params.wallet_id)
    .single()

  if (walletError) {
    if (walletError.code === 'PGRST116') throw new Error('Wallet not found: ' + params.wallet_id)
    throw new Error('Failed to check wallet: ' + walletError.message)
  }

  const wallet = walletData as Record<string, unknown>
  if (wallet.status !== 'active') throw new Error('Wallet is not active')
  if ((wallet.balance as number) < cost + margin) {
    throw new Error(
      'Insufficient balance. Need $' + (cost + margin).toFixed(4) +
      ', have $' + (wallet.balance as number).toFixed(4)
    )
  }

  // 5. Decrypt credentials and build request
  let credentials: Record<string, string> = {}
  if (service.encrypted_credentials) {
    credentials = decryptCredentials(service.encrypted_credentials)
  }

  let url = service.api_base_url + action.path

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  applyAuth(headers, credentials, service.auth_type, service.auth_header)

  // Handle query_param auth by appending API key to URL
  if (service.auth_type === 'query_param' && credentials.api_key) {
    const separator = url.includes('?') ? '&' : '?'
    const paramName = service.auth_header || 'api_key'
    url = `${url}${separator}${encodeURIComponent(paramName)}=${encodeURIComponent(credentials.api_key)}`
  }

  // 6. Execute the proxied request (30s timeout to prevent hanging)
  let responseData: unknown
  let statusCode: number

  try {
    const fetchOptions: RequestInit = {
      method: action.method,
      headers,
      signal: AbortSignal.timeout(30_000),
    }
    if (action.method !== 'GET' && action.method !== 'HEAD' && params.params) {
      fetchOptions.body = JSON.stringify(params.params)
    }

    const response = await fetch(url, fetchOptions)
    statusCode = response.status

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      responseData = await response.json()
    } else {
      responseData = await response.text()
    }
  } catch (fetchErr) {
    const responseMs = Date.now() - startMs
    await logGatewayUsage(supabase, {
      agent_wallet_id: params.wallet_id,
      service_id: params.service_id,
      action_name: params.action,
      cost: 0,
      margin: 0,
      response_ms: responseMs,
      status_code: 0,
      success: false,
    })
    const isTimeout = fetchErr instanceof DOMException && fetchErr.name === 'TimeoutError'
    const errMsg = isTimeout
      ? 'API call timed out after 30s'
      : 'API call failed: ' + (fetchErr instanceof Error ? fetchErr.message : 'Unknown error')
    throw new Error(errMsg)
  }

  const responseMs = Date.now() - startMs
  const success = statusCode >= 200 && statusCode < 300

  // 7. Deduct from wallet (only on success)
  if (success) {
    const totalCost = cost + margin
    const { error: deductError } = await (supabase.rpc as any)('deduct_wallet_balance', {
      p_wallet_id: params.wallet_id,
      p_amount: totalCost,
    })

    // Fallback: atomic decrement via raw SQL if RPC does not exist.
    // IMPORTANT: Do NOT use stale wallet.balance here — another request
    // may have changed the balance between our read and this write.
    if (deductError) {
      const { error: fallbackError } = await (supabase.rpc as any)('exec_sql', {
        query: `UPDATE agent_wallets SET balance = balance - $1 WHERE id = $2 AND balance >= $1`,
        params: [totalCost, params.wallet_id],
      })

      // Last-resort fallback: non-atomic update (only if exec_sql RPC is also missing)
      if (fallbackError) {
        // Re-read current balance to avoid using stale value
        const { data: freshWallet } = await supabase
          .from('agent_wallets')
          .select('balance')
          .eq('id', params.wallet_id)
          .single()

        if (freshWallet) {
          const currentBalance = (freshWallet as Record<string, unknown>).balance as number
          if (currentBalance >= totalCost) {
            await (supabase
              .from('agent_wallets') as any)
              .update({ balance: currentBalance - totalCost })
              .eq('id', params.wallet_id)
          }
          // If balance < totalCost, skip deduction to prevent negative balance.
          // The API call already succeeded, so this is a cost we absorb rather
          // than risk corrupting the wallet.
        }
      }
    }
  }

  // 8. Log usage
  await logGatewayUsage(supabase, {
    agent_wallet_id: params.wallet_id,
    service_id: params.service_id,
    action_name: params.action,
    cost: success ? cost : 0,
    margin: success ? margin : 0,
    response_ms: responseMs,
    status_code: statusCode,
    success,
  })

  return {
    success,
    status_code: statusCode,
    data: responseData,
    cost: success ? cost : 0,
    margin: success ? margin : 0,
    response_ms: responseMs,
    service_name: service.name,
    action_name: params.action,
  }
}

// --- Internal helpers ---

async function logGatewayUsage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  entry: {
    agent_wallet_id: string
    service_id: string
    action_name: string
    cost: number
    margin: number
    response_ms: number
    status_code: number
    success: boolean
  }
) {
  try {
    await supabase.from('gateway_usage').insert(entry)
  } catch {
    // Non-critical -- do not fail the call if logging fails
    console.error('[gateway] Failed to log usage', entry.action_name)
  }
}
