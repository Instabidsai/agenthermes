import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  Handshake,
  HelpCircle,
  Layers,
  Lightbulb,
  Rocket,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Building an Agent Readiness Consulting Practice: The New Service Vertical | AgentHermes',
  description:
    'AgentHermes data shows 90% of businesses score below Silver. That is a consulting opportunity: help businesses go from Bronze to Silver in 30 days. Revenue model, services, and how to use AgentHermes as the scoring platform.',
  keywords: [
    'agent readiness consulting business',
    'agent readiness consulting',
    'MCP server consulting',
    'agent readiness audit service',
    'AI consulting practice',
    'agent economy consulting',
    'agent readiness implementation',
    'OpenAPI consulting',
    'agent-card.json service',
  ],
  openGraph: {
    title: 'Building an Agent Readiness Consulting Practice: The New Service Vertical',
    description:
      '90% of businesses score below Silver on agent readiness. That is a consulting opportunity: $2-5K per engagement, recurring monitoring, and implementation services.',
    url: 'https://agenthermes.ai/blog/agency-building-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Building an Agent Readiness Consulting Practice: The New Service Vertical',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building an Agent Readiness Consulting Practice: The New Service Vertical',
    description:
      '90% of businesses need help getting agent-ready. $2-5K per engagement. Here is how to build the practice.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agency-building-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const serviceOfferings = [
  {
    name: 'Agent Readiness Audit',
    description: 'Full assessment using AgentHermes scanner plus manual review. Dimension-by-dimension analysis with prioritized fix list. Delivered as a branded report showing current score, peer benchmarks, and exact actions to reach the next tier.',
    price: '$500 - $1,500',
    timeframe: '2-3 days',
    difficulty: 'Low',
    icon: Search,
    color: 'emerald',
  },
  {
    name: 'OpenAPI Spec Writing',
    description: 'Document existing APIs into a valid OpenAPI 3.1 specification. Includes endpoint discovery, schema definition, authentication documentation, and example requests. Published at /openapi.json or /openapi.yaml.',
    price: '$1,500 - $3,000',
    timeframe: '1-2 weeks',
    difficulty: 'Medium',
    icon: Code2,
    color: 'blue',
  },
  {
    name: 'MCP Server Implementation',
    description: 'Build and deploy a custom MCP server exposing the client business capabilities as agent-callable tools. Includes tool design, resource definitions, SSE transport, hosted deployment, and agent-card.json.',
    price: '$3,000 - $5,000',
    timeframe: '2-3 weeks',
    difficulty: 'High',
    icon: Server,
    color: 'purple',
  },
  {
    name: 'agent-card.json + llms.txt Setup',
    description: 'Create and deploy the two discovery files that make businesses visible to AI agents. Includes agent-card.json with capability declarations and llms.txt with structured business information. Deploy to /.well-known/ path.',
    price: '$300 - $800',
    timeframe: '1-2 days',
    difficulty: 'Low',
    icon: Globe,
    color: 'emerald',
  },
  {
    name: 'Monthly Monitoring + Maintenance',
    description: 'Recurring scans, score tracking, regression alerts, and quarterly optimization. Ensure the client maintains their tier as competitors catch up and scoring evolves. Includes competitive benchmarking against peers.',
    price: '$500 - $1,500/mo',
    timeframe: 'Ongoing',
    difficulty: 'Low',
    icon: BarChart3,
    color: 'amber',
  },
  {
    name: 'Bronze to Silver Sprint',
    description: 'Packaged 30-day engagement following the AgentHermes Bronze to Silver guide. Week-by-week implementation: HTTPS + OpenAPI + sitemap, then auth + structured errors, then discovery files, then self-service API keys. Guaranteed tier improvement.',
    price: '$3,000 - $5,000',
    timeframe: '30 days',
    difficulty: 'Medium',
    icon: TrendingUp,
    color: 'emerald',
  },
]

const marketData = [
  { metric: 'Businesses scanned by AgentHermes', value: '500+' },
  { metric: 'Average Agent Readiness Score', value: '43/100' },
  { metric: 'Businesses below Silver (60)', value: '90%' },
  { metric: 'Businesses below Bronze (40)', value: '40%' },
  { metric: 'Businesses with MCP servers', value: '<1%' },
  { metric: 'Businesses with agent-card.json', value: '0%' },
]

const clientProfiles = [
  {
    type: 'SaaS Companies (40-55 score)',
    pain: 'Have APIs but missing agent-native infrastructure. No agent-card.json, no MCP, structured errors inconsistent.',
    service: 'Discovery files + MCP server + error standardization. Fastest ROI — they already have the API.',
    value: '$3,000-$5,000 initial + $500/mo monitoring',
    icon: Layers,
    color: 'blue',
  },
  {
    type: 'E-Commerce Businesses (20-40 score)',
    pain: 'Platform-dependent (Shopify/WooCommerce). Some structured data from platform but missing agent files, OpenAPI spec, custom tools.',
    service: 'Platform adapter + agent-card.json + product catalog MCP tools. Template-able across stores.',
    value: '$2,000-$3,500 initial + $300/mo monitoring',
    icon: DollarSign,
    color: 'emerald',
  },
  {
    type: 'Local Businesses (5-20 score)',
    pain: 'Zero API, zero structured data, phone-first everything. Need complete agent infrastructure from scratch.',
    service: 'AgentHermes hosted MCP server + agent-card.json + llms.txt + Schema.org markup. Highest lift per engagement.',
    value: '$1,500-$3,000 initial + $200/mo monitoring',
    icon: Target,
    color: 'amber',
  },
  {
    type: 'Enterprise (30-45 score)',
    pain: 'Have APIs but locked behind enterprise sales, NDAs, and complex auth. Pricing not public. No self-service onboarding.',
    service: 'Agent onboarding pathway + pricing transparency + developer portal setup. Longer sales cycle, higher value.',
    value: '$5,000-$15,000 initial + $1,500/mo monitoring',
    icon: Briefcase,
    color: 'purple',
  },
]

const revenueModel = [
  { scenario: '5 audits/month', monthly: '$5,000', annual: '$60,000', note: 'Audit-only practice, solo consultant' },
  { scenario: '3 implementations/month', monthly: '$12,000', annual: '$144,000', note: 'Audit + implementation, small team' },
  { scenario: '10 monitoring clients', monthly: '$7,500', annual: '$90,000', note: 'Recurring revenue base, builds over time' },
  { scenario: 'Combined (2 impl + 5 audits + 10 monitoring)', monthly: '$19,500', annual: '$234,000', note: 'Realistic year-2 solo consultant revenue' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do I need to be a developer to offer agent readiness consulting?',
    answer:
      'For audits and discovery file setup, no. AgentHermes does the scanning, and agent-card.json and llms.txt are simple JSON and markdown files. For OpenAPI spec writing and MCP server implementation, you need API development skills or a development partner. The best model for non-developers: sell the audit and discovery services yourself, subcontract the implementation to a developer at 40-50% of the client price.',
  },
  {
    question: 'How do I get clients for agent readiness consulting?',
    answer:
      'Three channels work: (1) Run free AgentHermes scans on prospects and email them their score with a short analysis — this is the most effective cold outreach in the space right now because no one expects an unsolicited audit. (2) Target businesses already investing in AI — they understand the value but do not know about agent readiness specifically. (3) Partner with web agencies and offer agent readiness as an upsell to their existing client base. Every web agency has clients asking about AI.',
  },
  {
    question: 'Is the market big enough to build a practice?',
    answer:
      'AgentHermes has scanned 500+ businesses. 90% score below Silver. There are 33 million US small businesses alone — conservatively, 95% of them score below Bronze. The total addressable market is not the constraint. The constraint is awareness: most businesses do not know what agent readiness is yet. That is actually an advantage for early consultants — you are defining the category while selling the solution.',
  },
  {
    question: 'What if AgentHermes changes its scoring methodology?',
    answer:
      'Scoring methodology evolves as the agent economy matures. This is actually a selling point for ongoing monitoring contracts. Clients need someone to track scoring changes, re-run assessments, and adjust their infrastructure. It is the same dynamic as SEO consulting — algorithm updates drive recurring revenue for consultants who stay current.',
  },
  {
    question: 'Can I white-label AgentHermes scans?',
    answer:
      'Currently, AgentHermes scans are available at /audit for anyone to run for free. You can use the scan results as part of your branded audit report — run the scan, add your analysis, context, and recommendations, and deliver it as a professional engagement. The scan provides the data; your consulting practice provides the interpretation and implementation.',
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

export default function AgencyBuildingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Building an Agent Readiness Consulting Practice: The New Service Vertical',
    description:
      'AgentHermes data shows 90% of businesses score below Silver. That is a consulting opportunity worth $2-5K per engagement with recurring monitoring revenue.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agency-building-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Business Strategy',
    wordCount: 1900,
    keywords:
      'agent readiness consulting business, MCP server consulting, agent readiness audit, AI consulting practice',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Building an Agent Readiness Consulting Practice',
          item: 'https://agenthermes.ai/blog/agency-building-agent-readiness',
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
      title="Building an Agent Readiness Consulting Practice: The New Service Vertical"
      shareUrl="https://agenthermes.ai/blog/agency-building-agent-readiness"
      currentHref="/blog/agency-building-agent-readiness"
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
            <span className="text-zinc-400">Agent Readiness Consulting Practice</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Handshake className="h-3.5 w-3.5" />
              Business Opportunity
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Business Strategy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Building an Agent Readiness Consulting Practice:{' '}
            <span className="text-emerald-400">The New Service Vertical</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            AgentHermes data from <strong className="text-zinc-100">500+ scans</strong> shows 90% of businesses
            score below Silver. That is not just a problem — it is a consulting opportunity. Help businesses go
            from Bronze to Silver in 30 days. Charge <strong className="text-zinc-100">$2-5K per engagement</strong> with
            recurring monitoring revenue. Here is the complete playbook.
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

      {/* ===== THE OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-500" />
            The Market Opportunity in Numbers
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we{' '}
              <Link href="/blog/improve-agent-readiness-score" className="text-emerald-400 hover:text-emerald-300 underline">
                wrote the guide to improving agent readiness scores
              </Link>{' '}
              and the{' '}
              <Link href="/blog/bronze-to-silver-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                Bronze to Silver 30-day sprint
              </Link>, we realized something: most businesses will never do this themselves. They do not have the
              technical staff, the time, or the awareness. That is exactly the gap a consulting practice fills.
            </p>
            <p>
              The agent readiness consulting market looks like early SEO consulting in 2005. Businesses know
              they need to &ldquo;do something about AI&rdquo; but do not know what. Most are spending money on
              chatbots (wrong direction) or waiting (losing first-mover advantage). A structured consulting
              offering — backed by real scoring data — gives them a clear path forward.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-2 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Metric</div>
              <div>Value</div>
            </div>
            {marketData.map((row, i) => (
              <div
                key={row.metric}
                className={`grid grid-cols-2 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="text-zinc-400">{row.metric}</div>
                <div className="font-bold text-zinc-100">{row.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '90%', label: 'Businesses need help', icon: Target },
              { value: '$2-5K', label: 'Per engagement', icon: DollarSign },
              { value: '30 days', label: 'Bronze to Silver', icon: TrendingUp },
              { value: '$234K', label: 'Realistic year-2 revenue', icon: BarChart3 },
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

      {/* ===== SERVICE OFFERINGS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-500" />
            Six Services You Can Offer Today
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Each service maps to a specific gap in the Agent Readiness Score. Start with audits (lowest
              effort, fastest revenue), then add implementation services as demand grows. The monitoring
              retainer builds recurring revenue over time.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {serviceOfferings.map((service) => {
              const colors = getColorClasses(service.color)
              return (
                <div
                  key={service.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <service.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-zinc-100">{service.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs mt-0.5">
                        <span className="text-emerald-400">{service.price}</span>
                        <span className="text-zinc-500">{service.timeframe}</span>
                        <span className={`px-1.5 py-0.5 rounded ${
                          service.difficulty === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                          service.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-purple-500/10 text-purple-400'
                        }`}>
                          {service.difficulty} effort
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CLIENT PROFILES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Four Client Profiles and What They Need
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Not every business needs the same services. Agent readiness consulting maps to four
              distinct client profiles, each with different pain points, service needs, and revenue
              potential. The data from{' '}
              <Link href="/blog/agent-readiness-roi-calculator" className="text-emerald-400 hover:text-emerald-300 underline">
                our ROI analysis
              </Link>{' '}
              helps frame the value proposition for each.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {clientProfiles.map((profile) => {
              const colors = getColorClasses(profile.color)
              return (
                <div
                  key={profile.type}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <profile.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{profile.type}</h3>
                  </div>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-red-400 font-medium">Pain:</span> {profile.pain}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-emerald-400 font-medium">Service:</span> {profile.service}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-emerald-400 font-medium">Revenue potential:</span>{' '}
                      {profile.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== REVENUE MODEL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            Revenue Model: From Solo Consultant to Small Team
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Agent readiness consulting has three revenue streams that stack: one-time audits, implementation
              projects, and recurring monitoring. The monitoring base compounds — every implementation client
              becomes a monitoring client. Here are realistic scenarios:
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Scenario</div>
              <div className="text-center">Monthly</div>
              <div className="text-center">Annual</div>
              <div className="hidden sm:block">Notes</div>
            </div>
            {revenueModel.map((row, i) => (
              <div
                key={row.scenario}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="text-zinc-300 font-medium">{row.scenario}</div>
                <div className="text-center text-emerald-400 font-bold">{row.monthly}</div>
                <div className="text-center text-zinc-200">{row.annual}</div>
                <div className="hidden sm:block text-zinc-500 text-xs">{row.note}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The compounding effect:</strong> Every implementation
              client becomes a monitoring client. After 12 months of doing 3 implementations per month,
              you have 36 monitoring clients generating $18,000-$54,000/month in recurring revenue — before
              new implementation work. This is the same flywheel that built the SEO consulting industry.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO GET STARTED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Rocket className="h-5 w-5 text-amber-500" />
            Getting Started: Week-by-Week Launch Plan
          </h2>

          <div className="space-y-3 mb-8">
            {[
              {
                step: 'Week 1',
                title: 'Scan 50 businesses in your target vertical',
                detail: 'Use AgentHermes /audit to scan businesses in the vertical you know best. Build a spreadsheet of scores, common failures, and tier distributions. This becomes your sales pitch and your expertise.',
              },
              {
                step: 'Week 2',
                title: 'Create your audit report template',
                detail: 'Take the AgentHermes scan results and wrap them in a branded report. Add your analysis per dimension, competitive benchmarks (how their peers score), and a prioritized action plan. This is the product you sell.',
              },
              {
                step: 'Week 3',
                title: 'Cold outreach with free mini-audits',
                detail: 'Email 20 businesses with a 1-paragraph summary of their score and 3 specific issues you found. Offer a full audit call for free. The scan data makes this hyper-specific — not generic "your site needs work" but "you score 34, your competitor scores 52, here is why."',
              },
              {
                step: 'Week 4',
                title: 'Convert 2-3 audit clients, deliver, upsell',
                detail: 'Deliver full audit reports. At the end of each report, present the implementation roadmap with pricing. The audit naturally leads to "can you fix this for us?" which is the implementation engagement.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {item.step.split(' ')[1]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-emerald-400 font-medium">{item.step}</span>
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY THIS WORKS NOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Why This Works Now (And Not in 2 Years)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Zero competition in most markets',
                detail: 'There are no established agent readiness consultants. SEO has 100K+ consultants. Agent readiness has approximately zero. You are defining the category.',
              },
              {
                title: 'Quantifiable before/after',
                detail: 'Unlike vague AI consulting, agent readiness has a number. Before: 34. After: 62. The improvement is provable, which makes the value conversation easy.',
              },
              {
                title: 'Scores only go up in importance',
                detail: 'As AI agents become more autonomous, agent readiness stops being nice-to-have and becomes must-have. Early clients get the biggest competitive advantage.',
              },
              {
                title: 'Implementation is learnable',
                detail: 'OpenAPI specs, agent-card.json, llms.txt, MCP servers — none of these are complex technologies. A developer can learn the full stack in a week. The value is knowing what to do, not inventing new technology.',
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
              The window for first-mover advantage in agent readiness consulting is open right now. In
              2 years, this will be a crowded market with established agencies and commoditized pricing.
              Today, a solo consultant with a laptop and AgentHermes can build a practice that generates
              $100K+ in year one. The playbook is documented. The scoring platform is free. The market is
              waiting.
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
                title: 'From Bronze to Silver in 30 Days: The Agent Readiness Sprint',
                href: '/blog/bronze-to-silver-guide',
                tag: 'How-To Guide',
                tagColor: 'emerald',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'emerald',
              },
              {
                title: 'The Agent Readiness ROI: What Happens When Agents Can Use Your Business',
                href: '/blog/agent-readiness-roi-calculator',
                tag: 'Business Strategy',
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
            Start scanning businesses today
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run free Agent Readiness scans on any business. Build your expertise, collect data,
            and turn it into a consulting practice. The scanner is free. The opportunity is now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Scan a Business Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Connect Your Practice
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
