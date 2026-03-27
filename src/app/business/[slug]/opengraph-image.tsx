import { ImageResponse } from 'next/og'
import { getServiceClient } from '@/lib/supabase'

export const runtime = 'edge'
export const alt = 'Business Profile — AgentHermes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const tierColors: Record<string, { bg: string; text: string; label: string }> = {
  platinum: { bg: '#059669', text: '#ecfdf5', label: 'Platinum' },
  gold: { bg: '#ca8a04', text: '#fefce8', label: 'Gold' },
  silver: { bg: '#71717a', text: '#f4f4f5', label: 'Silver' },
  bronze: { bg: '#b45309', text: '#fffbeb', label: 'Bronze' },
  unaudited: { bg: '#3f3f46', text: '#a1a1aa', label: 'Not Scored' },
}

function getScoreColor(score: number): string {
  if (score >= 90) return '#10b981'
  if (score >= 75) return '#eab308'
  if (score >= 60) return '#a1a1aa'
  if (score >= 40) return '#f59e0b'
  return '#ef4444'
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let name = slug
  let score = 0
  let tier = 'unaudited'
  let domain: string | null = null

  try {
    const supabase = getServiceClient()
    const { data } = await supabase
      .from('businesses')
      .select('name, audit_score, audit_tier, domain')
      .eq('slug', slug)
      .single()

    if (data) {
      const biz = data as { name: string; audit_score: number; audit_tier: string; domain: string | null }
      name = biz.name
      score = biz.audit_score
      tier = biz.audit_tier
      domain = biz.domain
    }
  } catch {
    // Fall back to slug-based display
  }

  const tierStyle = tierColors[tier] || tierColors.unaudited
  const scoreColor = getScoreColor(score)
  const scorePct = Math.min(score, 100)

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)',
        fontFamily: 'system-ui, sans-serif',
        padding: 60,
      }}>
        {/* Top row: AgentHermes branding */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 40,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #10b981, #059669)',
          }}>
            <div style={{ color: 'white', fontSize: 22, fontWeight: 800 }}>AH</div>
          </div>
          <div style={{ fontSize: 20, color: '#52525b', fontWeight: 600 }}>
            AgentHermes
          </div>
        </div>

        {/* Main content area */}
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Left: Business info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 650,
          }}>
            <div style={{
              fontSize: 52,
              fontWeight: 800,
              color: '#fafafa',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 16,
            }}>
              {name}
            </div>

            {domain && (
              <div style={{
                fontSize: 22,
                color: '#71717a',
                marginBottom: 20,
              }}>
                {domain}
              </div>
            )}

            {/* Tier badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: 999,
                background: tierStyle.bg,
                fontSize: 18,
                fontWeight: 700,
                color: tierStyle.text,
              }}>
                {tierStyle.label}
              </div>
              <div style={{
                fontSize: 18,
                color: '#71717a',
              }}>
                Agent Readiness Tier
              </div>
            </div>
          </div>

          {/* Right: Score circle */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Score ring - using layered divs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 200,
              borderRadius: 100,
              border: `8px solid #27272a`,
              position: 'relative',
            }}>
              {/* Colored arc overlay (simplified as border) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 200,
                height: 200,
                borderRadius: 100,
                borderTop: `8px solid ${scoreColor}`,
                borderRight: scorePct > 25 ? `8px solid ${scoreColor}` : '8px solid transparent',
                borderBottom: scorePct > 50 ? `8px solid ${scoreColor}` : '8px solid transparent',
                borderLeft: scorePct > 75 ? `8px solid ${scoreColor}` : '8px solid transparent',
                position: 'absolute',
                top: -8,
                left: -8,
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <div style={{
                    fontSize: 64,
                    fontWeight: 800,
                    color: scoreColor,
                    lineHeight: 1,
                  }}>
                    {score}
                  </div>
                  <div style={{
                    fontSize: 16,
                    color: '#71717a',
                    marginTop: 4,
                  }}>
                    / 100
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Score bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginTop: 24,
        }}>
          <div style={{
            display: 'flex',
            width: '100%',
            height: 6,
            borderRadius: 3,
            overflow: 'hidden',
            background: '#27272a',
          }}>
            <div style={{
              width: `${scorePct}%`,
              height: '100%',
              background: scoreColor,
              borderRadius: 3,
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: '#52525b',
          }}>
            <span>0</span>
            <span>agenthermes.ai/business/{slug}</span>
            <span>100</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
