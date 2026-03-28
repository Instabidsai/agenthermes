import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | AgentHermes',
  description:
    'Simple, transparent pricing for the Agent Readiness Score platform. Free scanning forever. Pro, Business, and Enterprise plans for continuous monitoring, remediation, and scale.',
  openGraph: {
    title: 'Pricing | AgentHermes',
    description:
      'Simple, transparent pricing for the Agent Readiness Score platform. Start free, upgrade when you need continuous monitoring and remediation.',
    url: 'https://agenthermes.ai/pricing',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/pricing',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
