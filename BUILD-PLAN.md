# AgentHermes — Master Build Plan
# "The Shopify of the Agent Economy"
# Generated: 2026-03-31

## Brand & Positioning
- [ ] Update all copy: "The Shopify of the Agent Economy"
- [ ] Homepage hero: new tagline + 6-step journey + Score/Fix/Connect
- [ ] About/mission page with full vision
- [ ] Update OG images, meta descriptions, llms.txt with new positioning

## P0 — Spec Compliance (Hours)
- [ ] Fix agent card path: /.well-known/agent.json → /.well-known/agent-card.json
- [ ] Add missing A2A task states (input-required, rejected, auth-required, submitted)
- [ ] Update agent card to v0.3 spec (capabilities, skills with schemas)

## P0 — Vertical Template System (Days)
- [ ] Build template engine: pick vertical → auto-generate MCP tools
- [ ] Universal template: 8 base fields (name, services, hours, area, contact, booking, payment, desc)
- [ ] 7 universal MCP tool patterns: Search, Book, Track, Compare, Manage, Quote, Verify
- [ ] P0 verticals: Cleaning Service, Restaurant
- [ ] P1 verticals: HVAC/Plumber, Lawn Care
- [ ] P2 verticals: Dentist, Roofing, Auto Dealer, Retail/E-commerce
- [ ] P3 verticals: Real Estate, Law Firm, SaaS, Agency, CPA, Creator
- [ ] Update /connect wizard with vertical picker

## P1 — Agent Card Registry (Days)
- [ ] Build /registry page — searchable directory of agent cards
- [ ] Crawl/index agent cards from scored businesses
- [ ] API: GET /api/v1/registry?q= for agent card search
- [ ] Submit your agent card flow
- [ ] Quality scoring for agent cards

## P1 — MCP Hosting for Non-Tech Businesses (Days)
- [ ] Auto-generate MCP server from vertical template
- [ ] Host MCP endpoints on our infrastructure (per-business)
- [ ] Dynamic MCP tool generation from business profile data
- [ ] SSE transport support for hosted MCP servers

## P1 — Scanner Updates (Days)
- [ ] Add UCP (Universal Commerce Protocol) scanning
- [ ] Add ACP (Agent Commerce Protocol) scanning
- [ ] Scan for AGENTS.md
- [ ] Score agent card v0.3 compliance
- [ ] Add vertical-specific scoring (different weights per business type)

## P2 — E-commerce Adapters (Week)
- [ ] Shopify adapter: auto-generate MCP tools from Shopify store
- [ ] WooCommerce adapter: auto-generate MCP tools from WC store
- [ ] Square adapter for restaurants/retail

## P2 — Content & Authority (Week)
- [ ] "State of Agent Readiness Q1 2026" report page
- [ ] Publish .well-known/agent-hermes.json standard proposal
- [ ] Vertical-specific landing pages (/for/restaurants, /for/hvac, etc.)
- [ ] Blog/changelog with research findings

## P3 — Payments & Commerce (Week+)
- [ ] x402 payment support research
- [ ] UCP/AP2 integration for merchant discovery
- [ ] Multi-rail payment support (Stripe + crypto)
- [ ] KYA (Know Your Agent) identity framework

## P3 — Partnerships (Ongoing)
- [ ] AAIF membership application
- [ ] Smithery/PulseMCP quality scoring partnership
- [ ] Composio integration for fulfillment routing

## Documentation & Brain
- [ ] Update CLAUDE.md with new brand + build plan
- [ ] Save all research to brain with embeddings
- [ ] Update beliefs (new positioning, vertical strategy)
- [ ] Session handoff after each wave
