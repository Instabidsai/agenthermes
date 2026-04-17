import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileJson,
  Globe,
  HelpCircle,
  Key,
  Layers,
  Server,
  Shield,
  Terminal,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Building Agent-Ready APIs with Next.js: A Developer\'s Guide | AgentHermes',
  description:
    'Framework-specific tutorial for adding agent readiness to any Next.js app. Copy-paste code for JSON errors, OpenAPI spec, /health endpoint, agent-card.json, llms.txt, Schema.org JSON-LD, CORS middleware, and Bearer auth.',
  keywords: [
    'Next.js agent ready API tutorial',
    'Next.js agent readiness',
    'Next.js OpenAPI spec',
    'Next.js agent-card.json',
    'Next.js llms.txt',
    'Next.js health endpoint',
    'Next.js CORS middleware',
    'Next.js Bearer auth',
    'agent-ready Next.js',
  ],
  openGraph: {
    title: 'Building Agent-Ready APIs with Next.js: A Developer\'s Guide',
    description:
      'Copy-paste code for 8 agent readiness features in Next.js. JSON errors, OpenAPI, /health, agent-card.json, llms.txt, JSON-LD, CORS, and Bearer auth.',
    url: 'https://agenthermes.ai/blog/nextjs-agent-readiness-tutorial',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Building Agent-Ready APIs with Next.js',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building Agent-Ready APIs with Next.js',
    description:
      'Copy-paste code for 8 agent readiness features in any Next.js app. From /health endpoints to MCP-ready agent cards.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/nextjs-agent-readiness-tutorial',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tutorialSteps = [
  {
    step: '1',
    title: 'JSON Error Responses in API Routes',
    description:
      'Replace Next.js default error pages with structured JSON for every API route. A global error handler in middleware catches unhandled errors and returns { error, code, message, request_id }. Agents parse this reliably; they cannot parse HTML error pages.',
    code: `// app/api/example/route.ts
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function GET(request: Request) {
  try {
    // Your logic here
    const data = { items: [] }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      {
        error: 'internal_error',
        message: 'An unexpected error occurred',
        code: 500,
        request_id: randomUUID(),
      },
      { status: 500 }
    )
  }
}`,
    impact: 'D2 API Quality (15%) + D6 Data Quality (10%)',
    icon: Terminal,
    color: 'purple',
  },
  {
    step: '2',
    title: 'OpenAPI Spec Generation',
    description:
      'Use next-swagger-doc or a manual OpenAPI JSON file at /api/openapi. Agents discover your endpoints, understand parameter types, and auto-generate client libraries. This is the single highest-impact file for agent readiness.',
    code: `// app/api/openapi/route.ts
import { NextResponse } from 'next/server'

const spec = {
  openapi: '3.0.3',
  info: {
    title: 'My App API',
    version: '1.0.0',
    description: 'Agent-ready API for My App',
  },
  servers: [{ url: 'https://myapp.com' }],
  paths: {
    '/api/products': {
      get: {
        summary: 'List all products',
        operationId: 'listProducts',
        responses: {
          '200': {
            description: 'Product list',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Product' },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'number' },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
}

export async function GET() {
  return NextResponse.json(spec)
}`,
    impact: 'D1 Discovery (12%) + D2 API Quality (15%)',
    icon: FileJson,
    color: 'blue',
  },
  {
    step: '3',
    title: '/health Endpoint',
    description:
      'A lightweight endpoint that returns service health status. Agents check this before delegating work to your API. Include version, timestamp, and dependency status checks for databases and external services.',
    code: `// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: 'ok',
      cache: 'ok',
    },
  })
}`,
    impact: 'D8 Reliability (13%)',
    icon: Zap,
    color: 'emerald',
  },
  {
    step: '4',
    title: 'agent-card.json in /public/.well-known/',
    description:
      'Create a static JSON file at public/.well-known/agent-card.json. This follows the emerging agent card standard and tells AI agents who you are, what protocols you support, and where to find your API. Next.js serves files from /public at the root path automatically.',
    code: `// public/.well-known/agent-card.json
{
  "name": "My App",
  "description": "A brief description of what your app does",
  "url": "https://myapp.com",
  "version": "1.0.0",
  "capabilities": {
    "mcp": {
      "endpoint": "https://myapp.com/api/mcp",
      "transport": "sse"
    },
    "rest": {
      "openapi": "https://myapp.com/api/openapi"
    }
  },
  "authentication": {
    "type": "bearer",
    "token_url": "https://myapp.com/api/auth/token"
  },
  "contact": {
    "email": "api@myapp.com",
    "docs": "https://docs.myapp.com"
  }
}`,
    impact: 'D9 Agent Experience (10%)',
    icon: Globe,
    color: 'emerald',
  },
  {
    step: '5',
    title: 'llms.txt as a Route Handler',
    description:
      'Serve a plain-text file at /llms.txt that describes your product for AI models. Unlike agent-card.json (which is structured metadata), llms.txt is natural language that helps models understand what your service does, what it is good at, and how to use it.',
    code: `// app/llms.txt/route.ts
export async function GET() {
  const content = \`# My App

## What This Service Does
My App is a [description]. It helps users [value proposition].

## API Access
- Base URL: https://myapp.com/api
- Authentication: Bearer token in Authorization header
- OpenAPI spec: https://myapp.com/api/openapi
- Rate limit: 100 requests per minute

## Key Endpoints
- GET /api/products - List all products with pagination
- GET /api/products/:id - Get product details
- POST /api/orders - Create a new order
- GET /api/availability - Check service availability

## Common Use Cases
1. Search for products by category or keyword
2. Check real-time availability for a date
3. Create an order with items and payment
4. Get order status and tracking

## Error Handling
All errors return JSON: { error, message, code, request_id }
Retry on 429 (rate limit) with Retry-After header value.
\`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}`,
    impact: 'D9 Agent Experience (10%)',
    icon: Server,
    color: 'blue',
  },
  {
    step: '6',
    title: 'Schema.org JSON-LD in layout.tsx',
    description:
      'Add structured data to your root layout so AI crawlers and agents understand your business type, offerings, and contact information. JSON-LD is the preferred format because it is separate from DOM rendering and easy for agents to parse.',
    code: `// app/layout.tsx (add inside <head> or <body>)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'My App',
  description: 'Description of your service',
  url: 'https://myapp.com',
  applicationCategory: 'BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier available',
  },
  author: {
    '@type': 'Organization',
    name: 'My Company',
    url: 'https://myapp.com',
  },
}

// In your layout JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>`,
    impact: 'D6 Data Quality (10%)',
    icon: Code2,
    color: 'purple',
  },
  {
    step: '7',
    title: 'CORS Middleware for Agent Access',
    description:
      'AI agents call your API from various origins. Without proper CORS headers, browser-based agents get blocked. Next.js middleware can add CORS headers globally to all API routes. Also add X-Request-ID for traceability.',
    code: `// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { randomUUID } from 'crypto'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const requestId = randomUUID()

  // CORS headers for agent access
  response.headers.set(
    'Access-Control-Allow-Origin', '*'
  )
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Request-ID'
  )

  // Request tracing
  response.headers.set('X-Request-ID', requestId)

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    })
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}`,
    impact: 'D7 Security (12%) + D2 API Quality (15%)',
    icon: Shield,
    color: 'amber',
  },
  {
    step: '8',
    title: 'Bearer Auth Middleware',
    description:
      'A reusable auth function that validates Bearer tokens and returns structured JSON errors. Session cookies do not work for agents — they need stateless Bearer authentication. This middleware can wrap any protected route handler.',
    code: `// lib/auth.ts
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export function requireAuth(request: Request) {
  const auth = request.headers.get('Authorization')

  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        error: 'unauthorized',
        message: 'Missing or invalid Bearer token',
        code: 401,
        request_id: randomUUID(),
      },
      { status: 401 }
    )
  }

  const token = auth.slice(7)
  // Validate token (JWT verify, DB lookup, etc.)
  // Return null if valid, error response if invalid
  return null // token is valid
}

// Usage in a route handler:
// app/api/orders/route.ts
import { requireAuth } from '@/lib/auth'

export async function POST(request: Request) {
  const authError = requireAuth(request)
  if (authError) return authError

  // Authenticated logic here
  return NextResponse.json({ success: true })
}`,
    impact: 'D7 Security (12%)',
    icon: Key,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do I need to install any special packages for these features?',
    answer:
      'No. Every code example uses only Next.js built-in APIs (NextResponse, middleware) and Node.js standard library (crypto.randomUUID). The OpenAPI spec is a static JSON object. The agent-card.json is a static file. Zero dependencies added. If you want auto-generated OpenAPI from route handlers, next-swagger-doc or @ts-rest/open-api are optional enhancements.',
  },
  {
    question: 'Does this work with both App Router and Pages Router?',
    answer:
      'All examples use App Router (app/ directory) which is the recommended approach for Next.js 14+. For Pages Router: API routes go in pages/api/ instead of app/api/, middleware works the same way, and static files still go in public/. The patterns are identical — only the file locations change.',
  },
  {
    question: 'How do I test that my Next.js app is agent-ready?',
    answer:
      'Run your app locally and test with curl. curl http://localhost:3000/api/health should return JSON. curl http://localhost:3000/.well-known/agent-card.json should return your agent card. curl http://localhost:3000/llms.txt should return plain text. curl http://localhost:3000/api/openapi should return your OpenAPI spec. Then scan your deployed URL at agenthermes.ai/audit for the full 9-dimension score.',
  },
  {
    question: 'What Agent Readiness Score can I expect after implementing all 8 steps?',
    answer:
      'These 8 steps target 87% of the AgentHermes scoring dimensions. A Next.js app deployed on Vercel with all 8 implemented typically scores 60-70 (Silver tier). Vercel adds free TLS, HTTP/2, edge CDN, and good uptime — all of which boost D7 Security and D8 Reliability automatically. Adding an MCP server pushes you into Gold (75+) territory.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function NextjsAgentReadinessTutorialPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Building Agent-Ready APIs with Next.js: A Developer\'s Guide',
    description:
      'Framework-specific tutorial with copy-paste code for adding agent readiness features to any Next.js application. Covers JSON errors, OpenAPI, health endpoints, agent cards, llms.txt, JSON-LD, CORS, and Bearer auth.',
    datePublished: '2026-04-15',
    dateModified: '2026-04-15',
    author: {
      '@type': 'Organization',
      name: 'AgentHermes Research',
      url: 'https://agenthermes.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    mainEntityOfPage: 'https://agenthermes.ai/blog/nextjs-agent-readiness-tutorial',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Developer Tutorial',
    wordCount: 1900,
    keywords:
      'Next.js agent ready API tutorial, Next.js OpenAPI, Next.js agent-card.json, Next.js llms.txt, agent-ready Next.js',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Next.js Agent Readiness Tutorial',
          item: 'https://agenthermes.ai/blog/nextjs-agent-readiness-tutorial',
        },
      ],
    },
    proficiencyLevel: 'Intermediate',
    dependencies: 'Next.js 14+, Node.js 18+',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <BlogArticleWrapper
      title="Building Agent-Ready APIs with Next.js: A Developer's Guide"
      shareUrl="https://agenthermes.ai/blog/nextjs-agent-readiness-tutorial"
      currentHref="/blog/nextjs-agent-readiness-tutorial"
    >
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Next.js Agent Readiness Tutorial</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Terminal className="h-3.5 w-3.5" />
              Developer Tutorial
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Next.js
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Building Agent-Ready APIs with Next.js:{' '}
            <span className="text-emerald-400">A Developer&#39;s Guide</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Eight copy-paste code blocks that make any Next.js application agent-ready. JSON errors,
            OpenAPI spec, health endpoint, agent-card.json, llms.txt, Schema.org JSON-LD, CORS
            middleware, and Bearer auth. Zero extra dependencies. Works with App Router out of the box.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  April 15, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  15 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY NEXT.JS DEVELOPERS SHOULD CARE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Why Next.js Developers Have an Advantage
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Next.js is already halfway to agent-ready by default. App Router gives you file-based
              API routes that return JSON. Vercel deployment gives you TLS, HTTP/2, edge CDN, and
              good uptime — all of which contribute to the D7 Security and D8 Reliability dimensions.
              The static file serving from <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/public</code> means
              agent-card.json is a file drop, not a route handler.
            </p>
            <p>
              But &ldquo;halfway&rdquo; is still only 35-45 points on the Agent Readiness Score.
              The missing pieces — structured error handling, OpenAPI documentation, discovery files,
              and proper auth middleware — are what separate Bronze (under 60) from Silver (60+).
              This tutorial adds those missing pieces with copy-paste code that works in any Next.js
              14+ project.
            </p>
            <p>
              AgentHermes is built on Next.js. Every pattern in this tutorial is battle-tested in our
              own codebase. These are not theoretical recommendations — they are the exact patterns
              that helped us score Silver on our own scanner.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '8', label: 'code blocks to copy', color: 'text-emerald-400' },
              { value: '0', label: 'extra dependencies', color: 'text-blue-400' },
              { value: '60+', label: 'projected score', color: 'text-amber-400' },
              { value: '87%', label: 'dimensions covered', color: 'text-purple-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE 8 CODE BLOCKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            The 8 Code Blocks
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Each block is a complete, working file. Drop it into your Next.js project and the feature
            is live. File paths are shown in the code comments.
          </p>

          <div className="space-y-6">
            {tutorialSteps.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.step}
                  id={`step-${item.step}`}
                  className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-5 border-b border-zinc-800/50">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-zinc-800 text-xs font-bold text-zinc-400">
                            {item.step}
                          </span>
                          <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-2">{item.description}</p>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                          {item.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Code */}
                  <div className="p-5 bg-zinc-950/50 overflow-x-auto">
                    <pre className="text-sm text-zinc-300 leading-relaxed font-mono whitespace-pre">
                      <code>{item.code}</code>
                    </pre>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTING CHECKLIST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Test Your Implementation
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Run these curl commands against your local dev server to verify all 8 features are working.
            Every command should return JSON (not HTML).
          </p>

          <div className="rounded-xl bg-zinc-950/50 border border-zinc-800/80 p-5 overflow-x-auto mb-8">
            <pre className="text-sm text-zinc-300 leading-loose font-mono whitespace-pre">{`# 1. Health endpoint
curl http://localhost:3000/api/health

# 2. OpenAPI spec
curl http://localhost:3000/api/openapi

# 3. Agent card
curl http://localhost:3000/.well-known/agent-card.json

# 4. llms.txt
curl http://localhost:3000/llms.txt

# 5. JSON error (hit a nonexistent API route)
curl http://localhost:3000/api/nonexistent

# 6. CORS headers
curl -I -X OPTIONS http://localhost:3000/api/health

# 7. Auth rejection (no token)
curl http://localhost:3000/api/orders

# 8. Auth with token
curl -H "Authorization: Bearer test_token" \\
  http://localhost:3000/api/orders`}</pre>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">After passing local tests:</strong> Deploy to Vercel
              and scan your production URL at{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                agenthermes.ai/audit
              </Link>. Vercel adds TLS, HTTP/2, and edge CDN automatically — expect your production
              score to be 5-10 points higher than the patterns alone due to infrastructure bonuses.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-emerald-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="text-base font-bold text-zinc-100 mb-3">{faq.question}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED ARTICLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'How to Build an MCP Server: Step-by-Step Tutorial',
                href: '/blog/build-mcp-server-tutorial',
                tag: 'Tutorial',
                tagColor: 'purple',
              },
              {
                title: 'The Definitive Guide to Structured Error Responses',
                href: '/blog/structured-errors-guide',
                tag: 'Technical Guide',
                tagColor: 'purple',
              },
              {
                title: 'The Complete Agent-Ready Business Checklist',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
                tagColor: 'emerald',
              },
            ].map((article) => {
              const colors = getColorClasses(article.tagColor)
              return (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}>
                    {article.tag}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Scan your Next.js app in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Deploy your changes, then scan your production URL. See your Agent Readiness Score
            across all 9 dimensions and verify that the 8 code blocks are working.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Connect My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
