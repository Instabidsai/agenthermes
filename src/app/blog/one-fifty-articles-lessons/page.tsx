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
  Cpu,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lightbulb,
  Search,
  Server,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: '154 Articles Later: The Content Strategy That Made AgentHermes the Agent Readiness Authority | AgentHermes',
  description:
    'What we learned publishing 154 articles in 50 content cycles. Brain-driven content over generic AI slop, real scan data in every article, zero manual distribution, 30+ verticals covered, and the content architecture that builds topical authority in a new market.',
  keywords: [
    'agent readiness content strategy',
    'content strategy authority building',
    'AgentHermes content lessons',
    'topical authority content',
    'AI content strategy',
    'SEO content at scale',
    'agent economy content',
    'brain-driven content creation',
  ],
  openGraph: {
    title: '154 Articles Later: The Content Strategy That Made AgentHermes the Agent Readiness Authority',
    description:
      '50 content cycles, 154 articles, 30+ verticals, zero manual distribution. The content strategy that built topical authority in a category that did not exist 6 months ago.',
    url: 'https://agenthermes.ai/blog/one-fifty-articles-lessons',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '154 Articles Later: The Content Strategy Behind AgentHermes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '154 Articles Later: The Content Strategy That Built Agent Readiness Authority',
    description:
      '50 cycles. 154 articles. 30+ verticals. Zero manual distribution. Here is what worked, what failed, and what we learned.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/one-fifty-articles-lessons',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const milestones = [
  { cycle: '1-5', articles: 15, focus: 'Foundation', detail: 'Core concepts: what is agent readiness, ARL levels, MCP explained, scoring methodology, first vertical (restaurants). Establishing the vocabulary of a new market.' },
  { cycle: '6-15', articles: 30, focus: 'Vertical Coverage', detail: 'One vertical per cycle: healthcare, real estate, fintech, legal, construction, education. Each with real scan data and specific scoring breakdowns. Building breadth.' },
  { cycle: '16-25', articles: 30, focus: 'Technical Depth', detail: 'Deep dives: OAuth for agents, error handling, OpenAPI specs, rate limiting, webhooks, GraphQL vs REST. Moving from "what is agent readiness" to "how to improve it."' },
  { cycle: '26-35', articles: 30, focus: 'Case Studies', detail: 'Named companies: why Stripe scores 68, Slack 68, GitHub 65. Platform comparisons: Shopify vs WooCommerce, Vercel vs Supabase. Real scores with real analysis.' },
  { cycle: '36-45', articles: 30, focus: 'Long Tail', detail: 'Niche verticals: pest control, dry cleaning, parking, staffing, coworking. Architecture pieces: microservices vs monolith, serverless, multi-tenant. Covering every search intent.' },
  { cycle: '46-50', articles: 19, focus: 'Authority + Meta', detail: 'Milestone pieces (100 articles, now 154), prediction articles, competitor analysis, investor guides. Content about content. Proving we own the category.' },
]

const contentLessons = [
  {
    number: '1',
    title: 'Brain-driven content catches mistakes that generic AI misses',
    detail: 'Every article passes through a brain layer that knows our 16 beliefs about agent readiness, our scoring methodology, and our scan results. In cycle 12, the brain caught an article claiming "most businesses score 60+" — our actual average is 43/100. Generic content generation would have published wrong data. The brain is the quality gate.',
    icon: Cpu,
    color: 'emerald',
  },
  {
    number: '2',
    title: 'Every article uses real scan data — zero made-up statistics',
    detail: 'We have scanned 500+ businesses. Every claim in every article traces back to real scan results. When we say "average restaurant agent readiness is 12/100" that is the actual average from our database, not a round number we invented. Real data is our moat — anyone can generate 154 articles of AI slop, but only we have the scan results to make them authoritative.',
    icon: BarChart3,
    color: 'blue',
  },
  {
    number: '3',
    title: 'Zero manual distribution — git push triggers the entire pipeline',
    detail: 'Every article goes live the same way: git push to master triggers Vercel deploy, then Google Indexing API submits new URLs, then PremiumMinds posts a discussion thread. No social media scheduling, no email newsletter, no manual promotion. The entire distribution pipeline is automated. This lets us publish 3 articles per cycle without any distribution overhead.',
    icon: Zap,
    color: 'purple',
  },
  {
    number: '4',
    title: 'Vertical coverage matters more than depth in a new category',
    detail: 'Covering 30+ verticals (restaurants, healthcare, legal, construction, fintech, pest control, dry cleaning, parking) built more topical authority than 30 deep dives on one vertical. Search engines reward breadth when the category is new — there is no existing authority to compete with, so the first comprehensive coverage wins. We wrote the article for every vertical search intent.',
    icon: Globe,
    color: 'amber',
  },
  {
    number: '5',
    title: 'Four content types create complete authority',
    detail: 'Technical deep dives (how webhooks affect scoring), vertical analyses (restaurant agent readiness), case studies (why Stripe scores 68), and reference materials (glossary, error codes, ARL levels). Each type serves a different search intent. Technical attracts developers, verticals attract business owners, case studies attract decision-makers, references attract repeat visitors. Gaps in any type leave authority incomplete.',
    icon: Layers,
    color: 'cyan',
  },
]

const contentMix = [
  { type: 'Vertical Analyses', count: 52, percent: '34%', color: 'bg-amber-500' },
  { type: 'Technical Deep Dives', count: 41, percent: '27%', color: 'bg-purple-500' },
  { type: 'Case Studies', count: 23, percent: '15%', color: 'bg-blue-500' },
  { type: 'Practical Guides', count: 19, percent: '12%', color: 'bg-emerald-500' },
  { type: 'Reference / Glossary', count: 11, percent: '7%', color: 'bg-cyan-500' },
  { type: 'Market Analysis / Meta', count: 8, percent: '5%', color: 'bg-red-500' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How do you publish 3 articles per cycle without quality dropping?',
    answer:
      'Each article follows a strict template: metadata, data structures, hero, 4-6 content sections, FAQ with schema.org markup, related articles, and CTA. The template is the quality floor. Content comes from a brain layer that has access to all scan results, beliefs, and previous articles. The brain prevents contradictions, enforces data accuracy, and maintains voice consistency. The template + brain combination means quality stays constant regardless of volume.',
  },
  {
    question: 'Are these articles written by AI?',
    answer:
      'Yes, assisted by AI — but not generic AI. Every article is generated through a brain-driven pipeline that has access to our scan database (500+ businesses), our 16 agent readiness beliefs, our scoring methodology, and all 153 previous articles. The brain checks every claim against real data and flags contradictions. The result is AI-assisted content grounded in proprietary data — fundamentally different from generic AI content that invents statistics.',
  },
  {
    question: 'What content gets the most traffic?',
    answer:
      'Vertical analyses generate the most organic search traffic because they target specific business owner queries ("restaurant agent readiness", "dental practice agent readiness"). Technical deep dives generate the most backlinks because developers share them. Case studies generate the most conversions because they show real scores that make business owners curious about their own. All three types are essential — none alone would build authority.',
  },
  {
    question: 'What is next after 154 articles?',
    answer:
      'Three priorities: (1) Getting indexed — having 154 articles means nothing if Google has not crawled them. We are pushing URLs via the Indexing API and monitoring crawl coverage. (2) Getting cited — we want AI assistants (ChatGPT, Claude, Perplexity) to cite our articles when answering agent readiness questions. (3) Getting users — every article includes a CTA to run a free scan at /audit. The content funnel is built. Now we need the distribution to match.',
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

export default function OneFiftyArticlesLessonsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '154 Articles Later: The Content Strategy That Made AgentHermes the Agent Readiness Authority',
    description:
      'What we learned publishing 154 articles in 50 content cycles. Brain-driven content, real scan data, zero manual distribution, 30+ verticals, and the architecture that builds topical authority.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/one-fifty-articles-lessons',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Company',
    wordCount: 1850,
    keywords:
      'agent readiness content strategy, topical authority, content at scale, brain-driven content',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: '154 Articles Lessons',
          item: 'https://agenthermes.ai/blog/one-fifty-articles-lessons',
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
      title="154 Articles Later: The Content Strategy That Made AgentHermes the Agent Readiness Authority"
      shareUrl="https://agenthermes.ai/blog/one-fifty-articles-lessons"
      currentHref="/blog/one-fifty-articles-lessons"
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
            <span className="text-zinc-400">154 Articles Lessons</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <BookOpen className="h-3.5 w-3.5" />
              Milestone
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Cycle 50
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            154 Articles Later:{' '}
            <span className="text-emerald-400">The Content Strategy That Made AgentHermes the Agent Readiness Authority</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Fifty content cycles. 154 published articles. 30+ industry verticals. Zero manual
            distribution. This is what we learned building topical authority in a category that did
            not exist six months ago — and the content architecture that makes it repeatable.
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
                  12 min read
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
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            By the Numbers
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we published our{' '}
              <Link href="/blog/hundred-articles-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                100th article milestone
              </Link>, we thought we had covered agent readiness comprehensively. We were wrong.
              The next 54 articles uncovered niche verticals (dry cleaning, parking, staffing),
              advanced technical topics (API deprecation, microservices architecture, content negotiation),
              and cross-cutting analyses (accessibility vs agent readiness, enterprise vs startup patterns)
              that filled gaps we did not know existed.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '154', label: 'Articles Published', icon: FileText },
              { value: '50', label: 'Content Cycles', icon: Target },
              { value: '30+', label: 'Verticals Covered', icon: Globe },
              { value: '500+', label: 'Businesses Scanned', icon: Search },
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

      {/* ===== THE JOURNEY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            The 50-Cycle Journey
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Each cycle publishes 3 articles. Here is how our content strategy evolved across
            50 cycles — from laying foundations to claiming category authority.
          </p>

          <div className="space-y-3 mb-8">
            {milestones.map((m) => (
              <div
                key={m.cycle}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-center">
                    <div className="text-xs text-zinc-500">Cycles</div>
                    <div className="text-sm font-bold text-emerald-400">{m.cycle}</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{m.focus}</h3>
                    <span className="text-xs text-zinc-500">{m.articles} articles</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5 LESSONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            5 Lessons From 154 Articles
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are the non-obvious lessons — the things we learned by doing that we could
            not have predicted when we started.
          </p>

          <div className="space-y-4 mb-8">
            {contentLessons.map((lesson) => {
              const colors = getColorClasses(lesson.color)
              return (
                <div
                  key={lesson.number}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <lesson.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-bold ${colors.text}`}>Lesson {lesson.number}</span>
                      <h3 className="text-sm font-bold text-zinc-100">{lesson.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{lesson.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CONTENT MIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            Content Mix Breakdown
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The mix was not planned in advance — it emerged from following search intent patterns
              and filling gaps we discovered along the way. In retrospect, the ratio feels right:
              heavy on verticals (business owners searching for their industry), strong on technical
              depth (developers implementing), and lighter on case studies and meta content (which
              require specific scan results to be credible).
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {contentMix.map((item) => (
              <div
                key={item.type}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-200">{item.type}</span>
                  <span className="text-sm text-zinc-400">{item.count} articles ({item.percent})</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: item.percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT IS NEXT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Comes Next
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Having 154 articles is meaningless if they are not indexed, cited, and converting.
              The content factory is built — the machine that produces 3 quality articles per cycle
              is proven and repeatable. Now we shift focus from production to distribution and
              conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Getting Indexed',
                detail: '154 URLs submitted via Google Indexing API. Monitoring crawl coverage in Search Console. Sitemap verified. The content exists — now Google needs to acknowledge it.',
                icon: Search,
                color: 'emerald',
              },
              {
                title: 'Getting Cited',
                detail: 'When someone asks ChatGPT or Perplexity "what is agent readiness?" we want them citing AgentHermes. This requires the content to be both indexed AND authoritative enough for AI models to reference.',
                icon: Bot,
                color: 'blue',
              },
              {
                title: 'Getting Users',
                detail: 'Every article funnels to /audit for a free scan. The content-to-scan conversion path is built. Now we need the top-of-funnel volume to make it meaningful. Target: 1,000 scans from organic content traffic.',
                icon: Target,
                color: 'purple',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className={`p-5 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                >
                  <item.icon className={`h-5 w-5 ${colors.text} mb-3`} />
                  <h3 className="font-bold text-zinc-100 text-sm mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The moat is real.</strong> Anyone can generate 154
              articles with ChatGPT. No one else has 500+ real business scans with scored results, a
              brain layer that cross-references every claim against proprietary data, and a content
              factory that produces 3 data-backed articles every cycle without manual intervention.
              The content is the surface. The scan database is the moat. Read our{' '}
              <Link href="/blog/agent-readiness-2026-predictions" className="text-emerald-400 hover:text-emerald-300 underline">
                2026 predictions
              </Link>{' '}
              to see where we think the market is heading. Or read about how{' '}
              <Link href="/blog/agent-readiness-vs-seo" className="text-emerald-400 hover:text-emerald-300 underline">
                agent readiness compares to SEO
              </Link>{' '}
              as a discovery channel.
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
                title: '100 Articles: The First Milestone in Agent Readiness Content',
                href: '/blog/hundred-articles-agent-readiness',
                tag: 'Milestone',
                tagColor: 'emerald',
              },
              {
                title: 'Agent Readiness 2026 Predictions',
                href: '/blog/agent-readiness-2026-predictions',
                tag: 'Predictions',
                tagColor: 'purple',
              },
              {
                title: 'Agent Readiness vs SEO: A New Discovery Channel',
                href: '/blog/agent-readiness-vs-seo',
                tag: 'Analysis',
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
            See your own Agent Readiness Score
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            154 articles. 500+ businesses scanned. Average score: 43/100. Where does your
            business stand? Get your free score in 60 seconds.
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
