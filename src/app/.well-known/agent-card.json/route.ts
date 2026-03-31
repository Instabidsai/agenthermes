import { NextResponse } from 'next/server'

/**
 * A2A Agent Card — served at /.well-known/agent-card.json
 * Spec: https://google.github.io/A2A/#/documentation?id=agent-card
 * Version: v0.3
 */
const agentCard = {
  name: 'AgentHermes',
  description:
    'The Shopify of the Agent Economy. Make any business discoverable, usable, and payable by AI agents. Score It, Fix It, Connect It.',
  url: 'https://agenthermes.ai',
  version: '0.3.0',
  capabilities: {
    mcp: {
      endpoint: 'https://agenthermes.ai/api/mcp',
      transport: 'http',
      tools: 10,
      resources: 4,
      prompts: 3,
    },
    a2a: {
      endpoint: 'https://agenthermes.ai/api/a2a',
      discovery: 'https://agenthermes.ai/api/a2a/discover',
      protocol_version: '0.3',
      transport: 'json-rpc',
      methods: ['tasks/send', 'tasks/get', 'tasks/cancel'],
    },
    rest_api: {
      base_url: 'https://agenthermes.ai/api/v1',
      documentation: 'https://agenthermes.ai/openapi.json',
      endpoints: 40,
    },
  },
  skills: [
    {
      id: 'score-business',
      name: 'Score Business Agent Readiness',
      description:
        'Scan any URL and return an Agent Readiness Score (0-100) across 9 weighted dimensions: API Quality, Security, Reliability, Agent Experience, Data Quality, Discoverability, Onboarding, Pricing, Payment.',
      tags: ['scoring', 'audit', 'readiness'],
      input: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL of the business to scan',
          },
        },
        required: ['url'],
      },
      output: {
        type: 'object',
        properties: {
          score: { type: 'number', description: 'Overall score 0-100' },
          tier: {
            type: 'string',
            enum: ['platinum', 'gold', 'silver', 'bronze', 'failing'],
          },
          dimensions: {
            type: 'object',
            description: 'Per-dimension scores',
          },
          recommendations: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
    },
    {
      id: 'discover-businesses',
      name: 'Discover Agent-Ready Businesses',
      description:
        'Search the AgentHermes directory for verified businesses by capability, vertical, tier, or price range. Supports semantic search.',
      tags: ['discovery', 'search', 'directory'],
      input: {
        type: 'object',
        properties: {
          q: {
            type: 'string',
            description: 'Search query (semantic or keyword)',
          },
          vertical: {
            type: 'string',
            description: 'Industry vertical filter',
          },
          tier: {
            type: 'string',
            enum: ['platinum', 'gold', 'silver', 'bronze'],
            description: 'Minimum tier filter',
          },
          min_score: { type: 'number', description: 'Minimum score 0-100' },
        },
      },
      output: {
        type: 'object',
        properties: {
          businesses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                domain: { type: 'string' },
                score: { type: 'number' },
                tier: { type: 'string' },
              },
            },
          },
        },
      },
    },
    {
      id: 'check-score',
      name: 'Check Agent Readiness Score',
      description:
        "Quick lookup of any business's current Agent Readiness Score by domain. Returns cached score without re-scanning.",
      tags: ['scoring', 'lookup'],
      input: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            description: 'Domain to check (e.g. stripe.com)',
          },
        },
        required: ['domain'],
      },
      output: {
        type: 'object',
        properties: {
          score: { type: 'number' },
          tier: { type: 'string' },
          last_scanned: { type: 'string', format: 'date-time' },
        },
      },
    },
    {
      id: 'get-manifest',
      name: 'Get Business Manifest',
      description:
        'Retrieve a machine-readable business profile with services, pricing, authentication methods, and endpoints. Used by agents to understand how to interact with a business.',
      tags: ['manifest', 'profile', 'machine-readable'],
      input: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'Business slug identifier',
          },
        },
        required: ['slug'],
      },
      output: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          services: { type: 'array' },
          pricing: { type: 'object' },
          authentication: { type: 'object' },
        },
      },
    },
    {
      id: 'gateway-call',
      name: 'Call Service Through Gateway',
      description:
        'Execute API calls to any connected business service through the AgentHermes gateway. One API key, every service. Automatic billing via wallet.',
      tags: ['gateway', 'api', 'transactions'],
      input: {
        type: 'object',
        properties: {
          service_id: {
            type: 'string',
            description: 'ID of the gateway service to call',
          },
          action: {
            type: 'string',
            description: 'Action to execute on the service',
          },
          params: {
            type: 'object',
            description: 'Action-specific parameters',
          },
        },
        required: ['service_id', 'action'],
      },
      output: {
        type: 'object',
        properties: {
          result: { type: 'object' },
          cost: { type: 'number' },
          request_id: { type: 'string' },
        },
      },
    },
  ],
  authentication: {
    public_endpoints: [
      '/api/v1/score',
      '/api/v1/discover',
      '/api/v1/audit',
      '/api/v1/scan',
      '/api/mcp',
    ],
    authenticated_endpoints: [
      '/api/v1/wallet/fund',
      '/api/v1/wallet/transfer',
      '/api/v1/gateway/call',
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
