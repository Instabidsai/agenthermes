import { getServiceClient } from './supabase'
import { runScan } from './scanner'
import { fireWebhook } from './webhooks'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MonitoringEvent {
  id: string
  business_id: string
  event_type: string
  details: Record<string, unknown>
  severity: string
  created_at: string
}

export interface MonitoringCycleResult {
  businesses_checked: number
  events_created: number
  events: {
    business_id: string
    business_name: string
    event_type: string
    severity: string
    details: Record<string, unknown>
  }[]
  cycle_duration_ms: number
  completed_at: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tierFromScore(score: number): string {
  if (score >= 90) return 'platinum'
  if (score >= 75) return 'gold'
  if (score >= 60) return 'silver'
  if (score >= 40) return 'bronze'
  return 'unaudited'
}

const CERTIFICATION_THRESHOLD = 75 // Gold tier minimum

// ---------------------------------------------------------------------------
// Core Monitoring
// ---------------------------------------------------------------------------

/**
 * Create a monitoring event and fire webhooks.
 */
async function createMonitoringEvent(
  businessId: string,
  eventType: string,
  severity: string,
  details: Record<string, unknown>
): Promise<void> {
  const supabase = getServiceClient()

  const { error } = await supabase
    .from('monitoring_events')
    .insert({
      business_id: businessId,
      event_type: eventType,
      severity,
      details,
    } as any)

  if (error) {
    console.error('[monitoring] Insert event error:', error.message)
  }

  // Fire webhook (fire-and-forget)
  fireWebhook(`monitoring.${eventType}`, {
    business_id: businessId,
    event_type: eventType,
    severity,
    ...details,
  })
}

/**
 * Run a full monitoring cycle across all businesses.
 *
 * 1. Fetch all businesses that were last scanned > 24h ago
 * 2. Re-scan each one
 * 3. Compare new score to previous score
 * 4. Create monitoring events for significant changes
 */
export async function runMonitoringCycle(): Promise<MonitoringCycleResult> {
  const startTime = Date.now()
  const supabase = getServiceClient()

  // 1. Fetch businesses due for re-scan (last audit > 24h ago)
  const twentyFourHoursAgo = new Date(
    Date.now() - 24 * 60 * 60 * 1000
  ).toISOString()

  const { data: bizRaw, error: bizError } = await supabase
    .from('businesses')
    .select('id, name, domain, audit_score, audit_tier, updated_at')
    .lt('updated_at', twentyFourHoursAgo)
    .not('domain', 'is', null)
    .order('updated_at', { ascending: true })
    .limit(20) // Process max 20 per cycle to stay under serverless limits

  if (bizError) {
    console.error('[monitoring] Fetch businesses error:', bizError.message)
    return {
      businesses_checked: 0,
      events_created: 0,
      events: [],
      cycle_duration_ms: Date.now() - startTime,
      completed_at: new Date().toISOString(),
    }
  }

  const businesses = (bizRaw || []) as Record<string, any>[]
  const events: MonitoringCycleResult['events'] = []

  // 2. Re-scan each business
  for (const biz of businesses) {
    const domain = biz.domain as string
    if (!domain) continue

    const previousScore = (biz.audit_score as number) ?? 0
    const previousTier = (biz.audit_tier as string) ?? 'unaudited'
    const businessId = biz.id as string
    const businessName = biz.name as string

    // Check if this business is "certified" (Gold or Platinum)
    const wasCertified =
      previousTier === 'gold' || previousTier === 'platinum'

    try {
      // Re-scan the domain
      const scanResult = await runScan(domain)
      const newScore = scanResult.total_score
      const newTier = scanResult.tier
      const scoreDelta = newScore - previousScore

      // Update the business record with new score
      await (supabase
        .from('businesses') as any)
        .update({
          audit_score: newScore,
          audit_tier: newTier,
          updated_at: new Date().toISOString(),
        })
        .eq('id', businessId)

      // 3. Check for significant score change (>5 points)
      if (Math.abs(scoreDelta) > 5) {
        const severity = scoreDelta > 0 ? 'info' : 'warning'
        const eventDetails = {
          previous_score: previousScore,
          new_score: newScore,
          score_delta: scoreDelta,
          direction: scoreDelta > 0 ? 'improved' : 'declined',
          business_name: businessName,
          domain,
        }

        await createMonitoringEvent(
          businessId,
          'score_change',
          severity,
          eventDetails
        )

        events.push({
          business_id: businessId,
          business_name: businessName,
          event_type: 'score_change',
          severity,
          details: eventDetails,
        })
      }

      // 4. Check for tier change
      if (newTier !== previousTier) {
        const improved = tierRank(newTier) > tierRank(previousTier)
        const severity = improved ? 'info' : 'warning'
        const eventDetails = {
          previous_tier: previousTier,
          new_tier: newTier,
          direction: improved ? 'promoted' : 'demoted',
          previous_score: previousScore,
          new_score: newScore,
          business_name: businessName,
          domain,
        }

        await createMonitoringEvent(
          businessId,
          'tier_change',
          severity,
          eventDetails
        )

        events.push({
          business_id: businessId,
          business_name: businessName,
          event_type: 'tier_change',
          severity,
          details: eventDetails,
        })
      }

      // 5. Check certification risk
      if (wasCertified && newScore < CERTIFICATION_THRESHOLD) {
        const eventDetails = {
          previous_score: previousScore,
          new_score: newScore,
          certification_threshold: CERTIFICATION_THRESHOLD,
          previous_tier: previousTier,
          new_tier: newTier,
          business_name: businessName,
          domain,
          message: `Score dropped below certification threshold (${CERTIFICATION_THRESHOLD}). Certification at risk.`,
        }

        await createMonitoringEvent(
          businessId,
          'certification_risk',
          'warning',
          eventDetails
        )

        events.push({
          business_id: businessId,
          business_name: businessName,
          event_type: 'certification_risk',
          severity: 'warning',
          details: eventDetails,
        })
      }
    } catch (err: unknown) {
      console.error(
        `[monitoring] Scan failed for ${businessName} (${domain}):`,
        err instanceof Error ? err.message : err
      )

      // Log scan failure as a monitoring event
      const eventDetails = {
        error: err instanceof Error ? err.message : 'Unknown error',
        business_name: businessName,
        domain,
      }

      await createMonitoringEvent(
        businessId,
        'scan_failure',
        'error',
        eventDetails
      )

      events.push({
        business_id: businessId,
        business_name: businessName,
        event_type: 'scan_failure',
        severity: 'error',
        details: eventDetails,
      })
    }
  }

  return {
    businesses_checked: businesses.length,
    events_created: events.length,
    events,
    cycle_duration_ms: Date.now() - startTime,
    completed_at: new Date().toISOString(),
  }
}

/**
 * Get monitoring events with filters.
 */
export async function getMonitoringEvents(params: {
  businessId?: string
  severity?: string
  eventType?: string
  limit?: number
  offset?: number
}): Promise<{ events: MonitoringEvent[]; total: number }> {
  const supabase = getServiceClient()
  const limit = Math.min(params.limit ?? 50, 100)
  const offset = params.offset ?? 0

  let query = supabase
    .from('monitoring_events')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (params.businessId) {
    query = query.eq('business_id', params.businessId)
  }
  if (params.severity) {
    query = query.eq('severity', params.severity)
  }
  if (params.eventType) {
    query = query.eq('event_type', params.eventType)
  }

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Failed to fetch monitoring events: ${error.message}`)
  }

  return {
    events: (data || []) as MonitoringEvent[],
    total: count ?? 0,
  }
}

// ---------------------------------------------------------------------------
// Tier ranking utility
// ---------------------------------------------------------------------------

function tierRank(tier: string): number {
  switch (tier) {
    case 'platinum':
      return 5
    case 'gold':
      return 4
    case 'silver':
      return 3
    case 'bronze':
      return 2
    case 'unaudited':
    default:
      return 1
  }
}
