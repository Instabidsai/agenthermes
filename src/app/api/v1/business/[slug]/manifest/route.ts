import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import type { BusinessManifest } from '@/types/database'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = getServiceClient()

    // Fetch business
    const { data: business, error: bizError } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .single()

    if (bizError || !business) {
      if (bizError?.code === 'PGRST116') {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
      }
      return NextResponse.json(
        { error: bizError?.message || 'Business not found' },
        { status: bizError ? 500 : 404 }
      )
    }

    // Fetch active services
    const { data: services } = await supabase
      .from('services')
      .select('*')
      .eq('business_id', business.id)
      .eq('status', 'active')

    // Fetch latest audit results
    const { data: auditResults } = await supabase
      .from('audit_results')
      .select('*')
      .eq('business_id', business.id)
      .order('audited_at', { ascending: false })
      .limit(1)

    // Check wallet status
    const { data: wallet } = await supabase
      .from('agent_wallets')
      .select('status')
      .eq('business_id', business.id)
      .limit(1)
      .maybeSingle()

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
      services: (services || []).map((s) => ({
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

    return NextResponse.json(manifest, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
