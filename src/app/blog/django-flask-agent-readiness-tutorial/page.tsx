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
  FlaskConical,
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
  title: 'Building Agent-Ready APIs with Django and Flask: A Python Developer\'s Guide | AgentHermes',
  description:
    'Framework-specific tutorial for adding agent readiness to Django and Flask apps. Copy-paste code for structured JSON errors, OpenAPI via drf-spectacular and flask-smorest, /health endpoints, agent-card.json, llms.txt, CORS, and Bearer token authentication.',
  keywords: [
    'Django Flask agent ready API Python',
    'Django agent readiness tutorial',
    'Flask agent readiness API',
    'Django REST Framework agent ready',
    'Python OpenAPI agent readiness',
    'drf-spectacular agent card',
    'flask-smorest agent API',
    'Python health endpoint',
    'agent-card.json Python',
  ],
  openGraph: {
    title: 'Building Agent-Ready APIs with Django and Flask: A Python Developer\'s Guide',
    description:
      'Copy-paste Python code for 8 agent readiness features in Django and Flask. JSON errors, OpenAPI, /health, agent-card.json, llms.txt, CORS, and Bearer auth.',
    url: 'https://agenthermes.ai/blog/django-flask-agent-readiness-tutorial',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Building Agent-Ready APIs with Django and Flask',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building Agent-Ready APIs with Django and Flask',
    description:
      'Copy-paste Python code for 8 agent readiness features. The companion to our Next.js tutorial, for Python developers.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/django-flask-agent-readiness-tutorial',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tutorialSteps = [
  {
    step: '1',
    title: 'Structured JSON Error Responses (Django REST Framework)',
    description:
      'Replace Django\'s default HTML error pages with structured JSON that agents can parse. DRF has a custom exception handler hook. Override it to always return { error, message, code, request_id }. This is the single highest-impact change for agent readiness.',
    code: `# myproject/exceptions.py
import uuid
from rest_framework.views import exception_handler
from rest_framework.response import Response

def agent_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        response.data = {
            "error": response.data.get("detail", "Unknown error"),
            "code": response.status_code,
            "message": str(exc),
            "request_id": str(uuid.uuid4()),
        }
    else:
        response = Response(
            {
                "error": "internal_error",
                "code": 500,
                "message": "An unexpected error occurred",
                "request_id": str(uuid.uuid4()),
            },
            status=500,
        )
    return response

# settings.py
REST_FRAMEWORK = {
    "EXCEPTION_HANDLER": "myproject.exceptions.agent_exception_handler",
}`,
    impact: 'D2 API Quality (15%) + D6 Data Quality (10%)',
    icon: Code2,
    color: 'emerald',
  },
  {
    step: '2',
    title: 'Structured JSON Error Responses (Flask)',
    description:
      'Flask uses error handlers registered on the app. Register handlers for 400, 404, 405, 422, and 500 to return structured JSON. Without these, Flask returns HTML error pages that agents cannot parse.',
    code: `# app.py
import uuid
from flask import Flask, jsonify

app = Flask(__name__)

@app.errorhandler(400)
@app.errorhandler(404)
@app.errorhandler(405)
@app.errorhandler(422)
@app.errorhandler(500)
def handle_error(error):
    return jsonify({
        "error": getattr(error, "name", "Unknown error"),
        "code": getattr(error, "code", 500),
        "message": getattr(error, "description", "An error occurred"),
        "request_id": str(uuid.uuid4()),
    }), getattr(error, "code", 500)`,
    impact: 'D2 API Quality (15%) + D6 Data Quality (10%)',
    icon: FlaskConical,
    color: 'blue',
  },
  {
    step: '3',
    title: 'OpenAPI Spec with drf-spectacular (Django)',
    description:
      'drf-spectacular auto-generates an OpenAPI 3.0 spec from your DRF views, serializers, and type annotations. Agents use this spec to discover every endpoint, parameter, and response shape without documentation. This is the discovery layer that makes your API machine-readable.',
    code: `# Install: pip install drf-spectacular
# settings.py
INSTALLED_APPS = [
    ...
    "drf_spectacular",
]

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "My App API",
    "DESCRIPTION": "Agent-ready API for My App",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

# urls.py
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(), name="docs"),
]`,
    impact: 'D1 Discovery (12%) + D3 Onboarding (8%)',
    icon: FileJson,
    color: 'purple',
  },
  {
    step: '4',
    title: 'OpenAPI Spec with flask-smorest (Flask)',
    description:
      'flask-smorest (formerly flask-rest-api) generates OpenAPI specs from your Flask views and marshmallow schemas. It decorates Blueprint routes with schema information that gets compiled into a machine-readable spec at /api/openapi.json.',
    code: `# Install: pip install flask-smorest marshmallow
from flask import Flask
from flask_smorest import Api, Blueprint, abort
from marshmallow import Schema, fields

app = Flask(__name__)
app.config["API_TITLE"] = "My App API"
app.config["API_VERSION"] = "1.0.0"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/api"
app.config["OPENAPI_JSON_PATH"] = "openapi.json"

api = Api(app)

class ItemSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    price = fields.Float(required=True)

blp = Blueprint("items", __name__, url_prefix="/api/items")

@blp.route("/")
@blp.response(200, ItemSchema(many=True))
def get_items():
    \"\"\"List all items with pricing.\"\"\"
    return Item.query.all()

api.register_blueprint(blp)`,
    impact: 'D1 Discovery (12%) + D3 Onboarding (8%)',
    icon: Layers,
    color: 'cyan',
  },
  {
    step: '5',
    title: '/health Endpoint',
    description:
      'A /health endpoint tells agents whether your service is operational. Both Django and Flask make this trivial. Return { status, timestamp, version } at minimum. Agents check this before attempting any other call, and monitoring services use it for uptime tracking. This directly impacts D8 Reliability (13% weight).',
    code: `# Django: health/views.py
from django.http import JsonResponse
from django.utils import timezone

def health_check(request):
    return JsonResponse({
        "status": "healthy",
        "timestamp": timezone.now().isoformat(),
        "version": "1.0.0",
        "service": "my-app",
    })

# urls.py
urlpatterns = [
    path("health", health_check, name="health"),
]

# ---

# Flask: app.py
from datetime import datetime, timezone

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0",
        "service": "my-app",
    })`,
    impact: 'D8 Reliability (13%)',
    icon: CheckCircle2,
    color: 'emerald',
  },
  {
    step: '6',
    title: 'agent-card.json as a Static File',
    description:
      'Serve agent-card.json at /.well-known/agent-card.json. This is the discovery file that AI agents look for first. In Django, use the static files system or a dedicated view. In Flask, serve it from the static folder or a route. The file describes your API capabilities, authentication requirements, and contact information.',
    code: `# Django: serve via URL route
# views.py
import json
from django.http import JsonResponse

AGENT_CARD = {
    "name": "My App",
    "description": "What your app does, in one sentence",
    "url": "https://myapp.com",
    "version": "1.0.0",
    "capabilities": {
        "rest": {
            "openapi": "https://myapp.com/api/schema/"
        }
    },
    "authentication": {
        "type": "bearer",
        "token_url": "https://myapp.com/api/auth/token"
    },
    "contact": {
        "email": "api@myapp.com",
        "docs": "https://myapp.com/api/docs/"
    }
}

def agent_card(request):
    return JsonResponse(AGENT_CARD)

# urls.py
urlpatterns = [
    path(".well-known/agent-card.json", agent_card),
]

# ---

# Flask: serve from route
@app.route("/.well-known/agent-card.json")
def agent_card():
    return jsonify({
        "name": "My App",
        "description": "What your app does",
        "url": "https://myapp.com",
        "version": "1.0.0",
        "capabilities": {
            "rest": {"openapi": "https://myapp.com/api/openapi.json"}
        },
        "authentication": {"type": "bearer"},
        "contact": {"email": "api@myapp.com"}
    })`,
    impact: 'D9 Agent Experience (10%)',
    icon: Globe,
    color: 'emerald',
  },
  {
    step: '7',
    title: 'llms.txt Route',
    description:
      'Serve a plain-text file at /llms.txt that describes your service for AI models in natural language. Unlike agent-card.json (structured metadata), llms.txt is prose that helps LLMs understand what your service does, its key endpoints, and common use cases. Both Django and Flask can serve this as a plain text response.',
    code: `# Django: views.py
from django.http import HttpResponse

def llms_txt(request):
    content = \"\"\"# My App

## What This Service Does
My App is a [description]. It helps users [value prop].

## API Access
- Base URL: https://myapp.com/api
- Authentication: Bearer token
- OpenAPI spec: https://myapp.com/api/schema/
- Rate limit: 100 requests per minute

## Key Endpoints
- GET /api/items/ - List items with pagination
- GET /api/items/{id}/ - Get item details
- POST /api/orders/ - Create an order
- GET /api/availability/ - Check availability

## Error Handling
All errors return JSON: { error, message, code, request_id }
Retry on 429 with the Retry-After header value.
\"\"\"
    return HttpResponse(
        content,
        content_type="text/plain; charset=utf-8",
    )

# urls.py
urlpatterns = [
    path("llms.txt", llms_txt),
]`,
    impact: 'D9 Agent Experience (10%)',
    icon: Server,
    color: 'blue',
  },
  {
    step: '8',
    title: 'CORS and Bearer Authentication',
    description:
      'AI agents run from different origins and authenticate with Bearer tokens. Django needs django-cors-headers for CORS and DRF TokenAuthentication for Bearer auth. Flask needs flask-cors and a token check decorator. Without CORS, agents get blocked at the preflight. Without Bearer auth, there is no standard way for agents to authenticate.',
    code: `# Django: pip install django-cors-headers
# settings.py
INSTALLED_APPS = [..., "corsheaders"]
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "https://your-allowed-origins.com",
]
CORS_ALLOW_HEADERS = [
    "authorization", "content-type",
    "x-request-id", "accept",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
}

# ---

# Flask: pip install flask-cors
from flask_cors import CORS
from functools import wraps

CORS(app, origins=["https://your-allowed-origins.com"])

def require_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return jsonify({
                "error": "unauthorized",
                "code": 401,
                "message": "Bearer token required",
                "request_id": str(uuid.uuid4()),
            }), 401
        token = auth.split(" ", 1)[1]
        if not validate_token(token):
            return jsonify({
                "error": "invalid_token",
                "code": 401,
                "message": "Invalid or expired token",
                "request_id": str(uuid.uuid4()),
            }), 401
        return f(*args, **kwargs)
    return decorated`,
    impact: 'D7 Security (12%) + D2 API Quality (15%)',
    icon: Shield,
    color: 'red',
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

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Should I use Django or Flask for an agent-ready API?',
    answer:
      'Use Django REST Framework if you need a full-featured API with authentication, permissions, serialization, and automatic admin. Use Flask if you want a lightweight API with fewer abstractions. Both can reach Gold tier (75+) agent readiness. Django gets you there faster due to built-in auth and drf-spectacular; Flask gives you more control over every response.',
  },
  {
    question: 'Do I need both agent-card.json and llms.txt?',
    answer:
      'Yes. They serve different purposes. agent-card.json is structured metadata that agents parse programmatically — it declares your endpoints, auth type, and capabilities. llms.txt is natural language that helps AI models understand your service contextually. Having both maximizes your D9 Agent Experience score (10% weight). Missing either leaves points on the table.',
  },
  {
    question: 'How does this compare to the Next.js tutorial?',
    answer:
      'The concepts are identical — JSON errors, OpenAPI, health endpoint, agent-card.json, llms.txt, CORS, and Bearer auth. The implementation differs because Python frameworks handle routing, middleware, and serialization differently than Next.js. If your team uses Python, follow this guide. If they use Node/React, follow the Next.js tutorial. Both achieve the same agent readiness improvements.',
  },
  {
    question: 'What score improvement can I expect from implementing all 8 steps?',
    answer:
      'A typical Python API with no agent infrastructure starts at 10-20/100. Implementing all 8 steps addresses D1 Discovery, D2 API Quality, D6 Data Quality, D7 Security, D8 Reliability, and D9 Agent Experience — covering over 80% of the scoring weight. Most implementations reach Silver (60+) or Gold (75+) depending on existing API maturity and documentation quality.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DjangoFlaskAgentReadinessTutorialPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Building Agent-Ready APIs with Django and Flask: A Python Developer\'s Guide',
    description:
      'Copy-paste Python code for adding agent readiness to Django REST Framework and Flask applications. Covers JSON errors, OpenAPI, /health, agent-card.json, llms.txt, CORS, and Bearer auth.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/django-flask-agent-readiness-tutorial',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Tutorial',
    wordCount: 1900,
    keywords:
      'Django Flask agent ready API Python, drf-spectacular, flask-smorest, agent-card.json, llms.txt, OpenAPI',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Django Flask Agent Readiness Tutorial',
          item: 'https://agenthermes.ai/blog/django-flask-agent-readiness-tutorial',
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
      title="Building Agent-Ready APIs with Django and Flask: A Python Developer's Guide"
      shareUrl="https://agenthermes.ai/blog/django-flask-agent-readiness-tutorial"
      currentHref="/blog/django-flask-agent-readiness-tutorial"
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
            <span className="text-zinc-400">Django Flask Agent Readiness Tutorial</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Terminal className="h-3.5 w-3.5" />
              Developer Tutorial
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Python
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Building Agent-Ready APIs with{' '}
            <span className="text-emerald-400">Django and Flask</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The companion to our{' '}
            <Link href="/blog/nextjs-agent-readiness-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
              Next.js tutorial
            </Link>
            , built for Python developers. Eight copy-paste code blocks that take a Django REST
            Framework or Flask API from invisible to agent-ready. Structured errors, OpenAPI
            spec, health endpoint, agent-card.json, llms.txt, CORS, and Bearer auth — everything
            an AI agent needs to discover and use your API.
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

      {/* ===== WHY PYTHON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-blue-500" />
            Why a Python-Specific Guide Matters
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Python powers a significant portion of production APIs. Django REST Framework alone is
              used by companies from Instagram to Mozilla, and Flask is the go-to for lightweight
              microservices. Yet most agent readiness tutorials assume Node.js or Next.js. Python
              developers are left translating concepts into their framework&apos;s patterns.
            </p>
            <p>
              This guide provides framework-native code for both Django and Flask. Every step shows
              the Django way and the Flask way side by side. You do not need to adapt from JavaScript
              examples — the code below drops directly into your Python project.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '8', label: 'steps to agent-ready', icon: CheckCircle2 },
              { value: '60+', label: 'target score', icon: Zap },
              { value: '2', label: 'frameworks covered', icon: Code2 },
              { value: '~2h', label: 'implementation time', icon: Clock },
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

      {/* ===== TUTORIAL STEPS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-emerald-500" />
            8 Steps to an Agent-Ready Python API
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Each step targets specific dimensions of the{' '}
            <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
              Agent Readiness Score
            </Link>
            . Implement all 8 for maximum coverage. Each code block is production-ready — copy,
            paste, adjust the names, and deploy.
          </p>

          <div className="space-y-6">
            {tutorialSteps.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.step}
                  className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border} text-sm font-bold ${colors.text}`}>
                        {item.step}
                      </div>
                      <div className="flex items-center gap-2">
                        <item.icon className={`h-4 w-4 ${colors.text}`} />
                        <h3 className="font-bold text-zinc-100">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-2">{item.description}</p>
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Score impact:</span> {item.impact}
                    </p>
                  </div>
                  <div className="border-t border-zinc-800/50 bg-zinc-950/50 p-5 overflow-x-auto">
                    <pre className="text-sm text-zinc-300 leading-relaxed">
                      <code>{item.code}</code>
                    </pre>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SCORE IMPACT SUMMARY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Combined Score Impact
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Implementing all 8 steps touches 6 of the 9 scoring dimensions. Here is how each
              dimension is affected and the total weight covered.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Weight</div>
              <div>Steps That Impact It</div>
            </div>
            {[
              { dimension: 'D1 Discovery', weight: '12%', steps: 'OpenAPI spec (Steps 3-4)' },
              { dimension: 'D2 API Quality', weight: '15%', steps: 'JSON errors (Steps 1-2), CORS + Auth (Step 8)' },
              { dimension: 'D3 Onboarding', weight: '8%', steps: 'OpenAPI spec (Steps 3-4)' },
              { dimension: 'D6 Data Quality', weight: '10%', steps: 'JSON errors (Steps 1-2)' },
              { dimension: 'D7 Security', weight: '12%', steps: 'Bearer auth + CORS (Step 8)' },
              { dimension: 'D8 Reliability', weight: '13%', steps: '/health endpoint (Step 5)' },
              { dimension: 'D9 Agent Experience', weight: '10%', steps: 'agent-card.json (Step 6), llms.txt (Step 7)' },
            ].map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-emerald-400 font-bold">{row.weight}</div>
                <div className="text-zinc-500">{row.steps}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Total weight covered: 80%.</strong> The remaining
              20% comes from D4 Pricing Transparency (5%), D5 Payment (8%), and the Agent-Native
              Bonus (7%). Those require business-specific implementation — pricing endpoints,
              payment integration, and MCP server setup. See our{' '}
              <Link href="/blog/build-mcp-server-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
                MCP server tutorial
              </Link>{' '}
              for the next steps.
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
                title: 'Building Agent-Ready APIs with Next.js: A Developer\'s Guide',
                href: '/blog/nextjs-agent-readiness-tutorial',
                tag: 'Tutorial',
                tagColor: 'purple',
              },
              {
                title: 'Build an MCP Server for Your Business in Under an Hour',
                href: '/blog/build-mcp-server-tutorial',
                tag: 'Tutorial',
                tagColor: 'purple',
              },
              {
                title: 'Structured Error Responses: The Foundation of Agent-Ready APIs',
                href: '/blog/structured-errors-guide',
                tag: 'Technical',
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
            Test your implementation
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            After implementing these 8 steps, run your API through the Agent Readiness Scanner.
            See exactly which dimensions improved and what to tackle next.
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
              Connect My API
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
