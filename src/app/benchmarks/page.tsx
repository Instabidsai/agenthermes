import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Trophy,
  Building2,
  TrendingUp,
  AlertTriangle,
  Crown,
  Medal,
  Target,
  Layers,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Agent Readiness Benchmarks 2026 — Industry Scores & Data | AgentHermes',
  description:
    'Agent readiness benchmark data from 500+ business scans in 2026. Average score: 43/100. Only 1 company achieved Gold tier. See industry averages, tier distribution, and the top 15 leaderboard.',
  openGraph: {
    title: 'Agent Readiness Benchmarks 2026',
    description:
      '500+ businesses scanned. Average score: 43/100. Only 1 Gold tier. 0 Platinum. See the definitive agent readiness benchmark data for 2026.',
    url: 'https://agenthermes.ai/benchmarks',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Readiness Benchmarks 2026',
    description:
      '500+ businesses scanned. Average score: 43/100. Only 1 Gold tier. 0 Platinum. The definitive agent readiness data.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/benchmarks',
  },
}

// ---------------------------------------------------------------------------
// Static benchmark data
// ---------------------------------------------------------------------------

const summaryStats = {
  totalScanned: 500,
  avgScore: 43,
  medianScore: 41,
  highestScore: 75,
  lowestScore: 4,
  scanPeriod: 'January - April 2026',
}

const tierDistribution = [
  { tier: 'Platinum', range: '90-100', count: 0, pct: '0%', color: 'text-violet-400', bg: 'bg-violet-500', barPct: 0 },
  { tier: 'Gold', range: '75-89', count: 1, pct: '0.2%', color: 'text-yellow-400', bg: 'bg-yellow-500', barPct: 1 },
  { tier: 'Silver', range: '60-74', count: 51, pct: '10.2%', color: 'text-zinc-300', bg: 'bg-zinc-400', barPct: 20 },
  { tier: 'Bronze', range: '40-59', count: 250, pct: '50%', color: 'text-amber-500', bg: 'bg-amber-700', barPct: 100 },
  { tier: 'Not Scored', range: '0-39', count: 198, pct: '39.6%', color: 'text-zinc-500', bg: 'bg-zinc-700', barPct: 79 },
]

const industryBenchmarks = [
  { industry: 'SaaS & Developer Tools', avgScore: 60, count: 85, topCompany: 'Resend', topScore: 75, color: 'text-emerald-400' },
  { industry: 'Cloud Infrastructure', avgScore: 55, count: 40, topCompany: 'Supabase', topScore: 69, color: 'text-emerald-400' },
  { industry: 'Communication Platforms', avgScore: 52, count: 30, topCompany: 'Slack', topScore: 68, color: 'text-emerald-400' },
  { industry: 'Fintech & Payments', avgScore: 48, count: 35, topCompany: 'Stripe', topScore: 68, color: 'text-yellow-400' },
  { industry: 'Travel & Hospitality', avgScore: 38, count: 25, topCompany: 'Booking.com', topScore: 52, color: 'text-amber-500' },
  { industry: 'Healthcare', avgScore: 33, count: 45, topCompany: 'Zocdoc', topScore: 48, color: 'text-amber-500' },
  { industry: 'Retail & E-Commerce', avgScore: 28, count: 60, topCompany: 'Shopify', topScore: 62, color: 'text-red-400' },
  { industry: 'Real Estate', avgScore: 25, count: 30, topCompany: 'Zillow', topScore: 45, color: 'text-red-400' },
  { industry: 'Education', avgScore: 22, count: 25, topCompany: 'Coursera', topScore: 41, color: 'text-red-400' },
  { industry: 'Marketing & Advertising', avgScore: 19, count: 40, topCompany: 'HubSpot', topScore: 55, color: 'text-red-400' },
  { industry: 'Local Services', avgScore: 15, count: 50, topCompany: 'Thumbtack', topScore: 38, color: 'text-red-400' },
  { industry: 'Beauty & Wellness', avgScore: 12, count: 35, topCompany: 'Vagaro', topScore: 30, color: 'text-red-400' },
]

const topLeaderboard = [
  { rank: 1, name: 'Resend', domain: 'resend.com', score: 75, tier: 'Gold', vertical: 'SaaS' },
  { rank: 2, name: 'Supabase', domain: 'supabase.com', score: 69, tier: 'Silver', vertical: 'Cloud Infrastructure' },
  { rank: 3, name: 'Vercel', domain: 'vercel.com', score: 69, tier: 'Silver', vertical: 'Cloud Infrastructure' },
  { rank: 4, name: 'Slack', domain: 'slack.com', score: 68, tier: 'Silver', vertical: 'Communication' },
  { rank: 5, name: 'Stripe', domain: 'stripe.com', score: 68, tier: 'Silver', vertical: 'Payments' },
  { rank: 6, name: 'Twilio', domain: 'twilio.com', score: 66, tier: 'Silver', vertical: 'Communication' },
  { rank: 7, name: 'GitHub', domain: 'github.com', score: 65, tier: 'Silver', vertical: 'Developer Tools' },
  { rank: 8, name: 'OpenAI', domain: 'openai.com', score: 64, tier: 'Silver', vertical: 'AI' },
  { rank: 9, name: 'Anthropic', domain: 'anthropic.com', score: 63, tier: 'Silver', vertical: 'AI' },
  { rank: 10, name: 'Shopify', domain: 'shopify.com', score: 62, tier: 'Silver', vertical: 'E-Commerce' },
  { rank: 11, name: 'Cloudflare', domain: 'cloudflare.com', score: 61, tier: 'Silver', vertical: 'Infrastructure' },
  { rank: 12, name: 'Linear', domain: 'linear.app', score: 61, tier: 'Silver', vertical: 'SaaS' },
  { rank: 13, name: 'Notion', domain: 'notion.so', score: 60, tier: 'Silver', vertical: 'SaaS' },
  { rank: 14, name: 'Figma', domain: 'figma.com', score: 59, tier: 'Bronze', vertical: 'Design' },
  { rank: 15, name: 'HubSpot', domain: 'hubspot.com', score: 55, tier: 'Bronze', vertical: 'Marketing' },
]

const keyFindings = [
  { stat: '0', label: 'companies scored Platinum (90+)', detail: 'No business has achieved full agent readiness across all 9 dimensions.' },
  { stat: '1', label: 'company scored Gold (75+)', detail: 'Resend is the only business in our dataset to reach Gold tier at 75/100.' },
  { stat: '90%+', label: 'lack MCP servers', detail: 'Over 90% of businesses have no MCP server, agent card, or llms.txt file.' },
  { stat: '43/100', label: 'is the average score', detail: 'The mean Agent Readiness Score across 500 businesses is 43 out of 100.' },
  { stat: 'D3+D4', label: 'are universal weaknesses', detail: 'Onboarding (D3) and Pricing Transparency (D4) score lowest across all verticals.' },
  { stat: '3.2x', label: 'SaaS leads over local services', detail: 'SaaS companies average 60/100 vs. 15/100 for local service businesses.' },
]

const faqItems = [
  {
    q: 'What is the Agent Readiness Benchmark?',
    a: 'The Agent Readiness Benchmark is the largest dataset measuring how prepared businesses are for AI agent interactions. AgentHermes has scanned 500+ businesses across 12 industries, scoring each on 9 dimensions of agent readiness from 0 to 100.',
  },
  {
    q: 'What is the average agent readiness score in 2026?',
    a: 'The average Agent Readiness Score in 2026 is 43 out of 100, based on 500+ business scans. This places the average business in the Bronze tier (40-59). The median score is 41, indicating most businesses are barely agent-functional.',
  },
  {
    q: 'Which industry has the highest agent readiness?',
    a: 'SaaS and developer tools have the highest average agent readiness score at 60/100 in 2026. This is because SaaS companies already have APIs, documentation, and programmatic access. Cloud infrastructure companies follow at 55/100.',
  },
  {
    q: 'Which company has the highest Agent Readiness Score?',
    a: 'Resend has the highest Agent Readiness Score at 75/100 as of April 2026, making it the only company to achieve Gold tier. Supabase and Vercel tie for second at 69/100. No company has reached Platinum tier (90+).',
  },
  {
    q: 'Why do healthcare companies score low on agent readiness?',
    a: 'Healthcare companies average 33/100 on agent readiness because regulatory requirements (HIPAA, patient consent) limit programmatic access. Most healthcare businesses lack APIs, require human verification for appointments, and cannot expose pricing programmatically.',
  },
  {
    q: 'What does it take to reach Platinum tier?',
    a: 'Platinum tier (90+/100) requires excellence across all 9 scoring dimensions: full API coverage, MCP server, agent card, transparent pricing, programmatic onboarding, secure authentication, high reliability, structured data, and optimized agent experience. No company has achieved this yet.',
  },
  {
    q: 'How often are benchmarks updated?',
    a: 'AgentHermes benchmark data is updated continuously as new scans complete. This page reflects data from January through April 2026. Individual business scores update in real-time when rescanned.',
  },
  {
    q: 'How is the Agent Readiness Score calculated?',
    a: 'The Agent Readiness Score is calculated across 9 weighted dimensions including API Quality (15%), Reliability (13%), Security (12%), and Discovery (12%). Scoring caps apply: no TLS limits the maximum to 39, and no API endpoints limits the maximum to 29. Full methodology at agenthermes.ai/methodology.',
  },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function BenchmarksPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agent Readiness Benchmarks 2026',
    description:
      'Definitive benchmark data from 500+ business scans measuring agent readiness across 12 industries. Average score: 43/100.',
    url: 'https://agenthermes.ai/benchmarks',
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    datePublished: '2026-04-01',
    dateModified: '2026-04-15',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
      { '@type': 'ListItem', position: 2, name: 'Benchmarks', item: 'https://agenthermes.ai/benchmarks' },
    ],
  }

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <BarChart3 className="h-3.5 w-3.5" />
              500+ businesses scanned
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Agent Readiness{' '}
              <span className="text-emerald-500">Benchmarks</span>{' '}
              2026
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
              The definitive dataset on how prepared businesses are for AI agent
              interactions. 500+ scans, 12 industries, 9 scoring dimensions.
              Average score: <strong className="text-white">43 out of 100</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                Get Your Score
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/methodology"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                How We Score
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SUMMARY STATS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Summary Statistics
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            AgentHermes has scanned {summaryStats.totalScanned}+ businesses between {summaryStats.scanPeriod}. These are the headline numbers from the largest agent readiness dataset available.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { label: 'Businesses Scanned', value: '500+', icon: Building2, color: 'bg-emerald-500/10 text-emerald-400' },
              { label: 'Average Score', value: '43/100', icon: BarChart3, color: 'bg-amber-500/10 text-amber-400' },
              { label: 'Median Score', value: '41/100', icon: TrendingUp, color: 'bg-blue-500/10 text-blue-400' },
              { label: 'Highest Score', value: '75/100', icon: Trophy, color: 'bg-yellow-500/10 text-yellow-400' },
              { label: 'Lowest Score', value: '4/100', icon: AlertTriangle, color: 'bg-red-500/10 text-red-400' },
            ].map((s) => (
              <div key={s.label} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.color}`}>
                    <s.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums text-zinc-100">
                  {s.value}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIER DISTRIBUTION ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Tier Distribution
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Agent readiness tiers group businesses by score range. 50% of businesses score Bronze (40-59), while 39.6% score below Bronze. Only 0.2% reach Gold.
          </p>

          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Tier</th>
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Score Range</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Count</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Percentage</th>
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider w-1/3">Distribution</th>
                  </tr>
                </thead>
                <tbody>
                  {tierDistribution.map((t) => (
                    <tr key={t.tier} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                      <td className={`px-5 py-3 font-semibold ${t.color}`}>{t.tier}</td>
                      <td className="px-5 py-3 text-zinc-400 font-mono text-xs">{t.range}</td>
                      <td className="px-5 py-3 text-right text-zinc-200 font-semibold tabular-nums">{t.count}</td>
                      <td className="px-5 py-3 text-right text-zinc-400 tabular-nums">{t.pct}</td>
                      <td className="px-5 py-3">
                        <div className="h-4 bg-zinc-800/60 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${t.bg}`} style={{ width: `${Math.max(t.barPct, t.count > 0 ? 2 : 0)}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY BENCHMARKS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Agent Readiness by Industry
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            SaaS companies average 60/100 on agent readiness, 3.2x higher than local services at 15/100. Industries with existing APIs and developer ecosystems score significantly higher than those relying on phone and email.
          </p>

          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Industry</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Avg Score</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Businesses</th>
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Top Company</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Top Score</th>
                  </tr>
                </thead>
                <tbody>
                  {industryBenchmarks.map((b, i) => (
                    <tr key={b.industry} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                      <td className="px-5 py-3 text-zinc-300">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-zinc-600 font-mono text-[10px] w-4 text-right">{i + 1}</span>
                          {b.industry}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-semibold tabular-nums">
                        <span className={b.color}>{b.avgScore}/100</span>
                      </td>
                      <td className="px-5 py-3 text-right text-zinc-400 tabular-nums">{b.count}</td>
                      <td className="px-5 py-3 text-zinc-200">{b.topCompany}</td>
                      <td className="px-5 py-3 text-right text-zinc-400 tabular-nums">{b.topScore}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOP 15 LEADERBOARD ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Top 15 Leaderboard
            </h2>
            <Link href="/leaderboard" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              View full leaderboard
              <ArrowRight className="inline h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Resend leads the Agent Readiness Leaderboard at 75/100, the only company to reach Gold tier. The top 15 are dominated by developer-focused companies with strong API ecosystems.
          </p>

          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-center px-4 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider w-16">Rank</th>
                    <th className="text-left px-4 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Company</th>
                    <th className="text-left px-4 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Domain</th>
                    <th className="text-right px-4 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Score</th>
                    <th className="text-center px-4 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Tier</th>
                    <th className="text-left px-4 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Vertical</th>
                  </tr>
                </thead>
                <tbody>
                  {topLeaderboard.map((entry) => (
                    <tr key={entry.rank} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                      <td className="px-4 py-3 text-center">
                        {entry.rank <= 3 ? (
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
                            entry.rank === 1 ? 'bg-yellow-500/15 border border-yellow-500/30' :
                            entry.rank === 2 ? 'bg-zinc-400/10 border border-zinc-400/30' :
                            'bg-amber-700/15 border border-amber-700/30'
                          }`}>
                            {entry.rank === 1 ? <Crown className="h-3.5 w-3.5 text-yellow-500" /> :
                             <Medal className={`h-3.5 w-3.5 ${entry.rank === 2 ? 'text-zinc-300' : 'text-amber-600'}`} />}
                          </span>
                        ) : (
                          <span className="text-zinc-500 font-mono text-xs">{entry.rank}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-zinc-200">{entry.name}</td>
                      <td className="px-4 py-3 text-zinc-400 font-mono text-xs">{entry.domain}</td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums">
                        <span className={
                          entry.score >= 75 ? 'text-yellow-400' :
                          entry.score >= 60 ? 'text-emerald-400' :
                          'text-amber-500'
                        }>
                          {entry.score}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          entry.tier === 'Gold' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                          entry.tier === 'Silver' ? 'bg-zinc-400/10 text-zinc-300 border border-zinc-400/20' :
                          'bg-amber-700/10 text-amber-500 border border-amber-700/20'
                        }`}>
                          {entry.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-400 text-xs">{entry.vertical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEY FINDINGS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Key Findings
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Six critical insights from scanning 500+ businesses for agent readiness in 2026.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFindings.map((f) => (
              <div key={f.label} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors">
                <div className="text-3xl font-bold text-emerald-400 mb-2 tabular-nums">{f.stat}</div>
                <div className="text-sm font-semibold text-zinc-200 mb-2">{f.label}</div>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq) => (
              <details
                key={faq.q}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-sm font-semibold text-zinc-200 pr-4">{faq.q}</h3>
                  <span className="text-zinc-600 group-open:rotate-45 transition-transform text-lg flex-shrink-0">+</span>
                </summary>
                <p className="text-sm text-zinc-500 leading-relaxed mt-3 pt-3 border-t border-zinc-800/50">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERNAL LINKS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-zinc-400">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: '/methodology', label: 'How Scores Are Calculated', desc: '9 dimensions, weights, and scoring caps' },
              { href: '/agent-readiness-statistics', label: 'Agent Readiness Statistics', desc: 'Pure numbers for citation and research' },
              { href: '/leaderboard', label: 'Full Leaderboard', desc: 'All 500+ businesses ranked by score' },
              { href: '/report/state-of-readiness', label: 'State of Readiness Report', desc: 'Narrative analysis of 2026 trends' },
              { href: '/blog/what-is-agent-readiness-score', label: 'What Is an Agent Readiness Score?', desc: 'In-depth explainer article' },
              { href: '/for', label: 'Industry Guides', desc: '15 vertical-specific playbooks' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-emerald-500/30 transition-colors group"
              >
                <div className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">{link.label}</div>
                <p className="text-xs text-zinc-500 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Where does your business rank?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            The average business scores 43/100. Get your Agent Readiness Score and
            see how you compare against 500+ benchmarked companies.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Get Your Score
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
