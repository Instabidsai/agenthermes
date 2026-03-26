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

function signPayload(payload: Record<string, unknown>): string {
  const secret = getSigningSecret()
  // Create a canonical JSON string (sorted keys) for deterministic signing
  const canonical = JSON.stringify(payload, Object.keys(payload).sort())
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
// Tier from score (matches audit-engine.ts)
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
