import { getServiceClient } from './supabase'

interface TrustScoreBreakdown {
  audit_score: { value: number; weighted: number; max: number }
  transaction_success_rate: { value: number; weighted: number; max: number }
  transaction_volume: { value: number; weighted: number; max: number }
  service_uptime: { value: number; weighted: number; max: number }
  response_time: { value: number; weighted: number; max: number }
  profile_completeness: { value: number; weighted: number; max: number }
}

interface TrustScoreResult {
  trust_score: number
  breakdown: TrustScoreBreakdown
  computed_at: string
}

/**
 * Compute a trust score (0-100) for a business from real signals.
 *
 * Weights:
 *  - audit_score:              30%
 *  - transaction_success_rate: 20%
 *  - transaction_volume:       15%
 *  - service_uptime:           15%
 *  - response_time:            10%
 *  - profile_completeness:     10%
 */
export async function computeTrustScore(businessId: string): Promise<TrustScoreResult> {
  const supabase = getServiceClient()

  // 1. Fetch business data
  const { data: bizRaw } = await supabase
    .from('businesses')
    .select('audit_score, description, domain, capabilities, name')
    .eq('id', businessId)
    .single()
  const biz = bizRaw as Record<string, any> | null

  // 2. Latest audit score (weight: 30%)
  const auditRaw = biz?.audit_score ?? 0
  // audit_score is 0-100, normalize to 0-1
  const auditNorm = Math.min(auditRaw / 100, 1)
  const auditWeighted = Math.round(auditNorm * 30)

  // 3. Transaction success rate (weight: 20%)
  const { data: walletRows } = await supabase
    .from('agent_wallets')
    .select('id')
    .eq('business_id', businessId)
  const walletIds = ((walletRows || []) as any[]).map((w: any) => w.id)

  let successRate = 0
  let totalTxns = 0
  let completedTxns = 0
  let totalVolume = 0

  if (walletIds.length > 0) {
    const { data: txns } = await supabase
      .from('transactions')
      .select('amount, status')
      .in('seller_wallet_id', walletIds)
    const txnRows = (txns || []) as any[]
    totalTxns = txnRows.length
    completedTxns = txnRows.filter((t: any) => t.status === 'completed').length
    totalVolume = txnRows
      .filter((t: any) => t.status === 'completed')
      .reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    successRate = totalTxns > 0 ? completedTxns / totalTxns : 0
  }
  const txSuccessWeighted = Math.round(successRate * 20)

  // 4. Transaction volume (weight: 15%) — normalized: $0=0, $10000+=15
  const volumeNorm = Math.min(totalVolume / 10000, 1)
  const volumeWeighted = Math.round(volumeNorm * 15)

  // 5. Service uptime (weight: 15%) — avg uptime_pct from services
  const { data: servicesRaw } = await supabase
    .from('services')
    .select('uptime_pct, avg_response_ms')
    .eq('business_id', businessId)
    .eq('status', 'active')
  const services = (servicesRaw || []) as any[]

  let avgUptime = 0
  let avgResponseMs = 0
  if (services.length > 0) {
    avgUptime = services.reduce((s: number, svc: any) => s + (svc.uptime_pct || 0), 0) / services.length
    avgResponseMs = services.reduce((s: number, svc: any) => s + (svc.avg_response_ms || 0), 0) / services.length
  }
  const uptimeNorm = Math.min(avgUptime / 100, 1)
  const uptimeWeighted = Math.round(uptimeNorm * 15)

  // 6. Response time (weight: 10%) — lower is better. 0ms=10, 5000ms+=0
  const responseNorm = avgResponseMs > 0 ? Math.max(0, 1 - avgResponseMs / 5000) : 0
  const responseWeighted = Math.round(responseNorm * 10)

  // 7. Profile completeness (weight: 10%)
  let completenessPoints = 0
  if (biz?.name) completenessPoints++
  if (biz?.description && biz.description.length > 10) completenessPoints++
  if (biz?.domain) completenessPoints++
  if (biz?.capabilities && Array.isArray(biz.capabilities) && biz.capabilities.length > 0) completenessPoints++
  if (services.length > 0) completenessPoints++
  const completenessNorm = completenessPoints / 5
  const completenessWeighted = Math.round(completenessNorm * 10)

  const trustScore = auditWeighted + txSuccessWeighted + volumeWeighted + uptimeWeighted + responseWeighted + completenessWeighted

  return {
    trust_score: Math.min(trustScore, 100),
    breakdown: {
      audit_score: { value: auditRaw, weighted: auditWeighted, max: 30 },
      transaction_success_rate: { value: Math.round(successRate * 100), weighted: txSuccessWeighted, max: 20 },
      transaction_volume: { value: totalVolume, weighted: volumeWeighted, max: 15 },
      service_uptime: { value: Math.round(avgUptime * 100) / 100, weighted: uptimeWeighted, max: 15 },
      response_time: { value: Math.round(avgResponseMs), weighted: responseWeighted, max: 10 },
      profile_completeness: { value: completenessPoints, weighted: completenessWeighted, max: 10 },
    },
    computed_at: new Date().toISOString(),
  }
}
