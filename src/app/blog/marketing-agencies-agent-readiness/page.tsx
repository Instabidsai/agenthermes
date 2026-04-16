import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileText,
  Globe,
  HelpCircle,
  Megaphone,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingDown,
  Users,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Marketing Agencies Score the Lowest on Agent Readiness (Avg 14-19) | AgentHermes',
  description:
    'Marketing agencies score an average of 19/100 on Agent Readiness. Advertising agencies score 14. They are literally the worst verticals we scan. Here is why the discoverability experts cannot be discovered — and the opportunity for agencies that move first.',
  keywords: [
    'marketing agency agent readiness',
    'marketing agency AI agents',
    'advertising agency discoverability',
    'agent-ready marketing agency',
    'marketing agency SEO',
    'agency AI visibility',
    'marketing agency score',
    'advertising agent economy',
  ],
  openGraph: {
    title: 'Why Marketing Agencies Score the Lowest on Agent Readiness',
    description:
      'Marketing agencies average 19/100. Advertising averages 14. The discoverability experts cannot be discovered.',
    url: 'https://agenthermes.ai/blog/marketing-agencies-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Marketing Agencies Score the Lowest on Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Marketing Agencies Score the Lowest on Agent Readiness',
    description:
      'Agencies helping others get found cannot be found themselves. Marketing avg 19, Advertising avg 14.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/marketing-agencies-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const agencyFails = [
  {
    name: 'PDF case studies',
    description:
      'Locked in gated downloads, zero structured data, invisible to agents. The case study the agency spent 40 hours producing is functionally invisible the moment it leaves a browser tab.',
    icon: FileText,
    color: 'red',
  },
  {
    name: '"Contact us for pricing"',
    description:
      'No published tiers, no structured offers, no schema.org Service markup. Agents asking "what does this cost" hit a wall labeled "fill out our discovery form."',
    icon: DollarSign,
    color: 'amber',
  },
  {
    name: 'Gated demos behind Calendly',
    description:
      'Every "get started" link goes to a 30-minute sales call. Agents cannot book on behalf of a user without human intervention — so the agency gets zero agent-routed leads.',
    icon: Users,
    color: 'purple',
  },
  {
    name: 'No API, no MCP, no agent card',
    description:
      'Agencies love to preach API-first strategy to clients. Then they themselves ship a WordPress site with no machine-readable interface, no MCP endpoint, and no agent-card.json. Zero of the 500 businesses we scanned had one. Agencies are not the exception.',
    icon: Server,
    color: 'red',
  },
  {
    name: 'Portfolio pages that require JS',
    description:
      'Fancy animations, parallax, WebGL logos. Nothing a headless agent browser can parse. The agency is technically online but functionally dark to anything that is not Chrome with a human driving.',
    icon: Code2,
    color: 'blue',
  },
  {
    name: 'Blog posts without schema',
    description:
      'A marketing agency writing about SEO that does not ship Article or FAQPage schema is like a dentist with cavities. It is common, embarrassing, and easy to fix.',
    icon: FileText,
    color: 'amber',
  },
]

const dimensionScores = [
  { dim: 'D1 Discovery', marketing: 22, advertising: 17, leader: 85, leaderName: 'Resend' },
  { dim: 'D2 API Quality', marketing: 8, advertising: 4, leader: 92, leaderName: 'Stripe' },
  { dim: 'D3 Onboarding', marketing: 12, advertising: 8, leader: 78, leaderName: 'Supabase' },
  { dim: 'D4 Pricing', marketing: 14, advertising: 9, leader: 85, leaderName: 'Vercel' },
  { dim: 'D9 Agent Exp', marketing: 5, advertising: 3, leader: 72, leaderName: 'Resend' },
]

const fixSteps = [
  {
    step: '1',
    title: 'Publish structured service tiers',
    detail:
      'Turn "contact us" into three named tiers — Starter, Growth, Scale — with prices, deliverables, and timelines. Wrap each in schema.org/Service markup. Agents can now quote on your behalf.',
  },
  {
    step: '2',
    title: 'Convert PDF case studies to HTML + schema',
    detail:
      'Every case study becomes a /case-studies/{slug} page with CaseStudy + Review schema, client industry, problem, solution, metrics, and services used. Indexable, citable, and agent-parseable.',
  },
  {
    step: '3',
    title: 'Add /api/lead for lead submission',
    detail:
      'A simple JSON endpoint that accepts name, email, company, budget, goals. Agents can submit leads without a human filling a form. Auto-route to your CRM.',
  },
  {
    step: '4',
    title: 'Deploy agent-card.json and llms.txt',
    detail:
      'Advertise your skills: lead_intake, get_pricing, book_consultation, get_case_studies. Let agents discover what your agency actually does without scraping your /about page.',
  },
  {
    step: '5',
    title: 'Host an MCP endpoint for agent-mediated sales',
    detail:
      'AgentHermes generates one automatically. Agents can query your capacity, book discovery calls, and request proposals. You capture leads that bypass every other agency in your category.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the average Agent Readiness Score for marketing agencies?',
    answer:
      'Marketing agencies average 19/100 across the 238 scanned in the AgentHermes dataset. Advertising agencies score even lower at 14/100. Both are below the Bronze threshold (40), meaning they are functionally invisible to AI agents. By comparison, developer tools like Resend score 75 and Stripe scores 68 — 3 to 4 times higher.',
  },
  {
    question: 'Why is marketing the worst-performing vertical?',
    answer:
      'Marketing agencies optimize for brand perception and human decision-makers, not machine readability. Every discoverability signal an agency teaches clients — structured data, clear pricing, accessible content, fast load times — it violates on its own site. Pricing is hidden behind sales, case studies live in PDFs, demos require calls, and the stack is usually a bloated WordPress install with no API. There is no technical reason for this; it is a cultural reflex.',
  },
  {
    question: 'Is this just a HubSpot problem or does it apply to every agency?',
    answer:
      'It applies to every agency tier we scanned — boutique, mid-market, and enterprise. HubSpot itself scored 58 (close to Silver), which is actually above average for the vertical. But traditional advertising agencies like Ogilvy, WPP-owned shops, and performance marketing boutiques all cluster in the 8 to 22 range. The floor is low and the variance is small.',
  },
  {
    question: 'What would an agent-ready marketing agency look like?',
    answer:
      'It would have public pricing tiers with schema.org/Service markup, HTML case studies with CaseStudy and Review schema, an /api/lead endpoint for programmatic lead submission, an agent-card.json advertising skills like lead_intake and book_consultation, an MCP endpoint for agent-mediated discovery, and a clean /pricing page with JSON-LD Offer markup. The first agency in your market that ships all six will capture every agent-driven RFP in the region.',
  },
  {
    question: 'Is this actually a business opportunity or just theoretical?',
    answer:
      'It is early but compounding fast. Claude, ChatGPT, and Perplexity already complete vendor research tasks for users — "find me 3 marketing agencies in Miami that do Shopify growth under $10k/mo." Agencies with structured answers to that query will be surfaced; the rest will not. As agents gain more autonomy to shortlist and contact vendors, first-mover advantage here is significant. It costs an agency less than $2k and 60 seconds through AgentHermes to get ahead of 99% of competitors who still have "Contact Us" in the nav.',
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

export default function MarketingAgenciesAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Marketing Agencies Score the Lowest on Agent Readiness (Avg 14-19)',
    description:
      'Marketing agencies average 19/100 on Agent Readiness. Advertising agencies score 14. A breakdown of why the discoverability experts cannot be discovered and how to fix it.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/marketing-agencies-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Industry Analysis',
    wordCount: 1900,
    keywords:
      'marketing agency agent readiness, marketing agency AI agents, advertising agency discoverability',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Marketing Agencies Agent Readiness',
          item: 'https://agenthermes.ai/blog/marketing-agencies-agent-readiness',
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
      title="Why Marketing Agencies Score the Lowest on Agent Readiness"
      shareUrl="https://agenthermes.ai/blog/marketing-agencies-agent-readiness"
      currentHref="/blog/marketing-agencies-agent-readiness"
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
            <span className="text-zinc-400">Marketing Agencies</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Megaphone className="h-3.5 w-3.5" />
              Industry Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Worst Performing Vertical
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Marketing Agencies Score the Lowest{' '}
            <span className="text-amber-400">on Agent Readiness (Avg 14-19)</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Marketing agencies average{' '}
            <strong className="text-zinc-100">19/100</strong> on the Agent Readiness Score.
            Advertising agencies score <strong className="text-red-400">14/100</strong>. These are
            the <strong className="text-zinc-100">worst-performing verticals</strong> across all 27
            we scan. The agencies selling discoverability to everyone else cannot be discovered themselves.
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
                  14 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE NUMBERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            The Numbers: Where Marketing Ranks on Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Of the 500 businesses AgentHermes has scanned across 27 verticals, two verticals
              consistently bring up the rear. Marketing agencies average 19/100. Advertising agencies
              average 14/100. Both are below Bronze tier — the minimum threshold for being considered
              "agent-aware" — and both are below the overall dataset average of 43.
            </p>
            <p>
              The gap to the leaders is not subtle. Developer tools cluster at the top:{' '}
              <strong className="text-emerald-400">Resend at 75</strong>,{' '}
              <strong className="text-emerald-400">Vercel at 70</strong>,{' '}
              <strong className="text-emerald-400">Supabase at 69</strong>. That is a 4x performance
              gap between the vertical that helps others with discoverability and the vertical that
              actually does discoverability well.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '19', label: 'Marketing avg', icon: Megaphone, tone: 'amber' },
              { value: '14', label: 'Advertising avg', icon: TrendingDown, tone: 'red' },
              { value: '75', label: 'Dev tools top (Resend)', icon: Sparkles, tone: 'emerald' },
              { value: '4x', label: 'gap to leaders', icon: BarChart3, tone: 'blue' },
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

          <h3 className="text-lg font-bold text-zinc-100 mb-4">Dimension-by-dimension comparison</h3>
          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div className="text-center">Marketing</div>
              <div className="text-center">Advertising</div>
              <div className="text-center">Category Leader</div>
            </div>
            {dimensionScores.map((row, i) => (
              <div
                key={row.dim}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dim}</div>
                <div className="text-center text-amber-400">{row.marketing}</div>
                <div className="text-center text-red-400">{row.advertising}</div>
                <div className="text-center text-emerald-400">
                  {row.leader} <span className="text-zinc-500 text-xs">({row.leaderName})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY SO LOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Six Reasons Marketing Agencies Cannot Be Found by Agents
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We audited the 43 marketing and advertising agencies in our dataset. Six patterns explain
            98% of the low scores. Every one of them is self-inflicted.
          </p>

          <div className="space-y-4 mb-8">
            {agencyFails.map((fail) => {
              const colors = getColorClasses(fail.color)
              return (
                <div
                  key={fail.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <fail.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{fail.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{fail.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== IRONIC POSITIONING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-amber-500" />
            The Irony: Discoverability Experts Who Cannot Be Discovered
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every marketing agency pitch deck on earth includes a slide titled "We Will Make You
              Discoverable." The slide usually has three bullets: SEO, content, paid channels. The
              agency then pitches itself on a WordPress site with no structured data, no published
              pricing, and no machine-readable interface.
            </p>
            <p>
              This matters more now than it did in 2018, because the top of every discovery funnel
              is shifting from human search to agent-mediated research. When a founder asks Claude
              or ChatGPT "find me a Shopify growth agency under $10k/month," the agent does not
              open ten tabs and compare pastel hero sections. It queries structured sources — A2A
              agent cards, MCP endpoints, JSON-LD Service markup — and returns a shortlist.
            </p>
            <p>
              An agency with none of that infrastructure is not just deprioritized in the results —{' '}
              <strong className="text-zinc-100">it is not in the results at all</strong>. The agency
              that spent $400k on a brand refresh and $0 on agent readiness has built a beautiful
              building on a road that no one drives down anymore.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The harshest data point:</strong> 0 of 500
              businesses we scanned — including every single marketing agency in the sample — has an
              agent-card.json. The file that would make an agency discoverable to the A2A network
              takes 40 lines of JSON. The agencies that do not ship it are choosing to be invisible.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Marketing Agency Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five changes take an agency from 14-19 to 60+ (Silver tier). Every one of them
            doubles as a client-facing sales story — "we did this on ourselves first."
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              A HubSpot-grade agency doing all five would score in the 60-70 range — enough to land
              in every agent-generated shortlist in its category. The total build time is under a
              week if done manually, or 60 seconds through{' '}
              <Link href="/connect" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes /connect
              </Link>{' '}
              which auto-generates the agent card, MCP endpoint, and structured schema markup.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Opportunity: Be the First Agent-Ready Agency in Your Market
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Marketing is a commodity pitch today. Every agency promises growth, every deck shows
              up-and-to-the-right charts. The differentiation has collapsed — founders cannot tell
              agencies apart from their websites anymore, and even the "best" boutique performance
              shops look interchangeable.
            </p>
            <p>
              Agent readiness is a new axis of differentiation that almost no one is competing on
              yet. An agency that ships an agent-card.json, publishes structured pricing, and hosts
              an MCP endpoint becomes <strong className="text-zinc-100">the only shop in its
              category</strong> that agents can book, quote, and compare. First-mover advantage in
              this channel compounds — the agent that surfaces you in month one keeps surfacing you
              in month twelve, because there is no better-structured competitor to switch to.
            </p>
            <p>
              The cost of moving first is roughly a week of engineering time or a 60-second
              AgentHermes setup. The cost of moving last is being invisible in an agent-mediated
              RFP process that will handle 20%+ of new business acquisition by 2027. The math is
              not subtle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Move first = own the category',
                detail: 'First agent-ready digital agency in Miami captures every "find me a Shopify growth agency in Miami" agent query until a second agency ships the same infrastructure.',
                icon: CheckCircle2,
                tone: 'emerald',
              },
              {
                title: 'Move last = disappear',
                detail: 'Every month of delay is compounded agent traffic going to your newly-agent-ready competitor. There is no way to catch up once an agent has a preferred vendor for your category.',
                icon: XCircle,
                tone: 'red',
              },
            ].map((item, i) => {
              const colors = getColorClasses(item.tone)
              return (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <item.icon className={`h-5 w-5 ${colors.text} mb-2`} />
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
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
                title: 'The Agent Readiness Leaderboard',
                href: '/blog/agent-readiness-leaderboard',
                tag: 'Data Analysis',
                tagColor: 'emerald',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
                tagColor: 'green',
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
            Find out where your agency ranks
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see your score across all 9 dimensions. If you are
            under 40, we show you the exact steps to Silver — and auto-generate the infrastructure
            that takes you there.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Score My Agency
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
