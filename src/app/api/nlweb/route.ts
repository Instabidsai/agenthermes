import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface NLWebResponse {
  query: string
  answer: string
  data: Record<string, unknown> | Record<string, unknown>[] | null
  source: string
  timestamp: string
}

function tierFromScore(score: number): string {
  if (score >= 90) return 'platinum'
  if (score >= 75) return 'gold'
  if (score >= 60) return 'silver'
  if (score >= 40) return 'bronze'
  return 'unaudited'
}

function tierLabel(tier: string): string {
  const labels: Record<string, string> = {
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
    bronze: 'Bronze',
    unaudited: 'Not Scored',
  }
  return labels[tier] || tier
}

/**
 * NLWeb endpoint — responds to natural language queries about
 * Agent Readiness Scores and the AgentHermes network.
 *
 * GET /api/nlweb?q=What is Stripe's agent readiness score?
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim()

  if (!q) {
    return NextResponse.json(
      {
        error: 'Missing query parameter "q"',
        code: 'MISSING_QUERY',
        usage: 'GET /api/nlweb?q=What is the average score?',
        example_queries: [
          "What is Stripe's agent readiness score?",
          'Which businesses are Gold tier?',
          'What is the average score?',
          'How many businesses are scored?',
          'Show top 5 businesses by score',
          'What tiers exist?',
        ],
      },
      { status: 400 }
    )
  }

  try {
    const result = await routeQuery(q)
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to process query', code: 'QUERY_ERROR', detail: message },
      { status: 500 }
    )
  }
}

async function routeQuery(query: string): Promise<NLWebResponse> {
  const q = query.toLowerCase()

  // --- Pattern: "what is MCP" ---
  if (/\bwhat\s+is\s+mcp\b/i.test(q) || /\bdefine\s+mcp\b/i.test(q) || /\bmcp\s+(?:definition|meaning|explained)\b/i.test(q)) {
    return {
      query,
      answer: 'MCP (Model Context Protocol) is an open standard created by Anthropic that lets AI agents call tools on remote servers. It defines a JSON-RPC interface where a server exposes callable functions (tools), readable data (resources), and reusable prompt templates. MCP enables AI agents to interact with businesses programmatically — checking availability, placing orders, or reading product catalogs — without custom integration per agent.',
      data: {
        term: 'MCP',
        full_name: 'Model Context Protocol',
        creator: 'Anthropic',
        spec_url: 'https://modelcontextprotocol.io',
        learn_more: 'https://agenthermes.ai/glossary',
      },
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  // --- Pattern: "what is ARL" ---
  if (/\bwhat\s+is\s+arl\b/i.test(q) || /\bdefine\s+arl\b/i.test(q) || /\barl\s+(?:definition|meaning|explained|levels?)\b/i.test(q) || /\bagent\s+readiness\s+level/i.test(q)) {
    return {
      query,
      answer: 'ARL (Agent Readiness Level) is a 0-5 scale that measures how prepared a business is for AI agent interactions. ARL 0 means no agent-readable presence at all. ARL 1 means basic structured data exists (e.g., JSON-LD, OpenAPI). ARL 2 means the business has machine-readable profiles like llms.txt or agent-card.json. ARL 3 means functional API endpoints agents can call. ARL 4 means full MCP integration with tools, resources, and prompts. ARL 5 means autonomous agent transactions with payment rails and real-time fulfillment.',
      data: {
        term: 'ARL',
        full_name: 'Agent Readiness Level',
        scale: '0-5',
        levels: [
          { level: 0, label: 'Invisible', description: 'No agent-readable presence' },
          { level: 1, label: 'Discoverable', description: 'Basic structured data (JSON-LD, OpenAPI)' },
          { level: 2, label: 'Described', description: 'Machine-readable profiles (llms.txt, agent-card.json)' },
          { level: 3, label: 'Callable', description: 'Functional API endpoints for agents' },
          { level: 4, label: 'Integrated', description: 'Full MCP with tools, resources, prompts' },
          { level: 5, label: 'Autonomous', description: 'Agent transactions with payment rails' },
        ],
        learn_more: 'https://agenthermes.ai/blog/arl-levels-explained',
      },
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  // --- Pattern: "what is agent readiness" ---
  if (/\bwhat\s+is\s+agent\s+readiness\b/i.test(q) || /\bagent\s+readiness\s+(?:score|definition|meaning)\b/i.test(q) || /\bdefine\s+agent\s+readiness\b/i.test(q)) {
    return {
      query,
      answer: 'Agent Readiness is a measure of how well a business can be discovered, understood, and transacted with by AI agents. The Agent Readiness Score (0-100) evaluates 9 dimensions: Discovery (D1), API Quality (D2), Onboarding (D3), Pricing Transparency (D4), Payment Rails (D5), Data Quality (D6), Security (D7), Reliability (D8), and Agent Experience (D9). Businesses scoring 90+ earn Platinum tier, 75+ Gold, 60+ Silver, and 40+ Bronze.',
      data: {
        term: 'Agent Readiness',
        score_range: '0-100',
        dimensions: 9,
        tiers: { platinum: '90+', gold: '75+', silver: '60+', bronze: '40+', not_scored: '<40' },
        learn_more: 'https://agenthermes.ai/what-is-agent-ready',
      },
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  // --- Pattern: compare two businesses ---
  // "compare stripe and openai" / "stripe vs openai" / "compare stripe to openai"
  const compareMatch = q.match(/(?:compare|vs\.?|versus)\s+([a-z0-9.-]+)\s+(?:and|vs\.?|versus|to|with)\s+([a-z0-9.-]+)/i)
    || q.match(/([a-z0-9.-]+)\s+(?:vs\.?|versus)\s+([a-z0-9.-]+)/i)
  if (compareMatch) {
    const [, termA, termB] = compareMatch
    return await compareBusinesses(termA.trim(), termB.trim(), query)
  }

  // --- Pattern: specific business score lookup ---
  // "What is Stripe's score?" / "score for stripe.com" / "agent readiness score of acme"
  const scorePatterns = [
    /(?:what(?:'s| is)(?: the)?) (?:agent readiness )?score (?:for|of) ["']?([^"'?]+)["']?/i,
    /(?:score (?:for|of)) ["']?([^"'?]+)["']?/i,
    /["']?([a-z0-9.-]+(?:\.[a-z]{2,}))["']?(?:'s)? (?:agent readiness )?score/i,
    /["']?([a-z0-9_ -]+)["']?(?:'s) (?:agent readiness )?score/i,
  ]

  for (const pattern of scorePatterns) {
    const match = query.match(pattern)
    if (match) {
      const term = match[1].trim().replace(/[?.]$/, '')
      return await lookupBusinessScore(term, query)
    }
  }

  // --- Pattern: tier queries ---
  // "Which businesses are Gold tier?" / "list platinum businesses"
  const tierMatch = q.match(
    /(?:which|list|show|get|find)(?: all)? (?:businesses|companies)(?: (?:are|in|at|with))? (platinum|gold|silver|bronze|unaudited|not scored|failing)/
  )
  if (tierMatch) {
    const tierName = tierMatch[1].replace('not scored', 'unaudited').replace('failing', 'unaudited')
    return await queryByTier(tierName, query)
  }

  // Also match "Gold tier businesses" pattern
  const tierMatch2 = q.match(
    /(platinum|gold|silver|bronze|unaudited|not scored|failing)(?: tier)? (?:businesses|companies)/
  )
  if (tierMatch2) {
    const tierName = tierMatch2[1].replace('not scored', 'unaudited').replace('failing', 'unaudited')
    return await queryByTier(tierName, query)
  }

  // --- Pattern: average score ---
  if (q.includes('average') && q.includes('score')) {
    return await computeAverageScore(query)
  }

  // --- Pattern: count ---
  if (
    (q.includes('how many') || q.includes('count') || q.includes('total')) &&
    (q.includes('business') || q.includes('scored') || q.includes('scanned'))
  ) {
    return await countBusinesses(query)
  }

  // --- Pattern: top / best / highest ---
  if (q.includes('top') || q.includes('best') || q.includes('highest') || q.includes('leader')) {
    const limitMatch = q.match(/(?:top|best|highest)\s*(\d+)/)
    const limit = limitMatch ? parseInt(limitMatch[1], 10) : 5
    return await topBusinesses(Math.min(limit, 25), query)
  }

  // --- Pattern: lowest / worst ---
  if (q.includes('lowest') || q.includes('worst') || q.includes('bottom')) {
    const limitMatch = q.match(/(?:lowest|worst|bottom)\s*(\d+)/)
    const limit = limitMatch ? parseInt(limitMatch[1], 10) : 5
    return await bottomBusinesses(Math.min(limit, 25), query)
  }

  // --- Pattern: tier distribution / breakdown ---
  if (q.includes('distribution') || q.includes('breakdown') || (q.includes('tier') && (q.includes('how many') || q.includes('count')))) {
    return await tierDistribution(query)
  }

  // --- Pattern: recently scanned ---
  if (q.includes('recent') || q.includes('latest') || q.includes('last')) {
    return await recentlyScanned(query)
  }

  // --- Fallback: try to find a business by the query text ---
  return await fallbackSearch(query)
}

async function lookupBusinessScore(term: string, query: string): Promise<NLWebResponse> {
  const db = getServiceClient()

  // Sanitize term to prevent PostgREST filter injection (commas, dots, parens break .or() syntax)
  const safeTerm = term.replace(/[^a-zA-Z0-9\s-]/g, '')
  if (!safeTerm) {
    return {
      query,
      answer: `No valid search term found in "${term}".`,
      data: null,
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  // Try domain match first, then name/slug
  let result = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier, updated_at')
    .or(`domain.ilike.%${safeTerm}%,name.ilike.%${safeTerm}%,slug.ilike.%${safeTerm}%`)
    .order('audit_score', { ascending: false })
    .limit(1)

  const biz = (result.data as Record<string, any>[] | null)?.[0]

  if (!biz) {
    return {
      query,
      answer: `No business found matching "${term}". It may not have been scanned yet.`,
      data: null,
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  return {
    query,
    answer: `${biz.name} has an Agent Readiness Score of ${biz.audit_score}/100 (${tierLabel(biz.audit_tier)} tier).`,
    data: {
      name: biz.name,
      domain: biz.domain,
      score: biz.audit_score,
      tier: biz.audit_tier,
      tier_label: tierLabel(biz.audit_tier),
      profile_url: `https://agenthermes.ai/business/${biz.slug}`,
      last_updated: biz.updated_at,
    },
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function queryByTier(tier: string, query: string): Promise<NLWebResponse> {
  const db = getServiceClient()
  const { data, count } = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier', { count: 'exact' })
    .eq('audit_tier', tier)
    .order('audit_score', { ascending: false })
    .limit(20)

  const businesses = (data as Record<string, any>[] | null) || []
  const total = count ?? businesses.length

  return {
    query,
    answer: `${total} business${total === 1 ? '' : 'es'} ${total === 1 ? 'is' : 'are'} in the ${tierLabel(tier)} tier.`,
    data: businesses.map((b) => ({
      name: b.name,
      domain: b.domain,
      score: b.audit_score,
      profile_url: `https://agenthermes.ai/business/${b.slug}`,
    })),
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function computeAverageScore(query: string): Promise<NLWebResponse> {
  const db = getServiceClient()
  const { data } = await db.from('businesses').select('audit_score').not('audit_score', 'is', null)

  const scores = ((data as Record<string, any>[] | null) || [])
    .map((r) => r.audit_score as number)
    .filter((s) => typeof s === 'number' && !Number.isNaN(s))
  const count = scores.length

  if (count === 0) {
    return {
      query,
      answer: 'No businesses have been scored yet.',
      data: null,
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  const avg = scores.reduce((a, b) => a + b, 0) / count
  const rounded = Math.round(avg * 10) / 10

  return {
    query,
    answer: `The average Agent Readiness Score across ${count} businesses is ${rounded}/100 (${tierLabel(tierFromScore(rounded))} tier).`,
    data: {
      average_score: rounded,
      average_tier: tierFromScore(rounded),
      total_businesses: count,
      min_score: Math.min(...scores),
      max_score: Math.max(...scores),
    },
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function countBusinesses(query: string): Promise<NLWebResponse> {
  const db = getServiceClient()
  const { count } = await db
    .from('businesses')
    .select('*', { count: 'exact', head: true })

  const total = count ?? 0

  return {
    query,
    answer: `${total} business${total === 1 ? ' has' : 'es have'} been scored on AgentHermes.`,
    data: { total_businesses: total },
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function topBusinesses(limit: number, query: string): Promise<NLWebResponse> {
  const db = getServiceClient()
  const { data } = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier')
    .order('audit_score', { ascending: false })
    .limit(limit)

  const businesses = (data as Record<string, any>[] | null) || []

  return {
    query,
    answer: `Top ${businesses.length} businesses by Agent Readiness Score:`,
    data: businesses.map((b, i) => ({
      rank: i + 1,
      name: b.name,
      domain: b.domain,
      score: b.audit_score,
      tier: tierLabel(b.audit_tier),
      profile_url: `https://agenthermes.ai/business/${b.slug}`,
    })),
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function bottomBusinesses(limit: number, query: string): Promise<NLWebResponse> {
  const db = getServiceClient()
  const { data } = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier')
    .gt('audit_score', 0)
    .order('audit_score', { ascending: true })
    .limit(limit)

  const businesses = (data as Record<string, any>[] | null) || []

  return {
    query,
    answer: `Bottom ${businesses.length} scored businesses by Agent Readiness Score:`,
    data: businesses.map((b, i) => ({
      rank: i + 1,
      name: b.name,
      domain: b.domain,
      score: b.audit_score,
      tier: tierLabel(b.audit_tier),
      profile_url: `https://agenthermes.ai/business/${b.slug}`,
    })),
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function tierDistribution(query: string): Promise<NLWebResponse> {
  const db = getServiceClient()
  const { data } = await db.from('businesses').select('audit_tier')

  const businesses = (data as Record<string, any>[] | null) || []
  const distribution: Record<string, number> = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    unaudited: 0,
  }

  for (const b of businesses) {
    const tier = b.audit_tier as string
    if (tier in distribution) {
      distribution[tier]++
    }
  }

  const total = businesses.length
  const parts = Object.entries(distribution)
    .filter(([, count]) => count > 0)
    .map(([tier, count]) => `${tierLabel(tier)}: ${count}`)
    .join(', ')

  return {
    query,
    answer: `Tier distribution across ${total} businesses: ${parts || 'none scored yet'}.`,
    data: {
      total: total,
      distribution,
    },
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function recentlyScanned(query: string): Promise<NLWebResponse> {
  const db = getServiceClient()
  const { data } = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier, updated_at')
    .order('updated_at', { ascending: false })
    .limit(5)

  const businesses = (data as Record<string, any>[] | null) || []

  return {
    query,
    answer: `${businesses.length} most recently scanned businesses:`,
    data: businesses.map((b) => ({
      name: b.name,
      domain: b.domain,
      score: b.audit_score,
      tier: tierLabel(b.audit_tier),
      scanned: b.updated_at,
      profile_url: `https://agenthermes.ai/business/${b.slug}`,
    })),
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function compareBusinesses(termA: string, termB: string, query: string): Promise<NLWebResponse> {
  const db = getServiceClient()

  const safeA = termA.replace(/[^a-zA-Z0-9\s-]/g, '')
  const safeB = termB.replace(/[^a-zA-Z0-9\s-]/g, '')

  if (!safeA || !safeB) {
    return {
      query,
      answer: 'Could not parse business names for comparison.',
      data: null,
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  const { data: dataA } = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier, updated_at')
    .or(`domain.ilike.%${safeA}%,name.ilike.%${safeA}%,slug.ilike.%${safeA}%`)
    .order('audit_score', { ascending: false })
    .limit(1)

  const { data: dataB } = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier, updated_at')
    .or(`domain.ilike.%${safeB}%,name.ilike.%${safeB}%,slug.ilike.%${safeB}%`)
    .order('audit_score', { ascending: false })
    .limit(1)

  const bizA = (dataA as Record<string, any>[] | null)?.[0]
  const bizB = (dataB as Record<string, any>[] | null)?.[0]

  if (!bizA && !bizB) {
    return {
      query,
      answer: `Neither "${termA}" nor "${termB}" have been scanned yet.`,
      data: null,
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  if (!bizA) {
    return {
      query,
      answer: `"${termA}" has not been scanned yet. ${bizB!.name} scores ${bizB!.audit_score}/100 (${tierLabel(bizB!.audit_tier)}).`,
      data: { found: bizB, missing: termA },
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  if (!bizB) {
    return {
      query,
      answer: `"${termB}" has not been scanned yet. ${bizA.name} scores ${bizA.audit_score}/100 (${tierLabel(bizA.audit_tier)}).`,
      data: { found: bizA, missing: termB },
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  const diff = (bizA.audit_score as number) - (bizB.audit_score as number)
  const winner = diff > 0 ? bizA.name : diff < 0 ? bizB.name : null
  const summary = winner
    ? `${winner} leads by ${Math.abs(diff)} points.`
    : `${bizA.name} and ${bizB.name} are tied.`

  return {
    query,
    answer: `${bizA.name} scores ${bizA.audit_score}/100 (${tierLabel(bizA.audit_tier)}) vs ${bizB.name} at ${bizB.audit_score}/100 (${tierLabel(bizB.audit_tier)}). ${summary}`,
    data: {
      business_a: {
        name: bizA.name,
        domain: bizA.domain,
        score: bizA.audit_score,
        tier: tierLabel(bizA.audit_tier),
        profile_url: `https://agenthermes.ai/business/${bizA.slug}`,
      },
      business_b: {
        name: bizB.name,
        domain: bizB.domain,
        score: bizB.audit_score,
        tier: tierLabel(bizB.audit_tier),
        profile_url: `https://agenthermes.ai/business/${bizB.slug}`,
      },
      score_difference: Math.abs(diff),
      winner: winner,
      compare_url: `https://agenthermes.ai/compare`,
    },
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}

async function fallbackSearch(query: string): Promise<NLWebResponse> {
  const db = getServiceClient()

  // Extract potential search terms (remove common words)
  const stopWords = new Set([
    'what', 'is', 'the', 'a', 'an', 'of', 'for', 'in', 'on', 'at', 'to',
    'and', 'or', 'how', 'which', 'show', 'me', 'find', 'get', 'tell',
    'about', 'score', 'agent', 'readiness', 'business', 'tier',
  ])
  const terms = query
    .toLowerCase()
    .replace(/[^a-z0-9 .-]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w))

  if (terms.length === 0) {
    return {
      query,
      answer:
        "I couldn't understand that query. Try asking about a specific business score, tier, or aggregate stat like average score or count.",
      data: null,
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  // Search by the first meaningful term (already sanitized by regex above, but double-check)
  const searchTerm = terms[0].replace(/[^a-zA-Z0-9\s-]/g, '')
  if (!searchTerm) {
    return {
      query,
      answer: "I couldn't understand that query. Try asking about a specific business score, tier, or aggregate stat.",
      data: null,
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }
  const { data } = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier')
    .or(
      `domain.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%`
    )
    .order('audit_score', { ascending: false })
    .limit(5)

  const businesses = (data as Record<string, any>[] | null) || []

  if (businesses.length === 0) {
    return {
      query,
      answer: `No results found for "${query}". Try asking about a specific business, tier, or stat.`,
      data: null,
      source: 'agenthermes.ai',
      timestamp: new Date().toISOString(),
    }
  }

  return {
    query,
    answer: `Found ${businesses.length} result${businesses.length === 1 ? '' : 's'} matching your query:`,
    data: businesses.map((b) => ({
      name: b.name,
      domain: b.domain,
      score: b.audit_score,
      tier: tierLabel(b.audit_tier),
      profile_url: `https://agenthermes.ai/business/${b.slug}`,
    })),
    source: 'agenthermes.ai',
    timestamp: new Date().toISOString(),
  }
}
