// ---------------------------------------------------------------------------
// Vertical-Specific Scoring Weights
// ---------------------------------------------------------------------------
// Different business types have different priorities. A restaurant needs
// great booking and pricing transparency more than API quality. A SaaS
// platform needs strong API interoperability and agent experience.
//
// Multipliers: 1.0 = normal weight, >1.0 = more important, <1.0 = less important.
// After multiplying, we renormalize so total weight still sums to 0.93
// (the remaining 0.07 is the agent-native bonus, which is vertical-agnostic).
// ---------------------------------------------------------------------------

export interface VerticalWeights {
  vertical: string
  description: string
  adjustments: {
    d1_discoverability: number
    d2_interoperability: number
    d3_onboarding: number
    d4_pricing: number
    d5_payment: number
    d6_data_quality: number
    d7_security: number
    d8_reliability: number
    d9_agent_experience: number
  }
}

// ---------------------------------------------------------------------------
// Registry of vertical weight profiles
// ---------------------------------------------------------------------------

const VERTICAL_REGISTRY: VerticalWeights[] = [
  {
    vertical: 'saas',
    description: 'SaaS platforms — API quality, onboarding, and agent experience matter most',
    adjustments: {
      d1_discoverability: 1.0,
      d2_interoperability: 1.3,  // API quality is critical for SaaS
      d3_onboarding: 1.2,        // Developer onboarding matters
      d4_pricing: 1.0,
      d5_payment: 1.0,
      d6_data_quality: 1.1,
      d7_security: 1.1,
      d8_reliability: 1.0,
      d9_agent_experience: 1.2,  // Agent DX is a differentiator
    },
  },
  {
    vertical: 'restaurant',
    description: 'Restaurants — pricing, booking/onboarding, and discoverability are key',
    adjustments: {
      d1_discoverability: 1.2,   // Getting found by agents is essential
      d2_interoperability: 0.8,  // Less likely to have complex APIs
      d3_onboarding: 1.3,        // Booking/reservation flow
      d4_pricing: 1.3,           // Menu pricing transparency
      d5_payment: 1.1,
      d6_data_quality: 1.0,
      d7_security: 0.9,
      d8_reliability: 0.8,       // Less uptime-critical than SaaS
      d9_agent_experience: 0.8,
    },
  },
  {
    vertical: 'hvac',
    description: 'HVAC/Plumbing — emergency booking and availability are paramount',
    adjustments: {
      d1_discoverability: 1.1,
      d2_interoperability: 0.7,  // Usually simple service businesses
      d3_onboarding: 1.5,        // Emergency booking must work fast
      d4_pricing: 1.1,
      d5_payment: 1.0,
      d6_data_quality: 0.8,
      d7_security: 0.9,
      d8_reliability: 1.3,       // Must be reachable 24/7
      d9_agent_experience: 0.8,
    },
  },
  {
    vertical: 'plumber',
    description: 'Plumbing services — same priorities as HVAC',
    adjustments: {
      d1_discoverability: 1.1,
      d2_interoperability: 0.7,
      d3_onboarding: 1.5,
      d4_pricing: 1.1,
      d5_payment: 1.0,
      d6_data_quality: 0.8,
      d7_security: 0.9,
      d8_reliability: 1.3,
      d9_agent_experience: 0.8,
    },
  },
  {
    vertical: 'home-services',
    description: 'General home services — booking and availability focused',
    adjustments: {
      d1_discoverability: 1.1,
      d2_interoperability: 0.7,
      d3_onboarding: 1.4,
      d4_pricing: 1.2,
      d5_payment: 1.0,
      d6_data_quality: 0.8,
      d7_security: 0.9,
      d8_reliability: 1.2,
      d9_agent_experience: 0.8,
    },
  },
  {
    vertical: 'ecommerce',
    description: 'E-commerce — pricing, payments, and data quality for product catalogs',
    adjustments: {
      d1_discoverability: 1.1,
      d2_interoperability: 1.0,
      d3_onboarding: 1.0,
      d4_pricing: 1.2,           // Product pricing must be transparent
      d5_payment: 1.3,           // Payment processing is core
      d6_data_quality: 1.2,      // Product catalog data quality
      d7_security: 1.1,          // Handles payment data
      d8_reliability: 1.0,
      d9_agent_experience: 0.9,
    },
  },
  {
    vertical: 'healthcare',
    description: 'Healthcare — security, reliability, and data quality are critical',
    adjustments: {
      d1_discoverability: 0.9,
      d2_interoperability: 1.1,  // Health data exchange (FHIR, etc.)
      d3_onboarding: 1.0,
      d4_pricing: 0.9,
      d5_payment: 0.9,
      d6_data_quality: 1.3,      // Medical data must be accurate
      d7_security: 1.4,          // HIPAA, patient data protection
      d8_reliability: 1.2,       // Must be available
      d9_agent_experience: 0.9,
    },
  },
  {
    vertical: 'fintech',
    description: 'Fintech/Financial services — security, payments, and reliability',
    adjustments: {
      d1_discoverability: 0.9,
      d2_interoperability: 1.2,  // API quality for financial integrations
      d3_onboarding: 1.0,
      d4_pricing: 1.0,
      d5_payment: 1.3,           // Payments are the product
      d6_data_quality: 1.2,      // Financial data accuracy
      d7_security: 1.4,          // Non-negotiable
      d8_reliability: 1.2,
      d9_agent_experience: 1.0,
    },
  },
  {
    vertical: 'real-estate',
    description: 'Real estate — discoverability, onboarding, and pricing transparency',
    adjustments: {
      d1_discoverability: 1.3,   // Property listings must be findable
      d2_interoperability: 0.8,
      d3_onboarding: 1.2,        // Tour scheduling, inquiry flow
      d4_pricing: 1.3,           // Pricing transparency is everything
      d5_payment: 0.9,
      d6_data_quality: 1.1,      // Listing accuracy
      d7_security: 1.0,
      d8_reliability: 0.9,
      d9_agent_experience: 0.8,
    },
  },
  {
    vertical: 'education',
    description: 'Education/EdTech — onboarding, data quality, and discoverability',
    adjustments: {
      d1_discoverability: 1.2,
      d2_interoperability: 1.0,
      d3_onboarding: 1.3,        // Course enrollment flow
      d4_pricing: 1.1,
      d5_payment: 1.0,
      d6_data_quality: 1.2,      // Course/content data quality
      d7_security: 1.0,
      d8_reliability: 1.0,
      d9_agent_experience: 0.9,
    },
  },
  {
    vertical: 'logistics',
    description: 'Logistics/Shipping — API quality, reliability, and data quality',
    adjustments: {
      d1_discoverability: 0.9,
      d2_interoperability: 1.3,  // Tracking APIs, shipment APIs
      d3_onboarding: 1.0,
      d4_pricing: 1.1,           // Shipping rate transparency
      d5_payment: 1.0,
      d6_data_quality: 1.2,      // Tracking data accuracy
      d7_security: 1.0,
      d8_reliability: 1.3,       // Tracking must be always-on
      d9_agent_experience: 1.0,
    },
  },
  {
    vertical: 'marketing',
    description: 'Marketing/AdTech — API quality, data quality, and agent experience',
    adjustments: {
      d1_discoverability: 1.0,
      d2_interoperability: 1.2,  // Campaign management APIs
      d3_onboarding: 1.1,
      d4_pricing: 1.0,
      d5_payment: 1.0,
      d6_data_quality: 1.2,      // Analytics data quality
      d7_security: 1.0,
      d8_reliability: 1.1,
      d9_agent_experience: 1.2,  // Marketing agents need good DX
    },
  },
]

// ---------------------------------------------------------------------------
// Lookup and normalization
// ---------------------------------------------------------------------------

/** Normalize vertical string for matching (lowercase, trim, handle aliases) */
function normalizeVertical(vertical: string): string {
  const v = vertical.toLowerCase().trim()

  // Alias mapping — common variants map to canonical names
  const aliases: Record<string, string> = {
    'software': 'saas',
    'software-as-a-service': 'saas',
    'api': 'saas',
    'devtools': 'saas',
    'developer-tools': 'saas',
    'food': 'restaurant',
    'food-service': 'restaurant',
    'dining': 'restaurant',
    'hospitality': 'restaurant',
    'plumbing': 'plumber',
    'electrical': 'home-services',
    'roofing': 'home-services',
    'landscaping': 'home-services',
    'cleaning': 'home-services',
    'handyman': 'home-services',
    'e-commerce': 'ecommerce',
    'retail': 'ecommerce',
    'shop': 'ecommerce',
    'store': 'ecommerce',
    'health': 'healthcare',
    'medical': 'healthcare',
    'pharma': 'healthcare',
    'pharmacy': 'healthcare',
    'telehealth': 'healthcare',
    'finance': 'fintech',
    'banking': 'fintech',
    'insurance': 'fintech',
    'payments': 'fintech',
    'property': 'real-estate',
    'realestate': 'real-estate',
    'housing': 'real-estate',
    'edtech': 'education',
    'training': 'education',
    'courses': 'education',
    'shipping': 'logistics',
    'delivery': 'logistics',
    'freight': 'logistics',
    'advertising': 'marketing',
    'adtech': 'marketing',
    'martech': 'marketing',
  }

  return aliases[v] ?? v
}

/** Look up vertical weights. Returns null if no profile exists for this vertical. */
export function getVerticalWeights(vertical: string): VerticalWeights | null {
  const normalized = normalizeVertical(vertical)
  return VERTICAL_REGISTRY.find((v) => v.vertical === normalized) ?? null
}

/** Get all registered verticals (for API/UI display) */
export function listVerticals(): { vertical: string; description: string }[] {
  return VERTICAL_REGISTRY.map((v) => ({
    vertical: v.vertical,
    description: v.description,
  }))
}

// ---------------------------------------------------------------------------
// Weight application
// ---------------------------------------------------------------------------

/**
 * Default dimension weights from the scanner (must match index.ts WEIGHTS array).
 * D1:0.12  D2:0.15  D3:0.08  D4:0.05  D5:0.08  D6:0.10  D7:0.12  D8:0.13  D9:0.10
 * Total: 0.93 (remaining 0.07 is agent-native bonus)
 */
const BASE_WEIGHTS = [0.12, 0.15, 0.08, 0.05, 0.08, 0.10, 0.12, 0.13, 0.10]
const BASE_WEIGHT_SUM = BASE_WEIGHTS.reduce((a, b) => a + b, 0) // 0.93

/**
 * Apply vertical-specific weight adjustments to the base dimension weights.
 *
 * Process:
 * 1. Multiply each base weight by its vertical adjustment multiplier
 * 2. Renormalize so the adjusted weights still sum to 0.93
 *    (preserves the 7% agent-native bonus proportion)
 *
 * Returns the adjusted weights array (same order as WEIGHTS in index.ts).
 */
export function applyVerticalWeights(
  weights: VerticalWeights
): number[] {
  const multipliers = [
    weights.adjustments.d1_discoverability,
    weights.adjustments.d2_interoperability,
    weights.adjustments.d3_onboarding,
    weights.adjustments.d4_pricing,
    weights.adjustments.d5_payment,
    weights.adjustments.d6_data_quality,
    weights.adjustments.d7_security,
    weights.adjustments.d8_reliability,
    weights.adjustments.d9_agent_experience,
  ]

  // Step 1: Apply multipliers to base weights
  const rawAdjusted = BASE_WEIGHTS.map((w, i) => w * multipliers[i])

  // Step 2: Renormalize to preserve the 0.93 total
  const adjustedSum = rawAdjusted.reduce((a, b) => a + b, 0)
  const scale = BASE_WEIGHT_SUM / adjustedSum

  return rawAdjusted.map((w) => w * scale)
}
