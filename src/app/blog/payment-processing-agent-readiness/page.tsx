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
  CreditCard,
  DollarSign,
  HelpCircle,
  Link2,
  Lock,
  Receipt,
  RefreshCcw,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Payment Processing and Agent Readiness: The D5 Dimension (8% Weight) | AgentHermes',
  description:
    'D5 Payment Processing carries an 8% weight in the Agent Readiness Score. Can an AI agent complete a purchase end-to-end? Most businesses fail on hosted checkout redirects. Here is what agent-ready payments look like — Payment Element, structured webhooks, refund endpoints, and x402.',
  keywords: [
    'payment processing agent readiness',
    'D5 payment readiness',
    'agent checkout API',
    'Stripe agent readiness',
    'headless checkout for AI agents',
    'x402 payment protocol',
    'agent ready payments',
    'structured payment API',
    'webhook payment confirmation',
  ],
  openGraph: {
    title: 'Payment Processing and Agent Readiness: The D5 Dimension (8% Weight)',
    description:
      'Can an AI agent buy from you end-to-end? Most sites redirect to hosted checkout and lock agents out. Here is what agent-ready payments look like.',
    url: 'https://agenthermes.ai/blog/payment-processing-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Payment Processing and Agent Readiness: The D5 Dimension',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payment Processing and Agent Readiness: The D5 Dimension (8% Weight)',
    description:
      'D5 = 8% of your score. Hosted checkout redirects kill agent conversion. Payment Element, webhooks, refund endpoints, and x402 are the agent-ready path.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/payment-processing-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const d5Signals = [
  {
    name: 'Headless Checkout API',
    description: 'An agent can create a charge, attach a payment method, and confirm — all through structured API calls. No browser redirect required.',
    example: 'POST /v1/payment_intents { amount, currency, payment_method, confirm: true }',
    icon: Code2,
    color: 'emerald',
  },
  {
    name: 'Webhook Confirmation',
    description: 'Payment success, failure, and refund events fire to a subscribed webhook with signed payloads. Agents can verify state without polling a UI.',
    example: 'payment_intent.succeeded, charge.refunded, invoice.paid',
    icon: Zap,
    color: 'blue',
  },
  {
    name: 'Refund Endpoint',
    description: 'A documented API to reverse a charge. Agents handling returns and disputes need a path that is not "call our support line".',
    example: 'POST /v1/refunds { payment_intent, amount, reason }',
    icon: RefreshCcw,
    color: 'amber',
  },
  {
    name: 'Structured Receipt JSON',
    description: 'After a charge, the agent gets a machine-readable receipt with line items, taxes, totals, and IDs — not an HTML email to a mailbox.',
    example: '{ id, amount, currency, line_items[], tax, receipt_url }',
    icon: Receipt,
    color: 'purple',
  },
  {
    name: 'SetupIntent for Saved Methods',
    description: 'Agents representing a returning user need to attach a saved payment method and reuse it across sessions without re-entering card data.',
    example: 'POST /v1/setup_intents → confirm → attach to customer',
    icon: Lock,
    color: 'cyan',
  },
  {
    name: 'x402 Protocol Acceptance',
    description: 'HTTP 402 Payment Required finally in production. The agent hits a paywalled endpoint, gets back payment instructions, settles in USDC, retries. No signup, no card form.',
    example: 'HTTP 402 → { accepts: [{ scheme, network, amount }] } → X-PAYMENT header → 200',
    icon: DollarSign,
    color: 'emerald',
  },
]

const failureVsReady = [
  {
    aspect: 'Checkout flow',
    fail: 'Redirect to hosted checkout page with human-only form fields',
    ready: 'Payment Element in API response OR direct POST /payment_intents',
  },
  {
    aspect: 'Payment state',
    fail: 'No way to query status — user refreshes until they see "Thanks"',
    ready: 'GET /payment_intents/{id} returns { status, amount_received }',
  },
  {
    aspect: 'Success confirmation',
    fail: 'HTML email sent to a human mailbox, no machine signal',
    ready: 'Webhook fires payment_intent.succeeded with signed payload',
  },
  {
    aspect: 'Saved payment methods',
    fail: 'Cookie-scoped session tied to a specific browser',
    ready: 'SetupIntent + customer object, reusable across agent sessions',
  },
  {
    aspect: 'Refunds',
    fail: '"Call customer service between 9–5 ET"',
    ready: 'POST /refunds with payment_intent_id and reason',
  },
  {
    aspect: 'Micropayments',
    fail: '$0.50 minimum charge, $0.30 + 2.9% fee floor',
    ready: 'x402 USDC settlement, sub-cent charges possible',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is D5 only 8% of the score when payment matters so much?',
    answer:
      'Payment readiness is high-leverage but it is the last step in the agent journey. If D1 Discoverability, D2 API Quality, and D3 Onboarding fail, the agent never reaches payment. The weighting reflects the funnel: 15% for API Quality (the foundation), 13% for Reliability, 12% each for Discoverability and Security. D5 at 8% still carries real weight — on a 70/100 site, a full D5 failure is a 5-6 point hit that is often the difference between Silver and Bronze.',
  },
  {
    question: 'Does Stripe Checkout count as agent-ready?',
    answer:
      'Partially. Stripe Checkout is a hosted redirect — great for humans, challenging for agents. The agent-ready equivalent from Stripe is the Payment Element embedded in the page, or direct use of the Payment Intents API. Stripe scored 68 partly because their API-first primitives (Payment Intents, SetupIntents, webhooks, refund API) are the gold standard. Merchants that use Checkout as their only path lose most of that D5 advantage.',
  },
  {
    question: 'Can a PayPal button on a contact form pass D5?',
    answer:
      'No. That pattern fails every D5 signal. PayPal buttons trigger a popup or redirect flow that requires human interaction. There is no API the agent can call to trigger the charge, no webhook to confirm success to the agent, no refund endpoint, no structured receipt. It scores near zero on D5 regardless of whether money eventually changes hands.',
  },
  {
    question: 'What is x402 and do I need it today?',
    answer:
      'x402 is a protocol that finally uses HTTP status code 402 Payment Required. An agent calls a paywalled endpoint, the server responds with 402 and payment instructions, the agent settles (usually in USDC on Base), and retries with an X-PAYMENT header. You do not need it today to score well on D5 — traditional Payment Intents + webhooks score full credit. But x402 is the ARL-4 path for per-call monetization and is worth understanding before a competitor ships it first.',
  },
  {
    question: 'How do I test whether my payment flow is agent-accessible?',
    answer:
      'Open a terminal with only curl. If you can create a charge, attach a payment method, confirm it, and receive the success signal entirely through curl commands — no browser, no click — you pass D5. If any step requires a browser redirect, form submission, or human UI interaction, that step is where agents fall off. AgentHermes runs this test programmatically in every scan.',
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

export default function PaymentProcessingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Payment Processing and Agent Readiness: The D5 Dimension (8% Weight)',
    description:
      'D5 Payment Processing = 8% of the Agent Readiness Score. What AgentHermes checks, why hosted checkout fails agents, and the fastest path from PayPal button to agent-ready payments.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/payment-processing-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1850,
    keywords:
      'payment processing agent readiness, D5 payment readiness, Stripe agent readiness, agent checkout API, x402 payment protocol',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Payment Processing and Agent Readiness',
          item: 'https://agenthermes.ai/blog/payment-processing-agent-readiness',
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
      title="Payment Processing and Agent Readiness: The D5 Dimension (8% Weight)"
      shareUrl="https://agenthermes.ai/blog/payment-processing-agent-readiness"
      currentHref="/blog/payment-processing-agent-readiness"
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
            <span className="text-zinc-400">Payment Processing Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <CreditCard className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D5 = 8% Weight
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Payment Processing and Agent Readiness:{' '}
            <span className="text-emerald-400">The D5 Dimension</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Of the 9 Agent Readiness dimensions, <strong className="text-zinc-100">D5 Payment Processing</strong> is
            where most businesses quietly lose 5–8 points. The question is brutally simple:{' '}
            <em>can an AI agent complete a purchase end-to-end without a human clicking anything?</em>{' '}
            For 94% of the 500 businesses AgentHermes has scanned, the answer is no.
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

      {/* ===== WHAT D5 MEASURES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            What D5 Actually Measures
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              D5 Payment Processing carries a <strong className="text-zinc-100">0.08 weight</strong> in the
              v4 Agent Readiness scoring model. It sits in Tier 3 along with the Agent-Native Bonus,
              because payment is the last step in the 6-step agent journey — Find, Understand, Sign Up,
              Connect, Use, and finally Pay.
            </p>
            <p>
              Weight is not the same as importance. If an agent cannot pay you, none of the other 92
              points matter for the business outcome. D5 is the conversion dimension. The previous
              dimensions qualify the lead. D5 is where revenue happens.
            </p>
            <p>
              The scan asks one core question with six sub-signals underneath it:{' '}
              <strong className="text-zinc-100">when an agent wants to buy from you, is there a
              structured API path from intent to confirmed payment?</strong> No browser redirects. No
              checkout forms hosted on stripe.com or paypal.com that require human input. No email
              confirmations that only reach a mailbox.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '8%', label: 'D5 weight in v4 scoring', icon: BarChart3 },
              { value: '6%', label: 'of 500 pass D5 fully', icon: CheckCircle2 },
              { value: '68', label: 'Stripe D5 score (100)', icon: ShoppingCart },
              { value: '$0', label: 'cost to add webhooks', icon: DollarSign },
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

      {/* ===== SIX SIGNALS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            The Six Signals AgentHermes Scans For
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Each signal is worth roughly 1.0–1.5 points out of the 8 available. A business that passes
            all six hits the D5 ceiling. A business that passes none caps at roughly 1 point from basic
            TLS-protected POST ability.
          </p>

          <div className="space-y-4 mb-8">
            {d5Signals.map((signal) => {
              const colors = getColorClasses(signal.color)
              return (
                <div
                  key={signal.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <signal.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{signal.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{signal.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Signal:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{signal.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAIL VS READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            What Fails vs What Passes
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The same capability — accepting a payment — can score 0 or 8 depending on whether the
            primitive is human-facing or machine-facing. These six pairs show the pattern.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div className="text-red-400">Fails D5</div>
              <div className="text-emerald-400">Passes D5</div>
            </div>
            {failureVsReady.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.fail}</div>
                <div className="text-emerald-400">{row.ready}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ANTI-PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            The Real Anti-Pattern: PayPal Button on a Contact Form
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Across the 500 scans, the single most common D5 failure mode is a pattern we started
              calling &ldquo;button-on-a-form.&rdquo; The business has a contact page. Somewhere on that
              page sits a PayPal button, a Stripe Buy Button, or a Square payment link. That is the
              entire payment surface.
            </p>
            <p>
              From the agent&apos;s perspective, this scores near zero for six independent reasons.
              There is no API to call. The button triggers a popup that requires human mouse input. The
              success signal goes to an email inbox, not a webhook. There is no way to query whether a
              specific charge succeeded. Refunds require emailing the business owner. And the amount is
              hardcoded into the button — the agent cannot negotiate, adjust, or split charges.
            </p>
            <p>
              The fix is not &ldquo;remove the button.&rdquo; It is adding a structured path beside it.
              A single{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                POST /api/charge
              </code>{' '}
              endpoint backed by Stripe Payment Intents, a webhook subscription, and a refund endpoint
              takes one developer one afternoon and moves D5 from ~1 to ~6 out of 8. That is a 5-point
              move on the total score.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Why Stripe scored 68:</strong> Their entire product
              is Payment Intents, SetupIntents, webhooks, and structured refunds. They built the
              primitives agents need. The reason their score is not higher is D3 Onboarding (new account
              signup still friction for agents) and D4 Pricing (enterprise pricing behind sales). D5
              itself is effectively a 10/10 — the reference implementation.{' '}
              <Link href="/blog/why-stripe-scores-68" className="text-emerald-300 hover:text-emerald-200 underline">
                See the full Stripe breakdown
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== X402 SECTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            The x402 Bonus — Agent-Native Payment
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              HTTP status code 402 was reserved in 1997, labeled &ldquo;Payment Required,&rdquo; and
              then sat unused for nearly three decades. x402 finally activates it. The protocol: an
              agent calls a paid endpoint, the server responds with 402 and a machine-readable payment
              instruction, the agent settles (typically USDC on Base), and retries with an X-PAYMENT
              header proving settlement. The second request returns the actual payload.
            </p>
            <p>
              In the v4 scoring model, x402 support contributes to both D5 and the Agent-Native Bonus.
              It is not required to pass D5 — Stripe Payment Intents score full D5 credit. But it is the
              signal that separates ARL-3 Visible from ARL-4 Automated. Per-call pricing with sub-cent
              settlement is not a rounding error — it is a new business model.
            </p>
            <p>
              Read the full explainer at{' '}
              <Link href="/blog/x402-payment-protocol" className="text-emerald-400 hover:text-emerald-300 underline">
                x402: The Micropayment Protocol That Lets AI Agents Pay for Services
              </Link>{' '}
              for the protocol details, reference implementations, and the two US businesses that have
              shipped it to production in 2026 so far.
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

      {/* ===== RELATED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12',
                href: '/blog/fintech-agent-readiness',
                tag: 'Industry Analysis',
                tagColor: 'amber',
              },
              {
                title: 'x402: The Micropayment Protocol That Lets AI Agents Pay for Services',
                href: '/blog/x402-payment-protocol',
                tag: 'Protocols',
                tagColor: 'emerald',
              },
              {
                title: 'What Makes Stripe Score 68 Silver',
                href: '/blog/why-stripe-scores-68',
                tag: 'Case Study',
                tagColor: 'blue',
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
            See your D5 score in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes scans your payment surface and returns a detailed D5 breakdown — which of the
            six signals you pass, which you fail, and the exact remediation path.
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
              <Link2 className="h-4 w-4" />
              Connect My Business
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
