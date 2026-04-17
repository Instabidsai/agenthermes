import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Factory,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Package,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Manufacturing Agent Readiness: Why Factory Floors Are the Last Frontier for AI Agents | AgentHermes',
  description:
    'Manufacturing has massive value but zero digital agent infrastructure. ERPs are locked behind VPNs, IoT data is siloed, and supply chains still run on EDI from the 1980s. The first agent-ready factory wins procurement from every AI purchasing agent.',
  keywords: [
    'manufacturing agent readiness',
    'factory AI agents',
    'manufacturing MCP server',
    'smart factory agent',
    'supply chain AI agent',
    'ERP API agent readiness',
    'industrial IoT agents',
    'agent economy manufacturing',
    'procurement AI agent',
  ],
  openGraph: {
    title: 'Manufacturing Agent Readiness: Why Factory Floors Are the Last Frontier',
    description:
      'Manufacturing has massive value but zero digital agent infrastructure. The first agent-ready factory wins.',
    url: 'https://agenthermes.ai/blog/manufacturing-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Manufacturing Agent Readiness: Why Factory Floors Are the Last Frontier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manufacturing Agent Readiness: Why Factory Floors Are the Last Frontier',
    description:
      'ERPs locked behind VPNs. IoT data siloed. Supply chains on 1980s EDI. Manufacturing is invisible to AI agents.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/manufacturing-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const blockers = [
  {
    name: 'ERP Systems Behind VPNs',
    description: 'SAP, Oracle, and NetSuite have APIs — but they sit behind corporate VPNs and firewalls. An AI purchasing agent cannot reach them. The data exists, the endpoints exist, but the network path does not.',
    severity: 'Critical',
    icon: Lock,
    color: 'red',
  },
  {
    name: 'IoT Data Siloed in SCADA',
    description: 'Factory floor sensors generate terabytes of real-time production data. It flows into SCADA systems and industrial historians (OSIsoft PI, Honeywell PHD) that have no public API surface. Agent-accessible production status does not exist.',
    severity: 'Critical',
    icon: Network,
    color: 'red',
  },
  {
    name: 'Supply Chain Stuck on EDI',
    description: 'Electronic Data Interchange (EDI) is a 1980s standard that still handles 70% of B2B supply chain communication. It is batch-based, uses proprietary networks (AS2, SFTP), and has no concept of real-time agent queries.',
    severity: 'High',
    icon: Layers,
    color: 'amber',
  },
  {
    name: 'RFQ Process Is Manual',
    description: 'Request for Quote workflows require email, phone calls, and PDF attachments. An AI procurement agent that wants to compare prices from five manufacturers cannot submit a single automated RFQ.',
    severity: 'High',
    icon: ShoppingCart,
    color: 'amber',
  },
  {
    name: 'No Structured Product Catalogs',
    description: 'Product specs live in PDF datasheets, physical catalogs, and sales rep conversations. No machine-readable catalog exists. An agent cannot query "show me all M8 bolts in 316 stainless with a 25mm length" because the data is not structured.',
    severity: 'High',
    icon: Package,
    color: 'amber',
  },
]

const agentReadyManufacturer = [
  {
    capability: 'Structured Inventory API',
    description: 'Real-time stock levels exposed as a REST/GraphQL endpoint. An AI procurement agent queries availability before placing an order — no phone call to the warehouse.',
    impact: 'Purchasing agents select you over competitors they cannot query.',
    icon: Package,
  },
  {
    capability: 'Real-Time Production Status',
    description: 'Current production line status, capacity utilization, and estimated completion dates available via API. Supply chain agents can plan around your actual output, not guesses.',
    impact: 'Supply chain optimization agents route orders to factories with capacity.',
    icon: Factory,
  },
  {
    capability: 'Automated RFQ Submission',
    description: 'A structured endpoint that accepts part specs, quantities, and delivery requirements and returns a quote — programmatically. No email, no PDF, no 3-day wait.',
    impact: 'AI procurement agents include you in every comparison. Manual-only competitors are excluded.',
    icon: Zap,
  },
  {
    capability: 'Predictive Maintenance Alerts via Webhook',
    description: 'Equipment health data exposed as webhooks that fire when maintenance is predicted. Downstream agents can adjust schedules proactively instead of reacting to unplanned downtime.',
    impact: 'Customer agents trust your delivery commitments because they see your operational health.',
    icon: Wrench,
  },
  {
    capability: 'Quality Certificates as Structured Data',
    description: 'ISO certs, material test reports, and compliance documents served as JSON-LD instead of PDF scans. Agents can verify compliance programmatically during vendor selection.',
    impact: 'Regulatory compliance agents auto-approve you. PDF-only competitors require manual review.',
    icon: Shield,
  },
]

const scoreComparison = [
  { vertical: 'Developer Tools', avg: 62, best: 'Resend (75)', color: 'emerald' },
  { vertical: 'Fintech', avg: 48, best: 'Stripe (68)', color: 'emerald' },
  { vertical: 'E-Commerce', avg: 38, best: 'Shopify (52)', color: 'amber' },
  { vertical: 'Healthcare', avg: 33, best: 'Allscripts (44)', color: 'amber' },
  { vertical: 'Real Estate', avg: 22, best: 'Zillow (41)', color: 'red' },
  { vertical: 'Manufacturing', avg: 15, best: 'Siemens Xcelerator (34)', color: 'red' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is manufacturing so far behind on agent readiness?',
    answer:
      'Three structural reasons. First, manufacturing IT is built around on-premise ERP systems that were designed before cloud APIs existed. Second, factory floor data (SCADA, PLC, IoT) uses industrial protocols (OPC-UA, MQTT, Modbus) that have no web API equivalent. Third, supply chain communication still runs on EDI, a batch protocol from the 1980s. None of these technologies have an agent-accessible surface.',
  },
  {
    question: 'What is the ROI of making a factory agent-ready?',
    answer:
      'The immediate ROI comes from procurement. AI purchasing agents are already being deployed by large buyers (Walmart, Amazon, automotive OEMs). These agents compare suppliers programmatically. If your competitors require email and phone to get a quote, and you offer an API that returns quotes in seconds, you win every comparison. The first agent-ready manufacturer per part category captures all agent-driven procurement volume.',
  },
  {
    question: 'Can manufacturers skip straight to MCP servers?',
    answer:
      'Yes, and they should. The traditional path — build REST API, add OpenAPI spec, then add MCP — takes months. But an MCP server can sit as a thin layer in front of existing systems. A manufacturer with SAP can deploy an MCP server that calls SAP APIs internally while presenting clean tools to agents externally. The MCP server is the agent-facing interface; the backend can stay as-is.',
  },
  {
    question: 'How does AgentHermes score manufacturing businesses?',
    answer:
      'AgentHermes uses the same 9-dimension framework but adjusts weights for the manufacturing vertical. D2 API Quality and D3 Onboarding carry higher weight because the primary agent interaction is procurement — querying inventory, submitting RFQs, and placing orders. D4 Pricing carries lower weight because manufacturing pricing is inherently quote-based. The current average across manufacturing businesses we have scanned is 15/100.',
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

export default function ManufacturingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Manufacturing Agent Readiness: Why Factory Floors Are the Last Frontier for AI Agents',
    description:
      'Manufacturing has massive value but zero digital agent infrastructure. The first agent-ready factory wins procurement from every AI purchasing agent.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/manufacturing-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'manufacturing agent readiness, factory AI agents, supply chain agent, procurement AI, ERP API',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Manufacturing Agent Readiness',
          item: 'https://agenthermes.ai/blog/manufacturing-agent-readiness',
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
      title="Manufacturing Agent Readiness: Why Factory Floors Are the Last Frontier for AI Agents"
      shareUrl="https://agenthermes.ai/blog/manufacturing-agent-readiness"
      currentHref="/blog/manufacturing-agent-readiness"
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
            <span className="text-zinc-400">Manufacturing Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Factory className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Avg Score: 15/100
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Manufacturing Agent Readiness:{' '}
            <span className="text-emerald-400">Why Factory Floors Are the Last Frontier</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Manufacturing generates <strong className="text-zinc-100">$2.3 trillion</strong> in US GDP
            annually. It has ERPs, IoT sensors, and supply chain networks. But from an AI agent&rsquo;s
            perspective, the entire sector is a black box. ERPs are behind VPNs. Sensor data is in
            SCADA systems. Supply chains run on EDI from the 1980s. The average Agent Readiness Score
            for manufacturing businesses we have scanned is{' '}
            <strong className="text-red-400">15 out of 100</strong>.
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

      {/* ===== THE GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-red-500" />
            The Manufacturing Agent Readiness Gap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every other major vertical has at least a few Silver-tier businesses showing the path
              forward. Fintech has Stripe (68) and Robinhood (66). E-commerce has Shopify (52). Even
              healthcare — heavily regulated — has companies reaching Bronze. Manufacturing has
              nothing above 34.
            </p>
            <p>
              This is not because manufacturing is low-tech. Modern factories run some of the most
              sophisticated software on earth — SAP S/4HANA, Siemens Teamcenter, Rockwell FactoryTalk.
              The problem is that none of this software has an agent-accessible surface. It was all
              built for humans operating within corporate networks.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Vertical</div>
              <div>Average Score</div>
              <div>Best Performer</div>
              <div>Gap to Silver (60)</div>
            </div>
            {scoreComparison.map((row, i) => {
              const colors = getColorClasses(row.color)
              return (
                <div
                  key={row.vertical}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.vertical}</div>
                  <div className={colors.text}>{row.avg}/100</div>
                  <div className="text-zinc-400">{row.best}</div>
                  <div className="text-zinc-500">{60 - row.avg} points</div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '$2.3T', label: 'US manufacturing GDP', icon: TrendingUp },
              { value: '15', label: 'average ARS score', icon: BarChart3 },
              { value: '0', label: 'manufacturers at Silver', icon: Target },
              { value: '70%', label: 'supply chain still on EDI', icon: Truck },
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

      {/* ===== FIVE BLOCKERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            Five Structural Blockers Keeping Manufacturing Invisible
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Manufacturing is not invisible because of neglect. It is invisible because the
              technology stack predates the agent economy by decades. Here are the five structural
              blockers that explain the 15/100 average.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {blockers.map((blocker) => {
              const colors = getColorClasses(blocker.color)
              return (
                <div
                  key={blocker.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <blocker.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-zinc-100">{blocker.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} border ${colors.border} ${colors.text}`}>
                        {blocker.severity}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{blocker.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Factory Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Imagine a manufacturer that exposes five capabilities to AI agents. Not its entire ERP —
              just the surface that purchasing agents, supply chain agents, and maintenance agents
              need to interact with. Here is the target state.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {agentReadyManufacturer.map((cap) => (
              <div
                key={cap.capability}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <cap.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{cap.capability}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{cap.description}</p>
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-xs text-zinc-400">
                    <span className="text-emerald-400 font-medium">Agent impact:</span>{' '}
                    {cap.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE FIRST-MOVER ADVANTAGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The First-Mover Advantage in Manufacturing
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In every vertical we have analyzed, the first business to reach agent readiness captures
              a disproportionate share of agent-driven interactions. In manufacturing, the opportunity
              is even larger because the entire field is at zero.
            </p>
            <p>
              AI procurement agents are already being built by the largest buyers in the world. When
              Walmart&rsquo;s procurement agent needs to source a component, it will query every
              supplier it can reach programmatically. It will not email suppliers that require PDFs
              and phone calls. The{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                enterprise vs startup gap
              </Link>{' '}
              we see in other verticals will repeat in manufacturing — except the window of advantage
              is wider because nobody has started.
            </p>
            <p>
              The first manufacturer per part category to publish a structured inventory API and an
              automated RFQ endpoint will be the default supplier for every AI purchasing agent in
              that category. That is not a marginal advantage — it is a{' '}
              <strong className="text-zinc-100">category monopoly on agent-driven procurement</strong>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The build-or-be-excluded moment:</strong> When an AI
              purchasing agent evaluates 50 suppliers and 49 require email RFQs while 1 has an API,
              the agent does not email 49 suppliers. It buys from the one it can reach. The other 49
              are not evaluated — they are excluded from the process entirely.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE PATH FORWARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            The 90-Day Path to Agent-Ready Manufacturing
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not need to rebuild your ERP. You need a thin agent-facing layer that
            exposes the five capabilities above. Here is the roadmap.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                phase: 'Week 1-2',
                title: 'Publish a product catalog API',
                detail: 'Take your existing part database and expose it as a REST endpoint with search, filter by category/material/spec, and JSON responses. This alone lifts D2 API Quality from 0 to 40+.',
              },
              {
                phase: 'Week 3-4',
                title: 'Add real-time inventory levels',
                detail: 'Connect to your ERP inventory module (SAP MM, Oracle INV) and expose stock levels via API. Does not need to be real-time to the second — hourly sync is sufficient to start.',
              },
              {
                phase: 'Week 5-6',
                title: 'Build an automated RFQ endpoint',
                detail: 'Accept structured RFQ submissions via POST. Even if pricing requires manual review initially, the submission itself should be programmatic. Return a quote_id that agents can poll.',
              },
              {
                phase: 'Week 7-8',
                title: 'Deploy agent discovery files',
                detail: 'Ship agent-card.json, llms.txt, and an OpenAPI spec describing your endpoints. Register with AgentHermes. This makes your API discoverable to every agent in the ecosystem.',
              },
              {
                phase: 'Week 9-12',
                title: 'Add webhooks for order status and maintenance alerts',
                detail: 'Let agents subscribe to order status changes and predictive maintenance events. This completes the feedback loop — agents do not just buy from you, they stay connected.',
              },
            ].map((item) => (
              <div
                key={item.phase}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2">
                  {item.phase}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              At the end of 90 days, you have moved from 15/100 to an estimated 55-65 — Silver tier.
              You are the only manufacturer in your category that AI purchasing agents can interact
              with. Every{' '}
              <Link href="/blog/webhooks-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                webhook you ship
              </Link>{' '}
              deepens the integration. Every structured response builds trust with agent systems.
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
                title: 'Why Fortune 500 Companies Score Lower Than Startups',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Webhooks and Agent Readiness: Real-Time Beats Polling',
                href: '/blog/webhooks-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'The Agent Readiness Checklist: 30 Signals',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
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
            Score your manufacturing business
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see how your manufacturing business ranks
            across all 9 dimensions. Find out what AI procurement agents see — or do not see.
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
