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

    const { domain, name, description, api_base } = body as {
      domain?: string
      name?: string
      description?: string
      api_base?: string
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

    const baseUrl = `https://${cleanDomain}`
    const resolvedApiBase = api_base?.trim() || `${baseUrl}/api`

    // Try to enrich from our DB
    let services: { name: string; description: string | null; mcp_endpoint: string | null }[] = []
    let capabilities: string[] = []
    let mcp_endpoints: string[] = []

    try {
      const db = getServiceClient()
      const { data: bizRaw } = await db
        .from('businesses')
        .select('id, capabilities, mcp_endpoints')
        .eq('domain', cleanDomain)
        .maybeSingle()

      const biz = bizRaw as Record<string, unknown> | null

      if (biz) {
        capabilities = (biz.capabilities as string[]) || []
        mcp_endpoints = (biz.mcp_endpoints as string[]) || []

        const { data: svcRaw } = await db
          .from('services')
          .select('name, description, mcp_endpoint')
          .eq('business_id', biz.id as string)
          .eq('status', 'active')

        services = (svcRaw || []) as typeof services
      }
    } catch {
      // DB unavailable — generate from provided info only
    }

    // Build the slug from domain
    const slug = cleanDomain.replace(/[^a-z0-9]+/gi, '-').toLowerCase()

    // Build skills from services or generate defaults
    const skills: Record<string, unknown>[] = []

    if (services.length > 0) {
      for (const svc of services) {
        skills.push({
          id: svc.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
          name: svc.name,
          description: svc.description || `${svc.name} service`,
          input: {
            type: 'object',
            properties: {
              query: { type: 'string' },
            },
          },
        })
      }
    } else {
      // Default skill placeholder
      skills.push({
        id: 'query',
        name: `Query ${name.trim()}`,
        description: `Interact with ${name.trim()} services`,
        input: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Your request' },
          },
          required: ['query'],
        },
      })
    }

    // Build capabilities section
    const capabilitiesSection: Record<string, unknown> = {}

    if (mcp_endpoints.length > 0) {
      capabilitiesSection.mcp = {
        endpoint: mcp_endpoints[0],
        transport: 'http',
      }
    }

    capabilitiesSection.rest_api = {
      base_url: resolvedApiBase,
      documentation: `${baseUrl}/openapi.json`,
    }

    const agentCard = {
      name: name.trim(),
      description: description.trim(),
      url: baseUrl,
      version: '1.0.0',
      capabilities: capabilitiesSection,
      skills,
      authentication: {
        public_endpoints: [`${resolvedApiBase}/health`],
        authenticated_endpoints: [`${resolvedApiBase}/v1`],
        method: 'bearer_token',
      },
      contact: {
        email: `support@${cleanDomain}`,
        website: baseUrl,
      },
    }

    return NextResponse.json(agentCard, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error('[remediate/agent-card] Error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
