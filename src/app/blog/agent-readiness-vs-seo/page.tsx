import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCode,
  Globe,
  HelpCircle,
  Lock,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Agent Readiness vs SEO: Why Your Google Ranking Does Not Help AI Agents | AgentHermes',
  description:
    'SEO ranks content for humans. Agent Readiness measures whether AI agents can actually use your business. After 500 scans, we found sites ranking #1 on Google that score 5/100 for agents. Here is the difference and why both matter.',
  keywords: [
    'agent readiness vs SEO',
    'SEO vs agent readiness',
    'AI agent SEO',
    'agent economy SEO',
    'agent readiness score',
    'AI discoverability',
    'MCP vs SEO',
    'agent-card.json vs meta tags',
    'structured data for agents',
  ],
  openGraph: {
    title: 'Agent Readiness vs SEO: Why Your Google Ranking Does Not Help AI Agents',
    description:
      'Google ranks content. Agents need APIs. A site can be #1 on Google and score 5/100 for agent readiness. Here is why both matter now.',
    url: 'https://agenthermes.ai/blog/agent-readiness-vs-seo',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agent Readiness vs SEO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Readiness vs SEO: Why Your Google Ranking Does Not Help AI Agents',
    description:
      'SEO is for humans. Agent Readiness is for machines. After 500 scans, they barely correlate. Here is what is different.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-readiness-vs-seo',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  { aspect: 'Audience', seo: 'Humans typing queries into Google', agent: 'AI agents making API calls on behalf of users' },
  { aspect: 'Discovery surface', seo: 'Google, Bing, DuckDuckGo indexes', agent: 'MCP registries, agent-card.json, agent directories' },
  { aspect: 'Ranking signal', seo: 'Backlinks, keyword density, page speed, Core Web Vitals', agent: 'TLS, structured endpoints, auth quality, OpenAPI specs' },
  { aspect: 'Content format', seo: 'HTML pages with meta tags, schema.org markup', agent: 'JSON responses, typed schemas, MCP tools, agent cards' },
  { aspect: 'Interaction model', seo: 'User clicks link → reads page → decides', agent: 'Agent reads schema → calls function → executes action' },
  { aspect: 'Success metric', seo: 'Click-through rate, impressions, dwell time', agent: 'Successful tool calls, 401+JSON auth, endpoint uptime' },
  { aspect: 'Failure mode', seo: 'Low rank, zero impressions', agent: 'Score capped at 39 (no TLS) or 29 (no endpoints)' },
  { aspect: 'Time to fix', seo: '3-6 months to rank', agent: '60 seconds to publish agent-card.json' },
]

const whatSeoMisses = [
  {
    title: 'No executable interface',
    detail: 'A page ranking #1 for "book plumber San Francisco" still requires a human to click call or fill a form. An agent cannot execute the booking — the site offers no callable endpoint.',
    icon: Bot,
    color: 'red',
  },
  {
    title: 'No auth pattern',
    detail: 'SEO rewards public pages. Agents reward protected-but-structured endpoints. A 401 response with a JSON error body scores 87% of a 200 response in the AgentHermes model — SEO does not measure this at all.',
    icon: Lock,
    color: 'amber',
  },
  {
    title: 'No schema contract',
    detail: 'schema.org markup helps Google display rich snippets. It does not tell an agent the input types, error codes, or pagination behavior of your API. OpenAPI specs do — and they are weighted 0.15 in D2.',
    icon: FileCode,
    color: 'blue',
  },
  {
    title: 'No reliability signal',
    detail: 'SEO has Core Web Vitals for human-perceived speed. Agent Readiness has D8 Reliability (weight 0.13) — uptime, status pages, structured error responses, and retry behavior. Two different game boards.',
    icon: Zap,
    color: 'purple',
  },
]

const realExamples = [
  {
    type: 'High SEO, Low Agent Readiness',
    description: 'A legal services site ranking in the top 3 for "attorney near me" in three major metros. Beautiful content, clean URLs, schema.org markup, over 40 referring domains. Agent Readiness Score: 14/100. No API, no agent-card.json, HTTP-only legacy subdomain for their booking widget caps them at 39.',
    color: 'red',
  },
  {
    type: 'Low SEO, High Agent Readiness',
    description: 'A B2B developer infrastructure company with an obscure marketing site and weak backlink profile. Organic traffic is a fraction of their competitors. Agent Readiness Score: 70/100. Publishes OpenAPI spec, uses Bearer tokens, structured 401 errors, status page with JSON feed, llms.txt at root.',
    color: 'emerald',
  },
  {
    type: 'Balanced',
    description: 'Stripe. Ranks well for payments keywords AND scores 68/100 on Agent Readiness. But the effort to achieve each score came from different teams using different playbooks — content and docs teams for SEO, API platform teams for agent readiness.',
    color: 'blue',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the difference between Agent Readiness and SEO?',
    answer:
      'Agent Readiness measures whether AI agents can programmatically use your business — discover your capabilities, call your APIs, authenticate, and complete transactions. SEO measures whether humans can find your content in search engines. SEO optimizes HTML pages for keyword relevance and backlinks. Agent Readiness optimizes structured endpoints, OpenAPI specs, agent-card.json, and auth patterns. A site can rank #1 on Google and score 5/100 for agent readiness. They are complementary, not overlapping.',
  },
  {
    question: 'Does Google ranking help agent readiness at all?',
    answer:
      'Marginally. High-ranking sites tend to have HTTPS (required to escape the 39-point cap), faster response times (helps D8 Reliability), and cleaner URL structures (helps crawlers find endpoints). But SEO best practices stop there. The things that move an Agent Readiness Score — OpenAPI specs, Bearer token auth, agent-card.json, MCP servers, llms.txt — are invisible to Google and carry zero SEO weight. You can do all of SEO correctly and still score under 40.',
  },
  {
    question: 'Should I stop doing SEO and focus on agent readiness?',
    answer:
      'No. Humans still search Google. In 2026, organic search remains the dominant customer acquisition channel for most businesses. But AI agents are the fastest-growing new channel, and they use different infrastructure. The correct move is to keep your SEO investment intact and add agent-readiness work on top. The two efforts do not compete for the same resources — SEO is a content and marketing investment, agent readiness is a platform and API investment.',
  },
  {
    question: 'Do AI agents use Google search results?',
    answer:
      'Some do, some do not. Agents like Claude and ChatGPT will fall back to web search when no MCP server or structured endpoint is available — but the experience degrades sharply. The agent has to scrape HTML, parse ambiguous layouts, and guess at structured data. When an MCP server or agent-card.json is available, the agent uses that instead because the interaction is reliable, typed, and fast. Agents prefer the structured path, and they are getting better at refusing to use the scraping path as structured options grow.',
  },
  {
    question: 'How do I check my Agent Readiness Score?',
    answer:
      'Go to agenthermes.ai/audit and enter your domain. The scan runs in under 60 seconds and returns your score across all 9 dimensions: Discovery, API Quality, Onboarding, Pricing, Payment, Data, Security, Reliability, and Agent Experience. You also get your ARL level (Dark through Interoperable) and a prioritized list of what is missing. It is free and no signup is required for the first scan.',
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

export default function AgentReadinessVsSeoPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agent Readiness vs SEO: Why Your Google Ranking Does Not Help AI Agents',
    description:
      'SEO is for humans. Agent Readiness is for AI agents. After 500 business scans, we found almost no correlation between the two. Here is why — and why both matter now.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-readiness-vs-seo',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Framework',
    wordCount: 1850,
    keywords:
      'agent readiness vs SEO, SEO vs agent readiness, AI agent SEO, agent economy SEO, agent readiness score',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent Readiness vs SEO',
          item: 'https://agenthermes.ai/blog/agent-readiness-vs-seo',
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
      title="Agent Readiness vs SEO: Why Your Google Ranking Does Not Help AI Agents"
      shareUrl="https://agenthermes.ai/blog/agent-readiness-vs-seo"
      currentHref="/blog/agent-readiness-vs-seo"
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
            <span className="text-zinc-400">Agent Readiness vs SEO</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Search className="h-3.5 w-3.5" />
              Framework
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Differentiator
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Agent Readiness vs SEO:{' '}
            <span className="text-emerald-400">Why Your Google Ranking Does Not Help AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            SEO ranks content for humans. <strong className="text-zinc-100">Agent Readiness</strong> measures
            whether AI agents can actually use your business. After scanning 500 businesses, the correlation
            between the two is weak — a site can rank #1 on Google and score 5 out of 100 for agent readiness.
            Here is what is different, why both matter now, and how to measure each.
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
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TWO DIFFERENT GAMES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Two Different Games, Two Different Playbooks
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              SEO and Agent Readiness look superficially similar — both are about being discovered, both
              involve technical markup, both require ongoing investment. But they are playing fundamentally
              different games. SEO optimizes how a page looks to humans who arrive via search engines. Agent
              Readiness optimizes how a business behaves when a non-human, programmatic consumer — an AI
              agent — tries to use it.
            </p>
            <p>
              The gap between the two shows up clearly in our scan data. Of 500 businesses scanned, 1 scored
              Gold (Resend at 75), 52 scored Silver (60-74), 249 scored Bronze (40-59), and 199 scored below
              Bronze. Many of those 199 have strong SEO programs. They rank for dozens of high-intent
              keywords. Their Core Web Vitals are green. They have done the SEO work. And they are still
              invisible to agents because{' '}
              <Link href="/blog/what-is-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                agent readiness measures something completely different
              </Link>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '500', label: 'businesses scanned', icon: BarChart3 },
              { value: '43', label: 'average agent score', icon: Bot },
              { value: '1', label: 'Gold tier (75+)', icon: TrendingUp },
              { value: '199', label: 'below Bronze', icon: Shield },
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

      {/* ===== SIDE BY SIDE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            SEO vs Agent Readiness, Side by Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Eight dimensions where SEO and Agent Readiness diverge. Every row is a place where doing one
            well has zero effect on the other.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>SEO (for Humans)</div>
              <div>Agent Readiness (for Agents)</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.seo}</div>
                <div className="text-emerald-400">{row.agent}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The failure modes tell the story best. A site with bad SEO gets zero organic impressions.
              A site with bad agent readiness hits a{' '}
              <strong className="text-zinc-100">hard scoring cap</strong> — no TLS caps the score at 39, no
              callable endpoints caps it at 29. You can pour unlimited effort into other dimensions and the
              cap still holds. These caps exist because AI agents refuse insecure connections and cannot
              execute a business that offers no executable interface.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT SEO MISSES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-amber-500" />
            Four Things SEO Misses Completely
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Even perfect SEO cannot move these four signals that dominate Agent Readiness scoring.
          </p>

          <div className="space-y-4 mb-8">
            {whatSeoMisses.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Every one of these matters because agents make a different kind of decision than humans do.
              A human reading a page can forgive a missing callable endpoint — they will call or email or
              fill out a contact form. An agent has no patience for that. If the endpoint is not there, the
              agent moves to the next option. If the auth pattern is proprietary, the agent gives up. If
              the schema is ambiguous, the agent returns an error to its user. Each missing signal is a
              closed door.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REAL EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What the Data Shows
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Three patterns from the 500-business dataset. The relationship between SEO strength and Agent
            Readiness is almost random.
          </p>

          <div className="space-y-4 mb-8">
            {realExamples.map((example) => {
              const colors = getColorClasses(example.color)
              return (
                <div
                  key={example.type}
                  className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`h-2 w-2 rounded-full ${colors.bg} border ${colors.border}`} />
                    <h3 className={`text-sm font-bold ${colors.text}`}>{example.type}</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{example.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern that repeats: marketing-only businesses (high SEO, no API) score low for agents.
              Developer-infrastructure businesses (low SEO, strong API) score high. Businesses that invest in
              both (Stripe, Resend, Vercel) land in Silver or Gold. The two scores measure different assets
              of the business, and the asset that moves Agent Readiness — platform and API maturity — is
              typically owned by a different team than the asset that moves SEO.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY BOTH MATTER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" />
            Why Both Matter Now
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Humans are not leaving Google. In 2026, organic search is still the dominant customer
              acquisition channel for the majority of businesses, and SEO investment is still the right
              investment to capture that channel. Agent Readiness does not replace SEO — it adds a second
              channel.
            </p>
            <p>
              That second channel is growing fast. AI agents acting on behalf of users are making real
              purchase decisions, real bookings, and real API calls. When someone asks an assistant to
              &ldquo;find me an accountant who can file my Q2 taxes,&rdquo; the agent does not scroll Google
              results. It queries agent registries, reads agent-card.json files, and preferentially connects
              to businesses with callable endpoints. That is the agent channel, and it looks nothing like
              the human channel.
            </p>
            <p>
              The businesses that will win the next decade are the ones that treat both channels as first-class.
              SEO for the humans who still search. Agent Readiness for the agents who increasingly do not.
              Neither investment cannibalizes the other. They compound.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The practical move:</strong> Keep your SEO program
              intact. Add agent-readiness work on top — publish an agent-card.json, expose at least one
              callable JSON endpoint, enable Bearer token auth, document your API with an OpenAPI spec.
              These are platform and engineering tasks, not content tasks. They do not compete with SEO for
              resources.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO MEASURE BOTH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            How to Measure Both
          </h2>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Run your usual SEO stack',
                detail: 'Google Search Console, Ahrefs or Semrush, Core Web Vitals. These tell you how humans find you. Nothing replaces them for the human channel.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Run a free Agent Readiness Scan',
                detail: 'Visit /audit and enter your domain. You get your score across all 9 dimensions plus your ARL level (Dark through Interoperable). Free, no signup required.',
                icon: Bot,
              },
              {
                step: '3',
                title: 'Compare the two scores',
                detail: 'If SEO is strong but Agent Readiness is under 40, you are winning the human channel and invisible in the agent channel. If both are strong, you are competitive in both. If only Agent Readiness is strong, you have an API business — start marketing it.',
                icon: BarChart3,
              },
              {
                step: '4',
                title: 'Fix the cap-drivers first',
                detail: 'If no TLS, enable HTTPS. If no callable endpoints, expose one JSON endpoint with documented auth. These remove the hard caps at 39 and 29 before you touch any other dimension.',
                icon: Shield,
              },
              {
                step: '5',
                title: 'Ship structured discovery files',
                detail: 'Publish agent-card.json, llms.txt, and agent-hermes.json at your domain root. These are to agents what sitemap.xml is to search engines — the entry point that makes everything else discoverable.',
                icon: Globe,
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The full{' '}
              <Link href="/blog/agent-journey-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                6-step agent journey
              </Link>{' '}
              gives you the framework for what each missing dimension costs. Step 1 (Find) is where SEO
              and Agent Readiness overlap the most — both care about being discoverable — but the mechanism
              is completely different. Steps 2 through 6 (Understand, Sign Up, Connect, Use, Pay) are
              almost pure Agent Readiness territory.
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

      {/* ===== RELATED ARTICLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
                tagColor: 'emerald',
              },
              {
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
                tagColor: 'emerald',
              },
              {
                title: 'The 6-Step Agent Journey Every Business Should Know',
                href: '/blog/agent-journey-explained',
                tag: 'Framework',
                tagColor: 'purple',
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
            See how you score in the agent channel
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Your Google ranking will not tell you. Run a free 60-second Agent Readiness Scan to see
            where your business stands across all 9 dimensions AI agents actually measure.
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
