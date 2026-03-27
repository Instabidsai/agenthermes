import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import crypto from 'crypto'

export const runtime = 'nodejs'

// ---------------------------------------------------------------------------
// HMAC-SHA256 verification
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

function verifySignature(payload: Record<string, unknown>, signature: string): boolean {
  try {
    const secret = getSigningSecret()
    const canonical = JSON.stringify(sortKeys(payload))
    const expected = crypto
      .createHmac('sha256', secret)
      .update(canonical)
      .digest('base64')
    const expectedBuf = Buffer.from(expected, 'base64')
    const signatureBuf = Buffer.from(signature, 'base64')
    if (expectedBuf.length !== signatureBuf.length) return false
    return crypto.timingSafeEqual(expectedBuf, signatureBuf)
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

// ---------------------------------------------------------------------------
// POST /api/v1/hermes-json/verify
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json(
        { valid: false, reason: 'Invalid JSON body' },
        { status: 400, headers: corsHeaders() }
      )
    }

    const { domain, hermes_json } = body as {
      domain?: string
      hermes_json?: Record<string, unknown>
    }

    let jsonToVerify: Record<string, unknown> | null = null

    // Option 1: Provided hermes_json directly
    if (hermes_json && typeof hermes_json === 'object') {
      jsonToVerify = hermes_json
    }

    // Option 2: Fetch from domain's .well-known/agent-hermes.json
    if (!jsonToVerify && domain) {
      const cleanDomain = domain.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/+$/, '')

      // SSRF protection — block private/internal IPs
      const forbidden = ['localhost', '127.0.0.1', '0.0.0.0', '169.254.169.254', '::1', '::']
      const privateRanges = ['10.', '172.16.', '172.17.', '172.18.', '172.19.', '172.20.', '172.21.', '172.22.', '172.23.', '172.24.', '172.25.', '172.26.', '172.27.', '172.28.', '172.29.', '172.30.', '172.31.', '192.168.', '169.254.']
      if (forbidden.includes(cleanDomain) || privateRanges.some(r => cleanDomain.startsWith(r))) {
        return NextResponse.json({ valid: false, reason: 'Cannot verify private/internal domains' }, { status: 400, headers: corsHeaders() })
      }

      const url = `https://${cleanDomain}/.well-known/agent-hermes.json`

      try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 10_000)

        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'AgentHermes-Verifier/1.0',
            Accept: 'application/json',
          },
        })

        clearTimeout(timer)

        if (!res.ok) {
          return NextResponse.json(
            {
              valid: false,
              reason: `Could not fetch ${url} — HTTP ${res.status}`,
            },
            { status: 200, headers: corsHeaders() }
          )
        }

        const fetched = await res.json()
        if (!fetched || typeof fetched !== 'object') {
          return NextResponse.json(
            {
              valid: false,
              reason: `Content at ${url} is not valid JSON`,
            },
            { status: 200, headers: corsHeaders() }
          )
        }

        jsonToVerify = fetched as Record<string, unknown>
      } catch (fetchErr) {
        return NextResponse.json(
          {
            valid: false,
            reason: `Failed to fetch ${url}: ${fetchErr instanceof Error ? fetchErr.message : 'Unknown error'}`,
          },
          { status: 200, headers: corsHeaders() }
        )
      }
    }

    if (!jsonToVerify) {
      return NextResponse.json(
        {
          valid: false,
          reason: 'Provide either "domain" (to fetch .well-known/agent-hermes.json) or "hermes_json" (the JSON content to verify)',
        },
        { status: 400, headers: corsHeaders() }
      )
    }

    // -------------------------------------------------------------------
    // Verification checks
    // -------------------------------------------------------------------

    const errors: string[] = []

    // 1. Check required fields
    const requiredFields = ['hermes_version', 'hermes_id', 'domain', 'score', 'tier', 'signature']
    for (const field of requiredFields) {
      if (!(field in jsonToVerify)) {
        errors.push(`Missing required field: "${field}"`)
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { valid: false, reason: errors.join('; ') },
        { status: 200, headers: corsHeaders() }
      )
    }

    // 2. Verify HMAC signature
    const { signature, ...payloadWithoutSig } = jsonToVerify
    if (typeof signature !== 'string') {
      return NextResponse.json(
        { valid: false, reason: 'Signature field must be a string' },
        { status: 200, headers: corsHeaders() }
      )
    }

    let signatureValid = false
    try {
      signatureValid = verifySignature(payloadWithoutSig, signature)
    } catch {
      return NextResponse.json(
        { valid: false, reason: 'Signature verification failed — server signing key not configured' },
        { status: 200, headers: corsHeaders() }
      )
    }

    if (!signatureValid) {
      return NextResponse.json(
        {
          valid: false,
          reason: 'Invalid signature. The JSON content may have been modified after generation.',
        },
        { status: 200, headers: corsHeaders() }
      )
    }

    // 3. Cross-check score against our DB
    const hermesDomain = (jsonToVerify.domain as string).toLowerCase().trim()
    const supabase = getServiceClient()
    const { data: bizRaw } = await supabase
      .from('businesses')
      .select('audit_score, audit_tier')
      .eq('domain', hermesDomain)
      .maybeSingle()

    const business = bizRaw as { audit_score: number; audit_tier: string } | null

    if (!business) {
      return NextResponse.json(
        {
          valid: false,
          reason: `Domain "${hermesDomain}" not found in AgentHermes database. The business may not have been audited.`,
        },
        { status: 200, headers: corsHeaders() }
      )
    }

    // Check score matches (allow small drift for rounding)
    const claimedScore = jsonToVerify.score as number
    const actualScore = business.audit_score
    if (Math.abs(claimedScore - actualScore) > 1) {
      return NextResponse.json(
        {
          valid: false,
          reason: `Score mismatch. Claimed: ${claimedScore}, Actual: ${actualScore}. The hermes.json may be outdated — regenerate it.`,
        },
        { status: 200, headers: corsHeaders() }
      )
    }

    // 4. Check certification expiry
    if (jsonToVerify.certified === true && jsonToVerify.certification_expires) {
      const expires = new Date(jsonToVerify.certification_expires as string)
      if (expires < new Date()) {
        return NextResponse.json(
          {
            valid: false,
            reason: `Certification expired on ${expires.toISOString()}. Renew certification and regenerate hermes.json.`,
          },
          { status: 200, headers: corsHeaders() }
        )
      }
    }

    return NextResponse.json(
      {
        valid: true,
        domain: hermesDomain,
        score: actualScore,
        tier: business.audit_tier,
        signature_verified: true,
        score_matches_db: true,
        certification_current: jsonToVerify.certified === true
          ? new Date(jsonToVerify.certification_expires as string) > new Date()
          : null,
      },
      { status: 200, headers: corsHeaders() }
    )
  } catch (err) {
    console.error('[hermes-json/verify] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json(
      { valid: false, reason: 'Internal server error' },
      { status: 500, headers: corsHeaders() }
    )
  }
}
