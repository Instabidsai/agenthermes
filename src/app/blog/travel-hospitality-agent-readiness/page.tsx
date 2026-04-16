import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bed,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  MapPin,
  Plane,
  Search,
  Server,
  Sparkles,
  Target,
  TrendingUp,
  Utensils,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Travel and Hospitality Agent Readiness: Hotels, Airlines, and the Booking API Gap | AgentHermes',
  description:
    'Travel should be the most agent-ready category on the internet. Instead, hotels gate availability behind Booking.com and Expedia, airlines hide behind GDS intermediaries, and 0 of 500 businesses scanned publish an agent card. Here is the state of agent-ready travel.',
  keywords: [
    'travel hospitality agent readiness',
    'hotel booking API',
    'airline agent MCP',
    'direct booking API',
    'agent-ready hotel',
    'OTA disintermediation AI',
    'travel MCP server',
    'hospitality agent economy',
    'GDS agent access',
  ],
  openGraph: {
    title: 'Travel and Hospitality Agent Readiness: Hotels, Airlines, and the Booking API Gap',
    description:
      'Hotels gate behind Booking.com. Airlines hide in GDS. Restaurants phone-only. Travel should be the MOST agent-ready category. It is the least.',
    url: 'https://agenthermes.ai/blog/travel-hospitality-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Travel and Hospitality Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel and Hospitality Agent Readiness',
    description:
      'Travel should be naturally agent-ready. Instead, hotels and airlines hide behind OTAs and GDS intermediaries. Zero direct booking MCP servers in our scan.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/travel-hospitality-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const intermediaries = [
  {
    name: 'Booking.com and Expedia (Hotels)',
    description: 'Independent hotels have quietly ceded their customer relationship to OTAs. A buyer-side agent looking for a boutique hotel in Lisbon will hit Booking.com first because the hotel itself has no structured availability API. The OTA takes 15-25% commission and owns the agent relationship.',
    impact: 'Hotels score 18-42 on Agent Readiness. OTAs score 70+ because they built the API layer the hotels should have built.',
    icon: Bed,
    color: 'amber',
  },
  {
    name: 'GDS and NDC (Airlines)',
    description: 'Airlines have existed in a machine-readable world since the 1960s through GDS systems like Sabre and Amadeus. NDC is the modern successor. But none of these surfaces are agent-accessible without a commercial relationship, and no major airline publishes an MCP server or agent-card.json.',
    impact: 'Airlines average mid-30s on Agent Readiness. Better than hotels but still below where a naturally machine-first industry should be.',
    icon: Plane,
    color: 'amber',
  },
  {
    name: 'OpenTable and Resy (Restaurants)',
    description: 'Restaurant reservations are one of the most-requested AI agent tasks. Most restaurants route discovery through OpenTable or Resy rather than expose a direct reservation API. When an agent tries to book directly, it gets a phone number.',
    impact: 'Independent restaurants average 25-40. OpenTable scores in the 60s. The restaurant loses 5-10% per cover to the reservation platform.',
    icon: Utensils,
    color: 'red',
  },
]

const bookingTools = [
  {
    name: 'search_availability',
    description: 'Query open inventory across a date range with structured filters — room type, cabin class, party size, dietary restrictions. Returns typed availability windows with prices.',
    icon: Search,
    color: 'emerald',
  },
  {
    name: 'get_rates',
    description: 'Return structured pricing including base rate, taxes, resort fees, cancellation policy, and any loyalty program discounts. Agents compare rates across properties in seconds.',
    icon: DollarSign,
    color: 'blue',
  },
  {
    name: 'create_booking',
    description: 'Structured booking tool with guest details, payment token, and confirmation. Returns a booking reference the agent can share with the user and use for future modifications.',
    icon: Calendar,
    color: 'purple',
  },
  {
    name: 'get_policies',
    description: 'Expose cancellation, change, and refund policies as structured data. Agents need to understand liability before they commit on behalf of a user. Unstructured policy pages cause booking refusals.',
    icon: FileText,
    color: 'cyan',
  },
]

const fixSteps = [
  {
    step: '1',
    title: 'Publish direct availability — even a narrow window',
    detail: 'Start with a single endpoint: GET /api/availability?start=2026-05-01&end=2026-05-07. Return JSON with open dates and starting prices. This alone lifts your D2 API score from single digits to 70+ and moves you into Silver tier.',
    icon: Server,
  },
  {
    step: '2',
    title: 'Structure your policies with JSON-LD',
    detail: 'Add schema.org LodgingBusiness, Restaurant, or AirlineFlight markup with cancellationPolicy, paymentAccepted, and openingHoursSpecification. Agents read this instantly. Humans never see it. Zero trade-off.',
    icon: Code2,
  },
  {
    step: '3',
    title: 'Expose structured booking confirmation',
    detail: 'When an agent creates a booking, return a typed response with booking_id, confirmation_code, guest details, charges, and next-step URLs. Do not return an HTML success page — agents cannot verify the booking from HTML.',
    icon: CheckCircle2,
  },
  {
    step: '4',
    title: 'Add an MCP server with your booking flow',
    detail: 'The AgentHermes hospitality vertical template ships search_availability, get_rates, create_booking, get_policies, and modify_booking tools out of the box. No code — fill out the wizard and the MCP endpoint goes live.',
    icon: Plane,
  },
  {
    step: '5',
    title: 'Publish agent-card.json and llms.txt',
    detail: 'Zero of the 500 businesses in our scan have an agent card. Travel businesses that ship one first become the canonical agent-accessible option in their category — especially for boutique hotels and independent airlines competing against OTAs.',
    icon: FileText,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why are hotels and airlines scoring so low when the industry is already digital?',
    answer:
      'Travel has been digital for 40+ years, but the digital layer was built for B2B distribution through GDS, OTAs, and channel managers — not direct agent access. Hotels cede their availability feed to Booking.com and Expedia in exchange for traffic. Airlines publish schedules through Sabre and Amadeus, which are gated behind commercial agreements. No one in the supply chain built a public agent-accessible API because no one needed to. Now agents exist, and the entire category is caught flat-footed.',
  },
  {
    question: 'Will AI agents actually disintermediate Booking.com and Expedia?',
    answer:
      'The OTAs will adapt — they are sophisticated companies with strong agent relationships already. What will change is which hotels win when an agent is choosing. Right now, the agent has no choice but to use the OTA because the hotel has no direct agent surface. Once a hotel ships an MCP server with direct booking, the agent can route there, skip the OTA commission, and deliver a lower price or better perk to the user. Hotels that move first capture that value. Hotels that wait stay permanently inside the OTA ecosystem.',
  },
  {
    question: 'What tools should a hotel expose in its MCP server?',
    answer:
      'The AgentHermes hospitality template exposes five tools by default: search_availability (date range + party size), get_rates (pricing with taxes and fees), create_booking (with guest details and payment token), get_policies (cancellation, check-in, amenities), and modify_booking (change dates, cancel, upgrade). Resources include property info, room types, and amenity lists. That set handles ~95% of real agent booking journeys.',
  },
  {
    question: 'Can a restaurant become agent-ready without paying OpenTable or Resy?',
    answer:
      'Yes. Restaurants can expose a thin reservation API directly — even a basic GET /api/availability and POST /api/reservation pair is enough to enter Silver tier. AgentHermes ships a restaurant vertical template with exactly these tools. The alternative is paying $200-500 per month to OpenTable or Resy for the same functionality, plus a per-cover fee. Owning the agent surface directly is cheaper and preserves the customer relationship.',
  },
  {
    question: 'How does travel agent readiness interact with existing loyalty programs?',
    answer:
      'Agent-ready travel is an unlock, not a threat, for loyalty programs. An MCP server can expose get_loyalty_status, apply_points, and redeem_reward tools. When an agent books on behalf of a Marriott Bonvoy member, it automatically applies status benefits and uses points when the user instructs it to. That experience is better than what the OTA can deliver — OTAs typically cannot apply hotel loyalty perks — which creates a direct booking incentive loop that favors properties with good agent infrastructure.',
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

export default function TravelHospitalityAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Travel and Hospitality Agent Readiness: Hotels, Airlines, and the Booking API Gap',
    description:
      'Hotels gate behind OTAs. Airlines hide in GDS. Restaurants phone-only. Travel should be the most agent-ready category on the internet — and it is the least. Here is the gap, the data, and the fix.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/travel-hospitality-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'travel hospitality agent readiness, hotel booking API, airline agent MCP, direct booking API, OTA disintermediation',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Travel and Hospitality Agent Readiness',
          item: 'https://agenthermes.ai/blog/travel-hospitality-agent-readiness',
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
      title="Travel and Hospitality Agent Readiness: Hotels, Airlines, and the Booking API Gap"
      shareUrl="https://agenthermes.ai/blog/travel-hospitality-agent-readiness"
      currentHref="/blog/travel-hospitality-agent-readiness"
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
            <span className="text-zinc-400">Travel and Hospitality Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Plane className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              OTA Disintermediation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Travel and Hospitality Agent Readiness:{' '}
            <span className="text-emerald-400">Hotels, Airlines, and the Booking API Gap</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Travel should be the most agent-ready category on the internet. It is, after all, the category
            that invented machine-readable inventory: GDS systems have been moving structured flight data
            since 1964. And yet when an AI agent tries to book a hotel in Paris, it ends up on Booking.com
            because the independent hotel has no agent-accessible booking endpoint. The whole industry sits
            behind <strong className="text-zinc-100">intermediaries</strong> — and the intermediaries are
            the only ones scoring well on Agent Readiness.
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
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            The Paradox: Machine-First Industry, Agent-Last Infrastructure
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Sabre was founded in 1960. American Airlines and IBM built it specifically so machines could
              query flight inventory and book seats without a human in the loop. That was 65 years ago.
              Hospitality followed with global distribution systems in the 1980s. Restaurants formalized
              OpenTable by 1998.
            </p>
            <p>
              The entire travel category has been <strong className="text-zinc-100">natively machine-first</strong>
              {' '}for decades. You would expect travel to be the category most ready for AI agents. The data
              says the opposite. Independent hotels average 28/100. Airlines average mid-30s. Restaurants
              average below 30. The only travel-adjacent companies scoring in Silver and Gold are the
              intermediaries themselves — Booking.com, Expedia, Kayak, OpenTable.
            </p>
            <p>
              The reason is simple: the machine layer in travel was built for B2B distribution, not direct
              agent access. Hotels sold their inventory API to OTAs. Airlines sold theirs to GDS. Restaurants
              sold theirs to OpenTable. Consumers (and now their agents) were always supposed to go through
              a front door the industry never built.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0/500', label: 'agent cards in scan', icon: FileText },
              { value: '2/500', label: 'MCP servers (neither travel)', icon: Server },
              { value: '$1.4T', label: 'global travel spend', icon: DollarSign },
              { value: '15-25%', label: 'OTA commission on hotels', icon: TrendingUp },
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

      {/* ===== THE INTERMEDIARIES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-500" />
            Who Owns the Agent Relationship Today (And Why That Is Fragile)
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Three classes of intermediaries currently own the agent-accessible surface for travel. Each of
            them is a layer the original supplier could have built — and each represents margin the supplier
            gives up to stay discoverable.
          </p>

          <div className="space-y-4 mb-8">
            {intermediaries.map((pattern) => {
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

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Why this is fragile:</strong> Agents route to whichever
              surface exposes structured booking. Today that is the OTA. The moment a hotel chain,
              independent property, or restaurant exposes its own MCP server, the agent can bypass the
              intermediary — and most will, because it is faster, cheaper, and more reliable than screen-scraping
              a Booking.com results page.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BOOKING TOOLS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-500" />
            The Four Tools Every Agent-Ready Travel Business Needs
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            AgentHermes analyzed 24 booking journeys across hotels, airlines, and restaurants. Four tools
            cover ~95% of what agents actually need to do.
          </p>

          <div className="space-y-4 mb-8">
            {bookingTools.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <div
                  key={tool.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <tool.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <code className={`text-base font-bold ${colors.text}`}>{tool.name}()</code>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tool.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              A fifth tool, <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">modify_booking()</code>,
              handles the long-tail scenarios: change dates, cancel, upgrade, add a companion. It is worth
              shipping but will not block an agent from completing the initial transaction if missing.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE PLAYBOOK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Agent-Ready Travel Playbook
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five steps that will move a hotel, airline, or restaurant from Bronze to Gold. Order matters:
            steps 1-2 move you to Silver, steps 3-5 move you to Gold.
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
        </div>
      </section>

      {/* ===== STRATEGIC IMPLICATIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            What Happens When Agents Can Book Direct
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'OTA commissions become optional',
                detail: 'The moment an independent hotel ships a direct MCP server with rates that match the OTA (or slightly better), agents will route there to save the user 5-15%. The OTA commission was always a tax on invisibility.',
              },
              {
                title: 'Loyalty programs compound',
                detail: 'Direct agent bookings apply loyalty perks, status upgrades, and point redemption. OTA bookings cannot. Every direct booking is more valuable than an OTA booking even at the same rate — because the hotel captures the long-term relationship.',
              },
              {
                title: 'Restaurants escape OpenTable fees',
                detail: 'A restaurant exposing its own reservation MCP server no longer owes per-cover fees to OpenTable or monthly fees to Resy. For a 100-seat restaurant, that is often $2-5K per month recovered.',
              },
              {
                title: 'Airlines unlock NDC for agents',
                detail: 'NDC was built for richer content delivery through GDS. An agent-accessible layer on top of NDC lets airlines expose ancillaries (bag fees, seat upgrades, lounge access) as structured tools. More revenue per booking.',
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
              The travel industry has spent two decades watching intermediaries capture margin that should
              have belonged to suppliers. Agents are the one leverage point where suppliers can reclaim
              that relationship — but only if they move before their competitors do. Agents will not wait
              for the whole industry to catch up. They will route to whichever hotel, airline, or restaurant
              exposes the first usable API, and that behavior will calcify into a new discovery pattern.
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
                title: 'Agent-Ready Restaurants: The Reservation API Playbook',
                href: '/blog/agent-ready-restaurants',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Local Business Agent Readiness: Why Main Street Is Invisible',
                href: '/blog/local-business-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'What Is an MCP Server and Why Your Business Needs One',
                href: '/blog/what-is-mcp-server',
                tag: 'Standards',
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
            Score your hotel, airline, or restaurant in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See where you rank across the 9 Agent Readiness dimensions — and which booking tools,
            APIs, and discovery files would move you out of OTA dependency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Audit My Property
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              <MapPin className="h-4 w-4" />
              Ship My MCP Server
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
