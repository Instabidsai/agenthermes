import { createClient, SupabaseClient } from '@supabase/supabase-js'

// --- Hive Brain integration ---
// Connects to the central JarvisBrain Supabase instance
// for cross-company alerts and learnings.

let hiveBrainClient: SupabaseClient | null = null

function getHiveBrain(): SupabaseClient | null {
  if (hiveBrainClient) return hiveBrainClient

  const url = process.env.HIVE_BRAIN_URL
  const key = process.env.HIVE_BRAIN_ANON_KEY

  if (!url || !key) {
    console.warn(
      '[hive-brain] HIVE_BRAIN_URL or HIVE_BRAIN_ANON_KEY not configured — Hive Brain integration disabled'
    )
    return null
  }

  hiveBrainClient = createClient(url, key)
  return hiveBrainClient
}

/**
 * Post an alert to the Hive Brain.
 * Used for significant events like tier promotions, outages, etc.
 */
export async function postAlert(
  agent: string,
  company: string,
  message: string,
  severity: 'info' | 'warning' | 'critical' = 'info'
) {
  const hive = getHiveBrain()
  if (!hive) {
    console.warn('[hive-brain] Cannot post alert — client not configured')
    return null
  }

  const { data, error } = await hive.from('alerts').insert({
    agent,
    company,
    message,
    severity,
    source: 'agenthermes',
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('[hive-brain] Failed to post alert:', error.message)
    return null
  }

  return data
}

/**
 * Post a learning to the Hive Brain.
 * Used to share service quality insights across the portfolio.
 */
export async function postLearning(
  agent: string,
  company: string,
  learning: string
) {
  const hive = getHiveBrain()
  if (!hive) {
    console.warn('[hive-brain] Cannot post learning — client not configured')
    return null
  }

  const { data, error } = await hive.from('learnings').insert({
    agent,
    company,
    content: learning,
    source: 'agenthermes',
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('[hive-brain] Failed to post learning:', error.message)
    return null
  }

  return data
}

/**
 * Notify Hive Brain when a business achieves Gold+ tier.
 * Exported so the audit engine can call it after scoring.
 */
export async function notifyTierPromotion(
  businessName: string,
  newTier: string,
  auditScore: number
) {
  if (newTier !== 'gold' && newTier !== 'platinum') return

  await postAlert(
    'agenthermes-audit',
    businessName,
    `${businessName} achieved ${newTier.toUpperCase()} tier with audit score ${auditScore}/100. Now eligible for premium agent marketplace placement.`,
    'info'
  )

  await postLearning(
    'agenthermes-audit',
    businessName,
    `Business ${businessName} upgraded to ${newTier} tier (score: ${auditScore}). Key factors: machine-readable profile, MCP endpoints, structured pricing, agent payment acceptance.`
  )
}
