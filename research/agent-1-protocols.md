# Agent Readiness Protocols — Complete Research Findings

> Research Agent 1: Protocol Standards
> Date: 2026-03-25
> Purpose: Comprehensive protocol audit for AgentHermes Agent Readiness Score

---

## Table of Contents

1. [A2A (Agent-to-Agent Protocol)](#1-a2a-agent-to-agent-protocol)
2. [MCP (Model Context Protocol)](#2-mcp-model-context-protocol)
3. [llms.txt](#3-llmstxt)
4. [Robots.txt for Agents](#4-robotstxt-for-agents)
5. [OpenAPI 3.x](#5-openapi-3x)
6. [Schema.org / JSON-LD](#6-schemaorg--json-ld)
7. [Additional Protocols](#7-additional-protocols)
8. [Scoring Recommendations Summary](#8-scoring-recommendations-summary)

---

## 1. A2A (Agent-to-Agent Protocol)

### Overview

| Field | Value |
|-------|-------|
| **Full Name** | Agent2Agent Protocol (A2A) |
| **Backing Organization** | Google Cloud, Linux Foundation (AAIF) |
| **Current Spec Version** | 1.0.0 (prior: 0.3.0, 0.2.6, 0.1.0) |
| **Spec Status** | Released, production-ready |
| **Launched** | April 2025 |
| **GitHub** | github.com/a2aproject/A2A |
| **Spec URL** | a2a-protocol.org/latest/specification/ |

### What It Is

A2A is an open protocol enabling communication and interoperability between opaque agentic applications. It defines how AI agents discover each other, negotiate capabilities, exchange messages, and coordinate tasks. Built on HTTP, SSE, and JSON-RPC, it integrates with existing enterprise IT stacks.

### Adoption Rate

- 150+ organizations supporting the protocol (every major hyperscaler)
- 50+ founding technology partners (Atlassian, Box, Cohere, Intuit, Langchain, MongoDB, PayPal, Salesforce, SAP, ServiceNow, UKG, Workday)
- ~35% of AI-focused enterprises actively exploring A2A integration
- Expected 65-75% year-over-year growth through 2026
- Microsoft Azure AI Foundry, Google Vertex AI, and AWS Bedrock all support A2A
- Donated to Linux Foundation's Agentic AI Foundation (AAIF) in late 2025

### Discovery Mechanism

Agents publish their Agent Card at:
```
https://{domain}/.well-known/agent-card.json
```
Following RFC 8615 (Well-Known URIs). Clients perform HTTP GET to this standardized path.

Three discovery strategies:
1. **Well-Known URI** — open discovery at `/.well-known/agent-card.json`
2. **Curated Registries** — central repositories where servers publish cards
3. **Direct Configuration** — hardcoded for tightly coupled systems

### Agent Card Specification (Perfect Implementation)

**Required Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Agent's display name |
| `provider` | AgentProvider | Organization info (provider.name is required) |
| `endpoints` | array[AgentInterface] | Available service endpoints with protocol bindings |
| `capabilities` | AgentCapabilities | Feature support matrix |
| `securitySchemes` | object | Supported authentication methods |
| `security` | array | Active security scheme requirements |

**Optional Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Human-readable agent overview |
| `version` | string | Card version tracking |
| `skills` | array[AgentSkill] | Declared capabilities with parameters |
| `defaultInputModes` | array[string] | Default media types accepted (e.g., "text", "application/json") |
| `defaultOutputModes` | array[string] | Default media types returned |
| `extensions` | array[AgentExtension] | Custom functionality declarations |
| `signature` | AgentCardSignature | Cryptographic signing for integrity |
| `supportsAuthenticatedExtendedCard` | boolean | Whether extended card requires auth |

**AgentCapabilities Object:**
```json
{
  "streaming": true,
  "pushNotifications": true,
  "extendedAgentCard": true
}
```

**AgentSkill Object:**
```json
{
  "id": "product_search",
  "name": "Product Search",
  "description": "Search product catalog by name, category, or price range",
  "tags": ["commerce", "products", "search"],
  "examples": ["find blue running shoes under $100", "search for organic coffee"],
  "inputModes": ["text/plain", "application/json"],
  "outputModes": ["application/json"]
}
```

**Security Scheme Types Supported:**
- APIKeySecurityScheme (header/query parameter)
- HTTPAuthSecurityScheme (Basic/Bearer)
- OAuth2SecurityScheme (authorization code, client credentials, device code)
- OpenIdConnectSecurityScheme
- MutualTlsSecurityScheme (certificate-based)

**Transport Protocols:**
- JSON-RPC 2.0 (over HTTP/WebSocket)
- gRPC (Protobuf-based, added in v0.3)
- HTTP/REST (standard RESTful with JSON)

### Complete Agent Card Example

```json
{
  "name": "Acme Commerce Agent",
  "description": "Product discovery, pricing, and order management for Acme Store",
  "version": "2.1.0",
  "provider": {
    "name": "Acme Corporation",
    "url": "https://acme.com"
  },
  "url": "https://api.acme.com/a2a/",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true,
    "extendedAgentCard": true
  },
  "defaultInputModes": ["text/plain", "application/json"],
  "defaultOutputModes": ["application/json"],
  "skills": [
    {
      "id": "product_search",
      "name": "Product Search",
      "description": "Search products by name, category, price range, or attributes",
      "tags": ["commerce", "products", "search"],
      "examples": ["find blue running shoes under $100", "search organic coffee beans"]
    },
    {
      "id": "order_status",
      "name": "Order Status",
      "description": "Check order status, tracking, and delivery estimates",
      "tags": ["commerce", "orders", "tracking"],
      "examples": ["what is the status of order #12345", "track my recent order"]
    }
  ],
  "securitySchemes": {
    "oauth2": {
      "type": "oauth2",
      "flows": {
        "clientCredentials": {
          "tokenUrl": "https://auth.acme.com/token",
          "scopes": {
            "read:products": "Read product catalog",
            "read:orders": "Read order status",
            "write:orders": "Create and modify orders"
          }
        }
      }
    }
  },
  "security": [{"oauth2": ["read:products"]}],
  "supportsAuthenticatedExtendedCard": true
}
```

### Caching Best Practices
Servers should include `Cache-Control` headers with `max-age` directives and `ETag` headers for conditional requests.

### AgentHermes Recommendation: **REQUIRE**

**Rationale:** A2A is the primary agent-to-agent interoperability standard, backed by Google/Linux Foundation with 150+ organization support. It directly enables AI agents to discover and interact with businesses. The Agent Card at `/.well-known/agent-card.json` is the single most important signal for agent readiness. Without it, agents cannot discover the business's capabilities.

**Scoring Weight:** HIGH (20-25 points of the 100-point score)

**Minimum for points:** Agent Card hosted at `/.well-known/agent-card.json` with name, description, provider, at least one skill, and a valid endpoint. Full points for complete card with security schemes, multiple skills, streaming support, and authenticated extended card.

---

## 2. MCP (Model Context Protocol)

### Overview

| Field | Value |
|-------|-------|
| **Full Name** | Model Context Protocol (MCP) |
| **Backing Organization** | Anthropic, Linux Foundation (AAIF) |
| **Current Spec Version** | 2025-11-25 |
| **Spec Status** | Production, de facto industry standard |
| **Launched** | November 2024 |
| **GitHub** | github.com/modelcontextprotocol/modelcontextprotocol |
| **Spec URL** | modelcontextprotocol.io/specification/2025-11-25 |

### What It Is

MCP standardizes how LLM applications connect to external data sources, tools, and services. While A2A handles agent-to-agent communication, MCP handles how agents talk to tools and data. It uses JSON-RPC 2.0 for message encoding and supports stateful connections with capability negotiation.

### Adoption Rate

- 97 million+ monthly SDK downloads (Python + TypeScript combined) as of Feb 2026
- 5,800+ MCP servers and 300+ MCP clients available
- 8 million+ server downloads by April 2025 (up from 100K in Nov 2024)
- Natively supported by Anthropic, OpenAI, Google, Microsoft, Amazon
- Deployed at Block, Bloomberg, Amazon, and hundreds of Fortune 500 companies
- Donated to Linux Foundation's AAIF in December 2025

### Server Features (What Agents Consume)

MCP servers expose three primitive types:

1. **Tools** — Functions the AI model can execute
2. **Resources** — Context and data for the model or user
3. **Prompts** — Templated messages and workflows

### Tool Definition Specification (Perfect Implementation)

**Required Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique identifier for the tool |
| `inputSchema` | JSON Schema | Parameters the tool accepts (type: "object") |

**Optional but Strongly Recommended Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Human-readable display name |
| `description` | string | Clear description of what the tool does |
| `outputSchema` | JSON Schema | Expected output structure |
| `annotations` | object | Metadata about tool behavior (audience, priority) |

**Example Tool Definition:**
```json
{
  "name": "search_products",
  "title": "Product Search",
  "description": "Search the product catalog by keyword, category, or price range. Returns matching products with name, price, availability, and image URL.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query (product name, keyword, or SKU)"
      },
      "category": {
        "type": "string",
        "description": "Product category to filter by",
        "enum": ["electronics", "clothing", "home", "sports", "food"]
      },
      "min_price": {
        "type": "number",
        "description": "Minimum price in USD"
      },
      "max_price": {
        "type": "number",
        "description": "Maximum price in USD"
      },
      "in_stock_only": {
        "type": "boolean",
        "description": "Only return products currently in stock",
        "default": true
      }
    },
    "required": ["query"]
  },
  "outputSchema": {
    "type": "object",
    "properties": {
      "products": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {"type": "string"},
            "name": {"type": "string"},
            "price": {"type": "number"},
            "currency": {"type": "string"},
            "in_stock": {"type": "boolean"},
            "image_url": {"type": "string"}
          }
        }
      },
      "total_count": {"type": "integer"}
    },
    "required": ["products", "total_count"]
  },
  "annotations": {
    "audience": ["assistant"],
    "priority": 0.8
  }
}
```

### Transport Protocols

| Transport | Use Case | Status |
|-----------|----------|--------|
| **stdio** | Local subprocess, CLI tools | Stable, original transport |
| **Streamable HTTP** | Remote servers, cloud deployment, multi-client | Current standard (replaced SSE in March 2025) |
| **SSE (Server-Sent Events)** | Legacy, still supported | Deprecated in favor of Streamable HTTP |

### Server Discovery

MCP server discovery is evolving with two active Spec Enhancement Proposals:
- **SEP-1649**: Server cards at `/.well-known/mcp/server-card.json` — richer metadata
- **SEP-1960**: Manifest at `/.well-known/mcp` — endpoint enumeration + auth discovery

Additionally, the **Official MCP Registry** launched Sept 2025 at `registry.modelcontextprotocol.io`.

### Server Capabilities Declaration

```json
{
  "capabilities": {
    "tools": {
      "listChanged": true
    },
    "resources": {
      "subscribe": true,
      "listChanged": true
    },
    "prompts": {
      "listChanged": true
    }
  }
}
```

### Production Best Practices for Agent-Facing MCP Servers

1. **Tool naming**: Use descriptive, action-oriented names (e.g., `search_products` not `query`)
2. **Descriptions**: Write for LLMs — be specific and conversational, not terse
3. **Input schemas**: Include enums for constrained fields, clear descriptions for every property
4. **Output schemas**: Define structured output for deterministic parsing
5. **Idempotency**: Make tool calls idempotent; accept client-generated request IDs
6. **Pagination**: Use cursor-based pagination for list operations
7. **Error handling**: Return structured errors with `isError: true` and descriptive messages
8. **Auth**: Use OAuth 2.1 for HTTP transports (standardized in 2025-11-25 spec)
9. **Rate limiting**: Implement per-client rate limits
10. **Health checks**: Expose health endpoints for monitoring

### Security Considerations

- 43% of early MCP servers contained command injection vulnerabilities (Invariant Labs 2025 audit)
- Validate all tool inputs
- Implement proper access controls
- Rate limit tool invocations
- Sanitize tool outputs
- Tool annotations MUST be treated as untrusted unless from a verified source

### AgentHermes Recommendation: **REQUIRE**

**Rationale:** MCP is the de facto standard for agent-to-tool communication, with 97M+ monthly downloads and support from every major AI provider. A business that exposes an MCP server allows any AI agent (Claude, GPT, Gemini, etc.) to directly interact with its services. This is the most actionable protocol for agent readiness.

**Scoring Weight:** HIGH (20-25 points of the 100-point score)

**Minimum for points:** At least one MCP server endpoint with Streamable HTTP transport, 3+ tools with proper inputSchema and descriptions. Full points for complete tool catalog, outputSchema, pagination, structured errors, OAuth 2.1 auth, and registration in the MCP Registry.

---

## 3. llms.txt

### Overview

| Field | Value |
|-------|-------|
| **Full Name** | /llms.txt |
| **Backing Organization** | Answer.AI (Jeremy Howard, co-creator of fast.ai) |
| **Current Spec Version** | Draft proposal (no formal versioning) |
| **Spec Status** | Community proposal, growing adoption, no formal standard body |
| **Proposed** | September 2024 |
| **Spec URL** | llmstxt.org |

### What It Is

A markdown-formatted file at `/llms.txt` that provides LLMs with a curated map of a website's most important content. Think of it as a sitemap designed specifically for AI consumption rather than search engine crawling. It helps AI models quickly understand what a business does and where to find key information.

### Format Specification

The file uses markdown with sections in this order:

1. **H1 heading** (REQUIRED) — Project or business name
2. **Blockquote** (recommended) — Short summary with key information
3. **Detail paragraphs** (optional) — Additional context (no headings allowed)
4. **H2-delimited sections** — Lists of markdown links with optional descriptions
5. **"Optional" section** — URLs that can be skipped for shorter context

**Example Perfect Implementation:**
```markdown
# Acme Corporation

> Acme Corporation is a B2B SaaS company providing inventory management solutions for e-commerce businesses. Founded 2018, headquartered in Austin, TX. API-first platform with 50,000+ business customers.

Key products: Inventory Pro (real-time tracking), OrderFlow (fulfillment automation), Analytics Dashboard (demand forecasting).

## API Documentation
- [API Reference](https://acme.com/docs/api.md): Complete REST API documentation with authentication, endpoints, and examples
- [Getting Started](https://acme.com/docs/quickstart.md): 5-minute quickstart guide for API integration
- [Authentication](https://acme.com/docs/auth.md): OAuth 2.0 setup and API key management

## Product Information
- [Pricing](https://acme.com/pricing.md): Plans from $49/mo to Enterprise
- [Features](https://acme.com/features.md): Complete feature comparison matrix
- [Integrations](https://acme.com/integrations.md): 200+ supported platforms (Shopify, WooCommerce, Amazon)

## Support
- [FAQ](https://acme.com/faq.md): Common questions and troubleshooting
- [Status Page](https://status.acme.com): Real-time system status

## Optional
- [Blog](https://acme.com/blog.md): Industry insights and product updates
- [Changelog](https://acme.com/changelog.md): Release history
```

**Companion file:** `/llms-full.txt` — contains the complete text of all linked pages concatenated into one file for full context ingestion.

### Adoption Rate

- **844,000+ websites** have implemented it (BuiltWith, Oct 2025)
- Only **951 domains** (NerdyData, July 2025) — discrepancy suggests many sites have it but limited quality
- 10.13% adoption rate among sites actively targeting AI search (SE Ranking)
- Notable adopters: Anthropic, Cloudflare, Stripe, Cursor, Vercel, Maryland.gov (first US state)
- Zero confirmed visits from GPTBot, ClaudeBot, or PerplexityBot to llms.txt pages (mid-Aug to late-Oct 2025)
- No major AI provider has confirmed their crawlers read or follow llms.txt

### AgentHermes Recommendation: **RECOMMEND** (not require)

**Rationale:** llms.txt has significant grassroots adoption and is trivial to implement, but no major AI provider has confirmed their systems actively consume it. It provides genuine value as a structured content map that any LLM-powered tool can use, but its impact on agent discovery is indirect compared to A2A and MCP. It's a good-to-have signal, not a gatekeeper.

**Scoring Weight:** LOW-MEDIUM (5-10 points of the 100-point score)

**Minimum for points:** File exists at `/llms.txt` with H1 name, blockquote summary, and at least one H2 section with links. Bonus points for `/llms-full.txt` companion file and markdown versions of key pages.

---

## 4. Robots.txt for Agents

### Overview

| Field | Value |
|-------|-------|
| **Traditional Standard** | robots.txt (Robots Exclusion Protocol, RFC 9309) |
| **Status** | robots.txt is universal; agent-specific extensions are emerging |

### Current State

Traditional `robots.txt` controls access but cannot distinguish between purposes (e.g., "index for search but don't train on this"). AI companies have fractured their crawlers into purpose-specific user agents:

**Known AI Crawler User-Agents (as of 2026):**

| Company | Training Bot | Search Bot | User-Requested |
|---------|-------------|------------|----------------|
| **OpenAI** | GPTBot | OAI-SearchBot | ChatGPT-User |
| **Anthropic** | ClaudeBot | Claude-SearchBot | Claude-User |
| **Google** | Google-Extended | Googlebot | — |
| **Perplexity** | PerplexityBot | — | Perplexity-User |
| **Meta** | Meta-ExternalAgent | — | — |
| **Apple** | Applebot-Extended | Applebot | — |

**Blocking the training bot does NOT block the search bot.** Each must be addressed separately.

### Emerging Standards

#### 4a. RSL (Really Simple Licensing) 1.0

| Field | Value |
|-------|-------|
| **Backing** | RSL Collective (co-founded by Dave Winer, RSS co-creator) |
| **Version** | 1.0 (December 2025) |
| **Partners** | Yahoo, Ziff Davis, O'Reilly Media, Creative Commons |

RSL augments robots.txt with licensing and royalty terms. It defines usage categories:
- `ai-all` — all AI usage
- `ai-input` — use as training input
- `ai-index` — use for indexing/retrieval

Licensing models: free, attribution, subscription, pay-per-crawl, pay-per-inference, contribution (nonprofit).

#### 4b. agents.txt

An emerging specification (not yet standardized) that declares a site's policies and interfaces for AI agents, including:
- API base endpoints
- Allowed/disallowed endpoints
- Authentication methods
- Rate limits
- Scopes

Proposed location: `/.well-known/agents` or `/agents.txt`

Mastercard already encourages businesses to configure agents.txt for AI shopping agents.

### Perfect Implementation

A complete robots.txt for the agent era should include:

```
# Traditional search engines
User-agent: Googlebot
Allow: /

# AI Training — opt in or out explicitly
User-agent: GPTBot
Allow: /products/
Allow: /api/docs/
Disallow: /admin/
Disallow: /internal/

User-agent: ClaudeBot
Allow: /products/
Allow: /api/docs/
Disallow: /admin/

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Meta-ExternalAgent
Disallow: /

# AI Search retrieval
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

# Default
User-agent: *
Disallow: /admin/
Disallow: /internal/

Sitemap: https://example.com/sitemap.xml
```

### AgentHermes Recommendation: **REQUIRE** (robots.txt with AI bot directives)

**Rationale:** Every business needs explicit policy on AI crawler access. Businesses that don't address AI crawlers are either invisible to agents (if blocked by default) or losing control of their content (if scraped without terms). The presence of intentional AI crawler directives in robots.txt signals that a business has thought about agent interaction.

**Scoring Weight:** MEDIUM (10-15 points of the 100-point score)

**Minimum for points:** robots.txt exists and explicitly addresses at least GPTBot, ClaudeBot, and Google-Extended user agents with intentional Allow/Disallow directives. Bonus points for RSL licensing terms and granular per-bot policies.

---

## 5. OpenAPI 3.x

### Overview

| Field | Value |
|-------|-------|
| **Full Name** | OpenAPI Specification (OAS) |
| **Backing Organization** | OpenAPI Initiative (Linux Foundation) |
| **Current Spec Version** | 3.2.0 (September 2025) |
| **Spec Status** | Industry standard, mature |
| **Spec URL** | spec.openapis.org/oas/v3.2.0.html |

### What It Is

OpenAPI is the industry standard for describing REST APIs. For agent readiness, it serves as the machine-readable blueprint that AI agents read to understand what a business's API can do, what parameters to send, and what responses to expect.

### Agent vs. Human API Design

89% of developers use AI tools daily, but only 24% design APIs with AI agents in mind (Postman 2025 State of the API Report).

**Key differences for agent-friendly APIs:**

| Aspect | Human-Friendly | Agent-Friendly |
|--------|---------------|----------------|
| Descriptions | Brief, technical | Verbose, conversational, intent-explaining |
| Examples | Optional nice-to-have | Required for every endpoint |
| Naming | Flexible conventions | Strictly consistent (`user_id` everywhere, never `userId` AND `user_id`) |
| Error responses | Human-readable messages | Structured JSON with error_code, message, type |
| Auth | Interactive OAuth flows OK | Machine-to-machine only (client_credentials, API keys) |
| Discovery | Docs website | `/.well-known/openapi.json` or `/openapi.json` |
| Schemas | Approximate is fine | Exact types, enums, constraints |

### Perfect Agent-Friendly OpenAPI Implementation

**Discovery:** Expose the spec at `/.well-known/openapi.json` or `/openapi.json`

**Required Elements:**

1. **Every endpoint** has `summary`, `description`, and `operationId`
2. **Every parameter** has `description`, `type`, constraints (min/max/pattern/enum)
3. **Every request body** has a complete JSON Schema with examples
4. **Every response** has a complete JSON Schema (including error responses)
5. **Multiple examples** per endpoint showing realistic use cases and edge cases
6. **Consistent naming** — identical conventions throughout (snake_case or camelCase, never mixed)
7. **Tags** to categorize endpoints by business domain
8. **Auth** documented with machine-to-machine flow (OAuth 2.0 client_credentials or API keys)

**Example Agent-Friendly Endpoint:**
```yaml
paths:
  /api/v1/products/search:
    post:
      operationId: searchProducts
      summary: Search product catalog
      description: >
        Search the product catalog by keyword, category, price range, or availability.
        Returns paginated results sorted by relevance. Use this endpoint when an agent
        needs to find products matching specific criteria for comparison or purchase.
      tags:
        - Products
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                query:
                  type: string
                  description: "Search keywords (product name, brand, or SKU)"
                  example: "wireless bluetooth headphones"
                category:
                  type: string
                  enum: [electronics, clothing, home, sports, food]
                  description: "Filter by product category"
                min_price:
                  type: number
                  minimum: 0
                  description: "Minimum price in USD"
                max_price:
                  type: number
                  minimum: 0
                  description: "Maximum price in USD"
                in_stock:
                  type: boolean
                  default: true
                  description: "Only return products currently available for purchase"
                page:
                  type: integer
                  default: 1
                  minimum: 1
                  description: "Page number for pagination"
                page_size:
                  type: integer
                  default: 20
                  minimum: 1
                  maximum: 100
                  description: "Number of results per page"
              required: [query]
            examples:
              basic_search:
                summary: Simple keyword search
                value:
                  query: "wireless bluetooth headphones"
                  in_stock: true
              filtered_search:
                summary: Search with price filter
                value:
                  query: "running shoes"
                  category: "sports"
                  min_price: 50
                  max_price: 150
                  in_stock: true
      responses:
        '200':
          description: Successful search results
          content:
            application/json:
              schema:
                type: object
                properties:
                  products:
                    type: array
                    items:
                      $ref: '#/components/schemas/Product'
                  total_count:
                    type: integer
                    description: "Total number of matching products"
                  page:
                    type: integer
                  page_size:
                    type: integer
        '400':
          description: Invalid search parameters
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error_code: "INVALID_PRICE_RANGE"
                message: "min_price cannot be greater than max_price"
                type: "validation_error"
```

### agents.json Extension (by Wildcard AI)

Built on top of OpenAPI, agents.json adds:
- **Flows**: Multi-step contracts combining multiple API calls to achieve an outcome
- **Links**: Connectors describing how sequential actions integrate
- Location: `/.well-known/agents.json`
- Current version: 0.1.0

This solves the gap where OpenAPI describes individual endpoints but not how they work together for multi-step agent workflows.

### AgentHermes Recommendation: **REQUIRE** (for businesses with APIs)

**Rationale:** OpenAPI is the foundation that agents.json, MCP tool generation, and A2A skill definitions all build upon. Without a well-documented OpenAPI spec, an agent cannot understand a business's API. Every agent framework (LangChain, CrewAI, Semantic Kernel, Google ADK) can consume OpenAPI specs directly.

**Scoring Weight:** HIGH (15-20 points of the 100-point score)

**Minimum for points:** OpenAPI 3.1+ spec available at a discoverable endpoint with descriptions, types, and at least one example per endpoint. Full points for comprehensive spec with all parameters documented, multiple examples, structured error responses, consistent naming, tags, and machine-to-machine auth. Businesses without APIs should expose at least Schema.org/JSON-LD instead.

**Note:** For businesses without REST APIs (e.g., retail stores, service businesses), this category's weight should shift to Schema.org/JSON-LD and MCP.

---

## 6. Schema.org / JSON-LD

### Overview

| Field | Value |
|-------|-------|
| **Full Name** | Schema.org vocabulary + JSON-LD format |
| **Backing Organization** | Schema.org (Google, Microsoft, Yahoo, Yandex) |
| **Current Version** | Schema.org 28.x (continuously updated) |
| **Format** | JSON-LD (W3C standard) |
| **Status** | Universal web standard, AI significance growing rapidly |

### What It Is

Schema.org provides a shared vocabulary for structured data markup on web pages. JSON-LD (JavaScript Object Notation for Linked Data) is the preferred format for embedding this structured data. While originally designed for search engine rich results, it has become critical for AI agent discovery.

### Impact on AI Agent Discovery

- GPT-4 accuracy for product recognition rises from 16% to 54% with structured content
- Schema-compliant pages are cited 3.1x more frequently in AI Overviews
- AI search traffic converts at 14.2% vs Google organic's 2.8%
- Sites with proper LocalBusiness schema see 3.5x more voice search traffic
- 34% of US online shoppers have used an AI agent for purchase decisions (up from 9% in 2024)

### Most Important Schema Types for Commerce

#### Organization (REQUIRED for all businesses)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Corporation",
  "url": "https://acme.com",
  "logo": "https://acme.com/logo.png",
  "description": "B2B SaaS inventory management for e-commerce businesses",
  "foundingDate": "2018-01-15",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-512-555-0100",
    "contactType": "customer service",
    "availableLanguage": ["English", "Spanish"]
  },
  "sameAs": [
    "https://twitter.com/acmecorp",
    "https://linkedin.com/company/acmecorp",
    "https://github.com/acmecorp"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Commerce Blvd",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701",
    "addressCountry": "US"
  }
}
```

#### Product (REQUIRED for e-commerce)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Bluetooth Headphones Pro",
  "sku": "WBH-PRO-001",
  "image": "https://acme.com/products/headphones-pro.jpg",
  "description": "Premium noise-canceling wireless headphones with 40-hour battery life",
  "brand": {
    "@type": "Brand",
    "name": "Acme Audio"
  },
  "offers": {
    "@type": "Offer",
    "price": "149.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://acme.com/products/headphones-pro",
    "priceValidUntil": "2026-12-31",
    "seller": {
      "@type": "Organization",
      "name": "Acme Corporation"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "2340"
  }
}
```

#### LocalBusiness (REQUIRED for physical locations)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Acme Store Downtown",
  "image": "https://acme.com/stores/downtown.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "456 Main Street",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "30.2672",
    "longitude": "-97.7431"
  },
  "telephone": "+1-512-555-0200",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "$$"
}
```

#### Service (REQUIRED for service businesses)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Inventory Management Pro",
  "description": "Real-time inventory tracking and demand forecasting for e-commerce",
  "provider": {
    "@type": "Organization",
    "name": "Acme Corporation"
  },
  "serviceType": "SaaS",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "offers": {
    "@type": "Offer",
    "price": "49.00",
    "priceCurrency": "USD",
    "description": "Monthly subscription, Starter plan"
  }
}
```

#### FAQPage (RECOMMENDED)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What integrations do you support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We integrate with 200+ platforms including Shopify, WooCommerce, Amazon, eBay, and BigCommerce."
      }
    }
  ]
}
```

### Best Practices for AI Agents

1. **Consistency**: Use identical business names across all schema instances
2. **Accuracy**: Prices in schema must match displayed prices
3. **Freshness**: Update `dateModified` regularly
4. **Absolute URLs**: Never use relative paths
5. **ISO formats**: Dates in ISO 8601 with timezone, phone numbers with country codes
6. **Standard values**: Use only official Schema.org availability values (InStock, OutOfStock, PreOrder)
7. **Keep JSON-LD blocks under 50KB total**
8. **Use `@id` properties** for internal cross-references to avoid duplication

### AgentHermes Recommendation: **REQUIRE**

**Rationale:** Schema.org/JSON-LD is the most universally consumed structured data format on the web. AI agents, search engines, voice assistants, and shopping agents all parse it. A business without structured data is invisible to the vast majority of automated systems. This is the lowest barrier to entry for agent readiness.

**Scoring Weight:** HIGH (15-20 points of the 100-point score)

**Minimum for points:** Organization schema present on homepage. Product schema on product pages (if e-commerce). LocalBusiness schema (if physical location). Full points for comprehensive coverage including FAQPage, Service/OfferCatalog, AggregateRating, and proper `sameAs` links.

---

## 7. Additional Protocols

### 7a. Universal Commerce Protocol (UCP)

| Field | Value |
|-------|-------|
| **Backing Organization** | Google, with Shopify, Etsy, Wayfair, Target, Walmart, Stripe, Visa, Mastercard |
| **Launched** | January 2026 (NRF conference) |
| **Spec URL** | ucp.dev |
| **Status** | Active, rapidly growing, commerce-specific |

**What It Is:** An open standard defining building blocks for agentic commerce — from discovery and buying to post-purchase experiences. Built on REST, JSON-RPC, and integrates with A2A, MCP, and AP2 (Agent Payments Protocol).

**Building Blocks:**
1. **Checkout** — Cart logic, dynamic pricing, tax calculations
2. **Identity Linking** — OAuth 2.0 for agent-to-merchant auth without credential sharing
3. **Order Management** — Tracking, returns, post-purchase

**Key Features:**
- Tokenized payments and verifiable credentials
- Real-time product details (pricing, inventory) from retailer catalogs
- Multi-item cart support for shopping agents
- Identity Linking for loyalty benefits
- Retailers retain control as Merchant of Record

**AgentHermes Recommendation:** **RECOMMEND** (REQUIRE for e-commerce businesses)

**Scoring Weight:** MEDIUM (5-10 points, or 15 points for e-commerce)

### 7b. AGENTS.md

| Field | Value |
|-------|-------|
| **Backing Organization** | OpenAI, Linux Foundation (AAIF) |
| **Launched** | August 2025 |
| **Status** | Open standard, 60,000+ repos adopted |
| **Format** | Markdown file at project root |

**What It Is:** A markdown file providing AI coding agents with project-specific guidance (build commands, conventions, testing requirements). Primarily for software repositories, not business websites. However, relevant for tech companies whose products are codebases.

**Adopted by:** Amp, Codex, Cursor, Devin, Factory, Gemini CLI, GitHub Copilot, Jules, VS Code.

**AgentHermes Recommendation:** **RECOMMEND** (for tech companies with public repos/APIs)

**Scoring Weight:** LOW (2-5 points)

### 7c. AG-UI (Agent-User Interaction Protocol)

| Field | Value |
|-------|-------|
| **Backing Organization** | CopilotKit, adopted by Google, LangChain, AWS, Microsoft |
| **Status** | Open protocol, growing |
| **Spec URL** | docs.ag-ui.com |

**What It Is:** Event-based protocol (HTTP POST + SSE stream) standardizing how AI agents connect to user-facing applications. While MCP handles agent-to-tool and A2A handles agent-to-agent, AG-UI handles agent-to-frontend.

**AgentHermes Recommendation:** **TRACK** (not score yet)

**Rationale:** Relevant for businesses building agent-powered UIs, but not a discovery/readiness signal. Track for future inclusion.

### 7d. Agent Network Protocol (ANP)

| Field | Value |
|-------|-------|
| **Backing Organization** | Open source community, W3C Community Group |
| **Status** | Draft specification |
| **GitHub** | github.com/agent-network-protocol/AgentNetworkProtocol |

**What It Is:** Peer-to-peer agent communication protocol using JSON-LD, DID-based identity, and `.well-known` URIs. Three-layer architecture: identity/encryption, meta-protocol negotiation, and application protocol.

Two discovery mechanisms:
- **Active discovery**: Search engines crawl agent descriptions at known domains
- **Passive discovery**: Agents register with search services

**AgentHermes Recommendation:** **TRACK** (not score yet)

**Rationale:** Too early, not yet adopted by major platforms.

### 7e. agents.json (by Wildcard AI)

| Field | Value |
|-------|-------|
| **Backing Organization** | Wildcard AI |
| **Version** | 0.1.0 |
| **Location** | `/.well-known/agents.json` |

**What It Is:** Extends OpenAPI with agent-specific optimizations — adds "Flows" (multi-step API call sequences) and "Links" (how sequential actions integrate). Optimized for LLM consumption rather than human readability.

**AgentHermes Recommendation:** **RECOMMEND**

**Scoring Weight:** LOW (3-5 points bonus on top of OpenAPI score)

### 7f. RSL (Really Simple Licensing) 1.0

Already covered in Section 4 (Robots.txt for Agents). Bonus points for implementation.

### 7g. Well-Known URIs Summary

All discoverable agent endpoints a business should consider:

| URI | Protocol | Purpose |
|-----|----------|---------|
| `/.well-known/agent-card.json` | A2A | Agent Card for A2A discovery |
| `/.well-known/mcp/server-card.json` | MCP (proposed) | MCP server metadata |
| `/.well-known/mcp` | MCP (proposed) | MCP endpoint enumeration |
| `/.well-known/agents.json` | agents.json | OpenAPI extension for agent flows |
| `/.well-known/openapi.json` | OpenAPI | API specification |
| `/llms.txt` | llms.txt | Content map for LLMs |
| `/robots.txt` | Robots Exclusion | Crawler access policies |

---

## 8. Scoring Recommendations Summary

### Proposed Point Allocation (100-point scale)

| Protocol | Category | Weight | Points | Requirement Level |
|----------|----------|--------|--------|-------------------|
| **A2A Agent Card** | Agent Discovery | HIGH | 20-25 | REQUIRE |
| **MCP Server** | Agent Interaction | HIGH | 20-25 | REQUIRE |
| **Schema.org / JSON-LD** | Structured Data | HIGH | 15-20 | REQUIRE |
| **OpenAPI Spec** | API Readiness | HIGH | 15-20 | REQUIRE (if API exists) |
| **Robots.txt (AI directives)** | Access Policy | MEDIUM | 10-15 | REQUIRE |
| **llms.txt** | Content Discovery | LOW-MEDIUM | 5-10 | RECOMMEND |
| **UCP** | Commerce | MEDIUM | 5-10 | RECOMMEND (REQUIRE for e-commerce) |
| **agents.json** | API Flows | LOW | 3-5 | RECOMMEND |
| **AGENTS.md** | Dev Readiness | LOW | 2-5 | RECOMMEND (for tech companies) |

### Tier Classification

**Tier 1 — Must Have (70-85 points possible):**
- A2A Agent Card at `/.well-known/agent-card.json`
- MCP Server with Streamable HTTP transport
- Schema.org/JSON-LD on all key pages
- OpenAPI 3.1+ spec at discoverable endpoint (if API exists)
- Robots.txt with explicit AI crawler directives

**Tier 2 — Should Have (15-25 bonus points):**
- llms.txt with content map
- UCP implementation (e-commerce)
- agents.json with multi-step flows
- AGENTS.md (tech companies)

**Tier 3 — Track for Future (no points yet):**
- AG-UI (agent-to-frontend)
- ANP (peer-to-peer agents)
- ACDP (DNS-based discovery)

### Median Score Context

Current median across 2,600+ companies is 41/100. This suggests most businesses have:
- Partial Schema.org implementation (Organization only, missing Product/Service)
- Basic robots.txt (no AI-specific directives)
- No A2A Agent Card
- No MCP Server
- No llms.txt
- API docs behind human-only authentication

A score of 80+ should represent a business that an AI agent can fully discover, understand, authenticate with, and transact through without human intervention.

---

## Sources

### A2A Protocol
- [Google Developers Blog: Announcing A2A](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [A2A Protocol Specification (Latest)](https://a2a-protocol.org/latest/specification/)
- [A2A Agent Discovery](https://a2a-protocol.org/latest/topics/agent-discovery/)
- [A2A Protocol GitHub](https://github.com/a2aproject/A2A)
- [A2A Agent Skills & Card Tutorial](https://a2a-protocol.org/latest/tutorials/python/3-agent-skills-and-card/)
- [Google Cloud Blog: A2A Upgrade](https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade)
- [IBM: What Is A2A](https://www.ibm.com/think/topics/agent2agent-protocol)
- [Linux Foundation: A2A Project Launch](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents)

### MCP
- [MCP Specification (2025-11-25)](https://modelcontextprotocol.io/specification/2025-11-25)
- [MCP Tools Specification](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [MCP Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)
- [MCP 2026 Roadmap](http://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)
- [MCP Registry](https://nordicapis.com/getting-started-with-the-official-mcp-registry-api/)
- [SEP-1649: MCP Server Cards](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649)
- [SEP-1960: Well-Known MCP Discovery](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1960)
- [15 Best Practices for Building MCP Servers](https://thenewstack.io/15-best-practices-for-building-mcp-servers-in-production/)
- [Anthropic: Donating MCP to AAIF](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)

### llms.txt
- [llms.txt Specification](https://llmstxt.org/)
- [Answer.AI: llms.txt Proposal](https://www.answer.ai/posts/2024-09-03-llmstxt.html)
- [Mintlify: What is llms.txt](https://www.mintlify.com/blog/what-is-llms-txt)
- [Is llms.txt Dead? Adoption State](https://llms-txt.io/blog/is-llms-txt-dead)
- [Semrush: What Is llms.txt](https://www.semrush.com/blog/llms-txt/)
- [Bluehost: llms.txt 2026 Guide](https://www.bluehost.com/blog/what-is-llms-txt/)

### Robots.txt & AI Crawlers
- [Cloudflare: Who's Crawling Your Site in 2025](https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/)
- [Anthropic Claude Bots: Three-Bot Framework](https://almcorp.com/blog/anthropic-claude-bots-robots-txt-strategy/)
- [RSL 1.0 Specification](https://rslstandard.org/rsl)
- [RSL Standard Announcement](https://rslstandard.org/press/rsl-1-specification-2025)
- [AI Bots and Robots.txt Analysis](https://paulcalvano.com/2025-08-21-ai-bots-and-robots-txt/)
- [GitHub: ai.robots.txt](https://github.com/ai-robots-txt/ai.robots.txt)

### OpenAPI
- [OpenAPI 3.2.0 Specification](https://spec.openapis.org/oas/v3.2.0.html)
- [OpenAPI 3.2 Announcement](https://www.openapis.org/blog/2025/09/23/announcing-openapi-v3-2)
- [Making APIs Agent-Ready (digitalapi.ai)](https://www.digitalapi.ai/blogs/how-to-make-your-apis-ready-for-ai-agents)
- [agents.json Specification (Wildcard AI)](https://github.com/wild-card-ai/agents-json)
- [Xano: OpenAPI Definitive Guide 2026](https://www.xano.com/blog/openapi-specification-the-definitive-guide/)

### Schema.org / JSON-LD
- [JSON-LD Masterclass for AI Agents](https://www.jasminedirectory.com/blog/json-ld-masterclass-implementing-schema-for-ai-agents/)
- [Schema for E-commerce: Products for AI Agents](https://www.jasminedirectory.com/blog/schema-for-e-commerce-making-your-products-speak-to-ai-agents/)
- [Schema Markup for AI Search (Alhena)](https://alhena.ai/blog/schema-markup-ai-search-ecommerce/)
- [Schema.org Types Tutorial](https://schemaengineai.com/blog/schema-org-tutorial-beginners-guide/)

### UCP
- [UCP Specification](https://ucp.dev/)
- [Google Developers: Under the Hood UCP](https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/)
- [Google: Agentic Commerce Tools](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/)
- [Shopify Engineering: Building UCP](https://shopify.engineering/ucp)

### AAIF / AGENTS.md
- [Linux Foundation: AAIF Announcement](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [OpenAI: Agentic AI Foundation](https://openai.com/index/agentic-ai-foundation/)
- [TechCrunch: OpenAI, Anthropic, Block Join AAIF](https://techcrunch.com/2025/12/09/openai-anthropic-and-block-join-new-linux-foundation-effort-to-standardize-the-ai-agent-era/)

### Protocol Comparisons
- [Top AI Agent Protocols in 2026 (GetStream)](https://getstream.io/blog/ai-agent-protocols/)
- [The Register: Alphabet Soup of Agentic AI Protocols](https://www.theregister.com/2026/01/30/agnetic_ai_protocols_mcp_utcp_a2a_etc/)
- [Google Developers: Guide to AI Agent Protocols](https://developers.googleblog.com/developers-guide-to-ai-agent-protocols/)
- [AG-UI Protocol (CopilotKit)](https://docs.ag-ui.com/)
- [Agent Network Protocol](https://agent-network-protocol.com/specs/agent-discovery.html)
