import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://agenthermes.ai'

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
      return new NextResponse('Invalid domain format.', { status: 400 })
    }

    const badgeUrl = `${BASE_URL}/api/badge/${encodeURIComponent(decodedDomain)}`
    const profileUrl = `${BASE_URL}/audit`

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agent Readiness Score - ${escapeHtml(decodedDomain)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: transparent; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
    .badge-container {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      color: inherit;
    }
    .badge-container:hover { opacity: 0.9; }
    .badge-container img {
      height: 28px;
      display: block;
    }
    .badge-container p {
      font-size: 10px;
      color: #71717a;
      letter-spacing: 0.02em;
    }
  </style>
</head>
<body>
  <a class="badge-container" href="${escapeHtml(profileUrl)}" target="_blank" rel="noopener noreferrer">
    <img src="${escapeHtml(badgeUrl)}" alt="Agent Readiness Score for ${escapeHtml(decodedDomain)}" />
    <p>Verified by AgentHermes</p>
  </a>
</body>
</html>`

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
        'X-Frame-Options': 'ALLOWALL',
      },
    })
  } catch (err) {
    console.error(
      '[badge/embed] Unexpected error:',
      err instanceof Error ? err.message : err
    )
    return new NextResponse('Internal server error', { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
