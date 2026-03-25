import { NextRequest, NextResponse } from 'next/server'

interface EndpointParam {
  name: string
  type: string
  required?: boolean
  description?: string
}

interface EndpointDef {
  method: string
  path: string
  description: string
  params?: EndpointParam[]
  body?: Record<string, string>
}

interface McpProxyInput {
  domain?: string
  name?: string
  api_base?: string
  endpoints?: EndpointDef[]
  auth_type?: string
  auth_header?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const { domain, name, api_base, endpoints, auth_type, auth_header } = body as McpProxyInput

    if (!domain || typeof domain !== 'string' || domain.trim().length === 0) {
      return NextResponse.json({ error: 'domain is required' }, { status: 400 })
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }
    if (!api_base || typeof api_base !== 'string' || api_base.trim().length === 0) {
      return NextResponse.json({ error: 'api_base is required' }, { status: 400 })
    }
    if (!endpoints || !Array.isArray(endpoints) || endpoints.length === 0) {
      return NextResponse.json({ error: 'endpoints array is required and must not be empty' }, { status: 400 })
    }

    // Validate each endpoint
    for (let i = 0; i < endpoints.length; i++) {
      const ep = endpoints[i]
      if (!ep.method || !ep.path || !ep.description) {
        return NextResponse.json(
          { error: `Endpoint at index ${i} requires method, path, and description` },
          { status: 400 }
        )
      }
    }

    const cleanName = name.trim()
    const resolvedAuthType = auth_type || 'api_key'
    const resolvedAuthHeader = auth_header || 'Authorization'

    const code = generateMcpServer({
      name: cleanName,
      apiBase: api_base.trim().replace(/\/+$/, ''),
      endpoints,
      authType: resolvedAuthType,
      authHeader: resolvedAuthHeader,
    })

    return new NextResponse(code, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="mcp-server-${slugify(cleanName)}.ts"`,
      },
    })
  } catch (err) {
    console.error('[remediate/mcp-proxy] Error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function toToolName(method: string, path: string): string {
  const cleaned = path
    .replace(/^\//, '')
    .replace(/\{[^}]+\}/g, 'by_id')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')

  return `${method.toLowerCase()}_${cleaned}`
}

function generateMcpServer(opts: {
  name: string
  apiBase: string
  endpoints: EndpointDef[]
  authType: string
  authHeader: string
}): string {
  const { name, apiBase, endpoints, authType, authHeader } = opts

  // Generate tool definitions
  const toolDefs = endpoints.map((ep) => {
    const toolName = toToolName(ep.method, ep.path)
    const properties: Record<string, Record<string, string>> = {}
    const required: string[] = []

    // Add path params
    const pathParams = ep.path.match(/\{([^}]+)\}/g) || []
    for (const pp of pathParams) {
      const paramName = pp.replace(/[{}]/g, '')
      properties[paramName] = { type: 'string', description: `Path parameter: ${paramName}` }
      required.push(paramName)
    }

    // Add query params
    if (ep.params) {
      for (const p of ep.params) {
        properties[p.name] = {
          type: p.type || 'string',
          description: p.description || p.name,
        }
        if (p.required) required.push(p.name)
      }
    }

    // Add body params
    if (ep.body) {
      for (const [key, type] of Object.entries(ep.body)) {
        properties[key] = { type: type || 'string', description: `Body field: ${key}` }
      }
    }

    return { toolName, ep, properties, required }
  })

  const toolsArray = toolDefs
    .map(({ toolName, ep, properties, required }) => {
      const propsStr = Object.entries(properties)
        .map(([k, v]) => `          ${k}: { type: '${v.type}', description: '${escapeStr(v.description || k)}' }`)
        .join(',\n')

      const requiredStr = required.length > 0 ? `\n        required: [${required.map((r) => `'${r}'`).join(', ')}],` : ''

      return `  {
    name: '${toolName}',
    description: '${escapeStr(ep.description)}',
    inputSchema: {
      type: 'object',
      properties: {
${propsStr}
      },${requiredStr}
    },
  }`
    })
    .join(',\n')

  // Generate handler cases
  const handlerCases = toolDefs
    .map(({ toolName, ep }) => {
      const hasPathParams = /\{[^}]+\}/.test(ep.path)
      const hasQueryParams = ep.params && ep.params.length > 0
      const hasBody = ep.body && Object.keys(ep.body).length > 0
      const method = ep.method.toUpperCase()

      let pathExpr: string
      if (hasPathParams) {
        const paramNames = (ep.path.match(/\{([^}]+)\}/g) || []).map((p) => p.replace(/[{}]/g, ''))
        let interpolated = ep.path
        for (const pn of paramNames) {
          interpolated = interpolated.replace(`{${pn}}`, `\${args.${pn}}`)
        }
        pathExpr = `\`\${API_BASE}${interpolated}\``
      } else {
        pathExpr = `\`\${API_BASE}${ep.path}\``
      }

      let queryBlock = ''
      if (hasQueryParams && ep.params) {
        const qpNames = ep.params.map((p) => p.name)
        queryBlock = `
        const queryParams = new URLSearchParams()
${qpNames.map((n) => `        if (args.${n} !== undefined) queryParams.set('${n}', String(args.${n}))`).join('\n')}
        const qs = queryParams.toString()
        const urlWithQuery = qs ? \`\${url}?\${qs}\` : url`
      }

      const fetchUrl = hasQueryParams ? 'urlWithQuery' : 'url'

      const fetchOpts: string[] = [`method: '${method}'`, 'headers']
      if (hasBody && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        const bodyFields = Object.keys(ep.body!)
        const bodyObj = bodyFields.map((f) => `${f}: args.${f}`).join(', ')
        fetchOpts.push(`body: JSON.stringify({ ${bodyObj} })`)
      }

      return `      case '${toolName}': {
        const url = ${pathExpr}${queryBlock}
        const resp = await fetch(${fetchUrl}, { ${fetchOpts.join(', ')} })
        const data = await resp.text()
        return { content: [{ type: 'text', text: data }] }
      }`
    })
    .join('\n')

  // Assemble the full generated file
  return `// Generated MCP Server for ${name}
// Deploy this at /api/mcp in your Next.js app
//
// Usage:
//   1. Save this file as src/app/api/mcp/route.ts
//   2. Set ${authType === 'bearer' ? 'BEARER_TOKEN' : 'API_KEY'} in your environment variables
//   3. Connect any MCP client to https://your-domain.com/api/mcp
//
// Protocol: JSON-RPC 2.0 (MCP standard)

import { NextRequest, NextResponse } from 'next/server'

const API_BASE = '${apiBase}'
const AUTH_HEADER = '${authHeader}'
const SERVER_NAME = '${escapeStr(name)}'
const SERVER_VERSION = '1.0.0'

// --- Tool Definitions ---

const tools = [
${toolsArray}
]

// --- JSON-RPC 2.0 Handler ---

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { jsonrpc, id, method, params } = body

    if (jsonrpc !== '2.0') {
      return jsonRpcError(id, -32600, 'Invalid Request: jsonrpc must be "2.0"')
    }

    switch (method) {
      case 'initialize':
        return jsonRpcSuccess(id, {
          protocolVersion: '2024-11-05',
          serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
          capabilities: { tools: {} },
        })

      case 'notifications/initialized':
        return jsonRpcSuccess(id, {})

      case 'tools/list':
        return jsonRpcSuccess(id, { tools })

      case 'tools/call': {
        const toolName = params?.name
        const args = params?.arguments || {}

        const tool = tools.find((t) => t.name === toolName)
        if (!tool) {
          return jsonRpcError(id, -32602, \`Unknown tool: \${toolName}\`)
        }

        const apiKey = process.env.${authType === 'bearer' ? 'BEARER_TOKEN' : 'API_KEY'} || ''
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          [AUTH_HEADER]: ${authType === 'bearer' ? '`Bearer ${apiKey}`' : 'apiKey'},
        }

        try {
          const result = await callTool(toolName, args, headers)
          return jsonRpcSuccess(id, result)
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Tool execution failed'
          return jsonRpcSuccess(id, {
            content: [{ type: 'text', text: \`Error: \${message}\` }],
            isError: true,
          })
        }
      }

      default:
        return jsonRpcError(id, -32601, \`Method not found: \${method}\`)
    }
  } catch (err) {
    console.error('[mcp-server] Parse error:', err)
    return jsonRpcError(null, -32700, 'Parse error')
  }
}

// --- Tool Router ---

async function callTool(
  name: string,
  args: Record<string, unknown>,
  headers: Record<string, string>
): Promise<{ content: { type: string; text: string }[] }> {
  switch (name) {
${handlerCases}
      default:
        throw new Error(\`Unknown tool: \${name}\`)
  }
}

// --- CORS ---

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

// --- Helpers ---

function jsonRpcSuccess(id: unknown, result: unknown) {
  return NextResponse.json(
    { jsonrpc: '2.0', id, result },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}

function jsonRpcError(id: unknown, code: number, message: string) {
  return NextResponse.json(
    { jsonrpc: '2.0', id, error: { code, message } },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}
`
}

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
}
