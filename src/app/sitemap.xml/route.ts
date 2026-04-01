import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export const revalidate = 3600 // regenerate every hour

export async function GET() {
  const baseUrl = 'https://agenthermes.ai'
  const now = new Date().toISOString()

  // Static pages
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/discover', priority: '0.9', changefreq: 'daily' },
    { loc: '/audit', priority: '0.9', changefreq: 'weekly' },
    { loc: '/register', priority: '0.8', changefreq: 'monthly' },
    { loc: '/registry', priority: '0.8', changefreq: 'daily' },
    { loc: '/dashboard', priority: '0.7', changefreq: 'weekly' },
    { loc: '/remediate', priority: '0.8', changefreq: 'weekly' },
    { loc: '/leaderboard', priority: '0.8', changefreq: 'daily' },
    { loc: '/report', priority: '0.7', changefreq: 'weekly' },
    { loc: '/analytics', priority: '0.6', changefreq: 'weekly' },
    { loc: '/changelog', priority: '0.5', changefreq: 'weekly' },
    { loc: '/glossary', priority: '0.8', changefreq: 'weekly' },
    { loc: '/faq', priority: '0.7', changefreq: 'weekly' },
    { loc: '/what-is-agent-ready', priority: '0.8', changefreq: 'monthly' },
    { loc: '/commerce', priority: '0.7', changefreq: 'weekly' },
    { loc: '/integrations', priority: '0.7', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.8', changefreq: 'daily' },
    { loc: '/pricing', priority: '0.7', changefreq: 'monthly' },
    { loc: '/developers', priority: '0.7', changefreq: 'weekly' },
    { loc: '/stats', priority: '0.6', changefreq: 'daily' },
    { loc: '/standard', priority: '0.7', changefreq: 'monthly' },
    { loc: '/about', priority: '0.5', changefreq: 'monthly' },
    { loc: '/connect', priority: '0.7', changefreq: 'weekly' },
    { loc: '/playground', priority: '0.6', changefreq: 'weekly' },
    { loc: '/status', priority: '0.5', changefreq: 'daily' },
    { loc: '/digest', priority: '0.6', changefreq: 'daily' },
  ]

  // Comparison pages
  const comparePages = [
    { loc: '/compare/stripe-vs-openai', priority: '0.7', changefreq: 'weekly' },
    { loc: '/compare/shopify-vs-woocommerce', priority: '0.7', changefreq: 'weekly' },
    { loc: '/compare/slack-vs-discord', priority: '0.7', changefreq: 'weekly' },
  ]

  // Report pages
  const reportPages = [
    { loc: '/report/state-of-readiness', priority: '0.8', changefreq: 'weekly' },
    { loc: '/report/saas-readiness', priority: '0.7', changefreq: 'weekly' },
    { loc: '/report/retail-readiness', priority: '0.7', changefreq: 'weekly' },
    { loc: '/report/enterprise-readiness', priority: '0.7', changefreq: 'weekly' },
  ]

  // Blog posts
  const blogPages = [
    { loc: '/blog/why-stripe-scores-68', priority: '0.7', changefreq: 'monthly' },
    { loc: '/blog/mcp-gap', priority: '0.7', changefreq: 'monthly' },
    { loc: '/blog/arl-levels-explained', priority: '0.7', changefreq: 'monthly' },
  ]

  // All 50 vertical landing pages
  const verticals = [
    'restaurants', 'hvac', 'lawn-care', 'plumbing', 'cleaning',
    'roofing', 'dentist', 'auto-dealer', 'law-firm', 'real-estate',
    'saas', 'ecommerce', 'agency', 'accounting', 'freelancer',
    'telehealth', 'pharmacy', 'mental-health', 'insurance', 'mortgage',
    'financial-advisor', 'hotel', 'car-rental', 'tour-guide', 'online-courses',
    'tutoring', 'shipping', 'moving', 'electrician', 'pest-control',
    'locksmith', 'photographer', 'veterinarian', 'grocery', 'florist',
    'event-venue', 'music-teacher', 'fitness', 'auto-repair', 'car-wash',
    'salon', 'spa', 'nail-salon', 'bakery', 'catering',
    'property-management', 'storage', 'painter', 'landscaper', 'pool-service',
  ]

  // Dynamic business profile pages + score pages
  let businessSlugs: { slug: string; domain: string | null; updated_at: string }[] = []
  try {
    const db = getServiceClient()
    const { data } = await db
      .from('businesses')
      .select('slug, domain, updated_at')
      .order('audit_score', { ascending: false })
      .limit(5000)

    businessSlugs = (data || []) as { slug: string; domain: string | null; updated_at: string }[]
  } catch (err) {
    console.error('[sitemap] Failed to fetch businesses:', err instanceof Error ? err.message : err)
  }

  const toEntry = (p: { loc: string; priority: string; changefreq: string }, lastmod?: string) =>
    `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <lastmod>${lastmod || now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`

  const staticEntries = staticPages.map((p) => toEntry(p)).join('\n')
  const compareEntries = comparePages.map((p) => toEntry(p)).join('\n')
  const reportEntries = reportPages.map((p) => toEntry(p)).join('\n')
  const blogEntries = blogPages.map((p) => toEntry(p)).join('\n')

  const businessEntries = businessSlugs
    .map(
      (b) => `  <url>
    <loc>${baseUrl}/business/${b.slug}</loc>
    <lastmod>${b.updated_at || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('\n')

  const scoreEntries = businessSlugs
    .filter((b) => b.domain)
    .map(
      (b) => `  <url>
    <loc>${baseUrl}/score/${encodeURIComponent(b.domain!)}</loc>
    <lastmod>${b.updated_at || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n')

  const verticalEntries = verticals
    .map(
      (v) => `  <url>
    <loc>${baseUrl}/for/${v}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${compareEntries}
${reportEntries}
${blogEntries}
${verticalEntries}
${businessEntries}
${scoreEntries}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
