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
  DollarSign,
  Globe,
  HelpCircle,
  Key,
  Layers,
  Lock,
  Phone,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Agent Onboarding: Why D3 Is the Weakest Dimension Across 500 Businesses | AgentHermes',
  description:
    'D3 Onboarding is the universally weakest dimension in our 500-business scan. Can an AI agent sign up, get credentials, and start calling your API without a human in the loop? For 95% of businesses, the answer is no. Here is why D3 matters and how to fix it.',
  keywords: [
    'agent onboarding dimension',
    'AI agent onboarding',
    'self-service API keys',
    'agent readiness D3',
    'automated provisioning',
    'agent economy onboarding',
    'API key self-service',
    'developer onboarding AI',
    'agent signup flow',
  ],
  openGraph: {
    title: 'Agent Onboarding: Why D3 Is the Weakest Dimension Across 500 Businesses',
    description:
      'D3 Onboarding is universally the weakest dimension. 95% of businesses require a human to grant API access. Here is why that kills agent adoption.',
    url: 'https://agenthermes.ai/blog/onboarding-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agent Onboarding: Why D3 Is the Weakest Dimension',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Onboarding: Why D3 Is the Weakest Dimension Across 500 Businesses',
    description:
      '"Contact sales" is a dead end for AI agents. D3 Onboarding is the weakest dimension across 500 businesses — and the biggest unlock for agent-driven revenue.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/onboarding-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const onboardingTiers = [
  {
    name: 'Human-Gated (Score: 0-10)',
    description: '"Contact sales," "Schedule a demo," or "Request access." An AI agent hits this wall and cannot proceed. There is no programmatic path to getting credentials. The agent must tell its user to handle onboarding manually, breaking the autonomous workflow.',
    examples: ['Enterprise SaaS: "Talk to Sales"', 'Local business: "Call us at (555) 123-4567"', 'Healthcare: "Submit a form and wait 3-5 business days"'],
    icon: Phone,
    color: 'red',
  },
  {
    name: 'Semi-Automated (Score: 20-50)',
    description: 'Self-service signup exists, but requires email verification, CAPTCHA, or multi-step forms that agents cannot complete autonomously. The agent can start the process but gets stuck on a verification step designed to block bots — which, from an agent perspective, is exactly what it is.',
    examples: ['Google Cloud: self-service but requires credit card + phone verify', 'Many SaaS: email confirmation loop', 'Freemium: signup works, but sandbox is hidden behind docs'],
    icon: Users,
    color: 'amber',
  },
  {
    name: 'Agent-Ready (Score: 70-100)',
    description: 'Fully programmatic credential provisioning. An agent can create an account, get API keys, and start making calls — all through API endpoints or OAuth flows with no human steps. Sandbox environments available immediately. Rate limits and billing are self-service.',
    examples: ['Stripe: instant test keys on signup, no approval needed', 'Resend: API key on dashboard, sandbox by default', 'Supabase: project creation via API, keys returned programmatically'],
    icon: Key,
    color: 'emerald',
  },
]

const d3Checks = [
  { check: 'Self-service signup available', weight: 'Critical', impact: 'Can an agent create an account without human intervention? "Contact sales" = 0 points.' },
  { check: 'API key generation', weight: 'High', impact: 'Can the agent obtain credentials programmatically after signup? Dashboard-only = partial credit.' },
  { check: 'Sandbox or test environment', weight: 'High', impact: 'Can the agent test integrations without affecting production data or incurring charges?' },
  { check: 'Documentation auto-discoverable', weight: 'Medium', impact: 'Are getting-started docs linked from the API response or discoverable via standard paths?' },
  { check: 'No CAPTCHA on critical paths', weight: 'High', impact: 'CAPTCHA on signup or key generation blocks agents entirely. Alternatives: rate limiting, email-based.' },
  { check: 'Automated provisioning API', weight: 'Medium', impact: 'Can the agent provision resources (projects, environments, namespaces) via API calls?' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is D3 Onboarding in the Agent Readiness Score?',
    answer:
      'D3 Onboarding is one of 9 dimensions in the Agent Readiness Score, carrying a weight of 0.08 (8%). It measures whether an AI agent can sign up for your service, obtain credentials, and start making API calls without any human intervention. It is the weakest dimension across all 500 businesses we have scanned — most businesses score 0-10 on D3 because they require human interaction to grant access.',
  },
  {
    question: 'Why is D3 the weakest dimension?',
    answer:
      'D3 is the weakest because onboarding flows were designed for humans, not agents. CAPTCHAs block automated signup. Email verification loops require inbox access. "Contact sales" gates require scheduling a call. Credit card requirements add friction. Phone verification stops agents cold. Every one of these is a reasonable security measure for human users — but they create an impenetrable wall for AI agents trying to onboard autonomously.',
  },
  {
    question: 'What does agent-ready onboarding look like?',
    answer:
      'Agent-ready onboarding means: (1) API-based account creation with no CAPTCHA, (2) programmatic API key generation that returns the key in the response, (3) a sandbox environment available by default (not behind a sales call), (4) self-service billing setup via API (not a manual invoice process), and (5) getting-started documentation linked from the signup response. Stripe is the gold standard — an agent can go from zero to making test API calls in under 60 seconds.',
  },
  {
    question: 'Why does D3 only carry 8% weight if it is so important?',
    answer:
      'D3 carries 8% weight because it is a one-time hurdle, not an ongoing interaction quality metric. Once an agent has credentials, D3 does not matter anymore — D2 (API), D7 (Security), and D8 (Reliability) take over. But D3 is a binary gate: if onboarding is impossible, the agent never gets to use anything else. That is why we describe D3 as "low weight, high consequence." A business can score 80+ on every other dimension and still be completely unusable if D3 is zero.',
  },
  {
    question: 'How do I improve D3 without removing all security?',
    answer:
      'You do not need to remove security. The best approach is to separate human onboarding from agent onboarding. Offer an OAuth 2.0 client credentials flow for machine-to-machine access. Use rate limiting instead of CAPTCHA. Provide sandbox environments that do not require billing. Issue scoped API keys with limited permissions by default. Companies like Stripe, Twilio, and SendGrid all have excellent security AND perfect agent onboarding — they prove the two are not in conflict.',
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

export default function OnboardingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agent Onboarding: Why D3 Is the Weakest Dimension Across 500 Businesses',
    description:
      'D3 Onboarding is universally the weakest dimension in the Agent Readiness Score. Can an AI agent sign up, get credentials, and start calling your API without human help? For 95% of businesses, no.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/onboarding-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1850,
    keywords:
      'agent onboarding dimension, AI agent onboarding, self-service API keys, agent readiness D3, automated provisioning',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent Onboarding',
          item: 'https://agenthermes.ai/blog/onboarding-agent-readiness',
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
      title="Agent Onboarding: Why D3 Is the Weakest Dimension Across 500 Businesses"
      shareUrl="https://agenthermes.ai/blog/onboarding-agent-readiness"
      currentHref="/blog/onboarding-agent-readiness"
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
            <span className="text-zinc-400">Agent Onboarding</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <UserPlus className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Weakest Dimension
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Agent Onboarding:{' '}
            <span className="text-emerald-400">Why D3 Is the Weakest Dimension</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            &ldquo;Contact sales to get started.&rdquo; For an AI agent, that sentence is a brick wall.
            No phone to call. No calendar to book. No way forward. D3 Onboarding measures whether
            an agent can go from <strong className="text-zinc-100">zero to first API call</strong> without
            a human in the loop — and across 500 businesses, it is the dimension with the lowest average
            score.
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

      {/* ===== THE WALL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            The Onboarding Wall: Where 95% of Agent Journeys Die
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The{' '}
              <Link href="/blog/agent-journey-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                6-step agent journey
              </Link>{' '}
              goes: Find, Understand, Sign Up, Connect, Use, Pay. Most conversations about agent
              readiness focus on Find (discovery) and Use (API quality). But the data tells a
              different story. The biggest single point of failure is step 3 — Sign Up.
            </p>
            <p>
              Of the 500 businesses we scanned, approximately 95% have no programmatic path from
              &ldquo;I want to use this service&rdquo; to &ldquo;I have credentials and can make
              API calls.&rdquo; The onboarding flow was designed for humans clicking through a
              website, filling in forms, confirming emails, and sometimes waiting for manual approval.
              For an AI agent operating autonomously, every one of those steps is a dead end.
            </p>
            <p>
              This makes D3 unique among the 9 dimensions: it is a <strong className="text-zinc-100">binary
              gate</strong>. A business can score perfectly on API quality, security, reliability,
              and data quality — but if an agent cannot get through the front door, none of it
              matters. D3 zero means total agent inaccessibility, regardless of everything else.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '8%', label: 'D3 weight in score', icon: BarChart3 },
              { value: '~95%', label: 'require human onboarding', icon: Phone },
              { value: 'ARL-3', label: 'revenue inflection level', icon: DollarSign },
              { value: '0-10', label: 'avg D3 score across 500', icon: AlertTriangle },
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

      {/* ===== THREE TIERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Three Tiers of Agent Onboarding
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We classify onboarding into three tiers based on how much an agent can accomplish
              without human help. The vast majority of businesses sit in Tier 1 — fully human-gated.
              The small percentage that reach Tier 3 are almost exclusively developer-tool companies.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {onboardingTiers.map((tier) => {
              const colors = getColorClasses(tier.color)
              return (
                <div
                  key={tier.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <tier.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{tier.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{tier.description}</p>
                  <div className="space-y-1">
                    {tier.examples.map((ex) => (
                      <div key={ex} className="flex items-center gap-2 text-xs text-zinc-500">
                        <CheckCircle2 className={`h-3 w-3 ${colors.text} shrink-0`} />
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT D3 MEASURES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            What D3 Onboarding Actually Checks
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The AgentHermes scanner evaluates six aspects of onboarding accessibility. Each
            contributes to the D3 sub-score, which carries a 0.08 weight in the overall Agent
            Readiness Score.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Check</div>
              <div>Weight</div>
              <div>Why It Matters</div>
            </div>
            {d3Checks.map((row, i) => (
              <div
                key={row.check}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.check}</div>
                <div className={row.weight === 'Critical' ? 'text-red-400' : row.weight === 'High' ? 'text-emerald-400' : 'text-amber-400'}>{row.weight}</div>
                <div className="text-zinc-500">{row.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARL-3 INFLECTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            ARL-3: The Revenue Inflection Point
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The{' '}
              <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Levels
              </Link>{' '}
              run from ARL-0 (Dark) to ARL-6 (Interoperable). ARL-3 is specifically called the
              &ldquo;revenue inflection point&rdquo; because it is the first level where an agent can
              complete a transaction end to end. And getting to ARL-3 requires solving D3.
            </p>
            <p>
              At ARL-2, an agent can find you and understand what you offer. At ARL-3, the agent
              can also sign up, get credentials, and start making API calls. That is the difference
              between &ldquo;I found a plumber&rdquo; and &ldquo;I booked the plumber for 3 PM
              tomorrow.&rdquo; The revenue starts flowing at ARL-3.
            </p>
            <p>
              The irony is that D3 carries only 8% weight in the overall score — the second-lowest
              of all 9 dimensions. But its impact on business outcomes is disproportionate. A
              business at ARL-2 with a perfect 92 on every other dimension but zero on D3 is still
              useless to an autonomous agent. The agent cannot sign up. The journey ends at step 3.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-8">
            <p className="text-sm font-bold text-emerald-400 mb-2">The Stripe Model</p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Stripe is the benchmark for agent-ready onboarding. Signup takes seconds. Test API keys
              are available immediately — no approval, no sandbox request, no sales call. The test
              environment is fully functional. The agent can create customers, process test charges,
              and verify webhook integration before a single dollar changes hands. When the business
              is ready for production, the switch from test to live keys is a single configuration
              change. This is what D3 perfection looks like.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SALES IS A DEAD END ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            &ldquo;Contact Sales&rdquo; Is a Zero-Score Guarantee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Enterprise gating kills agent adoption',
                detail: 'The enterprise sales model assumes a human who will research, schedule a demo, negotiate pricing, and sign a contract. An AI agent operating on behalf of a user cannot do any of these steps. Every "contact sales" button is an agent journey that ends immediately.',
              },
              {
                title: 'CAPTCHAs are agent blockers',
                detail: 'CAPTCHA on signup forms exists to stop bots. AI agents are sophisticated bots. The security measure designed to stop automated access stops the exact thing you want to encourage. Rate limiting achieves the same security goal without blocking agents.',
              },
              {
                title: 'Email verification creates latency',
                detail: 'Even when signup is self-service, email confirmation loops add 30 seconds to minutes of latency. An agent acting on behalf of a user in real-time cannot wait for an email, click a link, and return to the signup flow. Instant API key generation removes this friction entirely.',
              },
              {
                title: 'Manual approval is a bottleneck',
                detail: '"Your account is pending review" means the agent waits hours or days before it can proceed. In the agent economy, latency of minutes loses the interaction. An agent finding your competitor who gives instant access will route there instead — permanently.',
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

      {/* ===== HOW TO FIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            How to Fix D3 Without Removing Security
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Agent-ready onboarding does not mean open access. It means separating
            machine-to-machine flows from human flows. Four steps, ordered by impact.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Offer OAuth 2.0 client credentials flow',
                detail: 'The client credentials grant is designed for machine-to-machine authentication. An agent registers as a client, gets a client_id and client_secret, and exchanges them for an access token. No browser redirects, no user consent screens, no CAPTCHAs. This is the standard for agent onboarding.',
                icon: Key,
              },
              {
                step: '2',
                title: 'Provide a sandbox by default',
                detail: 'Every new account should get a sandbox environment immediately. No billing required. No approval needed. The sandbox lets agents test integration before committing to production. Stripe does this: every account starts in test mode with test API keys that work instantly.',
                icon: Bot,
              },
              {
                step: '3',
                title: 'Replace CAPTCHA with rate limiting on agent paths',
                detail: 'Keep CAPTCHA on your human signup form. But create a separate /api/v1/register endpoint for programmatic onboarding that uses rate limiting (e.g., 5 signups per IP per hour) instead of CAPTCHA. This blocks abuse while letting legitimate agents through.',
                icon: Zap,
              },
              {
                step: '4',
                title: 'Return credentials in the signup response',
                detail: 'When an agent completes programmatic signup, the response should include API keys or a token directly. Do not require a separate "go to dashboard, click Settings, find your API key" flow. The response body from account creation should contain everything the agent needs to make its first API call.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The key insight is that agent onboarding and human onboarding can coexist. Keep your
              marketing-driven signup flow with its demo requests and sales calls. But add a
              parallel machine-to-machine path for agents. The businesses that do this first in
              each vertical will capture agent-driven demand while competitors are still routing
              agents to &ldquo;Schedule a Demo&rdquo; buttons.
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
                title: 'ARL Levels Explained: From Dark to Interoperable',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'The 6-Step Agent Journey Every Business Should Know',
                href: '/blog/agent-journey-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
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
            Can agents onboard to your business?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness audit to see your D3 Onboarding score and find out
            if AI agents can get through your front door — or if they hit &ldquo;Contact Sales&rdquo;
            and leave.
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
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See All Dimensions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
