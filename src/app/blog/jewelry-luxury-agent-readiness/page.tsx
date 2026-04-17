import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Crown,
  DollarSign,
  Eye,
  Gem,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Search,
  Server,
  Shield,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Jewelry and Luxury Goods Agent Readiness: Why High-End Retailers Are Dark to AI Shopping Agents | AgentHermes',
  description:
    'The $350B global luxury market is intentionally opaque: price on request, appointment-only showrooms, no public inventory. AI personal shoppers serving HNW clients need structured data. Average luxury score: under 10.',
  keywords: [
    'jewelry luxury goods agent readiness',
    'luxury retail AI agents',
    'jewelry MCP server',
    'luxury goods agent readiness score',
    'AI personal shopper luxury',
    'high end retail agent readiness',
    'luxury brand AI integration',
    'jewelry store AI readiness',
    'HNW client AI shopping',
  ],
  openGraph: {
    title: 'Jewelry and Luxury Goods Agent Readiness: Why High-End Retailers Are Dark to AI Shopping Agents',
    description:
      'The $350B luxury market is anti-agent by design. Price on request, appointment-only, no public inventory. The first luxury brand with an MCP for VIP agents captures the concierge market.',
    url: 'https://agenthermes.ai/blog/jewelry-luxury-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jewelry and Luxury Goods Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jewelry and Luxury Goods Agent Readiness: Why High-End Retailers Are Dark to AI Agents',
    description:
      '$350B luxury market. Intentionally opaque. AI personal shoppers for HNW clients need structured data. Average score: under 10.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/jewelry-luxury-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const luxuryBarriers = [
  {
    barrier: 'Price on Request',
    description: 'Most luxury brands intentionally hide pricing. A Cartier engagement ring, a Patek Philippe watch, or a Bulgari necklace all show "Price on Request" online. This is a feature, not a bug — exclusivity demands opacity.',
    agentImpact: 'D4 Pricing Transparency scores 0. Agents cannot compare, recommend, or budget without structured price data.',
    icon: DollarSign,
    color: 'red',
  },
  {
    barrier: 'Appointment-Only Access',
    description: 'High-end jewelers operate by appointment. No walk-ins, no online booking for most. The experience is curated: private viewings, champagne, one-on-one consultations.',
    agentImpact: 'D6 Data Quality drops — no availability API, no booking endpoint. An agent cannot schedule a VIP viewing.',
    icon: Calendar,
    color: 'amber',
  },
  {
    barrier: 'No Public Inventory',
    description: 'Luxury retailers keep inventory invisible. A jeweler may have 200 pieces in the vault, but the website shows 12 "featured" items. Inventory is disclosed selectively to qualified buyers.',
    agentImpact: 'D2 API Quality scores near 0. No product catalog endpoint, no search, no filtering by stone, metal, or price range.',
    icon: Eye,
    color: 'purple',
  },
  {
    barrier: 'Authentication and Provenance',
    description: 'Every luxury piece has a story: GIA certification, chain of custody, limited edition number, designer attribution. This data exists but lives in PDFs, certificates, and private databases.',
    agentImpact: 'D6 Data Quality misses provenance — agents cannot verify authenticity or relay certification to buyers.',
    icon: Shield,
    color: 'blue',
  },
]

const agentReadyFeatures = [
  {
    name: 'Authenticated Product Catalog API',
    description: 'Expose inventory to verified agents only. OAuth-protected endpoints that require agent identity verification before returning product data. The catalog is not public — it is selectively shared with trusted AI concierge platforms.',
    boost: 'D2 API Quality: 0 to 75+',
    icon: Layers,
  },
  {
    name: 'Price-Qualified Viewing',
    description: 'Instead of "price on request," offer a structured flow: agent submits client qualification (budget range, purchase history, referral) and receives tiered pricing. The price is still controlled — but machine-readable.',
    boost: 'D4 Pricing Transparency: 0 to 60+',
    icon: DollarSign,
  },
  {
    name: 'Appointment Scheduling Endpoint',
    description: 'A tool like book_private_viewing({ client_profile, preferred_dates, interests }) that lets AI concierges schedule VIP appointments. The luxury experience stays intact — but the booking is automated.',
    boost: 'D6 Data Quality: +25 points',
    icon: Calendar,
  },
  {
    name: 'Provenance and Certification JSON',
    description: 'Structured data for every piece: GIA report number, carat/cut/clarity/color, metal composition, designer, edition number, chain of custody. Machine-readable authenticity that agents can relay to clients.',
    boost: 'D6 Data Quality: +20 points',
    icon: CheckCircle2,
  },
  {
    name: 'MCP Server for VIP Agents',
    description: 'The full package: tools for search_collection, check_availability, book_viewing, verify_provenance, get_pricing_qualified. Exposed only to authenticated AI personal shopping platforms.',
    boost: 'D9 Agent Experience: 0 to 80+',
    icon: Server,
  },
]

const comparisonRows = [
  { aspect: 'Product Discovery', traditional: '"Visit our boutique" or PDF lookbook', agentReady: 'search_collection({ stone: "diamond", cut: "emerald", carat_min: 2.0 })' },
  { aspect: 'Pricing', traditional: '"Price on Request" on every page', agentReady: 'get_pricing({ item_id, client_tier: "vip" }) returns structured price' },
  { aspect: 'Availability', traditional: '"Contact us to inquire"', agentReady: 'check_availability({ item_id }) returns stock and location' },
  { aspect: 'Booking', traditional: 'Phone call to schedule private viewing', agentReady: 'book_private_viewing({ dates, client_profile, interests })' },
  { aspect: 'Authentication', traditional: 'Paper GIA certificate in velvet folder', agentReady: 'verify_provenance({ item_id }) returns full certification JSON' },
  { aspect: 'Personalization', traditional: 'Sales associate remembers preferences', agentReady: 'get_recommendations({ style_preferences, budget, occasion })' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why would a luxury brand want to be discoverable by AI agents?',
    answer:
      'Because their highest-value clients are already using AI personal shoppers. HNW individuals increasingly delegate research and scheduling to AI assistants. A luxury brand invisible to agents is invisible to the AI concierge that a billionaire uses to find their next anniversary gift. The first Cartier competitor with an MCP server captures that entire channel.',
  },
  {
    question: 'Does agent readiness conflict with luxury exclusivity?',
    answer:
      'No. Agent-ready does not mean public. Authenticated APIs, price-qualified access, and invitation-only MCP connections maintain every layer of exclusivity. The data is structured and machine-readable, but access is controlled. Think of it as a private API for your most important client channel — AI concierges serving your target demographic.',
  },
  {
    question: 'What would a luxury jewelry MCP server look like?',
    answer:
      'Five core tools behind OAuth authentication: search_collection (filtered by stone, metal, price range, designer), check_availability (real-time stock with location), book_private_viewing (appointment scheduling), verify_provenance (GIA certs, chain of custody), and get_pricing_qualified (tiered pricing based on client profile). Plus resources for brand story, care instructions, and bespoke service options.',
  },
  {
    question: 'How do luxury brands score on the Agent Readiness Score today?',
    answer:
      'Under 10 out of 100. Most luxury jewelers have beautiful websites but zero API endpoints, no structured data beyond basic Schema.org, no agent-card.json, no MCP server, and intentionally hidden pricing. They score ARL-0: Dark — completely invisible to AI shopping agents. Even mass-market e-commerce outscores them.',
  },
  {
    question: 'Which luxury brands are closest to being agent-ready?',
    answer:
      'Brands with e-commerce functionality score slightly higher — LVMH-owned platforms like 24S, Farfetch (marketplace model), and Net-a-Porter have some structured product data. But even these lack MCP servers, agent-card.json, or pricing APIs. The luxury sector as a whole is further behind than almost any other industry we have scanned.',
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

export default function JewelryLuxuryAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Jewelry and Luxury Goods Agent Readiness: Why High-End Retailers Are Dark to AI Shopping Agents',
    description:
      'The $350B global luxury market is intentionally opaque. AI personal shoppers need structured data. Average luxury retailer score: under 10.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/jewelry-luxury-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'jewelry luxury goods agent readiness, luxury retail AI, jewelry MCP server, AI personal shopper, HNW client AI',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Jewelry and Luxury Goods Agent Readiness',
          item: 'https://agenthermes.ai/blog/jewelry-luxury-agent-readiness',
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
      title="Jewelry and Luxury Goods Agent Readiness: Why High-End Retailers Are Dark to AI Shopping Agents"
      shareUrl="https://agenthermes.ai/blog/jewelry-luxury-agent-readiness"
      currentHref="/blog/jewelry-luxury-agent-readiness"
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
            <span className="text-zinc-400">Jewelry and Luxury Goods Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Gem className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Luxury Market
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Jewelry and Luxury Goods Agent Readiness:{' '}
            <span className="text-emerald-400">Why High-End Retailers Are Dark to AI Shopping Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The global luxury goods market is worth <strong className="text-zinc-100">$350 billion</strong>.
            It is built on exclusivity, curation, and controlled access. &ldquo;Price on request.&rdquo;
            Appointment-only showrooms. No public inventory. This is not a failure of technology — it is
            a business model. And it makes luxury the <strong className="text-zinc-100">most anti-agent
            industry on Earth</strong>.
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
                  13 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE LUXURY PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            The Luxury Paradox: Exclusivity Is Anti-Agent by Design
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every other industry we have analyzed at AgentHermes has a clear path to agent readiness:
              expose your data, structure your APIs, add an agent-card.json. But luxury goods present a
              genuine paradox. The very features that make a brand luxury — scarcity, opacity, controlled
              access — are the exact opposite of what AI agents need to function.
            </p>
            <p>
              When we scan luxury jewelers, watch brands, and high-end fashion houses, the scores are
              devastating. Not because these brands lack technology — many have stunning websites built by
              world-class agencies — but because every design choice is optimized for{' '}
              <strong className="text-zinc-100">human experience at the expense of machine readability</strong>.
            </p>
            <p>
              A Tiffany product page is a work of art. It is also completely opaque to an AI agent trying to
              find a 2-carat emerald-cut diamond ring under $30,000 for a client anniversary gift. The agent
              cannot search, cannot filter, cannot compare prices, cannot check availability, and cannot book
              a viewing. It can only say: &ldquo;Visit the store.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$350B', label: 'global luxury market', icon: DollarSign },
              { value: '<10', label: 'avg agent readiness score', icon: BarChart3 },
              { value: '0', label: 'luxury MCP servers', icon: Server },
              { value: '72%', label: 'say "price on request"', icon: Lock },
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

      {/* ===== FOUR BARRIERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            Four Barriers That Keep Luxury Scores Near Zero
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are not technical failures. They are business decisions that happen to make luxury
            brands invisible to the agent economy.
          </p>

          <div className="space-y-4 mb-8">
            {luxuryBarriers.map((barrier) => {
              const colors = getColorClasses(barrier.color)
              return (
                <div
                  key={barrier.barrier}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <barrier.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{barrier.barrier}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{barrier.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Agent Impact:</span>{' '}
                      <span className={colors.text}>{barrier.agentImpact}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE HNW CLIENT SHIFT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The HNW Client Shift: Why This Matters Now
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The luxury industry&rsquo;s most valuable customers — high-net-worth individuals — are
              the earliest and heaviest adopters of AI personal assistants. A client with a $10 million
              portfolio does not browse websites. They delegate. Today that delegation goes to human
              personal shoppers and concierge services. Tomorrow it goes to AI agents.
            </p>
            <p>
              AI personal shopping agents are already being built by wealth management platforms,
              family office software companies, and luxury concierge startups. These agents need to
              search inventory, compare options, check availability, and schedule viewings — across
              dozens of luxury brands simultaneously. The brand that provides structured data to these
              agents gets recommended first.
            </p>
            <p>
              Consider the workflow: a client tells their AI assistant, &ldquo;Find me a rose gold
              tennis bracelet with natural diamonds, 5-8 carats total, under $25,000, and schedule
              a private viewing this week in Manhattan.&rdquo; The agent that can fulfill this request
              needs product catalog data, pricing (even if tiered), availability by location, and a
              booking endpoint. Zero luxury brands provide all four today.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The first-mover advantage:</strong> When AI concierge
              platforms go live, they will integrate with whatever luxury brands have agent-readable data
              first. The brands that wait will not be in the recommendation set. In luxury, where a single
              sale can be $50,000 or more, losing one AI-mediated client per month to a competitor with an
              MCP server costs more than building the infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TRADITIONAL VS AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Traditional Luxury vs Agent-Ready Luxury
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Agent readiness does not require abandoning exclusivity. It requires making exclusivity
            machine-readable.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Capability</div>
              <div>Traditional Luxury</div>
              <div>Agent-Ready Luxury</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.traditional}</div>
                <div className="text-emerald-400 font-mono text-xs">{row.agentReady}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LUXURY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Luxury Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five capabilities that maintain exclusivity while opening the door to AI concierge platforms.
          </p>

          <div className="space-y-3 mb-8">
            {agentReadyFeatures.map((feature) => (
              <div
                key={feature.name}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <feature.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{feature.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-2">{feature.description}</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    {feature.boost}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The key insight is that <strong className="text-zinc-100">agent readiness and exclusivity
              are not in conflict</strong>. A gated, authenticated API is still an API. A price revealed
              only to qualified agents is still structured data. The luxury experience does not change for
              the end client — but the client&rsquo;s AI assistant can now do the research, comparison,
              and scheduling that previously required a human concierge.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Scoring Breakdown: Why Luxury Averages Under 10
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we run the{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes scanner
              </Link>{' '}
              on luxury jewelry and goods retailers, the results are consistent: single-digit scores.
              Here is where the points are lost.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { dimension: 'D1 Discovery', score: '8/100', reason: 'Beautiful SEO, but no agent-card.json, no llms.txt, no AGENTS.md' },
              { dimension: 'D2 API Quality', score: '2/100', reason: 'No public API endpoints. Product pages are HTML only.' },
              { dimension: 'D3 Onboarding', score: '5/100', reason: 'Account creation exists but no API key, no developer docs' },
              { dimension: 'D4 Pricing', score: '0/100', reason: '"Price on Request" across the board. Zero structured pricing.' },
              { dimension: 'D5 Payment', score: '12/100', reason: 'E-commerce checkout exists, but no payment API for agents' },
              { dimension: 'D6 Data Quality', score: '10/100', reason: 'Basic Schema.org Product markup, but no inventory or provenance API' },
              { dimension: 'D7 Security', score: '15/100', reason: 'HTTPS and basic headers, but no API auth framework' },
              { dimension: 'D8 Reliability', score: '8/100', reason: 'Sites are up, but no health endpoint, no status page, no SLA' },
              { dimension: 'D9 Agent Experience', score: '0/100', reason: 'Zero agent-native infrastructure. No MCP, no A2A, no agent tooling.' },
            ].map((item) => (
              <div key={item.dimension} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-zinc-200">{item.dimension}</span>
                  <span className="text-sm font-bold text-red-400">{item.score}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.reason}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The math:</strong> Weighted across all 9 dimensions, a
              typical luxury jeweler scores 6-9 out of 100 — firmly ARL-0: Dark. For comparison, a basic
              Shopify store with default settings scores around 30, and the{' '}
              <Link href="/blog/ecommerce-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                e-commerce vertical average
              </Link>{' '}
              is 28. Luxury is three times worse than the already-low e-commerce baseline.
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
                title: 'E-Commerce Agent Readiness: Why Shopify and Square Score Under 30',
                href: '/blog/ecommerce-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Pricing Transparency and Agent Readiness: D4 Deep Dive',
                href: '/blog/pricing-transparency-agent-readiness',
                tag: 'Dimension Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
                tagColor: 'blue',
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
            Is your luxury brand invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see how your brand scores across all 9 dimensions.
            Most luxury retailers score under 10 — find out where you stand.
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
