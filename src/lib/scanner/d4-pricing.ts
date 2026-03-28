// ---------------------------------------------------------------------------
// D4 — Pricing Transparency (weight: 0.10)
// Can an agent understand what things cost before buying?
// Checks: /api/pricing, pricing pages, structured pricing data, currency
//         codes, plan comparison, usage tiers
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, isJsonContentType, hasField } from './types'

export async function scanPricing(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // 1. Machine-readable pricing API (up to 35 pts)
  // -----------------------------------------------------------------------
  const pricingApiPaths = [
    '/api/pricing',
    '/api/v1/pricing',
    '/pricing.json',
    '/.well-known/pricing.json',
    '/api/v1/plans',
    '/api/plans',
  ]
  const pricingApiResults = await Promise.all(
    pricingApiPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const pricingApiHit = pricingApiResults.find(
    (r) => r.found && isJsonContentType(r.contentType)
  )

  if (pricingApiHit) {
    rawScore += 20
    checks.push({
      name: 'Pricing API',
      passed: true,
      details: `Machine-readable pricing at ${pricingApiHit.url}`,
      points: 20,
    })

    // Bonus: structured pricing fields
    const body = pricingApiHit.body as Record<string, unknown> | null
    if (body && hasField(body, 'per_call', 'per_unit', 'price', 'plans', 'tiers', 'pricing', 'price_per_call', 'prices')) {
      rawScore += 10
      checks.push({
        name: 'Structured Pricing Fields',
        passed: true,
        details: 'Pricing data includes structured plan/price fields',
        points: 10,
      })
    } else {
      checks.push({
        name: 'Structured Pricing Fields',
        passed: false,
        details: 'Pricing JSON exists but lacks explicit price/plan fields',
        points: 0,
      })
      recommendations.push({
        action:
          'Add explicit "plans" array or "price_per_call" fields to your pricing JSON so agents can compare programmatically.',
        impact: '+10 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }

    // Bonus: currency codes
    const bodyStr = JSON.stringify(body ?? '')
    const hasCurrency = /USD|EUR|GBP|JPY|currency/i.test(bodyStr)
    if (hasCurrency) {
      rawScore += 5
      checks.push({
        name: 'Currency Codes',
        passed: true,
        details: 'Pricing includes ISO currency codes',
        points: 5,
      })
    } else {
      checks.push({
        name: 'Currency Codes',
        passed: false,
        details: 'No ISO currency codes found in pricing data',
        points: 0,
      })
      recommendations.push({
        action:
          'Include ISO 4217 currency codes (e.g., "currency": "USD") in your pricing data for multi-region agent support.',
        impact: '+5 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'Pricing API',
      passed: false,
      details: 'No machine-readable pricing API found',
      points: 0,
    })
    recommendations.push({
      action:
        'Create /api/pricing returning JSON with plan names, prices, rate limits, and per-call costs so agents can evaluate before purchasing.',
      impact: '+35 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 2. Human-readable pricing page (up to 15 pts)
  // -----------------------------------------------------------------------
  const humanPricingPaths = ['/pricing', '/plans', '/prices']
  const humanResults = await Promise.all(
    humanPricingPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const humanPricing = humanResults.find((r) => r.found)

  if (humanPricing) {
    rawScore += 15
    checks.push({
      name: 'Pricing Page',
      passed: true,
      details: `Human-readable pricing page at ${humanPricing.url}`,
      points: 15,
    })

    // Bonus: check for structured pricing indicators in the HTML
    const body = typeof humanPricing.body === 'string' ? humanPricing.body : ''
    const hasTableOrCards =
      /pricing-table|pricing-card|plan-card|price-card|<table/i.test(body)
    // Also check for actual price strings in the content
    const hasPriceStrings =
      /\$\d+|\d+%|per.?(call|transaction|month|year|unit|request|api|1k|100k|million)/i.test(body)
    if (hasTableOrCards || hasPriceStrings) {
      rawScore += 5
      checks.push({
        name: 'Pricing Content Quality',
        passed: true,
        details: `Pricing page includes ${hasTableOrCards ? 'comparison table/cards' : ''}${hasTableOrCards && hasPriceStrings ? ' and ' : ''}${hasPriceStrings ? 'explicit price figures' : ''}`,
        points: 5,
      })
    }
  } else {
    checks.push({
      name: 'Pricing Page',
      passed: false,
      details: 'No human-readable pricing page found at /pricing, /plans, or /prices',
      points: 0,
    })
    if (!pricingApiHit) {
      recommendations.push({
        action:
          'Publish a pricing page at /pricing — even a simple page helps agents understand your cost model.',
        impact: '+15 points',
        difficulty: 'easy',
        auto_fixable: false,
      })
    }
  }

  // -----------------------------------------------------------------------
  // 3. Pricing in agent card (up to 15 pts)
  // -----------------------------------------------------------------------
  const agentCardResult = await probeEndpoint(
    `${base}/.well-known/agent.json`,
    'GET',
    globalSignal
  )
  if (agentCardResult.found && typeof agentCardResult.body === 'object') {
    const card = agentCardResult.body as Record<string, unknown>
    if (hasField(card, 'pricing', 'price', 'cost', 'rate', 'plans')) {
      rawScore += 15
      checks.push({
        name: 'Pricing in Agent Card',
        passed: true,
        details: 'Agent card includes pricing information',
        points: 15,
      })
    } else {
      rawScore += 2
      checks.push({
        name: 'Pricing in Agent Card',
        passed: false,
        details: 'Agent card exists but lacks pricing fields',
        points: 2,
      })
      recommendations.push({
        action:
          'Add a "pricing" field to your agent.json with per-call costs or plan references.',
        impact: '+13 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'Pricing in Agent Card',
      passed: false,
      details: 'No agent card found to check for pricing',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 4. Free tier / trial detection (up to 15 pts)
  // -----------------------------------------------------------------------
  const allBodies = [
    ...pricingApiResults,
    ...humanResults,
    agentCardResult,
  ].map((r) =>
    typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
  )
  const mentionsFree = allBodies.some((text) =>
    /free.?tier|free.?trial|freemium|sandbox|\$0|free plan|starter.?free/i.test(text)
  )

  if (mentionsFree) {
    rawScore += 15
    checks.push({
      name: 'Free Tier / Trial',
      passed: true,
      details: 'Free tier or trial mentioned in pricing content',
      points: 15,
    })
  } else {
    checks.push({
      name: 'Free Tier / Trial',
      passed: false,
      details: 'No free tier or trial detected',
      points: 0,
    })
    recommendations.push({
      action:
        'Offer a free tier or sandbox mode so agents can test your service before committing to paid usage.',
      impact: '+15 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Usage tiers / rate limits in pricing (up to 10 pts)
  // -----------------------------------------------------------------------
  const mentionsUsage = allBodies.some((text) =>
    /rate.?limit|usage.?tier|requests?.?per|calls?.?per|quota|credits|burst/i.test(text)
  )

  if (mentionsUsage) {
    rawScore += 10
    checks.push({
      name: 'Usage Tiers / Rate Limits',
      passed: true,
      details: 'Pricing content includes rate limits or usage tier information',
      points: 10,
    })
  } else {
    checks.push({
      name: 'Usage Tiers / Rate Limits',
      passed: false,
      details: 'No rate limit or usage tier information found in pricing',
      points: 0,
    })
    recommendations.push({
      action:
        'Include rate limits and usage tiers in your pricing so agents can plan their call volume.',
      impact: '+10 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D4',
    label: 'Pricing Transparency',
    score,
    weight: 0.1,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
