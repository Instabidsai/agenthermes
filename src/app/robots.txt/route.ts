import { NextResponse } from 'next/server'

const robotsTxt = `User-agent: *
Allow: /
Allow: /score/
Allow: /api/v1/score/
Allow: /api/v1/discover
Allow: /api/badge/
Allow: /api/nlweb
Disallow: /dashboard
Disallow: /analytics
Disallow: /api/v1/wallet
Disallow: /api/v1/analytics
Disallow: /api/webhooks/

# --- AI crawlers — ALLOW for GEO (AI citation optimization) ---
User-agent: GPTBot
Allow: /
Disallow: /dashboard
Disallow: /analytics
Disallow: /api/v1/wallet

User-agent: Google-Extended
Allow: /
Disallow: /dashboard
Disallow: /analytics

User-agent: anthropic-ai
Allow: /
Disallow: /dashboard
Disallow: /analytics

User-agent: ClaudeBot
Allow: /
Disallow: /dashboard
Disallow: /analytics

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: claude-web
Allow: /

User-agent: YouBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: MistralAI-User
Allow: /

User-agent: Bytespider
Allow: /

# --- Pure scraping bots (BLOCK) ---
User-agent: CCBot
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: cohere-ai
Disallow: /

# AI agent metadata
# LLM-readable context: https://agenthermes.ai/llms.txt
# Agent card (A2A v0.3): https://agenthermes.ai/.well-known/agent-card.json

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
