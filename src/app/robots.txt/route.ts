import { NextResponse } from 'next/server'

const robotsTxt = `User-agent: *
Allow: /
Allow: /api/v1/score/
Allow: /api/v1/discover
Allow: /api/badge/
Disallow: /dashboard
Disallow: /analytics
Disallow: /api/v1/wallet
Disallow: /api/v1/analytics
Disallow: /api/webhooks/

# AI agent metadata
# LLM-readable context: https://agenthermes.ai/llms.txt
# Agent card (A2A): https://agenthermes.ai/.well-known/agent-card.json

Sitemap: https://agenthermes.ai/sitemap.xml
`

export async function GET() {
  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
