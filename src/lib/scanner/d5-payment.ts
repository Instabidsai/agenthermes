// ---------------------------------------------------------------------------
// D5 — Payment (weight: 0.08)
// Can an agent pay for services programmatically without a browser?
// Checks: Stripe integration, UCP (Universal Commerce Protocol),
//         ACP (Agent Commerce Protocol), x402 support, programmatic payment
//         initiation, multi-currency
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, endpointExists, getApiSubdomains } from './types'
import { detectX402Support } from '../commerce/x402'

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
  // Also check API subdomains for payment endpoints
  const apiSubdomains = getApiSubdomains(base)
  const subdomainPaymentPaths = apiSubdomains.flatMap((sub) => [
    sub,
    `${sub}/v1`,
    `${sub}/v1/charges`,
    `${sub}/v1/payment_intents`,
    `${sub}/v1/checkout/sessions`,
    `${sub}/v1/billing`,
    `${sub}/v1/subscriptions`,
  ])
  const allPaymentUrls = [
    ...paymentPaths.map((p) => `${base}${p}`),
    ...subdomainPaymentPaths,
  ]
  const paymentResults = await Promise.all(
    allPaymentUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
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
  // Also check API subdomains for programmatic payment endpoints
  const subdomainProgPaths = apiSubdomains.flatMap((sub) => [
    `${sub}/v1/payment_intents`,
    `${sub}/v1/checkout/sessions`,
    `${sub}/v1/charges`,
    `${sub}/v1/invoices`,
    `${sub}/v1/usage_records`,
  ])
  const allProgUrls = [
    ...programmaticPaths.map((p) => `${base}${p}`),
    ...subdomainProgPaths,
  ]
  const progResults = await Promise.all(
    allProgUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
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
  // 4. UCP / Universal Commerce Protocol (up to 10 pts)
  // -----------------------------------------------------------------------
  const ucpResult = await probeEndpoint(`${base}/.well-known/ucp.json`, 'GET', globalSignal)
  // Also check homepage for UCP meta tags or headers
  let ucpMetaDetected = false
  if (homepageResult.found && typeof homepageResult.body === 'string') {
    ucpMetaDetected =
      /universal.?commerce.?protocol|ucp\.json|ucp-version/i.test(homepageResult.body)
  }
  // Check response headers for UCP signals
  const ucpHeaderDetected = homepageResult.headers?.['x-ucp-version'] ||
    homepageResult.headers?.['x-commerce-protocol']

  if (endpointExists(ucpResult)) {
    const isJson = ucpResult.contentType?.includes('json')
    rawScore += isJson ? 10 : 5
    checks.push({
      name: 'Universal Commerce Protocol (UCP)',
      passed: true,
      details: `UCP manifest found at ${ucpResult.url}${isJson ? ' (valid JSON)' : ' (non-JSON response)'}`,
      points: isJson ? 10 : 5,
    })
  } else if (ucpMetaDetected || ucpHeaderDetected) {
    rawScore += 5
    checks.push({
      name: 'Universal Commerce Protocol (UCP)',
      passed: false,
      details: `UCP signals detected (${ucpMetaDetected ? 'meta tags' : 'headers'}) but no /.well-known/ucp.json manifest`,
      points: 5,
    })
    recommendations.push({
      action:
        'Publish a UCP manifest at /.well-known/ucp.json to fully declare your commerce capabilities for agent discovery.',
      impact: '+5 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  } else {
    checks.push({
      name: 'Universal Commerce Protocol (UCP)',
      passed: false,
      details: 'No Universal Commerce Protocol support detected at /.well-known/ucp.json',
      points: 0,
    })
    recommendations.push({
      action:
        'Support the Universal Commerce Protocol (UCP) at /.well-known/ucp.json — a standardized way for agents to discover and interact with commerce endpoints.',
      impact: '+10 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. ACP / Agent Commerce Protocol / x402 support (up to 10 pts)
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

  // Check for Stripe ACP integration signals (headers, meta tags)
  let stripeAcpDetected = false
  if (homepageResult.found && typeof homepageResult.body === 'string') {
    stripeAcpDetected =
      /stripe.*acp|acp.*stripe|agent.?commerce.?protocol/i.test(homepageResult.body)
  }
  const acpHeaderDetected = homepageResult.headers?.['x-acp-version'] ||
    homepageResult.headers?.['x-agent-commerce']

  if (acpHits.length > 0) {
    rawScore += 10
    checks.push({
      name: 'Agent Commerce Protocol (ACP)',
      passed: true,
      details: `ACP/agent payment protocol detected: ${acpHits.map((r) => r.url).join(', ')}`,
      points: 10,
    })
  } else if (x402Check) {
    rawScore += 5
    checks.push({
      name: 'Agent Commerce Protocol (ACP)',
      passed: false,
      details: 'HTTP 402 Payment Required responses detected — partial agent payment support',
      points: 5,
    })
    recommendations.push({
      action:
        'You return 402 statuses which is a great start. Add /.well-known/acp.json with payment instructions for full agent commerce protocol support.',
      impact: '+5 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  } else if (stripeAcpDetected || acpHeaderDetected) {
    rawScore += 5
    checks.push({
      name: 'Agent Commerce Protocol (ACP)',
      passed: false,
      details: `ACP signals detected (${stripeAcpDetected ? 'Stripe ACP references' : 'ACP headers'}) but no /.well-known/acp.json manifest`,
      points: 5,
    })
    recommendations.push({
      action:
        'Publish an ACP manifest at /.well-known/acp.json to formalize your agent commerce support.',
      impact: '+5 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  } else {
    checks.push({
      name: 'Agent Commerce Protocol (ACP)',
      passed: false,
      details: 'No Agent Commerce Protocol (ACP), Stripe ACP, or x402 support detected',
      points: 0,
    })
    recommendations.push({
      action:
        'Support the Agent Commerce Protocol (ACP) at /.well-known/acp.json — the emerging standard for agent-to-business payments, with Stripe ACP integration.',
      impact: '+10 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 6. Usage-based billing / metering (up to 15 pts)
  // -----------------------------------------------------------------------
  const usagePaths = [
    '/api/usage',
    '/api/v1/usage',
    '/api/billing/usage',
    '/api/metering',
    '/api/v1/metering',
  ]
  // Also check API subdomains for usage/metering endpoints
  const subdomainUsagePaths = apiSubdomains.flatMap((sub) => [
    `${sub}/v1/usage_records`,
    `${sub}/v1/billing/meters`,
    `${sub}/v1/billing/meter_events`,
    `${sub}/v1/subscription_items`,
  ])
  const allUsageUrls = [
    ...usagePaths.map((p) => `${base}${p}`),
    ...subdomainUsagePaths,
  ]
  const usageResults = await Promise.all(
    allUsageUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
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
  // 7. Multi-currency support (up to 10 pts)
  // -----------------------------------------------------------------------
  // Check all collected pages including pricing page for currency mentions
  const pricingPageResult = await probeEndpoint(`${base}/pricing`, 'GET', globalSignal)
  const allBodies = [
    ...paymentResults,
    ...progResults,
    homepageResult,
    pricingPageResult,
  ].map((r) =>
    typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
  )
  // Also look for "135+ currencies" or "multi-currency" style phrases
  // Or detect hreflang links to multiple country-specific pages (indicates global payments)
  const hasMultiCurrency = allBodies.some((text) => {
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']
    const found = currencies.filter((c) => text.includes(c))
    const hasCurrencyPhrase = /multi.?currenc|135\+?\s*currenc|\d+\s*currenc|international\s*payment|global\s*payment|cross.?border/i.test(text)
    // Count hreflang country links — 10+ indicates a truly global payment platform
    const hrefLangMatches = text.match(/hrefLang="[a-z]{2}-[A-Z]{2}"/gi) || []
    const isGlobalPlatform = hrefLangMatches.length >= 10
    return found.length >= 2 || hasCurrencyPhrase || isGlobalPlatform
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

  // -----------------------------------------------------------------------
  // 8. x402 HTTP-native micropayment support (up to 10 pts BONUS)
  //    Rewards businesses that support the x402 protocol — HTTP 402 with
  //    structured payment headers (x-payment, x-payment-amount, etc.).
  //    This is the fastest-growing agent payment rail (161M+ txns).
  // -----------------------------------------------------------------------
  // Probe the base URL and a common API path for x402
  const x402Urls = [base, `${base}/api`, `${base}/api/v1`]
  const x402Results = await Promise.all(
    x402Urls.map((url) => detectX402Support(url, globalSignal))
  )
  const x402Hit = x402Results.find((r) => r.supported)

  if (x402Hit && x402Hit.payment_details) {
    rawScore += 10
    const networks = x402Hit.payment_details.networks.join(', ')
    checks.push({
      name: 'x402 Micropayments',
      passed: true,
      details: `Full x402 support detected with structured payment headers. Networks: ${networks}. Currency: ${x402Hit.payment_details.currency}.`,
      points: 10,
    })
  } else if (x402Hit) {
    // 402 with some x402 headers but incomplete details
    rawScore += 5
    checks.push({
      name: 'x402 Micropayments',
      passed: true,
      details:
        'x402 headers detected on 402 response but payment details are incomplete. Add x-payment header with JSON payment details for full support.',
      points: 5,
    })
    recommendations.push({
      action:
        'Your 402 responses have x402 signals but missing structured payment details. Add an x-payment header with JSON containing amount, currency, recipient, and networks.',
      impact: '+5 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  } else if (!x402Check) {
    // Only add recommendation if no 402 was detected at all (x402Check comes from section 5)
    checks.push({
      name: 'x402 Micropayments',
      passed: false,
      details:
        'No x402 HTTP-native micropayment support detected. x402 enables agents to pay per-request in USDC without pre-funding.',
      points: 0,
    })
    recommendations.push({
      action:
        'Support x402 micropayments — return HTTP 402 with x-payment headers on paid endpoints. Agents pay in USDC per-request. 161M+ transactions on the x402 network.',
      impact: '+10 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D5',
    label: 'Payment',
    score,
    weight: 0.08,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
