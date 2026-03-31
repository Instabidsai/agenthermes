import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { rateLimit } from '@/lib/auth'
import { logError } from '@/lib/error-logger'

export const runtime = 'nodejs'
export const maxDuration = 30

/**
 * POST /api/v1/registry/submit — Submit an agent card for indexing
 *
 * Body: { url: string, agent_card_url?: string }
 *
 * Fetches the agent card from the URL, validates it, and adds
 * the business to the registry by triggering a scan.
 */
export async function POST(req: NextRequest) {
  const requestId = req.headers.get('x-request-id') || ''

  // Rate limit: 3 submissions per minute per IP
  const rateLimitError = rateLimit(req, 3, 60_000)
  if (rateLimitError) return rateLimitError

  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body.url !== 'string' || body.url.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Missing or invalid "url" field. Provide a domain or URL to submit.',
          code: 'INVALID_URL',
          request_id: requestId,
        },
        { status: 400 }
      )
    }

    const rawUrl: string = body.url.trim()
    const agentCardUrl: string | null = typeof body.agent_card_url === 'string'
      ? body.agent_card_url.trim()
      : null

    if (rawUrl.length > 2048) {
      return NextResponse.json(
        { error: 'URL too long (max 2048 characters)', code: 'URL_TOO_LONG', request_id: requestId },
        { status: 400 }
      )
    }

    // Normalize domain
    let domain: string
    try {
      const urlObj = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`)
      domain = urlObj.hostname.replace(/^www\./, '')
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format', code: 'INVALID_URL', request_id: requestId },
        { status: 400 }
      )
    }

    // Block private/internal domains
    if (
      domain === 'localhost' ||
      domain.endsWith('.local') ||
      domain.match(/^(?:10\.|172\.(?:1[6-9]|2\d|3[01])\.|192\.168\.)/)
    ) {
      return NextResponse.json(
        { error: 'Private or internal URLs are not allowed', code: 'PRIVATE_URL', request_id: requestId },
        { status: 400 }
      )
    }

    // Try to fetch the agent card
    let agentCard: Record<string, unknown> | null = null
    const cardUrls = agentCardUrl
      ? [agentCardUrl]
      : [
          `https://${domain}/.well-known/agent-card.json`,
          `https://${domain}/agent-card.json`,
          `https://${domain}/.well-known/ai-plugin.json`,
        ]

    for (const cardUrl of cardUrls) {
      try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(cardUrl, {
          signal: controller.signal,
          headers: { 'User-Agent': 'AgentHermes-Registry/1.0' },
        })
        clearTimeout(timer)

        if (res.ok) {
          const contentType = res.headers.get('content-type') || ''
          if (contentType.includes('json')) {
            agentCard = await res.json()
            break
          }
        }
      } catch {
        // Try next URL
      }
    }

    // Check if business already exists
    const supabase = getServiceClient()
    const { data: existingRaw } = await supabase
      .from('businesses')
      .select('id, name, slug, audit_score, audit_tier, a2a_agent_card')
      .eq('domain', domain)
      .single()
    const existing = existingRaw as Record<string, any> | null

    if (existing) {
      // Update agent card if we found one and it's new
      if (agentCard && (!existing.a2a_agent_card || Object.keys(existing.a2a_agent_card as object).length === 0)) {
        await (supabase
          .from('businesses') as any)
          .update({
            a2a_agent_card: agentCard,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
      }

      return NextResponse.json({
        status: 'already_registered',
        message: `${domain} is already in the registry.`,
        business: {
          id: existing.id,
          name: existing.name,
          slug: existing.slug,
          score: existing.audit_score,
          tier: existing.audit_tier,
          agent_card_found: !!agentCard,
          profile_url: `https://agenthermes.ai/business/${existing.slug}`,
        },
      })
    }

    // New business — create entry and trigger scan via internal API
    const slug = domain.replace(/[^a-z0-9]+/gi, '-').toLowerCase()
    let businessName = domain.split('.')[0] ?? domain
    businessName = businessName.charAt(0).toUpperCase() + businessName.slice(1)

    // Extract name from agent card if available
    if (agentCard) {
      if (typeof agentCard.name === 'string') businessName = agentCard.name
      else if (typeof (agentCard as any).name_for_human === 'string') businessName = (agentCard as any).name_for_human
    }

    const { data: newBizRaw, error: insertError } = await supabase
      .from('businesses')
      .insert({
        name: businessName,
        slug,
        domain,
        description: agentCard
          ? (agentCard.description as string) || (agentCard as any).description_for_human || null
          : null,
        a2a_agent_card: agentCard,
        audit_score: 0,
        audit_tier: 'unaudited',
        mcp_endpoints: [],
        capabilities: [],
        pricing_visible: false,
        agent_onboarding: false,
        trust_score: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any)
      .select('id, name, slug')
      .single()
    const newBiz = newBizRaw as Record<string, any> | null

    if (insertError) {
      console.error('[registry/submit] Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to register business', code: 'DB_ERROR', request_id: requestId },
        { status: 500 }
      )
    }

    // Trigger a scan asynchronously (fire-and-forget)
    const scanUrl = new URL('/api/v1/scan', req.url)
    fetch(scanUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: domain }),
    }).catch((err) =>
      console.error('[registry/submit] Background scan failed:', err)
    )

    return NextResponse.json(
      {
        status: 'submitted',
        message: `${domain} has been submitted to the registry. A scan is in progress.`,
        business: {
          id: newBiz?.id,
          name: newBiz?.name || businessName,
          slug: newBiz?.slug || slug,
          agent_card_found: !!agentCard,
          profile_url: `https://agenthermes.ai/business/${newBiz?.slug || slug}`,
        },
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[registry/submit] Unexpected error:', err instanceof Error ? err.message : err)
    logError('/api/v1/registry/submit', 'POST', err instanceof Error ? err : new Error(String(err)), requestId)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR', request_id: requestId },
      { status: 500 }
    )
  }
}
