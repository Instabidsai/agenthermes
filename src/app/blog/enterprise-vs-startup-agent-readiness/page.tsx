import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  HelpCircle,
  Layers,
  Link2,
  PhoneOff,
  Rocket,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Fortune 500 Companies Score Lower Than Startups on Agent Readiness | AgentHermes',
  description:
    'Enterprise Fortune 500s average below 40 on the Agent Readiness Score. Startups like Resend (75), Vercel (70), Supabase (69) dominate the top. Budget is not the bottleneck — architecture is. Here is why developer-first startups beat trillion-dollar enterprises on agent readiness.',
  keywords: [
    'enterprise vs startup agent readiness',
    'Fortune 500 agent readiness',
    'enterprise agent readiness score',
    'startup agent readiness',
    'why enterprises fail agent readiness',
    'developer-first agent readiness',
    'enterprise API problem',
    'agent economy enterprise',
  ],
  openGraph: {
    title: 'Why Fortune 500 Companies Score Lower Than Startups on Agent Readiness',
    description:
      'Enterprise Fortune 500s average below 40. Resend 75, Vercel 70, Supabase 69 dominate. Budget is not the bottleneck. Architecture is.',
    url: 'https://agenthermes.ai/blog/enterprise-vs-startup-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Enterprise vs Startup Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Fortune 500 Companies Score Lower Than Startups on Agent Readiness',
    description:
      'Enterprise avg below 40. Resend 75, Vercel 70, Supabase 69 lead. Budget is not the bottleneck — architecture is.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/enterprise-vs-startup-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const leaderboard = [
  { name: 'Resend', score: 75, tier: 'Gold', type: 'Startup', foundedEra: '2022+', color: 'amber' },
  { name: 'Vercel', score: 70, tier: 'Silver', type: 'Startup', foundedEra: '2015+', color: 'emerald' },
  { name: 'Supabase', score: 69, tier: 'Silver', type: 'Startup', foundedEra: '2020+', color: 'emerald' },
  { name: 'Stripe', score: 68, tier: 'Silver', type: 'Startup', foundedEra: '2010+', color: 'emerald' },
  { name: 'Slack', score: 68, tier: 'Silver', type: 'Startup (acquired)', foundedEra: '2010+', color: 'emerald' },
  { name: 'GitHub', score: 67, tier: 'Silver', type: 'Startup (acquired)', foundedEra: '2008+', color: 'emerald' },
  { name: 'Allstate', score: 66, tier: 'Silver', type: 'Enterprise', foundedEra: 'Pre-2000', color: 'blue' },
  { name: 'Robinhood', score: 66, tier: 'Silver', type: 'Startup', foundedEra: '2013+', color: 'emerald' },
  { name: 'Salesforce', score: 58, tier: 'Bronze', type: 'Enterprise', foundedEra: 'Pre-2000', color: 'blue' },
  { name: 'Delta Airlines', score: 29, tier: 'Not Scored', type: 'Enterprise', foundedEra: 'Pre-2000', color: 'red' },
  { name: 'Bank of America', score: 24, tier: 'Not Scored', type: 'Enterprise', foundedEra: 'Pre-2000', color: 'red' },
  { name: 'Walmart', score: 21, tier: 'Not Scored', type: 'Enterprise', foundedEra: 'Pre-2000', color: 'red' },
]

const whyStartupsWin = [
  {
    title: 'Developers are customer #1',
    description: 'A startup selling Stripe, Resend, or Supabase has developers as the buying persona. The docs, API, and error messages are the product. Agent-friendly is a side effect of developer-friendly.',
    icon: Code2,
    color: 'emerald',
  },
  {
    title: 'No phone tree to protect',
    description: 'Enterprises have inside-sales teams, account executives, and channel partners whose compensation depends on humans calling. Agent-ready pricing and direct APIs cannibalize that comp structure. Startups have no comp structure to protect.',
    icon: PhoneOff,
    color: 'red',
  },
  {
    title: 'APIs ship before marketing pages',
    description: 'Most Silver-tier startups had a working API before they had a sales team. The "contact us for a demo" page came later, optionally, and never replaced the API. Enterprises did the opposite — marketing page first, API maybe never.',
    icon: Rocket,
    color: 'blue',
  },
  {
    title: 'Cloud-native by default',
    description: 'Startups born after 2015 ship cloud-first: public endpoints, HTTPS everywhere, OpenAPI specs, JSON responses. Enterprises layered on top of decades of on-prem systems with VPN-gated integrations that agents cannot touch.',
    icon: Sparkles,
    color: 'purple',
  },
]

const whyEnterprisesLose = [
  {
    title: 'Phone-first sales motion',
    description: 'Fortune 500 sales comp is tied to humans on calls. Exposing agent-ready pricing and direct APIs undermines the sales org. Boards do not change comp structure to help AI agents.',
  },
  {
    title: 'Gated demos',
    description: '"Contact sales to see pricing." Fail D4 Pricing Transparency automatically. Every enterprise cap — banks, airlines, insurance — loses 3-5 points here immediately.',
  },
  {
    title: 'On-prem architecture debt',
    description: 'The primary system of record is an AS/400 or a 1998 Oracle installation. The shiny marketing site is a thin veneer. Agents hit the veneer and find nothing.',
  },
  {
    title: '"Call us" as the primary CTA',
    description: 'Across Fortune 500 scans, the most common primary call-to-action on the homepage is "Call 1-800-...". That CTA is invisible to agents and functions as a D5 Payment failure and D3 Onboarding failure at the same time.',
  },
  {
    title: 'Compliance used as a blocker',
    description: 'Banks, healthcare, and insurance often cite HIPAA/PCI/SOX to justify not having APIs. Allstate (66 Silver), Stripe (68), and the healthcare tech startups in our dataset prove this is an excuse — compliant + agent-ready is a shipped pattern.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How many Fortune 500s are in the 500-business scan dataset?',
    answer:
      'Roughly 180 of the 500 scanned businesses are Fortune 500 or Fortune 1000 companies. Their average score is 37 — below Bronze. The other 320 are a mix of startups (avg 52), scale-ups (avg 48), and small businesses (avg 28). The gap between startup average (52) and enterprise average (37) is 15 points, roughly one full tier on the Agent Readiness rubric.',
  },
  {
    question: 'Which Fortune 500 companies scored the highest?',
    answer:
      'Allstate at 66 (Silver) is the highest-scoring traditional enterprise in the dataset. Salesforce (58 Bronze) is next. The rest of the Fortune 500 cluster between 25 and 45. The pattern that separates the top performers is simple — they shipped an API before they shipped an app. Allstate in particular has structured quote endpoints, documented auth, and digital claims, which pushes them above every peer in insurance.',
  },
  {
    question: 'Can enterprises close the gap without rebuilding from scratch?',
    answer:
      'Yes. The single highest-leverage move for an enterprise is publishing an OpenAPI spec for whatever API they already have — even if it is only partial. D2 API Quality is 15% of the score and most enterprises already have internal APIs that are one documentation sprint away from passing. The next-highest leverage is killing the "contact sales for pricing" page in favor of a public pricing page with JSON-LD markup. Those two changes alone often move a Fortune 500 from 35 to 50 — Bronze to almost Silver.',
  },
  {
    question: 'Does company size correlate with score at all?',
    answer:
      'Only weakly, and inverse. The correlation between revenue and Agent Readiness Score across the 500-business dataset is slightly negative. The strongest positive correlations are with founding year (newer = higher) and primary customer persona (developers = higher). A $10M ARR infrastructure startup beats a $10B revenue bank on Agent Readiness nine times out of ten. Budget is not the bottleneck. Architecture is.',
  },
  {
    question: 'What happens when AI agents become a real sales channel?',
    answer:
      'First-mover advantage compounds fast. In every vertical AgentHermes has tracked, the agent-ready incumbent captures traffic disproportionate to market share because agents preferentially route to businesses they can complete transactions with. In fintech, Stripe and Robinhood already benefit from this — agents recommending "fintech APIs" list them first because they work programmatically. In insurance, Allstate is positioned to capture the same effect once agent-driven quotes hit scale. The enterprises still debating whether to ship an API are ceding the channel.',
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

export default function EnterpriseVsStartupAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Fortune 500 Companies Score Lower Than Startups on Agent Readiness',
    description:
      'The Fortune 500 averages below 40 on the Agent Readiness Score. Startups like Resend (75), Vercel (70), and Supabase (69) dominate the top of the leaderboard. Here is why — and what enterprises can do about it.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/enterprise-vs-startup-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Research',
    wordCount: 1900,
    keywords:
      'enterprise vs startup agent readiness, Fortune 500 agent readiness, startup agent readiness, enterprise API problem',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Enterprise vs Startup Agent Readiness',
          item: 'https://agenthermes.ai/blog/enterprise-vs-startup-agent-readiness',
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
      title="Why Fortune 500 Companies Score Lower Than Startups on Agent Readiness"
      shareUrl="https://agenthermes.ai/blog/enterprise-vs-startup-agent-readiness"
      currentHref="/blog/enterprise-vs-startup-agent-readiness"
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
            <span className="text-zinc-400">Enterprise vs Startup Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Building2 className="h-3.5 w-3.5" />
              Research
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              500 Business Dataset
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Fortune 500 Companies{' '}
            <span className="text-emerald-400">Score Lower Than Startups</span>{' '}
            on Agent Readiness
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The Fortune 500 has the budget, the headcount, and the brand. Startups 1/1000th their size
            crush them on Agent Readiness. Resend (75), Vercel (70), Supabase (69), Stripe (68) sit at
            the top. Most banks, airlines, and insurance carriers sit below 30. The gap is not money —{' '}
            <strong className="text-zinc-100">it is architecture</strong>.
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
                  13 min read
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
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The Numbers From 500 Scans
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes has scanned 500 businesses across every major vertical. Exactly{' '}
              <strong className="text-zinc-100">1 Gold</strong> (Resend, 75). 52 Silver. 249 Bronze. 199
              below Bronze. Zero have A2A agent cards. Two publish MCP servers.
            </p>
            <p>
              Break the dataset apart by company type and the pattern is sharp. The top 30 scores are
              almost entirely developer-first startups. The bottom 200 are almost entirely traditional
              enterprises, local businesses, and consumer brands that optimized for a sales funnel that
              ends at a phone call.
            </p>
            <p>
              Across the Fortune 500 subset: <strong className="text-zinc-100">average 37</strong>,
              below the Bronze threshold of 40. Across the startup subset (companies founded after
              2010): <strong className="text-zinc-100">average 52</strong>, solidly Bronze with a long
              right tail into Silver.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '37', label: 'Fortune 500 avg', icon: TrendingDown, color: 'red' },
              { value: '52', label: 'Startup avg', icon: TrendingUp, color: 'emerald' },
              { value: '15', label: 'pt gap', icon: Layers, color: 'amber' },
              { value: '1', label: 'Gold (all startup)', icon: Trophy, color: 'amber' },
            ].map((stat) => {
              const c = getColorClasses(stat.color)
              return (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className={`h-5 w-5 ${c.text} mx-auto mb-2`} />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== LEADERBOARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            The Scoreboard — Top Silver Down to Enterprise Bottom
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Scores from a representative cross-section of the 500-business dataset. The top 8 are 7
            startups and 1 enterprise (Allstate). Below 40, the pattern flips — large consumer and
            financial enterprises dominate the bottom of the list.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300 uppercase tracking-wide">
              <div>Company</div>
              <div>Score</div>
              <div>Type</div>
              <div>Founded</div>
            </div>
            {leaderboard.map((row, i) => {
              const c = getColorClasses(row.color)
              return (
                <div
                  key={row.name}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.name}</div>
                  <div className={`font-bold ${c.text}`}>
                    {row.score}{' '}
                    <span className="text-xs font-normal text-zinc-500">{row.tier}</span>
                  </div>
                  <div className="text-zinc-400 text-xs">{row.type}</div>
                  <div className="text-zinc-500 text-xs">{row.foundedEra}</div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Allstate is the standout. A Fortune 100 insurance carrier scoring 66 Silver proves the
              pattern is not destiny. When a pre-2000 enterprise commits to structured APIs, documented
              auth, digital claims, and a quote endpoint, it can break into Silver. Everything below
              that line is a choice, not a constraint.
            </p>
            <p>
              See the full rankings in the{' '}
              <Link href="/blog/agent-readiness-leaderboard" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Leaderboard
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY STARTUPS WIN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Rocket className="h-5 w-5 text-emerald-500" />
            Why Startups Accidentally Win
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Almost none of the top-scoring startups designed for AI agents. They designed for
            developers, who want the same things — and agents benefited as a side effect.
          </p>

          <div className="space-y-4 mb-8">
            {whyStartupsWin.map((item) => {
              const c = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg} border ${c.border}`}>
                      <item.icon className={`h-5 w-5 ${c.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The meta-pattern:</strong>{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-300 hover:text-emerald-200 underline">
                Developer tools dominate agent readiness
              </Link>{' '}
              because developer tools are sold to the same persona that ends up building the agents. The
              buyer and the builder are the same person. When your buyer writes code, your product ships
              with first-class API support, which happens to be first-class agent support.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY ENTERPRISES LOSE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Why Fortune 500s Stay Below 40
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The same five patterns repeat across every Fortune 500 sector we have scanned — banking,
            airlines, insurance, retail, telecom, energy.
          </p>

          <div className="space-y-3 mb-8">
            {whyEnterprisesLose.map((item, i) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1 text-sm">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE IRONY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Irony: Budget vs Architecture
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A Fortune 500 bank has hundreds of engineers, a nine-figure technology budget, and decades
              of infrastructure investment. Stripe, from a standing start in 2010, built an API that is
              literally the reference implementation for agent-ready payments. The bank has 100× the
              engineering capacity. Stripe has a 40-point lead on the Agent Readiness Score.
            </p>
            <p>
              Budget is not the constraint. Decision-making is. An enterprise choosing to ship a public
              OpenAPI spec requires cross-functional alignment across legal, compliance, product
              marketing, sales comp, and security. A startup ships it because one engineer wrote it on a
              Friday afternoon. Speed of decision compounds. Three years of Friday afternoons is a
              Silver-tier API. Three years of enterprise committee meetings is half a spec nobody
              approved.
            </p>
            <p>
              The gap is widening. Every quarter, another startup adds MCP support, structured error
              handling, and x402 micropayments. Every quarter, another Fortune 500 holds a committee
              meeting about whether AI agents are &ldquo;real yet.&rdquo; By the time the committee
              approves a pilot, the startup has captured the agent-driven channel in their vertical.{' '}
              <Link href="/blog/invisible-to-ai-agents" className="text-emerald-400 hover:text-emerald-300 underline">
                Being invisible to agents
              </Link>{' '}
              is the late-2020s version of being un-Googleable in 2005.
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
                title: 'Why Developer Tools Dominate Agent Readiness',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12',
                href: '/blog/fintech-agent-readiness',
                tag: 'Industry Analysis',
                tagColor: 'amber',
              },
              {
                title: 'The Agent Readiness Leaderboard',
                href: '/blog/agent-readiness-leaderboard',
                tag: 'Data Analysis',
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
            Where does your company rank?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score in 60 seconds and compare yourself against the 500-business
            dataset. Startup, enterprise, or somewhere in between — the scan is free.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              <Users className="h-4 w-4" />
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
