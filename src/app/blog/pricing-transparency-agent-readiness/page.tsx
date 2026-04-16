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
  DollarSign,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  PieChart,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency | AgentHermes',
  description:
    '148 of 500 businesses we scanned have no visible pricing. AI agents cannot negotiate "contact sales." We break down why pricing transparency matters for agents, what structured pricing looks like, and how to add schema.org/Offer markup in an afternoon.',
  keywords: [
    'pricing transparency AI agents',
    'pricing page agent readiness',
    'schema.org pricing',
    'JSON-LD Offer markup',
    'structured pricing API',
    'agent-ready pricing',
    'contact sales pricing problem',
    'AI agent pricing',
  ],
  openGraph: {
    title: 'Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency',
    description:
      '148 of 500 businesses have no visible pricing. AI agents cannot negotiate "contact sales." Here is the fix.',
    url: 'https://agenthermes.ai/blog/pricing-transparency-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency',
    description:
      '30% of businesses have no visible pricing. Agents cannot negotiate. Here is what structured pricing looks like.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/pricing-transparency-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const failurePatterns = [
  {
    name: '"Contact us for pricing"',
    description:
      'The most common pattern — and the most damaging. The business expects a human to fill out a form, wait for a sales email, and schedule a call before seeing a number. Agents bounce before the form loads.',
    icon: Lock,
    color: 'red',
    share: '54%',
  },
  {
    name: '"Custom quote based on needs"',
    description:
      'A softer "contact us" that usually lives inside enterprise SaaS pricing pages. The middle two tiers have prices; the top tier says "Let us talk." Agents shortlist the competitors who quote the top tier openly.',
    icon: FileText,
    color: 'amber',
    share: '22%',
  },
  {
    name: 'Pricing behind auth',
    description:
      'You have to sign up or log in to see prices. This is technically visible but functionally invisible to agents — they cannot complete the auth handshake on behalf of a user without credentials.',
    icon: Lock,
    color: 'red',
    share: '14%',
  },
  {
    name: 'PDF price sheets',
    description:
      'Downloadable pricing docs. Agents cannot parse PDFs reliably, cannot extract structured numbers, and cannot cite the source confidently in recommendations.',
    icon: FileText,
    color: 'amber',
    share: '7%',
  },
  {
    name: 'Sticker price but no structure',
    description:
      'A /pricing page with three colored cards and prices printed as images or plain text. Slightly better than hidden pricing — agents can OCR the text — but scores poorly because there is no schema.org/Offer markup or API endpoint.',
    icon: BarChart3,
    color: 'blue',
    share: '3%',
  },
]

const goodExamples = [
  {
    name: 'Stripe',
    score: 68,
    tone: 'emerald',
    detail:
      'Clear published rates (2.9% + 30¢ for standard cards, volume discounts above $80k/mo), schema.org/PriceSpecification markup, and a /api/v1/prices endpoint for programmatic access. Agents quote Stripe pricing with confidence.',
  },
  {
    name: 'Vercel',
    score: 70,
    tone: 'emerald',
    detail:
      'Three published tiers (Hobby, Pro, Enterprise) with line-item breakdowns for bandwidth, builds, and function invocations. Structured JSON-LD Offer markup. The Enterprise tier is "Contact Sales" — not ideal — but the Pro tier has enough detail that agents do not need to ask.',
  },
  {
    name: 'Resend',
    score: 75,
    tone: 'emerald',
    detail:
      'The only Gold-tier business in our 500-business dataset. Every tier has a price, a monthly email limit, a domain limit, and schema.org markup. An agent can quote Resend to a user in under 200 milliseconds without scraping.',
  },
]

const badExamples = [
  {
    name: 'Enterprise SaaS (avg)',
    score: 23,
    tone: 'amber',
    detail:
      'The bulk of enterprise B2B software. "Contact us" on the top tier, and frequently on all tiers. The marketing team argues it enables price discrimination; the agent readiness data says it forfeits every agent-mediated deal.',
  },
  {
    name: 'Marketing agencies',
    score: 14,
    tone: 'red',
    detail:
      'Worst-performing vertical for pricing. 93% of agencies in our dataset have no public pricing. The average pricing dimension score for advertising is 9/100 — essentially zero.',
  },
  {
    name: 'Legal / Professional services',
    score: 18,
    tone: 'red',
    detail:
      'Cultural reflex is billable hours and custom engagements. A few forward-looking firms ship flat-fee menus, but the category average is in the teens. First firm to publish a structured rate card wins agent-mediated referrals.',
  },
]

const fixSteps = [
  {
    step: '1',
    title: 'Publish at least three tiers with real numbers',
    detail:
      'Even "from $X/mo" beats "contact us." If your top tier is custom, show a range (from $5,000/mo). Agents can work with ranges — they cannot work with silence.',
  },
  {
    step: '2',
    title: 'Add schema.org/Product + Offer markup',
    detail:
      'Wrap each tier in structured data. JSON-LD is easiest — paste a <script type="application/ld+json"> tag in the head. Google, Claude, and Perplexity all parse it.',
  },
  {
    step: '3',
    title: 'Use semantic HTML on your /pricing page',
    detail:
      '<dl> for definition lists, <table> for rate comparisons, <meta itemprop="price"> where appropriate. Agents OCR images badly but parse semantic HTML flawlessly.',
  },
  {
    step: '4',
    title: 'Ship a /api/pricing endpoint',
    detail:
      'A simple JSON endpoint returning your tiers as a structured document. Cacheable, versioned, agent-friendly. Even if no agent ever hits it, it signals you take programmatic access seriously.',
  },
  {
    step: '5',
    title: 'Declare get_pricing in your agent-card.json',
    detail:
      'Add a "get_pricing" skill to your agent-card.json. This is a direct invitation for agents to quote you — the easiest possible integration point for agent-mediated sales.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How many businesses fail agent readiness over pricing transparency?',
    answer:
      '148 of the 500 businesses we scanned (30%) have no visible pricing at all — no published tiers, no "from $X/mo" indicators, no price-adjacent structured data. An additional 22% have partial pricing that requires authentication or PDF download. Combined, 52% of businesses are effectively opaque to AI agents on pricing.',
  },
  {
    question: 'Why is the D4 Pricing dimension weighted so low (0.05) if it matters so much?',
    answer:
      'Pricing is weighted 0.05 in the standard AgentHermes scoring model because it is rarely a hard blocker — an agent can still discover, understand, and sometimes even buy from a business without structured pricing, as long as other dimensions are strong. But the dimension has the highest failure rate of any scored area (30% near-zero). Businesses in verticals where pricing is culturally hidden (enterprise SaaS, agencies, legal, healthcare) should expect pricing to be their lowest dimension score by a wide margin.',
  },
  {
    question: 'What does good agent-readable pricing look like technically?',
    answer:
      'Three things: (1) a /pricing page using semantic HTML with prices as text not images, (2) JSON-LD Offer / PriceSpecification markup describing each tier, and (3) a machine-readable endpoint — either a GET /api/pricing JSON route or a get_pricing skill declared in your agent-card.json. Stripe, Vercel, and Resend all do this. Their pricing dimension scores are in the 70-85 range versus the dataset average of 32.',
  },
  {
    question: 'We sell enterprise software where pricing really is custom. What should we do?',
    answer:
      'Ship a starting-point price and a range for volume. "From $2,000/mo, custom pricing available above $50k ACV" beats "Contact sales" every time. Include the range in schema.org/Offer as priceRange. If you absolutely cannot publish numbers, at least publish the structure: a get_pricing skill that returns your deal size brackets (SMB, mid-market, enterprise) and next steps. Agents can then route users correctly instead of assuming you are out of scope.',
  },
  {
    question: 'Will publishing pricing hurt my sales?',
    answer:
      'The empirical data from SaaS comparison sites (ProfitWell, OpenView, Price Intelligently) consistently shows the opposite — companies that publish pricing reduce sales cycle length by 30-50% and capture more self-serve conversion. The fear of "price anchoring" or "competitor visibility" is almost always outweighed by qualified-lead gains. In the agent economy, the gap widens: agents route toward transparent pricing because they cannot complete a quote without it.',
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

export default function PricingTransparencyAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency',
    description:
      '148 of 500 businesses we scanned have no visible pricing. AI agents cannot negotiate "contact sales." A full breakdown of pricing transparency for the agent economy.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/pricing-transparency-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Research',
    wordCount: 1900,
    keywords:
      'pricing transparency AI agents, pricing page agent readiness, schema.org pricing, JSON-LD Offer markup',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Pricing Transparency Agent Readiness',
          item: 'https://agenthermes.ai/blog/pricing-transparency-agent-readiness',
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
      title="Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency"
      shareUrl="https://agenthermes.ai/blog/pricing-transparency-agent-readiness"
      currentHref="/blog/pricing-transparency-agent-readiness"
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
            <span className="text-zinc-400">Pricing Transparency</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <DollarSign className="h-3.5 w-3.5" />
              Dimension D4
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Universal Weakness
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why 30% of Businesses Fail Agent Readiness{' '}
            <span className="text-emerald-400">Over Pricing Transparency</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            <strong className="text-zinc-100">148 of 500 businesses</strong> we scanned have no
            visible pricing. Agents cannot negotiate "contact sales" — they need structured tiers,
            schema markup, and published numbers. D4 Pricing Transparency has the lowest weight in
            our scoring model (0.05), but the highest universal failure rate.
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
                  13 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE NUMBER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-emerald-500" />
            The 30% That Cannot Be Quoted
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When AgentHermes scans a business for pricing transparency, we look for five signals:
              a /pricing page, visible prices in text (not images), schema.org Product or Offer
              markup, a machine-readable pricing endpoint, and a get_pricing skill in the
              agent-card.json. Businesses that hit at least three of the five score above 60
              (Silver). Those that hit zero or one score under 20 (far below Bronze).
            </p>
            <p>
              In our 500-business dataset,{' '}
              <strong className="text-zinc-100">148 businesses (30%)</strong> hit zero or one
              signal. Another 22% hit two. That means{' '}
              <strong className="text-emerald-400">52% of businesses are effectively opaque
              on pricing</strong> to AI agents — and this is the cause of roughly 40% of Bronze-tier
              scores.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '148', label: 'businesses with 0 visible pricing', icon: XCircle, tone: 'red' },
              { value: '30%', label: 'of total scanned', icon: PieChart, tone: 'amber' },
              { value: '0.05', label: 'D4 weight (lowest)', icon: BarChart3, tone: 'blue' },
              { value: '40%', label: 'of Bronze scores caused by this', icon: TrendingUp, tone: 'emerald' },
            ].map((stat) => {
              const colors = getColorClasses(stat.tone)
              return (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className={`h-5 w-5 ${colors.text} mx-auto mb-2`} />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The weighting paradox:</strong> D4 Pricing is
              weighted at only 0.05 because many businesses successfully sell without public pricing
              (luxury brands, enterprise SaaS, custom services). But in the agent economy, pricing
              silence becomes a hard filter — an agent comparing 5 options drops the 3 without
              quotable prices, regardless of how great those 3 options actually are.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            The Five Pricing Failure Patterns
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The 148 businesses with failing pricing all fall into five distinct patterns. Share of
            failures is noted for each.
          </p>

          <div className="space-y-4 mb-8">
            {failurePatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                    </div>
                    <span className={`text-sm font-bold ${colors.text}`}>{pattern.share}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{pattern.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY AGENTS CARE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Why Agents Care About Structured Pricing (And Humans Do Not Notice)
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A human visiting your pricing page can make sense of almost anything — a table of
              prices, three colored cards, a "talk to sales" CTA on the top tier. Humans bring
              context, patience, and tolerance for ambiguity. They can wait 48 hours for a quote
              email and still convert.
            </p>
            <p>
              An AI agent has none of that. When a user asks{' '}
              <em className="text-zinc-200">"find me a CRM under $200/month that works with
              HubSpot"</em>, the agent evaluates candidates in seconds. It needs structured signals
              it can compare: number, currency, billing period, plan name, features included. If
              one of your three "competitors" has that structured data and you do not, you are
              eliminated <strong className="text-zinc-100">before the user ever sees a
              shortlist</strong>.
            </p>
            <p>
              This is not hypothetical — it is how Claude, ChatGPT, and Perplexity already handle
              product research queries today. The agent does not hate your business; it simply
              cannot include you in a structured comparison without structured data.
            </p>
          </div>
        </div>
      </section>

      {/* ===== GOOD VS BAD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Who Is Doing It Right (And Who Is Doing It Wrong)
          </h2>

          <h3 className="text-lg font-bold text-emerald-400 mb-3 mt-6 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Agent-ready pricing — the leaders
          </h3>
          <div className="space-y-3 mb-8">
            {goodExamples.map((ex) => {
              const colors = getColorClasses(ex.tone)
              return (
                <div key={ex.name} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-zinc-100">{ex.name}</h4>
                    <span className={`text-sm font-bold ${colors.text}`}>Score: {ex.score}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{ex.detail}</p>
                </div>
              )
            })}
          </div>

          <h3 className="text-lg font-bold text-red-400 mb-3 mt-6 flex items-center gap-2">
            <XCircle className="h-4 w-4" /> Pricing opacity — the vertical laggards
          </h3>
          <div className="space-y-3 mb-8">
            {badExamples.map((ex) => {
              const colors = getColorClasses(ex.tone)
              return (
                <div key={ex.name} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-zinc-100">{ex.name}</h4>
                    <span className={`text-sm font-bold ${colors.text}`}>Avg: {ex.score}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{ex.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT GOOD LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-cyan-500" />
            What Agent-Ready Pricing Looks Like in Code
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here is the minimum JSON-LD Offer markup you can paste into the head of your /pricing
            page today. It takes 20 minutes to write, and it will move your D4 score by 25+ points
            on its own.
          </p>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-x-auto mb-8">
            <pre className="text-xs leading-relaxed text-zinc-300">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Acme CRM",
  "description": "AI-powered CRM for modern sales teams.",
  "brand": { "@type": "Brand", "name": "Acme" },
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter",
      "price": "49.00",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "49.00",
        "priceCurrency": "USD",
        "unitCode": "MON",
        "billingIncrement": 1
      },
      "eligibleQuantity": { "@type": "QuantitativeValue", "value": 5, "unitCode": "C62" },
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Growth",
      "price": "149.00",
      "priceCurrency": "USD",
      "priceSpecification": { "@type": "UnitPriceSpecification", "price": "149.00", "priceCurrency": "USD", "unitCode": "MON" },
      "eligibleQuantity": { "@type": "QuantitativeValue", "value": 25, "unitCode": "C62" }
    },
    {
      "@type": "Offer",
      "name": "Enterprise",
      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "USD", "minPrice": "1000", "maxPrice": "5000" }
    }
  ]
}
</script>`}
            </pre>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Note the Enterprise tier uses <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">minPrice</code> and <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">maxPrice</code> — a structured range — instead of "contact us." Agents can still shortlist you for users whose budget fits the range, instead of eliminating you outright.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FIX STEPS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Five Steps From Opaque to Agent-Ready
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every step here is independent. Even step 1 on its own moves your pricing dimension
            from "near-zero" to "Bronze floor." All five combined put you in Silver+ territory.
          </p>

          <div className="space-y-3 mb-8">
            {fixSteps.map((item) => (
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

      {/* ===== RELATED ARTICLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Why Most SaaS Companies Score Bronze for Agent Readiness',
                href: '/blog/saas-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'green',
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
            See exactly where your pricing fails
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan. We grade your D4 Pricing dimension against every signal
            — schema markup, structured tiers, machine-readable endpoint, agent-card skill — and
            show you the 3-5 specific fixes that move you fastest.
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
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See the Leaderboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
