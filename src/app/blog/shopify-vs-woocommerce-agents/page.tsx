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
  Compass,
  CreditCard,
  Database,
  FileCode2,
  FileJson,
  Globe2,
  HelpCircle,
  Lock,
  Package,
  Puzzle,
  Search,
  Server,
  Shield,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Shopify vs WooCommerce for Agent Readiness: The E-Commerce Platform Showdown | AgentHermes',
  description:
    'Dimension-by-dimension comparison of Shopify and WooCommerce agent readiness. Shopify wins D1 Discoverability with public /products.json endpoints. WooCommerce wins D2 API depth with the Store API. Average scores from our 500-business scan: Shopify ~28-35, WooCommerce ~25-40. Neither ships agent-native out of the box.',
  keywords: [
    'Shopify vs WooCommerce agents',
    'Shopify agent readiness',
    'WooCommerce agent readiness',
    'ecommerce platform comparison',
    'Shopify products.json',
    'WooCommerce Store API',
    'agent-ready ecommerce',
    'MCP for Shopify',
    'MCP for WooCommerce',
  ],
  openGraph: {
    title: 'Shopify vs WooCommerce for Agent Readiness: The E-Commerce Platform Showdown',
    description:
      'Dimension-by-dimension comparison. Shopify wins on discoverability, WooCommerce wins on depth. Neither ships agent-native — here is the fix for both.',
    url: 'https://agenthermes.ai/blog/shopify-vs-woocommerce-agents',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shopify vs WooCommerce for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify vs WooCommerce for Agent Readiness',
    description:
      'Dimension-by-dimension comparison from 500-business scan data. Shopify locked, WooCommerce flexible. Neither ships agent-native.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/shopify-vs-woocommerce-agents',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface DimensionRow {
  dimension: string
  weight: string
  shopify: string
  woo: string
  edge: 'shopify' | 'woo' | 'tie'
}

const dimensionRows: DimensionRow[] = [
  { dimension: 'D1 Discoverability', weight: '12%', shopify: 'Public /products.json + /collections.json on every store', woo: 'wp-json only if unblocked, often 403', edge: 'shopify' },
  { dimension: 'D2 API Quality', weight: '15%', shopify: 'Admin + Storefront GraphQL, REST deprecating', woo: 'REST + Store API with cart + checkout depth', edge: 'woo' },
  { dimension: 'D3 Onboarding', weight: '8%', shopify: 'OAuth apps, CLI dev store in 2 minutes', woo: 'Manual plugin install, per-site dev setup', edge: 'shopify' },
  { dimension: 'D4 Pricing', weight: '5%', shopify: 'Price public on /products.json', woo: 'Price public on /wp-json/wc/store/products', edge: 'tie' },
  { dimension: 'D5 Payment', weight: '8%', shopify: 'Shopify Payments, Pay Button, Checkout API', woo: 'WC Store API checkout, Stripe/PayPal plugins', edge: 'shopify' },
  { dimension: 'D6 Data Quality', weight: '10%', shopify: 'Structured JSON, consistent schema', woo: 'Varies by plugin, richer taxonomy support', edge: 'shopify' },
  { dimension: 'D7 Security', weight: '12%', shopify: 'Platform-managed, OAuth scopes, HMAC webhooks', woo: 'Self-managed, Application Passwords, legacy plugins', edge: 'shopify' },
  { dimension: 'D8 Reliability', weight: '13%', shopify: 'Platform uptime, public status.shopify.com', woo: 'Depends on host — ranges wildly', edge: 'shopify' },
  { dimension: 'D9 Agent Experience', weight: '10%', shopify: 'Structured errors, rate-limit headers, cursor pagination', woo: 'Inconsistent, depends on plugin stack', edge: 'shopify' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Which platform scores higher on Agent Readiness — Shopify or WooCommerce?',
    answer:
      'On average, Shopify stores score slightly higher across our 500-business scan — roughly 28-35 for a default Shopify store versus 25-40 for a default WooCommerce store. The WooCommerce range is wider because hosting and plugin configuration dominate the outcome. A well-configured WooCommerce store on managed hosting with the Store API exposed can outscore a bare Shopify store. A WooCommerce store with wp-json blocked at the firewall scores below Bronze. Neither platform ships agent-native out of the box.',
  },
  {
    question: 'What does Shopify do well for AI agents by default?',
    answer:
      'Three things. First, every Shopify store serves /products.json and /collections.json publicly — a guaranteed D1 Discoverability win without any merchant action. Second, the Shopify platform handles OAuth, webhook signing, rate-limit headers, and structured errors consistently across every tenant, giving D7, D8, and D9 a floor that WooCommerce lacks. Third, Shopify&rsquo;s status page and published SLAs give agents predictable reliability signals. What Shopify lacks: agent-card.json, llms.txt, and an MCP server are not generated by default, and the platform is a walled garden for custom protocol extensions.',
  },
  {
    question: 'What does WooCommerce do well for AI agents by default?',
    answer:
      'Depth and flexibility. The WooCommerce Store API exposes cart state, checkout, reviews, and tax calculations in ways the Shopify Storefront API locks behind Plus-tier plans. Because WooCommerce runs on your own hosting you can install an MCP server plugin, serve agent-card.json at /.well-known/agent-card.json, publish an llms.txt file, and customize the agent surface however you want. What WooCommerce lacks by default: the wp-json endpoint is often blocked at the firewall level, plugin stack heterogeneity makes D6 and D9 unpredictable, and the security surface depends entirely on how disciplined the operator is.',
  },
  {
    question: 'Can I get a high Agent Readiness Score on either platform?',
    answer:
      'Yes — both platforms can reach Silver (60+) with the right configuration. On Shopify: install a public app that publishes agent-card.json and llms.txt, expose an MCP server via a hosted proxy, and link them from your domain root. On WooCommerce: unblock wp-json at the firewall, install a structured-data plugin (Yoast or Rank Math), add an agent-card.json to /.well-known/, and publish llms.txt. The AgentHermes platform ships an auto-configuration for both stacks that takes the average Shopify store from 30 to 60+ and the average WooCommerce store from 27 to 60+ in under 15 minutes.',
  },
  {
    question: 'Which platform should I pick if I am starting a new agent-ready store?',
    answer:
      'It depends on your priorities. Pick Shopify if you want the lowest configuration overhead — security, reliability, and consistent APIs are handled for you, and /products.json is agent-discoverable from day one. Pick WooCommerce if you need protocol-level flexibility — custom MCP tools, deep WordPress content integration, or self-hosted control. For most merchants on the first day of the agent economy, Shopify is the lower-risk default and WooCommerce is the higher-ceiling option for teams willing to invest in configuration.',
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

export default function ShopifyVsWooCommerceAgentsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Shopify vs WooCommerce for Agent Readiness: The E-Commerce Platform Showdown',
    description:
      'Dimension-by-dimension comparison of Shopify and WooCommerce for AI agent readiness. Data from our 500-business scan.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/shopify-vs-woocommerce-agents',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Platform Analysis',
    wordCount: 1950,
    keywords:
      'Shopify vs WooCommerce agents, Shopify agent readiness, WooCommerce agent readiness, ecommerce platform comparison, MCP for Shopify, MCP for WooCommerce',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Shopify vs WooCommerce for Agent Readiness',
          item: 'https://agenthermes.ai/blog/shopify-vs-woocommerce-agents',
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
      title="Shopify vs WooCommerce for Agent Readiness: The E-Commerce Platform Showdown"
      shareUrl="https://agenthermes.ai/blog/shopify-vs-woocommerce-agents"
      currentHref="/blog/shopify-vs-woocommerce-agents"
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
            <span className="text-zinc-400">Shopify vs WooCommerce for Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <ShoppingBag className="h-3.5 w-3.5" />
              Platform Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              Comparison
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Shopify vs WooCommerce for Agent Readiness:{' '}
            <span className="text-emerald-400">The E-Commerce Platform Showdown</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            A dimension-by-dimension comparison from our 500-business scan. Shopify wins on
            <strong className="text-zinc-100"> Discoverability</strong> with public /products.json
            endpoints. WooCommerce wins on <strong className="text-zinc-100">API depth</strong> with
            the Store API. Average agent readiness: Shopify ~28-35, WooCommerce ~25-40 (wider range
            due to config flexibility). Neither ships agent-native out of the box. Here is the full
            breakdown and the fix for both.
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

      {/* ===== THE STARTING LINE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Store className="h-5 w-5 text-emerald-500" />
            The Starting Line: Two Platforms, Two Default Scores
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes has scanned more than 500 businesses. A sizable slice of those are
              e-commerce stores running on Shopify or WooCommerce — the two platforms that, between
              them, power well over half the world&rsquo;s online stores. The question merchants keep
              asking us is simple: which platform is better for AI agents?
            </p>
            <p>
              The honest answer is that <strong className="text-zinc-100">neither ships
              agent-native</strong>. Both platforms were designed for humans browsing stores, not for
              agents buying on behalf of users. But the platforms have very different strengths, and
              understanding those strengths tells you which one you can push higher on the Agent
              Readiness Score with the least effort.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '28-35', label: 'Shopify avg score', icon: ShoppingBag },
              { value: '25-40', label: 'WooCommerce avg score', icon: Globe2 },
              { value: '500', label: 'businesses scanned', icon: BarChart3 },
              { value: '9', label: 'scoring dimensions', icon: Target },
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

      {/* ===== DIMENSION BY DIMENSION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Dimension-by-Dimension Scorecard
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            All nine AgentHermes dimensions, scored on default out-of-the-box behavior. The{' '}
            <span className="text-emerald-400 font-semibold">edge</span> column shows which platform
            wins that dimension assuming zero configuration effort.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-[1.3fr_0.5fr_1.3fr_1.3fr_0.7fr] bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Weight</div>
              <div>Shopify</div>
              <div>WooCommerce</div>
              <div>Edge</div>
            </div>
            {dimensionRows.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-[1.3fr_0.5fr_1.3fr_1.3fr_0.7fr] p-4 text-xs ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-zinc-500">{row.weight}</div>
                <div className="text-zinc-400 leading-relaxed pr-2">{row.shopify}</div>
                <div className="text-zinc-400 leading-relaxed pr-2">{row.woo}</div>
                <div className={
                  row.edge === 'shopify' ? 'text-emerald-400 font-semibold' :
                  row.edge === 'woo' ? 'text-blue-400 font-semibold' :
                  'text-zinc-500 font-semibold'
                }>
                  {row.edge === 'shopify' ? 'Shopify' : row.edge === 'woo' ? 'WooCommerce' : 'Tie'}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Shopify wins 7 of 9 dimensions on out-of-the-box behavior. WooCommerce wins D2 API
              Quality outright thanks to the Store API&rsquo;s depth, and ties on D4 Pricing
              Transparency. The spread is largest on D8 Reliability — Shopify&rsquo;s platform status
              page is consistent across every store, while WooCommerce uptime depends entirely on who
              is hosting it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SHOPIFY STRENGTHS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-500" />
            Where Shopify Wins: The Locked Ecosystem Advantage
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Shopify&rsquo;s biggest agent-readiness strength is also its biggest long-term
              limitation: every store behaves the same. That consistency means an agent that
              learned to interact with one Shopify store can interact with any of the other 4.6
              million Shopify stores on the internet. The same endpoints, the same auth flow, the
              same rate-limit headers, the same error shapes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Public /products.json on every store',
                detail:
                  'Any Shopify domain responds to /products.json with a full product catalog. Instant D1 Discoverability win with zero merchant action. No WooCommerce equivalent is guaranteed.',
                icon: FileJson,
              },
              {
                title: 'Consistent OAuth surface',
                detail:
                  'The Shopify App OAuth flow is identical across every store. Agents can generalize one integration pattern to millions of merchants. D3 Onboarding wins on consistency.',
                icon: Lock,
              },
              {
                title: 'HMAC-signed webhooks by default',
                detail:
                  'Every Shopify webhook includes X-Shopify-Hmac-Sha256. Agents can trust the sender without per-merchant configuration — a D7 Security win.',
                icon: Shield,
              },
              {
                title: 'Status page for the entire platform',
                detail:
                  'status.shopify.com is machine-readable and covers every store. D8 Reliability gets a floor that WooCommerce simply cannot match across self-hosted sites.',
                icon: Server,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The locked-ecosystem cost:</strong> Shopify controls
              what extensions you can ship. An agent-card.json at /.well-known/ requires DNS-level
              work or an app store app. MCP servers are not first-party. Custom protocol adoption is
              bottlenecked on Shopify&rsquo;s roadmap. WooCommerce has none of those restrictions.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WOOCOMMERCE STRENGTHS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Puzzle className="h-5 w-5 text-blue-500" />
            Where WooCommerce Wins: Depth and Flexibility
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              WooCommerce&rsquo;s advantage is that it is WordPress. You own the hosting, the theme,
              the plugin stack, the DNS. Anything you want to put on your domain, you can. That is
              the difference between a platform and a framework — and for agent readiness, the
              framework wins the ceiling even if it loses the floor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Store API depth (cart, checkout, reviews, taxes)',
                detail:
                  '/wp-json/wc/store/v1/cart and /checkout give agents full session state and transaction ability in a single API — something Shopify gates behind its Checkout UI or Plus-tier Storefront.',
                icon: Database,
              },
              {
                title: 'Own /.well-known/ path',
                detail:
                  'Drop agent-card.json, llms.txt, openapi.json wherever you want. No app store review. No platform permission. Direct D1 + D9 wins in one deploy.',
                icon: Compass,
              },
              {
                title: 'MCP server plugin possible',
                detail:
                  'Because WooCommerce runs on your server, you can install a WordPress plugin that exposes an MCP server at /mcp/ or a subdomain. Shopify forbids this at the platform level.',
                icon: Code2,
              },
              {
                title: 'Rich WordPress content surface',
                detail:
                  'Agents shopping in a specialized vertical — peptides, skincare, books — need content context, not just products. WordPress gives them that via the posts API and structured categories.',
                icon: FileCode2,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-blue-400" />
                  <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The flexibility cost:</strong> The majority of
              WooCommerce sites in our scan have wp-json blocked at the firewall — a well-intentioned
              security move that also blocks agents completely. When agents cannot even enumerate
              products, nothing else matters. This is the single biggest reason WooCommerce stores
              can score below 20 while a bare Shopify store scores 30.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE FIX FOR BOTH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Fix: Both Platforms Need an agent-card.json Layer
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Neither platform ships agent-native. Neither will for at least 12 months. The gap is
            filled by a platform-neutral plugin or app that injects the four agent-economy primitives
            both stacks are missing.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'agent-card.json at /.well-known/agent-card.json',
                detail:
                  'Identity, skills, endpoints. On Shopify this is served by a Shopify App via the proxy URL. On WooCommerce this is a plugin that writes to /.well-known/ directly. Lifts D1 Discoverability by 4-5 points.',
                icon: FileJson,
              },
              {
                step: '2',
                title: 'llms.txt at the domain root',
                detail:
                  'Markdown primer for AI crawlers. Store description, catalog summary, support contact, pricing, policies. The single cheapest D1 win on either platform.',
                icon: FileCode2,
              },
              {
                step: '3',
                title: 'Hosted MCP server',
                detail:
                  'AgentHermes auto-generates an MCP endpoint at /api/mcp/hosted/{slug} with tools for search_products, check_inventory, get_pricing, create_order. Works with both Shopify and WooCommerce via platform-specific adapters.',
                icon: Server,
              },
              {
                step: '4',
                title: 'OpenAPI spec for your storefront',
                detail:
                  'On Shopify, wrap the Storefront API in your own OpenAPI-documented endpoints. On WooCommerce, expose the Store API via an OpenAPI-generating plugin. Lifts D2 API Quality by 5-8 points.',
                icon: Code2,
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
              Shipping all four moves the average Shopify store from 30 to ~62 (solidly Silver) and
              the average WooCommerce store from 27 to ~65 (also Silver, with higher ceiling). The
              difference is that WooCommerce owners can go further — 75+ Gold is achievable with
              extra MCP tool depth and custom event webhooks — while Shopify owners will plateau
              near 70 until Shopify ships first-party agent infrastructure.
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
                title: 'E-commerce Agent Readiness: Why Checkout Is the Weak Link',
                href: '/blog/ecommerce-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'WordPress Agent Readiness: Why 43% of the Internet Fails',
                href: '/blog/wordpress-agent-readiness',
                tag: 'Platform Analysis',
                tagColor: 'amber',
              },
              {
                title: 'See your store Agent Readiness Score in 60 seconds',
                href: '/audit',
                tag: 'Free Audit',
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
            Score your Shopify or WooCommerce store
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes auto-detects your platform, runs the 9-dimension scan, and generates a
            specific fix plan for your stack. Free, 60 seconds, no signup.
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
              Connect My Store
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
