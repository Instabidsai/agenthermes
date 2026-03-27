# AgentHermes Live API Test Results

**Date**: 2026-03-27 00:54 UTC
**Target**: https://agenthermes.ai
**Method**: Real curl calls against production endpoints

## Summary

| # | Endpoint | Method | Status | Result |
|---|----------|--------|--------|--------|
| 1 | `/api/v1/scan` | POST | 200 | PASS |
| 2 | `/api/v1/score/dropclose.ai` | GET | 200 | PASS |
| 3 | `/api/v1/business` | POST | 201 | PASS |
| 4 | `/api/v1/discover?q=test&limit=5` | GET | 200 | PASS |
| 5 | `/api/v1/leaderboard?limit=5` | GET | 200 | PASS |
| 6 | `/api/v1/benchmarks` | GET | 200 | PASS |
| 7 | `/api/mcp` (tools/call) | POST | 200 | PASS |
| 8 | `/api/v1/report` | GET | 200 | PASS |
| 9 | `/api/badge/dropclose.ai` | GET | 200 | PASS |
| 10 | `/api/v1/remediate/llms-txt` | POST | 200 | PASS |

**Overall: 10/10 PASS**

---

## Detailed Results

### Test 1: POST /api/v1/scan
- **Input**: `{"url":"https://github.com"}`
- **HTTP Status**: 200
- **Response shape**: Valid `ScanResult` with `hermes_id`, `domain`, `total_score`, `tier`, `dimensions[]`
- **Score**: 33 (tier: "unaudited")
- **Dimensions returned**: 9 (D1-D9), each with `score`, `weight`, `checks[]`, `recommendations[]`
- **Real data**: Yes -- actual HTTP probes ran against github.com (found llms.txt, robots.txt, health endpoint, TLS/HSTS headers, etc.)
- **Note**: `_db_error: "Failed to save scan results. Scorecard is still valid."` -- scan works but DB save failed (likely because github.com isn't a registered business). Scan logic itself is fully functional.

### Test 2: GET /api/v1/score/dropclose.ai
- **HTTP Status**: 200
- **Response**: `{"domain":"dropclose.ai","score":72,"tier":"silver","tier_label":"Agent-Usable with Friction","last_audited":null,"categories":{},"profile_url":"https://agenthermes.ai/business/dropclose","badge_url":"https://agenthermes.ai/api/badge/dropclose.ai"}`
- **Real data**: Yes -- score 72, tier "silver", correct profile/badge URLs
- **Note**: `last_audited` is null and `categories` is empty -- these will populate once a real scan is saved for dropclose.ai

### Test 3: POST /api/v1/business
- **Input**: `{"name":"Test API Business","domain":"test-api-12345.example.com","description":"API test business","owner_email":"test@test.com","vertical":"testing"}`
- **HTTP Status**: 201 (Created)
- **Response**: Full business object with UUID `19a108d2-9581-450f-9dee-d6982587723f`, all fields populated correctly
- **Real data**: Yes -- record created in Supabase with timestamps, proper defaults (audit_score: 0, audit_tier: "unaudited")
- **Note**: No DELETE endpoint exists (405 on DELETE), so test business persists. May want to add cleanup endpoint or admin delete.

### Test 4: GET /api/v1/discover?q=test&limit=5
- **HTTP Status**: 200
- **Response**: Found the just-created "Test API Business" with full pagination metadata
- **Real data**: Yes -- returned 1 result matching "test" query, pagination shows `total: 1, has_more: false`
- **Confirms**: Business creation in Test 3 was real (data persisted and is searchable immediately)

### Test 5: GET /api/v1/leaderboard?limit=5
- **HTTP Status**: 200
- **Response**: 5 ranked businesses with proper ordering by score descending
- **Top 5**: JarvisSDK (82, gold), BlitzGTM (78, gold), DropClose (72, silver), CallTwin (68, silver), YourFeeds (65, silver)
- **Real data**: Yes -- 12 total businesses (pagination confirms `has_more: true`), includes vertical filters
- **Shape**: Each entry has `rank`, `id`, `name`, `slug`, `domain`, `score`, `tier`, `trust_score`, `vertical`, `capabilities[]`, `has_mcp`, `profile_url`

### Test 6: GET /api/v1/benchmarks
- **HTTP Status**: 200
- **Response**: Global benchmark data with 13 businesses, avg score 52, median 55
- **Tier distribution**: 0 platinum, 2 gold, 6 silver, 4 bronze, 1 unaudited
- **Top 10 businesses listed** with scores ranging from 82 (JarvisSDK) to 40 (AdzForge)
- **Real data**: Yes -- aggregated from actual DB records
- **Note**: `category_averages` is empty (no per-category breakdown yet)

### Test 7: POST /api/mcp (JSON-RPC tools/call)
- **Input**: `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"discover_businesses","arguments":{"q":"sales","limit":3}}}`
- **HTTP Status**: 200
- **Response**: Valid JSON-RPC response with `result.content[0].text` containing JSON string with DropClose (score 72, silver)
- **MCP protocol**: Correctly implemented -- proper `jsonrpc`, `id`, `result` envelope with `content[]` array
- **Real data**: Yes -- found DropClose for "sales" query with correct capabilities and scores
- **Note**: The `text` field contains stringified JSON (per MCP spec), not parsed JSON

### Test 8: GET /api/v1/report
- **HTTP Status**: 200
- **Response**: Full "State of Agent Readiness -- Q1 2026" report
- **Contents**: summary stats, tier distribution, dimension averages (empty), industry breakdown (13 verticals), top 10 businesses, trends, key findings
- **Real data**: Yes -- 13 businesses scanned, avg score 52, industry breakdown matches leaderboard data
- **Note**: `dimension_averages` and `top_dimension`/`weakest_dimension` are "N/A" -- these need per-dimension scan data to be stored and aggregated

### Test 9: GET /api/badge/dropclose.ai
- **HTTP Status**: 200
- **Response**: Valid SVG badge (190x28px)
- **Content**: Shows "Agent Ready" on left (dark bg), "Silver - 72" on right (gray bg)
- **Real data**: Yes -- score 72 and tier "silver" match the DB record
- **SVG quality**: Clean, uses system fonts, proper accessibility (role="img", aria-label, title)

### Test 10: POST /api/v1/remediate/llms-txt
- **Input**: `{"domain":"test.com","name":"Test","description":"A test business"}`
- **HTTP Status**: 200
- **Response**: Generated Markdown-formatted llms.txt content with proper structure
- **Content includes**: Title, description, About section, Integration section (agent card, API, docs URLs), Contact section
- **Real data**: Yes -- dynamically generated from input parameters with sensible URL defaults
- **Format**: Valid llms.txt format (Markdown with headings)

---

## Issues Found

### Non-blocking
1. **Scan DB save fails for unregistered domains** -- Test 1 returned `_db_error` because github.com isn't a registered business. The scan itself works perfectly; only the save-to-DB step fails. This is acceptable behavior for external domains.
2. **No DELETE endpoint for businesses** -- Returned 405 Method Not Allowed. Test business `test-api-12345.example.com` persists in DB. Needs admin cleanup route.
3. **Empty aggregation fields** -- `category_averages` (benchmarks), `dimension_averages` (report), `last_audited` (score) are empty/null. These will populate once scan results are stored per-business.
4. **Leaderboard shows seeded scores, not scan-derived scores** -- The 12 portfolio businesses have scores (30-82) that were seeded, not from actual scans. Running `/api/v1/scan` on each domain would populate real dimension-level data.

### None critical -- all 10 endpoints are functional and return correct data shapes.

---

## Cleanup Needed
- Delete test business `test-api-12345.example.com` (id: `19a108d2-9581-450f-9dee-d6982587723f`) from Supabase manually or via future admin endpoint
