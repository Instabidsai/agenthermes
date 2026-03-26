import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'

const TIER_LABELS: Record<string, string> = {
  platinum: 'Agent-Native Leader',
  gold: 'Agent-Ready',
  silver: 'Agent-Usable with Friction',
  bronze: 'Minimal Agent Support',
  unaudited: 'Not Yet Audited',
}

function categoryStatus(score: number, max: number): string {
  const ratio = max > 0 ? score / max : 0
  if (ratio >= 0.75) return 'excellent'
  if (ratio >= 0.5) return 'good'
  if (ratio >= 0.25) return 'needs_work'
  return 'failing'
}

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    const { domain } = await params
    const decodedDomain = decodeURIComponent(domain).toLowerCase().trim()

    // Basic domain validation
    if (
      !decodedDomain ||
      decodedDomain.length > 253 ||
      !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i.test(decodedDomain)
    ) {
      return NextResponse.json(
        { error: 'Invalid domain format. Provide a domain like "example.com".' },
        { status: 400, headers: corsHeaders() }
      )
    }

    const supabase = getServiceClient()

    // Look up business by domain
    const { data: businessRaw, error: bizError } = await supabase
      .from('businesses')
      .select('id, name, slug, domain, audit_score, audit_tier, updated_at')
      .eq('domain', decodedDomain)
      .single()

    if (bizError && bizError.code !== 'PGRST116') {
      console.error('[score/domain] Query error:', bizError.message)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500, headers: corsHeaders() }
      )
    }

    if (!businessRaw) {
      // Domain not found — return unaudited response
      return NextResponse.json(
        {
          domain: decodedDomain,
          score: null,
          tier: 'unaudited',
          tier_label: 'Not Yet Audited',
          last_audited: null,
          message:
            'This business has not been audited. Visit https://agenthermes.ai/audit to scan it.',
        },
        { status: 200, headers: corsHeaders() }
      )
    }

    const business = businessRaw as Record<string, any>

    // Fetch audit results for this business
    const { data: auditResultsRaw, error: auditError } = await supabase
      .from('audit_results')
      .select('category, score, max_score, audited_at')
      .eq('business_id', business.id)
      .order('audited_at', { ascending: false })

    if (auditError) {
      console.error('[score/domain] Audit results error:', auditError.message)
    }

    const auditResults = (auditResultsRaw || []) as {
      category: string
      score: number
      max_score: number
      audited_at: string
    }[]

    // Determine the last audited timestamp (latest among audit results)
    const lastAudited =
      auditResults.length > 0
        ? auditResults.reduce(
            (latest, r) =>
              !latest || r.audited_at > latest ? r.audited_at : latest,
            '' as string
          )
        : null

    // Build category breakdown — deduplicate to latest per category
    const categoryMap = new Map<string, (typeof auditResults)[0]>()
    for (const result of auditResults) {
      const existing = categoryMap.get(result.category)
      if (!existing || result.audited_at > existing.audited_at) {
        categoryMap.set(result.category, result)
      }
    }

    const categories: Record<
      string,
      { score: number; max: number; status: string }
    > = {}
    for (const [cat, result] of categoryMap) {
      categories[cat] = {
        score: result.score,
        max: result.max_score,
        status: categoryStatus(result.score, result.max_score),
      }
    }

    // Track score check (fire-and-forget)
    trackEvent(business.id, 'score_check', {
      agent_id: _request.headers.get('x-agent-id') || undefined,
      source: 'api',
    })

    // Build the slug for the profile URL
    const slug = business.slug || decodedDomain.replace(/[^a-z0-9]+/gi, '-').toLowerCase()

    return NextResponse.json(
      {
        domain: decodedDomain,
        score: business.audit_score ?? null,
        tier: business.audit_tier || 'unaudited',
        tier_label: TIER_LABELS[business.audit_tier] || TIER_LABELS.unaudited,
        last_audited: lastAudited,
        categories,
        profile_url: `https://agenthermes.ai/business/${slug}`,
        badge_url: `https://agenthermes.ai/api/badge/${decodedDomain}`,
      },
      {
        status: 200,
        headers: {
          ...corsHeaders(),
          'Cache-Control': 'public, max-age=300, s-maxage=600',
        },
      }
    )
  } catch (err) {
    console.error(
      '[score/domain] Unexpected error:',
      err instanceof Error ? err.message : err
    )
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders() }
    )
  }
}
