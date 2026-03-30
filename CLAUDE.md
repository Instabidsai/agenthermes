# AgentHermes — The Agent Readiness Score Platform

## Quick Start
- `npm run dev` — starts on port 3013
- `npx next build` — production build (must pass with 0 errors)
- Supabase project: jcuwzyjdpjmpxpsawudf

## Architecture
- Next.js 16 App Router + TypeScript + Tailwind
- Supabase for DB (service client at src/lib/supabase.ts)
- 126+ pages generated at build (21 app pages + 49 score pages + API routes)
- 9-dimension scanner system at src/lib/scanner/
- Gateway system at src/lib/gateway/ (vault, proxy, types) — 11 services, AES-256-GCM
- MCP server at /api/mcp (14 tools: 10 static + 4 dynamic gateway, 4 resources, 3 prompts)
- A2A protocol at /api/a2a (5 skills: score-business, discover, gateway-call, check-score, get-manifest)
- NLWeb endpoint at /api/nlweb?q= (AI-queryable data)
- Public score pages at /score/{domain} with JSON-LD + dynamic OG images
- Self-service onboarding at /connect (4-step wizard)
- Schema.org on 7 pages (FAQ, HowTo, Product, SoftwareApplication, Dataset, ItemList, Speakable)

## Key Patterns
- `getServiceClient()` for server-side Supabase
- `requireAuth()` on financial endpoints
- `rateLimit()` on expensive operations (scan, audit, monitoring)
- Cast Supabase results as `Record<string, any>` (untyped client)
- Error responses: `{ error: "msg", code: "CODE", request_id: "..." }`
- All routes get CORS + X-Request-ID via src/middleware.ts

## Data
- 108 businesses scanned, average 36/100
- Top 5: JarvisSDK 82 Gold, ThePeptideAI 62 Silver, Slack 60 Silver, Vercel 58, GitHub 56
- 45 git commits on master

## Testing
- Build must pass: `npx next build` (0 TypeScript errors, 126+ pages)
- Live API: https://agenthermes.ai
- Health: GET /api/v1/health
- Self-scan score: 50 (Bronze) — D1:55, D2:75, D3:22, D4:15, D5:20, D6:80, D7:60, D8:75, D9:20
- Verify: 19 pages return 200, 32/33 APIs return 200, MCP ping works

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
