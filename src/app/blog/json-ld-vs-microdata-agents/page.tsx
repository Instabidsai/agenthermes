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
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Search,
  Server,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'JSON-LD vs Microdata: Which Structured Data Format AI Agents Prefer | AgentHermes',
  description:
    'JSON-LD wins for AI agents: separate from HTML, easy to parse, no DOM traversal. Microdata is embedded in HTML and harder for agents. Google recommends JSON-LD. Migration guide included.',
  keywords: [
    'JSON-LD vs microdata AI agents',
    'JSON-LD structured data',
    'microdata vs JSON-LD',
    'structured data AI agents',
    'JSON-LD for agents',
    'schema markup agents',
    'agent readiness structured data',
    'JSON-LD migration guide',
    'D6 data quality',
  ],
  openGraph: {
    title:
      'JSON-LD vs Microdata: Which Structured Data Format AI Agents Prefer',
    description:
      'JSON-LD wins for AI agents. Separate from HTML, no DOM traversal, machine-parseable in milliseconds. Microdata is embedded in markup and harder to extract. Migration guide: microdata to JSON-LD in 20 minutes.',
    url: 'https://agenthermes.ai/blog/json-ld-vs-microdata-agents',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSON-LD vs Microdata for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'JSON-LD vs Microdata: Which Structured Data Format AI Agents Prefer',
    description:
      'JSON-LD wins. Separate from HTML, no DOM needed, Google recommends it, agents parse it 10x faster than microdata. Here is how to migrate in 20 minutes.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/json-ld-vs-microdata-agents',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  {
    aspect: 'Location in HTML',
    jsonLd: 'Separate <script> block in <head> or <body>',
    microdata: 'Inline attributes (itemscope, itemprop) throughout HTML',
    winner: 'json-ld',
  },
  {
    aspect: 'Parsing by agents',
    jsonLd: 'JSON.parse() on script content — instant',
    microdata: 'Requires full DOM traversal + attribute extraction',
    winner: 'json-ld',
  },
  {
    aspect: 'Page rendering needed',
    jsonLd: 'No — data extractable without rendering',
    microdata: 'Often yes — embedded in rendered HTML structure',
    winner: 'json-ld',
  },
  {
    aspect: 'Google recommendation',
    jsonLd: 'Preferred format per Google documentation',
    microdata: 'Supported but not preferred',
    winner: 'json-ld',
  },
  {
    aspect: 'Maintenance burden',
    jsonLd: 'One block to maintain, independent of UI changes',
    microdata: 'Scattered across templates — breaks when UI changes',
    winner: 'json-ld',
  },
  {
    aspect: 'Multiple entity support',
    jsonLd: 'Array of objects in single script block via @graph',
    microdata: 'Requires nested itemscope blocks throughout DOM',
    winner: 'json-ld',
  },
  {
    aspect: 'Schema.org coverage',
    jsonLd: 'Full coverage — all types and properties',
    microdata: 'Full coverage — same vocabulary, different syntax',
    winner: 'tie',
  },
  {
    aspect: 'Agent Readiness Score impact',
    jsonLd: 'Direct boost to D6 Data Quality (0.10 weight)',
    microdata: 'Partial credit — agents can extract but with more effort',
    winner: 'json-ld',
  },
]

const migrationSteps = [
  {
    step: '1',
    title: 'Identify existing microdata',
    detail:
      'Search your HTML for itemscope, itemtype, and itemprop attributes. These are your microdata annotations. List every Schema.org type you are using (LocalBusiness, Product, Event, etc.).',
  },
  {
    step: '2',
    title: 'Map properties to JSON-LD',
    detail:
      'For each itemscope block, create a corresponding JSON-LD object with @context, @type, and all itemprop values mapped to JSON keys. The property names are identical — only the syntax changes.',
  },
  {
    step: '3',
    title: 'Add the script block',
    detail:
      'Place a <script type="application/ld+json"> tag in your <head> (preferred) or just before </body>. Paste the JSON-LD object. For multiple entities, use @graph array notation.',
  },
  {
    step: '4',
    title: 'Validate with testing tools',
    detail:
      'Use Google Rich Results Test (search.google.com/test/rich-results) and Schema.org Validator (validator.schema.org) to confirm the JSON-LD is valid and complete.',
  },
  {
    step: '5',
    title: 'Remove old microdata (optional)',
    detail:
      'Once JSON-LD is validated, you can optionally remove the microdata attributes from your HTML. Having both is not harmful — Google deduplicates — but it simplifies maintenance.',
  },
]

const agentBenefits = [
  {
    title: 'No DOM traversal required',
    description:
      'Agents extract JSON-LD by finding script[type="application/ld+json"] and calling JSON.parse(). No CSS selectors, no tree walking, no attribute matching. A lightweight HTTP client with zero browser capabilities can extract all structured data.',
    icon: Zap,
    color: 'emerald',
  },
  {
    title: 'No page rendering needed',
    description:
      'Microdata is embedded in rendered HTML, which means agents may need to execute JavaScript to see dynamically-inserted microdata. JSON-LD in the initial HTML response is available without rendering — critical for agents that use HTTP requests instead of headless browsers.',
    icon: Server,
    color: 'blue',
  },
  {
    title: 'Clean separation of data and presentation',
    description:
      'When your UI team redesigns a page, JSON-LD stays untouched because it is in a separate block. Microdata attributes mixed into HTML templates break when developers restructure DOM elements. Agents get reliable data regardless of UI changes.',
    icon: Layers,
    color: 'purple',
  },
  {
    title: 'Multiple entities in one block',
    description:
      'A single JSON-LD @graph can describe a LocalBusiness, its Products, its OpeningHours, and its reviews in one parseable object. Microdata requires separate nested itemscope blocks scattered through the page — harder for agents to associate related entities.',
    icon: FileJson,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does AgentHermes check for JSON-LD specifically?',
    answer:
      'Yes. AgentHermes checks for structured data in the D6 Data Quality dimension (0.10 weight). It specifically looks for JSON-LD script blocks and evaluates the Schema.org types present. Microdata is also detected but JSON-LD contributes more to the score because it is easier for agents to parse reliably.',
  },
  {
    question: 'Can I have both JSON-LD and microdata on the same page?',
    answer:
      'Yes. Google and other consumers deduplicate structured data from multiple sources on the same page. Having both is not harmful, but it creates maintenance burden. The recommended approach is to migrate to JSON-LD and optionally remove microdata afterward.',
  },
  {
    question: 'What about RDFa? How does it compare?',
    answer:
      'RDFa is a third structured data format that embeds metadata in HTML attributes (similar to microdata but with a different syntax). It has the same agent-unfriendly problem as microdata: data is mixed into HTML and requires DOM traversal to extract. JSON-LD is preferred over both RDFa and microdata for agent readiness.',
  },
  {
    question: 'How much does JSON-LD improve my Agent Readiness Score?',
    answer:
      'JSON-LD with relevant Schema.org types (LocalBusiness, Product, Service, Event, FAQ) directly improves D6 Data Quality, which carries 0.10 weight in the overall score. Combined with other D6 factors (JSON API responses, content negotiation), this dimension can contribute up to 10 points. For a business scoring 30/100, adding comprehensive JSON-LD could push the score to 35-38.',
  },
  {
    question: 'Which Schema.org types matter most for agent readiness?',
    answer:
      'The types that agents use most: LocalBusiness (or specific subtypes like Restaurant, Dentist), Product, Service, Event, FAQPage, OpeningHoursSpecification, and AggregateRating. Each type should include all recommended properties. A LocalBusiness with just name and address is far less useful than one with hours, services, price ranges, and reviews.',
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

export default function JsonLdVsMicrodataAgentsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'JSON-LD vs Microdata: Which Structured Data Format AI Agents Prefer',
    description:
      'JSON-LD wins for AI agents. Separate from HTML, no DOM traversal, machine-parseable in milliseconds. Migration guide from microdata to JSON-LD in 20 minutes.',
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
    mainEntityOfPage:
      'https://agenthermes.ai/blog/json-ld-vs-microdata-agents',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1850,
    keywords:
      'JSON-LD vs microdata AI agents, structured data agents, JSON-LD migration, schema markup agent readiness, D6 data quality',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://agenthermes.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'JSON-LD vs Microdata for Agents',
          item: 'https://agenthermes.ai/blog/json-ld-vs-microdata-agents',
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
      title="JSON-LD vs Microdata: Which Structured Data Format AI Agents Prefer"
      shareUrl="https://agenthermes.ai/blog/json-ld-vs-microdata-agents"
      currentHref="/blog/json-ld-vs-microdata-agents"
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
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-400">
                JSON-LD vs Microdata for Agents
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                <Code2 className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                Structured Data
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              JSON-LD vs Microdata:{' '}
              <span className="text-emerald-400">
                Which Structured Data Format AI Agents Prefer
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Both JSON-LD and microdata use Schema.org vocabulary to describe
              your business to machines. But AI agents{' '}
              <strong className="text-zinc-100">strongly prefer JSON-LD</strong>{' '}
              because it sits in a separate block, requires no DOM traversal,
              and can be parsed without rendering the page. Here is why, with a
              20-minute migration guide.
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
              <div className="author-avatar">AH</div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">
                  AgentHermes Research
                </div>
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

        {/* ===== THE CORE DIFFERENCE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-500" />
              The Core Difference: Embedded vs Separate
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Both JSON-LD and microdata serve the same purpose: they use
                Schema.org vocabulary to tell machines what a page is about. A
                restaurant page might describe its name, address, hours, menu,
                and ratings using either format. The vocabulary is identical —
                the difference is{' '}
                <strong className="text-zinc-100">where and how</strong> the
                data lives.
              </p>
              <p>
                <strong className="text-zinc-100">Microdata</strong> embeds
                structured data directly into HTML elements using{' '}
                <code className="text-purple-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  itemscope
                </code>
                ,{' '}
                <code className="text-purple-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  itemtype
                </code>
                , and{' '}
                <code className="text-purple-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  itemprop
                </code>{' '}
                attributes. To extract the data, you need to parse the entire
                HTML document, walk the DOM tree, and collect values from
                scattered attributes. This is how HTML was designed to carry
                metadata — but it is terrible for agents.
              </p>
              <p>
                <strong className="text-zinc-100">JSON-LD</strong> places
                structured data in a{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  {'<script type="application/ld+json">'}
                </code>{' '}
                block. The data is a standard JSON object, completely separate
                from the HTML structure. To extract it, an agent finds the
                script tag and calls{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  JSON.parse()
                </code>
                . No DOM traversal, no rendering, no CSS awareness needed.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '10x', label: 'Faster agent parsing (JSON-LD)', icon: Zap },
                { value: '0.10', label: 'D6 Data Quality weight', icon: BarChart3 },
                { value: '75%', label: 'Sites use neither format', icon: Globe },
                { value: '#1', label: 'Google-recommended format', icon: TrendingUp },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HEAD-TO-HEAD COMPARISON ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Head-to-Head Comparison
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              JSON-LD wins on seven of eight dimensions. The only tie is
              Schema.org vocabulary coverage, which is identical for both
              formats.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Aspect</div>
                <div>JSON-LD</div>
                <div>Microdata</div>
                <div className="text-center">Winner</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.aspect}
                  className={`grid grid-cols-4 p-4 text-sm ${
                    i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'
                  }`}
                >
                  <div className="font-medium text-zinc-200">{row.aspect}</div>
                  <div className="text-emerald-400 text-xs leading-relaxed">
                    {row.jsonLd}
                  </div>
                  <div className="text-zinc-500 text-xs leading-relaxed">
                    {row.microdata}
                  </div>
                  <div className="text-center">
                    {row.winner === 'json-ld' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                        JSON-LD
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-medium">
                        Tie
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY AGENTS PREFER JSON-LD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              Four Reasons AI Agents Strongly Prefer JSON-LD
            </h2>

            <div className="space-y-4 mb-8">
              {agentBenefits.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The bottom line: JSON-LD respects how agents actually work.
                Most AI agents making HTTP requests do not run a full browser
                environment. They fetch HTML, look for structured data, and move
                on. JSON-LD is designed for exactly this workflow. Microdata
                assumes the consumer is parsing rendered HTML — an assumption
                that does not hold in the agent economy.
              </p>
              <p>
                This is why AgentHermes checks for JSON-LD in the{' '}
                <Link
                  href="/blog/data-quality-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  D6 Data Quality dimension
                </Link>{' '}
                and why businesses with comprehensive JSON-LD score higher on{' '}
                <Link
                  href="/blog/schema-markup-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  schema markup
                </Link>{' '}
                evaluations.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CODE EXAMPLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-purple-500" />
              Side-by-Side: Same Data, Different Formats
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Here is the same business information expressed in both formats.
              Notice how JSON-LD is a self-contained block while microdata is
              woven into the HTML structure.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-emerald-500/20">
                <h3 className="text-sm font-bold text-emerald-400 mb-3">
                  JSON-LD (agent-preferred)
                </h3>
                <pre className="text-xs text-zinc-300 leading-relaxed overflow-x-auto">
                  <code>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Joe's Pizza",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Austin",
    "addressRegion": "TX"
  },
  "telephone": "+1-512-555-0199",
  "priceRange": "$$",
  "openingHours": "Mo-Su 11:00-22:00",
  "servesCuisine": "Italian"
}
</script>`}</code>
                </pre>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-700/50">
                <h3 className="text-sm font-bold text-zinc-400 mb-3">
                  Microdata (harder for agents)
                </h3>
                <pre className="text-xs text-zinc-500 leading-relaxed overflow-x-auto">
                  <code>{`<div itemscope
  itemtype="https://schema.org/Restaurant">
  <h1 itemprop="name">Joe's Pizza</h1>
  <div itemprop="address" itemscope
    itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress">
      123 Main St
    </span>
    <span itemprop="addressLocality">
      Austin
    </span>,
    <span itemprop="addressRegion">TX</span>
  </div>
  <span itemprop="telephone">
    +1-512-555-0199
  </span>
  <span itemprop="priceRange">$$</span>
</div>`}</code>
                </pre>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  The agent parsing difference:
                </strong>{' '}
                For JSON-LD, an agent runs{' '}
                <code className="text-emerald-400 text-xs">
                  JSON.parse(scriptTag.textContent)
                </code>{' '}
                and immediately has a typed object. For microdata, the agent
                must find the itemscope div, recursively walk its children,
                match itemprop attributes, handle nested itemscope blocks, and
                reconstruct the object manually. Same data, 10x more code to
                extract.
              </p>
            </div>
          </div>
        </section>

        {/* ===== MIGRATION GUIDE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              Migration Guide: Microdata to JSON-LD in 20 Minutes
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              If your site currently uses microdata, migrating to JSON-LD is
              straightforward. The Schema.org vocabulary is the same — you are
              only changing the container format.
            </p>

            <div className="space-y-3 mb-8">
              {migrationSteps.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The entire migration typically takes 15-20 minutes for a
                standard business website. If you have a CMS like WordPress, a
                plugin like Yoast SEO or Rank Math can handle JSON-LD
                generation automatically — often with a single toggle.
              </p>
            </div>
          </div>
        </section>

        {/* ===== AGENT READINESS IMPACT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              Impact on Your Agent Readiness Score
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Structured data lives in the{' '}
                <strong className="text-zinc-100">
                  D6 Data Quality dimension
                </strong>{' '}
                of the AgentHermes scoring model, which carries a{' '}
                <strong className="text-zinc-100">0.10 weight</strong> (10% of
                total score). D6 evaluates whether your business exposes data in
                formats agents can consume: JSON API responses, content
                negotiation, and structured data markup.
              </p>
              <p>
                JSON-LD is the most impactful structured data investment because
                it directly tells agents what your business is, what you offer,
                and how to interact with you. A business with no structured data
                might score 0-2 on D6. Adding comprehensive JSON-LD with
                LocalBusiness, Product/Service, OpeningHours, and FAQPage
                schemas can push D6 to 6-8 out of 10.
              </p>
              <p>
                JSON-LD also indirectly boosts{' '}
                <strong className="text-zinc-100">
                  D1 Discoverability (0.12)
                </strong>{' '}
                because Google uses JSON-LD for rich results, which increases
                visibility in AI-powered search and citation. More visibility
                means more agent discovery.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50"
        >
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
                  <h3 className="text-base font-bold text-zinc-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ARTICLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: 'Schema Markup and Agent Readiness',
                  href: '/blog/schema-markup-agent-readiness',
                  tag: 'Technical Guide',
                  tagColor: 'purple',
                },
                {
                  title: 'Data Quality and Agent Readiness',
                  href: '/blog/data-quality-agent-readiness',
                  tag: 'Dimensions Deep Dive',
                  tagColor: 'blue',
                },
                {
                  title: 'What Is Agent Readiness? The Complete Guide',
                  href: '/blog/what-is-agent-readiness',
                  tag: 'Complete Guide',
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
                    >
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
              Does your site have the right structured data?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              AgentHermes scans for JSON-LD, microdata, and 50+ other signals
              across 9 dimensions. See your D6 Data Quality score in 60
              seconds.
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
