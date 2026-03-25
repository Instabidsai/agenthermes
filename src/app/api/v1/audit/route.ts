import { NextRequest, NextResponse } from 'next/server'
import { runAudit, tierFromScore, normalizeUrl } from '@/lib/audit-engine'
import { getServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 60 // allow up to 60s for a full audit

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body.url !== 'string' || body.url.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid "url" field. Provide a domain or URL to audit.' },
        { status: 400 }
      )
    }

    const rawUrl: string = body.url.trim()

    // -----------------------------------------------------------------------
    // 1. Run the audit
    // -----------------------------------------------------------------------
    const scorecard = await runAudit(rawUrl)

    // -----------------------------------------------------------------------
    // 2. Persist to Supabase
    // -----------------------------------------------------------------------
    const db = getServiceClient()
    const domain = normalizeUrl(rawUrl)
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')

    // Upsert the business — create if not exists, update scores if exists
    const { data: business, error: bizError } = await db
      .from('businesses')
      .upsert(
        {
          domain,
          name: scorecard.business_name,
          slug: domain.replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
          audit_score: scorecard.total_score,
          audit_tier: scorecard.tier,
          pricing_visible: scorecard.categories.some(
            (c) => c.category === 'structured_pricing' && c.score > 0
          ),
          agent_onboarding: scorecard.categories.some(
            (c) => c.category === 'agent_native_onboarding' && c.score > 0
          ),
          a2a_agent_card: (scorecard.categories.find(
            (c) => c.category === 'machine_readable_profile'
          )?.details.agent_card_body as Record<string, unknown>) ?? null,
          mcp_endpoints:
            (scorecard.categories.find(
              (c) => c.category === 'mcp_api_endpoints'
            )?.details.mcp_endpoints_found as string[]) ?? [],
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'domain' }
      )
      .select('id')
      .single()

    if (bizError) {
      console.error('Business upsert error:', bizError)
      // Still return the scorecard even if DB write fails
      return NextResponse.json({
        ...scorecard,
        _db_error: 'Failed to save audit results. Scorecard is still valid.',
      })
    }

    const businessId = business.id

    // Save individual category results
    const now = new Date()
    const nextAudit = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const auditRows = scorecard.categories.map((cat) => ({
      business_id: businessId,
      category: cat.category,
      score: cat.score,
      max_score: cat.max_score,
      details: cat.details,
      recommendations: cat.recommendations,
      audited_at: now.toISOString(),
      next_audit_at: nextAudit.toISOString(),
    }))

    // Delete previous audit results for this business, then insert new ones
    await db
      .from('audit_results')
      .delete()
      .eq('business_id', businessId)

    const { error: auditError } = await db
      .from('audit_results')
      .insert(auditRows)

    if (auditError) {
      console.error('Audit results insert error:', auditError)
    }

    return NextResponse.json({
      ...scorecard,
      business_id: businessId,
    })
  } catch (err: unknown) {
    console.error('Audit route error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
