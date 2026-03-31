import { NextRequest, NextResponse } from 'next/server'
import { runScan, normalizeUrl } from '@/lib/scanner'
import { getServiceClient } from '@/lib/supabase'
import { notifyTierPromotion } from '@/lib/hive-brain'
import { rateLimit, getRateLimitHeaders } from '@/lib/auth'
import { fireWebhook } from '@/lib/webhooks'
import { logError } from '@/lib/error-logger'

export const runtime = 'nodejs'
export const maxDuration = 60 // allow up to 60s for a full audit

export async function POST(req: NextRequest) {
  // Rate limit: 5 audits per minute per IP
  const rateLimitError = rateLimit(req, 5, 60_000)
  if (rateLimitError) return rateLimitError

  const rateLimitHeaders = getRateLimitHeaders(req, 5, 60_000)

  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body.url !== 'string' || body.url.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid "url" field. Provide a domain or URL to audit.' },
        { status: 400 }
      )
    }

    const rawUrl: string = body.url.trim()
    const verticalHint: string | null = typeof body.vertical === 'string' ? body.vertical.trim() : null

    // -----------------------------------------------------------------------
    // 0. Look up existing vertical from DB (if business was previously scanned)
    // -----------------------------------------------------------------------
    let vertical: string | null = verticalHint
    if (!vertical) {
      const db0 = getServiceClient()
      const domainForLookup = normalizeUrl(rawUrl)
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
      const { data: existing } = await db0
        .from('businesses')
        .select('vertical')
        .eq('domain', domainForLookup)
        .single()
      vertical = (existing as any)?.vertical ?? null
    }

    // -----------------------------------------------------------------------
    // 1. Run the 9-dimension scan (with optional vertical-specific scoring)
    // -----------------------------------------------------------------------
    const scanResult = await runScan(rawUrl, { vertical })

    // -----------------------------------------------------------------------
    // 2. Persist to Supabase
    // -----------------------------------------------------------------------
    const db = getServiceClient()
    const domain = normalizeUrl(rawUrl)
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')

    // Derive business name from domain
    let businessName = domain.split('.')[0] ?? domain
    businessName = businessName.charAt(0).toUpperCase() + businessName.slice(1)

    // Find dimension results for backward-compatible fields
    const d1 = scanResult.dimensions.find((d) => d.dimension === 'D1')
    const d2 = scanResult.dimensions.find((d) => d.dimension === 'D2')
    const d4 = scanResult.dimensions.find((d) => d.dimension === 'D4')

    // Upsert the business — create if not exists, update scores if exists
    const { data: businessRaw, error: bizError } = await db
      .from('businesses')
      .upsert(
        {
          domain,
          name: businessName,
          slug: domain.replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
          audit_score: scanResult.total_score,
          audit_tier: scanResult.tier,
          pricing_visible: (d4?.score ?? 0) > 0,
          agent_onboarding: (d2?.score ?? 0) > 0,
          a2a_agent_card: null,
          mcp_endpoints:
            d2?.checks.find((c) => c.name === 'MCP Tools List')?.passed
              ? [d2.checks.find((c) => c.name === 'MCP Tools List')!.details]
              : [] as string[],
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: 'domain' }
      )
      .select('id')
      .single()
    const business = businessRaw as any

    if (bizError) {
      console.error('Business upsert error:', bizError)
      // Still return the scorecard even if DB write fails
      return NextResponse.json({
        ...scanResult,
        business_name: businessName,
        _db_error: 'Failed to save audit results. Scorecard is still valid.',
      })
    }

    const businessId = business.id

    // Map 9 dimensions to 5 legacy audit_results categories for DB storage
    const now = new Date()
    const nextAudit = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const categoryMapping: Record<string, { category: string; dims: string[] }> = {
      machine_readable_profile: { category: 'machine_readable_profile', dims: ['D1'] },
      mcp_api_endpoints: { category: 'mcp_api_endpoints', dims: ['D2'] },
      agent_native_onboarding: { category: 'agent_native_onboarding', dims: ['D3'] },
      structured_pricing: { category: 'structured_pricing', dims: ['D4', 'D5'] },
      agent_payment_acceptance: { category: 'agent_payment_acceptance', dims: ['D6', 'D7', 'D8', 'D9'] },
    }

    const auditRows = Object.entries(categoryMapping).map(([category, mapping]) => {
      const dims = mapping.dims
        .map((id) => scanResult.dimensions.find((d) => d.dimension === id))
        .filter(Boolean) as typeof scanResult.dimensions

      const avgDimScore =
        dims.length > 0
          ? dims.reduce((sum, d) => sum + d.score, 0) / dims.length
          : 0
      const scaledScore = Math.round((avgDimScore / 100) * 20)

      const details: Record<string, unknown> = {
        scanner_version: '2.0',
        dimensions: dims.map((d) => ({
          dimension: d.dimension,
          label: d.label,
          score: d.score,
          weight: d.weight,
          checks: d.checks,
        })),
      }

      const recommendations = dims.flatMap((d) =>
        d.recommendations.map((r) => `[${d.label}] ${r.action}`)
      )

      return {
        business_id: businessId,
        category,
        score: scaledScore,
        max_score: 20,
        details,
        recommendations,
        audited_at: now.toISOString(),
        next_audit_at: nextAudit.toISOString(),
      }
    })

    // Delete previous audit results for this business, then insert new ones
    const { error: deleteError } = await db
      .from('audit_results')
      .delete()
      .eq('business_id', businessId)

    if (deleteError) {
      console.error('Audit results delete error:', deleteError)
    }

    const { error: auditError } = await db
      .from('audit_results')
      .insert(auditRows as any)

    if (auditError) {
      console.error('Audit results insert error:', auditError)
    }

    // Fire webhook for score change (fire-and-forget)
    fireWebhook('score_change', {
      business: { id: businessId, name: businessName, domain },
      score: scanResult.total_score,
      tier: scanResult.tier,
    })

    // Notify Hive Brain + fire webhook for Gold+ tier promotions
    if (scanResult.tier === 'gold' || scanResult.tier === 'platinum') {
      notifyTierPromotion(businessName, scanResult.tier, scanResult.total_score).catch(
        (err) => console.error('Tier promotion notification failed:', err)
      )
      fireWebhook('tier_promotion', {
        business: { id: businessId, name: businessName, domain },
        tier: scanResult.tier,
        score: scanResult.total_score,
      })
    }

    return NextResponse.json({
      ...scanResult,
      business_name: businessName,
      business_id: businessId,
    }, { headers: rateLimitHeaders })
  } catch (err: unknown) {
    console.error('Audit route error:', err instanceof Error ? err.message : err)

    // Log to error_log table (fire-and-forget)
    logError('/api/v1/audit', 'POST', err instanceof Error ? err : new Error(String(err)), req.headers.get('x-request-id') || undefined)

    // Allow SSRF validation errors to surface as 400 (user input error)
    if (err instanceof Error && (err.message.includes('private or internal') || err.message.includes('Only HTTP') || err.message.includes('Invalid URL'))) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
