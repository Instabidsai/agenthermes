import { NextRequest } from 'next/server'

// =====================================================================
// MCP SSE Transport — Streamable HTTP
// =====================================================================
// GET /api/mcp/sse opens a Server-Sent Events stream.
// Clients send JSON-RPC messages via POST to /api/mcp.
// The initial `endpoint` event tells the client where to POST.
// A keep-alive ping fires every 30 seconds to prevent timeouts.
// =====================================================================

const corsHeaders = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache, no-transform',
  'Connection': 'keep-alive',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'X-Accel-Buffering': 'no',
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Send the endpoint event so the client knows where to POST JSON-RPC
      controller.enqueue(
        encoder.encode(`event: endpoint\ndata: /api/mcp\n\n`)
      )

      // Send an initial ping so the client knows the stream is alive
      controller.enqueue(encoder.encode(`: ping\n\n`))

      // Keep-alive ping every 30 seconds
      const interval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`))
        } catch {
          // Stream already closed
          clearInterval(interval)
        }
      }, 30000)

      // Clean up when the client disconnects
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        try {
          controller.close()
        } catch {
          // Already closed
        }
      })
    },
  })

  return new Response(stream, { headers: corsHeaders })
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
