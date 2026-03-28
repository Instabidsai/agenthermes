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
  if (q.includes('distribution') || q.includes('breakdown') || q.includes('tier') && (q.includes('how many') || q.includes('count'))) {
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

  // Try domain match first, then name/slug
  let result = await db
    .from('businesses')
    .select('name, domain, slug, audit_score, audit_tier, updated_at')
    .or(`domain.ilike.%${term}%,name.ilike.%${term}%,slug.ilike.%${term}%`)
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
  const { data } = await db.from('businesses').select('audit_score')

  const scores = ((data as Record<string, any>[] | null) || []).map(
    (r) => r.audit_score as number
  )
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

  // Search by the first meaningful term
  const searchTerm = terms[0]
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
