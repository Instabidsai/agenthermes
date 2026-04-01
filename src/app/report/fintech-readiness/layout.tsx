import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fintech & Insurance Agent Readiness Report Q1 2026 | AgentHermes',
  description:
    'How agent-ready are fintech and insurance companies? Data from Stripe, PayPal, Coinbase, Robinhood, GEICO, Allstate, USAA and more. KYC/AML considerations, payment vs insurance comparison.',
  openGraph: {
    title: 'Fintech & Insurance Agent Readiness Report Q1 2026 | AgentHermes',
    description:
      'Fintech and insurance companies scored across 9 dimensions. Allstate 66 Silver vs GEICO 22 -- huge gap in the same industry. See the full breakdown.',
    url: 'https://agenthermes.ai/report/fintech-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fintech & Insurance Agent Readiness Report Q1 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fintech & Insurance Agent Readiness Report Q1 2026',
    description:
      'Fintech and insurance scored across 9 dimensions. Payment companies vs insurance -- who is more agent-ready?',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/report/fintech-readiness',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Fintech & Insurance Agent Readiness Report Q1 2026',
    description:
      'Agent readiness scores for fintech and insurance companies. Covers KYC/AML considerations for agent commerce, payment companies vs insurance comparison, and dimension breakdowns.',
    url: 'https://agenthermes.ai/report/fintech-readiness',
    creator: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    temporalCoverage: '2026-01/2026-03',
    license: 'https://agenthermes.ai/terms',
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Agent Readiness Score', minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'Payment Acceptance (D5)', minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'Security (D7)', minValue: 0, maxValue: 100 },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fintech & Insurance Agent Readiness Report Q1 2026',
    description:
      'Data-driven analysis of fintech and insurance agent readiness. KYC/AML considerations, payment companies vs insurance gap, and the Allstate vs GEICO divide.',
    url: 'https://agenthermes.ai/report/fintech-readiness',
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

export default function FintechReadinessLayout({
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
