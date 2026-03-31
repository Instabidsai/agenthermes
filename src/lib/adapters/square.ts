// ---------------------------------------------------------------------------
// Square Adapter — Auto-generate MCP tools from any Square Online store
// ---------------------------------------------------------------------------
// Square Online stores use several identifiable patterns:
//   - squareup.com or square.site in HTML/assets
//   - /s/api/* patterns for catalog access
//   - Square-specific response headers
//   - Squarespace-adjacent CDN (Square owns Weebly, uses similar patterns)
//
// Detection strategy (4 signals, any = confirmed):
//   - HTML markers: squareup.com, square.site, square-online, etc.
//   - Response headers: x-square-*, server header patterns
//   - /s/api or /square-marketplace API patterns
//   - Square catalog embed patterns in page source
//
// Generated MCP tools (5):
//   search_products — catalog search across items
//   get_product_details — item detail with variations + modifiers
//   check_availability — stock/availability status
//   get_store_info — store name, hours, location
//   get_menu — menu items, categories, modifiers (restaurant use case)
//
// Note: Runtime execution routes through the AgentHermes hosted proxy.
// Square's public catalog API requires merchant enablement — detection
// focuses on identifying the platform so we can generate the right tools.
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
        'User-Agent': 'AgentHermes-SquareAdapter/1.0',
      },
      signal: controller.signal,
      redirect: 'follow',
    })
    clearTimeout(timer)

    const ct = res.headers.get('content-type') ?? null

    // Collect Square-specific headers
    const responseHeaders: Record<string, string> = {}
    const headerKeys = [
      'x-square-version',
      'x-sq-version',
      'x-sq-request-id',
      'x-squareup-generated',
      'server',
      'x-powered-by',
      'x-request-id',
      'x-cache',
      'via',
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

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------

/** HTML markers that indicate a Square Online store */
const SQUARE_HTML_MARKERS = [
  'squareup.com',
  'square.site',
  'square-online',
  'squareonline',
  'square-marketplace',
  'js.squarecdn.com',
  'cdn.squarecdn.com',
  'square-storefront',
  'data-square',
  'sq-widget',
  'square-payment',
  'square_merchant_id',
  'squareup.com/dashboard',
  'connect.squareup.com',
]

/** Response header keys that confirm Square platform */
const SQUARE_HEADER_INDICATORS = [
  'x-square-version',
  'x-sq-version',
  'x-sq-request-id',
  'x-squareup-generated',
]

/**
 * Check if a URL is a Square Online store by probing 4 independent signals.
 * Returns high confidence if Square-specific HTML markers or headers are found.
 */
async function detectSquareStore(url: string): Promise<DetectionResult> {
  const base = normalizeStoreUrl(url)
  let confidence: DetectionResult['confidence'] = 'low'
  const signals: string[] = []

  // Signal 1: Check response headers on the main page for Square markers
  const mainResult = await safeFetch(base)
  if (mainResult.ok || mainResult.status !== null) {
    const foundHeaders = SQUARE_HEADER_INDICATORS.filter((h) => mainResult.headers[h])
    if (foundHeaders.length > 0) {
      signals.push(`Square headers: ${foundHeaders.join(', ')}`)
      confidence = 'high'
    }

    // Check server header for Square/Squareup
    const server = mainResult.headers['server'] || ''
    if (server.toLowerCase().includes('square')) {
      signals.push('Server header contains "Square"')
      confidence = 'high'
    }
  }

  // Signal 2: HTML source check for Square-specific markers
  if (mainResult.ok && typeof mainResult.body === 'string') {
    const html = mainResult.body as string
    const htmlLower = html.toLowerCase()

    const found = SQUARE_HTML_MARKERS.filter((m) => htmlLower.includes(m.toLowerCase()))
    if (found.length >= 3) {
      signals.push(`HTML markers (strong): ${found.join(', ')}`)
      confidence = 'high'
    } else if (found.length === 2) {
      signals.push(`HTML markers: ${found.join(', ')}`)
      if (confidence !== 'high') confidence = 'medium'
    } else if (found.length === 1) {
      signals.push(`HTML marker: ${found[0]}`)
      // confidence stays at whatever it was — one marker alone is weak
    }

    // Check for Square Online URL patterns in page source
    const squareUrlPatterns = [
      /square\.site\//i,
      /squareup\.com\/store\//i,
      /squareup\.com\/appointments\//i,
      /connect\.squareup\.com\/v2/i,
    ]
    const urlPatternFound = squareUrlPatterns.filter((p) => p.test(html))
    if (urlPatternFound.length > 0) {
      signals.push(`Square URL patterns in source (${urlPatternFound.length} found)`)
      if (confidence !== 'high') confidence = 'medium'
    }
  }

  // Signal 3: Check for square.site domain or squareup.com subdomain
  try {
    const hostname = new URL(base).hostname.toLowerCase()
    if (hostname.endsWith('.square.site') || hostname.endsWith('.squareup.com')) {
      signals.push(`Square-hosted domain: ${hostname}`)
      confidence = 'high'
    }
  } catch {
    // URL parse failed, skip this signal
  }

  // Signal 4: Probe for Square-specific API patterns
  const apiPaths = [
    '/s/api/open/v1/catalog',
    '/s/api/open/v1/locations',
    '/app/store/api/v1/catalog',
  ]
  const apiResults = await Promise.all(
    apiPaths.map((p) => safeFetch(`${base}${p}`))
  )
  const apiHit = apiResults.find(
    (r) => r.ok || r.status === 401 || r.status === 403
  )
  if (apiHit) {
    signals.push(`Square API endpoint responds at ${apiPaths[apiResults.indexOf(apiHit)]}`)
    if (confidence !== 'high') confidence = 'medium'
  }

  const detected = signals.length > 0

  return {
    detected,
    platform: detected ? ('square' as EcommercePlatform) : null,
    confidence,
    details: detected
      ? `Square Online store detected via: ${signals.join('; ')}`
      : 'No Square indicators found',
    apiBase: detected ? base : undefined,
  }
}

// ---------------------------------------------------------------------------
// MCP Tool Generation
// ---------------------------------------------------------------------------

/**
 * Generate MCP tool definitions for a Square store.
 * All 5 tools are designed for the Square catalog/commerce model.
 * Runtime execution routes through the AgentHermes hosted proxy which
 * handles merchant auth and Square API calls.
 */
function generateMcpTools(storeUrl: string): McpTool[] {
  const base = normalizeStoreUrl(storeUrl)

  const tools: McpTool[] = [
    // --- search_products ---
    {
      name: 'search_products',
      description: `Search products/items in this Square store (${base}). Returns matching catalog items with names, prices, images, and availability. Supports text search and category filtering.`,
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term to match against item names, descriptions, and categories',
          } as McpToolProperty,
          category: {
            type: 'string',
            description: 'Filter by category name (e.g., "Appetizers", "T-Shirts", "Services")',
          } as McpToolProperty,
          price_min: {
            type: 'number',
            description: 'Minimum price filter (in store currency, e.g., 10.00)',
            minimum: 0,
          } as McpToolProperty,
          price_max: {
            type: 'number',
            description: 'Maximum price filter (in store currency)',
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
      description: `Get full details for a specific item from this Square store (${base}). Returns all variations (sizes, colors, etc.), modifiers, images, pricing, and description. Uses the item ID or slug.`,
      inputSchema: {
        type: 'object',
        properties: {
          item_id: {
            type: 'string',
            description: 'The Square catalog item ID (from search results or store URLs)',
          } as McpToolProperty,
          slug: {
            type: 'string',
            description: 'The item URL slug (alternative to item_id)',
          } as McpToolProperty,
        },
      },
    },

    // --- check_availability ---
    {
      name: 'check_availability',
      description: `Check whether a specific item or variation is available at this Square store (${base}). Returns stock status per variation and location.`,
      inputSchema: {
        type: 'object',
        properties: {
          item_id: {
            type: 'string',
            description: 'The Square catalog item ID',
          } as McpToolProperty,
          variation_id: {
            type: 'string',
            description: 'Optional: specific variation ID (e.g., "Large / Blue"). If omitted, checks all variations.',
          } as McpToolProperty,
          location_id: {
            type: 'string',
            description: 'Optional: specific location ID. If omitted, checks all locations.',
          } as McpToolProperty,
        },
        required: ['item_id'],
      },
    },

    // --- get_store_info ---
    {
      name: 'get_store_info',
      description: `Get summary information about this Square store (${base}). Returns store name, description, business hours, location(s), currency, and catalog summary.`,
      inputSchema: {
        type: 'object',
        properties: {
          include_hours: {
            type: 'string',
            description: 'Include business hours in response (default: true)',
            enum: ['true', 'false'],
            default: 'true',
          } as McpToolProperty,
          include_locations: {
            type: 'string',
            description: 'Include all locations (default: true)',
            enum: ['true', 'false'],
            default: 'true',
          } as McpToolProperty,
        },
      },
    },

    // --- get_menu ---
    {
      name: 'get_menu',
      description: `Get the menu for this Square store (${base}). Designed for restaurants and food businesses using Square for menu management. Returns menu categories, items, prices, modifiers (add-ons, customizations), and dietary tags.`,
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Filter by menu category (e.g., "Appetizers", "Entrees", "Drinks")',
          } as McpToolProperty,
          dietary: {
            type: 'string',
            description: 'Filter by dietary tag',
            enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'],
          } as McpToolProperty,
          include_modifiers: {
            type: 'string',
            description: 'Include modifier groups (add-ons, customizations) in response (default: true)',
            enum: ['true', 'false'],
            default: 'true',
          } as McpToolProperty,
          location_id: {
            type: 'string',
            description: 'Optional: specific location ID (menus may vary by location)',
          } as McpToolProperty,
        },
      },
    },
  ]

  return tools
}

// ---------------------------------------------------------------------------
// Runtime Tool Executors
// ---------------------------------------------------------------------------
// These functions execute the generated tools against a live Square store.
// Square's catalog API requires merchant OAuth — runtime calls route through
// the AgentHermes proxy which handles auth. For stores with public catalog
// pages, we can scrape structured data as a fallback.

export interface SquareToolResult {
  success: boolean
  data: Record<string, unknown> | null
  error: string | null
  endpoint_used: string
  response_time_ms: number
}

export async function executeSquareTool(
  toolName: string,
  storeUrl: string,
  params: Record<string, unknown>
): Promise<SquareToolResult> {
  const base = normalizeStoreUrl(storeUrl)
  const start = Date.now()

  try {
    switch (toolName) {
      case 'search_products': {
        // Try the public catalog page first, then fall back to proxy
        const query = (params.query as string) || ''
        const limit = Math.min(Math.max((params.limit as number) || 10, 1), 50)

        // Attempt public Square Online catalog search
        const searchUrl = `${base}/s/api/open/v1/catalog/search`
        const result = await safeFetch(
          `${searchUrl}?query=${encodeURIComponent(query)}&limit=${limit}`
        )

        if (result.ok && typeof result.body === 'object' && result.body !== null) {
          return {
            success: true,
            data: result.body as Record<string, unknown>,
            error: null,
            endpoint_used: searchUrl,
            response_time_ms: Date.now() - start,
          }
        }

        // Proxy fallback — route through AgentHermes gateway
        const proxyUrl = `/api/v1/gateway/square/catalog/search`
        return {
          success: false,
          data: {
            message: 'Square catalog requires merchant authorization. Use the AgentHermes gateway to access this store.',
            gateway_endpoint: proxyUrl,
            query,
            store_url: base,
          },
          error: 'Square catalog API requires merchant OAuth — connect via AgentHermes gateway',
          endpoint_used: searchUrl,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_product_details': {
        const itemId = params.item_id as string
        const slug = params.slug as string
        if (!itemId && !slug) {
          return {
            success: false,
            data: null,
            error: 'Either item_id or slug is required',
            endpoint_used: '',
            response_time_ms: Date.now() - start,
          }
        }

        const identifier = itemId || slug
        const endpoint = `${base}/s/api/open/v1/catalog/items/${encodeURIComponent(identifier)}`
        const result = await safeFetch(endpoint)

        if (result.ok && typeof result.body === 'object' && result.body !== null) {
          return {
            success: true,
            data: result.body as Record<string, unknown>,
            error: null,
            endpoint_used: endpoint,
            response_time_ms: Date.now() - start,
          }
        }

        return {
          success: false,
          data: {
            message: 'Item not found or catalog requires merchant authorization.',
            store_url: base,
            item_id: itemId,
            slug,
          },
          error: result.error || `HTTP ${result.status}`,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'check_availability': {
        const itemId = params.item_id as string
        if (!itemId) {
          return {
            success: false,
            data: null,
            error: 'item_id is required',
            endpoint_used: '',
            response_time_ms: Date.now() - start,
          }
        }

        const endpoint = `${base}/s/api/open/v1/inventory/${encodeURIComponent(itemId)}`
        const result = await safeFetch(endpoint)

        if (result.ok && typeof result.body === 'object' && result.body !== null) {
          return {
            success: true,
            data: result.body as Record<string, unknown>,
            error: null,
            endpoint_used: endpoint,
            response_time_ms: Date.now() - start,
          }
        }

        return {
          success: false,
          data: {
            message: 'Availability check requires merchant authorization.',
            store_url: base,
            item_id: itemId,
          },
          error: result.error || `HTTP ${result.status}`,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_store_info': {
        // Try to extract store info from the main page
        const mainResult = await safeFetch(base)
        const storeInfo: Record<string, unknown> = {
          url: base,
          platform: 'square',
        }

        if (mainResult.ok && typeof mainResult.body === 'string') {
          const html = mainResult.body as string

          // Extract store name from <title>
          const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
          if (titleMatch) {
            storeInfo.name = titleMatch[1].replace(/\s*[-|].*$/, '').trim()
          }

          // Extract meta description
          const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
          if (descMatch) {
            storeInfo.description = descMatch[1]
          }

          // Check for structured data (JSON-LD)
          const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
          if (jsonLdMatches) {
            for (const match of jsonLdMatches) {
              try {
                const jsonStr = match.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '')
                const jsonData = JSON.parse(jsonStr) as Record<string, unknown>
                if (jsonData['@type'] === 'LocalBusiness' || jsonData['@type'] === 'Restaurant' || jsonData['@type'] === 'Store') {
                  storeInfo.structured_data = jsonData
                  if (jsonData.name) storeInfo.name = jsonData.name
                  if (jsonData.address) storeInfo.address = jsonData.address
                  if (jsonData.telephone) storeInfo.phone = jsonData.telephone
                  if (jsonData.openingHoursSpecification) storeInfo.hours = jsonData.openingHoursSpecification
                }
              } catch {
                // JSON-LD parse failed — skip
              }
            }
          }
        }

        // Try Square location API
        const locationResult = await safeFetch(`${base}/s/api/open/v1/locations`)
        if (locationResult.ok && typeof locationResult.body === 'object' && locationResult.body !== null) {
          storeInfo.locations = locationResult.body
        }

        return {
          success: true,
          data: storeInfo,
          error: null,
          endpoint_used: base,
          response_time_ms: Date.now() - start,
        }
      }

      case 'get_menu': {
        // Restaurant-specific: try to get menu data
        const category = params.category as string | undefined
        const includeModifiers = (params.include_modifiers as string) !== 'false'
        const locationId = params.location_id as string | undefined

        let endpoint = `${base}/s/api/open/v1/catalog/categories`
        if (category) {
          endpoint += `?category=${encodeURIComponent(category)}`
        }
        if (locationId) {
          endpoint += `${category ? '&' : '?'}location_id=${encodeURIComponent(locationId)}`
        }

        const result = await safeFetch(endpoint)

        if (result.ok && typeof result.body === 'object' && result.body !== null) {
          const data = result.body as Record<string, unknown>
          if (!includeModifiers) {
            // Strip modifier data if not requested
            delete data.modifier_groups
          }
          return {
            success: true,
            data,
            error: null,
            endpoint_used: endpoint,
            response_time_ms: Date.now() - start,
          }
        }

        // Fallback: try to extract menu from the storefront page
        const menuPageResult = await safeFetch(`${base}/menu`)
        if (menuPageResult.ok && typeof menuPageResult.body === 'string') {
          return {
            success: true,
            data: {
              message: 'Menu page found — structured extraction available via AgentHermes gateway',
              menu_url: `${base}/menu`,
              store_url: base,
            },
            error: null,
            endpoint_used: `${base}/menu`,
            response_time_ms: Date.now() - start,
          }
        }

        return {
          success: false,
          data: {
            message: 'Menu data requires merchant authorization or menu page not found.',
            store_url: base,
          },
          error: result.error || `HTTP ${result.status}`,
          endpoint_used: endpoint,
          response_time_ms: Date.now() - start,
        }
      }

      default:
        return {
          success: false,
          data: null,
          error: `Unknown Square tool: ${toolName}`,
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

export const squareAdapter: EcommerceAdapter = {
  platform: 'square' as EcommercePlatform,
  detect: detectSquareStore,
  generateTools: async (storeUrl: string) => generateMcpTools(storeUrl),
}

// Named exports for direct use
export { detectSquareStore, generateMcpTools }
