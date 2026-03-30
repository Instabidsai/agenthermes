import { NextResponse } from 'next/server'

const llmsFullTxt = `# AgentHermes — Full Technical Reference
> The verified commerce network for the agent economy. Scores businesses 0-100 on AI agent readiness across 9 dimensions.

## Overview
AgentHermes is the industry-standard scoring platform for AI agent readiness. Like a FICO score for the agent economy, it evaluates how well a business can be discovered, used, and transacted with by AI agents. The platform provides scanning, scoring, certification, discovery, monitoring, remediation, gateway access, and wallet-based payments.

## Scoring Methodology

### 9-Dimension Agent Readiness Score (0-100)

#### 1. Discoverability (20% weight)
Evaluates whether AI agents can find and understand the business.
- Checks for: llms.txt, llms-full.txt, .well-known/agent-card.json, Schema.org JSON-LD, robots.txt AI directives, OpenGraph metadata, structured data, .well-known/agent-hermes.json
- Scoring: Each discoverable artifact adds points proportional to its importance
- Key signals: Machine-readable business descriptions, agent metadata files, semantic markup

#### Tier 1 — Service Foundation (60% of total score)

#### 2. API Quality (15% weight)
Evaluates whether AI agents can programmatically interact with the business.
- Checks for: REST API endpoints, JSON responses, CORS support, response times, HTTP status codes, MCP endpoints (bonus)
- Scoring: Multiple responding REST endpoints + JSON = highest. MCP is a bonus, not required.
- Key signals: API endpoint count, response structure, status code correctness

#### 6. Data Quality (10% weight)
Evaluates the quality and consistency of API responses.
- Checks for: Consistent JSON schemas, proper error formats, naming conventions, ISO 8601 dates, content-type headers
- Scoring: Consistent schemas + proper errors = highest. Auth-protected APIs (401/403 with structured JSON) score up to 70/100.
- Key signals: Schema validation pass rate, error message quality, response structure consistency

#### 7. Security (12% weight)
Evaluates security posture for agent interactions.
- Checks for: TLS/HTTPS, API key authentication, OAuth2/JWT, rate limiting, CORS configuration, security headers (CSP, HSTS, X-Frame-Options)
- Scoring: Full security stack = highest, missing TLS = automatic cap at 39
- Key signals: Certificate validity, auth mechanism strength, rate limit headers

#### 8. Reliability (13% weight)
Evaluates operational reliability.
- Checks for: Uptime, response times (p95), health check endpoints, status pages, SLA documentation, retry hints
- Scoring: Fast responses + health endpoints + status page = highest
- Key signals: Health endpoint presence, response latency, error rate

#### 9. Agent Experience (10% weight)
Evaluates the developer/agent experience quality.
- Checks for: Request tracing (X-Request-ID), structured error responses, SDKs, support pages, API versioning
- Scoring: Full developer experience = highest, missing basics = lower
- Key signals: Error structure quality, SDK availability, deprecation notices

#### Tier 2 — Accessibility (25% of total score)

#### 1. Discoverability (12% weight)
Evaluates whether AI agents can find and understand the business.
- Checks for: OpenAPI/Swagger specs, Schema.org JSON-LD, robots.txt, developer docs (subdomains), agent cards (bonus), llms.txt (bonus), MCP discovery (bonus)
- Scoring: OpenAPI spec + docs subdomain = highest. Agent-native features (agent cards, llms.txt) are bonuses.
- Key signals: OpenAPI presence, documentation depth, structured data

#### 3. Onboarding (8% weight)
Evaluates how easily an AI agent can get started.
- Checks for: Self-service signup, API key provisioning, sandbox/test mode, developer documentation, quickstart guides, SDKs
- Scoring: Automated key provisioning = highest, manual approval = lower
- Key signals: Time-to-first-API-call, documentation quality, test environments

#### 4. Pricing Transparency (5% weight)
Evaluates whether pricing is machine-readable and predictable.
- Checks for: Pricing pages, free tier availability, usage limits, machine-readable pricing API
- Scoring: Structured pricing data = highest, human-readable only = lower
- Key signals: Pricing page presence, clear rate limits, free tier

#### Tier 3 — Agent Commerce (15% of total score)

#### 5. Payment (8% weight)
Evaluates whether AI agents can initiate and complete payments.
- Checks for: Stripe Connect integration, wallet support, agent-initiated payment flows, invoicing APIs
- Scoring: Programmatic payment APIs = highest, Stripe detection = moderate
- Key signals: Payment endpoint presence, billing APIs

#### Agent-Native Bonus (7% weight)
Bonus points for adopting emerging agent-native protocols. Does NOT penalize for absence.
- Checks: Agent card, llms.txt, MCP discovery, AGENTS.md, MCP tools callable
- This is the FUTURE indicator — pushes good scores from Silver to Gold/Platinum

### Cap Rules
- No TLS/HTTPS: Maximum score capped at 39 (Failing tier)
- No callable API endpoints: Maximum score capped at 29 (Failing tier)

### Score Tiers
| Tier | Range | Meaning |
|------|-------|---------|
| Failing | 0-39 | Invisible to AI agents |
| Bronze | 40-59 | Partially discoverable |
| Silver | 60-74 | Agent-usable with friction |
| Gold | 75-89 | Fully agent-native |
| Platinum | 90-100 | Certified, battle-tested, zero-friction |

## Features

### Scanning & Scoring
- Instant 9-dimension scan of any URL
- Batch scanning for multiple domains
- Score history tracking over time
- Dimension-level breakdown with specific findings
- Remediation recommendations per dimension

### Discovery Network
- Searchable directory of scored businesses
- Semantic vector search by capability
- Filtering by vertical, tier, minimum score
- Industry leaderboards
- Vertical benchmarks and comparisons

### Certification & Trust
- Verified business certification
- Embeddable SVG trust badges
- Composite trust scores
- .well-known/agent-hermes.json signed identity files
- Badge embed snippets for websites

### Gateway — One API Key, Every Service
- Single API key access to all connected services
- MCP-native tool discovery and execution
- Wallet-based payment per API call
- Budget controls and spending limits
- Usage tracking and analytics

### Monitoring & Quality
- Automated endpoint health checks
- Mystery shopping (real agent transaction tests)
- Score change monitoring and alerts
- Webhook notifications for events

### Remediation Tools
- Auto-generate A2A agent cards
- Auto-generate llms.txt files
- Auto-generate Schema.org JSON-LD markup
- Convert OpenAPI specs to MCP tool definitions
- Generate MCP proxy configurations

### Wallet & Payments
- Business wallet system for agent transactions
- Wallet-to-wallet transfers
- Stripe Connect integration
- Transaction history and reporting

## API Reference

### Base URL
https://agenthermes.ai

### Authentication
Most read endpoints are public. Write operations require an API key passed as:
- Header: \`Authorization: Bearer <api_key>\`
- Or header: \`x-api-key: <api_key>\`

### Core Endpoints

#### Scanning
- \`POST /api/v1/scan\` — Full 9-dimension scan. Body: \`{"url": "example.com"}\`
- \`POST /api/v1/scan/batch\` — Batch scan. Body: \`{"domains": ["a.com", "b.com"]}\`. Auth required.
- \`GET /api/v1/score/{domain}\` — Quick score lookup.

#### Discovery
- \`GET /api/v1/discover?q=&vertical=&tier=&min_score=\` — Search businesses.
- \`GET /api/v1/discover/semantic?q=&limit=&threshold=\` — Semantic search.
- \`GET /api/v1/discover/services?q=&vertical=&max_price=&auth_type=&min_uptime=\` — Search services.
- \`GET /api/v1/leaderboard?vertical=&limit=&offset=\` — Leaderboard.

#### Business Management
- \`POST /api/v1/business\` — Register business. Body: \`{name, domain, description}\`.
- \`GET /api/v1/business/{slug}\` — Get profile.
- \`PATCH /api/v1/business/{slug}\` — Update profile. Auth required.
- \`GET /api/v1/business/{slug}/manifest\` — Machine-readable manifest.
- \`GET/POST/PATCH/DELETE /api/v1/business/{slug}/services\` — Service CRUD.

#### Trust & Certification
- \`POST /api/v1/certify\` — Certify business. Auth required.
- \`GET /api/v1/certify?slug=\` — Certification status.
- \`GET /api/v1/certify/badge/{slug}\` — SVG badge.
- \`GET /api/v1/trust-score/{slug}\` — Trust score breakdown.
- \`GET /api/badge/{domain}\` — Embeddable SVG score badge.

#### Hermes Identity
- \`POST /api/v1/hermes-json\` — Generate signed identity file. Auth required.
- \`POST /api/v1/hermes-json/verify\` — Verify identity signature.

#### Health & Monitoring
- \`POST /api/v1/health/check\` — Trigger health check. Auth required.
- \`GET /api/v1/health/status?slug=\` — Health status. Public.
- \`POST /api/v1/monitoring\` — Trigger monitoring cycle. Auth required.
- \`GET /api/v1/monitoring/events?business_id=&severity=\` — Event log. Auth required.

#### Mystery Shopping
- \`POST /api/v1/mystery-shop\` — Trigger mystery shop. Auth required.
- \`GET /api/v1/mystery-shop?slug=\` — Shop history. Auth required.

#### Wallet
- \`GET /api/v1/wallet?business_id=\` — Balance. Auth required.
- \`POST /api/v1/wallet/fund\` — Add funds. Auth required.
- \`POST /api/v1/wallet/transfer\` — Transfer. Auth required.
- \`GET /api/v1/wallet/transactions?business_id=\` — History. Auth required.

#### Gateway
- \`GET /api/v1/gateway\` — List services.
- \`POST /api/v1/gateway\` — Connect service. Auth required.
- \`POST /api/v1/gateway/call\` — Execute call. Auth required.
- \`GET /api/v1/gateway/usage\` — Usage history. Auth required.
- \`GET/POST /api/v1/gateway/budget\` — Budget controls. Auth required.

#### Analytics
- \`GET /api/v1/analytics?business_id=&period=\` — Score analytics. Auth required.
- \`GET /api/v1/report\` — Network report. Public.
- \`GET /api/v1/benchmarks?vertical=\` — Industry benchmarks.
- \`GET /api/v1/benchmarks/compare?slug=&vertical=\` — Comparison.

### MCP Server
Connect via JSON-RPC 2.0 at \`https://agenthermes.ai/api/mcp\`

#### Tools (10)
| Tool | Description | Auth |
|------|-------------|------|
| discover_businesses | Search by capability, vertical, tier, price | No |
| get_business_profile | Full business profile by slug | No |
| get_business_manifest | Machine-readable manifest | No |
| run_audit | Trigger 9-dimension scan on a URL | No |
| check_wallet_balance | Check wallet balance | Yes |
| initiate_payment | Wallet-to-wallet payment | Yes |
| verify_hermes_json | Verify identity file | No |
| list_gateway_services | Browse gateway services | No |
| call_service | Execute API call through gateway | Yes |
| get_service_actions | View actions + costs for a service | No |

#### Resources (4)
| URI | Description |
|-----|-------------|
| agenthermes://businesses | All businesses in the network |
| agenthermes://business/{slug} | Individual business profile |
| agenthermes://audits/{domain} | Audit history for a domain |
| agenthermes://services | All active services |

#### Prompts (3)
| Prompt | Description | Args |
|--------|-------------|------|
| audit-url | Run an Agent Readiness Score audit | url |
| find-service | Find a service by capability | query, max_price |
| check-readiness | Check if a business is agent-ready | domain |

## Contact
- Email: support@agenthermes.ai
- Website: https://agenthermes.ai
- OpenAPI spec: https://agenthermes.ai/openapi.json
- MCP server: https://agenthermes.ai/api/mcp
`

export async function GET() {
  return new NextResponse(llmsFullTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
