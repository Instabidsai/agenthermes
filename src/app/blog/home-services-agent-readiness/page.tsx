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
  Flame,
  Globe,
  HelpCircle,
  Layers,
  MapPin,
  Network,
  Phone,
  Plug,
  Server,
  Shield,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Home Services Agent Readiness: Why Plumbers, Electricians, and HVAC Companies Score Zero | AgentHermes',
  description:
    'The $600B home services market is invisible to AI agents. Plumbers, electricians, and HVAC companies rely entirely on phone calls. Average agent readiness score: 4/100. The first plumber with an MCP server gets dispatched by every AI home assistant.',
  keywords: [
    'home services plumber electrician agent readiness',
    'plumber AI agent',
    'electrician agent readiness score',
    'HVAC MCP server',
    'home services AI',
    'plumber agent readiness',
    'handyman AI agent discovery',
    'home services API',
    'agent economy home services',
  ],
  openGraph: {
    title: 'Home Services Agent Readiness: Why Plumbers, Electricians, and HVAC Companies Score Zero',
    description:
      'The $600B home services market averages 4/100 on agent readiness. Plumbers, electricians, HVAC, and handymen are entirely phone-based and invisible to AI agents.',
    url: 'https://agenthermes.ai/blog/home-services-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Home Services Agent Readiness: Why Plumbers, Electricians, and HVAC Companies Score Zero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Services Agent Readiness: Why Plumbers, Electricians, and HVAC Companies Score Zero',
    description:
      '$600B market, zero MCP servers. The first plumber with an MCP server wins every AI-dispatched service call.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/home-services-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const subsectors = [
  {
    name: 'Plumbing',
    marketSize: '$130B',
    avgScore: 3,
    businesses: '120K+',
    bottleneck: 'Every job starts with a phone call. No published pricing because jobs vary wildly. Dispatch is manual.',
    icon: Wrench,
    color: 'blue',
  },
  {
    name: 'Electrical',
    marketSize: '$200B',
    avgScore: 4,
    businesses: '90K+',
    bottleneck: 'Licensed requirements vary by state. Emergency vs scheduled distinction not structured. Inspections require county coordination.',
    icon: Zap,
    color: 'amber',
  },
  {
    name: 'HVAC',
    marketSize: '$170B',
    avgScore: 5,
    businesses: '105K+',
    bottleneck: 'Equipment-specific: brand, model, tonnage. Maintenance plans exist but are PDF-based. Emergency service 24/7 but no API to check capacity.',
    icon: Flame,
    color: 'red',
  },
  {
    name: 'Handyman / General',
    marketSize: '$100B+',
    avgScore: 2,
    businesses: '200K+',
    bottleneck: 'Broadest scope, least structure. Services range from hanging shelves to deck builds. Pricing is pure guesswork without a site visit.',
    icon: Wrench,
    color: 'emerald',
  },
]

const platformComparison = [
  { platform: 'Angi (HomeAdvisor)', role: 'Lead gen marketplace', score: '~38', agentAccess: 'API exists but gated to partners. Homeowners cannot bypass the platform.' },
  { platform: 'Thumbtack', role: 'Bid marketplace', score: '~35', agentAccess: 'Pro API for providers only. No consumer-facing booking API.' },
  { platform: 'Yelp', role: 'Reviews + request-a-quote', score: '~32', agentAccess: 'Fusion API for business data. No booking or quoting endpoint.' },
  { platform: 'Google Local Services', role: 'Pay-per-lead ads', score: '~30', agentAccess: 'No public API. Google controls the funnel entirely.' },
]

const agentReadyRequirements = [
  {
    name: 'Service Catalog with Base Pricing',
    description: 'Structured JSON listing every service with base price, unit, and common add-ons. "Faucet replacement: $150-$300 + parts" is better than "call for quote."',
    icon: DollarSign,
    color: 'emerald',
  },
  {
    name: 'Availability Windows API',
    description: 'Real-time endpoint returning open time slots by day. Emergency availability flagged separately. Agents need to know you can come Tuesday at 2pm, not "sometime this week."',
    icon: Calendar,
    color: 'blue',
  },
  {
    name: 'Automated Quote Request',
    description: 'Structured intake: job type, property type, photos (optional), urgency level. Returns an estimate range within seconds instead of requiring a callback.',
    icon: Target,
    color: 'amber',
  },
  {
    name: 'Job Scheduling Endpoint',
    description: 'Book confirmed appointments directly. Confirmation, calendar sync, pre-visit instructions, cancellation policy all in the response.',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    name: 'Service Area Definition',
    description: 'GeoJSON or zip code list defining where you work. Agents asking "find a plumber near me" need to match location before presenting options.',
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
    question: 'Why do home services companies score so low on agent readiness?',
    answer:
      'Home services are inherently variable — every job is different. A leaky faucet and a sewer line replacement require completely different pricing, tools, and timelines. This variability has kept the industry phone-based because humans can ask clarifying questions. But AI agents can do the same thing through structured intake forms and branching logic. The technology is not the blocker — the infrastructure is.',
  },
  {
    question: 'Can a plumber really publish pricing online?',
    answer:
      'Yes, with ranges. "Faucet replacement: $150-$300 + parts" is not a binding quote — it is a structured estimate that gives AI agents enough information to compare options for users. Many plumbers already have these ranges in their heads. Putting them in a machine-readable format does not commit to a fixed price — it gives agents a starting point.',
  },
  {
    question: 'What about emergency vs scheduled service?',
    answer:
      'An agent-ready home services company exposes both as separate availability channels. Emergency: returns current on-call tech and estimated response time. Scheduled: returns open appointment slots over the next 14 days. The distinction is a data field, not a business model change.',
  },
  {
    question: 'How does Angi/HomeAdvisor affect agent readiness?',
    answer:
      'Angi owns the lead flow for most home services companies. Their API exists but is partner-gated — individual contractors cannot bypass it. This is the same disintermediation problem as restaurants with DoorDash. The first plumber with their own MCP server bypasses the 15-30% lead fee entirely. AI agents will prefer direct booking over marketplace middlemen.',
  },
  {
    question: 'What would an MCP server for a plumber look like?',
    answer:
      'Five tools: get_services() returns the service catalog with pricing ranges. check_availability() returns open slots. request_quote() accepts job details and returns an estimate. book_appointment() confirms a time slot. get_service_area() returns covered zip codes. That is the entire agent interface — no app to download, no portal to log into.',
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

export default function HomeServicesAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Home Services Agent Readiness: Why Plumbers, Electricians, and HVAC Companies Score Zero',
    description:
      'The $600B home services market is invisible to AI agents. Plumbers, electricians, and HVAC companies are phone-only. The first one with an MCP server wins every AI-dispatched service call.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/home-services-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'home services plumber electrician agent readiness, HVAC MCP server, plumber AI agent, home services API',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Home Services Agent Readiness',
          item: 'https://agenthermes.ai/blog/home-services-agent-readiness',
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
      title="Home Services Agent Readiness: Why Plumbers, Electricians, and HVAC Companies Score Zero"
      shareUrl="https://agenthermes.ai/blog/home-services-agent-readiness"
      currentHref="/blog/home-services-agent-readiness"
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
            <span className="text-zinc-400">Home Services Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Wrench className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Score: 4/100
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Home Services Agent Readiness:{' '}
            <span className="text-emerald-400">Why Plumbers, Electricians, and HVAC Companies Score Zero</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The $600 billion home services market runs on phone calls, handshake estimates, and
            word-of-mouth referrals. When someone asks an AI assistant to{' '}
            <strong className="text-zinc-100">&ldquo;find me a plumber who can come tomorrow,&rdquo;</strong>{' '}
            the agent has nothing to connect to. Over 500,000 home services businesses in the US average
            an Agent Readiness Score of <strong className="text-zinc-100">4 out of 100</strong>. The first
            plumber with an MCP server gets dispatched by every AI home assistant.
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

      {/* ===== THE $600B PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            The $600 Billion Phone Call Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Home services is one of the largest consumer spending categories in the US economy. Plumbing,
              electrical, HVAC, and general handyman work generate over $600 billion in annual revenue across
              more than 500,000 businesses. Every single one of those businesses acquires customers the same
              way: phone calls, referrals, and marketplace listings on Angi or Thumbtack.
            </p>
            <p>
              There is no API for any of it. When someone needs an emergency plumber at 11pm, they Google,
              call three numbers, and hope someone answers. When an AI agent tries to help, it hits a wall.
              No structured service catalogs. No availability endpoints. No pricing data. No booking API. The
              agent can only say <em>&ldquo;here are some phone numbers to call.&rdquo;</em>
            </p>
            <p>
              This is not a minor gap — it is a{' '}
              <strong className="text-zinc-100">structural absence of digital infrastructure</strong> in one
              of the largest service industries on the planet. And it means the entire home services vertical
              is invisible to the fastest-growing customer acquisition channel: AI agents.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$600B', label: 'annual market size', icon: DollarSign },
              { value: '500K+', label: 'US businesses', icon: Wrench },
              { value: '4/100', label: 'avg agent readiness', icon: BarChart3 },
              { value: '0', label: 'MCP servers', icon: Server },
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

      {/* ===== SUBSECTOR BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Subsector Breakdown: Plumbing, Electrical, HVAC, and Handyman
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Each home services subsector has unique characteristics, but they share the same
            fundamental problem: zero structured data for AI agents to consume.
          </p>

          <div className="space-y-4 mb-8">
            {subsectors.map((sector) => {
              const colors = getColorClasses(sector.color)
              return (
                <div
                  key={sector.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <sector.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100">{sector.name}</h3>
                        <p className="text-xs text-zinc-500">{sector.businesses} businesses | {sector.marketSize} market</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400">{sector.avgScore}/100</div>
                      <div className="text-xs text-zinc-500">avg score</div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{sector.bottleneck}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE PLATFORM LOCK-IN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-amber-500" />
            The Platform Lock-In: Angi, Thumbtack, and Why They Own Your Leads
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Home services companies do not own their customer acquisition. Angi (formerly HomeAdvisor),
              Thumbtack, and Google Local Services Ads control the funnel. These platforms charge $15-$80 per
              lead, and the contractor has no direct relationship with the customer until after they pay.
            </p>
            <p>
              The irony: these platforms have APIs, but they are gated to partners. Individual plumbers and
              electricians cannot access them. The platforms are more agent-ready than the businesses they
              serve — and they use that advantage to keep contractors dependent.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div>Role</div>
              <div>Score</div>
              <div>Agent Access</div>
            </div>
            {platformComparison.map((row, i) => (
              <div
                key={row.platform}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.platform}</div>
                <div className="text-zinc-500">{row.role}</div>
                <div className="text-amber-400">{row.score}</div>
                <div className="text-zinc-500">{row.agentAccess}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The disintermediation play:</strong> The first plumber with
              their own MCP server bypasses the $15-$80 per-lead fee entirely. When an AI home assistant can
              call{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
                check_availability()
              </code>{' '}
              and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
                book_appointment()
              </code>{' '}
              directly, why would it route through a marketplace that adds cost and friction?
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Home Services Business Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five capabilities transform a phone-only home services business into one that AI agents can
            discover, evaluate, and book directly.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyRequirements.map((req) => {
              const colors = getColorClasses(req.color)
              return (
                <div
                  key={req.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <req.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{req.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{req.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              None of this requires building a custom app. A plumber does not need to become a software
              company. They need a platform that converts their existing business information into
              structured, agent-accessible endpoints. That is exactly what{' '}
              <Link href="/connect" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes
              </Link>{' '}
              does — auto-generating MCP servers with industry-specific tools for home services businesses.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE EMERGENCY SERVICES GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Timer className="h-5 w-5 text-red-500" />
            The Emergency Services Gap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Emergency plumbing, electrical, and HVAC calls are the highest-margin work in home services.
              A burst pipe at midnight commands a $200-$500 premium. But emergency dispatch is entirely
              phone-based. The homeowner calls three companies, gets voicemail for two, and goes with
              whoever answers.
            </p>
            <p>
              An agent-ready emergency plumber would expose a single endpoint:{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                check_emergency_availability()
              </code>{' '}
              returning current on-call status, estimated response time, and emergency pricing. The AI home
              assistant handles the rest — booking the first available provider instantly, no phone tag required.
            </p>
            <p>
              The company that captures emergency dispatch through AI agents captures the most profitable
              segment of home services. Every smart home system, every AI assistant, every voice-activated
              device becomes a dispatch channel — but only if there is an API to call.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Today: Emergency Phone Tag',
                detail: 'Homeowner calls 3 companies at midnight. Gets voicemail for 2. Takes the one who answers. 30 minutes wasted. Premium pricing with zero comparison.',
                color: 'red',
              },
              {
                title: 'Agent-Ready: Instant Dispatch',
                detail: 'AI assistant queries 5 emergency plumbers via MCP. Gets response times, pricing, and reviews. Books the best option in 3 seconds. Homeowner notified with ETA.',
                color: 'emerald',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className={`p-5 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                >
                  <h3 className={`font-bold ${colors.text} mb-2 text-sm`}>{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FIRST-MOVER ADVANTAGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            First Plumber with MCP Wins Every AI Home Assistant
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The home services market has near-zero agent readiness. That means the first company in any
              local market to become agent-ready captures 100% of AI-dispatched service calls in their area.
              There is no competition because no one else has an API.
            </p>
            <p>
              Consider the trajectory: Amazon Echo, Google Home, and Apple HomePod are in over 100 million
              US homes. Every one of these devices will gain agent capabilities that can book services
              directly. Smart home systems from ADT, Vivint, and Ring are adding AI features that detect
              problems (water leak, electrical fault, HVAC failure) and need to dispatch help automatically.
            </p>
            <p>
              The plumber with an MCP server is the one those systems call. Not the one with the best Yelp
              reviews. Not the one with the biggest Angi budget. The one whose{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                check_availability()
              </code>{' '}
              endpoint responds in 200ms with open time slots. That is the new competitive advantage in
              home services.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Related reading:</strong>{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Local Business Agent Readiness
              </Link>{' '}
              covers the broader pattern of local services scoring near zero.{' '}
              <Link href="/blog/construction-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Construction Agent Readiness
              </Link>{' '}
              examines the adjacent $2T construction vertical with the same structural gaps.
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
                title: 'Construction Agent Readiness: Why Contractors Score Zero',
                href: '/blog/construction-agent-readiness',
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
            Score your home services business in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See exactly where you stand on agent readiness. Free scan, instant results,
            specific recommendations for plumbers, electricians, and HVAC companies.
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
              Get My MCP Server
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
