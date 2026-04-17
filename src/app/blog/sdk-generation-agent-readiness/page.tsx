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
  FileCode,
  Globe,
  HelpCircle,
  Layers,
  Package,
  Server,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Wand2,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Auto-Generated SDKs: How OpenAPI Specs Let AI Agents Write Their Own Client Libraries | AgentHermes',
  description:
    'When a business publishes an OpenAPI spec, AI agents can auto-generate typed client SDKs in any language. No reading docs, no guessing endpoints. The spec IS the documentation. Learn how SDK generation boosts D2 API Quality.',
  keywords: [
    'SDK generation OpenAPI AI agents',
    'auto-generated SDK',
    'OpenAPI SDK generation',
    'AI agent client library',
    'openapi-generator agents',
    'Speakeasy SDK',
    'Stainless SDK generation',
    'agent readiness API quality',
    'D2 API quality dimension',
  ],
  openGraph: {
    title: 'Auto-Generated SDKs: How OpenAPI Specs Let AI Agents Write Their Own Client Libraries',
    description:
      'When a business publishes an OpenAPI spec, AI agents auto-generate typed client SDKs in any language. No docs, no guessing. The spec IS the documentation.',
    url: 'https://agenthermes.ai/blog/sdk-generation-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Auto-Generated SDKs: How OpenAPI Specs Let AI Agents Write Their Own Client Libraries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto-Generated SDKs: How OpenAPI Lets AI Agents Write Their Own Client Libraries',
    description:
      'AI agents can auto-generate typed SDKs from OpenAPI specs. No docs, no guessing. The spec IS the documentation.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/sdk-generation-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const sdkTools = [
  {
    name: 'openapi-generator',
    description: 'The open-source workhorse. Supports 50+ languages. Community-maintained templates. Any agent running locally can invoke it from the CLI to generate a typed client from any OpenAPI spec in seconds.',
    strength: 'Broadest language support — 50+ targets including Python, TypeScript, Go, Rust, Java, C#, Ruby, Swift, and Kotlin.',
    weakness: 'Generated code can be verbose. Templates require maintenance. No automatic publishing to package registries.',
    color: 'emerald',
    icon: Terminal,
  },
  {
    name: 'Speakeasy',
    description: 'Commercial SDK generator focused on developer experience. Produces idiomatic SDKs that feel hand-written. Used by Vercel, Mistral, and Codat. Auto-publishes to npm, PyPI, and other registries.',
    strength: 'Idiomatic output — generated Python reads like Python, generated TypeScript reads like TypeScript. Auto-versioning and CI/CD integration.',
    weakness: 'Commercial license. Requires a Speakeasy account. Less flexible for custom templating than openapi-generator.',
    color: 'blue',
    icon: Package,
  },
  {
    name: 'Stainless',
    description: 'The tool Stripe uses to generate its official SDKs. Also used by OpenAI, Cloudflare, and Lithic. Produces production-grade SDKs with pagination helpers, retry logic, and streaming support built in.',
    strength: 'Production-grade output with retries, pagination, and streaming. The gold standard for API companies.',
    weakness: 'Enterprise-focused. Not open source. Designed for API-first companies, not general-purpose use.',
    color: 'purple',
    icon: Sparkles,
  },
]

const comparisonRows = [
  { aspect: 'Discovery', withSpec: 'Agent reads openapi.json, knows every endpoint', withoutSpec: 'Agent scrapes HTML docs, guesses parameters' },
  { aspect: 'SDK Generation', withSpec: 'openapi-generator creates typed client in seconds', withoutSpec: 'Agent writes raw HTTP calls, hopes for the best' },
  { aspect: 'Type Safety', withSpec: 'Every request/response has a typed schema', withoutSpec: 'Runtime errors from wrong parameter types' },
  { aspect: 'Error Handling', withSpec: 'Error responses defined in spec, SDK handles them', withoutSpec: 'Agent parses HTML error pages' },
  { aspect: 'Versioning', withSpec: 'SDK pins to API version, upgrades cleanly', withoutSpec: 'Breaking changes crash the agent silently' },
  { aspect: 'Auth', withSpec: 'securitySchemes tell agent exactly how to authenticate', withoutSpec: 'Agent guesses between API key, Bearer, Basic' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can AI agents really generate SDKs automatically?',
    answer:
      'Yes. An AI agent with access to openapi-generator (or any SDK generation tool) can read an OpenAPI spec, run the generator for any target language, and produce a fully typed client library. The agent does not need to understand your API beforehand — the spec provides complete information about endpoints, parameters, authentication, and response schemas.',
  },
  {
    question: 'Does my OpenAPI spec need to be perfect for SDK generation to work?',
    answer:
      'It needs to be valid, not perfect. The generator will produce a working SDK from any valid OpenAPI 3.x spec. However, better specs produce better SDKs. Adding descriptions to parameters, using meaningful operation IDs, and defining all response schemas will make the generated SDK more usable. A minimal valid spec is still far better than no spec at all.',
  },
  {
    question: 'How does SDK generation affect my Agent Readiness Score?',
    answer:
      'SDK generation itself is not directly scored, but the OpenAPI spec that enables it is. D2 API Quality (weighted 0.15 — the highest single dimension) checks for a published OpenAPI spec, valid schema definitions, and documented endpoints. A business with a published OpenAPI spec typically scores 15-20 points higher on D2 than one without.',
  },
  {
    question: 'What if I already publish SDKs manually?',
    answer:
      'Manual SDKs are valuable but limited. You publish SDKs in 3-5 languages. An agent with your OpenAPI spec can generate one in any of 50+ languages in seconds. The spec is the universal source. Think of manual SDKs as a bonus on top of the spec, not a replacement for it. Stripe publishes both — official SDKs via Stainless AND a complete OpenAPI spec.',
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

export default function SdkGenerationAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Auto-Generated SDKs: How OpenAPI Specs Let AI Agents Write Their Own Client Libraries',
    description:
      'When a business publishes an OpenAPI spec, AI agents can auto-generate typed client SDKs in any language. The spec IS the documentation. Tools like openapi-generator, Speakeasy, and Stainless make this possible.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/sdk-generation-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1800,
    keywords:
      'SDK generation, OpenAPI, AI agents, auto-generated SDK, agent readiness, API quality',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'SDK Generation and Agent Readiness',
          item: 'https://agenthermes.ai/blog/sdk-generation-agent-readiness',
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
      title="Auto-Generated SDKs: How OpenAPI Specs Let AI Agents Write Their Own Client Libraries"
      shareUrl="https://agenthermes.ai/blog/sdk-generation-agent-readiness"
      currentHref="/blog/sdk-generation-agent-readiness"
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
            <span className="text-zinc-400">SDK Generation</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Wand2 className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D2 API Quality
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Auto-Generated SDKs: How OpenAPI Specs Let{' '}
            <span className="text-emerald-400">AI Agents Write Their Own Client Libraries</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            When a business publishes an OpenAPI spec, AI agents do not need your documentation.
            They do not need your SDK. They <strong className="text-zinc-100">generate their own</strong> in
            whatever language they are running — in seconds. The spec is the documentation, the contract,
            and the source code all in one file.
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

      {/* ===== THE SHIFT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The Shift: From &ldquo;We Publish an SDK&rdquo; to &ldquo;Agents Generate Their Own&rdquo;
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              For decades, the API lifecycle followed a predictable pattern. You built the API, wrote
              documentation, then published SDKs in the top 3-5 languages your customers used. Python,
              JavaScript, Go, Java, maybe Ruby. Each SDK was hand-maintained, versioned separately, and
              updated weeks after the API itself changed.
            </p>
            <p>
              AI agents break this model completely. An agent does not wait for your SDK team. It reads
              your <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">OpenAPI specification</Link>,
              runs it through a code generator, and produces a typed client library in whatever language it
              needs — Python, Rust, Go, TypeScript, Swift — in under 10 seconds. No human involvement. No
              support ticket. No waiting for the next quarterly SDK release.
            </p>
            <p>
              This is not theoretical. Stripe uses <strong className="text-zinc-100">Stainless</strong> to
              generate its official SDKs from its OpenAPI spec. Vercel and Mistral use{' '}
              <strong className="text-zinc-100">Speakeasy</strong>. The open-source{' '}
              <strong className="text-zinc-100">openapi-generator</strong> project supports 50+ languages.
              The tools exist. The agents know how to use them. The only question is whether your business
              publishes a spec for them to consume.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '50+', label: 'Languages supported', icon: Code2 },
              { value: '0.15', label: 'D2 API weight (highest)', icon: BarChart3 },
              { value: '<10s', label: 'SDK generation time', icon: Zap },
              { value: '85%', label: 'Of 500 lack OpenAPI', icon: Target },
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

      {/* ===== HOW IT WORKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-500" />
            How Agents Generate SDKs from OpenAPI Specs
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The workflow is straightforward. An agent encounters a new API it needs to interact
              with. Instead of reading documentation pages designed for humans, it looks for a machine-readable
              spec. Here is what happens next.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Agent discovers the OpenAPI spec',
                detail: 'The agent checks standard locations: /openapi.json, /openapi.yaml, /api/openapi, or the link in agent-card.json. If the business publishes a spec at any of these paths, the agent finds it automatically.',
                icon: Globe,
              },
              {
                step: '2',
                title: 'Agent validates the spec',
                detail: 'A quick validation pass confirms the spec is valid OpenAPI 3.x, checks for required fields (paths, schemas, securitySchemes), and identifies available endpoints. Invalid specs get rejected here.',
                icon: CheckCircle2,
              },
              {
                step: '3',
                title: 'Agent runs the generator',
                detail: 'The agent invokes openapi-generator (or equivalent) targeting its runtime language. For a Python agent: openapi-generator generate -i spec.json -g python -o ./client. Ten seconds later, a typed client exists.',
                icon: Terminal,
              },
              {
                step: '4',
                title: 'Agent uses the generated SDK',
                detail: 'The generated client has typed methods for every endpoint, handles authentication per the securitySchemes, serializes requests, and deserializes responses. The agent calls client.list_products() instead of crafting raw HTTP requests.',
                icon: Bot,
              },
              {
                step: '5',
                title: 'Agent handles errors with typed exceptions',
                detail: 'Error responses defined in the spec become typed exception classes. The agent catches ProductNotFoundError instead of parsing raw 404 bodies. Retry logic, rate limiting, and pagination are handled by the SDK layer.',
                icon: Layers,
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
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SDK GENERATION TOOLS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-500" />
            The Three SDK Generation Tools Agents Use
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Three tools dominate the SDK generation landscape. Each serves a different use case,
            but all produce the same outcome: a typed client library from an OpenAPI spec.
          </p>

          <div className="space-y-4 mb-8">
            {sdkTools.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <div
                  key={tool.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <tool.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{tool.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-emerald-400 font-medium">Strength:</span>{' '}
                        {tool.strength}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-amber-400 font-medium">Limitation:</span>{' '}
                        {tool.weakness}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WITH SPEC VS WITHOUT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            With OpenAPI Spec vs Without: What Agents Experience
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The difference between a business that publishes an OpenAPI spec and one that does not
            is the difference between a paved road and a dirt trail.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>With OpenAPI Spec</div>
              <div>Without Spec</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-emerald-400">{row.withSpec}</div>
                <div className="text-zinc-500">{row.withoutSpec}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Businesses without an OpenAPI spec force agents to screen-scrape HTML documentation
              pages. The agent has to parse natural language descriptions, guess parameter names and types,
              and hope the examples on the docs page are accurate. It is fragile, slow, and error-prone.
              Any agent that has a choice between a business with a spec and one without will choose the spec
              every time.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORE IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Impact on Your Agent Readiness Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              D2 API Quality carries a <strong className="text-zinc-100">0.15 weight</strong> — the
              highest of any single dimension in the Agent Readiness Score. It is the dimension most
              directly impacted by whether you publish an OpenAPI spec.
            </p>
            <p>
              AgentHermes checks for: published OpenAPI/Swagger spec, valid schema definitions, documented
              endpoints with descriptions, defined securitySchemes, and response schema coverage. A business
              with a complete OpenAPI spec typically scores 15-20 points higher on D2 than one relying on
              HTML documentation alone.
            </p>
            <p>
              But the downstream effects go further. An OpenAPI spec also improves D3 Onboarding (agents
              can self-serve), D6 Data Quality (typed responses), and D9 Agent Experience (structured error
              handling). The single act of publishing a spec ripples across four of nine dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'D2 API Quality (0.15)',
                detail: 'Direct impact. OpenAPI spec presence is the single strongest signal. Companies with published specs average 72 on D2. Companies without average 31.',
              },
              {
                title: 'D3 Onboarding (0.08)',
                detail: 'Agents use the spec to self-onboard. securitySchemes tell them how to authenticate. No human handholding required.',
              },
              {
                title: 'D6 Data Quality (0.10)',
                detail: 'Response schemas in the spec define exactly what structured data agents receive. No guessing, no parsing HTML.',
              },
              {
                title: 'D9 Agent Experience (0.10)',
                detail: 'Error schemas, pagination definitions, and example values in the spec make agent interactions predictable and recoverable.',
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The bottom line:</strong> Publishing an OpenAPI spec is the
              single highest-leverage action a business can take to improve its Agent Readiness Score. It
              directly impacts 43% of the total score weight (D2 + D3 + D6 + D9). If you do one thing
              after reading this article, publish your spec at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/openapi.json</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE STRIPE EXAMPLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileCode className="h-5 w-5 text-blue-500" />
            Case Study: How Stripe Uses Stainless for SDK Generation
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Stripe maintains a comprehensive OpenAPI spec with over 300 endpoints. Instead of manually
              maintaining SDKs in 7 languages, they use <strong className="text-zinc-100">Stainless</strong> to
              generate production-grade SDKs from that spec. Every SDK gets pagination helpers, automatic
              retries with exponential backoff, streaming support, and idiomatic error handling — all derived
              from the spec.
            </p>
            <p>
              This is why Stripe scores <strong className="text-zinc-100">68 Silver</strong> on Agent
              Readiness. An agent interacting with Stripe does not need to read docs.stripe.com. It reads
              the OpenAPI spec, generates a typed client, and starts making API calls with full type safety.
              The spec tells the agent everything: endpoints, parameters, authentication (Bearer token via
              securitySchemes), error formats, and pagination cursors.
            </p>
            <p>
              OpenAI, Cloudflare, and Lithic follow the same pattern. The API-first companies that
              dominate the Silver tier all treat the OpenAPI spec as the source of truth — not the
              documentation site, not the hand-written SDKs. The spec generates everything else.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO PUBLISH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            How to Make Your API SDK-Generation Ready
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Publishing an OpenAPI spec that agents can use for SDK generation takes an afternoon.
            Here is the checklist.
          </p>

          <div className="space-y-3 mb-8">
            {[
              'Serve your OpenAPI 3.x spec at /openapi.json (or /openapi.yaml). CORS-enabled.',
              'Define all endpoints with operationId, summary, and description fields.',
              'Add request body schemas with property types, descriptions, and required markers.',
              'Define response schemas for 200, 400, 401, 404, and 500 status codes.',
              'Include securitySchemes — Bearer, API key, or OAuth 2.0 client_credentials.',
              'Add example values to parameters and response properties.',
              'Reference your spec from agent-card.json and llms.txt for discovery.',
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              For businesses already using frameworks like FastAPI, NestJS, or Spring Boot, the OpenAPI spec
              is often auto-generated from code annotations. The only step is making it publicly accessible.
              For businesses with custom APIs, tools like{' '}
              <Link href="/blog/build-mcp-server-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
                the MCP server tutorial
              </Link>{' '}
              show how to create both the spec and the agent-native interface in a single build session.
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
                title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'How to Build an MCP Server for Your Business',
                href: '/blog/build-mcp-server-tutorial',
                tag: 'Tutorial',
                tagColor: 'emerald',
              },
              {
                title: 'Agent Experience (D9): The Dimension That Measures Agent Usability',
                href: '/blog/agent-experience-dimension',
                tag: 'Dimensions Deep Dive',
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
            Is your API ready for agent-generated SDKs?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your D2 API Quality score and whether agents
            can discover your OpenAPI spec.
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
              href="/blog/openapi-agent-readiness"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Read the OpenAPI Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
