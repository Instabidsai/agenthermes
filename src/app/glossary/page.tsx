import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Search,
  Shield,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Agent Economy Glossary — Every Term Defined | AgentHermes',
  description:
    'The definitive glossary for the agent economy. Definitions for MCP, A2A, Agent Card, llms.txt, ARL, Agent Readiness Score, UCP, ACP, x402, KYA, and more.',
  openGraph: {
    title: 'Agent Economy Glossary — Every Term Defined',
    description:
      'The definitive glossary for the agent economy. Definitions for MCP, A2A, Agent Card, llms.txt, ARL, Agent Readiness Score, and every protocol shaping how AI agents interact with businesses.',
    url: 'https://agenthermes.ai/glossary',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Economy Glossary — Every Term Defined',
    description:
      'The definitive glossary for the agent economy. Definitions for MCP, A2A, Agent Card, llms.txt, ARL, Agent Readiness Score, and every protocol shaping how AI agents interact with businesses.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/glossary',
  },
}

// ---------------------------------------------------------------------------
// Term data
// ---------------------------------------------------------------------------
interface GlossaryTerm {
  term: string
  slug: string
  definition: string
  whyItMatters: string
  link?: { href: string; label: string }
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'A2A (Agent-to-Agent)',
    slug: 'a2a',
    definition:
      'A2A is Google\'s open protocol for agent-to-agent communication. It defines how AI agents discover each other, negotiate capabilities, and collaborate on tasks across organizational boundaries. A2A uses Agent Cards for discovery and supports both synchronous and streaming interactions.',
    whyItMatters:
      'As the agent ecosystem grows, agents need to talk to each other, not just to humans. A2A provides a standardized way for your business\'s agent to receive requests from and collaborate with agents from other platforms like Google, Salesforce, or SAP.',
    link: { href: '/about', label: 'How we support A2A' },
  },
  {
    term: 'ACP (Agent Commerce Protocol)',
    slug: 'acp',
    definition:
      'ACP is a standard developed by OpenAI and Stripe for enabling AI agents to make purchases, handle subscriptions, and manage billing on behalf of users. It builds on Stripe\'s payment infrastructure and defines how agents authenticate, authorize payments, and handle receipts.',
    whyItMatters:
      'If you want AI agents to be able to buy your products or services, you need a payment protocol they understand. ACP is one of two emerging standards (alongside UCP) that will determine how the agent economy handles money.',
    link: { href: '/commerce', label: 'Agent commerce' },
  },
  {
    term: 'ACP Score',
    slug: 'acp-score',
    definition:
      'The ACP Score is the payment readiness sub-score within the Agent Readiness Score. It measures whether a business\'s payment infrastructure is accessible to AI agents through protocols like ACP, UCP, x402, or structured pricing data.',
    whyItMatters:
      'A high ACP score means agents can complete the full transaction loop with your business, from discovery all the way through payment, without requiring human intervention.',
    link: { href: '/audit', label: 'Check your score' },
  },
  {
    term: 'Agent Card',
    slug: 'agent-card',
    definition:
      'An Agent Card is a machine-readable JSON file hosted at /.well-known/agent-card.json that describes an agent\'s or business\'s capabilities, supported protocols, authentication methods, and service endpoints. It serves as a digital business card that other agents can automatically read and understand.',
    whyItMatters:
      'Agent Cards are how AI agents discover what your business can do. Without one, agents have to guess or rely on web scraping. With one, they instantly know your capabilities, how to authenticate, and what protocols you support.',
    link: { href: '/registry', label: 'Agent Card Registry' },
  },
  {
    term: 'Agent Economy',
    slug: 'agent-economy',
    definition:
      'The Agent Economy is the emerging economic system where AI agents autonomously discover, evaluate, use, and pay for services on behalf of humans and organizations. It encompasses the full lifecycle of machine-to-machine commerce, from search and discovery through fulfillment and payment.',
    whyItMatters:
      'The agent economy is projected to reach $3-5 trillion by 2030. Businesses that are agent-ready now will capture outsized market share as autonomous purchasing becomes mainstream. Those that aren\'t will become invisible to an entire generation of AI-mediated buyers.',
    link: { href: '/about', label: 'Our vision' },
  },
  {
    term: 'Agent Readiness Score',
    slug: 'agent-readiness-score',
    definition:
      'The Agent Readiness Score is AgentHermes\'s proprietary 0-100 metric that measures how ready a business is for AI agents. It evaluates nine dimensions: Discovery, API Accessibility, Onboarding, Pricing Transparency, Payment Protocols, Data Quality, Security, Reliability, and Agent Experience. Scores map to tiers: Platinum (90+), Gold (75-89), Silver (60-74), Bronze (40-59), and Not Scored (below 40).',
    whyItMatters:
      'Your Agent Readiness Score is the single number that tells you whether AI agents can find, understand, and do business with you. The average score across 139+ businesses is just 39/100, meaning most businesses are nearly invisible to the agent economy.',
    link: { href: '/audit', label: 'Get your free score' },
  },
  {
    term: 'agent-hermes.json',
    slug: 'agent-hermes-json',
    definition:
      'agent-hermes.json is AgentHermes\'s proposed standard file for declaring a business\'s agent readiness status, supported protocols, available tools, and integration endpoints. Hosted at the root of a website, it provides a comprehensive machine-readable manifest that goes beyond what individual protocol files offer.',
    whyItMatters:
      'While agent-card.json covers capabilities and llms.txt covers content, agent-hermes.json ties everything together into a single declaration of agent readiness. It tells agents not just what you can do, but how ready you are to work with them.',
    link: { href: '/standard', label: 'View the standard' },
  },
  {
    term: 'AGENTS.md',
    slug: 'agents-md',
    definition:
      'AGENTS.md is a Linux Foundation standard for declaring agent capabilities within code repositories. It is a markdown file placed in the root of a repository that describes what AI coding agents should know about the project, including build instructions, architecture decisions, and contribution guidelines.',
    whyItMatters:
      'As AI coding agents like Claude, Copilot, and Cursor become standard development tools, AGENTS.md ensures they understand your codebase. It\'s the developer-facing equivalent of llms.txt, optimized for repository context rather than website content.',
  },
  {
    term: 'ARL (Agent Readiness Level)',
    slug: 'arl',
    definition:
      'ARL is AgentHermes\'s 7-level maturity framework that categorizes businesses by how ready they are for AI agent interaction. The levels are: ARL-0 (Dark) for businesses with no web presence, ARL-1 (Static) for basic websites, ARL-2 (Structured) for businesses with structured data, ARL-3 (Accessible) for those with APIs, ARL-4 (Integrated) for full protocol support, ARL-5 (Autonomous) for fully automated agent workflows, and ARL-6 (Interoperable) for businesses that participate in multi-agent ecosystems.',
    whyItMatters:
      'ARL gives you a clear roadmap. Instead of a single score, it shows you exactly where you are on the maturity curve and what specific steps will move you to the next level. Most businesses today are ARL-1 or ARL-2.',
    link: { href: '/what-is-agent-ready', label: 'See all ARL levels' },
  },
  {
    term: 'Fulfillment Routing',
    slug: 'fulfillment-routing',
    definition:
      'Fulfillment Routing is AgentHermes\'s system that intelligently routes agent requests to the appropriate business system for completion. It supports four channels: direct API calls for fully integrated businesses, webhooks for event-driven systems, email notifications for businesses without APIs, and lead capture forms for businesses that need human follow-up.',
    whyItMatters:
      'Not every business has an API. Fulfillment routing means even a local plumber without any technical infrastructure can receive and respond to agent-generated leads. It bridges the gap between the agent economy and businesses at every technology level.',
    link: { href: '/gateway', label: 'Gateway details' },
  },
  {
    term: 'Gateway',
    slug: 'gateway',
    definition:
      'The AgentHermes Gateway is a unified API that provides agents with a single connection point to access multiple business services. Instead of integrating with each business individually, agents connect to the gateway once and gain access to every connected service through standardized tool schemas, authentication, and billing.',
    whyItMatters:
      'The gateway solves the N-to-N integration problem. Without it, every agent would need to individually integrate with every business. The gateway provides one API key, one authentication flow, and one billing system for the entire network.',
    link: { href: '/gateway', label: 'Explore the gateway' },
  },
  {
    term: 'Hosted MCP',
    slug: 'hosted-mcp',
    definition:
      'Hosted MCP is a service where AgentHermes runs and maintains an MCP server on behalf of a business. Instead of the business deploying their own MCP infrastructure, AgentHermes hosts MCP endpoints that expose the business\'s tools and data, handling protocol compliance, authentication, and uptime.',
    whyItMatters:
      'Most businesses don\'t have the technical resources to deploy and maintain MCP servers. Hosted MCP makes agent readiness accessible to any business, regardless of technical sophistication. You describe what you offer, and we handle the protocol layer.',
    link: { href: '/connect', label: 'Get hosted MCP' },
  },
  {
    term: 'KYA (Know Your Agent)',
    slug: 'kya',
    definition:
      'KYA (Know Your Agent) is an identity verification framework for AI agents. Analogous to KYC (Know Your Customer) in finance, KYA establishes standards for verifying an agent\'s identity, authorization level, the principal (human or organization) it represents, and the scope of actions it is permitted to take.',
    whyItMatters:
      'As agents start making purchases and accessing sensitive services, businesses need to know who they\'re dealing with. KYA prevents unauthorized agent actions, establishes accountability, and enables trust in agent-to-business transactions.',
    link: { href: '/developers', label: 'Developer docs' },
  },
  {
    term: 'llms.txt',
    slug: 'llms-txt',
    definition:
      'llms.txt is a machine-readable text file placed at the root of a website (e.g., example.com/llms.txt) that helps large language models understand the site\'s content, structure, and purpose. It provides a concise, AI-optimized summary that is more efficient than having an LLM crawl and parse an entire website.',
    whyItMatters:
      'When an AI agent needs to understand what your business does, llms.txt gives it the answer in seconds instead of requiring it to crawl your entire site. It\'s the fastest path from "invisible" to "discoverable" in the agent economy.',
    link: { href: '/remediate', label: 'Generate yours free' },
  },
  {
    term: 'MCP (Model Context Protocol)',
    slug: 'mcp',
    definition:
      'MCP (Model Context Protocol) is Anthropic\'s open protocol for connecting AI models to external tools, data sources, and services. It defines a standardized way for AI agents to discover available tools, understand their parameters, invoke them, and process results. MCP supports resources (data the agent can read), tools (actions the agent can take), and prompts (templates for common interactions).',
    whyItMatters:
      'MCP is becoming the dominant standard for how AI agents interact with the world. If your business exposes MCP tools, any MCP-compatible agent (Claude, and increasingly others) can immediately use your services. It\'s the API layer of the agent economy.',
    link: { href: '/developers', label: 'MCP developer docs' },
  },
  {
    term: 'MCP Server',
    slug: 'mcp-server',
    definition:
      'An MCP Server is a server that implements the Model Context Protocol to expose tools, resources, and prompts to AI agents. It acts as the bridge between a business\'s internal systems and the AI agents that want to interact with them. MCP servers can run locally (stdio) or be hosted remotely (HTTP/SSE transport).',
    whyItMatters:
      'Running an MCP server is how a business makes its capabilities directly callable by AI agents. It is the difference between an agent reading about your services on your website and an agent being able to actually book an appointment, check availability, or place an order.',
    link: { href: '/connect', label: 'Deploy your MCP server' },
  },
  {
    term: 'UCP (Universal Commerce Protocol)',
    slug: 'ucp',
    definition:
      'UCP (Universal Commerce Protocol) is a standard developed by Google and Shopify for enabling AI agents to browse, compare, and purchase products across e-commerce platforms. It defines standardized product schemas, cart operations, and checkout flows that agents can navigate programmatically.',
    whyItMatters:
      'UCP is designed to make every online store agent-shoppable. If you sell products online, UCP compliance means AI shopping agents can browse your catalog, compare prices, add items to cart, and complete purchases, all without human intervention.',
    link: { href: '/commerce', label: 'Agent commerce' },
  },
  {
    term: 'Vertical Template',
    slug: 'vertical-template',
    definition:
      'A Vertical Template is a pre-built set of MCP tool schemas, configurations, and best practices designed for a specific business type. AgentHermes provides 15 vertical templates covering industries like restaurants, HVAC, lawn care, dental, legal, SaaS, e-commerce, and more. Each template includes 5-7 tools tailored to the vertical\'s common operations.',
    whyItMatters:
      'Vertical templates eliminate the need to design your agent integration from scratch. A restaurant gets book_table, get_menu, and check_availability tools pre-configured. An HVAC company gets schedule_service, get_quote, and check_coverage. You just plug in your data.',
    link: { href: '/for', label: 'Browse verticals' },
  },
  {
    term: 'Wallet',
    slug: 'wallet',
    definition:
      'In the AgentHermes system, a Wallet is a pre-funded account that agents use to pay for services through the gateway. Businesses and agent operators deposit funds into their wallet, and transactions are deducted automatically as agents consume services. Wallets support real-time balance checks, usage tracking, and automatic top-ups.',
    whyItMatters:
      'Wallets solve the payment friction problem for agent commerce. Instead of requiring credit card authorization for every transaction, agents can spend from a pre-approved balance, enabling fast, automated, sub-second payments at scale.',
    link: { href: '/gateway', label: 'Gateway billing' },
  },
  {
    term: 'x402',
    slug: 'x402',
    definition:
      'x402 is an HTTP-native micropayment protocol that uses the 402 Payment Required HTTP status code. When an agent requests a paid resource, the server responds with a 402 status and payment details (amount, accepted methods, payment address). The agent completes the payment and retries the request with proof of payment in the headers.',
    whyItMatters:
      'x402 enables true pay-per-use pricing for AI agents. Instead of requiring subscriptions or API keys, businesses can charge per-request at the protocol level. It is especially powerful for micropayments, where an agent might pay fractions of a cent per API call.',
    link: { href: '/commerce', label: 'Payment protocols' },
  },
].sort((a, b) => a.term.localeCompare(b.term))

// ---------------------------------------------------------------------------
// Schema.org DefinedTermSet
// ---------------------------------------------------------------------------
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Agent Economy Glossary',
  description:
    'The definitive glossary for the agent economy. Definitions for every protocol, standard, and concept shaping how AI agents interact with businesses.',
  url: 'https://agenthermes.ai/glossary',
  inDefinedTermSet: 'https://agenthermes.ai/glossary',
  hasDefinedTerm: glossaryTerms.map((t) => ({
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.definition,
    url: `https://agenthermes.ai/glossary#${t.slug}`,
    inDefinedTermSet: 'https://agenthermes.ai/glossary',
  })),
  isPartOf: {
    '@type': 'WebSite',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://agenthermes.ai',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Glossary',
        item: 'https://agenthermes.ai/glossary',
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// Alphabet nav
// ---------------------------------------------------------------------------
function getUsedLetters(): string[] {
  const letters = new Set(
    glossaryTerms.map((t) => {
      const first = t.term.charAt(0).toUpperCase()
      // Terms starting with a digit or symbol go under '#'
      return /[A-Z]/.test(first) ? first : '#'
    })
  )
  return Array.from(letters).sort()
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function GlossaryPage() {
  const usedLetters = getUsedLetters()

  // Group terms by first letter
  const grouped = glossaryTerms.reduce<Record<string, GlossaryTerm[]>>(
    (acc, term) => {
      const first = term.term.charAt(0).toUpperCase()
      const key = /[A-Z]/.test(first) ? first : '#'
      if (!acc[key]) acc[key] = []
      acc[key].push(term)
      return acc
    },
    {}
  )

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-zinc-400">Glossary</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <BookOpen className="h-4 w-4" />
              {glossaryTerms.length} Terms Defined
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Agent Economy{' '}
              <span className="text-emerald-500">Glossary</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mx-auto mb-4">
              Every term you need to understand the agent economy &mdash; from MCP
              and A2A to Agent Cards and agent readiness.
            </p>

            <p className="text-zinc-500 max-w-2xl mx-auto">
              Whether you&apos;re a developer building agent integrations, a
              business owner preparing for AI-mediated commerce, or just trying
              to keep up with the fastest-moving space in tech, this glossary has
              you covered.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ALPHABET NAV ===== */}
      <div className="sticky top-16 z-30 bg-[#09090b]/95 backdrop-blur-sm border-b border-zinc-800/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide" role="navigation" aria-label="Alphabet navigation">
            {usedLetters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-md text-sm font-mono font-semibold text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              >
                {letter}
              </a>
            ))}
            <div className="flex-1" />
            <Link
              href="/faq"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              FAQ
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ===== TERMS ===== */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, terms]) => (
              <div key={letter} className="mb-12" id={`letter-${letter}`}>
                {/* Letter heading */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-lg font-bold font-mono text-emerald-400">
                      {letter}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-zinc-800/60" />
                </div>

                {/* Terms in this letter */}
                <div className="space-y-6">
                  {terms.map((t) => (
                    <article
                      key={t.slug}
                      id={t.slug}
                      className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors scroll-mt-28"
                    >
                      {/* Term name */}
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 mb-3 flex items-center gap-3">
                        <a
                          href={`#${t.slug}`}
                          className="hover:text-emerald-400 transition-colors"
                        >
                          {t.term}
                        </a>
                      </h2>

                      {/* Definition */}
                      <p className="text-zinc-300 leading-relaxed mb-4">
                        {t.definition}
                      </p>

                      {/* Why it matters */}
                      <div className="relative pl-4 border-l-2 border-emerald-500/30 mb-4">
                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                          Why It Matters
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {t.whyItMatters}
                        </p>
                      </div>

                      {/* Link */}
                      {t.link && (
                        <Link
                          href={t.link.href}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          {t.link.label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to see where you stand?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Now that you know the terminology, check how your business
            measures up. Get your Agent Readiness Score in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Check Your Score
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
            >
              Read the FAQ
              <Zap className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
