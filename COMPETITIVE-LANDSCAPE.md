# AgentHermes Competitive Landscape — Deep Research Report

> **Date**: March 30, 2026
> **Purpose**: Map every player in agent readiness, agent commerce, and agent infrastructure
> **Bottom line**: AgentHermes occupies a unique position combining scoring + remediation + commerce + discovery. No single competitor does all four. But the space is crowding fast.

---

## Table of Contents

1. [Direct Competitors — Agent Readiness Scoring](#1-direct-competitors--agent-readiness-scoring)
2. [MCP Directories and Registries](#2-mcp-directories-and-registries)
3. [Agent Commerce Protocols](#3-agent-commerce-protocols)
4. [Agent Payment Infrastructure](#4-agent-payment-infrastructure)
5. [Agent Identity and Authentication](#5-agent-identity-and-authentication)
6. [Big Tech Moves](#6-big-tech-moves)
7. [Agent Orchestration and Routing](#7-agent-orchestration-and-routing)
8. [Workflow Automation Platforms](#8-workflow-automation-platforms)
9. [Agent Frameworks](#9-agent-frameworks)
10. [Adjacent Players — Discovery and Trust](#10-adjacent-players--discovery-and-trust)
11. [Standards and Governance](#11-standards-and-governance)
12. [Market Data](#12-market-data)
13. [Strategic Analysis — Key Questions Answered](#13-strategic-analysis--key-questions-answered)
14. [Threat Matrix](#14-threat-matrix)
15. [Opportunity Map](#15-opportunity-map)

---

## 1. Direct Competitors — Agent Readiness Scoring

These are the companies doing what AgentHermes does: evaluating how ready a business or website is for AI agent interaction.

### 1.1 Agentiview (agentiview.com) — CLOSEST COMPETITOR

- **Founded**: 2026 | **Team**: 2 people | **Funding**: Not disclosed
- **What**: Agent readiness intelligence. Three proprietary scores: ARS (Agent Readability Score), AAS (Agent Action Score), AVS (Agent Viability Score). Each scored 0-100 across 10 dimensions.
- **Pricing**: Free ARS preview, $2,500 full assessment (up from $1,500 earlier in 2026), $10K-$25K enterprise certification. Monthly retainer $1,200/mo.
- **Scale**: 2,600+ companies indexed, 8 industries benchmarked.
- **Strengths**: Conceptually sophisticated (readability vs actionability separation), weighted toward action, enterprise-focused pricing.
- **Weaknesses**: 2-person team, consulting-heavy (doesn't scale), no API, no badge/seal system, no registry/directory, no auto-remediation, no commerce layer. Expensive for SMBs.
- **Threat level**: MEDIUM. They validate our thesis but serve enterprise. We serve SMBs at scale.

### 1.2 AgentReady.site (agentready.site) — SaaS Scanner

- **Founded**: 2025 | **Founder**: Eitan Gorodetsky | **Team**: Small (16 AI-augmented agents)
- **What**: Website scanner across 8 weighted factors (Schema 18%, Content 20%, Bot Access 20%, Topic Clarity 10%, AI Protocols 10%, Speed 5%, Authority 10%, Crawl Health 7%).
- **Pricing**: Free (5 scans/mo), Quick Fix $9 one-time, Starter $29/mo, Pro $99/mo, Agency $249/mo.
- **Strengths**: SaaS pricing model, API access, monitoring, white-label for agencies. REST API available.
- **Weaknesses**: Focused on GEO/AEO (AI search visibility), not agent commerce. No payment testing, no onboarding testing, no transaction layer, no badge system.
- **Threat level**: LOW-MEDIUM. Different focus (AI search visibility vs agent commerce readiness).

### 1.3 IsAgentReady.com (isagentready.com) — Technical Scanner

- **Founded**: 2025 | **Founder**: Bart Waardenburg | **Funding**: Bootstrapped
- **What**: 5-category scanner: AI Content Discovery (30%), AI Search Signals (20%), Content & Semantics (20%), Agent Protocols (15%), Security & Trust (15%).
- **Pricing**: Completely free. Also has an MCP server for terminal scanning and AI editor skills for auto-fixes.
- **Scale**: Scores itself 97/100 (A+). Active blog with fresh content (March 2026).
- **Strengths**: Transparent methodology, checks actual agent protocols (WebMCP, A2A Agent Cards, MCP Discovery), open-source friendly, copy-paste fix snippets.
- **Weaknesses**: No transaction testing, no agent simulation, no pricing assessment, solo founder, no certification/badge, no registry.
- **Threat level**: MEDIUM. Best free technical scanner. Could become the "Lighthouse for agents" if they keep iterating.

### 1.4 Pillar / trypillar.com — Agent Simulation Scanner

- **Founded**: Unknown (Pillar is a broader product copilot; Agent Score is a tool) | **Y Combinator backed**
- **What**: 25+ factors across 5 categories. Releases an autonomous agent (powered by OpenClaw) that actually browses, navigates, signs up, and completes tasks. Tests real interactions.
- **Pricing**: Free, no signup, results in ~1 minute.
- **Strengths**: Actually simulates a real agent (not just crawling metadata). Tests interactability. Open-source component.
- **Weaknesses**: No certification, no monitoring, no pricing/payment testing, no registry, no remediation.
- **Threat level**: LOW-MEDIUM. Good tech but a feature inside a broader product, not a standalone play.

### 1.5 AgentSpeed.dev — Lightweight Free Scanner

- **What**: Weighted readiness metric, 0-100, across 10 automated checks. Two-second scan, no account required.
- **Pricing**: Free scan. Deep Scan adds 3 bonus checks (API documentation detection, MCP server probing, form accessibility).
- **Strengths**: Fast, frictionless, checks CAPTCHA/cookie walls/JS dependencies/TTFB.
- **Weaknesses**: Lightweight, no commerce, no registry, no remediation.
- **Threat level**: LOW. Feature, not a platform.

### 1.6 Additional Scanners (Emerging)

| Tool | URL | Focus | Threat |
|------|-----|-------|--------|
| **Parsonable** | parsonable.com | Website AI agent readiness analysis | LOW |
| **SiteSpeakAI** | sitespeak.ai/tools/ai-agent-readiness-scanner | WebMCP, llms.txt, schema, content accessibility | LOW |
| **GEOAudit** | Chrome extension | 15 categories, 130+ checks, GEO-focused | LOW |
| **Glippy** | glippy.dev | GEO & Agent-Readiness Chrome extension | LOW |
| **Agent-Ready.org** | agent-ready.org | Factory-compatible 9 Pillars / 5 Levels for repos | LOW (codebase, not business) |
| **Kodus (open source)** | github.com/kodustech/agent-readiness | Open-source alt to Factory.ai | LOW |

### 1.7 Factory.ai — Codebase Agent Readiness (DIFFERENT DOMAIN)

- **What**: Measures how ready a codebase is for autonomous AI coding agents. 8 technical pillars, 5 maturity levels. NOT about business/commerce readiness.
- **Access**: CLI, Web Dashboard, API. Remediation coming soon.
- **Threat level**: NONE (different domain entirely). But validates the "readiness scoring" category.

### 1.8 AgenticPlug.ai — AEO/GEO Consulting

- **What**: Agency helping businesses dominate AI search results and the agentic commerce layer. ChatGPT optimization, agentic commerce strategies.
- **Threat level**: LOW. Services company, not a platform.

---

## 2. MCP Directories and Registries

This is where agents discover tools today. AgentHermes needs to understand this space because discovery is core to our value prop.

### 2.1 Official MCP Registry (registry.modelcontextprotocol.io)

- **What**: The canonical upstream directory. Metadata only (no code). Community-driven.
- **Scale**: 6,400+ MCP servers registered (as of Feb 2026).
- **Governance**: Under the Agentic AI Foundation (AAIF) / Linux Foundation.
- **Limitations**: Intentionally minimal. Metadata only. No hosting, no scoring, no commerce.

### 2.2 Smithery.ai — Largest MCP Marketplace

- **Founded**: 2024
- **What**: Registry + hosting platform for MCP servers. Discover, install, and manage.
- **Scale**: 7,300+ tools (some sources say 2,880-3,305+). Growing daily.
- **Features**: Generated OAuth modals, hosted/remote deployment, local install via CLI.
- **Pricing**: Free to list, free to browse. Hosted servers may have usage-based pricing.
- **Weakness**: Developers don't earn from their servers. No business readiness scoring. Developer-only audience.

### 2.3 Glama.ai — MCP Hosting Platform

- **What**: Most comprehensive registry + hosting. Updated daily. Hosts and runs MCP servers for you.
- **Approach**: Goes beyond listing -- actually hosts and runs servers.
- **Difference from Smithery**: Smithery lists for self-hosting; Glama hosts for you.

### 2.4 mcp.so — Community Directory

- **What**: Community-driven platform collecting third-party MCP servers.
- **Scale**: 19,222 MCP servers collected (largest raw count).
- **Features**: Discovery, sharing, learning. Third-party marketplace.

### 2.5 PulseMCP — Daily-Updated Directory

- **What**: Comprehensive MCP server directory updated daily.
- **Scale**: 11,070+ servers (some pages show 13,230+).
- **Features**: Classification system (reference/community/official), weekly visitor estimates, release dates. Also has its own MCP server for programmatic access.

### 2.6 MCPMarket.com — Cross-Platform Directory

- **What**: Curated MCP server repository. Also hosts Cline's MCP Marketplace.
- **Categories**: Developer Tools, API Development, Data Science, Productivity, Analytics, Security, etc.

### 2.7 Kong MCP Registry — Enterprise Registry

- **What**: Enterprise directory within Kong Konnect Catalog. Register, discover, and GOVERN MCP servers.
- **Launched**: February 2026.
- **Key differentiator**: Governance + security policies + OAuth + observability. Enterprise MCP Gateway for stateful routing and protocol translation.
- **AAIF compliant**: Integrates with broader AI Alliance Interoperability Framework.
- **Threat level**: HIGH for enterprise market. Kong brings enterprise credibility and existing customer base.

### 2.8 Other MCP Directories

| Directory | URL | Notes |
|-----------|-----|-------|
| MCPDirectory.ai | mcpdirectory.ai | Aggregator |
| MCP Servers.org | — | Community resource |
| LobeHub MCP Marketplace | lobehub.com/mcp | Within LobeHub ecosystem |
| MACH Alliance MCP Registry | machalliance.org | Industry alliance registry |
| mcpize.com | mcpize.com | MCP tools comparison site |
| Cline MCP Marketplace | cline.bot/mcp-marketplace | Within Cline IDE ecosystem |
| Toolradar | toolradar.com | MCP Gateway comparison |

### Key Insight for AgentHermes

MCP directories are fragmented (19K+ on mcp.so, 7K+ on Smithery, 11K+ on PulseMCP, 6.4K+ on official registry). Nobody is scoring these servers for quality, reliability, or business readiness. This is a gap.

---

## 3. Agent Commerce Protocols

Four protocols are converging to define how agents transact. AgentHermes must support all four.

### 3.1 Universal Commerce Protocol (UCP) — Google + Shopify

- **What**: Open-source standard for agentic commerce. Common language and primitives for commerce journeys between consumer surfaces, businesses, and payment providers.
- **Co-developed by**: Google and Shopify.
- **Supporters**: Etsy, Target, Walmart, Wayfair, millions of Shopify merchants.
- **Architecture**: Decentralized. Merchants host their own infrastructure. Discovery + purchase through Google AI Mode, Gemini, Google Shopping.
- **Endpoint**: `/.well-known/ucp`
- **Status**: Active development, Shopify making every store UCP-ready by default.
- **AgentHermes implication**: We should scan for UCP support and help businesses implement it.

### 3.2 Agentic Commerce Protocol (ACP) — OpenAI + Stripe

- **What**: Open, cross-platform protocol for shopping and payments within AI assistants.
- **Announced**: September 2025 (with "Instant Checkout"). Pivoted March 2026 to focus on product discovery with visual browsing.
- **Architecture**: Platform-mediated. Merchants submit product data. Payment handled by platform.
- **Primary surface**: ChatGPT and similar assistants.
- **Status**: Etsy was first integration. OpenAI acknowledged initial version "did not offer the level of flexibility we aspire to." Now focused on visual discovery, image-based search, comparison tables.
- **AgentHermes implication**: We should help businesses get listed on ACP and score their ACP readiness.

### 3.3 Machine Payments Protocol (MPP) — Stripe + Tempo

- **What**: Open standard for agents to pay. Internet-native, specification for agents and services to coordinate payments programmatically.
- **Features**: Microtransactions, recurring payments, autonomous agent payments.
- **Built on**: Tempo blockchain (backed by Stripe and Paradigm).
- **Status**: Tempo mainnet launched March 2026.

### 3.4 x402 Protocol — Nevermined

- **What**: Resurrects HTTP 402 (Payment Required) for machine-to-machine payments. Stablecoin settlement on Layer 2 networks.
- **Scale**: 161M transactions processed, $600M annually across all chains.
- **Key feature**: Sub-cent transactions (<$0.0001 gas) on Base L2.
- **Extensions**: ERC-4337 smart accounts, session keys, programmable actions.
- **Multi-protocol**: Supports x402 + MCP + A2A + AP2.

### Protocol Ecosystem Map (March 2026)

```
Layer           Protocol        Owner/Steward           Status
─────────────── ─────────────── ─────────────────────── ────────────────
Agent-to-Tool   MCP             AAIF/Linux Foundation   97M installs, standard
Agent-to-Agent  A2A             AAIF/Linux Foundation   150+ org partners
Commerce        UCP             Google + Shopify        Active, merchants adopting
Commerce        ACP             OpenAI + Stripe         Pivoting, active dev
Payments        MPP             Stripe + Tempo          Mainnet March 2026
Payments        x402            Nevermined              $600M/yr volume
Payments        SPT             Stripe                  Shared Payment Tokens
Trust           Visa TAP        Visa                    Agent-merchant trust
Trust           Agent Pay       Mastercard              Agentic tokens, US rollout
Identity        OAuth/OIDC      IETF                    Extended for agents
Discovery       Agent Cards     A2A/AAIF                .well-known/agent.json
Instructions    AGENTS.md       AAIF                    Donated by OpenAI
AI Docs         llms.txt        Community               780+ adopters, no enforcement
```

---

## 4. Agent Payment Infrastructure

### 4.1 Stripe — Agentic Commerce Suite

- **Products**: Shared Payment Tokens (SPT), Agent Toolkit (supports OpenAI Agents SDK, Vercel AI SDK, LangChain, CrewAI), MPP, integration with Visa TAP + Mastercard Agent Pay + BNPL (Affirm, Klarna).
- **Status**: First and only provider supporting both agentic network tokens AND BNPL tokens in agentic commerce through a single primitive.
- **Key insight**: Stripe is positioning as THE payment rails for agent commerce. They are not scoring businesses -- they're processing transactions.
- **AgentHermes relationship**: COMPLEMENTARY. We score and discover; Stripe processes payments. Partnership opportunity is real.

### 4.2 Visa — Intelligent Commerce + Trusted Agent Protocol (TAP)

- **What**: Open framework for safe agent-driven checkout. Helps merchants distinguish malicious bots from legitimate AI agents.
- **Partners**: 10+ partners for initial rollout.
- **Timeline**: Mainstream adoption targeted for 2026 holiday season.
- **Prediction**: Millions of consumers will use AI agents for purchases by holiday 2026.

### 4.3 Mastercard — Agent Pay

- **What**: Agentic tokens -- evolved tokenization for agent-initiated transactions.
- **Status**: Full US rollout completed November 2025. Europe + Asia Pacific pilots early 2026.
- **Scale**: All US issuers supported.

### 4.4 Skyfire — Agent Wallets + KYA Identity

- **What**: Payment network built for AI agent economy. Digital wallets with unique identifiers per agent.
- **Features**: Know Your Agent (KYAPay) protocol, agent-level spending limits, multi-rail funding (debit/credit/ACH/USDC).
- **Status**: Exited beta, full-featured payments infrastructure live.
- **Integration**: Works with Visa Intelligent Commerce. Demo of autonomous agent purchasing via KYAPay + Visa.
- **Threat level**: LOW (payment rails, not scoring/discovery). Partnership potential.

### 4.5 Nevermined — x402 Agent Payments

- **What**: Payment layer for AI agents using extended HTTP 402 + stablecoin settlement.
- **Scale**: $600M annually, 161M+ transactions.
- **Supports**: x402, MCP, A2A, AP2 protocols.
- **Key feature**: Sub-cent microtransactions.

### 4.6 Keyban — Blockchain Agentic Commerce Infrastructure

- **What**: Blockchain platform for brands/retailers to make products, services, loyalty programs accessible to AI agents.
- **Funding**: EUR 500K pre-seed (2026).
- **Components**: Digital Product Passport (DPP), Agent Wallet, agentic commerce protocol integrations.
- **Clients**: Major French banks, retail brands, publicly listed companies.

---

## 5. Agent Identity and Authentication

### 5.1 Stytch — Agent Ready Platform

- **What**: Enterprise auth for AI agents. Connected Apps makes any SaaS its own OAuth provider for agents.
- **Features**: OAuth 2.0 + OIDC for agents, token lifecycle management, IsAgent detection tool (identifies agentic traffic).
- **Pricing**: Free for first 10,000 active users/agents.
- **Key product**: Connected Apps -- enables AI agents to authenticate, access data, take action on behalf of users.
- **Status**: Generally available.

### 5.2 Nango — Agent API Authentication

- **What**: Open-source platform for managed OAuth, API keys, and token refresh for 700+ APIs.
- **Origin**: Y Combinator W23, evolved from OAuth handler to comprehensive auth orchestration.
- **Focus**: OAuth and credential management for agents acting on behalf of users.
- **Strength**: Most comprehensive API coverage for agent auth in 2026.

### 5.3 Composio — Agent Integration Platform

- **What**: Developer-first integration platform for AI agents. 850+ pre-built connectors.
- **Funding**: $29M raised.
- **Features**: Managed OAuth 2.0, tool abstraction SDKs (Python/TypeScript), built-in observability, MCP support via Rube server.
- **Scale**: 1,000+ toolkits on GitHub.
- **Key insight**: They handle the plumbing (auth, execution, scaling) so agents can use tools. Not scoring businesses.

### 5.4 IETF Draft — AI Agent Auth Standard

- **What**: draft-klrc-aiagent-auth-00 proposes applying existing WIMSE architecture and OAuth 2.0 specs to AI agent authentication.
- **Status**: Draft stage. Uses existing standards rather than defining new protocols.

### 5.5 Strata — Agentic Identity

- **What**: Uses OAuth PKCE for secure agent authentication. Focus on zero trust for agents.
- **Approach**: Maverics product for agent flows protection from interception/code injection.

---

## 6. Big Tech Moves

### 6.1 Google

- **A2A Protocol**: Agent-to-agent interoperability. 150+ organization partners. Donated to AAIF.
- **UCP**: Co-developed with Shopify for commerce. Decentralized merchant-hosted model.
- **Agent Cards**: .well-known/agent.json for discovery.
- **Position**: Horizontal infrastructure layer. NOT doing business scoring.
- **AgentHermes relationship**: COMPLEMENTARY. A2A is the protocol; we score readiness for it.

### 6.2 Anthropic

- **MCP**: 97 million installs. The standard for agent-to-tool communication. Donated to AAIF.
- **Official Registry**: 6,400+ servers at registry.modelcontextprotocol.io.
- **Position**: Protocol steward, not marketplace operator.
- **AgentHermes relationship**: COMPLEMENTARY. We help businesses become MCP-ready.

### 6.3 OpenAI

- **ChatGPT Agent**: Unified agentic system (Operator + deep research + ChatGPT). Navigates websites, fills forms, completes tasks.
- **ACP**: Agentic Commerce Protocol with Stripe. Pivoting from checkout to discovery.
- **AGENTS.md**: Donated to AAIF as a standard for giving AI agents instructions about codebases.
- **Computer-Using Agent (CUA)**: Can interact with any website/app through screenshots and actions.
- **Position**: Consumer-facing agent + commerce protocol. Not scoring businesses.

### 6.4 Microsoft

- **Copilot Ecosystem**: Unified app model for agents, Teams apps, Outlook add-ins. 48+ plugins in marketplace.
- **Copilot Studio**: No-code agent builder. Generative actions dynamically connect plugins.
- **Agent Skills Framework**: Plugins are installable packages with commands, agents, and curated skill collections.
- **MCP Support**: Apps SDK and MCP Apps supported in Copilot.
- **AutoGen**: Shifted to maintenance mode in favor of broader Microsoft Agent Framework.
- **Position**: Enterprise platform play. Not scoring agent readiness (though published "6 pillars of agent readiness" thought leadership).

### 6.5 Salesforce — Agentforce

- **What**: Comprehensive agent platform for CRM/commerce. Guided Shopping, Order Routing, Contextual Search, AI-powered merchandising.
- **Scale**: AI assistant traffic grew 119% YoY in H1 2025. Projecting 22% of global orders via agents in Cyber Week 2026.
- **Acquisitions**: Buying companies to strengthen Agentforce. Active M&A strategy.
- **Position**: Enterprise commerce agents. Not scoring business readiness -- they ARE the business's agent layer.

### 6.6 ServiceNow

- **What**: AI Agent Studio (no-code), AI Agent Orchestrator, AI Web Agents, AI Voice Agents, thousands of preconfigured agents.
- **AI Marketplace**: Trusted integrations and industry-specific AI agents in the ServiceNow Store.
- **Position**: Enterprise IT/service management. Their "marketplace" is for ServiceNow ecosystem only.

### 6.7 Shopify

- **Quote**: "We're making every Shopify store agent-ready by default." -- Tobi Lutke, CEO.
- **Products**: Agentic Storefronts, UCP co-development, Shopify Catalog (AI-structured product data).
- **Scale**: 6.9 million stores. Most not yet agent-ready.
- **Key insight**: Shopify is doing for their merchants what AgentHermes wants to do for ALL businesses. But Shopify only covers Shopify merchants.
- **AgentHermes relationship**: Mixed. Shopify handles their own ecosystem. We handle everyone else + can score Shopify stores too.

### 6.8 Adobe Commerce

- **What**: Committed to UCP + ACP support in February 2026.
- **Features**: Product catalogs, pricing, purchasing rules in standardized format; full transaction capability for AI agents.
- **Position**: E-commerce platform, not a scoring service.

---

## 7. Agent Orchestration and Routing

### 7.1 OpenRouter

- **What**: Unified API gateway for 100+ LLMs from multiple providers.
- **Funding**: $40M raised (June 2025), $500M valuation.
- **Position**: LLM routing, not agent/business discovery. But shows the "routing layer" model works.

### 7.2 LiteLLM

- **What**: Unified gateway for LLMs, agents, and MCP. Self-hosted. One endpoint for 100+ models + A2A agents + MCP tools.
- **Scale**: 470,000+ proxy downloads.
- **Key feature**: Can add and invoke A2A agents via the LiteLLM gateway.
- **Position**: Infrastructure plumbing, not business-facing.

---

## 8. Workflow Automation Platforms

### 8.1 Zapier

- **What**: Released "Agents" in beta early 2026. Users type prompts to construct agentic workflows.
- **Position**: Citizen developer tool becoming agent infrastructure. 500-1000% cost efficiency gap vs competitors for high-volume AI workflows.

### 8.2 n8n

- **What**: Open-source workflow automation with LangChain integration at the code level.
- **Key strength**: Self-hosted, GDPR/HIPAA/SOC 2 compliant, execution-based pricing.
- **Position**: Technical teams wanting control. Not business readiness scoring.

### 8.3 Make.com

- **What**: Visual workflow orchestration with real-time workflow mapping.
- **Position**: Mid-market automation. Becoming part of agent infrastructure stack.

---

## 9. Agent Frameworks

### 9.1 LangChain / LangGraph

- **What**: Agent orchestration framework. v3.2.1 stable (2026). 35% improvement in task completion latency over v2.5.
- **Tools**: LangChain tools are "hands and feet" of LLMs. LangGraph for complex reasoning loops.
- **Position**: Developer framework, not business readiness. But the ecosystem agents build on.

### 9.2 CrewAI

- **What**: Multi-agent platform. Fastest "Time-to-Production" for standard business workflows (40% faster than LangGraph).
- **Features**: CrewAI Studio with pre-built tool integrations (Gmail, Teams, Notion, HubSpot, Salesforce, Slack).
- **Status**: Active development, memory systems with vector DB in Q1 2026.

### 9.3 LlamaIndex

- **What**: Data-centric agentic applications. 44K+ GitHub stars, 300+ connectors via LlamaHub.
- **Position**: Knowledge/retrieval layer. Complements LangChain.

---

## 10. Adjacent Players — Discovery and Trust

### 10.1 DataDome — Agent Trust Management

- **What**: Security company pivoting to "Agent Trust Management." Intent-based trust instead of identity-based blocking.
- **Key data**: 80% of AI agents don't properly identify themselves. 4x increase in AI traffic observed in 2025.
- **Partnership**: DataDome + Botify partnership for full agentic commerce control (discovery to transaction).
- **Threat level**: MEDIUM. They're building trust scoring from the security/anti-fraud angle. Different approach but overlapping concept.

### 10.2 Botify — Agentic SEO/Discovery

- **What**: AI search optimization platform. Launched "Agentic Feeds" (March 2026) for AI-optimized product data.
- **Scale**: One major retailer using it for 1M+ products.
- **Position**: SEO/discovery for enterprises. Not scoring agent readiness holistically.
- **Partnership with DataDome**: Combined discovery + trust.

### 10.3 Creatuity — Adobe Commerce Agent Readiness Consulting

- **What**: Consulting firm helping Adobe Commerce merchants become agent-ready.
- **Position**: Services, not platform.

### 10.4 FICO — Trust Score for AI

- **What**: Created Trust Score for AI model outputs. Scores each output against approved knowledge.
- **Products**: FICO Focused Language Model (FLM) and Focused Sequence Model (FSM).
- **Position**: Scoring AI model trustworthiness, not business agent readiness. But the "FICO for X" branding is powerful.

### 10.5 Tumeryk — AI Trust Score Report

- **What**: AI Trust Score that ranks LLM security.
- **Position**: LLM security scoring, not business readiness.

### 10.6 Credo AI — Model Trust Scores

- **What**: Evaluating AI models with trust scores.
- **Position**: AI governance, not agent commerce readiness.

---

## 11. Standards and Governance

### 11.1 Agentic AI Foundation (AAIF)

- **Formed**: December 2025 under Linux Foundation.
- **Founding projects**: MCP (Anthropic), goose (Block), AGENTS.md (OpenAI).
- **Members**: 146 members across 3 tiers.
  - **Platinum**: AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft, OpenAI
  - **Gold**: IBM, Salesforce, SAP, Shopify, Snowflake, Docker, JetBrains, Oracle, JPMorgan Chase, American Express, others
  - **Silver**: Zapier, Hugging Face, Uber, Pydantic, WorkOS, dozens more
- **Key event**: MCP Dev Summit North America, NYC, April 2-3, 2026.
- **Status**: Google contributed A2A. MCP has 97M installs.

### 11.2 Protocol Status Summary

| Protocol | Layer | Installs/Adoption | Governance |
|----------|-------|-------------------|------------|
| MCP | Agent-to-tool | 97M installs | AAIF |
| A2A | Agent-to-agent | 150+ org partners | AAIF |
| UCP | Commerce | Shopify default, 20+ retailers | Open standard |
| ACP | Commerce | ChatGPT ecosystem | OpenAI + Stripe |
| MPP | Payments | Tempo mainnet March 2026 | Stripe + Tempo |
| x402 | Payments | $600M/yr, 161M txns | Nevermined |
| llms.txt | AI docs | 780+ websites, 10% adoption | Community (no enforcement) |
| AGENTS.md | Agent instructions | Donated to AAIF | AAIF |
| Agent Cards | Discovery | A2A standard | AAIF |

---

## 12. Market Data

### Size and Growth

- AI agents influenced **$67B** in Cyber Week 2025 sales (20% of digital orders).
- Agent commerce projected at **$1 trillion** US retail revenue by end of decade (McKinsey).
- AI assistant traffic to retail sites grew **7x** YoY during 2025 holidays.
- AI shopping agents projected to drive **22%** of global Cyber Week 2026 orders (Salesforce).
- **58%** of consumers have replaced traditional search with generative AI for product discovery (nShift, early 2026).
- **60%** of small businesses now use AI (double from 2023).
- Agentic AI sector: 1,040 companies, 530 funded, **$20.8B** total raised, $6.03B in 2025 alone.
- Median business agent-readiness score: **~41/100** across multiple scanners.
- Shopify has 6.9M stores; most NOT yet agent-ready.
- **33M** small businesses in the US alone.

### Key Predictions

- Visa: Millions of consumers using AI agents for purchases by holiday 2026.
- Forrester: 50% reduction in organic web traffic in 2026 as AI replaces traditional browsing.
- Gartner: 40% of SMBs will deploy agents by end of 2026.
- Dual-protocol merchants (UCP+ACP) see 40% more agentic traffic than single-protocol.

---

## 13. Strategic Analysis — Key Questions Answered

### Q1: Who is our closest direct competitor?

**Agentiview** is the closest conceptual competitor. They score agent readiness across multiple dimensions with a three-score framework (ARS/AAS/AVS). BUT:
- They're consulting-heavy ($2,500+ for a real assessment) vs our SaaS model
- 2-person team vs our automated scanning at scale
- No auto-remediation, no registry, no commerce layer
- They serve enterprise; we can serve the long tail of 33M SMBs

**IsAgentReady.com** is the closest product competitor (free technical scanner with MCP server), but lacks commerce, payment testing, and our remediation engine.

### Q2: Is Google A2A trying to do what we do?

**No. A2A is complementary.** A2A is a protocol for agent-to-agent communication (how agents discover and delegate to each other). AgentHermes is a platform that scores and remediates business readiness. We SHOULD implement A2A support (Agent Cards) and score businesses on their A2A readiness. A2A is infrastructure; we are the service layer on top.

### Q3: Where do MCP tools get discovered today?

Fragmented across 8+ directories:
| Directory | Approx Servers | Type |
|-----------|---------------|------|
| mcp.so | 19,222 | Community aggregator |
| PulseMCP | 11,070-13,230 | Daily-updated directory |
| Smithery | 7,300+ | Marketplace + hosting |
| Official Registry | 6,400+ | Canonical metadata |
| Glama | Thousands | Hosting + registry |
| Kong MCP Registry | Enterprise | Governance-focused |
| MCPMarket | Growing | Cross-platform |
| LobeHub | Growing | Ecosystem-specific |

**Nobody is scoring MCP servers for quality, reliability, or business readiness.** This is our opportunity.

### Q4: Is anyone building the "Shopify for agent commerce" for non-tech businesses?

**Shopify itself** is making every Shopify store agent-ready by default. But that only covers Shopify merchants. For the other platforms:
- Adobe Commerce announced UCP + ACP support
- AgenticPlug.ai offers consulting services
- Creatuity offers Adobe Commerce consulting

**Nobody is providing a platform-agnostic tool that takes ANY business and makes it agent-ready.** That is exactly what AgentHermes does. This is our biggest strategic advantage.

### Q5: What's the biggest gap that AgentHermes fills?

**The SMB agent readiness gap.** Every player serves one slice:
- Protocols (MCP, A2A, UCP, ACP) provide the plumbing but not the readiness
- Directories (Smithery, Glama) index developer tools, not business services
- Payment rails (Stripe, Visa, Skyfire) process transactions but don't make businesses discoverable
- Scanners (IsAgentReady, AgentReady.site) check websites but don't remediate or create a commerce network
- Big tech (Salesforce, ServiceNow) serves enterprise only

**AgentHermes uniquely combines**: Score + Remediate + List + Discover + Transact + Verify. For any business. At any scale.

### Q6: Who could acquire us? Who would we compete with at scale?

**Potential acquirers** (in order of strategic fit):
1. **Stripe** — They need a discovery/scoring layer to complement their payment rails. We become their "merchant quality" signal.
2. **Shopify** — They're making their own merchants agent-ready but could acquire us to serve the broader ecosystem.
3. **Google** — UCP needs a readiness/scoring layer. We become the "PageRank for agent commerce."
4. **Salesforce** — Agentforce needs to know which external businesses are agent-ready.
5. **DataDome/Botify** — Combined trust + discovery + readiness = complete agentic commerce stack.
6. **Kong** — Their MCP Registry + our scoring = enterprise agent tool quality layer.
7. **Cloudflare** — They already do web security/performance. Agent readiness is a natural extension.

**At-scale competitors** (if market matures):
- Stripe builds their own scoring (they have the transaction data)
- Shopify extends beyond their ecosystem
- Google builds readiness scoring into UCP
- A Big 4 consulting firm (Deloitte, Accenture) productizes agent readiness
- DataDome's trust scoring expands to full readiness

---

## 14. Threat Matrix

| Threat | Probability | Impact | Timeframe | Mitigation |
|--------|------------|--------|-----------|------------|
| Stripe builds own scoring | MEDIUM | HIGH | 12-18 months | Partner NOW. Become their scoring provider. |
| Shopify expands beyond ecosystem | LOW | MEDIUM | 18-24 months | Score Shopify stores. Create value they'd buy not build. |
| Google adds readiness to UCP | MEDIUM | HIGH | 12-18 months | Publish standard (.well-known/agent-hermes.json) before they do. Get adopted. |
| Agentiview raises and scales | LOW | MEDIUM | 6-12 months | They're consulting; we're SaaS. Different models. |
| IsAgentReady adds commerce | LOW | LOW | 12+ months | Solo founder, no funding. |
| Kong adds quality scoring | MEDIUM | MEDIUM | 6-12 months | Enterprise only. We own SMB. |
| Free scanners commoditize basic scoring | HIGH | MEDIUM | Already happening | Auto-remediation is our moat. Scanning is table stakes. |
| Big 4 consulting enters space | MEDIUM | MEDIUM | 12-18 months | They serve Fortune 500. We serve the 33M SMBs. |

---

## 15. Opportunity Map

### Immediate Opportunities (0-3 months)

1. **Become the quality layer for MCP directories** — Nobody scores MCP servers. Partner with Smithery/PulseMCP to provide quality signals.
2. **UCP readiness scanning** — Shopify is pushing UCP hard. Score businesses on UCP readiness before Shopify builds this themselves.
3. **ACP readiness scanning** — Help businesses get discoverable in ChatGPT's commerce layer.
4. **Publish .well-known/agent-hermes.json standard** — Stake the claim before anyone else creates a readiness verification standard.
5. **Data play** — "State of Agent Readiness Q2 2026" report with 10K+ businesses scored. Become the authoritative data source.

### Medium-Term Opportunities (3-6 months)

6. **Stripe partnership** — Present working integration + data showing scored businesses have higher transaction completion.
7. **WordPress/Shopify plugins** — One-click remediation for the two largest web platforms.
8. **Enterprise tier with Kong-like governance** — MCP tool quality scoring for enterprise agent deployments.
9. **AAIF membership** — Join as Silver member. Get seat at the standards table.

### Long-Term Opportunities (6-12 months)

10. **Agent Readiness Certification program** — The SSL padlock for agent commerce.
11. **Remediation marketplace** — Match low-scoring businesses with developers who can fix them.
12. **Transaction layer** — 1-2% fee on agent-facilitated transactions through AgentHermes-verified businesses.

### The Defensible Moat

1. **Data** — Every scan makes the scoring model smarter. 108 businesses today, target 10K+ by Q3 2026.
2. **Standard** — If .well-known/agent-hermes.json gets adopted, we become infrastructure.
3. **Network effects** — More businesses listed = more agents querying = more businesses wanting to be listed.
4. **Auto-remediation** — Scanning is commoditizing (8+ free scanners). Fixing is not. The "Fix It" product is the moat.
5. **Commerce bridge** — We sit between agents and businesses. That's the most valuable position in the stack.

---

## Sources

### Direct Competitors
- [Agentiview](https://agentiview.com/)
- [AgentReady.site](https://agentready.site/)
- [IsAgentReady.com](https://isagentready.com/en/)
- [Pillar Agent Score](https://trypillar.com/tools/agent-score)
- [AgentSpeed.dev](https://agentspeed.dev/blog/how-we-calculate-your-score)
- [Factory.ai Agent Readiness](https://factory.ai/news/agent-readiness)
- [Parsonable](https://www.parsonable.com/)
- [SiteSpeakAI Scanner](https://sitespeak.ai/tools/ai-agent-readiness-scanner)

### MCP Directories
- [Official MCP Registry](https://registry.modelcontextprotocol.io/)
- [Smithery.ai](https://smithery.ai/)
- [Glama.ai](https://glama.ai/mcp/servers)
- [mcp.so](https://mcp.so/)
- [PulseMCP](https://www.pulsemcp.com/servers)
- [Kong MCP Registry](https://konghq.com/products/mcp-registry)
- [MCPMarket](https://mcpmarket.com/)

### Protocols and Standards
- [Google A2A Protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [A2A Upgrade Blog](https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade)
- [UCP Protocol](http://ucp.dev/)
- [Shopify UCP Engineering](https://shopify.engineering/ucp)
- [AI Agent Protocol Ecosystem Map 2026](https://www.digitalapplied.com/blog/ai-agent-protocol-ecosystem-map-2026-mcp-a2a-acp-ucp)
- [UCP vs ACP Guide](https://wearepresta.com/ucp-vs-acp-the-complete-guide-to-agentic-commerce-protocols-in-2026/)
- [AAIF Formation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [MCP Joins AAIF](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)
- [Anthropic MCP 97M Installs](https://www.arturmarkus.com/anthropics-model-context-protocol-hits-97-million-installs-on-march-25-mcp-transitions-from-experimental-to-foundation-layer-for-agentic-ai/)

### Payments
- [Stripe Agentic Commerce Suite](https://stripe.com/blog/agentic-commerce-suite)
- [Stripe Machine Payments Protocol](https://stripe.com/blog/machine-payments-protocol)
- [Stripe Agent Docs](https://docs.stripe.com/agents)
- [Tempo Mainnet + MPP](https://www.coindesk.com/tech/2026/03/18/stripe-led-payments-blockchain-tempo-goes-live-with-protocol-for-ai-agents)
- [Visa Intelligent Commerce](https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21961.html)
- [Mastercard Agent Pay](https://www.mastercard.com/us/en/business/artificial-intelligence/mastercard-agent-pay.html)
- [Skyfire](https://skyfire.xyz/)
- [Nevermined x402](https://nevermined.ai/blog/x402-ai-agent-billing)
- [Keyban Funding](https://www.accessnewswire.com/newsroom/en/blockchain-and-cryptocurrency/keyban-raises-funding-to-accelerate-its-infrastructure-for-agentic-co-1148496)

### Identity and Auth
- [Stytch Agent Ready](https://stytch.com/ai-agent-ready)
- [Nango Agent Auth Guide](https://nango.dev/blog/guide-to-secure-ai-agent-api-authentication)
- [Composio](https://composio.dev/)
- [IETF AI Agent Auth Draft](https://datatracker.ietf.org/doc/draft-klrc-aiagent-auth/)

### Big Tech
- [Salesforce Agentforce Commerce](https://www.salesforce.com/news/stories/agentforce-commerce-capabilities-announcement/)
- [ServiceNow AI Agents](https://www.servicenow.com/products/ai-agents.html)
- [Shopify Agentic Commerce](https://www.shopify.com/news/ai-commerce-at-scale)
- [Microsoft Copilot Agent Ecosystem](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/ecosystem)
- [OpenAI ChatGPT Agent](https://openai.com/index/introducing-chatgpt-agent/)
- [OpenAI ACP Buy in ChatGPT](https://openai.com/index/buy-it-in-chatgpt/)

### Trust and Discovery
- [DataDome Agent Trust Management](https://datadome.co/products/agent-trust-management/)
- [DataDome Readiness Checklist](https://datadome.co/agent-trust-management/agentic-commerce-readiness-checklist/)
- [Botify Agentic Feeds](https://ppc.land/botifys-agentic-feeds-targets-the-product-data-gap-in-ai-driven-commerce/)
- [llms.txt State in 2026](https://www.aeo.press/ai/the-state-of-llms-txt-in-2026)
- [FICO Trust Score](https://venturebeat.com/ai/ficos-answer-to-ai-risk-a-foundation-model-that-scores-every-output-for)

### Market Data
- [Agentic Commerce Funding (Tracxn)](https://tracxn.com/d/sectors/agentic-ai/__oyRAfdUfHPjf2oap110Wis0Qg12Gd8DzULlDXPJzrzs)
- [CB Insights Agentic Commerce Market Map](https://www.cbinsights.com/research/report/agentic-commerce-market-map/)
- [McKinsey State of AI Trust 2026](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/state-of-ai-trust-in-2026-shifting-to-the-agentic-era)
- [PYMNTS Agent Commerce](https://www.pymnts.com/news/artificial-intelligence/2026/80percent-of-acquirers-say-they-are-ready-for-agentic-commerce-but-merchants-lag/)
- [150+ AI Agent Statistics 2026](https://masterofcode.com/blog/ai-agent-statistics)
