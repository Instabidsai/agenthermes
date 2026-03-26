import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth, rateLimit } from '@/lib/auth'
import { runAudit, tierFromScore, normalizeUrl } from '@/lib/audit-engine'

export const runtime = 'nodejs'
export const maxDuration = 60

// ---------------------------------------------------------------------------
// POST /api/v1/scan/batch — Batch domain scanning
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // Auth required — batch scanning is expensive
  const authError = requireAuth(request)
  if (authError) return authError

  // Rate limit: 1 batch per minute per IP
  const rateLimitError = rateLimit(request, 1, 60_000)
  if (rateLimitError) return rateLimitError

  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { domains } = body as { domains?: string[] }

    if (!Array.isArray(domains) || domains.length === 0) {
      return NextResponse.json(
        { error: '"domains" must be a non-empty array of domain strings' },
        { status: 400 }
      )
    }

    if (domains.length > 100) {
      return NextResponse.json(
        { error: `Too many domains. Maximum is 100, received ${domains.length}.` },
        { status: 400 }
      )
    }

    // Validate and deduplicate domains
    const validDomains: string[] = []
    const invalidDomains: { domain: string; reason: string }[] = []

    for (const raw of domains) {
      if (typeof raw !== 'string') {
        invalidDomains.push({ domain: String(raw), reason: 'Not a string' })
        continue
      }

      const cleaned = raw.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/+$/, '')
      if (!cleaned || cleaned.length > 253) {
        invalidDomains.push({ domain: raw, reason: 'Invalid domain format' })
        continue
      }

      if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i.test(cleaned)) {
        invalidDomains.push({ domain: raw, reason: 'Invalid domain format' })
        continue
      }

      if (!validDomains.includes(cleaned)) {
        validDomains.push(cleaned)
      }
    }

    if (validDomains.length === 0) {
      return NextResponse.json(
        {
          error: 'No valid domains provided',
          invalid: invalidDomains,
        },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Check which domains already have recent scores (within 24h)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const { data: existingRaw } = await supabase
      .from('businesses')
      .select('id, name, slug, domain, audit_score, audit_tier, updated_at')
      .in('domain', validDomains)

    const existing = (existingRaw || []) as Record<string, any>[]
    const existingMap = new Map(existing.map((b) => [b.domain, b]))

    const results: {
      domain: string
      score: number | null
      tier: string
      hermes_id: string | null
      status: 'cached' | 'scanned' | 'queued' | 'error'
      error?: string
    }[] = []

    const domainsToScan: string[] = []

    // Separate cached vs needs-scan
    for (const domain of validDomains) {
      const cached = existingMap.get(domain)
      if (cached && cached.updated_at > twentyFourHoursAgo && cached.audit_score > 0) {
        // Return cached result
        const crypto = await import('crypto')
        const hash = crypto
          .createHash('sha256')
          .update(cached.id)
          .digest('hex')
          .slice(0, 5)
          .toUpperCase()
        results.push({
          domain,
          score: cached.audit_score,
          tier: cached.audit_tier,
          hermes_id: `AH-${new Date().getFullYear()}-${hash}`,
          status: 'cached',
        })
      } else {
        domainsToScan.push(domain)
      }
    }

    // For small batches (<=5), scan synchronously
    if (domainsToScan.length <= 5) {
      const scanResults = await Promise.allSettled(
        domainsToScan.map(async (domain) => {
          try {
            const scorecard = await runAudit(domain)
            const normalizedDomain = normalizeUrl(domain)
              .replace(/^https?:\/\//, '')
              .replace(/^www\./, '')

            // Upsert business
            const { data: bizRaw } = await supabase
              .from('businesses')
              .upsert(
                {
                  domain: normalizedDomain,
                  name: scorecard.business_name,
                  slug: normalizedDomain.replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
                  audit_score: scorecard.total_score,
                  audit_tier: scorecard.tier,
                  updated_at: new Date().toISOString(),
                } as any,
                { onConflict: 'domain' }
              )
              .select('id')
              .single()

            const biz = bizRaw as any
            let hermesId: string | null = null
            if (biz?.id) {
              const crypto = await import('crypto')
              const hash = crypto
                .createHash('sha256')
                .update(biz.id)
                .digest('hex')
                .slice(0, 5)
                .toUpperCase()
              hermesId = `AH-${new Date().getFullYear()}-${hash}`

              // Save audit results
              const now = new Date()
              const nextAudit = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
              const auditRows = scorecard.categories.map((cat) => ({
                business_id: biz.id,
                category: cat.category,
                score: cat.score,
                max_score: cat.max_score,
                details: cat.details,
                recommendations: cat.recommendations,
                audited_at: now.toISOString(),
                next_audit_at: nextAudit.toISOString(),
              }))

              await supabase.from('audit_results').delete().eq('business_id', biz.id)
              await supabase.from('audit_results').insert(auditRows as any)
            }

            return {
              domain,
              score: scorecard.total_score,
              tier: scorecard.tier,
              hermes_id: hermesId,
              status: 'scanned' as const,
            }
          } catch (scanErr) {
            return {
              domain,
              score: null,
              tier: 'unaudited',
              hermes_id: null,
              status: 'error' as const,
              error: scanErr instanceof Error ? scanErr.message : 'Scan failed',
            }
          }
        })
      )

      for (const result of scanResults) {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        } else {
          // Should not happen with our try/catch, but handle gracefully
          results.push({
            domain: 'unknown',
            score: null,
            tier: 'unaudited',
            hermes_id: null,
            status: 'error',
            error: 'Unexpected scan failure',
          })
        }
      }
    } else {
      // For larger batches (>5), return queued status
      for (const domain of domainsToScan) {
        results.push({
          domain,
          score: null,
          tier: 'unaudited',
          hermes_id: null,
          status: 'queued',
        })
      }
    }

    return NextResponse.json({
      results,
      summary: {
        total_requested: validDomains.length,
        cached: results.filter((r) => r.status === 'cached').length,
        scanned: results.filter((r) => r.status === 'scanned').length,
        queued: results.filter((r) => r.status === 'queued').length,
        errors: results.filter((r) => r.status === 'error').length,
      },
      invalid_domains: invalidDomains.length > 0 ? invalidDomains : undefined,
    })
  } catch (err) {
    console.error('[scan/batch] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
