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
  DollarSign,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  MapPin,
  Search,
  ShoppingCart,
  Sparkles,
  Store,
  Tag,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Schema.org Markup for Agent Readiness: The SEO Trick That Helps AI Agents Too | AgentHermes',
  description:
    'Schema.org structured data is not just for Google rich results. AI agents read JSON-LD markup to extract business identity, pricing, hours, and services. Learn the 8 schema types that bridge SEO and agent readiness, with copy-paste examples.',
  keywords: [
    'schema markup agent readiness',
    'schema.org AI agents',
    'JSON-LD agent readiness',
    'structured data AI',
    'schema markup for AI',
    'Organization schema agents',
    'Product schema AI',
    'LocalBusiness schema',
    'SEO and agent readiness',
  ],
  openGraph: {
    title: 'Schema.org Markup for Agent Readiness: The SEO Trick That Helps AI Agents Too',
    description:
      'The same JSON-LD markup that powers Google rich results also feeds AI agents. 8 schema types that bridge SEO and agent readiness.',
    url: 'https://agenthermes.ai/blog/schema-markup-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Schema.org Markup for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schema.org Markup for Agent Readiness: The SEO Trick That Helps AI Agents Too',
    description:
      'AI agents read JSON-LD markup. The 8 schema types that bridge SEO and agent readiness, with copy-paste examples.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/schema-markup-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const schemaTypes = [
  {
    name: 'Organization',
    description: 'The foundational identity schema. Tells agents your business name, URL, logo, contact information, social profiles, and founding date. Every business should have this on their homepage. It is the first thing agents look for when building a profile of who you are.',
    agentUse: 'Agent builds a business profile: name, contact, social presence, legitimacy signals',
    seoUse: 'Knowledge panel, logo in search results, sitelinks',
    priority: 'Essential',
    icon: Globe,
    color: 'emerald',
  },
  {
    name: 'Product + Offer',
    description: 'Product describes what you sell. Offer describes the pricing and availability. Together, they let agents read your catalog and pricing without hitting an API. An agent asking "how much does X cost?" can answer from your markup alone — no scraping, no guessing.',
    agentUse: 'Agent reads pricing, availability, and product details for comparison shopping',
    seoUse: 'Rich product snippets, price in search results, availability badges',
    priority: 'Essential',
    icon: ShoppingCart,
    color: 'emerald',
  },
  {
    name: 'LocalBusiness',
    description: 'Extends Organization with physical location data: address, geo coordinates, opening hours, price range, and service area. Critical for any business with a physical presence. Agents answering "find a plumber near me open on Saturday" need this data in machine-readable form.',
    agentUse: 'Agent matches location queries: hours, proximity, service area, price range',
    seoUse: 'Local pack, Google Maps, "near me" queries',
    priority: 'Essential for physical businesses',
    icon: MapPin,
    color: 'blue',
  },
  {
    name: 'Service',
    description: 'Describes a service offered by the business including type, provider, area served, and associated offers. Service businesses (consultants, agencies, contractors) need this more than Product markup. It tells agents what you do, where, and at what price point.',
    agentUse: 'Agent matches service queries and compares providers by type, area, and price',
    seoUse: 'Service-type rich results, breadcrumbs with service categories',
    priority: 'Essential for service businesses',
    icon: Zap,
    color: 'blue',
  },
  {
    name: 'SoftwareApplication',
    description: 'Describes a software product with operating system requirements, category, pricing, and rating. SaaS companies should use this alongside Product. It tells agents the platform, pricing model (subscription vs one-time), and category for comparison.',
    agentUse: 'Agent compares SaaS tools by category, platform, pricing model, and user ratings',
    seoUse: 'Software rich results with ratings and pricing in search',
    priority: 'Essential for SaaS',
    icon: Code2,
    color: 'purple',
  },
  {
    name: 'FAQPage',
    description: 'Structured question-and-answer pairs. Agents use FAQ markup to answer user questions about your business without visiting multiple pages. One JSON-LD block on your FAQ page gives agents instant access to your most common answers.',
    agentUse: 'Agent answers questions about the business from structured FAQ data directly',
    seoUse: 'FAQ rich results with expandable answers in search',
    priority: 'High',
    icon: HelpCircle,
    color: 'amber',
  },
  {
    name: 'HowTo',
    description: 'Step-by-step instructions for completing a task. Agents use this to guide users through processes — onboarding, setup, troubleshooting. Each step has a name, text, and optional image. Particularly useful for technical products and services.',
    agentUse: 'Agent walks users through setup or processes using structured step data',
    seoUse: 'How-to rich results with step-by-step formatting in search',
    priority: 'Medium',
    icon: Layers,
    color: 'amber',
  },
  {
    name: 'BreadcrumbList',
    description: 'Navigation hierarchy showing where a page sits in the site structure. Agents use breadcrumbs to understand site architecture and navigate between related content. Simple to implement and universally beneficial.',
    agentUse: 'Agent understands site structure and navigates to related pages efficiently',
    seoUse: 'Breadcrumb trails in search results, improved crawl understanding',
    priority: 'Medium',
    icon: Search,
    color: 'cyan',
  },
]

const comparisonRows = [
  { aspect: 'Business identity', seo: 'Knowledge panel', agent: 'Organization schema builds business profile' },
  { aspect: 'Pricing', seo: 'Price in search snippet', agent: 'Offer schema enables price comparison across vendors' },
  { aspect: 'Location', seo: 'Local pack / Maps', agent: 'LocalBusiness schema answers "near me" + hours queries' },
  { aspect: 'Products', seo: 'Product rich results', agent: 'Product schema feeds catalog browsing and recommendations' },
  { aspect: 'Questions', seo: 'FAQ expandable results', agent: 'FAQPage schema answers user questions without page visit' },
  { aspect: 'Hours', seo: 'Hours in knowledge panel', agent: 'openingHoursSpecification enables real-time availability checks' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does schema.org markup actually help AI agents?',
    answer:
      'Yes. AI agents that visit web pages (as opposed to calling APIs) parse JSON-LD markup as their primary structured data source. When an agent visits your homepage and finds Organization markup with contactPoint, address, and openingHours, it can build a complete profile of your business without scraping HTML. This is more reliable, faster, and more accurate than trying to extract the same information from unstructured page content.',
  },
  {
    question: 'Which schema types should I implement first?',
    answer:
      'Start with Organization on your homepage (every business needs this). Then add the type that matches your business model: Product + Offer for e-commerce, LocalBusiness for physical locations, Service for service businesses, SoftwareApplication for SaaS. Add FAQPage to your FAQ or support page. These five types cover 90% of what agents need from schema markup.',
  },
  {
    question: 'I already have schema markup for SEO. Do I need to change anything for agents?',
    answer:
      'Probably not — but check completeness. SEO-focused schema markup often includes the minimum fields Google needs for rich results. Agents benefit from additional fields that Google ignores. For example: sameAs (social links) in Organization, areaServed in LocalBusiness, availableChannel in Service, and priceValidUntil in Offer. Add these fields to your existing markup and agents will extract significantly more useful information.',
  },
  {
    question: 'How does schema markup affect my Agent Readiness Score?',
    answer:
      'Schema markup primarily impacts two dimensions: D6 Data Quality (0.10 weight) and D1 Discovery (0.12 weight). JSON-LD markup on your pages lifts D6 because it is structured, typed data that agents can parse reliably. It lifts D1 because it makes your business identity, services, and pricing discoverable without requiring API access. Combined, these two dimensions account for 22% of the total score.',
  },
  {
    question: 'Is JSON-LD the only format that works?',
    answer:
      'JSON-LD is the strongly preferred format for both search engines and AI agents. Microdata and RDFa are also valid schema.org formats, but they are embedded within HTML tags, making them harder for agents to extract cleanly. JSON-LD sits in a separate <script> tag, is self-contained, and can be parsed without touching the HTML DOM at all. Google recommends JSON-LD, and so do we.',
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

export default function SchemaMarkupAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Schema.org Markup for Agent Readiness: The SEO Trick That Helps AI Agents Too',
    description:
      'Schema.org structured data is not just for Google rich results. AI agents read JSON-LD markup to extract business identity, pricing, hours, and services. 8 schema types that bridge SEO and agent readiness.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/schema-markup-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Standards Guide',
    wordCount: 1900,
    keywords:
      'schema markup agent readiness, schema.org AI agents, JSON-LD agent readiness, structured data AI, SEO and agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Schema.org Markup for Agent Readiness',
          item: 'https://agenthermes.ai/blog/schema-markup-agent-readiness',
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
      title="Schema.org Markup for Agent Readiness: The SEO Trick That Helps AI Agents Too"
      shareUrl="https://agenthermes.ai/blog/schema-markup-agent-readiness"
      currentHref="/blog/schema-markup-agent-readiness"
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
            <span className="text-zinc-400">Schema.org Markup for Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Code2 className="h-3.5 w-3.5" />
              Standards Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              SEO + Agent Readiness
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Schema.org Markup for Agent Readiness:{' '}
            <span className="text-emerald-400">The SEO Trick That Helps AI Agents Too</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            You probably already have some schema.org markup for Google rich results. What you
            might not know is that <strong className="text-zinc-100">AI agents read the same
            markup</strong> — and they extract far more from it than search engines do. The same
            JSON-LD that gives you a knowledge panel gives agents a complete, machine-readable
            profile of your business.
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

      {/* ===== THE BRIDGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            The Bridge Between Two Worlds
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              SEO and agent readiness are usually discussed as separate disciplines.{' '}
              <Link href="/blog/agent-readiness-vs-seo" className="text-emerald-400 hover:text-emerald-300 underline">
                We have written about their differences
              </Link>{' '}
              — SEO ranks content for humans while agent readiness measures whether AI agents can
              use your business. But there is one area where they overlap perfectly:{' '}
              <strong className="text-zinc-100">schema.org structured data</strong>.
            </p>
            <p>
              Schema.org is a collaborative vocabulary maintained by Google, Microsoft, Yahoo, and
              Yandex. It defines standard types — Organization, Product, Service, LocalBusiness —
              with standard properties. When you embed this vocabulary in JSON-LD format on your
              web pages, search engines use it for rich results. But AI agents use the exact same
              markup for something far more powerful: building a structured understanding of your
              entire business without scraping a single HTML element.
            </p>
            <p>
              Of the 500 businesses we scanned, fewer than 15% have any schema.org markup at all.
              Among those that do, most only implement the minimum required for Google rich results.
              They are leaving agent readiness points on the table — specifically in D6 Data Quality
              (10% weight) and D1 Discovery (12% weight), which together account for 22% of the
              total Agent Readiness Score.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '< 15%', label: 'of 500 have any schema markup', icon: Tag },
              { value: '22%', label: 'of score from D1 + D6', icon: BarChart3 },
              { value: '8', label: 'key schema types for agents', icon: FileJson },
              { value: '30 min', label: 'to implement the essentials', icon: Clock },
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

      {/* ===== THE 8 SCHEMA TYPES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            The 8 Schema Types That Matter for Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Not all schema types are equally valuable for agents. These eight types, ordered by
              priority, give AI agents the structured data they need to understand, compare, and
              interact with your business.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {schemaTypes.map((schema) => {
              const colors = getColorClasses(schema.color)
              return (
                <div
                  key={schema.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <schema.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{schema.name}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>{schema.priority}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{schema.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-emerald-400 font-medium">Agent use:</span>{' '}
                        {schema.agentUse}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-blue-400 font-medium">SEO use:</span>{' '}
                        {schema.seoUse}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SEO VS AGENT COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Same Markup, Different Uses
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Search engines and AI agents both read schema.org markup — but they use it for
            very different things. Here is how the same structured data serves both audiences.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Data</div>
              <div>SEO Impact</div>
              <div>Agent Impact</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.seo}</div>
                <div className="text-emerald-400">{row.agent}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The critical insight: agents extract <strong className="text-zinc-100">more data from
              the same markup</strong> than search engines do. Google uses your Organization schema
              for a knowledge panel. An agent uses it to know your name, address, phone, hours,
              social profiles, founding date, and number of employees — all from one JSON-LD block.
              Google uses your Offer schema to show a price in search results. An agent uses it to
              compare your pricing against competitors, check availability, and determine if the
              offer is still valid based on <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">priceValidUntil</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COPY-PASTE EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            Copy-Paste Templates
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Two ready-to-use JSON-LD blocks that cover the highest-priority schema types.
              Replace the placeholder values with your business information and add them to your
              page&apos;s <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">&lt;head&gt;</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-emerald-500/20">
              <h3 className="text-sm font-bold text-emerald-400 mb-3">Organization (every business)</h3>
              <pre className="text-xs text-zinc-400 leading-relaxed overflow-x-auto">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Business Name",
  "url": "https://yourbusiness.com",
  "logo": "https://yourbusiness.com/logo.png",
  "description": "One sentence about what you do",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://twitter.com/yourbusiness",
    "https://linkedin.com/company/yourbusiness"
  ]
}
</script>`}
              </pre>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/50 border border-blue-500/20">
              <h3 className="text-sm font-bold text-blue-400 mb-3">Product + Offer (e-commerce and SaaS)</h3>
              <pre className="text-xs text-zinc-400 leading-relaxed overflow-x-auto">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Your Product Name",
  "description": "What the product does",
  "brand": {
    "@type": "Brand",
    "name": "Your Brand"
  },
  "offers": {
    "@type": "Offer",
    "price": "49.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2027-01-01",
    "url": "https://yourbusiness.com/product"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "128"
  }
}
</script>`}
              </pre>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm font-bold text-amber-400 mb-2">Agent-Optimized Extras</p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Standard schema.org implementations include the minimum fields. For agent readiness,
              add these often-overlooked properties: <code className="text-amber-400 text-xs">sameAs</code> (social
              links help agents verify legitimacy), <code className="text-amber-400 text-xs">areaServed</code> (critical
              for location-based agent queries), <code className="text-amber-400 text-xs">availableChannel</code> (tells
              agents how to interact — phone, web, API), and <code className="text-amber-400 text-xs">priceValidUntil</code> (lets
              agents know if pricing data is current). These fields are ignored by most SEO guides
              but are heavily used by AI agents.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRICING TRANSPARENCY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            How Schema Markup Unlocks Pricing Transparency
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Product + Offer = agents read your prices',
                detail: 'When an agent is comparison shopping on behalf of a user, it visits each vendor and looks for Offer markup. Price, currency, availability, and validity date — all machine-readable. Without this, the agent cannot include you in price comparisons.',
              },
              {
                title: 'LocalBusiness + priceRange = quick filtering',
                detail: 'The priceRange property (e.g., "$$" or "$50-200") lets agents do fast filtering before deeper comparison. When a user says "find an affordable dentist nearby," the agent checks priceRange before visiting individual pages.',
              },
              {
                title: 'Service + Offer = service pricing',
                detail: 'Service businesses often hide pricing behind "Contact for quote." Schema.org lets you expose price ranges (Offer with minPrice and maxPrice) without committing to exact prices. This is enough for agents to include you in filtered results.',
              },
              {
                title: 'AggregateOffer = catalog pricing',
                detail: 'For businesses with many products at different price points, AggregateOffer with lowPrice and highPrice gives agents the pricing range without listing every SKU. "Products from $9.99 to $299" is machine-readable and comparison-ready.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              This directly connects to{' '}
              <Link href="/blog/pricing-transparency-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D4 Pricing Transparency
              </Link>, which has the highest universal failure rate of any dimension. 148 of 500
              businesses have no visible pricing at all. Schema markup is the easiest way to expose
              pricing in a structured format that lifts both D4 and D6 simultaneously — one JSON-LD
              block, two dimensions improved.
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMPLEMENTATION GUIDE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Implementation Roadmap
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Four steps from zero schema markup to agent-optimized structured data. Total time: about 2 hours.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Add Organization markup to your homepage (30 min)',
                detail: 'Copy the Organization template above and replace with your business details. Include contactPoint, address, sameAs, and logo. Drop it into your page head. Validates at schema.org/Organization.',
                icon: Globe,
              },
              {
                step: '2',
                title: 'Add your business-type markup (30 min)',
                detail: 'E-commerce: Product + Offer on product pages. Physical business: LocalBusiness with openingHoursSpecification. SaaS: SoftwareApplication with applicationCategory and offers. Service business: Service with serviceType and areaServed.',
                icon: Store,
              },
              {
                step: '3',
                title: 'Add FAQPage markup to your support/FAQ page (15 min)',
                detail: 'Wrap your existing FAQ content in FAQPage schema. Each question-answer pair becomes a Question entity. Agents can now answer "Does Business X offer Y?" directly from your markup.',
                icon: HelpCircle,
              },
              {
                step: '4',
                title: 'Validate and add agent-optimized extras (15 min)',
                detail: 'Test at Google Rich Results Test (search.google.com/test/rich-results). Then add the agent-specific fields: sameAs, areaServed, availableChannel, priceValidUntil, numberOfEmployees. These are invisible to Google rich results but valuable to AI agents.',
                icon: CheckCircle2,
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
                title: 'Agent Readiness vs SEO: Why Your Google Ranking Does Not Help AI Agents',
                href: '/blog/agent-readiness-vs-seo',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'Why 30% of Businesses Fail Over Pricing Transparency',
                href: '/blog/pricing-transparency-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
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
            Does your schema markup work for agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness audit to see if AI agents can read your structured data.
            We check JSON-LD markup, response formats, and 7 other dimensions in 60 seconds.
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
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See Full Methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
