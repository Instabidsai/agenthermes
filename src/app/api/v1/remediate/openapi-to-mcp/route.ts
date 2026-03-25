import { NextRequest, NextResponse } from 'next/server'

interface OpenAPISpec {
  openapi?: string
  info?: { title?: string; description?: string; version?: string }
  servers?: { url: string }[]
  paths?: Record<string, Record<string, OpenAPIOperation>>
  components?: {
    securitySchemes?: Record<string, SecurityScheme>
    schemas?: Record<string, SchemaObj>
  }
  security?: Record<string, string[]>[]
}

interface OpenAPIOperation {
  operationId?: string
  summary?: string
  description?: string
  parameters?: OpenAPIParam[]
  requestBody?: {
    content?: Record<string, { schema?: SchemaObj }>
  }
}

interface OpenAPIParam {
  name: string
  in: string
  required?: boolean
  description?: string
  schema?: SchemaObj
}

interface SecurityScheme {
  type: string
  scheme?: string
  in?: string
  name?: string
}

interface SchemaObj {
  type?: string
  properties?: Record<string, SchemaObj>
  items?: SchemaObj
  required?: string[]
  $ref?: string
  description?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { spec } = body as { spec?: OpenAPISpec }

    if (!spec || typeof spec !== 'object') {
      return NextResponse.json({ error: 'spec object is required' }, { status: 400 })
    }

    if (!spec.paths || typeof spec.paths !== 'object' || Object.keys(spec.paths).length === 0) {
      return NextResponse.json({ error: 'spec must contain at least one path' }, { status: 400 })
    }

    const serverName = spec.info?.title || 'API Server'
    const serverVersion = spec.info?.version || '1.0.0'
    const apiBase = spec.servers?.[0]?.url || 'https://api.example.com'

    // Detect auth
    const { authType, authHeader } = detectAuth(spec)

    // Extract endpoints from paths
    const endpoints = extractEndpoints(spec)

    if (endpoints.length === 0) {
      return NextResponse.json({ error: 'No valid operations found in spec' }, { status: 400 })
    }

    const code = generateMcpServerFromOpenAPI({
      name: serverName,
      version: serverVersion,
      apiBase: apiBase.replace(/\/+$/, ''),
      endpoints,
      authType,
      authHeader,
    })

    return new NextResponse(code, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="mcp-server-${slugify(serverName)}.ts"`,
      },
    })
  } catch (err) {
    console.error('[remediate/openapi-to-mcp] Error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function detectAuth(spec: OpenAPISpec): { authType: string; authHeader: string } {
  const schemes = spec.components?.securitySchemes
  if (!schemes) return { authType: 'api_key', authHeader: 'Authorization' }

  for (const scheme of Object.values(schemes)) {
    if (scheme.type === 'http' && scheme.scheme === 'bearer') {
      return { authType: 'bearer', authHeader: 'Authorization' }
    }
    if (scheme.type === 'apiKey' && scheme.in === 'header' && scheme.name) {
      return { authType: 'api_key', authHeader: scheme.name }
    }
  }

  return { authType: 'api_key', authHeader: 'Authorization' }
}

interface ExtractedEndpoint {
  method: string
  path: string
  operationId: string
  description: string
  pathParams: { name: string; type: string; required: boolean; description: string }[]
  queryParams: { name: string; type: string; required: boolean; description: string }[]
  bodyProperties: { name: string; type: string; description: string }[]
}

function extractEndpoints(spec: OpenAPISpec): ExtractedEndpoint[] {
  const endpoints: ExtractedEndpoint[] = []
  const methods = ['get', 'post', 'put', 'patch', 'delete']

  for (const [path, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of methods) {
      const op = pathItem[method] as OpenAPIOperation | undefined
      if (!op) continue

      const operationId =
        op.operationId ||
        `${method}_${path.replace(/^\//, '').replace(/[^a-zA-Z0-9]+/g, '_')}`

      const description = op.summary || op.description || `${method.toUpperCase()} ${path}`

      const pathParams: ExtractedEndpoint['pathParams'] = []
      const queryParams: ExtractedEndpoint['queryParams'] = []

      if (op.parameters) {
        for (const param of op.parameters) {
          const paramType = mapSchemaType(param.schema)
          const entry = {
            name: param.name,
            type: paramType,
            required: param.required || false,
            description: param.description || param.name,
          }
          if (param.in === 'path') pathParams.push(entry)
          else if (param.in === 'query') queryParams.push(entry)
        }
      }

      const bodyProperties: ExtractedEndpoint['bodyProperties'] = []
      if (op.requestBody?.content) {
        const jsonContent = op.requestBody.content['application/json']
        if (jsonContent?.schema) {
          const schema = resolveSchema(jsonContent.schema, spec)
          if (schema.properties) {
            for (const [propName, propSchema] of Object.entries(schema.properties)) {
              bodyProperties.push({
                name: propName,
                type: mapSchemaType(propSchema),
                description: propSchema.description || propName,
              })
            }
          }
        }
      }

      endpoints.push({
        method: method.toUpperCase(),
        path,
        operationId: sanitizeToolName(operationId),
        description,
        pathParams,
        queryParams,
        bodyProperties,
      })
    }
  }

  return endpoints
}

function resolveSchema(schema: SchemaObj, spec: OpenAPISpec): SchemaObj {
  if (schema.$ref) {
    const refPath = schema.$ref.replace('#/components/schemas/', '')
    return spec.components?.schemas?.[refPath] || schema
  }
  return schema
}

function mapSchemaType(schema?: SchemaObj): string {
  if (!schema) return 'string'
  if (schema.type === 'integer') return 'number'
  if (schema.type === 'array') return 'string'
  return schema.type || 'string'
}

function sanitizeToolName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase()
}

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
}

function generateMcpServerFromOpenAPI(opts: {
  name: string
  version: string
  apiBase: string
  endpoints: ExtractedEndpoint[]
  authType: string
  authHeader: string
}): string {
  const { name, version, apiBase, endpoints, authType, authHeader } = opts

  // Generate tool definitions
  const toolsArray = endpoints
    .map((ep) => {
      const allProps: { name: string; type: string; description: string }[] = [
        ...ep.pathParams.map((p) => ({ name: p.name, type: p.type, description: p.description })),
        ...ep.queryParams.map((p) => ({ name: p.name, type: p.type, description: p.description })),
        ...ep.bodyProperties,
      ]

      const propsStr = allProps
        .map((p) => `          ${p.name}: { type: '${p.type}', description: '${escapeStr(p.description)}' }`)
        .join(',\n')

      const required = [
        ...ep.pathParams.filter((p) => p.required).map((p) => p.name),
        ...ep.queryParams.filter((p) => p.required).map((p) => p.name),
      ]

      const requiredStr = required.length > 0
        ? `\n        required: [${required.map((r) => `'${r}'`).join(', ')}],`
        : ''

      return `  {
    name: '${ep.operationId}',
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
  const handlerCases = endpoints
    .map((ep) => {
      const hasPathParams = ep.pathParams.length > 0
      const hasQueryParams = ep.queryParams.length > 0
      const hasBody = ep.bodyProperties.length > 0
      const method = ep.method

      let pathExpr: string
      if (hasPathParams) {
        let interpolated = ep.path
        for (const pp of ep.pathParams) {
          interpolated = interpolated.replace(`{${pp.name}}`, `\${args.${pp.name}}`)
        }
        pathExpr = `\`\${API_BASE}${interpolated}\``
      } else {
        pathExpr = `\`\${API_BASE}${ep.path}\``
      }

      let queryBlock = ''
      if (hasQueryParams) {
        queryBlock = `
        const queryParams = new URLSearchParams()
${ep.queryParams.map((p) => `        if (args.${p.name} !== undefined) queryParams.set('${p.name}', String(args.${p.name}))`).join('\n')}
        const qs = queryParams.toString()
        const urlWithQuery = qs ? \`\${url}?\${qs}\` : url`
      }

      const fetchUrl = hasQueryParams ? 'urlWithQuery' : 'url'

      const fetchOpts: string[] = [`method: '${method}'`, 'headers']
      if (hasBody && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        const bodyObj = ep.bodyProperties.map((p) => `${p.name}: args.${p.name}`).join(', ')
        fetchOpts.push(`body: JSON.stringify({ ${bodyObj} })`)
      }

      return `      case '${ep.operationId}': {
        const url = ${pathExpr}${queryBlock}
        const resp = await fetch(${fetchUrl}, { ${fetchOpts.join(', ')} })
        const data = await resp.text()
        return { content: [{ type: 'text', text: data }] }
      }`
    })
    .join('\n')

  return `// Generated MCP Server from OpenAPI Spec: ${name}
// Deploy this at /api/mcp in your Next.js app
//
// Source spec: ${name} v${version}
// Generated: ${new Date().toISOString().split('T')[0]}
//
// Usage:
//   1. Save this file as src/app/api/mcp/route.ts
//   2. Set ${authType === 'bearer' ? 'BEARER_TOKEN' : 'API_KEY'} in your environment variables
//   3. Connect any MCP client to https://your-domain.com/api/mcp

import { NextRequest, NextResponse } from 'next/server'

const API_BASE = '${apiBase}'
const AUTH_HEADER = '${authHeader}'
const SERVER_NAME = '${escapeStr(name)}'
const SERVER_VERSION = '${escapeStr(version)}'

// --- Tool Definitions (${endpoints.length} tools from OpenAPI spec) ---

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
