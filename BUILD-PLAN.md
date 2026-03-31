# AgentHermes — Master Build Plan
# "The Shopify of the Agent Economy"
# Generated: 2026-03-31 | Updated: 2026-03-30 (Wave 4 complete, Wave 5 active)

## Brand & Positioning
- [x] Update all copy: "The Shopify of the Agent Economy"
- [x] Homepage hero: new tagline + 6-step journey + Score/Fix/Connect
- [x] About/mission page with full vision
- [x] Update OG images, meta descriptions, llms.txt with new positioning

## P0 — Spec Compliance (Hours)
- [x] Fix agent card path: /.well-known/agent.json → /.well-known/agent-card.json
- [x] Add missing A2A task states (input-required, rejected, auth-required, submitted)
- [x] Update agent card to v0.3 spec (capabilities, skills with schemas)

## P0 — Vertical Template System (Days)
- [x] Build template engine: pick vertical → auto-generate MCP tools
- [x] Universal template: 8 base fields (name, services, hours, area, contact, booking, payment, desc)
- [x] 7 universal MCP tool patterns: Search, Book, Track, Compare, Manage, Quote, Verify
- [x] P0 verticals: Cleaning Service, Restaurant
- [x] P1 verticals: HVAC/Plumber, Lawn Care
- [x] P2 verticals: Dentist, Roofing, Auto Dealer, Retail/E-commerce
- [x] P3 verticals: Real Estate, Law Firm, SaaS, Agency, CPA, Creator
- [x] Update /connect wizard with vertical picker

## P1 — Agent Card Registry (Days)
- [x] Build /registry page — searchable directory of agent cards
- [x] Crawl/index agent cards from scored businesses
- [x] API: GET /api/v1/registry?q= for agent card search
- [x] Submit your agent card flow
- [x] Quality scoring for agent cards

## P1 — MCP Hosting for Non-Tech Businesses (Wave 5)
- [ ] Auto-generate MCP server from vertical template — Wave 5
- [ ] Host MCP endpoints on our infrastructure (per-business)
- [ ] Dynamic MCP tool generation from business profile data
- [ ] SSE transport support for hosted MCP servers

## P1 — Scanner Updates (Days)
- [x] Add UCP (Universal Commerce Protocol) scanning
- [x] Add ACP (Agent Commerce Protocol) scanning
- [x] Scan for AGENTS.md
- [x] Score agent card v0.3 compliance
- [x] Add vertical-specific scoring (different weights per business type) — 12 vertical profiles in vertical-weights.ts

## P2 — E-commerce Adapters (Wave 3-4 ✓, Wave 5 ongoing)
- [x] Shopify adapter: auto-generate MCP tools from Shopify store — src/lib/adapters/shopify.ts + /api/v1/detect-shopify
- [x] WooCommerce adapter: auto-generate MCP tools from WC store — src/lib/adapters/woocommerce.ts
- [ ] Square adapter for restaurants/retail — Wave 5

## P2 — Content & Authority (Wave 4 ✓, Wave 5 ongoing)
- [x] "State of Agent Readiness Q1 2026" report page
- [x] Publish .well-known/agent-hermes.json standard proposal — /standard page + /api/v1/hermes-json API + verification endpoint
- [x] Vertical-specific landing pages (/for/restaurants, /for/hvac, etc.)
- [ ] Blog/changelog with research findings — Wave 5

## P3 — Payments & Commerce (Wave 5)
- [ ] x402 payment support research — Wave 5 (scanner d5 has x402 detection, needs full integration)
- [ ] UCP/AP2 integration for merchant discovery
- [ ] Multi-rail payment support (Stripe + crypto)
- [ ] KYA (Know Your Agent) identity framework — Wave 5

## P3 — Partnerships (Ongoing)
- [ ] AAIF membership application
- [ ] Smithery/PulseMCP quality scoring partnership
- [ ] Composio integration for fulfillment routing

## Navigation & UX (Wave 2)
- [x] Navigation restructure
- [x] 6-step journey UI
- [x] 3-product architecture (Score/Fix/Connect)
- [x] Leads dashboard
- [x] Fulfillment engine (4-tier)

## Documentation & Brain
- [x] Update CLAUDE.md with new brand + build plan
- [x] Save all research to brain with embeddings
- [x] Update beliefs (new positioning, vertical strategy)
- [x] Session handoff after each wave

## Wave 5 — Active Build (2026-03-30)
Building now:
- [ ] MCP hosting completion (auto-generate + host per-business)
- [ ] Square adapter for restaurants/retail
- [ ] Blog/changelog page with research findings
- [ ] Integrations page (/integrations — Shopify, WooCommerce, Square, more)
- [ ] x402 payment research → full integration
- [ ] KYA (Know Your Agent) identity framework

## Build Stats (as of 2026-03-30)
- 233 pages generated
- 132 businesses scanned (avg score 39/100)
- 70+ git commits
- 15 vertical templates
- 12 vertical scoring profiles
- Shopify + WooCommerce adapters live
- agent-hermes.json standard published
- Fulfillment engine: API → webhook → email → lead
- 6 research docs in repo
