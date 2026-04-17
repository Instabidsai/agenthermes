import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Anchor,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  MapPin,
  Phone,
  Radio,
  Server,
  Ship,
  ShipWheel,
  Sparkles,
  Target,
  TrendingUp,
  Waves,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Marina and Boating Agent Readiness: Why Dock Slips and Charter Services Cannot Be Booked by AI | AgentHermes',
  description:
    'The $50B US recreational boating industry runs on VHF radio calls and seasonal price lists. Marina slips, charter bookings, and fuel dock pricing are invisible to AI agents. Here is what agent-ready marina infrastructure looks like.',
  keywords: [
    'marina boating agent readiness',
    'marina slip booking API',
    'charter booking AI agent',
    'dock slip availability',
    'boating MCP server',
    'marina agent economy',
    'boat charter API',
    'fuel dock pricing API',
    'recreational boating AI',
  ],
  openGraph: {
    title: 'Marina and Boating Agent Readiness: Why Dock Slips and Charter Services Cannot Be Booked by AI',
    description:
      '$50B recreational boating. Marina slips booked by phone and VHF radio. Charter pricing opaque. Zero availability APIs. Here is the gap and the fix.',
    url: 'https://agenthermes.ai/blog/marina-boating-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Marina and Boating Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marina and Boating Agent Readiness: Why Dock Slips and Charter Services Cannot Be Booked by AI',
    description:
      '$50B boating industry. Slips booked by VHF radio. Charters by phone. Zero APIs. Here is what agent-ready marina infrastructure looks like.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/marina-boating-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const currentGaps = [
  {
    area: 'Slip Booking',
    problem: 'Phone calls, VHF Channel 16, or walk-up only. No real-time availability for any marina in the US.',
    impact: 'An AI trip-planning agent cannot check slip availability for a weekend cruise itinerary.',
    icon: Phone,
    color: 'red',
  },
  {
    area: 'Charter Services',
    problem: 'Pricing hidden behind email inquiries. Half-day vs full-day vs multi-day rates unlisted. Captain fees unclear.',
    impact: 'Agents cannot compare charter options or provide instant quotes for group outings.',
    icon: Ship,
    color: 'red',
  },
  {
    area: 'Seasonal Pricing',
    problem: 'Rates vary by boat length (per foot), season, location, and amenities. No structured pricing endpoint anywhere.',
    impact: 'A 35-foot sailboat costs differently than a 35-foot powerboat at the same marina. Agents cannot calculate this.',
    icon: DollarSign,
    color: 'red',
  },
  {
    area: 'Weather-Dependent Availability',
    problem: 'Storm cancellations, weather windows, and sea conditions affect charters. None of this is structured data.',
    impact: 'An agent booking a fishing charter cannot factor in 3-day weather forecasts or auto-reschedule.',
    icon: Waves,
    color: 'red',
  },
  {
    area: 'Fuel Dock Pricing',
    problem: 'Marina fuel prices change daily. No API, no feed, not even consistent web pages. Often posted on a whiteboard at the dock.',
    impact: 'Route-planning agents cannot optimize refueling stops along the Intracoastal Waterway.',
    icon: Target,
    color: 'red',
  },
]

const agentReadyEndpoints = [
  {
    endpoint: 'check_slip_availability',
    params: 'boat_length, beam, draft, arrival_date, departure_date',
    returns: 'Available slips with pricing, amenities (power, water, WiFi), and location within marina',
    dimension: 'D2 API Quality + D6 Data Richness',
  },
  {
    endpoint: 'get_charter_catalog',
    params: 'charter_type, date, party_size, duration',
    returns: 'Available boats, captains, pricing tiers, included equipment, cancellation policy',
    dimension: 'D4 Pricing Transparency + D6 Data Richness',
  },
  {
    endpoint: 'book_slip_or_charter',
    params: 'slip_id OR charter_id, customer_info, payment_token',
    returns: 'Confirmation number, dock assignment, check-in instructions, weather advisory',
    dimension: 'D5 Payment + D9 Agent Experience',
  },
  {
    endpoint: 'get_fuel_pricing',
    params: 'fuel_type (diesel, gas), marina_id',
    returns: 'Current price per gallon, last updated timestamp, pump hours',
    dimension: 'D4 Pricing + D8 Reliability',
  },
  {
    endpoint: 'get_weather_conditions',
    params: 'marina_id, date_range',
    returns: 'Sea state, wind, tide schedule, any active weather advisories affecting operations',
    dimension: 'D6 Data Richness + D8 Reliability',
  },
]

const marketStats = [
  { value: '$50B', label: 'US recreational boating market', icon: DollarSign },
  { value: '12M', label: 'registered boats in the US', icon: Ship },
  { value: '12,000+', label: 'marinas nationwide', icon: Anchor },
  { value: '0', label: 'with slip availability APIs', icon: XCircle },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why are marinas so far behind on technology?',
    answer:
      'Most marinas are small, family-run operations. The industry has relied on VHF radio, phone calls, and seasonal regulars for decades. Unlike hotels or airlines, there was never a Booking.com or Expedia forcing marinas to digitize their inventory. The result is an industry where a $2,000/month slip is booked the same way it was in 1985.',
  },
  {
    question: 'What about Dockwa and Snag-A-Slip?',
    answer:
      'These platforms have started digitizing marina reservations, but they cover a small fraction of US marinas. More importantly, they operate as closed platforms — there is no public API that an AI agent can call to check availability across marinas. The data is locked inside their apps. Agent readiness requires open, structured APIs that any agent can discover and use.',
  },
  {
    question: 'How would weather-conditional booking work?',
    answer:
      'An agent-ready charter service would expose a booking endpoint that accepts weather constraints. The agent could say: book this fishing charter for Saturday, but only if wind is under 15 knots and seas are under 3 feet. The API would hold the reservation conditionally and auto-confirm or auto-cancel based on the 48-hour forecast. No human phone tag required.',
  },
  {
    question: 'What dimensions do marinas score worst on?',
    answer:
      'D1 Discovery (no agent-card.json, no MCP server, not in any registry), D2 API Quality (no API exists at all), and D4 Pricing Transparency (rates require a phone call). Most marinas we have scanned score under 10 on the Agent Readiness Score. The average across all boating-related businesses is 8.',
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

export default function MarinaBoatingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Marina and Boating Agent Readiness: Why Dock Slips and Charter Services Cannot Be Booked by AI',
    description:
      'The $50B US recreational boating industry runs on VHF radio and phone calls. Marina slips, charter services, and fuel pricing are invisible to AI agents. Here is what agent-ready marina infrastructure looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/marina-boating-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'marina boating agent readiness, marina slip booking API, charter booking AI, dock slip availability, boating MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Marina and Boating Agent Readiness',
          item: 'https://agenthermes.ai/blog/marina-boating-agent-readiness',
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
      title="Marina and Boating Agent Readiness: Why Dock Slips and Charter Services Cannot Be Booked by AI"
      shareUrl="https://agenthermes.ai/blog/marina-boating-agent-readiness"
      currentHref="/blog/marina-boating-agent-readiness"
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
            <span className="text-zinc-400">Marina and Boating Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Anchor className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              $50B Market
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Marina and Boating Agent Readiness:{' '}
            <span className="text-emerald-400">Why Dock Slips and Charter Services Cannot Be Booked by AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US recreational boating market generates <strong className="text-zinc-100">$50 billion annually</strong>.
            There are over 12,000 marinas, hundreds of charter companies, and millions of boat owners planning trips
            every season. And yet, when an AI trip-planning agent tries to find an available slip for a 36-foot
            sailboat next Saturday, it hits a wall. The answer is always the same:{' '}
            <strong className="text-zinc-100">call the marina</strong>.
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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARKET CONTEXT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Ship className="h-5 w-5 text-blue-500" />
            A $50 Billion Industry Running on VHF Radio
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Recreational boating in the United States is massive. Over 12 million boats are registered, and
              Americans spend $50 billion per year on boating-related activities — from marina fees and charters
              to fuel, maintenance, and equipment. Coastal cities from Miami to San Diego depend on marina
              infrastructure as economic engines.
            </p>
            <p>
              But the technology powering this industry looks like it was frozen in 1995. Marina slip reservations
              happen over VHF Channel 16 or a phone call to the dock office. Charter bookings go through email
              threads that take 24 to 72 hours to resolve. Fuel dock prices are written on whiteboards. Seasonal
              rate sheets are PDFs — if they are online at all.
            </p>
            <p>
              This creates a unique problem for the agent economy. AI trip-planning agents are getting
              sophisticated enough to plan multi-day boating itineraries — optimizing for weather windows,
              fuel stops, and anchorage options. But they cannot execute any of it because no marina publishes
              structured, machine-readable data about availability, pricing, or services.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {marketStats.map((stat) => (
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

      {/* ===== FIVE GAPS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Five Agent-Blocking Gaps in the Marina Industry
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every one of these gaps means an AI agent has to tell the user &ldquo;call them yourself.&rdquo;
            That is the opposite of what agents are built to do.
          </p>

          <div className="space-y-4 mb-8">
            {currentGaps.map((gap) => {
              const colors = getColorClasses(gap.color)
              return (
                <div
                  key={gap.area}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <gap.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{gap.area}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                    <strong className="text-zinc-300">Problem:</strong> {gap.problem}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    <strong className="text-zinc-400">Agent Impact:</strong> {gap.impact}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY ENDPOINTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Marina Infrastructure Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here are the five MCP tools a marina or charter company would need to become fully
            agent-accessible. Each maps directly to AgentHermes scoring dimensions.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Tool</div>
              <div>Input</div>
              <div>Output</div>
              <div>Scoring Dimension</div>
            </div>
            {agentReadyEndpoints.map((ep, i) => (
              <div
                key={ep.endpoint}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-mono text-emerald-400 text-xs">{ep.endpoint}</div>
                <div className="text-zinc-500 text-xs">{ep.params}</div>
                <div className="text-zinc-400 text-xs">{ep.returns}</div>
                <div className="text-blue-400 text-xs">{ep.dimension}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The key differentiator is <strong className="text-zinc-100">boat-size-aware pricing</strong>.
              Unlike a hotel room, a marina slip price depends on the physical dimensions of the vessel —
              length, beam, and draft. An agent-ready slip availability API must accept these parameters
              and return only slips that physically fit the boat, with accurate per-foot pricing.
            </p>
            <p>
              Similarly, charter services need <strong className="text-zinc-100">weather-conditional
              booking</strong>. A fishing charter in the Gulf of Mexico is meaningless if seas are 6 feet.
              An agent-ready charter API would accept weather constraints and handle conditional
              reservations automatically — confirming or canceling based on forecast data within a
              specified window before departure.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE TRIP PLANNING USE CASE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-500" />
            The AI Trip Planning Agent Use Case
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Consider the workflow an AI trip-planning agent needs to execute for a simple weekend
              cruise from Fort Lauderdale to the Bahamas:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { step: '1', title: 'Check slip availability at departure marina for Friday evening', status: 'blocked' },
              { step: '2', title: 'Find fuel dock with diesel under $5/gallon near the inlet', status: 'blocked' },
              { step: '3', title: 'Check weather window for Saturday crossing (winds, seas, Gulf Stream)', status: 'partial' },
              { step: '4', title: 'Reserve slip at Nassau marina for Saturday night (40-foot power boat)', status: 'blocked' },
              { step: '5', title: 'Book fishing charter for Sunday morning, weather-conditional', status: 'blocked' },
              { step: '6', title: 'Reserve return slip at home marina for Sunday evening', status: 'blocked' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  item.status === 'blocked'
                    ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                    : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                }`}>
                  {item.step}
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-zinc-300">{item.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === 'blocked'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.status === 'blocked' ? 'Blocked' : 'Partial'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">Result:</strong> 5 of 6 steps are completely blocked.
              The agent cannot check availability, compare prices, or make a single reservation at any
              marina. The entire trip-planning workflow collapses to &ldquo;here are some phone numbers
              to call.&rdquo; This is why boating businesses score under 10 on the Agent Readiness Score.
            </p>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The irony is that <Link href="/blog/travel-hospitality-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">hotels and airlines</Link> face
              similar challenges, but at least they have intermediaries (OTAs, GDS systems) that partially
              digitize inventory. Marinas have no equivalent. There is no &ldquo;Booking.com for slips&rdquo;
              with meaningful market coverage.
            </p>
            <p>
              This makes marinas one of the last frontiers of the agent economy — and one of the biggest
              opportunities. The first marina management platform that publishes MCP-compatible availability
              APIs will capture a disproportionate share of the emerging AI-driven trip planning market.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ADJACENT VERTICALS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-500" />
            Connected Verticals: Where Marina Data Feeds Into
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Marina agent readiness does not exist in isolation. Boating connects to a web of adjacent
              industries that all need structured data to serve AI agents effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Travel and Hospitality',
                detail: 'Waterfront hotels, resort marinas, and cruise ports need slip data integrated with room inventory for package bookings.',
                href: '/blog/travel-hospitality-agent-readiness',
              },
              {
                title: 'Sports and Recreation',
                detail: 'Fishing charters, wakeboarding lessons, sailing schools, and dive operations all run on the same phone-call booking model.',
                href: '/blog/sports-recreation-agent-readiness',
              },
              {
                title: 'Marine Insurance',
                detail: 'Coverage depends on vessel specs, cruising range, and marina safety ratings. None of this is in structured APIs.',
                href: '/audit',
              },
              {
                title: 'Fuel and Provisioning',
                detail: 'Route-planning agents need real-time fuel pricing, pump-out station locations, and provisioning delivery windows at each stop.',
                href: '/audit',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </Link>
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
                title: 'Travel and Hospitality Agent Readiness',
                href: '/blog/travel-hospitality-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Sports and Recreation Agent Readiness',
                href: '/blog/sports-recreation-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
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
            Is your marina invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see exactly where your business stands across all 9
            dimensions. Most marinas score under 10. Find out where you are — and what it takes to
            become the first agent-ready marina in your harbor.
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
              Connect My Marina
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
