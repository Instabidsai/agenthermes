import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer Documentation | AgentHermes',
  description:
    'Integrate the Agent Readiness Score into your agent workflows. REST API, MCP server, TypeScript and Python SDKs, and LangChain/CrewAI tools.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
