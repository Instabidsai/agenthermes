import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  MapPin,
  Network,
  Package,
  Server,
  Shield,
  Sparkles,
  Target,
  Timer,
  Truck,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Logistics Agent Readiness: Why Shipping and Delivery Companies Score Below 30 | AgentHermes',
  description:
    'Logistics companies have tracking APIs but they are rate-limited, XML-first, and require complex auth. Most 3PLs have no public API at all. Learn what agent-ready logistics looks like and who wins the AI-powered e-commerce integration.',
  keywords: [
    'logistics shipping agent readiness',
    'logistics AI agents',
    'shipping API agent readiness',
    'FedEx API agent ready',
    'UPS API AI agents',
    'delivery tracking AI',
    'logistics MCP server',
    'agent-ready logistics',
  ],
  openGraph: {
    title: 'Logistics Agent Readiness: Why Shipping and Delivery Companies Score Below 30',
    description:
      'Tracking APIs exist but are rate-limited, XML-first, and require complex auth. Most 3PLs have no public API. The first logistics company with an MCP server wins every AI-powered integration.',
    url: 'https://agenthermes.ai/blog/logistics-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Logistics Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logistics Agent Readiness: Why Shipping and Delivery Companies Score Below 30',
    description:
      'FedEx, UPS, and USPS have APIs. But rate limits, XML, and complex auth make them hostile to AI agents. Here is the gap.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/logistics-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const carrierScores = [
  {
    name: 'FedEx',
    score: 34,
    tier: 'Not Scored',
    strengths: 'REST API exists, tracking endpoint, rate/quote endpoint, OAuth 2.0 client credentials',
    weaknesses: 'Rate limited to 500/day on free tier, complex registration requiring business verification, SOAP for some endpoints, no agent-card.json or llms.txt',
  },
  {
    name: 'UPS',
    score: 29,
    tier: 'Not Scored',
    strengths: 'Tracking API with JSON, rate/time-in-transit API, OAuth available',
    weaknesses: 'Aggressive rate limits (100/min), requires UPS account number for most endpoints, mixed XML/JSON responses, no MCP server, onboarding requires manual approval',
  },
  {
    name: 'USPS',
    score: 18,
    tier: 'Not Scored',
    strengths: 'Tracking API exists, free tier available',
    weaknesses: 'Primary API is XML-first (Web Tools API), new REST API in beta, requires USPS business account registration, no OpenAPI spec, no structured error responses',
  },
  {
    name: 'ShipStation',
    score: 42,
    tier: 'Bronze',
    strengths: 'Full REST API, JSON responses, API key auth (simple), webhook for shipment events, rate endpoints',
    weaknesses: 'No agent discovery files, no MCP server, 40 requests/min limit, no OpenAPI spec published, documentation is good but not machine-readable',
  },
  {
    name: 'ShipBob',
    score: 22,
    tier: 'Not Scored',
    strengths: 'REST API for orders and inventory, PAT authentication',
    weaknesses: 'API access requires partnership agreement, no public docs, no rate/quote endpoint, no tracking webhook, invisible to agents',
  },
  {
    name: 'EasyPost',
    score: 48,
    tier: 'Bronze',
    strengths: 'Clean REST API, JSON everywhere, API key auth, tracking webhooks, multi-carrier rate shopping, good docs',
    weaknesses: 'No MCP server, no agent-card.json, no llms.txt, pricing not public (usage-based), no OpenAPI spec at root',
  },
]

const dimensionBreakdown = [
  { dimension: 'D1 Discoverability', score: '6/100', detail: 'No carrier publishes agent-card.json, llms.txt, or AGENTS.md. DNS and SSL are fine. Zero agent-native discovery.', color: 'red' },
  { dimension: 'D2 API Quality', score: '38/100', detail: 'APIs exist but are mixed XML/JSON. FedEx and UPS have partial OpenAPI specs. Most 3PLs have none. SOAP endpoints pull the average down hard.', color: 'amber' },
  { dimension: 'D3 Onboarding', score: '15/100', detail: 'Every carrier requires manual business registration. FedEx needs a developer portal account plus production key request. UPS requires a UPS account number. No self-service API key provisioning.', color: 'red' },
  { dimension: 'D4 Pricing', score: '12/100', detail: 'Rate shopping APIs exist (FedEx, EasyPost) but require auth to call. No public pricing pages with structured data. Enterprise plans are quote-only.', color: 'red' },
  { dimension: 'D5 Payment', score: '8/100', detail: 'Billing is account-based. No payment API. No x402. Agents cannot set up billing programmatically.', color: 'red' },
  { dimension: 'D6 Data Quality', score: '32/100', detail: 'Tracking responses are structured but carrier-specific. No standard envelope. Error responses vary from XML faults to HTML pages.', color: 'amber' },
  { dimension: 'D7 Security', score: '40/100', detail: 'OAuth 2.0 available at FedEx and UPS. But registration is manual and scopes are limited. EasyPost and ShipStation use simple API keys — good for agents.', color: 'amber' },
  { dimension: 'D8 Reliability', score: '45/100', detail: 'Carriers have status pages. Uptime is generally good. But rate limits are aggressive and undocumented in headers.', color: 'amber' },
  { dimension: 'D9 Agent Experience', score: '10/100', detail: 'No request IDs, no cursor pagination, no rate-limit headers, no structured error codes. Agents cannot self-correct.', color: 'red' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do logistics companies score so low when they have APIs?',
    answer:
      'Having an API is not the same as being agent-ready. Logistics APIs were built for enterprise integration partners who sign contracts and go through onboarding. They were not built for autonomous AI agents that need self-service registration, machine-readable discovery, and structured error handling. The APIs exist but the agent infrastructure around them does not.',
  },
  {
    question: 'Which logistics company is closest to being agent-ready?',
    answer:
      'EasyPost scores highest at 48 (Bronze) because it was built API-first with developers in mind. Clean REST endpoints, JSON everywhere, API key auth, and good documentation. It needs agent discovery files (agent-card.json, llms.txt) and an MCP server to break into Silver, but the foundation is solid.',
  },
  {
    question: 'Why does XML hurt agent readiness?',
    answer:
      'AI agents process JSON natively. LLMs can read, write, and reason about JSON structures without any adapter layer. XML requires parsing, namespace handling, and SOAP envelope unwrapping — all of which are fragile steps where agents fail. Every XML-first endpoint in our scans scored 40-60% lower on D2 API Quality than its JSON equivalent.',
  },
  {
    question: 'What would an agent-ready logistics company look like?',
    answer:
      'It would have: (1) a JSON REST API with OpenAPI spec for tracking, rating, and label generation, (2) self-service API key provisioning, (3) webhooks for delivery status changes, (4) agent-card.json and llms.txt at the domain root, (5) an MCP server with tools like track_shipment, get_rates, create_label, and get_delivery_estimate. The first company to ship all five captures every AI-powered e-commerce integration.',
  },
]

function getScoreColor(score: number) {
  if (score >= 60) return 'text-emerald-400'
  if (score >= 40) return 'text-amber-400'
  return 'text-red-400'
}

function getDimColor(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  }
  return map[color] || map.red
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LogisticsAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Logistics Agent Readiness: Why Shipping and Delivery Companies Score Below 30',
    description:
      'Logistics companies have tracking APIs but they are rate-limited, XML-first, and require complex auth. Most 3PLs have no public API at all. The first logistics company with an MCP server wins every AI-powered e-commerce integration.',
    datePublished: '2026-04-16',
    dateModified: '2026-04-16',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/logistics-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'logistics shipping agent readiness, logistics AI agents, shipping API agent readiness, delivery tracking AI agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Logistics Agent Readiness',
          item: 'https://agenthermes.ai/blog/logistics-agent-readiness',
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
      title="Logistics Agent Readiness: Why Shipping and Delivery Companies Score Below 30"
      shareUrl="https://agenthermes.ai/blog/logistics-agent-readiness"
      currentHref="/blog/logistics-agent-readiness"
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
            <span className="text-zinc-400">Logistics Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Truck className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Below 30 Average
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Logistics Agent Readiness:{' '}
            <span className="text-emerald-400">Why Shipping and Delivery Companies Score Below 30</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            FedEx, UPS, and USPS all have APIs. So why does the logistics vertical average below 30 on
            the Agent Readiness Score? Because <strong className="text-zinc-100">having an API and being
            agent-ready are not the same thing</strong>. Tracking endpoints exist but are rate-limited,
            XML-first, and gated behind manual business registration. Most third-party logistics providers
            have no public API at all.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  April 16, 2026
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

      {/* ===== THE STATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-amber-500" />
            A $4.6 Trillion Industry Invisible to AI Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Global logistics is a $4.6 trillion industry. Every e-commerce transaction ends with a
              package being shipped, tracked, and delivered. AI agents are increasingly handling the
              purchasing side — finding products, comparing prices, placing orders. But the moment the
              order is placed, the agent hits a wall. It cannot track the shipment, cannot compare
              shipping rates, and cannot generate a label without a human stepping in.
            </p>
            <p>
              This disconnect exists because logistics APIs were built for{' '}
              <strong className="text-zinc-100">enterprise integration partners</strong>, not for
              autonomous agents. They assume a human completed a registration form, signed a contract,
              and configured credentials in a dashboard. An AI agent operating on behalf of a user
              cannot do any of that.
            </p>
            <p>
              The result: the industry that physically delivers everything the internet sells is
              digitally invisible to the AI agents doing the selling.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$4.6T', label: 'global logistics market', icon: DollarSign },
              { value: '<30', label: 'avg agent readiness score', icon: BarChart3 },
              { value: '0', label: 'logistics MCP servers', icon: Server },
              { value: '60%+', label: 'still use XML endpoints', icon: Code2 },
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

      {/* ===== CARRIER SCORECARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Carrier and 3PL Scorecard
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We scanned the six most commonly integrated logistics providers. Only two broke into Bronze.
            None reached Silver.
          </p>

          <div className="space-y-4 mb-8">
            {carrierScores.map((carrier) => (
              <div
                key={carrier.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-zinc-100">{carrier.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${getScoreColor(carrier.score)}`}>
                      {carrier.score}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      carrier.tier === 'Bronze'
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        : 'bg-zinc-700/50 border border-zinc-600/30 text-zinc-500'
                    }`}>
                      {carrier.tier}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-xs font-medium text-emerald-400 mb-1">Strengths</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{carrier.strengths}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                    <p className="text-xs font-medium text-red-400 mb-1">Weaknesses</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{carrier.weaknesses}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIMENSION BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Dimension-by-Dimension Breakdown
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Where exactly does logistics fail across the 9 AgentHermes scoring dimensions? The pattern
            is clear: APIs exist but everything around them — discovery, onboarding, error handling,
            agent experience — is missing.
          </p>

          <div className="space-y-3 mb-8">
            {dimensionBreakdown.map((dim) => {
              const colors = getDimColor(dim.color)
              return (
                <div
                  key={dim.dimension}
                  className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-12 w-16 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                    <span className={`text-sm font-bold ${colors.text}`}>{dim.score}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">{dim.dimension}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{dim.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOGISTICS LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Logistics Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The first logistics company that ships the following five capabilities captures every
              AI-powered e-commerce integration. This is not theoretical — AI agents are already placing
              orders and need a way to complete the fulfillment chain.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Real-time tracking JSON endpoint',
                detail: 'GET /v1/track/{tracking_number} returns JSON with carrier, status, estimated delivery, and location history. No XML. No SOAP. Agents call this on a polling interval or subscribe via webhook.',
                icon: MapPin,
              },
              {
                step: '2',
                title: 'Rate and quote API',
                detail: 'POST /v1/rates with origin, destination, weight, and dimensions returns an array of carrier options with prices and estimated transit times. This is how AI purchasing agents comparison-shop shipping.',
                icon: DollarSign,
              },
              {
                step: '3',
                title: 'Automated label generation',
                detail: 'POST /v1/labels creates a shipping label and returns a PDF URL and tracking number. The agent completes the entire ship-an-order workflow without human intervention.',
                icon: Package,
              },
              {
                step: '4',
                title: 'Webhook on delivery status change',
                detail: 'Register a webhook URL and receive POST callbacks when shipment status changes: picked up, in transit, out for delivery, delivered, exception. Agents react to events instead of polling.',
                icon: Zap,
              },
              {
                step: '5',
                title: 'MCP server with discovery files',
                detail: 'An MCP server exposing track_shipment, get_rates, create_label, and estimate_delivery as tools. Plus agent-card.json and llms.txt at the domain root for agent discovery.',
                icon: Server,
              },
            ].map((item) => (
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The first-mover advantage is massive.</strong> AI agents
              integrate with the first service that works. Once an e-commerce agent has a reliable shipping
              integration, switching costs are high — the agent has learned the API patterns, cached the
              credentials, and built workflows around it. The{' '}
              <Link href="/blog/manufacturing-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                manufacturing vertical
              </Link>{' '}
              faces the same dynamic: whoever shows up first gets locked in.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE XML PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            The XML Ceiling
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The single biggest technical barrier in logistics agent readiness is XML. USPS Web Tools
              API is entirely XML. FedEx Ship API uses SOAP. UPS has SOAP endpoints alongside REST.
              XML is not just an inconvenience for AI agents — it is a fundamental mismatch.
            </p>
            <p>
              Large language models think in JSON. When an agent needs to construct a tracking request,
              it naturally produces a JSON object. When it receives an XML response, it must parse
              namespaces, handle CDATA sections, and map XML elements to a data structure it can
              reason about. Every step in that conversion is a failure point.
            </p>
            <p>
              In our scans, <strong className="text-zinc-100">XML-first endpoints scored 40-60% lower on D2
              API Quality</strong> than equivalent JSON endpoints. The data is the same — the format makes it
              hostile to agents. EasyPost recognized this early and built JSON-only from day one, which is
              why it scores highest in the vertical.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-red-400 text-sm mb-2">XML Response (USPS pattern)</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Namespaced elements, CDATA blocks, attributes on elements, no consistent error schema.
                Agents must parse XML, extract text nodes, handle encoding, and map to internal structures.
                Failure rate on first attempt: 35-40%.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-emerald-400 text-sm mb-2">JSON Response (EasyPost pattern)</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Flat key-value pairs, consistent envelope, typed fields, predictable error objects.
                Agents read it natively. No parsing adapter needed. Failure rate on first attempt: under 5%.
              </p>
            </div>
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
                title: 'Manufacturing Agent Readiness: Why Factory Floors Are the Last Frontier',
                href: '/blog/manufacturing-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Webhooks and Agent Readiness: Why Real-Time Beats Polling',
                href: '/blog/webhooks-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Scan',
                tagColor: 'emerald',
              },
            ].map((article) => {
              const colorMap: Record<string, { text: string; bg: string; border: string }> = {
                amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
              }
              const colors = colorMap[article.tagColor] || colorMap.emerald
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
            How does your logistics API score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan on your shipping or logistics platform. See how you compare
            across all 9 dimensions and get a prioritized fix list.
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
