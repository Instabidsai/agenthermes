import { NextRequest, NextResponse } from 'next/server'

/**
 * Simple API key authentication for protected endpoints.
 * Checks for Bearer token in Authorization header.
 *
 * In production, replace with Supabase Auth JWT verification.
 * For now, any request to protected endpoints requires the API key
 * set in AGENTHERMES_API_KEY env var.
 */
export function requireAuth(request: NextRequest): NextResponse | null {
  const apiKey = process.env.AGENTHERMES_API_KEY

  // If no API key is configured, allow all requests (dev mode)
  if (!apiKey) {
    return null
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json(
      { error: 'Authorization header required' },
      { status: 401 }
    )
  }

  const token = authHeader.replace(/^Bearer\s+/i, '')
  if (token !== apiKey) {
    return NextResponse.json(
      { error: 'Invalid API key' },
      { status: 403 }
    )
  }

  return null // Auth passed
}

/**
 * Simple IP-based rate limiter for expensive operations.
 * Uses in-memory store (resets on cold start — acceptable for serverless).
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(
  request: NextRequest,
  maxRequests: number = 5,
  windowMs: number = 60_000
): NextResponse | null {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()

  const entry = rateLimitStore.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
    return null
  }

  entry.count++
  if (entry.count > maxRequests) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) } }
    )
  }

  return null
}
