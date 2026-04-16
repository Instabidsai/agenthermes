import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Banknote,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Code,
  Code2,
  Crown,
  DollarSign,
  Eye,
  FileCode,
  FileJson,
  FileText,
  Globe,
  Heart,
  Layers,
  Lightbulb,
  Megaphone,
  Network,
  Server,
  ShoppingCart,
  TrendingUp,
  UtensilsCrossed,
  Wrench,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agent Economy Insights | AgentHermes Blog',
  description:
    'Research, data, and analysis from scanning 500+ businesses. Insights on agent readiness scores, MCP adoption, ecommerce platforms, and the $6.2B gap in local business AI infrastructure.',
  openGraph: {
    title: 'Agent Economy Insights | AgentHermes Blog',
    description:
      'Research, data, and analysis from scanning 500+ businesses for agent readiness.',
    url: 'https://agenthermes.ai/blog',
    siteName: 'AgentHermes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Economy Insights | AgentHermes Blog',
    description:
      'Research, data, and analysis from scanning 500+ businesses for agent readiness.',
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
    title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness (D2 = 15%)',
    excerpt:
      'D2 API Quality is weighted 0.15 — the highest of any Agent Readiness dimension. Companies with published OpenAPI specs consistently score 60+. Companies without hit a ceiling around 45. Here is why OpenAPI is the single biggest factor and how to ship one in 2 hours.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/openapi-agent-readiness',
    tag: 'Standards Deep Dive',
    tagColor: 'emerald',
    icon: FileCode,
  },
  {
    title: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12',
    excerpt:
      'Fintech is the most polarized vertical on agent readiness. Stripe 68, Robinhood 66, Allstate 66 — all Silver. Cash App 12, Square 8 — invisible. The split comes down to one decision: did you build for developers or for consumers?',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/fintech-agent-readiness',
    tag: 'Industry Analysis',
    tagColor: 'amber',
    icon: Banknote,
  },
  {
    title: 'Why Developer Tools Dominate Agent Readiness (And What Everyone Else Can Learn)',
    excerpt:
      'After scanning 500 businesses, 22 of the top 30 Silver-tier companies are developer tools. Vercel 70, Supabase 69, Stripe 68, GitHub 67. One pattern explains all of them — and it is fully portable to any business that wants to stop being invisible to agents.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/developer-tools-agent-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: Code,
  },
  {
    title: 'What Is agent-card.json? The Missing File on 500 Business Websites',
    excerpt:
      'agent-card.json is the A2A protocol discovery file that lets AI agents find your capabilities. We scanned 500 businesses. Exactly zero have one. Here is what goes inside, a minimal valid example, and how to auto-generate one in 60 seconds.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/agent-card-json-guide',
    tag: 'Standards Deep Dive',
    tagColor: 'emerald',
    icon: FileJson,
  },
  {
    title: 'Why Marketing Agencies Score the Lowest on Agent Readiness (Avg 14-19)',
    excerpt:
      'Marketing agencies average 19/100. Advertising averages 14/100. The worst-performing verticals we scan. The agencies selling discoverability cannot be discovered themselves — here is why, and the fix that turns it into a first-mover edge.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/marketing-agencies-agent-readiness',
    tag: 'Industry Analysis',
    tagColor: 'amber',
    icon: Megaphone,
  },
  {
    title: 'Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency',
    excerpt:
      '148 of 500 businesses we scanned have no visible pricing at all. D4 Pricing is weighted lowest (0.05) but has the highest universal failure rate. Here is what agent-ready pricing looks like — with drop-in JSON-LD Offer markup you can ship today.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/pricing-transparency-agent-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: DollarSign,
  },
  {
    title: 'The Agent Readiness Leaderboard: Who Is Winning and Who Is Invisible',
    excerpt:
      'The definitive 2026 ranking of 500 businesses by Agent Readiness Score. Only 1 Gold. Zero Platinum. 198 completely invisible. Data-driven analysis of who leads, who lags, and what the 60-point cliff between Silver and Bronze really means.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/agent-readiness-leaderboard',
    tag: 'Data Analysis',
    tagColor: 'emerald',
    icon: Crown,
  },
  {
    title: 'Agent Readiness in Healthcare: Why the Average Score Is 33',
    excerpt:
      'Healthcare averages 33/100 on the Agent Readiness Score — the lowest of any major vertical. We break down why HIPAA, PDF forms, and phone-only booking make healthcare invisible to AI agents, and what agent-ready healthcare actually looks like.',
    date: '2026-04-15',
    readTime: '15 min read',
    href: '/blog/healthcare-agent-readiness',
    tag: 'Industry Analysis',
    tagColor: 'amber',
    icon: Heart,
  },
  {
    title: 'How to Improve Your Agent Readiness Score: A Step-by-Step Guide',
    excerpt:
      'The 10-step playbook to improve your Agent Readiness Score. Real examples from 500 businesses, estimated effort for each step, and the exact changes that moved companies from Bronze to Silver. Phase 1 takes an afternoon.',
    date: '2026-04-15',
    readTime: '16 min read',
    href: '/blog/improve-agent-readiness-score',
    tag: 'How-To Guide',
    tagColor: 'green',
    icon: Wrench,
  },
  {
    title: 'Is Your Business Invisible to AI Agents?',
    excerpt:
      'We scanned 500 businesses. 40% are completely invisible to AI agents. Find out where you stand with a free 60-second Agent Readiness Score — and what it takes to go from dark to discoverable.',
    date: '2026-04-16',
    readTime: '12 min read',
    href: '/blog/invisible-to-ai-agents',
    tag: 'Getting Started',
    tagColor: 'green',
    icon: Eye,
  },
  {
    title: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
    excerpt:
      'Out of 500 businesses scanned, only Resend scored Gold (75). Here is exactly what they do right across all 9 dimensions — and why the next closest companies are 3 points away.',
    date: '2026-04-16',
    readTime: '14 min read',
    href: '/blog/resend-only-gold',
    tag: 'Case Study',
    tagColor: 'amber',
    icon: Award,
  },
  {
    title: 'Why Most SaaS Companies Score Bronze for Agent Readiness',
    excerpt:
      'We scanned 500 businesses. 50% scored Bronze. Here is why SaaS companies with great APIs still fail at agent readiness — and what the top 10% do differently across all 9 dimensions.',
    date: '2026-04-16',
    readTime: '15 min read',
    href: '/blog/saas-agent-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: Code2,
  },
  {
    title: 'What Is Agent Readiness? The Complete Guide',
    excerpt:
      'The definitive explainer: why agent readiness matters, the 7 ARL levels, the 6-step agent journey, 9 scoring dimensions, and data from scanning 238+ businesses. If you read one article about agent readiness, make it this one.',
    date: '2026-03-30',
    readTime: '18 min read',
    href: '/blog/what-is-agent-readiness',
    tag: 'Complete Guide',
    tagColor: 'emerald',
    icon: Globe,
  },
  {
    title: 'What Agent-Ready Means for Restaurants — From PDF Menus to AI Agents',
    excerpt:
      '60% of restaurants are invisible to AI agents. Learn the 5-level progression from PDF menus and phone reservations to a restaurant with its own AI agent that negotiates group bookings and fills empty tables automatically.',
    date: '2026-03-30',
    readTime: '14 min read',
    href: '/blog/agent-ready-restaurants',
    tag: 'Industry Analysis',
    tagColor: 'amber',
    icon: UtensilsCrossed,
  },
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
    href: '/blog/why-stripe-scores-68',
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
    title: 'Agent Readiness Levels Explained: From Dark to Interoperable',
    excerpt:
      'The complete guide to the 7 Agent Readiness Levels (ARL-0 through ARL-6). Learn what each level means with real examples, why ARL-3 is the revenue inflection point, and how to check your level in 60 seconds.',
    date: '2026-03-26',
    readTime: '10 min read',
    href: '/blog/arl-levels-explained',
    tag: 'Framework',
    tagColor: 'purple',
    icon: Layers,
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
              Research, data, and analysis from scanning 500+ businesses.
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
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Featured</span>
          </div>
          <Link
            href={articles[0].href}
            className="group relative block rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all overflow-hidden article-card-hover"
          >
            {/* Hero gradient image area */}
            <div className="relative h-48 sm:h-64 lg:h-72 featured-hero-gradient">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#09090b] to-transparent" />
              {/* Floating score badge */}
              <div className="absolute top-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900/80 border border-emerald-500/30 backdrop-blur-sm badge-glow">
                {(() => { const FeaturedIcon = articles.at(0)!.icon; return <FeaturedIcon className="h-6 w-6 text-emerald-400" />; })()}
              </div>
            </div>

            <div className="relative p-8 lg:p-10 bg-emerald-500/5">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  Featured
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${getTagClasses(articles[0].tagColor).bg} border ${getTagClasses(articles[0].tagColor).border} ${getTagClasses(articles[0].tagColor).text} text-xs font-medium`}>
                  {articles[0].tag}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">
                {articles[0].title}
              </h2>

              <p className="text-zinc-400 leading-relaxed mb-6 max-w-3xl text-base sm:text-lg">
                {articles[0].excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-zinc-600" />
                  <span className="font-medium">{formatDate(articles[0].date)}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-zinc-600" />
                  <span className="font-medium">{articles[0].readTime}</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
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
                  className="group relative flex flex-col p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600/80 article-card-hover"
                >
                  {/* Small gradient accent at top */}
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon + Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/50 group-hover:border-zinc-600/50 transition-colors">
                      <article.icon className={`h-5 w-5 ${tagClasses.text} icon-hover-bounce`} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${tagClasses.bg} border ${tagClasses.border} ${tagClasses.text} text-xs font-semibold`}
                    >
                      {article.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-emerald-400 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta - more prominent date/time */}
                  <div className="flex items-center gap-4 text-xs mt-auto pt-4 border-t border-zinc-800/50">
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                      <span className="font-medium">{formatDate(article.date)}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Clock className="h-3.5 w-3.5 text-zinc-600" />
                      <span className="font-medium">{article.readTime}</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto font-medium">
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
