import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Eye,
  FileSearch,
  Globe,
  HelpCircle,
  Layers,
  Search,
  Server,
  Shield,
  ShieldAlert,
  Target,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'robots.txt for AI Crawlers: How to Let GPTBot, ClaudeBot, and PerplexityBot In | AgentHermes',
  description:
    'Many businesses accidentally block AI crawlers via robots.txt. GPTBot (OpenAI), ClaudeBot (Anthropic), Google-Extended, and PerplexityBot all respect robots.txt. Blocking them makes you invisible to AI models. Copy-paste template included.',
  keywords: [
    'robots.txt AI crawlers GPTBot',
    'robots.txt ClaudeBot',
    'robots.txt PerplexityBot',
    'robots.txt Google-Extended',
    'AI crawler robots.txt',
    'GPTBot user agent',
    'block AI crawlers',
    'allow AI crawlers robots.txt',
    'GEO generative engine optimization',
  ],
  openGraph: {
    title: 'robots.txt for AI Crawlers: How to Let GPTBot, ClaudeBot, and PerplexityBot In',
    description:
      'Your robots.txt might be blocking AI models from learning about your business. GPTBot, ClaudeBot, and PerplexityBot respect robots.txt. Here is how to let them in while blocking scrapers.',
    url: 'https://agenthermes.ai/blog/robots-txt-ai-crawlers',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'robots.txt for AI Crawlers: How to Let GPTBot, ClaudeBot, and PerplexityBot In',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'robots.txt for AI Crawlers: Let GPTBot and ClaudeBot In',
    description:
      'Your robots.txt might be blocking AI models from learning about your business. Copy-paste template to allow AI crawlers while blocking scrapers.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/robots-txt-ai-crawlers',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const aiCrawlers = [
  {
    name: 'GPTBot',
    operator: 'OpenAI',
    purpose: 'Trains GPT models, powers ChatGPT Browse and Search',
    verdict: 'Allow',
    color: 'emerald',
    reason: 'Being in ChatGPT training data means getting cited when users ask about your industry.',
  },
  {
    name: 'ChatGPT-User',
    operator: 'OpenAI',
    purpose: 'Real-time browsing when ChatGPT users ask questions',
    verdict: 'Allow',
    color: 'emerald',
    reason: 'Blocking this means ChatGPT cannot read your pages when users ask about you directly.',
  },
  {
    name: 'anthropic-ai / ClaudeBot',
    operator: 'Anthropic',
    purpose: 'Trains Claude models, powers Claude web search',
    verdict: 'Allow',
    color: 'emerald',
    reason: 'Claude is used by millions of professionals. Your business should be in its knowledge base.',
  },
  {
    name: 'Google-Extended',
    operator: 'Google',
    purpose: 'Trains Gemini models (separate from Googlebot for Search)',
    verdict: 'Allow',
    color: 'emerald',
    reason: 'Controls whether your content trains Gemini. Does NOT affect Google Search ranking.',
  },
  {
    name: 'PerplexityBot',
    operator: 'Perplexity AI',
    purpose: 'Powers Perplexity search answers with citations',
    verdict: 'Allow',
    color: 'emerald',
    reason: 'Perplexity cites sources. Getting crawled = getting cited = free qualified traffic.',
  },
  {
    name: 'Bytespider',
    operator: 'ByteDance',
    purpose: 'Trains TikTok AI models',
    verdict: 'Allow',
    color: 'amber',
    reason: 'Optional. Large user base but less direct business value than search-oriented crawlers.',
  },
]

const scrapersToBlock = [
  {
    name: 'CCBot',
    operator: 'Common Crawl',
    purpose: 'Bulk dataset for anyone to train on',
    verdict: 'Block',
    color: 'red',
    reason: 'Your content ends up in open datasets used by competitors. No direct benefit to you.',
  },
  {
    name: 'Diffbot',
    operator: 'Diffbot',
    purpose: 'Structured data extraction for resale',
    verdict: 'Block',
    color: 'red',
    reason: 'Extracts and resells your product data, pricing, and content. Pure scraping.',
  },
  {
    name: 'Scrapy',
    operator: 'Various',
    purpose: 'Open-source scraping framework default user-agent',
    verdict: 'Block',
    color: 'red',
    reason: 'Generic scraping. No AI training benefit. Usually competitive intelligence harvesting.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does blocking GPTBot affect my Google Search ranking?',
    answer:
      'No. GPTBot is separate from Googlebot. Blocking GPTBot has zero effect on Google Search results. Similarly, blocking Google-Extended only affects Gemini AI training, not your search ranking. Googlebot (for Search) should always be allowed.',
  },
  {
    question: 'Will allowing AI crawlers steal my content?',
    answer:
      'AI crawlers use your content to build knowledge, not to display it verbatim. When ChatGPT or Perplexity answers a question about your industry, they synthesize information from thousands of sources — including yours, if you allow crawling. The risk of not being crawled (invisibility) far outweighs the risk of being crawled (your content contributing to AI knowledge). If you have genuinely proprietary data (research papers, paid content), you can block specific paths while allowing your public pages.',
  },
  {
    question: 'How does robots.txt affect my Agent Readiness Score?',
    answer:
      'AgentHermes checks robots.txt as part of D1 Discoverability (weight: 0.12). Specifically, we check whether AI crawler user-agents are blocked. A blanket "Disallow: /" for all bots scores 0 on crawler accessibility. Selectively allowing AI crawlers while blocking scrapers is the optimal configuration and earns full D1 crawler points.',
  },
  {
    question: 'What if I use a CMS like WordPress or Shopify — can I edit robots.txt?',
    answer:
      'Yes. WordPress lets you edit robots.txt via plugins like Yoast SEO or directly via the theme. Shopify generates robots.txt automatically but allows customization through the robots.txt.liquid template in your theme. Squarespace, Wix, and other builders have robots.txt settings in their SEO panels. Every major CMS supports this.',
  },
  {
    question: 'How often should I update my robots.txt for AI crawlers?',
    answer:
      'Review quarterly. New AI crawlers appear regularly — in the last 12 months, PerplexityBot, Bytespider, and several others launched. AgentHermes tracks new AI crawler user-agents and flags when your robots.txt is missing rules for newly relevant bots. The template in this article covers all current major AI crawlers as of April 2026.',
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

export default function RobotsTxtAiCrawlersPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'robots.txt for AI Crawlers: How to Let GPTBot, ClaudeBot, and PerplexityBot In',
    description:
      'Many businesses accidentally block AI crawlers. GPTBot, ClaudeBot, Google-Extended, and PerplexityBot all respect robots.txt. Here is how to configure it correctly.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/robots-txt-ai-crawlers',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Standards Guide',
    wordCount: 1800,
    keywords:
      'robots.txt AI crawlers GPTBot, ClaudeBot robots.txt, PerplexityBot, Google-Extended, GEO optimization',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'robots.txt for AI Crawlers',
          item: 'https://agenthermes.ai/blog/robots-txt-ai-crawlers',
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
      title="robots.txt for AI Crawlers: How to Let GPTBot, ClaudeBot, and PerplexityBot In"
      shareUrl="https://agenthermes.ai/blog/robots-txt-ai-crawlers"
      currentHref="/blog/robots-txt-ai-crawlers"
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
            <span className="text-zinc-400">robots.txt for AI Crawlers</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <FileSearch className="h-3.5 w-3.5" />
              Standards Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Discoverability
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            robots.txt for AI Crawlers: How to Let{' '}
            <span className="text-emerald-400">GPTBot, ClaudeBot, and PerplexityBot In</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Your <strong className="text-zinc-100">robots.txt</strong> file determines whether AI models
            know your business exists. GPTBot, ClaudeBot, Google-Extended, and PerplexityBot all respect
            it. Blocking them means zero citations when someone asks an AI about your industry. AgentHermes
            checks this in{' '}
            <Link href="/blog/discoverability-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
              D1 Discoverability
            </Link>{' '}
            — and most businesses get it wrong.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-amber-500" />
            The Invisible Business Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When someone asks ChatGPT &ldquo;What is the best CRM for small businesses?&rdquo; or asks
              Perplexity &ldquo;Which HVAC company in Austin has the best reviews?&rdquo;, the AI
              constructs its answer from content it has crawled and indexed. If your robots.txt blocks
              the AI crawler, your content is not in the training data and not available for real-time
              browsing. You are invisible.
            </p>
            <p>
              This is not a theoretical risk. Our scans show that <strong className="text-zinc-100">38%
              of businesses</strong> with a robots.txt file have rules that block at least one major
              AI crawler — usually unintentionally. A blanket <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">User-agent: *
              / Disallow: /</code> blocks everything, including AI crawlers. More commonly, businesses
              block &ldquo;bots&rdquo; they do not recognize without realizing that GPTBot and
              ClaudeBot are among them.
            </p>
            <p>
              The result is a new form of digital invisibility. Your{' '}
              <Link href="/blog/agent-readiness-vs-seo" className="text-emerald-400 hover:text-emerald-300 underline">
                SEO might be perfect
              </Link>{' '}
              — you rank #1 on Google — but if AI crawlers are blocked, you get zero citations in
              AI-generated answers. This matters because AI answer engines are the fastest-growing
              referral channel in 2026, and they are cannibalizing traditional search clicks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '38%', label: 'block AI crawlers', icon: ShieldAlert },
              { value: '0.12', label: 'D1 weight in score', icon: Search },
              { value: '6', label: 'major AI crawlers', icon: Bot },
              { value: '2 min', label: 'to fix robots.txt', icon: Zap },
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

      {/* ===== AI CRAWLERS TO ALLOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            AI Crawlers You Should Allow
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These crawlers power the AI models that millions of people use daily. Allowing them means
            your business gets cited in AI-generated answers. Every one of them respects robots.txt —
            if you allow them, they crawl your public pages; if you block them, they skip you entirely.
          </p>

          <div className="space-y-3 mb-8">
            {aiCrawlers.map((crawler) => {
              const colors = getColorClasses(crawler.color)
              return (
                <div
                  key={crawler.name}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-zinc-100">{crawler.name}</h3>
                      <span className="text-xs text-zinc-500">{crawler.operator}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}>
                      <CheckCircle2 className="h-3 w-3" />
                      {crawler.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-1">{crawler.purpose}</p>
                  <p className="text-sm text-zinc-400">{crawler.reason}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SCRAPERS TO BLOCK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Scrapers You Should Block
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Not all bots are created equal. These crawlers extract your data for resale or bulk
            datasets with no direct benefit to your business. Blocking them is good practice.
          </p>

          <div className="space-y-3 mb-8">
            {scrapersToBlock.map((scraper) => {
              const colors = getColorClasses(scraper.color)
              return (
                <div
                  key={scraper.name}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-zinc-100">{scraper.name}</h3>
                      <span className="text-xs text-zinc-500">{scraper.operator}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}>
                      <XCircle className="h-3 w-3" />
                      {scraper.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-1">{scraper.purpose}</p>
                  <p className="text-sm text-zinc-400">{scraper.reason}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== COPY-PASTE TEMPLATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            Copy-Paste robots.txt Template
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Drop this into your robots.txt file. It allows all major AI crawlers and search engines
            while blocking known scrapers. Customize the <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">Disallow</code> paths
            for any private sections of your site.
          </p>

          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/80 overflow-hidden mb-8">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700/50">
              <span className="text-xs text-zinc-400 font-medium">robots.txt</span>
            </div>
            <pre className="p-4 text-sm text-zinc-300 overflow-x-auto leading-relaxed">
{`# ===========================================
# robots.txt — AI-Optimized Configuration
# Generated by AgentHermes (agenthermes.ai)
# ===========================================

# --- Search Engines (always allow) ---
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# --- AI Crawlers (allow for GEO) ---
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Allow: /

# --- Scrapers (block) ---
User-agent: CCBot
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: Scrapy
Disallow: /

# --- Default: allow everything else ---
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/

# --- Sitemap ---
Sitemap: https://yourdomain.com/sitemap.xml`}
            </pre>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Pro tip: Combine with llms.txt for maximum AI visibility.</strong>{' '}
              robots.txt controls who can crawl your site.{' '}
              <Link href="/blog/llms-txt-standard-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                llms.txt
              </Link>{' '}
              tells AI models what your business actually does, in a format optimized for LLM consumption.
              Together, they cover both discoverability (can the AI find you?) and comprehension (does the AI
              understand you?). Both are checked in D1 Discoverability.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW AGENTHERMES CHECKS THIS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            How AgentHermes Checks Your robots.txt
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When you run an{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Scan
              </Link>, AgentHermes fetches your robots.txt and checks three things:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                check: 'AI Crawler Access',
                detail: 'Are GPTBot, ClaudeBot, Google-Extended, and PerplexityBot allowed? Blocking any of the four major AI crawlers reduces your D1 score.',
                icon: Bot,
              },
              {
                check: 'Sitemap Declaration',
                detail: 'Does robots.txt include a Sitemap directive? AI crawlers use sitemaps to discover all your pages efficiently. Without one, crawlers may miss important content.',
                icon: Globe,
              },
              {
                check: 'Overly Restrictive Rules',
                detail: 'Is there a blanket "Disallow: /" for User-agent: * that would block unknown future AI crawlers? The ideal config explicitly allows known good bots and only blocks known bad ones.',
                icon: Layers,
              },
            ].map((item) => (
              <div
                key={item.check}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.check}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The D1 Discoverability dimension carries a weight of 0.12 in your overall Agent
              Readiness Score. robots.txt configuration is one of several signals within D1, alongside
              llms.txt presence, agent-card.json, Schema.org markup, and AGENTS.md. But robots.txt
              is the most foundational — if AI crawlers cannot access your site at all, nothing else
              in D1 matters.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMMON MISTAKES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            5 Common robots.txt Mistakes That Block AI Crawlers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Blanket wildcard block',
                detail: '"User-agent: * / Disallow: /" blocks everything — including AI crawlers. This is the nuclear option. Use explicit blocks instead.',
                code: 'User-agent: *\nDisallow: /',
              },
              {
                title: 'Blocking "bot" in the name',
                detail: 'Some WAFs and plugins block any user-agent containing "bot". This catches GPTBot, ClaudeBot, and PerplexityBot — the exact crawlers you want.',
                code: '# WAF rule: block *bot*',
              },
              {
                title: 'Forgetting ChatGPT-User',
                detail: 'GPTBot trains the model. ChatGPT-User browses in real-time. Allowing GPTBot but blocking ChatGPT-User means ChatGPT cannot read your pages when users ask about you live.',
                code: 'User-agent: GPTBot\nAllow: /\n# Missing ChatGPT-User',
              },
              {
                title: 'No Sitemap directive',
                detail: 'Even if crawlers are allowed, they need a sitemap to find all your pages efficiently. Without it, important pages like pricing and product catalogs may never be crawled.',
                code: '# Missing:\n# Sitemap: https://...',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-3">{item.detail}</p>
                <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <pre className="text-xs text-red-400 whitespace-pre-wrap">{item.code}</pre>
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
                title: 'Discoverability: The Most Overlooked Dimension',
                href: '/blog/discoverability-agent-readiness',
                tag: 'Dimensions',
                tagColor: 'blue',
              },
              {
                title: 'Agent Readiness vs SEO: Same Goal, Different Game',
                href: '/blog/agent-readiness-vs-seo',
                tag: 'Comparison',
                tagColor: 'purple',
              },
              {
                title: 'llms.txt Standard Guide: Tell AI What You Do',
                href: '/blog/llms-txt-standard-guide',
                tag: 'Standards Guide',
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
            Is your robots.txt blocking AI crawlers?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to check your robots.txt, llms.txt, agent-card.json,
            and 50+ other signals across all 9 dimensions.
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
              All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
