import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Home,
  Layers,
  Leaf,
  Phone,
  Repeat,
  Search,
  Server,
  Shield,
  Sparkles,
  Store,
  Sun,
  Target,
  Trees,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Landscaping Agent Readiness: Why Lawn Care and Garden Services Can\'t Be Scheduled by AI | AgentHermes',
  description:
    'The $130B US landscaping market is invisible to AI agents. Phone-based scheduling, site-visit estimates, variable pricing. Learn what agent-ready landscaping looks like and who will win the AI home management market.',
  keywords: [
    'landscaping lawn care agent readiness',
    'landscaping company AI',
    'lawn care MCP server',
    'garden services agent readiness',
    'landscaping business API',
    'AI scheduling landscaping',
    'agent economy landscaping',
    'lawn care automation',
    'landscaping agent score',
  ],
  openGraph: {
    title: 'Landscaping Agent Readiness: Why Lawn Care and Garden Services Can\'t Be Scheduled by AI',
    description:
      'The $130B US landscaping market has zero agent infrastructure. Phone scheduling, site-visit estimates, variable pricing. Here is what agent-ready landscaping looks like.',
    url: 'https://agenthermes.ai/blog/landscaping-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Landscaping Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landscaping Agent Readiness: Why Lawn Care Can\'t Be Scheduled by AI',
    description:
      '$130B industry, zero agent infrastructure. The first landscaping company with an MCP server gets booked by every AI home management assistant.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/landscaping-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const industryStats = [
  { value: '$130B', label: 'US landscaping market', icon: DollarSign },
  { value: '650K+', label: 'landscaping businesses', icon: Store },
  { value: '~8', label: 'avg agent readiness score', icon: BarChart3 },
  { value: '0', label: 'with MCP servers', icon: Server },
]

const platformScores = [
  { name: 'LawnStarter', score: 36, tier: 'Not Scored', detail: 'Marketplace with online booking but no individual provider API exposure', color: 'red' },
  { name: 'TaskEasy', score: 33, tier: 'Not Scored', detail: 'Automated quoting by address but fully gated, no public API', color: 'red' },
  { name: 'Thumbtack (lawn)', score: 38, tier: 'Not Scored', detail: 'Bid-based matching, no direct API for individual landscapers', color: 'red' },
  { name: 'TruGreen', score: 22, tier: 'Not Scored', detail: 'National brand with online quote form but no API, PDF proposals', color: 'red' },
  { name: 'BrightView (commercial)', score: 28, tier: 'Not Scored', detail: 'Enterprise site, RFP process only, no structured endpoints', color: 'red' },
  { name: 'Independent landscapers', score: 8, tier: 'Not Scored', detail: 'Truck lettering and a phone number, zero web presence or structured data', color: 'red' },
]

const agentReadyTools = [
  {
    name: 'get_pricing',
    description: 'Returns structured pricing based on property size (lot square footage), service type (mowing, edging, leaf removal, mulching, seasonal cleanup), frequency, and add-ons. Factors in property features like slope, fence gates, and tree count.',
    example: 'get_pricing({ lot_sqft: 8000, services: ["mowing", "edging", "leaf_removal"], frequency: "biweekly" }) \u2192 { per_visit: 65, monthly: 130, currency: "USD" }',
    icon: DollarSign,
    color: 'emerald',
  },
  {
    name: 'get_service_catalog',
    description: 'Returns the full catalog of available services with descriptions, typical pricing ranges, seasonal availability, and equipment requirements. Agents use this to understand what you offer before requesting a quote.',
    example: 'get_service_catalog({ category: "lawn_care" }) \u2192 { services: [{ id: "mowing", name: "Lawn Mowing", price_range: "$35-$85", seasons: ["spring", "summer", "fall"] }] }',
    icon: Layers,
    color: 'blue',
  },
  {
    name: 'check_availability',
    description: 'Returns available service dates and time windows for a given zip code and service type. Accounts for crew capacity, route optimization, and weather-related scheduling.',
    example: 'check_availability({ zip: "30301", service: "mowing", week_of: "2026-04-20" }) \u2192 { slots: [{ date: "2026-04-21", window: "8am-12pm" }, { date: "2026-04-23", window: "1pm-5pm" }] }',
    icon: Calendar,
    color: 'purple',
  },
  {
    name: 'submit_photo_estimate',
    description: 'Accepts property photos (satellite view, front yard, backyard) and returns an automated estimate based on visible lot size, terrain, and landscaping complexity. Replaces the in-person site visit for standard services.',
    example: 'submit_photo_estimate({ photos: ["front.jpg", "back.jpg", "satellite.jpg"], services: ["full_lawn_care"] }) \u2192 { estimate_id: "EST-3291", range: "$120-$160/visit" }',
    icon: Camera,
    color: 'amber',
  },
  {
    name: 'manage_recurring',
    description: 'Creates, modifies, pauses, or cancels recurring lawn care schedules. Supports weekly, biweekly, and monthly frequencies with seasonal service adjustments (e.g., switch from mowing to leaf removal in fall).',
    example: 'manage_recurring({ action: "create", services: ["mowing", "edging"], frequency: "weekly", season_adjust: true }) \u2192 { schedule_id: "REC-445", next_visit: "2026-04-22" }',
    icon: Repeat,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do landscaping companies score so low on agent readiness?',
    answer:
      'Landscaping companies operate almost entirely through phone calls and text messages. Most are owner-operated businesses with zero web presence beyond a Google Business Profile or Facebook page. Estimates typically require a physical site visit because pricing depends on lot size, terrain, existing vegetation, and access points. None of this information is available through structured APIs. The average independent landscaper has a phone number on their truck and word-of-mouth referrals as their entire marketing stack.',
  },
  {
    question: 'Can property-size-based pricing replace site visits?',
    answer:
      'For standard services like mowing, edging, and leaf removal — yes. Satellite imagery and lot data from county records give an accurate enough property size for automated quoting. Companies like LawnStarter already use address-based pricing for basic services. The missing piece is exposing that pricing through a structured API rather than a proprietary web form. For complex projects like hardscaping, irrigation, or landscape design, a site visit or at minimum a detailed photo submission remains necessary.',
  },
  {
    question: 'How does seasonal scheduling work for agent-ready landscaping?',
    answer:
      'Landscaping is inherently seasonal, which makes it more complex than year-round services but not impossible to structure. An agent-ready landscaping company maintains a service catalog that maps services to seasons: mowing and fertilizing in spring/summer, aeration and overseeding in fall, leaf removal in autumn, snow removal in winter. A manage_recurring() endpoint with season_adjust: true automatically transitions the service plan as seasons change — no phone call needed.',
  },
  {
    question: 'What is the business case for a landscaping company to become agent-ready?',
    answer:
      'AI home management agents are converging on managing all household services through a single interface. The homeowner who tells their AI assistant to handle lawn care, cleaning, and pest control expects the agent to find, price, and book all three. The first landscaping company in each service area with an MCP server captures 100% of agent-driven bookings at zero customer acquisition cost. Compare that to the $20-40 per lead that marketplaces like Thumbtack charge, or the 15-20% commission that platforms like LawnStarter take.',
  },
  {
    question: 'How does landscaping fit into the broader AI home management picture?',
    answer:
      'AI home assistants will manage a bundle of recurring services: cleaning (weekly), lawn care (biweekly), pest control (quarterly), HVAC maintenance (biannual), and seasonal services like gutter cleaning or pressure washing. The agent needs structured APIs for all of these to manage a household automatically. Landscaping is one of the highest-frequency services in this bundle. The companies that become agent-ready first across these verticals create a lock-in effect — the AI assistant defaults to providers it has already connected to.',
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

export default function LandscapingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Landscaping Agent Readiness: Why Lawn Care and Garden Services Can\'t Be Scheduled by AI',
    description:
      'The $130B US landscaping market is invisible to AI agents. Phone-based scheduling, site-visit estimates, variable pricing. A complete analysis of what agent-ready landscaping looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/landscaping-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'landscaping lawn care agent readiness, landscaping company AI, lawn care MCP server, garden services agent readiness, AI scheduling landscaping',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Landscaping Agent Readiness',
          item: 'https://agenthermes.ai/blog/landscaping-agent-readiness',
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
      title="Landscaping Agent Readiness: Why Lawn Care and Garden Services Can't Be Scheduled by AI"
      shareUrl="https://agenthermes.ai/blog/landscaping-agent-readiness"
      currentHref="/blog/landscaping-agent-readiness"
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
            <span className="text-zinc-400">Landscaping Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Trees className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              $130B Industry
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Landscaping Agent Readiness:{' '}
            <span className="text-emerald-400">Why Lawn Care and Garden Services Can&apos;t Be Scheduled by AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US landscaping market generates <strong className="text-zinc-100">$130 billion per year</strong> across
            residential lawn care, commercial grounds maintenance, and landscape design. Over 650,000 landscaping businesses
            operate nationwide. Not a single one has an MCP server. When an AI home management assistant is asked to
            schedule lawn care, it has nothing to connect to.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            The $130 Billion Industry That Runs on Texts and Truck Lettering
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Landscaping is one of the most common household services in America. Nearly 80% of US households with
              a yard use some form of professional lawn care or landscaping service. The industry spans everything
              from basic weekly mowing to full landscape architecture and hardscaping projects worth tens of thousands
              of dollars.
            </p>
            <p>
              Yet the customer experience for hiring a landscaper has not evolved in decades. You either know a guy,
              ask your neighbor, or scroll through Thumbtack and hope someone responds. Most landscaping companies
              operate with a phone number, a truck with their name on it, and a handshake agreement on pricing.
              Estimates for anything beyond basic mowing require a physical site visit — the landscaper drives to your
              property, walks the lot, and quotes a price based on what they see.
            </p>
            <p>
              Now imagine asking an AI home management assistant: &ldquo;Set up biweekly lawn care starting next
              week, budget under $70 per visit, and add leaf removal in the fall.&rdquo; The agent needs to find
              landscapers in your area, get pricing for your lot size, check availability, compare options, and
              book. It cannot do a single one of these steps. There is no pricing API. No availability endpoint.
              No service catalog. No booking interface. The agent tells you to call someone manually — the{' '}
              <Link href="/blog/home-services-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                same pattern across all home services
              </Link>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {industryStats.map((stat) => (
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

      {/* ===== WHY LANDSCAPERS SCORE SO LOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Why Landscaping Companies Score Under 15
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes scans show that independent landscaping companies average a score of <strong className="text-zinc-100">8 out of 100</strong> on
              the Agent Readiness Score. That is ARL-0: Dark — completely invisible to the agent economy. Even national
              franchises like TruGreen barely break 20. Here is where each dimension fails.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { dim: 'D1 Discovery (0.12)', score: '1-4', detail: 'Most landscapers have no website at all. Those with sites use template builders with no structured data, no sitemap, and no robots.txt. Google Business Profile is often their only web presence.', color: 'red' },
              { dim: 'D2 API Quality (0.15)', score: '0', detail: 'Zero public APIs exist in the entire residential landscaping industry. No REST endpoints, no JSON responses, no structured data exchange of any kind. This is the highest-weighted dimension at zero.', color: 'red' },
              { dim: 'D3 Onboarding (0.08)', score: '0', detail: 'No self-service signup, no API keys, no developer documentation. No concept of programmatic access exists.', color: 'red' },
              { dim: 'D4 Pricing (0.05)', score: '1-6', detail: 'Some companies show starting prices on their website ("lawns starting at $35"). None publish structured pricing formulas. Most require a site visit for any quote. "Call for a free estimate" is the industry standard.', color: 'red' },
              { dim: 'D6 Data Quality (0.10)', score: '2-10', detail: 'National franchises have basic Schema.org LocalBusiness markup. Independent landscapers have none. No JSON-LD, no structured service catalogs, no machine-readable service areas.', color: 'amber' },
              { dim: 'D9 Agent Experience (0.10)', score: '0', detail: 'No agent-card.json, no llms.txt, no MCP server, no AGENTS.md. Zero agent infrastructure across 650,000+ businesses.', color: 'red' },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.dim}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-zinc-100">{item.dim}</h3>
                    <span className={`text-sm font-mono font-bold ${colors.text}`}>{item.score}/100</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Platform Trap: LawnStarter and Thumbtack Own the Relationship
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Landscaping companies that appear on LawnStarter, TaskEasy, or Thumbtack are technically discoverable
              through those platforms. But the platform owns the customer relationship and takes 15-20% of every
              job. The landscaper becomes a fulfillment provider, not a business with its own customers. The{' '}
              <Link href="/blog/cleaning-services-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                same disintermediation pattern we see in cleaning services
              </Link> applies here — the middleman is more agent-ready than the actual service provider.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform / Business</div>
              <div>Score</div>
              <div>Tier</div>
              <div>Notes</div>
            </div>
            {platformScores.map((row, i) => {
              const colors = getColorClasses(row.color)
              return (
                <div
                  key={row.name}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.name}</div>
                  <div className={`font-mono font-bold ${colors.text}`}>{row.score}</div>
                  <div className="text-zinc-500">{row.tier}</div>
                  <div className="text-zinc-500">{row.detail}</div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The direct booking advantage:</strong> A landscaping company with
              its own MCP server bypasses LawnStarter and Thumbtack entirely. When an AI home assistant schedules lawn
              care, it connects directly to the company — zero platform fees, zero bidding wars, zero commission.
              The landscaper with the best agent infrastructure in each zip code wins all agent-driven bookings.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE SITE VISIT PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Solving the Site Visit Problem with Satellite Data and Photo Estimates
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The biggest objection from landscaping companies is that pricing requires seeing the property in
              person. This is true for complex landscape design projects. But for the bread-and-butter services
              that make up 70%+ of revenue — mowing, edging, fertilizing, leaf removal — property-size-based
              pricing is already proven to work.
            </p>
            <p>
              Companies like LawnStarter and TaskEasy already price basic lawn care by address alone, using county
              assessor lot data and satellite imagery to estimate lot size. The formula is straightforward: lot
              square footage multiplied by a per-service rate, adjusted for terrain factors (slope, obstacles, gate
              access) that can be detected from aerial imagery. This approach is accurate within 10-15% of in-person
              estimates for standard services.
            </p>
            <p>
              For services that need visual assessment — garden design, tree removal, hardscaping — a photo-based
              estimate system bridges the gap. The homeowner or their AI agent submits photos of the property
              (front, back, satellite view) through a structured endpoint. The landscaping company reviews the
              photos and returns a range estimate within hours, not the 3-5 day wait for a site visit appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Automated pricing (70% of services)',
                detail: 'Mowing, edging, fertilizing, aeration, leaf removal, basic cleanup. Price by lot size from county data + satellite imagery. No site visit needed.',
                color: 'emerald',
              },
              {
                title: 'Photo-based estimates (20% of services)',
                detail: 'Garden bed design, shrub trimming, mulching, seasonal planting. Submit property photos through API, receive range estimate within hours.',
                color: 'blue',
              },
              {
                title: 'Site visit required (10% of services)',
                detail: 'Hardscaping, irrigation systems, retaining walls, major tree work. Complex projects that still need in-person assessment and engineered plans.',
                color: 'amber',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`font-bold mb-2 text-sm ${colors.text}`}>{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LANDSCAPING LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Landscaping Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready landscaping company exposes five MCP tools that let any AI assistant find, price,
            schedule, and manage lawn care and garden services without a phone call.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyTools.map((tool) => {
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
                    <h3 className="text-lg font-bold text-zinc-100">
                      <code className={`${colors.text} text-base`}>{tool.name}()</code>
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{tool.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{tool.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Landscaping has a unique advantage for agent automation: most services are recurring. A homeowner
              who books lawn mowing does not book it once — they book it weekly or biweekly for 8-9 months of
              the year. This makes the lifetime value of an agent-acquired customer extremely high. One successful
              agent booking can generate $2,000-$4,000 per year in recurring revenue, compared to the $35-50
              one-time cost of acquiring that customer through traditional marketing.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AI HOME MANAGEMENT PLAY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-500" />
            The AI Home Management Bundle
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AI home management agents will not manage landscaping in isolation. They will manage a complete
              bundle of household services: lawn care alongside{' '}
              <Link href="/blog/cleaning-services-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                house cleaning
              </Link>, pest control, HVAC maintenance, gutter cleaning, and seasonal services. The homeowner sets
              preferences once — budget, frequency, quality expectations — and the AI agent handles all of it.
            </p>
            <p>
              This bundle dynamic creates a powerful first-mover advantage. When an AI home assistant already has
              a cleaning company connected through MCP, it will seek out a landscaping company with the same
              infrastructure for the same household. The landscaper with an MCP server gets bundled into the
              home management stack. The one without gets left out permanently.
            </p>
            <p>
              Seasonal transitions make landscaping particularly valuable in this bundle. An agent-ready landscaping
              company that automatically adjusts services from mowing to leaf removal to snow plowing demonstrates
              the kind of year-round reliability that AI home assistants need. Each season is an opportunity to
              deepen the relationship — and each additional service makes switching providers harder.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Spring / Summer',
                detail: 'Weekly mowing, edging, fertilizing, weed control, irrigation management. Highest frequency, highest revenue season. Agent schedules automatically as temperatures rise.',
              },
              {
                title: 'Fall',
                detail: 'Leaf removal, aeration, overseeding, final fertilizer application, garden bed cleanup. Agent auto-transitions service plan when first frost approaches.',
              },
              {
                title: 'Winter',
                detail: 'Snow removal, ice management, hardscape maintenance, equipment prep. For year-round providers, winter services prevent seasonal customer loss.',
              },
              {
                title: 'Year-round add-ons',
                detail: 'Tree trimming, pressure washing, gutter cleaning, holiday lighting. High-margin services the agent can suggest when maintaining the household calendar.',
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
                title: 'Home Services Agent Readiness: Why Your Plumber, Electrician, and HVAC Tech Are Invisible to AI',
                href: '/blog/home-services-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Cleaning Services Agent Readiness: Why Maids and Cleaners Can\'t Be Found by AI',
                href: '/blog/cleaning-services-agent-readiness',
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
            Run your landscaping company through the scanner
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score across all 9 dimensions. Find out exactly what is missing
            and how to become the first agent-ready landscaper in your service area.
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
