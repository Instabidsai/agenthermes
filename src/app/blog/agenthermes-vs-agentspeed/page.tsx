import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  Globe,
  HelpCircle,
  Layers,
  Scale,
  Search,
  Server,
  Shield,
  Target,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'AgentHermes vs AgentSpeed: Weighted Scoring vs Category-Based Agent Readiness Assessment | AgentHermes',
  description:
    'A transparent comparison of AgentHermes and AgentSpeed, two agent readiness scoring platforms. Both use weighted scores. AgentSpeed runs 10 checks. AgentHermes runs 9 dimensions with sub-signals, vertical profiles, and 500+ businesses scanned.',
  keywords: [
    'AgentHermes vs AgentSpeed comparison',
    'AgentHermes vs AgentSpeed',
    'agent readiness comparison',
    'AgentSpeed review',
    'agent readiness scoring tools',
    'AI agent readiness platforms',
    'agent readiness score comparison',
    'weighted agent scoring',
  ],
  openGraph: {
    title: 'AgentHermes vs AgentSpeed: Weighted Scoring vs Category-Based Agent Readiness Assessment',
    description:
      'Two agent readiness platforms, two methodologies. A transparent comparison of features, scoring, and approach.',
    url: 'https://agenthermes.ai/blog/agenthermes-vs-agentspeed',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentHermes vs AgentSpeed Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentHermes vs AgentSpeed: Scanner Comparison',
    description:
      'Two agent readiness platforms, two scoring approaches. A transparent comparison.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agenthermes-vs-agentspeed',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  {
    category: 'Scoring Methodology',
    agentHermes: '9 weighted dimensions (D1-D9) with sub-signals, tiered output (Platinum/Gold/Silver/Bronze)',
    agentSpeed: '0-100 weighted score across 10 checks, transparent blog explaining methodology',
    verdict: 'Both use weighted numeric scores — AgentHermes has more dimensions, AgentSpeed is more focused',
  },
  {
    category: 'Number of Checks',
    agentHermes: '9 dimensions with multiple sub-signals per dimension (27+ individual signals)',
    agentSpeed: '10 specific checks covering core agent integration points',
    verdict: 'AgentHermes is broader; AgentSpeed is more targeted and easier to understand',
  },
  {
    category: 'Vertical Profiles',
    agentHermes: '27 vertical-specific scoring profiles that adjust dimension weights per industry',
    agentSpeed: 'Uniform scoring across all business types',
    verdict: 'AgentHermes advantage — a restaurant and a SaaS API have different agent readiness needs',
  },
  {
    category: 'Businesses Scanned',
    agentHermes: '500+ businesses scanned with published results and leaderboard',
    agentSpeed: 'Newer entrant — building scan database',
    verdict: 'AgentHermes has a larger dataset; both are growing',
  },
  {
    category: 'Auth-Aware Scoring',
    agentHermes: 'Detects 401 responses with JSON body and scores at 87% of full marks (auth-aware adjustment)',
    agentSpeed: 'Checks for authentication presence as one of 10 signals',
    verdict: 'AgentHermes handles auth-protected APIs more nuancedly',
  },
  {
    category: 'MCP Generation',
    agentHermes: 'Auto-generates hosted MCP servers with vertical-specific tools, agent-card.json, and llms.txt',
    agentSpeed: 'Focuses on assessment — points you to fixes without auto-generating infrastructure',
    verdict: 'AgentHermes is score + fix; AgentSpeed is score + recommend',
  },
  {
    category: 'Protocol Detection',
    agentHermes: 'MCP, A2A, agent-card.json, llms.txt, AGENTS.md, UCP, ACP, x402, OpenAPI, platform adapters (Shopify/WooCommerce/Square)',
    agentSpeed: 'Core protocol checks (MCP, OpenAPI, structured data)',
    verdict: 'AgentHermes detects more protocols and platforms',
  },
  {
    category: 'Transparency',
    agentHermes: 'Published methodology at /methodology, open scoring weights, dimension breakdowns on every report',
    agentSpeed: 'Transparent methodology blog explaining how each check contributes to the score',
    verdict: 'Both are transparent — refreshing in a space where most tools are black boxes',
  },
]

const strengthsAgentHermes = [
  {
    strength: 'Depth of Analysis',
    detail: '9 dimensions with sub-signals means the score captures nuance. A business with great API quality but terrible discovery gets a different score than one with great discovery but no API. The 27 vertical profiles ensure that a local bakery is judged differently than an enterprise SaaS.',
  },
  {
    strength: 'Infrastructure Generation',
    detail: 'AgentHermes does not just tell you what is wrong — it builds the fix. Auto-generated MCP servers, agent-card.json files, llms.txt, and registry listings. A business goes from Not Scored to agent-accessible in under 5 minutes.',
  },
  {
    strength: 'Scale of Data',
    detail: '500+ businesses scanned with published results. The leaderboard shows where industry leaders actually stand. This data backs every recommendation with empirical evidence, not theory.',
  },
  {
    strength: 'Platform Detection',
    detail: 'E-commerce adapters for Shopify, WooCommerce, and Square mean AgentHermes understands that a Shopify store already has certain API capabilities and scores accordingly. A WooCommerce site gets credit for its REST API even if it does not know it has one.',
  },
]

const strengthsAgentSpeed = [
  {
    strength: 'Simplicity',
    detail: '10 checks are easier to understand and act on than 27+ sub-signals across 9 dimensions. A developer can read AgentSpeed results and know exactly what to fix. Less cognitive overhead, faster path to improvement.',
  },
  {
    strength: 'Focused Scope',
    detail: 'By checking fewer things more deeply, AgentSpeed avoids the trap of measuring signals that do not matter for a specific business. If your platform only needs 5 things to be agent-ready, a 10-check system that covers those 5 is more useful than a 27-signal system where 22 signals are irrelevant.',
  },
  {
    strength: 'Methodology Transparency',
    detail: 'AgentSpeed publishes a clear blog explaining how the 10 checks map to the score. This is valuable for the ecosystem — it contributes to the conversation about what "agent-ready" actually means and makes the space more rigorous.',
  },
  {
    strength: 'Fresh Perspective',
    detail: 'As a newer entrant, AgentSpeed brings a different philosophical approach to scoring. Competition and diversity of methods make the entire agent readiness space stronger. Different tools catching different issues means better coverage for businesses that use both.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Should I use AgentHermes or AgentSpeed?',
    answer:
      'Use both. These tools have different methodologies and will catch different issues. AgentHermes provides deeper analysis with 9 dimensions and vertical-specific profiles plus auto-generated infrastructure. AgentSpeed provides a simpler, more focused assessment. Running both gives you the most comprehensive view of your agent readiness. The market is new — more assessment tools means better outcomes for businesses.',
  },
  {
    question: 'Why do AgentHermes and AgentSpeed give different scores for the same business?',
    answer:
      'Different methodologies weight different things. AgentHermes uses 9 dimensions with sub-signals and vertical-adjusted weights. AgentSpeed uses 10 checks with its own weighting. A business with excellent API documentation but no MCP server might score higher on one platform than the other depending on how heavily each weights documentation vs protocol adoption. Both scores are valid — they measure different aspects of readiness.',
  },
  {
    question: 'Is AgentSpeed a competitor?',
    answer:
      'In the same way that Moz and Ahrefs are competitors in SEO: they offer overlapping capabilities but the market is large enough for both (and more). Agent readiness assessment is a new category. Every tool that enters the space grows awareness and demand. We would rather have 10 competitors in a thriving market than be the only scanner in a market nobody cares about.',
  },
  {
    question: 'What is the biggest difference between the two platforms?',
    answer:
      'The biggest difference is scope. AgentSpeed focuses on assessment — it tells you your score and what to fix. AgentHermes provides assessment plus infrastructure — it scores you, then auto-generates an MCP server, agent-card.json, llms.txt, and registry listing. If you just want a score, either works. If you want the score plus the fix, AgentHermes handles both.',
  },
  {
    question: 'How do I compare my scores across the two platforms?',
    answer:
      'Do not average the scores or try to create a unified number. Instead, treat each score as a perspective. If both platforms flag the same issue (e.g., no MCP server), that is a high-confidence finding. If one platform flags something the other misses, investigate that specific signal. The union of both assessments gives you the most complete picture.',
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

export default function AgentHermesVsAgentSpeedPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AgentHermes vs AgentSpeed: Weighted Scoring vs Category-Based Agent Readiness Assessment',
    description:
      'A transparent comparison of AgentHermes and AgentSpeed, two agent readiness scoring platforms. Both use weighted scores. Different depths, different strengths.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agenthermes-vs-agentspeed',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Comparison',
    wordCount: 1800,
    keywords:
      'AgentHermes vs AgentSpeed comparison, agent readiness scoring tools, agent readiness platforms',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'AgentHermes vs AgentSpeed',
          item: 'https://agenthermes.ai/blog/agenthermes-vs-agentspeed',
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
      title="AgentHermes vs AgentSpeed: Weighted Scoring vs Category-Based Agent Readiness Assessment"
      shareUrl="https://agenthermes.ai/blog/agenthermes-vs-agentspeed"
      currentHref="/blog/agenthermes-vs-agentspeed"
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
            <span className="text-zinc-400">AgentHermes vs AgentSpeed</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Scale className="h-3.5 w-3.5" />
              Comparison
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Competitor Analysis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            AgentHermes vs AgentSpeed:{' '}
            <span className="text-emerald-400">Weighted Scoring vs Category-Based Agent Readiness Assessment</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Two platforms measuring agent readiness. Both use weighted numeric scores. Both are
            transparent about methodology. AgentSpeed runs 10 focused checks. AgentHermes runs
            9 dimensions with sub-signals, vertical profiles, and 500+ scanned businesses. The
            market is new, wide open, and better served by multiple tools than one. Here is an
            honest comparison.
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

      {/* ===== WHY THIS COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            Why We Write Competitor Comparisons
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              This is our second competitor comparison article, following our{' '}
              <Link href="/blog/competitor-comparison-isagentready" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes vs IsAgentReady analysis
              </Link>. We write these because we believe transparency serves businesses better
              than marketing. If someone is evaluating agent readiness tools, they should understand
              the real differences — not just our sales pitch.
            </p>
            <p>
              Agent readiness scoring is a new category. There is no established standard yet, no
              industry consensus on what dimensions matter most, and no single tool that covers
              everything. Multiple tools with different methodologies means businesses get a more
              complete picture. We benefit from a healthy competitive landscape because it validates
              the category and grows the total addressable market.
            </p>
            <p>
              We have scanned AgentSpeed&apos;s publicly available methodology and product
              information. This comparison reflects what we can observe from their published
              materials. If any detail is inaccurate, we will update this article.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Feature-by-Feature Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Both platforms aim to help businesses become agent-ready. They approach the problem
            differently, which means they catch different things.
          </p>

          <div className="space-y-4 mb-8">
            {comparisonRows.map((row) => (
              <div
                key={row.category}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-3 text-sm">{row.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs font-medium text-emerald-400 mb-1">AgentHermes</div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{row.agentHermes}</p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-blue-400 mb-1">AgentSpeed</div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{row.agentSpeed}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <p className="text-xs text-zinc-500">
                    <span className="text-zinc-400 font-medium">Verdict:</span>{' '}
                    {row.verdict}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGENTHERMES STRENGTHS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Where AgentHermes Is Stronger
          </h2>
          <div className="space-y-4 mb-8">
            {strengthsAgentHermes.map((item) => (
              <div
                key={item.strength}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-bold text-zinc-100 text-sm">{item.strength}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGENTSPEED STRENGTHS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Where AgentSpeed Is Stronger
          </h2>
          <div className="space-y-4 mb-8">
            {strengthsAgentSpeed.map((item) => (
              <div
                key={item.strength}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  <h3 className="font-bold text-zinc-100 text-sm">{item.strength}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHARED OBSERVATIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            What Both Platforms Get Right
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Both AgentHermes and AgentSpeed use weighted numeric scores rather than subjective
              assessments. This matters because it makes agent readiness measurable and trackable
              over time. A business can run both tools, implement improvements, and see the score
              change. That feedback loop is what drives actual adoption of agent-ready practices.
            </p>
            <p>
              Both platforms are transparent about methodology. AgentSpeed publishes blog posts
              explaining how their 10 checks contribute to the score. AgentHermes publishes
              dimension weights, scoring caps, and vertical adjustment profiles at{' '}
              <Link href="/methodology" className="text-emerald-400 hover:text-emerald-300 underline">
                /methodology
              </Link>. This transparency is rare in scoring tools and raises the bar for the
              entire category.
            </p>
            <p>
              Both are new. Agent readiness scoring did not exist as a category 12 months ago.
              Every tool in this space is iterating rapidly, adding checks, refining weights,
              and learning from real scan data. The scoring methodologies will converge over time
              as the industry develops consensus on what matters. Right now, diversity of approach
              is a feature, not a bug.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '500+', label: 'businesses scanned (AgentHermes)', icon: Database },
              { value: '43', label: 'average score across all scans', icon: BarChart3 },
              { value: '2', label: 'transparent agent readiness tools exist', icon: Search },
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

      {/* ===== WHEN TO USE WHICH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            When to Use Each Platform
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              <strong className="text-zinc-100">Use AgentHermes when:</strong> You need deep analysis
              with vertical-specific scoring, you want auto-generated MCP infrastructure (not just a
              score), you are in an industry where the standard checks do not capture your unique
              agent readiness challenges (restaurants, healthcare, local services), or you want to
              benchmark against 500+ other businesses.
            </p>
            <p>
              <strong className="text-zinc-100">Use AgentSpeed when:</strong> You want a fast,
              focused assessment with clear actionable items, you are a developer who prefers a
              concise 10-check format, or you want a second opinion on your AgentHermes score to
              validate findings from a different perspective.
            </p>
            <p>
              <strong className="text-zinc-100">Use both when:</strong> You are serious about agent
              readiness and want the most comprehensive assessment available. Different methodologies
              catch different issues. The union of both scans gives you complete coverage. If both
              tools flag the same problem, that is a high-confidence finding you should fix first.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Our honest recommendation:</strong> Run both.
              Neither AgentHermes nor AgentSpeed claims to be the only tool you need. The agent
              readiness space is too new for any single platform to have perfect coverage. Use
              AgentHermes for depth and infrastructure generation. Use AgentSpeed for focused
              validation. The businesses that take agent readiness seriously will use every tool
              available — the same way serious SEO practitioners use Ahrefs, Moz, and Screaming
              Frog together.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE BIGGER PICTURE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            The Bigger Picture: Agent Readiness as a Category
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we published our first{' '}
              <Link href="/blog/competitor-comparison-isagentready" className="text-emerald-400 hover:text-emerald-300 underline">
                competitor comparison with IsAgentReady
              </Link>, we noted that three tools existing in the agent readiness space validates the
              category. With AgentSpeed, we now have multiple approaches to the same problem. This
              is healthy.
            </p>
            <p>
              The SEO industry has hundreds of tools: Ahrefs, Moz, SEMrush, Screaming Frog, Sitebulb,
              Google Search Console. Each measures different aspects of search readiness. Some focus on
              backlinks, some on technical SEO, some on content quality. Together, they created a
              multi-billion dollar industry around a concept (search readiness) that did not exist
              30 years ago.
            </p>
            <p>
              Agent readiness is on the same trajectory. Today there are a handful of tools.
              Within two years there will be dozens. Within five years, &ldquo;agent readiness
              score&rdquo; will be as commonly tracked as &ldquo;domain authority.&rdquo; Businesses
              that start measuring and improving now will have a compounding advantage over those
              that wait for the category to mature.
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
                title: 'AgentHermes vs IsAgentReady: First Competitor Comparison',
                href: '/blog/competitor-comparison-isagentready',
                tag: 'Comparison',
                tagColor: 'cyan',
              },
              {
                title: 'Our Scoring Methodology Explained',
                href: '/blog/methodology',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
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
            See how your business scores
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free scan across all 9 dimensions. See your score, get actionable recommendations,
            and auto-generate your agent infrastructure in under 5 minutes.
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
