# AgentHermes — The Agent Readiness Score Platform

## Quick Start
- `npm run dev` — starts on port 3013
- `npx next build` — production build (must pass with 0 errors)
- Supabase project: jcuwzyjdpjmpxpsawudf

## Architecture
- Next.js 16 App Router + TypeScript + Tailwind
- Supabase for DB (service client at src/lib/supabase.ts)
- 68 routes (14 pages + 48 API endpoints + 6 dogfood files)
- 9-dimension scanner system at src/lib/scanner/
- Gateway system at src/lib/gateway/ (vault, proxy, types)
- MCP server at /api/mcp (10 tools, 4 resources, 3 prompts)

## Key Patterns
- `getServiceClient()` for server-side Supabase
- `requireAuth()` on financial endpoints
- `rateLimit()` on expensive operations (scan, audit, monitoring)
- Cast Supabase results as `Record<string, any>` (untyped client)
- Error responses: `{ error: "msg", code: "CODE", request_id: "..." }`
- All routes get CORS + X-Request-ID via src/middleware.ts

## Testing
- Build must pass: `npx next build` (0 TypeScript errors)
- Live API: https://agenthermes.ai
- Health: GET /api/v1/health
- Self-scan score: 50 (Bronze) — D1:55, D2:75, D3:22, D4:15, D5:20, D6:80, D7:60, D8:75, D9:20

## Hard Rules
1. verify_jwt = false on all Supabase functions
2. Never expose owner_email or stripe_connect_id in public API responses
3. Sanitize all error messages (no internal details to clients)
4. Score thresholds: 90/75/60/40 (Platinum/Gold/Silver/Bronze) — consistent everywhere
5. "Agent Readiness Score" is the canonical name (not "trust score" or "audit score")
6. "Not Scored" for unaudited tier in user-facing text

## Deploy
- Push to master → Vercel auto-deploys
- Domain: agenthermes.ai (Cloudflare DNS)
- GitHub: Instabidsai/agenthermes
