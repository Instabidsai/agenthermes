import Link from 'next/link'
import {
  ArrowRight,
  Thermometer,
  TreePine,
  Droplets,
  Sparkles,
  Home,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Scale,
  Calculator,
  Stethoscope,
  Building2,
  Briefcase,
  Cloud,
  Laptop,
  Globe,
  Video,
  Pill,
  Brain,
  Shield,
  Landmark,
  TrendingUp,
  Bed,
  CarFront,
  Map,
  GraduationCap,
  BookOpen,
  Package,
  Truck,
  Zap,
  Bug,
  KeyRound,
  Camera,
  Heart,
  ShoppingCart,
  Flower2,
  type LucideIcon,
} from 'lucide-react'
import { getServiceClient } from '@/lib/supabase'
import {
  verticals,
  categoryLabels,
  categoryOrder,
  getVerticalsByCategory,
  type VerticalData,
  type VerticalCategory,
} from '@/lib/verticals/landing-data'

// ---------------------------------------------------------------------------
// ISR — revalidate every 60s so counts stay fresh
// ---------------------------------------------------------------------------
export const revalidate = 60

// ---------------------------------------------------------------------------
// Icon map — lucide icons keyed by the string stored in landing-data
// ---------------------------------------------------------------------------
const iconMap: Record<string, LucideIcon> = {
  Thermometer,
  TreePine,
  Droplets,
  Sparkles,
  Home,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Scale,
  Calculator,
  Stethoscope,
  Building2,
  Briefcase,
  Cloud,
  Laptop,
  Video,
  Pill,
  Brain,
  Shield,
  Landmark,
  TrendingUp,
  Bed,
  CarFront,
  Map,
  GraduationCap,
  BookOpen,
  Package,
  Truck,
  Zap,
  Bug,
  KeyRound,
  Camera,
  Heart,
  ShoppingCart,
  Flower2,
}

// ---------------------------------------------------------------------------
// Data fetching — total scored businesses (used in hero + cards)
// ---------------------------------------------------------------------------
async function getScoredCount(): Promise<number> {
  try {
    const db = getServiceClient()
    const { count } = await db
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .not('audit_score', 'is', null)
    return count ?? 0
  } catch {
    return 0
  }
}

// ---------------------------------------------------------------------------
// Vertical card component
// ---------------------------------------------------------------------------
function VerticalCard({ vertical }: { vertical: VerticalData }) {
  const Icon = iconMap[vertical.icon] || Globe
  return (
    <Link
      href={`/for/${vertical.slug}`}
      className="group relative flex flex-col p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-200 hover:bg-zinc-900/80"
    >
      {/* Icon + name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
          <Icon className="h-5 w-5 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
          {vertical.name}
        </h3>
      </div>

      {/* One-line description */}
      <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">
        {vertical.shortDescription}
      </p>

      {/* Stats row */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/50">
          Avg {vertical.stats.avgScore}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/50">
          {vertical.stats.businesses} businesses
        </span>
      </div>

      {/* Example agent query */}
      <p className="text-xs text-zinc-500 italic leading-relaxed line-clamp-2">
        &ldquo;{vertical.agentQuery}&rdquo;
      </p>

      {/* Arrow indicator */}
      <div className="absolute top-6 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="h-4 w-4 text-emerald-400" />
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Category section
// ---------------------------------------------------------------------------
function CategorySection({
  category,
  verts,
}: {
  category: VerticalCategory
  verts: VerticalData[]
}) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-zinc-800/60" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          {categoryLabels[category]}
          <span className="ml-2 text-zinc-600">({verts.length})</span>
        </h2>
        <div className="h-px flex-1 bg-zinc-800/60" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {verts.map((v) => (
          <VerticalCard key={v.slug} vertical={v} />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ForAllVerticalsPage() {
  const scoredCount = await getScoredCount()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Agent-Ready for Every Business',
    url: 'https://agenthermes.ai/for',
    description:
      'Browse 15 business verticals and see how your industry scores on AI agent readiness.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: verticals.length,
      itemListElement: verticals.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: v.name,
        url: `https://agenthermes.ai/for/${v.slug}`,
      })),
    },
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
              {verticals.length} verticals &middot; {scoredCount} businesses scored
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Agent-Ready for{' '}
              <span className="text-emerald-500">Every Business</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
              Whether you&apos;re a local plumber or a global SaaS, we make you
              discoverable by AI agents.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                Check Your Score
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VERTICALS GRID ===== */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {categoryOrder.map((cat) => {
            const verts = getVerticalsByCategory(cat)
            if (verts.length === 0) return null
            return (
              <CategorySection key={cat} category={cat} verts={verts} />
            )
          })}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Don&apos;t see your industry?
          </h2>
          <p className="text-zinc-400 text-lg mb-4 max-w-lg mx-auto">
            We support any business. Our 9-dimension scanner works across every
            vertical — from solo freelancers to enterprise platforms.
          </p>
          <p className="text-zinc-500 text-sm mb-10 max-w-md mx-auto">
            Get your free Agent Readiness Score in 60 seconds and see exactly
            where you stand.
          </p>
          <Link
            href="/connect"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
