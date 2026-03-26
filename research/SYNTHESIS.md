# AgentHermes SYNTHESIS — The Definitive Agent Readiness Standard

> Synthesized from 5 parallel research agents | March 25, 2026
> Sources: 4,700+ lines of research across protocols, rating systems, competitors, scoring design, and adoption strategy

---

## Executive Summary

AgentHermes is positioned to own the **missing layer** in the agentic standards stack. Every protocol (MCP, A2A, ACP, UCP, Visa TAP) defines HOW to be agent-ready. Nobody defines HOW TO MEASURE whether you are. AgentHermes fills that gap — becoming to agent-readiness what SSL Labs is to TLS, what Lighthouse is to web performance, and what FICO is to creditworthiness.

**Key findings:**
- 11 direct competitors identified; none measure payment acceptance, structured pricing, or cross-protocol compliance
- Every successful rating standard follows the same lifecycle: Creation → Early Adoption → Institutional Endorsement → Mass Adoption → Infrastructure
- AgentHermes is at Phase 1 (2,600+ scored). The critical transition is Phase 2→3: getting a major platform (Stripe/OpenAI/Anthropic/Google) to mandate or surface the score
- The optimal scoring system has 9 dimensions (up from current 5), weighted to mirror the agent transaction flow
- Revenue model: $1.6M Year 1 → $15.3M Year 3 via tiered certification + API access

---

## 1. The Definitive Scoring Rubric

### 1.1 Nine Dimensions (expanded from 5)

| # | Dimension | Weight | What It Measures | Status |
|---|-----------|--------|-----------------|--------|
| D1 | **Discoverability** | 20% | Agent Card, llms.txt, Schema.org, robots.txt, MCP discovery, AGENTS.md | EXISTING (expanded) |
| D2 | **Interoperability** | 20% | Live MCP/REST/A2A endpoints, schema validation, response quality, latency | EXISTING (expanded) |
| D3 | **Onboarding** | 10% | Programmatic signup, API key issuance, sandbox access, zero-friction flow | EXISTING |
| D4 | **Pricing Transparency** | 10% | Machine-readable pricing, plan comparison, usage tiers, currency codes | EXISTING |
| D5 | **Payment Readiness** | 10% | Stripe Connect, MPP, ACP, x402, multi-currency, refund API | EXISTING |
| D6 | **Data Quality** | 10% | Schema compliance, null rates, field consistency, freshness, format validity | **NEW** |
| D7 | **Security Posture** | 10% | TLS, auth, rate limiting, input validation, error sanitization, OWASP | **NEW** |
| D8 | **Reliability** | 5% | Uptime, p95 latency, 5xx rate, status endpoint, SLA | **NEW** |
| D9 | **Agent Experience** | 5% | Escalation path, request IDs, structured errors, docs, observability | **NEW** |

**Design rationale:** Weights mirror the agent transaction flow:
- **Discovery + Interaction = 40%** — prerequisites; without them, nothing else matters (analogous to FICO's Payment History + Amounts Owed = 65%)
- **Onboarding + Pricing + Payment = 30%** — transaction capability
- **Data Quality + Security = 20%** — trust signals
- **Reliability + Agent Experience = 10%** — operational maturity (develops over time)

### 1.2 Score Calculation

```
Total = (D1 × 0.20) + (D2 × 0.20) + (D3 × 0.10) + (D4 × 0.10)
      + (D5 × 0.10) + (D6 × 0.10) + (D7 × 0.10) + (D8 × 0.05)
      + (D9 × 0.05)
```

**Cap Rules (applied after calculation):**
1. **No TLS → capped at 39** (max Bronze). Mirrors SSL Labs' immediate-F pattern.
2. **No Agent Card → capped at 59** (max Bronze). No discoverability = can't reach Silver.
3. **No callable API endpoints → capped at 29**. Business is invisible to agents.

### 1.3 Updated Tier Thresholds

| Tier | Range | Badge Text | Hard Requirements |
|------|-------|-----------|-------------------|
| **Unrated** | 0-19 | "Not Yet Rated" | No agent-facing surface detected |
| **Bronze** | 20-49 | "Agent Discoverable" | ≥1 machine-readable profile element + ≥1 callable endpoint |
| **Silver** | 50-69 | "Agent Compatible" | Bronze + valid A2A Agent Card + HTTPS + ≥3 endpoints with schema + escalation path |
| **Gold** | 70-84 | "Agent Commerce Ready" | Silver + MCP server (5+ tools) + pricing endpoint + payment via ≥1 protocol + 99% uptime + data quality ≥50 |
| **Platinum** | 85-100 | "Agent Commerce Certified" | Gold + multi-protocol (MCP+A2A+REST) + zero-friction onboarding (<5min) + 99.9% uptime + security ≥75 + full agent experience stack |

### 1.4 Each Dimension — What Scores 0/50/100

**D1: Discoverability (20%)**
- 0: No Agent Card, no llms.txt, no Schema.org. Invisible.
- 50: Valid A2A Agent Card at `/.well-known/agent-card.json` with name, description, ≥1 skill. OR llms.txt + OpenAPI spec.
- 100: Complete Agent Card (signed) + llms.txt + AGENTS.md + OpenAPI 3.1 + Schema.org/JSON-LD + MCP discovery at `/.well-known/mcp.json` + 3+ protocols.

**D2: Interoperability (20%)**
- 0: No callable endpoints or all return HTML/5xx.
- 50: MCP server OR REST API with 3+ endpoints, valid JSON responses, proper HTTP status codes, p95 <2s.
- 100: Full MCP server (tools+resources+prompts) + all schemas validated + versioned API + health check + p95 <200ms.

**D3: Onboarding (10%)**
- 0: Requires phone call or manual approval.
- 50: API endpoint for signup that returns credentials. May require email verification.
- 100: Zero-friction: OAuth 2.0 client credentials or single POST returns API key. Sandbox pre-populated. Credential rotation. MCP `create_account` tool.

**D4: Pricing Transparency (10%)**
- 0: No pricing info or PDF-only. "Contact sales."
- 50: `GET /api/pricing` returns JSON with plan names, prices (ISO 4217 currency codes), billing intervals.
- 100: Complete pricing API with all plans, usage tiers, volume discounts, price change webhooks, UCP-compliant markup.

**D5: Payment Readiness (10%)**
- 0: Invoice-only or manual bank transfer.
- 50: API-initiated payments via Stripe PaymentIntents or equivalent. Single currency.
- 100: Stripe Connect + MPP + ACP + multi-currency + usage metering + refund API + payment receipt in machine-readable format.

**D6: Data Quality (10%)**
- 0: >50% null required fields, inconsistent naming, mixed date formats.
- 50: Responses match declared schema, <10% null rate, ISO 8601 dates, timestamps within 30 days.
- 100: 100% schema compliance, 0% unexplained nulls, <24h fresh, semantic field names, data provenance metadata.

**D7: Security Posture (10%)**
- 0: No TLS. No auth. Stack traces exposed.
- 50: TLS 1.2+, API key via Authorization header, rate limiting (429), clean errors, CORS configured.
- 100: TLS 1.3 + OAuth 2.0/JWT + per-agent rate limits + OWASP API Top 10 clean + credential rotation + security.txt + SOC 2 reference.

**D8: Reliability (5%)**
- 0: >20% downtime or p95 >10s.
- 50: 99% uptime, p95 <2s, 5xx rate <1%.
- 100: 99.99% uptime, p95 <200ms, status API with historical data, published SLA, maintenance webhooks.

**D9: Agent Experience (5%)**
- 0: No escalation path, no request IDs, no documentation.
- 50: Support contact in Agent Card, `X-Request-ID` headers, structured error responses, API docs.
- 100: Real-time escalation endpoint, OpenTelemetry tracing, usage dashboard API, SDKs in 2+ languages, deprecation notices.

---

## 2. Protocol Requirements by Tier

### Required vs Recommended at Each Tier

| Protocol | Bronze | Silver | Gold | Platinum |
|----------|--------|--------|------|----------|
| **A2A Agent Card** (`/.well-known/agent-card.json`) | Recommended | **REQUIRED** | Required | Required |
| **MCP Server** (Streamable HTTP) | — | Recommended | **REQUIRED** (5+ tools) | Required |
| **llms.txt** | Recommended | Recommended | Recommended | Recommended |
| **Schema.org/JSON-LD** | Recommended | Recommended | Recommended | Required |
| **OpenAPI 3.1+** (if API exists) | — | Recommended | **REQUIRED** | Required |
| **robots.txt** (AI crawler directives) | Recommended | **REQUIRED** | Required | Required |
| **HTTPS/TLS 1.2+** | **REQUIRED** (cap rule) | Required | Required | Required (TLS 1.3) |
| **UCP** (e-commerce) | — | — | Recommended | Recommended |
| **ACP/MPP** (payments) | — | — | Recommended | **REQUIRED** (≥1) |
| **AGENTS.md** | — | — | Recommended | Recommended |
| **agents.json** | — | — | — | Recommended |
| **`/.well-known/agent-hermes.json`** | — | Available | Available | **REQUIRED** |

### Protocol Scoring Breakdown (within D1: Discoverability)

| Check | Points | Category |
|-------|--------|----------|
| Agent Card at `/.well-known/agent-card.json` (valid JSON, required fields) | 10 | Tier 1 |
| Agent Card with capabilities, skills, security schemes | 5 | Tier 1 |
| MCP server advertised via `/.well-known/mcp.json` | 5 | Tier 1 |
| Schema.org/JSON-LD on homepage | 3 | Tier 1 |
| OpenAPI spec at discoverable endpoint | 5 | Tier 1 |
| robots.txt with AI-specific directives | 2 | Tier 1 |
| llms.txt with content map | 5 | Tier 2 |
| AGENTS.md with integration instructions | 3 | Tier 2 |
| Multi-protocol bonus (2 protocols = +7, 3+ = +15) | up to 15 | Bonus |
| **Total raw points** | **58** | *Normalized to 0-100* |

---

## 3. Adoption Strategy

### 3.1 The Playbook: SSL → FICO → BitSight

The three most successful adoption patterns apply directly:

1. **Let's Encrypt Phase** (make it free): Free instant score for any URL. Scan 10,000+ businesses. Publish "State of Agent Readiness" report. Ship free badge.
2. **Chrome Warning Phase** (make it visible): Partner with agent frameworks to show "Unverified" labels. Ship SDK + MCP server. Get one platform to display scores.
3. **Fannie Mae Phase** (make it required): Get Stripe/Shopify/OpenAI to require or surface scores. Establish certification as recognized standard.

### 3.2 Which Side First: Supply (Businesses)

Start with supply. Rationale:
- Businesses have immediate motivation ("$1T in agent commerce — are you invisible?")
- Free scoring removes friction
- Businesses will share/brag about scores (competitive pressure)
- You can score without permission (like SSL Labs, like BitSight)
- The database of scored businesses IS the product that makes the agent SDK valuable

### 3.3 Badge Design: Triple Implementation

**A) Dynamic SVG Badge** (for websites):
```html
<a href="https://agenthermes.ai/verify/{{BUSINESS_ID}}">
  <img src="https://badge.agenthermes.ai/v1/{{BUSINESS_ID}}.svg"
       alt="AgentHermes Gold - Score 78/100" width="180" height="60" />
</a>
```

**B) JavaScript Widget** (richer experience, expandable on hover):
```html
<script src="https://badge.agenthermes.ai/widget.js"
        data-business-id="{{BUSINESS_ID}}" data-theme="light"></script>
```

**C) Machine-Readable Verification** (for agents — the killer feature):
```
GET /.well-known/agent-hermes.json
```
Returns cryptographically signed JSON with score, tier, category breakdown, last audit date. This is the SSL certificate model for agent commerce.

### 3.4 Trust Badge Conversion Data

| Badge Type | Proven Conversion Lift |
|-----------|----------------------|
| Norton Secured | 11% overall, 52% from paid search |
| McAfee SECURE | 15.7-21.5% (95-97% confidence) |
| Generic trust badge | 12.2% conversion boost |
| Trust badges (general) | Up to 42% more form conversions |

For agents, the impact is binary: they either trust and transact, or they don't.

### 3.5 Go-to-Market Sequence

**Phase 0: Foundation (Weeks 1-4)**
- Build automated scanner for 9 dimensions
- Design dynamic SVG badge + `/.well-known/agent-hermes.json` spec
- Build REST API (`/score`, `/check`, `/scan`)
- Scan top 1,000 SaaS/API companies

**Phase 1: Free Adoption (Months 1-3)**
- Launch free score checker at agenthermes.ai
- Scan 10,000 businesses across SaaS, ecommerce, fintech
- Publish "State of Agent Readiness Q2 2026" report
- Ship Python + TypeScript SDKs
- Publish MCP server to official registry
- Submit LangChain + CrewAI + OpenAI Agents SDK integration PRs

**Phase 2: Monetization (Months 3-6)**
- Launch Silver ($99/mo) and Gold ($299/mo) certification tiers
- Launch Developer ($49/mo) and Professional ($299/mo) API tiers
- Implement continuous monitoring + mystery shopper agents
- Build remediation recommendation engine

**Phase 3: Platform (Months 6-12)**
- Launch Platinum ($999/mo) with human auditor review
- Integrate with Stripe ACP ecosystem
- Partner with 1 major platform for score surfacing
- Ship A2A agent for agent-to-agent queries
- Launch "Agent Preferred" directory

**Phase 4: Standard (Months 12-24)**
- 100,000+ businesses scored
- AgentHermes check in 3+ major agent framework default templates
- NIST/industry body recognition
- International expansion (EU agent commerce regulations)

### 3.6 Revenue Projections

| Stream | Year 1 | Year 3 |
|--------|--------|--------|
| Silver certifications (500→5,000 × $99/mo) | $594K | $5.9M |
| Gold certifications (100→1,000 × $299/mo) | $358K | $3.6M |
| Platinum certifications (20→200 × $999/mo) | $240K | $2.4M |
| API Developer tier (200→1,000 × $49/mo) | $118K | $590K |
| API Professional tier (50→500 × $299/mo) | $179K | $1.8M |
| Remediation referrals | $100K | $1M |
| **Total ARR** | **~$1.6M** | **~$15.3M** |

Pricing is intentionally 10-50x cheaper than SOC 2 ($20K-$80K) to drive mass adoption.

---

## 4. Top 3 Threats & Mitigations

### Threat 1: A Major Platform Builds Their Own Score

**Risk:** Stripe, Google, or OpenAI builds an internal agent-readiness score and doesn't need AgentHermes.

**Mitigation:**
- Move fast — score 100,000+ businesses before anyone else. **The data moat, not the algorithm, is the defense** (lesson from PageRank: Google's crawl index was the moat, not the formula).
- Position as the **neutral third party**. Stripe scoring Stripe merchants is a conflict of interest. AgentHermes is independent.
- Publish the methodology as an open spec → harder to replace a standard than a product.
- Get embedded in regulations / industry bodies → switching costs become enormous (FICO's moat).

### Threat 2: Score Gaming

**Risk:** Businesses deploy compliant endpoints for scoring that redirect to non-compliant after audit. Fake MCP servers. Facade APIs.

**Specific attack vectors identified:**
1. Bait-and-switch endpoints (compliant during scan, non-compliant after)
2. Facade APIs (endpoints exist but do nothing useful)
3. Score camping (optimize once, let quality degrade)
4. Pricing manipulation (machine-readable but deceptive)
5. Fake agent interactions to boost metrics
6. Buying/renting tradelines (equivalent of FICO piggybacking)

**Mitigation:**
- **Continuous monitoring** — not just point-in-time scans. Re-check daily.
- **Mystery shopper agents** — synthetic agents that test real transactions at random intervals.
- **Temporal consistency checks** — flag sudden score jumps (anomaly detection).
- **Community reporting** — agents can flag businesses that score well but perform poorly.
- **Regular model updates** (quarterly) to close gaming loopholes (FICO releases new models regularly).
- **Confidence score** alongside readiness score — how much data supports the rating.
- **Logarithmic difficulty** — easy to reach Bronze, increasingly hard to reach higher tiers, ensuring Platinum is genuinely rare and meaningful.

### Threat 3: Market Fragmentation (Multiple Competing Scores)

**Risk:** Agentiview, IsAgentReady, AgentReady.site, and others fragment the market. No single standard emerges.

**Evidence this kills value:** Moz DA vs Ahrefs DR vs Semrush AS — three scores measuring similar things undermines all of them.

**Mitigation:**
- **Be the most comprehensive.** AgentHermes measures 9 dimensions including payment acceptance and data quality. No competitor measures more than 5-8, and none test payments.
- **Be the most accessible.** Free tier, open methodology (WHAT not HOW), SDKs, MCP server.
- **Be the infrastructure, not just the score.** Create the AgentHermes ID (like D-U-N-S), the `.well-known/agent-hermes.json` standard, the API that agents call. Become the plumbing.
- **Get institutional endorsement first.** The first score that gets Stripe/OpenAI/Google to mandate it wins. Period. (FICO's Fannie Mae moment.)
- **Acquire or partner with smaller players.** IsAgentReady's transparent methodology could be absorbed. AgentReady.site's SaaS model could white-label AgentHermes.

---

## 5. Current Design vs Ideal — Gap Analysis

### What AgentHermes Already Has Right

| Strength | Why It Matters |
|----------|---------------|
| 5-category scoring (profile, API, onboarding, pricing, payment) | Covers the full agent transaction flow — no competitor does all 5 |
| Bronze/Silver/Gold/Platinum tiers | Creates aspiration + competitive pressure (proven by FICO, SOC 2, SSL Labs) |
| 2,600+ businesses scored | First-mover data moat. Largest dataset in the space. |
| Payment acceptance testing | **UNIQUE** — no competitor tests this. Critical as ACP/MPP/UCP go live. |
| Structured pricing readability | **UNIQUE** — no competitor measures this. |
| Stripe Connect integration | Aligned with largest agent commerce platform |
| Median score of 41/100 | Proves the problem is real — most businesses ARE invisible to agents |

### Specific Gaps to Close

| Gap | Priority | Effort | Impact |
|-----|----------|--------|--------|
| **Add 4 new dimensions** (Data Quality, Security, Reliability, Agent Experience) | P0 | 2-3 weeks | Differentiates from all competitors. Addresses Nate B Jones "dirty data" criticism. |
| **Cap rules** (no TLS → max Bronze, no Agent Card → max Bronze) | P0 | 1 day | Mirrors SSL Labs. Creates hard requirements that drive infrastructure investment. |
| **Dynamic SVG badge** at `badge.agenthermes.ai/v1/{id}.svg` | P0 | 3 days | Trust badges drive 11-42% conversion lift. Visual signal for websites. |
| **`/.well-known/agent-hermes.json` specification** | P0 | 1 week | THE killer feature. Machine-readable trust that agents verify without API call. SSL certificate model. |
| **REST API** (`/score`, `/check`, `/scan`, `/batch`) | P0 | 1-2 weeks | Enables SDK, agent integration, third-party consumption. |
| **MCP server** for AgentHermes itself | P1 | 1 week | Agents check scores within their workflow. Publish to MCP registry. |
| **A2A Agent Card** for AgentHermes | P1 | 2 days | Eat your own dog food. AgentHermes is an agent-ready business. |
| **Python + TypeScript SDKs** | P1 | 1 week | `hermes.check("domain.com")` — the one-liner that becomes ubiquitous. |
| **Framework integrations** (LangChain, CrewAI, OpenAI Agents SDK) | P1 | 1 week | Get into agent templates as the default pre-transaction check. |
| **Public leaderboard** at agenthermes.ai/leaderboard | P1 | 3 days | Content marketing + competitive pressure. Industry benchmarks. |
| **"State of Agent Readiness" report** | P1 | 1 week | PR + thought leadership. Establishes authority. Publishable data from 2,600+ audits. |
| **Continuous monitoring** (not just point-in-time scans) | P1 | 2 weeks | Anti-gaming. Also enables SLA-like guarantees for certified businesses. |
| **Mystery shopper agents** | P2 | 2 weeks | Synthetic agents that test real transactions at random. Anti-gaming. |
| **Cross-protocol compliance testing** (A2A + MCP + ACP + UCP + Visa TAP) | P2 | 3 weeks | No competitor checks all protocols simultaneously. |
| **AgentHermes ID** (unique business identifier) | P2 | 1 week | Like D-U-N-S number. Embeddable in APIs, Agent Cards, directories. Becomes infrastructure. |
| **Open scoring specification** (publish categories + checks, keep weights proprietary) | P2 | 1 week | Builds trust. Makes it citeable. Harder to replace a standard than a product. |
| **IETF Internet-Draft** for "Agent Readiness Score" measurement framework | P3 | 2-4 weeks | Standards body legitimacy. Permanent reference. |
| **Agentic Commerce Consortium membership** | P3 | 1 day | Positioning as the scoring/certification member. |
| **Stripe ACP integration** | P3 | 2-4 weeks | Hermes scores as metadata in ACP merchant profiles. |

### Where AgentHermes Sits in the Standards Stack

```
IETF Layer (forming)
├── agent:// URI, Agent Name Service, HAIDIP, Security Requirements

Linux Foundation / Open Standards Layer (active)
├── A2A (agent interop), MCP (tool integration), ACP + UCP (commerce)

Industry Consortium Layer (active)
├── Agentic Commerce Consortium, Visa Intelligent Commerce

█████████████████████████████████████████████████
█  AgentHermes — MEASUREMENT LAYER             █
█  ├── Standardized scoring methodology         █
█  ├── Cross-protocol compliance testing         █
█  ├── Business readiness certification          █
█  └── Registry of scored/verified businesses    █
█████████████████████████████████████████████████

Business Layer (fragmented)
├── Agentiview, IsAgentReady, AgentReady.site (point tools)
├── Consulting firms (R Systems, Concentrix)
└── Platform-specific (Shopify, SFCC)
```

Every protocol defines HOW to be agent-ready. AgentHermes defines HOW TO MEASURE whether you are.

---

## 6. Critical Strategic Decisions

### Decision 1: Open vs Proprietary Methodology
**Recommendation: Hybrid Open (Google E-E-A-T model)**

Publish:
- Scoring categories (9 dimensions)
- Check definitions (what each check tests)
- Tier thresholds (20/50/70/85)
- Badge verification protocol
- MCP tool + API schemas

Keep proprietary:
- Weight distribution per check
- Anti-gaming algorithms
- Penalty calculations
- Mystery shopper scheduling
- Score adjustment formulas

### Decision 2: The Fannie Mae Play — Who to Target
**Recommended targets (in order):**

1. **Stripe** — Already building ACP/MPP/x402. AgentHermes scores as merchant metadata in ACP profiles gives them a trust layer they don't have.
2. **Shopify** — Building UCP. 20+ retailers live. Shopify merchants displaying AgentHermes badges = massive distribution.
3. **OpenAI** — Agents SDK growing. Including `hermes.check()` in default agent templates = instant ubiquity.
4. **Anthropic** — MCP creators. AgentHermes MCP server in the official registry + default tool for commerce agents.
5. **Google** — A2A backers. AgentHermes integrated into A2A Agent Card spec as an optional `readinessScore` field.

### Decision 3: The AgentHermes ID
**Create it.** A unique identifier for each scored business (e.g., `AH-2026-78F3D`). Embeddable in:
- Agent Card extensions
- HTTP headers (`X-AgentHermes-ID: AH-2026-78F3D`)
- JSON-LD markup
- MCP tool manifests
- Agent directories

If the ID becomes the standard way agents identify businesses, AgentHermes becomes infrastructure. D&B's D-U-N-S number outlasted even government mandates because it was embedded everywhere.

### Decision 4: Never Let Payment Influence Scoring
**Non-negotiable.** The BBB's pay-to-play scandal is the cautionary tale. Build an absolute firewall:
- Free tier businesses score identically to Platinum-paying businesses
- The scoring algorithm runs independently of the billing system
- No "priority review" that implicitly boosts scores
- Publish this commitment publicly

---

## 7. The One-Sentence Positioning

**AgentHermes is the FICO of the agent economy: the trusted, neutral score that every AI agent checks before transacting with a business.**

Not a consulting firm (Agentiview). Not an SEO scanner (AgentReady.site). Not a developer tool (Factory.ai). The **infrastructure** that agent commerce runs on.

---

## Appendix: Key Sources Across All Research

### Protocols
- [A2A Protocol Specification v1.0.0](https://a2a-protocol.org/latest/specification/)
- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- [llms.txt Standard](https://llmstxt.org/)
- [Stripe ACP](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)
- [Stripe MPP](https://stripe.com/blog/machine-payments-protocol)
- [Google UCP](https://ucp.dev/)
- [Visa TAP](https://developer.visa.com/capabilities/trusted-agent-protocol)

### Rating System Precedents
- [FICO Score History](https://www.fico.com/en/latest-thinking/video/fico-score-credit-scoring-innovation-timeline-1989-today)
- [BitSight Security Ratings](https://www.bitsight.com/security-ratings)
- [SSL Labs Server Rating Guide](https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide)
- [Chrome Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
- [Let's Encrypt 10 Years](https://letsencrypt.org/2025/12/09/10-years)

### Competitors
- [Agentiview](https://agentiview.com/) — closest competitor, consulting model ($349-$15K)
- [Pillar Agent Score](https://trypillar.com/tools/agent-score) — live agent simulation, free
- [IsAgentReady](https://isagentready.com/) — most transparent methodology, free
- [AgentReady.site](https://agentready.site/) — SaaS model ($0-$249/mo)
- [Agentic Storefront](https://app.agenticstorefront.com/) — deepest e-commerce checks (178)

### Market Data
- [McKinsey: $5T Agentic Commerce by 2030](https://www.digitalcommerce360.com/2025/10/20/mckinsey-forecast-5-trillion-agentic-commerce-sales-2030/)
- [Gartner: 40% Enterprise Apps with Agents by 2026](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026)
- [150+ AI Agent Statistics 2026](https://masterofcode.com/blog/ai-agent-statistics)

### Standards Bodies
- [Linux Foundation AAIF](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [Agentic Commerce Consortium](https://basistheory.ai/consortium)
- [IETF Agent Protocol Drafts](https://datatracker.ietf.org/doc/draft-rosenberg-aiproto-framework/)
