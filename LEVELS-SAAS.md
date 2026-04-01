# Agent Capability Maturity Model for SaaS/Software Platforms

> Research date: 2026-03-30
> Purpose: Define what "fully agent-capable" means, with 5 maturity levels from the agent's perspective
> Companion to: VERTICAL-TAXONOMY.md (SaaS vertical at 7.5/10 average readiness), SCORING-AUDIT.md (9-dimension scoring framework), AGENT-COMMERCE-RESEARCH.md (payment/commerce protocols)

---

## The Core Question

An AI agent needs to interact with your SaaS product. What does that journey look like?

This document defines 5 maturity levels by answering, at each level: what can the agent do, what is blocked, and what does the business need to implement? Every level is examined through the lens of the **6-step agent journey** that AgentHermes scores against: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY.

The model is written from the agent's perspective. Not "what did the business build" but "what can I, the agent, actually accomplish autonomously?"

---

## The 5 Levels

| Level | Name | One-Line Definition | Real-World Analogy |
|-------|------|--------------------|--------------------|
| **L0** | Dark | The agent cannot find or interact with the product at all | A store with no sign, no phone number, no address |
| **L1** | Visible | The agent can find the product and read about it, but cannot act | A store with a window display but locked doors |
| **L2** | Operable | The agent can authenticate and perform core operations via API | A store the agent can enter and browse, but needs a human to check out |
| **L3** | Autonomous | The agent can self-onboard, operate, manage billing, and recover from errors without human help | A store where the agent can walk in, shop, pay, and leave on its own |
| **L4** | Native | The agent experiences the product as a first-class peer: discovery protocols, negotiated capabilities, programmatic trust, and real-time collaboration with other agents through the product | A store that was built for agents from day one, with agent-only entrances and machine-speed service |

---

## Level 0: Dark

### What the business provides at this level

Nothing agent-accessible. The product exists only as a GUI application. There may be a marketing website, but it contains no structured data, no API, no machine-readable documentation. The product might be a desktop app, a purely browser-based SaaS with no public API, or a platform that actively blocks automated access (CAPTCHAs everywhere, bot detection, no programmatic endpoints).

### What an agent CAN do

- Find the company's marketing website via web search (if it exists)
- Read unstructured text from web pages (unreliably, depends on rendering)
- Possibly extract a phone number or email from the website

### What an agent CANNOT do

- Understand what the product does in a structured way
- Create an account
- Authenticate
- Perform any product operation
- Check pricing programmatically
- Determine if the product is even relevant to its task

### Technical requirements to reach this level

None. This is the default state.

### The 6-step journey at L0

| Step | Status | Detail |
|------|--------|--------|
| FIND | Partial | Web search might surface the marketing site. No structured discovery. |
| UNDERSTAND | Failed | No machine-readable description. Agent must parse marketing copy. |
| SIGN UP | Failed | No programmatic signup. CAPTCHA, email verification loops, or no signup at all. |
| CONNECT | Failed | No API. No credentials. No way in. |
| USE | Failed | Zero programmatic operations possible. |
| PAY | Failed | No programmatic billing. |

### Stripe at L0 (hypothetical)

If Stripe were L0, it would be a website where you can read about payment processing, but you would need to call a sales rep to get started, all operations would happen through a dashboard with no API, and there would be no way for any software to interact with it programmatically. This was roughly the state of payment processing before Stripe existed (2011-era Authorize.net, with XML docs behind a login wall and manual account provisioning).

### What percentage of SaaS is here today?

Roughly 5-10% of SaaS products. Mostly very early-stage startups, internal tools that accidentally became products, or legacy software that has never built an API. Some vertical SaaS (construction management, certain healthcare tools) still lives here.

---

## Level 1: Visible

### What the business provides at this level

The product has a public API, but the agent experience is a second-class afterthought bolted onto a human-first product. The business has done the minimum: published API documentation, maybe has an OpenAPI spec, has a developer portal. But the documentation is written for human developers, not for agents. Authentication requires a human to manually create API keys through a dashboard. There is no machine-readable product description, no agent card, no llms.txt.

### What an agent CAN do

- Discover that the product exists and has an API
- Read API documentation (if llms.txt or OpenAPI spec is published)
- Understand the product's capabilities from structured docs
- Determine pricing (if a pricing page exists with parseable content)
- Evaluate whether the product fits its needs

### What an agent CANNOT do

- Create an account autonomously (requires human email verification, dashboard clicks)
- Generate its own API credentials (a human must log in and create keys)
- Start using the product without human intervention
- Manage billing (upgrade, downgrade, cancel) programmatically
- Test the product in a sandbox without human-provisioned credentials

### Technical requirements

1. **Public API** with documented endpoints (REST, GraphQL, or gRPC)
2. **OpenAPI 3.x specification** served from a discoverable URL
3. **Developer documentation** at a standard location (docs.*, /developers, /api)
4. **robots.txt** that allows agent crawlers
5. **Pricing page** with parseable content (not just a "Contact Sales" button)
6. **Optional but valuable:** llms.txt, Schema.org structured data on the marketing site

### The 6-step journey at L1

| Step | Status | Detail |
|------|--------|--------|
| FIND | Pass | OpenAPI spec, developer docs, maybe llms.txt make the product discoverable. |
| UNDERSTAND | Pass | API documentation tells the agent what operations exist. |
| SIGN UP | Failed | Account creation requires human interaction (email loops, dashboard). |
| CONNECT | Failed | API keys exist but a human must create them manually. |
| USE | Blocked | Cannot operate without credentials. |
| PAY | Failed | Billing is dashboard-only. |

### Stripe at L1

Stripe's public-facing documentation layer already exceeds L1. But to illustrate: imagine Stripe published its API docs and OpenAPI spec (which it does, at github.com/stripe/openapi), but required you to email sales@stripe.com to get an account, then wait for a human to provision your API keys, and all billing was managed through a dashboard with no API. You could read everything about Stripe's capabilities. You could evaluate it against competitors. But you could not actually use it without a human in the loop.

**What Stripe actually provides at L1:**
- OpenAPI 3.1 spec (published on GitHub, 300+ endpoints documented)
- docs.stripe.com with comprehensive human-readable docs
- Pricing page at stripe.com/pricing with clear, parseable pricing
- robots.txt allowing crawlers
- Schema.org structured data on marketing pages

### What percentage of SaaS is here today?

Roughly 30-40% of SaaS products. This is the most common state: the product has an API, it has documentation, but getting started still requires a human to create an account and provision credentials. Many well-known products live here because they built APIs for developer integrations, not for agent autonomy.

### What crosses over with other verticals

The L1 requirements (API docs, OpenAPI spec, pricing transparency) apply identically to every vertical. A restaurant booking platform at L1 looks the same as a CRM at L1: you can read about it, but you cannot act.

### What is unique to SaaS at L1

SaaS products at L1 tend to have richer API documentation than other verticals because APIs are a natural extension of software products. A SaaS CRM at L1 might have 200 documented endpoints. A restaurant at L1 has maybe 5. The gap between "visible" and "operable" is smaller for SaaS because the API already exists — the blocker is onboarding and credential provisioning, not API construction.

---

## Level 2: Operable

### What the business provides at this level

The product has a comprehensive API and an agent can authenticate and perform core operations. A human has done the initial setup (created an account, generated API keys, configured billing), but once that is done, the agent can operate the product independently for day-to-day tasks. Error responses are structured and informative. Rate limits are documented. Webhooks exist for state changes. The API covers 70%+ of what the dashboard can do.

This is where most "API-first" SaaS products live today. The API is good. The agent can work. But there is still a human bottleneck at the start (onboarding) and at key decision points (billing changes, plan upgrades, account deletion).

### What an agent CAN do

- Authenticate with pre-provisioned API keys or OAuth tokens
- Perform all core CRUD operations on the product's resources
- Subscribe to webhooks for real-time state changes
- Handle errors gracefully (structured error responses with codes and messages)
- Operate within documented rate limits
- Use sandbox/test modes (if the human set them up)
- Read usage metrics and analytics

### What an agent CANNOT do

- Create its own account
- Generate or rotate its own API keys
- Change the billing plan, add payment methods, or cancel the subscription
- Provision a sandbox/test environment without human help
- Recover from credential expiration without human intervention
- Negotiate capabilities with the product (no agent card, no capability advertisement)

### Technical requirements

Everything from L1, plus:

1. **Comprehensive REST/GraphQL API** covering 70%+ of product functionality
2. **Authentication** via API keys, OAuth 2.0, or JWT with documented flows
3. **Structured error responses** with error codes, messages, and request IDs
4. **Webhooks** for state changes (resource created, updated, deleted, failed)
5. **Rate limiting** with documented limits and rate-limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After)
6. **Sandbox/test mode** that is API-accessible (not just dashboard-toggle)
7. **Pagination** on list endpoints (cursor-based preferred)
8. **Idempotency keys** on write operations (prevents duplicate actions on retry)
9. **API versioning** with documented deprecation policy
10. **SDKs** in at least Python and TypeScript/JavaScript

### The 6-step journey at L2

| Step | Status | Detail |
|------|--------|--------|
| FIND | Pass | Same as L1, possibly better with MCP server listing. |
| UNDERSTAND | Pass | API docs + OpenAPI spec + possibly MCP tool descriptions. |
| SIGN UP | Failed | Still requires human to create account and provision credentials. |
| CONNECT | Pass* | Agent can authenticate IF a human has pre-provisioned credentials. |
| USE | Pass | Agent can perform 70%+ of product operations via API. |
| PAY | Failed | Billing is still human-managed. |

*The asterisk on CONNECT is important. At L2, connection works, but it depends on a human having done setup work beforehand. The agent cannot bootstrap itself.

### Stripe at L2

Stripe is solidly at L2 and pushing into L3. Here is what makes Stripe L2:

**What works for agents today:**
- 300+ API endpoints covering every Stripe capability
- OAuth 2.0 via Stripe Connect (agents representing platforms can authenticate)
- API keys with restricted permissions (a human creates scoped keys in the dashboard)
- Comprehensive webhooks (100+ event types)
- Idempotency keys on every POST endpoint
- Test mode via `sk_test_` keys (but a human must provision these)
- Structured JSON errors with type, code, message, param, and request ID
- Rate limiting with headers
- API versioning with `Stripe-Version` header and dated versions
- SDKs in 7 languages
- MCP server (official Stripe MCP server, published 2025)

**What is still human-dependent:**
- Account creation: a human must sign up at stripe.com, verify email, provide business details
- API key generation: a human must log into the dashboard to create/rotate keys
- Plan management: changing your Stripe plan (not your customers' plans) requires dashboard
- Payout configuration: bank account linking requires human identity verification

**Stripe's L2 score on the 6-step journey:**
- FIND: Pass (OpenAPI spec, docs.stripe.com, MCP server)
- UNDERSTAND: Pass (world-class documentation, llms.txt emerging)
- SIGN UP: Failed (human-dependent account creation)
- CONNECT: Pass* (API keys work, but human must create them)
- USE: Pass (300+ endpoints, near-complete API coverage)
- PAY: Partial (agents can manage customer billing via API, but cannot manage their own Stripe account billing)

### What percentage of SaaS is here today?

Roughly 25-35% of SaaS products. These are the "API-first" companies: Stripe, Twilio, SendGrid, Supabase, PlanetScale, GitHub, Vercel, Datadog, Cloudflare, etc. They have excellent APIs, but they were designed for human developers who integrate once, not for agents that need to self-provision.

### What crosses over with other verticals

The L2 requirements around error handling, rate limiting, idempotency, and webhooks are universal API quality standards. Any vertical can implement them. What makes L2 special for SaaS is that the API IS the product. For a restaurant, the API is a secondary channel. For a SaaS product, it is often the primary interface.

### What is unique to SaaS at L2

**API coverage percentage matters more.** If a SaaS product's API covers only 30% of functionality, the agent hits a wall constantly. "I can create a project via API but I cannot configure its settings" is a common L2 frustration. The gap between dashboard-only features and API-accessible features is the defining tension of L2.

**Webhook completeness varies wildly.** Some L2 SaaS products fire webhooks for creates and updates but not for deletes, status changes, or failures. An agent operating at L2 needs to know WHEN things happen, not just be able to MAKE things happen.

---

## Level 3: Autonomous

### What the business provides at this level

This is the breakthrough level. The product can be operated end-to-end by an agent with zero human involvement. The agent can discover the product, evaluate it, create an account, provision its own credentials, configure the product, use all features, manage billing, and handle its own lifecycle — all programmatically.

L3 requires the business to rethink its onboarding flow, its billing system, and its identity model. It is not enough to add more API endpoints. The business must answer: "If a machine is my customer, what does the signup flow look like? How does it pay? How do I trust it?"

This is where most of the industry is NOT today (March 2026). Very few SaaS products have achieved full L3. The companies that have — or are close — tend to be cloud infrastructure providers (AWS, GCP, Vercel) or developer-tool companies that already think of APIs as their primary interface.

### What an agent CAN do

- Discover the product through standard protocols (agent cards, MCP discovery, llms.txt)
- Understand the product's full capabilities through machine-readable documentation
- Create an account programmatically (API-based signup, no email verification loops)
- Provision its own API keys and manage credential lifecycle (create, rotate, revoke)
- Configure the product for its use case without human guidance
- Perform 95%+ of product operations via API
- Manage its own billing: select a plan, provide payment, upgrade, downgrade, cancel
- Provision and tear down sandbox/test environments on demand
- Monitor its own usage (quotas, rate limits, spend) and adjust behavior accordingly
- Recover from errors, including credential expiration, without human intervention
- Receive proactive notifications about changes affecting its operation (deprecations, outages, limit changes)

### What an agent CANNOT do

- Negotiate custom enterprise contracts (still requires human commercial discussion)
- Participate in the product's agent ecosystem (no agent-to-agent discovery through the product)
- Establish trust with the product beyond API key authentication (no KYA, no reputation)
- Compose with other products through the platform's own orchestration layer
- Influence the product's roadmap or capabilities through programmatic feedback

### Technical requirements

Everything from L2, plus:

1. **Programmatic account creation** — `POST /api/v1/accounts` that creates a full account with API keys in the response, without requiring email verification, CAPTCHA, or human approval. This is the single hardest requirement because it conflicts with most SaaS fraud prevention models.

2. **Self-service credential management** — API endpoints for:
   - `POST /api/v1/api-keys` — create new API key with scoped permissions
   - `DELETE /api/v1/api-keys/{id}` — revoke a key
   - `POST /api/v1/api-keys/{id}/rotate` — rotate a key (returns new key, old key valid for grace period)
   - `GET /api/v1/api-keys` — list active keys with metadata (created, last used, permissions)

3. **Programmatic billing management** — API endpoints for:
   - `GET /api/v1/billing/plans` — list available plans with pricing
   - `POST /api/v1/billing/subscribe` — subscribe to a plan with payment method
   - `PATCH /api/v1/billing/subscription` — change plan
   - `DELETE /api/v1/billing/subscription` — cancel
   - `GET /api/v1/billing/usage` — current period usage and spend
   - `GET /api/v1/billing/invoices` — historical invoices
   - Payment method support: must accept at least one agent-compatible method (Stripe Agent Toolkit SPT, x402 USDC, or pre-funded wallet)

4. **Machine-readable discovery documents:**
   - `/.well-known/agent-card.json` — A2A Agent Card describing capabilities
   - `/llms.txt` — Product description optimized for LLM consumption
   - `/.well-known/mcp.json` — MCP server location (if applicable)
   - `AGENTS.md` — Operational instructions for agents

5. **Self-service sandbox provisioning** — `POST /api/v1/sandboxes` creates an isolated test environment with its own credentials, data, and billing (free). `DELETE /api/v1/sandboxes/{id}` tears it down.

6. **Usage monitoring API** — Real-time access to:
   - Current rate limit status
   - Quota consumption (API calls, storage, compute, etc.)
   - Spend to date in current billing period
   - Projected spend if current usage continues
   - Threshold alerts configurable via API

7. **Credential lifecycle automation:**
   - Keys auto-rotate on a configurable schedule
   - Keys can be scoped to specific IP ranges, operations, or resources
   - Expiring keys trigger webhook notifications before expiration
   - Emergency revocation propagates within seconds

8. **95%+ API coverage** — Every feature accessible from the dashboard must also be accessible via API. The remaining 5% should be things that genuinely require human judgment (e.g., disputing a legal takedown, configuring SSO with a new identity provider that requires human-to-human trust establishment).

### The 6-step journey at L3

| Step | Status | Detail |
|------|--------|--------|
| FIND | Pass | Agent cards, MCP discovery, llms.txt, OpenAPI — the product advertises itself to agents. |
| UNDERSTAND | Pass | Machine-readable docs tell the agent exactly what it can do and how. |
| SIGN UP | Pass | Programmatic account creation. No human needed. |
| CONNECT | Pass | Self-provisioned API keys with appropriate scopes. |
| USE | Pass | 95%+ of product operations available via API. |
| PAY | Pass | Programmatic billing with agent-compatible payment methods. |

All 6 steps pass. The agent can complete the full journey from discovery to ongoing paid usage without any human touching anything.

### Stripe at L3 (gap analysis)

Stripe is arguably the closest major SaaS company to L3, but it is not there yet. Here is the gap:

**What Stripe has toward L3:**
- MCP server (official, production-grade)
- Stripe Agent Toolkit (Python + TypeScript SDKs for agent frameworks)
- Agent Commerce Protocol (ACP) — open standard for agent payments
- Shared Payment Tokens (SPT) — agent-safe payment primitive
- x402 micropayments — machine-to-machine payment over HTTP
- Comprehensive webhooks (100+ event types)
- Test mode with `sk_test_` keys
- Usage-based billing via Stripe Billing meters
- Near-complete API coverage (99% of dashboard features have API equivalents)

**What Stripe is missing for full L3:**
1. **Programmatic account creation** — You cannot `POST` to create a new Stripe account. You must sign up through the web form, verify your email, and provide business details through a guided dashboard flow. Stripe Connect allows platforms to create connected accounts, but that requires an existing parent account.
2. **Self-service API key management via API** — There is no `POST /v1/api_keys` endpoint. Keys are created exclusively through the Stripe Dashboard. You cannot programmatically create, list, rotate, or revoke your own keys. (Restricted keys can be created via API on connected accounts through Connect, but not for your own account.)
3. **Agent card / llms.txt / AGENTS.md** — Stripe does not publish any agent-native discovery documents. No `/.well-known/agent-card.json`, no `/llms.txt`, no `/AGENTS.md`. The MCP server exists but discovery relies on knowing about it through external channels.
4. **Self-service sandbox provisioning** — Stripe's test mode is excellent but it is a toggle on your account, not an isolated programmable environment. You cannot create 5 independent sandboxes for 5 different test scenarios via API.
5. **Programmatic Stripe account billing management** — You can manage your customers' billing via API, but you cannot manage YOUR OWN Stripe account's billing (change your Stripe plan, update your payout schedule, manage your own payment method) via API.

**Stripe's L3 readiness: ~70%.** The API quality and payment infrastructure are world-class. The gaps are in self-provisioning (account creation, key management) and agent-native discovery (protocol-level discoverability).

### What percentage of SaaS is here today?

Less than 5%. Possibly less than 2%. Full L3 requires capabilities that most SaaS companies have never considered building because they assume a human will always be in the onboarding loop. The companies closest to L3:

- **Cloud infrastructure providers** (AWS, GCP, Azure) — programmatic account management via organizations/projects API, API key management via IAM, billing APIs exist but are complex
- **Supabase** — management API can create projects, generate keys, manage billing; close to L3 for database provisioning
- **Vercel** — deployment API covers most operations, team management API exists, but account creation is still human-dependent
- **GitHub** — Apps framework allows programmatic installation, fine-grained tokens via API, but account creation requires human

### What crosses over with other verticals

The L3 requirement of "programmatic account creation" is the universal bottleneck across EVERY vertical. Whether it is a SaaS product, a restaurant booking platform, or a financial service, the question is the same: can a machine become your customer without a human doing the paperwork?

The billing management requirement also crosses over. Any business that charges for its services must answer: can an agent manage its own spend?

### What is unique to SaaS at L3

**The credential lifecycle problem is uniquely complex for SaaS.** A restaurant at L3 might issue a simple API key. A SaaS product at L3 needs scoped permissions, key rotation, IP allowlists, rate limit tiers tied to the key, and audit logs of key usage. The security surface area of a SaaS API key is orders of magnitude larger than a booking API key.

**Multi-tenancy adds complexity.** A SaaS product at L3 must handle the scenario where Agent A provisions an account and Agent B (acting on behalf of the same human principal) also needs access. Organizational, team, and permission models that were designed for human team members must now accommodate agent members.

---

## Level 4: Native

### What the business provides at this level

The product was designed — or has been completely rebuilt — with agents as a first-class audience equal to (or prioritized above) human users. Agent interaction is not an afterthought bolted onto a human product. The product speaks agent protocols natively: A2A for agent-to-agent collaboration, MCP for tool provision, ACP/x402 for payments, agent cards for discovery. The product participates in the agent ecosystem as a peer, not just a service.

L4 is where the product stops being "software that agents can use" and becomes "infrastructure that agents operate through." The distinction matters: at L3, the agent uses the product. At L4, the product is part of the agent's nervous system.

This level is mostly theoretical as of March 2026. No major SaaS product fully achieves L4 today. But the components exist, and the first L4 products will emerge within 12-18 months.

### What an agent CAN do

Everything from L3, plus:

- **Discover the product through standard agent protocols** — The product publishes an A2A Agent Card at `/.well-known/agent-card.json` with full capability descriptions, supported protocols, authentication methods, and pricing. Other agents find it through registry crawls, DNS-based discovery, or agent-to-agent referral.

- **Negotiate capabilities before committing** — The agent reads the agent card, determines which capabilities match its needs, and requests only the specific services it requires. The product responds with a tailored offering (scope, pricing, SLA) for that specific agent's use case. This is runtime capability negotiation, not static API documentation.

- **Establish machine-verified trust** — The product supports Know Your Agent (KYA) identity verification. The agent presents cryptographic proof of its identity, its principal (the human or organization it acts for), its intent, and its spending authority. The product verifies this without human review and grants appropriate access levels. Trust is scored and dynamic — it increases with successful transaction history and decreases with disputes or anomalies.

- **Pay per-use with agent-native payment protocols** — The product accepts ACP (Agentic Commerce Protocol) payments via Shared Payment Tokens, x402 micropayments in USDC for per-call billing, or pre-funded agent wallets (Skyfire, Nevermined). The agent does not need a credit card. The agent does not need a billing cycle. It pays for what it uses, in real time, at machine speed.

- **Collaborate with other agents through the product** — The product exposes not just its own capabilities but acts as a coordination layer. Agent A using the product can discover that Agent B is also using the product and establish collaboration channels through the product's A2A interface. Example: Agent A is building a website on Vercel. Agent B is managing DNS on Cloudflare. Through the Vercel platform's A2A interface, Agent A can request that Agent B configure DNS records for the new deployment — without either agent having been pre-configured to know about the other.

- **Receive proactive context from the product** — The product pushes relevant information to the agent via MCP resources and SSE streams, not just responding to requests. "Your usage is approaching the rate limit." "A new API version is available that adds capabilities you queried for last week." "Another agent in your organization deployed a conflicting configuration."

- **Operate in real-time streaming mode** — Instead of request/response cycles, the product maintains persistent connections via A2A task subscriptions or MCP SSE streams. The agent receives live updates as the product's state changes. This enables agents to react to events in milliseconds rather than polling.

- **Provide feedback that improves the product** — The agent can programmatically report bugs, request features, rate API quality, and flag documentation gaps. This feedback feeds into the product's development cycle. The product improves for agents because agents tell it how to improve.

### What an agent CANNOT do

At L4, the remaining limitations are not technical but commercial and legal:

- **Negotiate terms beyond pre-set parameters** — Custom enterprise agreements still require human-to-human negotiation. The product offers standardized tiers that agents can select from, but truly custom deals (volume discounts, SLA guarantees, data residency requirements) require human involvement.
- **Override safety guardrails** — The product enforces spending limits, rate limits, and scope restrictions that the agent's principal (human/org) has configured. The agent cannot escalate its own authority.
- **Transfer ownership or make legal commitments** — Creating a legally binding contract, transferring intellectual property, or making commitments that exceed the agent's delegated authority still requires human authorization.

### Technical requirements

Everything from L3, plus:

1. **A2A Agent Card** — Full spec-compliant agent card at `/.well-known/agent-card.json`:
   ```json
   {
     "name": "Product Name",
     "description": "What this product does, optimized for agent consumption",
     "url": "https://product.com",
     "version": "1.0",
     "capabilities": [
       {
         "id": "create_project",
         "description": "Create a new project with configuration",
         "input_modes": ["application/json"],
         "output_modes": ["application/json"],
         "pricing": { "model": "per_call", "price_usd": "0.001" }
       }
     ],
     "authentication": {
       "schemes": ["bearer", "oauth2", "a2a_identity", "x402"],
       "kya_supported": true
     },
     "protocols": ["a2a", "mcp", "rest", "acp"],
     "trust": {
       "verified_by": ["agenthermes.ai"],
       "score": 87,
       "transaction_count": 145000,
       "uptime_30d": "99.97%"
     }
   }
   ```

2. **MCP Server with full feature set:**
   - Tools covering every product operation
   - Resources exposing product state (project list, usage metrics, billing status)
   - Prompts for common agent workflows ("deploy my app", "debug this error")
   - Streaming via SSE or Streamable HTTP
   - Auth integration (agent identity flows through MCP calls)

3. **A2A Task Interface:**
   - `POST /api/a2a/tasks/send` — submit complex, multi-step tasks
   - `GET /api/a2a/tasks/{id}` — check task status
   - `POST /api/a2a/tasks/sendSubscribe` — submit with SSE streaming updates
   - Tasks support: `submitted`, `working`, `input-required`, `completed`, `failed`, `cancelled` states
   - Artifacts: tasks produce structured output artifacts (not just success/failure)

4. **Agent-native payment acceptance:**
   - ACP integration (accept Shared Payment Tokens from agent commerce platforms)
   - x402 support (return HTTP 402 with payment instructions, accept USDC)
   - Usage metering with real-time billing events (Stripe Billing meters or equivalent)
   - Pre-funded wallet support (Skyfire, Nevermined)
   - Per-call pricing available (not just monthly subscriptions)

5. **Know Your Agent (KYA) identity:**
   - Accept agent identity tokens (Visa TAP, Skyfire KYA, or open standard)
   - Verify agent's principal (who delegated authority to this agent)
   - Verify agent's spending authority (maximum transaction size, daily limit)
   - Dynamic trust scoring based on transaction history
   - Graduated access: new agents get limited capabilities, trusted agents get full access

6. **Agent-to-agent collaboration:**
   - Agents using the product can discover each other (opt-in)
   - The product acts as a coordination layer for multi-agent workflows
   - Shared state: multiple agents can operate on the same resources with conflict resolution
   - Event bus: agents can subscribe to events from other agents operating on the same product

7. **Proactive intelligence:**
   - Push notifications to agents via webhooks, SSE, or A2A messages
   - Predictive alerts (approaching limits, usage anomalies, cost optimization suggestions)
   - Deprecation warnings delivered programmatically with migration instructions
   - Personalized recommendations based on agent's usage patterns

8. **llms.txt + AGENTS.md + OpenAPI + Schema.org** — Full machine-readable documentation stack:
   - `llms.txt` — concise product description for LLM context windows
   - `AGENTS.md` — operational instructions (what to do, what to avoid, common patterns)
   - OpenAPI 3.1 — complete spec auto-generated from codebase
   - Schema.org — structured data on all public pages

### The 6-step journey at L4

| Step | Status | Detail |
|------|--------|--------|
| FIND | Excellent | Agent card + registry listing + MCP discovery + llms.txt + A2A referral from other agents. The product is findable through 5+ channels. |
| UNDERSTAND | Excellent | Agent card describes capabilities with pricing. AGENTS.md gives operational guidance. OpenAPI gives exact schemas. The agent knows what it can do, how much it costs, and how to do it, before making a single API call. |
| SIGN UP | Excellent | Programmatic account creation with KYA identity. Agent proves who it represents, gets an account in seconds, with appropriate trust level. |
| CONNECT | Excellent | Self-provisioned credentials with scoped permissions. Key lifecycle fully automated. |
| USE | Excellent | MCP tools + A2A tasks + REST API. 99%+ coverage. Real-time streaming. Multi-agent collaboration. |
| PAY | Excellent | Per-use billing via ACP/x402. Agent pays for what it uses, in real time. No billing cycles unless the agent prefers them. |

### Stripe at L4 (projection)

Stripe is building toward L4 faster than any other company. Here is what L4 Stripe would look like:

**Projected L4 Stripe capabilities:**
- Agent card at `/.well-known/agent-card.json` describing all 300+ API capabilities with per-call pricing
- A2A task interface: "Process this batch of 10,000 invoices" as a single task with streaming progress
- ACP fully deployed: any agent with an SPT can pay through Stripe on behalf of its human principal
- x402 on all API endpoints: agents pay per API call in USDC, no subscription required
- KYA integration with Visa TAP: agent presents Visa-issued identity, Stripe grants appropriate access
- Agent-to-agent collaboration: Agent A creating subscriptions and Agent B managing disputes coordinate through Stripe's platform
- Proactive intelligence: "Your dispute rate increased 40% this week. Here are the common patterns. Should I adjust fraud rules?"
- Self-service everything: account creation, key management, billing, payout configuration, tax settings — all via API

**What Stripe has already built toward L4:**
- MCP server (done)
- Agent Toolkit with SDK wrappers for LangChain, CrewAI, Vercel AI SDK (done)
- ACP specification and deployment in ChatGPT (done)
- SPT payment primitive (done)
- x402 on Base/USDC (done)
- Billing meters for per-use charging (done)
- Radar fraud scoring that differentiates agents from bots (done)

**What Stripe still needs for L4:**
- Agent card publication
- A2A task interface
- KYA identity verification (coming via Visa TAP integration)
- Programmatic account creation (the hardest piece — compliance/KYC requirements)
- Agent-to-agent collaboration through the platform
- Proactive agent intelligence (not just webhooks, but contextual recommendations)

**Estimated timeline to L4: 12-18 months** (by end of 2027). Stripe is the most likely first L4 SaaS product because they are building the payment rails that L4 requires AND they are the payment provider for most other SaaS companies. They have the unique advantage of being both a tool agents use and the infrastructure agents pay through.

### What percentage of SaaS is here today?

0%. No SaaS product fully achieves L4 as of March 2026. The protocol stack is still being standardized (A2A v0.3, ACP v1, x402 early). Individual components exist:
- A2A agent cards: deployed by a handful of companies
- MCP servers: 10,000+ published, but most are community-built wrappers, not first-party production integrations
- ACP payments: deployed only in ChatGPT/Stripe partnership
- x402: available on Stripe for Base/USDC, very early
- KYA: Visa TAP in pilot, Skyfire in production but small scale

The first true L4 SaaS products will emerge in late 2026 or 2027, likely from the cloud infrastructure category (where programmatic everything is already the norm) or from agent-native startups that build L4 from day one.

### What crosses over with other verticals

**Everything about protocols crosses over.** A2A, MCP, ACP, x402, KYA — these are vertical-agnostic standards. A restaurant at L4 publishes an agent card just like a SaaS product at L4. The protocol stack is universal.

**Trust and identity cross over.** KYA verification, agent reputation, spending authority — these concepts apply identically whether the agent is buying SaaS subscriptions or booking restaurant reservations.

### What is unique to SaaS at L4

**Capability composition is uniquely rich for SaaS.** A SaaS product at L4 does not just offer atomic operations — it offers compositional capabilities. An agent can say "deploy this application" and the L4 platform orchestrates 15 internal operations (provision resources, configure networking, set up monitoring, deploy code, configure DNS, issue TLS certificate, run health checks). Other verticals have simpler capability trees.

**Multi-agent collaboration through the platform is uniquely valuable for SaaS.** A project management tool at L4 becomes an agent orchestration platform: multiple agents (code agent, design agent, QA agent, deployment agent) coordinate their work through the PM tool's A2A interface. The tool evolves from "software humans use to manage projects" to "infrastructure agents use to coordinate work." This transformation is unique to SaaS because SaaS products are already coordination tools.

**The platform flywheel is strongest in SaaS.** When a SaaS product reaches L4, every agent that uses it makes the product more valuable to other agents (network effects). An L4 Stripe that processes payments for 1 million agents has richer fraud models, better pricing data, and more trust signals than an L4 Stripe with 100 agents. This flywheel does not exist for most other verticals (a restaurant at L4 does not get better because other restaurants are also at L4).

---

## Cross-Level Summary Table

| Dimension | L0: Dark | L1: Visible | L2: Operable | L3: Autonomous | L4: Native |
|-----------|----------|-------------|--------------|----------------|------------|
| **API** | None | Documented, maybe OpenAPI | Comprehensive, 70%+ coverage | 95%+ coverage | 99%+ with MCP + A2A + REST |
| **Auth** | None | Exists but human-provisioned | API keys + OAuth (human setup) | Self-service key management | KYA + agent identity + self-provisioned |
| **Onboarding** | Human only | Human only (but docs help agent evaluate) | Human creates account, agent operates | Programmatic signup, no human needed | KYA-verified instant provisioning |
| **Billing** | N/A | Human-managed | Human-managed | Programmatic billing management | Per-use payment, ACP/x402, real-time |
| **Sandbox** | None | None | Human-provisioned test mode | Self-service sandbox via API | On-demand isolated environments |
| **Discovery** | Web search only | OpenAPI, developer docs | Same + possibly MCP listing | Agent card, llms.txt, AGENTS.md | Full protocol stack, registry-listed, referral |
| **Errors** | N/A | Unstructured | Structured JSON with codes | + retry guidance + request tracing | + proactive remediation suggestions |
| **Streaming** | None | None | Webhooks (push) | Webhooks + usage streams | A2A SSE + MCP resources + real-time events |
| **Multi-agent** | None | None | None | None | Agent-to-agent collaboration via platform |
| **Trust** | None | None | API key auth | Scoped permissions, audit logs | KYA, dynamic trust scoring, reputation |
| **Human in loop** | Always | For evaluation only | For onboarding + billing | For edge cases only | For legal/commercial decisions only |

---

## The Scoring Rubric: How to Assess a SaaS Product's Level

### Quick Assessment (5 questions)

1. **Can an agent find your API documentation without a human telling it where to look?**
   - No → L0
   - Yes → At least L1

2. **Can an agent make API calls to your product right now, if someone gave it credentials?**
   - No → L0 or L1
   - Yes → At least L2

3. **Can an agent create its own account and API keys without any human touching anything?**
   - No → L2 or below
   - Yes → At least L3

4. **Can an agent pay for your product per-use without a credit card or billing cycle?**
   - No → L3 or below
   - Yes → At least approaching L4

5. **Can agents discover and collaborate with each other through your platform?**
   - No → L3 or below
   - Yes → L4

### Detailed Scoring (40 criteria)

#### L1 Requirements (10 points possible)

| # | Criterion | Points | How to Check |
|---|-----------|--------|-------------|
| 1 | Public API exists | 2 | Any endpoint returns structured data (even 401) |
| 2 | API documentation published | 2 | docs.* subdomain or /developers or /api exists |
| 3 | OpenAPI specification available | 2 | /openapi.json, /swagger.json, or linked from docs |
| 4 | robots.txt allows agent crawlers | 1 | /robots.txt exists and does not disallow all |
| 5 | Pricing is publicly visible | 1 | /pricing page exists with parseable content |
| 6 | llms.txt published | 1 | /llms.txt exists with product description |
| 7 | Developer portal with getting-started guide | 1 | Docs contain quickstart/getting-started content |

**L1 threshold: 6+ points**

#### L2 Requirements (15 points possible, requires L1)

| # | Criterion | Points | How to Check |
|---|-----------|--------|-------------|
| 8 | API covers 70%+ of product features | 3 | Compare dashboard features to API endpoints |
| 9 | Structured error responses (JSON + error code + message) | 2 | Hit an invalid endpoint and check response format |
| 10 | Authentication via API key or OAuth 2.0 | 2 | Auth mechanism documented and functional |
| 11 | Webhooks for state changes | 2 | Webhook documentation exists with event types |
| 12 | Rate limiting with headers | 1 | X-RateLimit-* or Retry-After headers present |
| 13 | Test/sandbox mode available | 2 | Documented test mode or sandbox environment |
| 14 | SDKs in Python + JS/TS | 1 | Package published on PyPI + npm |
| 15 | Idempotency support on write operations | 1 | Idempotency-Key header or equivalent documented |
| 16 | API versioning with deprecation policy | 1 | Version in URL path or header, changelog exists |

**L2 threshold: 10+ points (on top of L1 threshold)**

#### L3 Requirements (20 points possible, requires L2)

| # | Criterion | Points | How to Check |
|---|-----------|--------|-------------|
| 17 | Programmatic account creation | 4 | POST to create account returns credentials without human steps |
| 18 | Self-service API key CRUD | 3 | API endpoints to create, list, rotate, revoke keys |
| 19 | Programmatic billing management | 3 | API endpoints for plan selection, payment, upgrade, cancel |
| 20 | Agent-compatible payment acceptance | 2 | Accepts SPT, x402, or agent wallet (not just credit cards) |
| 21 | Self-service sandbox provisioning | 2 | API to create/destroy isolated test environments |
| 22 | 95%+ API coverage | 2 | Dashboard audit: can every action be done via API? |
| 23 | Usage monitoring API | 1 | Real-time quota, rate limit, and spend data via API |
| 24 | Credential lifecycle automation | 1 | Auto-rotation, expiry webhooks, scope management |
| 25 | Agent card published | 1 | /.well-known/agent-card.json exists and is valid |
| 26 | AGENTS.md published | 1 | /AGENTS.md or /agents.md exists with operational instructions |

**L3 threshold: 14+ points (on top of L2 threshold)**

#### L4 Requirements (15 points possible, requires L3)

| # | Criterion | Points | How to Check |
|---|-----------|--------|-------------|
| 27 | Full A2A task interface | 3 | tasks/send, tasks/get, tasks/sendSubscribe all functional |
| 28 | MCP server with tools + resources + prompts | 2 | MCP server serves all three capability types |
| 29 | ACP/x402 payment integration | 2 | Accepts agent commerce protocol payments |
| 30 | KYA identity verification | 2 | Accepts and verifies agent identity tokens |
| 31 | Agent-to-agent collaboration | 2 | Agents can discover/interact with each other via platform |
| 32 | Proactive agent intelligence | 1 | Platform pushes contextual recommendations to agents |
| 33 | Per-call pricing available | 1 | Pricing model includes per-API-call option |
| 34 | Real-time streaming (A2A SSE or equivalent) | 1 | Persistent connections with live state updates |
| 35 | Programmatic feedback channel | 1 | Agent can report bugs/request features via API |

**L4 threshold: 10+ points (on top of L3 threshold)**

---

## The Market Landscape: Where SaaS Sub-Verticals Fall Today

| SaaS Sub-Vertical | Current Level | Highest-Scoring Example | Key Blocker to Next Level |
|-------------------|---------------|------------------------|--------------------------|
| Payment Processing | L2-L3 | Stripe (~L2.7) | Programmatic account creation (KYC/compliance) |
| Cloud Infrastructure | L2-L3 | AWS/GCP (~L2.8) | Agent-native discovery protocols |
| Database/Infrastructure | L2-L3 | Supabase (~L2.6) | Agent payment acceptance |
| Developer Tools | L2 | GitHub (~L2.5) | Programmatic billing, agent cards |
| CRM Platforms | L2 | Salesforce (~L2.3) | Self-service onboarding, agent payments |
| Project Management | L2 | Linear (~L2.2) | Programmatic signup, billing APIs |
| Email/Communication | L2 | SendGrid (~L2.4) | Agent-native discovery, billing |
| Analytics/BI | L1-L2 | Mixpanel (~L1.8) | API coverage, agent-friendly docs |
| HR/Payroll | L1-L2 | Gusto (~L1.5) | PII concerns limit API scope |
| Marketing Automation | L1-L2 | Klaviyo (~L1.7) | Complex workflow APIs, agent billing |
| Vertical SaaS | L1 | Toast (~L1.5) | API coverage varies, no agent protocols |
| Legacy Enterprise | L0-L1 | SAP (~L1.0) | Everything; designed for human-only interaction |

---

## The Economic Case for Each Level

### Why invest in reaching L1? (from L0)

**Cost:** Low (document what you already have)
**Benefit:** Agents can evaluate your product and recommend it to humans. You show up in agent-powered search and comparison shopping. An agent that cannot find you cannot recommend you. As agent-driven procurement grows, being invisible to agents means shrinking market share.

**ROI timeframe:** Immediate. Publishing an OpenAPI spec and llms.txt costs a few engineering days and pays off every time an agent evaluates your category.

### Why invest in reaching L2? (from L1)

**Cost:** Medium (build a real API, which you probably should have anyway)
**Benefit:** Agents can operate your product on behalf of human customers. This is the "integration" value — every agent framework, every automation platform, every workflow tool can connect to you. Your product becomes composable.

**ROI timeframe:** 3-6 months. API-driven integrations increase customer retention (stickiness) and reduce support burden (agents self-serve instead of humans filing tickets).

### Why invest in reaching L3? (from L2)

**Cost:** High (rethink onboarding, billing, and identity models)
**Benefit:** Agents can become your customers without any human sales process. This unlocks a new acquisition channel: agents evaluating, selecting, and purchasing your product on behalf of organizations. Agent-driven procurement is projected to influence 30-40% of B2B SaaS purchasing decisions by 2028.

**ROI timeframe:** 6-12 months. The investment is significant but the payoff is a zero-friction acquisition funnel for the agent economy.

### Why invest in reaching L4? (from L3)

**Cost:** Very high (build new protocol layers, contribute to emerging standards)
**Benefit:** Your product becomes infrastructure in the agent economy. Network effects kick in: more agents using your product makes it more valuable to other agents. You become the default coordination layer for your category. First-mover advantage is enormous because L4 products create switching costs that L2/L3 products cannot.

**ROI timeframe:** 12-24 months. This is a strategic bet on the agent economy being real (it is). The companies that reach L4 first will own their categories for a decade, just like the companies that went API-first in 2012 (Stripe, Twilio, AWS) owned theirs.

---

## Appendix A: The Agent's Internal Decision Tree

When an AI agent is tasked with "find and use a [category] tool," this is the decision tree it follows. Each level unlocks more of this tree:

```
1. SEARCH for products in this category
   L0: "I found a website but cannot determine if it has an API" → SKIP
   L1+: "I found an API with these capabilities" → EVALUATE

2. EVALUATE the product against alternatives
   L1: "I can compare documented features and pricing" → RECOMMEND to human
   L2+: "I can compare features, pricing, AND test the API" → PROCEED

3. ONBOARD to the product
   L0-L2: "I need a human to create an account and give me credentials" → BLOCK (wait for human)
   L3+: "I can create an account and get credentials myself" → PROCEED

4. CONFIGURE the product for my use case
   L0-L1: "I cannot configure anything" → BLOCK
   L2+: "I can configure via API" → PROCEED

5. OPERATE the product
   L0-L1: "I cannot perform operations" → BLOCK
   L2+: "I can perform 70-99% of operations" → PROCEED (with limitations at L2)
   L4: "I can do everything, including composing with other agents" → FULL AUTONOMY

6. PAY for the product
   L0-L2: "A human must manage billing" → BLOCK (for billing changes)
   L3+: "I can manage billing myself" → PROCEED
   L4: "I can pay per-use in real time" → OPTIMAL

7. MONITOR and MAINTAIN
   L0-L2: "I need to poll for changes" → INEFFICIENT
   L3: "I get webhooks" → ADEQUATE
   L4: "I get streaming updates and proactive recommendations" → OPTIMAL
```

At each BLOCK, the agent must either wait for a human, skip this product, or find an alternative at a higher level. The agent ALWAYS prefers the highest-level product because it minimizes human intervention and maximizes autonomy.

**This creates a selection pressure: as agents become the primary purchasing influencers, products at higher levels win disproportionate market share.** An agent choosing between two equivalent CRMs will always pick the one it can fully operate over the one that requires human setup. This is the economic engine driving the entire agent readiness market.

---

## Appendix B: How This Model Maps to AgentHermes Scoring

The AgentHermes 9-dimension scoring system maps to these maturity levels:

| AgentHermes Dimension | Primary Level Gate | What It Measures |
|----------------------|-------------------|------------------|
| D1 Discoverability | L0 → L1 | Can the agent find and identify the product? |
| D2 API Quality | L1 → L2 | Is the API comprehensive, consistent, and well-structured? |
| D3 Onboarding | L2 → L3 | Can the agent self-onboard without human help? |
| D4 Pricing Transparency | L1 → L2 | Can the agent understand the cost before committing? |
| D5 Payment | L2 → L3, L3 → L4 | Can the agent manage billing and pay autonomously? |
| D6 Data Quality | L1 → L2 | Are API responses structured, consistent, and informative? |
| D7 Security | L2 → L3 | Does the product protect itself and the agent? |
| D8 Reliability | L2 → L3 | Can the agent trust the product to be available and consistent? |
| D9 Agent Experience | L3 → L4 | Is the product designed for agent ergonomics? |
| Agent-Native Bonus | L3 → L4 | Does the product speak agent protocols natively? |

**Approximate score ranges per level:**
- L0: 0-25
- L1: 25-45
- L2: 45-70
- L3: 70-85
- L4: 85-100

This aligns with the AgentHermes tier system: Not Scored (<40, L0-L1), Bronze (40-59, L1-L2), Silver (60-74, L2-L3), Gold (75-89, L3), Platinum (90+, L4).

---

## Appendix C: The Protocol Stack at Each Level

| Protocol | L0 | L1 | L2 | L3 | L4 |
|----------|----|----|----|----|-----|
| REST API | -- | Optional | Required | Required | Required |
| OpenAPI 3.x | -- | Recommended | Required | Required | Required |
| OAuth 2.0 | -- | -- | Required | Required | Required |
| Webhooks | -- | -- | Required | Required | Required |
| MCP (tools) | -- | -- | Optional | Recommended | Required |
| MCP (resources + prompts) | -- | -- | -- | Optional | Required |
| A2A Agent Card | -- | Optional | Optional | Required | Required |
| A2A Task Protocol | -- | -- | -- | Optional | Required |
| llms.txt | -- | Optional | Recommended | Required | Required |
| AGENTS.md | -- | -- | Optional | Required | Required |
| ACP / SPT | -- | -- | -- | Optional | Required |
| x402 | -- | -- | -- | Optional | Recommended |
| KYA / Agent Identity | -- | -- | -- | Optional | Required |
| AG-UI (streaming UI) | -- | -- | -- | -- | Optional |

---

## Appendix D: Timeline Projection

| Period | Expected Industry State |
|--------|----------------------|
| **March 2026 (now)** | Most SaaS at L1-L2. Stripe/Supabase/Vercel pushing into L3. No L4 products exist. |
| **Q4 2026** | First L3 products launch (likely cloud infrastructure). A2A/MCP adoption hits 50% of major SaaS. |
| **Q2 2027** | L3 becomes table stakes for developer tools. First L4 prototypes from Stripe, AWS, or agent-native startups. |
| **Q4 2027** | First true L4 products in production. Agent-driven procurement influences 20% of B2B SaaS purchasing. |
| **2028** | L2 is the new L0 — products below L2 lose significant market share to agent-accessible alternatives. L3 is competitive baseline. L4 leaders emerge as category kings. |
| **2030** | L3 is table stakes for all SaaS. L4 is the competitive moat. Agent commerce hits $3-5 trillion annually. Products at L1 and below are effectively invisible to the agent economy. |

---

## Appendix E: What AgentHermes Sells at Each Level

This is where the AgentHermes business model maps to the maturity model:

| Product | Target | What It Does |
|---------|--------|-------------|
| **Score It** (free) | All levels | Tells a SaaS company what level they are at and what is missing |
| **Fix It** (freemium) | L0 → L1, L1 → L2 | Auto-generates llms.txt, agent cards, MCP wrappers, OpenAPI specs to move companies up |
| **Connect It** (per-call revenue) | L2 → L3 | Hosted MCP proxy, gateway services, credential vault — gives L2 companies L3 capabilities without building them |
| **Registry** (marketplace) | L3+ | Discovery layer for L3+ companies. Agents come here to find products that can be operated autonomously |
| **Certification** (subscription) | L3+ | "AgentHermes Verified" badge proving a product achieves and maintains a specific maturity level |

The key insight: **AgentHermes's biggest revenue opportunity is in the L2-to-L3 transition.** This is where the hardest problems live (programmatic onboarding, billing, identity), where businesses are most willing to pay for help, and where AgentHermes can provide hosted infrastructure (MCP proxies, payment bridges, credential vaults) that gives L2 companies L3 capabilities through AgentHermes's platform rather than requiring them to build everything themselves.

This is the "Shopify for agent readiness" thesis: Shopify made it possible for businesses to sell online without building an e-commerce platform. AgentHermes makes it possible for SaaS companies to serve agents without rebuilding their entire product.
