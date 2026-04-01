# Agent-Capability Maturity Levels: Restaurants, Food Service & Hospitality

> Research date: 2026-03-30
> Purpose: Define what "fully agent-capable" means for the food/restaurant/hospitality vertical, with 5 maturity levels
> Related: VERTICAL-RESEARCH.md (Section 10), VERTICAL-TAXONOMY.md (Section 8e)

---

## Why Restaurants Are Fundamentally Different

Before defining levels, we need to name the things that make food service a distinct category for agent interaction. This is NOT SaaS. The agent is not "operating" the restaurant. The agent is acting as a customer's representative, negotiating with a physical business that has real-time constraints no software company faces.

### The Seven Asymmetries

**1. Physical fulfillment, not digital delivery.**
When Stripe processes a payment, the product is delivered instantly and identically every time. When a restaurant fills an order, a human cooks food with perishable ingredients, plates it, and a server carries it to a table. The gap between "transaction confirmed" and "customer satisfied" is enormous and unpredictable.

**2. Real-time inventory that changes by the minute.**
A SaaS company never "runs out" of its product. A restaurant runs out of the halibut special at 8:47pm. The kitchen is slammed and 86s three items. The bar runs out of a specific wine. This isn't a bug -- it's the fundamental nature of the business. Any agent system that doesn't account for real-time menu volatility is useless.

**3. Human judgment is irreducible.**
"Can you accommodate a party of 12 with 2 hours notice?" is not a yes/no lookup. It depends on who's working, what's already booked, whether the kitchen can handle the volume, whether the manager wants the revenue badly enough to rearrange the floor. Agents can ask the question, but the answer requires human judgment that no API can fully automate.

**4. The experience IS the product.**
You can score Stripe's API quality by measuring response times, documentation coverage, and error handling. You cannot score a restaurant's food quality, ambiance, or service warmth by scanning its website. The thing the customer is actually buying -- the experience -- is opaque to agents. This means agents are always operating with incomplete information about the most important dimension.

**5. Two-sided agent opportunity.**
This is the big insight. In SaaS, the agent acts on one side: the customer's. In restaurants, there's a second opportunity: the restaurant itself can have an agent that handles inbound requests from customer agents. This creates an agent-to-agent (A2A) negotiation pattern that doesn't exist in most SaaS interactions. "My agent" talks to "the restaurant's agent" to work out the details of a complex reservation.

**6. Context-dependent pricing.**
SaaS pricing is on a page. Restaurant pricing is layered: the menu price, happy hour discounts, prix fixe options, wine pairings, corkage fees, private room minimums, large party surcharges, delivery fees, service charges. An agent needs to understand all of these to give a customer an honest total.

**7. Trust is local and personal.**
A SaaS tool's reputation is global (G2 reviews, Capterra scores). A restaurant's reputation is hyper-local and subjective. "Best Italian in the neighborhood" means something different to every person. Agents need to understand that restaurant recommendations require knowing the human's preferences deeply, not just scanning aggregate ratings.

---

## The Maturity Model: 5 Levels

### Guiding Principle

Each level answers three questions:
1. What has the business made available?
2. What can a customer's agent DO with what's available?
3. What still requires a human?

Levels are cumulative. A Level 3 restaurant has everything from Levels 1 and 2 plus its own additions.

---

## Level 1: Static Informational ("The Brochure")

### What the business provides
- A website with menu (possibly as a PDF or image, not structured data)
- Hours of operation (text on a page, not machine-readable)
- Address, phone number, maybe an email
- Photos of food and space
- A link to their Google Business profile
- Maybe a Facebook or Instagram page

### What an agent CAN do
- **Find** the restaurant via Google, Yelp, or directory search
- **Read** basic info: cuisine type, price range, location, hours
- **Summarize** what the restaurant offers based on website scraping
- **Recommend** the restaurant to a human based on cuisine/location match
- Answer: "Is there a Thai restaurant near me that's open past 10pm?" (from scraped hours)
- Answer: "Does this place have vegetarian options?" (from scraped menu text, unreliably)

### What an agent CANNOT do
- Make a reservation (no system to call)
- Place an order (no digital ordering)
- Check real-time availability (no API, no booking system)
- Get structured menu data (PDFs and images are not queryable)
- Determine dietary accommodation reliability (scraping "we have vegan options" is not the same as a tagged menu)
- Know current wait times, today's specials, or sold-out items

### Technical requirements
- A website (any kind)
- A Google Business profile (for hours, reviews, photos)
- That's it. This is the baseline.

### Real examples

| Business Type | Example | What it looks like |
|---|---|---|
| High-end restaurant | A Michelin-starred spot with a beautiful Squarespace site, PDF tasting menu, phone-only reservations | Agent can say "this is a $$$$ French restaurant with a 9-course tasting menu, call to reserve" but cannot book |
| Fast food chain | A local franchise with a basic site showing the menu and address | Agent knows it exists and where it is, but can't order ahead |
| Food truck | Instagram page with today's location and a photo of the menu board | Agent can find it, maybe parse the location from the post, but menu is an image |
| Catering company | A website with "contact us for a quote" and a gallery of past events | Agent can find them and summarize services, but the inquiry requires a phone call or email |
| Bar | A one-page site with the address, hours, and a list of craft beers on tap (as text) | Agent knows it exists, can say "they have 20 beers on tap" but nothing else |

### What percentage of food businesses are here today: ~60-65%
Most independent restaurants, food trucks, caterers, and bars are at this level. They have a web presence, but nothing an agent can transact with.

---

## Level 2: Platform-Intermediated ("The Aggregator Layer")

### What the business provides
- Listed on one or more platforms: OpenTable, Resy, Yelp, DoorDash, Uber Eats, Grubhub, Toast online ordering, Square Online, ChowNow, Clover
- Through these platforms: structured menu data, online ordering, reservation booking, reviews
- The business itself didn't build any of this -- the platform did

### What an agent CAN do
Everything from Level 1, plus:
- **Book a reservation** via OpenTable/Resy API (party size, date, time)
- **Place an order** via DoorDash/Uber Eats API (items, customizations, delivery address)
- **Filter the menu** by dietary tags (if the platform has tagged them -- variable quality)
- **Check availability** for reservations at specific times
- **Read verified reviews** with structured data (rating, date, reviewer, text)
- **Compare** multiple restaurants on price, cuisine, availability, delivery time, ratings
- **Track delivery** status in real time (via delivery platform)
- **Pay** through the platform's payment system

This is where most agent-restaurant interaction happens TODAY. The agent talks to OpenTable's API or DoorDash's API -- not to the restaurant directly. The restaurant is a listing on someone else's platform.

### What an agent CANNOT do
- Know real-time kitchen status (is the kitchen backed up? is the wait actually 45 minutes?)
- Handle complex requests that aren't in the platform's schema ("we'd like a birthday cake brought out at 8:30pm with the name 'Sarah' on it")
- Negotiate ("can we get the private room if we guarantee a $2,000 minimum?")
- Get wine pairing recommendations for a specific dish
- Know about unlisted specials, off-menu items, or seasonal changes not yet updated
- Communicate dietary needs with nuance ("not just gluten-free tagged, but a dedicated prep area -- my daughter has celiac")
- Understand the actual experience quality (a 4.2 on Yelp tells you very little about whether YOU will enjoy it)

### Technical requirements
- Account on at least one platform (OpenTable, DoorDash, Toast, Square, etc.)
- Menu entered into the platform's system with prices
- For reservations: capacity configured in the platform
- For delivery: delivery zone and hours set in the platform
- The agent accesses the PLATFORM's API, not the restaurant's

### Real examples

| Business Type | Example | What it looks like |
|---|---|---|
| High-end restaurant | Listed on Resy with a curated profile, prix fixe option visible, reservation slots available | Agent can book a table for 4 at 7:30pm via Resy API, but can't request the sommelier's attention or ask about dress code |
| Fast food chain | On DoorDash and Uber Eats with full menu, customization options | Agent can order a Big Mac with no pickles for delivery, track it, pay. This is actually pretty capable. |
| Food truck | On Square with online ordering, Instagram for location | Agent can place a pickup order if the truck is at a known location, but location changes daily and isn't in a structured feed |
| Catering company | Listed on ezCater or CaterTrax with menu packages and pricing | Agent can browse packages and submit an order for a 50-person lunch with 3 days notice. Customization is limited to the platform's options. |
| Bar | On Yelp with reviews, maybe on Resy for reservations | Agent can book a table, read reviews, see hours. Can't check what's on tap tonight or if there's a cover charge for the live music. |

### What percentage of food businesses are here today: ~30-35%
Chain restaurants, restaurants in major cities, and businesses that have adopted delivery platforms. Heavy overlap with Level 1 (a restaurant on DoorDash also has a website).

### The platform problem
The agent's capability here is entirely dependent on the PLATFORM, not the restaurant. If OpenTable's API is good, the agent can book well. If the restaurant's DoorDash listing hasn't been updated in 3 months, the agent will order items that don't exist. The restaurant has no direct relationship with the agent -- the platform is the middleman. This creates three issues:
1. **Data staleness**: The platform's data is only as good as the restaurant's last update
2. **Feature ceiling**: The agent can only do what the platform allows (no custom requests)
3. **Revenue leakage**: The restaurant pays 15-30% commissions to the delivery platform; agent commerce adds another intermediary

---

## Level 3: Structured & Direct ("The Digital Handshake")

### What the business provides
This is where the restaurant takes ownership of its agent-readiness. The business publishes structured, machine-readable data directly -- not just through platforms.

- **Structured menu data** in a machine-readable format (JSON, not PDF)
  - Every item has: name, description, price, category, dietary tags (vegan, GF, nut-free, etc.), allergen info, photo URL, availability flag
  - Sections mapped to meal periods (lunch, dinner, brunch, happy hour, kids)
  - Modifiers and customizations defined (extra cheese: +$2, substitute side: +$0, etc.)
  - Wine/drink menu with pairings noted
- **Reservation API** (direct, not just via OpenTable)
  - Available slots by date/time/party size
  - Special request field (birthday, anniversary, business dinner)
  - Seating preferences (outdoor, bar, private room, window)
  - Cancellation/modification policy in structured format
  - Deposit requirements for large parties
- **Online ordering API** (direct, not just via DoorDash)
  - Menu item selection with modifications
  - Delivery vs. pickup with time estimate
  - Real-time item availability (86'd items are removed)
  - Order status webhooks (confirmed, preparing, ready, out for delivery)
- **Business metadata in structured format**
  - `agent-hermes.json` or similar machine-readable business card
  - Hours by day and meal period
  - Capacity information
  - Parking, dress code, ambiance description
  - Dietary accommodation descriptions (not just tags, but "our kitchen has a dedicated gluten-free prep station")
  - Private event space with capacity and pricing
  - Average wait times by day/hour (historical data)

### What an agent CAN do
Everything from Levels 1-2, plus:
- **Query the menu with precision**: "Show me all entrees under $35 that are nut-free and can be made dairy-free" -- and get a reliable, tagged answer
- **Book directly** with the restaurant (no platform commission, no data intermediary)
- **Place complex orders** with modifications: "The lobster risotto, sub brown rice, no mushrooms, add truffle oil, with a side of the charred broccoli"
- **Check real-time availability** for items: "Is the halibut special still available?" gets a live answer because the POS integration flags 86'd items
- **Get structured wine/drink pairings**: "What wine pairs with the lamb?" returns the sommelier's recommendation with tasting notes and price
- **Understand pricing fully**: "What's the total for 2 people if we do the tasting menu with wine pairing, including tax and service?" gets an exact number
- **Handle dietary needs with nuance**: "My guest has a severe nut allergy. Not just 'no nuts in the dish' -- is there cross-contamination risk in the kitchen?" gets a meaningful answer because the restaurant has published its allergen protocols
- **Receive order status updates** in real time via webhooks (not polling DoorDash)
- **Submit special requests** that reach the restaurant directly: "Can we have a cake delivered to the table? Here's the message we'd like on it."

### What an agent CANNOT do
- Get a guaranteed answer to "can you accommodate this unusual request?" -- the request goes to a human who decides
- Negotiate pricing (private room minimum, large party pricing)
- Assess subjective quality (is the food actually good tonight? is the vibe right for a date?)
- Handle real-time disruptions ("the restaurant is unexpectedly closed due to a kitchen fire")
- Interact bidirectionally -- the agent can push requests IN, but the restaurant can't push agent-specific updates OUT (that's Level 4)

### Technical requirements
- POS integration with API access (Toast API, Square API, Clover API, or custom)
- Structured menu data maintained in a system that syncs to the POS
- Reservation system with API (or direct integration with AgentHermes-style gateway)
- Webhook capability for order status updates
- `agent-hermes.json` or equivalent machine-readable business profile
- HTTPS with proper CORS for cross-origin agent requests
- Some form of authentication for ordering/reservation APIs (API key or OAuth)

### Real examples

| Business Type | Example | What it looks like |
|---|---|---|
| High-end restaurant | A farm-to-table spot with Toast POS, structured menu with allergen tags, direct reservation API, wine list with pairing data | Agent books a table for 4 at 7:30pm, notes one guest is vegan and one has a nut allergy, requests the sommelier's attention, gets a total estimate for 4 people at the tasting menu with wine pairing: ~$720 before tip |
| Fast food chain | A Chipotle-level chain with a direct ordering API, item customization schema, real-time availability, order tracking | Agent builds a custom burrito bowl (white rice, black beans, sofritas, mild salsa, guac, no cheese, no sour cream), pays, gets a QR code for pickup in 12 minutes. Better than the DoorDash intermediary version. |
| Food truck | A popular truck with Square POS, structured menu API, and a location feed (today we're at 5th and Main, 11am-3pm) | Agent checks location, places an order for pickup, knows the truck has the Korean BBQ tacos today but is out of the kimchi fries |
| Catering company | A caterer with a structured menu of packages, customization options, real-time calendar availability, and a quote calculator | Agent submits: "50-person lunch, Oct 15, mix of Italian and Mexican, 8 vegetarian, 3 gluten-free, budget $25/head" and gets back a detailed proposal with itemized pricing in 2 seconds |
| Bar | A cocktail bar with a structured drink menu, real-time tap list API, event calendar, and reservation system | Agent books the lounge area for 8 people at 9pm, checks tonight's tap list, sees there's a jazz trio playing at 10pm, notes the $50/person minimum for reserved seating |

### What percentage of food businesses are here today: ~3-5%
Mostly tech-forward chains and restaurants with modern POS systems (Toast, Square) that happen to expose APIs. Very few independent restaurants have done this deliberately.

### The inflection point
Level 3 is where it gets interesting for AgentHermes. This is the level where our templates, MCP tool generation, and gateway services add the most value. A restaurant using Toast already HAS the data in a structured format -- they just haven't exposed it to agents. Our job is to bridge that gap: connect to their existing POS, generate the structured feeds, and make them discoverable.

---

## Level 4: Conversational & Adaptive ("The Business Has an Agent")

### What the business provides
This is the paradigm shift. The restaurant doesn't just publish data for agents to read -- it runs its own agent that can conduct multi-turn conversations with customer agents.

- **A business-side AI agent** that handles inbound requests from customer agents
  - Registered at `/.well-known/agent-card.json` (A2A protocol)
  - Declares capabilities: reservation negotiation, menu consultation, event planning, special requests
  - Can engage in multi-turn dialogue (not just request/response)
- **Real-time state awareness**
  - Connected to POS for live inventory (the agent knows the halibut is 86'd before it hits the menu update)
  - Connected to reservation book for live capacity (knows Table 12 just cancelled, freeing up a 7pm slot)
  - Connected to kitchen for prep time estimates (knows current ticket times, can say "order in 45 minutes" not "order in 20-30 minutes")
  - Connected to waitlist for live wait estimates based on actual table turns, not historical averages
- **Negotiation capability**
  - Can make decisions within parameters set by the owner/manager: "If the party is 8+ and they want the private room, minimum is $1,500. If they're booking for Tuesday, reduce to $1,000."
  - Can offer alternatives: "The private room isn't available at 7pm, but I can offer it at 8:30pm, or I can seat you in the back corner which is semi-private, at no minimum."
  - Can bundle: "If you book the tasting menu for the full table, I'll waive the corkage fee for the wine you're bringing."
- **Proactive communication**
  - Can push updates to the customer's agent: "Your table is ready 10 minutes early." "The chef prepared an amuse-bouche for your anniversary." "The kitchen is running 15 minutes behind -- your main course will be slightly delayed."
  - Can alert about changes: "The market fish changed from halibut to swordfish today." "We just opened a few slots this weekend due to a cancellation."
- **Context memory**
  - Remembers past interactions: "Welcome back! Last time you enjoyed the duck confit and the 2019 Barolo. The duck is on tonight's menu."
  - Knows customer preferences: "I see you always prefer outdoor seating and avoid shellfish."

### What an agent CAN do
Everything from Levels 1-3, plus:
- **Have a conversation with the restaurant's agent**: Not just API calls, but A2A protocol negotiation
  - Customer agent: "I need a table for 6 at 7pm Saturday. One person is vegan, one has a severe nut allergy, and it's a birthday. Is there a private space? Budget is $150/person including wine."
  - Restaurant agent: "I can seat you in the Garden Room (semi-private, seats 8) at 7pm. For $150/person I'd recommend the 5-course tasting menu ($95) with the wine pairing ($45) -- I can modify courses 2 and 4 for your vegan guest, and our kitchen has a nut-free protocol. I'll have a birthday dessert prepared. Want me to hold this?"
  - Customer agent: "The vegan guest also prefers no soy. Can course 2 be modified?"
  - Restaurant agent: "Yes, I'll substitute the soy-glazed eggplant with roasted cauliflower in herb pesto. Confirmed."
- **Negotiate complex arrangements**: Private events, custom menus, special pricing, multi-course experiences
- **Get real-time kitchen intelligence**: "How long is the wait for food right now?" gets an honest answer based on current ticket volume, not a marketing estimate
- **Receive proactive updates**: The restaurant's agent pushes information to the customer's agent without being asked
- **Build a relationship**: The restaurant's agent recognizes returning customers (via agent identity) and personalizes interactions

### What an agent CANNOT do
- Override the human judgment layer (the manager still approves large-party arrangements, the chef still decides if a modification is feasible)
- Guarantee experience quality (the food might be off tonight, the server might be having a bad day -- no agent can promise this)
- Handle truly novel situations that fall outside the restaurant's configured decision parameters
- Replace the in-person dining experience (the actual meal is still physical, human, and irreducible)

### Technical requirements
- A2A-compliant agent with agent card at `/.well-known/agent-card.json`
- MCP server exposing tools for: menu queries, reservations, ordering, special requests, event planning
- Real-time POS integration (bidirectional -- reads inventory AND pushes status)
- Decision rules engine: manager-configured parameters for what the agent can approve, negotiate, or escalate
- Customer identity system (agent-to-agent identity verification, preference storage)
- Webhook/push infrastructure for proactive notifications
- Human escalation path: when the agent can't handle a request, it routes to a human seamlessly
- LLM integration for natural language negotiation (the business agent needs to understand and generate natural language, not just match against a decision tree)

### Real examples

| Business Type | Example | What it looks like |
|---|---|---|
| High-end restaurant | A destination restaurant where the business agent acts as a virtual concierge | Customer's agent negotiates a 10-person wine dinner: custom menu, specific wines from the cellar, private room, timing coordinated with a theater show after. The restaurant agent handles all of this, checks with the sommelier via internal escalation for 2 rare wine requests, comes back with a complete proposal in under 5 minutes. |
| Fast food chain | A major chain with an ordering agent that handles drive-through-level complexity at digital speed | Customer's agent: "I need 4 different meals for my family. Two want combos, one wants a custom salad, one has celiac. All for pickup at the location near my office. What's the total and when?" Chain's agent: "Here's your order built, total $43.17, ready in 9 minutes at the 5th Ave location, your celiac meal is prepared in our allergen-safe zone. Pulling up your rewards -- you have enough points for a free drink." |
| Food truck | A truck with a lightweight agent that broadcasts location and availability | Customer's agent: "Where are you today and what do you have left?" Truck's agent: "Corner of 5th and Broadway until 2pm. Still have Korean BBQ tacos, kimchi fries, and bulgogi bowls. Running low on bulgogi -- maybe 8 portions left. If you want it, I can hold one for 15 minutes." |
| Catering company | A caterer whose agent handles multi-round event planning | Customer's agent engages in a 10-message conversation to plan a corporate retreat dinner: attendee count, dietary restrictions from an uploaded spreadsheet, venue constraints, budget, timeline, equipment needs. The caterer's agent produces a full proposal, iterates on feedback, adjusts portions, adds a dessert station, and sends a contract for review. |
| Bar | A cocktail bar with an agent that acts as a virtual bartender and host | Customer's agent: "We're a group of 6, into craft cocktails, prefer a quieter spot. Any events tonight?" Bar's agent: "Tonight is our whiskey flight night -- $35 for 5 pours with the master distiller from Woodford Reserve. I have a high-top in the back room, quieter area, available now. Want me to hold it? I can also build a custom cocktail flight based on your group's preferences if you share them." |

### What percentage of food businesses are here today: <0.1%
Essentially nobody. A few experimental deployments by tech-forward restaurant groups. This is the near-future level that AgentHermes should be enabling.

---

## Level 5: Autonomous & Ecosystem-Integrated ("The Agent-Native Restaurant")

### What the business provides
The restaurant operates as a node in an agent ecosystem. It doesn't just respond to agents -- it proactively participates in multi-business agent workflows, anticipates demand, and integrates with the broader commerce and logistics infrastructure.

- **Ecosystem participation**
  - Integrated with hotel concierge agents: "The Ritz-Carlton's agent asks: 3 guests arriving tonight, one is a VIP celebrating an anniversary. Can you do the tasting menu with a special dessert at 8pm?"
  - Integrated with event planning agents: "A wedding planner agent is assembling a rehearsal dinner. Can you provide a custom menu for 40, handle the flowers through your florist partnership, and coordinate timing with the ceremony venue's agent?"
  - Integrated with travel planning agents: "A trip-planning agent is building a 3-day dining itinerary in your city. Can you recommend your best night to visit this week, considering your specials rotation?"
- **Predictive and proactive**
  - The restaurant's agent knows it's going to have a slow Tuesday based on historical data + weather forecast + local event calendar, and proactively reaches out to customer agents who have shown interest: "We have availability Tuesday evening and the chef is running a special tasting menu at 30% off. Would your client be interested?"
  - Anticipates supply needs: sees 4 reservations with nut allergies tomorrow and alerts the kitchen to prep extra nut-free options
  - Manages its own capacity optimization: adjusts available reservation slots based on predicted no-show rates, kitchen capacity modeling, and server staffing
- **Supply chain integration**
  - Connected to food supplier agents: "We're low on the local greens for tomorrow's farm-to-table service. Can your farm fulfill a rush order of 30 lbs of mixed greens by 6am?"
  - Connected to staffing agents: "We just got a large party booking for Saturday. Can you provide 2 additional servers from 5pm-11pm?"
- **Financial integration**
  - Agent-to-agent payment settlement (Stripe ACP or equivalent)
  - Dynamic pricing based on demand (popular time slots priced higher, slow periods discounted -- communicated to customer agents transparently)
  - Loyalty programs that work across agent interactions (your agent tracks your points, the restaurant's agent honors them)
  - Split bills, corporate expense routing, and group payment coordination handled agent-to-agent
- **Quality feedback loops**
  - After-dining feedback collection via customer's agent: "How was the meal? Any notes for the kitchen?"
  - Customer agent reports back: "The risotto was undersalted, the service was excellent, the noise level was higher than expected."
  - Restaurant agent logs this, feeds it back to operations, adjusts recommendations: "Next time you visit, I'll seat you in the quieter section."
- **Regulatory compliance automation**
  - Health inspection readiness (agent monitors compliance checklist)
  - Allergen documentation automatically updated and published
  - Liquor license status and serving policies machine-readable

### What an agent CAN do
Everything from Levels 1-4, plus:
- **Orchestrate multi-business experiences**: "Plan my anniversary: dinner at Restaurant A at 7pm, then drinks at Bar B at 9:30pm, with a car service between them. Coordinate timing so we don't rush." The customer's agent talks to three business agents simultaneously, negotiates timing, and produces a unified itinerary.
- **Receive proactive offers**: The customer's agent gets a push notification: "A restaurant you loved last month has a special wine dinner next Friday. 3 seats left. Want me to book?"
- **Participate in demand shaping**: "I'm flexible on which night to eat out. Which restaurants near me have the best availability and deals this week?" The agent queries 10 restaurants' agents and returns optimized options.
- **Handle complex payment scenarios**: Corporate group dinner where one agent manages the group, another handles the company expense account, and the restaurant's agent coordinates the custom service and billing.
- **Build long-term dining profiles**: Your agent accumulates a dining preference profile across all restaurants. A new restaurant you visit gets a preference briefing from your agent: "This person prefers window seating, always orders a cocktail first, is adventurous with food but conservative with wine, doesn't like overly sweet desserts, tips 22%."
- **Dynamic re-planning**: If the restaurant's agent discovers a problem (kitchen equipment failure, key ingredient unavailable), it proactively contacts your agent with alternatives BEFORE you arrive: "The wood-fired oven is down tonight so the pizza menu is limited. I can offer the pasta tasting instead, or I've checked with [Other Restaurant] down the street and they have a table at the same time."

### What an agent CANNOT do
- Replace the irreducible human elements: the craft of cooking, the warmth of hospitality, the serendipity of a great night out
- Guarantee that the physical experience matches the digital negotiation (the food might still disappoint, the ambiance might not click)
- Handle truly unprecedented crises (a pipe burst, a power outage) without human decision-making, though it can communicate about them instantly
- Make the restaurant "good" -- all of this infrastructure amplifies a well-run restaurant but cannot compensate for bad food or bad service

### Technical requirements
Everything from Level 4, plus:
- A2A protocol compliance with full task lifecycle (submitted, working, input-required, completed, failed)
- Multi-agent orchestration: ability to participate in workflows initiated by other agents (hotel concierge, event planner, trip planner)
- Event-driven architecture: pub/sub for real-time state changes pushed to subscribed agents
- Supply chain API integrations (food suppliers, staffing, equipment)
- Dynamic pricing engine with transparent rules (agents see why a price is what it is)
- Customer preference API (read/write, with privacy controls -- the customer's agent decides what to share)
- Payment: ACP (Stripe), agent wallets, or equivalent for agent-to-agent settlement
- Analytics and feedback: structured post-experience data collection and processing
- Compliance automation: health/safety/allergen data maintained in machine-readable format

### Real examples

| Business Type | Example | What it looks like |
|---|---|---|
| High-end restaurant | A destination restaurant that's a node in the city's luxury hospitality network | The restaurant's agent collaborates with hotel agents, car service agents, and theater agents to create seamless evenings. When a hotel concierge agent says "my guest wants the best dining experience in the city tonight," the restaurant's agent evaluates its capacity, tonight's menu, the guest's known preferences, and responds with a personalized pitch -- or honestly defers to a competitor if it's not the right fit tonight. |
| Fast food chain | A national chain with fully autonomous ordering, fulfillment, and loyalty across every channel | Every location's agent is connected to supply chain, staffing, and corporate systems. If a location runs low on chicken, its agent automatically re-routes orders to nearby locations, adjusts the digital menu to de-emphasize chicken items, and alerts the supply chain agent. Customer agents interact with a unified chain agent that knows every location's real-time state. |
| Food truck | A fleet of trucks operating as an agent-coordinated network | Multiple trucks with a shared agent that optimizes locations based on real-time demand signals from customer agents ("there are 50 agents looking for lunch near the tech campus today"), event calendars, weather, and traffic. The agent moves the truck to where the demand is. |
| Catering company | An event production partner, not just a food provider | The caterer's agent integrates with venue agents, decor agents, entertainment agents, and logistics agents to produce complete events. A corporate event planner's agent sends a brief; the caterer's agent orchestrates the full production, including coordinating with the venue agent on table layout, the florist agent on centerpieces, and the AV agent on mic placement for the toast. |
| Bar | A nightlife hub that's part of an agent-orchestrated entertainment ecosystem | The bar's agent participates in city-wide nightlife coordination: "The concert at Madison Square Garden lets out at 10:30pm. Based on ticket sales, I'm expecting a surge of 200-300 people looking for post-show drinks. I'll extend my kitchen until midnight, bring in extra staff, and prepare a special cocktail themed to the artist." Customer agents that attended the show get a proactive offer: "Post-show drinks, 2-minute walk from MSG, special menu tonight." |

### What percentage of food businesses are here today: 0%
This does not exist yet. This is the vision for 2028-2030. But the technical building blocks (A2A, MCP, ACP, agent identity) are being laid now.

---

## Summary Matrix

| Dimension | Level 1: Brochure | Level 2: Platform | Level 3: Direct | Level 4: Business Agent | Level 5: Ecosystem |
|---|---|---|---|---|---|
| **Data format** | Unstructured (HTML, PDF, images) | Platform-structured (OpenTable, DoorDash schemas) | Self-published structured data (JSON, API) | Real-time state + conversational | Predictive + cross-business |
| **Agent interaction** | Scrape and summarize | Call platform API | Call business API | A2A conversation | Multi-agent orchestration |
| **Reservation** | "Call to reserve" | Book via platform | Book via direct API | Negotiate via agent dialogue | Auto-coordinated with other venues |
| **Menu query** | Parse website text | Filter platform data | Query structured menu API | Ask business agent for recommendations | Agent knows your preferences and cross-references |
| **Ordering** | Not possible | Via delivery platform | Direct with modifications | Conversational ordering with negotiation | Anticipatory (agent suggests before you ask) |
| **Real-time info** | None | Platform-mediated (often delayed) | Direct POS connection | Live kitchen/floor state | Predictive modeling |
| **Special requests** | Phone call | Platform comment field | API field, human reviews | Agent negotiation, decision within parameters | Agent handles and coordinates with other agents |
| **Payment** | In person | Through platform | Direct API (Stripe, Square) | Agent-to-agent (ACP/SPT) | Multi-party settlement |
| **Personalization** | None | Platform profile | Business CRM | Agent memory + preference sharing | Cross-restaurant dining profile |
| **% of businesses today** | ~60-65% | ~30-35% | ~3-5% | <0.1% | 0% |

---

## The Agent-to-Agent Negotiation Pattern (Deep Dive)

The most important concept in this document is the Level 4 pattern where a customer's agent talks to a restaurant's agent. This deserves its own analysis because it's the pattern that makes restaurants DIFFERENT from SaaS.

### Why agent-to-agent matters for restaurants

In SaaS, the transaction is deterministic. "Create a Stripe subscription at $49/month" either works or it doesn't. There's nothing to negotiate.

In restaurants, the transaction is negotiated. Every reservation involves implicit negotiation: the customer wants the best table, the restaurant wants to maximize capacity. Every special request involves judgment: can we do this? should we? how much should we charge?

Today, this negotiation happens between humans: the customer calls, the host answers, they work it out. Agent-to-agent replaces this with a faster, more information-rich version of the same conversation.

### Example: A complex dinner negotiation

**Without agents (today):**
1. Customer calls restaurant (3-minute hold)
2. "Hi, I need a table for 8 on Saturday at 7pm"
3. "Let me check... we have 7:30 or 8pm"
4. "7:30 works. Also, one person is vegan, one has a nut allergy, and it's a birthday"
5. "I'll note that. For the allergy, let me check with the kitchen..." (another hold)
6. "Our chef says we can accommodate both. Would you like to pre-order the birthday cake?"
7. "Yes. Also, is there a private area?"
8. "We have a semi-private section. No minimum for a party of 8."
9. "Great. And can we bring our own wine? Is there a corkage fee?"
10. "Corkage is $30 per bottle, limit 2 bottles."
11. Total time: 12-15 minutes. One phone call. Many restaurants won't even go this deep.

**With agents (Level 4):**
1. Customer's agent sends a structured request to restaurant's agent (A2A task):
```
{
  "type": "reservation_request",
  "party_size": 8,
  "preferred_date": "2026-04-04",
  "preferred_time": "19:00",
  "flexibility": "30_minutes",
  "dietary": [
    { "guest": "Guest 3", "type": "vegan", "severity": "preference" },
    { "guest": "Guest 5", "type": "nut_allergy", "severity": "severe" }
  ],
  "occasion": "birthday",
  "birthday_person": "Guest 1",
  "seating_preference": "private_or_semi_private",
  "byo_wine": { "requested": true, "bottles": 2 },
  "budget_per_person": 120,
  "special_requests": ["Birthday dessert with candles", "Prefer to be seated by 7:15 to allow pre-dinner drinks"]
}
```
2. Restaurant's agent processes in <3 seconds:
```
{
  "status": "available_with_options",
  "options": [
    {
      "time": "19:00",
      "seating": "Garden Room (semi-private, seats 10)",
      "menu_note": "Full menu available. Vegan modifications available for 4 dishes. Kitchen has nut-free protocol — separate prep area, dedicated utensils.",
      "birthday": "Complimentary birthday dessert included. Custom message available — send text.",
      "corkage": "$30/bottle, limit 2. Waived if you order 2+ bottles from our list.",
      "estimated_total": "$960 (8 × $120) before corkage and BYO wine",
      "deposit": "None required for party of 8",
      "confirmation_hold": "15 minutes"
    }
  ],
  "alternatives": [
    { "time": "19:30", "seating": "Main dining, round table for 8 (not private)" }
  ]
}
```
3. Total time: under 10 seconds. More detail than the phone call. Customer's agent presents the options to the human. Human says "book the 7pm Garden Room." Done.

### What the restaurant's agent needs to know to do this

This is the critical question. The restaurant's agent isn't magic -- it needs:

1. **Seating map + capacity rules**: Which sections seat which party sizes, which are private, what the minimums are
2. **Dietary protocol knowledge**: What the kitchen can and cannot do, severity levels, cross-contamination policies
3. **Pricing rules**: Corkage fees, deposit thresholds, large party policies, comp policies (birthday dessert)
4. **Real-time availability**: Not just "is a table open?" but "which specific table/section is open?"
5. **Decision authority**: What can the agent approve vs. what needs manager approval? (e.g., waiving corkage might be auto-approved under certain conditions, but offering a 20% discount on a slow night might need human sign-off)
6. **Historical context**: Has this customer (or their agent) booked before? What happened?

Most of this information already exists in the restaurant manager's head. The challenge of Level 4 is externalizing it into a structured system.

---

## The "86'd" Problem: Real-Time Inventory in Food Service

One of the hardest technical problems in restaurant agent-readiness is real-time menu availability. In software, the product is always available. In food service, the product literally runs out.

### How restaurants track this today
- The kitchen calls out "86 the halibut" and the servers verbally pass it on
- Maybe someone updates the POS to remove the item (often delayed by 10-30 minutes)
- Delivery platforms might still show the item for hours after it's gone
- Customers order it, get disappointed, and lose trust

### What agent-readiness requires
- POS integration that flags 86'd items within seconds
- The business agent immediately stops offering the item
- Customer agents that have already been told about the item get a proactive update: "The halibut I mentioned is no longer available. The swordfish is a similar preparation and the chef recommends it."
- The menu API reflects current availability, not what was true when the kitchen opened

### Why this is Level 3+ only
Levels 1 and 2 cannot solve this. A scraped website menu is static. A DoorDash listing is updated by a human (lag time: minutes to hours). Only a direct POS integration (Level 3) or a business agent (Level 4) can provide this in real time.

---

## What AgentHermes Should Build

Based on this maturity model, AgentHermes's restaurant product strategy should focus on moving businesses from Level 1/2 to Level 3, with a path to Level 4.

### Immediate (Level 2 → 3 bridge)
1. **POS adapters**: Toast, Square, Clover, SpotOn. Connect to the restaurant's existing POS and extract structured menu data, pricing, and availability.
2. **Menu structuring tool**: Take an unstructured menu (PDF, image, website) and convert it to structured JSON with dietary tags, allergens, modifiers, and pricing.
3. **Reservation API wrapper**: Connect to OpenTable/Resy/direct systems and expose a unified reservation tool.
4. **`agent-hermes.json` generator**: Auto-generate the machine-readable business card from existing data.

### Medium-term (Level 3 → 4 enablement)
5. **Business agent template**: A configurable agent that a restaurant can deploy to handle inbound agent requests. Pre-built with: menu queries, reservation handling, special request routing, dietary accommodation responses.
6. **Decision rules editor**: A UI where the restaurant manager sets parameters: "Auto-approve private room for parties of 6+. Corkage waived if ordering 2+ bottles. Birthday dessert always complimentary. Anything over $5,000 total -- text me for approval."
7. **A2A registration**: Register the restaurant's agent card at `/.well-known/agent-card.json` so customer agents can discover and negotiate with it.

### Revenue model for restaurants
| Tier | Price | What they get |
|---|---|---|
| Free | $0 | Level 2 listing (structured data scraped from existing platforms) |
| Starter | $49/mo | Level 3 (POS adapter, structured menu, basic MCP tools) |
| Pro | $149/mo | Level 3+ (direct reservation API, ordering API, real-time availability) |
| Agent-Ready | $299/mo | Level 4 (business agent, A2A negotiation, proactive updates, decision rules) |

### Volume economics
- 1M+ restaurants in the US
- If 5% adopt at $99/mo average: $59M ARR
- If 1% of those go to Level 4 at $299/mo: $3.6M additional ARR
- Per-transaction revenue from agent-facilitated reservations/orders: $1-5 per transaction
- At 100 transactions/mo per restaurant across 50,000 restaurants: $60M-300M/yr in per-transaction fees

---

## Appendix: How This Differs from Other Verticals

| Factor | SaaS | Restaurant | Why it matters |
|---|---|---|---|
| Product delivery | Instant, digital, identical | Physical, variable, time-bound | Agent can't verify fulfillment |
| Inventory | Unlimited | Finite and perishable | Real-time state is critical |
| Pricing | Published and fixed | Layered and negotiable | Agent needs full context |
| Quality assessment | Measurable (uptime, speed) | Subjective (taste, ambiance) | Agent operates on incomplete info |
| Transaction type | Deterministic (API call) | Negotiated (conversation) | A2A > simple API |
| Customer relationship | Account-based | Visit-based | Personalization requires memory |
| Failure mode | Error code + retry | Disappointed human | Higher stakes per interaction |
| Agent opportunity | One-sided (customer agent) | Two-sided (customer + business agent) | 2x the product surface |
| Platform dependency | Low (direct APIs) | High (OpenTable, DoorDash) | Disintermediation opportunity |
| Real-time requirement | Low (state changes slowly) | High (state changes by the minute) | Webhook/push infrastructure needed |

---

## Key Takeaway

"Fully agent-capable" for a restaurant means Level 4: the restaurant has its own agent that can conduct natural-language negotiations with customer agents, backed by real-time POS data, configurable decision rules, and proactive communication. This is fundamentally different from SaaS agent-readiness because the transaction is a negotiation, not a deterministic API call.

The path to get there is: structured data (Level 3) first, then business agent (Level 4). AgentHermes's role is to make this path as easy as possible -- take a restaurant from Level 1 (a website with a PDF menu) to Level 4 (an AI agent that handles reservations, answers dietary questions, negotiates private events, and remembers returning customers) with minimal effort from the restaurant owner.

The restaurant doesn't need to become a tech company. It needs a bridge between its existing operations (POS, reservation book, kitchen knowledge) and the agent economy. That bridge is the product.
