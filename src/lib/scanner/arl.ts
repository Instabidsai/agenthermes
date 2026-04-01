// ---------------------------------------------------------------------------
// Agent Readiness Level (ARL) Calculator
// ---------------------------------------------------------------------------
// Maps 9-dimension scan results to a single ARL level (0-6).
//
// ARL Framework:
//   ARL-0  Dark           — Invisible to agents
//   ARL-1  Discoverable   — Agents can FIND the business
//   ARL-2  Readable       — Agents can UNDERSTAND offerings
//   ARL-3  Bookable       — Agents can START a transaction
//   ARL-4  Transactable   — Agents can COMPLETE a transaction
//   ARL-5  Autonomous     — Agents can MANAGE the relationship
//   ARL-6  Interoperable  — Agent-to-agent communication
//
// Levels are cumulative — you cannot be ARL-4 without passing ARL-0 through ARL-3.
// ---------------------------------------------------------------------------

import type { DimensionResult } from './types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ARLResult {
  level: number         // 0-6
  name: string          // "Dark", "Discoverable", etc.
  description: string   // one-line summary
  nextLevel: {
    level: number
    name: string
    requirements: string[]
  } | null
  verticalContext?: string  // what this level means for their vertical
}

// ---------------------------------------------------------------------------
// ARL Level Definitions
// ---------------------------------------------------------------------------

const ARL_LEVELS: {
  level: number
  name: string
  description: string
}[] = [
  { level: 0, name: 'Dark', description: 'Business exists but is invisible to AI agents. No structured data, no APIs, no machine-readable presence.' },
  { level: 1, name: 'Discoverable', description: 'An agent can find the business and understand what it does via structured data and machine-readable descriptions.' },
  { level: 2, name: 'Readable', description: 'An agent can read offerings, pricing, and availability in structured formats without scraping HTML.' },
  { level: 3, name: 'Bookable', description: 'An agent can initiate a transaction — book, order, or request service — on behalf of a human.' },
  { level: 4, name: 'Transactable', description: 'An agent can complete the full transaction cycle: pay, track status, modify, and cancel.' },
  { level: 5, name: 'Autonomous', description: 'An agent can manage the ongoing relationship: reorder, renew, escalate, and negotiate without human intervention.' },
  { level: 6, name: 'Interoperable', description: 'Agent-to-agent communication via A2A and MCP. The business operates its own agent that negotiates with customer agents.' },
]

// ---------------------------------------------------------------------------
// Vertical Context — what each ARL level means for specific verticals
// ---------------------------------------------------------------------------

const VERTICAL_CONTEXT: Record<string, Record<number, string>> = {
  restaurant: {
    0: 'Menu is a JPG, hours are on Facebook. Agents cannot find or order from this restaurant.',
    1: 'Schema.org markup, Google Business Profile. Agents can recommend this restaurant.',
    2: 'Menu, pricing, and hours are machine-readable. Agents can compare and recommend.',
    3: 'Online ordering or reservation API works. Agents can book a table or place an order.',
    4: 'Agents can pay, modify orders, cancel reservations, and track delivery.',
    5: 'Agents manage recurring orders, dietary preferences, loyalty points, and proactive suggestions.',
    6: 'Restaurant runs its own agent that negotiates group bookings and coordinates with delivery agents.',
  },
  saas: {
    0: 'No API docs, no structured data. Agents cannot evaluate or integrate this platform.',
    1: 'Documentation and service descriptions are machine-readable. Agents can discover capabilities.',
    2: 'API reference, pricing tiers, and feature matrix are structured. Agents can compare platforms.',
    3: 'Self-serve signup and API key provisioning work programmatically. Agents can onboard.',
    4: 'Agents can subscribe, pay, upgrade plans, and manage billing via API.',
    5: 'Agents manage the full lifecycle: usage monitoring, plan optimization, issue escalation.',
    6: 'Platform exposes MCP tools and A2A agent card. Customer agents integrate directly.',
  },
  ecommerce: {
    0: 'Product catalog is not machine-readable. Agents cannot browse or purchase.',
    1: 'Products have schema.org markup. Agents can discover and recommend items.',
    2: 'Product feeds with pricing, availability, and reviews are structured. Agents can comparison shop.',
    3: 'Cart and checkout APIs work. Agents can add items and initiate purchases.',
    4: 'Agents can pay, track shipments, process returns, and modify orders.',
    5: 'Agents manage subscriptions, reorders, wishlists, and loyalty programs autonomously.',
    6: 'Store runs its own agent for dynamic pricing, bundle negotiation, and multi-vendor coordination.',
  },
  healthcare: {
    0: 'Provider information is unstructured. Agents cannot find or book appointments.',
    1: 'Provider profiles with specialties, insurance, and hours are machine-readable.',
    2: 'Availability, accepted insurance, and service descriptions are structured and queryable.',
    3: 'Appointment booking API works. Agents can schedule on behalf of patients.',
    4: 'Agents can pay copays, access visit summaries, and manage prescriptions.',
    5: 'Agents coordinate care across providers, manage referrals, and handle insurance claims.',
    6: 'Provider agents communicate with patient agents and insurance agents via A2A protocols.',
  },
  'real-estate': {
    0: 'Listings are only on MLS or brochure sites. Agents cannot search or inquire.',
    1: 'Listings have schema.org markup with structured property data.',
    2: 'Property details, pricing history, and availability are in structured feeds.',
    3: 'Tour scheduling and inquiry APIs work. Agents can book viewings.',
    4: 'Agents can submit offers, manage escrow, and track transaction status.',
    5: 'Agents manage property portfolios, lease renewals, and maintenance requests.',
    6: 'Buyer and seller agents negotiate directly via A2A protocols.',
  },
  fintech: {
    0: 'No API, no structured product data. Agents cannot access financial services.',
    1: 'Product offerings and terms are machine-readable. Agents can discover services.',
    2: 'Rate comparisons, eligibility criteria, and fee structures are structured.',
    3: 'Application APIs work. Agents can apply for accounts or loans.',
    4: 'Agents can initiate transfers, pay bills, and manage accounts via API.',
    5: 'Agents optimize portfolios, manage recurring payments, and detect anomalies.',
    6: 'Financial institution agents negotiate rates and terms with customer agents.',
  },
  'home-services': {
    0: 'Plumber with a brochure website. Agents cannot find or book.',
    1: 'Service areas, specialties, and hours are in structured data. Agents can recommend.',
    2: 'Service catalog with pricing ranges and availability is machine-readable.',
    3: 'Booking or quote request API works. Agents can schedule appointments.',
    4: 'Agents can pay for services, track job status, and handle invoicing.',
    5: 'Agents manage recurring maintenance, seasonal scheduling, and warranty claims.',
    6: 'Service provider agents coordinate with property management and insurance agents.',
  },
}

// ---------------------------------------------------------------------------
// Requirement descriptions for reaching each level
// ---------------------------------------------------------------------------

function getRequirementsForLevel(level: number, dimensions: DimensionResult[]): string[] {
  const d1 = dimensions.find(d => d.dimension === 'D1')
  const d2 = dimensions.find(d => d.dimension === 'D2')
  const d3 = dimensions.find(d => d.dimension === 'D3')
  const d5 = dimensions.find(d => d.dimension === 'D5')
  const d6 = dimensions.find(d => d.dimension === 'D6')
  const d7 = dimensions.find(d => d.dimension === 'D7')
  const d8 = dimensions.find(d => d.dimension === 'D8')
  const d9 = dimensions.find(d => d.dimension === 'D9')
  const total = dimensions.reduce((sum, d) => sum + d.score * d.weight, 0)

  const reqs: string[] = []

  switch (level) {
    case 1:
      if (!d1 || d1.score < 40) reqs.push('Improve Discoverability (D1) to 40+ — add schema.org markup, llms.txt, or agent-card.json')
      if (total < 20) reqs.push(`Raise total score to 20+ (currently ~${Math.round(total)})`)
      break
    case 2:
      if (!d1 || d1.score < 40) reqs.push('Discoverability (D1) must reach 40+')
      if ((!d6 || d6.score < 50) && (!d2 || d2.score < 50)) reqs.push('Raise Data Quality (D6) or API Quality (D2) to 50+ — publish structured product/service data')
      if (total < 35) reqs.push(`Raise total score to 35+ (currently ~${Math.round(total)})`)
      break
    case 3:
      if (!d3 || d3.score < 40) reqs.push('Improve Onboarding (D3) to 40+ — enable programmatic signup or booking')
      if (!d2 || d2.score < 50) reqs.push('Improve API Quality (D2) to 50+ — provide callable API endpoints')
      if (total < 50) reqs.push(`Raise total score to 50+ (currently ~${Math.round(total)})`)
      break
    case 4:
      if (!d5 || d5.score < 50) reqs.push('Improve Payment (D5) to 50+ — accept programmatic payments via Stripe, Square, etc.')
      if (!d7 || d7.score < 50) reqs.push('Improve Security (D7) to 50+ — proper TLS, auth headers, rate limiting')
      if (!d8 || d8.score < 50) reqs.push('Improve Reliability (D8) to 50+ — consistent response times, uptime monitoring')
      if (total < 60) reqs.push(`Raise total score to 60+ (currently ~${Math.round(total)})`)
      break
    case 5:
      if (!d3 || d3.score < 60) reqs.push('Raise Onboarding (D3) to 60+ — full self-serve lifecycle management')
      if (!d5 || d5.score < 60) reqs.push('Raise Payment (D5) to 60+ — subscription billing, refunds, modifications')
      if (!d9 || d9.score < 60) reqs.push('Raise Agent Experience (D9) to 60+ — error handling, SDKs, tracing')
      if (total < 70) reqs.push(`Raise total score to 70+ (currently ~${Math.round(total)})`)
      break
    case 6:
      reqs.push('Publish A2A agent card at /.well-known/agent-card.json with skills and task lifecycle')
      reqs.push('Expose MCP server with business capabilities as tools')
      if (total < 75) reqs.push(`Raise total score to 75+ (currently ~${Math.round(total)})`)
      break
  }

  return reqs
}

// ---------------------------------------------------------------------------
// Main ARL Calculator
// ---------------------------------------------------------------------------

export function computeARL(dimensions: DimensionResult[], vertical?: string): ARLResult {
  // Get individual dimension scores
  const d1 = dimensions.find(d => d.dimension === 'D1')?.score ?? 0
  const d2 = dimensions.find(d => d.dimension === 'D2')?.score ?? 0
  const d3 = dimensions.find(d => d.dimension === 'D3')?.score ?? 0
  const d5 = dimensions.find(d => d.dimension === 'D5')?.score ?? 0
  const d6 = dimensions.find(d => d.dimension === 'D6')?.score ?? 0
  const d7 = dimensions.find(d => d.dimension === 'D7')?.score ?? 0
  const d8 = dimensions.find(d => d.dimension === 'D8')?.score ?? 0
  const d9 = dimensions.find(d => d.dimension === 'D9')?.score ?? 0

  // Calculate total weighted score
  const total = dimensions.reduce((sum, d) => sum + d.score * d.weight, 0)

  // Check for A2A agent card or MCP endpoint (from D1/D2 checks)
  const d1Result = dimensions.find(d => d.dimension === 'D1')
  const d2Result = dimensions.find(d => d.dimension === 'D2')
  const hasAgentCard = d1Result?.checks.some(c => c.name === 'Agent Card' && c.passed) ?? false
  const hasMcpEndpoint = d2Result?.checks.some(c => c.name === 'MCP Tools List' && c.passed) ?? false

  // Determine level — check from highest to lowest (levels are cumulative)
  let level = 0

  if (total >= 75 && (hasAgentCard || hasMcpEndpoint)) {
    level = 6
  } else if (total >= 70 && d3 >= 60 && d5 >= 60 && d9 >= 60) {
    level = 5
  } else if (total >= 60 && d5 >= 50 && d7 >= 50 && d8 >= 50) {
    level = 4
  } else if (total >= 50 && d3 >= 40 && d2 >= 50) {
    level = 3
  } else if (total >= 35 && d1 >= 40 && (d6 >= 50 || d2 >= 50)) {
    level = 2
  } else if (total >= 20 && d1 >= 40) {
    level = 1
  }

  // Build result
  const arlDef = ARL_LEVELS[level]
  const nextLevelDef = level < 6 ? ARL_LEVELS[level + 1] : null

  // Get vertical context
  const normalizedVertical = vertical?.toLowerCase().replace(/\s+/g, '-')
  const verticalCtx = normalizedVertical ? VERTICAL_CONTEXT[normalizedVertical]?.[level] : undefined

  return {
    level: arlDef.level,
    name: arlDef.name,
    description: arlDef.description,
    nextLevel: nextLevelDef
      ? {
          level: nextLevelDef.level,
          name: nextLevelDef.name,
          requirements: getRequirementsForLevel(nextLevelDef.level, dimensions),
        }
      : null,
    verticalContext: verticalCtx,
  }
}
