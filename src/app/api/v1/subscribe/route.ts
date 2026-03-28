import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body.email !== 'string' || !EMAIL_RE.test(body.email.trim())) {
      return NextResponse.json(
        { error: 'Invalid or missing email address.' },
        { status: 400 }
      )
    }

    const email = body.email.trim().toLowerCase()
    const domain = typeof body.domain === 'string' ? body.domain.trim() : null
    const score = typeof body.score === 'number' ? body.score : null
    const tier = typeof body.tier === 'string' ? body.tier.trim() : null

    const db = getServiceClient()

    const { error } = await (db
      .from('email_subscribers') as any)
      .upsert(
        { email, domain, score, tier, active: true, subscribed_at: new Date().toISOString() },
        { onConflict: 'email,domain' }
      )

    if (error) {
      console.error('[subscribe] Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save subscription. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[subscribe] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
