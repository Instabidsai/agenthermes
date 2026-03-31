import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent-Ready for Every Business | AgentHermes',
  description:
    'Whether you\'re a local plumber or a global SaaS, AgentHermes makes you discoverable by AI agents. Browse 15 verticals and see how your industry scores.',
  openGraph: {
    title: 'Agent-Ready for Every Business | AgentHermes',
    description:
      'Browse 15 business verticals. See how your industry scores on agent readiness, and get started making your business discoverable by AI agents.',
    url: 'https://agenthermes.ai/for',
    siteName: 'AgentHermes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent-Ready for Every Business | AgentHermes',
    description:
      'Browse 15 business verticals. See how your industry scores on agent readiness.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/for',
  },
}

export default function ForLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
