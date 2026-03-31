import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Card Registry | AgentHermes',
  description:
    'Discover agent-ready businesses. Search MCP servers, A2A agents, and REST APIs in the AgentHermes registry.',
  openGraph: {
    title: 'Agent Card Registry | AgentHermes',
    description:
      'Discover agent-ready businesses. Search MCP servers, A2A agents, and REST APIs.',
    url: 'https://agenthermes.ai/registry',
    siteName: 'AgentHermes',
    type: 'website',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/registry',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
