import { NextResponse } from 'next/server'

const llmsTxt = `# AgentHermes — The Agent Readiness Score Platform

> AgentHermes is the verified commerce network where AI agents find, evaluate, and transact with businesses. We score businesses 0-100 on agent readiness across 9 dimensions.

## What AgentHermes Does
- Scans any business URL and produces an Agent Readiness Score (0-100)
- Scores across 9 weighted dimensions (see below)
- Lists verified businesses in a searchable directory with semantic search
- Provides machine-readable business manifests and hermes.json for agent consumption
- Enables wallet-to-wallet payments between businesses via agent transactions
- Certifies businesses with embeddable trust badges
- Monitors endpoint health, runs mystery shops, and tracks score changes over time

## 9-Dimension Scoring System
1. Discoverability (20%) — llms.txt, agent cards, Schema.org, robots.txt, .well-known
2. Interoperability (20%) — MCP endpoints, OpenAPI specs, A2A agent cards, webhooks
3. Onboarding (10%) — Signup flow, API key provisioning, sandbox/test mode, docs
4. Pricing Transparency (10%) — Machine-readable pricing, free tiers, usage limits
5. Payment (10%) — Stripe Connect, wallet support, agent-initiated payments
6. Data Quality (10%) — Structured responses, consistent schemas, error formats
7. Security (10%) — TLS, auth mechanisms, rate limiting, CORS, security headers
8. Reliability (5%) — Uptime, response times, health check endpoints, status pages
9. Agent Experience (5%) — End-to-end agent workflow, tool chaining, context handling

Cap rules: No TLS = max 39 | No agent card + no llms.txt + no MCP = max 59 | No callable endpoints = max 29

## Score Tiers
- 0-39: Failing — Invisible to AI agents
- 40-59: Bronze — Partially discoverable
- 60-74: Silver — Agent-usable with friction
- 75-89: Gold — Fully agent-native
- 90-100: Platinum — Certified, battle-tested, zero-friction

## API Endpoints

### Scanning & Scoring (public)
- POST /api/v1/scan — 9-dimension Agent Readiness scan (body: {"url": "example.com"})
- POST /api/v1/scan/batch — Batch scan multiple domains (auth required, body: {"domains": [...]})
- GET /api/v1/score/{domain} — Quick score lookup for a domain
- POST /api/v1/audit — Legacy 5-category audit (body: {"url": "..."})
- GET /api/v1/audit/{id} — Get audit result by ID

### Discovery & Search (public)
- GET /api/v1/discover?q=&vertical=&tier=&min_score= — Search agent-ready businesses
- GET /api/v1/discover/semantic?q=&limit=&threshold= — Semantic vector search for businesses
- GET /api/v1/discover/services?q=&vertical=&max_price=&auth_type=&min_uptime= — Search all services across businesses
- GET /api/v1/leaderboard?vertical=&limit=&offset= — Agent readiness leaderboard

### Business Management
- POST /api/v1/business — Register a new business (body: {name, domain, description, ...})
- GET /api/v1/business/{slug} — Get business profile
- PATCH /api/v1/business/{slug} — Update business profile (auth required)
- GET /api/v1/business/{slug}/manifest — Machine-readable business manifest
- GET /api/v1/business/{slug}/services — List services for a business
- POST /api/v1/business/{slug}/services — Register a service (auth required)
- PATCH /api/v1/business/{slug}/services — Update a service (auth required)
- DELETE /api/v1/business/{slug}/services — Remove a service (auth required)

### API Keys & Connect (auth required)
- POST /api/v1/business/{slug}/api-keys — Generate a new API key
- GET /api/v1/business/{slug}/api-keys — List keys (prefix + metadata only)
- DELETE /api/v1/business/{slug}/api-keys — Revoke a key by ID
- POST /api/v1/business/{slug}/connect — Create Stripe Connect account + onboarding link

### Certification & Badges
- POST /api/v1/certify — Certify a business (auth required, body: {slug} or {business_id})
- GET /api/v1/certify?slug= — Get certification status
- GET /api/v1/certify/badge/{slug} — SVG certification badge
- GET /api/v1/trust-score/{slug} — Composite trust score breakdown
- GET /api/badge/{domain} — Embeddable SVG score badge
- GET /api/badge/{domain}/embed — HTML embed snippet for the badge

### Hermes JSON (verified identity)
- POST /api/v1/hermes-json — Generate a signed .well-known/agent-hermes.json (auth required)
- POST /api/v1/hermes-json/verify — Verify a hermes.json signature and score accuracy

### Health & Monitoring (auth required unless noted)
- POST /api/v1/health/check — Trigger endpoint health check (body: {service_id} or {url})
- GET /api/v1/health/status?business_id=&slug= — Get health status for a business's services (public)
- POST /api/v1/monitoring — Trigger a monitoring cycle (re-scans stale businesses)
- GET /api/v1/monitoring?business_id=&severity=&event_type= — List monitoring events
- GET /api/v1/monitoring/events?business_id=&severity=&event_type=&limit=&offset= — Filtered event log

### Mystery Shopping (auth required)
- POST /api/v1/mystery-shop — Trigger a mystery shop (body: {business_id} or {slug})
- GET /api/v1/mystery-shop?business_id=&slug=&limit=&offset= — Mystery shop history

### Analytics & Reporting
- GET /api/v1/analytics?business_id=&period=&group_by= — Score analytics over time (auth required)
- GET /api/v1/report — Network-wide report (industry breakdown, top businesses, dimension averages)
- GET /api/v1/benchmarks?vertical= — Industry benchmarks by vertical
- GET /api/v1/benchmarks/compare?slug=&vertical= — Compare a business against vertical benchmarks

### Wallet & Payments (auth required)
- GET /api/v1/wallet?business_id= — Get wallet balance and status
- POST /api/v1/wallet/fund — Add funds to a wallet
- POST /api/v1/wallet/transfer — Wallet-to-wallet transfer
- GET /api/v1/wallet/transactions?business_id=&limit=&offset= — Transaction history

### Webhooks (auth required)
- POST /api/v1/webhooks/subscribe — Subscribe to events (body: {url, event_type, filters})
- GET /api/v1/webhooks/subscribe — List active subscriptions
- DELETE /api/v1/webhooks/subscribe — Unsubscribe by ID

### Remediation (auto-fix generators)
- POST /api/v1/remediate/agent-card — Generate an A2A agent card for a domain
- POST /api/v1/remediate/llms-txt — Generate an llms.txt file for a domain
- POST /api/v1/remediate/schema-org — Generate Schema.org JSON-LD markup
- POST /api/v1/remediate/mcp-proxy — Generate an MCP proxy config from API endpoints
- POST /api/v1/remediate/openapi-to-mcp — Convert an OpenAPI spec to MCP tool definitions

### MCP Server
- POST /api/mcp — JSON-RPC 2.0 MCP server (7 tools, 4 resources, 3 prompts)
- GET /api/mcp — Server info and tool listing
- GET /api/mcp/sse — Server-Sent Events transport

## MCP Tools (7)
- discover_businesses — Search by capability, vertical, tier, price
- get_business_profile — Full business profile by slug
- get_business_manifest — Machine-readable manifest (services, pricing, auth, readiness)
- run_audit — Trigger Agent Readiness Score audit on a URL
- check_wallet_balance — Check business wallet balance (auth required)
- initiate_payment — Wallet-to-wallet payment between businesses (auth required)
- verify_hermes_json — Verify a .well-known/agent-hermes.json signature and score

## MCP Resources (4)
- agenthermes://businesses — All businesses in the network
- agenthermes://business/{slug} — Individual business profile with services
- agenthermes://audits/{domain} — Audit history for a domain
- agenthermes://services — All active services across the network

## MCP Prompts (3)
- audit-url — Run an Agent Readiness Score audit (args: url)
- find-service — Find a service by capability or description (args: query, max_price)
- check-readiness — Check if a business is agent-ready (args: domain)

## Integration
Connect via MCP at https://agenthermes.ai/api/mcp (JSON-RPC 2.0)
Check scores via https://agenthermes.ai/api/v1/score/{domain}
Discover businesses via https://agenthermes.ai/api/v1/discover
Run a full 9-dimension scan via POST https://agenthermes.ai/api/v1/scan
`

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
