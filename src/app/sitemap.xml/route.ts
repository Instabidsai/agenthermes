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
    { loc: '/dashboard', priority: '0.7', changefreq: 'weekly' },
    { loc: '/remediate', priority: '0.8', changefreq: 'weekly' },
    { loc: '/leaderboard', priority: '0.8', changefreq: 'daily' },
    { loc: '/report', priority: '0.7', changefreq: 'weekly' },
    { loc: '/analytics', priority: '0.6', changefreq: 'weekly' },
    { loc: '/changelog', priority: '0.5', changefreq: 'weekly' },
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

  const staticEntries = staticPages
    .map(
      (p) => `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n')

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

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
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
