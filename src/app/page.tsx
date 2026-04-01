import { Suspense } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Search,
  BookOpen,
  UserPlus,
  Link2,
  Activity,
  CreditCard,
  Compass,
  Wrench,
  Network,
  CheckCircle,
  BarChart3,
  Trophy,
  AlertTriangle,
  Clock,
  Zap,
} from 'lucide-react'
import { getServiceClient } from '@/lib/supabase'
import HeroScanForm from '@/components/HeroScanForm'
import RecentlyScanned from '@/components/RecentlyScanned'
import { FadeIn } from '@/components/FadeIn'
import { ScrollCountUp } from '@/components/ScrollCountUp'

export const revalidate = 60

async function getLeaderboardData() {
  const db = getServiceClient()

  const [countRes, avgRes, topRes] = await Promise.all([
    db.from('businesses').select('*', { count: 'exact', head: true }),
    db.from('businesses').select('audit_score').not('audit_score', 'is', null),
    db
      .from('businesses')
      .select('name, domain, slug, audit_score, audit_tier')
      .not('audit_score', 'is', null)
      .order('audit_score', { ascending: false })
      .limit(5),
  ])

  const businessCount = countRes.count ?? 0
  const scores = ((avgRes.data as Record<string, any>[]) || []).map(
    (r) => r.audit_score as number
  )
  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0
  const topBusinesses = (topRes.data as Record<string, any>[]) || []

  return { businessCount, avgScore, topBusinesses }
}

function getTierColor(tier: string | null): string {
  switch (tier) {
    case 'platinum':
      return 'text-emerald-400'
    case 'gold':
      return 'text-yellow-500'
    case 'silver':
      return 'text-zinc-400'
    case 'bronze':
      return 'text-amber-500'
    default:
      return 'text-red-500'
  }
}

const agentJourney = [
  {
    step: 1,
    label: 'FIND',
    question: 'Can an agent discover your business?',
    icon: Search,
    detail: 'Agent cards, llms.txt, structured data',
  },
  {
    step: 2,
    label: 'UNDERSTAND',
    question: 'Can it know what you offer?',
    icon: BookOpen,
    detail: 'Machine-readable descriptions, capabilities',
  },
  {
    step: 3,
    label: 'SIGN UP',
    question: 'Can it create an account autonomously?',
    icon: UserPlus,
    detail: 'API-based onboarding, no CAPTCHA walls',
  },
  {
    step: 4,
    label: 'CONNECT',
    question: 'Can it authenticate and call your API?',
    icon: Link2,
    detail: 'OAuth, API keys, MCP endpoints',
  },
  {
    step: 5,
    label: 'USE',
    question: 'Can it get reliable, structured responses?',
    icon: Activity,
    detail: 'Consistent JSON, error handling, uptime',
  },
  {
    step: 6,
    label: 'PAY',
    question: 'Can it pay for your service programmatically?',
    icon: CreditCard,
    detail: 'Structured pricing, payment APIs',
  },
]

const products = [
  {
    title: 'Score It',
    color: 'emerald',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    accentColor: 'text-emerald-400',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-500',
    icon: BarChart3,
    description:
      'See where you stand on the 6-step agent journey. Free, instant, no signup.',
    cta: 'Get Your Score',
    href: '/audit',
  },
  {
    title: 'Fix It',
    color: 'blue',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    accentColor: 'text-blue-400',
    buttonBg: 'bg-blue-600 hover:bg-blue-500',
    icon: Wrench,
    description:
      'We show you exactly what to fix. Auto-remediation for agent cards, llms.txt, MCP endpoints, pricing APIs.',
    cta: 'See Remediation',
    href: '/remediate',
  },
  {
    title: 'Connect It',
    color: 'purple',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
    accentColor: 'text-purple-400',
    buttonBg: 'bg-purple-600 hover:bg-purple-500',
    icon: Network,
    description:
      'Skip the work. List on our gateway and agents can use your service TODAY through one API.',
    cta: 'Connect Your Service',
    href: '/connect',
  },
]

export default async function HomePage() {
  let leaderboard: {
    businessCount: number
    avgScore: number
    topBusinesses: Record<string, any>[]
  }

  try {
    leaderboard = await getLeaderboardData()
  } catch {
    leaderboard = { businessCount: 0, avgScore: 0, topBusinesses: [] }
  }

  const displayCount = Math.max(leaderboard.businessCount, 108)
  const displayAvg = leaderboard.avgScore || 36

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
    description:
      'Score, fix, and connect your business to the AI agent economy. Free agent readiness scoring for any business.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://agenthermes.ai/discover?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const speakableJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AgentHermes — Agent Readiness Score',
    url: 'https://agenthermes.ai',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-headline', '.hero-description', '.faq-section'],
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an Agent Readiness Score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An Agent Readiness Score is a 0-100 rating that measures how well a business can be discovered, used, and paid by AI agents. It evaluates machine-readable profiles, API endpoints, onboarding flows, structured pricing, payment acceptance, data quality, security posture, reliability, and overall agent experience.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is the Agent Readiness Score calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We scan 9 dimensions: Discoverability, API Quality, Onboarding, Pricing, Payment, Data Quality, Security, Reliability, and Agent Experience. Each dimension is scored individually and combined into a weighted overall score from 0 to 100. Service foundation (API quality, security, reliability) accounts for 60% of the score, accessibility (docs, onboarding, pricing) adds 25%, and agent-native features (MCP, agent cards) provide a 15% bonus.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the Agent Readiness tiers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Platinum (90-100): Certified, battle-tested, zero-friction. Gold (75-89): Fully agent-native. Silver (60-74): Agent-usable with friction. Bronze (40-59): Partially discoverable. Not Scored (0-39): Invisible to AI agents.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Agent Readiness Score free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, scanning is completely free. Enter any URL and get your score in seconds. No signup or credit card required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I improve my Agent Readiness Score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Add an A2A Agent Card, publish llms.txt, expose MCP endpoints, add structured pricing with machine-readable formats, enable programmatic payment flows, and implement API-based onboarding. AgentHermes provides specific recommendations and auto-remediation tools to help you improve each dimension.',
        },
      },
    ],
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://agenthermes.ai',
              },
            ],
          }),
        }}
      />

      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 hero-gradient-bg" />
        {/* Dot grid pattern */}
        <div className="absolute inset-0 dot-grid-pattern" />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Bottom fade to page bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />
        {/* Top radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04),transparent)] rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="text-center">
            {/* Brand tagline — glowing badge */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-4 badge-glow">
                <Zap className="h-3.5 w-3.5" />
                The Shopify of the Agent Economy
              </div>
            </FadeIn>

            {/* Product tag */}
            <FadeIn delay={100}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/60 border border-zinc-700/40 text-zinc-400 text-xs font-medium mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
                Score It &middot; Fix It &middot; Connect It
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
                Is Your Business Ready for the{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">Agent Economy</span>?
              </h1>
            </FadeIn>

            <FadeIn delay={300}>
              <p className="hero-description text-lg sm:text-xl text-zinc-400 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
                AI agents are learning to discover, use, and pay for services
                autonomously. Most businesses are invisible to them. Find out
                where you stand.
              </p>
            </FadeIn>

            {/* Scan input */}
            <FadeIn delay={400}>
              <HeroScanForm />
            </FadeIn>

            {/* Trust signals with animated counter */}
            <FadeIn delay={500}>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <CheckCircle className="h-4 w-4 text-emerald-500/60" />
                  <span>
                    <strong className="text-zinc-300">
                      <ScrollCountUp target={displayCount} suffix="+" />
                    </strong>{' '}
                    businesses scored
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <CheckCircle className="h-4 w-4 text-emerald-500/60" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <CheckCircle className="h-4 w-4 text-emerald-500/60" />
                  <span>Results in 30 seconds</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: THE AGENT ECONOMY IS COMING ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                The Agent Economy Is Coming
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Every autonomous transaction follows the same{' '}
                <Link
                  href="/what-is-agent-ready"
                  className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 transition-colors duration-300"
                >
                  6-step journey
                </Link>
                . Your Agent Readiness Score measures how far agents can get with
                your business.
              </p>
            </div>
          </FadeIn>

          {/* 6-step journey timeline */}
          <div className="relative">
            {/* Connecting line (desktop) — gradient pipeline */}
            <div className="hidden lg:block absolute top-10 left-[8.33%] right-[8.33%] h-px bg-gradient-to-r from-emerald-500/10 via-emerald-500/30 to-emerald-500/10" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-3">
              {agentJourney.map((step, i) => (
                <FadeIn key={step.label} delay={i * 80}>
                  <div className="relative text-center group">
                    {/* Pipeline connector (desktop only) */}
                    {i < agentJourney.length - 1 && (
                      <div className="hidden lg:block absolute top-10 -right-[6px] w-3 h-0.5 bg-gradient-to-r from-emerald-500/30 to-emerald-500/10 z-10" />
                    )}

                    {/* Step circle — lift + glow on hover */}
                    <div className="relative inline-flex items-center justify-center h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-zinc-900 border-2 border-zinc-800 group-hover:border-emerald-500/50 transition-all duration-300 mb-3 sm:mb-4 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <step.icon className="h-5 w-5 sm:h-8 sm:w-8 text-zinc-500 group-hover:text-emerald-400 transition-all duration-300 icon-hover-bounce" />
                      <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-emerald-500/30 flex items-center justify-center transition-colors duration-300">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Label */}
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-200 tracking-wide mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                      {step.label}
                    </h3>

                    {/* Question */}
                    <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed mb-2 sm:mb-3 group-hover:text-zinc-400 transition-colors duration-300">
                      {step.question}
                    </p>

                    {/* Failure indicator */}
                    <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/15 group-hover:border-red-500/30 transition-all duration-300">
                      <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-500/70" />
                      <span className="text-[9px] sm:text-[10px] font-medium text-red-400/80">
                        Most fail here
                      </span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: SCORE -> FIX -> CONNECT ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Score{' '}
                <span className="text-zinc-600">&rarr;</span> Fix{' '}
                <span className="text-zinc-600">&rarr;</span> Connect
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                Three products. One path from invisible to agent-native.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <FadeIn key={product.title} delay={i * 120}>
                <div
                  className={`relative p-6 lg:p-8 rounded-xl ${product.bgColor} border ${product.borderColor} card-hover-lift card-glow-${product.color} group`}
                >
                  {/* Gradient border overlay */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                    background: `linear-gradient(135deg, ${product.color === 'emerald' ? 'rgba(16,185,129,0.08)' : product.color === 'blue' ? 'rgba(59,130,246,0.08)' : 'rgba(168,85,247,0.08)'}, transparent)`,
                  }} />

                  {/* Icon */}
                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-700/50 mb-5 group-hover:border-opacity-80 transition-all duration-300"
                  >
                    <product.icon
                      className={`h-6 w-6 ${product.accentColor} icon-hover-bounce`}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={`relative text-xl font-bold mb-3 ${product.accentColor}`}
                  >
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="relative text-sm text-zinc-400 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={product.href}
                    className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg ${product.buttonBg} text-white text-sm font-semibold transition-all duration-300`}
                  >
                    {product.cta}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: RECENTLY SCANNED ===== */}
      <Suspense fallback={null}>
        <RecentlyScanned />
      </Suspense>

      {/* ===== SECTION 5: THE DATA ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                The Data Speaks for Itself
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                We&apos;ve scanned{' '}
                <strong className="text-zinc-200">
                  <ScrollCountUp target={displayCount} suffix="+" />
                </strong>{' '}
                businesses. The average score is{' '}
                <strong className="text-red-400">
                  <ScrollCountUp target={displayAvg} suffix="/100" />
                </strong>.
              </p>
              <p className="text-zinc-500 text-base mt-2">
                Even Stripe only scores 68. Slack: 70. Most companies are
                invisible to agents.
              </p>
            </div>
          </FadeIn>

          {/* Mini leaderboard */}
          {leaderboard.topBusinesses.length > 0 && (
            <FadeIn delay={100}>
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8 gradient-border">
                <div className="flex items-center gap-2 mb-5">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <h3 className="text-sm font-semibold text-zinc-300">
                    Top 5 Agent-Ready Businesses
                  </h3>
                </div>

                <div className="space-y-2">
                  {leaderboard.topBusinesses.map((biz, i) => (
                    <Link
                      key={biz.slug || biz.domain}
                      href={`/business/${biz.slug}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/40 border border-transparent hover:border-zinc-700/40 transition-all duration-300 group"
                    >
                      {/* Rank */}
                      <span
                        className={`text-sm font-mono font-bold w-6 text-center ${
                          i === 0
                            ? 'text-yellow-500'
                            : i === 1
                              ? 'text-zinc-400'
                              : i === 2
                                ? 'text-amber-600'
                                : 'text-zinc-600'
                        }`}
                      >
                        {i + 1}
                      </span>

                      {/* Name / Domain */}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-300 truncate block">
                          {biz.domain || biz.name}
                        </span>
                      </div>

                      {/* Score */}
                      <span
                        className={`text-sm font-mono font-bold tabular-nums ${getTierColor(biz.audit_tier)}`}
                      >
                        {biz.audit_score}
                        <span className="text-zinc-600">/100</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold transition-all duration-300 hover:translate-y-[-1px]"
              >
                See the Full Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-400 text-sm font-semibold transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50"
              >
                Read Our Research
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SECTION 6: FAQ ===== */}
      <section className="faq-section py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                q: 'What is an Agent Readiness Score?',
                a: 'A 0-100 rating that measures how well a business can be discovered, used, and paid by AI agents. It evaluates machine-readable profiles, API endpoints, onboarding flows, structured pricing, payments, and more across 9 dimensions.',
              },
              {
                q: 'How is the score calculated?',
                a: 'We scan 9 dimensions: Discoverability, API Quality, Onboarding, Pricing, Payment, Data Quality, Security, Reliability, and Agent Experience. Service foundation accounts for 60%, accessibility adds 25%, and agent-native features provide a 15% bonus.',
              },
              {
                q: 'Is it free?',
                a: 'Yes, completely free. Enter any URL and get your score in seconds. No signup or credit card required. Free forever.',
              },
              {
                q: 'How can I improve my score?',
                a: 'Add an A2A Agent Card, publish llms.txt, expose MCP endpoints, add structured pricing, enable programmatic payments, and implement API-based onboarding. Our remediation tools show you exactly what to fix and can auto-generate many of these for you.',
              },
              {
                q: 'What are the score tiers?',
                a: 'Platinum (90-100): Certified, zero-friction. Gold (75-89): Fully agent-native. Silver (60-74): Agent-usable with friction. Bronze (40-59): Partially discoverable. Below 40: Invisible to AI agents.',
              },
            ].map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 60}>
                <details
                  className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/60 transition-all duration-300"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-sm font-semibold text-zinc-200 pr-4 group-hover:text-white transition-colors duration-300">
                      {faq.q}
                    </h3>
                    <span className="text-zinc-600 group-open:rotate-45 transition-transform duration-300 text-lg flex-shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-zinc-500 leading-relaxed mt-3 pt-3 border-t border-zinc-800/50">
                    {faq.a}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-8 text-center">
              <p className="text-sm text-zinc-500 mb-3">
                New to the agent economy? Explore key terms and concepts.
              </p>
              <Link
                href="/glossary"
                className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300"
              >
                Agent Economy Glossary
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="relative py-24 sm:py-32 border-t border-zinc-800/50 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 cta-gradient-bg" />
        {/* Subtle radial glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent)] rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The agent economy is coming.{' '}
              <span className="bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent">Will your business be ready?</span>
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="text-zinc-400 text-lg mb-6 max-w-lg mx-auto">
              The first businesses to become agent-native capture the market.
              Start with your score.
            </p>
          </FadeIn>

          {/* Urgency progress bar */}
          <FadeIn delay={200}>
            <div className="max-w-sm mx-auto mb-10">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                <span>Agent adoption progress</span>
                <span className="text-emerald-400 font-mono">73%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full progress-bar-animate" />
              </div>
              <p className="text-[11px] text-zinc-600 mt-2">
                73% of enterprise AI budgets now include autonomous agent workflows
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all duration-300 cta-button-glow"
              >
                Get Your Score
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50"
              >
                Explore the Network
                <Compass className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
