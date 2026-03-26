// ---------------------------------------------------------------------------
// Scanner Orchestrator — 9-Dimension Agent Readiness Scanner
// ---------------------------------------------------------------------------
// Replaces the old 5-category audit engine with a comprehensive 9-dimension
// scoring system. Each dimension runs in parallel with a 50s global timeout.
//
// Weights:
//   D1 Discoverability      × 0.20
//   D2 Interoperability     × 0.20
//   D3 Onboarding           × 0.10
//   D4 Pricing Transparency × 0.10
//   D5 Payment              × 0.10
//   D6 Data Quality         × 0.10
//   D7 Security             × 0.10
//   D8 Reliability          × 0.05
//   D9 Agent Experience     × 0.05
//
// Cap rules:
//   - No TLS → total capped at 39 (max Bronze)
//   - No Agent Card AND no llms.txt AND no MCP → capped at 59 (max Bronze)
//   - No callable endpoints at all → capped at 29
// ---------------------------------------------------------------------------

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

// Re-export types
export type { ScanResult, DimensionResult, CapApplied } from './types'
export type { Check, Recommendation } from './types'

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
  const hex = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase()
  ).join('')
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

  // Cap 2: No Agent Card AND no llms.txt AND no MCP → capped at 59
  if (d1) {
    const hasAgentCard = d1.checks.some(
      (c) => c.name === 'Agent Card' && c.passed
    )
    const hasLlmsTxt = d1.checks.some(
      (c) => c.name === 'llms.txt' && c.passed
    )
    const hasMcp = d1.checks.some(
      (c) => c.name === 'MCP Discovery' && c.passed
    )

    if (!hasAgentCard && !hasLlmsTxt && !hasMcp) {
      if (finalScore > 59) {
        finalScore = 59
        caps.push({
          rule: 'No Agent Card, no llms.txt, and no MCP — requires at least one discovery mechanism',
          capped_to: 59,
        })
      }
    }
  }

  // Cap 3: No callable endpoints at all → capped at 29
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
// Main Scanner
// ---------------------------------------------------------------------------

export async function runScan(rawUrl: string): Promise<ScanResult> {
  const base = normalizeUrl(rawUrl)
  validateAuditTarget(base)

  // Global timeout: abort all probes after 50s (stays under Vercel 60s limit)
  const globalController = new AbortController()
  const globalTimer = setTimeout(() => globalController.abort(), 50_000)

  try {
    // Run all 9 dimension scanners in parallel
    const [d1, d2, d3, d4, d5, d6, d7, d8, d9] = await Promise.all([
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

    const dimensions = [d1, d2, d3, d4, d5, d6, d7, d8, d9]

    // Calculate weighted total
    const weightedRaw = dimensions.reduce(
      (sum, d) => sum + d.score * d.weight,
      0
    )

    // Apply cap rules
    const { score: totalScore, caps } = applyCaps(dimensions, weightedRaw)
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
    }
  } finally {
    clearTimeout(globalTimer)
  }
}

// Re-export helpers for use in API routes
export { tierFromScore, normalizeUrl, validateAuditTarget }
