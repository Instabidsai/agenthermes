import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'System Status | AgentHermes',
  description:
    'Live system status for AgentHermes. Check the health of our API, scanner, MCP server, badge service, and scoring endpoints.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
