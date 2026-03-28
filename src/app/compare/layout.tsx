import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Agent Readiness Scores | AgentHermes',
  description:
    'Compare two businesses side by side on all 9 dimensions of the Agent Readiness Score. See who is more agent-ready.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
