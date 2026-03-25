import { NextResponse } from 'next/server'

const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'AgentHermes API',
    description:
      'The Agent Readiness Score platform. Scans, scores, and verifies businesses for AI agent compatibility. The verified commerce network for the agent economy.',
    version: '1.0.0',
    contact: {
      email: 'support@agenthermes.ai',
      url: 'https://agenthermes.ai',
    },
  },
  servers: [
    {
      url: 'https://agenthermes.ai',
      description: 'Production',
    },
  ],
  paths: {
    '/api/v1/audit': {
      post: {
        summary: 'Run Agent Readiness Audit',
        description:
          'Submit a URL to scan and receive an Agent Readiness Score (0-100) across 5 categories.',
        operationId: 'runAudit',
        tags: ['Audit'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['url'],
                properties: {
                  url: {
                    type: 'string',
                    description: 'The domain or URL to audit',
                    example: 'https://example.com',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Audit scorecard',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuditScorecard' },
              },
            },
          },
          '400': {
            description: 'Invalid input',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '429': { description: 'Rate limit exceeded' },
        },
      },
    },
    '/api/v1/audit/{id}': {
      get: {
        summary: 'Get Audit Results by Business ID',
        description: 'Retrieve the latest audit scorecard for a business by its ID.',
        operationId: 'getAuditById',
        tags: ['Audit'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Business ID',
          },
        ],
        responses: {
          '200': {
            description: 'Audit scorecard',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuditScorecard' },
              },
            },
          },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/discover': {
      get: {
        summary: 'Discover Agent-Ready Businesses',
        description:
          'Search and filter businesses by capability, vertical, tier, score, or price.',
        operationId: 'discoverBusinesses',
        tags: ['Discovery'],
        parameters: [
          {
            name: 'q',
            in: 'query',
            schema: { type: 'string' },
            description: 'Free-text search query',
          },
          {
            name: 'vertical',
            in: 'query',
            schema: { type: 'string' },
            description: 'Filter by business vertical',
          },
          {
            name: 'capability',
            in: 'query',
            schema: { type: 'string' },
            description: 'Filter by capability',
          },
          {
            name: 'min_score',
            in: 'query',
            schema: { type: 'number', minimum: 0, maximum: 100 },
            description: 'Minimum audit score',
          },
          {
            name: 'tier',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['bronze', 'silver', 'gold', 'platinum'],
            },
            description: 'Minimum tier',
          },
          {
            name: 'mcp_compatible',
            in: 'query',
            schema: { type: 'boolean' },
            description: 'Only show businesses with MCP endpoints',
          },
          {
            name: 'max_price',
            in: 'query',
            schema: { type: 'number' },
            description: 'Maximum price per API call in USD',
          },
          {
            name: 'sort',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['audit_score', 'trust_score', 'name'],
              default: 'audit_score',
            },
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 20, maximum: 100 },
          },
          {
            name: 'offset',
            in: 'query',
            schema: { type: 'integer', default: 0 },
          },
        ],
        responses: {
          '200': {
            description: 'List of businesses',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    businesses: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/BusinessSummary' },
                    },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/business/{slug}': {
      get: {
        summary: 'Get Business Profile',
        description: 'Retrieve full business profile including services and audit results.',
        operationId: 'getBusinessProfile',
        tags: ['Business'],
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string', pattern: '^[a-z0-9-]{1,100}$' },
            description: 'Business slug',
          },
        ],
        responses: {
          '200': {
            description: 'Business profile',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BusinessProfile' },
              },
            },
          },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/business/{slug}/manifest': {
      get: {
        summary: 'Get Business Manifest',
        description:
          'Machine-readable business manifest with services, pricing, auth, and readiness data.',
        operationId: 'getBusinessManifest',
        tags: ['Business'],
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string', pattern: '^[a-z0-9-]{1,100}$' },
          },
        ],
        responses: {
          '200': {
            description: 'Business manifest',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BusinessManifest' },
              },
            },
          },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/business/{slug}/services': {
      get: {
        summary: 'List Business Services',
        description: 'Get active services for a business.',
        operationId: 'getBusinessServices',
        tags: ['Business'],
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'List of services',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    services: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Service' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/wallet/fund': {
      post: {
        summary: 'Fund Business Wallet',
        description: 'Add funds to a business wallet. Requires authentication.',
        operationId: 'fundWallet',
        tags: ['Wallet'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['business_id', 'amount'],
                properties: {
                  business_id: { type: 'string', format: 'uuid' },
                  amount: {
                    type: 'number',
                    minimum: 0.01,
                    maximum: 10000,
                    description: 'Amount in USD',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Wallet funded successfully' },
          '400': { description: 'Invalid input' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/wallet/transfer': {
      post: {
        summary: 'Transfer Between Wallets',
        description:
          'Transfer funds between two business wallets. Requires authentication.',
        operationId: 'transferFunds',
        tags: ['Wallet'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'from_business_id',
                  'to_business_id',
                  'amount',
                  'service_description',
                ],
                properties: {
                  from_business_id: { type: 'string', format: 'uuid' },
                  to_business_id: { type: 'string', format: 'uuid' },
                  amount: { type: 'number', minimum: 0.01, maximum: 10000 },
                  service_description: { type: 'string' },
                  agent_id: { type: 'string' },
                  task_context: { type: 'string' },
                  service_id: { type: 'string', format: 'uuid' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Transfer completed' },
          '400': { description: 'Invalid input or insufficient balance' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Wallet not found' },
        },
      },
    },
    '/api/mcp': {
      post: {
        summary: 'MCP Server (JSON-RPC 2.0)',
        description:
          'Model Context Protocol server. Supports initialize, tools/list, tools/call, and ping methods. 6 tools available: discover_businesses, get_business_profile, get_business_manifest, run_audit, check_wallet_balance, initiate_payment.',
        operationId: 'mcpServer',
        tags: ['MCP'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['jsonrpc', 'method'],
                properties: {
                  jsonrpc: { type: 'string', enum: ['2.0'] },
                  id: {
                    oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'null' }],
                  },
                  method: {
                    type: 'string',
                    enum: [
                      'initialize',
                      'notifications/initialized',
                      'ping',
                      'tools/list',
                      'tools/call',
                    ],
                  },
                  params: { type: 'object' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'JSON-RPC 2.0 response' },
          '400': { description: 'Invalid JSON-RPC request' },
        },
      },
      get: {
        summary: 'MCP Server Info',
        description: 'Returns server info and available tools for discovery.',
        operationId: 'mcpServerInfo',
        tags: ['MCP'],
        responses: {
          '200': { description: 'Server info with tool list' },
        },
      },
    },
    '/api/v1/remediate/llms-txt': {
      post: {
        summary: 'Generate llms.txt',
        description:
          'Generate an llms.txt file for a business based on their profile or provided info.',
        operationId: 'generateLlmsTxt',
        tags: ['Remediation'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['domain', 'name', 'description'],
                properties: {
                  domain: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Generated llms.txt content',
            content: { 'text/plain': { schema: { type: 'string' } } },
          },
          '400': { description: 'Invalid input' },
        },
      },
    },
    '/api/v1/remediate/agent-card': {
      post: {
        summary: 'Generate Agent Card',
        description:
          'Generate an A2A Agent Card JSON file for a business.',
        operationId: 'generateAgentCard',
        tags: ['Remediation'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['domain', 'name', 'description'],
                properties: {
                  domain: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  api_base: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Generated agent-card.json',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
          '400': { description: 'Invalid input' },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        description: 'API key passed as Bearer token',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      Pagination: {
        type: 'object',
        properties: {
          total: { type: 'integer' },
          limit: { type: 'integer' },
          offset: { type: 'integer' },
          has_more: { type: 'boolean' },
        },
      },
      AuditScorecard: {
        type: 'object',
        properties: {
          business_name: { type: 'string' },
          domain: { type: 'string' },
          total_score: { type: 'number', minimum: 0, maximum: 100 },
          tier: {
            type: 'string',
            enum: ['unaudited', 'bronze', 'silver', 'gold', 'platinum'],
          },
          categories: {
            type: 'array',
            items: { $ref: '#/components/schemas/CategoryResult' },
          },
          audited_at: { type: 'string', format: 'date-time' },
          next_steps: { type: 'array', items: { type: 'string' } },
          business_id: { type: 'string', format: 'uuid' },
        },
      },
      CategoryResult: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: [
              'machine_readable_profile',
              'mcp_api_endpoints',
              'agent_native_onboarding',
              'structured_pricing',
              'agent_payment_acceptance',
            ],
          },
          label: { type: 'string' },
          score: { type: 'number' },
          max_score: { type: 'number' },
          details: { type: 'object' },
          recommendations: { type: 'array', items: { type: 'string' } },
        },
      },
      BusinessSummary: {
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
          capabilities: { type: 'array', items: { type: 'string' } },
          mcp_endpoints: { type: 'array', items: { type: 'string' } },
        },
      },
      BusinessProfile: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          slug: { type: 'string' },
          domain: { type: 'string' },
          description: { type: 'string' },
          logo_url: { type: 'string' },
          audit_score: { type: 'number' },
          audit_tier: { type: 'string' },
          trust_score: { type: 'number' },
          vertical: { type: 'string' },
          capabilities: { type: 'array', items: { type: 'string' } },
          mcp_endpoints: { type: 'array', items: { type: 'string' } },
          pricing_visible: { type: 'boolean' },
          agent_onboarding: { type: 'boolean' },
          a2a_agent_card: { type: 'object' },
          services: { type: 'array', items: { $ref: '#/components/schemas/Service' } },
          audit_results: {
            type: 'array',
            items: { $ref: '#/components/schemas/CategoryResult' },
          },
          connections_count: { type: 'integer' },
          transaction_volume: { type: 'number' },
          transaction_count: { type: 'integer' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
      BusinessManifest: {
        type: 'object',
        properties: {
          schema_version: { type: 'string' },
          business: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              slug: { type: 'string' },
              domain: { type: 'string' },
              description: { type: 'string' },
              vertical: { type: 'string' },
              capabilities: { type: 'array', items: { type: 'string' } },
            },
          },
          agent_readiness: {
            type: 'object',
            properties: {
              score: { type: 'number' },
              tier: { type: 'string' },
              audited_at: { type: 'string', format: 'date-time' },
            },
          },
          a2a_agent_card: { type: 'object' },
          mcp_endpoints: { type: 'array', items: { type: 'string' } },
          services: {
            type: 'array',
            items: { $ref: '#/components/schemas/Service' },
          },
          payment: {
            type: 'object',
            properties: {
              accepts_agent_payments: { type: 'boolean' },
              wallet_status: { type: 'string' },
            },
          },
        },
      },
      Service: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          pricing_model: {
            type: 'string',
            enum: ['per_call', 'monthly', 'per_unit', 'custom'],
          },
          price_per_call: { type: 'number' },
          endpoint: { type: 'string' },
          auth_type: { type: 'string', enum: ['api_key', 'oauth', 'jwt', 'none'] },
          uptime_pct: { type: 'number' },
          avg_response_ms: { type: 'number' },
        },
      },
    },
  },
  tags: [
    { name: 'Audit', description: 'Agent Readiness Score auditing' },
    { name: 'Discovery', description: 'Find agent-ready businesses' },
    { name: 'Business', description: 'Business profiles and manifests' },
    { name: 'Wallet', description: 'Agent wallet operations' },
    { name: 'MCP', description: 'Model Context Protocol server' },
    { name: 'Remediation', description: 'Auto-fix tools for agent readiness' },
  ],
}

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=3600',
}

export async function GET() {
  return NextResponse.json(openApiSpec, { headers: corsHeaders })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}
