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
  Globe,
  HelpCircle,
  Languages,
  Layers,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Multi-Language APIs and Agent Readiness: Why Accept-Language Headers Matter for Global Agents | AgentHermes',
  description:
    'Global AI agents serve users in 100+ languages but most APIs return English-only responses regardless of Accept-Language headers. APIs that support localized content, multi-currency pricing, and timezone-aware scheduling score significantly higher on agent readiness.',
  keywords: [
    'multi-language API agent readiness',
    'Accept-Language header API',
    'localized API responses',
    'multilingual agent readiness',
    'global AI agent API',
    'multi-currency API',
    'internationalization agent readiness',
    'i18n API design',
    'localized error messages API',
  ],
  openGraph: {
    title: 'Multi-Language APIs and Agent Readiness: Why Accept-Language Headers Matter for Global Agents',
    description:
      'Most APIs return English-only regardless of locale headers. Global AI agents need localized content, multi-currency pricing, and timezone-aware responses.',
    url: 'https://agenthermes.ai/blog/multi-language-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Multi-Language APIs and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-Language APIs and Agent Readiness: Why Accept-Language Headers Matter',
    description:
      'Global AI agents need APIs that speak their user\'s language. 87% of APIs we scan return English-only. Here is why that tanks your agent readiness score.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/multi-language-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const localizationDimensions = [
  {
    name: 'Accept-Language Header Support',
    description: 'API respects the Accept-Language HTTP header and returns content in the requested locale. An agent serving a Japanese user should get Japanese product descriptions, not English.',
    scoring: 'D6 Data Quality: +8 points for proper header handling, +4 for partial support (2-5 languages), 0 for English-only.',
    example: 'Accept-Language: ja-JP → returns Japanese product names, descriptions, and units',
    icon: Languages,
    color: 'blue',
  },
  {
    name: 'Localized Error Messages',
    description: 'Error responses include human-readable messages in the requested language. When an agent needs to explain a failure to a non-English user, the API should provide the explanation in their language.',
    scoring: 'D6 Data Quality: +5 points. Stripe returns errors in 20+ languages. Most APIs return "Invalid request" in English regardless.',
    example: '{"error": "El campo email es obligatorio", "code": "missing_field", "field": "email"}',
    icon: Code2,
    color: 'emerald',
  },
  {
    name: 'Multi-Currency Pricing',
    description: 'Prices returned in the user\'s local currency with proper formatting. An agent comparing products for a user in Brazil needs prices in BRL, not just USD with a conversion note.',
    scoring: 'D4 Pricing Transparency: +6 points for native multi-currency, +3 for conversion-only, 0 for single currency.',
    example: '{"price": 4990, "currency": "BRL", "formatted": "R$ 49,90"}',
    icon: DollarSign,
    color: 'amber',
  },
  {
    name: 'Timezone-Aware Scheduling',
    description: 'Availability and scheduling endpoints respect timezone parameters and return times in the user\'s local timezone. An agent booking a meeting across timezones needs the API to handle the conversion.',
    scoring: 'D6 Data Quality: +4 points for timezone parameter support, +2 for UTC-only with offset, 0 for no timezone handling.',
    example: '{"available_slots": [{"start": "2026-04-15T14:00:00-03:00", "timezone": "America/Sao_Paulo"}]}',
    icon: Clock,
    color: 'purple',
  },
  {
    name: 'Locale-Specific Formatting',
    description: 'Numbers, dates, addresses, and phone numbers formatted according to locale conventions. European agents expect dd/mm/yyyy and comma decimal separators. API responses should match.',
    scoring: 'D6 Data Quality: +3 points for full locale formatting, +1 for dates only, 0 for US format hardcoded.',
    example: '{"date": "15/04/2026", "amount": "1.299,00", "phone": "+55 11 99999-0000"}',
    icon: Globe,
    color: 'cyan',
  },
]

const comparisonRows = [
  { company: 'Stripe', language: '35+ languages', currency: '135+ currencies', timezone: 'Full TZ support', score: '68/100', tier: 'Gold' },
  { company: 'Shopify', language: '20+ languages', currency: '130+ currencies', timezone: 'Store timezone', score: '62/100', tier: 'Silver' },
  { company: 'Twilio', language: 'SMS in any language', currency: 'USD only', timezone: 'UTC only', score: '55/100', tier: 'Silver' },
  { company: 'Square', language: 'English only', currency: '6 currencies', timezone: 'Local only', score: '44/100', tier: 'Bronze' },
  { company: 'Calendly', language: '7 languages', currency: 'USD/EUR/GBP', timezone: 'Full TZ support', score: '41/100', tier: 'Bronze' },
  { company: 'Avg Local Business', language: 'English only', currency: 'USD only', timezone: 'None', score: '8/100', tier: 'Not Scored' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does Accept-Language matter for AI agents specifically?',
    answer:
      'AI agents serve users in their native language. When an agent is helping a French-speaking user book a service, it needs the API to return French content — service descriptions, error messages, confirmation details. If the API only returns English, the agent must translate, which introduces errors, increases latency, and degrades user experience. Agent-ready APIs serve content in the user\'s language natively.',
  },
  {
    question: 'How much does multi-language support affect agent readiness scores?',
    answer:
      'Across all localization dimensions, the maximum score impact is approximately 26 points on a 100-point scale. This comes primarily from D6 Data Quality (up to 20 points) and D4 Pricing Transparency (up to 6 points). In practice, businesses that handle localization well tend to score 15-20 points higher than English-only equivalents because the same engineering discipline that produces good i18n also produces good structured data overall.',
  },
  {
    question: 'Can an agent just translate English API responses itself?',
    answer:
      'Technically yes, but it is a poor solution. Agent-side translation adds 200-500ms latency per request, introduces translation errors in domain-specific terminology (medical terms, legal language, product names), and cannot handle locale-specific formatting (date formats, currency symbols, address structures). API-native localization is always more accurate and faster.',
  },
  {
    question: 'What is the minimum viable localization for agent readiness?',
    answer:
      'At minimum: respect Accept-Language headers for content responses, return prices in at least the top 5 global currencies (USD, EUR, GBP, JPY, CNY), and include timezone offsets in all datetime fields. This alone adds 12-15 points to your agent readiness score and makes your API usable by agents serving 80% of the global market.',
  },
  {
    question: 'Does Stripe really handle localization that well?',
    answer:
      'Yes. Stripe is the gold standard for API localization. Error messages in 35+ languages, 135+ currencies with automatic conversion, locale-aware formatting, full timezone support in all scheduling endpoints. This is one reason Stripe scores 68/100 overall — its D6 Data Quality score is among the highest we have measured. Other businesses should study Stripe\'s API documentation as a blueprint.',
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

export default function MultiLanguageAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Multi-Language APIs and Agent Readiness: Why Accept-Language Headers Matter for Global Agents',
    description:
      'Global AI agents need APIs that support Accept-Language headers, localized error messages, multi-currency pricing, and timezone-aware scheduling. Most APIs fail all four.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/multi-language-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'multi-language API agent readiness, Accept-Language header, localized API, multilingual agent, global AI agent',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Multi-Language Agent Readiness',
          item: 'https://agenthermes.ai/blog/multi-language-agent-readiness',
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
      title="Multi-Language APIs and Agent Readiness: Why Accept-Language Headers Matter for Global Agents"
      shareUrl="https://agenthermes.ai/blog/multi-language-agent-readiness"
      currentHref="/blog/multi-language-agent-readiness"
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
            <span className="text-zinc-400">Multi-Language Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Languages className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Internationalization
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Multi-Language APIs and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Accept-Language Headers Matter for Global Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            AI agents serve users in every language on earth. When a Japanese user asks their agent to book
            a restaurant in Tokyo, the agent sends{' '}
            <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">
              Accept-Language: ja-JP
            </code>{' '}
            to the API. <strong className="text-zinc-100">87% of APIs we scan ignore this header entirely</strong> and
            return English-only responses. That is not just a UX problem — it directly lowers your agent
            readiness score on D6 Data Quality, which carries a 0.10 weight in the scoring formula.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            The Monolingual API Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The web solved localization decades ago. Browsers send Accept-Language headers, websites serve
              content in the right language, and users expect this to work seamlessly. But APIs — the
              backbone of the agent economy — never caught up.
            </p>
            <p>
              When we scan 500+ businesses for agent readiness, one of the most common failures on{' '}
              <Link href="/blog/data-quality-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D6 Data Quality
              </Link>{' '}
              is monolingual API responses. The API returns perfectly structured JSON — but only in English.
              Product descriptions, error messages, category names, and confirmation texts are all hardcoded
              in one language regardless of what the requesting agent asks for.
            </p>
            <p>
              This matters more than most businesses realize. Over{' '}
              <strong className="text-zinc-100">75% of internet users speak a language other than
              English as their primary language</strong>. AI agents serving these users need APIs
              that understand locale. An agent that has to translate every API response before presenting
              it to the user adds latency, introduces errors, and provides a degraded experience compared
              to an agent connected to a properly localized API.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '87%', label: 'of APIs ignore Accept-Language', icon: Languages },
              { value: '75%', label: 'of users are non-English primary', icon: Globe },
              { value: '+26', label: 'max score boost from localization', icon: TrendingUp },
              { value: '35+', label: 'languages in Stripe\'s API', icon: CheckCircle2 },
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

      {/* ===== FIVE DIMENSIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Five Dimensions of API Localization for Agents
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Agent readiness localization is not just about translating strings. It spans five distinct
            dimensions, each contributing to your score and each affecting how well global agents can
            interact with your service.
          </p>

          <div className="space-y-4 mb-8">
            {localizationDimensions.map((dim) => {
              const colors = getColorClasses(dim.color)
              return (
                <div
                  key={dim.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <dim.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{dim.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{dim.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-3">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Scoring:</span>{' '}
                      <span className={colors.text}>{dim.scoring}</span>
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{dim.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Localization Scorecard: Who Gets It Right
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We compared localization support across top-scoring platforms and the average local business.
            The gap is stark: platforms with proper i18n consistently score 40-68. Businesses without it
            cluster below 15.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-6 bg-zinc-800/50 p-4 text-xs sm:text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div>Languages</div>
              <div>Currencies</div>
              <div>Timezones</div>
              <div>Score</div>
              <div>Tier</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.company}
                className={`grid grid-cols-6 p-4 text-xs sm:text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.company}</div>
                <div className="text-zinc-400">{row.language}</div>
                <div className="text-zinc-400">{row.currency}</div>
                <div className="text-zinc-400">{row.timezone}</div>
                <div className="text-emerald-400 font-medium">{row.score}</div>
                <div className="text-zinc-400">{row.tier}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is clear: platforms that invested in internationalization years ago for their
              human users are now better positioned for the agent economy. Stripe&apos;s 35+ language
              support was built for human developers reading error messages. It now serves AI agents
              that need to relay those errors to non-English users. The investment compounds.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTENT NEGOTIATION LINK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Beyond Language: Full Content Negotiation
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Accept-Language is one part of a broader pattern called{' '}
              <Link href="/blog/content-negotiation-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                content negotiation
              </Link>. Agents also send Accept headers for response format (JSON vs XML), Accept-Encoding for
              compression, and custom headers for API versioning. APIs that handle the full content
              negotiation spectrum score highest on agent experience because they adapt to whatever the
              agent needs rather than forcing a single response format.
            </p>
            <p>
              The most agent-ready APIs treat every request header as a signal. Accept-Language tells them
              the user&apos;s language. Accept tells them the format. A custom X-Currency header tells them the
              pricing currency. Each signal the API handles is one less transformation the agent has to
              perform client-side — making the interaction faster, more reliable, and more accurate.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Quick win for local businesses:</strong> Even if you only
              serve one geographic market, adding Accept-Language header support for your top 3 customer
              languages (check your Google Analytics demographics) can lift your D6 Data Quality score by
              8-12 points. For a US business in a city with a large Spanish-speaking population, supporting
              English and Spanish doubles your agent accessibility at minimal development cost.
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMPLEMENTATION GUIDE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Implementation Priority for Agent Readiness
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not need to support 35 languages on day one. Here is the priority order based on
            score impact and implementation effort.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Add Accept-Language header parsing',
                detail: 'Read the header, default to en-US if missing, return a Content-Language response header. Even if you only support English initially, the infrastructure being present signals agent readiness. Score impact: +3 points immediately.',
                icon: Languages,
              },
              {
                step: '2',
                title: 'Localize error messages (top 5 languages)',
                detail: 'Error messages are the highest-impact localization target because agents need to explain failures to users. Start with English, Spanish, French, German, and Japanese — covering 60% of global API consumers. Score impact: +5 points.',
                icon: Code2,
              },
              {
                step: '3',
                title: 'Support multi-currency pricing',
                detail: 'Return prices in the user\'s currency using a currency parameter or Accept-Currency header. Use a real-time exchange rate API for conversion. Score impact: +6 points on D4 Pricing.',
                icon: DollarSign,
              },
              {
                step: '4',
                title: 'Add timezone parameters to scheduling',
                detail: 'Every datetime field should accept a timezone parameter. Return times in ISO 8601 with timezone offset. Never return bare dates like "2026-04-15" without timezone context. Score impact: +4 points.',
                icon: Clock,
              },
              {
                step: '5',
                title: 'Full locale formatting',
                detail: 'Format numbers, dates, addresses, and phone numbers according to the requested locale. Use established libraries (Intl API in JavaScript, ICU in Python). Score impact: +3 points.',
                icon: MapPin,
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
              Following this priority order, you can gain up to 21 points in agent readiness with
              reasonable engineering effort. The full 26-point potential requires deep localization
              of all content fields, which is a longer-term investment but one that pays dividends
              across both human and agent channels.
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
                title: 'Content Negotiation and Agent Readiness',
                href: '/blog/content-negotiation-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Data Quality and Agent Readiness',
                href: '/blog/data-quality-agent-readiness',
                tag: 'Scoring',
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
            How does your API handle global agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your D6 Data Quality score and find out if your
            API is ready for agents that speak every language.
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
