import { createHmac } from 'crypto'
import { getServiceClient } from './supabase'

interface WebhookSubscription {
  id: string
  subscriber_url: string
  event_type: string
  filters: Record<string, unknown>
  secret: string | null
  active: boolean
  created_at: string
  last_triggered_at: string | null
}

/**
 * Fire webhooks for a given event type.
 * Finds all active subscriptions matching the event, applies filters,
 * and sends POST requests with HMAC-SHA256 signatures.
 *
 * Fire-and-forget: does not block the caller. Logs delivery attempts.
 */
export async function fireWebhook(
  eventType: string,
  payload: Record<string, unknown>
): Promise<void> {
  // Run async — don't await in the caller
  fireWebhookInternal(eventType, payload).catch((err) => {
    console.error(`[webhooks] Unhandled error firing ${eventType}:`, err)
  })
}

async function fireWebhookInternal(
  eventType: string,
  payload: Record<string, unknown>
): Promise<void> {
  const supabase = getServiceClient()

  const { data: subscriptions, error } = await supabase
    .from('webhook_subscriptions')
    .select('*')
    .eq('event_type', eventType)
    .eq('active', true)

  if (error) {
    console.error('[webhooks] Failed to fetch subscriptions:', error.message)
    return
  }

  if (!subscriptions || subscriptions.length === 0) {
    return
  }

  const deliveryPromises = (subscriptions as WebhookSubscription[])
    .filter((sub) => matchesFilters(sub.filters, payload))
    .map((sub) => deliverWebhook(sub, eventType, payload))

  const results = await Promise.allSettled(deliveryPromises)
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('[webhooks] Delivery failed:', result.reason)
    }
  }
}

/**
 * Check if a payload matches the subscription's filters.
 * Filters are key-value pairs: { vertical: "healthcare", min_score: 75 }
 * All specified filters must match (AND logic).
 */
function matchesFilters(
  filters: Record<string, unknown>,
  payload: Record<string, unknown>
): boolean {
  if (!filters || Object.keys(filters).length === 0) return true

  for (const [key, value] of Object.entries(filters)) {
    // Special handling for min_score filter
    if (key === 'min_score') {
      const payloadScore =
        (payload.audit_score as number) ??
        (payload.score as number) ??
        ((payload.business as Record<string, unknown>)?.audit_score as number) ??
        0
      if (payloadScore < (value as number)) return false
      continue
    }

    // Check payload directly and nested business object
    const payloadValue = payload[key] ?? (payload.business as Record<string, unknown>)?.[key]
    if (payloadValue !== value) return false
  }

  return true
}

/**
 * Deliver a webhook to a subscriber URL with HMAC signature.
 */
async function deliverWebhook(
  subscription: WebhookSubscription,
  eventType: string,
  payload: Record<string, unknown>
): Promise<void> {
  const body = JSON.stringify({
    event: eventType,
    timestamp: new Date().toISOString(),
    data: payload,
  })

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-AgentHermes-Event': eventType,
  }

  // Sign the payload with HMAC-SHA256 if a secret is configured
  if (subscription.secret) {
    const signature = createHmac('sha256', subscription.secret)
      .update(body)
      .digest('hex')
    headers['X-AgentHermes-Signature'] = `sha256=${signature}`
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000) // 10s timeout

    const response = await fetch(subscription.subscriber_url, {
      method: 'POST',
      headers,
      body,
      signal: controller.signal,
    })

    clearTimeout(timeout)

    console.log(
      `[webhooks] Delivered ${eventType} to ${subscription.subscriber_url} — status: ${response.status}`
    )

    // Update last_triggered_at
    const supabase = getServiceClient()
    await (supabase
      .from('webhook_subscriptions') as any)
      .update({ last_triggered_at: new Date().toISOString() })
      .eq('id', subscription.id)

    // Deactivate on repeated failures (4xx/5xx) — simple approach
    if (response.status >= 400) {
      console.warn(
        `[webhooks] Subscriber ${subscription.subscriber_url} returned ${response.status} for ${eventType}`
      )
    }
  } catch (err) {
    console.error(
      `[webhooks] Failed to deliver ${eventType} to ${subscription.subscriber_url}:`,
      err instanceof Error ? err.message : err
    )
  }
}
