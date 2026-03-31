import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Lightbulb,
  TrendingUp,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agent Economy Insights | AgentHermes Blog',
  description:
    'Research, data, and analysis from scanning 132+ businesses. Insights on agent readiness, MCP adoption, ecommerce platforms, and the $6.2B gap in local business AI infrastructure.',
  openGraph: {
    title: 'Agent Economy Insights | AgentHermes Blog',
    description:
      'Research, data, and analysis from scanning 132+ businesses for agent readiness.',
    url: 'https://agenthermes.ai/blog',
    siteName: 'AgentHermes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Economy Insights | AgentHermes Blog',
    description:
      'Research, data, and analysis from scanning 132+ businesses for agent readiness.',
  },
}

interface Article {
  title: string
  excerpt: string
  date: string
  readTime: string
  href: string
  tag: string
  tagColor: string
  icon: typeof BarChart3
}

const articles: Article[] = [
  {
    title: 'State of Agent Readiness: Most Businesses Score Under 40',
    excerpt:
      'After scanning 132+ businesses across 15 verticals, the data is clear: the average Agent Readiness Score is 36/100. Here is what that means for the $3-5T agent economy and what businesses can do about it.',
    date: '2026-03-28',
    readTime: '8 min read',
    href: '/report/state-of-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: BarChart3,
  },
  {
    title: 'What Makes Stripe Score 68 Silver',
    excerpt:
      'A deep breakdown of how Stripe earned a Silver-tier Agent Readiness Score. We analyze all 9 dimensions — from API quality and auth-protected JSON responses to MCP readiness and structured pricing — to show what "good" looks like.',
    date: '2026-03-27',
    readTime: '12 min read',
    href: '/score/stripe.com',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: TrendingUp,
  },
  {
    title: 'The 6-Step Agent Journey Every Business Should Know',
    excerpt:
      'AI agents follow a predictable 6-step journey when interacting with businesses: Find, Understand, Sign Up, Connect, Use, Pay. Most businesses fail at step 1. Learn the full framework and how to optimize each step.',
    date: '2026-03-26',
    readTime: '6 min read',
    href: '/about',
    tag: 'Framework',
    tagColor: 'purple',
    icon: Lightbulb,
  },
  {
    title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
    excerpt:
      'There are 33 million small businesses in the US. Zero have MCP servers. That is a $6.2B infrastructure gap that will define who wins the agent economy. Our research shows exactly where the opportunity lies.',
    date: '2026-03-25',
    readTime: '10 min read',
    href: '/blog/mcp-gap',
    tag: 'Market Analysis',
    tagColor: 'amber',
    icon: Zap,
  },
  {
    title: 'Shopify vs WooCommerce: Which is More Agent-Ready?',
    excerpt:
      'We scanned dozens of Shopify and WooCommerce stores to compare agent readiness. Shopify wins on discoverability with public JSON endpoints. WooCommerce wins on API depth with its Store API. Neither scores above 50 without help.',
    date: '2026-03-24',
    readTime: '9 min read',
    href: '/blog/shopify-vs-woocommerce',
    tag: 'Comparison',
    tagColor: 'cyan',
    icon: FileText,
  },
  {
    title: 'How to Become Agent-Ready in 60 Seconds',
    excerpt:
      'The fastest path from invisible to agent-ready: connect your business to AgentHermes. We auto-generate your agent card, MCP endpoint, llms.txt, and structured pricing. One form, 60 seconds, full agent infrastructure.',
    date: '2026-03-23',
    readTime: '4 min read',
    href: '/connect',
    tag: 'Getting Started',
    tagColor: 'green',
    icon: BookOpen,
  },
]

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getTagClasses(color: string): { bg: string; border: string; text: string } {
  const map: Record<string, { bg: string; border: string; text: string }> = {
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
  }
  return map[color] || map.emerald
}

export default function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Agent Economy Insights',
    description: 'Research, data, and analysis from scanning 132+ businesses for agent readiness.',
    url: 'https://agenthermes.ai/blog',
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      url: `https://agenthermes.ai${article.href}`,
      author: {
        '@type': 'Organization',
        name: 'AgentHermes',
      },
    })),
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
      ],
    },
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-zinc-400">Blog</span>
            </div>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <BookOpen className="h-4 w-4" />
              Agent Economy Insights
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Research &amp; <span className="text-emerald-500">Analysis</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mx-auto mb-4">
              Research, data, and analysis from scanning 132+ businesses.
            </p>

            <p className="text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto">
              Insights on agent readiness scores, MCP adoption, ecommerce platform
              comparisons, and the infrastructure gap defining the agent economy.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16">
          <Link
            href={articles[0].href}
            className="group relative block p-8 lg:p-10 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                Featured
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${getTagClasses(articles[0].tagColor).bg} border ${getTagClasses(articles[0].tagColor).border} ${getTagClasses(articles[0].tagColor).text} text-xs font-medium`}>
                {articles[0].tag}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">
              {articles[0].title}
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-6 max-w-3xl">
              {articles[0].excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(articles[0].date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {articles[0].readTime}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                Read article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== ARTICLE GRID ===== */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(1).map((article) => {
              const tagClasses = getTagClasses(article.tagColor)
              return (
                <Link
                  key={article.title}
                  href={article.href}
                  className="group relative flex flex-col p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all"
                >
                  {/* Icon + Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/50 group-hover:border-zinc-600/50 transition-colors">
                      <article.icon className={`h-5 w-5 ${tagClasses.text}`} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${tagClasses.bg} border ${tagClasses.border} ${tagClasses.text} text-xs font-medium`}
                    >
                      {article.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-zinc-100 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-zinc-600 mt-auto pt-4 border-t border-zinc-800/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(article.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                      Read
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Want to see your own score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See how your
            business compares across all 9 dimensions.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Score My Business
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
