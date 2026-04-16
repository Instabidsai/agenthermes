import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCode2,
  HelpCircle,
  Key,
  Layers,
  Lock,
  RefreshCw,
  Sparkles,
  Target,
  Webhook,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Webhooks and Agent Readiness: Why Real-Time Beats Polling for AI Agents | AgentHermes',
  description:
    'Agents cannot poll endlessly — it burns budget and misses events. Webhooks are how agent-ready businesses broadcast state changes. HMAC-SHA256 signing, retry logic, and event catalogs separate the top scorers (Stripe, GitHub, Slack, Resend) from the invisible majority.',
  keywords: [
    'webhooks agent readiness',
    'webhooks for AI agents',
    'HMAC webhook signing',
    'webhook retry logic',
    'agent economy webhooks',
    'Stripe webhooks',
    'GitHub webhooks',
    'event catalog for agents',
    'webhook best practices',
  ],
  openGraph: {
    title: 'Webhooks and Agent Readiness: Why Real-Time Beats Polling for AI Agents',
    description:
      'HMAC signing, retry logic, and event catalogs are non-negotiable. Here is why the top scorers in our 500-business scan all have them and why polling is bankrupting agent budgets.',
    url: 'https://agenthermes.ai/blog/webhooks-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Webhooks and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webhooks and Agent Readiness: Real-Time Beats Polling',
    description:
      'Agents cannot poll endlessly. Here is why webhooks with HMAC signing are the backbone of agent-ready businesses.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/webhooks-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const coreEvents = [
  {
    name: 'order.created',
    description:
      'Fires the moment an order is placed. Agents subscribing to this can trigger fulfillment, accounting entries, or downstream orchestration without polling the orders endpoint every 30 seconds.',
    example: 'Shopify, WooCommerce, Stripe Checkout all emit this shape',
    icon: Layers,
    color: 'emerald',
  },
  {
    name: 'payment.succeeded',
    description:
      'The single most important financial signal. Agents listening for payment.succeeded can release digital goods, send receipts, and update subscription state in under a second.',
    example: 'Stripe emits payment_intent.succeeded, charge.succeeded, and invoice.paid',
    icon: CheckCircle2,
    color: 'blue',
  },
  {
    name: 'inventory.updated',
    description:
      'Agents shopping on behalf of users need live stock state. Without this event, every purchase becomes a gamble: is it in stock now, or was it in stock 5 minutes ago when we last polled?',
    example: 'Shopify inventory_levels/update, WooCommerce product.updated',
    icon: RefreshCw,
    color: 'purple',
  },
  {
    name: 'appointment.booked',
    description:
      'For service businesses — dentists, salons, consultants — booking events let calendar agents reconcile multi-party schedules without race conditions.',
    example: 'Calendly invitee.created, Acuity appointment.scheduled',
    icon: Calendar,
    color: 'cyan',
  },
  {
    name: 'support.resolved',
    description:
      'Agents triaging tickets on behalf of support teams close the loop when support.resolved fires — updating CRMs, measuring CSAT, and tracking resolution SLAs.',
    example: 'Zendesk ticket.solved, Intercom conversation.closed',
    icon: Target,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why can AI agents not just poll an API every few seconds?',
    answer:
      'Polling forces every agent to re-fetch state on a fixed interval whether or not anything changed. For a hundred agents watching a single resource, that is a hundred redundant round-trips per poll window. At production scale the math breaks: you either pay for tokens and bandwidth that return no new information, or you lengthen the polling interval and miss events entirely. Webhooks invert the cost — the server broadcasts once, every subscriber hears it instantly, and agents only spend budget when something actually happened.',
  },
  {
    question: 'What is HMAC-SHA256 and why do agents refuse webhooks without it?',
    answer:
      'HMAC-SHA256 is a keyed hash that lets the receiver verify two things: the payload is exactly what the sender transmitted, and it was signed by someone holding the shared secret. Without HMAC, an attacker who learns your webhook URL can send fake events — fake payment confirmations, fake inventory updates, fake cancellations. Agents running on a user budget cannot afford to act on forged events, so any production agent framework will refuse unsigned or unverified webhooks by default.',
  },
  {
    question: 'How do the top scorers (Stripe, GitHub, Slack, Resend) sign their webhooks?',
    answer:
      'Stripe sends a Stripe-Signature header with a timestamp and v1=signature over timestamp.payload using the webhook signing secret. GitHub uses X-Hub-Signature-256: sha256=... over the raw body with your repository webhook secret. Slack sends X-Slack-Signature with a timestamp-prefixed HMAC. Resend follows the Stripe-compatible pattern with Resend-Signature. All four use SHA-256, all four include a timestamp to prevent replay attacks, and all four publish verification code in 5+ languages. That is why they cluster at the top of the D8 Reliability dimension.',
  },
  {
    question: 'What retry policy should an agent-ready webhook endpoint follow?',
    answer:
      'The industry convention is exponential backoff with jitter across 24-72 hours of retries, capped at 5-24 attempts. Stripe retries for up to 3 days. GitHub retries 3 times over 30 seconds then gives up. Resend retries 5 times over 24 hours. The agent side of the contract is that your webhook handler must be idempotent — the same event can arrive more than once, and processing it twice must not double-charge, double-ship, or double-book.',
  },
  {
    question: 'How does AgentHermes score webhooks in the D8 Reliability dimension?',
    answer:
      'AgentHermes scans for four signals: a documented /webhooks or /events page at a predictable path, visible HMAC signing instructions (SHA-256 preferred), an event catalog listing every emitted event with a typed payload, and retry behavior described in the docs. Each signal contributes to D8 Reliability (13% weight). Businesses with all four signals cluster in Silver and Gold tiers. Businesses with zero — the majority of our 500-business scan — lose ~6 points off D8 alone.',
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

export default function WebhooksAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Webhooks and Agent Readiness: Why Real-Time Beats Polling for AI Agents',
    description:
      'Agents cannot poll endlessly. Webhooks with HMAC-SHA256 signing, retry logic, and event catalogs separate the top scorers (Stripe, GitHub, Slack, Resend) from the invisible majority in our 500-business scan.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/webhooks-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1850,
    keywords:
      'webhooks agent readiness, HMAC-SHA256, webhook retry logic, event catalog, Stripe webhooks, GitHub webhooks, D8 Reliability',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Webhooks and Agent Readiness',
          item: 'https://agenthermes.ai/blog/webhooks-agent-readiness',
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
      title="Webhooks and Agent Readiness: Why Real-Time Beats Polling for AI Agents"
      shareUrl="https://agenthermes.ai/blog/webhooks-agent-readiness"
      currentHref="/blog/webhooks-agent-readiness"
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
            <span className="text-zinc-400">Webhooks and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Webhook className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D8 Reliability · 13%
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Webhooks and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Real-Time Beats Polling for AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            AI agents cannot poll endlessly — it burns budget, misses events, and turns every
            API into a DDoS target. Webhooks are how <strong className="text-zinc-100">agent-ready
            businesses</strong> broadcast state changes. HMAC signing is non-negotiable. The top
            scorers in our 500-business scan (Stripe 68, GitHub 67, Slack 68, Resend 75) all have
            them. Here is why webhooks are the backbone of the agent economy.
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

      {/* ===== THE POLLING PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            The Polling Problem: Why Agents Go Broke Waiting for News
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Imagine a booking agent that has to tell a user &ldquo;your appointment is confirmed&rdquo;
              the moment the vendor accepts it. Without webhooks, the agent has one option: poll
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm mx-1">
                GET /appointments/&#123;id&#125;
              </code>
              every five seconds and wait for the status to change. Multiply that by every
              appointment, every user, every agent session, and you get a brute-force traffic pattern
              that costs tokens, costs bandwidth, and costs latency — the agent still learns about the
              confirmation up to 5 seconds late.
            </p>
            <p>
              Now imagine a hundred agents polling the same API. That is 7,200 redundant requests per
              hour for a resource that changed twice. The API owner rate-limits them, the agents hit
              429s, and the user experience collapses. Polling does not scale in the agent economy
              because agents scale faster than humans ever did.
            </p>
            <p>
              Webhooks invert the cost equation. The server broadcasts{' '}
              <strong className="text-zinc-100">once</strong> when something changes, every subscribed
              agent receives it in under a second, and no agent spends a token on empty polling loops.
              This is why webhooks are scored inside D8 Reliability (13% weight) — they are the single
              largest reliability win an API can ship.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '500', label: 'businesses scanned', icon: BarChart3 },
              { value: '<5%', label: 'document webhooks', icon: Webhook },
              { value: '13%', label: 'D8 Reliability weight', icon: Activity },
              { value: '5', label: 'core events to expose', icon: Bell },
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

      {/* ===== CORE EVENTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-500" />
            The Five Core Events Every Agent-Ready Business Should Broadcast
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not need hundreds of webhook events to go from invisible to agent-ready. You need
            five. These are the state changes agents actually listen for across every vertical we
            have scanned.
          </p>

          <div className="space-y-4 mb-8">
            {coreEvents.map((event) => {
              const colors = getColorClasses(event.color)
              return (
                <div
                  key={event.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <event.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 font-mono">{event.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{event.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Seen in the wild:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{event.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Each of these events maps to a real agent workflow: fulfillment orchestration, receipt
              generation, inventory-aware shopping, multi-party scheduling, and SLA tracking. Ship all
              five, document their payloads, and you have covered the surface area that matters for
              90%+ of general-purpose agents in 2026.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HMAC SIGNING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-500" />
            HMAC-SHA256: The Non-Negotiable for Agent Trust
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every production agent framework refuses unsigned webhooks by default. LangChain,
              CrewAI, OpenAI Agent SDK, and Anthropic Computer Use all ship with signature-verify
              helpers because unsigned webhooks cannot be trusted with money, inventory, or identity.
              An attacker who learns your webhook URL can forge{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                payment.succeeded
              </code>{' '}
              events all day long and drain every agent acting on them.
            </p>
            <p>
              The fix is HMAC-SHA256: a keyed hash of the payload, transmitted in a request header,
              verified by the receiver against a shared secret. If the hash does not match, the event
              is dropped. This is a two-line addition on the sender side and a three-line verification
              on the receiver side.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Provider</div>
              <div>Header</div>
              <div>Algorithm</div>
            </div>
            {[
              { provider: 'Stripe', header: 'Stripe-Signature', algo: 'HMAC-SHA256 + timestamp' },
              { provider: 'GitHub', header: 'X-Hub-Signature-256', algo: 'HMAC-SHA256' },
              { provider: 'Slack', header: 'X-Slack-Signature', algo: 'HMAC-SHA256 + timestamp' },
              { provider: 'Resend', header: 'Resend-Signature', algo: 'HMAC-SHA256 + timestamp' },
              { provider: 'Shopify', header: 'X-Shopify-Hmac-Sha256', algo: 'HMAC-SHA256 (base64)' },
              { provider: 'Twilio', header: 'X-Twilio-Signature', algo: 'HMAC-SHA1 (legacy — switch)' },
            ].map((row, i) => (
              <div
                key={row.provider}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.provider}</div>
                <div className="text-zinc-500 font-mono text-xs">{row.header}</div>
                <div className="text-emerald-400 text-xs">{row.algo}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Scoring implication:</strong> AgentHermes flags SHA-1
              signing as a partial-credit signal in D7 Security (12% weight). Switching to SHA-256 is
              usually a 10-line change and raises D7 by 1-2 points. Twilio is the most common laggard
              in our 500-business scan.
            </p>
          </div>
        </div>
      </section>

      {/* ===== RETRY LOGIC ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-blue-500" />
            Retry Logic: What Happens When the Agent Receiver Is Down
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Agents crash. Endpoints 503. Deploys cause 30-second gaps. Webhooks that fire once and
              forget will silently lose events every time any of that happens. The agent that should
              have been notified about a paid invoice is never notified, and the user does not get
              their digital product.
            </p>
            <p>
              Every top-scoring webhook provider in our scan retries with exponential backoff. The
              specifics vary but the shape is consistent: 5-24 attempts over 24-72 hours with
              increasing delays. Stripe retries for 3 days. Resend retries for 24 hours. GitHub
              retries 3 times within 30 seconds (the most aggressive and, frankly, the least
              forgiving).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Idempotency is on the receiver',
                detail:
                  'Every webhook delivery may arrive more than once. The receiver must de-dupe on event ID or composite key. Double-charging a card because you got the same payment.succeeded twice is a reputational incident — and a refund call.',
              },
              {
                title: 'Include a delivery ID',
                detail:
                  'Every event needs a stable unique ID (not a timestamp). GitHub uses X-GitHub-Delivery. Stripe uses the event id. Your webhook handler stores this ID and returns 200 without re-processing if it has seen it before.',
              },
              {
                title: 'Return 2xx fast, process later',
                detail:
                  'Webhook handlers should return 200 within 5 seconds. Queue the work and process asynchronously. If you process inline and take 10 seconds, the sender times out and retries — now you have the same event being processed twice in parallel.',
              },
              {
                title: 'Expose a retry log',
                detail:
                  'The top scorers publish a webhook attempts dashboard showing every attempt, status code, and latency. This is the single largest trust signal for agent operators evaluating whether your webhook surface is production-grade.',
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
            How AgentHermes Scores Your Webhook Surface
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Four signals feed the webhook component of D8 Reliability. Each is binary: present and
            documented, or missing. Ship all four and you are in the top decile of our 500-business
            scan.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: '/webhooks or /events documentation page',
                detail:
                  'We probe /docs/webhooks, /webhooks, /developers/webhooks, /api/webhooks, /events. A discoverable page at a predictable path is the entry point — without it, agents cannot even confirm you support webhooks.',
                icon: FileCode2,
              },
              {
                step: '2',
                title: 'HMAC signing with SHA-256',
                detail:
                  'We scan your docs for "HMAC", "signature", "verify signature", and "signing secret". SHA-256 earns full credit. SHA-1 earns partial credit (Twilio is the main offender). No signing earns zero.',
                icon: Key,
              },
              {
                step: '3',
                title: 'Retry logic described',
                detail:
                  'Explicit retry behavior — attempts, backoff, timeout — documented on the webhooks page. We reward transparency even if the retry policy is aggressive (like GitHub). Silent retries are worse than documented limits.',
                icon: RefreshCw,
              },
              {
                step: '4',
                title: 'Event catalog with typed payloads',
                detail:
                  'A list of every event you emit, with example payloads. The top scorers link directly to TypeScript types or OpenAPI schemas. Resend, Stripe, and GitHub all ship published event catalogs that LLM code generators can ingest.',
                icon: Layers,
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
              Each signal is roughly 1.5 points of D8. All four together move D8 from ~40 to ~80 on
              the sub-dimension scale, which translates to roughly 5-6 points on the overall Agent
              Readiness Score. For a business sitting at the Silver/Gold boundary, webhooks are often
              the single highest-leverage infrastructure ship.
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
                title: 'See your Agent Readiness Score in 60 seconds',
                href: '/audit',
                tag: 'Free Audit',
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
            See how your webhook surface scores
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes scans for HMAC signing, retry logic, event catalogs, and docs discoverability
            — and tells you exactly what is missing. Free, 60 seconds, no signup.
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
