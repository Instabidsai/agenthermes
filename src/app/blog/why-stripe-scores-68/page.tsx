import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  Key,
  Layers,
  Lock,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Trophy as TrophyIcon,
  User,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Stripe Scores 68 Silver — A Deep Agent Readiness Analysis | AgentHermes',
  description:
    'A dimension-by-dimension analysis of Stripe\'s Agent Readiness Score. From API quality (82) to pricing transparency (45), we break down what makes Stripe a Silver-tier platform and what it needs for Gold.',
  openGraph: {
    title: 'Why Stripe Scores 68 Silver — A Deep Agent Readiness Analysis',
    description:
      'Stripe earned a Silver-tier Agent Readiness Score of 68. Here\'s exactly why — dimension by dimension — and what it needs for Gold.',
    url: 'https://agenthermes.ai/blog/why-stripe-scores-68',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Stripe Scores 68 Silver — AgentHermes Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Stripe Scores 68 Silver — A Deep Agent Readiness Analysis',
    description:
      'Stripe earned a Silver-tier Agent Readiness Score of 68. Here\'s exactly why — dimension by dimension.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/why-stripe-scores-68',
  },
}

// ---------------------------------------------------------------------------
// Dimension Scores Data
// ---------------------------------------------------------------------------

const dimensions = [
  {
    id: 'D1',
    label: 'Discovery',
    score: 58,
    weight: 0.12,
    verdict: 'partial',
    icon: Globe,
    analysis:
      'Stripe has OpenAPI specs and rich documentation, but no agent-card.json, no llms.txt, and no AGENTS.md. An agent can find Stripe through search, but there is no machine-optimized discovery channel. Stripe relies on its brand — not structured agent discovery.',
  },
  {
    id: 'D2',
    label: 'API Quality',
    score: 82,
    weight: 0.15,
    verdict: 'strong',
    icon: Zap,
    analysis:
      'This is where Stripe shines. Clean REST endpoints, consistent JSON responses, proper error objects with machine-readable error codes, idempotency support, and versioned APIs. An agent calling Stripe\'s API gets predictable, parseable responses every time. The 401 response to unauthenticated requests is itself a quality signal — it returns structured JSON with a clear error type, not an HTML login page.',
  },
  {
    id: 'D3',
    label: 'Onboarding',
    score: 55,
    weight: 0.08,
    verdict: 'partial',
    icon: User,
    analysis:
      'Stripe requires human-driven signup: email verification, identity checks, business documentation. There is no API endpoint to programmatically create a Stripe account. An agent cannot autonomously sign up a new merchant. This is Stripe\'s most significant gap for agent readiness — and it is partly by design (KYC requirements).',
  },
  {
    id: 'D4',
    label: 'Pricing Transparency',
    score: 45,
    weight: 0.05,
    verdict: 'weak',
    icon: CreditCard,
    analysis:
      'Stripe publishes pricing on its website (2.9% + 30 cents), but there is no API endpoint to query current pricing, compare plans, or calculate fees programmatically. An agent must scrape the pricing page. Volume discounts are negotiated through sales — completely opaque to agents.',
  },
  {
    id: 'D5',
    label: 'Payment',
    score: 72,
    weight: 0.08,
    verdict: 'strong',
    icon: CreditCard,
    analysis:
      'Ironic for a payment company, but Stripe\'s own payment system scores well — not perfectly. Agents can create payment intents, manage subscriptions, and handle refunds programmatically. But paying FOR Stripe (the merchant\'s bill to Stripe) is less transparent than paying THROUGH Stripe.',
  },
  {
    id: 'D6',
    label: 'Data Quality',
    score: 75,
    weight: 0.10,
    verdict: 'strong',
    icon: Layers,
    analysis:
      'Stripe returns clean, well-documented JSON with consistent field naming, proper types, and pagination. Every object has an id, created timestamp, and metadata support. The data model is one of the most agent-friendly in SaaS.',
  },
  {
    id: 'D7',
    label: 'Security',
    score: 68,
    weight: 0.12,
    verdict: 'good',
    icon: Shield,
    analysis:
      'TLS everywhere, API key authentication, webhook signature verification, and PCI DSS compliance. Rate limiting is well-documented. The score is not higher because there is no OAuth2 flow for agent-to-agent delegation — it is API key only, which limits agent autonomy patterns.',
  },
  {
    id: 'D8',
    label: 'Reliability',
    score: 78,
    weight: 0.13,
    verdict: 'strong',
    icon: Target,
    analysis:
      'Stripe publishes a status page, has historical uptime above 99.99%, and provides idempotency keys to safely retry requests. Response times are consistently fast. Webhook retry logic is built-in. This is the kind of reliability agents need to trust a service.',
  },
  {
    id: 'D9',
    label: 'Agent Experience',
    score: 90,
    weight: 0.10,
    verdict: 'excellent',
    icon: Sparkles,
    analysis:
      'The highest-scoring dimension. Stripe has official SDKs in 7+ languages, interactive API explorers, test mode with realistic fixtures, and extensive error documentation. If an agent is already authenticated, the developer experience of calling Stripe is exceptional. This is the gold standard for API developer experience.',
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
// Page
// ---------------------------------------------------------------------------

// Table of Contents sections for sidebar navigation
const tocSections = [
  { id: 'score-summary', label: 'Score Summary' },
  { id: 'the-journey', label: 'The Journey: 40 to 56 to 68' },
  { id: 'scoring-insight', label: 'Why a 401 Proves a Good API' },
  { id: 'dimension-breakdown', label: 'Dimension Breakdown' },
  { id: 'what-stripe-needs', label: 'What Stripe Needs for Gold' },
  { id: 'arl-level', label: 'ARL-4: Transactable' },
  { id: 'lessons', label: 'Lessons for SaaS Companies' },
]

export default function WhyStripeScores68Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Stripe Scores 68 Silver — A Deep Agent Readiness Analysis',
    description:
      'A dimension-by-dimension analysis of Stripe\'s Agent Readiness Score of 68 (Silver tier).',
    datePublished: '2026-03-27',
    dateModified: '2026-03-30',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/why-stripe-scores-68',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Why Stripe Scores 68 Silver',
          item: 'https://agenthermes.ai/blog/why-stripe-scores-68',
        },
      ],
    },
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <span className="text-zinc-400">Stripe Analysis</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-semibold">
              Silver Tier
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
              ARL-4 Transactable
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Stripe Scores{' '}
            <span className="text-zinc-400">68 Silver</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-8">
            Stripe is one of the best APIs in the world. But &ldquo;best API&rdquo; does not mean &ldquo;agent-ready.&rdquo;
            Here is a dimension-by-dimension breakdown of how the world&apos;s most developer-friendly
            payment platform earns a Silver-tier Agent Readiness Score — and what it would take to reach Gold.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  March 27, 2026
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

      {/* ===== SCORE SUMMARY ===== */}
      <section id="score-summary" className="pb-12 sm:pb-16 border-t border-zinc-800/50 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-zinc-400">68</div>
              <div className="text-xs text-zinc-500 mt-1">Overall Score</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-zinc-400">Silver</div>
              <div className="text-xs text-zinc-500 mt-1">Tier (60-74)</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-purple-400">ARL-4</div>
              <div className="text-xs text-zinc-500 mt-1">Transactable</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-emerald-400">90</div>
              <div className="text-xs text-zinc-500 mt-1">Best: Agent Exp</div>
            </div>
          </div>

          {/* The Journey Section */}
          <div id="the-journey" className="prose-section mb-12 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <ArrowUp className="h-6 w-6 text-emerald-500" />
              The Journey: 40 to 56 to 68
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                When we first scanned Stripe with our early scanner, it scored <strong className="text-zinc-100">40 (Bronze)</strong>.
                That initial score was dominated by what the scanner could not reach: Stripe&apos;s API requires
                authentication, so unauthenticated probes saw mostly 401 responses and HTML documentation pages.
                The scanner interpreted &ldquo;no accessible data&rdquo; as &ldquo;no data.&rdquo;
              </p>
              <p>
                The second calibration pushed Stripe to <strong className="text-zinc-100">56</strong>. We taught the scanner
                that an API returning a well-formed JSON error with a machine-readable error code is itself evidence
                of quality. A 401 with <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                {`{"error":{"type":"invalid_request_error"}}`}</code> is dramatically more
                agent-friendly than a 200 HTML login page.
              </p>
              <p>
                The current score of <strong className="text-zinc-100">68</strong> reflects our v4 scoring engine with auth-aware
                calibration. A 401 response with structured JSON now earns 87% of what a full 200 response
                would score. This is our key insight: <em className="text-zinc-200">an API that rejects you cleanly is proving
                it is well-built</em>. The authentication wall is not a failure — it is a signal of a mature,
                agent-ready API hiding behind a human onboarding gate.
              </p>
            </div>
          </div>

          {/* 401 Insight Box — styled as a callout */}
          <div id="scoring-insight" className="callout-box mb-12 scroll-mt-20">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 !mt-0">
              <Lock className="h-5 w-5" />
              Our Scoring Insight: Why a 401 PROVES a Good API
            </h3>
            <div className="space-y-3 text-zinc-300 leading-relaxed text-sm">
              <p>
                Most scanning tools penalize APIs that return 401 Unauthorized. We do the opposite. When
                Stripe returns <code className="text-emerald-400 bg-zinc-800/50 px-1 py-0.5 rounded text-xs">
                401 + Content-Type: application/json + structured error body</code>, that tells us:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>The endpoint exists and is actively maintained</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>It returns JSON (agent-parseable) not HTML (human-only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>It uses proper HTTP status codes (semantic correctness)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Error responses are machine-readable with typed error objects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>An agent with valid credentials would get a clean response</span>
                </li>
              </ul>
              <p>
                This means a 401 from Stripe is worth ~87% of a 200. A 200 HTML page from a brochure
                website is worth ~10%. The auth wall hides quality, it does not indicate the absence of it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIMENSION BREAKDOWN ===== */}
      <section id="dimension-breakdown" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            Dimension-by-Dimension Breakdown
          </h2>

          <div className="space-y-6">
            {dimensions.map((dim) => {
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
                        <span className="text-xs text-zinc-500">
                          Weight: {Math.round(dim.weight * 100)}%
                        </span>
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
                      className={`h-2 rounded-full bar-animate ${dim.score >= 75 ? 'bg-emerald-500' : dim.score >= 60 ? 'bg-blue-500' : dim.score >= 45 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed" style={{ lineHeight: '1.75' }}>{dim.analysis}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT STRIPE NEEDS FOR GOLD ===== */}
      <section id="what-stripe-needs" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <TrophyIcon className="h-6 w-6 text-yellow-500" />
            What Stripe Needs for Gold (75+)
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Stripe is 7 points away from Gold tier. Here are the specific changes that would
            close the gap — ordered by impact.
          </p>

          <div className="space-y-4">
            {[
              {
                change: 'Publish agent-card.json and llms.txt',
                impact: '+5-8 points on D1 (Discovery)',
                difficulty: 'Easy',
                diffColor: 'text-emerald-400',
                detail:
                  'A static JSON file at /.well-known/agent-card.json describing Stripe\'s capabilities, authentication requirements, and API endpoints. An llms.txt file explaining Stripe in agent-parseable format. No code changes needed — just static files.',
              },
              {
                change: 'Add a programmatic pricing API',
                impact: '+15-20 points on D4 (Pricing)',
                difficulty: 'Medium',
                diffColor: 'text-amber-400',
                detail:
                  'An endpoint like GET /v1/pricing that returns current fee structures, volume thresholds, and plan comparisons in JSON. Agents need to compare payment processors, and right now Stripe\'s pricing is locked in HTML.',
              },
              {
                change: 'Enable programmatic signup for test accounts',
                impact: '+10-15 points on D3 (Onboarding)',
                difficulty: 'Medium',
                diffColor: 'text-amber-400',
                detail:
                  'Even if production accounts require KYC, allowing agents to create test/sandbox accounts via API would dramatically improve agent onboarding. An agent evaluating payment processors needs to test before recommending.',
              },
              {
                change: 'Add OAuth2 for agent delegation',
                impact: '+5-8 points on D7 (Security)',
                difficulty: 'Hard',
                diffColor: 'text-red-400',
                detail:
                  'Current API key auth works but limits agent patterns. OAuth2 scoped tokens would let agents act on behalf of merchants with limited permissions — essential for the autonomous agent future.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-bold text-zinc-100">{item.change}</h3>
                  <span className={`shrink-0 text-xs font-medium ${item.diffColor}`}>
                    {item.difficulty}
                  </span>
                </div>
                <p className="text-sm text-emerald-400 font-medium mb-2">{item.impact}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-yellow-400">The math:</strong> Stripe&apos;s current score of 68
              means it needs +7 points to reach Gold (75). Publishing agent-card.json and llms.txt alone
              could get it to 73-76. Adding a pricing API would push it well past 80. Stripe is one
              strategic decision away from being Gold-tier agent-ready.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ARL LEVEL ===== */}
      <section id="arl-level" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <Key className="h-6 w-6 text-purple-500" />
            ARL-4: Transactable
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Stripe sits at <strong className="text-purple-400">Agent Readiness Level 4 (Transactable)</strong>.
              This means an authenticated agent can complete the full transaction cycle: create payment
              intents, manage subscriptions, issue refunds, and track payment status. Stripe passes
              all the requirements for ARL levels 0 through 4.
            </p>
            <p>
              To reach ARL-5 (Autonomous), Stripe would need stronger self-serve lifecycle management —
              agents should be able to programmatically modify account settings, manage disputes, and
              optimize plans without human intervention. To reach ARL-6 (Interoperable), Stripe would
              need to publish its own A2A agent card and expose capabilities via MCP tools.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LESSONS ===== */}
      <section id="lessons" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-emerald-500" />
            Lessons for Other SaaS Companies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Your API IS your agent readiness',
                text: 'Stripe scores 68 primarily because of API quality. If your API returns clean JSON with proper error codes, you are already halfway to agent-ready.',
              },
              {
                title: 'Auth walls hide quality, not absence',
                text: 'Do not panic if your authenticated API shows low scores on naive scanners. A well-structured 401 is worth more than a sloppy 200.',
              },
              {
                title: 'Discovery is cheap, impact is high',
                text: 'Publishing agent-card.json and llms.txt costs nothing and can add 5-10 points. It is the highest-ROI agent readiness improvement any SaaS can make today.',
              },
              {
                title: 'Pricing transparency is the blind spot',
                text: 'Almost every SaaS hides pricing behind sales teams. Agents need structured pricing to comparison shop. The first SaaS in each vertical to publish a pricing API wins agent traffic.',
              },
              {
                title: 'Agent readiness is not developer experience',
                text: 'Stripe has arguably the best developer experience in the industry (D9: 90). But developer experience is only one dimension. Agent readiness requires discovery, onboarding, and pricing too.',
              },
              {
                title: 'The 75-point threshold matters',
                text: 'Gold tier (75+) is where agents start preferring your service over competitors. Silver is noticed. Gold is recommended. Platinum is the default choice.',
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
        </div>
      </section>

      {/* ===== SHARE BUTTONS ===== */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <hr className="section-divider mb-8" />
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-500 font-medium">Share this analysis:</span>
            <a
              href="https://twitter.com/intent/tweet?text=Why%20Stripe%20Scores%2068%20Silver%20%E2%80%94%20A%20Deep%20Agent%20Readiness%20Analysis&url=https://agenthermes.ai/blog/why-stripe-scores-68"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://agenthermes.ai/blog/why-stripe-scores-68"
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

      {/* ===== RELATED ARTICLES ===== */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-zinc-300">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'State of Agent Readiness: Most Businesses Score Under 40',
                href: '/report/state-of-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Agent Readiness Levels Explained',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'Zero MCP Servers for Local Businesses',
                href: '/blog/mcp-gap',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
            ].map((related) => {
              const tc = getVerdictColor(related.tagColor === 'emerald' ? 'excellent' : related.tagColor === 'purple' ? 'partial' : 'partial')
              return (
                <Link
                  key={related.href}
                  href={related.href}
                  className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 article-card-hover"
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${related.tagColor === 'emerald' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : related.tagColor === 'purple' ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400' : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'}`}>
                    {related.tag}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors leading-snug">
                    {related.title}
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
            How does your platform compare?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score and see how you stack up against Stripe
            across all 9 dimensions.
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
              href="/score/stripe.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              View Stripe&apos;s Full Score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

