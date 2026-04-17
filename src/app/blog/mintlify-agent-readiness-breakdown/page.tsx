import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Why Mintlify Scores 66: The Documentation Platform That Helps Others Score Higher | AgentHermes',
  description:
    'Mintlify scores 66 Silver on agent readiness. A documentation platform that improves D2 API Quality for its customers but lacks agent-card.json, MCP, and transparent pricing itself. Full breakdown.',
  keywords: [
    'Mintlify agent readiness score documentation',
    'Mintlify agent readiness',
    'Mintlify score 66',
    'documentation platform agent readiness',
    'Mintlify MCP',
    'Mintlify review',
    'documentation agent readiness',
    'developer tools agent readiness',
  ],
  openGraph: {
    title:
      'Why Mintlify Scores 66: The Documentation Platform That Helps Others Score Higher',
    description:
      'Mintlify helps companies write better API docs — boosting their D2 scores. But Mintlify itself has no agent-card.json, no MCP, and enterprise-gated pricing. Score: 66 Silver.',
    url: 'https://agenthermes.ai/blog/mintlify-agent-readiness-breakdown',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Mintlify Scores 66 on Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Why Mintlify Scores 66: The Documentation Platform That Helps Others Score Higher',
    description:
      'Mintlify helps others write API docs but lacks its own agent infrastructure. Score: 66 Silver. Full breakdown.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/mintlify-agent-readiness-breakdown',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  {
    dimension: 'D1 Discovery',
    score: 10,
    max: 15,
    verdict: 'Strong',
    note: 'Well-indexed, strong SEO, structured marketing pages, OpenGraph metadata. Missing agent-card.json, llms.txt, and AGENTS.md.',
    color: 'emerald',
  },
  {
    dimension: 'D2 API Quality',
    score: 11,
    max: 15,
    verdict: 'Strong',
    note: 'Clean REST API for managing docs, components, and deployments. Good JSON responses with typed schemas. Documentation of their own API is solid.',
    color: 'emerald',
  },
  {
    dimension: 'D3 Onboarding',
    score: 6,
    max: 8,
    verdict: 'Good',
    note: 'Self-service signup, GitHub integration, CLI tooling, starter templates. Quick time-to-value for new users.',
    color: 'emerald',
  },
  {
    dimension: 'D4 Pricing',
    score: 2,
    max: 5,
    verdict: 'Weak',
    note: 'Free tier visible. Pro pricing shown. Enterprise is "Contact us" — no structured pricing data an agent can compare.',
    color: 'amber',
  },
  {
    dimension: 'D5 Payment',
    score: 3,
    max: 8,
    verdict: 'Partial',
    note: 'Stripe checkout for Pro plans. No programmatic subscription API. Enterprise requires sales call.',
    color: 'amber',
  },
  {
    dimension: 'D6 Data Quality',
    score: 8,
    max: 10,
    verdict: 'Strong',
    note: 'Structured documentation with MDX components, search index, and versioning. Their own docs are a showcase of what they sell.',
    color: 'emerald',
  },
  {
    dimension: 'D7 Security',
    score: 9,
    max: 12,
    verdict: 'Good',
    note: 'HTTPS everywhere, API key auth, proper CORS, rate limiting on API endpoints. Missing security.txt and some advanced headers.',
    color: 'emerald',
  },
  {
    dimension: 'D8 Reliability',
    score: 10,
    max: 13,
    verdict: 'Good',
    note: 'Status page exists, CDN-backed docs delivery, good uptime history. No public SLA or machine-readable status endpoint.',
    color: 'emerald',
  },
  {
    dimension: 'D9 Agent Experience',
    score: 1,
    max: 7,
    verdict: 'Missing',
    note: 'No MCP server, no agent-card.json, no llms.txt, no AGENTS.md. Zero agent-native infrastructure despite being a developer tool.',
    color: 'red',
  },
]

const ironyPoints = [
  {
    what: 'Mintlify helps customers create OpenAPI docs',
    but: 'Mintlify\'s own OpenAPI spec is not published at a standard discovery path',
    fix: 'Publish /openapi.json or /.well-known/openapi.json',
    icon: Code2,
  },
  {
    what: 'Mintlify renders beautiful structured docs',
    but: 'No llms.txt file that points agents to that documentation',
    fix: 'Add /llms.txt with a link to their own docs — they literally generate this for customers',
    icon: BookOpen,
  },
  {
    what: 'Mintlify supports custom MDX components',
    but: 'No agent-card.json declaring Mintlify as a service agents can use',
    fix: 'Create /.well-known/agent-card.json with their API capabilities',
    icon: Bot,
  },
  {
    what: 'Mintlify has a REST API for managing docs',
    but: 'No MCP server exposing those same capabilities to AI agents',
    fix: 'Wrap existing API endpoints as MCP tools — their API is already structured for it',
    icon: Server,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is Mintlify?',
    answer:
      'Mintlify is a documentation platform used by developer-focused companies to create, host, and maintain API documentation. It takes OpenAPI specs and MDX content and generates polished, searchable documentation sites. Companies like Anthropic, Supabase, and Cursor use Mintlify for their public docs.',
  },
  {
    question: 'Why does Mintlify only score 66?',
    answer:
      'Mintlify scores well on technical fundamentals — API quality, data structure, security, and reliability — because it is a well-engineered developer tool. It loses points on D4 Pricing (enterprise pricing is hidden), D5 Payment (no programmatic subscription management), and D9 Agent Experience (zero agent-native files). The last gap is ironic because Mintlify helps other companies create the structured documentation that improves agent readiness.',
  },
  {
    question: 'Could Mintlify reach Gold score?',
    answer:
      'Yes, and faster than almost any other company. Mintlify already has a clean REST API, structured documentation, self-service onboarding, and developer-focused infrastructure. Adding agent-card.json, llms.txt, and transparent pricing would add roughly 10-15 points, pushing past the Gold threshold of 75. Adding an MCP server wrapping their existing API would push even higher. The infrastructure gap is small — it is just not built yet.',
  },
  {
    question: 'How does Mintlify help other companies score higher?',
    answer:
      'Mintlify improves D2 API Quality and D6 Data Quality scores for its customers by generating structured, searchable, versioned API documentation from OpenAPI specs. Good documentation makes APIs more discoverable and usable by agents. Companies using Mintlify for their docs typically score 5-10 points higher on these dimensions than companies with hand-written or wiki-based documentation.',
  },
  {
    question: 'What would a Mintlify MCP server look like?',
    answer:
      'A Mintlify MCP server would expose tools like create_page (add a docs page), update_content (edit existing docs), deploy_docs (trigger a deployment), search_docs (full-text search across a project), and get_analytics (page views, search queries, 404 errors). These map directly to their existing REST API endpoints. An AI agent could then manage documentation as part of a CI/CD pipeline without human intervention.',
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

export default function MintlifyAgentReadinessBreakdownPage() {
  const totalScore = dimensionScores.reduce((sum, d) => sum + d.score, 0)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Why Mintlify Scores 66: The Documentation Platform That Helps Others Score Higher',
    description:
      'Mintlify scores 66 Silver on agent readiness. A documentation platform that improves D2 API Quality for its customers but lacks agent-card.json, MCP, and transparent pricing itself.',
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
    mainEntityOfPage:
      'https://agenthermes.ai/blog/mintlify-agent-readiness-breakdown',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'Mintlify agent readiness score documentation, Mintlify score 66, documentation agent readiness, developer tools agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://agenthermes.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Why Mintlify Scores 66',
          item: 'https://agenthermes.ai/blog/mintlify-agent-readiness-breakdown',
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
      title="Why Mintlify Scores 66: The Documentation Platform That Helps Others Score Higher"
      shareUrl="https://agenthermes.ai/blog/mintlify-agent-readiness-breakdown"
      currentHref="/blog/mintlify-agent-readiness-breakdown"
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
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-400">Mintlify Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <BookOpen className="h-3.5 w-3.5" />
                Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-medium">
                Score: 66 Silver
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Why Mintlify Scores 66:{' '}
              <span className="text-emerald-400">
                The Documentation Platform That Helps Others Score Higher
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Mintlify is the documentation platform behind Anthropic, Supabase,
              Cursor, and hundreds of other developer companies. It makes API
              docs beautiful, searchable, and structured — all things that
              improve agent readiness scores. But Mintlify itself scores{' '}
              <strong className="text-zinc-100">66 Silver</strong>. The irony: a
              company that helps others become agent-discoverable has the same
              gaps as everyone else.
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
              <div className="author-avatar">AH</div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">
                  AgentHermes Research
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    April 15, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    11 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SCORE OVERVIEW ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Score Overview: {totalScore}/100 Silver
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Mintlify&apos;s score of {totalScore} places it in the Silver
                tier (60-74), nine points below the Gold threshold. This is a
                strong score for a SaaS platform — above the 500-business
                average of 43 — but surprising for a company whose entire
                product is making technical services more discoverable and
                documented.
              </p>
              <p>
                The strengths are real: Mintlify has a clean REST API, excellent
                data quality, reliable infrastructure, and solid security. These
                are the table-stakes dimensions where well-run developer tools
                consistently perform. The weaknesses are equally revealing:
                enterprise pricing is hidden, payment is not programmatic, and
                there is zero agent-native infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '66', label: 'agent readiness score', icon: BarChart3 },
                { value: 'Silver', label: 'ARL tier', icon: Target },
                { value: '6/9', label: 'dimensions above average', icon: TrendingUp },
                { value: '0', label: 'agent-native files', icon: Bot },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DIMENSION SCORECARD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-500" />
              Dimension-by-Dimension Breakdown
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Nine dimensions scored. Six above average, one at average, two
              below. Here is the full breakdown.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-12 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div className="col-span-3">Dimension</div>
                <div className="col-span-2 text-center">Score</div>
                <div className="col-span-2 text-center">Verdict</div>
                <div className="col-span-5">Detail</div>
              </div>
              {dimensionScores.map((row, i) => {
                const colors = getColorClasses(row.color)
                return (
                  <div
                    key={row.dimension}
                    className={`grid grid-cols-12 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                  >
                    <div className="col-span-3 font-medium text-zinc-200">
                      {row.dimension}
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`font-bold ${colors.text}`}>
                        {row.score}
                      </span>
                      <span className="text-zinc-600">/{row.max}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}
                      >
                        {row.verdict}
                      </span>
                    </div>
                    <div className="col-span-5 text-zinc-500 text-xs leading-relaxed">
                      {row.note}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-blue-400">
                  The pattern:
                </strong>{' '}
                Mintlify excels at everything that requires engineering
                discipline — API design, data quality, security, reliability.
                It falls short on everything that requires a deliberate
                agent-economy strategy — agent-native files, transparent
                pricing, and MCP infrastructure. This is the most common pattern
                in Silver-tier developer tools.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE IRONY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              The Irony: Helping Others Score Higher Than Yourself
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Mintlify&apos;s product directly improves D2 API Quality and D6
                Data Quality scores for every company that uses it. Companies
                that generate docs through Mintlify typically score 5-10 points
                higher on these dimensions than companies with hand-written
                documentation. But Mintlify has not applied the same approach to
                its own agent readiness.
              </p>
              <p>
                Here are four specific ironies — and what Mintlify could do
                about each one overnight.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {ironyPoints.map((point) => (
                <div
                  key={point.what}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <point.icon className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-100">
                      {point.what}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                      <p className="text-xs text-red-400 font-medium mb-1">
                        But...
                      </p>
                      <p className="text-sm text-zinc-400">{point.but}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xs text-emerald-400 font-medium mb-1">
                        Fix (overnight)
                      </p>
                      <p className="text-sm text-zinc-400">{point.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The gap is not technical. Mintlify has the engineering talent, the
                API infrastructure, and the domain expertise to close every one of
                these gaps in a single sprint. The gap is strategic —{' '}
                <Link
                  href="/blog/documentation-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  documentation platforms
                </Link>{' '}
                have not yet positioned themselves as agent-readiness
                infrastructure, even though that is exactly what they are
                becoming.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PATH TO GOLD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              Mintlify&apos;s Path to Gold (75+)
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Mintlify needs 9 points to reach Gold. Here are the highest-value
              changes, ranked by point impact.
            </p>

            <div className="space-y-3 mb-8">
              {[
                {
                  action: 'Add agent-card.json',
                  points: '+3-4',
                  effort: 'Low',
                  detail:
                    'Declare Mintlify as a service agents can use. List API capabilities, supported auth methods, and service description. One JSON file at /.well-known/agent-card.json.',
                  icon: Bot,
                },
                {
                  action: 'Add llms.txt',
                  points: '+1-2',
                  effort: 'Low',
                  detail:
                    'Point agents to Mintlify\'s own documentation. Mintlify literally helps customers create the content that llms.txt links to — adding their own is one line of work.',
                  icon: BookOpen,
                },
                {
                  action: 'Publish transparent pricing',
                  points: '+2-3',
                  effort: 'Low',
                  detail:
                    'Make enterprise pricing visible or at least provide a pricing range. Agent procurement tools need structured pricing data to compare vendors programmatically.',
                  icon: BarChart3,
                },
                {
                  action: 'Create an MCP server',
                  points: '+3-5',
                  effort: 'Medium',
                  detail:
                    'Wrap existing API endpoints (create_page, update_content, deploy_docs, search_docs) as MCP tools. Mintlify\'s REST API is already well-structured — the MCP wrapper is mostly mapping.',
                  icon: Server,
                },
                {
                  action: 'Add security.txt',
                  points: '+1',
                  effort: 'Low',
                  detail:
                    'Standard /.well-known/security.txt with contact info and PGP key. Quick win for D7 Security scoring.',
                  icon: Shield,
                },
              ].map((item) => (
                <div
                  key={item.action}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.action}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        {item.points}
                      </span>
                      <span className="text-xs text-zinc-600">
                        Effort: {item.effort}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  Total estimated improvement: +10-15 points.
                </strong>{' '}
                Four of five actions are low effort. The MCP server is the only
                medium-effort item, and Mintlify&apos;s existing API makes it
                straightforward. A focused sprint could take Mintlify from 66
                Silver to 76-81 Gold — turning a{' '}
                <Link
                  href="/blog/developer-tools-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  developer tool
                </Link>{' '}
                into an agent-native platform.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT THIS MEANS FOR DOCS PLATFORMS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-500" />
              What This Means for Documentation Platforms
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Mintlify is not alone. ReadMe, GitBook, Docusaurus, and every
                documentation platform faces the same gap: they help customers
                become more discoverable by agents but have not made themselves
                agent-discoverable. This is a category-wide blind spot.
              </p>
              <p>
                The{' '}
                <Link
                  href="/blog/documentation-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  documentation platform
                </Link>{' '}
                that closes this gap first gains a powerful positioning
                advantage: &ldquo;We do not just help you write docs — we make
                your entire service agent-ready.&rdquo; Mintlify is best
                positioned to claim this because their product already generates
                the files agents need (OpenAPI rendering, structured content,
                search indexes). They just need to generate those files for
                themselves and add the agent-native layer on top.
              </p>
              <p>
                The documentation-to-agent-readiness pipeline is the most
                natural product extension in the developer tools space. The
                company that ships it first owns the category definition.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'Docs platforms are agent-readiness infrastructure',
                  detail:
                    'Structured API docs, OpenAPI specs, and search indexes are core inputs to agent readiness. Documentation platforms are already 60% of the way to being agent-readiness platforms.',
                },
                {
                  title: 'The missing 40% is agent-native files',
                  detail:
                    'agent-card.json, llms.txt, MCP server generation, and pricing transparency. These are product features, not engineering challenges. Whoever ships them first defines the category.',
                },
                {
                  title: 'Customer value multiplier',
                  detail:
                    'If Mintlify generated agent-card.json and llms.txt alongside docs, every Mintlify customer would see their agent readiness score increase. That is a measurable, sellable outcome.',
                },
                {
                  title: 'MCP server generation is the endgame',
                  detail:
                    'Documentation platforms that auto-generate MCP servers from OpenAPI specs become the single tool that takes any API from invisible to agent-ready. That is a massive product expansion.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50"
        >
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
                  <h3 className="text-base font-bold text-zinc-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ARTICLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title:
                    'Documentation and Agent Readiness',
                  href: '/blog/documentation-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Developer Tools Agent Readiness',
                  href: '/blog/developer-tools-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title: 'Get Your Agent Readiness Score',
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
                    >
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
              How does your documentation platform score?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Whether you use Mintlify, ReadMe, GitBook, or custom docs — see
              how your agent readiness compares across all 9 dimensions. Free
              scan, 60 seconds.
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
