import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function generateRequestId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    // Fallback for environments where crypto.randomUUID is unavailable
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  }
}

export function middleware(request: NextRequest) {
  const requestId = generateRequestId()

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
        'Access-Control-Max-Age': '86400',
        'X-Request-ID': requestId,
      },
    })
  }

  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
  response.headers.set('X-Request-ID', requestId)
  return response
}

export const config = {
  matcher: '/api/:path*',
}
