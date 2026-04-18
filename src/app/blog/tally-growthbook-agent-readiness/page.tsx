import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Tally and Growthbook Both Score 64-65: The Developer Tool Silver Plateau | AgentHermes',
  description:
    'Dual case study: Tally scores 65, Growthbook scores 64. The Silver Plateau is where good developer tools get stuck. Both have clean APIs, self-service onboarding, and good docs. Both lack agent-card.json, MCP, and llms.txt. The same 3 files separate every Silver from Gold.',
  keywords: [
    'Tally Growthbook agent readiness developer tools',
    'developer tool agent readiness',
    'Silver Plateau agent score',
    'Tally agent readiness score',
    'Growthbook agent readiness',
    'agent-card.json MCP llms.txt',
    'developer tools AI agents',
    'Silver to Gold agent readiness',
    'agent readiness plateau',
  ],
  openGraph: {
    title: 'Why Tally and Growthbook Both Score 64-65: The Developer Tool Silver Plateau',
    description:
      'Dual case study: Tally 65, Growthbook 64. The Silver Plateau — where good developer tools hit a ceiling without agent-native features. Three files break through.',
    url: 'https://agenthermes.ai/blog/tally-growthbook-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tally and Growthbook Agent Readiness: The Silver Plateau',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tally 65, Growthbook 64: The Silver Plateau in Developer Tools',
    description:
      'Good APIs, good docs, good onboarding — and stuck at Silver. Three files separate every Silver from Gold in the agent economy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/tally-growthbook-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tallyScores = [
  { dimension: 'D1 Discovery', score: 72, note: 'Strong SEO, good structured data, no agent-card.json' },
  { dimension: 'D2 API Quality', score: 78, note: 'Clean REST API with OpenAPI docs' },
  { dimension: 'D3 Onboarding', score: 82, note: 'Self-service signup, API keys in dashboard, sandbox' },
  { dimension: 'D4 Pricing', score: 70, note: 'Transparent pricing page with clear tiers' },
  { dimension: 'D5 Payment', score: 55, note: 'Stripe integration but no agent-accessible billing API' },
  { dimension: 'D6 Data Quality', score: 68, note: 'Good JSON responses, consistent schemas' },
  { dimension: 'D7 Security', score: 72, note: 'HTTPS, API key auth, rate limiting' },
  { dimension: 'D8 Reliability', score: 60, note: 'Status page exists, no cache headers on API' },
  { dimension: 'D9 Agent Experience', score: 18, note: 'No agent-card.json, no MCP, no llms.txt' },
]

const growthbookScores = [
  { dimension: 'D1 Discovery', score: 70, note: 'Good docs site, GitHub presence, no agent-card.json' },
  { dimension: 'D2 API Quality', score: 75, note: 'REST API with SDK wrappers, OpenAPI spec' },
  { dimension: 'D3 Onboarding', score: 80, note: 'Open source self-host or cloud. Quick start guide.' },
  { dimension: 'D4 Pricing', score: 68, note: 'Free tier + transparent cloud pricing' },
  { dimension: 'D5 Payment', score: 50, note: 'Cloud billing but no programmatic access' },
  { dimension: 'D6 Data Quality', score: 70, note: 'Structured feature flag and experiment data' },
  { dimension: 'D7 Security', score: 74, note: 'HTTPS, SDK key auth, environment separation' },
  { dimension: 'D8 Reliability', score: 58, note: 'CDN for SDK payload delivery, limited API cache headers' },
  { dimension: 'D9 Agent Experience', score: 15, note: 'No agent-card.json, no MCP, no llms.txt' },
]

const sharedStrengths = [
  {
    strength: 'Clean REST APIs',
    detail: 'Both have well-designed REST APIs with consistent URL patterns, proper HTTP methods, and structured JSON responses. This is the foundation that gets them to Silver.',
    impact: 'D2 API Quality: 75-78',
    color: 'emerald',
  },
  {
    strength: 'Self-Service Onboarding',
    detail: 'Sign up, get API keys, start building — no sales call required. Both offer free tiers with generous limits. Documentation is comprehensive and example-rich.',
    impact: 'D3 Onboarding: 80-82',
    color: 'blue',
  },
  {
    strength: 'Good Documentation',
    detail: 'Both maintain dedicated docs sites with guides, API reference, and code examples. Growthbook has the additional advantage of open-source documentation on GitHub.',
    impact: 'D1 Discovery: 70-72',
    color: 'purple',
  },
  {
    strength: 'Transparent Pricing',
    detail: 'Clear pricing pages with feature comparison tables. Free tiers that let developers evaluate without commitment. No "contact sales" gates on standard plans.',
    impact: 'D4 Pricing: 68-70',
    color: 'cyan',
  },
]

const sharedGaps = [
  {
    gap: 'No agent-card.json',
    detail: 'Neither has a /.well-known/agent-card.json file. AI agents discovering tools have no structured way to understand what Tally or Growthbook offers or how to interact with their APIs.',
    fix: 'Add a 20-line JSON file at /.well-known/agent-card.json describing capabilities, auth, and endpoints.',
    scoreImpact: '+8-12 points',
    color: 'red',
  },
  {
    gap: 'No MCP Server',
    detail: 'Neither offers an MCP server. Agents must manually construct API calls from documentation rather than discovering and calling tools through a standard protocol.',
    fix: 'Wrap existing API endpoints as MCP tools. Tally: create_form, get_submissions. Growthbook: get_features, create_experiment.',
    scoreImpact: '+10-15 points',
    color: 'red',
  },
  {
    gap: 'No llms.txt',
    detail: 'Neither has a /llms.txt file explaining their capabilities in natural language. LLMs building integrations have to parse HTML docs rather than reading a purpose-built machine context file.',
    fix: 'Add a text file at /llms.txt describing the product, API capabilities, and common use cases in plain English.',
    scoreImpact: '+5-8 points',
    color: 'amber',
  },
]

const breakoutPath = [
  {
    step: '1',
    title: 'Add agent-card.json (30 minutes)',
    detail: 'Create /.well-known/agent-card.json with product description, API endpoints, auth method, and capability list. This is the minimum viable agent discovery file.',
    icon: FileJson,
    impact: '+8-12 points → Score: 72-77',
  },
  {
    step: '2',
    title: 'Add llms.txt (1 hour)',
    detail: 'Create /llms.txt explaining your product, API capabilities, authentication, and common integration patterns in plain English. LLMs read this when building integrations.',
    icon: Globe,
    impact: '+5-8 points → Score: 77-85',
  },
  {
    step: '3',
    title: 'Ship an MCP Server (1-2 days)',
    detail: 'Wrap your top 5 API endpoints as MCP tools. For Tally: create_form, list_forms, get_submissions, create_webhook, get_form. For Growthbook: list_features, get_feature, create_experiment, get_results, toggle_feature.',
    icon: Server,
    impact: '+10-15 points → Score: 87-100 (Gold/Platinum)',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do so many developer tools score in the 60-65 range?',
    answer:
      'Because 60-65 is the natural ceiling for a well-built API without agent-native features. Good REST API, good docs, self-service onboarding, and transparent pricing get you to Silver every time. But Silver is not Gold. The gap between 65 and 80 is entirely about agent-native protocols — agent-card.json, MCP, llms.txt — that tell AI agents how to discover and use your tool. These protocols did not exist when most developer tools were designed, so even excellent tools hit the same ceiling.',
  },
  {
    question: 'Is the Silver Plateau specific to developer tools?',
    answer:
      'No, but developer tools are the most common category to hit it. Other API-first businesses like payment processors, communication platforms, and data services also land in the 60-65 range if they have good APIs but no agent-native features. Local businesses, by contrast, rarely reach Silver at all because they lack APIs entirely. The Silver Plateau is specifically the ceiling for API-first products that have not adopted agent-native protocols.',
  },
  {
    question: 'How is this different from the analysis in your developer tools article?',
    answer:
      'The developer tools article covers the category broadly. This case study focuses on why two specific tools — Tally and Growthbook — land at nearly identical scores despite being in different subcategories (form builder vs feature flags). The identical score pattern reveals that the ceiling is structural, not product-specific. The same 3 gaps limit every developer tool in the category.',
  },
  {
    question: 'Can a developer tool reach Platinum (90+) today?',
    answer:
      'Yes. A developer tool with a clean API, comprehensive docs, self-service onboarding, transparent pricing, agent-card.json, llms.txt, and a published MCP server will score 90+. Stripe and Supabase are approaching this level. The path from Silver to Platinum is well-defined and takes days, not months — the hard part (building a good API) is already done.',
  },
  {
    question: 'Why does agent-card.json matter more than better documentation?',
    answer:
      'Documentation is for humans. agent-card.json is for agents. An AI agent trying to discover whether your tool can help with a task does not read your docs site — it checks for structured discovery files. Think of agent-card.json as the robots.txt of the agent economy: a small file that has outsized impact on discoverability. Better documentation improves D1 and D3 by a few points. agent-card.json can add 12 points to D9 alone.',
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

export default function TallyGrowthbookAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Tally and Growthbook Both Score 64-65: The Developer Tool Silver Plateau',
    description:
      'Dual case study: Tally 65, Growthbook 64. The Silver Plateau is the natural ceiling for developer tools without agent-native features. Three files break through: agent-card.json, MCP, llms.txt.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/tally-growthbook-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1900,
    keywords:
      'Tally Growthbook agent readiness, developer tools Silver Plateau, agent-card.json MCP llms.txt, developer tool AI agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Tally and Growthbook Agent Readiness',
          item: 'https://agenthermes.ai/blog/tally-growthbook-agent-readiness',
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
      title="Why Tally and Growthbook Both Score 64-65: The Developer Tool Silver Plateau"
      shareUrl="https://agenthermes.ai/blog/tally-growthbook-agent-readiness"
      currentHref="/blog/tally-growthbook-agent-readiness"
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
            <span className="text-zinc-400">Tally and Growthbook Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <BarChart3 className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Silver Plateau
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Tally and Growthbook Both Score 64-65:{' '}
            <span className="text-emerald-400">The Developer Tool Silver Plateau</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Tally builds forms. Growthbook manages feature flags. Different products, different markets,
            different codebases. Yet they score within one point of each other on agent readiness:{' '}
            <strong className="text-zinc-100">Tally at 65, Growthbook at 64</strong>. This is not a
            coincidence. It is a pattern we see across every well-built developer tool that has not
            adopted agent-native features. We call it the <strong className="text-amber-400">Silver
            Plateau</strong> — the ceiling where good APIs get stuck without three specific files.
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

      {/* ===== THE SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Score Comparison: Two Products, One Ceiling
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The side-by-side scores tell the story. Both tools excel at the fundamentals — API quality,
              onboarding, documentation, pricing — and both collapse at D9 Agent Experience. The pattern is
              so consistent that you could predict the total score from D9 alone: if D9 is under 20, the
              tool scores Silver regardless of how good everything else is.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Tally Scores */}
            <div className="rounded-xl border border-zinc-800/80 overflow-hidden">
              <div className="bg-zinc-800/50 p-4 text-center">
                <h3 className="text-lg font-bold text-zinc-100">Tally</h3>
                <div className="text-3xl font-bold text-amber-400 mt-1">65</div>
                <div className="text-xs text-zinc-500">Silver Tier</div>
              </div>
              {tallyScores.map((row, i) => (
                <div
                  key={row.dimension}
                  className={`grid grid-cols-[1fr_50px] p-3 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div>
                    <span className="font-medium text-zinc-300 text-xs">{row.dimension}</span>
                    <span className="text-zinc-600 text-xs ml-2">{row.note}</span>
                  </div>
                  <div className={`text-center font-bold text-xs ${row.score >= 70 ? 'text-emerald-400' : row.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                    {row.score}
                  </div>
                </div>
              ))}
            </div>

            {/* Growthbook Scores */}
            <div className="rounded-xl border border-zinc-800/80 overflow-hidden">
              <div className="bg-zinc-800/50 p-4 text-center">
                <h3 className="text-lg font-bold text-zinc-100">Growthbook</h3>
                <div className="text-3xl font-bold text-amber-400 mt-1">64</div>
                <div className="text-xs text-zinc-500">Silver Tier</div>
              </div>
              {growthbookScores.map((row, i) => (
                <div
                  key={row.dimension}
                  className={`grid grid-cols-[1fr_50px] p-3 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div>
                    <span className="font-medium text-zinc-300 text-xs">{row.dimension}</span>
                    <span className="text-zinc-600 text-xs ml-2">{row.note}</span>
                  </div>
                  <div className={`text-center font-bold text-xs ${row.score >= 70 ? 'text-emerald-400' : row.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                    {row.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The pattern:</strong> D1 through D8 are strong for both.
              D9 Agent Experience is catastrophically low — 18 and 15 respectively. This single dimension
              drags the entire score from Gold territory (75+) down to Silver (60-74). The Silver Plateau
              is, fundamentally, a D9 problem.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT THEY SHARE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            What Both Tools Get Right
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are not bad products with low scores. These are{' '}
            <strong className="text-zinc-300">excellent products</strong> that happen to be missing the
            agent-native layer. Understanding what they do well clarifies why the ceiling exists — and how
            close they are to breaking through.
          </p>

          <div className="space-y-4 mb-8">
            {sharedStrengths.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.strength}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-zinc-100">{item.strength}</h3>
                    <span className={`text-xs font-bold ${colors.text}`}>{item.impact}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              This profile — strong API, strong docs, strong onboarding, weak agent-native protocols — is
              the defining characteristic of the Silver Plateau. It describes not just Tally and Growthbook but
              dozens of{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                developer tools we have scanned
              </Link>. The tools are built for human developers, not AI agents. That was the right strategy
              in 2023. In 2026, it is leaving points on the table.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE THREE GAPS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            The Three Gaps That Define the Ceiling
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The Silver Plateau is not a vague problem — it is three specific missing files. Every
            developer tool stuck at 60-65 is missing the same three things. Fix them and the score
            jumps 25-35 points.
          </p>

          <div className="space-y-4 mb-8">
            {sharedGaps.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.gap}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-lg font-bold ${colors.text}`}>{item.gap}</h3>
                    <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
                      {item.scoreImpact}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.detail}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-emerald-400 font-medium">Fix:</span> {item.fix}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              This is the insight that makes the Silver Plateau actionable: the gap is not about better
              documentation, faster APIs, or more features. It is about three files that did not exist when
              these products were designed. Adding them is a weekend project for a single developer.
              The{' '}
              <Link href="/blog/craft-agent-readiness-breakdown" className="text-emerald-400 hover:text-emerald-300 underline">
                Craft case study
              </Link>{' '}
              showed the same pattern — excellent product, missing agent layer.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE BREAKOUT PATH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Three-Step Breakout: Silver to Gold in a Weekend
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The{' '}
            <Link href="/blog/silver-to-gold-guide" className="text-emerald-400 hover:text-emerald-300 underline">
              Silver to Gold guide
            </Link>{' '}
            covers this in detail, but here is the specific playbook for developer tools like Tally and
            Growthbook. The hard work — building a quality API — is already done. Breaking through
            the plateau requires adding the agent-native discovery layer on top.
          </p>

          <div className="space-y-3 mb-8">
            {breakoutPath.map((item) => (
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
                  <p className="text-sm text-zinc-500 leading-relaxed mb-2">{item.detail}</p>
                  <p className="text-xs text-emerald-400 font-medium">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Total time: 2-3 days.</strong> Total score impact: +23-35
              points. A developer tool at 64 becomes a developer tool at 87-99. That is the difference between
              Silver (good product, invisible to agents) and Gold or Platinum (agents discover, understand,
              and integrate your tool automatically). The ratio of effort to impact is unmatched anywhere else
              in the scoring framework.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Why the Silver Plateau Matters for All Developer Tools
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Tally and Growthbook are representative examples, not outliers. When agents build
              integrations — connecting tools together to complete multi-step workflows — they reach for
              tools they can discover and use through standard protocols. An MCP-native form builder gets
              chosen over a non-MCP form builder even if the non-MCP one is technically better.
            </p>
            <p>
              This is the same dynamic that played out with REST APIs in the 2010s. The best API won more
              integrations than the best product without an API. Now the best MCP server wins more agent
              integrations than the best API without an MCP server. The tools that break through the
              Silver Plateau first establish themselves as the default in their category for agent workflows.
            </p>
            <p>
              The window is narrow. When the first form builder ships an MCP server, every agent that needs
              form creation will use it — not because it is the best form builder, but because it is the only
              one agents can use natively. This is a winner-take-most dynamic within each category, and the
              developer tool space is about to see it play out across dozens of categories simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '64-65', label: 'Silver Plateau score range', icon: Award },
              { value: '3', label: 'files to break through', icon: FileJson },
              { value: '2-3d', label: 'development time', icon: Code2 },
              { value: '+35', label: 'max score improvement', icon: TrendingUp },
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
                title: 'Developer Tools Agent Readiness Analysis',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Category Analysis',
                tagColor: 'cyan',
              },
              {
                title: 'Silver to Gold Guide: Breaking Through the Plateau',
                href: '/blog/silver-to-gold-guide',
                tag: 'Playbook',
                tagColor: 'emerald',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
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
            Are you stuck at the Silver Plateau?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Scan your developer tool and see exactly where you score. If you are in the 60-65 range,
            the breakout path is three files away.
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
              Break Through the Plateau
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
