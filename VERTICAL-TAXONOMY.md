# AgentHermes — Full Economy Vertical Taxonomy

> Research date: 2026-03-30
> Purpose: Map EVERY business vertical in the economy for agent readiness — beyond local services.
> Companion to: VERTICAL-RESEARCH.md (covers 15 local/SMB verticals)
> This document covers 12 macro-categories, 60+ sub-verticals, with market size, agent readiness, use cases, MCP tools, revenue opportunity, and template difficulty for each.

---

## How to Read This Document

For each category:
1. **Market Size** — Number of businesses, TAM, US focus with global notes
2. **Agent Readiness Today** — Scale: 1 (fully analog) to 10 (already agent-native)
3. **Agent Use Case** — Why an AI agent would interact with this vertical
4. **Top 3 MCP Tools** — The minimum tools an agent needs
5. **Revenue Opportunity for AgentHermes** — How we make money here
6. **Template Difficulty** — Easy (1-2 weeks), Medium (1 month), Hard (2-3 months), Very Hard (6+ months)

---

## Scoring Legend

| Readiness Score | Meaning | Examples |
|----------------|---------|----------|
| 1-2 | Fully analog. No APIs, no online booking, paper processes. | Farms, some government offices |
| 3-4 | Has a website. Maybe online forms. No programmatic access. | Most SMBs, small retailers |
| 5-6 | Has APIs or booking systems. Some automation possible. | Restaurants (Toast), medical (Epic) |
| 7-8 | Good APIs, webhooks, OAuth. Missing agent-specific features. | SaaS tools, dev platforms, e-commerce |
| 9-10 | Agent-native. MCP/A2A support, programmatic everything. | Stripe, Vercel, some AI-native tools |

---

## Category Overview — The Entire Economy

| # | Category | Sub-Verticals | Total Businesses (US) | Avg Readiness | Priority |
|---|----------|--------------|----------------------|---------------|----------|
| 1 | SaaS / Software | 8 | ~175,000 | 7.5 | HIGH |
| 2 | Developer Tools / APIs | 6 | ~25,000 | 8.5 | MEDIUM |
| 3 | E-Commerce / Retail | 7 | ~2,100,000 | 5.0 | HIGH |
| 4 | Financial Services | 8 | ~500,000 | 4.5 | HIGH |
| 5 | Healthcare | 8 | ~900,000 | 3.5 | HIGH |
| 6 | Education | 6 | ~350,000 | 4.0 | MEDIUM |
| 7 | Real Estate / Property | 6 | ~600,000 | 5.0 | HIGH |
| 8 | Travel / Hospitality | 7 | ~750,000 | 6.0 | HIGH |
| 9 | Media / Entertainment | 6 | ~300,000 | 5.5 | MEDIUM |
| 10 | Logistics / Supply Chain | 5 | ~200,000 | 5.0 | MEDIUM |
| 11 | Agriculture / Industrial | 5 | ~400,000 | 2.0 | LOW |
| 12 | Government / Nonprofit | 5 | ~1,500,000 | 2.5 | LOW |

**Total addressable: ~7.8M businesses across these 12 categories, plus the ~5M local service businesses already covered in VERTICAL-RESEARCH.md. Combined: ~13M US businesses.**

---

## 1. SaaS / Software

**What "agent-ready" means for SaaS:** Programmatic account creation, API-first billing (usage metering, plan changes, invoicing), OAuth2/API key auth, webhooks for state changes, machine-readable docs (llms.txt, OpenAPI), and MCP endpoints so agents can operate the software on behalf of users.

**Market size:** ~175,000 SaaS companies globally (~30,000 with >$1M ARR). $300B+ global SaaS market growing 15% YoY.

**Agent readiness today: 7.5/10** — Most SaaS has APIs. Gap: few have MCP endpoints, agent-friendly onboarding (signup without email verification loops), or programmatic billing changes.

---

### 1a. CRM Platforms

**Examples:** Salesforce, HubSpot, Pipedrive, Close, Zoho CRM, Freshsales

**Businesses:** ~50,000 CRM vendors; ~5M businesses USE a CRM

**Readiness: 8/10** — Strong APIs, webhooks, OAuth. Salesforce has an MCP server. HubSpot has extensive REST APIs.

**Agent use case:** An AI agent managing sales for a small business needs to: create/update contacts, log calls, move deals through pipeline, generate reports, set tasks, and trigger automations. The agent IS the sales rep.

**Top 3 MCP Tools:**
1. `manage_contacts` — Create, search, update, merge contacts/companies. Input: contact data + operation. Output: contact record with all fields.
2. `manage_pipeline` — Move deals between stages, update amounts, set close dates, assign owners. Input: deal ID + stage + metadata. Output: updated deal.
3. `generate_report` — Run pipeline reports, activity reports, forecast summaries. Input: report type + date range + filters. Output: structured data with totals.

**Revenue for AgentHermes:**
- Template businesses that USE CRMs to expose their sales process to agents (so an agent can "apply" to be a customer)
- CRM vendors listing on AgentHermes as agent-ready tools
- $49-199/mo per CRM vendor for verified listing + MCP proxy
- TAM: $50M/yr if 5% of CRM vendors list at $199/mo avg

**Template difficulty: Medium** — APIs exist but schema varies wildly between CRMs. Need per-platform adapters.

---

### 1b. Project Management

**Examples:** Asana, Monday.com, Jira, Linear, ClickUp, Notion, Basecamp, Trello

**Businesses:** ~15,000 PM tool vendors; ~10M teams use PM tools

**Readiness: 8/10** — Rich APIs. Linear has GraphQL. Jira has REST + webhooks. Notion has an MCP server already.

**Agent use case:** An agent managing a project needs to create tasks, assign them, track deadlines, update status, link dependencies, and generate progress reports. Agents orchestrating work across teams.

**Top 3 MCP Tools:**
1. `manage_tasks` — CRUD tasks with assignees, priorities, deadlines, labels, descriptions, subtasks. Input: task operation + data. Output: task object.
2. `query_project_status` — Get progress metrics: open/closed tasks, velocity, blockers, overdue items. Input: project ID + date range. Output: status summary.
3. `create_workflow` — Set up automations, templates, recurring tasks. Input: trigger + action + conditions. Output: workflow ID.

**Revenue for AgentHermes:**
- PM tools want agents to discover them for recommendations ("best PM tool for a 5-person remote team")
- Businesses using PM tools expose project intake via agents
- $99-299/mo per vendor listing
- TAM: $25M/yr

**Template difficulty: Medium** — Good APIs but complex domain models (projects > epics > stories > tasks > subtasks).

---

### 1c. Email / Communication Tools

**Examples:** Mailchimp, SendGrid, Brevo, ConvertKit, ActiveCampaign, Postmark, Customer.io

**Businesses:** ~5,000 email tool vendors; ~4M businesses use email marketing

**Readiness: 8/10** — Excellent APIs (transactional email is inherently API-first). SendGrid/Postmark are basically pure APIs.

**Agent use case:** An agent running marketing for a business needs to: create campaigns, manage subscriber lists, set up automations, A/B test subject lines, and analyze open/click rates. Also: an agent helping a consumer manage subscriptions.

**Top 3 MCP Tools:**
1. `send_campaign` — Create and send email campaigns with templates, segments, scheduling. Input: template + audience + schedule. Output: campaign ID + delivery stats.
2. `manage_subscribers` — Add, remove, segment, tag subscribers. Input: operation + subscriber data + list/segment. Output: subscriber record.
3. `get_analytics` — Open rates, click rates, unsubscribes, revenue attribution. Input: campaign or date range. Output: metrics object.

**Revenue for AgentHermes:**
- Email tools competing for "recommended by agents" status
- $49-149/mo per vendor
- TAM: $15M/yr

**Template difficulty: Easy** — Straightforward APIs with well-defined schemas.

---

### 1d. Analytics / BI Tools

**Examples:** Mixpanel, Amplitude, Google Analytics, Tableau, Looker, Metabase, PostHog

**Businesses:** ~3,000 analytics vendors; ~2M businesses use analytics

**Readiness: 7/10** — Query APIs exist but often complex. GA4 API is powerful but obtuse. Mixpanel has good REST.

**Agent use case:** An agent performing analysis on behalf of a business: "What was our conversion rate last week?" "Which marketing channel drove the most revenue?" "Alert me if bounce rate exceeds 60%."

**Top 3 MCP Tools:**
1. `run_query` — Execute analytics query with dimensions, metrics, filters, date range. Input: metric definitions + filters. Output: tabular data.
2. `create_alert` — Set up threshold alerts (metric > X, metric drops Y%). Input: metric + condition + notification channel. Output: alert ID.
3. `get_dashboard_summary` — Pull key metrics from a saved dashboard. Input: dashboard ID or name. Output: structured KPI object.

**Revenue for AgentHermes:**
- Analytics tools listed as agent-queryable data sources
- $99-399/mo per vendor (data tools command premium)
- TAM: $20M/yr

**Template difficulty: Hard** — Query languages vary enormously. Need universal query abstraction.

---

### 1e. Database / Infrastructure SaaS

**Examples:** Supabase, PlanetScale, Neon, MongoDB Atlas, Redis Cloud, Aiven, CockroachDB

**Businesses:** ~2,000 DB vendors; ~5M developers use managed databases

**Readiness: 9/10** — These are API-first by nature. Supabase has REST + realtime + auth. PlanetScale has branching API.

**Agent use case:** An agent provisioning infrastructure: "Spin up a Postgres database for my new project with connection pooling and 10GB storage." Also: agents that query databases on behalf of users (natural language to SQL).

**Top 3 MCP Tools:**
1. `provision_database` — Create database instance with config (size, region, extensions, pooling). Input: spec object. Output: connection string + dashboard URL.
2. `execute_query` — Run SQL/NoSQL query with safety guardrails (read-only mode, row limits). Input: query string + params. Output: result set.
3. `manage_schema` — Create/alter tables, indexes, RLS policies. Input: migration SQL or schema diff. Output: migration result.

**Revenue for AgentHermes:**
- DB vendors paying for agent discoverability
- $199-499/mo per vendor (infrastructure commands premium pricing)
- TAM: $15M/yr

**Template difficulty: Medium** — APIs are clean but provisioning semantics vary.

---

### 1f. HR / Payroll SaaS

**Examples:** Gusto, Rippling, BambooHR, Justworks, ADP, Deel, Remote.com

**Businesses:** ~5,000 HR tool vendors; ~2M businesses use HR SaaS

**Readiness: 6/10** — APIs exist but often gated behind enterprise plans. PII concerns limit programmatic access.

**Agent use case:** An agent managing HR: "Onboard this new hire — create their account, set up payroll, enroll in benefits, assign equipment." Also: employee self-service ("How many PTO days do I have?").

**Top 3 MCP Tools:**
1. `onboard_employee` — Create employee record with role, compensation, start date, benefits elections. Input: employee data. Output: onboarding checklist status.
2. `run_payroll` — Calculate and process payroll for a period. Input: pay period + adjustments (bonuses, deductions). Output: payroll summary + approval link.
3. `query_benefits` — Check PTO balance, insurance coverage, 401k match. Input: employee ID + benefit type. Output: benefit details.

**Revenue for AgentHermes:**
- HR tools competing for "agent-recommended" when businesses ask "what payroll tool should I use?"
- $149-399/mo per vendor
- TAM: $20M/yr

**Template difficulty: Hard** — PII regulations, benefits complexity, state-by-state payroll rules.

---

### 1g. Marketing Automation

**Examples:** Marketo, Pardot, Autopilot, Drip, Klaviyo, Iterable

**Businesses:** ~3,000 vendors; ~500K businesses use marketing automation

**Readiness: 7/10** — Good APIs for campaign management. Webhooks for events. Gap: agent-initiated multi-channel orchestration.

**Agent use case:** An agent running the entire marketing function: "Launch a drip campaign for our new product — email sequence + retargeting ads + social posts. Optimize for conversions after 1 week."

**Top 3 MCP Tools:**
1. `create_automation` — Build multi-step workflows (trigger > wait > email > branch > action). Input: workflow definition. Output: automation ID.
2. `manage_audience` — Create segments based on behavior, demographics, engagement. Input: segment criteria. Output: audience size + sample.
3. `get_campaign_performance` — ROI, conversion attribution, channel breakdown. Input: campaign ID + date range. Output: performance metrics.

**Revenue for AgentHermes:**
- $99-299/mo per vendor
- TAM: $15M/yr

**Template difficulty: Medium** — Complex workflows but well-structured APIs.

---

### 1h. Vertical SaaS (Industry-Specific)

**Examples:** Toast (restaurants), ServiceTitan (home services), Mindbody (fitness), Clio (law), Procore (construction), Buildertrend (contractors)

**Businesses:** ~10,000 vertical SaaS vendors; the MOST important category for AgentHermes

**Readiness: 6/10** — APIs vary wildly. Toast has good APIs. ServiceTitan is improving. Many are still primarily UI-driven.

**Agent use case:** These ARE the fulfillment layer. When an agent books a plumber, it goes through ServiceTitan. When an agent reserves a table, it goes through Toast/OpenTable. AgentHermes needs to integrate with these, not compete.

**Top 3 MCP Tools:**
1. `dispatch_request` — Route a service request through the vertical SaaS. Input: service type + customer data + urgency. Output: confirmation + ETA.
2. `check_capacity` — Query availability through the vertical SaaS. Input: date/time + service type. Output: available slots.
3. `get_pricing` — Pull pricing from the vertical SaaS. Input: service type + parameters. Output: quote.

**Revenue for AgentHermes:**
- PARTNERSHIP model, not listing fee. Revenue share on transactions routed through their platform via AgentHermes.
- 1-3% transaction fee, or $499-999/mo for premium integration
- TAM: $100M/yr (these are the gatekeepers of fulfillment)

**Template difficulty: Very Hard** — Each vertical SaaS has unique domain models. But the payoff is enormous because one integration unlocks thousands of businesses on that platform.

---

## 2. Developer Tools / APIs

**What "agent-ready" means here:** Already mostly there. They have APIs. The gap is: programmatic signup (without CAPTCHA/email loops), agent-friendly documentation (llms.txt, MCP endpoints), usage-based billing that agents can manage, and sandbox environments for agents to test before committing.

**Market size:** ~25,000 developer tool companies. $50B+ market. Growing 20%+ YoY.

**Agent readiness today: 8.5/10** — The most agent-ready category by far. They were built for programmatic access.

---

### 2a. Payment Processing

**Examples:** Stripe, Square, Adyen, Braintree, PayPal, Authorize.net

**Businesses:** ~5,000 payment processors; ~10M merchants use them

**Readiness: 9/10** — Stripe literally has an MCP server and Agent Toolkit. Square has comprehensive APIs. These companies GET the agent economy.

**Agent use case:** An agent setting up commerce for a business: "Create a Stripe account, add products, set up subscription billing, generate payment links." Also: agents facilitating payments between parties.

**Top 3 MCP Tools:**
1. `create_checkout` — Generate payment link or checkout session. Input: items + amounts + customer. Output: checkout URL + session ID.
2. `manage_subscriptions` — Create, update, cancel, pause subscriptions. Input: customer + plan + billing cycle. Output: subscription object.
3. `get_financial_summary` — Revenue, refunds, disputes, net for period. Input: date range + filters. Output: financial metrics.

**Revenue for AgentHermes:**
- These are PARTNERS, not customers. Stripe wants agents using their rails.
- Revenue share on agent-facilitated transactions (0.1-0.5% on top of Stripe's 2.9%)
- Referral fees for new merchant signups driven by agents
- TAM: $500M/yr potential (transaction-based, scales with volume)

**Template difficulty: Easy** — APIs are world-class. Documentation is excellent. SDKs in every language.

---

### 2b. Cloud Infrastructure

**Examples:** AWS, GCP, Azure, DigitalOcean, Vercel, Netlify, Railway, Render, Fly.io

**Businesses:** ~500 cloud providers; ~5M developers/companies deploy to cloud

**Readiness: 8/10** — Massive APIs (AWS has 200+ services with APIs). Gap: agent-friendly provisioning that abstracts complexity, cost prediction before deployment.

**Agent use case:** "Deploy my Next.js app to the cheapest provider that supports edge functions and has servers in EU. Set up CI/CD, custom domain, and SSL." Agents as DevOps engineers.

**Top 3 MCP Tools:**
1. `deploy_application` — Deploy app to cloud with config (runtime, region, env vars, domain). Input: repo + config. Output: deployment URL + status.
2. `estimate_cost` — Predict monthly cost based on traffic/compute estimates. Input: resource spec + traffic estimate. Output: cost breakdown.
3. `manage_infrastructure` — Scale up/down, add services (DB, cache, storage), configure networking. Input: operation + resource spec. Output: resource status.

**Revenue for AgentHermes:**
- Cloud providers pay for agent traffic (they already pay billions in Google Ads)
- Referral commissions: $50-500 per new customer
- $299-999/mo for premium cloud provider listing
- TAM: $200M/yr

**Template difficulty: Hard** — Abstraction is the challenge. AWS alone has 200+ services.

---

### 2c. Communication APIs

**Examples:** Twilio, Vonage, Sinch, MessageBird, Plivo, Bandwidth

**Businesses:** ~2,000 CPaaS vendors; ~500K businesses use communication APIs

**Readiness: 9/10** — Pure API companies. Twilio's entire business IS the API.

**Agent use case:** An agent setting up business communications: "Provision a phone number, set up IVR, configure SMS notifications, create a video meeting room." Agents orchestrating multi-channel communication.

**Top 3 MCP Tools:**
1. `provision_number` — Get phone number in area code/country with SMS/voice capability. Input: country + capabilities + area code. Output: phone number + SID.
2. `send_message` — Send SMS, MMS, WhatsApp, or email through unified API. Input: to + from + body + channel. Output: message SID + status.
3. `create_call_flow` — Set up IVR, call routing, recording, transcription. Input: flow definition (TwiML-like). Output: flow ID.

**Revenue for AgentHermes:**
- CPaaS companies want agents discovering their APIs for recommendations
- Referral fees: $100-1,000 per new developer account
- $149-399/mo per vendor listing
- TAM: $30M/yr

**Template difficulty: Easy** — APIs are clean and well-documented. Standard REST patterns.

---

### 2d. Auth / Identity

**Examples:** Auth0/Okta, Clerk, Supabase Auth, Firebase Auth, WorkOS, Stytch

**Businesses:** ~1,000 auth providers; ~2M apps use managed auth

**Readiness: 8/10** — Good APIs. Gap: agent-to-agent identity (proving one agent acts on behalf of a user).

**Agent use case:** "Set up authentication for my new app — email/password + Google OAuth + magic links. Configure MFA for admin roles." Also: identity verification for agent transactions.

**Top 3 MCP Tools:**
1. `configure_auth` — Set up auth provider with methods, social connections, MFA rules. Input: config object. Output: auth setup + embed code.
2. `manage_users` — Create, block, impersonate, reset users. Input: operation + user data. Output: user object.
3. `verify_identity` — Prove a user or agent identity for a transaction. Input: token + claims. Output: verified identity object.

**Revenue for AgentHermes:**
- Auth providers critical for agent economy trust layer
- $199-499/mo per vendor
- TAM: $15M/yr

**Template difficulty: Medium** — Auth flows are standardized (OAuth2/OIDC) but edge cases are complex.

---

### 2e. Monitoring / Observability

**Examples:** Datadog, New Relic, Grafana, Sentry, PagerDuty, Honeycomb, BetterStack

**Businesses:** ~2,000 vendors; ~1M teams use monitoring tools

**Readiness: 8/10** — Strong APIs for querying metrics, creating alerts, managing incidents. Gap: agent-initiated root cause analysis.

**Agent use case:** "My site is slow. What's causing it? Check error rates, latency, and recent deployments. Page the on-call engineer if it's critical." Agents as SRE tier-1.

**Top 3 MCP Tools:**
1. `query_metrics` — Fetch metrics with aggregations and filters. Input: metric name + time range + grouping. Output: time series data.
2. `manage_incidents` — Create, acknowledge, resolve incidents. Trigger escalation. Input: incident data + action. Output: incident status.
3. `analyze_errors` — Get error trends, stack traces, affected users. Input: time range + filters. Output: error groups + frequency + impact.

**Revenue for AgentHermes:**
- Monitoring tools listed as agent-accessible for autonomous SRE
- $149-399/mo per vendor
- TAM: $15M/yr

**Template difficulty: Medium** — Good APIs but complex query languages (PromQL, LogQL, etc.).

---

### 2f. CI/CD / DevOps

**Examples:** GitHub Actions, GitLab CI, CircleCI, Jenkins, ArgoCD, Terraform Cloud

**Businesses:** ~1,000 vendors; ~3M development teams

**Readiness: 8/10** — APIs exist. GitHub Actions is API-controllable. Terraform has a well-defined state model.

**Agent use case:** "Run the test suite, fix any failing tests, deploy to staging, run smoke tests, promote to production if green." Full autonomous deployment pipeline.

**Top 3 MCP Tools:**
1. `trigger_pipeline` — Start a CI/CD pipeline with parameters. Input: repo + branch + env + params. Output: run ID + status URL.
2. `get_pipeline_status` — Check running/completed pipeline status. Input: run ID. Output: step-by-step status + logs + artifacts.
3. `manage_environments` — Create/update deployment environments, secrets, approvals. Input: env config. Output: environment status.

**Revenue for AgentHermes:**
- CI/CD tools want to be the "agent-recommended" pipeline for autonomous development
- $99-299/mo per vendor
- TAM: $10M/yr

**Template difficulty: Medium** — Well-structured but pipeline definitions are complex.

---

## 3. E-Commerce / Retail

**What "agent-ready" means for e-commerce:** Machine-readable product catalogs, real-time inventory, programmatic cart/checkout, order tracking APIs, return/exchange automation, and recommendation/personalization endpoints.

**Market size:** ~2.1M e-commerce businesses in the US. $1.1T US e-commerce sales in 2025. Global: $6.3T.

**Agent readiness today: 5/10** — Platforms like Shopify are 7/10 (good APIs), but individual stores on those platforms are 3/10 (API not configured, no agent access).

---

### 3a. Shopify Stores

**Examples:** 4.6M Shopify stores globally (~2M active)

**Readiness: 7/10 (platform), 3/10 (individual stores)** — Shopify has excellent Admin + Storefront APIs. But most store owners have never enabled API access or configured it for agents.

**Agent use case:** A consumer's agent shopping: "Find me a leather weekender bag under $200 with free shipping. Check reviews. Compare with 3 other stores. Buy the best one." Also: a store owner's agent managing inventory: "Reorder products below 10 units."

**Top 3 MCP Tools:**
1. `search_products` — Search products by keyword, category, price range, attributes, availability. Input: query + filters. Output: product list with images, prices, ratings.
2. `place_order` — Add to cart, apply discount code, checkout with saved payment. Input: product IDs + quantities + shipping address + payment. Output: order confirmation.
3. `track_order` — Get shipping status, carrier, ETA, tracking URL. Input: order ID or email. Output: tracking details.

**Revenue for AgentHermes:**
- Shopify stores pay to be discoverable by shopping agents
- Affiliate commission: 5-15% on agent-facilitated sales
- $29-99/mo for "Agent Verified" store listing
- TAM: $500M/yr (millions of stores, transaction-based revenue)

**Template difficulty: Easy** — Shopify APIs are standardized. One adapter covers millions of stores.

---

### 3b. WooCommerce / WordPress Stores

**Examples:** ~6M WooCommerce stores globally

**Readiness: 5/10 (platform), 2/10 (most stores)** — WooCommerce REST API exists but most stores have it disabled, no authentication configured, or running on cheap hosting that can't handle API load.

**Agent use case:** Same as Shopify but more fragmented. The opportunity is a WordPress plugin that makes any WooCommerce store agent-ready in one click.

**Top 3 MCP Tools:**
1. `search_products` — Same schema as Shopify (normalize across platforms).
2. `check_inventory` — Real-time stock levels, backorder status, expected restock date. Input: product ID or SKU. Output: inventory status.
3. `place_order` — Cart + checkout flow via REST API. Input: products + customer + payment. Output: order object.

**Revenue for AgentHermes:**
- WordPress plugin: freemium ($0 basic / $19/mo pro)
- Listed stores pay $29-99/mo for premium agent discoverability
- TAM: $200M/yr

**Template difficulty: Easy** — WooCommerce REST API is standardized. Plugin deployment model.

---

### 3c. Amazon / Marketplace Sellers

**Examples:** ~2M active Amazon sellers in the US; also eBay, Etsy, Walmart Marketplace

**Readiness: 6/10** — Amazon SP-API is powerful but painful (auth is Byzantine). eBay and Etsy have simpler APIs. Gap: seller-side agent access (managing listings, pricing, inventory across marketplaces).

**Agent use case:** Seller-side: "Reprice my products to stay within 5% of the Buy Box winner. Auto-restock when inventory hits 2 weeks of supply. Flag negative reviews for response." Consumer-side: "Find the best deal on a KitchenAid mixer across Amazon, eBay, and direct stores."

**Top 3 MCP Tools:**
1. `manage_listings` — Create, update, optimize product listings across marketplaces. Input: product data + marketplace + pricing strategy. Output: listing status.
2. `monitor_competition` — Track competitor prices, rankings, reviews. Input: ASIN/product ID. Output: competitive landscape data.
3. `manage_inventory` — Cross-marketplace inventory sync, restock alerts, FBA shipment creation. Input: inventory operation. Output: inventory status.

**Revenue for AgentHermes:**
- Seller tools pay for agent integration (repricing, inventory)
- Transaction referral: 1-3% on cross-platform sales
- $99-299/mo for multi-marketplace seller listing
- TAM: $300M/yr

**Template difficulty: Hard** — Each marketplace has its own API, auth, and rules. Amazon SP-API alone is a multi-month integration.

---

### 3d. D2C / Direct-to-Consumer Brands

**Examples:** Warby Parker, Glossier, Allbirds, Dollar Shave Club, plus 100K+ smaller D2C brands

**Readiness: 4/10** — Most use Shopify/WooCommerce underneath (so platform readiness applies), but many have custom storefronts with no API access. Subscription management (Recharge, Bold) adds complexity.

**Agent use case:** "I need to reorder my protein powder. Check if my subscription is still active. If the price went up, find a comparable product from another brand." Subscription management + brand discovery.

**Top 3 MCP Tools:**
1. `manage_subscription` — View, modify, pause, cancel, reactivate subscriptions. Input: customer ID + subscription operation. Output: subscription status.
2. `find_similar_products` — Semantic search for product alternatives. Input: product description + constraints (price, attributes). Output: ranked alternatives.
3. `apply_offer` — Check for available discounts, loyalty rewards, referral credits. Input: customer ID + cart. Output: applicable offers.

**Revenue for AgentHermes:**
- D2C brands pay for agent discoverability (compete with Amazon)
- $49-199/mo per brand
- Referral commissions on new customer acquisition
- TAM: $150M/yr

**Template difficulty: Medium** — Subscription layer (Recharge, Bold, Chargebee) adds complexity beyond basic e-commerce.

---

### 3e. Grocery / Food Delivery

**Examples:** Instacart, DoorDash, Uber Eats, Grubhub, Amazon Fresh, Walmart Grocery

**Readiness: 6/10** — Major platforms have APIs (DoorDash Drive API, Instacart's platform). Gap: unified cross-platform ordering, dietary filtering, real-time substitution handling.

**Agent use case:** "Order my weekly groceries. Same list as last week but swap the chicken thighs for salmon (it's on sale at Kroger). Use whichever delivery service is cheapest today." Also: meal planning + auto-ordering.

**Top 3 MCP Tools:**
1. `search_products` — Search grocery products with dietary filters (vegan, gluten-free, organic, allergens). Input: query + dietary + store preferences. Output: products with prices + availability.
2. `create_order` — Build cart and place order with delivery window preference. Input: items + delivery address + time preference. Output: order + estimated delivery.
3. `compare_prices` — Same basket across multiple stores/platforms. Input: item list. Output: per-store pricing + total + delivery fees.

**Revenue for AgentHermes:**
- Grocery platforms pay for agent traffic (same economics as restaurant delivery)
- Per-order referral: $1-3
- $199-499/mo for platform listing
- TAM: $100M/yr

**Template difficulty: Hard** — Real-time inventory, substitution logic, delivery scheduling, multi-store comparison.

---

### 3f. Luxury / High-End Retail

**Examples:** Net-a-Porter, Farfetch, 1stDibs, TheRealReal, Chrono24

**Readiness: 4/10** — Luxury brands are intentionally NOT API-first. Exclusivity is the brand. Gap: authenticated, personalized agent access (like a digital concierge).

**Agent use case:** "My wife's birthday is next month. Find a Hermes scarf in blue/green tones under $800. Check authentication status and condition if pre-owned." High-touch, high-value purchases.

**Top 3 MCP Tools:**
1. `search_luxury_catalog` — Search with brand, material, condition, authentication status, price range. Input: criteria. Output: curated results with provenance.
2. `request_concierge` — Request human-in-the-loop assistance for complex luxury purchases. Input: requirements + budget + occasion. Output: curated selection from specialist.
3. `verify_authenticity` — Check authentication records, provenance chain, condition reports. Input: item ID. Output: authentication certificate details.

**Revenue for AgentHermes:**
- Premium listing fees: $499-999/mo (luxury margins support it)
- Transaction referral: 3-5% on high-value sales
- TAM: $50M/yr (small market but high ARPU)

**Template difficulty: Very Hard** — Luxury brands resist standardization. Need white-glove onboarding.

---

### 3g. B2B E-Commerce / Wholesale

**Examples:** Alibaba, Faire, Handshake, ThomasNet, Amazon Business

**Readiness: 5/10** — B2B ordering is still heavily manual (PDFs, phone calls, email quotes). Platforms like Faire are modernizing. Gap: programmatic quoting, bulk ordering, net terms negotiation.

**Agent use case:** "I need 500 units of custom-printed t-shirts. Get quotes from 3 suppliers in the US with 30-day net terms. Sample first, then bulk order." Procurement automation.

**Top 3 MCP Tools:**
1. `request_quote` — Submit RFQ with specs, quantities, delivery timeline. Input: product spec + quantity + timeline. Output: quote with pricing tiers + lead time.
2. `place_bulk_order` — Place order with PO number, shipping terms, payment terms. Input: items + quantities + shipping + payment terms. Output: order confirmation + PO.
3. `track_shipment` — Track bulk shipments with customs/logistics status. Input: PO or tracking number. Output: shipment stages + ETA.

**Revenue for AgentHermes:**
- B2B marketplaces pay for agent-driven procurement traffic
- Per-transaction referral: 0.5-2% (larger orders = smaller %)
- $299-999/mo for supplier listing
- TAM: $200M/yr (B2B e-commerce is $2T+ market)

**Template difficulty: Hard** — Complex quoting, custom pricing, terms negotiation, multi-step approval workflows.

---

## 4. Financial Services

**What "agent-ready" means for finance:** Open Banking APIs (Plaid connectivity), programmatic account opening, real-time rate feeds, automated KYC/AML, transaction categorization APIs, and compliant agent access with audit trails.

**Market size:** ~500,000 financial services companies in the US. $4.8T US financial services industry revenue.

**Agent readiness today: 4.5/10** — Regulated industry. Open Banking (PSD2 in EU, Section 1033 in US) is forcing API adoption, but most institutions are 5+ years behind. Fintechs are 7-8/10; traditional banks are 2-3/10.

**KEY REGULATORY REALITY:** Financial services are HEAVILY regulated. Agent access requires: audit trails, consent management, fiduciary compliance, and in some cases, agent licensing. This limits what's possible but also creates enormous value for whoever solves it compliantly.

---

### 4a. Banking (Consumer + Business)

**Examples:** Chase, Bank of America, Wells Fargo (traditional); Chime, Mercury, Brex, Relay (neo-banks)

**Businesses:** ~4,500 FDIC-insured banks + ~5,000 credit unions + ~200 neo-banks

**Readiness: 3/10 (traditional), 7/10 (neo-banks)** — Traditional banks have terrible APIs behind screen-scraping wrappers (Plaid). Neo-banks are API-first. Section 1033 (CFPB Open Banking rule) will force API access by 2026-2027.

**Agent use case:** "Transfer $5,000 from my Chase checking to my Mercury business account. Schedule rent payment for the 1st. Alert me if balance drops below $10,000." Personal/business financial management by agents.

**Top 3 MCP Tools:**
1. `get_balances` — Retrieve account balances across all linked accounts. Input: auth token. Output: accounts with balances, pending transactions.
2. `initiate_transfer` — Transfer money between accounts or to payees. Input: from + to + amount + schedule. Output: transfer confirmation + reference.
3. `categorize_spending` — Analyze transactions by category, merchant, time period. Input: date range + filters. Output: spending breakdown.

**Revenue for AgentHermes:**
- Banks pay for "agent-verified" badges (trust signal for consumers letting agents access their bank)
- Neo-banks pay for discoverability ("best bank for freelancers" recommendations)
- $499-2,999/mo per institution
- TAM: $200M/yr (banks spend billions on digital)

**Template difficulty: Very Hard** — Regulatory complexity, KYC requirements, transaction security, liability.

---

### 4b. Insurance

**Examples:** State Farm, Geico, Progressive (carriers); Lemonade, Root, Hippo (insurtechs); Applied Epic, Vertafore (agency platforms)

**Businesses:** ~6,000 insurance carriers + ~40,000 agencies + ~100 insurtechs

**Readiness: 3/10 (carriers), 6/10 (insurtechs)** — Insurance is notoriously analog. Quoting still involves forms and phone calls at most carriers. Insurtechs like Lemonade have APIs.

**Agent use case:** "I just bought a house. Get me home insurance quotes from 5 carriers. My car insurance renews next month — check if I can bundle for a discount. I need renter's insurance by Friday." Full insurance lifecycle management.

**Top 3 MCP Tools:**
1. `get_quote` — Get insurance quote with personal/property details. Input: type (auto/home/life/renters) + details. Output: premium + coverage + deductible options.
2. `compare_plans` — Side-by-side comparison of quotes across carriers. Input: quotes array. Output: comparison matrix with recommendations.
3. `file_claim` — Initiate an insurance claim with documentation. Input: policy ID + incident details + photos/docs. Output: claim number + adjuster assignment + next steps.

**Revenue for AgentHermes:**
- Insurance agents/brokers pay for agent-driven lead flow
- Carrier partnerships: $500-5,000/mo for verified listing
- Per-quote referral: $10-50 (insurance leads are extremely valuable)
- TAM: $500M/yr (insurance spends $10B+ on lead gen)

**Template difficulty: Very Hard** — State-by-state regulations, complex underwriting, carrier-specific forms, compliance requirements.

---

### 4c. Lending / Mortgage

**Examples:** Quicken/Rocket Mortgage, LoanDepot, SoFi, LendingClub, Upstart, Marcus

**Businesses:** ~10,000 lenders + ~30,000 mortgage brokers

**Readiness: 5/10** — Rate APIs exist (Bankrate, LendingTree). Application APIs exist at fintechs. Gap: programmatic pre-approval, agent-submitted applications, real-time rate locking.

**Agent use case:** "I want to buy a house in Austin around $450K. What mortgage rate can I get? Compare fixed vs ARM. Pre-approve me at 3 lenders and tell me which has the best terms." Also: refinance monitoring ("alert me when rates drop below 5.5%").

**Top 3 MCP Tools:**
1. `check_rates` — Get current rates by loan type, term, credit score range. Input: loan amount + type + term + credit range. Output: rate + APR + monthly payment.
2. `apply_for_preapproval` — Submit pre-approval application with financial details. Input: income + assets + debt + property type. Output: pre-approval amount + rate + conditions.
3. `compare_offers` — Compare loan offers side-by-side. Input: offer IDs. Output: total cost comparison (rate, fees, closing costs, 5-year cost).

**Revenue for AgentHermes:**
- Lenders pay $50-200 per qualified lead (mortgage leads are worth $100-500)
- $299-999/mo per lender listing
- TAM: $300M/yr (mortgage advertising is a $5B+ industry)

**Template difficulty: Hard** — TILA/RESPA compliance, state licensing, rate lock mechanics, complex application flows.

---

### 4d. Investment / Wealth Management

**Examples:** Fidelity, Schwab, Vanguard (brokerages); Betterment, Wealthfront (robo-advisors); Robinhood (retail trading)

**Businesses:** ~5,000 RIAs + ~3,700 broker-dealers + ~50 robo-advisors

**Readiness: 6/10** — Trading APIs exist (Alpaca, Interactive Brokers). Robo-advisors are API-first. Gap: compliant agent-driven investment advice (fiduciary rules), automated rebalancing across multiple accounts.

**Agent use case:** "Rebalance my portfolio to be 70/30 stocks/bonds. Tax-loss harvest any positions down more than $1,000. Move $5,000 from checking into my Roth IRA." Autonomous portfolio management.

**Top 3 MCP Tools:**
1. `get_portfolio` — Retrieve holdings, allocations, performance, unrealized gains/losses. Input: account ID. Output: portfolio snapshot.
2. `execute_trade` — Buy/sell securities with order types (market, limit, stop). Input: symbol + quantity + order type + account. Output: order confirmation.
3. `rebalance` — Analyze and execute rebalancing with tax optimization. Input: target allocation + constraints. Output: proposed trades + tax impact.

**Revenue for AgentHermes:**
- Investment platforms pay for agent-driven AUM growth
- $499-2,999/mo per platform
- Referral commission: $50-500 per new funded account
- TAM: $150M/yr

**Template difficulty: Very Hard** — SEC/FINRA compliance, fiduciary requirements, real-time market data, tax implications.

---

### 4e. Accounting / Tax Software

**Examples:** QuickBooks, Xero, FreshBooks, Wave (SMB); NetSuite, Sage (enterprise); TurboTax, H&R Block (consumer tax)

**Businesses:** ~5,000 accounting software vendors; ~30M businesses use accounting software

**Readiness: 7/10** — QuickBooks and Xero have excellent APIs. Plaid connects for bank feeds. Gap: agent-driven bookkeeping (auto-categorize, reconcile, prepare financials) and agent-submitted tax returns.

**Agent use case:** "Categorize all my transactions from this month. Flag anything unusual. Prepare my monthly P&L and balance sheet. Estimate my quarterly tax payment." Autonomous bookkeeping.

**Top 3 MCP Tools:**
1. `categorize_transactions` — Auto-categorize bank transactions into chart of accounts. Input: transactions + rules. Output: categorized transactions + confidence scores.
2. `generate_report` — P&L, balance sheet, cash flow, aging reports. Input: report type + period. Output: financial statement.
3. `estimate_taxes` — Calculate estimated tax payments based on YTD financials. Input: entity type + state + YTD data. Output: estimated tax + payment schedule.

**Revenue for AgentHermes:**
- Accounting tools pay for agent discoverability ("best accounting tool for my freelance business")
- $99-299/mo per vendor
- TAM: $50M/yr

**Template difficulty: Medium** — Good APIs but complex domain (chart of accounts, reconciliation rules, tax codes).

---

### 4f. Payment / Invoicing

**Examples:** Bill.com, Melio, Tipalti, Invoice Ninja, PayPal Business, Venmo Business

**Businesses:** ~3,000 vendors; ~5M businesses use payment/invoicing tools

**Readiness: 7/10** — APIs exist for creating/sending invoices, processing payments. Gap: agent-initiated approval workflows, multi-party payment orchestration.

**Agent use case:** "Invoice my client $12,500 for the March sprint. Net 30 terms. Auto-send a reminder at day 21 and day 28. If unpaid at day 35, escalate to me." AP/AR automation by agents.

**Top 3 MCP Tools:**
1. `create_invoice` — Generate and send invoice with line items, terms, payment link. Input: client + items + terms. Output: invoice URL + payment link.
2. `process_payment` — Pay a vendor invoice, schedule bill payment. Input: invoice ID + payment method + schedule. Output: payment confirmation.
3. `get_ar_aging` — Accounts receivable aging report. Input: date + filters. Output: aging buckets with totals.

**Revenue for AgentHermes:**
- $49-149/mo per vendor
- TAM: $20M/yr

**Template difficulty: Easy** — Straightforward APIs with clear schemas.

---

### 4g. Crypto / Digital Assets

**Examples:** Coinbase, Kraken, Binance, Gemini (exchanges); MetaMask, Phantom (wallets); Chainalysis (compliance)

**Businesses:** ~5,000 crypto companies; ~50M US crypto holders

**Readiness: 8/10** — Crypto is inherently programmable. Exchanges have robust APIs. Wallets have SDKs. Gap: agent-friendly custody (agents managing keys securely), DeFi protocol navigation.

**Agent use case:** "Swap 1 ETH for USDC on the DEX with the best rate. Stake my SOL. Monitor my portfolio and alert me if any position drops 20%." Also: compliance monitoring for businesses holding crypto.

**Top 3 MCP Tools:**
1. `execute_trade` — Buy/sell/swap crypto on exchange or DEX. Input: pair + amount + order type + slippage tolerance. Output: trade confirmation.
2. `get_portfolio` — Holdings, values, P&L across wallets and exchanges. Input: account/wallet addresses. Output: portfolio summary.
3. `monitor_positions` — Set alerts for price, balance, or protocol changes. Input: alert criteria. Output: alert ID + current status.

**Revenue for AgentHermes:**
- Crypto platforms pay for agent-driven user acquisition
- $199-499/mo per platform
- Transaction referral: 0.1-0.5%
- TAM: $50M/yr

**Template difficulty: Medium** — Good APIs but security/custody complexity.

---

### 4h. Fintech / Embedded Finance

**Examples:** Plaid, Stripe Treasury, Unit, Synapse, Moov, Lithic, Modern Treasury

**Businesses:** ~2,000 fintech infra companies

**Readiness: 9/10** — These ARE the API layer. Plaid is literally the agent-to-bank bridge. Stripe Treasury enables programmatic bank accounts.

**Agent use case:** "Create a virtual debit card with a $500 limit for my agent to use for software purchases. Link my bank account to my new SaaS app. Issue ACH payments to my contractors."

**Top 3 MCP Tools:**
1. `issue_card` — Create virtual/physical card with spending limits, merchant category restrictions. Input: cardholder + limits + restrictions. Output: card details.
2. `link_account` — Connect a bank account via Plaid or direct integration. Input: routing + account or Plaid token. Output: linked account status.
3. `send_payment` — ACH, wire, or RTP payment. Input: from + to + amount + method + memo. Output: payment confirmation + settlement timeline.

**Revenue for AgentHermes:**
- Fintech infra companies ARE partners, not customers. They enable our agent payment rails.
- Co-marketing: $499-999/mo for integrated partner listing
- TAM: $25M/yr direct, but enabling value is $1B+

**Template difficulty: Medium** — Clean APIs but compliance (KYB, BSA/AML) adds complexity.

---

## 5. Healthcare

**What "agent-ready" means for healthcare:** HIPAA-compliant APIs, patient portal access (via SMART on FHIR), insurance verification in real-time, programmatic appointment scheduling, e-prescribing interfaces, and secure messaging. Everything must have audit trails and consent management.

**Market size:** ~900,000 healthcare businesses in the US. $4.5T US healthcare spending.

**Agent readiness today: 3.5/10** — Healthcare is one of the LEAST agent-ready industries. EHR systems (Epic, Cerner) have APIs but they're locked behind institutional agreements. Telehealth companies are more accessible. HIPAA creates real barriers AND real opportunities.

---

### 5a. Telehealth / Virtual Care

**Examples:** Teladoc, Amwell, MDLive, PlushCare, Cerebral, Talkiatry, Hims/Hers

**Businesses:** ~5,000 telehealth providers

**Readiness: 6/10** — Most have online booking, patient portals, and some API access. Gap: agent-initiated appointments (scheduling on behalf of a patient with their consent), cross-platform provider search.

**Agent use case:** "I have a sore throat and low fever. Find me a telehealth appointment in the next 2 hours that takes my Anthem Blue Cross insurance. If no availability, find an urgent care." Triage + booking + insurance verification.

**Top 3 MCP Tools:**
1. `find_provider` — Search providers by specialty, insurance, availability, language, rating. Input: criteria. Output: ranked provider list with next availability.
2. `book_appointment` — Schedule telehealth visit with provider. Input: patient consent token + provider + time. Output: appointment confirmation + join link.
3. `verify_insurance` — Check insurance eligibility and copay for a visit type. Input: insurance details + visit type. Output: eligible (yes/no) + copay + deductible status.

**Revenue for AgentHermes:**
- Telehealth platforms pay for agent-driven patient acquisition
- Per-booking referral: $20-50
- $199-499/mo per platform listing
- TAM: $100M/yr (telehealth is a $100B market)

**Template difficulty: Hard** — HIPAA compliance, insurance verification complexity, credentialing requirements.

---

### 5b. Pharmacies

**Examples:** CVS, Walgreens, Rite Aid (chain); Amazon Pharmacy, Capsule, Alto (digital); PillPack (mail-order)

**Businesses:** ~40,000 retail pharmacies + ~2,000 digital pharmacies

**Readiness: 4/10** — Prescription transfer APIs exist (Surescripts). Digital pharmacies have some API access. Gap: programmatic price comparison, automatic refills across pharmacies, GoodRx-style discount routing.

**Agent use case:** "Refill my Metformin. Check if it's cheaper at CVS or Costco. Apply my GoodRx coupon if applicable. Schedule delivery." Prescription management + cost optimization.

**Top 3 MCP Tools:**
1. `refill_prescription` — Request prescription refill by Rx number. Input: patient ID + Rx number + pharmacy preference. Output: refill status + pickup/delivery time.
2. `compare_prices` — Price a medication across pharmacies with discount cards. Input: drug name + dose + quantity + zip code. Output: prices by pharmacy + discount options.
3. `transfer_prescription` — Move prescription between pharmacies. Input: current Rx number + target pharmacy. Output: transfer status + new Rx number.

**Revenue for AgentHermes:**
- Digital pharmacies pay for agent-driven patient acquisition
- Affiliate commissions on prescription fills: $2-10 per fill
- $149-399/mo per pharmacy listing
- TAM: $75M/yr

**Template difficulty: Very Hard** — DEA regulations, controlled substance restrictions, state pharmacy board rules, Surescripts integration.

---

### 5c. Mental Health / Therapy

**Examples:** BetterHelp, Talkspace, Cerebral, Alma, Headway, Grow Therapy

**Businesses:** ~300,000 licensed therapists; ~50 platforms

**Readiness: 5/10** — Platforms have good booking systems. Gap: insurance credential verification for individual therapists, outcome tracking APIs, session scheduling that respects therapeutic relationships (don't just pick the cheapest).

**Agent use case:** "I need a therapist who specializes in anxiety and takes Cigna. I prefer a woman over 35, and I need evening appointments. Find 3 options." Also: "Reschedule my Thursday session to next Monday."

**Top 3 MCP Tools:**
1. `find_therapist` — Search by specialty, insurance, demographics, availability, modality (CBT, EMDR, etc.). Input: criteria. Output: matched therapists with bios + availability.
2. `book_session` — Schedule therapy appointment. Input: patient consent + therapist + time + modality (video/phone/in-person). Output: confirmation.
3. `manage_care` — View upcoming sessions, session notes (patient-facing), homework, progress. Input: patient ID. Output: care summary.

**Revenue for AgentHermes:**
- Therapy platforms pay for patient acquisition (they spend $100-300 per patient)
- Per-session referral: $10-25
- $99-299/mo per platform
- TAM: $75M/yr

**Template difficulty: Hard** — Licensing verification, insurance credentialing, HIPAA, therapeutic matching complexity.

---

### 5d. Dental

**Already covered in VERTICAL-RESEARCH.md (Vertical #9).** Summary: 200K dental offices, readiness 3/10, insurance verification is the killer feature.

---

### 5e. Specialists / Hospitals

**Examples:** Cleveland Clinic, Mayo Clinic, HCA Healthcare, specialty practices (cardiology, orthopedics, dermatology)

**Businesses:** ~6,000 hospitals + ~500,000 specialist practices

**Readiness: 2/10** — Epic/Cerner have FHIR APIs but access requires institutional agreements. Most specialist offices still use fax machines. The gap is enormous.

**Agent use case:** "My cardiologist referred me to a cardiac surgeon. Find one in-network for UnitedHealthcare within 30 miles who has availability in the next 2 weeks. Get me the pre-surgical requirements." Complex care coordination.

**Top 3 MCP Tools:**
1. `find_specialist` — Search by specialty, insurance, location, hospital affiliation, availability. Input: criteria + referral details. Output: matched specialists.
2. `schedule_procedure` — Book appointments with pre-authorization, prior-auth status. Input: patient + provider + procedure code + insurance auth. Output: scheduled date + pre-op instructions.
3. `get_prior_authorization` — Check/submit prior authorization for procedures. Input: insurance + procedure code + clinical notes. Output: auth status + reference number.

**Revenue for AgentHermes:**
- Hospitals pay $1,000-5,000/mo for verified listings that drive patient volume
- Per-referral fees: $50-200
- TAM: $200M/yr (hospitals spend $10B+ on marketing)

**Template difficulty: Very Hard** — FHIR integration, prior auth complexity, credentialing, institutional agreements.

---

### 5f. Health & Wellness

**Examples:** Mindbody, ClassPass, Planet Fitness, Peloton, Noom, WW

**Businesses:** ~200,000 fitness/wellness businesses

**Readiness: 5/10** — Mindbody has an API. ClassPass has integrations. Most independent studios use Mindbody or similar. Gap: unified search across platforms, agent booking.

**Agent use case:** "Book me a yoga class tomorrow morning near downtown. If my favorite studio is full, find another Vinyasa class within 2 miles. Use my ClassPass credits first." Fitness scheduling optimization.

**Top 3 MCP Tools:**
1. `search_classes` — Find fitness/wellness classes by type, time, location, instructor. Input: criteria. Output: class list with availability.
2. `book_class` — Reserve spot in class. Input: class ID + member ID. Output: confirmation.
3. `manage_membership` — View/modify gym/studio memberships, credits, freezes. Input: member ID + operation. Output: membership status.

**Revenue for AgentHermes:**
- $29-99/mo per studio/gym listing
- ClassPass/Mindbody partnership for agent-driven bookings
- TAM: $50M/yr

**Template difficulty: Easy** — Mindbody API covers most studios. One integration = thousands of businesses.

---

### 5g. Medical Devices / Wearables

**Examples:** Apple Health, Fitbit, Dexcom, Oura, Whoop, Abbott (CGMs)

**Businesses:** ~5,000 device manufacturers; ~100M US consumers with health wearables

**Readiness: 6/10** — Apple HealthKit and Google Health Connect provide APIs. Dexcom has APIs. Gap: unified health data aggregation, agent-driven health insights, sharing data with providers.

**Agent use case:** "My blood glucose has been trending up this week. Check if I should adjust my insulin. Share my Dexcom data with my endocrinologist ahead of Thursday's appointment." Health data management + provider coordination.

**Top 3 MCP Tools:**
1. `get_health_data` — Retrieve health metrics (heart rate, glucose, sleep, steps, etc.) from wearables. Input: metric types + date range + source. Output: time series health data.
2. `share_with_provider` — Securely share health data with a healthcare provider. Input: data selection + provider + consent. Output: share confirmation.
3. `get_insights` — AI-generated health insights from wearable data. Input: data + context (medications, conditions). Output: insights + recommendations.

**Revenue for AgentHermes:**
- Device manufacturers pay for agent integration (agents recommend devices)
- $199-499/mo per manufacturer
- TAM: $25M/yr

**Template difficulty: Hard** — HIPAA for health data, device-specific APIs, data normalization across platforms.

---

### 5h. Clinical / Lab Services

**Examples:** Quest Diagnostics, LabCorp, BioReference, independent labs

**Businesses:** ~30,000 clinical labs

**Readiness: 3/10** — Some have patient portals with results APIs. Ordering is still mostly fax-from-provider. Gap: programmatic test ordering, results retrieval, price comparison.

**Agent use case:** "I need a comprehensive metabolic panel. Where's the cheapest lab near me that takes my insurance? Book it for Saturday morning and have results sent to my doctor."

**Top 3 MCP Tools:**
1. `find_lab` — Search labs by test type, insurance, location, price. Input: test codes + insurance + zip. Output: labs with prices + availability.
2. `order_test` — Place lab order (with provider authorization). Input: test codes + patient + provider order. Output: order confirmation + appointment.
3. `get_results` — Retrieve lab results. Input: patient ID + date range. Output: results with reference ranges.

**Revenue for AgentHermes:**
- $99-299/mo per lab listing
- Per-order referral: $5-15
- TAM: $25M/yr

**Template difficulty: Hard** — CLIA regulations, provider ordering requirements, HL7/FHIR for results.

---

## 6. Education

**What "agent-ready" means for education:** Course catalogs as structured data, programmatic enrollment, learning progress APIs, schedule/calendar integration, credential verification, and content delivery APIs (for agents that help students learn).

**Market size:** ~350,000 educational institutions and companies in the US. $1.8T global education market.

**Agent readiness today: 4/10** — EdTech platforms (Coursera, Udemy) are 6-7/10 with APIs. Traditional schools/universities are 2/10 (SIS systems are locked-down enterprise software). Bootcamps and tutoring are 5/10.

---

### 6a. Online Course Platforms

**Examples:** Coursera, Udemy, Skillshare, LinkedIn Learning, Pluralsight, MasterClass, Khan Academy

**Businesses:** ~10,000 online course platforms + ~500K course creators

**Readiness: 6/10** — Affiliate APIs exist (Coursera, Udemy). Course catalogs are accessible. Gap: programmatic enrollment (agents can't sign up a user), learning path recommendations based on goals, progress tracking.

**Agent use case:** "I want to learn Python for data science. Find the best-rated course under $50 that I can complete in 4 weeks. Enroll me and add study blocks to my calendar." Learning concierge.

**Top 3 MCP Tools:**
1. `search_courses` — Find courses by topic, level, duration, price, rating, format. Input: criteria. Output: ranked course list.
2. `enroll` — Register user in a course. Input: course ID + user + payment. Output: enrollment confirmation + first lesson link.
3. `track_progress` — Get completion status, quiz scores, next assignments. Input: enrollment ID. Output: progress summary + recommendations.

**Revenue for AgentHermes:**
- Affiliate commissions: 10-30% per enrollment (standard for course platforms)
- $49-199/mo per platform listing
- TAM: $100M/yr (online education is a $350B market)

**Template difficulty: Easy** — Affiliate APIs cover most functionality. Course catalog schemas are similar.

---

### 6b. Tutoring / Test Prep

**Examples:** Wyzant, Tutor.com, Varsity Tutors, Khan Academy, Kaplan, Princeton Review

**Businesses:** ~20,000 tutoring companies + ~500K independent tutors

**Readiness: 4/10** — Platforms have booking systems. Independent tutors are analog. Gap: tutor matching based on student needs, real-time scheduling, session outcome tracking.

**Agent use case:** "My daughter is struggling with AP Chemistry. Find a tutor who's available Thursday evenings, has experience with AP exam prep, and charges under $60/hour. Book a trial session."

**Top 3 MCP Tools:**
1. `find_tutor` — Match tutors by subject, level, availability, price, teaching style. Input: student needs + constraints. Output: ranked tutor list.
2. `book_session` — Schedule tutoring session. Input: tutor + student + time + topic. Output: session confirmation + meeting link.
3. `track_learning` — View session history, tutor notes, progress metrics. Input: student ID. Output: learning summary.

**Revenue for AgentHermes:**
- Per-session referral: $5-15
- Platform listing: $49-149/mo
- TAM: $50M/yr

**Template difficulty: Medium** — Matching algorithm complexity, schedule management, session platform integration.

---

### 6c. K-12 Schools

**Examples:** 130,000 K-12 schools in the US; PowerSchool, Infinite Campus, Blackbaud (SIS platforms)

**Readiness: 2/10** — Student Information Systems have APIs but they're locked behind district IT. Parent portals are web-only. Communication goes through apps like Remind, ClassDojo.

**Agent use case:** Parent's agent: "Check if my kids have any missing assignments. What's the lunch menu this week? Is school closed for any weather days?" Administrative query + communication.

**Top 3 MCP Tools:**
1. `get_student_info` — Grades, attendance, assignments, schedule (parent-authorized). Input: parent auth + student. Output: academic summary.
2. `communicate_with_school` — Send messages to teachers, request meetings, submit forms. Input: recipient + message + type. Output: delivery confirmation.
3. `get_calendar` — School events, holidays, deadlines, sports schedules. Input: school + date range. Output: calendar events.

**Revenue for AgentHermes:**
- School SIS platforms pay for agent integration
- $99-299/mo per SIS vendor
- TAM: $25M/yr (small but growing as parent portals evolve)

**Template difficulty: Hard** — Fragmented SIS landscape, FERPA compliance, district-level access controls.

---

### 6d. Higher Education

**Examples:** 4,000+ colleges/universities; Canvas, Blackboard, D2L (LMS platforms)

**Readiness: 3/10** — LMS platforms have LTI and APIs. Admissions is still largely manual. Financial aid is a maze. Gap: programmatic application submission, financial aid comparison, course registration.

**Agent use case:** "I'm applying to 8 colleges. Manage my Common App. Track all deadlines. Compare financial aid packages when offers come in. Register me for classes once I commit." College application + enrollment management.

**Top 3 MCP Tools:**
1. `search_programs` — Find programs by field, location, cost, acceptance rate, outcomes. Input: criteria. Output: program list with data.
2. `manage_application` — Track application status, deadlines, required documents. Input: applicant + schools. Output: application dashboard.
3. `compare_financial_aid` — Side-by-side financial aid package comparison. Input: offer details. Output: net cost comparison + loan analysis.

**Revenue for AgentHermes:**
- Universities pay $500-2,000/mo for agent-discoverable program listings
- Per-application referral: $25-100
- TAM: $100M/yr

**Template difficulty: Very Hard** — Common App integration, financial aid complexity, accreditation data, outcomes reporting.

---

### 6e. Corporate Training / L&D

**Examples:** Udemy Business, LinkedIn Learning, Cornerstone, Degreed, 360Learning

**Businesses:** ~5,000 corporate training vendors; ~200K companies with L&D budgets

**Readiness: 6/10** — Enterprise training platforms have APIs for content delivery, completion tracking, and reporting. Gap: agent-driven skill gap analysis, personalized learning paths, compliance training automation.

**Agent use case:** Company's agent: "New OSHA regulations dropped. Identify which employees need updated training. Assign the right courses. Track completion. Report to compliance." Automated compliance + skill development.

**Top 3 MCP Tools:**
1. `assess_skills` — Evaluate employee skill levels against role requirements. Input: employee + role + competency framework. Output: skill gaps + recommended learning.
2. `assign_training` — Enroll employees in courses with deadlines. Input: employees + courses + deadline. Output: assignment confirmation.
3. `compliance_report` — Generate compliance training status for audit. Input: regulation + date range. Output: completion report + exceptions.

**Revenue for AgentHermes:**
- $199-499/mo per platform vendor
- TAM: $50M/yr

**Template difficulty: Medium** — Enterprise APIs are well-structured. SCORM/xAPI standards help.

---

### 6f. Bootcamps / Certification

**Examples:** General Assembly, Flatiron, Lambda, Codecademy, Google Certs, AWS Certs, CompTIA

**Businesses:** ~2,000 bootcamps + ~10,000 certification bodies

**Readiness: 5/10** — Some have APIs (Credly for credentials). Most bootcamps are web-form-only for enrollment. Gap: outcome data APIs (job placement rates, salary data), credential verification.

**Agent use case:** "I want to switch to data engineering. What bootcamp has the best job placement rate? What certifications should I get? Enroll me in the fastest path to employment."

**Top 3 MCP Tools:**
1. `search_programs` — Find bootcamps/certs by skill, duration, cost, outcomes. Input: career goal + constraints. Output: ranked programs with outcome data.
2. `verify_credential` — Verify a certification or bootcamp completion. Input: credential ID + issuer. Output: verification status + details.
3. `enroll` — Sign up for bootcamp or certification exam. Input: program + user + payment. Output: enrollment + start date.

**Revenue for AgentHermes:**
- Bootcamps pay $100-500 per enrolled student (they charge $10-20K)
- $149-399/mo per program listing
- TAM: $50M/yr

**Template difficulty: Medium** — Enrollment is simple. Outcome data is the hard (and valuable) part.

---

## 7. Real Estate / Property

**What "agent-ready" means for real estate:** MLS data access, programmatic property search, virtual tour APIs, mortgage pre-approval integration, offer submission workflows, property management APIs, and maintenance request automation.

**Market size:** ~600,000 real estate businesses in the US. $2.5T annual US real estate transactions.

**Agent readiness today: 5/10** — MLS systems are modernizing (RESO Web API standard). Zillow/Redfin have APIs. Property management software has APIs. Gap: offer submission, document signing, closing coordination.

---

### 7a. Residential Sales (Agents/Brokerages)

**Already partially covered in VERTICAL-RESEARCH.md (Vertical #8).** Expanding here.

**Businesses:** ~1.5M licensed real estate agents; ~100,000 brokerages

**Readiness: 5/10** — MLS has RESO Web API. Zillow/Realtor.com have listing APIs. Gap: agent-submitted offers (still requires human agent), showing scheduling across multiple listings.

**Agent use case:** "Search for 3-bedroom homes in 78704 under $600K with a yard. Schedule tours for this weekend. After tours, prepare an offer on my favorite." Full home-buying assistant.

**Top 3 MCP Tools:**
1. `search_listings` — Property search with filters (beds, baths, price, sqft, features, school district). Input: criteria. Output: listings with photos, details, days on market.
2. `schedule_showing` — Book property tour. Input: listing ID + preferred times + buyer agent info. Output: confirmed showing time.
3. `prepare_offer` — Draft purchase offer with terms. Input: listing + price + contingencies + financing. Output: offer summary for review.

**Revenue for AgentHermes:**
- Real estate agents pay $99-499/mo for agent-discoverable listings
- Brokerage partnerships: $500-2,000/mo
- Per-lead referral: $50-200
- TAM: $300M/yr (real estate marketing is a $15B industry)

**Template difficulty: Hard** — MLS access requires agreements, local market nuances, regulatory compliance (Fair Housing).

---

### 7b. Property Management

**Examples:** AppFolio, Buildium, RentManager, Propertyware, Yardi

**Businesses:** ~300,000 property management companies

**Readiness: 5/10** — PM software has APIs for rent collection, maintenance, and tenant screening. Gap: agent-initiated lease applications, automated maintenance dispatching, rent negotiation.

**Agent use case:** Tenant: "My dishwasher is broken. Submit a maintenance request, schedule the repair for when I'm home, and follow up if it's not fixed within 48 hours." Landlord: "Find me a tenant for my vacant unit. Screen applicants. Draft the lease."

**Top 3 MCP Tools:**
1. `submit_maintenance` — File maintenance request with photos, description, urgency. Input: unit + issue + photos + availability. Output: work order number + ETA.
2. `search_rentals` — Find available rental units by criteria. Input: location + beds + price + amenities. Output: available units.
3. `apply_for_lease` — Submit rental application. Input: applicant info + income + references. Output: application status.

**Revenue for AgentHermes:**
- PM companies pay $99-299/mo per property portfolio
- Tenant lead referral: $25-75
- TAM: $75M/yr

**Template difficulty: Medium** — PM software APIs are decent. Maintenance dispatch is the complex part.

---

### 7c. Mortgage / Home Lending

**Covered in 4c (Financial Services > Lending/Mortgage).** Cross-reference there.

---

### 7d. Home Services (Post-Purchase)

**Covered extensively in VERTICAL-RESEARCH.md** (HVAC, Plumbing, Roofing, Cleaning, Lawn Care). Cross-reference there.

---

### 7e. Commercial Real Estate

**Examples:** CBRE, JLL, Cushman & Wakefield, LoopNet, CoStar

**Businesses:** ~50,000 CRE firms

**Readiness: 4/10** — CoStar/LoopNet have data APIs. Gap: programmatic lease negotiation, space planning, commercial mortgage application.

**Agent use case:** "I need 2,500 sqft of office space in downtown Denver for a 3-year lease. Under $35/sqft. Good transit access. Find 5 options and schedule tours." Commercial space procurement.

**Top 3 MCP Tools:**
1. `search_commercial` — Find commercial properties by type (office, retail, industrial, warehouse), location, size, price. Input: criteria. Output: listings with details.
2. `request_proposal` — Submit RFP for space with specific requirements. Input: space needs + timeline + terms. Output: proposals from landlords.
3. `analyze_lease` — Compare lease terms, calculate total cost including CAM, TI allowance, escalation. Input: lease terms. Output: TCO analysis.

**Revenue for AgentHermes:**
- CRE firms pay $499-2,999/mo (high-value transactions)
- Per-deal referral: $500-5,000
- TAM: $100M/yr

**Template difficulty: Hard** — Complex lease structures, market data access, CAM/TI calculations.

---

### 7f. Construction / Renovation

**Examples:** Procore, Buildertrend, CoConstruct, Houzz, Thumbtack (for contractors)

**Businesses:** ~700,000 construction companies

**Readiness: 3/10** — Procore has good APIs (project-level). Most contractors are phone/email only. Gap: programmatic bidding, project tracking, permit status.

**Agent use case:** "I want to renovate my kitchen. Budget: $40K. Find 3 contractors with good reviews who've done similar projects in my area. Get bids. Compare them." Renovation project management.

**Top 3 MCP Tools:**
1. `get_bids` — Request bids from contractors for a project. Input: project description + scope + budget + timeline. Output: bids with details.
2. `track_project` — Monitor construction project progress, milestones, budget. Input: project ID. Output: progress report + budget status.
3. `check_permits` — Look up permit requirements and status. Input: project type + location. Output: required permits + application status.

**Revenue for AgentHermes:**
- Per-bid referral: $25-100
- Contractor listing: $49-199/mo
- TAM: $75M/yr

**Template difficulty: Medium** — Bidding is straightforward. Project tracking is complex. Permit lookup varies by municipality.

---

## 8. Travel / Hospitality

**What "agent-ready" means for travel:** Real-time inventory/availability APIs, dynamic pricing feeds, booking/cancellation APIs, loyalty program integration, and multi-modal trip planning (flight + hotel + car + activities).

**Market size:** ~750,000 travel/hospitality businesses in the US. $1.1T US travel industry.

**Agent readiness today: 6/10** — Travel is one of the MOST agent-ready industries because aggregators (Booking.com, Expedia) and GDS systems (Amadeus, Sabre) have had APIs for decades. Gap: independent properties without API access, experience/activity booking.

---

### 8a. Hotels / Lodging

**Examples:** Marriott, Hilton, IHG (chains); Airbnb, Vrbo (STR); Booking.com, Expedia (OTAs)

**Businesses:** ~55,000 hotels + ~1.5M short-term rental listings in US

**Readiness: 7/10** — Hotel chains have direct booking APIs. OTAs have affiliate APIs. Channel managers (Guesty, Hostaway) provide unified APIs. Gap: independent hotels without channel manager, loyalty program cross-platform management.

**Agent use case:** "Book me a hotel in Tokyo for March 15-20. King bed, near Shibuya station, under $200/night. Use my Marriott points if it's a Marriott property, otherwise find the best rate across all platforms."

**Top 3 MCP Tools:**
1. `search_availability` — Find rooms by location, dates, preferences, price. Input: destination + dates + filters. Output: available properties with rates.
2. `book_room` — Reserve room with guest details. Input: property + room type + dates + guest + payment. Output: confirmation number.
3. `manage_reservation` — Modify, cancel, or check on booking. Input: confirmation number + operation. Output: updated reservation.

**Revenue for AgentHermes:**
- Hotel booking referral: $10-50 per booking (6-15% commission)
- $199-499/mo for direct hotel listing
- TAM: $200M/yr (travel affiliate is a mature, large market)

**Template difficulty: Medium** — GDS/OTA APIs are complex but well-documented. Channel manager integration is the shortcut.

---

### 8b. Airlines / Flights

**Examples:** United, Delta, American, Southwest (carriers); Google Flights, Kayak, Skyscanner (aggregators); Amadeus, Sabre (GDS)

**Businesses:** ~60 US airlines + ~1,000 globally

**Readiness: 7/10** — GDS systems have had booking APIs for 40+ years. NDC (New Distribution Capability) is modernizing direct booking. Gap: agent-managed rebooking during disruptions, cross-airline loyalty optimization.

**Agent use case:** "My flight to Denver got cancelled. Find me the next available flight on any airline. Keep me in a window seat. If nothing today, book a hotel near the airport and the first flight tomorrow. File a delay claim with the airline."

**Top 3 MCP Tools:**
1. `search_flights` — Find flights by route, dates, preferences (seat, class, airline, stops). Input: origin + destination + dates + preferences. Output: flight options.
2. `book_flight` — Reserve seats with passenger details. Input: flight + passengers + payment + seat preferences. Output: PNR confirmation.
3. `manage_booking` — Change, cancel, check-in, select seats, add bags. Input: PNR + operation. Output: updated booking.

**Revenue for AgentHermes:**
- Flight booking referral: $5-30 per booking
- Airline partnership: $1,000-5,000/mo for direct integration
- TAM: $150M/yr

**Template difficulty: Hard** — GDS integration is complex. NDC is in transition. Fare rules are byzantine.

---

### 8c. Car Rental

**Examples:** Enterprise, Hertz, Avis, National, Sixt, Turo (P2P)

**Businesses:** ~20,000 car rental locations in US

**Readiness: 6/10** — Major chains have booking APIs. Turo has a platform API. Gap: unified cross-company search, real-time availability at specific locations, damage claim management.

**Agent use case:** "Rent me a midsize SUV in Denver airport for next week. Prepay option. Skip the insurance if my credit card covers it. Return it at the downtown location."

**Top 3 MCP Tools:**
1. `search_cars` — Find available cars by location, dates, vehicle class, features. Input: pickup/dropoff locations + dates + preferences. Output: available vehicles with rates.
2. `book_rental` — Reserve vehicle. Input: vehicle + dates + driver details + insurance opt. Output: reservation number.
3. `manage_rental` — Extend, modify, or start return process. Input: reservation + operation. Output: updated rental status.

**Revenue for AgentHermes:**
- Per-booking referral: $10-25
- $99-299/mo per rental company listing
- TAM: $50M/yr

**Template difficulty: Easy** — APIs are relatively standardized across major providers.

---

### 8d. Tours / Experiences / Activities

**Examples:** Viator, GetYourGuide, Airbnb Experiences, Klook, Peek, FareHarbor

**Businesses:** ~100,000 tour operators in US

**Readiness: 5/10** — Viator/GetYourGuide have affiliate APIs. FareHarbor/Peek power independent operators. Gap: unified multi-platform search, real-time availability for small operators, weather-contingent booking.

**Agent use case:** "I'm in Barcelona for 3 days. Plan activities: Sagrada Familia tour, tapas cooking class, day trip to Montserrat. Book everything. If weather is bad on day 3, swap the outdoor activity."

**Top 3 MCP Tools:**
1. `search_activities` — Find tours/experiences by location, type, date, duration, price, rating. Input: criteria. Output: activity list.
2. `book_activity` — Reserve spots in tour/experience. Input: activity + date + participants + payment. Output: booking confirmation + meeting point.
3. `check_conditions` — Weather/crowd/availability check for outdoor activities. Input: activity + date. Output: conditions + recommendation (go/reschedule).

**Revenue for AgentHermes:**
- Activity booking affiliate: 10-20% commission
- Tour operator listing: $49-149/mo
- TAM: $100M/yr

**Template difficulty: Medium** — Aggregator APIs are good. Independent operator integration is the challenge.

---

### 8e. Restaurants / Dining (Travel Context)

**Already covered in VERTICAL-RESEARCH.md (Vertical #10).** In travel context, agents need: reservation across OpenTable/Resy/Yelp, dietary filtering, cuisine recommendations, wait time estimation.

---

### 8f. Travel Insurance

**Examples:** Allianz, World Nomads, Travelex, Squaremouth

**Readiness: 5/10** — Aggregators like Squaremouth have APIs. Individual carriers less so.

**Agent use case:** "I just booked a $5,000 trip. Get me travel insurance quotes. Cover medical, trip cancellation, and baggage. Best price for a family of 4."

**Top 3 MCP Tools:**
1. `get_travel_insurance_quote` — Quote based on trip details, travelers, coverage needs. Input: trip + travelers + coverage. Output: quotes.
2. `purchase_policy` — Buy travel insurance policy. Input: quote ID + payment. Output: policy number + documents.
3. `file_claim` — Submit travel insurance claim. Input: policy + incident details + documentation. Output: claim number + status.

**Revenue for AgentHermes:**
- Insurance commission: 15-30% per policy
- TAM: $25M/yr

**Template difficulty: Easy** — Aggregator APIs handle the complexity.

---

### 8g. Ground Transportation

**Examples:** Uber, Lyft, Blacklane, SuperShuttle, local taxi companies, charter buses

**Readiness: 7/10** — Uber/Lyft have business APIs. Blacklane has booking API. Gap: unified cross-platform ride comparison, scheduled airport transfers.

**Agent use case:** "Get me from JFK to my hotel in Manhattan when I land at 6 PM. Compare Uber, Lyft, and a car service. Book the best option. If my flight is delayed, automatically reschedule."

**Top 3 MCP Tools:**
1. `get_ride_estimates` — Price + ETA across providers. Input: pickup + dropoff + time. Output: provider options with prices.
2. `book_ride` — Reserve ride. Input: provider + route + time + preferences. Output: confirmation.
3. `track_ride` — Real-time ride status. Input: ride ID. Output: driver location + ETA.

**Revenue for AgentHermes:**
- Per-ride referral: $1-5
- TAM: $25M/yr

**Template difficulty: Easy** — Uber/Lyft APIs are well-documented. Aggregation is straightforward.

---

## 9. Media / Entertainment

**What "agent-ready" means for media:** Event discovery APIs, ticketing APIs, streaming service APIs, content recommendation engines, subscription management, and creator platform APIs.

**Market size:** ~300,000 media/entertainment businesses in the US. $750B US media & entertainment market.

**Agent readiness today: 5.5/10** — Ticketing (Ticketmaster API) and streaming (Spotify API) are fairly mature. Live events and local entertainment are analog. Creator economy platforms are emerging.

---

### 9a. Live Events / Ticketing

**Examples:** Ticketmaster, StubHub, SeatGeek, Eventbrite, AXS, Dice

**Businesses:** ~5,000 ticketing platforms + ~50,000 venues + ~100,000 event organizers

**Readiness: 6/10** — Ticketmaster has Discovery + Commerce APIs. Eventbrite has excellent APIs. SeatGeek has APIs. Gap: unified cross-platform inventory, dynamic pricing transparency, resale market integration.

**Agent use case:** "Find me 2 tickets to see Radiohead in LA this summer. Floor seats preferred. Under $300 each. Check both primary and resale. If nothing good, alert me when prices drop."

**Top 3 MCP Tools:**
1. `search_events` — Find events by artist/team/genre, location, date range, price. Input: criteria. Output: events with venue, dates, price range.
2. `find_tickets` — Search available tickets with seat preferences. Input: event ID + quantity + section/price preferences. Output: available tickets.
3. `purchase_tickets` — Buy tickets. Input: ticket selection + buyer info + payment. Output: confirmation + digital tickets.

**Revenue for AgentHermes:**
- Ticket affiliate commission: 5-15% per sale
- Venue listing: $99-499/mo
- TAM: $100M/yr (ticketing is a $30B+ market)

**Template difficulty: Medium** — Major platform APIs exist. Challenge is aggregating across platforms.

---

### 9b. Streaming Services

**Examples:** Netflix, Spotify, Disney+, YouTube, Apple Music, HBO Max, Hulu

**Businesses:** ~100 major streaming platforms

**Readiness: 7/10** — Spotify has excellent public API. Netflix has no public API. YouTube Data API is good. Gap: cross-platform content search ("is this movie on any of my subscriptions?"), subscription optimization ("which services should I keep?").

**Agent use case:** "Find where I can watch 'Succession'. Check if it's included in any of my subscriptions. If not, which service has the best free trial? Also, what should I watch next based on my history?"

**Top 3 MCP Tools:**
1. `search_content` — Find movies/shows/music across all platforms. Input: title/genre/mood/actor. Output: availability by platform.
2. `optimize_subscriptions` — Analyze usage across platforms and recommend which to keep/cancel. Input: subscription list + viewing history. Output: recommendations + savings.
3. `create_playlist` — Build playlists or watchlists across platforms. Input: criteria/mood/genre. Output: curated list.

**Revenue for AgentHermes:**
- Streaming services pay for agent-recommended status
- Subscription affiliate: $5-15 per new subscriber
- TAM: $50M/yr

**Template difficulty: Hard** — Most streaming services don't have public APIs. Content matching across platforms is complex.

---

### 9c. Gaming

**Examples:** Steam, Epic Games, Xbox Game Pass, PlayStation, Nintendo, Roblox

**Businesses:** ~5,000 game publishers/studios + ~3 major platforms

**Readiness: 5/10** — Steam has a web API. Xbox/PlayStation have limited APIs. Gap: cross-platform game discovery, price tracking, friend/social management.

**Agent use case:** "Find the best co-op games on PC under $30. Check if any of my wishlist games are on sale. Buy Elden Ring DLC if it drops below $20."

**Top 3 MCP Tools:**
1. `search_games` — Find games by genre, platform, price, rating, features. Input: criteria. Output: games with pricing across stores.
2. `track_prices` — Monitor game prices and alert on sales. Input: game + price threshold. Output: alert setup.
3. `manage_library` — Cross-platform game library management. Input: operation. Output: library status.

**Revenue for AgentHermes:**
- Game store affiliate: 5-10% per sale
- TAM: $25M/yr

**Template difficulty: Medium** — Steam API is decent. Console APIs are locked down.

---

### 9d. Creator Economy

**Examples:** YouTube, TikTok, Patreon, Substack, Gumroad, Ko-fi, OnlyFans

**Businesses:** ~50M creators globally; ~2M making >$1K/month

**Readiness: 5/10** — YouTube/Patreon have APIs. TikTok has limited API. Gap: cross-platform audience management, content scheduling, monetization optimization, sponsor matching.

**Agent use case:** Creator's agent: "Schedule my video for 3 PM EST. Cross-post to TikTok and Instagram. Send Patreon subscribers early access. Track performance and adjust tomorrow's post timing based on engagement."

**Top 3 MCP Tools:**
1. `schedule_content` — Post/schedule content across platforms. Input: content + platforms + timing. Output: scheduled post IDs.
2. `get_analytics` — Cross-platform performance metrics. Input: platform + date range. Output: views, engagement, revenue.
3. `manage_community` — Patreon tiers, subscriber messages, engagement responses. Input: operation. Output: community status.

**Revenue for AgentHermes:**
- Creator tool listing: $29-99/mo
- Per-creator agent subscription: $9.99/mo
- TAM: $50M/yr

**Template difficulty: Medium** — Each platform API is different. Cross-posting and analytics aggregation are the value.

---

### 9e. News / Publishing

**Examples:** NYT, Washington Post, Reuters, Substack, Medium, Ghost

**Businesses:** ~30,000 publishers + ~500K independent journalists/bloggers

**Readiness: 5/10** — Some publishers have content APIs. RSS exists universally. Gap: paywalled content access (agents can't read articles behind paywalls), subscription management, personalized briefings.

**Agent use case:** "Give me a 5-minute briefing on what happened in AI today. Pull from my subscriptions to NYT, The Information, and Hacker News. Highlight anything relevant to my industry."

**Top 3 MCP Tools:**
1. `get_briefing` — Personalized news summary from subscribed sources. Input: topics + sources + length. Output: briefing with links.
2. `manage_subscriptions` — Subscribe, cancel, bundle news subscriptions. Input: operation + publication. Output: subscription status.
3. `search_archives` — Search published content by topic, date, author. Input: query + filters. Output: articles with summaries.

**Revenue for AgentHermes:**
- Publisher subscription referral: $5-20 per new subscriber
- News aggregation tool listing: $49-199/mo
- TAM: $25M/yr

**Template difficulty: Medium** — RSS is universal. Paywall integration is the challenge.

---

### 9f. Sports / Fitness Entertainment

**Examples:** ESPN, NFL/NBA/MLB (leagues), DraftKings, FanDuel, Peloton, Strava

**Businesses:** ~10,000 sports organizations + ~2,000 sports tech companies

**Readiness: 5/10** — Sports data APIs (ESPN, Stats Perform) are mature. Betting APIs are emerging. Fitness platforms have APIs. Gap: unified fantasy/betting across platforms, game-day experience integration.

**Agent use case:** "Set my fantasy football lineup based on this week's projections. Alert me if any of my starters are listed as questionable. Find me 2 tickets to the Sunday game if my team wins today."

**Top 3 MCP Tools:**
1. `get_scores_and_stats` — Live scores, stats, standings, schedules. Input: sport + league + team/player. Output: data.
2. `manage_fantasy` — Optimize fantasy lineups, make trades, waiver claims. Input: platform + league + operation. Output: lineup/trade status.
3. `find_game_tickets` — Event-aware ticket search. Input: team + game + preferences. Output: available tickets.

**Revenue for AgentHermes:**
- Sports data providers: $199-499/mo
- Fantasy platform integration: $99-299/mo
- TAM: $25M/yr

**Template difficulty: Medium** — Good data APIs. Platform fragmentation is the challenge.

---

## 10. Logistics / Supply Chain

**What "agent-ready" means for logistics:** Real-time tracking APIs, programmatic shipping label creation, warehouse management APIs, freight quoting, customs documentation automation, and delivery scheduling.

**Market size:** ~200,000 logistics companies in the US. $1.8T US logistics market.

**Agent readiness today: 5/10** — Shipping APIs (ShipStation, EasyPost, ShipBob) are mature. Freight is modernizing (Flexport, Freightos). Last-mile is good (UPS/FedEx APIs). Gap: customs automation, warehouse-to-warehouse optimization, cold chain monitoring.

---

### 10a. Parcel Shipping

**Examples:** UPS, FedEx, USPS, DHL; ShipStation, EasyPost, Shippo, Pirate Ship (aggregators)

**Businesses:** ~100,000 businesses ship regularly; 4 major carriers

**Readiness: 8/10** — Carrier APIs are mature. Aggregators like EasyPost provide unified APIs. This is one of the most API-ready logistics segments.

**Agent use case:** "Ship this 5-lb package to Portland. Compare UPS Ground, FedEx Home, and USPS Priority. Cheapest option with tracking. Print label." E-commerce fulfillment automation.

**Top 3 MCP Tools:**
1. `get_shipping_rates` — Compare rates across carriers for a shipment. Input: origin + destination + weight + dimensions + speed. Output: rates by carrier.
2. `create_shipment` — Generate label and schedule pickup. Input: shipment details + carrier + service. Output: label PDF + tracking number.
3. `track_package` — Real-time tracking across carriers. Input: tracking number. Output: status + location + ETA.

**Revenue for AgentHermes:**
- Shipping aggregator listing: $99-299/mo
- Per-label referral: $0.10-0.50
- TAM: $50M/yr

**Template difficulty: Easy** — Aggregator APIs are excellent. Unified schema is straightforward.

---

### 10b. Freight / Trucking

**Examples:** Flexport, Freightos, Convoy (RIP), C.H. Robinson, XPO, Echo Global Logistics

**Businesses:** ~70,000 trucking companies + ~15,000 freight brokers

**Readiness: 4/10** — Flexport/Freightos are API-first. Traditional freight brokers still use phone/email. Gap: real-time spot rate APIs, load matching, detention tracking.

**Agent use case:** "I need to ship a full truckload of furniture from Dallas to Chicago by Friday. Get spot rates from 5 carriers. Book the cheapest with a clean safety record." Also: "Track my 3 open shipments and alert me if any are behind schedule."

**Top 3 MCP Tools:**
1. `get_freight_quote` — Get LTL/FTL quotes with transit times. Input: origin + destination + freight details (weight, class, dims). Output: carrier quotes.
2. `book_load` — Book freight with carrier. Input: quote + pickup/delivery details. Output: BOL + tracking.
3. `track_freight` — Real-time freight tracking with ETA. Input: BOL or tracking number. Output: location + status + ETA.

**Revenue for AgentHermes:**
- Digital freight broker listing: $299-999/mo
- Per-shipment referral: $10-50
- TAM: $50M/yr

**Template difficulty: Medium** — Digital brokers have APIs. Traditional brokers need more work.

---

### 10c. Warehousing / 3PL

**Examples:** ShipBob, Deliverr (now Shopify), Red Stag, ShipMonk, Fulfillment by Amazon (FBA)

**Businesses:** ~20,000 warehouses + ~5,000 3PLs

**Readiness: 6/10** — Modern 3PLs like ShipBob have excellent APIs. FBA has SP-API. Gap: cross-warehouse inventory optimization, demand-based distribution.

**Agent use case:** "I'm launching a new product. Distribute 5,000 units across 3 warehouses to optimize for 2-day shipping coverage of the continental US. Monitor inventory and trigger restock at 500 units."

**Top 3 MCP Tools:**
1. `check_inventory` — Real-time inventory levels across warehouses. Input: SKU + warehouse. Output: quantities + locations.
2. `create_inbound_shipment` — Send inventory to warehouse. Input: SKUs + quantities + origin + destination warehouse. Output: shipment plan + labels.
3. `distribute_inventory` — Optimize stock placement across warehouses. Input: SKUs + demand data + warehouse network. Output: distribution plan.

**Revenue for AgentHermes:**
- 3PL listing: $199-499/mo
- Per-order fulfillment referral: $0.25-1.00
- TAM: $30M/yr

**Template difficulty: Medium** — Modern 3PL APIs are good. Legacy WMS systems need adapters.

---

### 10d. Last-Mile Delivery

**Examples:** DoorDash Drive, Uber Direct, GoShare, Roadie, Lalamove, Amazon DSP

**Businesses:** ~10,000 last-mile providers

**Readiness: 6/10** — DoorDash Drive and Uber Direct have APIs for businesses to embed delivery. Gap: cross-platform delivery optimization, real-time driver tracking, delivery scheduling.

**Agent use case:** "I need same-day delivery for a customer order. Compare DoorDash Drive, Uber Direct, and a local courier. Book the fastest option. Give the customer real-time tracking."

**Top 3 MCP Tools:**
1. `get_delivery_quotes` — Compare last-mile providers by speed, price, coverage. Input: pickup + dropoff + package details. Output: provider options.
2. `create_delivery` — Book delivery with driver assignment. Input: provider + route + details. Output: delivery ID + tracking link.
3. `track_delivery` — Real-time driver location and ETA. Input: delivery ID. Output: status + location + ETA.

**Revenue for AgentHermes:**
- Per-delivery referral: $0.50-2.00
- Provider listing: $99-299/mo
- TAM: $25M/yr

**Template difficulty: Easy** — APIs are modern and well-documented.

---

### 10e. Customs / International Trade

**Examples:** Flexport, Descartes, Amber Road, KlearNow, customs brokers

**Businesses:** ~12,000 customs brokers + ~50,000 importers/exporters

**Readiness: 3/10** — Mostly manual. KlearNow is digitizing. Gap: programmatic customs filing, duty calculation, compliance checking, document generation.

**Agent use case:** "I'm importing 500 units of [product] from China. Calculate duties and taxes. Generate the customs paperwork. File electronically. Alert me if there are any compliance issues."

**Top 3 MCP Tools:**
1. `calculate_duties` — Estimate import duties, taxes, fees. Input: HS code + origin + value + quantity. Output: duty breakdown.
2. `generate_documents` — Create customs forms, commercial invoice, packing list. Input: shipment details. Output: document package.
3. `file_entry` — Submit customs entry electronically. Input: documents + shipment data. Output: entry number + status.

**Revenue for AgentHermes:**
- Customs broker listing: $199-499/mo
- Per-filing referral: $10-50
- TAM: $25M/yr

**Template difficulty: Very Hard** — Tariff codes, country-specific regulations, changing trade policies.

---

## 11. Agriculture / Industrial

**What "agent-ready" means here:** IoT sensor data APIs, supply chain procurement, equipment maintenance scheduling, weather data integration, compliance reporting, and marketplace access for selling products.

**Market size:** ~400,000 agriculture + industrial businesses in the US. $1.3T US agriculture + $2.3T US manufacturing.

**Agent readiness today: 2/10** — The LEAST agent-ready sector. Most operations are analog, relationship-based, and use legacy systems. Precision agriculture (John Deere, Climate Corp) is starting to digitize. Industry 4.0 is pushing manufacturing toward APIs.

---

### 11a. Farming / Agriculture

**Examples:** John Deere (equipment + data), Climate Corp (Bayer), Farmers Business Network, Indigo Agriculture, Granular

**Businesses:** ~2M farms in the US (90% family-owned)

**Readiness: 2/10** — John Deere has APIs for equipment data. Climate Corp has field data APIs. Most farmers use paper records or basic spreadsheets. Gap: everything.

**Agent use case:** "It hasn't rained in 2 weeks. Check soil moisture data from my sensors. Calculate how much irrigation I need for my soybean fields. Order the water and schedule the pivot." Precision farming automation.

**Top 3 MCP Tools:**
1. `get_field_data` — Soil moisture, weather, crop health from sensors/satellite. Input: field ID + date range. Output: agronomic data.
2. `order_inputs` — Order seed, fertilizer, chemicals from suppliers. Input: product + quantity + delivery. Output: order confirmation.
3. `schedule_operation` — Plan and schedule farm operations (planting, spraying, harvesting). Input: operation + field + timing. Output: scheduled operation.

**Revenue for AgentHermes:**
- Ag-tech platform listing: $99-299/mo
- Input supplier referral: $10-50 per order
- TAM: $25M/yr (small but growing with precision ag)

**Template difficulty: Very Hard** — IoT integration, weather data, crop-specific knowledge, regional variation.

---

### 11b. Manufacturing

**Examples:** Siemens, Rockwell, SAP (MES/ERP); Fictiv, Xometry, Protolabs (on-demand manufacturing)

**Businesses:** ~250,000 manufacturers in the US

**Readiness: 3/10 (traditional), 7/10 (on-demand)** — On-demand manufacturing (Xometry, Fictiv) has quoting APIs. Traditional manufacturing uses MES/ERP systems with limited external APIs. Gap: inter-company order management, supply chain visibility.

**Agent use case:** "I need 100 custom CNC-machined aluminum parts. Upload my CAD file. Get instant quotes from 5 manufacturers. Compare lead times and prices. Order from the best." On-demand manufacturing procurement.

**Top 3 MCP Tools:**
1. `get_manufacturing_quote` — Upload specs, get instant pricing. Input: CAD file + material + quantity + finish. Output: price + lead time + DFM feedback.
2. `place_order` — Order custom parts. Input: quote + shipping + payment. Output: order confirmation + timeline.
3. `track_production` — Monitor order through production stages. Input: order ID. Output: production status + inspection reports.

**Revenue for AgentHermes:**
- On-demand mfg platforms: $299-999/mo
- Per-order referral: $25-100
- TAM: $50M/yr

**Template difficulty: Hard** — File formats (STEP, IGES), quoting complexity, quality requirements.

---

### 11c. Mining / Energy

**Examples:** Schlumberger, Halliburton (oil & gas); NextEra, Enphase (renewables); commodity exchanges

**Businesses:** ~10,000 mining/energy companies

**Readiness: 3/10** — Commodity price feeds exist. SCADA systems have data. Gap: programmatic energy procurement, renewable certificate trading, equipment maintenance.

**Agent use case:** "Compare electricity rates from 3 providers for my manufacturing facility. Switch to the cheapest renewable option. Optimize our solar + grid mix for minimum cost."

**Top 3 MCP Tools:**
1. `compare_energy_rates` — Compare utility rates by provider, contract type, green options. Input: usage profile + location. Output: rate comparison.
2. `procure_energy` — Switch providers or negotiate contracts. Input: preferred terms. Output: contract details.
3. `monitor_consumption` — Real-time energy usage and optimization suggestions. Input: facility + date range. Output: usage data + savings opportunities.

**Revenue for AgentHermes:**
- Energy broker listing: $199-499/mo
- TAM: $15M/yr

**Template difficulty: Hard** — Regulated utilities, complex rate structures, regional variation.

---

### 11d. Wholesale / Distribution

**Examples:** Sysco, US Foods (food); Grainger, Fastenal (industrial); HD Supply (construction)

**Businesses:** ~60,000 wholesale distributors

**Readiness: 4/10** — Large distributors have B2B e-commerce with APIs. Small distributors are phone/fax. Gap: real-time inventory, programmatic bulk ordering, credit terms management.

**Agent use case:** "Our warehouse is running low on electrical conduit. Check prices at 3 distributors. Order 500 units from the cheapest with net-30 terms. Schedule delivery for Tuesday."

**Top 3 MCP Tools:**
1. `check_inventory_and_price` — Real-time stock and pricing at distributors. Input: SKU/part number + quantity + distributor(s). Output: availability + pricing.
2. `place_bulk_order` — Order with PO, terms, delivery instructions. Input: items + PO + terms. Output: order confirmation.
3. `manage_account` — Check credit balance, payment history, order history. Input: account ID. Output: account summary.

**Revenue for AgentHermes:**
- Distributor listing: $199-499/mo
- Per-order referral: $5-25
- TAM: $30M/yr

**Template difficulty: Medium** — B2B e-commerce APIs exist at scale. Small distributors need onboarding.

---

### 11e. Construction Materials / Heavy Equipment

**Examples:** Caterpillar, United Rentals, Sunbelt Rentals, HD Supply, 84 Lumber

**Businesses:** ~30,000 equipment rental + ~50,000 material suppliers

**Readiness: 3/10** — United Rentals has some digital tools. Most is phone-based. Gap: equipment availability, rental pricing, delivery scheduling.

**Agent use case:** "I need a 30-ton excavator on-site in Phoenix by Monday. Compare rental rates from United, Sunbelt, and local providers. Book and schedule delivery."

**Top 3 MCP Tools:**
1. `search_equipment` — Find available equipment by type, location, dates. Input: equipment type + location + dates. Output: options with rates.
2. `rent_equipment` — Book equipment rental with delivery. Input: equipment + dates + delivery address. Output: rental confirmation.
3. `order_materials` — Order construction materials with delivery. Input: materials + quantities + site address. Output: order + delivery schedule.

**Revenue for AgentHermes:**
- Equipment rental listing: $149-399/mo
- TAM: $20M/yr

**Template difficulty: Medium** — Equipment taxonomy is manageable. Availability systems vary.

---

## 12. Government / Nonprofit

**What "agent-ready" means here:** Eligibility checking APIs, permit/license application APIs, donation processing, volunteer management, grant application systems, and public records access.

**Market size:** ~90,000 government entities + ~1.5M nonprofits in the US. $4.4T government spending + $500B nonprofit sector.

**Agent readiness today: 2.5/10** — Government is notoriously analog. Some progress: IRS has APIs for tax status, USPS for address verification, many states have online permit systems. Nonprofits use platforms (Every Action, Bloomerang) that have some API access.

**KEY CHALLENGE:** Government is SLOW to change. Procurement processes are Byzantine. But the opportunity is massive because the inefficiency is massive. An agent that can navigate government bureaucracy is worth a fortune to citizens and businesses.

---

### 12a. Permits / Licensing

**Examples:** Local building departments, state licensing boards, SBA, FDA, EPA

**Businesses:** ~90,000 government entities issuing permits

**Readiness: 2/10** — Some cities have online permit portals (Accela, Tyler Technologies). Most require in-person visits or mailed forms. Gap: programmatic application submission, status tracking, requirement lookup.

**Agent use case:** "I'm opening a restaurant in Austin. What permits and licenses do I need? (Business license, food handler, health dept, liquor license, fire inspection, sign permit.) Start the applications for all of them."

**Top 3 MCP Tools:**
1. `check_requirements` — Look up required permits/licenses for a business type in a jurisdiction. Input: business type + location. Output: required permits + fees + processing times.
2. `submit_application` — File permit/license application. Input: permit type + applicant data + documents. Output: application number + status.
3. `check_status` — Track application progress. Input: application number. Output: status + next steps + estimated completion.

**Revenue for AgentHermes:**
- GovTech platform listing: $199-499/mo
- Business owner subscription (agent navigates permits): $29-99/mo
- TAM: $50M/yr (enormous demand, hard to serve)

**Template difficulty: Very Hard** — Every jurisdiction is different. 50 states x 19,000 municipalities = massive fragmentation.

---

### 12b. Tax Filing / IRS

**Examples:** IRS, state tax agencies; TurboTax, H&R Block, TaxAct (software)

**Businesses:** ~50 state tax agencies + IRS; ~100K tax prep businesses

**Readiness: 4/10** — IRS has e-file APIs (MeF). Tax software has user-facing APIs. Gap: agent-driven tax preparation, estimated payment automation, audit response.

**Agent use case:** "Prepare my quarterly estimated tax payment based on this quarter's income. File it. Also, I got a CP2000 notice from the IRS — review it and tell me what I owe and whether to dispute."

**Top 3 MCP Tools:**
1. `prepare_return` — Generate tax return from financial data. Input: income + deductions + credits + entity type. Output: return summary + amount owed/refund.
2. `file_return` — Submit tax return electronically. Input: return data + payment method. Output: filing confirmation + acceptance status.
3. `resolve_notice` — Interpret and respond to IRS/state notices. Input: notice text/image. Output: interpretation + recommended action + draft response.

**Revenue for AgentHermes:**
- Tax software listing: $199-499/mo
- Tax prep firm listing: $49-149/mo
- TAM: $50M/yr

**Template difficulty: Hard** — Tax code complexity, annual changes, state variation.

---

### 12c. Nonprofits / Donations

**Examples:** Every Action, Bloomerang, DonorPerfect, GoFundMe, GiveDirectly, Network for Good

**Businesses:** ~1.5M nonprofits in the US

**Readiness: 4/10** — Donation platforms have APIs. CRM systems (Bloomerang) have some API access. Gap: programmatic donation (agents making donations on behalf of humans), volunteer matching, impact reporting.

**Agent use case:** "I want to donate $500 to a climate charity with at least 85% program efficiency. Find the top 3 rated by Charity Navigator. Split my donation equally. Get tax receipts." Also: "I want to volunteer this Saturday. Find environmental cleanup events near me."

**Top 3 MCP Tools:**
1. `find_charities` — Search nonprofits by cause, rating, location, efficiency. Input: criteria. Output: ranked charities with financials.
2. `make_donation` — Process donation with tax receipt. Input: charity + amount + donor info. Output: receipt + confirmation.
3. `find_volunteer_opportunities` — Search volunteer events by cause, date, location. Input: criteria. Output: opportunities with signup links.

**Revenue for AgentHermes:**
- Nonprofit listing: $29-99/mo (nonprofit pricing)
- Donation platform listing: $99-299/mo
- TAM: $25M/yr

**Template difficulty: Easy** — Donation APIs are simple. Charity data (990 forms) is public.

---

### 12d. Social Services / Benefits

**Examples:** SSA, Medicaid, SNAP, WIC, unemployment offices, housing assistance

**Businesses:** ~50,000 social service agencies

**Readiness: 1/10** — The MOST analog category. Most social services require in-person visits, phone calls, and paper forms. Some states have online portals. Gap: everything.

**Agent use case:** "I just lost my job. What benefits am I eligible for? (Unemployment, SNAP, Medicaid, COBRA, rental assistance.) Help me apply for all of them." Navigating the safety net.

**Top 3 MCP Tools:**
1. `check_eligibility` — Determine eligibility for benefits programs based on circumstances. Input: personal/financial situation. Output: eligible programs + estimated benefits.
2. `start_application` — Begin application process for benefits. Input: program + applicant data. Output: application status + required documents.
3. `track_benefits` — Check application status, benefit amounts, renewal dates. Input: case number. Output: benefit status.

**Revenue for AgentHermes:**
- GovTech companies building portals: $199-499/mo
- Social service navigator subscription: $0 (free for users, sponsored by government contracts)
- TAM: $25M/yr (government contracts, not direct consumer)

**Template difficulty: Very Hard** — State-by-state systems, complex eligibility rules, legacy infrastructure.

---

### 12e. Public Records / Data

**Examples:** County recorder offices, court systems, SEC EDGAR, USPTO, FOIA requests

**Businesses:** ~20,000 government record-keeping entities

**Readiness: 4/10** — Federal databases (EDGAR, USPTO, PACER) have APIs. State/local records are mixed. Gap: unified search across jurisdictions, FOIA automation, record interpretation.

**Agent use case:** "Search for any liens or judgments against this property at 123 Main St, Austin TX. Also check if the seller has any pending lawsuits." Title search + due diligence.

**Top 3 MCP Tools:**
1. `search_records` — Search public records by entity, property, or keyword across jurisdictions. Input: search criteria + record types. Output: matching records.
2. `retrieve_document` — Get a specific public document. Input: record ID + jurisdiction. Output: document content/PDF.
3. `submit_foia` — File a Freedom of Information Act request. Input: agency + request description. Output: request number + estimated response time.

**Revenue for AgentHermes:**
- Legal tech/title company listing: $199-499/mo
- Per-search fee: $1-5
- TAM: $25M/yr

**Template difficulty: Hard** — Jurisdiction fragmentation, varying record formats, access restrictions.

---

## Cross-Category Analysis

### Agent Readiness Heatmap

```
Category                    | Ready Now | 1-2 Years | 3-5 Years | Blocked
----------------------------|-----------|-----------|-----------|--------
Developer Tools / APIs      | ######    |           |           |
SaaS / Software             | #####     | #         |           |
Travel / Hospitality        | ####      | ##        |           |
E-Commerce / Retail         | ###       | ###       |           |
Media / Entertainment       | ###       | ###       |           |
Logistics / Supply Chain    | ###       | ##        | #         |
Financial Services          | ##        | ###       | #         | # (reg)
Real Estate / Property      | ##        | ###       | #         |
Education                   | ##        | ##        | ##        |
Healthcare                  | #         | ##        | ###       | ## (HIPAA)
Government / Nonprofit      | #         | #         | ##        | ### (legacy)
Agriculture / Industrial    | #         | #         | ##        | ## (analog)
```

### Revenue Opportunity Ranking

| Rank | Category | Estimated TAM for AgentHermes | Priority | Why |
|------|----------|-------------------------------|----------|-----|
| 1 | E-Commerce / Retail | $1.5B/yr | P0 | Massive volume, transaction-based revenue, Shopify alone = millions of stores |
| 2 | Financial Services | $1.3B/yr | P0 | Highest willingness to pay, regulated = high barriers = moat |
| 3 | Travel / Hospitality | $600M/yr | P1 | Mature affiliate model, agent-ready infrastructure exists |
| 4 | Healthcare | $500M/yr | P1 | Enormous spend, massive inefficiency, compliance = moat |
| 5 | SaaS / Software | $300M/yr | P1 | High readiness = fast deployment, but many will self-serve |
| 6 | Real Estate / Property | $550M/yr | P1 | High-value transactions, data moat potential |
| 7 | Logistics / Supply Chain | $180M/yr | P2 | B2B, fewer but larger customers |
| 8 | Education | $375M/yr | P2 | Affiliate-friendly, growing market |
| 9 | Media / Entertainment | $275M/yr | P2 | Event/streaming affiliate revenue |
| 10 | Developer Tools / APIs | $300M/yr | P3 | Already agent-ready; less need for AgentHermes |
| 11 | Agriculture / Industrial | $140M/yr | P3 | Long sales cycle, low digitization |
| 12 | Government / Nonprofit | $175M/yr | P3 | Government contracts are slow but large |

**Total combined TAM across all 12 categories: ~$6.2B/yr**

### Template Complexity vs. Market Size Matrix

```
                    EASY TEMPLATE          MEDIUM TEMPLATE         HARD TEMPLATE           VERY HARD
                    (1-2 weeks)           (1 month)               (2-3 months)            (6+ months)

HIGH VOLUME         Shopify Stores        D2C Brands              Amazon Sellers          Banking
(>500K biz)         WooCommerce           Property Mgmt           Insurance               Social Services
                    Parcel Shipping       Hotels/Lodging          Healthcare              Specialists
                    Online Courses        Live Events             Mortgage/Lending         Permits
                                          Car Rental                                       Pharmacies

MEDIUM VOLUME       Email Tools           CRM Platforms           Freight                 Luxury Retail
(50K-500K biz)      Communication APIs    Project Mgmt            Airlines                Higher Ed
                    Last-Mile Delivery    Creator Economy         Analytics/BI            Construction
                    Health & Wellness     Tutoring                HR/Payroll              Farming
                    Travel Insurance      Warehousing             Streaming               Customs
                    Nonprofits            Manufacturing (OD)      Commercial RE

LOW VOLUME          Payment Processing    Auth/Identity           Cloud Infrastructure    Mining/Energy
(<50K biz)          CI/CD Tools           Monitoring              Investment Mgmt
                                          Gaming                  Tax Filing
                                          Wholesale               Public Records
                                          News/Publishing
                                          Equipment Rental
                                          Crypto
```

### The 80/20 — Where to Start

**Phase 1 targets (Easy template + High volume = fastest time to revenue):**
1. **Shopify Stores** — One Shopify adapter = 2M stores instantly agent-ready. Transaction revenue.
2. **WooCommerce Stores** — WordPress plugin = 6M stores. Freemium model.
3. **Online Course Platforms** — Affiliate revenue. Easy catalog APIs.
4. **Parcel Shipping** — EasyPost/Shippo adapter = all carriers. Per-label revenue.

**Phase 2 targets (Medium template + High volume = big market, moderate effort):**
5. **Hotels/Lodging** — Channel manager integration. Travel affiliate revenue.
6. **CRM Platforms** — Business discovery ("find me a CRM"). High LTV.
7. **Property Management** — Tenant/landlord agent use cases. Recurring revenue.
8. **Live Events/Ticketing** — Event discovery. Ticket affiliate revenue.

**Phase 3 targets (Hard template + High value = defensible moat):**
9. **Insurance** — Highest lead values in any industry. Regulation = moat.
10. **Healthcare (Telehealth)** — HIPAA compliance = barrier to entry. Growing market.
11. **Mortgage/Lending** — $300+ per lead. Enormous market.
12. **Amazon/Marketplace Sellers** — Complex but massive. Seller tools market.

---

## MCP Tool Pattern Library — Universal Patterns Across All Verticals

After analyzing 60+ sub-verticals, these MCP tool patterns repeat everywhere:

### Pattern 1: SEARCH / DISCOVER
Every vertical needs a search tool. The schema varies but the pattern is:
```
Input:  { criteria: object, filters: object, sort: string, limit: number }
Output: { results: array, total: number, facets: object }
```
Used in: 60/60 sub-verticals (100%)

### Pattern 2: BOOK / RESERVE / ORDER
Action tool that commits resources:
```
Input:  { item_id: string, customer: object, payment: object, preferences: object }
Output: { confirmation_id: string, status: string, details: object }
```
Used in: 50/60 sub-verticals (83%)

### Pattern 3: CHECK STATUS / TRACK
Follow-up tool:
```
Input:  { reference_id: string }
Output: { status: string, timeline: array, next_steps: string[], eta: datetime }
```
Used in: 45/60 sub-verticals (75%)

### Pattern 4: COMPARE
Decision-support tool:
```
Input:  { options: array, criteria: object }
Output: { comparison: matrix, recommendation: object, reasoning: string }
```
Used in: 40/60 sub-verticals (67%)

### Pattern 5: MANAGE / MODIFY
Ongoing relationship tool:
```
Input:  { resource_id: string, operation: string, data: object }
Output: { updated_resource: object, changes: array }
```
Used in: 45/60 sub-verticals (75%)

### Pattern 6: GET QUOTE / ESTIMATE
Pre-commitment pricing tool:
```
Input:  { service_or_product: object, quantity: number, options: object }
Output: { price: number, breakdown: array, valid_until: datetime, terms: string }
```
Used in: 35/60 sub-verticals (58%)

### Pattern 7: VERIFY / VALIDATE
Trust and compliance tool:
```
Input:  { entity: object, check_type: string }
Output: { valid: boolean, details: object, expiration: datetime }
```
Used in: 25/60 sub-verticals (42%) — concentrated in regulated industries

**Implication for AgentHermes:** Build these 7 patterns as a generic framework. Each vertical customizes the schemas but the tool infrastructure (routing, caching, error handling, rate limiting) is shared. This dramatically reduces per-vertical build cost.

---

## Revenue Model Summary — All Verticals Combined

| Revenue Stream | Applicable Verticals | Price Range | Estimated Year 1 | Estimated Year 3 |
|---------------|---------------------|-------------|-------------------|-------------------|
| **Business listing (monthly)** | All | $29-2,999/mo | $500K | $5M |
| **Transaction referral** | E-commerce, travel, events, logistics | 0.1-5% per transaction | $200K | $10M |
| **Lead referral** | Insurance, mortgage, healthcare, real estate | $10-500 per lead | $300K | $8M |
| **Affiliate commission** | Courses, streaming, SaaS trials | 5-30% per signup | $100K | $3M |
| **Platform partnership** | Vertical SaaS, payment processors | Rev share or $500-5K/mo | $150K | $5M |
| **Agent subscription** | Consumer agents, business agents | $9.99-99/mo per agent | $50K | $2M |
| **Certification badge** | All | $99-499/yr | $50K | $1M |
| **WordPress/Shopify plugin** | E-commerce | $0-19/mo freemium | $100K | $2M |
| **TOTAL** | | | **$1.45M** | **$36M** |

---

## Strategic Implications for AgentHermes

### 1. E-commerce is the beachhead, not local services
Local services (HVAC, plumbing, lawn care) are high-value per lead but LOW volume and HARD to template (every business is different). E-commerce (Shopify, WooCommerce) is HIGH volume, EASY to template, and has built-in payment infrastructure. Start there.

### 2. Regulated industries are the moat
Anyone can build a Shopify adapter. But building HIPAA-compliant healthcare agent access, or SEC-compliant investment agent access, or insurance-regulated agent quoting? That's a multi-year head start that compounds. Invest in regulated verticals in Phase 2-3.

### 3. The 7 tool patterns are the platform
Don't build 60 custom integrations. Build 7 universal tool patterns with per-vertical schema customization. The framework IS the product. Individual vertical adapters are plugins.

### 4. Vertical SaaS partnerships are the distribution channel
ServiceTitan has 10,000 HVAC companies. Toast has 100,000 restaurants. Shopify has 2M stores. One partnership with a vertical SaaS platform = thousands of businesses instantly agent-ready. This is 100x more efficient than onboarding businesses one by one.

### 5. The agent economy has a clear adoption curve
- **2026:** Developer tools + SaaS (already ready)
- **2027:** E-commerce + travel + entertainment (platforms add APIs)
- **2028:** Financial services + healthcare (regulation catches up)
- **2029:** Government + agriculture (infrastructure modernizes)

AgentHermes should ride this curve, not fight it. Build for what's ready NOW (e-commerce, SaaS), prepare for what's coming NEXT (financial, healthcare), and position for the FUTURE (government, agriculture).

### 6. Total addressable market across all verticals: ~$6.2B/yr
That's not total market revenue — that's what AgentHermes could capture through listings, referrals, transactions, and partnerships across all 12 macro-categories and 60+ sub-verticals. Even capturing 0.1% in Year 1 = $6.2M.

---

## Appendix: Full Vertical Registry

| # | Category | Sub-Vertical | US Businesses | Readiness | Template | Phase |
|---|----------|-------------|---------------|-----------|----------|-------|
| 1a | SaaS | CRM Platforms | 50,000 | 8 | Medium | 2 |
| 1b | SaaS | Project Management | 15,000 | 8 | Medium | 2 |
| 1c | SaaS | Email/Communication | 5,000 | 8 | Easy | 2 |
| 1d | SaaS | Analytics/BI | 3,000 | 7 | Hard | 3 |
| 1e | SaaS | Database/Infrastructure | 2,000 | 9 | Medium | 3 |
| 1f | SaaS | HR/Payroll | 5,000 | 6 | Hard | 3 |
| 1g | SaaS | Marketing Automation | 3,000 | 7 | Medium | 2 |
| 1h | SaaS | Vertical SaaS | 10,000 | 6 | Very Hard | 2 |
| 2a | DevTools | Payment Processing | 5,000 | 9 | Easy | 1 |
| 2b | DevTools | Cloud Infrastructure | 500 | 8 | Hard | 3 |
| 2c | DevTools | Communication APIs | 2,000 | 9 | Easy | 2 |
| 2d | DevTools | Auth/Identity | 1,000 | 8 | Medium | 3 |
| 2e | DevTools | Monitoring/Observability | 2,000 | 8 | Medium | 3 |
| 2f | DevTools | CI/CD / DevOps | 1,000 | 8 | Medium | 3 |
| 3a | E-Commerce | Shopify Stores | 2,000,000 | 7 | Easy | 1 |
| 3b | E-Commerce | WooCommerce Stores | 6,000,000 | 5 | Easy | 1 |
| 3c | E-Commerce | Amazon/Marketplace | 2,000,000 | 6 | Hard | 2 |
| 3d | E-Commerce | D2C Brands | 100,000 | 4 | Medium | 2 |
| 3e | E-Commerce | Grocery/Food Delivery | 50,000 | 6 | Hard | 3 |
| 3f | E-Commerce | Luxury Retail | 10,000 | 4 | Very Hard | 3 |
| 3g | E-Commerce | B2B E-Commerce | 60,000 | 5 | Hard | 2 |
| 4a | Finance | Banking | 10,000 | 3 | Very Hard | 3 |
| 4b | Finance | Insurance | 46,000 | 3 | Very Hard | 2 |
| 4c | Finance | Lending/Mortgage | 40,000 | 5 | Hard | 2 |
| 4d | Finance | Investment/Wealth | 9,000 | 6 | Very Hard | 3 |
| 4e | Finance | Accounting/Tax Software | 5,000 | 7 | Medium | 2 |
| 4f | Finance | Payment/Invoicing | 3,000 | 7 | Easy | 2 |
| 4g | Finance | Crypto/Digital Assets | 5,000 | 8 | Medium | 3 |
| 4h | Finance | Fintech/Embedded Finance | 2,000 | 9 | Medium | 2 |
| 5a | Healthcare | Telehealth | 5,000 | 6 | Hard | 2 |
| 5b | Healthcare | Pharmacies | 42,000 | 4 | Very Hard | 3 |
| 5c | Healthcare | Mental Health | 300,000 | 5 | Hard | 2 |
| 5d | Healthcare | Dental | 200,000 | 3 | Hard | 2 |
| 5e | Healthcare | Specialists/Hospitals | 506,000 | 2 | Very Hard | 3 |
| 5f | Healthcare | Health & Wellness | 200,000 | 5 | Easy | 1 |
| 5g | Healthcare | Medical Devices | 5,000 | 6 | Hard | 3 |
| 5h | Healthcare | Clinical/Lab | 30,000 | 3 | Hard | 3 |
| 6a | Education | Online Courses | 510,000 | 6 | Easy | 1 |
| 6b | Education | Tutoring/Test Prep | 520,000 | 4 | Medium | 2 |
| 6c | Education | K-12 Schools | 130,000 | 2 | Hard | 3 |
| 6d | Education | Higher Education | 4,000 | 3 | Very Hard | 3 |
| 6e | Education | Corporate Training | 5,000 | 6 | Medium | 2 |
| 6f | Education | Bootcamps/Certification | 12,000 | 5 | Medium | 2 |
| 7a | Real Estate | Residential Sales | 1,600,000 | 5 | Hard | 2 |
| 7b | Real Estate | Property Management | 300,000 | 5 | Medium | 2 |
| 7e | Real Estate | Commercial RE | 50,000 | 4 | Hard | 3 |
| 7f | Real Estate | Construction/Renovation | 700,000 | 3 | Medium | 2 |
| 8a | Travel | Hotels/Lodging | 1,555,000 | 7 | Medium | 1 |
| 8b | Travel | Airlines/Flights | 1,000 | 7 | Hard | 2 |
| 8c | Travel | Car Rental | 20,000 | 6 | Easy | 2 |
| 8d | Travel | Tours/Activities | 100,000 | 5 | Medium | 2 |
| 8f | Travel | Travel Insurance | 1,000 | 5 | Easy | 2 |
| 8g | Travel | Ground Transport | 50,000 | 7 | Easy | 2 |
| 9a | Media | Events/Ticketing | 155,000 | 6 | Medium | 2 |
| 9b | Media | Streaming | 100 | 7 | Hard | 3 |
| 9c | Media | Gaming | 8,000 | 5 | Medium | 3 |
| 9d | Media | Creator Economy | 2,000,000 | 5 | Medium | 2 |
| 9e | Media | News/Publishing | 530,000 | 5 | Medium | 3 |
| 9f | Media | Sports/Fitness Ent. | 12,000 | 5 | Medium | 3 |
| 10a | Logistics | Parcel Shipping | 100,000 | 8 | Easy | 1 |
| 10b | Logistics | Freight/Trucking | 85,000 | 4 | Medium | 2 |
| 10c | Logistics | Warehousing/3PL | 25,000 | 6 | Medium | 2 |
| 10d | Logistics | Last-Mile Delivery | 10,000 | 6 | Easy | 2 |
| 10e | Logistics | Customs/Intl Trade | 62,000 | 3 | Very Hard | 3 |
| 11a | Agriculture | Farming | 2,000,000 | 2 | Very Hard | 3 |
| 11b | Industrial | Manufacturing | 250,000 | 3 | Hard | 3 |
| 11c | Industrial | Mining/Energy | 10,000 | 3 | Hard | 3 |
| 11d | Industrial | Wholesale/Distrib. | 60,000 | 4 | Medium | 2 |
| 11e | Industrial | Construction Equip. | 80,000 | 3 | Medium | 3 |
| 12a | Government | Permits/Licensing | 90,000 | 2 | Very Hard | 3 |
| 12b | Government | Tax Filing | 100,000 | 4 | Hard | 3 |
| 12c | Nonprofit | Donations | 1,500,000 | 4 | Easy | 2 |
| 12d | Government | Social Services | 50,000 | 1 | Very Hard | 3 |
| 12e | Government | Public Records | 20,000 | 4 | Hard | 3 |

**Total sub-verticals: 67**
**Total US businesses covered: ~21.5M**
**Phase 1 (start now): 7 sub-verticals, ~10.4M businesses**
**Phase 2 (next quarter): 29 sub-verticals, ~6.3M businesses**
**Phase 3 (6+ months): 31 sub-verticals, ~4.8M businesses**
