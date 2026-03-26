import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { getBusinessBySlug } from '@/lib/business'
import { requireAuth } from '@/lib/auth'
import { runScan } from '@/lib/scanner'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json().catch(() => null)

    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const supabase = getServiceClient()
    let business: Record<string, any> | null = null

    // Look up business by slug or business_id
    if (body.slug) {
      const result = await getBusinessBySlug(body.slug)
      if (result.error) {
        console.error('[certify] Business lookup error:', result.error.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
      business = result.business
    } else if (body.business_id) {
      const { data: bizRaw, error: bizError } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', body.business_id)
        .single()
      if (bizError && bizError.code !== 'PGRST116') {
        console.error('[certify] Business lookup error:', bizError.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
      business = bizRaw as any
    } else {
      return NextResponse.json(
        { error: 'Provide either "slug" or "business_id"' },
        { status: 400 }
      )
    }

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    // Run a fresh audit if the business has a domain
    let auditScore = business.audit_score ?? 0

    if (business.domain) {
      try {
        const scanResult = await runScan(business.domain)
        auditScore = scanResult.total_score

        // Update business with new scan score
        await (supabase.from('businesses') as any)
          .update({
            audit_score: scanResult.total_score,
            audit_tier: scanResult.tier,
            updated_at: new Date().toISOString(),
          })
          .eq('id', business.id)

        // Save scan results mapped to audit_results format
        const now = new Date()
        const nextAudit = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        const auditRows = scanResult.dimensions.map((dim) => ({
          business_id: business!.id,
          category: dim.dimension,
          score: Math.round(dim.score * dim.weight),
          max_score: Math.round(100 * dim.weight),
          details: { checks: dim.checks, label: dim.label },
          recommendations: dim.recommendations.map((r) => r.action),
          audited_at: now.toISOString(),
          next_audit_at: nextAudit.toISOString(),
        }))

        await supabase.from('audit_results').delete().eq('business_id', business.id)
        await supabase.from('audit_results').insert(auditRows as any)
      } catch (auditErr) {
        console.error('[certify] Audit error (using existing score):', auditErr)
        // Use existing score if audit fails
      }
    }

    // Check if score meets Gold+ threshold (75+)
    if (auditScore < 75) {
      return NextResponse.json(
        {
          error: 'Score too low for certification',
          message: `Current score is ${auditScore}. Minimum score for certification is 75 (Gold tier). Improve your agent readiness and try again.`,
          current_score: auditScore,
          required_score: 75,
        },
        { status: 400 }
      )
    }

    // Determine certification tier
    const certTier = auditScore >= 90 ? 'platinum' : 'gold'

    // Upsert certification
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000) // 90 days

    const { data: certRaw, error: certError } = await supabase
      .from('certifications')
      .upsert(
        {
          business_id: business.id,
          tier: certTier,
          certified_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          auto_renew: true,
          status: 'active',
        } as any,
        { onConflict: 'business_id' }
      )
      .select()
      .single()

    if (certError) {
      console.error('[certify] Certification upsert error:', certError.message)
      return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
    }

    const cert = certRaw as any

    return NextResponse.json({
      certification: {
        id: cert.id,
        business_id: business.id,
        business_name: business.name,
        slug: business.slug,
        tier: cert.tier,
        audit_score: auditScore,
        certified_at: cert.certified_at,
        expires_at: cert.expires_at,
        auto_renew: cert.auto_renew,
        status: cert.status,
        days_remaining: Math.ceil(
          (new Date(cert.expires_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000)
        ),
      },
      badge_url: `https://agenthermes.ai/api/v1/certify/badge/${business.slug}`,
    })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[certify] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const slug = searchParams.get('slug')
    const businessId = searchParams.get('business_id')

    if (!slug && !businessId) {
      return NextResponse.json(
        { error: 'Provide either "slug" or "business_id" query parameter' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()
    let bizId: string | null = null
    let bizName: string | null = null
    let bizSlug: string | null = null

    if (slug) {
      if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
        return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
      }
      const { business, error: bizError } = await getBusinessBySlug(slug)
      if (bizError) {
        console.error('[certify] Business lookup error:', bizError.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
      if (!business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
      }
      bizId = business.id
      bizName = business.name
      bizSlug = business.slug
    } else if (businessId) {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
        return NextResponse.json({ error: 'Invalid business_id format' }, { status: 400 })
      }
      const { data: bizRaw } = await supabase
        .from('businesses')
        .select('id, name, slug')
        .eq('id', businessId)
        .single()
      if (!bizRaw) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
      }
      const biz = bizRaw as any
      bizId = biz.id
      bizName = biz.name
      bizSlug = biz.slug
    }

    // Fetch certification
    const { data: certRaw, error: certError } = await supabase
      .from('certifications')
      .select('*')
      .eq('business_id', bizId!)
      .single()

    if (certError && certError.code !== 'PGRST116') {
      console.error('[certify] Certification query error:', certError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    if (!certRaw) {
      return NextResponse.json({
        certified: false,
        business_name: bizName,
        slug: bizSlug,
        message: 'This business is not certified. Apply at POST /api/v1/certify',
      })
    }

    const cert = certRaw as any
    const daysRemaining = Math.ceil(
      (new Date(cert.expires_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000)
    )

    return NextResponse.json({
      certified: true,
      certification: {
        id: cert.id,
        business_id: cert.business_id,
        business_name: bizName,
        slug: bizSlug,
        tier: cert.tier,
        certified_at: cert.certified_at,
        expires_at: cert.expires_at,
        auto_renew: cert.auto_renew,
        status: cert.status,
        days_remaining: Math.max(daysRemaining, 0),
        expired: daysRemaining <= 0,
      },
    })
  } catch (err) {
    console.error('[certify] GET unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
