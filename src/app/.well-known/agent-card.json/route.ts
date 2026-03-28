import { NextResponse } from 'next/server'

const agentCard = {
  name: 'AgentHermes',
  description:
    'The Agent Readiness Score platform. Scans, scores, and verifies businesses for AI agent compatibility. The FICO of the agent economy.',
  url: 'https://agenthermes.ai',
  version: '1.0.0',
  capabilities: {
    mcp: {
      endpoint: 'https://agenthermes.ai/api/mcp',
      transport: 'http',
    },
    rest_api: {
      base_url: 'https://agenthermes.ai/api/v1',
      documentation: 'https://agenthermes.ai/openapi.json',
    },
  },
  skills: [
    {
      id: 'score-business',
      name: 'Score Business Agent Readiness',
      description:
        'Scan any URL and return an Agent Readiness Score (0-100) across 9 weighted dimensions',
      input: {
        type: 'object',
        properties: { url: { type: 'string' } },
        required: ['url'],
      },
    },
    {
      id: 'discover-businesses',
      name: 'Discover Agent-Ready Businesses',
      description:
        'Search for verified businesses by capability, vertical, tier, or price range',
      input: {
        type: 'object',
        properties: {
          q: { type: 'string' },
          vertical: { type: 'string' },
          tier: { type: 'string' },
        },
      },
    },
    {
      id: 'check-score',
      name: 'Check Agent Readiness Score',
      description:
        "Look up any business's current Agent Readiness Score by domain",
      input: {
        type: 'object',
        properties: { domain: { type: 'string' } },
        required: ['domain'],
      },
    },
    {
      id: 'get-manifest',
      name: 'Get Business Manifest',
      description:
        'Retrieve machine-readable business profile with services, pricing, and endpoints',
      input: {
        type: 'object',
        properties: { slug: { type: 'string' } },
        required: ['slug'],
      },
    },
    {
      id: 'gateway-call',
      name: 'Call Service Through Gateway',
      description:
        'Execute API calls to any connected business service through the AgentHermes gateway with automatic billing',
      input: {
        type: 'object',
        properties: {
          service_id: { type: 'string' },
          action: { type: 'string' },
          params: { type: 'object' },
        },
        required: ['service_id', 'action'],
      },
    },
  ],
  authentication: {
    public_endpoints: [
      '/api/v1/score',
      '/api/v1/discover',
      '/api/v1/audit',
      '/api/mcp',
    ],
    authenticated_endpoints: [
      '/api/v1/wallet/fund',
      '/api/v1/wallet/transfer',
    ],
    method: 'bearer_token',
  },
  contact: {
    email: 'support@agenthermes.ai',
    website: 'https://agenthermes.ai',
  },
}

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'public, max-age=3600',
}

export async function GET() {
  return NextResponse.json(agentCard, { headers: corsHeaders })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}
