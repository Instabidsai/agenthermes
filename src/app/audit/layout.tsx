import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Agent Readiness Score | AgentHermes',
  description:
    'Enter your domain to get scored across 9 dimensions of AI agent readiness. Free, takes 10-30 seconds.',
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Check Your Agent Readiness Score",
  "description": "Get your business scored across 9 dimensions of AI agent readiness in under 60 seconds.",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Enter your URL",
      "text": "Type your business domain into the scanner. No signup or credit card required."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Get scored",
      "text": "We scan 9 dimensions in real-time: Discoverability, Interoperability, Onboarding, Pricing, Payment, Data Quality, Security, Reliability, and Agent Experience."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Review results",
      "text": "See your overall score (0-100), tier (Platinum, Gold, Silver, Bronze, or Not Scored), and specific recommendations for each dimension."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Fix issues",
      "text": "Use our auto-remediation tools to generate missing files like llms.txt and agent-hermes.json, add structured pricing, and improve your score."
    }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {children}
    </>
  )
}
