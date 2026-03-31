// ---------------------------------------------------------------------------
// Vertical Template Engine — The core of the AgentHermes free offer.
// Each template defines what a business in that vertical needs to become
// agent-ready: fields to collect, MCP tools to generate, fulfillment routing.
// ---------------------------------------------------------------------------

export type VerticalCategory =
  | 'local_services'
  | 'professional'
  | 'retail'
  | 'tech'
  | 'emerging'

export type FieldType =
  | 'text'
  | 'textarea'
  | 'url'
  | 'email'
  | 'phone'
  | 'number'
  | 'select'
  | 'multi_select'
  | 'boolean'
  | 'json'

export interface Field {
  key: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  helpText?: string
  options?: { value: string; label: string }[]
  defaultValue?: string | number | boolean
}

export interface McpToolParam {
  name: string
  type: string
  required: boolean
  description: string
  enum?: string[]
}

export interface McpToolTemplate {
  name: string
  description: string
  inputSchema: McpToolParam[]
  outputFields: string[]
  category: 'find' | 'understand' | 'evaluate' | 'book' | 'pay' | 'follow_up'
}

export interface VerticalTemplate {
  id: string
  name: string
  icon: string
  category: VerticalCategory
  description: string
  baseFields: Field[]
  verticalFields: Field[]
  mcpTools: McpToolTemplate[]
  fulfillmentOptions: string[]
  exampleAgentQuery: string
  leadValue: string
}

// ---------------------------------------------------------------------------
// Universal base fields — every business needs these 8
// ---------------------------------------------------------------------------

const BASE_FIELDS: Field[] = [
  {
    key: 'business_name',
    label: 'Business Name',
    type: 'text',
    required: true,
    placeholder: 'Acme HVAC Services',
  },
  {
    key: 'description',
    label: 'Business Description',
    type: 'textarea',
    required: true,
    placeholder: 'What does your business do? One paragraph.',
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'phone',
    required: true,
    placeholder: '(555) 123-4567',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'hello@business.com',
  },
  {
    key: 'address',
    label: 'Address',
    type: 'text',
    required: true,
    placeholder: '123 Main St, Austin, TX 78701',
  },
  {
    key: 'website',
    label: 'Website',
    type: 'url',
    required: false,
    placeholder: 'https://www.yourbusiness.com',
  },
  {
    key: 'hours',
    label: 'Hours of Operation',
    type: 'textarea',
    required: true,
    placeholder: 'Mon-Fri 8am-6pm, Sat 9am-2pm, Sun Closed',
    helpText: 'List your hours for each day, including holidays if relevant.',
  },
  {
    key: 'service_area',
    label: 'Service Area',
    type: 'text',
    required: true,
    placeholder: 'Austin metro, zip codes 78701-78799',
    helpText: 'Where do you serve? Zip codes, cities, or radius from your location.',
  },
]

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

const TEMPLATES: VerticalTemplate[] = [
  // =========================================================================
  // LOCAL SERVICES
  // =========================================================================
  {
    id: 'hvac',
    name: 'HVAC / AC Company',
    icon: 'Thermometer',
    category: 'local_services',
    description: 'Heating, cooling, and air quality services for homes and businesses.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'emergency_available',
        label: 'Emergency / After-Hours Service',
        type: 'boolean',
        required: true,
        defaultValue: false,
      },
      {
        key: 'emergency_fee',
        label: 'Emergency Service Fee',
        type: 'number',
        required: false,
        placeholder: '99',
        helpText: 'After-hours / emergency dispatch fee in dollars.',
      },
      {
        key: 'diagnostic_fee',
        label: 'Diagnostic Fee',
        type: 'number',
        required: true,
        placeholder: '89',
      },
      {
        key: 'diagnostic_waived',
        label: 'Diagnostic Fee Waived If Repaired',
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
      {
        key: 'system_types',
        label: 'System Types Serviced',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'central_ac', label: 'Central AC' },
          { value: 'heat_pump', label: 'Heat Pump' },
          { value: 'furnace', label: 'Furnace' },
          { value: 'mini_split', label: 'Mini Split' },
          { value: 'window_unit', label: 'Window Unit' },
          { value: 'boiler', label: 'Boiler' },
          { value: 'geothermal', label: 'Geothermal' },
        ],
      },
      {
        key: 'maintenance_plans',
        label: 'Maintenance Plans Offered',
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
      {
        key: 'avg_response_time',
        label: 'Average Response Time',
        type: 'select',
        required: true,
        options: [
          { value: '1-2_hours', label: '1-2 hours' },
          { value: '2-4_hours', label: '2-4 hours' },
          { value: 'same_day', label: 'Same day' },
          { value: 'next_day', label: 'Next business day' },
        ],
      },
      {
        key: 'booking_system',
        label: 'Booking / Dispatch System',
        type: 'select',
        required: false,
        options: [
          { value: 'servicetitan', label: 'ServiceTitan' },
          { value: 'housecall_pro', label: 'Housecall Pro' },
          { value: 'jobber', label: 'Jobber' },
          { value: 'fieldedge', label: 'FieldEdge' },
          { value: 'calendly', label: 'Calendly' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None (phone/email)' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'check_emergency_availability',
        description: 'Check if emergency/same-day service is available for the given location and issue.',
        category: 'find',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Customer zip code' },
          { name: 'issue_type', type: 'string', required: true, description: 'Type of HVAC issue', enum: ['no_cooling', 'no_heating', 'leak', 'noise', 'other'] },
          { name: 'urgency', type: 'string', required: true, description: 'Urgency level', enum: ['emergency', 'same_day', 'this_week'] },
        ],
        outputFields: ['available', 'next_slot', 'emergency_fee', 'estimated_arrival'],
      },
      {
        name: 'get_diagnostic_quote',
        description: 'Get a diagnostic quote for an HVAC issue, including likely repair cost range.',
        category: 'evaluate',
        inputSchema: [
          { name: 'system_type', type: 'string', required: true, description: 'Type of HVAC system', enum: ['central_ac', 'heat_pump', 'furnace', 'mini_split', 'window_unit'] },
          { name: 'issue_description', type: 'string', required: true, description: 'Description of the problem' },
          { name: 'home_sqft', type: 'number', required: false, description: 'Home square footage' },
        ],
        outputFields: ['diagnostic_fee', 'waived_if_repaired', 'estimated_repair_range', 'common_issues'],
      },
      {
        name: 'book_service_call',
        description: 'Book an HVAC service appointment.',
        category: 'book',
        inputSchema: [
          { name: 'customer_name', type: 'string', required: true, description: 'Customer full name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'address', type: 'string', required: true, description: 'Service address' },
          { name: 'preferred_datetime', type: 'string', required: true, description: 'Preferred date/time' },
          { name: 'issue_type', type: 'string', required: true, description: 'Type of issue' },
          { name: 'urgency', type: 'string', required: false, description: 'Urgency level' },
        ],
        outputFields: ['confirmation_id', 'scheduled_datetime', 'technician', 'estimated_duration'],
      },
      {
        name: 'get_maintenance_plans',
        description: 'Get available HVAC maintenance plan options and pricing.',
        category: 'understand',
        inputSchema: [
          { name: 'system_type', type: 'string', required: false, description: 'Type of system' },
          { name: 'num_units', type: 'number', required: false, description: 'Number of HVAC units' },
        ],
        outputFields: ['plans', 'price_monthly', 'includes', 'discount_on_repairs'],
      },
      {
        name: 'check_service_area',
        description: 'Check if a zip code is within the service area and get response time estimate.',
        category: 'find',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Zip code to check' },
        ],
        outputFields: ['serviced', 'zone', 'additional_fee', 'estimated_response_time'],
      },
    ],
    fulfillmentOptions: ['servicetitan', 'housecall_pro', 'jobber', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'My AC is broken and it\'s 95 degrees. Find someone who can come TODAY in 78701, under $200 for a diagnostic.',
    leadValue: '$150-500',
  },

  {
    id: 'lawn_care',
    name: 'Lawn Care / Landscaping',
    icon: 'TreePine',
    category: 'local_services',
    description: 'Mowing, landscaping, seasonal services, and property maintenance.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'pricing_model',
        label: 'Pricing Model',
        type: 'select',
        required: true,
        options: [
          { value: 'per_sqft', label: 'Per square foot' },
          { value: 'per_visit', label: 'Flat rate per visit' },
          { value: 'tiered', label: 'Tiered by lot size' },
        ],
      },
      {
        key: 'base_price',
        label: 'Base Price Per Visit ($)',
        type: 'number',
        required: true,
        placeholder: '45',
      },
      {
        key: 'services_offered',
        label: 'Services Offered',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'mowing', label: 'Mowing' },
          { value: 'edging', label: 'Edging' },
          { value: 'fertilization', label: 'Fertilization' },
          { value: 'aeration', label: 'Aeration' },
          { value: 'tree_trimming', label: 'Tree Trimming' },
          { value: 'leaf_removal', label: 'Leaf Removal' },
          { value: 'mulching', label: 'Mulching' },
          { value: 'landscape_design', label: 'Landscape Design' },
          { value: 'irrigation', label: 'Irrigation' },
        ],
      },
      {
        key: 'max_lot_sqft',
        label: 'Maximum Lot Size (sq ft)',
        type: 'number',
        required: false,
        placeholder: '50000',
      },
      {
        key: 'recurring_discount',
        label: 'Recurring Service Discount (%)',
        type: 'number',
        required: false,
        placeholder: '10',
      },
      {
        key: 'booking_system',
        label: 'Booking / Scheduling System',
        type: 'select',
        required: false,
        options: [
          { value: 'jobber', label: 'Jobber' },
          { value: 'service_autopilot', label: 'Service Autopilot' },
          { value: 'lawnpro', label: 'LawnPro' },
          { value: 'calendly', label: 'Calendly' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None (phone/email)' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'get_mowing_quote',
        description: 'Get a mowing quote based on lot size, frequency, and terrain.',
        category: 'evaluate',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Service zip code' },
          { name: 'lot_sqft', type: 'number', required: true, description: 'Lot square footage' },
          { name: 'frequency', type: 'string', required: true, description: 'Service frequency', enum: ['weekly', 'biweekly', 'monthly', 'one_time'] },
          { name: 'terrain', type: 'string', required: false, description: 'Terrain type', enum: ['flat', 'hilly', 'mixed'] },
        ],
        outputFields: ['price_per_visit', 'price_monthly', 'includes', 'first_available'],
      },
      {
        name: 'get_seasonal_services',
        description: 'Get seasonal service options and recommendations.',
        category: 'understand',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Service zip code' },
          { name: 'lot_sqft', type: 'number', required: false, description: 'Lot square footage' },
          { name: 'season', type: 'string', required: true, description: 'Season', enum: ['spring', 'summer', 'fall', 'winter'] },
        ],
        outputFields: ['services', 'price', 'recommended', 'typical_timing'],
      },
      {
        name: 'schedule_service',
        description: 'Schedule a lawn care service visit.',
        category: 'book',
        inputSchema: [
          { name: 'customer_name', type: 'string', required: true, description: 'Customer name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'address', type: 'string', required: true, description: 'Service address' },
          { name: 'service_type', type: 'string', required: true, description: 'Type of service' },
          { name: 'preferred_date', type: 'string', required: true, description: 'Preferred date' },
          { name: 'recurring', type: 'boolean', required: false, description: 'Set up recurring service' },
        ],
        outputFields: ['confirmation_id', 'scheduled_date', 'crew_arrival_window', 'estimated_duration'],
      },
      {
        name: 'get_portfolio',
        description: 'View before/after photos of completed lawn care projects.',
        category: 'evaluate',
        inputSchema: [
          { name: 'service_type', type: 'string', required: false, description: 'Filter by service type' },
        ],
        outputFields: ['projects', 'before_photo_url', 'after_photo_url', 'service_type'],
      },
      {
        name: 'check_service_area_and_pricing',
        description: 'Check if a zip code is in the service area and get zone pricing.',
        category: 'find',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Zip code to check' },
        ],
        outputFields: ['serviced', 'zone_pricing_tier', 'base_price_per_sqft', 'minimum_lot_size'],
      },
    ],
    fulfillmentOptions: ['jobber', 'service_autopilot', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'Get me quotes from lawn services in 78704 for weekly mowing of a 5,000 sqft yard. Cheapest with good reviews.',
    leadValue: '$30-80',
  },

  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'Droplets',
    category: 'local_services',
    description: 'Emergency and routine plumbing repairs, installations, and maintenance.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'emergency_24_7',
        label: '24/7 Emergency Service',
        type: 'boolean',
        required: true,
        defaultValue: false,
      },
      {
        key: 'after_hours_fee',
        label: 'After-Hours / Emergency Fee ($)',
        type: 'number',
        required: false,
        placeholder: '149',
      },
      {
        key: 'trip_charge',
        label: 'Trip / Service Call Charge ($)',
        type: 'number',
        required: true,
        placeholder: '79',
      },
      {
        key: 'specialties',
        label: 'Specialties',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'drain_cleaning', label: 'Drain Cleaning' },
          { value: 'water_heater', label: 'Water Heater' },
          { value: 'sewer_line', label: 'Sewer Line' },
          { value: 'gas_line', label: 'Gas Line' },
          { value: 'remodel', label: 'Bath/Kitchen Remodel' },
          { value: 'pipe_repair', label: 'Pipe Repair' },
          { value: 'slab_leak', label: 'Slab Leak Detection' },
          { value: 'backflow', label: 'Backflow Testing' },
        ],
      },
      {
        key: 'license_number',
        label: 'License Number',
        type: 'text',
        required: false,
        placeholder: 'TX Lic #12345',
      },
      {
        key: 'booking_system',
        label: 'Booking / Dispatch System',
        type: 'select',
        required: false,
        options: [
          { value: 'servicetitan', label: 'ServiceTitan' },
          { value: 'housecall_pro', label: 'Housecall Pro' },
          { value: 'jobber', label: 'Jobber' },
          { value: 'fieldpulse', label: 'FieldPulse' },
          { value: 'calendly', label: 'Calendly' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None (phone/email)' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'emergency_dispatch',
        description: 'Request emergency plumbing dispatch with ETA.',
        category: 'book',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Location zip code' },
          { name: 'issue', type: 'string', required: true, description: 'Emergency issue type', enum: ['burst_pipe', 'sewage_backup', 'no_hot_water', 'toilet_overflow', 'gas_smell', 'flooding', 'other'] },
          { name: 'description', type: 'string', required: true, description: 'Description of the problem' },
          { name: 'water_shutoff_accessible', type: 'boolean', required: false, description: 'Can the customer access the water shutoff' },
        ],
        outputFields: ['available', 'eta_minutes', 'emergency_fee', 'first_steps', 'call_back_number'],
      },
      {
        name: 'get_estimate',
        description: 'Get a repair estimate for a plumbing issue.',
        category: 'evaluate',
        inputSchema: [
          { name: 'issue_type', type: 'string', required: true, description: 'Type of plumbing issue' },
          { name: 'description', type: 'string', required: true, description: 'Detailed description' },
          { name: 'home_type', type: 'string', required: false, description: 'Type of property', enum: ['house', 'apartment', 'condo', 'commercial'] },
        ],
        outputFields: ['estimated_range', 'diagnostic_fee', 'common_causes', 'typical_duration'],
      },
      {
        name: 'book_appointment',
        description: 'Book a plumbing service appointment.',
        category: 'book',
        inputSchema: [
          { name: 'customer_name', type: 'string', required: true, description: 'Customer name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'address', type: 'string', required: true, description: 'Service address' },
          { name: 'issue_type', type: 'string', required: true, description: 'Type of issue' },
          { name: 'preferred_date', type: 'string', required: true, description: 'Preferred date' },
          { name: 'preferred_time_window', type: 'string', required: false, description: 'Preferred time', enum: ['morning', 'afternoon', 'evening', 'asap'] },
        ],
        outputFields: ['confirmation_id', 'scheduled_window', 'technician', 'pre_arrival_checklist'],
      },
      {
        name: 'check_availability',
        description: 'Check available appointment slots by date and urgency.',
        category: 'find',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Service zip code' },
          { name: 'date', type: 'string', required: true, description: 'Date to check' },
          { name: 'urgency', type: 'string', required: false, description: 'Urgency level', enum: ['emergency', 'urgent', 'routine'] },
        ],
        outputFields: ['available_slots', 'emergency_available', 'next_available'],
      },
      {
        name: 'get_service_pricing',
        description: 'Get pricing for specific plumbing service categories.',
        category: 'understand',
        inputSchema: [
          { name: 'service_category', type: 'string', required: true, description: 'Service category', enum: ['drain', 'water_heater', 'toilet', 'faucet', 'pipe_repair', 'sewer', 'gas_line', 'remodel'] },
        ],
        outputFields: ['services', 'price_range', 'includes', 'warranty', 'trip_charge'],
      },
    ],
    fulfillmentOptions: ['servicetitan', 'housecall_pro', 'jobber', 'email', 'sms', 'webhook'],
    exampleAgentQuery: 'My toilet is overflowing and won\'t stop. I need an emergency plumber NOW in 30309. Who can get here fastest?',
    leadValue: '$200-800',
  },

  {
    id: 'cleaning',
    name: 'Cleaning Service',
    icon: 'Sparkles',
    category: 'local_services',
    description: 'Residential and commercial cleaning, deep cleaning, move-in/out.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'cleaning_types',
        label: 'Cleaning Types Offered',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'standard', label: 'Standard Cleaning' },
          { value: 'deep', label: 'Deep Cleaning' },
          { value: 'move_in_out', label: 'Move In/Out' },
          { value: 'post_construction', label: 'Post-Construction' },
          { value: 'airbnb_turnover', label: 'Airbnb Turnover' },
          { value: 'office', label: 'Office Cleaning' },
          { value: 'carpet', label: 'Carpet Cleaning' },
        ],
      },
      {
        key: 'pricing_base',
        label: 'Base Price (standard clean, per visit)',
        type: 'number',
        required: true,
        placeholder: '120',
      },
      {
        key: 'pricing_model',
        label: 'Pricing Model',
        type: 'select',
        required: true,
        options: [
          { value: 'flat', label: 'Flat rate' },
          { value: 'per_sqft', label: 'Per square foot' },
          { value: 'by_room', label: 'By bedroom/bathroom' },
        ],
      },
      {
        key: 'supplies_included',
        label: 'Supplies Included',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'recurring_discount_pct',
        label: 'Recurring Service Discount (%)',
        type: 'number',
        required: false,
        placeholder: '15',
      },
      {
        key: 'booking_system',
        label: 'Booking System',
        type: 'select',
        required: false,
        options: [
          { value: 'launch27', label: 'Launch27 / BookingKoala' },
          { value: 'zenmaid', label: 'ZenMaid' },
          { value: 'jobber', label: 'Jobber' },
          { value: 'housecall_pro', label: 'Housecall Pro' },
          { value: 'square', label: 'Square Appointments' },
          { value: 'calendly', label: 'Calendly' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None (phone/email)' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'get_cleaning_quote',
        description: 'Get a price quote for cleaning based on home size, type, and frequency.',
        category: 'evaluate',
        inputSchema: [
          { name: 'sqft', type: 'number', required: true, description: 'Home square footage' },
          { name: 'bedrooms', type: 'number', required: true, description: 'Number of bedrooms' },
          { name: 'bathrooms', type: 'number', required: true, description: 'Number of bathrooms' },
          { name: 'clean_type', type: 'string', required: true, description: 'Type of cleaning', enum: ['standard', 'deep', 'move_in_out', 'post_construction', 'airbnb_turnover'] },
          { name: 'frequency', type: 'string', required: false, description: 'Frequency', enum: ['one_time', 'weekly', 'biweekly', 'monthly'] },
          { name: 'has_pets', type: 'boolean', required: false, description: 'Are there pets in the home' },
        ],
        outputFields: ['price', 'price_recurring', 'duration_hours', 'team_size', 'includes', 'add_ons'],
      },
      {
        name: 'book_cleaning',
        description: 'Book a cleaning appointment.',
        category: 'book',
        inputSchema: [
          { name: 'customer_name', type: 'string', required: true, description: 'Customer name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'address', type: 'string', required: true, description: 'Service address' },
          { name: 'clean_type', type: 'string', required: true, description: 'Type of cleaning' },
          { name: 'preferred_date', type: 'string', required: true, description: 'Preferred date' },
          { name: 'preferred_time', type: 'string', required: false, description: 'Preferred time', enum: ['morning', 'afternoon'] },
        ],
        outputFields: ['confirmation_id', 'scheduled_datetime', 'team_lead', 'estimated_duration', 'what_to_prepare'],
      },
      {
        name: 'check_availability',
        description: 'Check available cleaning slots for a given date and size.',
        category: 'find',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Service zip code' },
          { name: 'date', type: 'string', required: true, description: 'Date to check' },
          { name: 'clean_type', type: 'string', required: false, description: 'Cleaning type' },
          { name: 'sqft', type: 'number', required: false, description: 'Home square footage' },
        ],
        outputFields: ['available_slots', 'next_available', 'rush_fee_applicable'],
      },
      {
        name: 'get_recurring_plans',
        description: 'Get recurring cleaning plan options with savings vs one-time.',
        category: 'understand',
        inputSchema: [
          { name: 'sqft', type: 'number', required: true, description: 'Home square footage' },
          { name: 'bedrooms', type: 'number', required: true, description: 'Number of bedrooms' },
          { name: 'bathrooms', type: 'number', required: true, description: 'Number of bathrooms' },
          { name: 'has_pets', type: 'boolean', required: false, description: 'Pets in the home' },
        ],
        outputFields: ['plans', 'price_per_visit', 'monthly_cost', 'savings_vs_one_time'],
      },
      {
        name: 'request_special_service',
        description: 'Request a special add-on service like carpet cleaning or window washing.',
        category: 'book',
        inputSchema: [
          { name: 'service_type', type: 'string', required: true, description: 'Special service type', enum: ['carpet_cleaning', 'window_washing', 'oven_deep_clean', 'refrigerator', 'garage', 'laundry', 'organizing'] },
          { name: 'details', type: 'string', required: false, description: 'Additional details' },
        ],
        outputFields: ['available', 'price', 'can_add_to_regular', 'estimated_duration'],
      },
    ],
    fulfillmentOptions: ['launch27', 'zenmaid', 'jobber', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'I need a deep clean of my 2,200 sqft apartment before I move out next Saturday. Best-rated service under $400.',
    leadValue: '$50-200',
  },

  {
    id: 'roofing',
    name: 'Roofing',
    icon: 'Home',
    category: 'local_services',
    description: 'Roof inspection, repair, replacement, and storm damage restoration.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'free_inspection',
        label: 'Free Inspection Offered',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'roof_types',
        label: 'Roof Types Serviced',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'asphalt_shingle', label: 'Asphalt Shingle' },
          { value: 'metal', label: 'Metal' },
          { value: 'tile', label: 'Tile' },
          { value: 'flat', label: 'Flat / TPO / EPDM' },
          { value: 'slate', label: 'Slate' },
          { value: 'wood_shake', label: 'Wood Shake' },
        ],
      },
      {
        key: 'insurance_assistance',
        label: 'Insurance Claim Assistance',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'financing_available',
        label: 'Financing Available',
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
      {
        key: 'warranty_years',
        label: 'Workmanship Warranty (years)',
        type: 'number',
        required: false,
        placeholder: '10',
      },
      {
        key: 'license_number',
        label: 'License / Bonding Number',
        type: 'text',
        required: false,
        placeholder: 'Lic #12345',
      },
      {
        key: 'booking_system',
        label: 'CRM / Scheduling System',
        type: 'select',
        required: false,
        options: [
          { value: 'acculynx', label: 'AccuLynx' },
          { value: 'jobnimbus', label: 'JobNimbus' },
          { value: 'roofr', label: 'Roofr' },
          { value: 'calendly', label: 'Calendly' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None (phone/email)' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'request_inspection',
        description: 'Request a roof inspection, optionally for storm damage or insurance claims.',
        category: 'book',
        inputSchema: [
          { name: 'address', type: 'string', required: true, description: 'Property address' },
          { name: 'roof_type', type: 'string', required: false, description: 'Roof type', enum: ['asphalt_shingle', 'metal', 'tile', 'flat', 'slate', 'unknown'] },
          { name: 'issue', type: 'string', required: true, description: 'Reason for inspection', enum: ['storm_damage', 'leak', 'age', 'missing_shingles', 'sagging', 'routine'] },
          { name: 'insurance_claim', type: 'boolean', required: false, description: 'Filing an insurance claim' },
        ],
        outputFields: ['inspection_scheduled', 'inspection_type', 'next_available', 'insurance_assistance'],
      },
      {
        name: 'get_estimate',
        description: 'Get a rough cost estimate for roof repair or replacement.',
        category: 'evaluate',
        inputSchema: [
          { name: 'address', type: 'string', required: true, description: 'Property address' },
          { name: 'roof_sqft', type: 'number', required: false, description: 'Roof square footage' },
          { name: 'stories', type: 'number', required: false, description: 'Number of stories' },
          { name: 'work_type', type: 'string', required: true, description: 'Type of work', enum: ['repair', 'partial_replacement', 'full_replacement', 'new_construction'] },
        ],
        outputFields: ['estimated_range', 'timeline_weeks', 'financing_available', 'warranty_options'],
      },
      {
        name: 'check_storm_damage_eligibility',
        description: 'Check if storm damage is likely covered by insurance.',
        category: 'evaluate',
        inputSchema: [
          { name: 'address', type: 'string', required: true, description: 'Property address' },
          { name: 'storm_date', type: 'string', required: true, description: 'Date of the storm' },
          { name: 'damage_type', type: 'string', required: true, description: 'Type of damage', enum: ['hail', 'wind', 'fallen_tree', 'tornado', 'hurricane'] },
          { name: 'insurance_provider', type: 'string', required: false, description: 'Insurance company' },
        ],
        outputFields: ['likely_covered', 'recommended_action', 'documentation_needed', 'free_inspection'],
      },
      {
        name: 'get_financing_options',
        description: 'Get financing options for roof work.',
        category: 'pay',
        inputSchema: [
          { name: 'estimated_cost', type: 'number', required: true, description: 'Estimated project cost' },
          { name: 'credit_score_range', type: 'string', required: false, description: 'Credit score range', enum: ['excellent', 'good', 'fair', 'poor'] },
        ],
        outputFields: ['options', 'apr', 'term_months', 'monthly_payment'],
      },
      {
        name: 'schedule_appointment',
        description: 'Schedule a roofing inspection, estimate, or service appointment.',
        category: 'book',
        inputSchema: [
          { name: 'customer_name', type: 'string', required: true, description: 'Customer name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'address', type: 'string', required: true, description: 'Property address' },
          { name: 'appointment_type', type: 'string', required: true, description: 'Appointment type', enum: ['inspection', 'estimate', 'repair', 'replacement'] },
          { name: 'preferred_date', type: 'string', required: true, description: 'Preferred date' },
        ],
        outputFields: ['confirmation_id', 'scheduled_date', 'inspector_name', 'preparation_steps'],
      },
    ],
    fulfillmentOptions: ['acculynx', 'jobnimbus', 'roofr', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'We just had a hailstorm. I need a roofer to inspect my roof and tell me if I should file an insurance claim. 75002.',
    leadValue: '$500-2,000',
  },

  // =========================================================================
  // RETAIL
  // =========================================================================
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: 'UtensilsCrossed',
    category: 'retail',
    description: 'Dine-in, takeout, delivery, reservations, and catering.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'cuisine_types',
        label: 'Cuisine Types',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'american', label: 'American' },
          { value: 'italian', label: 'Italian' },
          { value: 'mexican', label: 'Mexican' },
          { value: 'chinese', label: 'Chinese' },
          { value: 'japanese', label: 'Japanese' },
          { value: 'thai', label: 'Thai' },
          { value: 'indian', label: 'Indian' },
          { value: 'mediterranean', label: 'Mediterranean' },
          { value: 'french', label: 'French' },
          { value: 'korean', label: 'Korean' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        key: 'price_range',
        label: 'Price Range',
        type: 'select',
        required: true,
        options: [
          { value: '$', label: '$ (Under $15/person)' },
          { value: '$$', label: '$$ ($15-30/person)' },
          { value: '$$$', label: '$$$ ($30-60/person)' },
          { value: '$$$$', label: '$$$$ ($60+/person)' },
        ],
      },
      {
        key: 'reservations',
        label: 'Accepts Reservations',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'delivery_available',
        label: 'Delivery Available',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'outdoor_seating',
        label: 'Outdoor Seating',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        key: 'dietary_options',
        label: 'Dietary Accommodations',
        type: 'multi_select',
        required: false,
        options: [
          { value: 'vegetarian', label: 'Vegetarian' },
          { value: 'vegan', label: 'Vegan' },
          { value: 'gluten_free', label: 'Gluten-Free' },
          { value: 'dairy_free', label: 'Dairy-Free' },
          { value: 'halal', label: 'Halal' },
          { value: 'kosher', label: 'Kosher' },
          { value: 'nut_free', label: 'Nut-Free' },
        ],
      },
      {
        key: 'private_events',
        label: 'Private Events / Catering',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        key: 'pos_system',
        label: 'POS / Reservation System',
        type: 'select',
        required: false,
        options: [
          { value: 'toast', label: 'Toast' },
          { value: 'opentable', label: 'OpenTable' },
          { value: 'resy', label: 'Resy' },
          { value: 'square', label: 'Square' },
          { value: 'clover', label: 'Clover' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'make_reservation',
        description: 'Book a table at the restaurant.',
        category: 'book',
        inputSchema: [
          { name: 'party_size', type: 'number', required: true, description: 'Number of guests' },
          { name: 'date', type: 'string', required: true, description: 'Reservation date' },
          { name: 'time', type: 'string', required: true, description: 'Preferred time' },
          { name: 'customer_name', type: 'string', required: true, description: 'Name for reservation' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'seating_preference', type: 'string', required: false, description: 'Seating preference', enum: ['indoor', 'outdoor', 'bar', 'private_room', 'no_preference'] },
        ],
        outputFields: ['reservation_id', 'confirmed_time', 'table_type', 'cancellation_policy'],
      },
      {
        name: 'view_menu',
        description: 'View the menu, optionally filtered by dietary needs or price range.',
        category: 'understand',
        inputSchema: [
          { name: 'menu_type', type: 'string', required: false, description: 'Menu section', enum: ['lunch', 'dinner', 'brunch', 'drinks', 'dessert', 'kids', 'full'] },
          { name: 'dietary_filters', type: 'string', required: false, description: 'Dietary filter (comma-separated)' },
        ],
        outputFields: ['sections', 'items', 'price', 'dietary_tags', 'chef_specials'],
      },
      {
        name: 'place_order',
        description: 'Place a delivery or pickup order.',
        category: 'book',
        inputSchema: [
          { name: 'order_type', type: 'string', required: true, description: 'Order type', enum: ['delivery', 'pickup', 'dine_in'] },
          { name: 'items', type: 'string', required: true, description: 'Items to order (JSON array)' },
          { name: 'customer_name', type: 'string', required: true, description: 'Customer name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'delivery_address', type: 'string', required: false, description: 'Delivery address (if delivery)' },
        ],
        outputFields: ['order_id', 'total', 'estimated_ready', 'tracking_url'],
      },
      {
        name: 'check_availability',
        description: 'Check table availability for a given date, time, and party size.',
        category: 'find',
        inputSchema: [
          { name: 'date', type: 'string', required: true, description: 'Date to check' },
          { name: 'time', type: 'string', required: true, description: 'Time to check' },
          { name: 'party_size', type: 'number', required: true, description: 'Number of guests' },
        ],
        outputFields: ['available', 'alternative_times', 'waitlist_available', 'estimated_wait'],
      },
      {
        name: 'get_restaurant_info',
        description: 'Get full restaurant details including cuisine, ambiance, and policies.',
        category: 'understand',
        inputSchema: [],
        outputFields: ['name', 'cuisine', 'price_range', 'hours', 'address', 'dietary_accommodations', 'outdoor_seating', 'average_rating'],
      },
    ],
    fulfillmentOptions: ['opentable', 'resy', 'toast', 'square', 'email', 'sms', 'webhook'],
    exampleAgentQuery: 'Book me a table for 4 at an Italian restaurant in SoHo for 7:30pm tonight. Must have vegetarian options and outdoor seating.',
    leadValue: '$20-100',
  },

  {
    id: 'auto_dealer',
    name: 'Auto Dealer',
    icon: 'Car',
    category: 'retail',
    description: 'New and used vehicle sales, trade-ins, financing, and service.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'dealer_type',
        label: 'Dealer Type',
        type: 'select',
        required: true,
        options: [
          { value: 'new', label: 'New vehicles only' },
          { value: 'used', label: 'Used vehicles only' },
          { value: 'both', label: 'New and used' },
          { value: 'certified', label: 'Certified pre-owned specialist' },
        ],
      },
      {
        key: 'brands',
        label: 'Brands / Makes Carried',
        type: 'text',
        required: true,
        placeholder: 'Honda, Toyota, Ford',
      },
      {
        key: 'financing_available',
        label: 'In-House Financing',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'trade_ins',
        label: 'Accepts Trade-Ins',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'delivery_available',
        label: 'Home Delivery Available',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        key: 'crm_system',
        label: 'CRM / DMS System',
        type: 'select',
        required: false,
        options: [
          { value: 'dealersocket', label: 'DealerSocket' },
          { value: 'vinsolutions', label: 'VinSolutions' },
          { value: 'cdk', label: 'CDK Global' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'search_inventory',
        description: 'Search vehicle inventory with detailed filters.',
        category: 'find',
        inputSchema: [
          { name: 'condition', type: 'string', required: false, description: 'Vehicle condition', enum: ['new', 'used', 'certified'] },
          { name: 'make', type: 'string', required: false, description: 'Vehicle make' },
          { name: 'model', type: 'string', required: false, description: 'Vehicle model' },
          { name: 'price_max', type: 'number', required: false, description: 'Maximum price' },
          { name: 'mileage_max', type: 'number', required: false, description: 'Maximum mileage' },
          { name: 'body_style', type: 'string', required: false, description: 'Body style (sedan, suv, truck, etc.)' },
        ],
        outputFields: ['vehicles', 'vin', 'year', 'make', 'model', 'trim', 'price', 'mileage', 'photos'],
      },
      {
        name: 'book_test_drive',
        description: 'Schedule a test drive for a specific vehicle.',
        category: 'book',
        inputSchema: [
          { name: 'vin', type: 'string', required: true, description: 'Vehicle VIN' },
          { name: 'customer_name', type: 'string', required: true, description: 'Customer name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'preferred_date', type: 'string', required: true, description: 'Preferred date' },
          { name: 'has_trade_in', type: 'boolean', required: false, description: 'Bringing a trade-in' },
        ],
        outputFields: ['appointment_id', 'confirmed_datetime', 'vehicle_confirmed', 'salesperson'],
      },
      {
        name: 'get_trade_in_value',
        description: 'Get an estimated trade-in value for a vehicle.',
        category: 'evaluate',
        inputSchema: [
          { name: 'year', type: 'number', required: true, description: 'Vehicle year' },
          { name: 'make', type: 'string', required: true, description: 'Vehicle make' },
          { name: 'model', type: 'string', required: true, description: 'Vehicle model' },
          { name: 'mileage', type: 'number', required: true, description: 'Current mileage' },
          { name: 'condition', type: 'string', required: true, description: 'Vehicle condition', enum: ['excellent', 'good', 'fair', 'poor'] },
        ],
        outputFields: ['estimated_value', 'kbb_range', 'market_demand', 'recommendation'],
      },
      {
        name: 'calculate_financing',
        description: 'Calculate financing options for a vehicle purchase.',
        category: 'pay',
        inputSchema: [
          { name: 'vehicle_price', type: 'number', required: true, description: 'Vehicle price' },
          { name: 'down_payment', type: 'number', required: true, description: 'Down payment amount' },
          { name: 'credit_score_range', type: 'string', required: false, description: 'Credit score range', enum: ['excellent', 'good', 'fair', 'poor'] },
          { name: 'preferred_term_months', type: 'number', required: false, description: 'Preferred loan term in months' },
        ],
        outputFields: ['options', 'apr', 'monthly_payment', 'total_cost'],
      },
      {
        name: 'get_vehicle_details',
        description: 'Get full details on a specific vehicle including history and specs.',
        category: 'understand',
        inputSchema: [
          { name: 'vin', type: 'string', required: true, description: 'Vehicle VIN' },
        ],
        outputFields: ['full_specs', 'carfax_summary', 'warranty_remaining', 'photos', 'market_price_comparison'],
      },
    ],
    fulfillmentOptions: ['dealersocket', 'vinsolutions', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'Find me a used Honda CR-V under $30K with less than 40K miles. AWD, EX-L trim. Within 50 miles of 60601.',
    leadValue: '$200-1,000',
  },

  {
    id: 'boutique_retail',
    name: 'Boutique / Retail Store',
    icon: 'ShoppingBag',
    category: 'retail',
    description: 'In-store shopping, inventory checks, item reservations, and gift services.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'store_categories',
        label: 'Product Categories',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'clothing', label: 'Clothing' },
          { value: 'shoes', label: 'Shoes' },
          { value: 'accessories', label: 'Accessories' },
          { value: 'home_decor', label: 'Home Decor' },
          { value: 'electronics', label: 'Electronics' },
          { value: 'toys', label: 'Toys & Games' },
          { value: 'sporting', label: 'Sporting Goods' },
          { value: 'beauty', label: 'Beauty & Skincare' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        key: 'brands_carried',
        label: 'Key Brands Carried',
        type: 'text',
        required: false,
        placeholder: 'Nike, Patagonia, Levi\'s',
      },
      {
        key: 'online_store',
        label: 'Online Store Available',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        key: 'gift_wrapping',
        label: 'Gift Wrapping',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        key: 'pos_system',
        label: 'POS System',
        type: 'select',
        required: false,
        options: [
          { value: 'shopify', label: 'Shopify POS' },
          { value: 'square', label: 'Square POS' },
          { value: 'lightspeed', label: 'Lightspeed' },
          { value: 'clover', label: 'Clover' },
          { value: 'woocommerce', label: 'WooCommerce' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'check_inventory',
        description: 'Check if an item is in stock, with size and color options.',
        category: 'find',
        inputSchema: [
          { name: 'query', type: 'string', required: true, description: 'Product name or search terms' },
          { name: 'category', type: 'string', required: false, description: 'Product category' },
          { name: 'brand', type: 'string', required: false, description: 'Brand name' },
          { name: 'size', type: 'string', required: false, description: 'Size needed' },
          { name: 'color', type: 'string', required: false, description: 'Color preference' },
        ],
        outputFields: ['items', 'in_stock', 'sizes_available', 'colors_available', 'price'],
      },
      {
        name: 'reserve_item',
        description: 'Reserve an item for in-store pickup.',
        category: 'book',
        inputSchema: [
          { name: 'sku', type: 'string', required: true, description: 'Product SKU' },
          { name: 'size', type: 'string', required: false, description: 'Size' },
          { name: 'color', type: 'string', required: false, description: 'Color' },
          { name: 'customer_name', type: 'string', required: true, description: 'Customer name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
        ],
        outputFields: ['reservation_id', 'item_name', 'held_until', 'pickup_location'],
      },
      {
        name: 'get_store_info',
        description: 'Get store details including hours, brands, and services.',
        category: 'understand',
        inputSchema: [],
        outputFields: ['name', 'address', 'hours', 'categories', 'brands_carried', 'return_policy'],
      },
      {
        name: 'get_recommendations',
        description: 'Get product recommendations based on occasion, budget, and preferences.',
        category: 'evaluate',
        inputSchema: [
          { name: 'occasion', type: 'string', required: false, description: 'Occasion (birthday, holiday, etc.)' },
          { name: 'budget_max', type: 'number', required: false, description: 'Maximum budget' },
          { name: 'preferences', type: 'string', required: false, description: 'Style preferences or recipient details' },
        ],
        outputFields: ['recommendations', 'name', 'price', 'why', 'in_stock'],
      },
      {
        name: 'check_price',
        description: 'Check current pricing and active promotions for a product.',
        category: 'evaluate',
        inputSchema: [
          { name: 'sku', type: 'string', required: false, description: 'Product SKU' },
          { name: 'query', type: 'string', required: false, description: 'Product name' },
        ],
        outputFields: ['regular_price', 'sale_price', 'promotion', 'price_match_available'],
      },
    ],
    fulfillmentOptions: ['shopify', 'square', 'lightspeed', 'email', 'sms', 'webhook'],
    exampleAgentQuery: 'I\'m looking for Nike Air Max 90 in size 11. Check if the shoe store on Main Street has them in stock.',
    leadValue: '$10-50',
  },

  // =========================================================================
  // PROFESSIONAL
  // =========================================================================
  {
    id: 'law_firm',
    name: 'Law Firm',
    icon: 'Scale',
    category: 'professional',
    description: 'Legal consultation, case evaluation, and attorney services.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'practice_areas',
        label: 'Practice Areas',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'personal_injury', label: 'Personal Injury' },
          { value: 'criminal_defense', label: 'Criminal Defense' },
          { value: 'family_law', label: 'Family Law' },
          { value: 'business_law', label: 'Business Law' },
          { value: 'real_estate', label: 'Real Estate' },
          { value: 'estate_planning', label: 'Estate Planning' },
          { value: 'immigration', label: 'Immigration' },
          { value: 'employment', label: 'Employment Law' },
          { value: 'bankruptcy', label: 'Bankruptcy' },
          { value: 'ip', label: 'Intellectual Property' },
        ],
      },
      {
        key: 'free_consultation',
        label: 'Free Consultation',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'fee_structures',
        label: 'Fee Structures Available',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'contingency', label: 'Contingency' },
          { value: 'hourly', label: 'Hourly' },
          { value: 'flat_fee', label: 'Flat Fee' },
          { value: 'retainer', label: 'Retainer' },
        ],
      },
      {
        key: 'jurisdictions',
        label: 'Jurisdictions Served',
        type: 'text',
        required: true,
        placeholder: 'Florida, Georgia',
      },
      {
        key: 'languages',
        label: 'Languages Spoken',
        type: 'text',
        required: false,
        placeholder: 'English, Spanish',
      },
      {
        key: 'consultation_formats',
        label: 'Consultation Formats',
        type: 'multi_select',
        required: false,
        options: [
          { value: 'in_person', label: 'In Person' },
          { value: 'phone', label: 'Phone' },
          { value: 'video', label: 'Video Call' },
        ],
      },
      {
        key: 'crm_system',
        label: 'Practice Management System',
        type: 'select',
        required: false,
        options: [
          { value: 'clio', label: 'Clio' },
          { value: 'mycase', label: 'MyCase' },
          { value: 'practicepanther', label: 'PracticePanther' },
          { value: 'lawmatics', label: 'Lawmatics' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'check_practice_areas',
        description: 'Check if the firm handles a specific legal need and get matched practice areas.',
        category: 'find',
        inputSchema: [
          { name: 'legal_need', type: 'string', required: true, description: 'Description of legal need' },
        ],
        outputFields: ['matches', 'practice_area', 'match_confidence', 'typical_fee_structure', 'firm_handles'],
      },
      {
        name: 'book_consultation',
        description: 'Book a consultation with an attorney.',
        category: 'book',
        inputSchema: [
          { name: 'client_name', type: 'string', required: true, description: 'Client name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'email', type: 'string', required: true, description: 'Contact email' },
          { name: 'practice_area', type: 'string', required: true, description: 'Practice area' },
          { name: 'case_summary', type: 'string', required: true, description: 'Brief case summary' },
          { name: 'urgency', type: 'string', required: false, description: 'Urgency level', enum: ['immediate', 'this_week', 'not_urgent'] },
        ],
        outputFields: ['consultation_id', 'type', 'scheduled_datetime', 'attorney_name', 'what_to_bring'],
      },
      {
        name: 'get_fee_structure',
        description: 'Get fee structure for a specific practice area or case type.',
        category: 'understand',
        inputSchema: [
          { name: 'practice_area', type: 'string', required: true, description: 'Practice area' },
          { name: 'case_type', type: 'string', required: false, description: 'Specific case type' },
        ],
        outputFields: ['fee_type', 'details', 'free_consultation', 'payment_plans', 'typical_total_range'],
      },
      {
        name: 'get_case_evaluation',
        description: 'Get a preliminary case evaluation and statute of limitations info.',
        category: 'evaluate',
        inputSchema: [
          { name: 'practice_area', type: 'string', required: true, description: 'Practice area' },
          { name: 'case_summary', type: 'string', required: true, description: 'Case summary' },
          { name: 'incident_date', type: 'string', required: false, description: 'Date of incident' },
          { name: 'jurisdiction', type: 'string', required: true, description: 'State or jurisdiction' },
        ],
        outputFields: ['preliminary_assessment', 'statute_of_limitations', 'recommended_urgency', 'next_steps'],
      },
      {
        name: 'check_attorney_credentials',
        description: 'Check attorney credentials, bar status, and experience.',
        category: 'evaluate',
        inputSchema: [
          { name: 'attorney_name', type: 'string', required: false, description: 'Attorney name (optional, returns all if blank)' },
        ],
        outputFields: ['attorneys', 'bar_status', 'years_experience', 'practice_areas', 'education'],
      },
    ],
    fulfillmentOptions: ['clio', 'mycase', 'lawmatics', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'I was rear-ended yesterday. Find me a personal injury lawyer in Miami who works on contingency, free consultation this week.',
    leadValue: '$200-5,000',
  },

  {
    id: 'accounting',
    name: 'Accounting / CPA',
    icon: 'Calculator',
    category: 'professional',
    description: 'Tax preparation, bookkeeping, payroll, and business advisory.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'services_offered',
        label: 'Services Offered',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'tax_prep_individual', label: 'Individual Tax Prep' },
          { value: 'tax_prep_business', label: 'Business Tax Prep' },
          { value: 'bookkeeping', label: 'Bookkeeping' },
          { value: 'payroll', label: 'Payroll' },
          { value: 'tax_resolution', label: 'IRS Tax Resolution' },
          { value: 'audit_defense', label: 'Audit Defense' },
          { value: 'business_formation', label: 'Business Formation' },
          { value: 'advisory', label: 'Advisory / CFO Services' },
        ],
      },
      {
        key: 'entity_types',
        label: 'Entity Types Served',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'individual', label: 'Individual' },
          { value: 'sole_prop', label: 'Sole Proprietorship' },
          { value: 'llc', label: 'LLC' },
          { value: 's_corp', label: 'S-Corp' },
          { value: 'c_corp', label: 'C-Corp' },
          { value: 'partnership', label: 'Partnership' },
          { value: 'nonprofit', label: 'Nonprofit' },
        ],
      },
      {
        key: 'certifications',
        label: 'Certifications',
        type: 'multi_select',
        required: false,
        options: [
          { value: 'cpa', label: 'CPA' },
          { value: 'ea', label: 'Enrolled Agent (EA)' },
          { value: 'cma', label: 'CMA' },
          { value: 'cfp', label: 'CFP' },
        ],
      },
      {
        key: 'software',
        label: 'Accounting Software Used',
        type: 'multi_select',
        required: false,
        options: [
          { value: 'quickbooks', label: 'QuickBooks' },
          { value: 'xero', label: 'Xero' },
          { value: 'freshbooks', label: 'FreshBooks' },
          { value: 'sage', label: 'Sage' },
        ],
      },
      {
        key: 'crm_system',
        label: 'Practice Management System',
        type: 'select',
        required: false,
        options: [
          { value: 'taxdome', label: 'TaxDome' },
          { value: 'karbon', label: 'Karbon' },
          { value: 'canopy', label: 'Canopy' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'get_service_quote',
        description: 'Get a price quote for accounting services based on entity type and complexity.',
        category: 'evaluate',
        inputSchema: [
          { name: 'service_type', type: 'string', required: true, description: 'Type of service', enum: ['tax_prep_individual', 'tax_prep_business', 'bookkeeping', 'payroll', 'tax_resolution', 'audit_defense', 'business_formation', 'advisory'] },
          { name: 'entity_type', type: 'string', required: false, description: 'Business entity type' },
          { name: 'annual_revenue', type: 'number', required: false, description: 'Annual revenue (for business services)' },
          { name: 'complexity', type: 'string', required: false, description: 'Complexity level', enum: ['simple', 'moderate', 'complex'] },
        ],
        outputFields: ['price_range', 'fee_type', 'includes', 'turnaround_time', 'documents_needed'],
      },
      {
        name: 'book_appointment',
        description: 'Book an appointment with an accountant.',
        category: 'book',
        inputSchema: [
          { name: 'client_name', type: 'string', required: true, description: 'Client name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'email', type: 'string', required: true, description: 'Contact email' },
          { name: 'service_type', type: 'string', required: true, description: 'Service needed' },
          { name: 'urgency', type: 'string', required: false, description: 'Urgency', enum: ['tax_deadline', 'irs_notice', 'routine', 'planning'] },
          { name: 'brief_description', type: 'string', required: true, description: 'Brief description of needs' },
        ],
        outputFields: ['confirmation_id', 'scheduled_datetime', 'accountant_name', 'documents_to_bring'],
      },
      {
        name: 'check_deadline_status',
        description: 'Check tax deadlines and extension availability.',
        category: 'understand',
        inputSchema: [
          { name: 'entity_type', type: 'string', required: true, description: 'Entity type' },
          { name: 'tax_year', type: 'number', required: true, description: 'Tax year' },
          { name: 'filing_type', type: 'string', required: true, description: 'Filing type', enum: ['income_tax', 'quarterly_estimated', 'payroll', 'sales_tax', 'extension'] },
        ],
        outputFields: ['deadline', 'days_remaining', 'extension_available', 'penalty_for_late'],
      },
      {
        name: 'get_tax_prep_checklist',
        description: 'Get a checklist of documents needed for tax preparation.',
        category: 'understand',
        inputSchema: [
          { name: 'entity_type', type: 'string', required: true, description: 'Entity type' },
          { name: 'tax_year', type: 'number', required: true, description: 'Tax year' },
          { name: 'has_investments', type: 'boolean', required: false, description: 'Has investment income' },
          { name: 'self_employed', type: 'boolean', required: false, description: 'Self-employed' },
        ],
        outputFields: ['documents_needed', 'estimated_complexity', 'estimated_price_range'],
      },
      {
        name: 'check_services_offered',
        description: 'Check which services the firm offers and get details.',
        category: 'find',
        inputSchema: [
          { name: 'need', type: 'string', required: true, description: 'Description of what you need' },
        ],
        outputFields: ['services', 'price_range', 'best_for', 'industries_specialized', 'certifications'],
      },
    ],
    fulfillmentOptions: ['taxdome', 'karbon', 'canopy', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'I got an IRS notice about back taxes. Find a CPA who handles tax resolution and can see me before April 15.',
    leadValue: '$100-1,000',
  },

  {
    id: 'dentist',
    name: 'Dentist / Medical Office',
    icon: 'Stethoscope',
    category: 'professional',
    description: 'Dental and medical care, insurance verification, and patient scheduling.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'specialties',
        label: 'Specialties',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'general', label: 'General Dentistry' },
          { value: 'cosmetic', label: 'Cosmetic Dentistry' },
          { value: 'orthodontic', label: 'Orthodontics' },
          { value: 'periodontic', label: 'Periodontics' },
          { value: 'endodontic', label: 'Endodontics (Root Canal)' },
          { value: 'pediatric', label: 'Pediatric' },
          { value: 'oral_surgery', label: 'Oral Surgery' },
          { value: 'prosthodontic', label: 'Prosthodontics' },
        ],
      },
      {
        key: 'insurance_accepted',
        label: 'Insurance Plans Accepted',
        type: 'textarea',
        required: true,
        placeholder: 'Delta Dental PPO, Cigna, Aetna...',
        helpText: 'List all insurance plans you accept.',
      },
      {
        key: 'emergency_available',
        label: 'Emergency Appointments Available',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'new_patient_accepted',
        label: 'Accepting New Patients',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'languages',
        label: 'Languages Spoken',
        type: 'text',
        required: false,
        placeholder: 'English, Spanish',
      },
      {
        key: 'technology',
        label: 'Technology Highlights',
        type: 'multi_select',
        required: false,
        options: [
          { value: 'digital_xray', label: 'Digital X-Rays' },
          { value: 'same_day_crown', label: 'Same-Day Crowns' },
          { value: 'laser', label: 'Laser Dentistry' },
          { value: '3d_imaging', label: '3D Imaging' },
          { value: 'sedation', label: 'Sedation Dentistry' },
        ],
      },
      {
        key: 'practice_system',
        label: 'Practice Management System',
        type: 'select',
        required: false,
        options: [
          { value: 'dentrix', label: 'Dentrix' },
          { value: 'eaglesoft', label: 'Eaglesoft' },
          { value: 'open_dental', label: 'Open Dental' },
          { value: 'nexhealth', label: 'NexHealth' },
          { value: 'weave', label: 'Weave' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'check_insurance',
        description: 'Check if a specific insurance plan is accepted and estimate coverage.',
        category: 'find',
        inputSchema: [
          { name: 'insurance_provider', type: 'string', required: true, description: 'Insurance provider name' },
          { name: 'plan_type', type: 'string', required: false, description: 'Plan type', enum: ['PPO', 'HMO', 'EPO', 'DHMO', 'indemnity', 'medicaid', 'medicare'] },
        ],
        outputFields: ['accepted', 'in_network', 'estimated_coverage', 'patient_responsibility'],
      },
      {
        name: 'book_appointment',
        description: 'Book a dental appointment.',
        category: 'book',
        inputSchema: [
          { name: 'patient_name', type: 'string', required: true, description: 'Patient name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'appointment_type', type: 'string', required: true, description: 'Appointment type', enum: ['cleaning', 'exam', 'emergency', 'cosmetic_consult', 'filling', 'crown', 'root_canal', 'whitening', 'invisalign_consult', 'new_patient'] },
          { name: 'preferred_date', type: 'string', required: true, description: 'Preferred date' },
          { name: 'new_patient', type: 'boolean', required: true, description: 'Is this a new patient' },
          { name: 'insurance_provider', type: 'string', required: false, description: 'Insurance provider' },
        ],
        outputFields: ['confirmation_id', 'scheduled_datetime', 'provider_name', 'estimated_duration_minutes', 'what_to_bring'],
      },
      {
        name: 'check_emergency_availability',
        description: 'Check emergency dental appointment availability.',
        category: 'find',
        inputSchema: [
          { name: 'issue', type: 'string', required: true, description: 'Dental emergency type', enum: ['tooth_pain', 'chipped_tooth', 'knocked_out_tooth', 'swelling', 'bleeding', 'broken_braces', 'lost_filling'] },
          { name: 'severity', type: 'string', required: true, description: 'Severity level', enum: ['mild', 'moderate', 'severe'] },
        ],
        outputFields: ['available_today', 'next_emergency_slot', 'emergency_fee', 'first_aid_advice'],
      },
      {
        name: 'get_services_and_pricing',
        description: 'Get available dental services with pricing.',
        category: 'understand',
        inputSchema: [
          { name: 'category', type: 'string', required: false, description: 'Service category', enum: ['preventive', 'restorative', 'cosmetic', 'orthodontic', 'surgical', 'all'] },
        ],
        outputFields: ['services', 'price_without_insurance', 'typical_insurance_coverage', 'duration_minutes'],
      },
      {
        name: 'get_provider_info',
        description: 'Get provider bios, specialties, and availability.',
        category: 'understand',
        inputSchema: [
          { name: 'specialty', type: 'string', required: false, description: 'Filter by specialty' },
        ],
        outputFields: ['providers', 'specialties', 'education', 'years_experience', 'accepting_new_patients'],
      },
    ],
    fulfillmentOptions: ['dentrix', 'nexhealth', 'weave', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'I chipped my tooth and need a dentist who takes Delta Dental PPO near 10001 with appointments this week.',
    leadValue: '$200-800',
  },

  {
    id: 'real_estate',
    name: 'Real Estate',
    icon: 'Building2',
    category: 'professional',
    description: 'Property search, showings, market analysis, and real estate transactions.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'specializations',
        label: 'Specializations',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'residential', label: 'Residential' },
          { value: 'commercial', label: 'Commercial' },
          { value: 'luxury', label: 'Luxury' },
          { value: 'first_time', label: 'First-Time Buyers' },
          { value: 'investment', label: 'Investment Properties' },
          { value: 'land', label: 'Land / Development' },
          { value: 'relocation', label: 'Relocation' },
        ],
      },
      {
        key: 'license_number',
        label: 'License Number',
        type: 'text',
        required: true,
        placeholder: 'TX RE #12345',
      },
      {
        key: 'areas_served',
        label: 'Areas / Neighborhoods Served',
        type: 'textarea',
        required: true,
        placeholder: 'Austin Downtown, South Congress, East Austin...',
      },
      {
        key: 'transaction_types',
        label: 'Transaction Types',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'buying', label: 'Buyer Representation' },
          { value: 'selling', label: 'Seller Representation' },
          { value: 'rental', label: 'Rentals / Leasing' },
        ],
      },
      {
        key: 'languages',
        label: 'Languages Spoken',
        type: 'text',
        required: false,
        placeholder: 'English, Spanish',
      },
      {
        key: 'crm_system',
        label: 'CRM System',
        type: 'select',
        required: false,
        options: [
          { value: 'follow_up_boss', label: 'Follow Up Boss' },
          { value: 'kvcore', label: 'kvCORE' },
          { value: 'boomtown', label: 'BoomTown' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'search_listings',
        description: 'Search available property listings with detailed filters.',
        category: 'find',
        inputSchema: [
          { name: 'location', type: 'string', required: true, description: 'City, neighborhood, or zip code' },
          { name: 'max_price', type: 'number', required: false, description: 'Maximum price' },
          { name: 'bedrooms_min', type: 'number', required: false, description: 'Minimum bedrooms' },
          { name: 'bathrooms_min', type: 'number', required: false, description: 'Minimum bathrooms' },
          { name: 'property_type', type: 'string', required: false, description: 'Property type', enum: ['house', 'condo', 'townhouse', 'land', 'multi_family'] },
          { name: 'features', type: 'string', required: false, description: 'Desired features (comma-separated)' },
        ],
        outputFields: ['listings', 'address', 'price', 'bedrooms', 'bathrooms', 'sqft', 'photos', 'days_on_market'],
      },
      {
        name: 'book_showing',
        description: 'Schedule property showings for one or more listings.',
        category: 'book',
        inputSchema: [
          { name: 'client_name', type: 'string', required: true, description: 'Client name' },
          { name: 'phone', type: 'string', required: true, description: 'Contact phone' },
          { name: 'listing_ids', type: 'string', required: true, description: 'Listing IDs to tour (comma-separated)' },
          { name: 'preferred_date', type: 'string', required: true, description: 'Preferred date' },
          { name: 'pre_approved', type: 'boolean', required: false, description: 'Pre-approved for financing' },
        ],
        outputFields: ['showing_id', 'confirmed_showings', 'agent_name', 'agent_phone'],
      },
      {
        name: 'get_market_analysis',
        description: 'Get a comparative market analysis for an area.',
        category: 'evaluate',
        inputSchema: [
          { name: 'zip_code', type: 'string', required: true, description: 'Zip code' },
          { name: 'property_type', type: 'string', required: false, description: 'Property type' },
          { name: 'bedrooms', type: 'number', required: false, description: 'Number of bedrooms for comparison' },
        ],
        outputFields: ['median_price', 'price_per_sqft', 'avg_days_on_market', 'price_trend_6mo', 'comparable_sales'],
      },
      {
        name: 'get_property_details',
        description: 'Get full details on a specific listing including history and schools.',
        category: 'understand',
        inputSchema: [
          { name: 'listing_id', type: 'string', required: false, description: 'MLS listing ID' },
          { name: 'address', type: 'string', required: false, description: 'Property address' },
        ],
        outputFields: ['full_details', 'tax_history', 'price_history', 'school_ratings', 'walk_score', 'hoa'],
      },
      {
        name: 'check_agent_availability',
        description: 'Check agent availability for showings or consultations.',
        category: 'find',
        inputSchema: [
          { name: 'date', type: 'string', required: true, description: 'Date to check' },
          { name: 'transaction_type', type: 'string', required: false, description: 'Type of transaction', enum: ['buying', 'selling', 'both'] },
        ],
        outputFields: ['available', 'next_available', 'specializations', 'areas_served', 'recent_transactions'],
      },
    ],
    fulfillmentOptions: ['follow_up_boss', 'kvcore', 'showingtime', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'Find me a 3-bed, 2-bath house in Austin under $450K with a yard. Schedule showings for Saturday.',
    leadValue: '$500-5,000',
  },

  {
    id: 'agency',
    name: 'Agency / Consultancy',
    icon: 'Briefcase',
    category: 'professional',
    description: 'Digital agencies, consulting firms, and professional services.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'service_types',
        label: 'Service Types',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'web_dev', label: 'Web Development' },
          { value: 'mobile_dev', label: 'Mobile Development' },
          { value: 'branding', label: 'Branding & Design' },
          { value: 'marketing', label: 'Digital Marketing' },
          { value: 'seo', label: 'SEO' },
          { value: 'ppc', label: 'PPC / Paid Media' },
          { value: 'social', label: 'Social Media' },
          { value: 'strategy', label: 'Strategy Consulting' },
          { value: 'data', label: 'Data & Analytics' },
          { value: 'ai', label: 'AI / ML' },
        ],
      },
      {
        key: 'industries',
        label: 'Industry Specializations',
        type: 'text',
        required: false,
        placeholder: 'Healthcare, SaaS, E-commerce',
      },
      {
        key: 'team_size',
        label: 'Team Size',
        type: 'number',
        required: false,
        placeholder: '25',
      },
      {
        key: 'min_engagement',
        label: 'Minimum Engagement Size ($)',
        type: 'number',
        required: false,
        placeholder: '10000',
      },
      {
        key: 'pricing_model',
        label: 'Pricing Model',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'project', label: 'Project-Based' },
          { value: 'retainer', label: 'Monthly Retainer' },
          { value: 'hourly', label: 'Hourly' },
          { value: 'value_based', label: 'Value-Based' },
        ],
      },
      {
        key: 'crm_system',
        label: 'CRM System',
        type: 'select',
        required: false,
        options: [
          { value: 'hubspot', label: 'HubSpot' },
          { value: 'pipedrive', label: 'Pipedrive' },
          { value: 'monday', label: 'Monday.com' },
          { value: 'other', label: 'Other' },
          { value: 'none', label: 'None' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'check_availability',
        description: 'Check agency capacity for a new project.',
        category: 'find',
        inputSchema: [
          { name: 'project_type', type: 'string', required: true, description: 'Type of project' },
          { name: 'estimated_duration_weeks', type: 'number', required: false, description: 'Estimated project duration in weeks' },
          { name: 'start_date_target', type: 'string', required: false, description: 'Target start date' },
          { name: 'budget_min', type: 'number', required: false, description: 'Minimum budget' },
          { name: 'budget_max', type: 'number', required: false, description: 'Maximum budget' },
        ],
        outputFields: ['available', 'earliest_start', 'current_capacity', 'team_size_available'],
      },
      {
        name: 'view_portfolio',
        description: 'Browse past projects filtered by industry, service type, or budget.',
        category: 'evaluate',
        inputSchema: [
          { name: 'industry', type: 'string', required: false, description: 'Industry filter' },
          { name: 'service_type', type: 'string', required: false, description: 'Service type filter' },
          { name: 'technology', type: 'string', required: false, description: 'Technology filter' },
        ],
        outputFields: ['projects', 'industry', 'services', 'technologies', 'results', 'case_study_url'],
      },
      {
        name: 'request_proposal',
        description: 'Submit an RFP or request a project proposal.',
        category: 'book',
        inputSchema: [
          { name: 'company_name', type: 'string', required: true, description: 'Your company name' },
          { name: 'contact_name', type: 'string', required: true, description: 'Contact name' },
          { name: 'email', type: 'string', required: true, description: 'Contact email' },
          { name: 'project_description', type: 'string', required: true, description: 'Project description' },
          { name: 'budget_min', type: 'number', required: false, description: 'Budget minimum' },
          { name: 'budget_max', type: 'number', required: false, description: 'Budget maximum' },
          { name: 'timeline', type: 'string', required: false, description: 'Desired timeline' },
        ],
        outputFields: ['proposal_id', 'estimated_response_time', 'next_steps', 'preliminary_fit'],
      },
      {
        name: 'book_discovery_call',
        description: 'Book a discovery call with the agency.',
        category: 'book',
        inputSchema: [
          { name: 'contact_name', type: 'string', required: true, description: 'Contact name' },
          { name: 'email', type: 'string', required: true, description: 'Contact email' },
          { name: 'company', type: 'string', required: true, description: 'Company name' },
          { name: 'project_summary', type: 'string', required: true, description: 'Brief project summary' },
          { name: 'preferred_datetime', type: 'string', required: false, description: 'Preferred date/time' },
        ],
        outputFields: ['call_id', 'scheduled_datetime', 'meeting_link', 'with_whom', 'preparation_tips'],
      },
      {
        name: 'get_services_and_rates',
        description: 'Get detailed service offerings with rate ranges.',
        category: 'understand',
        inputSchema: [
          { name: 'service_category', type: 'string', required: false, description: 'Service category to focus on' },
        ],
        outputFields: ['services', 'pricing_model', 'rate_range', 'minimum_engagement', 'industries_served'],
      },
    ],
    fulfillmentOptions: ['hubspot', 'pipedrive', 'pandadoc', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'I need a web development agency specializing in healthcare, can start within 2 weeks, budget $50-100K.',
    leadValue: '$500-5,000',
  },

  // =========================================================================
  // TECH
  // =========================================================================
  {
    id: 'saas',
    name: 'SaaS Platform',
    icon: 'Cloud',
    category: 'tech',
    description: 'Software-as-a-service products with API access, pricing tiers, and integrations.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'product_category',
        label: 'Product Category',
        type: 'text',
        required: true,
        placeholder: 'Project management, CRM, Analytics',
      },
      {
        key: 'has_api',
        label: 'API Available',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'api_type',
        label: 'API Type',
        type: 'select',
        required: false,
        options: [
          { value: 'rest', label: 'REST' },
          { value: 'graphql', label: 'GraphQL' },
          { value: 'grpc', label: 'gRPC' },
          { value: 'webhook', label: 'Webhook only' },
        ],
      },
      {
        key: 'free_tier',
        label: 'Free Tier Available',
        type: 'boolean',
        required: true,
        defaultValue: true,
      },
      {
        key: 'trial_days',
        label: 'Free Trial Days',
        type: 'number',
        required: false,
        placeholder: '14',
      },
      {
        key: 'starting_price',
        label: 'Starting Price ($/user/month)',
        type: 'number',
        required: false,
        placeholder: '9',
      },
      {
        key: 'compliance',
        label: 'Compliance Certifications',
        type: 'multi_select',
        required: false,
        options: [
          { value: 'soc2', label: 'SOC 2' },
          { value: 'hipaa', label: 'HIPAA' },
          { value: 'gdpr', label: 'GDPR' },
          { value: 'iso27001', label: 'ISO 27001' },
        ],
      },
    ],
    mcpTools: [
      {
        name: 'get_pricing',
        description: 'Get pricing plans for a specific team size and feature needs.',
        category: 'evaluate',
        inputSchema: [
          { name: 'team_size', type: 'number', required: false, description: 'Number of team members' },
          { name: 'features_needed', type: 'string', required: false, description: 'Required features (comma-separated)' },
          { name: 'annual_billing', type: 'boolean', required: false, description: 'Prefer annual billing' },
        ],
        outputFields: ['plans', 'price_per_user_monthly', 'features', 'trial_days', 'free_tier'],
      },
      {
        name: 'check_api_capabilities',
        description: 'Check API capabilities and integration options.',
        category: 'understand',
        inputSchema: [
          { name: 'integration_needed', type: 'string', required: false, description: 'Specific integration to check' },
          { name: 'use_case', type: 'string', required: false, description: 'Intended use case' },
        ],
        outputFields: ['api_available', 'api_type', 'rate_limits', 'sdks', 'webhooks', 'mcp_available', 'documentation_url'],
      },
      {
        name: 'create_trial_account',
        description: 'Create a free trial account.',
        category: 'book',
        inputSchema: [
          { name: 'email', type: 'string', required: true, description: 'Email address' },
          { name: 'company_name', type: 'string', required: false, description: 'Company name' },
          { name: 'team_size', type: 'number', required: false, description: 'Expected team size' },
        ],
        outputFields: ['account_id', 'trial_expires', 'login_url', 'api_key', 'onboarding_url'],
      },
      {
        name: 'compare_features',
        description: 'Compare available features against a requirements list.',
        category: 'evaluate',
        inputSchema: [
          { name: 'features_needed', type: 'string', required: true, description: 'Required features (comma-separated)' },
        ],
        outputFields: ['feature_matrix', 'available', 'plan_required', 'missing_features', 'alternatives_for_missing'],
      },
      {
        name: 'get_usage_stats',
        description: 'Get usage statistics and billing info for an account.',
        category: 'follow_up',
        inputSchema: [
          { name: 'account_id', type: 'string', required: true, description: 'Account ID' },
          { name: 'period', type: 'string', required: false, description: 'Time period', enum: ['current_month', 'last_month', 'last_90_days'] },
        ],
        outputFields: ['usage', 'current_plan', 'amount_due', 'next_billing_date', 'recommendations'],
      },
    ],
    fulfillmentOptions: ['api', 'stripe', 'intercom', 'email', 'webhook'],
    exampleAgentQuery: 'I need a project management tool that integrates with GitHub, supports time tracking, under $15/user/month.',
    leadValue: '$50-500',
  },

  // =========================================================================
  // EMERGING
  // =========================================================================
  {
    id: 'creator',
    name: 'Creator / Freelancer',
    icon: 'Palette',
    category: 'emerging',
    description: 'Freelance services, creative work, and project-based engagements.',
    baseFields: BASE_FIELDS,
    verticalFields: [
      {
        key: 'service_types',
        label: 'Service Types',
        type: 'multi_select',
        required: true,
        options: [
          { value: 'video_editing', label: 'Video Editing' },
          { value: 'graphic_design', label: 'Graphic Design' },
          { value: 'web_design', label: 'Web Design' },
          { value: 'copywriting', label: 'Copywriting' },
          { value: 'photography', label: 'Photography' },
          { value: 'illustration', label: 'Illustration' },
          { value: 'animation', label: 'Animation' },
          { value: 'voiceover', label: 'Voice Over' },
          { value: 'music', label: 'Music Production' },
          { value: 'consulting', label: 'Consulting' },
        ],
      },
      {
        key: 'hourly_rate',
        label: 'Hourly Rate ($)',
        type: 'number',
        required: false,
        placeholder: '75',
      },
      {
        key: 'portfolio_url',
        label: 'Portfolio URL',
        type: 'url',
        required: false,
        placeholder: 'https://dribbble.com/yourname',
      },
      {
        key: 'turnaround_days',
        label: 'Typical Turnaround (days)',
        type: 'number',
        required: false,
        placeholder: '5',
      },
      {
        key: 'revisions_included',
        label: 'Revisions Included',
        type: 'number',
        required: false,
        placeholder: '2',
        defaultValue: 2,
      },
      {
        key: 'tools_used',
        label: 'Tools / Software Used',
        type: 'text',
        required: false,
        placeholder: 'Figma, Premiere Pro, After Effects',
      },
    ],
    mcpTools: [
      {
        name: 'check_availability',
        description: 'Check if the creator is available for a project by deadline.',
        category: 'find',
        inputSchema: [
          { name: 'project_type', type: 'string', required: true, description: 'Type of project' },
          { name: 'deadline', type: 'string', required: true, description: 'Project deadline' },
          { name: 'estimated_hours', type: 'number', required: false, description: 'Estimated hours' },
        ],
        outputFields: ['available', 'earliest_start', 'turnaround_time', 'rush_fee_applicable'],
      },
      {
        name: 'get_portfolio',
        description: 'Browse portfolio work, optionally filtered by type or style.',
        category: 'evaluate',
        inputSchema: [
          { name: 'service_type', type: 'string', required: false, description: 'Filter by service type' },
          { name: 'style', type: 'string', required: false, description: 'Filter by style' },
        ],
        outputFields: ['works', 'title', 'url', 'thumbnail_url', 'service_type', 'specializations'],
      },
      {
        name: 'get_quote',
        description: 'Get a quote for a specific project.',
        category: 'evaluate',
        inputSchema: [
          { name: 'service_type', type: 'string', required: true, description: 'Type of service' },
          { name: 'description', type: 'string', required: true, description: 'Project description' },
          { name: 'deliverables', type: 'string', required: true, description: 'Expected deliverables (comma-separated)' },
          { name: 'deadline', type: 'string', required: true, description: 'Deadline' },
        ],
        outputFields: ['quote', 'breakdown', 'timeline', 'revisions_included', 'deposit_required'],
      },
      {
        name: 'book_service',
        description: 'Book the creator for a project.',
        category: 'book',
        inputSchema: [
          { name: 'client_name', type: 'string', required: true, description: 'Client name' },
          { name: 'email', type: 'string', required: true, description: 'Client email' },
          { name: 'service_type', type: 'string', required: true, description: 'Service type' },
          { name: 'description', type: 'string', required: true, description: 'Project description' },
          { name: 'deadline', type: 'string', required: true, description: 'Deadline' },
          { name: 'agreed_price', type: 'number', required: true, description: 'Agreed price' },
        ],
        outputFields: ['project_id', 'contract_url', 'invoice_url', 'milestone_schedule'],
      },
      {
        name: 'get_reviews',
        description: 'View client reviews and ratings.',
        category: 'evaluate',
        inputSchema: [
          { name: 'service_type', type: 'string', required: false, description: 'Filter by service type' },
        ],
        outputFields: ['average_rating', 'total_reviews', 'reviews', 'on_time_percentage', 'response_time_avg'],
      },
    ],
    fulfillmentOptions: ['bonsai', 'honeybook', 'stripe', 'email', 'sms', 'calendly', 'webhook'],
    exampleAgentQuery: 'I need a freelance video editor who can turn around a 10-minute YouTube video in 48 hours. Budget $500.',
    leadValue: '$50-500',
  },
]

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export function getAllTemplates(): VerticalTemplate[] {
  return TEMPLATES
}

export function getTemplateById(id: string): VerticalTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id)
}

export function getTemplatesByCategory(category: VerticalCategory): VerticalTemplate[] {
  return TEMPLATES.filter((t) => t.category === category)
}

export const CATEGORY_LABELS: Record<VerticalCategory, string> = {
  local_services: 'Local Services',
  professional: 'Professional',
  retail: 'Retail',
  tech: 'Tech',
  emerging: 'Emerging',
}

export const CATEGORY_ORDER: VerticalCategory[] = [
  'local_services',
  'retail',
  'professional',
  'tech',
  'emerging',
]

export { BASE_FIELDS }
