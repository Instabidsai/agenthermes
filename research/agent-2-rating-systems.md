# Research Agent 2: Existing Rating Systems That Became Industry Standards

**Purpose:** Extract lessons from 8 major rating/scoring systems for building the AgentHermes Agent Readiness Score -- the FICO of the agent economy.

**Research Date:** March 25, 2026

---

## Table of Contents
1. [FICO Credit Score](#1-fico-credit-score)
2. [Dun & Bradstreet (D-U-N-S / PAYDEX)](#2-dun--bradstreet-d-u-n-s--paydex)
3. [Google PageRank](#3-google-pagerank)
4. [SSL Certificates / HTTPS](#4-ssl-certificates--https)
5. [SOC 2 / ISO 27001](#5-soc-2--iso-27001)
6. [G2 / Trustpilot / Capterra](#6-g2--trustpilot--capterra)
7. [BBB Accreditation](#7-bbb-accreditation)
8. [Domain Authority (Moz / Ahrefs)](#8-domain-authority-moz--ahrefs)
9. [Bonus: BitSight / SecurityScorecard (Cybersecurity Ratings)](#9-bonus-bitsight--securityscorecard)
10. [Top 10 Lessons for AgentHermes](#top-10-lessons-for-agenthermes)

---

## 1. FICO Credit Score

**Creator:** Fair, Isaac, and Company (now FICO)
**Year Established:** Founded 1956; first general-purpose FICO Score launched **1989**
**Annual Revenue:** $2.0B (FY2025), up from $1.77B (FY2024)

### How It Works (Methodology)

FICO scores range from 300-850 and are calculated from five weighted factors drawn from credit bureau data:

| Factor | Weight | Description |
|--------|--------|-------------|
| Payment History | 35% | On-time payments, delinquencies, bankruptcies |
| Amounts Owed / Utilization | 30% | Credit used vs. available (target <30%) |
| Length of Credit History | 15% | Age of oldest account, average account age |
| Credit Mix | 10% | Diversity of credit types (cards, mortgage, auto) |
| New Credit | 10% | Recent hard inquiries and new accounts |

The exact algorithm is proprietary. FICO publishes the factor weights but not the formula. The score is calculated from data held at three bureaus (Equifax, Experian, TransUnion), so a consumer can have three different FICO scores.

### What Drove Adoption / How It Became Standard

1. **The Fannie Mae / Freddie Mac mandate (1995):** The watershed moment. When these GSEs required a FICO score on every mortgage application, adoption exploded. In 1995, 30% of lenders used FICO; by 1999, over 90% did. This is the single most important lesson: **getting a powerful intermediary to mandate your score is the fastest path to standardization.**

2. **Bureau distribution (1991):** By 1991, FICO was available at all three major bureaus, making it ubiquitous and easy to pull alongside existing credit reports.

3. **Consistent, objective methodology:** Replaced subjective, inconsistent human underwriting judgment. Lenders needed a common language to communicate credit quality, especially in the securitization market where loan portfolios are sold.

4. **Regulatory entrenchment:** Over decades, FICO became embedded in regulations, guidelines, and internal bank processes, creating massive switching costs.

### Gaming / Manipulation Problems

- **Credit repair companies:** Exploit dispute processes, file mass disputes to temporarily remove negative items during verification periods.
- **Tradeline renting ("piggybacking"):** Companies sell authorized-user status on old, high-limit accounts to boost thin-file consumers' scores. FICO updated its model in 2007 to counter this.
- **Synthetic identities:** Fraudsters create fake identities and build credit histories. Synthetic identity fraud increased 240% from 2016-2018.
- **Strategic manipulation:** AI tools now optimize payment timing, account opening, and utilization management to game every scoring factor.

**Countermeasures:** FICO regularly releases updated scoring models (FICO 8, 9, 10, 10T) that close gaming loopholes. The FTC has also prosecuted credit repair organizations for deceptive practices.

### Revenue Model

- **Per-pull royalties (Scores segment):** FICO charges a fee every time a lender pulls a score. Mortgage score pricing increased from $4.95 to $10 per pull for 2026. Near-zero marginal cost = enormous margins.
- **Software platform (Software segment):** Workflow tools for origination, fraud detection, customer management -- ~$800M/year.
- **B2C products (myFICO):** Consumers pay to see their own scores.
- **"Toll booth" model:** Nearly every financial transaction in the U.S. touches a FICO score, creating recurring, usage-based revenue.

### Key Lessons for AgentHermes

1. **Get a powerful intermediary to mandate your score.** Fannie/Freddie made FICO. Who is the Fannie Mae of the agent economy? (Answer: major AI agent platforms -- OpenAI, Anthropic, Google.)
2. **Per-transaction pricing at near-zero marginal cost** is the most defensible business model for a scoring company.
3. **Publish the factors, keep the formula proprietary.** Transparency about *what matters* builds trust; proprietary *weighting* prevents replication.
4. **Regularly update the model** to close gaming loopholes. Static scores get gamed.
5. **FICO's biggest moat was regulatory entrenchment.** Once embedded in regulations, switching costs become enormous.

### Sources
- [FICO Score Innovation Timeline (FICO)](https://www.fico.com/en/latest-thinking/video/fico-score-credit-scoring-innovation-timeline-1989-today)
- [History of the FICO Score (myFICO)](https://www.myfico.com/credit-education/blog/history-of-the-fico-score)
- [Florida Policy Timeline: FICO Scores](https://www.floridatimeline.org/timeline/1980-1990-fico-credit-scores-are-developed-and-become-the-standard/)
- [How FICO Makes Money (Finty)](https://finty.com/us/business-models/fico/)
- [FICO's Moat vs. VantageScore (MarketMinute)](https://markets.financialcontent.com/stocks/article/marketminute-2026-3-12-fico-shares-plummet-9-as-credit-scoring-monopoly-faces-pricing-war-from-vantagescore)
- [Credit Score History (Wikipedia)](https://en.wikipedia.org/wiki/Credit_score_in_the_United_States)
- [FICO Revenue (WallStreetZen)](https://www.wallstreetzen.com/stocks/us/nyse/fico/revenue)

---

## 2. Dun & Bradstreet (D-U-N-S / PAYDEX)

**Creator:** Lewis Tappan (The Mercantile Agency, 1841); R.G. Dun merged with John M. Bradstreet in 1933
**Year Established:** 1841 (oldest commercial credit bureau); D-U-N-S Number created **1963**; PAYDEX Score developed **1980s**
**Annual Revenue:** $2.38B (2024); ~5,800 employees

### How It Works (Methodology)

**D-U-N-S Number:** A unique 9-digit identifier assigned to each business entity globally. Over 100 million entities have a D-U-N-S number. It serves as a universal business ID -- the Social Security Number for companies.

**PAYDEX Score:** Measures business payment performance on a 1-100 scale.

| Score Range | Risk Level | Meaning |
|-------------|-----------|---------|
| 80-100 | Low | Pays on time or early |
| 50-79 | Moderate | Pays 15-30 days late |
| 0-49 | High | Pays 31+ days late |

Key characteristics:
- **Dollar-weighted:** Larger transactions impact the score more heavily.
- **Trade experience-based:** Calculated from payment data reported by up to 875 vendors/suppliers over a rolling 12-24 month period.
- **Requires minimum data:** At least 3 trade experiences from 2+ different vendors.
- **Payment-only:** Unlike personal credit, PAYDEX considers only payment timeliness, not debt levels or credit mix.

D&B also produces the **D&B Rating** (financial strength + composite credit appraisal) and the **Delinquency Predictor Score** (probability of severe delinquency).

### What Drove Adoption

1. **Government mandate (1998):** The Federal Acquisition Regulation (FAR) required a D-U-N-S number for all federal contractors starting 1998. In 2008, this expanded to all entities seeking federal grants -- affecting 630,000+ organizations. This was the ultimate endorsement.
2. **First-mover advantage:** Founded in 1841, D&B had 120+ years of data collection before any competitor. The data moat is enormous.
3. **The D-U-N-S number as infrastructure:** By creating a universal business identifier adopted by governments and corporations worldwide, D&B made itself the *plumbing* of B2B trust, not just a score provider.
4. **Network effects:** The more businesses reported trade data, the more accurate scores became, attracting more subscribers.

**Note:** In April 2022, the federal government transitioned from D-U-N-S to its own Unique Entity Identifier (UEI) in SAM.gov. This shows that even government mandates can be reversed if the provider doesn't remain essential.

### Gaming / Manipulation Problems

- **Selective reporting:** Businesses can strategically choose which vendors to pay on time (those that report to D&B) while delaying others.
- **"Pay-to-play" perception:** D&B charges businesses up to $2,000 to self-report non-major credit accounts and $10,000/year for report corrections, creating a perception that D&B monetizes the pain it creates.
- **Limited regulatory protection:** Business credit has far less regulation than personal credit (no equivalent of the Fair Credit Reporting Act protections), making manipulation harder to police.
- **Minimum data gaming:** Since only 3 trade experiences from 2 vendors are needed, businesses can set up accounts specifically to build a PAYDEX score artificially.

### Revenue Model

- **Subscription-based data products:** Companies pay for access to business credit reports, risk analytics, and monitoring.
- **Data licensing:** D&B licenses its business database to other companies for identity resolution, KYC, and compliance.
- **Self-service products for businesses:** D&B sells credit monitoring, credit-building tools, and report access to the businesses being scored.
- **Government and enterprise contracts:** Large-scale data access deals.

### Key Lessons for AgentHermes

1. **Create the identifier, own the ecosystem.** The D-U-N-S number is the foundation. For AgentHermes, the "Agent Readiness Profile" should be the universal business identifier for the agent economy.
2. **Government mandates are the ultimate adoption accelerator.** If AgentHermes can get AI safety regulations or procurement rules to require an agent-readiness score, adoption follows automatically.
3. **Don't just score -- provide the infrastructure.** D&B's D-U-N-S number is used far beyond credit scoring. The AgentHermes ID should be embeddable in APIs, directories, and agent tooling.
4. **Beware of the "monetize-the-pain" trap.** D&B's model of charging businesses to fix their own reports creates resentment. AgentHermes should make improvement accessible, not paywalled.

### Sources
- [D&B History (Library of Congress)](https://guides.loc.gov/this-month-in-business-history/july/dun-bradstreet-founded)
- [D&B History (FundingUniverse)](https://www.fundinguniverse.com/company-histories/the-dun-bradstreet-corporation-history/)
- [PAYDEX Score (D&B Official)](https://www.dnb.com/en-us/smb/resources/credit-scores/what-is-paydex-score.html)
- [PAYDEX Explained (Nav)](https://www.nav.com/business-credit-scores/dun-bradstreet-paydex/)
- [D-U-N-S and Government (D&B)](https://www.dnb.com/en-us/smb/duns/duns-number-and-government.html)
- [Government UEI Transition](https://info.winvale.com/blog/federal-government-transitioning-from-duns-number-to-unique-entity-identifier-uei)
- [D&B Wikipedia](https://en.wikipedia.org/wiki/Dun_%26_Bradstreet)

---

## 3. Google PageRank

**Creator:** Larry Page and Sergey Brin (Stanford University PhD students)
**Year Established:** Algorithm developed **1996**; Google founded **1998**; PageRank Toolbar launched **2000**; Toolbar killed **2016**
**Annual Revenue:** Google Search revenue: $175B+ (2023); PageRank is the foundational algorithm but is not separately monetized

### How It Works (Methodology)

PageRank was inspired by academic citation networks. The core idea: **a page is important if important pages link to it.** Each link from page A to page B is a "vote" for B, but votes from high-PageRank pages count more.

Key properties:
- **Recursive:** A page's score depends on the scores of pages linking to it, which depend on scores of pages linking to *them*, etc.
- **Damping factor (d=0.85):** Represents a "random surfer" who follows links 85% of the time and jumps to a random page 15% of the time.
- **Logarithmic scale:** The original toolbar showed 0-10; each integer increase required roughly 5-10x more link equity.

PageRank was one signal among hundreds, but it was the *foundational* one that differentiated Google from AltaVista, Yahoo, and other keyword-based engines.

### What Drove Adoption

1. **Superior results:** PageRank produced dramatically better search results than keyword-frequency approaches. Users switched to Google because it *worked better*.
2. **Simplicity of concept:** "Important pages link to important pages" is intuitive and elegant. Easy to explain, hard to replicate at scale.
3. **Indirect monetization via advertising:** Google never charged for search; it monetized through ads (AdWords/AdSense). The score drove traffic, which drove ad revenue.
4. **Making the score public (and then hiding it):** The PageRank Toolbar (2000-2016) made the score visible, which paradoxically both helped adoption (webmasters became obsessed) and hurt quality (created gaming incentives).

### Gaming / Manipulation Problems

This is the most heavily gamed scoring system in history:

- **Link farms:** Networks of sites linking to each other to inflate PageRank. Emerged immediately after the toolbar launched.
- **Paid links:** A secondary market formed where links on high-PR pages sold for $500+/month. PageRank became a traded commodity.
- **Private Blog Networks (PBNs):** Networks of sites built solely to sell link equity.
- **Comment spam:** Automated tools flooded blogs with comments containing links to boost PageRank.
- **Guest post networks:** Services like MyBlogGuest facilitated link exchanges disguised as content marketing.

**Countermeasures:**
- **nofollow attribute (2005):** Google introduced rel="nofollow" to let webmasters mark links that shouldn't pass PageRank.
- **Google Penguin (2012):** Algorithmic update that penalized sites with unnatural link profiles. Devastating to link manipulators.
- **Hiding the score (2013-2016):** Google stopped updating public PageRank in December 2013 and fully removed the toolbar in April 2016. **Critical lesson: making the score public invited manipulation.**
- **200+ ranking signals:** Google diluted PageRank's importance by incorporating hundreds of other signals, making gaming any single factor less effective.

### Revenue Model

PageRank itself has no direct revenue. Google's revenue model is:
- **Search advertising (Google Ads):** $175B+/year. The quality of search results (driven by PageRank and successors) creates user trust, which creates traffic, which creates ad inventory.
- **This is the "hidden revenue model":** The product (search) is free; the customer is the advertiser.

### Key Lessons for AgentHermes

1. **Never make the raw score publicly visible in a way that creates a gaming market.** Google's biggest mistake was the PageRank Toolbar. Show the tier (Bronze/Silver/Gold/Platinum) but not the exact number to the public.
2. **A great score must deliver measurably better outcomes.** PageRank won because Google results were *obviously better*. The Agent Readiness Score must provably predict better agent interactions.
3. **Dilute across many factors.** When a score depends on one factor, it gets gamed. The more dimensions, the harder to manipulate.
4. **Build the moat through data, not the algorithm.** Google's real advantage was crawling the entire web. AgentHermes's advantage should be auditing businesses at a scale no one else can match.

### Sources
- [The Evolution of Google PageRank (Ahrefs)](https://ahrefs.com/blog/google-pagerank/)
- [PageRank History (RankStudio)](https://rankstudio.net/articles/en/google-pagerank-algorithm-history)
- [PageRank (Wikipedia)](https://en.wikipedia.org/wiki/PageRank)
- [Why Google Retired the PageRank Toolbar (Cornell)](https://blogs.cornell.edu/info2040/2022/10/29/why-did-google-retire-the-pagerank-toolbar/)
- [RIP Google PageRank (Search Engine Land)](https://searchengineland.com/rip-google-pagerank-retrospective-244286)
- [Google's Hidden Revenue Model (FourWeekMBA)](https://fourweekmba.com/hidden-revenue-model-google/)

---

## 4. SSL Certificates / HTTPS

**Creator:** Netscape (SSL 1994); ISRG/Let's Encrypt (free certificates, 2015); Google Chrome drove enforcement
**Year Established:** HTTPS introduced **1994**; Let's Encrypt launched **2015**; Chrome "Not Secure" fully enforced **July 2018**
**Market Impact:** Let's Encrypt now has 63.9% market share; serves 700M+ websites

### How It Works

SSL/TLS certificates enable encrypted HTTPS connections. A Certificate Authority (CA) verifies that a domain owner controls their domain, then issues a cryptographic certificate. Three validation levels exist:

| Level | Validation | Cost (Traditional) | Use Case |
|-------|-----------|-------------------|----------|
| Domain Validation (DV) | Automated domain control | $0-100/yr | Most websites |
| Organization Validation (OV) | Business identity verified | $100-500/yr | Business sites |
| Extended Validation (EV) | Full business audit | $200-1000/yr | Banks, enterprise |

Let's Encrypt provides free DV certificates with automated renewal, using the same AES-256 encryption as $500 "premium" certificates.

### What Drove Adoption (The Adoption Curve)

This is the most instructive case for AgentHermes because it shows how **a carrot + stick strategy** can drive near-100% adoption in 5 years:

**Timeline:**
| Year | Event | HTTPS Adoption |
|------|-------|---------------|
| 1994 | HTTPS introduced (Netscape) | Near 0% |
| 2014 | Google announces HTTPS as ranking signal | ~30% |
| 2015 | Let's Encrypt launches (removes cost barrier) | ~39% |
| 2016 | Let's Encrypt hits 100M certificates | ~40% |
| Jan 2017 | Chrome 56: "Not Secure" on password/credit card pages | ~50% |
| Oct 2017 | Chrome 62: "Not Secure" on all input fields + incognito | ~60% |
| Jul 2018 | Chrome 68: "Not Secure" on ALL HTTP pages | ~70% |
| 2019+ | HTTPS ubiquitous, accounts for majority of traffic | ~80%+ |

**Key drivers:**
1. **Remove the cost barrier (Let's Encrypt):** Free certificates eliminated the #1 reason businesses didn't adopt HTTPS.
2. **Negative labeling by the dominant browser (Chrome):** Google gradually escalated from green padlock for HTTPS to red "Not Secure" for HTTP. Each phase was calculated to be disruptive enough to drive action but not so abrupt as to break the web.
3. **SEO incentive (2014):** Google made HTTPS a search ranking factor, giving businesses a selfish reason to adopt.
4. **Phased enforcement:** Google's 3-phase rollout (passwords first, then forms, then everything) gave businesses time to comply while maintaining pressure.

### Gaming / Manipulation Problems

SSL/HTTPS is relatively resistant to gaming because:
- The certificate is binary (you have it or you don't).
- The validation is automated and cryptographic.
- Phishing sites can get DV certificates, but this is a social engineering problem, not a certificate gaming problem.

The main "gaming" is the traditional CA industry's response to Let's Encrypt: inventing artificial distinctions ("premium" vs "free" certificates) to justify continued pricing for identical encryption.

### Revenue Model

**Traditional CAs (pre-Let's Encrypt):** Charged $100-500/year per certificate. Margins were enormous (cost to issue ~$1).

**Let's Encrypt:** Nonprofit, funded by sponsors (Mozilla, Google, Cisco, EFF, Facebook, etc.) and donations. Budget ~$3.6M/year to secure 700M+ websites.

**Post-disruption CA market:** Traditional CAs pivoted to OV/EV certificates, managed certificate services, and enterprise security bundles.

### Key Lessons for AgentHermes

1. **The "Chrome Not Secure" playbook is the gold standard for adoption enforcement.** AgentHermes should work with AI agent platforms to show "Not Verified" or "Unrated" labels on businesses without an Agent Readiness Score. This is the single most powerful adoption lever.
2. **Remove the barrier to entry.** Let's Encrypt's free certificates drove adoption from 30% to 80%. The basic AgentHermes audit should be free.
3. **Phase the enforcement.** Don't go from 0 to mandatory overnight. Start with high-risk categories (finance, healthcare), then expand.
4. **Binary + gradient scoring is powerful.** HTTPS is binary (secure/not secure) but the Agent Readiness Score is a gradient. Consider a binary "verified/unverified" threshold with gradient tiers above it.
5. **Google's selfish incentive was key.** Google pushed HTTPS partly because secure browsing = more ad engagement. AgentHermes needs to show AI platforms that verified businesses = better agent outcomes = more platform usage.

### Sources
- [Chrome's Plan to Label Sites "Not Secure" (Cloudflare)](https://blog.cloudflare.com/https-or-bust-chromes-plan-to-label-sites-as-not-secure/)
- [A Milestone for Chrome Security (Google Blog)](https://blog.google/products/chrome/milestone-chrome-security-marking-http-not-secure/)
- [Timeline of HTTPS Adoption](https://timelines.issarice.com/wiki/Timeline_of_HTTPS_adoption)
- [Let's Encrypt Doubled HTTPS (University of Michigan)](https://news.umich.edu/how-lets-encrypt-doubled-the-internets-percentage-of-secure-websites-in-four-years/)
- [10 Years of Let's Encrypt](https://letsencrypt.org/2025/12/09/10-years)
- [SSL Certificate Statistics 2026](https://sslinsights.com/ssl-certificates-statistics/)

---

## 5. SOC 2 / ISO 27001

**Creator:** SOC 2 by AICPA (American Institute of CPAs); ISO 27001 by ISO/IEC
**Year Established:** SOC 2: **2010** (evolved from SAS 70); ISO 27001: **2005** (evolved from BS 7799, 1995)
**Market Size:** SOC 2 compliance automation market: $850M in 2024, projected $2.7B by 2028

### How It Works (Methodology)

**SOC 2** evaluates a company's information systems across five Trust Services Criteria:

| Criteria | What It Measures |
|----------|-----------------|
| Security | Protection against unauthorized access |
| Availability | System accessibility as agreed/committed |
| Processing Integrity | System processing is complete, accurate, timely |
| Confidentiality | Information designated confidential is protected |
| Privacy | Personal information handling meets criteria |

Two types of reports:
- **Type I:** Point-in-time assessment of control design (snapshot)
- **Type II:** Assessment of control effectiveness over 6-12 months (the real deal)

**ISO 27001** is an international standard for Information Security Management Systems (ISMS). It requires:
- Risk assessment and treatment methodology
- Statement of Applicability (114 controls across 14 domains)
- Two-stage external audit process
- Annual surveillance audits for ongoing compliance
- 3-year recertification cycle

### Costs and Timeline

| | SOC 2 Type I | SOC 2 Type II | ISO 27001 |
|---|------------|--------------|-----------|
| Cost | $15,000-$40,000 | $35,000-$150,000+ | $30,000-$60,000 |
| Timeline | 2-3 months | 6-12 months | 6-18 months |
| Auditor | Licensed CPA firm | Licensed CPA firm | Accredited registrar |
| Output | Attestation report | Attestation report | Certification |

### What Drove Adoption

1. **Customer requirements ("show me your SOC 2"):** 87% of organizations reported losing business or facing adverse outcomes due to inadequate security compliance. Enterprise buyers won't evaluate vendors without SOC 2.
2. **Sales acceleration:** SOC 2 reduces the need for custom security questionnaires and manual evaluations, shortening sales cycles.
3. **Market access:** In regulated industries (finance, healthcare, government), compliance is table stakes for enterprise engagement.
4. **Automation platforms (Vanta, Drata, Secureframe):** These platforms reduced the cost and complexity of achieving compliance by 50-70%, making SOC 2 accessible to startups and SMBs.

**Current adoption:** Only 18% of SaaS companies have SOC 2 or ISO 27001. The market is still early, which suggests enormous room for growth in similar compliance standards for the agent economy.

### Gaming / Manipulation Problems

- **"Compliance theater":** Companies can implement controls that satisfy auditors but don't reflect real security practices. The Type I "snapshot" is particularly susceptible.
- **Scope limitation:** Companies can narrow the scope of their SOC 2 audit to exclude risky systems, achieving compliance on a subset.
- **Auditor shopping:** Companies may choose lenient auditors who are less rigorous in their assessments.
- **Point-in-time vs. continuous:** Even Type II reports cover a historical period and don't guarantee current compliance.

**Countermeasures:** Continuous monitoring platforms, Type II (long-term) audits preferred over Type I, and market pressure for broader scope.

### Revenue Model

SOC 2/ISO 27001 are not directly monetized by their creators (AICPA/ISO). The revenue ecosystem includes:
- **Audit firms:** CPA firms and registrars charge for audits ($15K-$150K+)
- **Compliance automation platforms:** Vanta (~$50K+ ARR), Drata, Secureframe, Sprinto -- SaaS subscriptions ($10K-$100K/year)
- **Consulting firms:** Readiness assessments, gap analyses, remediation
- **The certified companies themselves:** Use compliance as a sales tool to win enterprise deals

### Key Lessons for AgentHermes

1. **"Show me your score" is the adoption flywheel.** Just as enterprise buyers require SOC 2, AI agent platforms should require an Agent Readiness Score before routing agents to a business.
2. **Automation platforms are critical infrastructure.** Vanta made SOC 2 accessible. AgentHermes should be the Vanta of agent readiness -- automated auditing that makes compliance easy.
3. **Tiered certification creates aspiration.** SOC 2 Type I vs Type II, ISO 27001 certification levels. AgentHermes tiers (Bronze/Silver/Gold/Platinum) serve the same purpose.
4. **The compliance automation market is $850M and growing to $2.7B.** This validates the market size for automated readiness scoring.
5. **18% adoption in SaaS for SOC 2 = still early.** Agent readiness scoring at 0% adoption today means we're building the standard, not competing for market share.

### Sources
- [SOC 2 vs ISO 27001 (Sprinto)](https://sprinto.com/blog/soc-2-vs-iso-27001/)
- [True Cost of SOC 2 (Trava)](https://travasecurity.com/learn-with-trava/blog/the-true-cost-of-soc-2-compliance/)
- [SOC 2 Compliance Automation Market Size](https://www.soc2certification.com/blog/soc2-automation-market-size-2025)
- [SOC 2 for SMBs (WiredCIO)](https://wiredcio.com/blog/soc-2-certification-why-its-important-even-for-smbs/)
- [What is SOC 2 (Secureframe)](https://secureframe.com/hub/soc-2/what-is-soc-2)
- [ISO 27001 Audit Blueprint 2026](https://elevateconsult.com/insights/iso-27001-audit-blueprint-costs-timelines-2026/)

---

## 6. G2 / Trustpilot / Capterra

**Creators:** G2 (Godard Abel, 2012); Trustpilot (Peter Holten Muhlmann, 2007); Capterra (Michael Ortner, 1999)
**Revenue:** G2: $100M+ ARR (2024), $1.1B valuation; Trustpilot: $225.8M (2024); Capterra: Acquired by G2 (Jan 2026)

### How They Work (Methodology)

**G2:**
- Peer-to-peer software reviews from verified users
- Satisfaction score + market presence = placement on G2 Grid (Leaders, High Performers, Contenders, Niche)
- Uses LinkedIn verification, AI content detectors, and human moderation
- Reviews must come from authenticated users with business email addresses
- Gift card incentives ($10-25) for reviewers

**Trustpilot:**
- Open review platform for any business (not just software)
- TrustScore: 1-5 rating using Bayesian averaging
- Weights newer reviews more heavily (exponential decay on older reviews)
- Open platform: anyone can leave a review (no purchase verification required)
- Businesses can invite customers to review but cannot cherry-pick

**Capterra:**
- Software comparison platform with 100,000+ products across 900 categories
- 2M+ user reviews
- Click-based revenue model (sells clicks to vendors, $2/click floor, $500/mo minimum)
- Acquired by G2 in January 2026

### What Drove Adoption

1. **Buyer behavior shift:** Enterprise software buyers increasingly research online before engaging sales. G2 became the "Yelp for software."
2. **SEO dominance:** G2 and Capterra rank highly for "[software category] reviews" searches, becoming the default discovery layer.
3. **Vendor incentives:** Software companies actively drive customers to G2 because high scores win enterprise deals. This creates a flywheel.
4. **Grid/quadrant format:** G2's Grid (inspired by Gartner Magic Quadrant) provides an easy visual for buyers to compare solutions.
5. **Free tier for businesses:** All three platforms let businesses collect reviews for free, lowering the barrier to participation.

### Gaming / Manipulation Problems

- **Incentivized reviews:** G2 offers gift cards for reviews, which critics say incentivizes quantity over quality and can skew positive.
- **Vendor manipulation:** Companies selectively invite happy customers to review, suppressing negative feedback.
- **Fake reviews:** Despite AI detection, fake reviews persist. Some vendors use review farms or encourage employees to post reviews.
- **Selective publishing:** Reports that G2 sometimes doesn't publish honest negative reviews of certain companies.
- **Pay-for-visibility:** Paying vendors get enhanced profiles, better placement, and more features, creating a perception that money influences rankings.

**Countermeasures:**
- G2 uses AI content detectors + machine learning to flag fake reviews
- LinkedIn identity verification required
- Review validity program with specialized moderators
- Trustpilot uses behavioral analysis to flag suspicious patterns
- All platforms allow businesses and consumers to flag suspicious reviews

### Revenue Model

**G2:**
- **Premium subscriptions:** Small vendors ~$10K/yr; mid-market $30-100K/yr; enterprise $1M+ (Salesforce, IBM, Oracle)
- **Buyer intent data:** Companies pay to see who's researching their category
- **Enhanced listings and lead generation**
- **G2 Track:** SaaS spend management tool
- **Advertising:** Native ad placements

**Trustpilot:**
- **Freemium:** 90% of 714,000 businesses use it free; 10% pay
- **Subscriptions:** Standard plan starts at $225/domain/month
- **Premium tools:** Advanced analytics, review widgets, multi-location management

**Capterra:**
- **Pay-per-click:** Vendors pay $2+/click for leads
- **Minimum PPC budget:** $500/month
- **Reviews are free infrastructure** (not gated)

### Key Lessons for AgentHermes

1. **Reviews are the data moat.** G2's 2M+ reviews are its defensibility. AgentHermes's equivalent is audit data from 2,600+ businesses.
2. **The free tier is critical for data collection.** All three platforms give away the basic product to accumulate data. AgentHermes's free audit builds the database.
3. **Buyer intent data is the premium product.** Knowing who's "shopping" for agent-ready businesses is enormously valuable to businesses trying to attract AI agent traffic.
4. **Bayesian averaging is the right scoring approach.** Trustpilot's approach of weighting newer data more heavily and using statistical smoothing prevents score volatility.
5. **Vendor-side monetization is the right model.** Charge the businesses being scored (for premium features, visibility, improvement tools) rather than the score consumers.

### Sources
- [How G2's Reviews Created a $1B Brand (Growth Models)](https://growthmodels.co/g2-marketing/)
- [G2 Broke $100M ARR (Latka)](https://blog.getlatka.com/g2-revenue/)
- [G2 AI Review Moderation](https://learn.g2.com/g2-ai-review-moderation)
- [G2 Review Validity](https://sell.g2.com/review-validity)
- [Trustpilot Business Model](https://www.trustpilot.com/trust/our-business-model)
- [Trustpilot Revenue (Latka)](https://getlatka.com/companies/trustpilot)
- [G2 vs Capterra (Blastra)](https://blastra.io/blog/g2-capterra-vendor-pricing-compared)

---

## 7. BBB Accreditation

**Creator:** Better Business Bureau (various local bureaus federated under the Council of Better Business Bureaus)
**Year Established:** **1912**
**Scale:** ~400,000 accredited businesses across US and Canada; ~$200M+ annual revenue (2013 figure)

### How It Works

**Letter Grade Rating (A+ to F):** The BBB rates all businesses it tracks, regardless of accreditation, using a formula that considers:

| Factor | Description |
|--------|-------------|
| Complaint History | Volume and nature of complaints filed |
| Complaint Resolution | How well the business resolves complaints |
| Time in Business | Longer history = better |
| Transparent Practices | Honest advertising, proper licensing |
| Business Type | Industry-specific risk factors |
| Government Actions | Legal/regulatory issues |

**Accreditation (Badge Model):** Businesses voluntarily apply and pay annual dues. Accredited businesses agree to BBB's Standards for Trust (build trust, advertise honestly, tell the truth, be transparent, honor promises, be responsive, safeguard privacy, embody integrity).

**Dues structure:** Fees range from hundreds of dollars to $10,000+/year based on business size.

### What Drove Adoption

1. **First-mover advantage (1912):** The BBB predates the internet, online reviews, and most consumer protection agencies.
2. **Consumer trust brand:** For decades, "BBB Accredited" was one of the few trust signals available to consumers.
3. **Physical badges and seals:** Businesses display BBB plaques, stickers, and website seals as social proof.
4. **Complaint resolution mechanism:** The BBB serves as an intermediary for consumer complaints, providing value to both sides.

### Gaming / Manipulation Problems

This is the cautionary tale of the entire research:

- **Pay-to-play scandal (2010):** ABC News 20/20 investigation revealed that a fictitious business named "Hamas" received an A rating shortly after paying membership fees. Accredited businesses consistently scored higher than unaccredited ones, regardless of actual performance.
- **Structural conflict of interest:** Up to 90% of local BBB board members are business representatives. The BBB is "funded by the dues-paying businesses and not the consumers."
- **Aggressive sales tactics:** Some bureaus pay salespeople 30%+ commissions. Former BBB executives run outside sales firms that aggressively pitch membership.
- **Accreditation = points boost (until 2010):** Before the scandal, accreditation itself added points to a business's grade, meaning paying members automatically scored higher.
- **Grade inflation:** Businesses paying dues tend to get higher grades, though the BBB disputes this correlation.

**Reforms:** After the 2010 scandal, the BBB removed accreditation from the scoring algorithm and pledged reforms. Trust was damaged but the organization continues to operate.

### Revenue Model

- **Membership dues:** Primary revenue source (~$200M/year). Businesses pay annual fees for accreditation.
- **Seal licenses:** Businesses pay extra for BBB seals on websites and physical locations.
- **Preferential ad placement:** Paying members get better visibility in BBB directories.
- **Conflict of interest is the model:** The BBB rates the same businesses that fund it.

### Key Lessons for AgentHermes

1. **THE #1 CAUTIONARY TALE: Never let paying customers score higher because they pay.** The BBB's pay-to-play scandal destroyed its credibility. AgentHermes's scoring must be completely independent of revenue relationships.
2. **Structural independence is non-negotiable.** If the businesses being scored fund the scoring organization, the conflict of interest will eventually surface and destroy trust.
3. **The badge model still works despite flaws.** Even post-scandal, 400,000 businesses pay for BBB accreditation. Visual trust signals have enduring value.
4. **Complaint resolution adds value.** The BBB's dispute mediation is its most genuinely useful function. AgentHermes could offer "agent interaction dispute resolution" as an added service.
5. **Legacy trust takes decades to build and one scandal to destroy.**

### Sources
- [Better Business Bureau (Wikipedia)](https://en.wikipedia.org/wiki/Better_Business_Bureau)
- [How the BBB Rakes in Millions (CNN Money)](https://money.cnn.com/2015/09/30/news/better-business-bureau-millions/index.html)
- [Terror Group Gets 'A' Rating (ABC News)](https://abcnews.go.com/Blotter/business-bureau-best-ratings-money-buy/story?id=12123843)
- [Is the BBB Legit? (Prevost Law)](https://blog.prevostlawfirm.com/is-the-bbb-legit/)
- [BBB Accreditation Worth It? (ServiceTitan)](https://www.servicetitan.com/blog/bbb-accreditation)
- [Criticism of BBB (HowStuffWorks)](https://money.howstuffworks.com/better-business-bureau5.htm)

---

## 8. Domain Authority (Moz / Ahrefs)

**Creators:** Moz (Rand Fishkin, 2004); Ahrefs (Dmitry Gerasimenko, 2010)
**Year Established:** Moz DA: **2004** (first domain authority metric ever); Ahrefs DR: **2016**
**Revenue:** Moz: ~$50M/year (estimated); Ahrefs: ~$100M+ ARR (estimated)

### How It Works (Methodology)

**Moz Domain Authority (DA):**
- Scale: 1-100 (logarithmic -- going from 70 to 80 is exponentially harder than 20 to 30)
- Uses a neural network architecture weighing 40+ ranking signals
- Primarily based on backlink profile (number, quality, and diversity of linking domains)
- Incorporates spam detection
- Updated approximately monthly
- Proprietary algorithm

**Ahrefs Domain Rating (DR):**
- Scale: 0-100
- Based on a domain-level PageRank calculation
- Focuses exclusively on the "link graph"
- More transparent methodology than Moz
- Updated more frequently (approximately weekly)
- Key factors: number of referring domains, backlinks from high-traffic domains, search traffic share

**Key difference:** Both are relative metrics. If Facebook gets billions of new links, every other site's DA/DR drops relative to Facebook. Neither is a Google metric -- Google does not use DA or DR.

### What Drove Adoption

1. **Filled a vacuum:** When Google stopped publishing PageRank publicly (2013-2016), the SEO industry needed a replacement metric. Moz DA filled that gap.
2. **Free tools:** Both Moz and Ahrefs offer free DA/DR checkers, making the metrics easily accessible and widely cited.
3. **Industry language:** DA/DR became the common currency for SEO discussions, link building pricing, and guest post negotiations.
4. **API distribution:** Moz's API is used by dozens of third-party SEO tools (Ubersuggest, etc.), spreading DA as a de facto standard.

### Gaming / Manipulation Problems

Domain Authority is **heavily gamed** and this is its biggest weakness:

- **PBN link building:** Private Blog Networks create hundreds of fake sites to inflate DA/DR. A DA of 50+ can be purchased for as low as $50-80.
- **Link spam services:** Entire industries exist to artificially boost DA/DR through bulk link creation.
- **Metric confusion:** Many businesses and clients confuse DA/DR with actual Google rankings, leading to misinformed decisions.
- **Inconsistent scores:** DA and DR scores for the same domain can differ by 20+ points between Moz and Ahrefs, undermining credibility.

**Countermeasures:**
- **Moz DA 2.0 (March 2019):** Major algorithm update to better detect and discount spammy links. Incorporated Spam Score.
- **Ahrefs transparency:** More open about methodology, allowing the community to identify weaknesses.
- **Education:** Both companies actively educate users that DA/DR are not Google metrics and should be used as relative guides, not absolutes.

### Revenue Model

- **Freemium SaaS subscriptions:** Basic DA/DR checking is free; advanced SEO tools require paid plans ($99-999/month)
- **API access:** Third-party developers pay for DA/DR data access
- **Enterprise plans:** Large agencies and in-house teams pay for bulk data and advanced features
- **Educational content:** Moz's blog and community drive brand awareness and customer acquisition

### Key Lessons for AgentHermes

1. **Third-party scores that fill a vacuum become standards.** When Google hid PageRank, Moz DA became the replacement. When there's no agent readiness score, AgentHermes fills the vacuum.
2. **Cheap to game = low trust.** If the Agent Readiness Score can be bought for $50, it becomes worthless. The score must require real infrastructure changes, not just link-building equivalents.
3. **API distribution drives adoption.** Making the score available via API for other tools to consume (agent platforms, directories, CRMs) multiplies reach.
4. **Logarithmic scaling creates aspiration.** Easy to get to Silver, hard to reach Gold, very hard to reach Platinum. This mirrors Moz's logarithmic scale and keeps businesses striving.
5. **Multiple competing scores confuse the market.** Moz DA vs Ahrefs DR vs Semrush AS -- three scores measuring similar things undermines all of them. AgentHermes should aim to be the single standard, not one of many.

### Sources
- [Moz DA vs Ahrefs DR (The HOTH)](https://www.thehoth.com/blog/da-vs-dr/)
- [DA Manipulation Experiment (Xamsor)](https://xamsor.com/blog/why-moz-da-is-not-reliable-and-how-to-measure-true-website-authority/)
- [Moz Upgrades DA (Search Engine Land)](https://searchengineland.com/moz-upgrades-controversial-domain-authority-metric-311609)
- [Fake MOZ DA Metrics (Tech Business News)](https://www.techbusinessnews.com.au/fake-moz-da-metrics/)
- [DA Link Building Scam (Joe Youngblood)](https://www.joeyoungblood.com/link-building/beware-of-this-domain-authority-link-building-scam/)

---

## 9. Bonus: BitSight / SecurityScorecard (Cybersecurity Ratings)

**Creator:** BitSight (Stephen Boyer, 2011); SecurityScorecard (Aleksandr Yampolskiy, 2013)
**Year Established:** BitSight: **2011**; SecurityScorecard: **2013**
**Most analogous to AgentHermes** -- cybersecurity ratings are the closest precedent for what AgentHermes is building.

### How It Works

**BitSight:**
- Scale: 250-900 (deliberately mimics FICO's range)
- Externally assessed -- no input required from the rated company
- Evaluates: compromised systems, diligence (security configurations), user behavior, data breaches
- Algorithm weighs severity, frequency, duration, and confidence of findings
- Updated continuously from external data sources (OSINT, ISP partnerships, sinkhole monitoring)

**SecurityScorecard:**
- Scale: A-F letter grades
- 10 risk factor groups: DNS health, IP reputation, web app security, network security, leaked info, hacker chatter, endpoint security, patching cadence, social engineering, network threats
- Also externally assessed with no company input required

### What Drove Adoption

1. **Enterprise vendor risk management:** Companies need to assess the security of their supply chain. A "credit score for cybersecurity" is immediately intuitive.
2. **Insurance underwriting:** Cyber insurers use BitSight/SecurityScorecard scores to price policies.
3. **Board-level reporting:** CISOs need simple metrics to communicate risk to non-technical boards.
4. **Regulatory pressure:** Frameworks like NIST and SOC 2 encourage continuous monitoring of third-party risk.

### Key Lessons for AgentHermes

1. **This is the closest analogy to AgentHermes.** BitSight is "FICO for cybersecurity." AgentHermes is "FICO for agent readiness." Study their playbook closely.
2. **External assessment (no company cooperation needed) is critical.** BitSight rates companies whether they want to be rated or not. AgentHermes should do the same -- audit publicly available signals without requiring business participation.
3. **Insurance/risk use cases drive adoption.** If "agent readiness insurance" or "transaction guarantee" products emerge, the score becomes essential.
4. **FICO-like scale creates instant credibility.** BitSight deliberately chose 250-900 to echo FICO. AgentHermes's 0-100 with named tiers achieves the same effect.

### Sources
- [How BitSight Works](https://www.bitsight.com/blog/how-does-bitsight-work)
- [BitSight Security Ratings](https://www.bitsight.com/security-ratings)
- [BitSight (Wikipedia)](https://en.wikipedia.org/wiki/BitSight)
- [BitSight vs SecurityScorecard (FortifyData)](https://fortifydata.com/blog/difference-between-bitsight-securityscorecard/)

---

## Top 10 Lessons for AgentHermes

Synthesizing across all 9 rating systems, these are the 10 most critical lessons for building the Agent Readiness Score into the definitive standard for the agent economy:

### 1. GET A POWERFUL INTERMEDIARY TO MANDATE THE SCORE
**Evidence:** FICO became the standard when Fannie Mae/Freddie Mac mandated it (30% to 90% adoption in 4 years). D&B's D-U-N-S number became essential when the federal government required it for contracts. Chrome's "Not Secure" label drove HTTPS from 30% to 80%.

**Action for AgentHermes:** Partner with major AI agent platforms (OpenAI, Anthropic, Google, Microsoft) to display Agent Readiness Scores alongside business listings. Lobby for AI safety regulations that reference agent-readiness scoring. The ideal scenario: "AI agents will preferentially route to businesses with higher Agent Readiness Scores."

### 2. MAKE THE BASIC SCORE FREE; MONETIZE PREMIUM FEATURES
**Evidence:** Let's Encrypt made certificates free, driving adoption from 30% to 80%. G2/Trustpilot/Capterra all offer free basic profiles. Moz gives away basic DA checks for free. FICO charges per-pull but consumers can access scores free through banks.

**Action for AgentHermes:** The initial audit and Bronze-level score should be completely free. Revenue comes from: premium improvement tools, verified badge programs, buyer intent data (which AI agents are looking for businesses in your category), and enterprise API access.

### 3. NEVER LET PAYMENT INFLUENCE SCORING
**Evidence:** BBB's pay-to-play scandal (Hamas getting an A rating) destroyed its credibility. D&B's "pay to fix your report" model creates resentment. G2's paid placement raises questions about objectivity.

**Action for AgentHermes:** Build an absolute firewall between scoring and revenue. The scoring algorithm must be completely independent of whether a business is a paying customer. This is the most important structural decision AgentHermes will make.

### 4. PUBLISH THE FACTORS, KEEP THE FORMULA PROPRIETARY
**Evidence:** FICO publishes the 5 factors and their approximate weights but not the exact formula. Google published the concept of PageRank (link-based ranking) but not the exact algorithm. SOC 2 publishes the Trust Services Criteria but each audit firm applies professional judgment.

**Action for AgentHermes:** Publish exactly what dimensions are measured (API discoverability, structured data, transaction capability, security, response time, etc.) and their approximate weights. Keep the exact scoring formula, penalty curves, and normalization methods proprietary. This builds trust while preventing reverse-engineering.

### 5. USE THE "CHROME NOT SECURE" PHASED ENFORCEMENT PLAYBOOK
**Evidence:** Chrome's 3-phase rollout (passwords in 2017 -> forms in Oct 2017 -> everything in Jul 2018) is the most successful adoption enforcement strategy ever deployed. It gave businesses time to comply while maintaining constant pressure.

**Action for AgentHermes Phase Plan:**
- **Phase 1 (Now):** Score businesses silently, let them opt in to display scores
- **Phase 2 (6-12 months):** Agent platforms show "Unverified" label on businesses without scores
- **Phase 3 (12-24 months):** Agents preferentially route to scored businesses, with warnings for unscored ones
- **Phase 4 (24-36 months):** Some agent transactions require minimum score thresholds

### 6. ASSESS EXTERNALLY -- DON'T REQUIRE COOPERATION
**Evidence:** BitSight rates companies whether they cooperate or not, using only externally observable data. Google PageRank assessed pages without webmaster input. Credit bureaus collect data without consumer permission.

**Action for AgentHermes:** The initial Agent Readiness Score should be calculable from publicly available signals: API documentation quality, structured data markup, response times, security headers, payment integration signals, etc. Companies should be able to *improve* their score by cooperating (providing additional data), but the baseline score should require zero business involvement. This is critical for achieving the 2,600+ audit scale.

### 7. DESIGN THE SCORE TO RESIST GAMING FROM DAY ONE
**Evidence:** Every system studied was gamed -- PageRank (link farms), DA (PBN spam for $50), FICO (tradeline renting), BBB (paying for grades), D&B (selective reporting). The systems that survived gaming best shared three properties: (a) many diverse factors, (b) regular model updates, (c) penalties for detected manipulation.

**Action for AgentHermes:**
- Score across 7+ independent dimensions (not just API quality)
- Weight dimensions so no single factor can push a score from Bronze to Gold
- Implement anomaly detection for sudden score jumps
- Regularly update the model (quarterly) to close gaming loopholes
- Consider a "confidence score" alongside the readiness score (how much data supports the rating)

### 8. CREATE THE IDENTIFIER, NOT JUST THE SCORE
**Evidence:** D&B's D-U-N-S number became infrastructure that outlasted even government mandates. It's used for identity resolution, supply chain management, and international trade -- far beyond credit scoring. The D-U-N-S number made D&B the plumbing of B2B commerce.

**Action for AgentHermes:** Create the "AgentHermes ID" -- a unique identifier for each business's agent-readiness profile. This ID should be embeddable in APIs (HTTP headers), structured data (JSON-LD), agent tool manifests, and business directories. If the ID becomes the standard way agents identify businesses, AgentHermes becomes infrastructure, not just a score.

### 9. BUILD THE DATA MOAT, NOT THE ALGORITHM MOAT
**Evidence:** Google's real advantage was crawling the entire web, not the PageRank formula (which was published). D&B's advantage is 180+ years of trade data. G2's advantage is 2M+ reviews. FICO's advantage is integration with every lender's workflow.

**Action for AgentHermes:** The algorithm is replicable. The database of 2,600+ business audits, growing to 100,000+, is not. Every audit adds data. Every agent interaction adds signal. Every score improvement attempt adds behavioral data. This compounding data advantage becomes insurmountable over time.

### 10. LOGARITHMIC DIFFICULTY CREATES PERPETUAL ASPIRATION
**Evidence:** Moz DA uses a logarithmic scale (going from 70 to 80 is 10x harder than 20 to 30). FICO scores cluster around 700 (the median) with extreme scores rare. SOC 2 Type I is easy; Type II is hard. Let's Encrypt gives you the basic certificate for free; EV validation costs $1,000.

**Action for AgentHermes:** Design the scoring so that:
- Getting from 0 to Bronze (40) is easy and free -- just have a website with basic info
- Getting from Bronze (40) to Silver (60) requires real work -- structured data, API endpoints
- Getting from Silver (60) to Gold (75) requires significant infrastructure -- transaction capability, security hardening
- Getting from Gold (75) to Platinum (90+) requires excellence -- real-time availability, advanced agent tooling, verified track record

This creates a perpetual improvement flywheel. Businesses are always working toward the next tier. The difficulty curve ensures that Platinum is genuinely rare and genuinely meaningful.

---

## Appendix: Comparative Summary Table

| System | Year | Scale | Adoption Driver | Gaming Problem | Revenue Model | Annual Revenue |
|--------|------|-------|-----------------|---------------|---------------|----------------|
| FICO | 1989 | 300-850 | GSE mandate | Tradeline renting, synthetic ID | Per-pull royalty | $2.0B |
| D&B PAYDEX | 1980s | 1-100 | Federal contract mandate | Selective reporting | Subscription data | $2.38B |
| PageRank | 1996 | 0-10 (toolbar) | Superior search results | Link farms, paid links | Advertising (indirect) | $175B+ (Google) |
| HTTPS/SSL | 1994/2015 | Binary | Chrome "Not Secure" + free certs | Minimal (binary) | CA fees / nonprofit | Varies |
| SOC 2 | 2010 | Pass/Fail report | Customer requirements | Scope limitation, theater | Audit fees + SaaS | $850M market |
| G2 | 2012 | 1-5 stars + Grid | SEO + buyer research shift | Incentivized/fake reviews | Freemium SaaS | $100M+ ARR |
| Trustpilot | 2007 | 1-5 TrustScore | Open platform + SEO | Fake reviews | Freemium SaaS | $225.8M |
| BBB | 1912 | A+ to F | First-mover, consumer trust brand | Pay-to-play scandal | Membership dues | ~$200M+ |
| Moz DA | 2004 | 1-100 | Filled PageRank vacuum | PBN spam ($50 to buy DA 50) | Freemium SaaS | ~$50M |
| BitSight | 2011 | 250-900 | Vendor risk management | Limited (external data) | Enterprise SaaS | ~$200M+ (est.) |

---

## Key Pattern: The Standard Adoption Lifecycle

Every successful scoring standard follows the same 5-phase lifecycle:

```
Phase 1: CREATION
   Build the methodology and score a critical mass of entities.
   (FICO 1989, PageRank 1996, BitSight 2011)
   >>> AgentHermes is HERE: 2,600+ businesses scored, median 41/100

Phase 2: EARLY ADOPTION
   Early adopters use the score because it's useful, not required.
   (FICO 1989-1995, HTTPS 2014-2016, SOC 2 2010-2018)

Phase 3: INSTITUTIONAL ENDORSEMENT
   A powerful institution mandates or strongly recommends the score.
   (FICO: Fannie/Freddie 1995, D-U-N-S: FAR 1998, HTTPS: Chrome 2017)

Phase 4: MASS ADOPTION
   Adoption crosses 50%+ as the score becomes expected/required.
   (FICO post-1995, HTTPS 2017-2018, SOC 2 emerging)

Phase 5: INFRASTRUCTURE
   The score becomes invisible infrastructure. Not using it is the exception.
   (FICO today, HTTPS today, D-U-N-S for 25 years until 2022)
```

**AgentHermes's goal:** Move from Phase 1 to Phase 3 as fast as possible by securing institutional endorsement from major AI agent platforms. The transition from Phase 2 to Phase 3 is the "crossing the chasm" moment that determines whether a score becomes the standard or fades away.

---

*Research compiled by Agent 2 (Rating Systems) for the AgentHermes strategy team.*
*All sources cited inline. Data current as of March 2026.*
