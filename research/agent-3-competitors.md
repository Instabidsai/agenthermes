# AgentHermes Competitive Landscape Report

> **Research Agent 3 | March 25, 2026**
> Comprehensive analysis of every company, tool, standard, and initiative doing agent-readiness assessment.

---

## Table of Contents

1. [Direct Competitors — Agent Readiness Scoring](#1-direct-competitors--agent-readiness-scoring)
2. [Enterprise Consulting — Agent/AI Readiness Assessments](#2-enterprise-consulting--agentai-readiness-assessments)
3. [Codebase Agent Readiness (Different Domain)](#3-codebase-agent-readiness-different-domain)
4. [Agent Commerce Infrastructure Players](#4-agent-commerce-infrastructure-players)
5. [Agent Registries & Discovery Services](#5-agent-registries--discovery-services)
6. [Standards Bodies & Protocols](#6-standards-bodies--protocols)
7. [Competitive Matrix](#7-competitive-matrix)
8. [White Space Analysis](#8-white-space-analysis)
9. [Standards Landscape Summary](#9-standards-landscape-summary)
10. [Sources](#10-sources)

---

## 1. Direct Competitors — Agent Readiness Scoring

These companies directly compete with AgentHermes by scoring how ready a business/website is for AI agent interaction.

### 1.1 Agentiview

- **URL**: [agentiview.com](https://agentiview.com/)
- **Founded**: 2026
- **Team Size**: 2 employees
- **Funding**: Not disclosed
- **Founders**: Not publicly identified

**What They Measure — Three-Metric Framework (Trademark Pending):**

| Metric | Full Name | What It Asks | Dimensions |
|--------|-----------|-------------|------------|
| **ARS** | Agent Readability Score | Can agents find you, parse you, and trust what they find? | 10 dimensions, 0-100 |
| **AAS** | Agent Action Score | Can agents take action — compare pricing, initiate a trial, transact — without a human in the loop? | 10 dimensions, 0-100 |
| **AVS** | Agent Viability Score | Composite of ARS + AAS, weighted toward action | Composite |

**AVS Certification Bands:**

| Score | Status | Meaning |
|-------|--------|---------|
| 0-20 | Agent Invisible | No meaningful agent presence |
| 21-45 | Agent Detected | Found but unverifiable |
| 46-65 | Agent Considered | In research, routed to competitors |
| 66-75 | Agent Eligible | Included, gaps remain |
| 76-90 | Agent Ready | Reliable recommendation/transaction |
| 91-100 | Agent Native | Default agent recommendation |

**Pricing:**

| Service | Price |
|---------|-------|
| Free ARS Preview | $0 (automated crawl, top-3 fixes, PDF same-day) |
| ARS Full Report | $349 |
| Full Readiness Assessment (ARS + AAS + AVS) | $1,500 |
| Full Remediation | $1,500-$15,000 |
| Monthly Retainer | $1,200/month |

**Scale**: 2,600+ companies indexed, 8 industries benchmarked.

**Strengths:**
- Most conceptually aligned competitor to AgentHermes — action-oriented, not just SEO
- Separate readability vs. actionability scores (ARS vs AAS) is sophisticated
- Certification bands create aspiration (like credit score tiers)
- Remediation services create recurring revenue
- Weighted toward action (AVS prioritizes AAS over ARS)

**Weaknesses:**
- 2-person team, brand new (2026), no funding disclosed
- Exact 10 dimensions for ARS and AAS not publicly documented
- No API, no automated scoring at scale
- Consulting-heavy model — doesn't scale like a SaaS product
- No live agent simulation in the free tier (requires $1,500 full assessment)
- No badge/seal system for verified businesses
- No registry or directory component

---

### 1.2 Pillar (trypillar.com)

- **URL**: [trypillar.com/tools/agent-score](https://trypillar.com/tools/agent-score)
- **Founded**: Unknown (Pillar is a broader platform; Agent Score is a tool)
- **Funding**: Unknown
- **Team**: Unknown

**What They Measure:**
- 25+ factors across 5 categories: discovery, readability, interactability, permissions, accessibility
- Releases an autonomous agent (powered by OpenClaw) that actually browses, navigates, signs up, and completes tasks
- Tests real interactions: signup, search, filtering, completing flows
- Checks llms.txt, robots.txt, structured data, token efficiency, permissions
- Renders pages in browser, tests forms and navigation
- Detects registered tools and schemas

**Scoring Methodology:**
- Live agent simulation approach — the agent actually tries to use your site
- Each successful task demonstrates site works for AI automation
- Error handling quality factored in (clear errors vs. vague failures)

**Pricing**: Free, no signup required, results in ~1 minute.

**Strengths:**
- Actually simulates a real agent interacting with the site (not just crawling metadata)
- Tests interactability (signup flows, task completion) — closest to what AgentHermes measures
- Free and frictionless
- 25+ factors is comprehensive

**Weaknesses:**
- No certification or badge system
- No ongoing monitoring or retainer
- No industry benchmarking
- No pricing/payment acceptance testing
- No remediation services
- No registry/directory
- Limited documentation on exact methodology

---

### 1.3 IsAgentReady.com

- **URL**: [isagentready.com](https://isagentready.com/en/)
- **Founded**: 2025
- **Founder**: Bart Waardenburg (AI Agent Readiness Expert)
- **Funding**: Bootstrapped

**What They Measure — 5 Categories:**

| Category | Weight | Checks |
|----------|--------|--------|
| AI Content Discovery | 30% | robots.txt for 13 AI bots, sitemaps, llms.txt, meta robots, HTTP bot access |
| AI Search Signals | 20% | JSON-LD Schema.org across 17 types, entity linking |
| Content & Semantics | 20% | Server-side rendering, heading hierarchy, semantic HTML, ARIA, alt text, links |
| Agent Protocols | 15% | WebMCP, A2A Agent Cards, MCP Discovery, OpenAPI, agents.json |
| Security & Trust | 15% | HTTPS, HSTS, CSP, X-Content-Type-Options, X-Frame-Options, CORS, Referrer-Policy |

**Key Insight**: "Most websites score under 45" — aligns with AgentHermes median of 41/100.

**Pricing**: Completely free ($0 USD).

**Extras**: Has an MCP server for terminal-based scanning; AI skills for automated fixes via Claude, Cursor, Codex editors.

**Strengths:**
- Transparent weighted methodology with exact checks documented
- Checks actual agent protocols (WebMCP, A2A Agent Cards, MCP Discovery)
- Open-source-friendly (MCP server, editor integrations)
- Prioritized recommendations with copy-paste code snippets
- Security dimension included

**Weaknesses:**
- No transaction/payment testing
- No agent simulation (crawl-based only, not behavioral)
- No pricing readability assessment
- No onboarding flow testing
- Solo founder, no funding
- No certification/badge
- No registry

---

### 1.4 AgentReady.site

- **URL**: [agentready.site](https://agentready.site/)
- **Founded**: 2025
- **Founder**: Eitan Gorodetsky (Operations Intelligence Architect)
- **Team**: 16 agents (likely AI-augmented)

**What They Measure — 8 Factors:**

| Factor | Weight | Focus |
|--------|--------|-------|
| Schema Markup | 18% | Structured data clarity for AI models |
| Content Quality | 20% | Depth and organization for AI comprehension |
| Bot Access | 20% | Crawler accessibility |
| Topic Clarity | 10% | Brand and expertise identification |
| AI Protocols | 10% | llms.txt, NLWeb, MCP support |
| Speed & Performance | 5% | Page load times for crawlers |
| Authority & Trust | 10% | Credible authorship signals |
| Crawl Health | 7% | Navigation efficiency |

**Pricing:**

| Plan | Price | Key Features |
|------|-------|-------------|
| Free | $0 | 5 scans/month, 50 pages/scan, 1 site |
| Quick Fix | $9 one-time | Top 3 issues fixed |
| Starter | $29/mo | 20 scans/month, 3 sites, monthly monitoring |
| Pro | $99/mo | 100 scans/month, 10 sites, weekly monitoring |
| Agency | $249/mo | Unlimited scans, 25 sites, white-label, API |

**Methodology**: Crawls up to 12 pages per site, score in 60 seconds. Also has REST API (Scan, Benchmarks, Score Lookup).

**Strengths:**
- SaaS pricing model with clear tiers
- API access for programmatic integration
- Monitoring/recurring scan capability
- White-label for agencies
- Quick Fix upsell is clever

**Weaknesses:**
- Heavily SEO/visibility oriented — measures whether AI can "find and cite" you, not transact with you
- No transaction testing, no payment readiness, no onboarding flow testing
- No agent simulation (crawl only)
- 12-page crawl limit is shallow
- No certification/badge
- No registry

---

### 1.5 Agentic Readiness Analyzer (agenticstorefront.com)

- **URL**: [app.agenticstorefront.com](https://app.agenticstorefront.com/)
- **Built by**: ForkPoint (e-commerce agency)
- **Focus**: E-commerce / SFCC / Shopify merchants

**What They Measure:**
- 178 checks across 10 categories
- Categories span content discoverability to generative engine optimization
- Structured data to AI tool surfaces
- 7 audit dimensions: AI discoverability, protocol readiness, data quality, transactions, trust, post-purchase, measurement

**Pricing**: Free analysis (account required).

**Results Claimed**: Clients see 35% increase in search conversion within first month. Setup <6 weeks.

**Strengths:**
- 178 checks is the most comprehensive check count of any tool
- Commerce-specific (understands SFCC, Shopify, BigCommerce)
- Includes transaction and post-purchase dimensions
- Agency backing means real implementation capability
- Includes measurement/analytics dimension

**Weaknesses:**
- Commerce-only (not for SaaS, services, B2B)
- Agency model — likely a lead-gen tool for ForkPoint consulting
- Not a standalone product/platform
- No public API
- No certification system

---

### 1.6 Anon

- **URL**: [anon.com](https://www.anon.com/)
- **Founded**: ~2024
- **Funding**: Not disclosed (VC-backed based on team/scale indicators)
- **Focus**: Agent infrastructure + readiness benchmarking

**What They Measure:**
- Signup flow accessibility for AI agents
- robots.txt configuration
- API documentation availability
- LLM visibility/discoverability

**Scale**: 500+ scored domains in leaderboard, 1,000+ in database. Filterable by industry.

**Pricing**: Free.

**Extras**: Publishes `/.well-known/agent-access.json` manifest and `/llms.txt`. Has a public API for leaderboard access.

**Strengths:**
- Leaderboard/ranking creates competitive pressure
- Industry filtering enables benchmarking
- Shareable benchmark results with impact projections
- Practices what they preach (agent-access.json, llms.txt on own site)
- Focus on signup flow (onboarding) is unique

**Weaknesses:**
- Scoring dimensions are limited (4 areas vs AgentHermes's 5)
- No pricing readability testing
- No payment acceptance testing
- No MCP/API endpoint testing
- Readiness scoring appears secondary to their core infrastructure product

---

### 1.7 SiteSpeakAI Agent Readiness Scanner

- **URL**: [sitespeak.ai/tools/ai-agent-readiness-scanner](https://sitespeak.ai/tools/ai-agent-readiness-scanner)
- **Built by**: SiteSpeakAI (AI chatbot company)
- **Focus**: Website discoverability

**What They Check**: WebMCP support, llms.txt, structured data, content quality, meta information, accessibility.

**Pricing**: Free, no signup, results in ~30 seconds.

**Strengths:**
- Checks WebMCP (Web Model Context Protocol) — most tools miss this
- Free and fast
- Part of a broader AI tools suite

**Weaknesses:**
- Appears to be a lead-gen tool for SiteSpeakAI's chatbot product
- No transaction, payment, or onboarding testing
- Limited depth
- No scoring scale documented publicly

---

### 1.8 AgentReady.md

- **URL**: [agentready.md](https://agentready.md/)
- **Focus**: Markdown optimization for AI readability

**What They Measure**: Same 8 factors as AgentReady.site (Schema Markup, Content Quality, Bot Access, Topic Clarity, AI Protocols, Speed, Authority, Crawl Health). Provides optimized Markdown output and llms.txt preview.

**Pricing**: Free, no signup. Beta: 5 analyses/hour limit.

**Strengths:**
- Unique Markdown optimization angle
- Generates llms.txt preview
- Actionable code snippets

**Weaknesses:**
- Near-clone of AgentReady.site methodology
- Pure content/SEO focus, no transaction testing
- Beta stage

---

### 1.9 AgentScore.site

- **URL**: [agentscore.site](https://agentscore.site/)
- **Focus**: AI ingestion optimization

**Scoring**: Starts at 100, deducts points for each failed check. Covers crawlability, structure, technical SEO.

**Strengths:**
- Simple deductive scoring model
- Covers technical SEO for AI

**Weaknesses:**
- Minimal differentiation from other scanners
- No transaction/commerce focus
- Unknown team/backing

---

### 1.10 ValidatorAI Agentic Assessment

- **URL**: [agentic.validatorai.com](https://agentic.validatorai.com/)
- **Built by**: ValidatorAI
- **Focus**: Free agentic readiness analysis

**What They Offer**: AI crawls the website and provides recommendations for becoming agent-ready.

**Pricing**: Free.

**Strengths:**
- Part of a broader validation platform

**Weaknesses:**
- Limited documentation on methodology
- Appears basic compared to dedicated tools
- No scoring framework publicly documented

---

### 1.11 Sanbi.ai

- **URL**: [sanbi.ai](https://sanbi.ai/)
- **Focus**: AI visibility monitoring for e-commerce

**What They Do**: Enterprise-grade audit tools that map how AI agents talk about your products, identify missing product attributes, highlight integration gaps for agentic checkout, and reveal how AI "sees" your catalog. Daily monitoring across ChatGPT, Gemini, Perplexity, Claude.

**Pricing**: Enterprise (not publicly listed).

**Strengths:**
- Daily monitoring (not one-time scan)
- Tracks actual AI agent behavior and recommendations
- E-commerce focused with catalog-level granularity
- Monitors brand positioning across multiple AI platforms

**Weaknesses:**
- E-commerce only
- Enterprise pricing likely high
- No public self-serve tool
- Visibility-focused, not transaction-readiness focused

---

## 2. Enterprise Consulting — Agent/AI Readiness Assessments

These are large firms offering organizational/enterprise AI readiness assessments. Different market than AgentHermes but overlap in positioning.

### 2.1 Cisco AI Readiness Index

- **URL**: [cisco.com/ai/readiness-index](https://www.cisco.com/c/m/en_us/solutions/ai/readiness-index.html)
- **Scale**: 8,000+ business leaders surveyed across 30 global markets
- **Dimensions**: 6 pillars — Strategy, Infrastructure, Data, Talent, Governance, Culture
- **Scoring**: 49 indicators, 4 tiers (Pacesetters, Chasers, Followers, Laggards)
- **Key Finding**: Only 13% of organizations are "Pacesetters" (fully AI-ready)
- **Relevance to AgentHermes**: Macro benchmark data; different domain (organizational readiness vs. agent-facing readiness)

### 2.2 Microsoft Agent Readiness Assessment

- **URL**: [learn.microsoft.com/assessments](https://learn.microsoft.com/en-us/assessments/94f1c697-9ba7-4d47-ad83-7c6bd94b1505/)
- **Basis**: Survey of 500 enterprise decision-makers across 13 countries, 16 industries
- **Dimensions**: Strategy readiness + Execution readiness (28 questions)
- **Time**: ~10 minutes
- **Relevance to AgentHermes**: Enterprise organizational readiness, not business-facing-agent readiness

### 2.3 R Systems Agentic Readiness Audit

- **URL**: [rsystems.com/agentic-readiness-audit](https://www.rsystems.com/agentic-readiness-audit/)
- **Focus**: Enterprise process-level readiness for deploying AI agents internally
- **Deliverables**: Maturity assessment, process mapping, implementation guidance, executive sponsorship playbooks, industry benchmarking dashboards
- **Audience**: CIOs, CTOs, transformation leads
- **Relevance to AgentHermes**: Different angle — "can your org deploy agents?" vs. "can agents interact with your business?"

### 2.4 Concentrix Agentic AI Readiness Assessment

- **URL**: [concentrix.com/agentic-ai-readiness-assessment](https://www.concentrix.com/services-solutions/agentic-ai/agentic-ai-readiness-assessment/)
- **Focus**: 6 key areas for scaling autonomous workflows
- **Award**: 2026 AI Excellence Award for Agentic Operating Framework
- **Relevance to AgentHermes**: Enterprise workflow readiness, not agent-facing readiness

### 2.5 Rapidops AI Agent Readiness Assessment

- **URL**: [rapidops.com/ai-agent-readiness-assessment](https://www.rapidops.com/resources/ai-agent-readiness-assessment/)
- **Focus**: Infrastructure, processes, team capabilities for deploying AI agents
- **Relevance to AgentHermes**: Internal organizational readiness

### 2.6 Aries Solutions AI & Agentic Readiness Assessment

- **URL**: [ariessolutions.io/ai-agentic-readiness](https://ariessolutions.io/composable-commerce/ai-agentic-readiness/)
- **Focus**: Composable commerce agentic readiness
- **Relevance to AgentHermes**: Commerce-focused but still internal readiness

---

## 3. Codebase Agent Readiness (Different Domain)

These measure how ready a **code repository** is for AI coding agents. Different market entirely, but share the "agent readiness" name.

### 3.1 Factory.ai Agent Readiness

- **URL**: [factory.ai/news/agent-readiness](https://factory.ai/news/agent-readiness)
- **Documentation**: [docs.factory.ai/web/agent-readiness/overview](https://docs.factory.ai/web/agent-readiness/overview)
- **Founded**: 2023 (YC-backed)
- **Funding**: Significant VC (exact undisclosed)

**9 Technical Pillars:**

| Pillar | Definition |
|--------|-----------|
| Style & Validation | Linters, type checkers, formatters |
| Build System | Clear, deterministic build commands |
| Testing | Unit and integration test coverage |
| Documentation | AGENTS.md, README, setup instructions |
| Development Environment | Devcontainers, reproducible setup |
| Debugging & Observability | Structured logging, tracing, metrics |
| Security | Branch protection, secret scanning, CODEOWNERS |
| Task Discovery | Issue templates, labeling, PR templates |
| Product & Experimentation | Analytics instrumentation, experiment infra |

**5 Maturity Levels:**

| Level | Name | Requirement |
|-------|------|-------------|
| 1 | Functional | Basic tooling, code runs |
| 2 | Documented | Processes written, basic automation |
| 3 | Standardized | Processes enforced org-wide |
| 4 | Optimized | Fast feedback, continuous measurement |
| 5 | Autonomous | Self-improving systems |

**Scoring**: Binary pass/fail per criterion. 80% pass rate at each level to unlock the next. Variance: 0.6% after grounding on previous reports.

**Clients**: Ernst & Young, Groq, Bilt.

**Published Benchmarks**: CockroachDB (Level 4, 74%), FastAPI (Level 3, 53%), Express (Level 2, 28%).

**Relevance to AgentHermes**: Name collision only. Factory measures codebase readiness for coding agents, not business readiness for commerce agents. However, the maturity-level framework is a good model.

### 3.2 Open-Source Clones of Factory

- **[jpequegn/agent-readiness-score](https://github.com/jpequegn/agent-readiness-score)** — OSS framework inspired by Factory methodology
- **[kodustech/agent-readiness](https://github.com/kodustech/agent-readiness)** — "Open-source alternative to Factory.ai's Agent Readiness"
- **[agent-ready.org](https://agent-ready.org/)** — Factory-compatible 9 Pillars / 5 Levels maturity model

---

## 4. Agent Commerce Infrastructure Players

These companies build the rails for agent commerce — they don't score readiness but their existence defines what "agent-ready" means.

### 4.1 Stripe — Agentic Commerce Suite

- **URL**: [stripe.com/use-cases/agentic-commerce](https://stripe.com/use-cases/agentic-commerce)
- **What**: Complete suite for selling through AI agents — discovery, checkout, payments, fraud
- **Key Innovation**: Shared Payment Tokens (SPTs) — agents use these to initiate payments without exposing credentials
- **Partners**: URBN, Etsy, Ashley Furniture, Coach, Kate Spade, Revolve
- **Co-developed**: ACP (Agentic Commerce Protocol) with OpenAI under Apache 2.0
- **Market Size**: $385B U.S. online agent spend projected by 2030
- **Relevance**: Defines what "agent payment acceptance" means in AgentHermes scoring

### 4.2 Visa — Trusted Agent Protocol (TAP)

- **URL**: [developer.visa.com/capabilities/trusted-agent-protocol](https://developer.visa.com/capabilities/trusted-agent-protocol)
- **What**: Open framework for cryptographic agent verification at checkout
- **How**: Agent presents signature (timestamps, session ID, key ID) — merchant validates against public key
- **Scale**: 10+ launch partners, 100+ in Intelligent Commerce program
- **Context**: 4,700% surge in AI-driven traffic to U.S. retail sites
- **GitHub**: Open source under [visa/trusted-agent-protocol](https://github.com/visa/trusted-agent-protocol)
- **Relevance**: Defines trust/verification layer that AgentHermes should test for

### 4.3 Skyfire — Agent Payment Network

- **URL**: [skyfire.xyz](https://skyfire.xyz/product/)
- **Funding**: $9.5M total (a16z CSX, Coinbase Ventures, DCVC, Neuberger Berman)
- **What**: Payment network for AI agents — programmatic wallets, KYAPay protocol, Agent Checkout
- **Scale**: Thousands of daily transactions, exited beta March 2025
- **Relevance**: Defines "wallet-to-wallet" agent payment infrastructure

### 4.4 Nekuda — Agentic Payment SDK

- **URL**: [nekuda.ai](https://nekuda.ai/)
- **Funding**: $5M seed (Madrona, Amex Ventures, Visa Ventures)
- **What**: Secure Agent Wallet + Agentic Mandates (purchase intent, spending limits, approvals)
- **Partners**: Visa Intelligent Commerce integration
- **Relevance**: Defines agent payment delegation model

### 4.5 Basis Theory — Agentic Commerce Consortium

- **URL**: [basistheory.ai/consortium](https://basistheory.ai/consortium)
- **Funding**: $33M Series B (~$50M total, Costanoa led)
- **What**: PCI vault for agent commerce + founded the Agentic Commerce Consortium
- **Consortium Members**: Lithic, Crossmint, Skyfire, Rye, Channel3, Catalog, New Generation, Henry Labs
- **White Paper**: "Empowering Merchant-Controlled AI Commerce" (September 2025)
- **Relevance**: Setting industry standards for agent commerce infrastructure

### 4.6 Shopify — Universal Commerce Protocol (UCP) + Agentic Storefronts

- **URL**: [shopify.dev/docs/agents](https://shopify.dev/docs/agents)
- **Co-developed with**: Google
- **What**: Open standard for agents to connect and transact with any merchant
- **Scale**: 1M+ merchants onboarding, endorsed by 20+ retailers/platforms
- **Surfaces**: ChatGPT, Microsoft Copilot, Google AI Mode, Gemini
- **3-Stage Maturity**: Passive (visible) -> Active (discoverable + cart) -> Native (fully autonomous)
- **Relevance**: Defines the commerce platform layer of agent readiness

### 4.7 Firmly

- **Funding**: $5.2M (FJ Labs, Ark Invest, Mastercard Start Path)
- **What**: Unified "Buy Now" platform across AI chatbots, social, publishers, connected TV
- **Partner**: Perplexity
- **Relevance**: Protocol aggregation layer

### 4.8 Rye

- **URL**: [rye.com](https://rye.com/)
- **What**: Universal Checkout API + Product Data API
- **Consortium Member**: Agentic Commerce Consortium
- **Relevance**: Checkout execution layer

### 4.9 FERMAT

- **Funding**: $45M Series B (VMG Partners)
- **What**: Commerce Brain — real-time behavior graph for agent commerce
- **Relevance**: Intelligence layer for commerce optimization

---

## 5. Agent Registries & Discovery Services

### 5.1 MCP Registry (Official)

- **URL**: [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io/)
- **Launched**: September 8, 2025 (preview)
- **Governance**: Anthropic / open-source community
- **Scale**: 16,670+ MCP servers listed
- **What**: Open catalog and API for discovering MCP servers
- **Verification**: Pings every 5 seconds to verify availability
- **Relevance**: The canonical directory for MCP-compatible tools/services

### 5.2 A2A Agent Registry

- **GitHub**: [a2aproject/A2A](https://github.com/a2aproject/A2A)
- **Governance**: Linux Foundation (donated by Google)
- **What**: Every agent publishes `/.well-known/agent.json` (Agent Card) listing name, endpoint, skills, auth flows
- **Discovery**: Client fetches Agent Card directly or via centralized registry
- **Relevance**: Defines agent-to-agent discovery standard

### 5.3 Microsoft Entra Agent ID

- **URL**: [learn.microsoft.com/en-us/entra/agent-id](https://learn.microsoft.com/en-us/entra/agent-id/identity-platform/publish-agents-to-registry)
- **What**: Enterprise SaaS directory with policy and zero-trust integration for AI agents
- **Focus**: Enterprise governance of agent identity and access
- **Relevance**: Enterprise agent registry with trust/identity layer

### 5.4 Kong MCP Registry

- **URL**: [Kong Konnect](https://www.prnewswire.com/news-releases/kong-introduces-mcp-registry-in-kong-konnect-to-power-ai-connectivity-for-agent-discovery-and-governance-302676451.html)
- **Launched**: February 2026
- **What**: Enterprise directory within Kong Konnect Catalog for registering, discovering, and governing MCP servers
- **Focus**: Enterprise API gateway integration for agent governance
- **Relevance**: Enterprise MCP governance layer

### 5.5 NANDA Index AgentFacts

- **What**: Cryptographically verifiable, privacy-preserving fact model with credentialed assertions
- **Relevance**: Trust layer for agent identity verification

### 5.6 AGNTCY Agent Directory Service

- **What**: IPFS Kademlia DHT content routing extended for semantic taxonomy-based discovery
- **Focus**: Decentralized agent directory
- **Relevance**: Alternative to centralized registries

---

## 6. Standards Bodies & Protocols

### 6.1 Active Protocols (Production / Near-Production)

| Protocol | Creator | Governance | Purpose | Status |
|----------|---------|-----------|---------|--------|
| **MCP** (Model Context Protocol) | Anthropic | Open-source | Agent-to-tool integration | Production, 16K+ servers |
| **A2A** (Agent-to-Agent) | Google | Linux Foundation | Agent interoperability | Production, 100+ company backing |
| **ACP** (Agentic Commerce Protocol) | OpenAI + Stripe | Apache 2.0 | Agent commerce/checkout | Production |
| **UCP** (Universal Commerce Protocol) | Google + Shopify | Open standard | Agent-merchant transactions | Production, 20+ retailers |
| **AP2** (Agent Payment Protocol) | Google | Open | Payment authorization | Early production |
| **Visa TAP** (Trusted Agent Protocol) | Visa | Open (GitHub) | Agent identity verification | Production, 10+ partners |
| **KYAPay** | Skyfire | Open | Agent payment identity | Production |

### 6.2 IETF Internet-Drafts (Standards Track)

| Draft | Title | Status |
|-------|-------|--------|
| draft-zyyhl-agent-networks-framework | Framework for AI Agent Networks | Active (Oct 2025, expires Apr 2026) |
| draft-cui-ai-agent-discovery-invocation | HTTP-Based AI Agent Discovery and Invocation Protocol (HAIDIP) | Active |
| draft-narvaneni-agent-uri | agent:// Protocol — URI-Based Framework for Interoperable Agents | Active (v02) |
| draft-rosenberg-aiproto-framework | Framework, Use Cases and Requirements for AI Agent Protocols | Active |
| draft-ni-a2a-ai-agent-security-requirements | Security Requirements for AI Agents | Active |
| draft-steele-agent-considerations | Agent Considerations | Active |
| draft-narajala-ans | Agent Name Service (ANS) — Universal Directory for Agent Discovery | Active |
| SCIM for AI (WorkOS) | SCIM extensions for agent/agentic app provisioning | Draft |

### 6.3 Industry Consortia

| Body | Focus | Members |
|------|-------|---------|
| **Linux Foundation A2A Project** | Agent interoperability standard | Google, AWS, Cisco, Microsoft, Salesforce, SAP, ServiceNow, 100+ others |
| **Agentic Commerce Consortium** (Basis Theory) | Agent commerce infrastructure standards | Basis Theory, Lithic, Crossmint, Skyfire, Rye, Channel3, Catalog, Henry Labs |
| **Visa Intelligent Commerce** | Agent payment trust | 100+ partners |

### 6.4 Key Standards (Content/Discovery)

| Standard | Creator | Adoption | Purpose |
|----------|---------|----------|---------|
| **llms.txt** | Jeremy Howard (Answer.AI, Sep 2024) | 844K+ websites (BuiltWith), but no AI platform confirms reading it | LLM-friendly site overview |
| **agents.json** | Community | Early | Agent capability manifest |
| **/.well-known/agent.json** | A2A project | Growing | Agent Card for A2A discovery |
| **/.well-known/agent-access.json** | Anon | Niche | Agent access manifest |
| **robots.txt AI directives** | Various | Widespread | AI bot access control |
| **Schema.org JSON-LD** | W3C/Schema.org | Widespread | Structured data for AI parsing |

---

## 7. Competitive Matrix

### Direct Readiness Scoring Competitors

| Dimension | **AgentHermes** | **Agentiview** | **Pillar** | **IsAgentReady** | **AgentReady.site** | **Agentic Storefront** | **Anon** |
|-----------|----------------|---------------|-----------|-----------------|--------------------|-----------------------|---------|
| **Score Type** | 0-100, 5 categories | 0-100, 3 metrics (ARS/AAS/AVS) | 25+ factors, 5 categories | 0-100, 5 weighted categories | 0-100, 8 weighted factors | 178 checks, 10 categories | Domain rankings, industry filter |
| **Machine-Readable Profile** | Yes (A2A Card, llms.txt) | Yes (ARS dimension) | Yes (llms.txt, robots.txt) | Yes (30% weight) | Yes (10% weight) | Yes | Yes (robots.txt, llms.txt) |
| **API/MCP Endpoints** | Yes (live testable) | Partial (AAS) | Yes (detects tools/schemas) | Yes (15% weight) | No | Partial | No |
| **Agent Onboarding** | Yes (signup flow) | Yes (AAS) | Yes (tests signup) | No | No | No | Yes (signup flow) |
| **Structured Pricing** | Yes (machine-readable) | Unknown | No | No | No | No | No |
| **Payment Acceptance** | Yes (wallet-to-wallet) | Unknown | No | No | No | Partial | No |
| **Live Agent Simulation** | Unknown | Yes ($1,500 tier) | Yes (autonomous agent) | No | No | No | No |
| **Certification/Badge** | Yes (Bronze-Platinum) | Yes (6 tiers) | No | No | No | No | No |
| **Registry/Directory** | Planned | No | No | No | No | No | Yes (500+ domains) |
| **API Access** | Unknown | No | No | Yes (MCP server) | Yes (REST API) | No | Yes (public API) |
| **Pricing Model** | Unknown | $0-$15K (consulting) | Free | Free | $0-$249/mo (SaaS) | Free | Free |
| **Commerce Focus** | Cross-industry | Cross-industry | Cross-industry | Cross-industry | Cross-industry | E-commerce only | Cross-industry |
| **Scale** | 2,600+ companies | 2,600+ indexed | Unknown | Unknown | Unknown | Unknown | 500+ domains |

### Key Differentiators by Player

| Player | Unique Angle |
|--------|-------------|
| **AgentHermes** | Only one measuring all 5 dimensions including payment acceptance + wallet-to-wallet. FICO-like standardization goal. |
| **Agentiview** | Only one with action-weighted composite score (AVS). Consulting-led remediation. |
| **Pillar** | Only one using live autonomous agent simulation as primary methodology. |
| **IsAgentReady** | Most transparent methodology (exact weights, checks, open MCP server). |
| **AgentReady.site** | Only one with SaaS pricing + API + white-label for agencies. |
| **Agentic Storefront** | Deepest e-commerce checks (178 checks, commerce-specific). |
| **Anon** | Only one with a public leaderboard/directory of scored domains. |

---

## 8. White Space Analysis

What **no competitor** is doing that AgentHermes should own:

### 8.1 Payment Acceptance Testing (CRITICAL GAP)
**No competitor tests whether a business can accept agent-initiated payments.** AgentHermes's category 5 (Agent Payment Acceptance — wallet-to-wallet via Stripe Connect) is completely unaddressed by any tool in the market. With Stripe's Agentic Commerce Suite, Visa TAP, Skyfire KYAPay, and Shopify UCP all going live, the businesses that integrate these will need a score proving it. AgentHermes is the only one that can provide it.

### 8.2 Structured Pricing Readability
**No competitor measures whether pricing is machine-readable.** This is AgentHermes category 4. Agents need to compare pricing programmatically. No existing tool checks whether pricing is structured in a way agents can evaluate (JSON-LD pricing, API-accessible plan data, etc.).

### 8.3 Cross-Protocol Compliance Score
**No competitor measures compliance across ALL agent protocols simultaneously.** Most tools check 1-2 protocols (typically llms.txt + robots.txt). None comprehensively test A2A Agent Cards + MCP endpoints + ACP compliance + UCP readiness + Visa TAP integration + llms.txt + agents.json. AgentHermes should be the single score that covers all 7+ protocols.

### 8.4 Verified Badge / Trust Seal (MAJOR OPPORTUNITY)
**No competitor has established a recognized agent-readiness badge.** Agentiview has certification bands but no displayable badge. The market needs a visual trust signal — like the "Stripe Verified" or "SSL Secure" badge — that businesses display to signal agent-readiness. AgentHermes's Bronze/Silver/Gold/Platinum tiers are perfectly positioned for this.

### 8.5 Agent-Facing Registry (BIGGEST MOAT)
**No competitor is building a registry where agents go to discover agent-ready businesses.** MCP Registry lists tools/servers. A2A lists agents. But no registry lists BUSINESSES scored and verified for agent interaction. This is the "Yellow Pages for the agent economy" — and nobody owns it yet.

### 8.6 Real-Time Score Monitoring
**Only Sanbi.ai does ongoing monitoring, and only for e-commerce.** Most tools are one-time scans. AgentHermes should offer continuous score tracking with alerts when readiness drops (e.g., API goes down, pricing page changes, llms.txt removed).

### 8.7 Industry Benchmarking at Scale
**Only Cisco does benchmarking at scale (8,000+ orgs) but for general AI readiness.** For agent-specific readiness, the market lacks authoritative benchmarks like "the average SaaS company scores 34/100 on agent readiness." AgentHermes's 2,600+ company dataset is the foundation for this.

### 8.8 Onboarding Flow Testing
**Only Pillar and Anon test signup flows.** But neither tests the full onboarding chain: Can an agent sign up → get API keys → make a test call → complete a transaction without any human intervention? This end-to-end autonomous onboarding test is unique to AgentHermes's vision.

### 8.9 Remediation Marketplace
**Agentiview charges $1,500-$15K for remediation, but no one has a marketplace model.** AgentHermes could partner with agencies/developers who fix readiness gaps, taking a referral fee. The assessment becomes the lead-gen engine for a remediation marketplace.

### 8.10 Standards-Backed Score
**No competitor has formal backing from a standards body.** If AgentHermes can get the scoring methodology adopted by the Agentic Commerce Consortium, Linux Foundation A2A project, or referenced in an IETF draft, it becomes the de facto standard — not just another tool.

---

## 9. Standards Landscape Summary

### Where AgentHermes Fits

```
                    STANDARDS STACK
    ================================================

    IETF Layer (forming)
    - agent:// URI scheme
    - Agent Name Service (ANS)
    - AI Agent Discovery (HAIDIP)
    - Agent Security Requirements

    Linux Foundation / Open Standards Layer (active)
    - A2A Protocol (agent interop)
    - MCP (tool integration)
    - ACP + UCP (commerce)

    Industry Consortium Layer (active)
    - Agentic Commerce Consortium (payments/checkout)
    - Visa Intelligent Commerce (trust/identity)

    MISSING LAYER ← AgentHermes goes here
    ┌─────────────────────────────────────────────┐
    │  Agent Readiness Measurement Standard       │
    │  - Standardized scoring methodology         │
    │  - Cross-protocol compliance testing        │
    │  - Business-facing readiness certification  │
    │  - Registry of scored/verified businesses   │
    └─────────────────────────────────────────────┘

    Business Layer (fragmented)
    - Individual tools (Agentiview, IsAgentReady, etc.)
    - Consulting firms (R Systems, Concentrix, etc.)
    - Platform-specific (Shopify, SFCC, etc.)
```

**The opportunity**: Every protocol defines HOW to be agent-ready. Nobody defines HOW TO MEASURE whether you are. AgentHermes can own the measurement layer — becoming to agent-readiness what Google PageSpeed Insights is to web performance, or what Lighthouse is to web accessibility.

### Recommended Standards Strategy

1. **Publish the scoring methodology as an open specification** — make it citeable, forkable, and adoptable
2. **Submit an IETF Internet-Draft** for "Agent Readiness Score" measurement framework (join the existing agent protocol drafts family)
3. **Join the Agentic Commerce Consortium** as the scoring/certification member
4. **Integrate with A2A Agent Cards** — add an "agent-readiness-score" field to the Agent Card spec
5. **Partner with MCP Registry** — cross-reference scored businesses with their MCP server availability

---

## 10. Sources

### Direct Competitors
- [Agentiview](https://agentiview.com/)
- [Pillar Agent Score](https://trypillar.com/tools/agent-score)
- [IsAgentReady](https://isagentready.com/en/)
- [AgentReady.site](https://agentready.site/)
- [AgentReady.site Docs](https://agentready.site/docs)
- [Agentic Readiness Analyzer](https://app.agenticstorefront.com/)
- [Anon](https://www.anon.com/)
- [SiteSpeakAI Scanner](https://sitespeak.ai/tools/ai-agent-readiness-scanner)
- [AgentReady.md](https://agentready.md/)
- [AgentScore.site](https://agentscore.site/)
- [ValidatorAI Agentic](https://agentic.validatorai.com/)
- [Sanbi.ai](https://sanbi.ai/)

### Enterprise Consulting
- [Cisco AI Readiness Index](https://www.cisco.com/c/m/en_us/solutions/ai/readiness-index.html)
- [Microsoft Agent Readiness Assessment](https://learn.microsoft.com/en-us/assessments/94f1c697-9ba7-4d47-ad83-7c6bd94b1505/)
- [R Systems Agentic Readiness Audit](https://www.rsystems.com/agentic-readiness-audit/)
- [Concentrix Agentic AI Readiness Assessment](https://www.concentrix.com/services-solutions/agentic-ai/agentic-ai-readiness-assessment/)
- [Rapidops AI Agent Readiness Assessment](https://www.rapidops.com/resources/ai-agent-readiness-assessment/)

### Codebase Readiness
- [Factory.ai Agent Readiness](https://factory.ai/news/agent-readiness)
- [Factory.ai Docs — Overview](https://docs.factory.ai/web/agent-readiness/overview)
- [jpequegn/agent-readiness-score (GitHub)](https://github.com/jpequegn/agent-readiness-score)
- [kodustech/agent-readiness (GitHub)](https://github.com/kodustech/agent-readiness)

### Agent Commerce Infrastructure
- [Stripe Agentic Commerce Suite](https://stripe.com/blog/agentic-commerce-suite)
- [Visa Trusted Agent Protocol](https://developer.visa.com/capabilities/trusted-agent-protocol)
- [Skyfire](https://skyfire.xyz/product/)
- [Nekuda](https://nekuda.ai/)
- [Basis Theory / Agentic Commerce Consortium](https://basistheory.ai/consortium)
- [Shopify Agentic Commerce](https://shopify.dev/docs/agents)
- [Shopify UCP Engineering Post](https://shopify.engineering/ucp)
- [Rye Agentic Commerce Landscape](https://rye.com/blog/agentic-commerce-startups)
- [Firmly](https://www.businesswire.com/news/home/20250306938250/en/)

### Registries & Discovery
- [Official MCP Registry](https://registry.modelcontextprotocol.io/)
- [A2A Protocol](https://a2a-protocol.org/latest/)
- [A2A GitHub](https://github.com/a2aproject/A2A)
- [Microsoft Entra Agent ID](https://learn.microsoft.com/en-us/entra/agent-id/identity-platform/publish-agents-to-registry)
- [Kong MCP Registry Announcement](https://www.prnewswire.com/news-releases/kong-introduces-mcp-registry-in-kong-konnect-to-power-ai-connectivity-for-agent-discovery-and-governance-302676451.html)

### Standards & Protocols
- [Linux Foundation A2A Launch](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents)
- [Google A2A Donation to Linux Foundation](https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/)
- [IETF Agent Networks Framework](https://datatracker.ietf.org/doc/draft-zyyhl-agent-networks-framework/)
- [IETF Agent Discovery (HAIDIP)](https://datatracker.ietf.org/doc/draft-cui-ai-agent-discovery-invocation/)
- [IETF agent:// URI Protocol](https://datatracker.ietf.org/doc/draft-narvaneni-agent-uri/02/)
- [IETF AI Agent Protocol Framework](https://datatracker.ietf.org/doc/draft-rosenberg-aiproto-framework/)
- [IETF Agent Security Requirements](https://datatracker.ietf.org/doc/draft-ni-a2a-ai-agent-security-requirements/)
- [IETF Agent Name Service (ANS)](https://datatracker.ietf.org/doc/html/draft-narajala-ans-00)
- [SCIM for AI (WorkOS)](https://workos.com/blog/scim-agents-agentic-applications)
- [ACP Joins A2A under Linux Foundation](https://lfaidata.foundation/communityblog/2025/08/29/acp-joins-forces-with-a2a-under-the-linux-foundations-lf-ai-data/)
- [llms.txt State in 2026](https://www.aeo.press/ai/the-state-of-llms-txt-in-2026)

### Market Data
- [Gartner: 40% Enterprise Apps with Agents by 2026](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)
- [150+ AI Agent Statistics 2026](https://masterofcode.com/blog/ai-agent-statistics)
- [Agentic Commerce Trends 2026 (MetaRouter)](https://www.metarouter.io/post/agentic-commerce-trends-statistics)
- [Visa Agentic Commerce Pilots](https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21961.html)
- [Agent Registry Architectures (arXiv)](https://arxiv.org/html/2508.03095v3)
