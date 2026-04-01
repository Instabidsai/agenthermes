# Agent Capability Maturity Model for Healthcare

> Research date: 2026-03-30
> Purpose: Define what "fully agent-capable" means for healthcare businesses (doctors, dentists, telehealth, pharmacy, mental health, specialists), with 5 maturity levels from the agent's perspective
> Companion to: VERTICAL-TAXONOMY.md (Healthcare vertical at 3.5/10 average readiness), VERTICAL-RESEARCH.md (Dentist vertical #9), LEVELS-SAAS.md (SaaS maturity model this document parallels)
> Key difference from SaaS: Healthcare is the most regulation-constrained vertical in the economy. Every level has a legal ceiling that does not exist in SaaS.

---

## The Core Question

An AI agent needs to interact with a healthcare business on behalf of a patient. What does that journey look like, and where does the law draw hard lines?

This document defines 5 maturity levels by answering, at each level: what can the agent do, what is blocked (by technology AND by law), and what does the business need to implement? Every level is examined through the lens of the **6-step agent journey** that AgentHermes scores against: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY.

Healthcare is unique because there are things an agent will NEVER be able to do regardless of maturity level. The ceiling is not technology — it is law. This document is honest about those ceilings.

---

## The Regulatory Landscape (Must-Read Before the Levels)

Every level in healthcare operates under these constraints. They do not go away at higher levels — they get managed more elegantly.

### HIPAA (Health Insurance Portability and Accountability Act)

- **Protected Health Information (PHI):** Any individually identifiable health information — name, DOB, SSN, medical record number, diagnoses, treatment, payment history. An agent that handles ANY of this is a HIPAA-covered entity or business associate.
- **Business Associate Agreement (BAA):** Any agent platform that touches PHI MUST have a signed BAA with the healthcare provider. No BAA = federal crime, not just a terms-of-service violation. Fines: $100 to $50,000 per violation, up to $1.5M per year per violation category.
- **Minimum Necessary Rule:** An agent must only access the minimum PHI needed for the specific task. An agent booking a dental cleaning does not need the patient's full medical history.
- **Breach Notification:** If an agent platform is compromised and PHI is exposed, the provider must notify affected patients within 60 days, notify HHS, and if 500+ patients are affected, notify the media. The agent platform is jointly liable.
- **Right of Access:** Patients can request their data. An agent acting on the patient's behalf has the right to request the patient's data — but ONLY with verifiable patient authorization.
- **What this means for AgentHermes:** We CANNOT be a pass-through for PHI without a BAA infrastructure. Our scoring and remediation tools can operate on public business data (hours, services, insurance accepted), but the moment an agent books an appointment with patient name + DOB + insurance member ID, we are in BAA territory.

### State Licensing Laws

- Healthcare providers must be licensed in the state where the PATIENT is located (not where the provider is). A telehealth provider in California cannot treat a patient in Texas without a Texas license (with some interstate compact exceptions).
- An agent booking a telehealth visit must verify that the provider is licensed in the patient's state. This is not a nice-to-have — it is a legal requirement.
- **Interstate Medical Licensure Compact (IMLC):** 41 states participate, making multi-state licensing easier for physicians. The Psychology Interjurisdictional Compact (PSYPACT) covers 43 states for psychologists. Dental has no equivalent compact.

### Prescribing and Controlled Substances

- **An agent CANNOT prescribe medication.** Period. Only a licensed provider with a valid DEA registration can prescribe.
- **Controlled substances (Schedule II-V):** Prescriptions for opioids, stimulants, benzodiazepines, etc. require an in-person visit in many states (DEA rule updated in 2025 to allow some telehealth prescribing for Schedule III-V, but Schedule II still requires in-person in most cases).
- **What an agent CAN do:** Refill a non-controlled prescription that a provider has already authorized. Transfer a prescription between pharmacies. Compare prices. Request a provider review a refill.
- **What an agent CANNOT do:** Initiate a new prescription. Change dosage. Authorize a controlled substance refill. Override a "prescriber approval required" hold.

### Diagnosis

- **An agent CANNOT diagnose.** An agent can collect symptoms, perform triage (severity assessment), and route the patient to the appropriate care level (ER vs. urgent care vs. telehealth vs. schedule appointment). But the agent cannot say "you have strep throat" — only a licensed provider can diagnose.
- **Triage vs. diagnosis:** "Your symptoms (high fever, throat pain, swollen glands) are consistent with conditions that typically require medical evaluation within 24 hours" is triage. "You have strep throat" is diagnosis. The line matters legally.

### Emergency Protocol

- Every healthcare agent MUST have a hard-coded emergency protocol:
  - If the patient reports chest pain, difficulty breathing, severe bleeding, suicidal ideation, stroke symptoms (FAST: face drooping, arm weakness, speech difficulty, time to call 911), loss of consciousness, or severe allergic reaction: the agent MUST immediately say "Call 911 or go to the nearest emergency room" and STOP trying to book appointments.
  - This is not negotiable. An agent that tries to "find an available appointment" for a heart attack is a liability nightmare.
  - Suicidal ideation: the agent must provide the 988 Suicide and Crisis Lifeline number (call/text 988) in addition to 911 guidance.

### Consent for AI Agent Interaction

- **Patient consent is required** for sharing health information with an AI agent. This is both a HIPAA requirement and an emerging regulatory standard.
- The consent must be: (1) informed (the patient knows their data is being processed by AI), (2) specific (what data is being shared and for what purpose), (3) revocable (the patient can withdraw consent at any time).
- **Practical implication:** Before an agent can interact with a healthcare provider on a patient's behalf, the patient must have explicitly authorized the agent to act for them. This is not implied by "using the app."
- **21st Century Cures Act / Information Blocking Rule:** Providers cannot block patient access to their own data. If a patient authorizes an agent to retrieve their records, the provider must comply (via FHIR APIs). But the authorization must be verified.

### Insurance: The #1 Friction Point

- Insurance verification is the single most impactful thing an agent can do in healthcare. Patients spend hours on the phone verifying coverage. Providers spend 15-30 minutes per patient on hold with insurance companies.
- **What makes insurance verification hard for agents:**
  - 900+ insurance carriers in the US
  - Each carrier has different plan structures (HMO, PPO, EPO, POS, HDHP, Medicare Advantage, Medicaid managed care)
  - In-network vs. out-of-network varies by provider, location, AND procedure
  - Copays, deductibles, coinsurance, and out-of-pocket maximums are plan-specific
  - Prior authorization requirements vary by procedure AND carrier AND plan
  - Real-time eligibility checking exists (EDI 270/271 transactions via clearinghouses like Availity, Change Healthcare, Trizetto) but access requires enrollment with each payer
- **What an agent CAN do today:** Check if a provider accepts a given insurance carrier (public info on most provider websites). What it CANNOT do easily: verify specific plan benefits, remaining deductible, or prior auth requirements in real-time.

---

## The 5 Levels

| Level | Name | One-Line Definition | Real-World Analogy |
|-------|------|--------------------|--------------------|
| **L0** | Dark | The agent cannot find or interact with the healthcare provider at all | A doctor's office with no website, no online presence, call-only |
| **L1** | Visible | The agent can find the provider, read services/insurance/hours, but cannot act | A practice with a nice website but "call to schedule" is the only option |
| **L2** | Bookable | The agent can check availability, verify insurance acceptance, and book appointments via structured interfaces | An office with online scheduling that an agent can operate — but a human patient still manages their own care |
| **L3** | Coordinated | The agent can manage the full patient-provider relationship: book, reschedule, handle insurance, manage prescriptions, coordinate referrals, and track care — all with patient consent and HIPAA compliance | A healthcare concierge that handles everything except the actual medical decisions |
| **L4** | Integrated | The agent is a first-class participant in the healthcare system: accessing patient records (FHIR), coordinating across providers, participating in care plans, submitting claims, and operating as a recognized entity with verifiable identity and trust | A licensed healthcare navigator with full system access, operating at machine speed across the entire care continuum |

---

## Level 0: Dark

### What the business provides at this level

Nothing agent-accessible. The practice has either no website or a minimal website with no structured data. Scheduling is by phone only. Insurance information is "call and ask." The practice management system (if any) is entirely internal with no patient-facing digital interface. This is the state of approximately 30-40% of US healthcare providers today, concentrated in solo practices, rural clinics, and older practitioners.

### What an agent CAN do

- Find the practice via Google Maps or web search (if any online presence exists)
- Extract phone number and address from unstructured web content
- Read Google/Yelp reviews for reputation signals
- Determine rough specialty from directory listings (NPI Registry is searchable)

### What an agent CANNOT do

- Determine which insurance plans are accepted
- Check availability for appointments
- Book any appointment
- Determine services offered with any specificity
- Access any patient data
- Submit or verify insurance eligibility
- Determine if the provider is accepting new patients

### Technical requirements to reach this level

None. This is the default state.

### The 6-step journey at L0

| Step | Status | Detail |
|------|--------|--------|
| FIND | Partial | Google Maps might surface basic info. NPI Registry gives name + specialty. No structured discovery. |
| UNDERSTAND | Failed | No machine-readable services, insurance, or capability data. |
| SIGN UP | Failed | No patient portal. No online intake forms. |
| CONNECT | Failed | No API, no structured interface of any kind. |
| USE | Failed | Zero programmatic operations. Agent must call the phone number. |
| PAY | Failed | Payment is at the front desk or by mailed invoice. |

### Real examples at L0

- **Solo practitioner psychiatrist** who accepts patients by referral, has a Psychology Today listing and nothing else. No website, no portal, scheduling by phone only.
- **Small-town dental office** with a Facebook page as their only web presence. Hours posted as a JPEG image. "Call for appointment."
- **Independent pharmacy** with a GoDaddy template site that lists address and phone. No prescription transfer capability, no price information, no online refills.

### What percentage of healthcare is here today?

Roughly 30-40% of healthcare providers. This is concentrated in:
- Solo and small group practices (1-3 providers)
- Rural and underserved areas
- Older practitioners nearing retirement
- Practices that rely entirely on referral networks
- Independent pharmacies in small communities

This is a MUCH higher percentage than SaaS (5-10% at L0). Healthcare's L0 problem is massive.

---

## Level 1: Visible

### What the business provides at this level

The practice has a professional website with structured, accurate information. An agent can determine: what services the practice offers, which insurance carriers are accepted, hours of operation, provider bios with specialties, whether new patients are accepted, and what languages are spoken. The practice may have a patient portal (MyChart, Athena, NextGen), but it is designed for humans and requires manual account creation. There is no API, but the information is machine-parseable from the website.

This is the most common state for modern healthcare practices. They invested in a web presence but scheduling is still "call us" or "fill out this contact form."

### What an agent CAN do

- Discover the provider via web search, NPI Registry, or insurance carrier directory
- Read services offered with descriptions (preventive, diagnostic, surgical, etc.)
- Determine which insurance carriers and plan types are accepted
- Check hours of operation and location(s)
- Read provider bios: specialties, board certifications, education, languages
- Determine if the practice accepts new patients
- Read self-pay/cash pricing (if published — increasingly common due to the Hospital Price Transparency Rule and No Surprises Act)
- Evaluate the provider against patient criteria (specialty match, insurance match, proximity, availability indicators)

### What an agent CANNOT do

- Check real-time appointment availability
- Book an appointment
- Submit insurance eligibility verification
- Access any patient records
- Fill out intake forms programmatically
- Determine specific copay/deductible for the patient's plan
- Request prescription refills
- Coordinate referrals

### Technical requirements

1. **Professional website** with parseable content (not all images/PDFs)
2. **Insurance accepted list** — structured, not buried in a PDF or image. Ideally: carrier name + plan types (PPO, HMO, etc.)
3. **Services page** with individual service descriptions, ideally with self-pay pricing
4. **Provider directory** with name, specialty, certifications, languages, new-patient status
5. **Hours and locations** in structured/parseable format
6. **Schema.org markup** — `MedicalBusiness`, `Physician`, `Dentist`, `Pharmacy` types with structured data
7. **NPI Registry accuracy** — National Provider Identifier listing is up-to-date and matches website
8. **Google Business Profile** — claimed, verified, with accurate hours/services/insurance
9. **Optional but valuable:** Published pricing (compliant with Hospital Price Transparency Rule for facilities), llms.txt, agent-card.json with healthcare-specific fields

### The 6-step journey at L1

| Step | Status | Detail |
|------|--------|--------|
| FIND | Pass | Structured web presence, NPI Registry, Google Business Profile, carrier directories. |
| UNDERSTAND | Pass | Agent can determine services, insurance, providers, hours, pricing. |
| SIGN UP | Failed | Patient portal requires manual account creation with identity verification. |
| CONNECT | Failed | No API. No programmatic access to scheduling or patient systems. |
| USE | Failed | Agent can inform but not act. "This dentist takes your insurance and has a slot tomorrow" but cannot book it. |
| PAY | Failed | No programmatic payment. Copay at front desk or portal-only. |

### Real examples at L1

- **Modern dental group** (Aspen Dental, Gentle Dental) with a polished website listing all services, accepted insurance, provider bios, and locations. Booking is "Request an Appointment" web form (not real-time scheduling).
- **Multi-location urgent care** (CityMD, MedExpress) with wait times displayed on the website (informational only), services listed, insurance accepted. Walk-in only, no scheduled appointments.
- **Chain pharmacy** (CVS, Walgreens) with store locator, pharmacy hours, vaccine availability, and prescription transfer phone number. Some digital presence but refills require patient portal login.
- **Mental health directory listing** on Psychology Today, Zencare, or Alma — provider profile with specialty, insurance, modalities, availability description. But booking still requires contact via the platform's messaging system, not programmatic scheduling.

### What percentage of healthcare is here today?

Roughly 35-40% of healthcare providers. This includes:
- Most multi-provider practices and group practices
- Hospital-affiliated physician offices (they inherit the hospital system's web infrastructure)
- Chain dental, urgent care, and pharmacy locations
- Therapists on directory platforms (Psychology Today, Alma, Headway)
- Practices using modern website builders with healthcare templates

### What is unique to healthcare at L1

**Insurance accepted is the killer feature.** In SaaS at L1, the agent reads API docs and pricing. In healthcare at L1, the single most valuable piece of structured data is the insurance accepted list. An agent that can reliably determine "this provider accepts Blue Cross Blue Shield PPO" eliminates the #1 friction point in healthcare. Even at L1, this alone is enormously valuable.

**Provider matching is multidimensional.** Unlike SaaS where the agent evaluates one product against criteria, healthcare requires matching across: specialty, subspecialty, insurance, location, availability, gender preference, language, age focus (pediatric vs. geriatric), treatment approach (for mental health), hospital affiliation, and board certification. An L1 provider that publishes all of these dimensions is significantly more agent-useful than one that lists only name and phone.

**Price transparency laws are creating L1 data by force.** The Hospital Price Transparency Rule (effective Jan 2021) requires hospitals to publish machine-readable pricing files. The No Surprises Act (effective Jan 2022) requires good faith estimates for uninsured/self-pay patients. These regulations are literally creating the structured data that agents need at L1, whether providers want to or not.

---

## Level 2: Bookable

### What the business provides at this level

The practice has real-time online scheduling that an agent can operate programmatically. Insurance verification is automated or semi-automated. The patient portal allows intake form submission. The practice uses a scheduling platform with an API (Zocdoc, NexHealth, Healthie, SimplePractice, or EHR-native scheduling like Epic MyChart, Athena Patient Portal).

L2 is the breakthrough for patient experience. The agent can actually DO something — it can book an appointment. But the patient still manages their own care journey. The agent books one appointment at a time, for one provider, at one practice. There is no cross-provider coordination, no prescription management, no care plan tracking.

**Critical L2 distinction from SaaS:** In SaaS at L2, the agent operates the product after a human does initial setup. In healthcare at L2, the "product" IS the appointment/service, and the agent is acting on behalf of a patient-consumer. The consent and authorization model is fundamentally different.

### What an agent CAN do

- Check real-time availability by provider, date, time, appointment type
- Book appointments with structured data (patient name, DOB, appointment type, insurance)
- Submit basic insurance verification (carrier + plan type + member ID) and get acceptance confirmation
- Fill out digital intake forms programmatically (demographics, insurance, medical history basics)
- Cancel or reschedule existing appointments
- Receive appointment confirmations and reminders
- Compare availability across multiple providers within a practice
- Check wait times for walk-in/urgent care facilities
- For pharmacies: submit prescription refill requests, check order status
- For telehealth: book video visits, receive join links

### What an agent CANNOT do

- Access the patient's medical records or visit notes
- Coordinate care across multiple providers or practices
- Manage a patient's complete prescription portfolio
- Submit insurance claims or handle billing disputes
- Request or track prior authorizations
- Transfer medical records between providers
- Determine specific out-of-pocket costs with certainty (copay/deductible calculations require real-time eligibility data the agent may not have)
- Initiate referrals to specialists
- Act without explicit patient consent for each interaction

### Technical requirements

Everything from L1, plus:

1. **Real-time scheduling API** — either direct (EHR API) or via scheduling platform:
   - `GET /availability` — returns available slots by provider, date range, appointment type
   - `POST /appointments` — books appointment with patient demographics + insurance + type
   - `PATCH /appointments/{id}` — reschedule
   - `DELETE /appointments/{id}` — cancel
   - Scheduling platforms that provide this: Zocdoc API, NexHealth API, Healthie API, SimplePractice API, Acuity API, Calendly Health (HIPAA-compliant tier)

2. **Insurance verification interface** — at minimum, structured acceptance checking:
   - `GET /insurance/accepted` — list of accepted carriers and plan types
   - `POST /insurance/verify` — submit member ID + DOB + carrier for real-time eligibility (via clearinghouse: Availity, Change Healthcare, or Trizetto)
   - Returns: eligible (yes/no), copay estimate, deductible remaining, prior auth required (yes/no)

3. **Patient intake API** — digital forms that can be completed programmatically:
   - `POST /patients/intake` — submit demographics, insurance, medical history, consent forms
   - Must support: e-signature for consent (HIPAA authorization, financial responsibility, etc.)
   - Must enforce: identity verification before PHI access

4. **HIPAA-compliant transport** — TLS 1.2+ on all endpoints, PHI encrypted at rest, audit logging on every data access, BAA with the scheduling/intake platform

5. **Consent management** — explicit patient authorization for agent interaction:
   - `POST /consent/agent-authorization` — patient authorizes a specific agent to act on their behalf
   - Consent must specify: scope (scheduling only, insurance only, full coordination), duration, revocability
   - Must be verifiable by the provider (not just the agent's claim)

6. **Emergency detection** — the scheduling system must handle emergency routing:
   - If the agent submits symptoms indicating emergency, the system returns a hard-stop with emergency instructions rather than offering appointment slots

### The 6-step journey at L2

| Step | Status | Detail |
|------|--------|--------|
| FIND | Pass | Same as L1, plus discoverable via scheduling platform (Zocdoc, etc.). |
| UNDERSTAND | Pass | Services, insurance, providers, AND real-time availability. |
| SIGN UP | Partial | Agent can submit intake forms and create patient record, but identity verification may still require human step. |
| CONNECT | Pass* | Agent can interact with scheduling and insurance APIs. *Requires patient consent token. |
| USE | Pass | Agent can book, reschedule, cancel. Can verify insurance. Can submit intake. |
| PAY | Partial | Copay can be collected at booking if the system supports it. Full billing still provider-managed. |

### Real examples at L2

**Telehealth platforms (the L2 leaders):**
- **Zocdoc** — the closest thing to L2 in healthcare today. Real-time availability across 100K+ providers, insurance filtering, online booking. API exists but is not public (partner-only). If Zocdoc opened its API, it would instantly become the Stripe of healthcare scheduling.
- **Teladoc / Amwell / MDLive** — online booking for video visits, insurance verification at checkout, digital intake. Approaching L2 but most interaction is still via their own consumer apps, not open APIs.
- **Hims/Hers** — subscription model with online intake, provider matching, prescription management. Close to L2 for their specific use cases (dermatology, sexual health, mental health). No open API.

**Dental:**
- **NexHealth** (patient engagement platform used by ~15,000 dental/medical practices) — has a REST API for scheduling, patient intake, and messaging. This is one of the most agent-ready interfaces in healthcare. Practices using NexHealth are closest to L2.
- **Dental Intelligence / Weave** — practice management platforms with some API access, primarily for internal use rather than patient-facing agents.

**Pharmacy:**
- **Amazon Pharmacy** — prescription management, price comparison, delivery scheduling. Approaching L2 within Amazon's ecosystem. No public API.
- **Capsule / Alto Pharmacy** — digital-first pharmacies with delivery, SMS-based interaction, and some programmatic interfaces. Close to L2.

**Mental health:**
- **Headway / Alma / Grow Therapy** — platforms that handle insurance credentialing for therapists AND provide patient-facing booking. Approaching L2 with insurance-first matching and online scheduling.
- **BetterHelp / Talkspace** — subscription platforms with therapist matching and scheduling. Operate as closed ecosystems, not open APIs.

### What percentage of healthcare is here today?

Roughly 15-20% of healthcare providers, heavily concentrated in:
- Telehealth platforms (virtually all are L2-capable within their own platforms)
- Dental and medical practices using NexHealth, Zocdoc, or similar scheduling platforms
- Digital-first pharmacies (Amazon, Capsule, Alto)
- Mental health platforms (Headway, Alma, BetterHelp)
- Large health systems with Epic MyChart or Athena patient portals

The critical gap: most of these L2 capabilities exist WITHIN closed platforms, not as open APIs that any agent can call. Zocdoc has L2 capability but no public API. Epic MyChart has L2 capability but requires institutional agreements. The technical capability exists; the openness does not.

### What is unique to healthcare at L2

**Insurance verification is the L2 unlock, not scheduling.** In SaaS, L2 is "the agent can use the product." In healthcare, the agent could book an appointment at L1 via a web form. What makes L2 transformative is INSURANCE VERIFICATION — the agent can tell the patient "your copay will be $35 and you have $1,200 remaining on your deductible" BEFORE booking. This eliminates surprise bills and is the #1 reason patients would trust an agent with healthcare.

**Consent creates a double authentication problem.** In SaaS, the agent authenticates with an API key. In healthcare, the agent needs TWO layers: (1) its own identity/credentials to access the system, and (2) verifiable proof that the patient authorized this specific interaction. This "agent-on-behalf-of-patient" pattern does not exist in most other verticals.

**The agent must know what it cannot do.** At L2, the agent books appointments and verifies insurance. But it must actively refuse to: triage beyond basic routing, suggest diagnoses, recommend specific medications, or override provider judgment. The "cannot do" list is as important as the "can do" list — and must be enforced technically, not just documented.

**Appointment types carry clinical meaning.** In SaaS, a "meeting" is a meeting. In healthcare, "new patient visit" vs. "established patient visit" vs. "annual physical" vs. "sick visit" vs. "procedure" determines: duration, preparation required, fasting requirements, what to bring, and insurance coverage. The agent must understand these distinctions to book correctly.

---

## Level 3: Coordinated

### What the business provides at this level

The healthcare business (or more accurately, a connected platform of businesses) enables an agent to manage the FULL patient-provider relationship. The agent is not just booking individual appointments — it is coordinating care across the patient's healthcare journey. It handles referrals, tracks prescriptions, manages insurance across providers, and maintains a longitudinal view of the patient's care.

L3 requires interoperability between systems. A single dental office cannot be L3 on its own — L3 emerges when the dental office, the insurance company, the specialist it refers to, and the pharmacy are all connected through APIs that an agent can orchestrate.

**This is the level that would eliminate 80% of healthcare administrative burden.** The average US patient spends 8+ hours per year on healthcare administration (scheduling, insurance calls, prescription management, referral tracking, billing disputes). An L3 agent handles all of it.

**Critical L3 distinction from SaaS:** In SaaS at L3, the agent self-onboards and manages its own lifecycle. In healthcare at L3, the agent is never the customer — it is always acting on behalf of a patient. The "autonomy" is in care coordination, not in self-provisioning.

### What an agent CAN do

Everything from L2, plus:

- **Cross-provider scheduling:** Book a primary care visit, get a referral, find an in-network specialist, book the specialist appointment, and schedule follow-up — all in one workflow
- **Referral management:** Submit referral requests, track approval, find matching specialists, and complete the referral loop (inform both providers)
- **Prescription management:** Request refills for non-controlled medications, transfer prescriptions between pharmacies, compare drug prices across pharmacies, track prescription status, alert the patient when refills are due
- **Insurance coordination:** Submit prior authorization requests, track approval status, appeal denials, estimate total out-of-pocket costs across multiple visits/procedures, explain benefits in plain language
- **Medical record portability:** Request records from one provider for transfer to another (via FHIR APIs under 21st Century Cures Act), compile a care summary for specialist visits
- **Care plan tracking:** Maintain a timeline of visits, procedures, medications, and follow-ups. Alert the patient to overdue screenings, upcoming medication changes, or gaps in care
- **Billing management:** Review bills for errors, compare charges against published pricing, initiate disputes for incorrect charges, set up payment plans, track HSA/FSA eligibility
- **Multi-language support:** Translate medical information and coordinate care for non-English-speaking patients (critical: medical translation must be clinically validated, not just Google Translate)

### What an agent CANNOT do (legal hard lines)

- **Diagnose:** The agent cannot determine what condition a patient has, even with access to lab results and symptoms. It can flag anomalies ("your A1C is above the normal range — you should discuss this with your doctor") but cannot diagnose diabetes.
- **Prescribe:** The agent cannot write, modify, or authorize prescriptions. It can request refills that a provider has pre-authorized, but it cannot change dosage, substitute medications, or initiate new prescriptions.
- **Controlled substances:** The agent cannot interact with Schedule II controlled substance prescriptions (oxycodone, Adderall, etc.) beyond the most basic status checking. Refills, transfers, and modifications require provider-pharmacy direct communication.
- **Override clinical judgment:** If a provider says "no" to a referral, prescription, or procedure, the agent cannot override it. It can request a second opinion by booking with another provider, but it cannot force clinical decisions.
- **Access records without consent:** Even at L3, every record access requires current, valid patient authorization. The agent cannot proactively pull records "just in case."
- **Provide clinical advice:** "Should I take this medication?" is a question for the provider. The agent can relay what the provider prescribed and the pharmacist's counseling, but it cannot advise.
- **Mental health crisis intervention:** If a patient expresses suicidal ideation, self-harm, or immediate danger, the agent must immediately escalate to crisis resources (988 Lifeline, 911) and cease care coordination activities. It cannot "schedule a therapy appointment" as a response to a crisis.

### Technical requirements

Everything from L2, plus:

1. **FHIR R4 API access** — the healthcare interoperability standard mandated by the 21st Century Cures Act:
   - Patient record read access (with patient authorization via SMART on FHIR)
   - Condition, Medication, AllergyIntolerance, Procedure, Observation resources
   - CarePlan and CareTeam resources for coordinated care
   - DocumentReference for clinical documents
   - Required by law: providers using certified EHR technology must provide FHIR APIs (since 2023)
   - Major EHR implementations: Epic (open.epic.com), Cerner (Oracle Health FHIR), Athenahealth, Allscripts

2. **Referral management API:**
   - `POST /referrals` — submit referral request with clinical justification
   - `GET /referrals/{id}/status` — track approval and specialist response
   - `POST /referrals/{id}/schedule` — book the referred appointment
   - Integration with e-referral networks (ReferralMD, AristaMD)

3. **Prescription management API** (via Surescripts or pharmacy platform):
   - `GET /prescriptions` — list active prescriptions with refill status
   - `POST /prescriptions/{id}/refill` — request refill (non-controlled only)
   - `POST /prescriptions/transfer` — initiate pharmacy-to-pharmacy transfer
   - `GET /prescriptions/{id}/pricing` — compare prices across pharmacies (integration with GoodRx, RxSaver, or direct pharmacy pricing APIs)
   - Hard block: no API access to Schedule II controlled substance modifications

4. **Prior authorization API** (via payer APIs or clearinghouses):
   - `POST /prior-auth` — submit prior auth request with clinical documentation
   - `GET /prior-auth/{id}/status` — track approval
   - `POST /prior-auth/{id}/appeal` — submit appeal with additional documentation
   - Integration with CoverMyMeds, Availity, or direct payer APIs (UnitedHealthcare, Aetna, Cigna, etc.)
   - Note: CMS finalized the Prior Authorization API rule in 2024, requiring Medicare Advantage, Medicaid, and CHIP plans to implement FHIR-based prior auth APIs by 2027

5. **Patient consent management platform:**
   - Granular consent: patient authorizes agent for specific data types, specific providers, specific time periods
   - Consent audit trail: every data access logged with consent reference
   - Consent revocation: immediate effect across all connected systems
   - HIPAA-compliant: consent records retained for 6 years minimum

6. **Care coordination messaging:**
   - Secure messaging between agent and providers (not SMS — must be HIPAA-compliant)
   - Structured care alerts (medication interactions, overdue screenings, abnormal results flagging)
   - Provider-to-agent handoff protocols ("the patient's lab results are ready — schedule a follow-up")

7. **Emergency detection (enhanced):**
   - Integration with symptom-checking algorithms (not for diagnosis — for routing severity)
   - Hard-coded escalation paths: emergency symptoms bypass all scheduling logic
   - Crisis protocol for mental health: 988 integration, safety plan awareness

### The 6-step journey at L3

| Step | Status | Detail |
|------|--------|--------|
| FIND | Pass | Discovers providers, specialists, pharmacies across the care network. Evaluates referral compatibility. |
| UNDERSTAND | Pass | Reads provider capabilities, insurance contracts, referral requirements, formulary coverage. |
| SIGN UP | Pass | Creates/manages patient records across providers with consent-based identity federation. |
| CONNECT | Pass | Authenticated access to scheduling, records (FHIR), prescriptions, insurance APIs with patient consent tokens. |
| USE | Pass | Full care coordination: booking, referrals, prescriptions, records transfer, prior auth, billing review. |
| PAY | Pass | Copay collection, HSA/FSA routing, payment plan setup, bill dispute initiation. |

### Real examples approaching L3

No single entity is fully L3 today. But several are building the components:

- **Epic MyChart + Care Everywhere:** Epic's patient portal combined with its provider-to-provider record sharing network is the closest thing to L3 infrastructure. If Epic opened FHIR APIs for agent access (not just patient portal access), practices on Epic would jump to L3.
- **Apple Health Records + FHIR:** Apple aggregates patient records from FHIR-enabled providers into a patient-controlled store. An agent with access to Apple Health Records would have the longitudinal patient view needed for L3 care coordination.
- **CoverMyMeds (McKesson):** Handles 30%+ of US prior authorizations electronically. If exposed as an agent-accessible API, prior auth management becomes L3-capable.
- **Surescripts (prescription network):** Connects 95% of US pharmacies, most EHRs, and most PBMs. The infrastructure for L3 prescription management exists — the API access for agents does not.
- **Medicare.gov / Blue Button 2.0:** CMS provides FHIR API access to Medicare claims data. This is a real, production L3 component — patients can authorize third-party apps (and potentially agents) to access their Medicare data.

### What percentage of healthcare is here today?

Less than 5%. And almost none of it is agent-accessible — the infrastructure exists in closed ecosystems (Epic-to-Epic, within a single health system). True L3 requires CROSS-SYSTEM interoperability that is still emerging.

The components exist:
- FHIR APIs are mandated and deployed at major health systems
- Prior auth APIs are mandated by 2027 (CMS rule)
- Surescripts handles electronic prescriptions at scale
- Clearinghouses process insurance transactions electronically

What is missing: an agent-accessible orchestration layer that connects these components. This is the gap AgentHermes could fill.

### What is unique to healthcare at L3

**The coordination IS the product.** In SaaS at L3, the agent self-manages one product. In healthcare at L3, the agent is orchestrating across 5-10 independent systems (PCP, specialist, insurance, pharmacy, lab, imaging) that were never designed to work together. The value is not in any single interaction — it is in the coordination between them.

**The referral loop is healthcare's "checkout flow."** When a PCP refers a patient to a specialist, the average time from referral to completed specialist visit is 26 days. Roughly 30% of referrals are never completed — the patient falls out of the loop. An L3 agent that closes the referral loop (finds specialist, verifies insurance, books appointment, sends records, confirms completion) addresses a $150B gap in US healthcare.

**Prescription management is the daily engagement hook.** 66% of US adults take at least one prescription medication. Refill management, price comparison, pharmacy transfer, and interaction checking are daily/weekly agent tasks — not occasional ones. This is the healthcare equivalent of a daily-active-use SaaS tool.

---

## Level 4: Integrated

### What the business provides at this level

The healthcare system recognizes the agent as a legitimate participant in care delivery. The agent has a verified identity (agent KYA — Know Your Agent), operates under a published trust framework, and interacts with providers, insurers, and pharmacies as a recognized entity. The agent does not just call APIs — it participates in care protocols, contributes to clinical decision support (without diagnosing), and operates within a regulatory framework that acknowledges AI agents as healthcare actors.

L4 is aspirational. No healthcare system is here today (March 2026). But the regulatory and technical trajectory is clear: CMS is mandating interoperability APIs, ONC is pushing FHIR adoption, and the TEFCA (Trusted Exchange Framework and Common Agreement) is creating a national health information exchange network. L4 is what happens when these pieces connect and agents are recognized participants.

### What an agent CAN do

Everything from L3, plus:

- **Clinical decision support (not diagnosis):** Flag drug interactions, alert to overdue screenings, identify care gaps based on evidence-based guidelines (e.g., "patient is diabetic, A1C was last checked 8 months ago, guidelines recommend every 6 months"). This is CDS — supporting the provider's decision, not making it.
- **Participate in care teams:** The agent is listed as a member of the patient's care team in the EHR (as a "care coordinator" or "patient navigator" role). Providers can send structured messages to the agent. The agent is in the loop on care plan changes.
- **Negotiate on behalf of the patient:** Compare total cost of care across health systems (using published price transparency data), negotiate payment plans, identify financial assistance programs, optimize insurance plan selection during open enrollment based on the patient's care patterns.
- **Claims management:** Review EOBs (Explanation of Benefits), identify billing errors, initiate balance billing disputes under the No Surprises Act, track claims from submission through adjudication.
- **Population health participation:** With patient consent, contribute de-identified data to public health registries, clinical trials matching, and population health analytics. An agent managing 10,000 patients' care can identify emerging patterns that individual providers miss.
- **Cross-agent collaboration:** Coordinate with other agents in the healthcare ecosystem — a provider's agent communicates with the patient's agent to schedule, share records, and close care loops. Agent-to-agent protocols (A2A) for healthcare-specific workflows.
- **Predictive care management:** Based on the patient's longitudinal record, social determinants data, and evidence-based risk models, proactively suggest preventive actions. "Based on your family history, age, and last colonoscopy date, you are due for a screening colonoscopy. I have found three in-network gastroenterologists with availability next month."

### What an agent CANNOT do (these never change)

- **Diagnose.** At no level does an agent diagnose. Clinical judgment is the exclusive domain of licensed providers.
- **Prescribe.** At no level does an agent write, modify, or authorize prescriptions without explicit provider order.
- **Practice medicine.** The agent is a coordinator, navigator, and administrator. It is not a clinician.
- **Override patient autonomy.** The patient can always override the agent's recommendations. The patient can fire the agent at any time.
- **Access data without consent.** Even at L4, the patient controls what the agent can see and do. Consent is granular and revocable.
- **Make life-or-death decisions.** Emergency detection results in immediate escalation to human emergency services, not autonomous action by the agent.

### Technical requirements

Everything from L3, plus:

1. **Agent identity and trust framework:**
   - Verifiable agent identity (agent-card.json with healthcare-specific credentials: BAA status, HIPAA compliance certification, security audit results)
   - Agent reputation system (uptime, accuracy of insurance estimates, referral completion rate, patient satisfaction scores)
   - Agent registry where providers can verify an agent's credentials before granting access
   - KYA (Know Your Agent) protocol: providers know which agent is acting, on whose behalf, with what authorization scope

2. **TEFCA participation:**
   - Connection to the Trusted Exchange Framework and Common Agreement national network
   - Query-based exchange: agent can query any TEFCA-connected provider for patient records (with patient consent via TEFCA Individual Access Services)
   - Directed exchange: agent can send records between providers through TEFCA QHINs (Qualified Health Information Networks)
   - Current QHINs: CommonWell, Carequality, eHealth Exchange, Epic Nexus, KONZA

3. **Clinical decision support integration:**
   - Access to evidence-based clinical guidelines (USPSTF, AHA, ADA, NCCN, etc.) in machine-readable format
   - Drug interaction checking (via DrugBank, RxNorm, or First Datacheck APIs)
   - Care gap identification based on HEDIS measures or CMS quality measures
   - All CDS outputs clearly labeled as "decision support, not diagnosis" in every response

4. **Claims and billing APIs:**
   - `POST /claims/submit` — submit claims electronically (EDI 837)
   - `GET /claims/{id}/status` — track claims adjudication (EDI 277)
   - `POST /claims/{id}/appeal` — submit claim appeal
   - `GET /eob` — retrieve Explanation of Benefits
   - Integration with patient financial responsibility estimation tools

5. **Agent-to-agent healthcare protocols:**
   - Provider agent to patient agent: "Lab results are ready, patient should schedule follow-up"
   - Patient agent to pharmacy agent: "Transfer prescription from CVS to Capsule"
   - Insurance agent to patient agent: "Prior auth approved for MRI, reference number XYZ"
   - Standardized message formats (FHIR-based) for inter-agent healthcare communication

6. **Audit and compliance infrastructure:**
   - Complete audit trail of every agent action, data access, and decision
   - Annual HIPAA security risk assessment covering agent operations
   - Breach detection and response specific to agent-mediated PHI access
   - Compliance reporting for covered entities and business associates

### The 6-step journey at L4

| Step | Status | Detail |
|------|--------|--------|
| FIND | Pass | Agent discovers providers through trust networks, not just web search. Provider agents advertise capabilities to patient agents. |
| UNDERSTAND | Pass | Full capability advertisement including clinical specialties, outcomes data, patient satisfaction, price transparency, and agent integration status. |
| SIGN UP | Pass | Federated patient identity across the care network. One consent framework covers all providers. |
| CONNECT | Pass | Agent-to-agent trust establishment. Mutual credential verification. Granular data sharing agreements executed programmatically. |
| USE | Pass | Full lifecycle care coordination with clinical decision support, cross-system record access, claims management, and proactive care. |
| PAY | Pass | End-to-end financial management: cost estimation, copay collection, claims tracking, billing dispute resolution, HSA/FSA optimization, financial assistance identification. |

### What L4 looks like in practice (scenario)

**Patient: Sarah, 45, Type 2 diabetes, Blue Cross PPO, lives in Denver**

Sarah's L4 agent manages her complete healthcare journey:

1. **Proactive alert:** "Sarah, your A1C test is due (last one was 7 months ago). I have found lab availability at Quest Diagnostics on Saturday morning (2-mile drive, $0 copay for preventive labs). Should I book it?"

2. **Lab coordination:** Agent books the lab, sends the PCP's standing lab order electronically, confirms insurance coverage, and sends Sarah prep instructions (fasting 8 hours).

3. **Results routing:** Lab results flow to PCP via FHIR. Agent receives a notification: "A1C is 8.2%, up from 7.4%." Agent does NOT diagnose but flags: "Your A1C has increased. Your endocrinologist may want to discuss medication adjustment. I have availability with Dr. Chen next Tuesday at 3pm. Should I book?"

4. **Specialist coordination:** Agent books the endocrinologist, sends the PCP's referral electronically, transfers relevant records (last 3 A1C results, current medications, allergies), and confirms insurance prior authorization is not required for an office visit.

5. **Medication management:** After the endo visit, Dr. Chen prescribes an additional medication. Agent receives the e-prescription notification, checks drug interactions against Sarah's current medications (none found), compares pharmacy pricing (CVS: $45/mo, Amazon Pharmacy: $12/mo with Prime), and asks Sarah: "Dr. Chen prescribed Jardiance. Amazon Pharmacy has it for $12/month compared to $45 at CVS. Shall I transfer your prescription?"

6. **Follow-up loop:** Agent schedules a follow-up A1C test in 3 months, a follow-up endo visit in 4 months, and adds reminders for medication adherence.

7. **Billing:** Agent reviews the EOB from the endo visit, confirms the charges match the published price, verifies the copay was correctly applied, and updates Sarah's deductible tracking: "You have used $2,400 of your $3,000 deductible this year."

**Total time Sarah spent on healthcare admin: approximately zero.** Total time the agent spent: about 45 seconds of compute.

### What percentage of healthcare is here today?

0%. This is aspirational. But the building blocks are being mandated:
- FHIR APIs: mandated, deployed at 90%+ of large health systems
- Prior auth APIs: mandated by CMS, deadline 2027
- TEFCA: launched 2024, onboarding QHINs through 2026
- Price transparency: mandated, enforcement increasing
- Patient access APIs: mandated under 21st Century Cures Act

The regulatory tailwind is real. The government is forcing the infrastructure that makes L4 possible. The missing piece is the agent layer that sits on top.

---

## Healthcare Sub-Vertical Specifics

Each healthcare sub-vertical has unique characteristics. Here is how the levels manifest differently across the 6 sub-verticals.

### Telehealth

| Aspect | Current State | L2 Path | L3 Path |
|--------|--------------|---------|---------|
| Scheduling | Most platforms have online booking (L2-ready) | Open APIs for agent booking | Cross-platform provider search and booking |
| Insurance | Verified at checkout on most platforms | Real-time eligibility API | Automated prior auth for specialist referrals |
| Prescriptions | E-prescribing built in | Refill management API | Cross-pharmacy price optimization |
| Records | Within-platform records | FHIR export for patient | Cross-provider record aggregation |
| Unique constraint | Provider must be licensed in patient's state | State license verification in availability API | Interstate compact integration |
| Current leaders | Teladoc, Amwell, Hims/Hers (L1-L2) | Zocdoc (L2 infrastructure, closed API) | Epic + TEFCA (L3 infrastructure emerging) |

**Business agent example at L2:** "Dr. Martinez is available for a telehealth visit tomorrow at 10am. She is board-certified in internal medicine, licensed in your state (Colorado), and accepts your Anthem PPO plan. Your copay would be $25. She speaks English and Spanish. Shall I book?"

### Dentist Office

| Aspect | Current State | L2 Path | L3 Path |
|--------|--------------|---------|---------|
| Scheduling | 60% have online booking, 40% phone-only | NexHealth/Zocdoc API integration | Cross-practice scheduling for specialty referrals |
| Insurance | Most list accepted carriers on website | Real-time dental eligibility verification (remaining annual maximum, deductible) | Automated benefits coordination (dual coverage, COB) |
| Records | Dentrix/Eaglesoft (closed systems) | Patient-facing record export | FHIR dental records (emerging standard) |
| Unique constraint | No interstate compact for dentists | State-by-state license verification | Referral networks between general and specialist |
| Treatment plans | Paper or portal-only | Structured treatment plan API with cost estimates | Multi-visit treatment plan tracking with insurance max optimization |
| Current leaders | Aspen Dental, Pacific Dental (L1) | NexHealth-enabled practices (approaching L2) | None at L3 |

**Business agent example at L2:** "We accept Delta Dental PPO. You have $850 remaining on your annual maximum. A cleaning and exam is $0 out of pocket (100% covered preventive). Dr. Kim has availability this Tuesday at 2pm or Thursday at 9am. She also speaks Korean. We are a new-patient-friendly practice — first visit includes full X-rays. Shall I book?"

### Pharmacy

| Aspect | Current State | L2 Path | L3 Path |
|--------|--------------|---------|---------|
| Refills | Most chains have online/app refills (L2-ish, closed) | Open refill API with status tracking | Cross-pharmacy transfer + price optimization |
| Pricing | GoodRx exists but is consumer-facing | Drug pricing API with discount card integration | Total cost optimization across pharmacy + insurance + manufacturer coupons |
| Controlled substances | Heavily restricted, appropriately | No agent interaction beyond status check | No change — legal ceiling |
| Delivery | Amazon, Capsule, Alto have delivery | Delivery scheduling API | Predictive refill + auto-delivery |
| Current leaders | Amazon Pharmacy (L1-L2 within Amazon) | Capsule, Alto (L2 within their platforms) | Surescripts network (L3 infrastructure, closed) |

**Business agent example at L2:** "Generic metformin 500mg, 90-day supply: $4.50 at our pharmacy, $12.00 at CVS, $8.00 at Walgreens. We can transfer your prescription from CVS — it will be ready in 2 hours. We also accept your Express Scripts plan, which would bring the cost to $0 with your current deductible met. Delivery available by 5pm today."

### Mental Health

| Aspect | Current State | L2 Path | L3 Path |
|--------|--------------|---------|---------|
| Matching | Directory-based (Psychology Today, Alma) | Structured matching API (specialty, modality, insurance, demographics) | Outcome-based matching (therapist effectiveness for specific conditions) |
| Scheduling | Most platforms have online booking | Session booking API with recurring scheduling | Cross-provider care coordination (therapist + psychiatrist + PCP) |
| Insurance | Major friction — many therapists out-of-network | Real-time mental health benefit verification | Automated superbill generation for out-of-network reimbursement |
| Crisis protocol | 988 Lifeline exists | Mandatory crisis detection in every agent interaction | Integration with local crisis services and safety planning |
| Unique constraint | Therapeutic relationship is personal — cannot just optimize for availability | Matching must respect therapeutic fit, not just logistics | Continuity of care is paramount — agent must avoid disrupting therapeutic alliance |
| Unique constraint | Mental health records have EXTRA protections under 42 CFR Part 2 (substance abuse) and psychotherapy notes under HIPAA | Agent can never access psychotherapy notes | Substance use disorder records require separate, specific consent |
| Current leaders | Headway, Alma (L1-L2) | BetterHelp (L2 within platform) | None at L3 |

**Business agent example at L2:** "I found 3 therapists matching your criteria — specializing in anxiety and PTSD, accepting Cigna PPO, with evening availability. Dr. Reeves (PhD, CBT + EMDR, 12 years experience, 4.9 rating, next available Thursday 6pm). Dr. Park (PsyD, CBT + DBT, 8 years, 4.8 rating, next available Monday 7pm). Dr. Williams (LCSW, trauma-focused, 15 years, 4.7 rating, next available Wednesday 5pm). Your copay is $30 per session. Would you like me to book an initial consultation with any of these?"

### Specialist (Cardiology, Orthopedics, Oncology, etc.)

| Aspect | Current State | L2 Path | L3 Path |
|--------|--------------|---------|---------|
| Referrals | Fax-based referral system (seriously, still fax) | Electronic referral API with status tracking | Automated referral-to-appointment pipeline |
| Prior authorization | Phone-based, 45-minute average hold time | Electronic prior auth submission via clearinghouse | Automated prior auth with real-time approval tracking |
| Insurance | In-network verification is complex (varies by procedure) | Procedure-specific eligibility verification | Total episode cost estimation (surgeon + anesthesia + facility + rehab) |
| Records | Epic Care Everywhere within Epic network | FHIR-based record transfer | Cross-EHR record aggregation for multi-specialist care |
| Unique constraint | Many procedures require prior authorization that takes days/weeks | Prior auth status API | Predictive prior auth (submit before the specialist even requests it, based on referral pattern) |
| Current leaders | Large health systems with Epic (L1) | Cleveland Clinic, Mayo Clinic (approaching L2 within their systems) | None at L3 |

**Business agent example at L2:** "Dr. Patel (orthopedic surgery, knee specialist) is in-network for your UnitedHealthcare PPO. She practices at Denver Health Medical Center. Next available consultation is April 15th at 11am. Based on your referral for possible ACL repair: prior authorization is required — I can submit the request now using your PCP's referral documentation. Estimated timeline for approval: 5-7 business days. Shall I proceed?"

---

## The Healthcare-Specific Hard Ceilings

These constraints apply at EVERY level and will not change with technology improvements. They are legal and ethical ceilings.

| Constraint | What It Means for Agents | Why It Will Not Change |
|------------|-------------------------|----------------------|
| **No diagnosis** | Agents triage and route. They never diagnose. "Consistent with conditions requiring evaluation" is the ceiling. | Medical practice acts require licensed practitioners for diagnosis. AI diagnosis would require FDA approval as a clinical decision support tool (Class II medical device minimum). |
| **No prescribing** | Agents manage existing prescriptions. They never initiate new ones or modify dosages. | DEA and state pharmacy boards require licensed prescribers. No pathway exists for AI agent prescribing authority. |
| **Controlled substance restrictions** | Schedule II (opioids, stimulants): agents cannot refill, transfer, or modify. Schedule III-V: limited agent interaction with provider pre-authorization. | Controlled Substances Act and DEA regulations. These restrictions exist to prevent drug diversion and abuse. |
| **Mandatory emergency escalation** | If symptoms suggest emergency, the agent MUST stop all other activity and direct to 911/ER. No exceptions. No "let me find you an appointment." | Failure to escalate creates direct liability. An agent that delays emergency care by trying to schedule an appointment could be found negligent. |
| **Patient consent required** | Every interaction with PHI requires current, specific, revocable patient consent. The agent cannot "proactively check" without authorization. | HIPAA Privacy Rule. The patient owns their health information. |
| **Psychotherapy note protection** | Psychotherapy notes (the therapist's private process notes) can NEVER be accessed by an agent. Even with patient consent, providers can refuse to release them. | HIPAA provides extra protection for psychotherapy notes beyond standard PHI. |
| **Substance abuse record protection** | Records of substance use disorder treatment require separate, specific consent that is MORE restrictive than standard HIPAA consent. | 42 CFR Part 2 (recently updated but still provides extra protections). Designed to prevent discrimination against people seeking substance abuse treatment. |
| **Minors and guardianship** | Agent interactions for minors require guardian authorization. Adolescents may have independent consent rights for certain services (reproductive health, mental health, substance abuse) depending on state law. | State minor consent laws vary significantly. An agent must know the specific state rules. |

---

## The AgentHermes Opportunity in Healthcare

### Where we can play today (L0 to L1 uplift)

The biggest immediate opportunity is moving the ~35% of healthcare providers stuck at L0 to L1. This requires NO PHI, NO BAA, and NO HIPAA complexity:

- **Structured insurance accepted data:** Scrape/collect/verify which providers accept which insurance and publish it in machine-readable format
- **Provider matching directory:** Specialty + insurance + location + availability indicators + languages + demographics
- **Price transparency aggregation:** Collect the machine-readable pricing files that hospitals are required to publish and make them agent-searchable
- **Business agent cards:** Generate agent-card.json for healthcare businesses with structured service, insurance, and provider data

This is public information. No PHI. No BAA. Massive value.

### Where we can play at L2 (scheduling layer)

Partner with scheduling platforms (NexHealth, Zocdoc, Healthie) to provide agent-accessible scheduling APIs:

- **Agent-to-scheduler bridge:** AgentHermes provides the agent interface; the scheduling platform handles the HIPAA-compliant booking
- **Insurance pre-verification:** Before the agent even shows availability, filter by insurance acceptance to eliminate the #1 friction point
- **Consent flow:** Standardized patient consent for agent-mediated booking (the patient authorizes AgentHermes to book on their behalf)

This requires a BAA with the scheduling platform but NOT direct PHI storage by AgentHermes.

### Where L3/L4 infrastructure is being built (future)

- **FHIR APIs:** Mandated, deployed, increasingly open. The patient access API rule means patients can authorize third-party apps to access their records.
- **TEFCA:** Creating a national health information exchange that, once mature, could support agent-mediated queries.
- **CMS Prior Auth API rule:** By 2027, major payers must support FHIR-based prior authorization. This is the infrastructure for L3 prior auth management.
- **Price transparency enforcement:** HHS is increasing enforcement of hospital price transparency requirements, creating more structured pricing data.

### Revenue model per level

| Level | AgentHermes Revenue Model | Price Point | Volume |
|-------|--------------------------|-------------|--------|
| L0 to L1 | Remediation templates: structured data, Schema.org markup, agent-card.json | $49-149/mo per practice | 300K+ practices at L0 |
| L1 to L2 | Scheduling platform integration + insurance pre-verification | $149-399/mo per practice + per-booking fee ($5-20) | 200K+ practices at L1 |
| L2 to L3 | Care coordination orchestration layer (requires BAA infrastructure) | $399-999/mo per practice or health system | 50K+ practices at L2 |
| L3 to L4 | Full healthcare agent platform (regulatory partnership required) | Enterprise: $2,000-10,000/mo per health system | 5K+ health systems |

---

## Summary: Healthcare vs. SaaS Maturity Comparison

| Dimension | SaaS | Healthcare |
|-----------|------|------------|
| L0 prevalence | 5-10% | 30-40% |
| L2 prevalence | 25-35% | 15-20% |
| L4 prevalence | <1% | 0% |
| Primary L1 value | API documentation discovery | Insurance accepted verification |
| Primary L2 value | Product operation via API | Appointment booking + insurance verification |
| Primary L3 value | Self-onboarding + billing management | Cross-provider care coordination |
| Legal ceiling | Terms of service (soft) | HIPAA, DEA, state licensing (hard, criminal penalties) |
| Consent model | API key (machine identity) | Patient authorization (human consent required for every interaction) |
| Error consequence | Failed API call, retry | Missed diagnosis, wrong medication, delayed emergency care |
| Emergency protocol | Not applicable | Mandatory — agent must detect and escalate emergencies |
| The "never" list | Short (maybe custom contracts) | Long — diagnosis, prescribing, controlled substances, psychotherapy notes |
| Biggest friction | Account creation / onboarding | Insurance verification |
| Biggest agent value | Replaces human clicking through dashboards | Replaces human sitting on hold with insurance companies |
| Who the agent serves | The agent IS the customer (or acts as one) | The agent is NEVER the customer — always acts for a human patient |
| Regulatory trend | Minimal regulation | Increasing interoperability mandates accelerating agent readiness |

---

## Appendix: Key Standards and Regulations

| Standard / Regulation | What It Does | Impact on Agent Readiness |
|----------------------|-------------|--------------------------|
| HIPAA (1996, updated) | Protects patient health information | Creates BAA requirements, consent framework, security standards |
| 21st Century Cures Act (2016) | Mandates health data interoperability | Forces FHIR API deployment, prohibits information blocking |
| ONC Cures Act Final Rule (2020) | Requires certified EHRs to support FHIR R4 APIs | Creates the technical standard agents will use for record access |
| CMS Interoperability Rules (2020-2024) | Requires payers to provide patient access APIs | Enables agent access to claims data and coverage information |
| CMS Prior Authorization Final Rule (2024) | Requires FHIR-based prior auth APIs by 2027 | Enables L3 prior authorization management |
| No Surprises Act (2022) | Protects against surprise medical bills | Creates structured cost estimation requirements |
| Hospital Price Transparency Rule (2021) | Requires machine-readable pricing files | Creates L1 pricing data by regulatory force |
| TEFCA (2024-ongoing) | Creates national health information exchange framework | Enables cross-system queries that L3/L4 agents need |
| SMART on FHIR | Authorization framework for FHIR API access | Provides the consent + auth model for agent access to patient records |
| Surescripts network | E-prescribing and pharmacy connectivity | Infrastructure for L3 prescription management |
| EDI 270/271 | Electronic insurance eligibility verification | Infrastructure for L2 real-time insurance verification |
| EDI 837/835 | Electronic claims submission and remittance | Infrastructure for L4 claims management |
| 42 CFR Part 2 | Extra protections for substance abuse records | Additional consent requirements beyond HIPAA |
| PSYPACT (43 states) | Interstate psychology practice compact | Enables cross-state telehealth for mental health |
| IMLC (41 states) | Interstate medical licensure compact | Enables cross-state telehealth for physicians |
