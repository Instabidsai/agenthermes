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
  DollarSign,
  Gamepad2,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Gaming Agent Readiness: Why Game Studios Have APIs But Players Can\'t Use AI Agents to Buy | AgentHermes',
  description:
    'Steam, Epic, and PlayStation have internal APIs but none are agent-accessible for purchasing, gifting, or wishlist management. The $200B gaming industry scores 11/100 on agent readiness. Here is what agent-ready gaming looks like.',
  keywords: [
    'gaming agent readiness',
    'game store API',
    'Steam API agent',
    'Epic Games agent readiness',
    'AI agent gaming',
    'game purchase API',
    'agent economy gaming',
    'gaming API access',
    'wishlist management API',
  ],
  openGraph: {
    title: 'Gaming Agent Readiness: Why Game Studios Have APIs But Players Can\'t Use AI Agents to Buy',
    description:
      'The $200B gaming industry has APIs everywhere internally but zero agent-accessible purchase endpoints. Average score: 11/100.',
    url: 'https://agenthermes.ai/blog/gaming-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gaming Agent Readiness: Why Game Studios Have APIs But Players Can\'t Use AI Agents to Buy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaming Agent Readiness: Why Game Studios Have APIs But Players Can\'t Use AI Agents to Buy',
    description:
      'Steam, Epic, PlayStation all have APIs internally. None let AI agents buy games for users. The $200B gaming industry averages 11/100 on agent readiness.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/gaming-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformScores = [
  { name: 'Steam (Valve)', score: 22, notes: 'Web API exists but read-only. No purchase, gifting, or cart endpoints for agents.', color: 'amber' },
  { name: 'Epic Games Store', score: 18, notes: 'GraphQL catalog API. No public purchase flow. Free game claims require browser auth.', color: 'amber' },
  { name: 'PlayStation Store', score: 8, notes: 'Fully closed. No public API. Price data only via scraping.', color: 'red' },
  { name: 'Xbox / Microsoft Store', score: 15, notes: 'Microsoft Graph has some hooks but no game purchase endpoints.', color: 'amber' },
  { name: 'Nintendo eShop', score: 5, notes: 'No public API at all. Region-locked pricing. Agent-invisible.', color: 'red' },
  { name: 'GOG.com', score: 26, notes: 'DRM-free catalog accessible. Limited purchase API. Best indie option.', color: 'amber' },
]

const agentReadyFeatures = [
  {
    name: 'Game Catalog API',
    description: 'Structured endpoint returning titles, genres, ratings, system requirements, and release dates in JSON. Agents need this to compare games across platforms for users.',
    current: 'Steam has a partial catalog API. Epic has GraphQL. PlayStation and Nintendo have nothing public.',
    icon: Layers,
    color: 'blue',
  },
  {
    name: 'Purchase and Gifting Endpoint',
    description: 'Authenticated API that lets an agent buy a game or send it as a gift using the user\'s stored payment method. The core transaction that makes gaming agent-ready.',
    current: 'Zero platforms offer this. Every purchase requires a human in the browser clicking through checkout.',
    icon: ShoppingCart,
    color: 'emerald',
  },
  {
    name: 'Price Comparison Across Stores',
    description: 'Standardized pricing JSON with base price, current sale price, historical low, and regional pricing. Agents need this to find the best deal across Steam, Epic, GOG, and console stores.',
    current: 'Third-party sites like IsThereAnyDeal aggregate this. No platform provides cross-store pricing natively.',
    icon: DollarSign,
    color: 'amber',
  },
  {
    name: 'Wishlist Management',
    description: 'CRUD API for a user\'s wishlist: add, remove, prioritize, and get notified on sales. An AI shopping agent should manage wishlists across all platforms in one place.',
    current: 'Steam has a wishlist API (read-only for public profiles). Epic and console stores: no API access.',
    icon: Target,
    color: 'purple',
  },
  {
    name: 'Release Calendar and Pre-Order',
    description: 'Upcoming release dates, pre-order availability, edition comparisons (standard vs deluxe), and early access status. Agents track release schedules so users never miss a launch.',
    current: 'No platform exposes a structured release calendar API. Data comes from IGDB or manual tracking.',
    icon: Calendar,
    color: 'cyan',
  },
]

const inGameEconomyGaps = [
  { item: 'Skin marketplaces (CS2, Fortnite)', issue: 'No agent API for buying, selling, or trading cosmetics', impact: '$50B+ annual skin economy, zero agent access' },
  { item: 'In-game currency (V-Bucks, Robux)', issue: 'Purchase locked to platform storefronts', impact: 'Agents cannot top up currency for users automatically' },
  { item: 'Battle pass management', issue: 'No API to check progress or purchase tiers', impact: 'AI agents cannot optimize pass completion or buy remaining tiers' },
  { item: 'Game subscription services', issue: 'Xbox Game Pass, PS Plus, EA Play have no agent-facing API', impact: 'Agents cannot compare subscription catalogs or manage renewals' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do gaming platforms have APIs but still score low on agent readiness?',
    answer:
      'Gaming APIs were built for developers to display game information (achievements, player stats, catalog data), not for agents to execute transactions. Steam\'s Web API can read your library but cannot buy a game. The APIs exist for data display, not for commerce. Agent readiness requires transactional endpoints: purchase, gift, refund, subscribe. Gaming has read APIs but zero write APIs for consumers.',
  },
  {
    question: 'Can AI agents already buy games for users?',
    answer:
      'No. As of 2026, no major gaming platform offers a public API that allows an agent to complete a purchase on behalf of a user. An AI assistant can help you find and compare games, but the actual purchase requires you to open a browser, log in, and click through checkout. This is the core gap in gaming agent readiness.',
  },
  {
    question: 'What about Steam trading bots — are those agent-ready?',
    answer:
      'Steam trading bots use the Steam Trade Offer API, which is a peer-to-peer item trading system, not a storefront purchase API. Bots can trade inventory items between accounts, but they cannot buy games from the Steam store. Trading bots are closer to agent-ready for the secondary market but do not solve the primary purchase problem.',
  },
  {
    question: 'Which gaming platform is closest to being agent-ready?',
    answer:
      'GOG.com scores highest at 26/100. Its DRM-free philosophy means more open data access, and its catalog is more structured than competitors. Steam follows at 22/100 due to its Web API. But no platform is close to Bronze (40+). The first major platform to open purchase APIs to agents will capture an enormous first-mover advantage.',
  },
  {
    question: 'How does the $50B in-game economy fit into agent readiness?',
    answer:
      'In-game economies (skins, currencies, battle passes, subscriptions) represent massive commerce that is entirely closed to agents. An AI personal finance agent that manages a user\'s entertainment spending cannot see or manage in-game purchases. This is a separate and equally large gap beyond storefront purchases.',
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

export default function GamingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gaming Agent Readiness: Why Game Studios Have APIs But Players Can\'t Use AI Agents to Buy',
    description:
      'The $200B gaming industry has APIs everywhere internally but zero agent-accessible purchase endpoints. Steam, Epic, PlayStation, and Nintendo all lock out AI agents from transactions.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/gaming-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'gaming agent readiness, game store API, Steam API agent, Epic Games agent readiness, AI agent gaming',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Gaming Agent Readiness',
          item: 'https://agenthermes.ai/blog/gaming-agent-readiness',
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
      title="Gaming Agent Readiness: Why Game Studios Have APIs But Players Can't Use AI Agents to Buy"
      shareUrl="https://agenthermes.ai/blog/gaming-agent-readiness"
      currentHref="/blog/gaming-agent-readiness"
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
            <span className="text-zinc-400">Gaming Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Gamepad2 className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Gaming Industry
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Gaming Agent Readiness: Why Game Studios Have APIs But{' '}
            <span className="text-emerald-400">Players Can&apos;t Use AI Agents to Buy</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The gaming industry generates over <strong className="text-zinc-100">$200 billion annually</strong>.
            Steam has 50,000+ games. Epic gives away free titles weekly. PlayStation and Xbox run massive digital
            storefronts. Every platform has sophisticated internal APIs. Yet not a single one lets an AI agent
            buy a game, manage a wishlist, or compare prices on behalf of a user. Average agent readiness
            score: <strong className="text-zinc-100">11/100</strong>.
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

      {/* ===== THE PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-emerald-500" />
            The Gaming API Paradox: Built for Developers, Closed to Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Gaming platforms are among the most technically sophisticated consumer services on the planet.
              Steam&apos;s Web API serves millions of requests daily. Epic&apos;s backend handles concurrent
              player counts that rival any SaaS platform. These companies employ thousands of engineers and
              operate at scales that most industries cannot imagine.
            </p>
            <p>
              And yet, when it comes to agent readiness, gaming is one of the worst-scoring verticals we
              have measured. The reason is a fundamental design choice:{' '}
              <strong className="text-zinc-100">gaming APIs were built for game developers, not for
              consumer agents</strong>. Steam&apos;s API lets developers query player stats and achievements.
              Epic&apos;s API lets studios manage their storefronts. None of these APIs let an AI agent
              acting on behalf of a player execute the most basic consumer action: buying a game.
            </p>
            <p>
              This is not a technical limitation. These platforms already process billions of dollars in
              digital transactions. The infrastructure exists. What does not exist is a public, authenticated
              endpoint that says: &ldquo;Here is a user token, here is a game ID, charge their default
              payment method.&rdquo; That endpoint would make gaming instantly agent-ready. Its absence
              keeps the entire industry in the dark.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$200B+', label: 'annual gaming revenue', icon: DollarSign },
              { value: '11', label: 'avg agent readiness score', icon: BarChart3 },
              { value: '0', label: 'platforms with purchase API', icon: ShoppingCart },
              { value: '$50B+', label: 'in-game economy, zero agent access', icon: Lock },
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

      {/* ===== PLATFORM SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Platform-by-Platform Agent Readiness Scores
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We scanned the six major PC and console gaming storefronts. Not one reaches Bronze tier (40+).
            The best performer, GOG.com, scores 26 — still firmly in the &ldquo;Not Scored&rdquo; tier.
          </p>

          <div className="space-y-3 mb-8">
            {platformScores.map((platform) => {
              const colors = getColorClasses(platform.color)
              return (
                <div
                  key={platform.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-zinc-100">{platform.name}</h3>
                    <span className={`text-lg font-bold ${colors.text}`}>{platform.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full ${platform.color === 'red' ? 'bg-red-500' : 'bg-amber-500'}`}
                      style={{ width: `${platform.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{platform.notes}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY GAMING LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Gaming Actually Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready gaming platform would let an AI shopping agent do everything a human can do
            on the storefront — search, compare, wishlist, purchase, and gift — through structured API
            calls instead of browser clicks.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyFeatures.map((feature) => {
              const colors = getColorClasses(feature.color)
              return (
                <div
                  key={feature.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <feature.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{feature.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{feature.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Current state:</span>{' '}
                      <span className={colors.text}>{feature.current}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Imagine telling your AI assistant: &ldquo;Buy the cheapest copy of Elden Ring across all
              platforms and send it to my brother for his birthday.&rdquo; Today, that requires you to
              manually check Steam, Epic, PlayStation, Xbox, and GOG, compare prices, find your brother&apos;s
              account on the right platform, and go through checkout. An agent-ready gaming ecosystem
              would handle this in one API call chain.
            </p>
          </div>
        </div>
      </section>

      {/* ===== IN-GAME ECONOMY GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            The $50 Billion In-Game Economy: Completely Agent-Invisible
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Beyond the storefront, gaming has an enormous secondary economy of in-game purchases that
              is entirely closed to AI agents. Skins, battle passes, virtual currencies, and subscription
              services represent over $50 billion in annual spending — and agents have zero access to any of it.
            </p>
            <p>
              This matters because{' '}
              <Link href="/blog/ecommerce-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                e-commerce agent readiness
              </Link>{' '}
              is not just about buying physical products. Digital goods are the fastest-growing commerce
              category, and gaming represents the largest share. An AI personal finance agent that
              can track and manage a user&apos;s entertainment spending needs access to these
              in-game purchase systems — and today it has none.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Category</div>
              <div>Agent Blocker</div>
              <div>Market Impact</div>
            </div>
            {inGameEconomyGaps.map((row, i) => (
              <div
                key={row.item}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.item}</div>
                <div className="text-zinc-500">{row.issue}</div>
                <div className="text-red-400">{row.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY GAMING STAYS CLOSED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Why Gaming Platforms Stay Closed — And What Would Change It
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Gaming platforms keep their commerce APIs closed for three reasons: fraud risk, platform
              control, and revenue protection. Every game purchase involves DRM licensing, regional pricing,
              and refund policies that platforms want to control tightly. Opening a purchase API means
              trusting third-party agents with transaction integrity.
            </p>
            <p>
              But the same arguments were made against open banking, and regulators eventually mandated
              API access. The gaming industry will face similar pressure as AI agents become the primary
              way consumers discover and purchase digital content. The platform that opens first will
              not lose control — it will gain market share from every competitor that stays closed.
            </p>
            <p>
              In the{' '}
              <Link href="/blog/media-entertainment-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                media and entertainment analysis
              </Link>, we documented how streaming platforms are beginning to open discovery APIs. Gaming
              will follow the same trajectory — discovery first, then transactions. The question is whether
              it takes two years or ten.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'First-mover advantage is massive',
                detail: 'The first platform to offer agent-accessible purchasing will capture every AI-driven game recommendation. When Claude suggests a game, it will buy from the store that has an API — not the one that requires a browser.',
              },
              {
                title: 'Price comparison drives volume',
                detail: 'An AI agent comparing prices across Steam, Epic, GOG, and console stores will always route purchases to the cheapest option. Platforms without price APIs lose sales they never know about.',
              },
              {
                title: 'Gifting is the killer use case',
                detail: 'Birthday and holiday gift buying is the most natural agent task. "Buy my nephew a game he\'d like for under $30." This requires catalog search, preference matching, purchase, and delivery — all via API.',
              },
              {
                title: 'Subscription management is overdue',
                detail: 'Xbox Game Pass, PS Plus, and EA Play all have confusing tier structures. An agent that can compare catalogs, switch tiers, and cancel renewals would save consumers millions annually.',
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
                title: 'Media and Entertainment Agent Readiness',
                href: '/blog/media-entertainment-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'E-Commerce Agent Readiness: Shopify vs WooCommerce vs Square',
                href: '/blog/ecommerce-agent-readiness',
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
            Is your platform agent-ready?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your score across all 9 dimensions.
            Find out exactly what AI agents can and cannot do with your platform today.
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
