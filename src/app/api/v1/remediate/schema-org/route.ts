import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

type SchemaType = 'SoftwareApplication' | 'Organization' | 'LocalBusiness' | 'Product'

const VALID_TYPES: SchemaType[] = ['SoftwareApplication', 'Organization', 'LocalBusiness', 'Product']

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const { domain, name, description, type } = body as {
      domain?: string
      name?: string
      description?: string
      type?: string
    }

    if (!domain || typeof domain !== 'string' || domain.trim().length === 0) {
      return NextResponse.json({ error: 'domain is required' }, { status: 400 })
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json({ error: 'description is required' }, { status: 400 })
    }

    const schemaType: SchemaType = VALID_TYPES.includes(type as SchemaType)
      ? (type as SchemaType)
      : 'Organization'

    const cleanDomain = domain
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '')

    const baseUrl = `https://${cleanDomain}`

    // Try to enrich from our DB
    let services: { name: string; description: string | null; pricing_model: string }[] = []
    let capabilities: string[] = []
    let auditScore: number | null = null
    let contactEmail: string | null = null

    try {
      const db = getServiceClient()
      const { data: bizRaw } = await db
        .from('businesses')
        .select('id, capabilities, audit_score, owner_email')
        .eq('domain', cleanDomain)
        .maybeSingle()

      const biz = bizRaw as Record<string, unknown> | null

      if (biz) {
        capabilities = (biz.capabilities as string[]) || []
        auditScore = biz.audit_score as number | null
        // Do NOT expose owner_email in output — use generic contact
        contactEmail = `info@${cleanDomain}`

        const { data: svcRaw } = await db
          .from('services')
          .select('name, description, pricing_model')
          .eq('business_id', biz.id as string)
          .eq('status', 'active')

        services = (svcRaw || []) as typeof services
      }
    } catch {
      // DB unavailable — generate from provided info only
    }

    // Build Schema.org JSON-LD based on type
    const jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: name.trim(),
      url: baseUrl,
      description: description.trim(),
    }

    // Type-specific fields
    switch (schemaType) {
      case 'SoftwareApplication':
        jsonLd.applicationCategory = 'BusinessApplication'
        jsonLd.operatingSystem = 'Web'
        jsonLd.offers = buildOffers(services, baseUrl)
        jsonLd.aggregateRating = {
          '@type': 'AggregateRating',
          ...(auditScore !== null ? { ratingValue: Math.min(5, (auditScore / 100) * 5).toFixed(1), bestRating: '5' } : {}),
        }
        if (capabilities.length > 0) {
          jsonLd.featureList = capabilities.join(', ')
        }
        break

      case 'Organization':
        jsonLd.logo = `${baseUrl}/logo.png`
        jsonLd.contactPoint = {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: contactEmail || `support@${cleanDomain}`,
          url: `${baseUrl}/contact`,
        }
        if (services.length > 0) {
          jsonLd.hasOfferCatalog = {
            '@type': 'OfferCatalog',
            name: `${name.trim()} Services`,
            itemListElement: services.map((svc, i) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: svc.name,
                description: svc.description || svc.name,
              },
              position: i + 1,
            })),
          }
        }
        if (capabilities.length > 0) {
          jsonLd.knowsAbout = capabilities
        }
        break

      case 'LocalBusiness':
        jsonLd.image = `${baseUrl}/logo.png`
        jsonLd.telephone = ''
        jsonLd.address = {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        }
        jsonLd.openingHoursSpecification = {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        }
        if (services.length > 0) {
          jsonLd.hasOfferCatalog = {
            '@type': 'OfferCatalog',
            name: `${name.trim()} Services`,
            itemListElement: services.map((svc, i) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: svc.name,
                description: svc.description || svc.name,
              },
              position: i + 1,
            })),
          }
        }
        if (auditScore !== null) {
          jsonLd.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: Math.min(5, (auditScore / 100) * 5).toFixed(1),
            bestRating: '5',
          }
        }
        break

      case 'Product':
        jsonLd.image = `${baseUrl}/product.png`
        jsonLd.brand = {
          '@type': 'Brand',
          name: name.trim(),
        }
        jsonLd.offers = buildOffers(services, baseUrl)
        if (auditScore !== null) {
          jsonLd.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: Math.min(5, (auditScore / 100) * 5).toFixed(1),
            bestRating: '5',
          }
        }
        if (capabilities.length > 0) {
          jsonLd.additionalProperty = capabilities.map((cap) => ({
            '@type': 'PropertyValue',
            name: 'capability',
            value: cap,
          }))
        }
        break
    }

    return NextResponse.json(jsonLd, {
      headers: { 'Content-Type': 'application/ld+json' },
    })
  } catch (err) {
    console.error('[remediate/schema-org] Error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function buildOffers(
  services: { name: string; description: string | null; pricing_model: string }[],
  baseUrl: string
): Record<string, unknown> {
  if (services.length === 0) {
    return {
      '@type': 'Offer',
      url: baseUrl,
      priceCurrency: 'USD',
    }
  }

  if (services.length === 1) {
    return {
      '@type': 'Offer',
      url: baseUrl,
      priceCurrency: 'USD',
      name: services[0].name,
      description: services[0].description || services[0].name,
    }
  }

  return {
    '@type': 'AggregateOffer',
    offerCount: services.length,
    offers: services.map((svc) => ({
      '@type': 'Offer',
      name: svc.name,
      description: svc.description || svc.name,
      priceCurrency: 'USD',
    })),
  }
}
