import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  AlertTriangle,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  MapPin,
  Recycle,
  Server,
  Shield,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Waste Management and Recycling Agent Readiness: Why Trash Collection Can\'t Be Scheduled by AI | AgentHermes',
  description:
    'The $100B US waste management industry has fixed pickup schedules, no public APIs, and recycling rules that vary by zip code. Here is why AI home management agents cannot schedule your trash — and what agent-ready waste infrastructure looks like.',
  keywords: [
    'waste management recycling agent readiness',
    'waste management API',
    'recycling agent readiness',
    'trash collection AI',
    'waste management AI agent',
    'Republic Services API',
    'Waste Management API',
    'smart waste agent readiness',
    'home services AI agent',
  ],
  openGraph: {
    title: 'Waste Management and Recycling Agent Readiness: Why Trash Collection Can\'t Be Scheduled by AI',
    description:
      'The $100B US waste management industry has fixed schedules, no public APIs, and zip-code-specific recycling rules. AI home agents are blocked.',
    url: 'https://agenthermes.ai/blog/waste-recycling-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Waste Management and Recycling Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Management and Recycling Agent Readiness',
    description:
      '$100B industry, zero public APIs. AI home agents cannot schedule trash pickup, request bulk collection, or look up recycling rules by material.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/waste-recycling-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const agentReadyEndpoints = [
  {
    name: 'Pickup Schedule API',
    description: 'Returns the next pickup dates by type (trash, recycling, yard waste, compost) for a given address. Agents need this to tell homeowners when to put bins out, reschedule around holidays, and coordinate with other home services.',
    example: 'GET /schedule?address=123+Main+St → { trash: "Mon", recycling: "Wed", next_holiday_skip: "2026-05-25" }',
    icon: Calendar,
    color: 'emerald',
  },
  {
    name: 'Service Change Endpoint',
    description: 'Allows agents to request bin size upgrades, add recycling service, pause collection during vacations, or report missed pickups. Currently all of these require a phone call or navigating a multi-step web form.',
    example: 'POST /service/change { type: "pause", start: "2026-06-01", end: "2026-06-15" }',
    icon: Zap,
    color: 'blue',
  },
  {
    name: 'Recycling Rules by Material and Location',
    description: 'Structured data on what is recyclable at a specific address. Rules vary by municipality, sometimes by neighborhood. Agents need material-level granularity: "Can I recycle this pizza box?" requires knowing the local contamination policy.',
    example: 'GET /recycling/rules?zip=90210&material=cardboard → { accepted: true, condition: "must be clean and dry" }',
    icon: Recycle,
    color: 'purple',
  },
  {
    name: 'Bulk Pickup Request',
    description: 'Schedule large item collection — furniture, appliances, mattresses. Most services require a phone call, often with a 2-week lead time. An API would let home renovation agents automatically schedule bulk removal as part of a project plan.',
    example: 'POST /bulk-pickup { items: ["mattress", "sofa"], preferred_date: "2026-05-10" }',
    icon: Truck,
    color: 'cyan',
  },
  {
    name: 'Billing Management',
    description: 'View current plan, payment history, update payment method, and see upcoming charges. Agents managing household expenses need programmatic access to waste management billing — not a PDF statement mailed monthly.',
    example: 'GET /billing/summary → { plan: "Standard", monthly: 42.50, next_due: "2026-05-01" }',
    icon: DollarSign,
    color: 'amber',
  },
]

const currentStateRows = [
  { aspect: 'Schedule Lookup', current: 'Check your municipal website or app', agentReady: 'GET /schedule returns structured JSON with all pickup types and dates' },
  { aspect: 'Service Changes', current: 'Call customer service (15-min hold)', agentReady: 'POST /service/change with pause, upgrade, or add parameters' },
  { aspect: 'Recycling Rules', current: 'PDF flyer mailed once per year', agentReady: 'GET /recycling/rules?material=X returns accept/reject with conditions' },
  { aspect: 'Bulk Pickup', current: 'Call to schedule, 2-week wait', agentReady: 'POST /bulk-pickup with items and preferred date' },
  { aspect: 'Billing', current: 'Paper statement or login to portal', agentReady: 'GET /billing with plan, history, and payment management' },
  { aspect: 'Missed Pickup', current: 'Call or submit web form', agentReady: 'POST /report/missed-pickup with address and date' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why don\'t waste management companies have public APIs?',
    answer:
      'Most waste management is structured as municipal contracts, not competitive markets. Republic Services and Waste Management dominate through long-term government agreements. There is no competitive pressure to build developer-facing infrastructure because customers cannot choose providers — the municipality chooses for them. APIs exist internally for fleet management and route optimization, but none are exposed publicly for consumer or agent use.',
  },
  {
    question: 'Can AI agents access Republic Services or Waste Management apps?',
    answer:
      'Both companies have mobile apps, but these are closed systems with no public API. An agent would have to screen-scrape the app, which is fragile, against terms of service, and breaks with every app update. Until these companies expose structured APIs, agents are locked out of the $100 billion waste management economy.',
  },
  {
    question: 'Why do recycling rules vary so much by location?',
    answer:
      'Recycling infrastructure is local. What your municipality can process depends on which materials recovery facility (MRF) they contract with, what equipment it has, and what downstream buyers exist for sorted materials. A MRF in Portland might accept #5 plastics while one in Phoenix does not. This makes recycling rules inherently geographic — and structuring that data requires per-municipality input, not a national standard.',
  },
  {
    question: 'What would a waste management MCP server look like?',
    answer:
      'An MCP server for a waste hauler would expose tools like check_schedule(address), report_missed_pickup(address, date), request_bulk_pickup(items, date), and get_recycling_rules(zip, material). Resources would include service area maps, accepted materials lists, and holiday schedules. This would let any AI home management agent integrate waste services without custom code per provider.',
  },
  {
    question: 'How does waste management agent readiness affect home services overall?',
    answer:
      'Home management agents need to coordinate across services: cleaning, lawn care, pest control, and waste. If an agent can schedule a deep clean but cannot check when bulk pickup is available for the removed furniture, the workflow breaks. Waste management is a dependency for full home automation — its zero agent readiness creates a gap in every home services agent workflow.',
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

export default function WasteRecyclingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Waste Management and Recycling Agent Readiness: Why Trash Collection Can\'t Be Scheduled by AI',
    description:
      'The $100B US waste management industry has fixed pickup schedules, no public APIs, and recycling rules that vary by zip code. AI home agents are completely blocked.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/waste-recycling-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'waste management recycling agent readiness, trash collection AI, Republic Services API, Waste Management API, home services AI agent',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Waste Management Agent Readiness',
          item: 'https://agenthermes.ai/blog/waste-recycling-agent-readiness',
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
      title="Waste Management and Recycling Agent Readiness: Why Trash Collection Can't Be Scheduled by AI"
      shareUrl="https://agenthermes.ai/blog/waste-recycling-agent-readiness"
      currentHref="/blog/waste-recycling-agent-readiness"
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
            <span className="text-zinc-400">Waste Management Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Trash2 className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              $100B Industry
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Waste Management and Recycling Agent Readiness:{' '}
            <span className="text-emerald-400">Why Trash Collection Cannot Be Scheduled by AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US waste management industry generates over <strong className="text-zinc-100">$100 billion annually</strong>.
            Pickup schedules are fixed by municipality. There is no API for schedule changes. Recycling rules
            vary by zip code and are not structured. AI home management agents that can book your cleaning,
            schedule your lawn care, and order your groceries hit a wall when they reach your trash.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            A $100 Billion Industry with Zero Agent Infrastructure
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Republic Services and Waste Management — the two largest haulers in the US — collectively
              serve over 100 million households. Both have mobile apps. Neither has a public API. When an
              AI agent tries to answer a question as simple as &ldquo;What day is my recycling pickup?&rdquo;
              it has no structured data source to query. The answer lives on a municipal website as an
              unstructured PDF, a static HTML table, or behind a login portal that varies by city.
            </p>
            <p>
              This matters because waste management is not a standalone service. It is a dependency in every{' '}
              <Link href="/blog/home-services-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                home services agent workflow
              </Link>. An agent coordinating a home renovation needs to schedule bulk pickup for debris. An agent
              managing a move needs to pause service at the old address and start it at the new one. An agent
              optimizing household budgets needs to see what you are paying for waste service. All of these
              workflows are blocked by the same gap: no programmatic interface to waste management.
            </p>
            <p>
              The waste industry structure explains why. Unlike other home services where you choose a provider,
              waste collection is typically a municipal contract. Residents do not pick their hauler — the city
              does. This eliminates the competitive pressure that drives API development in other industries.
              When customers cannot leave, there is no business incentive to build better interfaces.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$100B+', label: 'US waste industry revenue', icon: DollarSign },
              { value: '0', label: 'public APIs from top haulers', icon: Server },
              { value: '20K+', label: 'municipalities with unique rules', icon: MapPin },
              { value: '100M+', label: 'households served', icon: Building2 },
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

      {/* ===== THE RECYCLING DATA PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Recycle className="h-5 w-5 text-emerald-500" />
            The Recycling Rules Problem: 20,000 Municipalities, Zero Structured Data
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Ask &ldquo;Can I recycle this?&rdquo; and the answer depends entirely on where you live. A #5
              polypropylene container is recyclable in San Francisco but goes to landfill in Houston. Pizza
              boxes are accepted in Portland if they are &ldquo;mostly clean&rdquo; but rejected in New York
              City if they have &ldquo;significant grease.&rdquo; These rules are not standardized, not
              structured, and not accessible to agents.
            </p>
            <p>
              The data exists — somewhere. Municipal websites publish recycling guidelines. Haulers include
              flyers in billing statements. Some cities have apps. But none of this is in a format an AI
              agent can query. There is no{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                GET /recycling/rules?zip=90210&amp;material=polypropylene
              </code>{' '}
              endpoint anywhere in the waste management industry.
            </p>
            <p>
              This creates a real problem for AI home assistants. When a user scans a product and asks
              &ldquo;Is this recyclable?&rdquo; the agent needs two pieces of data: the material composition
              (increasingly available via product APIs) and the local recycling rules (completely unavailable
              via any API). The first half of the pipeline exists. The second half is a PDF flyer from 2019
              stuck to someone&rsquo;s refrigerator.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The contamination cost:</strong> Recycling contamination
              from incorrect sorting costs US municipalities an estimated $300 million per year. An AI agent
              with access to structured, per-zip recycling rules could eliminate a significant portion of
              this waste by answering &ldquo;Can I recycle this?&rdquo; accurately at the point of disposal.
              The data exists. It just is not structured for machines.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            What Agent-Ready Waste Management Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An agent-ready waste management service exposes five core endpoints. Together, they let AI
              home management agents fully integrate waste services into household automation workflows.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {agentReadyEndpoints.map((endpoint) => {
              const colors = getColorClasses(endpoint.color)
              return (
                <div
                  key={endpoint.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <endpoint.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{endpoint.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{endpoint.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{endpoint.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CURRENT VS AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Current State vs Agent-Ready State
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every interaction a homeowner has with their waste management provider today requires
            a phone call, a web portal login, or reading an unstructured document. Here is what
            each interaction looks like now versus what agents need.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Interaction</div>
              <div>Today</div>
              <div>Agent-Ready</div>
            </div>
            {currentStateRows.map((row, i) => (
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

      {/* ===== GOVERNMENT DEPENDENCY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-500" />
            The Government Layer: Municipal Contracts Block Innovation
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Waste management agent readiness is uniquely blocked by{' '}
              <Link href="/blog/government-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                government infrastructure gaps
              </Link>. Unlike a restaurant that can independently decide to add an API, a waste hauler
              operates under municipal contracts that define service levels, pricing, and reporting. Even
              if Republic Services wanted to expose a public API for residential customers, the data
              boundaries are defined by each municipal contract.
            </p>
            <p>
              This creates a two-layer agent readiness problem. The hauler needs APIs for service management.
              But the municipality also needs APIs for schedule data, rule data, and permit data. A homeowner
              asking &ldquo;When is my next pickup?&rdquo; requires data from the hauler&rsquo;s route system.
              A homeowner asking &ldquo;Can I put out a couch?&rdquo; requires data from the municipality&rsquo;s
              bulk waste permit system. Both layers are dark to agents.
            </p>
            <p>
              Smart city initiatives are beginning to address this. Some municipalities now publish open data
              for transit, utilities, and 311 services. But waste collection data is rarely included. The
              irony is that route optimization and fleet management are some of the most technically
              sophisticated operations in municipal services — the data infrastructure exists internally, it
              is just not exposed externally.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-purple-400">The smart city opportunity:</strong> Municipalities that
              publish waste schedule data as open APIs will attract smart home platforms and AI assistants
              that recommend cities based on service quality. &ldquo;Move to a city where your AI assistant
              can manage your household&rdquo; sounds futuristic — but agent readiness is already becoming a
              quality-of-life differentiator for tech-forward residents.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            How Waste Management Scores on the 9 Dimensions
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Using the AgentHermes scoring framework, we evaluated the top waste management providers
              across all 9 agent readiness dimensions. The results are stark.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { dim: 'D1 Discoverability', score: 8, note: 'No agent-card.json, no llms.txt, no AGENTS.md. Websites are marketing-only.' },
              { dim: 'D2 API Quality', score: 5, note: 'Internal fleet APIs exist but zero public endpoints. No OpenAPI spec.' },
              { dim: 'D3 Onboarding', score: 12, note: 'Account creation exists through web portals, but no programmatic signup.' },
              { dim: 'D4 Pricing', score: 15, note: 'Pricing exists on websites but varies by municipality. Not structured.' },
              { dim: 'D5 Payment', score: 10, note: 'Online bill pay exists but no payment API. Auto-pay available.' },
              { dim: 'D6 Data Quality', score: 8, note: 'Schedule data exists internally. Not exposed externally in any format.' },
              { dim: 'D7 Security', score: 20, note: 'Customer portals use HTTPS and authentication. Baseline security present.' },
              { dim: 'D8 Reliability', score: 15, note: 'Fleet management systems are reliable. Customer-facing systems less so.' },
              { dim: 'D9 Agent Experience', score: 0, note: 'No MCP, no agent-card, no structured tool exposure. Fully dark.' },
            ].map((item) => (
              <div
                key={item.dim}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-bold">
                  {item.score}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-200">{item.dim}</div>
                  <div className="text-xs text-zinc-500">{item.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">~12</div>
            <div className="text-sm text-zinc-400">Estimated Agent Readiness Score (out of 100)</div>
            <div className="text-xs text-zinc-600 mt-1">ARL-0: Dark — invisible to the agent economy</div>
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
                title: 'Home Services Agent Readiness: Plumbers, Cleaners, and the Booking Gap',
                href: '/blog/home-services-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Government Agent Readiness: Why Public Services Score Below 30',
                href: '/blog/government-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
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
            Score your business in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See how your business scores across all 9 agent readiness dimensions.
            Find out exactly what is blocking AI agents from discovering and using your services.
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
