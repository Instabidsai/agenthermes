import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AgentHermes — The Agent Readiness Score'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)',
        fontFamily: 'system-ui, sans-serif',
      }}>
        {/* Shield icon / logo mark */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: 20,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          marginBottom: 24,
        }}>
          <div style={{ color: 'white', fontSize: 44, fontWeight: 800 }}>AH</div>
        </div>

        {/* Title */}
        <div style={{
          fontSize: 56,
          fontWeight: 800,
          color: '#fafafa',
          letterSpacing: '-0.02em',
          marginBottom: 12,
        }}>
          AgentHermes
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 28,
          color: '#a1a1aa',
          fontWeight: 400,
          marginBottom: 32,
        }}>
          The Agent Readiness Score
        </div>

        {/* Score meter bar */}
        <div style={{
          display: 'flex',
          width: 600,
          height: 8,
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          <div style={{ flex: 2, background: '#ef4444' }} />
          <div style={{ flex: 1, background: '#f59e0b' }} />
          <div style={{ flex: 1, background: '#a1a1aa' }} />
          <div style={{ flex: 1, background: '#eab308' }} />
          <div style={{ flex: 1, background: '#10b981' }} />
        </div>

        {/* Tier labels */}
        <div style={{
          display: 'flex',
          width: 600,
          justifyContent: 'space-between',
          fontSize: 14,
          color: '#71717a',
        }}>
          <span>0</span>
          <span>40</span>
          <span>60</span>
          <span>75</span>
          <span>90</span>
          <span>100</span>
        </div>

        {/* Bottom tagline */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          fontSize: 18,
          color: '#52525b',
        }}>
          agenthermes.ai — The trust layer for AI agent commerce
        </div>
      </div>
    ),
    { ...size }
  )
}
