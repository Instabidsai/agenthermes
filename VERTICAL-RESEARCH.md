# AgentHermes Vertical Research — Making Every Business Agent-Ready

> Research date: 2026-03-30
> Purpose: Define what "agent-ready" means for 15 business verticals, including MCP tool schemas, fulfillment routing, data requirements, agent use cases, revenue models, and platform integrations.
> Goal: Build templates that turn any business in these verticals into MCP tools that AI agents can call on behalf of humans.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Universal Template (Minimum Viable)](#universal-template)
3. [Vertical Deep Dives (1-15)](#vertical-deep-dives)
4. [Cross-Vertical Analysis](#cross-vertical-analysis)
5. [Prioritization Matrix](#prioritization-matrix)
6. [Template Architecture](#template-architecture)

---

## Executive Summary

The core question for each vertical: **"What would an AI agent need to do with this business on behalf of a human?"**

The answer breaks into 6 stages that mirror AgentHermes's existing scoring framework:

| Stage | Agent Action | MCP Tool Pattern |
|-------|-------------|-----------------|
| FIND | Discover the business exists and serves the need | `search_providers`, `check_service_area` |
| UNDERSTAND | Get services, pricing, hours, capabilities | `get_services`, `get_pricing`, `get_hours` |
| EVALUATE | Compare options, read reviews, check trust | `get_reviews`, `check_availability`, `get_quote` |
| BOOK | Schedule, reserve, or initiate the service | `book_appointment`, `request_quote`, `place_order` |
| PAY | Complete the transaction | `initiate_payment`, `get_invoice` |
| FOLLOW UP | Track status, reschedule, get updates | `check_status`, `reschedule`, `get_receipt` |

Every vertical needs tools from most of these stages. The difference is which stages matter most and what the input/output schemas look like.

---

## Universal Template

**Every business, regardless of vertical, needs these 6 data points at minimum:**

```json
{
  "business_name": "string",
  "services": [{ "name": "string", "description": "string", "price_range": "string" }],
  "hours": { "mon": "9:00-17:00", "tue": "9:00-17:00", ... },
  "service_area": { "type": "radius|zip_list|city_list", "value": "..." },
  "booking_method": { "type": "url|phone|email|api", "value": "..." },
  "contact": { "phone": "string", "email": "string", "address": "string" }
}
```

**And these 3 universal MCP tools:**

1. **get_business_info** — Returns name, description, hours, contact, service area
2. **get_services** — Returns list of services with descriptions and pricing
3. **check_availability** — Returns next available time slots or current open/closed status

Everything else is vertical-specific. The template system layers vertical tools ON TOP of these three.

---

## Vertical Deep Dives

---

### 1. HVAC / AC Company

**Agent use case:** "Hey agent, my AC is broken. It's 95 degrees. Find someone who can come TODAY in my zip code, under $200 for a diagnostic."

**Why agents will call HVAC companies:**
- Emergency situations (broken AC in summer, no heat in winter) where speed matters
- Price comparison across multiple providers
- Scheduling maintenance during optimal times
- Warranty/service plan management

#### Top 5 MCP Tools

**Tool 1: `check_emergency_availability`**
```
Input:  { zip_code: string, issue_type: "no_cooling"|"no_heating"|"leak"|"noise"|"other", urgency: "emergency"|"same_day"|"this_week" }
Output: { available: boolean, next_slot: datetime, emergency_fee: number, estimated_arrival: "1-2 hours"|"2-4 hours"|"next_day", technician_name?: string }
```

**Tool 2: `get_diagnostic_quote`**
```
Input:  { system_type: "central_ac"|"heat_pump"|"furnace"|"mini_split"|"window_unit", issue_description: string, home_sqft?: number }
Output: { diagnostic_fee: number, waived_if_repaired: boolean, estimated_repair_range: { low: number, high: number }, common_issues: string[] }
```

**Tool 3: `book_service_call`**
```
Input:  { customer_name: string, phone: string, email: string, address: string, preferred_datetime: datetime, issue_type: string, issue_description: string, urgency: string }
Output: { confirmation_id: string, scheduled_datetime: datetime, technician: string, estimated_duration: string, what_to_expect: string }
```

**Tool 4: `get_maintenance_plans`**
```
Input:  { system_type: string, home_sqft?: number, num_units?: number }
Output: { plans: [{ name: string, price_monthly: number, price_annual: number, includes: string[], discount_on_repairs: string }] }
```

**Tool 5: `check_service_area`**
```
Input:  { zip_code: string }
Output: { serviced: boolean, zone: "primary"|"extended"|"out_of_area", additional_fee?: number, estimated_response_time: string }
```

#### Fulfillment Routing
- **Primary:** ServiceTitan, Housecall Pro, or Jobber (dispatch + scheduling)
- **Fallback:** Email to dispatch@company.com + SMS to on-call tech
- **Emergency:** Direct SMS/call to on-call technician with auto-callback
- **Webhook:** POST to company's CRM with lead data

#### Data Needed from Business
- Service list with pricing (diagnostic fee, per-hour rate, common repair prices)
- Service area (zip codes or radius from office)
- Hours of operation + emergency/after-hours availability
- Maintenance plan details
- Average response times by urgency level
- Booking system credentials or booking link (Calendly, ServiceTitan, etc.)
- Emergency dispatch phone number

#### Revenue Model
- **Value per agent lead:** $150-500 (emergency calls convert at 90%+, average ticket $300-800)
- **What businesses would pay:** $25-75 per qualified lead, or $199/mo flat for unlimited
- **Emergency premium:** Emergency leads worth 3x regular leads (homeowner in crisis = no price shopping)
- **Maintenance upsell:** Recurring revenue from plan enrollments generated by agents

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| ServiceTitan | ~30% of large HVAC | REST API (robust, well-documented) |
| Housecall Pro | ~25% of SMB | REST API + Zapier |
| Jobber | ~20% of SMB | REST API |
| FieldEdge | ~10% | Limited API, webhook-based |
| Google Business Profile | Universal | Google Business API for hours/reviews |
| Angi/HomeAdvisor | Lead gen | Scrape or partner API |

---

### 2. Lawn Care / Landscaping

**Agent use case:** "Agent, get me quotes from 3 lawn services in 78704 for weekly mowing of a 5,000 sqft yard. I want the cheapest that has good reviews."

**Why agents will call lawn care businesses:**
- Routine recurring service that benefits from auto-scheduling
- Easy to compare (price per sqft or per visit)
- Seasonal scheduling (spring cleanup, fall leaf removal, winterization)
- Before/after photo proof for property managers

#### Top 5 MCP Tools

**Tool 1: `get_mowing_quote`**
```
Input:  { zip_code: string, lot_sqft: number, frequency: "weekly"|"biweekly"|"monthly"|"one_time", terrain: "flat"|"hilly"|"mixed", obstacles: string[]? }
Output: { price_per_visit: number, price_monthly: number, includes: string[], add_ons: [{ name: string, price: number }], first_available: date }
```

**Tool 2: `get_seasonal_services`**
```
Input:  { zip_code: string, lot_sqft: number, season: "spring"|"summer"|"fall"|"winter" }
Output: { services: [{ name: string, description: string, price: number, recommended: boolean, typical_timing: string }] }
```

**Tool 3: `schedule_service`**
```
Input:  { customer_name: string, phone: string, address: string, service_type: string, preferred_date: date, recurring: boolean, frequency?: string, special_instructions?: string }
Output: { confirmation_id: string, scheduled_date: date, crew_arrival_window: string, estimated_duration: string, gate_code_needed: boolean }
```

**Tool 4: `get_portfolio`**
```
Input:  { service_type?: string, zip_code?: string }
Output: { projects: [{ description: string, before_photo_url: string, after_photo_url: string, service_type: string, lot_size: string, date: date }] }
```

**Tool 5: `check_service_area_and_pricing`**
```
Input:  { zip_code: string }
Output: { serviced: boolean, zone_pricing_tier: "standard"|"extended"|"premium", base_price_per_sqft: number, minimum_lot_size: number, maximum_lot_size: number }
```

#### Fulfillment Routing
- **Primary:** Jobber, LawnPro, or Service Autopilot (scheduling + invoicing)
- **Fallback:** Email quote request + text to owner
- **Recurring:** Auto-schedule into CRM calendar
- **Property managers:** Bulk scheduling API for multiple properties

#### Data Needed from Business
- Base pricing formula (per sqft, per visit, or tiered)
- Service area with zone-based pricing
- Service catalog (mowing, edging, fertilization, aeration, tree trimming, etc.)
- Seasonal availability
- Equipment capabilities (can they handle large lots? commercial properties?)
- Portfolio/before-after photos
- Minimum lot size and maximum lot size
- Scheduling preferences (which days they serve which areas)

#### Revenue Model
- **Value per agent lead:** $30-80 (lower ticket but high recurring LTV)
- **What businesses would pay:** $10-25 per lead, or $99/mo flat
- **Recurring value:** One agent-sourced customer = $1,200-3,000/year in recurring revenue
- **Property manager leads:** 10x value (multi-property contracts)

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| Jobber | ~30% of SMB | REST API |
| Service Autopilot | ~15% | API + webhooks |
| LawnPro | ~10% | Basic API |
| Yardbook | ~10% | Limited, CSV export |
| LMN | ~5% (commercial) | REST API |
| Google Business Profile | Universal | Google API |

---

### 3. Plumbing

**Agent use case:** "My toilet is overflowing and won't stop. I need an emergency plumber NOW in 30309. Who can get here fastest?"

**Why agents will call plumbers:**
- Emergencies dominate (burst pipe, sewage backup, no hot water) — homeowner is panicked
- Price opacity is the #1 complaint — agents can get transparent quotes
- Repeat customers for different issues over time
- Insurance claim coordination for water damage

#### Top 5 MCP Tools

**Tool 1: `emergency_dispatch`**
```
Input:  { zip_code: string, issue: "burst_pipe"|"sewage_backup"|"no_hot_water"|"toilet_overflow"|"gas_smell"|"flooding"|"other", description: string, water_shutoff_accessible: boolean }
Output: { available: boolean, eta_minutes: number, emergency_fee: number, first_steps: string[], technician_name?: string, call_back_number: string }
```

**Tool 2: `get_estimate`**
```
Input:  { issue_type: string, description: string, home_type: "house"|"apartment"|"condo"|"commercial", home_age_years?: number, photos_urls?: string[] }
Output: { estimated_range: { low: number, high: number }, diagnostic_fee: number, common_causes: string[], typical_duration: string, parts_likely_needed: string[] }
```

**Tool 3: `book_appointment`**
```
Input:  { customer_name: string, phone: string, address: string, issue_type: string, description: string, preferred_date: date, preferred_time_window: "morning"|"afternoon"|"evening"|"asap", access_instructions?: string }
Output: { confirmation_id: string, scheduled_window: string, technician: string, pre_arrival_checklist: string[], cancellation_policy: string }
```

**Tool 4: `check_availability`**
```
Input:  { zip_code: string, date: date, urgency: "emergency"|"urgent"|"routine" }
Output: { available_slots: [{ date: date, time_window: string, technician: string }], emergency_available: boolean, next_available: datetime }
```

**Tool 5: `get_service_pricing`**
```
Input:  { service_category: "drain"|"water_heater"|"toilet"|"faucet"|"pipe_repair"|"sewer"|"gas_line"|"remodel" }
Output: { services: [{ name: string, price_range: string, includes: string[], warranty: string, typical_duration: string }], trip_charge: number, after_hours_multiplier: number }
```

#### Fulfillment Routing
- **Emergency:** Direct SMS + phone call to on-call plumber, auto-create ticket in ServiceTitan
- **Routine:** Housecall Pro or ServiceTitan scheduling
- **Fallback:** Email dispatch + confirmation text to customer
- **Insurance:** Flag for insurance coordination workflow if water damage detected

#### Data Needed from Business
- Emergency availability (24/7? after-hours fee?)
- Service pricing matrix (trip charge, per-hour, flat-rate repairs)
- Service area with response time estimates
- Licensing and insurance info (agents will be asked this)
- Specialties (gas line certified? sewer camera? tankless water heater?)
- After-hours/weekend premium rates
- Booking system or dispatch method

#### Revenue Model
- **Value per agent lead:** $200-800 (emergency plumbing = highest urgency in home services)
- **What businesses would pay:** $50-150 per qualified lead
- **Emergency premium:** Panicked homeowners convert at 95%+ with zero price shopping
- **Average ticket:** $350-1,200 depending on issue
- **Lifetime value:** Plumber becomes "my plumber" for 10+ years

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| ServiceTitan | ~25% | REST API |
| Housecall Pro | ~20% | REST API + Zapier |
| Jobber | ~15% | REST API |
| FieldPulse | ~5% | REST API |
| Google Local Services | Lead gen | Partner API |
| Thumbtack | Lead gen | No official API (manual) |

---

### 4. Cleaning Service

**Agent use case:** "I need a deep clean of my 2,200 sqft apartment before I move out next Saturday. Get me the best-rated service under $400."

**Why agents will call cleaning services:**
- Highly standardizable (price = f(sqft, bedrooms, bathrooms, clean_type))
- Recurring scheduling is perfect for agent automation
- Move-in/move-out cleans are time-sensitive with clear deadlines
- Property managers need bulk scheduling across multiple units

#### Top 5 MCP Tools

**Tool 1: `get_cleaning_quote`**
```
Input:  { sqft: number, bedrooms: number, bathrooms: number, clean_type: "standard"|"deep"|"move_in_out"|"post_construction"|"airbnb_turnover", frequency: "one_time"|"weekly"|"biweekly"|"monthly", special_requests?: string[], has_pets: boolean }
Output: { price: number, price_recurring?: number, duration_hours: number, team_size: number, includes: string[], add_ons: [{ name: string, price: number }], discount_recurring: string }
```

**Tool 2: `book_cleaning`**
```
Input:  { customer_name: string, phone: string, address: string, clean_type: string, preferred_date: date, preferred_time: "morning"|"afternoon", sqft: number, bedrooms: number, bathrooms: number, access_method: "present"|"lockbox"|"doorman"|"key_under_mat", special_instructions?: string }
Output: { confirmation_id: string, scheduled_datetime: datetime, team_lead: string, estimated_duration: string, what_to_prepare: string[], cancellation_policy: string }
```

**Tool 3: `check_availability`**
```
Input:  { zip_code: string, date: date, clean_type: string, sqft: number }
Output: { available_slots: [{ date: date, time: string, team_available: boolean }], next_available: date, rush_fee_applicable: boolean }
```

**Tool 4: `get_recurring_plans`**
```
Input:  { sqft: number, bedrooms: number, bathrooms: number, has_pets: boolean }
Output: { plans: [{ frequency: string, price_per_visit: number, monthly_cost: number, savings_vs_one_time: string, includes: string[], first_clean_discount: string }] }
```

**Tool 5: `request_special_service`**
```
Input:  { service_type: "carpet_cleaning"|"window_washing"|"oven_deep_clean"|"refrigerator"|"garage"|"laundry"|"organizing", details: string, sqft_or_count: number }
Output: { available: boolean, price: number, can_add_to_regular: boolean, estimated_duration: string, supplies_included: boolean }
```

#### Fulfillment Routing
- **Primary:** Launch27, ZenMaid, or Booking Koala (cleaning-specific CRMs)
- **Fallback:** Email + SMS with booking details
- **Recurring:** Auto-schedule in CRM with recurring billing
- **Property managers:** Bulk booking API with unit-level tracking

#### Data Needed from Business
- Pricing formula (per sqft, flat rate, or tiered by bedroom/bathroom)
- Service types offered (standard, deep, move-in/out, Airbnb, commercial)
- Recurring discounts
- Service area
- Supplies included or BYOS (bring your own supplies)?
- Team sizes by job type
- Cancellation/rescheduling policy
- Add-on services and pricing

#### Revenue Model
- **Value per agent lead:** $50-200 (move-out cleans at $200-500, recurring at $100-200/visit)
- **What businesses would pay:** $15-40 per lead, or $79/mo flat
- **Recurring LTV:** One customer on biweekly = $2,400-5,200/year
- **Property manager bulk:** Single contract = $5,000-50,000/year

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| Launch27 / Bookingkoala | ~20% | REST API |
| ZenMaid | ~15% | REST API |
| Jobber | ~10% (multi-service) | REST API |
| Housecall Pro | ~10% | REST API + Zapier |
| Square Appointments | ~10% | Square API |
| Turno (Airbnb) | Growing | REST API |

---

### 5. Roofing

**Agent use case:** "We just had a hailstorm. I need a roofer to inspect my roof and tell me if I should file an insurance claim. 75002."

**Why agents will call roofers:**
- Storm damage creates surge demand with high urgency
- Insurance claim process is confusing — agents can coordinate
- Expensive tickets ($5,000-25,000) make leads very valuable
- Seasonal patterns (storm season, pre-winter) create predictable demand

#### Top 5 MCP Tools

**Tool 1: `request_inspection`**
```
Input:  { address: string, roof_type: "asphalt_shingle"|"metal"|"tile"|"flat"|"slate"|"unknown", issue: "storm_damage"|"leak"|"age"|"missing_shingles"|"sagging"|"routine", visible_damage_description?: string, photos_urls?: string[], insurance_claim: boolean }
Output: { inspection_scheduled: boolean, inspection_type: "free"|"paid", inspection_fee?: number, next_available: date, what_to_expect: string, insurance_assistance: boolean }
```

**Tool 2: `get_estimate`**
```
Input:  { address: string, roof_sqft?: number, stories: number, roof_type: string, work_type: "repair"|"partial_replacement"|"full_replacement"|"new_construction", current_condition?: string }
Output: { estimated_range: { low: number, high: number }, factors: string[], timeline_weeks: number, financing_available: boolean, warranty_options: [{ type: string, years: number, coverage: string }], insurance_tip: string }
```

**Tool 3: `check_storm_damage_eligibility`**
```
Input:  { address: string, storm_date: date, damage_type: "hail"|"wind"|"fallen_tree"|"tornado"|"hurricane", insurance_provider?: string }
Output: { likely_covered: boolean, recommended_action: string, documentation_needed: string[], claim_assistance_available: boolean, free_inspection: boolean, typical_payout_range: string }
```

**Tool 4: `get_financing_options`**
```
Input:  { estimated_cost: number, credit_score_range: "excellent"|"good"|"fair"|"poor" }
Output: { options: [{ provider: string, apr: string, term_months: number, monthly_payment: number, down_payment: number, approval_likelihood: string }] }
```

**Tool 5: `schedule_appointment`**
```
Input:  { customer_name: string, phone: string, address: string, appointment_type: "inspection"|"estimate"|"repair"|"replacement", preferred_date: date, insurance_involved: boolean, insurance_provider?: string, claim_number?: string }
Output: { confirmation_id: string, scheduled_date: date, inspector_name: string, estimated_duration: string, preparation_steps: string[] }
```

#### Fulfillment Routing
- **Primary:** AccuLynx, JobNimbus, or Roofr (roofing-specific CRMs)
- **Storm events:** Bulk dispatch with territory routing
- **Insurance:** Xactimate integration for claim documentation
- **Fallback:** Email + SMS to sales team with lead details

#### Data Needed from Business
- Service area with storm response radius
- Free inspection policy
- Roof types they service
- Insurance claim assistance (do they work with adjusters?)
- Financing partners
- Warranty offerings (manufacturer + workmanship)
- Licensing, bonding, insurance documentation
- Average project timelines by type
- Before/after portfolio

#### Revenue Model
- **Value per agent lead:** $500-2,000 (average roof replacement = $8,000-15,000)
- **What businesses would pay:** $100-300 per qualified lead
- **Storm surge premium:** Post-storm leads 5x more valuable (urgency + insurance coverage)
- **Close rate:** 30-40% from inspection to signed contract
- **Referral bonus:** Insurance claims often = full replacement

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| AccuLynx | ~20% | REST API |
| JobNimbus | ~15% | REST API + Zapier |
| Roofr | ~10% | REST API (measurement + proposal) |
| CompanyCam | ~15% | REST API (photos) |
| EagleView | ~30% | Aerial measurement API |
| Xactimate | Insurance std | Limited integration |

---

### 6. Law Firm

**Agent use case:** "I was rear-ended yesterday. Find me a personal injury lawyer in Miami who works on contingency and can do a free consultation this week."

**Why agents will call law firms:**
- Practice area matching is complex (need the RIGHT type of lawyer)
- Time-sensitive (statutes of limitations, arrest scenarios, business disputes)
- Fee structure confusion (contingency vs hourly vs flat fee vs retainer)
- Conflict-of-interest checks before booking

#### Top 5 MCP Tools

**Tool 1: `check_practice_areas`**
```
Input:  { legal_need: string }
Output: { matches: [{ practice_area: string, match_confidence: number, description: string, typical_fee_structure: string }], firm_handles: boolean, referral_available: boolean }
```

**Tool 2: `book_consultation`**
```
Input:  { client_name: string, phone: string, email: string, practice_area: string, case_summary: string, urgency: "immediate"|"this_week"|"not_urgent", preferred_format: "in_person"|"phone"|"video", preferred_datetime?: datetime, opposing_party?: string }
Output: { consultation_id: string, type: "free"|"paid", fee?: number, scheduled_datetime: datetime, format: string, attorney_name: string, what_to_bring: string[], conflict_cleared: boolean }
```

**Tool 3: `get_fee_structure`**
```
Input:  { practice_area: string, case_type?: string }
Output: { fee_type: "contingency"|"hourly"|"flat_fee"|"retainer"|"hybrid", details: { contingency_percentage?: string, hourly_rate?: number, flat_fee?: number, retainer_amount?: number }, free_consultation: boolean, payment_plans: boolean, typical_total_range: string }
```

**Tool 4: `get_case_evaluation`**
```
Input:  { practice_area: string, case_summary: string, incident_date?: date, jurisdiction: string, damages_estimate?: number }
Output: { preliminary_assessment: string, statute_of_limitations: string, time_remaining: string, recommended_urgency: string, likely_fee_structure: string, similar_case_outcomes: string, next_steps: string[] }
```

**Tool 5: `check_attorney_credentials`**
```
Input:  { attorney_name?: string }
Output: { attorneys: [{ name: string, bar_number: string, bar_status: "active"|"inactive", years_experience: number, practice_areas: string[], education: string, notable_cases?: string[], awards?: string[], peer_rating?: string }] }
```

#### Fulfillment Routing
- **Primary:** Clio, MyCase, or PracticePanther (legal practice management)
- **Intake:** Lawmatics or Lexicata (intake-specific CRMs)
- **Fallback:** Email to intake@firm.com with structured lead data
- **Conflict check:** Must run before booking (critical legal requirement)

#### Data Needed from Business
- Practice areas (detailed, not just "personal injury" but sub-types)
- Fee structures by practice area
- Attorney bios, bar numbers, credentials
- Free consultation policy (which practice areas, duration)
- Jurisdictions served
- Consultation formats (in-person, phone, video)
- Languages spoken
- Conflict check requirements
- Notable case results (if permissible in jurisdiction)

#### Revenue Model
- **Value per agent lead:** $200-5,000 (varies wildly by practice area)
  - Personal injury: $500-2,000 (contingency cases are gold)
  - Criminal defense: $300-1,000
  - Business law: $200-500
  - Estate planning: $100-300
- **What businesses would pay:** $50-500 per qualified lead depending on practice area
- **Case value multiplier:** One PI case = $50,000-500,000 in fees

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| Clio | ~30% | REST API (robust) |
| MyCase | ~15% | REST API |
| PracticePanther | ~10% | REST API |
| Lawmatics | ~10% (intake) | REST API + Zapier |
| LawPay | ~25% (payments) | REST API |
| Avvo / Justia | Discovery | Scrape or partner |

---

### 7. Accounting / CPA

**Agent use case:** "I just got a notice from the IRS about back taxes. Find a CPA who handles tax resolution and can see me before April 15."

**Why agents will call CPAs:**
- Deadline-driven (tax season, quarterly estimates, business filings)
- Complex service matching (tax prep vs audit vs bookkeeping vs advisory)
- Business lifecycle needs (startup formation, growth planning, exit strategy)
- Price opacity — hard to compare without calling 5 firms

#### Top 5 MCP Tools

**Tool 1: `get_service_quote`**
```
Input:  { service_type: "tax_prep_individual"|"tax_prep_business"|"bookkeeping"|"payroll"|"tax_resolution"|"audit_defense"|"business_formation"|"advisory", entity_type?: "individual"|"sole_prop"|"llc"|"s_corp"|"c_corp"|"partnership"|"nonprofit", annual_revenue?: number, complexity: "simple"|"moderate"|"complex" }
Output: { price_range: { low: number, high: number }, fee_type: "flat"|"hourly"|"monthly", includes: string[], turnaround_time: string, documents_needed: string[] }
```

**Tool 2: `book_appointment`**
```
Input:  { client_name: string, phone: string, email: string, service_type: string, entity_type?: string, urgency: "tax_deadline"|"irs_notice"|"routine"|"planning", preferred_datetime?: datetime, brief_description: string }
Output: { confirmation_id: string, scheduled_datetime: datetime, accountant_name: string, format: "in_person"|"video"|"phone", documents_to_bring: string[], pre_meeting_questionnaire_url?: string }
```

**Tool 3: `check_deadline_status`**
```
Input:  { entity_type: string, tax_year: number, filing_type: "income_tax"|"quarterly_estimated"|"payroll"|"sales_tax"|"extension" }
Output: { deadline: date, days_remaining: number, extension_available: boolean, extension_deadline?: date, penalty_for_late: string, can_still_file: boolean }
```

**Tool 4: `get_tax_prep_checklist`**
```
Input:  { entity_type: string, tax_year: number, has_investments: boolean, has_rental_property: boolean, has_crypto: boolean, has_foreign_income: boolean, self_employed: boolean }
Output: { documents_needed: [{ document: string, where_to_find: string, required: boolean }], estimated_complexity: string, estimated_price_range: string }
```

**Tool 5: `check_services_offered`**
```
Input:  { need: string }
Output: { services: [{ name: string, description: string, price_range: string, best_for: string, turnaround: string }], industries_specialized: string[], certifications: string[] }
```

#### Fulfillment Routing
- **Primary:** Karbon, Canopy, or TaxDome (accounting practice management)
- **Client portal:** TaxDome or SmartVault for document exchange
- **Fallback:** Email to office with structured intake form
- **Tax season surge:** Waitlist with priority scoring

#### Data Needed from Business
- Service catalog with pricing ranges
- Entity types served
- Industry specializations
- Tax season capacity/availability
- Certifications (CPA, EA, CMA, CFP)
- Software used (QuickBooks, Xero — matters for compatibility)
- Client portal for document exchange
- Languages spoken
- After-hours availability during tax season

#### Revenue Model
- **Value per agent lead:** $100-1,000
  - Individual tax prep: $100-300
  - Business tax prep: $300-800
  - Bookkeeping monthly: $200-500 (high LTV)
  - Tax resolution: $500-2,000
- **What businesses would pay:** $30-100 per qualified lead
- **Recurring LTV:** Tax clients stay for 7+ years average

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| TaxDome | Growing fast | REST API |
| Karbon | ~15% | REST API |
| Canopy | ~10% | REST API |
| QuickBooks Online | ~80% (client-side) | Intuit API |
| Xero | ~15% (client-side) | Xero API |
| SmartVault | ~10% (docs) | REST API |

---

### 8. Real Estate Agent

**Agent use case:** "Find me a 3-bed, 2-bath house in Austin under $450K that allows dogs, with a yard, and schedule showings for Saturday."

**Why agents will call real estate agents:**
- Search and filter is the #1 agent use case (MLS-connected data)
- Showing scheduling across multiple properties in one trip
- Market analysis and pricing guidance
- Transaction coordination is complex and long-running

#### Top 5 MCP Tools

**Tool 1: `search_listings`**
```
Input:  { location: string, min_price?: number, max_price?: number, bedrooms_min?: number, bathrooms_min?: number, property_type: "house"|"condo"|"townhouse"|"land"|"multi_family", sqft_min?: number, features?: string[], max_hoa?: number, max_days_on_market?: number, sort_by: "price"|"newest"|"sqft"|"relevance" }
Output: { listings: [{ mls_id: string, address: string, price: number, bedrooms: number, bathrooms: number, sqft: number, lot_sqft: number, year_built: number, photos: string[], description: string, days_on_market: number, status: string }], total_count: number }
```

**Tool 2: `book_showing`**
```
Input:  { client_name: string, phone: string, email: string, listing_ids: string[], preferred_date: date, preferred_time_window: "morning"|"afternoon"|"evening", pre_approved: boolean, pre_approval_amount?: number }
Output: { showing_id: string, confirmed_showings: [{ listing_id: string, address: string, time: datetime, duration_minutes: number }], route_optimized: boolean, agent_name: string, agent_phone: string }
```

**Tool 3: `get_market_analysis`**
```
Input:  { address?: string, zip_code: string, property_type: string, bedrooms?: number, radius_miles?: number }
Output: { median_price: number, price_per_sqft: number, avg_days_on_market: number, inventory_count: number, price_trend_6mo: string, buyer_vs_seller_market: string, comparable_sales: [{ address: string, sold_price: number, sold_date: date, sqft: number }] }
```

**Tool 4: `get_property_details`**
```
Input:  { mls_id?: string, address?: string }
Output: { full_details: object, tax_history: [{ year: number, amount: number }], price_history: [{ date: date, event: string, price: number }], school_ratings: object, walk_score: number, flood_zone: boolean, hoa: { amount: number, frequency: string, includes: string[] } }
```

**Tool 5: `check_agent_availability`**
```
Input:  { date: date, property_type?: string, transaction_type: "buying"|"selling"|"both" }
Output: { available: boolean, next_available: date, specializations: string[], areas_served: string[], languages: string[], recent_transactions: number, avg_sale_price: number }
```

#### Fulfillment Routing
- **Primary:** Follow Up Boss, kvCORE, or BoomTown (real estate CRMs)
- **MLS:** RESO Web API or local MLS feed
- **Showing scheduling:** ShowingTime or Calendly
- **Fallback:** Email/text to agent with lead details

#### Data Needed from Business
- Agent bio, license number, certifications (ABR, CRS, etc.)
- Areas served (neighborhoods, zip codes)
- Specializations (luxury, first-time, investment, commercial)
- Current listings (or MLS feed access)
- Availability calendar
- Languages spoken
- Team or solo agent
- Transaction volume (social proof)
- Commission structure (for buyer representation discussion)

#### Revenue Model
- **Value per agent lead:** $500-5,000 (3% of $400K home = $12,000 commission)
- **What businesses would pay:** $50-200 per qualified buyer lead
- **Seller leads:** Even higher value ($200-500 per lead)
- **Close rate:** 2-5% of leads close, but commission is massive

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| Follow Up Boss | ~20% | REST API |
| kvCORE | ~15% | REST API |
| BoomTown | ~10% | REST API |
| ShowingTime | ~40% (showings) | REST API |
| RESO Web API | Industry std | REST API (MLS access) |
| Zillow / Realtor.com | Discovery | Partner API |

---

### 9. Dentist / Medical Office

**Agent use case:** "I chipped my tooth and need to see a dentist who takes Delta Dental PPO. Find one near 10001 with appointments this week."

**Why agents will call medical offices:**
- Insurance verification is the #1 friction point (agents can automate this)
- Appointment scheduling with complex provider matching
- New patient onboarding paperwork (agents pre-fill forms)
- Multi-provider scheduling (dentist, specialist referral, follow-up)

#### Top 5 MCP Tools

**Tool 1: `check_insurance`**
```
Input:  { insurance_provider: string, plan_type: "PPO"|"HMO"|"EPO"|"DHMO"|"indemnity"|"medicaid"|"medicare", member_id?: string }
Output: { accepted: boolean, in_network: boolean, estimated_coverage: string, patient_responsibility: string, verification_note: string, call_to_verify: boolean }
```

**Tool 2: `book_appointment`**
```
Input:  { patient_name: string, phone: string, email: string, date_of_birth: date, appointment_type: "cleaning"|"exam"|"emergency"|"cosmetic_consult"|"filling"|"crown"|"root_canal"|"extraction"|"whitening"|"invisalign_consult"|"new_patient", preferred_date: date, preferred_time: "morning"|"afternoon"|"first_available", insurance_provider?: string, new_patient: boolean }
Output: { confirmation_id: string, scheduled_datetime: datetime, provider_name: string, estimated_duration_minutes: number, pre_visit_forms_url?: string, what_to_bring: string[], cancellation_policy: string }
```

**Tool 3: `check_emergency_availability`**
```
Input:  { zip_code: string, issue: "tooth_pain"|"chipped_tooth"|"knocked_out_tooth"|"swelling"|"bleeding"|"broken_braces"|"lost_filling", severity: "mild"|"moderate"|"severe" }
Output: { available_today: boolean, next_emergency_slot: datetime, emergency_fee: number, after_hours_available: boolean, after_hours_number?: string, first_aid_advice: string }
```

**Tool 4: `get_services_and_pricing`**
```
Input:  { category?: "preventive"|"restorative"|"cosmetic"|"orthodontic"|"surgical"|"all" }
Output: { services: [{ name: string, description: string, price_without_insurance: number, typical_insurance_coverage: string, duration_minutes: number, requires_consultation: boolean }] }
```

**Tool 5: `get_provider_info`**
```
Input:  { specialty?: string }
Output: { providers: [{ name: string, title: string, specialties: string[], education: string, years_experience: number, languages: string[], accepting_new_patients: boolean, next_available: date }] }
```

#### Fulfillment Routing
- **Primary:** Dentrix, Eaglesoft, or Open Dental (dental practice management)
- **Patient portal:** NexHealth, Weave, or Kleer (patient engagement)
- **Insurance verification:** DentalXChange, Vyne Dental
- **Fallback:** Email to front desk with appointment request
- **HIPAA compliance:** All data must be transmitted securely, PHI rules apply

#### Data Needed from Business
- Insurance plans accepted (detailed list)
- Services offered with self-pay pricing
- Provider bios and specialties
- Hours of operation and emergency availability
- New patient process (forms, first visit duration)
- Languages spoken
- Technology highlights (digital X-rays, same-day crowns, laser dentistry)
- Patient portal URL
- Appointment types and durations
- **HIPAA compliance notice** for agent interactions

#### Revenue Model
- **Value per agent lead:** $200-800 (new patient LTV = $1,000-5,000 over 3 years)
- **What businesses would pay:** $50-150 per new patient acquisition
- **Insurance verification value:** Saves 15-30 min of staff time per call
- **Cosmetic leads:** Higher value ($500-2,000 for Invisalign, veneers, implants)

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| Dentrix (Henry Schein) | ~35% | HL7/API (limited) |
| Eaglesoft (Patterson) | ~20% | Limited API |
| Open Dental | ~15% | REST API (open source) |
| NexHealth | ~10% (engagement) | REST API (excellent) |
| Weave | ~15% (comms) | REST API |
| Kleer | Growing (membership) | REST API |

---

### 10. Restaurant

**Agent use case:** "Book me a table for 4 at an Italian restaurant in SoHo for 7:30pm tonight. Must have vegetarian options and outdoor seating."

**Why agents will call restaurants:**
- Reservation management is a solved-but-fragmented problem
- Menu queries with dietary filters are perfect for agents
- Multi-restaurant comparison (price, cuisine, availability, ambiance)
- Delivery/takeout ordering with customization
- Event and large party coordination

#### Top 5 MCP Tools

**Tool 1: `make_reservation`**
```
Input:  { party_size: number, date: date, time: string, customer_name: string, phone: string, email?: string, special_requests?: string[], seating_preference?: "indoor"|"outdoor"|"bar"|"private_room"|"no_preference", occasion?: string }
Output: { reservation_id: string, confirmed_time: string, table_type: string, confirmation_method: "email"|"sms"|"both", cancellation_policy: string, deposit_required?: number, parking_info?: string }
```

**Tool 2: `view_menu`**
```
Input:  { menu_type?: "lunch"|"dinner"|"brunch"|"drinks"|"dessert"|"kids"|"full", dietary_filters?: ["vegetarian"|"vegan"|"gluten_free"|"dairy_free"|"nut_free"|"halal"|"kosher"], price_range?: { min: number, max: number } }
Output: { sections: [{ name: string, items: [{ name: string, description: string, price: number, dietary_tags: string[], popular: boolean, photo_url?: string }] }], chef_specials?: object[] }
```

**Tool 3: `place_order`**
```
Input:  { order_type: "delivery"|"pickup"|"dine_in", items: [{ menu_item: string, quantity: number, modifications?: string[], special_instructions?: string }], delivery_address?: string, customer_name: string, phone: string, tip_percentage?: number }
Output: { order_id: string, items_confirmed: object[], subtotal: number, tax: number, delivery_fee?: number, tip: number, total: number, estimated_ready: datetime, tracking_url?: string }
```

**Tool 4: `check_availability`**
```
Input:  { date: date, time: string, party_size: number }
Output: { available: boolean, alternative_times?: string[], waitlist_available: boolean, estimated_wait?: string, private_dining_available: boolean }
```

**Tool 5: `get_restaurant_info`**
```
Input:  {}
Output: { name: string, cuisine: string[], price_range: "$"|"$$"|"$$$"|"$$$$", hours: object, address: string, phone: string, ambiance: string, dress_code?: string, parking: string, dietary_accommodations: string[], alcohol: boolean, outdoor_seating: boolean, private_events: boolean, average_rating: number, reviews_count: number }
```

#### Fulfillment Routing
- **Reservations:** OpenTable, Resy, or Yelp Reservations API
- **Orders:** Toast, Square, Clover, or direct POS integration
- **Delivery:** DoorDash Drive, Uber Direct, or in-house
- **Fallback:** Phone call automation or email to manager

#### Data Needed from Business
- Full menu with prices, descriptions, dietary tags, and photos
- Hours (including different hours for brunch/lunch/dinner)
- Reservation capacity and policy
- Delivery/pickup availability and radius
- Private event space and pricing
- Dietary accommodations available
- Parking info
- Dress code / ambiance description
- Average wait times by day/time
- Special events calendar

#### Revenue Model
- **Value per agent lead:** $20-100 (per reservation)
  - Regular dinner: $20-40 per reservation
  - Large party/event: $100-500
  - Delivery order: $5-15 commission
- **What businesses would pay:** $2-5 per reservation cover, or $99/mo flat
- **Volume play:** Restaurants get hundreds of reservation-related calls per month

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| Toast | ~30% (POS) | REST API (robust) |
| OpenTable | ~25% (reservations) | Partner API |
| Resy | ~10% (reservations) | Limited API |
| Square (Restaurants) | ~15% | Square API |
| Clover | ~10% | REST API |
| DoorDash | ~35% (delivery) | DoorDash Drive API |
| Uber Eats | ~25% (delivery) | Uber Direct API |

---

### 11. Auto Dealer

**Agent use case:** "Find me a used Honda CR-V under $30K with less than 40,000 miles within 50 miles of 60601. I want AWD and the EX-L trim."

**Why agents will call auto dealers:**
- Inventory search is complex (make, model, year, trim, features, mileage, price)
- Trade-in valuation saves time vs visiting 5 dealers
- Financing pre-qualification without credit pulls
- Test drive scheduling across multiple dealers

#### Top 5 MCP Tools

**Tool 1: `search_inventory`**
```
Input:  { condition: "new"|"used"|"certified", make?: string, model?: string, year_min?: number, year_max?: number, price_max?: number, mileage_max?: number, body_style?: string, drivetrain?: "AWD"|"FWD"|"RWD"|"4WD", color?: string, features?: string[], trim?: string, sort_by: "price"|"mileage"|"year"|"relevance" }
Output: { vehicles: [{ vin: string, year: number, make: string, model: string, trim: string, price: number, mileage: number, color: string, features: string[], photos: string[], carfax_available: boolean, certified: boolean }], total_count: number }
```

**Tool 2: `book_test_drive`**
```
Input:  { vin: string, customer_name: string, phone: string, email: string, preferred_date: date, preferred_time: string, has_trade_in: boolean, trade_in_details?: { year: number, make: string, model: string, mileage: number, condition: string } }
Output: { appointment_id: string, confirmed_datetime: datetime, vehicle_confirmed: string, salesperson: string, estimated_duration: string, documents_to_bring: string[], trade_in_preliminary_value?: number }
```

**Tool 3: `get_trade_in_value`**
```
Input:  { year: number, make: string, model: string, trim: string, mileage: number, condition: "excellent"|"good"|"fair"|"poor", zip_code: string, color?: string, features?: string[] }
Output: { estimated_value: { low: number, mid: number, high: number }, factors: string[], kbb_range: string, market_demand: "high"|"medium"|"low", recommendation: string }
```

**Tool 4: `calculate_financing`**
```
Input:  { vehicle_price: number, down_payment: number, credit_score_range: "excellent"|"good"|"fair"|"poor", trade_in_value?: number, preferred_term_months?: number }
Output: { options: [{ term_months: number, apr: number, monthly_payment: number, total_cost: number, lender: string }], pre_qualification_available: boolean, special_offers: string[] }
```

**Tool 5: `get_vehicle_details`**
```
Input:  { vin: string }
Output: { full_specs: object, carfax_summary: string, service_history: object[], warranty_remaining: object, similar_vehicles: object[], market_price_comparison: string, photos: string[], video_walkaround_url?: string }
```

#### Fulfillment Routing
- **Primary:** DealerSocket, VinSolutions, or DealerCenter (dealer CRMs)
- **Inventory:** vAuto, Dealer.com, or direct DMS feed
- **Trade-in:** KBB API, Edmunds API, or dealer's own tool
- **Financing:** RouteOne or DealerTrack
- **Fallback:** BDC (Business Development Center) email/call

#### Data Needed from Business
- Live inventory feed (VINs, pricing, photos, features)
- Trade-in valuation method/partner
- Financing partners and rate ranges
- Hours and scheduling
- Certify pre-owned program details
- Delivery/shipping options
- Special promotions and incentives
- Sales team info

#### Revenue Model
- **Value per agent lead:** $200-1,000 (average vehicle profit $1,500-3,000)
- **What businesses would pay:** $50-200 per qualified lead
- **Internet lead close rate:** 8-12% (much higher than walk-in tire-kickers)
- **F&I upsell:** Additional $500-2,000 per deal from finance and insurance products

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| DealerSocket | ~20% | REST API |
| VinSolutions (Cox) | ~25% | REST API |
| CDK Global | ~30% (DMS) | Limited API |
| RouteOne | ~40% (financing) | Partner API |
| DealerTrack | ~35% (financing) | Partner API |
| KBB/Autotrader | Discovery | Partner API |
| CarGurus | Discovery | Partner API |

---

### 12. Boutique / Retail Store

**Agent use case:** "I'm looking for a specific Nike Air Max 90 in size 11. Check if the shoe store on Main Street has them in stock."

**Why agents will call retail stores:**
- Inventory checks save wasted trips
- Item reservation before visiting
- Price comparison across local stores
- Gift recommendations with budget constraints
- Store-specific promotions and events

#### Top 5 MCP Tools

**Tool 1: `check_inventory`**
```
Input:  { query: string, category?: string, brand?: string, size?: string, color?: string, price_max?: number }
Output: { items: [{ name: string, brand: string, price: number, in_stock: boolean, sizes_available?: string[], colors_available?: string[], photo_url: string, sku: string }], total_results: number }
```

**Tool 2: `reserve_item`**
```
Input:  { sku: string, size?: string, color?: string, customer_name: string, phone: string, hold_hours: number }
Output: { reservation_id: string, item_name: string, held_until: datetime, pickup_location: string, pickup_instructions: string }
```

**Tool 3: `get_store_info`**
```
Input:  {}
Output: { name: string, address: string, hours: object, phone: string, website: string, categories: string[], brands_carried: string[], services: string[], upcoming_events?: string[], return_policy: string, gift_wrapping: boolean }
```

**Tool 4: `get_recommendations`**
```
Input:  { occasion?: string, recipient?: string, budget: { min: number, max: number }, preferences?: string[], category?: string }
Output: { recommendations: [{ name: string, price: number, why: string, photo_url: string, in_stock: boolean, sku: string }] }
```

**Tool 5: `check_price`**
```
Input:  { sku?: string, query?: string }
Output: { items: [{ name: string, regular_price: number, sale_price?: number, promotion?: string, price_match_available: boolean }] }
```

#### Fulfillment Routing
- **Primary:** Shopify POS, Square POS, or Lightspeed (retail POS systems)
- **Reserve/hold:** POS hold feature or manual hold via email to store
- **Fallback:** SMS/email to store manager with inquiry
- **Shipping:** If ship-from-store is available, integrate with POS

#### Data Needed from Business
- Live inventory feed (ideally from POS system)
- Product catalog with photos, descriptions, categories
- Brands carried
- Hours and location(s)
- Return/exchange policy
- Current promotions
- Special services (alterations, gift wrapping, personal shopping)
- Ship-from-store capability

#### Revenue Model
- **Value per agent lead:** $10-50 (lower ticket but high frequency)
- **What businesses would pay:** $5-15 per qualified lead, or $49/mo flat
- **Reservation conversion:** Items held for customers convert at 80%+
- **Volume play:** Hundreds of inventory check queries per day across catalog

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| Shopify POS | ~30% | Shopify API (excellent) |
| Square POS | ~25% | Square API (excellent) |
| Lightspeed | ~10% | REST API |
| Clover | ~10% | REST API |
| Vend | ~5% | REST API |
| WooCommerce | ~15% (online) | WooCommerce REST API |

---

### 13. SaaS Platform

**Agent use case:** "I need a project management tool that integrates with GitHub, supports time tracking, and costs under $15/user/month. Compare options."

**Why agents will call SaaS platforms:**
- Feature comparison across 100+ SaaS tools in any category
- Pricing calculation for specific team size and needs
- API capability checks for integration requirements
- Trial/account creation programmatically
- Usage analytics and billing inquiries

#### Top 5 MCP Tools

**Tool 1: `get_pricing`**
```
Input:  { team_size?: number, plan_interest?: string, annual_billing?: boolean, features_needed?: string[] }
Output: { plans: [{ name: string, price_per_user_monthly: number, price_total_monthly: number, features: string[], limits: object, trial_days: number, popular: boolean }], custom_enterprise: boolean, free_tier: boolean }
```

**Tool 2: `check_api_capabilities`**
```
Input:  { integration_needed?: string, use_case?: string }
Output: { api_available: boolean, api_type: "REST"|"GraphQL"|"gRPC"|"webhook", auth_method: string, rate_limits: object, sdks: string[], webhooks: boolean, mcp_available: boolean, documentation_url: string, sandbox_available: boolean }
```

**Tool 3: `create_trial_account`**
```
Input:  { email: string, company_name?: string, team_size?: number, use_case?: string }
Output: { account_id: string, trial_expires: date, login_url: string, api_key?: string, onboarding_url: string, features_unlocked: string[] }
```

**Tool 4: `get_usage_stats`**
```
Input:  { account_id: string, period: "current_month"|"last_month"|"last_90_days" }
Output: { usage: object, billing: { current_plan: string, amount_due: number, next_billing_date: date, overage_charges: number }, recommendations: string[] }
```

**Tool 5: `compare_features`**
```
Input:  { features_needed: string[] }
Output: { feature_matrix: [{ feature: string, available: boolean, plan_required: string, notes: string }], missing_features: string[], alternatives_for_missing: string[] }
```

#### Fulfillment Routing
- **Primary:** Direct API integration (most SaaS companies have APIs)
- **Trial creation:** OAuth or API key provisioning
- **Billing:** Stripe, Paddle, or native billing API
- **Support:** Intercom, Zendesk, or HubSpot ticket creation

#### Data Needed from Business
- Plan details with complete feature matrices
- API documentation URL and capabilities
- Integration list
- Trial/demo availability
- Usage limits per plan
- Compliance certifications (SOC2, HIPAA, GDPR)
- Uptime SLA
- Support channels and response times

#### Revenue Model
- **Value per agent lead:** $50-500 (SaaS ACV from $500-50,000)
- **What businesses would pay:** $20-100 per qualified lead, or revenue share on conversions
- **API-driven:** SaaS companies are most willing to pay for agent distribution
- **Marketplace model:** 10-20% revenue share on agent-sourced subscriptions

#### Platform Integrations
| Platform | Notes | Integration Method |
|----------|-------|-------------------|
| Stripe | Billing (80% of SaaS) | Stripe API |
| HubSpot | CRM/Marketing | REST API |
| Intercom | Support | REST API |
| Zapier | Automation | REST API |
| Product Hunt | Discovery | No official API |
| G2 / Capterra | Reviews | Partner API |

---

### 14. Agency / Consultancy

**Agent use case:** "I need a web development agency that specializes in healthcare and can start a project within 2 weeks. Budget is $50-100K."

**Why agents will call agencies:**
- Complex matching (industry + service + budget + timeline + culture fit)
- Portfolio review for relevant past work
- Availability and capacity checking
- Proposal request automation
- Multi-vendor comparison for procurement

#### Top 5 MCP Tools

**Tool 1: `check_availability`**
```
Input:  { project_type: string, estimated_duration_weeks: number, start_date_target: date, budget_range?: { min: number, max: number } }
Output: { available: boolean, earliest_start: date, current_capacity: "full"|"limited"|"available", team_size_available: number, similar_project_timeline: string }
```

**Tool 2: `view_portfolio`**
```
Input:  { industry?: string, service_type?: string, budget_range?: string, technology?: string }
Output: { projects: [{ name: string, industry: string, description: string, services: string[], technologies: string[], results: string, case_study_url?: string, budget_range: string, duration: string, testimonial?: string }], total_projects: number }
```

**Tool 3: `request_proposal`**
```
Input:  { company_name: string, contact_name: string, email: string, phone: string, project_description: string, goals: string[], budget_range: { min: number, max: number }, timeline: string, industry: string, technical_requirements?: string[] }
Output: { proposal_id: string, estimated_response_time: string, next_steps: string[], preliminary_fit: string, questions_for_you: string[] }
```

**Tool 4: `book_discovery_call`**
```
Input:  { contact_name: string, email: string, phone: string, company: string, project_summary: string, preferred_datetime?: datetime, format: "video"|"phone" }
Output: { call_id: string, scheduled_datetime: datetime, meeting_link: string, with_whom: string, duration_minutes: number, preparation_tips: string[] }
```

**Tool 5: `get_services_and_rates`**
```
Input:  { service_category?: string }
Output: { services: [{ name: string, description: string, deliverables: string[], pricing_model: "project"|"retainer"|"hourly"|"value_based", rate_range: string, minimum_engagement: string, typical_duration: string }], industries_served: string[], technologies: string[], team_size: number }
```

#### Fulfillment Routing
- **Primary:** HubSpot, Pipedrive, or Monday.com (agency CRMs)
- **Scheduling:** Calendly, HubSpot meetings, or Cal.com
- **Proposals:** PandaDoc, Proposify, or Better Proposals
- **Fallback:** Email to new-business@agency.com with structured brief

#### Data Needed from Business
- Service catalog with pricing models
- Portfolio with case studies
- Industry specializations
- Team size and key team bios
- Technology stack expertise
- Current availability/capacity
- Minimum engagement size
- Client testimonials
- Awards and certifications
- Process overview (discovery, scoping, execution, support)

#### Revenue Model
- **Value per agent lead:** $500-5,000 (agency projects range $10K-500K+)
- **What businesses would pay:** $100-500 per qualified lead
- **RFP value:** Pre-qualified, budget-confirmed leads are gold
- **Retainer conversions:** One client = $5K-50K/month recurring

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| HubSpot | ~25% | REST API (excellent) |
| Pipedrive | ~15% | REST API |
| Monday.com | ~10% | REST API |
| Calendly | ~40% (scheduling) | REST API |
| PandaDoc | ~20% (proposals) | REST API |
| Clutch.co | Discovery | No API (scrape) |

---

### 15. Creator / Freelancer

**Agent use case:** "I need a freelance video editor who can turn around a 10-minute YouTube video in 48 hours. Budget $500. Show me portfolios."

**Why agents will call freelancers:**
- Availability and turnaround time are the #1 concern
- Portfolio matching for style/quality fit
- Price negotiation and scope definition
- Booking and payment in one transaction
- Review and revision management

#### Top 5 MCP Tools

**Tool 1: `check_availability`**
```
Input:  { project_type: string, deadline: date, estimated_hours?: number }
Output: { available: boolean, earliest_start: date, turnaround_time: string, current_workload: "light"|"moderate"|"heavy", rush_fee_applicable: boolean, rush_fee_percentage?: number }
```

**Tool 2: `get_portfolio`**
```
Input:  { service_type?: string, style?: string, industry?: string }
Output: { works: [{ title: string, description: string, url: string, thumbnail_url: string, service_type: string, client?: string, date: date }], total_works: number, specializations: string[] }
```

**Tool 3: `get_quote`**
```
Input:  { service_type: string, description: string, deliverables: string[], deadline: date, revisions_needed?: number, reference_urls?: string[] }
Output: { quote: number, breakdown: [{ item: string, price: number }], timeline: string, revisions_included: number, payment_terms: string, deposit_required: number }
```

**Tool 4: `book_service`**
```
Input:  { client_name: string, email: string, service_type: string, description: string, deliverables: string[], deadline: date, agreed_price: number, payment_method: string }
Output: { project_id: string, contract_url: string, invoice_url: string, communication_channel: string, milestone_schedule: object[], deposit_amount: number }
```

**Tool 5: `get_reviews`**
```
Input:  { service_type?: string }
Output: { average_rating: number, total_reviews: number, reviews: [{ client: string, rating: number, review: string, service_type: string, date: date, project_budget: string }], on_time_percentage: number, response_time_avg: string }
```

#### Fulfillment Routing
- **Primary:** Direct booking (no platform intermediary)
- **Contracts:** HelloSign, PandaDoc, or Bonsai
- **Invoicing:** Stripe, PayPal, Wave, or Bonsai
- **Communication:** Direct email/Slack/Discord
- **Portfolio:** Personal website, Behance, Dribbble, YouTube

#### Data Needed from Business
- Service types with pricing (hourly, project, package)
- Portfolio with categorized work
- Availability calendar
- Turnaround time by project type
- Revision policy
- Communication preferences
- Payment terms
- Reviews/testimonials
- Tools/software used
- Specializations and style descriptions

#### Revenue Model
- **Value per agent lead:** $50-500 (freelance projects range $200-10,000+)
- **What businesses would pay:** $10-50 per qualified lead, or 5-10% platform fee
- **Volume play:** Millions of freelancers, massive long tail
- **Repeat clients:** One good match = years of repeat work

#### Platform Integrations
| Platform | Market Share | Integration Method |
|----------|-------------|-------------------|
| Bonsai | ~10% (freelance mgmt) | REST API |
| HoneyBook | ~10% | REST API |
| Calendly | Scheduling | REST API |
| Stripe | Payments | Stripe API |
| Upwork | Discovery | No agent API |
| Fiverr | Discovery | No agent API |

---

## Cross-Vertical Analysis

### Template Complexity Ranking (Easiest to Hardest)

| Rank | Vertical | Custom Fields | Complexity | Why |
|------|----------|--------------|------------|-----|
| 1 | Cleaning Service | 5-8 | LOW | Pricing is formulaic (sqft x type). Few edge cases. |
| 2 | Lawn Care | 6-9 | LOW | Similar to cleaning. Seasonal twist but predictable. |
| 3 | Restaurant | 6-10 | LOW-MED | Menu is structured data. Reservations are standardized. |
| 4 | Boutique/Retail | 5-8 | LOW-MED | Inventory check is binary. POS integration well-solved. |
| 5 | Creator/Freelancer | 8-12 | MEDIUM | Portfolio is unstructured. Pricing varies wildly. |
| 6 | HVAC | 8-12 | MEDIUM | Emergency routing adds complexity. Service area zoning. |
| 7 | Plumbing | 8-12 | MEDIUM | Same as HVAC. Emergency dispatch is the hard part. |
| 8 | Dentist/Medical | 10-15 | MEDIUM-HIGH | Insurance verification. HIPAA compliance. Complex scheduling. |
| 9 | Accounting/CPA | 10-15 | MEDIUM-HIGH | Diverse service types. Deadline awareness. Entity matching. |
| 10 | Agency/Consultancy | 12-18 | MEDIUM-HIGH | Unstructured portfolios. Complex matching criteria. |
| 11 | Roofing | 10-15 | HIGH | Insurance coordination. Weather event triggers. Long sales cycles. |
| 12 | Auto Dealer | 15-25 | HIGH | Massive inventory schemas. Trade-in valuation. Financing calc. |
| 13 | Real Estate | 20-30 | HIGH | MLS data complexity. Multi-showing scheduling. Market analysis. |
| 14 | Law Firm | 15-25 | HIGH | Practice area matching. Conflict checks. Ethical rules vary by state. |
| 15 | SaaS Platform | 10-20 | HIGH | Every SaaS is different. Feature matrices are complex. API integration varies. |

### Value Per Agent Call (Highest to Lowest)

| Rank | Vertical | Value/Lead | Emergency Mult. | Why |
|------|----------|-----------|-----------------|-----|
| 1 | Real Estate | $500-5,000 | N/A | 3% of $400K = $12K commission |
| 2 | Roofing | $500-2,000 | 5x (storm) | Full roof = $8-15K |
| 3 | Law Firm | $200-5,000 | 2x (criminal) | PI contingency = $50K-500K |
| 4 | Auto Dealer | $200-1,000 | N/A | Vehicle profit $1.5-3K |
| 5 | Agency/Consultancy | $500-5,000 | N/A | Projects $10K-500K |
| 6 | Plumbing | $200-800 | 3x (emergency) | Panicked homeowner, high conversion |
| 7 | HVAC | $150-500 | 3x (emergency) | Same panic dynamic |
| 8 | Dentist/Medical | $200-800 | 1.5x (emergency) | New patient LTV $1-5K |
| 9 | Accounting/CPA | $100-1,000 | 2x (IRS notice) | Long retention (7+ years) |
| 10 | SaaS Platform | $50-500 | N/A | ACV $500-50K |
| 11 | Cleaning Service | $50-200 | N/A | Recurring LTV is the real value |
| 12 | Creator/Freelancer | $50-500 | N/A | Wide range by project |
| 13 | Lawn Care | $30-80 | N/A | Low ticket but high LTV |
| 14 | Restaurant | $20-100 | N/A | Volume play, not per-lead |
| 15 | Boutique/Retail | $10-50 | N/A | Low margin, high frequency |

### Adoption Likelihood (First to Adopt Agent Tech)

| Tier | Verticals | Why |
|------|-----------|-----|
| **Tier 1: Already ready** | SaaS Platform, Agency/Consultancy | Already API-first. Developer-minded. |
| **Tier 2: Eager early adopters** | Restaurant, Auto Dealer, Real Estate | Tech-forward. Already using platforms with APIs. OpenTable, DealerSocket, etc. |
| **Tier 3: Willing if easy** | Cleaning, Lawn Care, Creator/Freelancer | Use Jobber/Square/etc. Need one-click setup. |
| **Tier 4: Need convincing** | HVAC, Plumbing, Roofing, Dentist | Use ServiceTitan/Dentrix but not tech-enthusiastic. ROI-driven. |
| **Tier 5: Hardest sell** | Law Firm, Accounting/CPA | Risk-averse, compliance-heavy, slow to change. |

---

## Prioritization Matrix

**Combining: ease of templating, value per lead, and adoption likelihood.**

### Phase 1 Launch Verticals (Build First)

| Priority | Vertical | Why |
|----------|----------|-----|
| **P0** | Cleaning Service | Easiest template. Formulaic pricing. Huge market (1M+ businesses). Proves the model. |
| **P0** | Restaurant | OpenTable/Toast integrations exist. Massive volume. Universal use case. |
| **P1** | HVAC / Plumbing | Emergency use case = highest conversion rate. Homeowner in crisis = pays anything. Grouped because template is nearly identical. |
| **P1** | Lawn Care | Same template pattern as cleaning but outdoor services. Seasons add a wrinkle. |

### Phase 2 Expansion Verticals

| Priority | Vertical | Why |
|----------|----------|-----|
| **P2** | Dentist/Medical | Insurance verification alone is worth the template. High lead value. |
| **P2** | Roofing | Storm damage events = gold rush. Extremely high value per lead. |
| **P2** | Auto Dealer | Complex but massive TAM. Inventory search is killer use case. |
| **P2** | Boutique/Retail | Easy template. Shopify/Square integration = already have inventory APIs. |

### Phase 3 Advanced Verticals

| Priority | Vertical | Why |
|----------|----------|-----|
| **P3** | Real Estate | Highest value but MLS integration is complex. Regulatory hurdles. |
| **P3** | Agency/Consultancy | High value, but unstructured portfolios are hard to template. |
| **P3** | SaaS Platform | Each SaaS is unique. Better as partnerships than templates. |
| **P3** | Law Firm | Compliance complexity (varies by state). But the lead value justifies it. |
| **P3** | Accounting/CPA | Seasonal demand. Deadline awareness. Entity matching. |
| **P3** | Creator/Freelancer | Massive long tail but low per-transaction value. Platform play. |

---

## Template Architecture

### How the Template System Should Work

```
Business signs up → selects vertical → fills template form → AgentHermes generates:

1. MCP Server Definition (JSON)
   - 3 universal tools (get_info, get_services, check_availability)
   - 2-5 vertical-specific tools (from the research above)
   - Input/output schemas pre-defined per vertical

2. Agent Card (/.well-known/agent-card.json)
   - Pre-populated with vertical-appropriate skills
   - Service area, hours, capabilities

3. llms.txt
   - Business description optimized for LLM consumption
   - Services, pricing, hours in structured natural language

4. Fulfillment Router Config
   - Maps each MCP tool to a fulfillment target
   - Priority: native API > webhook > email > SMS
   - Fallback chain for reliability
```

### Minimum Viable Template (All Verticals)

Every business template needs exactly these fields:

```json
{
  "vertical": "string (from enum)",
  "business_name": "string",
  "business_description": "string (2-3 sentences)",
  "services": [{
    "name": "string",
    "description": "string",
    "price": "string (range or exact)",
    "duration": "string"
  }],
  "hours": {
    "monday": "9:00-17:00",
    "tuesday": "9:00-17:00",
    "...": "..."
  },
  "service_area": {
    "type": "radius|zip_list|city|nationwide|remote",
    "value": "string or string[]"
  },
  "contact": {
    "phone": "string",
    "email": "string",
    "address": "string"
  },
  "booking": {
    "method": "calendly|url|phone|email|api",
    "url": "string",
    "accepts_online": "boolean"
  },
  "payment": {
    "methods": ["credit_card", "cash", "check", "financing"],
    "accepts_online_payment": "boolean"
  }
}
```

This is 8 fields. The vertical-specific overlay adds 3-15 more fields depending on complexity.

### Vertical Template Overlays

| Vertical | Additional Fields | Key Differentiator |
|----------|------------------|-------------------|
| Cleaning | sqft_pricing_formula, add_ons, recurring_discounts | Price calculator |
| Restaurant | menu_url or menu_data, reservation_system, cuisines, dietary | Menu + reservation |
| HVAC/Plumbing | emergency_available, diagnostic_fee, after_hours_rate, certifications | Emergency dispatch |
| Lawn Care | lot_size_range, seasonal_services, equipment_capabilities | Seasonal pricing |
| Roofing | free_inspection, insurance_assistance, roof_types, warranties | Insurance coordination |
| Dentist/Medical | insurance_accepted[], new_patient_process, emergency_hours, providers[] | Insurance check |
| Real Estate | mls_feed, areas_served[], specializations, license_number | Listing search |
| Auto Dealer | inventory_feed_url, financing_partners, trade_in_method | Inventory search |
| Law Firm | practice_areas[], fee_structures{}, jurisdictions, free_consultation | Practice matching |
| Accounting | entity_types[], tax_season_hours, certifications, software_used | Deadline awareness |
| Boutique/Retail | pos_system, inventory_feed, brands[], categories[] | Inventory check |
| SaaS | api_docs_url, plans[], integrations[], compliance[] | Feature comparison |
| Agency | portfolio[], industries[], team_size, min_engagement | Portfolio matching |
| Creator | portfolio_url, turnaround_times{}, tools_used[], style | Availability + portfolio |

---

## Key Strategic Insights

### 1. Emergency Services Are the Wedge
Plumbing, HVAC, and roofing (storm damage) have the highest conversion rates because the human is in crisis. An agent that can dispatch a plumber in 30 minutes is worth $200+ to that business. Build emergency dispatch first, then expand to routine services.

### 2. Cleaning and Lawn Care Prove the Template Model
These are the simplest verticals with formulaic pricing. If you can template a cleaning service in under 5 minutes, you've proven the "make any business agent-ready in 60 seconds" thesis. Start here for volume.

### 3. Insurance Verification Is a Killer Feature
For dental/medical, the #1 friction point is "do you take my insurance?" An agent that can answer this instantly is worth the entire template. This single tool could be a standalone product.

### 4. Restaurants Are Volume, Not Value
Each restaurant lead is worth $20-40, but there are 1M+ restaurants in the US and every one of them gets dozens of "are you open?" and "do you have vegetarian options?" calls per day. Volume play, not value play.

### 5. Real Estate and Auto Are Data-Heavy but Defensible
If AgentHermes can integrate with MLS feeds and dealer inventory systems, the data moat is enormous. These are the hardest verticals to template but the most defensible once built.

### 6. SaaS Companies Will Self-Serve
SaaS platforms already have APIs and developer teams. They do not need hand-holding. Build the self-serve template and they will come to us. This vertical is partnership-driven, not template-driven.

### 7. The Fulfillment Layer Is the Real Product
The MCP tools and agent cards are table stakes. The real value is the fulfillment router that connects the agent's intent to the business's existing systems (ServiceTitan, Toast, Dentrix, etc.). Whoever owns the fulfillment layer owns the market.

### 8. Vertical Bundles Beat Individual Templates
Homeowners need HVAC + Plumbing + Roofing + Cleaning + Lawn Care. Property managers need all of those plus Pest Control. Bundle verticals by buyer persona, not by service type.

---

## Next Steps

1. **Build the universal template form** (8 core fields) with vertical selector
2. **Build the cleaning service template** (simplest vertical, proving ground)
3. **Build the emergency services template** (HVAC + Plumbing, highest value)
4. **Build the restaurant template** (highest volume, most visible)
5. **Build the fulfillment router** (maps MCP tool calls to ServiceTitan/Toast/Jobber/etc.)
6. **Test with real businesses** from GoliathRoofing (roofing) and PureUSPeptide (retail/e-commerce) as internal guinea pigs
7. **Publish vertical-specific landing pages** (/for/hvac, /for/restaurants, /for/dentists) with the value proposition tailored to each vertical
