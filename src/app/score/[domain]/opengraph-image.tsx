import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'
export const alt = 'Agent Readiness Score'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TIER_COLORS: Record<string, string> = {
  platinum: '#34d399', // emerald-400
  gold: '#eab308',     // yellow-500
  silver: '#a1a1aa',   // zinc-400
  bronze: '#d97706',   // amber-600
  unaudited: '#52525b', // zinc-600
}

const TIER_LABELS: Record<string, string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  bronze: 'Bronze',
  unaudited: 'Not Scored',
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ domain: string }>
}) {
  const { domain } = await params
  const decodedDomain = decodeURIComponent(domain).toLowerCase().trim()

  let businessName: string | null = null
  let score: number | null = null
  let tier = 'unaudited'

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey)
      const { data } = await supabase
        .from('businesses')
        .select('name, audit_score, audit_tier')
        .eq('domain', decodedDomain)
        .single()

      if (data) {
        const biz = data as Record<string, any>
        businessName = biz.name || null
        score = biz.audit_score ?? null
        tier = biz.audit_tier || 'unaudited'
      }
    }
  } catch {
    // Fall through with defaults
  }

  const displayName = businessName || decodedDomain
  const displayScore = score !== null ? String(score) : '--'
  const tierLabel = TIER_LABELS[tier] || 'Not Scored'
  const tierColor = TIER_COLORS[tier] || TIER_COLORS.unaudited

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          position: 'relative',
        }}
      >
        {/* Tier-colored accent bar at top */}
        <div
          style={{
            width: '100%',
            height: '6px',
            background: tierColor,
          }}
        />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 60px',
          }}
        >
          {/* Domain name */}
          <div
            style={{
              fontSize: 36,
              color: '#a1a1aa',
              fontWeight: 500,
              marginBottom: 16,
              letterSpacing: '-0.01em',
            }}
          >
            {decodedDomain}
          </div>

          {/* Business name (if different from domain) */}
          {businessName && businessName.toLowerCase() !== decodedDomain && (
            <div
              style={{
                fontSize: 28,
                color: '#71717a',
                marginBottom: 24,
              }}
            >
              {displayName}
            </div>
          )}

          {/* Big score number */}
          <div
            style={{
              fontSize: 160,
              fontWeight: 800,
              color: tierColor,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: 8,
            }}
          >
            {displayScore}
          </div>

          {/* Score label */}
          <div
            style={{
              fontSize: 24,
              color: '#71717a',
              marginBottom: 20,
            }}
          >
            {score !== null ? '/ 100' : ''}
          </div>

          {/* Tier badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 28px',
              borderRadius: '9999px',
              border: `2px solid ${tierColor}40`,
              backgroundColor: `${tierColor}15`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: tierColor,
              }}
            />
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: tierColor,
              }}
            >
              {tierLabel}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 60px',
            borderTop: '1px solid #27272a',
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: '#52525b',
              fontWeight: 500,
            }}
          >
            Agent Readiness Score by AgentHermes
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
