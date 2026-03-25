import { NextResponse } from 'next/server'

const robotsTxt = `User-agent: *
Allow: /
Allow: /api/v1/score/
Allow: /api/v1/discover
Allow: /api/badge/

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
