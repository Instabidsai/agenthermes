import { getServiceClient } from '@/lib/supabase'

/**
 * Notify subscribers when a business's Agent Readiness Score changes.
 *
 * Currently logs notifications. Structured for easy swap to SendGrid/Resend:
 * replace the console.log block with your provider's send call.
 *
 * @param domain - The business domain that was scanned
 * @param oldScore - Previous score (0 if first scan)
 * @param newScore - New score after scan
 * @param tier - New tier after scan
 */
export async function notifyScoreChange(
  domain: string,
  oldScore: number,
  newScore: number,
  tier: string
) {
  if (oldScore === newScore) return

  const supabase = getServiceClient()

  const { data: subscribers, error } = await supabase
    .from('email_subscribers')
    .select('email')
    .eq('domain', domain)
    .eq('active', true)

  if (error) {
    console.error(`[notifications] Failed to fetch subscribers for ${domain}:`, error.message)
    return
  }

  if (!subscribers?.length) return

  const direction = newScore > oldScore ? 'improved' : 'decreased'

  // -----------------------------------------------------------------------
  // TODO: Replace this block with SendGrid/Resend integration
  // Example with Resend:
  //   import { Resend } from 'resend'
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   for (const sub of subscribers) {
  //     await resend.emails.send({
  //       from: 'AgentHermes <notifications@agenthermes.ai>',
  //       to: sub.email,
  //       subject: `${domain} score ${direction}: ${oldScore} → ${newScore}`,
  //       html: `<p>Your monitored business <strong>${domain}</strong> score ${direction} from ${oldScore} to ${newScore} (${tier} tier).</p>`,
  //     })
  //   }
  // -----------------------------------------------------------------------
  console.log(
    `[notifications] Score change for ${domain}: ${oldScore}\u2192${newScore} (${tier}). ` +
    `${subscribers.length} subscriber(s) to notify: ${subscribers.map((s: any) => s.email).join(', ')}`
  )

  // Update subscriber records with latest score info
  const { error: updateError } = await (supabase
    .from('email_subscribers') as any)
    .update({ score: newScore, tier })
    .eq('domain', domain)

  if (updateError) {
    console.error(`[notifications] Failed to update subscriber records for ${domain}:`, updateError.message)
  }
}
