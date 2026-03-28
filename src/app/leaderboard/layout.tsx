import type { Metadata } from 'next'
import { getServiceClient } from '@/lib/supabase'

export const revalidate = 300 // ISR: 5 minutes

export const metadata: Metadata = {
  title: 'Agent Readiness Leaderboard | AgentHermes',
  description:
    'Top agent-ready businesses ranked by Agent Readiness Score. See who leads in AI agent compatibility.',
}

async function getTopBusinesses() {
  try {
    const supabase = getServiceClient()
    const { data } = await supabase
      .from('businesses')
      .select('name, slug, domain, audit_score, audit_tier')
      .gt('audit_score', 0)
      .order('audit_score', { ascending: false })
      .limit(50)

    return (data || []) as {
      name: string
      slug: string
      domain: string | null
      audit_score: number
      audit_tier: string
    }[]
  } catch {
    return []
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const topBusinesses = await getTopBusinesses()

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Agent-Ready Businesses',
    description:
      'Businesses ranked by Agent Readiness Score — measuring AI agent compatibility across 9 dimensions.',
    url: 'https://agenthermes.ai/leaderboard',
    numberOfItems: topBusinesses.length,
    itemListElement: topBusinesses.map((biz, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: biz.name,
        url: biz.domain ? `https://${biz.domain}` : `https://agenthermes.ai/business/${biz.slug}`,
        ...(biz.audit_score != null
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: biz.audit_score,
                bestRating: 100,
                worstRating: 0,
                ratingCount: 1,
              },
            }
          : {}),
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {children}
    </>
  )
}
