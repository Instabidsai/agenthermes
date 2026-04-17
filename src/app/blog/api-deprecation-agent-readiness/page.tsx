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
  Clock3,
  Code2,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Network,
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
    'API Deprecation and Agent Readiness: How to Sunset Endpoints Without Breaking AI Agent Trust | AgentHermes',
  description:
    'When you deprecate an API endpoint, agents that depend on it break silently. Learn agent-ready deprecation practices: Sunset header, Deprecation header, migration JSON, llms.txt updates, and the AgentHermes D8 Reliability dimension.',
  keywords: [
    'API deprecation sunset AI agents',
    'API deprecation agent readiness',
    'Sunset header RFC 8594',
    'Deprecation header API',
    'agent-ready API deprecation',
    'API versioning sunset',
    'AI agent trust API',
    'endpoint deprecation best practices',
    'llms.txt deprecation',
  ],
  openGraph: {
    title:
      'API Deprecation and Agent Readiness: How to Sunset Endpoints Without Breaking AI Agent Trust',
    description:
      'Deprecated APIs break AI agents silently. Sunset headers, migration JSON, and llms.txt updates are how agent-ready businesses maintain trust during API transitions.',
    url: 'https://agenthermes.ai/blog/api-deprecation-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API Deprecation and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'API Deprecation and Agent Readiness: How to Sunset Endpoints Without Breaking AI Agent Trust',
    description:
      'Removing an endpoint without warning breaks every AI agent that depends on it. Here is how to deprecate APIs without destroying agent trust.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/api-deprecation-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const deprecationMethods = [
  {
    name: 'Sunset Header (RFC 8594)',
    description:
      'An HTTP response header that declares when an endpoint will stop working. The agent reads this on every response and can proactively migrate before the deadline. Format: Sunset: Sat, 01 Nov 2026 00:00:00 GMT.',
    impact: 'Agents get advance warning on every call. Zero surprise breakage.',
    icon: Clock3,
    color: 'emerald',
  },
  {
    name: 'Deprecation Header',
    description:
      'A companion header that marks an endpoint as deprecated even before a sunset date is set. Format: Deprecation: true or Deprecation: Mon, 01 Sep 2025 00:00:00 GMT. Agents can flag this to their operators.',
    impact: 'Early signal that migration planning should begin.',
    icon: AlertTriangle,
    color: 'amber',
  },
  {
    name: 'Migration Guide in Changelog',
    description:
      'A structured changelog entry (JSON or Markdown) that maps old endpoints to their replacements. Includes before/after examples, parameter changes, and response format differences.',
    impact: 'Agents and developers can auto-generate migration code.',
    icon: FileText,
    color: 'blue',
  },
  {
    name: 'llms.txt Update',
    description:
      'Update the llms.txt file at your domain root to reflect deprecated and replacement endpoints. AI agents that read llms.txt for discovery will learn about the change during their next crawl.',
    impact: 'Discovery-layer agents learn about deprecation without calling the old endpoint.',
    icon: Bot,
    color: 'purple',
  },
  {
    name: '410 Gone with Migration JSON',
    description:
      'After the sunset date, return 410 Gone (not 404 Not Found) with a JSON body containing the replacement endpoint URL, migration guide link, and sunset date. Agents can self-heal by following the migration pointer.',
    impact: 'Even agents that missed the warning can recover automatically.',
    icon: Zap,
    color: 'cyan',
  },
]

const antiPatterns = [
  {
    pattern: 'Silent removal',
    description: 'Deleting an endpoint with no headers, no changelog, no communication. The agent gets a connection error or 404.',
    consequence: 'Agent retries indefinitely, then fails silently. User never gets told why the integration broke.',
    severity: 'Critical',
    severityColor: 'red',
  },
  {
    pattern: 'HTML on JSON endpoints',
    description: 'Returning an HTML error page or login redirect where the agent expected JSON. Common when auth tokens expire or endpoints move behind a gateway.',
    consequence: 'Agent parses HTML as JSON, gets garbage data, and may pass corrupted information to the user.',
    severity: 'High',
    severityColor: 'amber',
  },
  {
    pattern: '301 to documentation page',
    description: 'Redirecting a deprecated API endpoint to a docs page. The agent follows the redirect and tries to parse documentation HTML as API response data.',
    consequence: 'Agents that follow redirects get misleading data. Agents that do not follow redirects get a 301 with no useful body.',
    severity: 'High',
    severityColor: 'amber',
  },
  {
    pattern: 'Version bump without migration period',
    description: 'Launching /v3 and immediately shutting down /v2 with no overlap period. Agents hardcoded to /v2 break instantly.',
    consequence: 'Every agent using the old version fails simultaneously. Mass breakage during the exact moment you are trying to improve your API.',
    severity: 'Critical',
    severityColor: 'red',
  },
  {
    pattern: 'Deprecation by blog post only',
    description: 'Announcing deprecation in a blog post or newsletter but adding no machine-readable signals to the API itself.',
    consequence: 'Agents do not read blog posts. Only human developers who happen to follow your blog learn about the change.',
    severity: 'Medium',
    severityColor: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does API deprecation matter more for AI agents than for human developers?',
    answer:
      'Human developers can read changelogs, join mailing lists, and manually update integrations when an API changes. AI agents have no such awareness. They call the endpoint they were configured to call, and if it stops working, they fail silently or retry until a timeout. There is no human in the loop to notice a blog post about deprecation. Machine-readable deprecation signals — headers, structured error responses, llms.txt updates — are the only way agents learn about changes.',
  },
  {
    question: 'What is the Sunset header and is it a real standard?',
    answer:
      'Yes. The Sunset header is defined in RFC 8594, published by the IETF. It specifies an HTTP response header that indicates a date after which the resource will no longer be available. The format is a standard HTTP date. While adoption is still growing, it is an official internet standard and the most agent-friendly way to communicate upcoming endpoint removal. Adding it costs one line of middleware.',
  },
  {
    question: 'How does the AgentHermes D8 Reliability dimension reward good deprecation practices?',
    answer:
      'D8 Reliability measures whether an agent can depend on your API over time. Businesses that use Sunset headers, return structured 410 responses, maintain changelogs, and provide migration paths score higher on D8. The dimension penalizes APIs that have unexplained downtime, return HTML where JSON is expected, or have endpoints that disappeared without machine-readable notice. Think of D8 as a trust score for agents deciding whether to integrate with you long-term.',
  },
  {
    question: 'Should I return 404 or 410 for deprecated endpoints?',
    answer:
      'Always 410 Gone for deliberately removed endpoints. A 404 means the resource was not found and might appear later. A 410 means it existed, is now gone, and will not return. Agents handle these differently: 404 may trigger retries, while 410 signals permanent removal. Include a JSON body with the 410 that points to the replacement endpoint, migration guide URL, and the sunset date. This lets agents self-heal without human intervention.',
  },
  {
    question: 'How long should a deprecation period last before sunset?',
    answer:
      'For agent-facing APIs, a minimum of 90 days between the Deprecation header appearing and the Sunset date. This gives agent operators time to discover the deprecation (agents may not call every endpoint daily), plan migration, test the new endpoint, and deploy updates. For high-traffic endpoints, 180 days is safer. During the overlap period, both old and new endpoints should work. Stripe uses 2-year API version lifecycles, which is the gold standard.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ApiDeprecationAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'API Deprecation and Agent Readiness: How to Sunset Endpoints Without Breaking AI Agent Trust',
    description:
      'When you deprecate an API endpoint, every AI agent that depends on it breaks silently. Agent-ready deprecation practices: Sunset header, Deprecation header, migration JSON, llms.txt updates, and 410 Gone responses.',
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
      'https://agenthermes.ai/blog/api-deprecation-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'API deprecation sunset AI agents, Sunset header RFC 8594, Deprecation header, agent-ready deprecation, llms.txt deprecation',
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
          name: 'API Deprecation and Agent Readiness',
          item: 'https://agenthermes.ai/blog/api-deprecation-agent-readiness',
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
      title="API Deprecation and Agent Readiness: How to Sunset Endpoints Without Breaking AI Agent Trust"
      shareUrl="https://agenthermes.ai/blog/api-deprecation-agent-readiness"
      currentHref="/blog/api-deprecation-agent-readiness"
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
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
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
              <span className="text-zinc-400">
                API Deprecation &amp; Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                <Clock3 className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                API Lifecycle
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              API Deprecation and Agent Readiness:{' '}
              <span className="text-emerald-400">
                How to Sunset Endpoints Without Breaking AI Agent Trust
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              You push a deploy that removes{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">
                /api/v1/products
              </code>
              . Twelve AI agents that were calling it every hour now get 404s.
              They retry. They fail. They stop recommending your business. You
              never find out because{' '}
              <strong className="text-zinc-100">
                agents do not file support tickets
              </strong>
              . They just leave.
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
                    14 min read
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
              The Silent Breakage Problem
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                When a human developer&apos;s integration breaks, they notice.
                They check the changelog, search Stack Overflow, email support,
                or read the blog post about the migration. The feedback loop
                between breakage and fix is hours or days.
              </p>
              <p>
                When an AI agent&apos;s integration breaks, nothing happens.
                The agent gets an error, retries a few times, and then either
                returns an error to the user or silently drops your business
                from its results. There is no email to support. There is no
                angry tweet. The agent just stops recommending you.
              </p>
              <p>
                This is the core problem with API deprecation in the agent
                economy:{' '}
                <strong className="text-zinc-100">
                  the feedback loop does not exist
                </strong>
                . You have to build it yourself through machine-readable
                deprecation signals that agents can detect, interpret, and act
                on before the breakage happens.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '0', label: 'agents file support tickets', icon: Bot },
                { value: '12h', label: 'avg detection time (humans)', icon: Clock3 },
                { value: 'Never', label: 'detection time (agents)', icon: AlertTriangle },
                { value: '100%', label: 'silent churn', icon: TrendingUp },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AGENT-READY DEPRECATION ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              The Agent-Ready Deprecation Stack
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Five layers of deprecation signaling, from proactive headers to
              graceful shutdown responses. Implement all five and your{' '}
              <Link
                href="/blog/reliability-agent-readiness"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                D8 Reliability score
              </Link>{' '}
              stays high even during major API transitions.
            </p>

            <div className="space-y-4 mb-8">
              {deprecationMethods.map((method) => {
                const colors = getColorClasses(method.color)
                return (
                  <div
                    key={method.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <method.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {method.name}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      {method.description}
                    </p>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">
                          Agent impact:
                        </span>{' '}
                        <span className={colors.text}>{method.impact}</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The key principle is{' '}
                <strong className="text-zinc-100">
                  progressive machine-readable signaling
                </strong>
                . First the Deprecation header warns that change is coming.
                Then the Sunset header sets a firm deadline. The{' '}
                <Link
                  href="/blog/changelog-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  changelog
                </Link>{' '}
                and llms.txt provide migration details. Finally, the 410 Gone
                response catches any agent that missed all previous signals.
                Each layer is redundant — because in agent infrastructure,
                redundancy is reliability.
              </p>
            </div>
          </div>
        </section>

        {/* ===== ANTI-PATTERNS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Deprecation Anti-Patterns That Destroy Agent Trust
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              These patterns are common in human-facing API management but
              catastrophic for agent integrations. Each one causes silent
              breakage that you will never hear about.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-12 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div className="col-span-2">Severity</div>
                <div className="col-span-3">Pattern</div>
                <div className="col-span-7">Consequence</div>
              </div>
              {antiPatterns.map((item, i) => {
                const colors = getColorClasses(item.severityColor)
                return (
                  <div
                    key={item.pattern}
                    className={`grid grid-cols-12 p-4 text-sm ${
                      i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'
                    }`}
                  >
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}
                      >
                        {item.severity}
                      </span>
                    </div>
                    <div className="col-span-3 font-medium text-zinc-200">
                      {item.pattern}
                    </div>
                    <div className="col-span-7 text-zinc-500">
                      {item.consequence}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-red-400">
                  The HTML-on-JSON-endpoint problem is the most common:
                </strong>{' '}
                When an API endpoint gets moved behind a new auth gateway or
                WAF, unauthenticated requests often get a 200 OK with an HTML
                login page instead of a 401 JSON error. The agent sees 200,
                tries to parse the HTML as JSON, and gets corrupted data. Always
                ensure that every endpoint on your API returns JSON error
                responses, even for authentication failures and WAF blocks.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE 410 GONE PATTERN ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-500" />
              The 410 Gone Response Pattern
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                After the sunset date passes, do not simply delete the endpoint
                and let the server return a generic 404. Instead, keep the
                route alive and return a structured 410 response that gives
                agents everything they need to self-heal.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8">
              <div className="text-xs text-zinc-500 mb-2 font-medium">
                Example 410 Response Body
              </div>
              <pre className="text-sm text-emerald-400 leading-relaxed overflow-x-auto">
{`{
  "error": "endpoint_sunset",
  "code": "GONE",
  "message": "This endpoint was sunset on 2026-11-01",
  "migration": {
    "replacement": "/api/v3/products",
    "guide": "https://docs.example.com/migration/v2-to-v3",
    "changelog": "https://example.com/changelog#2026-08-01",
    "breaking_changes": [
      "price field renamed to unit_price",
      "category_id replaced by category_slug"
    ]
  },
  "sunset_date": "2026-11-01T00:00:00Z",
  "deprecated_since": "2026-08-01T00:00:00Z"
}`}
              </pre>
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                This pattern is powerful because it turns a dead endpoint into
                a migration pointer. An intelligent agent that receives this
                response can parse the replacement URL, check the breaking
                changes, adjust its parameters, and call the new endpoint — all
                within the same conversation turn. The user never knows
                anything changed.
              </p>
              <p>
                Compare this to a bare 404 Not Found, which tells the agent
                nothing except &ldquo;this URL does not exist.&rdquo; The agent
                has no way to recover. It reports failure and moves on. Your
                business loses an integration that might have generated revenue
                for months.
              </p>
            </div>
          </div>
        </section>

        {/* ===== D8 RELIABILITY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              How Deprecation Practices Affect Your Agent Readiness Score
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The AgentHermes scoring framework uses{' '}
                <strong className="text-zinc-100">
                  D8 Reliability
                </strong>{' '}
                (weighted at 13% of total score) to measure whether an agent
                can depend on your API over time. Deprecation practices
                directly influence D8 through several signals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  signal: 'Sunset headers detected',
                  effect: '+3 to +5 points on D8',
                  detail: 'Shows proactive lifecycle management.',
                },
                {
                  signal: 'Structured 410 responses',
                  effect: '+2 to +4 points on D8',
                  detail: 'Shows graceful degradation for removed endpoints.',
                },
                {
                  signal: 'Changelog with migration guides',
                  effect: '+2 to +3 points on D8',
                  detail: 'Shows commitment to backward compatibility.',
                },
                {
                  signal: 'Endpoints returning HTML instead of JSON',
                  effect: '-5 to -8 points on D8',
                  detail: 'Indicates infrastructure that actively misleads agents.',
                },
              ].map((item) => (
                <div
                  key={item.signal}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="font-bold text-zinc-100 mb-1 text-sm">
                    {item.signal}
                  </h3>
                  <div className="text-emerald-400 text-sm font-bold mb-2">
                    {item.effect}
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The relationship between{' '}
                <Link
                  href="/blog/api-versioning-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  API versioning
                </Link>{' '}
                and deprecation is tight. Good versioning gives you the room to
                deprecate gracefully. Bad versioning forces you into breaking
                changes. Together, versioning and deprecation practices account
                for a significant portion of the D8 Reliability dimension.
              </p>
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
                  title: 'API Versioning and Agent Readiness',
                  href: '/blog/api-versioning-agent-readiness',
                  tag: 'Technical Deep Dive',
                  tagColor: 'purple',
                },
                {
                  title: 'Changelog and Agent Readiness',
                  href: '/blog/changelog-agent-readiness',
                  tag: 'Technical Deep Dive',
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
              How reliable is your API to AI agents?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Get your free Agent Readiness Score in 60 seconds. See how your
              D8 Reliability dimension scores, and whether your deprecation
              practices are agent-ready.
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
