# AgentHermes Real-World Scan Results

> Scanned 2026-03-27 via `POST https://agenthermes.ai/api/v1/scan`
> All 10 scans completed successfully. DB persistence failed on all (see note at bottom).

## Leaderboard

| Rank | Domain          | Score | Tier       | Hermes ID           |
|------|-----------------|-------|------------|---------------------|
| 1    | vercel.com      | 50    | Bronze     | AH-2026-73CA0646    |
| 2    | linear.app      | 40    | Bronze     | AH-2026-37DBD56A    |
| 3    | notion.so       | 38    | Unaudited  | AH-2026-674F9356    |
| 4    | github.com      | 33    | Unaudited  | AH-2026-947C84D8    |
| 5    | stripe.com      | 31    | Unaudited  | AH-2026-44C1E35C    |
| 6    | openai.com      | 27    | Unaudited  | AH-2026-5AB677B8    |
| 7    | shopify.com     | 24    | Unaudited  | AH-2026-480F242F    |
| 8    | cloudflare.com  | 21    | Unaudited  | AH-2026-30F501F7    |
| 9    | supabase.com    | 20    | Unaudited  | AH-2026-B7558C5A    |
| 10   | anthropic.com   | 19    | Unaudited  | AH-2026-78FB1A4E    |

**Average score: 30.3 / 100**
**Tier distribution: 2 Bronze, 8 Unaudited, 0 Silver, 0 Gold, 0 Platinum**

## Per-Domain Dimension Breakdown

### 1. vercel.com (Score: 50, Tier: Bronze)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 60    | 0.20   |
| D2        | Interoperability  | 60    | 0.20   |
| D3        | Onboarding        | 65    | 0.10   |
| D4        | Pricing           | 25    | 0.10   |
| D5        | Payment           | 0     | 0.10   |
| D6        | Data Quality      | 40    | 0.10   |
| D7        | Security          | 70    | 0.10   |
| D8        | Reliability       | 70    | 0.05   |
| D9        | Agent Experience  | 45    | 0.05   |

**Top 3 dimensions**: Security (70), Reliability (70), Onboarding (65)
**Key strengths**: llms.txt, AGENTS.md, OAuth/OIDC, API key endpoints, sandbox, free tier, SLA published
**Biggest gaps**: Payment (0), Pricing Transparency (25), Data Quality (40)

---

### 2. linear.app (Score: 40, Tier: Bronze)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 60    | 0.20   |
| D2        | Interoperability  | 55    | 0.20   |
| D3        | Onboarding        | 45    | 0.10   |
| D4        | Pricing           | 10    | 0.10   |
| D5        | Payment           | 0     | 0.10   |
| D6        | Data Quality      | 0     | 0.10   |
| D7        | Security          | 65    | 0.10   |
| D8        | Reliability       | 65    | 0.05   |
| D9        | Agent Experience  | 30    | 0.05   |

**Top 3 dimensions**: Security (65), Reliability (65), Discoverability (60)
**Key strengths**: llms.txt, AGENTS.md, OAuth tokens, sandbox, SLA, 5 API endpoints
**Biggest gaps**: Payment (0), Data Quality (0), Pricing (10)

---

### 3. notion.so (Score: 38, Tier: Unaudited)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 40    | 0.20   |
| D2        | Interoperability  | 47    | 0.20   |
| D3        | Onboarding        | 20    | 0.10   |
| D4        | Pricing           | 10    | 0.10   |
| D5        | Payment           | 0     | 0.10   |
| D6        | Data Quality      | 80    | 0.10   |
| D7        | Security          | 70    | 0.10   |
| D8        | Reliability       | 35    | 0.05   |
| D9        | Agent Experience  | 15    | 0.05   |

**Top 3 dimensions**: Data Quality (80), Security (70), Interoperability (47)
**Key strengths**: llms.txt, MCP manifest at /.well-known/mcp.json, excellent data quality (0% null rate), sandbox
**Biggest gaps**: Payment (0), Pricing (10), Agent Experience (15)

---

### 4. github.com (Score: 33, Tier: Unaudited)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 46    | 0.20   |
| D2        | Interoperability  | 40    | 0.20   |
| D3        | Onboarding        | 30    | 0.10   |
| D4        | Pricing           | 10    | 0.10   |
| D5        | Payment           | 0     | 0.10   |
| D6        | Data Quality      | 0     | 0.10   |
| D7        | Security          | 70    | 0.10   |
| D8        | Reliability       | 75    | 0.05   |
| D9        | Agent Experience  | 30    | 0.05   |

**Top 3 dimensions**: Reliability (75), Security (70), Discoverability (46)
**Key strengths**: llms.txt, MCP manifest found, sandbox, SLA/status page, 50ms avg response time, health endpoint
**Biggest gaps**: Payment (0), Data Quality (0), Pricing (10)

---

### 5. stripe.com (Score: 31, Tier: Unaudited)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 36    | 0.20   |
| D2        | Interoperability  | 40    | 0.20   |
| D3        | Onboarding        | 23    | 0.10   |
| D4        | Pricing           | 10    | 0.10   |
| D5        | Payment           | 10    | 0.10   |
| D6        | Data Quality      | 0     | 0.10   |
| D7        | Security          | 70    | 0.10   |
| D8        | Reliability       | 55    | 0.05   |
| D9        | Agent Experience  | 30    | 0.05   |

**Top 3 dimensions**: Security (70), Reliability (55), Interoperability (40)
**Key strengths**: llms.txt, Stripe.js detected, developer docs with auth docs, health endpoint, 184ms avg
**Biggest gaps**: Data Quality (0), Payment (10 -- ironic for a payment company), Pricing (10)

---

### 6. openai.com (Score: 27, Tier: Unaudited)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 10    | 0.20   |
| D2        | Interoperability  | 45    | 0.20   |
| D3        | Onboarding        | 30    | 0.10   |
| D4        | Pricing           | 0     | 0.10   |
| D5        | Payment           | 60    | 0.10   |
| D6        | Data Quality      | 0     | 0.10   |
| D7        | Security          | 55    | 0.10   |
| D8        | Reliability       | 23    | 0.05   |
| D9        | Agent Experience  | 15    | 0.05   |

**Top 3 dimensions**: Payment (60), Security (55), Interoperability (45)
**Key strengths**: Payment endpoints (billing, usage, subscribe, checkout), 3 API endpoints, signup endpoints detected
**Biggest gaps**: Data Quality (0), Pricing (0), Discoverability (10 -- no llms.txt, no agent card)

---

### 7. shopify.com (Score: 24, Tier: Unaudited)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 30    | 0.20   |
| D2        | Interoperability  | 30    | 0.20   |
| D3        | Onboarding        | 10    | 0.10   |
| D4        | Pricing           | 25    | 0.10   |
| D5        | Payment           | 0     | 0.10   |
| D6        | Data Quality      | 0     | 0.10   |
| D7        | Security          | 47    | 0.10   |
| D8        | Reliability       | 55    | 0.05   |
| D9        | Agent Experience  | 30    | 0.05   |

**Top 3 dimensions**: Reliability (55), Security (47), Discoverability (30)
**Key strengths**: llms.txt, free tier/trial, developer portal, health endpoint, SDKs
**Biggest gaps**: Payment (0), Data Quality (0), Onboarding (10)

---

### 8. cloudflare.com (Score: 21, Tier: Unaudited)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 10    | 0.20   |
| D2        | Interoperability  | 30    | 0.20   |
| D3        | Onboarding        | 10    | 0.10   |
| D4        | Pricing           | 20    | 0.10   |
| D5        | Payment           | 0     | 0.10   |
| D6        | Data Quality      | 0     | 0.10   |
| D7        | Security          | 60    | 0.10   |
| D8        | Reliability       | 70    | 0.05   |
| D9        | Agent Experience  | 0     | 0.05   |

**Top 3 dimensions**: Reliability (70), Security (60), Interoperability (30)
**Key strengths**: SLA/status page, fast responses (219ms avg), rate limits in pricing, HSTS
**Biggest gaps**: Payment (0), Data Quality (0), Agent Experience (0 -- no support page, no SDKs linked)

---

### 9. supabase.com (Score: 20, Tier: Unaudited)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 30    | 0.20   |
| D2        | Interoperability  | 15    | 0.20   |
| D3        | Onboarding        | 10    | 0.10   |
| D4        | Pricing           | 10    | 0.10   |
| D5        | Payment           | 0     | 0.10   |
| D6        | Data Quality      | 0     | 0.10   |
| D7        | Security          | 55    | 0.10   |
| D8        | Reliability       | 60    | 0.05   |
| D9        | Agent Experience  | 15    | 0.05   |

**Top 3 dimensions**: Reliability (60), Security (55), Discoverability (30)
**Key strengths**: llms.txt, MCP endpoint found (not valid JSON), SLA page, fastest response (46ms avg)
**Biggest gaps**: Payment (0), Data Quality (0), Onboarding (10)

---

### 10. anthropic.com (Score: 19, Tier: Unaudited)

| Dimension | Label             | Score | Weight |
|-----------|-------------------|-------|--------|
| D1        | Discoverability   | 10    | 0.20   |
| D2        | Interoperability  | 30    | 0.20   |
| D3        | Onboarding        | 0     | 0.10   |
| D4        | Pricing           | 10    | 0.10   |
| D5        | Payment           | 0     | 0.10   |
| D6        | Data Quality      | 0     | 0.10   |
| D7        | Security          | 70    | 0.10   |
| D8        | Reliability       | 43    | 0.05   |
| D9        | Agent Experience  | 15    | 0.05   |

**Top 3 dimensions**: Security (70), Reliability (43), Interoperability (30)
**Key strengths**: Full security headers (HSTS, CSP, X-Frame-Options, nosniff), pricing page
**Biggest gaps**: Payment (0), Onboarding (0 -- no dev portal, no OAuth, no sandbox), Data Quality (0)

---

## Cross-Domain Analysis

### Industry Averages by Dimension

| Dimension          | Avg Score | Highest                  | Lowest                   |
|--------------------|-----------|--------------------------|--------------------------|
| D1 Discoverability | 33.2      | vercel.com (60)          | anthropic.com (10)       |
| D2 Interoperability| 39.2      | vercel.com (60)          | supabase.com (15)        |
| D3 Onboarding      | 24.3      | vercel.com (65)          | anthropic.com (0)        |
| D4 Pricing         | 13.0      | shopify.com (25)         | openai.com (0)           |
| D5 Payment         | 7.0       | openai.com (60)          | 7 companies at 0         |
| D6 Data Quality    | 12.0      | notion.so (80)           | 7 companies at 0         |
| D7 Security        | 63.2      | stripe/github/notion (70)| shopify.com (47)         |
| D8 Reliability     | 55.3      | github.com (75)          | openai.com (23)          |
| D9 Agent Experience| 22.5      | vercel.com (45)          | cloudflare.com (0)       |

### Key Findings

1. **Nobody scores above 50.** Even the best (Vercel at 50) is only Bronze tier. The agent-readiness landscape is immature.
2. **Payment is the universal gap.** 7/10 companies scored 0 on Payment (D5). Only OpenAI (60) has meaningful payment APIs.
3. **Data Quality is nearly absent.** 7/10 scored 0 because their public-facing endpoints don't return JSON.
4. **Security is the strongest dimension.** Every company scored 47+ on Security (D7), with most at 55-70.
5. **Discoverability is emerging.** 7/10 have llms.txt, but only 2 have AGENTS.md (Vercel, Linear). Only 3 have any MCP presence.
6. **Pricing transparency is terrible.** Average of 13/100. No company has a machine-readable pricing API.
7. **Vercel leads** thanks to AGENTS.md, OAuth/OIDC, API key endpoints, sandbox, and free tier -- most "agent-complete" onboarding.
8. **Anthropic scores lowest** (19) despite being an AI company -- no llms.txt, no dev portal, no onboarding, no MCP.

### What Would Move the Needle

| Action                         | Companies Missing | Impact  |
|--------------------------------|-------------------|---------|
| Machine-readable pricing API   | 10/10             | +35 pts |
| Programmatic signup endpoint   | 10/10             | +30 pts |
| Agent card (/.well-known/agent.json) | 10/10      | +25 pts |
| JSON error responses           | 9/10              | +25 pts |
| MCP server                     | 8/10              | +25 pts |
| llms.txt                       | 3/10              | +20 pts |
| API key generation endpoint    | 8/10              | +20 pts |
| X-Request-ID headers           | 10/10             | +20 pts |

---

## DB Persistence Issue

All 10 scans returned `_db_error: "Failed to save scan results. Scorecard is still valid."` The error occurs at the `businesses` table upsert in `/api/v1/scan/route.ts` (line 84-101). The scorecard computation works correctly but results are not persisted to Supabase. This needs investigation -- likely a schema mismatch or missing columns in the `businesses` table on the production Supabase instance (`jcuwzyjdpjmpxpsawudf`).

To fix: check the `businesses` table schema matches the upsert fields (domain, name, slug, audit_score, audit_tier, pricing_visible, agent_onboarding, mcp_endpoints, updated_at) and ensure `domain` has a unique constraint for the `onConflict: 'domain'` clause.
