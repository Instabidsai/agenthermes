import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileJson,
  Globe,
  HelpCircle,
  Hexagon,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  Terminal,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Building Agent-Ready APIs with Express and Fastify: A Node.js Developer\'s Guide | AgentHermes',
  description:
    'Step-by-step tutorial for Express and Fastify developers. 8 code patterns that take your Node.js API from invisible to agent-ready: OpenAPI, structured errors, health checks, agent-card.json, rate limiting, and auth.',
  keywords: [
    'Express Fastify agent ready API Node.js',
    'Express agent readiness',
    'Fastify MCP server',
    'Node.js agent ready API',
    'Express OpenAPI tutorial',
    'Fastify swagger agent',
    'agent readiness Node.js',
    'Express structured errors',
    'Fastify health check',
  ],
  openGraph: {
    title: 'Building Agent-Ready APIs with Express and Fastify: A Node.js Developer\'s Guide',
    description:
      '8 code patterns for Express and Fastify that lift your Agent Readiness Score from under 20 to Silver (60+) or Gold (75+). Copy-paste examples included.',
    url: 'https://agenthermes.ai/blog/express-fastify-agent-readiness-tutorial',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Building Agent-Ready APIs with Express and Fastify: A Node.js Developer\'s Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building Agent-Ready APIs with Express and Fastify: A Node.js Developer\'s Guide',
    description:
      '8 code patterns for Express and Fastify. OpenAPI, structured errors, health checks, agent-card, rate limits. Score Silver in an afternoon.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/express-fastify-agent-readiness-tutorial',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const expressPatterns = [
  {
    name: '1. OpenAPI via swagger-jsdoc + swagger-ui-express',
    description: 'Auto-generate an OpenAPI 3.0 spec from JSDoc comments on your routes. This is the single highest-value change — agents use OpenAPI to discover what your API can do. Covers D1 Discovery and D2 API Quality.',
    code: `// npm install swagger-jsdoc swagger-ui-express
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const spec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'My API', version: '1.0.0' },
    servers: [{ url: 'https://api.example.com' }],
  },
  apis: ['./routes/*.js'],
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
app.get('/openapi.json', (req, res) => res.json(spec));`,
    impact: '+12 points (D1 +6, D2 +6)',
    icon: FileJson,
    color: 'emerald',
  },
  {
    name: '2. Structured Error Middleware',
    description: 'Replace Express default HTML error pages with JSON. Every error returns { error, code, request_id }. Agents need machine-readable errors to retry intelligently. Covers D2, D8, and D9.',
    code: `const { v4: uuidv4 } = require('uuid');

// Attach request ID to every request
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
});

// Structured error handler (must be last middleware)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
    code: err.code || 'INTERNAL_ERROR',
    request_id: req.id,
    ...(status === 422 && err.details
      ? { details: err.details }
      : {}),
  });
});`,
    impact: '+10 points (D2 +3, D8 +4, D9 +3)',
    icon: Shield,
    color: 'red',
  },
  {
    name: '3. /health Endpoint',
    description: 'A simple GET /health that returns { status: "ok", timestamp, version }. Agents check this before making real requests. Monitoring services use it. Covers D8 Reliability.',
    code: `app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
  });
});`,
    impact: '+5 points (D8 +5)',
    icon: CheckCircle2,
    color: 'emerald',
  },
  {
    name: '4. Static agent-card.json',
    description: 'Serve a JSON file at /.well-known/agent-card.json that describes your API to agents. Name, description, capabilities, auth requirements, endpoint URL. This is how agents discover you. Covers D1 and D9.',
    code: `const agentCard = {
  name: 'My Business API',
  description: 'API for product catalog and ordering',
  url: 'https://api.example.com',
  version: '1.0.0',
  capabilities: {
    tools: ['search_products', 'get_pricing', 'create_order'],
    auth: { type: 'bearer', header: 'Authorization' },
    docs: 'https://api.example.com/docs',
    openapi: 'https://api.example.com/openapi.json',
  },
};

app.get('/.well-known/agent-card.json', (req, res) => {
  res.json(agentCard);
});`,
    impact: '+8 points (D1 +5, D9 +3)',
    icon: Bot,
    color: 'blue',
  },
  {
    name: '5. swagger-jsdoc Route Annotations',
    description: 'Annotate each route handler with JSDoc that swagger-jsdoc converts to OpenAPI operations. Describe parameters, request bodies, responses, and error codes. Agents read these to understand each endpoint.',
    code: `/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
app.get('/products/:id', async (req, res) => {
  const product = await db.getProduct(req.params.id);
  if (!product) {
    return res.status(404).json({
      error: 'Product not found',
      code: 'NOT_FOUND',
      request_id: req.id,
    });
  }
  res.json(product);
});`,
    impact: '+6 points (D2 +4, D6 +2)',
    icon: Code2,
    color: 'purple',
  },
  {
    name: '6. Security Headers with Helmet',
    description: 'One line of code adds Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, and more. Agents and scanners check these headers. Covers D7 Security.',
    code: `const helmet = require('helmet');

// Add security headers to all responses
app.use(helmet());

// If you serve an OpenAPI spec or agent card,
// allow framing from your docs domain:
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: ["'self'", 'https://docs.example.com'],
    },
  },
}));`,
    impact: '+5 points (D7 +5)',
    icon: Lock,
    color: 'amber',
  },
  {
    name: '7. Rate Limiting with X-RateLimit Headers',
    description: 'Use express-rate-limit and expose X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset headers. Agents use these to throttle requests and avoid 429 errors. Covers D8 and D9.',
    code: `const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true, // X-RateLimit-* headers
  legacyHeaders: false,
  message: {
    error: 'Rate limit exceeded',
    code: 'RATE_LIMITED',
    retry_after: 60,
  },
});

app.use('/api/', limiter);`,
    impact: '+6 points (D8 +3, D9 +3)',
    icon: Timer,
    color: 'cyan',
  },
  {
    name: '8. Bearer Auth with Passport',
    description: 'Use passport-http-bearer for token auth. Agents send Authorization: Bearer <token> and get structured 401 responses if invalid. Covers D7 Security and D3 Onboarding.',
    code: `const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

passport.use(new BearerStrategy(async (token, done) => {
  const user = await db.findByToken(token);
  if (!user) return done(null, false);
  return done(null, user);
}));

// Protected route
app.get('/api/orders',
  passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    const orders = await db.getOrders(req.user.id);
    res.json({ data: orders, total: orders.length });
  }
);`,
    impact: '+6 points (D7 +4, D3 +2)',
    icon: Lock,
    color: 'purple',
  },
]

const fastifyPatterns = [
  {
    name: '@fastify/swagger',
    description: 'Fastify generates OpenAPI specs from route schemas automatically. No JSDoc comments needed — the schema you already write for validation becomes your API documentation.',
    code: `await fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: { title: 'My API', version: '1.0.0' },
    servers: [{ url: 'https://api.example.com' }],
  },
});
await fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
});`,
    icon: FileJson,
    color: 'emerald',
  },
  {
    name: 'Custom Error Handler Plugin',
    description: 'Fastify error handlers get the request object. Return structured JSON with request_id, error code, and field-level validation details from Ajv.',
    code: `fastify.setErrorHandler((error, request, reply) => {
  const status = error.statusCode || 500;
  reply.status(status).send({
    error: error.message,
    code: error.code || 'INTERNAL_ERROR',
    request_id: request.id, // Fastify auto-generates
    ...(error.validation
      ? { details: error.validation }
      : {}),
  });
});`,
    icon: Shield,
    color: 'red',
  },
  {
    name: 'Built-in Health Check',
    description: 'Fastify has no built-in health route, but adding one takes 5 lines. Combine with @fastify/under-pressure for memory and event loop monitoring.',
    code: `await fastify.register(require('@fastify/under-pressure'), {
  maxEventLoopDelay: 1000,
  maxHeapUsedBytes: 200 * 1024 * 1024,
  exposeStatusRoute: '/health',
});`,
    icon: CheckCircle2,
    color: 'emerald',
  },
  {
    name: 'Schema Validation = Documentation',
    description: 'Fastify validates request/response with JSON Schema. The same schemas power OpenAPI docs. Write once, get validation + documentation + agent-readable specs.',
    code: `fastify.get('/products/:id', {
  schema: {
    params: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'number' },
        },
      },
    },
  },
}, async (req) => {
  return db.getProduct(req.params.id);
});`,
    icon: Code2,
    color: 'blue',
  },
]

const scoringImpact = [
  { pattern: 'OpenAPI spec (swagger-jsdoc or @fastify/swagger)', points: '+12', dimensions: 'D1, D2' },
  { pattern: 'Structured JSON errors with request_id', points: '+10', dimensions: 'D2, D8, D9' },
  { pattern: 'agent-card.json at /.well-known/', points: '+8', dimensions: 'D1, D9' },
  { pattern: 'Rate limit headers (X-RateLimit-*)', points: '+6', dimensions: 'D8, D9' },
  { pattern: 'Bearer auth with 401 JSON responses', points: '+6', dimensions: 'D7, D3' },
  { pattern: 'Security headers (Helmet / @fastify/helmet)', points: '+5', dimensions: 'D7' },
  { pattern: '/health endpoint', points: '+5', dimensions: 'D8' },
  { pattern: 'llms.txt at /llms.txt', points: '+4', dimensions: 'D1' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Should I use Express or Fastify for agent-ready APIs?',
    answer:
      'Both work. Fastify has an edge because its schema-first design means route validation and OpenAPI documentation come from the same source. Express requires swagger-jsdoc annotations as a separate step. For new projects, Fastify saves time. For existing Express apps, adding the 8 patterns described here is straightforward and does not require migration.',
  },
  {
    question: 'How much time does this take to implement?',
    answer:
      'For an existing Express or Fastify API, adding all 8 patterns takes 2-4 hours. The highest-value changes (OpenAPI spec, structured errors, agent-card.json) can be done in under an hour and cover 60% of the scoring impact. Health check and security headers take minutes each.',
  },
  {
    question: 'Do I need all 8 patterns to reach Silver?',
    answer:
      'No. OpenAPI + structured errors + agent-card.json + health check gets you to approximately 45-55 points (Bronze). Adding rate limit headers, auth, and security headers pushes past 60 into Silver. The patterns are additive — each one lifts your score independently.',
  },
  {
    question: 'What about llms.txt? How does that fit in?',
    answer:
      'llms.txt is a plain text file at /llms.txt that describes your API in natural language for LLMs. It complements OpenAPI (which is structured) with human-readable context. Adding it takes 10 minutes and adds approximately 4 points to D1 Discovery. See our llms.txt guide for the format.',
  },
  {
    question: 'How does this compare to the Next.js and Django/Flask tutorials?',
    answer:
      'Same scoring principles, different framework patterns. Next.js uses route handlers and middleware. Django/Flask use DRF and flask-smorest. Express/Fastify use their own middleware and plugin ecosystems. The 9 scoring dimensions do not care about your framework — they measure what agents see when they interact with your API.',
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

export default function ExpressFastifyAgentReadinessTutorialPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Building Agent-Ready APIs with Express and Fastify: A Node.js Developer\'s Guide',
    description:
      '8 code patterns for Express and Fastify that take your Node.js API from invisible to agent-ready. OpenAPI, structured errors, health checks, agent-card.json, rate limiting, and auth.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/express-fastify-agent-readiness-tutorial',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Developer Tutorial',
    wordCount: 1900,
    keywords:
      'Express Fastify agent ready API Node.js, Express OpenAPI, Fastify swagger, agent readiness tutorial, Node.js MCP',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Express & Fastify Agent-Ready Tutorial',
          item: 'https://agenthermes.ai/blog/express-fastify-agent-readiness-tutorial',
        },
      ],
    },
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
      title="Building Agent-Ready APIs with Express and Fastify: A Node.js Developer's Guide"
      shareUrl="https://agenthermes.ai/blog/express-fastify-agent-readiness-tutorial"
      currentHref="/blog/express-fastify-agent-readiness-tutorial"
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
            <span className="text-zinc-400">Express &amp; Fastify Tutorial</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Hexagon className="h-3.5 w-3.5" />
              Developer Tutorial
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Node.js
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Building Agent-Ready APIs with{' '}
            <span className="text-emerald-400">Express and Fastify</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The third framework tutorial in our series (after{' '}
            <Link href="/blog/nextjs-agent-readiness-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">Next.js</Link>{' '}
            and{' '}
            <Link href="/blog/django-flask-agent-readiness-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">Django/Flask</Link>).
            Eight code patterns for Express and four for Fastify that take a typical Node.js API from
            a score of <strong className="text-zinc-100">10-20 out of 100</strong> to{' '}
            <strong className="text-zinc-100">Silver (60+) or Gold (75+)</strong>. Every pattern includes
            copy-paste code and its scoring impact.
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
                  14 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY NODE.JS APIS SCORE LOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Why Most Node.js APIs Score Under 20
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Express is the most popular Node.js framework with over 30 million weekly npm downloads.
              Fastify is the fastest-growing alternative at 4 million weekly downloads. Together they
              power the majority of Node.js APIs on the internet. Yet most score under 20 on agent readiness.
            </p>
            <p>
              The reason is not technical limitation — both frameworks are fully capable of serving agent-ready
              APIs. The problem is that the default Express/Fastify setup produces an API that is invisible
              to agents: no OpenAPI spec, HTML error pages, no discovery files, no rate limit headers, and
              no health endpoint.
            </p>
            <p>
              The good news: fixing this requires no architecture changes. You add middleware, plugins, and
              a few static routes. An afternoon of work covers 80% of the{' '}
              <Link href="/blog/what-is-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Score
              </Link>{' '}
              weight.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '30M+', label: 'Express weekly downloads', icon: Terminal },
              { value: '~18', label: 'avg Express API score', icon: BarChart3 },
              { value: '4M+', label: 'Fastify weekly downloads', icon: Zap },
              { value: '60+', label: 'target Silver score', icon: Target },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPRESS PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            8 Express Patterns for Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Each pattern below includes the npm packages needed, copy-paste code, and the exact scoring
              impact across our{' '}
              <Link href="/blog/scoring-caps-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                9 scoring dimensions
              </Link>. Implement them in order — the first three cover 60% of the total impact.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {expressPatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>{pattern.impact}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{pattern.description}</p>
                  <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/50 overflow-x-auto">
                    <pre className="text-xs text-zinc-300 leading-relaxed">
                      <code>{pattern.code}</code>
                    </pre>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FASTIFY EQUIVALENTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Fastify Equivalents: Schema-First Advantage
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Fastify has a structural advantage for agent readiness: its schema-first approach means
              route validation and OpenAPI documentation come from the same source. You define a JSON
              Schema for each route, and Fastify uses it for both request validation and spec generation.
              This eliminates the gap between what your API accepts and what your docs describe.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {fastifyPatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{pattern.description}</p>
                  <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/50 overflow-x-auto">
                    <pre className="text-xs text-zinc-300 leading-relaxed">
                      <code>{pattern.code}</code>
                    </pre>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SCORING IMPACT TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Total Scoring Impact: From Under 20 to Silver or Gold
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here is the cumulative impact of each pattern. Implementing all eight takes a typical Express
            or Fastify API from 10-20 to 66-76 — solidly in{' '}
            <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline">
              Silver or Gold territory
            </Link>.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Pattern</div>
              <div>Points Added</div>
              <div>Dimensions</div>
            </div>
            {scoringImpact.map((row, i) => (
              <div
                key={row.pattern}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.pattern}</div>
                <div className="text-emerald-400 font-mono">{row.points}</div>
                <div className="text-zinc-500">{row.dimensions}</div>
              </div>
            ))}
            <div className="grid grid-cols-3 p-4 text-sm bg-emerald-500/5 border-t border-emerald-500/20">
              <div className="font-bold text-zinc-100">Total additional points</div>
              <div className="text-emerald-400 font-mono font-bold">+56</div>
              <div className="text-zinc-400">All 9 dimensions covered</div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Priority order:</strong> If you can only implement
              three patterns, choose OpenAPI spec (+12), structured errors (+10), and agent-card.json (+8).
              These three changes alone add 30 points and cover the highest-weighted scoring dimensions.
              The remaining five patterns are incremental improvements that push you from Bronze into
              Silver and Gold.
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
                title: 'Next.js Agent Readiness Tutorial',
                href: '/blog/nextjs-agent-readiness-tutorial',
                tag: 'Developer Tutorial',
                tagColor: 'purple',
              },
              {
                title: 'Django & Flask Agent Readiness Tutorial',
                href: '/blog/django-flask-agent-readiness-tutorial',
                tag: 'Developer Tutorial',
                tagColor: 'purple',
              },
              {
                title: 'Structured Error Responses Guide',
                href: '/blog/structured-errors-guide',
                tag: 'Technical Reference',
                tagColor: 'blue',
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
            See your API score before and after
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan on your Express or Fastify API. Implement the patterns
            above, then scan again to see the improvement.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Scan My API
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
