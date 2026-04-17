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
  CreditCard,
  Eye,
  FileJson,
  Globe,
  HelpCircle,
  KeyRound,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'AI Agent Trust: Why Businesses Need to Score the Agents Calling Their APIs | AgentHermes',
  description:
    'AgentHermes scores businesses for agent readiness. But trust is bidirectional. Businesses also need to score the AI agents calling their APIs. Know Your Agent (KYA): identity, compliance, and payment capability.',
  keywords: [
    'AI agent trust scoring KYA',
    'AI agent trust',
    'Know Your Agent',
    'KYA protocol',
    'agent identity verification',
    'AI agent security',
    'agent trust scoring',
    'bidirectional agent trust',
    'agent readiness trust',
  ],
  openGraph: {
    title:
      'AI Agent Trust: Why Businesses Need to Score the Agents Calling Their APIs',
    description:
      'Trust is bidirectional. Businesses need agent readiness, and agents need business trust. The KYA framework for scoring incoming AI agents.',
    url: 'https://agenthermes.ai/blog/ai-agent-trust-scoring',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Agent Trust Scoring: Know Your Agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'AI Agent Trust: Why Businesses Need to Score the Agents Calling Their APIs',
    description:
      'AgentHermes scores businesses. But who scores the agents? The KYA framework for bidirectional trust in the agent economy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/ai-agent-trust-scoring',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const trustSignals = [
  {
    signal: 'OAuth Client Registration',
    description:
      'The agent authenticates through a registered OAuth 2.0 client with a known redirect URI, client ID, and declared scopes. This is the strongest identity signal — it ties the agent to a registered application with a verified developer.',
    trustLevel: 'High',
    color: 'emerald',
    icon: KeyRound,
  },
  {
    signal: 'User-Agent Declaration',
    description:
      'The agent sends a structured User-Agent header that identifies itself, its version, its operator, and a contact URL. Example: AgentName/1.2 (operator: company.com; contact: agent-ops@company.com). Honest self-identification is a baseline trust requirement.',
    trustLevel: 'Medium',
    color: 'blue',
    icon: Bot,
  },
  {
    signal: 'Rate-Limit Compliance',
    description:
      'The agent respects HTTP 429 responses, Retry-After headers, and documented rate limits. An agent that backs off when told to is safer than one that hammers endpoints. Rate-limit compliance over time builds a behavioral trust score.',
    trustLevel: 'Medium',
    color: 'blue',
    icon: Zap,
  },
  {
    signal: 'Payment Capability',
    description:
      'The agent can pay for API usage through x402 micropayments, pre-funded wallets, or linked payment methods. An agent with payment capability has a financial identity — it is economically accountable for its actions.',
    trustLevel: 'High',
    color: 'emerald',
    icon: CreditCard,
  },
  {
    signal: 'Agent Card Declaration',
    description:
      'The agent references its own agent-card.json — a machine-readable file declaring its capabilities, operator, terms of service, and supported protocols. This is the agent equivalent of a business card — structured, verifiable, and standard.',
    trustLevel: 'Medium',
    color: 'blue',
    icon: FileJson,
  },
  {
    signal: 'Request Pattern Analysis',
    description:
      'The agent demonstrates consistent, purposeful request patterns rather than broad crawling or enumeration. A trustworthy agent reads the menu, selects items, and places an order. A scraper reads every page, downloads every image, and tests every endpoint.',
    trustLevel: 'Behavioral',
    color: 'amber',
    icon: Eye,
  },
]

const kyaLevels = [
  {
    level: 'KYA-0: Unknown',
    score: '0-19',
    description:
      'No identity signals. Raw HTTP requests with generic or missing User-Agent. No OAuth, no payment capability, no agent card. Could be a bot, a scraper, or a legitimate agent with no identity infrastructure.',
    action: 'Rate limit aggressively. Read-only access. No sensitive data.',
    color: 'red',
  },
  {
    level: 'KYA-1: Declared',
    score: '20-39',
    description:
      'Structured User-Agent with operator identification. May have a contact URL. Self-declares identity but no verification. Better than unknown but trust is based on the agent\'s honesty.',
    action:
      'Standard rate limits. Public data access. Monitor for pattern anomalies.',
    color: 'amber',
  },
  {
    level: 'KYA-2: Verified',
    score: '40-59',
    description:
      'OAuth client registration with verified developer. Scoped permissions. Consistent rate-limit compliance over time. The agent has proven its identity through a trusted third-party mechanism.',
    action:
      'Full API access within scoped permissions. Transaction capability with limits.',
    color: 'blue',
  },
  {
    level: 'KYA-3: Trusted',
    score: '60-79',
    description:
      'Verified identity plus payment capability plus agent card declaration plus demonstrated behavioral trust over time. The agent has financial accountability, structured identity, and a track record.',
    action:
      'Full access. Higher rate limits. Priority routing. Direct transaction capability.',
    color: 'emerald',
  },
  {
    level: 'KYA-4: Bonded',
    score: '80-100',
    description:
      'All signals present plus insurance or escrow backing. The agent operator has posted a financial bond guaranteeing behavior. Damages from agent misconduct are financially recoverable.',
    action:
      'Premium access. Custom rate limits. Bulk operations. Financial transactions without human approval.',
    color: 'purple',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is Know Your Agent (KYA)?',
    answer:
      'Know Your Agent (KYA) is a framework for businesses to evaluate the trustworthiness of AI agents calling their APIs. Just as KYC (Know Your Customer) verifies human identity in financial services, KYA verifies agent identity, capability, and accountability in the agent economy. It uses signals like OAuth registration, User-Agent declaration, rate-limit compliance, payment capability, and behavioral patterns.',
  },
  {
    question:
      'Why do businesses need to score agents and not just the other way around?',
    answer:
      'Trust is bidirectional. AgentHermes scores businesses on how agent-ready they are — but businesses also need to know which agents are trustworthy. As agent traffic increases, businesses will receive API calls from thousands of different agents. Some are legitimate assistants acting on behalf of users. Some are scrapers pretending to be agents. Some are malicious bots testing for vulnerabilities. Without agent scoring, businesses cannot tell the difference.',
  },
  {
    question: 'How is KYA different from rate limiting?',
    answer:
      'Rate limiting is a blunt instrument — it treats all agents the same. KYA is identity-aware. A KYA-3 Trusted agent with verified identity and payment capability gets higher rate limits and deeper API access than a KYA-0 Unknown agent with no identity signals. KYA does not replace rate limiting; it makes rate limiting smarter by adjusting limits based on trust level.',
  },
  {
    question: 'Does AgentHermes implement KYA?',
    answer:
      'AgentHermes gateway services include agent identity detection as part of the request pipeline. When an agent calls a hosted MCP server, AgentHermes evaluates the agent identity signals present in the request — OAuth credentials, User-Agent structure, agent card reference, payment capability — and assigns a trust level. Business owners can set access policies based on these trust levels.',
  },
  {
    question: 'What happens to agents with no identity?',
    answer:
      'Agents with no identity signals (KYA-0) are not blocked — they are treated as untrusted. They get the most restrictive rate limits, read-only access to public data, and no transaction capability. This is the default-deny posture: prove who you are before you get access to anything sensitive. Most legitimate AI assistants are adding identity signals rapidly, so KYA-0 will increasingly signal either a very new agent or a suspicious one.',
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

export default function AiAgentTrustScoringPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'AI Agent Trust: Why Businesses Need to Score the Agents Calling Their APIs (Not Just the Other Way Around)',
    description:
      'Trust is bidirectional in the agent economy. Businesses need agent readiness, and agents need business trust. The Know Your Agent (KYA) framework for scoring incoming AI agents.',
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
      'https://agenthermes.ai/blog/ai-agent-trust-scoring',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Thought Leadership',
    wordCount: 1900,
    keywords:
      'AI agent trust scoring KYA, Know Your Agent, agent identity, agent trust, bidirectional trust',
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
          name: 'AI Agent Trust Scoring',
          item: 'https://agenthermes.ai/blog/ai-agent-trust-scoring',
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
      title="AI Agent Trust: Why Businesses Need to Score the Agents Calling Their APIs"
      shareUrl="https://agenthermes.ai/blog/ai-agent-trust-scoring"
      currentHref="/blog/ai-agent-trust-scoring"
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
              <span className="text-zinc-400">AI Agent Trust Scoring</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                <Shield className="h-3.5 w-3.5" />
                Thought Leadership
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                Security
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              AI Agent Trust: Why Businesses Need to Score{' '}
              <span className="text-emerald-400">
                the Agents Calling Their APIs
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              AgentHermes scores businesses on how ready they are for AI agents.
              But trust is not one-directional. As agent traffic grows,
              businesses face a new question:{' '}
              <strong className="text-zinc-100">
                which of these agents are trustworthy?
              </strong>{' '}
              Which are legitimate assistants acting on behalf of users, and
              which are scrapers wearing an agent costume? This is the
              Know Your Agent problem.
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

        {/* ===== THE BIDIRECTIONAL TRUST PROBLEM ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-purple-500" />
              The Bidirectional Trust Problem
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                In the human web, trust flows one direction. Businesses build
                websites. Humans visit them. The business trusts that the visitor
                is a real person (mostly). The visitor evaluates whether the
                business is legitimate (reviews, SSL, brand recognition).
              </p>
              <p>
                The agent economy inverts this. Now businesses receive API calls
                from autonomous software agents acting on behalf of humans. The
                business cannot see the human. It sees an API request with a
                bearer token and a User-Agent string. Is this Claude helping
                someone book a dentist appointment? Is this a competitor scraping
                prices? Is this a security researcher probing for
                vulnerabilities?
              </p>
              <p>
                <strong className="text-zinc-100">
                  The Agent Readiness Score measures business-to-agent trust.
                </strong>{' '}
                Can agents find this business? Can they interact with it? Can
                they transact? But the reverse — agent-to-business trust — is
                just as important. A business that opens its APIs to agents
                without verifying agent identity is like a store that lets
                anyone behind the counter.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                {
                  value: '500+',
                  label: 'businesses scanned by AgentHermes',
                  icon: Search,
                },
                {
                  value: '0',
                  label: 'have agent trust scoring',
                  icon: Shield,
                },
                {
                  value: '83%',
                  label: 'cannot distinguish agent from bot',
                  icon: Bot,
                },
                {
                  value: '6',
                  label: 'trust signals we identify',
                  icon: ShieldCheck,
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
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== THE 6 TRUST SIGNALS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              The 6 Agent Trust Signals
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                When an AI agent makes an API request to your business, these
                are the signals that indicate whether it is trustworthy. Each
                signal provides a different layer of identity and
                accountability.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {trustSignals.map((signal) => {
                const colors = getColorClasses(signal.color)
                return (
                  <div
                    key={signal.signal}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <signal.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100">
                          {signal.signal}
                        </h3>
                        <span
                          className={`text-xs font-medium ${colors.text} ${colors.bg} border ${colors.border} px-2 py-0.5 rounded-full`}
                        >
                          Trust: {signal.trustLevel}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {signal.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                No single signal is definitive. An agent with OAuth registration
                but aggressive crawling patterns is suspicious. An agent with
                perfect behavioral patterns but no identity is unverifiable.{' '}
                <strong className="text-zinc-100">
                  Trust is the composite of all signals
                </strong>
                , weighted by the risk level of the API being accessed.
              </p>
            </div>
          </div>
        </section>

        {/* ===== KYA LEVELS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-500" />
              KYA Levels: Know Your Agent Scoring Framework
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Just as AgentHermes uses ARL (Agent Readiness Level) tiers to
                categorize business readiness, KYA levels categorize agent
                trustworthiness. The framework mirrors{' '}
                <Link
                  href="/blog/security-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  security best practices for agent readiness
                </Link>{' '}
                — default-deny, progressive trust, risk-proportional access.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {kyaLevels.map((level) => {
                const colors = getColorClasses(level.color)
                return (
                  <div
                    key={level.level}
                    className={`p-5 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold ${colors.text}`}>
                        {level.level}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        Score: {level.score}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      {level.description}
                    </p>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">
                          Access policy:
                        </span>{' '}
                        {level.action}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== SCRAPERS VS AGENTS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              Scrapers Wearing Agent Costumes
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The most immediate threat is not adversarial AI agents — it is
                traditional scrapers and bots that add an &ldquo;Agent&rdquo;
                User-Agent string to bypass rate limits designed for bots. As
                businesses create agent-friendly APIs with higher rate limits and
                richer data access, the incentive for scrapers to impersonate
                agents increases.
              </p>
              <p>
                The signals that distinguish real agents from impersonators:
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Signal</div>
                <div>Legitimate Agent</div>
                <div>Scraper Impersonator</div>
              </div>
              {[
                {
                  signal: 'OAuth',
                  agent: 'Registered client with scoped permissions',
                  scraper: 'No OAuth or stolen credentials',
                },
                {
                  signal: 'User-Agent',
                  agent:
                    'Structured with operator, version, contact',
                  scraper: 'Generic "AgentBot/1.0" or spoofed',
                },
                {
                  signal: 'Request pattern',
                  agent: 'Purposeful: read menu, select, order',
                  scraper: 'Exhaustive: crawl every endpoint',
                },
                {
                  signal: 'Rate compliance',
                  agent: 'Backs off on 429, respects Retry-After',
                  scraper: 'Ignores limits, rotates IPs',
                },
                {
                  signal: 'Payment',
                  agent: 'Can pay for usage via x402 or wallet',
                  scraper: 'No payment capability',
                },
                {
                  signal: 'Agent card',
                  agent: 'References verifiable agent-card.json',
                  scraper: 'No agent card or fabricated one',
                },
              ].map((row, i) => (
                <div
                  key={row.signal}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.signal}</div>
                  <div className="text-emerald-400">{row.agent}</div>
                  <div className="text-red-400">{row.scraper}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                This is why{' '}
                <Link
                  href="/blog/oauth-for-agents-guide"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  OAuth for agents
                </Link>{' '}
                is not optional — it is the primary mechanism for separating
                legitimate agents from impersonators. Without OAuth, every
                request with an &ldquo;Agent&rdquo; User-Agent string gets the
                same treatment.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT BUSINESSES SHOULD DO ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              What Businesses Should Do Now
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Agent trust scoring is early. Most businesses have no agent
                traffic yet. But the ones that build trust infrastructure before
                the traffic arrives will handle the transition smoothly. Here are
                the concrete steps.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Implement OAuth 2.0 for API access',
                  detail:
                    'Require agent operators to register OAuth clients with declared scopes. This creates verifiable identity for every agent that interacts with your API. It is the foundation of all trust scoring.',
                  icon: KeyRound,
                },
                {
                  step: '2',
                  title: 'Log and classify agent User-Agents',
                  detail:
                    'Start collecting structured User-Agent data from API requests. Classify into human browsers, known bots, declared agents, and unknown. This baseline data is needed before any trust scoring is possible.',
                  icon: Eye,
                },
                {
                  step: '3',
                  title: 'Set tiered rate limits by trust level',
                  detail:
                    'Instead of one rate limit for all API consumers, create tiers. OAuth-registered agents with good behavioral history get higher limits. Unknown requestors get restrictive limits. This incentivizes identity declaration.',
                  icon: Layers,
                },
                {
                  step: '4',
                  title: 'Publish an agent interaction policy',
                  detail:
                    'Document how agents should interact with your API. What User-Agent format you expect. What scopes are available. What rate limits apply per trust level. Make this machine-readable — an AGENTS.md or agent-policy.json.',
                  icon: Globe,
                },
                {
                  step: '5',
                  title:
                    'Monitor request patterns for anomalies',
                  detail:
                    'Build dashboards that show agent behavior over time. Track endpoints accessed, request frequency, error rates, and data volumes. Anomalies in these patterns — sudden spikes, exhaustive crawling, repeated auth failures — indicate scraper behavior.',
                  icon: BarChart3,
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
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.title}
                      </h3>
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
                  The AgentHermes approach:
                </strong>{' '}
                When businesses use AgentHermes hosted MCP servers, agent trust
                scoring is built in. The gateway evaluates incoming agent
                identity signals and applies access policies automatically.{' '}
                <Link
                  href="/blog/monitoring-observability-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Monitoring and observability
                </Link>{' '}
                of agent traffic is part of the dashboard — business owners see
                which agents are calling, how often, and with what trust level.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE TRUST ECONOMY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              The Trust Economy Is Coming
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                We are heading toward a world where trust is the primary
                currency of the agent economy. Agents with high trust scores
                will get better access, lower prices, and faster responses.
                Agents with low trust scores will be rate-limited, restricted,
                or blocked entirely.
              </p>
              <p>
                This mirrors the human credit system. Your FICO score determines
                what financial products you can access. An agent&apos;s KYA
                score will determine what APIs it can access, what data it can
                read, and what transactions it can execute. The Agent Readiness
                Score is the business side of this equation — how ready is the
                business for agents. KYA is the agent side — how trustworthy is
                the agent for the business.
              </p>
              <p>
                The companies that build both sides of this trust infrastructure
                will define the rules of the agent economy. AgentHermes is
                building the business side today and the agent side next.
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
                  title:
                    'Security and Agent Readiness: Protecting Your APIs',
                  href: '/blog/security-agent-readiness',
                  tag: 'Security',
                  tagColor: 'red',
                },
                {
                  title: 'OAuth for Agents: The Complete Guide',
                  href: '/blog/oauth-for-agents-guide',
                  tag: 'Technical Guide',
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
              Score your business for agent readiness
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              See how ready your APIs are for AI agents — and start building the
              trust infrastructure agents need to interact with you safely.
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
