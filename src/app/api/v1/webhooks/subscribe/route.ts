import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'

const VALID_EVENT_TYPES = ['new_business', 'score_change', 'tier_promotion', 'new_service']

/**
 * POST /api/v1/webhooks/subscribe
 * Subscribe to webhook events.
 *
 * Body: { url, event_type?, filters?, secret? }
 * - url: The endpoint to receive POST callbacks
 * - event_type: One of: new_business, score_change, tier_promotion, new_service (default: new_business)
 * - filters: Optional JSON filters, e.g. { vertical: "healthcare", min_score: 75 }
 * - secret: Optional HMAC secret. If omitted, one is auto-generated.
 *
 * Returns the subscription ID and the secret for signature verification.
 */
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { url, event_type, filters, secret } = body

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'url is required and must be a string' },
        { status: 400 }
      )
    }

    try {
      const parsed = new URL(url)
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return NextResponse.json(
          { error: 'url must use http or https protocol' },
          { status: 400 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'url must be a valid URL' },
        { status: 400 }
      )
    }

    // Validate event_type
    const eventType = event_type || 'new_business'
    if (!VALID_EVENT_TYPES.includes(eventType)) {
      return NextResponse.json(
        { error: `Invalid event_type. Must be one of: ${VALID_EVENT_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate filters
    if (filters && typeof filters !== 'object') {
      return NextResponse.json(
        { error: 'filters must be a JSON object' },
        { status: 400 }
      )
    }

    // Generate or use provided secret
    const webhookSecret = secret || randomBytes(32).toString('hex')

    const supabase = getServiceClient()

    const { data, error } = await supabase
      .from('webhook_subscriptions')
      .insert({
        subscriber_url: url,
        event_type: eventType,
        filters: filters || {},
        secret: webhookSecret,
        active: true,
      } as any)
      .select('id, subscriber_url, event_type, filters, active, created_at')
      .single()

    if (error) {
      console.error('[webhooks/subscribe] Insert error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json(
      {
        subscription: data,
        secret: webhookSecret,
        message: 'Webhook subscription created. Store the secret for signature verification.',
      },
      { status: 201 }
    )
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[webhooks/subscribe] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * GET /api/v1/webhooks/subscribe
 * List active webhook subscriptions.
 */
export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const supabase = getServiceClient()

    const { data, error } = await supabase
      .from('webhook_subscriptions')
      .select('id, subscriber_url, event_type, filters, active, created_at, last_triggered_at')
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[webhooks/subscribe] List error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({
      subscriptions: data || [],
      count: (data || []).length,
    })
  } catch (err) {
    console.error('[webhooks/subscribe] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/v1/webhooks/subscribe
 * Unsubscribe by ID. Body: { id }
 */
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { id } = body

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'id is required' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Soft-delete: mark as inactive rather than hard delete
    const { data, error } = await (supabase
      .from('webhook_subscriptions') as any)
      .update({ active: false })
      .eq('id', id)
      .select('id, subscriber_url, event_type, active')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Subscription not found' },
          { status: 404 }
        )
      }
      console.error('[webhooks/subscribe] Delete error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Webhook subscription deactivated',
      subscription: data,
    })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[webhooks/subscribe] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
