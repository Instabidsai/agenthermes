import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Eye,
  Globe,
  HelpCircle,
  Layers,
  Search,
  Server,
  Settings,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Feature Flags and Agent Readiness: Why Gradual Rollouts Affect AI Agent Behavior | AgentHermes',
  description:
    'Feature flags create inconsistent API behavior for AI agents. When you flag-gate a feature, some agents see it and some do not. Learn agent-ready feature flag practices that prevent broken D2 API Quality scores.',
  keywords: [
    'feature flags agent readiness rollout',
    'feature flags AI agent',
    'LaunchDarkly agent readiness',
    'gradual rollout AI agents',
    'feature flag API consistency',
    'agent readiness feature flags',
    'API versioning agent behavior',
    'Growthbook agent readiness',
  ],
  openGraph: {
    title: 'Feature Flags and Agent Readiness: Why Gradual Rollouts Affect AI Agent Behavior',
    description:
      'Feature flags break agent expectations. Some agents see features, some do not. Here is how to make gradual rollouts agent-aware.',
    url: 'https://agenthermes.ai/blog/feature-flags-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Feature Flags and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feature Flags and Agent Readiness',
    description:
      'Gradual rollouts create inconsistent behavior for AI agents. Here is how to fix it.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/feature-flags-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const flagProblems = [
  {
    problem: 'Inconsistent API Responses',
    description: 'Agent A calls your API and gets a response with the new "bulk_create" field. Agent B calls the same API seconds later and the field does not exist. Agent A builds a workflow around bulk_create. Agent B cannot replicate it. Neither agent is wrong — your feature flag just split them into different experiences.',
    icon: AlertTriangle,
    color: 'red',
  },
  {
    problem: 'Documentation Drift',
    description: 'Your API docs describe the new feature because you shipped the docs update with the flag. But only 20% of requests see it. Agents read your docs, try the new endpoint, and 80% get a 404. Your D2 API Quality score drops because your docs promise something your API does not consistently deliver.',
    icon: Eye,
    color: 'amber',
  },
  {
    problem: 'Broken Agent Caching',
    description: 'Agents cache API capabilities. When an agent discovers that your API supports a feature, it remembers that for future requests. If the feature disappears on the next call because the flag evaluation changed (new session, different IP, percentage rollout), the agent retries with stale assumptions and fails.',
    icon: Server,
    color: 'amber',
  },
  {
    problem: 'Score Volatility',
    description: 'AgentHermes scans the same API endpoint multiple times. If a feature flag causes different responses on different scans, the D2 API Quality dimension fluctuates. One scan finds a well-structured endpoint. The next scan gets a different response shape. The score becomes unreliable — not because the scanner is inconsistent, but because your API is.',
    icon: BarChart3,
    color: 'red',
  },
]

const bestPractices = [
  {
    practice: 'Flag State in Response Headers',
    description: 'Include an X-Feature-Flags header in every API response listing which flags are active for this request. Agents can read this header and adjust behavior. If they see "bulk_create: false" they know not to attempt it, even if docs mention it.',
    example: 'X-Feature-Flags: bulk_create=false, v2_pricing=true, beta_search=false',
    impact: 'D9 Agent Experience: agents get explicit context about what is available right now',
  },
  {
    practice: 'API Version Pinning Per Agent Client',
    description: 'Let agent clients pin to a specific API version via header or query parameter. When an agent connects with "api-version: 2026-04-01", it always gets the same feature set regardless of flag state. New features only appear when the agent explicitly upgrades.',
    example: 'GET /api/products HTTP/1.1\nX-API-Version: 2026-04-01',
    impact: 'D2 API Quality: consistent behavior eliminates the "works sometimes" problem',
  },
  {
    practice: 'Agent User-Agent as a Rollout Segment',
    description: 'Treat agent traffic as a distinct segment in your feature flag platform. LaunchDarkly, GrowthBook, and Unleash all support custom targeting rules. Create a segment for User-Agents containing "agent", "bot", "claude", "gpt". Roll out to agents as a cohort — all agents get the feature or none do.',
    example: 'LaunchDarkly rule: IF user_agent CONTAINS "agent" THEN serve variation "stable"',
    impact: 'D8 Reliability: agents see consistent behavior even during human rollouts',
  },
  {
    practice: 'Feature Discovery Endpoint',
    description: 'Expose a /api/features or /api/capabilities endpoint that returns the current feature set for the requesting client. Agents call this once on connection and know exactly what is available. No guessing, no discovering features by trial and error.',
    example: 'GET /api/features → { "bulk_create": false, "v2_pricing": true, "search_filters": ["category", "price", "date"] }',
    impact: 'D1 Discovery: agents know capabilities before making any real API calls',
  },
  {
    practice: 'Changelog with Flag Status',
    description: 'When you announce a feature in your changelog, include its rollout status. "Bulk create: rolling out 0-100% over 2 weeks. Pin to api-version 2026-04-15 for guaranteed access." Agents (and their developers) know exactly when to expect the feature.',
    example: 'changelog entry: { feature: "bulk_create", status: "rolling_out", percentage: 45, stable_date: "2026-04-30" }',
    impact: 'D6 Data Quality: metadata about feature availability is itself structured data',
  },
]

const platformComparison = [
  { platform: 'LaunchDarkly', agentSegment: 'Custom targeting rules with user attributes', versionPin: 'Via context attributes', headerSupport: 'Custom — needs middleware' },
  { platform: 'GrowthBook', agentSegment: 'Custom attributes in SDK', versionPin: 'Feature-level overrides', headerSupport: 'Custom — needs middleware' },
  { platform: 'Unleash', agentSegment: 'Strategy constraints', versionPin: 'Via custom context fields', headerSupport: 'Custom — needs middleware' },
  { platform: 'Statsig', agentSegment: 'Custom targeting gates', versionPin: 'Layer-based holdouts', headerSupport: 'Custom — needs middleware' },
  { platform: 'Flagsmith', agentSegment: 'Segments with trait rules', versionPin: 'Per-environment flags', headerSupport: 'Custom — needs middleware' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do feature flag platforms support agent-specific targeting?',
    answer:
      'Not natively, but all major platforms (LaunchDarkly, GrowthBook, Unleash) support custom attributes and targeting rules. You can create an "is_agent" attribute based on User-Agent detection and use it to create a stable segment. This means agents always see the same feature set — either all new features or all stable features — without experiencing the randomness of percentage-based rollouts.',
  },
  {
    question: 'Should I always give agents the new features or the stable ones?',
    answer:
      'Default to the stable feature set. Agents build workflows around your API capabilities. A feature that appears and disappears breaks those workflows. Only expose new features to agents once the feature is at 100% rollout and marked stable. If an agent developer explicitly opts in to beta features via an API version header, that is their choice and risk.',
  },
  {
    question: 'How does this affect my Agent Readiness Score?',
    answer:
      'Feature flags primarily affect D2 API Quality and D8 Reliability. D2 measures whether your API behaves consistently with what your documentation promises. If your docs describe a feature that only 30% of requests see, D2 drops. D8 measures response consistency — if the same endpoint returns different response shapes on different calls, D8 drops. Both improve immediately when you pin agent traffic to a stable feature set.',
  },
  {
    question: 'What about A/B testing with agents?',
    answer:
      'A/B testing with human users works because humans are flexible — they adapt to different UI layouts. Agents are not flexible. They parse structured responses according to a schema. If variant A returns { price: 9.99 } and variant B returns { cost: 9.99 }, that is not an A/B test for an agent — it is a breaking change on 50% of requests. Never A/B test response schema changes on agent traffic.',
  },
  {
    question: 'How do I detect agent traffic for flag targeting?',
    answer:
      'Check the User-Agent header for known agent identifiers: "claude", "gpt", "anthropic", "openai", "agent", "bot" (excluding search engine bots which you may want to treat differently). Also check for the MCP-Client header if you serve MCP connections. For more sophisticated detection, use the Accept header — agents typically request application/json while browsers request text/html.',
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

export default function FeatureFlagsAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Feature Flags and Agent Readiness: Why Gradual Rollouts Affect AI Agent Behavior',
    description:
      'Feature flags create inconsistent API behavior for AI agents. When you flag-gate a feature, some agents see it and some do not. Learn agent-ready feature flag practices.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/feature-flags-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'feature flags agent readiness rollout, LaunchDarkly AI agent, gradual rollout agent behavior, API consistency agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Feature Flags and Agent Readiness',
          item: 'https://agenthermes.ai/blog/feature-flags-agent-readiness',
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
      title="Feature Flags and Agent Readiness: Why Gradual Rollouts Affect AI Agent Behavior"
      shareUrl="https://agenthermes.ai/blog/feature-flags-agent-readiness"
      currentHref="/blog/feature-flags-agent-readiness"
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
            <span className="text-zinc-400">Feature Flags and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Settings className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              DevOps
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Feature Flags and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Gradual Rollouts Affect AI Agent Behavior</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            You are rolling out a new API feature with LaunchDarkly. 30% of requests see it. The
            other 70% do not. For human users, this is fine — they adapt. For AI agents, this is a
            breaking inconsistency. The agent reads your docs, tries the new endpoint, and fails
            70% of the time. Your{' '}
            <strong className="text-zinc-100">D2 API Quality score drops</strong> and you do not
            know why.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            The Problem: Feature Flags Were Designed for Humans
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Feature flags are a standard DevOps practice. Platforms like LaunchDarkly, GrowthBook,
              Unleash, Statsig, and Flagsmith let you gradually roll out features to a percentage
              of users, target specific segments, and kill switches for broken features. For human
              users, this works because humans are resilient to minor UI changes and inconsistencies.
            </p>
            <p>
              AI agents are not resilient. An agent reads your API documentation, builds a mental
              model of your capabilities, and makes structured calls based on that model. When
              your API returns different responses based on a feature flag that the agent cannot
              see or control, the agent&apos;s model breaks. It does not &ldquo;notice&rdquo; that
              a feature appeared or disappeared — it either succeeds or fails, with no explanation
              for the inconsistency.
            </p>
            <p>
              This is not a theoretical problem. As businesses adopt{' '}
              <Link href="/blog/api-versioning-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                API versioning for agent readiness
              </Link>, feature flags become the hidden variable that undermines versioning guarantees.
              You pin an agent to API v2, but a feature flag within v2 still changes behavior
              between requests.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {flagProblems.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.problem}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.problem}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== A CONCRETE SCENARIO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            A Concrete Scenario: The Disappearing Field
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              You run a SaaS platform with an API. You are adding batch support to your{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                create_item
              </code>{' '}
              endpoint. Behind a feature flag at 25% rollout, the endpoint now accepts an array of
              items instead of a single item. Your updated docs show both single and batch usage.
            </p>
            <p>
              An AI agent reads your docs and sees batch support. It builds a workflow that batches
              100 items per request for efficiency. On the first call, the flag evaluates to{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">true</code>{' '}
              (25% chance) — it works. The agent caches this capability. On the second call, the
              flag evaluates to{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">false</code>{' '}
              (75% chance) — the batch parameter is rejected. The agent gets a 400 error.
            </p>
            <p>
              From the agent&apos;s perspective, your API is broken. From your monitoring perspective,
              everything is working as designed. The feature flag is operating correctly. But your D2
              score just dropped because the agent found an inconsistency between your documented
              behavior and actual behavior.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The rule of thumb:</strong> If a feature flag changes
              the shape of an API response or the set of accepted parameters, it is not safe for
              agent traffic during gradual rollout. Response shape changes need version pinning.
              Parameter changes need capability discovery. Both need explicit communication to agent
              clients.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BEST PRACTICES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Five Agent-Ready Feature Flag Practices
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not have to stop using feature flags. You need to make them agent-aware. These five
            practices prevent feature flags from degrading your Agent Readiness Score.
          </p>

          <div className="space-y-4 mb-8">
            {bestPractices.map((item) => (
              <div
                key={item.practice}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-bold text-zinc-100 text-sm">{item.practice}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.description}</p>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-2">
                  <p className="text-xs text-zinc-500">
                    <span className="text-zinc-400 font-medium">Example:</span>{' '}
                    <code className="text-emerald-400 text-xs whitespace-pre-wrap">{item.example}</code>
                  </p>
                </div>
                <p className="text-xs text-blue-400">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            Feature Flag Platforms and Agent Support
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            No major feature flag platform has native agent-aware targeting yet. All support it through
            custom attributes and targeting rules. Here is the state of each platform as of April 2026.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div>Agent Segment</div>
              <div>Version Pinning</div>
              <div>Flag Headers</div>
            </div>
            {platformComparison.map((row, i) => (
              <div
                key={row.platform}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.platform}</div>
                <div className="text-emerald-400">{row.agentSegment}</div>
                <div className="text-zinc-400">{row.versionPin}</div>
                <div className="text-zinc-500">{row.headerSupport}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is consistent: every platform supports the building blocks for agent-aware
              feature flags, but none have productized it. This is an opportunity for{' '}
              <Link href="/blog/tally-growthbook-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                platforms like GrowthBook
              </Link>{' '}
              to differentiate by offering first-class agent targeting. Until then, you need to
              implement the middleware yourself.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Impact on Agent Readiness Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Feature flags affect three of the nine AgentHermes dimensions. Here is how each
              dimension is impacted and what implementing agent-aware flags improves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                dimension: 'D2: API Quality',
                weight: '15%',
                impact: 'Inconsistent response shapes between flagged and unflagged requests reduce D2. Agents score your API based on what they actually receive, not what your docs promise.',
                fix: 'Version pinning ensures consistent responses',
                color: 'emerald',
              },
              {
                dimension: 'D8: Reliability',
                weight: '13%',
                impact: 'Response consistency is a core D8 signal. If the same endpoint returns different field sets on sequential calls, D8 drops. Feature flags are the most common cause of phantom reliability issues.',
                fix: 'Agent segment targeting eliminates fluctuation',
                color: 'blue',
              },
              {
                dimension: 'D9: Agent Experience',
                weight: '10%',
                impact: 'X-Feature-Flags headers and capability discovery endpoints directly improve D9. Agents that can query what is available before making calls have a better experience and report fewer errors.',
                fix: 'Feature discovery endpoint + flag headers',
                color: 'purple',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.dimension}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-2 w-2 rounded-full ${colors.bg} border ${colors.border}`} />
                    <h3 className="font-bold text-zinc-100 text-sm">{item.dimension}</h3>
                    <span className="text-xs text-zinc-500">({item.weight})</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.impact}</p>
                  <p className={`text-xs ${colors.text}`}>{item.fix}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Combined impact:</strong> These three dimensions
              represent 38% of the total Agent Readiness Score. Implementing agent-aware feature
              flags can improve your overall score by 5-15 points depending on how many flag-gated
              features affect your API surface. For a business sitting at 55 (Silver), this could
              be the difference between Silver and Gold.
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
                title: 'API Versioning and Agent Readiness',
                href: '/blog/api-versioning-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'cyan',
              },
              {
                title: 'Tally and GrowthBook Agent Readiness',
                href: '/blog/tally-growthbook-agent-readiness',
                tag: 'Case Study',
                tagColor: 'blue',
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
            Are your feature flags hurting your agent readiness?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free scan to see if inconsistent API behavior is dragging down your D2 and D8 scores.
            Get actionable recommendations for agent-aware feature flag practices.
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
