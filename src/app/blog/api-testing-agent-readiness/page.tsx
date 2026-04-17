import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Beaker,
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
  Terminal,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'API Testing Tools and Agent Readiness: How Postman, Insomnia, and curl Verify Your Score | AgentHermes',
  description:
    'Practical guide to testing your agent readiness with existing tools. Use Postman, Insomnia, and curl to verify endpoints, auth, error handling, rate limits, and OpenAPI specs. Then compare with your AgentHermes scan.',
  keywords: [
    'API testing tools agent readiness',
    'Postman agent readiness',
    'curl agent readiness test',
    'Insomnia API testing',
    'test agent readiness score',
    'OpenAPI spec testing',
    'API health check agent',
    'verify agent readiness',
    'endpoint testing AI agents',
  ],
  openGraph: {
    title: 'API Testing Tools and Agent Readiness: How Postman, Insomnia, and curl Verify Your Score',
    description:
      'Use Postman, Insomnia, and curl to test the 5 things that determine your agent readiness score. Practical commands and workflows included.',
    url: 'https://agenthermes.ai/blog/api-testing-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API Testing Tools and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Testing Tools and Agent Readiness: Verify Your Score with Postman and curl',
    description:
      'Practical guide: 10 curl commands that predict your agent readiness score. Test what AI agents test when they evaluate your business.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/api-testing-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const testingWorkflow = [
  {
    step: '1',
    name: 'Health check',
    description: 'Verify the API is alive and returning structured responses. An agent\'s first interaction is always a health or discovery check.',
    curl: 'curl -s https://api.example.com/health | jq .',
    expect: '200 OK with JSON body: { "status": "healthy", "version": "2.1.0" }',
    icon: CheckCircle2,
    color: 'emerald',
  },
  {
    step: '2',
    name: 'Authentication',
    description: 'Test that auth returns proper 401 with JSON error body (not HTML). Agents need machine-readable rejection to handle auth flows programmatically.',
    curl: 'curl -s -o /dev/null -w "%{http_code}" https://api.example.com/protected\ncurl -s -H "Authorization: Bearer invalid_token" https://api.example.com/protected | jq .',
    expect: '401 with JSON: { "error": "unauthorized", "message": "...", "code": "AUTH_REQUIRED" }',
    icon: Lock,
    color: 'blue',
  },
  {
    step: '3',
    name: 'Error responses',
    description: 'Send malformed requests and verify errors come back as structured JSON with error codes — not HTML 500 pages or stack traces.',
    curl: 'curl -s -X POST https://api.example.com/orders -H "Content-Type: application/json" -d \'{"invalid": true}\' | jq .',
    expect: '400 with JSON: { "error": "validation_error", "fields": [{ "field": "items", "message": "required" }] }',
    icon: Shield,
    color: 'amber',
  },
  {
    step: '4',
    name: 'Rate limit headers',
    description: 'Check for X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After headers. Agents use these to throttle requests and avoid bans.',
    curl: 'curl -s -D - https://api.example.com/products 2>&1 | grep -i "rate\\|retry\\|x-ratelimit"',
    expect: 'Headers present: X-RateLimit-Limit: 100, X-RateLimit-Remaining: 99, X-RateLimit-Reset: 1714000000',
    icon: Timer,
    color: 'purple',
  },
  {
    step: '5',
    name: 'OpenAPI spec',
    description: 'Check if a machine-readable API specification exists. This is how agents auto-discover all available endpoints and their schemas.',
    curl: 'curl -s https://api.example.com/openapi.json | jq \'.info.title, .paths | keys[:5]\'',
    expect: 'Valid OpenAPI 3.x document with paths, schemas, and descriptions for every endpoint.',
    icon: FileJson,
    color: 'cyan',
  },
]

const toolComparison = [
  { tool: 'curl', strength: 'Fastest for single-endpoint checks. Scriptable. Ships with every OS. Ideal for CI/CD pipelines and quick agent-readiness spot checks.', agentRelevance: 'Tests exactly what an agent sees: raw HTTP request and response. No UI abstractions. The closest simulation of an agent\'s actual experience.', color: 'emerald' },
  { tool: 'Postman', strength: 'Import OpenAPI specs to auto-generate test collections. Visual response inspection. Environment variables for staging vs production. Team collaboration on test suites.', agentRelevance: 'Collection Runner can test every endpoint in sequence — mimicking an agent\'s discovery flow. Pre-request scripts simulate auth token refresh cycles agents perform.', color: 'blue' },
  { tool: 'Insomnia', strength: 'Lightweight alternative to Postman. Native OpenAPI support. Environment switching between test and production. Plugin ecosystem for custom auth flows.', agentRelevance: 'Environment variables let you test the same endpoints against dev, staging, and prod — verifying consistency across environments, which agents expect.', color: 'purple' },
]

const curlCommands = [
  { name: 'Check for agent-card.json', cmd: 'curl -s https://example.com/.well-known/agent-card.json | jq .', scores: 'D9 Agent Experience: +15 points if present and valid' },
  { name: 'Check for llms.txt', cmd: 'curl -s https://example.com/llms.txt | head -20', scores: 'D9 Agent Experience: +10 points if present' },
  { name: 'Check for OpenAPI spec', cmd: 'curl -s https://example.com/openapi.json | jq .info', scores: 'D2 API Quality: +20 points if valid spec exists' },
  { name: 'Test JSON error handling', cmd: 'curl -s -X DELETE https://example.com/api/nonexistent | jq .', scores: 'D8 Reliability: +12 points for structured error responses' },
  { name: 'Check CORS headers', cmd: 'curl -s -H "Origin: https://agent.example.com" -D - https://example.com/api/health 2>&1 | grep -i "access-control"', scores: 'D7 Security: +5 points for proper CORS configuration' },
  { name: 'Check TLS certificate', cmd: 'curl -vI https://example.com 2>&1 | grep "SSL\\|TLS\\|certificate"', scores: 'D7 Security: Hard cap at 39/100 without TLS' },
  { name: 'Check response time', cmd: 'curl -s -o /dev/null -w "time_total: %{time_total}s\\n" https://example.com/api/health', scores: 'D8 Reliability: Sub-500ms is good, sub-200ms is excellent' },
  { name: 'Check Schema.org markup', cmd: 'curl -s https://example.com | grep -o \'application/ld+json\' | wc -l', scores: 'D6 Data Quality: +8 points for structured data markup' },
  { name: 'Check robots.txt', cmd: 'curl -s https://example.com/robots.txt | head -10', scores: 'D1 Discovery: +3 points, critical for crawler access' },
  { name: 'Check status page', cmd: 'curl -s https://status.example.com | head -5 || echo "No status page"', scores: 'D8 Reliability: +5 points for public status endpoint' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can I really predict my Agent Readiness Score with curl?',
    answer:
      'You can approximate 60-70% of your score with the 10 curl commands in this guide. They test the most heavily weighted dimensions: API quality (D2), security (D7), reliability (D8), and agent experience (D9). The remaining 30-40% comes from deeper analysis that AgentHermes performs — like evaluating response schema consistency, documentation quality, and vertical-specific scoring weights. Run the curl tests first, then run the full AgentHermes scan to see the complete picture.',
  },
  {
    question: 'What is the most impactful single test I can run?',
    answer:
      'Check for an OpenAPI spec: curl -s https://yoursite.com/openapi.json. If this returns a valid OpenAPI 3.x document, your D2 API Quality score jumps significantly. If it returns 404, your API is undiscoverable to agents — they cannot learn what endpoints exist, what parameters they accept, or what responses to expect. The OpenAPI spec is the single highest-leverage artifact for agent readiness.',
  },
  {
    question: 'Should I use Postman or Insomnia?',
    answer:
      'For agent readiness testing specifically, Postman has an edge because of its Collection Runner and ability to import OpenAPI specs directly. You can import your spec, auto-generate requests for every endpoint, and run the full collection — simulating what an agent does during discovery. Insomnia is lighter and faster for quick manual testing. Both work well. If you have neither, curl covers the critical tests.',
  },
  {
    question: 'How do I test if my error responses are agent-friendly?',
    answer:
      'Send requests that should fail: missing auth, invalid JSON body, nonexistent resource IDs, wrong HTTP method on an endpoint. For each, check that the response is JSON (not HTML), includes a machine-readable error code (not just a human message), and returns the correct HTTP status code. If any error returns an HTML page or a 200 status with an error message in the body, that is an agent readiness problem. Agents cannot reliably parse HTML error pages.',
  },
  {
    question: 'What does the AgentHermes scan test that curl cannot?',
    answer:
      'AgentHermes tests 9 dimensions across 50+ checks including: vertical-specific scoring weights (a restaurant is scored differently than a SaaS product), Schema.org structured data parsing, MCP server detection and protocol validation, agent-card.json schema compliance, cross-referencing multiple endpoints for API consistency, documentation quality scoring, and comparison against 500+ scanned businesses. The curl tests cover the binary checks — does this exist or not. AgentHermes evaluates quality and completeness.',
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

export default function ApiTestingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'API Testing Tools and Agent Readiness: How Postman, Insomnia, and curl Verify Your Score',
    description:
      'Practical guide to testing your agent readiness with existing tools. Use Postman, Insomnia, and curl to verify endpoints, auth, error handling, rate limits, and OpenAPI specs.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/api-testing-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Practical Guide',
    wordCount: 1900,
    keywords:
      'API testing tools agent readiness, Postman agent readiness, curl agent readiness test, OpenAPI testing, verify agent readiness score',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'API Testing Tools and Agent Readiness',
          item: 'https://agenthermes.ai/blog/api-testing-agent-readiness',
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
      title="API Testing Tools and Agent Readiness: How Postman, Insomnia, and curl Verify Your Score"
      shareUrl="https://agenthermes.ai/blog/api-testing-agent-readiness"
      currentHref="/blog/api-testing-agent-readiness"
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
            <span className="text-zinc-400">API Testing and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Beaker className="h-3.5 w-3.5" />
              Practical Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Developer Tools
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            API Testing Tools and Agent Readiness:{' '}
            <span className="text-emerald-400">How Postman, Insomnia, and curl Verify Your Score</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            You do not need a specialized scanner to understand your agent readiness. The tools you already
            use — <strong className="text-zinc-100">Postman, Insomnia, and curl</strong> — can test the
            five things that matter most. Here is the exact workflow, with commands you can run right now.
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

      {/* ===== THE 5-STEP TESTING WORKFLOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-emerald-500" />
            The 5-Step Agent Readiness Testing Workflow
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When an AI agent evaluates your API for the first time, it runs through a predictable
              sequence: check health, test authentication, probe error handling, look for rate limits,
              and search for a spec. You can simulate this entire sequence with five curl commands. Each
              step maps directly to a dimension in the{' '}
              <Link href="/blog/testing-your-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Score
              </Link>.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {testingWorkflow.map((test) => {
              const colors = getColorClasses(test.color)
              return (
                <div
                  key={test.step}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <test.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">Step {test.step}</div>
                      <h3 className="text-lg font-bold text-zinc-100">{test.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{test.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/50 mb-2">
                    <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap">{test.curl}</pre>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Expected result:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{test.expect}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 10 CURL COMMANDS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            10 curl Commands That Predict Your Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Each of these commands tests a specific aspect of your agent readiness. Run them against your
              own domain and compare the results with what the{' '}
              <Link href="/blog/checklist-agent-ready-business" className="text-emerald-400 hover:text-emerald-300 underline">
                agent readiness checklist
              </Link>{' '}
              recommends. Together they cover the highest-weighted scoring dimensions.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {curlCommands.map((cmd, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-zinc-100">{i + 1}. {cmd.name}</h3>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/50 mb-2">
                  <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap">{cmd.cmd}</pre>
                </div>
                <p className="text-xs text-zinc-500">
                  <span className="text-amber-400 font-medium">Impact:</span> {cmd.scores}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">After running these 10 commands:</strong> Head to{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                agenthermes.ai/audit
              </Link>{' '}
              and run the full scan. Compare your manual findings with the automated score. The AgentHermes
              scanner tests 50+ checks across 9 dimensions, including vertical-specific weighting that these
              curl commands cannot replicate. But you will already know the major gaps before you scan.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TOOL COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Postman vs Insomnia vs curl for Agent Readiness Testing
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              All three tools can test your agent readiness, but each has different strengths. The best
              choice depends on whether you want quick spot checks (curl), visual exploration (Insomnia),
              or comprehensive automated testing (Postman).
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {toolComparison.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <div
                  key={tool.tool}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`text-lg font-bold mb-3 ${colors.text}`}>{tool.tool}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Strengths</div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{tool.strength}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Agent Readiness Relevance</div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{tool.agentRelevance}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== POSTMAN WORKFLOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Postman Agent Readiness Collection
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              If you have an OpenAPI spec, Postman is the most powerful tool for comprehensive agent
              readiness testing. Here is the workflow we recommend.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Import your OpenAPI spec',
                detail: 'File > Import > paste your openapi.json URL. Postman auto-generates a request for every endpoint with example parameters pre-filled from the schema.',
              },
              {
                step: '2',
                title: 'Create environment variables',
                detail: 'Set up two environments: "Production" and "Staging." Variables: base_url, api_key, auth_token. This lets you verify that both environments return consistent responses — which agents expect.',
              },
              {
                step: '3',
                title: 'Add test scripts to every request',
                detail: 'Postman tests verify: response is JSON (pm.response.to.be.json), status code is correct, response time is under 500ms (pm.response.responseTime < 500), and required fields exist in the body.',
              },
              {
                step: '4',
                title: 'Run the Collection Runner',
                detail: 'Execute all requests in sequence. This simulates an agent discovering your API: first the spec, then auth, then iterating through every endpoint. The runner report shows which requests fail.',
              },
              {
                step: '5',
                title: 'Check the results against the checklist',
                detail: 'Compare your Collection Runner results with the agent readiness checklist. Every failing request is a dimension score reduction. Fix the failures, re-run, and verify improvement before scanning with AgentHermes.',
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
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The key insight is that <strong className="text-zinc-100">Postman Collection Runner mimics
              agent behavior</strong>. An AI agent discovering your API goes through the same sequence:
              fetch spec, authenticate, iterate endpoints, check responses. If your collection passes
              cleanly in Postman, your API will score well when agents evaluate it. If requests fail,
              those are exactly the failures agents will encounter.
            </p>
            <p>
              For businesses that already have an{' '}
              <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                OpenAPI specification
              </Link>, this workflow takes under 30 minutes and gives you a reliable preview of your
              Agent Readiness Score before you run the official scan.
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
                title: 'Testing Your Agent Readiness: The Complete DIY Guide',
                href: '/blog/testing-your-agent-readiness',
                tag: 'Practical Guide',
                tagColor: 'blue',
              },
              {
                title: 'The Agent-Ready Business Checklist',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
                tagColor: 'emerald',
              },
              {
                title: 'OpenAPI and Agent Readiness: Why Your Spec Matters',
                href: '/blog/openapi-agent-readiness',
                tag: 'Technical',
                tagColor: 'purple',
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
            Done testing manually? Run the full scan.
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            The AgentHermes scanner tests 50+ checks across 9 dimensions with vertical-specific
            scoring. Compare your curl results with the automated score in 60 seconds.
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
