import { NextRequest, NextResponse } from 'next/server'
import { runScan, normalizeUrl } from '@/lib/scanner'
import { getServiceClient } from '@/lib/supabase'
import { notifyTierPromotion } from '@/lib/hive-brain'
import { rateLimit } from '@/lib/auth'
import { fireWebhook } from '@/lib/webhooks'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * POST /api/v1/scan — 9-Dimension Agent Readiness Scanner
 *
 * Body: { "url": "example.com" }
 *
 * Returns the full 9-dimension scorecard with per-dimension breakdowns,
 * cap rules applied, and prioritized recommendations.
 *
 * This replaces the old 5-category audit at /api/v1/audit while maintaining
 * backward compatibility with the existing database schema.
 */
export async function POST(req: NextRequest) {
  // Rate limit: 5 scans per minute per IP
  const rateLimitError = rateLimit(req, 5, 60_000)
  if (rateLimitError) return rateLimitError

  try {
    const body = await req.json().catch(() => null)

    const requestId = req.headers.get('x-request-id') || ''

    if (!body || typeof body.url !== 'string' || body.url.trim().length === 0) {
      return NextResponse.json(
        {
          error:
            'Missing or invalid "url" field. Provide a domain or URL to scan.',
          code: 'INVALID_URL',
          request_id: requestId,
        },
        { status: 400 }
      )
    }

    const rawUrl: string = body.url.trim()

    if (rawUrl.length > 2048) {
      return NextResponse.json(
        { error: 'URL too long (max 2048 characters)', code: 'URL_TOO_LONG', request_id: requestId },
        { status: 400 }
      )
    }

    // -----------------------------------------------------------------------
    // 1. Run the 9-dimension scan
    // -----------------------------------------------------------------------
    const scanResult = await runScan(rawUrl)

    // -----------------------------------------------------------------------
    // 2. Persist to Supabase (backward compatible with existing tables)
    // -----------------------------------------------------------------------
    const db = getServiceClient()
    const domain = normalizeUrl(rawUrl)
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')

    // Extract business name from domain
    let businessName = domain.split('.')[0] ?? domain
    businessName =
      businessName.charAt(0).toUpperCase() + businessName.slice(1)

    // Find D1 and D2 results for backward-compatible fields
    const d1 = scanResult.dimensions.find((d) => d.dimension === 'D1')
    const d2 = scanResult.dimensions.find((d) => d.dimension === 'D2')
    const d4 = scanResult.dimensions.find((d) => d.dimension === 'D4')

    // Extract agent card body if found
    const agentCardCheck = d1?.checks.find((c) => c.name === 'Agent Card')
    // MCP endpoints from D1/D2
    const mcpCheck = scanResult.dimensions
      .find((d) => d.dimension === 'D2')
      ?.checks.find((c) => c.name === 'MCP Tools List')

    // Upsert the business
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
          mcp_endpoints: mcpCheck?.passed
            ? [mcpCheck.details]
            : [],
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: 'domain' }
      )
      .select('id, vertical')
      .single()
    const business = businessRaw as any

    if (bizError) {
      console.error('Business upsert error:', bizError)
      return NextResponse.json({
        ...scanResult,
        _db_error: `Upsert failed: ${bizError.message} (code: ${bizError.code})`,
      })
    }

    const businessId = business.id

    // Map 9 dimensions back to audit_results format for backward compatibility
    // The old system had 5 categories with max_score=20 each (total 100).
    // We map the 9 dimensions to the closest old categories for DB storage,
    // but also store the full dimension data in the details field.
    const now = new Date()
    const nextAudit = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    // Map dimensions to old categories for DB compatibility
    const categoryMapping: Record<
      string,
      { category: string; dims: string[] }
    > = {
      machine_readable_profile: { category: 'machine_readable_profile', dims: ['D1'] },
      mcp_api_endpoints: { category: 'mcp_api_endpoints', dims: ['D2'] },
      agent_native_onboarding: { category: 'agent_native_onboarding', dims: ['D3'] },
      structured_pricing: { category: 'structured_pricing', dims: ['D4', 'D5'] },
      agent_payment_acceptance: {
        category: 'agent_payment_acceptance',
        dims: ['D6', 'D7', 'D8', 'D9'],
      },
    }

    const auditRows = Object.entries(categoryMapping).map(
      ([category, mapping]) => {
        const dims = mapping.dims
          .map((id) => scanResult.dimensions.find((d) => d.dimension === id))
          .filter(Boolean) as typeof scanResult.dimensions

        // Average the dimension scores and scale to max 20
        const avgDimScore =
          dims.length > 0
            ? dims.reduce((sum, d) => sum + d.score, 0) / dims.length
            : 0
        const scaledScore = Math.round((avgDimScore / 100) * 20)

        // Merge details and recommendations
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
      }
    )

    // Delete previous audit results, then insert new ones
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
      business: { id: businessId, name: businessName, domain, vertical: business?.vertical ?? null },
      score: scanResult.total_score,
      tier: scanResult.tier,
      scanner_version: '2.0',
    })

    // Notify Hive Brain for Gold+ tier promotions
    if (scanResult.tier === 'gold' || scanResult.tier === 'platinum') {
      notifyTierPromotion(
        businessName,
        scanResult.tier,
        scanResult.total_score
      ).catch((err) =>
        console.error('Tier promotion notification failed:', err)
      )
      fireWebhook('tier_promotion', {
        business: { id: businessId, name: businessName, domain },
        tier: scanResult.tier,
        score: scanResult.total_score,
      })
    }

    return NextResponse.json({
      ...scanResult,
      business_id: businessId,
    })
  } catch (err: unknown) {
    const requestId = req.headers.get('x-request-id') || ''
    console.error(
      'Scan route error:',
      err instanceof Error ? err.message : err
    )
    if (
      err instanceof Error &&
      (err.message.includes('private or internal') ||
        err.message.includes('Only HTTP') ||
        err.message.includes('Invalid URL'))
    ) {
      return NextResponse.json(
        { error: err.message, code: 'INVALID_URL', request_id: requestId },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR', request_id: requestId },
      { status: 500 }
    )
  }
}
