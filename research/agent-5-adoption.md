# Agent 5: Badge & Adoption Strategy — Research Findings

> Research completed: March 25, 2026
> Focus: Making the AgentHermes score go viral and become THE standard for agent commerce

---

## 1. Badge Design — Technical Implementation, Examples, Conversion Impact

### 1.1 Conversion Impact Data

Trust badges have measurable, proven impact on ecommerce conversions:

| Badge Type | Conversion Lift | Source/Context |
|-----------|----------------|----------------|
| Norton Secured | 11% overall, 52% from paid search | Inflow case study |
| McAfee SECURE | 15.7-21.5% lift (95-97% confidence) | Multiple A/B tests |
| McAfee (new visitors) | 12% conversion + 23% AOV increase | Segmented test |
| McAfee (extreme case) | 76.2% lift | House plans ecommerce |
| Generic trust badge | 12.2% conversion boost | ConversionTeam CRO |
| Trust badges (general) | Up to 42% more form conversions | Aggregate research |
| Cart abandonment impact | 61% abandon without trust logos | Consumer behavior study |

**Key insight for AgentHermes**: These are HUMAN trust signals. Agent trust signals will have even MORE impact because agents make binary decisions -- they either trust and transact, or they don't. There's no "I'll come back later." A visible AgentHermes badge that agents can programmatically verify becomes a hard gate, not a soft nudge.

### 1.2 How Existing Badges Work Technically

#### BBB Dynamic Seal
- HTML embed snippet generated from BBB business portal
- Dynamically updates with current rating
- Clicking links to BBB verification page
- Must be accredited business to display
- Recommended placement: header/footer (appears on all pages)

#### G2 Badges
- JavaScript-based Review Spotlight widget that dynamically resizes
- Embed code via my.G2 Marketing Content interface
- "Users Love Us" badge is free; "Leader"/"High Performer" badges require marketing subscription (~$2,999+/year)
- API available for syndication of ratings/reviews (paid tier)
- Widget dynamically loads reviews from G2 product profile

#### Google Partner Badge
- Two formats: HTML snippet (online) and downloadable assets (print)
- Badge appears only on approved website URLs configured in dashboard
- 24-48 hour activation delay after qualification
- Must re-earn annually (Premier = top 3% of agencies)
- Cannot imply Google endorsement or sponsorship

#### Shields.io (Open Source Badge Service)
- Serves 1.6B+ images/month
- Dynamic SVG badges via REST endpoints
- Endpoint badge: fetches JSON from custom URL, renders as SVG
- Supports custom colors, labels, logos
- Response format: SVG (default), PNG fallback
- Architecture: OpenAPI 3 spec describes all endpoints

### 1.3 Proposed AgentHermes Badge Technical Design

#### Option A: Dynamic SVG Badge (Recommended)

```html
<!-- AgentHermes Verified Badge - Embed Code -->
<a href="https://agenthermes.ai/verify/{{BUSINESS_ID}}"
   target="_blank" rel="noopener"
   title="AgentHermes Score: {{SCORE}} - {{TIER}}">
  <img src="https://badge.agenthermes.ai/v1/{{BUSINESS_ID}}.svg"
       alt="AgentHermes {{TIER}} - Score {{SCORE}}/100"
       width="180" height="60" />
</a>
```

The SVG endpoint (`badge.agenthermes.ai/v1/{id}.svg`) would:
1. Return a cached SVG (refreshed daily) with current score and tier
2. Include the tier color (Bronze=#CD7F32, Silver=#C0C0C0, Gold=#FFD700, Platinum=#E5E4E2)
3. Show the numerical score prominently
4. Include a subtle "Verified" checkmark

#### Option B: JavaScript Widget (Richer Experience)

```html
<!-- AgentHermes Interactive Badge -->
<script src="https://badge.agenthermes.ai/widget.js"
        data-business-id="{{BUSINESS_ID}}"
        data-theme="light"
        data-size="standard">
</script>
```

The JavaScript widget would:
1. Render an interactive badge that expands on hover/click
2. Show score breakdown by category on expansion
3. Include "Last audited: X days ago" timestamp
4. Link to full public report on agenthermes.ai
5. Be framework-agnostic (vanilla JS, no dependencies)

#### Option C: Machine-Readable Badge (For Agent Discovery)

Beyond the visual badge, the critical innovation is a **machine-readable verification endpoint**:

```
GET /.well-known/agent-hermes.json
```

Response:
```json
{
  "schema": "https://agenthermes.ai/schema/v1",
  "business_id": "biz_abc123",
  "domain": "example.com",
  "score": 78,
  "tier": "gold",
  "categories": {
    "machine_readable_profile": 85,
    "mcp_api_endpoints": 72,
    "agent_native_onboarding": 65,
    "structured_pricing": 90,
    "agent_payment_acceptance": 78
  },
  "last_audit": "2026-03-20T14:30:00Z",
  "next_audit": "2026-04-20T14:30:00Z",
  "certificate_url": "https://agenthermes.ai/cert/biz_abc123",
  "verification_signature": "eyJhbGciOiJFZDI1NTE5..."
}
```

**This is the killer feature.** The `.well-known/agent-hermes.json` file becomes the standard that agents check before transacting, just like browsers check for SSL certificates. It's cryptographically signed so it can't be forged, and it's machine-readable so agents can parse it instantly.

#### Badge Verification Flow

```
Agent wants to buy from example.com
  → Checks /.well-known/agent-hermes.json (10ms)
  → Verifies signature against AgentHermes public key
  → Reads score: 78 (Gold tier)
  → Checks last_audit date (within 30 days? proceed)
  → Completes transaction with confidence
```

---

## 2. Adoption Flywheel — Strategy with Phases

### 2.1 Competitive Landscape

Before designing the flywheel, note these existing/emerging competitors:

| Competitor | Approach | Pricing | Gap |
|-----------|---------|---------|-----|
| **Agentiview** | Agent Readability Score (ARS), Agent Action Score (AAS), Agent Viability Score (AVS) | Free ARS preview, $349 full ARS, $1,500 full assessment | Manual review, PDF delivery, no badge/API, no agent SDK |
| **AgentReady.site** | AI Readiness Score, 8-factor analysis | Free scan, no paid tier visible | SEO-focused (AI search visibility), not agent commerce |
| **AgentScore.site** | AI Readiness Scanner | Free | Lightweight, no certification program |
| **Factory.ai** | Agent Readiness for codebases | Open source framework | Developer-focused, not business-facing |

**AgentHermes differentiation**: None of these competitors offer a verifiable badge, a public API that agents call in real-time, an MCP tool, or integration with agent frameworks. They're all human-facing reports. AgentHermes is building the infrastructure layer agents actually use.

### 2.2 Which Side First: Start with Supply (Businesses Being Scored)

Based on marketplace cold-start research, the answer is clear: **start with supply** (businesses being scored), not demand (agents checking scores).

**Rationale:**
1. Businesses have immediate motivation: "McKinsey projects $1T in agent-mediated sales by 2030. Is your business agent-ready?" is a compelling pitch TODAY
2. Scoring businesses creates the database that makes the agent SDK valuable
3. Free scoring removes all friction for supply-side onboarding
4. Businesses will SHARE their scores (social proof / competitive pressure)
5. You can score businesses without their permission (like SSL Labs scans any domain)

### 2.3 The SSL Adoption Playbook (Applied to AgentHermes)

SSL/HTTPS went from ~30% to 95% adoption through a three-phase playbook that AgentHermes can replicate:

#### Phase 1: Make It Free (Months 1-6) — "The Let's Encrypt Phase"

**What Let's Encrypt did:** Made SSL certificates free, automated, and easy
**What AgentHermes does:**
- Free instant score for any business URL (no signup required)
- Scan 10,000+ businesses across key verticals (SaaS, ecommerce, fintech, API platforms)
- Publish aggregated data: "Median agent-readiness score: 41/100. 73% of businesses are invisible to agents."
- Create a public leaderboard by industry
- Ship the free badge embed code for scored businesses

**Key metric:** 10,000 businesses scored, 1,000 badge embeds

#### Phase 2: Make It Required (Months 6-18) — "The Chrome Warning Phase"

**What Chrome did:** Started showing "Not Secure" warnings for HTTP sites, then made HTTPS the default
**What AgentHermes does:**
- Ship the Agent SDK with `hermes.check()` as the default pre-transaction verification
- Partner with 3-5 major agent frameworks (LangChain, CrewAI, OpenAI Agents SDK) to include AgentHermes checks
- Get one major agent platform to display warnings: "This business has not been agent-verified"
- Integrate with Stripe's Agentic Commerce Protocol — ACP-compatible businesses automatically get scored
- Publish case studies: "Agent-verified businesses see 3x more agent-initiated transactions"

**Key metric:** 3 framework integrations, 50,000 businesses scored, 100 API consumers

#### Phase 3: Make It the Standard (Months 18-36) — "The Fannie Mae Phase"

**What Fannie Mae/Freddie Mac did:** Required FICO scores for all conforming mortgages, creating overnight universal adoption
**What AgentHermes does:**
- Get one major platform (Stripe, Shopify, Salesforce) to require or prominently surface AgentHermes scores
- Establish the AgentHermes Certification as a recognized standard (annual renewal)
- Launch the certification program with auditor partnerships
- Open-source the scoring methodology (see Section 6)
- Establish an advisory board with industry representatives

**Key metric:** 1 platform integration mandate, 500,000 businesses scored, industry standard recognition

### 2.4 Growth Tactics

| Tactic | How | Expected Impact |
|--------|-----|-----------------|
| **Shame marketing** | "Your competitor scores 82. You score 34." | Competitive urgency |
| **Industry reports** | "The State of Agent Readiness: Q2 2026" | PR, backlinks, authority |
| **Free badge viral loop** | Badge links to "Get your score" page | Organic growth |
| **Agent framework partnerships** | Built-in `hermes.check()` in SDKs | Distribution |
| **Stripe ACP integration** | Auto-score ACP-connected merchants | Instant scale |
| **Conference talks** | "Your Business Is Invisible to AI Agents" | Thought leadership |
| **Developer advocacy** | "How to make your API agent-ready" tutorials | Community building |

### 2.5 The Credit Karma Model for AgentHermes

Credit Karma grew to 100M+ users and $616M quarterly revenue by making credit scores free and monetizing through affiliate commissions. AgentHermes can apply the same model:

1. **Free score check** drives massive adoption (Credit Karma conversion: freemium model)
2. **Detailed audit report** ($349-$500) for businesses that want to improve
3. **Recommended tools/services** for improving score (affiliate revenue)
4. **Premium certification** for businesses that want the badge
5. **API access** for agents and platforms that need real-time scores

---

## 3. Gaming Prevention — Attack Vectors and Countermeasures

### 3.1 Attack Vectors Specific to AgentHermes

| Attack | Description | Severity | Detection Difficulty |
|--------|------------|----------|---------------------|
| **Bait-and-switch endpoint** | Deploy compliant API endpoint during scoring, redirect to non-compliant after certification | Critical | Hard |
| **Facade API** | Create a beautiful A2A Agent Card and llms.txt that describes capabilities the business doesn't actually have | High | Medium |
| **Score camping** | Achieve certification, then let infrastructure degrade until next audit | High | Easy (with continuous monitoring) |
| **Fake agent interactions** | Generate synthetic agent traffic to inflate "agent engagement" metrics | Medium | Medium |
| **Pricing manipulation** | Display machine-readable pricing during scan, serve different prices to actual agent transactions | High | Hard |
| **Credential harvesting** | Accept agent onboarding to collect API keys/tokens, then revoke access | Medium | Medium |
| **Shadow compliance** | Maintain two versions of the site: one agent-optimized (for scoring), one human-optimized (actual business) | High | Hard |
| **Social engineering the auditor** | For human-verified tiers, manipulate the auditor with prepared environments | Medium | Medium |

### 3.2 Countermeasures

#### Continuous Monitoring (Primary Defense)

Continuous monitoring beats point-in-time audits. Research shows:
- Point-in-time audits leave "critical gaps when security could be compromised without knowledge"
- SOC 2 Type II audits assess controls over 6-12 month periods; a control failure persisting 90 days is far more damaging than one caught in 24 hours
- Continuous monitoring reduces manual effort by up to 70%

**AgentHermes implementation:**
```
Continuous Monitoring Schedule:
- /.well-known/agent-hermes.json: checked every 6 hours
- A2A Agent Card: checked daily
- llms.txt: checked daily
- API endpoints: tested weekly (synthetic agent interaction)
- Pricing endpoints: spot-checked randomly (3x/week)
- Full re-audit: monthly (automated), annually (human-verified for Platinum)
```

#### Mystery Shopper Agents (Anti-Bait-and-Switch)

Deploy actual AI agents that attempt to:
1. Discover the business through standard agent discovery channels
2. Parse pricing and product information
3. Initiate onboarding/signup flow
4. Attempt a test transaction (small amount, refunded)
5. Compare results against the scored profile

This catches bait-and-switch because the mystery agent behaves identically to a real agent customer -- there's no way for the business to distinguish it from a real transaction.

#### Temporal Consistency Checks

```python
# Pseudocode for temporal consistency
def check_consistency(business_id):
    historical_scores = get_scores_last_90_days(business_id)
    current_score = scan_now(business_id)

    # Flag if score drops >15 points between audits
    if current_score < historical_scores[-1] - 15:
        flag_for_review(business_id, "significant_score_drop")

    # Flag if endpoint responses differ significantly from audit
    audit_responses = get_audit_responses(business_id)
    live_responses = probe_endpoints(business_id)
    similarity = compare_responses(audit_responses, live_responses)

    if similarity < 0.85:
        flag_for_review(business_id, "response_divergence")
```

#### Community Reporting

Allow agents (and their operators) to report businesses:
- "Endpoint returned 404 that was 200 during audit"
- "Pricing shown to agent differs from scored pricing"
- "Onboarding flow requires human intervention despite 'agent-native' claim"

Reports trigger immediate re-scan and potential score adjustment.

#### Cryptographic Verification

The `.well-known/agent-hermes.json` file includes a signature that agents verify:
1. AgentHermes signs the score data with Ed25519
2. Public key published at `agenthermes.ai/.well-known/keys.json`
3. Agents verify signature before trusting the score
4. Signature includes timestamp -- stale signatures (>30 days) are rejected
5. Businesses CANNOT forge scores because they don't have the private key

#### Anti-Gaming Lessons from Other Systems

**From FICO:**
- Synthetic identity fraud increased 240% (2016-2018) -- AgentHermes must verify that businesses are real entities, not synthetic facades
- Tradeline manipulation (buying authorized accounts) -- AgentHermes must verify that API endpoints are genuinely operated by the business

**From Google SEO:**
- E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) -- AgentHermes should assess not just technical compliance but operational trustworthiness
- Manual penalties for structured data abuse -- AgentHermes should penalize businesses that manipulate structured data specifically for scoring
- Algorithmic penalties catch most gaming automatically; manual review catches the rest

**From Amazon/Yelp:**
- Network analysis detects review fraud clusters -- AgentHermes can analyze agent interaction patterns for anomalies
- Deep graph neural networks map relationships between bad actors -- can detect businesses sharing infrastructure to game scores
- Amazon blocks 250M+ suspected fake reviews annually through ML -- AgentHermes needs automated detection at scale

---

## 4. Score API — Proposed REST + MCP Design

### 4.1 REST API Design

Modeled after SSL Labs API (stateful assessment) and Google Safe Browsing API (lookup):

#### Base URL
```
https://api.agenthermes.ai/v1/
```

#### Authentication
```
Authorization: Bearer ah_live_sk_xxxxxxxxxxxxx
```

API keys issued upon registration. Free tier: 100 lookups/day. Paid tiers for higher volume.

#### Core Endpoints

**1. Score Lookup (Cached)**
```
GET /v1/score?domain=example.com
```

Response (200 OK):
```json
{
  "domain": "example.com",
  "business_id": "biz_abc123",
  "score": 78,
  "tier": "gold",
  "tier_label": "Gold",
  "categories": {
    "machine_readable_profile": {
      "score": 85,
      "max": 100,
      "checks": {
        "a2a_agent_card": { "status": "pass", "score": 20 },
        "llms_txt": { "status": "pass", "score": 18 },
        "structured_data": { "status": "pass", "score": 17 },
        "openapi_spec": { "status": "partial", "score": 15, "issues": ["missing /payments endpoint"] },
        "well_known_hermes": { "status": "pass", "score": 15 }
      }
    },
    "mcp_api_endpoints": {
      "score": 72,
      "max": 100,
      "checks": {
        "mcp_server_available": { "status": "pass", "score": 25 },
        "endpoints_reachable": { "status": "pass", "score": 20 },
        "response_time_ms": 145,
        "uptime_30d": 99.7,
        "error_rate_30d": 0.3
      }
    },
    "agent_native_onboarding": {
      "score": 65,
      "max": 100,
      "checks": {
        "programmatic_signup": { "status": "pass", "score": 20 },
        "no_captcha": { "status": "fail", "score": 0, "issue": "reCAPTCHA on signup" },
        "api_key_auto_provision": { "status": "pass", "score": 20 },
        "sandbox_available": { "status": "pass", "score": 15 },
        "docs_machine_readable": { "status": "partial", "score": 10 }
      }
    },
    "structured_pricing": {
      "score": 90,
      "max": 100,
      "checks": {
        "pricing_endpoint": { "status": "pass", "score": 25 },
        "machine_readable_plans": { "status": "pass", "score": 25 },
        "usage_metering_api": { "status": "pass", "score": 20 },
        "quote_api": { "status": "pass", "score": 20 }
      }
    },
    "agent_payment_acceptance": {
      "score": 78,
      "max": 100,
      "checks": {
        "stripe_connect": { "status": "pass", "score": 20 },
        "acp_compatible": { "status": "pass", "score": 20 },
        "x402_support": { "status": "fail", "score": 0 },
        "shared_payment_tokens": { "status": "pass", "score": 20 },
        "mpp_support": { "status": "pass", "score": 18 }
      }
    }
  },
  "last_audit": "2026-03-20T14:30:00Z",
  "next_audit": "2026-04-20T14:30:00Z",
  "audit_type": "automated",
  "badge_url": "https://badge.agenthermes.ai/v1/biz_abc123.svg",
  "report_url": "https://agenthermes.ai/report/biz_abc123",
  "certificate_url": "https://agenthermes.ai/cert/biz_abc123",
  "cache_ttl_seconds": 3600,
  "cached_at": "2026-03-25T10:00:00Z"
}
```

**2. Initiate New Scan**
```
POST /v1/scan
Content-Type: application/json

{
  "domain": "example.com",
  "depth": "standard",
  "notify_url": "https://myapp.com/webhooks/hermes"
}
```

Response (202 Accepted):
```json
{
  "scan_id": "scan_xyz789",
  "domain": "example.com",
  "status": "queued",
  "estimated_duration_seconds": 120,
  "poll_url": "https://api.agenthermes.ai/v1/scan/scan_xyz789"
}
```

**3. Check Scan Status**
```
GET /v1/scan/scan_xyz789
```

Response (200 OK, in progress):
```json
{
  "scan_id": "scan_xyz789",
  "status": "in_progress",
  "progress_percent": 65,
  "current_phase": "testing_api_endpoints",
  "phases_completed": ["dns_resolution", "tls_check", "agent_card_fetch", "llms_txt_parse"],
  "phases_remaining": ["onboarding_test", "pricing_parse", "payment_test"],
  "estimated_remaining_seconds": 45
}
```

**4. Quick Check (Boolean, for Agent Decision-Making)**
```
GET /v1/check?domain=example.com&min_score=60
```

Response (200 OK):
```json
{
  "domain": "example.com",
  "meets_threshold": true,
  "score": 78,
  "tier": "gold",
  "last_audit": "2026-03-20T14:30:00Z",
  "stale": false
}
```

This endpoint is optimized for speed (<50ms) and is what agents call in their transaction flow.

**5. Batch Lookup**
```
POST /v1/score/batch
Content-Type: application/json

{
  "domains": ["example.com", "acme.io", "widgets.co"]
}
```

Response:
```json
{
  "results": [
    { "domain": "example.com", "score": 78, "tier": "gold" },
    { "domain": "acme.io", "score": 45, "tier": "bronze" },
    { "domain": "widgets.co", "score": null, "tier": null, "status": "not_scored" }
  ]
}
```

#### Rate Limiting

| Tier | Lookups/day | Scans/day | Batch size | Price |
|------|------------|-----------|------------|-------|
| Free | 100 | 5 | 10 | $0 |
| Developer | 5,000 | 50 | 100 | $49/mo |
| Professional | 50,000 | 500 | 500 | $299/mo |
| Enterprise | Unlimited | Unlimited | 5,000 | Custom |

Rate limit headers (modeled after SSL Labs):
```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4823
X-RateLimit-Reset: 1711411200
```

#### Error Responses

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "You have exceeded your daily lookup quota. Upgrade at https://agenthermes.ai/pricing",
    "status": 429,
    "retry_after_seconds": 3600
  }
}
```

### 4.2 MCP Tool Design

The MCP server allows agents to check scores WITHIN their workflow using the Model Context Protocol:

#### MCP Server Configuration

```json
{
  "name": "agenthermes",
  "version": "1.0.0",
  "description": "Check business agent-readiness scores before transacting",
  "tools": [
    {
      "name": "check_agent_readiness",
      "description": "Check if a business is agent-ready before initiating a transaction. Returns the AgentHermes score (0-100), tier (bronze/silver/gold/platinum), and category breakdown. Use this before any purchase, signup, or API integration with an unknown business.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "domain": {
            "type": "string",
            "description": "The domain of the business to check (e.g., 'stripe.com')"
          },
          "min_score": {
            "type": "number",
            "description": "Minimum acceptable score (default: 40)",
            "default": 40
          },
          "require_categories": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Required passing categories (e.g., ['agent_payment_acceptance', 'structured_pricing'])"
          }
        },
        "required": ["domain"]
      }
    },
    {
      "name": "compare_businesses",
      "description": "Compare agent-readiness scores across multiple businesses to find the most agent-friendly option in a category.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "domains": {
            "type": "array",
            "items": { "type": "string" },
            "description": "List of business domains to compare"
          },
          "sort_by": {
            "type": "string",
            "enum": ["overall_score", "machine_readable_profile", "mcp_api_endpoints", "agent_native_onboarding", "structured_pricing", "agent_payment_acceptance"],
            "default": "overall_score"
          }
        },
        "required": ["domains"]
      }
    },
    {
      "name": "find_agent_ready_businesses",
      "description": "Search for agent-ready businesses in a specific category or industry.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "description": "Business category (e.g., 'cloud hosting', 'payment processing', 'email marketing')"
          },
          "min_score": {
            "type": "number",
            "default": 60
          },
          "limit": {
            "type": "number",
            "default": 10
          }
        },
        "required": ["category"]
      }
    }
  ]
}
```

#### MCP Server Implementation Pattern

The MCP server connects to the AgentHermes REST API under the hood:

```typescript
// Simplified MCP server handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "check_agent_readiness") {
    const { domain, min_score = 40 } = request.params.arguments;

    const response = await fetch(
      `https://api.agenthermes.ai/v1/check?domain=${domain}&min_score=${min_score}`,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    const data = await response.json();

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          recommendation: data.meets_threshold ? "PROCEED" : "CAUTION",
          domain: data.domain,
          score: data.score,
          tier: data.tier,
          last_audit: data.last_audit,
          stale: data.stale,
          message: data.meets_threshold
            ? `${domain} scores ${data.score}/100 (${data.tier}). Safe to proceed with agent transaction.`
            : `${domain} scores ${data.score}/100. Below threshold of ${min_score}. Consider alternatives or proceed with caution.`
        }, null, 2)
      }]
    };
  }
});
```

### 4.3 Real-Time vs Cached Scores

| Approach | Latency | Freshness | Use Case |
|----------|---------|-----------|----------|
| Cached lookup (`/score`) | <50ms | Up to 24h old | Dashboard display, reporting |
| Quick check (`/check`) | <50ms | Up to 24h old (with `stale` flag) | Agent pre-transaction check |
| Fresh scan (`/scan`) | 60-180s | Real-time | Initial scoring, dispute resolution |
| `.well-known` file | <10ms | Updated on re-audit | Agent discovery, no API call needed |

**Recommendation:** Use cached scores for 99% of agent interactions. The `.well-known/agent-hermes.json` file means agents don't even need to call the API -- they can verify locally by checking the business's own domain. This is the SSL model: the certificate lives on the server, not at a central authority that must be queried every time.

---

## 5. Certification Program — Proposed Tiers, Pricing, Renewal

### 5.1 Certification Tiers

| Tier | Score | Badge | Verification | Price | Renewal |
|------|-------|-------|-------------|-------|---------|
| **Scored** (free) | 0-100 | Basic score display | Automated scan | $0 | N/A (auto-updated) |
| **Bronze Certified** | 40-59 | Bronze badge | Automated scan + self-attestation | $0 (freemium) | Quarterly auto-scan |
| **Silver Certified** | 60-74 | Silver badge | Automated scan + API endpoint testing | $99/month | Monthly auto-scan |
| **Gold Certified** | 75-89 | Gold badge + API listing | Automated + synthetic agent testing | $299/month | Weekly auto-scan + quarterly manual |
| **Platinum Certified** | 90+ | Platinum badge + premium listing + "Agent Preferred" | Full automated + human auditor review | $999/month | Continuous monitoring + annual human audit |

### 5.2 Cost Benchmarks from Comparable Programs

| Program | Initial Cost | Annual Renewal | Audit Type |
|---------|-------------|---------------|------------|
| SOC 2 Type I | $20K-$40K | N/A (one-time) | CPA firm |
| SOC 2 Type II | $30K-$80K | $20K-$40K | CPA firm |
| ISO 27001 | $30K-$60K | $15K (surveillance) | Certification body |
| PCI DSS Level 4 | $5K-$10K | $5K-$10K | Self-assessment |
| PCI DSS Level 1 | $50K-$150K | $50K-$150K | QSA audit |
| G2 badge subscription | N/A | $2,999+/year | Review-based |
| Google Partner | Free | Annual re-qualification | Performance metrics |

**AgentHermes pricing is intentionally 10-50x cheaper than SOC 2 or ISO.** The goal is mass adoption, not premium consulting fees. The Platinum tier at $999/month ($12K/year) is cheaper than even PCI DSS Level 4 -- this removes objections.

### 5.3 Certification Process

#### Self-Service Path (Bronze/Silver)
1. Business enters domain on agenthermes.ai
2. Automated scan runs (2-3 minutes)
3. Score and report generated immediately
4. Business reviews recommendations
5. Business implements improvements
6. Re-scan to update score
7. Once threshold met, badge embed code available
8. Continuous auto-monitoring maintains certification

#### Assisted Path (Gold)
1. All self-service steps, plus:
2. Synthetic agent interaction testing (real AI agents test the full flow)
3. API endpoint reliability monitoring (uptime, latency, error rates)
4. Quarterly "mystery shopper" agent test
5. Dedicated Slack channel for support

#### Premium Path (Platinum)
1. All assisted steps, plus:
2. Annual human auditor review (remote, 2-4 hours)
3. Continuous real-time monitoring with alerting
4. "Agent Preferred" listing in AgentHermes directory
5. Priority support and dedicated account manager
6. Custom remediation plan if score drops below 90

### 5.4 Revenue Model

| Revenue Stream | Year 1 Target | Year 3 Target |
|---------------|--------------|--------------|
| Silver certifications (500 x $99/mo) | $594K | $5.9M (5,000) |
| Gold certifications (100 x $299/mo) | $358K | $3.6M (1,000) |
| Platinum certifications (20 x $999/mo) | $240K | $2.4M (200) |
| API access (Developer tier, 200 x $49/mo) | $118K | $590K (1,000) |
| API access (Professional tier, 50 x $299/mo) | $179K | $1.8M (500) |
| Remediation referrals (affiliate) | $100K | $1M |
| **Total ARR** | **~$1.6M** | **~$15.3M** |

---

## 6. Open vs Proprietary Methodology — Recommendation

### 6.1 Case Studies

| System | Methodology | Outcome |
|--------|------------|---------|
| **PageRank** | Published in 1998 paper → widely understood → aggressively gamed → Google made core algorithm proprietary | Gaming forced closure; but initial openness built trust and adoption |
| **FICO** | Proprietary since inception → "black box" criticism → regulatory scrutiny → FICO Score Open Access program added transparency | Proprietary worked because regulatory mandate drove adoption; transparency came later under pressure |
| **SSL Labs** | Fully open methodology, published grading guide on GitHub | No gaming concern because it measures objective technical facts (cipher suites, protocol versions) -- you either support TLS 1.3 or you don't |
| **Credit Karma** | Made VantageScore freely accessible (not FICO) → 100M+ users → $2.4B+ annual revenue | Accessibility drove adoption; the score itself remained third-party controlled |
| **Google E-E-A-T** | Publicly described guidelines but proprietary algorithmic implementation | High-level transparency + proprietary implementation = best of both worlds |

### 6.2 Recommendation: Hybrid Open

**Publish the WHAT, protect the HOW.**

#### Open (Published):
- **Scoring categories** (the 5 pillars) — businesses need to know what's measured
- **Check definitions** — what "A2A Agent Card present" means, what "API endpoint reachable" means
- **Tier thresholds** — 40/60/75/90 cutoffs
- **Badge verification protocol** — how agents verify `.well-known/agent-hermes.json`
- **MCP tool schema** — so any agent framework can integrate
- **API specification** — OpenAPI spec for the REST API

#### Proprietary (Not Published):
- **Weight distribution** — how much each check contributes to the total score
- **Anti-gaming algorithms** — temporal consistency checks, anomaly detection, mystery shopper scheduling
- **Penalty calculations** — how and when scores are penalized for gaming
- **Synthetic agent behavior** — how mystery shopper agents operate
- **Score adjustment formulas** — how continuous monitoring changes scores between audits

### 6.3 Rationale

AgentHermes scores are MOSTLY objective (like SSL Labs) but PARTIALLY subjective (like FICO). The objective parts -- "does llms.txt exist?", "is the API reachable?", "does Stripe Connect work?" -- should be fully transparent because they can't be gamed. You either have them or you don't.

The subjective/weighted parts -- "how much does API response time matter vs having an Agent Card?" -- should be proprietary to prevent businesses from optimizing for weights rather than genuine agent-readiness.

This is the Google E-E-A-T approach: publish the guidelines, keep the algorithm secret.

---

## 7. Agent SDK — Proposed Design, Framework Integrations, Adoption Strategy

### 7.1 Core SDK Design

#### Python SDK

```python
# pip install agenthermes
from agenthermes import HermesClient

hermes = HermesClient(api_key="ah_live_sk_xxx")

# Quick check before transaction
result = hermes.check("example.com", min_score=60)
if result.meets_threshold:
    # Proceed with transaction
    print(f"Verified: {result.score}/100 ({result.tier})")
else:
    print(f"Warning: {result.score}/100 - below threshold")

# Detailed score
score = hermes.score("example.com")
print(score.categories.agent_payment_acceptance.score)  # 78
print(score.categories.agent_payment_acceptance.checks.stripe_connect.status)  # "pass"

# Compare options
comparison = hermes.compare(["stripe.com", "square.com", "paypal.com"])
best = comparison.best_by("agent_payment_acceptance")

# Search for agent-ready businesses
results = hermes.search("email marketing", min_score=70, limit=5)
for biz in results:
    print(f"{biz.domain}: {biz.score}/100")
```

#### TypeScript/JavaScript SDK

```typescript
// npm install @agenthermes/sdk
import { HermesClient } from '@agenthermes/sdk';

const hermes = new HermesClient({ apiKey: 'ah_live_sk_xxx' });

// Quick check
const result = await hermes.check('example.com', { minScore: 60 });
if (result.meetsThreshold) {
  console.log(`Verified: ${result.score}/100 (${result.tier})`);
}

// Inline verification with auto-fallback
const verified = await hermes.verifyOrWarn('example.com', {
  minScore: 60,
  onFail: (result) => console.warn(`Low score: ${result.score}`),
});
```

### 7.2 Framework Integrations

#### LangChain Integration

```python
from langchain.tools import Tool
from agenthermes import HermesClient

hermes = HermesClient(api_key="ah_live_sk_xxx")

hermes_tool = Tool(
    name="check_agent_readiness",
    description="Check if a business is agent-ready before making purchases or API integrations. Input: business domain (e.g., 'stripe.com'). Returns score, tier, and recommendation.",
    func=lambda domain: hermes.check(domain, min_score=60).to_dict()
)

# Add to agent's toolkit
agent = initialize_agent(
    tools=[hermes_tool, ...other_tools],
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS
)
```

#### CrewAI Integration

```python
from crewai import Agent, Task, Crew
from crewai_tools import tool
from agenthermes import HermesClient

hermes = HermesClient(api_key="ah_live_sk_xxx")

@tool("AgentHermes Readiness Check")
def check_readiness(domain: str) -> str:
    """Check if a business is agent-ready. Use before any transaction or integration."""
    result = hermes.check(domain, min_score=60)
    return f"Domain: {domain} | Score: {result.score}/100 | Tier: {result.tier} | Safe: {result.meets_threshold}"

procurement_agent = Agent(
    role="Procurement Specialist",
    goal="Find and verify agent-ready vendors",
    tools=[check_readiness]
)
```

#### OpenAI Agents SDK Integration

```python
from agents import Agent, function_tool
from agenthermes import HermesClient

hermes = HermesClient(api_key="ah_live_sk_xxx")

@function_tool
def check_agent_readiness(domain: str, min_score: int = 60) -> dict:
    """Check if a business is agent-ready before transacting. Returns score and recommendation."""
    result = hermes.check(domain, min_score=min_score)
    return {
        "domain": domain,
        "score": result.score,
        "tier": result.tier,
        "safe_to_transact": result.meets_threshold,
        "last_audit": result.last_audit
    }

agent = Agent(
    name="Shopping Agent",
    instructions="Always check AgentHermes scores before making any purchase. Refuse to transact with businesses scoring below 40.",
    tools=[check_agent_readiness]
)
```

#### Stripe ACP Integration

```python
# When processing an ACP transaction, check Hermes first
from agenthermes import HermesClient
import stripe

hermes = HermesClient(api_key="ah_live_sk_xxx")

async def process_agent_purchase(merchant_domain: str, product_id: str, amount: int):
    # Step 1: Verify merchant agent-readiness
    check = hermes.check(merchant_domain, min_score=40)

    if not check.meets_threshold:
        return {"error": "Merchant does not meet agent-readiness threshold",
                "score": check.score}

    # Step 2: Proceed with ACP transaction
    checkout = stripe.checkout.Session.create(
        mode="payment",
        line_items=[{"price": product_id, "quantity": 1}],
        # ... ACP parameters
    )

    return {"checkout_url": checkout.url, "hermes_score": check.score}
```

### 7.3 How to Make It the DEFAULT Check

The goal is to make `hermes.check()` as automatic as HTTPS certificate verification. Strategy:

1. **Framework partnerships** (Month 1-3): Contribute AgentHermes tool integrations to LangChain, CrewAI, OpenAI Agents SDK, and AutoGen repos as PRs. These are open-source; getting merged means every developer who uses the framework gets the tool.

2. **Agent template inclusion** (Month 3-6): Work with agent template providers (LangChain Hub, CrewAI templates) to include `hermes.check()` in standard commerce agent templates. When someone scaffolds a "shopping agent" or "procurement agent," the Hermes check is included by default.

3. **MCP server registry** (Month 1-3): Publish the AgentHermes MCP server to the official MCP server registry. Any MCP-compatible agent can connect to it immediately.

4. **A2A integration** (Month 3-6): Build AgentHermes as an A2A-compatible agent that other agents can query. The Agent Card at `agenthermes.ai/.well-known/agent.json` describes the "check business readiness" capability.

5. **Stripe integration** (Month 6-12): Work with Stripe to include AgentHermes scores in the ACP merchant profile. When an agent discovers a merchant through ACP, the Hermes score is part of the merchant metadata.

---

## 8. Recommended Go-to-Market Sequence

### Phase 0: Foundation (Weeks 1-4)

| Priority | Action | Why |
|----------|--------|-----|
| P0 | Build automated scanner for the 5 scoring categories | Core product |
| P0 | Design and serve dynamic SVG badge | Visual trust signal |
| P0 | Create `.well-known/agent-hermes.json` specification | Machine-readable standard |
| P0 | Build REST API with `/score`, `/check`, and `/scan` endpoints | Developer access |
| P1 | Scan top 1,000 SaaS companies and API platforms | Seed the database |
| P1 | Build public leaderboard at agenthermes.ai/leaderboard | Content marketing |

### Phase 1: Free Adoption (Months 1-3)

| Priority | Action | Why |
|----------|--------|-----|
| P0 | Launch free score checker at agenthermes.ai | Top of funnel |
| P0 | Scan 10,000 businesses across SaaS, ecommerce, fintech, API platforms | Database scale |
| P0 | Publish "State of Agent Readiness Q2 2026" report | PR + thought leadership |
| P1 | Ship Python + TypeScript SDKs | Developer adoption |
| P1 | Publish MCP server to registry | Agent framework access |
| P1 | Launch free badge embed code | Viral distribution |
| P1 | Submit LangChain + CrewAI tool integration PRs | Framework presence |
| P2 | Create "How to improve your AgentHermes score" guide | Conversion to paid |

### Phase 2: Monetization (Months 3-6)

| Priority | Action | Why |
|----------|--------|-----|
| P0 | Launch Silver/Gold certification tiers | Revenue |
| P0 | Launch Developer/Professional API tiers | Revenue |
| P0 | Implement continuous monitoring for certified businesses | Anti-gaming + value |
| P1 | Ship synthetic "mystery shopper" agent testing | Anti-gaming |
| P1 | Build remediation recommendation engine | Upsell + affiliate revenue |
| P1 | Launch industry-specific reports (SaaS, ecommerce, fintech) | Sales enablement |
| P2 | Partner with one agent platform for "agent-verified" display | Demand-side adoption |

### Phase 3: Platform (Months 6-12)

| Priority | Action | Why |
|----------|--------|-----|
| P0 | Launch Platinum tier with human auditor review | Premium revenue |
| P0 | Integrate with Stripe ACP/MPP ecosystem | Agent commerce distribution |
| P0 | Partner with 1 major platform (Stripe/Shopify/Salesforce) for score surfacing | Critical mass |
| P1 | Ship A2A agent for agent-to-agent score queries | Protocol-native |
| P1 | Launch "Agent Preferred" directory | Lead generation for businesses |
| P1 | Open-source the scoring methodology (WHAT, not HOW) | Trust + community |
| P2 | Establish AgentHermes Advisory Board | Governance + legitimacy |
| P2 | Begin ISO/SOC-style formal certification partnerships | Enterprise credibility |

### Phase 4: Standard (Months 12-24)

| Priority | Action | Why |
|----------|--------|-----|
| P0 | Achieve 100,000+ businesses scored | Critical mass |
| P0 | Get AgentHermes check included in 3+ major agent framework default templates | Ubiquity |
| P1 | Pursue NIST/industry body recognition | Standards legitimacy |
| P1 | Launch AgentHermes for Enterprise (custom scoring, private instances) | Enterprise revenue |
| P2 | International expansion (EU agent commerce regulations) | Global standard |

---

## 9. Sources

### Badge Design & Conversion Impact
- [Trust Badge Impact - Alexander Jarvis](https://www.alexanderjarvis.com/what-is-trust-badge-impact-in-ecommerce/)
- [Trust Badge 12.2% Boost - ConversionTeam](https://www.conversionteam.com/case-studies/simple-trust-badge-test-delivers-12-2-conversion-rate-boost/)
- [Norton SSL 11% Increase - GoInflow](https://www.goinflow.com/blog/norton-security-seal-increases-ecommerce-conversion-rate-case-study/)
- [McAfee vs Norton Trust Seals - GoInflow](https://www.goinflow.com/blog/trust-seals-ecommerce-tests/)
- [Norton and McAfee Case Study - Tinuiti](https://tinuiti.com/blog/ecommerce/case-study-symantecs-norton-ssl-and-mcafee-secure-trust-marks-increase-new-visitor-conversion-rates/)
- [G2 Badges Documentation](https://documentation.g2.com/docs/g2-badges)
- [G2 Trust Badges - G2 Sell](https://sell.g2.com/g2-trust-badges)
- [BBB Dynamic Seal Instructions - Valice](https://valice.com/docs/add-a-bbb-dynamic-seal-to-your-website/)
- [Google Partner Badge Guidelines](https://support.google.com/google-ads/answer/9028798?hl=en)
- [Shields.io - Dynamic Badges](https://shields.io/)
- [Stripe Verified Documentation](https://docs.stripe.com/verified)

### SSL/HTTPS Adoption
- [Let's Encrypt Stats](https://letsencrypt.org/stats/)
- [10 Years of Let's Encrypt](https://letsencrypt.org/2025/12/09/10-years)
- [SSL/TLS Statistics 2026 - SSL Insights](https://sslinsights.com/ssl-certificates-statistics/)
- [Let's Encrypt Academic Paper - MIT CSAIL](https://css.csail.mit.edu/6.858/2026/readings/lets-encrypt.pdf)

### FICO Adoption & Credit Scoring
- [FICO Adoption in Mortgage Market](https://www.fico.com/blogs/fico-s-adoption-and-pricing-mortgage-origination-market)
- [Credit Score History - BankingPlus](https://bankingplus.news/enrichment/fico-credit-score-history/)
- [The Unlikely End of FICO - Fintech Takes](https://fintechtakes.com/articles/2024-01-12/fico-score/)
- [Credit Karma Business Model - Rates.fm](https://rates.fm/banks/credit-karma-makes-money/)
- [Credit Karma How It Works](https://www.creditkarma.com/about/howitworks)
- [FICO Score Open Access](https://www.fico.com/en/latest-thinking/fact-sheet/fico-score-open-access)

### Two-Sided Marketplaces
- [Cold Start Problem - Reforge](https://www.reforge.com/guides/beat-the-cold-start-problem-in-a-marketplace)
- [Andrew Chen on Marketplaces - Stripe](https://stripe.com/guides/atlas/andrew-chen-marketplaces)
- [Network Effects and Critical Mass - a16z](https://a16z.com/two-powerful-mental-models-network-effects-and-critical-mass/)

### Gaming Prevention
- [5 Ways Fraud Contributes to High FICO Scores - Point Predictive](https://pointpredictive.com/5-ways-fraud-is-contributing-to-historically-high-fico-scores/)
- [Fake Review Detection - AI Multiple](https://research.aimultiple.com/fake-review-detection/)
- [Detecting Fake Reviews on Amazon - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9704690/)
- [How to Spot a Fake SOC 2 Report - Lorikeet Security](https://lorikeetsecurity.com/blog/how-to-spot-fake-soc2-report)
- [Google Penalties Guide - Zeo](https://zeo.org/resources/blog/the-complete-list-of-google-penalties-manual-actions-guide)

### API Design References
- [Google Safe Browsing API](https://developers.google.com/safe-browsing/reference/rest)
- [SSL Labs API v4 Documentation](https://github.com/ssllabs/ssllabs-scan/blob/master/ssllabs-api-docs-v4.md)
- [SSL Labs Rating Guide](https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide)
- [VirusTotal API Overview](https://docs.virustotal.com/reference/overview)
- [VirusTotal Public vs Premium API](https://docs.virustotal.com/reference/public-vs-premium-api)

### Certification Programs
- [SOC 2 Cost Breakdown - Comp AI](https://trycomp.ai/soc-2-cost-breakdown)
- [ISO 27001 Certification Cost - Sprinto](https://sprinto.com/blog/iso-27001-certification-cost/)
- [PCI DSS Compliance Cost - SecurityMetrics](https://www.securitymetrics.com/blog/how-much-does-pci-compliance-cost)
- [ISO Certification Renewal Process](https://www.quality-assurance.com/blog/a-step-by-step-iso-certification-renewal-process.html)
- [Continuous vs Point-in-Time Monitoring - Vanta](https://www.vanta.com/resources/point-in-time-vs-continuous-monitoring-for-security)

### Agent Commerce & Protocols
- [McKinsey Agentic Commerce Report](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-automation-curve-in-agentic-commerce)
- [McKinsey $5T Forecast - Digital Commerce 360](https://www.digitalcommerce360.com/2025/10/20/mckinsey-forecast-5-trillion-agentic-commerce-sales-2030/)
- [Stripe Agentic Commerce Suite](https://stripe.com/blog/agentic-commerce-suite)
- [Stripe Agentic Commerce Protocol](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)
- [Stripe Machine Payments Protocol](https://stripe.com/blog/machine-payments-protocol)
- [Stripe x402 Documentation](https://docs.stripe.com/payments/machine/x402)
- [Google A2A Protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [A2A Protocol Updates](https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade)
- [llms.txt Specification](https://llmstxt.org/)

### Competitive Landscape
- [Agentiview - Agent Readiness Intelligence](https://agentiview.com/)
- [AgentReady.site - AI Readiness Scanner](https://agentready.site/)
- [Factory.ai - Agent Readiness](https://factory.ai/news/agent-readiness)

### Agent Frameworks & SDKs
- [LangChain Custom Tools Guide](https://js.langchain.com/docs/how_to/custom_tools/)
- [OpenAI Agents SDK Guardrails](https://openai.github.io/openai-agents-python/guardrails/)
- [MCP Architecture Overview](https://modelcontextprotocol.io/docs/learn/architecture)
- [AI Agent Frameworks Comparison 2026 - Arsum](https://arsum.com/blog/posts/ai-agent-frameworks/)

### Freemium / Business Model
- [Freemium Conversion Rate Guide - UserPilot](https://userpilot.com/blog/freemium-conversion-rate/)
- [Free to Paid Conversion Rates - CrazyEgg](https://www.crazyegg.com/blog/free-to-paid-conversion-rate/)
