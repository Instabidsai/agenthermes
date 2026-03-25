import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { getBusinessBySlug } from '@/lib/business'
import { requireAuth } from '@/lib/auth'
import crypto from 'crypto'

/**
 * POST /api/v1/business/[slug]/api-keys
 * Generate a new API key for a business.
 * Returns the full key ONCE (only time it's visible).
 *
 * GET /api/v1/business/[slug]/api-keys
 * List keys for a business (prefix + metadata only).
 *
 * DELETE /api/v1/business/[slug]/api-keys
 * Revoke a key by ID. Body: { key_id: string }
 */

function generateApiKey(): string {
  return 'ah_' + crypto.randomBytes(16).toString('hex') // ah_ + 32 hex chars
}

function hashKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex')
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { slug } = await params
    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[api-keys] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    let name = 'default'
    try {
      const body = await request.json()
      if (body.name && typeof body.name === 'string') {
        name = body.name.trim().slice(0, 100)
      }
    } catch {
      // No body or invalid JSON — use default name
    }

    const rawKey = generateApiKey()
    const keyHash = hashKey(rawKey)
    const keyPrefix = rawKey.slice(0, 10) + '...'

    const supabase = getServiceClient()

    const { data: apiKeyRaw, error: insertError } = await supabase
      .from('api_keys')
      .insert({
        business_id: business.id,
        key_hash: keyHash,
        key_prefix: keyPrefix,
        name,
      } as any)
      .select('id, business_id, key_prefix, name, created_at')
      .single()
    const apiKey = apiKeyRaw as any

    if (insertError || !apiKey) {
      console.error('[api-keys] Insert error:', insertError?.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({
      id: apiKey.id,
      business_id: apiKey.business_id,
      key_prefix: apiKey.key_prefix,
      name: apiKey.name,
      created_at: apiKey.created_at,
      key: rawKey, // Only time the full key is returned
      warning: 'Store this key securely. It will not be shown again.',
    }, { status: 201 })
  } catch (err) {
    console.error('[api-keys] POST unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { slug } = await params
    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[api-keys] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    const supabase = getServiceClient()

    const { data: keys, error: queryError } = await supabase
      .from('api_keys')
      .select('id, key_prefix, name, created_at, last_used_at, revoked')
      .eq('business_id', business.id)
      .order('created_at', { ascending: false })

    if (queryError) {
      console.error('[api-keys] Query error:', queryError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ api_keys: keys || [] })
  } catch (err) {
    console.error('[api-keys] GET unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { slug } = await params
    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[api-keys] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    let keyId: string | null = null
    try {
      const body = await request.json()
      keyId = body.key_id
    } catch {
      // Try query param
      keyId = request.nextUrl.searchParams.get('key_id')
    }

    if (!keyId || typeof keyId !== 'string') {
      return NextResponse.json({ error: 'key_id is required' }, { status: 400 })
    }

    const supabase = getServiceClient()

    // Verify key belongs to this business before revoking
    const { data: existing, error: checkErr } = await supabase
      .from('api_keys')
      .select('id, business_id, revoked')
      .eq('id', keyId)
      .single()

    if (checkErr || !existing) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 })
    }

    if ((existing as any).business_id !== business.id) {
      return NextResponse.json({ error: 'API key does not belong to this business' }, { status: 403 })
    }

    if ((existing as any).revoked) {
      return NextResponse.json({ error: 'API key is already revoked' }, { status: 400 })
    }

    const { error: updateError } = await (supabase
      .from('api_keys') as any)
      .update({ revoked: true })
      .eq('id', keyId)

    if (updateError) {
      console.error('[api-keys] Revoke error:', updateError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ message: 'API key revoked', key_id: keyId })
  } catch (err) {
    console.error('[api-keys] DELETE unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
