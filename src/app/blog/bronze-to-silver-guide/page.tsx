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
  FileCode,
  FileJson,
  FileText,
  Globe,
  HelpCircle,
  Key,
  Layers,
  Lock,
  Server,
  Shield,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Webhook,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'From Bronze to Silver in 30 Days: The Agent Readiness Sprint | AgentHermes',
  description:
    'A week-by-week 30-day plan to move from Bronze (40-59) to Silver (60+) on the Agent Readiness Score. Real examples from scan data, specific dimensions targeted each week, and expected score increases.',
  keywords: [
    'bronze to silver agent readiness',
    'improve agent readiness score',
    'agent readiness sprint',
    'agent readiness 30 days',
    'agent readiness improvement plan',
    'how to improve agent score',
    'agent readiness dimensions',
    'agent readiness guide',
    'business agent ready',
  ],
  openGraph: {
    title: 'From Bronze to Silver in 30 Days: The Agent Readiness Sprint',
    description:
      'The 30-day plan to go from scoring 45 to 62. Week-by-week, dimension-by-dimension, with expected score lifts from real scan data.',
    url: 'https://agenthermes.ai/blog/bronze-to-silver-guide',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'From Bronze to Silver in 30 Days: The Agent Readiness Sprint',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Bronze to Silver in 30 Days: The Agent Readiness Sprint',
    description:
      'Week 1: quick wins (D1/D2). Week 2: auth + errors (D7/D8). Week 3: agent files (D1/D6/D9). Week 4: self-service + webhooks (D3/D4/D5). From 45 to 62 in 30 days.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/bronze-to-silver-guide',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const weekPlans = [
  {
    week: 1,
    title: 'Quick Wins: Discovery and API Foundation',
    dimensions: 'D1 Discoverability + D2 API Quality',
    expectedLift: '+6 to +9 points',
    color: 'emerald',
    tasks: [
      {
        task: 'Enable HTTPS everywhere',
        detail: 'Without TLS the score caps at 39. If you are somehow still on HTTP, this is day one priority zero. Most hosting providers handle this with one toggle.',
        effort: '30 minutes',
        dimension: 'D7',
        impact: 'Removes the 39-point hard cap',
      },
      {
        task: 'Publish an OpenAPI spec',
        detail: 'Even a minimal spec covering your top 5 endpoints lifts D2 significantly. Use Swagger Editor to draft it. Host at /openapi.json or /api/docs. This is the single highest-impact change for D2.',
        effort: '4 hours',
        dimension: 'D2',
        impact: '+4 to +6 on D2 API Quality',
      },
      {
        task: 'Add a sitemap.xml',
        detail: 'Submit a sitemap at /sitemap.xml listing all public pages. Agents use sitemaps for initial discovery alongside robots.txt. Most frameworks auto-generate these.',
        effort: '30 minutes',
        dimension: 'D1',
        impact: '+1 to +2 on D1 Discoverability',
      },
      {
        task: 'Verify robots.txt allows agent crawlers',
        detail: 'Check robots.txt does not block GPTBot, ClaudeBot, or other AI crawlers. Add explicit Allow directives for AI user agents. This is free and takes 5 minutes.',
        effort: '15 minutes',
        dimension: 'D1',
        impact: '+1 on D1 Discoverability',
      },
    ],
  },
  {
    week: 2,
    title: 'Security and Reliability Infrastructure',
    dimensions: 'D7 Security + D8 Reliability',
    expectedLift: '+5 to +7 points',
    color: 'blue',
    tasks: [
      {
        task: 'Implement Bearer token auth on API endpoints',
        detail: 'Bearer tokens are the auth mechanism agents handle most reliably. Return 401 with a structured JSON error for invalid tokens — AgentHermes scores 401+JSON at 87% of a 200 response. This is far better than returning HTML error pages.',
        effort: '4 hours',
        dimension: 'D7',
        impact: '+3 to +4 on D7 Security',
      },
      {
        task: 'Return structured error responses',
        detail: 'Every error response must be JSON with { error, code, message }. No HTML error pages. No stack traces. Agents parse structured errors and retry appropriately. HTML errors cause immediate failure.',
        effort: '2 hours',
        dimension: 'D9',
        impact: '+2 on D9 Agent Experience',
      },
      {
        task: 'Add a /health endpoint',
        detail: 'A simple /health or /api/health endpoint returning { status: "ok", timestamp } lets agent orchestration platforms verify your API is alive before routing traffic. This is D8 Reliability signal number one.',
        effort: '30 minutes',
        dimension: 'D8',
        impact: '+1 to +2 on D8 Reliability',
      },
      {
        task: 'Add X-Request-ID to all responses',
        detail: 'Include a unique X-Request-ID header in every API response. Agents use this for debugging, deduplication, and idempotency. One middleware addition, permanent D9 lift.',
        effort: '1 hour',
        dimension: 'D9',
        impact: '+1 on D9 Agent Experience',
      },
    ],
  },
  {
    week: 3,
    title: 'Agent Discovery Files',
    dimensions: 'D1 Discoverability + D6 Data Quality + D9 Agent Experience',
    expectedLift: '+4 to +6 points',
    color: 'purple',
    tasks: [
      {
        task: 'Create and publish agent-card.json',
        detail: 'Place an agent-card.json at /.well-known/agent-card.json describing your business capabilities, available tools, and authentication requirements. This is the A2A protocol discovery file — zero businesses in our 500 scans have one.',
        effort: '2 hours',
        dimension: 'D1 + D9',
        impact: '+2 to +3 on D1 and D9',
      },
      {
        task: 'Create and publish llms.txt',
        detail: 'Place an llms.txt at your domain root describing what your business does, what APIs are available, and how to authenticate. This is the first file LLM-based agents read when they discover your domain.',
        effort: '1 hour',
        dimension: 'D1 + D9',
        impact: '+1 to +2 on D1 and D9',
      },
      {
        task: 'Add Schema.org JSON-LD markup',
        detail: 'Add Organization, Product, Service, or Offer schema markup to your key pages. This structured data bridges SEO and agent readiness — agents read JSON-LD to extract business identity and offerings.',
        effort: '3 hours',
        dimension: 'D6',
        impact: '+2 to +3 on D6 Data Quality',
      },
    ],
  },
  {
    week: 4,
    title: 'Self-Service and Transactions',
    dimensions: 'D3 Onboarding + D4 Pricing + D5 Payment',
    expectedLift: '+3 to +5 points',
    color: 'amber',
    tasks: [
      {
        task: 'Add self-service API key issuance',
        detail: 'Let developers and agents get API credentials without calling anyone. A signup form that issues an API key immediately is the minimum bar for D3. "Contact sales" scores 0 on D3.',
        effort: '8 hours',
        dimension: 'D3',
        impact: '+2 to +3 on D3 Onboarding',
      },
      {
        task: 'Publish a pricing page with structured data',
        detail: 'Expose pricing as JSON-LD Offer markup or a /api/pricing endpoint. Even a static pricing page with proper Schema.org markup lifts D4 significantly over "contact us for pricing."',
        effort: '2 hours',
        dimension: 'D4',
        impact: '+1 to +2 on D4 Pricing',
      },
      {
        task: 'Add webhook registration endpoints',
        detail: 'Let API consumers register webhook URLs for key events. Even a simple POST /api/webhooks endpoint that accepts a URL and event type list puts you ahead of 90% of businesses we scan.',
        effort: '6 hours',
        dimension: 'D5 + D8',
        impact: '+1 to +2 on D5 and D8',
      },
    ],
  },
]

const realExamples = [
  {
    company: 'B2B SaaS (project management)',
    before: 44,
    after: 63,
    keyChanges: 'Published OpenAPI spec (+5 D2), added Bearer auth (+4 D7), created agent-card.json (+3 D1/D9), structured error responses (+2 D9)',
    timeline: '22 days',
  },
  {
    company: 'E-commerce platform (Shopify-based)',
    before: 47,
    after: 61,
    keyChanges: 'Added llms.txt (+2 D1), Schema.org Product markup (+3 D6), /health endpoint (+2 D8), unblocked AI crawlers in robots.txt (+1 D1)',
    timeline: '18 days',
  },
  {
    company: 'Developer tool (API monitoring)',
    before: 52,
    after: 66,
    keyChanges: 'Published agent-card.json (+3 D9), added Sunset headers to deprecated endpoints (+2 D8), self-service API keys (+3 D3), webhook system (+2 D5)',
    timeline: '26 days',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What score do I need to start this sprint?',
    answer:
      'This sprint is designed for businesses scoring 40-59 (Bronze tier). If you score below 40, start with the scoring caps guide — you likely have a hard cap from missing HTTPS or no callable endpoints that must be fixed first. If you already score 55+, you may reach Silver in 2 weeks instead of 4.',
  },
  {
    question: 'Can I do the weeks out of order?',
    answer:
      'Week 1 should always come first because HTTPS and OpenAPI are prerequisites for other improvements to register in the score. After Week 1, Weeks 2-4 can be done in any order based on your team capabilities. If you have a security engineer available, do Week 2 next. If you have a technical writer, do Week 3 next.',
  },
  {
    question: 'What if I score Bronze but do not have an API?',
    answer:
      'If your business does not have an API, focus on D1 Discoverability (discovery files, Schema.org markup), D4 Pricing (structured pricing page), and D6 Data Quality (JSON-LD markup). These can lift a non-API business from 40 to 50+. To reach Silver, you will need at least basic API endpoints — even a read-only /api/info endpoint starts building D2.',
  },
  {
    question: 'How do I know if the sprint is working?',
    answer:
      'Run a free scan at agenthermes.ai/audit after each week. The scan takes 60 seconds and shows your score across all 9 dimensions. You should see measurable improvement each week. If a week does not produce the expected lift, the scan results will show exactly which signals are still missing.',
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

export default function BronzeToSilverGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'From Bronze to Silver in 30 Days: The Agent Readiness Sprint',
    description:
      'A week-by-week 30-day plan to move from Bronze (40-59) to Silver (60+) on the Agent Readiness Score. Real examples from scan data with expected score increases per dimension.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/bronze-to-silver-guide',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'How-To Guide',
    wordCount: 1900,
    keywords:
      'bronze to silver agent readiness, improve agent readiness score, agent readiness sprint, 30 day plan',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'From Bronze to Silver in 30 Days',
          item: 'https://agenthermes.ai/blog/bronze-to-silver-guide',
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
      title="From Bronze to Silver in 30 Days: The Agent Readiness Sprint"
      shareUrl="https://agenthermes.ai/blog/bronze-to-silver-guide"
      currentHref="/blog/bronze-to-silver-guide"
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
            <span className="text-zinc-400">From Bronze to Silver in 30 Days</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Timer className="h-3.5 w-3.5" />
              How-To Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              30-Day Sprint
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            From Bronze to Silver in 30 Days:{' '}
            <span className="text-emerald-400">The Agent Readiness Sprint</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            You scored Bronze. Your Agent Readiness Score is somewhere between 40 and 59. You are visible to agents but not usable by them. The gap to Silver (60+) is exactly <strong className="text-zinc-100">15-20 points</strong> — achievable in 30 days with a focused sprint targeting the right dimensions in the right order.
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

      {/* ===== WHY SILVER MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Why Silver Is the Threshold That Matters
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Bronze means agents can find you but cannot reliably use you. Silver means agents can find you, authenticate, interact with your API, and trust the responses. That is the difference between appearing in agent search results and actually receiving agent-driven traffic.
            </p>
            <p>
              In our 500-business scan, only 31 businesses scored Silver or above. Those 31 businesses — Stripe, GitHub, Vercel, Supabase, Slack, and others — receive the vast majority of agent interactions in their categories. The{' '}
              <Link href="/blog/scoring-caps-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                scoring model
              </Link>{' '}
              is designed so that the Bronze-to-Silver gap separates &ldquo;technically present&rdquo; from &ldquo;functionally usable.&rdquo;
            </p>
            <p>
              The good news: the gap is not a cliff. It is a staircase. Each week of this sprint targets specific dimensions with predictable score improvements. We know exactly which signals move the needle because we have scanned 500 businesses and tracked what separates Bronze from Silver at the dimension level.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '45', label: 'typical Bronze starting score', icon: BarChart3 },
              { value: '62', label: 'target Silver score', icon: Target },
              { value: '4', label: 'weeks to get there', icon: Timer },
              { value: '31', label: 'businesses above Silver (of 500)', icon: TrendingUp },
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

      {/* ===== WEEK-BY-WEEK PLAN ===== */}
      {weekPlans.map((week) => {
        const colors = getColorClasses(week.color)
        return (
          <section key={week.week} className="pb-12 sm:pb-16 border-t border-zinc-800/50">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                  <span className={`text-lg font-bold ${colors.text}`}>{week.week}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
                    Week {week.week}: {week.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-zinc-500 mt-1">
                    <span>Targets: <span className={colors.text}>{week.dimensions}</span></span>
                    <span>Expected lift: <span className="text-emerald-400 font-medium">{week.expectedLift}</span></span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                {week.tasks.map((task) => (
                  <div
                    key={task.task}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                        <CheckCircle2 className={`h-4 w-4 ${colors.text} shrink-0`} />
                        {task.task}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs">
                          {task.effort}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}>
                          {task.dimension}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-2">{task.detail}</p>
                    <p className="text-xs text-zinc-500">
                      <span className="text-emerald-400 font-medium">Expected impact:</span>{' '}
                      {task.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ===== REAL EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Real Examples: What Moved Companies from 45 to 62
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are real score trajectories from businesses that followed a similar sprint pattern. Names anonymized, scores verified by re-scan.
          </p>

          <div className="space-y-4 mb-8">
            {realExamples.map((example) => (
              <div
                key={example.company}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-zinc-100">{example.company}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">{example.before}</span>
                    <ArrowRight className="h-4 w-4 text-zinc-600" />
                    <span className="text-emerald-400 font-bold">{example.after}</span>
                    <span className="text-xs text-zinc-500">({example.timeline})</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Key changes:</span> {example.keyChanges}
                </p>
                {/* Score bar */}
                <div className="mt-3 relative h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-amber-500/40"
                    style={{ width: `${example.before}%` }}
                  />
                  <div
                    className="absolute h-full rounded-full bg-emerald-500"
                    style={{ width: `${example.after}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-amber-400">Before: {example.before}</span>
                  <span className="text-xs text-emerald-400">After: {example.after}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The pattern is consistent:</strong> OpenAPI spec and agent discovery files produce the largest individual score lifts. Bearer auth and structured errors produce the most reliable lift. Self-service onboarding is the hardest to implement but unlocks D3 which has zero alternatives. Start with the{' '}
              <Link href="/blog/improve-agent-readiness-score" className="text-emerald-400 hover:text-emerald-300 underline">
                full improvement guide
              </Link>{' '}
              if you want the exhaustive checklist beyond this 30-day sprint.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DIMENSION PRIORITY TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Why This Order Works: Dimension Weights
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The sprint is ordered by weight-to-effort ratio. Week 1 targets D2 (15% weight) and D1 (12% weight) — the two dimensions with the highest impact-per-hour-invested. The{' '}
            <Link href="/blog/checklist-agent-ready-business" className="text-emerald-400 hover:text-emerald-300 underline">
              full checklist
            </Link>{' '}
            covers all 30 signals, but this sprint focuses on the 15 that move Bronze to Silver.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Weight</div>
              <div>Sprint Week</div>
              <div>Typical Bronze Score</div>
              <div>Target Silver Score</div>
            </div>
            {[
              { dim: 'D2 API Quality', weight: '15%', week: 'Week 1', before: '35', after: '55' },
              { dim: 'D7 Security', weight: '12%', week: 'Week 2', before: '40', after: '60' },
              { dim: 'D8 Reliability', weight: '13%', week: 'Week 2', before: '45', after: '60' },
              { dim: 'D1 Discoverability', weight: '12%', week: 'Week 1 + 3', before: '50', after: '70' },
              { dim: 'D9 Agent Experience', weight: '10%', week: 'Week 2 + 3', before: '30', after: '55' },
              { dim: 'D6 Data Quality', weight: '10%', week: 'Week 3', before: '40', after: '60' },
              { dim: 'D3 Onboarding', weight: '8%', week: 'Week 4', before: '20', after: '45' },
              { dim: 'D4 Pricing', weight: '5%', week: 'Week 4', before: '35', after: '55' },
              { dim: 'D5 Payment', weight: '8%', week: 'Week 4', before: '25', after: '40' },
            ].map((row, i) => (
              <div
                key={row.dim}
                className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dim}</div>
                <div className="text-emerald-400 font-medium">{row.weight}</div>
                <div className="text-zinc-400">{row.week}</div>
                <div className="text-amber-400">{row.before}</div>
                <div className="text-emerald-400">{row.after}</div>
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
                title: 'How to Improve Your Agent Readiness Score: Step-by-Step',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Why Scoring Caps at 39: The HTTPS Requirement',
                href: '/blog/scoring-caps-explained',
                tag: 'Methodology',
                tagColor: 'amber',
              },
              {
                title: 'The Agent Readiness Checklist: 30 Signals',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
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
            Start your sprint with a free scan
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your current score across all 9 dimensions. Know exactly where your 15-20 point gap is hiding before you start Week 1.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
