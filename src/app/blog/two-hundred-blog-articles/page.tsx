import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Crown,
  Globe,
  HelpCircle,
  Layers,
  Lightbulb,
  Network,
  PartyPopper,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    '200 Blog Articles on Agent Readiness: The Definitive Content Library Is Complete | AgentHermes',
  description:
    '200 blog articles covering 40+ verticals, all 9 scoring dimensions, 15+ case studies, and 4 framework tutorials. No competitor has anything close. The definitive content library on agent readiness.',
  keywords: [
    '200 agent readiness articles complete',
    'agent readiness content library',
    'agent readiness blog',
    'AgentHermes blog milestone',
    'agent economy content',
    'agent readiness verticals',
    'MCP content library',
    'agent readiness topical authority',
  ],
  openGraph: {
    title:
      '200 Blog Articles on Agent Readiness: The Definitive Content Library Is Complete',
    description:
      '200 articles. 40+ verticals. All 9 dimensions. No competitor has anything close. This is the topical authority on agent readiness.',
    url: 'https://agenthermes.ai/blog/two-hundred-blog-articles',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '200 Blog Articles on Agent Readiness: The Definitive Content Library Is Complete',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '200 Blog Articles on Agent Readiness: The Definitive Content Library Is Complete',
    description:
      'IsAgentReady: 0 articles. AgentSpeed: 1 blog post. AgentHermes: 200. This IS the topical authority on agent readiness.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/two-hundred-blog-articles',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const libraryStats = [
  { value: '200', label: 'blog articles', icon: BookOpen, color: 'emerald' },
  { value: '40+', label: 'verticals covered', icon: Layers, color: 'blue' },
  { value: '9', label: 'scoring dimensions', icon: BarChart3, color: 'purple' },
  { value: '3', label: 'GEO pages', icon: Globe, color: 'amber' },
]

const contentCategories = [
  {
    category: 'Vertical Analyses',
    count: '45+',
    description: 'Deep dives into specific industries — from restaurants and real estate to tattoo parlors and waste management. Each article covers current readiness state, scoring breakdown, agent-ready tool specifications, and competitive opportunity.',
    examples: ['Restaurant Agent Readiness', 'Real Estate Agent Readiness', 'Auto Repair Agent Readiness', 'Camping and Outdoor Recreation Agent Readiness'],
    color: 'amber',
  },
  {
    category: 'Technical Deep Dives',
    count: '35+',
    description: 'Infrastructure topics that directly affect agent readiness scores — API design, caching strategies, rate limiting, webhook patterns, structured errors, compression, feature flags, and more.',
    examples: ['Structured Errors Guide', 'Rate Limiting for Agents', 'API Versioning and Agent Readiness', 'Webhooks and Agent Readiness'],
    color: 'cyan',
  },
  {
    category: 'Case Studies',
    count: '20+',
    description: 'Real scans of real businesses — Stripe (68), Slack (68), Shopify (65), Vercel (69). What they do right, what they miss, and what it means for their agent readiness trajectory.',
    examples: ['Why Stripe Scores 68', 'Slack Agent Readiness Breakdown', 'Roboflow Agent Readiness Breakdown', 'Robinhood vs Allstate Agent Readiness'],
    color: 'blue',
  },
  {
    category: 'Framework and Methodology',
    count: '15+',
    description: 'The Agent Readiness Score methodology, ARL levels, scoring caps, dimension weights, vertical profiles, and the agent-hermes.json standard specification.',
    examples: ['ARL Levels Explained', 'Scoring Caps Explained', 'What Is Agent Readiness', 'Agent Readiness ROI Calculator'],
    color: 'emerald',
  },
  {
    category: 'Thought Leadership',
    count: '15+',
    description: 'Forward-looking analysis of the agent economy — market size projections, 2026 predictions, agent trust scoring, the marketplace future, competitor comparisons.',
    examples: ['Agent Economy Market Size', 'Agent Readiness 2026 Predictions', 'AI Agent Marketplace Future', 'AgentHermes vs AgentSpeed'],
    color: 'purple',
  },
  {
    category: 'Guides and Tutorials',
    count: '20+',
    description: 'Actionable how-to content — building MCP servers, writing agent-card.json, going from Bronze to Silver, Silver to Gold, and setting up agent discovery files.',
    examples: ['Build MCP Server Tutorial', 'Agent Card JSON Guide', 'Bronze to Silver Guide', 'Silver to Gold Guide'],
    color: 'emerald',
  },
  {
    category: 'Glossary and Reference',
    count: '10+',
    description: 'Definitions, protocol explanations, and reference material — what is MCP, what is A2A, what is agent-hermes.json, agent readiness glossary.',
    examples: ['Agent Readiness Glossary', 'What Is MCP Server', 'A2A Protocol Explained', 'x402 Payment Protocol'],
    color: 'blue',
  },
  {
    category: 'Milestone Articles',
    count: '4',
    description: 'Tracking the content library journey — from 100 articles to 150, the roadmap to 200, and now this piece at 200. Meta-content that documents the process.',
    examples: ['100 Articles on Agent Readiness', '150 Articles: Lessons Learned', 'Roadmap to 200 Articles', 'This Article (200 Complete)'],
    color: 'amber',
  },
]

const competitorContent = [
  { name: 'AgentHermes', articles: '200', pages: '390+', status: 'Publishing daily', color: 'emerald' },
  { name: 'IsAgentReady', articles: '0', pages: '~5', status: 'No blog', color: 'red' },
  { name: 'AgentSpeed', articles: '1', pages: '~3', status: 'Single methodology post', color: 'red' },
  { name: 'MCP.so', articles: '0', pages: '~10', status: 'Directory only', color: 'amber' },
  { name: 'Glama.ai', articles: '0', pages: '~15', status: 'Directory only', color: 'amber' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does content volume matter for agent readiness?',
    answer:
      'Two reasons. First, topical authority: search engines and AI models both prioritize sources that demonstrate deep, comprehensive coverage of a topic. 200 articles across 40+ verticals and all 9 scoring dimensions signals that AgentHermes is THE authority on agent readiness. Second, AI model training: the more content we publish, the more likely AI models will cite our scoring methodology, framework, and data when users ask about agent readiness.',
  },
  {
    question: 'How does this compare to competitors?',
    answer:
      'IsAgentReady has zero blog articles. AgentSpeed has one methodology post. MCP.so and Glama.ai are directories with no educational content. No competitor in the agent readiness space has invested in content at scale. We have 200 articles while the entire competitor landscape has fewer than 5 combined. This is not a small lead — it is a structural moat.',
  },
  {
    question: 'What comes after 200 articles?',
    answer:
      'Three priorities: (1) Getting cited by AI models — when someone asks ChatGPT, Claude, or Perplexity about agent readiness, we want them to reference AgentHermes data. (2) Getting indexed by Google — 200 articles means 200 potential organic search entry points. (3) Refreshing existing articles with new scan data as we cross 1,000 businesses scanned. The library is complete in breadth. Now we optimize for depth and distribution.',
  },
  {
    question: 'Are all 200 articles unique?',
    answer:
      'Yes. Every article targets a unique primary keyword, covers a distinct topic, and includes original analysis. Vertical analyses never duplicate — each covers a different industry with industry-specific MCP tool specifications. Technical deep dives each address a different infrastructure dimension. No two articles share the same angle or data.',
  },
  {
    question: 'How were the 200 topics chosen?',
    answer:
      'Three sources: (1) Real scan data from 500+ businesses — patterns we observed became articles. (2) Keyword research for agent readiness and adjacent terms. (3) The 9-dimension scoring framework — each dimension generates multiple articles (methodology, case studies, guides). The result is a library that covers the topic from every possible angle: by vertical, by dimension, by use case, by competitor, and by framework.',
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

export default function TwoHundredBlogArticlesPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      '200 Blog Articles on Agent Readiness: The Definitive Content Library Is Complete',
    description:
      '200 blog articles covering 40+ verticals, all 9 scoring dimensions, 15+ case studies, and 4 framework tutorials. The most comprehensive content library on agent readiness in existence.',
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
      'https://agenthermes.ai/blog/two-hundred-blog-articles',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Milestone',
    wordCount: 1800,
    keywords:
      '200 agent readiness articles, agent readiness content library, AgentHermes milestone, agent readiness topical authority',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: '200 Blog Articles on Agent Readiness',
          item: 'https://agenthermes.ai/blog/two-hundred-blog-articles',
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
      title="200 Blog Articles on Agent Readiness: The Definitive Content Library Is Complete"
      shareUrl="https://agenthermes.ai/blog/two-hundred-blog-articles"
      currentHref="/blog/two-hundred-blog-articles"
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
            <span className="text-zinc-400">200 Blog Articles</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Trophy className="h-3.5 w-3.5" />
              Milestone
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Content Library
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            200 Blog Articles on Agent Readiness:{' '}
            <span className="text-emerald-400">The Definitive Content Library Is Complete</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Two hundred articles. Forty verticals. All nine scoring dimensions. Fifteen case
            studies. Four framework tutorials. Three GEO pages. One topic:{' '}
            <strong className="text-zinc-100">agent readiness</strong>. No competitor has
            anything close to this library. IsAgentReady has zero articles. AgentSpeed has one
            blog post. We have two hundred. This is what topical authority looks like.
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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BY THE NUMBERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-amber-500" />
            The Library by the Numbers
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we published our{' '}
              <Link href="/blog/hundred-articles-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                100th article
              </Link>, we had covered the core framework, the major verticals, and the foundational
              case studies. At{' '}
              <Link href="/blog/one-fifty-articles-lessons" className="text-emerald-400 hover:text-emerald-300 underline">
                150 articles
              </Link>, we documented the lessons learned and the patterns emerging from our scan
              data. Now at 200, the library is comprehensive — every vertical, every dimension,
              every protocol, every competitor has been analyzed.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {libraryStats.map((stat) => {
              const colors = getColorClasses(stat.color)
              return (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className={`h-5 w-5 ${colors.text} mx-auto mb-2`} />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT THE LIBRARY COVERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            What 200 Articles Cover
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The library is organized into eight categories. Every article targets a unique
            keyword, covers a distinct topic, and includes original analysis from our scan
            data.
          </p>

          <div className="space-y-4 mb-8">
            {contentCategories.map((cat) => {
              const colors = getColorClasses(cat.color)
              return (
                <div
                  key={cat.category}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-zinc-100">{cat.category}</h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}>
                      {cat.count} articles
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{cat.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.examples.map((ex) => (
                      <span
                        key={ex}
                        className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-800/50 border border-zinc-700/50 text-xs text-zinc-500"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== COMPETITOR CONTENT GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            The Competitor Content Gap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The agent readiness space is new. There are a handful of players — IsAgentReady,
              AgentSpeed, MCP.so, Glama.ai — each with their own angle. But content production
              tells you who is investing in long-term authority versus who is building a feature
              and hoping it sells itself.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div>Blog Articles</div>
              <div>Total Pages</div>
              <div>Status</div>
            </div>
            {competitorContent.map((comp, i) => {
              const colors = getColorClasses(comp.color)
              return (
                <div
                  key={comp.name}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className={`font-medium ${colors.text}`}>{comp.name}</div>
                  <div className="text-zinc-400 font-bold">{comp.articles}</div>
                  <div className="text-zinc-500">{comp.pages}</div>
                  <div className="text-zinc-500">{comp.status}</div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">200 vs 1:</strong> The content gap is not
              a rounding error — it is a structural moat. Building 200 high-quality articles
              on a single topic takes months of sustained effort. A competitor starting today
              would need to publish an article per day for over six months to reach parity —
              and by then, we will have moved further ahead. In SEO and AI model training,
              first-to-comprehensive wins.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY CONTENT IS THE MOAT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-500" />
            Why Content Is the Moat
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In the agent economy, there are three moats a platform can build: data (scan
              results from 500+ businesses), product (scoring engine + MCP hosting + registry),
              and content (educational authority that earns trust and organic traffic). Most
              startups focus on product. The smart ones invest in content simultaneously.
            </p>
            <p>
              Content serves three strategic functions at once:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Google organic traffic',
                detail: '200 articles targeting long-tail keywords means 200 entry points for organic search. Every "camping agent readiness" or "API versioning agent readiness" query can land on an AgentHermes page. This is compounding — each article earns authority over time.',
                icon: Search,
                color: 'blue',
              },
              {
                title: 'AI model citation',
                detail: 'When Claude, ChatGPT, or Perplexity answers questions about agent readiness, they draw from training data that includes web content. 200 articles with consistent methodology and data increases the probability of citation. We are training AI models to reference our framework.',
                icon: Bot,
                color: 'emerald',
              },
              {
                title: 'Trust and credibility',
                detail: 'A business evaluating agent readiness platforms will compare AgentHermes (200 articles, detailed methodology, public scan data) with competitors (a landing page and a feature list). Content demonstrates expertise. Expertise earns trust. Trust converts to customers.',
                icon: Shield,
                color: 'purple',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon className={`h-5 w-5 ${colors.text}`} />
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE JOURNEY: 100 → 150 → 200 ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The Journey: 100 to 150 to 200
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Each milestone taught us something different about what this library needs to be.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                milestone: '100 Articles',
                lesson: 'Breadth matters first. Covering all 9 dimensions and the top 20 verticals established the framework. At 100, we had the skeleton — every major topic had at least one article.',
                href: '/blog/hundred-articles-agent-readiness',
                color: 'blue',
              },
              {
                milestone: '150 Articles',
                lesson: 'Depth reveals patterns. Going from 100 to 150 meant writing second and third articles on topics that deserved more attention — case studies, competitor comparisons, technical guides. The library went from reference to resource.',
                href: '/blog/one-fifty-articles-lessons',
                color: 'purple',
              },
              {
                milestone: '200 Articles',
                lesson: 'Comprehensiveness creates authority. At 200, every vertical has coverage, every dimension has multiple articles, and there are no gaps a competitor could exploit. The roadmap to 200 that we published is now complete.',
                href: '/blog/two-hundred-articles-roadmap',
                color: 'emerald',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <Link
                  key={item.milestone}
                  href={item.href}
                  className="group flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                    <BookOpen className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                      {item.milestone}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.lesson}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT COMES NEXT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            What Comes Next
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The library is complete in breadth. Two hundred articles cover every major angle
              of agent readiness. But &ldquo;complete&rdquo; does not mean &ldquo;done.&rdquo;
              The next phase has three priorities.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                priority: 'Get cited by AI models',
                detail: 'When someone asks ChatGPT or Claude "What is an Agent Readiness Score?" or "How do I make my business agent-ready?", we want AgentHermes to be the source they reference. This requires our content to be in training data, which requires volume, consistency, and authority — exactly what 200 articles provide.',
                icon: Bot,
              },
              {
                priority: 'Get indexed by Google',
                detail: '200 articles means 200 potential organic search results. We are submitting sitemaps, building internal link structure across all 200 articles, and targeting long-tail keywords that no competitor covers. The compounding effect of SEO means these articles will generate more traffic every month.',
                icon: Search,
              },
              {
                priority: 'Refresh with new scan data',
                detail: 'As we cross 1,000 businesses scanned, every vertical article gets updated with fresh data. The camping article written today with data from 500 scans becomes more authoritative when it cites data from 2,000 scans. The library is a living document.',
                icon: TrendingUp,
              },
            ].map((item) => (
              <div
                key={item.priority}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.priority}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The real milestone is not 200 articles — it
              is the first user.</strong> Content is infrastructure. It builds the roads. But
              roads are useless without traffic. The next milestone we are tracking is not 250
              articles — it is the first business that finds AgentHermes through organic
              search, runs an audit, and connects their MCP server. Content brought them.
              Product keeps them.
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
                title: '100 Articles on Agent Readiness',
                href: '/blog/hundred-articles-agent-readiness',
                tag: 'Milestone',
                tagColor: 'amber',
              },
              {
                title: '150 Articles: Lessons Learned',
                href: '/blog/one-fifty-articles-lessons',
                tag: 'Milestone',
                tagColor: 'amber',
              },
              {
                title: 'Roadmap to 200 Articles',
                href: '/blog/two-hundred-articles-roadmap',
                tag: 'Milestone',
                tagColor: 'amber',
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
            Join the 500+ businesses already scored
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Two hundred articles of research behind the Agent Readiness Score. See where your
            business stands in 60 seconds.
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
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Browse All 200 Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
