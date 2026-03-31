// ---------------------------------------------------------------------------
// x402 Payment Protocol Support
//
// x402 is HTTP-native micropayments using the 402 "Payment Required" status.
// Protocol: Coinbase + Cloudflare (x402 Foundation)
// 161M+ transactions, ~$600M annualized volume as of March 2026.
//
// Flow:
//   1. Agent calls API endpoint
//   2. Server returns 402 with x402 payment headers
//   3. Agent pays in USDC (Base, Solana, Ethereum, Arbitrum, Polygon)
//   4. Agent retries request with on-chain tx hash as proof
//   5. Server verifies payment, grants access
//
// Reference: docs.stripe.com/payments/machine/x402
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Networks that x402 supports for USDC payment */
export type X402Network =
  | 'base'
  | 'ethereum'
  | 'solana'
  | 'arbitrum'
  | 'polygon'

/** The payment details returned in a 402 response's x402 headers */
export interface X402PaymentDetails {
  /** USDC amount in smallest unit (e.g., micro-USDC) */
  amount: string
  /** Currency — always USDC for now */
  currency: 'USDC'
  /** Recipient wallet address */
  recipient: string
  /** Supported networks for this payment */
  networks: X402Network[]
  /** Human-readable description of what the payment is for */
  description?: string
  /** Expiration timestamp (ISO 8601) — payment must complete before this */
  expires_at?: string
  /** Unique payment request ID for idempotency */
  payment_id: string
  /** Minimum confirmations required before access is granted */
  min_confirmations?: number
}

/** What an agent sends back after paying — proof of payment */
export interface X402PaymentProof {
  /** On-chain transaction hash */
  tx_hash: string
  /** Which network the payment was made on */
  network: X402Network
  /** The payment_id from the original 402 response */
  payment_id: string
}

/** Result of checking whether a URL supports x402 */
export interface X402DetectionResult {
  /** Whether the endpoint returned 402 with x402 headers */
  supported: boolean
  /** The payment details if x402 was detected */
  payment_details: X402PaymentDetails | null
  /** Raw headers from the 402 response */
  raw_headers: Record<string, string>
  /** Any detection errors */
  error: string | null
}

/**
 * x402 headers we look for in a 402 response.
 * Different implementations may use slightly different header names.
 */
export const X402_HEADERS = {
  /** Standard x402 payment details (JSON) */
  PAYMENT_DETAILS: 'x-payment',
  /** Alternate: amount */
  AMOUNT: 'x-payment-amount',
  /** Alternate: recipient address */
  RECIPIENT: 'x-payment-recipient',
  /** Alternate: accepted networks */
  NETWORKS: 'x-payment-networks',
  /** Alternate: currency */
  CURRENCY: 'x-payment-currency',
  /** Payment ID for idempotency */
  PAYMENT_ID: 'x-payment-id',
  /** Expiration */
  EXPIRES: 'x-payment-expires',
  /** Protocol version */
  VERSION: 'x-402-version',
} as const

// ---------------------------------------------------------------------------
// Detection helper
// ---------------------------------------------------------------------------

/**
 * Check if a URL supports x402 by looking for 402 responses with x402 headers.
 *
 * This sends a GET request and checks if the response:
 * 1. Has status 402 (Payment Required)
 * 2. Contains x402-specific headers with payment details
 *
 * Returns detection result with payment details if found.
 */
export async function detectX402Support(
  url: string,
  signal?: AbortSignal
): Promise<X402DetectionResult> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 5_000)

    const onAbort = () => controller.abort()
    if (signal) {
      if (signal.aborted) {
        clearTimeout(timer)
        return {
          supported: false,
          payment_details: null,
          raw_headers: {},
          error: 'Aborted',
        }
      }
      signal.addEventListener('abort', onAbort, { once: true })
    }

    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json, */*',
        'User-Agent': 'AgentHermes-Scanner/2.0',
      },
      redirect: 'follow',
    })

    clearTimeout(timer)
    if (signal) signal.removeEventListener('abort', onAbort)

    // Not a 402 — x402 not detected on this endpoint
    if (res.status !== 402) {
      return {
        supported: false,
        payment_details: null,
        raw_headers: {},
        error: null,
      }
    }

    // Collect x402-relevant headers
    const rawHeaders: Record<string, string> = {}
    const headerKeys = [
      'x-payment',
      'x-payment-amount',
      'x-payment-recipient',
      'x-payment-networks',
      'x-payment-currency',
      'x-payment-id',
      'x-payment-expires',
      'x-402-version',
    ]
    for (const key of headerKeys) {
      const val = res.headers.get(key)
      if (val) rawHeaders[key] = val
    }

    // Try to parse structured payment details from x-payment header
    const paymentHeader = res.headers.get(X402_HEADERS.PAYMENT_DETAILS)
    if (paymentHeader) {
      try {
        const details = JSON.parse(paymentHeader) as X402PaymentDetails
        return {
          supported: true,
          payment_details: details,
          raw_headers: rawHeaders,
          error: null,
        }
      } catch {
        // JSON parse failed — try constructing from individual headers
      }
    }

    // Fallback: construct from individual headers
    const amount = res.headers.get(X402_HEADERS.AMOUNT)
    const recipient = res.headers.get(X402_HEADERS.RECIPIENT)

    if (amount && recipient) {
      const networksRaw = res.headers.get(X402_HEADERS.NETWORKS)
      const networks: X402Network[] = networksRaw
        ? (networksRaw.split(',').map((n) => n.trim()) as X402Network[])
        : ['base']

      const details: X402PaymentDetails = {
        amount,
        currency: (res.headers.get(X402_HEADERS.CURRENCY) as 'USDC') || 'USDC',
        recipient,
        networks,
        payment_id:
          res.headers.get(X402_HEADERS.PAYMENT_ID) || crypto.randomUUID(),
        expires_at: res.headers.get(X402_HEADERS.EXPIRES) || undefined,
      }

      return {
        supported: true,
        payment_details: details,
        raw_headers: rawHeaders,
        error: null,
      }
    }

    // Got 402 but no recognizable x402 headers — might be a standard paywall
    const hasAnyX402Header = Object.keys(rawHeaders).length > 0
    return {
      supported: hasAnyX402Header,
      payment_details: null,
      raw_headers: rawHeaders,
      error: hasAnyX402Header
        ? 'x402 headers present but could not parse payment details'
        : null,
    }
  } catch (err: unknown) {
    return {
      supported: false,
      payment_details: null,
      raw_headers: {},
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

// ---------------------------------------------------------------------------
// Gateway integration helpers (future)
// ---------------------------------------------------------------------------

/**
 * Build a 402 response for the AgentHermes gateway.
 *
 * When an agent calls our gateway without a pre-funded wallet or valid auth,
 * we can return a 402 with x402 headers so they can pay via USDC.
 *
 * TODO: Wire this into the gateway proxy once a USDC receiving wallet is set up.
 */
export function buildX402Response(
  amount: string,
  recipientWallet: string,
  description: string,
  networks: X402Network[] = ['base']
): {
  status: 402
  headers: Record<string, string>
  body: { error: string; payment_required: X402PaymentDetails }
} {
  const paymentId = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 min

  const details: X402PaymentDetails = {
    amount,
    currency: 'USDC',
    recipient: recipientWallet,
    networks,
    description,
    expires_at: expiresAt,
    payment_id: paymentId,
    min_confirmations: 1,
  }

  return {
    status: 402,
    headers: {
      [X402_HEADERS.PAYMENT_DETAILS]: JSON.stringify(details),
      [X402_HEADERS.AMOUNT]: amount,
      [X402_HEADERS.RECIPIENT]: recipientWallet,
      [X402_HEADERS.NETWORKS]: networks.join(','),
      [X402_HEADERS.CURRENCY]: 'USDC',
      [X402_HEADERS.PAYMENT_ID]: paymentId,
      [X402_HEADERS.EXPIRES]: expiresAt,
      [X402_HEADERS.VERSION]: '1.0',
    },
    body: {
      error: 'Payment required. Send USDC to complete this request.',
      payment_required: details,
    },
  }
}

// ---------------------------------------------------------------------------
// What's needed for production x402 support
// ---------------------------------------------------------------------------
//
// 1. USDC Receiving Wallet
//    - Set up a wallet on Base (cheapest L2 fees) via Coinbase or self-custody
//    - Store wallet address in env: X402_RECIPIENT_WALLET
//
// 2. On-Chain Verification
//    - After agent sends tx_hash, verify on-chain:
//      a. Transaction is confirmed (min_confirmations met)
//      b. Amount matches payment_details.amount
//      c. Recipient matches our wallet
//      d. Payment_id matches (via memo/data field)
//    - Use Base RPC: https://mainnet.base.org or Alchemy/Infura
//
// 3. Payment State Machine
//    - pending -> paid -> verified -> access_granted
//    - Handle: expired, underpaid, wrong_network, replay_attack
//
// 4. Settlement
//    - Optionally auto-convert USDC to fiat via Coinbase Commerce
//    - Or hold as USDC for paying upstream services that accept x402
//
// 5. Scanner Integration
//    - detectX402Support() is already built (above)
//    - D5 payment scanner awards +10 points for x402 support (see d5-payment.ts)
//
// 6. Gateway Integration
//    - When agent has no wallet balance AND no API key:
//      return buildX402Response() instead of 401
//    - After payment verified: create temporary session, proxy the call
// ---------------------------------------------------------------------------
