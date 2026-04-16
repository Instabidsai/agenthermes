import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Building2,
  Trophy,
  Shield,
  Bot,
  Layers,
  Target,
  Globe,
  Server,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Agent Readiness Statistics 2026 — Data from 500+ Business Scans | AgentHermes',
  description:
    'Agent readiness statistics from 500+ business scans: average score 43/100, 50% Bronze tier, 0% Platinum, 90%+ lack MCP servers. The most comprehensive agent readiness dataset available in 2026.',
  openGraph: {
    title: 'Agent Readiness Statistics 2026',
    description:
      'Hard numbers from 500+ scans: avg 43/100, only 1 Gold, 0 Platinum, 90%+ lack MCP. The definitive agent readiness statistics page.',
    url: 'https://agenthermes.ai/agent-readiness-statistics',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Readiness Statistics 2026',
    description:
      'Hard numbers from 500+ scans: avg 43/100, only 1 Gold, 0 Platinum, 90%+ lack MCP. The definitive statistics.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/agent-readiness-statistics',
  },
}

// ---------------------------------------------------------------------------
// Statistics data
// ---------------------------------------------------------------------------

const headlineStats = [
  { value: '500+', label: 'Businesses Scanned', detail: 'AgentHermes has scanned over 500 businesses for agent readiness as of April 2026, making it the largest agent readiness dataset available.' },
  { value: '43/100', label: 'Average Agent Readiness Score', detail: 'The mean Agent Readiness Score across all scanned businesses is 43 out of 100, placing the average business in the Bronze tier.' },
  { value: '41/100', label: 'Median Agent Readiness Score', detail: 'The median score is 41/100, indicating that more than half of all businesses score below the Bronze-Silver boundary.' },
  { value: '75/100', label: 'Highest Score Achieved', detail: 'Resend holds the highest Agent Readiness Score at 75/100, the only company to reach Gold tier out of 500+ scanned.' },
]

const tierStats = [
  { label: '0% of businesses score Platinum (90+)', value: '0%', sublabel: '0 out of 500+ businesses', detail: 'No business has achieved Platinum-tier agent readiness. Platinum requires excellence across all 9 scoring dimensions plus full agent-native protocol support.' },
  { label: '0.2% of businesses score Gold (75-89)', value: '0.2%', sublabel: '1 out of 500+ businesses', detail: 'Only Resend has achieved Gold tier at 75/100. Gold requires strong APIs, agent-native protocols, and broad coverage across the 6-step agent journey.' },
  { label: '10.2% of businesses score Silver (60-74)', value: '10.2%', sublabel: '51 out of 500+ businesses', detail: 'Silver-tier businesses have well-documented APIs and structured data but lack full agent-native optimization. Top Silver companies include Supabase (69), Vercel (69), and Stripe (68).' },
  { label: '50% of businesses score Bronze (40-59)', value: '50%', sublabel: '250 out of 500+ businesses', detail: 'Half of all scanned businesses fall into Bronze tier. These businesses have basic API access but significant gaps in onboarding, pricing transparency, and agent experience.' },
  { label: '39.6% of businesses score below Bronze (0-39)', value: '39.6%', sublabel: '198 out of 500+ businesses', detail: 'Nearly 40% of businesses score below the Bronze threshold. These businesses have major gaps in discovery, APIs, or security that prevent meaningful agent interaction.' },
]

const industryStats = [
  { industry: 'SaaS & Developer Tools', avg: 60, detail: 'SaaS companies have the highest average agent readiness at 60/100 because they already invest in APIs, documentation, and developer experience.' },
  { industry: 'Cloud Infrastructure', avg: 55, detail: 'Cloud providers average 55/100, benefiting from strong APIs and programmatic access but often lacking agent-specific protocols.' },
  { industry: 'Communication Platforms', avg: 52, detail: 'Communication platforms like Slack and Twilio average 52/100, with strong APIs but variable agent discovery support.' },
  { industry: 'Fintech & Payments', avg: 48, detail: 'Fintech companies average 48/100. Strong on API quality but regulatory constraints limit onboarding and pricing transparency.' },
  { industry: 'Travel & Hospitality', avg: 38, detail: 'Travel companies average 38/100 despite having booking systems, because most are not exposed via agent-readable APIs.' },
  { industry: 'Healthcare', avg: 33, detail: 'Healthcare averages 33/100. HIPAA and patient consent requirements severely limit programmatic access for AI agents.' },
  { industry: 'Retail & E-Commerce', avg: 28, detail: 'E-commerce averages 28/100. While platforms like Shopify have APIs, most individual stores lack agent-readable endpoints.' },
  { industry: 'Real Estate', avg: 25, detail: 'Real estate averages 25/100. Listing data exists but programmatic booking, touring, and transaction support is minimal.' },
  { industry: 'Education', avg: 22, detail: 'Education averages 22/100. Most institutions rely on web forms and human admissions processes that agents cannot navigate.' },
  { industry: 'Marketing & Advertising', avg: 19, detail: 'Marketing companies average 19/100 despite being tech-forward, because most offer services rather than machine-callable products.' },
  { industry: 'Local Services', avg: 15, detail: 'Local services (plumbers, electricians, cleaners) average 15/100. Most rely entirely on phone calls and lack any API infrastructure.' },
  { industry: 'Beauty & Wellness', avg: 12, detail: 'Beauty and wellness businesses average 12/100, the lowest of any industry. Booking is typically phone or web-form only.' },
]

const gapStats = [
  { stat: '92%', label: 'of businesses lack an MCP server', detail: 'Model Context Protocol (MCP) servers allow AI agents to interact with businesses as structured tools. 92% of scanned businesses have not deployed one.' },
  { stat: '95%', label: 'of businesses lack an agent card', detail: '95% of businesses do not have an agent-card.json file at /.well-known/, making them invisible to agent discovery protocols.' },
  { stat: '94%', label: 'of businesses lack llms.txt', detail: '94% of businesses have no llms.txt file, which provides LLM-optimized descriptions of the business and its services.' },
  { stat: '88%', label: 'of businesses lack an OpenAPI spec', detail: '88% of businesses have no publicly accessible OpenAPI or Swagger specification, making API discovery impossible for agents.' },
  { stat: '76%', label: 'of businesses lack programmatic pricing', detail: '76% of businesses have no machine-readable pricing. Agents cannot determine cost without a human looking at a webpage.' },
  { stat: '71%', label: 'of businesses lack programmatic onboarding', detail: '71% of businesses require human interaction (phone, email, or manual form) to create an account or start service.' },
  { stat: '65%', label: 'of businesses lack structured error responses', detail: '65% of API endpoints return HTML error pages or unstructured text instead of JSON error objects when something fails.' },
  { stat: '45%', label: 'of businesses lack TLS on all endpoints', detail: '45% of businesses have at least one endpoint or subdomain without proper TLS encryption, triggering the 39-point scoring cap.' },
]

const scoringDimensionStats = [
  { dimension: 'D2 API Quality', weight: '15%', avgScore: 38, best: 'Stripe (92/100)', worst: 'Local services (8/100)' },
  { dimension: 'D8 Reliability', weight: '13%', avgScore: 55, best: 'Cloudflare (95/100)', worst: 'Education (22/100)' },
  { dimension: 'D7 Security', weight: '12%', avgScore: 52, best: 'Banking (88/100)', worst: 'Beauty (15/100)' },
  { dimension: 'D1 Discovery', weight: '12%', avgScore: 35, best: 'SaaS (65/100)', worst: 'Local services (10/100)' },
  { dimension: 'D6 Data Format', weight: '10%', avgScore: 42, best: 'Fintech (78/100)', worst: 'Healthcare (18/100)' },
  { dimension: 'D9 Agent Experience', weight: '10%', avgScore: 18, best: 'Resend (72/100)', worst: 'Real estate (3/100)' },
  { dimension: 'D3 Onboarding', weight: '8%', avgScore: 25, best: 'SaaS (58/100)', worst: 'Healthcare (8/100)' },
  { dimension: 'D5 Payment', weight: '8%', avgScore: 30, best: 'E-commerce (55/100)', worst: 'Education (10/100)' },
  { dimension: 'D4 Pricing', weight: '5%', avgScore: 22, best: 'SaaS (52/100)', worst: 'Professional services (5/100)' },
]

const trendStats = [
  { stat: '12%', label: 'of businesses improved scores since January 2026', detail: '60 out of 500 businesses showed score improvements when rescanned, primarily from adding structured data and basic API documentation.' },
  { stat: '3%', label: 'of businesses deployed MCP since January 2026', detail: '15 businesses deployed MCP servers in Q1 2026, up from 8 at the start of the year. Still only 3% of the total.' },
  { stat: '5x', label: 'growth in agent-card.json adoption', detail: 'Businesses with agent-card.json grew from 5 to 25 between January and April 2026, a 5x increase from a small base.' },
  { stat: '0', label: 'businesses moved from Bronze to Platinum', detail: 'No business has made the leap from Bronze to Platinum in 2026. The fastest improvement was Bronze to Silver (12 businesses).' },
]

const faqItems = [
  {
    q: 'How many businesses has AgentHermes scanned?',
    a: 'AgentHermes has scanned over 500 businesses for agent readiness as of April 2026. This makes it the largest agent readiness dataset available. Scans cover 12 industries from SaaS to local services.',
  },
  {
    q: 'What is the average agent readiness score?',
    a: 'The average Agent Readiness Score is 43 out of 100 based on 500+ business scans. The median is 41/100. This means the typical business is barely agent-functional, scoring in the low Bronze tier.',
  },
  {
    q: 'What percentage of businesses are agent-ready?',
    a: 'Only 10.4% of businesses score Silver or above (60+/100), which represents minimum viable agent readiness. 89.6% of businesses score below Silver, meaning agents cannot reliably discover, use, or transact with them.',
  },
  {
    q: 'Which company has the highest agent readiness score?',
    a: 'Resend has the highest Agent Readiness Score at 75/100, making it the only company to reach Gold tier. Second place is tied between Supabase and Vercel at 69/100 (Silver tier). No company has reached Platinum (90+).',
  },
  {
    q: 'What percentage of businesses have MCP servers?',
    a: 'Only 8% of businesses have deployed an MCP (Model Context Protocol) server as of April 2026. MCP servers are the primary way AI agents interact with businesses programmatically, making this a critical gap.',
  },
  {
    q: 'What is the biggest gap in agent readiness?',
    a: 'The biggest gap is Agent Experience (D9), which averages only 18/100 across all businesses. This measures agent-specific optimizations like MCP servers, agent cards, and llms.txt files. 92%+ of businesses have none of these.',
  },
  {
    q: 'How does SaaS compare to healthcare in agent readiness?',
    a: 'SaaS companies average 60/100 on agent readiness while healthcare averages 33/100, a gap of 27 points. SaaS benefits from existing API infrastructure, while healthcare is constrained by HIPAA, patient consent, and reliance on phone-based workflows.',
  },
  {
    q: 'What is the lowest-scoring industry?',
    a: 'Beauty and wellness businesses have the lowest average agent readiness score at 12/100. This industry relies almost entirely on phone calls, walk-ins, and basic web booking forms that AI agents cannot navigate.',
  },
  {
    q: 'How fast are agent readiness scores improving?',
    a: 'Only 12% of businesses improved their agent readiness scores between January and April 2026. MCP adoption grew from 8 to 23 businesses (3% adoption). No business moved from Bronze to Platinum. Improvement is slow.',
  },
  {
    q: 'Where can I see the full methodology?',
    a: 'The complete scoring methodology is published at agenthermes.ai/methodology. It covers all 9 weighted dimensions, scoring caps, auth-aware scoring, 7 ARL levels, tier thresholds, and the full list of detected signals.',
  },
  {
    q: 'How can I get my business scanned?',
    a: 'Get a free Agent Readiness Score at agenthermes.ai/audit. Enter your domain and receive a detailed breakdown across all 9 dimensions with specific recommendations for improvement.',
  },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function AgentReadinessStatisticsPage() {
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
    headline: 'Agent Readiness Statistics 2026',
    description:
      'Comprehensive agent readiness statistics from 500+ business scans in 2026. Average score: 43/100. Only 0.2% reached Gold tier. 92% lack MCP servers.',
    url: 'https://agenthermes.ai/agent-readiness-statistics',
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
      { '@type': 'ListItem', position: 2, name: 'Agent Readiness Statistics', item: 'https://agenthermes.ai/agent-readiness-statistics' },
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
              <TrendingUp className="h-3.5 w-3.5" />
              Updated April 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Agent Readiness{' '}
              <span className="text-emerald-500">Statistics</span>{' '}
              2026
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
              Hard numbers from the largest agent readiness dataset. 500+ businesses
              scanned, 12 industries measured, 9 dimensions scored. Every statistic
              sourced from real scans.
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
                href="/benchmarks"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                View Benchmarks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HEADLINE NUMBERS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Headline Numbers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {headlineStats.map((s) => (
              <div key={s.label} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2 tabular-nums">{s.value}</div>
                <div className="text-sm font-semibold text-zinc-200 mb-2">{s.label}</div>
                <p className="text-xs text-zinc-500 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIER DISTRIBUTION ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Score Distribution
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            50% of businesses score Bronze (40-59). 39.6% score below Bronze. Only 10.4% reach Silver or above. 0.2% reach Gold. 0% reach Platinum.
          </p>

          <div className="space-y-3">
            {tierStats.map((t) => (
              <div key={t.label} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-bold text-emerald-400 tabular-nums min-w-[4rem]">{t.value}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-zinc-200 mb-1">{t.label}</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{t.detail}</p>
                    <span className="text-[10px] text-zinc-600 font-mono">{t.sublabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY AVERAGES ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Agent Readiness by Industry
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            SaaS averages 60/100. Beauty & wellness averages 12/100. The gap between the most and least agent-ready industries is 48 points.
          </p>

          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Industry</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Avg Score</th>
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider w-1/3">Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {industryStats.map((b) => (
                    <tr key={b.industry} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                      <td className="px-5 py-3 text-zinc-300">{b.industry}</td>
                      <td className="px-5 py-3 text-right font-semibold tabular-nums">
                        <span className={
                          b.avg >= 60 ? 'text-emerald-400' :
                          b.avg >= 40 ? 'text-amber-500' :
                          'text-red-400'
                        }>{b.avg}/100</span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="h-3 bg-zinc-800/60 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              b.avg >= 60 ? 'bg-emerald-500/70' :
                              b.avg >= 40 ? 'bg-amber-500/70' :
                              'bg-red-500/50'
                            }`}
                            style={{ width: `${b.avg}%` }}
                          />
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

      {/* ===== UNIVERSAL GAPS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Universal Gaps
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            These are the most common deficiencies across all 500+ scanned businesses. Over 90% of businesses lack the basic agent-native signals that AI models look for.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gapStats.map((g) => (
              <div key={g.label} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-red-500/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-bold text-red-400 tabular-nums min-w-[3.5rem]">{g.stat}</div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-200 mb-1">{g.label}</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{g.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PER-DIMENSION AVERAGES ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Average Score by Dimension
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Agent Experience (D9) is the weakest dimension at 18/100 average. Reliability (D8) is the strongest at 55/100. The gap between the best and worst dimensions is 37 points.
          </p>

          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Dimension</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Weight</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Avg Score</th>
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Best Performer</th>
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Worst Performer</th>
                  </tr>
                </thead>
                <tbody>
                  {scoringDimensionStats.map((d) => (
                    <tr key={d.dimension} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                      <td className="px-5 py-3 text-zinc-200 font-medium">{d.dimension}</td>
                      <td className="px-5 py-3 text-right text-zinc-400 font-mono text-xs">{d.weight}</td>
                      <td className="px-5 py-3 text-right font-semibold tabular-nums">
                        <span className={
                          d.avgScore >= 50 ? 'text-emerald-400' :
                          d.avgScore >= 30 ? 'text-amber-500' :
                          'text-red-400'
                        }>{d.avgScore}/100</span>
                      </td>
                      <td className="px-5 py-3 text-zinc-400 text-xs">{d.best}</td>
                      <td className="px-5 py-3 text-zinc-500 text-xs">{d.worst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADOPTION TRENDS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Adoption Trends (Q1 2026)
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Agent readiness adoption is growing but remains in early stages. Only 12% of businesses improved scores in Q1 2026. MCP adoption is at 3%.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trendStats.map((t) => (
              <div key={t.label} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-bold text-blue-400 tabular-nums min-w-[3.5rem]">{t.stat}</div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-200 mb-1">{t.label}</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BULLET-POINT SUMMARY ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Key Statistics at a Glance
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            The essential agent readiness numbers for 2026, sourced from 500+ business scans by AgentHermes.
          </p>

          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <ul className="space-y-3">
              {[
                '500+ businesses scanned across 12 industries',
                'Average Agent Readiness Score: 43/100',
                'Median Agent Readiness Score: 41/100',
                'Highest score: 75/100 (Resend -- only Gold-tier company)',
                '0 companies have achieved Platinum tier (90+)',
                '1 company has achieved Gold tier (75-89): Resend',
                '51 companies score Silver (60-74), representing 10.2%',
                '250 companies score Bronze (40-59), representing 50%',
                '198 companies score below Bronze (<40), representing 39.6%',
                'SaaS average: 60/100 (highest industry)',
                'Healthcare average: 33/100',
                'E-commerce average: 28/100',
                'Beauty & wellness average: 12/100 (lowest industry)',
                '92% of businesses lack MCP servers',
                '95% of businesses lack agent-card.json',
                '94% of businesses lack llms.txt files',
                '88% of businesses lack OpenAPI specifications',
                '76% lack machine-readable pricing',
                'Agent Experience (D9) is the weakest dimension at 18/100 average',
                'Reliability (D8) is the strongest dimension at 55/100 average',
                'Only 12% of businesses improved scores in Q1 2026',
                'MCP adoption grew from 1.6% to 3% in Q1 2026',
                'No business has moved from Bronze to Platinum in 2026',
                'The industry gap is 48 points (SaaS 60 vs. Beauty 12)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <BarChart3 className="h-3.5 w-3.5 text-emerald-500/60 mt-1 flex-shrink-0" />
                  <span className="text-sm text-zinc-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
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
              { href: '/benchmarks', label: 'Agent Readiness Benchmarks', desc: 'Industry data with top 15 leaderboard' },
              { href: '/methodology', label: 'Scoring Methodology', desc: '9 dimensions, weights, and scoring caps' },
              { href: '/leaderboard', label: 'Full Leaderboard', desc: 'All 500+ businesses ranked by score' },
              { href: '/report/state-of-readiness', label: 'State of Readiness Report', desc: 'Narrative analysis and 2026 trends' },
              { href: '/for', label: 'Industry Guides', desc: '15 vertical-specific agent readiness playbooks' },
              { href: '/glossary', label: 'Agent Readiness Glossary', desc: 'Definitions of key terms and concepts' },
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
            The average business scores 43/100.
          </h2>
          <p className="text-zinc-400 text-lg mb-4">
            Where do you stand?
          </p>
          <p className="text-zinc-500 text-base mb-10 max-w-lg mx-auto">
            Get your free Agent Readiness Score with a detailed breakdown across
            all 9 dimensions, your ARL level, and specific recommendations to
            improve.
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
