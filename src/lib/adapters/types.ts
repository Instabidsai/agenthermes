// ---------------------------------------------------------------------------
// Shared Ecommerce Adapter Types
// ---------------------------------------------------------------------------
// Every ecommerce platform adapter implements this interface.
// Given a store URL, adapters can detect the platform and auto-generate
// MCP-compatible tool definitions that agents can call.
// ---------------------------------------------------------------------------

/** MCP tool definition matching the JSON-RPC tools/list schema */
export interface McpTool {
  name: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<string, McpToolProperty>
    required?: string[]
  }
}

export interface McpToolProperty {
  type: string
  description: string
  enum?: string[]
  minimum?: number
  maximum?: number
  default?: unknown
}

/** Result from platform detection */
export interface DetectionResult {
  detected: boolean
  platform: EcommercePlatform | null
  confidence: 'high' | 'medium' | 'low'
  details: string
  apiBase?: string
}

/** Supported ecommerce platforms */
export type EcommercePlatform = 'shopify' | 'woocommerce' | 'square'

/** Standard product shape returned by any adapter */
export interface NormalizedProduct {
  id: string | number
  name: string
  slug: string
  description: string
  price: string
  regular_price: string
  sale_price: string
  currency: string
  in_stock: boolean
  stock_quantity: number | null
  categories: string[]
  images: string[]
  url: string
  variations: NormalizedVariation[]
  attributes: NormalizedAttribute[]
}

export interface NormalizedVariation {
  id: string | number
  name: string
  price: string
  in_stock: boolean
  stock_quantity: number | null
  attributes: Record<string, string>
}

export interface NormalizedAttribute {
  name: string
  options: string[]
}

export interface NormalizedCategory {
  id: number
  name: string
  slug: string
  count: number
  parent: number
}

export interface StoreInfo {
  name: string
  description: string
  url: string
  currency: string
  currency_symbol: string
  platform: EcommercePlatform
}

// ---------------------------------------------------------------------------
// Adapter interface — implement per platform
// ---------------------------------------------------------------------------

export interface EcommerceAdapter {
  platform: EcommercePlatform

  /** Detect whether the given URL runs this ecommerce platform */
  detect(url: string): Promise<DetectionResult>

  /** Generate MCP tool definitions for the store at the given URL */
  generateTools(storeUrl: string): Promise<McpTool[]>
}
