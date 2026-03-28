import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'
import { encryptCredentials, decryptCredentials, applyAuth } from '@/lib/gateway/vault'
import { logError } from '@/lib/error-logger'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * POST /api/v1/gateway/activate
 *
 * Activate a pending gateway service by providing (or updating) credentials.
 * For services that were seeded without API keys or failed verification.
 *
 * Flow:
 * 1. Look up service by ID
 * 2. Encrypt new credentials (merge with existing if any)
 * 3. Verify the API works (test call)
 * 4. Set status to 'active'
 * 5. Return confirmation
 *
 * Auth required.
 */
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const {
      service_id,
      api_key,
      additional_credentials,
    } = body

    // --- Validation ---
    if (!service_id || typeof service_id !== 'string') {
      return NextResponse.json(
        { error: 'service_id is required' },
        { status: 400 }
      )
    }

    if (!UUID_RE.test(service_id)) {
      return NextResponse.json(
        { error: 'service_id must be a valid UUID' },
        { status: 400 }
      )
    }

    if (!api_key && !additional_credentials) {
      return NextResponse.json(
        { error: 'api_key or additional_credentials is required' },
        { status: 400 }
      )
    }

    if (api_key && typeof api_key !== 'string') {
      return NextResponse.json(
        { error: 'api_key must be a string' },
        { status: 400 }
      )
    }

    if (additional_credentials !== undefined && (typeof additional_credentials !== 'object' || Array.isArray(additional_credentials) || additional_credentials === null)) {
      return NextResponse.json(
        { error: 'additional_credentials must be a JSON object' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // --- Step 1: Look up service ---
    const { data: serviceRaw, error: lookupError } = await supabase
      .from('gateway_services')
      .select('id, name, api_base_url, auth_type, auth_header, encrypted_credentials, status')
      .eq('id', service_id)
      .single()

    if (lookupError) {
      if (lookupError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Gateway service not found' }, { status: 404 })
      }
      console.error('[gateway/activate] Lookup error:', lookupError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    if (!serviceRaw) {
      return NextResponse.json({ error: 'Gateway service not found' }, { status: 404 })
    }

    const service = serviceRaw as Record<string, any>

    // Warn if already active (but still allow re-activation with new creds)
    const wasAlreadyActive = service.status === 'active'

    // --- Step 2: Build merged credentials ---
    let existingCredentials: Record<string, string> = {}
    if (service.encrypted_credentials) {
      try {
        existingCredentials = decryptCredentials(service.encrypted_credentials)
      } catch {
        // If decryption fails (e.g. vault key changed), start fresh
        console.warn('[gateway/activate] Could not decrypt existing credentials, replacing.')
      }
    }

    const mergedCredentials: Record<string, string> = { ...existingCredentials }

    if (api_key) {
      mergedCredentials.api_key = api_key
    }

    if (additional_credentials && typeof additional_credentials === 'object') {
      for (const [k, v] of Object.entries(additional_credentials)) {
        if (typeof v === 'string') {
          mergedCredentials[k] = v
        }
      }
    }

    const encryptedCredentials = encryptCredentials(mergedCredentials)

    // --- Step 3: Verify the API works ---
    let apiVerified = false
    let verifyError: string | null = null

    try {
      const testHeaders: Record<string, string> = {
        'Accept': 'application/json',
      }

      applyAuth(
        testHeaders,
        mergedCredentials,
        service.auth_type,
        service.auth_header || 'Authorization'
      )

      let testUrl = service.api_base_url
      if (service.auth_type === 'query_param' && mergedCredentials.api_key) {
        const separator = testUrl.includes('?') ? '&' : '?'
        const paramName = service.auth_header || 'api_key'
        testUrl = `${testUrl}${separator}${encodeURIComponent(paramName)}=${encodeURIComponent(mergedCredentials.api_key)}`
      }

      const testResponse = await fetch(testUrl, {
        method: 'GET',
        headers: testHeaders,
        signal: AbortSignal.timeout(10_000),
      })

      // Accept any non-5xx as "API is reachable"
      if (testResponse.status < 500) {
        apiVerified = true
      } else {
        verifyError = `API returned ${testResponse.status}`
      }
    } catch (err) {
      const isTimeout = err instanceof DOMException && err.name === 'TimeoutError'
      verifyError = isTimeout
        ? 'API verification timed out after 10s'
        : `API unreachable: ${err instanceof Error ? err.message : 'Unknown error'}`
    }

    if (!apiVerified) {
      return NextResponse.json({
        service_id: service.id,
        name: service.name,
        status: service.status,
        api_verified: false,
        verify_error: verifyError,
        message: `API verification failed: ${verifyError}. Credentials saved but service remains "${service.status}". Fix the API and retry.`,
      }, { status: 422 })
    }

    // --- Step 4: Update service to active ---
    const { data: updatedRaw, error: updateError } = await (supabase
      .from('gateway_services') as any)
      .update({
        encrypted_credentials: encryptedCredentials,
        status: 'active',
      })
      .eq('id', service_id)
      .select('id, name, api_base_url, auth_type, category, status, created_at')
      .single()

    if (updateError) {
      console.error('[gateway/activate] Update error:', updateError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const updated = updatedRaw as Record<string, unknown>

    return NextResponse.json({
      service_id: updated.id,
      name: updated.name,
      status: 'active',
      api_verified: true,
      was_already_active: wasAlreadyActive,
      message: wasAlreadyActive
        ? 'Credentials updated and re-verified. Service remains active.'
        : 'Service activated. Credentials stored and API verified. Ready for agent calls.',
    })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[gateway/activate] Unexpected error:', err instanceof Error ? err.message : err)
    logError(
      '/api/v1/gateway/activate',
      'POST',
      err instanceof Error ? err : new Error(String(err)),
      request.headers.get('x-request-id') || undefined
    )
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
