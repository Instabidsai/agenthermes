import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  Clock,
  Code2,
  Compass,
  CreditCard,
  Database,
  DollarSign,
  FileCode,
  FileText,
  GitBranch,
  HelpCircle,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  UserPlus,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why GitHub Scores 67 for Agent Readiness (And What It Gets Wrong) | AgentHermes',
  description:
    'GitHub scored 67 Silver in the AgentHermes scan of 500 businesses. Dimension-by-dimension breakdown of where GitHub dominates (API, security, reliability) and where it loses points (payment, pricing, agent experience).',
  keywords: [
    'GitHub agent readiness score',
    'GitHub agent readiness',
    'GitHub API score',
    'GitHub MCP',
    'GitHub OpenAPI',
    'GitHub OAuth agents',
    'GitHub agent-card.json',
  ],
  openGraph: {
    title: 'Why GitHub Scores 67 for Agent Readiness (And What It Gets Wrong)',
    description:
      'Dimension-by-dimension breakdown of GitHub\'s 67 Silver score. What it wins, what it loses, and what pushes it to Gold.',
    url: 'https://agenthermes.ai/blog/github-agent-readiness-breakdown',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why GitHub Scores 67 for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why GitHub Scores 67 for Agent Readiness',
    description:
      'Wins D2 API, D7 Security, D8 Reliability. Loses D5 Payment, D4 Pricing, D9 Agent Experience. Here is the breakdown.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/github-agent-readiness-breakdown',
  },
}

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How did AgentHermes calculate GitHub\'s 67 score?',
    answer:
      'Every domain runs through the v4 Agent Readiness Score model: 9 dimensions weighted by agent impact, with auth-aware scoring for 401 responses and hard caps for no-TLS or no-endpoints failures. GitHub scores come from the live scan of github.com and api.github.com against the same scoring profile used for the other 499 businesses.',
  },
  {
    question: 'Why is GitHub Silver and not Gold?',
    answer:
      'Gold requires a 75+. GitHub sits at 67 because of three gaps: no public agent-card.json at the domain root, partial pricing transparency (enterprise pricing is quote-only), and a handful of endpoints that return HTML error pages to unauthenticated agents instead of structured JSON. Each of those is a 2-4 point fix.',
  },
  {
    question: 'Does GitHub have an MCP server?',
    answer:
      'Yes, the official GitHub MCP server ships from github/github-mcp-server. That is one of the reasons GitHub scores higher than almost every other dev platform. MCP raises the Agent-Native bonus and helps D9 Agent Experience. The gap is that the MCP endpoint is not advertised in an agent-card.json at github.com, so the scanner cannot auto-discover it from the domain alone.',
  },
  {
    question: 'How does GitHub compare to Stripe, Vercel, and Supabase?',
    answer:
      'GitHub 67, Stripe 68, Vercel 70, Supabase 69. All four cluster within 3 points, and all four are Silver. GitHub trails Vercel primarily on D9 Agent Experience, where Vercel returns cleaner error envelopes and ships a more complete OpenAPI. GitHub beats Stripe on D8 Reliability thanks to status.github.com\'s deep component-level status model.',
  },
  {
    question: 'What would push GitHub to Gold or Platinum?',
    answer:
      'Four changes. First, publish /.well-known/agent-card.json that points at the existing MCP server and A2A skills. Second, ship llms.txt at the root. Third, convert remaining HTML error responses on public endpoints to JSON. Fourth, publish machine-readable enterprise pricing (not just a contact form). Conservatively those lift GitHub to 78 — Gold. Add x402 support for per-call billing and the score breaks 85 — Platinum territory.',
  },
]

const dimensions = [
  {
    code: 'D1',
    name: 'Discoverability',
    weight: '12%',
    score: 'Silver',
    color: 'blue',
    wins: 'DNS, HTTPS, sitemap, robots.txt unblocked for GPTBot, structured OG tags',
    losses: 'No agent-card.json at /.well-known/. No llms.txt at the root. MCP endpoint not auto-discoverable from domain alone.',
    icon: Compass,
  },
  {
    code: 'D2',
    name: 'API Quality',
    weight: '15%',
    score: 'Near-perfect',
    color: 'emerald',
    wins: 'REST API, GraphQL API, OpenAPI 3.0 spec published at docs.github.com/rest. Cursor pagination. Consistent response envelopes. Request IDs on every call.',
    losses: 'GraphQL schema depth is high — some agents struggle with the branching. Rate-limit error shape differs slightly between REST and GraphQL.',
    icon: FileCode,
  },
  {
    code: 'D3',
    name: 'Onboarding',
    weight: '8%',
    score: 'Silver',
    color: 'blue',
    wins: 'Self-service signup. Fine-grained PATs with scoped permissions. Free tier for individuals. OAuth apps with programmatic creation.',
    losses: 'Enterprise onboarding requires sales contact. No sandbox environment — agents test against production, which makes destructive operations risky for new developers.',
    icon: UserPlus,
  },
  {
    code: 'D4',
    name: 'Pricing',
    weight: '5%',
    score: 'Partial',
    color: 'amber',
    wins: 'Individual, Team, and Enterprise tiers published with per-seat pricing. Copilot add-on priced transparently.',
    losses: 'Enterprise Cloud and GHAS pricing require contact. No JSON-LD Offer schema on pricing pages. Advanced Security pricing hidden.',
    icon: DollarSign,
  },
  {
    code: 'D5',
    name: 'Payment Processing',
    weight: '8%',
    score: 'Weak',
    color: 'red',
    wins: 'Marketplace apps can collect payment through GitHub billing.',
    losses: 'No public self-service API for upgrading or downgrading a seat programmatically. An agent cannot bump a user\'s plan without a human hitting the dashboard. No webhook for billing events on personal accounts.',
    icon: CreditCard,
  },
  {
    code: 'D6',
    name: 'Data Quality',
    weight: '10%',
    score: 'Silver',
    color: 'blue',
    wins: 'JSON responses across the board. Consistent error codes. ETags for caching. Schema.org Organization markup on the main site.',
    losses: 'A few public endpoints (raw.githubusercontent.com, some pages routes) still return HTML errors on failure rather than a JSON envelope. AGENTS.md is not published at the domain root.',
    icon: Database,
  },
  {
    code: 'D7',
    name: 'Security',
    weight: '12%',
    score: 'Strong',
    color: 'emerald',
    wins: 'OAuth 2.0 with PKCE. Fine-grained personal access tokens. SAML SSO for Enterprise. TLS 1.3. HSTS preloaded. Every scope documented.',
    losses: 'None significant. D7 is effectively maxed. The one knock is that PAT creation flow is still human-only — an agent cannot self-provision credentials without a human authorizing first.',
    icon: Shield,
  },
  {
    code: 'D8',
    name: 'Reliability',
    weight: '13%',
    score: 'Silver',
    color: 'emerald',
    wins: 'status.github.com with component-level history. Published SLA for Enterprise. Uptime well above 99.9%. Public incident post-mortems.',
    losses: 'Rate limits are tight for unauthenticated traffic (60/hour). Agents without credentials get throttled fast.',
    icon: Activity,
  },
  {
    code: 'D9',
    name: 'Agent Experience',
    weight: '10%',
    score: 'Middling',
    color: 'amber',
    wins: 'Request IDs via X-GitHub-Request-Id. Rate-limit headers. Idempotency on some write endpoints. Cursor pagination.',
    losses: 'Inconsistent idempotency across endpoints. Some errors surface as HTML via 404 on pages routes. Official MCP exists but is not linked from an agent card.',
    icon: Sparkles,
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

export default function GitHubAgentReadinessBreakdownPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why GitHub Scores 67 for Agent Readiness (And What It Gets Wrong)',
    description:
      'Dimension-by-dimension breakdown of GitHub\'s 67 Silver Agent Readiness Score. Analysis of D2 API Quality, D7 Security, D8 Reliability strengths and D4 Pricing, D5 Payment, D9 Agent Experience gaps.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/github-agent-readiness-breakdown',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'GitHub agent readiness score, GitHub API, GitHub OpenAPI, GitHub OAuth, GitHub MCP, GitHub developer tools',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'GitHub Agent Readiness Breakdown',
          item: 'https://agenthermes.ai/blog/github-agent-readiness-breakdown',
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
      title="Why GitHub Scores 67 for Agent Readiness (And What It Gets Wrong)"
      shareUrl="https://agenthermes.ai/blog/github-agent-readiness-breakdown"
      currentHref="/blog/github-agent-readiness-breakdown"
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
              <span className="text-zinc-400">GitHub Breakdown</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <GitBranch className="h-3.5 w-3.5" />
                Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-xs font-medium">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                67 Silver
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Why GitHub Scores 67 for Agent Readiness{' '}
              <span className="text-emerald-400">(And What It Gets Wrong)</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              GitHub is the reason half the top 25 on our leaderboard exists. Every company in the Silver tier was built on it. And yet GitHub itself scored 67 — Silver, not Gold. Eight points shy of the only company that broke Gold. Here is every dimension, what GitHub wins, what it loses, and the four changes that push it to 78.
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

        {/* ===== STATS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '67', label: 'GitHub Agent Readiness Score', icon: Award },
                { value: 'Silver', label: 'ARL-3 tier', icon: ShieldCheck },
                { value: '#10', label: 'rank across 500 scanned', icon: Target },
                { value: '8', label: 'points to Gold (75)', icon: BarChart3 },
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

        {/* ===== THE CONTEXT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-emerald-500" />
              The Setup
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                AgentHermes scanned 500 businesses against a 9-dimension{' '}
                <Link href="/blog/what-is-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                  Agent Readiness Score
                </Link>
                . The average was 43/100. The top cluster — Resend 75, Agora 72, Vercel 70, Statuspage 70, Supabase 69, TikTok 69, Stripe 68, Slack 68, Craft 68, GitHub 67 — is dominated by developer infrastructure. GitHub sits tenth.
              </p>
              <p>
                GitHub has a full REST API, a full GraphQL API, an OpenAPI 3.0 spec, OAuth 2.0 with PKCE, an official MCP server, a status page with component-level history, and a documented SLA. That is more agent-ready surface area than any other company on the list. So why isn&apos;t it Gold?
              </p>
              <p>
                Because the model rewards breadth, not just depth. A single Gold tier company — Resend —{' '}
                <Link href="/blog/resend-only-gold" className="text-emerald-400 hover:text-emerald-300 underline">
                  scored 75
                </Link>{' '}
                by nailing all 9 dimensions including D4 Pricing and D5 Payment. GitHub is exceptional on 6 of the 9 and middling on 3. The weighted average lands at 67.
              </p>
            </div>
          </div>
        </section>

        {/* ===== DIMENSION BY DIMENSION ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Dimension-by-Dimension Breakdown
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Each dimension uses the{' '}
              <Link href="/blog/scoring-caps-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                v4 scoring model
              </Link>
              . Weights sum to 93% of the headline score; the remaining 7% is the Agent-Native bonus.
            </p>

            <div className="space-y-3 mb-8">
              {dimensions.map((d) => {
                const colors = getColorClasses(d.color)
                return (
                  <div key={d.code} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <d.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-100 text-sm">
                          {d.code} {d.name} <span className="text-zinc-500 text-xs font-normal">({d.weight})</span>
                        </h3>
                        <span className={`text-xs ${colors.text}`}>{d.score}</span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                      <strong className="text-emerald-400">Wins:</strong> {d.wins}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <strong className="text-amber-400">Losses:</strong> {d.losses}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== THE THREE GAPS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              The Three Real Gaps
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
              <p>
                Strip out the dimensions where GitHub already dominates and three weaknesses are left.
              </p>
              <p>
                <strong className="text-zinc-100">D5 Payment Processing.</strong> GitHub&apos;s billing lives behind a human-only dashboard for personal and team accounts. An agent cannot upgrade a seat, cancel a subscription, or swap a payment method without a human. There is no equivalent of Stripe&apos;s{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">POST /v1/subscriptions</code>{' '}
                for a GitHub plan change. D5 costs GitHub about 5 points against the best dev-infra peers.
              </p>
              <p>
                <strong className="text-zinc-100">D4 Pricing Transparency.</strong> Enterprise Cloud, GHAS, and some Copilot tiers are &ldquo;contact us&rdquo; pricing. No machine-readable JSON-LD Offer schema on the pricing pages. The scanner marks this partial — full credit requires structured pricing markup plus programmatic retrieval.
              </p>
              <p>
                <strong className="text-zinc-100">D9 Agent Experience.</strong> GitHub has a real MCP server. It is just not advertised via an agent-card.json at the domain root. A scanner that only looks at github.com cannot find it. This is fixable in a single PR — add{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">/.well-known/agent-card.json</code>{' '}
                pointing at the MCP endpoint. The same PR should add{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">llms.txt</code>{' '}
                for D1 Discovery credit.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT PUSHES TO GOLD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What Would Push GitHub to Gold
            </h2>
            <div className="space-y-3 mb-6">
              {[
                {
                  step: '1',
                  title: 'Publish agent-card.json',
                  detail: 'Single JSON file at /.well-known/agent-card.json. Points at the existing MCP server and A2A skills. +3 to D1, +2 to D9.',
                },
                {
                  step: '2',
                  title: 'Ship llms.txt at the root',
                  detail: 'Index of docs, API references, and policies in markdown. +1 to D1, +1 to D6. AgentHermes auto-generates this from a business profile.',
                },
                {
                  step: '3',
                  title: 'Convert remaining HTML errors to JSON',
                  detail: 'raw.githubusercontent.com and pages routes. +2 to D6, +1 to D9.',
                },
                {
                  step: '4',
                  title: 'Publish machine-readable enterprise pricing',
                  detail: 'JSON-LD Offer schema on every pricing page, not just a contact form. +3 to D4.',
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
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Conservative math: 67 + 11 = 78. That clears the Gold threshold of 75. A more aggressive change — adding{' '}
              <Link href="/blog/x402-payment-protocol" className="text-emerald-400 hover:text-emerald-300 underline">
                x402
              </Link>{' '}
              support for agent-native per-call billing — would lift D5 another 4-6 points and push the score into Platinum territory.
            </p>
          </div>
        </section>

        {/* ===== LESSON FOR EVERYONE ELSE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              Why This Matters for the Other 499 Businesses
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
              <p>
                GitHub is 8 points from Gold. The median business is 35 points from Silver. GitHub&apos;s gaps are the expensive ones to fix — payment APIs and pricing schema require org-wide coordination. The median business&apos;s gaps are the cheap ones — a missing llms.txt, no OpenAPI spec, an HTML 404 page.
              </p>
              <p>
                That is the lesson from this breakdown. If GitHub can sit at 67 with a full OpenAPI and an MCP server, a business at 20 is not one investment away from Silver. It is ten quick fixes away. The order matters — start with{' '}
                <Link href="/blog/improve-agent-readiness-score" className="text-emerald-400 hover:text-emerald-300 underline">
                  the improve-score playbook
                </Link>{' '}
                and ship the easy wins first.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">The universal pattern:</strong> Almost every company in the top 25 — Vercel, Supabase, Stripe, GitHub, Make, Mintlify, MongoDB — sits in the 60-70 range. The 75+ tier is empty except Resend. The difference between &ldquo;good at agent readiness&rdquo; and &ldquo;best in class&rdquo; is 5 to 10 specific fixes, not a rebuild.
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
                <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
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
                { title: 'What Makes Stripe Score 68 Silver', href: '/blog/why-stripe-scores-68', tag: 'Case Study', tagColor: 'blue' },
                { title: 'Resend Is the Only Gold — What 499 Businesses Can Learn', href: '/blog/resend-only-gold', tag: 'Case Study', tagColor: 'amber' },
                { title: 'Why Developer Tools Dominate Agent Readiness', href: '/blog/developer-tools-agent-readiness', tag: 'Research', tagColor: 'emerald' },
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
              See how your domain compares to GitHub
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              GitHub scores 67 with a full OpenAPI and MCP server. Most domains score below 40. Where do you land, and what are the quick wins?
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
                See the Full Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
