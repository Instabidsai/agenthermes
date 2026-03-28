import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Playground | AgentHermes',
  description:
    'Test AgentHermes API endpoints live. Score domains, discover businesses, browse the leaderboard, and explore gateway services — all from your browser.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
