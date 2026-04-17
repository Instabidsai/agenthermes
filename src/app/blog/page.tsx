import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  Banknote,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  Car,
  CheckSquare,
  Clock,
  Code,
  Code2,
  Coins,
  Compass,
  Cpu,
  CreditCard,
  Crown,
  Database,
  DollarSign,
  Eye,
  FileCode,
  FileCode2,
  FileJson,
  FileText,
  Gauge,
  GitBranch,
  GitCompare,
  GitMerge,
  Globe,
  Globe2,
  GraduationCap,
  KeyRound,
  Dumbbell,
  Film,
  FlaskConical,
  HardHat,
  Heart,
  HeartHandshake,
  Home,
  Landmark,
  Layers,
  Lightbulb,
  List,
  Lock,
  MapPin,
  Megaphone,
  MessageSquare,
  Network,
  Phone,
  FileSearch,
  PieChart,
  Cog,
  Plane,
  Radio,
  Repeat,
  Search,
  Server,
  Settings,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Signal,
  ShoppingCart,
  Telescope,
  Timer,
  Trophy,
  Wand2,
  Sparkles,
  TrendingUp,
  UserPlus,
  UtensilsCrossed,
  Bot,
  Terminal,
  Truck,
  Wheat,
  BookText,
  BookA,
  Stethoscope,
  FileType,
  Scale,
  Wrench,
  Cloud,
  Users,
  Scissors,
  Gavel,
  PawPrint,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agent Economy Insights | AgentHermes Blog',
  description:
    'Research, data, and analysis from scanning 500+ businesses. Insights on agent readiness scores, MCP adoption, ecommerce platforms, and the $6.2B gap in local business AI infrastructure.',
  openGraph: {
    title: 'Agent Economy Insights | AgentHermes Blog',
    description:
      'Research, data, and analysis from scanning 500+ businesses for agent readiness.',
    url: 'https://agenthermes.ai/blog',
    siteName: 'AgentHermes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Economy Insights | AgentHermes Blog',
    description:
      'Research, data, and analysis from scanning 500+ businesses for agent readiness.',
  },
}

interface Article {
  title: string
  excerpt: string
  date: string
  readTime: string
  href: string
  tag: string
  tagColor: string
  icon: typeof BarChart3
}

const articles: Article[] = [
  {
    title: 'Pet Services Agent Readiness: Why Dog Walkers and Groomers Are Missing the AI Economy',
    excerpt:
      '$150B pet industry. Rover and Wag own the marketplace. 250K+ independent dog walkers, groomers, boarders, and sitters have zero API. Agent-ready pet services: availability API, pricing JSON, booking endpoint, pet profile intake. AI assistants will book pet services alongside haircuts and dentist appointments — but only if you have an API. Average score: 6/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/pet-services-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: PawPrint,
  },
  {
    title: 'Multi-Tenant SaaS and Agent Readiness: Why Per-Tenant API Keys Matter',
    excerpt:
      'SaaS platforms serve hundreds of businesses but most treat API access as platform-level. AI agents act on behalf of individual tenants — platform-level keys are a security nightmare. Stripe solved this with Connected Accounts. Agent-ready SaaS needs per-tenant OAuth, tenant-specific webhooks, isolated rate limits. The 25-point score gap between platform-level and per-tenant API access.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/multi-tenant-agent-readiness',
    tag: 'Technical Guide',
    tagColor: 'purple',
    icon: Layers,
  },
  {
    title: 'The Agent Economy Market Size: $12B in 2026, $100B by 2030',
    excerpt:
      'AI agent market $12.06B (44.9% CAGR). MCP: 10K+ servers, 97M SDK downloads. 72% of enterprises plan agent deployment. Only 52 out of 500 businesses (10.4%) score Silver+. The gap between agent demand and business readiness is the defining opportunity of this decade. Market sizing, growth drivers, and what it means for your business.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/agent-economy-market-size',
    tag: 'Market Analysis',
    tagColor: 'emerald',
    icon: TrendingUp,
  },
  {
    title: 'Beauty and Salon Agent Readiness: Why Booking Apps Own Your Business and AI Agents Can\'t Find You',
    excerpt:
      'Hair salons, nail salons, barbershops, beauty spas: all booking-dependent, all locked behind Booksy/Vagaro/Square Appointments. No direct API. Agent-ready salon: appointment availability JSON, service menu with prices, stylist profiles with specialties, automated booking + cancellation. First salon with MCP server = booked by every AI personal assistant. Average score: 11/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/beauty-salon-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Scissors,
  },
  {
    title: 'Monitoring and Observability for Agent Readiness: How to Know If AI Agents Are Using Your API',
    excerpt:
      'Once you are agent-ready, how do you know agents are actually calling your API? Agent traffic monitoring: User-Agent detection (Claude, GPT, agent frameworks), request pattern analysis (agents paginate systematically), billing attribution (which agents generate revenue). Tools: DataDog, Grafana, custom middleware. The 20-line middleware that makes agent traffic visible.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/monitoring-observability-agent-readiness',
    tag: 'Technical Guide',
    tagColor: 'purple',
    icon: BarChart3,
  },
  {
    title: 'Legal and Compliance Considerations for Agent Readiness: GDPR, HIPAA, and Terms of Service',
    excerpt:
      'Businesses worry about liability when AI agents access their services. GDPR implications of agent-processed personal data, HIPAA requirements for healthcare agents, PCI DSS for payment processing by agents. The legal answer: structured APIs with proper auth are MORE compliant than uncontrolled web scraping. Having an agent-card.json with explicit capability declarations = legal clarity.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/legal-compliance-agent-readiness',
    tag: 'Legal Guide',
    tagColor: 'purple',
    icon: Gavel,
  },
  {
    title: 'HR and Recruiting Agent Readiness: Why ATS Platforms Lock Out AI Hiring Agents',
    excerpt:
      'ATS platforms (Greenhouse, Lever, Workday) have APIs but gate them behind enterprise contracts. Job boards (Indeed, LinkedIn) own the candidate data. Recruiter AI agents cannot access candidate pipelines, schedule interviews, or extend offers without human middleware. The average HR agent readiness score is 22/100. Agent-ready HR needs: structured job posting API, candidate pipeline endpoint, interview scheduling, offer letter generation.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/hr-recruiting-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Briefcase,
  },
  {
    title: 'The Definitive Guide to Structured Error Responses for AI Agents',
    excerpt:
      'The canonical error shape: {error, code, message, request_id, retry_after, details[]}. 5 HTTP status codes with production-ready JSON examples. Framework-specific middleware for Express, Next.js, Django, and Rails. The 10-line middleware that fixes 20% of your Agent Readiness Score. The pillar page for agent error handling.',
    date: '2026-04-15',
    readTime: '15 min read',
    href: '/blog/structured-errors-guide',
    tag: 'Technical Guide',
    tagColor: 'purple',
    icon: Terminal,
  },
  {
    title: 'We Published 91 Articles About Agent Readiness — Here Is What We Learned',
    excerpt:
      '91 articles, 500+ business scans, 50 verticals. The 5 patterns that show up everywhere: no API, no pricing, phone-only, PDF-heavy, no structured data. Developer tools win because they build for machines by default. The gap between knowing and doing is massive. We wrote the guide — now scan your business.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/hundred-articles-agent-readiness',
    tag: 'Milestone',
    tagColor: 'emerald',
    icon: Trophy,
  },
  {
    title: 'Food Delivery Agent Readiness: Why DoorDash and UberEats Have APIs But Restaurants Don\'t',
    excerpt:
      'Food delivery platforms (DoorDash, UberEats, Grubhub) have merchant APIs but the restaurants themselves have zero. The middleman is agent-ready, the actual business is not. Agent-ready restaurants need their own ordering API, not just a DoorDash listing. This is the disintermediation play: restaurants with MCP servers bypass delivery platform fees. 30% commission vs 0% direct agent ordering.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/food-delivery-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: UtensilsCrossed,
  },
  {
    title: 'CDN and Caching for Agent Readiness: Why Response Time Matters for D8 Reliability',
    excerpt:
      'D8 Reliability (0.13) checks response times. CDN-backed APIs respond in <100ms. Origin-only APIs hit 500ms+. AgentHermes detects CDN headers (CF-Cache-Status, X-Cache, Age). HTTP/2 detection adds points. Top scorers (Vercel 70, Supabase 69) all use edge CDNs. Most local businesses serve from single origin servers. Fix: Cloudflare free tier + proper cache headers = instant D8 improvement.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/caching-cdn-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Cloud,
  },
  {
    title: 'CRM Agent Readiness: Why Salesforce Scores Higher Than HubSpot (And Both Miss Gold)',
    excerpt:
      'CRM platforms are natural agent targets (agents managing leads, updating contacts, automating follow-ups). Salesforce: REST API, SOQL, OAuth, extensive docs (~60 Silver). HubSpot: REST API, good docs, but more restricted free tier (~55 Bronze). Both miss Gold: no agent-card.json, no MCP server, enterprise pricing gated. What would push CRMs to Gold: MCP tools for lead management, structured pricing API, agent-card.json.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/crm-agent-readiness',
    tag: 'Platform Comparison',
    tagColor: 'cyan',
    icon: Users,
  },
  {
    title: 'Dental and Veterinary Agent Readiness: Why Appointment-Based Businesses Are Missing the Agent Wave',
    excerpt:
      'Over 200,000 dental practices and 32,000 vet clinics in the US — nearly all invisible to AI agents. Phone-only booking, no pricing APIs, manual insurance verification, patient intake on clipboards. OpenDental and Dentrix have internal APIs but zero agent-facing exposure. The first dental practice with an MCP server gets booked by every AI personal assistant managing family schedules.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/dental-veterinary-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Stethoscope,
  },
  {
    title: 'Content Negotiation: Why Accept Headers Determine If AI Agents Get JSON or HTML',
    excerpt:
      'AI agents send Accept: application/json. Most websites ignore this header and return HTML anyway. Content negotiation is a 5-minute middleware fix that directly impacts D6 Data Quality (0.10 weight). Sites that return JSON for JSON requests and HTML for HTML requests score higher. Anti-pattern: ignoring Accept header entirely and always returning HTML.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/content-negotiation-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: FileType,
  },
  {
    title: 'AgentHermes vs IsAgentReady: How the Two Agent Readiness Scanners Compare',
    excerpt:
      'Transparent comparison of the two leading agent readiness scanners. AgentHermes: 9 weighted dimensions, 500+ businesses scanned, hosted MCP servers, vertical-specific profiles. IsAgentReady: 5 letter-grade categories, auto-fix agent skills, installable MCP packages. Both are new — the market is wide open. Use both for maximum coverage.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/competitor-comparison-isagentready',
    tag: 'Comparison',
    tagColor: 'cyan',
    icon: Scale,
  },
  {
    title: 'Telecom Agent Readiness: Why Carriers Are the Most Frustrating APIs for AI Agents',
    excerpt:
      'The $1.8T telecom industry is invisible to AI agents. Traditional carriers (AT&T 18, Verizon 16) use SOAP/XML, require enterprise NDAs, and expose zero structured plan data. Twilio is the exception at 58 — developer-first, REST/JSON, sandbox mode. The carrier that builds a plan comparison API and eSIM provisioning endpoint first captures the entire agent-driven mobile management market.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/telecom-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Phone,
  },
  {
    title: 'robots.txt for AI Crawlers: How to Let GPTBot, ClaudeBot, and PerplexityBot In',
    excerpt:
      '38% of businesses accidentally block AI crawlers via robots.txt. GPTBot (OpenAI), ClaudeBot (Anthropic), Google-Extended (Google), and PerplexityBot all respect robots.txt. Blocking them = invisible to AI models = zero GEO. Copy-paste robots.txt template that allows AI crawlers while blocking scrapers like CCBot and Diffbot. AgentHermes checks this in D1 Discoverability (0.12 weight).',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/robots-txt-ai-crawlers',
    tag: 'Standards Guide',
    tagColor: 'emerald',
    icon: FileSearch,
  },
  {
    title: "The CMO's Guide to Agent Readiness: Why Your Marketing Website Fails and What to Fix",
    excerpt:
      'Marketing websites are designed for humans — hero images, animations, testimonial carousels, gated PDFs. AI agents cannot use any of it. Average marketing site scores 28/100. Five changes within marketing\'s control: Schema.org Product/Service markup, structured pricing page, lead intake API, llms.txt, HTML over PDF. Agent-driven leads cost $0 CAC. Companion to the CTO guide.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/cmo-guide-agent-readiness',
    tag: 'Executive Guide',
    tagColor: 'emerald',
    icon: PieChart,
  },
  {
    title: 'Construction Agent Readiness: Why Contractors and Builders Score Zero',
    excerpt:
      'The $2T US construction industry is invisible to AI agents. Estimates via phone, project timelines in spreadsheets, material quotes by email, subcontractor discovery by word of mouth. No structured data whatsoever. The average score is 8/100 — the lowest of any major vertical. BuilderTrend and Procore have internal APIs but not agent-facing. The first contractor with an MCP server gets every AI-powered project manager\'s business.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/construction-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: HardHat,
  },
  {
    title: 'security.txt: The 2-Minute File That Tells AI Agents Your API Is Safe',
    excerpt:
      'RFC 9116 defines /.well-known/security.txt. AgentHermes checks for it in D7 Security (0.12 weight). 100% of Silver-tier businesses have one. Over 95% below Bronze do not. Contents: Contact, Expires, Preferred-Languages, Canonical, Policy, Hiring. Takes 2 minutes to create, adds points to D7, and signals maturity to AI agents evaluating API trustworthiness.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/security-txt-agent-readiness',
    tag: 'Standards Guide',
    tagColor: 'emerald',
    icon: ShieldAlert,
  },
  {
    title: 'Why Slack Scores 68 for Agent Readiness (And What Keeps It From Gold)',
    excerpt:
      'Dimension-by-dimension breakdown of Slack\'s 68 Silver. D2 API Quality: 85 (Web API, Events API, Block Kit). D7 Security: 82 (OAuth, 700+ scopes, audit logs). D8 Reliability: 80 (status.slack.com). Where Slack loses: D4 Pricing (enterprise "contact sales"), D5 Payment (no self-service enterprise billing API), D9 Agent Experience (no agent-card.json, no llms.txt, no MCP). Three files and self-service enterprise pricing push Slack to Gold.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/slack-agent-readiness-breakdown',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: MessageSquare,
  },
  {
    title: 'Agriculture Agent Readiness: Why Farm Tech Has APIs But Farmers Don\'t',
    excerpt:
      'AgTech platforms (John Deere Operations Center, Climate FieldView) have APIs but locked behind dealer networks. Individual farms: zero digital presence beyond Facebook. The $1.5T agriculture market has a 30-point gap between platforms (score 30-40) and actual farms (score 0-5). Agent-ready agriculture needs crop availability, seasonal pricing, delivery scheduling, and soil test data as structured endpoints.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/agriculture-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Wheat,
  },
  {
    title: 'API Documentation and Agent Readiness: Why Mintlify Scores 66 and ReadMe Doesn\'t',
    excerpt:
      'Documentation tools themselves have varying agent readiness. Mintlify 66 Silver because it generates static HTML with structured OpenAPI rendering. ReadMe falls behind with client-side JS rendering. But most businesses have terrible API docs: outdated Swagger, broken examples, no error codes. Documentation impacts D2 (0.15) and D6 (0.10) — 25% of your score. The five things agents need from docs and the five anti-patterns that kill scores.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/documentation-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: BookText,
  },
  {
    title: 'Agent Readiness Glossary: 50 Terms Every Business Should Know',
    excerpt:
      'The definitive glossary of agent readiness terms. 50 definitions alphabetically from A2A Protocol to x402. Includes ARL levels, MCP servers, all 9 scoring dimensions, tier definitions, agent economy concepts, and technical protocols. Each term gets a 2-3 sentence definition with a link to the full article. Bookmark this page — AI models love glossary pages for citation.',
    date: '2026-04-15',
    readTime: '15 min read',
    href: '/blog/agent-readiness-glossary',
    tag: 'Reference',
    tagColor: 'emerald',
    icon: BookA,
  },
  {
    title: "The CTO's Guide to Agent Readiness: Technical Decisions That Impact Your Score",
    excerpt:
      '10 architectural decisions that directly impact your Agent Readiness Score. API-first vs website-first, OpenAPI vs ad-hoc docs, Bearer auth vs session cookies, JSON errors vs HTML, cursor pagination, webhooks, sandbox mode, status page, versioned APIs, MCP server. Each maps to a specific dimension and point value. A CTO who reads this can estimate their score before scanning.',
    date: '2026-04-15',
    readTime: '15 min read',
    href: '/blog/cto-guide-agent-readiness',
    tag: 'Technical Guide',
    tagColor: 'emerald',
    icon: Settings,
  },
  {
    title: 'GraphQL vs REST for Agent Readiness: Which API Style Agents Prefer',
    excerpt:
      'AI agents interact differently with GraphQL and REST APIs. REST is easier to discover via OpenAPI specs (wins D1, D3, D7). GraphQL is more powerful to query via introspection (wins D2, D6). GitHub offers both and scores 67 Silver. Best practice: REST with OpenAPI for discovery, GraphQL for advanced agent use. MCP supersedes both but needs a backend.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/graphql-vs-rest-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: GitMerge,
  },
  {
    title: 'Energy and Utilities Agent Readiness: Why Power Companies Are Dark to AI Agents',
    excerpt:
      'The $1.5T energy sector is invisible to AI agents. Billing portals are customer-login-only, usage data trapped in proprietary smart meters, outage reporting phone-first, no public API for rate plans. Smart grid data exists but is not agent-accessible. The first utility with an MCP server for rate comparison wins every AI-powered energy broker.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/energy-utilities-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Zap,
  },
  {
    title: 'Auto-Generated SDKs: How OpenAPI Specs Let AI Agents Write Their Own Client Libraries',
    excerpt:
      'When a business publishes an OpenAPI spec, AI agents can auto-generate typed client SDKs in any language. No reading docs, no guessing endpoints — the spec IS the documentation. Tools like openapi-generator, Speakeasy, and Stainless (Stripe uses it) make this possible. This directly boosts D2 API Quality (0.15). Businesses without OpenAPI force agents to screen-scrape HTML docs.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/sdk-generation-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Wand2,
  },
  {
    title: 'Media and Entertainment Agent Readiness: Why Content Platforms Score Higher Than Studios',
    excerpt:
      'Content platforms (Spotify 54, TikTok 69) vs traditional media (studios, agencies, publishers score under 20). Platforms win because they have public APIs for content discovery. Traditional media: gated content, DRM walls, licensing complexity, no structured catalog API. The $2.3T global media market is split in two by agent readiness.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/media-entertainment-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Film,
  },
  {
    title: 'Your Status Page Is an Agent Readiness Signal: Why status.yoursite.com Adds Points',
    excerpt:
      'D8 Reliability (0.13) directly rewards status pages. AgentHermes checks: /status, status.domain.com, /health endpoint, incident history, SLA documentation. Why agents care: before delegating work to your API, agents check if you are operational. No status page = no confidence. The 3-tier approach takes 15 minutes to start and impacts 13% of your score.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/status-page-agent-readiness',
    tag: 'Dimensions Deep Dive',
    tagColor: 'blue',
    icon: Signal,
  },
  {
    title: 'Sandbox Environments: Why AI Agents Need a Safe Place to Learn Your API',
    excerpt:
      'Agents cannot safely explore production APIs. They need sandboxes: test credentials, fake data, rate-limit-free practice calls. Stripe\'s test mode (sk_test_*) is the gold standard — same API, fake money. Most businesses do not offer this: either prod-only or no API at all. AgentHermes D3 Onboarding (0.08) checks for sandbox/test mode availability. Why it matters: agents will not risk real money learning your undocumented API.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/sandbox-environments-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: FlaskConical,
  },
  {
    title: 'Nonprofit Agent Readiness: Why Donor Platforms and Charities Are Invisible to AI Giving Agents',
    excerpt:
      'Nonprofits average under 20 on the Agent Readiness Score. Donation pages are human-only (Donorbox, GoFundMe widgets), no structured impact data, annual reports in PDF, volunteer signups via email. AI giving agents are emerging — they will match donors to causes programmatically. The first nonprofit with an MCP server captures every AI-mediated donation.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/nonprofit-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: HeartHandshake,
  },
  {
    title: 'Agent Readiness Predictions for 2026: What Changes After the First 1,000 Scans',
    excerpt:
      'Six data-driven predictions based on 500-scan trends. First Platinum scorer by Q3 2026. Average score rises from 43 to 55. 10+ companies adopt agent-card.json (currently 0/500). Healthcare and government stay below 30. The SaaS-to-local-business gap widens from 45 to 50+ points. At least one competitor copies the methodology. What businesses should do now to be ready.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/agent-readiness-2026-predictions',
    tag: 'Research',
    tagColor: 'emerald',
    icon: Telescope,
  },
  {
    title: 'Pagination for AI Agents: Why Cursor-Based Beats Offset-Based Every Time',
    excerpt:
      'Agents iterate through datasets automatically. Offset-based pagination (page=2&limit=20) breaks when data changes between pages. Cursor-based (after=abc123) is stable, performant, and agent-safe. AgentHermes D9 checks for cursor support. 88% of APIs have no pagination at all. The 3 patterns agents encounter and which one they trust.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/pagination-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: List,
  },
  {
    title: 'Automotive Agent Readiness: Why Car Dealerships and Auto Services Score Under 15',
    excerpt:
      'The $1.2T US automotive market is invisible to AI agents. Inventory on third-party platforms (AutoTrader, Cars.com), pricing hidden behind "call for quote," service booking phone-only. Dealership websites are marketing brochures, not agent-callable APIs. The first direct-to-agent dealer wins every agent-driven buyer in their metro.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/automotive-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Car,
  },
  {
    title: 'The Agent Readiness ROI: What Happens When AI Agents Can Actually Use Your Business',
    excerpt:
      'Bottom-line piece for executives. Agent-ready businesses capture zero-CAC revenue: automated lead gen, 24/7 availability, compound discovery. If 1% of customers come via agents in 2026, that is 5-8% by 2028. Businesses at ARL-3+ capture it. Businesses at ARL-0 get zero. Every agent query that bounces off "contact us" goes to your competitor with an API.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/agent-readiness-roi-calculator',
    tag: 'Business Strategy',
    tagColor: 'emerald',
    icon: Calculator,
  },
  {
    title: 'Idempotency Keys: Why AI Agents Need Safe Retries (And Your API Probably Doesn\'t Support Them)',
    excerpt:
      'Agents retry on failure. Without idempotency, retries cause duplicate charges and orders. Stripe\'s Idempotency-Key header is the gold standard. 92% of APIs lack any idempotency support. What AgentHermes checks in D9: Idempotency-Key header support, duplicate request detection, 409 Conflict for duplicates. The 3 patterns: key-based (Stripe), natural (GET/PUT/DELETE), conditional (ETag/If-Match).',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/idempotency-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Repeat,
  },
  {
    title: 'Fitness and Wellness Agent Readiness: Why Gyms, Spas, and Studios Are Invisible to AI',
    excerpt:
      'Fitness and wellness average under 25 on the Agent Readiness Score. Class schedules in PDFs, booking via phone only, no public API for availability, pricing gated behind membership tiers. The $96B US fitness market has zero MCP servers. The first CrossFit gym with an MCP server gets booked by every AI personal assistant.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/fitness-wellness-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Dumbbell,
  },
  {
    title: 'From Silver to Gold: What the Final 15 Points of Agent Readiness Actually Require',
    excerpt:
      'Companion to the Bronze-to-Silver guide. Silver (60-74) to Gold (75+) is the hardest jump — only 1 of 500 businesses (Resend) made it. The final 15 points require: agent-card.json (~3pts), llms.txt (~2pts), MCP server (~5pts), x402 payment support (~2pts), fully structured errors (~2pts), sub-100ms p95 latency (~1pt). Why Resend scores 75 and Vercel scores 70.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/silver-to-gold-guide',
    tag: 'How-To Guide',
    tagColor: 'green',
    icon: Trophy,
  },
  {
    title: 'CORS and Agent Readiness: Why Cross-Origin Headers Determine If AI Agents Can Use Your API',
    excerpt:
      'CORS blocks agents by default. Most browser-built APIs return Access-Control-Allow-Origin for specific domains, preventing agents from different origins. Agent-ready CORS: allow credentialed cross-origin requests, expose rate-limit headers, handle OPTIONS preflight. Top scorers (Stripe, Resend) handle it correctly. Anti-pattern: allowing * but blocking Authorization header.',
    date: '2026-04-16',
    readTime: '13 min read',
    href: '/blog/cors-headers-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Globe2,
  },
  {
    title: 'Logistics Agent Readiness: Why Shipping and Delivery Companies Score Below 30',
    excerpt:
      'Logistics tracking APIs exist (FedEx, UPS, USPS) but are rate-limited, XML-first, and require complex auth. Most 3PLs have no public API at all. EasyPost leads at 48 (Bronze). The first logistics company with an MCP server wins every AI-powered e-commerce integration.',
    date: '2026-04-16',
    readTime: '14 min read',
    href: '/blog/logistics-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Truck,
  },
  {
    title: 'AI Agents vs Chatbots: Why Agent Readiness Is Not About Adding a Chat Widget',
    excerpt:
      'Businesses think "AI ready" means adding a chatbot. Wrong. A chatbot sits on YOUR site for humans. An agent calls your API from THEIR system. Stripe (no chatbot) scores 68. Chatbot-only businesses average 18. The distinction changes everything about how you prepare for the agent economy.',
    date: '2026-04-16',
    readTime: '12 min read',
    href: '/blog/ai-agents-vs-chatbots',
    tag: 'Education',
    tagColor: 'emerald',
    icon: Bot,
  },
  {
    title: 'Why Vercel and Supabase Both Score 69-70: The Infrastructure Platform Pattern',
    excerpt:
      'Vercel 70 Silver, Supabase 69 Silver. Nearly identical but different strengths. Vercel: deployment API, CLI docs, status page, structured errors. Supabase: REST/GraphQL/Realtime, self-service keys, OpenAPI spec, transparent pricing. Both miss Gold: no agent-card.json, no llms.txt, no MCP server. Three files and 30 minutes would push both past 75.',
    date: '2026-04-16',
    readTime: '13 min read',
    href: '/blog/vercel-supabase-agent-readiness',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: Server,
  },
  {
    title: 'Government Agent Readiness: Why Public Services Are the Most Invisible to AI Agents',
    excerpt:
      'Government websites are designed for compliance, not for agents. PDF forms, no APIs, legacy CMS, CAPTCHA walls. IRS, DMV, city portals all score under 15. Exceptions: data.gov (48), USASpending (52). Government mandates WCAG accessibility but blocks AI accessibility entirely.',
    date: '2026-04-16',
    readTime: '14 min read',
    href: '/blog/government-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Landmark,
  },
  {
    title: 'Error Handling for AI Agents: Why Your 500 Page Matters More Than Your Homepage',
    excerpt:
      'When agents hit errors, they need structured JSON guidance — not a pretty HTML 500 page. Error handling impacts D6 Data Quality (10%) and D9 Agent Experience (10%) = 20% of the score. Stripe returns perfect error JSON (68 score). Cash App returns HTML (12 score). The 5 error patterns every agent-ready API needs.',
    date: '2026-04-16',
    readTime: '12 min read',
    href: '/blog/error-handling-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: AlertTriangle,
  },
  {
    title: 'Manufacturing Agent Readiness: Why Factory Floors Are the Last Frontier for AI Agents',
    excerpt:
      'Manufacturing has massive value but zero digital agent infrastructure. ERPs locked behind VPNs, IoT data unexposed, supply chain stuck in EDI. The first agent-ready factory wins procurement from every AI purchasing agent.',
    date: '2026-04-16',
    readTime: '13 min read',
    href: '/blog/manufacturing-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Cog,
  },
  {
    title: 'OAuth 2.0 for AI Agents: The Client Credentials Flow Every API Needs',
    excerpt:
      'OAuth client_credentials grant is the gold standard for machine-to-machine auth. Most OAuth flows assume a human with a browser. Agents need: POST /oauth/token, get access_token, use Bearer header. No redirect, no consent screen.',
    date: '2026-04-16',
    readTime: '14 min read',
    href: '/blog/oauth-for-agents-guide',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: KeyRound,
  },
  {
    title: 'Education Agent Readiness: Why Schools and Universities Are Missing the Agent Economy',
    excerpt:
      'Education averages 29/100 on the Agent Readiness Score. LMS systems like Canvas and Blackboard have APIs — but locked behind institutional SSO. Course catalogs exist as PDFs. Admissions terminate at "call us." Community colleges score 12, EdTech SaaS hits 52. The $1.7T education market is invisible to AI agents.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/education-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: GraduationCap,
  },
  {
    title: 'API Versioning and Agent Readiness: Why Breaking Changes Kill AI Agent Trust',
    excerpt:
      'Agents hardcode API patterns. Unversioned APIs that break = agents crash = no retry. What AgentHermes checks: /v1/ prefix, Accept-Version header, deprecation notices in headers, changelog endpoint. Stripe is the gold standard — explicit versions in every request, 2-year backward compat. The five anti-patterns that permanently lose agent traffic.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/api-versioning-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: GitCompare,
  },
  {
    title: 'From Bronze to Silver in 30 Days: The Agent Readiness Sprint',
    excerpt:
      'The actionable 30-day plan for businesses stuck at 40-59 (Bronze). Week 1: HTTPS + OpenAPI + sitemap. Week 2: Bearer auth + structured errors + /health. Week 3: agent-card.json + llms.txt + Schema.org. Week 4: self-service API keys + pricing + webhooks. Real examples from scan data: what moved companies from 45 to 62.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/bronze-to-silver-guide',
    tag: 'How-To Guide',
    tagColor: 'green',
    icon: Timer,
  },
  {
    title: 'Shopify vs WooCommerce for Agent Readiness: The E-Commerce Platform Showdown',
    excerpt:
      'Dimension-by-dimension comparison of the two biggest e-commerce platforms for agent readiness. Shopify wins D1 Discoverability with public /products.json. WooCommerce wins API depth with the Store API. Neither ships agent-native out of the box — here is what both still need.',
    date: '2026-04-16',
    readTime: '14 min read',
    href: '/blog/shopify-vs-woocommerce-agents',
    tag: 'Platform Comparison',
    tagColor: 'cyan',
    icon: ShoppingBag,
  },
  {
    title: 'Rate Limiting for AI Agents: Why X-RateLimit-Remaining Is the Most Important Header',
    excerpt:
      'Rate limiting for agents is different than for humans. Humans retry manually; agents need machine-readable guidance. The four headers every agent-ready API must return, plus why Stripe scores 68 partly because of perfect 429 responses.',
    date: '2026-04-16',
    readTime: '12 min read',
    href: '/blog/rate-limiting-for-agents',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Gauge,
  },
  {
    title: 'Webhooks and Agent Readiness: Why Real-Time Beats Polling for AI Agents',
    excerpt:
      'Agents cannot poll endlessly — it burns budget and misses events. Webhooks are how agent-ready businesses broadcast state changes. Top scorers all have them: Stripe, GitHub, Slack, Resend. Event catalog, HMAC signing, retry logic — the full playbook.',
    date: '2026-04-16',
    readTime: '13 min read',
    href: '/blog/webhooks-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'emerald',
    icon: Radio,
  },
  {
    title: 'How to Build an MCP Server for Your Business: A 30-Minute Tutorial',
    excerpt:
      'Of 500 businesses scanned, only 2 ship an MCP server. Complete tutorial: install @modelcontextprotocol/sdk, define tools (list_products, get_pricing, create_order), add resources and prompts, deploy to Vercel or Cloudflare Workers, register via agent-card.json. Copy-paste ready, 30 minutes end-to-end.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/build-mcp-server-tutorial',
    tag: 'Tutorial',
    tagColor: 'emerald',
    icon: Cpu,
  },
  {
    title: 'Why GitHub Scores 67 for Agent Readiness (And What It Gets Wrong)',
    excerpt:
      'GitHub scored 67 Silver in our 500-business scan. Near-perfect on D2 API (REST + GraphQL + OpenAPI) and D7 Security (OAuth + fine-grained PATs + SAML). Loses points on D5 Payment (no self-service billing API), D4 Pricing (enterprise is quote-only), and D9 Agent Experience (no agent-card.json linking the official MCP server).',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/github-agent-readiness-breakdown',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: GitBranch,
  },
  {
    title: 'The Agent Readiness Checklist: 30 Signals Every Business Should Have',
    excerpt:
      'The definitive printable checklist, grouped by the 9 dimensions AgentHermes scans. HTTPS, robots.txt GPTBot, sitemap, agent-card.json, llms.txt, OpenAPI, OAuth, idempotency keys, status page, AGENTS.md, x402, MCP. Includes the six-item priority shortlist that lifts Bronze to Silver in 14 days.',
    date: '2026-04-15',
    readTime: '10 min read',
    href: '/blog/checklist-agent-ready-business',
    tag: 'Checklist',
    tagColor: 'emerald',
    icon: CheckSquare,
  },
  {
    title: 'Payment Processing and Agent Readiness: The D5 Dimension (8% Weight)',
    excerpt:
      'D5 Payment Processing carries an 8% weight in the Agent Readiness Score. Can an AI agent complete a purchase end-to-end? Most businesses fail on hosted checkout redirects. Here is what agent-ready payments look like — Payment Element, structured webhooks, refund endpoints, and x402.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/payment-processing-agent-readiness',
    tag: 'Dimensions Deep Dive',
    tagColor: 'blue',
    icon: CreditCard,
  },
  {
    title: 'Agent Experience (D9): The Dimension That Actually Measures Agent Usability (10% Weight)',
    excerpt:
      'D9 Agent Experience = 10% of the score. Seven signals — request IDs, structured errors, response envelopes, rate-limit headers, cursor pagination, idempotency keys, OpenAPI examples — separate agent-pleasant APIs from stack-trace landmines. The middleware fix lifts D9 by 4-5 points in one commit.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/agent-experience-dimension',
    tag: 'Dimensions Deep Dive',
    tagColor: 'blue',
    icon: Sparkles,
  },
  {
    title: 'Why Fortune 500 Companies Score Lower Than Startups on Agent Readiness',
    excerpt:
      'The Fortune 500 averages 37 — below Bronze. Startups like Resend (75), Vercel (70), Supabase (69), and Stripe (68) dominate the top. Allstate is the one enterprise breaking into Silver. Budget is not the bottleneck. Architecture is. The gap is widening every quarter.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/enterprise-vs-startup-agent-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: Building2,
  },
  {
    title: 'x402: The Micropayment Protocol That Lets AI Agents Pay for Services',
    excerpt:
      'HTTP 402 Payment Required was reserved for 30 years and never used. x402 finally unlocks it — agents pay per-call, not per-subscription. Sub-second settlement on USDC, no signup, no card. Here is how x402 works and why it is the missing piece that unlocks ARL-4 Automated.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/x402-payment-protocol',
    tag: 'Protocols',
    tagColor: 'emerald',
    icon: Coins,
  },
  {
    title: 'Discoverability and Agent Readiness: Why 40% of Businesses Fail D1 (12% Weight)',
    excerpt:
      'D1 Discoverability carries a 0.12 weight. If agents cannot find you, nothing else matters. 199 of 500 businesses scanned fail D1 so hard they never escape Unaudited. Here is exactly what D1 measures — DNS, robots.txt, sitemap, agent-card, llms.txt, OG tags — and the one-afternoon fix.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/discoverability-agent-readiness',
    tag: 'Dimensions Deep Dive',
    tagColor: 'blue',
    icon: Compass,
  },
  {
    title: 'Insurance Agent Readiness: Why Allstate Scores 66 While Most Insurers Are Invisible',
    excerpt:
      'Allstate scored 66 Silver. Most insurance carriers sit below 30. Structured quote API, digital claims, documented auth flow separate the winners. Regulation is not the excuse — Allstate proves compliant plus agent-ready works. Here is the full build order for carriers.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/insurance-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: ShieldCheck,
  },
  {
    title: 'Real Estate Agent Readiness: Why Property Listings Are Invisible to AI Agents',
    excerpt:
      'Real estate sits at the bottom of our 500-business scan. Listings trapped in PDF flyers. MLS gatekeeping. Phone-only showings. Zero brokerages publish an agent card. $1.9T annual market waiting for the first agent-ready brokerage per metro.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/real-estate-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Home,
  },
  {
    title: 'Travel and Hospitality Agent Readiness: Hotels, Airlines, and the Booking API Gap',
    excerpt:
      'Travel has been machine-first since 1960. So why do independent hotels average 28/100? OTAs captured the agent-accessible surface and charge 15-25% commission for it. Direct-booking MCP servers are how hotels, airlines, and restaurants reclaim the margin.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/travel-hospitality-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Plane,
  },
  {
    title: 'Professional Services Agent Readiness: Why Law Firms, Accountants, and Consultants Score Under 20',
    excerpt:
      'The lowest-scoring segment in the 500-business scan. 68 of 74 firms scored below 40. Charge $300-500/hr but cannot tell an AI agent what they offer. Five failure patterns repeat across every firm. Here is the fix, by firm type.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/professional-services-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Briefcase,
  },
  {
    title: 'Data Quality and Agent Readiness: Why Structured Responses Win (D6 = 10%)',
    excerpt:
      'D6 Data Quality carries 10% of your Agent Readiness Score. Most businesses return HTML errors to agents. Structured JSON envelopes, consistent error codes, and JSON-LD schema markup separate Silver-tier companies from the invisible majority. Here is what agents need and how to deliver it.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/data-quality-agent-readiness',
    tag: 'Dimensions Deep Dive',
    tagColor: 'blue',
    icon: Database,
  },
  {
    title: 'Agent Onboarding: Why D3 Is the Weakest Dimension Across 500 Businesses',
    excerpt:
      'D3 Onboarding is universally the weakest dimension in the Agent Readiness Score. Can an AI agent sign up, get credentials, and start calling your API without a human? For 95% of businesses, no. "Contact sales" is a dead end. Here is why D3 matters and how to fix it without removing security.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/onboarding-agent-readiness',
    tag: 'Dimensions Deep Dive',
    tagColor: 'blue',
    icon: UserPlus,
  },
  {
    title: 'Schema.org Markup for Agent Readiness: The SEO Trick That Helps AI Agents Too',
    excerpt:
      'Schema.org structured data is not just for Google rich results. AI agents read JSON-LD markup to extract business identity, pricing, hours, and services. 8 key schema types bridge SEO and agent readiness — with copy-paste templates you can ship today.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/schema-markup-agent-readiness',
    tag: 'Standards Guide',
    tagColor: 'emerald',
    icon: Code2,
  },
  {
    title: 'The A2A Protocol: How AI Agents Talk to Each Other (And Your Business)',
    excerpt:
      'A2A (Agent-to-Agent) protocol v0.3 is how AI agents delegate tasks to other agents — different from MCP (agent-to-tool). Discovery via /.well-known/agent-card.json. 5 skills: describe, negotiate, execute, stream, handle errors. 0 of 500 businesses scanned publish an A2A agent card.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/a2a-protocol-explained',
    tag: 'Protocols',
    tagColor: 'emerald',
    icon: Share2,
  },
  {
    title: 'AGENTS.md: The README File That AI Agents Actually Read',
    excerpt:
      'AGENTS.md is the README.md equivalent for AI agents. Structured for LLM consumption, placed at repo or domain root, it tells an agent what the project is, how to run it, what tools exist, and what workflows are supported. Detected by AgentHermes — lifts D6 Data Quality and D9 Agent Experience (20% of the score).',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/agents-md-file-guide',
    tag: 'Standards Guide',
    tagColor: 'emerald',
    icon: FileCode2,
  },
  {
    title: 'WordPress Agent Readiness: Why 43% of the Internet Fails',
    excerpt:
      'WordPress powers 43% of all websites (W3Techs). In our scans, WordPress-detected sites without WooCommerce average below 30 — below Bronze. WooCommerce, Yoast/Rank Math, unblocked wp-json, and three discovery files flip the stack. Here is the agent-ready WordPress checklist.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/wordpress-agent-readiness',
    tag: 'Platform Analysis',
    tagColor: 'amber',
    icon: Globe2,
  },
  {
    title: 'Agent Readiness vs SEO: Why Your Google Ranking Does Not Help AI Agents',
    excerpt:
      'SEO ranks content for humans. Agent Readiness measures whether AI agents can actually use your business. After scanning 500 businesses, we found sites ranking #1 on Google that score 5/100 for agent readiness. Here is what is different, why both matter, and how to measure each.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/agent-readiness-vs-seo',
    tag: 'Framework',
    tagColor: 'purple',
    icon: Search,
  },
  {
    title: 'Why Scoring Caps at 39: The HTTPS and Endpoint Requirements That Kill Agent Readiness',
    excerpt:
      'Two hard caps in the Agent Readiness scoring model. No TLS means the score cannot exceed 39. No callable endpoints caps it at 29. Here is why both caps exist, how many of the 199 below-Bronze businesses are cap-driven, and the cheapest way to remove both.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/scoring-caps-explained',
    tag: 'Methodology',
    tagColor: 'amber',
    icon: Lock,
  },
  {
    title: 'Security and Agent Readiness: Why Bearer Tokens Beat API Keys (D7 = 12%)',
    excerpt:
      'D7 Security carries a 0.12 weight — tied for third-highest of the 9 dimensions. Agents need predictable auth they can handle programmatically. Here is what AgentHermes scans for, why Bearer beats API keys, why OAuth 2.0 is the gold standard, and why 401+JSON scores 87% of 200.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/security-agent-readiness',
    tag: 'Dimensions Deep Dive',
    tagColor: 'blue',
    icon: Shield,
  },
  {
    title: 'llms.txt: The Single File 95% of Businesses Are Missing',
    excerpt:
      'Of the 500 businesses AgentHermes has scanned, fewer than 5% serve an llms.txt file at their root. That single markdown file is the fastest, cheapest way to become AI-readable and boost D1 Discovery and D9 Agent Experience. Here is the standard, a copy-paste template, and the exact score impact.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/llms-txt-standard-guide',
    tag: 'Standards Guide',
    tagColor: 'emerald',
    icon: FileText,
  },
  {
    title: 'Local Business Agent Readiness: The $6.2B Opportunity Nobody Is Chasing',
    excerpt:
      '33 million US small businesses. Zero have MCP servers. 90% of local scans score below Bronze. The first plumber, dentist, and salon in each zip code to go agent-ready captures every agent-driven lead for the next 12 to 18 months. Here is the playbook.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/local-business-agent-readiness',
    tag: 'Market Analysis',
    tagColor: 'amber',
    icon: MapPin,
  },
  {
    title: 'Reliability and Agent Readiness: Why Status Pages Score 13% (D8)',
    excerpt:
      'D8 Reliability carries a 0.13 weight — second-highest of the 9 dimensions, behind only API quality. Agents automate repeat actions, so unreliable endpoints kill adoption. Here is why dev infra dominates (Statuspage 70, Vercel 70, Supabase 69), what we check, and how to score higher.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/reliability-agent-readiness',
    tag: 'Dimensions Deep Dive',
    tagColor: 'blue',
    icon: Activity,
  },
  {
    title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness (D2 = 15%)',
    excerpt:
      'D2 API Quality is weighted 0.15 — the highest of any Agent Readiness dimension. Companies with published OpenAPI specs consistently score 60+. Companies without hit a ceiling around 45. Here is why OpenAPI is the single biggest factor and how to ship one in 2 hours.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/openapi-agent-readiness',
    tag: 'Standards Deep Dive',
    tagColor: 'emerald',
    icon: FileCode,
  },
  {
    title: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12',
    excerpt:
      'Fintech is the most polarized vertical on agent readiness. Stripe 68, Robinhood 66, Allstate 66 — all Silver. Cash App 12, Square 8 — invisible. The split comes down to one decision: did you build for developers or for consumers?',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/fintech-agent-readiness',
    tag: 'Industry Analysis',
    tagColor: 'amber',
    icon: Banknote,
  },
  {
    title: 'Why Developer Tools Dominate Agent Readiness (And What Everyone Else Can Learn)',
    excerpt:
      'After scanning 500 businesses, 22 of the top 30 Silver-tier companies are developer tools. Vercel 70, Supabase 69, Stripe 68, GitHub 67. One pattern explains all of them — and it is fully portable to any business that wants to stop being invisible to agents.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/developer-tools-agent-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: Code,
  },
  {
    title: 'What Is agent-card.json? The Missing File on 500 Business Websites',
    excerpt:
      'agent-card.json is the A2A protocol discovery file that lets AI agents find your capabilities. We scanned 500 businesses. Exactly zero have one. Here is what goes inside, a minimal valid example, and how to auto-generate one in 60 seconds.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/agent-card-json-guide',
    tag: 'Standards Deep Dive',
    tagColor: 'emerald',
    icon: FileJson,
  },
  {
    title: 'Why Marketing Agencies Score the Lowest on Agent Readiness (Avg 14-19)',
    excerpt:
      'Marketing agencies average 19/100. Advertising averages 14/100. The worst-performing verticals we scan. The agencies selling discoverability cannot be discovered themselves — here is why, and the fix that turns it into a first-mover edge.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/marketing-agencies-agent-readiness',
    tag: 'Industry Analysis',
    tagColor: 'amber',
    icon: Megaphone,
  },
  {
    title: 'Why 30% of Businesses Fail Agent Readiness Over Pricing Transparency',
    excerpt:
      '148 of 500 businesses we scanned have no visible pricing at all. D4 Pricing is weighted lowest (0.05) but has the highest universal failure rate. Here is what agent-ready pricing looks like — with drop-in JSON-LD Offer markup you can ship today.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/pricing-transparency-agent-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: DollarSign,
  },
  {
    title: 'The Agent Readiness Leaderboard: Who Is Winning and Who Is Invisible',
    excerpt:
      'The definitive 2026 ranking of 500 businesses by Agent Readiness Score. Only 1 Gold. Zero Platinum. 198 completely invisible. Data-driven analysis of who leads, who lags, and what the 60-point cliff between Silver and Bronze really means.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/agent-readiness-leaderboard',
    tag: 'Data Analysis',
    tagColor: 'emerald',
    icon: Crown,
  },
  {
    title: 'Agent Readiness in Healthcare: Why the Average Score Is 33',
    excerpt:
      'Healthcare averages 33/100 on the Agent Readiness Score — the lowest of any major vertical. We break down why HIPAA, PDF forms, and phone-only booking make healthcare invisible to AI agents, and what agent-ready healthcare actually looks like.',
    date: '2026-04-15',
    readTime: '15 min read',
    href: '/blog/healthcare-agent-readiness',
    tag: 'Industry Analysis',
    tagColor: 'amber',
    icon: Heart,
  },
  {
    title: 'How to Improve Your Agent Readiness Score: A Step-by-Step Guide',
    excerpt:
      'The 10-step playbook to improve your Agent Readiness Score. Real examples from 500 businesses, estimated effort for each step, and the exact changes that moved companies from Bronze to Silver. Phase 1 takes an afternoon.',
    date: '2026-04-15',
    readTime: '16 min read',
    href: '/blog/improve-agent-readiness-score',
    tag: 'How-To Guide',
    tagColor: 'green',
    icon: Wrench,
  },
  {
    title: 'Is Your Business Invisible to AI Agents?',
    excerpt:
      'We scanned 500 businesses. 40% are completely invisible to AI agents. Find out where you stand with a free 60-second Agent Readiness Score — and what it takes to go from dark to discoverable.',
    date: '2026-04-16',
    readTime: '12 min read',
    href: '/blog/invisible-to-ai-agents',
    tag: 'Getting Started',
    tagColor: 'green',
    icon: Eye,
  },
  {
    title: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
    excerpt:
      'Out of 500 businesses scanned, only Resend scored Gold (75). Here is exactly what they do right across all 9 dimensions — and why the next closest companies are 3 points away.',
    date: '2026-04-16',
    readTime: '14 min read',
    href: '/blog/resend-only-gold',
    tag: 'Case Study',
    tagColor: 'amber',
    icon: Award,
  },
  {
    title: 'Why Most SaaS Companies Score Bronze for Agent Readiness',
    excerpt:
      'We scanned 500 businesses. 50% scored Bronze. Here is why SaaS companies with great APIs still fail at agent readiness — and what the top 10% do differently across all 9 dimensions.',
    date: '2026-04-16',
    readTime: '15 min read',
    href: '/blog/saas-agent-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: Code2,
  },
  {
    title: 'What Is Agent Readiness? The Complete Guide',
    excerpt:
      'The definitive explainer: why agent readiness matters, the 7 ARL levels, the 6-step agent journey, 9 scoring dimensions, and data from scanning 238+ businesses. If you read one article about agent readiness, make it this one.',
    date: '2026-03-30',
    readTime: '18 min read',
    href: '/blog/what-is-agent-readiness',
    tag: 'Complete Guide',
    tagColor: 'emerald',
    icon: Globe,
  },
  {
    title: 'What Agent-Ready Means for Restaurants — From PDF Menus to AI Agents',
    excerpt:
      '60% of restaurants are invisible to AI agents. Learn the 5-level progression from PDF menus and phone reservations to a restaurant with its own AI agent that negotiates group bookings and fills empty tables automatically.',
    date: '2026-03-30',
    readTime: '14 min read',
    href: '/blog/agent-ready-restaurants',
    tag: 'Industry Analysis',
    tagColor: 'amber',
    icon: UtensilsCrossed,
  },
  {
    title: 'State of Agent Readiness: Most Businesses Score Under 40',
    excerpt:
      'After scanning 132+ businesses across 15 verticals, the data is clear: the average Agent Readiness Score is 36/100. Here is what that means for the $3-5T agent economy and what businesses can do about it.',
    date: '2026-03-28',
    readTime: '8 min read',
    href: '/report/state-of-readiness',
    tag: 'Research',
    tagColor: 'emerald',
    icon: BarChart3,
  },
  {
    title: 'What Makes Stripe Score 68 Silver',
    excerpt:
      'A deep breakdown of how Stripe earned a Silver-tier Agent Readiness Score. We analyze all 9 dimensions — from API quality and auth-protected JSON responses to MCP readiness and structured pricing — to show what "good" looks like.',
    date: '2026-03-27',
    readTime: '12 min read',
    href: '/blog/why-stripe-scores-68',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: TrendingUp,
  },
  {
    title: 'The 6-Step Agent Journey Every Business Should Know',
    excerpt:
      'AI agents follow a predictable 6-step journey when interacting with businesses: Find, Understand, Sign Up, Connect, Use, Pay. Most businesses fail at step 1. Learn the full framework and how to optimize each step.',
    date: '2026-03-26',
    readTime: '6 min read',
    href: '/about',
    tag: 'Framework',
    tagColor: 'purple',
    icon: Lightbulb,
  },
  {
    title: 'Agent Readiness Levels Explained: From Dark to Interoperable',
    excerpt:
      'The complete guide to the 7 Agent Readiness Levels (ARL-0 through ARL-6). Learn what each level means with real examples, why ARL-3 is the revenue inflection point, and how to check your level in 60 seconds.',
    date: '2026-03-26',
    readTime: '10 min read',
    href: '/blog/arl-levels-explained',
    tag: 'Framework',
    tagColor: 'purple',
    icon: Layers,
  },
  {
    title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
    excerpt:
      'There are 33 million small businesses in the US. Zero have MCP servers. That is a $6.2B infrastructure gap that will define who wins the agent economy. Our research shows exactly where the opportunity lies.',
    date: '2026-03-25',
    readTime: '10 min read',
    href: '/blog/mcp-gap',
    tag: 'Market Analysis',
    tagColor: 'amber',
    icon: Zap,
  },
  {
    title: 'Shopify vs WooCommerce: Which is More Agent-Ready?',
    excerpt:
      'We scanned dozens of Shopify and WooCommerce stores to compare agent readiness. Shopify wins on discoverability with public JSON endpoints. WooCommerce wins on API depth with its Store API. Neither scores above 50 without help.',
    date: '2026-03-24',
    readTime: '9 min read',
    href: '/blog/shopify-vs-woocommerce',
    tag: 'Comparison',
    tagColor: 'cyan',
    icon: FileText,
  },
  {
    title: 'How to Become Agent-Ready in 60 Seconds',
    excerpt:
      'The fastest path from invisible to agent-ready: connect your business to AgentHermes. We auto-generate your agent card, MCP endpoint, llms.txt, and structured pricing. One form, 60 seconds, full agent infrastructure.',
    date: '2026-03-23',
    readTime: '4 min read',
    href: '/connect',
    tag: 'Getting Started',
    tagColor: 'green',
    icon: BookOpen,
  },
]

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getTagClasses(color: string): { bg: string; border: string; text: string } {
  const map: Record<string, { bg: string; border: string; text: string }> = {
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
  }
  return map[color] || map.emerald
}

export default function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Agent Economy Insights',
    description: 'Research, data, and analysis from scanning 132+ businesses for agent readiness.',
    url: 'https://agenthermes.ai/blog',
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      url: `https://agenthermes.ai${article.href}`,
      author: {
        '@type': 'Organization',
        name: 'AgentHermes',
      },
    })),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://agenthermes.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
      ],
    },
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-zinc-400">Blog</span>
            </div>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <BookOpen className="h-4 w-4" />
              Agent Economy Insights
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Research &amp; <span className="text-emerald-500">Analysis</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mx-auto mb-4">
              Research, data, and analysis from scanning 500+ businesses.
            </p>

            <p className="text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto">
              Insights on agent readiness scores, MCP adoption, ecommerce platform
              comparisons, and the infrastructure gap defining the agent economy.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Featured</span>
          </div>
          <Link
            href={articles[0].href}
            className="group relative block rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all overflow-hidden article-card-hover"
          >
            {/* Hero gradient image area */}
            <div className="relative h-48 sm:h-64 lg:h-72 featured-hero-gradient">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#09090b] to-transparent" />
              {/* Floating score badge */}
              <div className="absolute top-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900/80 border border-emerald-500/30 backdrop-blur-sm badge-glow">
                {(() => { const FeaturedIcon = articles.at(0)!.icon; return <FeaturedIcon className="h-6 w-6 text-emerald-400" />; })()}
              </div>
            </div>

            <div className="relative p-8 lg:p-10 bg-emerald-500/5">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  Featured
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${getTagClasses(articles[0].tagColor).bg} border ${getTagClasses(articles[0].tagColor).border} ${getTagClasses(articles[0].tagColor).text} text-xs font-medium`}>
                  {articles[0].tag}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">
                {articles[0].title}
              </h2>

              <p className="text-zinc-400 leading-relaxed mb-6 max-w-3xl text-base sm:text-lg">
                {articles[0].excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-zinc-600" />
                  <span className="font-medium">{formatDate(articles[0].date)}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-zinc-600" />
                  <span className="font-medium">{articles[0].readTime}</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== ARTICLE GRID ===== */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(1).map((article) => {
              const tagClasses = getTagClasses(article.tagColor)
              return (
                <Link
                  key={article.title}
                  href={article.href}
                  className="group relative flex flex-col p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600/80 article-card-hover"
                >
                  {/* Small gradient accent at top */}
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon + Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/50 group-hover:border-zinc-600/50 transition-colors">
                      <article.icon className={`h-5 w-5 ${tagClasses.text} icon-hover-bounce`} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${tagClasses.bg} border ${tagClasses.border} ${tagClasses.text} text-xs font-semibold`}
                    >
                      {article.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-emerald-400 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta - more prominent date/time */}
                  <div className="flex items-center gap-4 text-xs mt-auto pt-4 border-t border-zinc-800/50">
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                      <span className="font-medium">{formatDate(article.date)}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Clock className="h-3.5 w-3.5 text-zinc-600" />
                      <span className="font-medium">{article.readTime}</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto font-medium">
                      Read
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Want to see your own score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See how your
            business compares across all 9 dimensions.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Score My Business
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
