import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  HelpCircle,
  Layers,
  Package,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  TrendingDown,
  TrendingUp,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'E-Commerce Agent Readiness: Why Shopify and Square Score Under 30 | AgentHermes',
  description:
    'E-commerce averages 28/100 on the Agent Readiness Score. Square scored 8 — the lowest major platform. Shopify stores average 30. We break down why and what agent-ready e-commerce looks like.',
  keywords: [
    'ecommerce agent readiness',
    'shopify agent readiness',
    'square agent readiness score',
    'woocommerce AI agents',
    'ecommerce MCP server',
    'agent readiness score ecommerce',
    'AI agent ecommerce',
    'online store AI readiness',
    'shopify AI integration',
  ],
  openGraph: {
    title: 'E-Commerce Agent Readiness: Why Shopify and Square Score Under 30',
    description:
      'E-commerce averages 28/100 on the Agent Readiness Score. Square scored 8. Shopify stores average 30. Here is what agent-ready e-commerce actually looks like.',
    url: 'https://agenthermes.ai/blog/ecommerce-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'E-Commerce Agent Readiness: Why Shopify and Square Score Under 30',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Commerce Agent Readiness: Why Shopify and Square Score Under 30',
    description:
      'E-commerce averages 28/100 on Agent Readiness. Square scored 8. Shopify ~30. WooCommerce has depth but poor discoverability.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/ecommerce-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformScores = [
  { platform: 'Shopify Stores', score: '~30', tier: 'Bronze', color: 'amber', icon: ShoppingCart },
  { platform: 'WooCommerce Stores', score: '~25', tier: 'Not Scored', color: 'red', icon: Globe },
  { platform: 'Square', score: '8', tier: 'Not Scored', color: 'red', icon: Store },
  { platform: 'E-Commerce Average', score: '28', tier: 'Not Scored', color: 'red', icon: Package },
]

const squareFailures = [
  {
    dimension: 'D1 Discoverability',
    score: '2/12',
    problem: 'No public API endpoints for agents to discover. No agent-card.json, no llms.txt, no structured product feeds accessible without authentication.',
  },
  {
    dimension: 'D2 API Quality',
    score: '0/15',
    problem: 'Square APIs exist but are entirely behind OAuth with no public endpoints. An agent cannot even see what products a Square store sells without pre-authorized credentials.',
  },
  {
    dimension: 'D3 Onboarding',
    score: '1/8',
    problem: 'Phone-only support for developer accounts. No self-service API key generation for agents. Manual approval process that assumes a human developer.',
  },
  {
    dimension: 'D4 Pricing',
    score: '0/5',
    problem: 'No structured, machine-readable pricing for API access. No programmatic way for an agent to understand Square pricing tiers or transaction fees.',
  },
  {
    dimension: 'D5 Payment',
    score: '1/8',
    problem: 'Ironically, despite being a payment company, Square has no agent-accessible payment mechanism for API usage. Agents cannot self-provision or pay for access.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does e-commerce score so low on agent readiness?',
    answer:
      'E-commerce platforms were built for human shoppers browsing websites, not AI agents making programmatic requests. Most stores lack structured product APIs, machine-readable inventory data, and agent-accessible checkout flows. The average e-commerce Agent Readiness Score is just 28/100 because most stores fail on 7 out of 9 scoring dimensions.',
  },
  {
    question: 'How did Square score only 8 out of 100?',
    answer:
      'Square scored 8 because it has virtually no public-facing agent infrastructure. Its APIs require OAuth authentication with no public endpoints, it offers no agent-card.json or llms.txt, has phone-only developer support, no machine-readable pricing, and no way for agents to self-provision access. Despite being a major tech company, Square is nearly invisible to AI agents.',
  },
  {
    question: 'Is Shopify more agent-ready than WooCommerce?',
    answer:
      'Shopify has a slight edge in discoverability because every Shopify store automatically gets public JSON endpoints at /products.json and /collections.json. This gives agents a way to discover product data without authentication. WooCommerce has deeper API capabilities through its Store API, but stores must explicitly enable and configure it. Neither platform scores above 35 without additional agent infrastructure like MCP servers and agent cards.',
  },
  {
    question: 'What would a fully agent-ready e-commerce store look like?',
    answer:
      'A fully agent-ready store would have: structured product data with real-time inventory accessible via API, an MCP server with tools like search_products, check_inventory, and create_order, an agent-card.json for discovery, machine-readable pricing and shipping policies, automated checkout that agents can complete programmatically, and structured return/refund policies. This would score 75+ (Gold tier).',
  },
  {
    question: 'Can AgentHermes make my e-commerce store agent-ready?',
    answer:
      'Yes. AgentHermes has adapters for Shopify, WooCommerce, and Square that auto-generate MCP tools for your store. The /connect wizard detects your platform and creates agent-accessible endpoints for product search, inventory checks, and order placement. You can go from a score of 25 to 60+ in under 5 minutes.',
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

export default function EcommerceAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'E-Commerce Agent Readiness: Why Shopify and Square Score Under 30',
    description:
      'E-commerce averages 28/100 on the Agent Readiness Score. Square scored 8 — the lowest major platform. Deep analysis of why e-commerce is failing at agent readiness and what the fix looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/ecommerce-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Industry Analysis',
    wordCount: 1800,
    keywords:
      'ecommerce agent readiness, shopify agent readiness, square agent score, woocommerce AI agents, MCP server ecommerce',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'E-Commerce Agent Readiness',
          item: 'https://agenthermes.ai/blog/ecommerce-agent-readiness',
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
      title="E-Commerce Agent Readiness: Why Shopify and Square Score Under 30"
      shareUrl="https://agenthermes.ai/blog/ecommerce-agent-readiness"
      currentHref="/blog/ecommerce-agent-readiness"
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">E-Commerce Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <ShoppingCart className="h-3.5 w-3.5" />
              Industry Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <TrendingDown className="h-3.5 w-3.5" />
              Average Score: 28/100
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            E-Commerce Agent Readiness:{' '}
            <span className="text-amber-400">Why Shopify and Square Score Under 30</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            We scanned hundreds of e-commerce businesses across Shopify, WooCommerce, and Square.
            The average Agent Readiness Score is <strong className="text-zinc-100">28 out of 100</strong> —
            the lowest of any major tech-enabled vertical. Square scored just 8. Here is why online
            stores built for human shoppers are failing AI agents.
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

      {/* ===== PLATFORM SCORECARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            The E-Commerce Scorecard
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Out of 500 businesses scanned by AgentHermes, e-commerce is the worst-performing
            tech-enabled vertical. These are businesses that already have websites, payment processing,
            and product databases — yet they score lower than restaurants and dentists on agent readiness.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {platformScores.map((p) => {
              const colors = getColorClasses(p.color)
              return (
                <div
                  key={p.platform}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <p.icon className={`h-5 w-5 ${colors.text} mx-auto mb-2`} />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{p.score}</div>
                  <div className="text-xs text-zinc-500 mt-1">{p.platform}</div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mt-2`}>
                    {p.tier}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The paradox:</strong> E-commerce is the most digitized
              business category — online stores, payment APIs, product databases, inventory systems. Yet
              it scores <strong className="text-zinc-100">28/100</strong> on agent readiness because all of
              that infrastructure was built for humans clicking buttons, not agents making API calls.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SQUARE DEEP DIVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Square Scored 8: The Lowest Major Platform
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Square is a $40 billion company that processes payments for millions of businesses. It has
            APIs, SDKs, and a developer platform. And it scored <strong className="text-zinc-100">8 out
            of 100</strong> on agent readiness — the lowest score of any major technology company in our
            database. Here is the dimension-by-dimension breakdown.
          </p>

          <div className="space-y-3 mb-8">
            {squareFailures.map((failure) => (
              <div
                key={failure.dimension}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100 text-sm">{failure.dimension}</h3>
                  <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                    {failure.score}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{failure.problem}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The core problem with Square is that its entire platform assumes a human developer will
              manually set up OAuth credentials, read documentation, and build a custom integration.
              There is no path for an AI agent to autonomously discover a Square-powered store,
              understand its products, and complete a purchase. From an agent&apos;s perspective,
              a Square store might as well not exist.
            </p>
            <p>
              This matters because Square powers an estimated <strong className="text-zinc-100">4 million
              businesses</strong> in the US alone. Every one of them is invisible to AI agents — not
              because they lack technology, but because that technology was never designed with
              autonomous discovery in mind.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SHOPIFY ANALYSIS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-amber-500" />
            Shopify: Better but Still Bronze
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Shopify stores average around <strong className="text-zinc-100">30/100</strong> — better
              than Square&apos;s 8, but still firmly in Bronze territory. Shopify has one significant
              advantage: every store automatically gets public JSON endpoints.
            </p>
            <p>
              Visit any Shopify store and append <code className="text-amber-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/products.json</code> to
              the URL. You get a structured feed of every product with titles, descriptions, prices,
              images, and variants. Add <code className="text-amber-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/collections.json</code> and
              you see the store&apos;s category structure. This is a massive head start on discoverability.
            </p>
            <p>
              But discoverability alone does not make a store agent-ready. Shopify stores still fail on:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'No MCP server or agent card',
                detail: 'Agents cannot discover Shopify stores through standard agent protocols. There is no agent-card.json, no llms.txt, and no MCP endpoint.',
                icon: Server,
                color: 'red',
              },
              {
                title: 'No programmatic checkout',
                detail: 'An agent can see products but cannot buy them. Shopify checkout requires a browser session with cookies, CAPTCHA, and human interaction.',
                icon: CreditCard,
                color: 'red',
              },
              {
                title: 'No real-time inventory API',
                detail: 'The public JSON endpoint does not include real-time stock levels. An agent might recommend an out-of-stock product because it cannot check availability.',
                icon: Package,
                color: 'amber',
              },
              {
                title: 'No structured policies',
                detail: 'Return policies, shipping rates, and warranty information are buried in HTML pages. Agents cannot parse these to answer customer questions.',
                icon: Shield,
                color: 'amber',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className={`h-5 w-5 ${colors.text}`} />
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The result: Shopify stores are <em>partially visible</em> but not <em>usable</em> by agents.
              An AI assistant can tell a user what products a store sells, but it cannot check if items
              are in stock, calculate shipping, or complete a purchase. That is the difference between
              a score of 30 and a score of 75.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WOOCOMMERCE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            WooCommerce: Deep APIs, Poor Discoverability
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              WooCommerce is the opposite of Shopify in agent readiness. It has a powerful{' '}
              <strong className="text-zinc-100">Store API</strong> that gives programmatic access to
              products, orders, customers, shipping zones, tax rates, and more. An agent with API
              credentials can do nearly anything a human store manager can.
            </p>
            <p>
              But WooCommerce stores average only <strong className="text-zinc-100">~25/100</strong> because
              of a critical flaw: <strong className="text-zinc-100">discoverability is nearly zero</strong>.
              Unlike Shopify, WooCommerce does not expose public JSON endpoints by default. The Store
              API must be explicitly enabled, and consumer keys must be generated manually. An agent
              discovering a WooCommerce store for the first time sees a standard WordPress site with
              no machine-readable product data.
            </p>
            <p>
              WooCommerce also suffers from inconsistency. Because it is open-source and runs on
              WordPress, every store is configured differently. Plugins, custom themes, and varied
              hosting environments mean an agent cannot rely on any standard endpoint or data format
              across WooCommerce stores. What works on one store may return a 404 on the next.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">The WooCommerce paradox:</strong> It has the deepest
              API capabilities of any e-commerce platform but the worst discoverability. A WooCommerce
              store with a properly configured Store API, an agent card, and an MCP server could
              theoretically outscore every Shopify store. But almost none have taken those steps.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY E-COMMERCE LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready E-Commerce Actually Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            No e-commerce store in our database scores Gold (75+). But based on the scoring framework
            and what the top SaaS companies do right, here is the blueprint for a Gold-tier online store.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Structured product data via API',
                detail: 'Every product has a machine-readable record with title, price, variants, stock status, images, and category. Accessible via authenticated API or public endpoint.',
                icon: Package,
              },
              {
                step: '2',
                title: 'Real-time inventory checks',
                detail: 'An agent can call check_inventory(product_id) and get a boolean in-stock response with quantity. No scraping product pages for "Add to Cart" button state.',
                icon: Search,
              },
              {
                step: '3',
                title: 'Agent-accessible checkout',
                detail: 'The store exposes create_order and process_payment tools. An agent can add items to a cart, apply discount codes, calculate shipping, and complete a purchase without a browser.',
                icon: CreditCard,
              },
              {
                step: '4',
                title: 'MCP server with standard tools',
                detail: 'search_products, get_product, check_inventory, create_order, track_order, get_policies — all exposed as MCP tools that any agent can discover and call.',
                icon: Server,
              },
              {
                step: '5',
                title: 'Agent card and discovery files',
                detail: 'agent-card.json at /.well-known/agent-card.json, llms.txt at the root, and a registry listing so agents know this store exists and what it sells.',
                icon: Globe,
              },
              {
                step: '6',
                title: 'Structured policies',
                detail: 'Return policy, shipping rates, warranty terms, and payment methods exposed as machine-readable data — not buried in HTML pages that agents cannot parse.',
                icon: Shield,
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              A store implementing all six components would score approximately{' '}
              <strong className="text-zinc-100">75-85/100</strong> — Gold tier. That is a{' '}
              <strong className="text-zinc-100">3x improvement</strong> over the current e-commerce
              average. And the first stores to reach this level will capture agent-driven traffic
              that their competitors cannot even see.
            </p>
            <p>
              AgentHermes already has adapters for all three major platforms. The{' '}
              <Link href="/connect" className="text-emerald-400 hover:text-emerald-300 underline">
                /connect wizard
              </Link>{' '}
              detects whether you run Shopify, WooCommerce, or Square and auto-generates the MCP tools,
              agent card, and registry listing specific to your platform. What took the top SaaS companies
              months of engineering, you can have in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AGENT COMMERCE FUTURE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Why This Matters: The Agent Commerce Shift
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              E-commerce is heading toward a future where a significant percentage of purchases will be
              initiated or completed by AI agents. When a user tells their assistant to &ldquo;reorder
              my vitamins&rdquo; or &ldquo;find me a blue wool sweater under $80 in my size,&rdquo;
              the agent will query the stores it can access programmatically. Stores without agent
              infrastructure will not be in the results.
            </p>
            <p>
              This is not hypothetical. The{' '}
              <Link href="/blog/mcp-gap" className="text-emerald-400 hover:text-emerald-300 underline">
                $6.2B MCP infrastructure gap
              </Link>{' '}
              is already being filled by platforms like AgentHermes. The stores that connect first will
              have a structural advantage — not just in visibility, but in conversion. An agent that can
              check inventory and complete checkout will close the sale. An agent that can only show a
              product page will lose to one that can transact.
            </p>
            <p>
              The average e-commerce score of 28/100 is not just a data point — it is a{' '}
              <strong className="text-zinc-100">competitive opportunity</strong>. When most stores score
              under 30, the first one to score 75 will dominate agent-driven commerce in its category.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                stat: '28',
                label: 'Average e-commerce score',
                subtext: 'Lowest tech-enabled vertical',
              },
              {
                stat: '0',
                label: 'E-commerce stores at Gold',
                subtext: 'Out of 500 scanned',
              },
              {
                stat: '5 min',
                label: 'Time to connect via AgentHermes',
                subtext: 'Auto-detect + generate',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <div className="text-2xl font-bold text-emerald-400">{item.stat}</div>
                <div className="text-sm text-zinc-300 font-medium mt-1">{item.label}</div>
                <div className="text-xs text-zinc-500 mt-1">{item.subtext}</div>
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
                title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
                href: '/blog/mcp-gap',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'The Agent Readiness Leaderboard: Who Is Winning',
                href: '/blog/agent-readiness-leaderboard',
                tag: 'Data Analysis',
                tagColor: 'emerald',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'blue',
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
            Score your e-commerce store
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Find out how your online store scores across all 9 dimensions. The scan takes 60 seconds,
            detects your platform automatically, and shows you exactly what to fix.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Score My Store
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              View Leaderboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
