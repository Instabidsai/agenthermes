import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Gauge,
  Globe,
  HelpCircle,
  Layers,
  Lightbulb,
  Network,
  Phone,
  Search,
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
  title: 'Energy and Utilities Agent Readiness: Why Power Companies Are Dark to AI Agents | AgentHermes',
  description:
    'Energy and utility companies average under 20 on the Agent Readiness Score. Billing portals are login-only, usage data is trapped in proprietary meters, and outage reporting is phone-first. The first utility with an MCP server wins every AI-powered energy broker.',
  keywords: [
    'energy utilities agent readiness',
    'utility company AI agents',
    'smart grid agent readiness',
    'energy API',
    'utility MCP server',
    'power company agent readiness',
    'energy rate comparison AI',
    'utility outage API',
  ],
  openGraph: {
    title: 'Energy and Utilities Agent Readiness: Why Power Companies Are Dark to AI Agents',
    description:
      'Energy utilities average under 20 on the Agent Readiness Score. Billing portals are login-only, usage data trapped in proprietary meters, outage reporting phone-first. The first utility with an MCP server wins.',
    url: 'https://agenthermes.ai/blog/energy-utilities-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Energy and Utilities Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energy and Utilities Agent Readiness: Why Power Companies Are Dark to AI Agents',
    description:
      'The $1.5T energy sector is invisible to AI agents. Billing portals are login-only, usage data trapped, outage reporting phone-first. Here is what agent-ready utilities look like.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/energy-utilities-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const utilityFailures = [
  {
    area: 'Billing Portals',
    problem: 'Customer-login-only access. No public API for rate plans or billing structures.',
    impact: 'AI agents cannot compare energy rates across providers on behalf of users.',
    icon: Shield,
    color: 'red',
  },
  {
    area: 'Usage Data',
    problem: 'Trapped in proprietary smart meters and utility-specific dashboards. Green Button standard exists but almost nobody exposes it via API.',
    impact: 'Agents cannot analyze energy consumption patterns or recommend efficiency changes.',
    icon: Gauge,
    color: 'amber',
  },
  {
    area: 'Outage Reporting',
    problem: 'Phone-first or SMS-only. Outage maps are interactive web widgets, not structured data.',
    impact: 'Agents cannot check outage status or report outages programmatically.',
    icon: Phone,
    color: 'red',
  },
  {
    area: 'Service Transfers',
    problem: 'Start/stop/transfer service requires calling a phone number and waiting on hold.',
    impact: 'AI moving assistants cannot automate utility transfers when users relocate.',
    icon: Building2,
    color: 'amber',
  },
]

const agentReadyBlueprint = [
  {
    tool: 'get_rate_plans()',
    description: 'Returns all available rate plans with pricing tiers, peak/off-peak rates, and eligibility criteria as structured JSON.',
    dimension: 'D4 Pricing (5%)',
    points: '+4-6 pts',
  },
  {
    tool: 'get_usage(meter_id)',
    description: 'Returns real-time or daily usage data from smart meters. Supports Green Button format. Enables AI energy advisors.',
    dimension: 'D2 API Quality (15%)',
    points: '+8-12 pts',
  },
  {
    tool: 'check_outage_status(location)',
    description: 'Returns current outage information for a geographic area with estimated restoration time.',
    dimension: 'D8 Reliability (13%)',
    points: '+5-8 pts',
  },
  {
    tool: 'transfer_service()',
    description: 'Initiates a service start, stop, or transfer. Accepts address, date, and account information.',
    dimension: 'D3 Onboarding (8%)',
    points: '+6-10 pts',
  },
  {
    tool: 'subscribe_outage_webhook()',
    description: 'Registers a webhook endpoint for real-time outage notifications. Agents get push updates instead of polling.',
    dimension: 'D9 Agent Experience (10%)',
    points: '+3-5 pts',
  },
]

const comparisonRows = [
  { aspect: 'Rate Plans', current: '"View plans" behind login wall', agentReady: 'get_rate_plans() returns structured pricing JSON' },
  { aspect: 'Usage Data', current: 'Proprietary meter dashboard', agentReady: 'get_usage() returns Green Button XML or JSON' },
  { aspect: 'Outages', current: 'Interactive map widget, phone hotline', agentReady: 'check_outage_status() returns structured incident data' },
  { aspect: 'Service Transfer', current: 'Call 1-800 number, wait 20 min', agentReady: 'transfer_service() completes in one API call' },
  { aspect: 'Billing', current: 'PDF statements mailed monthly', agentReady: 'get_bill() returns line-item JSON with usage breakdown' },
  { aspect: 'Solar/DER', current: 'Apply via web form, 6-week process', agentReady: 'check_solar_eligibility() returns instant qualification' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do energy companies score so low on agent readiness?',
    answer:
      'Three structural reasons. First, utility billing systems are legacy mainframe applications (often COBOL-based) that predate APIs entirely. Second, regulatory frameworks assume human-to-human interactions for service changes. Third, utilities are natural monopolies in most markets, which reduces competitive pressure to innovate on customer-facing technology. The result is that the entire customer interface is built around login portals, phone trees, and PDF bills.',
  },
  {
    question: 'What is the Green Button standard and why does it matter for agents?',
    answer:
      'Green Button is a US Department of Energy initiative that standardizes how utilities share energy usage data. It defines XML schemas for interval usage data, making consumption data machine-readable. The problem: while 60+ utilities claim Green Button compliance, most only offer manual CSV downloads behind authenticated portals. True agent readiness requires a Green Button Connect API that agents can call programmatically with OAuth credentials.',
  },
  {
    question: 'Can a deregulated energy market become agent-ready faster?',
    answer:
      'Yes. In deregulated states like Texas, Pennsylvania, and Ohio, retail energy providers compete for customers. This competition creates incentive to expose rate plans, usage data, and enrollment workflows via API. The first retail energy provider in a deregulated market to publish an MCP server with rate comparison tools will capture every AI-driven energy broker shopping on behalf of customers.',
  },
  {
    question: 'What about smart grid data — isn not that already digital?',
    answer:
      'Smart grid data is digital but not agent-accessible. Smart meters transmit usage data to utility backend systems using proprietary protocols like DLMS/COSEM or Zigbee. The data exists in databases, but there is no public API surface. It is like having a warehouse full of goods with no front door — the inventory is digitized, but customers and agents cannot reach it without going through legacy portal authentication.',
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

export default function EnergyUtilitiesAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Energy and Utilities Agent Readiness: Why Power Companies Are Dark to AI Agents',
    description:
      'Energy and utility companies average under 20 on the Agent Readiness Score. Billing portals are login-only, usage data trapped in proprietary meters, outage reporting phone-first. The first utility with an MCP server wins every AI-powered energy broker.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/energy-utilities-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'energy utilities agent readiness, utility company AI, smart grid API, energy MCP server, power company agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Energy and Utilities Agent Readiness',
          item: 'https://agenthermes.ai/blog/energy-utilities-agent-readiness',
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
      title="Energy and Utilities Agent Readiness: Why Power Companies Are Dark to AI Agents"
      shareUrl="https://agenthermes.ai/blog/energy-utilities-agent-readiness"
      currentHref="/blog/energy-utilities-agent-readiness"
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
            <span className="text-zinc-400">Energy and Utilities Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Zap className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Score Under 20
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Energy and Utilities Agent Readiness:{' '}
            <span className="text-emerald-400">Why Power Companies Are Dark to AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The <strong className="text-zinc-100">$1.5 trillion US energy sector</strong> is almost
            entirely invisible to AI agents. Billing portals require human logins. Usage data is locked
            in proprietary smart meters. Outage reporting starts with a phone call. The first utility
            that exposes structured rate plans and real-time usage via API will capture every AI-powered
            energy broker in its market.
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
            <Zap className="h-5 w-5 text-amber-500" />
            The $1.5 Trillion Sector AI Agents Cannot Reach
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Energy and utilities are among the oldest industries in America. They built their customer
              infrastructure before the internet existed, and most of it has not fundamentally changed since.
              The result is an entire sector that AI agents cannot interact with in any meaningful way.
            </p>
            <p>
              In our 500-business scan, energy and utility companies consistently scored{' '}
              <strong className="text-zinc-100">under 20 on the Agent Readiness Score</strong> — firmly in
              ARL-0 Dark territory. The pattern is universal: every customer-facing function requires either
              a human login or a phone call. There is no structured data layer that an agent can discover,
              authenticate against, or call.
            </p>
            <p>
              This matters because <strong className="text-zinc-100">AI energy brokers are coming</strong>.
              When a user asks an AI assistant to &ldquo;find me a cheaper electricity plan&rdquo; or
              &ldquo;switch my power company,&rdquo; the agent needs to compare rate plans, check usage
              history, and initiate a transfer. Today, it cannot do any of those things.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$1.5T', label: 'US energy market', icon: DollarSign },
              { value: '<20', label: 'avg readiness score', icon: BarChart3 },
              { value: '0', label: 'utilities with MCP servers', icon: Server },
              { value: '3,000+', label: 'US electric utilities', icon: Building2 },
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

      {/* ===== FOUR FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Four Ways Utilities Block AI Agents
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every utility we scanned fails agent readiness for the same four structural reasons.
            These are not bugs — they are the architecture itself.
          </p>

          <div className="space-y-4 mb-8">
            {utilityFailures.map((failure) => {
              const colors = getColorClasses(failure.color)
              return (
                <div
                  key={failure.area}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <failure.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{failure.area}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                    <strong className="text-zinc-300">Problem:</strong> {failure.problem}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    <strong className="text-zinc-400">Agent impact:</strong> {failure.impact}
                  </p>
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
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Current State vs Agent-Ready: Side by Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every utility function has an agent-ready equivalent. The gap is not capability — it is
            exposure.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Function</div>
              <div>Current (Human-Only)</div>
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

      {/* ===== THE SMART GRID PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            The Smart Grid Paradox: Digital Data, Zero Access
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Smart grid infrastructure has been the largest utility investment of the past decade.
              Over <strong className="text-zinc-100">110 million smart meters</strong> are deployed
              across the US, generating granular 15-minute interval usage data for every customer.
              This data is fully digital, sitting in utility databases right now.
            </p>
            <p>
              The paradox is that <strong className="text-zinc-100">none of it is agent-accessible</strong>.
              Smart meters communicate with utility backend systems using proprietary protocols. The
              data flows into billing systems, MDMS (Meter Data Management Systems), and analytics
              platforms — all behind corporate firewalls with no public API surface.
            </p>
            <p>
              The Green Button initiative was supposed to solve this. Launched by the US Department of
              Energy in 2012, it defines a standard XML schema for energy usage data. Over 60 utilities
              claim compliance. But most only offer Green Button <em>Download My Data</em> — a manual
              CSV export from a customer portal. The Connect version, which provides OAuth-based API
              access, is supported by fewer than 10 utilities nationwide.
            </p>
            <p>
              For AI agents, the distinction between Download and Connect is the difference between
              a locked filing cabinet and an API endpoint. The data exists. The standard exists. The
              API surface does not.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">The opportunity:</strong> A utility that exposes
              Green Button Connect as an MCP resource lets AI energy advisors analyze usage patterns,
              recommend rate plans, identify waste, and project savings — all without the customer
              logging into anything. The first utility to do this becomes the default data source for
              every AI energy assistant.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AGENT-READY UTILITY BLUEPRINT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Agent-Ready Utility: Five MCP Tools That Change Everything
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An energy utility that ships these five MCP tools goes from ARL-0 Dark to ARL-3
            Functional — and captures every AI-mediated energy decision in its service area.
          </p>

          <div className="space-y-3 mb-8">
            {agentReadyBlueprint.map((item, i) => (
              <div
                key={item.tool}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                      {item.tool}
                    </code>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-zinc-500">Maps to: <span className="text-blue-400">{item.dimension}</span></span>
                    <span className="text-emerald-400 font-medium">{item.points}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Combined, these five tools could move a utility from a score of 15 to{' '}
              <strong className="text-zinc-100">55-65 (Bronze to Silver)</strong>. Add an OpenAPI spec,
              an agent-card.json, and a status page, and the score pushes past 70. No utility in our
              scan comes close to this today.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DEREGULATED MARKETS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Deregulated Markets: Where the First Mover Wins
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In 17 US states plus DC, electricity markets are deregulated. Customers can choose their
              retail energy provider. Texas alone has 100+ retail electricity companies competing for
              customers. This is where agent readiness becomes a{' '}
              <strong className="text-zinc-100">competitive weapon</strong>.
            </p>
            <p>
              Today, energy comparison happens on websites like PowerToChoose.org (Texas) or
              PAGasSwitch.com (Pennsylvania). Customers manually enter their zip code, compare rate
              tables, and fill out enrollment forms. An AI agent trying to do this for a user hits
              a wall: no API for rate comparison, no structured enrollment endpoint, no machine-readable
              plan details.
            </p>
            <p>
              The <strong className="text-zinc-100">first retail energy provider</strong> in a
              deregulated market to publish an MCP server with{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                get_rate_plans()
              </code>{' '}
              and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                enroll_customer()
              </code>{' '}
              tools wins every AI-powered energy broker. When someone asks Claude or ChatGPT to
              &ldquo;find me a cheaper electricity plan in Houston,&rdquo; the only provider with
              an MCP server is the only one the agent can recommend <em>and</em> enroll the customer
              with directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { state: 'Texas', providers: '100+', note: 'PowerToChoose.org — no API' },
              { state: 'Pennsylvania', providers: '50+', note: 'PAGasSwitch — form-only' },
              { state: 'Ohio', providers: '40+', note: 'EnergizeOhio — PDF rate sheets' },
            ].map((market) => (
              <div
                key={market.state}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="text-lg font-bold text-zinc-100 mb-1">{market.state}</div>
                <div className="text-sm text-emerald-400 mb-2">{market.providers} providers</div>
                <div className="text-xs text-zinc-500">{market.note}</div>
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
                title: 'Government Agent Readiness: Why Public Services Are the Most Invisible',
                href: '/blog/government-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Why Fortune 500 Companies Score Lower Than Startups',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Scan',
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
            How agent-ready is your utility?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see exactly where your energy company stands
            across all 9 dimensions. 60 seconds. No signup required.
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
