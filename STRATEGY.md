# AgentHermes Strategic Plan — Becoming the Industry Standard

> Synthesized from 4 research agents covering: JarvisSDK analysis, protocol landscape, self-audit, and market research. March 2026.

## The Thesis

**Nobody is solving the business-side onboarding problem for the agent economy.**

Every player in the space serves developers or enterprises. Smithery indexes MCP tools. Composio connects APIs. Stripe/Visa build payment rails. But there is no platform that takes a regular business and makes it agent-ready across all dimensions: discoverable, transactable, trusted, and verified.

**AgentHermes = "Shopify for agent readiness."**

The analogy: SSL certificates made websites trustworthy for e-commerce. AgentHermes certification makes businesses trustworthy for agent commerce. No agent will transact with a business without an agent-readiness signal — just like no one buys from a site without the padlock.

## Market Size

- AI agents influenced **$67B** in Cyber Week sales (20% of digital orders)
- Agent commerce projected at **$3-5 trillion by 2030**
- **40% of SMBs** will deploy agents by end of 2026 (Gartner)
- Median business agent-readiness score: **41/100** (Agentiview, 2,600+ companies)
- 33M small businesses in the US alone — massive underserved market

## Competitive Landscape

| Competitor | What They Do | Their Weakness |
|-----------|-------------|---------------|
| **Agentiview** | Agent readiness scoring, $349-$15K consulting | Expensive, no remediation, no commerce |
| **AgentReady.site** | Free website scanner | Scan only, no registry, no payments |
| **Smithery.ai** | 100K+ MCP tools marketplace | Developer-only, no business readiness |
| **Composio** | 850+ API connectors | Developer platform, not business-facing |
| **Skyfire** | Agent wallets + KYA identity | Payment rails only, no discovery |
| **Nevermined** | Agent-to-agent payments | Payment infra only, no business onboarding |

**Nobody combines: Scan + Remediate + List + Discover + Transact + Verify.**

AgentHermes does all six.

## Protocol Stack (What We Must Support)

The industry is converging on a multi-protocol stack:

| Layer | Standard | AgentHermes Status | Priority |
|-------|----------|-------------------|----------|
| **Discovery** | A2A Agent Cards (`/.well-known/agent-card.json`) | NOT IMPLEMENTED | P0 |
| **Tool Access** | MCP (JSON-RPC 2.0, SSE transport) | Partial (HTTP only, no SSE) | P1 |
| **Agent Docs** | llms.txt | NOT IMPLEMENTED | P0 |
| **API Spec** | OpenAPI 3.x | NOT IMPLEMENTED | P1 |
| **Commerce** | UCP (/.well-known/ucp) | NOT IMPLEMENTED | P2 |
| **Payments** | MPP / x402 / ACP / Stripe Agent Toolkit | Stripe Connect (partial) | P2 |
| **Trust** | Visa TAP / ERC-8004 | Own scoring system (good start) | P1 |
| **UI Streaming** | AG-UI / A2UI | NOT IMPLEMENTED | P3 |
| **Instructions** | AGENTS.md | NOT IMPLEMENTED | P0 |

## Self-Audit: AgentHermes Scores 32/60 on Its Own Criteria

The irony: we audit others for agent-readiness but fail our own test.

| Area | Current Score | Gap |
|------|--------------|-----|
| MCP Server | 6/10 | No SSE, no resources, no prompts, no auth on payment tool |
| A2A Protocol | 1/10 | No Agent Card at all |
| Machine-Readable Profiles | 4/10 | No llms.txt, no OpenAPI, no robots.txt |
| Programmatic Onboarding | 7/10 | No API key issuance, no Stripe onboarding route |
| Agent Payment | 7/10 | No usage metering, no refunds, no MCP payment auth |
| Discovery | 7/10 | No semantic search, no service-level search |

## The Plan: 4 Phases

### Phase 1: Eat Our Own Dogfood (Week 1) — P0
Make AgentHermes itself score 90+ on its own audit.

**Deliverables:**
1. `/.well-known/agent-card.json` — AgentHermes A2A Agent Card
2. `/llms.txt` — Full platform description for LLM consumption
3. `/.well-known/mcp.json` — Pointer to our MCP server
4. `/openapi.json` — Auto-generated OpenAPI 3.x spec for all 12 API routes
5. `/robots.txt` — Allow agent crawlers
6. `/sitemap.xml` — All pages indexed
7. `AGENTS.md` — Instructions for AI agents working with AgentHermes

**Why first:** If we can't pass our own audit, we have zero credibility auditing others.

### Phase 2: Protocol Completeness (Weeks 2-3) — P1
Full MCP + A2A + discovery stack.

**Deliverables:**
1. **MCP SSE Transport** — `GET /api/mcp/sse` for streaming, standard MCP SDK compatibility
2. **MCP Resources** — Expose business profiles and audit results as MCP resources
3. **MCP Prompts** — "audit-url", "find-service", "check-trust" prompt templates
4. **A2A Task Protocol** — `POST /api/a2a/tasks/send`, status tracking, async completion
5. **Per-Business API Keys** — `POST /api/v1/business/[slug]/api-keys` for programmatic auth
6. **Business Update API** — `PATCH /api/v1/business/[slug]`
7. **Service-Level Discovery** — `GET /api/v1/discover/services` (search across all services)
8. **Stripe Connect Onboarding Route** — `POST /api/v1/business/[slug]/connect`
9. **Transaction History** — `GET /api/v1/wallet/transactions`
10. **Auth on MCP Payment Tools** — Require identity proof for `initiate_payment`

### Phase 3: Auto-Remediation Engine (Weeks 3-5) — The Killer Feature
This is what separates AgentHermes from every competitor.

**The flow:**
```
Business visits agenthermes.ai → enters URL → gets score (35/100)
  → "Want to fix this? Click here."
  → AgentHermes auto-generates:
    - llms.txt for their site
    - Agent Card JSON
    - MCP server wrapper for their existing API
    - Schema.org structured data
    - UCP profile
  → Business copies files to their site (or uses our hosted proxy)
  → Re-scan → score jumps to 75+
  → Listed in AgentHermes directory with "Verified" badge
```

**Deliverables:**
1. **llms.txt Generator** — Crawl site, extract key info, generate llms.txt
2. **Agent Card Generator** — Generate A2A Agent Card from business profile
3. **MCP Server Proxy** — Wrap any REST API as an MCP server (hosted by AgentHermes)
4. **Schema.org Generator** — Generate structured data markup
5. **One-Click Remediation Dashboard** — Download all files or use hosted proxy
6. **WordPress Plugin / Shopify App / npm Package** — Self-serve install for common platforms

### Phase 4: Commerce Network + Network Effects (Weeks 5-8)
Turn AgentHermes into the transaction layer.

**Deliverables:**
1. **Multi-Protocol Payment Bridge** — Business connects Stripe once; AgentHermes routes from ACP/UCP/x402/MPP
2. **Usage-Based Metering** — Auto-deduct per API call when agents use listed services
3. **Agent Analytics Dashboard** — "Which agents found you, what they searched for, conversion rates"
4. **Trust Score v2** — Based on real transaction history, fulfillment rate, response time, dispute rate
5. **Industry Benchmarking** — "Your restaurant scores 34. Average is 67. Top performers score 89+"
6. **Certification Program** — "AgentHermes Verified" badge ($99-$499/year)
7. **Remediation Marketplace** — Match low-scoring businesses with developers who can fix them
8. **Semantic Search** — pg_vector embeddings on business descriptions for natural language discovery
9. **Webhook Subscriptions** — Agents subscribe to alerts when new businesses match criteria
10. **Health Monitoring** — Live uptime/latency checks on listed services

## Revenue Model

| Stream | Price | When |
|--------|-------|------|
| **Free Tier** | $0 — scan + basic listing + 1 business | Phase 1 |
| **Pro** | $49/mo — dashboard, analytics, priority listing, 5 businesses | Phase 3 |
| **Business** | $199/mo — auto-remediation, MCP proxy hosting, 25 businesses | Phase 3 |
| **Enterprise** | Custom — API access, custom scoring, white-label | Phase 4 |
| **Transaction Fee** | 1-2% on agent-facilitated transactions | Phase 4 |
| **Certification** | $99-$499/year for "AgentHermes Verified" badge | Phase 4 |
| **Referral** | 15-20% on remediation services | Phase 4 |

## Key Insight from JarvisSDK

JarvisSDK has 5 agent protocols (MCP, A2A, REST, llms.txt, OpenAPI), 700+ modules, trust scoring, and certification. AgentHermes should NOT compete — it should complement:

- **JarvisSDK** = where agents GET tools (execution layer)
- **AgentHermes** = where agents FIND businesses (discovery + commerce layer)
- **Together** = agent discovers business on AgentHermes → executes via JarvisSDK modules → pays through AgentHermes wallets

Specific patterns to adopt from JarvisSDK:
- Self-equipping (agent describes mission → auto-discovers right businesses)
- Trust scoring formula (6-factor weighted composite)
- Certification pipeline (automated security + performance checks)
- Hash-chained audit logs (tamper-evident compliance)

## The Positioning Statement

**"AgentHermes is the verified commerce network where AI agents find, evaluate, and transact with businesses. We make any business agent-ready in 60 seconds."**

We are not:
- A tool marketplace (that's Smithery/JarvisSDK)
- A payment processor (that's Stripe/x402)
- An agent framework (that's LangChain/CrewAI)
- An identity provider (that's Okta/Visa TAP)

We are:
- The business readiness layer
- The discovery network
- The trust authority
- The commerce bridge

## Success Metrics

| Metric | 30 Days | 90 Days | 6 Months |
|--------|---------|---------|----------|
| Businesses listed | 50 | 500 | 5,000 |
| Agent-initiated queries/day | 100 | 10,000 | 100,000 |
| Average audit score (network) | 45 | 65 | 78 |
| AgentHermes own audit score | 90+ | 95+ | 98+ |
| MRR | $0 | $2,500 | $25,000 |
| Transactions processed | 0 | 100 | 10,000 |
