import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Readiness Leaderboard | AgentHermes',
  description:
    'Top agent-ready businesses ranked by Agent Readiness Score. See who leads in AI agent compatibility.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
