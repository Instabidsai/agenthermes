import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  HelpCircle,
  MapPinned,
  Phone,
  Search,
  Shield,
  Users,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Venue and Event Space Agent Readiness: Why Conference Centers and Wedding Venues Can\'t Be Booked by AI | AgentHermes',
  description:
    'Venues, conference centers, wedding venues, co-working spaces, and community halls all require human-mediated booking. No availability API, no structured pricing, no capacity data. Here is what agent-ready looks like for event spaces.',
  keywords: [
    'venue event space agent readiness',
    'conference center AI booking',
    'wedding venue agent readiness',
    'co-working space API',
    'event space AI agent',
    'venue booking API',
    'agent readiness venues',
    'AI event planner',
  ],
  openGraph: {
    title: 'Venue and Event Space Agent Readiness: Why Conference Centers and Wedding Venues Can\'t Be Booked by AI',
    description:
      'The $50B+ event venue industry is invisible to AI agents. No availability API, no structured pricing, phone-only booking. Here is the agent-ready roadmap.',
    url: 'https://agenthermes.ai/blog/venue-event-space-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Venue and Event Space Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venue Agent Readiness: Why AI Can\'t Book Conference Centers',
    description:
      'No availability API, no structured pricing, no capacity data. The event venue industry scores under 10 on agent readiness.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/venue-event-space-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const venueTypes = [
  {
    name: 'Conference Centers',
    avgScore: '6/100',
    issue: 'Capacity and pricing gated behind RFP process. No public room catalog. Rates vary by day, season, and event type.',
    icon: Building2,
    color: 'amber',
  },
  {
    name: 'Wedding Venues',
    avgScore: '4/100',
    issue: 'Mandatory site visits before booking. Custom quotes only. Seasonal pricing unpublished. Packages (catering, florals, DJ) bundled opaquely.',
    icon: Calendar,
    color: 'red',
  },
  {
    name: 'Co-Working Spaces',
    avgScore: '22/100',
    issue: 'Best in category due to digital-native operators. WeWork/Regus have some APIs but gated. Independent spaces: phone or walk-in only.',
    icon: Users,
    color: 'emerald',
  },
  {
    name: 'Community Halls',
    avgScore: '2/100',
    issue: 'Municipal or nonprofit owned. Paper-based reservation systems. No website API whatsoever. Often require in-person deposit.',
    icon: MapPinned,
    color: 'purple',
  },
]

const agentReadyFeatures = [
  {
    feature: 'Room Catalog API',
    description: 'Structured JSON endpoint listing all bookable spaces with dimensions, capacity (theater, banquet, classroom), amenities (AV, WiFi, kitchen access), and photos.',
    dimension: 'D2 API Quality + D6 Data Quality',
    priority: 'Critical',
  },
  {
    feature: 'Availability Calendar API',
    description: 'Real-time endpoint returning open dates and time slots per room. Accepts date range query parameters. Returns blocked dates, hold periods, and setup/teardown windows.',
    dimension: 'D2 API Quality',
    priority: 'Critical',
  },
  {
    feature: 'Automated Quote Engine',
    description: 'Pricing endpoint that accepts event type, guest count, date, and duration. Returns itemized quote with room rental, catering minimums, AV packages, and service fees. Replaces the manual RFP.',
    dimension: 'D4 Pricing Transparency',
    priority: 'High',
  },
  {
    feature: 'Booking Deposit Endpoint',
    description: 'Endpoint that accepts a booking request with payment token. Creates a hold on the space with a deposit charge. Returns booking confirmation with cancellation terms. This is the transactional layer that makes venue booking completable by agents.',
    dimension: 'D5 Payment',
    priority: 'High',
  },
  {
    feature: 'Event Configuration API',
    description: 'Structured selection of add-ons: catering menus, AV equipment, furniture layouts, staffing needs. Each option has pricing. Agent can build a complete event package without human negotiation.',
    dimension: 'D2 API Quality + D4 Pricing',
    priority: 'Medium',
  },
]

const comparisonRows = [
  { aspect: 'Find venues', current: 'Google search, WeddingWire, Yelp', agentReady: 'Room catalog API with capacity, amenities, photos' },
  { aspect: 'Check availability', current: 'Email inquiry, wait 24-72 hours', agentReady: 'Real-time availability endpoint, instant response' },
  { aspect: 'Get pricing', current: '"Contact us for a custom quote"', agentReady: 'Automated quote engine with itemized pricing' },
  { aspect: 'Compare venues', current: 'Spreadsheet with phone-gathered data', agentReady: 'Agent queries 20 venues in parallel, ranks by criteria' },
  { aspect: 'Book and deposit', current: 'Phone call, contract PDF, wire transfer', agentReady: 'Booking endpoint with deposit payment token' },
  { aspect: 'Configure event', current: 'In-person walkthrough with coordinator', agentReady: 'Event configuration API with structured add-ons' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do venue scores average so low compared to other verticals?',
    answer:
      'Venues have a uniquely human-centric sales process. Unlike restaurants (which at least have published menus) or hotels (which have room APIs via OTAs), venue booking involves custom quotes for every event, mandatory site visits, and negotiated packages. There is no structured data exposed to any external system — let alone AI agents.',
  },
  {
    question: 'Are any venue platforms agent-ready today?',
    answer:
      'Co-working aggregators like Deskpass and LiquidSpace are the closest, scoring 20-28 due to real-time availability and online booking. Traditional venue platforms like The Knot and WeddingWire are directories with contact forms, not transactional APIs. No major conference center or wedding venue has an MCP server.',
  },
  {
    question: 'What would an AI event planner agent need from a venue API?',
    answer:
      'An AI event planner needs five things to book a venue without human intervention: (1) room catalog with capacity and amenities, (2) real-time availability for a date range, (3) automated pricing that accounts for event type, guest count, and date, (4) a booking endpoint that accepts a deposit, and (5) add-on configuration for catering, AV, and staffing. Today, zero venues offer all five.',
  },
  {
    question: 'How can a small venue get agent-ready without building an API?',
    answer:
      'AgentHermes generates hosted MCP servers for venues. You provide your room catalog, pricing rules, and connect your calendar. AgentHermes creates API endpoints for availability, quoting, and booking — hosted at agenthermes.ai/api/mcp/hosted/your-venue. No development required. You go from phone-only to agent-bookable in under an hour.',
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

export default function VenueEventSpaceAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Venue and Event Space Agent Readiness: Why Conference Centers and Wedding Venues Can\'t Be Booked by AI',
    description:
      'The $50B+ event venue industry is invisible to AI agents. No availability API, no structured pricing, phone-only booking. Complete analysis of the gap and the roadmap to agent readiness.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/venue-event-space-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1700,
    keywords:
      'venue event space agent readiness, conference center AI booking, wedding venue agent readiness, AI event planner',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Venue and Event Space Agent Readiness',
          item: 'https://agenthermes.ai/blog/venue-event-space-agent-readiness',
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
      title="Venue and Event Space Agent Readiness: Why Conference Centers and Wedding Venues Can't Be Booked by AI"
      shareUrl="https://agenthermes.ai/blog/venue-event-space-agent-readiness"
      currentHref="/blog/venue-event-space-agent-readiness"
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
            <span className="text-zinc-400">Venue and Event Space Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <MapPinned className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Events Industry
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Venue and Event Space Agent Readiness:{' '}
            <span className="text-emerald-400">Why Conference Centers and Wedding Venues Cannot Be Booked by AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Conference centers, wedding venues, co-working spaces, community halls — the entire event
            space industry requires human-mediated booking. No availability API, no structured pricing,
            no room capacity data. AI event planning agents have nowhere to send requests. Average
            score: 8 out of 100.
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
                  14 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE CURRENT STATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            The Current State: Phone Calls, Site Visits, and Custom Quotes
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Try booking a conference center through an AI agent. Ask Claude to find a venue for a
              200-person corporate retreat in Austin next March. The agent will search the web, find a
              list of venues, and then tell you to call each one individually. It cannot check
              availability, get pricing, or reserve a space because none of that data is exposed through
              any API.
            </p>
            <p>
              The venue industry operates on a model that predates the internet: inquiry, site visit,
              custom proposal, negotiation, contract, deposit. Every step requires a human on both sides.
              This made sense when every event was unique. But AI event planning agents do not need to
              see the chandeliers in person — they need structured data about room dimensions, capacity
              configurations, available dates, and pricing rules.
            </p>
            <p>
              The $50 billion event venue market has the lowest agent readiness scores of any industry
              AgentHermes has scanned. Lower than construction (8/100). Lower than agriculture (5/100).
              Community halls score 2. Wedding venues score 4. Even co-working spaces — the most
              digital-native subcategory — only average 22.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {venueTypes.map((venue) => {
              const colors = getColorClasses(venue.color)
              return (
                <div
                  key={venue.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <venue.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-100">{venue.name}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>Avg: {venue.avgScore}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{venue.issue}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY AI EVENT PLANNERS NEED THIS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            What AI Event Planning Agents Need
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AI event planning agents are emerging across every major assistant platform. These agents
              are designed to handle the full event lifecycle: find venues that match criteria, compare
              pricing and availability, configure event packages, and book with a deposit. The problem
              is that the data they need does not exist in any machine-readable format.
            </p>
            <p>
              Consider what a human event planner does versus what an agent needs. A human can walk into
              a venue, assess the vibe, negotiate with the coordinator, and sign a contract. An agent
              needs structured data: room name, square footage, maximum capacity in theater/banquet/
              classroom configurations, available equipment, base pricing per hour or per day, seasonal
              multipliers, catering minimums, and open dates.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Task</div>
              <div>Current Process</div>
              <div>Agent-Ready Process</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.current}</div>
                <div className="text-emerald-400">{row.agentReady}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE AGENT-READY VENUE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Venue Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Five capabilities that transform a venue from phone-only to agent-bookable. The first
            venue in any metro that implements these captures every AI-mediated event inquiry.
          </p>

          <div className="space-y-3 mb-8">
            {agentReadyFeatures.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  item.priority === 'Critical'
                    ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                    : item.priority === 'High'
                    ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                    : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{item.feature}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.priority === 'Critical'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : item.priority === 'High'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-2">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    {item.dimension}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARKET OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            The First-Mover Advantage Is Massive
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When an AI agent helps plan a corporate retreat, it queries available data sources.
              Right now that means hotel APIs (Booking.com, Expedia) and maybe co-working aggregators.
              Conference centers and dedicated event venues return nothing because they have no API.
              The result: AI agents recommend hotels with meeting rooms instead of purpose-built
              conference centers.
            </p>
            <p>
              The first conference center in each metro that becomes agent-bookable captures 100% of
              AI-mediated corporate event inquiries for that market. Not 50%, not a share — 100%,
              because there is zero competition in the agent channel. This is the same dynamic that
              played out with SEO in 2005: first movers captured search traffic that compounded for years.
            </p>
            <p>
              The same logic applies to wedding venues. When AI personal assistants help couples plan
              weddings — comparing venues, checking date availability, building packages — they will
              preference venues that expose structured data over venues that require a phone call. A
              wedding venue with an availability API and automated quoting does not just win the agent
              channel. It wins the couples who prefer the convenience of AI-assisted planning.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$50B+', label: 'US event venue market', color: 'text-emerald-400' },
              { value: '0', label: 'venues with MCP servers', color: 'text-red-400' },
              { value: '8/100', label: 'average venue score', color: 'text-amber-400' },
              { value: '100%', label: 'first-mover agent traffic share', color: 'text-blue-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The play for venue owners:</strong> You do not need
              to build an API from scratch. AgentHermes generates hosted MCP servers for venues —
              you provide your room data and pricing rules, and we create the endpoints agents need.
              The venue that moves first in each market wins a channel that is about to grow exponentially.
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
                title: 'Travel and Hospitality Agent Readiness',
                href: '/blog/travel-hospitality-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Event Ticketing Agent Readiness',
                href: '/blog/event-ticketing-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Scan',
                tagColor: 'emerald',
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
            Is your venue invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Scan your venue website in 60 seconds. See your Agent Readiness Score and get a roadmap
            to becoming the first agent-bookable venue in your market.
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
              Connect My Venue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
