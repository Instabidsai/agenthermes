import { NextResponse } from 'next/server'

/**
 * GET /api/v1/health — Simple health check endpoint
 *
 * Returns service status for uptime monitors and agent readiness scanners.
 * No auth required. No caching — always returns live status.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
    {
      headers: { 'Cache-Control': 'no-cache' },
    }
  )
}
