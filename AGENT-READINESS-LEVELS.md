# Agent Readiness Levels (ARL) -- The Unified Framework

> The definitive guide to what "agent-ready" means for every business type.
> Created: 2026-03-30 | Author: AgentHermes Research
> Companion to: VERTICAL-TAXONOMY.md, VERTICAL-RESEARCH.md, A2A-DEEP-DIVE.md

---

## Why This Document Exists

Every business will eventually need to answer one question: **"Can an AI agent do business with you on behalf of a human?"**

The answer is not binary. There is a spectrum from "completely invisible to agents" to "agents can autonomously discover, evaluate, transact, and even negotiate with your business." This document defines that spectrum -- not as an abstract theory, but as a practical framework with specific, actionable criteria for every business vertical.

The Agent Readiness Level (ARL) framework is designed to be:
- **Universal** -- same level names and numbers across all verticals
- **Specific** -- different concrete meaning per vertical
- **Progressive** -- clear path from one level to the next
- **Actionable** -- a business knows exactly what to build to reach the next level

---

## The Universal Framework: 7 Agent Readiness Levels

| Level | Name | One-Line Definition |
|-------|------|-------------------|
| **ARL-0** | Dark | Business exists but is invisible to agents. No structured data, no APIs, no machine-readable presence. |
| **ARL-1** | Discoverable | An agent can find the business and understand what it does. Structured data, machine-readable descriptions, basic schema markup. |
| **ARL-2** | Readable | An agent can read the business's offerings, pricing, availability, and policies in structured formats. |
| **ARL-3** | Bookable | An agent can initiate a transaction -- book, order, apply, or request service -- on behalf of a human. |
| **ARL-4** | Transactable | An agent can complete the full transaction cycle: pay, receive confirmation, track status, handle modifications. |
| **ARL-5** | Autonomous | An agent can manage the ongoing relationship: reorder, renew, escalate issues, negotiate terms, handle returns/cancellations without human intervention on either side. |
| **ARL-6** | Interoperable | Agent-to-agent communication. The business's own agents can negotiate, coordinate, and transact with customer agents via standardized protocols (A2A, MCP). Full programmatic autonomy. |

### The Key Insight

**The levels are cumulative.** ARL-4 includes everything in ARL-0 through ARL-3. You cannot be Transactable if you are not first Discoverable, Readable, and Bookable.

### Visual Progression

```
ARL-0  [Dark]          -- "We exist, but agents don't know it"
  |
ARL-1  [Discoverable]  -- "Agents can FIND us"
  |
ARL-2  [Readable]      -- "Agents can UNDERSTAND us"
  |
ARL-3  [Bookable]      -- "Agents can START a transaction"
  |
ARL-4  [Transactable]  -- "Agents can COMPLETE a transaction"
  |
ARL-5  [Autonomous]    -- "Agents can MANAGE the relationship"
  |
ARL-6  [Interoperable] -- "Our agents TALK TO their agents"
```

---

## Universal Criteria (Apply to ALL Verticals)

### ARL-0: Dark
- Business has a website (or not even that)
- No structured data beyond basic HTML
- No schema markup, no machine-readable service descriptions
- Contact only via phone or unstructured web forms
- **What this looks like:** A plumber with a brochure website. A law firm with a PDF of attorneys. A restaurant with a menu as a JPG.

### ARL-1: Discoverable
- Schema.org markup (LocalBusiness, Product, Service, Organization, etc.)
- Google Business Profile with structured data
- `llms.txt` or `agent-hermes.json` at root describing the business
- Business appears in structured directories with consistent NAP (Name, Address, Phone)
- Machine-readable hours, service area, and contact information
- **Minimum file:** `/.well-known/agent-card.json` OR `llms.txt` OR rich schema.org markup
- **AgentHermes Score Equivalent:** D1 (Discoverability) passes

### ARL-2: Readable
- Everything in ARL-1, plus:
- Structured service catalog or product feed (JSON, XML, or API endpoint)
- Machine-readable pricing (exact or ranges)
- Real-time or near-real-time availability data
- Reviews/ratings in structured format
- Policies (cancellation, returns, warranties) in machine-readable format
- **Minimum capability:** An agent can answer "What do they offer, what does it cost, and are they available?" without scraping HTML
- **AgentHermes Score Equivalent:** D4 (Pricing) + D6 (Data Quality) pass

### ARL-3: Bookable
- Everything in ARL-2, plus:
- API endpoint or form-based flow for initiating transactions
- Appointment booking, order placement, application submission, or quote request via API
- Structured input/output (the agent knows what data to submit and what to expect back)
- Confirmation mechanism (ID, email, webhook)
- **Minimum capability:** An agent can submit a booking/order/request and receive a confirmation
- **AgentHermes Score Equivalent:** D2 (API/Interoperability) + D3 (Onboarding) pass

### ARL-4: Transactable
- Everything in ARL-3, plus:
- Programmatic payment acceptance (Stripe, Square, or equivalent API)
- Order/booking status tracking via API
- Modification capabilities (reschedule, change order, upgrade)
- Cancellation and refund flow via API
- Receipts and invoices in structured format
- Webhooks or polling for status changes
- **Minimum capability:** An agent can pay, track, modify, and cancel -- the full transaction lifecycle
- **AgentHermes Score Equivalent:** D5 (Payment) + D7 (Security) + D8 (Reliability) pass

### ARL-5: Autonomous
- Everything in ARL-4, plus:
- Recurring transaction management (subscriptions, repeat orders, maintenance schedules)
- Automated escalation paths (agent detects issue, routes to human if needed)
- Preference learning (the business system adapts to agent/customer patterns)
- Proactive notifications (stock alerts, appointment reminders, renewal warnings)
- Dispute resolution flow via API
- SLA commitments (response times, uptime guarantees) with monitoring
- **Minimum capability:** An agent can manage the ongoing relationship without human intervention on either side for routine operations
- **AgentHermes Score Equivalent:** D9 (Agent Experience) passes at high level

### ARL-6: Interoperable
- Everything in ARL-5, plus:
- A2A protocol support (agent-card.json with skills, A2A task lifecycle)
- MCP server exposing business capabilities as tools
- Agent-to-agent negotiation (price, terms, scheduling)
- Multi-agent workflow support (one agent coordinates with multiple business agents)
- Programmatic credential exchange (OAuth2 agent flows, delegated authorization)
- The business operates its OWN agent that can negotiate, counter-offer, and close deals
- **Minimum capability:** A customer's agent and the business's agent can complete an entire transaction through structured agent-to-agent communication
- **AgentHermes Score Equivalent:** Agent-Native Bonus at maximum + all dimensions pass

---

## What Crosses Over: Universal Truths Across ALL Verticals

### 1. Level 1 is ALWAYS About Being Findable

No matter the vertical -- plumber, hedge fund, university, car dealer -- the first step is identical: structured, machine-readable presence. This is the "SEO moment" of the agent economy. Every business that ignores it will become invisible the same way businesses that ignored Google in 2005 became invisible.

**Universal ARL-1 checklist (same for every vertical):**
- [ ] Schema.org markup on website
- [ ] `llms.txt` or `agent-hermes.json` published
- [ ] Google Business Profile with structured data
- [ ] Business listed in at least one structured directory/registry
- [ ] Service/product descriptions in machine-readable format

### 2. Level 6 ALWAYS Involves Agent-to-Agent Communication

The ceiling is the same everywhere: the business deploys its own AI agent that can negotiate, transact, and coordinate with customer agents. The specifics differ (a hotel agent negotiates room rates; a law firm agent checks conflicts and schedules consultations; an auto dealer agent handles trade-in valuations), but the protocol layer (A2A + MCP) is universal.

### 3. The "Bookable" Threshold (ARL-3) is the Revenue Inflection Point

For AgentHermes and for businesses themselves, ARL-3 is where value is created. Below ARL-3, an agent can only gather information. At ARL-3 and above, an agent can transact. This is the monetizable threshold across every vertical.

### 4. Seven Universal MCP Tool Patterns Appear in Every Vertical

These patterns recur in 100% of analyzed verticals:

| Pattern | What It Does | Prevalence |
|---------|-------------|------------|
| **SEARCH / DISCOVER** | Find businesses, products, providers, availability | 100% |
| **GET QUOTE / ESTIMATE** | Pre-commitment pricing for the specific request | 58% |
| **BOOK / RESERVE / ORDER** | Initiate the transaction | 83% |
| **CHECK STATUS / TRACK** | Follow up on an active transaction | 75% |
| **COMPARE** | Decision-support across options | 67% |
| **MANAGE / MODIFY** | Change, cancel, reschedule existing transactions | 75% |
| **VERIFY / VALIDATE** | Trust, compliance, credential checks | 42% (concentrated in regulated industries) |

### 5. Three Universal Data Requirements

Every business at ARL-2+ needs these three data sets in machine-readable format, regardless of vertical:

1. **What they offer** -- Services, products, or capabilities with descriptions
2. **What it costs** -- Pricing, fee structures, or quote mechanisms
3. **When/where they are available** -- Hours, service areas, capacity, or inventory levels

### 6. Trust Escalation is Universal

Every vertical has a trust gradient. The pattern is always:
- ARL-1/2: Public information only (no PII exchanged)
- ARL-3: Customer shares basic info (name, contact, preferences)
- ARL-4: Customer shares payment information (credit card, bank account)
- ARL-5: Customer delegates ongoing authority (auto-renew, auto-reorder, manage account)
- ARL-6: Business and customer agents exchange credentials and negotiate on behalf of principals

### 7. Error Handling Maturity Follows the Levels

| Level | Error Handling |
|-------|---------------|
| ARL-0/1 | No error handling (human figures it out) |
| ARL-2 | Structured error messages ("service not available in your area") |
| ARL-3 | Actionable error recovery ("slot unavailable, here are alternatives") |
| ARL-4 | Transactional error handling (rollbacks, retry logic, partial refunds) |
| ARL-5 | Predictive error prevention (alert before subscription lapses, flag potential issues) |
| ARL-6 | Agent-negotiated error resolution (agents agree on resolution without human involvement) |

---

## What is UNIQUE to Specific Verticals

### Regulatory Uniqueness

| Constraint | Verticals Affected | Impact on ARL Progression |
|-----------|-------------------|--------------------------|
| **HIPAA** | Healthcare (all sub-verticals) | ARL-3+ requires BAA, encrypted data at rest/transit, audit trails, minimum necessary standard. Adds 3-6 months to each level. |
| **KYC/AML** | Finance (banking, lending, investment), Insurance | ARL-3+ requires identity verification before any transaction. Agent must prove it acts with user consent. |
| **FERPA** | Education (K-12, Higher Ed) | ARL-2+ restricts what student data an agent can access. Parental consent required for minors. |
| **State Licensing** | Law, Accounting, Real Estate, Healthcare | ARL-2+ must verify professional credentials. Agent cannot provide advice (unauthorized practice). |
| **PCI-DSS** | Any vertical with card payments | ARL-4+ payment flow must be compliant. Not unique to one vertical but strictness varies. |
| **Fair Housing** | Real Estate | ARL-1+ must not discriminate in search/recommendations. Agent algorithms must be auditable. |
| **Fiduciary Duty** | Finance (investment, insurance advice) | ARL-5+ agent recommendations must meet fiduciary standard. Creates liability question. |
| **Emergency Dispatch** | Home services (HVAC, plumbing), Healthcare | ARL-3+ must have emergency escalation paths. Cannot fail silently when life/property at risk. |
| **Lemon Laws / FTC** | Automotive | ARL-4+ must comply with disclosure requirements (accident history, odometer, as-is vs warranty). |

### Structural Uniqueness

| Unique Characteristic | Verticals | Why It Matters |
|----------------------|-----------|---------------|
| **High-value single transaction** | Automotive, Real Estate, Higher Ed | ARL-5/6 must handle negotiation, financing, and multi-step closing processes |
| **Recurring relationship** | Beauty/Wellness, Lawn Care, Cleaning, Insurance | ARL-5 is where the real value is -- managing the ongoing schedule/policy |
| **Time-critical emergency** | HVAC, Plumbing, Healthcare | ARL-3 must include urgency triage and sub-hour response capability |
| **Expertise matching** | Law, Accounting, Healthcare, Consulting | ARL-2 must include credentialed provider matching, not just availability |
| **Dynamic pricing** | Travel, Events, E-Commerce (flash sales) | ARL-2/3 must handle price volatility -- what the agent reads may change by the time it books |
| **Physical inspection required** | Automotive (test drive), Real Estate (showing) | ARL-3 cannot skip the in-person step; agent facilitates scheduling, not the inspection itself |
| **Confidentiality** | Law, Healthcare, Finance | ARL-3+ requires encrypted channels and data minimization -- agent cannot store or log sensitive details |
| **Inventory perishability** | Travel (flights, hotels), Events (tickets), Grocery | ARL-3/4 must handle race conditions -- agent books while inventory vanishes |

---

## Vertical Breakdowns

Each vertical below shows what each ARL level specifically means in that context, what the business must build to reach it, and estimated effort.

---

### 1. E-Commerce / Retail

**Agent progression:** browse --> search --> compare --> purchase --> track --> return

**Market:** ~2.1M US e-commerce businesses, $1.1T annual sales
**Current average ARL:** 2.5 (platforms are ARL-3+, individual stores are ARL-1)

| Level | What It Means for E-Commerce | What to Build | Effort |
|-------|------------------------------|---------------|--------|
| **ARL-0** | Store exists but products are images/PDFs. No structured product data. | Nothing yet. | -- |
| **ARL-1** | Product schema markup (Product, Offer). Store appears in Google Shopping. `llms.txt` with catalog summary. | Schema.org Product markup, Google Merchant Center, llms.txt | 1 week |
| **ARL-2** | Full product feed (JSON/XML) with real-time inventory, pricing, reviews, shipping options. Product comparison possible. | Structured product feed API or Shopify/WooCommerce REST API enabled. Inventory sync. | 2-4 weeks |
| **ARL-3** | Agent can add to cart and initiate checkout. Cart API with product selection, quantity, shipping address. | Storefront API or checkout API. Cart creation endpoint. Guest checkout support. | 2-4 weeks |
| **ARL-4** | Agent can complete purchase with payment, receive order confirmation, track shipping, initiate returns. | Payment API (Stripe/Square), order status API, tracking webhooks, return/refund API. | 1-2 months |
| **ARL-5** | Agent manages subscriptions, auto-reorders, monitors price drops, handles loyalty points, negotiates bundle discounts. | Subscription management API, price alert webhooks, loyalty integration, saved preferences. | 2-3 months |
| **ARL-6** | Store's agent negotiates with customer's agent: offers personalized bundles, dynamic pricing, wholesale terms. A2A protocol. | Deploy store-side AI agent with MCP server. A2A agent card. Negotiation logic. Dynamic pricing API. | 6+ months |

**Unique to e-commerce:**
- Inventory perishability (flash sales, limited stock)
- Shipping complexity (rates, tracking, multi-carrier)
- Return/exchange policies vary wildly
- Review/rating ecosystem (agent must weigh authenticity)
- Platform fragmentation (Shopify vs WooCommerce vs custom -- AgentHermes adapters solve this)

**ARL-3 killer feature:** `search_products` + `place_order` -- the moment an agent can buy, everything changes.

---

### 2. Professional Services (Law, Accounting, Consulting)

**Agent progression:** find --> qualify --> book consultation --> share documents --> get advice

**Market:** ~1.5M law firms + ~500K accounting firms + ~700K consulting firms in the US
**Current average ARL:** 1.0 (most are brochure websites with phone numbers)

| Level | What It Means for Professional Services | What to Build | Effort |
|-------|----------------------------------------|---------------|--------|
| **ARL-0** | Firm has website listing attorneys/CPAs. Contact is "call us." No structured data about practice areas or specialties. | Nothing yet. | -- |
| **ARL-1** | Structured data: practice areas, attorney credentials, bar numbers, specialties, fee structure types (hourly/contingency/flat), jurisdictions served. `llms.txt` with firm capabilities. | Schema.org ProfessionalService + Attorney markup. Structured practice area taxonomy. llms.txt. | 1-2 weeks |
| **ARL-2** | Agent can read: specific services with fee ranges, attorney profiles with verified credentials, free consultation availability, case evaluation criteria, client testimonials. | Structured service catalog API. Credential verification endpoint. Fee structure API. | 2-4 weeks |
| **ARL-3** | Agent can book a consultation (checking for conflicts), submit intake forms, request a case evaluation, send a quote request. Conflict-of-interest check before booking. | Intake API (Clio/Lawmatics integration). Consultation booking with conflict check. Structured intake form submission. | 1-2 months |
| **ARL-4** | Agent can pay retainer or consultation fee, receive engagement letter, share documents securely, track case/engagement status, receive invoices. | Payment API (LawPay), secure document upload, case status tracking, invoice API, engagement letter workflow. | 2-3 months |
| **ARL-5** | Agent manages the ongoing engagement: monitors deadlines, requests status updates, reviews and approves invoices, flags scope changes, handles routine communications. | Deadline monitoring API, auto-invoice review, document management integration, communication API with structured updates. | 3-6 months |
| **ARL-6** | Firm's agent handles intake, runs conflict checks, matches the right attorney, negotiates scope/fees, and coordinates with client's agent. Multi-firm coordination for complex matters. | Deploy firm-side AI agent. A2A agent card with legal skills. Automated conflict resolution. Multi-party coordination protocol. | 6+ months |

**Unique to professional services:**
- **Confidentiality is non-negotiable.** ARL-3+ requires encrypted channels and the agent cannot log or store sensitive case details. Attorney-client privilege must be preserved.
- **Expertise matching is complex.** A "lawyer" is not fungible. The agent must match practice area, jurisdiction, fee structure, and experience level. Wrong match = malpractice risk.
- **Conflict-of-interest checks** must happen BEFORE booking. This is a legal requirement, not a nice-to-have. The system must check opposing parties before confirming any consultation.
- **State-by-state licensing.** An attorney licensed in Florida cannot practice in New York. The agent must verify jurisdiction matching.
- **Fee structure variety.** Contingency (PI), hourly (corporate), flat fee (estate planning), retainer (general counsel), hybrid -- the agent must understand and compare different models.
- **Unauthorized practice of law (UPL).** The agent cannot give legal advice. It can match, schedule, and facilitate -- but the line between "information" and "advice" is legally defined and varies by state.

**ARL-3 killer feature:** `book_consultation` with automatic conflict check and practice area matching.

---

### 3. Finance / Insurance

**Agent progression:** get quote --> compare --> apply --> manage policy/account

**Market:** ~500K financial services companies, $4.8T US industry revenue
**Current average ARL:** 1.5 (fintechs are ARL-3+, traditional institutions are ARL-0)

| Level | What It Means for Finance/Insurance | What to Build | Effort |
|-------|-------------------------------------|---------------|--------|
| **ARL-0** | Institution has website with product descriptions. "Call for rates." No structured rate data or application flow. | Nothing yet. | -- |
| **ARL-1** | Structured product data: account types, rate ranges, eligibility criteria, coverage types. Schema.org FinancialProduct markup. | Schema.org FinancialProduct/InsuranceProduct. Structured product catalog. Rate ranges published as structured data. | 1-2 weeks |
| **ARL-2** | Agent can read: real-time rates (mortgage, savings, insurance premiums), eligibility pre-screeners, product comparison data, coverage details, fee schedules. | Rate feed API. Eligibility calculator endpoint. Product comparison API. Fee disclosure API. | 2-4 weeks |
| **ARL-3** | Agent can request a quote, submit a pre-qualification, start an application, upload supporting documents. KYC identity verification step included. | Quote API. Pre-qualification endpoint with soft pull. Application submission API. Document upload. KYC integration (Plaid/Socure). | 2-4 months |
| **ARL-4** | Agent can complete application, bind insurance policy, fund account, accept loan terms, make payments. Full compliance audit trail. | E-signature integration. Policy binding API. Funding/payment API. Compliance event logging. Regulatory disclosure delivery. | 3-6 months |
| **ARL-5** | Agent manages policies/accounts: auto-pays premiums, monitors rate changes, initiates refinancing when beneficial, files claims, handles renewals, rebalances portfolios. | Account management API. Auto-payment scheduling. Rate monitoring webhooks. Claims filing API. Portfolio rebalancing with tax optimization. | 6-12 months |
| **ARL-6** | Bank/insurer's agent negotiates with customer's agent: counter-offers on rates, customizes coverage packages, coordinates multi-institution transfers, handles complex financial planning. | Deploy institution-side AI agent. A2A negotiation protocol. Multi-party transaction coordination. Regulatory-compliant agent-to-agent audit trail. | 12+ months |

**Unique to finance/insurance:**
- **KYC/AML is mandatory.** ARL-3+ requires identity verification before any transaction. The agent must prove it has the user's explicit consent and verified identity. No exceptions.
- **Fiduciary duty.** In investment management and insurance advice, recommendations must meet fiduciary standards. An agent making portfolio changes or policy recommendations carries legal liability.
- **Regulatory complexity is extreme.** Banking (OCC, FDIC, CFPB), insurance (state regulators x 50), securities (SEC, FINRA), lending (TILA, RESPA, state usury laws). Each adds compliance requirements to every ARL level.
- **Risk assessment is core.** Unlike most verticals where the transaction is straightforward, financial products require underwriting (insurance), credit evaluation (lending), or suitability analysis (investment). The agent must participate in this assessment.
- **Multi-step applications.** A mortgage application is not a single form -- it is a weeks-long process with appraisals, inspections, underwriting conditions, and closing coordination. ARL-3/4 must handle this lifecycle.
- **Consent and audit trails.** Every agent action must be logged, attributable, and auditable. Regulators will eventually examine agent-initiated financial transactions.

**ARL-3 killer feature:** `get_quote` + `compare_plans` -- the moment an agent can get real quotes and compare them across providers, the value proposition is enormous.

---

### 4. Travel / Hospitality

**Agent progression:** search --> compare --> book --> modify --> check-in

**Market:** ~750K travel/hospitality businesses, $1.1T US travel industry
**Current average ARL:** 3.0 (most agent-ready non-tech vertical due to decades of GDS infrastructure)

| Level | What It Means for Travel | What to Build | Effort |
|-------|--------------------------|---------------|--------|
| **ARL-0** | Property/operator has a website with photos. "Call to book" or email only. | Nothing yet. | -- |
| **ARL-1** | Schema.org LodgingBusiness/TouristAttraction. Listed on OTAs with structured data. `llms.txt` with property details. | Schema.org markup. OTA listings with complete data. Structured amenity/feature lists. | 1 week |
| **ARL-2** | Agent can read: real-time availability, room types with rates, cancellation policies, loyalty program details, location-aware search results. Dynamic pricing visible. | Availability API (or channel manager). Rate feed. Cancellation policy in structured format. Amenity database. | 2-4 weeks |
| **ARL-3** | Agent can search availability, select a room/flight/car, hold the reservation temporarily, and confirm the booking with guest details. | Booking API (direct or via channel manager/GDS). Hold/reserve endpoint. Confirmation with PNR/reference. | 1-2 months |
| **ARL-4** | Agent can pay for the booking, receive e-ticket/confirmation, modify dates/room type, cancel with policy-aware refund, add extras (bags, meals, upgrades), check in. | Payment processing. Modification API. Cancellation with refund calculation. Add-on/upsell API. Check-in API. | 2-3 months |
| **ARL-5** | Agent manages the trip: rebooks during disruptions, optimizes loyalty points, handles multi-segment itineraries, files delay claims, coordinates ground transport with hotels with activities as a unified experience. | Disruption monitoring + auto-rebook. Loyalty program API. Multi-segment itinerary management. Claims API. Cross-provider coordination. | 3-6 months |
| **ARL-6** | Hotel/airline agent negotiates with traveler's agent: offers upgrades based on loyalty status, negotiates group rates, coordinates multi-property stays, manages corporate travel programs with policy enforcement. | Deploy business-side AI agent. A2A negotiation for rates/availability. Corporate policy engine. Multi-agent trip coordination protocol. | 6+ months |

**Unique to travel:**
- **Dynamic pricing.** Rates change by the minute. What the agent reads at ARL-2 may be stale by the time it books at ARL-3. Rate guarantees and hold mechanisms are critical.
- **Inventory perishability.** An unsold hotel room tonight is lost revenue forever. An unsold airline seat after departure is worthless. This creates urgency that benefits agent-driven transactions (faster booking = more inventory captured).
- **Cancellation policy complexity.** Non-refundable, free cancellation until 24 hours before, partial refund, credit instead of cash -- the agent must understand and compare these policies.
- **Multi-modal trips.** A trip = flights + hotels + cars + activities + ground transport. ARL-5/6 requires coordinating across multiple providers as a unified experience. If a flight is delayed, the hotel check-in and car rental must adjust automatically.
- **Loyalty program optimization.** Which hotel chain gives the best value for accumulated points? Should the agent use points or pay cash? This decision intelligence is core to ARL-5.
- **Weather and event contingency.** Outdoor activities, seasonal travel, event-based trips -- the agent must factor in conditions and have contingency plans.

**ARL-3 killer feature:** `search_availability` + `book_room` -- travel has the most mature booking infrastructure of any non-tech vertical, making ARL-3 achievable quickly.

---

### 5. Education

**Agent progression:** search courses --> enroll --> access materials --> track progress

**Market:** ~350K educational institutions and companies, $1.8T global education market
**Current average ARL:** 1.5 (EdTech platforms are ARL-2/3, traditional schools are ARL-0)

| Level | What It Means for Education | What to Build | Effort |
|-------|----------------------------|---------------|--------|
| **ARL-0** | School/platform has a website listing courses. "Apply online" leads to a PDF or multi-page web form. | Nothing yet. | -- |
| **ARL-1** | Schema.org Course/EducationalOrganization markup. Structured course catalog with topics, levels, prerequisites, duration, format, and cost. | Schema.org markup. Structured course catalog. Outcome data (completion rates, job placement) in machine-readable format. | 1-2 weeks |
| **ARL-2** | Agent can read: course schedules with seat availability, prerequisite chains, tuition/fees with financial aid estimates, instructor credentials, student outcomes data, peer reviews. | Course catalog API with real-time enrollment data. Prerequisite validator. Tuition calculator with aid estimator. Outcomes data API. | 2-4 weeks |
| **ARL-3** | Agent can enroll a student (or submit an application), register for specific sections, add to waitlist, submit required documents. | Enrollment/application API. Section registration. Waitlist management. Document upload. Identity verification for the student. | 1-3 months |
| **ARL-4** | Agent can pay tuition/fees, access course materials, view grades and assignments, submit completed work, request transcripts, drop/add courses within deadlines. | Payment/billing API. LMS integration (Canvas/Blackboard API). Grade and assignment API. Transcript request. Add/drop with deadline enforcement. | 2-4 months |
| **ARL-5** | Agent manages the learning journey: tracks progress toward degree/certification, suggests next courses based on goals, monitors deadlines, handles financial aid renewals, coordinates tutoring when grades drop. | Learning path optimization. Progress tracking against degree requirements. Automated financial aid renewal. Tutor matching integration. Proactive deadline alerts. | 4-6 months |
| **ARL-6** | Institution's agent works with student's agent on: personalized learning paths, adaptive pacing, career-aligned course selection, inter-institution credit transfer, employer skill-verification. | Deploy institution-side AI agent. A2A agent card with education skills. Cross-institution credit negotiation. Employer verification protocol. | 6+ months |

**Unique to education:**
- **Prerequisites create dependency chains.** Unlike most verticals where each transaction is independent, education has prerequisite trees. An agent cannot enroll in Advanced Calculus without proving completion of Calculus I.
- **Schedules are rigid.** Courses have fixed start dates, specific meeting times, and enrollment windows. Unlike a hotel (book any night) or a store (buy any time), education has structural constraints.
- **Credentials and certifications.** The output of education is a credential (degree, certificate, badge). ARL-5/6 must include verifiable credential issuance (Credly, badge protocols).
- **Group vs individual.** Some education is cohort-based (you cannot take it alone). The agent must match the student to a cohort, not just an open slot.
- **FERPA compliance** (K-12, higher ed) restricts what data an agent can access about a student. Parental consent is required for minors.
- **Financial aid is a parallel transaction.** Tuition payment is not just "pay $X" -- it involves FAFSA, institutional aid, scholarships, loans, payment plans. ARL-4 must handle this complexity.

**ARL-3 killer feature:** `search_courses` + `enroll` -- an agent that can find the right course and register the student eliminates enormous friction.

---

### 6. Beauty / Wellness / Fitness

**Agent progression:** find --> book appointment --> check availability --> pay

**Market:** ~200K fitness/wellness businesses + ~1M beauty professionals in the US
**Current average ARL:** 2.0 (Mindbody/ClassPass stores are ARL-2/3, independent providers are ARL-0)

| Level | What It Means for Beauty/Wellness/Fitness | What to Build | Effort |
|-------|------------------------------------------|---------------|--------|
| **ARL-0** | Salon/studio has Instagram and a phone number. "DM to book." | Nothing yet. | -- |
| **ARL-1** | Structured data: services offered, staff profiles, location, hours. Schema.org HealthAndBeautyBusiness/SportsActivityLocation. Listed on booking platforms. | Schema.org markup. Mindbody/Vagaro/Booksy listing. Service menu in structured format. | 1 week |
| **ARL-2** | Agent can read: service menu with durations and prices, staff availability by day, class schedule with open spots, membership/package options, client reviews by service type. | Booking platform API (Mindbody/ClassPass). Staff availability feed. Class schedule API. Membership tier API. | 2-3 weeks |
| **ARL-3** | Agent can book an appointment with a specific provider, reserve a class spot, request a specific time, note preferences (stylist, instructor, treatment variation). | Appointment booking API with provider selection. Class reservation. Preference storage. Waitlist management. | 1-2 months |
| **ARL-4** | Agent can pay for services (prepay, packages, memberships), cancel/reschedule with policy awareness, tip the provider, use loyalty points or package credits. | Payment/tipping API. Package/membership management. Cancellation with policy enforcement. Loyalty/credit balance API. | 1-2 months |
| **ARL-5** | Agent manages the routine: auto-books recurring appointments (haircut every 6 weeks, yoga MWF at 7am), adjusts when schedule changes, switches to another provider if preferred one is unavailable, tracks fitness goals. | Recurring appointment management. Schedule conflict detection. Provider substitution logic. Fitness/wellness goal tracking. Proactive rebooking. | 2-4 months |
| **ARL-6** | Provider's agent coordinates with client's agent: suggests services based on history ("you're due for highlights"), adjusts schedule based on client's travel calendar, manages multi-provider wellness routines (gym + spa + physical therapy). | Deploy provider-side AI agent. A2A scheduling negotiation. Cross-provider wellness coordination. Personalized recommendation engine. | 4-6 months |

**Unique to beauty/wellness/fitness:**
- **Provider preference is paramount.** A client does not want "any stylist" -- they want THEIR stylist. ARL-3+ must handle provider-specific booking, not just time-slot booking.
- **Recurring schedules define the relationship.** This is one of the most ARL-5-centric verticals. The value is not in the first booking -- it is in managing the ongoing routine (every 4 weeks, every Tuesday and Thursday, etc.).
- **Personal preferences accumulate.** Hair color formula, preferred massage pressure, yoga modifications for injuries, skin sensitivity notes -- ARL-5/6 must maintain and share these preferences (with consent) across visits.
- **Peak-time scarcity.** Saturday morning slots, after-work appointments, and prime class times are scarce. ARL-3 must handle waitlists and alternatives gracefully.
- **Multi-service bundling.** A spa day = massage + facial + mani/pedi. A fitness routine = personal training + group classes + recovery sessions. ARL-5/6 should coordinate multi-service packages.
- **Cancellation policies are strict.** Many salons/studios charge for late cancellations or no-shows. The agent must understand and enforce these policies.

**ARL-3 killer feature:** `book_appointment` with specific provider selection and preference notes.

---

### 7. Automotive

**Agent progression:** search inventory --> schedule test drive --> negotiate --> finance

**Market:** ~18K franchised dealers + ~40K independent dealers in the US, $1.2T annual sales
**Current average ARL:** 1.5 (dealer websites have inventory but no real API access)

| Level | What It Means for Automotive | What to Build | Effort |
|-------|------------------------------|---------------|--------|
| **ARL-0** | Dealership has website with inventory photos. "Call for price." Trade-in value unknown. | Nothing yet. | -- |
| **ARL-1** | Structured vehicle data: VIN-decoded inventory with make, model, year, trim, mileage, features, price. Schema.org Vehicle/Offer markup. Listed on aggregators (CarGurus, AutoTrader). | Schema.org Vehicle markup. Structured inventory feed. Aggregator listings with consistent data. | 1-2 weeks |
| **ARL-2** | Agent can read: full inventory with real-time availability, detailed specs, Carfax summaries, photos/video walkarounds, financing estimates, trade-in value ranges, incentive/rebate programs. | Inventory API with VIN-level detail. Carfax/AutoCheck integration. Financing calculator API. Trade-in estimator (KBB/Edmunds). Incentive feed. | 2-4 weeks |
| **ARL-3** | Agent can schedule a test drive (with trade-in details), submit a financing pre-qualification (soft pull), request a specific out-the-door price quote, hold a vehicle for 24 hours. | Test drive scheduling API. Pre-qualification endpoint (RouteOne/DealerTrack). Quote request with out-the-door pricing. Vehicle hold mechanism. | 1-3 months |
| **ARL-4** | Agent can submit a purchase offer, complete financing application, arrange delivery or pickup, handle documentation (title, registration, insurance proof), pay deposits, execute trade-in. | Offer submission API. Full credit application. Trade-in processing. Document management. Delivery scheduling. Title/registration workflow. | 3-6 months |
| **ARL-5** | Agent manages the vehicle ownership: schedules service appointments, tracks recall notices, manages warranty claims, monitors trade-in value over time, alerts when optimal trade-in window arrives, handles insurance renewal. | Service scheduling API. Recall monitoring. Warranty claim API. Vehicle value tracking. Insurance integration. Proactive trade-in alerts. | 6-12 months |
| **ARL-6** | Dealer's agent negotiates with buyer's agent: counter-offers on price, proposes financing terms, bundles F&I products, handles multi-vehicle fleet purchases, coordinates with lender agents and insurance agents simultaneously. | Deploy dealer-side AI agent. A2A negotiation protocol. Multi-party coordination (buyer + dealer + lender + insurer). Fleet management tools. | 12+ months |

**Unique to automotive:**
- **High-value single transaction.** A car purchase is $35K+ on average. This means every ARL level carries higher stakes than most verticals. The trust threshold for ARL-4 (completing a purchase) is much higher.
- **Negotiation is expected.** Unlike most verticals where prices are posted and fixed, car buying involves negotiation. ARL-6 is where this gets truly interesting -- agents negotiating price, trade-in value, and financing simultaneously.
- **Trade-in valuation is subjective.** Unlike a product return (refund at purchase price), trade-ins require appraisal. ARL-3+ must bridge the gap between the agent's estimate and the dealer's offer.
- **Financing complexity.** Rate, term, down payment, trade equity, negative equity, manufacturer incentives, dealer reserves -- automotive financing has more variables than most other purchases. ARL-4 must handle this.
- **Physical inspection is required.** Test drives cannot be replaced by agents. ARL-3 is about scheduling the test drive and preparing the customer, not eliminating the visit.
- **F&I (Finance & Insurance) upsell.** Extended warranties, gap insurance, paint protection, service contracts -- the agent must navigate these add-ons intelligently at ARL-4+.
- **Inventory is VIN-specific.** Unlike e-commerce (any unit of SKU X is identical), each car is unique. ARL-2+ must be VIN-aware.

**ARL-3 killer feature:** `search_inventory` + `book_test_drive` with trade-in pre-estimate.

---

### 8. Healthcare

**Already covered in separate AgentHermes research (VERTICAL-TAXONOMY.md sections 5a-5h).** Summary of ARL mapping:

| Level | What It Means for Healthcare | Key Difference from Other Verticals |
|-------|------------------------------|-------------------------------------|
| **ARL-0** | Provider has website. "Call to schedule." | Same as others |
| **ARL-1** | NPI-verified provider data, specialties, insurance accepted, locations. | Must include insurance network data |
| **ARL-2** | Real-time availability, copay estimates, telehealth options, patient reviews, credential verification. | Insurance eligibility verification is a must |
| **ARL-3** | Agent books appointment with insurance verification, submits intake forms, requests referrals. | HIPAA consent required before booking. BAA must be in place. |
| **ARL-4** | Agent pays copay, accesses patient portal for results, manages prescriptions, handles referral chains. | All data exchange must be HIPAA-compliant. FHIR APIs preferred. |
| **ARL-5** | Agent manages healthcare: schedules preventive care, monitors chronic conditions, coordinates between providers, manages prescription refills, handles prior authorizations. | Care coordination across multiple providers is unique to healthcare |
| **ARL-6** | Provider's agent coordinates with patient's agent and insurer's agent: prior auth negotiations, care plan coordination, claims processing, multi-provider treatment plans. | Three-party agent coordination (patient + provider + payer) |

**Unique:** HIPAA, prior authorization, multi-provider coordination, prescription management, insurance complexity.

---

### 9. Local Services (HVAC, Plumbing, Roofing, Cleaning, Lawn Care)

**Already covered in separate AgentHermes research (VERTICAL-RESEARCH.md verticals 1-5).** Summary of ARL mapping:

| Level | What It Means for Local Services | Key Difference from Other Verticals |
|-------|----------------------------------|-------------------------------------|
| **ARL-0** | Business has truck and phone number. Maybe a Facebook page. | Many local services are here |
| **ARL-1** | Google Business Profile, service area defined, services listed with pricing ranges. | Service area is critical (zip/radius) |
| **ARL-2** | Real-time availability, diagnostic/estimate pricing, emergency vs scheduled rates, maintenance plan details. | Emergency availability is unique |
| **ARL-3** | Agent books service call with urgency level, submits work request with photos/description, schedules maintenance. | Emergency dispatch path is critical |
| **ARL-4** | Agent pays for service, receives invoice, tracks technician ETA, approves/declines additional work, reviews completed job. | On-site approval flow (tech finds additional issue) is unique |
| **ARL-5** | Agent manages the home: schedules seasonal maintenance, coordinates multiple services, manages home warranty claims, dispatches emergency service automatically. | Whole-home management across multiple service providers |
| **ARL-6** | Service company's agent coordinates with homeowner's agent and home warranty agent: dispatches based on warranty coverage, negotiates pricing, manages recurring maintenance contracts. | Three-party coordination (homeowner + service co + warranty/insurance) |

**Unique:** Emergency dispatch, on-site approval workflow, seasonal scheduling, whole-home bundling.

---

### 10. SaaS / Software

**Already the most agent-ready category (avg ARL-3).** Summary:

| Level | What It Means for SaaS | Key Difference from Other Verticals |
|-------|------------------------|-------------------------------------|
| **ARL-0** | SaaS tool has a website and login page. | Rare -- most SaaS is at least ARL-1 |
| **ARL-1** | OpenAPI spec published. `llms.txt` or developer docs. Product described in structured format. | OpenAPI spec is the SaaS equivalent of schema.org |
| **ARL-2** | Full API documentation, sandbox/trial environment, pricing tiers in structured format, feature comparison matrix. | Sandbox environment is unique to SaaS |
| **ARL-3** | Agent can sign up, create account, provision workspace, connect integrations, start using the product. | Self-service signup is already standard |
| **ARL-4** | Agent can subscribe, pay, manage billing, upgrade/downgrade, export data, close account. | Usage-based billing adds complexity |
| **ARL-5** | Agent manages the tool: configures automations, monitors usage, optimizes costs, handles renewals, migrates data. | Full API autonomy is possible here |
| **ARL-6** | SaaS agent coordinates with customer's agent: auto-provisions for new team members, negotiates enterprise pricing, integrates with other SaaS agents in the stack. | This is where the agent-native SaaS economy lives |

**Unique:** Full API autonomy is achievable at ARL-5/6. SaaS is the only vertical where ARL-6 is already emerging.

---

### 11. Real Estate

**Covered in VERTICAL-TAXONOMY.md sections 7a-7f.** ARL summary:

| Level | What It Means for Real Estate |
|-------|-------------------------------|
| **ARL-0** | Listings on agent's personal website. "Call me." |
| **ARL-1** | MLS-connected structured listings with RESO Web API data. Property details in machine-readable format. |
| **ARL-2** | Real-time listing data, comparable sales, school districts, walkability scores, mortgage estimates, neighborhood data. |
| **ARL-3** | Agent schedules showings, submits inquiries, requests disclosures, initiates pre-approval with linked lender. |
| **ARL-4** | Agent submits offers, coordinates inspections, manages escrow timeline, handles document signing (DocuSign). |
| **ARL-5** | Agent manages the property: schedules maintenance, handles tenant relations, monitors market value, triggers refinance when optimal. |
| **ARL-6** | Buyer's agent negotiates with seller's agent: counter-offers, contingency waivers, multi-offer coordination, lender-agent coordination. |

**Unique:** Physical inspection requirement, multi-week closing process, Fair Housing compliance, title search, multi-party coordination (buyer + seller + agents + lender + title company + appraiser).

---

## The ARL Maturity Model -- Where Industries Stand Today

```
                    ARL-0   ARL-1   ARL-2   ARL-3   ARL-4   ARL-5   ARL-6
                    Dark    Disc.   Read.   Book.   Trans.  Auto.   Interop.
SaaS / DevTools     -----   -----   -----   ====>   ---->   -->     >
E-Commerce          -----   -----   ====>   ---->   -->     >
Travel              -----   -----   =====>  ---->   -->     >
Media/Entertainment -----   ====>   ---->   -->     >
Beauty/Wellness     -----   ====>   ---->   -->     >
Education           -----   ====>   ---->   -->
Local Services      =====>  ---->   -->     >
Real Estate         =====>  ---->   -->
Finance/Insurance   =====>  ---->   -->
Professional Svcs   =====>  ---->   >
Automotive          =====>  ---->
Healthcare          =====>  --->
Agriculture         =====>  ->
Government          =====>  ->

Legend: ====> = where majority of businesses are today
        ----> = leading edge businesses
        >     = pioneer/experimental
```

---

## How to Use This Framework

### For Businesses: "Where am I and what do I build next?"

1. **Identify your current ARL.** Read the vertical-specific criteria above. Be honest.
2. **Target the next level, not the highest level.** Jumping from ARL-0 to ARL-4 is unrealistic. Go to ARL-1 first.
3. **Use the killer features.** Each vertical has an ARL-3 killer feature identified. That is the minimum viable agent capability.
4. **Estimate effort.** Each level includes a time estimate. Adjust based on your current tech stack.

### For AgentHermes: "How do we score and remediate?"

The ARL maps directly to the existing AgentHermes scoring framework:

| ARL Level | AgentHermes Score Range | Dimensions That Must Pass |
|-----------|------------------------|--------------------------|
| ARL-0 | 0-19 | None |
| ARL-1 | 20-39 | D1 (Discoverability) |
| ARL-2 | 40-59 | D1 + D4 (Pricing) + D6 (Data Quality) |
| ARL-3 | 60-74 | D1 + D2 (API) + D3 (Onboarding) + D4 + D6 |
| ARL-4 | 75-89 | All of above + D5 (Payment) + D7 (Security) + D8 (Reliability) |
| ARL-5 | 90-95 | All dimensions at high scores + D9 (Agent Experience) |
| ARL-6 | 96-100 | All dimensions + Agent-Native Bonus |

### For the Industry: "What is the adoption timeline?"

| Year | Expected Shift |
|------|---------------|
| 2026 | SaaS/DevTools reach ARL-5 average. E-commerce and travel reach ARL-3. |
| 2027 | E-commerce reaches ARL-4. Finance/insurance fintechs reach ARL-4. Beauty/wellness reaches ARL-3. |
| 2028 | Healthcare telehealth reaches ARL-3. Automotive reaches ARL-3. Professional services early adopters reach ARL-3. |
| 2029 | Finance/insurance incumbents reach ARL-3 (forced by regulation). Government starts ARL-1 push. Education platforms reach ARL-4. |
| 2030 | ARL-6 becomes common in SaaS. ARL-4 becomes table stakes in e-commerce. First regulated-industry ARL-6 implementations. |

---

## The Scorecard: ARL Self-Assessment

Use this quick scorecard. Answer YES or NO for each item. Your ARL is the highest level where ALL items are YES.

### ARL-1 Checklist (Discoverable)
- [ ] Machine-readable business description (schema.org, llms.txt, or agent-card.json)
- [ ] Services/products listed in structured data format
- [ ] Business hours and service area in structured format
- [ ] Listed in at least one structured directory or registry
- [ ] Contact information in machine-readable format

### ARL-2 Checklist (Readable)
- [ ] All ARL-1 items
- [ ] Structured pricing (exact or ranges) accessible without scraping
- [ ] Real-time or near-real-time availability data
- [ ] Reviews/ratings in structured format
- [ ] Policies (cancellation, returns, terms) in machine-readable format

### ARL-3 Checklist (Bookable)
- [ ] All ARL-2 items
- [ ] API endpoint for initiating transactions (booking, ordering, applying)
- [ ] Structured input format (agent knows what data to submit)
- [ ] Confirmation mechanism (ID, reference number, receipt)
- [ ] Error handling with actionable alternatives

### ARL-4 Checklist (Transactable)
- [ ] All ARL-3 items
- [ ] Programmatic payment acceptance
- [ ] Status tracking via API
- [ ] Modification capability (reschedule, change, upgrade)
- [ ] Cancellation and refund flow via API
- [ ] Webhooks or polling for status updates

### ARL-5 Checklist (Autonomous)
- [ ] All ARL-4 items
- [ ] Recurring transaction management
- [ ] Proactive notifications (alerts, reminders, renewals)
- [ ] Automated escalation paths
- [ ] SLA commitments with monitoring
- [ ] Preference learning and personalization

### ARL-6 Checklist (Interoperable)
- [ ] All ARL-5 items
- [ ] A2A agent card published at /.well-known/agent-card.json
- [ ] MCP server exposing business capabilities as tools
- [ ] Agent-to-agent negotiation capability
- [ ] Multi-agent workflow support
- [ ] Programmatic credential exchange

---

## Appendix: ARL by Numbers

### Current State of the Economy (estimated March 2026)

| ARL Level | % of US Businesses | # of Businesses |
|-----------|--------------------|-----------------|
| ARL-0 (Dark) | 60% | ~7.8M |
| ARL-1 (Discoverable) | 25% | ~3.25M |
| ARL-2 (Readable) | 10% | ~1.3M |
| ARL-3 (Bookable) | 4% | ~520K |
| ARL-4 (Transactable) | 0.8% | ~104K |
| ARL-5 (Autonomous) | 0.15% | ~19.5K |
| ARL-6 (Interoperable) | 0.01% | ~1,300 |

### The AgentHermes Opportunity

Moving a business from ARL-0 to ARL-3 is the core AgentHermes value proposition:
- **ARL-0 to ARL-1:** Score It (free scanner + remediation advice)
- **ARL-1 to ARL-2:** Fix It (structured data generation, llms.txt, agent-hermes.json)
- **ARL-2 to ARL-3:** Connect It (MCP server generation, booking API setup, gateway)
- **ARL-3 to ARL-6:** Platform growth (businesses invest themselves once agent traffic proves value)

The revenue inflection happens at ARL-3. That is where agents can transact, and transacting agents are worth money.

---

*This document is the canonical reference for Agent Readiness Levels across all business verticals. It supersedes any previous definitions of "agent-ready" in AgentHermes documentation.*
