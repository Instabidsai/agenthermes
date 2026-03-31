// ---------------------------------------------------------------------------
// Vertical landing page data
// Each vertical defines the content for /for/[vertical]
// ---------------------------------------------------------------------------

export interface VerticalTool {
  name: string
  description: string
  params: string[]
}

export interface VerticalData {
  slug: string
  name: string
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
]

export function getVerticalBySlug(slug: string): VerticalData | undefined {
  return verticals.find((v) => v.slug === slug)
}

export function getAllVerticalSlugs(): string[] {
  return verticals.map((v) => v.slug)
}
