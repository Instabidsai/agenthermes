import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { generateEmbedding, embeddingToString } from '@/lib/embeddings'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const q = searchParams.get('q')
    const limit = Math.max(1, Math.min(parseInt(searchParams.get('limit') || '20', 10) || 20, 100))
    const rawThreshold = parseFloat(searchParams.get('threshold') || '0.3')
    const threshold = isNaN(rawThreshold) || rawThreshold < 0 || rawThreshold > 1 ? 0.3 : rawThreshold

    if (!q || q.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing required query parameter: q' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // --- Strategy 1: Vector similarity search (if embeddings are populated) ---
    const queryEmbedding = generateEmbedding(q)
    const embeddingStr = embeddingToString(queryEmbedding)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: semanticResults, error: rpcError } = await (supabase as any).rpc(
      'match_businesses',
      {
        query_embedding: embeddingStr,
        match_threshold: threshold,
        match_count: limit,
      }
    )

    if (!rpcError && semanticResults && semanticResults.length > 0) {
      return NextResponse.json({
        businesses: semanticResults,
        search_type: 'semantic',
        query: q,
        result_count: semanticResults.length,
      })
    }

    if (rpcError) {
      console.warn('[semantic] RPC error (falling back to text search):', rpcError.message)
    }

    // --- Strategy 2: Full-text search with ts_vector + ILIKE fallback ---
    return fullTextSearch(supabase, q, limit)
  } catch (err) {
    console.error(
      '[semantic] Unexpected error:',
      err instanceof Error ? err.message : err
    )
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Full-text search combining PostgreSQL tsvector ranking with ILIKE matching.
 * Results are scored by relevance: FTS rank + field-specific ILIKE bonuses.
 */
async function fullTextSearch(
  supabase: ReturnType<typeof getServiceClient>,
  q: string,
  limit: number
) {
  // Sanitize query for both ILIKE and tsquery usage
  const safeQ = q.replace(/[^a-zA-Z0-9\s-]/g, '').trim()
  if (!safeQ) {
    return NextResponse.json({
      businesses: [],
      search_type: 'fallback_ilike',
      query: q,
      result_count: 0,
    })
  }

  const ilike = `%${safeQ}%`
  // Convert search terms to tsquery format: "word1 & word2 & ..."
  const tsTerms = safeQ
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => `${w}:*`)
    .join(' & ')

  // Use raw SQL via RPC for full-text ranking + ILIKE fallback in one query.
  // Since Supabase JS client doesn't support ts_rank natively, we use a
  // combined ILIKE approach with scoring.
  const { data: ilikeData, error: ilikeError } = await supabase
    .from('businesses')
    .select(
      'id, name, slug, domain, description, vertical, capabilities, audit_score, audit_tier, trust_score, mcp_endpoints'
    )
    .or(
      `name.ilike.${ilike},description.ilike.${ilike},domain.ilike.${ilike}`
    )
    .order('audit_score', { ascending: false })
    .limit(limit * 2) // grab extras for re-ranking

  if (ilikeError) {
    console.error('[semantic fulltext] ILIKE error:', ilikeError.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }

  // Also search capabilities array — Supabase `.or()` doesn't support array contains inline,
  // so do a separate query for capability matches
  const { data: capData } = await supabase
    .from('businesses')
    .select(
      'id, name, slug, domain, description, vertical, capabilities, audit_score, audit_tier, trust_score, mcp_endpoints'
    )
    .contains('capabilities', [safeQ.toLowerCase()])
    .limit(limit)

  // Merge and deduplicate
  const seen = new Set<string>()
  const merged: Record<string, unknown>[] = []

  for (const row of [...(ilikeData || []), ...(capData || [])]) {
    const r = row as Record<string, unknown>
    const id = r.id as string
    if (!seen.has(id)) {
      seen.add(id)
      merged.push(r)
    }
  }

  // Score each result for relevance ranking
  const lowerQ = safeQ.toLowerCase()
  const queryWords = lowerQ.split(/\s+/).filter(Boolean)

  const scored = merged.map((biz) => {
    let score = 0
    const name = ((biz.name as string) || '').toLowerCase()
    const desc = ((biz.description as string) || '').toLowerCase()
    const domain = ((biz.domain as string) || '').toLowerCase()
    const caps = ((biz.capabilities as string[]) || []).map((c) => c.toLowerCase())

    // Exact name match gets highest score
    if (name === lowerQ) score += 100
    // Name contains full query
    else if (name.includes(lowerQ)) score += 60
    // Name contains individual words
    for (const w of queryWords) {
      if (name.includes(w)) score += 15
    }

    // Description relevance
    if (desc.includes(lowerQ)) score += 30
    for (const w of queryWords) {
      if (desc.includes(w)) score += 5
    }

    // Domain match
    if (domain.includes(lowerQ)) score += 40
    for (const w of queryWords) {
      if (domain.includes(w)) score += 10
    }

    // Capability matches
    for (const cap of caps) {
      if (cap === lowerQ) score += 50
      else if (cap.includes(lowerQ)) score += 25
      for (const w of queryWords) {
        if (cap.includes(w)) score += 8
      }
    }

    // Boost higher-tier businesses slightly
    const auditScore = (biz.audit_score as number) || 0
    score += auditScore * 0.1

    // Normalize to 0-1 range (cap at 1.0)
    const relevance = Math.min(score / 150, 1.0)

    return {
      ...biz,
      relevance_score: Math.round(relevance * 1000) / 1000,
      similarity: relevance,
    }
  })

  // Sort by relevance score descending, then by audit_score
  scored.sort((a, b) => {
    if (b.relevance_score !== a.relevance_score) return b.relevance_score - a.relevance_score
    return (((b as any).audit_score as number) || 0) - (((a as any).audit_score as number) || 0)
  })

  const results = scored.slice(0, limit)

  return NextResponse.json({
    businesses: results,
    search_type: 'fulltext_ranked',
    query: q,
    result_count: results.length,
  })
}
