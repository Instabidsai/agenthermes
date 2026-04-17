import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  HelpCircle,
  Layers,
  Scale,
  Search,
  Target,
  TrendingUp,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'AgentHermes vs IsAgentReady: How the Two Agent Readiness Scanners Compare | AgentHermes',
  description:
    'A transparent comparison of AgentHermes and IsAgentReady, the two leading agent readiness scoring platforms. Different methodologies, different strengths, same mission: make businesses agent-ready.',
  keywords: [
    'AgentHermes vs IsAgentReady',
    'AgentHermes vs IsAgentReady comparison',
    'agent readiness scanner comparison',
    'agent readiness tools',
    'IsAgentReady review',
    'AgentHermes review',
    'agent readiness score tools',
    'AI agent readiness platforms',
    'business agent readiness scanner',
    'MCP server generator comparison',
  ],
  openGraph: {
    title: 'AgentHermes vs IsAgentReady: How the Two Agent Readiness Scanners Compare',
    description:
      'Two platforms. Two approaches. Both scanning businesses for AI agent readiness. Here is how AgentHermes and IsAgentReady compare across methodology, scoring, and features.',
    url: 'https://agenthermes.ai/blog/competitor-comparison-isagentready',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentHermes vs IsAgentReady Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentHermes vs IsAgentReady: Scanner Comparison',
    description:
      'Two agent readiness scanners, two methodologies. A transparent comparison of features, scoring, and approach.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/competitor-comparison-isagentready',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  {
    category: 'Scoring Methodology',
    agentHermes: '9 weighted dimensions (D1-D9), numeric 0-100 score, tiered (Platinum/Gold/Silver/Bronze)',
    isAgentReady: '5 categories with letter grades (A-F), overall pass/fail assessment',
    verdict: 'Different approaches — AgentHermes is more granular, IsAgentReady is more accessible',
  },
  {
    category: 'Benchmark Dataset',
    agentHermes: '500+ businesses scanned across 50 verticals, avg score 43/100',
    isAgentReady: 'Growing dataset, focused on developer tools and SaaS initially',
    verdict: 'AgentHermes has a larger benchmark for cross-vertical comparison',
  },
  {
    category: 'Protocol Detection',
    agentHermes: 'MCP, A2A, agent-card.json, llms.txt, AGENTS.md, UCP, ACP, x402, OpenAPI',
    isAgentReady: 'MCP, agent-card.json, llms.txt, OpenAPI, Schema.org',
    verdict: 'AgentHermes detects more emerging protocols (A2A, x402, UCP, ACP)',
  },
  {
    category: 'Auto-Fix / Remediation',
    agentHermes: 'Remediation guides per dimension, MCP server generation via /connect wizard',
    isAgentReady: 'Auto-fix agent skills that can implement changes directly',
    verdict: 'IsAgentReady has stronger auto-fix; AgentHermes generates full MCP servers',
  },
  {
    category: 'MCP Server Generation',
    agentHermes: 'Hosted MCP servers with SSE transport, 15 vertical templates, 5 tools each',
    isAgentReady: 'Installable MCP server package with generated configuration',
    verdict: 'AgentHermes hosts for you; IsAgentReady gives you the package to self-host',
  },
  {
    category: 'Vertical Profiles',
    agentHermes: '27 vertical-specific scoring profiles with adjusted dimension weights',
    isAgentReady: 'General scoring without vertical-specific adjustments',
    verdict: 'AgentHermes scores a restaurant differently than a SaaS — vertical context matters',
  },
  {
    category: 'Output Artifacts',
    agentHermes: 'agent-card.json, llms.txt, agent-hermes.json, MCP server, registry listing',
    isAgentReady: 'MCP server config, agent-card.json, remediation report',
    verdict: 'Both generate discovery files; AgentHermes produces more artifact types',
  },
  {
    category: 'Pricing',
    agentHermes: 'Free scan, freemium MCP hosting, per-call gateway billing',
    isAgentReady: 'Free scan, premium features for fixes and monitoring',
    verdict: 'Both offer free scans — the real cost is in remediation and hosting',
  },
]

const strengthsAgentHermes = [
  {
    title: 'Deeper scoring methodology',
    detail: '9 weighted dimensions with vertical-specific profiles means a dental practice is scored differently than a SaaS platform. Weights are transparent and published at /methodology.',
    icon: BarChart3,
  },
  {
    title: 'Larger benchmark dataset',
    detail: '500+ businesses scanned across 50 verticals provides cross-industry context. You can see how your score compares to your specific industry average, not just a global number.',
    icon: Database,
  },
  {
    title: 'Hosted MCP infrastructure',
    detail: 'AgentHermes hosts your MCP server at /api/mcp/hosted/{slug} with SSE transport. No infrastructure to manage. The practice owner or business operator never touches a server.',
    icon: Layers,
  },
  {
    title: 'Broader protocol detection',
    detail: 'Detects 9+ agent protocols including emerging standards like A2A (Agent-to-Agent), x402 (micropayments), UCP (Universal Context Protocol), and ACP (Agent Communication Protocol).',
    icon: Search,
  },
]

const strengthsIsAgentReady = [
  {
    title: 'Auto-fix agent skills',
    detail: 'IsAgentReady offers agent skills that can directly implement fixes — not just tell you what to fix, but do it. This is powerful for developers who want automated remediation.',
    icon: Wrench,
  },
  {
    title: 'Self-hosted MCP package',
    detail: 'Generates an installable MCP server package you run on your own infrastructure. For businesses with existing DevOps, this gives full control over the MCP endpoint.',
    icon: Zap,
  },
  {
    title: 'Letter grade simplicity',
    detail: 'A-F grades per category are immediately understandable by non-technical stakeholders. No need to explain what a score of 43 means when you can say "you got a D in API Quality."',
    icon: Target,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Which scanner should I use?',
    answer:
      'Use both. They are free to scan and each catches different things. AgentHermes gives you a more granular numeric score with vertical-specific context and can host your MCP server. IsAgentReady gives you simpler grades and can auto-fix some issues. The agent readiness market is brand new — there is no reason to pick one exclusively.',
  },
  {
    question: 'Do the scores from AgentHermes and IsAgentReady correlate?',
    answer:
      'Generally yes, because both are measuring the same underlying signals: API availability, documentation quality, auth patterns, structured data. A business that scores 68 on AgentHermes will likely get B grades on IsAgentReady. The exact mapping varies because the weighting is different, but the direction is consistent.',
  },
  {
    question: 'Is this comparison biased since AgentHermes wrote it?',
    answer:
      'We tried to be transparent. We listed three areas where IsAgentReady is stronger than AgentHermes (auto-fix, self-hosting, simpler grades). The comparison is based on publicly available features as of April 2026. We encourage you to scan your site with both tools and draw your own conclusions.',
  },
  {
    question: 'Are there other agent readiness scanners besides these two?',
    answer:
      'As of April 2026, AgentHermes and IsAgentReady are the most feature-complete dedicated agent readiness scanners. Some API quality tools (like Treblle) and developer experience platforms touch on related signals, but they are not specifically measuring agent readiness across the full spectrum of discovery, interaction, and payment dimensions.',
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

export default function CompetitorComparisonIsAgentReadyPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AgentHermes vs IsAgentReady: How the Two Agent Readiness Scanners Compare',
    description:
      'A transparent comparison of AgentHermes and IsAgentReady, the two leading agent readiness scoring platforms. Different methodologies, same mission.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/competitor-comparison-isagentready',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Comparison',
    wordCount: 1800,
    keywords:
      'AgentHermes vs IsAgentReady comparison, agent readiness scanner, agent readiness tools, business agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'AgentHermes vs IsAgentReady',
          item: 'https://agenthermes.ai/blog/competitor-comparison-isagentready',
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
      title="AgentHermes vs IsAgentReady: How the Two Agent Readiness Scanners Compare"
      shareUrl="https://agenthermes.ai/blog/competitor-comparison-isagentready"
      currentHref="/blog/competitor-comparison-isagentready"
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
            <span className="text-zinc-400">AgentHermes vs IsAgentReady</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Scale className="h-3.5 w-3.5" />
              Comparison
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Transparent Analysis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            AgentHermes vs IsAgentReady:{' '}
            <span className="text-emerald-400">How the Two Agent Readiness Scanners Compare</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The agent readiness market is new enough that there are only two dedicated scanners with
            comprehensive methodology: <strong className="text-zinc-100">AgentHermes</strong> and{' '}
            <strong className="text-zinc-100">IsAgentReady</strong>. Both scan businesses for AI agent
            compatibility. Both generate MCP servers. Both are building the scoring infrastructure the
            agent economy needs. Here is how they compare — written by AgentHermes, with an honest
            assessment of where IsAgentReady does things we do not.
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

      {/* ===== WHY THIS MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Why Two Scanners Is Good for the Market
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The existence of two independent agent readiness scanners validates the category. When
              AgentHermes launched, the concept of an &ldquo;Agent Readiness Score&rdquo; was novel. The
              fact that IsAgentReady independently built a similar product with overlapping methodology
              confirms that this is a real market need, not a niche experiment.
            </p>
            <p>
              Competition in scoring methodology is healthy. It pushes both platforms to be more rigorous,
              more transparent, and more useful. Businesses benefit when there are multiple perspectives on
              what &ldquo;agent-ready&rdquo; means — especially when the standards themselves are still
              evolving.
            </p>
            <p>
              That said, there are real differences in approach. Understanding them helps you choose the
              right tool — or use both.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '2', label: 'dedicated scanners', icon: Search },
              { value: '500+', label: 'AgentHermes scans', icon: Database },
              { value: '9+', label: 'protocols detected', icon: Layers },
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

      {/* ===== SIDE-BY-SIDE COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-cyan-500" />
            Feature-by-Feature Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A detailed comparison across 8 key dimensions. Verdict column is our honest assessment
            of who does each thing better — including when the answer is the competitor.
          </p>

          <div className="space-y-4 mb-8">
            {comparisonRows.map((row) => (
              <div
                key={row.category}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="text-base font-bold text-zinc-100 mb-3">{row.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-xs font-medium text-emerald-400 mb-1">AgentHermes</p>
                    <p className="text-sm text-zinc-400">{row.agentHermes}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                    <p className="text-xs font-medium text-cyan-400 mb-1">IsAgentReady</p>
                    <p className="text-sm text-zinc-400">{row.isAgentReady}</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 italic">{row.verdict}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHERE AGENTHERMES IS STRONGER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Where AgentHermes Is Stronger
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Four areas where AgentHermes has a clear advantage based on publicly available features.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {strengthsAgentHermes.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <item.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHERE ISAGENTREADY IS STRONGER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-cyan-500" />
            Where IsAgentReady Is Stronger
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Three areas where IsAgentReady has capabilities that AgentHermes does not currently match.
            We believe in transparent comparison.
          </p>

          <div className="space-y-4 mb-8">
            {strengthsIsAgentReady.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <item.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-cyan-400">Credit where due:</strong> The auto-fix agent skills
              approach is genuinely innovative. Instead of generating a report and leaving implementation to
              the business, IsAgentReady offers agent-driven remediation that can implement changes
              programmatically. AgentHermes takes a different approach with hosted MCP servers, but the
              auto-fix model has clear advantages for developer-heavy teams.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE BIGGER PICTURE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Bigger Picture: A Market Wide Open
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There are 33 million small businesses in the US and over 500 million globally. Two scanners
              have collectively scanned fewer than 1,000 of them. The market is not just wide open — it has
              barely been touched. Both AgentHermes and IsAgentReady are racing to define the category,
              not fighting over a fixed pie.
            </p>
            <p>
              The real competition is not between scanners. It is between agent-ready businesses and
              agent-invisible businesses. Every business that either platform makes agent-ready is a win
              for the entire agent economy. More agent-ready businesses means more utility for AI agents,
              which means more agent traffic, which means more value for every business that invested early.
            </p>
            <p>
              If you are evaluating which scanner to use, the best answer is: <strong className="text-zinc-100">run
              both</strong>. They are free to scan. They catch different things. Use AgentHermes for the
              numeric score and{' '}
              <Link href="/blog/agent-readiness-leaderboard" className="text-emerald-400 hover:text-emerald-300 underline">
                leaderboard context
              </Link>
              . Use IsAgentReady for the letter-grade simplicity and auto-fix capabilities. Then fix
              everything both tools flag.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Use AgentHermes when...',
                detail: 'You want granular numeric scoring, vertical-specific benchmarks, hosted MCP infrastructure, and comparison across 500+ businesses.',
                color: 'emerald',
              },
              {
                title: 'Use IsAgentReady when...',
                detail: 'You want quick letter grades, auto-fix agent skills, self-hosted MCP packages, and a developer-friendly remediation workflow.',
                color: 'cyan',
              },
              {
                title: 'Use both when...',
                detail: 'You want the most complete picture. Different scanners catch different signals. The 5 minutes it takes to run both gives you maximum coverage.',
                color: 'amber',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`font-bold ${colors.text} mb-2 text-sm`}>{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
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
                title: 'Agent Readiness Leaderboard: Top Scoring Businesses',
                href: '/blog/agent-readiness-leaderboard',
                tag: 'Leaderboard',
                tagColor: 'emerald',
              },
              {
                title: 'Our Scoring Methodology',
                href: '/methodology',
                tag: 'Methodology',
                tagColor: 'blue',
              },
              {
                title: 'Run Your Free Scan',
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
            See how you score on the Agent Readiness Scale
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Free scan, 60 seconds, 9 dimensions, 500+ business benchmark. See your numeric score
            and how you compare to your industry.
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
              href="/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              View Methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
