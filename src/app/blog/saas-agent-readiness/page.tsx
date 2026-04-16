import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  Layers,
  Lock,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  User,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Most SaaS Companies Score Bronze for Agent Readiness | AgentHermes',
  description:
    'We scanned 500 businesses. 50% scored Bronze. Here is why SaaS companies with great APIs still fail at agent readiness — and what the top 10% do differently.',
  openGraph: {
    title: 'Why Most SaaS Companies Score Bronze for Agent Readiness',
    description:
      'Data from 500 scans reveals why even Stripe only scores 68/100.',
    url: 'https://agenthermes.ai/blog/saas-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Most SaaS Companies Score Bronze for Agent Readiness — AgentHermes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Most SaaS Companies Score Bronze for Agent Readiness',
    description:
      'Data from 500 scans. The average is 43/100.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/saas-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Tier Distribution Data
// ---------------------------------------------------------------------------

const tierData = [
  { tier: 'Platinum', range: '90+', count: 0, pct: 0, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
  { tier: 'Gold', range: '75-89', count: 1, pct: 0.2, color: 'bg-yellow-500', textColor: 'text-yellow-400' },
  { tier: 'Silver', range: '60-74', count: 51, pct: 10, color: 'bg-zinc-300', textColor: 'text-zinc-300' },
  { tier: 'Bronze', range: '40-59', count: 250, pct: 50, color: 'bg-amber-600', textColor: 'text-amber-500' },
  { tier: 'Not Scored', range: '0-39', count: 198, pct: 40, color: 'bg-red-500', textColor: 'text-red-400' },
]

// ---------------------------------------------------------------------------
// Leaderboard Data
// ---------------------------------------------------------------------------

const topSaaS = [
  { name: 'Resend', score: 75, tier: 'Gold', tierColor: 'text-yellow-400', tierBg: 'bg-yellow-500/10 border-yellow-500/20' },
  { name: 'Vercel', score: 70, tier: 'Silver', tierColor: 'text-zinc-300', tierBg: 'bg-zinc-500/10 border-zinc-500/20' },
  { name: 'Supabase', score: 69, tier: 'Silver', tierColor: 'text-zinc-300', tierBg: 'bg-zinc-500/10 border-zinc-500/20' },
  { name: 'Slack', score: 68, tier: 'Silver', tierColor: 'text-zinc-300', tierBg: 'bg-zinc-500/10 border-zinc-500/20' },
  { name: 'Stripe', score: 68, tier: 'Silver', tierColor: 'text-zinc-300', tierBg: 'bg-zinc-500/10 border-zinc-500/20' },
  { name: 'GitHub', score: 67, tier: 'Silver', tierColor: 'text-zinc-300', tierBg: 'bg-zinc-500/10 border-zinc-500/20' },
]

// ---------------------------------------------------------------------------
// Dimension Data
// ---------------------------------------------------------------------------

const dimensions = [
  { id: 'D1', label: 'Discoverability', weight: 0.12, icon: Globe },
  { id: 'D2', label: 'API Quality', weight: 0.15, icon: Zap },
  { id: 'D3', label: 'Onboarding', weight: 0.08, icon: User },
  { id: 'D4', label: 'Pricing Transparency', weight: 0.05, icon: CreditCard },
  { id: 'D5', label: 'Payment', weight: 0.08, icon: CreditCard },
  { id: 'D6', label: 'Data Quality', weight: 0.10, icon: Layers },
  { id: 'D7', label: 'Security', weight: 0.12, icon: Shield },
  { id: 'D8', label: 'Reliability', weight: 0.13, icon: Server },
  { id: 'D9', label: 'Agent Experience', weight: 0.10, icon: Sparkles },
]

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

const faqs = [
  {
    q: 'What is an Agent Readiness Score?',
    a: 'An Agent Readiness Score measures how well a business can be discovered, understood, and transacted with by AI agents. It is scored 0-100 across 9 dimensions including API quality, security, onboarding, and pricing transparency. Think of it as a FICO score for the agent economy — the higher you score, the more likely agents are to choose your product over a competitor.',
  },
  {
    q: 'Why does the average SaaS company only score 43?',
    a: 'Most SaaS companies were built for human users, not AI agents. They have login-gated dashboards, pricing pages that require clicking through marketing copy, and onboarding flows that assume a human is clicking buttons. An excellent API is necessary but not sufficient — agents also need machine-readable discovery, transparent pricing, and programmatic onboarding. These are the dimensions where even well-built SaaS products collapse.',
  },
  {
    q: 'What is the difference between Bronze and Silver tier?',
    a: 'Bronze (40-59) means agents can find your product and partially interact with it, but significant friction points block a full agent workflow. Silver (60-74) means an authenticated agent can complete most tasks end-to-end. The jump from Bronze to Silver typically requires fixing onboarding (D3) and pricing transparency (D4) — the two universal weak dimensions across SaaS.',
  },
  {
    q: 'How can my SaaS company improve its score?',
    a: 'Start with the highest-ROI changes: publish an agent-card.json file and llms.txt for discovery (D1), expose pricing via a structured API endpoint or Schema.org markup (D4), and add a programmatic signup or sandbox creation flow (D3). These three changes alone can move most SaaS products from Bronze into Silver. Run a free scan at agenthermes.ai/audit to see your exact dimension breakdown.',
  },
  {
    q: 'Why is Resend the only Gold-tier SaaS product?',
    a: 'Resend scores 75 because it was designed API-first from day one. Its documentation is machine-readable, pricing is transparent and structured, onboarding is fully programmatic (create an account and send your first email via API in under 60 seconds), and its error responses are clean JSON with typed error codes. Resend does not have a better API than Stripe — it has a better agent experience across all 9 dimensions simultaneously.',
  },
]

// ---------------------------------------------------------------------------
// TOC sections
// ---------------------------------------------------------------------------

const tocSections = [
  { id: 'the-numbers', label: 'The Numbers' },
  { id: 'tier-breakdown', label: 'Tier Breakdown' },
  { id: 'leaderboard', label: 'SaaS Leaderboard' },
  { id: 'universal-weakness', label: 'The Universal Weakness' },
  { id: 'nine-dimensions', label: 'The 9 Dimensions' },
  { id: 'bronze-trap', label: 'The Bronze Trap' },
  { id: 'what-silver-does', label: 'What Silver Does Differently' },
  { id: 'path-to-gold', label: 'The Path to Gold' },
  { id: 'faq', label: 'FAQ' },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SaaSAgentReadinessPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Most SaaS Companies Score Bronze for Agent Readiness',
    description:
      'Data from 500 business scans reveals why the average Agent Readiness Score is just 43/100 and what the top 10% of SaaS companies do differently.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/saas-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Research',
    wordCount: 1800,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'SaaS Agent Readiness',
          item: 'https://agenthermes.ai/blog/saas-agent-readiness',
        },
      ],
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <BlogArticleWrapper
      title="Why Most SaaS Companies Score Bronze for Agent Readiness"
      shareUrl="https://agenthermes.ai/blog/saas-agent-readiness"
      currentHref="/blog/saas-agent-readiness"
      related={[
        {
          title: 'Why Stripe Scores 68 Silver',
          href: '/blog/why-stripe-scores-68',
          tag: 'Case Study',
          tagColor: 'blue',
        },
        {
          title: 'Agent Readiness Levels Explained',
          href: '/blog/arl-levels-explained',
          tag: 'Framework',
          tagColor: 'purple',
        },
        {
          title: 'State of Agent Readiness: Most Businesses Score Under 40',
          href: '/report/state-of-readiness',
          tag: 'Research',
          tagColor: 'emerald',
        },
      ]}
    >
      <div className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              <span className="text-zinc-400">SaaS Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <TrendingUp className="h-3.5 w-3.5" />
                Research
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                500 Businesses Scanned
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-semibold">
                9 Dimensions
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Why Most SaaS Companies Score{' '}
              <span className="text-amber-500">Bronze</span>{' '}
              for Agent Readiness
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-8">
              We scanned 500 businesses across every vertical. The average Agent Readiness Score is{' '}
              <strong className="text-zinc-100">43 out of 100</strong>. Half scored Bronze. Zero scored
              Platinum. Even Stripe &mdash; one of the best APIs ever built &mdash; only manages 68.
              Here is what the data says about why SaaS companies with world-class APIs still fail
              at agent readiness.
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
                    10 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TABLE OF CONTENTS (desktop sidebar) ===== */}
        <div className="hidden xl:block fixed right-[max(1rem,calc((100vw-64rem)/2-14rem))] top-28 w-52 z-20">
          <nav className="toc-sidebar">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-3 pl-3">On this page</div>
            {tocSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="block">
                {section.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ===== THE NUMBERS ===== */}
        <section id="the-numbers" className="pb-12 sm:pb-16 border-t border-zinc-800/50 scroll-mt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-emerald-500" />
              The Numbers: 500 Scans, One Uncomfortable Truth
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <div className="text-3xl font-bold text-zinc-100">500</div>
                <div className="text-xs text-zinc-500 mt-1">Businesses Scanned</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <div className="text-3xl font-bold text-amber-500">43</div>
                <div className="text-xs text-zinc-500 mt-1">Average Score</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <div className="text-3xl font-bold text-amber-600">50%</div>
                <div className="text-xs text-zinc-500 mt-1">Scored Bronze</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <div className="text-3xl font-bold text-yellow-400">1</div>
                <div className="text-xs text-zinc-500 mt-1">Reached Gold</div>
              </div>
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                We built the{' '}
                <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-2">
                  AgentHermes scanner
                </Link>{' '}
                to answer a simple question: if an AI agent tried to use your product today, how far would it
                get? Not &ldquo;can a developer integrate your API&rdquo; &mdash; that is a solved problem.
                The question is whether an autonomous agent can discover you, understand your offerings, sign
                up, connect, use the product, and pay for it &mdash; all without a human clicking through a UI.
              </p>
              <p>
                After 500 scans across SaaS, e-commerce, healthcare, restaurants, and local services, the
                answer is clear: the agent economy is not ready. The average score is <strong className="text-zinc-100">43
                out of 100</strong>, placing the typical business squarely in Bronze tier. The median is even
                lower. And this is not because the businesses we scanned are bad &mdash; many of them are
                industry leaders with excellent products and well-documented APIs.
              </p>
              <p>
                The problem is that &ldquo;great API&rdquo; and &ldquo;agent-ready&rdquo; are not the same
                thing. Agent readiness is a 9-dimension problem, and most companies are only solving two or
                three of them.
              </p>
            </div>
          </div>
        </section>

        {/* ===== TIER BREAKDOWN ===== */}
        <section id="tier-breakdown" className="pb-12 sm:pb-16 scroll-mt-20">
          <hr className="section-divider mb-12" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <Layers className="h-6 w-6 text-emerald-500" />
              Tier Breakdown: Where 500 Businesses Land
            </h2>

            <div className="space-y-3 mb-8">
              {tierData.map((row) => (
                <div key={row.tier} className="flex items-center gap-3">
                  <span className={`w-28 text-sm shrink-0 font-medium ${row.textColor}`}>
                    {row.tier}
                  </span>
                  <div className="flex-1 h-8 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color} flex items-center justify-end pr-3`}
                      style={{ width: `${Math.max(row.pct, 3)}%` }}
                    >
                      {row.pct >= 5 && (
                        <span className="text-xs font-bold text-white">{row.pct}%</span>
                      )}
                    </div>
                  </div>
                  <span className="w-20 text-right text-sm text-zinc-500 shrink-0">
                    {row.count} / 500
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The distribution tells a stark story. Half of all businesses we scanned &mdash; 250 out of
                500 &mdash; land in <strong className="text-amber-500">Bronze tier (40-59)</strong>. These are
                not invisible businesses. They have websites, APIs, and sometimes excellent documentation.
                But they have critical gaps that prevent an AI agent from completing a full workflow.
              </p>
              <p>
                Another 198 businesses (40%) scored below 40, landing in{' '}
                <strong className="text-red-400">Not Scored</strong> territory. These are businesses that
                an agent functionally cannot interact with at all. They might have a beautiful website,
                but if an agent cannot parse it, it might as well not exist.
              </p>
              <p>
                At the top, just 51 businesses (10%) reached{' '}
                <strong className="text-zinc-300">Silver</strong>, a single company achieved{' '}
                <strong className="text-yellow-400">Gold</strong>, and{' '}
                <strong className="text-emerald-400">Platinum</strong> remains empty. Nobody has cracked
                90 or above. The agent economy has no FICO-800 equivalents yet.
              </p>
            </div>
          </div>
        </section>

        {/* ===== LEADERBOARD ===== */}
        <section id="leaderboard" className="pb-12 sm:pb-16 scroll-mt-20">
          <hr className="section-divider mb-12" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              The SaaS Leaderboard: Who Scores Highest
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              These are the top-scoring SaaS products out of our 500-business dataset. Notice that even the
              best barely crack Silver &mdash; and only one has reached Gold. View the full rankings on
              the{' '}
              <Link href="/leaderboard" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-2">
                leaderboard
              </Link>.
            </p>

            <div className="space-y-3 mb-8">
              {topSaaS.map((company, i) => (
                <div
                  key={company.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50">
                    <span className="text-sm font-bold text-zinc-400">#{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-zinc-100">{company.name}</h3>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${company.tierBg} ${company.tierColor}`}>
                      {company.tier}
                    </span>
                    <div className="text-2xl font-bold text-zinc-100 w-10 text-right">{company.score}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-yellow-400">Resend</strong> sits alone at Gold with a score of 75.
                It is the only SaaS product in our dataset to cross the 75-point threshold. The reason is
                not that Resend has a better API than Stripe or GitHub &mdash; it is that Resend was built
                API-first with agent-friendly patterns baked into every dimension from day one.
              </p>
              <p>
                Below Resend, a cluster of Silver-tier titans tells an interesting story: Vercel (70),
                Supabase (69), Slack (68), Stripe (68), and GitHub (67). These are arguably the most
                developer-friendly companies in the world. And yet they are 7 to 8 points away from Gold.
                Why? Because{' '}
                <Link href="/blog/why-stripe-scores-68" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-2">
                  great developer experience does not automatically mean great agent experience
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE UNIVERSAL WEAKNESS ===== */}
        <section id="universal-weakness" className="pb-12 sm:pb-16 scroll-mt-20">
          <hr className="section-divider mb-12" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              The Universal Weakness: Onboarding and Pricing
            </h2>

            <div className="callout-box mb-8">
              <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2 !mt-0">
                <Target className="h-5 w-5" />
                The Pattern We Found in Every Vertical
              </h3>
              <div className="space-y-3 text-zinc-300 leading-relaxed text-sm">
                <p>
                  Across all 500 scans, two dimensions are consistently weak regardless of industry,
                  company size, or API quality:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-zinc-100">D3 Onboarding</strong> &mdash; Almost no SaaS product
                      allows fully programmatic account creation. Even companies with excellent APIs gate
                      signup behind email verification, CAPTCHA, or interactive onboarding wizards. An agent
                      cannot click &ldquo;I&apos;m not a robot.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-zinc-100">D4 Pricing Transparency</strong> &mdash; Pricing
                      lives on marketing pages as styled HTML, not as structured data. There is no{' '}
                      <code className="text-emerald-400 bg-zinc-800/50 px-1 py-0.5 rounded text-xs">
                        GET /v1/pricing
                      </code>{' '}
                      endpoint. Volume discounts are &ldquo;contact sales.&rdquo; An agent comparison-shopping
                      between three CRM platforms has to scrape three different HTML layouts and hope the
                      pricing has not changed since last week.
                    </span>
                  </li>
                </ul>
                <p>
                  These two dimensions drag down scores across the entire dataset. A SaaS product can have
                  a perfect API (D2: 95), bulletproof security (D7: 90), and five-nines reliability (D8: 95)
                  and still score Bronze because an agent cannot sign up or figure out how much it costs.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                This is the paradox at the heart of SaaS agent readiness: the companies that built the best
                APIs also built the most human-centric onboarding flows. They invested millions in
                interactive product tours, beautiful pricing pages with toggle switches, and signup flows
                with progressive disclosure. All of that is invisible to an agent. The better the human
                experience, the more likely it is hostile to machines.
              </p>
              <p>
                Consider Stripe. Its API documentation is a masterclass. Its developer experience scores
                90 in our D9 dimension. But ask an agent to create a Stripe account, pick a plan, and
                start processing payments &mdash; programmatically, without a human &mdash; and it
                hits a wall. Stripe requires human-driven signup with identity verification.
                The onboarding gate drops a world-class API into Silver.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE 9 DIMENSIONS ===== */}
        <section id="nine-dimensions" className="pb-12 sm:pb-16 scroll-mt-20">
          <hr className="section-divider mb-12" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-emerald-500" />
              How We Score: The 9 Dimensions
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Our v4 scoring engine uses a service-quality-first weighting model. API Quality (D2) carries the
              highest weight at 15%, followed by Reliability (D8) at 13% and Security (D7) at 12%. Here are
              all 9 dimensions and what they measure. For the full level-by-level framework, see{' '}
              <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-2">
                ARL Levels Explained
              </Link>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {dimensions.map((dim) => (
                <div
                  key={dim.id}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <dim.icon className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold text-zinc-400">{dim.id}</span>
                  </div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{dim.label}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-zinc-800">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500"
                        style={{ width: `${dim.weight * 100 * (100 / 15)}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">
                      {Math.round(dim.weight * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The weighting is deliberate: an agent that can call a clean API (D2), trust that it will
                respond (D8), and verify the connection is secure (D7) can work around weaker discovery or
                opaque pricing. But the reverse is not true &mdash; transparent pricing and easy discovery
                mean nothing if the API returns HTML error pages and drops connections.
              </p>
              <p>
                This is why Tier 1 dimensions (D2, D6, D7, D8, D9) account for 60% of the total score.
                Tier 2 (D1, D3, D4) accounts for 25%. Tier 3 (D5 plus the agent-native bonus for MCP,
                A2A, and agent-card.json) accounts for the remaining 15%. The formula rewards fundamentals
                first and agent-native innovation second.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE BRONZE TRAP ===== */}
        <section id="bronze-trap" className="pb-12 sm:pb-16 scroll-mt-20">
          <hr className="section-divider mb-12" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-amber-500" />
              The Bronze Trap: Why Good Companies Get Stuck
            </h2>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Bronze is not a failing grade. A score of 40-59 means an agent can find your product,
                partially understand what it does, and maybe call some API endpoints. That puts you ahead
                of 40% of the market. But Bronze is a trap because it feels like enough.
              </p>
              <p>
                The 250 Bronze-tier businesses in our dataset share a common profile: strong API quality
                (D2 averages 55-65), decent security (D7 averages 50-60), but cratering scores in
                onboarding (D3 typically under 35) and pricing (D4 typically under 30). They built the
                engine but forgot to build the on-ramp.
              </p>
              <p>
                Here is why this matters commercially: when an AI agent is comparison-shopping &mdash;
                &ldquo;find me the best email API for a startup&rdquo; &mdash; it can see all the Bronze
                products. It can read their API docs. But it cannot sign up, it cannot check pricing, and
                it cannot complete a transaction. So it skips to the Silver or Gold option where it can
                actually finish the job. Bronze is visible but not actionable. And in the agent economy,
                visibility without actionability is worthless.
              </p>
            </div>

            <div className="mt-8 p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-amber-400">The math of being stuck:</strong> 250 companies scored
                between 40 and 59. The jump from 59 (top of Bronze) to 60 (bottom of Silver) is just one
                point. But that one point typically requires fixing the exact dimensions companies find
                hardest to change: onboarding automation and pricing transparency. It is not a technical
                gap. It is a strategic one.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT SILVER DOES DIFFERENTLY ===== */}
        <section id="what-silver-does" className="pb-12 sm:pb-16 scroll-mt-20">
          <hr className="section-divider mb-12" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-zinc-300" />
              What the Top 10% Do Differently
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-8">
              The 51 Silver-tier companies and our single Gold-tier outlier share patterns that the other
              90% do not. None of these are revolutionary. They are simply the table stakes that most
              companies have not shipped yet.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'Structured error responses everywhere',
                  text: 'Every endpoint returns JSON with typed error codes, not HTML error pages. Even 401 Unauthorized responses include a machine-readable error body. Our scanner gives these APIs 87% of what an authenticated 200 response would score.',
                  icon: Zap,
                },
                {
                  title: 'Machine-readable discovery artifacts',
                  text: 'Published llms.txt, agent-card.json, or comprehensive OpenAPI specs at well-known URLs. An agent does not have to scrape documentation pages to understand what the product does.',
                  icon: Globe,
                },
                {
                  title: 'Programmatic sandbox or test mode',
                  text: 'Even if production accounts require KYC, Silver-tier companies offer API-driven test account creation. An agent can start evaluating the product without a human clicking through an onboarding wizard.',
                  icon: User,
                },
                {
                  title: 'Some form of pricing structure',
                  text: 'Published pricing in Schema.org markup, a dedicated pricing API, or at minimum well-structured HTML with consistent CSS selectors. Not perfect, but parseable. The bar is low — most companies do not clear it.',
                  icon: CreditCard,
                },
                {
                  title: 'Consistent, versioned API design',
                  text: 'Proper pagination, consistent field naming, ISO timestamps, and API versioning headers. These are developer experience basics, but they matter even more when the developer is a machine that cannot guess at inconsistencies.',
                  icon: Layers,
                },
                {
                  title: 'Rate limit headers and status pages',
                  text: 'Silver-tier products tell agents how fast they can call the API and whether the service is currently healthy. These signals let agents make real-time decisions about which services to use.',
                  icon: Server,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The pattern is clear: Silver-tier companies do not have fundamentally better APIs than
                Bronze-tier ones. They have <em className="text-zinc-200">more complete</em> APIs.
                They close the gaps in the dimensions that most companies ignore. They publish the metadata
                that makes agents self-sufficient. The difference between the 50th percentile and the 90th
                percentile is not brilliance &mdash; it is coverage.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PATH TO GOLD ===== */}
        <section id="path-to-gold" className="pb-12 sm:pb-16 scroll-mt-20">
          <hr className="section-divider mb-12" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              The Path from Bronze to Gold
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Based on what we see in the data, here is the highest-ROI roadmap for a typical Bronze-tier
              SaaS product to reach Gold. These are ordered by impact-per-effort.
            </p>

            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Publish agent-card.json and llms.txt',
                  impact: '+5-10 points on D1 Discovery',
                  effort: 'One afternoon',
                  detail: 'A static JSON file at /.well-known/agent-card.json and a plain-text llms.txt at the site root. Zero code changes, zero risk. This is the single highest-ROI improvement any SaaS company can make for agent readiness today.',
                },
                {
                  step: '2',
                  title: 'Add a pricing API or structured pricing markup',
                  impact: '+10-20 points on D4 Pricing Transparency',
                  effort: 'One sprint',
                  detail: 'Either a dedicated /v1/pricing endpoint returning JSON with plan names, prices, and feature lists, or Schema.org Product/Offer markup on the existing pricing page. Agents need to comparison-shop, and they cannot parse your beautifully designed pricing toggle.',
                },
                {
                  step: '3',
                  title: 'Enable programmatic sandbox creation',
                  impact: '+10-15 points on D3 Onboarding',
                  effort: 'One to two sprints',
                  detail: 'An API endpoint that creates a test or sandbox account and returns API credentials. Even if production accounts require human verification, a sandbox lets agents evaluate your product. This is the gate that keeps Stripe, GitHub, and Slack stuck in Silver.',
                },
                {
                  step: '4',
                  title: 'Ensure all error responses are structured JSON',
                  impact: '+5-10 points across D2, D6, D9',
                  effort: 'One sprint',
                  detail: 'Audit every endpoint — including auth failures, 404s, and 500s — to return JSON with a machine-readable error type, a human-readable message, and a documentation URL. A structured 401 is worth 87% of a 200 in our scoring engine. An HTML error page is worth nearly zero.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-zinc-100 mb-1">{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs text-emerald-400 font-medium">{item.impact}</span>
                        <span className="text-xs text-zinc-600">|</span>
                        <span className="text-xs text-zinc-500">{item.effort}</span>
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">Combined impact:</strong> A Bronze-tier SaaS product
                that ships all four of these changes could see a 30-55 point improvement across the weighted
                dimensions. That is enough to jump from Bronze (43) past Silver (60) and into Gold (75) territory.
                The work is not hard. The hard part is recognizing that agent readiness is not just an API problem.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="pb-12 sm:pb-16 scroll-mt-20">
          <hr className="section-divider mb-12" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="font-bold text-zinc-100 mb-3">{faq.q}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="pb-20 sm:pb-28">
          <hr className="section-divider mb-16" />
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Score your SaaS business free
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              See where you land across all 9 dimensions. Find out if you are Bronze, Silver, or
              the rare Gold. Get a specific roadmap to level up.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
              >
                Run My Free Scan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
              >
                View Full Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
