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

# --- AI search bots (ALLOW) ---
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: claude-web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: YouBot
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: MistralAI-User
Allow: /

# --- AI training crawlers (BLOCK) ---
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: cohere-ai
Disallow: /

# AI agent metadata
# LLM-readable context: https://agenthermes.ai/llms.txt
# Agent card (A2A): https://agenthermes.ai/.well-known/agent.json

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
