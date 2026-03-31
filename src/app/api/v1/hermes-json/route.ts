import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'
import crypto from 'crypto'

export const runtime = 'nodejs'

// ---------------------------------------------------------------------------
// Hermes ID generation — deterministic from business ID
// ---------------------------------------------------------------------------

function generateHermesId(businessId: string): string {
  const hash = crypto
    .createHash('sha256')
    .update(businessId)
    .digest('hex')
    .slice(0, 5)
    .toUpperCase()
  const year = new Date().getFullYear()
  return `AH-${year}-${hash}`
}

// ---------------------------------------------------------------------------
// HMAC-SHA256 signing
// ---------------------------------------------------------------------------

function getSigningSecret(): string {
  const secret = process.env.HERMES_SIGNING_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!secret) throw new Error('No signing secret configured')
  return secret
}

function sortKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortKeys)
  if (obj && typeof obj === 'object') {
    return Object.keys(obj as Record<string, unknown>).sort().reduce((acc, key) => {
      acc[key] = sortKeys((obj as Record<string, unknown>)[key])
      return acc
    }, {} as Record<string, unknown>)
  }
  return obj
}

function signPayload(payload: Record<string, unknown>): string {
  const secret = getSigningSecret()
  const canonical = JSON.stringify(sortKeys(payload))
  return crypto
    .createHmac('sha256', secret)
    .update(canonical)
    .digest('base64')
}

// ---------------------------------------------------------------------------
// Dimension mapping — map audit categories to the 9 hermes dimensions
// ---------------------------------------------------------------------------

interface DimensionScores {
  discoverability: number
  interoperability: number
  onboarding: number
  pricing: number
  payment: number
  data_quality: number
  security: number
  reliability: number
  agent_experience: number
}

function computeDimensions(
  auditResults: { category: string; score: number; max_score: number }[],
  overallScore: number
): DimensionScores {
  const catMap = new Map<string, { score: number; max: number }>()
  for (const r of auditResults) {
    const existing = catMap.get(r.category)
    if (!existing) {
      catMap.set(r.category, { score: r.score, max: r.max_score })
    }
  }

  function catPct(category: string): number {
    const c = catMap.get(category)
    if (!c || c.max === 0) return 0
    return Math.round((c.score / c.max) * 100)
  }

  // Map the 5 audit categories to 9 dimensions
  const profile = catPct('machine_readable_profile')
  const endpoints = catPct('mcp_api_endpoints')
  const onboarding = catPct('agent_native_onboarding')
  const pricing = catPct('structured_pricing')
  const payment = catPct('agent_payment_acceptance')

  return {
    discoverability: profile,
    interoperability: endpoints,
    onboarding,
    pricing,
    payment,
    // Inferred dimensions based on available signals
    data_quality: Math.round((profile + endpoints) / 2),
    security: Math.round((onboarding * 0.6 + payment * 0.4)),
    reliability: Math.round((endpoints * 0.7 + overallScore * 0.3)),
    agent_experience: Math.round(overallScore),
  }
}

// ---------------------------------------------------------------------------
// Tier from score (matches scanner/index.ts)
// ---------------------------------------------------------------------------

function tierFromScore(score: number): string {
  if (score >= 90) return 'platinum'
  if (score >= 75) return 'gold'
  if (score >= 60) return 'silver'
  if (score >= 40) return 'bronze'
  return 'unaudited'
}

// ---------------------------------------------------------------------------
// POST /api/v1/hermes-json — Generate .well-known/agent-hermes.json
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { domain, slug } = body as { domain?: string; slug?: string }

    if (!domain && !slug) {
      return NextResponse.json(
        { error: 'Provide either "domain" or "slug"' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()
    let business: Record<string, any> | null = null

    if (domain) {
      const cleanDomain = domain.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/+$/, '')
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('domain', cleanDomain)
        .single()
      if (error && error.code !== 'PGRST116') {
        console.error('[hermes-json] Domain lookup error:', error.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
      business = data as any
    } else if (slug) {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('slug', slug)
        .single()
      if (error && error.code !== 'PGRST116') {
        console.error('[hermes-json] Slug lookup error:', error.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
      business = data as any
    }

    if (!business) {
      return NextResponse.json(
        { error: 'Business not found. Run an audit first at POST /api/v1/audit.' },
        { status: 404 }
      )
    }

    // Fetch latest audit results for dimension scoring
    const { data: auditResultsRaw } = await supabase
      .from('audit_results')
      .select('category, score, max_score, audited_at')
      .eq('business_id', business.id)
      .order('audited_at', { ascending: false })

    const auditResults = (auditResultsRaw || []) as {
      category: string
      score: number
      max_score: number
      audited_at: string
    }[]

    // Check certification status
    const { data: certRaw } = await supabase
      .from('certifications')
      .select('*')
      .eq('business_id', business.id)
      .eq('status', 'active')
      .maybeSingle()

    const cert = certRaw as Record<string, any> | null

    const score = business.audit_score ?? 0
    const tier = tierFromScore(score)
    const hermesId = generateHermesId(business.id)
    const bizDomain = business.domain || domain || `${business.slug}.unknown`
    const bizSlug = business.slug
    const dimensions = computeDimensions(auditResults, score)
    const certified = !!(cert && new Date(cert.expires_at) > new Date())

    const lastScanned = auditResults.length > 0
      ? auditResults.reduce(
          (latest, r) => (!latest || r.audited_at > latest ? r.audited_at : latest),
          '' as string
        )
      : new Date().toISOString()

    // Build the hermes JSON payload (without signature)
    const hermesPayload: Record<string, unknown> = {
      hermes_version: '1.0',
      hermes_id: hermesId,
      domain: bizDomain,
      score,
      tier,
      dimensions,
      certified,
      certification_expires: cert ? cert.expires_at : null,
      last_scanned: lastScanned,
      verify_url: `https://agenthermes.ai/api/v1/score/${encodeURIComponent(bizDomain)}`,
      profile_url: `https://agenthermes.ai/business/${bizSlug}`,
    }

    // Sign the payload
    const signature = signPayload(hermesPayload)
    const hermesJson = { ...hermesPayload, signature }

    return NextResponse.json({
      hermes_json: hermesJson,
      instructions: {
        step_1: `Create a file at https://${bizDomain}/.well-known/agent-hermes.json`,
        step_2: 'Paste the "hermes_json" object above as the file contents.',
        step_3: `Verify it works: POST https://agenthermes.ai/api/v1/hermes-json/verify with { "domain": "${bizDomain}" }`,
        note: 'The signature proves this JSON was generated by AgentHermes. Do not modify the contents or the signature will be invalid.',
      },
    })
  } catch (err) {
    console.error('[hermes-json] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// GET /api/v1/hermes-json?domain=stripe.com — Public generator (no auth)
// Returns agent-hermes.json for any scanned business
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')

    if (!domain) {
      return NextResponse.json(
        {
          error: 'Missing "domain" query parameter',
          usage: 'GET /api/v1/agent-hermes-json?domain=stripe.com',
        },
        { status: 400 }
      )
    }

    const cleanDomain = domain
      .toLowerCase()
      .trim()
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/+$/, '')

    const supabase = getServiceClient()

    // Look up business by domain
    const { data: business, error: bizErr } = await supabase
      .from('businesses')
      .select('*')
      .eq('domain', cleanDomain)
      .single()

    if (bizErr && bizErr.code !== 'PGRST116') {
      console.error('[agent-hermes-json] DB error:', bizErr.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    if (!business) {
      return NextResponse.json(
        {
          error: `No business found for domain "${cleanDomain}". Scan it first at https://agenthermes.ai/audit`,
          scan_url: `https://agenthermes.ai/api/v1/scan`,
        },
        { status: 404 }
      )
    }

    const biz = business as Record<string, any>

    // Fetch audit results for dimension detail
    const { data: auditResultsRaw } = await supabase
      .from('audit_results')
      .select('category, score, max_score, audited_at')
      .eq('business_id', biz.id)
      .order('audited_at', { ascending: false })

    const auditResults = (auditResultsRaw || []) as {
      category: string
      score: number
      max_score: number
      audited_at: string
    }[]

    // Check certification
    const { data: certRaw } = await supabase
      .from('certifications')
      .select('*')
      .eq('business_id', biz.id)
      .eq('status', 'active')
      .maybeSingle()

    const cert = certRaw as Record<string, any> | null

    const score = biz.audit_score ?? 0
    const tier = tierFromScore(score)
    const hermesId = generateHermesId(biz.id)
    const dimensions = computeDimensions(auditResults, score)
    const certified = !!(cert && new Date(cert.expires_at) > new Date())

    const lastScanned =
      auditResults.length > 0
        ? auditResults.reduce(
            (latest, r) => (!latest || r.audited_at > latest ? r.audited_at : latest),
            '' as string
          )
        : biz.updated_at || new Date().toISOString()

    // Build the agent-hermes.json payload
    const hermesJson: Record<string, unknown> = {
      hermes_version: '1.0',
      business: {
        name: biz.name || cleanDomain,
        domain: cleanDomain,
        category: biz.category || 'unknown',
        subcategory: biz.subcategory || null,
        description: biz.description || `Business at ${cleanDomain}`,
      },
      agent_capabilities: {
        can_book: false,
        can_quote: dimensions.pricing > 40,
        can_pay: dimensions.payment > 40,
        auth_method: dimensions.interoperability > 50 ? 'api_key' : 'unknown',
        protocols: dimensions.interoperability > 50 ? ['rest'] : [],
        ...(biz.mcp_endpoint ? { mcp_endpoint: biz.mcp_endpoint } : {}),
        ...(biz.openapi_url ? { openapi_spec: biz.openapi_url } : {}),
      },
      services: biz.services || [],
      fulfillment: {
        type: biz.fulfillment_type || (dimensions.interoperability > 50 ? 'api' : 'unknown'),
      },
      trust: {
        hermes_score: score,
        hermes_tier: tier,
        hermes_id: hermesId,
        verified: true,
        certified,
        ...(certified && cert ? { certification_expires: cert.expires_at } : {}),
        last_scanned: lastScanned,
        verify_url: `https://agenthermes.ai/api/v1/score/${encodeURIComponent(cleanDomain)}`,
        profile_url: `https://agenthermes.ai/business/${biz.slug || cleanDomain}`,
      },
    }

    // Sign the payload
    const signature = signPayload(hermesJson)

    return NextResponse.json(
      { ...hermesJson, signature },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (err) {
    console.error('[agent-hermes-json] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
