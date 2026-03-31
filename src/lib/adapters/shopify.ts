// ---------------------------------------------------------------------------
// Shopify Adapter — Auto-generate MCP tools from any Shopify store
// ---------------------------------------------------------------------------
// Shopify exposes public JSON endpoints on every store (no auth needed):
//   {store}/products.json         — all products (paginated, max 250/page)
//   {store}/collections.json      — all collections
//   {store}/products/{handle}.json — single product by URL handle
//
// Detection strategy (3 signals, any = confirmed):
//   - Shopify-specific response headers (X-ShopId, X-Shopify-Stage, etc.)
//   - /products.json returns array of products with Shopify schema
//   - Server header contains "Shopify"
//
// Generated MCP tools (5):
//   search_products     — search the catalog with filters
//   get_product_details — full product by handle
//   check_availability  — variant-level stock check
//   get_collections     — list all collections/categories
//   get_store_info      — store summary with counts and price range
// ---------------------------------------------------------------------------

import type {
  EcommerceAdapter,
  DetectionResult,
  McpTool,
  McpToolProperty,
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
  headers: Record<string, string>
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
        'User-Agent': 'AgentHermes-ShopifyAdapter/1.0',
      },
      signal: controller.signal,
      redirect: 'follow',
    })
    clearTimeout(timer)

    const ct = res.headers.get('content-type') ?? null

    // Collect Shopify-specific headers
    const responseHeaders: Record<string, string> = {}
    const headerKeys = [
      'x-shopid',
      'x-shopify-stage',
      'x-sorting-hat-shopid',
      'x-sorting-hat-podid',
      'x-shardid',
      'server',
      'x-powered-by',
      'x-request-id',
    ]
    for (const key of headerKeys) {
      const val = res.headers.get(key)
      if (val) responseHeaders[key] = val
    }

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

    return { ok: res.ok, status: res.status, body, contentType: ct, headers: responseHeaders, error: null }
  } catch (err: unknown) {
    return {
      ok: false,
      status: null,
      body: null,
      contentType: null,
      headers: {},
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

function stripHtml(html: string | null): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
}

// Shopify product shape from /products.json
interface ShopifyProduct {
  id: number
  title: string
  handle: string
  body_html: string | null
  vendor: string
  product_type: string
  tags: string[]
  variants: ShopifyVariant[]
  images: ShopifyImage[]
  created_at: string
  updated_at: string
  published_at: string | null
}

interface ShopifyVariant {
  id: number
  product_id: number
  title: string
  price: string
  compare_at_price: string | null
  sku: string | null
  available: boolean
  inventory_quantity?: number
  option1: string | null
  option2: string | null
  option3: string | null
}

interface ShopifyImage {
  id: number
  src: string
  alt: string | null
  width: number
  height: number
}

interface ShopifyCollection {
  id: number
  handle: string
  title: string
  body_html: string | null
  published_at: string | null
  updated_at: string
  image?: ShopifyImage | null
}

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------

/**
 * Check if a URL is a Shopify store by probing 3 independent signals.
 * Returns high confidence if /products.json returns Shopify product schema.
 */
async function detectShopifyStore(url: string): Promise<DetectionResult> {
  const base = normalizeStoreUrl(url)
  let confidence: DetectionResult['confidence'] = 'low'
  const signals: string[] = []

  // Signal 1: Check response headers on the main page for Shopify markers
  const mainResult = await safeFetch(base)
  if (mainResult.ok || mainResult.status !== null) {
    const shopifyHeaders = [
      'x-shopid',
      'x-shopify-stage',
      'x-sorting-hat-shopid',
      'x-sorting-hat-podid',
      'x-shardid',
    ]
    const foundHeaders = shopifyHeaders.filter((h) => mainResult.headers[h])
    if (foundHeaders.length > 0) {
      signals.push(`Shopify headers: ${foundHeaders.join(', ')}`)
      confidence = 'high'
    }

    // Check server header
    const server = mainResult.headers['server'] || ''
    if (server.toLowerCase().includes('shopify')) {
      signals.push('Server header contains "Shopify"')
      confidence = 'high'
    }
  }

  // Signal 2: Probe /products.json (public Shopify endpoint, no auth)
  const productsResult = await safeFetch(`${base}/products.json?limit=1`)
  if (productsResult.ok && isJsonContent(productsResult.contentType)) {
    const body = productsResult.body as Record<string, unknown> | null
    if (body && Array.isArray(body.products)) {
      const products = body.products as ShopifyProduct[]
      if (products.length > 0) {
        // Verify it looks like a Shopify product (has handle, variants, etc.)
        const firstProduct = products[0]
        if (firstProduct.handle && Array.isArray(firstProduct.variants)) {
          signals.push('/products.json returns Shopify product schema')
          confidence = 'high'
        } else {
          signals.push('/products.json returns product array')
          if (confidence !== 'high') confidence = 'medium'
        }
      } else {
        signals.push('/products.json responds (empty catalog)')
        if (confidence !== 'high') confidence = 'medium'
      }
    }
  }

  // Signal 3: Probe /collections.json (confirms Shopify catalog structure)
  if (confidence !== 'high') {
    const collectionsResult = await safeFetch(`${base}/collections.json?limit=1`)
    if (collectionsResult.ok && isJsonContent(collectionsResult.contentType)) {
      const body = collectionsResult.body as Record<string, unknown> | null
      if (body && Array.isArray(body.collections)) {
        signals.push('/collections.json returns Shopify collection schema')
        confidence = 'medium'
      }
    }
  }

  // Signal 4: HTML source check (fallback — look for Shopify-specific markers)
  if (signals.length === 0 && mainResult.ok && typeof mainResult.body === 'string') {
    const html = mainResult.body as string
    const markers = [
      'shopify',
      'cdn.shopify.com',
      'myshopify.com',
      'Shopify.theme',
      'shopify-section',
      'data-shopify',
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

  const detected = signals.length > 0

  return {
    detected,
    platform: detected ? ('shopify' as EcommercePlatform) : null,
    confidence,
    details: detected
      ? `Shopify store detected via: ${signals.join('; ')}`
      : 'No Shopify indicators found',
    apiBase: detected ? base : undefined,
  }
}

// ---------------------------------------------------------------------------
// MCP Tool Generation
// ---------------------------------------------------------------------------

/**
 * Generate MCP tool definitions for a Shopify store.
 * All 5 tools use the public Shopify JSON endpoints (no auth needed).
 */
function generateMcpTools(storeUrl: string): McpTool[] {
  const base = normalizeStoreUrl(storeUrl)

  const tools: McpTool[] = [
    // --- search_products ---
    {
      name: 'search_products',
      description: `Search products in this Shopify store (${base}). Returns matching products with titles, prices, images, and availability. Queries /products.json and filters client-side.`,
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term to match against product titles, descriptions, vendors, and tags',
          } as McpToolProperty,
          category: {
            type: 'string',
            description: 'Filter by product type (e.g., "T-Shirts", "Electronics")',
          } as McpToolProperty,
          price_min: {
            type: 'number',
            description: 'Minimum price filter',
            minimum: 0,
          } as McpToolProperty,
          price_max: {
            type: 'number',
            description: 'Maximum price filter',
            minimum: 0,
          } as McpToolProperty,
          limit: {
            type: 'number',
            description: 'Maximum number of results to return (default: 10, max: 50)',
            minimum: 1,
            maximum: 50,
            default: 10,
          } as McpToolProperty,
        },
        required: ['query'],
      },
    },

    // --- get_product_details ---
    {
      name: 'get_product_details',
      description: `Get full details for a specific product from this Shopify store (${base}). Returns all variants, images, pricing, and description. Uses the product handle (URL slug).`,
      inputSchema: {
        type: 'object',
        properties: {
          product_handle: {
            type: 'string',
            description: 'The product handle (URL slug, e.g., "blue-running-shoes"). Found in product URLs or search results.',
          } as McpToolProperty,
        },
        required: ['product_handle'],
      },
    },

    // --- check_availability ---
    {
      name: 'check_availability',
      description: `Check whether a specific product or variant is in stock at this Shopify store (${base}). Returns availability status per variant.`,
      inputSchema: {
        type: 'object',
        properties: {
          product_handle: {
            type: 'string',
            description: 'The product handle (URL slug)',
          } as McpToolProperty,
          variant_title: {
            type: 'string',
            description: 'Optional: specific variant title (e.g., "Large / Blue"). If omitted, checks all variants.',
          } as McpToolProperty,
        },
        required: ['product_handle'],
      },
    },

    // --- get_collections ---
    {
      name: 'get_collections',
      description: `Get all product collections (categories) from this Shopify store (${base}). Returns collection names, handles, and descriptions.`,
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },

    // --- get_store_info ---
    {
      name: 'get_store_info',
      description: `Get summary information about this Shopify store (${base}). Returns store name, product count, collection count, price range, product types, and vendors.`,
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ]

  return tools
}

// ---------------------------------------------------------------------------
// Runtime Tool Executors
// ---------------------------------------------------------------------------
// These functions actually execute the generated tools against a live Shopify
// store. Called by the gateway when an agent invokes a Shopify MCP tool.

export interface ShopifyToolResult {
  success: boolean
  data: Record<string, unknown> | null
  error: string | null
  endpoint_used: string
  response_time_ms: number
}

export async function executeShopifyTool(
  toolName: string,
  storeUrl: string,
  params: Record<string, unknown>
): Promise<ShopifyToolResult> {
  const base = normalizeStoreUrl(storeUrl)
  const start = Date.now()

  try {
    switch (toolName) {
      case 'search_products': {
        const query = (params.query as string) || ''
        const category = params.category as string | undefined
        const priceMin = params.price_min as number | undefined
        const priceMax = params.price_max as number | undefined
        const limit = Math.min(Math.max((params.limit as number) || 10, 1), 50)

        const endpoint = `${base}/products.json?limit=250`
        const result = await safeFetch(endpoint)
        if (!result.ok) {
          return { success: false, data: null, error: 'Failed to fetch products', endpoint_used: endpoint, response_time_ms: Date.now() - start }
        }

        const body = result.body as Record<string, unknown>
        let products = (body?.products as ShopifyProduct[]) || []

        // Text search
        if (query) {
          const q = query.toLowerCase()
          products = products.filter((p) => {
            const searchable = [p.title, p.product_type, p.vendor, stripHtml(p.body_html), ...p.tags].join(' ').toLowerCase()
            return searchable.includes(q)
          })
        }

        // Category filter
        if (category) {
          products = products.filter((p) => p.product_type.toLowerCase() === category.toLowerCase())
        }

        // Price filters
        if (priceMin !== undefined || priceMax !== undefined) {
          products = products.filter((p) => {
            const prices = p.variants.map((v) => parseFloat(v.price)).filter((n) => !isNaN(n))
            if (prices.length === 0) return false
            const minPrice = Math.min(...prices)
            if (priceMin !== undefined && minPrice < priceMin) return false
            if (priceMax !== undefined && minPrice > priceMax) return false
            return true
          })
        }

        const limited = products.slice(0, limit)

        return {
          success: true,
          data: {
            query,
            total_count: products.length,
            returned_count: limited.length,
            products: limited.map((p) => ({
              handle: p.handle,
              title: p.title,
              product_type: p.product_type,
              vendor: p.vendor,
              price: p.variants[0]?.price || null,
              compare_at_price: p.variants[0]?.compare_at_price || null,
              available: p.variants.some((v) => v.available),
              image: p.images[0]?.src || null,
              variant_count: p.variants.length,
              tags: p.tags.slice(0, 5),
              url: `${base}/products/${p.handle}`,
            })),
          },
          error: null,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_product_details': {
        const handle = params.product_handle as string
        if (!handle) {
          return { success: false, data: null, error: 'product_handle is required', endpoint_used: '', response_time_ms: Date.now() - start }
        }

        const endpoint = `${base}/products/${encodeURIComponent(handle)}.json`
        const result = await safeFetch(endpoint)
        if (!result.ok) {
          return { success: false, data: null, error: `Product "${handle}" not found`, endpoint_used: endpoint, response_time_ms: Date.now() - start }
        }

        const body = result.body as Record<string, unknown>
        const p = body?.product as ShopifyProduct | undefined
        if (!p) {
          return { success: false, data: null, error: `Product "${handle}" not found`, endpoint_used: endpoint, response_time_ms: Date.now() - start }
        }

        const prices = p.variants.map((v) => parseFloat(v.price)).filter((n) => !isNaN(n))

        return {
          success: true,
          data: {
            title: p.title,
            handle: p.handle,
            description: stripHtml(p.body_html),
            vendor: p.vendor,
            product_type: p.product_type,
            tags: p.tags,
            url: `${base}/products/${p.handle}`,
            price_range: {
              min: prices.length > 0 ? Math.min(...prices) : null,
              max: prices.length > 0 ? Math.max(...prices) : null,
            },
            available: p.variants.some((v) => v.available),
            variants: p.variants.map((v) => ({
              id: v.id,
              title: v.title,
              price: v.price,
              compare_at_price: v.compare_at_price,
              sku: v.sku,
              available: v.available,
              inventory_quantity: v.inventory_quantity ?? null,
              options: [v.option1, v.option2, v.option3].filter(Boolean),
            })),
            images: p.images.map((img) => ({
              src: img.src,
              alt: img.alt,
              width: img.width,
              height: img.height,
            })),
            created_at: p.created_at,
            updated_at: p.updated_at,
          },
          error: null,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'check_availability': {
        const handle = params.product_handle as string
        if (!handle) {
          return { success: false, data: null, error: 'product_handle is required', endpoint_used: '', response_time_ms: Date.now() - start }
        }

        const endpoint = `${base}/products/${encodeURIComponent(handle)}.json`
        const result = await safeFetch(endpoint)
        if (!result.ok) {
          return { success: false, data: null, error: `Product "${handle}" not found`, endpoint_used: endpoint, response_time_ms: Date.now() - start }
        }

        const body = result.body as Record<string, unknown>
        const p = body?.product as ShopifyProduct | undefined
        if (!p) {
          return { success: false, data: null, error: `Product "${handle}" not found`, endpoint_used: endpoint, response_time_ms: Date.now() - start }
        }

        let variants = p.variants
        const variantTitle = params.variant_title as string | undefined
        if (variantTitle) {
          const search = variantTitle.toLowerCase()
          variants = variants.filter((v) => v.title.toLowerCase().includes(search))
        }

        const available = variants.filter((v) => v.available)

        return {
          success: true,
          data: {
            product_handle: handle,
            product_title: p.title,
            in_stock: available.length > 0,
            available_count: available.length,
            total_variants: variants.length,
            variants: variants.map((v) => ({
              title: v.title,
              available: v.available,
              price: v.price,
              sku: v.sku,
              inventory_quantity: v.inventory_quantity ?? null,
            })),
          },
          error: null,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_collections': {
        const endpoint = `${base}/collections.json?limit=250`
        const result = await safeFetch(endpoint)
        if (!result.ok) {
          return { success: false, data: null, error: 'Failed to fetch collections', endpoint_used: endpoint, response_time_ms: Date.now() - start }
        }

        const body = result.body as Record<string, unknown>
        const collections = (body?.collections as ShopifyCollection[]) || []

        return {
          success: true,
          data: {
            total_count: collections.length,
            collections: collections.map((c) => ({
              handle: c.handle,
              title: c.title,
              description: stripHtml(c.body_html),
              image: c.image?.src || null,
              published_at: c.published_at,
              updated_at: c.updated_at,
            })),
          },
          error: null,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_store_info': {
        const [productsResult, collectionsResult] = await Promise.all([
          safeFetch(`${base}/products.json?limit=250`),
          safeFetch(`${base}/collections.json?limit=250`),
        ])

        const products = productsResult.ok
          ? ((productsResult.body as Record<string, unknown>)?.products as ShopifyProduct[]) || []
          : []
        const collections = collectionsResult.ok
          ? ((collectionsResult.body as Record<string, unknown>)?.collections as ShopifyCollection[]) || []
          : []

        // Extract store name from first product vendor
        let storeName = 'Shopify Store'
        if (products.length > 0 && products[0].vendor) {
          storeName = products[0].vendor
        } else {
          try {
            const hostname = new URL(base).hostname.replace(/^www\./, '')
            storeName = hostname.split('.')[0].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
          } catch { /* fallback */ }
        }

        const productTypes = [...new Set(products.map((p) => p.product_type).filter(Boolean))]
        const vendors = [...new Set(products.map((p) => p.vendor).filter(Boolean))]

        // Price range
        const allPrices: number[] = []
        for (const p of products) {
          for (const v of p.variants) {
            const price = parseFloat(v.price)
            if (!isNaN(price) && price > 0) allPrices.push(price)
          }
        }
        const priceRange = allPrices.length > 0
          ? { min: Math.min(...allPrices), max: Math.max(...allPrices) }
          : null

        return {
          success: true,
          data: {
            store_name: storeName,
            store_url: base,
            platform: 'shopify',
            product_count: products.length,
            collection_count: collections.length,
            price_range: priceRange
              ? `$${priceRange.min.toFixed(2)} - $${priceRange.max.toFixed(2)}`
              : null,
            product_types: productTypes,
            vendors,
            collections: collections.map((c) => c.title),
          },
          error: null,
          endpoint_used: `${base}/products.json, ${base}/collections.json`,
          response_time_ms: Date.now() - start,
        }
      }

      default:
        return {
          success: false,
          data: null,
          error: `Unknown Shopify tool: ${toolName}`,
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

export const shopifyAdapter: EcommerceAdapter = {
  platform: 'shopify' as EcommercePlatform,
  detect: detectShopifyStore,
  generateTools: async (storeUrl: string) => generateMcpTools(storeUrl),
}

// Named exports for direct use
export { detectShopifyStore, generateMcpTools }
