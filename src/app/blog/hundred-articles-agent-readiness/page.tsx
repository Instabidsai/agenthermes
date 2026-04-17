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
  Zap,
  BookOpen,
  Trophy,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'We Published 91 Articles About Agent Readiness — Here Is What We Learned | AgentHermes',
  description:
    'What 91 articles and 500 business scans taught us about agent readiness: every vertical has the same 5 problems, the 9 dimensions are universal, developer tools win by default, and the gap between knowing and doing is massive.',
  keywords: [
    'agent readiness content strategy',
    'agent readiness insights',
    'agent readiness research',
    'AI agent economy data',
    'agent readiness score patterns',
    'business agent readiness lessons',
    'MCP adoption data',
  ],
  openGraph: {
    title: 'We Published 91 Articles About Agent Readiness — Here Is What We Learned',
    description:
      '91 articles. 500 business scans. 50 verticals. Here are the 5 patterns that emerged from the largest agent readiness dataset in existence.',
    url: 'https://agenthermes.ai/blog/hundred-articles-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'We Published 91 Articles About Agent Readiness — Here Is What We Learned',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Published 91 Articles About Agent Readiness — Here Is What We Learned',
    description:
      '91 articles, 500 scans, 50 verticals. The 5 universal patterns of agent readiness.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/hundred-articles-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const milestoneStats = [
  { value: '91', label: 'articles published', icon: BookOpen },
  { value: '500+', label: 'businesses scanned', icon: Search },
  { value: '43', label: 'average score (out of 100)', icon: BarChart3 },
  { value: '50', label: 'verticals analyzed', icon: Layers },
]

const fiveProblems = [
  {
    problem: 'No API',
    detail: 'The most common failure across every vertical. Restaurants, dentists, contractors, law firms, gyms — none expose structured endpoints. Their only "interface" is a phone number and a website designed for human eyeballs.',
    stat: '78% of scanned businesses have zero API endpoints',
  },
  {
    problem: 'No Structured Pricing',
    detail: 'Pricing lives in PDFs, "contact us" forms, or sales calls. An AI agent trying to compare three plumbers cannot get a price from any of them without a phone call. D4 Pricing (0.05 weight) is the lowest-weighted dimension — because almost nobody has it.',
    stat: '91% lack machine-readable pricing',
  },
  {
    problem: 'Phone-Only Operations',
    detail: 'Booking appointments, getting quotes, checking availability, scheduling service — all require a phone call. AI agents cannot make phone calls. Every interaction dead-ends at "call us."',
    stat: '64% of businesses have phone as only contact method',
  },
  {
    problem: 'PDF-Heavy Content',
    detail: 'Menus, catalogs, service lists, insurance forms, compliance documents — all locked in PDFs. AI agents can technically extract text from PDFs, but it is unreliable, slow, and loses all structure. A PDF menu with prices is worth nothing compared to a JSON endpoint.',
    stat: '47% serve critical business data as PDFs',
  },
  {
    problem: 'No Structured Data (Schema.org)',
    detail: 'Schema.org markup (LocalBusiness, Product, Service, FAQ) is the minimum bar for AI discoverability. Most businesses do not have it. Their HTML pages have no semantic markup, no JSON-LD, no microdata. AI crawlers get raw text with zero context.',
    stat: '69% lack any Schema.org markup',
  },
]

const verticalLeaderboard = [
  { vertical: 'Developer Tools', avgScore: 56, top: 'Supabase (69)', bottom: 'Most open-source projects (20-30)' },
  { vertical: 'SaaS / B2B', avgScore: 44, top: 'Stripe (68)', bottom: 'Enterprise SaaS (25-35)' },
  { vertical: 'E-commerce', avgScore: 38, top: 'Shopify stores (45)', bottom: 'WooCommerce stores (30)' },
  { vertical: 'Fintech', avgScore: 35, top: 'Plaid (62)', bottom: 'Regional banks (10-15)' },
  { vertical: 'Healthcare', avgScore: 33, top: 'Telemedicine platforms (40)', bottom: 'Individual practices (5-10)' },
  { vertical: 'Real Estate', avgScore: 28, top: 'Zillow (45)', bottom: 'Individual agents (3-8)' },
  { vertical: 'Restaurants', avgScore: 22, top: 'Chains with APIs (35)', bottom: 'Independent restaurants (0-5)' },
  { vertical: 'Construction', avgScore: 8, top: 'Project management SaaS (30)', bottom: 'Individual contractors (0-3)' },
]

const lessonCards = [
  {
    title: 'The 9 Dimensions Are Universal',
    detail: 'We designed the 9-dimension framework for developer tools. It applies identically to dentists. D2 API Quality matters whether you are Stripe or a pizza shop — the question is whether structured interaction is possible. D7 Security matters whether you handle financial data or appointment bookings. The framework does not need vertical-specific dimensions. It needs vertical-specific weights, which is what our 27 scoring profiles provide.',
    icon: Globe,
    color: 'emerald',
  },
  {
    title: 'Developer Tools Win Because They Build for Machines by Default',
    detail: 'The top 20 Agent Readiness Scores are all developer tools: Supabase (69), Vercel (69), Stripe (68), Slack (68), Resend (75). They score high not because they optimized for agent readiness — but because they build APIs for programs to consume. JSON responses, structured errors, API keys, sandbox environments, OpenAPI specs. Everything an agent needs is a side effect of building for developers.',
    icon: Code2,
    color: 'blue',
  },
  {
    title: 'The Gap Between Knowing and Doing Is Massive',
    detail: 'We wrote 91 articles explaining exactly what to fix. We built a free scanner that shows the exact score and specific improvements. We created the /connect wizard that generates an MCP server in 60 seconds. And yet: the businesses that read our articles still have not scanned themselves. Reading about agent readiness is not the same as doing something about it. The action gap is the real bottleneck.',
    icon: Target,
    color: 'amber',
  },
  {
    title: 'AI Citation Requires Structure, Not Just Content',
    detail: 'We publish these articles partly for SEO and partly for GEO (Generative Engine Optimization) — getting cited by ChatGPT, Claude, and Perplexity when people ask about agent readiness. What we learned: AI models cite pages with first-sentence answers, Schema.org FAQ markup, structured data tables, and definitive claims. Blog posts that meander get ignored. Every article we write now leads with the answer.',
    icon: Bot,
    color: 'purple',
  },
  {
    title: 'One Platform Will Not Fix Everything',
    detail: 'We initially thought AgentHermes could solve agent readiness end-to-end: scan, fix, host. Reality: the businesses that need help most are the ones least likely to use a platform. The dentist who scores 5/100 is not reading blog posts about MCP servers. The real solution is embedding agent readiness into the platforms they already use — Shopify, Squarespace, WordPress, Toast, Calendly. Our adapters for Shopify and WooCommerce are the beginning of that strategy.',
    icon: Network,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why 91 articles specifically?',
    answer:
      'We set a milestone target and hit it. The number is not magic — the coverage is. 91 articles cover every major vertical, every scoring dimension, every protocol (MCP, A2A, x402), executive guides, technical guides, platform comparisons, and case studies. It is the most comprehensive agent readiness resource that exists. We wrote it because nobody else was going to.',
  },
  {
    question: 'What is the single most impactful article for improving my score?',
    answer:
      'Start with "How to Improve Your Agent Readiness Score" (/blog/improve-agent-readiness-score) for the step-by-step playbook. If you are technical, "The Definitive Guide to Structured Error Responses" (/blog/structured-errors-guide) gives you copy-paste code that improves 20% of your score. If you are an executive, read the CTO or CMO guide for your role-specific actions.',
  },
  {
    question: 'How often do you update these articles?',
    answer:
      'As the data changes. We re-scan businesses regularly and update scores, statistics, and recommendations. When new protocols emerge (like x402 for micropayments), we publish new articles and update existing ones. The articles are living documents, not static blog posts.',
  },
  {
    question: 'Will you reach 100 articles?',
    answer:
      'We will pass 100 within weeks. But article count is a vanity metric. What matters is coverage: are there verticals, dimensions, or patterns we have not addressed? As of 91, the major gaps are government procurement, pharmaceutical supply chain, and sports/entertainment ticketing. Those are coming.',
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

export default function HundredArticlesPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'We Published 91 Articles About Agent Readiness — Here Is What We Learned',
    description:
      'What 91 articles and 500 business scans taught us: every vertical has the same 5 problems, the 9 dimensions are universal, developer tools win by default, and the gap between knowing and doing is massive.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/hundred-articles-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Research',
    wordCount: 1800,
    keywords:
      'agent readiness content strategy, agent readiness research, AI agent economy data, agent readiness patterns',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: '91 Articles — What We Learned',
          item: 'https://agenthermes.ai/blog/hundred-articles-agent-readiness',
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
      title="We Published 91 Articles About Agent Readiness — Here Is What We Learned"
      shareUrl="https://agenthermes.ai/blog/hundred-articles-agent-readiness"
      currentHref="/blog/hundred-articles-agent-readiness"
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
            <span className="text-zinc-400">91 Articles — What We Learned</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Trophy className="h-3.5 w-3.5" />
              Milestone
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Research
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            We Published 91 Articles About Agent Readiness —{' '}
            <span className="text-emerald-400">Here Is What We Learned</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            91 articles. 500+ business scans. 50 verticals analyzed. The largest agent readiness dataset in existence — and five patterns that show up in every single vertical, from developer tools to dentists. Here is what the data says.
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
                  13 min read
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
            The Numbers at 91 Articles
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we launched AgentHermes, the concept of &ldquo;agent readiness&rdquo; did not exist as a category. There was no framework for measuring how well a business could interact with AI agents, no benchmark data, and no content explaining what businesses should do. We built the framework, scanned the businesses, and wrote the content. Here is where we stand.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {milestoneStats.map((stat) => (
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The articles span vertical analyses (healthcare, construction, fintech, HR, restaurants, and 45 more), technical deep dives (error handling, caching, CORS, pagination, OAuth), protocol guides (MCP, A2A, x402, agent-card.json, llms.txt), platform comparisons (Shopify vs WooCommerce, Salesforce vs HubSpot), case studies (Stripe, Resend, Slack, GitHub), and executive guides (CTO, CMO). Each one anchors to specific dimensions and real scan data.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LESSON 1: SAME 5 PROBLEMS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Lesson 1: Every Vertical Has the Same Five Problems
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We expected each vertical to have unique challenges. Instead, we found the same five problems in every single one — from{' '}
            <Link href="/blog/construction-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
              construction
            </Link>{' '}
            to{' '}
            <Link href="/blog/fintech-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
              fintech
            </Link>{' '}
            to{' '}
            <Link href="/blog/dental-veterinary-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
              dentists
            </Link>.
          </p>

          <div className="space-y-4 mb-8">
            {fiveProblems.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-zinc-100">{i + 1}. {item.problem}</h3>
                  <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full shrink-0 ml-4">{item.stat}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The implication:</strong> You do not need a vertical-specific solution. You need a horizontal platform that solves these five problems for any business type. That is exactly what AgentHermes builds: structured endpoints, machine-readable pricing, booking APIs, JSON data, and Schema.org markup — auto-generated for 15 verticals and counting.
            </p>
          </div>
        </div>
      </section>

      {/* ===== VERTICAL LEADERBOARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Vertical Leaderboard: Who Scores Highest and Lowest
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            After scanning 500+ businesses, here is how verticals rank by average Agent Readiness Score. The spread is enormous: developer tools average 56 while construction averages 8. View the full interactive{' '}
            <Link href="/blog/agent-readiness-leaderboard" className="text-emerald-400 hover:text-emerald-300 underline">
              leaderboard
            </Link>.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Vertical</div>
              <div className="text-center">Avg Score</div>
              <div>Top Scorer</div>
              <div>Bottom</div>
            </div>
            {verticalLeaderboard.map((row, i) => (
              <div
                key={row.vertical}
                className={`grid grid-cols-4 p-4 text-sm items-center ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.vertical}</div>
                <div className="text-center text-emerald-400 font-bold">{row.avgScore}</div>
                <div className="text-zinc-400 text-xs">{row.top}</div>
                <div className="text-zinc-500 text-xs">{row.bottom}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5 LESSONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-500" />
            Five Lessons from 91 Articles and 500 Scans
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Beyond the data, five strategic lessons emerged that shape everything we build next.
          </p>

          <div className="space-y-4 mb-8">
            {lessonCards.map((card) => {
              const colors = getColorClasses(card.color)
              return (
                <div
                  key={card.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <card.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{card.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{card.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT IS NEXT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Comes After 91
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We are not stopping at 91. The next wave of content targets the verticals we have not covered in depth: government procurement, pharmaceutical supply chain, sports and entertainment ticketing, legal services, and maritime logistics. Each one will follow the same pattern — scan real businesses, extract real data, and publish the findings with actionable fixes.
            </p>
            <p>
              But the bigger shift is from content to tooling. We wrote the guide. Now we need more businesses to actually scan themselves and act on the results. The{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                free audit tool
              </Link>{' '}
              takes 60 seconds. The{' '}
              <Link href="/connect" className="text-emerald-400 hover:text-emerald-300 underline">
                connect wizard
              </Link>{' '}
              generates an MCP server in under 5 minutes. The infrastructure exists. The gap is adoption.
            </p>
            <p>
              If you have read this far, you know more about agent readiness than 99.9% of business operators. The question is whether you will do something about it. We wrote the guide. Now{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                scan your business
              </Link>.
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
                title: 'Agent Readiness Leaderboard: Top Scoring Businesses',
                href: '/blog/agent-readiness-leaderboard',
                tag: 'Leaderboard',
                tagColor: 'amber',
              },
              {
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
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
            We wrote the guide. Now scan your business.
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See how you compare across all 9 dimensions — and get the specific fixes to improve.
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
              Read All 91 Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
