import { NextResponse } from 'next/server'

/**
 * Legacy agent card path — redirects to the A2A spec-compliant path.
 * A2A v0.3 requires /.well-known/agent-card.json (not agent.json).
 * This redirect ensures existing consumers are not broken.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function GET() {
  return NextResponse.redirect(
    new URL('https://agenthermes.ai/.well-known/agent-card.json'),
    { status: 301, headers: corsHeaders }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}
