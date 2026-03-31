# AgentHermes — Conventions

## Supabase
- Server client: `getServiceClient()` from src/lib/supabase.ts
- Cast all results as `Record<string, any>` (untyped client)
- verify_jwt = false on ALL functions (auth in application code)
- Never expose: owner_email, stripe_connect_id, encrypted_credentials

## Auth & Security
- `requireAuth()` on financial endpoints (wallet, payment, gateway calls)
- `rateLimit()` on expensive operations (scan, audit, monitoring, registry submit)
- Error format: `{ error: string, code: string, request_id: string }`
- CORS + X-Request-ID via src/middleware.ts on all /api/* routes
- AES-256-GCM for credential vault (src/lib/gateway/vault.ts)

## Scanner
- `runScan(url, { vertical? })` — optional vertical for weight adjustment
- 9 dimensions: D1-D9, each returns DimensionResult with checks[]
- Vertical weights: 12 profiles in vertical-weights.ts, renormalize to 0.93 total
- Auth-aware: 401/403 + JSON body scores 87% of 200 response
- E-commerce detection: informational only, no score impact
- Cap rules: no TLS → max 39, no callable endpoints → max 29

## E-Commerce Adapters
- Shared `EcommerceAdapter` interface in src/lib/adapters/types.ts
- Each adapter: detect(url) → DetectionResult, generateTools(url) → McpTool[]
- Three adapters: shopify.ts, woocommerce.ts, square.ts
- Detection runs in scanner (D2), no score impact, adds recommendation

## Fulfillment
- 4-tier fallback: API proxy → webhook → email → lead capture
- Routes loaded from business_fulfillment_routes table, or inline
- Email templates in src/lib/fulfillment/templates.ts (logs only, no real sending yet)
- Leads stored in agent_leads table

## MCP Hosted
- Per-business at /api/mcp/hosted/{businessSlug}
- Tools generated dynamically from vertical template + business profile
- 60s cache on business profile data
- SSE transport via GET with Accept: text/event-stream
- Read-only tools (get_info, get_services) return static data
- Action tools (book, quote) route through fulfillment engine

## Pages
- Server components by default, client components only when needed
- ISR revalidate varies: 60s (homepage), 120s (registry), 300s (score pages), 3600s (report)
- Dark theme: zinc-900 bg, emerald accents, border-zinc-800
- JSON-LD Schema.org on data-rich pages
- Dynamic metadata via generateMetadata on all pages
