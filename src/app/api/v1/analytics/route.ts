import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = request.nextUrl
    const businessId = searchParams.get('business_id')
    const period = searchParams.get('period') || '30d'
    const groupBy = searchParams.get('group_by') || 'day'

    if (!businessId) {
      return NextResponse.json(
        { error: 'business_id query parameter is required' },
        { status: 400 }
      )
    }

    // Validate UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
      return NextResponse.json(
        { error: 'Invalid business_id format' },
        { status: 400 }
      )
    }

    // Calculate date range
    const periodDays: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 }
    const days = periodDays[period] || 30
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    const supabase = getServiceClient()

    // Verify business exists
    const { data: bizRaw, error: bizError } = await supabase
      .from('businesses')
      .select('id, name')
      .eq('id', businessId)
      .single()

    if (bizError || !bizRaw) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    // Fetch all events in the period
    const { data: eventsRaw, error: eventsError } = await supabase
      .from('analytics_events')
      .select('event_type, agent_id, query_text, created_at, metadata')
      .eq('business_id', businessId)
      .gte('created_at', since)
      .order('created_at', { ascending: false })

    if (eventsError) {
      console.error('[analytics] Query error:', eventsError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const events = (eventsRaw || []) as any[]

    // Aggregate totals
    const totalViews = events.filter((e: any) => e.event_type === 'profile_view').length
    const totalSearches = events.filter((e: any) => e.event_type === 'search_impression').length
    const totalTransactions = events.filter((e: any) => e.event_type === 'service_call').length
    const totalScoreChecks = events.filter((e: any) => e.event_type === 'score_check').length
    const totalManifestViews = events.filter((e: any) => e.event_type === 'manifest_view').length

    // Views by day/week
    const viewsByPeriod: Record<string, number> = {}
    for (const event of events) {
      const date = new Date(event.created_at)
      let key: string
      if (groupBy === 'week') {
        // Get ISO week start (Monday)
        const d = new Date(date)
        d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
        key = d.toISOString().split('T')[0]
      } else {
        key = date.toISOString().split('T')[0]
      }
      viewsByPeriod[key] = (viewsByPeriod[key] || 0) + 1
    }

    // Sort by date
    const viewsByDay = Object.entries(viewsByPeriod)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }))

    // Top search queries
    const queryCounts: Record<string, number> = {}
    for (const event of events) {
      if (event.query_text) {
        const q = event.query_text.toLowerCase().trim()
        queryCounts[q] = (queryCounts[q] || 0) + 1
      }
    }
    const topSearchQueries = Object.entries(queryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }))

    // Top agents
    const agentCounts: Record<string, number> = {}
    for (const event of events) {
      if (event.agent_id) {
        agentCounts[event.agent_id] = (agentCounts[event.agent_id] || 0) + 1
      }
    }
    const topAgents = Object.entries(agentCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([agent_id, count]) => ({ agent_id, count }))

    // --- Gateway usage stats ---
    let gateway: {
      total_calls: number
      total_spent: number
      top_services: { service_id: string; service_name: string; count: number }[]
      recent_activity: {
        id: string
        service_name: string
        action_name: string
        cost: number
        success: boolean
        created_at: string
      }[]
    } | null = null

    try {
      // Step 1: Get wallet IDs for this business
      const { data: walletsRaw } = await supabase
        .from('agent_wallets')
        .select('id')
        .eq('business_id', businessId)

      const walletIds = ((walletsRaw || []) as Array<Record<string, unknown>>).map(
        (w) => w.id as string
      )

      if (walletIds.length > 0) {
        // Step 2: Fetch gateway_usage for those wallets within the period
        const { data: usageRaw } = await supabase
          .from('gateway_usage')
          .select('id, service_id, action_name, cost, margin, success, created_at')
          .in('agent_wallet_id', walletIds)
          .gte('created_at', since)
          .order('created_at', { ascending: false })

        const usageRecords = (usageRaw || []) as Array<Record<string, unknown>>

        if (usageRecords.length > 0) {
          // Total calls and total spent
          let totalSpent = 0
          for (const u of usageRecords) {
            totalSpent += ((u.cost as number) || 0) + ((u.margin as number) || 0)
          }

          // Top services by call count — collect service_ids first
          const serviceCallCounts: Record<string, number> = {}
          for (const u of usageRecords) {
            const sid = u.service_id as string
            if (sid) {
              serviceCallCounts[sid] = (serviceCallCounts[sid] || 0) + 1
            }
          }

          // Resolve service names
          const uniqueServiceIds = Object.keys(serviceCallCounts)
          let serviceNameMap: Record<string, string> = {}
          if (uniqueServiceIds.length > 0) {
            const { data: servicesRaw } = await supabase
              .from('gateway_services')
              .select('id, name')
              .in('id', uniqueServiceIds)

            for (const s of ((servicesRaw || []) as Array<Record<string, unknown>>)) {
              serviceNameMap[s.id as string] = s.name as string
            }
          }

          const topServices = Object.entries(serviceCallCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([service_id, count]) => ({
              service_id,
              service_name: serviceNameMap[service_id] || 'Unknown Service',
              count,
            }))

          // Recent activity (last 10)
          const recentActivity = usageRecords.slice(0, 10).map((u) => ({
            id: u.id as string,
            service_name: serviceNameMap[u.service_id as string] || 'Unknown Service',
            action_name: (u.action_name as string) || 'unknown',
            cost: ((u.cost as number) || 0) + ((u.margin as number) || 0),
            success: u.success as boolean,
            created_at: u.created_at as string,
          }))

          gateway = {
            total_calls: usageRecords.length,
            total_spent: Math.round(totalSpent * 10000) / 10000,
            top_services: topServices,
            recent_activity: recentActivity,
          }
        }
      }
    } catch (gwErr) {
      // Non-critical — gateway stats are optional
      console.error('[analytics] Gateway stats error:', gwErr instanceof Error ? gwErr.message : gwErr)
    }

    return NextResponse.json({
      business_id: businessId,
      period,
      group_by: groupBy,
      total_views: totalViews,
      total_searches: totalSearches,
      total_transactions: totalTransactions,
      total_score_checks: totalScoreChecks,
      total_manifest_views: totalManifestViews,
      views_by_day: viewsByDay,
      top_search_queries: topSearchQueries,
      top_agents: topAgents,
      gateway,
    })
  } catch (err) {
    console.error('[analytics] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
