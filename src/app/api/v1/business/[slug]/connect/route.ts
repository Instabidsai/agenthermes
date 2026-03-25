import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { createConnectAccount, createAccountLink, isStripeConfigured } from '@/lib/stripe'
import { requireAuth } from '@/lib/auth'

/**
 * POST /api/v1/business/[slug]/connect
 *
 * Create a Stripe Connect account for a business and return the onboarding link.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Payment onboarding is unavailable.' },
        { status: 503 }
      )
    }

    const { slug } = await params

    if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const supabase = getServiceClient()

    // Fetch business
    const { data: businessRaw, error: bizError } = await supabase
      .from('businesses')
      .select('id, name, slug, domain, owner_email, stripe_connect_id')
      .eq('slug', slug)
      .single()
    const business = businessRaw as any

    if (bizError || !business) {
      if (bizError?.code === 'PGRST116' || !business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
      }
      console.error('[business/connect] Query error:', bizError!.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    // If already has a Connect account, just create a new onboarding link
    if (business.stripe_connect_id) {
      const link = await createAccountLink(business.stripe_connect_id, business.slug)
      return NextResponse.json({
        connect_account_id: business.stripe_connect_id,
        onboarding_url: link.url,
        message: 'Existing Connect account — new onboarding link generated',
      })
    }

    // Create new Connect account
    const account = await createConnectAccount({
      id: business.id,
      name: business.name,
      owner_email: business.owner_email,
      domain: business.domain,
    })

    // Create onboarding link
    const link = await createAccountLink(account.id, business.slug)

    return NextResponse.json({
      connect_account_id: account.id,
      onboarding_url: link.url,
      message: 'Stripe Connect account created. Redirect user to onboarding_url.',
    }, { status: 201 })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[business/connect] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
