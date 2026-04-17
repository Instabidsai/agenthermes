import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Globe,
  HelpCircle,
  Layers,
  LineChart,
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
  title:
    "The Investor's Guide to Agent Readiness: How to Evaluate a Company's AI Infrastructure | AgentHermes",
  description:
    'VCs and PEs should add agent readiness to due diligence. Companies that score Silver+ will capture AI-driven revenue. Companies at Bronze will be disintermediated. Here is the framework.',
  keywords: [
    'investor evaluate agent readiness',
    'agent readiness due diligence',
    'AI infrastructure investment',
    'agent readiness score investment',
    'VC agent readiness',
    'PE technology evaluation',
    'AI defensibility moat',
    'agent economy investment thesis',
    'MCP investment',
  ],
  openGraph: {
    title:
      "The Investor's Guide to Agent Readiness: How to Evaluate a Company's AI Infrastructure",
    description:
      'Agent readiness is the new tech due diligence metric. Companies scoring Silver+ will capture AI-driven revenue. Here is how to screen your portfolio.',
    url: 'https://agenthermes.ai/blog/investor-guide-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "The Investor's Guide to Agent Readiness",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      "The Investor's Guide to Agent Readiness: How to Evaluate a Company's AI Infrastructure",
    description:
      'Agent readiness belongs in every tech due diligence checklist. The companies with high D2+D7+D8 scores have sustainable moats. Here is the investor framework.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/investor-guide-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dueDiligenceChecklist = [
  {
    category: 'Agent Readiness Score',
    description:
      'The single metric that captures API quality, security, reliability, documentation, pricing transparency, and agent experience across 9 weighted dimensions. Run a free scan at agenthermes.ai/audit.',
    threshold: 'Silver (60+) = defensible. Bronze (40-59) = catching up. Below 40 = tech debt liability.',
    icon: BarChart3,
    color: 'emerald',
  },
  {
    category: 'MCP Server Presence',
    description:
      'Does the company have a Model Context Protocol server? MCP is the emerging standard for how AI agents discover and interact with services. Presence indicates forward-looking infrastructure investment.',
    threshold: 'Has MCP = ahead of 99% of businesses. No MCP = standard, but needs a roadmap.',
    icon: Server,
    color: 'blue',
  },
  {
    category: 'API-First Architecture',
    description:
      'Is the product built API-first or web-first? API-first companies (Stripe, Twilio, Plaid) are inherently more agent-ready than web-first companies that bolt on APIs later.',
    threshold: 'Documented public API with versioning = strong. No API or internal-only API = structural risk.',
    icon: Code2,
    color: 'purple',
  },
  {
    category: 'Developer Documentation Quality',
    description:
      'AI agents consume documentation to understand what an API does. OpenAPI specs, interactive playgrounds, and structured error codes directly improve agent interaction success rates.',
    threshold: 'OpenAPI spec + examples + error reference = Silver-tier docs. PDF-only or wiki = liability.',
    icon: Layers,
    color: 'amber',
  },
  {
    category: 'Security Posture (D7)',
    description:
      'TLS everywhere, OAuth 2.0 or API key authentication, rate limiting with transparent headers, and structured error responses. Security-first APIs are also agent-first APIs.',
    threshold: 'D7 score above 70 = production-grade. D7 below 50 = vulnerabilities agents will expose.',
    icon: Shield,
    color: 'emerald',
  },
  {
    category: 'Discovery Infrastructure',
    description:
      'Does the company have agent-card.json, llms.txt, robots.txt configured for AI crawlers, and structured data markup? These are the signals AI agents and search platforms use for discovery.',
    threshold: 'All discovery files present = proactive. Zero = invisible to AI-driven channels.',
    icon: Search,
    color: 'blue',
  },
]

const scoringDimensions = [
  {
    dim: 'D2 API Quality',
    weight: 0.15,
    investorSignal:
      'Core technical capability. High D2 = clean architecture, versioned endpoints, structured responses. This is the hardest dimension to fix retroactively.',
  },
  {
    dim: 'D7 Security',
    weight: 0.12,
    investorSignal:
      'Risk indicator. Low D7 = the company will face security incidents when agents start probing. Agents amplify existing security gaps.',
  },
  {
    dim: 'D8 Reliability',
    weight: 0.13,
    investorSignal:
      'Operational maturity. High D8 = proper rate limiting, monitoring, and error handling. This dimension predicts whether agent traffic will crash the platform.',
  },
  {
    dim: 'D1 Discovery',
    weight: 0.12,
    investorSignal:
      'Market positioning. High D1 = agents already find and recommend this company. Low D1 = invisible to AI-driven customer acquisition.',
  },
  {
    dim: 'D6 Data Quality',
    weight: 0.1,
    investorSignal:
      'Data asset value. High D6 = structured, machine-readable data that agents can process. This is the raw material for AI-driven interactions.',
  },
  {
    dim: 'D9 Agent Experience',
    weight: 0.1,
    investorSignal:
      'Forward-looking investment. High D9 = the company is actively building for the agent economy. D9 includes MCP, agent-card.json, and agent-specific documentation.',
  },
]

const portfolioTiers = [
  {
    tier: 'Platinum (90+)',
    examples: 'No company has reached Platinum yet',
    investorView:
      'Category-defining agent infrastructure. First-mover advantage in the agent economy. Premium valuation justified by defensible moat.',
    color: 'emerald',
  },
  {
    tier: 'Gold (75-89)',
    examples: 'No company has reached Gold yet (Supabase and Vercel at 69 are closest)',
    investorView:
      'Exceptional technical infrastructure. Strong API, documentation, and security. Ready for agent-driven revenue with minor additions (MCP, agent-card).',
    color: 'emerald',
  },
  {
    tier: 'Silver (60-74)',
    examples: 'Stripe 68, GitHub 65, Slack 68, Vercel 69, Supabase 69',
    investorView:
      'Production-grade API with good documentation and security. Can capture agent traffic today. Defend-and-extend position.',
    color: 'blue',
  },
  {
    tier: 'Bronze (40-59)',
    examples: 'Shopify 52, HubSpot 48, Salesforce 45, Most SaaS companies',
    investorView:
      'API exists but has gaps. Agents can interact with friction. 6-12 month runway to reach Silver. Investment in agent readiness needed.',
    color: 'amber',
  },
  {
    tier: 'Not Scored (<40)',
    examples: 'Most local businesses, legacy enterprises, government services',
    investorView:
      'No meaningful agent infrastructure. High risk of disintermediation by agent-ready competitors. Tech debt liability unless addressed.',
    color: 'red',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question:
      'Why should investors care about agent readiness now?',
    answer:
      'Because the window for establishing agent-ready infrastructure is closing. Companies that build agent-accessible APIs, MCP servers, and discovery files now will capture AI-driven revenue streams as agent adoption grows. Companies that wait will face the same competitive disadvantage as businesses that were late to mobile or late to the web. The data from our 500 scans shows that average agent readiness is 43/100 — the entire market is early, which means the gap between leaders and laggards will widen rapidly.',
  },
  {
    question:
      'How does agent readiness correlate with company valuation?',
    answer:
      'We do not yet have enough longitudinal data to prove direct valuation correlation, but the proxy metrics are strong. Companies with high agent readiness scores tend to have high developer satisfaction (strong API = strong developer experience), lower customer acquisition costs (agents recommend them), and more defensible technical moats. The scoring model weights D2 (API), D7 (Security), and D8 (Reliability) highest — the same dimensions that predict technical quality in traditional engineering due diligence.',
  },
  {
    question:
      'Can a company improve its agent readiness score quickly?',
    answer:
      'Yes. The fastest improvements come from discovery infrastructure: adding agent-card.json, llms.txt, and structured data can add 10-15 points in a week. Documenting rate limits and exposing rate-limit headers adds another 5-8 points. These are configuration changes, not architecture changes. Deeper improvements — API versioning, structured error responses, MCP servers — take 3-6 months but yield 20-30 points. We have documented the full improvement path in our Bronze-to-Silver and Silver-to-Gold guides.',
  },
  {
    question:
      'What is the biggest red flag for an investor evaluating agent readiness?',
    answer:
      'No public API at all. A company with no API in 2026 has a fundamental architecture problem that affects more than agent readiness — it indicates a lack of platform thinking, no developer ecosystem, and no integration strategy. The second biggest red flag is a D7 Security score below 40, which means the company has significant security gaps that agent traffic will amplify. Agents probe APIs systematically, and they will find vulnerabilities that casual human users miss.',
  },
  {
    question:
      'Should I scan my entire portfolio?',
    answer:
      'Yes. AgentHermes scans are free at agenthermes.ai/audit and take 60 seconds each. We recommend scanning every portfolio company, ranking them by score, and then categorizing: Silver+ companies are positioned for the agent economy, Bronze companies need a 6-month roadmap, and sub-40 companies need immediate architectural assessment. This gives you a quantified view of AI infrastructure risk across your portfolio.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function InvestorGuideAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      "The Investor's Guide to Agent Readiness: How to Evaluate a Company's AI Infrastructure",
    description:
      'VCs and PEs should add agent readiness to due diligence. Companies that score Silver+ will capture AI-driven revenue. A complete investment framework.',
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
      'https://agenthermes.ai/blog/investor-guide-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Investment Research',
    wordCount: 1900,
    keywords:
      'investor evaluate agent readiness, agent readiness due diligence, AI infrastructure investment, VC agent readiness, agent economy investment thesis',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://agenthermes.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: "The Investor's Guide to Agent Readiness",
          item: 'https://agenthermes.ai/blog/investor-guide-agent-readiness',
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
      title="The Investor's Guide to Agent Readiness: How to Evaluate a Company's AI Infrastructure"
      shareUrl="https://agenthermes.ai/blog/investor-guide-agent-readiness"
      currentHref="/blog/investor-guide-agent-readiness"
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
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-400">
                {"The Investor's Guide to Agent Readiness"}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <LineChart className="h-3.5 w-3.5" />
                Investment Research
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                Due Diligence
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              {"The Investor's Guide to Agent Readiness: "}
              <span className="text-emerald-400">
                {"How to Evaluate a Company's AI Infrastructure"}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Every technology investment thesis eventually includes a
              platform shift question: will this company win or lose when
              the next wave hits? The agent economy is that wave. We
              scanned 500 businesses and found that the average Agent
              Readiness Score is{' '}
              <strong className="text-zinc-100">43 out of 100</strong>.
              The gap between Silver-tier companies and the rest maps
              directly to AI defensibility. Here is how to add agent
              readiness to your due diligence framework.
            </p>

            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
              <div className="author-avatar">AH</div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">
                  AgentHermes Research
                </div>
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

        {/* ===== THE INVESTMENT THESIS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              The Investment Thesis: Agent Readiness = AI Defensibility
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                AI agents are becoming the primary interface between consumers
                and businesses. When someone asks Claude to &ldquo;find me the
                best project management tool for a 10-person team,&rdquo; the
                agent queries APIs, reads documentation, evaluates pricing
                structures, and makes a recommendation. The business with the
                best API, the clearest documentation, and the most
                agent-accessible infrastructure wins that recommendation.
              </p>
              <p>
                This is not speculative. Stripe processes agent-initiated API
                calls today. GitHub Copilot integrates directly with the
                GitHub API. Shopify apps increasingly use agent-driven
                interactions for store management. The businesses scoring
                Silver and above on agent readiness are already capturing
                AI-driven traffic. The businesses scoring below 40 are
                invisible to this channel entirely.
              </p>
              <p>
                For investors, agent readiness is a leading indicator of
                technical quality and strategic positioning. A company with
                high D2 (API Quality), D7 (Security), and D8 (Reliability)
                scores has built infrastructure that is both agent-ready and
                generally excellent. These three dimensions represent{' '}
                <strong className="text-zinc-100">
                  40% of the total score weight
                </strong>{' '}
                and correlate with the technical moats that drive long-term
                defensibility.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                {
                  value: '500',
                  label: 'businesses scanned',
                  icon: Search,
                },
                {
                  value: '43',
                  label: 'average score (out of 100)',
                  icon: BarChart3,
                },
                {
                  value: '14%',
                  label: 'reach Silver or above',
                  icon: TrendingUp,
                },
                {
                  value: '9',
                  label: 'scoring dimensions',
                  icon: Layers,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DUE DILIGENCE CHECKLIST ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              The Agent Readiness Due Diligence Checklist
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Six metrics to evaluate in every technology investment. Each
              maps to specific dimensions in the AgentHermes scoring model
              and can be assessed with a free 60-second scan.
            </p>

            <div className="space-y-4 mb-8">
              {dueDiligenceChecklist.map((item) => {
                const colorMap: Record<
                  string,
                  { text: string; bg: string; border: string }
                > = {
                  emerald: {
                    text: 'text-emerald-400',
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/20',
                  },
                  blue: {
                    text: 'text-blue-400',
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/20',
                  },
                  purple: {
                    text: 'text-purple-400',
                    bg: 'bg-purple-500/10',
                    border: 'border-purple-500/20',
                  },
                  amber: {
                    text: 'text-amber-400',
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/20',
                  },
                }
                const colors = colorMap[item.color] || colorMap.emerald
                return (
                  <div
                    key={item.category}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-base font-bold text-zinc-100">
                        {item.category}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">
                          Threshold:
                        </span>{' '}
                        <span className="text-emerald-400">
                          {item.threshold}
                        </span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== SCORING DIMENSIONS FOR INVESTORS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              Reading the Score: What Each Dimension Tells an Investor
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              The Agent Readiness Score is composed of 9 weighted dimensions.
              Here is what the six highest-weight dimensions signal about a
              {"company's"} technical infrastructure and competitive position.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Dimension</div>
                <div>Weight</div>
                <div className="col-span-2">Investor Signal</div>
              </div>
              {scoringDimensions.map((row, i) => (
                <div
                  key={row.dim}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.dim}</div>
                  <div className="text-emerald-400 font-bold">
                    {row.weight}
                  </div>
                  <div className="col-span-2 text-zinc-400">
                    {row.investorSignal}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">The moat formula:</strong>{' '}
                Companies with high D2 + D7 + D8 scores (combined weight
                0.40) have a sustainable technical moat. These dimensions
                measure API architecture, security posture, and operational
                reliability — the hardest things for competitors to
                replicate. High scores here predict that the company will
                capture agent-driven revenue as the channel grows, because
                agents prefer reliable, secure, well-structured APIs. See the{' '}
                <Link
                  href="/blog/agent-readiness-roi-calculator"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  ROI calculator
                </Link>{' '}
                for revenue impact modeling.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PORTFOLIO TIER FRAMEWORK ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Portfolio Screening: Tier-by-Tier Framework
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Scan every company in your portfolio. Rank by score. Then use
              this framework to categorize risk and opportunity.
            </p>

            <div className="space-y-4 mb-8">
              {portfolioTiers.map((item) => {
                const colorMap: Record<
                  string,
                  { text: string; bg: string; border: string }
                > = {
                  emerald: {
                    text: 'text-emerald-400',
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/20',
                  },
                  blue: {
                    text: 'text-blue-400',
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/20',
                  },
                  amber: {
                    text: 'text-amber-400',
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/20',
                  },
                  red: {
                    text: 'text-red-400',
                    bg: 'bg-red-500/10',
                    border: 'border-red-500/20',
                  },
                }
                const colors = colorMap[item.color] || colorMap.emerald
                return (
                  <div
                    key={item.tier}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}
                      >
                        {item.tier}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 mb-2">
                      <span className="text-zinc-400 font-medium">
                        Examples:
                      </span>{' '}
                      {item.examples}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      <span className="text-zinc-400 font-medium">
                        Investor view:
                      </span>{' '}
                      {item.investorView}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== DISINTERMEDIATION RISK ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              The Disintermediation Risk
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Companies with low agent readiness scores face a specific,
                quantifiable risk: disintermediation by agent-ready
                competitors. When AI agents compare options for users, they
                interact with APIs, not websites. A company with a clean API,
                structured pricing data, and agent discovery files will be
                recommended. A company with a PDF price list and a
                &ldquo;contact us&rdquo; form will be skipped.
              </p>
              <p>
                This is already happening in developer tools. When a developer
                asks an AI assistant for a payment processing recommendation,
                the assistant can interact with Stripe&apos;s API to check
                pricing, test features, and read documentation. It cannot do
                the same with a payment processor that has no API. The
                recommendation goes to Stripe every time. As agent adoption
                spreads from developer tools to broader SaaS, e-commerce, and
                services, this pattern will repeat in every vertical.
              </p>
              <p>
                The{' '}
                <Link
                  href="/blog/agent-economy-market-size"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  agent economy market size
                </Link>{' '}
                is projected to reach $47 billion by 2028. Companies that
                are invisible to AI agents will miss an increasingly large
                share of customer acquisition and transaction volume. For
                portfolio companies in competitive markets, this is not a
                nice-to-have metric — it is a survival indicator.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-amber-400">
                  The parallel to SEO:
                </strong>{' '}
                In the 2010s, companies that ignored SEO watched competitors
                capture organic search traffic. The remedy was expensive and
                time-consuming: years of content creation, link building, and
                technical optimization. Agent readiness is the same dynamic
                at an earlier stage. Building now is 10x cheaper than
                catching up later. See our{' '}
                <Link
                  href="/blog/cto-guide-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  CTO guide
                </Link>{' '}
                for the technical implementation roadmap.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HOW TO SCAN YOUR PORTFOLIO ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" />
              How to Scan Your Portfolio
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Running an agent readiness assessment across your portfolio
                takes minutes, not months. Here is the process.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Scan each company at agenthermes.ai/audit',
                  detail:
                    'Enter the domain for each portfolio company. Each scan takes 60 seconds and evaluates all 9 dimensions. No authentication or setup required.',
                  icon: Search,
                },
                {
                  step: '2',
                  title: 'Export scores to a comparison spreadsheet',
                  detail:
                    'Record the overall score, tier, and individual dimension scores for each company. Pay special attention to D2, D7, and D8 as they signal core technical quality.',
                  icon: BarChart3,
                },
                {
                  step: '3',
                  title: 'Identify the gap portfolio',
                  detail:
                    'Companies scoring below 40 need immediate attention. Companies between 40-59 need a 6-month roadmap to Silver. Companies at 60+ are positioned and need maintenance.',
                  icon: Target,
                },
                {
                  step: '4',
                  title: 'Include in board-level reporting',
                  detail:
                    'Agent readiness scores belong alongside NPS, ARR, and churn in quarterly board decks. The score trends over time reveal whether the company is building for the AI future or falling behind.',
                  icon: LineChart,
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
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50"
        >
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
                  <h3 className="text-base font-bold text-zinc-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ARTICLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: 'Agent Readiness ROI Calculator',
                  href: '/blog/agent-readiness-roi-calculator',
                  tag: 'Tool',
                  tagColor: 'emerald',
                },
                {
                  title:
                    'The Agent Economy Market Size: $47B by 2028',
                  href: '/blog/agent-economy-market-size',
                  tag: 'Research',
                  tagColor: 'blue',
                },
                {
                  title:
                    "The CTO's Guide to Agent Readiness",
                  href: '/blog/cto-guide-agent-readiness',
                  tag: 'Executive Guide',
                  tagColor: 'purple',
                },
              ].map((article) => {
                const colorMap: Record<string, string> = {
                  emerald:
                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                  purple:
                    'bg-purple-500/10 border-purple-500/20 text-purple-400',
                  amber:
                    'bg-amber-500/10 border-amber-500/20 text-amber-400',
                }
                return (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                  >
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border ${colorMap[article.tagColor]} text-xs font-medium mb-3`}
                    >
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
              Scan your portfolio companies for free
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Enter any domain and get an Agent Readiness Score in 60
              seconds. See exactly where each company stands across all 9
              dimensions.
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
