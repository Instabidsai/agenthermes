import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BookA,
  Calendar,
  Clock,
  HelpCircle,
  Search,
  Sparkles,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Agent Readiness Glossary: 50 Terms Every Business Should Know | AgentHermes',
  description:
    'The definitive glossary of agent readiness terms. 50 definitions from A2A Protocol to x402, including ARL levels, MCP servers, scoring dimensions, and agent economy concepts. Bookmark this page.',
  keywords: [
    'agent readiness glossary terms',
    'agent readiness definitions',
    'MCP server definition',
    'A2A protocol definition',
    'agent readiness level',
    'agent economy terms',
    'AI agent glossary',
    'ARL levels definition',
    'agent card definition',
    'llms.txt definition',
  ],
  openGraph: {
    title: 'Agent Readiness Glossary: 50 Terms Every Business Should Know',
    description:
      '50 terms from A2A to x402. The definitive glossary for the agent economy — bookmark this reference.',
    url: 'https://agenthermes.ai/blog/agent-readiness-glossary',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agent Readiness Glossary: 50 Terms Every Business Should Know',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Readiness Glossary: 50 Terms Every Business Should Know',
    description:
      '50 essential agent readiness terms defined. From A2A Protocol to x402 micropayments. The reference page for the agent economy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-readiness-glossary',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface GlossaryTerm {
  term: string
  definition: string
  link?: string
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'A2A Protocol',
    definition: 'Agent-to-Agent protocol (v0.3) that defines how AI agents discover and delegate tasks to other AI agents. Uses agent-card.json for discovery. Different from MCP, which is agent-to-tool.',
    link: '/blog/a2a-protocol-explained',
  },
  {
    term: 'ACP (Agent Communication Protocol)',
    definition: 'A protocol for structured message passing between AI agents, enabling multi-turn conversations and task negotiations beyond simple tool calls.',
  },
  {
    term: 'Agent Card',
    definition: 'A JSON file (agent-card.json) placed at /.well-known/agent-card.json that describes an AI agent\'s or business\'s capabilities, supported protocols, and interaction methods. Zero of 500 businesses scanned have one.',
    link: '/blog/agent-card-json-guide',
  },
  {
    term: 'Agent Economy',
    definition: 'The emerging economic layer where AI agents discover, evaluate, and transact with businesses on behalf of humans. Estimated at $3-5 trillion by 2030. Businesses invisible to agents are excluded from this economy.',
    link: '/blog/what-is-agent-readiness',
  },
  {
    term: 'Agent Experience (D9)',
    definition: 'The ninth scoring dimension (10% weight) measuring how pleasant an API is for agents to use. Includes request IDs, structured errors, response envelopes, rate-limit headers, cursor pagination, idempotency keys, and OpenAPI examples.',
    link: '/blog/agent-experience-dimension',
  },
  {
    term: 'Agent Journey',
    definition: 'The 6-step path an AI agent follows when interacting with a business: Find, Understand, Sign Up, Connect, Use, Pay. Most businesses fail at step 1.',
    link: '/blog/agent-journey-explained',
  },
  {
    term: 'Agent-Native',
    definition: 'A business or API designed from the ground up for AI agent interaction, not retrofitted from a human-first interface. Agent-native businesses typically score 60+ on the Agent Readiness Score.',
  },
  {
    term: 'Agent Readiness Level (ARL)',
    definition: 'A 7-level classification system (ARL-0 through ARL-6) measuring how prepared a business is for AI agent interaction. ARL-0 is Dark (invisible). ARL-6 is Interoperable (full agent ecosystem participant).',
    link: '/blog/arl-levels-explained',
  },
  {
    term: 'Agent Readiness Score',
    definition: 'A 0-100 composite score measuring how well a business can be discovered, understood, and used by AI agents. Calculated across 9 weighted dimensions. Average score across 500 businesses: 43/100.',
    link: '/blog/what-is-agent-readiness',
  },
  {
    term: 'AGENTS.md',
    definition: 'A markdown file placed at the root of a repository or website that describes the project\'s capabilities, tools, and workflows in a format optimized for AI agent consumption. The README.md equivalent for agents.',
    link: '/blog/agents-md-file-guide',
  },
  {
    term: 'API Quality (D2)',
    definition: 'The second scoring dimension and highest-weighted at 15%. Measures OpenAPI spec availability, endpoint structure, response format consistency, and API documentation quality.',
    link: '/blog/openapi-agent-readiness',
  },
  {
    term: 'Bearer Token',
    definition: 'An authentication mechanism where an API key or access token is passed in the Authorization header (Authorization: Bearer <token>). The preferred auth method for AI agents because it is stateless and programmatic.',
    link: '/blog/security-agent-readiness',
  },
  {
    term: 'Bronze Tier',
    definition: 'Agent Readiness Score of 40-59. The business has basic digital infrastructure — HTTPS, some structured data, possibly an API — but lacks agent-specific features like agent cards or MCP servers.',
    link: '/blog/bronze-to-silver-guide',
  },
  {
    term: 'Client Credentials Flow',
    definition: 'An OAuth 2.0 grant type where an application authenticates using its own credentials (client_id + client_secret) rather than on behalf of a user. The correct OAuth flow for machine-to-machine agent authentication.',
    link: '/blog/oauth-for-agents-guide',
  },
  {
    term: 'CORS (Cross-Origin Resource Sharing)',
    definition: 'HTTP headers that control which domains can make API requests. Misconfigured CORS blocks agents from different origins. Agent-ready CORS allows credentialed cross-origin requests and exposes rate-limit headers.',
    link: '/blog/cors-headers-agent-readiness',
  },
  {
    term: 'Cursor Pagination',
    definition: 'A pagination method using opaque tokens (cursors) instead of page numbers. More stable than offset pagination because it is not affected by data changes between pages. The agent-preferred pagination pattern.',
    link: '/blog/pagination-agent-readiness',
  },
  {
    term: 'D1 through D9',
    definition: 'The nine scoring dimensions of the Agent Readiness Score: D1 Discoverability (0.12), D2 API Quality (0.15), D3 Onboarding (0.08), D4 Pricing (0.05), D5 Payment (0.08), D6 Data Quality (0.10), D7 Security (0.12), D8 Reliability (0.13), D9 Agent Experience (0.10).',
    link: '/blog/what-is-agent-readiness',
  },
  {
    term: 'Dark (ARL-0)',
    definition: 'The lowest Agent Readiness Level. The business is completely invisible to AI agents — no API, no structured data, no machine-readable content. Score: 0-19. 40% of businesses scanned fall here.',
    link: '/blog/arl-levels-explained',
  },
  {
    term: 'Data Quality (D6)',
    definition: 'The sixth scoring dimension (10% weight). Measures structured response formats (JSON vs HTML), consistent error envelopes, JSON-LD schema markup, and machine-readable content.',
    link: '/blog/data-quality-agent-readiness',
  },
  {
    term: 'Discoverability (D1)',
    definition: 'The first scoring dimension (12% weight). Can an agent find your business at all? Checks DNS, robots.txt allowing GPTBot, sitemap.xml, agent-card.json, llms.txt, and OpenGraph tags.',
    link: '/blog/discoverability-agent-readiness',
  },
  {
    term: 'Error Envelope',
    definition: 'A standardized JSON format for API error responses containing an error message, machine-readable code, HTTP status, and request ID. Example: { "error": "Invalid amount", "code": "invalid_amount", "status": 422, "request_id": "req_abc123" }.',
    link: '/blog/error-handling-agent-readiness',
  },
  {
    term: 'Gold Tier',
    definition: 'Agent Readiness Score of 75-89. The business has comprehensive agent infrastructure including MCP server, agent card, structured errors, and self-service onboarding. Only 1 of 500 businesses scanned (Resend, 75) achieved Gold.',
    link: '/blog/silver-to-gold-guide',
  },
  {
    term: 'Health Endpoint',
    definition: 'An API endpoint (typically /health or /status) that returns the current operational status of a service. Agents check this before making requests to avoid wasting calls on a down service.',
    link: '/blog/status-page-agent-readiness',
  },
  {
    term: 'HMAC Signing',
    definition: 'A cryptographic method for verifying webhook authenticity. The sender signs the payload with a shared secret; the receiver verifies it. Prevents webhook spoofing. Used by Stripe, GitHub, and other agent-ready platforms.',
    link: '/blog/webhooks-agent-readiness',
  },
  {
    term: 'Idempotency Key',
    definition: 'A unique identifier sent with API requests that prevents duplicate operations on retry. If an agent sends the same request twice with the same idempotency key, the API returns the cached result instead of processing it again.',
    link: '/blog/idempotency-agent-readiness',
  },
  {
    term: 'JSON-LD',
    definition: 'JavaScript Object Notation for Linked Data. A method of encoding structured data (Schema.org markup) in JSON format within HTML pages. Agents extract business identity, pricing, hours, and services from JSON-LD blocks.',
    link: '/blog/schema-markup-agent-readiness',
  },
  {
    term: 'KYA (Know Your Agent)',
    definition: 'An identity verification framework for AI agents interacting with business APIs. Defines agent types (autonomous, supervised, delegated) and trust levels for different operations.',
  },
  {
    term: 'llms.txt',
    definition: 'A markdown file served at the root of a website (/llms.txt) that provides a concise, AI-readable description of the business, its API, and how to interact with it. The robots.txt equivalent for AI models. Fewer than 5% of businesses have one.',
    link: '/blog/llms-txt-standard-guide',
  },
  {
    term: 'MCP (Model Context Protocol)',
    definition: 'An open standard created by Anthropic that defines how AI agents discover, connect to, and interact with external services. Exposes tools, resources, and prompts. The HTTP of the agent economy.',
    link: '/blog/what-is-mcp-server',
  },
  {
    term: 'MCP Server',
    definition: 'A server implementing the Model Context Protocol that exposes tools (callable functions), resources (readable data), and prompts (interaction templates) for AI agents. The equivalent of a website but for agents instead of humans.',
    link: '/blog/what-is-mcp-server',
  },
  {
    term: 'MCP Tool',
    definition: 'A callable function exposed by an MCP server. Each tool has a name, description, and typed input/output schema. Examples: get_menu(), check_availability(), create_booking().',
    link: '/blog/build-mcp-server-tutorial',
  },
  {
    term: 'Not Scored',
    definition: 'Agent Readiness Score below 40. The business has insufficient digital infrastructure for meaningful agent interaction. Used in user-facing text instead of "Failed" or "Unaudited."',
  },
  {
    term: 'NLWeb',
    definition: 'Natural Language Web — a protocol that allows agents to query websites using natural language and receive structured responses. AgentHermes supports NLWeb queries at /api/nlweb.',
  },
  {
    term: 'OAuth 2.0',
    definition: 'An authorization framework that enables third-party applications (including AI agents) to obtain limited access to APIs. The client_credentials grant is the agent-preferred flow because it requires no human in the loop.',
    link: '/blog/oauth-for-agents-guide',
  },
  {
    term: 'Onboarding (D3)',
    definition: 'The third scoring dimension (8% weight). Can an AI agent sign up for API access, get credentials, and start making calls without a human? "Contact sales" is a D3 score of zero.',
    link: '/blog/onboarding-agent-readiness',
  },
  {
    term: 'OpenAPI Specification',
    definition: 'A standard format (formerly Swagger) for describing REST APIs in YAML or JSON. Includes endpoints, parameters, request/response schemas, and authentication methods. The single biggest factor in Agent Readiness — D2 is weighted 15%.',
    link: '/blog/openapi-agent-readiness',
  },
  {
    term: 'Payment Processing (D5)',
    definition: 'The fifth scoring dimension (8% weight). Can an AI agent complete a purchase end-to-end via API? Requires programmatic payment methods, not hosted checkout redirects.',
    link: '/blog/payment-processing-agent-readiness',
  },
  {
    term: 'Platinum Tier',
    definition: 'Agent Readiness Score of 90-100. Full agent ecosystem participation with MCP server, A2A protocol, x402 micropayments, and cross-agent interoperability. Zero of 500 businesses scanned have achieved Platinum.',
  },
  {
    term: 'Pricing Transparency (D4)',
    definition: 'The fourth scoring dimension (5% weight, lowest). Whether pricing is machine-readable — structured JSON/JSON-LD, not a PDF or "contact for quote." 30% of businesses fail D4 completely.',
    link: '/blog/pricing-transparency-agent-readiness',
  },
  {
    term: 'Rate Limiting',
    definition: 'Throttling API requests to prevent abuse. Agent-ready rate limiting includes machine-readable headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) and 429 responses with Retry-After.',
    link: '/blog/rate-limiting-for-agents',
  },
  {
    term: 'Reliability (D8)',
    definition: 'The eighth scoring dimension (13% weight, second-highest). Measures status pages, health endpoints, uptime history, incident tracking, and SLA documentation. Agents automate repeat actions, so unreliable endpoints kill adoption.',
    link: '/blog/reliability-agent-readiness',
  },
  {
    term: 'Request ID',
    definition: 'A unique identifier (X-Request-ID header) returned with every API response. Enables agents to correlate requests with responses, debug failures, and reference specific transactions in error reports.',
  },
  {
    term: 'Sandbox Environment',
    definition: 'A test version of an API with fake data where agents can learn endpoints without risking real money or data. Stripe\'s test mode (sk_test_*) is the gold standard. Most businesses do not offer one.',
    link: '/blog/sandbox-environments-agent-readiness',
  },
  {
    term: 'Schema.org',
    definition: 'A collaborative vocabulary for structured data markup on web pages. JSON-LD Schema.org markup (Organization, Product, Service, Offer) lets agents extract business identity and offerings without API calls.',
    link: '/blog/schema-markup-agent-readiness',
  },
  {
    term: 'Security (D7)',
    definition: 'The seventh scoring dimension (12% weight). Measures authentication method (Bearer preferred), HTTPS enforcement, OAuth support, CORS configuration, and credential management.',
    link: '/blog/security-agent-readiness',
  },
  {
    term: 'Silver Tier',
    definition: 'Agent Readiness Score of 60-74. The business has strong API infrastructure, documentation, and security. Developer-focused companies dominate Silver. 22 of the top 30 Silver scorers are dev tools.',
    link: '/blog/bronze-to-silver-guide',
  },
  {
    term: 'SSE (Server-Sent Events)',
    definition: 'A transport protocol used by MCP servers to stream real-time data to agents over HTTP. Allows long-running tool calls and progress updates. The standard MCP transport alongside stdio.',
    link: '/blog/build-mcp-server-tutorial',
  },
  {
    term: 'Status Page',
    definition: 'A public page (typically status.domain.com) showing current service health, incident history, and component status. Directly impacts D8 Reliability (13% of score). Agents check status before making API calls.',
    link: '/blog/status-page-agent-readiness',
  },
  {
    term: 'TLS (Transport Layer Security)',
    definition: 'The encryption protocol behind HTTPS. A hard cap in the Agent Readiness scoring model: no TLS means the score cannot exceed 39. Without HTTPS, all data between agent and API is interceptable.',
    link: '/blog/scoring-caps-explained',
  },
  {
    term: 'UCP (Universal Context Protocol)',
    definition: 'An emerging standard for sharing context (user preferences, session state, conversation history) between AI agents and services. Detected by AgentHermes but not yet widely adopted.',
  },
  {
    term: 'Vertical Scoring Profile',
    definition: 'Industry-specific adjustments to dimension weights in the Agent Readiness Score. A restaurant weighs D4 Pricing higher than a SaaS company. AgentHermes supports 27 vertical profiles.',
  },
  {
    term: 'Webhook',
    definition: 'An HTTP callback that pushes event data from a service to a registered URL when something happens (order placed, payment received, status changed). Agents prefer webhooks over polling because polling wastes compute budget.',
    link: '/blog/webhooks-agent-readiness',
  },
  {
    term: 'x402',
    definition: 'A micropayment protocol that uses the HTTP 402 Payment Required status code. Enables AI agents to pay for API calls per-request using USDC with sub-second settlement. No signup or credit card needed. The missing piece for ARL-4 Automated.',
    link: '/blog/x402-payment-protocol',
  },
]

// Group terms by first letter
function groupByLetter(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  const groups: Record<string, GlossaryTerm[]> = {}
  for (const term of terms) {
    const letter = term.term[0].toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(term)
  }
  return groups
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AgentReadinessGlossaryPage() {
  const grouped = groupByLetter(glossaryTerms)
  const letters = Object.keys(grouped).sort()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agent Readiness Glossary: 50 Terms Every Business Should Know',
    description:
      'The definitive glossary of agent readiness terms. 50 definitions from A2A Protocol to x402, including ARL levels, MCP servers, scoring dimensions, and agent economy concepts.',
    datePublished: '2026-04-15',
    dateModified: '2026-04-15',
    author: {
      '@type': 'Organization',
      name: 'AgentHermes Research',
      url: 'https://agenthermes.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-readiness-glossary',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Education',
    wordCount: 2000,
    keywords:
      'agent readiness glossary, agent readiness terms, MCP definition, A2A protocol, ARL levels, agent economy glossary',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent Readiness Glossary',
          item: 'https://agenthermes.ai/blog/agent-readiness-glossary',
        },
      ],
    },
  }

  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Agent Readiness Glossary',
    description: '50 essential terms for understanding agent readiness and the agent economy.',
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
    })),
  }

  return (
    <BlogArticleWrapper
      title="Agent Readiness Glossary: 50 Terms Every Business Should Know"
      shareUrl="https://agenthermes.ai/blog/agent-readiness-glossary"
      currentHref="/blog/agent-readiness-glossary"
    >
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Agent Readiness Glossary</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <BookA className="h-3.5 w-3.5" />
              Reference
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              50 Terms
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Agent Readiness Glossary:{' '}
            <span className="text-emerald-400">50 Terms Every Business Should Know</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The agent economy has its own vocabulary — MCP, A2A, ARL, x402, agent cards, llms.txt,
            scoring dimensions, tier levels, and dozens of technical concepts that determine whether
            your business is visible or invisible to AI agents. This glossary defines every term you
            need, with links to the full article where applicable.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  April 15, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  15 min read
                </span>
              </div>
            </div>
          </div>

          {/* Letter nav */}
          <div className="flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors text-sm font-bold"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GLOSSARY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <div className="space-y-12">
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-lg font-bold text-emerald-400">{letter}</span>
                  </div>
                  <div className="flex-1 h-px bg-zinc-800/80" />
                </div>

                <div className="space-y-3">
                  {grouped[letter].map((term) => (
                    <div
                      key={term.term}
                      className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-bold text-zinc-100">{term.term}</h3>
                        {term.link && (
                          <Link
                            href={term.link}
                            className="shrink-0 text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                          >
                            Full article
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUICK REFERENCE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Quick Reference: Scoring Tiers
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The four tier names appear throughout AgentHermes content. Here they are in one place
            with the score ranges and what they mean for agent interaction.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { tier: 'Not Scored', range: '0-39', meaning: 'Invisible to agents', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
              { tier: 'Bronze', range: '40-59', meaning: 'Basic infrastructure', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
              { tier: 'Silver', range: '60-74', meaning: 'Agent-usable API', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
              { tier: 'Gold', range: '75-89', meaning: 'Agent-optimized', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
            ].map((t) => (
              <div
                key={t.tier}
                className={`p-4 rounded-xl ${t.bg} border ${t.border} text-center`}
              >
                <div className={`text-lg font-bold ${t.color} mb-1`}>{t.tier}</div>
                <div className="text-2xl font-bold text-zinc-100">{t.range}</div>
                <div className="text-xs text-zinc-500 mt-1">{t.meaning}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <h3 className="font-bold text-zinc-100 mb-2 text-sm flex items-center gap-2">
              <Search className="h-4 w-4 text-emerald-400" />
              Platinum (90-100)
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The theoretical maximum tier. Requires full agent ecosystem participation: MCP server,
              A2A protocol, x402 micropayments, cross-agent interoperability, and near-perfect scores
              across all 9 dimensions. Zero of 500 businesses scanned have achieved Platinum. It
              represents the future state of agent-native businesses.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DIMENSION WEIGHTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            Quick Reference: Dimension Weights
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The Agent Readiness Score is calculated from 9 weighted dimensions. Higher weight means
            more impact on the final score.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div className="text-center">Weight</div>
              <div>What It Measures</div>
            </div>
            {[
              { dim: 'D2 API Quality', weight: '0.15', measures: 'OpenAPI spec, endpoints, docs' },
              { dim: 'D8 Reliability', weight: '0.13', measures: 'Status page, uptime, SLA' },
              { dim: 'D1 Discoverability', weight: '0.12', measures: 'DNS, robots.txt, agent card' },
              { dim: 'D7 Security', weight: '0.12', measures: 'Auth, HTTPS, OAuth, CORS' },
              { dim: 'D6 Data Quality', weight: '0.10', measures: 'JSON responses, error format' },
              { dim: 'D9 Agent Experience', weight: '0.10', measures: 'Request IDs, pagination, DX' },
              { dim: 'D3 Onboarding', weight: '0.08', measures: 'Self-service signup, API keys' },
              { dim: 'D5 Payment', weight: '0.08', measures: 'Programmatic checkout, x402' },
              { dim: 'D4 Pricing', weight: '0.05', measures: 'Machine-readable pricing data' },
            ].map((row, i) => (
              <div
                key={row.dim}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dim}</div>
                <div className="text-center text-emerald-400 font-bold">{row.weight}</div>
                <div className="text-zinc-500">{row.measures}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED ARTICLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
                tagColor: 'emerald',
              },
              {
                title: 'ARL Levels Explained: From Dark to Interoperable',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'The Agent Readiness Checklist: 30 Signals',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
                tagColor: 'emerald',
              },
            ].map((article) => {
              const bgColor = article.tagColor === 'emerald' ? 'bg-emerald-500/10' : 'bg-purple-500/10'
              const borderColor = article.tagColor === 'emerald' ? 'border-emerald-500/20' : 'border-purple-500/20'
              const textColor = article.tagColor === 'emerald' ? 'text-emerald-400' : 'text-purple-400'
              return (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${bgColor} border ${borderColor} ${textColor} text-xs font-medium mb-3`}>
                    {article.tag}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            See these terms in action on your business
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see how your business scores across all 9 dimensions.
            Every term in this glossary maps to a specific part of your score.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              View Methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
