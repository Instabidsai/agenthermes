import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  Link2,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'What Is an MCP Server and Why Your Business Needs One | AgentHermes',
  description:
    'MCP (Model Context Protocol) servers are how AI agents discover and interact with businesses. 33 million US businesses have zero MCP servers. Learn what MCP is, how it works, and how to get one.',
  keywords: [
    'what is MCP server',
    'MCP server for business',
    'Model Context Protocol',
    'MCP server explained',
    'AI agent MCP',
    'MCP server setup',
    'business MCP server',
    'agent economy MCP',
    'how MCP works',
  ],
  openGraph: {
    title: 'What Is an MCP Server and Why Your Business Needs One',
    description:
      'MCP servers are how AI agents discover and interact with businesses. 33M US businesses have zero. Learn what MCP is and how to get one in 60 seconds.',
    url: 'https://agenthermes.ai/blog/what-is-mcp-server',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'What Is an MCP Server and Why Your Business Needs One',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is an MCP Server and Why Your Business Needs One',
    description:
      'MCP is to AI agents what a website is to humans. 33M businesses have zero MCP servers. Here is what it is and how to get one.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/what-is-mcp-server',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const mcpComponents = [
  {
    name: 'Tools',
    description: 'Functions the agent can call — like search_products, book_appointment, or check_availability. Each tool has a name, description, and input/output schema.',
    example: 'get_menu({ restaurant_id: "joes-pizza" }) returns the full menu with prices',
    icon: Code2,
    color: 'emerald',
  },
  {
    name: 'Resources',
    description: 'Data the agent can read — business information, product catalogs, policies, and FAQs. Think of these as structured documents the agent can reference.',
    example: 'resource://business-info returns hours, address, phone, and description',
    icon: Layers,
    color: 'blue',
  },
  {
    name: 'Prompts',
    description: 'Pre-built interaction templates that guide agents through complex workflows. A prompt might define the full flow for placing a catering order or scheduling a consultation.',
    example: 'prompt://book-consultation guides through service selection, time, and contact info',
    icon: Bot,
    color: 'purple',
  },
]

const comparisonRows = [
  { aspect: 'Discovery', website: 'Google indexes your pages', mcp: 'Agents discover your tools and capabilities automatically' },
  { aspect: 'Interaction', website: 'Humans click buttons and fill forms', mcp: 'Agents call functions with structured parameters' },
  { aspect: 'Data', website: 'HTML pages with text and images', mcp: 'Structured JSON with typed fields and schemas' },
  { aspect: 'Transactions', website: 'Checkout flow with cart and payment form', mcp: 'create_order() call with items and payment token' },
  { aspect: 'Availability', website: '"Call us to check" or calendar widget', mcp: 'check_availability() returns open slots instantly' },
  { aspect: 'Pricing', website: 'PDF price list or "contact for quote"', mcp: 'get_pricing() returns structured price data' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What does MCP stand for?',
    answer:
      'MCP stands for Model Context Protocol. It is an open standard created by Anthropic that defines how AI agents discover, connect to, and interact with external services. Think of it as the HTTP of the agent economy — a universal protocol that lets any agent talk to any service that implements it.',
  },
  {
    question: 'Do I need to be a developer to get an MCP server?',
    answer:
      'No. While MCP servers are technical infrastructure, platforms like AgentHermes can auto-generate one for your business. You fill out a form with your business details and AgentHermes creates and hosts an MCP server with tools customized for your industry. No coding required.',
  },
  {
    question: 'How is an MCP server different from an API?',
    answer:
      'An API is a set of endpoints that programs can call. An MCP server is a standardized layer on top that makes those endpoints discoverable and usable by AI agents specifically. It adds tool descriptions that agents can understand, structured schemas, and a discovery protocol. You can think of MCP as "API + agent-readable documentation + discovery protocol" in one package.',
  },
  {
    question: 'Will AI agents actually use my MCP server?',
    answer:
      'Yes, and adoption is accelerating. Claude, ChatGPT, and other major AI assistants already support MCP connections. As agents gain more autonomy to complete tasks on behalf of users — booking appointments, ordering products, comparing services — they will preferentially interact with businesses that have MCP servers because the interaction is reliable, structured, and fast compared to scraping websites.',
  },
  {
    question: 'How much does an MCP server cost?',
    answer:
      'Building a custom MCP server from scratch requires developer time and hosting infrastructure, typically costing thousands of dollars. AgentHermes provides hosted MCP servers starting with a free tier that includes basic tools. The infrastructure is managed for you — no servers to maintain, no code to write, no updates to deploy.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function WhatIsMcpServerPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is an MCP Server and Why Your Business Needs One',
    description:
      'MCP (Model Context Protocol) servers are how AI agents discover and interact with businesses. A complete guide to what MCP is, how it works, and why 33 million US businesses need one.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/what-is-mcp-server',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Education',
    wordCount: 1900,
    keywords:
      'what is MCP server, Model Context Protocol, MCP for business, AI agent MCP, business MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'What Is an MCP Server',
          item: 'https://agenthermes.ai/blog/what-is-mcp-server',
        },
      ],
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <BlogArticleWrapper
      title="What Is an MCP Server and Why Your Business Needs One"
      shareUrl="https://agenthermes.ai/blog/what-is-mcp-server"
      currentHref="/blog/what-is-mcp-server"
    >
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            <span className="text-zinc-400">What Is an MCP Server</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Server className="h-3.5 w-3.5" />
              MCP Explained
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Beginner Guide
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            What Is an MCP Server and{' '}
            <span className="text-emerald-400">Why Your Business Needs One</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Every business has a website so humans can find them. In the agent economy, every business
            needs an <strong className="text-zinc-100">MCP server</strong> so AI agents can find them too.
            There are 33 million small businesses in the US. Zero have MCP servers. That is the biggest
            infrastructure gap in tech right now.
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
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE ANALOGY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            The Simple Analogy: Websites Are for Humans, MCP Servers Are for Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In the 1990s, businesses needed websites. Not because they understood HTML, but because
              that is where customers were going. A business without a website was invisible to anyone
              searching online. The same shift is happening right now with AI agents.
            </p>
            <p>
              An <strong className="text-zinc-100">MCP server</strong> is to AI agents what a website is to
              humans. It is the interface through which agents discover your business, understand what you
              offer, and interact with your services. Without one, you are invisible to the fastest-growing
              channel of customer interaction.
            </p>
            <p>
              MCP stands for <strong className="text-zinc-100">Model Context Protocol</strong>. It is an
              open standard that defines how AI agents connect to and interact with external services. When
              an AI assistant needs to book a restaurant, check product availability, or schedule an
              appointment, it looks for MCP servers that offer those capabilities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '33M', label: 'US small businesses', icon: Store },
              { value: '0', label: 'with MCP servers', icon: Server },
              { value: '$6.2B', label: 'infrastructure gap', icon: DollarSign },
              { value: '10K+', label: 'MCP servers exist (dev tools only)', icon: Code2 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW MCP WORKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            How an MCP Server Works
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An MCP server exposes three types of capabilities that AI agents can discover and use.
              Together, these give an agent everything it needs to interact with your business without
              a human in the loop.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {mcpComponents.map((component) => {
              const colors = getColorClasses(component.color)
              return (
                <div
                  key={component.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <component.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{component.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{component.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{component.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              When an agent connects to your MCP server, it first reads the list of available tools,
              resources, and prompts. It then understands what your business offers and how to interact
              with it — all without any prior knowledge or custom integration. This is the power of a
              standard protocol: <strong className="text-zinc-100">any agent can talk to any MCP server</strong>,
              just like any browser can load any website.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WEBSITE VS MCP COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Website vs MCP Server: A Side-by-Side Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Think of every feature your website provides to human visitors. An MCP server provides
            the equivalent to AI agents — but in a structured, machine-readable format.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>Website (for Humans)</div>
              <div>MCP Server (for Agents)</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.website}</div>
                <div className="text-emerald-400">{row.mcp}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The critical difference is <strong className="text-zinc-100">structure</strong>. A website
              puts information in HTML that looks good to humans but is ambiguous to machines. An MCP server
              puts the same information in typed, structured formats that agents can process reliably.
              When an agent needs your business hours, it does not scrape your footer — it calls{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                get_business_info()
              </code>{' '}
              and gets a JSON object with hours, address, phone, and description.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE $6.2B GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The $6.2 Billion Gap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The MCP ecosystem has exploded to over 10,000 servers — but they are all developer tools.
              GitHub, Slack, Postgres, AWS, Docker. Every category of developer infrastructure has MCP
              coverage. But there is one massive category with exactly zero servers:{' '}
              <strong className="text-zinc-100">local businesses</strong>.
            </p>
            <p>
              There are{' '}
              <Link href="/blog/mcp-gap" className="text-emerald-400 hover:text-emerald-300 underline">
                33 million small businesses in the US
              </Link>. Restaurants, dentists, plumbers, salons, gyms, law firms, accountants. Not a single
              one has an MCP server. When someone asks an AI assistant to &ldquo;find me a plumber who can
              come tomorrow&rdquo; or &ldquo;book a table for four tonight,&rdquo; the agent has nothing to
              connect to. It falls back to web search and guesses.
            </p>
            <p>
              This is not a technology limitation — it is an infrastructure gap. The MCP protocol works.
              The AI agents are ready. The missing piece is <strong className="text-zinc-100">someone to
              build and host MCP servers for the 33 million businesses that will never build their
              own</strong>. That gap represents an estimated $6.2 billion in annual infrastructure
              spending.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Why businesses will not build their own:</strong> The same
              reason most businesses did not hand-code their own websites in 1998. They used platforms like
              Geocities, then Squarespace, then Shopify. MCP servers need the same platformization.
              AgentHermes is that platform — auto-generating and hosting MCP servers so business owners
              never touch infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO GET ONE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            How to Get an MCP Server for Your Business
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            AgentHermes auto-generates MCP servers for businesses across 15 verticals. Here is how
            it works.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Run a free Agent Readiness Scan',
                detail: 'Visit /audit and enter your business URL. In 60 seconds you will see your score across all 9 dimensions, your ARL level, and exactly what is missing.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Connect through the wizard',
                detail: 'Visit /connect and select your industry. The wizard pre-fills MCP tools specific to your vertical — a restaurant gets menu and reservation tools, a plumber gets service area and booking tools.',
                icon: Link2,
              },
              {
                step: '3',
                title: 'AgentHermes generates your MCP server',
                detail: 'Your hosted MCP endpoint goes live at agenthermes.ai/api/mcp/hosted/your-business with SSE transport. Tools are customized with your business data — hours, services, pricing, availability.',
                icon: Server,
              },
              {
                step: '4',
                title: 'Discovery files are auto-created',
                detail: 'You get an agent-card.json, llms.txt, and a listing in the AgentHermes registry. AI agents can now discover your business through standard agent protocols.',
                icon: Globe,
              },
              {
                step: '5',
                title: 'Agents start interacting',
                detail: 'When someone asks an AI assistant about your type of business, the agent can now call your MCP tools directly — checking availability, getting quotes, and booking appointments without phone calls.',
                icon: Bot,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The entire process takes under 5 minutes. You go from invisible to agent-accessible
              without writing a line of code. AgentHermes handles hosting, updates, and scaling — your
              MCP server runs alongside thousands of others on shared infrastructure optimized for
              agent traffic.
            </p>
            <p>
              Your{' '}
              <Link href="/standard" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-hermes.json
              </Link>{' '}
              file follows an open standard, meaning any agent platform can read it — not just ones
              connected to AgentHermes. You are building on open infrastructure, not a walled garden.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT HAPPENS WITHOUT ONE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            What Happens Without an MCP Server
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Agents cannot find you',
                detail: 'When someone asks an AI assistant for a business like yours, the agent queries MCP registries and agent cards. No MCP server means you are not in the results — period.',
              },
              {
                title: 'Competitors capture your traffic',
                detail: 'The first businesses in each category to become agent-ready will capture 100% of agent-driven traffic. This is a first-mover advantage that compounds over time.',
              },
              {
                title: 'Phone calls instead of automation',
                detail: 'Without an MCP server, the only way for an agent to interact with your business is to tell the user to call you. That user will choose the competitor that the agent can book directly.',
              },
              {
                title: 'Your score stays at zero',
                detail: 'AgentHermes scans show that businesses without any agent infrastructure score 0-19 on the Agent Readiness Score. That is ARL-0: Dark — completely invisible to the agent economy.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The businesses that moved to the web early in the 2000s had a decade-long advantage over
              those that waited. The same dynamic is playing out now with MCP servers. The technology is
              new, adoption is early, and the cost of getting in is low. The cost of waiting is losing
              an entirely new customer acquisition channel to competitors who moved first.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-emerald-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="text-base font-bold text-zinc-100 mb-3">{faq.question}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
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
                title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
                href: '/blog/mcp-gap',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
                tagColor: 'emerald',
              },
              {
                title: 'ARL Levels Explained: From Dark to Interoperable',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
            ].map((article) => {
              const colors = getColorClasses(article.tagColor)
              return (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}>
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
            Get your MCP server in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score, then connect your business to the agent economy.
            Auto-generated MCP server, agent card, and registry listing — no code required.
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
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Connect My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
