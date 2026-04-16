import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Mail,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  User,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Resend Is the Only Gold — What 499 Businesses Can Learn | AgentHermes',
  description:
    'Out of 500 businesses scanned, only Resend scored Gold (75). Here is exactly what they do right across all 9 dimensions — and why the next closest is 3 points away.',
  openGraph: {
    title: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
    description:
      'Out of 500 businesses scanned, only Resend scored Gold (75). Here is exactly what they do right across all 9 dimensions — and why the next closest is 3 points away.',
    url: 'https://agenthermes.ai/blog/resend-only-gold',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resend Is the Only Gold — AgentHermes Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
    description:
      'Out of 500 businesses scanned, only Resend scored Gold (75). Here is exactly what they do right across all 9 dimensions — and why the next closest is 3 points away.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/resend-only-gold',
  },
}

// ---------------------------------------------------------------------------
// Leaderboard Data
// ---------------------------------------------------------------------------

const topSix = [
  { rank: 1, name: 'Resend', score: 75, tier: 'Gold', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { rank: 2, name: 'Agora', score: 72, tier: 'Silver', color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
  { rank: 3, name: 'Vercel', score: 70, tier: 'Silver', color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
  { rank: 4, name: 'Statuspage', score: 70, tier: 'Silver', color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
  { rank: 5, name: 'TikTok', score: 69, tier: 'Silver', color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
  { rank: 6, name: 'Supabase', score: 69, tier: 'Silver', color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
]

const silverComparisons = [
  { name: 'Stripe', score: 68, gap: 'Pricing transparency (D4) at 45 drags the score down. No programmatic pricing API.' },
  { name: 'GitHub', score: 67, gap: 'Onboarding (D3) requires human-driven signup. No agent-card.json or llms.txt.' },
  { name: 'Vercel', score: 70, gap: '5 points away. Strong API but limited agent discovery layer and no structured pricing endpoint.' },
]

// ---------------------------------------------------------------------------
// Dimension Breakdown — Resend
// ---------------------------------------------------------------------------

const resendDimensions = [
  {
    id: 'D1',
    label: 'Discoverability',
    score: 70,
    verdict: 'strong',
    icon: Globe,
    analysis:
      'Resend publishes clean documentation with structured API references, clear endpoint descriptions, and a well-organized developer hub. Their site uses proper meta tags and Schema.org markup. The gap to a perfect score is the absence of an agent-card.json and llms.txt — standard agent discovery files that would let AI agents find Resend without relying on search engines.',
  },
  {
    id: 'D2',
    label: 'API Quality',
    score: 88,
    verdict: 'excellent',
    icon: Zap,
    analysis:
      'This is where Resend dominates. Their REST API is clean, minimal, and consistent. Every endpoint returns well-structured JSON with proper HTTP status codes. Error responses include machine-readable error types, not HTML error pages. They publish an OpenAPI spec, which means any agent can auto-generate a client. Response times are consistently fast — sub-200ms for most operations. The API does one thing (email) and does it exceptionally well.',
  },
  {
    id: 'D3',
    label: 'Onboarding',
    score: 72,
    verdict: 'strong',
    icon: User,
    analysis:
      'Resend offers one of the smoothest onboarding experiences we have scanned. You can sign up, get an API key, and send your first email in under 2 minutes. While the initial signup still requires a human, the friction is minimal compared to competitors that demand credit card details, identity verification, or multi-step approval flows. Once signed up, everything is API-first.',
  },
  {
    id: 'D4',
    label: 'Pricing Transparency',
    score: 68,
    verdict: 'good',
    icon: CreditCard,
    analysis:
      'Resend publishes clear pricing tiers on their website: a generous free tier (100 emails/day), a Pro tier, and Enterprise. The pricing structure is simple enough for an agent to parse from the page. It loses points because there is no programmatic pricing API — an agent cannot query current plan details or compare tiers via an endpoint. But the simplicity of the pricing model itself is a strength most SaaS companies lack.',
  },
  {
    id: 'D5',
    label: 'Payment',
    score: 65,
    verdict: 'good',
    icon: CreditCard,
    analysis:
      'Standard Stripe-powered billing with self-serve plan management. Agents can upgrade through the dashboard flow, but there is no dedicated billing API for programmatic plan changes. The free tier means an agent can start using Resend without any payment at all — a significant advantage for autonomous agent adoption.',
  },
  {
    id: 'D6',
    label: 'Data Quality',
    score: 80,
    verdict: 'strong',
    icon: Layers,
    analysis:
      'API responses are clean JSON with consistent field naming, proper types, and predictable structure. Email status tracking returns structured delivery events (sent, delivered, bounced, complained) with timestamps. Every object has an ID and metadata. An agent parsing Resend responses never has to guess the schema.',
  },
  {
    id: 'D7',
    label: 'Security',
    score: 74,
    verdict: 'strong',
    icon: Shield,
    analysis:
      'TLS everywhere, API key authentication with per-key scoping, domain verification with DKIM/SPF, and webhook signature verification. Rate limiting is documented and returns proper 429 responses with Retry-After headers. The score is not higher because there is no OAuth2 flow for agent-to-agent delegation, which would enable more sophisticated multi-agent architectures.',
  },
  {
    id: 'D8',
    label: 'Reliability',
    score: 78,
    verdict: 'strong',
    icon: Target,
    analysis:
      'Resend maintains a public status page and delivers consistently fast API response times. Email delivery is backed by proper queue infrastructure with retry logic. Webhook delivery includes automatic retries on failure. For an agent that needs to reliably send email at scale, this is the kind of infrastructure that builds trust.',
  },
  {
    id: 'D9',
    label: 'Agent Experience',
    score: 82,
    verdict: 'excellent',
    icon: Sparkles,
    analysis:
      'Official SDKs in Node.js, Python, Ruby, PHP, Go, and Elixir. The documentation includes copy-paste examples for every endpoint. Error messages are specific and actionable — an agent that hits an error can self-correct without human intervention. The API surface is small enough that an agent can hold the entire capability set in context. Resend is proof that a focused, well-documented API beats a sprawling one for agent readiness.',
  },
]

function getVerdictColor(verdict: string) {
  switch (verdict) {
    case 'excellent':
      return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
    case 'strong':
      return { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
    case 'good':
      return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' }
    case 'partial':
      return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' }
    case 'weak':
      return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
    default:
      return { text: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' }
  }
}

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

const faqs = [
  {
    question: 'Why is Resend the only Gold-tier business out of 500?',
    answer:
      'Gold tier requires a score of 75 or above, which demands strong performance across ALL 9 dimensions. Most businesses excel in 2-3 dimensions but have blind spots in discovery, pricing transparency, or onboarding. Resend has no dimension below 65 — that consistency is what pushes them over the Gold threshold. The next closest (Agora at 72) has weaker onboarding and pricing transparency.',
  },
  {
    question: 'What does Gold tier mean for agents interacting with Resend?',
    answer:
      'Gold tier means an AI agent can discover Resend, understand its capabilities, sign up with minimal friction, integrate the API, send emails reliably, and manage billing — all with high confidence. A Gold-tier business is one an agent would recommend and use autonomously. Silver-tier businesses (60-74) can be used by agents but usually require human intervention at one or more steps.',
  },
  {
    question: 'How is the Agent Readiness Score calculated?',
    answer:
      'We scan businesses across 9 weighted dimensions: Discoverability (12%), API Quality (15%), Onboarding (8%), Pricing Transparency (5%), Payment (8%), Data Quality (10%), Security (12%), Reliability (13%), and Agent Experience (10%), plus an Agent-Native Bonus (7%). Each dimension is scored 0-100 and the weighted average produces the final score. Tier thresholds: Platinum 90+, Gold 75+, Silver 60+, Bronze 40+, Not Scored below 40.',
  },
  {
    question: 'Why did zero businesses score Platinum (90+)?',
    answer:
      'Platinum requires near-perfect agent readiness: an A2A agent card, an MCP server exposing capabilities, programmatic pricing APIs, fully autonomous onboarding, and OAuth2 for agent delegation. No business has built all of these yet because the agent economy infrastructure is still emerging. Even Resend at 75 would need agent-card.json, an MCP server, a pricing API, and OAuth2 scoped tokens to approach Platinum. We expect the first Platinum scores in late 2026 or 2027.',
  },
  {
    question: 'How can my business reach Gold tier?',
    answer:
      'Start by running a free scan at agenthermes.ai/audit to see your current score and dimension breakdown. The highest-leverage improvements are usually D1 Discoverability (publish agent-card.json and llms.txt), D2 API Quality (return structured JSON with proper error codes), and D4 Pricing Transparency (make pricing machine-readable). The Resend playbook is simple: do one thing, document it clearly, keep the API surface small, and make onboarding frictionless.',
  },
]

// ---------------------------------------------------------------------------
// TOC
// ---------------------------------------------------------------------------

const tocSections = [
  { id: 'the-numbers', label: 'The Numbers' },
  { id: 'leaderboard', label: 'Top 6 Leaderboard' },
  { id: 'what-makes-resend-different', label: 'What Makes Resend Different' },
  { id: 'dimension-breakdown', label: '9-Dimension Breakdown' },
  { id: 'silver-gap', label: 'Why Silver Falls Short' },
  { id: 'platinum-gap', label: 'The Platinum Gap' },
  { id: 'lessons', label: 'Lessons for 499 Others' },
  { id: 'faq', label: 'FAQ' },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ResendOnlyGoldPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
    description:
      'Out of 500 businesses scanned, only Resend scored Gold (75). A dimension-by-dimension analysis of what they do right.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/resend-only-gold',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1900,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Resend Is the Only Gold',
          item: 'https://agenthermes.ai/blog/resend-only-gold',
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
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <span className="text-zinc-400">Resend Analysis</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
              <Trophy className="h-3.5 w-3.5" />
              Gold Tier
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              500 Businesses Scanned
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Resend Is the Only{' '}
            <span className="text-yellow-400">Gold</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-8">
            We scanned 500 businesses across every vertical. The average Agent Readiness Score is 43 out of 100.
            Zero scored Platinum. Exactly one scored Gold: <strong className="text-zinc-100">Resend, at 75</strong>.
            Here is what an email API company does that 499 other businesses do not — and why the gap between
            Gold and the average is a 32-point canyon.
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

      {/* ===== TABLE OF CONTENTS (desktop sidebar) ===== */}
      <div className="hidden xl:block fixed right-[max(1rem,calc((100vw-64rem)/2-14rem))] top-28 w-52 z-20">
        <nav className="toc-sidebar">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-3 pl-3">On this page</div>
          {tocSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="block">
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ===== THE NUMBERS ===== */}
      <section id="the-numbers" className="pb-12 sm:pb-16 border-t border-zinc-800/50 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            The Numbers Tell the Story
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-zinc-100">500</div>
              <div className="text-xs text-zinc-500 mt-1">Businesses Scanned</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-zinc-400">43</div>
              <div className="text-xs text-zinc-500 mt-1">Average Score</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-yellow-400">1</div>
              <div className="text-xs text-zinc-500 mt-1">Gold Tier (75+)</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-purple-400">0</div>
              <div className="text-xs text-zinc-500 mt-1">Platinum (90+)</div>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              When we started scanning businesses for agent readiness, we expected a distribution curve. We expected a handful
              of Platinum-tier leaders, a healthy cluster of Gold, and a long tail of Bronze. What we found instead was a
              cliff: the overwhelming majority of businesses — even well-known SaaS companies with excellent developer
              reputations — cluster in the <strong className="text-zinc-100">Bronze tier (40-59)</strong> or below.
            </p>
            <p>
              The average Agent Readiness Score across 500 businesses is <strong className="text-zinc-100">43 out of 100</strong>.
              That is barely above the Bronze threshold of 40. It means the typical business is visible to agents but not usable
              by them. Agents can find these businesses through search, maybe parse some documentation, and then hit a wall
              of human-only onboarding flows, opaque pricing, and APIs that return HTML error pages instead of structured JSON.
            </p>
            <p>
              Against this backdrop, Resend&apos;s score of <strong className="text-yellow-400">75</strong> is not just
              impressive — it is an anomaly. The next closest business, Agora, scores 72. After that, Vercel and Statuspage
              tie at 70. Then TikTok and Supabase at 69, and Stripe at 68. The drop from 75 to the average of 43 is a 32-point
              gap. That gap represents the distance between &ldquo;an agent can use this&rdquo; and &ldquo;an agent can find this
              but cannot do anything with it.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ===== LEADERBOARD ===== */}
      <section id="leaderboard" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <Award className="h-6 w-6 text-yellow-500" />
            Top 6 Leaderboard
          </h2>

          <div className="space-y-3 mb-8">
            {topSix.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  entry.rank === 1
                    ? 'bg-yellow-500/5 border-yellow-500/20'
                    : 'bg-zinc-900/50 border-zinc-800/80'
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold text-lg ${
                  entry.rank === 1
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    : 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/50'
                }`}>
                  {entry.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${entry.rank === 1 ? 'text-yellow-400' : 'text-zinc-200'}`}>
                      {entry.name}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${entry.bg} border ${entry.border} ${entry.color}`}>
                      {entry.tier}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${entry.rank === 1 ? 'text-yellow-400' : 'text-zinc-300'}`}>
                    {entry.score}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed">
            Full leaderboard available at{' '}
            <Link href="/leaderboard" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              agenthermes.ai/leaderboard
            </Link>
            . Scores updated as new scans complete.
          </p>
        </div>
      </section>

      {/* ===== WHAT MAKES RESEND DIFFERENT ===== */}
      <section id="what-makes-resend-different" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Mail className="h-6 w-6 text-yellow-500" />
            What Makes Resend Different
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Resend is an email API company. That sentence alone explains half their score. They are not trying to be
              a platform, a marketplace, or an ecosystem. They send email through an API. The simplicity of the product
              is inseparable from the quality of the agent experience.
            </p>
            <p>
              But product focus alone does not earn a 75. Plenty of focused API products score in the 40s and 50s.
              What separates Resend is <strong className="text-zinc-100">consistency across all 9 dimensions</strong>.
              Their lowest dimension score is 65 (Payment). Their highest is 88 (API Quality). That 23-point spread
              between worst and best dimension is unusually tight. By comparison, Stripe has a 45-point spread
              (Pricing Transparency at 45, Agent Experience at 90). Vercel has a similar gap. The businesses that
              score high in one or two dimensions but collapse in others end up in Silver.
            </p>
            <p>
              Resend&apos;s playbook can be summarized in four principles that any business can adopt:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Small API surface, deep documentation',
                detail: 'Resend has a handful of endpoints, each documented with examples in 6+ languages. An agent can hold the entire API in context. Contrast this with Stripe, which has hundreds of endpoints — powerful, but harder for an agent to reason about.',
                icon: Zap,
              },
              {
                title: 'Structured everything',
                detail: 'Every API response is predictable JSON. Every error is machine-readable with a typed error code. Every webhook payload follows a consistent schema. An agent never has to guess how to parse a Resend response.',
                icon: Layers,
              },
              {
                title: 'Low-friction onboarding',
                detail: 'Signup to first API call in under 2 minutes. A generous free tier (100 emails per day) means an agent can test Resend without any payment flow. The less friction between discovery and usage, the higher the score.',
                icon: User,
              },
              {
                title: 'Transparent pricing',
                detail: 'Simple, publicly visible pricing tiers with no hidden fees or sales-gated enterprise pricing. An agent comparing email providers can parse Resend pricing from the website without scraping complex pricing calculators.',
                icon: CreditCard,
              },
            ].map((principle, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-2 mb-3">
                  <principle.icon className="h-4 w-4 text-yellow-400" />
                  <h3 className="font-bold text-zinc-100 text-sm">{principle.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{principle.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIMENSION BREAKDOWN ===== */}
      <section id="dimension-breakdown" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            Resend: 9-Dimension Breakdown
          </h2>

          <div className="space-y-6">
            {resendDimensions.map((dim) => {
              const colors = getVerdictColor(dim.verdict)
              return (
                <div
                  key={dim.id}
                  className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50">
                        <dim.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-100">
                          {dim.id}: {dim.label}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-zinc-100">{dim.score}</div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} border ${colors.border} ${colors.text}`}
                      >
                        {dim.verdict}
                      </span>
                    </div>
                  </div>
                  {/* Score bar */}
                  <div className="w-full h-2 rounded-full bg-zinc-800 mb-4">
                    <div
                      className={`h-2 rounded-full bar-animate ${
                        dim.score >= 75
                          ? 'bg-emerald-500'
                          : dim.score >= 60
                          ? 'bg-blue-500'
                          : dim.score >= 45
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed" style={{ lineHeight: '1.75' }}>
                    {dim.analysis}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY SILVER FALLS SHORT ===== */}
      <section id="silver-gap" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <XCircle className="h-6 w-6 text-zinc-500" />
            Why Silver Falls Short: Stripe, GitHub, and Vercel
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The Silver tier (60-74) is crowded with excellent companies. Stripe at 68, GitHub at 67, Vercel at 70 —
              these are some of the most developer-loved products in the industry. So why can they not break into Gold?
            </p>
            <p>
              The answer is always the same: <strong className="text-zinc-100">dimension inconsistency</strong>. Every
              Silver-tier company has at least one dimension that drags their weighted average below 75. For Stripe, it
              is pricing transparency. For GitHub, it is onboarding friction. For Vercel, it is the lack of a structured
              agent discovery layer. These are not fatal flaws — they are gaps that reflect the fact that most businesses
              were built for human developers, not for AI agents.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {silverComparisons.map((company) => (
              <div
                key={company.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-zinc-100">{company.name}</h3>
                  <span className="text-xl font-bold text-zinc-400">{company.score}</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{company.gap}</p>
              </div>
            ))}
          </div>

          <div className="callout-box mb-8">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 !mt-0">
              <Lock className="h-5 w-5" />
              The Consistency Principle
            </h3>
            <div className="space-y-3 text-zinc-300 leading-relaxed text-sm">
              <p>
                Agent readiness is not about having one perfect dimension. It is about having no terrible ones. Resend
                does not lead any single dimension — Stripe&apos;s Agent Experience score of 90 is higher than anything
                Resend has. But Stripe&apos;s Pricing Transparency at 45 pulls the entire weighted average down.
              </p>
              <p>
                Think of it like a chain: the overall score is limited by the weakest dimension. An agent evaluating a business
                follows a 6-step journey (find, understand, sign up, connect, use, pay). If any step fails, the entire
                journey breaks. Resend has no broken step. That is the difference between 75 and 68.
              </p>
            </div>
          </div>

          <p className="text-zinc-400 leading-relaxed text-sm">
            For a deeper analysis of Stripe&apos;s dimension-by-dimension breakdown, see{' '}
            <Link href="/blog/why-stripe-scores-68" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              Why Stripe Scores 68 Silver
            </Link>.
          </p>
        </div>
      </section>

      {/* ===== THE PLATINUM GAP ===== */}
      <section id="platinum-gap" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Trophy className="h-6 w-6 text-purple-500" />
            The Platinum Gap: Why Nobody Scores 90+
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Zero businesses in our 500-scan dataset scored Platinum. This is not a calibration error — it reflects
              the current state of agent economy infrastructure. Platinum requires capabilities that almost no business
              has built yet:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                requirement: 'Published A2A agent card at /.well-known/agent-card.json',
                status: 'Almost nobody',
                icon: Globe,
              },
              {
                requirement: 'MCP server exposing business capabilities as tools',
                status: 'Supabase and a handful of others',
                icon: Sparkles,
              },
              {
                requirement: 'Programmatic pricing API for agent comparison shopping',
                status: 'Zero businesses scanned',
                icon: CreditCard,
              },
              {
                requirement: 'OAuth2 scoped tokens for agent-to-agent delegation',
                status: 'Rare, even among API-first companies',
                icon: Shield,
              },
              {
                requirement: 'Fully autonomous onboarding with no human-required steps',
                status: 'Resend comes closest with its free tier',
                icon: User,
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 shrink-0">
                  <item.icon className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{item.requirement}</p>
                  <p className="text-xs text-zinc-500 mt-1">{item.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The Platinum gap is real, and it represents an infrastructure problem, not a quality problem. Even Resend —
              the best-scoring business in our database — would need to add agent-card.json, build an MCP server, expose
              a pricing API, and implement OAuth2 scoped tokens to approach 90. These are not incremental improvements.
              They are architectural decisions that require the industry to collectively invest in agent-native protocols.
            </p>
            <p>
              We expect the first Platinum scores to emerge when the{' '}
              <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                ARL-6 (Interoperable) standard
              </Link>{' '}
              gains adoption — likely late 2026 or 2027. The businesses that invest now will be first.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LESSONS FOR 499 OTHERS ===== */}
      <section id="lessons" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-emerald-500" />
            Lessons for 499 Other Businesses
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Resend did not score Gold by chasing agent readiness as a goal. They scored Gold because they built
              a product with the right engineering principles — clean APIs, clear documentation, simple pricing,
              low friction — and those principles happen to be exactly what agents need. The lessons are transferable
              to any business, in any vertical.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Fix your worst dimension first',
                text: 'Your overall score is dragged down by your weakest dimensions, not lifted by your strongest. Stripe could gain 7+ points by fixing pricing transparency alone. Identify your lowest-scoring dimension and address it before optimizing what is already strong.',
              },
              {
                title: 'Publish agent-card.json and llms.txt today',
                text: 'Two static files. Zero code changes. 5-10 point potential improvement on Discoverability (D1). This is the single highest-ROI action any business can take for agent readiness. Most businesses we scan do not have them.',
              },
              {
                title: 'Return JSON errors, not HTML pages',
                text: 'When an agent hits your API with a bad request, returning a structured JSON error with a typed error code is worth dramatically more than an HTML 500 page. This one pattern can move your API Quality (D2) score by 15-20 points.',
              },
              {
                title: 'Simplify your onboarding flow',
                text: 'Every step that requires human judgment — CAPTCHA, email verification, phone verification, manual approval — is a step where agents fail. Resend gets you from signup to API call in under 2 minutes. If your onboarding takes 10 steps, agents abandon at step 3.',
              },
              {
                title: 'Make pricing machine-readable',
                text: 'This is the industry blind spot. Almost every SaaS hides pricing behind sales teams or complex calculators. An agent comparison-shopping your vertical cannot include you if it cannot parse your pricing. The first business in each vertical to publish a pricing API wins agent traffic.',
              },
              {
                title: 'Offer a free tier or sandbox',
                text: 'Resend offers 100 free emails per day. This means an agent can discover Resend, sign up, and test it without any payment flow. A free tier is not generosity — it is an agent acquisition channel. The agent evaluates, the agent recommends, the human pays.',
              },
            ].map((lesson, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{lesson.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{lesson.text}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-yellow-400">The Resend formula:</strong> Do one thing. Document it completely.
              Make the API surface small enough for an agent to hold in context. Price it simply. Let people start for free.
              Return structured data everywhere. That formula produces a Gold-tier Agent Readiness Score. It is not
              complicated — it is just rare.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-emerald-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="font-bold text-zinc-100 mb-3 text-base">{faq.question}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed" style={{ lineHeight: '1.75' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED READING ===== */}
      <section className="pb-12 sm:pb-16">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-zinc-300">Related Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Why Stripe Scores 68 Silver',
                href: '/blog/why-stripe-scores-68',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'SaaS Agent Readiness: The Full Report',
                href: '/blog/saas-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Agent Readiness Levels Explained',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
            ].map((related) => (
              <Link
                key={related.href}
                href={related.href}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 article-card-hover"
              >
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${
                    related.tagColor === 'emerald'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : related.tagColor === 'purple'
                      ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                      : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}
                >
                  {related.tag}
                </span>
                <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors leading-snug">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHARE BUTTONS ===== */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <hr className="section-divider mb-8" />
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-500 font-medium">Share this analysis:</span>
            <a
              href="https://twitter.com/intent/tweet?text=Out%20of%20500%20businesses%20scanned%2C%20only%20Resend%20scored%20Gold%20(75)%20on%20the%20Agent%20Readiness%20Score.%20Here%27s%20why.&url=https://agenthermes.ai/blog/resend-only-gold"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://agenthermes.ai/blog/resend-only-gold"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            See where your business ranks
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score and find out how you compare to Resend
            across all 9 dimensions. The scan takes 10 seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Score My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              View Full Leaderboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
