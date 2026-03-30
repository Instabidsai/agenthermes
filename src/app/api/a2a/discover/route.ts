import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// GET /api/a2a/discover
//
// A2A discovery endpoint. Returns what AgentHermes can do in A2A format,
// listing all available skills with full input/output JSON schemas.
// ---------------------------------------------------------------------------

const a2aCapabilities = {
  name: 'AgentHermes',
  description:
    'The Agent Readiness Score platform. Scans, scores, and verifies businesses for AI agent compatibility. Acts as the FICO of the agent economy — agents discover, evaluate, and transact with businesses through AgentHermes.',
  url: 'https://agenthermes.ai',
  version: '1.0.0',
  protocol: {
    name: 'A2A',
    version: '1.0',
    task_endpoint: 'https://agenthermes.ai/api/a2a',
    transport: 'json-rpc',
    methods: ['tasks/send', 'tasks/get', 'tasks/cancel'],
  },
  authentication: {
    required: false,
    note: 'Public skills are open. Gateway calls require a wallet_id for billing.',
  },
  skills: [
    {
      id: 'score-business',
      name: 'Score Business Agent Readiness',
      description:
        'Scan any URL and return an Agent Readiness Score (0-100) across 9 weighted dimensions: Discoverability, API Quality, Onboarding, Pricing Transparency, Payment Readiness, Data Quality, Security, Reliability, and Agent Experience.',
      input_schema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description:
              'The URL or domain of the business to scan (e.g., "example.com" or "https://example.com/services")',
            maxLength: 2048,
          },
        },
        required: ['url'],
      },
      output_schema: {
        type: 'object',
        properties: {
          total_score: { type: 'number', description: 'Overall score 0-100' },
          tier: {
            type: 'string',
            enum: ['platinum', 'gold', 'silver', 'bronze', 'unaudited'],
          },
          dimensions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                dimension: { type: 'string' },
                label: { type: 'string' },
                score: { type: 'number' },
                weight: { type: 'number' },
                checks: { type: 'array' },
                recommendations: { type: 'array' },
              },
            },
          },
          business_id: { type: 'string', format: 'uuid' },
        },
      },
      rate_limit: '5 per minute',
      execution_time: '5-30 seconds',
    },
    {
      id: 'discover-businesses',
      name: 'Discover Agent-Ready Businesses',
      description:
        'Search the AgentHermes directory for verified agent-ready businesses. Filter by text query, vertical, tier, or score threshold.',
      input_schema: {
        type: 'object',
        properties: {
          q: {
            type: 'string',
            description: 'Text search across business name, description, and domain',
          },
          vertical: {
            type: 'string',
            description: 'Filter by industry vertical (e.g., "saas", "ecommerce", "healthcare")',
          },
          tier: {
            type: 'string',
            enum: ['bronze', 'silver', 'gold', 'platinum'],
            description: 'Minimum tier filter',
          },
          limit: {
            type: 'number',
            description: 'Max results to return (1-100, default 20)',
            default: 20,
          },
        },
      },
      output_schema: {
        type: 'object',
        properties: {
          businesses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                slug: { type: 'string' },
                domain: { type: 'string' },
                description: { type: 'string' },
                audit_score: { type: 'number' },
                audit_tier: { type: 'string' },
                vertical: { type: 'string' },
                capabilities: { type: 'array' },
                mcp_endpoints: { type: 'array' },
              },
            },
          },
          total: { type: 'number' },
        },
      },
      rate_limit: '20 per minute',
      execution_time: '<1 second',
    },
    {
      id: 'gateway-call',
      name: 'Call Service Through Gateway',
      description:
        'Execute API calls to any connected business service through the AgentHermes gateway. Handles auth injection, billing, and usage logging automatically.',
      input_schema: {
        type: 'object',
        properties: {
          service_id: {
            type: 'string',
            format: 'uuid',
            description: 'UUID of the gateway service to call',
          },
          action: {
            type: 'string',
            description: 'Action name to invoke on the service (e.g., "chat_completion")',
          },
          params: {
            type: 'object',
            description: 'Parameters forwarded to the upstream API',
          },
          wallet_id: {
            type: 'string',
            format: 'uuid',
            description: 'UUID of the wallet to charge for the call',
          },
        },
        required: ['service_id', 'action', 'wallet_id'],
      },
      output_schema: {
        type: 'object',
        properties: {
          result: { type: 'object', description: 'Response from the upstream service' },
          billing: {
            type: 'object',
            properties: {
              cost: { type: 'number' },
              margin: { type: 'number' },
              total_charged: { type: 'number' },
            },
          },
          meta: {
            type: 'object',
            properties: {
              service_name: { type: 'string' },
              action_name: { type: 'string' },
              status_code: { type: 'number' },
              response_ms: { type: 'number' },
            },
          },
        },
      },
      requires_auth: true,
      rate_limit: '30 per minute',
      execution_time: '1-10 seconds',
    },
    {
      id: 'check-score',
      name: 'Check Agent Readiness Score',
      description:
        "Look up any business's current Agent Readiness Score by domain. Returns the score, tier, and profile link if the business has been scanned.",
      input_schema: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            description: 'Domain to look up (e.g., "stripe.com")',
          },
        },
        required: ['domain'],
      },
      output_schema: {
        type: 'object',
        properties: {
          domain: { type: 'string' },
          scored: { type: 'boolean' },
          score: { type: 'number' },
          tier: { type: 'string' },
          name: { type: 'string' },
          profile_url: { type: 'string', format: 'uri' },
          last_updated: { type: 'string', format: 'date-time' },
        },
      },
      rate_limit: '20 per minute',
      execution_time: '<1 second',
    },
    {
      id: 'get-manifest',
      name: 'Get Business Manifest',
      description:
        'Retrieve a machine-readable business profile including services, pricing, audit results, and API endpoints. Look up by slug or domain.',
      input_schema: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'Business slug (e.g., "stripe-com")',
          },
          domain: {
            type: 'string',
            description: 'Business domain (e.g., "stripe.com")',
          },
        },
      },
      output_schema: {
        type: 'object',
        description:
          'Full business record including services array, audit_results array, capabilities, and MCP endpoints. Sensitive fields (owner_email, stripe_connect_id) are stripped.',
      },
      rate_limit: '20 per minute',
      execution_time: '<1 second',
    },
  ],
  task_statuses: ['pending', 'working', 'completed', 'failed', 'cancelled'],
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
  'Cache-Control': 'public, max-age=300',
}

export async function GET() {
  return NextResponse.json(a2aCapabilities, { headers: corsHeaders })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}
