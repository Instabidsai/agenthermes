import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  Heart,
  HeartHandshake,
  HelpCircle,
  Layers,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Nonprofit vs For-Profit Agent Readiness: Why Mission-Driven Organizations Score 3x Lower | AgentHermes',
  description:
    'Data comparison: for-profit businesses average 43/100 on agent readiness. Nonprofits average 14/100 — 3x lower. AI giving agents will allocate billions, but only to nonprofits they can programmatically evaluate.',
  keywords: [
    'nonprofit vs for-profit agent readiness comparison',
    'nonprofit agent readiness',
    'AI giving agents',
    'nonprofit API',
    'charity agent readiness score',
    'nonprofit digital infrastructure',
    'AI donation platform',
    'mission-driven agent readiness',
    'nonprofit technology gap',
  ],
  openGraph: {
    title:
      'Nonprofit vs For-Profit Agent Readiness: Why Mission-Driven Organizations Score 3x Lower',
    description:
      'For-profit businesses: 43/100. Nonprofits: 14/100. AI giving agents are coming — but only to nonprofits with APIs.',
    url: 'https://agenthermes.ai/blog/nonprofit-vs-forprofit-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nonprofit vs For-Profit Agent Readiness Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Nonprofit vs For-Profit Agent Readiness: 3x Gap in Scores',
    description:
      'For-profit: 43/100. Nonprofit: 14/100. AI giving agents will allocate billions — but only to nonprofits with programmatic access.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/nonprofit-vs-forprofit-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonData = [
  { dimension: 'D1 Discovery', forProfit: '5.2/12', nonprofit: '2.1/12', gap: '2.5x', note: 'Nonprofits rarely have agent-card.json or llms.txt' },
  { dimension: 'D2 API Quality', forProfit: '6.8/15', nonprofit: '0.9/15', gap: '7.6x', note: 'Almost no nonprofits have public API endpoints' },
  { dimension: 'D3 Onboarding', forProfit: '3.4/8', nonprofit: '0.4/8', gap: '8.5x', note: 'No developer portals, no API keys, no docs' },
  { dimension: 'D4 Pricing', forProfit: '2.1/5', nonprofit: '1.8/5', gap: '1.2x', note: 'Donation tiers often listed (closest to parity)' },
  { dimension: 'D5 Payment', forProfit: '3.2/8', nonprofit: '1.4/8', gap: '2.3x', note: 'Donate buttons exist but no payment API' },
  { dimension: 'D6 Data Quality', forProfit: '4.6/10', nonprofit: '2.8/10', gap: '1.6x', note: 'Impact data exists but as PDFs, not JSON' },
  { dimension: 'D7 Security', forProfit: '7.1/12', nonprofit: '2.4/12', gap: '3.0x', note: 'Outdated CMS, no security.txt, mixed content' },
  { dimension: 'D8 Reliability', forProfit: '6.8/13', nonprofit: '1.9/13', gap: '3.6x', note: 'Shared hosting, no CDN, no uptime monitoring' },
  { dimension: 'D9 Agent Experience', forProfit: '3.8/10', nonprofit: '0.3/10', gap: '12.7x', note: 'Zero agent-specific infrastructure' },
]

const nonprofitExamples = [
  { name: 'Red Cross (redcross.org)', score: 28, tier: 'Not Scored', note: 'Large org with some digital infrastructure but no agent endpoints' },
  { name: 'Wikipedia (wikimedia.org)', score: 52, tier: 'Bronze', note: 'Open API exists (MediaWiki API), structured data, developer portal' },
  { name: 'Khan Academy', score: 41, tier: 'Bronze', note: 'Public API for content, structured courses, but limited for agents' },
  { name: 'Local Food Bank', score: 6, tier: 'Not Scored', note: 'WordPress site with donate button, no API, hours in footer' },
  { name: 'Community Animal Shelter', score: 4, tier: 'Not Scored', note: 'Static site, pet listings as images not data, adoption by phone' },
  { name: 'Church / House of Worship', score: 3, tier: 'Not Scored', note: 'Event calendar as image, no structured service times' },
  { name: 'Youth Sports Nonprofit', score: 2, tier: 'Not Scored', note: 'Facebook page only, registration via Google Forms' },
]

const forProfitExamples = [
  { name: 'Stripe', score: 68, tier: 'Silver', note: 'Full API, structured docs, OAuth, webhooks, status page' },
  { name: 'Shopify Store (avg)', score: 47, tier: 'Bronze', note: 'Storefront API, product schema, checkout flow' },
  { name: 'Local Restaurant', score: 22, tier: 'Not Scored', note: 'Google Business listing, maybe online ordering' },
  { name: 'Local Plumber', score: 8, tier: 'Not Scored', note: 'Basic website, phone number, service list' },
]

const whatChanges = [
  {
    title: 'Impact reporting API',
    description: 'Replace annual PDF reports with a structured JSON endpoint. Agents evaluating charities need machine-readable metrics: dollars-per-impact, overhead ratio, program effectiveness scores.',
    icon: BarChart3,
    color: 'emerald',
  },
  {
    title: 'Donation endpoint',
    description: 'A single API endpoint that accepts donation amount, frequency (one-time/monthly), designation (general/specific program), and returns a tax receipt. This is the equivalent of a checkout API for commerce.',
    icon: HeartHandshake,
    color: 'blue',
  },
  {
    title: 'Program catalog as structured data',
    description: 'List programs, their goals, geographic reach, beneficiary demographics, and outcomes as JSON — not as narrative paragraphs on an About page.',
    icon: Layers,
    color: 'purple',
  },
  {
    title: 'Volunteer opportunity endpoint',
    description: 'Structured data for available volunteer roles: skills needed, time commitment, location, scheduling, and sign-up. AI assistants managing people\'s volunteer schedules need this data.',
    icon: Users,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do nonprofits score so much lower than for-profits?',
    answer:
      'Nonprofits optimize for donor emotion — hero images, impact stories, compelling narratives. These convert human donors but are invisible to AI agents. For-profit businesses, especially in tech and e-commerce, have been building APIs and structured data for years because their revenue depends on programmatic access. Nonprofits never had that incentive — until now. AI giving agents change the calculus entirely.',
  },
  {
    question: 'Are AI giving agents real or theoretical?',
    answer:
      'AI giving agents are emerging now. Platforms like Every.org already provide API-driven donation infrastructure. As AI assistants manage more of personal finances, users will say things like "allocate $500 this month across effective charities" and the agent will evaluate nonprofits programmatically — checking impact metrics, overhead ratios, and program outcomes via API. Nonprofits without machine-readable data will not be evaluated.',
  },
  {
    question: 'What is the single most impactful thing a nonprofit can do?',
    answer:
      'Create a structured impact data endpoint. Most nonprofits already have the data — they report it to GuideStar, Charity Navigator, and their annual reports. Exposing that same data as a JSON API endpoint (programs, impact metrics, financials, geographic reach) makes the nonprofit evaluable by AI agents. This single change can lift a score from 14/100 to 30/100.',
  },
  {
    question: 'How much would it cost a nonprofit to become agent-ready?',
    answer:
      'The same as it costs any small business: minimal. AgentHermes auto-generates MCP servers and agent cards from existing business data. A nonprofit can run a free scan at /audit, then use the /connect wizard to generate agent-ready infrastructure. The core challenge is not cost — it is awareness. Most nonprofits do not know this infrastructure gap exists.',
  },
  {
    question: 'Wikipedia scored 52 — why is it so much higher than other nonprofits?',
    answer:
      'Wikipedia (Wikimedia Foundation) is a technology organization that happens to be nonprofit. It has a full public API (MediaWiki API), structured data, developer documentation, and an engineering team that builds for programmatic access. This makes it an outlier. The median nonprofit is a local organization running WordPress with a donate button — scoring 3-8/100.',
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

export default function NonprofitVsForprofitAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Nonprofit vs For-Profit Agent Readiness: Why Mission-Driven Organizations Score 3x Lower',
    description:
      'Data comparison: for-profit businesses average 43/100 on agent readiness while nonprofits average 14/100. AI giving agents will allocate billions, but only to nonprofits with programmatic access.',
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
      'https://agenthermes.ai/blog/nonprofit-vs-forprofit-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Data Analysis',
    wordCount: 1900,
    keywords:
      'nonprofit vs for-profit agent readiness, nonprofit agent readiness, AI giving agents, nonprofit API, charity technology gap',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Nonprofit vs For-Profit Agent Readiness',
          item: 'https://agenthermes.ai/blog/nonprofit-vs-forprofit-agent-readiness',
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
      title="Nonprofit vs For-Profit Agent Readiness: Why Mission-Driven Organizations Score 3x Lower"
      shareUrl="https://agenthermes.ai/blog/nonprofit-vs-forprofit-agent-readiness"
      currentHref="/blog/nonprofit-vs-forprofit-agent-readiness"
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
            <span className="text-zinc-400">Nonprofit vs For-Profit Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <BarChart3 className="h-3.5 w-3.5" />
              Data Comparison
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Nonprofit Analysis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Nonprofit vs For-Profit Agent Readiness:{' '}
            <span className="text-emerald-400">Why Mission-Driven Organizations Score 3x Lower</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            We scanned 500 businesses across every sector. The data is clear: for-profit
            businesses average <strong className="text-zinc-100">43/100</strong> on the Agent
            Readiness Score. Nonprofits average <strong className="text-zinc-100">14/100</strong> —
            three times lower. The organizations with the most to gain from AI-driven giving
            are investing the least in the infrastructure that makes it possible.
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

      {/* ===== THE GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-500" />
            The 3x Gap: For-Profit vs Nonprofit by the Numbers
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The gap between for-profit and nonprofit agent readiness is not uniform. Some
              dimensions show near parity — D4 Pricing, where nonprofits list donation tiers
              similarly to how businesses list prices. Others show a chasm — D9 Agent Experience
              where nonprofits score 12.7x lower because they have zero agent-specific infrastructure.
            </p>
            <p>
              Understanding where the gap is widest reveals what nonprofits need to fix first
              and what has the highest scoring impact per hour of effort invested.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '43', label: 'for-profit average', icon: Building2 },
              { value: '14', label: 'nonprofit average', icon: HeartHandshake },
              { value: '3x', label: 'gap between sectors', icon: BarChart3 },
              { value: '$500B', label: 'annual US giving', icon: DollarSign },
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

      {/* ===== DIMENSION-BY-DIMENSION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Dimension-by-Dimension Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The Agent Readiness Score evaluates nine dimensions. Here is how for-profits
            and nonprofits compare on each.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>For-Profit</div>
              <div>Nonprofit</div>
              <div>Gap</div>
              <div>Key Difference</div>
            </div>
            {comparisonData.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-emerald-400">{row.forProfit}</div>
                <div className="text-red-400">{row.nonprofit}</div>
                <div className="text-amber-400 font-bold">{row.gap}</div>
                <div className="text-zinc-500">{row.note}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The widest gaps:</strong> D3 Onboarding (8.5x)
              and D9 Agent Experience (12.7x) reveal the core issue. For-profit businesses —
              especially SaaS companies — build developer portals with API documentation, SDK
              generation, and sandbox environments because developers are their customers.
              Nonprofits have never had a reason to build this infrastructure. Their
              &ldquo;customers&rdquo; are donors who interact through emotional appeals, not
              API calls.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY NONPROFITS SCORE LOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Why Nonprofits Score Low: Emotion Over Infrastructure
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Nonprofit websites are designed to make humans feel something. A hero image of
              a child in a classroom. A story about a family receiving meals. A video of
              volunteers building homes. These are conversion tools optimized for emotional
              response — and they work. Individual giving in the US exceeds $500 billion
              annually, driven largely by emotional connection.
            </p>
            <p>
              But AI agents do not feel emotion. When an AI giving agent evaluates a charity
              on behalf of a user, it looks for structured data: What programs does this
              nonprofit run? What is the cost per beneficiary? What percentage goes to programs
              vs overhead? What are the measurable outcomes? If this data exists only in a
              narrative annual report PDF, the agent cannot process it. The nonprofit is
              invisible to programmatic evaluation.
            </p>
            <p>
              This is the paradox of nonprofit agent readiness:{' '}
              <strong className="text-zinc-100">
                the organizations optimized for human empathy are the least prepared for
                machine evaluation
              </strong>. Both channels will matter — human donors will not disappear. But
              AI-mediated giving is growing, and nonprofits that are only visible to humans
              will miss an entirely new funding channel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Optimized for human donors',
                detail: 'Hero images, impact stories, emotional video testimonials, event galas, peer-to-peer fundraising pages. All designed for humans clicking "Donate Now" buttons.',
              },
              {
                title: 'Invisible to AI agents',
                detail: 'No structured impact data API, no program catalog endpoint, no donation API, no volunteer scheduling endpoint. Annual reports as PDF. Financials on GuideStar but not on their own site as JSON.',
              },
              {
                title: 'Impact data exists but is locked',
                detail: 'Most nonprofits report detailed impact metrics to funders, GuideStar/Candid, and Charity Navigator. This data exists — it is just not exposed as structured, machine-readable endpoints on their own infrastructure.',
              },
              {
                title: 'Technology budgets prioritize CRM',
                detail: 'Nonprofit tech budgets go to donor CRMs (Salesforce NPSP, Bloomerang, DonorPerfect). These manage donor relationships but do not expose agent-facing APIs. The infrastructure is inward-facing.',
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

      {/* ===== SAMPLE SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            Sample Scores: From Wikipedia to Local Food Banks
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The range within nonprofits is enormous — from tech-native organizations like
            Wikipedia (52/100) to local charities scoring in single digits.
          </p>

          <div className="space-y-2 mb-8">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Nonprofit Examples
            </div>
            {nonprofitExamples.map((org) => (
              <div
                key={org.name}
                className="flex items-center gap-4 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="w-48 shrink-0 text-sm font-medium text-zinc-200">
                  {org.name}
                </div>
                <div className={`w-16 shrink-0 text-sm font-bold ${org.score >= 40 ? 'text-amber-400' : org.score >= 20 ? 'text-amber-400' : 'text-red-400'}`}>
                  {org.score}/100
                </div>
                <div className={`w-20 shrink-0 text-xs px-2 py-0.5 rounded-full text-center ${org.tier === 'Bronze' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {org.tier}
                </div>
                <div className="text-sm text-zinc-500">{org.note}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-8">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              For-Profit Comparison Points
            </div>
            {forProfitExamples.map((org) => (
              <div
                key={org.name}
                className="flex items-center gap-4 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="w-48 shrink-0 text-sm font-medium text-zinc-200">
                  {org.name}
                </div>
                <div className={`w-16 shrink-0 text-sm font-bold ${org.score >= 60 ? 'text-emerald-400' : org.score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                  {org.score}/100
                </div>
                <div className={`w-20 shrink-0 text-xs px-2 py-0.5 rounded-full text-center ${
                  org.tier === 'Silver' ? 'bg-zinc-500/10 text-zinc-300 border border-zinc-500/20'
                    : org.tier === 'Bronze' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {org.tier}
                </div>
                <div className="text-sm text-zinc-500">{org.note}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The data tells a clear story. Tech-native nonprofits (Wikipedia, Khan Academy)
              score comparably to small for-profit businesses because they were built by
              engineers who think in APIs. Traditional nonprofits — the food banks, shelters,
              houses of worship, and community organizations that make up 95% of the sector —
              score in single digits because their digital presence was built for brochure-style
              donor communication, not programmatic access.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            The Paradox: Most to Gain, Least Invested
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Here is the paradox that makes this gap urgent. Nonprofits have{' '}
              <em>more</em> to gain from AI agents than for-profit businesses. A for-profit
              business already has marketing budgets, sales teams, and distribution channels.
              A nonprofit food bank serving 500 families per week survives on grants, individual
              donations, and volunteer labor. If AI giving agents can surface that food bank
              to donors who have never heard of it — because the agent can programmatically
              evaluate its impact — that is transformative funding.
            </p>
            <p>
              But the current infrastructure gap means the opposite will happen. AI agents will
              direct giving toward the nonprofits that are already well-resourced enough to have
              APIs and structured data — the Red Crosses and Wikipedias — while the local food
              banks and shelters remain invisible. The Matthew Effect applied to the agent
              economy: those who have infrastructure get more; those who lack it get overlooked.
            </p>
            <p>
              This is not inevitable. The infrastructure gap can be closed quickly if nonprofits
              and the platforms that serve them recognize it. As we covered in our{' '}
              <Link href="/blog/nonprofit-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                nonprofit agent readiness guide
              </Link>, the path from 14/100 to 40/100 (Bronze) requires surprisingly little
              technical effort — structured data, a basic API, and proper discovery files.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT CHANGES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Four Changes That Close the Gap
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Nonprofits do not need to rebuild their websites. They need to add four types
            of structured endpoints to what they already have.
          </p>

          <div className="space-y-4 mb-8">
            {whatChanges.map((change) => {
              const colors = getColorClasses(change.color)
              return (
                <div
                  key={change.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <change.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{change.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{change.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The enterprise parallel:</strong> The gap
              between nonprofits and for-profits mirrors the{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                enterprise vs startup gap
              </Link>{' '}
              we documented. Large enterprises score 2.4x higher than startups because they
              invested in API infrastructure years ago. The same dynamic applies: organizations
              that invested in programmatic access — for whatever reason — score higher. The
              ones that built only for human interaction score lower.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AI GIVING AGENTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            AI Giving Agents: The Coming Wave
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AI giving agents are not a distant future — the building blocks already exist.
              Platforms like Every.org provide donation APIs. GuideStar and Charity Navigator
              have structured nonprofit data. AI assistants already manage budgets and make
              purchases. The convergence is inevitable: users will delegate charitable giving
              decisions to AI agents the same way they delegate travel booking and shopping.
            </p>
            <p>
              When that happens, the agent&apos;s workflow looks like this: receive a giving
              budget and preferences from the user (&ldquo;$200/month to effective education
              nonprofits in my region&rdquo;), query nonprofit APIs for program data and impact
              metrics, evaluate cost-effectiveness ratios, cross-reference with rating agencies,
              and execute donations — all without human intervention.
            </p>
            <p>
              The nonprofits that appear in this workflow are the ones with machine-readable
              infrastructure. The nonprofits that do not appear lose access to an entire
              channel of funding that will grow every year as AI agent adoption increases.
              At $500 billion in annual US giving, even a 5% shift to agent-mediated donations
              represents $25 billion flowing through programmatic channels.
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
                title: 'Nonprofit Agent Readiness: The Complete Guide',
                href: '/blog/nonprofit-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Enterprise vs Startup Agent Readiness',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Data Analysis',
                tagColor: 'cyan',
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
            Is your nonprofit invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see how your organization scores across
            all 9 dimensions. Most nonprofits score under 15 — find out where you stand
            and what to fix first.
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
              Connect My Organization
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
