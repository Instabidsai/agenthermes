# AgentHermes — Full Implementation Plan

> Based on: ~/AgentHermes/research/SYNTHESIS.md (4,700 lines of research)
> Research files: ~/AgentHermes/research/agent-{1-5}-*.md
> Strategy: ~/AgentHermes/STRATEGY.md
> Created: 2026-03-25

---

## Document Map (where everything lives)

| Document | Path | What it contains |
|----------|------|-----------------|
| Research: Protocols | ~/AgentHermes/research/agent-1-protocols.md | A2A, MCP, llms.txt, OpenAPI, Schema.org — full specs |
| Research: Rating Systems | ~/AgentHermes/research/agent-2-rating-systems.md | FICO, D&B, SSL, PageRank — how standards emerge |
| Research: Competitors | ~/AgentHermes/research/agent-3-competitors.md | 11 competitors, gaps, white space |
| Research: Dimensions | ~/AgentHermes/research/agent-4-dimensions.md | 9-dimension rubric design |
| Research: Adoption | ~/AgentHermes/research/agent-5-adoption.md | Badge, SDK, API, revenue model |
| Research: Synthesis | ~/AgentHermes/research/SYNTHESIS.md | Master playbook combining all 5 |
| Strategy | ~/AgentHermes/STRATEGY.md | Business strategy + 4-phase plan |
| Build Prompt | ~/agenthermes-build-prompt.md | Prompt to hand CC session for building |
| THIS PLAN | ~/AgentHermes/IMPLEMENTATION-PLAN.md | How to design and build every component |

---

## The System We're Building

```
                    BUSINESSES                              AGENTS
                        │                                      │
                        ▼                                      ▼
              ┌──────────────────┐                  ┌──────────────────┐
              │  agenthermes.ai  │                  │  Agent SDK/MCP   │
              │                  │                  │                  │
              │  ┌────────────┐  │                  │  hermes.check()  │
              │  │ Free Scan  │  │                  │  hermes.verify() │
              │  │ Enter URL  │  │                  │  hermes.search() │
              │  └─────┬──────┘  │                  └────────┬─────────┘
              │        │         │                           │
              │        ▼         │                           │
              │  ┌────────────┐  │                           │
              │  │  SCANNER   │  │◄──────────────────────────┘
              │  │ 9 Dimensions│  │    API: GET /api/v1/score/{domain}
              │  └─────┬──────┘  │    MCP: check_score tool
              │        │         │    A2A: AgentHermes agent
              │        ▼         │
              │  ┌────────────┐  │
              │  │   SCORE    │  │──── 0-100 across 9 dimensions
              │  │  ENGINE    │  │──── Tier: Bronze/Silver/Gold/Platinum
              │  └─────┬──────┘  │──── Cap rules (no TLS = max Bronze)
              │        │         │
              │   ┌────┴────┐    │
              │   ▼         ▼    │
              │ ┌─────┐ ┌─────┐ │
              │ │Badge│ │.well│ │  Badge: SVG embed for websites
              │ │ SVG │ │known│ │  .well-known: signed JSON for agents
              │ └─────┘ └─────┘ │
              │                  │
              │  ┌────────────┐  │
              │  │ Dashboard  │  │──── Score breakdown per dimension
              │  │ Profile    │  │──── Improvement recommendations
              │  │ Remediate  │  │──── Auto-fix + AffixedAI referral
              │  └────────────┘  │
              │                  │
              │  ┌────────────┐  │
              │  │ Continuous │  │──── Daily re-scans
              │  │ Monitor    │  │──── Mystery shopper agents
              │  │ Anti-Game  │  │──── Anomaly detection
              │  └────────────┘  │
              └──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   Hive Brain     │  Critical BLUs → brain_alerts
              │   Integration    │  Score changes → agent_learning
              └──────────────────┘
```

---

## Phase 0: Foundation (Week 1)

### 0.1 Database Schema (Supabase — NEW project "AgentHermes")

```sql
-- Core business registry
CREATE TABLE businesses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  hermes_id text UNIQUE NOT NULL,  -- AH-2026-XXXXX format
  domain text UNIQUE NOT NULL,
  name text,
  description text,
  industry text,

  -- Score
  total_score int DEFAULT 0,
  tier text DEFAULT 'unrated',  -- unrated/bronze/silver/gold/platinum

  -- Per-dimension scores (0-100 each)
  d1_discoverability int DEFAULT 0,
  d2_interoperability int DEFAULT 0,
  d3_onboarding int DEFAULT 0,
  d4_pricing int DEFAULT 0,
  d5_payment int DEFAULT 0,
  d6_data_quality int DEFAULT 0,
  d7_security int DEFAULT 0,
  d8_reliability int DEFAULT 0,
  d9_agent_experience int DEFAULT 0,

  -- Metadata
  a2a_agent_card jsonb,
  mcp_endpoints text[],
  llms_txt_url text,
  openapi_url text,

  -- Certification
  certified boolean DEFAULT false,
  certification_tier text,
  certification_expires timestamptz,

  -- Commerce
  stripe_connect_id text,
  payment_protocols text[],  -- ['stripe', 'acp', 'mpp']

  -- Tracking
  scan_count int DEFAULT 0,
  last_scanned_at timestamptz,
  first_scanned_at timestamptz,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Detailed scan results (one per scan)
CREATE TABLE scan_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id),

  -- Raw check results per dimension
  d1_checks jsonb,  -- {agent_card: {found: true, valid: true, fields: [...]}, llms_txt: {...}, ...}
  d2_checks jsonb,
  d3_checks jsonb,
  d4_checks jsonb,
  d5_checks jsonb,
  d6_checks jsonb,
  d7_checks jsonb,
  d8_checks jsonb,
  d9_checks jsonb,

  -- Scores
  d1_score int, d2_score int, d3_score int, d4_score int, d5_score int,
  d6_score int, d7_score int, d8_score int, d9_score int,
  total_score int,
  tier text,

  -- Cap rules applied
  caps_applied jsonb,  -- [{rule: "no_tls", capped_to: 39}]

  -- Recommendations
  improvements jsonb,  -- [{dimension: "d1", action: "Add Agent Card", impact: "+15 points"}]

  scanned_at timestamptz DEFAULT now()
);

-- Continuous monitoring
CREATE TABLE monitoring_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id),
  event_type text,  -- 'score_change', 'downtime', 'security_issue', 'endpoint_removed'
  details jsonb,
  severity text,  -- 'info', 'warning', 'critical'
  created_at timestamptz DEFAULT now()
);

-- Mystery shopper results
CREATE TABLE mystery_shops (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id),
  test_type text,  -- 'api_call', 'onboarding', 'payment', 'data_quality'
  passed boolean,
  response_ms int,
  details jsonb,
  tested_at timestamptz DEFAULT now()
);

-- Badge tracking
CREATE TABLE badge_impressions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id),
  badge_type text,  -- 'svg', 'widget', 'well_known'
  referrer text,
  created_at timestamptz DEFAULT now()
);

-- Certification applications
CREATE TABLE certifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id),
  tier_requested text,
  status text DEFAULT 'pending',  -- pending/reviewing/approved/denied/expired
  reviewer_notes text,
  approved_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

### 0.2 Score Engine (the brain)

Build as a Supabase Edge Function or Next.js API route:

```
POST /api/v1/scan
Input: { domain: "example.com" }

Process:
1. Generate hermes_id if new business (AH-2026-XXXXX)
2. Run 9 dimension scanners in parallel
3. Calculate raw scores per dimension
4. Apply weights: D1×0.20 + D2×0.20 + D3×0.10 + D4×0.10 + D5×0.10 + D6×0.10 + D7×0.10 + D8×0.05 + D9×0.05
5. Apply cap rules:
   - No TLS → capped at 39 (max Bronze)
   - No Agent Card → capped at 59 (max Bronze)
   - No callable endpoints → capped at 29
6. Determine tier from total score
7. Generate recommendations (ordered by point impact)
8. Save to scan_results
9. Update businesses table

Output: {
  hermes_id: "AH-2026-78F3D",
  domain: "example.com",
  total_score: 67,
  tier: "silver",
  dimensions: { d1: 72, d2: 81, d3: 45, ... },
  caps_applied: [],
  improvements: [
    { dimension: "d3", action: "Add programmatic signup endpoint", impact: "+12 points" },
    ...
  ],
  scanned_at: "2026-03-25T..."
}
```

### 0.3 The 9 Dimension Scanners

Each dimension gets its own scanner module. All run in parallel.

**D1: Discoverability Scanner**
- Fetch `/.well-known/agent-card.json` → validate A2A spec
- Fetch `/llms.txt` → validate format
- Fetch `/robots.txt` → check for AI directives
- Fetch OpenAPI spec URL if discoverable
- Check Schema.org/JSON-LD on homepage
- Check for `/.well-known/mcp.json`
- Check for `AGENTS.md` at repo root (if GitHub linked)
- Score based on point table from SYNTHESIS.md

**D2: Interoperability Scanner**
- If MCP endpoints found → test each tool (call with sample input)
- If REST API found → test each endpoint (OPTIONS, then GET/POST)
- Validate response schemas against declared specs
- Measure response times (p95 target: <2s for Silver, <200ms for Platinum)
- Check HTTP status codes are correct
- Verify versioning

**D3: Onboarding Scanner**
- Check for `/signup`, `/register`, `/api/auth` endpoints
- Test if programmatic signup is possible (without browser)
- Check if API key is returned programmatically
- Measure steps to first API call
- Check for sandbox/test mode

**D4: Pricing Scanner**
- Fetch `/api/pricing` or pricing page
- Check if pricing is in structured format (JSON, not just HTML)
- Validate currency codes (ISO 4217)
- Check for plan comparison data
- Look for usage tier information

**D5: Payment Scanner (UNIQUE TO US)**
- Check Stripe Connect integration
- Check for ACP/MPP/x402 support
- Test if payments can be initiated programmatically
- Check multi-currency support
- Look for refund API

**D6: Data Quality Scanner**
- Sample API responses (5-10 calls)
- Check null rates across responses
- Validate against declared schema
- Check date formats (ISO 8601)
- Check field naming consistency
- Assess data freshness (timestamps)

**D7: Security Scanner**
- Check TLS version and certificate
- Test auth endpoints for rate limiting
- Check for exposed error details (stack traces)
- Validate CORS configuration
- Check security headers (CSP, HSTS, X-Frame-Options, etc.)
- Run basic OWASP checks

**D8: Reliability Scanner**
- Check for `/health` or `/status` endpoint
- Measure uptime (if historical data available)
- Calculate p95 latency across test calls
- Check 5xx rate
- Look for published SLA

**D9: Agent Experience Scanner**
- Check for `X-Request-ID` headers
- Validate error response structure
- Check for escalation path (support contact in Agent Card)
- Look for SDK/documentation links
- Check for deprecation headers/notices

---

## Phase 1: The Score (Weeks 1-2)

### 1.1 Build the Scanner
All 9 dimension scanners built as modular functions. Each returns:
```json
{ "score": 72, "checks": [...], "recommendations": [...] }
```

### 1.2 Build the Score API
```
GET  /api/v1/score/{domain}     → cached score + tier
POST /api/v1/scan               → fresh scan
GET  /api/v1/score/{domain}/details → full breakdown
GET  /api/v1/batch              → bulk check (up to 100 domains)
```

### 1.3 Build the Badge System
- Dynamic SVG at `badge.agenthermes.ai/v1/{hermes_id}.svg`
- JavaScript widget at `badge.agenthermes.ai/widget.js`
- `.well-known/agent-hermes.json` spec + generator

### 1.4 Build the Dashboard
- `/` — Landing page with URL input ("What's your score?")
- `/score/{domain}` — Public score page with breakdown
- `/dashboard` — Logged-in business owner view
- `/leaderboard` — Top scores by industry

### 1.5 Seed with Portfolio
Scan all 17 portfolio companies. Fix the ones that fail. Use results as case studies.

---

## Phase 2: The Standard (Weeks 3-5)

### 2.1 `.well-known/agent-hermes.json` Specification
Design the spec. Publish it. This is the SSL certificate model:
```json
{
  "hermes_id": "AH-2026-78F3D",
  "domain": "example.com",
  "score": 78,
  "tier": "gold",
  "dimensions": { "d1": 85, "d2": 78, ... },
  "certified": true,
  "certification_expires": "2027-03-25",
  "last_scanned": "2026-03-25T12:00:00Z",
  "signature": "base64-signed-by-agenthermes"
}
```
Agents fetch this from the business's domain. Verify the signature against AgentHermes public key. No API call needed.

### 2.2 Agent SDK
```python
# Python
from agenthermes import check
result = check("example.com")
if result.tier >= "gold":
    proceed_with_transaction()
```

```typescript
// TypeScript
import { check } from '@agenthermes/sdk';
const result = await check('example.com');
if (result.tier >= 'gold') proceedWithTransaction();
```

### 2.3 MCP Server
AgentHermes as an MCP server so any agent framework can check scores:
- `check_score(domain)` → score + tier
- `get_details(domain)` → full breakdown
- `search_businesses(capability, min_tier)` → discovery
- `verify_hermes_json(domain)` → validate .well-known

### 2.4 A2A Agent
AgentHermes as an A2A agent:
- Agent Card at `/.well-known/agent-card.json`
- Skills: score_check, business_search, certification_verify
- Agents can discover AgentHermes via A2A and use it

### 2.5 Continuous Monitoring
- Daily re-scan of all certified businesses
- Score change alerts (email + webhook)
- Mystery shopper agents running random tests weekly

---

## Phase 3: Monetization (Weeks 5-8)

### 3.1 Pricing Tiers

| Tier | Price | What You Get |
|------|-------|-------------|
| Free | $0 | Scan + public score page + basic badge |
| Silver Certified | $99/mo | Continuous monitoring + premium badge + improvement recommendations |
| Gold Certified | $299/mo | + Mystery shopper testing + priority re-scans + remediation recommendations |
| Platinum Certified | $999/mo | + Human auditor review + SLA + dedicated support + .well-known generator |

| API Tier | Price | Calls |
|----------|-------|-------|
| Developer | $49/mo | 1,000 checks/mo |
| Professional | $299/mo | 10,000 checks/mo |
| Enterprise | Custom | Unlimited + SLA |

### 3.2 AffixedAI Integration
When a business scores below Gold and the gap is fixable:
- Dashboard shows "Get to Gold with AffixedAI" CTA
- One-click referral with score details pre-filled
- AffixedAI engagement starts with the exact dimension gaps
- Revenue share: AgentHermes gets 10% referral fee

### 3.3 Hive Brain Integration
- Critical score drops → brain_alerts to Portfolio HQ
- New Gold+ businesses → learning posted for relevant CEOs
- Portfolio company scores tracked in company_goals

---

## Phase 4: The Fannie Mae Play (Months 3-6)

### Target: Stripe
- AgentHermes scores as metadata in ACP merchant profiles
- Stripe agents check score before initiating transactions
- Joint announcement: "Stripe + AgentHermes ensure trusted agent commerce"

### How to approach:
1. Build the integration (Stripe Connect already in our stack)
2. Publish data: "State of Agent Readiness Q2 2026" with 10,000+ businesses scored
3. Show that scored businesses have higher transaction completion rates
4. Approach Stripe partnerships team with working integration + data

---

## Design Principles (from our 14 beliefs)

1. **Data dominates** (Belief #13) — The scanner checks DATA quality, not just API availability
2. **Structural safety** (Belief #2) — Cap rules enforce hard requirements, not suggestions
3. **API-first** (Belief #14) — AgentHermes itself must score Platinum on its own audit
4. **Compound everything** (Belief #4) — Every scan makes the system smarter. Continuous monitoring compounds trust.
5. **Information asymmetry** (Belief #11) — Our 2,600+ scored businesses IS the moat
6. **Verification loops** (Belief #8) — Mystery shoppers are verification loops applied to commerce

---

## Build Sequence (give to the AgentHermes CC session)

| Step | What | Priority | Est. Time |
|------|------|----------|-----------|
| 1 | Database schema (Supabase) | P0 | 1 day |
| 2 | 9 dimension scanners | P0 | 1 week |
| 3 | Score engine (weights + caps + tiers) | P0 | 2 days |
| 4 | Score API (scan, check, details, batch) | P0 | 3 days |
| 5 | Landing page ("What's your score?") | P0 | 2 days |
| 6 | Score page (public breakdown) | P0 | 2 days |
| 7 | Dynamic SVG badge | P0 | 1 day |
| 8 | Seed with 17 portfolio companies | P0 | 1 day |
| 9 | .well-known/agent-hermes.json spec | P1 | 3 days |
| 10 | MCP server | P1 | 3 days |
| 11 | Python + TypeScript SDKs | P1 | 3 days |
| 12 | Continuous monitoring | P1 | 1 week |
| 13 | Dashboard (business owner view) | P1 | 3 days |
| 14 | Leaderboard | P1 | 1 day |
| 15 | A2A Agent Card (eat our own dogfood) | P1 | 1 day |
| 16 | Mystery shopper agents | P2 | 1 week |
| 17 | Certification workflow | P2 | 3 days |
| 18 | AffixedAI referral integration | P2 | 2 days |
| 19 | Hive Brain integration | P2 | 2 days |
| 20 | "State of Agent Readiness" report | P2 | 1 week |
| 21 | AgentHermes ID system | P2 | 2 days |
| 22 | Framework integrations (LangChain, CrewAI) | P3 | 1 week |
| 23 | IETF Internet-Draft | P3 | 2 weeks |
| 24 | Stripe ACP integration | P3 | 2 weeks |

---

## Non-Negotiable Rules

1. **Payment NEVER influences scoring.** Free businesses score identically to Platinum-paying businesses. Publish this commitment.
2. **AgentHermes must score Platinum on itself.** Eat your own dogfood. If we don't pass our own audit, we have no credibility.
3. **Open methodology, proprietary weights.** Publish what we check. Keep how we weight it proprietary.
4. **Continuous monitoring, not point-in-time.** A score from 30 days ago is not a current score.
5. **The .well-known/agent-hermes.json is the killer feature.** Prioritize it. This is what makes us infrastructure.
