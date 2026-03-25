import { NextResponse } from 'next/server'

const llmsTxt = `# AgentHermes — The Agent Readiness Score Platform

> AgentHermes is the verified commerce network where AI agents find, evaluate, and transact with businesses. We score businesses 0-100 on agent readiness.

## What AgentHermes Does
- Scans any business URL and produces an Agent Readiness Score (0-100)
- Scores across 5 categories: machine-readable profiles, API endpoints, agent onboarding, structured pricing, payment acceptance
- Lists verified businesses in a searchable directory
- Provides machine-readable business manifests for agent consumption
- Enables wallet-to-wallet payments between businesses via agent transactions

## API Endpoints

### Public (no auth required)
- GET /api/v1/score/{domain} — Check a business's Agent Readiness Score
- GET /api/v1/discover?q=&vertical=&tier=&min_score= — Search agent-ready businesses
- POST /api/v1/audit — Run a full audit on a URL (body: {"url": "https://example.com"})
- GET /api/v1/business/{slug} — Get business profile
- GET /api/v1/business/{slug}/manifest — Machine-readable business manifest
- POST /api/mcp — MCP server (JSON-RPC 2.0) with 6 tools

### Authenticated (Bearer token required)
- POST /api/v1/wallet/fund — Add funds to a business wallet
- POST /api/v1/wallet/transfer — Transfer between wallets

## Score Tiers
- 0-39: Failing — Invisible to AI agents
- 40-59: Bronze — Partially discoverable
- 60-74: Silver — Agent-usable with friction
- 75-89: Gold — Fully agent-native
- 90-100: Platinum — Certified, battle-tested, zero-friction

## MCP Tools Available
- discover_businesses — Search by capability, vertical, tier, price
- get_business_profile — Full business profile by slug
- get_business_manifest — Machine-readable manifest
- run_audit — Trigger Agent Readiness Score audit
- check_wallet_balance — Check business wallet balance
- initiate_payment — Wallet-to-wallet payment

## Integration
Connect via MCP at https://agenthermes.ai/api/mcp
Check scores via https://agenthermes.ai/api/v1/score/{domain}
Discover businesses via https://agenthermes.ai/api/v1/discover
`

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
