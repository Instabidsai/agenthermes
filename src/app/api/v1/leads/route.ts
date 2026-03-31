import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

/**
 * GET /api/v1/leads?business_id=<uuid>&status=<new|contacted|converted>&limit=<n>
 *
 * List agent-generated leads for a business, ordered by created_at desc.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const businessId = searchParams.get('business_id')
    const status = searchParams.get('status')
    const limit = Math.min(
      Math.max(parseInt(searchParams.get('limit') || '50', 10) || 50, 1),
      200
    )

    if (!businessId) {
      return NextResponse.json(
        { error: 'business_id query parameter is required' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    let query = supabase
      .from('agent_leads')
      .select('id, business_id, tool_called, input, agent_id, status, created_at')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status && ['new', 'contacted', 'converted'].includes(status)) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('[leads] Query error:', error.message)
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
    }

    const leads = (data || []) as Record<string, any>[]

    return NextResponse.json({
      leads,
      count: leads.length,
      business_id: businessId,
    })
  } catch (err) {
    console.error('[leads] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/v1/leads
 *
 * Create a lead directly (alternative to going through the fulfillment router).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { business_id, tool_called, input, agent_id } = body

    if (!tool_called || typeof tool_called !== 'string') {
      return NextResponse.json(
        { error: 'tool_called is required' },
        { status: 400 }
      )
    }

    if (!input || typeof input !== 'object') {
      return NextResponse.json(
        { error: 'input is required and must be an object' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    const { data, error } = await supabase
      .from('agent_leads')
      .insert({
        business_id: business_id || null,
        tool_called,
        input,
        agent_id: agent_id || null,
        status: 'new',
      } as any)
      .select()
      .single()

    if (error) {
      console.error('[leads] Insert error:', error.message)
      return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[leads] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
