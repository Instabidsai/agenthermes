# AgentHermes Edge Case Test Results

**Date**: 2026-03-26
**Target**: https://agenthermes.ai (live)

## Summary

| # | Test | Status | HTTP | Result |
|---|------|--------|------|--------|
| 1 | POST /api/v1/scan empty body | PASS | 400 | `{"error":"Missing or invalid \"url\" field..."}` |
| 2 | POST /api/v1/scan garbage URL | PASS | 200 | Scanned "not-a-url" as domain, returned low score (1). DB upsert failed gracefully. |
| 3 | POST /api/v1/scan localhost (SSRF) | PASS | 400 | `{"error":"Cannot audit private or internal URLs"}` |
| 4 | POST /api/v1/scan 2100-char URL | PASS | 400 | `{"error":"URL too long (max 2048 characters)"}` |
| 5 | GET /api/v1/score/nonexistent-domain | PASS | 200 | `{"tier":"unaudited","message":"This business has not been audited..."}` |
| 6 | GET /api/v1/score SQL injection | PASS | 400 | `{"error":"Invalid domain format..."}` |
| 7 | GET /api/badge/XSS payload | PASS | 404 | Next.js 404 page (path didn't match route). Badge route also has `escapeXml()` + domain regex validation. |
| 8 | POST /api/v1/business empty body | PASS | 400 | `{"error":"name is required"}` |
| 9 | POST /api/v1/business 250-char name | PASS | 400 | `{"error":"name must be 200 characters or less"}` |
| 10 | GET /api/v1/discover malformed params | **BUG** | 500 | `{"error":"Internal server error"}` -- negative limit/offset caused Supabase range error |
| 11 | POST /api/mcp invalid JSON | PASS | 400 | `{"jsonrpc":"2.0","error":{"code":-32700,"message":"Parse error — invalid JSON"}}` |
| 12 | POST /api/mcp missing method | PASS | 400 | `{"jsonrpc":"2.0","error":{"code":-32600,"message":"Invalid request — must be JSON-RPC 2.0"}}` |

## Bugs Found & Fixed

### BUG #1: Negative limit/offset causes 500 on discover endpoints (Test 10)

**Root cause**: `parseInt()` on `limit=-1` and `offset=-5` produced negative numbers. `query.range(-5, -7)` sent an invalid range to PostgREST, which errored. The error handler returned 500 instead of 400.

**Attack vector**: `GET /api/v1/discover?limit=-1&offset=-5`

**Fix applied** (7 files):
- `src/app/api/v1/discover/route.ts` -- clamp limit to [1, 100], offset to [0, Inf), handle NaN
- `src/app/api/v1/discover/services/route.ts` -- same clamping
- `src/app/api/v1/leaderboard/route.ts` -- same clamping
- `src/app/api/v1/monitoring/route.ts` -- same clamping
- `src/app/api/v1/monitoring/events/route.ts` -- same clamping
- `src/app/api/v1/mystery-shop/route.ts` -- same clamping
- `src/app/api/v1/wallet/transactions/route.ts` -- same clamping

Additionally, `discover/route.ts` and `discover/services/route.ts` now return 400 (not 500) for PostgREST range errors.

**Pattern applied**:
```typescript
// Before (vulnerable):
const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100)
const offset = parseInt(searchParams.get('offset') || '0', 10)

// After (safe):
const rawLimit = parseInt(searchParams.get('limit') || '20', 10)
const limit = Math.min(Math.max(Number.isNaN(rawLimit) ? 20 : rawLimit, 1), 100)
const rawOffset = parseInt(searchParams.get('offset') || '0', 10)
const offset = Math.max(Number.isNaN(rawOffset) ? 0 : rawOffset, 0)
```

**Note**: `src/app/api/v1/discover/semantic/route.ts` already had proper clamping (`Math.max(1, Math.min(...))`).

## Verification

- TypeScript build: PASS (no errors)
- All 12 original tests: 11 passed on first run, 1 bug found and fixed
- The same negative-param bug existed in 7 routes total (all fixed)
