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
  FileCode2,
  FileText,
  HelpCircle,
  Layers,
  Link2,
  Network,
  Sparkles,
  Target,
  Terminal,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'AGENTS.md: The README File That AI Agents Actually Read | AgentHermes',
  description:
    'AGENTS.md is the README.md equivalent for AI agents. Structured for LLM consumption, it tells an agent what your project is, how to run it, what tools exist, and which workflows are supported. Here is the standard, a copy-paste template, and why it lifts D6 Data Quality and D9 Agent Experience.',
  keywords: [
    'AGENTS.md file',
    'AGENTS.md standard',
    'agents.md vs readme',
    'agents.md template',
    'LLM readme',
    'agent readme file',
    'AGENTS.md markdown',
    'agent documentation file',
    'agent-readable docs',
  ],
  openGraph: {
    title: 'AGENTS.md: The README File That AI Agents Actually Read',
    description:
      'AGENTS.md is the structured README for LLMs. Here is what goes in it, where to put it, and why it lifts your Agent Readiness Score.',
    url: 'https://agenthermes.ai/blog/agents-md-file-guide',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AGENTS.md File Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGENTS.md: The README File That AI Agents Actually Read',
    description:
      'AGENTS.md is the LLM-structured README. Copy-paste template, scoring impact, and how it differs from llms.txt.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agents-md-file-guide',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const sections = [
  {
    name: 'Project Purpose',
    description: 'One paragraph stating what the project does, who it is for, and the outcome it produces. No marketing prose — agents will quote this verbatim when asked what the project is, so accuracy wins over enthusiasm.',
    example: '# What this is\nSaaS invoicing API for freelance consultants. Generates, sends, and reconciles Stripe-powered invoices. Ruby on Rails backend, React dashboard.',
    icon: Target,
    color: 'emerald',
  },
  {
    name: 'How to Run',
    description: 'The literal commands an agent should execute to stand the project up. Include expected output, port numbers, environment variables, and any one-shot setup scripts. Agents copy-paste from this section — keep it unambiguous.',
    example: '# Run\npnpm install\npnpm db:seed\npnpm dev # listens on :3000',
    icon: Terminal,
    color: 'blue',
  },
  {
    name: 'Key Commands',
    description: 'Lint, typecheck, test, build, and deploy commands with their pass criteria. Without this, agents run npm run and hope. With it, they run npm run typecheck and know a 0-exit code means typecheck passed.',
    example: '# Verify\npnpm lint         # 0 warnings required\npnpm typecheck    # must pass\npnpm test         # 380 tests',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    name: 'Agent-Callable Tools',
    description: 'Any MCP tools, REST endpoints, or A2A skills the agent should use instead of reinventing functionality. This is what separates an AGENTS.md from a README — you are publishing a tool menu to the LLM.',
    example: '# Tools\nMCP: create_invoice, send_invoice, reconcile_payment\nREST: GET /api/invoices, POST /api/invoices',
    icon: Code2,
    color: 'cyan',
  },
  {
    name: 'Auth Requirements',
    description: 'Which endpoints require auth, what kind (Bearer, OAuth, API key), and how to obtain credentials in a dev environment. Agents that cannot figure out auth burn minutes guessing; a crisp auth block saves the whole session.',
    example: '# Auth\nBearer token. Dev: STRIPE_TEST_KEY=sk_test_... in .env.local',
    icon: Network,
    color: 'amber',
  },
  {
    name: 'Example Workflows',
    description: 'End-to-end task recipes: "to add a new invoice template, do X, Y, Z." These are the highest-value section because they encode tribal knowledge that would otherwise cost an agent 5 exploratory tool calls to figure out.',
    example: '# Workflow: add new template\n1. Copy templates/base.liquid\n2. Register in config/templates.yml\n3. Run pnpm templates:sync',
    icon: Sparkles,
    color: 'emerald',
  },
]

const readmeVsAgentsMd = [
  { aspect: 'Primary reader', readme: 'Human developer', agentsmd: 'LLM / AI agent' },
  { aspect: 'Tone', readme: 'Friendly, marketing-aware', agentsmd: 'Structured, assertion-first' },
  { aspect: 'Section shape', readme: 'Free-form prose', agentsmd: 'Predictable H1/H2 sections' },
  { aspect: 'Commands', readme: 'Often narrative', agentsmd: 'Copy-paste code blocks' },
  { aspect: 'Tool inventory', readme: 'Rarely included', agentsmd: 'Required section' },
  { aspect: 'Auth guidance', readme: 'Points to external docs', agentsmd: 'Inline and concrete' },
  { aspect: 'Assumed context', readme: 'Humans know what a repo is', agentsmd: 'Zero — declare everything' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is AGENTS.md?',
    answer:
      'AGENTS.md is a markdown file, placed at the root of a code repository or the root of a business domain, that documents the project specifically for AI agents to consume. It has a predictable section structure (purpose, run, commands, tools, auth, workflows) and is written in a tone LLMs parse reliably. Think of it as README.md for machines.',
  },
  {
    question: 'Where do I put AGENTS.md?',
    answer:
      'For code projects: at the repository root, alongside README.md. For business websites: at the domain root, accessible as /agents.md. The file must be publicly readable with no authentication, because agents need to fetch it during discovery before they have credentials. Agents follow the same convention as the humans-oriented README but read a different file.',
  },
  {
    question: 'How is AGENTS.md different from llms.txt?',
    answer:
      'llms.txt is about website content — it lists which pages on your site are important and what LLMs should read to understand your domain. AGENTS.md is about project and tool context — it tells an agent what the project does, how to run it, and which tools it can call. Websites often ship both: llms.txt as a content map, AGENTS.md as an operating manual.',
  },
  {
    question: 'Does AGENTS.md affect my Agent Readiness Score?',
    answer:
      'Yes. AgentHermes detects AGENTS.md during a scan and adds points to D6 Data Quality (weight 0.10) and D9 Agent Experience (weight 0.10). Combined that is 20% of the total score impacted by a single markdown file. Sites that publish a well-formed AGENTS.md also tend to rank higher across D3 Onboarding because the section on key commands doubles as onboarding guidance for an agent.',
  },
  {
    question: 'Do I need to write AGENTS.md by hand?',
    answer:
      'No. If you connect a business to AgentHermes, the platform auto-generates an AGENTS.md from your existing business data, MCP tool inventory, and A2A agent card. You can override any section, but the starting point is already aligned with the spec. For code repos, the same generator accepts a package.json / pyproject / go.mod and outputs a first draft you can edit.',
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

export default function AgentsMdFileGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AGENTS.md: The README File That AI Agents Actually Read',
    description:
      'AGENTS.md is the README.md equivalent for AI agents. Structured for LLM consumption, it tells an agent what the project is, how to run it, and what tools exist.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agents-md-file-guide',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Standards Guide',
    wordCount: 1800,
    keywords:
      'AGENTS.md, AGENTS.md file, agent readme, llm readme, AGENTS.md template, agent-readable docs',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'AGENTS.md File Guide',
          item: 'https://agenthermes.ai/blog/agents-md-file-guide',
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

  const template = `# AGENTS.md

## What this is
One-paragraph description of the project, its users, and its outcome.

## How to run
\`\`\`bash
pnpm install
pnpm db:seed
pnpm dev
\`\`\`

## Key commands
- \`pnpm lint\` - 0 warnings required
- \`pnpm typecheck\` - must pass
- \`pnpm test\` - full suite, ~45 seconds
- \`pnpm build\` - production build

## Agent-callable tools
- MCP: \`create_invoice\`, \`send_invoice\`, \`reconcile_payment\`
- REST: \`GET /api/invoices\`, \`POST /api/invoices\`
- A2A: skill \`invoice_specialist\` at \`/.well-known/agent-card.json\`

## Auth
Bearer token on all \`/api/*\` routes.
Dev: set \`STRIPE_TEST_KEY=sk_test_...\` in \`.env.local\`.

## Example workflows
### Add a new invoice template
1. Copy \`templates/base.liquid\` to \`templates/<name>.liquid\`.
2. Register in \`config/templates.yml\` with type and default fields.
3. Run \`pnpm templates:sync\` to regenerate the schema.

### Reconcile a payment
1. Call MCP \`reconcile_payment({ invoice_id, stripe_charge_id })\`.
2. Confirm the invoice status is \`paid\`.
3. Emit webhook via \`pnpm webhooks:fire paid\`.
`

  return (
    <BlogArticleWrapper
      title="AGENTS.md: The README File That AI Agents Actually Read"
      shareUrl="https://agenthermes.ai/blog/agents-md-file-guide"
      currentHref="/blog/agents-md-file-guide"
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
            <span className="text-zinc-400">AGENTS.md File Guide</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <FileCode2 className="h-3.5 w-3.5" />
              Standards Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Copy-Paste Template
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            AGENTS.md:{' '}
            <span className="text-emerald-400">The README File That AI Agents Actually Read</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            README.md is for humans. <strong className="text-zinc-100">AGENTS.md is for AI agents.</strong>{' '}
            Same location (repo or domain root), same markdown, different audience — and a very
            different payoff. A well-formed AGENTS.md lifts two 10%-weight dimensions of your Agent
            Readiness Score and cuts the time an agent needs to become productive from minutes to
            seconds. Here is the spec, a copy-paste template, and why it is the cheapest score
            improvement you can ship this week.
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

      {/* ===== WHAT IS AGENTS.MD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-500" />
            What AGENTS.md Is
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AGENTS.md is a plain markdown file that lives at the root of a code repository (for
              software projects) or at the root of a business domain (for websites). Its purpose is
              simple: tell an AI agent everything it needs to become productive in your project or
              business, in a format optimized for LLM consumption rather than human reading.
            </p>
            <p>
              The convention mirrors how README.md works. Any developer who clones a new repo looks
              for README.md first. Any agent dropped into a new project will look for AGENTS.md
              first. When it finds one, the agent can skip exploratory tool calls, stop guessing at
              build commands, and move directly to useful work. When it does not, the agent reads
              README.md and tries to reverse-engineer everything it needs — which costs time, money,
              and quality.
            </p>
            <p>
              AGENTS.md is <strong className="text-zinc-100">not</strong> marketing copy,{' '}
              <strong className="text-zinc-100">not</strong> a changelog,{' '}
              <strong className="text-zinc-100">not</strong> a philosophical mission statement. It is
              an operating manual: project purpose, how to run, key commands, tool inventory, auth,
              and example workflows. Every section is load-bearing.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '6', label: 'canonical sections', icon: Layers },
              { value: '0.10', label: 'D6 Data Quality weight', icon: BarChart3 },
              { value: '0.10', label: 'D9 Agent Experience weight', icon: Bot },
              { value: '20%', label: 'combined score impact', icon: Zap },
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

      {/* ===== README VS AGENTS.MD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            README.md vs AGENTS.md
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            They are siblings, not replacements. Most projects should ship both. The comparison
            clarifies why the differences matter in practice.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>README.md (Humans)</div>
              <div>AGENTS.md (Agents)</div>
            </div>
            {readmeVsAgentsMd.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.readme}</div>
                <div className="text-emerald-400">{row.agentsmd}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The single biggest difference is <strong className="text-zinc-100">assumed context</strong>.
              A human reading README.md knows what Git is, how npm works, and what a localhost port
              looks like. An agent parsing AGENTS.md should not assume any of that — the file
              declares everything explicitly, and that discipline is what makes it useful.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 6 SECTIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            The 6 Canonical Sections
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The AGENTS.md convention defines six sections in a specific order. Agents parse them by
              H1/H2 headings, so the exact names matter. You can add more sections below — many teams
              add a &ldquo;Gotchas&rdquo; or &ldquo;Non-Obvious Patterns&rdquo; section — but the six
              below are the minimum.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {sections.map((section, i) => {
              const colors = getColorClasses(section.color)
              return (
                <div
                  key={section.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <section.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 font-mono">Section {i + 1}</div>
                      <h3 className="text-lg font-bold text-zinc-100">{section.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{section.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <pre className={`${colors.text} text-xs whitespace-pre-wrap font-mono`}>
                      {section.example}
                    </pre>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TEMPLATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Copy-Paste Template
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Drop this into the root of your repo, edit every placeholder, commit, and you have a
            compliant AGENTS.md. Keep it under 250 lines — agents re-read it on every task, so every
            line must pay for itself.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-6">
            <div className="bg-zinc-800/50 px-4 py-2 text-xs font-mono text-zinc-400 border-b border-zinc-800">
              AGENTS.md
            </div>
            <pre className="p-4 text-xs text-emerald-300 bg-zinc-900/80 overflow-x-auto font-mono leading-relaxed">
{template}
            </pre>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Ship it as <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/AGENTS.md</code>{' '}
              at the repo root (for code) or at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                https://yourdomain.com/agents.md
              </code>{' '}
              for a business site. No auth, no redirects, no paywall. Agents will probe both paths
              during discovery — a 200 response with a valid markdown body is all they need.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            What AGENTS.md Does for Your Agent Readiness Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The AgentHermes scanner checks for AGENTS.md on every audit. When it finds one, two
              dimensions benefit directly:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  Weight 0.10
                </span>
                <h3 className="font-bold text-zinc-100">D6 Data Quality</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                AGENTS.md shows you have structured, machine-readable documentation. The scanner
                gives additional credit when the file uses the 6 canonical sections, includes
                runnable code blocks, and declares explicit tool inventories.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  Weight 0.10
                </span>
                <h3 className="font-bold text-zinc-100">D9 Agent Experience</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                D9 measures how easily an agent can become productive on your surface. A crisp
                workflow section, explicit auth guidance, and named commands are exactly the signals
                D9 rewards. Sites with AGENTS.md typically gain 8–12 points on D9 alone.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Combined, that is 20% of the total Agent Readiness Score touched by a single markdown
              file. For below-Bronze scores (under 40), AGENTS.md alone can be the difference between
              a 38 and a 46 — crossing the line from &ldquo;not scored&rdquo; into Bronze tier and
              onto the{' '}
              <Link href="/leaderboard" className="text-emerald-400 hover:text-emerald-300 underline">
                public leaderboard
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LLMS.TXT RELATIONSHIP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Link2 className="h-5 w-5 text-blue-500" />
            AGENTS.md vs llms.txt (Both, Not Either)
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AGENTS.md and{' '}
              <Link href="/blog/llms-txt-standard-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                llms.txt
              </Link>{' '}
              are frequently confused. They serve complementary purposes:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-zinc-100 mb-2 text-sm">llms.txt answers: what should an LLM read?</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                It is a content map. A prioritized list of URLs on your site that LLMs should fetch
                to understand your business. Lives at /llms.txt.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-zinc-100 mb-2 text-sm">AGENTS.md answers: how does an agent operate here?</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                It is an operating manual. Purpose, commands, tools, auth, workflows. Lives at
                /AGENTS.md (repo) or /agents.md (domain).
              </p>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Publish both. llms.txt tells an LLM what to read when researching your business.
              AGENTS.md tells an agent how to act once it decides to engage. Together they turn your
              site from a static destination into an agent-operable surface.
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
                title: 'llms.txt: The Single File 95% of Businesses Are Missing',
                href: '/blog/llms-txt-standard-guide',
                tag: 'Standards Guide',
                tagColor: 'emerald',
              },
              {
                title: 'What Is agent-card.json? The Missing File on 500 Business Websites',
                href: '/blog/agent-card-json-guide',
                tag: 'Standards Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
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
            Get AGENTS.md auto-generated for your business
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness scan to see whether your site already ships AGENTS.md.
            Connect your business and AgentHermes will generate a compliant file plus matching
            llms.txt and agent-card.json.
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
