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
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Search,
  Server,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'llms.txt: The Single File 95% of Businesses Are Missing | AgentHermes',
  description:
    'llms.txt is the AI-readable content map that tells agents where your docs, APIs, and examples live. 95% of businesses scanned by AgentHermes do not have one. Here is the llms.txt standard, a ready-to-copy template, and how it boosts your Agent Readiness Score.',
  keywords: [
    'llms.txt standard',
    'llms.txt file',
    'llms txt guide',
    'llms.txt for AI agents',
    'llms.txt example',
    'llms.txt vs robots.txt',
    'AI content map',
    'agent discovery file',
    'llms.txt template',
  ],
  openGraph: {
    title: 'llms.txt: The Single File 95% of Businesses Are Missing',
    description:
      'The AI-readable content map 95% of businesses do not have. Standard, copy-paste template, and how it boosts your Agent Readiness Score.',
    url: 'https://agenthermes.ai/blog/llms-txt-standard-guide',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'llms.txt: The Single File 95% of Businesses Are Missing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'llms.txt: The Single File 95% of Businesses Are Missing',
    description:
      'llms.txt is robots.txt for AI agents. 95% of scanned businesses do not have one. Copy the template and ship it today.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/llms-txt-standard-guide',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const llmsTxtSections = [
  {
    name: '# Project',
    description: 'H1 line with the name of your business or product. Agents use this as the canonical identity for search results and citations.',
    example: '# AgentHermes',
    icon: FileText,
    color: 'emerald',
  },
  {
    name: '> One-line summary',
    description: 'A blockquote with a single sentence that describes what you do. This is what agents quote when they mention you in an answer — treat it like your meta description.',
    example: '> The Agent Readiness Score for every business on the internet.',
    icon: Sparkles,
    color: 'blue',
  },
  {
    name: '## Overview',
    description: 'A paragraph or two that gives agents enough context to answer the most common questions about you without crawling the full site.',
    example: 'Context paragraphs explaining what the product does, who it is for, and key differentiators.',
    icon: Layers,
    color: 'purple',
  },
  {
    name: '## Docs',
    description: 'Markdown links to your primary documentation pages. Each link gets a short description so the agent knows when to fetch it. Keep to 5 to 15 links.',
    example: '- [Quickstart](https://agenthermes.ai/docs/quickstart): Score your site in 60 seconds.',
    icon: Code2,
    color: 'cyan',
  },
  {
    name: '## API',
    description: 'Direct links to OpenAPI specs, MCP endpoints, agent cards, and SDKs. This is where agents go when they need to call something, not read about something.',
    example: '- [OpenAPI](https://agenthermes.ai/openapi.json): Machine-readable spec for 55+ endpoints.',
    icon: Server,
    color: 'amber',
  },
  {
    name: '## Examples',
    description: 'Short task recipes so agents can copy a working pattern instead of guessing. Each example is a heading plus a code block or direct URL.',
    example: '### Score a domain: GET /api/score?domain=example.com',
    icon: Bot,
    color: 'emerald',
  },
]

const comparisonRows = [
  { aspect: 'Audience', robots: 'Search engine crawlers (Googlebot, Bingbot)', llms: 'Large language models and agents (GPTBot, Claude, Google-Extended)' },
  { aspect: 'Format', robots: 'Plain text with User-agent and Disallow lines', llms: 'Markdown with semantic sections and hyperlinks' },
  { aspect: 'Purpose', robots: 'Tell crawlers what NOT to index', llms: 'Tell models what TO prioritize when answering questions about you' },
  { aspect: 'Location', robots: '/robots.txt at root', llms: '/llms.txt at root (and optionally /llms-full.txt)' },
  { aspect: 'Parsing', robots: 'Rule-based allow/disallow', llms: 'Context-loading — the file content becomes part of the model prompt' },
  { aspect: 'Score impact', robots: 'Indirect SEO benefit', llms: 'Direct boost to D1 Discovery and D9 Agent Experience' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is llms.txt?',
    answer:
      'llms.txt is a markdown file served at the root of your domain that tells large language models and AI agents what your site contains, where your documentation lives, and which examples they should prefer when answering questions about you. It was proposed by Jeremy Howard of Answer.AI in 2024 as an AI-readable counterpart to robots.txt. The file is plain markdown, easy to author, and already supported by major AI systems that fetch it when a user asks about your domain.',
  },
  {
    question: 'Where does the llms.txt file go?',
    answer:
      'Serve llms.txt at the root of your primary domain — for AgentHermes that is https://agenthermes.ai/llms.txt. The file must be publicly accessible, return a 200 status, and be served with content type text/plain or text/markdown. Some sites also publish a /llms-full.txt with the complete prose of key docs embedded so agents can answer deep questions without additional fetches.',
  },
  {
    question: 'How is llms.txt different from robots.txt?',
    answer:
      'robots.txt tells search crawlers what not to index. llms.txt tells AI models what to prioritize when answering questions about your business. robots.txt is plain text with allow and disallow rules; llms.txt is markdown with sections like Overview, Docs, API, and Examples. They are complementary, not competitive. You should have both, plus an agent-card.json for richer agent metadata.',
  },
  {
    question: 'Does llms.txt improve my Agent Readiness Score?',
    answer:
      'Yes — directly. AgentHermes detects llms.txt during every scan and awards points against D1 Discovery (0.12 weight) and D9 Agent Experience (0.10 weight) combined. In our data from 500 scanned businesses, sites with a well-structured llms.txt score on average 8 to 12 points higher than sites without one, holding every other factor constant. It is one of the highest-leverage discovery files you can publish in under an hour.',
  },
  {
    question: 'What is the minimum viable llms.txt file?',
    answer:
      'The smallest useful llms.txt has four elements: an H1 with your product name, a blockquote with a one-line summary, an Overview paragraph, and a Docs section with three to five markdown links. Everything else is optional but helpful. You can ship a minimum viable file in 10 minutes, then iterate as you learn which questions agents ask most about your business.',
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

export default function LlmsTxtStandardGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'llms.txt: The Single File 95% of Businesses Are Missing',
    description:
      'A complete guide to the llms.txt standard — what it is, how it differs from robots.txt, a copy-paste template, and how it boosts your Agent Readiness Score.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/llms-txt-standard-guide',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Standards',
    wordCount: 1850,
    keywords:
      'llms.txt standard, llms.txt file, llms.txt template, AI content map, agent discovery file',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'llms.txt Standard Guide',
          item: 'https://agenthermes.ai/blog/llms-txt-standard-guide',
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
      title="llms.txt: The Single File 95% of Businesses Are Missing"
      shareUrl="https://agenthermes.ai/blog/llms-txt-standard-guide"
      currentHref="/blog/llms-txt-standard-guide"
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
            <span className="text-zinc-400">llms.txt Standard Guide</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <FileText className="h-3.5 w-3.5" />
              Standards Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Copy-Paste Template
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            llms.txt:{' '}
            <span className="text-emerald-400">The Single File 95% of Businesses Are Missing</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Of the 500 businesses scanned by AgentHermes, fewer than 25 serve an{' '}
            <strong className="text-zinc-100">llms.txt</strong> file at their root. That one file is
            the fastest, cheapest way to make your site readable to AI agents — and it takes ten
            minutes to write. Here is the standard, a template you can copy, and the exact score
            impact we measure across every dimension.
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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE 95% PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            The 95% Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes has scanned 500 businesses across 27 verticals. The average Agent
              Readiness Score is 43 out of 100. Only one business scored Gold — Resend at 75. Most
              sites lose points because they are invisible to agents, not because their product is
              bad.
            </p>
            <p>
              The easiest fix, the one we recommend before anyone touches OpenAPI or MCP, is to
              publish an <strong className="text-zinc-100">llms.txt</strong> file. It is a plain
              markdown document served at your root that tells AI systems what your site is about
              and where the important parts live. Fewer than 5% of the businesses we scan have one.
              The ones that do score, on average, 8 to 12 points higher across the Discovery and
              Agent Experience dimensions.
            </p>
            <p>
              The file was proposed by Jeremy Howard of Answer.AI in late 2024 as an AI-readable
              counterpart to robots.txt. Unlike robots.txt, which gates access, llms.txt guides
              attention. It tells a model: when someone asks about us, here are the pages you
              should prefer, the docs you should cite, and the APIs you should call.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '500', label: 'businesses scanned', icon: Search },
              { value: '<5%', label: 'have llms.txt', icon: FileText },
              { value: '+8-12', label: 'point boost we measure', icon: BarChart3 },
              { value: '10 min', label: 'to ship v1', icon: Zap },
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

      {/* ===== ANATOMY OF llms.txt ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Anatomy of an llms.txt File
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The standard defines six canonical sections. You do not have to use all of them, but
              each one exists for a specific reason: a different question the agent might be trying
              to answer when it fetches your file.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {llmsTxtSections.map((section) => {
              const colors = getColorClasses(section.color)
              return (
                <div
                  key={section.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <section.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 font-mono">{section.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{section.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{section.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The order matters. Agents that fetch the file often read top-down and truncate at
              context limits. Put your identity, summary, and highest-value links first. Long prose
              and deep cross-references go in a companion{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                /llms-full.txt
              </code>{' '}
              that some agents fetch after the summary.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COPY-PASTE TEMPLATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            Copy This llms.txt Template
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            This is the exact structure we use at{' '}
            <Link href="/llms.txt" className="text-emerald-400 hover:text-emerald-300 underline">
              agenthermes.ai/llms.txt
            </Link>
            . Replace the AgentHermes details with your own. Ship it to the root of your domain as
            plain text and you are done.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-6">
            <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">/llms.txt</span>
              <span className="text-xs text-emerald-400">text/markdown</span>
            </div>
            <pre className="p-5 bg-zinc-950 text-sm text-zinc-300 overflow-x-auto leading-relaxed">
{`# AgentHermes

> The Agent Readiness Platform. Score, fix, and connect any business
> to the agent economy in under 60 seconds.

## Overview

AgentHermes is the FICO of the agent economy. We score every business
across 9 dimensions — discovery, API quality, onboarding, pricing,
payment, data, security, reliability, and agent experience — and help
them close the gaps with auto-generated MCP servers, agent cards,
and structured adapters.

Tiers: Platinum 90+, Gold 75+, Silver 60+, Bronze 40+.

## Docs

- [Quickstart](https://agenthermes.ai/audit): Score any domain in 60 seconds.
- [Standard](https://agenthermes.ai/standard): The agent-hermes.json spec.
- [ARL Levels](https://agenthermes.ai/blog/arl-levels-explained): 0 Dark to 5 Interoperable.
- [Dimensions](https://agenthermes.ai/blog/what-is-agent-readiness): The 9 weighted dimensions.
- [For Verticals](https://agenthermes.ai/for): Agent readiness guides per industry.

## API

- [OpenAPI](https://agenthermes.ai/openapi.json): Machine-readable spec for 55+ endpoints.
- [MCP Server](https://agenthermes.ai/api/mcp): Hosted Model Context Protocol endpoint.
- [Agent Card](https://agenthermes.ai/.well-known/agent-card.json): A2A v0.3 agent card.
- [NLWeb](https://agenthermes.ai/api/nlweb?q=): Natural-language query endpoint.

## Examples

### Score a domain
GET https://agenthermes.ai/api/score?domain=example.com

### Fetch the leaderboard
GET https://agenthermes.ai/api/leaderboard?limit=50

### Generate an agent-card.json for your business
POST https://agenthermes.ai/api/generate/agent-card
`}
            </pre>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Keep every link absolute. Agents that fetch your llms.txt do not always parse the
              current page context — they expect fully qualified URLs so they can follow up with
              additional fetches. Use markdown links with a colon-separated description so the
              agent knows when the link is relevant without opening it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== robots.txt vs llms.txt ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            llms.txt vs robots.txt: They Are Not the Same File
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A common mistake is treating llms.txt as a second robots.txt. It is not. They serve
            different audiences, use different formats, and affect different parts of your
            readiness profile.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>robots.txt</div>
              <div>llms.txt</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.robots}</div>
                <div className="text-emerald-400">{row.llms}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              You should serve both — plus an agent-card.json and, ideally, an AGENTS.md at the
              root of your repository. AgentHermes detects all four during a scan and awards
              separate points for each. A site with robots.txt plus llms.txt plus agent-card.json
              signals that you understand both the old web and the new one.
            </p>
            <p>
              If you also run AI crawlers like GPTBot, anthropic-ai, or Google-Extended against
              your own content, make sure your robots.txt allows them. Some teams accidentally
              block the same crawlers they are trying to reach with llms.txt. Align the two files.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORE IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            How llms.txt Affects Your Agent Readiness Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes checks for llms.txt on every scan. When the file is present, well-formed,
              and returns 200, we award points against two of the nine dimensions:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  D1 Discovery
                </span>
                <span className="text-xs text-zinc-500">weight 0.12</span>
              </div>
              <h3 className="font-bold text-zinc-100 mb-2 text-sm">Agents can find what matters</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                llms.txt explicitly lists the URLs you want cited — docs, APIs, agent cards. That
                removes guesswork for crawlers and raises Discovery from partial to full credit.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                  D9 Agent Experience
                </span>
                <span className="text-xs text-zinc-500">weight 0.10</span>
              </div>
              <h3 className="font-bold text-zinc-100 mb-2 text-sm">Agents get context without 40 fetches</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                A single llms.txt fetch replaces a dozen HTML crawls. That latency reduction is a
                direct signal of a site built for agent workflows, not just search engines.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Compounding effect:</strong> every link you add
              to your llms.txt improves the score of those destinations too — because agents follow
              the links and discover your agent-card.json, your OpenAPI spec, and your MCP server
              in the same session. One file, multiple dimensions lifted at once.
            </p>
          </div>
        </div>
      </section>

      {/* ===== RELATED FILES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            The Family of AI Discovery Files
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                name: 'llms.txt',
                detail: 'Markdown content map served at root. Guides which pages models should prioritize. This article.',
              },
              {
                name: 'agent-card.json',
                detail: 'A2A-compatible agent descriptor at /.well-known/agent-card.json. Declares skills, input modes, and capabilities.',
              },
              {
                name: 'AGENTS.md',
                detail: 'Markdown file in repo root documenting coding agent conventions, tools, and workflows. Read by Claude, Cursor, and others.',
              },
              {
                name: 'robots.txt for AI',
                detail: 'Existing robots.txt with explicit rules for GPTBot, anthropic-ai, Google-Extended, CCBot, and ClaudeBot user agents.',
              },
              {
                name: 'openapi.json',
                detail: 'Machine-readable REST API spec. D2 weight 0.15 — the highest-scoring signal in the whole system.',
              },
              {
                name: 'MCP endpoint',
                detail: 'Model Context Protocol server — the interactive counterpart to static files. Tools, resources, prompts.',
              },
            ].map((file) => (
              <div
                key={file.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-mono font-bold text-emerald-400 mb-2 text-sm">{file.name}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{file.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Each file answers a different question. llms.txt answers &ldquo;what is this site
              about and where should I go?&rdquo;{' '}
              <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-card.json
              </Link>{' '}
              answers &ldquo;what can this agent do?&rdquo; AGENTS.md answers &ldquo;how do I work
              in this codebase?&rdquo; Together they form a complete agent-readable surface area.
            </p>
            <p>
              If you only ship one, start with llms.txt. It is the lowest-friction file, the
              easiest to maintain, and the one that compounds the fastest because every agent that
              reads it follows the links to your richer assets — including your{' '}
              <Link href="/blog/what-is-mcp-server" className="text-emerald-400 hover:text-emerald-300 underline">
                MCP server
              </Link>
              .
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
                title: 'What Is agent-card.json? The Missing File on 500 Business Websites',
                href: '/blog/agent-card-json-guide',
                tag: 'Standards',
                tagColor: 'emerald',
              },
              {
                title: 'What Is an MCP Server and Why Your Business Needs One',
                href: '/blog/what-is-mcp-server',
                tag: 'Beginner Guide',
                tagColor: 'blue',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'Playbook',
                tagColor: 'purple',
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
            Ship llms.txt, then fix the rest
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness scan. See exactly which discovery files you are missing,
            what your score would be with them, and get an auto-generated llms.txt in the report.
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
              href="/standard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See the Standard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
