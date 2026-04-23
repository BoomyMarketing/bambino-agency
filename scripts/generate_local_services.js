#!/usr/bin/env node
/**
 * Generate 25 new local service pages:
 * TOP-5 new services × 5 cities
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ── CITIES ──────────────────────────────────────────────────────────────────

const CITIES = [
  {
    id: 'london',
    name: 'London',
    lat: 51.5074, lng: -0.1278,
    pop: '9.6 million',
    businesses: '1M+',
    economy: '£500B+',
    marketDesc: 'the UK\'s largest and most competitive',
    neighbourhoods: 'the City, Canary Wharf, Shoreditch, Mayfair, and all 33 boroughs',
    competitionNote: 'London has the highest concentration of digital agencies and in-house marketing teams in the UK, making specialist expertise essential to cut through.',
  },
  {
    id: 'manchester',
    name: 'Manchester',
    lat: 53.4808, lng: -2.2426,
    pop: '560,000',
    businesses: '100K+',
    economy: '£62B+',
    marketDesc: 'the UK\'s fastest-growing',
    neighbourhoods: 'the City Centre, Salford Quays, Ancoats, Didsbury, and the wider Greater Manchester region',
    competitionNote: 'Manchester\'s tech and professional services sectors are growing at twice the national average, creating fierce competition for online visibility.',
  },
  {
    id: 'birmingham',
    name: 'Birmingham',
    lat: 52.4862, lng: -1.8904,
    pop: '1.1 million',
    businesses: '130K+',
    economy: '£24B+',
    marketDesc: 'the UK\'s second-largest',
    neighbourhoods: 'the City Centre, Digbeth, Edgbaston, Solihull, and the wider West Midlands',
    competitionNote: 'Birmingham\'s diverse economy spans manufacturing, professional services, retail, and a growing tech sector — each requiring tailored digital strategies.',
  },
  {
    id: 'leeds',
    name: 'Leeds',
    lat: 53.8008, lng: -1.5491,
    pop: '808,000',
    businesses: '95K+',
    economy: '£14B+',
    marketDesc: 'the North\'s premier',
    neighbourhoods: 'the City Centre, Headingley, Chapel Allerton, Horsforth, and the wider West Yorkshire region',
    competitionNote: 'Leeds is the largest financial and legal centre outside London, with rapidly growing tech, healthcare, and eCommerce sectors demanding sophisticated digital marketing.',
  },
  {
    id: 'bristol',
    name: 'Bristol',
    lat: 51.4545, lng: -2.5879,
    pop: '470,000',
    businesses: '70K+',
    economy: '£15B+',
    marketDesc: 'the South West\'s leading',
    neighbourhoods: 'the City Centre, Clifton, Southville, Harbourside, and the wider Bristol region',
    competitionNote: 'Bristol\'s thriving aerospace, tech, creative, and professional services sectors are intensely competitive online, rewarding businesses that invest in digital early.',
  },
];

// ── SERVICES ─────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    slug: 'cro-agency',
    serviceSlug: 'cro',
    name: 'CRO Agency',
    fullName: 'Conversion Rate Optimisation Agency',
    shortName: 'CRO',
    emoji: '📈',
    from: '£1,200/month',
    keyword: 'cro agency',
    description: 'Convert more website visitors into paying customers',
    metaDesc: 'CRO agency in {city}. A/B testing, heatmaps, UX research and landing page optimisation to grow your conversion rate. Free CRO audit from Bambino.',
    stat1: '34%', stat1Label: 'avg conversion uplift',
    stat2: '90', stat2Label: 'days to first results',
    introPara1: '{city} businesses that invest in Conversion Rate Optimisation (CRO) are turning the same traffic into significantly more revenue — without increasing their ad spend. Bambino\'s CRO agency in {city} uses data-driven testing, heatmaps, session recordings, and user research to systematically identify where visitors are dropping off and why, then fix it.',
    introPara2: 'The {city} market is competitive. Traffic is expensive. Whether you\'re generating leads via Google Ads or organic SEO, every percentage point of conversion rate improvement compounds directly to your bottom line. Bambino\'s {city} CRO clients average a 34% improvement in conversion rate within 90 days — without a single extra click.',
    introPara3: 'We start every {city} CRO engagement with a rigorous audit: heatmap analysis, session recordings, funnel analysis in GA4, form drop-off tracking, and competitor benchmark research. From this, we build a prioritised hypothesis backlog — each test ranked by potential impact, ease of implementation, and statistical confidence requirements.',
    introPara4: 'Our {city} CRO team runs structured A/B tests (minimum 95% statistical significance before declaring a winner), multivariate tests on high-traffic pages, and UX redesigns on underperforming landing pages. Every test is documented with a hypothesis, expected impact, and learnings — building a compounding knowledge base about your {city} audience.',
    bullet1: 'Rigorous A/B and multivariate testing to 95%+ statistical confidence',
    bullet2: 'Heatmap and session recording analysis of {city} user behaviour',
    bullet3: 'Landing page and form optimisation for lead generation and eCommerce',
    bullet4: 'GA4 funnel analysis and conversion tracking audit',
    bullet5: 'Monthly CRO sprint reports with transparent test results',
    bullet6: 'No lock-in — monthly rolling contracts',
    relatedServices: [
      { name: 'Web Design', slug: 'web-design', desc: 'Build conversion-focused websites from the ground up.' },
      { name: 'Google Ads', slug: 'google-ads', desc: 'Drive qualified traffic that CRO then converts.' },
      { name: 'Analytics & GA4', slug: 'analytics-ga4', desc: 'Set up the tracking that powers your CRO programme.' },
    ],
    faqs: [
      ['How much does CRO cost in {city}?', 'Bambino\'s CRO agency in {city} starts from £1,200/month for a focused programme covering one or two key pages or user journeys. Full-funnel CRO retainers typically range from £2,500 to £5,000/month depending on traffic levels and the number of tests running simultaneously. We also offer one-off CRO audits from £800.'],
      ['How long does CRO take to show results in {city}?', 'Most {city} businesses see measurable conversion rate improvements within 60–90 days of starting a CRO programme. Initial quick wins from UX fixes and copy improvements often land within the first 30 days. A/B test results depend on your traffic volumes — lower-traffic pages may need 4–8 weeks per test to reach statistical significance.'],
      ['What\'s a good conversion rate for a {city} business?', 'UK average website conversion rates are 2.35% across all industries, with top-performing {city} businesses achieving 5.31%+. eCommerce sites typically see 1.8–3.2%, while B2B lead generation pages average 2.5–5%. If you\'re below industry average, CRO is one of the highest-ROI investments you can make.'],
      ['Do you work with {city} eCommerce businesses?', 'Absolutely. Bambino\'s {city} CRO team has extensive experience with eCommerce conversion optimisation: product page testing, checkout flow simplification, cart abandonment reduction, and mobile conversion rate improvement. eCommerce CRO directly impacts revenue per session and average order value.'],
      ['What tools do you use for CRO in {city}?', 'Bambino uses Hotjar or Microsoft Clarity for heatmaps and session recordings, GA4 for funnel analysis and conversion tracking, Google Optimize or VWO for A/B testing, and custom scripts for advanced test scenarios. All tools are set up on your existing domain — no platform migration required.'],
      ['How do you measure CRO success for {city} businesses?', 'Primary metrics include conversion rate (the percentage of visitors who take your target action), revenue per visitor (especially for eCommerce), form completion rate, and cart abandonment rate. We track all metrics in a transparent monthly report and connect every test result back to estimated revenue impact in GBP.'],
      ['Can Bambino do CRO for a {city} B2B business?', 'Yes — B2B CRO is one of our specialisms. B2B {city} businesses often have complex buyer journeys and lower traffic volumes, which requires a different approach to A/B testing (more qualitative research, longer test durations, focus on MQL quality not just volume). Bambino\'s B2B CRO methodology is built around increasing pipeline quality, not just click-through rates.'],
    ],
  },
  {
    slug: 'revops-agency',
    serviceSlug: 'revops',
    name: 'RevOps Agency',
    fullName: 'Revenue Operations Agency',
    shortName: 'RevOps',
    emoji: '⚙️',
    from: '£4,500/month',
    keyword: 'revops agency',
    description: 'Align your sales, marketing and customer success for predictable revenue growth',
    metaDesc: 'RevOps agency in {city}. Revenue operations, CRM architecture, pipeline modelling and GTM alignment for UK B2B teams. Free consultation from Bambino.',
    stat1: '19%', stat1Label: 'faster revenue growth with RevOps',
    stat2: '36%', stat2Label: 'higher win rates for aligned teams',
    introPara1: 'Revenue Operations (RevOps) is the fastest-growing function in UK B2B businesses. Rather than letting sales, marketing, and customer success operate in silos — with different data, different targets, and different handoff processes — RevOps aligns these functions under a single operational framework that drives predictable, scalable revenue. Bambino\'s RevOps agency in {city} builds these systems for growth-stage and enterprise B2B businesses.',
    introPara2: '{city}\'s B2B sector is increasingly adopting RevOps as a competitive differentiator. Businesses with aligned revenue operations see 19% faster revenue growth and 36% higher win rates compared to their siloed counterparts (Forrester, 2024). If your {city} B2B team is struggling with misaligned pipelines, inconsistent MQL definitions, or CRM data you don\'t trust, RevOps is the solution.',
    introPara3: 'Bambino\'s {city} RevOps engagements start with a revenue maturity audit: mapping your current tech stack, identifying data gaps, measuring pipeline velocity, and documenting handoff processes between teams. From this baseline, we design a RevOps architecture that fits your specific growth stage — whether you\'re scaling from £1M to £5M ARR, or optimising a £20M+ revenue operation.',
    introPara4: 'Implementation covers four pillars: people (clear roles, SLAs, and shared metrics across sales, marketing, and CS), process (documented lifecycle stages, handoff criteria, and escalation paths), technology (CRM configuration, integration architecture, and automation workflows), and data (attribution modelling, pipeline reporting, and revenue forecasting). We work primarily with HubSpot and Salesforce.',
    bullet1: 'Revenue maturity audit — identify gaps costing you pipeline',
    bullet2: 'CRM architecture design and implementation (HubSpot or Salesforce)',
    bullet3: 'Sales-marketing-CS alignment workshops and SLA documentation',
    bullet4: 'Pipeline modelling and revenue forecasting frameworks',
    bullet5: 'Attribution and reporting dashboards for {city} leadership',
    bullet6: 'Ongoing RevOps support and optimisation retainers',
    relatedServices: [
      { name: 'HubSpot', slug: 'hubspot', desc: 'Full HubSpot implementation as your RevOps platform.' },
      { name: 'Lead Generation', slug: 'lead-generation', desc: 'Fill the pipeline that RevOps then optimises.' },
      { name: 'Growth Marketing', slug: 'growth-marketing', desc: 'Accelerate revenue growth with systematic experimentation.' },
    ],
    faqs: [
      ['What is RevOps and why do {city} B2B businesses need it?', 'RevOps (Revenue Operations) is the function that aligns sales, marketing, and customer success around shared data, processes, and goals to drive predictable revenue. {city} B2B businesses need it because siloed functions — where marketing generates MQLs that sales don\'t follow up, or where churn goes unmeasured — leave significant revenue on the table. RevOps closes these gaps.'],
      ['How much does a RevOps agency cost in {city}?', 'Bambino\'s RevOps agency in {city} starts from £4,500/month for ongoing RevOps operations management. Initial CRM architecture and RevOps setup projects typically range from £15,000 to £45,000 depending on complexity and existing tech stack. We also offer standalone revenue audits from £3,500.'],
      ['How long does RevOps implementation take?', 'A full RevOps implementation for a {city} B2B business typically takes 90–120 days from kick-off to full deployment: 30 days for audit and design, 60 days for CRM build and integration, 30 days for team onboarding and process embedding. Quick wins like pipeline visibility and attribution reporting can be achieved within the first 30 days.'],
      ['Which CRM do you recommend for RevOps in {city}?', 'For most {city} SMBs and growth-stage businesses (typically up to £20M ARR), we recommend HubSpot — it has faster implementation, lower total cost of ownership, and better native marketing-sales integration. For enterprise businesses with complex requirements, Salesforce may be the right choice. Bambino is certified in both and will give you an honest recommendation based on your needs.'],
      ['Can RevOps work for a {city} startup?', 'Absolutely — in fact, the best time to implement RevOps is early. {city} startups that build aligned revenue operations from the outset scale 2–3x faster than those who try to retrofit RevOps later. Even a simple RevOps foundation — shared pipeline stages, consistent MQL definition, and basic attribution reporting — can make a significant difference from Series A onwards.'],
      ['What does a RevOps agency actually do?', 'A RevOps agency like Bambino handles: CRM design and implementation, integration between your marketing, sales, and customer success tools, lifecycle stage mapping, lead scoring and routing, revenue attribution modelling, sales-marketing SLA documentation, and ongoing optimisation of your revenue tech stack. We build the operational plumbing that lets your commercial teams focus on selling.'],
      ['How do you measure RevOps success for {city} businesses?', 'Key RevOps metrics include: pipeline velocity (how fast deals move), win rate by source and segment, MQL-to-SQL conversion rate, average sales cycle length, churn rate, net revenue retention, and marketing attribution accuracy. Bambino sets baseline measurements in week one and tracks progress monthly against agreed targets.'],
    ],
  },
  {
    slug: 'hubspot-agency',
    serviceSlug: 'hubspot',
    name: 'HubSpot Agency',
    fullName: 'HubSpot Implementation & Marketing Agency',
    shortName: 'HubSpot',
    emoji: '🔧',
    from: '£2,500/month',
    keyword: 'hubspot agency',
    description: 'Implement, optimise and get the most from HubSpot for your business',
    metaDesc: 'HubSpot agency in {city}. Certified HubSpot partner for CRM implementation, marketing automation, and RevOps. Free HubSpot audit from Bambino.',
    stat1: '5', stat1Label: 'HubSpot Hubs implemented',
    stat2: '47%', stat2Label: 'avg productivity increase for HubSpot clients',
    introPara1: 'HubSpot is the world\'s leading CRM and marketing platform — but most {city} businesses use only a fraction of its capability. Bambino is a certified HubSpot partner with deep expertise across all five Hubs: Marketing, Sales, Service, CMS, and Operations. We implement HubSpot correctly from day one, migrate data safely, and train your {city} team to use it effectively.',
    introPara2: 'Poorly configured HubSpot is a common problem. {city} businesses often end up with a CRM full of dirty data, automation workflows that fire incorrectly, or marketing attribution that doesn\'t reflect reality. Bambino\'s {city} HubSpot team audits existing deployments and rebuilds them properly — or implements cleanly from scratch for businesses new to the platform.',
    introPara3: 'Our {city} HubSpot implementation process covers: data architecture design (contact and deal properties, lifecycle stages, pipeline stages), data migration from your existing CRM, integration with your other tools (Salesforce, Shopify, accounting software, and more), automation workflow design, email template builds, landing page and form setup, and GDPR configuration aligned to UK ICO requirements.',
    introPara4: 'Post-implementation, Bambino offers ongoing HubSpot retainer services for {city} businesses: managing your marketing automation, optimising your CRM data quality, building new workflows and sequences, creating reports and dashboards for leadership, and providing admin support so your team stays focused on selling and marketing rather than platform management.',
    bullet1: 'Certified across all 5 HubSpot Hubs (Marketing, Sales, Service, CMS, Operations)',
    bullet2: 'Clean data migration from existing CRM systems',
    bullet3: 'GDPR configuration aligned to UK ICO requirements',
    bullet4: 'Workflow and sequence automation design',
    bullet5: 'Team training and onboarding for {city} staff',
    bullet6: 'Ongoing HubSpot management and optimisation retainer',
    relatedServices: [
      { name: 'RevOps', slug: 'revops', desc: 'HubSpot as the centre of your Revenue Operations strategy.' },
      { name: 'Marketing Automation', slug: 'marketing-automation', desc: 'Multi-platform automation beyond HubSpot.' },
      { name: 'Lead Generation', slug: 'lead-generation', desc: 'Fill your HubSpot CRM with qualified leads.' },
    ],
    faqs: [
      ['How much does HubSpot implementation cost in {city}?', 'Bambino\'s HubSpot implementation projects in {city} start from £8,500 for a foundational setup (CRM + Marketing Hub). Full multi-Hub implementations with data migration typically range from £15,000 to £35,000. Ongoing HubSpot management retainers start from £2,500/month. All quotes are fixed-price — no surprise invoices.'],
      ['How long does HubSpot implementation take?', 'A standard HubSpot implementation for a {city} business takes 4–8 weeks from kick-off to go-live: 1 week for discovery and data architecture, 2–3 weeks for CRM build and data migration, 1 week for integrations and testing, 1 week for training and handover. Complex enterprise implementations may take longer.'],
      ['Do you migrate data from our existing CRM?', 'Yes — Bambino handles full data migration from any CRM to HubSpot: Salesforce, Pipedrive, Zoho, Act!, Dynamics, spreadsheets, and custom systems. We map your existing data structure to HubSpot\'s schema, clean data during migration, and validate everything before go-live. No data is lost in the process.'],
      ['What HubSpot tier do {city} businesses need?', 'The right HubSpot tier depends on your team size and requirements. For most {city} SMBs, HubSpot Starter (from £15/month per user) covers basic CRM needs. Professional (from £792/month) unlocks automation and advanced features most growing businesses need. Enterprise (from £3,000/month) is for larger organisations with complex requirements. Bambino will recommend the right tier honestly.'],
      ['Can you train our {city} team to use HubSpot?', 'Absolutely. All Bambino HubSpot implementations include structured team training — typically 2–4 hours of role-specific training sessions covering sales team CRM usage, marketing team email and automation, and leadership reporting. We also provide written documentation specific to your {city} team\'s workflows, not just generic HubSpot guides.'],
      ['Do you handle UK GDPR compliance in HubSpot?', 'Yes — GDPR configuration is included in all Bambino HubSpot implementations. This covers consent tracking, double opt-in workflows, contact unsubscribe management, data retention policies, and ICO-compliant marketing permissions. We also review your current data practices and flag any gaps relative to UK GDPR and PECR requirements.'],
      ['Can Bambino help if we already have HubSpot?', 'Absolutely — many {city} businesses come to us with poorly configured HubSpot deployments. We start with a HubSpot audit (£800 standalone, free with any retainer) that identifies data quality issues, automation errors, missing integrations, and reporting gaps. From this, we build a remediation plan and can take over management immediately.'],
    ],
  },
  {
    slug: 'amazon-marketing-agency',
    serviceSlug: 'amazon-marketing',
    name: 'Amazon Marketing Agency',
    fullName: 'Amazon Marketing & PPC Agency',
    shortName: 'Amazon Marketing',
    emoji: '📦',
    from: '£2,000/month',
    keyword: 'amazon marketing agency',
    description: 'Grow your Amazon sales with specialist PPC, SEO and A+ Content',
    metaDesc: 'Amazon marketing agency in {city}. Amazon PPC, Amazon SEO, A+ Content and Brand Registry for UK sellers. Free Amazon audit from Bambino Agency.',
    stat1: '47%', stat1Label: 'avg ACOS improvement',
    stat2: '3.2x', stat2Label: 'avg ROAS improvement',
    introPara1: 'Amazon is the UK\'s largest eCommerce marketplace — and an increasingly complex advertising platform. With over 300 million active accounts globally and Amazon capturing more than 30% of UK eCommerce spend, {city} businesses selling on Amazon need specialist expertise to compete profitably. Bambino\'s Amazon marketing agency in {city} covers everything from PPC management to Amazon SEO, A+ Content, and Brand Registry.',
    introPara2: 'The most common mistake {city} Amazon sellers make is treating Amazon like Google Ads. The platforms have fundamentally different dynamics: Amazon\'s A9 algorithm prioritises conversion rate and sales velocity above all else. A single poorly-optimised campaign can suppress your organic rankings while draining your ad budget. Bambino\'s Amazon team has managed over £2M in Amazon ad spend for UK sellers.',
    introPara3: 'Our {city} Amazon PPC management covers Sponsored Products, Sponsored Brands, Sponsored Display, and Video Ads. We use a tiered campaign structure that separates broad, phrase, and exact match types across Portfolio campaigns — enabling precise ACOS control and keyword harvesting. For most {city} clients, we achieve a 30–50% reduction in ACOS within the first 90 days.',
    introPara4: 'Amazon SEO is equally critical. Your product titles, bullet points, backend search terms, and A+ Content all influence where your listings appear in organic search results. Bambino optimises every element of your {city} product listings against Amazon\'s current algorithm signals — and monitors ranking positions weekly using our proprietary tracking tools.',
    bullet1: 'Sponsored Products, Brands, Display, and Video PPC management',
    bullet2: 'Amazon SEO: titles, bullet points, backend search terms, and A+ Content',
    bullet3: 'Brand Registry setup and protection for {city} sellers',
    bullet4: 'Competitor analysis and ACOS benchmarking by UK category',
    bullet5: 'Review generation strategy (compliant with Amazon Terms of Service)',
    bullet6: 'Weekly ranking tracking and monthly performance reports',
    relatedServices: [
      { name: 'Amazon DSP', slug: 'amazon-dsp', desc: 'Programmatic Amazon advertising beyond Seller Central.' },
      { name: 'Google Shopping', slug: 'google-shopping', desc: 'Multi-channel strategy for eCommerce growth.' },
      { name: 'Shopify Marketing', slug: 'shopify-marketing', desc: 'Your own store to complement your Amazon presence.' },
    ],
    faqs: [
      ['How much does Amazon marketing cost in {city}?', 'Bambino\'s Amazon marketing agency in {city} starts from £2,000/month for PPC management and monthly reporting. Full-service Amazon management (PPC + SEO + A+ Content) typically ranges from £2,500 to £5,000/month depending on catalogue size and ad budget. We recommend a minimum Amazon ad budget of £1,500/month to generate meaningful data.'],
      ['What is ACOS and what is a good ACOS for {city} sellers?', 'ACOS (Advertising Cost of Sales) is the percentage of attributed sales spent on advertising. For example, an ACOS of 25% means you\'re spending £25 for every £100 in attributed Amazon revenue. A good ACOS varies by category and margin: most UK sellers target 15–30%. Bambino\'s {city} clients average a 47% improvement in ACOS within 6 months.'],
      ['Do I need Brand Registry to sell effectively on Amazon UK?', 'Amazon Brand Registry is strongly recommended for any {city} business selling branded products. It unlocks A+ Content (which increases conversion rates by 3–10%), Sponsored Brands and Video ads, the Amazon Storefront, and brand protection tools. Registration requires a UK trademark, which Bambino can advise on.'],
      ['How long before my Amazon PPC improves?', 'Most {city} Amazon PPC improvements are visible within 30–60 days of Bambino taking over management: keyword harvesting, negative keyword additions, and bid adjustments typically yield quick wins. More significant ACOS improvements from campaign restructuring are typically visible in 60–90 days. Organic ranking improvements from Amazon SEO take 90–120 days.'],
      ['Can you help with new Amazon product launches in {city}?', 'Absolutely. Bambino\'s Amazon launch strategy for new {city} products covers: pre-launch keyword research, listing optimisation before Day 1, a structured PPC launch campaign to generate initial sales velocity, and a review generation plan (ToS-compliant). A successful launch in the first 30 days is critical for establishing organic ranking momentum.'],
      ['What Amazon categories do you specialise in?', 'Bambino has Amazon experience across health & beauty, home & kitchen, sports & outdoors, clothing & accessories, electronics, grocery, and B2B (Amazon Business). We\'ve worked with {city} sellers from sole traders with a single ASIN to brands with 500+ product listings. Category experience matters — the Amazon algorithm behaves differently across departments.'],
      ['How do you handle Amazon account health issues?', 'Bambino monitors your Amazon account health dashboard weekly. If a policy warning or suppressed listing appears, we investigate immediately and manage the appeals process. We also proactively review your account against Amazon\'s current policies to prevent issues before they arise — particularly important given Amazon\'s increasingly aggressive enforcement of UK consumer protection rules.'],
    ],
  },
  {
    slug: 'ugc-content-agency',
    serviceSlug: 'ugc-content',
    name: 'UGC Content Agency',
    fullName: 'UGC Content Production Agency',
    shortName: 'UGC',
    emoji: '🎬',
    from: '£2,500/month',
    keyword: 'ugc content agency',
    description: 'Authentic creator-made content that converts for Meta, TikTok and YouTube',
    metaDesc: 'UGC content agency in {city}. Creator-made video and photo content for Meta, TikTok, and YouTube ads. 500+ vetted UK creators. Free brief consultation.',
    stat1: '4x', stat1Label: 'higher engagement than branded content',
    stat2: '29%', stat2Label: 'higher conversion rate vs studio content',
    introPara1: 'User-Generated Content (UGC) is the fastest-growing creative format in UK digital advertising. Authentic creator-made videos — filmed on phones in real environments, speaking directly to camera, showing products in genuine use — consistently outperform polished studio content on Meta, TikTok, and YouTube. Bambino\'s UGC content agency in {city} connects brands with 500+ vetted UK creators to produce content that converts.',
    introPara2: '{city} brands have been quick to adopt UGC as a core part of their paid social strategy. The reason is simple: UK consumers are sceptical of traditional advertising, and UGC bypasses this scepticism by feeling like a recommendation rather than an ad. UGC content generates 4x higher engagement than brand-produced content and converts at 29% higher rates (Nielsen, 2024).',
    introPara3: 'Bambino\'s UGC production process is built around performance, not just aesthetics. We start with a brief aligned to your target audience and conversion objectives, identify the right creator profiles from our UK network (age, location, niche, follower range), provide creators with structured scripts that incorporate proven performance frameworks (hook–benefit–social proof–CTA), and manage the entire production and revision process.',
    introPara4: 'Every UGC package includes performance testing. We produce 3–6 variations per content brief — different hooks, different creators, different messaging angles — and deploy them as paid media tests on your Meta or TikTok account. Within 2 weeks of going live, we have clear data on which creative is performing best, and we use this to inform the next content brief. This systematic approach compounds over time.',
    bullet1: '500+ vetted UK creators across all niches and demographics',
    bullet2: 'Performance-first briefs aligned to your conversion objectives',
    bullet3: 'Multiple creative variations for A/B testing on Meta and TikTok',
    bullet4: 'ASA-compliant content with proper #ad disclosure workflows',
    bullet5: 'Full usage rights for paid advertising — no expiry',
    bullet6: 'Monthly content sprints with performance analysis',
    relatedServices: [
      { name: 'Influencer Marketing', slug: 'influencer-marketing', desc: 'Reach vs authenticity — combine UGC with influencer campaigns.' },
      { name: 'Meta Ads', slug: 'meta-ads', desc: 'Deploy your UGC content as high-performing Meta ads.' },
      { name: 'Performance Creative', slug: 'performance-creative', desc: 'Full creative production with systematic A/B testing.' },
    ],
    faqs: [
      ['How much does UGC content cost in {city}?', 'Bambino\'s UGC content agency in {city} starts from £2,500/month for a monthly sprint of 6–8 UGC videos (typically 3–4 creators × 2 variations each). One-off UGC packages start from £800 for a set of 3 videos. Enterprise UGC programmes with 20+ pieces per month are available with custom pricing.'],
      ['What is UGC content?', 'UGC (User-Generated Content) refers to authentic content created by real people — typically on their phone, in a natural environment — rather than in a professional studio. In digital advertising, UGC typically means creator-made videos showing products in real use, speaking directly to camera, sharing their genuine experience. This format outperforms traditional ad creative on platforms like TikTok and Meta.'],
      ['How do you find creators for {city} brands?', 'Bambino maintains a network of 500+ vetted UK creators across all major niches: beauty, fitness, food, home, tech, fashion, lifestyle, parenting, and more. For {city} brands, we can source local creators who reflect the city\'s demographic profile, as well as national creators who reach your target audience regardless of location. All creators are vetted for content quality, engagement authenticity, and brand safety.'],
      ['Do UGC creators need to disclose the partnership?', 'Yes — all paid UGC content must comply with UK ASA rules and the CAP Code, which require clear disclosure that content is an advertisement. Bambino manages all compliance: creators are briefed on #ad disclosure requirements, content is reviewed before delivery to ensure compliance, and we document all creator agreements. Non-compliant content can result in ASA action against your brand.'],
      ['How quickly can Bambino produce UGC for a {city} brand?', 'Bambino\'s standard UGC production timeline is 2–3 weeks from brief approval to content delivery: 3–5 days for creator selection and outreach, 5–7 days for filming, 3–5 days for review and revision. Rush timelines (7–10 days total) are available at a premium for product launches or campaign deadlines. First content delivery marks the start of your monthly sprint cycle.'],
      ['Can UGC content be used in paid ads?', 'Yes — and this is typically where UGC generates the highest ROI. All Bambino UGC content includes full paid advertising usage rights, with no content expiry. You can run the content as Meta Ads, TikTok Ads, YouTube Ads, and Google Display. We recommend keeping top-performing UGC live for 6–12 weeks before rotating, as the platform algorithms optimise delivery over time.'],
      ['What types of products work best for UGC?', 'UGC works best for products that can be demonstrated in use: skincare, supplements, fitness equipment, home products, food and drink, clothing, tech accessories, and subscription boxes are all proven categories. It also works well for services that can be documented — weight loss journeys, home improvement, tutoring outcomes. B2B SaaS companies are increasingly using UGC-style testimonial content with strong results.'],
    ],
  },
];

// ── NAV HTML ─────────────────────────────────────────────────────────────────

const MEGA_NAV_UL = `<ul class="nav-links" id="nav-links" role="list">
          <li class="nav-has-mega">
            <a href="https://bambinoagency.com/services" class="nav-mega-toggle" aria-haspopup="true" aria-expanded="false">Services <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>
            <div class="mega-menu" role="region" aria-label="Services menu">
              <div class="container">
                <div class="mega-grid">
                  <div class="mega-col">
                    <p class="mega-cat">Search &amp; AI Visibility</p>
                    <a href="https://bambinoagency.com/services/seo">SEO</a>
                    <a href="https://bambinoagency.com/services/geo">GEO / AI Search</a>
                    <a href="https://bambinoagency.com/services/technical-seo">Technical SEO</a>
                    <a href="https://bambinoagency.com/services/local-seo">Local SEO</a>
                    <a href="https://bambinoagency.com/services/enterprise-seo">Enterprise SEO</a>
                    <a href="https://bambinoagency.com/services/international-seo">International SEO</a>
                    <a href="https://bambinoagency.com/services/link-building">Link Building</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Paid Media</p>
                    <a href="https://bambinoagency.com/services/google-ads">Google Ads</a>
                    <a href="https://bambinoagency.com/services/ppc">PPC Management</a>
                    <a href="https://bambinoagency.com/services/meta-ads">Meta Ads</a>
                    <a href="https://bambinoagency.com/services/linkedin-ads">LinkedIn Ads</a>
                    <a href="https://bambinoagency.com/services/youtube-ads">YouTube Ads</a>
                    <a href="https://bambinoagency.com/services/tiktok-ads">TikTok Ads</a>
                    <a href="https://bambinoagency.com/services/pinterest-ads">Pinterest Ads</a>
                    <a href="https://bambinoagency.com/services/google-shopping">Google Shopping</a>
                    <a href="https://bambinoagency.com/services/retail-media">Retail Media</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Social &amp; Creator</p>
                    <a href="https://bambinoagency.com/services/social-media">Social Media</a>
                    <a href="https://bambinoagency.com/services/influencer-marketing">Influencer Marketing</a>
                    <a href="https://bambinoagency.com/services/ugc-content">UGC Content</a>
                    <a href="https://bambinoagency.com/services/community-building">Community Building</a>
                    <p class="mega-cat" style="margin-top:1.2rem">Content &amp; Video</p>
                    <a href="https://bambinoagency.com/services/content-marketing">Content Marketing</a>
                    <a href="https://bambinoagency.com/services/video-marketing">Video Marketing</a>
                    <a href="https://bambinoagency.com/services/digital-pr">Digital PR</a>
                    <a href="https://bambinoagency.com/services/performance-creative">Performance Creative</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Web &amp; Brand</p>
                    <a href="https://bambinoagency.com/services/web-design">Web Design</a>
                    <a href="https://bambinoagency.com/services/webflow">Webflow Development</a>
                    <a href="https://bambinoagency.com/services/branding">Branding</a>
                    <a href="https://bambinoagency.com/services/cro">CRO</a>
                    <a href="https://bambinoagency.com/services/aso">App Store Optimisation</a>
                    <a href="https://bambinoagency.com/services/analytics-ga4">Analytics &amp; GA4</a>
                    <p class="mega-cat" style="margin-top:1.2rem">AI &amp; Automation</p>
                    <a href="https://bambinoagency.com/services/ai-automations">AI Automations</a>
                    <a href="https://bambinoagency.com/services/voice-ai">Voice AI</a>
                    <a href="https://bambinoagency.com/services/ai-outbound">AI Outbound Sales</a>
                    <a href="https://bambinoagency.com/services/conversational-marketing">Conversational Marketing</a>
                    <a href="https://bambinoagency.com/services/marketing-automation">Marketing Automation</a>
                    <a href="https://bambinoagency.com/services/sms-marketing">SMS Marketing</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Operations &amp; Growth</p>
                    <a href="https://bambinoagency.com/services/revops">RevOps</a>
                    <a href="https://bambinoagency.com/services/hubspot">HubSpot</a>
                    <a href="https://bambinoagency.com/services/klaviyo">Klaviyo</a>
                    <a href="https://bambinoagency.com/services/salesforce-marketing-cloud">Salesforce Marketing Cloud</a>
                    <a href="https://bambinoagency.com/services/fractional-cmo">Fractional CMO</a>
                    <a href="https://bambinoagency.com/services/growth-marketing">Growth Marketing</a>
                    <p class="mega-cat" style="margin-top:1.2rem">B2B &amp; Enterprise</p>
                    <a href="https://bambinoagency.com/services/lead-generation">Lead Generation</a>
                    <a href="https://bambinoagency.com/services/abm">Account-Based Marketing</a>
                    <a href="https://bambinoagency.com/services/amazon-marketing">Amazon Marketing</a>
                    <a href="https://bambinoagency.com/services/ctv-advertising">CTV Advertising</a>
                    <a href="https://bambinoagency.com/services/dooh">DOOH Advertising</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">eCommerce &amp; Retention</p>
                    <a href="https://bambinoagency.com/services/shopify-marketing">Shopify Marketing</a>
                    <a href="https://bambinoagency.com/services/amazon-dsp">Amazon DSP</a>
                    <a href="https://bambinoagency.com/services/lifecycle-marketing">Lifecycle Marketing</a>
                    <a href="https://bambinoagency.com/services/subscription-commerce">Subscription Commerce</a>
                    <a href="https://bambinoagency.com/services/email-marketing">Email Marketing</a>
                    <a href="https://bambinoagency.com/services/reputation-management">Reputation Management</a>
                  </div>
                </div>
                <div class="mega-footer">
                  <a href="https://bambinoagency.com/services" class="mega-all">View all 60 services &rarr;</a>
                  <a href="https://bambinoagency.com/contact" class="mega-cta">Get a Free Audit &rarr;</a>
                </div>
              </div>
            </div>
          </li>
                <li><a href="https://bambinoagency.com/industries">Industries</a></li>
                <li><a href="https://bambinoagency.com/about">About</a></li>
                <li><a href="https://bambinoagency.com/blog">Blog</a></li>
                <li><a href="https://bambinoagency.com/pricing">Pricing</a></li>
                <li><a href="https://bambinoagency.com/contact" class="nav-cta">Get a Free Audit &rarr;</a></li>
            </ul>`;

// ── TEMPLATE ─────────────────────────────────────────────────────────────────

function t(str, city) {
  return str.replace(/\{city\}/g, city.name);
}

function generatePage(city, svc) {
  const pageTitle = `${svc.name} in ${city.name} | ${svc.fullName} | Bambino`;
  const canonical = `https://bambinoagency.com/local/${city.id}/${svc.slug}`;
  const metaDesc = t(svc.metaDesc, city);
  const h1 = `${svc.name} in ${city.name} — ${svc.description}`;
  const ogImage = 'https://bambinoagency.com/img/og-default.jpg';
  const dateModified = '2026-04-23';

  const schemaLB = JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MarketingAgency"],
    "name": "Bambino",
    "description": `${svc.fullName} services in ${city.name}`,
    "url": canonical,
    "telephone": "+44 161 000 0000",
    "email": "hello@bambinoagency.com",
    "address": { "@type": "PostalAddress", "addressLocality": city.name, "addressCountry": "GB" },
    "geo": { "@type": "GeoCoordinates", "latitude": city.lat, "longitude": city.lng },
    "priceRange": "££",
    "servedArea": { "@type": "City", "name": city.name },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": svc.fullName,
      "itemListElement": [
        { "@type": "Offer", "name": `${svc.name} - Starter`, "price": "£800/mo", "priceCurrency": "GBP" },
        { "@type": "Offer", "name": `${svc.name} - Growth`, "price": "£2,000/mo", "priceCurrency": "GBP" },
        { "@type": "Offer", "name": `${svc.name} - Scale`, "price": "£4,500/mo", "priceCurrency": "GBP" },
      ]
    },
    "dateModified": dateModified
  });

  const schemaFAQ = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": svc.faqs.map(([q, a]) => ({
      "@type": "Question",
      "name": t(q, city),
      "acceptedAnswer": { "@type": "Answer", "text": t(a, city) }
    }))
  });

  const schemaBreadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bambinoagency.com" },
      { "@type": "ListItem", "position": 2, "name": "Local", "item": "https://bambinoagency.com/local/" },
      { "@type": "ListItem", "position": 3, "name": `${svc.name} in ${city.name}`, "item": canonical }
    ]
  });

  const faqHtml = svc.faqs.map(([q, a]) => `
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>${t(q, city)}</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
          <div class="faq-answer" hidden>
            <p>${t(a, city)}</p>
          </div>
        </div>`).join('');

  const relSvcsHtml = svc.relatedServices.map(rs => `
                <div class="service-card">
                  <div class="service-icon" aria-hidden="true">🔗</div>
                  <h3>${rs.name}</h3>
                  <p>${rs.desc}</p>
                  <a href="https://bambinoagency.com/services/${rs.slug}">Learn more →</a>
                </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en-GB" class="site-bambino">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="Bambino">
  <meta property="og:locale" content="en_GB">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description" content="${metaDesc}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">${schemaLB}</script>
  <script type="application/ld+json">${schemaFAQ}</script>
  <script type="application/ld+json">${schemaBreadcrumb}</script>
  <style>
    :root {
      --primary: #FF4D00; --primary-dark: #FF6B2B; --primary-glow: rgba(255,77,0,0.25);
      --secondary: #034C3C; --secondary-dark: #056650;
      --bg: #F9F9F5; --bg-surface: #FFFFFF; --bg-soft: #F2F2EC; --dark: #034C3C;
      --text: #1A1A1A; --text-muted: #666660; --logo-color: #034C3C;
      --border-color: #E8E8E0;
      --radius: 16px; --radius-sm: 8px; --radius-btn: 100px;
      --shadow: 0 4px 24px rgba(0,0,0,0.07); --shadow-lg: 0 12px 48px rgba(0,0,0,0.12);
      --transition: 0.25s cubic-bezier(0.4,0,0.2,1);
      --font-heading: 'Berkshire Swash', serif; --font-body: 'Inter', system-ui, sans-serif;
      --max-w: 1200px;
    }
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body { font-family: var(--font-body); background: var(--bg); color: var(--text); line-height: 1.7; -webkit-font-smoothing: antialiased; overflow-x: clip; }
    h1, h2, h3, h4 { font-family: var(--font-heading); line-height: 1.2; color: var(--dark); }
    a { text-decoration: none; color: inherit; transition: color var(--transition); }
    img { max-width: 100%; display: block; }
    ul { list-style: none; }
    .container { width: min(var(--max-w), 100% - 3rem); margin-inline: auto; }

    /* REVEAL */
    .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.from-left { transform: translateX(-40px); }
    .reveal.from-right { transform: translateX(40px); }
    .reveal.visible { opacity: 1; transform: translate(0,0); }

    /* UTILITIES */
    .section-label { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--primary); background: rgba(255,77,0,0.08); padding: 0.35rem 0.9rem; border-radius: 100px; margin-bottom: 1rem; }
    .btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--primary); color: #fff; font-family: var(--font-body); font-weight: 700; font-size: 0.95rem; padding: 0.85rem 2rem; border-radius: var(--radius-btn); border: none; cursor: pointer; transition: var(--transition); }
    .btn-primary:hover { filter: brightness(1.08); transform: translateY(-2px) scale(1.02); color: #fff; }
    .btn-primary.pulse { animation: glowPulse 2.5s ease-in-out infinite; }
    @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,77,0,0.4); } 50% { box-shadow: 0 0 0 10px rgba(255,77,0,0); } }
    .btn-ghost { display: inline-flex; align-items: center; gap: 0.5rem; background: transparent; color: rgba(255,255,255,0.82); border: 2px solid rgba(255,255,255,0.3); font-weight: 600; font-size: 0.92rem; padding: 0.82rem 1.8rem; border-radius: var(--radius-btn); cursor: pointer; transition: var(--transition); }
    .btn-ghost:hover { border-color: rgba(255,255,255,0.8); color: #fff; }

    /* NAV */
    .site-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: var(--bg); padding: 1.1rem 0; transition: border-bottom 0.3s ease, box-shadow 0.3s ease; }
    .site-nav.scrolled { border-bottom: 1px solid var(--secondary); box-shadow: 0 2px 20px rgba(3,76,60,0.08); }
    .site-nav .container { display: flex; align-items: center; justify-content: space-between; }
    .nav-logo { font-family: var(--font-heading); font-size: 1.8rem; color: var(--logo-color); letter-spacing: -0.01em; }
    .nav-links { display: flex; align-items: center; gap: 2.2rem; list-style: none; }
    .nav-links a { font-size: 0.9rem; font-weight: 500; color: var(--text); position: relative; transition: color var(--transition); }
    .nav-links a::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 2px; background: var(--primary); border-radius: 2px; transition: width var(--transition); }
    .nav-links a:hover { color: var(--primary); }
    .nav-links a:hover::after { width: 100%; }
    .nav-cta { background: var(--primary) !important; color: #fff !important; font-weight: 700 !important; padding: 0.6rem 1.4rem !important; border-radius: 100px !important; transition: var(--transition) !important; }
    .nav-cta::after { display: none !important; }
    .nav-cta:hover { background: var(--primary-dark) !important; transform: scale(1.04); }
    .nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav-hamburger span { display: block; width: 24px; height: 2px; background: var(--text); border-radius: 2px; transition: var(--transition); }
    /* MEGA MENU */
    .nav-has-mega { position: relative; }
    .nav-mega-toggle { display: flex !important; align-items: center; gap: 0.4rem; cursor: pointer; }
    .nav-mega-toggle svg { transition: transform 0.2s ease; flex-shrink: 0; }
    .nav-has-mega.active .nav-mega-toggle svg { transform: rotate(180deg); }
    .mega-menu { display: none; position: fixed; top: 62px; left: 0; right: 0; background: var(--bg); border-top: 2px solid var(--primary); box-shadow: 0 8px 40px rgba(0,0,0,0.13); z-index: 998; padding: 2rem 0 1.5rem; }
    .nav-has-mega.active .mega-menu { display: block; animation: megaFadeIn 0.16s ease; }
    @keyframes megaFadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
    .mega-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.5rem 1.2rem; }
    .mega-cat { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--primary); margin-bottom: 0.45rem; margin-top: 0; }
    .mega-col a { display: block; font-size: 0.81rem; color: var(--text); padding: 0.16rem 0; transition: color 0.15s; font-weight: 400; }
    .mega-col a:hover { color: var(--primary); }
    .mega-col a::after { display: none !important; }
    .mega-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1.2rem; padding-top: 0.9rem; border-top: 1px solid var(--border-color); }
    .mega-all { font-size: 0.84rem; font-weight: 600; color: var(--secondary); }
    .mega-all:hover { color: var(--primary); }
    .mega-all::after { display: none !important; }
    .mega-cta { font-size: 0.81rem; font-weight: 700; background: var(--primary); color: #fff !important; padding: 0.45rem 1.1rem; border-radius: 100px; transition: background 0.15s; }
    .mega-cta:hover { background: #e64500 !important; }
    .mega-cta::after { display: none !important; }
    @media (max-width: 960px) { .mega-menu { display: none !important; } }

    /* MOBILE MENU */
    .mobile-menu { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--bg); z-index: 1100; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; }
    .mobile-menu.open { display: flex; }
    .mobile-menu a { font-family: var(--font-heading); font-size: 2rem; color: var(--text); }
    .mobile-menu a:hover { color: var(--primary); }
    .mobile-close { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 1.8rem; background: none; border: none; cursor: pointer; color: var(--text); line-height: 1; }

    /* BREADCRUMB */
    .breadcrumb { padding: 5.5rem 0 0; font-size: 0.82rem; color: var(--text-muted); }
    .breadcrumb .container { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .breadcrumb a { color: var(--text-muted); }
    .breadcrumb a:hover { color: var(--primary); }

    /* HERO */
    .hero { background: var(--dark); color: #fff; padding: 4rem 0 5rem; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(255,77,0,0.12) 0%, transparent 60%); }
    .hero .container { position: relative; z-index: 1; }
    .hero-agency-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 1rem; }
    .hero h1 { font-family: var(--font-heading); font-size: clamp(2rem,4.5vw,3.4rem); line-height: 1.1; color: #fff; margin-bottom: 1.2rem; max-width: 22ch; }
    .hero h1 .accent-word { color: var(--primary); }
    .hero-subtitle { font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 52ch; margin-bottom: 2rem; }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
    .hero-social-proof { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .hero-avatars { display: flex; }
    .hero-avatar { width: 36px; height: 36px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: #fff; margin-left: -8px; }
    .hero-avatar:first-child { margin-left: 0; }
    .hero-proof-text { font-size: 0.82rem; color: rgba(255,255,255,0.65); }
    .hero-stars { color: #FFB800; font-size: 0.9rem; }

    /* STATS BAR */
    .stats-bar { background: var(--primary); padding: 1.5rem 0; }
    .stats-bar .container { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; }
    .stat-value { display: block; font-family: var(--font-heading); font-size: 1.2rem; color: #fff; }
    .stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.7); }

    /* INTRO */
    .section-intro { padding: 5rem 0; background: var(--bg); }
    .section-intro .container { display: grid; grid-template-columns: 1fr 360px; gap: 4rem; align-items: start; }
    .intro-content h2 { font-family: var(--font-heading); font-size: clamp(1.6rem,3vw,2.2rem); margin-bottom: 1.5rem; }
    .intro-content p { color: var(--text-muted); margin-bottom: 1.2rem; line-height: 1.8; }
    .intro-aside { background: #fff; border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); }
    .intro-aside h3 { font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 1.2rem; color: var(--dark); }
    .feature-list li { padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.9rem; display: flex; gap: 0.6rem; }
    .feature-list li::before { content: '✓'; color: var(--primary); font-weight: 700; flex-shrink: 0; }
    .feature-list li:last-child { border-bottom: none; }

    /* RESULTS */
    .section-results { background: var(--bg-soft); padding: 3rem 0; }
    .results-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
    .result-item { text-align: center; padding: 2rem 1rem; border-right: 1px solid var(--border-color); }
    .result-item:last-child { border-right: none; }
    .result-num { font-family: var(--font-heading); font-size: clamp(2rem,4vw,3rem); color: var(--primary); display: block; }
    .result-num.g { color: var(--secondary); }
    .result-label { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem; }

    /* SERVICES */
    .section-services { padding: 5rem 0; background: var(--bg); }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-header h2 { font-family: var(--font-heading); font-size: clamp(1.6rem,3vw,2.2rem); margin-bottom: 0.75rem; }
    .section-header .subtitle { color: var(--text-muted); max-width: 52ch; margin-inline: auto; }
    .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .service-card { background: #fff; border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); transition: transform var(--transition), box-shadow var(--transition); border-bottom: 3px solid transparent; }
    .service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-bottom-color: var(--primary); }
    .service-icon { font-size: 1.8rem; margin-bottom: 1rem; }
    .service-card h3 { font-family: var(--font-heading); font-size: 1.05rem; margin-bottom: 0.5rem; }
    .service-card p { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.6; }
    .service-card a { font-size: 0.85rem; font-weight: 700; color: var(--primary); }

    /* PRICING */
    .section-pricing { padding: 5rem 0; background: var(--dark); color: #fff; }
    .section-pricing .section-header h2 { color: #fff; }
    .section-pricing .subtitle { color: rgba(255,255,255,0.65); }
    .pricing-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem; }
    .price-card { background: rgba(255,255,255,0.07); border-radius: var(--radius); padding: 2rem; text-align: center; border: 1px solid rgba(255,255,255,0.12); }
    .price-card.featured { background: var(--primary); border-color: var(--primary); }
    .price-name { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 0.75rem; }
    .price-card.featured .price-name { color: rgba(255,255,255,0.85); }
    .price-amount { font-family: var(--font-heading); font-size: 2.2rem; color: #fff; margin-bottom: 0.3rem; }
    .price-period { font-size: 0.82rem; color: rgba(255,255,255,0.5); margin-bottom: 1.5rem; }
    .price-cta { display: block; background: rgba(255,255,255,0.15); color: #fff; font-weight: 700; padding: 0.75rem; border-radius: 100px; transition: var(--transition); font-size: 0.9rem; }
    .price-card.featured .price-cta { background: #fff; color: var(--primary); }
    .price-cta:hover { background: rgba(255,255,255,0.25); }
    .view-all { text-align: center; margin-top: 2rem; }
    .view-all a { color: rgba(255,255,255,0.6); font-size: 0.9rem; }
    .view-all a:hover { color: #fff; }

    /* FAQ */
    .section-faq { padding: 5rem 0; background: var(--bg); }
    .faq-list { max-width: 780px; margin-inline: auto; }
    .faq-item { background: #fff; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); margin-bottom: 1rem; }
    .faq-question { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 1.5rem; background: none; border: none; cursor: pointer; font-family: var(--font-body); font-size: 1rem; font-weight: 600; color: var(--text); text-align: left; gap: 1rem; }
    .faq-icon { flex-shrink: 0; transition: transform 0.3s; color: var(--primary); }
    .faq-item.open .faq-icon { transform: rotate(180deg); }
    .faq-answer { overflow: hidden; max-height: 0; transition: max-height 0.35s ease; }
    .faq-item.open .faq-answer { max-height: 600px; }
    .faq-answer p { padding: 0 1.5rem 1.2rem; font-size: 0.95rem; color: var(--text-muted); line-height: 1.75; }

    /* CTA SECTION */
    .section-cta { background: var(--primary); padding: 4rem 0; text-align: center; }
    .section-cta h2 { font-family: var(--font-heading); font-size: clamp(1.8rem,3.5vw,2.8rem); color: #fff; margin-bottom: 1rem; }
    .section-cta p { color: rgba(255,255,255,0.8); max-width: 50ch; margin-inline: auto 0 auto; margin-bottom: 2rem; font-size: 1.05rem; }
    .btn-white { display: inline-flex; align-items: center; gap: 0.5rem; background: #fff; color: var(--primary); font-weight: 700; font-size: 1rem; padding: 1rem 2.5rem; border-radius: 100px; transition: var(--transition); }
    .btn-white:hover { background: var(--bg-soft); transform: translateY(-2px); }

    /* FOOTER */
    footer { background: var(--dark); color: rgba(255,255,255,0.7); padding: 4rem 0 2rem; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
    .footer-logo { font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin-bottom: 1rem; }
    .footer-desc { font-size: 0.88rem; line-height: 1.7; max-width: 28ch; }
    .footer-col-title { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 1.2rem; }
    .footer-links { display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.88rem; }
    .footer-links a { color: rgba(255,255,255,0.65); }
    .footer-links a:hover { color: var(--primary); }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; font-size: 0.82rem; color: rgba(255,255,255,0.35); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }

    /* RESPONSIVE */
    @media (max-width: 960px) {
      .nav-links { display: none; }
      .nav-hamburger { display: flex; }
      .section-intro .container { grid-template-columns: 1fr; }
      .results-grid { grid-template-columns: repeat(2, 1fr); }
      .services-grid { grid-template-columns: 1fr 1fr; }
      .pricing-cards { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 640px) {
      .stats-bar .container { grid-template-columns: repeat(2, 1fr); }
      .results-grid { grid-template-columns: repeat(2, 1fr); }
      .services-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav class="site-nav" id="site-nav" role="navigation" aria-label="Main navigation">
    <div class="container">
      <a href="https://bambinoagency.com/" class="nav-logo" aria-label="Bambino Agency — Home">Bambino</a>
      ${MEGA_NAV_UL}
      <button class="nav-hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- MOBILE MENU -->
  <div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile navigation">
    <button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>
    <a href="https://bambinoagency.com/services" onclick="closeMobileMenu()">Services</a>
    <a href="https://bambinoagency.com/industries" onclick="closeMobileMenu()">Industries</a>
    <a href="https://bambinoagency.com/about" onclick="closeMobileMenu()">About</a>
    <a href="https://bambinoagency.com/blog" onclick="closeMobileMenu()">Blog</a>
    <a href="https://bambinoagency.com/pricing" onclick="closeMobileMenu()">Pricing</a>
    <a href="https://bambinoagency.com/contact" onclick="closeMobileMenu()" style="color:var(--primary)">Get a Free Audit →</a>
  </div>

  <!-- BREADCRUMB -->
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      <a href="https://bambinoagency.com/">Home</a>
      <span>›</span>
      <a href="https://bambinoagency.com/local/">Local</a>
      <span>›</span>
      <a href="https://bambinoagency.com/local/${city.id}/">${city.name}</a>
      <span>›</span>
      <span aria-current="page">${svc.name}</span>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero" aria-label="${svc.name} in ${city.name}">
    <div class="container">
      <p class="hero-agency-label">${svc.name} · ${city.name}</p>
      <h1>${svc.name} in <span class="accent-word">${city.name}</span></h1>
      <p class="hero-subtitle">${t(svc.description, city)} — trusted by ${city.name} businesses across every sector.</p>
      <div class="hero-actions">
        <a href="https://bambinoagency.com/contact" class="btn-primary pulse">Get a Free Consultation →</a>
        <a href="https://bambinoagency.com/pricing" class="btn-ghost">View Pricing</a>
      </div>
      <div class="hero-social-proof">
        <div class="hero-avatars">
          <div class="hero-avatar" style="background:#FF4D00;">LB</div>
          <div class="hero-avatar" style="background:#056650;">SR</div>
          <div class="hero-avatar" style="background:#8B5CF6;">KP</div>
          <div class="hero-avatar" style="background:#F59E0B;">AL</div>
        </div>
        <div class="hero-proof-text">
          <div class="hero-stars" aria-label="4.9 stars">★★★★★</div>
          <strong>400+ UK clients</strong> &bull;
          <span>Trusted across the UK</span>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  <div class="stats-bar" aria-label="Key statistics">
    <div class="container">
      <div class="stat-item">
        <span class="stat-value">400+ UK clients served</span>
        <span class="stat-label">Clients</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">97% client retention</span>
        <span class="stat-label">Retention</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${svc.stat1} ${svc.stat1Label}</span>
        <span class="stat-label">Results</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${city.name}</span>
        <span class="stat-label">Service area</span>
      </div>
    </div>
  </div>

  <!-- INTRO -->
  <section class="section-intro" aria-labelledby="intro-heading">
    <div class="container">
      <div class="intro-content reveal from-left">
        <span class="section-label">${svc.name} · ${city.name}</span>
        <h2 id="intro-heading">${svc.fullName} in ${city.name}</h2>
        <p>${t(svc.introPara1, city)}</p>
        <p>${t(svc.introPara2, city)}</p>
        <p>${t(svc.introPara3, city)}</p>
        <p>${t(svc.introPara4, city)}</p>
        <a href="https://bambinoagency.com/contact" class="btn-primary" style="margin-top:1rem;">Get a Free Audit →</a>
      </div>
      <aside class="intro-aside reveal from-right">
        <h3>Why ${city.name} Businesses Choose Bambino for ${svc.shortName}</h3>
        <ul class="feature-list">
          <li>${t(svc.bullet1, city)}</li>
          <li>${t(svc.bullet2, city)}</li>
          <li>${t(svc.bullet3, city)}</li>
          <li>${t(svc.bullet4, city)}</li>
          <li>${t(svc.bullet5, city)}</li>
          <li>${t(svc.bullet6, city)}</li>
        </ul>
      </aside>
    </div>
  </section>

  <!-- RESULTS -->
  <section class="section-results" aria-label="Results">
    <div class="results-grid">
      <div class="result-item reveal">
        <span class="result-num">400+</span>
        <div class="result-label">UK clients served</div>
      </div>
      <div class="result-item reveal">
        <span class="result-num g">97%</span>
        <div class="result-label">Client retention</div>
      </div>
      <div class="result-item reveal">
        <span class="result-num">${svc.stat1}</span>
        <div class="result-label">${svc.stat1Label}</div>
      </div>
      <div class="result-item reveal">
        <span class="result-num g">${svc.stat2}</span>
        <div class="result-label">${svc.stat2Label}</div>
      </div>
    </div>
  </section>

  <!-- RELATED SERVICES -->
  <section class="section-services" aria-labelledby="services-heading">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Related Services</span>
        <h2 id="services-heading">${svc.name} Works Best With</h2>
        <p class="subtitle">Combine ${svc.shortName} with these complementary services for maximum ROI.</p>
      </div>
      <div class="services-grid">${relSvcsHtml}</div>
    </div>
  </section>

  <!-- PRICING -->
  <section class="section-pricing" aria-labelledby="pricing-heading">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label" style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);">Transparent Pricing</span>
        <h2 id="pricing-heading">Simple Pricing for ${city.name} Businesses</h2>
        <p class="subtitle">No hidden fees. No surprise invoices. Cancel anytime.</p>
      </div>
      <div class="pricing-cards">
        <div class="price-card">
          <div class="price-name">Starter</div>
          <div class="price-amount">£800/mo</div>
          <div class="price-period">per month</div>
          <a href="https://bambinoagency.com/contact" class="price-cta">Get Started</a>
        </div>
        <div class="price-card featured">
          <div class="price-name">Growth</div>
          <div class="price-amount">£2,000/mo</div>
          <div class="price-period">per month</div>
          <a href="https://bambinoagency.com/contact" class="price-cta">Most Popular</a>
        </div>
        <div class="price-card">
          <div class="price-name">Scale</div>
          <div class="price-amount">£4,500/mo</div>
          <div class="price-period">per month</div>
          <a href="https://bambinoagency.com/contact" class="price-cta">Let's Scale</a>
        </div>
      </div>
      <div class="view-all">
        <a href="https://bambinoagency.com/pricing">View full pricing details →</a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section-faq" aria-labelledby="faq-heading">
    <div class="container">
      <div class="section-header reveal" style="margin-bottom:2.5rem;">
        <span class="section-label">FAQ</span>
        <h2 id="faq-heading">Common Questions About ${svc.name} in ${city.name}</h2>
      </div>
      <div class="faq-list">${faqHtml}</div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section-cta" aria-label="Get started">
    <div class="container">
      <h2>Ready to Grow with ${svc.name} in ${city.name}?</h2>
      <p>Join 400+ UK businesses that trust Bambino to deliver measurable results. No lock-in. No surprises.</p>
      <a href="https://bambinoagency.com/contact" class="btn-white">Get a Free Audit →</a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">Bambino</div>
          <p class="footer-desc">Manchester's AI-native digital marketing agency. SEO, paid ads, AI automations, and ${svc.shortName} for UK businesses.</p>
          <p style="font-size:0.85rem;margin-top:1rem;"><a href="tel:+441610000000" style="color:rgba(255,255,255,0.7)">+44 161 000 0000</a></p>
          <p style="font-size:0.85rem;"><a href="mailto:hello@bambinoagency.com" style="color:rgba(255,255,255,0.7)">hello@bambinoagency.com</a></p>
        </div>
        <div>
          <h3 class="footer-col-title">Services</h3>
          <ul class="footer-links">
            <li><a href="https://bambinoagency.com/services/seo">SEO</a></li>
            <li><a href="https://bambinoagency.com/services/google-ads">Google Ads</a></li>
            <li><a href="https://bambinoagency.com/services/cro">CRO</a></li>
            <li><a href="https://bambinoagency.com/services/revops">RevOps</a></li>
            <li><a href="https://bambinoagency.com/services/hubspot">HubSpot</a></li>
            <li><a href="https://bambinoagency.com/services/ai-automations">AI Automations</a></li>
            <li><a href="https://bambinoagency.com/services">All Services →</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-col-title">Company</h3>
          <ul class="footer-links">
            <li><a href="https://bambinoagency.com/about">About Us</a></li>
            <li><a href="https://bambinoagency.com/blog">Blog</a></li>
            <li><a href="https://bambinoagency.com/pricing">Pricing</a></li>
            <li><a href="https://bambinoagency.com/contact">Contact</a></li>
            <li style="margin-top:0.8rem;padding-top:0.8rem;border-top:1px solid rgba(255,255,255,0.1)"><a href="https://bambinoagency.com/us">United States →</a></li>
            <li><a href="https://bambinoagency.com/ca">Canada →</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-col-title">Industries</h3>
          <ul class="footer-links">
            <li><a href="https://bambinoagency.com/industries/ecommerce">Ecommerce</a></li>
            <li><a href="https://bambinoagency.com/industries/legal">Legal</a></li>
            <li><a href="https://bambinoagency.com/industries/dental">Dental</a></li>
            <li><a href="https://bambinoagency.com/industries/property">Property</a></li>
            <li><a href="https://bambinoagency.com/industries/finance">Finance</a></li>
            <li><a href="https://bambinoagency.com/industries/saas">SaaS</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Bambino Digital Marketing Agency Ltd. Registered in England &amp; Wales.</span>
        <nav aria-label="Legal">
          <a href="https://bambinoagency.com/privacy-policy">Privacy</a> &bull;
          <a href="https://bambinoagency.com/terms">Terms</a> &bull;
          <a href="https://bambinoagency.com/cookie-policy">Cookies</a>
        </nav>
      </div>
    </div>
  </footer>

  <script>
    // Nav scroll
    const siteNav = document.getElementById('site-nav');
    window.addEventListener('scroll', () => { siteNav.classList.toggle('scrolled', window.scrollY > 20); });

    // Mobile menu
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    hamburger.addEventListener('click', () => { mobileMenu.classList.add('open'); hamburger.setAttribute('aria-expanded','true'); });
    mobileClose.addEventListener('click', closeMobileMenu);
    function closeMobileMenu() { mobileMenu.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileMenu(); });

    // Mega menu
    (function() {
      var megaParent = document.querySelector('.nav-has-mega');
      var megaTrigger = document.querySelector('.nav-mega-toggle');
      if (!megaParent || !megaTrigger) return;
      megaTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        var open = megaParent.classList.toggle('active');
        megaTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', function(e) {
        if (!megaParent.contains(e.target)) { megaParent.classList.remove('active'); megaTrigger.setAttribute('aria-expanded','false'); }
      });
    })();

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-answer').style.maxHeight = null; });
        if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
        else { btn.setAttribute('aria-expanded','false'); }
      });
    });
  </script>
</body>
</html>`;
}

// ── GENERATE ──────────────────────────────────────────────────────────────────

const sitemapEntries = [];
let created = 0;

for (const city of CITIES) {
  for (const svc of SERVICES) {
    const dir = path.join(ROOT, 'local', city.id, svc.slug);
    const file = path.join(dir, 'index.html');

    if (fs.existsSync(file)) {
      console.log(`  SKIP (exists): local/${city.id}/${svc.slug}`);
      continue;
    }

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, generatePage(city, svc), 'utf-8');
    sitemapEntries.push(`  <url><loc>https://bambinoagency.com/local/${city.id}/${svc.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority><lastmod>2026-04-23</lastmod></url>`);
    created++;
    console.log(`  ✓ local/${city.id}/${svc.slug}`);
  }
}

// Append to sitemap
if (sitemapEntries.length) {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const block = `\n  <!-- New Local Service Pages — Phase 4 (2026-04-23) -->\n${sitemapEntries.join('\n')}\n`;
  sitemap = sitemap.replace('</urlset>', block + '</urlset>');
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  console.log(`\n  Appended ${sitemapEntries.length} URLs to sitemap.xml`);
}

console.log(`\n✅ Generated ${created} local service pages.`);
