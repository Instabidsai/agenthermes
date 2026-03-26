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
    })
  } catch (err) {
    console.error('[analytics] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
