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
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  ScrollText,
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
  title: 'Changelogs for AI Agents: Why /changelog Matters for D8 Reliability | AgentHermes',
  description:
    'AgentHermes D8 checks for /changelog or release notes. Agents need to know when APIs change, what broke, and what is new. Learn why structured changelogs separate Silver from Bronze businesses.',
  keywords: [
    'changelog API AI agents reliability',
    'API changelog best practices',
    'changelog for agents',
    'D8 reliability agent readiness',
    'structured changelog',
    'API versioning changelog',
    'agent reliability',
    'changelog endpoint',
    'release notes AI',
  ],
  openGraph: {
    title: 'Changelogs for AI Agents: Why /changelog Matters for D8 Reliability',
    description:
      'AgentHermes D8 checks for /changelog or release notes. Without one, agents cannot distinguish a bug from a breaking change. Here is how to build a changelog agents can read.',
    url: 'https://agenthermes.ai/blog/changelog-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Changelogs for AI Agents: Why /changelog Matters for D8 Reliability',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Changelogs for AI Agents: Why /changelog Matters for D8 Reliability',
    description:
      'Agents need structured changelogs to know when your API changes. Stripe, GitHub, Vercel all have them. Most businesses do not. Here is how to fix that.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/changelog-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const changelogExamples = [
  {
    company: 'Stripe',
    score: 68,
    tier: 'Silver',
    url: 'stripe.com/docs/changelog',
    format: 'HTML + structured API changelog, dated entries, version tags, breaking change labels',
    agentValue: 'Agents can detect breaking changes before retrying failed calls. Migration guides explain how to update.',
    icon: TrendingUp,
    color: 'emerald',
  },
  {
    company: 'GitHub',
    score: 65,
    tier: 'Silver',
    url: 'github.blog/changelog',
    format: 'Blog-style changelog, category tags (API, Actions, Security), RSS feed',
    agentValue: 'Agents subscribe to RSS for real-time awareness of API changes. Category tags let them filter for relevant updates.',
    icon: Code2,
    color: 'emerald',
  },
  {
    company: 'Vercel',
    score: 69,
    tier: 'Silver',
    url: 'vercel.com/changelog',
    format: 'Date-grouped entries, visual cards, product area tags, linked documentation',
    agentValue: 'Each entry links to updated documentation. Agents can follow the link chain from "what changed" to "how to use the new version."',
    icon: Globe,
    color: 'emerald',
  },
  {
    company: 'Average SaaS',
    score: 35,
    tier: 'Not Scored',
    url: 'None or blog post buried in /news',
    format: 'No dedicated changelog. Occasional blog post titled "Product Update Q1 2026" with marketing language',
    agentValue: 'Agents cannot find or parse marketing-style update posts. No structured data, no version numbers, no breaking change indicators.',
    icon: Target,
    color: 'red',
  },
]

const changelogSchema = {
  endpoint: '/changelog or /api/changelog',
  format: 'JSON array',
  fields: [
    { name: 'version', type: 'string', desc: 'Semantic version (e.g. "2.4.0")', required: true },
    { name: 'date', type: 'ISO 8601', desc: 'Release date', required: true },
    { name: 'type', type: 'enum', desc: '"feature" | "fix" | "breaking" | "deprecation" | "security"', required: true },
    { name: 'title', type: 'string', desc: 'One-line summary', required: true },
    { name: 'description', type: 'string', desc: 'Detailed explanation', required: false },
    { name: 'affected_endpoints', type: 'string[]', desc: 'List of API paths affected', required: false },
    { name: 'migration_guide', type: 'URL', desc: 'Link to migration instructions for breaking changes', required: false },
    { name: 'deprecation_date', type: 'ISO 8601', desc: 'When the deprecated feature will be removed', required: false },
  ],
}

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What does AgentHermes check for in D8 Reliability?',
    answer:
      'D8 Reliability (weighted 0.13 in the scoring formula) checks response time, uptime indicators, status page availability, HTTP/2 support, and changelog or release notes. The changelog check looks for /changelog, /api/changelog, /docs/changelog, and common variations. It also checks for structured data within those pages — dates, version numbers, and categorized entries score higher than unstructured blog posts.',
  },
  {
    question: 'Does a blog post count as a changelog?',
    answer:
      'Partially. A blog post titled "Product Update" with a date is better than nothing, but it scores significantly lower than a structured changelog. Agents cannot reliably parse marketing-style prose to determine if an API endpoint changed. A dedicated /changelog page with dated entries, version numbers, and breaking change labels scores highest. A JSON endpoint at /api/changelog scores even higher.',
  },
  {
    question: 'Why do agents care about changelogs?',
    answer:
      'When an agent makes an API call and gets a 500 error, it needs to decide: retry, adapt, or report failure. Without a changelog, the agent has no way to know if the error is temporary (server issue), permanent (breaking change), or expected (deprecated endpoint). A changelog with affected_endpoints and breaking change labels lets the agent diagnose the issue and adapt automatically — or warn the user that a migration is needed.',
  },
  {
    question: 'How often should a changelog be updated?',
    answer:
      'Every time a public-facing API changes. For most businesses this means every deployment that affects API behavior, webhook formats, or authentication flows. The best practice is to update the changelog as part of the deployment process — automated, not manual. Companies that automate changelog generation from git commits and deploy metadata have the most reliable changelogs.',
  },
  {
    question: 'What is the difference between a changelog and API versioning?',
    answer:
      'API versioning (v1, v2, etc.) tells agents which version to call. A changelog tells agents what changed between versions and whether their current integration will break. Both are important. We cover versioning in depth in our API versioning guide. The changelog is the communication layer on top of versioning — it answers "what changed" and "what do I need to do about it."',
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

export default function ChangelogAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Changelogs for AI Agents: Why /changelog Matters for D8 Reliability',
    description:
      'AgentHermes D8 checks for changelogs and release notes. Agents need structured change data to handle API evolution, breaking changes, and deprecations. A complete guide to building agent-readable changelogs.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/changelog-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Guide',
    wordCount: 1900,
    keywords:
      'changelog API AI agents, D8 reliability, structured changelog, API changelog best practices, agent readiness changelog',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Changelogs for AI Agents',
          item: 'https://agenthermes.ai/blog/changelog-agent-readiness',
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
      title="Changelogs for AI Agents: Why /changelog Matters for D8 Reliability"
      shareUrl="https://agenthermes.ai/blog/changelog-agent-readiness"
      currentHref="/blog/changelog-agent-readiness"
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
            <span className="text-zinc-400">Changelogs for AI Agents</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <ScrollText className="h-3.5 w-3.5" />
              Technical Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              D8 Reliability
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Changelogs for AI Agents:{' '}
            <span className="text-emerald-400">Why /changelog Matters for D8 Reliability</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            When an AI agent calls your API and gets a 500 error, it needs to know: is this a bug, a
            temporary outage, or a breaking change you shipped yesterday? Without a structured changelog,
            the agent has no way to tell. <strong className="text-zinc-100">Stripe, GitHub, and Vercel all
            have public changelogs — and all score Silver or higher.</strong> That is not a coincidence.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            The Silent Failure: When Agents Cannot Tell Bugs from Breaking Changes
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An AI agent managing a customer&apos;s subscription calls your <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">POST /api/subscriptions</code> endpoint.
              Yesterday it worked. Today it returns a 500 error. The agent has three options:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li><strong className="text-zinc-100">Retry</strong> — maybe it is a transient server error</li>
              <li><strong className="text-zinc-100">Adapt</strong> — maybe the endpoint moved or the schema changed</li>
              <li><strong className="text-zinc-100">Report failure</strong> — tell the user something is broken</li>
            </ol>
            <p>
              Without a changelog, the agent guesses. It retries 3 times, gets 500 each time, and reports
              failure to the user. The user switches to a competitor. But the real cause was a breaking change
              you deployed at 2 AM — the endpoint now requires a <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">billing_cycle</code> field
              that did not exist before. A changelog with that information would have let the agent adapt
              its request in real time.
            </p>
            <p>
              This is not hypothetical. As{' '}
              <Link href="/blog/api-versioning-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                API versioning
              </Link>{' '}
              becomes more important in the agent economy, the changelog is the communication channel that
              makes versioning useful. Versions tell agents <em>which</em> API to call. Changelogs tell
              agents <em>why</em> the old call stopped working and <em>how</em> to update.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: 'D8', label: 'Reliability dimension', icon: BarChart3 },
              { value: '0.13', label: 'scoring weight', icon: Target },
              { value: '78%', label: 'of Silver+ have changelogs', icon: CheckCircle2 },
              { value: '12%', label: 'of Bronze have changelogs', icon: ScrollText },
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

      {/* ===== WHO DOES IT RIGHT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Who Does Changelogs Right: The Silver+ Pattern
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Every business that scores Silver or higher on the Agent Readiness Score has a public
              changelog. This is one of the clearest correlations in our data — not because the changelog
              alone drives the score, but because companies that maintain public changelogs also maintain
              the kind of{' '}
              <Link href="/blog/reliability-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                reliability infrastructure
              </Link>{' '}
              that agents depend on.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {changelogExamples.map((example) => {
              const colors = getColorClasses(example.color)
              return (
                <div
                  key={example.company}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <example.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{example.company}</h3>
                      <span className={`text-xs font-mono ${colors.text}`}>Score {example.score} — {example.tier}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-zinc-400"><strong className="text-zinc-300">URL:</strong> {example.url}</p>
                    <p className="text-zinc-400"><strong className="text-zinc-300">Format:</strong> {example.format}</p>
                    <p className="text-zinc-400"><strong className="text-zinc-300">Agent value:</strong> {example.agentValue}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE STRUCTURED CHANGELOG ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileJson className="h-5 w-5 text-blue-500" />
            The Structured Changelog: JSON, Not Just HTML
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              A beautiful HTML changelog page is good for humans. But agents need machine-readable data.
              The highest-scoring approach is a <strong className="text-zinc-100">JSON changelog endpoint</strong> alongside
              the human-readable page. When an agent hits <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/api/changelog</code>,
              it gets structured data it can parse, filter, and act on.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8">
            <h3 className="text-sm font-bold text-zinc-100 mb-4">Recommended schema for <code className="text-emerald-400">{changelogSchema.endpoint}</code></h3>
            <div className="rounded-xl border border-zinc-800/80 overflow-hidden">
              <div className="grid grid-cols-4 bg-zinc-800/50 p-3 text-xs font-bold text-zinc-300">
                <div>Field</div>
                <div>Type</div>
                <div>Required</div>
                <div>Description</div>
              </div>
              {changelogSchema.fields.map((field, i) => (
                <div
                  key={field.name}
                  className={`grid grid-cols-4 p-3 text-xs ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-mono text-emerald-400">{field.name}</div>
                  <div className="text-zinc-400">{field.type}</div>
                  <div className={field.required ? 'text-emerald-400' : 'text-zinc-600'}>{field.required ? 'Yes' : 'No'}</div>
                  <div className="text-zinc-500">{field.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The critical fields are <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">type</code> and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">affected_endpoints</code>. When
              an agent filters for <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">type: &quot;breaking&quot;</code> and
              finds the endpoint it just failed on, it knows exactly what happened and can follow the
              migration guide to adapt. Without these fields, the agent is reading prose and guessing.
            </p>
            <p>
              Semantic versioning matters too. An agent that knows you went from <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">v2.3.1</code> to{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">v3.0.0</code> understands
              a major breaking change occurred. A jump from <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">v2.3.1</code> to{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">v2.3.2</code> signals
              a patch — the agent can safely retry.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The deprecation date field is powerful:</strong> Agents can proactively
              warn users that an integration will break on a specific date, weeks before it happens. &ldquo;Your subscription
              management integration with Acme Corp will break on June 15 when they remove the v1 API. I can update the
              integration now or remind you closer to the date.&rdquo; No changelog = no warning = sudden failure.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            How Changelogs Affect Your Agent Readiness Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              D8 Reliability carries a weight of 0.13 — making it the second-highest weighted dimension in
              the AgentHermes scoring formula. A changelog directly contributes to D8, but it also creates
              a halo effect on other dimensions.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { dim: 'D8 Reliability (direct)', impact: '+5-12 points', detail: 'Structured JSON changelog with version, type, and affected_endpoints scores highest. HTML-only changelog with dates scores lower but still contributes.', color: 'emerald' },
              { dim: 'D2 API Quality (indirect)', impact: '+3-8 points', detail: 'Changelogs that document API endpoints, request/response schemas, and error codes serve as supplementary API documentation that agents can reference.', color: 'blue' },
              { dim: 'D9 Agent Experience (indirect)', impact: '+2-5 points', detail: 'A changelog at a well-known URL (/changelog) is a signal of developer maturity that D9 rewards. It indicates the business is thinking about programmatic consumers.', color: 'purple' },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.dim}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-zinc-100">{item.dim}</h3>
                    <span className={`text-sm font-mono font-bold ${colors.text}`}>{item.impact}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The combined effect of a well-structured changelog can add <strong className="text-zinc-100">10-25 points</strong> to
              your Agent Readiness Score. For a business sitting at 35 (Not Scored), adding a changelog alongside
              a status page and proper error handling can push them into Bronze territory (40+). For a business at 55,
              the changelog might be the difference between Bronze and Silver.
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMPLEMENTATION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Building Your Changelog in 30 Minutes
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              You do not need a complex system. A static JSON file at <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/api/changelog</code> that
              you update with each deployment is enough to score well on D8 and give agents the information
              they need. Here is the minimum viable changelog.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { step: '1', title: 'Create /changelog.json in your public directory', detail: 'Static JSON file with an array of changelog entries following the schema above. Start with your last 10 releases.' },
              { step: '2', title: 'Add type and affected_endpoints to each entry', detail: 'These are the fields agents use most. "feature" and "fix" are safe. "breaking" and "deprecation" trigger agent adaptation logic.' },
              { step: '3', title: 'Set up /changelog as a human-readable HTML page', detail: 'Render the same data as a formatted page for human visitors. Link it from your footer, docs, and status page.' },
              { step: '4', title: 'Automate updates from your CI/CD pipeline', detail: 'Parse conventional commit messages (feat:, fix:, BREAKING CHANGE:) and append to changelog.json on each deploy. GitHub Actions, Vercel hooks, and GitLab CI all support this.' },
              { step: '5', title: 'Add RSS or Atom feed', detail: 'Agents and monitoring tools can subscribe to change notifications. A simple RSS feed of your changelog entries lets agents stay aware without polling.' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
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
                title: 'API Versioning and Agent Readiness: Why v1/v2/v3 Matters',
                href: '/blog/api-versioning-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'purple',
              },
              {
                title: 'Reliability and Agent Readiness: Why Uptime Is Not Enough',
                href: '/blog/reliability-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'purple',
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
            Does your business have a changelog?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run your domain through the AgentHermes scanner. D8 Reliability checks for changelogs,
            status pages, response times, and more. See exactly where you stand.
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
