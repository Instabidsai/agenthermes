import Link from 'next/link'
import {
  ArrowRight,
  FileJson,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Code2,
  Building2,
  UtensilsCrossed,
  Server,
  Copy,
  ExternalLink,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-24" />
}

function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode
  id: string
}) {
  return (
    <>
      <SectionAnchor id={id} />
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
        {children}
      </h2>
    </>
  )
}

function CodeBlock({
  language,
  label,
  children,
}: {
  language: string
  label?: string
  children: string
}) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
      {label && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
          <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            {language}
          </span>
          <span className="text-xs text-zinc-500">{label}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-zinc-300 font-mono">{children}</code>
      </pre>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Example JSON payloads                                              */
/* ------------------------------------------------------------------ */

const plumberExample = `{
  "hermes_version": "1.0",
  "business": {
    "name": "Rapid Flow Plumbing",
    "domain": "rapidflowplumbing.com",
    "category": "home_services",
    "subcategory": "plumbing",
    "description": "24/7 emergency plumbing, drain cleaning, and water heater repair in Austin, TX.",
    "location": {
      "city": "Austin",
      "state": "TX",
      "country": "US",
      "service_radius_miles": 30
    }
  },
  "agent_capabilities": {
    "can_book": true,
    "can_quote": true,
    "can_pay": false,
    "booking_url": "https://rapidflowplumbing.com/api/book",
    "quote_url": "https://rapidflowplumbing.com/api/quote",
    "auth_method": "api_key",
    "protocols": ["rest"]
  },
  "services": [
    {
      "name": "Emergency Drain Cleaning",
      "price_range": { "min": 150, "max": 400, "currency": "USD" },
      "availability": "24/7"
    },
    {
      "name": "Water Heater Install",
      "price_range": { "min": 800, "max": 2500, "currency": "USD" },
      "availability": "mon-sat 7am-6pm"
    }
  ],
  "fulfillment": {
    "type": "on_site",
    "lead_time_hours": 2,
    "service_area": "Austin metro, TX"
  },
  "trust": {
    "hermes_score": 72,
    "hermes_tier": "silver",
    "hermes_id": "AH-2026-A3F2C",
    "verified": true,
    "last_scanned": "2026-03-30T14:00:00Z",
    "verify_url": "https://agenthermes.ai/api/v1/score/rapidflowplumbing.com"
  }
}`

const restaurantExample = `{
  "hermes_version": "1.0",
  "business": {
    "name": "Sakura Ramen House",
    "domain": "sakuraramen.com",
    "category": "food_beverage",
    "subcategory": "restaurant",
    "description": "Authentic Tokyo-style ramen with 12-hour bone broth. Dine-in, takeout, and delivery.",
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "US"
    }
  },
  "agent_capabilities": {
    "can_book": true,
    "can_quote": false,
    "can_pay": true,
    "can_order": true,
    "booking_url": "https://sakuraramen.com/api/reservations",
    "order_url": "https://sakuraramen.com/api/orders",
    "payment_url": "https://sakuraramen.com/api/pay",
    "auth_method": "oauth2",
    "protocols": ["rest", "webhooks"]
  },
  "services": [
    {
      "name": "Dine-in Reservation",
      "price_range": { "min": 15, "max": 45, "currency": "USD" },
      "availability": "tue-sun 11:30am-10pm"
    },
    {
      "name": "Delivery Order",
      "price_range": { "min": 20, "max": 60, "currency": "USD" },
      "availability": "tue-sun 11:30am-9pm",
      "delivery_radius_miles": 5
    }
  ],
  "fulfillment": {
    "type": "mixed",
    "options": ["dine_in", "takeout", "delivery"],
    "lead_time_minutes": 30,
    "delivery_partners": ["doordash", "ubereats"]
  },
  "trust": {
    "hermes_score": 81,
    "hermes_tier": "gold",
    "hermes_id": "AH-2026-7B1E9",
    "verified": true,
    "last_scanned": "2026-03-29T10:15:00Z",
    "verify_url": "https://agenthermes.ai/api/v1/score/sakuraramen.com"
  }
}`

const saasExample = `{
  "hermes_version": "1.0",
  "business": {
    "name": "Stripe",
    "domain": "stripe.com",
    "category": "saas",
    "subcategory": "payments",
    "description": "Payment infrastructure for the internet. Accept payments, send payouts, and manage businesses online.",
    "location": {
      "country": "US",
      "global": true
    }
  },
  "agent_capabilities": {
    "can_book": false,
    "can_quote": true,
    "can_pay": true,
    "booking_url": null,
    "quote_url": "https://api.stripe.com/v1/prices",
    "payment_url": "https://api.stripe.com/v1/payment_intents",
    "auth_method": "api_key",
    "protocols": ["rest", "webhooks", "mcp"],
    "mcp_endpoint": "https://mcp.stripe.com",
    "openapi_spec": "https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json",
    "docs_url": "https://docs.stripe.com"
  },
  "services": [
    {
      "name": "Payment Processing",
      "pricing_model": "per_transaction",
      "price": { "rate": "2.9% + $0.30", "currency": "USD" }
    },
    {
      "name": "Stripe Connect",
      "pricing_model": "per_transaction",
      "price": { "rate": "0.25% + $0.25", "currency": "USD" }
    }
  ],
  "fulfillment": {
    "type": "api",
    "latency_p50_ms": 200,
    "uptime_sla": "99.99%",
    "rate_limit": "100 req/sec"
  },
  "trust": {
    "hermes_score": 56,
    "hermes_tier": "bronze",
    "hermes_id": "AH-2026-E4D01",
    "verified": true,
    "certified": false,
    "last_scanned": "2026-03-30T08:00:00Z",
    "verify_url": "https://agenthermes.ai/api/v1/score/stripe.com"
  }
}`

/* ------------------------------------------------------------------ */
/*  Spec fields table                                                  */
/* ------------------------------------------------------------------ */

const specFields = [
  {
    field: 'hermes_version',
    type: 'string',
    required: true,
    desc: 'Spec version. Currently "1.0".',
  },
  {
    field: 'business',
    type: 'object',
    required: true,
    desc: 'Business identity: name, domain, category, description, location.',
  },
  {
    field: 'business.name',
    type: 'string',
    required: true,
    desc: 'Human-readable business name.',
  },
  {
    field: 'business.domain',
    type: 'string',
    required: true,
    desc: 'Primary domain (e.g., "stripe.com").',
  },
  {
    field: 'business.category',
    type: 'string',
    required: true,
    desc: 'Vertical: saas, home_services, food_beverage, retail, healthcare, professional_services, etc.',
  },
  {
    field: 'business.description',
    type: 'string',
    required: true,
    desc: 'One-line description optimized for LLMs.',
  },
  {
    field: 'business.location',
    type: 'object',
    required: false,
    desc: 'Physical location or service area. Include city, state, country, service_radius_miles.',
  },
  {
    field: 'agent_capabilities',
    type: 'object',
    required: true,
    desc: 'What an AI agent can do with this business.',
  },
  {
    field: 'agent_capabilities.can_book',
    type: 'boolean',
    required: true,
    desc: 'Can an agent book appointments or reservations?',
  },
  {
    field: 'agent_capabilities.can_quote',
    type: 'boolean',
    required: true,
    desc: 'Can an agent get pricing or quotes programmatically?',
  },
  {
    field: 'agent_capabilities.can_pay',
    type: 'boolean',
    required: true,
    desc: 'Can an agent complete a payment?',
  },
  {
    field: 'agent_capabilities.auth_method',
    type: 'string',
    required: true,
    desc: 'Authentication: "api_key", "oauth2", "none", "bearer".',
  },
  {
    field: 'agent_capabilities.protocols',
    type: 'string[]',
    required: true,
    desc: 'Supported protocols: "rest", "graphql", "mcp", "a2a", "webhooks".',
  },
  {
    field: 'services',
    type: 'array',
    required: true,
    desc: 'List of services with name, price_range or pricing_model, and availability.',
  },
  {
    field: 'fulfillment',
    type: 'object',
    required: true,
    desc: 'How services are delivered: "api", "on_site", "delivery", "mixed". Include lead times.',
  },
  {
    field: 'trust',
    type: 'object',
    required: false,
    desc: 'AgentHermes trust metadata. Auto-populated when you generate via our API.',
  },
  {
    field: 'trust.hermes_score',
    type: 'number',
    required: false,
    desc: 'Agent Readiness Score (0-100).',
  },
  {
    field: 'trust.hermes_tier',
    type: 'string',
    required: false,
    desc: 'Tier: platinum, gold, silver, bronze, or unaudited.',
  },
  {
    field: 'trust.verify_url',
    type: 'string',
    required: false,
    desc: 'URL to verify the score is authentic.',
  },
]

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function StandardPage() {
  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <FileJson className="h-4 w-4" />
              Open Standard v1.0
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              The{' '}
              <span className="text-emerald-500">Agent Readiness</span>{' '}
              Standard
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-6">
              One JSON file at{' '}
              <code className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-base">
                /.well-known/agent-hermes.json
              </code>{' '}
              makes your business machine-readable for every AI agent.
            </p>

            <p className="text-base text-zinc-500 max-w-xl mx-auto mb-10">
              Agents need to know what you do, how to connect, what you charge, and how to pay.
              This standard gives them the answer in one fetch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                Generate Yours Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#spec"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                Read the Spec
                <Code2 className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS EXISTS ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Why Businesses Need This
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              AI agents are learning to book, buy, and transact autonomously.
              But they cannot use what they cannot read.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: 'Discoverable',
                color: 'text-emerald-400',
                border: 'border-emerald-500/30',
                bg: 'bg-emerald-500/5',
                desc: 'Agents fetch /.well-known/agent-hermes.json and instantly know your business name, category, location, and what you offer.',
              },
              {
                icon: Zap,
                title: 'Actionable',
                color: 'text-blue-400',
                border: 'border-blue-500/30',
                bg: 'bg-blue-500/5',
                desc: 'Booking URLs, payment endpoints, auth methods, and protocols are machine-readable. An agent can act on your behalf in one API call.',
              },
              {
                icon: Shield,
                title: 'Trustworthy',
                color: 'text-purple-400',
                border: 'border-purple-500/30',
                bg: 'bg-purple-500/5',
                desc: 'The trust block includes your Agent Readiness Score, tier, verification URL, and last scan date. Agents know who to trust.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-6 lg:p-8 rounded-xl ${item.bg} border ${item.border} transition-all`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-700/50 mb-5">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${item.color}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE SPEC ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="spec">
            <FileJson className="h-7 w-7 text-emerald-400" />
            The Specification
          </SectionHeading>

          <p className="text-zinc-400 text-base mb-8 max-w-3xl">
            Place a JSON file at{' '}
            <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">
              https://yourdomain.com/.well-known/agent-hermes.json
            </code>
            . The file describes your business, capabilities, services, fulfillment, and trust score
            in a format any AI agent can parse.
          </p>

          {/* Fields table */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 overflow-hidden mb-12">
            <div className="px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/50">
              <h3 className="text-sm font-semibold text-zinc-300">
                Field Reference
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800/80">
                    <th className="text-left px-4 py-3 text-zinc-500 font-medium">
                      Field
                    </th>
                    <th className="text-left px-4 py-3 text-zinc-500 font-medium">
                      Type
                    </th>
                    <th className="text-center px-4 py-3 text-zinc-500 font-medium">
                      Required
                    </th>
                    <th className="text-left px-4 py-3 text-zinc-500 font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specFields.map((f) => (
                    <tr
                      key={f.field}
                      className="border-b border-zinc-800/40 hover:bg-zinc-800/20"
                    >
                      <td className="px-4 py-2.5">
                        <code className="text-emerald-400 font-mono text-xs">
                          {f.field}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 text-zinc-500 font-mono text-xs">
                        {f.type}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {f.required ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-zinc-600 text-xs">optional</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-zinc-400">
                        {f.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXAMPLES ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="examples">
            <Code2 className="h-7 w-7 text-emerald-400" />
            Examples by Vertical
          </SectionHeading>

          <p className="text-zinc-400 text-base mb-10 max-w-3xl">
            The standard works for every type of business. Here are three
            real-world examples showing how a local service, a restaurant, and a
            SaaS company each describe themselves.
          </p>

          {/* Plumber */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30">
                <Building2 className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-200">
                Local Service: Plumber
              </h3>
            </div>
            <CodeBlock language="json" label="/.well-known/agent-hermes.json">
              {plumberExample}
            </CodeBlock>
          </div>

          {/* Restaurant */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/30">
                <UtensilsCrossed className="h-4 w-4 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-200">
                Restaurant: Ramen House
              </h3>
            </div>
            <CodeBlock language="json" label="/.well-known/agent-hermes.json">
              {restaurantExample}
            </CodeBlock>
          </div>

          {/* SaaS */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30">
                <Server className="h-4 w-4 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-200">
                SaaS: Stripe (Payments)
              </h3>
            </div>
            <CodeBlock language="json" label="/.well-known/agent-hermes.json">
              {saasExample}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* ===== HOW TO IMPLEMENT ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="implement">
            <Zap className="h-7 w-7 text-emerald-400" />
            How to Implement
          </SectionHeading>

          <p className="text-zinc-400 text-base mb-10 max-w-3xl">
            Three options. Pick whichever fits your stack.
          </p>

          {/* Option 1: Static file */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-zinc-200 mb-4">
              Option 1: Static File (Any Host)
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Drop the JSON file in your{' '}
              <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-xs">
                .well-known/
              </code>{' '}
              directory. Works with any static host, CDN, or web server.
            </p>
            <CodeBlock language="bash" label="Create the file">
{`# Create the directory
mkdir -p .well-known

# Generate your agent-hermes.json via the API
curl -s "https://agenthermes.ai/api/v1/agent-hermes-json?domain=yourdomain.com" \\
  | jq '.hermes_json' > .well-known/agent-hermes.json

# Deploy with your site`}
            </CodeBlock>
          </div>

          {/* Option 2: Next.js */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-zinc-200 mb-4">
              Option 2: Next.js Route Handler
            </h3>
            <CodeBlock language="typescript" label="app/.well-known/agent-hermes.json/route.ts">
{`import { NextResponse } from 'next/server'

const hermesJson = {
  hermes_version: '1.0',
  business: {
    name: 'Your Business',
    domain: 'yourdomain.com',
    category: 'saas',
    description: 'What your business does in one sentence.',
  },
  agent_capabilities: {
    can_book: false,
    can_quote: true,
    can_pay: true,
    auth_method: 'api_key',
    protocols: ['rest'],
  },
  services: [
    {
      name: 'Your Service',
      pricing_model: 'subscription',
      price: { amount: 29, currency: 'USD', interval: 'month' },
    },
  ],
  fulfillment: {
    type: 'api',
    latency_p50_ms: 150,
  },
}

export function GET() {
  return NextResponse.json(hermesJson, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}`}
            </CodeBlock>
          </div>

          {/* Option 3: Express */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-zinc-200 mb-4">
              Option 3: Express / Node.js
            </h3>
            <CodeBlock language="javascript" label="server.js">
{`const express = require('express')
const app = express()

app.get('/.well-known/agent-hermes.json', (req, res) => {
  res.json({
    hermes_version: '1.0',
    business: {
      name: 'Your Business',
      domain: 'yourdomain.com',
      category: 'saas',
      description: 'What your business does.',
    },
    agent_capabilities: {
      can_book: false,
      can_quote: true,
      can_pay: true,
      auth_method: 'api_key',
      protocols: ['rest'],
    },
    services: [],
    fulfillment: { type: 'api' },
  })
})`}
            </CodeBlock>
          </div>

          {/* Validation */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <h3 className="text-lg font-bold text-zinc-200 mb-3">
              Validate Your File
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              After deploying, verify your file is accessible and valid:
            </p>
            <CodeBlock language="bash" label="Verify">
{`# Check it's accessible
curl -s https://yourdomain.com/.well-known/agent-hermes.json | jq .

# Verify with AgentHermes (checks signature + score)
curl -s -X POST https://agenthermes.ai/api/v1/hermes-json/verify \\
  -H "Content-Type: application/json" \\
  -d '{"domain": "yourdomain.com"}'`}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* ===== SCORING IMPACT ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Impact on Your Score
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Having a valid{' '}
              <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">
                agent-hermes.json
              </code>{' '}
              directly boosts your Agent Readiness Score.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                points: '+8',
                label: 'Discoverability',
                desc: 'Agents can find and understand your business in one fetch.',
              },
              {
                points: '+5-15',
                label: 'Agent Experience',
                desc: 'Machine-readable capabilities, services, and fulfillment config.',
              },
              {
                points: 'Tier Up',
                label: 'Trust Signal',
                desc: 'Verified score and tier help agents prioritize trusted businesses.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {item.points}
                </div>
                <div className="text-sm font-semibold text-zinc-200 mb-2">
                  {item.label}
                </div>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Get Your{' '}
            <code className="px-2 py-1 rounded bg-zinc-800 text-emerald-400 font-mono text-2xl sm:text-3xl">
              agent-hermes.json
            </code>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            We auto-generate the file from your scan results. Connect your
            business and deploy it in under a minute.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Generate Yours Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/developers#hermes-json"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
            >
              API Docs
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
