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
  Database,
  Globe,
  HelpCircle,
  Layers,
  Lightbulb,
  Network,
  Search,
  Server,
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
    'The Road to 200 Articles: What AgentHermes Learned Building the Largest Agent Readiness Content Library | AgentHermes',
  description:
    'Approaching 200 articles on agent readiness across 50+ verticals and dozens of technical deep dives. What we learned: verticals are infinite, 3 files block every Silver from Gold, case studies outperform guides, and the content itself proves the product.',
  keywords: [
    'agent readiness content library 200 articles',
    'agent readiness blog',
    'agent economy content',
    'AgentHermes articles',
    'agent readiness knowledge base',
    'AI agent content library',
    'agent readiness vertical analysis',
    'agent readiness case studies',
  ],
  openGraph: {
    title:
      'The Road to 200 Articles: What AgentHermes Learned Building the Largest Agent Readiness Content Library',
    description:
      'Approaching 200 articles. 50+ verticals. Dozens of technical guides. What we learned building the largest agent readiness knowledge base.',
    url: 'https://agenthermes.ai/blog/two-hundred-articles-roadmap',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Road to 200 Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'The Road to 200 Articles: Building the Largest Agent Readiness Content Library',
    description:
      'Approaching 200 articles on agent readiness. 5 lessons from 60+ content cycles.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/two-hundred-articles-roadmap',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const milestoneStats = [
  {
    value: '190+',
    label: 'articles published',
    icon: BookOpen,
  },
  {
    value: '50+',
    label: 'verticals covered',
    icon: Layers,
  },
  {
    value: '500+',
    label: 'businesses scanned',
    icon: Search,
  },
  {
    value: '60+',
    label: 'content cycles',
    icon: TrendingUp,
  },
]

const lessons = [
  {
    number: '1',
    title: 'Verticals are infinite',
    detail:
      'Every industry has unique agent readiness challenges. Tattoo studios face different problems than dental offices, which face different problems than marinas. We started with 15 verticals. We are now past 50 and finding new ones every cycle. The agent economy does not have a finite number of categories — every niche where humans currently call or email to transact is a vertical waiting for agent infrastructure.',
    icon: Globe,
    color: 'emerald',
  },
  {
    number: '2',
    title: 'The same 3 files block every Silver from Gold',
    detail:
      'After scanning 500+ businesses, the pattern is unmistakable. Developer tools plateau at Silver (60-69) because they have good APIs and documentation but lack three agent-native files: agent-card.json, llms.txt, and an MCP server. These three files are the consistent gap between "good API" and "agent-ready platform." We have written about this pattern in at least 30 case studies. It never varies.',
    icon: Code2,
    color: 'blue',
  },
  {
    number: '3',
    title: 'Case studies outperform generic guides',
    detail:
      '"Why OpsGenie Scores 67" generates more engagement than "How to Improve Your Agent Readiness Score." Specific, data-backed analysis of real businesses resonates because readers can see themselves in the breakdown. Abstract guidance feels theoretical. A case study showing exactly where a similar business loses points — and exactly what would fix it — drives action.',
    icon: Target,
    color: 'amber',
  },
  {
    number: '4',
    title: 'The content itself proves the product',
    detail:
      'If AgentHermes can write 200 articles drawing on real scan data across 50+ verticals, the scoring system works. Every article references actual dimensions, real scores, and specific findings from our scanner. The content is not hypothetical — it is generated from the same data that powers the audit tool. The depth and breadth of the library is itself evidence that agent readiness is measurable, comparable, and improvable.',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    number: '5',
    title: 'The next frontier is distribution, not creation',
    detail:
      'We can produce high-quality agent readiness content at scale. The bottleneck has shifted to distribution: getting Google to index 200+ pages, getting AI models to cite our findings in their responses, and getting the businesses we analyze to discover their own scores. Content creation is solved. Content discovery is the next challenge.',
    icon: Sparkles,
    color: 'cyan',
  },
]

const contentBreakdown = [
  {
    category: 'Vertical Analyses',
    count: '65+',
    description:
      'Deep dives into specific industries: restaurants, dental, auto repair, marina, tattoo studios, libraries, agriculture, veterinary, and dozens more',
    color: 'amber',
  },
  {
    category: 'Technical Deep Dives',
    count: '45+',
    description:
      'API versioning, error handling, rate limiting, caching, request tracing, structured data, authentication patterns, and protocol comparisons',
    color: 'cyan',
  },
  {
    category: 'Case Studies',
    count: '35+',
    description:
      'Individual business and platform breakdowns: Stripe, Shopify, OpsGenie, Tally, Growthbook, and others with exact scores and improvement paths',
    color: 'blue',
  },
  {
    category: 'Framework & Scoring',
    count: '25+',
    description:
      'ARL levels, 9-dimension scoring methodology, Agent Journey, vertical weighting, and the scoring philosophy behind the Agent Readiness Score',
    color: 'purple',
  },
  {
    category: 'Milestone & Meta',
    count: '10+',
    description:
      'Content library milestones (100, 150, and now approaching 200), market size analysis, predictions, and lessons learned from building at scale',
    color: 'emerald',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How often does AgentHermes publish new articles?',
    answer:
      'We publish in cycles, typically 3-5 articles per cycle covering a mix of vertical analyses, technical deep dives, and case studies. Cycles run multiple times per week. Each article draws on real scan data from our 500+ business database, so content is data-driven rather than opinion-based.',
  },
  {
    question: 'Are the agent readiness scores in the articles real?',
    answer:
      'Yes. Every score referenced in our articles comes from actual AgentHermes scans. When we say "OpsGenie scores 67" or "the average local library scores under 5," those are real numbers from our 9-dimension scanner. We do not fabricate scores for content purposes. If a business has not been scanned, we say "estimated" and explain our reasoning.',
  },
  {
    question: 'What makes this the largest agent readiness content library?',
    answer:
      'To our knowledge, no other organization has published more than a handful of articles about agent readiness as a measurable, scored concept. AgentHermes has published 190+ articles covering 50+ verticals, dozens of technical patterns, and 35+ individual case studies — all grounded in a consistent 9-dimension scoring framework. The depth across verticals is what makes it unique.',
  },
  {
    question: 'Will these articles help my business improve its score?',
    answer:
      'Directly. The technical deep dives include specific implementation guidance — like adding X-Request-ID middleware in one line or creating an agent-card.json file. The vertical analyses explain what "agent-ready" looks like for your specific industry. And the case studies show what distinguishes a 45 from a 68. Start with the article for your vertical, then read the technical guides for the dimensions where you score lowest.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
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
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TwoHundredArticlesRoadmapPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'The Road to 200 Articles: What AgentHermes Learned Building the Largest Agent Readiness Content Library',
    description:
      'Approaching 200 articles on agent readiness across 50+ verticals. 5 lessons from 60+ content cycles on what works, what patterns repeat, and what comes next.',
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
      'https://agenthermes.ai/blog/two-hundred-articles-roadmap',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Milestone',
    wordCount: 1800,
    keywords:
      'agent readiness content library 200 articles, agent readiness blog, agent economy content, AgentHermes articles',
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
          name: 'The Road to 200 Articles',
          item: 'https://agenthermes.ai/blog/two-hundred-articles-roadmap',
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
      title="The Road to 200 Articles: What AgentHermes Learned Building the Largest Agent Readiness Content Library"
      shareUrl="https://agenthermes.ai/blog/two-hundred-articles-roadmap"
      currentHref="/blog/two-hundred-articles-roadmap"
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
              <span className="text-zinc-400">The Road to 200 Articles</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <Trophy className="h-3.5 w-3.5" />
                Milestone
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                Lessons Learned
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              The Road to 200 Articles:{' '}
              <span className="text-emerald-400">
                What AgentHermes Learned Building the Largest Agent Readiness
                Content Library
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              We are approaching 200 published articles on agent readiness —
              covering 50+ verticals, dozens of technical patterns, and 35+
              individual case studies. Every article is grounded in real scan
              data from 500+ businesses. Here is what we learned across 60+
              content cycles about what the agent economy actually looks like
              from the inside.
            </p>

            {/* Author byline */}
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
                    10 min read
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
              By the Numbers
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                When we published the{' '}
                <Link
                  href="/blog/hundred-articles-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  100th article milestone
                </Link>
                , we thought the pace would slow. Instead, it accelerated.
                Each cycle uncovered new verticals, new technical patterns,
                and new case studies worth documenting. By the time we hit{' '}
                <Link
                  href="/blog/one-fifty-articles-lessons"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  150 articles
                </Link>
                , we had identified patterns across industries that no single
                analysis could have revealed.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {milestoneStats.map((stat) => (
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

        {/* ===== CONTENT BREAKDOWN ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-500" />
              What We Published: Content Breakdown
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              The library is not random — it follows a deliberate structure
              across five content categories, each serving a different reader
              and a different stage of the agent readiness journey.
            </p>

            <div className="space-y-4 mb-8">
              {contentBreakdown.map((cat) => {
                const colors = getColorClasses(cat.color)
                return (
                  <div
                    key={cat.category}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-zinc-100">
                        {cat.category}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}
                      >
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== 5 LESSONS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Five Lessons From 60+ Content Cycles
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Each lesson emerged from the data, not from theory. These are
              the patterns that survived across hundreds of scans and dozens
              of industry analyses.
            </p>

            <div className="space-y-4 mb-8">
              {lessons.map((lesson) => {
                const colors = getColorClasses(lesson.color)
                return (
                  <div
                    key={lesson.number}
                    className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border} ${colors.text} text-lg font-bold`}
                    >
                      {lesson.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <lesson.icon
                          className={`h-4 w-4 ${colors.text}`}
                        />
                        <h3 className="font-bold text-zinc-100 text-base">
                          {lesson.title}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {lesson.detail}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== WHAT COMES NEXT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              What Comes Next: The Post-200 Roadmap
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Hitting 200 articles is a milestone, not a destination. The
                next phase focuses on three priorities that shift from
                creation to impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  title: 'Search engine indexing',
                  detail:
                    '200+ pages of original, data-driven content need to be discoverable via Google. Technical SEO, internal linking, and sitemap optimization are the priority. The content exists — now it needs to rank.',
                  icon: Search,
                },
                {
                  title: 'AI model citation',
                  detail:
                    'When someone asks ChatGPT, Claude, or Perplexity about agent readiness, we want AgentHermes data cited in the response. This requires the content to be authoritative, factual, and structured in ways AI models prioritize.',
                  icon: Bot,
                },
                {
                  title: 'Business discovery',
                  detail:
                    'The businesses we analyze in case studies and vertical guides need to discover their own scores. Outbound notification, industry reports, and embedded scoring widgets are the distribution channels.',
                  icon: Globe,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <item.icon className="h-5 w-5 text-emerald-400 mb-3" />
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The content library is proof that agent readiness is a real,
                measurable, improvable property of any business with digital
                infrastructure. 200 articles is not boilerplate — it is 200
                unique analyses, each grounded in scan data, each addressing
                a specific vertical, technical pattern, or business case study
                that no one else has published.
              </p>
              <p>
                Our{' '}
                <Link
                  href="/blog/agent-readiness-2026-predictions"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  2026 predictions
                </Link>{' '}
                laid out the thesis: the agent economy rewards businesses that
                are discoverable, structured, and transactable by AI agents.
                190+ articles later, every prediction is being validated by the
                scan data. The businesses that invest in agent readiness today
                will capture the agent-driven traffic of tomorrow.
              </p>
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
                  title:
                    '100 Articles on Agent Readiness: What We Learned',
                  href: '/blog/hundred-articles-agent-readiness',
                  tag: 'Milestone',
                  tagColor: 'emerald',
                },
                {
                  title: '150 Articles: Lessons From the Halfway Mark',
                  href: '/blog/one-fifty-articles-lessons',
                  tag: 'Milestone',
                  tagColor: 'emerald',
                },
                {
                  title:
                    'Agent Readiness 2026 Predictions',
                  href: '/blog/agent-readiness-2026-predictions',
                  tag: 'Analysis',
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
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
              See where your business stands
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              190+ articles, 500+ businesses scanned, 50+ verticals analyzed.
              Run a free scan to see your Agent Readiness Score and how you
              compare to the businesses in our library.
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
                Browse All Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
