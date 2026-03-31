// ---------------------------------------------------------------------------
// Vertical landing page data
// Each vertical defines the content for /for/[vertical]
// ---------------------------------------------------------------------------

export interface VerticalTool {
  name: string
  description: string
  params: string[]
}

export type VerticalCategory = 'local-services' | 'retail' | 'professional' | 'tech-emerging' | 'healthcare' | 'finance' | 'travel' | 'education' | 'logistics'

export interface VerticalData {
  slug: string
  name: string
  category: VerticalCategory
  shortDescription: string
  icon: string // lucide icon name
  headline: string
  agentQuery: string
  tools: VerticalTool[]
  painPoints: string[]
  freeOffer: string[]
  stats: { businesses: string; avgScore: string; topScore: string }
  metaDescription: string
}

export const verticals: VerticalData[] = [
  {
    slug: 'restaurants',
    name: 'Restaurants',
    category: 'retail',
    shortDescription: 'Reservations, menus, and orders — all agent-callable',
    icon: 'UtensilsCrossed',
    headline: 'Make Your Restaurant Agent-Ready',
    agentQuery:
      "Book me a table for 4 at an Italian restaurant in SoHo for 7:30pm tonight",
    tools: [
      {
        name: 'make_reservation',
        description: 'Book a table for a given party size, date, and time',
        params: ['party_size: number', 'date: string', 'time: string', 'special_requests?: string'],
      },
      {
        name: 'view_menu',
        description: 'Return the full menu with prices, descriptions, and dietary info',
        params: ['category?: string', 'dietary_filter?: string'],
      },
      {
        name: 'place_order',
        description: 'Submit a takeout or delivery order',
        params: ['items: OrderItem[]', 'delivery_address?: string', 'pickup_time?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check open table slots for a given date and party size',
        params: ['date: string', 'party_size: number', 'time_range?: string'],
      },
      {
        name: 'get_restaurant_info',
        description: 'Return hours, location, cuisine type, and contact info',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      "Agents can't find your menu online",
      'No way to book a table programmatically',
      'Missing from AI-powered search results',
    ],
    freeOffer: [
      'Agent card with menu, hours, and booking info',
      'MCP endpoint for reservations and orders',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '1M+', avgScore: '32/100', topScore: 'OpenTable: 55' },
    metaDescription:
      'Make your restaurant discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for reservations, menus, and ordering.',
  },
  {
    slug: 'hvac',
    name: 'HVAC',
    category: 'local-services',
    shortDescription: 'Service scheduling, estimates, and emergency dispatch',
    icon: 'Thermometer',
    headline: 'Make Your HVAC Business Agent-Ready',
    agentQuery:
      "My AC stopped working. Find me an HVAC tech in Austin who can come today",
    tools: [
      {
        name: 'request_service',
        description: 'Submit a service request with issue details and preferred schedule',
        params: ['issue_type: string', 'urgency: string', 'preferred_date: string', 'address: string'],
      },
      {
        name: 'get_availability',
        description: 'Check technician availability for a given date and area',
        params: ['date: string', 'zip_code: string', 'service_type?: string'],
      },
      {
        name: 'get_estimate',
        description: 'Return a price estimate for a described issue',
        params: ['issue_description: string', 'system_type?: string', 'square_footage?: number'],
      },
      {
        name: 'check_service_area',
        description: 'Verify if a given address is within the service area',
        params: ['zip_code: string'],
      },
      {
        name: 'get_business_info',
        description: 'Return certifications, service areas, hours, and contact info',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot check your availability',
      'No programmatic way to request service calls',
      'Invisible to AI-powered home service searches',
    ],
    freeOffer: [
      'Agent card with services, areas, and certifications',
      'MCP endpoint for scheduling and estimates',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '120K+', avgScore: '18/100', topScore: 'Carrier: 42' },
    metaDescription:
      'Make your HVAC business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for service scheduling and estimates.',
  },
  {
    slug: 'lawn-care',
    name: 'Lawn Care',
    category: 'local-services',
    shortDescription: 'Quotes, recurring schedules, and service area checks',
    icon: 'TreePine',
    headline: 'Make Your Lawn Care Business Agent-Ready',
    agentQuery:
      "Find a lawn care service in my area that can start weekly mowing next Monday",
    tools: [
      {
        name: 'schedule_service',
        description: 'Book a recurring or one-time lawn service',
        params: ['service_type: string', 'frequency: string', 'start_date: string', 'address: string'],
      },
      {
        name: 'get_quote',
        description: 'Return a price quote based on lot size and services',
        params: ['lot_size_sqft: number', 'services: string[]', 'frequency?: string'],
      },
      {
        name: 'list_services',
        description: 'Return all available services with descriptions and pricing tiers',
        params: ['category?: string'],
      },
      {
        name: 'check_service_area',
        description: 'Verify if an address is within the service coverage area',
        params: ['zip_code: string'],
      },
      {
        name: 'get_business_info',
        description: 'Return hours, service areas, insurance info, and reviews',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot get quotes from your business',
      'No way to book lawn service programmatically',
      'Missing from AI-powered local service searches',
    ],
    freeOffer: [
      'Agent card with services, pricing, and coverage area',
      'MCP endpoint for quotes and scheduling',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '600K+', avgScore: '15/100', topScore: 'LawnStarter: 38' },
    metaDescription:
      'Make your lawn care business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for quotes and scheduling.',
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    category: 'local-services',
    shortDescription: 'Emergency dispatch, scheduling, and estimates on demand',
    icon: 'Droplets',
    headline: 'Make Your Plumbing Business Agent-Ready',
    agentQuery:
      "I have a burst pipe. Find me an emergency plumber near 90210 right now",
    tools: [
      {
        name: 'request_emergency',
        description: 'Submit an emergency service request with priority routing',
        params: ['issue_type: string', 'severity: string', 'address: string', 'contact_phone: string'],
      },
      {
        name: 'schedule_service',
        description: 'Book a non-emergency plumbing appointment',
        params: ['issue_type: string', 'preferred_date: string', 'address: string'],
      },
      {
        name: 'get_estimate',
        description: 'Return a price estimate for common plumbing issues',
        params: ['issue_description: string', 'urgency?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check available appointment slots',
        params: ['date: string', 'zip_code: string', 'is_emergency?: boolean'],
      },
      {
        name: 'get_business_info',
        description: 'Return licenses, service areas, emergency hours, and reviews',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot dispatch emergency service from your business',
      'No programmatic scheduling for plumbing appointments',
      'Invisible to AI assistants during urgent searches',
    ],
    freeOffer: [
      'Agent card with services, emergency status, and licenses',
      'MCP endpoint for scheduling and emergency dispatch',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '180K+', avgScore: '16/100', topScore: 'Roto-Rooter: 40' },
    metaDescription:
      'Make your plumbing business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for service scheduling and emergency dispatch.',
  },
  {
    slug: 'cleaning',
    name: 'Cleaning Services',
    category: 'local-services',
    shortDescription: 'Instant booking, pricing, and availability for any property',
    icon: 'Sparkles',
    headline: 'Make Your Cleaning Business Agent-Ready',
    agentQuery:
      "Book a deep cleaning for my 2-bedroom apartment next Saturday morning",
    tools: [
      {
        name: 'book_cleaning',
        description: 'Schedule a cleaning session with type, date, and property details',
        params: ['cleaning_type: string', 'date: string', 'time_slot: string', 'property_size: string'],
      },
      {
        name: 'get_pricing',
        description: 'Return pricing based on property type, size, and cleaning type',
        params: ['property_type: string', 'bedrooms: number', 'cleaning_type: string'],
      },
      {
        name: 'check_availability',
        description: 'Return available time slots for a given date and area',
        params: ['date: string', 'zip_code: string'],
      },
      {
        name: 'list_services',
        description: 'Return all cleaning services offered with descriptions',
        params: ['property_type?: string'],
      },
      {
        name: 'get_business_info',
        description: 'Return insurance, bonding, service areas, and reviews',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot get an instant quote from your business',
      'No way to book cleaning sessions programmatically',
      'Missing from AI-powered service recommendation results',
    ],
    freeOffer: [
      'Agent card with services, pricing, and coverage',
      'MCP endpoint for booking and pricing',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '1.2M+', avgScore: '14/100', topScore: 'Molly Maid: 35' },
    metaDescription:
      'Make your cleaning business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for booking and pricing.',
  },
  {
    slug: 'roofing',
    name: 'Roofing',
    category: 'local-services',
    shortDescription: 'Inspections, estimates, and service area coverage',
    icon: 'Home',
    headline: 'Make Your Roofing Business Agent-Ready',
    agentQuery:
      "I need a roof inspection and repair estimate after the storm. Find a roofer in Tampa",
    tools: [
      {
        name: 'request_inspection',
        description: 'Schedule a roof inspection with property and damage details',
        params: ['property_address: string', 'damage_type?: string', 'preferred_date: string'],
      },
      {
        name: 'get_estimate',
        description: 'Return a ballpark estimate for common roofing jobs',
        params: ['job_type: string', 'roof_sqft?: number', 'material?: string'],
      },
      {
        name: 'check_service_area',
        description: 'Verify if a given address is within coverage area',
        params: ['zip_code: string'],
      },
      {
        name: 'list_services',
        description: 'Return all roofing services offered (repair, replacement, inspection)',
        params: ['category?: string'],
      },
      {
        name: 'get_business_info',
        description: 'Return licenses, insurance, warranties, and contact info',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot schedule inspections from your business',
      'No programmatic way to get roofing estimates',
      'Invisible to AI assistants after storm damage searches',
    ],
    freeOffer: [
      'Agent card with services, licenses, and coverage area',
      'MCP endpoint for inspections and estimates',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '100K+', avgScore: '12/100', topScore: 'GAF: 37' },
    metaDescription:
      'Make your roofing business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for inspections and estimates.',
  },
  {
    slug: 'dentist',
    name: 'Dental Practices',
    category: 'professional',
    shortDescription: 'Appointments, insurance checks, and provider discovery',
    icon: 'Stethoscope',
    headline: 'Make Your Dental Practice Agent-Ready',
    agentQuery:
      "Find a dentist accepting new patients near me that takes Delta Dental insurance",
    tools: [
      {
        name: 'book_appointment',
        description: 'Schedule a dental appointment by type and preferred time',
        params: ['appointment_type: string', 'preferred_date: string', 'time_slot: string', 'is_new_patient: boolean'],
      },
      {
        name: 'check_insurance',
        description: 'Verify if a specific insurance plan is accepted',
        params: ['insurance_provider: string', 'plan_name?: string'],
      },
      {
        name: 'list_services',
        description: 'Return all dental services offered with descriptions and price ranges',
        params: ['category?: string'],
      },
      {
        name: 'get_availability',
        description: 'Return open appointment slots for a given date range',
        params: ['start_date: string', 'end_date: string', 'appointment_type?: string'],
      },
      {
        name: 'get_practice_info',
        description: 'Return hours, location, accepted insurance, and provider bios',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot check your accepted insurance plans',
      'No programmatic way to book dental appointments',
      'Missing from AI-powered healthcare searches',
    ],
    freeOffer: [
      'Agent card with services, insurance, and provider info',
      'MCP endpoint for booking and insurance verification',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '200K+', avgScore: '22/100', topScore: 'Aspen Dental: 44' },
    metaDescription:
      'Make your dental practice discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for appointment booking and insurance checks.',
  },
  {
    slug: 'auto-dealer',
    name: 'Auto Dealers',
    category: 'retail',
    shortDescription: 'Inventory search, test drives, and financing estimates',
    icon: 'Car',
    headline: 'Make Your Dealership Agent-Ready',
    agentQuery:
      "Find me a 2024 Toyota RAV4 under $35K within 50 miles of Chicago",
    tools: [
      {
        name: 'search_inventory',
        description: 'Search vehicle inventory by make, model, year, price, and features',
        params: ['make?: string', 'model?: string', 'year_min?: number', 'price_max?: number', 'features?: string[]'],
      },
      {
        name: 'get_vehicle_details',
        description: 'Return full details, photos, and pricing for a specific vehicle',
        params: ['vin: string'],
      },
      {
        name: 'schedule_test_drive',
        description: 'Book a test drive appointment for a specific vehicle',
        params: ['vin: string', 'preferred_date: string', 'time_slot: string', 'customer_name: string'],
      },
      {
        name: 'get_financing_estimate',
        description: 'Return estimated monthly payments based on price and terms',
        params: ['vehicle_price: number', 'down_payment: number', 'term_months: number', 'credit_tier?: string'],
      },
      {
        name: 'get_dealer_info',
        description: 'Return hours, location, inventory count, and contact info',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot search your live inventory',
      'No way to schedule test drives programmatically',
      'Missing from AI-powered car shopping results',
    ],
    freeOffer: [
      'Agent card with inventory summary and dealer info',
      'MCP endpoint for search, pricing, and test drives',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '70K+', avgScore: '28/100', topScore: 'Carvana: 52' },
    metaDescription:
      'Make your dealership discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for inventory search and test drive booking.',
  },
  {
    slug: 'law-firm',
    name: 'Law Firms',
    category: 'professional',
    shortDescription: 'Consultations, practice areas, and attorney matching',
    icon: 'Scale',
    headline: 'Make Your Law Firm Agent-Ready',
    agentQuery:
      "Find me an employment lawyer in Boston who offers free consultations",
    tools: [
      {
        name: 'book_consultation',
        description: 'Schedule a consultation with practice area and case details',
        params: ['practice_area: string', 'case_summary: string', 'preferred_date: string', 'consultation_type: string'],
      },
      {
        name: 'check_practice_areas',
        description: 'Return all practice areas with attorney specializations',
        params: ['category?: string'],
      },
      {
        name: 'get_attorney_info',
        description: 'Return bio, credentials, bar admissions, and case results for an attorney',
        params: ['attorney_id?: string', 'practice_area?: string'],
      },
      {
        name: 'get_availability',
        description: 'Check available consultation slots',
        params: ['attorney_id?: string', 'date_range: string', 'consultation_type?: string'],
      },
      {
        name: 'get_firm_info',
        description: 'Return firm overview, locations, practice areas, and consultation policy',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot check your consultation availability',
      'No programmatic way to book legal consultations',
      'Missing from AI-powered legal service searches',
    ],
    freeOffer: [
      'Agent card with practice areas, attorneys, and consultation policy',
      'MCP endpoint for consultations and availability',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '450K+', avgScore: '20/100', topScore: 'LegalZoom: 48' },
    metaDescription:
      'Make your law firm discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for consultation booking and attorney info.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    category: 'professional',
    shortDescription: 'Listing search, showings, and market data on demand',
    icon: 'Building2',
    headline: 'Make Your Real Estate Business Agent-Ready',
    agentQuery:
      "Find me a 3-bedroom house under $500K in the Denver suburbs with a garage",
    tools: [
      {
        name: 'search_listings',
        description: 'Search active listings by price, beds, baths, location, and features',
        params: ['price_max?: number', 'bedrooms?: number', 'location: string', 'features?: string[]'],
      },
      {
        name: 'get_property_details',
        description: 'Return full property details, photos, history, and estimated value',
        params: ['listing_id: string'],
      },
      {
        name: 'schedule_showing',
        description: 'Book a property showing with an agent',
        params: ['listing_id: string', 'preferred_date: string', 'time_slot: string', 'buyer_name: string'],
      },
      {
        name: 'get_market_data',
        description: 'Return market statistics for a given area',
        params: ['zip_code: string', 'property_type?: string', 'time_period?: string'],
      },
      {
        name: 'get_agent_info',
        description: 'Return agent bio, specialties, areas served, and transaction history',
        params: ['agent_id?: string', 'fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot search your active listings',
      'No way to schedule property showings programmatically',
      'Missing from AI-powered home search results',
    ],
    freeOffer: [
      'Agent card with listings summary and agent info',
      'MCP endpoint for search, details, and showings',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '2M+', avgScore: '25/100', topScore: 'Zillow: 58' },
    metaDescription:
      'Make your real estate business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for listing search and showings.',
  },
  {
    slug: 'saas',
    name: 'SaaS',
    category: 'tech-emerging',
    shortDescription: 'Product discovery, trial provisioning, and API access',
    icon: 'Cloud',
    headline: 'Make Your SaaS Product Agent-Ready',
    agentQuery:
      "Find me a project management tool with Gantt charts that integrates with Slack under $20/user",
    tools: [
      {
        name: 'get_product_info',
        description: 'Return product capabilities, integrations, and feature matrix',
        params: ['sections?: string[]'],
      },
      {
        name: 'get_pricing',
        description: 'Return pricing tiers with feature comparisons',
        params: ['billing_period?: string', 'seats?: number'],
      },
      {
        name: 'create_trial',
        description: 'Provision a free trial account programmatically',
        params: ['email: string', 'company_name?: string', 'plan?: string'],
      },
      {
        name: 'check_integrations',
        description: 'Verify which integrations are available and their status',
        params: ['integration_names?: string[]'],
      },
      {
        name: 'get_api_docs',
        description: 'Return API documentation, endpoints, and authentication details',
        params: ['section?: string'],
      },
    ],
    painPoints: [
      'Agents cannot compare your features against competitors',
      'No programmatic trial signup or onboarding',
      'API docs are not machine-readable',
    ],
    freeOffer: [
      'Agent card with capabilities, pricing, and integrations',
      'MCP endpoint for product discovery and trial creation',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '30K+', avgScore: '45/100', topScore: 'Stripe: 68' },
    metaDescription:
      'Make your SaaS product discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for product info, pricing, and trial signup.',
  },
  {
    slug: 'ecommerce',
    name: 'E-Commerce',
    category: 'retail',
    shortDescription: 'Product search, cart, checkout, and order tracking',
    icon: 'ShoppingBag',
    headline: 'Make Your Online Store Agent-Ready',
    agentQuery:
      "Order me a pair of size 10 Nike Air Max in black, delivered by Friday",
    tools: [
      {
        name: 'search_products',
        description: 'Search products by name, category, size, color, and price',
        params: ['query?: string', 'category?: string', 'size?: string', 'color?: string', 'price_max?: number'],
      },
      {
        name: 'get_product_details',
        description: 'Return full product details including variants, stock, and images',
        params: ['product_id: string'],
      },
      {
        name: 'add_to_cart',
        description: 'Add a product variant to the shopping cart',
        params: ['product_id: string', 'variant_id: string', 'quantity: number'],
      },
      {
        name: 'checkout',
        description: 'Complete an order with shipping and payment details',
        params: ['cart_id: string', 'shipping_address: Address', 'payment_method_id: string'],
      },
      {
        name: 'track_order',
        description: 'Return order status, tracking number, and estimated delivery',
        params: ['order_id: string'],
      },
    ],
    painPoints: [
      'Agents cannot search your product catalog',
      'No programmatic way to place orders',
      'Missing from AI-powered shopping comparisons',
    ],
    freeOffer: [
      'Agent card with product catalog and store info',
      'MCP endpoint for search, cart, and checkout',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '2.5M+', avgScore: '30/100', topScore: 'Shopify stores: 50' },
    metaDescription:
      'Make your online store discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for product search and ordering.',
  },
  {
    slug: 'agency',
    name: 'Agencies',
    category: 'professional',
    shortDescription: 'Service discovery, portfolio, and proposal submission',
    icon: 'Briefcase',
    headline: 'Make Your Agency Agent-Ready',
    agentQuery:
      "Find me a design agency in NYC that specializes in SaaS branding under $15K",
    tools: [
      {
        name: 'get_services',
        description: 'Return all agency services with scope, pricing, and timelines',
        params: ['category?: string', 'budget_range?: string'],
      },
      {
        name: 'view_portfolio',
        description: 'Return portfolio pieces filtered by industry, service, or date',
        params: ['industry?: string', 'service_type?: string', 'limit?: number'],
      },
      {
        name: 'request_proposal',
        description: 'Submit an RFP with project details and budget',
        params: ['project_description: string', 'budget_range: string', 'timeline: string', 'contact_email: string'],
      },
      {
        name: 'check_availability',
        description: 'Check current capacity and earliest start date',
        params: ['service_type?: string', 'project_size?: string'],
      },
      {
        name: 'get_agency_info',
        description: 'Return team size, specialties, industries served, and case studies',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot compare your services and pricing',
      'No programmatic way to submit RFPs',
      'Missing from AI-powered agency discovery results',
    ],
    freeOffer: [
      'Agent card with services, portfolio, and specialties',
      'MCP endpoint for discovery and proposal submission',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '150K+', avgScore: '24/100', topScore: 'Toptal: 52' },
    metaDescription:
      'Make your agency discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for service info and RFP submission.',
  },
  {
    slug: 'accounting',
    name: 'Accounting Firms',
    category: 'professional',
    shortDescription: 'Service packages, consultations, and CPA credentials',
    icon: 'Calculator',
    headline: 'Make Your Accounting Firm Agent-Ready',
    agentQuery:
      "Find me a CPA firm that handles small business taxes and offers monthly bookkeeping",
    tools: [
      {
        name: 'list_services',
        description: 'Return all accounting services with descriptions and pricing',
        params: ['category?: string', 'business_type?: string'],
      },
      {
        name: 'book_consultation',
        description: 'Schedule a consultation with a CPA or accountant',
        params: ['service_type: string', 'business_size: string', 'preferred_date: string'],
      },
      {
        name: 'get_pricing',
        description: 'Return pricing for specific services based on business type and size',
        params: ['service_type: string', 'annual_revenue?: string', 'employee_count?: number'],
      },
      {
        name: 'check_credentials',
        description: 'Return CPA licenses, certifications, and industry specializations',
        params: ['accountant_id?: string'],
      },
      {
        name: 'get_firm_info',
        description: 'Return firm overview, team, industries served, and client count',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot compare your service packages',
      'No programmatic way to book CPA consultations',
      'Missing from AI-powered business service searches',
    ],
    freeOffer: [
      'Agent card with services, credentials, and pricing',
      'MCP endpoint for consultations and pricing',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '140K+', avgScore: '19/100', topScore: 'H&R Block: 42' },
    metaDescription:
      'Make your accounting firm discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for service info and consultation booking.',
  },
  {
    slug: 'freelancer',
    name: 'Freelancers',
    category: 'tech-emerging',
    shortDescription: 'Profiles, availability, rates, and proposal requests',
    icon: 'Laptop',
    headline: 'Make Your Freelance Business Agent-Ready',
    agentQuery:
      "Find me a freelance React developer with 5+ years experience available this month under $100/hr",
    tools: [
      {
        name: 'get_profile',
        description: 'Return skills, experience, portfolio, and availability status',
        params: ['sections?: string[]'],
      },
      {
        name: 'check_availability',
        description: 'Return current availability, hours per week, and earliest start',
        params: ['start_date?: string', 'hours_per_week?: number'],
      },
      {
        name: 'get_rates',
        description: 'Return hourly and project-based rates by service type',
        params: ['service_type?: string', 'project_scope?: string'],
      },
      {
        name: 'request_proposal',
        description: 'Submit a project brief and get a proposal',
        params: ['project_description: string', 'budget_range?: string', 'timeline?: string', 'contact_email: string'],
      },
      {
        name: 'view_portfolio',
        description: 'Return portfolio items filtered by skill or industry',
        params: ['skill?: string', 'industry?: string', 'limit?: number'],
      },
    ],
    painPoints: [
      'Agents cannot check your availability or rates',
      'No programmatic way to request proposals',
      'Missing from AI-powered talent searches',
    ],
    freeOffer: [
      'Agent card with skills, rates, and availability',
      'MCP endpoint for discovery and proposal requests',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '70M+', avgScore: '10/100', topScore: 'Upwork profiles: 35' },
    metaDescription:
      'Make your freelance business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for availability, rates, and proposals.',
  },

  // =========================================================================
  // HEALTHCARE
  // =========================================================================
  {
    slug: 'telehealth',
    name: 'Telehealth / Virtual Care',
    category: 'healthcare',
    shortDescription: 'Virtual visits, insurance checks, and prescriptions — all agent-callable',
    icon: 'Video',
    headline: 'Make Your Telehealth Practice Agent-Ready',
    agentQuery:
      'I need a virtual doctor visit today for a sore throat, takes Blue Cross',
    tools: [
      {
        name: 'book_virtual_visit',
        description: 'Book a virtual doctor visit by specialty and preferred time',
        params: ['specialty: string', 'reason_for_visit: string', 'preferred_date: string', 'urgency?: string'],
      },
      {
        name: 'check_insurance',
        description: 'Verify if a specific insurance plan is accepted and estimate copay',
        params: ['insurance_provider: string', 'plan_name?: string', 'visit_type?: string'],
      },
      {
        name: 'get_providers',
        description: 'Get available providers filtered by specialty and availability',
        params: ['specialty: string', 'language?: string', 'gender_preference?: string'],
      },
      {
        name: 'get_availability',
        description: 'Check available appointment slots for a given date and specialty',
        params: ['specialty: string', 'date: string', 'provider_id?: string'],
      },
      {
        name: 'refill_prescription',
        description: 'Request a prescription refill through the telehealth platform',
        params: ['medication_name: string', 'pharmacy_preference?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your provider availability',
      'No programmatic way to verify insurance coverage',
      'Missing from AI-powered healthcare searches',
    ],
    freeOffer: [
      'Agent card with providers, specialties, and insurance info',
      'MCP endpoint for booking and insurance verification',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '50K+', avgScore: '20/100', topScore: 'Teladoc: 48' },
    metaDescription:
      'Make your telehealth practice discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for virtual visit booking and insurance checks.',
  },
  {
    slug: 'pharmacy',
    name: 'Pharmacy',
    category: 'retail',
    shortDescription: 'Drug availability, pricing, refills, and transfers — agent-ready',
    icon: 'Pill',
    headline: 'Make Your Pharmacy Agent-Ready',
    agentQuery:
      'Refill my metformin at the cheapest pharmacy near 78704',
    tools: [
      {
        name: 'check_drug_availability',
        description: 'Check if a specific medication is in stock',
        params: ['drug_name: string', 'dosage?: string', 'form?: string', 'generic_ok?: boolean'],
      },
      {
        name: 'get_pricing',
        description: 'Get pricing for a medication with and without insurance',
        params: ['drug_name: string', 'dosage: string', 'quantity: number', 'insurance_provider?: string'],
      },
      {
        name: 'refill_prescription',
        description: 'Request a prescription refill',
        params: ['rx_number: string', 'patient_name: string', 'pickup_or_delivery?: string'],
      },
      {
        name: 'transfer_prescription',
        description: 'Transfer a prescription from another pharmacy',
        params: ['drug_name: string', 'current_pharmacy: string', 'patient_name: string', 'phone: string'],
      },
      {
        name: 'find_pharmacy',
        description: 'Get pharmacy location, hours, and services info',
        params: ['zip_code?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your drug availability or pricing',
      'No programmatic way to request prescription refills',
      'Missing from AI-powered pharmacy comparison searches',
    ],
    freeOffer: [
      'Agent card with services, hours, and accepted insurance',
      'MCP endpoint for drug pricing and refill requests',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '90K+', avgScore: '15/100', topScore: 'CVS: 40' },
    metaDescription:
      'Make your pharmacy discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for drug availability, pricing, and prescription refills.',
  },
  {
    slug: 'mental-health',
    name: 'Mental Health / Therapy',
    category: 'healthcare',
    shortDescription: 'Therapist matching, session booking, and insurance verification',
    icon: 'Brain',
    headline: 'Make Your Therapy Practice Agent-Ready',
    agentQuery:
      'Find a therapist who specializes in anxiety, takes Aetna, available evenings',
    tools: [
      {
        name: 'find_therapist',
        description: 'Find a therapist by specialty, insurance, and availability preferences',
        params: ['specialization: string', 'insurance_provider?: string', 'session_format?: string', 'time_preference?: string'],
      },
      {
        name: 'book_session',
        description: 'Book a therapy session',
        params: ['patient_name: string', 'session_type: string', 'preferred_date: string', 'format?: string'],
      },
      {
        name: 'check_insurance',
        description: 'Verify insurance coverage for mental health services',
        params: ['insurance_provider: string', 'plan_name?: string', 'service_type?: string'],
      },
      {
        name: 'get_specialties',
        description: 'Get detailed information about therapeutic specialties offered',
        params: ['concern?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check available appointment slots for therapy sessions',
        params: ['therapist_id?: string', 'date_range_start: string', 'date_range_end: string', 'time_preference?: string'],
      },
    ],
    painPoints: [
      'Agents cannot match patients with the right therapist',
      'No programmatic way to verify mental health coverage',
      'Missing from AI-powered therapy referral searches',
    ],
    freeOffer: [
      'Agent card with specialties, insurance, and session formats',
      'MCP endpoint for therapist matching and booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '300K+', avgScore: '12/100', topScore: 'BetterHelp: 45' },
    metaDescription:
      'Make your therapy practice discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for therapist matching and session booking.',
  },

  // =========================================================================
  // FINANCE
  // =========================================================================
  {
    slug: 'insurance',
    name: 'Insurance Agency',
    category: 'finance',
    shortDescription: 'Quotes, plan comparisons, claims, and agent discovery',
    icon: 'Shield',
    headline: 'Make Your Insurance Agency Agent-Ready',
    agentQuery:
      'Get me auto insurance quotes for a 2022 Honda Civic in Austin TX',
    tools: [
      {
        name: 'get_quote',
        description: 'Get an insurance quote for a specific coverage type',
        params: ['insurance_type: string', 'zip_code: string', 'details: string', 'current_carrier?: string'],
      },
      {
        name: 'compare_plans',
        description: 'Compare insurance plans across multiple carriers',
        params: ['insurance_type: string', 'coverage_level?: string', 'budget_max?: number'],
      },
      {
        name: 'check_coverage',
        description: 'Check what an existing policy covers',
        params: ['policy_type: string', 'scenario: string'],
      },
      {
        name: 'file_claim',
        description: 'Initiate an insurance claim',
        params: ['policy_number: string', 'claim_type: string', 'incident_date: string', 'description: string'],
      },
      {
        name: 'find_agent',
        description: 'Find an insurance agent by type and location',
        params: ['insurance_type: string', 'zip_code: string'],
      },
    ],
    painPoints: [
      'Agents cannot get instant quotes from your agency',
      'No programmatic way to compare your plans',
      'Missing from AI-powered insurance shopping searches',
    ],
    freeOffer: [
      'Agent card with carriers, coverage types, and contact info',
      'MCP endpoint for quotes and plan comparisons',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '400K+', avgScore: '18/100', topScore: 'Progressive: 46' },
    metaDescription:
      'Make your insurance agency discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for quotes, comparisons, and claims.',
  },
  {
    slug: 'mortgage',
    name: 'Mortgage / Lending',
    category: 'finance',
    shortDescription: 'Rate checks, payment calculators, and pre-qualification',
    icon: 'Landmark',
    headline: 'Make Your Mortgage Business Agent-Ready',
    agentQuery:
      "What's the best 30-year fixed rate for a $400K home with 20% down?",
    tools: [
      {
        name: 'check_rates',
        description: 'Get current mortgage rates by loan type and term',
        params: ['loan_type: string', 'term_years: number', 'credit_score_range?: string', 'down_payment_pct?: number'],
      },
      {
        name: 'calculate_payment',
        description: 'Calculate monthly mortgage payment with taxes and insurance',
        params: ['home_price: number', 'down_payment: number', 'term_years: number', 'zip_code?: string'],
      },
      {
        name: 'get_prequalification',
        description: 'Submit information for a mortgage pre-qualification',
        params: ['applicant_name: string', 'annual_income: number', 'down_payment_available: number', 'email: string'],
      },
      {
        name: 'compare_lenders',
        description: 'Compare lender rates and terms side by side',
        params: ['loan_type: string', 'loan_amount: number', 'term_years: number'],
      },
      {
        name: 'get_requirements',
        description: 'Get requirements and documentation needed for a specific loan type',
        params: ['loan_type: string', 'self_employed?: boolean'],
      },
    ],
    painPoints: [
      'Agents cannot check your current rates',
      'No programmatic way to start pre-qualification',
      'Missing from AI-powered mortgage comparison searches',
    ],
    freeOffer: [
      'Agent card with loan types, rates, and NMLS info',
      'MCP endpoint for rate checks and payment calculators',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '300K+', avgScore: '16/100', topScore: 'Rocket Mortgage: 50' },
    metaDescription:
      'Make your mortgage business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for rates, calculators, and pre-qualification.',
  },
  {
    slug: 'financial-advisor',
    name: 'Financial Advisor / Wealth Management',
    category: 'finance',
    shortDescription: 'Consultations, fee transparency, and advisor matching',
    icon: 'TrendingUp',
    headline: 'Make Your Financial Advisory Firm Agent-Ready',
    agentQuery:
      'Find a fee-only financial advisor for retirement planning, $500K portfolio',
    tools: [
      {
        name: 'book_consultation',
        description: 'Book a consultation with a financial advisor',
        params: ['client_name: string', 'primary_goal: string', 'portfolio_size?: string', 'preferred_date: string'],
      },
      {
        name: 'get_services',
        description: 'Get detailed information about financial planning services',
        params: ['service_category?: string', 'life_stage?: string'],
      },
      {
        name: 'check_minimums',
        description: 'Check minimum investment and account requirements',
        params: ['service_type: string', 'account_type?: string'],
      },
      {
        name: 'get_fee_structure',
        description: 'Get detailed fee structure and compensation transparency',
        params: ['portfolio_size?: number'],
      },
      {
        name: 'get_specialties',
        description: 'Get advisor specialties and credentials',
        params: ['focus_area?: string'],
      },
    ],
    painPoints: [
      'Agents cannot compare your fee structure transparently',
      'No programmatic way to check your minimums and services',
      'Missing from AI-powered financial advisor searches',
    ],
    freeOffer: [
      'Agent card with services, certifications, and fee model',
      'MCP endpoint for consultations and fee transparency',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '330K+', avgScore: '14/100', topScore: 'Betterment: 52' },
    metaDescription:
      'Make your financial advisory firm discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for consultations and fee transparency.',
  },

  // =========================================================================
  // TRAVEL & HOSPITALITY
  // =========================================================================
  {
    slug: 'hotel',
    name: 'Hotel / Lodging',
    category: 'travel',
    shortDescription: 'Room search, availability, booking, and amenities — agent-ready',
    icon: 'Bed',
    headline: 'Make Your Hotel Agent-Ready',
    agentQuery:
      'Book a hotel room in downtown Chicago for Dec 15-18, under $200/night, with gym',
    tools: [
      {
        name: 'search_rooms',
        description: 'Search available rooms by date, type, and amenities',
        params: ['check_in: string', 'check_out: string', 'guests: number', 'room_type?: string', 'max_rate?: number'],
      },
      {
        name: 'check_availability',
        description: 'Check room availability for specific dates',
        params: ['check_in: string', 'check_out: string', 'room_type?: string'],
      },
      {
        name: 'book_room',
        description: 'Book a hotel room',
        params: ['guest_name: string', 'check_in: string', 'check_out: string', 'room_type: string', 'special_requests?: string'],
      },
      {
        name: 'get_amenities',
        description: 'Get detailed information about hotel amenities and services',
        params: [],
      },
      {
        name: 'get_rates',
        description: 'Get current rates and any active promotions',
        params: ['check_in: string', 'stay_duration?: number'],
      },
    ],
    painPoints: [
      'Agents cannot search your room availability',
      'No programmatic way to book rooms or check rates',
      'Missing from AI-powered travel booking searches',
    ],
    freeOffer: [
      'Agent card with rooms, amenities, and rate ranges',
      'MCP endpoint for room search, booking, and rates',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '55K+', avgScore: '26/100', topScore: 'Marriott: 52' },
    metaDescription:
      'Make your hotel discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for room search, booking, and amenity info.',
  },
  {
    slug: 'car-rental',
    name: 'Car Rental',
    category: 'travel',
    shortDescription: 'Vehicle search, rates, booking, and rental policies',
    icon: 'CarFront',
    headline: 'Make Your Car Rental Business Agent-Ready',
    agentQuery:
      'Rent an SUV at LAX for next weekend, cheapest option',
    tools: [
      {
        name: 'search_vehicles',
        description: 'Search available rental vehicles by dates, location, and category',
        params: ['pickup_location: string', 'pickup_date: string', 'return_date: string', 'vehicle_category?: string'],
      },
      {
        name: 'get_rates',
        description: 'Get rental rates for specific vehicle categories and dates',
        params: ['pickup_location: string', 'pickup_date: string', 'return_date: string', 'vehicle_category?: string'],
      },
      {
        name: 'book_rental',
        description: 'Book a rental vehicle',
        params: ['renter_name: string', 'vehicle_id: string', 'pickup_date: string', 'return_date: string', 'insurance_option?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check vehicle availability at a specific location and dates',
        params: ['pickup_location: string', 'pickup_date: string', 'return_date: string'],
      },
      {
        name: 'get_policies',
        description: 'Get rental policies including fuel, mileage, and insurance options',
        params: [],
      },
    ],
    painPoints: [
      'Agents cannot search your fleet availability',
      'No programmatic way to compare your rates',
      'Missing from AI-powered car rental comparison searches',
    ],
    freeOffer: [
      'Agent card with vehicle categories, locations, and rates',
      'MCP endpoint for vehicle search, booking, and rates',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '25K+', avgScore: '22/100', topScore: 'Enterprise: 48' },
    metaDescription:
      'Make your car rental business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for vehicle search, booking, and rate comparison.',
  },
  {
    slug: 'tour-guide',
    name: 'Tours & Experiences',
    category: 'travel',
    shortDescription: 'Tour search, availability, booking, and reviews',
    icon: 'Map',
    headline: 'Make Your Tour Business Agent-Ready',
    agentQuery:
      'Find a walking food tour in Rome for 2 people next Saturday',
    tools: [
      {
        name: 'search_tours',
        description: 'Search available tours by type, date, and group size',
        params: ['tour_type?: string', 'date: string', 'group_size: number', 'language?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check tour availability for a specific date and group size',
        params: ['tour_id?: string', 'date: string', 'group_size: number'],
      },
      {
        name: 'book_tour',
        description: 'Book a tour or experience',
        params: ['tour_id: string', 'guest_name: string', 'group_size: number', 'date: string', 'time_slot: string'],
      },
      {
        name: 'get_details',
        description: 'Get detailed information about a specific tour',
        params: ['tour_id: string'],
      },
      {
        name: 'get_reviews',
        description: 'Get guest reviews and ratings for tours',
        params: ['tour_id?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your tour availability',
      'No programmatic way to book tours or experiences',
      'Missing from AI-powered travel experience searches',
    ],
    freeOffer: [
      'Agent card with tours, schedules, and pricing',
      'MCP endpoint for tour search, booking, and reviews',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '80K+', avgScore: '16/100', topScore: 'Viator: 50' },
    metaDescription:
      'Make your tour business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for tour search, booking, and availability.',
  },

  // =========================================================================
  // EDUCATION
  // =========================================================================
  {
    slug: 'online-courses',
    name: 'Online Courses / E-Learning',
    category: 'education',
    shortDescription: 'Course search, enrollment, and scheduling — agent-ready',
    icon: 'GraduationCap',
    headline: 'Make Your Online Courses Agent-Ready',
    agentQuery:
      'Find a Python data science course under $50, self-paced, with certificate',
    tools: [
      {
        name: 'search_courses',
        description: 'Search courses by subject, level, and format',
        params: ['subject: string', 'skill_level?: string', 'format?: string', 'max_price?: number'],
      },
      {
        name: 'get_curriculum',
        description: 'Get detailed curriculum and learning outcomes for a course',
        params: ['course_id: string'],
      },
      {
        name: 'enroll',
        description: 'Enroll in a course',
        params: ['course_id: string', 'student_name: string', 'email: string'],
      },
      {
        name: 'check_schedule',
        description: 'Check upcoming course start dates and cohort schedules',
        params: ['course_id?: string', 'subject?: string', 'start_after?: string'],
      },
      {
        name: 'get_pricing',
        description: 'Get pricing, discounts, and payment plan options',
        params: ['course_id: string', 'payment_plan?: boolean'],
      },
    ],
    painPoints: [
      'Agents cannot search your course catalog',
      'No programmatic way to enroll or check schedules',
      'Missing from AI-powered learning platform comparisons',
    ],
    freeOffer: [
      'Agent card with courses, subjects, and pricing',
      'MCP endpoint for course search and enrollment',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '100K+', avgScore: '30/100', topScore: 'Coursera: 55' },
    metaDescription:
      'Make your online courses discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for course search, enrollment, and scheduling.',
  },
  {
    slug: 'tutoring',
    name: 'Tutoring Service',
    category: 'education',
    shortDescription: 'Tutor matching, session booking, and rates — agent-ready',
    icon: 'BookOpen',
    headline: 'Make Your Tutoring Service Agent-Ready',
    agentQuery:
      'Find a calculus tutor for my high school junior, available Tuesdays after 4pm',
    tools: [
      {
        name: 'find_tutor',
        description: 'Find a tutor by subject, grade level, and availability',
        params: ['subject: string', 'grade_level: string', 'format?: string', 'zip_code?: string'],
      },
      {
        name: 'book_session',
        description: 'Book a tutoring session',
        params: ['student_name: string', 'subject: string', 'preferred_date: string', 'preferred_time: string', 'format?: string'],
      },
      {
        name: 'get_subjects',
        description: 'Get full list of subjects and topics offered',
        params: ['grade_level?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check tutor availability for scheduling',
        params: ['subject: string', 'date: string', 'time_preference?: string'],
      },
      {
        name: 'get_rates',
        description: 'Get tutoring rates by subject and package options',
        params: ['subject: string', 'package_size?: number'],
      },
    ],
    painPoints: [
      'Agents cannot match students with the right tutor',
      'No programmatic way to check availability and book sessions',
      'Missing from AI-powered tutoring searches',
    ],
    freeOffer: [
      'Agent card with subjects, tutors, and rates',
      'MCP endpoint for tutor matching and session booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '200K+', avgScore: '11/100', topScore: 'Wyzant: 38' },
    metaDescription:
      'Make your tutoring service discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for tutor matching and session booking.',
  },

  // =========================================================================
  // LOGISTICS
  // =========================================================================
  {
    slug: 'shipping',
    name: 'Shipping / Courier',
    category: 'logistics',
    shortDescription: 'Shipping quotes, tracking, pickup scheduling, and carrier comparison',
    icon: 'Package',
    headline: 'Make Your Shipping Business Agent-Ready',
    agentQuery:
      'Ship a 5lb package from Austin to NYC, cheapest 3-day option',
    tools: [
      {
        name: 'get_shipping_quote',
        description: 'Get a shipping quote based on package dimensions, weight, and route',
        params: ['origin_zip: string', 'destination_zip: string', 'weight_lbs: number', 'dimensions?: string', 'service_level?: string'],
      },
      {
        name: 'track_package',
        description: 'Track a package by tracking number',
        params: ['tracking_number: string'],
      },
      {
        name: 'schedule_pickup',
        description: 'Schedule a package pickup',
        params: ['pickup_address: string', 'contact_name: string', 'num_packages: number', 'preferred_date: string'],
      },
      {
        name: 'compare_carriers',
        description: 'Compare shipping rates across multiple carriers',
        params: ['origin_zip: string', 'destination_zip: string', 'weight_lbs: number', 'speed?: string'],
      },
      {
        name: 'get_delivery_estimate',
        description: 'Get delivery time estimate for a route and service level',
        params: ['origin_zip: string', 'destination_zip: string', 'service_level?: string'],
      },
    ],
    painPoints: [
      'Agents cannot get instant shipping quotes',
      'No programmatic way to compare carrier rates',
      'Missing from AI-powered shipping comparison searches',
    ],
    freeOffer: [
      'Agent card with services, coverage, and rate ranges',
      'MCP endpoint for quotes, tracking, and carrier comparison',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '40K+', avgScore: '24/100', topScore: 'UPS: 55' },
    metaDescription:
      'Make your shipping business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for quotes, tracking, and carrier comparison.',
  },
  {
    slug: 'moving',
    name: 'Moving Company',
    category: 'logistics',
    shortDescription: 'Moving estimates, booking, availability, and insurance',
    icon: 'Truck',
    headline: 'Make Your Moving Company Agent-Ready',
    agentQuery:
      'Get quotes for a 2-bedroom apartment move from Austin to Dallas next month',
    tools: [
      {
        name: 'get_estimate',
        description: 'Get a moving estimate based on home size, distance, and services',
        params: ['origin: string', 'destination: string', 'home_size: string', 'preferred_date: string', 'services?: string'],
      },
      {
        name: 'book_move',
        description: 'Book a move with date, crew, and services',
        params: ['customer_name: string', 'origin_address: string', 'destination_address: string', 'move_date: string', 'home_size: string'],
      },
      {
        name: 'check_availability',
        description: 'Check available move dates and crew availability',
        params: ['preferred_date: string', 'move_type?: string'],
      },
      {
        name: 'get_services',
        description: 'Get all available moving services and add-ons',
        params: [],
      },
      {
        name: 'check_insurance',
        description: 'Check moving insurance options and coverage levels',
        params: ['move_value?: number'],
      },
    ],
    painPoints: [
      'Agents cannot get instant moving estimates',
      'No programmatic way to check your availability',
      'Missing from AI-powered moving company searches',
    ],
    freeOffer: [
      'Agent card with services, service area, and pricing info',
      'MCP endpoint for estimates, booking, and availability',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '30K+', avgScore: '13/100', topScore: 'PODS: 38' },
    metaDescription:
      'Make your moving company discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for estimates, booking, and availability.',
  },

  // =========================================================================
  // HOME SERVICES (additional)
  // =========================================================================
  {
    slug: 'electrician',
    name: 'Electrician',
    category: 'local-services',
    shortDescription: 'Quotes, emergency dispatch, and service area checks',
    icon: 'Zap',
    headline: 'Make Your Electrical Business Agent-Ready',
    agentQuery:
      'I need an electrician today, my outlet is sparking, 78704',
    tools: [
      {
        name: 'get_quote',
        description: 'Get a quote for electrical work',
        params: ['service_type: string', 'description: string', 'property_type?: string'],
      },
      {
        name: 'book_service',
        description: 'Book an electrical service appointment',
        params: ['customer_name: string', 'address: string', 'issue_type: string', 'preferred_date: string', 'urgency?: string'],
      },
      {
        name: 'check_emergency_availability',
        description: 'Check emergency electrician availability',
        params: ['zip_code: string', 'issue: string'],
      },
      {
        name: 'get_services',
        description: 'Get full list of electrical services with pricing',
        params: ['category?: string'],
      },
      {
        name: 'check_service_area',
        description: 'Check if a zip code is within the service area',
        params: ['zip_code: string'],
      },
    ],
    painPoints: [
      'Agents cannot dispatch emergency electrical service',
      'No programmatic way to get quotes or book appointments',
      'Invisible to AI assistants during urgent searches',
    ],
    freeOffer: [
      'Agent card with services, licenses, and coverage area',
      'MCP endpoint for quotes, booking, and emergency dispatch',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '120K+', avgScore: '14/100', topScore: 'Mr. Electric: 36' },
    metaDescription:
      'Make your electrical business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for quotes, booking, and emergency dispatch.',
  },
  {
    slug: 'pest-control',
    name: 'Pest Control',
    category: 'local-services',
    shortDescription: 'Quotes, treatment options, and recurring plans — agent-ready',
    icon: 'Bug',
    headline: 'Make Your Pest Control Business Agent-Ready',
    agentQuery:
      'I have ants in my kitchen, need someone this week in Austin',
    tools: [
      {
        name: 'get_quote',
        description: 'Get a pest control quote based on pest type and property size',
        params: ['pest_type: string', 'property_type: string', 'sqft?: number', 'severity?: string'],
      },
      {
        name: 'book_service',
        description: 'Book a pest control service visit',
        params: ['customer_name: string', 'address: string', 'pest_type: string', 'preferred_date: string'],
      },
      {
        name: 'get_treatment_options',
        description: 'Get treatment options for a specific pest problem',
        params: ['pest_type: string', 'prefer_organic?: boolean', 'has_pets?: boolean', 'has_children?: boolean'],
      },
      {
        name: 'check_service_area',
        description: 'Check if a zip code is within the service area',
        params: ['zip_code: string'],
      },
      {
        name: 'get_recurring_plans',
        description: 'Get recurring pest control plan options and pricing',
        params: ['property_type: string', 'sqft?: number'],
      },
    ],
    painPoints: [
      'Agents cannot get instant pest control quotes',
      'No programmatic way to compare treatment options',
      'Missing from AI-powered home service searches',
    ],
    freeOffer: [
      'Agent card with services, treatment types, and coverage',
      'MCP endpoint for quotes, booking, and treatment options',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '35K+', avgScore: '13/100', topScore: 'Terminix: 38' },
    metaDescription:
      'Make your pest control business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for quotes, booking, and treatment options.',
  },
  {
    slug: 'locksmith',
    name: 'Locksmith',
    category: 'local-services',
    shortDescription: 'Emergency lockout dispatch, quotes, and service booking',
    icon: 'KeyRound',
    headline: 'Make Your Locksmith Business Agent-Ready',
    agentQuery:
      "I'm locked out of my house at 10pm, need emergency locksmith in 78704",
    tools: [
      {
        name: 'check_emergency_availability',
        description: 'Check emergency locksmith availability and ETA',
        params: ['zip_code: string', 'lockout_type: string', 'time_of_day?: string'],
      },
      {
        name: 'get_quote',
        description: 'Get a quote for locksmith services',
        params: ['service_type: string', 'lock_type?: string', 'quantity?: number'],
      },
      {
        name: 'book_service',
        description: 'Book a locksmith service appointment',
        params: ['customer_name: string', 'address: string', 'service_type: string', 'urgency: string'],
      },
      {
        name: 'get_services',
        description: 'Get full list of locksmith services and pricing',
        params: ['category?: string'],
      },
      {
        name: 'check_service_area',
        description: 'Check if a zip code is within the service area',
        params: ['zip_code: string'],
      },
    ],
    painPoints: [
      'Agents cannot dispatch emergency locksmith service',
      'No programmatic way to get lockout ETAs or quotes',
      'Invisible to AI assistants during urgent lockout searches',
    ],
    freeOffer: [
      'Agent card with services, emergency hours, and coverage',
      'MCP endpoint for emergency dispatch and booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '25K+', avgScore: '10/100', topScore: 'Pop-A-Lock: 32' },
    metaDescription:
      'Make your locksmith business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for emergency dispatch and service booking.',
  },

  // =========================================================================
  // PROFESSIONAL (additional)
  // =========================================================================
  {
    slug: 'photographer',
    name: 'Photographer / Videographer',
    category: 'professional',
    shortDescription: 'Availability, packages, portfolio, and session booking',
    icon: 'Camera',
    headline: 'Make Your Photography Business Agent-Ready',
    agentQuery:
      'Book a wedding photographer in Austin for June 15, under $3000',
    tools: [
      {
        name: 'check_availability',
        description: 'Check photographer availability for a specific date',
        params: ['date: string', 'event_type: string', 'duration_hours?: number'],
      },
      {
        name: 'get_packages',
        description: 'Get photography/videography packages and pricing',
        params: ['event_type: string', 'hours_needed?: number'],
      },
      {
        name: 'book_session',
        description: 'Book a photography session',
        params: ['client_name: string', 'event_type: string', 'date: string', 'location: string', 'package_id?: string'],
      },
      {
        name: 'get_portfolio',
        description: 'Browse portfolio work by event type or style',
        params: ['event_type?: string', 'style?: string'],
      },
      {
        name: 'get_pricing',
        description: 'Get detailed pricing for specific photography needs',
        params: ['event_type: string', 'hours?: number', 'add_ons?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your date availability',
      'No programmatic way to compare your packages',
      'Missing from AI-powered photographer searches',
    ],
    freeOffer: [
      'Agent card with portfolio, packages, and availability',
      'MCP endpoint for availability, booking, and pricing',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '500K+', avgScore: '11/100', topScore: 'The Knot: 42' },
    metaDescription:
      'Make your photography business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for availability, booking, and portfolio.',
  },
  {
    slug: 'veterinarian',
    name: 'Veterinarian',
    category: 'professional',
    shortDescription: 'Appointments, emergency vet, services, and pet insurance checks',
    icon: 'Heart',
    headline: 'Make Your Veterinary Practice Agent-Ready',
    agentQuery:
      'My dog is vomiting, is there an emergency vet open now near 78704?',
    tools: [
      {
        name: 'book_appointment',
        description: 'Book a vet appointment for a pet',
        params: ['owner_name: string', 'pet_name: string', 'pet_type: string', 'reason: string', 'preferred_date: string'],
      },
      {
        name: 'check_emergency',
        description: 'Check emergency vet availability',
        params: ['pet_type: string', 'symptoms: string', 'severity?: string'],
      },
      {
        name: 'get_services',
        description: 'Get vet services with pricing',
        params: ['pet_type?: string', 'category?: string'],
      },
      {
        name: 'check_insurance',
        description: 'Check if pet insurance is accepted and estimate costs',
        params: ['insurance_provider: string', 'service_type?: string'],
      },
      {
        name: 'get_hours',
        description: 'Get clinic hours and emergency availability',
        params: [],
      },
    ],
    painPoints: [
      'Agents cannot check emergency vet availability',
      'No programmatic way to book pet appointments',
      'Missing from AI-powered veterinary searches',
    ],
    freeOffer: [
      'Agent card with services, hours, and emergency info',
      'MCP endpoint for appointments, emergency checks, and insurance',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '75K+', avgScore: '15/100', topScore: 'VCA: 42' },
    metaDescription:
      'Make your veterinary practice discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for appointments, emergency checks, and services.',
  },

  // =========================================================================
  // RETAIL (additional)
  // =========================================================================
  {
    slug: 'grocery',
    name: 'Grocery / Food Delivery',
    category: 'retail',
    shortDescription: 'Product search, ordering, delivery slots, and store info',
    icon: 'ShoppingCart',
    headline: 'Make Your Grocery Store Agent-Ready',
    agentQuery:
      'Order groceries for delivery today: milk, eggs, bread, chicken breast',
    tools: [
      {
        name: 'search_products',
        description: 'Search grocery products by name, category, or dietary needs',
        params: ['query: string', 'category?: string', 'dietary?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check if specific products are in stock',
        params: ['products: string'],
      },
      {
        name: 'place_order',
        description: 'Place a grocery order for delivery or pickup',
        params: ['items: string', 'customer_name: string', 'delivery_address?: string', 'delivery_slot?: string'],
      },
      {
        name: 'get_delivery_slots',
        description: 'Get available delivery time slots',
        params: ['zip_code: string', 'date?: string'],
      },
      {
        name: 'get_store_info',
        description: 'Get store details including hours, departments, and policies',
        params: [],
      },
    ],
    painPoints: [
      'Agents cannot search your product inventory',
      'No programmatic way to place delivery orders',
      'Missing from AI-powered grocery delivery searches',
    ],
    freeOffer: [
      'Agent card with departments, delivery area, and hours',
      'MCP endpoint for product search and ordering',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '65K+', avgScore: '20/100', topScore: 'Instacart: 50' },
    metaDescription:
      'Make your grocery store discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for product search, ordering, and delivery.',
  },
  {
    slug: 'florist',
    name: 'Florist',
    category: 'retail',
    shortDescription: 'Arrangements, delivery, ordering, and pricing — agent-ready',
    icon: 'Flower2',
    headline: 'Make Your Flower Shop Agent-Ready',
    agentQuery:
      'Send a dozen red roses to 123 Main St tomorrow before noon, under $80',
    tools: [
      {
        name: 'browse_arrangements',
        description: 'Browse floral arrangements by occasion, style, and price',
        params: ['occasion?: string', 'style?: string', 'max_price?: number'],
      },
      {
        name: 'check_availability',
        description: 'Check arrangement availability and delivery options for a date',
        params: ['delivery_date: string', 'delivery_zip: string', 'arrangement_id?: string'],
      },
      {
        name: 'place_order',
        description: 'Place a floral order for delivery',
        params: ['arrangement_id: string', 'sender_name: string', 'recipient_name: string', 'delivery_address: string', 'delivery_date: string', 'card_message?: string'],
      },
      {
        name: 'get_delivery_options',
        description: 'Get delivery options and pricing for a zip code',
        params: ['zip_code: string', 'date?: string'],
      },
      {
        name: 'get_pricing',
        description: 'Get pricing ranges for different arrangement types',
        params: ['occasion?: string', 'size?: string'],
      },
    ],
    painPoints: [
      'Agents cannot browse your arrangements or check delivery',
      'No programmatic way to place flower orders',
      'Missing from AI-powered flower delivery searches',
    ],
    freeOffer: [
      'Agent card with arrangements, delivery area, and pricing',
      'MCP endpoint for browsing, ordering, and delivery',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '40K+', avgScore: '12/100', topScore: '1-800-Flowers: 44' },
    metaDescription:
      'Make your flower shop discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for browsing arrangements, ordering, and delivery.',
  },

  // =========================================================================
  // MEDIA & ENTERTAINMENT
  // =========================================================================
  {
    slug: 'event-venue',
    name: 'Event Venues',
    category: 'retail',
    shortDescription: 'Availability, pricing, and booking for any event type',
    icon: 'Landmark',
    headline: 'Make Your Event Venue Agent-Ready',
    agentQuery:
      'Find a venue for 150 people in Austin for a corporate event on March 15',
    tools: [
      {
        name: 'check_availability',
        description: 'Check venue availability for a given date, event type, and capacity',
        params: ['date: string', 'event_type: string', 'guest_count: number'],
      },
      {
        name: 'get_pricing',
        description: 'Return pricing packages for the venue by event type and day of week',
        params: ['event_type: string', 'day_of_week?: string', 'duration_hours?: number'],
      },
      {
        name: 'book_venue',
        description: 'Reserve the venue for a specific date and event configuration',
        params: ['date: string', 'event_type: string', 'guest_count: number', 'contact_email: string'],
      },
      {
        name: 'get_capacity',
        description: 'Return capacity info for different room layouts and configurations',
        params: ['layout?: string', 'room?: string'],
      },
      {
        name: 'get_amenities',
        description: 'Return available amenities, AV equipment, catering options, and add-ons',
        params: ['category?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your venue availability',
      'No programmatic way to get event pricing',
      'Missing from AI-powered event planning searches',
    ],
    freeOffer: [
      'Agent card with capacity, amenities, and pricing',
      'MCP endpoint for availability and booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '200K+', avgScore: '17/100', topScore: 'Peerspace: 41' },
    metaDescription:
      'Make your event venue discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for availability checks and booking.',
  },
  {
    slug: 'music-teacher',
    name: 'Music Lessons',
    category: 'local-services',
    shortDescription: 'Instrument lessons, scheduling, and teacher matching',
    icon: 'Music',
    headline: 'Make Your Music Lesson Business Agent-Ready',
    agentQuery:
      'Find piano lessons for my 8-year-old, Saturdays in north Austin',
    tools: [
      {
        name: 'find_teacher',
        description: 'Find a music teacher by instrument, experience level, and location',
        params: ['instrument: string', 'student_age?: number', 'experience_level?: string', 'zip_code?: string'],
      },
      {
        name: 'book_lesson',
        description: 'Book a music lesson with a specific teacher',
        params: ['teacher_id: string', 'date: string', 'time_slot: string', 'student_name: string'],
      },
      {
        name: 'get_instruments',
        description: 'Return all instruments taught with teacher availability',
        params: ['category?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check available lesson slots by teacher or instrument',
        params: ['teacher_id?: string', 'instrument?: string', 'day_of_week?: string'],
      },
      {
        name: 'get_rates',
        description: 'Return lesson rates by instrument, duration, and package options',
        params: ['instrument?: string', 'lesson_duration?: number'],
      },
    ],
    painPoints: [
      'Agents cannot match students with the right teacher',
      'No programmatic way to book music lessons',
      'Missing from AI-powered education searches',
    ],
    freeOffer: [
      'Agent card with instruments, teachers, and rates',
      'MCP endpoint for matching and booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '150K+', avgScore: '11/100', topScore: 'Lessonface: 32' },
    metaDescription:
      'Make your music lesson business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for teacher matching and booking.',
  },
  {
    slug: 'fitness',
    name: 'Gyms & Fitness Studios',
    category: 'local-services',
    shortDescription: 'Classes, memberships, and schedules — all agent-callable',
    icon: 'Dumbbell',
    headline: 'Make Your Fitness Business Agent-Ready',
    agentQuery:
      'Find a yoga class near me tomorrow morning, drop-in OK',
    tools: [
      {
        name: 'get_classes',
        description: 'Return class schedule with types, times, instructors, and openings',
        params: ['class_type?: string', 'date?: string', 'instructor?: string'],
      },
      {
        name: 'book_class',
        description: 'Reserve a spot in a specific class session',
        params: ['class_id: string', 'attendee_name: string', 'is_drop_in?: boolean'],
      },
      {
        name: 'get_membership_options',
        description: 'Return membership tiers, pricing, and included perks',
        params: ['membership_type?: string'],
      },
      {
        name: 'check_schedule',
        description: 'Check schedule and availability for classes on a given date',
        params: ['date: string', 'class_type?: string'],
      },
      {
        name: 'get_trial',
        description: 'Get free trial or day pass options and sign-up instructions',
        params: ['pass_type?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your class schedule or openings',
      'No programmatic way to book drop-in classes',
      'Missing from AI-powered fitness searches',
    ],
    freeOffer: [
      'Agent card with classes, schedule, and membership info',
      'MCP endpoint for schedule and class booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '115K+', avgScore: '20/100', topScore: 'ClassPass: 48' },
    metaDescription:
      'Make your gym or fitness studio discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for class schedules and booking.',
  },

  // =========================================================================
  // AUTOMOTIVE
  // =========================================================================
  {
    slug: 'auto-repair',
    name: 'Auto Repair',
    category: 'local-services',
    shortDescription: 'Diagnostics, estimates, and appointments on demand',
    icon: 'Wrench',
    headline: 'Make Your Auto Repair Shop Agent-Ready',
    agentQuery:
      'My check engine light is on, get me an appointment this week under $100 diagnostic',
    tools: [
      {
        name: 'get_estimate',
        description: 'Return a repair estimate for a described automotive issue',
        params: ['issue_description: string', 'vehicle_year?: number', 'vehicle_make?: string', 'vehicle_model?: string'],
      },
      {
        name: 'book_appointment',
        description: 'Schedule an auto repair or diagnostic appointment',
        params: ['service_type: string', 'preferred_date: string', 'vehicle_info: string', 'customer_name: string'],
      },
      {
        name: 'check_availability',
        description: 'Check open appointment slots for a given date',
        params: ['date: string', 'service_type?: string'],
      },
      {
        name: 'get_services',
        description: 'Return all services offered with pricing and descriptions',
        params: ['category?: string'],
      },
      {
        name: 'check_warranty',
        description: 'Check warranty coverage on previous repairs',
        params: ['repair_id?: string', 'vehicle_vin?: string'],
      },
    ],
    painPoints: [
      'Agents cannot get diagnostic estimates from your shop',
      'No programmatic way to book repair appointments',
      'Missing from AI-powered auto service searches',
    ],
    freeOffer: [
      'Agent card with services, certifications, and pricing',
      'MCP endpoint for estimates and booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '280K+', avgScore: '14/100', topScore: 'RepairPal: 39' },
    metaDescription:
      'Make your auto repair shop discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for estimates and appointment booking.',
  },
  {
    slug: 'car-wash',
    name: 'Car Wash & Detailing',
    category: 'local-services',
    shortDescription: 'Services, packages, and booking for any vehicle',
    icon: 'Droplet',
    headline: 'Make Your Car Wash Business Agent-Ready',
    agentQuery:
      'Book a full detail for my SUV this Saturday, mobile service preferred',
    tools: [
      {
        name: 'get_services',
        description: 'Return all wash and detail services with descriptions',
        params: ['vehicle_type?: string'],
      },
      {
        name: 'get_pricing',
        description: 'Return pricing by vehicle size, service type, and package',
        params: ['vehicle_type: string', 'service_type?: string'],
      },
      {
        name: 'book_appointment',
        description: 'Book a car wash or detailing appointment',
        params: ['service_type: string', 'vehicle_type: string', 'preferred_date: string', 'mobile_service?: boolean'],
      },
      {
        name: 'get_packages',
        description: 'Return membership and package deals with pricing',
        params: ['vehicle_type?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check available time slots for a given date and service',
        params: ['date: string', 'service_type?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your availability or pricing',
      'No programmatic way to book detailing appointments',
      'Missing from AI-powered car care searches',
    ],
    freeOffer: [
      'Agent card with services, packages, and pricing',
      'MCP endpoint for booking and pricing',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '60K+', avgScore: '12/100', topScore: 'Washos: 34' },
    metaDescription:
      'Make your car wash or detailing business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for service booking.',
  },

  // =========================================================================
  // BEAUTY & WELLNESS
  // =========================================================================
  {
    slug: 'salon',
    name: 'Hair Salons & Barbers',
    category: 'local-services',
    shortDescription: 'Appointments, stylists, and services — all agent-callable',
    icon: 'Scissors',
    headline: 'Make Your Salon Agent-Ready',
    agentQuery:
      "Book a men's haircut for Saturday morning near downtown",
    tools: [
      {
        name: 'book_appointment',
        description: 'Book a salon appointment with a specific service and stylist',
        params: ['service_type: string', 'preferred_date: string', 'time_slot: string', 'stylist_id?: string'],
      },
      {
        name: 'get_services',
        description: 'Return all salon services with pricing, duration, and descriptions',
        params: ['category?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check available appointment slots by stylist and date',
        params: ['date: string', 'stylist_id?: string', 'service_type?: string'],
      },
      {
        name: 'get_pricing',
        description: 'Return pricing for services by hair type, length, and stylist tier',
        params: ['service_type: string', 'hair_length?: string'],
      },
      {
        name: 'find_stylist',
        description: 'Find a stylist by specialty, availability, or rating',
        params: ['specialty?: string', 'available_date?: string', 'gender_preference?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your stylist availability',
      'No programmatic way to book salon appointments',
      'Missing from AI-powered beauty searches',
    ],
    freeOffer: [
      'Agent card with services, stylists, and pricing',
      'MCP endpoint for booking and availability',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '1.2M+', avgScore: '16/100', topScore: 'Booksy: 43' },
    metaDescription:
      'Make your salon or barbershop discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for appointment booking.',
  },
  {
    slug: 'spa',
    name: 'Spas & Massage',
    category: 'local-services',
    shortDescription: 'Treatments, packages, and couples booking on demand',
    icon: 'Flower2',
    headline: 'Make Your Spa Agent-Ready',
    agentQuery:
      'Book a 60-minute deep tissue massage for two this weekend',
    tools: [
      {
        name: 'book_appointment',
        description: 'Book a spa appointment for one or multiple guests',
        params: ['treatment_type: string', 'preferred_date: string', 'guest_count: number', 'duration_minutes?: number'],
      },
      {
        name: 'get_treatments',
        description: 'Return all treatments with descriptions, durations, and pricing',
        params: ['category?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check available treatment slots by date and therapist',
        params: ['date: string', 'treatment_type?: string', 'therapist_id?: string'],
      },
      {
        name: 'get_packages',
        description: 'Return spa packages, couples deals, and gift card options',
        params: ['package_type?: string'],
      },
      {
        name: 'get_pricing',
        description: 'Return pricing for treatments by type, duration, and add-ons',
        params: ['treatment_type: string', 'duration_minutes?: number'],
      },
    ],
    painPoints: [
      'Agents cannot check your treatment availability',
      'No programmatic way to book spa appointments',
      'Missing from AI-powered wellness searches',
    ],
    freeOffer: [
      'Agent card with treatments, pricing, and packages',
      'MCP endpoint for booking and availability',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '90K+', avgScore: '15/100', topScore: 'Mindbody: 44' },
    metaDescription:
      'Make your spa discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for treatment booking and packages.',
  },
  {
    slug: 'nail-salon',
    name: 'Nail Salons',
    category: 'local-services',
    shortDescription: 'Services, pricing, and walk-in availability',
    icon: 'Paintbrush',
    headline: 'Make Your Nail Salon Agent-Ready',
    agentQuery:
      'Book a gel manicure for tomorrow afternoon near 78704',
    tools: [
      {
        name: 'book_appointment',
        description: 'Book a nail service appointment with optional technician preference',
        params: ['service_type: string', 'preferred_date: string', 'time_slot: string', 'technician_id?: string'],
      },
      {
        name: 'get_services',
        description: 'Return all nail services with pricing and duration',
        params: ['category?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check walk-in and appointment availability for a given date',
        params: ['date: string', 'service_type?: string'],
      },
      {
        name: 'get_pricing',
        description: 'Return pricing for services with add-on options',
        params: ['service_type?: string'],
      },
      {
        name: 'get_hours',
        description: 'Return operating hours, walk-in policy, and wait times',
        params: ['date?: string'],
      },
    ],
    painPoints: [
      'Agents cannot check your walk-in availability',
      'No programmatic way to book nail appointments',
      'Missing from AI-powered beauty service searches',
    ],
    freeOffer: [
      'Agent card with services, pricing, and hours',
      'MCP endpoint for booking and availability',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '395K+', avgScore: '10/100', topScore: 'Vagaro: 36' },
    metaDescription:
      'Make your nail salon discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for service booking and availability.',
  },

  // =========================================================================
  // FOOD & DRINK
  // =========================================================================
  {
    slug: 'bakery',
    name: 'Bakeries & Cake Shops',
    category: 'retail',
    shortDescription: 'Menus, custom orders, and pickup scheduling',
    icon: 'CakeSlice',
    headline: 'Make Your Bakery Agent-Ready',
    agentQuery:
      'Order a custom birthday cake for 20 people, pick up Saturday',
    tools: [
      {
        name: 'browse_menu',
        description: 'Return the full bakery menu with items, prices, and availability',
        params: ['category?: string', 'dietary_filter?: string'],
      },
      {
        name: 'place_order',
        description: 'Submit a bakery order for pickup or delivery',
        params: ['items: string[]', 'pickup_date: string', 'pickup_time?: string', 'delivery_address?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check if specific items are available on a given date',
        params: ['items: string[]', 'date: string'],
      },
      {
        name: 'get_custom_quote',
        description: 'Get a quote for custom cakes or large orders',
        params: ['description: string', 'servings: number', 'event_date: string', 'dietary_needs?: string'],
      },
      {
        name: 'get_delivery_options',
        description: 'Return delivery areas, fees, and minimum order requirements',
        params: ['zip_code: string'],
      },
    ],
    painPoints: [
      'Agents cannot browse your menu or check item availability',
      'No programmatic way to place custom cake orders',
      'Missing from AI-powered food ordering searches',
    ],
    freeOffer: [
      'Agent card with menu, specialties, and ordering info',
      'MCP endpoint for ordering and custom quotes',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '40K+', avgScore: '13/100', topScore: 'Nothing Bundt Cakes: 36' },
    metaDescription:
      'Make your bakery discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for menu browsing and custom orders.',
  },
  {
    slug: 'catering',
    name: 'Catering Services',
    category: 'retail',
    shortDescription: 'Menus, quotes, and event booking for any occasion',
    icon: 'ChefHat',
    headline: 'Make Your Catering Business Agent-Ready',
    agentQuery:
      'Get catering quotes for a 50-person office lunch, need vegetarian options',
    tools: [
      {
        name: 'get_menus',
        description: 'Return catering menus by event type and cuisine style',
        params: ['event_type?: string', 'cuisine?: string', 'dietary_needs?: string'],
      },
      {
        name: 'get_quote',
        description: 'Get a catering quote for a specific event',
        params: ['guest_count: number', 'event_type: string', 'menu_selections: string[]', 'service_level?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check caterer availability for a given event date',
        params: ['event_date: string', 'guest_count: number'],
      },
      {
        name: 'book_event',
        description: 'Book catering for an event with menu and details',
        params: ['event_date: string', 'guest_count: number', 'menu_id: string', 'venue_address: string', 'contact_email: string'],
      },
      {
        name: 'get_dietary_options',
        description: 'Return available dietary accommodations and allergy-friendly options',
        params: ['dietary_needs: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot browse your catering menus',
      'No programmatic way to get catering quotes',
      'Missing from AI-powered event planning searches',
    ],
    freeOffer: [
      'Agent card with menus, pricing, and event types',
      'MCP endpoint for quotes and event booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '120K+', avgScore: '15/100', topScore: 'ezCater: 45' },
    metaDescription:
      'Make your catering business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for menu browsing and event booking.',
  },

  // =========================================================================
  // PROPERTY
  // =========================================================================
  {
    slug: 'property-management',
    name: 'Property Management',
    category: 'professional',
    shortDescription: 'Rental search, applications, and maintenance requests',
    icon: 'Building',
    headline: 'Make Your Property Management Business Agent-Ready',
    agentQuery:
      'Find a 2-bed apartment under $2000/mo in Austin, pet-friendly, available June 1',
    tools: [
      {
        name: 'search_rentals',
        description: 'Search available rental listings by price, size, and features',
        params: ['price_max?: number', 'bedrooms?: number', 'location: string', 'pet_friendly?: boolean'],
      },
      {
        name: 'submit_application',
        description: 'Submit a rental application for a specific property',
        params: ['listing_id: string', 'applicant_name: string', 'email: string', 'move_in_date: string'],
      },
      {
        name: 'submit_maintenance',
        description: 'Submit a maintenance request for a current tenant',
        params: ['unit_id: string', 'issue_type: string', 'description: string', 'urgency: string'],
      },
      {
        name: 'get_availability',
        description: 'Check which units are available and their move-in dates',
        params: ['property_id?: string', 'move_in_date?: string'],
      },
      {
        name: 'get_lease_terms',
        description: 'Return lease terms, fees, pet policies, and utility info',
        params: ['listing_id: string'],
      },
    ],
    painPoints: [
      'Agents cannot search your available rentals',
      'No programmatic way to submit rental applications',
      'Missing from AI-powered apartment searches',
    ],
    freeOffer: [
      'Agent card with listings, policies, and contact info',
      'MCP endpoint for search and applications',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '300K+', avgScore: '21/100', topScore: 'Zillow Rentals: 50' },
    metaDescription:
      'Make your property management business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for rental search and applications.',
  },
  {
    slug: 'storage',
    name: 'Self Storage',
    category: 'local-services',
    shortDescription: 'Unit search, pricing, and reservations on demand',
    icon: 'Package',
    headline: 'Make Your Storage Facility Agent-Ready',
    agentQuery:
      'Find a 10x10 climate-controlled storage unit near 78704, cheapest monthly',
    tools: [
      {
        name: 'search_units',
        description: 'Search available storage units by size, type, and location',
        params: ['size?: string', 'climate_controlled?: boolean', 'zip_code: string'],
      },
      {
        name: 'check_availability',
        description: 'Check which unit sizes are currently available',
        params: ['unit_size?: string', 'move_in_date?: string'],
      },
      {
        name: 'reserve_unit',
        description: 'Reserve a storage unit with move-in details',
        params: ['unit_id: string', 'move_in_date: string', 'customer_name: string', 'email: string'],
      },
      {
        name: 'get_pricing',
        description: 'Return monthly pricing by unit size with any specials or promotions',
        params: ['unit_size?: string', 'duration_months?: number'],
      },
      {
        name: 'get_features',
        description: 'Return facility features like security, access hours, and amenities',
        params: ['fields?: string[]'],
      },
    ],
    painPoints: [
      'Agents cannot check your unit availability or pricing',
      'No programmatic way to reserve storage units',
      'Missing from AI-powered storage searches',
    ],
    freeOffer: [
      'Agent card with unit sizes, pricing, and features',
      'MCP endpoint for search and reservations',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '60K+', avgScore: '18/100', topScore: 'Public Storage: 42' },
    metaDescription:
      'Make your storage facility discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for unit search and reservations.',
  },

  // =========================================================================
  // TRADE SERVICES
  // =========================================================================
  {
    slug: 'painter',
    name: 'House Painters',
    category: 'local-services',
    shortDescription: 'Estimates, consultations, and project portfolios',
    icon: 'PaintBucket',
    headline: 'Make Your Painting Business Agent-Ready',
    agentQuery:
      'Get estimates to paint 3 bedrooms, need it done next week',
    tools: [
      {
        name: 'get_estimate',
        description: 'Get a painting estimate based on room count, size, and paint type',
        params: ['rooms: number', 'room_sizes?: string', 'paint_type?: string', 'interior_exterior: string'],
      },
      {
        name: 'book_consultation',
        description: 'Schedule an in-home painting consultation',
        params: ['address: string', 'preferred_date: string', 'project_description: string'],
      },
      {
        name: 'check_availability',
        description: 'Check painter availability for a given timeframe',
        params: ['start_date: string', 'project_duration_days?: number'],
      },
      {
        name: 'get_services',
        description: 'Return all painting services with descriptions and pricing',
        params: ['category?: string'],
      },
      {
        name: 'get_portfolio',
        description: 'View completed project photos and before/after galleries',
        params: ['project_type?: string'],
      },
    ],
    painPoints: [
      'Agents cannot get painting estimates from your business',
      'No programmatic way to book painting consultations',
      'Missing from AI-powered home improvement searches',
    ],
    freeOffer: [
      'Agent card with services, portfolio, and pricing',
      'MCP endpoint for estimates and consultations',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '300K+', avgScore: '9/100', topScore: 'CertaPro: 33' },
    metaDescription:
      'Make your painting business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for estimates and consultation booking.',
  },
  {
    slug: 'landscaper',
    name: 'Landscapers & Hardscaping',
    category: 'local-services',
    shortDescription: 'Design consultations, estimates, and project booking',
    icon: 'Trees',
    headline: 'Make Your Landscaping Business Agent-Ready',
    agentQuery:
      'Need a patio design consultation, 400 sqft backyard in Austin',
    tools: [
      {
        name: 'get_estimate',
        description: 'Get a landscaping or hardscaping project estimate',
        params: ['project_type: string', 'area_sqft: number', 'description: string'],
      },
      {
        name: 'book_consultation',
        description: 'Schedule an on-site design consultation',
        params: ['address: string', 'preferred_date: string', 'project_type: string'],
      },
      {
        name: 'get_services',
        description: 'Return all landscaping and hardscaping services offered',
        params: ['category?: string'],
      },
      {
        name: 'check_availability',
        description: 'Check crew availability for project start dates',
        params: ['start_date: string', 'project_size?: string'],
      },
      {
        name: 'get_portfolio',
        description: 'View completed landscape design and hardscaping projects',
        params: ['project_type?: string'],
      },
    ],
    painPoints: [
      'Agents cannot get landscape design estimates',
      'No programmatic way to book design consultations',
      'Missing from AI-powered home and garden searches',
    ],
    freeOffer: [
      'Agent card with services, portfolio, and pricing',
      'MCP endpoint for estimates and consultations',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '500K+', avgScore: '11/100', topScore: 'Yardzen: 37' },
    metaDescription:
      'Make your landscaping business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for design consultations and estimates.',
  },
  {
    slug: 'pool-service',
    name: 'Pool Service & Maintenance',
    category: 'local-services',
    shortDescription: 'Cleaning plans, service quotes, and scheduling',
    icon: 'Waves',
    headline: 'Make Your Pool Service Business Agent-Ready',
    agentQuery:
      'Need weekly pool cleaning service for a 15,000 gallon pool in 78704',
    tools: [
      {
        name: 'get_quote',
        description: 'Get a quote for pool service based on pool size and service type',
        params: ['pool_size_gallons: number', 'service_type: string', 'frequency?: string'],
      },
      {
        name: 'book_service',
        description: 'Book a pool cleaning or maintenance service visit',
        params: ['service_type: string', 'preferred_date: string', 'address: string', 'pool_size_gallons?: number'],
      },
      {
        name: 'get_maintenance_plans',
        description: 'Return recurring maintenance plan options and pricing',
        params: ['pool_type?: string', 'pool_size_gallons?: number'],
      },
      {
        name: 'check_service_area',
        description: 'Check if a location is within the service coverage area',
        params: ['zip_code: string'],
      },
      {
        name: 'get_services',
        description: 'Return all pool services offered with descriptions and pricing',
        params: ['category?: string'],
      },
    ],
    painPoints: [
      'Agents cannot get pool service quotes from your business',
      'No programmatic way to book pool cleaning',
      'Missing from AI-powered home service searches',
    ],
    freeOffer: [
      'Agent card with services, plans, and coverage area',
      'MCP endpoint for quotes and service booking',
      'Listed in agent-searchable directories',
    ],
    stats: { businesses: '80K+', avgScore: '8/100', topScore: 'Pool Scouts: 30' },
    metaDescription:
      'Make your pool service business discoverable by AI agents. Get a free Agent Readiness Score and MCP endpoint for quotes and service booking.',
  },
]

export function getVerticalBySlug(slug: string): VerticalData | undefined {
  return verticals.find((v) => v.slug === slug)
}

export function getAllVerticalSlugs(): string[] {
  return verticals.map((v) => v.slug)
}

export function getVerticalsByCategory(category: VerticalCategory): VerticalData[] {
  return verticals.filter((v) => v.category === category)
}

export const categoryLabels: Record<VerticalCategory, string> = {
  'local-services': 'Local Services',
  retail: 'Retail',
  professional: 'Professional',
  'tech-emerging': 'Tech & Emerging',
  healthcare: 'Healthcare',
  finance: 'Finance',
  travel: 'Travel & Hospitality',
  education: 'Education',
  logistics: 'Logistics',
}

export const categoryOrder: VerticalCategory[] = [
  'local-services',
  'retail',
  'professional',
  'tech-emerging',
  'healthcare',
  'finance',
  'travel',
  'education',
  'logistics',
]
