import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileJson,
  Globe,
  HelpCircle,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  Terminal,
  TestTube,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'How to Test Your Agent Readiness Score Before Going Live | AgentHermes',
  description:
    'Practical self-test guide with 10 curl commands that predict your Agent Readiness Score. Check your API, robots.txt, agent-card.json, health endpoint, and content negotiation before scanning with AgentHermes.',
  keywords: [
    'test agent readiness score',
    'agent readiness self test',
    'check agent readiness',
    'curl agent readiness',
    'agent readiness checklist',
    'pre-scan agent readiness',
    'API readiness test',
    'agent-card.json test',
    'health endpoint check',
  ],
  openGraph: {
    title: 'How to Test Your Agent Readiness Score Before Going Live',
    description:
      '10 curl commands that predict your Agent Readiness Score. Self-check your API, robots.txt, agent-card.json, and more before scanning with AgentHermes.',
    url: 'https://agenthermes.ai/blog/testing-your-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How to Test Your Agent Readiness Score Before Going Live',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Test Your Agent Readiness Score Before Going Live',
    description:
      '10 curl commands that predict your Agent Readiness Score. Self-check before scanning with AgentHermes.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/testing-your-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const curlTests = [
  {
    number: 1,
    title: 'Does your API return JSON?',
    command: 'curl -s https://yoursite.com/api | head -c 200',
    pass: 'Returns valid JSON: {"status":"ok",...}',
    fail: 'Returns HTML: <!DOCTYPE html>...',
    dimension: 'D2 API Quality (15%)',
    impact: 'high',
    explanation: 'If your primary API endpoint returns HTML instead of JSON, agents cannot parse it. This single check accounts for the largest dimension weight in the entire score.',
  },
  {
    number: 2,
    title: 'Is GPTBot allowed in robots.txt?',
    command: 'curl -s https://yoursite.com/robots.txt',
    pass: 'No blanket Disallow for GPTBot, ClaudeBot, PerplexityBot',
    fail: 'User-agent: * Disallow: / (blocks all bots including AI)',
    dimension: 'D1 Discoverability (12%)',
    impact: 'high',
    explanation: 'Blocking AI crawlers in robots.txt makes you invisible to AI models. Check for User-agent: GPTBot, ClaudeBot, and Google-Extended specifically. A blanket Disallow: / blocks everything.',
  },
  {
    number: 3,
    title: 'Do you have an agent-card.json?',
    command: 'curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/.well-known/agent-card.json',
    pass: 'Returns 200 with valid JSON agent card',
    fail: 'Returns 404 (like 99.8% of businesses)',
    dimension: 'D9 Agent Experience (10%)',
    impact: 'high',
    explanation: 'agent-card.json is the A2A protocol discovery file. It tells agents what your business does and how to interact with it. Fewer than 1% of 500 businesses scanned have one.',
  },
  {
    number: 4,
    title: 'Does content negotiation work?',
    command: 'curl -s -H "Accept: application/json" https://yoursite.com/ -o /dev/null -w "%{http_code}\\n%{content_type}"',
    pass: 'Content-Type: application/json (returns JSON when asked)',
    fail: 'Content-Type: text/html (ignores Accept header)',
    dimension: 'D6 Data Quality (10%)',
    impact: 'medium',
    explanation: 'AI agents send Accept: application/json. Most websites ignore this header and return HTML anyway. If your server respects content negotiation, agents get structured data without a separate API.',
  },
  {
    number: 5,
    title: 'Does /health exist?',
    command: 'curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/health',
    pass: 'Returns 200 with uptime/status information',
    fail: 'Returns 404 or redirects to homepage',
    dimension: 'D8 Reliability (13%)',
    impact: 'medium',
    explanation: 'Agents check /health before delegating work to your API. No health endpoint means no confidence signal. Also check /api/health and /status. Even a simple {"status":"ok"} adds points.',
  },
  {
    number: 6,
    title: 'Is there an OpenAPI spec?',
    command: 'curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/openapi.json',
    pass: 'Returns 200 with valid OpenAPI 3.x spec',
    fail: 'Returns 404 (no published spec)',
    dimension: 'D2 API Quality (15%)',
    impact: 'high',
    explanation: 'OpenAPI specs let agents auto-discover every endpoint, parameter, and response type. Also check /swagger.json, /api-docs, and /api/openapi.json. This is the single biggest factor in D2.',
  },
  {
    number: 7,
    title: 'Does llms.txt exist?',
    command: 'curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/llms.txt',
    pass: 'Returns 200 with markdown content for LLMs',
    fail: 'Returns 404 (95% of businesses)',
    dimension: 'D1 Discoverability (12%)',
    impact: 'medium',
    explanation: 'llms.txt is a markdown file that tells AI models what your business is and does. It is the cheapest, fastest way to boost D1 and D9. Takes 10 minutes to create.',
  },
  {
    number: 8,
    title: 'Does your API return structured errors?',
    command: 'curl -s https://yoursite.com/api/nonexistent-endpoint',
    pass: 'Returns JSON: {"error":"not_found","code":404,"message":"..."}',
    fail: 'Returns HTML 404 page or generic server error',
    dimension: 'D6 Data Quality (10%)',
    impact: 'medium',
    explanation: 'When agents hit an error, they need structured JSON guidance to recover. HTML error pages are useless to agents. Check that 404, 400, and 500 responses all return JSON with error codes.',
  },
  {
    number: 9,
    title: 'Is there a security.txt?',
    command: 'curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/.well-known/security.txt',
    pass: 'Returns 200 with RFC 9116 compliant content',
    fail: 'Returns 404',
    dimension: 'D7 Security (12%)',
    impact: 'low',
    explanation: 'security.txt signals API maturity to agents evaluating trustworthiness. 100% of Silver-tier businesses have one. Takes 2 minutes to create.',
  },
  {
    number: 10,
    title: 'Does TLS work properly?',
    command: 'curl -sI https://yoursite.com | grep -i strict-transport',
    pass: 'Returns Strict-Transport-Security header',
    fail: 'No HSTS header or HTTPS redirect fails',
    dimension: 'D7 Security (12%)',
    impact: 'critical',
    explanation: 'No TLS = hard cap at 39. This is non-negotiable. Also check for HSTS header which signals HTTPS-only commitment. Without valid TLS, nothing else matters.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can I really predict my AgentHermes score with curl commands?',
    answer:
      'These 10 tests cover the signals that account for roughly 70% of the total score weight. They will not give you an exact number, but they will tell you whether you are in the 0-20 range (most tests fail), 20-40 (a few pass), 40-60 (most pass), or 60+ (all pass plus extras). The actual AgentHermes scan checks over 40 signals across 9 dimensions, including nuances like response time, Schema.org markup, and rate-limit headers.',
  },
  {
    question: 'Which test matters most?',
    answer:
      'TLS (test 10) is the most critical because it hard-caps your score at 39 if it fails. After that, having a callable API that returns JSON (test 1) and an OpenAPI spec (test 6) together account for the largest score contribution since D2 API Quality is weighted at 15%.',
  },
  {
    question: 'How do these tests map to the 9 dimensions?',
    answer:
      'D1 Discoverability: tests 2 and 7. D2 API Quality: tests 1 and 6. D6 Data Quality: tests 4 and 8. D7 Security: tests 9 and 10. D8 Reliability: test 5. D9 Agent Experience: test 3. Dimensions D3 Onboarding, D4 Pricing, and D5 Payment require more complex checks that curl alone cannot easily replicate.',
  },
  {
    question: 'What if all 10 tests fail?',
    answer:
      'You are in the 0-19 range, which is ARL-0: Dark. This means your business is completely invisible to AI agents. The good news: fixing tests 10 (TLS), 2 (robots.txt), and 7 (llms.txt) takes under an hour and will move you into the 20-30 range immediately. That alone puts you ahead of 40% of the 500 businesses we have scanned.',
  },
  {
    question: 'Should I run these tests before or after the actual AgentHermes scan?',
    answer:
      'Run them before to identify obvious gaps you can fix immediately. Then run the AgentHermes scan to get the precise score across all 9 dimensions with vertical-specific weighting. After fixing the issues the scan identifies, run these curl commands again to verify the fixes landed correctly before rescanning.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TestingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Test Your Agent Readiness Score Before Going Live',
    description:
      'Practical testing guide with 10 curl commands that predict your Agent Readiness Score. Self-check your API, robots.txt, agent-card.json, health endpoint, and content negotiation.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/testing-your-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Guide',
    wordCount: 1900,
    keywords:
      'test agent readiness score, curl agent readiness, self-test agent readiness, agent readiness checklist',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Testing Your Agent Readiness',
          item: 'https://agenthermes.ai/blog/testing-your-agent-readiness',
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
      title="How to Test Your Agent Readiness Score Before Going Live"
      shareUrl="https://agenthermes.ai/blog/testing-your-agent-readiness"
      currentHref="/blog/testing-your-agent-readiness"
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
            <span className="text-zinc-400">Testing Your Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <TestTube className="h-3.5 w-3.5" />
              Technical Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Hands-On
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            How to Test Your Agent Readiness Score{' '}
            <span className="text-emerald-400">Before Going Live</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Before you scan with AgentHermes, you can self-check with 10 curl commands from your terminal.
            These tests cover the signals that account for roughly <strong className="text-zinc-100">70% of
            your total score</strong>. Run them, fix the failures, then scan for the full 9-dimension
            breakdown.
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
                  14 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-emerald-500" />
            Why Self-Test First?
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The AgentHermes scanner checks over 40 signals across 9 weighted dimensions with
              vertical-specific scoring profiles. That level of detail is valuable, but you do not need
              it to identify the most obvious gaps. A terminal and curl will tell you whether you are
              in the invisible tier (0-19), struggling tier (20-39), or competitive tier (40+) in about
              five minutes.
            </p>
            <p>
              More importantly, self-testing teaches you what agents actually look for when they evaluate
              your business. Each test below maps to a specific dimension and explains why that signal
              matters. Fix the failures, then run the full AgentHermes scan to see where you land across
              the complete scoring model.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '10', label: 'curl commands', icon: Terminal },
              { value: '~70%', label: 'of score weight covered', icon: Target },
              { value: '5 min', label: 'to run all tests', icon: Clock },
              { value: '7 of 9', label: 'dimensions tested', icon: Sparkles },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE 10 TESTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            The 10-Test Agent Readiness Self-Check
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Replace <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">yoursite.com</code> with
            your actual domain. Run each command from any terminal with curl installed. Count your passes.
          </p>

          <div className="space-y-6 mb-8">
            {curlTests.map((test) => (
              <div
                key={test.number}
                className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                      test.impact === 'critical'
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                        : test.impact === 'high'
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                          : test.impact === 'medium'
                            ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                            : 'bg-zinc-700/50 border border-zinc-600/20 text-zinc-400'
                    }`}>
                      {test.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-100 text-sm">{test.title}</h3>
                      <span className="text-xs text-zinc-500">{test.dimension}</span>
                    </div>
                  </div>

                  {/* Command */}
                  <div className="p-3 rounded-lg bg-zinc-800/80 border border-zinc-700/50 mb-3 font-mono">
                    <code className="text-xs text-emerald-400 break-all">{test.command}</code>
                  </div>

                  {/* Pass/Fail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-zinc-400"><strong className="text-emerald-400">Pass:</strong> {test.pass}</p>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                      <Target className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-zinc-400"><strong className="text-red-400">Fail:</strong> {test.fail}</p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed">{test.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCORING YOUR RESULTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Interpreting Your Results
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Count how many of the 10 tests your site passes. Here is what each range predicts for your
              actual AgentHermes scan score.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Tests Passed</div>
              <div>Predicted Range</div>
              <div>Tier</div>
            </div>
            {[
              { passed: '0-2', range: '0-19', tier: 'Not Scored', tierColor: 'text-zinc-500' },
              { passed: '3-4', range: '20-39', tier: 'Not Scored', tierColor: 'text-zinc-500' },
              { passed: '5-6', range: '40-54', tier: 'Bronze', tierColor: 'text-amber-400' },
              { passed: '7-8', range: '55-64', tier: 'Bronze/Silver', tierColor: 'text-amber-400' },
              { passed: '9-10', range: '60-75+', tier: 'Silver/Gold', tierColor: 'text-emerald-400' },
            ].map((row, i) => (
              <div
                key={row.passed}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.passed}</div>
                <div className="text-zinc-400">{row.range}</div>
                <div className={`font-medium ${row.tierColor}`}>{row.tier}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Important caveat:</strong> These 10 tests cover 7 of 9
              dimensions but cannot check D3 Onboarding (self-service API key signup), D4 Pricing (structured
              pricing data), or D5 Payment (programmatic payment flow). Those three dimensions account for
              21% of the score. A business that passes all 10 curl tests but has no pricing page and no
              self-service signup will still score lower than expected. The full{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes scan
              </Link>{' '}
              catches everything.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRIORITY FIX ORDER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            Priority Fix Order
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              If multiple tests fail, fix them in this order. Each step unlocks the maximum score improvement
              per hour of effort. This sequence is derived from the{' '}
              <Link href="/blog/checklist-agent-ready-business" className="text-emerald-400 hover:text-emerald-300 underline">
                30-signal checklist
              </Link>{' '}
              and real scan data from 500 businesses.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Fix TLS (Test 10)',
                time: '30 min',
                detail: 'Hard cap at 39 without it. If you are on any modern hosting (Vercel, Netlify, Cloudflare) you already have this. If not, Cloudflare free tier adds HTTPS in 15 minutes.',
                icon: Shield,
              },
              {
                step: '2',
                title: 'Unblock AI crawlers (Test 2)',
                time: '5 min',
                detail: 'Edit robots.txt. Allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended. One file edit, immediate impact on D1 Discoverability.',
                icon: Globe,
              },
              {
                step: '3',
                title: 'Add llms.txt (Test 7)',
                time: '15 min',
                detail: 'Create a markdown file describing your business for AI models. Drop it at /llms.txt. Boosts D1 and D9 simultaneously.',
                icon: FileJson,
              },
              {
                step: '4',
                title: 'Return JSON from your API (Test 1)',
                time: '1-4 hours',
                detail: 'If you have no API, this is the biggest build. If you have one that returns HTML, add Content-Type: application/json. Largest single score impact.',
                icon: Code2,
              },
              {
                step: '5',
                title: 'Add /health endpoint (Test 5)',
                time: '15 min',
                detail: 'One endpoint returning {"status":"ok","timestamp":"..."}. Boosts D8 Reliability which carries 13% weight.',
                icon: Server,
              },
              {
                step: '6',
                title: 'Create agent-card.json (Test 3)',
                time: '30 min',
                detail: 'Place at /.well-known/agent-card.json. Describes your business capabilities for A2A discovery. Use the AgentHermes generator at /connect to auto-create one.',
                icon: Search,
              },
            ].map((item) => (
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
                    <span className="text-xs text-zinc-500">({item.time})</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Following this order, you can go from 0 passing tests to 6+ in a single afternoon. That moves
              a typical business from the invisible tier (0-19) to Bronze (40-54). From there, the{' '}
              <Link href="/blog/improve-agent-readiness-score" className="text-emerald-400 hover:text-emerald-300 underline">
                step-by-step improvement guide
              </Link>{' '}
              covers the remaining dimensions including self-service onboarding, structured pricing, and
              payment processing that push you toward Silver.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMPARE TO REAL SCAN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            Self-Test vs Full AgentHermes Scan
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The self-test is a quick health check. The full AgentHermes scan is the comprehensive audit.
              Here is what the full scan adds beyond these 10 curl commands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Vertical-specific scoring',
                detail: 'AgentHermes uses 27 vertical scoring profiles that adjust dimension weights based on your industry. A restaurant gets different weights than a SaaS platform.',
              },
              {
                title: 'Schema.org markup detection',
                detail: 'The scanner reads JSON-LD structured data on your pages to evaluate D6 Data Quality. This includes Product, Service, Organization, and LocalBusiness schemas.',
              },
              {
                title: 'Response time analysis',
                detail: 'D8 Reliability measures actual response times. CDN-backed APIs under 100ms score highest. The scanner times real requests and evaluates consistency.',
              },
              {
                title: 'Auth pattern detection',
                detail: 'D7 Security evaluates whether your API uses Bearer tokens, OAuth 2.0, API keys, or session cookies. The scanner detects auth-protected endpoints and evaluates the 401 response quality.',
              },
              {
                title: 'Payment flow analysis',
                detail: 'D5 Payment checks for programmatic payment processing: Stripe integration, payment links, x402 protocol support. This requires deeper analysis than curl provides.',
              },
              {
                title: 'Platform detection',
                detail: 'AgentHermes detects Shopify, WooCommerce, Square, and other platforms to apply platform-specific scoring bonuses. A WooCommerce store with Store API enabled gets credit automatically.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
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
                title: 'The Agent Readiness Checklist: 30 Signals Every Business Should Have',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
                tagColor: 'emerald',
              },
              {
                title: 'How to Improve Your Agent Readiness Score: Step-by-Step',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Run the Full AgentHermes Scan',
                href: '/audit',
                tag: 'Free Tool',
                tagColor: 'emerald',
              },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
                  {article.tag}
                </span>
                <h3 className="text-sm font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Ready for the full scan?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            The self-test covers 70% of the score. The full AgentHermes scan covers all 9 dimensions
            with vertical-specific weighting, platform detection, and actionable recommendations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Run Full Scan
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
