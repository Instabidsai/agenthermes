import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileText,
  HelpCircle,
  Home,
  Key,
  Layers,
  MapPin,
  Phone,
  Search,
  Server,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Real Estate Agent Readiness: Why Property Listings Are Invisible to AI Agents | AgentHermes',
  description:
    'Real estate sits at the bottom of our Agent Readiness Leaderboard. Listings trapped in PDF flyers, MLS-gated data, phone-only showings, and Zillow-dependent discovery. Here is what agent-ready real estate looks like — and why first movers will own the category.',
  keywords: [
    'real estate agent readiness AI',
    'AI real estate agents',
    'MLS API access',
    'structured property listings',
    'real estate MCP server',
    'agent-ready brokerage',
    'automated showing scheduling',
    'digital offer submission',
    'real estate API',
  ],
  openGraph: {
    title: 'Real Estate Agent Readiness: Why Property Listings Are Invisible to AI Agents',
    description:
      'Real estate is Zillow-dependent, PDF-gated, and phone-only. Zero brokerages in our scan have an MCP server or agent card. First movers will own the category.',
    url: 'https://agenthermes.ai/blog/real-estate-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Real Estate Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Agent Readiness: Why Property Listings Are Invisible to AI Agents',
    description:
      'Listings trapped in PDFs. Showings gated by phone calls. MLS feeds private. Real estate sits in the bottom quartile of our 500-business scan.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/real-estate-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const failurePatterns = [
  {
    name: 'PDF Flyers for Listings',
    description: 'Brokerage websites link to Adobe-hosted PDF flyers for property details. An AI agent cannot reliably parse price, beds, baths, square footage, or tax history out of a styled PDF meant for human eyes.',
    impact: 'D6 Data Quality drops to near zero. No structured listing data = no comparability across properties.',
    icon: FileText,
    color: 'red',
  },
  {
    name: 'Zillow and Realtor.com Dependency',
    description: 'Most brokerages treat Zillow as their agent readiness strategy. The problem: Zillow is an intermediary, not your business. An agent querying "homes for sale in Austin under $600K" gets Zillow results, and the listing brokerage is invisible in the transaction.',
    impact: 'D1 Discovery fails. Your brand never enters the agent conversation — Zillow captures the lead.',
    icon: Building2,
    color: 'amber',
  },
  {
    name: 'Phone-Only Showing Requests',
    description: 'Showing a property still requires calling a listing agent, texting a showing service, or emailing the brokerage. No check_availability() endpoint. No book_showing() tool. The agent hits a dead end and tells the user to call.',
    impact: 'D3 Onboarding and D9 Agent Experience both fail. The transaction moves to a competitor that is agent-bookable.',
    icon: Phone,
    color: 'red',
  },
  {
    name: 'MLS Data Gatekeeping',
    description: 'The MLS (Multiple Listing Service) contains the richest structured property data in the industry, but access is restricted to licensed agents and paid IDX feeds. Public agent-accessible MLS APIs essentially do not exist.',
    impact: 'The single source of truth for real estate is walled off from the agent economy. Developers and brokerages cannot build agent-ready experiences on top of it.',
    icon: Layers,
    color: 'amber',
  },
  {
    name: 'No Offer Submission API',
    description: 'Submitting an offer still means PDFs, DocuSign flows, and email chains. No structured submit_offer() tool. No way for an agent to place a bid on behalf of a user, even with explicit authorization and a verified identity.',
    impact: 'D2 API and D5 Payment both fail. The most valuable transaction in the category stays human-only.',
    icon: XCircle,
    color: 'red',
  },
]

const fixSteps = [
  {
    step: '1',
    title: 'Publish structured listings as JSON-LD',
    detail: 'Add schema.org RealEstateListing markup to every property page. Include price, address, numberOfRooms, numberOfBathrooms, floorSize, yearBuilt, and availabilityStarts. This alone moves a typical brokerage from Not Scored to Bronze.',
    icon: Code2,
  },
  {
    step: '2',
    title: 'Expose a public search API',
    detail: 'Most brokerages already have an IDX feed behind the search results page. Put a thin API wrapper in front of it: GET /api/listings?city=austin&min_price=500000. Return JSON with consistent field names.',
    icon: Server,
  },
  {
    step: '3',
    title: 'Add a check_availability tool',
    detail: 'Showing availability is the single highest-value tool for real estate. Expose open showing windows from your MLS or CRM. Return structured time slots agents can compare across listings.',
    icon: Calendar,
  },
  {
    step: '4',
    title: 'Publish an agent-card.json and llms.txt',
    detail: 'Zero of the 500 businesses in our latest scan publish an agent card. The first brokerage in a market to do this gets exclusive surface area on agent discovery queries until competitors catch up.',
    icon: FileText,
  },
  {
    step: '5',
    title: 'Host an MCP server for your brokerage',
    detail: 'AgentHermes auto-generates an MCP server with tools like search_listings, get_listing_details, check_showing_availability, book_showing, and request_info. No custom code required — published at agenthermes.ai/api/mcp/hosted/your-brokerage.',
    icon: Home,
  },
]

const scoreBreakdown = [
  { dimension: 'D1 Discovery', weight: '12%', typicalBrokerage: '45/100', agentReady: '85/100', gap: 'Agent card, llms.txt, registry listing' },
  { dimension: 'D2 API Surface', weight: '15%', typicalBrokerage: '10/100', agentReady: '80/100', gap: 'Public listings API, consistent JSON' },
  { dimension: 'D3 Onboarding', weight: '8%', typicalBrokerage: '20/100', agentReady: '70/100', gap: 'API key self-signup, webhook registration' },
  { dimension: 'D4 Pricing Transparency', weight: '5%', typicalBrokerage: '55/100', agentReady: '80/100', gap: 'Commission structure, closing cost estimates' },
  { dimension: 'D6 Data Quality', weight: '10%', typicalBrokerage: '25/100', agentReady: '85/100', gap: 'JSON-LD, structured errors, typed fields' },
  { dimension: 'D9 Agent Experience', weight: '10%', typicalBrokerage: '15/100', agentReady: '80/100', gap: 'MCP tools, AGENTS.md, prompts' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do real estate brokerages score so low on Agent Readiness?',
    answer:
      'Real estate sits in the bottom quartile of our 500-business scan because the industry has optimized for human buyer journeys through intermediaries like Zillow and Realtor.com. The listing brokerage rarely owns the discovery or transaction layer. Combine that with PDF flyers, MLS gatekeeping, and phone-only showings and you end up with sites that look polished to humans but return HTML fragments, styled images, and "Contact us" forms to any AI agent trying to do real work.',
  },
  {
    question: 'Can I become agent-ready without breaking my MLS agreement?',
    answer:
      'Yes. MLS agreements restrict redistribution of MLS-sourced data, but they do not prevent you from exposing your own brokerage inventory, showing calendar, agent roster, and brand content through an API. Start with the data you own — your active listings with standard IDX permissions, your team, your service areas, and your scheduling system. Most brokerages already publish this to their website; wrapping it in a JSON API is a thin layer on top of existing infrastructure.',
  },
  {
    question: 'What does an agent-ready real estate MCP server actually expose?',
    answer:
      'The AgentHermes real estate vertical template exposes five tools: search_listings (filter by city, price, beds, baths), get_listing_details (full property record), check_showing_availability (open time slots per listing), book_showing (create a tour request), and request_info (capture qualified leads). It also publishes resources for brokerage info, agent roster, and service areas, plus a prompt template that guides an agent through a buyer journey from search to tour booking.',
  },
  {
    question: 'Will AI agents actually replace Zillow for home search?',
    answer:
      'Zillow will not disappear, but agents will become the new discovery layer on top of it. When a buyer tells an AI assistant "find me a 3-bedroom under $500K with a yard in zip 78704 and book Saturday showings," the agent will query whatever data sources are easiest to consume. Today that is Zillow because the agent has no better option. Tomorrow it will be the brokerages that expose structured listings, availability, and booking directly — because the agent can complete the full task without a human handoff.',
  },
  {
    question: 'What is the first-mover advantage in real estate agent readiness?',
    answer:
      'In the 500-business scan, zero brokerages published an agent-card.json and zero had an MCP server. The first brokerage in a metro to ship both will be the only agent-accessible option for months. Buyer-side agents will route inquiries there by default because no competing surface exists. That compounds into lead volume, brand recognition in the agent ecosystem, and data on which tools agents actually use — which you can then productize.',
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

export default function RealEstateAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Real Estate Agent Readiness: Why Property Listings Are Invisible to AI Agents',
    description:
      'Real estate sits at the bottom of our Agent Readiness Leaderboard. PDF flyers, MLS gatekeeping, and phone-only showings keep brokerages invisible to AI agents. Here is the playbook for agent-ready real estate.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/real-estate-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1850,
    keywords:
      'real estate agent readiness AI, MLS API, structured property listings, real estate MCP server, agent-ready brokerage',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Real Estate Agent Readiness',
          item: 'https://agenthermes.ai/blog/real-estate-agent-readiness',
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
      title="Real Estate Agent Readiness: Why Property Listings Are Invisible to AI Agents"
      shareUrl="https://agenthermes.ai/blog/real-estate-agent-readiness"
      currentHref="/blog/real-estate-agent-readiness"
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
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Real Estate Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Home className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Bottom Quartile
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Real Estate Agent Readiness:{' '}
            <span className="text-emerald-400">Why Property Listings Are Invisible to AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Real estate is one of the largest transaction categories in the economy — and one of the worst
            prepared for the agent economy. Of the 500 businesses scanned by AgentHermes, zero brokerages
            have an <strong className="text-zinc-100">MCP server</strong>, zero publish an{' '}
            <strong className="text-zinc-100">agent-card.json</strong>, and the industry average score
            lives firmly in the Bronze tier. Listings are trapped in PDFs. Showings require phone calls.
            And the entire MLS is walled off from the agent layer that will reshape how people buy homes.
          </p>

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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE STATE OF REAL ESTATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The State of Real Estate in the 500-Business Scan
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Across the 500 businesses AgentHermes has scanned, the industry average Agent Readiness Score
              is <strong className="text-zinc-100">43/100</strong>. One company reached Gold (Resend at 75).
              Fifty-two hit Silver. Real estate brokerages cluster in Bronze and below — typically scoring
              between 22 and 38, with a handful of national franchises climbing into the low 40s on the
              strength of schema markup and decent OpenAPI coverage for their developer portals.
            </p>
            <p>
              The deeper problem is uniformity. Every brokerage has the same failure pattern: Zillow-style
              search on the homepage, listing detail pages with beautiful photos but unparseable prices,
              a "Schedule a Tour" button that opens a form, and a phone number for everything else. None
              of that is usable by an AI agent trying to shortlist three properties and book Saturday
              showings for a user who just asked one question.
            </p>
            <p>
              Compare this to e-commerce, where Shopify-powered stores score an average of{' '}
              <Link href="/blog/ecommerce-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                58/100 on Agent Readiness
              </Link>{' '}
              because the platform handles structured product catalogs, inventory APIs, and checkout flows
              out of the box. Real estate has no equivalent platform layer.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0', label: 'brokerages with MCP servers', icon: Server },
              { value: '0', label: 'published agent cards', icon: FileText },
              { value: '22-38', label: 'typical score range', icon: TrendingUp },
              { value: '$1.9T', label: 'annual US home sales', icon: DollarSign },
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

      {/* ===== FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Five Failure Patterns That Keep Real Estate Invisible
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every brokerage site in the scan exhibited at least three of these patterns. The worst had all
            five — a score of 19 or below, what AgentHermes classifies as{' '}
            <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline">
              ARL-0 Dark
            </Link>
            .
          </p>

          <div className="space-y-4 mb-8">
            {failurePatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{pattern.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className={`${colors.text} font-medium`}>Score impact:</span>{' '}
                      <span className="text-zinc-400">{pattern.impact}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SCORE BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Where the Points Are Lost: Dimension-by-Dimension
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The Agent Readiness Score has nine dimensions. Real estate fails hardest on the Tier 1
            dimensions that carry the most weight. This is the gap, in detail.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Weight</div>
              <div>Typical</div>
              <div>Agent-Ready</div>
              <div>Gap to Close</div>
            </div>
            {scoreBreakdown.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-5 p-4 text-xs ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-zinc-500">{row.weight}</div>
                <div className="text-red-400">{row.typicalBrokerage}</div>
                <div className="text-emerald-400">{row.agentReady}</div>
                <div className="text-zinc-400">{row.gap}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The biggest gains come from D2 API Surface (15% weight) and D6 Data Quality (10% weight).
              A brokerage that publishes a single public listings API returning JSON with consistent
              field names can move from a typical 28 to a Silver-tier 62 without touching a single other
              dimension. Add an MCP server and you enter Gold territory.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AGENT-READY PLAYBOOK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Agent-Ready Real Estate Playbook
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five concrete steps that will move a typical brokerage from Not Scored to Silver or Gold.
            None of them require a platform migration or MLS renegotiation.
          </p>

          <div className="space-y-3 mb-8">
            {fixSteps.map((item) => (
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">First-mover math:</strong> In a metro with 40 active
              brokerages and zero agent-ready competitors, the first brokerage to publish an MCP server
              becomes the exclusive agent-discovery surface for months. Every AI-assisted home search in
              that metro routes through their tools. Lead volume compounds while competitors spend
              quarters deciding whether to care.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE BIGGER PICTURE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Why Real Estate Is the Biggest Opportunity in the Agent Economy
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The average American moves 11.7 times in a lifetime. Each move involves dozens of
              high-intent interactions: search, tour, offer, inspection, financing, close. Every one of
              those steps is a candidate for agent assistance. The category represents{' '}
              <strong className="text-zinc-100">$1.9 trillion</strong> in annual US home sales alone —
              before you count commercial, rentals, or property management.
            </p>
            <p>
              Compared to{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local services
              </Link>
              , which have equally bad agent readiness but much lower per-transaction values, real estate
              has the highest revenue-per-agent-interaction of any vertical. One booked showing is worth
              more than 10,000 restaurant reservations in lifetime value.
            </p>
            <p>
              And yet the entire category is trapped behind PDF flyers, Zillow, and phone numbers. The
              brokerages that recognize this — and build structured, agent-accessible infrastructure before
              the rest of the industry wakes up — will capture disproportionate share of the first agent
              economy cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Zillow is not your moat',
                detail: 'Intermediaries are the first to be disintermediated by agents. Zillow currently captures the discovery layer. Agents will capture it next — and route buyers to whoever has structured data.',
              },
              {
                title: 'MLS reform is inevitable',
                detail: 'Settlements and regulatory pressure are already loosening MLS data access. The next three years will see public-facing MLS APIs. Brokerages that have agent infrastructure ready will benefit first.',
              },
              {
                title: 'Per-transaction value is extreme',
                detail: 'A single agent-sourced lead in real estate is worth thousands in commission. No other vertical has this leverage per agent interaction.',
              },
              {
                title: 'The standard is set by early movers',
                detail: 'Whichever brokerage ships MCP first in a metro becomes the de-facto pattern. Competitors will copy their endpoints and tool names — not the other way around.',
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
                title: 'Local Business Agent Readiness: Why Main Street Is Invisible',
                href: '/blog/local-business-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'ARL Levels Explained: From Dark to Interoperable',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
                href: '/blog/mcp-gap',
                tag: 'Market Analysis',
                tagColor: 'amber',
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
            Score your brokerage in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See exactly where your real estate site ranks on the 9-dimension Agent Readiness Score —
            and which listings, tools, and discovery files are missing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Audit My Brokerage
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              <Key className="h-4 w-4" />
              Connect My Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
