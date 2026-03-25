import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

const TIER_COLORS: Record<string, string> = {
  platinum: '#10b981',
  gold: '#eab308',
  silver: '#94a3b8',
  bronze: '#f59e0b',
  unaudited: '#71717a',
}

const TIER_LABELS: Record<string, string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  bronze: 'Bronze',
  unaudited: 'Not Rated',
}

function buildBadgeSvg(
  tier: string,
  score: number | null,
  tierLabel: string,
  tierColor: string
): string {
  const leftText = 'Agent Ready'
  const rightText =
    score !== null ? `${tierLabel} \u00B7 ${score}` : tierLabel

  // Calculate widths based on text length for a balanced badge
  const leftWidth = 98
  const rightWidth = score !== null ? 92 : 82
  const totalWidth = leftWidth + rightWidth

  const leftCenter = leftWidth / 2
  const rightCenter = leftWidth + rightWidth / 2

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
    <rect x="${leftWidth}" width="${rightWidth}" height="28" fill="${tierColor}"/>
    <rect width="${totalWidth}" height="28" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="12" font-weight="600">
    <text x="${leftCenter}" y="18" fill="#e4e4e7">${leftText}</text>
    <text x="${rightCenter}" y="18" fill="#fff">${escapeXml(rightText)}</text>
  </g>
</svg>`
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    const { domain } = await params
    const decodedDomain = decodeURIComponent(domain).toLowerCase().trim()

    // Basic domain validation
    if (
      !decodedDomain ||
      decodedDomain.length > 253 ||
      !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i.test(decodedDomain)
    ) {
      const svg = buildBadgeSvg('unaudited', null, 'Invalid', '#ef4444')
      return new NextResponse(svg, {
        status: 400,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache',
        },
      })
    }

    const supabase = getServiceClient()

    const { data: businessRaw, error: bizError } = await supabase
      .from('businesses')
      .select('audit_score, audit_tier')
      .eq('domain', decodedDomain)
      .single()

    let tier = 'unaudited'
    let score: number | null = null

    if (!bizError && businessRaw) {
      const business = businessRaw as Record<string, any>
      tier = business.audit_tier || 'unaudited'
      score = business.audit_score ?? null
    }

    const tierLabel = TIER_LABELS[tier] || TIER_LABELS.unaudited
    const tierColor = TIER_COLORS[tier] || TIER_COLORS.unaudited

    const svg = buildBadgeSvg(tier, score, tierLabel, tierColor)

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    console.error(
      '[badge/domain] Unexpected error:',
      err instanceof Error ? err.message : err
    )

    // Return a fallback error badge instead of JSON
    const svg = buildBadgeSvg('unaudited', null, 'Error', '#ef4444')
    return new NextResponse(svg, {
      status: 500,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache',
      },
    })
  }
}
