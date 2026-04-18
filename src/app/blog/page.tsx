import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  Anchor,
  ArrowRight,
  Award,
  Baby,
  Banknote,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  Car,
  CheckSquare,
  Church,
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
  Package,
  Phone,
  FileSearch,
  FileSpreadsheet,
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
  Sparkle,
  Sparkles,
  TrendingUp,
  UserPlus,
  UtensilsCrossed,
  Bot,
  Terminal,
  Rocket,
  MapPinned,
  Truck,
  Wheat,
  BookText,
  BookA,
  Stethoscope,
  FileType,
  Scale,
  Wrench,
  Blocks,
  CalendarCheck,
  Cloud,
  Users,
  Scissors,
  Gavel,
  PawPrint,
  Receipt,
  ShieldHalf,
  TestTube,
  Pill,
  Ticket,
  Wifi,
  Handshake,
  Wallet,
  Workflow,
  ScrollText,
  SprayCan,
  FileWarning,
  KeySquare,
  Zap,
  Gamepad2,
  Languages,
  Building,
  LineChart,
  Music,
  Router,
  Bug,
  Hexagon,
  Wine,
  BookOpenCheck,
  CloudCog,
  Store,
  ParkingCircle,
  Clock3,
  Armchair,
  HardDrive,
  Accessibility,
  Printer,
  Box,
  Beaker,
  UserSearch,
  Trees,
  LayoutTemplate,
  BadgeCheck,
  Shirt,
  Puzzle,
  Glasses,
  Flag,
  Microscope,
  Target,
  Hammer,
  GitPullRequest,
  HandCoins,
  Camera,
  FileCheck,
  Video,
  Brain,
  ShieldQuestion,
  Flower2,
  Gem,
  Binary,
  Kanban,
  Trash2,
  Cable,
  AreaChart,
  Swords,
  Antenna,
  NotebookPen,
  Sun,
  SquareStack,
  Pen,
  Palette,
  HardDriveDownload,
  ArrowDownRight,
  Bell,
  ChefHat,
  CircleDollarSign,
  Library,
  Fingerprint,
  Navigation,
  Flower,
  ToggleRight,
  Diff,
  HeartPulse,
  Minimize2,
  GitFork,
  Tent,
  Orbit,
  PartyPopper,
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
    title: '200 Blog Articles on Agent Readiness: The Definitive Content Library Is Complete',
    excerpt:
      '200 articles. 40+ verticals. All 9 dimensions. 15+ case studies. 4 framework tutorials. 3 GEO pages. IsAgentReady has 0 articles. AgentSpeed has 1 blog post. We have 200. This IS the topical authority on agent readiness. No competitor has anything close to this library.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/two-hundred-blog-articles',
    tag: 'Milestone',
    tagColor: 'amber',
    icon: PartyPopper,
  },
  {
    title: 'The AI Agent Marketplace: Why Agent Readiness Scores Will Become the New Google Reviews',
    excerpt:
      'Google Reviews became the trust signal for human consumers. Agent Readiness Scores will become the trust signal for AI agent consumers. Agents will check scores before calling APIs, prefer Silver+ businesses, avoid unscored ones. The marketplace shift: from human discovery (Google search) to agent discovery (registry + score). AgentHermes is building this — the registry, the score, the standard.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/ai-agent-marketplace-future',
    tag: 'Thought Leadership',
    tagColor: 'purple',
    icon: Orbit,
  },
  {
    title: 'Camping and Outdoor Recreation Agent Readiness: Why National Parks and Campgrounds Can\'t Be Reserved by AI',
    excerpt:
      '$28B US outdoor recreation economy. Recreation.gov exists (semi-structured) but individual campgrounds, RV parks, glamping sites: phone booking only. No structured API for site availability, amenity listings, seasonal pricing. Agent-ready: campsite availability API, amenity catalog, weather-conditional booking, equipment rental, group reservation management. AI trip planning agents need campground data — and there is none.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/camping-outdoor-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Tent,
  },
  {
    title: 'Therapy and Counseling Agent Readiness: Why Mental Health Providers Are Dark to AI Wellness Agents',
    excerpt:
      '$280B US mental health market. Therapist directories (Psychology Today, BetterHelp) exist but individual practices: phone-only intake, no availability API, insurance verification manual. Privacy concerns (HIPAA) are real but don\'t prevent structured APIs. Agent-ready: availability checker (no PHI needed), specialization catalog, insurance acceptance endpoint, intake form submission. AI wellness agents will match patients to therapists — first practice with MCP captures every AI health assistant\'s referrals.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/therapy-counseling-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: HeartPulse,
  },
  {
    title: 'Response Compression and Agent Readiness: Why gzip and Brotli Save Agents Money',
    excerpt:
      'Agents pay per token. Compressed responses transfer faster and cost less. gzip: universally supported. Brotli: 15-20% smaller than gzip. AgentHermes D8 Reliability rewards fast response times — compression directly improves TTFB. Most CDNs auto-compress but many origin servers don\'t. Check: Accept-Encoding: gzip, br in request, Content-Encoding in response. The cheapest D8 improvement: enable compression (usually 1 config line).',
    date: '2026-04-15',
    readTime: '10 min read',
    href: '/blog/compression-encoding-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: Minimize2,
  },
  {
    title: 'Why Pipedream and Airbyte Score 63: The Data Pipeline Platform Pattern',
    excerpt:
      'Dual case study: Pipedream 63, Airbyte 63 — identical Silver scores from data pipeline/integration platforms. The pattern: platforms that connect APIs to other APIs are naturally agent-friendly. Both have: REST APIs, self-service onboarding, hundreds of integrations. Both lack: agent-card.json, MCP, enterprise pricing transparency. The irony: they help OTHER businesses become more connected but haven\'t made themselves agent-discoverable.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/pipedream-airbyte-agent-readiness',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: GitFork,
  },
  {
    title: 'Florist and Garden Center Agent Readiness: Why Flower Delivery Can\'t Be Automated by AI Agents',
    excerpt:
      '$35B US floral market. Phone/walk-in ordering, seasonal inventory (what\'s blooming changes daily), delivery zones manual, custom arrangements require consultation. 1-800-Flowers has an API but individual florists: zero. Agent-ready: product catalog API with real-time availability, delivery zone checker, arrangement customization builder, occasion-based recommendations, recurring delivery scheduling. AI gift agents will send flowers — first florist with MCP gets every AI assistant birthday order.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/florist-garden-center-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Flower,
  },
  {
    title: 'Feature Flags and Agent Readiness: Why Gradual Rollouts Affect AI Agent Behavior',
    excerpt:
      'Feature flags (LaunchDarkly, GrowthBook, Unleash) affect agent behavior. When you flag-gate an API feature: some agents see it, some don\'t. This creates inconsistent D2 API Quality scores. Agent-ready feature flag practices: flag state in response headers, API version pinning per agent client, gradual rollout that treats agent User-Agents as a segment. Don\'t surprise agents with different behavior than what your docs promise.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/feature-flags-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: ToggleRight,
  },
  {
    title: 'AgentHermes vs AgentSpeed: Weighted Scoring vs Category-Based Agent Readiness Assessment',
    excerpt:
      'Second competitor comparison (after IsAgentReady). AgentSpeed: 0-100 weighted score across 10 checks, transparent methodology blog. AgentHermes: 9-dimension weighted scoring, 500+ businesses scanned, vertical-specific profiles, auto-generate agent infrastructure. Both use weighted scores. AgentSpeed is simpler (10 checks). AgentHermes is deeper (9 dimensions with sub-signals, vertical weights, auth-aware scoring). Both are new — market wide open. Use both for comprehensive assessment.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/agenthermes-vs-agentspeed',
    tag: 'Comparison',
    tagColor: 'cyan',
    icon: Diff,
  },
  {
    title: 'Library and Museum Agent Readiness: Why Cultural Institutions Are Missing the AI Discovery Wave',
    excerpt:
      '55,000+ US libraries and museums with rich digital catalogs (OPAC, collection databases) but almost no public APIs. Exceptions: Library of Congress, Smithsonian Open Access. Most local institutions: website + phone, avg score ~4. Agent-ready: collection search API, event calendar endpoint, ticket booking, educational program registration. AI cultural agents will recommend exhibits and reserve tickets — but only if institutions expose structured data.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/library-museum-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Library,
  },
  {
    title: 'Request Tracing and Agent Readiness: Why X-Request-ID Is the Header That Builds Agent Trust',
    excerpt:
      'X-Request-ID enables debugging across agent-API interactions. When an agent gets a 500, it needs a request ID to report the issue. Without it: "something broke" (useless). With it: "request abc123 failed" (actionable). AgentHermes D9 Agent Experience checks for X-Request-ID in response headers. Stripe includes it on every response. 87% of scanned APIs do not. Implementation: 1 line of middleware. Impact: immediate D9 score improvement.',
    date: '2026-04-15',
    readTime: '10 min read',
    href: '/blog/request-tracing-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: Fingerprint,
  },
  {
    title: 'The Road to 200 Articles: What AgentHermes Learned Building the Largest Agent Readiness Content Library',
    excerpt:
      'Milestone piece approaching 200 articles. What we learned across 60+ cycles: (1) Verticals are infinite — every industry has unique agent readiness challenges. (2) The same 3 missing files (agent-card, llms.txt, MCP) block every Silver from Gold. (3) Case studies outperform generic guides. (4) The content itself proves the product — 200 data-driven articles means the scoring system works. (5) Next phase: getting Google to index them and AI models to cite them.',
    date: '2026-04-15',
    readTime: '10 min read',
    href: '/blog/two-hundred-articles-roadmap',
    tag: 'Milestone',
    tagColor: 'emerald',
    icon: Navigation,
  },
  {
    title: 'Catering Agent Readiness: Why Event Caterers Cannot Receive Orders From AI Event Planning Agents',
    excerpt:
      '$65B US catering market. Menu customization requires human consultation, pricing by headcount/menu (not structured), dietary requirements manual, delivery logistics phone-based. Agent-ready: menu catalog API with dietary filters, price calculator by headcount/menu, availability checker, order submission endpoint, deposit payment, delivery scheduling. AI event planning agents will manage catering alongside venues and entertainment.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/catering-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: ChefHat,
  },
  {
    title: 'Token Counting and Agent Readiness: Why Response Size Matters for AI Agent Costs',
    excerpt:
      'Agents pay per token (input + output). Bloated API responses = expensive agent calls. Agent-ready APIs return minimal JSON (no HTML wrapper, no marketing copy in errors, no unnecessary fields). D6 Data Quality and D9 Agent Experience reward concise responses. Stripe returns ~200 tokens per typical response. Legacy APIs return 2000+ tokens of XML/HTML. The leaner your API, the cheaper agents can use it — which means more agent traffic.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/token-counting-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: CircleDollarSign,
  },
  {
    title: 'Why OpsGenie Scores 67: The Incident Management Platform That Is Almost Gold',
    excerpt:
      'Case study: OpsGenie scored 67 Silver. Incident management platform — agents need to create alerts, acknowledge incidents, escalate, resolve. Strong: REST API, OAuth, webhooks, alert management, on-call schedule API. Where it loses: D4 (Atlassian enterprise pricing), D9 (no agent-card, no MCP despite being perfect for agent-driven incident response). What makes incident management platforms natural agent targets.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/opsgenie-agent-readiness-breakdown',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: Bell,
  },
  {
    title: 'Tattoo and Piercing Studio Agent Readiness: Why Body Art Businesses Score Under 5',
    excerpt:
      '$3.5B US tattoo industry. 21K+ studios booking via Instagram DMs, portfolios on social media, pricing "starts at" (varies by size/complexity/artist), consultations required. No structured data for anything. Agent-ready: artist portfolio API with style tags, appointment booking endpoint, pricing estimator by design parameters, aftercare information JSON. AI personal styling agents will recommend tattoo artists — but only if studios expose structured data.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/tattoo-piercing-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Palette,
  },
  {
    title: 'Caching Strategies for Agent-Ready APIs: When to Cache, What to Invalidate',
    excerpt:
      'Agent-specific caching considerations. Agents call the same endpoints repeatedly — proper caching reduces their costs and your server load. Cache-Control headers: max-age, s-maxage, stale-while-revalidate. ETag/If-None-Match for conditional requests (304 Not Modified = agent saves tokens). CDN caching for static data (product catalogs, pricing). No-cache for real-time data (availability, inventory). AgentHermes D8 Reliability rewards proper cache headers.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/caching-strategies-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: HardDriveDownload,
  },
  {
    title: 'Why Tally and Growthbook Both Score 64-65: The Developer Tool Silver Plateau',
    excerpt:
      'Dual case study: Tally 65, Growthbook 64. The "Silver Plateau" — where good developer tools get stuck. Both have: clean APIs, self-service onboarding, good docs. Both lack: agent-card.json, MCP, llms.txt. The 64-65 score is the natural ceiling for developer tools without agent-native features. What breaks through: the same 3 files that separate every Silver from Gold.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/tally-growthbook-agent-readiness',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: ArrowDownRight,
  },
  {
    title: 'Marina and Boating Agent Readiness: Why Dock Slips and Charter Services Cannot Be Booked by AI',
    excerpt:
      '$50B US recreational boating. Marina slips booked by phone and VHF radio. Seasonal pricing varies by boat length with no availability API anywhere. Charter services: booking via phone/email, pricing opaque, weather-dependent availability unstructured. Agent-ready: slip availability API by boat size, charter catalog with pricing, weather-conditional booking, fuel dock pricing endpoint. AI trip planning agents need marina data.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/marina-boating-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Anchor,
  },
  {
    title: 'API Documentation Standards for Agent Readiness: OpenAPI vs AsyncAPI vs Smithy vs RAML',
    excerpt:
      'Head-to-head comparison of 4 API description standards through the agent readiness lens. OpenAPI scores 91 on agent readiness (most agents auto-discover it). AsyncAPI: 58 (essential for webhooks, complements OpenAPI). Smithy: 38 (powerful modeling, minimal agent tooling). RAML: 32 (declining adoption, convert to OpenAPI). For D1 Discovery and D9 Agent Experience, OpenAPI wins decisively.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/api-documentation-standards',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: FileSpreadsheet,
  },
  {
    title: 'Why Robinhood and Allstate Both Score 66: The Regulated Industry Silver Pattern',
    excerpt:
      'Dual case study: Robinhood 66, Allstate 66 — identical scores from completely different industries (fintech vs insurance). The pattern: heavily regulated industries can still score Silver when they build developer-first digital experiences. Both have mobile-first architecture with APIs, OAuth, structured data. Both lack agent-card.json, MCP, full pricing transparency. Regulation is not the barrier — architecture is.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/robinhood-allstate-agent-readiness',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: Scale,
  },
  {
    title: 'Solar and Renewable Energy Agent Readiness: Why Clean Energy Installers Cannot Be Hired by AI',
    excerpt:
      '$50B US solar market. Estimates require site assessment (roof angle, shade, panel count), pricing varies by kW, incentive calculations complex (ITC, state rebates, net metering). No structured API for any of it. Agent-ready: instant estimate API (address-based solar potential), incentive calculator endpoint, installation scheduling, monitoring dashboard API. AI home improvement agents will compare solar quotes — first installer with MCP wins.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/solar-energy-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Sun,
  },
  {
    title: 'Batch APIs and Agent Readiness: Why Bulk Operations Score Higher Than One-at-a-Time Endpoints',
    excerpt:
      'Agents process thousands of items. One-at-a-time endpoints = 1000 API calls. Batch endpoints = 1 call with 1000 items. This matters for D8 Reliability (less chance of partial failure), D9 Agent Experience (faster workflows), and D2 API Quality (batch support = mature API). Stripe has batch operations. Most APIs do not. Agent-ready: /batch endpoint accepting arrays, bulk status checks, aggregate responses, partial failure handling.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/batch-api-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: SquareStack,
  },
  {
    title: 'Why Craft.do Scores 68: The Note-Taking App That Outscores Most Enterprise SaaS',
    excerpt:
      'Case study: Craft.do scored 68 Silver — tied with Stripe and Slack. Surprising for a note-taking/document app. Strong: structured API for document management, clean auth, good docs, fast responses. The pattern: single-purpose apps with well-designed APIs consistently score Silver. What keeps it from Gold: same 3 missing files (agent-card.json, llms.txt, MCP) that every Silver business lacks.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/craft-agent-readiness-breakdown',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: Pen,
  },
  {
    title: 'Martial Arts and Dance Studio Agent Readiness: Why Class-Based Businesses Score Under 10',
    excerpt:
      '$35B US class-based market. Dojos, dance studios, yoga studios share a model: recurring classes, instructor expertise, student progression. None of it is accessible to AI agents. Class schedules on paper, registration by phone, belt ranks in binders. AI family scheduling agents managing kids across martial arts, dance, and tutoring are completely blocked. Agent-ready: class schedule API, enrollment endpoint, student level tracking, competition registration, uniform ordering.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/martial-arts-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Swords,
  },
  {
    title: 'SSE vs WebSocket for Agent Readiness: Why Server-Sent Events Are the Agent-Preferred Transport',
    excerpt:
      'MCP uses SSE (Server-Sent Events) as its primary transport, not WebSocket. Why: SSE is HTTP-native (works through proxies/CDNs), one-directional server push, auto-reconnects with Last-Event-ID, simpler auth via standard HTTP headers. WebSocket is bidirectional but harder to proxy, auth at connection time only, no HTTP caching. For agent readiness: SSE = more compatible, easier to deploy, used by the MCP standard. AgentHermes checks for SSE support on MCP endpoints.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/sse-websocket-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: Antenna,
  },
  {
    title: 'Why Mintlify Scores 66: The Documentation Platform That Helps Others Score Higher',
    excerpt:
      'Case study: Mintlify 66 Silver. A documentation platform used by Anthropic, Supabase, and Cursor that helps other companies improve their D2 API Quality scores — but its own agent readiness has the same gaps as everyone else. Strong: own API, structured docs, self-service onboarding, solid security. Weak: no agent-card.json, no MCP, enterprise pricing gated. The irony: Mintlify could score Gold overnight by adding the files it tells others to create.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/mintlify-agent-readiness-breakdown',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: NotebookPen,
  },
  {
    title: 'Waste Management and Recycling Agent Readiness: Why Trash Collection Can\'t Be Scheduled by AI',
    excerpt:
      '$100B US waste management. Pickup schedules fixed by municipality, no API for schedule changes, recycling rules vary by zip code and are not structured. Agent-ready: pickup schedule API, service change endpoint, recycling rules by material/location, bulk pickup request, billing management. Republic Services and Waste Management have apps but no public API. AI home management agents are completely blocked.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/waste-recycling-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Trash2,
  },
  {
    title: 'gRPC and Agent Readiness: Why Protocol Buffers Score Differently Than REST',
    excerpt:
      'Technical comparison. gRPC: binary protocol, proto files define schema (like OpenAPI but compiled), streaming, faster than REST. But harder for agents to discover — no /openapi.json equivalent that agents auto-detect, binary means no curl testing, requires code generation. REST with OpenAPI wins on D1 Discoverability. gRPC wins on D8 Reliability and D2 API Quality. Best practice: REST for discovery + gRPC for performance-critical paths.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/grpc-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'cyan',
    icon: Cable,
  },
  {
    title: 'Why Amplitude and Power BI Both Score 66: The Analytics Platform Pattern',
    excerpt:
      'Dual case study: Amplitude 66, Power BI 66 — identical Silver scores but different products. Amplitude: product analytics API, cohort endpoints, event tracking. Power BI: visualization API, dataset management, embed endpoints. Both win on D2 API Quality and D7 Security. Both lose on D4 Pricing (enterprise-gated) and D9 Agent Experience (zero agent-native infrastructure). The analytics platform pattern: data-rich but agent-poor.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/amplitude-powerbi-agent-readiness',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: AreaChart,
  },
  {
    title: 'Jewelry and Luxury Goods Agent Readiness: Why High-End Retailers Are Dark to AI Shopping Agents',
    excerpt:
      '$350B global luxury market. Intentionally opaque: "price on request," appointment-only showrooms, no public inventory. The luxury paradox: exclusivity = anti-agent by design. But AI personal shoppers serving HNW clients need structured data. Agent-ready luxury: authenticated product catalog API, appointment scheduling, price-qualified viewing, provenance JSON. The first luxury brand with an MCP for VIP agents captures the concierge market.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/jewelry-luxury-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Gem,
  },
  {
    title: 'Building Agent-Ready APIs with Go and Rust: A Systems Developer\'s Guide',
    excerpt:
      'Fourth framework tutorial. Go: net/http + chi, swaggo for OpenAPI, structured error middleware, /healthz convention. Rust: Axum, utoipa for OpenAPI, custom error types, Tower middleware. Both excel at low latency (D8 boost) and memory safety (D7 boost). Copy-paste code for each: error handler, health endpoint, OpenAPI, CORS, auth middleware, agent-card.json serving.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/go-rust-agent-readiness-tutorial',
    tag: 'Tutorial',
    tagColor: 'cyan',
    icon: Binary,
  },
  {
    title: 'Why Monday and Jira Both Score 65-66: The Project Management Platform Pattern',
    excerpt:
      'Dual case study: Monday 65, Jira 66 — project management platforms built for team productivity. Strong: REST/GraphQL APIs, OAuth, webhooks, marketplace integrations. Weak: enterprise pricing gated, no agent-card.json, complex permission models that confuse agents. The pattern: tools built for human collaboration score Silver because they already have APIs — but human-centric UX assumptions hold them back from Gold.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/monday-jira-agent-readiness',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: Kanban,
  },
  {
    title: 'Why Roboflow Scores 66: The Computer Vision Platform That\'s Almost Gold',
    excerpt:
      'Roboflow scored 66 Silver — an AI/ML platform scoring well. Strong REST API for model deployment, D2 API Quality at 85, D3 Onboarding strong (free tier, API key in 30 seconds). Where it loses: D4 Pricing (usage-based but not fully structured), D9 at 18 (no agent-card.json, no MCP). What pushes AI/ML platforms to Gold: MCP tools for model inference, structured pricing API, agent-card. 9 points from Gold.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/roboflow-agent-readiness-breakdown',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: Brain,
  },
  {
    title: 'AI Agent Trust: Why Businesses Need to Score the Agents Calling Their APIs (Not Just the Other Way Around)',
    excerpt:
      'AgentHermes scores businesses. But businesses also need to score agents: Know Your Agent (KYA). Which agents are trustworthy? Which are malicious scrapers pretending to be agents? Agent identity signals: OAuth client registration, User-Agent declaration, rate-limit compliance, payment capability. The trust is bidirectional — businesses need agent readiness, and agents need business trust.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/ai-agent-trust-scoring',
    tag: 'Thought Leadership',
    tagColor: 'purple',
    icon: ShieldQuestion,
  },
  {
    title: 'Funeral Services Agent Readiness: The Most Sensitive Industry AI Agents Will Eventually Serve',
    excerpt:
      '$23B US funeral market. The most sensitive vertical: families in grief need information but are emotionally overwhelmed. Phone-only booking, pricing opaque despite FTC Funeral Rule requiring disclosure. Agent-ready: structured service catalog with FTC-compliant pricing, availability calendar, pre-planning API. AI estate planning agents will need funeral service data. Average score: under 8.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/funeral-services-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Flower2,
  },
  {
    title: 'Photography and Videography Agent Readiness: Why Creative Professionals Can\'t Be Booked by AI',
    excerpt:
      '$40B creative services market runs on Instagram portfolios, DM booking, and "starts at" pricing. No structured portfolio catalog, no availability API, no package builder endpoint. AI event planning agents will book photographers — the first one with an MCP server captures the wedding and corporate market. Average score: under 10.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/photography-videography-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Camera,
  },
  {
    title: 'SLAs and Uptime Guarantees: Why 99.9% Isn\'t Enough for Agent Readiness',
    excerpt:
      'D8 Reliability (0.13 weight) rewards documented SLAs. But agents need more than "99.9% uptime" on a marketing page. Agent-ready SLA: machine-readable SLA document (JSON), real-time uptime percentage endpoint, incident history API, planned maintenance calendar, compensation terms for downtime. AgentHermes checks for SLA documentation, not just uptime claims. The difference between "we\'re reliable" and proving it.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/sla-uptime-agent-readiness',
    tag: 'Technical Analysis',
    tagColor: 'blue',
    icon: FileCheck,
  },
  {
    title: 'Why TikTok Scores 69 for Agent Readiness: The Social Platform That Outperforms Most SaaS',
    excerpt:
      'TikTok scored 69 Silver — #5 in our 500-business scan. Surprising because it\'s a social/entertainment platform, not developer infrastructure. Why: robust developer API (TikTok for Developers), OAuth 2.0, structured content endpoints, analytics API, ad management API. Where it loses: D4 Pricing (ad spend not transparent), D5 Payment (no x402). What keeps it from Gold: no agent-card.json, no MCP, no llms.txt.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/tiktok-agent-readiness-breakdown',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: Video,
  },
  {
    title: 'Auto Repair Agent Readiness: Why Mechanics and Body Shops Can\'t Be Booked by AI Service Agents',
    excerpt:
      '$300B US auto repair market. Diagnosis requires physical inspection, pricing varies by vehicle/issue, parts availability uncertain. No structured API for service catalog, availability, or pricing. Agent-ready: service type catalog API, diagnostic code lookup, appointment scheduling endpoint, parts availability checker, estimate calculator by vehicle/service. AI vehicle management agents will schedule maintenance — first shop with MCP wins fleet management contracts. Average score: under 12.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/auto-repair-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Hammer,
  },
  {
    title: 'CI/CD and Agent Readiness: How GitHub Actions, Vercel, and Netlify Score for Deployment Agents',
    excerpt:
      'CI/CD platforms are natural agent targets — deployment agents need to trigger builds, check status, roll back. GitHub Actions: structured API, webhook events, status checks, score 68. Vercel: deployment API, instant rollback, preview URLs, score 69. Netlify: build hooks, deploy notifications, score 62. All score 60+ because they are built for automation. The pattern: platforms built for machines score highest. What is missing: no MCP servers for any of them yet.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/ci-cd-agent-readiness',
    tag: 'Platform Analysis',
    tagColor: 'blue',
    icon: GitPullRequest,
  },
  {
    title: 'Charity Fundraising Agent Readiness: Why GoFundMe and Kickstarter Lock Out AI Giving Agents',
    excerpt:
      'Crowdfunding/fundraising platforms: GoFundMe (no public API, score 8), Kickstarter (limited API, score 18), Donorbox (basic API, score 32). Agent-ready fundraising: campaign catalog API, donation endpoint, impact reporting JSON, matching fund automation, recurring donation management. AI giving agents will allocate philanthropic budgets — platforms without APIs lose to those with structured donation interfaces. Every.org leads at 41 but still no MCP server.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/charity-fundraising-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: HandCoins,
  },
  {
    title: 'SEM and PPC Agent Readiness: Why Google Ads Has APIs But Most Ad Agencies Score Zero',
    excerpt:
      'Google Ads has 200+ REST endpoints. Meta Ads has the Marketing API. Every major ad platform is fully programmable. But the 25,000+ agencies managing those platforms for clients? Average agent readiness score: 8/100. No structured reporting API, no campaign performance endpoint, no budget management for agents. Agent-ready ad agencies need campaign performance API, automated bid management, budget allocation endpoint, creative testing automation. AI marketing agents will manage ad spend directly — agencies without APIs lose control to platforms.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/sem-ppc-agent-readiness',
    tag: 'Market Analysis',
    tagColor: 'amber',
    icon: Target,
  },
  {
    title: 'How to Test Your MCP Server: Validation, Debugging, and Scoring Impact',
    excerpt:
      'Companion to the build tutorial. After building your MCP server, how do you validate it works? 5 methods: MCP Inspector for visual validation, Claude Desktop for real agent testing, curl for JSON-RPC 2.0 verification, automated Jest test suite, and AgentHermes scan for D2 scoring impact. Plus the 6 most common MCP server bugs (wrong method names, missing error handling, auth not forwarded, SSE keep-alive, missing required fields, vague descriptions) with exact fixes. A broken MCP server is worse than no MCP server.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/testing-mcp-server-guide',
    tag: 'Technical Guide',
    tagColor: 'purple',
    icon: Microscope,
  },
  {
    title: '154 Articles Later: The Content Strategy That Made AgentHermes the Agent Readiness Authority',
    excerpt:
      '50 content cycles. 154 articles. 30+ verticals. Zero manual distribution. What we learned: brain-driven content catches mistakes generic AI misses (caught a wrong stat before publish). Every article uses real scan data from 500+ businesses. Git push triggers the entire pipeline — deploy, indexing, community posting. Vertical coverage builds more authority than depth in a new category. Four content types (technical, vertical, case study, reference) create complete topical authority. What is next: getting indexed, getting cited, getting users.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/one-fifty-articles-lessons',
    tag: 'Milestone',
    tagColor: 'emerald',
    icon: Flag,
  },
  {
    title: 'Dry Cleaning and Laundry Agent Readiness: Why Your Cleaner Can\'t Be Scheduled by AI',
    excerpt:
      '$10B US dry cleaning market. Phone/walk-in only, no pickup scheduling API, no garment pricing by type, no order tracking. Agent-ready dry cleaning needs garment pricing catalog API, pickup/delivery scheduling endpoint, order status tracking, and recurring service management. AI personal assistants managing wardrobe care need structured data. The first cleaner with an MCP server captures every AI concierge\'s recurring business. Average score: 7/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/dry-cleaning-laundry-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Shirt,
  },
  {
    title: 'Microservices vs Monolith: Which Architecture Scores Higher for Agent Readiness',
    excerpt:
      'Architectural comparison through the agent readiness lens. Monolith with OpenAPI: 55-70 score range, single discovery surface, consistent errors. Microservices with API gateway: 50-65, same score potential but harder setup. Microservices without gateway: 25-40, fragmented discovery kills the score. Neither architecture is inherently better — API surface design determines agent readiness. Data from 500 business scans reveals the gateway is the equalizer.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/microservices-monolith-agent-readiness',
    tag: 'Architecture Analysis',
    tagColor: 'blue',
    icon: Puzzle,
  },
  {
    title: 'Optometry and Eye Care Agent Readiness: Why Vision Providers Are Invisible to AI Health Agents',
    excerpt:
      '$45B US eye care market. Exam scheduling by phone, insurance verification manual, frame/lens catalogs in-store only, prescription records in siloed portals. Agent-ready optometry needs exam availability API, insurance eligibility endpoint, frame catalog with virtual try-on data, and prescription order tracking. AI health management agents will schedule eye exams alongside dental and medical — but only if providers have APIs. Average score: 11/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/optometry-eye-care-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Glasses,
  },
  {
    title: 'Landscaping Agent Readiness: Why Lawn Care and Garden Services Can\'t Be Scheduled by AI',
    excerpt:
      '$130B US landscaping market. Scheduling via phone/text, estimates require site visit, pricing varies by property size. No structured API for service catalog, seasonal scheduling, or recurring service management. Agent-ready landscaping needs property-size-based pricing API, service catalog JSON, scheduling endpoint, photo-based estimate submission, and recurring service management. AI home management agents will handle landscaping alongside cleaning and pest control. Average score: 8/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/landscaping-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Trees,
  },
  {
    title: 'API-First vs Web-First: The Architectural Decision That Determines Your Agent Readiness Score',
    excerpt:
      'The single most impactful architectural decision for agent readiness. API-first companies (Stripe, Twilio, Resend) average 60+ scores. Web-first companies (marketing sites, portfolios, brochure sites) average 15-20. API-first means structured data IS the product. Web-first means HTML is the product and data is an afterthought. The migration path: web-first companies can add API-first layers without rebuilding, jumping from 15 to 50+ in a week. Data from 500 business scans.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/api-first-vs-web-first',
    tag: 'Architecture Analysis',
    tagColor: 'blue',
    icon: LayoutTemplate,
  },
  {
    title: 'Why Drata and Secureframe Both Score 65-66: The Compliance SaaS Pattern',
    excerpt:
      'Dual case study: Drata 66, Secureframe 65 — nearly identical Silver scores. The compliance SaaS pattern: both API-first, both OAuth, both structured docs, both integrate with dozens of tools. Where they score well: D2 API (80+), D7 Security (90+, they ARE security companies), D3 Onboarding (72+). Where they lose: D4 Pricing (enterprise-gated), D9 Agent Experience (no MCP, no agent-card). What pushes compliance platforms from Silver to Gold.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/drata-secureframe-agent-readiness',
    tag: 'Case Study',
    tagColor: 'purple',
    icon: BadgeCheck,
  },
  {
    title: 'Moving and Storage Agent Readiness: Why Movers Can\'t Be Hired by AI Relocation Agents',
    excerpt:
      '$20B US moving industry. Estimates require in-home or virtual survey. No structured API for pricing by cubic feet, availability by date, insurance options. Storage facilities: unit availability sometimes online but no API. Agent-ready moving needs instant quote calculator API (based on home size and distance), availability calendar, booking endpoint, insurance selection, and tracking webhook. AI relocation agents will manage entire moves — quoting, booking, storage, utilities, address changes — but need structured data from every service in the chain. Average score: 6/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/moving-storage-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Box,
  },
  {
    title: 'API Testing Tools and Agent Readiness: How Postman, Insomnia, and curl Verify Your Score',
    excerpt:
      'Practical guide to testing your agent readiness with existing tools. Postman: import OpenAPI spec, test each endpoint, verify JSON responses. curl: 10 commands that predict your score. Insomnia: environment variables for test vs prod. The 5-step testing workflow: (1) check /health, (2) test auth, (3) verify error responses, (4) check rate-limit headers, (5) validate OpenAPI spec. Then scan with AgentHermes to compare your manual findings with the automated 9-dimension score. Covers the exact sequence AI agents run when evaluating your API.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/api-testing-agent-readiness',
    tag: 'Practical Guide',
    tagColor: 'blue',
    icon: Beaker,
  },
  {
    title: 'Staffing and Temp Agency Agent Readiness: Why Workforce Platforms Lock Out AI Hiring Agents',
    excerpt:
      '$200B US staffing market. Temp agencies: job availability by phone or portal, worker matching manual, timesheet submission varies. Platforms like Upwork and Fiverr have APIs but heavily gate access. Agent-ready staffing needs open position catalog API, worker availability endpoint, match scoring, automated offer creation, and timesheet submission. AI procurement agents will staff entire projects — the first staffing firm with an MCP server wins every AI-driven hiring request in its metro market. Average score: 11/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/staffing-temp-agency-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: UserSearch,
  },
  {
    title: 'Cloud Storage and Backup Agent Readiness: Why Dropbox and Google Drive Score Differently',
    excerpt:
      '$80B cloud storage market. Both Dropbox and Google Drive have REST APIs and OAuth. But Google Drive scores 15+ points higher for agent readiness. The difference: search depth (full query language vs filename-only), metadata richness (custom appProperties vs limited fields), auth granularity (per-file scopes vs full-account access), and push notifications vs polling. Agent-ready storage needs 5 capabilities: file search API, structured metadata, sharing automation, storage quota endpoint, and version history API. Zero storage platforms have MCP servers. Box is the most agent-forward enterprise option. iCloud scores zero (no public API). The first storage MCP server wins the AI file management market.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/storage-backup-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: HardDrive,
  },
  {
    title: 'Web Accessibility vs Agent Readiness: Why WCAG Compliance Does Not Mean Agent Compliance',
    excerpt:
      'Provocative finding: a site can achieve WCAG AAA (highest accessibility rating) and still score 5/100 for agent readiness. WCAG makes sites accessible to humans with disabilities via HTML semantics, ARIA labels, and keyboard navigation. Agent readiness makes sites accessible to AI agents via structured data APIs, JSON endpoints, and machine-readable pricing. The overlap: both need structured data (Schema.org JSON-LD bridges both). The gap: WCAG requires no APIs, agent readiness requires no visual design. 97.4% of sites fail WCAG. Average agent readiness: 43/100. Zero combined standards exist. The smartest approach: content as structured data first, presentation as a rendering layer.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/accessibility-vs-agent-readiness',
    tag: 'Standards Analysis',
    tagColor: 'purple',
    icon: Accessibility,
  },
  {
    title: 'Printing Services Agent Readiness: Why Print Shops, Signs, and Copy Centers Can\'t Be Ordered From by AI',
    excerpt:
      '$100B US printing market. 27K+ print shops. Zero public APIs. Business cards, signage, banners, packaging — all require human phone calls, emailed PDF proofs, and manual approval. Custom printing involves complex constraint matrices (paper stock x size x finish x quantity x color mode) that are perfect for structured APIs but currently managed by phone. Agent-ready printing needs 5 endpoints: product spec builder, instant quote calculator, file upload with preflight, proof approval automation, and order tracking. First print shop with an MCP server captures every AI office manager\'s recurring orders. Average score: 5/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/printing-services-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Printer,
  },
  {
    title: 'Parking and Transportation Agent Readiness: Why Uber Has an API But Your Parking Garage Doesn\'t',
    excerpt:
      'Ride-hailing (Uber, Lyft) scores 45-55 on agent readiness thanks to public APIs. Parking garages score zero — no real-time availability, no dynamic pricing endpoint, no reservation system. Public transit has GTFS feeds (structured!) but most agencies only share real-time data through Google Maps. EV charging networks have OCPI but adoption is fragmented. Agent-ready parking needs 5 endpoints: real-time space availability, dynamic pricing, reservation system, EV charging status, facility info. AI travel agents need parking data to complete trip planning. The $131B US parking industry is invisible to agents.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/parking-transportation-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: ParkingCircle,
  },
  {
    title: 'API Deprecation and Agent Readiness: How to Sunset Endpoints Without Breaking AI Agent Trust',
    excerpt:
      'When you deprecate an API endpoint, agents that depend on it break silently. They do not file support tickets — they just leave. Agent-ready deprecation: Sunset header (RFC 8594), Deprecation header, migration guide in changelog, llms.txt update, 410 Gone with migration JSON. Anti-patterns: silent removal, returning HTML on JSON endpoints, version bumps without overlap. AgentHermes D8 Reliability rewards documented deprecation practices. 90-day minimum deprecation window. Stripe\'s 2-year version lifecycle is the gold standard.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/api-deprecation-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Clock3,
  },
  {
    title: 'Coworking Space Agent Readiness: Why WeWork Has an App But Independent Spaces Score Zero',
    excerpt:
      '$18B US flexible workspace market with 6,200+ coworking spaces. WeWork and Regus have apps but no public API — booking locked behind member authentication. Independent spaces (thousands in US): website + phone number. No desk availability API, no meeting room booking endpoint, no pricing JSON. Agent-ready coworking needs 5 endpoints: desk/office availability, meeting room booking, membership pricing JSON, tour scheduling, day pass purchase. AI executive assistants need to book workspace — currently impossible without calling. Average score: 3/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/coworking-space-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Armchair,
  },
  {
    title: 'Tutoring Agent Readiness: Why Private Tutors and Learning Centers Can\'t Be Matched by AI',
    excerpt:
      '$12B US tutoring market. Tutors on Wyzant/Tutor.com but no public availability API. Scheduling via text, pricing varies by subject, no structured credential data. Agent-ready tutoring needs 5 endpoints: subject expertise catalog, availability calendar API, session booking endpoint, credential/qualification JSON, progress tracking. AI education agents will match students to tutors — but only if tutors expose structured data. First tutoring platform with an MCP server makes 65K+ tutors agent-accessible. Average score: 9/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/tutoring-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: BookOpenCheck,
  },
  {
    title: 'Serverless and Edge Functions: Why Vercel, Cloudflare Workers, and AWS Lambda Are Agent-Ready by Design',
    excerpt:
      'Serverless platforms score higher than traditional hosting because: sub-100ms cold starts, automatic HTTPS, built-in CDN, global distribution, structured error responses. Vercel Edge Functions + Cloudflare Workers + AWS Lambda@Edge = naturally fast, secure, globally available. This maps to D7 (TLS), D8 (reliability/latency), D1 (CDN detection). The infrastructure choice IS the agent readiness choice. Traditional shared hosting = score penalty. Fresh serverless deployment scores 30-40 before writing API code.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/serverless-edge-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: CloudCog,
  },
  {
    title: 'Franchise Agent Readiness: Why McDonald\'s Has an App But Individual Franchisees Score Zero',
    excerpt:
      'Franchise paradox: corporate has tech (McDonald\'s app, Subway ordering API) but 780K individual franchisees have no independent agent infrastructure. The franchisor controls the tech stack. Agent-ready franchise: location-specific inventory API, wait time estimator, local menu variations, staff availability for services franchises. The opportunity: franchise tech providers (Toast, Square for Restaurants) adding agent readiness to their platform lifts all franchisees at once. Average franchisee score: 3/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/franchise-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Store,
  },
  {
    title: 'Pest Control Agent Readiness: Why Exterminators Can\'t Be Dispatched by AI Agents',
    excerpt:
      '$22B pest control market runs entirely on phone calls. "Call for a free inspection." No availability API, no structured pricing by pest type, no inspection booking endpoint. Agent-ready pest control needs 5 endpoints: service type catalog, availability windows API, estimated pricing by pest type, inspection booking, recurring treatment scheduling. First pest control company with an MCP server captures every AI home management agent referral in its market. Average score: 5/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/pest-control-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Bug,
  },
  {
    title: 'Building Agent-Ready APIs with Express and Fastify: A Node.js Developer\'s Guide',
    excerpt:
      'Third framework tutorial (after Next.js and Django/Flask). 8 Express patterns: swagger-jsdoc for OpenAPI, structured error middleware, /health route, static agent-card.json, route annotations, helmet for security headers, express-rate-limit with X-RateLimit headers, passport-http-bearer auth. 4 Fastify equivalents: @fastify/swagger, custom error handler, @fastify/under-pressure health check, schema-first validation. Takes a typical Node.js API from 10-20/100 to Silver (60+) or Gold (75+).',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/express-fastify-agent-readiness-tutorial',
    tag: 'Developer Tutorial',
    tagColor: 'purple',
    icon: Hexagon,
  },
  {
    title: 'Food and Beverage Agent Readiness: Why Breweries, Wineries, and Coffee Roasters Score Under 10',
    excerpt:
      '$190B craft beverage industry: 9,700 breweries, 11,500 wineries, 2,700 distilleries, 3,800 coffee roasters. Product catalogs on Instagram, tasting room reservations by phone, no structured inventory API. Agent-ready producers need: product catalog with tasting notes JSON, availability by location, tasting reservation API, subscription/club management endpoint, wholesale ordering API. AI sommelier and food discovery agents need structured product data to match taste preferences. Average score: 7/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/food-beverage-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Wine,
  },
  {
    title: 'Churches and Religious Organizations Agent Readiness: Why Faith-Based Services Are Dark to AI',
    excerpt:
      '$140B in US religious giving flows through channels invisible to AI agents. Churches post service times on Facebook, collect donations via Tithe.ly or the plate, and handle event registration by email. Zero structured APIs for service schedules, giving, small groups, or facility booking. Agent-ready churches need 5 endpoints: service times, donation, event registration, group directory, facility availability. Planning Center scores highest at 18/100 but its API is internal-only. The first church platform to add agent-facing endpoints instantly makes 70K+ churches discoverable.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/church-religious-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Church,
  },
  {
    title: 'Building Agent-Ready APIs with Django and Flask: A Python Developer\'s Guide',
    excerpt:
      'The Python companion to our Next.js tutorial. 8 copy-paste code blocks for Django REST Framework and Flask: structured JSON errors (DRF exception handler + Flask error handlers), OpenAPI via drf-spectacular and flask-smorest, /health endpoint, agent-card.json as a route, llms.txt, CORS with django-cors-headers and flask-cors, and Bearer auth with DRF TokenAuthentication. Covers 80% of scoring weight. Takes a typical Python API from 10-20/100 to Silver (60+) or Gold (75+).',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/django-flask-agent-readiness-tutorial',
    tag: 'Developer Tutorial',
    tagColor: 'purple',
    icon: FlaskConical,
  },
  {
    title: 'Cold Start Problem: Why New Businesses Score Zero and How to Launch Agent-Ready',
    excerpt:
      'Every new business starts at agent readiness score 0: no API, no docs, no track record. Unlike SEO (3-6 months to rank, dependent on backlinks), agent readiness can be bootstrapped in a weekend because it depends on files you deploy yourself. The minimum viable agent-ready stack: HTTPS + one JSON endpoint + agent-card.json + llms.txt + /health = immediately scannable. Bronze tier in 85 minutes. First-mover advantage is massive — most verticals have zero agent-ready businesses.',
    date: '2026-04-15',
    readTime: '11 min read',
    href: '/blog/cold-start-agent-readiness',
    tag: 'Strategy',
    tagColor: 'emerald',
    icon: Sparkle,
  },
  {
    title: 'API Gateways and Agent Readiness: How Kong, Apigee, and AWS API Gateway Affect Your Score',
    excerpt:
      'API gateways add layers between agents and your API. 67% of gateway-protected APIs block AI agents by default. Good: rate limiting, auth, caching, analytics. Bad: blocked User-Agents, added latency, mangled headers. We tested Kong, Apigee, and AWS API Gateway. Agent-ready gateway config: allow AI User-Agents, expose rate-limit headers, pass Content-Type negotiation, log agent traffic separately. Top platforms (Stripe, GitHub) use custom gateways. Configuration is the differentiator, not the gateway product.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/api-gateway-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Router,
  },
  {
    title: 'Music Streaming Agent Readiness: Why Spotify Scores 54 and What It Means for the Industry',
    excerpt:
      'Spotify scores 54 (Bronze, near Silver). Strong: public Web API with 80+ endpoints, OAuth, good docs, structured catalog data. Weak: no agent-card.json, rate limits undocumented, no MCP, playback requires human OAuth consent. The music streaming challenge: rights management prevents fully automated agent access. Apple Music 31, YouTube Music 38, Tidal 27. What pushes Spotify to Silver: agent-card + documented rate limits + llms.txt. Industry average: 37.5/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/music-streaming-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Music,
  },
  {
    title: 'The Investor\'s Guide to Agent Readiness: How to Evaluate a Company\'s AI Infrastructure',
    excerpt:
      'VCs and PEs should add agent readiness to due diligence. Companies scoring Silver+ capture AI-driven revenue. Companies at Bronze get disintermediated. Metrics to check: Agent Readiness Score, MCP presence, API-first architecture, developer docs quality. The scoring model maps to defensibility: high D2+D7+D8 = sustainable moat. Portfolio screening: scan companies, rank by score, identify gaps. Average across 500 scans: 43/100. Only 14% reach Silver.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/investor-guide-agent-readiness',
    tag: 'Investment Research',
    tagColor: 'blue',
    icon: LineChart,
  },
  {
    title: 'Gaming Agent Readiness: Why Game Studios Have APIs But Players Can\'t Use AI Agents to Buy',
    excerpt:
      '$200B gaming industry has sophisticated internal APIs but zero agent-accessible purchase endpoints. Steam\'s Web API reads player stats but can\'t buy a game. Epic\'s GraphQL queries catalogs but can\'t add to cart. PlayStation and Nintendo have no public API at all. Agent-ready gaming needs: game catalog API, purchase/gifting endpoint, price comparison, wishlist management, release calendar. The $50B in-game economy (skins, V-Bucks, battle passes) has zero agent access. Average score: 11/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/gaming-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Gamepad2,
  },
  {
    title: 'Multi-Language APIs and Agent Readiness: Why Accept-Language Headers Matter for Global Agents',
    excerpt:
      '87% of APIs ignore the Accept-Language header and return English-only responses. Global AI agents serve users in 100+ languages and need localized content, error messages, multi-currency pricing, and timezone-aware scheduling. Stripe handles this well (35+ languages, 135+ currencies). Most local businesses: English-only, USD-only. Full API localization adds up to 26 points on agent readiness. D6 Data Quality (0.10 weight) penalizes monolingual APIs.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/multi-language-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Languages,
  },
  {
    title: 'PropTech Agent Readiness: Why Property Management Platforms Score Higher Than Individual Landlords',
    excerpt:
      '$500B US rental market split in two: platforms (AppFolio 42, Buildium 38, Yardi 30) vs individual landlords (score 0-5). 48% of US rental units owned by individual landlords are invisible to AI agents. Platforms have tenant portals but few public APIs. Agent-ready property management needs: unit availability API, rental application endpoint, maintenance request system, lease terms JSON. AI renter agents will search, apply, and manage leases — but only if properties have APIs.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/proptech-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Building,
  },
  {
    title: 'Sports and Recreation Agent Readiness: Why Gyms, Leagues, and Sports Venues Can\'t Be Booked by AI',
    excerpt:
      '$120B US sports and recreation industry runs on phone calls and front desks. Golf courses use proprietary tee-time systems. Bowling alleys take reservations by phone. Rec leagues distribute paper forms. Agent-ready venues need: court/lane availability API, league registration endpoint, membership pricing JSON, equipment rental checker. AI sports concierge agents will manage fitness schedules — but only if venues have APIs. Average score: 9/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/sports-recreation-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Trophy,
  },
  {
    title: 'Environment Variables and Agent Readiness: Why Your API Keys Shouldn\'t Be in Your Agent Card',
    excerpt:
      'Security best practice: agent-card.json declares capabilities but should NEVER contain secrets. 8% of businesses we scan have API keys in public files. Where secrets go: environment variables, vault services (AWS Secrets Manager, Doppler), OAuth client credentials flow. What goes in agent-card.json: endpoint URLs, supported methods, auth TYPE (not credentials). AgentHermes D7 Security (0.12 weight) penalizes exposed secrets -15 points.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/environment-variables-agent-readiness',
    tag: 'Security',
    tagColor: 'red',
    icon: KeySquare,
  },
  {
    title: 'Nonprofit vs For-Profit Agent Readiness: Why Mission-Driven Organizations Score 3x Lower',
    excerpt:
      'Data comparison from 500 scans: for-profit businesses average 43/100. Nonprofits average 14/100 — 3x lower. Nonprofits optimize for donor emotion (hero images, impact stories) not agent interaction (APIs, structured data). The paradox: nonprofits with the most to gain from AI-driven donations invest the least in agent readiness. AI giving agents will allocate billions — but only to nonprofits they can programmatically evaluate.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/nonprofit-vs-forprofit-agent-readiness',
    tag: 'Data Analysis',
    tagColor: 'cyan',
    icon: BarChart3,
  },
  {
    title: 'Banking Agent Readiness: Why Open Banking APIs Exist But Most Banks Still Score Under 30',
    excerpt:
      'Open Banking (PSD2 in EU, FDX in US) mandated consumer data APIs. But open banking APIs are not agent readiness. Most bank APIs: read-only account data, no payment initiation for agents, complex partner agreements. Neobanks (Revolut 41, Wise 38) closer to agent-ready than traditional banks (Chase 14, BofA 11). Agent-ready banking needs: structured product comparison API, loan application endpoint, account opening automation, payment initiation. Average bank score: 22/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/banking-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Landmark,
  },
  {
    title: 'The Complete HTTP Error Code Reference for Agent Readiness',
    excerpt:
      'The definitive reference page. Every HTTP status code an agent encounters, what it means, and what the agent-ready JSON response should look like. 2xx success with metadata, 3xx redirects agents must follow, 4xx client errors with field-level JSON details, 5xx server errors with retry guidance. 73% of businesses return HTML error pages. Fixing error responses alone lifts scores 8-15 points across D2, D8, and D9 dimensions.',
    date: '2026-04-15',
    readTime: '15 min read',
    href: '/blog/error-codes-reference',
    tag: 'Developer Reference',
    tagColor: 'purple',
    icon: FileWarning,
  },
  {
    title: 'Wealth Management Agent Readiness: Why Financial Advisors Are Invisible to AI Portfolio Agents',
    excerpt:
      '$100T+ AUM globally. Individual advisors: zero API, phone-only consultations, performance reports in PDFs. Robo-advisors (Betterment, Wealthfront) score 45-55 Bronze. Traditional wirehouses (Merrill, Morgan Stanley) score 8-15. Independent RIAs score 3-8. Agent-ready wealth management needs: portfolio performance API, strategy comparison endpoint, risk assessment calculator, client onboarding automation, fee transparency endpoint. Average score: 12/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/wealth-management-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Wallet,
  },
  {
    title: 'Childcare Agent Readiness: Why Daycares, Preschools, and Nannies Can\'t Be Found by AI Agents',
    excerpt:
      '$60B US childcare market. Waitlists managed by paper/email, no availability API, pricing varies by age/schedule (not structured), licensing info in government PDFs. Agent-ready childcare: availability checker API, age-group pricing JSON, tour scheduling endpoint, enrollment application API. AI family assistants will manage childcare alongside doctor appointments and school enrollment — but only if providers have APIs. Average score: 5/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/childcare-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Baby,
  },
  {
    title: 'API Latency Benchmarks for Agent Readiness: What p95 Response Times Score Silver',
    excerpt:
      'D8 Reliability (0.13) rewards fast APIs. Our scan data shows: p95 < 200ms = top tier. 200-500ms = acceptable. 500ms-2s = penalty. >2s = significant scoring hit. Top scorers all respond sub-200ms (CDN-backed). Most local businesses: 1-3 second response times from shared hosting. The fix: Cloudflare free tier drops p95 by 60-80%. AgentHermes measures time-to-first-byte on every scan.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/latency-benchmarks-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Timer,
  },
  {
    title: 'Supply Chain Agent Readiness: Why Procurement AI Agents Can\'t Find Your Inventory',
    excerpt:
      'Supply chain: $25T global market. EDI (Electronic Data Interchange) is the dominant protocol — designed in the 1970s. Inventory systems (SAP, Oracle) locked behind VPNs. No public API for product availability, pricing, or lead times. Agent-ready supply chain: product catalog API, real-time inventory endpoint, automated RFQ submission, delivery timeline webhook. The first supplier with an MCP server gets every AI procurement agent\'s PO. Average score: 3/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/supply-chain-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Package,
  },
  {
    title: 'The Startup Agent Readiness Playbook: How to Score Silver Before You Launch',
    excerpt:
      'Pre-launch guide for startups. Build agent-ready from day 1 instead of retrofitting. 8-step checklist: API-first architecture, OpenAPI spec, Bearer auth, JSON errors, agent-card.json, llms.txt, /health endpoint, status page. Cost: $0 — these are architectural choices, not features. Startups that launch agent-ready capture agent traffic from day 1. Retrofitting later costs $11K-31K.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/startup-agent-readiness-playbook',
    tag: 'Startup Guide',
    tagColor: 'emerald',
    icon: Rocket,
  },
  {
    title: 'Venue and Event Space Agent Readiness: Why Conference Centers and Wedding Venues Can\'t Be Booked by AI',
    excerpt:
      'Conference centers, wedding venues, co-working spaces, community halls: all require human-mediated booking. No availability API, no structured pricing, no room/capacity data. Agent-ready venues need: room catalog API, availability calendar, automated quote engine, booking deposit endpoint. AI event planners need structured venue data to compare options. Average score: 8/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/venue-event-space-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: MapPinned,
  },
  {
    title: 'Building Agent-Ready APIs with Next.js: A Developer\'s Guide',
    excerpt:
      'Framework-specific tutorial for Next.js (our own stack). How to add agent readiness to any Next.js app: API routes with JSON errors, OpenAPI spec generation, /health endpoint, agent-card.json in /public/.well-known/, llms.txt route handler, Schema.org JSON-LD, CORS middleware, Bearer auth middleware. 8 copy-paste code blocks, zero extra dependencies.',
    date: '2026-04-15',
    readTime: '15 min read',
    href: '/blog/nextjs-agent-readiness-tutorial',
    tag: 'Developer Tutorial',
    tagColor: 'purple',
    icon: Terminal,
  },
  {
    title: 'Home Services Agent Readiness: Why Plumbers, Electricians, and HVAC Companies Score Zero',
    excerpt:
      '$600B home services market. Plumbers, electricians, HVAC, handymen: entirely phone-based. Angi/HomeAdvisor own the lead gen. No API for availability, pricing varies by job. Agent-ready: service catalog with base pricing, availability windows API, automated quote request, job scheduling endpoint. First plumber with MCP = dispatched by every AI home assistant. Average score: 4/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/home-services-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Wrench,
  },
  {
    title: 'AI Agent Frameworks and Agent Readiness: How LangChain, CrewAI, and AutoGen Discover Businesses',
    excerpt:
      'How the major agent frameworks actually find and interact with business APIs. LangChain: tool definitions, API chains. CrewAI: role-based agents with tool access. AutoGen: multi-agent conversations. All look for: OpenAPI specs, MCP servers, structured JSON, agent-card.json. Your agent readiness score predicts how easily any framework can use your API. The framework does not matter — the API structure does.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/ai-agent-frameworks-comparison',
    tag: 'Technical Analysis',
    tagColor: 'purple',
    icon: Blocks,
  },
  {
    title: 'Why Calendly and Agora Score 64-72: The Scheduling and Communication Platform Pattern',
    excerpt:
      'Dual case study. Calendly 64 Silver: scheduling API, OAuth, clear docs, but enterprise pricing gated. Agora 72 Silver (#2 after Resend): real-time communication API, strong docs, developer-first. The pattern: single-purpose APIs that do one thing well score higher than do-everything platforms. What both need for Gold: agent-card.json, llms.txt, MCP tools for their core workflow.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/calendly-agora-agent-readiness',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: CalendarCheck,
  },
  {
    title: 'EdTech Agent Readiness: Why Coursera and Khan Academy Score Higher Than Traditional Schools',
    excerpt:
      'The $400B EdTech market is split: Coursera (52), Khan Academy (47), Udemy (49) have course APIs, structured catalogs, self-service enrollment. Traditional schools average 12. The LMS lock-in problem: Canvas, Blackboard, Moodle all have APIs but scoped per-institution — no universal student API. What makes EdTech agent-ready: course catalog API, enrollment endpoint, progress tracking, certificate verification. First university with MCP server wins every AI-mediated student inquiry.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/edtech-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: GraduationCap,
  },
  {
    title: 'HTTP/2 and HTTP/3: Why Protocol Version Matters for Agent Readiness Scoring',
    excerpt:
      'AgentHermes D8 Reliability (0.13 weight) detects HTTP/2 and HTTP/3. HTTP/2 multiplexing lets agents make 5+ parallel API calls on one connection. HTTP/3 QUIC adds 0-RTT reconnection and connection migration. Most CDNs auto-enable both (Cloudflare, Vercel). Sites still on HTTP/1.1 score lower on D8. The fix is usually free — your CDN supports it, verify with curl --http2 or DevTools Protocol column.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/http2-http3-agent-readiness',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Wifi,
  },
  {
    title: 'Building an Agent Readiness Consulting Practice: The New Service Vertical',
    excerpt:
      'AgentHermes data: 90% of businesses below Silver. That is a consulting goldmine. Services: agent readiness audit ($500-$1.5K), OpenAPI spec writing ($1.5-3K), MCP server implementation ($3-5K), agent-card.json setup ($300-800), recurring monitoring ($500-1.5K/mo). The Bronze to Silver sprint is a packaged 30-day engagement. Revenue model: $234K/year realistic for year-2 solo consultant. Zero competition in most markets. Use AgentHermes as the scoring platform.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/agency-building-agent-readiness',
    tag: 'Business Strategy',
    tagColor: 'emerald',
    icon: Handshake,
  },
  {
    title: 'Cleaning Services Agent Readiness: Why Maids, Janitors, and Cleaners Can\'t Be Found by AI',
    excerpt:
      '$90B US cleaning industry. 1.2M+ cleaning businesses. Zero MCP servers. Residential + commercial. Booking via phone/Yelp/Thumbtack. No public API for availability, pricing varies by sq ft (not published), no structured service catalog. Agent-ready: room-size pricing calculator API, availability slots, booking endpoint, recurring schedule management. First cleaning company with MCP = booked by every AI home assistant.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/cleaning-services-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: SprayCan,
  },
  {
    title: 'Changelogs for AI Agents: Why /changelog Matters for D8 Reliability',
    excerpt:
      'AgentHermes D8 checks for /changelog or release notes. Agents need to know when your API changes, what broke, what is new. Stripe, GitHub, Vercel all have public changelogs — all Silver+. Without a changelog, agents cannot tell if a 500 error is a bug or a breaking change. Agent-ready: structured /changelog endpoint (JSON, not just HTML), semantic versioning, deprecation dates, migration guides.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/changelog-agent-readiness',
    tag: 'Technical Guide',
    tagColor: 'purple',
    icon: ScrollText,
  },
  {
    title: 'Why Make.com Scores 67 for Agent Readiness: The Automation Platform Pattern',
    excerpt:
      'Case study: Make.com (formerly Integromat) scored 67 Silver. The automation platform pattern: built to connect APIs = naturally agent-friendly. D2 high (REST API, webhooks, thousands of integrations). D3 strong (self-service, API key in minutes). Where they lose: D4 (enterprise pricing gated), D9 (no agent-card, no MCP). What pushes automation platforms toward Gold: be the thing agents call, not just the thing humans configure.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/make-agent-readiness-breakdown',
    tag: 'Case Study',
    tagColor: 'blue',
    icon: Workflow,
  },
  {
    title: 'Event Ticketing Agent Readiness: Why Ticketmaster and Eventbrite Lock Out AI Booking Agents',
    excerpt:
      'The $94B live events market is mostly locked out of the agent economy. Eventbrite has a public API (score ~50). Ticketmaster: locked API, dynamic pricing, CAPTCHA walls. StubHub/SeatGeek: reseller APIs exist but restricted. Individual venues/promoters: zero API. AI event concierge agents need structured event catalogs, real-time availability, automated ticket purchase, and seat selection endpoints.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/event-ticketing-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Ticket,
  },
  {
    title: 'JSON-LD vs Microdata: Which Structured Data Format AI Agents Prefer',
    excerpt:
      'JSON-LD wins for agents: separate from HTML, easy to parse, no DOM traversal needed. Microdata is embedded in HTML — harder for agents. Google recommends JSON-LD. AI agents strongly prefer it because they can extract structured data without rendering the page. AgentHermes checks for JSON-LD in D6 Data Quality (0.10 weight). Migration guide: microdata to JSON-LD in 20 minutes.',
    date: '2026-04-15',
    readTime: '12 min read',
    href: '/blog/json-ld-vs-microdata-agents',
    tag: 'Technical Deep Dive',
    tagColor: 'purple',
    icon: Code2,
  },
  {
    title: 'Pharmacy Agent Readiness: Why Prescription Services Are the Next Agent Frontier',
    excerpt:
      'The $635B pharmacy market requires phone calls for prescription transfers, manual insurance verification, and locked proprietary drug interaction systems. GoodRx has price comparison data (~42). CVS/Walgreens have some digital services but no public agent API. Regulatory barriers (DEA, state boards, HIPAA) exist but do not prevent structured data exposure. Independent pharmacies average 6/100.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/pharmacy-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Pill,
  },
  {
    title: 'Accounting Agent Readiness: Why QuickBooks Beats Your Accountant\'s Website',
    excerpt:
      'QuickBooks/Xero have OAuth APIs scoring ~55. Individual CPA firms: zero API, PDF tax returns, phone scheduling. Agent-ready accounting: client portal API, document submission endpoint, tax deadline calendar JSON, invoice status checker. AI tax agents are coming — first CPA with MCP server captures every AI-powered bookkeeping integration. Average CPA firm score: 8/100.',
    date: '2026-04-15',
    readTime: '13 min read',
    href: '/blog/accounting-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: Receipt,
  },
  {
    title: 'How to Test Your Agent Readiness Score Before Going Live',
    excerpt:
      'Practical testing guide. Before you scan with AgentHermes, self-check: curl your own API — does it return JSON? Check robots.txt — is GPTBot blocked? Hit /.well-known/agent-card.json — does it 404? Send Accept: application/json — do you get HTML? Try /health — does it exist? Check /openapi.json. 10 curl commands that predict your score. Compare to AgentHermes actual scan after.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/testing-your-agent-readiness',
    tag: 'Technical Guide',
    tagColor: 'purple',
    icon: TestTube,
  },
  {
    title: 'Cybersecurity Vendor Agent Readiness: Why Security Companies Should Score Highest (But Don\'t)',
    excerpt:
      'Ironic finding: cybersecurity companies should theoretically score highest (they understand APIs, auth, TLS). But many score average because they gate everything behind sales demos and NDAs. Drata 66, Secureframe 65 (compliance SaaS, Silver). Traditional vendors (Palo Alto, CrowdStrike): complex partner portals, no public API. Agent-ready security: threat intelligence API, compliance status endpoint, audit report generator.',
    date: '2026-04-15',
    readTime: '14 min read',
    href: '/blog/cybersecurity-agent-readiness',
    tag: 'Vertical Analysis',
    tagColor: 'amber',
    icon: ShieldHalf,
  },
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
