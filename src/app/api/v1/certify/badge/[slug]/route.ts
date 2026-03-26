import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { getBusinessBySlug } from '@/lib/business'

const TIER_COLORS: Record<string, string> = {
  platinum: '#10b981',
  gold: '#eab308',
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildCertifiedBadgeSvg(
  tier: string,
  score: number,
  certifiedDate: string,
  daysRemaining: number,
  expired: boolean
): string {
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1)
  const tierColor = TIER_COLORS[tier] || '#eab308'
  const borderColor = expired ? '#71717a' : tierColor
  const statusText = expired ? 'Expired' : `${daysRemaining}d left`

  const leftText = 'Certified'
  const centerText = `${tierLabel} \u00B7 ${score}`
  const rightText = statusText

  const leftWidth = 88
  const centerWidth = 100
  const rightWidth = 68
  const totalWidth = leftWidth + centerWidth + rightWidth

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="28" role="img" aria-label="AgentHermes Certified: ${tierLabel} ${score}">
  <title>AgentHermes Certified: ${tierLabel} ${score} - ${statusText}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="28" rx="4" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftWidth}" height="28" fill="#18181b"/>
    <rect x="${leftWidth}" width="${centerWidth}" height="28" fill="${borderColor}"/>
    <rect x="${leftWidth + centerWidth}" width="${rightWidth}" height="28" fill="#27272a"/>
    <rect width="${totalWidth}" height="28" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="12" font-weight="600">
    <text x="${leftWidth / 2}" y="18" fill="#e4e4e7">${escapeXml(leftText)}</text>
    <text x="${leftWidth + centerWidth / 2}" y="18" fill="#fff">${escapeXml(centerText)}</text>
    <text x="${leftWidth + centerWidth + rightWidth / 2}" y="18" fill="${expired ? '#ef4444' : '#a1a1aa'}" font-size="10">${escapeXml(rightText)}</text>
  </g>
</svg>`
}

function buildUncertifiedBadgeSvg(): string {
  const leftText = 'AgentHermes'
  const rightText = 'Not Certified'
  const leftWidth = 110
  const rightWidth = 105
  const totalWidth = leftWidth + rightWidth

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="28" role="img" aria-label="${leftText}: ${rightText}">
  <title>${leftText}: ${rightText}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="28" rx="4" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftWidth}" height="28" fill="#18181b"/>
    <rect x="${leftWidth}" width="${rightWidth}" height="28" fill="#71717a"/>
    <rect width="${totalWidth}" height="28" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="12" font-weight="600">
    <text x="${leftWidth / 2}" y="18" fill="#e4e4e7">${escapeXml(leftText)}</text>
    <text x="${leftWidth + rightWidth / 2}" y="18" fill="#fff">${escapeXml(rightText)}</text>
  </g>
</svg>`
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
      const svg = buildUncertifiedBadgeSvg()
      return new NextResponse(svg, {
        status: 400,
        headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-cache' },
      })
    }

    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError || !business) {
      const svg = buildUncertifiedBadgeSvg()
      return new NextResponse(svg, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    const supabase = getServiceClient()

    // Check certification
    const { data: certRaw } = await supabase
      .from('certifications')
      .select('tier, certified_at, expires_at, status')
      .eq('business_id', business.id)
      .single()

    if (!certRaw) {
      const svg = buildUncertifiedBadgeSvg()
      return new NextResponse(svg, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    const cert = certRaw as any
    const daysRemaining = Math.ceil(
      (new Date(cert.expires_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000)
    )
    const expired = daysRemaining <= 0

    const svg = buildCertifiedBadgeSvg(
      cert.tier,
      business.audit_score ?? 0,
      cert.certified_at,
      Math.max(daysRemaining, 0),
      expired
    )

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    console.error('[certify/badge] Unexpected error:', err instanceof Error ? err.message : err)
    const svg = buildUncertifiedBadgeSvg()
    return new NextResponse(svg, {
      status: 500,
      headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-cache' },
    })
  }
}
