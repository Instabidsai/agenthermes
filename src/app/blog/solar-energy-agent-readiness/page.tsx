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
  Lightbulb,
  MapPin,
  Server,
  Shield,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Solar and Renewable Energy Agent Readiness: Why Clean Energy Installers Cannot Be Hired by AI | AgentHermes',
  description:
    'The $50B US solar market runs on site visits, phone quotes, and PDF proposals. AI agents cannot compare solar quotes, calculate incentives, or schedule installations. Here is what agent-ready solar looks like.',
  keywords: [
    'solar renewable energy agent readiness',
    'solar agent readiness',
    'renewable energy AI agents',
    'solar installer MCP',
    'solar quote API',
    'agent readiness solar',
    'clean energy agent economy',
    'solar panel AI',
    'solar incentive calculator',
  ],
  openGraph: {
    title:
      'Solar and Renewable Energy Agent Readiness: Why Clean Energy Installers Cannot Be Hired by AI',
    description:
      '$50B US solar market. Zero structured APIs for estimates, incentives, or installation scheduling. AI home improvement agents are completely blocked.',
    url: 'https://agenthermes.ai/blog/solar-energy-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Solar and Renewable Energy Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Solar and Renewable Energy Agent Readiness: Why Clean Energy Installers Cannot Be Hired by AI',
    description:
      '$50B solar market with zero agent infrastructure. Site visits for quotes, phone calls for scheduling, PDFs for proposals. The first installer with an MCP wins.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/solar-energy-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const solarBlockers = [
  {
    blocker: 'Site assessment required',
    detail:
      'Roof angle, shade analysis, structural capacity, electrical panel compatibility. Every quote requires a physical visit or satellite imagery review that no API exposes.',
    impact: 'Agents cannot generate estimates without address-based solar potential data.',
    icon: MapPin,
    color: 'red',
  },
  {
    blocker: 'Pricing varies by kW, equipment, and labor',
    detail:
      'A 6kW system costs $15K-$25K depending on panel brand, inverter type, roof complexity, and local labor rates. No installer publishes structured pricing.',
    impact: 'Agents cannot compare quotes across installers or even generate ballpark estimates.',
    icon: DollarSign,
    color: 'amber',
  },
  {
    blocker: 'Incentive calculations are deeply complex',
    detail:
      'Federal ITC (30%), state rebates (vary by state), utility net metering policies, SRECs, property tax exemptions. Each changes yearly and varies by zip code.',
    impact: 'Agents cannot calculate true out-of-pocket cost without incentive data as a structured API.',
    icon: Layers,
    color: 'amber',
  },
  {
    blocker: 'No scheduling or monitoring APIs',
    detail:
      'Installation timelines span weeks. Permit status, HOA approvals, utility interconnection, inspection scheduling are all manual processes tracked in spreadsheets or CRMs with no external access.',
    impact: 'Agents cannot track project status, schedule installations, or provide timeline updates.',
    icon: Clock,
    color: 'red',
  },
]

const agentReadyCapabilities = [
  {
    name: 'Instant Estimate API',
    description:
      'Address-based solar potential assessment using satellite imagery and LIDAR data. Returns estimated system size (kW), annual production (kWh), roof suitability score, and estimated cost range.',
    endpoint: 'get_solar_estimate({ address, roof_type?, monthly_bill? })',
    icon: Sun,
    color: 'emerald',
  },
  {
    name: 'Incentive Calculator Endpoint',
    description:
      'Structured lookup of all applicable incentives by address. Federal ITC percentage, state rebates, utility net metering rates, SREC values, property tax exemptions. Updated quarterly.',
    endpoint: 'get_solar_incentives({ address, system_size_kw })',
    icon: DollarSign,
    color: 'emerald',
  },
  {
    name: 'Installation Scheduling',
    description:
      'Available installation windows, estimated permit timelines by jurisdiction, project milestone tracking. Agents can book site assessments and track progress.',
    endpoint: 'schedule_assessment({ address, preferred_dates[] })',
    icon: Calendar,
    color: 'blue',
  },
  {
    name: 'Monitoring Dashboard API',
    description:
      'Post-install system performance data. Daily/monthly production, savings calculations, system health alerts, warranty status. Enables AI energy management agents.',
    endpoint: 'get_system_performance({ system_id, period })',
    icon: BarChart3,
    color: 'purple',
  },
]

const comparisonRows = [
  {
    aspect: 'Get a quote',
    current: 'Fill form, wait 48 hours, schedule site visit, wait for proposal PDF',
    agentReady: 'get_solar_estimate({ address }) returns cost range in 2 seconds',
  },
  {
    aspect: 'Compare installers',
    current: 'Call 3-5 companies, schedule 3-5 site visits, compare 3-5 PDFs manually',
    agentReady: 'Agent calls 5 installer APIs in parallel, returns comparison table',
  },
  {
    aspect: 'Calculate incentives',
    current: 'Research federal, state, and utility programs. Hope the salesperson knows them all',
    agentReady: 'get_solar_incentives() returns all applicable incentives by address',
  },
  {
    aspect: 'Schedule installation',
    current: 'Phone tag with project coordinator over 2-3 weeks',
    agentReady: 'schedule_assessment() books the next available slot instantly',
  },
  {
    aspect: 'Monitor system',
    current: 'Log into proprietary app, check individual inverter dashboards',
    agentReady: 'AI energy agent aggregates production, savings, and alerts across all systems',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is solar particularly hard for AI agents?',
    answer:
      'Solar requires site-specific data that does not exist in structured form. Roof angle, shade from trees, electrical panel capacity, local permit requirements, and utility interconnection policies all vary by address. Unlike ordering a product with a fixed price, every solar quote is a custom engineering proposal. Until installers expose estimate APIs backed by satellite data, agents cannot participate in the sales process.',
  },
  {
    question: 'Does any solar company have an API today?',
    answer:
      'Google Project Sunroof provides satellite-based solar potential data but is not a commercial API. Enphase and SolarEdge have monitoring APIs for installed systems but not for sales or quoting. No residential solar installer offers a public API for estimates, incentive calculations, or installation scheduling. The first to do so captures the entire agent-driven lead funnel.',
  },
  {
    question: 'How would an agent-ready solar installer score?',
    answer:
      'A solar installer with an estimate API, incentive calculator, scheduling endpoint, and monitoring dashboard would likely score 55-65 (Silver tier). Adding agent-card.json, llms.txt, and an MCP server with tools like get_solar_estimate and schedule_assessment would push them to 70+ and differentiate them from every competitor in the market.',
  },
  {
    question: 'What about commercial solar and utility-scale renewables?',
    answer:
      'Commercial and utility-scale projects are even more complex with multi-year timelines, environmental impact assessments, grid interconnection studies, and power purchase agreements. However, the B2B nature of these deals means API-first interactions are more natural. Companies like Aurora Solar provide design tools with APIs, but the quoting and contracting workflows remain manual.',
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

export default function SolarEnergyAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Solar and Renewable Energy Agent Readiness: Why Clean Energy Installers Cannot Be Hired by AI',
    description:
      'The $50B US solar market has zero structured APIs for estimates, incentives, or installation scheduling. AI home improvement agents are completely blocked from comparing solar quotes.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/solar-energy-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'solar renewable energy agent readiness, solar installer MCP, solar quote API, clean energy AI agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Solar Energy Agent Readiness',
          item: 'https://agenthermes.ai/blog/solar-energy-agent-readiness',
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
      title="Solar and Renewable Energy Agent Readiness: Why Clean Energy Installers Cannot Be Hired by AI"
      shareUrl="https://agenthermes.ai/blog/solar-energy-agent-readiness"
      currentHref="/blog/solar-energy-agent-readiness"
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
              <span className="text-zinc-400">Solar Energy Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Sun className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                $50B Market
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Solar and Renewable Energy Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Clean Energy Installers Cannot Be Hired by AI
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              The US residential solar market is worth{' '}
              <strong className="text-zinc-100">$50 billion</strong>. Every installation starts with
              a site assessment, a custom proposal, and a phone call. AI agents that manage home
              improvements, compare energy costs, and schedule contractor work cannot interact with a
              single solar installer. The entire industry scores under 15 on the Agent Readiness
              Score.
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
              <Shield className="h-5 w-5 text-red-500" />
              Why Solar Is Uniquely Blocked from the Agent Economy
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Most industries have a straightforward path to agent readiness: publish your pricing,
                expose your availability, and let agents transact. Solar breaks this model because
                every quote is a custom engineering assessment. The price depends on your specific
                roof, your specific utility, and your specific municipality. There is no universal
                price list to publish.
              </p>
              <p>
                This complexity is why the solar sales process has barely changed in a decade. A
                homeowner fills out a form on{' '}
                <strong className="text-zinc-100">EnergySage</strong> or a local installer&apos;s
                website, waits 24-72 hours for a call, schedules a site visit, and eventually
                receives a PDF proposal. Compare this to ordering a product on Amazon, where an agent
                can check price, availability, and delivery time in milliseconds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {solarBlockers.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.blocker}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-100">{item.blocker}</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-2">{item.detail}</p>
                    <p className="text-xs text-red-400">{item.impact}</p>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '$50B', label: 'US solar market', icon: DollarSign },
                { value: '0', label: 'installers with APIs', icon: Server },
                { value: '<15', label: 'avg agent readiness', icon: BarChart3 },
                { value: '30%', label: 'federal ITC credit', icon: Zap },
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

        {/* ===== THE AGENT SCENARIO ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              The Agent Scenario: Comparing Solar Quotes in 2026
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                A homeowner tells their AI assistant: &ldquo;I want to go solar. Get me quotes from
                three installers, calculate my incentives, and tell me my payback period.&rdquo;
              </p>
              <p>
                Today, that agent hits a wall immediately. There is no API to call for an estimate.
                No structured data source for incentives by zip code. No scheduling endpoint for site
                assessments. The agent can search the web, find installer websites, and present a list
                of phone numbers. That is it.
              </p>
              <p>
                Now imagine one installer in the market has an MCP server. The agent calls{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  get_solar_estimate()
                </code>{' '}
                with the homeowner&apos;s address and gets back a system size, estimated annual
                production, cost range, and applicable incentives in two seconds. That installer does
                not just get the lead — they get{' '}
                <strong className="text-zinc-100">every agent-driven lead in their market</strong>{' '}
                because they are the only one the agent can interact with.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">First-mover advantage is extreme in solar:</strong>{' '}
                Unlike restaurants where an agent picks from dozens of options, solar installation is
                a high-consideration, low-frequency purchase. A homeowner goes solar once. The agent
                that can provide an instant estimate, explain incentives, and schedule the assessment
                wins the entire $15K-$30K deal. The second installer to get an MCP server captures the
                remaining traffic. The third gets scraps. By the fifth, the market is divided.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT AGENT-READY SOLAR LOOKS LIKE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What Agent-Ready Solar Looks Like
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              An agent-ready solar installer exposes four capabilities that transform the buying
              experience from weeks of phone calls to minutes of structured interaction.
            </p>

            <div className="space-y-4 mb-8">
              {agentReadyCapabilities.map((cap) => {
                const colors = getColorClasses(cap.color)
                return (
                  <div
                    key={cap.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <cap.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{cap.name}</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">{cap.description}</p>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">Endpoint:</span>{' '}
                        <code className={`${colors.text} text-xs`}>{cap.endpoint}</code>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== CURRENT VS AGENT-READY COMPARISON ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Current Process vs Agent-Ready Solar
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Every step of the solar buying journey that takes days today could happen in seconds
              with the right API infrastructure.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Task</div>
                <div>Current Process</div>
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

        {/* ===== THE INCENTIVE COMPLEXITY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              The Incentive Problem: Why Solar Pricing Is Uniquely Complex
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                No other home improvement category has the incentive complexity of solar. A single
                installation can involve five or more overlapping programs, each with different
                eligibility criteria, application processes, and expiration dates.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  name: 'Federal Investment Tax Credit (ITC)',
                  detail: '30% of total system cost as a tax credit. Applies to all residential solar installed before 2033. Steps down to 26% in 2033, 22% in 2034.',
                  value: '$5,400-$9,000 on typical system',
                },
                {
                  name: 'State rebates',
                  detail: 'Vary by state from $0 to $5,000+. New York offers up to $5,000 through NY-Sun. California ended its rebate program. Texas has no state incentive.',
                  value: '$0-$5,000+ depending on state',
                },
                {
                  name: 'Net metering',
                  detail: 'Utility credits for excess energy sent to the grid. Full retail rate in some states, wholesale rate in others. California NEM 3.0 cut credits by 75%. Policies change yearly.',
                  value: 'Determines long-term ROI',
                },
                {
                  name: 'SRECs (Solar Renewable Energy Credits)',
                  detail: 'Tradeable credits earned for solar production. Worth $5-$400 per MWh depending on state market. Only available in states with renewable portfolio standards.',
                  value: '$200-$2,000/year in active markets',
                },
                {
                  name: 'Property tax exemptions',
                  detail: 'Many states exempt solar from property tax assessments. A $20K system that adds $20K in home value would otherwise increase property taxes by $200-$600/year.',
                  value: 'Varies by municipality',
                },
              ].map((incentive) => (
                <div
                  key={incentive.name}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">{incentive.name}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-1">{incentive.detail}</p>
                    <p className="text-xs text-emerald-400">{incentive.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                An agent that could query a structured incentive API by address would provide more
                accurate savings estimates than most solar salespeople. The data exists — DSIRE
                (Database of State Incentives for Renewables and Efficiency) tracks all programs — but
                it is not available as a structured API that agents can call. The installer who wraps
                this data into an{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  get_solar_incentives()
                </code>{' '}
                MCP tool instantly becomes the most trusted source in the agent economy.
              </p>
            </div>
          </div>
        </section>

        {/* ===== ADJACENT VERTICALS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              The Renewable Energy Ripple Effect
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Solar does not exist in isolation. The same homeowner considering solar is also
                evaluating{' '}
                <Link
                  href="/blog/energy-utilities-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  utility rate plans
                </Link>
                , battery storage, EV chargers, heat pumps, and smart home energy management. An AI
                energy agent that can coordinate across all of these creates massive value — but only
                if each service has structured APIs.
              </p>
              <p>
                The{' '}
                <Link
                  href="/blog/construction-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  construction industry
                </Link>{' '}
                faces similar challenges with site-specific assessments and custom pricing. But solar
                has a unique advantage: satellite data and historical weather patterns make remote
                estimation feasible in a way that estimating a kitchen remodel is not. The technology
                to power an instant estimate API exists today. The infrastructure gap is purely a
                business decision.
              </p>
              <p>
                AI home improvement agents are coming. They will manage everything from{' '}
                <strong className="text-zinc-100">comparing solar quotes</strong> to scheduling
                HVAC maintenance to coordinating roofing repairs. Every contractor who exposes
                structured APIs feeds into this ecosystem. Solar installers who move first become the
                anchor tenant in their homeowner&apos;s AI-managed home.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-blue-400">The bundling opportunity:</strong> A solar
                installer with an MCP server that also offers battery storage quotes, EV charger
                installation, and energy monitoring becomes a one-stop shop for AI energy agents.
                Instead of the agent calling four different companies, it calls one. That installer
                captures the entire energy upgrade project, not just the panels.
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
                  title: 'Energy and Utilities Agent Readiness',
                  href: '/blog/energy-utilities-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title: 'Construction Agent Readiness: A $2T Industry Scoring Under 20',
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
              Is your solar business invisible to AI agents?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Get your free Agent Readiness Score in 60 seconds. See how your business compares
              across all 9 dimensions and learn exactly what to fix.
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
