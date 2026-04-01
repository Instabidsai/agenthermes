# AgentHermes — The Shopify of the Agent Economy

Make any business discoverable, usable, and payable by AI agents.

## Quick Start
- `npx next build` — must pass 0 errors (243 pages)
- Push to master → Vercel auto-deploys to agenthermes.ai
- Supabase: jcuwzyjdpjmpxpsawudf | GitHub: Instabidsai/agenthermes

## Three Products

### Score It (free) — /audit, /score/{domain}
- 9-dimension scanner → 6-step journey: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY
- 27 vertical scoring profiles (src/lib/scanner/vertical-weights.ts)
- Detects: MCP, A2A, agent-card.json, llms.txt, AGENTS.md, UCP, ACP, x402, OpenAPI
- Detects platforms: Shopify, WooCommerce, Square (src/lib/adapters/)
- AgentJourneyScore component: "X of 6 steps ready" with pass/partial/fail
- 238+ businesses scored, avg ~42/100. Top: Supabase 69, Vercel 69, Slack 68, Stripe 68

### Fix It (freemium) — /remediate, /connect, /for/{vertical}
- 15 vertical templates with 5 MCP tools each (src/lib/verticals/templates.ts)
- 7 universal MCP patterns: get_info, get_services, check_availability, get_quote, book, search, vertical-specific
- Auto-generate: agent-card.json, llms.txt, agent-hermes.json, MCP tools
- 3 e-commerce adapters: Shopify, WooCommerce, Square (src/lib/adapters/)
- /connect wizard: Step 0 vertical picker → pre-fills form + tools

### Connect It (per-call revenue) — /gateway, /registry
- 11 gateway services, AES-256-GCM credential vault, wallet billing
- Hosted MCP: /api/mcp/hosted/{slug} with SSE transport + dynamic tools
- Fulfillment: API → webhook → email → lead capture (src/lib/fulfillment/router.ts)
- Agent leads table + /dashboard/leads
- Agent Card Registry: /registry (search + submit)

## Protocols
- MCP: 14+ tools (static + dynamic gateway), 4 resources, 3 prompts
- A2A: 5 skills, v0.3 agent card at /.well-known/agent-card.json
- REST: 55+ endpoints | NLWeb: /api/nlweb?q=
- agent-hermes.json standard: /standard (spec + generator)
- x402 micropayment detection | KYA agent identity types

## Scoring (v4)
- Tier 1 (60%): D2 API ×0.15, D7 Security ×0.12, D8 Reliability ×0.13, D6 Data ×0.10, D9 AgentExp ×0.10
- Tier 2 (25%): D1 Discovery ×0.12, D3 Onboarding ×0.08, D4 Pricing ×0.05
- Tier 3 (15%): D5 Payment ×0.08, Agent-Native Bonus ×0.07
- Auth-aware: 401+JSON = 87% of 200 score. Caps: no TLS→39, no endpoints→29
- 27 vertical profiles adjust weights per business type
- Tiers: Platinum 90+, Gold 75+, Silver 60+, Bronze 40+, Not Scored <40

## Key Patterns
- `getServiceClient()` for Supabase | Cast as `Record<string,any>`
- `requireAuth()` on financial endpoints | `rateLimit()` on expensive ops
- Error format: `{ error, code, request_id }` | CORS + X-Request-ID via middleware
- E-commerce: shared `EcommerceAdapter` interface (detect + generateTools)
- Scanner: `runScan(url, { vertical? })` | Vertical weights renormalize to 0.93

## Key Pages (28+)
/, /audit, /score/{domain}, /leaderboard, /report/state-of-readiness, /remediate,
/gateway, /registry, /connect, /about, /blog, /commerce, /integrations, /standard,
/for (hub), /for/{15 verticals}, /dashboard/leads, /playground, /stats, /digest,
/compare, /changelog, /status, /developers, /pricing, /analytics, /discover

## Stats
- 387 pages | 204 TS files | 105 routes | 238+ businesses | 61 commits
- 6 research docs | 50 verticals | 3 e-commerce adapters | 27 scoring profiles

## Hard Rules
1. verify_jwt = false on all Supabase functions
2. Never expose owner_email or stripe_connect_id in public API responses
3. Sanitize all error messages (no internal details)
4. Score thresholds: 90/75/60/40 — consistent everywhere
5. "Agent Readiness Score" is canonical name
6. "Not Scored" for unaudited tier in user-facing text

## Deploy
- Push to master → Vercel auto-deploys
- Domain: agenthermes.ai (Cloudflare DNS)
