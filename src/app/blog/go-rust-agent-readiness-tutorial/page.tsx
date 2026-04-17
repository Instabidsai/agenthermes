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
  title: 'Building Agent-Ready APIs with Go and Rust: A Systems Developer\'s Guide | AgentHermes',
  description:
    'Step-by-step tutorial for Go and Rust developers. Copy-paste code patterns for OpenAPI, structured errors, health checks, agent-card.json, CORS, and auth middleware. Low latency and memory safety boost D7 and D8.',
  keywords: [
    'Go Rust agent ready API tutorial',
    'Go agent readiness',
    'Rust MCP server',
    'Golang agent ready API',
    'Actix-web agent readiness',
    'Axum agent API',
    'Go OpenAPI tutorial',
    'Rust structured errors',
    'systems language agent readiness',
  ],
  openGraph: {
    title: 'Building Agent-Ready APIs with Go and Rust: A Systems Developer\'s Guide',
    description:
      'Fourth in the framework tutorial series. Go and Rust patterns for agent-ready APIs with copy-paste code for OpenAPI, errors, health, auth, and agent-card.json.',
    url: 'https://agenthermes.ai/blog/go-rust-agent-readiness-tutorial',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Building Agent-Ready APIs with Go and Rust',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building Agent-Ready APIs with Go and Rust: A Systems Developer\'s Guide',
    description:
      'Go + Rust agent-ready API patterns. OpenAPI, structured errors, health checks, agent-card.json. Copy-paste code for both languages.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/go-rust-agent-readiness-tutorial',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const goPatterns = [
  {
    name: 'Structured Error Middleware',
    description: 'Wrap every handler with consistent JSON error responses. Agents parse error codes, not HTML error pages.',
    code: `type APIError struct {
  Error     string \`json:"error"\`
  Code      string \`json:"code"\`
  RequestID string \`json:"request_id"\`
}

func errorMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    defer func() {
      if err := recover(); err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(500)
        json.NewEncoder(w).Encode(APIError{
          Error: "Internal server error",
          Code:  "INTERNAL_ERROR",
          RequestID: r.Header.Get("X-Request-ID"),
        })
      }
    }()
    next.ServeHTTP(w, r)
  })
}`,
    boost: 'D2 API Quality +15',
    language: 'go',
  },
  {
    name: 'Health Check Endpoint',
    description: 'The /healthz convention is standard in Go services. Agents use this to verify uptime before sending requests.',
    code: `func healthHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(map[string]any{
    "status":  "healthy",
    "version": version,
    "uptime":  time.Since(startTime).String(),
  })
}

// Register: r.Get("/healthz", healthHandler)`,
    boost: 'D8 Reliability +20',
    language: 'go',
  },
  {
    name: 'OpenAPI with Swaggo',
    description: 'Use swaggo/swag to generate OpenAPI specs from Go doc comments. Agents auto-discover your endpoints.',
    code: `// @title        My Service API
// @version      1.0
// @description  Agent-ready API for my service
// @host         api.example.com
// @BasePath     /v1
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

// @Summary      List products
// @Description  Returns all products with pagination
// @Tags         products
// @Accept       json
// @Produce      json
// @Param        limit  query  int  false  "Limit"  default(20)
// @Param        offset query  int  false  "Offset" default(0)
// @Success      200  {array}   Product
// @Failure      400  {object}  APIError
// @Router       /products [get]
func listProducts(w http.ResponseWriter, r *http.Request) { }`,
    boost: 'D1 Discovery +25, D2 API Quality +20',
    language: 'go',
  },
  {
    name: 'Agent Card Serving',
    description: 'Serve agent-card.json at /.well-known/agent-card.json. This is how agents discover your service.',
    code: `func agentCardHandler(w http.ResponseWriter, r *http.Request) {
  card := map[string]any{
    "name":        "My Service",
    "description": "Agent-ready API for product management",
    "url":         "https://api.example.com",
    "version":     "1.0.0",
    "capabilities": map[string]any{
      "streaming":      false,
      "pushNotifications": false,
    },
    "skills": []map[string]any{
      {
        "id":   "product-search",
        "name": "Product Search",
        "description": "Search products by category, price, or keyword",
      },
    },
  }
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(card)
}

// r.Get("/.well-known/agent-card.json", agentCardHandler)`,
    boost: 'D9 Agent Experience +30',
    language: 'go',
  },
]

const rustPatterns = [
  {
    name: 'Custom Error Types with Axum',
    description: 'Type-safe error handling that automatically serializes to structured JSON. Rust\'s type system prevents unstructured errors.',
    code: `use axum::{response::IntoResponse, http::StatusCode, Json};
use serde::Serialize;

#[derive(Serialize)]
struct ApiError {
    error: String,
    code: String,
    request_id: String,
}

enum AppError {
    NotFound(String),
    BadRequest(String),
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        let (status, code, msg) = match self {
            AppError::NotFound(m) => (StatusCode::NOT_FOUND, "NOT_FOUND", m),
            AppError::BadRequest(m) => (StatusCode::BAD_REQUEST, "BAD_REQUEST", m),
            AppError::Internal(m) => (StatusCode::INTERNAL_SERVER_ERROR, "INTERNAL", m),
        };
        (status, Json(ApiError {
            error: msg, code: code.into(), request_id: String::new(),
        })).into_response()
    }
}`,
    boost: 'D2 API Quality +15',
    language: 'rust',
  },
  {
    name: 'Health Check with Axum',
    description: 'Simple health endpoint that agents check before every interaction. Include uptime and version.',
    code: `use std::time::Instant;
use axum::{Json, extract::State};
use serde_json::{json, Value};

struct AppState { start_time: Instant, version: String }

async fn health(State(state): State<AppState>) -> Json<Value> {
    Json(json!({
        "status": "healthy",
        "version": state.version,
        "uptime_secs": state.start_time.elapsed().as_secs(),
    }))
}

// Route: .route("/healthz", get(health))`,
    boost: 'D8 Reliability +20',
    language: 'rust',
  },
  {
    name: 'OpenAPI with utoipa',
    description: 'Derive OpenAPI schemas from Rust structs. Compile-time guarantees that your docs match your types.',
    code: `use utoipa::{OpenApi, ToSchema};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, ToSchema)]
struct Product {
    #[schema(example = "prod_123")]
    id: String,
    #[schema(example = "Diamond Ring")]
    name: String,
    #[schema(example = 2999.99)]
    price: f64,
}

#[utoipa::path(
    get, path = "/v1/products",
    responses(
        (status = 200, description = "List products", body = Vec<Product>),
        (status = 400, description = "Bad request", body = ApiError),
    ),
    params(
        ("limit" = Option<i32>, Query, description = "Max results"),
        ("offset" = Option<i32>, Query, description = "Skip results"),
    )
)]
async fn list_products() -> Json<Vec<Product>> { todo!() }

#[derive(OpenApi)]
#[openapi(paths(list_products), components(schemas(Product, ApiError)))]
struct ApiDoc;`,
    boost: 'D1 Discovery +25, D2 API Quality +20',
    language: 'rust',
  },
  {
    name: 'CORS and Auth Tower Middleware',
    description: 'Tower middleware layers handle cross-cutting concerns. Agent platforms need CORS headers to call your API from browsers.',
    code: `use tower_http::cors::{CorsLayer, Any};
use axum::{middleware, extract::Request, http::HeaderMap};

let cors = CorsLayer::new()
    .allow_origin(Any)
    .allow_methods(Any)
    .allow_headers(Any);

async fn auth_middleware(
    headers: HeaderMap,
    request: Request,
    next: middleware::Next,
) -> Result<impl IntoResponse, AppError> {
    let token = headers.get("authorization")
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.strip_prefix("Bearer "))
        .ok_or(AppError::BadRequest("Missing auth".into()))?;

    // Validate token...
    Ok(next.run(request).await)
}

// App: .layer(cors).layer(middleware::from_fn(auth_middleware))`,
    boost: 'D7 Security +15, D2 API Quality +10',
    language: 'rust',
  },
]

const systemsAdvantages = [
  {
    metric: 'Latency',
    goValue: 'Sub-millisecond handler execution',
    rustValue: 'Zero-cost abstractions, no GC pauses',
    dimension: 'D8 Reliability',
    boost: '+15-25 points',
  },
  {
    metric: 'Memory Safety',
    goValue: 'Garbage collected, no buffer overflows',
    rustValue: 'Compile-time ownership, zero runtime cost',
    dimension: 'D7 Security',
    boost: '+10-20 points',
  },
  {
    metric: 'Concurrency',
    goValue: 'Goroutines handle 100K+ concurrent agents',
    rustValue: 'Tokio async handles extreme concurrency',
    dimension: 'D8 Reliability',
    boost: '+10-15 points',
  },
  {
    metric: 'Binary Size',
    goValue: 'Single static binary, no runtime deps',
    rustValue: 'Single static binary, minimal footprint',
    dimension: 'D8 Reliability',
    boost: '+5-10 points',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Should I use Go or Rust for an agent-ready API?',
    answer:
      'Both are excellent choices. Go is simpler to learn and has faster development velocity — choose it when team productivity matters most. Rust offers stronger compile-time safety guarantees and better raw performance — choose it when your API serves high-frequency agent traffic or handles security-critical operations. Both score identically on agent readiness dimensions.',
  },
  {
    question: 'Do I need OpenAPI if I have an MCP server?',
    answer:
      'Yes. OpenAPI and MCP serve different purposes. OpenAPI documents your REST API so agents can discover and understand your endpoints. MCP provides a standardized protocol for agent interaction beyond REST. Having both maximizes your D1 Discovery and D9 Agent Experience scores. Many agents use OpenAPI for initial discovery and then connect via MCP for richer interactions.',
  },
  {
    question: 'Which Go router is best for agent readiness?',
    answer:
      'chi and gin both work well. chi is more idiomatic Go (net/http compatible) and composes middleware cleanly. gin has built-in Swagger support via gin-swagger. For agent readiness specifically, the router matters less than the patterns: structured errors, health endpoints, OpenAPI docs, and agent-card.json. Pick whichever your team knows.',
  },
  {
    question: 'How do I add an MCP server to a Go or Rust API?',
    answer:
      'For Go, the mcp-go library (github.com/mark3labs/mcp-go) provides a server implementation. For Rust, the mcp-rust-sdk crate is available. Both let you define tools, resources, and prompts alongside your existing REST API. Alternatively, AgentHermes can auto-generate a hosted MCP server from your OpenAPI spec — no code changes needed.',
  },
  {
    question: 'What is the minimum viable agent-ready Go or Rust API?',
    answer:
      'Five things: (1) A /healthz endpoint returning JSON status. (2) Structured error responses with error, code, and request_id fields. (3) An OpenAPI spec served at /openapi.json or /swagger.json. (4) An agent-card.json at /.well-known/agent-card.json. (5) CORS headers allowing agent platforms to call your API. This takes about 30 minutes to add and gets you from ARL-0 to ARL-2.',
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

export default function GoRustAgentReadinessTutorialPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Building Agent-Ready APIs with Go and Rust: A Systems Developer\'s Guide',
    description:
      'Step-by-step tutorial for Go and Rust developers building agent-ready APIs. Copy-paste code patterns for OpenAPI, structured errors, health checks, agent-card.json, and auth middleware.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/go-rust-agent-readiness-tutorial',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Tutorial',
    wordCount: 1900,
    keywords:
      'Go Rust agent ready API tutorial, Golang agent readiness, Rust MCP server, Axum agent API, Go OpenAPI',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Go and Rust Agent-Ready API Tutorial',
          item: 'https://agenthermes.ai/blog/go-rust-agent-readiness-tutorial',
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
      title="Building Agent-Ready APIs with Go and Rust: A Systems Developer's Guide"
      shareUrl="https://agenthermes.ai/blog/go-rust-agent-readiness-tutorial"
      currentHref="/blog/go-rust-agent-readiness-tutorial"
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
            <span className="text-zinc-400">Go and Rust Agent-Ready API Tutorial</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Terminal className="h-3.5 w-3.5" />
              Tutorial
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Systems Languages
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Part 4 of Series
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Building Agent-Ready APIs with{' '}
            <span className="text-emerald-400">Go and Rust</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The fourth in our framework tutorial series. Go and Rust are the <strong className="text-zinc-100">
            performance backbone</strong> of the agent economy — sub-millisecond latency, memory
            safety, and the ability to handle 100,000+ concurrent agent connections. Here are
            the copy-paste patterns that make your Go or Rust API agent-ready in 30 minutes.
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

      {/* ===== WHY SYSTEMS LANGUAGES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Why Go and Rust Excel at Agent-Ready APIs
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We have covered{' '}
              <Link href="/blog/nextjs-agent-readiness-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
                Next.js
              </Link>,{' '}
              <Link href="/blog/django-flask-agent-readiness-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
                Django and Flask
              </Link>, and{' '}
              <Link href="/blog/express-fastify-agent-readiness-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
                Express and Fastify
              </Link>{' '}
              in previous tutorials. Go and Rust bring something different to agent readiness: raw
              performance that directly boosts two of the highest-weighted scoring dimensions.
            </p>
            <p>
              D8 Reliability carries a 0.13 weight in the Agent Readiness Score — the second-highest
              single dimension. D7 Security carries 0.12. Systems languages inherently score higher on
              both because they produce services with predictable latency, no garbage collection pauses
              during agent requests, efficient memory usage under high concurrency, and compile-time
              safety guarantees that eliminate entire classes of vulnerabilities.
            </p>
            <p>
              If your API serves thousands of agents simultaneously — each making multiple tool calls
              per session — Go and Rust are where you want to be.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Metric</div>
              <div>Go</div>
              <div>Rust</div>
              <div>Score Impact</div>
            </div>
            {systemsAdvantages.map((row, i) => (
              <div
                key={row.metric}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.metric}</div>
                <div className="text-cyan-400 text-xs">{row.goValue}</div>
                <div className="text-purple-400 text-xs">{row.rustValue}</div>
                <div className="text-emerald-400 text-xs font-medium">{row.dimension}: {row.boost}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GO PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Hexagon className="h-5 w-5 text-cyan-500" />
            Go Patterns: net/http + chi
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Go&rsquo;s standard library is powerful enough for production APIs. Add chi for routing
            and swaggo for OpenAPI generation. Four patterns get you from zero to agent-ready.
          </p>

          <div className="space-y-6 mb-8">
            {goPatterns.map((pattern) => (
              <div
                key={pattern.name}
                className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                      {pattern.boost}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{pattern.description}</p>
                </div>
                <div className="border-t border-zinc-800/80 bg-zinc-950/50 p-4 overflow-x-auto">
                  <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre">
                    {pattern.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RUST PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-500" />
            Rust Patterns: Axum + Tower
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Axum is the leading Rust web framework, built on Tower middleware and Tokio async. utoipa
            generates OpenAPI schemas from Rust types — if your struct compiles, your docs are correct.
          </p>

          <div className="space-y-6 mb-8">
            {rustPatterns.map((pattern) => (
              <div
                key={pattern.name}
                className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                      {pattern.boost}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{pattern.description}</p>
                </div>
                <div className="border-t border-zinc-800/80 bg-zinc-950/50 p-4 overflow-x-auto">
                  <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre">
                    {pattern.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE CHECKLIST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            The Agent-Ready Checklist for Go and Rust
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Eight items. Implement all eight and your API moves from ARL-0 (Dark) to ARL-3 (Silver)
            or higher. Each maps to a specific scoring dimension.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              { item: 'Structured JSON error responses', dimension: 'D2 API Quality', done: 'error, code, request_id fields' },
              { item: '/healthz endpoint', dimension: 'D8 Reliability', done: 'Returns status, version, uptime' },
              { item: 'OpenAPI spec generation', dimension: 'D1 Discovery', done: 'swaggo (Go) or utoipa (Rust)' },
              { item: 'agent-card.json at /.well-known/', dimension: 'D9 Agent Experience', done: 'Name, capabilities, skills' },
              { item: 'CORS headers', dimension: 'D2 API Quality', done: 'Allow-Origin, Allow-Methods, Allow-Headers' },
              { item: 'Auth middleware (Bearer token)', dimension: 'D7 Security', done: 'Validates tokens, returns 401 JSON' },
              { item: 'Rate limiting middleware', dimension: 'D7 Security', done: 'Per-key limits, 429 with Retry-After' },
              { item: 'Request ID propagation', dimension: 'D2 API Quality', done: 'X-Request-ID header on every response' },
            ].map((check) => (
              <div key={check.item} className="flex gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-zinc-200">{check.item}</div>
                  <div className="text-xs text-zinc-500 mt-1">{check.dimension} — {check.done}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The total effort is approximately 30 minutes for a Go developer and 45 minutes for Rust
              (Rust&rsquo;s type system requires more boilerplate upfront, but catches more errors at
              compile time). Both languages start at a natural advantage on D7 and D8 — you are
              building on a foundation that is already 15-25 points ahead of interpreted languages on
              the performance and security dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Expected Score After Implementation
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Before', score: '5-15', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
              { label: 'After (minimal)', score: '55-65', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
              { label: 'After (full + MCP)', score: '75-85', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
            ].map((tier) => (
              <div key={tier.label} className={`p-5 rounded-xl ${tier.bg} border ${tier.border} text-center`}>
                <div className={`text-3xl font-bold ${tier.color} mb-1`}>{tier.score}</div>
                <div className="text-xs text-zinc-400">{tier.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              A bare Go or Rust API with no agent infrastructure scores 5-15. Add the eight checklist
              items and you jump to Silver (55-65). Add an MCP server with discoverable tools and you
              reach Gold (75-85). The systems language advantage means your D7 and D8 scores start
              higher than equivalent implementations in Node.js or Python.
            </p>
            <p>
              Run your current API through the{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes scanner
              </Link>{' '}
              to see your baseline, implement these patterns, then scan again to measure the improvement.
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">More Framework Tutorials</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Next.js Agent-Ready API Tutorial',
                href: '/blog/nextjs-agent-readiness-tutorial',
                tag: 'Tutorial',
                tagColor: 'cyan',
              },
              {
                title: 'Django and Flask Agent-Ready API Tutorial',
                href: '/blog/django-flask-agent-readiness-tutorial',
                tag: 'Tutorial',
                tagColor: 'cyan',
              },
              {
                title: 'Express and Fastify Agent-Ready API Tutorial',
                href: '/blog/express-fastify-agent-readiness-tutorial',
                tag: 'Tutorial',
                tagColor: 'cyan',
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
            Scan your Go or Rust API now
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score across all 9 dimensions. Then use these patterns to
            jump from Dark to Silver in 30 minutes.
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
