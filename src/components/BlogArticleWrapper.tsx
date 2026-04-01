import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

// ---------------------------------------------------------------------------
// Related article type
// ---------------------------------------------------------------------------
interface RelatedArticle {
  title: string
  href: string
  tag: string
  tagColor: 'emerald' | 'blue' | 'purple' | 'amber' | 'cyan'
}

// ---------------------------------------------------------------------------
// Default related articles pool
// ---------------------------------------------------------------------------
const defaultRelated: RelatedArticle[] = [
  {
    title: 'What Is Agent Readiness? The Complete Guide',
    href: '/blog/what-is-agent-readiness',
    tag: 'Complete Guide',
    tagColor: 'emerald',
  },
  {
    title: 'State of Agent Readiness: Most Businesses Score Under 40',
    href: '/report/state-of-readiness',
    tag: 'Research',
    tagColor: 'emerald',
  },
  {
    title: 'Why Stripe Scores 68 Silver',
    href: '/blog/why-stripe-scores-68',
    tag: 'Case Study',
    tagColor: 'blue',
  },
  {
    title: 'Agent Readiness Levels Explained',
    href: '/blog/arl-levels-explained',
    tag: 'Framework',
    tagColor: 'purple',
  },
  {
    title: 'Zero MCP Servers for Local Businesses',
    href: '/blog/mcp-gap',
    tag: 'Market Analysis',
    tagColor: 'amber',
  },
  {
    title: 'What Agent-Ready Means for Restaurants',
    href: '/blog/agent-ready-restaurants',
    tag: 'Industry Analysis',
    tagColor: 'amber',
  },
]

// ---------------------------------------------------------------------------
// Tag color map
// ---------------------------------------------------------------------------
function getTagStyles(color: string): string {
  const map: Record<string, string> = {
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function BlogArticleWrapper({
  children,
  title,
  shareUrl,
  currentHref,
  related,
}: {
  children: React.ReactNode
  title: string
  shareUrl: string
  currentHref: string
  related?: RelatedArticle[]
}) {
  const shareText = encodeURIComponent(title)
  const shareUrlEncoded = encodeURIComponent(shareUrl)

  // Pick 3 related articles, excluding the current article
  const relatedArticles =
    related ||
    defaultRelated.filter((a) => a.href !== currentHref).slice(0, 3)

  return (
    <>
      {children}

      {/* ===== SHARE BUTTONS ===== */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <hr className="section-divider mb-8" />
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-500 font-medium">
              Share this article:
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrlEncoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrlEncoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ===== RELATED ARTICLES ===== */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-zinc-300">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 article-card-hover"
              >
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 border ${getTagStyles(article.tagColor)}`}
                >
                  {article.tag}
                </span>
                <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors leading-snug">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ---------------------------------------------------------------------------
// Author Byline sub-component (used in article hero sections)
// ---------------------------------------------------------------------------
export function AuthorByline({
  date,
  readTime,
}: {
  date: string
  readTime: string
}) {
  return (
    <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
      <div className="author-avatar">AH</div>
      <div>
        <div className="text-sm font-semibold text-zinc-200">
          AgentHermes Research
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
        </div>
      </div>
    </div>
  )
}
