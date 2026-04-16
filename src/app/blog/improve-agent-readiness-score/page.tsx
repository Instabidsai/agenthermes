import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'How to Improve Your Agent Readiness Score: A Step-by-Step Guide | AgentHermes',
  description:
    'A practical guide to improving your Agent Readiness Score across all 9 dimensions. Real examples, actionable steps, and the exact playbook that moved companies from Bronze to Silver.',
  openGraph: {
    title: 'How to Improve Your Agent Readiness Score: A Step-by-Step Guide',
    description:
      'A practical guide to improving your Agent Readiness Score across all 9 dimensions. Real examples, actionable steps, and the exact playbook that moved companies from Bronze to Silver.',
    url: 'https://agenthermes.ai/blog/improve-agent-readiness-score',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How to Improve Your Agent Readiness Score — AgentHermes Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Improve Your Agent Readiness Score: A Step-by-Step Guide',
    description:
      'A practical guide to improving your Agent Readiness Score across all 9 dimensions. Real examples, actionable steps, and the exact playbook that moved companies from Bronze to Silver.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/improve-agent-readiness-score',
  },
}

// ---------------------------------------------------------------------------
// Step Data
// ---------------------------------------------------------------------------

const improvementSteps = [
  {
    step: 1,
    title: 'Run Your Free Scan',
    dimension: 'All',
    effort: '60 seconds',
    impact: 'Baseline',
    icon: Search,
    description:
      'Before you improve anything, you need to know where you stand. Go to agenthermes.ai/audit and enter your domain. In 10 seconds, you get a score across all 9 dimensions with a detailed breakdown of what is working and what is not. This is your baseline. Every improvement you make from here is measurable.',
    example:
      'When we first scanned Stripe, they scored in the low 40s. After their team published better error responses and structured documentation, they recalibrated to 68. You cannot manage what you do not measure.',
  },
  {
    step: 2,
    title: 'Publish an OpenAPI Spec',
    dimension: 'D2 API Quality (weight: 0.15)',
    effort: '2-4 hours',
    impact: '+10-20 points on D2',
    icon: Code2,
    description:
      'The single highest-impact technical change you can make. An OpenAPI spec tells agents exactly what your API can do, what parameters each endpoint accepts, and what responses to expect. Without it, agents have to guess by parsing documentation pages or, worse, try random endpoints. With it, any agent can auto-generate a working client in seconds.',
    example:
      'Resend publishes a clean OpenAPI spec and scores 88 on API Quality. Companies without one average 31 on the same dimension. The spec does not need to be perfect — it needs to exist.',
  },
  {
    step: 3,
    title: 'Add llms.txt to Your Root',
    dimension: 'D1 Discoverability (weight: 0.12)',
    effort: '30 minutes',
    impact: '+5-10 points on D1',
    icon: FileText,
    description:
      'llms.txt is a simple text file at your domain root that tells AI models what your business does, what capabilities you offer, and how to interact with you. Think of it as robots.txt for AI agents — except instead of telling crawlers what to avoid, it tells agents what to use. The format is straightforward: a title, a description, and links to your key resources.',
    example:
      'A restaurant that adds llms.txt with its menu link, hours, and booking URL goes from completely invisible to discoverable. For SaaS, include your API docs link, pricing page, and authentication guide. This single file is the difference between an agent finding you and skipping you.',
  },
  {
    step: 4,
    title: 'Create an agent-card.json',
    dimension: 'D1 Discoverability + D9 Agent Experience',
    effort: '1-2 hours',
    impact: '+8-15 points combined',
    icon: Globe,
    description:
      'An agent-card.json file at /.well-known/agent-card.json is the A2A (Agent-to-Agent) protocol standard for machine-readable business identity. It contains your business name, capabilities, authentication methods, rate limits, and supported protocols. When an agent encounters your domain, the first thing it checks is this file. If it exists, the agent knows immediately what you can do and how to interact. If it does not, the agent has to scrape and guess.',
    example:
      'Zero of the bottom 198 businesses in our dataset (the "Not Scored" tier below 40) have an agent-card.json. All 51 Silver-tier businesses have at least partial agent discovery files. Correlation is not causation, but the pattern is clear: businesses that make themselves machine-readable score higher.',
  },
  {
    step: 5,
    title: 'Structure Your Pricing',
    dimension: 'D4 Pricing Transparency (weight: 0.05)',
    effort: '2-3 hours',
    impact: '+15-25 points on D4',
    icon: CreditCard,
    description:
      'This is the universal weakness across our entire 500-business dataset. D4 Pricing Transparency averages the lowest of all 9 dimensions. The reason: most businesses treat pricing as a human-facing concern — beautiful pricing pages with toggles and sliders that agents cannot parse. The fix is to publish pricing in a structured, machine-readable format. This can be a JSON endpoint, structured data on your pricing page, or a dedicated pricing section in your agent-card.json.',
    example:
      'Stripe scores 45 on Pricing Transparency despite being one of the best API companies in the world. Their pricing is technically public but requires parsing complex calculator pages. A simple JSON endpoint listing plans, prices, and features would move that score by 20+ points. For smaller businesses: a JSON-LD PriceSpecification on your pricing page takes 30 minutes to implement.',
  },
  {
    step: 6,
    title: 'Return Structured Error Responses',
    dimension: 'D2 API Quality + D6 Data Quality',
    effort: '1-3 hours',
    impact: '+10-15 points combined',
    icon: Shield,
    description:
      'When an agent sends a bad request to your API, what does it get back? If the answer is an HTML error page, a generic 500, or an empty response, you are losing points on two dimensions simultaneously. Structured error responses with machine-readable error codes, clear messages, and suggested fixes let agents self-correct without human intervention. Our scanner specifically checks for this: a 401 response with structured JSON scores 87% of what a 200 with valid data scores. An HTML error page scores near zero.',
    example:
      'Resend returns typed error codes like "validation_error" and "missing_required_field" with specific field names. An agent that hits this error can immediately fix the request and retry. Compare this to a business that returns "Something went wrong" — the agent has no path forward.',
  },
  {
    step: 7,
    title: 'Simplify Your Onboarding',
    dimension: 'D3 Onboarding (weight: 0.08)',
    effort: 'Varies (days to weeks)',
    impact: '+10-20 points on D3',
    icon: User,
    description:
      'D3 Onboarding is the second-weakest dimension across our dataset, right behind Pricing Transparency. The pattern is the same everywhere: CAPTCHA, email verification loops, phone verification, manual approval queues, mandatory credit card entry, multi-step wizards with JavaScript-heavy flows that agents cannot navigate. Every human-required step is a point where agents fail. The goal is not to remove security — it is to provide a programmatic onboarding path alongside the human one.',
    example:
      'Resend gets you from signup to first API call in under 2 minutes with a generous free tier that requires no payment. That single decision — a free tier with minimal friction — contributes to their Gold score more than any technical optimization. If you cannot offer a free tier, offer a sandbox environment with test credentials.',
  },
  {
    step: 8,
    title: 'Add Rate Limit Headers',
    dimension: 'D7 Security + D8 Reliability',
    effort: '1-2 hours',
    impact: '+5-10 points combined',
    icon: Lock,
    description:
      'Rate limiting is expected. But how you communicate limits to agents matters enormously. Returning a 429 status code with Retry-After, X-RateLimit-Remaining, and X-RateLimit-Reset headers lets an agent manage its own request cadence without guessing. This improves both your Security score (you are protecting your service) and your Reliability score (agents can plan around limits). Our scanner checks for proper 429 responses and penalizes APIs that either have no rate limiting or rate-limit silently without headers.',
    example:
      'Stripe and Resend both return documented rate limit headers. Businesses without them average 12 points lower on D7 Security and 8 points lower on D8 Reliability.',
  },
  {
    step: 9,
    title: 'Publish SDKs or Code Examples',
    dimension: 'D9 Agent Experience (weight: 0.10)',
    effort: '1-2 weeks (or use auto-generation)',
    impact: '+10-15 points on D9',
    icon: Sparkles,
    description:
      'Agent Experience (D9) measures how easy it is for an agent to actually use your product after discovering it. SDKs in popular languages, copy-paste code examples, and interactive API playgrounds all contribute. You do not need SDKs in every language — even one well-maintained SDK plus curl examples covers most agent use cases. The key is that an agent should be able to go from "I know what this API does" to "I am making successful calls" without reading prose documentation.',
    example:
      'Resend scores 82 on Agent Experience with official SDKs in Node.js, Python, Ruby, PHP, Go, and Elixir. But even businesses with a single Python SDK and clear curl examples score 15-20 points higher on D9 than those with only prose documentation.',
  },
  {
    step: 10,
    title: 'Activate the Agent-Native Bonus',
    dimension: 'Agent-Native Bonus (weight: 0.07)',
    effort: 'Varies (1 day to 2 weeks)',
    impact: '+5-7 bonus points',
    icon: Rocket,
    description:
      'The Agent-Native Bonus is a 7% weight multiplier that rewards businesses for adopting agent-specific protocols. This includes publishing an MCP (Model Context Protocol) server, supporting A2A protocol, having an AGENTS.md file, or implementing agent-specific authentication flows. This bonus is separate from the 9 core dimensions and stacks on top. Our scanner detects MCP servers, A2A agent cards, AGENTS.md files, and other agent-native signals automatically.',
    example:
      'Supabase scores 69 partly because of their MCP server, which exposes database operations as agent-callable tools. Any business that publishes an MCP server with even basic read operations gets an immediate scoring boost that competitors without one cannot match.',
  },
]

// ---------------------------------------------------------------------------
// Common Mistakes
// ---------------------------------------------------------------------------

const commonMistakes = [
  {
    mistake: 'Optimizing your best dimension instead of your worst',
    fix: 'Your score is a weighted average. Improving a dimension from 80 to 90 adds less than improving one from 20 to 50. Fix the weakest link first.',
  },
  {
    mistake: 'Adding agent features without fixing API basics',
    fix: 'An MCP server is worthless if your API returns HTML errors. Get the fundamentals right (D2, D6, D7) before chasing agent-native bonus points.',
  },
  {
    mistake: 'Gating everything behind sales teams',
    fix: 'Every sales-gated step is a zero for that dimension. Agents cannot fill out "Contact Sales" forms. Offer a self-serve path, even if enterprise pricing needs human negotiation.',
  },
  {
    mistake: 'Beautiful pricing pages that are not machine-readable',
    fix: 'A pricing page with interactive sliders and tooltips is great for humans and invisible to agents. Add JSON-LD structured data or a /pricing.json endpoint.',
  },
]

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

const faqs = [
  {
    question: 'How quickly can I improve my Agent Readiness Score?',
    answer:
      'The fastest improvements come from Steps 2-4: publishing an OpenAPI spec, adding llms.txt, and creating agent-card.json. These are static files and specification documents that require no code changes to your core product. Together, they can move your score 15-25 points in a single afternoon. Deeper improvements like onboarding simplification and structured pricing take longer but have outsized impact on your weighted score.',
  },
  {
    question: 'Which dimension should I fix first?',
    answer:
      'Fix your lowest-scoring dimension first. The math is simple: improving a dimension from 20 to 50 adds more to your weighted average than improving one from 70 to 85. Run your free scan at agenthermes.ai/audit to see your dimension breakdown, then start with the red and orange scores. For most businesses, that will be D3 Onboarding or D4 Pricing Transparency, since these are the weakest dimensions across our entire 500-business dataset.',
  },
  {
    question: 'How is the Agent Readiness Score calculated?',
    answer:
      'We scan businesses across 9 weighted dimensions: Discoverability (12%), API Quality (15%), Onboarding (8%), Pricing Transparency (5%), Payment (8%), Data Quality (10%), Security (12%), Reliability (13%), and Agent Experience (10%), plus an Agent-Native Bonus (7%). Each dimension is scored 0-100 and the weighted average produces the final score. Tier thresholds: Platinum 90+, Gold 75+, Silver 60+, Bronze 40+, Not Scored below 40.',
  },
  {
    question: 'What moved Stripe from 40 to 68?',
    answer:
      'Stripe was initially scored in the low 40s in early calibration. The recalibration to 68 came from properly weighting their excellent API quality (D2), strong security posture (D7), and high reliability (D8). Their main gaps remain D4 Pricing Transparency (45) and D3 Onboarding (complex multi-step flow). If Stripe published a machine-readable pricing endpoint and simplified their agent onboarding path, they could reach Gold (75+).',
  },
  {
    question: 'Can I improve my score without changing my product?',
    answer:
      'Yes. Steps 3, 4, and 5 — adding llms.txt, agent-card.json, and structured pricing data — require zero changes to your actual product or API. They are metadata and discovery files that sit alongside your existing infrastructure. These three steps alone can move most businesses from Bronze to Silver range. Product changes (better error responses, simpler onboarding, SDKs) push you from Silver toward Gold.',
  },
  {
    question: 'Does AgentHermes offer remediation help?',
    answer:
      'Yes. After your free scan, visit agenthermes.ai/remediate for automated remediation recommendations. We generate the specific files you need (agent-card.json, llms.txt, MCP tool definitions) based on your scan results. For businesses that want hands-on help, our Connect wizard at agenthermes.ai/connect walks you through the full setup step by step.',
  },
]

// ---------------------------------------------------------------------------
// TOC
// ---------------------------------------------------------------------------

const tocSections = [
  { id: 'start-here', label: 'Start Here' },
  { id: 'the-10-steps', label: 'The 10 Steps' },
  { id: 'priority-order', label: 'Priority Order' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'real-results', label: 'Real Results' },
  { id: 'faq', label: 'FAQ' },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ImproveAgentReadinessScorePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Improve Your Agent Readiness Score: A Step-by-Step Guide',
    description:
      'A practical guide to improving your Agent Readiness Score across all 9 dimensions with real examples and actionable steps.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/improve-agent-readiness-score',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'How-To Guide',
    wordCount: 2000,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Improve Your Agent Readiness Score',
          item: 'https://agenthermes.ai/blog/improve-agent-readiness-score',
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
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <span className="text-zinc-400">Improve Your Score</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Wrench className="h-3.5 w-3.5" />
              How-To Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />
              Actionable
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              10 Steps
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            How to Improve Your{' '}
            <span className="text-emerald-500">Agent Readiness Score</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-8">
            We scanned 500 businesses. The average score is 43 out of 100. Most businesses are invisible to AI agents
            or visible but unusable. This is the step-by-step playbook to change that — with real examples,
            estimated effort for each step, and the exact changes that moved real companies up the leaderboard.
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
                  16 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TABLE OF CONTENTS (desktop sidebar) ===== */}
      <div className="hidden xl:block fixed right-[max(1rem,calc((100vw-64rem)/2-14rem))] top-28 w-52 z-20">
        <nav className="toc-sidebar">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-3 pl-3">On this page</div>
          {tocSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="block">
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ===== START HERE ===== */}
      <section id="start-here" className="pb-12 sm:pb-16 border-t border-zinc-800/50 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <Target className="h-6 w-6 text-emerald-500" />
            Start Here: Know Your Baseline
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-zinc-100">500</div>
              <div className="text-xs text-zinc-500 mt-1">Businesses Scanned</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-zinc-400">43</div>
              <div className="text-xs text-zinc-500 mt-1">Average Score</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-amber-400">250</div>
              <div className="text-xs text-zinc-500 mt-1">Bronze (40-59)</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-red-400">198</div>
              <div className="text-xs text-zinc-500 mt-1">Not Scored (&lt;40)</div>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The first step is always measurement. You cannot improve what you do not measure, and most businesses
              have never checked how they appear to AI agents. Our free scan at{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                agenthermes.ai/audit
              </Link>{' '}
              checks your business across all 9 dimensions in about 10 seconds and gives you a score from 0 to 100.
            </p>
            <p>
              Out of 500 businesses scanned, 250 score Bronze (40-59) and 198 score below 40 — effectively invisible
              to AI agents. Only 51 score Silver (60-74), 1 scores Gold (Resend at 75), and zero score Platinum (90+).
              The average is 43. If you have not scanned yet, you are statistically likely to be in the Bronze range or below.
            </p>
            <p>
              The good news: improving your score is not mysterious. The 10 steps below are ordered by impact-to-effort
              ratio. The first three steps require no code changes to your product and can be done in an afternoon.
              Steps 4-7 require moderate engineering work. Steps 8-10 are strategic investments that push you from
              Silver toward Gold.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 10 STEPS ===== */}
      <section id="the-10-steps" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <Layers className="h-6 w-6 text-emerald-500" />
            The 10 Steps
          </h2>

          <div className="space-y-8">
            {improvementSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                    <span className="text-emerald-400 font-bold text-sm">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-zinc-100 text-lg">{step.title}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/50">
                        <step.icon className="h-3 w-3 text-zinc-400" />
                        {step.dimension}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/50">
                        <Clock className="h-3 w-3 text-zinc-400" />
                        {step.effort}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <TrendingUp className="h-3 w-3" />
                        {step.impact}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4" style={{ lineHeight: '1.75' }}>
                  {step.description}
                </p>
                <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2">Real Example</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{step.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRIORITY ORDER ===== */}
      <section id="priority-order" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Rocket className="h-6 w-6 text-emerald-500" />
            Priority Order: Maximum Impact in Minimum Time
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Not every step is equal. Here is the priority order based on the impact-to-effort ratio, grouped
              into three phases. Phase 1 can be done in a single afternoon. Phase 2 takes a week of engineering.
              Phase 3 is a strategic investment over weeks to months.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-bold text-emerald-400 mb-3">Phase 1: Afternoon (Steps 1, 3, 4)</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                Run your scan, add llms.txt, and create agent-card.json. Zero code changes. Expected improvement: +15-25 points.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">D1 Discoverability</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">D9 Agent Experience</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <h3 className="font-bold text-blue-400 mb-3">Phase 2: One Week (Steps 2, 5, 6, 8)</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                Publish your OpenAPI spec, structure your pricing, fix error responses, and add rate limit headers. Expected improvement: +15-30 points.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">D2 API Quality</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">D4 Pricing</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">D6 Data Quality</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">D7 Security</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <h3 className="font-bold text-purple-400 mb-3">Phase 3: Strategic (Steps 7, 9, 10)</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                Simplify onboarding, publish SDKs, and build agent-native features (MCP server, A2A support). This is what pushes Silver to Gold. Expected improvement: +10-20 points.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-400">D3 Onboarding</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-400">D9 Agent Experience</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-400">Agent-Native Bonus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMMON MISTAKES ===== */}
      <section id="common-mistakes" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <Shield className="h-6 w-6 text-red-500" />
            Common Mistakes to Avoid
          </h2>

          <div className="space-y-4">
            {commonMistakes.map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 shrink-0 mt-0.5">
                    <span className="text-red-400 text-xs font-bold">!</span>
                  </div>
                  <h3 className="font-bold text-zinc-100 text-sm">{item.mistake}</h3>
                </div>
                <div className="flex items-start gap-3 ml-9">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL RESULTS ===== */}
      <section id="real-results" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            Real Results from the Leaderboard
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The businesses at the top of our{' '}
              <Link href="/leaderboard" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                leaderboard
              </Link>{' '}
              are not there by accident. They followed the same principles in this guide — most of them before
              agent readiness was even a concept. Here is what the top 5 have in common:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { name: 'Resend', score: 75, insight: 'Gold. Small API surface, excellent documentation, generous free tier, structured everything.' },
              { name: 'Agora', score: 72, insight: 'Silver. Strong real-time API with SDKs in 10+ languages. Loses points on pricing complexity.' },
              { name: 'Vercel', score: 70, insight: 'Silver. Clean developer experience. Gaps in agent-native discovery (no agent-card.json).' },
              { name: 'Statuspage', score: 70, insight: 'Silver. Public status APIs are inherently agent-friendly. Simple, predictable data.' },
              { name: 'TikTok', score: 69, insight: 'Silver. Surprisingly strong API docs for a consumer platform. Onboarding is the bottleneck.' },
            ].map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  i === 0
                    ? 'bg-yellow-500/5 border-yellow-500/20'
                    : 'bg-zinc-900/50 border-zinc-800/80'
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold text-lg ${
                  i === 0
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    : 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/50'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold ${i === 0 ? 'text-yellow-400' : 'text-zinc-200'}`}>
                      {entry.name}
                    </span>
                    <span className={`text-xl font-bold ${i === 0 ? 'text-yellow-400' : 'text-zinc-400'}`}>
                      {entry.score}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{entry.insight}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="callout-box">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 !mt-0">
              <Zap className="h-5 w-5" />
              The Pattern
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Every top-scoring business shares three traits: structured API responses, minimal onboarding friction,
              and transparent pricing. None of these require cutting-edge AI technology. They require good engineering
              fundamentals applied consistently across every dimension. The playbook in this guide is the same one
              the leaders followed — you just have a map now.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-emerald-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="font-bold text-zinc-100 mb-3 text-base">{faq.question}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed" style={{ lineHeight: '1.75' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED READING ===== */}
      <section className="pb-12 sm:pb-16">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-zinc-300">Related Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Resend Is the Only Gold',
                href: '/blog/resend-only-gold',
                tag: 'Case Study',
                tagColor: 'amber',
              },
              {
                title: 'Why Stripe Scores 68 Silver',
                href: '/blog/why-stripe-scores-68',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'The Agent Readiness Leaderboard',
                href: '/blog/agent-readiness-leaderboard',
                tag: 'Data',
                tagColor: 'emerald',
              },
            ].map((related) => (
              <Link
                key={related.href}
                href={related.href}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 article-card-hover"
              >
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${
                    related.tagColor === 'emerald'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : related.tagColor === 'amber'
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                      : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}
                >
                  {related.tag}
                </span>
                <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors leading-snug">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHARE BUTTONS ===== */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <hr className="section-divider mb-8" />
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-500 font-medium">Share this guide:</span>
            <a
              href="https://twitter.com/intent/tweet?text=How%20to%20improve%20your%20Agent%20Readiness%20Score%20%E2%80%94%20a%2010-step%20guide%20from%20scanning%20500%20businesses.&url=https://agenthermes.ai/blog/improve-agent-readiness-score"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://agenthermes.ai/blog/improve-agent-readiness-score"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Ready to start improving?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run your free scan to see your current score and dimension breakdown. Then use the remediation
            tool to generate the files you need.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Score My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/remediate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Start Remediation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
