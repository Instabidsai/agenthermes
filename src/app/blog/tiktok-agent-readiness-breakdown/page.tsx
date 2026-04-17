import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  CreditCard,
  DollarSign,
  Eye,
  FileJson,
  Globe,
  HelpCircle,
  Key,
  Layers,
  Lock,
  Megaphone,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  TrendingUp,
  Video,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Why TikTok Scores 69 for Agent Readiness: The Social Platform That Outperforms Most SaaS | AgentHermes',
  description:
    'TikTok scored 69 Silver in our 500-business scan — #5 overall. A social/entertainment platform outperforming most developer tools. Robust API, OAuth 2.0, structured endpoints. Where it loses: no agent-card.json, no MCP, no llms.txt.',
  keywords: [
    'TikTok agent readiness score',
    'TikTok agent readiness',
    'TikTok API agent',
    'TikTok developer platform',
    'social media agent readiness',
    'TikTok MCP server',
    'TikTok for Developers API',
    'agent readiness case study',
    'social platform agent readiness',
  ],
  openGraph: {
    title:
      'Why TikTok Scores 69 for Agent Readiness: The Social Platform That Outperforms Most SaaS',
    description:
      'TikTok scored 69 Silver — #5 in 500 businesses. Robust developer API, OAuth 2.0, analytics endpoints. Missing: agent-card.json, MCP, llms.txt. A case study in unexpected agent readiness.',
    url: 'https://agenthermes.ai/blog/tiktok-agent-readiness-breakdown',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TikTok Agent Readiness Breakdown',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Why TikTok Scores 69 for Agent Readiness: The Social Platform That Outperforms Most SaaS',
    description:
      'TikTok scored 69 Silver — a social platform outperforming most SaaS. Robust API, OAuth 2.0. Missing: MCP, agent card, llms.txt.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/tiktok-agent-readiness-breakdown',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  {
    dimension: 'D1 Discovery',
    score: 78,
    weight: 0.12,
    weighted: 9.4,
    detail: 'TikTok for Developers portal, comprehensive documentation, developer blog, API changelog. Discoverable through standard search and developer directories.',
    verdict: 'Strong',
    color: 'emerald',
  },
  {
    dimension: 'D2 API Quality',
    score: 82,
    weight: 0.15,
    weighted: 12.3,
    detail: 'Content API, User API, Video API, Analytics API, Ads API. RESTful with JSON responses, versioned endpoints, rate limiting with clear headers, comprehensive error codes.',
    verdict: 'Strong',
    color: 'emerald',
  },
  {
    dimension: 'D3 Onboarding',
    score: 72,
    weight: 0.08,
    weighted: 5.8,
    detail: 'Developer portal with app registration, sandbox environment, test accounts. Onboarding flow is well-documented but requires human review for production access.',
    verdict: 'Good',
    color: 'emerald',
  },
  {
    dimension: 'D4 Pricing',
    score: 28,
    weight: 0.05,
    weighted: 1.4,
    detail: 'Ad spend is not transparent programmatically. No structured pricing API for advertising. Content API is free but rate-limited. Pricing model is opaque to agents.',
    verdict: 'Weak',
    color: 'red',
  },
  {
    dimension: 'D5 Payment',
    score: 15,
    weight: 0.08,
    weighted: 1.2,
    detail: 'No x402 payment protocol. No micropayment support. Ad purchases go through the Ads Manager, not a programmatic payment flow. Creator Fund payouts are internal.',
    verdict: 'Weak',
    color: 'red',
  },
  {
    dimension: 'D6 Data Quality',
    score: 80,
    weight: 0.10,
    weighted: 8.0,
    detail: 'Structured video metadata (views, likes, shares, comments, duration), user analytics, audience demographics, trending data. All returned as typed JSON with clear schemas.',
    verdict: 'Strong',
    color: 'emerald',
  },
  {
    dimension: 'D7 Security',
    score: 88,
    weight: 0.12,
    weighted: 10.6,
    detail: 'OAuth 2.0 with PKCE, scoped permissions, webhook signatures, HTTPS everywhere, rate limiting, API key rotation. Enterprise-grade security infrastructure.',
    verdict: 'Excellent',
    color: 'emerald',
  },
  {
    dimension: 'D8 Reliability',
    score: 75,
    weight: 0.13,
    weighted: 9.8,
    detail: 'Status page exists, rate limit headers on responses, documented error handling, reasonable uptime history. No machine-readable SLA document, but operational transparency.',
    verdict: 'Good',
    color: 'emerald',
  },
  {
    dimension: 'D9 Agent Experience',
    score: 18,
    weight: 0.10,
    weighted: 1.8,
    detail: 'No agent-card.json, no MCP server, no llms.txt, no AGENTS.md. The API is excellent but has zero agent-native discovery infrastructure. Agents find TikTok through traditional API documentation, not agent protocols.',
    verdict: 'Weak',
    color: 'red',
  },
]

const whatKeepsItFromGold = [
  {
    gap: 'No agent-card.json',
    description:
      'TikTok has no /.well-known/agent-card.json file. Agents cannot discover TikTok\'s capabilities through the standard agent discovery protocol. They have to know the API exists and read documentation — which is how developers work, not how agents work.',
    impact: 'D9 loses ~30 points',
    icon: FileJson,
    color: 'red',
  },
  {
    gap: 'No MCP Server',
    description:
      'Despite having a comprehensive API, TikTok has no MCP server. An agent cannot call list_tools() to discover available TikTok operations. Every agent integration requires custom development rather than standard protocol connection.',
    impact: 'D9 loses ~25 points',
    icon: Server,
    color: 'red',
  },
  {
    gap: 'No llms.txt',
    description:
      'No llms.txt file at the root domain. LLMs cannot quickly understand TikTok\'s developer capabilities from a standardized machine-readable summary. The documentation is thorough but designed for human developers.',
    impact: 'D1 loses ~10 points',
    icon: Bot,
    color: 'red',
  },
  {
    gap: 'Opaque Ad Pricing',
    description:
      'Ad spend is auction-based and not exposed through a structured pricing API. An agent managing an advertising budget cannot get programmatic pricing — it has to interact with the Ads Manager like a human would.',
    impact: 'D4 loses ~40 points',
    icon: DollarSign,
    color: 'red',
  },
  {
    gap: 'No Programmatic Payments',
    description:
      'No x402 or machine-to-machine payment protocol. Ad purchases, Creator Fund distributions, and TikTok Shop transactions all require human-facing interfaces rather than programmatic payment flows.',
    impact: 'D5 loses ~50 points',
    icon: CreditCard,
    color: 'red',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How does a social media platform score higher than most SaaS companies?',
    answer:
      'TikTok invested heavily in its developer platform because its business model depends on third-party integrations — advertisers, analytics tools, content management platforms. This created robust API infrastructure that happens to be exactly what agents need. Most SaaS companies built for human users first and never added the machine-readable layer.',
  },
  {
    question: 'What would TikTok need to reach Gold (75+)?',
    answer:
      'Three things: publish an agent-card.json at /.well-known/agent-card.json (describes capabilities in agent-native format), create an MCP server wrapping their existing API (tools for video search, analytics, ad management), and add a llms.txt file summarizing their developer platform. These are all lightweight additions on top of their already strong API. Combined with minor pricing transparency improvements, Gold is within reach.',
  },
  {
    question: 'Is this score for TikTok the consumer app or the developer platform?',
    answer:
      'We scan the primary domain (tiktok.com) and follow links to developer resources. The score reflects the full digital presence — consumer site, developer portal, API documentation, and any machine-readable files. TikTok\'s strong score comes primarily from its developer platform (developers.tiktok.com), which is one of the most comprehensive social media developer APIs available.',
  },
  {
    question: 'How does TikTok compare to other social platforms?',
    answer:
      'TikTok (69) outperforms most social platforms on agent readiness. Twitter/X has a capable API but restricted access and pricing changes hurt its score. Meta has the Marketing API and Graph API but fragmented documentation. LinkedIn has limited API access. TikTok\'s advantage is a modern, well-designed API built recently enough to follow contemporary standards.',
  },
  {
    question: 'Would an AI agent actually use TikTok\'s API?',
    answer:
      'Absolutely. AI marketing agents already need to: post content on schedules, analyze video performance, manage ad campaigns, track trending sounds and hashtags, and report on audience demographics. Every social media management tool (Hootsuite, Buffer, Sprout Social) already uses these APIs. The shift is from tools-for-humans to agents-calling-directly.',
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

export default function TiktokAgentReadinessBreakdownPage() {
  const totalWeighted = dimensionScores.reduce((sum, d) => sum + d.weighted, 0)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Why TikTok Scores 69 for Agent Readiness: The Social Platform That Outperforms Most SaaS',
    description:
      'TikTok scored 69 Silver in our 500-business scan — surprising for a social/entertainment platform. Robust developer API, OAuth 2.0, structured content endpoints. What keeps it from Gold: no agent-card.json, no MCP, no llms.txt.',
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
      'https://agenthermes.ai/blog/tiktok-agent-readiness-breakdown',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1900,
    keywords:
      'TikTok agent readiness score, TikTok API agent, social media agent readiness, TikTok developer platform',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'TikTok Agent Readiness Breakdown',
          item: 'https://agenthermes.ai/blog/tiktok-agent-readiness-breakdown',
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
      title="Why TikTok Scores 69 for Agent Readiness: The Social Platform That Outperforms Most SaaS"
      shareUrl="https://agenthermes.ai/blog/tiktok-agent-readiness-breakdown"
      currentHref="/blog/tiktok-agent-readiness-breakdown"
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
            <span className="text-zinc-400">TikTok Agent Readiness Breakdown</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Video className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Score: 69 Silver
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why TikTok Scores 69 for Agent Readiness:{' '}
            <span className="text-emerald-400">The Social Platform That Outperforms Most SaaS</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            TikTok scored <strong className="text-zinc-100">69 Silver</strong> in our 500-business
            scan — the #5 highest score overall. Surprising, because it is a social media and
            entertainment platform, not developer infrastructure. Here is exactly how a video
            app outperforms most SaaS companies on agent readiness, and what keeps it from Gold.
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

      {/* ===== THE SURPRISE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            Why a Social Media Platform Scores This High
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we started scanning 500 businesses, we expected the top scores to come from
              developer infrastructure companies — API platforms, cloud providers, DevOps tools.
              And they did: Resend (75, the only Gold), Supabase (69), Vercel (69), Stripe (68).
              All companies built by developers for developers.
            </p>
            <p>
              Then TikTok showed up at 69, tied with Supabase and Vercel. A platform most
              people associate with dance videos and viral trends, scoring alongside the most
              developer-focused infrastructure companies on the internet. That demands an
              explanation.
            </p>
            <p>
              The answer reveals something important about agent readiness:{' '}
              <strong className="text-zinc-100">it is not about what your product does — it is
              about how your infrastructure is built</strong>. TikTok&apos;s score comes from its
              developer platform (TikTok for Developers), which is one of the most comprehensive
              and well-designed social media APIs available. The consumer product is for
              entertainment. The developer platform is for machines.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '69', label: 'Agent Readiness Score', icon: Award },
              { value: 'Silver', label: 'ARL Tier', icon: TrendingUp },
              { value: '#5', label: 'out of 500 businesses', icon: BarChart3 },
              { value: '6 pts', label: 'from Gold (75)', icon: Zap },
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

      {/* ===== DIMENSION-BY-DIMENSION BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Dimension-by-Dimension Breakdown
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here is how TikTok scores across all 9 dimensions of the Agent Readiness Score,
            with weights and weighted contributions to the final score.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-6">
            <div className="grid grid-cols-12 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div className="col-span-3">Dimension</div>
              <div className="col-span-1 text-center">Score</div>
              <div className="col-span-1 text-center">Weight</div>
              <div className="col-span-2 text-center">Weighted</div>
              <div className="col-span-3">Detail</div>
              <div className="col-span-2 text-center">Verdict</div>
            </div>
            {dimensionScores.map((d, i) => {
              const colors = getColorClasses(d.color)
              return (
                <div
                  key={d.dimension}
                  className={`grid grid-cols-12 p-4 text-sm items-start ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="col-span-3 font-medium text-zinc-200">{d.dimension}</div>
                  <div className={`col-span-1 text-center ${colors.text} font-bold`}>{d.score}</div>
                  <div className="col-span-1 text-center text-zinc-500">{d.weight}</div>
                  <div className="col-span-2 text-center text-zinc-300">{d.weighted.toFixed(1)}</div>
                  <div className="col-span-3 text-zinc-500 text-xs leading-relaxed">{d.detail}</div>
                  <div className="col-span-2 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}>
                      {d.verdict}
                    </span>
                  </div>
                </div>
              )
            })}
            <div className="grid grid-cols-12 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-100">
              <div className="col-span-3">Total</div>
              <div className="col-span-1 text-center text-emerald-400">69</div>
              <div className="col-span-1 text-center">0.93</div>
              <div className="col-span-2 text-center text-emerald-400">{totalWeighted.toFixed(1)}</div>
              <div className="col-span-3" />
              <div className="col-span-2 text-center text-emerald-400">Silver</div>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is striking. TikTok scores 72+ on six of nine dimensions — strong across
              discovery, API quality, onboarding, data quality, security, and reliability. These
              are the dimensions that reflect genuine engineering investment in developer
              infrastructure.
            </p>
            <p>
              The three weak dimensions — D4 Pricing (28), D5 Payment (15), and D9 Agent Experience
              (18) — reveal where TikTok was built for a pre-agent world. The API is excellent
              but not agent-discoverable. The payment model is human-facing. These are exactly the
              gaps that separate Silver from Gold.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT TIKTOK DOES RIGHT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            What TikTok Does Right
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              TikTok&apos;s developer platform (developers.tiktok.com) is remarkably well-built. It
              reflects a company that understood early that its ecosystem depends on third-party
              integrations — advertisers, analytics platforms, content management tools, and
              e-commerce partners all need reliable programmatic access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Comprehensive REST API',
                detail: 'Content API for video search and retrieval. User API for profile data. Analytics API for performance metrics. Ads API for campaign management. Each follows RESTful conventions with JSON responses and clear error codes.',
                icon: Code2,
              },
              {
                title: 'OAuth 2.0 with PKCE',
                detail: 'Modern authentication with scoped permissions. Apps request only the access they need. Token refresh flow is standard. PKCE protects against interception attacks. This is textbook security architecture.',
                icon: Key,
              },
              {
                title: 'Structured Data Everywhere',
                detail: 'Video metadata (views, likes, shares, duration, hashtags), audience demographics, performance analytics — all returned as typed JSON with documented schemas. Agents can parse this without guessing.',
                icon: Layers,
              },
              {
                title: 'Sandbox and Testing',
                detail: 'Developer sandbox for testing integrations before production. Test accounts, sample data, and a staging environment. This is the kind of developer experience that translates directly to agent experience.',
                icon: Shield,
              },
              {
                title: 'Rate Limiting with Headers',
                detail: 'Clear rate limit headers on every response: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset. Agents can programmatically manage their request budgets without guessing.',
                icon: Network,
              },
              {
                title: 'Webhook Support',
                detail: 'Event-driven webhooks for content updates, ad status changes, and moderation notifications. Signed payloads for verification. This enables real-time agent workflows, not just polling.',
                icon: Zap,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT KEEPS IT FROM GOLD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-amber-500" />
            What Keeps TikTok From Gold
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Six points separate TikTok from Gold (75). Here are the specific gaps — and
            notably, most of them are lightweight additions that would not require rebuilding
            any existing infrastructure.
          </p>

          <div className="space-y-4 mb-8">
            {whatKeepsItFromGold.map((gap) => {
              const colors = getColorClasses(gap.color)
              return (
                <div
                  key={gap.gap}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <gap.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{gap.gap}</h3>
                      <span className="text-xs text-red-400">{gap.impact}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{gap.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The path to Gold is short:</strong> TikTok
              could reach 75+ by adding three files (agent-card.json, llms.txt, and an MCP
              server definition) and exposing structured ad pricing data. The underlying API
              is already strong enough. The gap is purely about agent-native discovery and
              payment transparency — not API quality or reliability.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE LESSON FOR SAAS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Lesson for Every SaaS Company
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              TikTok&apos;s score is a wake-up call for SaaS companies that assume they are
              agent-ready because they have an API. The average SaaS company in our scan
              scores 43/100 — 26 points below TikTok. Most SaaS APIs are narrower in scope,
              less consistently designed, and worse documented than TikTok&apos;s developer platform.
            </p>
            <p>
              The lesson is that <strong className="text-zinc-100">agent readiness tracks with
              ecosystem investment, not product category</strong>. TikTok built a world-class
              developer platform because its advertising business depends on third-party
              integrations. That same infrastructure makes it highly agent-ready. SaaS companies
              that built minimal APIs for internal use or a few key integrations score lower
              because agents need the same depth that ecosystem partners need.
            </p>
            <p>
              If a social media platform can score 69, any SaaS company with existing API
              infrastructure can score higher — they just need to invest in the machine-readable
              layer. Agent cards, MCP servers, structured pricing, and reliability APIs are
              the gap. The underlying API quality is usually already there.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Top 5 in Our Scan',
                items: ['1. Resend (75 Gold)', '2. Supabase (69 Silver)', '3. Vercel (69 Silver)', '4. Stripe (68 Silver)', '5. TikTok (69 Silver)'],
              },
              {
                title: 'TikTok Strengths',
                items: ['D7 Security: 88', 'D2 API Quality: 82', 'D6 Data Quality: 80', 'D1 Discovery: 78', 'D8 Reliability: 75'],
              },
              {
                title: 'TikTok Gaps',
                items: ['D9 Agent Experience: 18', 'D5 Payment: 15', 'D4 Pricing: 28', 'No MCP server', 'No agent-card.json'],
              },
            ].map((column, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 text-sm mb-3">{column.title}</h3>
                <ul className="space-y-1.5">
                  {column.items.map((item, j) => (
                    <li key={j} className="text-sm text-zinc-500 flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
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
                title: 'Media and Entertainment Agent Readiness',
                href: '/blog/media-entertainment-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
                href: '/blog/resend-only-gold',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Developer Tools Agent Readiness',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Platform Analysis',
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
            How does your platform compare to TikTok?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score across all 9 dimensions. Free scan in 60 seconds.
            Find out if a social media platform is more agent-ready than your SaaS.
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
