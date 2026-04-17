import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  Cloud,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  MapPin,
  Server,
  Sparkles,
  Tractor,
  TrendingUp,
  Wheat,
  Wrench,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Agriculture Agent Readiness: Why Farm Tech Has APIs But Farmers Don\'t | AgentHermes',
  description:
    'AgTech platforms like John Deere Operations Center have APIs locked behind dealer networks. Individual farms score 0-5. The $1.5T agriculture market is invisible to AI agents. Learn what agent-ready agriculture looks like.',
  keywords: [
    'agriculture farm agent readiness',
    'agriculture AI agents',
    'farm tech API',
    'John Deere agent readiness',
    'AgTech agent readiness',
    'smart farming AI',
    'agriculture MCP server',
    'farm API',
    'precision agriculture agent',
    'agricultural data agent',
  ],
  openGraph: {
    title: 'Agriculture Agent Readiness: Why Farm Tech Has APIs But Farmers Don\'t',
    description:
      'AgTech platforms score 30-40 but actual farms score 0-5. The agriculture sector is invisible to AI agents despite massive API potential in crop data, pricing, and scheduling.',
    url: 'https://agenthermes.ai/blog/agriculture-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agriculture Agent Readiness: Why Farm Tech Has APIs But Farmers Don\'t',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agriculture Agent Readiness: Why Farm Tech Has APIs But Farmers Don\'t',
    description:
      'AgTech platforms score 30-40. Actual farms score 0-5. The biggest gap in the agent economy is between the platforms and the producers.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agriculture-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const agTechScores = [
  { name: 'John Deere Operations Center', score: 38, notes: 'API exists but dealer-gated', color: 'amber' },
  { name: 'Climate FieldView (Bayer)', score: 34, notes: 'Data sharing API, partner-only', color: 'amber' },
  { name: 'Trimble Ag Software', score: 31, notes: 'REST API, enterprise SSO required', color: 'amber' },
  { name: 'Granular (Corteva)', score: 29, notes: 'Field-level data API, invitation-only', color: 'red' },
  { name: 'Average individual farm', score: 3, notes: 'Facebook page and phone number', color: 'red' },
]

const agentReadyTools = [
  {
    tool: 'get_crop_availability',
    description: 'Returns current crops in stock, quantities, harvest dates, and organic certification status. Agents use this to match buyers with available supply.',
    icon: Wheat,
    color: 'emerald',
  },
  {
    tool: 'get_seasonal_pricing',
    description: 'Structured pricing by crop, season, quantity tier, and delivery method. No more calling the farm office to ask what a bushel of corn costs this week.',
    icon: DollarSign,
    color: 'blue',
  },
  {
    tool: 'check_delivery_schedule',
    description: 'Available delivery windows, pickup options, shipping radius, and minimum order quantities. Agents can plan logistics without phone tag.',
    icon: Tractor,
    color: 'purple',
  },
  {
    tool: 'get_soil_test_results',
    description: 'Structured soil health data — pH, nitrogen, phosphorus, potassium, organic matter percentage. Buyers and certifiers need this in machine-readable format.',
    icon: Layers,
    color: 'amber',
  },
]

const gapRows = [
  { aspect: 'Product Discovery', platform: 'API with crop/field data', farm: 'Facebook photos of produce' },
  { aspect: 'Pricing', platform: 'Commodity exchange feeds', farm: '"Call for pricing" or none' },
  { aspect: 'Availability', platform: 'Real-time inventory sensors', farm: 'Farmers market schedule only' },
  { aspect: 'Ordering', platform: 'EDI or partner portal', farm: 'Phone call or cash at market' },
  { aspect: 'Delivery', platform: 'Fleet management API', farm: '"We deliver within 30 miles"' },
  { aspect: 'Certification', platform: 'USDA organic database query', farm: 'PDF certificate on request' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why would a farm need an MCP server?',
    answer:
      'AI agents are already being used by restaurants, grocery chains, and food distributors to source ingredients. When an agent searches for "organic tomatoes within 50 miles available next Tuesday," it queries MCP servers. Farms without one are invisible to this growing channel. The first farm in each region with an MCP server captures every AI-mediated wholesale inquiry.',
  },
  {
    question: 'How do AgTech platforms score higher than individual farms?',
    answer:
      'AgTech platforms like John Deere Operations Center have REST APIs, developer documentation, and structured data formats. They score 30-40 because the infrastructure exists but is gated behind dealer networks and partner programs. Individual farms score 0-5 because they have no digital infrastructure beyond a Facebook page or basic website with no structured data.',
  },
  {
    question: 'What is the cheapest way for a farm to become agent-ready?',
    answer:
      'Start with AgentHermes. The platform auto-generates an MCP server for agricultural businesses with tools like get_crop_availability, get_seasonal_pricing, and check_delivery_schedule. The farmer fills in their data — crops, pricing, delivery radius — and gets a hosted MCP endpoint. No developer needed, no API to maintain.',
  },
  {
    question: 'Do commodity exchanges count as agent-ready agriculture?',
    answer:
      'Commodity exchanges like CME Group have APIs for futures pricing, which helps agents understand market rates. But they do not help agents buy directly from a specific farm. The gap is between commodity-level data (what corn costs globally) and producer-level data (what this farm has available today at what price). Agent-ready agriculture bridges that gap.',
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

export default function AgricultureAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agriculture Agent Readiness: Why Farm Tech Has APIs But Farmers Don\'t',
    description:
      'AgTech platforms like John Deere Operations Center have APIs locked behind dealer networks. Individual farms score 0-5. The agriculture market is invisible to AI agents.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agriculture-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'agriculture farm agent readiness, AgTech agent readiness, farm API, smart farming AI, agriculture MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agriculture Agent Readiness',
          item: 'https://agenthermes.ai/blog/agriculture-agent-readiness',
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
      title="Agriculture Agent Readiness: Why Farm Tech Has APIs But Farmers Don't"
      shareUrl="https://agenthermes.ai/blog/agriculture-agent-readiness"
      currentHref="/blog/agriculture-agent-readiness"
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
            <span className="text-zinc-400">Agriculture Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Wheat className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Agriculture
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Agriculture Agent Readiness:{' '}
            <span className="text-emerald-400">Why Farm Tech Has APIs But Farmers Don&apos;t</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The $1.5 trillion US agriculture market sits on a strange paradox. AgTech platforms have APIs
            that track every seed, sensor, and soil sample. But the 2 million farms that actually grow
            the food have <strong className="text-zinc-100">zero digital presence</strong> beyond a
            Facebook page. AI agents can query commodity futures but cannot ask a single farm what they
            have available this week.
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

      {/* ===== THE PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Tractor className="h-5 w-5 text-amber-500" />
            The AgTech Paradox: Billions in Data, Zero Agent Access
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Precision agriculture generates more data per acre than most SaaS companies generate per
              customer. GPS-guided tractors log every pass. Soil sensors report moisture and nutrient
              levels hourly. Drones map crop health across thousands of acres. John Deere alone collects
              data from 200 million connected acres worldwide.
            </p>
            <p>
              But here is the problem: <strong className="text-zinc-100">none of this data is agent-accessible</strong>.
              John Deere Operations Center has a REST API, but it is locked behind a dealer network and
              requires an enterprise partnership agreement. Climate FieldView by Bayer has a data sharing
              API, but it is partner-only with a months-long approval process. The data exists. The APIs
              exist. But they are gated behind walls that no AI agent can climb.
            </p>
            <p>
              Meanwhile, the 2 million individual farms in the US — the actual producers of food — have
              no digital infrastructure at all. Their &ldquo;API&rdquo; is a phone number. Their
              &ldquo;product catalog&rdquo; is a hand-painted sign at the farmers market. When an AI
              agent tries to find locally grown organic tomatoes available for delivery next Tuesday,
              it gets nothing.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$1.5T', label: 'US agriculture market', icon: DollarSign },
              { value: '2M', label: 'individual farms', icon: Wheat },
              { value: '30-40', label: 'AgTech platform score', icon: BarChart3 },
              { value: '0-5', label: 'individual farm score', icon: MapPin },
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

      {/* ===== AGTECH SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            AgTech Platform Scores vs Individual Farms
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The gap between agricultural technology platforms and the farms they serve is the widest
            in any vertical we have scanned. Platforms score Bronze-adjacent. Farms score Dark.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform / Business</div>
              <div className="text-center">Score</div>
              <div>Notes</div>
            </div>
            {agTechScores.map((row, i) => {
              const colors = getColorClasses(row.color)
              return (
                <div
                  key={row.name}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.name}</div>
                  <div className={`text-center font-bold ${colors.text}`}>{row.score}</div>
                  <div className="text-zinc-500">{row.notes}</div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The 30-point gap:</strong> AgTech platforms score 30-40
              because they have APIs, documentation, and structured data. But those APIs are enterprise-only.
              Individual farms score 0-5 because their only digital presence is a Facebook page with no
              structured data, no API, and no way for an agent to interact programmatically. This is the
              widest platform-to-business gap we have measured in any vertical.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PLATFORM VS FARM GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-500" />
            The Platform vs Producer Gap
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Commodity exchanges and AgTech platforms have digital infrastructure. The farms that produce
            the food do not. This table shows what each level of the agriculture stack exposes to AI agents.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Capability</div>
              <div>AgTech Platform</div>
              <div>Individual Farm</div>
            </div>
            {gapRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-amber-400">{row.platform}</div>
                <div className="text-red-400">{row.farm}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY AGRICULTURE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Agriculture Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready farm exposes four core tools via MCP. These let AI agents answer the
            questions that today require a phone call, a farmers market visit, or a relationship
            with the right distributor.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyTools.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <div
                  key={tool.tool}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <tool.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">
                      <code className={`${colors.text} text-base`}>{tool.tool}()</code>
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tool.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              These four tools transform a farm from invisible to agent-accessible. A restaurant AI
              that needs 200 pounds of organic arugula for next week can query every farm within 100
              miles, compare prices and availability, and place an order — all without a single phone
              call. The farm that has these tools gets the order. The farm that does not gets skipped.
            </p>
            <p>
              Beyond direct sales, structured agricultural data unlocks new agent use cases:{' '}
              <strong className="text-zinc-100">crop rotation planning</strong> agents that source
              cover crops from local producers,{' '}
              <strong className="text-zinc-100">food safety compliance</strong> agents that
              automatically verify certifications, and{' '}
              <strong className="text-zinc-100">supply chain optimization</strong> agents that
              route orders to the nearest available producer to minimize transport costs and emissions.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY AGRICULTURE IS DIFFERENT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-500" />
            Why Agriculture Is Uniquely Hard for Agent Readiness
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Seasonality changes everything',
                detail: 'A farm\'s inventory changes weekly. What is available in June is gone in July. Static product catalogs do not work — agents need real-time crop availability that reflects harvest cycles, weather impacts, and storage capacity.',
              },
              {
                title: 'Dealer networks gate the data',
                detail: 'John Deere, AGCO, and CNH Industrial all require equipment dealers to broker API access. A farm cannot get its own data out of the platform without going through the dealer. This is like requiring a car dealership to approve your Google Maps listing.',
              },
              {
                title: 'No digital identity standard',
                detail: 'Restaurants have Google Business Profiles. Retailers have Shopify stores. Farms have no universal digital identity. USDA assigns farm numbers but does not publish structured data about what each farm produces, their certifications, or their availability.',
              },
              {
                title: 'Commodity vs producer pricing',
                detail: 'Commodity exchanges publish wheat at $5.80/bushel. But Farmer Smith sells heritage wheat at $12/bushel direct-to-bakery. Agent-ready agriculture needs producer-level pricing, not just commodity-level averages.',
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
              These challenges explain why agriculture lags behind other verticals, but they do not
              excuse the gap. The same seasonality that makes farm data dynamic is exactly why AI
              agents are more valuable here than in static industries. A restaurant sourcing agent
              that checks availability daily and switches suppliers based on what is freshest and
              closest delivers more value in agriculture than in any sector with stable inventory.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE FIRST-MOVER OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The First-Mover Opportunity
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There are 2 million farms in the US. Zero have MCP servers. Zero publish agent cards.
              Zero serve structured crop availability data in a format AI agents can consume. The
              first farm in each region to become agent-ready will capture every AI-mediated wholesale
              inquiry, every restaurant sourcing agent query, and every food distributor bot looking
              for local supply.
            </p>
            <p>
              This is not theoretical. Restaurant groups are already building AI procurement systems.
              Grocery chains are testing agent-driven local sourcing. Food delivery platforms are
              exploring farm-to-door AI logistics. All of these systems need structured farm data
              to function. Right now, they fall back to distributor catalogs because{' '}
              <strong className="text-zinc-100">no individual farm speaks agent</strong>.
            </p>
            <p>
              The parallel to{' '}
              <Link href="/blog/manufacturing-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                manufacturing
              </Link>{' '}
              is instructive. Factory floors have sensors and ERPs but zero agent-accessible interfaces.
              Agriculture has the same pattern — massive internal data, zero external discoverability.
              And just like manufacturing, the{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local business opportunity
              </Link>{' '}
              is enormous because the bar is literally zero.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The math is simple:</strong> A mid-size farm grossing
              $500K/year that captures even 5% additional revenue from agent-mediated channels adds $25K
              annually with zero customer acquisition cost. The agent did the selling. The MCP server did
              the answering. The farmer did the growing. Everyone else was automated.
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
                title: 'Manufacturing Agent Readiness: Factory Floors Are the Last Frontier',
                href: '/blog/manufacturing-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Local Business Agent Readiness: The $6.2B Opportunity',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
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
            Is your farm invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan on your agricultural business. See your score across
            all 9 dimensions and learn exactly what it takes to become the first agent-ready farm
            in your region.
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
              Connect My Farm
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
