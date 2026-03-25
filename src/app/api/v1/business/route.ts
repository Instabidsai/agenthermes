import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, domain, description, owner_email, vertical, capabilities } = body

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      )
    }

    const slug = slugify(name)
    if (!slug) {
      return NextResponse.json(
        { error: 'Could not generate a valid slug from name' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Check for slug uniqueness
    const { data: existing } = await supabase
      .from('businesses')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: `A business with slug "${slug}" already exists` },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from('businesses')
      .insert({
        name: name.trim(),
        slug,
        domain: domain || null,
        description: description || null,
        owner_email: owner_email || null,
        vertical: vertical || null,
        capabilities: capabilities || [],
        mcp_endpoints: [],
        audit_score: 0,
        audit_tier: 'unaudited',
        trust_score: 0,
        pricing_visible: false,
        agent_onboarding: false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
