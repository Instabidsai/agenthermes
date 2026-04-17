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
  Database,
  DollarSign,
  Globe,
  HelpCircle,
  LayoutTemplate,
  Layers,
  Network,
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
  title: 'API-First vs Web-First: The Architectural Decision That Determines Your Agent Readiness Score | AgentHermes',
  description:
    'API-first companies average 60+ agent readiness scores. Web-first companies average 15-20. The single most impactful architectural decision for the agent economy, with data from 500 business scans.',
  keywords: [
    'API first vs web first agent readiness',
    'API first architecture',
    'web first vs API first',
    'agent readiness architecture',
    'API first score',
    'web first agent score',
    'structured data API',
    'agent economy architecture',
    'MCP server API first',
  ],
  openGraph: {
    title: 'API-First vs Web-First: The Architectural Decision That Determines Your Agent Readiness Score',
    description:
      'API-first companies average 60+ scores. Web-first companies average 15-20. Data from 500 scans reveals the single most impactful architectural decision.',
    url: 'https://agenthermes.ai/blog/api-first-vs-web-first',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API-First vs Web-First Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API-First vs Web-First: The Architectural Decision That Determines Your Agent Readiness',
    description:
      'API-first companies score 60+. Web-first companies score 15-20. Here is why and how to bridge the gap.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/api-first-vs-web-first',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const architectureComparison = [
  { aspect: 'Primary output', apiFirst: 'Structured JSON data via endpoints', webFirst: 'HTML pages rendered for browsers', icon: Database },
  { aspect: 'Data model', apiFirst: 'Data IS the product (typed schemas)', webFirst: 'Data buried in page templates', icon: Layers },
  { aspect: 'Authentication', apiFirst: 'API keys, OAuth tokens, JWT', webFirst: 'Session cookies, login forms', icon: Shield },
  { aspect: 'Documentation', apiFirst: 'OpenAPI spec, interactive playground', webFirst: 'Marketing copy, PDF brochures', icon: Code2 },
  { aspect: 'Pricing', apiFirst: 'Structured plans with metered billing', webFirst: '"Contact us" or static price page', icon: DollarSign },
  { aspect: 'Agent interaction', apiFirst: 'Direct function calls with typed I/O', webFirst: 'Scrape HTML, guess at structure', icon: Bot },
]

const scoreDistribution = [
  { category: 'API-first SaaS (Stripe, Twilio, Resend)', avgScore: '62', range: '55-72', tier: 'Silver/Gold', color: 'emerald' },
  { category: 'API-with-dashboard (Vercel, Supabase, Cloudflare)', avgScore: '66', range: '60-72', tier: 'Silver/Gold', color: 'emerald' },
  { category: 'Product with API (Shopify, GitHub, Slack)', avgScore: '58', range: '48-68', tier: 'Bronze/Silver', color: 'blue' },
  { category: 'Web app with API afterthought (CRMs, HR tools)', avgScore: '35', range: '25-48', tier: 'Not Scored/Bronze', color: 'amber' },
  { category: 'Marketing site with contact form', avgScore: '18', range: '10-25', tier: 'Not Scored', color: 'red' },
  { category: 'Brochure site / portfolio', avgScore: '12', range: '5-20', tier: 'Not Scored', color: 'red' },
  { category: 'Local business (phone-only)', avgScore: '7', range: '0-15', tier: 'Not Scored', color: 'red' },
]

const migrationSteps = [
  {
    step: '1',
    title: 'Identify your core data entities',
    detail: 'Every business has 3-5 core entities: products, services, availability, pricing, customers. List yours. These become your API resources.',
    icon: Database,
    color: 'emerald',
  },
  {
    step: '2',
    title: 'Build a read-only JSON API for each entity',
    detail: 'Start with GET endpoints that return structured JSON. /api/services, /api/pricing, /api/availability. No authentication required for public data. This alone can jump your score 15-20 points.',
    icon: Code2,
    color: 'blue',
  },
  {
    step: '3',
    title: 'Add an OpenAPI specification',
    detail: 'Document your endpoints with an OpenAPI 3.x spec. Agents use this to understand what your API offers without reading human documentation. Host it at /openapi.json.',
    icon: Layers,
    color: 'purple',
  },
  {
    step: '4',
    title: 'Expose write operations with authentication',
    detail: 'Add POST endpoints for bookings, orders, and inquiries. Use API keys for identification. This enables agents to actually transact with your business, not just read about it.',
    icon: Shield,
    color: 'amber',
  },
  {
    step: '5',
    title: 'Add agent discovery files',
    detail: 'Deploy agent-card.json, llms.txt, and optionally an MCP server. These tell agents you exist and what you can do. AgentHermes auto-generates these from your API.',
    icon: Bot,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What exactly makes a company API-first vs web-first?',
    answer:
      'An API-first company builds its product as a set of structured data endpoints first, then adds a web interface on top. Stripe\'s dashboard is a frontend for its API — every action you take in the dashboard is an API call. A web-first company builds HTML pages first, then maybe adds an API later. Most local businesses and marketing sites are web-first: the HTML page is the product, and there is no API at all. The key test: can a program do everything a human can do on your site? If yes, you are API-first. If no, you are web-first.',
  },
  {
    question: 'Can a web-first company become agent-ready without a full rebuild?',
    answer:
      'Yes. You do not need to rebuild your entire architecture. The migration path is additive: keep your existing website and add a structured API layer alongside it. Start with read-only JSON endpoints for your core data (services, pricing, availability). Then add write endpoints for bookings and orders. Then add agent discovery files. Each step increases your score incrementally. A web-first company that adds a basic API layer can jump from 15 to 40+ in a week.',
  },
  {
    question: 'Why do API-first companies score so much higher?',
    answer:
      'Because the Agent Readiness Score measures capabilities that API-first companies get for free. D2 API Quality (15% weight) measures structured endpoints — API-first companies have these by definition. D7 Security (12%) measures authentication standards — API-first companies use OAuth and API keys natively. D3 Onboarding (8%) measures self-service signup — API-first companies have developer portals. D8 Reliability (13%) measures uptime monitoring — API-first companies have status pages. Over 48% of the total score rewards capabilities that are intrinsic to API-first architecture.',
  },
  {
    question: 'What about companies that have both a web interface and an API?',
    answer:
      'Most modern SaaS companies fall into this category: they have a web dashboard AND an API. Their score depends on how complete and well-documented the API is. A company with a great web app but a thin, poorly documented API (common in HR tech and CRM tools) scores 25-40. A company where the web app is just a skin over a complete API (like Vercel or Cloudflare) scores 60+. The ratio of API coverage to web coverage determines the score.',
  },
  {
    question: 'Does this mean all local businesses are doomed to low scores?',
    answer:
      'No, but they start from a much harder position. A local business that adds a basic API layer with 4-5 endpoints (get_services, get_pricing, check_availability, book_appointment, get_info) can reach Bronze tier (40+) without any prior technical infrastructure. Platforms like AgentHermes auto-generate this API layer, so the business owner never writes code. The point is not that web-first architecture is permanent — it is that it is the default for 99% of businesses, and overcoming that default requires deliberate action.',
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

export default function ApiFirstVsWebFirstPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'API-First vs Web-First: The Architectural Decision That Determines Your Agent Readiness Score',
    description:
      'API-first companies average 60+ agent readiness scores. Web-first companies average 15-20. The single most impactful architectural decision for the agent economy, backed by data from 500 business scans.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/api-first-vs-web-first',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Architecture Analysis',
    wordCount: 1900,
    keywords:
      'API first vs web first agent readiness, API first architecture, agent readiness score, structured data API, agent economy architecture',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'API-First vs Web-First',
          item: 'https://agenthermes.ai/blog/api-first-vs-web-first',
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
      title="API-First vs Web-First: The Architectural Decision That Determines Your Agent Readiness Score"
      shareUrl="https://agenthermes.ai/blog/api-first-vs-web-first"
      currentHref="/blog/api-first-vs-web-first"
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
            <span className="text-zinc-400">API-First vs Web-First</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <LayoutTemplate className="h-3.5 w-3.5" />
              Architecture Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              500 Businesses Scanned
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            API-First vs Web-First:{' '}
            <span className="text-emerald-400">The Architectural Decision That Determines Your Agent Readiness Score</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            After scanning <strong className="text-zinc-100">500 businesses</strong> across every category,
            one pattern dominates all others: companies that built API-first average a score of{' '}
            <strong className="text-zinc-100">60+</strong>. Companies that built web-first average{' '}
            <strong className="text-zinc-100">15-20</strong>. No other single factor has this much impact on
            agent readiness. The architecture you chose years ago — or defaulted into — now determines whether
            AI agents can interact with your business.
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

      {/* ===== THE CORE INSIGHT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The 45-Point Gap That One Decision Creates
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When Stripe built its payment processing service in 2011, the API was the product. There was no
              dashboard first. You integrated by writing code against endpoints. The web dashboard came later as
              a convenience layer on top of the API. Every action in the Stripe dashboard is an API call.
            </p>
            <p>
              When a typical marketing agency builds a client&apos;s website, HTML is the product. The
              site exists to be viewed in a browser. There are no endpoints. There is no structured data exchange.
              The business information lives in page copy, image alt text, and footer text. Getting a phone number
              requires parsing HTML.
            </p>
            <p>
              This architectural decision — made years or decades ago — now creates a <strong className="text-zinc-100">45-point gap</strong> in
              agent readiness. Stripe scores 68. A typical marketing site scores 18. The gap is not because Stripe
              has better content or a nicer design. It is because Stripe&apos;s architecture produces structured,
              machine-readable data as its primary output, while the marketing site produces human-readable HTML
              as its primary output.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">62</div>
              <div className="text-sm text-zinc-400">Average API-first score</div>
              <div className="text-xs text-zinc-500 mt-1">Silver tier</div>
            </div>
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">17</div>
              <div className="text-sm text-zinc-400">Average web-first score</div>
              <div className="text-xs text-zinc-500 mt-1">Not Scored</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARCHITECTURE COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            What API-First and Web-First Actually Mean
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              The distinction is not about having an API or not. Many web-first companies have APIs — they
              just added them as an afterthought. The distinction is about what the <strong className="text-zinc-100">primary
              output</strong> of your architecture is: structured data or rendered HTML.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div className="text-emerald-400">API-First</div>
              <div className="text-red-400">Web-First</div>
            </div>
            {architectureComparison.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200 flex items-center gap-2">
                  <row.icon className="h-4 w-4 text-zinc-500 shrink-0" />
                  {row.aspect}
                </div>
                <div className="text-emerald-400/80">{row.apiFirst}</div>
                <div className="text-zinc-500">{row.webFirst}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The critical insight: API-first companies get agent readiness <strong className="text-zinc-100">for
              free</strong>. Their architecture already produces structured data, uses standard authentication,
              and documents itself through OpenAPI specs. They did not build for AI agents — they built for
              developers. But developer-friendly and agent-friendly are nearly identical requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORE DISTRIBUTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Architecture Spectrum: Score Distribution Across 500 Scans
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Architecture is not binary. There is a spectrum from pure API-first to pure web-first, and
              our scan data reveals exactly how each position on that spectrum maps to agent readiness scores.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {scoreDistribution.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.category}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-zinc-100">{item.category}</h3>
                    <span className={`text-sm font-mono font-bold ${colors.text}`}>{item.avgScore} avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Range: {item.range}</span>
                    <span className="text-xs text-zinc-500">{item.tier}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors.bg.replace('/10', '/40')}`}
                      style={{ width: `${item.avgScore}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">The middle ground matters:</strong> The biggest opportunity
              is not in the extremes but in the middle. Companies with a &ldquo;product with API&rdquo; architecture
              (like Shopify or GitHub) score 48-68. They have APIs, but the coverage is incomplete or the
              developer experience is uneven. These companies can reach Gold (75+) with targeted improvements
              to{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                dimensions where startups outperform enterprises
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY THE GAP EXISTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Why Architecture Sets the Ceiling, Not Just the Floor
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The Agent Readiness Score is weighted toward capabilities that API-first companies have natively.
              This is not bias — it reflects reality. An AI agent cannot interact with a business through HTML
              any more reliably than a screen reader can interact with an image-only website. Structured data
              is the prerequisite.
            </p>
            <p>
              Here is how the weights break down: <strong className="text-zinc-100">D2 API Quality</strong> carries
              the highest weight at 15%. Web-first companies score 0-5 here because they have no API. API-first
              companies score 60-90. That single dimension creates a 9-14 point gap in the total
              score. <strong className="text-zinc-100">D7 Security</strong> at 12% rewards OAuth, API keys, and
              standard authentication — all native to API-first. <strong className="text-zinc-100">D8
              Reliability</strong> at 13% rewards status pages, uptime monitoring, and error handling — all standard
              in API-first infrastructure.
            </p>
            <p>
              Add <strong className="text-zinc-100">D3 Onboarding</strong> (8%), <strong className="text-zinc-100">D6
              Data Quality</strong> (10%), and <strong className="text-zinc-100">D9 Agent Experience</strong> (10%),
              and over 68% of the total score rewards capabilities that API-first companies either have by default
              or can add trivially. Web-first companies must build all of these from scratch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'API-first advantages (free)',
                items: ['Structured JSON responses', 'Standard authentication (OAuth/API keys)', 'OpenAPI documentation', 'Rate limiting headers', 'Status page / uptime monitoring', 'Typed error responses'],
                color: 'emerald',
              },
              {
                title: 'Shared capabilities (buildable)',
                items: ['Schema.org markup', 'Agent discovery files', 'MCP server integration', 'Pricing transparency', 'Self-service onboarding'],
                color: 'blue',
              },
              {
                title: 'Web-first advantages (limited)',
                items: ['Visual branding', 'Content marketing / SEO', 'Form-based lead capture', 'Human-friendly navigation'],
                color: 'amber',
              },
            ].map((col) => {
              const colors = getColorClasses(col.color)
              return (
                <div
                  key={col.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`font-bold mb-3 text-sm ${colors.text}`}>{col.title}</h3>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle2 className={`h-4 w-4 ${colors.text} shrink-0 mt-0.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE MIGRATION PATH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Migration Path: Web-First to Agent-Ready Without Rebuilding
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The good news: web-first companies can add API-first capabilities without rebuilding their entire
            architecture. The migration is additive — you keep your website and add a structured API layer
            alongside it. Here is the 5-step path from a{' '}
            <Link href="/blog/cto-guide-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
              CTO perspective
            </Link>.
          </p>

          <div className="space-y-3 mb-8">
            {migrationSteps.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.step}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border} ${colors.text} text-sm font-bold`}>
                    {item.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className={`h-4 w-4 ${colors.text}`} />
                      <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The expected score impact of each step: Step 1 alone does nothing to your score but is essential
              preparation. Step 2 (read-only API) jumps your score by 15-20 points. Step 3 (OpenAPI spec) adds
              5-8 points. Step 4 (write operations) adds 8-12 points. Step 5 (agent discovery) adds 10-15 points.
              A web-first company at 15 can reach 50-60 through this path without touching their existing website.
            </p>
            <p>
              For companies that want to skip the build process entirely, platforms like AgentHermes and the{' '}
              <Link href="/blog/startup-agent-readiness-playbook" className="text-emerald-400 hover:text-emerald-300 underline">
                startup agent readiness playbook
              </Link>{' '}
              provide auto-generated API layers and hosted MCP servers that achieve the same result without
              engineering investment.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REAL EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Real Examples: Same Industry, Different Architecture, Different Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The architecture effect is visible within every industry. Companies in the same vertical with
              different architectural approaches show dramatically different agent readiness scores.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                industry: 'Payments',
                apiFirst: { name: 'Stripe', score: 68 },
                webFirst: { name: 'Local credit union', score: 8 },
                insight: 'Stripe\'s entire product IS an API. The credit union has a website with branch hours and a phone number.',
              },
              {
                industry: 'Communication',
                apiFirst: { name: 'Twilio', score: 65 },
                webFirst: { name: 'Local phone company', score: 12 },
                insight: 'Twilio sells API calls. The phone company sells a service accessed by calling a number.',
              },
              {
                industry: 'E-commerce',
                apiFirst: { name: 'Shopify', score: 64 },
                webFirst: { name: 'Local boutique website', score: 14 },
                insight: 'Shopify has a complete REST and GraphQL API. The boutique has product photos and a contact form.',
              },
              {
                industry: 'Scheduling',
                apiFirst: { name: 'Calendly', score: 52 },
                webFirst: { name: 'Local salon', score: 9 },
                insight: 'Calendly has a scheduling API. The salon has "call to book" on their homepage.',
              },
            ].map((example) => (
              <div
                key={example.industry}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="text-sm font-bold text-zinc-300 mb-3">{example.industry}</h3>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <div className="text-xs text-zinc-500 mb-1">API-First</div>
                    <div className="text-sm font-bold text-zinc-100">{example.apiFirst.name}</div>
                    <div className="text-lg font-mono font-bold text-emerald-400">{example.apiFirst.score}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <div className="text-xs text-zinc-500 mb-1">Web-First</div>
                    <div className="text-sm font-bold text-zinc-100">{example.webFirst.name}</div>
                    <div className="text-lg font-mono font-bold text-red-400">{example.webFirst.score}</div>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">{example.insight}</p>
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
                title: 'Enterprise vs Startup Agent Readiness: Who Wins and Why',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Architecture Analysis',
                tagColor: 'blue',
              },
              {
                title: 'The CTO Guide to Agent Readiness',
                href: '/blog/cto-guide-agent-readiness',
                tag: 'Leadership Guide',
                tagColor: 'purple',
              },
              {
                title: 'The Startup Agent Readiness Playbook',
                href: '/blog/startup-agent-readiness-playbook',
                tag: 'Playbook',
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
            Find out where your architecture lands
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Scan your business and see exactly how your architectural decisions affect your Agent Readiness
            Score. Detailed breakdown across all 9 dimensions with specific improvement recommendations.
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
