import { getServiceClient } from './supabase'

/**
 * Fire-and-forget analytics event tracker.
 * Logs events to the analytics_events table without blocking the caller.
 */
export function trackEvent(
  businessId: string,
  eventType: string,
  metadata: Record<string, unknown> = {}
): void {
  // Fire-and-forget — don't await, don't block
  const supabase = getServiceClient()

  Promise.resolve(
    supabase
      .from('analytics_events')
      .insert({
        business_id: businessId,
        event_type: eventType,
        agent_id: metadata.agent_id as string | undefined ?? null,
        query_text: metadata.query_text as string | undefined ?? null,
        source: (metadata.source as string) || 'api',
        metadata,
      } as any)
  )
    .then(({ error }: { error: { message: string } | null }) => {
      if (error) {
        console.error('[analytics] trackEvent error:', error.message)
      }
    })
    .catch((err: unknown) => {
      console.error('[analytics] trackEvent unexpected error:', err)
    })
}
