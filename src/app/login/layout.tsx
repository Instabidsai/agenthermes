import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | AgentHermes',
  description:
    'Sign in to AgentHermes to manage your businesses, monitor agent activity, and access your dashboard.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
