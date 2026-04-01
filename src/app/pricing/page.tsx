import Link from 'next/link'
import {
  Check,
  ArrowRight,
  Zap,
  Shield,
  Building2,
  Crown,
} from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Get started instantly. No credit card required.',
    icon: Zap,
    highlighted: false,
    cta: 'Start Free',
    ctaHref: '/audit',
    features: [
      'Unlimited scans',
      'Public score page',
      'Basic SVG badge',
      'MCP access (6 tools)',
      'Score API (GET /api/v1/score)',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    description: 'Continuous monitoring for growing businesses.',
    icon: Shield,
    highlighted: true,
    badge: 'Most Popular',
    cta: 'Start Free Trial',
    ctaHref: '/audit',
    features: [
      'Everything in Free',
      'Continuous monitoring (daily re-scans)',
      'Premium badge with certification',
      'Improvement recommendations',
      'Email alerts on score changes',
      'Analytics dashboard',
      'Up to 5 businesses',
    ],
  },
  {
    name: 'Business',
    price: '$199',
    period: '/mo',
    description: 'Auto-remediation and scale for agencies and teams.',
    icon: Building2,
    highlighted: false,
    cta: 'Start Free Trial',
    ctaHref: '/audit',
    features: [
      'Everything in Pro',
      'Auto-remediation tools',
      '.well-known/agent-hermes.json generation',
      'Mystery shopper testing',
      'Priority support',
      'Up to 25 businesses',
      'Batch scan API',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations.',
    icon: Crown,
    highlighted: false,
    cta: 'Contact Sales',
    ctaHref: 'mailto:sales@agenthermes.ai',
    features: [
      'Everything in Business',
      'Custom scoring dimensions',
      'White-label badges',
      'SLA guarantee',
      'Dedicated support',
      'Unlimited businesses',
      'Custom API limits',
    ],
  },
]

const comparisonFeatures = [
  {
    category: 'Scanning',
    features: [
      { name: 'On-demand scans', free: 'Unlimited', pro: 'Unlimited', business: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Daily automated re-scans', free: false, pro: true, business: true, enterprise: true },
      { name: 'Batch scan API', free: false, pro: false, business: true, enterprise: true },
      { name: 'Custom scan frequency', free: false, pro: false, business: false, enterprise: true },
    ],
  },
  {
    category: 'Badges & Visibility',
    features: [
      { name: 'Public score page', free: true, pro: true, business: true, enterprise: true },
      { name: 'Basic SVG badge', free: true, pro: true, business: true, enterprise: true },
      { name: 'Premium certified badge', free: false, pro: true, business: true, enterprise: true },
      { name: 'White-label badges', free: false, pro: false, business: false, enterprise: true },
    ],
  },
  {
    category: 'Monitoring & Alerts',
    features: [
      { name: 'Email alerts on score changes', free: false, pro: true, business: true, enterprise: true },
      { name: 'Analytics dashboard', free: false, pro: true, business: true, enterprise: true },
      { name: 'Improvement recommendations', free: false, pro: true, business: true, enterprise: true },
      { name: 'Mystery shopper testing', free: false, pro: false, business: true, enterprise: true },
    ],
  },
  {
    category: 'Remediation',
    features: [
      { name: 'Auto-remediation tools', free: false, pro: false, business: true, enterprise: true },
      { name: '.well-known/agent-hermes.json generation', free: false, pro: false, business: true, enterprise: true },
      { name: 'Custom scoring dimensions', free: false, pro: false, business: false, enterprise: true },
    ],
  },
  {
    category: 'API & Integration',
    features: [
      { name: 'Score API (GET /api/v1/score)', free: true, pro: true, business: true, enterprise: true },
      { name: 'MCP access (6 tools)', free: true, pro: true, business: true, enterprise: true },
      { name: 'Custom API limits', free: false, pro: false, business: false, enterprise: true },
    ],
  },
  {
    category: 'Support & Scale',
    features: [
      { name: 'Businesses included', free: 'Unlimited', pro: 'Up to 5', business: 'Up to 25', enterprise: 'Unlimited' },
      { name: 'Community support', free: true, pro: true, business: true, enterprise: true },
      { name: 'Priority support', free: false, pro: false, business: true, enterprise: true },
      { name: 'Dedicated support', free: false, pro: false, business: false, enterprise: true },
      { name: 'SLA guarantee', free: false, pro: false, business: false, enterprise: true },
    ],
  },
]

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm text-zinc-300">{value}</span>
  }
  if (value) {
    return <Check className="h-4 w-4 text-emerald-500 mx-auto" />
  }
  return <span className="text-zinc-700 text-sm">&mdash;</span>
}

const pricingJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AgentHermes Free",
    "description": "Get started instantly with unlimited scans, public score page, and basic SVG badge. No credit card required.",
    "brand": { "@type": "Brand", "name": "AgentHermes" },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-01-01",
      "availability": "https://schema.org/InStock",
      "url": "https://agenthermes.ai/pricing"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AgentHermes Pro",
    "description": "Continuous monitoring for growing businesses. Daily re-scans, premium badge, improvement recommendations, email alerts, and analytics dashboard for up to 5 businesses.",
    "brand": { "@type": "Brand", "name": "AgentHermes" },
    "offers": {
      "@type": "Offer",
      "price": "49",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-01-01",
      "availability": "https://schema.org/InStock",
      "url": "https://agenthermes.ai/pricing"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AgentHermes Business",
    "description": "Auto-remediation and scale for agencies and teams. Includes auto-remediation tools, mystery shopper testing, priority support, and batch scan API for up to 25 businesses.",
    "brand": { "@type": "Brand", "name": "AgentHermes" },
    "offers": {
      "@type": "Offer",
      "price": "199",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-01-01",
      "availability": "https://schema.org/InStock",
      "url": "https://agenthermes.ai/pricing"
    }
  }
]

export default function PricingPage() {
  return (
    <div className="relative">
      {pricingJsonLd.map((product, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
            { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://agenthermes.ai/pricing' },
          ],
        }) }}
      />
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />
        {/* Radial emerald glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
              Simple, transparent pricing
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Start free.{' '}
              <span className="text-emerald-500">Scale when ready.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Every business gets unlimited free scans. Upgrade for continuous
              monitoring, auto-remediation, and enterprise-grade controls.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-xl border p-6 lg:p-8 transition-all duration-200 hover:-translate-y-1 ${
                  tier.highlighted
                    ? 'border-emerald-500/50 bg-emerald-500/[0.04] shadow-[0_0_40px_-12px_rgba(16,185,129,0.2)] hover:shadow-[0_0_60px_-12px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/20'
                    : 'border-zinc-800/80 bg-zinc-900/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5'
                }`}
              >
                {/* Most Popular badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                      tier.highlighted
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-zinc-800/80 border-zinc-700/50'
                    }`}
                  >
                    <tier.icon
                      className={`h-5 w-5 ${
                        tier.highlighted ? 'text-emerald-400' : 'text-zinc-300'
                      }`}
                    />
                  </div>
                  <h2 className="text-xl font-bold">{tier.name}</h2>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-zinc-500 text-sm ml-1">
                      {tier.period}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  {tier.description}
                </p>

                {/* CTA */}
                <Link
                  href={tier.ctaHref}
                  className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 mb-8 ${
                    tier.highlighted
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                      : 'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Divider */}
                <div className="h-px bg-zinc-800 mb-6" />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check
                        className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-500"
                      />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Compare Plans
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg max-w-xl mx-auto">
              Full feature breakdown across all tiers.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-sm font-medium text-zinc-500 pb-4 pr-8 w-[40%]">
                    Feature
                  </th>
                  <th className="text-center text-sm font-semibold text-zinc-300 pb-4 px-4 w-[15%]">
                    Free
                  </th>
                  <th className="text-center text-sm font-semibold text-emerald-400 pb-4 px-4 w-[15%]">
                    Pro
                  </th>
                  <th className="text-center text-sm font-semibold text-zinc-300 pb-4 px-4 w-[15%]">
                    Business
                  </th>
                  <th className="text-center text-sm font-semibold text-zinc-300 pb-4 px-4 w-[15%]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <>
                    <tr key={`cat-${category.category}`}>
                      <td
                        colSpan={5}
                        className="pt-8 pb-3 text-xs font-bold uppercase tracking-wider text-zinc-500"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                      >
                        <td className="py-3.5 pr-8 text-sm text-zinc-300">
                          {feature.name}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <FeatureCell value={feature.free} />
                        </td>
                        <td className="py-3.5 px-4 text-center bg-emerald-500/[0.02]">
                          <FeatureCell value={feature.pro} />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <FeatureCell value={feature.business} />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <FeatureCell value={feature.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile comparison — stacked cards */}
          <div className="lg:hidden space-y-8">
            {comparisonFeatures.map((category) => (
              <div key={category.category}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80"
                    >
                      <div className="text-sm font-medium text-zinc-200 mb-3">
                        {feature.name}
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <div className="text-[10px] text-zinc-600 mb-1">Free</div>
                          <FeatureCell value={feature.free} />
                        </div>
                        <div>
                          <div className="text-[10px] text-emerald-500/70 mb-1">Pro</div>
                          <FeatureCell value={feature.pro} />
                        </div>
                        <div>
                          <div className="text-[10px] text-zinc-600 mb-1">Biz</div>
                          <FeatureCell value={feature.business} />
                        </div>
                        <div>
                          <div className="text-[10px] text-zinc-600 mb-1">Ent</div>
                          <FeatureCell value={feature.enterprise} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Start Free &mdash; No credit card required
          </h2>
          <p className="text-zinc-400 leading-relaxed text-lg mb-10 max-w-lg mx-auto">
            Get your Agent Readiness Score in 60 seconds. Upgrade whenever
            you&apos;re ready for continuous monitoring.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-8 py-4 shadow-lg shadow-emerald-500/10 font-semibold transition-all duration-200"
          >
            Get Your Score Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
