import { getServiceClient } from '@/lib/supabase'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import RegistryClient from './RegistryClient'

export const revalidate = 120 // ISR: revalidate every 2 minutes

interface RegistryBusiness {
  id: string
  name: string
  slug: string
  domain: string | null
  description: string | null
  logo_url: string | null
  audit_score: number
  audit_tier: 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'
  vertical: string | null
  capabilities: string[]
  mcp_endpoints: string[]
  a2a_agent_card: Record<string, unknown> | null
  services: { id: string; name: string; mcp_endpoint: string | null; status: string }[]
}

function deriveProtocols(biz: RegistryBusiness): string[] {
  const protocols: string[] = []
  if (biz.mcp_endpoints && biz.mcp_endpoints.length > 0) protocols.push('mcp')
  if (biz.a2a_agent_card && Object.keys(biz.a2a_agent_card).length > 0) protocols.push('a2a')
  protocols.push('rest')
  return protocols
}

function countTools(biz: RegistryBusiness): number {
  const mcpCount = biz.mcp_endpoints?.length || 0
  const a2aCount = biz.a2a_agent_card
    ? ((biz.a2a_agent_card as any).skills?.length || (biz.a2a_agent_card as any).capabilities?.length || 0)
    : 0
  const activeServices = biz.services?.filter((s) => s.status === 'active').length || 0
  return Math.max(activeServices, mcpCount + a2aCount)
}

async function getRegistryData() {
  const supabase = getServiceClient()

  const { data, count } = await supabase
    .from('businesses')
    .select(
      'id, name, slug, domain, description, logo_url, audit_score, audit_tier, vertical, capabilities, mcp_endpoints, a2a_agent_card, services(id, name, mcp_endpoint, status)',
      { count: 'exact' }
    )
    .gt('audit_score', 0)
    .order('audit_score', { ascending: false })
    .range(0, 49)

  const businesses = ((data || []) as unknown as RegistryBusiness[]).map((biz) => ({
    id: biz.id,
    name: biz.name,
    slug: biz.slug,
    domain: biz.domain,
    description: biz.description,
    score: biz.audit_score,
    tier: biz.audit_tier,
    vertical: biz.vertical,
    capabilities: biz.capabilities || [],
    protocols: deriveProtocols(biz),
    tool_count: countTools(biz),
    profile_url: `/business/${biz.slug}`,
  }))

  // Collect unique verticals for filter pills
  const verticals = Array.from(
    new Set(businesses.map((b) => b.vertical).filter(Boolean) as string[])
  ).sort()

  return { businesses, total: count ?? 0, verticals }
}

export default async function RegistryPage() {
  const { businesses, total, verticals } = await getRegistryData()

  // JSON-LD: ItemList schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Agent Card Registry',
    description:
      'A searchable directory of agent-ready businesses with MCP servers, A2A agents, and REST APIs.',
    url: 'https://agenthermes.ai/registry',
    numberOfItems: total,
    itemListElement: businesses.slice(0, 50).map((biz, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: biz.name,
        url: `https://agenthermes.ai${biz.profile_url}`,
        applicationCategory: 'BusinessApplication',
        ...(biz.description ? { description: biz.description } : {}),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: biz.score,
          bestRating: 100,
          worstRating: 0,
        },
      },
    })),
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://agenthermes.ai' },
          { name: 'Registry', url: 'https://agenthermes.ai/registry' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Agent Card Registry
        </h1>
        <p className="text-sm text-zinc-500 max-w-2xl">
          Discover agent-ready businesses. Search MCP servers, A2A agents, and REST APIs.
          {' '}{total} businesses registered.
        </p>
      </div>

      <RegistryClient
        initialBusinesses={businesses}
        initialTotal={total}
        verticals={verticals}
      />
    </div>
  )
}
