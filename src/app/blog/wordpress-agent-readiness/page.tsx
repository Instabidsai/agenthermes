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
  Globe2,
  HelpCircle,
  Layers,
  Lock,
  Package,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'WordPress Agent Readiness: Why 43% of the Internet Fails | AgentHermes',
  description:
    'WordPress powers 43% of all websites (W3Techs). Most WordPress sites score below 30 on agent readiness — HTML-only, no APIs, no schema beyond theme defaults. WooCommerce changes everything. Here is what an agent-ready WordPress stack looks like, which plugins help, and which hurt.',
  keywords: [
    'wordpress agent readiness',
    'wordpress AI agents',
    'woocommerce agent readiness',
    'wordpress MCP',
    'wp-json agents',
    'wordpress REST API agents',
    'agent-ready wordpress',
    'wordpress schema plugins',
    'wordpress llms.txt',
  ],
  openGraph: {
    title: 'WordPress Agent Readiness: Why 43% of the Internet Fails',
    description:
      'WordPress powers 43% of the web but most sites score below 30 on agent readiness. WooCommerce + REST API + agent-card.json is the fix.',
    url: 'https://agenthermes.ai/blog/wordpress-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WordPress Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordPress Agent Readiness: Why 43% of the Internet Fails',
    description:
      'WordPress powers 43% of the web. Most score below 30 on agent readiness. WooCommerce + REST API + agent-card.json flips the stack.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/wordpress-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const goodPlugins = [
  {
    name: 'WooCommerce',
    description: 'The single biggest score lever for any WordPress site selling products or services. Exposes the Store API with structured products, variants, pricing, stock, and checkout endpoints — exactly the shape agents need to transact.',
    impact: '+15 to +25 points typical',
    icon: ShoppingCart,
  },
  {
    name: 'WP REST API Cache',
    description: 'Caches wp-json responses so agents can hit the API without overwhelming origin. Improves D8 Reliability and removes the &ldquo;slow first call&rdquo; penalty many agent pipelines apply.',
    impact: '+3 to +6 points on D8',
    icon: Zap,
  },
  {
    name: 'Yoast SEO / Rank Math',
    description: 'Outputs JSON-LD schema.org markup for posts, products, FAQs, and breadcrumbs. Agents pull this structured data directly instead of parsing HTML, improving D1 Discovery and D6 Data Quality.',
    impact: '+4 to +8 points on D1 + D6',
    icon: Code2,
  },
  {
    name: 'WooCommerce Store API extensions',
    description: 'Plugins that expose additional Store API routes — coupons, shipping zones, tax rules, subscription management. Each route is one more tool an MCP client can call.',
    impact: '+2 to +4 points per added capability',
    icon: Package,
  },
]

const badPlugins = [
  {
    name: 'Heavy page builders without schema',
    description: 'Builders like Elementor Pro and Divi render complex HTML that is beautiful for humans and illegible for agents. Unless paired with a schema plugin, they bury content in nested divs that scanners cannot extract.',
    impact: '-5 to -10 points on D6',
    icon: XCircle,
  },
  {
    name: 'Auth walls on wp-json',
    description: 'Security plugins that require authentication to reach /wp-json/wp/v2/posts block agents from basic discovery. The cure is worse than the disease — a few hundred extra bot hits per day in exchange for total invisibility.',
    impact: '-10 to -20 points on D1 + D2',
    icon: Lock,
  },
  {
    name: 'Aggressive caching without API exemptions',
    description: 'Full-page cache plugins that also cache wp-json endpoints return stale inventory or closed-status errors to agents that are trying to transact in real time.',
    impact: '-5 points on D8',
    icon: Database,
  },
]

const stackSteps = [
  {
    title: 'WooCommerce installed and active',
    detail: 'Not optional if you sell anything. Store API at /wp-json/wc/store/v1/products exposes structured catalog data. The Store API is public by design — no auth required for reads.',
  },
  {
    title: 'wp-json publicly reachable',
    detail: 'Verify /wp-json/ returns the root discovery document. If a security plugin is blocking it, allow-list unauthenticated GET requests on /wp-json/wp/v2/posts and /wp-json/wc/store/v1/*.',
  },
  {
    title: 'Schema plugin (Yoast or Rank Math) outputting JSON-LD',
    detail: 'Products, posts, FAQ pages, and breadcrumbs all emit structured data. Agents pick this up directly during a scan and skip HTML parsing entirely.',
  },
  {
    title: 'agent-card.json at /.well-known/',
    detail: 'WordPress ships static files from the root. Drop an agent-card.json listing your WooCommerce endpoints and A2A skills. AgentHermes generates this for you from your WooCommerce catalog.',
  },
  {
    title: 'llms.txt and AGENTS.md at the root',
    detail: 'Two markdown files: llms.txt points to your key pages, AGENTS.md documents your shop for LLM consumption (product categories, checkout flow, shipping options).',
  },
  {
    title: 'OpenAPI spec exposed',
    detail: 'The WooCommerce REST API already has an OpenAPI definition — publish a link to it in AGENTS.md and in the agent card. D2 API Quality is the 0.15-weight dimension; a published OpenAPI adds 8-12 points on its own.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do most WordPress sites score below 30 on agent readiness?',
    answer:
      'Vanilla WordPress is HTML-first. Without plugins, the only structured data an agent can reach is whatever the theme happens to output — usually a thin layer of Open Graph tags. There are no transactional endpoints, no typed product data, no agent-card.json, and no llms.txt. The AgentHermes scanner sees a human-oriented HTML site with weak structured data, which lands in Bronze or below.',
  },
  {
    question: 'Does WooCommerce alone make WordPress agent-ready?',
    answer:
      'WooCommerce is the single biggest lift you can install, but &ldquo;agent-ready&rdquo; requires more than transactional endpoints. A WooCommerce site with no schema plugin, no llms.txt, no agent-card.json, and an auth-walled wp-json will still struggle to crack Silver. The full stack is WooCommerce + Yoast/Rank Math + unblocked wp-json + the three agent discovery files (agent-card.json, llms.txt, AGENTS.md).',
  },
  {
    question: 'What is the fastest way to raise a WordPress site\'s Agent Readiness Score?',
    answer:
      'Install WooCommerce (if you sell anything). Confirm /wp-json/wc/store/v1/products returns real data. Install Yoast or Rank Math and enable JSON-LD output. Upload an agent-card.json, llms.txt, and AGENTS.md to your root directory. Re-scan at agenthermes.ai/audit. Most sites move 15-25 points in an afternoon with this checklist.',
  },
  {
    question: 'Do page builders like Elementor or Divi hurt agent readiness?',
    answer:
      'Yes, unless paired with a schema plugin. Page builders prioritize visual fidelity and render nested HTML that scanners cannot extract reliably. The fix is not to remove the builder — most businesses depend on it — but to pair it with Yoast or Rank Math so the structured data layer is clean even when the visual layer is complex. The scanner reads the JSON-LD first and the HTML second.',
  },
  {
    question: 'How does AgentHermes detect WordPress during a scan?',
    answer:
      'The scanner checks for wp-json endpoints, WordPress-specific meta generators, and common plugin fingerprints. When WordPress is detected we apply adjusted weights: D2 API Quality is evaluated against the WooCommerce Store API spec, D6 Data Quality gives credit for schema plugin output, and D3 Onboarding expects a public wp-json discovery document. The same scoring rubric applies, but with WordPress-aware detection logic.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function WordpressAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'WordPress Agent Readiness: Why 43% of the Internet Fails',
    description:
      'WordPress powers 43% of all websites. Most WordPress sites score below 30 on agent readiness. Here is what an agent-ready WordPress stack looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/wordpress-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Platform Analysis',
    wordCount: 1900,
    keywords:
      'wordpress agent readiness, woocommerce agent readiness, wordpress MCP, wp-json agents, agent-ready wordpress',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'WordPress Agent Readiness',
          item: 'https://agenthermes.ai/blog/wordpress-agent-readiness',
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
      title="WordPress Agent Readiness: Why 43% of the Internet Fails"
      shareUrl="https://agenthermes.ai/blog/wordpress-agent-readiness"
      currentHref="/blog/wordpress-agent-readiness"
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
            <span className="text-zinc-400">WordPress Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Globe2 className="h-3.5 w-3.5" />
              Platform Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              43% of the Web
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            WordPress Agent Readiness:{' '}
            <span className="text-emerald-400">Why 43% of the Internet Fails</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            WordPress powers <strong className="text-zinc-100">43% of all websites</strong> on the
            internet (W3Techs, 2026). In our scans, WordPress-detected sites without WooCommerce
            average below 30 on the Agent Readiness Score — firmly below Bronze. The problem is not
            WordPress itself. It is that the default stack is optimized for human eyeballs, not
            agent tool calls. Here is the plugin, endpoint, and file checklist that turns a vanilla
            WordPress site into an agent-operable surface.
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
                  13 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE 43% PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-emerald-500" />
            The 43% Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Of every 100 websites on the internet, 43 run on WordPress. The number has been
              climbing steadily since 2015 and shows no signs of slowing — WordPress is cheap to
              host, has a dominant plugin ecosystem, and has become the default choice for small
              businesses, marketing sites, blogs, and increasingly e-commerce stores via WooCommerce.
            </p>
            <p>
              That makes WordPress the single largest lever in the entire agent readiness market. If
              WordPress sites average 30 on the Agent Readiness Score, the internet as a whole
              averages below 50. If WordPress sites average 60, the whole agent economy shifts
              upward. No other platform controls anywhere near this much of the surface area.
            </p>
            <p>
              The AgentHermes scanner has seen this pattern repeatedly across 500 businesses scanned:{' '}
              <strong className="text-zinc-100">
                WordPress-detected sites without WooCommerce average below 30
              </strong>, while WordPress-plus-WooCommerce sites average above 45 and the best-tuned
              stacks push into Silver (60+). The platform is not the problem. The default configuration
              is.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '43%', label: 'of all websites (W3Techs)', icon: Globe2 },
              { value: '< 30', label: 'avg WP without WooCommerce', icon: XCircle },
              { value: '45+', label: 'avg WP with WooCommerce', icon: ShoppingCart },
              { value: '60+', label: 'best-tuned WP stacks', icon: TrendingUp },
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

      {/* ===== WHY VANILLA WP FAILS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Why Vanilla WordPress Scores So Low
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A default WordPress install with a popular theme hits only a handful of the 9 Agent
              Readiness dimensions. Here is what the scanner actually sees:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                dim: 'D1 Discovery',
                verdict: 'Weak',
                detail: 'Robots.txt present, sitemap.xml usually present, Open Graph tags depend on theme. No llms.txt, no agent-card.json.',
              },
              {
                dim: 'D2 API Quality (weight 0.15)',
                verdict: 'Near Zero',
                detail: 'wp-json/wp/v2 endpoints exist but are often auth-walled by security plugins. No OpenAPI spec exposed. Transactional endpoints absent without WooCommerce.',
              },
              {
                dim: 'D3 Onboarding',
                verdict: 'Weak',
                detail: 'No agent-oriented docs, no AGENTS.md, no onboarding flow for programmatic clients.',
              },
              {
                dim: 'D6 Data Quality',
                verdict: 'Theme-Dependent',
                detail: 'Structured data limited to what the theme outputs. Most themes output Open Graph and maybe breadcrumb schema. No product schema, no FAQ schema.',
              },
              {
                dim: 'D9 Agent Experience',
                verdict: 'Poor',
                detail: 'HTML-first rendering. Agents must parse page output. No machine-readable capability declaration. No MCP. No A2A.',
              },
            ].map((row, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{row.dim}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                      {row.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              This is not a WordPress flaw — it is a scope mismatch. WordPress was designed for 2005
              blogging and extended for 2015 marketing sites. Agent readiness is a 2025-onward
              requirement that never shaped the default stack. Fixing it is mostly a matter of
              adding the right plugins and a few static files to the root.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WOOCOMMERCE DIFFERENCE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-emerald-500" />
            The WooCommerce Difference
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              WooCommerce is the single highest-leverage plugin in the WordPress ecosystem for agent
              readiness. It ships with the Store API — a public, read-optimized REST surface at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                /wp-json/wc/store/v1/*
              </code>{' '}
              — that exposes products, variants, pricing, stock levels, categories, cart operations,
              and checkout. Agents can discover inventory, check availability, build a cart, and
              apply coupons without authentication.
            </p>
            <p>
              That single plugin moves a WordPress site from &ldquo;nothing structured to transact
              with&rdquo; to &ldquo;structured product catalog and checkout endpoints.&rdquo; The
              scanner picks up real points across D2 API Quality (0.15 weight), D4 Pricing
              Transparency (0.05), D5 Payment (0.08), and D6 Data Quality (0.10) — four dimensions
              totaling 38% of the score.
            </p>
            <p>
              AgentHermes also ships a dedicated{' '}
              <Link href="/blog/ecommerce-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                WooCommerce detector
              </Link>{' '}
              that fingerprints the Store API, verifies endpoint health, and auto-generates MCP
              tools matching the live catalog. No configuration required — if WooCommerce is running
              and the Store API is reachable, the adapter does the rest.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PLUGINS THAT HELP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Plugins That Help
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Install these in order of impact. Most sites can install all four in under an hour.
          </p>

          <div className="space-y-4 mb-8">
            {goodPlugins.map((plugin) => (
              <div
                key={plugin.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <plugin.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{plugin.name}</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    {plugin.impact}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{plugin.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLUGINS THAT HURT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Plugins and Configurations That Hurt
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Most of these are fixable with configuration rather than removal. Do not rip out your
            page builder — tune it.
          </p>

          <div className="space-y-4 mb-8">
            {badPlugins.map((plugin) => (
              <div
                key={plugin.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                      <plugin.icon className="h-5 w-5 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{plugin.name}</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                    {plugin.impact}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{plugin.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY STACK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Agent-Ready WordPress Stack
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Six steps, in order. Each one is independently verifiable — scan after each and watch
            the score rise.
          </p>

          <div className="space-y-3 mb-8">
            {stackSteps.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Shortcut:</strong> connect your WordPress site
              through AgentHermes and steps 4-6 are auto-generated. We read your WooCommerce
              catalog, generate agent-card.json, llms.txt, and AGENTS.md, and host an MCP endpoint
              wrapping your Store API. No plugin install required.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW AGENTHERMES DETECTS WP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            How the AgentHermes Scanner Detects WordPress (and WooCommerce)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'WordPress fingerprints',
                detail: 'meta generator tag, /wp-content/ path patterns, wp-json root discovery, common admin endpoints. Detection is near-100% across the WP-powered half of the web.',
              },
              {
                title: 'WooCommerce fingerprints',
                detail: 'Store API at /wp-json/wc/store/v1/, WooCommerce script handles, the wc- CSS class prefix. We hit the Store API directly and confirm endpoint health.',
              },
              {
                title: 'Adjusted scoring weights',
                detail: 'When WordPress is detected, D2 API Quality is evaluated against the expected wp-json + Store API surface. Sites that have WooCommerce but block it via auth walls are flagged and lose points.',
              },
              {
                title: 'Plugin hints in the verdict',
                detail: 'The audit report recommends specific plugins based on what is missing. Yoast for schema. WP REST API Cache for speed. And the three discovery files for D1 + D3 + D9.',
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
              The scanner is WordPress-aware but not WordPress-forgiving. A WordPress site with the
              right plugins scores like any other site with the same capabilities. A WordPress site
              with the wrong configuration scores worse than a custom build with equivalent surface
              area, because the platform signals expectations the scanner checks against.
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
                title: 'Ecommerce Agent Readiness: Why Shopify Beats WooCommerce Out of the Box',
                href: '/blog/ecommerce-agent-readiness',
                tag: 'Industry Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Improve Your Agent Readiness Score: The 60-Minute Checklist',
                href: '/blog/improve-agent-readiness-score',
                tag: 'Playbook',
                tagColor: 'emerald',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
                tagColor: 'blue',
              },
            ].map((article) => {
              const colorMap: Record<string, { text: string; bg: string; border: string }> = {
                amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
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
            Scan your WordPress site in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See exactly which of the 9 dimensions are weak, which plugins to install, and whether
            WooCommerce is properly exposed. Then connect through AgentHermes and get the discovery
            files generated automatically.
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
              Connect My Site
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
