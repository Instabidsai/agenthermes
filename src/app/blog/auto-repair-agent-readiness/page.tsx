import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  MapPin,
  Phone,
  Search,
  Server,
  Shield,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Auto Repair Agent Readiness: Why Mechanics and Body Shops Can\'t Be Booked by AI Service Agents | AgentHermes',
  description:
    'The $300B US auto repair market averages under 12 on the Agent Readiness Score. Diagnosis requires physical inspection, pricing varies by vehicle, parts availability uncertain. No structured API for service catalog, availability, or pricing. The first shop with an MCP server wins fleet management contracts.',
  keywords: [
    'auto repair mechanic agent readiness',
    'auto repair AI agents',
    'mechanic agent readiness',
    'body shop agent readiness',
    'auto repair API',
    'mechanic MCP server',
    'auto service booking API',
    'fleet management AI agents',
  ],
  openGraph: {
    title: 'Auto Repair Agent Readiness: Why Mechanics and Body Shops Can\'t Be Booked by AI',
    description:
      'The $300B US auto repair market is invisible to AI agents. Diagnosis needs physical inspection, pricing varies by vehicle, and parts availability is uncertain.',
    url: 'https://agenthermes.ai/blog/auto-repair-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Auto Repair Agent Readiness: Why Mechanics and Body Shops Can\'t Be Booked by AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Repair Agent Readiness: Why Mechanics Can\'t Be Booked by AI',
    description:
      'The $300B US auto repair market has zero agent infrastructure. Diagnosis is physical, pricing is variable, booking is phone-only.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/auto-repair-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const failurePatterns = [
  {
    name: 'Diagnosis Requires Physical Inspection',
    description: 'Unlike ordering a product or booking a hotel, auto repair starts with uncertainty. The customer says "my car makes a grinding noise when braking." The mechanic needs to see the vehicle, inspect the rotors, and check the pads before quoting a price. There is no endpoint for "diagnose this symptom remotely."',
    impact: 'An AI agent asked to "get my brakes fixed" cannot even get a price quote without a physical visit. The agent journey stops at step one. No quote means no comparison, no booking, no transaction.',
    icon: Search,
    color: 'red',
  },
  {
    name: 'Pricing Varies by Vehicle, Condition, and Shop',
    description: 'An oil change on a 2020 Honda Civic costs $45. The same service on a 2022 BMW X5 costs $120. A brake job ranges from $150 to $800 depending on rotor condition. No auto repair shop publishes a universal price list because the price depends on what they find.',
    impact: 'D4 Pricing scores 0 for virtually every independent shop. Without structured pricing data — even ranges by vehicle type — agents cannot compare shops or give users cost estimates.',
    icon: DollarSign,
    color: 'red',
  },
  {
    name: 'Parts Availability Is Uncertain',
    description: 'A mechanic diagnoses a failed water pump. The shop may have the part in stock, may need to order from AutoZone or NAPA same-day, or may need a dealer-specific part that takes 3-5 days. This uncertainty cascades into scheduling: the repair takes 2 hours if the part is on the shelf, or 4 days if it is backordered.',
    impact: 'An agent cannot give the user a reliable timeline. "Your repair will take somewhere between 2 hours and 5 days" is not useful information. Parts availability needs a real-time API.',
    icon: Wrench,
    color: 'red',
  },
  {
    name: 'Booking Is Phone-Only for Most Shops',
    description: '78% of independent auto repair shops have no online booking. Even chains like Meineke, Jiffy Lube, and Firestone use web forms that generate emails — not real-time scheduling APIs. The mechanic checks the bay schedule on a whiteboard or in ShopWare/Mitchell and calls back.',
    impact: 'When an agent is asked to "schedule an oil change for Saturday," it cannot check availability or book a time slot. It tells the user to call. The user picks the shop that answers the phone first.',
    icon: Phone,
    color: 'red',
  },
  {
    name: 'No Structured Service Catalog',
    description: 'Most shop websites list services as bullet points on an "Our Services" page: oil changes, brake repair, transmission service, AC repair. There is no structured data — no service IDs, no vehicle compatibility matrix, no time estimates, no price ranges. Just marketing copy.',
    impact: 'An agent cannot match a user need to a specific service offering. "Do you do timing belt replacement on a 2018 Subaru Outback?" requires parsing a paragraph of marketing text, not querying a structured catalog.',
    icon: Code2,
    color: 'amber',
  },
]

const agentReadyBlueprint = [
  {
    tool: 'get_service_catalog',
    description: 'Returns all services offered with service IDs, descriptions, estimated time ranges, and price ranges by vehicle category (sedan, SUV, truck, European, domestic, Asian).',
    example: 'get_service_catalog({ vehicle_type: "suv", category: "brakes" })',
    priority: 'Critical',
  },
  {
    tool: 'lookup_diagnostic_code',
    description: 'Translates OBD-II diagnostic trouble codes into plain-language descriptions, severity levels, estimated repair costs by vehicle, and whether the shop services that repair.',
    example: 'lookup_diagnostic_code({ code: "P0301", vehicle: { year: 2020, make: "Ford", model: "F-150" } })',
    priority: 'Critical',
  },
  {
    tool: 'check_availability',
    description: 'Returns open appointment slots for a given service type and vehicle. Accounts for bay availability, estimated service duration, and current workload.',
    example: 'check_availability({ service: "oil_change", vehicle_type: "sedan", preferred_date: "2026-04-22" })',
    priority: 'Critical',
  },
  {
    tool: 'get_estimate',
    description: 'Generates a price estimate range for a service on a specific vehicle. Includes parts cost range, labor estimate, and total range. Clearly marks whether diagnosis is required for exact pricing.',
    example: 'get_estimate({ service: "brake_pad_replacement", vehicle: { year: 2021, make: "Toyota", model: "Camry" } })',
    priority: 'High',
  },
  {
    tool: 'check_parts_availability',
    description: 'Checks whether common parts for a specific repair are in stock, available same-day from local suppliers, or require ordering. Returns estimated arrival for backordered parts.',
    example: 'check_parts_availability({ part_type: "water_pump", vehicle_vin: "1HGBH41JXMN109186" })',
    priority: 'High',
  },
  {
    tool: 'book_appointment',
    description: 'Books a service appointment with vehicle info, service type, and preferred time. Returns confirmation with estimated duration, preliminary cost range, and check-in instructions.',
    example: 'book_appointment({ service: "oil_change", date: "2026-04-22", time: "09:00", vehicle: { year: 2020, make: "Honda", model: "Civic" }, customer_name: "Alex Johnson" })',
    priority: 'High',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How can auto repair shops provide pricing when diagnosis is required first?',
    answer:
      'The answer is price ranges by service and vehicle category, not exact quotes. An agent-ready shop publishes structured data like "brake pad replacement on a mid-size sedan: $180-$350 including parts and labor." This gives the agent enough to compare shops and set user expectations. The exact price comes after inspection — but the range is enough to enable the agent journey. Shops that publish nothing lose to shops that publish ranges.',
  },
  {
    question: 'What about the 280,000 independent shops that use paper and whiteboards?',
    answer:
      'Independent shops are actually the biggest opportunity. They have no digital infrastructure, which means they also have no legacy integration burden. A shop management platform like ShopWare, Tekmetric, or Mitchell already has their schedule and service data digitally. An MCP server that connects to these platforms can make any shop agent-accessible without the shop changing anything about their daily operations.',
  },
  {
    question: 'Why would fleet management AI agents care about independent shops?',
    answer:
      'Fleet management companies like ARI, Element, and Wheels manage millions of vehicles. They need maintenance scheduled across thousands of locations with specific service capabilities, parts availability, and pricing. Today this is managed through phone calls and spreadsheets. An AI fleet agent that can query shop availability, get estimates, and book appointments across a network of MCP-enabled shops saves fleet managers hours per day — and routes predictable, recurring revenue to the shops that are agent-ready.',
  },
  {
    question: 'What OBD-II diagnostic code lookup adds to agent readiness?',
    answer:
      'Modern vehicles produce diagnostic trouble codes (DTCs) that describe exactly what is wrong. When a check engine light comes on, the user can read the code with a $20 scanner or a connected car app. If a shop exposes a diagnostic code lookup tool, the agent can translate P0301 into "cylinder 1 misfire on your 2020 F-150, estimated repair $200-$600, we have availability Thursday morning." That is a complete agent journey from symptom to booking — triggered by a code the user already has.',
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

export default function AutoRepairAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Auto Repair Agent Readiness: Why Mechanics and Body Shops Can\'t Be Booked by AI Service Agents',
    description:
      'The $300B US auto repair market averages under 12 on the Agent Readiness Score. Diagnosis requires physical inspection, pricing varies by vehicle, parts availability uncertain. First shop with an MCP server wins fleet contracts.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/auto-repair-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1850,
    keywords:
      'auto repair mechanic agent readiness, auto repair AI agents, mechanic MCP server, fleet management AI',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Auto Repair Agent Readiness',
          item: 'https://agenthermes.ai/blog/auto-repair-agent-readiness',
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
      title="Auto Repair Agent Readiness: Why Mechanics and Body Shops Can't Be Booked by AI Service Agents"
      shareUrl="https://agenthermes.ai/blog/auto-repair-agent-readiness"
      currentHref="/blog/auto-repair-agent-readiness"
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
            <span className="text-zinc-400">Auto Repair Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Wrench className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Score: Under 12
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Auto Repair Agent Readiness:{' '}
            <span className="text-emerald-400">Why Mechanics and Body Shops Can&apos;t Be Booked by AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US auto repair market is worth <strong className="text-zinc-100">$300 billion per year</strong>.
            There are over 280,000 auto repair shops in the country. Not a single one can be booked,
            quoted, or even queried by an AI agent. Diagnosis requires physical inspection, pricing varies
            by vehicle and condition, and parts availability changes by the hour. These are real structural
            barriers — but every one of them has a structured-data solution. The first shop with an MCP
            server wins fleet management contracts worth more than any Yelp ad.
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

      {/* ===== THE REALITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-red-500" />
            The Reality: 280,000 Shops, Zero Agent Infrastructure
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Ask an AI agent to find you a mechanic who can replace the timing belt on your 2019
              Subaru Outback this week, under $800, within 10 miles. The agent&rsquo;s experience: it
              finds Yelp reviews (unstructured text), Google Maps listings (hours and phone numbers),
              and shop websites that say &ldquo;We service all makes and models&rdquo; with no
              queryable endpoints. The agent cannot check if the shop does timing belts on Subarus,
              cannot get a price range, and cannot check availability. It tells you to call three shops
              and compare. The entire value proposition of AI assistance disappears.
            </p>
            <p>
              Auto repair is uniquely challenging for agent readiness because the core workflow starts
              with uncertainty. A restaurant knows its menu and prices. A hotel knows its rooms and rates.
              A mechanic does not know the exact price or timeline until they inspect the vehicle. But this
              does not mean agent readiness is impossible — it means the data model needs to account for
              ranges, estimates, and conditional pricing. Every other industry with variable pricing has
              solved this. Auto repair has not tried.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$300B', label: 'US auto repair market', icon: DollarSign },
              { value: '<12', label: 'avg shop readiness score', icon: Wrench },
              { value: '280K+', label: 'independent repair shops', icon: MapPin },
              { value: '0', label: 'shops with MCP servers', icon: Server },
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

      {/* ===== FIVE FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Five Structural Barriers Keeping Auto Repair at the Bottom
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Auto repair is not just missing APIs — it faces genuine structural challenges that
            most other industries do not. Understanding these barriers is the first step to designing
            the right agent-ready architecture.
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
                      <span className={`${colors.text} font-medium`}>Agent impact:</span>{' '}
                      {pattern.impact}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE FLEET MANAGEMENT OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-500" />
            The Fleet Management Opportunity: Where Agent Readiness Pays First
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Consumer car owners are one market. Fleet management is the market where agent readiness
              pays immediately. Companies like ARI, Element Fleet, Donlen, and Wheels manage maintenance
              for millions of vehicles across thousands of locations. Today, scheduling a fleet vehicle
              for service involves a phone call from a fleet coordinator to a local shop, followed by a
              faxed authorization, followed by a phone call with the estimate, followed by another phone
              call to approve.
            </p>
            <p>
              An AI fleet management agent that can query shop service catalogs, check parts availability,
              compare estimates across a network, and book appointments — all through MCP — replaces hours
              of coordinator time per vehicle per service event. Fleet companies will preferentially route
              vehicles to shops that their agents can interact with programmatically.
            </p>
            <p>
              The first shop in each metro area with a structured service API gets put on the fleet
              management preferred provider list. That is recurring, predictable revenue from commercial
              vehicles — not one-off consumers who found you on Google. A single fleet contract can be worth
              more annual revenue than all consumer walk-ins combined.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The math:</strong> A fleet management company servicing
              500 vehicles in your metro sends each vehicle for maintenance 3-4 times per year. At an
              average ticket of $250, that is $375,000-$500,000 in annual recurring revenue from a single
              fleet contract. The cost of the MCP server that enables it: a fraction of one month&rsquo;s revenue.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY BLUEPRINT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Agent-Ready Auto Shop: Six MCP Tools
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready auto repair shop exposes six tools through an MCP server. These handle the
            full agent journey from &ldquo;my car needs work&rdquo; to &ldquo;appointment confirmed.&rdquo;
          </p>

          <div className="space-y-3 mb-8">
            {agentReadyBlueprint.map((tool) => (
              <div
                key={tool.tool}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-emerald-400" />
                    {tool.tool}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    tool.priority === 'Critical'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                      : tool.priority === 'High'
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}>
                    {tool.priority}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-2">{tool.description}</p>
                <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <code className="text-xs text-emerald-400 break-all">{tool.example}</code>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The key insight is that auto repair does not need exact pricing to be agent-ready — it needs
              structured ranges. A service catalog that returns &ldquo;brake pad replacement, mid-size sedan,
              $180-$350, 1.5-2.5 hours&rdquo; gives an agent everything it needs to compare shops, set
              expectations, and book an appointment. The exact price comes after inspection, but the range
              is enough to complete the agent journey.
            </p>
            <p>
              Most of this data already exists in shop management systems like{' '}
              <Link href="/blog/home-services-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Tekmetric, ShopWare, and Mitchell
              </Link>. These platforms track services, pricing history, parts inventory, and scheduling.
              An MCP server that connects to these systems can make any shop agent-accessible without
              changing daily operations.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONNECTED CAR CONVERGENCE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Connected Cars Change Everything
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              By 2026, over 80% of new vehicles sold are connected — they broadcast diagnostic trouble
              codes, maintenance schedules, and component wear data to manufacturer clouds in real time.
              Tesla vehicles already schedule their own service appointments. GM&rsquo;s OnStar, Ford&rsquo;s
              FordPass, and Toyota&rsquo;s Connected Services all have APIs that third-party apps can access.
            </p>
            <p>
              This creates a new paradigm: the car itself becomes the agent&rsquo;s client. A vehicle AI
              agent monitoring your car&rsquo;s health detects that brake pad wear is at 15%. It queries
              local shop MCP servers for brake service availability and pricing on your vehicle. It books
              the appointment at the shop with the best combination of price, availability, and reviews.
              You get a notification: &ldquo;Brake service booked for Saturday 9am at Metro Auto, estimated
              $220-$320, 1.5 hours.&rdquo;
            </p>
            <p>
              This is not science fiction — every component exists today. The only missing piece is the
              shop-side MCP server. The car knows what it needs. The agent knows how to book. The shop
              just needs to be queryable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Agent-ready shop',
                points: [
                  'Fleet contracts route vehicles automatically',
                  'Connected car agents book proactive maintenance',
                  'Price comparison includes your shop by default',
                  'Zero customer acquisition cost on agent leads',
                ],
                color: 'emerald',
              },
              {
                title: 'Phone-only shop',
                points: [
                  'Invisible to fleet management platforms',
                  'Connected car agents skip you entirely',
                  'Only found by humans browsing Google Maps',
                  'Competing on Yelp reviews, not capabilities',
                ],
                color: 'red',
              },
            ].map((col) => {
              const colors = getColorClasses(col.color)
              return (
                <div
                  key={col.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`font-bold ${colors.text} mb-3`}>{col.title}</h3>
                  <ul className="space-y-2">
                    {col.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle2 className={`h-4 w-4 ${colors.text} shrink-0 mt-0.5`} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
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
                title: 'Automotive Agent Readiness: Car Dealerships Score Under 15',
                href: '/blog/automotive-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Home Services Agent Readiness: The $600B Invisible Market',
                href: '/blog/home-services-agent-readiness',
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
            How does your auto shop score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan on your auto repair website.
            See exactly where you stand across all 9 dimensions — and what to fix first.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
