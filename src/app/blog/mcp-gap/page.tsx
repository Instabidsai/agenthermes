import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  Hammer,
  Layers,
  MapPin,
  Server,
  Sparkles,
  Stethoscope,
  Store,
  Target,
  TrendingUp,
  User,
  UtensilsCrossed,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap | AgentHermes',
  description:
    'There are 10,000+ MCP servers in the ecosystem, but zero for local businesses. 33 million US small businesses have no agent presence. Here is why that gap is the biggest opportunity in the agent economy.',
  openGraph: {
    title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
    description:
      '10,000+ MCP servers exist. Zero serve local businesses. 33M small businesses with no agent presence represents a $6.2B infrastructure gap.',
    url: 'https://agenthermes.ai/blog/mcp-gap',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
    description:
      '10,000+ MCP servers exist. Zero serve local businesses. 33M small businesses with no agent presence.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/mcp-gap',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const mcpStats = [
  { value: '10,000+', label: 'MCP servers in the ecosystem', icon: Server },
  { value: '0', label: 'MCP servers for local businesses', icon: Building2 },
  { value: '33M', label: 'US small businesses', icon: Store },
  { value: '$6.2B', label: 'annual infrastructure gap', icon: DollarSign },
]

const verticalNeeds = [
  {
    vertical: 'Plumber',
    icon: Wrench,
    tools: [
      'get_service_area — coverage zip codes and radius',
      'check_availability — next available appointment slots',
      'get_quote — pricing by service type (drain, pipe, water heater)',
      'book_appointment — schedule with address and problem description',
      'get_emergency_status — 24/7 availability and emergency pricing',
    ],
  },
  {
    vertical: 'Restaurant',
    icon: UtensilsCrossed,
    tools: [
      'get_menu — full menu with prices, allergens, dietary tags',
      'check_availability — table availability by date, time, party size',
      'make_reservation — book with preferences (outdoor, booth)',
      'place_order — takeout/delivery order with customizations',
      'get_wait_time — current wait estimate for walk-ins',
    ],
  },
  {
    vertical: 'Dentist',
    icon: Stethoscope,
    tools: [
      'get_services — procedures, pricing, insurance accepted',
      'check_availability — open slots by provider and procedure type',
      'book_appointment — schedule with insurance info and reason',
      'get_emergency — same-day availability and emergency protocols',
      'verify_insurance — check if a specific plan is accepted',
    ],
  },
  {
    vertical: 'Contractor',
    icon: Hammer,
    tools: [
      'get_services — specialties (roofing, painting, remodel)',
      'request_quote — scope of work with photos and dimensions',
      'check_availability — project start date estimates',
      'get_portfolio — past projects with photos and reviews',
      'verify_license — license number, insurance, bonding status',
    ],
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function McpGapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
    description:
      'Analysis of the gap between the 10,000+ MCP server ecosystem and the zero servers serving 33 million US local businesses.',
    datePublished: '2026-03-25',
    dateModified: '2026-03-30',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/mcp-gap',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Market Analysis',
    wordCount: 1600,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'The MCP Gap',
          item: 'https://agenthermes.ai/blog/mcp-gap',
        },
      ],
    },
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">The MCP Gap</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Zap className="h-3.5 w-3.5" />
              Market Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              $6.2B Gap
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Zero MCP Servers for Local Businesses —{' '}
            <span className="text-amber-400">The $6.2B Gap</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The MCP ecosystem has exploded to over 10,000 servers. GitHub, Slack, databases,
            cloud providers, dev tools — every category of developer infrastructure has MCP coverage.
            But there is one category with exactly zero servers: <strong className="text-zinc-100">
            local businesses</strong>.
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              AgentHermes Research
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              March 25, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              10 min read
            </span>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {mcpStats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* The Problem */}
          <div className="space-y-6 text-zinc-300 leading-relaxed">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
              <Globe className="h-5 w-5 text-amber-500" />
              The Problem: An Ecosystem Built for Developers, Not Businesses
            </h2>
            <p>
              Browse any MCP server directory and you will find hundreds of servers for Postgres, Redis,
              AWS, Docker, GitHub, and Notion. The MCP ecosystem was born in developer tooling, and it
              shows. These servers are built by developers, for developers, to help AI agents interact
              with developer infrastructure.
            </p>
            <p>
              But the agent economy is not just about developer tools. When an AI assistant is asked
              &ldquo;find me a plumber who can come tomorrow,&rdquo; or &ldquo;book a table for four at an Italian
              restaurant near me,&rdquo; or &ldquo;schedule a teeth cleaning with a dentist who accepts Delta
              Dental&rdquo; — there is no MCP server to call. The agent has nothing to connect to.
              It falls back to web search, scrapes HTML, and guesses.
            </p>
            <p>
              This is not a marginal problem. There are <strong className="text-zinc-100">33 million small businesses
              in the United States</strong>. They represent the vast majority of economic activity that
              consumers interact with daily. And not a single one has an MCP server.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT LOCAL BUSINESSES NEED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Wrench className="h-6 w-6 text-amber-500" />
            What MCP Tools Does a Local Business Actually Need?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            We analyzed 15 local business verticals to identify the 5-7 MCP tools each one
            needs to become agent-accessible. The pattern is remarkably consistent: every local
            business needs discovery, availability, pricing, and booking tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verticalNeeds.map((vertical) => (
              <div
                key={vertical.vertical}
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <vertical.icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{vertical.vertical}</h3>
                </div>
                <ul className="space-y-2">
                  {vertical.tools.map((tool, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-zinc-400">
                        <code className="text-amber-400 bg-zinc-800/50 px-1 py-0.5 rounded text-xs">
                          {tool.split(' — ')[0]}
                        </code>
                        {' '}{tool.includes(' — ') ? `— ${tool.split(' — ')[1]}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The pattern:</strong> Every local business vertical
              needs the same 7 universal tools — <code className="text-amber-300 text-xs">get_info</code>,{' '}
              <code className="text-amber-300 text-xs">get_services</code>,{' '}
              <code className="text-amber-300 text-xs">check_availability</code>,{' '}
              <code className="text-amber-300 text-xs">get_quote</code>,{' '}
              <code className="text-amber-300 text-xs">book</code>,{' '}
              <code className="text-amber-300 text-xs">search</code>, and one vertical-specific tool.
              This means a template-based approach can cover 80% of local business needs with minimal
              customization.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY THE GAP EXISTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Why the Gap Exists
          </h2>
          <div className="space-y-4">
            {[
              {
                reason: 'Local businesses have no APIs',
                detail:
                  'Most small businesses operate through phone calls, walk-ins, and basic websites. There is no API to wrap with an MCP server. The MCP server must CREATE the API, not just wrap an existing one.',
              },
              {
                reason: 'MCP server builders are developers, not business owners',
                detail:
                  'The people building MCP servers work at tech companies. They build tools for their own workflows: databases, cloud infra, code tools. They have never built something for a plumber or a dentist.',
              },
              {
                reason: 'No business model for individual local MCP servers',
                detail:
                  'Building a custom MCP server for one plumber is not economically viable. The unit economics only work at scale — hundreds or thousands of businesses on a shared, templatized platform.',
              },
              {
                reason: 'The hosting problem is unsolved',
                detail:
                  'Even if a local business wanted an MCP server, where would it run? They do not have servers. They need hosted MCP — someone else runs the infrastructure, they provide the business data.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2">{item.reason}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW AGENTHERMES SOLVES IT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            How AgentHermes Closes the Gap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes solves this with three capabilities that did not exist until now:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Vertical Templates',
                detail:
                  '15 pre-built MCP tool templates for local business verticals. A plumber fills out a form — AgentHermes generates 5 MCP tools customized to their service area, pricing, and availability.',
                icon: Layers,
                color: 'emerald',
              },
              {
                title: 'Hosted MCP',
                detail:
                  'AgentHermes hosts and operates the MCP server. The business owner never touches infrastructure. Their MCP endpoint lives at agenthermes.ai/api/mcp/hosted/{slug} with SSE transport.',
                icon: Server,
                color: 'blue',
              },
              {
                title: 'Agent Card + Discovery',
                detail:
                  'Every connected business gets an agent card, llms.txt, and registry listing automatically. Agents discover them through the AgentHermes network, not through Google search.',
                icon: Globe,
                color: 'purple',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-5 rounded-xl bg-${item.color}-500/5 border border-${item.color}-500/20`}
              >
                <item.icon className={`h-6 w-6 text-${item.color}-400 mb-3`} />
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The result: a plumber goes from invisible to agent-accessible in 60 seconds. An AI
              assistant asking &ldquo;find a plumber near me who can come tomorrow&rdquo; can now call{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                check_availability</code> and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                book_appointment</code> directly — no web scraping, no guessing, no phone call.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE MATH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            The Market Math
          </h2>

          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                <span className="text-zinc-400">US small businesses</span>
                <span className="text-zinc-100 font-bold">33,000,000</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                <span className="text-zinc-400">Addressable (service-based, need booking)</span>
                <span className="text-zinc-100 font-bold">~16,000,000</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                <span className="text-zinc-400">AgentHermes pricing (Connect plan)</span>
                <span className="text-zinc-100 font-bold">$29/month</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                <span className="text-zinc-400">1% penetration of addressable market</span>
                <span className="text-zinc-100 font-bold">160,000 businesses</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                <span className="text-zinc-400">Annual revenue at 1% penetration</span>
                <span className="text-amber-400 font-bold">$55.7M/year</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-zinc-400">Full TAM (all 33M at $29/mo)</span>
                <span className="text-amber-400 font-bold text-lg">$11.5B/year</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The $6.2B figure comes from a more conservative estimate: the 17.8 million US businesses
              that are primarily service-based (restaurants, healthcare, home services, professional
              services, fitness, beauty) at $29/month for hosted MCP infrastructure. Even this
              conservative slice represents a market larger than most SaaS categories.
            </p>
            <p>
              But the revenue opportunity is secondary to the structural advantage. Whoever builds the
              MCP layer for local businesses controls the routing of agent-driven commerce. When an agent
              decides where to book a restaurant or hire a plumber, it queries the MCP servers it knows
              about. If your business does not have one, you do not exist in the agent economy.
            </p>
            <p>
              <strong className="text-zinc-100">The first platform to connect 100,000 local businesses to the
              agent economy wins the routing layer.</strong> That is not a SaaS business — it is an
              infrastructure monopoly.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT HAPPENS NEXT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            What Happens When Local Businesses Get MCP Servers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Agents can comparison shop locally',
                text: 'Instead of showing Google results, an AI assistant can call check_availability across 10 plumbers simultaneously and find the one who can come soonest at the best price.',
              },
              {
                title: 'Bookings happen without phone calls',
                text: 'The average service business spends 4-6 hours per week on phone scheduling. MCP-connected businesses get agent-booked appointments while they work.',
              },
              {
                title: 'Reviews become machine-verifiable',
                text: 'Agent cards include structured ratings, response times, and completion rates. Agents can verify quality signals instead of parsing natural language reviews.',
              },
              {
                title: 'The Google dependency breaks',
                text: 'Local businesses currently live or die by Google search ranking. In the agent economy, discovery happens through MCP registries and agent networks. New distribution channel, new winners.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Be the first in your market
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Connect your business to the agent economy in 60 seconds. Get your MCP server,
            agent card, and discovery listing — before your competitors do.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Connect My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/for"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See All Verticals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
