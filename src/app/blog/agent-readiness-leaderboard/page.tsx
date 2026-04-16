import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Crown,
  Globe,
  HelpCircle,
  Layers,
  Medal,
  Shield,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'The Agent Readiness Leaderboard: Who Is Winning and Who Is Invisible | AgentHermes',
  description:
    'The definitive 2026 ranking of businesses by Agent Readiness Score. Data from 500 scans: top 15 leaders, industry comparisons, the 60-point cliff between Silver and Bronze, and what separates the visible from the invisible.',
  openGraph: {
    title: 'The Agent Readiness Leaderboard: Who Is Winning and Who Is Invisible',
    description:
      'The definitive 2026 ranking of businesses by Agent Readiness Score. Data from 500 scans across every major vertical.',
    url: 'https://agenthermes.ai/blog/agent-readiness-leaderboard',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agent Readiness Leaderboard 2026 — AgentHermes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Agent Readiness Leaderboard: Who Is Winning and Who Is Invisible',
    description:
      'The definitive 2026 ranking. 500 businesses scanned. Only 1 Gold. Zero Platinum. Here is who leads and who lags.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-readiness-leaderboard',
  },
}

// ---------------------------------------------------------------------------
// Leaderboard Data
// ---------------------------------------------------------------------------

const topFifteen = [
  { rank: 1, name: 'Resend', score: 75, tier: 'Gold', tierColor: 'yellow', category: 'Email API', highlight: 'Only Gold-tier business. Consistent across all 9 dimensions. Lowest dimension: 65 (Payment).' },
  { rank: 2, name: 'Agora', score: 72, tier: 'Silver', tierColor: 'zinc', category: 'Real-Time Communication', highlight: 'Strong SDKs in 10+ languages. Loses points on pricing complexity and onboarding friction.' },
  { rank: 3, name: 'Vercel', score: 70, tier: 'Silver', tierColor: 'zinc', category: 'Developer Platform', highlight: 'Clean developer experience. No agent-card.json or llms.txt. Agent discovery is the gap.' },
  { rank: 4, name: 'Statuspage', score: 70, tier: 'Silver', tierColor: 'zinc', category: 'Status Monitoring', highlight: 'Public status APIs are inherently agent-friendly. Simple, predictable data structures.' },
  { rank: 5, name: 'TikTok', score: 69, tier: 'Silver', tierColor: 'zinc', category: 'Social Media', highlight: 'Surprisingly strong API docs for a consumer platform. Complex onboarding is the bottleneck.' },
  { rank: 6, name: 'Supabase', score: 69, tier: 'Silver', tierColor: 'zinc', category: 'Database Platform', highlight: 'Has an MCP server (rare). Strong API quality. Agent-native bonus pushes the score.' },
  { rank: 7, name: 'Slack', score: 68, tier: 'Silver', tierColor: 'zinc', category: 'Communication', highlight: 'Excellent API documentation and SDKs. OAuth2 for agent delegation. Pricing complexity hurts.' },
  { rank: 8, name: 'Stripe', score: 68, tier: 'Silver', tierColor: 'zinc', category: 'Payment Infrastructure', highlight: 'Best API quality of any business scanned (D2: 90). Pricing transparency (D4: 45) drags the average.' },
  { rank: 9, name: 'GitHub', score: 67, tier: 'Silver', tierColor: 'zinc', category: 'Developer Platform', highlight: 'Rich API ecosystem. Onboarding requires human-driven signup. No agent-card.json.' },
  { rank: 10, name: 'Twilio', score: 66, tier: 'Silver', tierColor: 'zinc', category: 'Communication API', highlight: 'Strong API quality and documentation. Complex pricing calculator hurts D4.' },
  { rank: 11, name: 'SendGrid', score: 65, tier: 'Silver', tierColor: 'zinc', category: 'Email API', highlight: 'Good API but less focused than Resend. More endpoints, more complexity, lower agent experience.' },
  { rank: 12, name: 'Cloudflare', score: 64, tier: 'Silver', tierColor: 'zinc', category: 'Infrastructure', highlight: 'Strong API and reliability. Wide product surface makes it harder for agents to navigate.' },
  { rank: 13, name: 'Auth0', score: 63, tier: 'Silver', tierColor: 'zinc', category: 'Identity', highlight: 'Excellent security dimension. Onboarding complexity and pricing opacity limit the score.' },
  { rank: 14, name: 'Datadog', score: 62, tier: 'Silver', tierColor: 'zinc', category: 'Observability', highlight: 'Strong API docs. Usage-based pricing is hard for agents to evaluate without a pricing endpoint.' },
  { rank: 15, name: 'PagerDuty', score: 61, tier: 'Silver', tierColor: 'zinc', category: 'Incident Management', highlight: 'Clean REST API with good error handling. Limited agent discovery and no MCP server.' },
]

const bottomFive = [
  { rank: 496, name: 'Local Plumber (avg)', score: 12, category: 'Local Services', reason: 'Website-only presence with phone number. No API, no structured data, no booking system.' },
  { rank: 497, name: 'Toast', score: 12, category: 'Restaurant Tech', reason: 'Closed ecosystem. No public API for agent interaction. Merchant-facing only.' },
  { rank: 498, name: 'Cash App', score: 12, category: 'Consumer Finance', reason: 'Consumer app with no developer API. Agents cannot interact at all.' },
  { rank: 499, name: 'Square (legacy)', score: 8, category: 'Payment Processing', reason: 'Legacy Square sites have minimal structured data. Modern Square API scores higher when used directly.' },
  { rank: 500, name: 'Local Restaurant (avg)', score: 6, category: 'Food Service', reason: 'PDF menu, phone booking, no pricing online, Facebook page as primary web presence.' },
]

const industryAverages = [
  { industry: 'Developer Tools / API-first', avg: 58, count: 45, color: 'emerald' },
  { industry: 'SaaS / Cloud', avg: 52, count: 85, color: 'blue' },
  { industry: 'Communication Platforms', avg: 48, count: 30, color: 'cyan' },
  { industry: 'Finance / Payments', avg: 42, count: 40, color: 'amber' },
  { industry: 'Healthcare', avg: 33, count: 35, color: 'red' },
  { industry: 'E-commerce', avg: 28, count: 60, color: 'red' },
  { industry: 'Local Services', avg: 22, count: 90, color: 'red' },
  { industry: 'Marketing / Advertising', avg: 19, count: 50, color: 'red' },
]

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

const faqs = [
  {
    question: 'How often is the leaderboard updated?',
    answer:
      'We re-scan businesses continuously as our scanner improves and as businesses update their infrastructure. The leaderboard at agenthermes.ai/leaderboard reflects the most recent scan for each business. This blog post captures a snapshot of 500 businesses as of April 2026. Scores can change as businesses improve their agent readiness or as our scoring methodology evolves.',
  },
  {
    question: 'What is the 60-point cliff between Silver and Bronze?',
    answer:
      'The threshold between Silver (60+) and Bronze (40-59) represents the practical boundary between "an agent can use this business with some friction" and "an agent can find this business but cannot complete a task." Silver-tier businesses have enough structured data, API quality, and documentation that an agent can accomplish basic goals — even if some steps require human fallback. Bronze-tier businesses are visible but functionally unusable by agents. The 60-point line is where agent utility begins.',
  },
  {
    question: 'Why are developer tools and API-first companies at the top?',
    answer:
      'Developer tools score highest because their product IS an API. They have already solved the problems that other industries struggle with: structured data, clean documentation, programmatic onboarding, and transparent pricing. A business whose primary interface is an API starts with a natural advantage on 5 of our 9 dimensions (D2 API Quality, D6 Data Quality, D7 Security, D8 Reliability, D9 Agent Experience). The remaining dimensions — discovery, onboarding, pricing, and payment — are where even developer tools lose points.',
  },
  {
    question: 'How can my business get on the leaderboard?',
    answer:
      'Run a free scan at agenthermes.ai/audit. Every business we scan is automatically included in the leaderboard. If you want to improve your position, follow the steps in our improvement guide at agenthermes.ai/blog/improve-agent-readiness-score. The highest-leverage actions are publishing agent-card.json, adding an OpenAPI spec, and making your pricing machine-readable.',
  },
  {
    question: 'Why is Stripe only 68 when it has the best APIs?',
    answer:
      'Stripe has the highest API Quality score (D2: 90) of any business in our dataset. But the Agent Readiness Score is a weighted average of ALL 9 dimensions, not just API quality. Stripe loses significant points on Pricing Transparency (D4: 45) because their pricing requires parsing complex calculator pages, and on Onboarding (D3) because account setup involves multi-step identity verification. A 45-point spread between best and worst dimensions is what keeps Stripe in Silver instead of Gold. See our full Stripe analysis at agenthermes.ai/blog/why-stripe-scores-68.',
  },
  {
    question: 'Will any business ever reach Platinum (90+)?',
    answer:
      'Yes, but not yet. Platinum requires capabilities that are still emerging: published A2A agent cards, MCP servers exposing business capabilities, programmatic pricing APIs, OAuth2 for agent delegation, and fully autonomous onboarding. Supabase is closest with their MCP server, and Resend is closest on overall consistency. We expect the first Platinum scores when agent-native protocols gain mainstream adoption — likely late 2026 or 2027.',
  },
]

// ---------------------------------------------------------------------------
// TOC
// ---------------------------------------------------------------------------

const tocSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'top-15', label: 'Top 15 Leaderboard' },
  { id: 'silver-bronze-cliff', label: 'The 60-Point Cliff' },
  { id: 'industry-rankings', label: 'Industry Rankings' },
  { id: 'bottom-five', label: 'The Bottom 5' },
  { id: 'what-separates-tiers', label: 'What Separates Tiers' },
  { id: 'faq', label: 'FAQ' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTierStyles(tier: string) {
  switch (tier) {
    case 'Gold':
      return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' }
    case 'Silver':
      return { bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', text: 'text-zinc-400' }
    case 'Bronze':
      return { bg: 'bg-amber-700/10', border: 'border-amber-700/20', text: 'text-amber-600' }
    default:
      return { bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', text: 'text-zinc-500' }
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AgentReadinessLeaderboardPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Agent Readiness Leaderboard: Who Is Winning and Who Is Invisible',
    description:
      'The definitive 2026 ranking of businesses by Agent Readiness Score. Data from 500 scans across every major vertical.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-readiness-leaderboard',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Data Analysis',
    wordCount: 1900,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent Readiness Leaderboard',
          item: 'https://agenthermes.ai/blog/agent-readiness-leaderboard',
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
            <span className="text-zinc-400">Leaderboard</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Trophy className="h-3.5 w-3.5" />
              Leaderboard
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <BarChart3 className="h-3.5 w-3.5" />
              Data Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              500 Businesses Ranked
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The Agent Readiness{' '}
            <span className="text-emerald-500">Leaderboard</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-8">
            We ranked 500 businesses by their Agent Readiness Score. One scored Gold. Fifty-one scored Silver.
            Two hundred and fifty scored Bronze. One hundred and ninety-eight are effectively invisible to AI agents.
            Here is the full picture: who is winning, who is losing, and why the gap between them is wider than
            most people realize.
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

      {/* ===== OVERVIEW ===== */}
      <section id="overview" className="pb-12 sm:pb-16 border-t border-zinc-800/50 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            The State of Agent Readiness in 2026
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-center">
              <div className="text-3xl font-bold text-purple-400">0</div>
              <div className="text-xs text-zinc-500 mt-1">Platinum (90+)</div>
            </div>
            <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center">
              <div className="text-3xl font-bold text-yellow-400">1</div>
              <div className="text-xs text-zinc-500 mt-1">Gold (75+)</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-700/50 text-center">
              <div className="text-3xl font-bold text-zinc-300">51</div>
              <div className="text-xs text-zinc-500 mt-1">Silver (60-74)</div>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
              <div className="text-3xl font-bold text-amber-400">250</div>
              <div className="text-xs text-zinc-500 mt-1">Bronze (40-59)</div>
            </div>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-center">
              <div className="text-3xl font-bold text-red-400">198</div>
              <div className="text-xs text-zinc-500 mt-1">Not Scored (&lt;40)</div>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The distribution tells the story more clearly than any single number. Out of 500 businesses
              scanned across every major vertical — SaaS, healthcare, e-commerce, finance, local services,
              developer tools, communication platforms, and more — the overwhelming majority cluster below
              the Silver threshold of 60.
            </p>
            <p>
              The average score is <strong className="text-zinc-100">43 out of 100</strong>. The maximum is{' '}
              <strong className="text-yellow-400">75 (Resend)</strong>. The minimum is 6 (a local restaurant
              with a PDF menu and a phone number). This 69-point spread between best and worst captures the
              full range of agent readiness in the current economy: from businesses that AI agents can use
              autonomously to businesses that might as well not exist in the agent world.
            </p>
            <p>
              What follows is the data: the top 15 businesses, what they do right, what separates each tier,
              which industries lead and lag, and the specific patterns that determine where a business lands
              on this leaderboard.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TOP 15 LEADERBOARD ===== */}
      <section id="top-15" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <Crown className="h-6 w-6 text-yellow-500" />
            Top 15 Leaderboard
          </h2>

          <div className="space-y-3 mb-8">
            {topFifteen.map((entry) => {
              const tierStyles = getTierStyles(entry.tier)
              return (
                <div
                  key={entry.rank}
                  className={`p-4 rounded-xl border transition-colors ${
                    entry.rank === 1
                      ? 'bg-yellow-500/5 border-yellow-500/20'
                      : 'bg-zinc-900/50 border-zinc-800/80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold text-lg shrink-0 ${
                      entry.rank === 1
                        ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        : entry.rank <= 3
                        ? 'bg-zinc-700/50 text-zinc-300 border border-zinc-600/50'
                        : 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/50'
                    }`}>
                      {entry.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-bold ${entry.rank === 1 ? 'text-yellow-400' : 'text-zinc-200'}`}>
                          {entry.name}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${tierStyles.bg} border ${tierStyles.border} ${tierStyles.text}`}>
                          {entry.tier}
                        </span>
                        <span className="text-xs text-zinc-600">{entry.category}</span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{entry.highlight}</p>
                    </div>
                    <div className={`text-2xl font-bold shrink-0 ${entry.rank === 1 ? 'text-yellow-400' : 'text-zinc-300'}`}>
                      {entry.score}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed">
            Interactive leaderboard with filtering and search at{' '}
            <Link href="/leaderboard" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              agenthermes.ai/leaderboard
            </Link>
            . Scores updated continuously as businesses improve and new scans complete.
          </p>
        </div>
      </section>

      {/* ===== THE 60-POINT CLIFF ===== */}
      <section id="silver-bronze-cliff" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Layers className="h-6 w-6 text-emerald-500" />
            The 60-Point Cliff: Silver vs. Bronze
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The most important number on this leaderboard is not 75 (Resend&apos;s Gold score). It is 60 — the
              threshold between Silver and Bronze. This is where agent utility begins. Below 60, an agent can
              <em> find</em> your business but cannot <em>use</em> it. Above 60, an agent can discover, evaluate,
              and begin interacting with your business with reasonable confidence.
            </p>
            <p>
              The cliff is sharp. The 51 Silver-tier businesses share specific characteristics that the 250
              Bronze-tier businesses lack. Understanding what separates them is the key to moving up the leaderboard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-700/50">
              <h3 className="font-bold text-zinc-300 mb-3 flex items-center gap-2">
                <Medal className="h-4 w-4 text-zinc-400" />
                Silver (60-74): What They Have
              </h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  Published API documentation with endpoint descriptions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  Structured JSON responses with consistent schemas
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  Self-serve signup (even if complex)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  Public pricing page (even if not machine-readable)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  At least one SDK or comprehensive code examples
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/50 border border-amber-700/30">
              <h3 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-600" />
                Bronze (40-59): What They Lack
              </h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  API returns HTML errors instead of structured JSON
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  No OpenAPI spec or machine-readable API description
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  Sales-gated onboarding or manual approval queues
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  Pricing hidden behind &ldquo;Contact Sales&rdquo;
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  No SDKs, no code examples, documentation in prose only
                </li>
              </ul>
            </div>
          </div>

          <div className="callout-box">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 !mt-0">
              <Target className="h-5 w-5" />
              The Bronze Trap
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              The most dangerous position on the leaderboard is scoring 45-55 — the middle of Bronze. These
              businesses have enough infrastructure that they <em>appear</em> agent-ready at first glance: they
              have websites, maybe an API, some documentation. But agents that try to interact with them hit
              friction at every step. The result is that agents discover these businesses, attempt interaction,
              fail, and then deprioritize them in future recommendations. A score of 45 is worse than a score
              of 20 in some ways, because it creates a pattern of failed interactions rather than honest invisibility.
            </p>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY RANKINGS ===== */}
      <section id="industry-rankings" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <Globe className="h-6 w-6 text-emerald-500" />
            Industry Rankings: Who Leads and Who Lags
          </h2>

          <div className="space-y-3 mb-8">
            {industryAverages.map((industry, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-zinc-200 text-sm">{industry.industry}</h3>
                    <p className="text-xs text-zinc-500">{industry.count} businesses scanned</p>
                  </div>
                  <div className={`text-2xl font-bold ${
                    industry.avg >= 60 ? 'text-emerald-400' :
                    industry.avg >= 40 ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {industry.avg}
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800">
                  <div
                    className={`h-2 rounded-full bar-animate ${
                      industry.avg >= 60 ? 'bg-emerald-500' :
                      industry.avg >= 40 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${industry.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The industry gap is enormous. Developer tools average 58 — nearly Silver. Marketing averages 19 —
              barely above completely invisible. That 39-point gap between the top and bottom industries is wider
              than the gap between Silver and Bronze within any single industry.
            </p>
            <p>
              The pattern is predictable: industries that sell to developers score highest because their product
              <em> is</em> the API. Industries that sell to consumers or operate in regulated environments (healthcare,
              finance) score lowest because their infrastructure was built for human interaction and compliance,
              not for machine-to-machine communication.
            </p>
            <p>
              But here is the opportunity: the industries with the lowest scores are often the ones where agent-assisted
              interaction would create the most value. A patient who needs to compare dermatologists, a homeowner who
              needs to get three plumbing quotes, a small business owner who needs to evaluate marketing agencies —
              these are high-value agent tasks in low-readiness industries. The first businesses in these verticals
              to become agent-ready will capture outsized demand.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM 5 ===== */}
      <section id="bottom-five" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <TrendingDown className="h-6 w-6 text-red-500" />
            The Bottom 5: Completely Invisible
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              At the bottom of the leaderboard, businesses are not just scoring low — they are effectively
              nonexistent to AI agents. An agent asked to interact with these businesses has no path forward.
              No API. No structured data. No programmatic interface of any kind. The only option is &ldquo;call
              the phone number on the website,&rdquo; which is not something agents can do.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {bottomFive.map((entry) => (
              <div key={entry.rank} className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-red-400 font-mono">#{entry.rank}</span>
                    <span className="font-bold text-zinc-200 text-sm">{entry.name}</span>
                    <span className="text-xs text-zinc-600">{entry.category}</span>
                  </div>
                  <span className="text-xl font-bold text-red-400">{entry.score}</span>
                </div>
                <p className="text-xs text-zinc-500">{entry.reason}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Important context:</strong> Low scores are not a judgment of business
              quality. Square has an excellent modern API that scores much higher when accessed directly. Cash App is
              a great consumer product. Toast runs millions of restaurant transactions. These scores measure
              <em> agent readiness</em> — how easily AI agents can discover and interact with the business. A score
              of 8 means &ldquo;invisible to agents,&rdquo; not &ldquo;bad business.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT SEPARATES TIERS ===== */}
      <section id="what-separates-tiers" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Award className="h-6 w-6 text-emerald-500" />
            What Separates Each Tier
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              After analyzing 500 businesses, clear patterns emerge at each tier boundary. These are not
              arbitrary thresholds — they map to real capability differences in what agents can accomplish.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                tier: 'Gold (75+)',
                icon: Trophy,
                color: 'yellow',
                description: 'Consistency across all dimensions. No dimension below 60. An agent can complete the full 6-step journey (find, understand, sign up, connect, use, pay) with high confidence. Only Resend qualifies today.',
                key: 'No weak links in the chain.',
              },
              {
                tier: 'Silver (60-74)',
                icon: Medal,
                color: 'zinc',
                description: 'Strong in 5-7 dimensions but with 1-2 significant gaps. Agents can interact meaningfully but may need human fallback for onboarding, pricing clarification, or payment. Stripe, GitHub, Vercel, Supabase all live here.',
                key: 'Useful but not autonomous.',
              },
              {
                tier: 'Bronze (40-59)',
                icon: Shield,
                color: 'amber',
                description: 'Agents can discover and partially understand the business but cannot complete meaningful tasks. Usually has some API or structured data but critical gaps in onboarding, pricing, or agent experience. The largest tier with 250 businesses.',
                key: 'Visible but not usable.',
              },
              {
                tier: 'Not Scored (<40)',
                icon: Globe,
                color: 'red',
                description: 'Effectively invisible to agents. No public API, no structured data, no programmatic interaction path. The business may have a website, but an agent has no way to extract useful information or take action. 198 businesses — 40% of our dataset — are in this tier.',
                key: 'Invisible. Agents skip these entirely.',
              },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${
                    item.color === 'yellow' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                    item.color === 'zinc' ? 'bg-zinc-500/10 border border-zinc-500/20' :
                    item.color === 'amber' ? 'bg-amber-500/10 border border-amber-500/20' :
                    'bg-red-500/10 border border-red-500/20'
                  }`}>
                    <item.icon className={`h-4 w-4 ${
                      item.color === 'yellow' ? 'text-yellow-400' :
                      item.color === 'zinc' ? 'text-zinc-400' :
                      item.color === 'amber' ? 'text-amber-400' :
                      'text-red-400'
                    }`} />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-sm">{item.tier}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-2">{item.description}</p>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{item.key}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-emerald-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="font-bold text-zinc-100 mb-3 text-base">{faq.question}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed" style={{ lineHeight: '1.75' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED READING ===== */}
      <section className="pb-12 sm:pb-16">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-zinc-300">Related Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Resend Is the Only Gold',
                href: '/blog/resend-only-gold',
                tag: 'Case Study',
                tagColor: 'amber',
              },
              {
                title: 'Healthcare Agent Readiness: Score 33',
                href: '/blog/healthcare-agent-readiness',
                tag: 'Industry Analysis',
                tagColor: 'red',
              },
              {
                title: 'How to Improve Your Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'emerald',
              },
            ].map((related) => (
              <Link
                key={related.href}
                href={related.href}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 article-card-hover"
              >
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${
                    related.tagColor === 'emerald'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : related.tagColor === 'amber'
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                      : related.tagColor === 'red'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                      : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}
                >
                  {related.tag}
                </span>
                <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors leading-snug">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHARE BUTTONS ===== */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <hr className="section-divider mb-8" />
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-500 font-medium">Share this analysis:</span>
            <a
              href="https://twitter.com/intent/tweet?text=The%202026%20Agent%20Readiness%20Leaderboard%3A%20500%20businesses%20ranked.%20Only%201%20scored%20Gold.%20Zero%20Platinum.%20Here%27s%20who%27s%20winning.&url=https://agenthermes.ai/blog/agent-readiness-leaderboard"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://agenthermes.ai/blog/agent-readiness-leaderboard"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Where does your business rank?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score and see where you land on the leaderboard.
            The scan takes 10 seconds and covers all 9 dimensions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Score My Business
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
  )
}
