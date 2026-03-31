// ---------------------------------------------------------------------------
// POST /api/v1/detect-shopify — Detect Shopify store and generate MCP tools
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from 'next/server'
import { detectShopifyStore, generateMcpTools } from '@/lib/adapters/shopify'

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()

  try {
    const body = await request.json()
    const url = body.url as string | undefined

    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      return NextResponse.json(
        { error: 'url is required', code: 'MISSING_URL', request_id: requestId },
        { status: 400 }
      )
    }

    // Validate URL is not internal
    const trimmed = url.trim()
    let normalized = trimmed
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = `https://${normalized}`
    }

    try {
      const parsed = new URL(normalized)
      const forbidden = ['localhost', '127.0.0.1', '0.0.0.0', '169.254.169.254', '::1']
      if (forbidden.includes(parsed.hostname.toLowerCase()) || parsed.hostname.startsWith('192.168.') || parsed.hostname.startsWith('10.')) {
        return NextResponse.json(
          { error: 'Cannot probe internal URLs', code: 'INVALID_URL', request_id: requestId },
          { status: 400 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL', code: 'INVALID_URL', request_id: requestId },
        { status: 400 }
      )
    }

    // Run detection
    const detection = await detectShopifyStore(trimmed)

    if (!detection.detected) {
      return NextResponse.json({
        detected: false,
        platform: null,
        confidence: null,
        details: detection.details,
        tools: [],
        request_id: requestId,
      })
    }

    // Generate MCP tools
    const tools = await generateMcpTools(trimmed)

    return NextResponse.json({
      detected: true,
      platform: 'shopify',
      confidence: detection.confidence,
      details: detection.details,
      api_base: detection.apiBase,
      tools,
      tool_count: tools.length,
      request_id: requestId,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(
      { error: message, code: 'INTERNAL_ERROR', request_id: requestId },
      { status: 500 }
    )
  }
}
