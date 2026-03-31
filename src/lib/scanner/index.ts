// ---------------------------------------------------------------------------
// Scanner Orchestrator — 9-Dimension Agent Readiness Scanner
// ---------------------------------------------------------------------------
// Scoring philosophy (v2 — recalibrated 2026-03-30):
//
// The score is the FICO of the Agent Economy. Like FICO, the BASE score
// reflects fundamental service quality (API maturity, documentation, security,
// reliability). Agent-native features (MCP, agent cards, llms.txt) are a
// BONUS that pushes good scores higher — not the primary driver.
//
// A world-class API like Stripe should score ~75 based on quality alone.
// A garage project with only llms.txt should score ~35.
//
// Weight tiers:
//   Tier 1 — Service Foundation (60%):
//     D2 API Quality          × 0.15  (REST endpoints, response quality, CORS)
//     D6 Data Quality         × 0.10  (JSON structure, naming, dates)
//     D7 Security             × 0.12  (TLS, headers, rate limiting)
//     D8 Reliability          × 0.13  (uptime, response times, SLA)
//     D9 Agent Experience     × 0.10  (error handling, SDKs, tracing)
//
//   Tier 2 — Accessibility (25%):
//     D1 Discoverability      × 0.12  (docs, OpenAPI, structured data)
//     D3 Onboarding           × 0.08  (signup, OAuth, developer portal)
//     D4 Pricing Transparency × 0.05  (pricing pages, free tier)
//
//   Tier 3 — Agent Commerce (15%):
//     D5 Payment              × 0.08  (payment APIs, programmatic billing)
//     Agent-Native Bonus      × 0.07  (MCP, agent cards, llms.txt, A2A)
//
// Cap rules:
//   - No TLS → total capped at 39 (max Bronze)
//   - No callable endpoints at all → capped at 29
//   NOTE: The old "no agent discovery = cap 59" rule was REMOVED.
//   Companies should not be punished for lacking protocols that barely exist.
// ---------------------------------------------------------------------------

import { randomBytes } from 'crypto'
import type { ScanResult, DimensionResult, CapApplied } from './types'
import { scanDiscoverability } from './d1-discoverability'
import { scanInteroperability } from './d2-interoperability'
import { scanOnboarding } from './d3-onboarding'
import { scanPricing } from './d4-pricing'
import { scanPayment } from './d5-payment'
import { scanDataQuality } from './d6-data-quality'
import { scanSecurity, hasNoTls } from './d7-security'
import { scanReliability } from './d8-reliability'
import { scanAgentExperience } from './d9-agent-experience'
import { getVerticalWeights, applyVerticalWeights } from './vertical-weights'

// Re-export types
export type { ScanResult, DimensionResult, CapApplied } from './types'
export type { Check, Recommendation } from './types'
export { getVerticalWeights, listVerticals } from './vertical-weights'
export type { VerticalWeights } from './vertical-weights'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeUrl(input: string): string {
  let url = input.trim()
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`
  }
  url = url.replace(/\/+$/, '')
  try {
    new URL(url)
  } catch {
    throw new Error(`Invalid URL: "${input}" could not be parsed as a valid URL`)
  }
  return url
}

function validateAuditTarget(url: string): void {
  const parsed = new URL(url)
  const hostname = parsed.hostname.toLowerCase()

  const forbidden = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '169.254.169.254',
    '::1',
    '::',
  ]
  const privateRanges = [
    '10.',
    '172.16.',
    '172.17.',
    '172.18.',
    '172.19.',
    '172.20.',
    '172.21.',
    '172.22.',
    '172.23.',
    '172.24.',
    '172.25.',
    '172.26.',
    '172.27.',
    '172.28.',
    '172.29.',
    '172.30.',
    '172.31.',
    '192.168.',
    '169.254.',
  ]
  const ipv6Private = [
    'fc',
    'fd',
    'fe80',
    '::ffff:127.',
    '::ffff:10.',
    '::ffff:192.168.',
    '::ffff:169.254.',
  ]

  if (
    forbidden.includes(hostname) ||
    privateRanges.some((r) => hostname.startsWith(r)) ||
    ipv6Private.some((r) => hostname.startsWith(r)) ||
    hostname === '0000:0000:0000:0000:0000:0000:0000:0001'
  ) {
    throw new Error('Cannot audit private or internal URLs')
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs can be audited')
  }
}

function tierFromScore(
  score: number
): 'platinum' | 'gold' | 'silver' | 'bronze' | 'unaudited' {
  if (score >= 90) return 'platinum'
  if (score >= 75) return 'gold'
  if (score >= 60) return 'silver'
  if (score >= 40) return 'bronze'
  return 'unaudited'
}

function generateHermesId(): string {
  const hex = randomBytes(4).toString('hex').toUpperCase()
  return `AH-2026-${hex}`
}

// ---------------------------------------------------------------------------
// Cap Rules
// ---------------------------------------------------------------------------

function applyCaps(
  dimensions: DimensionResult[],
  rawScore: number
): { score: number; caps: CapApplied[] } {
  const caps: CapApplied[] = []
  let finalScore = rawScore

  // Find dimension results
  const d1 = dimensions.find((d) => d.dimension === 'D1')
  const d2 = dimensions.find((d) => d.dimension === 'D2')
  const d7 = dimensions.find((d) => d.dimension === 'D7')

  // Cap 1: No TLS → capped at 39 (max Bronze)
  if (d7 && hasNoTls(d7)) {
    if (finalScore > 39) {
      finalScore = 39
      caps.push({ rule: 'No valid TLS certificate', capped_to: 39 })
    }
  }

  // NOTE: The old "no agent discovery = cap 59" rule was REMOVED in v2.
  // Companies should not be capped for lacking protocols that barely exist yet.
  // Agent-native features now contribute via the bonus multiplier instead.

  // Cap 2: No callable endpoints at all → capped at 29
  if (d2) {
    const hasRestEndpoints = d2.checks.some(
      (c) => c.name === 'REST API Endpoints' && c.passed
    )
    const hasMcpEndpoints = d2.checks.some(
      (c) => c.name === 'MCP Tools List' && c.passed
    )

    if (!hasRestEndpoints && !hasMcpEndpoints) {
      if (finalScore > 29) {
        finalScore = 29
        caps.push({
          rule: 'No callable endpoints (REST or MCP)',
          capped_to: 29,
        })
      }
    }
  }

  return { score: Math.round(finalScore), caps }
}

// ---------------------------------------------------------------------------
// Agent-Native Bonus Calculator (7% of total score)
// ---------------------------------------------------------------------------
// This extracts agent-native signals from D1 and D2 dimension results and
// converts them into a bonus score worth up to 7 points (0.07 * 100).
// The bonus rewards adoption of emerging protocols without penalizing
// companies that haven't adopted them yet.

function calculateAgentNativeBonus(dimensions: DimensionResult[]): number {
  const d1 = dimensions.find((d) => d.dimension === 'D1')
  const d2 = dimensions.find((d) => d.dimension === 'D2')

  let bonusRaw = 0

  if (d1) {
    // Agent Card (up to 30 pts of bonus)
    const agentCardCheck = d1.checks.find((c) => c.name === 'Agent Card')
    if (agentCardCheck?.passed) bonusRaw += 30
    else if (agentCardCheck && agentCardCheck.points > 0) bonusRaw += 10

    // llms.txt (up to 25 pts of bonus)
    const llmsCheck = d1.checks.find((c) => c.name === 'llms.txt')
    if (llmsCheck?.passed) bonusRaw += 25
    else if (llmsCheck && llmsCheck.points > 0) bonusRaw += 8

    // MCP Discovery (up to 15 pts of bonus)
    const mcpCheck = d1.checks.find((c) => c.name === 'MCP Discovery')
    if (mcpCheck?.passed) bonusRaw += 15
    else if (mcpCheck && mcpCheck.points > 0) bonusRaw += 5

    // AGENTS.md (up to 15 pts of bonus)
    const agentsCheck = d1.checks.find((c) => c.name === 'AGENTS.md')
    if (agentsCheck?.passed) bonusRaw += 15
    else if (agentsCheck && agentsCheck.points > 0) bonusRaw += 5
  }

  if (d2) {
    // MCP Tools callable (up to 15 pts of bonus)
    const mcpToolsCheck = d2.checks.find((c) => c.name === 'MCP Tools List')
    if (mcpToolsCheck?.passed) bonusRaw += 15
    else if (mcpToolsCheck && mcpToolsCheck.points > 0) bonusRaw += 5
  }

  // Scale: bonusRaw is 0-100, weight is 0.07, so max bonus = 7 points
  const bonusScore = Math.min(bonusRaw, 100) * 0.07
  return bonusScore
}

// ---------------------------------------------------------------------------
// Main Scanner
// ---------------------------------------------------------------------------

export async function runScan(rawUrl: string, options?: { vertical?: string | null }): Promise<ScanResult> {
  const base = normalizeUrl(rawUrl)
  validateAuditTarget(base)

  // Global timeout: abort all probes after 50s (stays under Vercel 60s limit)
  const globalController = new AbortController()
  const globalTimer = setTimeout(() => globalController.abort(), 50_000)

  try {
    // Run all 9 dimension scanners in parallel with graceful degradation
    const LABELS = ['Discoverability', 'API Quality', 'Onboarding', 'Pricing', 'Payment', 'Data Quality', 'Security', 'Reliability', 'Agent Experience']
    const DIMS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9']
    // v2 weights: Foundation (60%) + Accessibility (25%) + Commerce (15%)
    // D1:0.12  D2:0.15  D3:0.08  D4:0.05  D5:0.08  D6:0.10  D7:0.12  D8:0.13  D9:0.10
    // Remaining 0.07 goes to agent-native bonus (calculated separately)
    const BASE_WEIGHTS = [0.12, 0.15, 0.08, 0.05, 0.08, 0.10, 0.12, 0.13, 0.10]

    // -----------------------------------------------------------------------
    // Vertical-specific weight adjustment (optional)
    // When a vertical is provided and has a known profile, we adjust the
    // dimension weights using vertical multipliers. The weights are
    // renormalized to preserve the 0.93 total (agent-native bonus stays 0.07).
    // -----------------------------------------------------------------------
    let verticalApplied: string | null = null
    let WEIGHTS = BASE_WEIGHTS

    if (options?.vertical) {
      const vw = getVerticalWeights(options.vertical)
      if (vw) {
        WEIGHTS = applyVerticalWeights(vw)
        verticalApplied = vw.vertical
      }
    }

    const results = await Promise.allSettled([
      scanDiscoverability(base, globalController.signal),
      scanInteroperability(base, globalController.signal),
      scanOnboarding(base, globalController.signal),
      scanPricing(base, globalController.signal),
      scanPayment(base, globalController.signal),
      scanDataQuality(base, globalController.signal),
      scanSecurity(base, globalController.signal),
      scanReliability(base, globalController.signal),
      scanAgentExperience(base, globalController.signal),
    ])

    const dimensions: DimensionResult[] = results.map((r, i) =>
      r.status === 'fulfilled'
        ? r.value
        : {
            dimension: DIMS[i],
            label: LABELS[i],
            score: 0,
            weight: WEIGHTS[i],
            checks: [{ name: 'Scanner Error', passed: false, details: r.reason?.message || 'Unknown error', points: 0 }],
            recommendations: [{ action: `${LABELS[i]} scanner failed — retry later`, impact: 'unknown', difficulty: 'easy' as const, auto_fixable: false }],
          }
    )

    // Update dimension weights to reflect vertical adjustments (if applied)
    // This ensures the DimensionResult.weight field is accurate in the response
    for (let i = 0; i < dimensions.length; i++) {
      dimensions[i].weight = WEIGHTS[i]
    }

    // Calculate weighted total (93% from dimensions)
    const weightedRaw = dimensions.reduce(
      (sum, d) => sum + d.score * d.weight,
      0
    )

    // Agent-Native Bonus (7% of total score)
    // This rewards companies that have adopted agent-native protocols
    // (MCP, agent cards, llms.txt, A2A) as a BONUS on top of base quality.
    const agentNativeBonus = calculateAgentNativeBonus(dimensions)

    const combinedRaw = weightedRaw + agentNativeBonus

    // Apply cap rules
    const { score: totalScore, caps } = applyCaps(dimensions, combinedRaw)
    const tier = tierFromScore(totalScore)

    // Extract domain for display
    const domain = base.replace(/^https?:\/\//, '').replace(/^www\./, '')

    // Generate next steps: top recommendations sorted by impact, from weakest dims
    const nextSteps: string[] = []
    const sortedDims = [...dimensions].sort((a, b) => a.score - b.score)
    for (const dim of sortedDims) {
      for (const rec of dim.recommendations) {
        if (nextSteps.length >= 7) break
        nextSteps.push(`[${dim.label}] ${rec.action}`)
      }
      if (nextSteps.length >= 7) break
    }

    return {
      hermes_id: generateHermesId(),
      domain,
      total_score: totalScore,
      tier,
      dimensions,
      caps_applied: caps,
      scanned_at: new Date().toISOString(),
      next_steps: nextSteps,
      vertical_applied: verticalApplied,
    }
  } finally {
    clearTimeout(globalTimer)
  }
}

// Re-export helpers for use in API routes
export { tierFromScore, normalizeUrl, validateAuditTarget }
