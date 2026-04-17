import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCode,
  GitBranch,
  GitCompare,
  Globe,
  HelpCircle,
  Layers,
  RefreshCw,
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
  title: 'API Versioning and Agent Readiness: Why Breaking Changes Kill AI Agent Trust | AgentHermes',
  description:
    'Unversioned APIs that break without warning kill agent workflows permanently. Here is what AgentHermes checks for API versioning, why Stripe is the gold standard, and how to version your API for AI agents.',
  keywords: [
    'API versioning AI agents',
    'API versioning best practices',
    'agent readiness API version',
    'breaking changes AI agents',
    'Stripe API versioning',
    'API deprecation agents',
    'sunset header API',
    'semantic versioning API',
    'MCP server API version',
  ],
  openGraph: {
    title: 'API Versioning and Agent Readiness: Why Breaking Changes Kill AI Agent Trust',
    description:
      'Agents hardcode API patterns. Unversioned APIs that break = agents crash. What we check: /v1/ prefix, Accept-Version header, deprecation notices, changelog endpoint. Stripe is the gold standard.',
    url: 'https://agenthermes.ai/blog/api-versioning-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API Versioning and Agent Readiness: Why Breaking Changes Kill AI Agent Trust',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Versioning and Agent Readiness: Why Breaking Changes Kill AI Agent Trust',
    description:
      'Agents cannot adapt to breaking changes. Stripe pins API versions per-request with 2-year backward compat. Most APIs break without warning. Here is the agent-ready versioning playbook.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/api-versioning-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const versioningSignals = [
  {
    signal: 'URL Path Versioning',
    check: '/v1/ or /v2/ prefix in API paths',
    weight: 'High',
    why: 'Agents hardcode paths. A /v1/ prefix guarantees the path contract remains stable even when newer versions launch.',
    icon: GitBranch,
    color: 'emerald',
  },
  {
    signal: 'Accept-Version Header',
    check: 'API accepts and documents version negotiation via headers',
    weight: 'Medium',
    why: 'Header-based versioning lets agents pin a specific version without changing URLs. Cleaner for agents managing multiple API integrations.',
    icon: Layers,
    color: 'blue',
  },
  {
    signal: 'Deprecation Notice Headers',
    check: 'Sunset and Deprecation headers on deprecated endpoints',
    weight: 'High',
    why: 'Agents need machine-readable signals that an endpoint is going away. A sunset date in headers lets agent orchestrators migrate before the deadline.',
    icon: Clock,
    color: 'amber',
  },
  {
    signal: 'Changelog or Migration Endpoint',
    check: '/changelog or /migrations endpoint with structured version history',
    weight: 'Medium',
    why: 'Agents that self-update need a programmatic way to discover what changed between versions. Human-readable changelogs are not enough.',
    icon: FileCode,
    color: 'purple',
  },
  {
    signal: 'Backward Compatibility Window',
    check: 'Documentation states minimum backward compatibility period',
    weight: 'High',
    why: 'Stripe commits to 2-year backward compat. This is why agents trust Stripe integrations. Unknown deprecation timelines mean agents cannot commit.',
    icon: Shield,
    color: 'emerald',
  },
]

const comparisonRows = [
  {
    aspect: 'Version pinning',
    good: 'Stripe-Version: 2024-04-10 in every request header',
    bad: 'No versioning — response schema changes without notice',
  },
  {
    aspect: 'Breaking changes',
    good: '24-month backward compatibility, new fields additive only',
    bad: 'Field renamed from price to amount in a Tuesday deploy',
  },
  {
    aspect: 'Deprecation notice',
    good: 'Sunset: Sat, 01 Mar 2025 header + 6-month email warnings',
    bad: 'Endpoint returns 404 one day, no prior notice',
  },
  {
    aspect: 'Migration path',
    good: '/v1/upgrade-guide endpoint with structured diff per version',
    bad: 'Blog post titled "Exciting API Changes!" buried in marketing site',
  },
  {
    aspect: 'Agent impact',
    good: 'Agent workflow runs for years without modification',
    bad: 'Agent workflow breaks every 3 months, requires human debug',
  },
]

const antiPatterns = [
  {
    name: 'Silent Schema Changes',
    description: 'Changing a response field name, type, or structure without a version bump. An agent expecting { "price": 29.99 } receives { "amount": 2999 } and silently passes corrupted data downstream.',
    severity: 'Critical',
  },
  {
    name: 'Unversioned Endpoints',
    description: 'API paths like /api/products with no version prefix. When v2 launches, does the old path return v1 or v2 responses? Nobody knows, including the agent.',
    severity: 'High',
  },
  {
    name: 'Date-Based Versioning Without Pinning',
    description: 'API uses date-based versions but defaults to "latest" when no version header is sent. Agents that do not pin a version get random breaking changes.',
    severity: 'High',
  },
  {
    name: 'Deprecation Without Sunset Headers',
    description: 'Announcing deprecation in a blog post or email but not in HTTP response headers. Agents do not read blogs. They read headers.',
    severity: 'Medium',
  },
  {
    name: 'Additive Changes That Are Not Additive',
    description: 'Adding a required field to a request body in an existing version. Agents using the old schema now get 400 errors on every request.',
    severity: 'Critical',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why can agents not just adapt to API changes like human developers do?',
    answer:
      'Human developers read changelogs, update code, test, and deploy. Agents operate autonomously. When an API response changes, the agent has no mechanism to discover what changed, update its parsing logic, test the fix, and redeploy itself — all without human intervention. The agent simply fails. And unlike a human who sees an error and investigates, a failed agent silently retries with the same broken logic or gives up entirely.',
  },
  {
    question: 'Does URL path versioning (/v1/) or header versioning work better for agents?',
    answer:
      'Both work, but path versioning is more agent-friendly because the version is visible in the URL, which agents store and reuse directly. Header versioning requires agents to remember to send the correct header with every request. In practice, the best APIs support both — Stripe uses header versioning (Stripe-Version) for granular control and URL versioning (/v1/) for major version stability.',
  },
  {
    question: 'What is a Sunset header and how does it help agents?',
    answer:
      'The Sunset HTTP header (RFC 8594) tells clients when a resource will become unavailable. Example: Sunset: Sat, 01 Mar 2025 23:59:59 GMT. Agent orchestration platforms can parse this header automatically and flag integrations that need migration before the deadline. Without it, the agent discovers the deprecation when the endpoint starts returning 410 Gone — too late to migrate gracefully.',
  },
  {
    question: 'How does API versioning affect the Agent Readiness Score?',
    answer:
      'API versioning signals primarily affect D2 API Quality (15% weight), D8 Reliability (13% weight), and D9 Agent Experience (10% weight). A well-versioned API scores higher on reliability because agents can trust it will not break. It scores higher on agent experience because version negotiation and sunset headers are machine-readable signals designed for programmatic consumers. Together, these three dimensions account for 38% of the total score.',
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

export default function ApiVersioningAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'API Versioning and Agent Readiness: Why Breaking Changes Kill AI Agent Trust',
    description:
      'Unversioned APIs that break without warning kill agent workflows permanently. Here is what AgentHermes checks for API versioning, why Stripe is the gold standard, and how to version for AI agents.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/api-versioning-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'API versioning AI agents, breaking changes agents, Stripe API versioning, sunset header, agent readiness API',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'API Versioning and Agent Readiness',
          item: 'https://agenthermes.ai/blog/api-versioning-agent-readiness',
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
      title="API Versioning and Agent Readiness: Why Breaking Changes Kill AI Agent Trust"
      shareUrl="https://agenthermes.ai/blog/api-versioning-agent-readiness"
      currentHref="/blog/api-versioning-agent-readiness"
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
            <span className="text-zinc-400">API Versioning and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <GitCompare className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              D2 + D8 + D9
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            API Versioning and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Breaking Changes Kill AI Agent Trust</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Human developers read changelogs. Agents do not. When an API changes its response schema without warning, the agent does not file a bug report — it crashes, retries with the same broken logic, and eventually gives up. The businesses with versioned, stable APIs keep their agent traffic. Everyone else loses it permanently.
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

      {/* ===== WHY VERSIONING MATTERS FOR AGENTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Why Versioning Is Different for Agents Than for Humans
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When a human developer encounters a broken API, they investigate. They read error messages, check the changelog, update their code, and redeploy. The whole process might take a few hours. Frustrating, but recoverable.
            </p>
            <p>
              When an AI agent encounters a broken API, the failure mode is fundamentally different. The agent receives an unexpected response, cannot parse it, and has three options: retry (which fails the same way), return an error to the user (who gives up), or fall back to a competitor&apos;s API (which works). There is no investigation step. There is no &ldquo;update my code&rdquo; step. The agent simply routes around the failure — permanently.
            </p>
            <p>
              This is why API versioning is not a developer convenience for the agent economy — it is a <strong className="text-zinc-100">trust signal</strong>. An agent that has successfully called your /v1/ endpoint 10,000 times trusts that the next call will return the same schema. Break that trust once, and the agent&apos;s orchestration layer flags your API as unreliable. Getting removed from a reliability list is far harder than getting added.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '38%', label: 'of score affected by versioning', icon: BarChart3 },
              { value: '0', label: 'retries before agent gives up', icon: RefreshCw },
              { value: '24mo', label: 'Stripe backward compat window', icon: Shield },
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

      {/* ===== WHAT WE CHECK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Five Versioning Signals AgentHermes Checks
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Our scanner evaluates five specific versioning signals that affect D2 API Quality, D8 Reliability, and D9{' '}
            <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
              Agent Experience
            </Link>. Together these three dimensions carry 38% of the total Agent Readiness Score.
          </p>

          <div className="space-y-4 mb-8">
            {versioningSignals.map((signal) => {
              const colors = getColorClasses(signal.color)
              return (
                <div
                  key={signal.signal}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <signal.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-zinc-100">{signal.signal}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}>
                          {signal.weight} weight
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-3">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">What we check:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{signal.check}</code>
                    </p>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{signal.why}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== STRIPE GOLD STANDARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Gold Standard: How Stripe Versions for Agent Trust
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Stripe is the{' '}
              <Link href="/blog/reliability-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                most agent-reliable
              </Link>{' '}
              payment API we have scanned, and versioning is a core reason why. Every Stripe API request includes a <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">Stripe-Version</code> header that pins the response format to a specific date. Your integration from 2024 gets 2024 response schemas, even when Stripe ships new fields or restructures data in 2026.
            </p>
            <p>
              Stripe commits to a minimum 24-month backward compatibility window. New API versions add fields — they never remove or rename existing ones within a version. Deprecated endpoints get <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">Sunset</code> headers months before removal. Migration guides are published as structured documents, not buried in blog posts.
            </p>
            <p>
              This is why agents trust Stripe. An agent integration built in January 2025 will work identically in January 2027. No human intervention required. No changelog to read. No emergency patches. The contract is explicit and honored.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div className="text-emerald-400">Agent-Ready Versioning</div>
              <div className="text-red-400">Anti-Pattern</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-emerald-400 text-xs">{row.good}</div>
                <div className="text-red-400 text-xs">{row.bad}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ANTI-PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Five Versioning Anti-Patterns That Kill Agent Trust
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These anti-patterns do not just lower your score — they permanently drive agents away. Agent orchestration platforms maintain reliability scores for APIs, and a single breaking change can drop your reliability rating for months.
          </p>

          <div className="space-y-3 mb-8">
            {antiPatterns.map((pattern) => (
              <div
                key={pattern.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-zinc-100">{pattern.name}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    pattern.severity === 'Critical'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                      : pattern.severity === 'High'
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                      : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}>
                    {pattern.severity}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{pattern.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE AGENT-READY VERSIONING PLAYBOOK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            The Agent-Ready Versioning Playbook
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Here is the minimum versioning infrastructure every agent-ready API needs. This is what separates the{' '}
              <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                APIs that score 60+ on D2
              </Link>{' '}
              from the ones stuck below 40.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Use URL path versioning for major versions',
                detail: 'Every API path starts with /v1/. When you ship fundamentally different resource models, launch /v2/ alongside /v1/ — never replace it. Agents hardcode full URLs, so /v1/ must remain stable indefinitely.',
                icon: GitBranch,
              },
              {
                step: '2',
                title: 'Support version pinning via header',
                detail: 'Accept an API-Version or Accept-Version header for minor version control within a major version. Default to the latest minor version when no header is sent, but always respect explicit version requests.',
                icon: Layers,
              },
              {
                step: '3',
                title: 'Add Sunset headers to deprecated endpoints',
                detail: 'When deprecating an endpoint, add Sunset: <date> and Deprecation: true headers to every response. Give at least 12 months notice. Agent orchestration platforms parse these headers automatically.',
                icon: Clock,
              },
              {
                step: '4',
                title: 'Publish a machine-readable changelog',
                detail: 'Expose /api/changelog or include version history in your OpenAPI spec. Each entry: version, date, list of added/changed/deprecated fields with the old and new schemas. Agents that self-update need structured diffs, not prose.',
                icon: FileCode,
              },
              {
                step: '5',
                title: 'Document it in llms.txt',
                detail: 'Add a versioning section to your llms.txt explaining the version scheme, backward compatibility commitment, and how to pin versions. This is the first file agents read when they discover your API — make the version contract explicit.',
                icon: Globe,
              },
            ].map((item) => (
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Score impact:</strong> Implementing all five steps typically lifts D2 API Quality by 8-12 points and D8 Reliability by 5-8 points. For a business currently scoring 45, that alone can push into Silver territory. Run a{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                free scan
              </Link>{' '}
              to see your current D2 and D8 scores.
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
                title: 'Agent Experience (D9): The Dimension That Measures Usability',
                href: '/blog/agent-experience-dimension',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Reliability and Agent Readiness: Why Status Pages Score 13%',
                href: '/blog/reliability-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Deep Dive',
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
            Check your API versioning score
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See how your API scores on D2 Quality, D8 Reliability, and D9 Agent Experience. Free scan, 60 seconds, no signup.
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
