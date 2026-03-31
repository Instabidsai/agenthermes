# Agent Commerce Deep Research

> Compiled: 2026-03-30
> Sources: 50+ web searches, Stripe/Visa/Mastercard/Google/OpenAI/Coinbase official announcements, NIST papers, industry reports
> Purpose: Map the full agent commerce landscape and locate AgentHermes's gateway opportunity

---

## Table of Contents
1. [Stripe for AI Agents](#1-stripe-for-ai-agents)
2. [Agent Wallets & Payment Rails](#2-agent-wallets--payment-rails)
3. [Agent Commerce Protocols (ACP, UCP, AP2, x402)](#3-agent-commerce-protocols)
4. [The Agent Purchasing Flow](#4-the-agent-purchasing-flow)
5. [Per-Call / Per-Use Billing](#5-per-call--per-use-billing)
6. [Agent Identity & Trust](#6-agent-identity--trust)
7. [Market Size & Forecasts](#7-market-size--forecasts)
8. [The AgentHermes Gateway Opportunity](#8-the-agenthermes-gateway-opportunity)
9. [Strategic Recommendations](#9-strategic-recommendations)
10. [Sources](#10-sources)

---

## 1. Stripe for AI Agents

### What Stripe Announced

Stripe has made agent commerce a top-level strategic priority with three major releases:

**Agentic Commerce Protocol (ACP) — September 2025**
- Co-developed with OpenAI. Open standard under Apache 2.0.
- Powers "Instant Checkout in ChatGPT" — the first real-world deployment.
- Enables AI agents to browse merchant catalogs, compare options, and complete purchases on behalf of users.
- Merchants who already use Stripe can enable agentic payments in as little as one line of code.
- GitHub: github.com/agentic-commerce-protocol/agentic-commerce-protocol
- Site: agenticcommerce.dev

**Agentic Commerce Suite — December 2025**
- Full product suite: make products discoverable to agents, simplify checkout, accept agentic payments.
- Includes the Agent Toolkit (Python + TypeScript SDKs for OpenAI Agent SDK, LangChain, CrewAI, Vercel AI SDK).
- Integrates with Stripe Billing meters for usage-based charging.

**Shared Payment Tokens (SPT) — New Payment Primitive**
- The core innovation. An SPT lets an AI agent initiate a payment using a buyer's permission and preferred payment method WITHOUT exposing credentials.
- How it works:
  1. Buyer creates or reuses a saved payment method with the AI platform (e.g., ChatGPT).
  2. AI platform issues an SPT scoped to the specific merchant and cart total.
  3. Agent passes SPT to merchant via API.
  4. Merchant processes payment through Stripe (or another provider) using the SPT.
- Security: SPTs are single-use, time-limited, merchant-scoped. Cannot be replayed. Underlying card details never exposed.
- Expanding to support Mastercard Agent Pay, Visa Intelligent Commerce, Affirm, and Klarna.
- Powered by Stripe Radar for fraud scoring — differentiates high-intent agents from bots.

**x402 Payment Protocol — February 2026**
- Stripe launched x402 payments on Base (Coinbase L2).
- AI agents pay directly in USDC for API access. Fast settlement, low fees.
- Designed for frequent, low-value transactions (micropayments).
- Stripe docs: docs.stripe.com/payments/machine/x402

### How an Agent Pays Stripe on Behalf of a Human

Two models:

**Model 1: SPT (Consumer Commerce)**
Human pre-authorizes a payment method -> AI platform issues scoped SPT -> agent presents SPT to merchant -> Stripe processes payment. Human retains full control via spending limits and approval.

**Model 2: x402 (Machine-to-Machine)**
Agent has a crypto wallet (or pre-funded account) -> calls an API -> server returns HTTP 402 -> agent signs USDC payment on-chain -> server verifies and grants access. No human in the loop.

### Is There an "Agent" Payment Method?

Not a distinct payment method, but new primitives:
- **SPT** = the agent payment token (wraps existing cards/wallets)
- **Agentic Tokens** (Mastercard) = dynamic credentials for agents
- **x402** = HTTP-native crypto payment (USDC)

Stripe treats agents as a new *channel*, not a new payment method. The underlying rails are still cards, wallets, BNPL, or crypto.

### Meter-Based Billing for Agent Usage

Stripe Billing now supports granular AI metering:
- Send usage events (tokens processed, API calls, agent tasks) to Stripe in real time.
- Stripe meters aggregate events and converts them to billable charges.
- API: 1,000 events/sec (standard), up to 10,000/sec (v2 streams), 200,000/sec (enterprise).
- Example: 1 cent per API call x 10,000 calls = $100 invoice, auto-generated.
- This is exactly what AgentHermes gateway needs for billing.

---

## 2. Agent Wallets & Payment Rails

### Who is Building Agent Wallets

| Player | Approach | Funding Model | Status |
|--------|----------|--------------|--------|
| **Skyfire** | Pre-funded wallets with KYA identity | Credit/debit, ACH, wire, USDC | Production (exited beta March 2025) |
| **Nevermined** | DID + wallet per agent at registration | Crypto-native (x402, AP2 compatible) | Production |
| **Stripe** | SPT (scoped tokens, not wallets) | Existing card/wallet infrastructure | Production |
| **Visa** | Agentic tokens via Trusted Agent Protocol | Card network rails | Pilot (mainstream 2026 holiday) |
| **Mastercard** | Agentic Tokens via Agent Pay | Card network rails | Production (US rollout Q4 2025) |
| **PayPal** | Agent Ready + ACP integration | PayPal wallet | Early 2026 |
| **Coinbase/x402** | Crypto wallets (USDC on Base/Solana) | Self-funded crypto | Production |

### How an Agent Carries Purchasing Power

Three architectures emerging:

**1. Pre-Funded Wallet (Skyfire model)**
- Business deposits $X into an agent-specific wallet.
- Agent gets a unique wallet ID + spending limits.
- Per-transaction: agent calls Skyfire's Create PAY Token endpoint with seller ID + max charge -> gets JWT -> presents to seller API.
- Skyfire uses USDC internally but accepts fiat funding.
- **This is closest to what AgentHermes already built.**

**2. Delegated Token (Stripe SPT / Mastercard Agentic Token model)**
- Human's existing payment method stays on file.
- Agent gets a single-use, scoped, time-limited token for a specific transaction.
- No balance to manage — each purchase is authorized individually.
- Better for consumer commerce (shopping, subscriptions).

**3. Crypto Wallet (x402 / Nevermined model)**
- Agent has its own on-chain wallet with USDC.
- Pays per-request via HTTP 402 responses.
- No intermediary needed. True machine-to-machine.
- 161M+ transactions as of early 2026 on x402.
- Better for API-to-API micropayments.

### How AgentHermes Wallets Compare

AgentHermes already has:
- `agent_wallets` table with balance tracking
- `agent_budgets` table with per-transaction/daily/service limits
- AES-256-GCM credential vault
- Per-call billing with margin calculation
- Usage logging per gateway call

**Assessment:** AgentHermes's wallet model is most similar to Skyfire's pre-funded wallet approach. The key differences:
- Skyfire: issues JWT PAY tokens for each transaction, uses USDC internally, has KYA identity protocol
- AgentHermes: deducts from balance directly, uses fiat accounting, no identity protocol yet

**Gap to close:** Add KYA-equivalent identity binding, support x402 as an alternative payment rail, and consider SPT interoperability for consumer-facing use cases.

---

## 3. Agent Commerce Protocols

### Overview: The Protocol Stack

As of March 2026, four major protocols are competing/complementing:

| Protocol | Owner | Purpose | Scope | Status |
|----------|-------|---------|-------|--------|
| **ACP** (Agentic Commerce Protocol) | OpenAI + Stripe | End-to-end commerce (discover -> checkout -> pay) | Consumer retail | Production (ChatGPT) |
| **UCP** (Universal Commerce Protocol) | Google + Shopify + retailers | Merchant capability discovery + checkout | Retail + services | Production (Jan 2026) |
| **AP2** (Agent Payments Protocol) | Google + 60 partners | Payment authorization + settlement | Payment rails | Production (Sep 2025) |
| **x402** | Coinbase + Cloudflare | HTTP-native micropayments | API/machine-to-machine | Production (119M+ txns on Base) |

Plus card-network layers:
- **Visa TAP** (Trusted Agent Protocol) — open framework for agent-merchant trust
- **Mastercard Agent Pay** — agentic tokens for card payments
- **Skyfire KYAPay** — agent identity + wallet + payment in one

### ACP (Agentic Commerce Protocol) — Deep Dive

**What it is:** An open standard (Apache 2.0) for connecting buyers, their AI agents, and businesses to complete purchases.

**How it works:**
1. Merchant publishes structured product catalog (machine-readable pricing, inventory, product data).
2. AI agent queries catalog via ACP-compatible endpoints.
3. Agent compares options across merchants.
4. Agent initiates purchase using SPT (Stripe Shared Payment Token).
5. Merchant fulfills order.

**Machine-readable pricing looks like:**
- Structured product feeds with JSON pricing, real-time inventory.
- ACP-compatible API endpoints that agents can query.
- Adobe Commerce, Shopify, BigCommerce all building ACP support.

**Current limitations (as of March 2026):**
- OpenAI scaled back Instant Checkout — only ~30 Shopify merchants onboarded.
- Merchant onboarding is "arduous." Pivoting to let merchants keep their own checkout.
- Focus shifting to product discovery, not end-to-end checkout.

### UCP (Universal Commerce Protocol) — Deep Dive

**What it is:** Google's open-source standard for agentic commerce, published at `/.well-known/ucp` on merchant sites.

**Key capabilities (as of March 2026):**
- Checkout
- Identity linking (loyalty programs)
- Order management
- Multi-item cart support
- Real-time catalog access (inventory + pricing)
- Product discovery

**How agents discover merchants:**
- Merchants publish UCP profiles at `/.well-known/ucp`.
- Agents declare their own capabilities via profile URL.
- Dynamic discovery — no custom integrations needed.
- Google Merchant Center integration for product feeds.

**Partners:** Shopify (building native support), PayPal, Google Shopping.

### AP2 (Agent Payments Protocol) — Deep Dive

**What it is:** Google's open protocol for secure agent-initiated payments. Designed as an extension of A2A (Agent-to-Agent) protocol and MCP.

**Three core problems it solves:**
1. **Authorization:** Proving user gave agent authority for a specific purchase.
2. **Authenticity:** Ensuring agent request reflects user's true intent.
3. **Accountability:** Determining liability for fraudulent/incorrect transactions.

**Key features:**
- Payment-agnostic (cards, crypto, bank transfers, stablecoins).
- 60+ partner organizations (Adyen, AmEx, Coinbase, Etsy, Mastercard, Visa, PayPal, Salesforce, etc.).
- A2A x402 extension for crypto payments (with Coinbase, MetaMask, Ethereum Foundation).
- Open source on GitHub: google-agentic-commerce/AP2

### x402 — Deep Dive

**What it is:** HTTP-native payment protocol using the 402 "Payment Required" status code.

**How it works:**
1. Agent calls API endpoint.
2. Server returns `402 Payment Required` with payment details in header.
3. Agent pays in USDC (on Base, Solana, Ethereum, Arbitrum, Polygon).
4. Agent retries request with on-chain transaction hash as proof.
5. Server verifies payment, grants access.

**Scale (March 2026):**
- 161M+ transactions processed.
- ~$600M annualized volume.
- Zero protocol fees.
- Co-governed by x402 Foundation (Coinbase + Cloudflare).

**Critical for AgentHermes:** x402 is the natural protocol for API gateway per-call billing. An agent using the AgentHermes gateway could pay per-call via x402 instead of needing a pre-funded wallet.

### How an Agent Compares Prices Across Services

Today, no single protocol solves cross-service price comparison. But the pieces exist:
- **UCP** provides machine-readable pricing at `/.well-known/ucp`.
- **ACP** provides structured product feeds that agents can query.
- **AgentHermes** already lists services with `cost_per_call` and actions — this IS a comparison layer.

**Opportunity:** AgentHermes gateway acts as the price comparison engine for API/service commerce. An agent queries our MCP server, gets all available services with pricing, and picks the best option. We are building the "Google Shopping for agent API services."

---

## 4. The Agent Purchasing Flow

### Today's Flow (2025)
```
Human finds service -> Human evaluates pricing -> Human pays (credit card)
-> Human gets API key -> Human configures agent with key -> Agent uses service
```
Every step requires human involvement. 5-10 minute setup per service minimum.

### Tomorrow's Flow (Target: Late 2026)
```
Agent needs capability -> Agent discovers services (via UCP/ACP/AgentHermes)
-> Agent evaluates options (pricing, trust score, latency, features)
-> Agent pays (via SPT/x402/wallet) -> Agent gets access -> Agent uses service
```
Fully autonomous. Sub-second.

### What Needs to Exist

| Requirement | Status | Who's Building It |
|-------------|--------|------------------|
| Machine-readable service catalogs | Emerging (UCP, ACP) | Google, OpenAI, merchants |
| Agent discovery protocol | Live (A2A agent cards, MCP) | Google, Anthropic |
| Trust/reputation signal | Early (Visa TAP, AgentHermes scores) | Visa, AgentHermes |
| Payment authorization | Live (SPT, x402, AP2) | Stripe, Coinbase, Google |
| Agent identity | Early (KYA, ERC-8004, NIST framework) | Skyfire, Ethereum, NIST |
| Budget controls | Live (Skyfire, Mastercard limits) | Skyfire, card networks |
| Dispute resolution | Minimal | Nobody (major gap) |
| Agent insurance/liability | Not started | Nobody (major gap) |

### What's Blocking It

**1. Identity Gap:** Only 21.9% of organizations treat AI agents as independent identity-bearing entities. Most share credentials across agents. No universal agent identity standard yet.

**2. Trust Gap:** How does a merchant know this agent is legitimate, authorized, and solvent? Visa TAP addresses merchant-agent trust. AgentHermes scores address service quality trust. Neither is universal.

**3. Liability Gap:** If an agent buys the wrong thing, who pays? If an agent is defrauded, who files the dispute? Mastercard's approach: the consumer retains the right to dispute. But machine-to-machine has no consumer protection framework.

**4. Refund/Dispute Gap:** No protocol handles agent-initiated refunds or disputes. Every protocol assumes successful transactions.

**5. Onboarding Friction:** OpenAI's Instant Checkout proved this — onboarding merchants is hard. ACP requires structured product feeds, machine-readable pricing, ACP-compatible endpoints. Most merchants don't have this.

**This is where AgentHermes's auto-remediation engine matters.** We make businesses agent-ready. Without that, the "tomorrow" flow breaks at step 1.

---

## 5. Per-Call / Per-Use Billing

### APIs That Already Charge Per-Call

| Provider | Billing Model | Approximate Cost |
|----------|--------------|-----------------|
| OpenAI | Per-token (input/output) | $0.15-$60/M tokens |
| Anthropic | Per-token | $0.25-$75/M tokens |
| Google Vertex AI | Per-token + per-request | $0.10-$30/M tokens |
| Twilio | Per-message / per-minute | $0.0079/SMS, $0.014/min |
| Stripe | Per-transaction (% + fixed) | 2.9% + $0.30 |
| AWS Lambda | Per-invocation + duration | $0.20/M requests |
| Cloudflare Workers | Per-request | $0.15/M requests (after free tier) |
| SendGrid | Per-email | $0.00085/email |
| ElevenLabs | Per-character | ~$0.002/character |

**Per-call IS the natural model for agent commerce.** Agents don't subscribe; they consume. An agent might use OpenAI for 3 calls, then switch to Anthropic for 2, then call Twilio once. Subscriptions don't fit this pattern.

### How Metering Works

**Stripe Meters (recommended path for AgentHermes):**
1. Define a meter in Stripe (e.g., "gateway_api_calls").
2. After each gateway proxy call, send a meter event to Stripe.
3. Stripe aggregates events per billing period.
4. Auto-generates invoice at period end.
5. API: up to 1,000 events/sec (standard), 10,000/sec (v2).

**Our Current Model:**
- AgentHermes deducts from pre-funded wallet balance per call.
- Logs to `gateway_usage` table.
- 20% margin on top of service cost.

**Assessment:** Our per-call model is correct. The wallet-deduction approach is simpler than Stripe meters for the gateway use case (agent doesn't have a billing subscription — they have a balance). But we should add Stripe meters as an OPTION for enterprise customers who prefer monthly invoicing.

### Is Per-Call the Right Model?

**Yes, for API/service gateway.** Per-call with transparent pricing per action is the cleanest model for agent-to-service commerce. This is what x402 validates — every HTTP request has a price.

**No, for consumer retail.** Shopping agents need per-transaction, not per-call. An agent comparing 50 products before buying one shouldn't be charged for the comparison queries.

**AgentHermes gateway = per-call. AgentHermes score/discovery = free.** This is the right split.

---

## 6. Agent Identity & Trust

### The Identity Stack (Emerging)

| Layer | Standard/Protocol | Who | Status |
|-------|-------------------|-----|--------|
| **Government/Regulatory** | NIST AI Agent Standards Initiative | NIST NCCoE | Concept paper (Feb 2026), comments due Apr 2 |
| **Enterprise Auth** | OAuth 2.0 + SCIM for agents | NIST proposal | Framework stage |
| **Card Network** | Visa TAP, Mastercard Agentic Tokens | Visa, MC | Production pilots |
| **Blockchain** | ERC-8004 (Agent Registry) | MetaMask, Ethereum Found., Google, Coinbase | Mainnet (Jan 2026) |
| **KYA Verification** | Sumsub AI Agent Verification | Sumsub | Production |
| **Agent Passport** | Digital Agent Passport (DAP) | Trulioo | Whitepaper |
| **Agent Wallet ID** | Skyfire KYA + wallet binding | Skyfire | Production |
| **DID-Based** | Nevermined Agent DID | Nevermined | Production |

### How a Service Knows It's Talking to a Legitimate Agent

**Current approaches:**

1. **Visa TAP:** Merchants use Cloudflare-based verification to distinguish legitimate AI agents from bots. Each agent has verifiable credentials linked to a platform (e.g., ChatGPT). Over 100 partners in sandbox.

2. **Mastercard Agentic Tokens:** Dynamic credentials tied to consumer identity. Each transaction gets a unique, scoped token with consumer's permission and spending limits baked in.

3. **Skyfire KYA:** Three token types — KYA (identity only), PAY (payment only), KYA+PAY (both). Agent presents JWT to seller. Seller verifies via Skyfire.

4. **ERC-8004:** On-chain agent registry. Each agent has unique `agentId`, metadata URI with service endpoints, trust config, and protocol support. Verifiable on Ethereum mainnet.

5. **NIST Approach:** Treat agents as non-human identities within existing IAM systems (OAuth, OIDC, SCIM). Each agent gets managed identity with scoped permissions. Actions traceable to human authority.

### Spending Limits & Budget Controls

| Platform | Per-Transaction Limit | Daily Limit | Per-Service Limit | Human Approval Threshold |
|----------|---------------------|-------------|-------------------|-------------------------|
| **AgentHermes** | $50 default | $200 default | $500 default | $100 |
| **Skyfire** | Configurable | Configurable | Configurable | Configurable |
| **Mastercard** | Consumer-defined | Consumer-defined | N/A | All transactions visible |
| **Stripe SPT** | Scoped to cart total | N/A (per-token) | N/A | Built into token issuance |

### Insurance/Liability

**Massive gap.** As of March 2026:
- No insurance product covers agent-initiated transaction errors.
- Mastercard: consumer retains dispute rights (existing card protection).
- x402: no consumer protection (machine-to-machine, buyer beware).
- AP2 explicitly addresses accountability as a core problem but doesn't solve it — just provides the audit trail.
- Visa: working with Forter on fraud detection for agent transactions.

---

## 7. Market Size & Forecasts

### The Numbers

| Metric | Value | Source |
|--------|-------|--------|
| AI agents in Cyber Week 2025 sales | $67B influenced (20% of digital orders) | Salesforce |
| AI-driven traffic to US retail (Black Friday 2025) | +805% year-over-year | Adobe |
| AI agent payments in 2025 | 140M transactions, avg $0.31 each | Industry data |
| x402 transactions (March 2026) | 161M+ | x402 Foundation |
| Global AI spending 2026 | $2.52 trillion | Gartner |
| AI agents market 2025 | $12-15B | Multiple |
| AI agents market 2030 | $80-100B | Multiple (CAGR 46%) |
| Agentic commerce 2030 (US retail) | $190B-$385B | McKinsey |
| Agentic commerce 2030 (global) | $3-5 trillion | McKinsey |
| B2B AI agent purchases by 2028 | $15 trillion | Gartner |
| Enterprises with AI agents by 2026 | 40% | Gartner |
| Programmable transactions by 2030 | 20% of all monetary transactions | Gartner |
| Visa prediction: consumers using AI agents for purchases | Millions by 2026 holiday season | Visa |

### Key Insight
Average agent transaction is $0.31. This validates per-call micropayment models (x402, AgentHermes gateway) over subscription models. The volume play is enormous: 140M transactions at $0.31 = $43M in 9 months. At 2% margin, that's $860K. At scale (billions of transactions), the margin business is massive.

---

## 8. The AgentHermes Gateway Opportunity

### What We Already Built

| Feature | AgentHermes Status | Market Equivalent |
|---------|-------------------|-------------------|
| Pre-funded agent wallets | LIVE (`agent_wallets` table) | Skyfire wallets |
| Per-call billing with margin | LIVE (`gateway_usage`, 20% margin) | x402, Skyfire |
| Credential vault (AES-256-GCM) | LIVE (`vault.ts`) | Skyfire, enterprise IAM |
| Service proxy routing | LIVE (`proxy.ts`) | Skyfire, API gateways |
| Budget controls (per-txn/daily/service) | LIVE (`agent_budgets`) | Skyfire limits |
| Service discovery via MCP | LIVE (4 gateway MCP tools) | Smithery, Composio |
| Agent Readiness Scoring | LIVE (9 dimensions, 108 businesses) | Agentiview, AgentReady.site |
| Gateway services | 6 seeded (2 active: OpenAI, Supabase Query) | Skyfire (unknown count) |
| End-to-end test | PASS (OpenAI call, billing, logging) | N/A |

### How We Compare to Big Players

**vs. Stripe:**
- Stripe is building the *payment rail* (SPT, x402 support, meters).
- We are building the *gateway layer* on top of payment rails.
- Not competitive — complementary. We should USE Stripe for billing, not compete with it.
- Stripe doesn't do service discovery, trust scoring, or credential management.

**vs. Skyfire:**
- Most direct overlap. Both have: agent wallets, pre-funding, per-call billing, spending limits.
- Skyfire's advantages: KYA protocol, USDC native, Visa/Mastercard partnerships, $8.5M funding.
- Our advantages: Trust scoring (9 dimensions), auto-remediation engine, MCP-native, business onboarding.
- Skyfire = payment infra for agent builders. AgentHermes = business readiness + gateway for businesses.

**vs. Visa/Mastercard:**
- They're building network-level protocols (TAP, Agent Pay).
- We operate above that layer — using their tokens/protocols for the actual payment.
- Not competitive. We should integrate their agentic tokens.

**vs. Google (UCP/AP2):**
- Google is building the discovery standard (UCP) and payment protocol (AP2).
- We could become a UCP publisher for businesses that can't build their own.
- AgentHermes auto-remediation = "we'll set up your UCP endpoint for you."

**vs. OpenAI (ACP):**
- ACP is for consumer retail (shopping, checkout).
- Our gateway is for API/service commerce (agent-to-API).
- Different markets. But we should support ACP for businesses that want retail agent discovery.

### Are We Ahead of the Market?

**Partially yes, partially no.**

**Where we're ahead:**
- Business readiness scoring (nobody else scores businesses for agent-readiness at scale)
- Auto-remediation (nobody else generates llms.txt, agent cards, MCP wrappers for businesses)
- Combined discovery + trust + payment gateway in one platform
- Working per-call gateway with real transactions (OpenAI proxy tested)

**Where we're behind:**
- No KYA/agent identity protocol
- No x402 support (the fastest-growing payment rail for agent commerce)
- No AP2/UCP integration
- No crypto/stablecoin support
- Only 2 active gateway services (Skyfire has broad service coverage)
- No multi-rail payment support (only pre-funded fiat wallets)

### Payment Processor vs. Marketplace Layer

**Critical question. Answer: Marketplace + Gateway, NOT payment processor.**

Reasons:
1. **Payment processing is a race to the bottom.** Stripe, Visa, Mastercard, PayPal have unlimited capital and existing merchant relationships. We cannot out-process them.

2. **The gateway layer is a blue ocean.** Nobody is building: "Business publishes service -> we make it agent-discoverable -> agent finds it via trust score -> agent pays per-call through us -> we handle routing/auth/billing." This is what AgentHermes does.

3. **The trust/scoring layer is defensible.** Our 108 businesses (growing to thousands) scored across 9 dimensions is a moat. Agents need a trust signal before transacting. We ARE that signal.

4. **Use Stripe for payments, own the gateway.** Let Stripe handle SPTs, meters, x402. We focus on: discovery, trust scoring, credential management, proxy routing, and margin capture.

**Analogy:** We're not trying to be Visa (payment network). We're trying to be Shopify (business enablement) + Amazon (marketplace/discovery) for the agent economy.

---

## 9. Strategic Recommendations

### Immediate (Next 2 weeks)

**1. Add x402 Support to Gateway**
- When an agent calls our gateway without a pre-funded wallet, return HTTP 402 with payment details.
- Accept USDC on Base as payment.
- This makes our gateway accessible to ANY agent with a crypto wallet, no pre-funding needed.
- x402 has 161M+ transactions — this is where agent payment volume lives.

**2. Publish UCP Profile**
- Add `/.well-known/ucp` to agenthermes.ai.
- Make our gateway services discoverable via Google's protocol.
- We become discoverable to every UCP-compatible agent.

**3. Integrate AP2 for Payment Authorization**
- Support AP2 as a payment method alongside wallet deduction.
- Agents using Google's ecosystem can pay via AP2 through our gateway.

### Short-Term (Next Month)

**4. Build KYA-Equivalent Agent Identity**
- Each agent registering with AgentHermes gets a unique agent ID.
- Bind agent to owner (human/org) via OAuth.
- Issue signed JWTs with scoped permissions.
- Compatible with NIST's emerging framework (OAuth + SCIM).

**5. Add Stripe Meters for Enterprise Billing**
- Keep wallet-deduction for self-serve agents.
- Add Stripe meter integration for enterprise customers who want monthly invoicing.
- Send `gateway_api_calls` events to Stripe per proxy call.

**6. Support SPT for Consumer-Facing Businesses**
- If a business on our gateway sells to consumers, support SPT as a payment method.
- ChatGPT/agent can discover business on AgentHermes -> checkout via SPT -> we route the payment.

### Medium-Term (Next Quarter)

**7. Multi-Rail Payment Support**
- Wallet (existing) + x402 (crypto) + AP2 (Google) + SPT (Stripe) + KYAPay (Skyfire-compatible).
- Agent picks their preferred payment method. We route to appropriate rail.
- This is the "Stripe for agent gateways" play.

**8. Agent Reputation System**
- Not just scoring businesses — score agents too.
- Track: payment history, dispute rate, compliance, usage patterns.
- Businesses can set minimum agent reputation to use their services.
- Creates a two-sided trust marketplace.

**9. Auto-Remediation for UCP/ACP**
- Extend auto-remediation to generate UCP profiles and ACP-compatible product feeds.
- "Your business scores 35. Click here and we'll generate your UCP endpoint, ACP catalog, and agent card."
- This is the onboarding flywheel that OpenAI couldn't solve (they had ~30 merchants after months).

**10. Become a UCP/ACP Publisher**
- For businesses that can't self-host: we host their UCP endpoint, ACP catalog, and MCP server.
- They pay us $49-199/mo. Agents discover them through us.
- Revenue from hosting + transaction margin + data insights.

### The Moat

AgentHermes's defensible advantage is the combination that nobody else has:
1. **Score** (trust signal that agents need before transacting)
2. **Remediate** (make businesses agent-ready when nobody else will)
3. **Gateway** (one-key access to all scored services with per-call billing)
4. **Data** (every scan, every transaction, every agent interaction builds our intelligence)

The scoring data compounds. The gateway grows network effects. The remediation engine is the onboarding flywheel. This is the right strategy.

---

## 10. Sources

### Stripe
- [Agentic Commerce Suite announcement](https://stripe.com/newsroom/news/agentic-commerce-suite)
- [Agentic Commerce Protocol with OpenAI](https://stripe.com/newsroom/news/stripe-openai-instant-checkout)
- [Shared Payment Tokens documentation](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens)
- [x402 machine payments](https://docs.stripe.com/payments/machine/x402)
- [Usage-based billing meters](https://docs.stripe.com/billing/subscriptions/usage-based)
- [Stripe Agent Toolkit (GitHub)](https://github.com/stripe/ai)
- [Stripe AI usage metering announcement](https://www.pymnts.com/news/artificial-intelligence/2026/stripe-introduces-billing-tools-to-meter-and-charge-ai-usage/)

### Google
- [AP2 Agent Payments Protocol announcement](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)
- [AP2 GitHub](https://github.com/google-agentic-commerce/AP2)
- [Universal Commerce Protocol (UCP)](http://ucp.dev/)
- [UCP deep dive](https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/)
- [Shopify UCP implementation](https://shopify.engineering/ucp)

### OpenAI
- [Buy it in ChatGPT: Instant Checkout and ACP](https://openai.com/index/buy-it-in-chatgpt/)
- [ACP developer docs](https://developers.openai.com/commerce)
- [ACP GitHub](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)

### Visa
- [Trusted Agent Protocol announcement](https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21716.html)
- [Secure AI transaction pilots completed](https://investor.visa.com/news/news-details/2025/Visa-and-Partners-Complete-Secure-AI-Transactions-Setting-the-Stage-for-Mainstream-Adoption-in-2026/default.aspx)
- [TAP developer documentation](https://developer.visa.com/capabilities/trusted-agent-protocol/overview)

### Mastercard
- [Agent Pay announcement](https://www.mastercard.com/news/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai)
- [Santander first live AI agent payment in Europe](https://www.mastercard.com/news/europe/en/newsroom/press-releases/en/2026/santander-and-mastercard-complete-europe-s-first-live-end-to-end-payment-executed-by-an-ai-agent/)
- [Mastercard + PayPal partnership](https://newsroom.paypal-corp.com/2025-10-27-Mastercard-and-PayPal-Join-Forces-To-Accelerate-Secure-Global-Agentic-Commerce)

### x402
- [x402 protocol site](https://www.x402.org/)
- [x402 GitHub (Coinbase)](https://github.com/coinbase/x402)
- [x402 on Solana](https://solana.com/x402/what-is-x402)
- [Zuplo: x402 for MCP servers](https://zuplo.com/blog/mcp-api-payments-with-x402)

### Skyfire
- [Skyfire product page](https://skyfire.xyz/product/)
- [KYAPay protocol launch](https://www.businesswire.com/news/home/20250626772489/en/Skyfire-Launches-Open-KYAPay-Protocol-With-Agent-Checkout)
- [Skyfire exits beta](https://www.businesswire.com/news/home/20250306938250/en/Skyfire-Exits-Beta-with-Enterprise-Ready-Payment-Network-for-AI-Agents)

### Nevermined
- [AI agent payment systems](https://nevermined.ai/blog/ai-agent-payment-systems)
- [AI agent payment statistics](https://nevermined.ai/blog/ai-agent-payment-statistics)
- [How to monetize AI agents](https://nevermined.ai/blog/monetize-ai-agents)

### PayPal
- [OpenAI + PayPal partnership](https://newsroom.paypal-corp.com/2025-10-28-OpenAI-and-PayPal-Team-Up-to-Power-Instant-Checkout-and-Agentic-Commerce-in-ChatGPT)
- [PayPal agentic commerce services](https://www.paypal.com/us/business/ai)
- [PayPal + Google UCP](https://investor.pypl.com/news-and-events/news-details/2026/From-Search-to-Checkout-PayPal-Supports-Trusted-AI-Checkout-with-Google/default.aspx)

### Identity & Trust
- [NIST AI Agent Standards Initiative](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure)
- [NIST NCCoE concept paper](https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd)
- [KYA (Know Your Agent) overview](https://knowyouragent.network/)
- [ERC-8004 agent identity standard](https://blockeden.xyz/blog/2026/01/13/know-your-agent-kya-ai-authentication-crypto-markets/)
- [Sumsub AI Agent Verification](https://sumsub.com/blog/know-your-agent/)
- [Cisco agentic workforce security](https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m03/cisco-reimagines-security-for-the-agentic-workforce.html)

### Market Forecasts
- [Gartner: $15T in B2B agent purchases by 2028](https://www.digitalcommerce360.com/2025/11/28/gartner-ai-agents-15-trillion-in-b2b-purchases-by-2028/)
- [McKinsey: $5T agentic commerce by 2030](https://www.digitalcommerce360.com/2025/10/20/mckinsey-forecast-5-trillion-agentic-commerce-sales-2030/)
- [Gartner: $2.5T worldwide AI spending in 2026](https://www.gartner.com/en/newsroom/press-releases/2026-1-15-gartner-says-worldwide-ai-spending-will-total-2-point-5-trillion-dollars-in-2026)
- [Agentic AI statistics collection](https://www.digitalapplied.com/blog/agentic-ai-statistics-2026-definitive-collection-150-data-points)

### Analysis
- [Bessemer: Securing AI agents in 2026](https://www.bvp.com/atlas/securing-ai-agents-the-defining-cybersecurity-challenge-of-2026)
- [OpenAI ChatGPT shopping pivot (CNBC)](https://www.cnbc.com/2026/03/20/open-ai-agentic-shopping-etsy-shopify-walmart-amazon.html)
- [Forrester: leader in agentic commerce pulled back](https://www.forrester.com/blogs/what-it-means-that-the-leader-in-agentic-commerce-just-pulled-back/)
- [Klarna and Stripe flexible payments for agents](https://www.pymnts.com/digital-payments/2026/klarna-and-stripe-prepare-flexible-payments-for-ai-agents/)
