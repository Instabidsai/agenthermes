import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform Stats | AgentHermes',
  description:
    'Real-time platform metrics for AgentHermes. See total businesses scored, scans run, score distributions, and gateway usage — updated every 60 seconds.',
  openGraph: {
    title: 'Platform Stats | AgentHermes',
    description:
      'Real-time transparency dashboard showing live AgentHermes platform metrics — businesses scored, scans run, tier distribution, and more.',
    url: 'https://agenthermes.ai/stats',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
