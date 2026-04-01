# Agent Maturity Levels for Local/Home Services

> Research date: 2026-03-30
> Companion to: VERTICAL-RESEARCH.md (15 vertical deep dives), VERTICAL-TAXONOMY.md (60+ verticals)
> Scope: Plumber, HVAC, electrician, cleaner, lawn care, roofing, locksmith, pest control, painter, pool service
> Purpose: Define what "fully agent-capable" means for businesses where a human physically shows up at your house

---

## Why Local Services Are a Different Species

Local services are not SaaS. They are not restaurants. They are not e-commerce. Every framework built for digital businesses breaks when applied to a plumber.

**The five properties that make local services unique:**

1. **Physical presence is the product.** A plumber cannot deliver plumbing over the internet. The value chain is: discover the business, communicate the problem, get a human to a physical location, perform skilled labor with physical tools, and collect payment. No step can be fully digitized. The agent's job is to compress the time between "I have a problem" and "a qualified human is at my door."

2. **Every job is a snowflake.** A restaurant has a menu. A SaaS has pricing tiers. A plumber has... it depends. A leaking faucet might be $150 or $1,500 depending on the faucet, the pipes behind the wall, the age of the house, whether the shutoff valve works, and what the plumber finds when they open things up. Pricing is diagnostic, not listed. Agents must handle this ambiguity rather than expect a price catalog.

3. **Capacity is brutally finite.** A SaaS company can serve one more customer at near-zero marginal cost. A plumbing company with three trucks can serve three jobs at once. Period. This means availability is the most important data point for agent interactions, and it changes by the minute. Overbooking destroys the business.

4. **Emergency vs. routine creates two entirely different buying behaviors.** When your pipe bursts at 2am, you will pay anything to anyone who can come now. When you want your lawn mowed weekly, you will comparison-shop for weeks. The same business serves both modes. An agent framework must handle both: the "speed above all else" emergency and the "optimize for price and schedule" routine.

5. **Trust is earned at the door, not on the screen.** You are letting a stranger into your home. Reviews, licenses, insurance, background checks, and years-in-business all matter more than a slick website. Many of the best local service providers have no website at all. Their entire reputation lives in Google reviews and word of mouth. Agent readiness cannot assume a digital starting point.

---

## The Five Maturity Levels

### How to Read Each Level

For each level:
- **What the business provides** — the digital infrastructure and operational capabilities present at this level
- **What an agent CAN do** — concrete actions an AI agent can perform on behalf of a consumer or the business
- **What an agent CANNOT do** — hard boundaries that remain at this level
- **Technical requirements** — what must exist (protocols, data, systems) for this level to work
- **Plumbing example** — what this looks like for "Mike's Plumbing, a 3-truck operation in Atlanta"
- **Emergency vs. routine distinction** — how this level handles each mode differently

---

## Level 0: Analog (The Phone-and-Truck Business)

*"You Google me, you call me, I answer if I'm not under a sink."*

### What the Business Provides
- A phone number. Maybe a Google Business Profile (often claimed by Google automatically, not by the owner).
- Word of mouth and yard signs.
- Possibly a basic website built by a nephew in 2019 with a phone number and a contact form that emails nobody.
- Pricing is in the owner's head. Schedule is in the owner's head. Service area is "wherever I feel like driving."
- Invoices are handwritten or sent via QuickBooks/Venmo after the job.

### What an Agent CAN Do
- **Find the business** via Google Maps, Yelp, Angi, Thumbtack, or Nextdoor listings.
- **Read reviews** from Google, Yelp, and other public sources.
- **Extract basic info** (phone number, address, hours if listed, service area if listed).
- **Compose a text message or email** to the business on behalf of the consumer (no guarantee of response).
- **Compare** this business against others on public data (review count, star rating, years in business, license lookup via state board website).

### What an Agent CANNOT Do
- Check real-time availability (nobody is maintaining a digital calendar).
- Get a quote without calling and talking to a human (pricing is not published or programmatic).
- Book an appointment (no booking system exists).
- Pay a deposit (no digital payment acceptance tied to booking).
- Get status updates on a scheduled job ("is the plumber on the way?").
- Negotiate or interact with a "business agent" (there is no business agent; there is a person who answers a phone between jobs).

### Technical Requirements
- None from the business. Everything runs on publicly scrapeable data.
- The agent relies on: Google Maps API, Google Business Profile data, Yelp API, state licensing board websites, reverse phone lookups.
- Fulfillment is "compose a message and hope someone reads it."

### Plumbing Example: Mike's Plumbing at Level 0
Mike has three trucks, a Google listing with 47 reviews (4.6 stars), and a phone number. His "website" is a single page with his phone number and the words "Licensed & Insured." When a consumer's agent searches for plumbers in 30309:

- The agent finds Mike's listing on Google Maps.
- The agent reads that Mike has 4.6 stars, is licensed (verified against Georgia Secretary of State database), and his listed hours are "Mon-Sat 7am-6pm."
- The agent composes a text: "Hi, I'm reaching out on behalf of Sarah Chen. She has a leaking kitchen faucet at 123 Peachtree St, 30309. Could you provide an estimate and your next available time?"
- Mike sees the text 3 hours later when he finishes a job. He calls Sarah directly.
- The agent has no visibility into whether Mike responded, what his quote is, or when he can come.

**Emergency behavior:** The agent calls Mike's phone number. If no answer, moves to the next plumber on the list. No ability to check if Mike is available or en route. Pure phone tree.

**Routine behavior:** Same as emergency but with less urgency. The agent might send the same text to 5 plumbers and wait for callbacks. The consumer still ends up fielding calls.

### Where Most Local Service Businesses Are Today
**Over 70% of local service businesses in the US are at Level 0 or barely above it.** The typical HVAC company, plumber, electrician, painter, or pest control operator has a phone number, maybe a website, and runs their business out of their truck and their head. This is the floor, and it is where the vast majority of the market sits.

---

## Level 1: Digitally Visible (Structured Data, No Interaction)

*"My information is online and accurate. Your agent can learn about me, but it still has to call me."*

### What the Business Provides
- A maintained website with structured, accurate, machine-readable information.
- An `llms.txt` file or `agent-hermes.json` file (or equivalent structured data) that describes services, service area, hours, and contact methods in a format agents can parse without scraping.
- Published (or at least retrievable) service catalogs with price ranges (not exact quotes, but "drain cleaning starts at $150" or "diagnostic fee: $89").
- A claimed and actively managed Google Business Profile with accurate hours, service area, categories, and photos.
- Public license and insurance verification info.
- Reviews on at least one platform with active owner responses (signals trust and engagement).

### What an Agent CAN Do
Everything from Level 0, plus:
- **Understand the business precisely** by reading structured data (services offered, service area by zip code, price ranges, hours, emergency availability, team size).
- **Pre-qualify the match** before making contact: "This plumber covers your zip code, handles the type of issue you described, has emergency availability, and their diagnostic fee is $89."
- **Generate a comparison table** across multiple Level 1+ businesses with real data, not just star ratings: "Plumber A charges $89 diagnostic, covers your area, has 24/7 emergency. Plumber B charges $49 diagnostic but no emergency service. Plumber C has the highest reviews but does not list prices."
- **Pre-fill a contact form** with the consumer's information and job details.
- **Understand specialization** — this plumber does commercial and residential; this one only does residential. This HVAC company services heat pumps; that one does not.

### What an Agent CANNOT Do
- Check real-time availability (there is structured data about hours but not about today's actual schedule openings).
- Get a binding quote (price ranges are published but the real quote still requires human assessment).
- Book an appointment without human intermediation.
- Pay a deposit or hold a time slot.
- Interact with a business-side agent.

### Technical Requirements
- `llms.txt` or `agent-hermes.json` on the business's domain (AgentHermes can generate these).
- Structured service catalog with: service names, descriptions, starting prices or price ranges, service area (zip codes or radius).
- Schema.org LocalBusiness markup on the website.
- Google Business Profile API access (for real-time hours, reviews, Q&A).

### Plumbing Example: Mike's Plumbing at Level 1
Mike now has an `llms.txt` file on his website (generated by AgentHermes when he signed up). It says:

```
Mike's Plumbing — Licensed Master Plumber, Atlanta GA
Service area: 30301-30350, Cobb County, Gwinnett County
Services: Drain cleaning ($150-300), Water heater repair ($200-800), Water heater replacement ($1,200-3,500), Pipe repair ($200-1,000), Toilet repair ($100-350), Faucet replacement ($150-400), Sewer line inspection ($250-500), Emergency service (24/7, $149 trip charge after hours)
Diagnostic fee: $89, waived if you approve the repair
Hours: Mon-Sat 7am-6pm, Emergency 24/7
Team: 3 licensed plumbers, 12 years in business
License: Georgia #PLU-123456
Insurance: $2M general liability
Reviews: 4.6 stars, 127 reviews on Google
```

When Sarah's agent searches for a plumber:
- It reads Mike's structured data and immediately knows: Mike covers 30309, charges $89 for a diagnostic, has 24/7 emergency, and has strong reviews.
- The agent builds a comparison: "I found 4 plumbers in your area. Mike's Plumbing has the best reviews (4.6, 127 reviews) and a $89 diagnostic fee that's waived if you proceed. QuickFix Plumbing is cheaper ($49 diagnostic) but has fewer reviews (3.9, 23 reviews). Here's the full comparison."
- The consumer says "go with Mike." The agent still has to call or submit a contact form. Mike still calls back.

**Emergency behavior:** The agent sees "Emergency 24/7" in the structured data and knows to try Mike even at 2am. It composes a text with the emergency details. But it still cannot confirm Mike is available or get an ETA.

**Routine behavior:** Significantly better than Level 0. The agent can do meaningful comparison shopping using real data (prices, specializations, service area coverage) rather than just reviews. The consumer gets a curated shortlist, not a raw Google Maps result.

### The Level 1 Opportunity
**This is the biggest unlock.** Moving a business from Level 0 to Level 1 requires zero technical integration. It requires only structured data: a file on a website. AgentHermes can generate this in under 5 minutes from a business's existing Google listing and a short questionnaire. The jump in agent utility is massive: from "I found a phone number" to "I understand exactly what this business does, what it charges, and whether it's right for you."

---

## Level 2: Agent-Bookable (Real-Time Availability + Programmatic Booking)

*"Your agent can see my real schedule and book a slot without calling me."*

### What the Business Provides
Everything from Level 1, plus:
- A real-time or near-real-time availability calendar exposed via API (through ServiceTitan, Housecall Pro, Jobber, Calendly, or a direct integration).
- An MCP endpoint (or API) with at minimum: `check_availability`, `book_appointment`, and `cancel_appointment` tools.
- An `/.well-known/agent-card.json` declaring the business's agent-facing capabilities.
- Defined booking rules: minimum notice period, cancellation policy, deposit requirements, service-area-specific time windows.
- Automated confirmation (SMS/email to consumer and business upon booking).

### What an Agent CAN Do
Everything from Level 1, plus:
- **Check real-time availability:** "Mike's Plumbing has openings tomorrow at 8am, 10am, and 2pm."
- **Book an appointment** on behalf of the consumer without any human intermediation on either side.
- **Provide confirmation details:** confirmation number, technician name, arrival window, what to expect, how to prepare.
- **Cancel or reschedule** via the same API.
- **Set up reminders** and pre-appointment instructions ("please clear the area under the kitchen sink before the plumber arrives").
- **Handle the full routine booking flow end to end:** search, compare, select, book, confirm, remind.

### What an Agent CANNOT Do
- Get a binding quote for complex work (the diagnostic fee is bookable, but "how much to repipe the bathroom" still requires an in-person assessment).
- Pay for the service in advance (deposit may be possible, full payment is post-service).
- Negotiate pricing or scheduling tradeoffs ("can I get a discount if I take the 6am slot?").
- Interact with a business-side agent that reasons about scheduling optimization.
- Handle complex multi-step jobs (initial diagnostic, then approval for repair, then scheduling the repair).

### Technical Requirements
- MCP server or REST API with authenticated endpoints for availability and booking.
- Integration with one of: ServiceTitan, Housecall Pro, Jobber, FieldEdge, or a custom calendar system.
- Webhook or push notification capability for booking confirmations.
- Idempotency on booking endpoints (prevent double-booking from agent retries).
- Rate limiting (prevent agents from hammering the availability endpoint).
- Service area validation on the booking endpoint (reject bookings outside coverage).

### Plumbing Example: Mike's Plumbing at Level 2
Mike uses Housecall Pro. AgentHermes has connected to Housecall Pro's API and exposed Mike's availability as MCP tools. When Sarah's agent needs a plumber:

1. Agent calls `check_availability({ zip_code: "30309", service_type: "faucet_repair", preferred_dates: ["2026-04-01", "2026-04-02"] })`.
2. Returns: `{ slots: [{ date: "2026-04-01", time: "10:00-12:00", technician: "Mike Jr." }, { date: "2026-04-01", time: "14:00-16:00", technician: "Dave" }, { date: "2026-04-02", time: "08:00-10:00", technician: "Mike" }] }`.
3. Agent presents options to Sarah: "Mike's Plumbing has three openings. Tomorrow 10am-12pm (Mike Jr.), tomorrow 2-4pm (Dave), or Wednesday 8-10am (Mike himself). Diagnostic fee is $89, waived with repair."
4. Sarah says "Wednesday morning with Mike."
5. Agent calls `book_appointment({ customer: { name: "Sarah Chen", phone: "404-555-1234", address: "123 Peachtree St, 30309" }, slot: "2026-04-02T08:00", service_type: "faucet_repair", notes: "Kitchen faucet leaking from base" })`.
6. Returns: `{ confirmation_id: "MP-20260402-001", technician: "Mike", arrival_window: "8:00-8:30am", estimated_duration: "1-2 hours", preparation: "Please clear area under kitchen sink", cancellation_policy: "Free cancellation up to 4 hours before" }`.
7. Sarah's agent saves the confirmation and sets a reminder.

**Emergency behavior:** Level 2 is transformative for emergencies. Instead of calling 5 plumbers and hoping someone answers, the agent checks real-time availability across all Level 2 plumbers simultaneously: "Of the 12 plumbers in your area, 3 have emergency availability right now. The closest can arrive in 35 minutes. The cheapest emergency fee is $149. Booking now."

**Routine behavior:** Fully automated. The consumer says "get my faucet fixed this week" and the agent handles everything. The consumer's next interaction is opening the door for the plumber.

### The Level 2 Leap
This is where agent-mediated local services start to feel magical. The consumer never makes a phone call. They never play phone tag. They never wait for a callback. The agent does in 30 seconds what used to take a consumer 2 hours of calls, voicemails, and waiting. **For businesses, Level 2 means zero-friction lead capture: the customer is booked before they have a chance to call your competitor.**

---

## Level 3: Agent-Negotiable (Quoting, Pricing Logic, Business-Side Agent)

*"My agent talks to your agent. We negotiate price, timing, and scope without either human picking up a phone."*

### What the Business Provides
Everything from Level 2, plus:
- A business-side agent (or rules engine) that can handle pricing logic, make scheduling tradeoffs, and respond to negotiation patterns.
- Programmatic quoting for standard jobs: given a description of the work, the system generates a quote range or firm quote without human involvement.
- Dynamic pricing rules: "emergency jobs after 6pm are 1.5x base rate," "10% discount for booking 3+ days out," "returning customers get priority scheduling."
- Multi-step workflow support: diagnostic booking, approval gate (consumer approves the repair quote), repair scheduling, payment — all agent-mediated.
- Payment integration: deposits, pre-authorization, milestone payments, and final invoicing via API.
- Capacity-aware scheduling: the business agent knows crew capacity, travel time between jobs, parts inventory, and can optimize accordingly.

### What an Agent CAN Do
Everything from Level 2, plus:
- **Get a programmatic quote** for standard jobs: "A kitchen faucet replacement for a single-handle Moen in a home built after 1990 is estimated at $275-375 parts and labor."
- **Negotiate on behalf of the consumer:** "The consumer prefers to pay under $300. Can you offer a discount for a flexible scheduling window?" The business agent responds: "If the consumer accepts any time slot on Thursday, we can do $285."
- **Handle multi-step service flows:** Agent books a diagnostic. After the diagnostic, the plumber's system sends a repair quote via API. The consumer's agent reviews the quote, compares it against market rates, asks the consumer for approval, and books the repair — all without a phone call.
- **Coordinate complex jobs:** "The roof inspection found damage. Your agent got quotes from 3 roofers. Here's the comparison. Roofer B can start Monday and will work with your insurance adjuster directly. Approve?"
- **Manage payment:** Hold a deposit at booking, authorize the repair amount after diagnostic, process final payment on completion.
- **Access loyalty/history:** "You've used Mike's Plumbing 4 times. You have a 10% loyalty discount. Your water heater was installed by them 6 years ago and is approaching end of warranty."

### What an Agent CANNOT Do
- Override the business's pricing rules (the business agent has guardrails).
- Approve work above the consumer's pre-set spending limit without explicit consumer approval.
- Handle truly novel situations that fall outside the rules engine (a combined electrical-plumbing-structural issue that requires a custom scope).
- Replace the in-person diagnostic for non-standard work (the plumber still needs to look at the wall).
- Guarantee outcomes ("the repair will last 10 years").

### Technical Requirements
- Business-side agent or rules engine with: pricing logic, discount policies, scheduling optimization, capacity awareness.
- MCP tools for: `get_quote`, `negotiate_price`, `approve_repair`, `process_payment`, `get_customer_history`.
- A2A (agent-to-agent) protocol support for multi-turn negotiation between consumer agent and business agent.
- Payment processing API (Stripe, Square, or equivalent) with pre-auth and capture capabilities.
- Job workflow state machine: lead → booked → diagnostic complete → quote sent → approved → repair scheduled → repair complete → paid → follow-up.
- Customer identity resolution: recognizing returning customers from previous interactions.

### Plumbing Example: Mike's Plumbing at Level 3
Mike's business now runs a rules engine (built into his enhanced Housecall Pro + AgentHermes integration). When Sarah's agent needs a plumber:

1. Sarah says: "My kitchen faucet is leaking. Get it fixed for under $400 if possible."
2. Sarah's agent calls Mike's `get_quote` tool: `{ issue: "kitchen_faucet_leak", faucet_type: "single_handle", brand: "unknown", home_year: 2005, zip: "30309" }`.
3. Mike's business agent responds: `{ diagnostic_fee: 89, estimated_repair: { low: 175, high: 425 }, most_likely: 275, includes: "parts and labor for standard faucet repair/replacement", notes: "If faucet is high-end or pipes behind wall need work, could exceed estimate" }`.
4. Sarah's agent sees $275 is under the $400 target. It checks availability and sees a slot tomorrow at 2pm.
5. Sarah's agent negotiates: `{ request: "discount", reason: "flexible_schedule", constraint: "any_slot_this_week" }`.
6. Mike's business agent applies the "flexible scheduling" rule: `{ counter_offer: { price: 255, discount_reason: "flexible_schedule_discount", slot: "2026-04-03T08:00", note: "Early morning slot, saves us drive time between jobs" } }`.
7. Sarah's agent presents: "Mike's Plumbing quoted $255 for your faucet repair if we take the Thursday 8am slot. That's $20 below your $275 target. They have a 4.6 rating with 127 reviews. Should I book it?"
8. Sarah approves. Agent books, pays the $89 diagnostic hold, and confirms.
9. Thursday: Mike diagnoses the issue, finds it is a simple cartridge replacement. His system sends a repair quote via API: $185 total (diagnostic waived). Sarah's agent auto-approves (under the pre-authorized $400 limit). Mike completes the repair. Payment processes.
10. Sarah's agent logs: "Mike's Plumbing — faucet repair — $185 — completed 2026-04-03 — 5 star review prompted."

**Emergency behavior at Level 3:** Agent-to-agent negotiation happens in seconds. "Pipe burst at 2am. Consumer will pay up to $500 for someone within 30 minutes." Mike's business agent: "Emergency crew available, ETA 25 minutes, $349 trip charge plus repair estimate on arrival. Pre-authorize $500?" Consumer agent checks: cheapest available is $289 but ETA is 50 minutes. Second cheapest is Mike at $349 and 25 minutes. Agent presents both options with tradeoffs. Consumer picks Mike. Pre-authorization happens. Plumber dispatched. Total time from "my pipe burst" to "plumber en route": under 2 minutes.

**Routine behavior at Level 3:** Essentially invisible. "Schedule my quarterly drain cleaning at the best price I can get this month." The agent negotiates with 3 providers, finds the best combination of price and timing, books it, pays, and adds it to the calendar. The consumer's involvement is a 10-second approval.

### The Level 3 Revolution
This is where the economics of local services fundamentally change. **The business that reaches Level 3 first in its market wins.** Here is why: when two agents negotiate, the one with better data and faster response wins the job. A Level 3 plumber captures the emergency call in 30 seconds. A Level 0 plumber is still under a sink, unable to answer the phone. The Level 3 plumber does not just answer faster; they never miss a lead. Their business agent is always on, always negotiating, always optimizing schedule utilization. At this level, the business's "sales team" is an agent that works 24/7, never takes a sick day, and can handle 100 simultaneous negotiations.

---

## Level 4: Autonomous Service Orchestration (The Self-Running Business)

*"The business agent manages the entire operation: dispatch, quoting, scheduling, parts, payments, follow-ups, reviews, hiring signals. The owner focuses on quality and growth."*

### What the Business Provides
Everything from Level 3, plus:
- Full operational intelligence: the business agent manages dispatch optimization (which technician goes where, minimizing drive time), parts inventory (ordering parts before they are needed based on upcoming job types), crew capacity planning, and dynamic pricing based on demand and capacity.
- Proactive service: the business agent reaches out to past customers when maintenance is due, when seasonal issues are predicted (pre-winter pipe insulation), or when the business has unexpected availability ("we had a cancellation Thursday afternoon — your annual AC tune-up is due, want the slot at a 15% discount?").
- Multi-provider coordination: the business agent can subcontract or refer. "This job requires electrical work too. I've coordinated with ABC Electric — they'll arrive at 10am, we'll arrive at 1pm after they finish."
- Insurance and warranty integration: the business agent files warranty claims, coordinates with home warranty companies, and submits insurance documentation for covered repairs.
- Reputation management: automated review solicitation, response to reviews, and feedback loops that improve service quality.
- Predictive operations: "Based on weather forecast (heat wave this weekend), we're pre-scheduling emergency HVAC capacity and adjusting pricing. Pre-book your tune-up before rates go up."

### What an Agent CAN Do
Everything from Level 3, plus:
- **Orchestrate multi-trade jobs:** "Your bathroom renovation needs a plumber, electrician, and tile installer. Here's a coordinated schedule with all three, sequenced correctly, with a single project manager contact."
- **Manage ongoing service relationships:** "Your pool service, lawn care, and pest control are all managed. Here's your monthly home maintenance summary: 4 services completed, $627 total, all technicians rated 4.5+. Your dryer vent cleaning is due next month — I've already gotten quotes."
- **Handle insurance claims:** "The plumber documented the water damage with photos. I've filed the claim with State Farm, uploaded the documentation, and the adjuster is scheduled for Tuesday."
- **Optimize across the consumer's entire home service portfolio:** "You're paying $180/month for lawn care. I found a provider who will bundle lawn care + pest control + pool service for $340/month, saving you $85/month versus your current separate providers."
- **Predict and prevent:** "Based on your water heater's age (11 years) and the manufacturer's failure curve, I recommend a replacement within the next 12 months. Current off-season pricing is 20% lower than summer emergency rates. Want me to get quotes?"

### What an Agent CANNOT Do
- Perform the physical work (a human still turns the wrench).
- Override safety or licensing requirements (cannot send an unlicensed person to do licensed work).
- Make judgment calls on complex structural or safety issues (the master plumber's expertise is irreplaceable for diagnosis).
- Guarantee outcomes or provide warranties beyond what the business offers.
- Eliminate the need for consumer approval on high-cost decisions (the approval gate remains for anything above a pre-set threshold).

### Technical Requirements
- Full ERP-level integration: job costing, inventory management, crew scheduling, customer history, financial reporting.
- Predictive models: demand forecasting, equipment failure prediction, crew capacity planning.
- Multi-provider A2A coordination: agents from different businesses negotiating schedules and handoffs.
- Insurance and warranty company API integrations.
- Customer identity graph: linking a consumer's home, service history, equipment inventory, warranty status, and preferences across all their local service providers.
- Weather, event, and market data feeds for demand prediction.
- Continuous learning: job outcome data improving quote accuracy, scheduling optimization, and customer satisfaction prediction.

### Plumbing Example: Mike's Plumbing at Level 4
Mike's business is now a platform. He has 8 trucks, 12 technicians, and his business agent manages everything. A day in the life:

**6:00 AM:** Mike's agent reviews the day. 14 jobs scheduled. Overnight, a storm caused 3 emergency calls — all dispatched automatically to the on-call crew. One required a part that was auto-ordered from the supplier for 7am delivery. The agent re-optimized the day's route: Dave's afternoon job moved to 3pm (customer auto-notified) to avoid the traffic from the road construction that started this week.

**8:00 AM:** A consumer's agent requests an emergency garbage disposal replacement. Mike's agent checks: nearest technician with disposal parts in the truck is 15 minutes away, between jobs. It negotiates: "$375 flat rate, technician arrives by 8:30am, includes disposal unit and installation, 2-year parts warranty." Consumer agent approves, payment pre-authorized, technician dispatched. Mike never sees this interaction — it was entirely agent-to-agent.

**10:00 AM:** Mike's agent sends 23 proactive messages to past customers: "Your water heater was installed 10 years ago. Based on our data, 40% of this model fail in year 11. We have availability next Tuesday for a replacement at $2,800 (off-season rate, 15% below our summer price). This includes a 12-year warranty and we'll haul away the old unit." Three customers book.

**2:00 PM:** A property management company's agent sends a bulk request: "14 units need winterization. Budget $200/unit. Need all done within 2 weeks." Mike's agent negotiates: "We can do all 14 for $175/unit if we schedule them in geographic clusters (3-4 units per day, same zip codes). Proposed schedule attached." The property manager's agent counter-offers at $165/unit. Mike's agent accepts at $170 with a 3-year service contract attached.

**5:00 PM:** Mike reviews his dashboard. Revenue today: $8,400. Jobs completed: 17. Customer satisfaction: 4.8 average. His agent handled 47 inbound inquiries, booked 19, provided quotes for 12 (8 pending consumer approval), and declined 16 (outside service area or below minimum job size). Mike did zero sales work. He spent his day on the two complex jobs that required a master plumber.

**Emergency behavior at Level 4:** Fully autonomous. The business agent monitors incoming emergency requests, dispatches the nearest qualified technician with the right parts, negotiates price, processes payment, coordinates with insurance if needed, and follows up for review. The owner may not learn about the emergency until the morning summary.

**Routine behavior at Level 4:** The business agent is a proactive growth engine. It does not wait for inbound requests. It knows when customers need maintenance. It knows when demand will spike (first hot day of summer, first freeze of winter). It pre-positions capacity and captures demand before the customer even realizes they have a need.

---

## Level Comparison Matrix

| Dimension | L0: Analog | L1: Visible | L2: Bookable | L3: Negotiable | L4: Autonomous |
|-----------|-----------|-------------|-------------|---------------|---------------|
| **Discovery** | Google Maps scrape | Structured data (llms.txt) | Agent Card + MCP | A2A-discoverable | Proactive outreach |
| **Availability** | Unknown | Published hours only | Real-time calendar | Capacity-aware | Demand-predicted |
| **Pricing** | "Call for quote" | Published ranges | Diagnostic fee bookable | Programmatic quotes | Dynamic + negotiated |
| **Booking** | Phone call required | Form submission | API booking | Agent-to-agent | Autonomous dispatch |
| **Payment** | Post-service cash/check/Venmo | Post-service digital | Deposit at booking | Pre-auth + milestone | Full lifecycle managed |
| **Multi-step jobs** | All manual | All manual | Book diagnostic only | Diagnostic → quote → repair | Full orchestration |
| **Emergency response** | Call and hope | Call informed | Instant availability check | Agent negotiation in seconds | Auto-dispatch + triage |
| **Repeat business** | Customer remembers | Customer remembers | History accessible | Loyalty pricing | Proactive re-engagement |
| **Business effort per lead** | 15-30 min (calls, quotes) | 10-20 min | 2-5 min (review bookings) | 0-2 min (override only) | 0 min (exception only) |
| **Consumer effort** | 2+ hours | 30-60 min | 5 min | 30 sec approval | Invisible |
| **Technical bar** | None | Static files | Calendar API + MCP | Rules engine + A2A + payments | Full ERP + ML |

---

## Emergency vs. Routine: How Each Level Handles Both

### Emergency Scenario: "My pipe burst at 2am"

| Level | What Happens | Time to Plumber En Route |
|-------|-------------|------------------------|
| L0 | Consumer Googles, calls 5 plumbers, gets voicemails, finally reaches one | 30-90 min (if lucky) |
| L1 | Agent finds 3 plumbers with "24/7 emergency" listed, texts all 3, waits for response | 20-60 min |
| L2 | Agent checks real-time availability across all plumbers, books the first available one | 5-15 min |
| L3 | Agent negotiates with 3 available plumbers' agents simultaneously on price/ETA tradeoff, books optimal | 2-5 min |
| L4 | Business agent detects demand spike (storm), pre-positions crews, auto-dispatches nearest technician with right parts | 1-3 min |

### Routine Scenario: "Get my lawn mowed weekly for the best price"

| Level | What Happens | Time to Service Booked |
|-------|-------------|----------------------|
| L0 | Consumer calls around, gets quotes, compares, calls back to book, forgets, calls again | 1-3 days |
| L1 | Agent compares structured pricing from 5 providers, recommends top 3, consumer calls to book | 2-4 hours |
| L2 | Agent compares pricing, checks availability, books the best option | 10 min |
| L3 | Agent negotiates annual contract pricing with 3 providers, gets seasonal bundle discounts, books optimal | 5 min |
| L4 | Agent has already identified the optimal provider based on consumer's property data, seasonal needs, and budget. Books, manages, and adjusts seasonally without consumer involvement | 30 sec |

---

## The Adoption Path: What Moves a Business Up Each Level

### Level 0 to Level 1 (Lowest effort, highest ROI)
- **What to do:** Create `llms.txt` and `agent-hermes.json` files with structured business data.
- **Effort:** 15-30 minutes (AgentHermes generates it from a questionnaire).
- **Cost:** Free (AgentHermes "Score It" product).
- **Impact:** The business goes from invisible to agents to fully understandable. Comparison shopping by agents now includes this business with real data instead of guesses.
- **Who should do this first:** Every local service business. There is no reason not to.

### Level 1 to Level 2 (Moderate effort, high ROI)
- **What to do:** Connect an existing scheduling system (Housecall Pro, Jobber, ServiceTitan, Calendly) to an MCP endpoint.
- **Effort:** 1-2 hours if the business already uses a supported platform. 1-2 weeks if they need to adopt one.
- **Cost:** $99-199/month (AgentHermes "Fix It" product + scheduling platform subscription).
- **Impact:** The business captures leads that would otherwise go to competitors — any consumer whose agent can book wins the job. Emergency calls convert instantly instead of going to voicemail.
- **Who should do this first:** Emergency services (plumbing, HVAC, locksmith, electrician). The emergency use case alone justifies the investment.

### Level 2 to Level 3 (Significant effort, transformative ROI)
- **What to do:** Implement a pricing rules engine, A2A negotiation support, multi-step workflow management, and payment integration.
- **Effort:** 1-3 months of setup and tuning.
- **Cost:** $299-999/month (AgentHermes "Connect It" product + custom integration).
- **Impact:** The business can compete on dimensions beyond price — flexibility, speed, bundling, loyalty. The business owner stops doing sales entirely. Every inbound lead is handled, quoted, negotiated, and booked without human intervention.
- **Who should do this first:** Businesses with 5+ technicians/crews that are losing leads to phone-tag and slow follow-up. The ROI is measured in recaptured revenue from missed calls.

### Level 3 to Level 4 (Major investment, category dominance)
- **What to do:** Full operational integration — ERP, dispatch optimization, predictive maintenance, proactive outreach, insurance coordination, multi-provider orchestration.
- **Effort:** 6-12 months of implementation and training.
- **Cost:** Custom enterprise pricing ($999-2,999/month).
- **Impact:** The business operates with 3-5x the efficiency per technician. The owner focuses on service quality and growth while the agent handles all customer acquisition, scheduling, dispatch, billing, and follow-up. This business dominates its local market.
- **Who should do this first:** Market leaders in their geography with 10+ technicians and the ambition to scale.

---

## AgentHermes Revenue Per Level

| Level | AgentHermes Product | Revenue Model | Est. Revenue/Business/Month |
|-------|--------------------|--------------|-----------------------------|
| L0 → L1 | Score It (free) → Fix It (freemium) | Free scan + $0 for basic llms.txt generation | $0 (acquisition) |
| L1 → L2 | Fix It (paid) | $99-199/mo for MCP endpoint + calendar integration | $149 avg |
| L2 → L3 | Connect It | $299-999/mo for A2A + quoting + payments | $499 avg |
| L3 → L4 | Connect It Enterprise | $999-2,999/mo for full orchestration | $1,999 avg |
| All levels | Per-call revenue | $1-10 per agent interaction routed through gateway | Variable |

**TAM for local services alone:** ~5M local service businesses in the US. If 10% reach Level 1 (500K) at $0, 5% reach Level 2 (250K) at $149/mo, 1% reach Level 3 (50K) at $499/mo, and 0.1% reach Level 4 (5K) at $1,999/mo, that is:
- Level 2: $37.3M/month = $447M/year
- Level 3: $25.0M/month = $300M/year
- Level 4: $10.0M/month = $120M/year
- **Total addressable: $867M/year from local services alone.**

Plus per-call revenue across all levels.

---

## What Makes This Framework Different From SaaS or Restaurant Readiness

| Property | SaaS | Restaurant | Local Service |
|----------|------|-----------|---------------|
| Delivery method | Digital (API/UI) | Dine-in or delivery | Human at your house |
| Pricing model | Fixed tiers | Fixed menu | Per-job estimate |
| Capacity constraint | Near-infinite | Seats/kitchen capacity | Crews x hours |
| Emergency relevance | Low (can wait) | Low (can eat elsewhere) | High (pipe burst, locked out) |
| Trust requirement | Medium (data security) | Low (worst case = bad meal) | High (stranger in your home) |
| Booking complexity | Self-serve signup | Reservation | Multi-step (diagnose → quote → approve → schedule) |
| Repeat pattern | Subscription | Occasional | Irregular but loyal (same plumber for 20 years) |
| Agent value add | Discovery + comparison | Reservation + dietary matching | Emergency dispatch + quote negotiation + multi-step coordination |
| Biggest agent unlock | Programmatic onboarding | Real-time table availability | Real-time crew availability + programmatic quoting |
| Level 4 looks like | Fully API-driven SaaS | AI-run restaurant ops | AI-dispatched service fleet |

---

## Appendix: Vertical-Specific Notes

### Emergency-First Verticals (Speed > Price)
- **Plumbing** — Burst pipes, sewage backup, gas leaks. Minutes matter. Level 2+ is life-changing.
- **HVAC** — No AC in 100-degree heat, no heat in freezing weather. Health risk for elderly/children.
- **Locksmith** — Locked out of house or car. Immediate need, high scam risk (locksmith industry has fraud problems). Trust verification at Level 1 is critical.
- **Electrician** — Power outage, sparking outlets, burning smell. Safety-critical. Licensing verification is non-negotiable.

### Routine-First Verticals (Price > Speed)
- **Lawn Care** — Weekly/biweekly service. Highly commoditized. Price and reliability are everything. Level 3 bundling is the differentiator.
- **Pool Service** — Weekly maintenance + seasonal open/close. Recurring relationship. Level 3 seasonal contract negotiation is the unlock.
- **Cleaning Service** — Recurring or one-time deep clean. Highly price-sensitive. Level 2 booking is sufficient for most.
- **Pest Control** — Quarterly preventive + emergency (termites, bed bugs). Dual-mode like plumbing but less urgent emergencies.

### High-Ticket, Complex Verticals (Trust > Speed or Price)
- **Roofing** — $8K-25K per job. Insurance coordination. Weather-event driven demand spikes. Level 3 insurance integration is the unlock. Level 4 includes storm-chasing demand prediction.
- **Painting** — Interior/exterior, $2K-15K per job. Estimate requires visual inspection. Level 2 gets the estimate visit booked; Level 3 handles the quote-to-approval flow.

---

## Key Insight: The First Local Service Business in a Market to Reach Level 2 Wins

In a market with 50 plumbers, the first one whose agent can book appointments at 2am captures every emergency call that every other plumber misses. The first lawn care company whose agent can show real-time pricing and book in 10 seconds captures the consumer who would otherwise spend 3 days getting quotes.

**Agent readiness is a competitive moat.** It is not incremental improvement. It is a step-function advantage. The plumber at Level 2 is not 10% better than the plumber at Level 0. They are categorically different. They exist in the agent's world. The Level 0 plumber does not.

This is why AgentHermes matters for local services more than any other vertical. SaaS companies will build their own agent integrations. Restaurants have OpenTable. **Local service businesses have nothing.** They need someone to build the bridge from their phone-and-truck operation to the agent economy. That bridge is AgentHermes.
