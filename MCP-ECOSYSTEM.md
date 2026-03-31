# MCP Ecosystem Deep Research — March 2026

> Comprehensive analysis of the Model Context Protocol ecosystem: discovery, adoption, hosting, standards, and where AgentHermes fits. Researched 2026-03-30.

---

## 1. MCP Discovery Today — Where Do Developers Find Servers?

### The Fragmented Landscape

There is **no single "Google for MCP tools."** Discovery is scattered across 10+ directories, GitHub repos, and marketplaces. Developers currently cobble together servers from multiple sources:

### Major Directories & Registries

| Directory | URL | Size | Type | Notes |
|-----------|-----|------|------|-------|
| **Official MCP Registry** | registry.modelcontextprotocol.io | Growing | Official | Launched by Anthropic. Namespace-authenticated (reverse DNS). Only hosts metadata, not code. Uses `mcp-publisher` CLI. |
| **PulseMCP** | pulsemcp.com | **12,820+** servers | Community | Updated daily. Best filters. Marks "official" vs "community." Has popularity metrics. |
| **mcp.so** | mcp.so | **19,222** servers | Community | Largest raw count. Community-driven. Collects third-party servers. |
| **Smithery.ai** | smithery.ai | **7,300+** tools | Hybrid (registry + hosting) | Can host servers remotely. Has CLI + SDK. WebSocket-based hosting. Free to list and browse. |
| **Glama.ai** | glama.ai/mcp | Thousands | Hybrid (registry + hosting) | Search, compare, connect. ChatGPT-like UI. API gateway. Ranks by security/compatibility. |
| **MCP.Directory** | mcp.directory | Large | Curated | One-click install for Cursor, Claude Desktop, VS Code, Codex, Gemini CLI. |
| **mcpservers.org** | mcpservers.org | Large | Curated | Clean layout, categorized. |
| **MCPServerFinder** | mcpserverfinder.com | Curated | Directory | Descriptions + features + integration details. |
| **MCPMarket** | mcpmarket.com | Growing | Marketplace | Commerce-focused. |
| **Cursor Directory** | cursor.directory/plugins | Cursor-specific | Marketplace | Launched Feb 2026. One-click MCP install for Cursor. |
| **MCP-Hive** | mcp-hive.com | New | Marketplace + Gateway | Launching May 2026. Combines directory with billing/monetization. |
| **MACH Alliance Registry** | machalliance.org | Vendor-neutral | Consortium | Enterprise-focused, vendor-neutral resource. |
| **GitHub awesome-mcp-servers** | github.com/appcypher/awesome-mcp-servers | **84,000+ stars** | Curated list | Most-starred. 450+ servers tracked in "best-of" fork with 920K total stars across 34 categories. |

### How Claude Desktop Discovers Servers

Claude Desktop uses **four discovery mechanisms**:

1. **JSON config file** (`claude_desktop_config.json`) — Manual. Edited by user. Read on startup.
2. **Connectors UI** — Built-in panel. Click "+" > "Connectors" > browse or add custom URL.
3. **Desktop Extensions** — `.mcpb` files. Double-click to install. Pre-configured bundles.
4. **Extensions marketplace** — Browse and install without editing JSON.

**Key insight**: Discovery is still manual for most users. No auto-discovery. No crawling. No DNS-based lookup.

---

## 2. MCP Adoption Numbers

### Scale (as of March 2026)

| Metric | Number | Source |
|--------|--------|--------|
| Published MCP servers | **10,000+** across public registries | Multiple sources |
| PulseMCP listings | **12,820+** | PulseMCP (Mar 2026) |
| mcp.so listings | **19,222** | mcp.so |
| MCP clients | **300+** actively consuming | Zuplo State of MCP |
| awesome-mcp-servers stars | **84,000+** | GitHub |
| TypeScript SDK dependents | **34,700+** | npm |
| Total npm downloads | **97 million+** | npm (cumulative) |
| Monthly download growth | 100K (Nov 2024) → 8M (Apr 2025) | npm trends |

### Growth Trajectory

- **Nov 2024**: MCP announced by Anthropic. ~100K downloads/month.
- **Mar 2025**: Streamable HTTP transport introduced. SSE deprecated.
- **Apr 2025**: 8M downloads/month. Exponential growth.
- **Sep 2025**: Official MCP Registry preview launched.
- **Jan 2026**: Amplitude, Asana, Box, Clay, Hex, Salesforce join as official remote servers (biggest single-day expansion ever).
- **Feb 2026**: Cursor launches MCP marketplace. Slack MCP server hits GA.
- **Mar 2026**: 10,000+ servers indexed. MCP v1.27 released. Enterprise roadmap published.
- **Forecast**: 90% of organizations expected to use MCP by end of 2026.

### Companies with Official MCP Servers

**Tier 1 — First-party, production-grade ("Class A"):**
- Anthropic (Claude)
- GitHub / Microsoft
- Stripe
- Slack (Salesforce) — GA Feb 2026
- Google (multiple: Drive, Gmail, Calendar, Sheets)
- AWS
- Atlassian (Jira, Confluence)
- Salesforce
- Amplitude, Asana, Box, Clay, Hex (Jan 2026 wave)

**Tier 2 — Official but community-maintained:**
- Zapier, HubSpot, Notion, Twilio, Shopify, Vercel, Supabase

**Tier 3 — Third-party integrations (not from the company itself):**
- Thousands of community-built servers wrapping APIs

**Key observation**: Adoption is deepest in developer/tech-enablement tooling. Penetration into regulated industries and consumer data remains limited. Zero presence in local/non-tech businesses.

---

## 3. MCP Hosting & Deployment

### Transport Models

| Transport | Type | Status | Use Case |
|-----------|------|--------|----------|
| **stdio** | Local subprocess | Active | Dev tools (Cursor, Claude Desktop local). Server runs on user's machine. |
| **Streamable HTTP** | Remote, stateless | **Current standard** | Production deployments. Horizontal scaling. Load balancer friendly. |
| **SSE (Server-Sent Events)** | Remote, stateful | **Deprecated** (Mar 2025) | Legacy. Persistent connections fight with load balancers. |

**The industry is moving from stdio (local) to Streamable HTTP (remote)**. This is the critical shift that enables hosted/managed MCP.

### Who Hosts MCP Servers?

| Platform | Model | Notes |
|----------|-------|-------|
| **Smithery.ai** | Registry + managed hosting | WebSocket-based. Dockerfile + smithery.yaml. Free to list. Usage-based pricing for hosted. |
| **Glama.ai** | Discovery + hosting | API gateway. Multiple transports. |
| **Composio** | Managed gateway | 500+ integrations. Single unified endpoint. Handles OAuth. |
| **Nango** | OAuth + token management | Not full MCP host, but manages auth layer. Paid tiers include MCP server. |
| **Cloudflare Workers** | Serverless hosting | Free tier available. Workers + Durable Objects for MCP. |
| **Vercel** | Serverless hosting | Edge functions for MCP endpoints. |
| **Google Cloud Run** | Container hosting | Official docs for hosting MCP on Cloud Run. |
| **FastMCP Cloud** | Managed hosting | 1,864+ servers. |
| **mcphosting.io** | Dedicated MCP hosting | Specialized platform. |
| **Apify** | Actor-based hosting | $596K paid to creators. 80% revenue share. 130K+ monthly subscribers. |
| **MCPize** | Marketplace + hosting | 85% revenue share. Stripe payouts. Zero-DevOps. |

### Can AgentHermes Host MCP Servers for Businesses?

**Yes, and this is a massive opportunity.** The deployment model would be:

1. Business signs up on AgentHermes
2. AgentHermes generates an MCP server (Streamable HTTP) from their API/data
3. Server is hosted on AgentHermes infrastructure (Cloudflare Workers or similar)
4. Registered in the Official MCP Registry under the business's namespace
5. Discoverable by any MCP client (Claude, Cursor, ChatGPT, etc.)

**Nobody is doing this for non-tech businesses.** Smithery, Glama, Composio all require developers.

---

## 4. The llms.txt Standard

### What Is It?

Proposed by **Jeremy Howard** (Co-Founder of Answer.AI) in **September 2024**. A standardized file at `/llms.txt` that helps LLMs understand and use a website at inference time.

**Problem it solves**: LLM context windows can't handle full websites. HTML with navigation, ads, and JavaScript is hard to convert to useful text.

### File Format

Two complementary files:

**`/llms.txt`** — Curated navigation/summary (Markdown):
```markdown
# Project Name

> Brief summary of what this is and key information.

Additional context paragraphs.

## Core Documentation
- [Quick Start](https://example.com/docs/quickstart): Getting started guide
- [API Reference](https://example.com/docs/api): Full API documentation

## Optional
- [Changelog](https://example.com/changelog): Version history
```

**`/llms-full.txt`** — Complete documentation dump in markdown. Can be massive (Vercel's is 400K+ words, Anthropic's is 481K tokens).

### Adoption Numbers

| Metric | Number |
|--------|--------|
| Sites with llms.txt | **844,000+** (growing 500%+ YoY) |
| Early count (Jul 2025) | 951 domains (NerdyData) |
| % of all websites | < 0.005% (Sistrix) |

### Who Has Implemented It?

| Company | llms.txt size | llms-full.txt size | Notes |
|---------|--------------|-------------------|-------|
| **Anthropic** | 8,364 tokens | 481,349 tokens | Full API docs |
| **Cloudflare** | Yes | Multiple product-specific files | Per-product llms-full.txt |
| **Stripe** | Yes | Yes | Organized by product categories |
| **Vercel** | Yes | 400,000+ words | Famously extensive |
| **Cursor** | Yes | Yes | |
| **Supabase** | Yes | Yes | |
| **Zapier** | Yes | Yes | |
| **Modal** | Yes | Yes | |

**Key insight**: Adoption exploded after **Mintlify** rolled out automatic llms.txt generation for all docs sites built on their platform (Nov 2025). Thousands of sites got llms.txt overnight.

### Does It Matter?

**Mixed signals:**
- Google (John Mueller) explicitly said Search does not use or endorse llms.txt
- No LLM company (OpenAI, Google, Anthropic) has officially confirmed they follow these files when crawling
- But: Claude, ChatGPT, and Perplexity retrieval bots DO fetch and use llms.txt at inference time for real-time answers
- **For AgentHermes**: It's a P0 deliverable. Agents need structured info about businesses, and llms.txt is the closest thing to a standard.

---

## 5. Agent Cards & Discovery Standards

### The Standards Landscape

| Standard | Origin | Status | What It Does |
|----------|--------|--------|-------------|
| **`/.well-known/agent-card.json`** | Google A2A Protocol | **Active, growing** | Agent publishes identity, capabilities, endpoint, skills, auth requirements. JSON format. |
| **MCP Server Cards (`/.well-known/mcp.json`)** | MCP Spec (SEP-1649, SEP-1960) | **In progress** | Server metadata without connecting. Capabilities, auth, tool listings. Two competing proposals being merged. |
| **`/llms.txt`** | Jeremy Howard / Answer.AI | **Active, 844K+ sites** | Human/LLM-readable site summary. Markdown. |
| **AGENTS.md** | OpenAI Codex → Linux Foundation | **Active, 60K+ repos** | Instructions for coding agents. Donated to Linux Foundation (AAIF) Dec 2025. Read by Codex, Copilot, Cursor, Claude Code. |
| **`/.well-known/ai-plugin.json`** | OpenAI ChatGPT Plugins | **DEAD** | Deprecated Apr 2024. Replaced by Custom GPTs "actions." |
| **`/robots.txt` AI directives** | De facto standard | **Active, evolving** | 21% of top 1000 sites have GPTBot rules. Distinguishes training crawlers vs retrieval crawlers. |
| **`/ai.txt`** | Community proposal (2025) | **Experimental** | Domain-specific language for AI interaction permissions. More granular than robots.txt (e.g., allow summarization but not training). |
| **OpenAPI 3.x** | OpenAPI Initiative | **Mature** | API specification. Not agent-specific but essential for tool generation. |
| **UCP (`/.well-known/ucp`)** | Commerce protocol | **Early** | Universal Commerce Protocol for agent transactions. |

### Which Matter? Which Are Dead?

**ALIVE AND CRITICAL:**
1. **A2A Agent Cards** — Google-backed, enterprise adoption, the "business card" for agents
2. **MCP Server Cards** — Protocol-native discovery, converging on two proposals
3. **llms.txt** — 844K sites, momentum, easy to implement
4. **AGENTS.md** — Linux Foundation stewardship, 60K+ repos, all major coding tools support it
5. **robots.txt AI directives** — De facto standard, 21% of top sites

**ALIVE BUT NICHE:**
6. **ai.txt** — More granular than robots.txt but minimal adoption
7. **OpenAPI** — Essential but not agent-specific

**DEAD:**
8. **`ai-plugin.json`** — OpenAI killed plugins entirely. Replaced by GPT actions. No resurrection expected.

### AgentHermes Implication

AgentHermes should generate **all five critical standards** for every business it onboards:
1. `/.well-known/agent-card.json` (A2A)
2. `/.well-known/mcp.json` (MCP Server Card)
3. `/llms.txt` + `/llms-full.txt`
4. `AGENTS.md`
5. Updated `/robots.txt` with AI crawler directives

This is a unique value prop: **nobody auto-generates the full discovery stack for a business.**

---

## 6. The Discovery Gap — AgentHermes's Opportunity

### The Core Problem

**How would an AI agent find a plumber's MCP endpoint?**

Today's answer: **It can't.** Every discovery mechanism assumes:
- The business has developers
- The server is listed in a registry
- Someone manually configured the client to find it

There is no equivalent of Google Search for agent capabilities. No DNS-based discovery. No Yellow Pages for MCP.

### What Exists vs. What's Missing

| Layer | Exists Today | Missing |
|-------|-------------|---------|
| **Developer tool discovery** | Smithery, Glama, PulseMCP, mcp.so | Fine for devs. Useless for agents finding businesses. |
| **Enterprise agent marketplace** | Google Cloud Agent Finder, Salesforce | Walled gardens. Enterprise only. |
| **Protocol-level discovery** | MCP Server Cards (proposed), A2A Agent Cards | Not yet standardized. No crawling infrastructure. |
| **Business directory for agents** | **NOTHING** | This is the gap. |
| **Semantic/natural-language search** | **NOTHING** | "Find me a plumber in Tampa that accepts online booking" — no agent can do this today. |
| **Trust/verification layer** | **NOTHING** (for non-tech businesses) | Agents need to know if a business is legitimate before transacting. |

### What a Discovery Layer Would Look Like

```
Agent asks: "Book a lawn service in Miami for Saturday"
    ↓
Discovery Layer (AgentHermes):
    1. Semantic search across registered businesses
    2. Filter by: location, service type, availability
    3. Return: MCP endpoints, capabilities, trust scores, pricing
    4. Agent connects directly to business's MCP server
    ↓
Transaction happens via MCP tools
```

**This is the "Google for agent tools" that doesn't exist yet.**

### AgentHermes's Unique Position

| Capability | Smithery | Glama | Composio | Google Agent Finder | AgentHermes |
|-----------|----------|-------|----------|-------------------|-------------|
| Lists MCP servers | Yes | Yes | Yes | No | Yes |
| Hosts MCP servers | Yes | Yes | Via gateway | No | Yes (gateway) |
| Business readiness scoring | No | No | No | No | **Yes** |
| Non-tech business onboarding | No | No | No | No | **Yes** |
| Auto-generates discovery files | No | No | No | No | **Yes** |
| Trust/verification | No | Partial | No | Validation | **Yes** |
| Semantic business search | No | No | No | Yes (enterprise) | **Planned** |
| Payment integration | No | No | No | No | **Yes (Stripe Connect)** |

---

## 7. MCP + Non-Tech Businesses

### Has Anyone Tried?

**No.** The entire MCP ecosystem is developer-centric. Research found:
- Zero MCP servers for plumbing, lawn care, HVAC, or any local service
- Zero platforms targeting non-tech business MCP onboarding
- MCP server development costs: **$25K-$50K** for SMB MVP, **$60K-$120K** for production (per Intuz)
- This pricing makes it impossible for a lawn service to build their own

### What Would a Lawn Service MCP Endpoint Look Like?

```json
{
  "name": "Goliath Mowing MCP Server",
  "version": "1.0.0",
  "tools": [
    {
      "name": "check_availability",
      "description": "Check available mowing appointment slots",
      "parameters": {
        "date": "string (ISO 8601)",
        "zip_code": "string",
        "service_type": "enum: mowing, edging, leaf_removal, full_service"
      }
    },
    {
      "name": "get_quote",
      "description": "Get a price quote for lawn service",
      "parameters": {
        "lot_size_sqft": "number",
        "service_type": "string",
        "frequency": "enum: one_time, weekly, biweekly, monthly"
      }
    },
    {
      "name": "book_appointment",
      "description": "Book a lawn service appointment",
      "parameters": {
        "date": "string",
        "service_type": "string",
        "address": "string",
        "payment_method": "string"
      }
    },
    {
      "name": "get_service_area",
      "description": "Check if an address is in the service area",
      "parameters": {
        "zip_code": "string"
      }
    }
  ],
  "resources": [
    {
      "name": "pricing",
      "description": "Current pricing for all services"
    },
    {
      "name": "reviews",
      "description": "Customer reviews and ratings"
    }
  ]
}
```

### The AgentHermes Model

**Business signs up → AgentHermes generates everything:**

1. **Scan**: Crawl their website, Google Business Profile, Yelp, etc.
2. **Generate MCP Server**: Auto-create tools from their booking system, pricing, availability
3. **Host It**: Run on AgentHermes infrastructure (Streamable HTTP)
4. **Register It**: Submit to Official MCP Registry, PulseMCP, Smithery
5. **Generate Discovery Files**: agent-card.json, llms.txt, MCP Server Card
6. **Verify & Score**: AgentHermes trust badge + readiness score
7. **Monitor**: Ongoing uptime, accuracy, freshness monitoring

**Pricing model**: $29-99/mo (lawn service pays less than a Yellow Pages ad)

### Who Would Host It?

AgentHermes. The business never touches infrastructure. The model is:
- AgentHermes runs the MCP servers on Cloudflare Workers / Vercel Edge
- Each business gets a subdomain: `goliath-mowing.agenthermes.ai/mcp`
- Or custom domain: `mcp.goliath-mowing.com` (CNAME to AgentHermes)
- AgentHermes handles auth, rate limiting, billing, monitoring

---

## 8. MCP Monetization Models (Market Intelligence)

### Emerging Revenue Models for MCP

| Model | Example | Pricing |
|-------|---------|---------|
| **Subscription tiers** | 21st.dev Magic MCP | Free (10 credits) → $16/mo → $32/mo |
| **Usage-based** | Moesif metering | $0.01+ per call |
| **Freemium** | Most community servers | Free core, paid premium features |
| **Revenue share** | Apify (80%), MCPize (85%) | Platform takes 15-20% |
| **Gateway fee** | MCP-Hive | Single endpoint, billing layer |
| **Enterprise license** | Class A servers | Custom pricing |
| **Hybrid** | Common pattern | Base subscription + usage overages |

### Market Size Signals

- MCP market expected to reach **$1.8B** in 2025
- Apify has paid **$596K** to MCP server creators
- 21st.dev (single MCP server for UI generation) is a cited monetization success
- Most services pivot from usage-pricing to subscriptions ($49/$299/$999 tiers)

---

## 9. The Competitive Moat Analysis

### Why AgentHermes Wins

**The discovery gap is real and massive:**

1. **10,000+ MCP servers** exist but they're all for **tech companies serving developers**
2. **33 million small businesses** in the US have **zero agent presence**
3. No platform converts a non-tech business into an agent-ready endpoint
4. The Official MCP Registry requires npm packages and CLI tools — impossible for a plumber
5. Every existing directory (Smithery, Glama, PulseMCP) is **developer-facing**

**AgentHermes is positioned as the bridge between the MCP protocol world and the 33M businesses that will never hire a developer to build an MCP server.**

### Timing

- MCP is at **protocol maturity** (v1.27, Streamable HTTP stable, official registry live)
- Enterprise adoption is accelerating (Slack GA, Salesforce, Google, Microsoft all in)
- But **consumer/SMB adoption hasn't started** — the infrastructure isn't there yet
- AgentHermes builds that infrastructure

### The SSL Certificate Analogy

| Era | Problem | Solution | Market |
|-----|---------|----------|--------|
| 1995 | Websites not trusted for commerce | SSL certificates (Verisign) | Every website needed one |
| 2026 | Businesses not trusted for agent commerce | Agent readiness certification (AgentHermes) | Every business will need one |

---

## 10. Research Sources

### MCP Protocol & Ecosystem
- [MCP Official Roadmap](https://modelcontextprotocol.io/development/roadmap)
- [MCP Official Registry](https://registry.modelcontextprotocol.io/)
- [MCP Registry GitHub](https://github.com/modelcontextprotocol/registry)
- [MCP Registry Blog Post](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/)
- [MCP v1.27 Analysis](https://www.contextstudios.ai/blog/mcp-ecosystem-in-2026-what-the-v127-release-actually-tells-us)
- [MCP Roadmap 2026 - The New Stack](https://thenewstack.io/model-context-protocol-roadmap-2026/)
- [State of MCP Report - Zuplo](https://zuplo.com/mcp-report)
- [MCP Transport Future](https://blog.modelcontextprotocol.io/posts/2025-12-19-mcp-transport-future/)
- [a16z Deep Dive on MCP](https://a16z.com/a-deep-dive-into-mcp-and-the-future-of-ai-tooling/)

### Directories & Marketplaces
- [Smithery.ai](https://smithery.ai/) — 7,300+ tools, registry + hosting
- [Glama.ai MCP](https://glama.ai/mcp) — Search, compare, connect
- [PulseMCP](https://www.pulsemcp.com/servers) — 12,820+ servers daily
- [mcp.so](https://mcp.so/) — 19,222 community servers
- [MCP.Directory](https://mcp.directory/) — One-click install
- [mcpservers.org](https://mcpservers.org/) — Curated list
- [awesome-mcp-servers GitHub](https://github.com/appcypher/awesome-mcp-servers) — 84K+ stars
- [Cursor Marketplace](https://cursor.directory/plugins) — Launched Feb 2026

### Standards & Protocols
- [llms.txt Specification](https://llmstxt.org/) — Jeremy Howard proposal
- [llms.txt Examples from Major Companies](https://www.mintlify.com/blog/real-llms-txt-examples)
- [AGENTS.md Specification](https://agents.md/)
- [AGENTS.md GitHub](https://github.com/agentsmd/agents.md) — Linux Foundation stewardship
- [Google A2A Protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [A2A GitHub](https://github.com/a2aproject/A2A)
- [MCP Server Cards SEP-1649](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649)
- [MCP Server Cards SEP-1960](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1960)
- [MCP Transports Spec](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports)

### Hosting & Infrastructure
- [MCP Hosting Guide](https://www.agent37.com/blog/mcp-hosting-complete-guide-to-hosting-mcp-servers)
- [Hosted MCP Platforms - Composio](https://composio.dev/content/hosted-mcp-platforms)
- [Google Cloud Run MCP Hosting](https://docs.google.com/run/docs/host-mcp-servers)
- [Free MCP Hosting Options](https://mcpplaygroundonline.com/blog/free-mcp-server-hosting-cloudflare-vercel-guide)
- [Smithery Pricing](https://smithery.ai/pricing)

### Adoption & Market Data
- [MCP Adoption Statistics](https://mcpmanager.ai/blog/mcp-adoption-statistics/)
- [MCP Monetization Models - Medium](https://medium.com/mcp-server/the-rise-of-mcp-protocol-adoption-in-2026-and-emerging-monetization-models-cb03438e985c)
- [MCP Server Economics - Zeo](https://zeo.org/resources/blog/mcp-server-economics-tco-analysis-business-models-roi)
- [Enterprise MCP Adoption - CData](https://www.cdata.com/blog/2026-year-enterprise-ready-mcp-adoption)
- [Google Cloud AI Agent Marketplace](https://cloud.google.com/blog/topics/partners/google-cloud-ai-agent-marketplace)

### Agent Discovery & AI Standards
- [Claude Desktop MCP Setup](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)
- [robots.txt AI Strategy 2026](https://witscode.com/blogs/robots-txt-strategy-2026-managing-ai-crawlers/)
- [llms.txt Adoption State](https://www.aeo.press/ai/the-state-of-llms-txt-in-2026)
- [AI Crawlers and robots.txt](https://paulcalvano.com/2025-08-21-ai-bots-and-robots-txt/)
- [MCP Discovery Tools - Obot](https://obot.ai/resources/learning-center/mcp-tool-discovery/)

---

## Summary: The 6 Key Findings

1. **Discovery is fragmented**: 10+ directories, no unified search, no DNS-based auto-discovery. The Official MCP Registry exists but requires developer tooling.

2. **Scale is real but developer-only**: 10,000+ servers, 97M downloads, 84K GitHub stars — but 100% targeted at developers and tech companies.

3. **The transport shift enables hosting**: stdio → Streamable HTTP means MCP servers can now be hosted remotely as services. This unlocks managed hosting for non-tech businesses.

4. **Five discovery standards matter**: A2A Agent Cards, MCP Server Cards, llms.txt, AGENTS.md, and robots.txt AI directives. All are active and growing. Nobody auto-generates all five.

5. **Zero presence of non-tech businesses**: No lawn service, plumber, dentist, or restaurant has an MCP endpoint. The 33M US small businesses are completely absent from the agent economy. This is a $1.8B+ opportunity.

6. **AgentHermes is uniquely positioned**: The only platform attempting to bridge the gap between MCP protocol infrastructure and non-tech business readiness. The "Shopify for agent readiness" thesis is validated by the research — nobody else is doing this.
