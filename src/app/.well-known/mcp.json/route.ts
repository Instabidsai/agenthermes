import { NextResponse } from 'next/server'

const mcpDiscovery = {
  name: 'AgentHermes',
  description:
    'Agent Readiness Score platform — discover, score, and transact with agent-ready businesses',
  endpoint: 'https://agenthermes.ai/api/mcp',
  transport: 'http',
  version: '1.0.0',
}

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'public, max-age=3600',
}

export async function GET() {
  return NextResponse.json(mcpDiscovery, { headers: corsHeaders })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}
