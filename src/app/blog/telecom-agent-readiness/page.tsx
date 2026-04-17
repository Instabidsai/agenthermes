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
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Phone,
  Server,
  Shield,
  Signal,
  Smartphone,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Telecom Agent Readiness: Why Carriers Are the Most Frustrating APIs for AI Agents | AgentHermes',
  description:
    'Traditional telecom carriers (AT&T, Verizon, T-Mobile) score under 25 for agent readiness. XML-heavy APIs, complex auth, no structured plan data. Twilio is the exception at 55-60. Learn what agent-ready telecom looks like.',
  keywords: [
    'telecom carrier agent readiness',
    'telecom API AI agents',
    'carrier API readiness',
    'Twilio agent readiness',
    'telecom MCP server',
    'AT&T API agent',
    'Verizon API agent',
    'T-Mobile API agent',
    'eSIM provisioning API',
  ],
  openGraph: {
    title: 'Telecom Agent Readiness: Why Carriers Are the Most Frustrating APIs for AI Agents',
    description:
      'Traditional carriers score under 25. XML-heavy, phone-tree customer service, no structured plan data. Twilio is the exception. Here is what agent-ready telecom looks like.',
    url: 'https://agenthermes.ai/blog/telecom-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Telecom Agent Readiness: Why Carriers Are the Most Frustrating APIs for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telecom Agent Readiness: Why Carriers Frustrate AI Agents',
    description:
      'XML-heavy APIs, phone-tree support, no plan comparison endpoints. Traditional carriers score under 25 for agent readiness. Twilio is the exception at 55-60.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/telecom-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const carrierScores = [
  { name: 'Twilio', score: 58, tier: 'Silver', color: 'emerald', notes: 'Developer-first, REST + JSON, excellent docs, sandbox mode' },
  { name: 'Vonage (Nexmo)', score: 42, tier: 'Bronze', color: 'amber', notes: 'REST API, decent docs, but complex pricing and no MCP' },
  { name: 'Bandwidth', score: 38, tier: 'Not Scored', color: 'zinc', notes: 'Good API but niche, limited discovery, enterprise-only pricing' },
  { name: 'T-Mobile (DevEdge)', score: 24, tier: 'Not Scored', color: 'red', notes: 'New developer portal but limited endpoints, carrier-specific auth' },
  { name: 'AT&T (APIs)', score: 18, tier: 'Not Scored', color: 'red', notes: 'Legacy SOAP/XML, partner-only access, no public plan data' },
  { name: 'Verizon (ThingSpace)', score: 16, tier: 'Not Scored', color: 'red', notes: 'IoT-focused, complex OAuth, enterprise agreements required' },
]

const dimensionBreakdown = [
  { dimension: 'D1 Discovery', traditional: '5/100', devFirst: '70/100', issue: 'No robots.txt allowing AI crawlers, no llms.txt, no agent-card.json' },
  { dimension: 'D2 API Quality', traditional: '15/100', devFirst: '80/100', issue: 'SOAP/XML, inconsistent error formats, carrier-specific schemas' },
  { dimension: 'D3 Onboarding', traditional: '10/100', devFirst: '75/100', issue: 'Enterprise sales process, 30-day provisioning, NDA required' },
  { dimension: 'D4 Pricing', traditional: '5/100', devFirst: '60/100', issue: '"Contact sales" or PDF rate cards, no structured pricing endpoint' },
  { dimension: 'D5 Payment', traditional: '0/100', devFirst: '55/100', issue: 'Invoice billing only, no self-service, no usage-based API' },
  { dimension: 'D6 Data Quality', traditional: '20/100', devFirst: '70/100', issue: 'Coverage maps are images, not queryable data' },
  { dimension: 'D7 Security', traditional: '30/100', devFirst: '75/100', issue: 'Legacy auth schemes, IP whitelisting instead of modern OAuth' },
  { dimension: 'D8 Reliability', traditional: '25/100', devFirst: '80/100', issue: 'Status pages exist but not machine-readable, no /health endpoint' },
  { dimension: 'D9 Agent Experience', traditional: '0/100', devFirst: '45/100', issue: 'Zero agent-native files, no MCP, no structured tool descriptions' },
]

const agentReadyFeatures = [
  {
    title: 'Plan Comparison API',
    description: 'Structured endpoint returning all available plans with data caps, speeds, pricing tiers, contract terms, and coverage zones. Agents can compare across carriers in seconds.',
    icon: BarChart3,
    color: 'emerald',
  },
  {
    title: 'Usage Dashboard Endpoint',
    description: 'Real-time JSON endpoint for current billing cycle usage: data consumed, minutes used, messages sent, overage charges, and projected month-end cost.',
    icon: Signal,
    color: 'blue',
  },
  {
    title: 'Automated Plan Switching',
    description: 'API to change plans programmatically based on usage patterns. An agent monitoring your data usage switches you to a cheaper plan when you consistently under-use your cap.',
    icon: Zap,
    color: 'purple',
  },
  {
    title: 'eSIM Provisioning API',
    description: 'Provision eSIM profiles via API. No visiting a store, no mailing a physical SIM. An agent can activate a travel eSIM before you land in a new country.',
    icon: Smartphone,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do traditional telecom carriers score so low?',
    answer:
      'Traditional carriers built their infrastructure in the pre-API era. Their systems are SOAP/XML-based, require enterprise agreements for access, and expose no public-facing structured data for plans, coverage, or billing. Even their developer portals (when they exist) are locked behind NDAs and partner programs. An AI agent cannot compare AT&T and Verizon plans because neither exposes that data in a machine-readable format.',
  },
  {
    question: 'How does Twilio score so much higher than traditional carriers?',
    answer:
      'Twilio was built developer-first. REST APIs with JSON responses, comprehensive OpenAPI specs, sandbox testing with free credits, structured error codes, per-request pricing visible on the website, and extensive documentation. These are exactly the signals AgentHermes measures across all 9 dimensions. Twilio treats developers (and therefore agents) as first-class users. Traditional carriers treat them as an afterthought.',
  },
  {
    question: 'What would it take for AT&T or Verizon to reach Silver tier?',
    answer:
      'They would need to expose public REST endpoints for plan comparison, publish OpenAPI specs for their developer APIs, add a self-service signup flow for API access, create a sandbox environment, publish structured pricing (not PDF rate cards), add a machine-readable status page, and create agent-native discovery files (agent-card.json, llms.txt). That is a 12-18 month engineering effort given their legacy infrastructure.',
  },
  {
    question: 'Can an AI agent currently help me switch phone plans?',
    answer:
      'Not reliably. Today, an AI agent trying to compare phone plans has to scrape carrier websites that are heavily JavaScript-rendered, interpret marketing language about "unlimited" plans that have different definitions per carrier, and cannot actually execute a plan switch. The best an agent can do is summarize publicly visible plan pages — with high error rates because the data is unstructured HTML, not API responses.',
  },
  {
    question: 'Are MVNOs (Mint Mobile, Visible) more agent-ready than carriers?',
    answer:
      'Slightly. MVNOs tend to have simpler plan structures and more transparent pricing on their websites, which helps with D4 Pricing scores. But they still lack public APIs, structured data endpoints, and agent-native discovery files. Mint Mobile scores around 20-25 — better than AT&T (18) but still far from Silver tier. The MVNO that builds an MCP server first captures the entire agent-driven plan comparison market.',
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
    zinc: { text: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TelecomAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Telecom Agent Readiness: Why Carriers Are the Most Frustrating APIs for AI Agents',
    description:
      'Traditional telecom carriers score under 25 for agent readiness. XML-heavy APIs, complex auth, no structured plan data. Twilio is the exception at 55-60.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/telecom-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'telecom carrier agent readiness, telecom API AI agents, Twilio agent readiness, carrier MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Telecom Agent Readiness',
          item: 'https://agenthermes.ai/blog/telecom-agent-readiness',
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
      title="Telecom Agent Readiness: Why Carriers Are the Most Frustrating APIs for AI Agents"
      shareUrl="https://agenthermes.ai/blog/telecom-agent-readiness"
      currentHref="/blog/telecom-agent-readiness"
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
            <span className="text-zinc-400">Telecom Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Phone className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Telecom Industry
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Telecom Agent Readiness: Why Carriers Are{' '}
            <span className="text-emerald-400">the Most Frustrating APIs for AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The telecom industry generates <strong className="text-zinc-100">$1.8 trillion in annual revenue</strong> globally.
            Traditional carriers like AT&T, Verizon, and T-Mobile have APIs that are notoriously difficult for developers —
            and completely unusable by AI agents. Average carrier score: <strong className="text-zinc-100">19/100</strong>.
            Twilio, built developer-first, scores 58.
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
            <Phone className="h-5 w-5 text-amber-500" />
            The Phone Tree Problem: Why Agents Cannot Navigate Telecom
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Ask any AI agent to compare phone plans from AT&T, Verizon, and T-Mobile. It will fail.
              Not because the agent is incapable, but because the data does not exist in any structured,
              machine-readable format. The carrier websites are marketing engines built for humans —
              hero images, promotional pricing with asterisks, and &ldquo;contact us&rdquo; buttons
              where an API endpoint should be.
            </p>
            <p>
              This is the fundamental tension in telecom: these are <em>technology companies</em> that
              are <strong className="text-zinc-100">invisible to technology</strong>. They run the
              networks that AI agents use to communicate, yet an agent cannot programmatically check
              a data plan price. The irony is as thick as their terms of service.
            </p>
            <p>
              Traditional carrier APIs — when they exist — are built for enterprise partners, not
              developers. They use SOAP/XML instead of REST/JSON, require NDA-protected partner
              agreements for access, mandate IP whitelisting instead of modern OAuth, and return
              carrier-specific error codes that no agent has been trained on. The onboarding process
              alone takes 30-90 days.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$1.8T', label: 'global telecom revenue', icon: Globe },
              { value: '19', label: 'avg carrier score', icon: BarChart3 },
              { value: '58', label: 'Twilio (exception)', icon: TrendingUp },
              { value: '0', label: 'carriers with MCP', icon: Server },
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
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Carrier Scorecard: Developer-First vs Legacy
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The gap between developer-first telecom companies and traditional carriers is the widest
            of any industry we have scanned. Twilio scores 3x higher than AT&T — and they both
            sell communication services.
          </p>

          <div className="space-y-3 mb-8">
            {carrierScores.map((carrier) => {
              const colors = getColorClasses(carrier.color)
              return (
                <div
                  key={carrier.name}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-zinc-100">{carrier.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}>
                        {carrier.tier}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-zinc-100">{carrier.score}<span className="text-sm text-zinc-500">/100</span></div>
                  </div>
                  <p className="text-sm text-zinc-500">{carrier.notes}</p>
                  <div className="mt-2 h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${carrier.score >= 50 ? 'bg-emerald-500' : carrier.score >= 35 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${carrier.score}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DIMENSION BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            9 Dimensions: Traditional Carriers vs Developer-First Telecom
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The difference is not just an API. It is a fundamentally different approach to how
            external systems interact with the business. Here is how each dimension breaks down.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Traditional</div>
              <div>Dev-First</div>
              <div>Root Cause</div>
            </div>
            {dimensionBreakdown.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-red-400">{row.traditional}</div>
                <div className="text-emerald-400">{row.devFirst}</div>
                <div className="text-zinc-500 text-xs leading-relaxed">{row.issue}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The 40-point gap is architectural, not cosmetic.</strong>{' '}
              Traditional carriers cannot close this gap with a new developer portal. Their backend
              systems are SOAP-based, billing is batch-processed, and plan data lives in mainframe
              databases from the 1990s. Twilio built on REST from day one. This is why the{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                enterprise vs startup gap
              </Link>{' '}
              is so pronounced in telecom.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TWILIO EXCEPTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The Twilio Exception: What Developer-First Telecom Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Twilio scores 58 — Silver tier — because it was built for machines from the start.
              Every feature has a REST API. Pricing is per-request and published on the website in
              structured tables. The sandbox gives you free credits to test without a sales call.
              Error responses are JSON with consistent codes. Documentation is comprehensive with
              runnable code examples.
            </p>
            <p>
              What Twilio gets right that traditional carriers get wrong:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { right: 'REST/JSON everywhere', wrong: 'SOAP/XML with carrier-specific schemas', dimension: 'D2' },
              { right: 'Self-service signup, free trial credits', wrong: '30-day enterprise onboarding with NDA', dimension: 'D3' },
              { right: 'Per-request pricing on website', wrong: 'PDF rate cards, "contact sales"', dimension: 'D4' },
              { right: 'OAuth 2.0, API keys, scoped tokens', wrong: 'IP whitelisting, certificate auth', dimension: 'D7' },
              { right: 'status.twilio.com with incident API', wrong: 'Network status buried in support portal', dimension: 'D8' },
              { right: 'OpenAPI spec, helper libraries in 7 languages', wrong: 'WSDL files, enterprise SDK', dimension: 'D9' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="text-xs text-zinc-600 mb-2 font-medium">{item.dimension}</div>
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-400">{item.right}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{item.wrong}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              What keeps Twilio from Gold? No agent-card.json, no llms.txt, no MCP server, and
              complex pricing that still requires navigating multiple pages to understand the full
              cost of a use case. But at 58, it is within striking distance of the 60-point Silver
              ceiling. Three agent-native files and a pricing API endpoint would push it to Gold.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY TELECOM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Telecom Actually Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Imagine an AI agent that can genuinely manage your phone plan. It monitors your usage,
            compares plans across carriers, switches you to save money, and provisions an eSIM
            when you travel. Here are the four capabilities that make this possible.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyFeatures.map((feature) => {
              const colors = getColorClasses(feature.color)
              return (
                <div
                  key={feature.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <feature.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              None of these exist today at any traditional carrier. The closest is T-Mobile DevEdge,
              which launched in 2023 with limited 5G and IoT APIs — but no consumer plan management
              endpoints. The carrier that builds these four capabilities first does not just score
              higher on AgentHermes. It captures the entire AI-driven mobile management market
              before competitors realize the game has changed.
            </p>
            <p>
              This pattern mirrors what happened in{' '}
              <Link href="/blog/energy-utilities-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                energy and utilities
              </Link>{' '}
              — another infrastructure industry where legacy systems block agent access to consumer-facing
              data. The first mover advantage in both sectors is enormous because switching costs
              are high and agent-driven optimization is a compelling value proposition.
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
                title: 'Enterprise vs Startup Agent Readiness: Why Size Hurts',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Energy and Utilities: Why Power Companies Are Dark to AI',
                href: '/blog/energy-utilities-agent-readiness',
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
            How does your business score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Telecom averages 19/100. See how your company compares across all 9 dimensions
            of agent readiness — free scan in 60 seconds.
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
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
