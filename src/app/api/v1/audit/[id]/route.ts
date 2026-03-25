import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import type { AuditCategory } from '@/types/database'

export const runtime = 'nodejs'

const CATEGORY_LABELS: Record<AuditCategory, string> = {
  machine_readable_profile: 'Machine-Readable Profile',
  mcp_api_endpoints: 'MCP & API Endpoints',
  agent_native_onboarding: 'Agent-Native Onboarding',
  structured_pricing: 'Structured Pricing',
  agent_payment_acceptance: 'Agent Payment Acceptance',
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id || id.length < 10) {
      return NextResponse.json(
        { error: 'Invalid business ID.' },
        { status: 400 }
      )
    }

    const db = getServiceClient()

    // Fetch the business
    const { data: businessRaw, error: bizError } = await db
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single()
    const business = businessRaw as Record<string, any> | null

    if (bizError || !business) {
      return NextResponse.json(
        { error: 'Business not found.' },
        { status: 404 }
      )
    }

    // Fetch latest audit results
    const { data: auditResults, error: auditError } = await db
      .from('audit_results')
      .select('*')
      .eq('business_id', id)
      .order('audited_at', { ascending: false })

    if (auditError) {
      console.error('Audit results fetch error:', auditError)
      return NextResponse.json(
        { error: 'Failed to fetch audit results.' },
        { status: 500 }
      )
    }

    // If no audit results exist, return the business with empty scorecard
    if (!auditResults || auditResults.length === 0) {
      return NextResponse.json({
        business_id: business.id,
        business_name: business.name,
        domain: business.domain,
        total_score: business.audit_score ?? 0,
        tier: business.audit_tier ?? 'unaudited',
        categories: [],
        audited_at: null,
        next_steps: ['No audit has been run yet. Submit a POST to /api/v1/audit to run one.'],
      })
    }

    // Group by latest audit timestamp (all rows from the same audit share the same audited_at)
    const latestTimestamp = (auditResults[0] as any).audited_at
    const latestResults = (auditResults as any[]).filter(
      (r: Record<string, unknown>) => r.audited_at === latestTimestamp
    )

    const categories = latestResults.map((r: Record<string, unknown>) => ({
      category: r.category as AuditCategory,
      label: CATEGORY_LABELS[r.category as AuditCategory] ?? (r.category as string),
      score: r.score as number,
      max_score: r.max_score as number,
      details: (r.details ?? {}) as Record<string, unknown>,
      recommendations: (r.recommendations ?? []) as string[],
    }))

    const totalScore = categories.reduce(
      (sum: number, c: { score: number }) => sum + c.score,
      0
    )

    // Build next steps from lowest-scoring categories
    const nextSteps: string[] = []
    const sorted = [...categories].sort(
      (a: { score: number }, b: { score: number }) => a.score - b.score
    )
    for (const cat of sorted) {
      if (cat.recommendations.length > 0 && nextSteps.length < 5) {
        nextSteps.push(`[${cat.label}] ${cat.recommendations[0]}`)
      }
    }

    return NextResponse.json({
      business_id: business.id,
      business_name: business.name,
      domain: business.domain,
      total_score: totalScore,
      tier: business.audit_tier,
      categories,
      audited_at: latestTimestamp,
      next_audit_at: (latestResults[0] as any)?.next_audit_at ?? null,
      next_steps: nextSteps,
    })
  } catch (err: unknown) {
    console.error('Audit status route error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
