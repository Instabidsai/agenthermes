import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | AgentHermes',
  description:
    'Manage your registered businesses, monitor agent activity, and track wallet balances on AgentHermes.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
