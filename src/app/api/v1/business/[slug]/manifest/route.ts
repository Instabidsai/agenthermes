import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { getBusinessBySlug } from '@/lib/business'
import { trackEvent } from '@/lib/analytics'
import type { BusinessManifest } from '@/types/database'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[manifest] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    const supabase = getServiceClient()

    // Fetch active services
    const { data: servicesRaw } = await supabase
      .from('services')
      .select('*')
      .eq('business_id', business.id)
      .eq('status', 'active')
    const services = (servicesRaw || []) as any[]

    // Fetch latest audit results
    const { data: auditResultsRaw } = await supabase
      .from('audit_results')
      .select('*')
      .eq('business_id', business.id)
      .order('audited_at', { ascending: false })
      .limit(1)
    const auditResults = (auditResultsRaw || []) as any[]

    // Check wallet status
    const { data: walletRaw } = await supabase
      .from('agent_wallets')
      .select('status')
      .eq('business_id', business.id)
      .limit(1)
      .maybeSingle()
    const wallet = walletRaw as any

    const manifest: BusinessManifest = {
      schema_version: '1.0',
      business: {
        name: business.name,
        slug: business.slug,
        domain: business.domain,
        description: business.description,
        vertical: business.vertical,
        capabilities: business.capabilities || [],
      },
      agent_readiness: {
        score: business.audit_score ?? 0,
        tier: business.audit_tier ?? 'unaudited',
        audited_at: auditResults?.[0]?.audited_at ?? '',
      },
      a2a_agent_card: business.a2a_agent_card,
      mcp_endpoints: business.mcp_endpoints || [],
      services: services.map((s: any) => ({
        name: s.name,
        description: s.description,
        pricing_model: s.pricing_model,
        price_per_call: s.price_per_call,
        endpoint: s.mcp_endpoint,
        auth_type: s.auth_type,
        uptime_pct: s.uptime_pct,
        avg_response_ms: s.avg_response_ms,
      })),
      payment: {
        accepts_agent_payments: !!business.stripe_connect_id,
        wallet_status: wallet?.status ?? null,
      },
    }

    // Track manifest view (fire-and-forget)
    trackEvent(business.id, 'manifest_view', {
      agent_id: _request.headers.get('x-agent-id') || undefined,
      source: 'api',
    })

    return NextResponse.json(manifest, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[manifest] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
