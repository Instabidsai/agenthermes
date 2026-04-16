import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  HelpCircle,
  Key,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Insurance Agent Readiness: Why Allstate Scores 66 While Most Insurers Are Invisible | AgentHermes',
  description:
    'Allstate scored 66 Silver in our 500-business scan. Most insurance carriers are invisible to AI agents. The regulatory layer is not the blocker — here is what agent-ready insurance looks like and what carriers need to ship.',
  keywords: [
    'insurance company agent readiness',
    'insurance agent readiness score',
    'Allstate agent readiness 66',
    'quote API insurance',
    'insurance AI agents',
    'digital claim submission',
    'insurance OpenAPI',
    'insurtech agent economy',
    'policy management API',
  ],
  openGraph: {
    title: 'Insurance Agent Readiness: Why Allstate Scores 66 While Most Insurers Are Invisible',
    description:
      'Allstate 66 Silver. Most carriers invisible. Regulation is not the blocker — Allstate proves compliant plus agent-ready works. Here is the gap.',
    url: 'https://agenthermes.ai/blog/insurance-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Insurance Agent Readiness: Allstate 66, Most Invisible',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Agent Readiness: Why Allstate Scores 66 While Most Insurers Are Invisible',
    description:
      'Allstate 66. Most insurers under 30. Regulation is not the excuse — Allstate proves it.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/insurance-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const allstateWins = [
  {
    title: 'Structured quote API',
    detail: 'Allstate exposes a quote surface an agent can actually read — structured inputs (zip, vehicle, driver), structured outputs (premium, deductible, coverage). Most carriers bury quoting behind a stateful wizard that breaks the moment an agent tries to automate it.',
    icon: Code2,
    color: 'emerald',
  },
  {
    title: 'Digital claim submission',
    detail: 'Claims can be filed without a phone call. Structured fields, photo upload endpoints, and a claim status lookup. Agents can file first notice of loss on behalf of a policyholder and track it to resolution without human handoff.',
    icon: FileText,
    color: 'blue',
  },
  {
    title: 'Documented auth flow',
    detail: 'Policyholder authentication returns a Bearer token that agents can carry through the rest of the journey. Most carriers still require a web-only login with a session cookie that dies the moment you leave the browser.',
    icon: Key,
    color: 'purple',
  },
  {
    title: '401+JSON error contracts',
    detail: 'Failed auth returns a structured JSON error with a code, not an HTML login page. Agents can detect, retry, and recover. This one contract is worth 87% of a 200 on D7 Security alone.',
    icon: ShieldCheck,
    color: 'emerald',
  },
]

const mostCarriersFailures = [
  {
    title: 'Phone-agent-first everything',
    detail: '"Call 1-800 for a quote." There is no machine way through. The entire funnel routes to a licensed human agent with a phone, and the carrier considers that a feature. It is the single biggest score drag across the vertical.',
  },
  {
    title: 'No public quote API',
    detail: 'Even carriers with online quote tools hide them behind JavaScript-heavy wizards that cannot be called programmatically. The data the wizard uses exists — it just is not exposed in a way agents can consume.',
  },
  {
    title: 'PDF policies',
    detail: 'Policy documents are PDFs. Agents cannot parse terms, coverage limits, or endorsements reliably. A policyholder asking "what is my deductible on wind damage" gets a shrug from every agent that does not have a structured policy endpoint.',
  },
  {
    title: 'Claim submission by fax or phone',
    detail: 'In 2026. Yes, really. Mid-market P&C carriers often route claims through a call center or a fax line. Agents cannot file. Policyholders are told to leave the AI and dial a number.',
  },
  {
    title: 'No rate or coverage schema',
    detail: 'Insurance data is inherently structured — rate tables, coverage matrices, state filings. Almost none of it is exposed in JSON-LD, OpenAPI, or an agent card. The data already exists; the publishing step was just skipped.',
  },
]

const buildOrder = [
  { step: '1', title: 'Expose a quote endpoint', detail: 'POST /quote with structured inputs, 200 JSON with premium, deductible, coverage breakdown, and a quote_id. Auth-optional at first — rate-limit aggressively and require API key for higher volumes. This one endpoint moves D2 API Quality from 0 to 50+.' },
  { step: '2', title: 'Publish OpenAPI spec', detail: 'Document the quote endpoint (and every other public surface) in OpenAPI 3.1. Lives at /openapi.json. This is the single highest-weighted artifact in the Agent Readiness Score (D2 at 0.15).' },
  { step: '3', title: 'Policy lookup endpoint', detail: 'GET /policies/:id returning structured coverage data — limits, deductibles, endorsements, renewal date. Auth required. Agents use this to answer policyholder questions without human intervention.' },
  { step: '4', title: 'Claim submission endpoint', detail: 'POST /claims with first notice of loss fields, photo upload URLs, structured incident data. 201 response with claim_id and tracking URL. GET /claims/:id for status. Removes the phone call.' },
  { step: '5', title: 'Agent card at /.well-known/', detail: 'agent-card.json declaring the skills: quote, policy-lookup, claim-file, claim-status, payment. Links to OpenAPI. Zero carriers scanned publish this. First-mover credit is huge.' },
  { step: '6', title: 'x402 for quotes', detail: 'Agents calling your quote endpoint pay per-quote in USDC. Removes the signup friction for third-party agent marketplaces and creates a revenue line independent of policy binds.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does insurance regulation actually prevent agent readiness?',
    answer:
      'No — and Allstate is the proof. Allstate operates in every state, complies with every state insurance board, and still scores 66 Silver on Agent Readiness. The regulatory framework controls what you can quote, sell, and pay out on. It does not control whether your surface area is machine-readable. Carriers who blame regulators for their score are really blaming their own product roadmap. The states do not require you to hide your quote API behind a phone tree.',
  },
  {
    question: 'Why does Allstate specifically score 66 and not higher?',
    answer:
      'Allstate scores 66 on the strength of their digital surface — structured quoting, digital claims, documented auth, JSON error contracts. They lose points on the agent-native dimensions: no agent-card.json, no MCP server, no x402 payment support, no llms.txt. The gap between Silver and Gold is entirely in agent-first signals. Allstate is an agent-adjacent carrier that stopped short of being agent-native. That leaves room for a faster-moving competitor to leapfrog them into Gold.',
  },
  {
    question: 'What category of insurance is easiest to ship agent readiness for?',
    answer:
      'Personal auto and personal property are the easiest. The data is commodity-grade, the inputs are well-defined (VIN, address, driver demographics), and most carriers already have digital rating engines internally. Life insurance is harder because of medical underwriting. Commercial lines are harder because of bespoke underwriting. But every carrier that writes personal auto can ship a quote endpoint in a quarter if the product team prioritizes it.',
  },
  {
    question: 'Does shipping an agent-ready surface cannibalize captive-agent business?',
    answer:
      'This is the real question, and the answer depends on strategy. Carriers that lean on captive-agent distribution (Allstate, State Farm, Farmers) tend to hedge — they ship digital surfaces but keep them just friction-heavy enough that captive agents stay in the loop. Carriers without captive channels (GEICO, Progressive direct, Lemonade) lean harder into digital. Both can score well; the path just differs. The honest answer: if your distribution strategy depends on humans gatekeeping quotes, your agent readiness ceiling is capped around 50.',
  },
  {
    question: 'Is x402 realistic for insurance specifically?',
    answer:
      'Yes, for quotes. A quote is a discrete unit of work with a clear cost — rate pull, underwriting logic, network call to bureau. Pricing it at a sub-cent per-call via x402 makes sense for agent-driven comparison flows (a rate-shopping agent calls 10 carriers in parallel, pays each per quote, returns the cheapest to the user). Paying for the bind itself still routes through the traditional payment rail — x402 is not replacing ACH for premium collection, just the agent-facing quote step.',
  },
  {
    question: 'What about HIPAA for health insurance specifically?',
    answer:
      'HIPAA governs PHI disclosure. It does not prohibit structured APIs, OpenAPI specs, or agent cards. Health carriers can ship a provider-directory API, a plan-finder API, and a formulary API without ever touching PHI. Patient-specific endpoints need HIPAA-grade auth — which agents can absolutely handle via OAuth 2.0 with proper consent. Compliance is a design constraint, not a blocker. The carriers that score the worst on agent readiness in healthcare are using HIPAA as an excuse for shipping none of the safe surfaces.',
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

export default function InsuranceAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Insurance Agent Readiness: Why Allstate Scores 66 While Most Insurers Are Invisible',
    description:
      'Allstate scored 66 Silver in the 500-business scan. Most insurance carriers are invisible to agents. Regulation is not the blocker. Here is what agent-ready insurance looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/insurance-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'insurance company agent readiness, Allstate agent readiness, quote API insurance, insurance AI agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Insurance Agent Readiness',
          item: 'https://agenthermes.ai/blog/insurance-agent-readiness',
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
      title="Insurance Agent Readiness: Why Allstate Scores 66 While Most Insurers Are Invisible"
      shareUrl="https://agenthermes.ai/blog/insurance-agent-readiness"
      currentHref="/blog/insurance-agent-readiness"
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
            <span className="text-zinc-400">Insurance Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Allstate — 66 Silver
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Insurance Agent Readiness:{' '}
            <span className="text-emerald-400">Why Allstate Scores 66 While Most Insurers Are Invisible</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Allstate scored <strong className="text-zinc-100">66 Silver</strong> in the 500-business
            AgentHermes scan — one of the rare large-enterprise carriers to clear the Silver bar.
            Most of the rest of the insurance industry sits well below 30, deep in the Unaudited tier.
            The regulatory layer is not the excuse. Allstate proves compliant plus agent-ready works.
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
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE DATA ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The Insurance Score Distribution
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Across the insurance carriers AgentHermes has scanned — personal auto, home, life, and
              health — the distribution is bimodal. A handful of large publicly-traded carriers cluster
              in the Silver band (Allstate 66, with a few peers 3-8 points behind). Everyone else sits
              in a long tail between 15 and 35, deep below Bronze.
            </p>
            <p>
              The polarization tracks almost perfectly with one variable:{' '}
              <strong className="text-zinc-100">whether the carrier ever built a public, structured
              quote API</strong>. Carriers that did sit at 50+. Carriers that did not are invisible.
              Regulation is the same for both groups. Product investment is the only real split.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '66', label: 'Allstate (Silver)', icon: TrendingUp },
              { value: '<30', label: 'most carriers avg', icon: XCircle },
              { value: '0', label: 'carriers with agent-card', icon: FileText },
              { value: '0', label: 'carriers with MCP', icon: Code2 },
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

      {/* ===== WHAT ALLSTATE GETS RIGHT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Why Allstate Scores 66
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Four decisions separate Allstate from the invisible majority. None of them required a new
            Federal law. All of them required shipping product.
          </p>

          <div className="space-y-4 mb-8">
            {allstateWins.map((win) => {
              const colors = getColorClasses(win.color)
              return (
                <div
                  key={win.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <win.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{win.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{win.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Notice what Allstate does <strong className="text-zinc-100">not</strong> do: they do not
              publish an agent-card.json, do not serve an MCP server, do not support x402, and do not
              have an llms.txt at root. That is why they stop at 66 instead of pushing into Gold. The
              ceiling between Allstate and Resend (the only Gold at 75) is entirely in the agent-native
              layer.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY MOST CARRIERS FAIL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Why Most Insurance Companies Are Invisible
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five patterns keep showing up on invisible carriers. Each is a product decision, not a
            legal one.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {mostCarriersFailures.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 mb-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The phone-first trap:</strong> every carrier that routes
              to &ldquo;call 1-800&rdquo; for the core transactions is telling the agent economy no. An
              agent in an AI assistant session will not place a phone call. It will recommend whichever
              carrier picks up via API. The market share transfer is already visible in agent-driven
              quote-comparison flows — carriers without a quote endpoint simply never enter the
              consideration set.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE REGULATORY MYTH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Regulatory Layer Is Not the Blocker
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every carrier below Bronze, asked why they lack a quote API, has the same answer: state
              insurance boards. &ldquo;We are regulated.&rdquo; The theory is that regulation prevents
              programmatic quoting, licensed-producer-only distribution, or machine-generated
              underwriting decisions.
            </p>
            <p>
              That theory does not survive the Allstate counterexample. Allstate is regulated in all 50
              states and still ships a structured quote surface, digital claims, and documented auth.
              They also happen to be compliant. The state boards do not require phone-only distribution,
              do not prohibit OpenAPI specs, and do not mandate PDF policies. They require specific
              disclosures at specific points in the flow, which is easy to add to any API response.
            </p>
            <p>
              The real blocker is the distribution-channel politics inside each carrier. Captive agents
              and independent agents have revenue tied to being the gate. Every product decision to
              ship machine-readable surface area passes through those political waters. That is a
              real problem — just not a regulatory one. Carriers with healthier direct channels
              (Progressive Direct, GEICO, Lemonade) move faster because the internal politics are
              simpler.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY INSURANCE LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Build Order for Agent-Ready Insurance
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Ordered by score impact per month of product work. A carrier starting at 20 can reach
            Allstate-adjacent (60+) in two quarters by working this list in sequence.
          </p>

          <div className="space-y-3 mb-8">
            {buildOrder.map((item) => (
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
              Steps 1 and 2 alone lift a carrier from Unaudited into the high 40s. Add 3 and 4 and
              you clear Bronze with room. Steps 5 and 6 are pure agent-native signal — and because{' '}
              <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                zero insurance carriers currently ship agent-card.json
              </Link>
              , the first one to do it gets first-mover credit in every agent-driven quote-comparison
              flow for the next 12-18 months.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AGENT QUOTE SHOPPING SCENARIO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            The Rate-Shopping Agent Scenario
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A policyholder opens an AI assistant and says: &ldquo;my auto policy renews in 30 days,
              find me a cheaper option with the same coverage.&rdquo; The agent pulls the current
              policy from the existing carrier (if the carrier has a policy API), extracts the coverage
              matrix, and fans out quote requests to 10 carriers in parallel.
            </p>
            <p>
              Carriers with structured quote APIs return a premium and deductible in 2 seconds.
              Carriers without are skipped. The agent ranks the responses, presents the top three to
              the user, and offers to bind the cheapest on the spot.
            </p>
            <p>
              In this flow, <strong className="text-zinc-100">the carriers without a quote API never
              enter the consideration set</strong>. They do not lose the comparison — they are not in
              the comparison. The user never hears their name. Market share transfer happens silently,
              one renewal at a time, across millions of policies per year.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The compounding advantage:</strong> every quote an
              agent pulls teaches the agent which carriers respond reliably, return structured data,
              and bind cleanly. Fast-responding carriers get re-selected. Slow and silent carriers get
              pruned. The distribution channel is self-reinforcing once the agents are in the loop.
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

      {/* ===== RELATED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12',
                href: '/blog/fintech-agent-readiness',
                tag: 'Industry Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Professional Services Agent Readiness: Law, Accounting, Consulting',
                href: '/blog/professional-services-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'OpenAPI Is the Single Biggest Factor in Agent Readiness (D2 = 15%)',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Deep Dive',
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
            See how your carrier scores
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run your domain through the AgentHermes scanner in 60 seconds. See exactly where you stand
            against Allstate on all 9 dimensions — and what it takes to close the gap.
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
