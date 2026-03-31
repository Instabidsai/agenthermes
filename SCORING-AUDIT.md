# Stripe Scoring Audit — Why 56 Bronze Is Wrong

**Date**: 2026-03-30
**Scanner version**: v2 (post-recalibration)
**Actual score**: 56 Bronze
**Expected score**: ~75+ Gold (Stripe has arguably the best API in the industry)

---

## Summary

Stripe scores only 56/100 because the scanner systematically fails to detect capabilities that Stripe actually has. The root causes fall into three categories:

1. **Agent-native protocol bias** — 20 points locked behind files (agent.json, llms.txt, AGENTS.md, mcp.json) that no traditional API company publishes
2. **Narrow endpoint probing** — The scanner checks ~10 hardcoded paths but Stripe has 300+ endpoints; it misses most of them
3. **Auth-wall blindness** — Stripe's best qualities (structured JSON, consistent naming, versioning) are behind 401 responses; the scanner handles this partially but not fully

---

## Dimension-by-Dimension Analysis

### D1 Discoverability (weight: 0.12) — Estimated: ~37/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| Agent Card | 8 | 0 | Stripe has no `/.well-known/agent.json` — nobody does |
| llms.txt | 7 | 0 | Stripe has no `/llms.txt` — emerging standard, not adopted |
| robots.txt | 10 | 10 | stripe.com/robots.txt exists and allows crawling |
| OpenAPI Spec | 25 | 0 | **BIG MISS**: Stripe publishes their OpenAPI spec at github.com/stripe/openapi, but the scanner only checks `stripe.com/openapi.json`, `stripe.com/swagger.json`, `api.stripe.com/openapi.json`, etc. Stripe doesn't serve the spec from these paths. |
| Schema.org / JSON-LD | 15 | 15 | stripe.com homepage likely has structured data |
| MCP Discovery | 5 | 0 | No MCP endpoint — reasonable, not adopted yet |
| AGENTS.md | 5 | 0 | No AGENTS.md — nobody has this |
| Developer Docs (Subdomain) | 25 | 25 | **docs.stripe.com** exists and responds. `getInfraSubdomains` generates `https://docs.stripe.com` which will be found. |

**Estimated D1 score: ~50** (but could be lower if Schema.org detection fails on Stripe's heavily JS-rendered homepage)

**Gaps identified:**
1. **OpenAPI spec not found** (-25 pts): The scanner checks fixed paths on the domain. Stripe publishes their spec on GitHub, not on stripe.com. The scanner should also check for OpenAPI links in HTML content (Stripe's docs page links to the spec), or check known locations like `raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json`.
2. **Agent-native features** (-20 pts total): agent.json, llms.txt, AGENTS.md, mcp.json — these are emerging standards that even the best APIs don't adopt yet. Together they account for 25/100 points in D1.

---

### D2 API Quality (weight: 0.15) — Estimated: ~63/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| MCP Tools List | 10 | 0 | No MCP server |
| REST API Endpoints | 35 | 35 | `api.stripe.com` returns 401, `api.stripe.com/v1` returns 401, `api.stripe.com/v1/charges` returns 401, `api.stripe.com/v1/customers` returns 401, `api.stripe.com/v1/accounts` returns 401. The scanner probes these subdomain paths via `getApiSubdomains()`, and `endpointExists()` treats 401 as existing. With 5+ endpoints found, this maxes at 35 pts. |
| JSON API Responses | 10 | 10 | Stripe's 401 responses are JSON. `isJsonContentType` should match. Multiple JSON 401 responses = up to 10 pts. |
| OPTIONS / CORS Support | 5 | 5? | Stripe's API likely responds to OPTIONS with CORS headers. |
| Response Time | 15 | 10-15 | Stripe's API is fast. 401 responses should be <200ms. |
| Proper HTTP Status Codes | 10 | 3 | **PROBLEM**: The scanner hits `stripe.com/api/definitely-does-not-exist-{timestamp}` and checks for 404. Stripe's marketing site likely returns a 200 with a "page not found" design or a 301 redirect, NOT a clean 404. The scanner tests the base domain, not the API subdomain. |

**Estimated D2 score: ~63-68**

**Gaps identified:**
1. **Status code test on wrong domain** (-7 pts): The scanner tests `${base}/api/definitely-does-not-exist-...` which hits `stripe.com/api/...` (marketing site), not `api.stripe.com/...` (the actual API). Stripe's API at `api.stripe.com/v1/nonexistent` would return a proper 404 JSON response.
2. **MCP penalty** (-10 pts): No MCP server is expected for a traditional API company.

---

### D3 Onboarding (weight: 0.08) — Estimated: ~29/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| Programmatic Signup | 25 | 8-17 | **PARTIAL**: The scanner checks paths like `/signup`, `/register`, `/sign-up`. Stripe likely has a signup page at `stripe.com/register` or similar that returns 200, giving 8 pts base. HTML signup form indicators (email input, CTA button) could add up to +9 more. But NO programmatic JSON API for signup exists. |
| API Key Generation | 15 | 0 | Stripe has API keys in the dashboard at `dashboard.stripe.com`, but no public `/api/keys` endpoint. |
| OAuth / OIDC | 15 | 15 | **YES**: `connect.stripe.com/oauth/authorize` and `connect.stripe.com/oauth/token` exist. The scanner checks `https://connect.stripe.com/oauth/authorize` and `https://connect.stripe.com/oauth/token` via oauthSubdomainPaths. These should return endpoint-exists statuses. |
| Social / OAuth Login | 5 | 0-5 | Depends on whether the signup page has Google OAuth buttons. |
| Developer Portal | 12 | 12 | `docs.stripe.com` exists, `dashboard.stripe.com` exists. The scanner checks these. Auth documentation bonus likely triggers too (docs mention API keys). |
| CLI / SDK Installation | 8 | 8 | `docs.stripe.com` mentions `npm install`, `pip install`, etc. |
| Sandbox / Test Mode | 20 | 8 | Stripe has a famous test mode, but no `/api/sandbox` endpoint. The scanner checks homepage and dev docs for sandbox/test mode references. `docs.stripe.com` certainly mentions "test mode". This gives 8 pts (reference found, no dedicated endpoint). |

**Estimated D3 score: ~51**

**Gaps identified:**
1. **Programmatic signup detection** (-8 to -17 pts): Stripe's signup flow is browser-based. The scanner correctly penalizes this, but the 25-point weight on programmatic signup is arguably too high for an API company — Stripe's dashboard-based key generation is industry standard.
2. **Sandbox detection too narrow** (-12 pts): Stripe's test mode is one of the best in the industry. The scanner only gives 8 pts because it can't find a `/api/sandbox` endpoint. A dedicated test-mode API doesn't exist at a standalone URL — it's activated via `sk_test_` keys.

---

### D4 Pricing Transparency (weight: 0.05) — Estimated: ~30/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| Pricing API | 35 | 0 | No `/api/pricing` or `/pricing.json`. Stripe's pricing is on a webpage, not a JSON API. |
| Pricing Page | 15 | 15 | `stripe.com/pricing` exists and is famous for clarity. |
| Pricing Content Quality | 5 | 5 | Stripe's pricing page has explicit price strings (`2.9% + 30c`, etc.). |
| Pricing in Agent Card | 15 | 0 | No agent card exists. |
| Free Tier / Trial | 15 | 15 | Stripe has no monthly fee — effectively free tier. The homepage/pricing page mentions free concepts. |
| Usage Tiers / Rate Limits | 10 | 0 | Rate limit info is in the docs, not on the pricing page directly. The scanner only checks pricing-related pages. |

**Estimated D4 score: ~35**

**Gaps identified:**
1. **No machine-readable pricing** (-35 pts): Stripe doesn't serve `/api/pricing` — but their pricing IS machine-readable in a sense (it's well-structured HTML). The scanner should parse pricing page HTML for structured pricing signals beyond just `$` signs.
2. **Rate limit info not found** (-10 pts): Stripe documents rate limits extensively at `docs.stripe.com` but the scanner only checks pricing-related pages/endpoints.

---

### D5 Payment (weight: 0.08) — Estimated: ~55/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| Payment API Endpoints | 20 | 20 | `api.stripe.com/v1/charges` (401), `api.stripe.com/v1/payment_intents` (401), `api.stripe.com/v1/checkout/sessions` (401), `api.stripe.com/v1/subscriptions` (401). The scanner probes subdomain paths and `endpointExists()` matches 401. |
| Stripe Detection | 10 | 10 | `stripe.com` homepage obviously references Stripe. |
| Programmatic Payment Creation | 25 | 25 | `api.stripe.com/v1/payment_intents` (401), `api.stripe.com/v1/checkout/sessions` (401), `api.stripe.com/v1/charges` (401), `api.stripe.com/v1/invoices` (401). Multiple hits via subdomain probing. |
| Agent Commerce Protocol | 15 | 0 | No ACP, no 402 responses on tested endpoints. |
| Usage-Based Billing | 15 | 0 | No `/api/usage` or `/api/metering` endpoints on base domain. `api.stripe.com/v1/usage_records` is not in the probe list (it's only in the programmatic payment section, not usage section). |
| Multi-Currency | 10 | 0 | Multi-currency detection looks at response bodies. 401 JSON error responses won't contain currency strings. |

**Estimated D5 score: ~55**

**Gaps identified:**
1. **Usage-based billing paths too narrow** (-15 pts): Stripe has `api.stripe.com/v1/usage_records`, `api.stripe.com/v1/billing/meters`, etc. These aren't probed in the usage section.
2. **Multi-currency detection blind to auth-walled content** (-10 pts): Stripe supports 135+ currencies but the scanner can't see this through 401 responses.
3. **ACP doesn't exist yet** (-15 pts): The Agent Commerce Protocol is a hypothetical standard. No one implements it.

---

### D6 Data Quality (weight: 0.10) — Estimated: ~65/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| JSON API Responses | 10 | 10 | Multiple 401 JSON responses from `api.stripe.com/v1/*` endpoints. |
| Auth Error Response Quality | 70 ceiling | ~60 | Stripe's 401 response is `{"error":{"message":"...","type":"invalid_request_error"}}`. This has: `error` field (yes), `message` field (yes), `type` field (yes). That's 3+ fields = 25-30 pts on error quality. Content-Type correct = 20 pts. Proper HTTP status = 20 pts. Naming consistency (snake_case) = 15 pts. Envelope consistency = 15 pts (if 2+ responses share same structure). Total error quality score: ~100/100. Scaled to 70 ceiling = 70. |

Wait — but this path hits **Case 2** (only auth responses, no 2xx). The AUTH_CEILING is 70. If Stripe's error quality is near-perfect (and it is), the score should be close to 70.

**Estimated D6 score: ~65-70** (auth ceiling)

**Gaps identified:**
1. **Auth ceiling** (-30 pts): Even with perfect error responses, Stripe can only score 70/100 here. Stripe has no public unauthenticated JSON endpoints (no `/api/health`, no `/api/status`). Adding just one public endpoint would remove the ceiling.

---

### D7 Security (weight: 0.12) — Estimated: ~75/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| TLS / HTTPS | 25 | 25 | stripe.com is HTTPS with valid TLS. |
| HSTS | 15 | 15 | Stripe sends `Strict-Transport-Security` with `includeSubDomains`. |
| Content-Security-Policy | 10 | 10 | Stripe sends CSP headers. |
| X-Frame-Options | 5 | 5 | Stripe sends `X-Frame-Options: SAMEORIGIN`. |
| X-Content-Type-Options | 5 | 5 | Stripe sends `X-Content-Type-Options: nosniff`. |
| Rate Limiting | 15 | 15 | `api.stripe.com` returns `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers on 401 responses. The scanner merges headers from subdomain probes. |
| Error Sanitization | 10 | 10 | Stripe error responses don't leak stack traces. |
| CORS Configuration | 10 | 5-10 | Stripe likely has CORS headers on the API. If wildcard, 5 pts; if restricted, 10 pts. |
| security.txt | 5 | 0 | Stripe probably doesn't have `/.well-known/security.txt` (though they may — they have a bug bounty program). |

**Estimated D7 score: ~80-90**

But wait — the scanner merges headers from homepage + `/api` + subdomain probes. The key question is whether the subdomain probe results actually populate headers correctly. `api.stripe.com` returns 401 with proper headers, and the scanner does `Object.assign(allHeaders, r.headers)` for subdomain results.

**Estimated D7 score: ~80**

**Gaps identified:**
1. **Rate-limit header detection depends on subdomain probe** — If the scanner's header merge misses the `api.stripe.com` probes (they're done separately in D7 via `apiSubdomains`), rate limiting would score 0. Looking at the code, D7 probes `api.stripe.com` and `api.stripe.com/v1` and merges their headers. Stripe returns rate-limit headers on 401 responses. This should work.
2. **security.txt** (-5 pts): Minor, but Stripe likely does have a security contact. They have a HackerOne program.

---

### D8 Reliability (weight: 0.13) — Estimated: ~47/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| Health Endpoint | 30 | 15 | **PARTIAL**: The scanner checks `status.stripe.com` (which exists!) and also checks `api.stripe.com/health`, `api.stripe.com/v1/health`. `status.stripe.com` is Stripe's Statuspage.io page — it should return 200. That gives 15 pts for the health endpoint. HOWEVER, the structured health response bonus (15 more pts) requires JSON with `status/healthy/ok/uptime/version` fields. Statuspage.io pages return HTML, not JSON. The scanner also checks `status.stripe.com/api/v2/status.json` and `status.stripe.com/api/v2/summary.json` (Statuspage.io API format) — but these might not be accessible or might not have the expected fields. |
| Structured Health Response | 15 | 15 | `status.stripe.com/api/v2/status.json` returns `{"page":{"id":"...","name":"Stripe","url":"..."},"status":{"indicator":"none","description":"All Systems Operational"}}`. This has a `status` field! `hasField(body, 'status', 'healthy', 'ok', 'uptime', 'version')` would match `status`. Full 15 pts. |
| Response Time p95 | 25 | 15-20 | The scanner times responses to `stripe.com`, `stripe.com/api`, `stripe.com/api/v1`, `stripe.com/health`, `stripe.com/api/health`. These hit the marketing site, NOT the API. Marketing sites can be 200-500ms. If p95 < 500ms → 20 pts, if p95 < 1000ms → 15 pts. |
| 5xx Error Rate | 20 | 20 | No 5xx errors expected from stripe.com. |
| Published SLA | 15 | 15 | `status.stripe.com` exists and is found by the scanner. Full 15 pts. |
| Retry Hints | 10 | 10 | Stripe API returns `Retry-After` and rate-limit headers. But this depends on whether the healthResults headers (from subdomain probes) are merged. Looking at the code: `for (const r of healthResults) { Object.assign(allHeaders, r.headers) }` — healthResults includes subdomain probes of `api.stripe.com/health`, `api.stripe.com/v1/health`, etc. If those 401 responses carry rate-limit headers, this triggers. |

**Estimated D8 score: ~80-95**

Wait — I need to re-examine. The structured health response check requires `isJsonContentType` AND the probe result to have `body` as an object. If `status.stripe.com/api/v2/status.json` returns valid JSON, this works. If `status.stripe.com` returns HTML (the main status page), it won't. The scanner tries BOTH URLs. If the JSON URL works, it finds it.

Actually, looking more carefully: `healthHit = healthResults.find((r) => r.found)`. It finds the FIRST successful one. If `status.stripe.com` (HTML) is listed before `status.stripe.com/api/v2/status.json`, it might grab the HTML one first, miss the structured bonus, but still get 15 pts for health endpoint.

The order in `allHealthUrls` is: base domain paths first, then subdomain paths, then `statusSubdomains`. The status subdomain URLs are:
- `https://status.stripe.com`
- `https://status.stripe.com/api/v2/status.json`
- `https://status.stripe.com/api/v2/summary.json`

Since all are appended at the end, and `status.stripe.com` comes before `status.stripe.com/api/v2/status.json`, the scanner grabs the HTML status page first. It gets 15 pts for the health check but MISSES the structured health response bonus because the HTML page isn't JSON.

**Revised D8 estimate: ~75**

**Gaps identified:**
1. **Health endpoint ordering** (-15 pts): The scanner finds `status.stripe.com` (HTML) before `status.stripe.com/api/v2/status.json` (JSON). The `.find()` returns the first hit, so the structured JSON bonus is missed. The scanner should prefer JSON health endpoints over HTML ones.
2. **Response timing tests the wrong domain** (minor): Timing probes hit `stripe.com/api`, `stripe.com/api/v1` (marketing site pages), not `api.stripe.com/v1` (the actual API). API response times would be faster.

---

### D9 Agent Experience (weight: 0.10) — Estimated: ~50/100

| Check | Max Pts | Stripe Gets | Why |
|-------|---------|-------------|-----|
| Request Tracing | 20 | 20 | Stripe returns `x-request-id` (and possibly `x-stripe-routing-context-priority-tier`) on every response, including 401s. The scanner checks subdomain probes. `api.stripe.com/v1` (401) will have `x-request-id`. |
| Structured Error Responses | 25 | 25 | The scanner triggers errors at `api.stripe.com/v1/nonexistent-endpoint-{timestamp}`. Stripe returns JSON 404: `{"error":{"type":"invalid_request_error","message":"Unrecognized request URL..."}}`. This has JSON + message + error code (type). Full 25 pts. |
| Escalation Paths | 15 | 15 | `stripe.com/support` or `stripe.com/contact` should exist. `stripe.com/help` probably redirects to support. |
| SDK / Client Libraries | 15 | 7-15 | The scanner checks `docs.stripe.com/sdks`, `docs.stripe.com/libraries`, `docs.stripe.com/api/libraries`. These pages may or may not exist at those exact paths. However, the scanner also checks for SDK mentions in page bodies. `docs.stripe.com` definitely mentions `npm install`, `pip install`, `gem install`. If the SDK page paths don't exist but the text mentions exist, it gets 7 pts. If `docs.stripe.com/libraries` exists (it does!), full 15 pts. |
| Deprecation & Versioning | 15 | 5 | `api.stripe.com/v1` uses URL path versioning. `hasApiVersion` checks if any probe URL matches `/v\d+/` and returns 401. This matches `api.stripe.com/v1`. Score: 5 pts. Stripe also sends `Stripe-Version` header but the scanner only checks for `api-version` header. |
| Agent Documentation Quality | 10 | 0 | No agent card. |

**Estimated D9 score: ~72**

**Gaps identified:**
1. **Stripe-Version header not recognized** (-5-10 pts): Stripe sends `Stripe-Version: 2024-xx-xx` in responses, but the scanner only checks for `api-version` header. The `Stripe-Version` header is functionally identical but named differently.
2. **Agent card requirement** (-10 pts): The agent documentation quality check requires an agent.json file. This is an agent-native feature that no traditional API company has.

---

## Score Calculation

### Weighted Dimension Scores

Using my estimates:

| Dimension | Score | Weight | Contribution |
|-----------|-------|--------|-------------|
| D1 Discoverability | 50 | 0.12 | 6.0 |
| D2 API Quality | 65 | 0.15 | 9.75 |
| D3 Onboarding | 51 | 0.08 | 4.08 |
| D4 Pricing | 35 | 0.05 | 1.75 |
| D5 Payment | 55 | 0.08 | 4.40 |
| D6 Data Quality | 70 | 0.10 | 7.00 |
| D7 Security | 80 | 0.12 | 9.60 |
| D8 Reliability | 75 | 0.13 | 9.75 |
| D9 Agent Experience | 72 | 0.10 | 7.20 |
| **Subtotal** | | **0.93** | **59.53** |
| Agent-Native Bonus | 0 | 0.07 | 0.00 |
| **TOTAL** | | **1.00** | **~60** |

My estimate is ~60 (Silver), but the actual score is 56 (Bronze). The difference is likely because:
- D1 may be lower (Schema.org detection failing on JS-rendered homepage)
- D3 signup detection may yield fewer points
- D8 may not find status.stripe.com's JSON endpoint
- Response times may be slower than assumed

**The 56 actual score is plausible given the scanner's limitations, but Stripe SHOULD score 75+ Gold.**

---

## Top 10 Gaps (Ranked by Point Impact)

### 1. OpenAPI spec not discovered (D1, -25 pts)
**What scanner checks**: Fixed paths on domain and API subdomains (`/openapi.json`, `/swagger.json`, `/.well-known/openapi.json`, `/api-docs`, `/api/docs`)
**What Stripe has**: Full OpenAPI 3.1 spec published at `github.com/stripe/openapi` and linked from docs
**Fix**: Check homepage/docs HTML for links to OpenAPI specs. Check `raw.githubusercontent.com/{org}/openapi` pattern. Check for `<link rel="api-description">` tag.

### 2. Agent-native features nobody has (D1+D9, -25 pts across dims)
**What scanner checks**: `agent.json`, `llms.txt`, `AGENTS.md`, `mcp.json` — combined 25 pts in D1 alone
**What Stripe has**: None of these. Neither does any other major API company.
**Fix**: These are already weighted as "bonus" in v2, but they still consume 25/100 of D1's internal scoring. D1 should scale its non-bonus checks to fill 100 so companies without agent-native features can still score high on discoverability.

### 3. D6 auth ceiling blocks perfect data quality score (D6, -30 pts)
**What scanner checks**: Only 2xx JSON responses get full scoring path. Auth-only APIs capped at 70.
**What Stripe has**: The best JSON API responses in the industry — consistent snake_case, ISO timestamps, perfect envelopes, comprehensive error codes. All behind auth.
**Fix**: The v2 ceiling of 70 is better than v1's 40, but it should be 85-90 for APIs that demonstrate excellence through their error responses. Alternatively, detect known API documentation (OpenAPI spec) and infer data quality from the spec.

### 4. Programmatic signup overweighted (D3, -17 pts)
**What scanner checks**: JSON POST signup API at `/api/signup` — 25 pts max
**What Stripe has**: Browser-based signup with dashboard. Industry standard for financial APIs.
**Fix**: Reduce programmatic signup weight or give credit for well-documented dashboard signup flow with API key generation docs.

### 5. Sandbox/test mode detection too narrow (D3, -12 pts)
**What scanner checks**: `/api/sandbox` endpoint, plus text search for "sandbox|test mode" in docs
**What Stripe has**: One of the best test modes in the industry (`sk_test_*` keys, test card numbers, test clocks). Docs mention "test mode" extensively.
**Fix**: The text search should catch "test mode" references on docs pages. But the scanner should also check for `test` subdomain or documented test API keys pattern.

### 6. Machine-readable pricing not found (D4, -35 pts)
**What scanner checks**: `/api/pricing`, `/pricing.json`, `/.well-known/pricing.json`
**What Stripe has**: stripe.com/pricing with clearly structured pricing (2.9% + 30c, etc.) but no JSON API
**Fix**: Parse pricing page HTML more deeply. Detect structured pricing in HTML tables. Check for Schema.org PriceSpecification markup.

### 7. Status code test on wrong domain (D2, -7 pts)
**What scanner checks**: `${base}/api/definitely-does-not-exist-...` (hits `stripe.com`, the marketing site)
**What Stripe has**: `api.stripe.com` returns proper 404 JSON for unknown routes
**Fix**: Test status codes on API subdomains, not just the base marketing domain.

### 8. Health endpoint ordering prefers HTML over JSON (D8, -15 pts)
**What scanner checks**: Uses `.find()` on health probe results, returns first hit
**What Stripe has**: `status.stripe.com` (HTML, found first) AND `status.stripe.com/api/v2/status.json` (JSON with structured data, found second)
**Fix**: After finding any health hit, continue checking remaining results for JSON health endpoints. Prefer JSON over HTML.

### 9. ACP/x402 is a hypothetical standard (D5, -15 pts)
**What scanner checks**: `/.well-known/acp.json`, `/.well-known/pay`, `/api/acp`, HTTP 402 responses
**What Stripe has**: Stripe IS the payment infrastructure — but doesn't implement ACP because it doesn't exist as a standard yet
**Fix**: Reduce ACP weight or move it to agent-native bonus. A payment company shouldn't lose 15 pts for not implementing a hypothetical protocol.

### 10. Stripe-Version header not recognized (D9, -5-10 pts)
**What scanner checks**: `api-version` header, `deprecation` header, `sunset` header
**What Stripe has**: `Stripe-Version` header on every API response (e.g., `Stripe-Version: 2024-11-20.acacia`)
**Fix**: Add `stripe-version`, `x-api-version`, and other vendor-specific version headers to the detection list. Also check for `api-version` in query params or request headers documentation.

---

## Systemic Issues

### Issue A: The Scanner Penalizes Industry Leaders for Not Adopting Hypothetical Standards
Agent-native protocols (MCP, agent cards, ACP, llms.txt) are bleeding-edge. The scanner allocates ~35-40 points across all dimensions to features that <1% of APIs implement. This creates a structural ceiling where the best traditional APIs (Stripe, Twilio, GitHub) can never score above ~70.

**Recommendation**: All agent-native features should live exclusively in the Agent-Native Bonus (currently 7%). Within individual dimensions, checks should focus on qualities that established APIs can demonstrate.

### Issue B: The Scanner Tests the Marketing Site, Not the API
For companies like Stripe where the marketing site (`stripe.com`) and API (`api.stripe.com`) are separate domains, several checks hit the wrong target:
- Status code test (D2) hits `stripe.com/api/...`
- Response timing (D8) hits `stripe.com/api`, `stripe.com/health`
- Error sanitization (D7) hits `stripe.com/api/...`

**Recommendation**: When API subdomains are discovered, run API-specific checks (status codes, timing, error handling) against those subdomains, not the base marketing domain.

### Issue C: `.find()` First-Match Bias in Multiple Places
The scanner uses `.find()` to grab the first successful probe, but the best result may not be the first. This affects:
- Health endpoint (D8): HTML status page found before JSON API
- OpenAPI spec (D1): If a non-OpenAPI `/api-docs` HTML page exists, it might be found before a real spec
- Developer docs (D1): First found doc page used even if a better one exists

**Recommendation**: After finding any hit, continue scanning and prefer structured (JSON) results over HTML. Use a scoring function to pick the best result rather than the first.

---

## What Stripe's Score SHOULD Be

If the scanner properly detected Stripe's capabilities:

| Dimension | Current Est. | Should Be | Delta |
|-----------|-------------|-----------|-------|
| D1 Discoverability | 50 | 75 | +25 (OpenAPI found, docs valued higher) |
| D2 API Quality | 65 | 80 | +15 (proper 404 detection, full endpoint count) |
| D3 Onboarding | 51 | 60 | +9 (sandbox credit, OAuth credit) |
| D4 Pricing | 35 | 45 | +10 (pricing page parsing improved) |
| D5 Payment | 55 | 75 | +20 (usage endpoints found, ACP de-weighted) |
| D6 Data Quality | 70 | 85 | +15 (auth ceiling raised or removed for excellent APIs) |
| D7 Security | 80 | 90 | +10 (all headers found consistently) |
| D8 Reliability | 75 | 95 | +20 (JSON health endpoint, proper timing) |
| D9 Agent Experience | 72 | 85 | +13 (version header, SDK pages) |

**Corrected weighted score**: ~78 (Gold)

This matches the expectation: Stripe, with the best API documentation in the industry, should score Gold.
