import type { Metadata } from 'next'
import { getServiceClient } from '@/lib/supabase'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  // Validate UUID format before querying
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return {
      title: 'Invalid Service | AgentHermes Gateway',
      description: 'The requested gateway service could not be found.',
    }
  }

  try {
    const supabase = getServiceClient()
    const { data } = await supabase
      .from('gateway_services')
      .select('name, description, category')
      .eq('id', id)
      .single()

    if (!data) {
      return {
        title: 'Service Not Found | AgentHermes Gateway',
        description: 'The requested gateway service could not be found.',
      }
    }

    const service = data as Record<string, string | null>
    const title = `${service.name} | AgentHermes Gateway`
    const description =
      service.description ||
      `Use ${service.name} through the AgentHermes gateway. One API key, zero credential management.`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://agenthermes.ai/gateway/${id}`,
      },
      alternates: {
        canonical: `https://agenthermes.ai/gateway/${id}`,
      },
    }
  } catch {
    return {
      title: 'Gateway Service | AgentHermes',
      description: 'View service details on the AgentHermes gateway.',
    }
  }
}

export default function GatewayServiceLayout({ children }: LayoutProps) {
  return children
}
