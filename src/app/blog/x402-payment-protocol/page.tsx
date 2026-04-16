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
  Coins,
  CreditCard,
  DollarSign,
  FileCode,
  HelpCircle,
  Layers,
  Lock,
  Receipt,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'x402: The Micropayment Protocol That Lets AI Agents Pay for Services | AgentHermes',
  description:
    'x402 is HTTP 402 Payment Required repurposed for the agent economy. Agents pay per-call, not per-subscription. Learn how x402 works, why it maps to ARL-4 Automated, and why AgentHermes scans for x402 support.',
  keywords: [
    'x402 protocol AI agents',
    'x402 micropayment',
    'HTTP 402 payment required',
    'agent economy payments',
    'AI agent pay per call',
    'machine-to-machine payments',
    'x402 stablecoin',
    'pay per API call',
    'agent payment protocol',
  ],
  openGraph: {
    title: 'x402: The Micropayment Protocol That Lets AI Agents Pay for Services',
    description:
      'x402 repurposes HTTP 402 for agent-native micropayments. Pay per-call, not per-subscription. Here is how it works and why it matters.',
    url: 'https://agenthermes.ai/blog/x402-payment-protocol',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'x402: The Micropayment Protocol for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'x402: The Micropayment Protocol That Lets AI Agents Pay for Services',
    description:
      'HTTP 402 Payment Required was reserved for 30 years. The agent economy finally unlocked it. Here is the x402 spec.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/x402-payment-protocol',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const flowSteps = [
  {
    step: '1',
    title: 'Agent calls paid endpoint',
    detail: 'The agent sends a normal HTTP request to an API that requires payment. No API key, no login, no billing setup — just a GET or POST to the resource.',
    icon: Bot,
    color: 'emerald',
  },
  {
    step: '2',
    title: 'Server returns 402 with payment instructions',
    detail: 'Instead of 401 Unauthorized or 403 Forbidden, the server returns HTTP 402 with a JSON body describing what the payment is, how much it costs, and where to send it (chain, token, address, memo).',
    icon: Receipt,
    color: 'blue',
  },
  {
    step: '3',
    title: 'Agent pays on-chain or off-chain',
    detail: 'Most x402 implementations use stablecoin rails (USDC on Base or Solana) for sub-second settlement and sub-cent fees. Some use signed off-chain tokens. The agent signs the payment with its own wallet.',
    icon: Coins,
    color: 'purple',
  },
  {
    step: '4',
    title: 'Agent retries with payment proof',
    detail: 'The agent re-sends the original request with an X-Payment header containing a signed receipt or transaction hash. The server verifies on-chain (or against its own receipt store) and serves the content.',
    icon: CheckCircle2,
    color: 'emerald',
  },
]

const vsSubscription = [
  { aspect: 'Pricing model', old: 'Monthly subscription with quotas', x402: 'Per-request micropayment' },
  { aspect: 'Signup', old: 'Create account, add card, wait for approval', x402: 'No signup — call endpoint, pay, get response' },
  { aspect: 'Who pays', old: 'Human on behalf of agent', x402: 'Agent pays from its own wallet' },
  { aspect: 'Minimum spend', old: '$20-50/month entry tier', x402: '$0.0001 per call is viable' },
  { aspect: 'Abandonment', old: 'Pay even when you do not use', x402: 'Pay only for calls you made' },
  { aspect: 'Time to first call', old: 'Minutes to days (human approval)', x402: 'Sub-second (agent-native)' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Is x402 an actual IETF standard?',
    answer:
      'HTTP 402 Payment Required has been reserved in the HTTP spec (RFC 7231) for decades but was never fully defined — there was no agreement on what a payment proof should look like. "x402" is the informal name for the new wave of payment-required implementations emerging in 2024-2026, most of them on stablecoin rails. It is becoming the de facto standard even before any single RFC wins.',
  },
  {
    question: 'Does x402 require crypto or a blockchain?',
    answer:
      'The dominant implementations do use stablecoins (USDC on Base, Solana, or Ethereum L2s) because they give you sub-second settlement, sub-cent fees, and no chargebacks. But the x402 response format itself is payment-rail agnostic. You can return 402 with Lightning invoice instructions, signed Stripe PaymentIntents, or a centralized prepaid-balance token. Chain-based just happens to be where the momentum is.',
  },
  {
    question: 'Why not just use Stripe metered billing instead?',
    answer:
      'Stripe metered billing assumes a known customer with a card on file — a human signed up, proved identity, attached a payment method, and got credentials the agent then uses. x402 is agent-native from the first request. There is no account, no signup flow, no human. The agent shows up, the server quotes a price, the agent pays. For autonomous agents discovering and using services on the fly, that is the only model that scales.',
  },
  {
    question: 'How does AgentHermes detect x402 support?',
    answer:
      'The AgentHermes scanner probes a sample of an endpoint\'s exposed surface and watches for 402 responses with structured payment instructions (chain, token, amount, address, expiration). We also parse OpenAPI specs for x402 extensions, agent-card.json files for payment capability declarations, and /.well-known/payment.json discovery files. Any of these contributes to D5 Payment and flags the business as moving toward ARL-4 Automated.',
  },
  {
    question: 'What does x402 support do for my Agent Readiness Score?',
    answer:
      'x402 hits three dimensions at once: D5 Payment (directly), D4 Pricing Transparency (the 402 response itself contains pricing), and D9 Agent Experience (it removes the signup dead-end that kills most agent journeys). Among the 500 businesses AgentHermes has scanned, zero support x402 today. The first ones to ship it will jump from Bronze to Silver purely on payment dimensions, and they unlock the path to ARL-4.',
  },
  {
    question: 'Where is x402 actually being used today?',
    answer:
      'Early adopters cluster around AI inference APIs, content APIs, and data APIs — categories where per-call makes obvious sense. Several inference providers let agents pay per-token in USDC instead of buying credits. A handful of content APIs return 402 for premium articles. Data providers are experimenting with pay-per-row. The pattern is any service where a subscription is overkill and a credit card flow is a conversion killer.',
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

export default function X402PaymentProtocolPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'x402: The Micropayment Protocol That Lets AI Agents Pay for Services',
    description:
      'x402 repurposes HTTP 402 Payment Required as the agent-native micropayment layer. Here is how it works, how AgentHermes detects it, and why it maps to ARL-4 Automated.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/x402-payment-protocol',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Protocols',
    wordCount: 1850,
    keywords:
      'x402 protocol AI agents, x402 micropayment, HTTP 402, agent economy payments, pay per call',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'x402 Payment Protocol',
          item: 'https://agenthermes.ai/blog/x402-payment-protocol',
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
      title="x402: The Micropayment Protocol That Lets AI Agents Pay for Services"
      shareUrl="https://agenthermes.ai/blog/x402-payment-protocol"
      currentHref="/blog/x402-payment-protocol"
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
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">x402 Payment Protocol</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Coins className="h-3.5 w-3.5" />
              Protocols
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Agent Economy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            x402: The Micropayment Protocol That Lets{' '}
            <span className="text-emerald-400">AI Agents Pay for Services</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            HTTP 402 Payment Required was reserved in the spec for 30 years and never used. The agent
            economy finally unlocked it. <strong className="text-zinc-100">x402</strong> is the emerging
            pattern for paying per-call, not per-subscription — and it is the last missing piece that
            lets autonomous agents pay for services without a human in the loop.
          </p>

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

      {/* ===== WHAT IS x402 ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <FileCode className="h-5 w-5 text-emerald-500" />
            What x402 Actually Is
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When the HTTP spec was written, the authors reserved status code{' '}
              <strong className="text-zinc-100">402 Payment Required</strong> for future use. They knew a
              payment flow belonged inside HTTP, but no consensus existed on how to express a payment
              instruction, what a receipt looked like, or which rail the money would travel on. So 402
              sat unused for 30+ years. Every paid API since has bolted billing onto the side — API keys
              tied to accounts tied to credit cards tied to monthly invoices.
            </p>
            <p>
              x402 is the pattern that finally fills in the blank. When an agent calls a paid endpoint,
              the server responds with HTTP 402 and a machine-readable payment instruction. The agent
              pays, retries the request with a proof of payment, and gets the content. No signup, no
              card on file, no account, no human approval. It is the first payment flow designed for
              callers that do not have a legal identity.
            </p>
            <p>
              The &ldquo;x&rdquo; in x402 is informal — it signals this is an extension layer on top of
              HTTP 402, not a new status code. Multiple implementations are converging on a similar
              response shape, most of them settling on{' '}
              <strong className="text-zinc-100">USDC on Base or Solana</strong> for the rail because
              sub-second finality and sub-cent fees make per-call pricing viable.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '402', label: 'HTTP status code', icon: Receipt },
              { value: '$0.0001', label: 'viable per-call price', icon: Coins },
              { value: '0/500', label: 'scanned businesses support it', icon: Target },
              { value: 'ARL-4', label: 'what x402 unlocks', icon: Zap },
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

      {/* ===== HOW IT WORKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            The Four-Step x402 Flow
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every x402 transaction follows the same shape: call, quote, pay, retry. The elegance is that
            no side of the transaction needs to know about the other in advance.
          </p>

          <div className="space-y-3 mb-8">
            {flowSteps.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.step}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border} ${colors.text} text-sm font-bold`}>
                    {item.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className={`h-4 w-4 ${colors.text}`} />
                      <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 mb-6">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Example 402 response body</div>
            <pre className="text-xs text-emerald-400 font-mono leading-relaxed overflow-x-auto">
{`HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "x402_version": "1",
  "accepts": [
    {
      "scheme": "exact",
      "network": "base",
      "asset": "USDC",
      "amount": "0.01",
      "pay_to": "0x9f8...a21",
      "resource": "/v1/inference/premium",
      "expires_in": 300,
      "description": "Premium inference call, 1 request"
    }
  ]
}`}
            </pre>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Notice what is not in that response: no account ID, no API key, no authorization header,
              no billing portal URL. The agent has everything it needs to pay and retry. This is what
              makes x402 <strong className="text-zinc-100">agent-native</strong> — the protocol assumes
              the caller is a piece of software with a wallet, not a person with a credit card.
            </p>
          </div>
        </div>
      </section>

      {/* ===== VS SUBSCRIPTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            x402 vs Traditional Subscription Billing
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The subscription model assumes a human customer with a stable relationship. The agent
            economy breaks every one of those assumptions — and x402 is the pricing shape that survives.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>Subscription billing</div>
              <div>x402 per-call</div>
            </div>
            {vsSubscription.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.old}</div>
                <div className="text-emerald-400">{row.x402}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The subscription model was invented for SaaS sold to humans. You buy a seat, you log in,
              you use the product, you cancel if you do not. None of that maps to an agent that needs to
              call your API once, now, and may never call it again. Forcing an agent through a human
              signup flow is the single biggest reason scanned businesses fail{' '}
              <Link href="/blog/pricing-transparency-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D4 Pricing Transparency
              </Link>
              . x402 is how you remove the friction without giving the service away.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY IT MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Why x402 Unlocks ARL-4 Automated
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In the{' '}
              <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Level framework
              </Link>
              , ARL-4 is Automated — the point where an agent can complete a full transaction end-to-end
              without a human intervening. Discovery, understanding, signup, usage, and{' '}
              <em className="text-zinc-200">payment</em> all have to work without human approval. Most
              businesses get stuck at ARL-2 or ARL-3 because payment still routes through a credit-card
              form that an agent cannot fill.
            </p>
            <p>
              x402 is the piece that lets payment match the autonomy of everything else. If your agent
              card is discoverable, your MCP server is callable, your auth issues tokens to programs,
              and your endpoints return 402 with real payment instructions — the full loop closes. An
              agent can walk up, discover you, understand you, pay you, and use you inside a single
              conversation turn.
            </p>
            <p>
              That is why <strong className="text-zinc-100">AgentHermes scans for x402 support</strong>{' '}
              and treats it as one of the strongest positive signals in the D5 Payment dimension.
              Businesses that ship x402 today will be the first in their category to pass the ARL-4
              bar. Across 500 businesses we have scanned, zero currently do.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The asymmetry:</strong> shipping x402 is a weekend
              project for a team that already has a payment rail. Being the first in your category to
              support agent-native payments is a moat that compounds. The businesses that move on this
              in 2026 will be charging agents while their competitors are still asking agents to &ldquo;contact
              sales.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ===== REAL EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Where x402 Is Showing Up First
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'AI inference APIs',
                detail: 'Token-priced inference where an agent pays USDC per million tokens. No credit-card signup, no minimum commit. Any agent can call and pay without first becoming a customer.',
              },
              {
                title: 'Content and data APIs',
                detail: 'Premium articles, datasets, and structured data behind 402. The server quotes per-record or per-query pricing. Paid content agents reliably pay for replaces paywalls no agent can cross.',
              },
              {
                title: 'Compute and specialty models',
                detail: 'Image generation, video rendering, code execution, transcription. Long-tail specialty models can be profitable at sub-cent prices when the payment step itself costs less than a cent.',
              },
              {
                title: 'Marketplace middleware',
                detail: 'Aggregator APIs that let agents query many backends through a single endpoint, with x402 billing at the edge. Each downstream call is a micropayment, each aggregator response is a micropayment.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              These four categories share a single property: the unit of work is small, well-defined,
              and repeatable. That is exactly the shape subscription billing handles worst and x402
              handles best. Expect the pattern to spread out from AI and data into anywhere else the
              same shape exists — weather APIs, geocoding, translation, moderation, search, anything
              with a clear per-call unit of value.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO IMPLEMENT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            Shipping x402 On Your Own API
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The minimum viable implementation takes one endpoint, one middleware layer, and one wallet
            address. You do not need to rewrite your billing system to start experimenting.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Pick a rail',
                detail: 'USDC on Base is the most common choice — cheap, fast, and widely supported by agent wallets. Solana is a close second. Lightning works if you do not want custody. The rail matters less than picking one and documenting it.',
              },
              {
                step: '2',
                title: 'Add 402 responses to one endpoint',
                detail: 'Pick the cheapest, highest-volume endpoint you have. When a request arrives without a valid X-Payment header, return 402 with the payment instruction JSON. Do not break existing clients — gate only new callers or callers that opt in via a header.',
              },
              {
                step: '3',
                title: 'Verify payment proofs on retry',
                detail: 'When the request comes back with X-Payment, verify the signature or on-chain transaction. Cache the receipt for a short window so retries and refunds are idempotent. Log every receipt.',
              },
              {
                step: '4',
                title: 'Declare it in discovery',
                detail: 'Add an entry to your /.well-known/agent-card.json capabilities array (or agent-hermes.json) declaring x402 support with the endpoint URL. AgentHermes scanners will pick this up automatically.',
              },
              {
                step: '5',
                title: 'Run a paid scan',
                detail: 'Scan your own domain at /audit after shipping. Watch the D5 Payment score climb. Publish your x402 receipt count on a public stats page for social proof.',
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

      {/* ===== RELATED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency',
                href: '/blog/pricing-transparency-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'ARL Levels Explained: From Dark to Interoperable',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
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
            See if your API is ready for x402
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your Agent Readiness Score in 60 seconds. We probe for x402 support, 402 response shapes,
            and payment discovery files — then show you exactly what it takes to reach ARL-4.
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
