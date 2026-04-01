import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retail & E-Commerce Agent Readiness Report Q1 2026 | AgentHermes',
  description:
    'How agent-ready are retailers? Data from Walmart, Target, Nike, Shopify, Etsy and more. Platform detection, online-first vs traditional retail gap, and the retail leaderboard.',
  openGraph: {
    title: 'Retail & E-Commerce Agent Readiness Report Q1 2026 | AgentHermes',
    description:
      'Major retailers scored across 9 dimensions of agent readiness. Walmart scores 33 -- invisible to AI agents. See the full retail breakdown.',
    url: 'https://agenthermes.ai/report/retail-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Retail & E-Commerce Agent Readiness Report Q1 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retail Agent Readiness Report Q1 2026',
    description:
      'Major retailers scored across 9 dimensions. Walmart, Target, Nike -- how agent-ready are they?',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/report/retail-readiness',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Retail & E-Commerce Agent Readiness Report Q1 2026',
    description:
      'Agent readiness scores for retail and e-commerce businesses. Covers platform detection (Shopify, WooCommerce, custom), pricing transparency, payment acceptance, and product data quality.',
    url: 'https://agenthermes.ai/report/retail-readiness',
    creator: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    temporalCoverage: '2026-01/2026-03',
    license: 'https://agenthermes.ai/terms',
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Agent Readiness Score', minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'Pricing Transparency (D4)', minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'Payment Acceptance (D5)', minValue: 0, maxValue: 100 },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Retail & E-Commerce Agent Readiness Report Q1 2026',
    description:
      'Data-driven analysis of how ready retailers are for AI agent commerce. Online-first vs traditional retail gap analysis.',
    url: 'https://agenthermes.ai/report/retail-readiness',
    author: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    datePublished: '2026-03-30',
  },
]

export default function RetailReadinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
