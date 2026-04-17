import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  HelpCircle,
  MapPin,
  Network,
  ParkingCircle,
  Plane,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Parking and Transportation Agent Readiness: Why Uber Has an API But Your Parking Garage Doesn\'t | AgentHermes',
  description:
    'Ride-hailing has APIs scoring 45-55, but parking garages have zero real-time availability endpoints. Public transit has GTFS feeds but most agencies hide real-time data. Analysis of agent readiness across parking and transportation.',
  keywords: [
    'parking transportation agent readiness',
    'parking garage API',
    'ride-hailing agent readiness',
    'public transit AI agent',
    'parking availability API',
    'GTFS agent readiness',
    'EV charging API',
    'AI travel agent parking',
    'smart parking agent economy',
  ],
  openGraph: {
    title:
      'Parking and Transportation Agent Readiness: Why Uber Has an API But Your Parking Garage Doesn\'t',
    description:
      'Ride-hailing scores 45-55 on agent readiness. Parking garages score zero. Public transit feeds exist but are hidden. The parking data gap blocks AI travel agents.',
    url: 'https://agenthermes.ai/blog/parking-transportation-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Parking and Transportation Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Parking and Transportation Agent Readiness: Why Uber Has an API But Your Parking Garage Doesn\'t',
    description:
      'Uber and Lyft have APIs. Parking garages have signs. Public transit has GTFS but hides real-time feeds. Here is how the transportation sector scores on agent readiness.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/parking-transportation-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const transportScores = [
  {
    segment: 'Ride-Hailing (Uber, Lyft)',
    score: '45-55',
    color: 'amber',
    why: 'Public APIs exist with OAuth, real-time ETAs, fare estimates, and ride booking. Structured JSON responses. But rate limits are tight and documentation assumes developer audiences, not agent consumption.',
  },
  {
    segment: 'Public Transit Agencies',
    score: '15-30',
    color: 'amber',
    why: 'GTFS static feeds are structured and open. GTFS-RT (real-time) exists but most agencies only expose it through Google Maps partnerships, not public endpoints. No booking, no fare payment API.',
  },
  {
    segment: 'Parking Garages / Lots',
    score: '0-5',
    color: 'red',
    why: 'Zero public APIs. No real-time space availability. No dynamic pricing endpoint. No reservation system. Pricing posted on signs, varies by time and events, requires a human to read.',
  },
  {
    segment: 'Airport Parking',
    score: '5-12',
    color: 'red',
    why: 'Some airports have reservation systems (SpotHero, ParkWhiz) but these are marketplace intermediaries, not direct APIs. The garage itself has no endpoint.',
  },
  {
    segment: 'EV Charging Networks',
    score: '25-40',
    color: 'amber',
    why: 'ChargePoint and Tesla have APIs but they are partner-only. OCPI (Open Charge Point Interface) standard exists but adoption is fragmented. Availability data often delayed 5-15 minutes.',
  },
  {
    segment: 'Bike/Scooter Share',
    score: '30-45',
    color: 'amber',
    why: 'GBFS (General Bikeshare Feed Specification) is well-adopted. Real-time dock availability. But booking and payment require app-specific auth, not open endpoints.',
  },
]

const agentReadyEndpoints = [
  {
    name: 'Real-Time Space Availability',
    endpoint: 'GET /availability',
    description:
      'Returns total spaces, occupied count, available count, and floor-by-floor breakdown. Updated every 60 seconds minimum. Includes ADA-accessible space count.',
    icon: BarChart3,
    color: 'emerald',
  },
  {
    name: 'Dynamic Pricing Endpoint',
    endpoint: 'GET /pricing?arrival=...&departure=...',
    description:
      'Returns current rate, event surcharge, early bird rates, and monthly pass pricing. Accepts arrival and departure timestamps to calculate total cost before the driver commits.',
    icon: DollarSign,
    color: 'blue',
  },
  {
    name: 'Reservation System',
    endpoint: 'POST /reserve',
    description:
      'Creates a guaranteed parking reservation with a confirmation code. Accepts vehicle type, arrival window, and payment token. Returns entry instructions (gate code, QR, or license plate recognition).',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    name: 'EV Charging Status',
    endpoint: 'GET /ev-charging',
    description:
      'Returns charger count by type (Level 2, DC Fast), availability per charger, current wait estimate, and pricing per kWh. Agents planning trips for EV owners need this to avoid range anxiety.',
    icon: Zap,
    color: 'amber',
  },
  {
    name: 'Facility Information',
    endpoint: 'GET /info',
    description:
      'Returns height clearance, dimensions for oversized vehicles, security features, shuttle availability, walking distance to destination, and operating hours. Structured JSON, not a PDF brochure.',
    icon: MapPin,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why can\'t AI agents just scrape parking garage websites?',
    answer:
      'Most parking garages do not have websites with real-time data. The ones that do display availability on image-based signs or embedded widgets that break with scraping. Even when scraping works, the data is minutes stale and pricing changes by event or time-of-day in ways that require structured parameters, not static HTML. Scraping is unreliable, slow, and violates terms of service. An API is the only path to real-time, reliable parking data for agents.',
  },
  {
    question: 'What about parking aggregators like SpotHero and ParkWhiz?',
    answer:
      'These marketplaces have partial coverage of reservation-enabled garages in major cities, but their APIs are partner-only and designed for app integrations, not general agent consumption. They cover maybe 15-20% of US parking facilities. The remaining 80% of garages, surface lots, and municipal parking have zero digital presence. An agent needs to be able to query any parking facility, not just those listed on one marketplace.',
  },
  {
    question: 'How does GTFS help with agent readiness for public transit?',
    answer:
      'GTFS (General Transit Feed Specification) provides structured static data including routes, stops, schedules, and fare rules. GTFS-RT extends this with real-time vehicle positions, trip updates, and service alerts. This is genuinely useful structured data, and agencies that publish open GTFS-RT feeds score 25-30 on agent readiness. The gap is that most agencies only share GTFS-RT with Google Maps through private agreements, so independent agents cannot access it.',
  },
  {
    question: 'What would an agent-ready parking garage look like?',
    answer:
      'An agent-ready parking garage exposes five endpoints: real-time availability by floor, dynamic pricing with time-of-day and event awareness, reservation creation with confirmation codes, EV charger status, and facility information (height clearance, shuttle, hours). It publishes an agent-card.json for discovery and supports machine-readable error responses. An AI travel agent can then check spaces, compare prices, and book a spot in a single conversation turn.',
  },
  {
    question: 'Is anyone building agent-ready parking infrastructure?',
    answer:
      'A few parking technology companies (ParkHub, Flash Parking, SKIDATA) are modernizing garage management, but their APIs are B2B integrations for fleet management, not consumer-facing agent endpoints. The opportunity is a platform layer that sits on top of existing parking management systems and exposes agent-ready endpoints. AgentHermes can auto-generate MCP servers for parking operators who adopt modern management software with API access.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ParkingTransportationAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Parking and Transportation Agent Readiness: Why Uber Has an API But Your Parking Garage Doesn\'t',
    description:
      'Ride-hailing companies score 45-55 on agent readiness thanks to public APIs. Parking garages score zero. Public transit has structured data but hides it. A deep analysis of agent readiness across the transportation sector.',
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
    mainEntityOfPage:
      'https://agenthermes.ai/blog/parking-transportation-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'parking transportation agent readiness, parking garage API, ride-hailing API, public transit GTFS, AI travel agent, EV charging API',
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
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Parking and Transportation Agent Readiness',
          item: 'https://agenthermes.ai/blog/parking-transportation-agent-readiness',
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
      title="Parking and Transportation Agent Readiness: Why Uber Has an API But Your Parking Garage Doesn't"
      shareUrl="https://agenthermes.ai/blog/parking-transportation-agent-readiness"
      currentHref="/blog/parking-transportation-agent-readiness"
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
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-400">
                Parking &amp; Transportation Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <ParkingCircle className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                Transportation
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Parking and Transportation Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Uber Has an API But Your Parking Garage Doesn&apos;t
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Uber&apos;s API lets an agent estimate a fare, request a ride, and
              track it in real time. Try asking an AI agent to find you a parking
              spot near Madison Square Garden on a Friday night. It cannot. There
              is no API, no availability feed, no pricing endpoint. The{' '}
              <strong className="text-zinc-100">
                parking and ground transportation sector
              </strong>{' '}
              is one of the widest agent readiness gaps in the economy.
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
              <div className="author-avatar">AH</div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">
                  AgentHermes Research
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    April 15, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    13 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE GAP ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Car className="h-5 w-5 text-emerald-500" />
              The Transportation Agent Readiness Spectrum
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Transportation is not uniformly dark to AI agents. Ride-hailing
                platforms invested billions in API infrastructure because their
                entire business model depends on programmatic access. Parking
                garages invested in concrete and gate arms. That investment gap
                is now an agent readiness gap.
              </p>
              <p>
                We scanned businesses across six transportation sub-sectors. The
                results show a sector split in half: digital-native platforms
                that score reasonably well, and physical infrastructure
                businesses that score near zero.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {transportScores.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.segment}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.segment}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}
                      >
                        {item.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.why}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== WHY PARKING IS ZERO ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Why Parking Garages Score Zero
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                There are approximately 44,000 parking structures in the US and
                over 800 million surface parking spaces. This is a massive
                physical infrastructure sector that operates almost entirely
                without digital interfaces accessible to AI agents.
              </p>
              <p>
                The typical parking garage has a sign out front showing whether
                it is open or full. That sign is controlled by a local counter at
                the gate. There is no network connection to the outside world, no
                API, and no data feed. Pricing is printed on a board, changes by
                hand when there is an event nearby, and varies by time of day in
                ways that are not documented anywhere machine-readable.
              </p>
              <p>
                Even garages with modern payment systems (PayByPhone,
                ParkMobile) only digitize the payment step. An agent can help you
                pay for parking you already found, but it cannot help you{' '}
                <em>find</em> parking. The discovery, availability, and pricing
                layers remain analog.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '44K', label: 'parking structures in US', icon: ParkingCircle },
                { value: '0', label: 'with availability APIs', icon: Server },
                { value: '$131B', label: 'US parking industry revenue', icon: DollarSign },
                { value: '85%', label: 'use manual pricing', icon: BarChart3 },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PUBLIC TRANSIT PARADOX ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-500" />
              The Public Transit Paradox: Structured Data, Hidden Feeds
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Public transit is a rare case where the data standard is
                excellent but access is restricted. GTFS (General Transit Feed
                Specification) is one of the best-designed data standards in any
                industry. It defines routes, stops, schedules, fares, and
                transfers in clean, structured files that any developer can
                parse.
              </p>
              <p>
                The problem is distribution. Most transit agencies share
                real-time data (GTFS-RT) exclusively with Google Maps through
                partnership agreements. An independent AI travel agent cannot
                access NYC MTA&apos;s real-time subway positions, even though the
                data exists and is being generated every second. The agency chose
                a single distribution partner instead of a public feed.
              </p>
              <p>
                Transit agencies that publish open GTFS-RT feeds score
                significantly higher. Portland&apos;s TriMet, for example,
                publishes real-time vehicle positions, trip updates, and service
                alerts through a free public API. An agent can tell you
                &ldquo;the next bus to downtown arrives in 4 minutes&rdquo; using
                TriMet data. Most agencies cannot offer this because their
                real-time feeds are locked behind Google&apos;s partnership.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 mb-8">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-blue-400">
                  The GTFS lesson for other industries:
                </strong>{' '}
                Public transit proves that having a data standard is only half
                the battle. If the standard exists but feeds are locked behind
                exclusive partnerships, agent readiness stays low. Open feeds
                with rate-limited public access are the model that maximizes
                agent readiness without overwhelming infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* ===== AGENT-READY PARKING ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What Agent-Ready Parking Looks Like
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              An AI travel agent planning a trip needs parking data to complete
              the journey. Here are the five endpoints that make a parking
              facility agent-ready.
            </p>

            <div className="space-y-4 mb-8">
              {agentReadyEndpoints.map((ep) => {
                const colors = getColorClasses(ep.color)
                return (
                  <div
                    key={ep.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <ep.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100">
                          {ep.name}
                        </h3>
                        <code
                          className={`${colors.text} text-xs bg-zinc-800/50 px-1.5 py-0.5 rounded`}
                        >
                          {ep.endpoint}
                        </code>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {ep.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                With these five endpoints, an AI travel agent can handle the full
                parking workflow:{' '}
                <strong className="text-zinc-100">
                  &ldquo;I&apos;m driving to the Staples Center for a 7 PM game
                  on Saturday. Find me parking with EV charging within walking
                  distance, compare prices, and reserve the cheapest option.&rdquo;
                </strong>{' '}
                Today, that request requires a human to open six browser tabs and
                make two phone calls. With agent-ready parking, it takes one
                conversation turn.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE TRIP PLANNING HOLE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Plane className="h-5 w-5 text-amber-500" />
              The Missing Link in AI Trip Planning
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                AI travel agents are getting better at flights and hotels. An
                agent can search Kayak, compare hotel rates through booking
                APIs, and even check restaurant availability on OpenTable. But
                the moment the traveler lands and needs to get from the airport
                to their hotel, the agent hits a wall.
              </p>
              <p>
                Ride-hailing fills part of this gap, which is why Uber and Lyft
                score reasonably well. But for travelers who drive, rent cars, or
                need to park at their destination, the agent has nothing.
                Airport parking lot availability, downtown garage pricing near
                the hotel, event-day surge pricing at the stadium — none of this
                data is agent-accessible.
              </p>
              <p>
                This makes parking the{' '}
                <Link
                  href="/blog/travel-hospitality-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  weakest link in the travel and hospitality chain
                </Link>
                . Flights are bookable. Hotels are bookable. Restaurants are
                bookable. Parking is not. Until parking data enters the agent
                economy, AI trip planning will always have a gap in the
                &ldquo;last mile&rdquo; of ground transportation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-amber-400">First-mover advantage:</strong>{' '}
                The first parking technology platform to expose agent-ready
                endpoints will capture every AI trip-planning referral in its
                coverage area. When an agent needs parking, it will route to
                whichever facility has data — even if a closer or cheaper option
                exists but is invisible. Agent readiness is the new location,
                location, location.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50"
        >
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
                  <h3 className="text-base font-bold text-zinc-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ARTICLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title:
                    'Travel and Hospitality Agent Readiness',
                  href: '/blog/travel-hospitality-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Local Business Agent Readiness',
                  href: '/blog/local-business-agent-readiness',
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
                    >
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
              Is your transportation business agent-ready?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Get your free Agent Readiness Score in 60 seconds. See how your
              parking, transit, or mobility business compares across all 9
              dimensions.
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
