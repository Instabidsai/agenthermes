// ---------------------------------------------------------------------------
// D5 — Payment (weight: 0.10)
// Can an agent pay for services programmatically without a browser?
// Checks: Stripe integration, ACP/MPP/x402 support, programmatic payment
//         initiation, multi-currency
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, endpointExists } from './types'

export async function scanPayment(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // 1. Payment API endpoints (up to 25 pts)
  // -----------------------------------------------------------------------
  const paymentPaths = [
    '/api/stripe',
    '/api/v1/stripe',
    '/api/payment',
    '/api/v1/payment',
    '/api/checkout',
    '/api/v1/checkout',
    '/api/billing',
    '/api/v1/billing',
    '/api/subscribe',
    '/api/v1/subscribe',
  ]
  const paymentResults = await Promise.all(
    paymentPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const paymentHits = paymentResults.filter((r) => endpointExists(r))

  if (paymentHits.length > 0) {
    rawScore += 20
    checks.push({
      name: 'Payment API Endpoints',
      passed: true,
      details: `Payment endpoint(s) detected: ${paymentHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 20,
    })
  } else {
    checks.push({
      name: 'Payment API Endpoints',
      passed: false,
      details: 'No payment API endpoints found at common paths',
      points: 0,
    })
    recommendations.push({
      action:
        'Integrate a payment processor (Stripe recommended) with API endpoints at /api/checkout or /api/payment so agents can pay programmatically.',
      impact: '+25 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 2. Stripe detection on site (up to 10 pts)
  // -----------------------------------------------------------------------
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  let stripeDetected = false
  let cryptoDetected = false

  if (homepageResult.found && typeof homepageResult.body === 'string') {
    const html = homepageResult.body
    stripeDetected = /stripe|js\.stripe\.com/i.test(html)
    cryptoDetected = /crypto|ethereum|bitcoin|web3|wallet|solana/i.test(html)

    if (stripeDetected) {
      rawScore += 10
      checks.push({
        name: 'Stripe Integration',
        passed: true,
        details: 'Stripe.js or Stripe references detected on site',
        points: 10,
      })
    }
    if (cryptoDetected) {
      rawScore += 5
      checks.push({
        name: 'Crypto Payment',
        passed: true,
        details: 'Cryptocurrency payment references detected on site',
        points: 5,
      })
    }
  }

  if (!stripeDetected && !cryptoDetected && paymentHits.length === 0) {
    checks.push({
      name: 'Payment Processor Detection',
      passed: false,
      details: 'No payment processor (Stripe, crypto, etc.) detected on site or API',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 3. Programmatic payment flow (up to 25 pts)
  // -----------------------------------------------------------------------
  const programmaticPaths = [
    '/api/checkout/session',
    '/api/v1/checkout/session',
    '/api/checkout/create',
    '/api/payment/intent',
    '/api/v1/payment/intent',
    '/api/payment/create',
    '/api/v1/payment/create',
    '/api/billing/usage',
    '/api/v1/billing/usage',
  ]
  const progResults = await Promise.all(
    programmaticPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const progHits = progResults.filter((r) => endpointExists(r))

  if (progHits.length > 0) {
    rawScore += 25
    checks.push({
      name: 'Programmatic Payment Creation',
      passed: true,
      details: `Payment creation endpoint(s): ${progHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 25,
    })
  } else {
    checks.push({
      name: 'Programmatic Payment Creation',
      passed: false,
      details: 'No programmatic payment creation endpoints found (checkout sessions, payment intents)',
      points: 0,
    })
    recommendations.push({
      action:
        'Build API routes that let an agent create a payment intent or checkout session via JSON POST — no browser redirect required.',
      impact: '+25 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 4. ACP / Agent Commerce Protocol / x402 support (up to 15 pts)
  // -----------------------------------------------------------------------
  const acpPaths = [
    '/.well-known/acp.json',
    '/.well-known/pay',
    '/api/acp',
  ]
  const acpResults = await Promise.all(
    acpPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const acpHits = acpResults.filter((r) => endpointExists(r))

  // Also check for x402 Payment Required responses
  const x402Check = paymentResults.some((r) => r.status === 402)

  if (acpHits.length > 0) {
    rawScore += 15
    checks.push({
      name: 'Agent Commerce Protocol',
      passed: true,
      details: `ACP/agent payment protocol detected: ${acpHits.map((r) => r.url).join(', ')}`,
      points: 15,
    })
  } else if (x402Check) {
    rawScore += 8
    checks.push({
      name: 'Agent Commerce Protocol',
      passed: false,
      details: 'HTTP 402 Payment Required responses detected — partial agent payment support',
      points: 8,
    })
    recommendations.push({
      action:
        'You return 402 statuses which is a great start. Add /.well-known/acp.json with payment instructions for full agent commerce protocol support.',
      impact: '+7 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  } else {
    checks.push({
      name: 'Agent Commerce Protocol',
      passed: false,
      details: 'No Agent Commerce Protocol (ACP), MPP, or x402 support detected',
      points: 0,
    })
    recommendations.push({
      action:
        'Support the Agent Commerce Protocol (ACP) at /.well-known/acp.json — the emerging standard for agent-to-business payments.',
      impact: '+15 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Usage-based billing / metering (up to 15 pts)
  // -----------------------------------------------------------------------
  const usagePaths = [
    '/api/usage',
    '/api/v1/usage',
    '/api/billing/usage',
    '/api/metering',
    '/api/v1/metering',
  ]
  const usageResults = await Promise.all(
    usagePaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const usageHits = usageResults.filter((r) => endpointExists(r))

  if (usageHits.length > 0) {
    rawScore += 15
    checks.push({
      name: 'Usage-Based Billing',
      passed: true,
      details: `Usage/metering endpoint(s): ${usageHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 15,
    })
  } else {
    checks.push({
      name: 'Usage-Based Billing',
      passed: false,
      details: 'No usage-based billing or metering endpoints found',
      points: 0,
    })
    recommendations.push({
      action:
        'Expose /api/usage so agents can track their consumption programmatically. Agents prefer pay-per-call pricing.',
      impact: '+15 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 6. Multi-currency support (up to 10 pts)
  // -----------------------------------------------------------------------
  const allBodies = [
    ...paymentResults,
    ...progResults,
    homepageResult,
  ].map((r) =>
    typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
  )
  const hasMultiCurrency = allBodies.some((text) => {
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']
    const found = currencies.filter((c) => text.includes(c))
    return found.length >= 2
  })

  if (hasMultiCurrency) {
    rawScore += 10
    checks.push({
      name: 'Multi-Currency',
      passed: true,
      details: 'Multiple currency support detected',
      points: 10,
    })
  } else {
    checks.push({
      name: 'Multi-Currency',
      passed: false,
      details: 'No multi-currency support detected',
      points: 0,
    })
    recommendations.push({
      action:
        'Support multiple currencies to serve agents operating in different regions.',
      impact: '+10 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D5',
    label: 'Payment',
    score,
    weight: 0.1,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
