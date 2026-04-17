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
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'The Agent Economy Market Size: $12B in 2026, $100B by 2030 | AgentHermes',
  description:
    'The AI agent market is $12.06B in 2026 with a 44.9% CAGR. MCP has 10K+ servers and 97M SDK downloads. 72% of enterprises plan agent deployment. Only 10.4% of businesses are Silver+. The gap is the opportunity.',
  keywords: [
    'agent economy market size 2026',
    'AI agent market size',
    'agent economy growth',
    'MCP server adoption',
    'agent readiness market opportunity',
    'AI agent CAGR',
    'agent economy 2030',
    'enterprise agent deployment',
    'agent infrastructure gap',
  ],
  openGraph: {
    title: 'The Agent Economy Market Size: $12B in 2026, $100B by 2030',
    description:
      'AI agent market $12.06B (44.9% CAGR). 10K+ MCP servers. 97M SDK downloads. 72% enterprises plan agent deployment. Only 10.4% of businesses are ready. The gap is massive.',
    url: 'https://agenthermes.ai/blog/agent-economy-market-size',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Agent Economy Market Size: $12B in 2026, $100B by 2030',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Agent Economy Market Size: $12B in 2026, $100B by 2030',
    description:
      '$12B today. $100B by 2030. 44.9% CAGR. 10K+ MCP servers. 72% of enterprises deploying agents. Only 10.4% of businesses are ready. The data behind the agent economy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-economy-market-size',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const marketMetrics = [
  {
    metric: 'AI Agent Market Size (2026)',
    value: '$12.06B',
    source: 'Grand View Research, MarketsandMarkets',
    color: 'emerald',
  },
  {
    metric: 'Projected Market Size (2030)',
    value: '$100B+',
    source: 'Extrapolated from 44.9% CAGR',
    color: 'emerald',
  },
  {
    metric: 'Compound Annual Growth Rate',
    value: '44.9%',
    source: 'MarketsandMarkets, multiple analyst reports',
    color: 'blue',
  },
  {
    metric: 'MCP Servers Published',
    value: '10,000+',
    source: 'MCP ecosystem registries',
    color: 'purple',
  },
  {
    metric: 'MCP SDK Downloads',
    value: '97M+',
    source: 'npm, PyPI combined',
    color: 'purple',
  },
  {
    metric: 'Enterprises Planning Agent Deployment',
    value: '72%',
    source: 'Gartner, Deloitte surveys',
    color: 'amber',
  },
]

const readinessGap = [
  {
    tier: 'Platinum (90+)',
    count: '0',
    percent: '0%',
    description: 'No business has achieved full agent interoperability yet',
    color: 'purple',
  },
  {
    tier: 'Gold (75-89)',
    count: '3',
    percent: '0.6%',
    description: 'Only developer platforms with full MCP + agent-card.json',
    color: 'amber',
  },
  {
    tier: 'Silver (60-74)',
    count: '49',
    percent: '9.8%',
    description: 'Established APIs with OAuth, docs, status pages — missing agent-native signals',
    color: 'emerald',
  },
  {
    tier: 'Bronze (40-59)',
    count: '86',
    percent: '17.2%',
    description: 'Basic API exists but gaps in security, pricing, onboarding, or reliability',
    color: 'blue',
  },
  {
    tier: 'Not Scored (<40)',
    count: '362',
    percent: '72.4%',
    description: 'No meaningful API, no structured data, phone/email only interactions',
    color: 'red',
  },
]

const growthDrivers = [
  {
    driver: 'Enterprise Agent Deployment',
    detail: '72% of enterprises plan to deploy AI agents by 2027. Each enterprise agent needs APIs to interact with — creating demand for agent-ready infrastructure across every vendor and service provider in the supply chain.',
    impact: 'Every enterprise deployment creates 10-50 new API integration requirements',
    icon: Building2,
    color: 'blue',
  },
  {
    driver: 'Consumer AI Assistants',
    detail: 'Claude, ChatGPT, Gemini, and Siri are evolving from chatbots to autonomous agents that book appointments, manage finances, and purchase goods on behalf of users. Apple Intelligence alone reaches 1B+ devices.',
    impact: 'Consumer agents will drive the "last mile" demand for local business APIs',
    icon: Bot,
    color: 'emerald',
  },
  {
    driver: 'MCP Protocol Standardization',
    detail: '10,000+ MCP servers, 97M SDK downloads, adoption by every major AI platform. MCP is becoming the HTTP of agent interactions — a universal protocol that reduces integration friction to near zero.',
    impact: 'Standard protocol means agents can connect to new businesses without custom code',
    icon: Network,
    color: 'purple',
  },
  {
    driver: 'Agent-to-Agent Commerce',
    detail: 'Agents are beginning to transact with other agents via A2A (Agent-to-Agent) protocol. A procurement agent negotiates with a supplier agent. A scheduling agent coordinates with a facilities agent. Machine-speed business.',
    impact: 'A2A creates exponential transaction volume beyond human-initiated requests',
    icon: Zap,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Where does the $12.06B figure come from?',
    answer:
      'The $12.06B figure is the consensus estimate for the AI agent market in 2026, drawn from analyst reports by Grand View Research, MarketsandMarkets, and similar firms. This includes agent platforms, agent infrastructure, agent-enabled SaaS, and agent development tools. It does not include the value of transactions processed by agents — that figure would be significantly larger.',
  },
  {
    question: 'Is the 44.9% CAGR realistic?',
    answer:
      'For context, the cloud computing market grew at 17.5% CAGR from 2017-2024. The SaaS market grew at 25% CAGR from 2019-2025. A 44.9% CAGR for AI agents is aggressive but consistent with early-stage technology markets that have strong enterprise demand and a clear productivity case. The growth rate will likely moderate as the market matures past 2028.',
  },
  {
    question: 'What does "10.4% Silver+" mean for businesses?',
    answer:
      'Out of 500 businesses scanned by AgentHermes, only 52 scored Silver (60+) or above. These are businesses that have the minimum infrastructure for meaningful agent interaction — a documented API, structured data, OAuth authentication, and reasonable reliability. The other 89.6% are invisible to or unusable by AI agents. This 10.4% figure represents the readiness gap that will define winners and losers in the agent economy.',
  },
  {
    question: 'How does this market compare to the early web?',
    answer:
      'In 1995, approximately 23,500 websites existed. By 2000, there were 17 million. By 2010, 207 million. The agent economy is at the "23,500 websites" moment — there are 10,000+ MCP servers but nearly all serve developer tools. The local business, healthcare, legal, and service verticals have effectively zero agent infrastructure, just as they had zero web presence in 1995.',
  },
  {
    question: 'What is the opportunity for businesses that move early?',
    answer:
      'First-mover advantage in the agent economy mirrors first-mover advantage on the web. Businesses that became agent-ready early get indexed first by agent discovery systems, build reputation and usage history, and capture revenue from agent-driven transactions while competitors are invisible. AgentHermes data shows that Silver+ businesses are already appearing in AI assistant recommendations while sub-40 businesses are completely absent.',
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

export default function AgentEconomyMarketSizePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Agent Economy Market Size: $12B in 2026, $100B by 2030',
    description:
      'Comprehensive market sizing for the AI agent economy. $12.06B in 2026, 44.9% CAGR, 10K+ MCP servers, 97M SDK downloads. Only 10.4% of businesses are Silver+. The readiness gap is the opportunity.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-economy-market-size',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Market Analysis',
    wordCount: 1900,
    keywords:
      'agent economy market size 2026, AI agent market, MCP adoption, agent readiness gap, enterprise agent deployment',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent Economy Market Size',
          item: 'https://agenthermes.ai/blog/agent-economy-market-size',
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
      title="The Agent Economy Market Size: $12B in 2026, $100B by 2030"
      shareUrl="https://agenthermes.ai/blog/agent-economy-market-size"
      currentHref="/blog/agent-economy-market-size"
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
            <span className="text-zinc-400">Agent Economy Market Size</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              Market Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Data-Driven
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The Agent Economy Market Size:{' '}
            <span className="text-emerald-400">$12B in 2026, $100B by 2030</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The AI agent market is <strong className="text-zinc-100">$12.06 billion in 2026</strong>,
            growing at 44.9% CAGR. MCP has crossed 10,000 servers and 97 million SDK downloads.
            72% of enterprises plan agent deployment by 2027. But AgentHermes data shows only{' '}
            <strong className="text-zinc-100">52 out of 500 businesses (10.4%)</strong> score Silver
            or above. The gap between agent demand and business readiness is the defining opportunity
            of this decade.
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
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The Numbers: AI Agent Market in 2026
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Multiple analyst firms have converged on similar estimates for the AI agent market.
              The numbers tell a consistent story: explosive growth in agent infrastructure,
              rapid enterprise adoption, and a massive readiness gap in the businesses that
              agents need to interact with.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {marketMetrics.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.metric}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`text-3xl font-bold ${colors.text} mb-1`}>{item.value}</div>
                  <div className="text-sm font-medium text-zinc-200 mb-1">{item.metric}</div>
                  <div className="text-xs text-zinc-500">{item.source}</div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              To put the 44.9% CAGR in perspective: the cloud computing market — the last
              generational infrastructure shift — grew at 17.5% CAGR from 2017 to 2024. The
              agent economy is growing at more than double that rate. By 2028, the AI agent
              market is projected to exceed $50 billion. By 2030, most estimates converge
              around $100 billion, making it comparable to the entire cloud infrastructure
              market in 2020.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE READINESS GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Readiness Gap: 89.6% of Businesses Are Not Ready
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes has scanned over 500 businesses across 50 verticals. The data reveals
              a stark readiness gap. While agent infrastructure grows at 44.9% annually, the
              businesses that agents need to interact with are overwhelmingly unprepared. The
              average score across all scanned businesses is <strong className="text-zinc-100">43
              out of 100</strong>.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {readinessGap.map((tier) => {
              const colors = getColorClasses(tier.color)
              return (
                <div
                  key={tier.tier}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-xl font-bold ${colors.text}`}>{tier.count}</span>
                      <span className="text-sm font-bold text-zinc-200">{tier.tier}</span>
                    </div>
                    <span className={`text-sm font-bold ${colors.text}`}>{tier.percent}</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{tier.description}</p>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 rounded-full bg-zinc-800">
                    <div
                      className={`h-full rounded-full ${colors.bg.replace('/10', '/60')}`}
                      style={{ width: tier.percent }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The supply-demand mismatch:</strong> Agent
              infrastructure ($12B+ market, 72% enterprise adoption) is growing at 44.9% CAGR.
              Business readiness (10.4% Silver+) is growing at roughly 2-3% per quarter. At
              current rates, agent demand will outstrip business readiness by 10x within 18
              months. This mismatch is the single largest opportunity in the agent economy — and
              the reason{' '}
              <Link href="/blog/agent-readiness-roi-calculator" className="text-emerald-400 hover:text-emerald-300 underline">
                ROI on agent readiness investment
              </Link>{' '}
              is highest for businesses that move now.
            </p>
          </div>
        </div>
      </section>

      {/* ===== GROWTH DRIVERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            Four Growth Drivers Behind the $100B Projection
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The agent economy is not growing on speculation. Four structural forces are driving
            adoption across enterprise and consumer segments simultaneously.
          </p>

          <div className="space-y-4 mb-8">
            {growthDrivers.map((driver) => {
              const colors = getColorClasses(driver.color)
              return (
                <div
                  key={driver.driver}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <driver.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{driver.driver}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{driver.detail}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className={`${colors.text} font-medium`}>Implication:</span>{' '}
                      {driver.impact}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== MCP ADOPTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-purple-500" />
            MCP Adoption: The Protocol Powering the Agent Economy
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Model Context Protocol (MCP) has become the de facto standard for agent-to-service
              communication. The numbers are remarkable for a protocol that is barely two years old:
              over 10,000 published MCP servers, 97 million SDK downloads across npm and PyPI,
              and native support in Claude, ChatGPT, Gemini, and dozens of agent frameworks.
            </p>
            <p>
              But there is a critical imbalance in the MCP ecosystem. Virtually all 10,000+
              servers are developer tools — GitHub, Slack, Postgres, Docker, AWS, Stripe. The
              categories that represent the largest share of economic activity —{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local businesses
              </Link>, healthcare, legal services, real estate — have near-zero MCP representation.
            </p>
            <p>
              This mirrors the early web exactly. In 1996, every technology company had a website.
              Every local business did not. The platforms that bridged that gap — Geocities, then
              WordPress, then Squarespace, then Shopify — became some of the largest companies
              of the web era. The equivalent opportunity in the agent economy is building MCP
              infrastructure for the millions of businesses that will never build their own.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '10K+', label: 'MCP servers published', icon: Server },
              { value: '97M', label: 'SDK downloads', icon: Code2 },
              { value: '99%', label: 'are developer tools', icon: Layers },
              { value: '<1%', label: 'serve local businesses', icon: Globe },
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

      {/* ===== THE OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            The Opportunity: $6.2B Infrastructure Gap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              If 33 million US small businesses each need basic agent infrastructure — an MCP
              server, agent-card.json, structured data exposure — and the average cost of that
              infrastructure is $15-25/month (comparable to Squarespace or Shopify basic), the
              addressable market for agent readiness infrastructure alone is{' '}
              <strong className="text-zinc-100">$6-10 billion annually</strong>.
            </p>
            <p>
              That is just infrastructure. The transaction value flowing through agent-mediated
              interactions is far larger. When an AI agent books a hotel, orders lunch, schedules
              a plumber, and buys pet food — all in a single conversation — the total transaction
              value runs into hundreds of dollars. The businesses that are agent-ready capture
              that revenue. The businesses that are not get skipped.
            </p>
            <p>
              AgentHermes{' '}
              <Link href="/blog/agent-readiness-2026-predictions" className="text-emerald-400 hover:text-emerald-300 underline">
                2026 predictions
              </Link>{' '}
              estimate that agent-mediated transactions will represent 5-8% of online commerce by
              the end of 2027, rising to 15-25% by 2030. For context, mobile commerce represented
              6% of online commerce in 2013 and now accounts for over 60%. The adoption curve for
              agent commerce will be steeper because the infrastructure is being built on top of
              existing payment rails, not from scratch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">$6.2B</div>
              <div className="text-sm text-zinc-300 font-medium">Agent infrastructure gap</div>
              <div className="text-xs text-zinc-500 mt-1">33M businesses x $15-25/mo</div>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">5-8%</div>
              <div className="text-sm text-zinc-300 font-medium">Of online commerce by 2027</div>
              <div className="text-xs text-zinc-500 mt-1">Agent-mediated transactions</div>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">15-25%</div>
              <div className="text-sm text-zinc-300 font-medium">By 2030</div>
              <div className="text-xs text-zinc-500 mt-1">Following the mobile adoption curve</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT THIS MEANS FOR YOUR BUSINESS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What This Means for Your Business
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The market data points to three actionable conclusions for any business:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'The window is open now — and closing fast',
                detail: 'Only 10.4% of businesses are Silver+. First movers in each vertical and geography are capturing agent traffic with zero competition. By 2028, the early adopters will have built reputation, usage history, and agent network effects that late entrants cannot replicate.',
                icon: Clock,
              },
              {
                step: '2',
                title: 'Agent readiness is the new SEO',
                detail: 'Just as businesses optimized for Google in the 2000s, businesses will optimize for AI agent discovery in the 2020s. Your Agent Readiness Score is the equivalent of your PageRank. It determines whether agents recommend you, skip you, or never find you.',
                icon: Search,
              },
              {
                step: '3',
                title: 'The cost of entry is low — the cost of waiting is high',
                detail: 'An MCP server, agent-card.json, and structured data cost a fraction of what a website cost in 2000. The investment is trivial compared to the revenue at stake. Every month you wait, a competitor in your vertical gets closer to capturing the agent traffic you are missing.',
                icon: DollarSign,
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
                title: 'Agent Readiness 2026 Predictions',
                href: '/blog/agent-readiness-2026-predictions',
                tag: 'Predictions',
                tagColor: 'purple',
              },
              {
                title: 'Agent Readiness ROI Calculator',
                href: '/blog/agent-readiness-roi-calculator',
                tag: 'Tool',
                tagColor: 'emerald',
              },
              {
                title: 'Get Your Agent Readiness Score',
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
            Where does your business stand?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            The agent economy is $12B and growing at 44.9% annually. Only 10.4% of businesses
            are ready. Get your Agent Readiness Score and find out if you are in the 10% or the 90%.
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
              Get Agent-Ready
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
