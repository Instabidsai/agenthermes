import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Banknote,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  CreditCard,
  DollarSign,
  FileText,
  HelpCircle,
  Key,
  Layers,
  Lock,
  Network,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Wrench,
  X,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12 | AgentHermes',
  description:
    'Fintech is the most polarized vertical on agent readiness. Stripe 68, Robinhood 66, Allstate 66 — all Silver. Cash App 12, Square 8 — invisible. The split comes down to one decision: did you build for developers or for consumers?',
  keywords: [
    'fintech agent readiness',
    'Stripe vs Cash App',
    'fintech AI agents',
    'payments API',
    'consumer fintech agent',
    'financial services agent ready',
    'PCI agent compliance',
    'agent-ready payments',
  ],
  openGraph: {
    title: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12',
    description:
      'Stripe 68. Cash App 12. Square 8. The fintech agent-readiness split, decoded from 500 business scans.',
    url: 'https://agenthermes.ai/blog/fintech-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fintech Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fintech Agent Readiness: Stripe 68 vs Cash App 12',
    description:
      'Same industry, 56-point gap. Here is what separates agent-ready fintech from agent-invisible fintech.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/fintech-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const fintechScores = [
  { name: 'Stripe', score: 68, tier: 'Silver', type: 'Developer-first payments', color: 'emerald' },
  { name: 'Robinhood', score: 66, tier: 'Silver', type: 'Public API + OAuth', color: 'emerald' },
  { name: 'Allstate', score: 66, tier: 'Silver', type: 'Structured quote API', color: 'emerald' },
  { name: 'Cash App', score: 12, tier: 'Dark', type: 'Consumer mobile app', color: 'red' },
  { name: 'Square', score: 8, tier: 'Dark', type: 'POS hardware + app', color: 'red' },
]

const whyTheSplit = [
  {
    trait: 'Who is the customer',
    winner: 'Stripe built for developers from day one. Customer = engineer. Contract = API.',
    loser: 'Cash App built for consumers. Customer = person with a phone. Contract = tap-to-pay.',
    icon: Target,
  },
  {
    trait: 'Where the product lives',
    winner: 'On the internet, callable via HTTPS. Every action has a documented endpoint.',
    loser: 'On the phone, callable via touch. Internet presence is marketing, not a product surface.',
    icon: Network,
  },
  {
    trait: 'How errors are reported',
    winner: 'Typed error objects with codes, doc URLs, and retry hints. Agents can reason about them.',
    loser: 'Toast notifications inside an app. Invisible to anything that is not a human eyeball.',
    icon: Shield,
  },
  {
    trait: 'How onboarding works',
    winner: 'OAuth, API keys, webhook secrets. Automatable. An agent can provision itself.',
    loser: 'Email + SMS code + selfie + government ID. Automatable by no one. Blocks all agent flows.',
    icon: Key,
  },
  {
    trait: 'Where pricing lives',
    winner: 'A /pricing page with structured JSON-LD Offer markup and a machine-readable fee schedule.',
    loser: 'A FAQ paragraph saying "fees may apply." Agents cannot compute cost.',
    icon: DollarSign,
  },
]

const consumerFintechPlaybook = [
  {
    step: '1',
    title: 'Ship a public developer portal',
    detail: 'Even if your main product is a consumer app. Venmo has one. Cash App does not. This single move unlocks 30+ points across D2 API Quality, D9 Agent Experience, and D3 Onboarding.',
    icon: Code2,
  },
  {
    step: '2',
    title: 'Publish a machine-readable fee schedule',
    detail: 'A /fees.json file listing every fee by transaction type. Or structured JSON-LD Offer markup on your pricing page. D4 Pricing is only weighted 0.05, but the universal failure rate is massive — 30% of businesses get zero points here.',
    icon: DollarSign,
  },
  {
    step: '3',
    title: 'Expose transaction status as JSON',
    detail: 'A GET /transactions/{id} endpoint that returns status, amount, timestamps, and fees as JSON. Agents need to verify what happened. Consumer apps only show this in the UI.',
    icon: FileText,
  },
  {
    step: '4',
    title: 'Add OAuth with scoped permissions',
    detail: 'Users authorize an agent to "send payments up to $500/day" or "read transaction history only." OAuth 2.0 with granular scopes is the only auth pattern that scales to agent-mediated commerce.',
    icon: Lock,
  },
  {
    step: '5',
    title: 'Ship an agent-card.json',
    detail: 'The A2A discovery standard. Lists your developer portal URL, OAuth endpoints, supported operations, and rate limits. 3kb of JSON that turns your business from invisible to discoverable.',
    icon: Sparkles,
  },
]

const dimensions = [
  { dim: 'D1 Discovery (0.12)', stripe: '9/10 — public API, OpenAPI spec, SDKs indexed', cashApp: '2/10 — consumer site, no developer presence' },
  { dim: 'D2 API Quality (0.15)', stripe: '10/10 — industry-benchmark OpenAPI spec', cashApp: '0/10 — no public API' },
  { dim: 'D3 Onboarding (0.08)', stripe: '8/10 — self-serve API keys, sandbox, docs', cashApp: '1/10 — consumer-only signup flow' },
  { dim: 'D4 Pricing (0.05)', stripe: '7/10 — structured fee table, published rates', cashApp: '3/10 — FAQ mentions, no machine-readable rates' },
  { dim: 'D5 Payment (0.08)', stripe: '9/10 — is the payment rail', cashApp: '6/10 — works for consumers, not agents' },
  { dim: 'D6 Data (0.10)', stripe: '9/10 — typed schemas for every object', cashApp: '0/10 — no public data access' },
  { dim: 'D7 Security (0.12)', stripe: '10/10 — OAuth + HMAC webhooks + key rotation', cashApp: '4/10 — security exists but not exposed to agents' },
  { dim: 'D8 Reliability (0.13)', stripe: '9/10 — public status page, SLA commitments', cashApp: '1/10 — status via Twitter thread' },
  { dim: 'D9 Agent Exp (0.10)', stripe: '8/10 — error codes, rate limit headers, changelog', cashApp: '0/10 — no agent surface area' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does Stripe score 68 while Cash App scores 12 — they are both fintech?',
    answer:
      'Because Stripe built for developers and Cash App built for consumers. Stripe has a public API, OpenAPI spec, SDKs in every language, webhook system, and OAuth — all things AI agents need. Cash App is a mobile app for peer-to-peer payments with no public developer API. Agents cannot transact through Cash App because there is no interface to call. Same industry, opposite strategies, 56-point gap.',
  },
  {
    question: 'Is regulatory compliance the reason consumer fintech scores low?',
    answer:
      'No, and this is the common misconception. Stripe is PCI Level 1 compliant, KYC/AML regulated, and handles more regulatory load than Cash App — yet Stripe scores 68 and Cash App scores 12. Compliance does not prevent agent readiness. In fact, Stripe proves that structured, compliant, agent-ready fintech is the same thing. The blocker is product strategy, not regulation.',
  },
  {
    question: 'Can a consumer fintech like Cash App become agent-ready?',
    answer:
      'Yes. The playbook is straightforward: ship a developer portal, publish an OpenAPI spec, add OAuth with scoped permissions, expose transaction status as JSON, and publish a machine-readable fee schedule. None of these changes conflict with the existing consumer product. They run in parallel. Venmo has already done most of this. Cash App and Square have not.',
  },
  {
    question: 'What should a new fintech startup do differently in 2026?',
    answer:
      'Build API-first from day one even if your primary product is a consumer app. The cost of adding a developer portal later is 10x the cost of shipping one at launch. Every agent-mediated transaction is a transaction a non-agent-ready competitor loses. Fintech is especially vulnerable because money movement is exactly the kind of task users will delegate to agents — subscription management, bill pay, expense categorization, tax prep.',
  },
  {
    question: 'Does an agent need OAuth or is an API key enough?',
    answer:
      'For consumer-mediated transactions — where an agent acts on behalf of a specific user — OAuth with scoped permissions is essentially required. API keys identify an application, not a user. A user needs to be able to grant an agent permission to "read my transactions" or "send payments up to $500" and revoke it later. OAuth 2.0 with granular scopes is the standard, and any fintech serious about agent-mediated commerce needs it.',
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

export default function FintechAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12',
    description:
      'Fintech is the most polarized vertical on agent readiness. Stripe 68, Robinhood 66, Allstate 66 — all Silver. Cash App 12, Square 8 — invisible. The split comes down to one decision: did you build for developers or for consumers?',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/fintech-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Industry Analysis',
    wordCount: 1900,
    keywords:
      'fintech agent readiness, Stripe, Cash App, Square, Robinhood, consumer fintech agent, payments API',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Fintech Agent Readiness',
          item: 'https://agenthermes.ai/blog/fintech-agent-readiness',
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
      title="Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12"
      shareUrl="https://agenthermes.ai/blog/fintech-agent-readiness"
      currentHref="/blog/fintech-agent-readiness"
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
            <span className="text-zinc-400">Fintech Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Banknote className="h-3.5 w-3.5" />
              Industry Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Fintech
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Fintech Agent Readiness: Why Stripe Scores 68{' '}
            <span className="text-emerald-400">While Cash App Scores 12</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Fintech is the most polarized vertical on the Agent Readiness leaderboard.{' '}
            <strong className="text-zinc-100">Stripe 68. Robinhood 66. Allstate 66.</strong> All Silver
            tier.{' '}
            <strong className="text-zinc-100">Cash App 12. Square 8.</strong> Effectively invisible. Same
            industry, 56-point spread. Here is the one decision that explains all of it.
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

      {/* ===== THE SPLIT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The Fintech Split: Five Companies, Two Universes
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Fintech is the most polarized vertical on agent readiness because it contains both the
              most sophisticated API-first companies on the internet and the most consumer-locked mobile
              apps, with almost no middle ground. Five companies from our 500-business scan illustrate
              the gap.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Company</div>
              <div>Score</div>
              <div>Tier</div>
              <div>Type</div>
            </div>
            {fintechScores.map((co, i) => {
              const colors = getColorClasses(co.color)
              return (
                <div
                  key={co.name}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{co.name}</div>
                  <div className={`${colors.text} font-bold`}>{co.score}</div>
                  <div className={colors.text}>{co.tier}</div>
                  <div className="text-zinc-500">{co.type}</div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '56 pts', label: 'Stripe vs Cash App gap', icon: TrendingUp },
              { value: '0', label: 'consumer-first at Silver', icon: X },
              { value: '100%', label: 'Silver fintech = developer API', icon: CheckCircle2 },
              { value: '3 of 5', label: 'fintech below Bronze', icon: Target },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY THE SPLIT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Single Decision That Explains Everything
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              The one decision that explains the 56-point gap is{' '}
              <strong className="text-zinc-100">who the customer is</strong>. Stripe decided its customer
              was a developer. Cash App decided its customer was a phone-toting consumer. Every
              downstream choice — API design, auth model, error handling, pricing presentation,
              onboarding flow — flowed from that single decision. Five years later, one decision
              accidentally made Stripe agent-ready while the other accidentally made Cash App invisible.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {whyTheSplit.map((item) => (
              <div
                key={item.trait}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <item.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{item.trait}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <div className="text-xs font-semibold text-emerald-400 mb-1">Agent-ready fintech</div>
                    <div className="text-zinc-300 leading-relaxed">{item.winner}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <div className="text-xs font-semibold text-red-400 mb-1">Agent-invisible fintech</div>
                    <div className="text-zinc-400 leading-relaxed">{item.loser}</div>
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
            Stripe vs Cash App: Every Dimension Compared
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The Agent Readiness Score has 9 weighted dimensions. Stripe wins all 9. Some by a lot. Here
            is the breakdown.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension (weight)</div>
              <div className="text-emerald-400">Stripe</div>
              <div className="text-red-400">Cash App</div>
            </div>
            {dimensions.map((d, i) => (
              <div
                key={d.dim}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{d.dim}</div>
                <div className="text-emerald-400">{d.stripe}</div>
                <div className="text-zinc-500">{d.cashApp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE REGULATORY MYTH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            The Regulatory Myth: "We Cannot Be Agent-Ready Because of KYC and PCI"
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The most common excuse for consumer fintech&apos;s poor agent readiness is regulation.
              &ldquo;We handle payments, so we have KYC requirements, PCI-DSS, AML, and state-by-state
              money transmitter rules. We cannot just expose a public API.&rdquo; This is intuitive and
              wrong.
            </p>
            <p>
              <strong className="text-zinc-100">Stripe handles more regulatory load than Cash App.</strong>{' '}
              Stripe processes card payments for millions of merchants across 46 countries. Stripe is PCI
              Level 1 certified. Stripe maintains KYB (Know Your Business) on every Connected account.
              Stripe operates under money transmitter licenses in all 50 US states. And Stripe scores 68
              on agent readiness.
            </p>
            <p>
              Regulation is not the blocker. The blocker is{' '}
              <strong className="text-zinc-100">product strategy</strong>. Stripe decided from day one
              that compliance and a great developer API were not opposites — they were the same product.
              The compliance work happens server-side; the API exposes structured, auditable, revocable,
              scoped access to exactly what is allowed and no more. Every field in every Stripe API
              object has a well-defined regulatory meaning. That is not despite compliance. That is
              because of it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PLAYBOOK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-purple-500" />
            The Consumer Fintech Playbook: Five Changes That Unlock Agent Readiness
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            If you run a consumer-first fintech and want to move from Dark (&lt;40) to Silver (60+), these
            are the five changes in order of ROI. None of them require abandoning your consumer product.
            All of them run in parallel.
          </p>

          <div className="space-y-3 mb-8">
            {consumerFintechPlaybook.map((item) => (
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

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The asymmetric opportunity:</strong> The first consumer
              fintech to ship a real developer API and OAuth-scoped agent access captures every
              agent-mediated transaction in the category. Bill pay agents, subscription-tracking agents,
              tax-prep agents, expense-categorization agents — all of them will preferentially route
              through whichever consumer fintech makes it easiest. Right now that is nobody.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY FINTECH LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Consumer Fintech Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Imagine a consumer fintech that has done all five of the above. A user tells their AI
              agent: &ldquo;Pay my electric bill when it arrives each month, up to $200, and flag me if
              it is higher.&rdquo; The agent authenticates via OAuth with a scoped permission. It reads
              incoming bills via a webhook. It executes payment via a structured API call. It records
              the transaction with a JSON receipt. The user gets a notification with a link to revoke
              permission at any time.
            </p>
            <p>
              This flow is impossible on Cash App today. It is trivial on Stripe Connect. The difference
              is not technical sophistication — Cash App has a world-class engineering team. The
              difference is which product surface got prioritized. Consumer first means developer surface
              gets neglected. Developer first means the consumer surface sits on top of a rock-solid
              API — which is exactly the substrate agents need.
            </p>
            <p>
              Every fintech startup launching in 2026 will face this decision. Developer-first is no
              longer a &ldquo;niche B2B strategy.&rdquo; It is the prerequisite for being discoverable
              by the fastest-growing customer acquisition channel of the next decade.
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
                title: 'What Makes Stripe Score 68 Silver',
                href: '/blog/why-stripe-scores-68',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'E-commerce Agent Readiness: Shopify vs WooCommerce',
                href: '/blog/ecommerce-agent-readiness',
                tag: 'Industry Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Why Developer Tools Dominate Agent Readiness',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Research',
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
            Score your fintech in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See how your fintech compares to Stripe, Robinhood, and Cash App across all 9 dimensions.
            Free scan, no signup required.
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
              Become Agent-Ready
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
