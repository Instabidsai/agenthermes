# Agent 4: Score Dimensions Design — AgentHermes Agent Readiness Score

> Research Agent 4 output. Covers scoring methodology research, dimension analysis, proposed rubric, tier requirements, and quick wins.
> Generated: March 25, 2026

---

## 1. Research Findings — How Major Scoring Systems Work

### 1.1 FICO Credit Score (300-850)

FICO uses five weighted dimensions that sum to 100%:

| Dimension | Weight | What It Measures |
|-----------|--------|-----------------|
| Payment History | 35% | On-time payments, delinquencies, bankruptcies |
| Amounts Owed | 30% | Credit utilization ratio (recommended <30%) |
| Length of Credit History | 15% | Average age of accounts, oldest account age |
| New Credit | 10% | Hard inquiries, recently opened accounts |
| Credit Mix | 10% | Variety of account types (cards, loans, mortgage) |

**Key design lessons for AgentHermes:**
- The heaviest weight (35%) goes to the most predictive factor of future behavior (payment history). We should weight the dimension most predictive of successful agent transactions highest.
- The score is proprietary but the dimensions are public. Transparency on WHAT is measured builds trust; secrecy on HOW it's weighted prevents gaming.
- FICO penalizes recency — recent negative events hurt more than old ones. Our score should similarly weight recent uptime/performance data more heavily.
- A zero in any factor doesn't zero the whole score — it just drags it down proportionally. This is more forgiving than SSL Labs' approach.

**Source:** [myFICO — What's in Your Credit Score](https://www.myfico.com/credit-education/whats-in-your-credit-score)

### 1.2 Google Lighthouse (0-100 per category)

Lighthouse evaluates five categories independently (Performance, Accessibility, Best Practices, SEO, PWA). The Performance score uses weighted metrics with a log-normal distribution curve:

| Metric | Weight |
|--------|--------|
| Total Blocking Time (TBT) | 30% |
| Largest Contentful Paint (LCP) | 25% |
| Cumulative Layout Shift (CLS) | 15% |
| First Contentful Paint (FCP) | 10% |
| Speed Index | 10% |
| Time to Interactive (TTI) | 10% |

**Key design lessons for AgentHermes:**
- Each metric maps to a log-normal curve where raw measurements are converted to 0-100 scores. This means improvements at the low end yield more points than optimizing an already-good score. We should use a similar diminishing-returns curve.
- The heaviest weight (30% TBT) goes to the metric most correlated with user experience. Our heaviest weight should go to the metric most correlated with agent transaction success.
- Categories are scored independently — you can have a 98 in Accessibility and a 40 in Performance. This allows businesses to see exactly where they fail.
- The scoring calculator is public and interactive. This drives adoption because developers can model "if I fix X, my score goes from 65 to 82."

**Source:** [Chrome Developers — Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring), [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)

### 1.3 SSL Labs (A+ to F)

SSL Labs uses three weighted categories that produce a numerical score (0-100), then maps to a letter grade:

| Category | Weight | What It Measures |
|----------|--------|-----------------|
| Protocol Support | 30% | TLS versions supported (1.2, 1.3) |
| Key Exchange | 30% | Key exchange algorithm strength |
| Cipher Strength | 40% | Cipher suite strength (weakest + strongest averaged) |

**Critical design feature:** A zero in ANY category zeros the entire score. This is a "weakest link" model — one critical failure invalidates everything else.

**Grade mapping:**
- A+ = 80+ score AND no warnings AND HSTS with max-age >= 6 months
- A = 80+ score, no warnings
- A- = 80+ but missing TLS 1.3 or HSTS
- B = 65-79
- C = 50-64
- F = <50 or any critical vulnerability

**Cap rules:** If TLS 1.3 is not supported, grade is capped at A-. If HSTS is invalid, grade drops from A to A-. Any known vulnerability (e.g., Heartbleed) = immediate F.

**Key design lessons for AgentHermes:**
- The "cap rule" pattern is powerful: certain conditions prevent reaching higher tiers regardless of overall score. We should use this — e.g., no Agent Card = cannot reach Gold, regardless of other scores.
- Averaging weakest + strongest cipher is clever: it punishes businesses that support one modern protocol alongside deprecated ones. We should similarly penalize businesses that have an MCP server but still serve malformed data.
- The immediate-F-for-critical-vulnerability pattern is essential. If a business has a known security issue on its agent-facing surface, the score should drop to zero in that category.

**Source:** [SSL Labs Server Rating Guide](https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide), [Qualys Grades Calculation](https://docs.qualys.com/en/certview/latest/scans/ssl_grading.htm)

### 1.4 SOC 2 Type II Trust Service Criteria

SOC 2 uses five Trust Service Categories (TSCs):

| Category | Status | Scope |
|----------|--------|-------|
| Security | **REQUIRED** | Protection against unauthorized access |
| Availability | Optional | Systems available for operation/use |
| Processing Integrity | Optional | Processing is complete, valid, accurate, timely |
| Confidentiality | Optional | Confidential information is protected |
| Privacy | Optional | Personal information handled appropriately |

**Structural design:** Each TSC is divided into sub-criteria, each with multiple "points of focus." Total: 61 criteria, ~300 points of focus. Security is the "common criteria" — its controls are shared across all five categories.

**Key design lessons for AgentHermes:**
- The REQUIRED vs OPTIONAL category model is exactly what we need. Security (the foundation) is mandatory; businesses choose additional categories based on their service type.
- Type II requires a 3-month observation period to prove operational effectiveness over time. Our score should similarly factor in historical data, not just point-in-time snapshots.
- SOC 2's "points of focus" provide specific, actionable guidance. Our rubric should do the same — not "have good security" but "rate-limit agent-facing endpoints to <100 req/min with 429 responses."

**Source:** [Secureframe — Trust Services Criteria for SOC 2](https://secureframe.com/hub/soc-2/trust-services-criteria), [CSA — 5 SOC 2 Trust Services Criteria](https://cloudsecurityalliance.org/blog/2023/10/05/the-5-soc-2-trust-services-criteria-explained)

### 1.5 Moz Domain Authority (1-100)

DA uses a machine learning model with 40+ factors:

- **Primary factors:** Linking root domains (quantity + quality), total backlinks, MozRank, MozTrust
- **Quality signals:** Link authority, relevance, spam score
- **Algorithm:** ML model trained to predict how often Google uses a domain in search results

**Key design lessons for AgentHermes:**
- DA is logarithmic — going from 20 to 30 is much easier than going from 70 to 80. This rewards early adopters with visible progress while making the top tiers genuinely difficult.
- DA uses a "spam score" to penalize manipulative link building. We need equivalent anti-gaming measures — e.g., detecting businesses that expose fake MCP endpoints with no real functionality.
- DA is comparative — it's a prediction of ranking against competitors, not an absolute measure. Our score could similarly benchmark against industry peers.

**Source:** [SEO Testing — What is Domain Authority](https://seotesting.com/blog/what-is-domain-authority/), [Moz DA Explained](https://xamsor.com/blog/moz-da-domain-authority-explained/)

### 1.6 Agentiview (Competitor) — ARS/AAS/AVS

Agentiview uses a three-score system:

| Score | Dimensions | What It Measures |
|-------|------------|-----------------|
| ARS (Agent Readiness Score) | 10 dimensions, 0-100 | Can agents find, parse, and trust what they find? |
| AAS (Agent Action Score) | 10 dimensions, 0-100 | Can agents compare, trial, transact without humans? |
| AVS (Agent Viability Score) | Composite of ARS + AAS | Overall viability for agent commerce |

**Key insight:** ARS is automated (free crawl of homepage), but AAS requires $2,500 for manual assessment with live agent simulation. This means their full score is not scalable — it requires human auditors.

**Our advantage:** If we can automate the AAS-equivalent (automated agent simulation tests), we can provide a complete score at scale for free, making Agentiview's consulting model obsolete.

**Source:** [Agentiview](https://agentiview.com/)

---

## 2. Dimension Analysis — Each Proposed Dimension Evaluated

### Current Dimensions (5) — Keep All, Refine Weights

#### D1: Machine-Readable Profile
- **What it measures:** Presence and quality of A2A Agent Card, llms.txt, AGENTS.md, robots.txt, Schema.org markup
- **Automatically measurable?** YES — HTTP requests to well-known URLs, parse and validate JSON/markdown
- **Meaningful for agent commerce?** CRITICAL — without discoverability, nothing else matters
- **Recommendation:** REQUIRED. This is the foundation. Keep and expand.

#### D2: MCP/API Endpoints
- **What it measures:** Live, testable endpoints that agents can call; valid tool definitions; proper error handling
- **Automatically measurable?** YES — call endpoints, validate responses, check schemas
- **Meaningful for agent commerce?** CRITICAL — the primary interaction surface for agents
- **Recommendation:** REQUIRED. Keep and expand with quality checks.

#### D3: Agent-Native Onboarding
- **What it measures:** Can an agent create an account, get an API key, start using the service — all without a human?
- **Automatically measurable?** PARTIALLY — can test signup flows, API key endpoints, but full onboarding may require sandbox environments
- **Meaningful for agent commerce?** HIGH — friction in onboarding kills agent adoption
- **Recommendation:** REQUIRED. The agent economy runs 24/7; human-gated onboarding is a blocker.

#### D4: Structured Pricing
- **What it measures:** Machine-readable pricing in JSON/API form; agents can compare plans, calculate costs, evaluate ROI
- **Automatically measurable?** YES — check for pricing endpoints, parse pricing pages, validate schema
- **Meaningful for agent commerce?** HIGH — agents need to make cost decisions autonomously
- **Recommendation:** REQUIRED.

#### D5: Agent Payment Acceptance
- **What it measures:** Wallet-to-wallet payments via Stripe Connect, MPP, ACP, UCP, or x402
- **Automatically measurable?** PARTIALLY — can verify Stripe Connect setup, check for payment endpoints, but actual transaction testing requires sandbox
- **Meaningful for agent commerce?** CRITICAL for transaction-based businesses, less critical for free/info services
- **Recommendation:** REQUIRED for Gold+ tiers, OPTIONAL for Bronze/Silver.

### Proposed NEW Dimensions (10 evaluated)

#### D6: Data Quality (**RECOMMEND: ADD as REQUIRED**)

**The problem (Nate B Jones):** "Wrapping dirty data in MCP produces garbage." An MCP server with inconsistent field names, null values where data is expected, mixed date formats, and stale records is worse than no MCP server — it gives agents false confidence.

**What to measure (automatically):**
| Metric | How to Test | Score Impact |
|--------|-------------|-------------|
| Completeness | % of required fields populated in API responses | High |
| Consistency | Same entity across endpoints returns same data | High |
| Freshness | `Last-Modified` / `updated_at` timestamps within expected range | Medium |
| Format validity | Dates in ISO 8601, currencies with codes, valid URLs | Medium |
| Schema adherence | Response matches declared JSON Schema / OpenAPI spec | High |
| Null rate | % of null/empty values in required fields | Medium |

**0/25/50/75/100 criteria:**
- **0:** API responses contain >50% null required fields, inconsistent field names across endpoints, no schema
- **25:** Responses are valid JSON but >25% null required fields, mixed date formats, no `updated_at` timestamps
- **50:** Responses match a declared schema, <10% null required fields, consistent date formats, timestamps present but some stale (>30 days)
- **75:** Schema compliance >95%, <5% null rate, all timestamps <7 days old, consistent field naming, proper pagination
- **100:** 100% schema compliance, 0% unexplained nulls, all data <24h fresh, semantic field names, includes data provenance metadata

**Automatic measurement:** YES. Crawl API endpoints, sample responses, run schema validation, check null rates, compare field names across endpoints, verify timestamp freshness.

**Verdict:** ADD. Weight: 10%. A business with perfect protocols but garbage data is useless to agents.

#### D7: Observability (**RECOMMEND: ADD as BONUS**)

**What it measures:** Can agents monitor their own interactions with the business? Request/response logging, correlation IDs, OpenTelemetry support, usage dashboards.

**What to measure (automatically):**
| Metric | How to Test | Score Impact |
|--------|-------------|-------------|
| Correlation ID headers | Check for `X-Request-ID` or `X-Correlation-ID` in responses | Medium |
| Rate limit headers | Check for `X-RateLimit-Remaining`, `X-RateLimit-Reset` | Medium |
| Usage endpoint | `GET /usage` or similar returning call counts, quotas | Medium |
| Error detail | Error responses include error codes, messages, request IDs | High |
| OpenTelemetry support | Trace context propagation (`traceparent` header) | Low |

**0/25/50/75/100 criteria:**
- **0:** No request IDs, no rate limit headers, generic error messages ("Internal Server Error")
- **25:** Error responses include error codes but no request IDs, no rate limit headers
- **50:** Responses include `X-Request-ID`, error responses include error codes and messages, rate limit headers present
- **75:** All of above + usage/quota endpoint available, structured error responses with `request_id`, `error_code`, `message`, `details`
- **100:** All of above + OpenTelemetry trace propagation, webhook for usage alerts, real-time status page API

**Automatic measurement:** YES for header checks and endpoint probing. PARTIALLY for OpenTelemetry (requires sending `traceparent` header and checking if it's propagated).

**Verdict:** ADD as BONUS (not required for any tier, but earns extra points). Weight: 5%. Important for sophisticated agents but not a blocker for basic commerce.

#### D8: Security Posture (**RECOMMEND: ADD as REQUIRED**)

**What it measures:** Is the agent-facing surface secure? Authentication, rate limiting, input validation, TLS, OWASP API Top 10 compliance.

**What to measure (automatically):**
| Metric | How to Test | Score Impact |
|--------|-------------|-------------|
| TLS version | Check if TLS 1.2+ is supported, 1.3 preferred | Critical |
| Authentication | API key, OAuth 2.0, JWT — presence and type | Critical |
| Rate limiting | Send burst requests, check for 429 responses | High |
| Input validation | Send malformed inputs, check for proper error handling vs crashes | High |
| CORS configuration | Check `Access-Control-Allow-Origin` isn't `*` for authenticated endpoints | Medium |
| Security headers | `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options` | Medium |
| SQL injection resistance | Send `'; DROP TABLE--` in query params, verify safe handling | High |
| Error information leakage | Check that 500 errors don't expose stack traces, DB schemas, or internal paths | Medium |

**0/25/50/75/100 criteria:**
- **0:** HTTP only (no TLS), no authentication, no rate limiting, stack traces in error responses
- **25:** HTTPS but TLS 1.1 or below, API key auth but keys sent in query params, no rate limiting
- **50:** TLS 1.2+, API key auth in headers, basic rate limiting (429 on burst), proper error handling (no stack traces)
- **75:** TLS 1.3, OAuth 2.0 or JWT auth, rate limiting with `Retry-After` headers, input validation on all endpoints, security headers present, CORS properly configured
- **100:** All of above + signed requests or mTLS, per-agent rate limits with graduated throttling, OWASP API Top 10 compliance verified, security.txt published, CSP headers, automated vulnerability scanning evidence

**Automatic measurement:** YES. TLS checks, auth probing, rate limit testing, input fuzzing, header inspection — all automated via standard security scanning tools (OWASP ZAP, Akto, custom scripts).

**Verdict:** ADD as REQUIRED. Weight: 10%. An insecure agent-facing surface is a liability for every agent that transacts with it. An agent sending payment credentials to an endpoint without TLS is catastrophic.

**Cap rule (borrowed from SSL Labs):** If TLS is not present on agent-facing endpoints, score is capped at Bronze regardless of all other dimensions.

#### D9: Uptime / Reliability (**RECOMMEND: ADD as REQUIRED for Gold+**)

**What it measures:** Historical uptime, response times, error rates. Can agents trust this service will be available when they need it?

**What to measure (automatically):**
| Metric | How to Test | Score Impact |
|--------|-------------|-------------|
| Current availability | Synthetic checks every 5 minutes from multiple regions | Critical |
| p95 response time | Response time at 95th percentile across checks | High |
| Error rate | % of requests returning 5xx in past 30 days | High |
| Status page | Presence of a machine-readable status endpoint | Medium |
| SLA documentation | Published uptime commitment | Low |

**0/25/50/75/100 criteria:**
- **0:** Endpoint unreachable >20% of checks in 30 days, or p95 response time >10s, or >10% 5xx error rate
- **25:** 95% uptime (21+ hours downtime/month), p95 <5s, <5% 5xx rate
- **50:** 99% uptime (~7h downtime/month), p95 <2s, <1% 5xx rate
- **75:** 99.9% uptime (~44min downtime/month), p95 <500ms, <0.1% 5xx rate, machine-readable status endpoint
- **100:** 99.99% uptime (~4min downtime/month), p95 <200ms, <0.01% 5xx rate, status page with incident history API, published SLA

**Automatic measurement:** YES, but requires historical data. On first scan, only current availability and response time can be measured. Score improves over time as monitoring data accumulates (like FICO's "length of credit history").

**Note on bootstrapping:** New businesses will have no uptime history. Default to 50 (neutral) for the first 30 days with a "provisional" flag, then adjust based on observed data. This mirrors FICO's treatment of new credit files (thin files).

**Verdict:** ADD. Weight: 10%. REQUIRED for Gold+ tiers (agents making purchases need reliability). For Bronze/Silver, scored but not required.

#### D10: Compliance (**RECOMMEND: ADD as BONUS**)

**What it measures:** Legal readiness for agent transactions — privacy policy covering agent data use, terms of service permitting agent access, GDPR/CCPA compliance signals.

**What to measure (automatically):**
| Metric | How to Test | Score Impact |
|--------|-------------|-------------|
| Privacy policy existence | Crawl `/privacy`, `/privacy-policy`, check for link in footer | Medium |
| Agent-specific ToS | Terms mentioning "automated", "agent", "API", "machine" access | Medium |
| Data handling disclosure | API responses include data retention/deletion info | Low |
| GDPR signals | Cookie consent, data export endpoint, deletion endpoint | Low |
| Agent ToS endpoint | Machine-readable terms at `/.well-known/agent-terms.json` or similar | Medium |

**0/25/50/75/100 criteria:**
- **0:** No privacy policy, no terms of service, no data handling documentation
- **25:** Generic privacy policy exists but doesn't mention API/agent access
- **50:** Privacy policy and ToS exist, ToS permits automated/API access, basic data handling documentation
- **75:** Agent-specific terms published, data retention periods documented, GDPR/CCPA endpoints available (data export, deletion), privacy policy explicitly covers agent-collected data
- **100:** Machine-readable agent terms at well-known URL, automated data subject access request (DSAR) endpoint, data processing agreement (DPA) available via API, compliance certifications documented (SOC 2, ISO 27001)

**Automatic measurement:** PARTIALLY. Can check for page existence, parse ToS for keywords, verify GDPR endpoints. Cannot verify legal accuracy of documents.

**Verdict:** ADD as BONUS. Weight: 5%. Important for enterprise agents and regulated industries, but shouldn't block small businesses from getting a reasonable score. Legal compliance is hard to fully automate.

#### D11: Human Escalation Path (**RECOMMEND: ADD as REQUIRED for Silver+**)

**What it measures:** When an agent encounters something it cannot handle, is there a clear, machine-readable path to a human?

**What to measure (automatically):**
| Metric | How to Test | Score Impact |
|--------|-------------|-------------|
| Escalation endpoint | `POST /support/escalate` or equivalent accepting structured issue data | High |
| Contact information in Agent Card | `supportUrl`, `supportEmail` fields in Agent Card JSON | Medium |
| Response time SLA | Published expected human response time for escalations | Medium |
| Context transfer | Escalation endpoint accepts conversation/transaction context | Medium |
| Escalation trigger documentation | Published criteria for when to escalate | Low |

**0/25/50/75/100 criteria:**
- **0:** No contact information, no escalation path, agents hit dead ends
- **25:** Email address or contact form exists somewhere on the website, but not in machine-readable format
- **50:** Agent Card includes `supportUrl` and/or `supportEmail`, human reachable within 24 hours during business hours
- **75:** Dedicated API endpoint for escalation, accepts structured context (transaction ID, conversation history, error details), confirmed response within 4 hours
- **100:** Real-time escalation endpoint with webhook confirmation, context handoff protocol, SLA of <1 hour response, issue tracking API for agents to check resolution status

**Automatic measurement:** PARTIALLY. Can verify endpoint existence, check Agent Card fields, test escalation endpoint with dummy data. Cannot verify actual human response times without real escalation tests.

**Verdict:** ADD. Weight: 5%. REQUIRED for Silver+ tiers. Agent commerce will inevitably hit edge cases. A business with no escalation path will have agents abandon mid-transaction and never return.

#### D12: Agent Feedback Loop (**RECOMMEND: SKIP — merge into Observability**)

**What it measures:** Can agents report issues and get them fixed? Error reporting API, incident response time.

**Analysis:** This overlaps significantly with Observability (D7) and Human Escalation (D11). An error reporting API is a form of observability. An incident response process is a form of human escalation. Adding a separate dimension would create scoring ambiguity.

**Verdict:** SKIP as standalone dimension. Fold specific metrics into Observability (structured error responses, request IDs) and Human Escalation (issue reporting endpoint).

#### D13: Multi-Protocol Support (**RECOMMEND: ADD — merge into Machine-Readable Profile**)

**What it measures:** Does the business support MCP, A2A, REST, GraphQL, or only one protocol?

**Analysis:** Protocol support is already partially covered by D1 (Machine-Readable Profile) and D2 (MCP/API Endpoints). Rather than a new dimension, this should be a multiplier within those existing dimensions: supporting multiple protocols earns more points in D1 and D2.

**Specific scoring within D1:**
- 1 protocol (e.g., REST only) = base score
- 2 protocols (e.g., REST + MCP) = +10 bonus points in D1
- 3+ protocols (e.g., REST + MCP + A2A) = +20 bonus points in D1

**Verdict:** MERGE into D1 as a bonus multiplier, not a standalone dimension. Avoids dimension bloat while rewarding multi-protocol businesses.

#### D14: Documentation Quality (**RECOMMEND: ADD as BONUS**)

**What it measures:** How well-documented is the agent-facing interface? Examples, error codes, edge cases, changelog.

**What to measure (automatically):**
| Metric | How to Test | Score Impact |
|--------|-------------|-------------|
| OpenAPI/AsyncAPI spec completeness | Check for descriptions, examples, error schemas in spec | High |
| Error code documentation | Published error code reference, machine-readable | Medium |
| Changelog availability | `/changelog` or version history in API responses | Low |
| Example requests/responses | Presence of examples in OpenAPI spec or docs | Medium |
| SDK availability | Published client SDKs in popular languages | Low |

**0/25/50/75/100 criteria:**
- **0:** No API documentation, no OpenAPI spec, no error code reference
- **25:** Basic OpenAPI spec exists but missing descriptions and examples; error responses are undocumented
- **50:** OpenAPI spec with descriptions for all endpoints, at least 1 example per endpoint, error codes listed
- **75:** Complete OpenAPI spec with examples for all request/response types, dedicated error code reference, versioning documented, changelog maintained
- **100:** Interactive API docs (Swagger UI or equivalent), SDKs in 2+ languages, deprecation notices with migration guides, webhook documentation, sandbox environment documentation

**Automatic measurement:** YES. Parse OpenAPI spec for completeness (descriptions, examples, error schemas), check for docs endpoints, validate example requests.

**Verdict:** ADD as BONUS. Weight: 5%. Agents with good documentation support can use a service more effectively, but undocumented APIs aren't blockers if the schema is valid.

#### D15: Transaction Capability (**RECOMMEND: SKIP — already covered**)

**What it measures:** Can the business actually CLOSE a deal through the agent interface? End-to-end transaction support.

**Analysis:** This is the composite of D3 (Onboarding) + D4 (Pricing) + D5 (Payment). If an agent can onboard, understand pricing, and pay, it can transact. Creating a separate "transaction capability" dimension would double-count these factors.

**Verdict:** SKIP. Already fully covered by existing dimensions D3+D4+D5.

---

## 3. Proposed Scoring Rubric — The AgentHermes Agent Readiness Score (ARS)

### 3.1 Final Dimension Set (9 dimensions)

| # | Dimension | Weight | Type | Rationale |
|---|-----------|--------|------|-----------|
| D1 | **Discoverability** (Machine-Readable Profile) | 20% | REQUIRED | Agents must find you first. Includes Agent Card, llms.txt, AGENTS.md, Schema.org, multi-protocol bonus. |
| D2 | **Interoperability** (MCP/API Endpoints) | 20% | REQUIRED | The agent interaction surface. Live endpoints, valid schemas, proper error handling. |
| D3 | **Onboarding** (Agent-Native Signup) | 10% | REQUIRED | Frictionless, 24/7, no-human-required account creation and API key provisioning. |
| D4 | **Pricing Transparency** (Structured Pricing) | 10% | REQUIRED | Machine-readable pricing agents can evaluate, compare, and commit to. |
| D5 | **Payment Readiness** (Agent Payment Acceptance) | 10% | REQUIRED for Gold+ | Accepting payments from agents via MPP, ACP, Stripe Connect, x402. |
| D6 | **Data Quality** | 10% | REQUIRED | Clean, consistent, fresh, schema-compliant data in all API responses. |
| D7 | **Security Posture** | 10% | REQUIRED | TLS, auth, rate limiting, input validation, no info leakage. |
| D8 | **Reliability** (Uptime & Performance) | 5% | REQUIRED for Gold+ | Historical uptime, response times, error rates. Builds over time. |
| D9 | **Agent Experience** (Escalation + Observability + Docs) | 5% | BONUS | Human escalation path, request IDs, structured errors, documentation quality. |
| | **TOTAL** | **100%** | | |

### 3.2 Weight Rationale

The weights follow the "agent transaction funnel":

```
DISCOVER (D1: 20%)
    |
    v
INTERACT (D2: 20%)
    |
    v
ONBOARD (D3: 10%)  -->  EVALUATE PRICING (D4: 10%)
    |                          |
    v                          v
TRUST (D6: 10% + D7: 10%)   PAY (D5: 10%)
    |                          |
    v                          v
RELY ON (D8: 5%)           RESOLVE ISSUES (D9: 5%)
```

- **Discovery + Interaction = 40%** because they are prerequisites. Without them, nothing else matters. (Analogous to FICO's Payment History + Amounts Owed = 65%.)
- **Onboarding + Pricing + Payment = 30%** because they represent the transaction capability.
- **Data Quality + Security = 20%** because they represent trust signals.
- **Reliability + Agent Experience = 10%** because they represent operational maturity (develops over time).

### 3.3 Detailed Rubric — Each Dimension

---

#### D1: Discoverability (20% of total score)

**What agents need:** To find the business, understand what it does, and know how to interact with it — all without visiting a website.

| Score | Criteria |
|-------|----------|
| **0** | No machine-readable profile. No Agent Card, no llms.txt, no AGENTS.md, no Schema.org, no OpenAPI spec. Business is invisible to agents. |
| **25** | ONE of the following exists: llms.txt OR Schema.org markup OR robots.txt allowing agent crawlers. Content is minimal (under 100 words) or has structural issues. |
| **50** | A2A Agent Card exists at `/.well-known/agent-card.json` with valid JSON containing: name, description, url, and at least one capability. OR llms.txt + OpenAPI spec both present and valid. |
| **75** | Agent Card with all required fields (name, description, url, capabilities, authentication requirements, version). PLUS llms.txt with business description, services, and contact info. PLUS robots.txt allowing agent crawlers. PLUS at least one additional protocol (OpenAPI, Schema.org, or AGENTS.md). |
| **100** | Complete A2A Agent Card with signed security card (v0.3+). llms.txt with full service catalog. AGENTS.md with integration instructions. OpenAPI 3.1 spec with full descriptions. Schema.org/JSON-LD on all pages. robots.txt with agent-specific directives. MCP server advertised via `/.well-known/mcp.json`. Supports 3+ discovery protocols. |

**Specific measurable checks (automated):**
1. `HEAD /.well-known/agent-card.json` returns 200 with valid JSON (10 pts)
2. `HEAD /llms.txt` returns 200 with valid markdown containing sections (5 pts)
3. `HEAD /AGENTS.md` or `/agents.md` returns 200 (3 pts)
4. `HEAD /openapi.json` or `/api/openapi` returns valid OpenAPI 3.x (5 pts)
5. `HEAD /robots.txt` returns 200, does not block all crawlers (2 pts)
6. Homepage contains Schema.org/JSON-LD markup (3 pts)
7. `HEAD /.well-known/mcp.json` returns valid MCP server pointer (5 pts)
8. Agent Card contains `capabilities` array with at least 1 entry (5 pts)
9. Agent Card contains `authentication` section (5 pts)
10. Multi-protocol bonus: 2 protocols = +7 pts, 3+ = +15 pts (up to 15 pts)

**Points possible:** 58 raw points, normalized to 0-100 for this dimension.

---

#### D2: Interoperability (20% of total score)

**What agents need:** Live API endpoints they can call, with valid schemas, proper error handling, and predictable behavior.

| Score | Criteria |
|-------|----------|
| **0** | No callable API endpoints. Or endpoints exist but return HTML instead of structured data. Or all endpoints return 5xx errors. |
| **25** | At least 1 live REST endpoint returning valid JSON with 200 status. No schema documentation. Error handling returns generic 500. Response time >5s. |
| **50** | MCP server OR REST API with 3+ endpoints returning valid JSON. Responses match a basic schema. Error responses use proper HTTP status codes (400, 401, 404, 500). p95 response time <2s. |
| **75** | MCP server with SSE transport and 5+ tools with complete JSON Schema definitions (description, parameters, required fields, return types). OR REST API with OpenAPI spec and all endpoints validated against it. Proper pagination. Error responses include error codes and messages. p95 <500ms. |
| **100** | Full MCP server (tools + resources + prompts) with SSE transport and valid `mcp.json`. All tool schemas include descriptions, examples, and error definitions. Idempotent operations marked. Versioned API with backward compatibility. Health check endpoint. p95 <200ms. All responses include `Content-Type: application/json`, proper cache headers. |

**Specific measurable checks (automated):**
1. At least 1 endpoint returns valid JSON with 200 (10 pts)
2. MCP server responds to `initialize` and `tools/list` (15 pts)
3. MCP tools have `description` and `inputSchema` with `required` fields (10 pts)
4. Error responses use correct HTTP status codes (400, 401, 403, 404, 429, 500) (5 pts)
5. Error responses include structured body: `{"error": {"code": "...", "message": "..."}}` (5 pts)
6. p95 response time <1s across sampled endpoints (10 pts)
7. Pagination support on list endpoints (5 pts)
8. `Content-Type` header present and correct (3 pts)
9. API versioning visible (URL path, header, or query param) (5 pts)
10. Health check endpoint returns 200 with uptime info (5 pts)
11. MCP resources and/or prompts available (5 pts)
12. Idempotency keys or idempotent methods documented (2 pts)

**Points possible:** 80 raw points, normalized to 0-100.

---

#### D3: Onboarding (10% of total score)

**What agents need:** To create an account, get credentials, and start using the service — all programmatically, at 3am on a Sunday.

| Score | Criteria |
|-------|----------|
| **0** | Signup requires a phone call, email exchange, or manual approval. No API for account creation. |
| **25** | Web signup form exists but requires CAPTCHA, email verification with manual link click, or human approval step. API key issuable only through a dashboard. |
| **50** | API endpoint for account creation (`POST /signup` or equivalent) that returns credentials. May require email verification but verification can be completed via API. API key available immediately or within minutes. |
| **75** | Fully automated signup: `POST /api/signup` with email/org name returns API key in response. No email verification required for sandbox/trial access. Sandbox environment available immediately. Documentation for onboarding flow accessible via API. |
| **100** | Zero-friction agent onboarding: OAuth 2.0 client credentials flow OR API key issuance via single POST. Sandbox with test data pre-populated. Automated credential rotation endpoint. Self-service plan upgrades via API. Webhook for onboarding status notifications. MCP tool `create_account` available. |

**Specific measurable checks (automated):**
1. Signup endpoint exists and accepts POST with JSON body (15 pts)
2. Signup returns credentials (API key, token) without human approval (20 pts)
3. Sandbox/trial tier available without payment (10 pts)
4. API key management endpoint exists (create, rotate, revoke) (10 pts)
5. OAuth 2.0 client credentials flow supported (10 pts)
6. Time from signup request to first successful API call <5 minutes (15 pts)
7. Onboarding documentation available via API or llms.txt (5 pts)
8. MCP tool for account creation (5 pts)
9. No CAPTCHA or manual verification required (10 pts)

**Points possible:** 100 raw points. Note: Check #2 is weighted heavily because it's the critical path.

---

#### D4: Pricing Transparency (10% of total score)

**What agents need:** To understand costs, compare plans, and make purchasing decisions — all from structured data.

| Score | Criteria |
|-------|----------|
| **0** | No pricing information available. Or pricing is only in an image/PDF. "Contact sales" is the only option. |
| **25** | Pricing page exists on website with human-readable text. No machine-readable format. No API endpoint for pricing. |
| **50** | Pricing available via API endpoint (`GET /pricing` or `/api/plans`) returning JSON with plan names, prices, and basic feature lists. Or pricing embedded in OpenAPI spec as structured metadata. |
| **75** | Structured pricing API returning: plan names, prices (with currency codes ISO 4217), billing intervals, feature lists with limits, usage-based pricing tiers with clear thresholds. Pricing includes volume discounts and comparison data. |
| **100** | Complete pricing API: all plans with prices, currencies, billing intervals, feature matrices, usage tiers, volume discounts, custom quote endpoint, price change webhook, price comparison tool (vs competitors), free tier details, refund policy in machine-readable format. Pricing conforms to UCP (Universal Commerce Protocol) or equivalent standard. |

**Specific measurable checks (automated):**
1. Pricing endpoint exists returning JSON (15 pts)
2. Prices include currency code (ISO 4217: "USD", "EUR") (10 pts)
3. Billing interval specified ("monthly", "annual", "usage") (10 pts)
4. Feature lists or limits included per plan (10 pts)
5. Free tier or trial documented in pricing data (10 pts)
6. Usage-based pricing thresholds clearly defined (10 pts)
7. Pricing data includes `effective_date` or version (5 pts)
8. `/pricing` is also referenced in Agent Card capabilities (5 pts)
9. Volume discount tiers documented (5 pts)
10. Price change notification mechanism (webhook or changelog) (10 pts)
11. Refund policy in structured format (5 pts)
12. UCP or Schema.org/Product pricing markup (5 pts)

**Points possible:** 100 raw points.

---

#### D5: Payment Readiness (10% of total score)

**What agents need:** To pay for services programmatically — via Stripe Connect, MPP, ACP, x402, or other agent payment protocols.

| Score | Criteria |
|-------|----------|
| **0** | No programmatic payment method. Invoice-only or manual bank transfer. No payment API. |
| **25** | Stripe Checkout or similar hosted payment page. Payment requires browser session. No API-initiated payments. |
| **50** | API-initiated payments via Stripe PaymentIntents, or equivalent. Agent can trigger payment via API call. Basic: single currency, single payment method. |
| **75** | Multi-method payment API: Stripe Connect + at least one agent-native protocol (MPP, ACP, or x402). Multiple currencies supported. Usage-based billing with metering API. Invoice endpoint for transaction history. |
| **100** | Full agent payment stack: Stripe Connect operational + MPP integration + Shared Payment Token (SPT) support. Real-time payment confirmation webhooks. Multi-currency with automatic conversion. Usage metering with pre-authorized spending limits (MPP sessions). Refund API. Dispute resolution endpoint. Payment receipt in machine-readable format. |

**Specific measurable checks (automated):**
1. Payment endpoint exists (POST to create payment intent/session) (15 pts)
2. Stripe Connect account verified and active (15 pts)
3. MPP endpoint responds to payment request negotiation (15 pts)
4. Multiple currencies accepted (5 pts)
5. Usage metering API exists (10 pts)
6. Transaction history endpoint (GET /transactions) (5 pts)
7. Payment confirmation webhook documented (10 pts)
8. Refund endpoint exists (5 pts)
9. ACP or x402 support (10 pts)
10. Pre-authorized spending limits / session-based payments (10 pts)

**Points possible:** 100 raw points.

---

#### D6: Data Quality (10% of total score)

**What agents need:** Clean, consistent, fresh data they can reason about without error-prone parsing or guesswork.

| Score | Criteria |
|-------|----------|
| **0** | API responses contain >50% null/empty required fields. Field names are inconsistent across endpoints (e.g., `user_id` vs `userId` vs `uid`). No schema. Dates in multiple formats. Stale data (>90 days since last update). |
| **25** | Responses are valid JSON. <25% null required fields. Field naming is mostly consistent but with some exceptions. Dates in at least one standard format. Some timestamps present. |
| **50** | Responses match a declared schema (OpenAPI/JSON Schema). <10% null required fields. Consistent field naming convention (camelCase OR snake_case, not mixed). Dates in ISO 8601. All records have `updated_at` or equivalent, most within 30 days. |
| **75** | >95% schema compliance across all sampled responses. <5% null rate on required fields. Consistent naming throughout. All timestamps <7 days old for active data. Proper pagination with total counts. Enums documented and enforced. UTF-8 encoding throughout. |
| **100** | 100% schema compliance. 0% unexplained nulls (nulls are documented as intentional with `nullable: true` in schema). All active data <24h fresh. Semantic field names (not `field1`, `data`). Data provenance metadata included. Consistent enum values with documented mappings. Proper handling of empty collections (empty array, not null). All monetary values include currency code. |

**Specific measurable checks (automated):**
1. Sample 10+ endpoint responses, validate against declared schema (20 pts)
2. Calculate null rate on required fields across samples (15 pts)
3. Check field naming consistency (all camelCase OR all snake_case) (10 pts)
4. Validate date formats are ISO 8601 (10 pts)
5. Check `updated_at` / `created_at` freshness across records (10 pts)
6. Verify enum values match documented options (5 pts)
7. Check monetary values include currency codes (5 pts)
8. Verify empty collections are `[]` not `null` (5 pts)
9. Check UTF-8 encoding (no mojibake) (5 pts)
10. Verify pagination metadata (total, page, per_page) is accurate (5 pts)
11. Cross-endpoint consistency (same entity returns same data from different endpoints) (10 pts)

**Points possible:** 100 raw points.

---

#### D7: Security Posture (10% of total score)

**What agents need:** Confidence that their credentials, payment data, and transaction details are protected.

| Score | Criteria |
|-------|----------|
| **0** | HTTP only (no TLS). No authentication required. Stack traces or database errors exposed in responses. No rate limiting. |
| **25** | HTTPS present but TLS 1.1 or weak ciphers. API key authentication but keys in query parameters. No rate limiting. Error responses sometimes leak internal paths or library versions. |
| **50** | TLS 1.2+ with strong ciphers. API key auth via `Authorization` header. Rate limiting present (returns 429 on burst). Error responses are clean (no stack traces, no internal paths). CORS configured (not wildcard for authenticated endpoints). |
| **75** | TLS 1.3 supported. OAuth 2.0 or JWT-based authentication. Rate limiting with `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After` headers. Input validation on all endpoints (malformed input returns 400, not 500). Security headers present: `Strict-Transport-Security`, `X-Content-Type-Options`. CORS properly scoped. `security.txt` published. |
| **100** | All of 75 plus: mTLS or signed request support. Per-agent rate limits with graduated throttling. OWASP API Top 10 clean (verified by automated scan). Content Security Policy headers. API key scoping (per-endpoint permissions). Automated credential rotation support. Security vulnerability disclosure program. SOC 2 or equivalent certification referenced. |

**Specific measurable checks (automated):**
1. TLS present and version >= 1.2 (15 pts, HARD REQUIREMENT — 0 pts for entire dimension if no TLS)
2. Auth mechanism present and credentials not in URL query params (15 pts)
3. Rate limiting responds with 429 on burst (10 requests/second test) (10 pts)
4. Rate limit headers present in responses (5 pts)
5. Malformed JSON input returns 400, not 500 (10 pts)
6. SQL injection test strings return 400 or safe response, not 500 (10 pts)
7. Error responses do not contain stack traces, file paths, or DB info (10 pts)
8. Security headers present (HSTS, X-Content-Type-Options) (5 pts)
9. CORS not set to `*` for authenticated endpoints (5 pts)
10. `/.well-known/security.txt` exists (3 pts)
11. Auth tokens/keys have expiration mechanism (5 pts)
12. TLS 1.3 supported (bonus 7 pts)

**Points possible:** 100 raw points.

**HARD CAP RULE:** If check #1 fails (no TLS), the entire score is capped at 39 (max Bronze), regardless of all other dimensions. This mirrors SSL Labs' immediate-F-for-critical-vulnerability pattern.

---

#### D8: Reliability (5% of total score)

**What agents need:** Confidence the service will be available when they need it, with predictable performance.

| Score | Criteria |
|-------|----------|
| **0** | Endpoint unreachable on >20% of synthetic checks over 30 days. OR p95 response time >10s. OR >10% server error (5xx) rate. |
| **25** | 95% uptime (allows ~36h downtime/month). p95 response time <5s. 5xx rate <5%. No status page. |
| **50** | 99% uptime (~7.2h downtime/month). p95 response time <2s. 5xx rate <1%. |
| **75** | 99.9% uptime (~43.8min downtime/month). p95 response time <500ms. 5xx rate <0.1%. Machine-readable status endpoint (`GET /status` returning JSON with component statuses). |
| **100** | 99.99% uptime (~4.3min downtime/month). p95 response time <200ms. 5xx rate <0.01%. Status page API with historical incident data. Published SLA with uptime guarantee. Maintenance window notifications via webhook. Multi-region deployment evidence. |

**Specific measurable checks (automated):**
1. Endpoint responds to synthetic health check (10 pts baseline)
2. Uptime percentage over trailing 30 days (up to 25 pts, scaled)
3. p95 response time measurement across 100+ probes (up to 20 pts, scaled)
4. 5xx error rate across probes (up to 15 pts, scaled)
5. Status endpoint exists returning JSON (10 pts)
6. Status endpoint includes component-level breakdown (5 pts)
7. Historical incident data available via API (5 pts)
8. Published SLA document (5 pts)
9. Maintenance window notification mechanism (5 pts)

**Points possible:** 100 raw points.

**Bootstrapping rule:** New businesses with <30 days of monitoring data receive a provisional score of 50 with a "NEW" badge. Score adjusts monthly as data accumulates. This is analogous to FICO's "thin file" treatment.

---

#### D9: Agent Experience (5% of total score)

**What agents need:** A graceful degradation path when things go wrong, plus the tooling to understand what's happening.

This is a composite dimension covering three sub-areas: Human Escalation, Observability, and Documentation.

| Score | Criteria |
|-------|----------|
| **0** | No escalation path. No request IDs. No documentation. Agents hit dead ends with no recourse. |
| **25** | Contact email exists somewhere on the website (not machine-readable). Error responses include HTTP status codes but no request IDs. Some API documentation exists. |
| **50** | Agent Card includes `supportUrl` or `supportEmail`. Responses include `X-Request-ID` header. Error responses include `error_code` and `message`. API documentation covers all endpoints with descriptions. |
| **75** | Dedicated escalation endpoint accepting structured issue data (transaction ID, error details). All responses include `X-Request-ID` and rate limit headers. Structured error responses with `request_id`, `error_code`, `message`, `details`, and suggested retry behavior. OpenAPI spec with examples for all endpoints. Error code reference published. |
| **100** | Real-time escalation with webhook confirmation and SLA. OpenTelemetry trace propagation (`traceparent` header). Usage/quota dashboard API. Interactive docs with sandbox. SDKs in 2+ languages. Changelog with versioning. Deprecation notices with migration timelines. Issue tracking API for agents to monitor resolution. |

**Specific measurable checks (automated):**
1. Agent Card contains support contact info (10 pts)
2. Escalation endpoint exists and accepts POST with structured data (15 pts)
3. Responses include `X-Request-ID` header (10 pts)
4. Rate limit headers present (`X-RateLimit-*`) (5 pts)
5. Error responses include `error_code` + `message` (not just HTTP status) (10 pts)
6. API documentation accessible via URL (10 pts)
7. OpenAPI spec includes descriptions for all endpoints (5 pts)
8. OpenAPI spec includes example requests/responses (5 pts)
9. Error code reference published and machine-readable (5 pts)
10. OpenTelemetry `traceparent` header propagated (5 pts)
11. Usage/quota endpoint available (5 pts)
12. Changelog or API versioning documentation (5 pts)
13. SDK or client library available (5 pts)
14. Sandbox/test environment documented (5 pts)

**Points possible:** 100 raw points.

---

### 3.4 Score Calculation Formula

```
Total Score = (D1 * 0.20) + (D2 * 0.20) + (D3 * 0.10) + (D4 * 0.10)
            + (D5 * 0.10) + (D6 * 0.10) + (D7 * 0.10) + (D8 * 0.05)
            + (D9 * 0.05)

Where each Dx is a 0-100 score for that dimension.
Total Score range: 0-100
```

**Cap rules applied AFTER calculation:**
1. **No TLS Cap:** If D7 check #1 fails (no TLS on agent-facing endpoints), total score is capped at 39 (max Bronze).
2. **No Agent Card Cap:** If D1 does not include a valid Agent Card at `/.well-known/agent-card.json`, total score is capped at 59 (max Bronze).
3. **No API Cap:** If D2 scores 0 (no callable endpoints), total score is capped at 29.

---

## 4. Tier Requirements

### Updated Tier Thresholds

| Tier | Score Range | Hard Requirements |
|------|------------|-------------------|
| **Unrated** | 0-19 | No agent-facing surface detected. Business is invisible to agents. |
| **Bronze** | 20-49 | Must have at least 1 machine-readable profile element (llms.txt, Schema.org, or Agent Card). Must have at least 1 callable API endpoint. |
| **Silver** | 50-69 | All Bronze requirements PLUS: Valid A2A Agent Card. HTTPS on all agent-facing endpoints. At least 3 callable API endpoints with schema validation. Human escalation path documented in Agent Card. |
| **Gold** | 70-84 | All Silver requirements PLUS: MCP server with SSE transport and 5+ tools. Machine-readable pricing endpoint. Payment acceptance via at least 1 protocol (Stripe Connect, MPP, ACP, or x402). 99%+ uptime over trailing 30 days. Data quality score >= 50. |
| **Platinum** | 85-100 | All Gold requirements PLUS: Multi-protocol support (MCP + A2A + REST). Zero-friction agent onboarding (API key in <5 min, no CAPTCHA). 99.9%+ uptime. Security score >= 75. Full agent experience stack (escalation endpoint, request IDs, structured errors, documentation). |

### Tier-Specific Badges

| Tier | Badge Text | Color | Signal to Agents |
|------|-----------|-------|-----------------|
| Unrated | "Not Yet Rated" | Gray | Do not transact |
| Bronze | "Agent Discoverable" | Bronze (#CD7F32) | Agent can find info but transactions are risky |
| Silver | "Agent Compatible" | Silver (#C0C0C0) | Agent can interact safely but commerce is limited |
| Gold | "Agent Commerce Ready" | Gold (#FFD700) | Agent can discover, interact, and transact with confidence |
| Platinum | "Agent Commerce Certified" | Platinum (#E5E4E2) | Full agent commerce stack, highest trust signal |

---

## 5. Quick Wins — Easiest Score Improvements

### Tier: Unrated to Bronze (< 1 hour each)

| Quick Win | Time | Score Impact | How |
|-----------|------|-------------|-----|
| Add llms.txt | 15 min | D1 +25 pts (+5 total) | Create `/llms.txt` with business name, description, services, contact. [llmstxt.org](https://llmstxt.org/) has the spec. |
| Add robots.txt allowing agents | 5 min | D1 +5 pts (+1 total) | Create `/robots.txt` with `User-agent: *` and `Allow: /`. |
| Enable HTTPS | 30 min | D7 removes cap | Most hosts offer free SSL via Let's Encrypt. Without this, score is capped at 39. |
| Add Schema.org/JSON-LD | 30 min | D1 +10 pts (+2 total) | Add `<script type="application/ld+json">` to homepage with Organization schema. |
| Fix error responses | 30 min | D2 +10 pts (+2 total) | Return proper HTTP status codes (400 for bad input, not 500) and structured JSON error bodies. |

### Tier: Bronze to Silver (< 4 hours each)

| Quick Win | Time | Score Impact | How |
|-----------|------|-------------|-----|
| Create Agent Card | 1 hr | D1 +25 pts (+5 total), removes 59-cap | Create `/.well-known/agent-card.json` with name, description, url, capabilities, auth requirements. |
| Add security headers | 30 min | D7 +15 pts (+1.5 total) | Add `Strict-Transport-Security`, `X-Content-Type-Options: nosniff` to all responses. |
| Add rate limiting | 2 hrs | D7 +15 pts (+1.5 total) | Implement 429 responses with `Retry-After` header on API endpoints. |
| Add X-Request-ID | 30 min | D9 +10 pts (+0.5 total) | Generate UUID for each request, return in `X-Request-ID` response header. |
| Add support contact to Agent Card | 5 min | D9 +10 pts (+0.5 total) | Add `supportUrl` and `supportEmail` fields to Agent Card JSON. |
| Standardize error format | 1 hr | D2 +15 pts (+3 total) | All errors return `{"error": {"code": "INVALID_INPUT", "message": "...", "request_id": "..."}}`. |

### Tier: Silver to Gold (< 1 day each)

| Quick Win | Time | Score Impact | How |
|-----------|------|-------------|-----|
| Create MCP server | 4 hrs | D2 +30 pts (+6 total) | Wrap existing REST API as MCP server using Anthropic's MCP SDK. Expose tools with JSON Schema definitions. |
| Add pricing endpoint | 2 hrs | D4 +50 pts (+5 total) | Create `GET /api/pricing` returning JSON with plan names, prices (with currency codes), billing intervals, features. |
| Connect Stripe | 2 hrs | D5 +50 pts (+5 total) | Set up Stripe Connect account, create payment intent endpoint. |
| Fix field naming consistency | 2 hrs | D6 +15 pts (+1.5 total) | Audit all API responses; standardize on camelCase or snake_case throughout. |
| Add ISO 8601 dates | 1 hr | D6 +10 pts (+1 total) | Convert all date fields to ISO 8601 format (`2026-03-25T14:30:00Z`). |

### Tier: Gold to Platinum (multi-day efforts)

| Quick Win | Time | Score Impact | How |
|-----------|------|-------------|-----|
| Add A2A protocol support | 2 days | D1 +15 pts (+3 total) | Implement A2A task endpoints alongside MCP server. |
| Zero-friction signup | 1 day | D3 +40 pts (+4 total) | Create `POST /api/signup` that returns API key without email verification or CAPTCHA. |
| Add MPP support | 1 day | D5 +25 pts (+2.5 total) | Integrate Machine Payments Protocol alongside Stripe Connect. |
| Build escalation endpoint | 4 hrs | D9 +15 pts (+0.75 total) | Create `POST /api/support/escalate` accepting `{transaction_id, error_details, context}`. |
| OpenTelemetry integration | 1 day | D9 +5 pts (+0.25 total) | Propagate `traceparent` headers through your service. |

---

## 6. Sources

### Scoring Methodology References
- [myFICO — What's in Your Credit Score](https://www.myfico.com/credit-education/whats-in-your-credit-score)
- [Equifax — What is a FICO Score](https://www.equifax.com/personal/education/credit/score/articles/-/learn/what-is-a-fico-score/)
- [Chrome Developers — Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
- [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)
- [SSL Labs Server Rating Guide](https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide)
- [Qualys Grades Calculation](https://docs.qualys.com/en/certview/latest/scans/ssl_grading.htm)
- [Secureframe — Trust Services Criteria for SOC 2](https://secureframe.com/hub/soc-2/trust-services-criteria)
- [CSA — 5 SOC 2 Trust Services Criteria](https://cloudsecurityalliance.org/blog/2023/10/05/the-5-soc-2-trust-services-criteria-explained)
- [SEO Testing — What is Domain Authority](https://seotesting.com/blog/what-is-domain-authority/)
- [Moz DA Explained](https://xamsor.com/blog/moz-da-domain-authority-explained/)

### Agent Commerce & Protocol References
- [A2A Protocol Specification](https://a2a-protocol.org/latest/specification/)
- [Google Developers Blog — A2A Protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [llms.txt Specification](https://llmstxt.org/)
- [Stripe — Machine Payments Protocol](https://stripe.com/blog/machine-payments-protocol)
- [Stripe MPP Documentation](https://docs.stripe.com/payments/machine/mpp)
- [Agentic Commerce Protocols 2026](https://opascope.com/insights/ai-shopping-assistant-guide-2026-agentic-commerce-protocols/)
- [McKinsey — Agentic Commerce](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-automation-curve-in-agentic-commerce)
- [MCP 2026 Roadmap](http://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)
- [MCPBench — MCP Server Evaluation](https://github.com/modelscope/MCPBench)

### Competitive Intelligence
- [Agentiview](https://agentiview.com/)
- [AgentReady.site](https://agentready.site/)
- [Agent Readiness Score (open source)](https://github.com/jpequegn/agent-readiness-score)

### Data Quality & Security
- [Collibra — 6 Dimensions of Data Quality](https://www.collibra.com/blog/the-6-dimensions-of-data-quality)
- [Informatica — Data Quality Metrics](https://www.informatica.com/resources/articles/data-quality-metrics-and-measures.html)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)
- [OWASP API Security Testing Framework](https://owasp.org/www-project-api-security-testing-framework/)

### Observability & Reliability
- [SigNoz — Observability Maturity Model](https://signoz.io/guides/observability-maturity-model/)
- [AWS Observability Maturity Model](https://aws-observability.github.io/observability-best-practices/guides/observability-maturity-model/)
- [Postman — SLA Monitoring](https://blog.postman.com/sla-monitoring/)
- [API SLA Management](https://apicontext.com/understanding-api/api-sla-management/)

### API Quality & Measurement
- [Gravitee — API Quality Scoring](https://documentation.gravitee.io/apim/4.1/guides/api-measurement-tracking-and-analytics/using-the-api-quality-feature)
- [Google Cloud — KPIs for APIs](https://cloud.google.com/blog/products/api-management/kpis-for-apis-12-key-metrics-for-api-programs)
- [Moesif — API Metrics](https://www.moesif.com/blog/technical/api-metrics/API-Metrics-That-Every-Platform-Team-Should-be-Tracking/)

### Human Escalation
- [Smith.ai — AI-Human Handoff Protocols](https://smith.ai/blog/ai-human-call-handoff-protocols)
- [OpenAI Agents SDK — Handoffs](https://openai.github.io/openai-agents-python/handoffs/)
- [Google Cloud — Handoff to Human Agent](https://docs.cloud.google.com/agent-assist/docs/handoff)
