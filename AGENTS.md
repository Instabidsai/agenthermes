# AgentHermes — AI Agent Instructions

## Quick Start
- `npm run dev` — starts on port 3013
- `npx next build` — production build (must pass with 0 errors)
- Supabase project: jcuwzyjdpjmpxpsawudf

## Architecture
- Next.js 16 App Router + TypeScript + Tailwind
- Supabase for DB (service client at src/lib/supabase.ts)
- 9-dimension scanner at src/lib/scanner/ (D1-D9, weighted scoring with cap rules)
- MCP server at /api/mcp (7 tools, 4 resources, 3 prompts — JSON-RPC 2.0)
- 11 pages + 51 route files across api/v1, mcp, badge, .well-known

## Key Patterns
- `getServiceClient()` for server-side Supabase access
- `requireAuth()` from src/lib/auth.ts on financial endpoints (wallet, payment)
- `rateLimit()` from src/lib/auth.ts on expensive operations (scan, audit, monitoring)
- Cast Supabase results as `Record<string, any>` (untyped client)
- Error responses: `{ error: "msg", code: "CODE", request_id: "..." }`
- All API routes get CORS + X-Request-ID via src/middleware.ts

## Testing
- `npx next build` must pass (zero TypeScript errors)
- Test API routes with curl against https://agenthermes.ai
- Health check: GET /api/v1/health
- All financial endpoints require Bearer token auth

## Hard Rules
- verify_jwt = false on all Supabase functions
- Never expose owner_email or stripe_connect_id in public API responses
- Sanitize all error messages (no internal details to clients)
- Score thresholds: 90/75/60/40 (Platinum/Gold/Silver/Bronze) — keep consistent
- "Agent Readiness Score" is the canonical name (not "trust score" or "audit score")
- "Not Scored" for unaudited tier in user-facing text

## Deploy
- Push to master → Vercel auto-deploys
- Domain: agenthermes.ai (Cloudflare DNS)
- GitHub: Instabidsai/agenthermes
