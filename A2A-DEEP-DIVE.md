# A2A Protocol Deep Dive -- What It Means for AgentHermes

> Research date: 2026-03-30
> Sources: Google A2A specification (a2a-protocol.org), GitHub (a2aproject/A2A), Linux Foundation AAIF announcements, IBM, HuggingFace, DigitalOcean, Auth0, multiple industry analyses. See Sources section at end.

---

## Table of Contents

1. [What Exactly Is A2A?](#1-what-exactly-is-a2a)
2. [A2A vs MCP -- How Are They Different?](#2-a2a-vs-mcp)
3. [Who Is Adopting A2A?](#3-who-is-adopting-a2a)
4. [The Agent Card Standard](#4-the-agent-card-standard)
5. [The Task Lifecycle](#5-the-task-lifecycle)
6. [Other Agent Protocols](#6-other-agent-protocols)
7. [The Convergence Question](#7-the-convergence-question)
8. [What This Means for AgentHermes](#8-what-this-means-for-agenthermes)
9. [Gap Analysis: Our A2A Implementation vs Spec](#9-gap-analysis)
10. [Strategic Recommendations](#10-strategic-recommendations)

---

## 1. What Exactly Is A2A?

### The Problem It Solves

AI agents are being built on dozens of different frameworks (LangChain, CrewAI, AutoGen, OpenAI Assistants, Google ADK, etc.) by different companies, deployed on different servers, with no standard way to talk to each other. Without a protocol, every pair of agents needs a custom integration. That is N-squared complexity. A2A reduces it to N.

**Analogy:** HTTP let any web browser talk to any web server. A2A lets any AI agent talk to any other AI agent, regardless of who built it or what framework it runs on.

### Core Concept

A2A (Agent-to-Agent Protocol) is an open protocol enabling communication and interoperability between **opaque** agentic applications. "Opaque" is the key word -- agents do NOT need to share their internal prompts, memory, tool chains, or reasoning. They communicate through a structured task interface, like black boxes with a well-defined API contract.

### Timeline

| Date | Event |
|------|-------|
| April 9, 2025 | Google announces A2A with 50+ technology partners |
| June 2025 | A2A donated to the Linux Foundation |
| August 2025 | IBM's Agent Communication Protocol (ACP) merges into A2A |
| December 2025 | Linux Foundation launches Agentic AI Foundation (AAIF), co-founded by OpenAI, Anthropic, Google, Microsoft, AWS, and Block. Houses both A2A and MCP. |
| Q1 2026 | A2A v0.3 released with gRPC support, signed agent cards, expanded SDKs (Python, JS, Java, .NET) |
| March 2026 | 100+ companies supporting A2A. Official registries emerging. |

### How It Works Technically

A2A has four pillars:

**1. Capability Discovery (Agent Cards)**
Every A2A-compliant agent publishes a JSON document at `/.well-known/agent-card.json` describing what it can do, what protocols it supports, and how to authenticate. Other agents fetch this card to decide whether to delegate work.

**2. Task Management (Stateful Task Lifecycle)**
The core unit of work is a **Task**. A client agent sends a task to a server agent. The task progresses through defined states: `submitted` -> `working` -> `completed` (or `failed`, `cancelled`, `input-required`, `rejected`). Tasks are persistent and queryable.

**3. Collaboration (Messages, Artifacts, Parts)**
Agents exchange information through **Messages** (units of communication) containing **Parts** (text, files, structured data). When an agent produces output, it creates **Artifacts** (documents, images, structured data) also composed of Parts.

**4. UX Negotiation**
Agents declare their supported input/output MIME types. A text-only agent can still collaborate with a multimodal agent -- they negotiate the format.

### Transport

A2A is built on existing web standards:
- **HTTP** for request/response
- **Server-Sent Events (SSE)** for streaming
- **JSON-RPC 2.0** for message framing
- **gRPC** (added in v0.3) for high-performance binary transport

### Core Methods

| Method | Purpose |
|--------|---------|
| `tasks/send` | Submit a new task to the server agent |
| `tasks/get` | Check the status/result of an existing task |
| `tasks/cancel` | Cancel a pending/working task |
| `tasks/sendSubscribe` | Submit a task and get streaming SSE updates |
| `tasks/resubscribe` | Reconnect to an existing task's SSE stream |

---

## 2. A2A vs MCP

### The Short Answer

They are **complementary, not competing.** They solve different layers of the same problem.

| Aspect | MCP (Anthropic) | A2A (Google) |
|--------|-----------------|--------------|
| **Relationship** | Agent-to-Tool | Agent-to-Agent |
| **Analogy** | USB-C port | HTTP protocol |
| **What it connects** | An LLM/agent to external tools, databases, APIs | Two autonomous agents to each other |
| **Opacity** | Tools are transparent -- the agent sees tool schemas and calls them directly | Agents are opaque -- they don't share internals, just task interfaces |
| **State** | Stateless (call tool, get response) | Stateful (tasks have lifecycle, can be long-running) |
| **Discovery** | Tool manifests, resource URIs | Agent Cards at `/.well-known/agent-card.json` |
| **Transport** | stdio, SSE, HTTP | HTTP, SSE, gRPC |
| **Governance** | Linux Foundation (AAIF) | Linux Foundation (AAIF) |
| **Maturity** | 97M monthly SDK downloads (Feb 2026) | 100+ partners, growing fast |

### How They Work Together

```
Human: "Book me the cheapest flight to Tokyo next week"

  1. ORCHESTRATOR AGENT receives the request
  2. Via MCP: calls local tools (calendar, email, preferences DB)
  3. Via A2A: delegates to TRAVEL AGENT (discovered via Agent Card)
     -> Travel Agent uses MCP internally to call Kayak API, Google Flights API
     -> Travel Agent returns Artifact: {flight options, prices, links}
  4. Via A2A: delegates to PAYMENT AGENT to hold/charge
  5. Via MCP: updates user's calendar with booking
```

MCP gives an agent **hands** (to use tools). A2A gives an agent **colleagues** (to delegate work to specialists).

### Can a Business Support Both?

**Yes, and they should.** A business can expose:
- An **MCP server** for agents that want to call its tools directly (e.g., `search_products`, `create_order`)
- An **A2A endpoint** for agents that want to delegate higher-level tasks (e.g., "find me the best laptop under $1000")
- Both discovery mechanisms: `/.well-known/mcp.json` for MCP and `/.well-known/agent-card.json` for A2A

AgentHermes already does this -- we have both `/api/mcp` and `/api/a2a`.

---

## 3. Who Is Adopting A2A?

### Launch Partners (50+, April 2025)

**Technology companies:** Atlassian, Box, Cohere, Intuit, LangChain, MongoDB, PayPal, Salesforce, SAP, ServiceNow, UKG, Workday

**Service providers:** Accenture, BCG, Capgemini, Cognizant, Deloitte, HCLTech, Infosys, KPMG, McKinsey, PwC, TCS, Wipro

### AAIF Founding Members (December 2025)

OpenAI, Anthropic, Google, Microsoft, AWS, and Block (Square/Cash App) co-founded the Agentic AI Foundation under the Linux Foundation. This is **every major AI company** agreeing on A2A + MCP as THE standards.

### By March 2026

- 100+ companies contributing to or implementing A2A
- Official SDKs: Python, JavaScript, Java, C#/.NET
- Cloud platform support: Google Cloud (Agent Engine), AWS (Bedrock AgentCore), Microsoft (Agent Framework)
- Huawei open-sourced A2A-T (telecom-specific A2A variant) at MWC 2026
- LangChain has built-in A2A endpoint support in LangSmith Agent Server
- Multiple third-party registries have launched

### A2A Registries (The Discovery Layer)

| Registry | URL | Status |
|----------|-----|--------|
| a2a-registry.org | https://www.a2a-registry.org | Community-driven, searchable directory |
| a2a-registry.dev | https://a2a-registry.dev | Open-source, health checks every 30 min |
| a2aregistry.org | https://a2aregistry.org | Python SDK-based, live agents directory |
| a2agent.net | https://a2agent.net | Agent registration + discovery API |

**Key insight: These are all early, fragmented, community-driven projects. There is no dominant, authoritative A2A registry yet.** This is exactly the opportunity AgentHermes should evaluate.

---

## 4. The Agent Card Standard

### Location

Per RFC 8615 (well-known URIs):
```
https://{domain}/.well-known/agent-card.json
```

Note: The official A2A spec uses `agent-card.json`, NOT `agent.json`. Our current implementation at `/.well-known/agent.json` is non-standard and should be updated.

### Required Fields (v0.3)

```json
{
  "name": "string (REQUIRED)",
  "url": "string (REQUIRED) -- service endpoint URL",
  "version": "string (REQUIRED) -- A2A protocol version",
  "capabilities": {  // REQUIRED
    "streaming": true/false,
    "pushNotifications": true/false,
    "stateTransitionHistory": true/false
  },
  "skills": [  // REQUIRED -- array of AgentSkill objects
    {
      "id": "string (REQUIRED)",
      "name": "string (REQUIRED)",
      "description": "string",
      "inputModes": ["text/plain", "application/json"],
      "outputModes": ["text/plain", "application/json"]
    }
  ]
}
```

### Optional Fields

```json
{
  "description": "string",
  "provider": {
    "organization": "string",
    "url": "string"
  },
  "documentationUrl": "string",
  "iconUrl": "string",
  "authentication": {
    "schemes": ["Bearer", "Basic", "OAuth2"],
    "credentials": "string -- instructions"
  },
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["text/plain"],
  "supportsAuthenticatedExtendedCard": true/false,
  "security": {
    "signed": true/false,
    "signatureAlgorithm": "string",
    "publicKey": "string"
  }
}
```

### Security (New in v0.3)

Agent Cards can be **cryptographically signed**. Before signing, the card content MUST be canonicalized using JSON Canonicalization Scheme (JCS, RFC 8785). This prevents tampering and enables trust chains.

### How Agents Discover Agent Cards Today

Three mechanisms in the spec:

1. **Well-Known URI** -- HTTP GET `/.well-known/agent-card.json`. Simplest. Anyone can check.
2. **Central Registry** -- Agent publishes its card to a registry. Clients query the registry by skill, tag, or capability.
3. **Agent Naming Service (ANS)** -- Proposed but not yet standardized. Skill-based and capability-based discovery (like DNS but for agents).

**The gap: There is no dominant central registry.** The protocol spec defines HOW to discover, but not WHERE. Multiple community registries exist but none has achieved critical mass.

---

## 5. The Task Lifecycle

### States

```
submitted --> working --> completed
                |           |
                +--> input-required (needs more info from client)
                |           |
                +--> failed
                |
                +--> cancelled
                |
                +--> rejected (server refuses the task)
                |
                +--> auth-required (needs authentication)
                |
                +--> unknown
```

Terminal states (cannot restart): `completed`, `failed`, `cancelled`, `rejected`

### Task Object

```json
{
  "id": "unique-task-id",
  "contextId": "optional-conversation-context",
  "status": {
    "state": "working",
    "message": { "role": "agent", "parts": [...] },
    "timestamp": "2026-03-30T12:00:00Z"
  },
  "artifacts": [
    {
      "artifactId": "result-1",
      "name": "Flight Options",
      "parts": [
        { "type": "text", "text": "Found 3 flights..." },
        { "type": "data", "data": { "flights": [...] } }
      ]
    }
  ],
  "history": [...],  // if stateTransitionHistory capability is true
  "metadata": {}
}
```

### Streaming

For long-running tasks, A2A supports SSE streaming:
- `tasks/sendSubscribe` -- submit task and get SSE stream
- Server sends `TaskStatusUpdateEvent` and `TaskArtifactUpdateEvent` events
- Stream MUST close when task reaches a terminal state

### Push Notifications

If the client can receive webhooks, it can provide a `pushNotificationConfig` with a callback URL. The server POSTs status updates to that URL when the task changes state.

---

## 6. Other Agent Protocols

### The Full Landscape (Q1 2026)

| Protocol | Creator | Layer | Status |
|----------|---------|-------|--------|
| **MCP** | Anthropic | Agent-to-Tool | Dominant. 97M monthly SDK downloads. AAIF. |
| **A2A** | Google | Agent-to-Agent | Growing fast. 100+ partners. AAIF. |
| **ACP** | IBM | Agent-to-Agent | Merged into A2A (Aug 2025). |
| **UCP** | Various | Agent-to-Commerce | Emerging. `/.well-known/ucp` for commercial transactions. |
| **AG-UI** | CopilotKit | Agent-to-User Interface | Event/state protocol for streaming agent actions to frontends. |
| **A2UI** | Google | Agent-to-UI Widgets | Generative UI specification. Agents deliver UI widgets. |
| **AGENTS.md** | OpenAI | Agent Instructions | Markdown file with project-specific agent guidance. In AAIF. |
| **x402** | Coinbase | Agent Payments | HTTP 402 Payment Required for machine-to-machine payments. |
| **MPP** | Multiple | Agent Payments | Machine Payment Protocol. |
| **Visa TAP** | Visa | Agent Trust/Identity | Transaction Authentication Protocol for agent identity. |
| **ERC-8004** | Ethereum | Agent Trust | On-chain agent identity and trust scoring. |

### Framework-Specific Communication

These are NOT protocols but frameworks with their own agent orchestration:

| Framework | Creator | Approach |
|-----------|---------|----------|
| **AutoGen (AG2)** | Microsoft | Multi-agent conversations, group chat patterns |
| **CrewAI** | CrewAI | Role-based agent crews, process flows |
| **LangGraph** | LangChain | Graph-based state machines for agent workflows |
| **OpenAI Swarm** | OpenAI | Lightweight agent handoff via function calls |
| **Google ADK** | Google | Agent Development Kit, native A2A support |
| **Amazon Bedrock AgentCore** | AWS | Native A2A protocol contract support |

The key difference: A2A is a wire protocol (like HTTP). These frameworks are runtimes (like Express.js). Frameworks can implement A2A to interoperate with agents built on other frameworks.

---

## 7. The Convergence Question

### Will There Be One Standard or Many?

**Many protocols, but a clear layering.** The industry is converging on a stack:

```
Layer 5: Agent-to-User       AG-UI / A2UI
Layer 4: Agent-to-Agent      A2A
Layer 3: Agent-to-Tool       MCP
Layer 2: Agent-to-Commerce   UCP / x402 / MPP
Layer 1: Agent-to-Identity   Visa TAP / ERC-8004 / signed Agent Cards
Layer 0: Transport            HTTP / SSE / gRPC / WebSocket
```

### Is MCP + A2A the Likely Combo?

**Yes. This is already happening.**

- Both are under the same foundation (AAIF under Linux Foundation)
- Both co-founded by the same six companies
- Both use JSON-RPC 2.0 and HTTP/SSE
- They solve different layers with zero overlap
- The MCP Dev Summit (April 2026, NYC) will discuss A2A integration

The emerging pattern: agents use MCP to connect to tools, A2A to connect to other agents, and UCP/x402 to handle payments. This is the TCP/IP stack of the agent economy.

### Where Does AgentHermes Fit?

AgentHermes sits at the **discovery and trust layer** -- we are the DNS + certificate authority of the agent economy:

```
Agent wants to find a restaurant booking service
  |
  1. Queries AgentHermes (A2A "discover-businesses" skill)
  2. Gets back scored, verified business profiles
  3. Checks Agent Readiness Score (trust signal)
  4. Fetches business's Agent Card
  5. Delegates task via A2A to the business's agent
  6. Payment flows through gateway
```

We don't compete with any protocol. We are the **registry, scorer, and trust layer** that makes all protocols discoverable.

---

## 8. What This Means for AgentHermes

### What We Already Have

| Feature | Status | Spec Compliance |
|---------|--------|----------------|
| A2A endpoint (`/api/a2a`) | Working | Partially compliant (JSON-RPC, tasks/send, tasks/get, tasks/cancel) |
| Agent Card (`/.well-known/agent.json`) | Working | Wrong filename (should be `agent-card.json`), missing v0.3 fields |
| A2A Discovery (`/api/a2a/discover`) | Working | Custom format, not standard A2A discovery |
| 5 A2A Skills | Working | score-business, discover-businesses, gateway-call, check-score, get-manifest |
| Task persistence (Supabase `a2a_tasks`) | Working | Good -- tasks are stored and queryable |
| Callback delivery | Working | Fire-and-forget POST to callback_url |
| MCP Server (`/api/mcp`) | Working | 14 tools, HTTP transport |
| D1 Scanner checks for agent cards | Working | Scans `/.well-known/agent.json`, `/agent-card.json`, `/agent.json` |

### What We Should Build

**Tier 1: Fix Our Own A2A Compliance (This Week)**

1. **Rename agent card endpoint** from `/.well-known/agent.json` to `/.well-known/agent-card.json` (keep the old one as redirect for backward compatibility)
2. **Update agent card format** to match v0.3 spec (add `capabilities.streaming`, `capabilities.pushNotifications`, `defaultInputModes`, `defaultOutputModes`, `provider`, `security`)
3. **Add SSE streaming** for `tasks/sendSubscribe` -- currently all tasks are synchronous
4. **Update D1 scanner** to also check `/.well-known/agent-card.json` (the correct path)

**Tier 2: Become the A2A Registry (Weeks 2-4)**

This is the biggest opportunity. The A2A spec defines agent cards but NOT a central registry. Multiple community projects are trying to fill this gap. None has critical mass. AgentHermes already has:
- 108 scanned businesses
- A scoring system
- Business profiles with capabilities
- An A2A discovery endpoint

We could become THE authoritative A2A agent card registry by:

5. **Agent Card Crawler** -- Crawl `/.well-known/agent-card.json` for every business we scan. Store and index the cards.
6. **Registry API** -- `POST /api/v1/registry/register` (submit your agent card URL), `GET /api/v1/registry/search` (find agents by skill/capability/vertical)
7. **Health Monitoring** -- Ping registered agent cards every 30 minutes. Track uptime. Remove dead agents.
8. **Registry-as-A2A-Skill** -- Add a "find-agent" A2A skill so other agents can discover agents through us via the A2A protocol itself
9. **Mega Agent** -- An "agent-finding agent" that uses natural language queries to match agent capabilities

**Tier 3: Agent Card Generation (Phase 3 of Existing Strategy)**

10. **Agent Card Generator** -- Business enters their URL, we auto-generate a compliant `agent-card.json` they can host
11. **Hosted Agent Cards** -- For businesses that cannot host their own, we host it at `agenthermes.ai/.well-known/agent-cards/{domain}.json`
12. **Agent Card Validator** -- `POST /api/v1/validate/agent-card` -- checks if a card is v0.3 compliant, returns issues
13. **Agent Card Signing** -- Generate signed agent cards per v0.3 spec (JCS canonicalization + signature)

**Tier 4: Multi-Protocol Hub**

14. **Protocol Bridge** -- Agent sends A2A task to AgentHermes. We route it to the target business's MCP server, REST API, or A2A endpoint -- whatever they support.
15. **Universal Discovery** -- One search that returns results from A2A agent cards, MCP manifests, OpenAPI specs, and llms.txt files.

---

## 9. Gap Analysis

### Our Agent Card vs A2A v0.3 Spec

| Field | v0.3 Spec | Our Current Card | Gap |
|-------|-----------|-----------------|-----|
| Endpoint | `/.well-known/agent-card.json` | `/.well-known/agent.json` | WRONG FILENAME |
| `name` | Required | "AgentHermes" | OK |
| `url` | Required (service endpoint) | "https://agenthermes.ai" | Should be task endpoint |
| `version` | Required (protocol version) | "1.0.0" (product version) | Should be A2A protocol version "0.3" |
| `capabilities` | Required object | Nested under custom structure | Non-standard format |
| `capabilities.streaming` | boolean | Not present | MISSING |
| `capabilities.pushNotifications` | boolean | Not present | MISSING |
| `capabilities.stateTransitionHistory` | boolean | Not present | MISSING |
| `skills` | Required array of AgentSkill | Present but non-standard schema | Needs `inputModes`/`outputModes` |
| `skills[].id` | Required | Present | OK |
| `skills[].name` | Required | Present | OK |
| `skills[].description` | Optional | Present | OK |
| `skills[].inputModes` | MIME types | Not present | MISSING |
| `skills[].outputModes` | MIME types | Not present | MISSING |
| `provider` | Optional object | Not present | MISSING |
| `documentationUrl` | Optional | Not present | Should point to /developers |
| `iconUrl` | Optional | Not present | Should point to logo |
| `authentication` | Optional | Custom format | Non-standard |
| `defaultInputModes` | Optional | Not present | MISSING |
| `defaultOutputModes` | Optional | Not present | MISSING |
| `security` | Optional (v0.3) | Not present | Not critical yet |

### Our A2A Task Protocol vs Spec

| Feature | v0.3 Spec | Our Implementation | Gap |
|---------|-----------|-------------------|-----|
| `tasks/send` | Synchronous task submission | Implemented | OK (mostly) |
| `tasks/get` | Status check | Implemented | OK |
| `tasks/cancel` | Cancel pending task | Implemented | OK |
| `tasks/sendSubscribe` | SSE streaming | NOT implemented | MISSING |
| `tasks/resubscribe` | Reconnect SSE | NOT implemented | MISSING |
| Task states | submitted, working, input-required, completed, failed, cancelled, rejected, auth-required | working, completed, failed, cancelled | MISSING STATES |
| Messages | Structured with role + parts | Not used | MISSING |
| Artifacts | Structured output objects | Results are raw JSON | NON-STANDARD |
| Parts | text, file, data content types | Not used | MISSING |
| Push notifications | Webhook callback | Basic callback exists | PARTIAL |
| Context management | contextId for conversations | Not implemented | MISSING |
| gRPC transport | v0.3 addition | Not implemented | NOT CRITICAL |

### Our Scanner vs A2A Discovery

| Check | Current Scanner | Should Add |
|-------|----------------|-----------|
| Agent card at `/.well-known/agent.json` | YES | Keep |
| Agent card at `/.well-known/agent-card.json` | NO | ADD (this is the official path) |
| Agent card at `/agent-card.json` | NO | ADD |
| Card has required v0.3 fields | Checks name/skills/capabilities/url | Add version, capabilities object |
| Card is signed | NO | ADD (bonus points) |
| A2A task endpoint responds | NO | ADD (try tasks/send) |
| A2A streaming support | NO | ADD (check capabilities.streaming) |

---

## 10. Strategic Recommendations

### The Big Bet: A2A Registry

**The A2A protocol has a gaping hole: there is no authoritative, trusted agent card registry.** Multiple community projects (a2a-registry.org, a2a-registry.dev, a2aregistry.org, a2agent.net) are trying to fill it, but they are all small, fragmented, and lack trust signals.

AgentHermes is uniquely positioned because we already have:
- A scoring/trust system (the Agent Readiness Score)
- 108+ scanned businesses
- Domain expertise in what makes a business agent-ready
- An A2A endpoint with 5 skills
- An MCP server with 14 tools
- A self-service onboarding flow

**Recommendation: Add A2A agent card registry functionality to AgentHermes as a P0 priority.** This means:

1. Crawl and index `/.well-known/agent-card.json` for every business we scan
2. Accept registrations via `POST /api/v1/registry/register`
3. Expose search via A2A skill ("find-agent") and REST API
4. Validate cards against v0.3 spec
5. Health-check registered agents every 30 minutes
6. Display agent cards alongside Agent Readiness Scores on business profiles

### The Positioning

```
Today:    AgentHermes = "Agent Readiness Score" (the FICO of agent commerce)
Tomorrow: AgentHermes = "Agent Readiness Score + Agent Card Registry" (the FICO + Dun & Bradstreet)
```

The registry creates a **network effect** -- every agent card indexed makes discovery more valuable, which attracts more registrations, which attracts more agent queries. The scoring system provides the trust layer that raw registries lack.

### Immediate Action Items

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Rename agent card to `/.well-known/agent-card.json` | 1 hour | Spec compliance |
| P0 | Update agent card to v0.3 format | 2 hours | Spec compliance |
| P0 | Update D1 scanner to check `/.well-known/agent-card.json` | 1 hour | Better scoring |
| P1 | Add agent card crawling to scan pipeline | 4 hours | Foundation for registry |
| P1 | Build registry API (register, search, validate) | 8 hours | Core product |
| P1 | Add SSE streaming to A2A endpoint | 6 hours | Spec compliance |
| P2 | Agent Card Generator in remediation flow | 8 hours | Revenue driver |
| P2 | Health monitoring for registered agents | 4 hours | Trust signal |
| P2 | Structured Messages/Artifacts/Parts in A2A responses | 6 hours | Full spec compliance |
| P3 | Agent Card signing service | 8 hours | Premium feature |
| P3 | Protocol bridge (A2A -> MCP -> REST routing) | 16 hours | Differentiation |

### Revenue Implications

| Feature | Revenue Model |
|---------|--------------|
| Free scan + basic listing | Lead gen, freemium funnel |
| Agent Card Generator | Part of Pro tier ($49/mo) |
| Registry listing + health monitoring | Part of Business tier ($199/mo) |
| Agent Card signing | Enterprise feature |
| Protocol bridge (A2A->MCP routing) | Transaction fee (1-2%) |
| Registry API access (bulk queries) | API tier pricing |
| "AgentHermes Verified" badge on agent card | Certification fee ($99-499/yr) |

---

## Key Takeaways

1. **A2A is real and has critical mass.** With OpenAI, Anthropic, Google, Microsoft, AWS, and Block all co-founding AAIF, this is not a Google vanity project. It is THE standard for agent-to-agent communication.

2. **MCP + A2A is the winning combo.** MCP for tools, A2A for agents. They are complementary, co-governed, and co-evolving. AgentHermes should score and support both.

3. **The registry gap is our biggest opportunity.** The A2A spec defines agent cards but not where to find them. Multiple community registries exist but none has trust signals. AgentHermes's scoring system IS the trust layer.

4. **Our current A2A implementation is functional but non-compliant.** Wrong filename, wrong version format, missing v0.3 fields, no streaming, no structured messages/artifacts. These are fixable in 1-2 days.

5. **Agent Card generation is the killer feature for Phase 3 remediation.** A business scans at 35/100, we auto-generate a compliant agent card, they host it, re-scan at 60+. This is the "fix it" part of "Score It -> Fix It -> Connect It."

6. **The multi-protocol world is here.** MCP, A2A, UCP, AG-UI, x402, AGENTS.md -- all solving different layers. AgentHermes should be the universal discovery layer across ALL of them, not bet on just one.

---

## Sources

- [Announcing the Agent2Agent Protocol (A2A) - Google Developers Blog](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [Agent2Agent Protocol (A2A) Specification](https://a2a-protocol.org/latest/specification/)
- [A2A v0.3 Specification](https://a2a-protocol.org/v0.3.0/specification/)
- [Developer's Guide to AI Agent Protocols - Google](https://developers.googleblog.com/developers-guide-to-ai-agent-protocols/)
- [Agent2Agent Protocol Is Getting an Upgrade - Google Cloud Blog](https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade)
- [What Is Agent2Agent (A2A) Protocol? - IBM](https://www.ibm.com/think/topics/agent2agent-protocol)
- [A2A GitHub Repository](https://github.com/a2aproject/A2A)
- [MCP vs A2A: A Guide - Auth0](https://auth0.com/blog/mcp-vs-a2a/)
- [A2A vs MCP - DigitalOcean](https://www.digitalocean.com/community/tutorials/a2a-vs-mcp-ai-agent-protocols)
- [MCP vs A2A: The Complete Guide 2026 - DEV Community](https://dev.to/pockit_tools/mcp-vs-a2a-the-complete-guide-to-ai-agent-protocols-in-2026-30li)
- [Linux Foundation Launches A2A Protocol Project](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents)
- [AAIF Formation - Linux Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [MCP Joins the Agentic AI Foundation](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)
- [OpenAI Co-Founds AAIF](https://openai.com/index/agentic-ai-foundation/)
- [Agent Discovery - A2A Protocol](https://a2a-protocol.org/latest/topics/agent-discovery/)
- [Life of a Task - A2A Protocol](https://a2a-protocol.org/latest/topics/life-of-a-task/)
- [AgentCard Concept - A2A Community](https://agent2agent.info/docs/concepts/agentcard/)
- [A2A Registry - Global Registry](https://www.a2a-registry.org/)
- [Agent Discovery - A2A Registry](https://a2a-registry.dev/documentation/concepts/agent-discovery/)
- [AI Agent Protocol Ecosystem Map 2026](https://www.digitalapplied.com/blog/ai-agent-protocol-ecosystem-map-2026-mcp-a2a-acp-ucp)
- [AG-UI Protocol - CopilotKit](https://www.copilotkit.ai/ag-ui)
- [A2A Protocol Explained - HuggingFace](https://huggingface.co/blog/1bo/a2a-protocol-explained)
- [A2A Endpoint in LangChain Agent Server](https://docs.langchain.com/langsmith/server-a2a)
- [A2A Protocol Contract - Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-a2a-protocol-contract.html)
- [Huawei A2A-T Telecom Protocol - TechNode](https://technode.com/2026/03/02/mwc-2026-huawei-to-open-source-a2a-t-telecom-agent-protocol-software/)
- [Agent Discovery - Solo.io](https://www.solo.io/blog/agent-discovery-naming-and-resolution---the-missing-pieces-to-a2a)
