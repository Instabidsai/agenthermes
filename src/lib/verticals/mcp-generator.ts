// ---------------------------------------------------------------------------
// Universal MCP Tool Generator
// Takes a business profile + vertical template -> generates MCP tool definitions.
//
// The 7 universal patterns:
//   1. get_business_info      -> always generated
//   2. get_services           -> always generated
//   3. check_availability     -> always generated
//   4. get_quote              -> if pricing is defined
//   5. book_appointment / place_order -> based on booking method
//   6. search_[items]         -> for inventory-based verticals
//   7. check_[specific]       -> vertical-specific (check_insurance, check_service_area, etc.)
// ---------------------------------------------------------------------------

import {
  type VerticalTemplate,
  type McpToolTemplate,
  getTemplateById,
} from './templates'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BusinessProfile {
  id: string
  name: string
  domain?: string
  description: string
  phone: string
  email: string
  address: string
  website?: string
  hours: string
  service_area: string
  vertical_id: string
  /** Vertical-specific field values, keyed by field.key */
  vertical_data: Record<string, unknown>
}

export interface McpToolDefinition {
  name: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<string, McpPropertySchema>
    required: string[]
  }
  /** Which stage of the agent journey this tool serves */
  category: string
  /** Expected output field names (for documentation / type hints) */
  outputFields: string[]
  /** Whether this tool is a universal pattern or vertical-specific */
  source: 'universal' | 'vertical'
}

export interface McpPropertySchema {
  type: string
  description: string
  enum?: string[]
}

export interface GeneratedMcpServer {
  business_id: string
  business_name: string
  vertical_id: string
  vertical_name: string
  tools: McpToolDefinition[]
  metadata: {
    generated_at: string
    tool_count: number
    universal_count: number
    vertical_count: number
    categories: string[]
  }
}

// ---------------------------------------------------------------------------
// Universal tool generators (always generated for every business)
// ---------------------------------------------------------------------------

function generateGetBusinessInfo(profile: BusinessProfile): McpToolDefinition {
  return {
    name: 'get_business_info',
    description: `Get business information for ${profile.name} including hours, location, contact info, and service area.`,
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    category: 'understand',
    outputFields: [
      'name',
      'description',
      'phone',
      'email',
      'address',
      'website',
      'hours',
      'service_area',
    ],
    source: 'universal',
  }
}

function generateGetServices(
  profile: BusinessProfile,
  template: VerticalTemplate
): McpToolDefinition {
  const verticalHint =
    template.category === 'retail'
      ? 'products and menu items'
      : template.category === 'tech'
        ? 'product plans and features'
        : 'services'

  return {
    name: 'get_services',
    description: `Get the list of ${verticalHint} offered by ${profile.name} with descriptions and pricing.`,
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: `Filter by category or type of ${verticalHint}`,
        },
      },
      required: [],
    },
    category: 'understand',
    outputFields: ['services', 'name', 'description', 'price_range'],
    source: 'universal',
  }
}

function generateCheckAvailability(
  profile: BusinessProfile,
  template: VerticalTemplate
): McpToolDefinition {
  const isAppointmentBased = [
    'local_services',
    'professional',
  ].includes(template.category)

  return {
    name: 'check_availability',
    description: isAppointmentBased
      ? `Check available appointment slots at ${profile.name} for a given date.`
      : `Check if ${profile.name} is currently open and has availability.`,
    inputSchema: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description: 'Date to check availability (ISO format or natural language)',
        },
        ...(isAppointmentBased
          ? {
              service_type: {
                type: 'string',
                description: 'Type of service or appointment needed',
              },
            }
          : {}),
      },
      required: ['date'],
    },
    category: 'find',
    outputFields: isAppointmentBased
      ? ['available_slots', 'next_available', 'service_type']
      : ['is_open', 'current_hours', 'next_open'],
    source: 'universal',
  }
}

// ---------------------------------------------------------------------------
// Conditional universal tool generators
// ---------------------------------------------------------------------------

function generateGetQuote(
  profile: BusinessProfile,
  template: VerticalTemplate
): McpToolDefinition | null {
  // Only generate if the vertical has pricing-related fields
  const hasPricing = template.verticalFields.some(
    (f) =>
      f.key.includes('price') ||
      f.key.includes('fee') ||
      f.key.includes('rate') ||
      f.key.includes('pricing')
  )
  if (!hasPricing) return null

  return {
    name: 'get_quote',
    description: `Get a price quote from ${profile.name} for a specific service or project.`,
    inputSchema: {
      type: 'object',
      properties: {
        service_type: {
          type: 'string',
          description: 'Type of service or work needed',
        },
        details: {
          type: 'string',
          description: 'Additional details about the request',
        },
      },
      required: ['service_type'],
    },
    category: 'evaluate',
    outputFields: ['price_range', 'includes', 'turnaround', 'notes'],
    source: 'universal',
  }
}

function generateBookingTool(
  profile: BusinessProfile,
  template: VerticalTemplate
): McpToolDefinition | null {
  // Determine booking type from vertical
  const isOrderBased = ['restaurant', 'boutique_retail'].includes(template.id)
  const hasBooking = template.mcpTools.some(
    (t) =>
      t.name.includes('book') ||
      t.name.includes('schedule') ||
      t.name.includes('place_order') ||
      t.name.includes('reserve')
  )

  // Skip if the vertical already has its own booking tools (they are more specific)
  if (hasBooking) return null

  if (isOrderBased) {
    return {
      name: 'place_order',
      description: `Place an order with ${profile.name}.`,
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            type: 'string',
            description: 'Items to order (JSON array or comma-separated)',
          },
          customer_name: {
            type: 'string',
            description: 'Customer name',
          },
          phone: {
            type: 'string',
            description: 'Contact phone',
          },
        },
        required: ['items', 'customer_name', 'phone'],
      },
      category: 'book',
      outputFields: ['order_id', 'total', 'estimated_ready'],
      source: 'universal',
    }
  }

  return {
    name: 'book_appointment',
    description: `Book an appointment with ${profile.name}.`,
    inputSchema: {
      type: 'object',
      properties: {
        customer_name: {
          type: 'string',
          description: 'Customer name',
        },
        phone: {
          type: 'string',
          description: 'Contact phone',
        },
        service_type: {
          type: 'string',
          description: 'Type of service or appointment',
        },
        preferred_date: {
          type: 'string',
          description: 'Preferred date',
        },
        preferred_time: {
          type: 'string',
          description: 'Preferred time window',
        },
      },
      required: ['customer_name', 'phone', 'service_type', 'preferred_date'],
    },
    category: 'book',
    outputFields: ['confirmation_id', 'scheduled_datetime', 'notes'],
    source: 'universal',
  }
}

function generateSearchTool(
  profile: BusinessProfile,
  template: VerticalTemplate
): McpToolDefinition | null {
  // Only for inventory-based verticals
  const inventoryVerticals = ['auto_dealer', 'boutique_retail', 'real_estate']
  if (!inventoryVerticals.includes(template.id)) return null

  // Skip if vertical already has search tools
  const hasSearch = template.mcpTools.some(
    (t) => t.name.includes('search') || t.name.includes('inventory')
  )
  if (hasSearch) return null

  const itemLabel =
    template.id === 'auto_dealer'
      ? 'vehicles'
      : template.id === 'real_estate'
        ? 'listings'
        : 'products'

  return {
    name: `search_${itemLabel}`,
    description: `Search ${itemLabel} at ${profile.name} with filters.`,
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: `Search term or ${itemLabel} description`,
        },
        price_max: {
          type: 'number',
          description: 'Maximum price',
        },
      },
      required: ['query'],
    },
    category: 'find',
    outputFields: [itemLabel, 'total_count'],
    source: 'universal',
  }
}

// ---------------------------------------------------------------------------
// Convert vertical template tool to full MCP definition
// ---------------------------------------------------------------------------

function templateToolToDefinition(
  tool: McpToolTemplate,
  profile: BusinessProfile
): McpToolDefinition {
  const properties: Record<string, McpPropertySchema> = {}
  const required: string[] = []

  for (const param of tool.inputSchema) {
    properties[param.name] = {
      type: param.type === 'boolean' ? 'boolean' : param.type === 'number' ? 'number' : 'string',
      description: param.description,
      ...(param.enum ? { enum: param.enum } : {}),
    }
    if (param.required) {
      required.push(param.name)
    }
  }

  return {
    name: tool.name,
    description: tool.description,
    inputSchema: {
      type: 'object',
      properties,
      required,
    },
    category: tool.category,
    outputFields: tool.outputFields,
    source: 'vertical',
  }
}

// ---------------------------------------------------------------------------
// Main generator function
// ---------------------------------------------------------------------------

/**
 * Generate a complete MCP server definition from a business profile and vertical template.
 * Returns the full set of tools: universal + vertical-specific.
 */
export function generateMcpTools(profile: BusinessProfile): GeneratedMcpServer {
  const template = getTemplateById(profile.vertical_id)
  if (!template) {
    throw new Error(`Unknown vertical: ${profile.vertical_id}`)
  }

  const tools: McpToolDefinition[] = []

  // 1. Always-generated universal tools
  tools.push(generateGetBusinessInfo(profile))
  tools.push(generateGetServices(profile, template))
  tools.push(generateCheckAvailability(profile, template))

  // 2. Conditional universal tools
  const quoteTool = generateGetQuote(profile, template)
  if (quoteTool) tools.push(quoteTool)

  const bookingTool = generateBookingTool(profile, template)
  if (bookingTool) tools.push(bookingTool)

  const searchTool = generateSearchTool(profile, template)
  if (searchTool) tools.push(searchTool)

  // 3. Vertical-specific tools from template
  for (const templateTool of template.mcpTools) {
    // Avoid duplicates — if a universal tool already covers the same name, skip
    const alreadyGenerated = tools.some((t) => t.name === templateTool.name)
    if (!alreadyGenerated) {
      tools.push(templateToolToDefinition(templateTool, profile))
    }
  }

  // Deduplicate by name (prefer vertical-specific over universal for same-named tools)
  const seen = new Set<string>()
  const deduped: McpToolDefinition[] = []
  // Vertical tools first so they win
  const sorted = [...tools].sort((a, b) =>
    a.source === 'vertical' && b.source === 'universal' ? -1 : 1
  )
  for (const tool of sorted) {
    if (!seen.has(tool.name)) {
      seen.add(tool.name)
      deduped.push(tool)
    }
  }

  const universalCount = deduped.filter((t) => t.source === 'universal').length
  const verticalCount = deduped.filter((t) => t.source === 'vertical').length
  const categories = [...new Set(deduped.map((t) => t.category))]

  return {
    business_id: profile.id,
    business_name: profile.name,
    vertical_id: template.id,
    vertical_name: template.name,
    tools: deduped,
    metadata: {
      generated_at: new Date().toISOString(),
      tool_count: deduped.length,
      universal_count: universalCount,
      vertical_count: verticalCount,
      categories,
    },
  }
}

/**
 * Generate a preview of what MCP tools would be created for a given vertical,
 * without needing a full business profile. Used in the /connect page Step 0.
 */
export function previewMcpTools(verticalId: string): McpToolDefinition[] {
  const template = getTemplateById(verticalId)
  if (!template) return []

  const preview: McpToolDefinition[] = []

  // Universal tools (simplified)
  preview.push({
    name: 'get_business_info',
    description: 'Get business hours, location, contact info, and service area.',
    inputSchema: { type: 'object', properties: {}, required: [] },
    category: 'understand',
    outputFields: ['name', 'description', 'phone', 'hours', 'service_area'],
    source: 'universal',
  })

  preview.push({
    name: 'get_services',
    description: 'Get list of services/products with descriptions and pricing.',
    inputSchema: { type: 'object', properties: {}, required: [] },
    category: 'understand',
    outputFields: ['services', 'name', 'description', 'price_range'],
    source: 'universal',
  })

  // Vertical-specific tools
  for (const tool of template.mcpTools) {
    preview.push(templateToolToDefinition(tool, {
      id: 'preview',
      name: 'Your Business',
      description: '',
      phone: '',
      email: '',
      address: '',
      hours: '',
      service_area: '',
      vertical_id: verticalId,
      vertical_data: {},
    }))
  }

  return preview
}

/**
 * Convert generated tools into the MCP JSON protocol format
 * (what gets served at /.well-known/mcp.json or the MCP SSE endpoint).
 */
export function toMcpProtocolFormat(server: GeneratedMcpServer) {
  return {
    name: `${server.business_name} MCP Server`,
    version: '1.0.0',
    description: `AI agent tools for ${server.business_name} (${server.vertical_name})`,
    tools: server.tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  }
}
