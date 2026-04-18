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
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  MapPin,
  Phone,
  Search,
  Server,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Florist and Garden Center Agent Readiness: Why Flower Delivery Can\'t Be Automated by AI Agents | AgentHermes',
  description:
    'The $35B US floral market runs on phone calls, walk-in orders, and daily-changing inventory. AI gift agents want to send flowers — but zero individual florists have APIs. The first florist with an MCP server captures every AI assistant birthday order.',
  keywords: [
    'florist garden center agent readiness',
    'florist AI agent',
    'flower delivery automation',
    'garden center MCP server',
    'florist agent readiness score',
    'AI flower ordering',
    'floral industry API',
    'MCP server florist',
    'agent economy florist',
  ],
  openGraph: {
    title: 'Florist and Garden Center Agent Readiness: Why Flower Delivery Can\'t Be Automated by AI Agents',
    description:
      'The $35B US floral market is invisible to AI agents. Phone ordering, seasonal inventory, manual delivery zones. The first florist with MCP gets every AI birthday order.',
    url: 'https://agenthermes.ai/blog/florist-garden-center-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Florist and Garden Center Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florist Agent Readiness: Why AI Can\'t Send Flowers Yet',
    description:
      '$35B floral market. Zero florist APIs. The first florist with MCP captures every AI gift order.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/florist-garden-center-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const currentState = [
  {
    problem: 'Phone and Walk-In Only',
    description: 'Most local florists take orders by phone call or in-person visit. There is no API, no structured order form that an agent can call. A customer says "send roses to my mom" to their AI assistant and the assistant replies: "I found a number you can call."',
    icon: Phone,
    color: 'red',
  },
  {
    problem: 'Seasonal Inventory Is Invisible',
    description: 'What is blooming changes daily. Peonies in May, dahlias in August, poinsettias in December. No florist publishes real-time stem availability in a machine-readable format. Agents cannot check what is actually available before recommending arrangements.',
    icon: Calendar,
    color: 'amber',
  },
  {
    problem: 'Delivery Zones Are Manual',
    description: 'Every florist has a delivery radius — some zip codes yes, some no, some with a surcharge. This information lives in the florist\'s head or on a hand-drawn map. No API endpoint returns whether a delivery address is in range and what it costs.',
    icon: Truck,
    color: 'amber',
  },
  {
    problem: 'Custom Arrangements Require Consultation',
    description: 'High-margin custom arrangements are the bread and butter. But they require a conversation: What is the occasion? Budget? Color preferences? Allergies? This is inherently consultative. No agent can navigate a freeform consultation without structured options.',
    icon: Sparkles,
    color: 'red',
  },
]

const agentReadyFeatures = [
  {
    tool: 'get_catalog',
    description: 'Product catalog API with real-time availability. Every arrangement, bouquet, and plant with current stock status, pricing, and seasonal availability flag.',
    example: 'get_catalog({ category: "sympathy", in_stock: true }) → 12 arrangements with photos, prices, same-day availability',
    impact: 'D2 API Quality: structured product data replaces "browse our website"',
  },
  {
    tool: 'check_delivery_zone',
    description: 'Delivery zone checker that accepts an address or zip code and returns: deliverable (yes/no), delivery fee, estimated delivery window, same-day cutoff time.',
    example: 'check_delivery_zone({ zip: "90210" }) → { deliverable: true, fee: 12.99, same_day_cutoff: "2:00 PM", windows: ["10am-12pm", "2pm-4pm"] }',
    impact: 'D6 Data Quality: agents get definitive answers instead of "call to confirm"',
  },
  {
    tool: 'build_arrangement',
    description: 'Arrangement customization builder. Structured options for occasion, color palette, size, add-ons (vase, card, chocolate), and budget range. Replaces freeform consultation with guided selection.',
    example: 'build_arrangement({ occasion: "birthday", colors: ["pink", "white"], budget: "75-100", add_ons: ["card"] }) → arrangement preview with price',
    impact: 'D9 Agent Experience: consultation becomes a structured tool call',
  },
  {
    tool: 'recommend_by_occasion',
    description: 'Occasion-based recommendation engine. Input the occasion (birthday, sympathy, anniversary, thank you, get well) and get curated suggestions ranked by popularity and availability.',
    example: 'recommend_by_occasion({ occasion: "anniversary", budget_max: 150 }) → top 5 arrangements with ratings',
    impact: 'D1 Discovery: agents can find the right product without browsing',
  },
  {
    tool: 'schedule_recurring',
    description: 'Recurring delivery scheduling. Weekly office flowers, monthly subscription bouquets, annual anniversary reminders. An agent sets it up once and the florist fulfills automatically.',
    example: 'schedule_recurring({ type: "weekly", day: "Monday", arrangement: "seasonal-mixed", address: "..." }) → subscription_id',
    impact: 'D5 Payment: recurring revenue channel that agents can manage',
  },
]

const comparisonRows = [
  { aspect: 'Ordering', current: 'Phone call or walk-in', agentReady: 'create_order() with arrangement_id, delivery address, payment token' },
  { aspect: 'Availability', current: '"Let me check what we have today"', agentReady: 'get_catalog({ in_stock: true }) returns current inventory' },
  { aspect: 'Delivery', current: '"What zip code? Let me see if we deliver there"', agentReady: 'check_delivery_zone({ zip }) returns boolean + fee + windows' },
  { aspect: 'Customization', current: '15-minute phone consultation', agentReady: 'build_arrangement() with structured options in 2 seconds' },
  { aspect: 'Pricing', current: 'PDF price list or "starting at $49"', agentReady: 'get_pricing() with exact costs per arrangement, delivery, and add-ons' },
  { aspect: 'Recurring', current: 'Customer has to remember and call each time', agentReady: 'schedule_recurring() sets up automatic fulfillment' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why would an AI agent need to order flowers?',
    answer:
      'Millions of people already ask AI assistants to help with gifts. "Remind me to send Mom flowers for her birthday" is a common request. Today the assistant sets a reminder and the human has to do the ordering. With an MCP-enabled florist, the agent completes the entire transaction: selects appropriate flowers, confirms delivery zone, processes payment, and schedules delivery. The human approves in one tap instead of spending 15 minutes on the phone.',
  },
  {
    question: 'What about 1-800-Flowers? They have an API.',
    answer:
      'Yes, 1-800-Flowers has an API and scores higher than individual florists. But they are one company serving one product line. There are 35,000+ independent florists in the US, each with unique seasonal inventory, local delivery zones, and custom arrangement capabilities that national chains cannot match. The independent florist who becomes agent-ready captures local demand that 1-800-Flowers cannot fulfill with the same quality and same-day reliability.',
  },
  {
    question: 'How does seasonal inventory work with an API?',
    answer:
      'The florist updates their catalog as stems arrive. A well-built system ties into their existing POS (most use FloristWare, Dove POS, or similar) and reflects real-time availability. When peonies are in season, they appear in the API. When they sell out, they disappear. The agent always sees current truth — no "sorry, we are actually out of those" after placing an order.',
  },
  {
    question: 'What Agent Readiness Score do florists typically get?',
    answer:
      'Individual florists score between 3 and 12 on the AgentHermes scale. Most have a website (D1 partial credit), but no API, no structured data, no agent discovery files, and no programmatic ordering. The industry average is approximately 7 out of 100. Even florists with Shopify stores only score around 22 because the Shopify storefront API is not designed for agent interaction.',
  },
  {
    question: 'What would it cost a florist to become agent-ready?',
    answer:
      'Building custom infrastructure from scratch would cost thousands. AgentHermes auto-generates an MCP server with florist-specific tools (catalog, delivery zones, arrangement builder) from a simple setup wizard. The florist enters their business details, delivery areas, and connects their POS. AgentHermes handles hosting, protocol compliance, and agent discovery. No developer needed.',
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

export default function FloristGardenCenterAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Florist and Garden Center Agent Readiness: Why Flower Delivery Can\'t Be Automated by AI Agents',
    description:
      'The $35B US floral market runs on phone calls and walk-in orders. AI gift agents want to send flowers but zero individual florists have APIs. Here is what agent-ready looks like for florists.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/florist-garden-center-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'florist garden center agent readiness, flower delivery AI agent, florist MCP server, agent economy florist',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Florist Garden Center Agent Readiness',
          item: 'https://agenthermes.ai/blog/florist-garden-center-agent-readiness',
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
      title="Florist and Garden Center Agent Readiness: Why Flower Delivery Can't Be Automated by AI Agents"
      shareUrl="https://agenthermes.ai/blog/florist-garden-center-agent-readiness"
      currentHref="/blog/florist-garden-center-agent-readiness"
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
            <span className="text-zinc-400">Florist Garden Center Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Store className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              $35B Market
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Florist and Garden Center Agent Readiness:{' '}
            <span className="text-emerald-400">Why Flower Delivery Cannot Be Automated by AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US floral market generates <strong className="text-zinc-100">$35 billion per year</strong>.
            Millions of people ask AI assistants to help send flowers for birthdays, anniversaries, and
            sympathy. The assistant cannot complete a single order. Phone calls, seasonal inventory that
            changes daily, manual delivery zones, and consultation-based customization make florists
            completely invisible to the agent economy.
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

      {/* ===== MARKET SIZE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            A $35 Billion Market Running on Phone Calls
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The US floral industry is massive. Over 35,000 independent florists, plus garden centers,
              nurseries, and online flower delivery services generate $35 billion annually. Flowers are
              the default gift for nearly every occasion: birthdays, Mother&apos;s Day, Valentine&apos;s
              Day, sympathy, anniversaries, thank yous, and corporate events.
            </p>
            <p>
              Yet the vast majority of flower orders at independent shops happen the same way they did
              in 1990: a customer calls, describes what they want, the florist quotes a price, and the
              customer reads their credit card number over the phone. Some florists have websites with
              galleries of past arrangements, but almost none have structured product catalogs with
              real-time availability and programmatic ordering.
            </p>
            <p>
              This matters because the next wave of flower purchases will be initiated by AI agents.
              &ldquo;Send my wife flowers for our anniversary next Tuesday&rdquo; is already a common
              request to assistants like Claude, ChatGPT, and Siri. Today the agent can only reply
              with a search result or a phone number. With an MCP-enabled florist, the agent completes
              the entire transaction in seconds.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$35B', label: 'US floral market', icon: DollarSign },
              { value: '35K+', label: 'independent florists', icon: Store },
              { value: '~7', label: 'avg agent readiness score', icon: BarChart3 },
              { value: '0', label: 'florists with MCP servers', icon: Server },
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

      {/* ===== WHY FLORISTS ARE NOT AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            Why Florists Score Under 10 on Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes scans of independent florists consistently return scores between 3 and 12
              out of 100. The{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local business agent readiness pattern
              </Link>{' '}
              is familiar: a website provides partial D1 Discovery credit, but every other dimension
              scores near zero. Florists have four specific challenges that make them especially
              difficult for agents.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {currentState.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.problem}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.problem}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The core problem:</strong> Flowers are perishable,
              seasonal, and highly customizable. Unlike a restaurant menu that changes weekly or a
              service catalog that changes monthly, a florist&apos;s inventory changes <em>daily</em>.
              This makes static product pages useless for agents. An agent needs real-time availability
              or it will recommend arrangements that do not exist today.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 1-800-FLOWERS EXCEPTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            The 1-800-Flowers Exception and What It Proves
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              1-800-Flowers has an API. They have structured product catalogs, delivery zone validation,
              and programmatic ordering. Their agent readiness score is significantly higher than any
              independent florist. This proves the concept: when flower ordering is API-accessible,
              agents can complete transactions.
            </p>
            <p>
              But 1-800-Flowers is one company with standardized, mass-produced arrangements shipped
              from centralized warehouses. They cannot offer what a local florist offers: custom
              arrangements with locally-sourced seasonal flowers, same-day delivery within a hyperlocal
              radius, personal relationships with repeat customers, and the ability to walk into a
              cooler and build exactly what the customer wants.
            </p>
            <p>
              The local florist who becomes agent-ready does not compete with 1-800-Flowers. They
              complement the national chain by offering what it cannot: local, fresh, custom, and
              same-day. When an agent evaluates options for &ldquo;send flowers to 123 Main St by
              3pm today,&rdquo; the local florist with an MCP server wins every time on freshness,
              speed, and customization.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY FLORIST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Florist Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five MCP tools transform a florist from invisible (score 7) to agent-accessible (score 60+).
            Each tool maps to a specific dimension of the Agent Readiness Score.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyFeatures.map((feature) => (
              <div
                key={feature.tool}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-bold text-zinc-100">
                    <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                      {feature.tool}()
                    </code>
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{feature.description}</p>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-2">
                  <p className="text-xs text-zinc-500">
                    <span className="text-zinc-400 font-medium">Example:</span>{' '}
                    <code className="text-emerald-400 text-xs">{feature.example}</code>
                  </p>
                </div>
                <p className="text-xs text-blue-400">{feature.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Current vs Agent-Ready: Side by Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every interaction a customer has with a florist can be structured for agent consumption.
            The human experience does not change — the florist gains an additional channel.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Interaction</div>
              <div>Today</div>
              <div>Agent-Ready</div>
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

      {/* ===== GARDEN CENTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-500" />
            Garden Centers: The Adjacent Opportunity
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Garden centers and nurseries face similar challenges but with an added dimension: plant
              care knowledge. An agent-ready garden center exposes not just inventory and pricing but
              also plant care instructions, hardiness zone compatibility, and seasonal planting guides.
            </p>
            <p>
              Consider the query: &ldquo;What should I plant in my backyard in zone 7b this month?&rdquo;
              A garden center with an MCP server can respond with available plants filtered by hardiness
              zone, current inventory, planting season, sun requirements, and price. The agent becomes a
              personalized gardening advisor backed by a real store with real inventory.
            </p>
            <p>
              Additional agent-ready tools for garden centers include{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">check_hardiness_zone()</code>,{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">get_planting_calendar()</code>, and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">get_care_instructions()</code>.
              These turn a garden center from a store into an expert system that agents can query on
              behalf of home gardeners.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AGENT GIFT ECONOMY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Agent Gift Economy Is Coming
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Gift-giving is one of the first use cases where AI agents will handle end-to-end
              transactions. The pattern is predictable: a user tells their assistant about an upcoming
              event (birthday, anniversary, holiday), the assistant selects an appropriate gift,
              confirms with the user, and handles ordering and delivery. Flowers are the most
              common gift category.
            </p>
            <p>
              The florist who is agent-ready when this wave hits captures an entirely new revenue
              channel. Unlike{' '}
              <Link href="/blog/food-beverage-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                food and beverage businesses
              </Link>{' '}
              where the customer is present for consumption, flower delivery is entirely intermediated.
              The buyer rarely sees the flowers before the recipient does. This makes it a perfect
              agent use case: the agent handles selection, ordering, and delivery coordination while
              the human simply approves the recommendation.
            </p>
            <p>
              First-mover advantage in agent readiness is especially strong in the floral industry
              because agents build preferences. Once an agent successfully orders from a florist and
              the delivery goes well, that florist becomes the default for future orders. The first
              florist in each delivery zone to become agent-ready locks in a recurring relationship
              with every AI assistant that serves that area.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The first-mover math:</strong> There are roughly
              35,000 independent florists in the US. Zero have MCP servers. The first florist in any
              city to become agent-ready captures 100% of agent-initiated flower orders in their
              delivery zone. As AI assistant usage grows from millions to billions of daily
              interactions, this channel will rival walk-in and phone orders within five years.
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
                title: 'Local Business Agent Readiness: The $6.2B Gap',
                href: '/blog/local-business-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Food and Beverage Agent Readiness',
                href: '/blog/food-beverage-agent-readiness',
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
            Make your florist visible to AI agents
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See how your business scores across all 9 dimensions. Get an auto-generated MCP server
            with florist-specific tools — catalog, delivery zones, arrangement builder, and more.
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
