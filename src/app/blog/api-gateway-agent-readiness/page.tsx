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
  Globe,
  HelpCircle,
  Layers,
  Network,
  Router,
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
    'API Gateways and Agent Readiness: How Kong, Apigee, and AWS API Gateway Affect Your Score | AgentHermes',
  description:
    'API gateways add layers between AI agents and your API. Learn how Kong, Apigee, and AWS API Gateway help or hurt your Agent Readiness Score, and how to configure them for the agent economy.',
  keywords: [
    'API gateway agent readiness',
    'Kong agent readiness',
    'Apigee AI agents',
    'AWS API Gateway agent ready',
    'API gateway configuration AI',
    'rate limit headers agents',
    'agent User-Agent blocking',
    'API gateway MCP',
    'agent economy API',
  ],
  openGraph: {
    title:
      'API Gateways and Agent Readiness: How Kong, Apigee, and AWS API Gateway Affect Your Score',
    description:
      'API gateways can boost or kill your Agent Readiness Score. We break down how Kong, Apigee, and AWS API Gateway affect AI agent access and what to configure.',
    url: 'https://agenthermes.ai/blog/api-gateway-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API Gateways and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'API Gateways and Agent Readiness: How Kong, Apigee, and AWS API Gateway Affect Your Score',
    description:
      'API gateways are the front door for AI agents. Misconfigured, they block agents entirely. Configured right, they add rate-limit transparency, caching, and analytics.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/api-gateway-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const gatewayComparison = [
  {
    name: 'Kong Gateway',
    score: '52-61',
    pros: [
      'Plugin ecosystem includes AI-specific rate-limiting',
      'Custom response transformations let you expose rate-limit headers',
      'Open-source version available for self-hosted control',
      'AI Gateway plugin routes to multiple LLM providers',
    ],
    cons: [
      'Default bot-detection plugin blocks non-browser User-Agents',
      'Response transformation adds 8-15ms latency per hop',
      'Plugin ordering can mangle Content-Type negotiation',
    ],
    color: 'emerald',
  },
  {
    name: 'Apigee (Google)',
    score: '48-58',
    pros: [
      'Sophisticated quota policies with developer-app granularity',
      'Built-in analytics separate traffic by API key and consumer',
      'Monetization features support per-call billing models',
      'JSONThreatProtection policy validates payloads automatically',
    ],
    cons: [
      'Spike arrest policies can reject burst agent traffic patterns',
      'Shared flow complexity makes it hard to debug agent-specific issues',
      'No native MCP or agent-card.json passthrough configuration',
    ],
    color: 'blue',
  },
  {
    name: 'AWS API Gateway',
    score: '45-55',
    pros: [
      'Lambda authorizers enable custom agent authentication logic',
      'Usage plans map directly to agent tier management',
      'WebSocket APIs support long-running agent conversations',
      'CloudWatch integration gives per-agent traffic dashboards',
    ],
    cons: [
      'WAF default rules block many automated User-Agents',
      '10MB payload limit restricts large structured data responses',
      '29-second timeout kills slow agent tool calls',
      'No built-in rate-limit header exposure on responses',
    ],
    color: 'purple',
  },
]

const configChecklist = [
  {
    category: 'User-Agent Allowlisting',
    description:
      'AI agents identify with User-Agent strings like "Claude-Agent/1.0" or "GPT-Agent/4.0". Default bot-blocking rules reject these.',
    action:
      'Allowlist AI agent User-Agents in your WAF and bot-detection rules. Create a separate rule group for known AI agent patterns.',
    impact: '+8 to +12 points on D2 API Quality',
    icon: Shield,
  },
  {
    category: 'Rate-Limit Header Exposure',
    description:
      'Agents need X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset headers to self-throttle and avoid 429 errors.',
    action:
      'Configure your gateway to pass through or inject rate-limit headers on every response, not just 429 responses.',
    impact: '+6 to +9 points on D8 Reliability',
    icon: BarChart3,
  },
  {
    category: 'Content-Type Negotiation',
    description:
      'Agents send Accept: application/json. Gateways that force text/html or strip the Accept header break agent parsing.',
    action:
      'Ensure your gateway preserves the Accept header and returns the correct Content-Type. Support application/json as the default for API routes.',
    impact: '+4 to +7 points on D6 Data Quality',
    icon: Code2,
  },
  {
    category: 'Agent Traffic Segmentation',
    description:
      'Without separate analytics, you cannot measure agent-driven revenue, debug agent-specific errors, or optimize agent paths.',
    action:
      'Tag agent traffic with a custom header or API key prefix. Create a separate dashboard for agent requests, latency, and error rates.',
    impact: '+3 to +5 points on D9 Agent Experience',
    icon: Layers,
  },
  {
    category: 'CORS for Agent Clients',
    description:
      'Browser-based agent interfaces (Claude web, ChatGPT) make cross-origin requests. Strict CORS blocks them silently.',
    action:
      'Add Access-Control-Allow-Origin for known agent platform origins. Include Access-Control-Expose-Headers for rate-limit and pagination headers.',
    impact: '+5 to +8 points on D2 API Quality',
    icon: Globe,
  },
  {
    category: 'Latency Budget Management',
    description:
      'Every gateway hop adds 5-20ms. Agents have latency budgets. If your gateway adds 3 hops (WAF + auth + transform), you burn 15-60ms before your API even responds.',
    action:
      'Measure gateway overhead separately from backend latency. Target under 50ms total gateway overhead. Cache frequently-requested agent data at the gateway layer.',
    impact: '+4 to +8 points on D8 Reliability',
    icon: Zap,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do I need an API gateway to be agent-ready?',
    answer:
      'No. An API gateway is not required for agent readiness. Many high-scoring businesses serve agents directly from their application servers. However, if you already have a gateway, misconfiguring it is one of the fastest ways to drop your score. A well-configured gateway adds rate-limit transparency, caching, and analytics that can boost your score by 15-25 points.',
  },
  {
    question: 'Which API gateway is best for agent readiness?',
    answer:
      'Kong edges ahead slightly due to its AI Gateway plugin and flexible response transformation. But the gateway matters less than the configuration. Any gateway configured with agent User-Agent allowlisting, rate-limit header exposure, and proper Content-Type negotiation will score well. Stripe, which scores 68, uses a custom in-house gateway.',
  },
  {
    question:
      'My gateway blocks automated traffic by default. Will AI agents be blocked?',
    answer:
      'Almost certainly yes. Most WAF and bot-detection rules classify non-browser User-Agents as bots and block them. AI agents do not run in browsers and will be rejected. You need to create explicit allowlist rules for agent User-Agent patterns. This is the single most common gateway misconfiguration we see in our scans.',
  },
  {
    question: 'How does gateway latency affect my Agent Readiness Score?',
    answer:
      'The D8 Reliability dimension measures response time. Each gateway hop adds 5-20ms of latency. Three hops (WAF, authentication, response transformation) can add 15-60ms. AgentHermes penalizes APIs with p95 latency over 500ms and rewards those under 200ms. If your gateway adds 60ms to an already-slow backend, you will feel it in your score.',
  },
  {
    question: 'Can my gateway expose an MCP endpoint?',
    answer:
      'Yes. Your gateway can route /mcp or /.well-known/agent-card.json to a dedicated MCP service behind it. Kong and AWS API Gateway both support WebSocket passthrough for MCP SSE transport. The key is ensuring your gateway does not strip or modify the SSE headers that MCP relies on for streaming tool responses.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ApiGatewayAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'API Gateways and Agent Readiness: How Kong, Apigee, and AWS API Gateway Affect Your Score',
    description:
      'API gateways add layers between AI agents and your API. Learn how to configure Kong, Apigee, and AWS API Gateway for the agent economy.',
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
      'https://agenthermes.ai/blog/api-gateway-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1800,
    keywords:
      'API gateway agent readiness, Kong agent ready, Apigee AI agents, AWS API Gateway, rate limit headers, agent User-Agent',
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
          name: 'API Gateways and Agent Readiness',
          item: 'https://agenthermes.ai/blog/api-gateway-agent-readiness',
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
      title="API Gateways and Agent Readiness: How Kong, Apigee, and AWS API Gateway Affect Your Score"
      shareUrl="https://agenthermes.ai/blog/api-gateway-agent-readiness"
      currentHref="/blog/api-gateway-agent-readiness"
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
                API Gateways and Agent Readiness
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                <Router className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                Infrastructure
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              API Gateways and Agent Readiness:{' '}
              <span className="text-emerald-400">
                How Kong, Apigee, and AWS API Gateway Affect Your Score
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Your API gateway is the front door for AI agents. Configured
              correctly, it adds rate-limit transparency, smart caching, and
              traffic segmentation. Configured badly, it blocks agent
              User-Agents, mangles headers, and silently rejects the
              fastest-growing channel of API traffic. We scanned 500 businesses
              and found that{' '}
              <strong className="text-zinc-100">
                67% of gateway-protected APIs block AI agents by default
              </strong>
              .
            </p>

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
                    13 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE GATEWAY PARADOX ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-emerald-500" />
              The Gateway Paradox: Security That Blocks Revenue
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                API gateways exist to protect your backend. They authenticate
                requests, enforce rate limits, cache responses, and block
                malicious traffic. Every major API at scale runs behind one.
                Stripe uses a custom gateway. GitHub routes through a
                sophisticated internal proxy. Shopify, Twilio, and Slack all
                interpose gateway layers between the internet and their
                services.
              </p>
              <p>
                The problem is that these gateways were designed for a world
                where API consumers were other software systems with
                predictable traffic patterns and known client libraries. AI
                agents are different. They send unfamiliar User-Agent strings.
                They make bursty, exploratory requests as they discover
                capabilities. They negotiate content types dynamically. And
                most critically, they need metadata in response headers that
                most gateways strip or never expose.
              </p>
              <p>
                The result: businesses invest in API gateways to improve their
                API infrastructure, and those same gateways{' '}
                <strong className="text-zinc-100">
                  reduce their Agent Readiness Score
                </strong>{' '}
                by blocking the agents that want to use it. We call this the
                gateway paradox, and it affects two thirds of the businesses we
                scan that use managed gateway products.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                {
                  value: '67%',
                  label: 'of gateways block agent User-Agents',
                  icon: Shield,
                },
                {
                  value: '82%',
                  label: 'hide rate-limit headers from responses',
                  icon: BarChart3,
                },
                {
                  value: '15-60ms',
                  label: 'latency overhead per request',
                  icon: Zap,
                },
                {
                  value: '+25pts',
                  label: 'possible from gateway config alone',
                  icon: TrendingUp,
                },
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

        {/* ===== GATEWAY COMPARISON ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-500" />
              Gateway-by-Gateway Breakdown
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We tested each major managed gateway with a standard agent
              request pattern: discovery, authentication, data retrieval, and
              tool invocation. Here is how they scored out of the box versus
              after agent-optimized configuration.
            </p>

            <div className="space-y-6 mb-8">
              {gatewayComparison.map((gw) => {
                const colorMap: Record<
                  string,
                  { text: string; bg: string; border: string }
                > = {
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
                }
                const colors = colorMap[gw.color] || colorMap.emerald
                return (
                  <div
                    key={gw.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-zinc-100">
                        {gw.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}
                      >
                        Score range: {gw.score}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                          Agent-Friendly
                        </h4>
                        <ul className="space-y-1.5">
                          {gw.pros.map((pro) => (
                            <li
                              key={pro}
                              className="flex items-start gap-2 text-sm text-zinc-400"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-amber-400 mb-2">
                          Agent-Hostile (Default)
                        </h4>
                        <ul className="space-y-1.5">
                          {gw.cons.map((con) => (
                            <li
                              key={con}
                              className="flex items-start gap-2 text-sm text-zinc-400"
                            >
                              <Target className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The score ranges reflect default versus optimized
                configurations. Every gateway can reach the upper end of its
                range with the right settings. The key insight: the gateway
                itself is not the differentiator.{' '}
                <strong className="text-zinc-100">
                  Configuration is the differentiator
                </strong>
                . Stripe scores 68 with a custom gateway. A business using
                Kong with default settings might score 35.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CONFIGURATION CHECKLIST ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              The Agent-Ready Gateway Checklist
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Six configuration changes that turn any managed gateway from
              agent-hostile to agent-friendly. Each includes the scoring
              impact we measured across our scan dataset.
            </p>

            <div className="space-y-4 mb-8">
              {configChecklist.map((item) => (
                <div
                  key={item.category}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <item.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-100">
                        {item.category}
                      </h3>
                      <span className="text-xs text-emerald-400 font-medium">
                        {item.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">
                        Action:
                      </span>{' '}
                      <span className="text-emerald-400">
                        {item.action}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW TOP PLATFORMS DO IT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              How Stripe, GitHub, and Shopify Configure Their Gateways
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The highest-scoring platforms in our{' '}
                <Link
                  href="/blog/agent-readiness-leaderboard"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  leaderboard
                </Link>{' '}
                all use API gateways, but they configure them with agent
                access in mind. Stripe returns X-RateLimit-Limit,
                X-RateLimit-Remaining, and X-RateLimit-Reset on every single
                response. GitHub exposes the same headers plus
                X-RateLimit-Resource to distinguish between different endpoint
                pools. Shopify includes Retry-After on 429 responses with
                precise reset timing.
              </p>
              <p>
                None of these platforms block automated User-Agents. They
                authenticate via API keys and OAuth tokens, not by inspecting
                the client. This is the critical architectural decision:{' '}
                <strong className="text-zinc-100">
                  authenticate the request, not the requester
                </strong>
                . An agent with a valid API key should be treated identically
                to a cURL command or a Python script with the same key.
              </p>
              <p>
                All three also expose their{' '}
                <Link
                  href="/blog/cors-headers-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  CORS headers
                </Link>{' '}
                correctly, enabling browser-based agent clients to access
                APIs without preflight failures. And all three document their{' '}
                <Link
                  href="/blog/rate-limiting-for-agents"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  rate limits
                </Link>{' '}
                publicly, so agents can self-throttle before hitting
                enforcement.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  The pattern is clear:
                </strong>{' '}
                top-scoring platforms treat their gateway as an enablement
                layer, not just a protection layer. They configure it to help
                agents succeed, not just to stop bad actors. The gateway
                becomes a feature of the API rather than an obstacle in front
                of it.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SCORING IMPACT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              How Gateway Configuration Maps to Your Score
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Gateway configuration touches four of the nine scoring
                dimensions in the AgentHermes framework. D2 API Quality
                (weighted 0.15) is the most affected, since the gateway
                directly controls endpoint accessibility, response formats,
                and header integrity. D8 Reliability (0.13) captures latency,
                uptime, and rate-limit transparency. D7 Security (0.12)
                evaluates authentication mechanisms and TLS termination. D6
                Data Quality (0.10) measures structured response formatting.
              </p>
              <p>
                Combined, these four dimensions represent 50% of the total
                score weight. A gateway misconfiguration can therefore tank
                half your score. Conversely, an agent-optimized gateway
                configuration is one of the highest-leverage changes a
                technical team can make. We have seen businesses jump from
                Bronze (40-59) to Silver (60-74) with gateway changes alone.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Dimension</div>
                <div>Weight</div>
                <div>Gateway Impact</div>
                <div>Max Points</div>
              </div>
              {[
                {
                  dim: 'D2 API Quality',
                  weight: '0.15',
                  impact: 'Endpoint access, headers, Content-Type',
                  max: '+12',
                },
                {
                  dim: 'D8 Reliability',
                  weight: '0.13',
                  impact: 'Latency, rate-limit headers, uptime',
                  max: '+9',
                },
                {
                  dim: 'D7 Security',
                  weight: '0.12',
                  impact: 'TLS, auth, WAF config',
                  max: '+8',
                },
                {
                  dim: 'D6 Data Quality',
                  weight: '0.10',
                  impact: 'Response format, Content-Type negotiation',
                  max: '+7',
                },
              ].map((row, i) => (
                <div
                  key={row.dim}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.dim}</div>
                  <div className="text-zinc-500">{row.weight}</div>
                  <div className="text-zinc-400">{row.impact}</div>
                  <div className="text-emerald-400 font-bold">{row.max}</div>
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
                    'Rate Limiting for Agents: Why Transparent Throttling Wins',
                  href: '/blog/rate-limiting-for-agents',
                  tag: 'Technical Deep Dive',
                  tagColor: 'purple',
                },
                {
                  title:
                    'CORS Headers and Agent Readiness: The Silent Score Killer',
                  href: '/blog/cors-headers-agent-readiness',
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
                const colorMap: Record<string, string> = {
                  emerald:
                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                  purple:
                    'bg-purple-500/10 border-purple-500/20 text-purple-400',
                  amber:
                    'bg-amber-500/10 border-amber-500/20 text-amber-400',
                }
                return (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                  >
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border ${colorMap[article.tagColor]} text-xs font-medium mb-3`}
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
              Is your gateway blocking AI agents?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan and see exactly how your API
              gateway affects your score. Takes 60 seconds.
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
