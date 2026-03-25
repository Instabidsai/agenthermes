import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const { domain, name, description } = body as {
      domain?: string
      name?: string
      description?: string
    }

    if (!domain || typeof domain !== 'string' || domain.trim().length === 0) {
      return NextResponse.json(
        { error: 'domain is required' },
        { status: 400 }
      )
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      )
    }
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'description is required' },
        { status: 400 }
      )
    }

    const cleanDomain = domain
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '')

    // Try to enrich from our DB if the business exists
    let services: { name: string; description: string | null; pricing_model: string; mcp_endpoint: string | null }[] = []
    let capabilities: string[] = []
    let mcp_endpoints: string[] = []
    let auditScore: number | null = null

    try {
      const db = getServiceClient()
      const { data: bizRaw } = await db
        .from('businesses')
        .select('id, capabilities, mcp_endpoints, audit_score')
        .eq('domain', cleanDomain)
        .maybeSingle()

      const biz = bizRaw as Record<string, unknown> | null

      if (biz) {
        capabilities = (biz.capabilities as string[]) || []
        mcp_endpoints = (biz.mcp_endpoints as string[]) || []
        auditScore = biz.audit_score as number | null

        const { data: svcRaw } = await db
          .from('services')
          .select('name, description, pricing_model, mcp_endpoint')
          .eq('business_id', biz.id as string)
          .eq('status', 'active')

        services = (svcRaw || []) as typeof services
      }
    } catch {
      // DB unavailable — generate from provided info only
    }

    // Build llms.txt
    const lines: string[] = []
    lines.push(`# ${name.trim()}`)
    lines.push('')
    lines.push(`> ${description.trim()}`)
    lines.push('')

    lines.push(`## About ${name.trim()}`)
    lines.push(`- Website: https://${cleanDomain}`)
    if (auditScore !== null) {
      lines.push(`- Agent Readiness Score: ${auditScore}/100`)
    }
    if (capabilities.length > 0) {
      lines.push(`- Capabilities: ${capabilities.join(', ')}`)
    }
    lines.push('')

    if (services.length > 0) {
      lines.push('## Services')
      for (const svc of services) {
        lines.push(`- ${svc.name}${svc.description ? ` — ${svc.description}` : ''} (${svc.pricing_model})`)
      }
      lines.push('')
    }

    if (mcp_endpoints.length > 0) {
      lines.push('## MCP Endpoints')
      for (const ep of mcp_endpoints) {
        lines.push(`- ${ep}`)
      }
      lines.push('')
    }

    lines.push('## Integration')
    lines.push(`- Agent Card: https://${cleanDomain}/.well-known/agent-card.json`)
    if (mcp_endpoints.length > 0) {
      lines.push(`- MCP: ${mcp_endpoints[0]}`)
    } else {
      lines.push(`- API: https://${cleanDomain}/api`)
    }
    lines.push(`- Documentation: https://${cleanDomain}/docs`)
    lines.push('')
    lines.push('## Contact')
    lines.push(`- Website: https://${cleanDomain}`)
    lines.push(`- Email: support@${cleanDomain}`)
    lines.push('')

    const llmsTxt = lines.join('\n')

    return new NextResponse(llmsTxt, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (err) {
    console.error('[remediate/llms-txt] Error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
