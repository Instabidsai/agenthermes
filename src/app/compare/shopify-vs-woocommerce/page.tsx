import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Scale,
  ArrowRight,
  Trophy,
  Search,
  BookOpen,
  UserPlus,
  Plug,
  Activity,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  ShoppingCart,
  Globe,
  Code2,
  Lock,
  Server,
  Boxes,
  Package,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

// ---------------------------------------------------------------------------
// Metadata + OG
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Shopify vs WooCommerce: Agent Readiness for E-Commerce | AgentHermes',
  description:
    'Which e-commerce platform is more ready for AI agents? Compare Shopify and WooCommerce on agent readiness across 9 dimensions, auto-detection capabilities, MCP tool generation, and adapter support.',
  openGraph: {
    title: 'Shopify vs WooCommerce: Agent Readiness for E-Commerce',
    description:
      'Which e-commerce platform is more agent-ready? Compare Shopify and WooCommerce on auto-detection, MCP tools, adapter capabilities, and 9-dimension scoring.',
    url: 'https://agenthermes.ai/compare/shopify-vs-woocommerce',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shopify vs WooCommerce Agent Readiness Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify vs WooCommerce: Agent Readiness for E-Commerce',
    description:
      'Which e-commerce platform is more agent-ready? Compare Shopify and WooCommerce on 9 dimensions.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/compare/shopify-vs-woocommerce',
  },
}

// ---------------------------------------------------------------------------
// Score Data
// ---------------------------------------------------------------------------

const SHOPIFY = {
  name: 'Shopify',
  domain: 'shopify.com',
  score: 50,
  tier: 'bronze' as const,
  arl: 1,
  arlName: 'Discoverable',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 36, max: 100 },
    { key: 'D2', label: 'API Quality', score: 50, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 37, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 30, max: 100 },
    { key: 'D5', label: 'Payment', score: 45, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 0, max: 100 },
    { key: 'D7', label: 'Security', score: 67, max: 100 },
    { key: 'D8', label: 'Reliability', score: 75, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 50, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 36, status: 'not-ready' as const },
    { step: 'UNDERSTAND', score: 25, status: 'not-ready' as const },
    { step: 'SIGN UP', score: 37, status: 'not-ready' as const },
    { step: 'CONNECT', score: 59, status: 'partial' as const },
    { step: 'USE', score: 75, status: 'ready' as const },
    { step: 'PAY', score: 38, status: 'not-ready' as const },
  ],
}

const WOOCOMMERCE = {
  name: 'WooCommerce',
  domain: 'woocommerce.com',
  score: 38,
  tier: 'unaudited' as const,
  arl: 0,
  arlName: 'Dark',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 25, max: 100 },
    { key: 'D2', label: 'API Quality', score: 45, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 15, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 35, max: 100 },
    { key: 'D5', label: 'Payment', score: 40, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 20, max: 100 },
    { key: 'D7', label: 'Security', score: 50, max: 100 },
    { key: 'D8', label: 'Reliability', score: 55, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 30, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 25, status: 'not-ready' as const },
    { step: 'UNDERSTAND', score: 25, status: 'not-ready' as const },
    { step: 'SIGN UP', score: 15, status: 'not-ready' as const },
    { step: 'CONNECT', score: 48, status: 'partial' as const },
    { step: 'USE', score: 55, status: 'partial' as const },
    { step: 'PAY', score: 38, status: 'not-ready' as const },
  ] as { step: string; score: number; status: 'ready' | 'partial' | 'not-ready' }[],
}

// ---------------------------------------------------------------------------
// AgentHermes Adapter Capabilities
// ---------------------------------------------------------------------------

const ADAPTER_FEATURES = [
  {
    feature: 'Auto-Detection',
    shopify: 'Detects Shopify via meta tags, CDN URLs (cdn.shopify.com), and Liquid template markers',
    woocommerce: 'Detects WooCommerce via wp-content paths, wc-api endpoints, and generator meta tags',
    shopifyScore: 95,
    wooScore: 85,
  },
  {
    feature: 'Product Catalog MCP Tool',
    shopify: 'Generates get_products tool via Storefront API with GraphQL support, variants, and inventory',
    woocommerce: 'Generates get_products tool via WC REST API with pagination, categories, and attributes',
    shopifyScore: 90,
    wooScore: 80,
  },
  {
    feature: 'Order Management MCP Tool',
    shopify: 'create_order, get_order, cancel_order via Admin API with full lifecycle support',
    woocommerce: 'create_order, get_order, update_order via WC REST API with status transitions',
    shopifyScore: 85,
    wooScore: 75,
  },
  {
    feature: 'Inventory Check MCP Tool',
    shopify: 'Real-time inventory via Storefront API, supports multi-location inventory',
    woocommerce: 'Inventory via product endpoint stock_quantity field, single-location',
    shopifyScore: 90,
    wooScore: 60,
  },
  {
    feature: 'Cart & Checkout MCP Tool',
    shopify: 'Full cart API with draft orders, checkout URLs, and Shopify Payments integration',
    woocommerce: 'Cart via WC Store API (newer) or wc-ajax endpoints, varies by store config',
    shopifyScore: 85,
    wooScore: 55,
  },
  {
    feature: 'Search MCP Tool',
    shopify: 'Product search via Storefront API with predictive search, filters, and facets',
    woocommerce: 'Product search via REST API search parameter, basic keyword matching',
    shopifyScore: 80,
    wooScore: 50,
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function barColor(score: number): string {
  if (score >= 75) return 'bg-emerald-500'
  if (score >= 50) return 'bg-yellow-500'
  if (score >= 25) return 'bg-amber-500'
  return 'bg-red-500'
}

function statusIcon(status: 'ready' | 'partial' | 'not-ready') {
  if (status === 'ready') return <CheckCircle2 className="h-4 w-4 text-emerald-400" />
  if (status === 'partial') return <AlertCircle className="h-4 w-4 text-amber-400" />
  return <XCircle className="h-4 w-4 text-red-400" />
}

function statusColor(status: 'ready' | 'partial' | 'not-ready') {
  if (status === 'ready') return 'text-emerald-400'
  if (status === 'partial') return 'text-amber-400'
  return 'text-red-400'
}

// ---------------------------------------------------------------------------
// Structured Data
// ---------------------------------------------------------------------------

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Shopify vs WooCommerce: Agent Readiness for E-Commerce',
  description:
    'A detailed comparison of Shopify and WooCommerce e-commerce platforms on AI agent readiness, including auto-detection, MCP tool generation, and adapter capabilities.',
  url: 'https://agenthermes.ai/compare/shopify-vs-woocommerce',
  datePublished: '2026-03-30',
  dateModified: '2026-03-30',
  author: {
    '@type': 'Organization',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
  about: [
    {
      '@type': 'SoftwareApplication',
      name: 'Shopify',
      url: 'https://shopify.com',
      applicationCategory: 'BusinessApplication',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'WooCommerce',
      url: 'https://woocommerce.com',
      applicationCategory: 'BusinessApplication',
    },
  ],
  mainEntity: {
    '@type': 'Table',
    about: 'E-Commerce Agent Readiness Comparison',
  },
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ShopifyVsWooCommercePage() {
  const shopifyWins = SHOPIFY.dimensions.filter(
    (d, i) => d.score > WOOCOMMERCE.dimensions[i].score
  ).length
  const wooWins = SHOPIFY.dimensions.filter(
    (d, i) => d.score < WOOCOMMERCE.dimensions[i].score
  ).length
  const ties = 9 - shopifyWins - wooWins

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* ----------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <ShoppingCart className="h-3.5 w-3.5" />
            E-Commerce Agent Readiness
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-green-400">Shopify</span>
            <span className="text-zinc-500 mx-3">vs</span>
            <span className="text-purple-400">WooCommerce</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-2">
            E-Commerce Agent Readiness Comparison
          </p>
          <p className="text-sm text-zinc-500 max-w-3xl mx-auto">
            The two largest e-commerce platforms power millions of online stores. But when an AI agent
            needs to browse products, check inventory, add items to a cart, and complete a purchase --
            which platform makes it easier? We compared both on native agent readiness and our adapter
            capabilities for bridging the gap.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Winner Banner                                                     */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-5 rounded-xl bg-green-500/5 border border-green-500/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold text-zinc-300">
              Overall Winner:{' '}
              <span className="text-green-400">Shopify</span>
              {' '}with a score of{' '}
              <span className="text-white font-bold">{SHOPIFY.score}</span>
              {' '}vs{' '}
              <span className="text-zinc-400">{WOOCOMMERCE.score}</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Shopify wins {shopifyWins} of 9 dimensions, WooCommerce wins {wooWins}, {ties} tied
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Side-by-Side Score Cards                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Shopify */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Hosted E-Commerce
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{SHOPIFY.name}</p>
            <p className="text-xs text-zinc-500">{SHOPIFY.domain}</p>
            <ScoreGauge score={SHOPIFY.score} size="lg" />
            <TierBadge tier={SHOPIFY.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-bold text-blue-400">ARL-{SHOPIFY.arl}: {SHOPIFY.arlName}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              Winner
            </span>
          </div>

          {/* WooCommerce */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Self-Hosted E-Commerce
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{WOOCOMMERCE.name}</p>
            <p className="text-xs text-zinc-500">{WOOCOMMERCE.domain}</p>
            <ScoreGauge score={WOOCOMMERCE.score} size="lg" />
            <TierBadge tier={WOOCOMMERCE.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-zinc-400">ARL-{WOOCOMMERCE.arl}: {WOOCOMMERCE.arlName}</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 6-Step Agent Journey                                              */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            6-Step Agent Journey Comparison
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Can an AI agent complete the full e-commerce customer journey?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHOPIFY.journey.map((step, i) => {
              const wooStep = WOOCOMMERCE.journey[i]
              const icons = [Search, BookOpen, UserPlus, Plug, Activity, CreditCard]
              const Icon = icons[i]
              const shopifyWinsStep = step.score > wooStep.score
              const wooWinsStep = wooStep.score > step.score

              return (
                <div key={step.step} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-500">STEP {i + 1}</span>
                    <span className="text-sm font-bold text-zinc-200">{step.step}</span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-zinc-400">Shopify</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(step.status)}
                      <span className={`text-xs font-semibold ${statusColor(step.status)}`}>{step.score}</span>
                      {shopifyWinsStep && <Trophy className="h-3 w-3 text-emerald-400" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="text-xs text-zinc-400">WooCommerce</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(wooStep.status)}
                      <span className={`text-xs font-semibold ${statusColor(wooStep.status)}`}>{wooStep.score}</span>
                      {wooWinsStep && <Trophy className="h-3 w-3 text-emerald-400" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Shopify: {SHOPIFY.journey.filter(s => s.status === 'ready').length} of 6 ready</span>
              <span>WooCommerce: {WOOCOMMERCE.journey.filter(s => s.status === 'ready').length} of 6 ready</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Dimension Breakdown                                               */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6">
            Dimension-by-Dimension Breakdown
          </h2>

          <div className="space-y-5">
            {SHOPIFY.dimensions.map((dim, i) => {
              const wooDim = WOOCOMMERCE.dimensions[i]
              const shopifyWinsDim = dim.score > wooDim.score
              const wooWinsDim = wooDim.score > dim.score
              const tied = dim.score === wooDim.score

              return (
                <div key={dim.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-medium text-zinc-600">{dim.key}</span>
                      <span className="text-sm font-medium text-zinc-300">{dim.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {shopifyWinsDim && <span className="text-[10px] font-bold text-green-400">Shopify wins</span>}
                      {wooWinsDim && <span className="text-[10px] font-bold text-purple-400">WooCommerce wins</span>}
                      {tied && <span className="text-[10px] font-bold text-zinc-500">Tie</span>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor(dim.score)}`} style={{ width: `${dim.score}%` }} />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">{dim.score}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor(wooDim.score)}`} style={{ width: `${wooDim.score}%` }} />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">{wooDim.score}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-xs text-zinc-500">shopify.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-xs text-zinc-500">woocommerce.com</span>
                </div>
              </div>
              <div className="text-xs text-zinc-600">
                {shopifyWins} Shopify wins &middot; {wooWins} WooCommerce wins &middot; {ties} tied
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* AgentHermes Adapter Capabilities                                  */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Wrench className="h-4 w-4 text-emerald-500" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-100">
              AgentHermes Adapter Capabilities
            </h2>
          </div>
          <p className="text-sm text-zinc-500 mb-6">
            AgentHermes includes built-in adapters for both platforms. Here is how our auto-detection,
            MCP tool generation, and adapter features compare for each.
          </p>

          <div className="space-y-4">
            {ADAPTER_FEATURES.map((af) => (
              <div key={af.feature} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-200">{af.feature}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-mono text-zinc-400">{af.shopifyScore}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="text-xs font-mono text-zinc-400">{af.wooScore}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="text-xs text-zinc-400">
                    <span className="text-green-400 font-semibold">Shopify:</span> {af.shopify}
                  </div>
                  <div className="text-xs text-zinc-400">
                    <span className="text-purple-400 font-semibold">WooCommerce:</span> {af.woocommerce}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Auto-Detection Deep Dive                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            Auto-Detection: Which Is Easier to Identify?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-green-500/5 border border-green-500/20">
              <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Shopify Detection Signals
              </h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><code className="text-green-300">cdn.shopify.com</code> in asset URLs -- present on 100% of Shopify stores</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><code className="text-green-300">Shopify.theme</code> JavaScript global variable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><code className="text-green-300">X-ShopId</code> response header and Liquid template markers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><code className="text-green-300">/admin/api/</code> endpoint pattern (Storefront + Admin APIs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Consistent platform fingerprint -- every Shopify store looks the same to our scanner</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-zinc-500 border-t border-green-500/20 pt-3">
                Detection confidence: <span className="text-green-400 font-bold">95%+</span> -- Shopify&apos;s hosted nature means consistent, reliable detection signals.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-purple-500/5 border border-purple-500/20">
              <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                WooCommerce Detection Signals
              </h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><code className="text-purple-300">/wp-content/plugins/woocommerce/</code> in page source</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><code className="text-purple-300">wc-api</code> or <code className="text-purple-300">wp-json/wc/v3</code> endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Generator meta tag <code className="text-purple-300">&lt;meta name=&quot;generator&quot; content=&quot;WooCommerce&quot;&gt;</code> -- often removed by security plugins</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Self-hosted means wildly different configurations -- some stores hide all WordPress signals</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>REST API may be disabled, relocated, or behind authentication depending on host config</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-zinc-500 border-t border-purple-500/20 pt-3">
                Detection confidence: <span className="text-purple-400 font-bold">70-85%</span> -- self-hosted nature creates detection variance.
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* MCP Tool Generation Comparison                                    */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            MCP Tool Generation: Which Produces Better Agent Tools?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="p-5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <h3 className="text-sm font-bold text-green-400 mb-3">Shopify MCP Tools</h3>
              <div className="space-y-2">
                {[
                  { tool: 'get_products', desc: 'Browse catalog with variants, images, and pricing', quality: 'Excellent' },
                  { tool: 'search_products', desc: 'Full-text search with filters and facets', quality: 'Excellent' },
                  { tool: 'check_inventory', desc: 'Real-time stock across multiple locations', quality: 'Excellent' },
                  { tool: 'create_cart', desc: 'Draft order creation with line items', quality: 'Good' },
                  { tool: 'get_collections', desc: 'Browse organized product collections', quality: 'Good' },
                ].map((t) => (
                  <div key={t.tool} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-3 w-3 text-green-400" />
                      <code className="text-green-300">{t.tool}</code>
                      <span className="text-zinc-500">-- {t.desc}</span>
                    </div>
                    <span className={`font-semibold ${t.quality === 'Excellent' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {t.quality}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <h3 className="text-sm font-bold text-purple-400 mb-3">WooCommerce MCP Tools</h3>
              <div className="space-y-2">
                {[
                  { tool: 'get_products', desc: 'Browse catalog with attributes and categories', quality: 'Good' },
                  { tool: 'search_products', desc: 'Keyword search via REST API parameter', quality: 'Basic' },
                  { tool: 'check_inventory', desc: 'Stock quantity from product endpoint', quality: 'Basic' },
                  { tool: 'create_order', desc: 'Order creation with billing/shipping', quality: 'Good' },
                  { tool: 'get_categories', desc: 'Browse product category taxonomy', quality: 'Good' },
                ].map((t) => (
                  <div key={t.tool} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-3 w-3 text-purple-400" />
                      <code className="text-purple-300">{t.tool}</code>
                      <span className="text-zinc-500">-- {t.desc}</span>
                    </div>
                    <span className={`font-semibold ${t.quality === 'Good' ? 'text-amber-400' : 'text-red-400'}`}>
                      {t.quality}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            Shopify generates higher-quality MCP tools because its Storefront API is purpose-built for
            programmatic access with GraphQL support, consistent schemas, and multi-location inventory.
            WooCommerce&apos;s REST API is functional but more variable in quality depending on store
            configuration and installed plugins.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Analysis                                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6">
            Analysis: Agent-Ready E-Commerce
          </h2>

          <div className="space-y-4 text-sm text-zinc-400">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">Shopify&apos;s hosted model is a major advantage for agents.</strong>{' '}
                Every Shopify store has the same API surface, the same authentication patterns, and
                the same endpoint structure. Once an agent knows how to interact with one Shopify store,
                it knows how to interact with all 4.4 million of them. This consistency is the single
                most important factor for agent readiness at scale.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-purple-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">WooCommerce&apos;s flexibility is its agent-readiness weakness.</strong>{' '}
                Self-hosting means every WooCommerce store is different. Different hosting providers,
                different plugin configurations, different security setups, different API availability.
                An agent that works perfectly with one WooCommerce store may fail on the next. This
                variance is why WooCommerce scores lower on reliability (55 vs 75) and security (50 vs 67).
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">WooCommerce has a pricing transparency edge (35 vs 30).</strong>{' '}
                WooCommerce stores tend to have more visible pricing structures because the platform
                is free and pricing is per-product. Shopify&apos;s platform pricing (plans, transaction fees)
                adds complexity that the platform itself does not expose in machine-readable formats.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">Both platforms need AgentHermes adapters to be truly agent-ready.</strong>{' '}
                Neither Shopify nor WooCommerce natively publishes agent-card.json, llms.txt for
                individual stores, or MCP tool manifests. Our adapters bridge this gap by auto-detecting
                the platform, generating appropriate MCP tools, and creating the discovery layer that
                agents need.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">Neither platform supports agent-native checkout.</strong>{' '}
                Both score poorly on Payment (45 Shopify, 40 WooCommerce). An agent can browse products
                and add to cart, but completing a purchase programmatically -- with payment, shipping
                selection, and order confirmation -- requires significant workarounds on both platforms.
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Verdict                                                           */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-green-500/10 via-zinc-900/50 to-purple-500/10 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4 text-center">The Verdict</h2>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            Shopify wins with {SHOPIFY.score} vs {WOOCOMMERCE.score}, primarily because its hosted
            platform provides consistency that agents need. Every Shopify store has the same APIs, the
            same authentication, and the same data structures. WooCommerce&apos;s self-hosted flexibility --
            its greatest strength for human developers -- becomes its greatest weakness for AI agents
            that need predictable interfaces.
          </p>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            However, neither platform is truly agent-native. Both need the AgentHermes adapter layer
            to generate MCP tools, create discovery metadata, and bridge the gap between traditional
            e-commerce APIs and the agent economy. The platform that first builds native agent
            support -- publishing agent cards for every store, generating MCP tool manifests
            automatically, and enabling programmatic checkout -- will own the agent commerce category.
          </p>
          <p className="text-sm text-zinc-500 text-center max-w-3xl mx-auto">
            For store owners choosing between platforms today: if agent readiness matters to your
            business, Shopify&apos;s consistency gives it an edge. But both platforms work with
            AgentHermes adapters to become agent-accessible right now.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* CTA                                                               */}
        {/* ----------------------------------------------------------------- */}
        <div className="text-center py-12 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <ShoppingCart className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-100 mb-2">
            Check Your Store&apos;s Agent Readiness
          </h2>
          <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
            Whether you run Shopify or WooCommerce, see how agent-ready your store is.
            Our scanner auto-detects your platform and generates tailored recommendations.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
            >
              Scan Your Store
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/commerce"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold transition-colors border border-zinc-700"
            >
              E-Commerce Solutions
              <Package className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
