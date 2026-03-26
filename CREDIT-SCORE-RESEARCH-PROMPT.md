# AgentHermes Credit Score Research — Deep Dive

Paste this into a new Claude Code session. It sends research agents to design the definitive agent-readiness scoring standard.

---

You are researching how to design the definitive Agent Readiness Score — the FICO of the agent economy. AgentHermes.ai will be the trusted rating agency that every AI agent checks before transacting with a business.

## WHAT WE'VE BUILT SO FAR

AgentHermes currently audits businesses across these categories and scores 0-100:
- Machine-readable profile (A2A Agent Card, llms.txt)
- MCP/API endpoints (live, testable by agents)
- Agent-native onboarding (signup without human intervention)
- Structured pricing (machine-readable, agents can evaluate)
- Agent payment acceptance (wallet-to-wallet via Stripe Connect)

Tiers: Bronze (40-59), Silver (60-74), Gold (75-89), Platinum (90+)

The median score across 2,600+ companies is 41/100. Most businesses are invisible to agents.

McKinsey projects $1T in sales will flow through AI agents. Businesses that are invisible lose that revenue.

## WHAT WE NEED RESEARCHED

Send 5 parallel research agents. Each covers a different dimension:

### Agent 1: Protocol Standards Research
Research every protocol an agent-ready business should support:
- **A2A (Agent-to-Agent)** — Google-backed, Linux Foundation. What does a compliant A2A Agent Card look like? What fields are required vs optional? How do agents discover businesses via A2A?
- **MCP (Model Context Protocol)** — Anthropic. What makes a good MCP server? What tool definitions do agents need? SSE vs stdio transport?
- **llms.txt** — What is the standard? Who uses it? What should be in it?
- **robots.txt for agents** — How should businesses signal agent permissions?
- **OpenAPI 3.1** — For REST APIs. What makes an API agent-friendly vs human-friendly?
- **Schema.org / JSON-LD** — Structured data on websites. How do agents use it?
- **Any OTHER protocols** we should support that agents use for discovery

For each: what is it, who backs it, adoption rate, what a perfect implementation looks like, and whether we should REQUIRE or RECOMMEND it in our score.

WebSearch: "A2A agent card specification", "MCP server best practices", "llms.txt standard", "agent-readable business requirements 2026", "agent discovery protocols"

### Agent 2: Existing Rating Systems Research
Research how other industries built trusted scores:
- **FICO** — How did the credit score become the standard? What made it stick? What were the early adoption challenges?
- **Dun & Bradstreet** — How does business credit scoring work? What dimensions do they measure?
- **Google PageRank** — How did a score become THE standard for web search? What made it defensible?
- **SSL certificates / HTTPS** — How did we go from optional to required? What was the adoption curve?
- **SOC 2 / ISO 27001** — How do compliance certifications work? What makes businesses pursue them?
- **G2 / Trustpilot** — How do review-based trust scores work? What gaming problems exist?
- **BBB Accreditation** — How does the badge model work for trust?

For each: what drove adoption, what made it defensible, what gaming/manipulation problems arose, and what lessons apply to an agent-readiness score.

WebSearch: "how FICO became the standard", "business credit score history", "SSL adoption curve timeline", "SOC 2 certification benefits for SaaS", "trust score gaming prevention"

### Agent 3: Competitive Landscape Deep Dive
Research every company doing agent-readiness assessment:
- **Agentiview** — $349-$15K consulting. What do they actually measure? Scoring methodology?
- **AgentReady.site** — Free score. What dimensions? How accurate?
- **Factory.ai** — Agent readiness framework, 8 pillars. How do they score each pillar?
- **Any other companies** doing agent-readiness auditing or certification

For each: exact scoring methodology if available, pricing, strengths, weaknesses, what they miss that we should include.

Also research: Is anyone building an agent-readiness STANDARD (like W3C or IETF)? Any working groups? Any RFCs?

WebSearch: "agent readiness score companies 2026", "AI agent business readiness assessment", "agent-ready certification", "Factory.ai agent readiness framework details", "Agentiview scoring methodology"

### Agent 4: Score Dimensions Design
Based on research from the other agents, design the IDEAL scoring system:

Current categories (5):
1. Machine-readable profile
2. MCP/API endpoints
3. Agent-native onboarding
4. Structured pricing
5. Agent payment acceptance

Research whether we should ADD dimensions:
- **Data quality** — Is the underlying data clean enough for agents to reason about? (From Nate B Jones: "wrapping dirty data in MCP produces garbage")
- **Observability** — Can agents monitor their own interactions with this business? Logging, tracing?
- **Security posture** — Is the agent-facing surface secure? Auth, rate limiting, input validation?
- **Uptime / reliability** — SLA, historical uptime, response times?
- **Compliance** — Does the business handle agent transactions legally? Privacy, data handling?
- **Human escalation** — When the agent can't handle something, is there a clear path to a human?
- **Agent feedback loop** — Can agents report issues and get them fixed?
- **Multi-protocol support** — Does the business work across MCP, A2A, REST, or only one?

For each potential dimension: is it measurable automatically? Is it meaningful for agent commerce? Should it be REQUIRED (affects score) or BONUS (extra points)?

Design a proposed scoring rubric with weights.

### Agent 5: Badge & Adoption Strategy
Research how to make the score go viral and become the standard:
- **Badge design patterns** — How do SSL badges, BBB badges, G2 badges work technically? Embed code? Dynamic SVG?
- **Adoption flywheel** — How do you go from 0 to critical mass? Which side do you start with — the businesses being scored or the agents checking scores?
- **Gaming prevention** — How do we prevent businesses from gaming the score? What manipulation attacks exist for rating systems?
- **Score API design** — What should the public API look like for agents to check scores? REST? MCP tool? Both?
- **Certification program** — Should there be a "Certified by AgentHermes" program with annual renewal? What would that look like?
- **Open vs proprietary** — Should the scoring METHODOLOGY be open (like PageRank was initially) or proprietary (like FICO)? Tradeoffs?
- **Agent SDK** — Should we provide an SDK that agents use to check scores before transacting? What would the integration look like?

WebSearch: "trust badge adoption strategy", "how SSL became required", "rating system gaming prevention", "API design for trust scores", "certification program design SaaS"

## OUTPUT FORMAT

Each agent writes their findings to ~/AgentHermes/research/:
- agent-1-protocols.md
- agent-2-rating-systems.md
- agent-3-competitors.md
- agent-4-dimensions.md
- agent-5-adoption.md

After all 5 complete, write a SYNTHESIS document at ~/AgentHermes/research/SYNTHESIS.md that:
1. Proposes the definitive scoring rubric (dimensions, weights, thresholds)
2. Maps which protocols should be REQUIRED vs RECOMMENDED at each tier
3. Recommends the adoption strategy (which side first, badge design, certification)
4. Identifies the top 3 threats to becoming the standard and how to mitigate
5. Compares our current design to the ideal and lists specific gaps

## RULES
- Use WebSearch and WebFetch extensively — this is a RESEARCH task
- Be specific — "Agent Card should have field X" not "businesses should be discoverable"
- Cite sources for every claim
- If two sources disagree, present both views
- The goal is to design a score that becomes REQUIRED to participate in agent commerce — like HTTPS became required for the web
