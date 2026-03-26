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
  tags: [
    { name: 'Scanning & Scoring', description: '9-dimension agent readiness scanning and legacy 5-category auditing' },
    { name: 'Discovery', description: 'Find and search agent-ready businesses' },
    { name: 'Business', description: 'Business registration, profiles, services, API keys, and Stripe Connect' },
    { name: 'Trust & Certification', description: 'Trust scores, certifications, benchmarks, and comparison' },
    { name: 'Hermes JSON', description: 'Generate and verify .well-known/agent-hermes.json identity files' },
    { name: 'Health & Monitoring', description: 'Service health checks, monitoring cycles, and mystery shopping' },
    { name: 'Wallet', description: 'Agent wallet balances, funding, transfers, and transaction history' },
    { name: 'Analytics & Reporting', description: 'Business analytics and State of Agent Readiness reports' },
    { name: 'Webhooks', description: 'Subscribe to platform events' },
    { name: 'Remediation', description: 'Auto-generate llms.txt, agent cards, Schema.org markup, MCP proxies, and OpenAPI-to-MCP converters' },
    { name: 'MCP', description: 'Model Context Protocol JSON-RPC 2.0 server and SSE transport' },
    { name: 'Badge', description: 'SVG badge images and embeddable HTML widgets by domain' },
  ],

  // =========================================================================
  // PATHS
  // =========================================================================
  paths: {
    // -----------------------------------------------------------------------
    // Scanning & Scoring
    // -----------------------------------------------------------------------
    '/api/v1/scan': {
      post: {
        summary: 'Run 9-Dimension Agent Readiness Scan',
        description: 'Submit a URL for the full 9-dimension scan. Returns per-dimension breakdowns, cap rules, and prioritized recommendations. Replaces the legacy 5-category audit.',
        operationId: 'runScan',
        tags: ['Scanning & Scoring'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['url'],
                properties: {
                  url: { type: 'string', description: 'Domain or URL to scan', example: 'https://example.com' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Scan scorecard with 9 dimensions',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ScanResult' } } },
          },
          '400': { description: 'Invalid or missing URL', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '429': { description: 'Rate limit exceeded (5 per minute)' },
          '500': { description: 'Internal server error' },
        },
      },
    },
    '/api/v1/scan/batch': {
      post: {
        summary: 'Batch Domain Scan',
        description: 'Scan multiple domains at once. Domains scanned within 24h return cached results. Batches of 5 or fewer are scanned synchronously; larger batches are queued. Max 100 domains per request.',
        operationId: 'batchScan',
        tags: ['Scanning & Scoring'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['domains'],
                properties: {
                  domains: { type: 'array', items: { type: 'string' }, maxItems: 100, description: 'Array of domain strings' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Batch scan results',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    results: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          domain: { type: 'string' },
                          score: { type: 'number', nullable: true },
                          tier: { type: 'string' },
                          hermes_id: { type: 'string', nullable: true },
                          status: { type: 'string', enum: ['cached', 'scanned', 'queued', 'error'] },
                          error: { type: 'string' },
                        },
                      },
                    },
                    summary: {
                      type: 'object',
                      properties: {
                        total_requested: { type: 'integer' },
                        cached: { type: 'integer' },
                        scanned: { type: 'integer' },
                        queued: { type: 'integer' },
                        errors: { type: 'integer' },
                      },
                    },
                    invalid_domains: { type: 'array', items: { type: 'object', properties: { domain: { type: 'string' }, reason: { type: 'string' } } } },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid input or no valid domains' },
          '401': { description: 'Unauthorized' },
          '429': { description: 'Rate limit exceeded (1 per minute)' },
        },
      },
    },
    '/api/v1/score/{domain}': {
      get: {
        summary: 'Get Score by Domain',
        description: 'Look up the agent readiness score for a domain. Returns score, tier, category breakdown, and badge/profile URLs. Returns unaudited status if not yet scanned.',
        operationId: 'getScoreByDomain',
        tags: ['Scanning & Scoring'],
        parameters: [
          { name: 'domain', in: 'path', required: true, schema: { type: 'string' }, description: 'Domain name (e.g. example.com)' },
        ],
        responses: {
          '200': {
            description: 'Score result',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    domain: { type: 'string' },
                    score: { type: 'number', nullable: true },
                    tier: { type: 'string' },
                    tier_label: { type: 'string' },
                    last_audited: { type: 'string', format: 'date-time', nullable: true },
                    categories: { type: 'object', additionalProperties: { type: 'object', properties: { score: { type: 'number' }, max: { type: 'number' }, status: { type: 'string' } } } },
                    profile_url: { type: 'string' },
                    badge_url: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid domain format' },
        },
      },
    },
    '/api/v1/audit': {
      post: {
        summary: 'Run Legacy 5-Category Audit',
        description: 'Submit a URL to scan and receive an Agent Readiness Score (0-100) across the original 5 categories. Use /api/v1/scan for the newer 9-dimension version.',
        operationId: 'runAudit',
        tags: ['Scanning & Scoring'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['url'],
                properties: {
                  url: { type: 'string', description: 'The domain or URL to audit', example: 'https://example.com' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Audit scorecard', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuditScorecard' } } } },
          '400': { description: 'Invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '429': { description: 'Rate limit exceeded (5 per minute)' },
        },
      },
    },
    '/api/v1/audit/{id}': {
      get: {
        summary: 'Get Audit Results by Business ID',
        description: 'Retrieve the latest audit scorecard for a business by its UUID.',
        operationId: 'getAuditById',
        tags: ['Scanning & Scoring'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' }, description: 'Business ID' },
        ],
        responses: {
          '200': { description: 'Audit scorecard', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuditScorecard' } } } },
          '404': { description: 'Business not found' },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Discovery
    // -----------------------------------------------------------------------
    '/api/v1/discover': {
      get: {
        summary: 'Discover Agent-Ready Businesses',
        description: 'Search and filter businesses by capability, vertical, tier, score, or price. Returns full profiles with services and audit results.',
        operationId: 'discoverBusinesses',
        tags: ['Discovery'],
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' }, description: 'Free-text search query' },
          { name: 'vertical', in: 'query', schema: { type: 'string' }, description: 'Filter by business vertical' },
          { name: 'capability', in: 'query', schema: { type: 'string' }, description: 'Filter by capability' },
          { name: 'min_score', in: 'query', schema: { type: 'number', minimum: 0, maximum: 100 }, description: 'Minimum audit score' },
          { name: 'tier', in: 'query', schema: { type: 'string', enum: ['bronze', 'silver', 'gold', 'platinum'] }, description: 'Minimum tier' },
          { name: 'mcp_compatible', in: 'query', schema: { type: 'boolean' }, description: 'Only show businesses with MCP endpoints' },
          { name: 'max_price', in: 'query', schema: { type: 'number' }, description: 'Maximum price per API call in USD' },
          { name: 'sort', in: 'query', schema: { type: 'string', enum: ['audit_score', 'trust_score', 'name'], default: 'audit_score' } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } },
          { name: 'offset', in: 'query', schema: { type: 'integer', default: 0 } },
        ],
        responses: {
          '200': {
            description: 'List of businesses',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    businesses: { type: 'array', items: { $ref: '#/components/schemas/BusinessSummary' } },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/discover/semantic': {
      get: {
        summary: 'Semantic Business Search',
        description: 'Vector similarity search across businesses using embeddings. Falls back to full-text + ILIKE search if embeddings are not populated.',
        operationId: 'semanticSearch',
        tags: ['Discovery'],
        parameters: [
          { name: 'q', in: 'query', required: true, schema: { type: 'string' }, description: 'Natural language search query' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } },
          { name: 'threshold', in: 'query', schema: { type: 'number', minimum: 0, maximum: 1, default: 0.3 }, description: 'Similarity threshold' },
        ],
        responses: {
          '200': {
            description: 'Search results with relevance scores',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    businesses: { type: 'array', items: { $ref: '#/components/schemas/BusinessSummary' } },
                    search_type: { type: 'string', enum: ['semantic', 'fulltext_ranked', 'fallback_ilike'] },
                    query: { type: 'string' },
                    result_count: { type: 'integer' },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing query parameter' },
        },
      },
    },
    '/api/v1/discover/services': {
      get: {
        summary: 'Search Services Across All Businesses',
        description: 'Search across all registered services (not just per-business). Returns services with parent business info.',
        operationId: 'discoverServices',
        tags: ['Discovery'],
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' }, description: 'Text search on service name/description' },
          { name: 'vertical', in: 'query', schema: { type: 'string' }, description: 'Filter by parent business vertical' },
          { name: 'max_price', in: 'query', schema: { type: 'number' }, description: 'Max price_per_call' },
          { name: 'pricing_model', in: 'query', schema: { type: 'string', enum: ['per_call', 'monthly', 'per_unit', 'custom'] } },
          { name: 'auth_type', in: 'query', schema: { type: 'string', enum: ['api_key', 'oauth', 'jwt', 'none'] } },
          { name: 'min_uptime', in: 'query', schema: { type: 'number', minimum: 0, maximum: 100 }, description: 'Minimum uptime percentage' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } },
          { name: 'offset', in: 'query', schema: { type: 'integer', default: 0 } },
        ],
        responses: {
          '200': {
            description: 'List of services with parent business info',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    services: { type: 'array', items: { $ref: '#/components/schemas/ServiceWithBusiness' } },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/leaderboard': {
      get: {
        summary: 'Agent Readiness Leaderboard',
        description: 'Ranked list of scored businesses by audit score. Filterable by vertical. Includes available filter options.',
        operationId: 'getLeaderboard',
        tags: ['Discovery'],
        parameters: [
          { name: 'vertical', in: 'query', schema: { type: 'string' }, description: 'Filter by vertical' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 50, maximum: 100 } },
          { name: 'offset', in: 'query', schema: { type: 'integer', default: 0 } },
        ],
        responses: {
          '200': {
            description: 'Ranked leaderboard',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    leaderboard: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          rank: { type: 'integer' },
                          id: { type: 'string', format: 'uuid' },
                          name: { type: 'string' },
                          slug: { type: 'string' },
                          domain: { type: 'string' },
                          score: { type: 'number' },
                          tier: { type: 'string' },
                          trust_score: { type: 'number' },
                          vertical: { type: 'string' },
                          capabilities: { type: 'array', items: { type: 'string' } },
                          has_mcp: { type: 'boolean' },
                          profile_url: { type: 'string' },
                        },
                      },
                    },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                    filters: {
                      type: 'object',
                      properties: {
                        verticals: { type: 'array', items: { type: 'string' } },
                        current_vertical: { type: 'string', nullable: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Business
    // -----------------------------------------------------------------------
    '/api/v1/business': {
      post: {
        summary: 'Register a New Business',
        description: 'Create a new business profile. Auto-generates a slug from the name. Domain and owner_email are optional.',
        operationId: 'registerBusiness',
        tags: ['Business'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string', maxLength: 200 },
                  domain: { type: 'string', description: 'Domain name (e.g. example.com)' },
                  description: { type: 'string' },
                  owner_email: { type: 'string', format: 'email' },
                  vertical: { type: 'string' },
                  capabilities: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Business created', content: { 'application/json': { schema: { $ref: '#/components/schemas/BusinessProfile' } } } },
          '400': { description: 'Invalid input' },
          '409': { description: 'Business with this slug already exists' },
        },
      },
    },
    '/api/v1/business/{slug}': {
      get: {
        summary: 'Get Business Profile',
        description: 'Retrieve full business profile including services, audit results, connection count, and transaction volume.',
        operationId: 'getBusinessProfile',
        tags: ['Business'],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string', pattern: '^[a-z0-9-]{1,100}$' }, description: 'Business slug' },
        ],
        responses: {
          '200': { description: 'Business profile', content: { 'application/json': { schema: { $ref: '#/components/schemas/BusinessProfile' } } } },
          '404': { description: 'Business not found' },
        },
      },
      patch: {
        summary: 'Update Business Profile',
        description: 'Update one or more fields on a business profile. Only provided fields are updated.',
        operationId: 'updateBusinessProfile',
        tags: ['Business'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string', pattern: '^[a-z0-9-]{1,100}$' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', maxLength: 200 },
                  description: { type: 'string', nullable: true },
                  domain: { type: 'string', nullable: true },
                  vertical: { type: 'string', nullable: true },
                  capabilities: { type: 'array', items: { type: 'string' } },
                  logo_url: { type: 'string', nullable: true },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated business', content: { 'application/json': { schema: { $ref: '#/components/schemas/BusinessProfile' } } } },
          '400': { description: 'Invalid input or no valid fields' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/business/{slug}/manifest': {
      get: {
        summary: 'Get Business Manifest',
        description: 'Machine-readable business manifest with services, pricing, auth, and readiness data.',
        operationId: 'getBusinessManifest',
        tags: ['Business'],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string', pattern: '^[a-z0-9-]{1,100}$' } },
        ],
        responses: {
          '200': { description: 'Business manifest', content: { 'application/json': { schema: { $ref: '#/components/schemas/BusinessManifest' } } } },
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
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': {
            description: 'List of services',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { services: { type: 'array', items: { $ref: '#/components/schemas/Service' } } } },
              },
            },
          },
        },
      },
    },
    '/api/v1/business/{slug}/api-keys': {
      post: {
        summary: 'Generate API Key',
        description: 'Generate a new API key for a business. Returns the full key exactly once.',
        operationId: 'createApiKey',
        tags: ['Business'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', maxLength: 100, description: 'Key label (default: "default")' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'API key created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    business_id: { type: 'string', format: 'uuid' },
                    key_prefix: { type: 'string' },
                    name: { type: 'string' },
                    created_at: { type: 'string', format: 'date-time' },
                    key: { type: 'string', description: 'Full API key (only shown once)' },
                    warning: { type: 'string' },
                  },
                },
              },
            },
          },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Business not found' },
        },
      },
      get: {
        summary: 'List API Keys',
        description: 'List all API keys for a business (prefix and metadata only, not the full key).',
        operationId: 'listApiKeys',
        tags: ['Business'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': {
            description: 'List of API keys',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    api_keys: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', format: 'uuid' },
                          key_prefix: { type: 'string' },
                          name: { type: 'string' },
                          created_at: { type: 'string', format: 'date-time' },
                          last_used_at: { type: 'string', format: 'date-time', nullable: true },
                          revoked: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Business not found' },
        },
      },
      delete: {
        summary: 'Revoke API Key',
        description: 'Revoke an API key by its ID.',
        operationId: 'revokeApiKey',
        tags: ['Business'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['key_id'],
                properties: {
                  key_id: { type: 'string', format: 'uuid' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'API key revoked' },
          '400': { description: 'Missing key_id or key already revoked' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Key does not belong to this business' },
          '404': { description: 'Business or key not found' },
        },
      },
    },
    '/api/v1/business/{slug}/connect': {
      post: {
        summary: 'Create Stripe Connect Account',
        description: 'Create a Stripe Connect account for a business and return the onboarding link. If an account already exists, generates a new onboarding link.',
        operationId: 'createStripeConnect',
        tags: ['Business'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string', pattern: '^[a-z0-9-]{1,100}$' } },
        ],
        responses: {
          '201': {
            description: 'Connect account created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    connect_account_id: { type: 'string' },
                    onboarding_url: { type: 'string' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          '200': { description: 'Existing Connect account, new onboarding link' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Business not found' },
          '503': { description: 'Stripe not configured' },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Trust & Certification
    // -----------------------------------------------------------------------
    '/api/v1/trust-score/{slug}': {
      get: {
        summary: 'Compute Trust Score',
        description: 'Compute and return the trust score for a business. Also updates the stored trust_score. Includes a breakdown of contributing factors.',
        operationId: 'getTrustScore',
        tags: ['Trust & Certification'],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string', pattern: '^[a-z0-9-]{1,100}$' } },
        ],
        responses: {
          '200': {
            description: 'Trust score with breakdown',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    business_id: { type: 'string', format: 'uuid' },
                    slug: { type: 'string' },
                    name: { type: 'string' },
                    trust_score: { type: 'number' },
                    breakdown: { type: 'object' },
                    computed_at: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/certify': {
      post: {
        summary: 'Apply for Certification',
        description: 'Apply for Gold or Platinum certification. Runs a fresh scan if the business has a domain. Requires a minimum score of 75.',
        operationId: 'applyCertification',
        tags: ['Trust & Certification'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  slug: { type: 'string', description: 'Business slug (provide slug or business_id)' },
                  business_id: { type: 'string', format: 'uuid', description: 'Business ID (provide slug or business_id)' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Certification granted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    certification: { $ref: '#/components/schemas/Certification' },
                    badge_url: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': { description: 'Score too low for certification or missing identifier' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Business not found' },
        },
      },
      get: {
        summary: 'Check Certification Status',
        description: 'Check whether a business is certified and view certification details.',
        operationId: 'getCertification',
        tags: ['Trust & Certification'],
        parameters: [
          { name: 'slug', in: 'query', schema: { type: 'string' }, description: 'Business slug (provide slug or business_id)' },
          { name: 'business_id', in: 'query', schema: { type: 'string', format: 'uuid' }, description: 'Business ID' },
        ],
        responses: {
          '200': {
            description: 'Certification status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    certified: { type: 'boolean' },
                    certification: { $ref: '#/components/schemas/Certification' },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing slug or business_id' },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/certify/badge/{slug}': {
      get: {
        summary: 'Certification Badge SVG',
        description: 'Returns an SVG certification badge for a business. Shows Certified (Gold/Platinum) with score and expiry, or Not Certified.',
        operationId: 'getCertificationBadge',
        tags: ['Trust & Certification'],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'SVG badge image', content: { 'image/svg+xml': { schema: { type: 'string' } } } },
        },
      },
    },
    '/api/v1/benchmarks': {
      get: {
        summary: 'Industry Benchmarks',
        description: 'Get aggregate statistics: average/median scores, tier distribution, top businesses, and category averages. Optionally filter by vertical.',
        operationId: 'getBenchmarks',
        tags: ['Trust & Certification'],
        parameters: [
          { name: 'vertical', in: 'query', schema: { type: 'string' }, description: 'Filter by vertical' },
        ],
        responses: {
          '200': {
            description: 'Benchmark statistics',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    vertical: { type: 'string' },
                    total_businesses: { type: 'integer' },
                    avg_score: { type: 'number' },
                    median_score: { type: 'number' },
                    top_quartile_score: { type: 'number' },
                    tier_distribution: { type: 'object', properties: { platinum: { type: 'integer' }, gold: { type: 'integer' }, silver: { type: 'integer' }, bronze: { type: 'integer' }, unaudited: { type: 'integer' } } },
                    top_businesses: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, slug: { type: 'string' }, score: { type: 'number' } } } },
                    category_averages: { type: 'object', additionalProperties: { type: 'number' } },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/benchmarks/compare': {
      get: {
        summary: 'Compare Business Against Peers',
        description: 'Compare a specific business against its vertical peers. Returns percentile rank, category comparison, strengths, and weaknesses.',
        operationId: 'compareBenchmarks',
        tags: ['Trust & Certification'],
        parameters: [
          { name: 'slug', in: 'query', required: true, schema: { type: 'string' }, description: 'Business slug to compare' },
        ],
        responses: {
          '200': {
            description: 'Comparison results',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    business: { type: 'object', properties: { name: { type: 'string' }, slug: { type: 'string' }, score: { type: 'number' }, tier: { type: 'string' } } },
                    vertical: { type: 'string' },
                    comparison: {
                      type: 'object',
                      properties: {
                        your_score: { type: 'number' },
                        avg_peer_score: { type: 'number' },
                        percentile_rank: { type: 'number' },
                        total_peers: { type: 'integer' },
                        score_vs_avg: { type: 'number' },
                      },
                    },
                    category_comparison: { type: 'object', additionalProperties: { type: 'object', properties: { your_score: { type: 'number' }, peer_avg: { type: 'number' }, max: { type: 'number' } } } },
                    strengths: { type: 'array', items: { type: 'string' } },
                    weaknesses: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing slug' },
          '404': { description: 'Business not found' },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Hermes JSON
    // -----------------------------------------------------------------------
    '/api/v1/hermes-json': {
      post: {
        summary: 'Generate agent-hermes.json',
        description: 'Generate a signed .well-known/agent-hermes.json file for a business. Includes Hermes ID, score, tier, 9 dimensions, certification status, and HMAC signature.',
        operationId: 'generateHermesJson',
        tags: ['Hermes JSON'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  domain: { type: 'string', description: 'Business domain (provide domain or slug)' },
                  slug: { type: 'string', description: 'Business slug (provide domain or slug)' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Generated hermes.json with deployment instructions',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    hermes_json: { type: 'object' },
                    instructions: { type: 'object' },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing domain or slug' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/hermes-json/verify': {
      post: {
        summary: 'Verify agent-hermes.json',
        description: 'Verify a .well-known/agent-hermes.json file. Can fetch from a domain or verify a provided JSON object. Checks signature, score match, and certification expiry.',
        operationId: 'verifyHermesJson',
        tags: ['Hermes JSON'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  domain: { type: 'string', description: 'Domain to fetch .well-known/agent-hermes.json from' },
                  hermes_json: { type: 'object', description: 'The hermes JSON content to verify directly' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Verification result',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    valid: { type: 'boolean' },
                    reason: { type: 'string' },
                    domain: { type: 'string' },
                    score: { type: 'number' },
                    tier: { type: 'string' },
                    signature_verified: { type: 'boolean' },
                    score_matches_db: { type: 'boolean' },
                    certification_current: { type: 'boolean', nullable: true },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing domain or hermes_json' },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Health & Monitoring
    // -----------------------------------------------------------------------
    '/api/v1/health/check': {
      post: {
        summary: 'Trigger Health Check',
        description: 'Perform a health check on a service endpoint via HTTP HEAD (fallback GET). Records response time and status. Updates service rolling avg_response_ms and uptime_pct.',
        operationId: 'runHealthCheck',
        tags: ['Health & Monitoring'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  service_id: { type: 'string', format: 'uuid', description: 'Service UUID (fetches endpoint_url from DB)' },
                  url: { type: 'string', description: 'Direct URL to check (no DB lookup)' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Health check result',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    check: {
                      type: 'object',
                      properties: {
                        service_id: { type: 'string', format: 'uuid', nullable: true },
                        status: { type: 'string', enum: ['healthy', 'degraded', 'down'] },
                        response_ms: { type: 'number' },
                        status_code: { type: 'integer' },
                      },
                    },
                    url: { type: 'string' },
                    checked_at: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing service_id and url, or invalid URL' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Service not found' },
          '429': { description: 'Rate limit exceeded (10 per minute)' },
        },
      },
    },
    '/api/v1/health/status': {
      get: {
        summary: 'Get Service Health Status',
        description: 'Get health status for all of a business\'s services, including latest health check, avg response time, and uptime percentage.',
        operationId: 'getHealthStatus',
        tags: ['Health & Monitoring'],
        parameters: [
          { name: 'business_id', in: 'query', schema: { type: 'string', format: 'uuid' }, description: 'Business UUID' },
          { name: 'slug', in: 'query', schema: { type: 'string' }, description: 'Business slug (alternative to business_id)' },
        ],
        responses: {
          '200': {
            description: 'Service health status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    business_id: { type: 'string', format: 'uuid' },
                    services: { type: 'array', items: { type: 'object' } },
                    summary: {
                      type: 'object',
                      properties: {
                        total_services: { type: 'integer' },
                        healthy: { type: 'integer' },
                        degraded: { type: 'integer' },
                        down: { type: 'integer' },
                        unknown: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing business_id and slug' },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/monitoring': {
      post: {
        summary: 'Trigger Monitoring Cycle',
        description: 'Trigger a full monitoring cycle that re-scans businesses not checked in 24+ hours. Rate limited to 1 per 5 minutes. Can take up to 5 minutes.',
        operationId: 'triggerMonitoringCycle',
        tags: ['Health & Monitoring'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Monitoring cycle completed', content: { 'application/json': { schema: { type: 'object', properties: { status: { type: 'string' } } } } } },
          '401': { description: 'Unauthorized' },
          '429': { description: 'Rate limit exceeded (1 per 5 minutes)' },
        },
      },
      get: {
        summary: 'List Monitoring Events',
        description: 'Get monitoring events, filterable by business_id, severity, and event_type.',
        operationId: 'getMonitoringEvents',
        tags: ['Health & Monitoring'],
        parameters: [
          { name: 'business_id', in: 'query', schema: { type: 'string', format: 'uuid' } },
          { name: 'severity', in: 'query', schema: { type: 'string', enum: ['info', 'warning', 'error'] } },
          { name: 'event_type', in: 'query', schema: { type: 'string', enum: ['score_change', 'tier_change', 'certification_risk', 'scan_failure'] } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 50, maximum: 100 } },
          { name: 'offset', in: 'query', schema: { type: 'integer', default: 0 } },
        ],
        responses: {
          '200': {
            description: 'List of monitoring events',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    events: { type: 'array', items: { type: 'object' } },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/monitoring/events': {
      get: {
        summary: 'List Monitoring Events (Dedicated)',
        description: 'Dedicated endpoint for listing monitoring events with filters. Same functionality as GET /api/v1/monitoring but includes current filter values in the response.',
        operationId: 'listMonitoringEvents',
        tags: ['Health & Monitoring'],
        parameters: [
          { name: 'business_id', in: 'query', schema: { type: 'string', format: 'uuid' } },
          { name: 'severity', in: 'query', schema: { type: 'string', enum: ['info', 'warning', 'error'] } },
          { name: 'event_type', in: 'query', schema: { type: 'string', enum: ['score_change', 'tier_change', 'certification_risk', 'scan_failure'] } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 50, maximum: 100 } },
          { name: 'offset', in: 'query', schema: { type: 'integer', default: 0 } },
        ],
        responses: {
          '200': {
            description: 'Monitoring events with filter metadata',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    events: { type: 'array', items: { type: 'object' } },
                    filters: { type: 'object', properties: { business_id: { type: 'string', nullable: true }, severity: { type: 'string', nullable: true }, event_type: { type: 'string', nullable: true } } },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/mystery-shop': {
      post: {
        summary: 'Trigger Mystery Shop',
        description: 'Run a mystery shop test for a business, simulating an AI agent interaction and evaluating the experience.',
        operationId: 'runMysteryShop',
        tags: ['Health & Monitoring'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  business_id: { type: 'string', format: 'uuid', description: 'Business ID (provide business_id or slug)' },
                  slug: { type: 'string', description: 'Business slug (provide business_id or slug)' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Mystery shop results' },
          '400': { description: 'Missing business_id/slug or invalid format' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Business not found' },
          '429': { description: 'Rate limit exceeded (3 per minute)' },
        },
      },
      get: {
        summary: 'Get Mystery Shop History',
        description: 'Get paginated mystery shop history for a business.',
        operationId: 'getMysteryShopHistory',
        tags: ['Health & Monitoring'],
        parameters: [
          { name: 'business_id', in: 'query', schema: { type: 'string', format: 'uuid' }, description: 'Business ID' },
          { name: 'slug', in: 'query', schema: { type: 'string' }, description: 'Business slug' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 50, maximum: 100 } },
          { name: 'offset', in: 'query', schema: { type: 'integer', default: 0 } },
        ],
        responses: {
          '200': {
            description: 'Mystery shop history',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    business_id: { type: 'string', format: 'uuid' },
                    results: { type: 'array', items: { type: 'object' } },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing business_id/slug' },
          '404': { description: 'Business not found' },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Wallet
    // -----------------------------------------------------------------------
    '/api/v1/wallet': {
      get: {
        summary: 'Get Wallet Balance',
        description: 'Returns the wallet for a given business, including balance, auto-reload settings, and status.',
        operationId: 'getWallet',
        tags: ['Wallet'],
        parameters: [
          { name: 'business_id', in: 'query', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        responses: {
          '200': {
            description: 'Wallet details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    business_id: { type: 'string', format: 'uuid' },
                    balance: { type: 'number' },
                    auto_reload_threshold: { type: 'number', nullable: true },
                    auto_reload_amount: { type: 'number', nullable: true },
                    status: { type: 'string' },
                    created_at: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing business_id' },
          '404': { description: 'No wallet found' },
        },
      },
    },
    '/api/v1/wallet/fund': {
      post: {
        summary: 'Fund Business Wallet',
        description: 'Add funds to a business wallet. Operates in ledger-only mode (direct balance addition). Requires authentication.',
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
                  amount: { type: 'number', minimum: 0.01, maximum: 10000, description: 'Amount in USD' },
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
        description: 'Transfer funds between two business wallets. Requires authentication.',
        operationId: 'transferFunds',
        tags: ['Wallet'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['from_business_id', 'to_business_id', 'amount', 'service_description'],
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
    '/api/v1/wallet/transactions': {
      get: {
        summary: 'List Wallet Transactions',
        description: 'Returns paginated transactions where the business is buyer or seller. Enriched with business names and direction (incoming/outgoing).',
        operationId: 'listTransactions',
        tags: ['Wallet'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'business_id', in: 'query', required: true, schema: { type: 'string', format: 'uuid' } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } },
          { name: 'offset', in: 'query', schema: { type: 'integer', default: 0 } },
        ],
        responses: {
          '200': {
            description: 'Paginated transaction list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    transactions: { type: 'array', items: { type: 'object' } },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing business_id' },
          '401': { description: 'Unauthorized' },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Analytics & Reporting
    // -----------------------------------------------------------------------
    '/api/v1/analytics': {
      get: {
        summary: 'Business Analytics',
        description: 'Get analytics for a business: views, searches, transactions, score checks, manifest views, time-series data, top search queries, and top agents.',
        operationId: 'getAnalytics',
        tags: ['Analytics & Reporting'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'business_id', in: 'query', required: true, schema: { type: 'string', format: 'uuid' } },
          { name: 'period', in: 'query', schema: { type: 'string', enum: ['7d', '30d', '90d'], default: '30d' } },
          { name: 'group_by', in: 'query', schema: { type: 'string', enum: ['day', 'week'], default: 'day' } },
        ],
        responses: {
          '200': {
            description: 'Analytics data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    business_id: { type: 'string', format: 'uuid' },
                    period: { type: 'string' },
                    group_by: { type: 'string' },
                    total_views: { type: 'integer' },
                    total_searches: { type: 'integer' },
                    total_transactions: { type: 'integer' },
                    total_score_checks: { type: 'integer' },
                    total_manifest_views: { type: 'integer' },
                    views_by_day: { type: 'array', items: { type: 'object', properties: { date: { type: 'string' }, count: { type: 'integer' } } } },
                    top_search_queries: { type: 'array', items: { type: 'object', properties: { query: { type: 'string' }, count: { type: 'integer' } } } },
                    top_agents: { type: 'array', items: { type: 'object', properties: { agent_id: { type: 'string' }, count: { type: 'integer' } } } },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing or invalid business_id' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Business not found' },
        },
      },
    },
    '/api/v1/report': {
      get: {
        summary: 'State of Agent Readiness Report',
        description: 'Comprehensive report with aggregate stats: total businesses, avg/median scores, tier distribution, dimension averages, industry breakdown, top 10, 30-day trends, and key findings. All data is computed dynamically from the database.',
        operationId: 'getReport',
        tags: ['Analytics & Reporting'],
        responses: {
          '200': {
            description: 'State of Agent Readiness report',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    report_title: { type: 'string' },
                    generated_at: { type: 'string', format: 'date-time' },
                    summary: {
                      type: 'object',
                      properties: {
                        total_businesses_scanned: { type: 'integer' },
                        avg_score: { type: 'number' },
                        median_score: { type: 'number' },
                        businesses_by_tier: { type: 'object' },
                        top_dimension: { type: 'string' },
                        weakest_dimension: { type: 'string' },
                      },
                    },
                    dimension_averages: { type: 'object', additionalProperties: { type: 'number' } },
                    industry_breakdown: { type: 'array', items: { type: 'object', properties: { vertical: { type: 'string' }, count: { type: 'integer' }, avg_score: { type: 'number' } } } },
                    top_10_businesses: { type: 'array', items: { type: 'object', properties: { rank: { type: 'integer' }, name: { type: 'string' }, domain: { type: 'string', nullable: true }, score: { type: 'number' }, tier: { type: 'string' }, vertical: { type: 'string', nullable: true } } } },
                    trends: { type: 'object', properties: { new_businesses_30d: { type: 'integer' }, avg_score_change_30d: { type: 'number' }, certifications_issued: { type: 'integer' } } },
                    key_findings: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
          },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Webhooks
    // -----------------------------------------------------------------------
    '/api/v1/webhooks/subscribe': {
      post: {
        summary: 'Subscribe to Webhook Events',
        description: 'Create a webhook subscription. An HMAC secret is auto-generated if not provided. Events: new_business, score_change, tier_promotion, new_service.',
        operationId: 'subscribeWebhook',
        tags: ['Webhooks'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['url'],
                properties: {
                  url: { type: 'string', description: 'Endpoint URL to receive POST callbacks' },
                  event_type: { type: 'string', enum: ['new_business', 'score_change', 'tier_promotion', 'new_service'], default: 'new_business' },
                  filters: { type: 'object', description: 'Optional filters (e.g. { vertical: "healthcare", min_score: 75 })' },
                  secret: { type: 'string', description: 'Optional HMAC secret. Auto-generated if omitted.' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Subscription created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    subscription: { type: 'object' },
                    secret: { type: 'string', description: 'HMAC secret for signature verification' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid URL or event_type' },
          '401': { description: 'Unauthorized' },
        },
      },
      get: {
        summary: 'List Webhook Subscriptions',
        description: 'List all active webhook subscriptions.',
        operationId: 'listWebhooks',
        tags: ['Webhooks'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Active subscriptions',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    subscriptions: { type: 'array', items: { type: 'object' } },
                    count: { type: 'integer' },
                  },
                },
              },
            },
          },
          '401': { description: 'Unauthorized' },
        },
      },
      delete: {
        summary: 'Unsubscribe Webhook',
        description: 'Deactivate a webhook subscription by its ID.',
        operationId: 'unsubscribeWebhook',
        tags: ['Webhooks'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['id'],
                properties: {
                  id: { type: 'string', format: 'uuid' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Subscription deactivated' },
          '400': { description: 'Missing id' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Subscription not found' },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Remediation
    // -----------------------------------------------------------------------
    '/api/v1/remediate/llms-txt': {
      post: {
        summary: 'Generate llms.txt',
        description: 'Generate an llms.txt file for a business based on provided info and enriched from DB data if available.',
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
          '200': { description: 'Generated llms.txt content', content: { 'text/plain': { schema: { type: 'string' } } } },
          '400': { description: 'Invalid input' },
        },
      },
    },
    '/api/v1/remediate/agent-card': {
      post: {
        summary: 'Generate Agent Card',
        description: 'Generate an A2A Agent Card JSON file for a business.',
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
          '200': { description: 'Generated agent-card.json', content: { 'application/json': { schema: { type: 'object' } } } },
          '400': { description: 'Invalid input' },
        },
      },
    },
    '/api/v1/remediate/schema-org': {
      post: {
        summary: 'Generate Schema.org JSON-LD',
        description: 'Generate Schema.org structured data (JSON-LD) for a business. Supports SoftwareApplication, Organization, LocalBusiness, and Product types. Enriched with services and capabilities from DB.',
        operationId: 'generateSchemaOrg',
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
                  type: { type: 'string', enum: ['SoftwareApplication', 'Organization', 'LocalBusiness', 'Product'], default: 'Organization' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Generated JSON-LD', content: { 'application/ld+json': { schema: { type: 'object' } } } },
          '400': { description: 'Invalid input' },
        },
      },
    },
    '/api/v1/remediate/mcp-proxy': {
      post: {
        summary: 'Generate MCP Proxy Server',
        description: 'Generate a complete MCP server TypeScript file that proxies to existing REST API endpoints. Includes JSON-RPC 2.0 handler, tool definitions, and CORS.',
        operationId: 'generateMcpProxy',
        tags: ['Remediation'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['domain', 'name', 'api_base', 'endpoints'],
                properties: {
                  domain: { type: 'string' },
                  name: { type: 'string' },
                  api_base: { type: 'string', description: 'Base URL of the REST API' },
                  endpoints: {
                    type: 'array',
                    items: {
                      type: 'object',
                      required: ['method', 'path', 'description'],
                      properties: {
                        method: { type: 'string' },
                        path: { type: 'string' },
                        description: { type: 'string' },
                        params: { type: 'array', items: { type: 'object' } },
                        body: { type: 'object' },
                      },
                    },
                  },
                  auth_type: { type: 'string', default: 'api_key' },
                  auth_header: { type: 'string', default: 'Authorization' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Generated MCP server TypeScript file', content: { 'text/plain': { schema: { type: 'string' } } } },
          '400': { description: 'Invalid input' },
        },
      },
    },
    '/api/v1/remediate/openapi-to-mcp': {
      post: {
        summary: 'Convert OpenAPI Spec to MCP Server',
        description: 'Convert an OpenAPI 3.0 specification into a complete MCP server TypeScript file. Extracts endpoints, parameters, and auth scheme from the spec.',
        operationId: 'openApiToMcp',
        tags: ['Remediation'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['spec'],
                properties: {
                  spec: { type: 'object', description: 'Full OpenAPI 3.0 spec object' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Generated MCP server TypeScript file', content: { 'text/plain': { schema: { type: 'string' } } } },
          '400': { description: 'Invalid spec or no valid operations found' },
        },
      },
    },

    // -----------------------------------------------------------------------
    // MCP
    // -----------------------------------------------------------------------
    '/api/mcp': {
      post: {
        summary: 'MCP Server (JSON-RPC 2.0)',
        description: 'Model Context Protocol server. Supports initialize, tools/list, tools/call, and ping methods. 6 tools: discover_businesses, get_business_profile, get_business_manifest, run_audit, check_wallet_balance, initiate_payment.',
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
                  id: { oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'null' }] },
                  method: { type: 'string', enum: ['initialize', 'notifications/initialized', 'ping', 'tools/list', 'tools/call'] },
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
    '/api/mcp/sse': {
      get: {
        summary: 'MCP SSE Transport',
        description: 'Opens a Server-Sent Events stream for MCP Streamable HTTP transport. Sends an initial endpoint event pointing to POST /api/mcp, then sends keep-alive pings every 30 seconds.',
        operationId: 'mcpSse',
        tags: ['MCP'],
        responses: {
          '200': { description: 'SSE stream', content: { 'text/event-stream': { schema: { type: 'string' } } } },
        },
      },
    },

    // -----------------------------------------------------------------------
    // Badge
    // -----------------------------------------------------------------------
    '/api/badge/{domain}': {
      get: {
        summary: 'Agent Readiness Badge SVG',
        description: 'Returns an SVG badge showing the agent readiness tier and score for a domain. Shows tier color, score, and certified status if applicable. Cacheable for 1 hour.',
        operationId: 'getBadge',
        tags: ['Badge'],
        parameters: [
          { name: 'domain', in: 'path', required: true, schema: { type: 'string' }, description: 'Domain name (e.g. example.com)' },
        ],
        responses: {
          '200': { description: 'SVG badge image', content: { 'image/svg+xml': { schema: { type: 'string' } } } },
          '400': { description: 'Invalid domain format' },
        },
      },
    },
    '/api/badge/{domain}/embed': {
      get: {
        summary: 'Embeddable Badge HTML Widget',
        description: 'Returns a self-contained HTML page suitable for embedding via iframe. Shows the SVG badge with a link to the audit page.',
        operationId: 'getBadgeEmbed',
        tags: ['Badge'],
        parameters: [
          { name: 'domain', in: 'path', required: true, schema: { type: 'string' }, description: 'Domain name (e.g. example.com)' },
        ],
        responses: {
          '200': { description: 'Embeddable HTML widget', content: { 'text/html': { schema: { type: 'string' } } } },
          '400': { description: 'Invalid domain format' },
        },
      },
    },
  },

  // =========================================================================
  // COMPONENTS
  // =========================================================================
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
      ScanResult: {
        type: 'object',
        properties: {
          total_score: { type: 'number', minimum: 0, maximum: 100 },
          tier: { type: 'string', enum: ['unaudited', 'bronze', 'silver', 'gold', 'platinum'] },
          dimensions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                dimension: { type: 'string', description: 'Dimension ID (D1-D9)' },
                label: { type: 'string' },
                score: { type: 'number' },
                weight: { type: 'number' },
                checks: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, passed: { type: 'boolean' }, details: { type: 'string' } } } },
                recommendations: { type: 'array', items: { type: 'object', properties: { action: { type: 'string' }, priority: { type: 'string' } } } },
              },
            },
          },
          business_id: { type: 'string', format: 'uuid' },
        },
      },
      AuditScorecard: {
        type: 'object',
        properties: {
          business_name: { type: 'string' },
          domain: { type: 'string' },
          total_score: { type: 'number', minimum: 0, maximum: 100 },
          tier: { type: 'string', enum: ['unaudited', 'bronze', 'silver', 'gold', 'platinum'] },
          categories: { type: 'array', items: { $ref: '#/components/schemas/CategoryResult' } },
          audited_at: { type: 'string', format: 'date-time' },
          next_steps: { type: 'array', items: { type: 'string' } },
          business_id: { type: 'string', format: 'uuid' },
        },
      },
      CategoryResult: {
        type: 'object',
        properties: {
          category: { type: 'string', enum: ['machine_readable_profile', 'mcp_api_endpoints', 'agent_native_onboarding', 'structured_pricing', 'agent_payment_acceptance'] },
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
          trust_score: { type: 'number' },
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
          audit_results: { type: 'array', items: { $ref: '#/components/schemas/CategoryResult' } },
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
          services: { type: 'array', items: { $ref: '#/components/schemas/Service' } },
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
          pricing_model: { type: 'string', enum: ['per_call', 'monthly', 'per_unit', 'custom'] },
          price_per_call: { type: 'number' },
          endpoint: { type: 'string' },
          auth_type: { type: 'string', enum: ['api_key', 'oauth', 'jwt', 'none'] },
          uptime_pct: { type: 'number' },
          avg_response_ms: { type: 'number' },
        },
      },
      ServiceWithBusiness: {
        allOf: [
          { $ref: '#/components/schemas/Service' },
          {
            type: 'object',
            properties: {
              business: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  slug: { type: 'string' },
                  audit_score: { type: 'number' },
                  tier: { type: 'string' },
                },
              },
            },
          },
        ],
      },
      Certification: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          business_id: { type: 'string', format: 'uuid' },
          business_name: { type: 'string' },
          slug: { type: 'string' },
          tier: { type: 'string', enum: ['gold', 'platinum'] },
          audit_score: { type: 'number' },
          certified_at: { type: 'string', format: 'date-time' },
          expires_at: { type: 'string', format: 'date-time' },
          auto_renew: { type: 'boolean' },
          status: { type: 'string' },
          days_remaining: { type: 'integer' },
          expired: { type: 'boolean' },
        },
      },
    },
  },
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
