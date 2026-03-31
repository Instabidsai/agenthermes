// ---------------------------------------------------------------------------
// WooCommerce Adapter — Auto-generate MCP tools from any WooCommerce store
// ---------------------------------------------------------------------------
// WooCommerce exposes two public APIs:
//   1. WC REST API v3: /wp-json/wc/v3/ (some endpoints public, some need auth)
//   2. WC Store API:   /wp-json/wc/store/v1/ (newer, fully public for reads)
//
// Detection strategy (3 signals, any = confirmed):
//   - /wp-json/wc/v3/ route exists in WP REST API index
//   - /wp-json/wc/store/v1/products responds with product data
//   - Homepage HTML contains WooCommerce markers (meta generator, scripts)
//
// Generated MCP tools use the Store API for public reads (no auth needed)
// and fall back to REST API v3 where Store API lacks coverage.
// ---------------------------------------------------------------------------

import type {
  EcommerceAdapter,
  DetectionResult,
  McpTool,
  EcommercePlatform,
} from './types'

const FETCH_TIMEOUT_MS = 8_000

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

interface FetchResult {
  ok: boolean
  status: number | null
  body: unknown
  contentType: string | null
  error: string | null
}

async function safeFetch(url: string, method = 'GET'): Promise<FetchResult> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    const res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json, text/html, */*',
        'User-Agent': 'AgentHermes-WooAdapter/1.0',
      },
      signal: controller.signal,
      redirect: 'follow',
    })
    clearTimeout(timer)

    const ct = res.headers.get('content-type') ?? null
    let body: unknown = null
    try {
      const text = await res.text()
      try {
        body = JSON.parse(text)
      } catch {
        body = text.slice(0, 20_000)
      }
    } catch {
      // body stays null
    }

    return { ok: res.ok, status: res.status, body, contentType: ct, error: null }
  } catch (err: unknown) {
    return {
      ok: false,
      status: null,
      body: null,
      contentType: null,
      error: err instanceof Error ? err.message : 'Unknown fetch error',
    }
  }
}

function normalizeStoreUrl(url: string): string {
  let u = url.trim()
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`
  u = u.replace(/\/+$/, '')
  return u
}

function isJsonContent(ct: string | null): boolean {
  if (!ct) return false
  return ct.includes('application/json') || ct.includes('application/ld+json')
}

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------

/**
 * Check if a URL is a WooCommerce store by probing 3 independent signals.
 * Returns high confidence if WC REST API routes are found.
 */
async function detectWooCommerceStore(url: string): Promise<DetectionResult> {
  const base = normalizeStoreUrl(url)
  let confidence: DetectionResult['confidence'] = 'low'
  const signals: string[] = []

  // Signal 1: Check WP REST API index for wc/v3 namespace
  const wpApiResult = await safeFetch(`${base}/wp-json/`)
  if (wpApiResult.ok && typeof wpApiResult.body === 'object' && wpApiResult.body !== null) {
    const wpApi = wpApiResult.body as Record<string, unknown>
    const namespaces = wpApi.namespaces
    if (Array.isArray(namespaces)) {
      const hasWcV3 = namespaces.some(
        (ns: unknown) => typeof ns === 'string' && (ns === 'wc/v3' || ns === 'wc/store/v1')
      )
      if (hasWcV3) {
        signals.push('wc/v3 namespace in WP REST API')
        confidence = 'high'
      }
    }
    // Also check routes object for wc paths
    const routes = wpApi.routes
    if (routes && typeof routes === 'object') {
      const routeKeys = Object.keys(routes as Record<string, unknown>)
      if (routeKeys.some((k) => k.startsWith('/wc/v3'))) {
        signals.push('wc/v3 routes in WP REST API index')
        confidence = 'high'
      }
    }
  }

  // Signal 2: Probe Store API products endpoint (fully public, no auth)
  const storeApiResult = await safeFetch(`${base}/wp-json/wc/store/v1/products?per_page=1`)
  if (storeApiResult.ok && isJsonContent(storeApiResult.contentType)) {
    const body = storeApiResult.body
    if (Array.isArray(body) && body.length > 0) {
      signals.push('Store API /wc/store/v1/products returns products')
      confidence = 'high'
    } else if (Array.isArray(body)) {
      signals.push('Store API responds (empty catalog)')
      if (confidence !== 'high') confidence = 'medium'
    }
  }

  // Signal 3: Probe WC REST API v3 products (may need auth — 401 still confirms WC)
  if (confidence !== 'high') {
    const wcV3Result = await safeFetch(`${base}/wp-json/wc/v3/products?per_page=1`)
    if (wcV3Result.status === 401 || wcV3Result.status === 403) {
      // 401/403 on wc/v3 means WooCommerce is installed but auth-protected
      signals.push('wc/v3 products returns 401/403 (WooCommerce installed, auth required)')
      confidence = 'medium'
    } else if (wcV3Result.ok && isJsonContent(wcV3Result.contentType)) {
      signals.push('wc/v3 products returns data publicly')
      confidence = 'high'
    }
  }

  // Signal 4: HTML source check (fallback — slower, less reliable)
  if (signals.length === 0) {
    const htmlResult = await safeFetch(base)
    if (htmlResult.ok && typeof htmlResult.body === 'string') {
      const html = htmlResult.body as string
      const markers = [
        'woocommerce',
        'wc-blocks',
        'wp-content/plugins/woocommerce',
        'name="generator" content="WooCommerce',
        'wc-cart',
        'woocommerce-js',
      ]
      const found = markers.filter((m) => html.toLowerCase().includes(m.toLowerCase()))
      if (found.length >= 2) {
        signals.push(`HTML markers: ${found.join(', ')}`)
        confidence = 'medium'
      } else if (found.length === 1) {
        signals.push(`HTML marker: ${found[0]}`)
        confidence = 'low'
      }
    }
  }

  const detected = signals.length > 0

  return {
    detected,
    platform: detected ? 'woocommerce' : null,
    confidence,
    details: detected
      ? `WooCommerce detected via: ${signals.join('; ')}`
      : 'No WooCommerce indicators found',
    apiBase: detected ? `${base}/wp-json` : undefined,
  }
}

// ---------------------------------------------------------------------------
// MCP Tool Generation
// ---------------------------------------------------------------------------

/**
 * Generate MCP tool definitions for a WooCommerce store.
 * Tools use the public Store API (no auth) and WC REST API v3 as fallback.
 */
function generateMcpTools(storeUrl: string): McpTool[] {
  const base = normalizeStoreUrl(storeUrl)
  const storeApiBase = `${base}/wp-json/wc/store/v1`
  const wcV3Base = `${base}/wp-json/wc/v3`

  // All tools embed the store URL so agents know which store they target
  const tools: McpTool[] = [
    // --- search_products ---
    {
      name: 'search_products',
      description: `Search products on ${base} by name, category, or price range. Uses the public WooCommerce Store API.`,
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query — matches product name and description',
          },
          category: {
            type: 'string',
            description: 'Filter by category slug (e.g. "peptides", "supplements")',
          },
          min_price: {
            type: 'number',
            description: 'Minimum price in store currency',
            minimum: 0,
          },
          max_price: {
            type: 'number',
            description: 'Maximum price in store currency',
            minimum: 0,
          },
          per_page: {
            type: 'number',
            description: 'Results per page (default 10, max 100)',
            default: 10,
            minimum: 1,
            maximum: 100,
          },
          page: {
            type: 'number',
            description: 'Page number for pagination (default 1)',
            default: 1,
            minimum: 1,
          },
          orderby: {
            type: 'string',
            description: 'Sort field',
            enum: ['date', 'price', 'popularity', 'rating', 'title'],
          },
          order: {
            type: 'string',
            description: 'Sort direction',
            enum: ['asc', 'desc'],
          },
        },
      },
    },

    // --- get_product_details ---
    {
      name: 'get_product_details',
      description: `Get full product details including variations, images, and attributes from ${base}. Uses the WooCommerce Store API.`,
      inputSchema: {
        type: 'object',
        properties: {
          product_id: {
            type: 'number',
            description: 'WooCommerce product ID',
          },
          slug: {
            type: 'string',
            description: 'Product URL slug (alternative to product_id)',
          },
        },
      },
    },

    // --- check_availability ---
    {
      name: 'check_availability',
      description: `Check stock availability for a product or specific variation on ${base}. Returns in_stock status, stock quantity, and backorder info.`,
      inputSchema: {
        type: 'object',
        properties: {
          product_id: {
            type: 'number',
            description: 'WooCommerce product ID',
          },
          variation_id: {
            type: 'number',
            description: 'Specific variation ID (for variable products)',
          },
        },
        required: ['product_id'],
      },
    },

    // --- get_categories ---
    {
      name: 'get_categories',
      description: `Browse product categories on ${base}. Returns category tree with product counts.`,
      inputSchema: {
        type: 'object',
        properties: {
          parent: {
            type: 'number',
            description: 'Parent category ID to get subcategories (0 = top-level)',
            default: 0,
          },
          per_page: {
            type: 'number',
            description: 'Results per page (default 20, max 100)',
            default: 20,
            minimum: 1,
            maximum: 100,
          },
        },
      },
    },

    // --- get_store_info ---
    {
      name: 'get_store_info',
      description: `Get store information for ${base} — name, currency, shipping zones, and WooCommerce version.`,
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ]

  // Attach runtime metadata so tool executors know which endpoints to call
  // This uses a convention where tools carry a _meta field with execution hints
  const toolsWithMeta = tools.map((tool) => ({
    ...tool,
    _meta: {
      platform: 'woocommerce' as const,
      store_url: base,
      store_api_base: storeApiBase,
      wc_v3_base: wcV3Base,
    },
  }))

  return toolsWithMeta
}

// ---------------------------------------------------------------------------
// Tool Executor — actually call WooCommerce APIs
// ---------------------------------------------------------------------------

export interface WooToolCallResult {
  success: boolean
  data: unknown
  error?: string
  endpoint_used: string
  response_time_ms: number
}

/**
 * Execute a generated WooCommerce MCP tool against the live store.
 * This is the runtime counterpart to generateMcpTools — it knows how to
 * map tool names + arguments to actual WooCommerce API calls.
 */
export async function executeWooTool(
  toolName: string,
  args: Record<string, unknown>,
  storeUrl: string
): Promise<WooToolCallResult> {
  const base = normalizeStoreUrl(storeUrl)
  const storeApi = `${base}/wp-json/wc/store/v1`
  const wcV3 = `${base}/wp-json/wc/v3`
  const start = Date.now()

  try {
    switch (toolName) {
      case 'search_products': {
        const params = new URLSearchParams()
        if (args.query) params.set('search', String(args.query))
        if (args.category) params.set('category', String(args.category))
        if (args.min_price) params.set('min_price', String(args.min_price))
        if (args.max_price) params.set('max_price', String(args.max_price))
        params.set('per_page', String(args.per_page ?? 10))
        params.set('page', String(args.page ?? 1))
        if (args.orderby) params.set('orderby', String(args.orderby))
        if (args.order) params.set('order', String(args.order))

        const endpoint = `${storeApi}/products?${params.toString()}`
        const result = await safeFetch(endpoint)

        // Fallback to WC REST API v3 if Store API fails
        if (!result.ok) {
          const v3Params = new URLSearchParams()
          if (args.query) v3Params.set('search', String(args.query))
          if (args.min_price) v3Params.set('min_price', String(args.min_price))
          if (args.max_price) v3Params.set('max_price', String(args.max_price))
          v3Params.set('per_page', String(args.per_page ?? 10))
          v3Params.set('page', String(args.page ?? 1))
          if (args.orderby) v3Params.set('orderby', String(args.orderby))
          if (args.order) v3Params.set('order', String(args.order))

          const v3Endpoint = `${wcV3}/products?${v3Params.toString()}`
          const v3Result = await safeFetch(v3Endpoint)
          return {
            success: v3Result.ok,
            data: v3Result.body,
            error: v3Result.ok ? undefined : (v3Result.error ?? `HTTP ${v3Result.status}`),
            endpoint_used: v3Endpoint,
            response_time_ms: Date.now() - start,
          }
        }

        return {
          success: true,
          data: result.body,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_product_details': {
        let endpoint: string
        if (args.product_id) {
          endpoint = `${storeApi}/products/${args.product_id}`
        } else if (args.slug) {
          // Store API supports slug lookup via search
          endpoint = `${storeApi}/products?slug=${encodeURIComponent(String(args.slug))}`
        } else {
          return {
            success: false,
            data: null,
            error: 'Either product_id or slug is required',
            endpoint_used: '',
            response_time_ms: Date.now() - start,
          }
        }

        const result = await safeFetch(endpoint)
        if (!result.ok && args.product_id) {
          // Fallback to v3
          const v3Endpoint = `${wcV3}/products/${args.product_id}`
          const v3Result = await safeFetch(v3Endpoint)
          return {
            success: v3Result.ok,
            data: v3Result.body,
            error: v3Result.ok ? undefined : (v3Result.error ?? `HTTP ${v3Result.status}`),
            endpoint_used: v3Endpoint,
            response_time_ms: Date.now() - start,
          }
        }

        return {
          success: result.ok,
          data: result.body,
          error: result.ok ? undefined : (result.error ?? `HTTP ${result.status}`),
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'check_availability': {
        const productId = args.product_id
        if (!productId) {
          return {
            success: false,
            data: null,
            error: 'product_id is required',
            endpoint_used: '',
            response_time_ms: Date.now() - start,
          }
        }

        // Store API includes stock info in product response
        const endpoint = `${storeApi}/products/${productId}`
        const result = await safeFetch(endpoint)

        if (result.ok && typeof result.body === 'object' && result.body !== null) {
          const product = result.body as Record<string, unknown>

          // If variation_id specified, look it up in variations
          if (args.variation_id) {
            const variationsEndpoint = `${storeApi}/products/${productId}/variations`
            const varResult = await safeFetch(variationsEndpoint)
            if (varResult.ok && Array.isArray(varResult.body)) {
              const variation = varResult.body.find(
                (v: Record<string, unknown>) => v.id === Number(args.variation_id)
              )
              if (variation) {
                return {
                  success: true,
                  data: {
                    product_id: productId,
                    variation_id: args.variation_id,
                    name: product.name,
                    in_stock: variation.is_in_stock ?? variation.in_stock,
                    stock_quantity: variation.stock_quantity ?? null,
                    stock_status: variation.stock_status ?? 'unknown',
                    price: variation.price ?? variation.prices?.price,
                  },
                  endpoint_used: variationsEndpoint,
                  response_time_ms: Date.now() - start,
                }
              }
              return {
                success: false,
                data: null,
                error: `Variation ${args.variation_id} not found for product ${productId}`,
                endpoint_used: variationsEndpoint,
                response_time_ms: Date.now() - start,
              }
            }
          }

          return {
            success: true,
            data: {
              product_id: productId,
              name: product.name,
              in_stock: product.is_in_stock ?? product.in_stock,
              stock_quantity: product.stock_quantity ?? null,
              stock_status: product.stock_status ?? 'unknown',
              price: (product as Record<string, Record<string, unknown>>).prices?.price ?? product.price,
            },
            endpoint_used: endpoint,
            response_time_ms: Date.now() - start,
          }
        }

        // Fallback to v3
        const v3Endpoint = `${wcV3}/products/${productId}`
        const v3Result = await safeFetch(v3Endpoint)
        return {
          success: v3Result.ok,
          data: v3Result.ok ? v3Result.body : null,
          error: v3Result.ok ? undefined : (v3Result.error ?? `HTTP ${v3Result.status}`),
          endpoint_used: v3Endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_categories': {
        const params = new URLSearchParams()
        if (args.parent !== undefined) params.set('parent', String(args.parent))
        params.set('per_page', String(args.per_page ?? 20))

        // Store API categories endpoint
        const endpoint = `${storeApi}/products/categories?${params.toString()}`
        const result = await safeFetch(endpoint)

        if (!result.ok) {
          // Fallback to v3
          const v3Endpoint = `${wcV3}/products/categories?${params.toString()}`
          const v3Result = await safeFetch(v3Endpoint)
          return {
            success: v3Result.ok,
            data: v3Result.body,
            error: v3Result.ok ? undefined : (v3Result.error ?? `HTTP ${v3Result.status}`),
            endpoint_used: v3Endpoint,
            response_time_ms: Date.now() - start,
          }
        }

        return {
          success: true,
          data: result.body,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_store_info': {
        // Combine data from WP REST API root + WC system status
        const wpRoot = await safeFetch(`${base}/wp-json/`)
        const storeInfo: Record<string, unknown> = {
          url: base,
          platform: 'woocommerce',
        }

        if (wpRoot.ok && typeof wpRoot.body === 'object' && wpRoot.body !== null) {
          const wp = wpRoot.body as Record<string, unknown>
          storeInfo.name = wp.name ?? 'Unknown'
          storeInfo.description = wp.description ?? ''
          storeInfo.gmt_offset = wp.gmt_offset
          storeInfo.timezone_string = wp.timezone_string

          // Check for WooCommerce namespaces
          if (Array.isArray(wp.namespaces)) {
            storeInfo.wc_namespaces = (wp.namespaces as string[]).filter(
              (ns: string) => ns.startsWith('wc/')
            )
          }
        }

        // Try to get currency info from Store API cart endpoint
        const cartInfo = await safeFetch(`${storeApi}/cart`)
        if (cartInfo.ok && typeof cartInfo.body === 'object' && cartInfo.body !== null) {
          const cart = cartInfo.body as Record<string, unknown>
          const totals = cart.totals as Record<string, unknown> | undefined
          if (totals) {
            storeInfo.currency = totals.currency_code
            storeInfo.currency_symbol = totals.currency_symbol
            storeInfo.currency_prefix = totals.currency_prefix
            storeInfo.currency_suffix = totals.currency_suffix
          }
        }

        // Try to get shipping zones from v3 (may require auth)
        const shippingResult = await safeFetch(`${wcV3}/shipping/zones`)
        if (shippingResult.ok && Array.isArray(shippingResult.body)) {
          storeInfo.shipping_zones = (shippingResult.body as Record<string, unknown>[]).map(
            (z) => ({ id: z.id, name: z.name })
          )
        }

        return {
          success: true,
          data: storeInfo,
          endpoint_used: `${base}/wp-json/`,
          response_time_ms: Date.now() - start,
        }
      }

      default:
        return {
          success: false,
          data: null,
          error: `Unknown WooCommerce tool: ${toolName}`,
          endpoint_used: '',
          response_time_ms: Date.now() - start,
        }
    }
  } catch (err: unknown) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error',
      endpoint_used: '',
      response_time_ms: Date.now() - start,
    }
  }
}

// ---------------------------------------------------------------------------
// Adapter export
// ---------------------------------------------------------------------------

export const wooCommerceAdapter: EcommerceAdapter = {
  platform: 'woocommerce' as EcommercePlatform,
  detect: detectWooCommerceStore,
  generateTools: async (storeUrl: string) => generateMcpTools(storeUrl),
}

// Named exports for direct use
export { detectWooCommerceStore, generateMcpTools }
