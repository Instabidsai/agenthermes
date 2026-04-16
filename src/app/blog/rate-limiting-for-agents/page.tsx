import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCode2,
  Gauge,
  HelpCircle,
  Layers,
  RefreshCw,
  Server,
  Shield,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Rate Limiting for AI Agents: Why X-RateLimit-Remaining Is the Most Important Header | AgentHermes',
  description:
    'Rate limiting for AI agents is different than for humans. Humans retry manually — agents need machine-readable guidance. X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, and Retry-After are the four headers that prevent agent crashes and accidental DDoS.',
  keywords: [
    'rate limiting AI agents',
    'X-RateLimit-Remaining header',
    'Retry-After header',
    'token bucket algorithm',
    '429 too many requests',
    'agent-ready rate limiting',
    'Stripe rate limits',
    'exponential backoff agents',
    'API rate limit headers',
  ],
  openGraph: {
    title: 'Rate Limiting for AI Agents: Why X-RateLimit-Remaining Is the Most Important Header',
    description:
      'Without machine-readable rate limit headers, agents either crash or DDoS your API. Here is the four-header contract that Stripe uses to score 68 and you should too.',
    url: 'https://agenthermes.ai/blog/rate-limiting-for-agents',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rate Limiting for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rate Limiting for AI Agents: The Four-Header Contract',
    description:
      'Humans retry manually. Agents need machine-readable guidance. Here is how to rate-limit an API in the agent economy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/rate-limiting-for-agents',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const requiredHeaders = [
  {
    name: 'X-RateLimit-Limit',
    description:
      'The maximum number of requests the agent is allowed in the current window. Static per API key or plan. Without this header, an agent has no way to size its concurrency — it has to probe blind.',
    example: 'X-RateLimit-Limit: 100',
    icon: Gauge,
    color: 'emerald',
  },
  {
    name: 'X-RateLimit-Remaining',
    description:
      'How many requests are still allowed in this window. This is the single most important header in the agent economy. Agents watch this value drop and throttle themselves before they ever hit a 429.',
    example: 'X-RateLimit-Remaining: 23',
    icon: Activity,
    color: 'blue',
  },
  {
    name: 'X-RateLimit-Reset',
    description:
      'Unix timestamp (or seconds until reset) when the current window rolls over. Lets agents plan: "I have 23 requests left and the window resets in 14 seconds, so I can burst if needed." Without this, agents guess.',
    example: 'X-RateLimit-Reset: 1744742400',
    icon: Timer,
    color: 'purple',
  },
  {
    name: 'Retry-After',
    description:
      'Only sent on 429 responses. Tells the agent exactly how many seconds to wait before the next attempt. Replaces the ambiguity of "try again later" with a precise machine-readable number.',
    example: 'Retry-After: 7',
    icon: RefreshCw,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is rate limiting for AI agents different than for humans?',
    answer:
      'A human who hits a rate limit sees an error page, waits a few minutes, and tries again. An AI agent is in a loop. If it does not know when to retry, it retries immediately — often within the same second — and makes the rate-limit situation worse. The only difference between a legitimate agent and a DDoS is whether the rate-limit response carries machine-readable guidance. With X-RateLimit-Remaining and Retry-After, the agent self-throttles. Without them, it hammers.',
  },
  {
    question: 'What does Stripe do that earns them 68 on Agent Readiness?',
    answer:
      'Stripe emits all four headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, and Retry-After) on every response — not just 429s. Their 429 body is a structured JSON envelope with an error code and a human-readable message. They use a token bucket algorithm with per-API-key limits, which means one noisy integration cannot starve the rest of their users. All of that is documented on a public /docs/rate-limits page. That is why Stripe scores high on D8 Reliability (13% weight) and D9 Agent Experience (10% weight).',
  },
  {
    question: 'What is a token bucket algorithm and why does it beat fixed windows for agents?',
    answer:
      'A token bucket gives each caller a bucket that holds N tokens. Every request consumes one token. The bucket refills at a constant rate (e.g., 10 tokens per second). This lets an agent burst briefly — say, process a batch of 50 items in a few seconds — and then catch its breath while the bucket refills. A fixed-window limit (100 requests per minute) punishes agents that batch work naturally and wastes capacity during quiet minutes. Stripe, GitHub, and most top scorers in our 500-business scan use token buckets.',
  },
  {
    question: 'Why does AgentHermes weight rate-limit headers under D8 Reliability (13%) and D9 Agent Experience (10%)?',
    answer:
      'Rate limiting sits at the intersection of two dimensions. D8 Reliability measures whether agents can depend on your API over time — without predictable rate limits, they cannot. D9 Agent Experience measures whether agents can handle your responses programmatically — without machine-readable headers, the 429 is a dead end. Together these two dimensions are 23% of the total Agent Readiness Score. Exposing four headers is a single-afternoon change that lifts both.',
  },
  {
    question: 'Should 429 responses have a structured JSON body?',
    answer:
      'Yes. The body should be valid JSON with at minimum: { "error": "rate_limited", "code": "too_many_requests", "message": "You have exceeded the per-key rate limit", "request_id": "req_..." }. An HTML error page or bare plaintext is a scoring penalty in D9 Agent Experience — agents cannot parse it without an LLM round-trip, which wastes budget. Stripe\'s 429 body is the canonical reference implementation.',
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

export default function RateLimitingForAgentsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Rate Limiting for AI Agents: Why X-RateLimit-Remaining Is the Most Important Header',
    description:
      'Machine-readable rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After) prevent agent crashes and accidental DDoS. Stripe uses all four — that is why they score 68.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/rate-limiting-for-agents',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1900,
    keywords:
      'rate limiting AI agents, X-RateLimit-Remaining, Retry-After, token bucket, 429, D8 Reliability, D9 Agent Experience',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Rate Limiting for AI Agents',
          item: 'https://agenthermes.ai/blog/rate-limiting-for-agents',
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
      title="Rate Limiting for AI Agents: Why X-RateLimit-Remaining Is the Most Important Header"
      shareUrl="https://agenthermes.ai/blog/rate-limiting-for-agents"
      currentHref="/blog/rate-limiting-for-agents"
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
            <span className="text-zinc-400">Rate Limiting for AI Agents</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Gauge className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D8 Reliability · D9 Agent Experience
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Rate Limiting for AI Agents:{' '}
            <span className="text-emerald-400">Why X-RateLimit-Remaining Is the Most Important Header</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Rate limiting for AI agents is different than for humans. Humans retry manually; agents
            need <strong className="text-zinc-100">machine-readable guidance</strong>. Stripe&rsquo;s
            429 response includes all four required headers — that is why they score 68. Without
            these headers, agents either crash or DDoS your API. Here is the four-header contract and
            why token buckets beat fixed windows in the agent economy.
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

      {/* ===== HUMANS VS AGENTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Why Agent Rate Limits Are Different From Human Rate Limits
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A human who hits a rate limit sees &ldquo;too many requests&rdquo; on a web page, shrugs,
              gets coffee, and tries in 15 minutes. The retry happens when a human decides to come
              back — always many minutes later, never in a tight loop.
            </p>
            <p>
              An AI agent does not get coffee. An AI agent is in a while-loop. It hit your API once,
              got a 429, and by default its next line of code retries immediately. In 60 seconds that
              agent has sent thousands of requests to an endpoint that is already saturated.
              Congratulations: you just invented a self-inflicted DDoS vector.
            </p>
            <p>
              The only difference between a legitimate agent and a denial-of-service attack is{' '}
              <strong className="text-zinc-100">whether the 429 response carries machine-readable
              guidance</strong>. With X-RateLimit-Remaining and Retry-After, a well-written agent
              throttles itself before hitting the limit, sleeps the exact number of seconds you
              told it to, and comes back under budget. Without those headers, the agent either
              hammers or gives up — both are bad outcomes for the API owner.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '4', label: 'headers required', icon: Gauge },
              { value: '23%', label: 'combined D8+D9 weight', icon: TrendingUp },
              { value: '500', label: 'businesses scanned', icon: BarChart3 },
              { value: '68', label: 'Stripe ARS score', icon: CheckCircle2 },
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

      {/* ===== THE FOUR HEADERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-500" />
            The Four Required Headers
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every response — not just 429s — should carry the first three. The fourth is specific to
            rejection. Together they form the contract between your API and every agent that will
            ever call it.
          </p>

          <div className="space-y-4 mb-8">
            {requiredHeaders.map((header) => {
              const colors = getColorClasses(header.color)
              return (
                <div
                  key={header.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <header.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 font-mono">{header.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{header.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <code className={`${colors.text} text-xs`}>{header.example}</code>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              All four headers are zero-friction for the client. Every HTTP library in every language
              reads response headers by default — no SDK update required. The agent side of the
              contract is a 20-line wrapper that watches X-RateLimit-Remaining and pauses when it hits
              a low-water mark.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TOKEN BUCKET ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            Token Bucket Beats Fixed Windows for Agent Traffic
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There are two common rate-limit algorithms. Fixed windows (&ldquo;100 requests per
              minute&rdquo;) are simple to implement and terrible for agents. Token buckets are
              slightly harder to implement and drastically better for agent workloads.
            </p>
            <p>
              A fixed-window limit punishes the natural shape of agent work. Agents batch: they fetch
              50 items, enrich each one with a follow-up call, then idle. Under a fixed-window limit
              they blow the budget in the first 10 seconds of the minute and sit idle for 50. Under a
              token bucket they burst to the bucket capacity, refill continuously at the limit rate,
              and never waste capacity.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Behavior</div>
              <div>Fixed Window</div>
              <div>Token Bucket</div>
            </div>
            {[
              { aspect: 'Bursting', fixed: 'All-or-nothing at window edge', bucket: 'Allowed up to bucket capacity' },
              { aspect: 'Steady-state throughput', fixed: 'Identical to bucket', bucket: 'Identical to fixed' },
              { aspect: 'Idle recovery', fixed: 'Wasted capacity', bucket: 'Refills the bucket' },
              { aspect: 'Agent ergonomics', fixed: 'Thundering herd at reset', bucket: 'Smooth self-throttling' },
              { aspect: 'Implementation cost', fixed: 'Counter + timestamp', bucket: 'Counter + last-refill time' },
            ].map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.fixed}</div>
                <div className="text-emerald-400">{row.bucket}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Scoring implication:</strong> AgentHermes does not
              score the algorithm itself — we score the observable outputs (headers + structured
              429s). But the top scorers (Stripe 68, GitHub 67, Slack 68, Resend 75) all use token
              buckets. It is a correlation worth noticing: the APIs that ship good agent ergonomics
              also pick the algorithm that matches agent traffic shapes.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PER-KEY LIMITS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Per-API-Key Limits Isolate Noisy Neighbors
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Rate limiting at the IP level made sense when your clients were browsers. Agents break
              that assumption. Every agent shares an IP pool with thousands of other agents (Lambda,
              Cloudflare Workers, residential proxy networks). An IP-level limit means a single noisy
              agent on the same shared egress can starve every other agent through no fault of theirs.
            </p>
            <p>
              Per-API-key limits scope the damage. Each caller gets their own bucket. A runaway loop
              in one integration cannot affect any other. This is how Stripe, Resend, and GitHub all
              handle it: the rate limit is tied to the secret key presented in Authorization, not to
              the connection origin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Per-key limits earn D7 Security credit',
                detail:
                  'AgentHermes scans for evidence of per-key isolation in rate-limit docs. IP-level-only is flagged as a D7 Security weakness — it creates a denial-of-service amplifier across tenants.',
              },
              {
                title: 'Expose the limit in your docs',
                detail:
                  'Publish the per-plan or per-key limit numbers. Free: 100 req/min. Pro: 1000 req/min. Enterprise: negotiated. Ambiguity forces agents to over-probe just to figure out the envelope.',
              },
              {
                title: 'Return 429 with JSON, not HTML',
                detail:
                  '{ "error": "rate_limited", "code": "too_many_requests", "message": "...", "request_id": "req_..." }. HTML error pages are a D9 Agent Experience penalty — they waste LLM tokens to parse.',
              },
              {
                title: 'Document exponential backoff guidance',
                detail:
                  'On your /docs/rate-limits page, include the recommended backoff formula: min(2^n * base, max_delay) with jitter. Remove the ambiguity of "try again later" — give agents the exact math.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW AGENTHERMES SCORES IT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            How AgentHermes Scores Your Rate-Limit Surface
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The scanner issues a handful of requests to likely API endpoints and inspects response
            headers. It also reads your /docs/rate-limits page if one exists. Six signals feed the
            rate-limit component across D8 and D9.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Presence of X-RateLimit-Limit',
                detail:
                  'Returned on every response. Either X-RateLimit-Limit or the RFC-draft RateLimit-Limit form is accepted. This is the single biggest machine-readable trust signal.',
                icon: Gauge,
              },
              {
                step: '2',
                title: 'Presence of X-RateLimit-Remaining',
                detail:
                  'The self-throttle signal. Agents use this to pace themselves. Without it they either over-send (DDoS) or under-send (wasted capacity).',
                icon: Activity,
              },
              {
                step: '3',
                title: 'Presence of X-RateLimit-Reset',
                detail:
                  'Tells agents when the window rolls over. Unix timestamp preferred. Seconds-until-reset acceptable. Hours (without unit) is an anti-pattern we flag.',
                icon: Timer,
              },
              {
                step: '4',
                title: 'Retry-After on 429 responses',
                detail:
                  'We deliberately probe one endpoint past the rate limit to trigger a 429. A missing Retry-After header here is a 2-point D8 penalty.',
                icon: RefreshCw,
              },
              {
                step: '5',
                title: 'Structured JSON 429 body',
                detail:
                  '{ error, code, message, request_id } at minimum. HTML error pages or plaintext lose D9 credit.',
                icon: FileCode2,
              },
              {
                step: '6',
                title: 'Public /docs/rate-limits page',
                detail:
                  'A discoverable documentation page describing limits, algorithm, per-key scoping, and recommended backoff. Cross-counts toward D1 Discoverability and D6 Data Quality.',
                icon: Code2,
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The combined lift from shipping all six signals is roughly 4-5 points on the total
              Agent Readiness Score for an API-centric business. Middleware can emit the three
              presence headers in about 15 lines of code — no new infrastructure, no database
              changes, no schema migrations.
            </p>
            <p>
              If you only ship one of the four headers first,{' '}
              <strong className="text-zinc-100">ship X-RateLimit-Remaining</strong>. It is the
              header that separates self-throttling agents from accidental DDoS. Everything else is
              refinement on top of that foundation.
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
                title: 'Agent Experience (D9): The Dimension That Actually Measures Agent Usability',
                href: '/blog/agent-experience-dimension',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Reliability and Agent Readiness: Why Status Pages Score 13% (D8)',
                href: '/blog/reliability-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'OpenAPI and Agent Readiness: Why Machine-Readable Specs Score',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Guide',
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
            Check your rate-limit surface in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes probes your API, inspects response headers, and scores your rate-limit
            ergonomics on D8 and D9. Free, fast, no signup.
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
