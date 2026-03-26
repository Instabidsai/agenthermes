import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discover Agent-Ready Businesses | AgentHermes',
  description:
    'Search verified, agent-ready businesses by capability, vertical, or trust tier on the AgentHermes commerce network.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
