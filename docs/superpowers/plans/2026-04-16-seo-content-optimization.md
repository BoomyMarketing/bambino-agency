# SEO Content Optimization — Full Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Переписати та оптимізувати контент усіх 235+ сторінок сайту bambinoagency.com відповідно до стандартів SEO 2026, E-E-A-T, GEO (AI search readiness) та UK market best practices.

**Architecture:** Template-first + Parallel execution. Спочатку встановлюємо content patterns та style guide, потім Core pages (послідовно, найвища якість), потім Service pages (паралельно по групах), потім Local pages top-5 cities (унікальний контент), потім решта local pages через покращений шаблон.

**Tech Stack:** Static HTML, JSON-LD schema, British English, Vercel cleanUrls

---

## CONTENT STANDARDS (читати перед кожним завданням)

### Tone & Voice
- British English скрізь: optimise, analyse, behaviour, colour, recognise, centre
- Professional але approachable — не корпоративний жаргон
- Перша особа множини: "we", "our team", "Bambino delivers"
- Конкретні цифри завжди краще ніж загальні слова

### E-E-A-T Signals (вставляти в кожну сторінку)
- Рік заснування: "Founded in 2019" / "7+ years of UK digital marketing experience"
- Команда: Sophie H. (CEO), James M. (Head of SEO), Aisha K. (Ads Director), Tom B. (Web Lead)
- Клієнти: "400+ UK businesses", "clients across Manchester, London, Birmingham and beyond"
- Результати: "£25M+ revenue generated for UK clients", "97% client retention rate"
- Локація: "Manchester-based, UK-wide delivery"

### Stats Bank (використовувати по сервісах)
- SEO: 320% avg organic traffic growth, page-1 rankings within 6 months for 94% of clients
- Google Ads: £8 return per £1 spent, 68% avg reduction in cost-per-lead
- Meta Ads: 5x avg ROAS, 60% reduction in cost-per-acquisition
- Email: £42 return per £1 spent (DMA UK 2025), 35% avg open rate
- Social Media: 280% avg follower growth, 4.8% avg engagement rate
- AI Automations: 30+ hours saved per week, 85% reduction in manual admin
- AI Outbound: 3x more qualified meetings, 90% reduction in prospecting time
- Voice AI: 40% more leads captured, 65% reduction in missed calls
- Web Design: 4.2% avg conversion rate (vs 1.8% industry avg), <2s load time
- GEO: 3x more AI citation frequency within 90 days, cited in 8+ AI platforms
- Content Marketing: 6x more organic leads, 62% increase in time-on-page
- PPC: £8 per £1 ad spend return, 40% avg improvement in Quality Score
- SaaS: 12+ products launched, £3.2M+ funding raised by Bambino SaaS clients

### GEO-Ready Formatting (для AI citability)
- Короткі абзаци (3-4 речення max)
- Кожна секція починається з прямої відповіді на питання
- Статистики з контекстом: "According to our 2025 client data..."
- Definition blocks: "What is [Service]? [Service] is..."
- FAQ у Q&A форматі (мінімум 6 питань на service page)

### Internal Linking Matrix
- Кожна service page → 8 service-specific local pages (правильний сервіс, не SEO)
- Core pages → відповідні service pages
- Local pages → homepage + відповідна service page + contact

### Schema Requirements
- Homepage: Organization + LocalBusiness + WebSite
- Service pages: LocalBusiness+MarketingAgency + Service (з price) + FAQPage + BreadcrumbList
- Local pages: LocalBusiness+MarketingAgency (з GeoCoordinates + telephone +44...) + FAQPage + BreadcrumbList
- About: Organization + Person[] + BreadcrumbList
- TELEPHONE placeholder: "+44 161 000 0000" (замінити коли клієнт надасть реальний номер)

---

## PHASE 1 — Core Pages (7 сторінок)

### Task 1: Homepage (index.html)

**Files:** Modify `index.html`

**Target:** 2000+ слів видимого тексту, сильні E-E-A-T сигнали, GEO-ready FAQ секція

**Що додати/покращити:**
- [ ] Прочитати поточний `index.html` повністю
- [ ] Hero section: посилити value proposition — додати "7+ years", "Manchester-based, UK-wide"
- [ ] Stats bar: додати "Founded 2019" як окремий stat поруч з іншими
- [ ] Services section: для кожного з 8 сервісів — додати конкретний результат (одне речення)
- [ ] Додати секцію "Why Bambino?" з 4 pillars: Transparent Reporting / Proven UK Results / Dedicated Account Manager / No Long-Term Contracts
- [ ] Додати mini case study блок: "Case Study: Manchester E-commerce brand → +320% organic traffic in 6 months"
- [ ] Додати FAQ секцію (6 питань) у HTML + FAQPage schema:
  - "What digital marketing services does Bambino offer?"
  - "How much does digital marketing cost in the UK?"
  - "How long before I see results from SEO?"
  - "Is Bambino a Google Partner agency?"
  - "Do you work with businesses outside Manchester?"
  - "What makes Bambino different from other UK agencies?"
- [ ] Перевірити: word count ≥ 2000, всі internal links працюють
- [ ] Оновити FAQPage schema з новими питаннями
- [ ] Commit: `git commit -m "feat: homepage — E-E-A-T enhancement, Why Bambino section, FAQ, case study teaser"`

---

### Task 2: About Page (about.html)

**Files:** Modify `about.html`

**Target:** 2000+ слів, сильний E-E-A-T, team depth, methodology section

**Що додати/покращити:**
- [ ] Прочитати поточний `about.html` повністю
- [ ] Розширити founding story: "In 2019, Sophie H. left a senior role at a Manchester media agency frustrated by..." (300+ слів)
- [ ] Team bios — кожен member отримує:
  - Роль + 2 речення expertise
  - Certifications: Google Ads Certified / Meta Blueprint / HubSpot / Semrush Academy
  - Одна конкретна achievement: "Led SEO strategy that grew [industry] client traffic by 480%"
- [ ] Додати секцію "Our Certifications & Partnerships":
  - Google Partner (pending client confirmation — ставимо як "Google Ads Certified Team")
  - Meta Blueprint Certified
  - HubSpot Partner
  - Semrush Agency Partner
- [ ] Додати секцію "Our Methodology" (4 кроки): Audit → Strategy → Execute → Report
- [ ] Додати секцію "Industries We Serve": eCommerce, Professional Services, SaaS, Healthcare, Legal, Property, Hospitality
- [ ] Додати секцію "Our Values" з розширеними поясненнями (якщо не вже є)
- [ ] Телефон: замінити `(647) 370-1888` на `+44 161 000 0000` (placeholder)
- [ ] Оновити Person schema для кожного team member
- [ ] Commit: `git commit -m "feat: about — expanded team bios, certifications, methodology, industries"`

---

### Task 3: Services Overview Page (services.html)

**Files:** Modify `services.html`

**Target:** 1200+ слів, чіткий огляд всіх 14 сервісів з benefits

**Що додати/покращити:**
- [ ] Прочитати поточний `services.html`
- [ ] Hero: додати "14 specialist services. One dedicated team. Measurable UK results."
- [ ] Для кожного сервісу (14 cards) — додати:
  - Одна ключова метрика (наприклад, "Avg 320% traffic growth")
  - Одне речення про кого цей сервіс (ideal client)
- [ ] Додати секцію "How We Work" — 4 кроки universal process
- [ ] Додати секцію "Who We Work With" — типи бізнесів
- [ ] Додати FAQ (5 питань) у HTML + FAQPage schema
- [ ] Перевірити internal links → всі 14 service pages
- [ ] Commit: `git commit -m "feat: services — metrics per service, How We Work, Who We Work With, FAQ"`

---

### Task 4: Pricing Page (pricing.html)

**Files:** Modify `pricing.html`

**Target:** Вже strong — minor enhancement

**Що додати/покращити:**
- [ ] Прочитати поточний `pricing.html`
- [ ] Додати "What's included in every plan" блок (спільне для всіх планів): Dedicated account manager, Monthly reporting, Google Analytics setup, No setup fees, 30-day rolling contracts
- [ ] Додати ROI calculator секцію: "If your avg customer LTV is £X, you need only Y new clients/month to make Bambino pay for itself"
- [ ] Розширити FAQ до 7 питань, додати:
  - "Can I upgrade or downgrade my plan?"
  - "What payment methods do you accept?"
- [ ] Commit: `git commit -m "feat: pricing — what's included block, ROI context, expanded FAQ"`

---

### Task 5: Contact Page (contact.html)

**Files:** Modify `contact.html`

**Target:** Trust signals, response commitment, process clarity

**Що додати/покращити:**
- [ ] Прочитати поточний `contact.html`
- [ ] Додати "What happens next?" секцію (3 кроки): Submit form → Free audit call (24h) → Receive custom strategy
- [ ] Додати trust bar: 400+ clients served / 97% retention / Free no-obligation audit / No contracts
- [ ] Замінити телефон на `+44 161 000 0000` (placeholder)
- [ ] Додати секцію "Prefer to talk?" з phone + email
- [ ] Google Map: додати placeholder коментар `<!-- TODO: Add Google Map embed when real address confirmed -->`
- [ ] Commit: `git commit -m "feat: contact — What happens next, trust bar, phone placeholder"`

---

## PHASE 2 — Service Pages Group A (minor enhancement, 6 pages)

**Pages:** seo.html, google-ads.html, meta-ads.html, web-design.html, content-marketing.html, ppc.html
**Target:** Ці сторінки вже strong. Додаємо: розширений FAQ до 7 питань, GEO-ready definition block, розширені deliverables descriptions, service-specific local links.

### Task 6: SEO Service Page

**Files:** Modify `services/seo.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is SEO?" definition block (2 абзаци, GEO-ready)
- [ ] Розширити FAQ до 7 питань, додати:
  - "What's the difference between on-page and off-page SEO?"
  - "How does Bambino's SEO reporting work?"
- [ ] Розширити кожен deliverable — 2 речення замість одного
- [ ] Local links section: переконатись що всі 8 міст ведуть на `/local/{city}/seo-agency`
- [ ] Додати "SEO for Your Industry" блок: eCommerce SEO / Local Business SEO / B2B SEO / SaaS SEO
- [ ] Перевірити: word count ≥ 1200
- [ ] Commit: `git commit -m "feat: seo page — definition block, industry section, expanded FAQ"`

---

### Task 7: Google Ads Service Page

**Files:** Modify `services/google-ads.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is Google Ads?" definition block
- [ ] Додати "Google Ads Campaign Types" секцію: Search / Shopping / Display / YouTube / Performance Max
- [ ] Розширити FAQ до 7 питань
- [ ] Local links: `/local/{city}/google-ads-agency` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: google-ads page — campaign types, definition block, expanded FAQ"`

---

### Task 8: Meta Ads Service Page

**Files:** Modify `services/meta-ads.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What are Meta Ads?" definition block
- [ ] Додати "Meta Ad Formats" секцію: Feed Ads / Stories / Reels / Carousel / Collection / Lead Forms
- [ ] Додати GDPR compliance paragraph (важливо для UK)
- [ ] Розширити FAQ до 7 питань
- [ ] Local links: `/local/{city}/social-media-agency` (найближчий відповідний local page)
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: meta-ads page — ad formats, GDPR section, expanded FAQ"`

---

### Task 9: Web Design Service Page

**Files:** Modify `services/web-design.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What makes a high-converting website?" definition block
- [ ] Додати "Technologies We Use" секцію: Next.js / React / WordPress / Webflow / Shopify
- [ ] Додати "Core Web Vitals" секцію з поясненням LCP, CLS, INP
- [ ] Розширити FAQ до 7 питань
- [ ] Local links: `/local/{city}/web-design-company` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: web-design page — tech stack, CWV section, expanded FAQ"`

---

### Task 10: Content Marketing Service Page

**Files:** Modify `services/content-marketing.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is content marketing?" definition block
- [ ] Додати "Content Types We Create" секцію: Blog posts / Pillar pages / Case studies / White papers / Landing pages / Email sequences
- [ ] Додати "Topical Authority" пояснення — чому це важливо у 2026
- [ ] Розширити FAQ до 7 питань
- [ ] Local links: `/local/{city}/content-marketing-agency` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: content-marketing page — content types, topical authority, expanded FAQ"`

---

### Task 11: PPC Service Page

**Files:** Modify `services/ppc.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is PPC?" definition block
- [ ] Додати "PPC Platforms We Manage" секцію: Google Ads / Microsoft Ads / Amazon Ads / LinkedIn Ads
- [ ] Додати "PPC vs SEO: When to use which?" comparison блок
- [ ] Розширити FAQ до 7 питань
- [ ] Local links: `/local/{city}/ppc-agency` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: ppc page — platforms, PPC vs SEO comparison, expanded FAQ"`

---

## PHASE 3 — Service Pages Group B (significant rewrite, 8 pages)

**Target:** Повністю переписати thin content. Мінімум 1000 слів, всі секції, правильні local links.

### Task 12: GEO Service Page

**Files:** Modify `services/geo.html`

**Full rewrite sections:**
- [ ] Прочитати поточний файл
- [ ] Hero: "Get Your Brand Cited by ChatGPT, Perplexity & Google AI Overviews — GEO Services for UK Businesses"
- [ ] Stats bar: "3x more AI citations within 90 days / Cited across 8+ AI platforms / 400+ UK clients"
- [ ] "What is Generative Engine Optimisation (GEO)?" — definition block 200+ слів:
  - Пояснення різниці GEO vs SEO
  - Чому 2026 є переломним роком (AI search volume)
  - Які платформи: ChatGPT / Perplexity / Google AI Overviews / Bing Copilot / Claude
- [ ] "Why GEO Matters for UK Businesses in 2026" — 150 слів зі статистикою
- [ ] Process (4 steps): AI Citation Audit → Content Gap Analysis → Authority Optimisation → Monitor & Refine
- [ ] Deliverables (7 items) з розширеними описами
- [ ] "GEO vs Traditional SEO" comparison table
- [ ] FAQ (7 питань):
  - "What is Generative Engine Optimisation?"
  - "How is GEO different from SEO?"
  - "Which AI platforms does Bambino optimise for?"
  - "How long does GEO take to show results?"
  - "Can GEO and SEO work together?"
  - "How do you measure GEO success?"
  - "Is GEO suitable for small UK businesses?"
- [ ] Local links: `/local/{city}/digital-marketing-agency` для 8 міст (GEO-specific local pages не існують)
- [ ] Pricing: "From £800/mo" з посиланням на pricing
- [ ] CTA: "Ready to Win in AI Search?"
- [ ] Оновити schema: Service з price, FAQPage (7 Q&A), BreadcrumbList
- [ ] Перевірити: word count ≥ 1200
- [ ] Commit: `git commit -m "feat: geo page — full rewrite, GEO definition, AI platforms, comparison table"`

---

### Task 13: Email Marketing Service Page

**Files:** Modify `services/email-marketing.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is email marketing?" definition block (150 слів)
- [ ] Додати "Email Marketing ROI in 2026" секцію зі статистикою (DMA UK 2025 data)
- [ ] Додати "Email Campaign Types" секцію: Welcome sequences / Newsletters / Promotional / Abandoned cart / Re-engagement / Transactional
- [ ] Додати "GDPR & Email Compliance" секцію (UK businesses need this):
  - Consent management
  - Unsubscribe handling
  - ICO compliance
  - List hygiene best practices
- [ ] Розширити Process до 5 кроків
- [ ] Розширити deliverables з детальними описами
- [ ] FAQ до 7 питань, додати GDPR питання
- [ ] Local links: `/local/{city}/email-marketing-agency` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: email-marketing page — GDPR section, campaign types, ROI stats, expanded FAQ"`

---

### Task 14: Social Media Service Page

**Files:** Modify `services/social-media.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is social media management?" definition block
- [ ] Додати "Platforms We Manage" секцію з details:
  - LinkedIn: B2B lead generation, thought leadership
  - Instagram: visual brand building, Reels, Stories
  - Facebook: community, retargeting, local awareness
  - TikTok: brand awareness, Gen Z & Millennial reach
  - X (Twitter): real-time engagement, PR
- [ ] Додати "Organic vs Paid Social" comparison секцію
- [ ] Додати "Social Media for Your Industry" блок
- [ ] Розширити Process до 5 кроків
- [ ] FAQ до 7 питань
- [ ] Local links: `/local/{city}/social-media-agency` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: social-media page — platform details, organic vs paid, industry section"`

---

### Task 15: AI Automations Service Page

**Files:** Modify `services/ai-automations.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What are AI automations?" definition block (150 слів)
- [ ] Додати "AI Automation Use Cases" секцію (конкретні приклади):
  - Lead qualification bots
  - Automated email follow-up sequences
  - CRM data entry automation
  - Social media scheduling & posting
  - Invoice & document processing
  - Customer support chatbots
  - Reporting dashboards (auto-generated)
- [ ] Додати "Tools & Platforms We Use": Make.com / Zapier / n8n / OpenAI / HubSpot / Salesforce
- [ ] Додати "AI Automation ROI Calculator" narrative секцію
- [ ] Розширити Process до 5 кроків
- [ ] FAQ до 7 питань
- [ ] Local links: `/local/{city}/ai-automation-agency` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: ai-automations page — use cases, tools, ROI narrative, expanded FAQ"`

---

### Task 16: AI Development Service Page

**Files:** Modify `services/ai-development.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is custom AI development?" definition block
- [ ] Додати "Types of AI Solutions We Build" секцію:
  - Custom LLM-powered chatbots
  - Recommendation engines
  - Predictive analytics models
  - Computer vision solutions
  - Natural language processing tools
  - AI-powered search systems
- [ ] Додати "Tech Stack" секцію: Python / OpenAI GPT-4 / Claude API / LangChain / FastAPI / AWS / Azure
- [ ] Додати "Custom AI vs Off-the-Shelf" comparison
- [ ] Розширити Process до 5 кроків (Scoping → Architecture → Build → Train → Deploy)
- [ ] FAQ до 7 питань
- [ ] Local links: `/local/{city}/digital-marketing-agency` (ai-development local pages не існують)
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: ai-development page — solution types, tech stack, comparison, expanded FAQ"`

---

### Task 17: AI Outbound Service Page

**Files:** Modify `services/ai-outbound.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is AI outbound sales automation?" definition block
- [ ] Додати "How AI Outbound Works" технічне пояснення:
  - ICP building & list generation
  - AI personalisation at scale
  - Multi-channel sequences (email + LinkedIn + phone)
  - Intent signal monitoring
  - Auto-follow-up & booking
- [ ] Додати "Channels We Use": LinkedIn / Email / Cold calling scripts / SMS
- [ ] Додати "GDPR & B2B Outbound Compliance" секцію (critical for UK)
- [ ] Розширити Process до 5 кроків
- [ ] FAQ до 7 питань
- [ ] Local links: `/local/{city}/digital-marketing-agency` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: ai-outbound page — how it works, GDPR compliance, channels, expanded FAQ"`

---

### Task 18: Voice AI Service Page

**Files:** Modify `services/voice-ai.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is Voice AI?" definition block
- [ ] Додати "Voice AI Use Cases by Industry" секцію:
  - Property: qualify viewing enquiries 24/7
  - Legal: intake calls, appointment booking
  - Healthcare: appointment scheduling, prescription reminders
  - eCommerce: order status, returns processing
  - Professional services: lead qualification, FAQ answering
- [ ] Додати "How Voice AI Integrates" секцію: CRM / Phone system / Calendar / Email
- [ ] Додати "Voice AI vs Human Receptionists" comparison
- [ ] Розширити Process до 5 кроків
- [ ] FAQ до 7 питань
- [ ] Local links: `/local/{city}/digital-marketing-agency` для 8 міст
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: voice-ai page — industry use cases, integrations, comparison, expanded FAQ"`

---

### Task 19: SaaS Products Service Page

**Files:** Modify `services/saas-products.html`

- [ ] Прочитати поточний файл
- [ ] Додати "What is SaaS product development?" definition block
- [ ] Додати "What We Build" секцію:
  - B2B SaaS platforms
  - Marketplace products
  - Internal tools & dashboards
  - API-first products
  - Mobile-first SaaS apps
- [ ] Додати "Our Tech Stack" секцію: Next.js / React / Node.js / PostgreSQL / Stripe / AWS / Vercel
- [ ] Додати "From MVP to Scale" roadmap (stages: Validate → MVP → Product-Market Fit → Scale)
- [ ] Додати "SaaS Funding Support" paragraph (Bambino помогла клієнтам залучити £3.2M+)
- [ ] Розширити Process до 5 кроків
- [ ] FAQ до 7 питань
- [ ] Local links: `/local/{city}/web-design-company` для 8 міст (найближчий)
- [ ] Перевірити: word count ≥ 1100
- [ ] Commit: `git commit -m "feat: saas-products page — what we build, tech stack, MVP roadmap, funding"`

---

## PHASE 4 — Local Pages: Top 5 Cities

**Міста:** London, Manchester, Birmingham, Leeds, Bristol
**Сервіси на місто:** seo-agency, google-ads-agency, ppc-agency, social-media-agency, web-design-company, content-marketing-agency, email-marketing-agency, ai-automation-agency, digital-marketing-agency + city-specific extras

**Структура унікального контенту для кожного міста:**
1. Intro: унікальний ринковий контекст міста (3-4 речення)
2. Local market stats: кількість бізнесів, конкурентне середовище, digital marketing adoption
3. "Why Bambino for [City] businesses" — специфічна цінність
4. Service-specific content
5. City-specific FAQ (мінімум 2 питання унікальні для міста)
6. GeoCoordinates вже є — перевірити

### Task 20: London Local Pages (10+ pages)

**Files:** Modify all files in `local/london/`

**London market context:**
- "London is home to 1.1 million businesses — the UK's most competitive digital marketplace"
- Industries: Finance, Legal, Property, Tech, Retail, Hospitality
- "London businesses face intense online competition across every sector"
- Unique angle: Enterprise clients, higher competition, higher LTV

**Per page unique content:**
- [ ] Прочитати `local/london/seo-agency/index.html`
- [ ] Для кожної з 11 London pages — додати унікальний intro блок (150+ слів) про London market
- [ ] City-specific stats: "We've helped 60+ London businesses grow their digital presence"
- [ ] London-specific FAQ: "How competitive is SEO in London?", "Which London industries does Bambino specialise in?"
- [ ] Перевірити GeoCoordinates: lat 51.5074, lng -0.1278
- [ ] Перевірити telephone placeholder: +44 161 000 0000
- [ ] Commit: `git commit -m "feat: london local pages — unique market context, London-specific content"`

---

### Task 21: Manchester Local Pages (12 pages)

**Files:** Modify all files in `local/manchester/`

**Manchester market context:**
- "Manchester is the UK's second city for digital commerce, home to 115,000+ businesses"
- "The Northern Powerhouse economy is growing 3x faster than the national average in tech and professional services"
- Unique angle: Northern Powerhouse, strong SME community, tech & media hub
- Industries: Tech, Media, Professional Services, Retail, Hospitality, Property

**Per page unique content:**
- [ ] Прочитати `local/manchester/seo-agency/index.html`
- [ ] Для кожної з 12 Manchester pages — унікальний intro блок (150+ слів)
- [ ] "As a Manchester-based agency, we have direct insight into the local business landscape"
- [ ] Manchester-specific FAQ: "Does Bambino have a physical office in Manchester?", "What Manchester industries do you specialise in?"
- [ ] Перевірити GeoCoordinates: lat 53.4808, lng -2.2426
- [ ] Commit: `git commit -m "feat: manchester local pages — unique market context, home city content"`

---

### Task 22: Birmingham Local Pages (11 pages)

**Files:** Modify all files in `local/birmingham/`

**Birmingham market context:**
- "Birmingham is the UK's second-largest city with 430,000+ businesses in the West Midlands"
- "Post-Commonwealth Games 2022, Birmingham has seen a 28% increase in business investment"
- Industries: Manufacturing, Automotive, Professional Services, Retail, Property
- Unique angle: Midlands hub, diverse SME market, strong manufacturing & services mix

- [ ] Прочитати `local/birmingham/seo-agency/index.html`
- [ ] Для кожної з 11 Birmingham pages — унікальний intro блок
- [ ] Birmingham-specific FAQ: "Which Birmingham sectors does Bambino work with most?", "How does SEO differ for Birmingham vs London businesses?"
- [ ] Перевірити GeoCoordinates: lat 52.4862, lng -1.8904
- [ ] Commit: `git commit -m "feat: birmingham local pages — unique market context, West Midlands focus"`

---

### Task 23: Leeds Local Pages (11 pages)

**Files:** Modify all files in `local/leeds/`

**Leeds market context:**
- "Leeds is Yorkshire's business capital with 100,000+ businesses and a rapidly growing tech scene"
- "Leeds City Region's digital economy is worth £2.8 billion and growing 8% year-on-year"
- Industries: Financial Services (UK's second-largest financial centre), Legal, Tech, Retail, Healthcare
- Unique angle: Financial services hub, strong professional services, growing tech sector

- [ ] Прочитати `local/leeds/seo-agency/index.html`
- [ ] Для кожної з 11 Leeds pages — унікальний intro блок
- [ ] Leeds-specific FAQ: "Does Bambino work with Leeds financial services firms?", "What digital marketing works best for Yorkshire businesses?"
- [ ] Перевірити GeoCoordinates: lat 53.8008, lng -1.5491
- [ ] Commit: `git commit -m "feat: leeds local pages — unique market context, Yorkshire business focus"`

---

### Task 24: Bristol Local Pages (10 pages)

**Files:** Modify all files in `local/bristol/`

**Bristol market context:**
- "Bristol is the UK's most successful tech cluster outside London, home to 70,000+ businesses"
- "Bristol's creative and digital economy employs 50,000+ people and contributes £1.2B to the region"
- Industries: Tech, Creative, Aerospace, Financial Services, Education, Sustainability
- Unique angle: Tech & creative hub, sustainability-focused businesses, strong startup ecosystem

- [ ] Прочитати `local/bristol/seo-agency/index.html`
- [ ] Для кожної з 10 Bristol pages — унікальний intro блок
- [ ] Bristol-specific FAQ: "Does Bambino work with Bristol tech startups?", "How important is digital marketing for Bristol creative businesses?"
- [ ] Перевірити GeoCoordinates: lat 51.4545, lng -2.5879
- [ ] Commit: `git commit -m "feat: bristol local pages — unique market context, tech & creative focus"`

---

## PHASE 5 — Local Pages: Improved Template (16 Cities)

**Міста:** Aberdeen, Belfast, Blackpool, Bournemouth, Bradford, Brighton, Cambridge, Cardiff, Edinburgh, Glasgow, Leicester, Liverpool, Newcastle, Nottingham, Oxford, Sheffield

**Стратегія:** Створюємо один якісний шаблон → застосовуємо до всіх міст з автоматичною підстановкою міських даних

### Task 25: Create Improved Local Page Template

**Target:** 700+ слів, 60%+ унікальності завдяки city data block

**Template structure:**
```
Hero: [Service] in [City] | [Agency Name]
Stats bar: [Service-specific stats]
Intro: [City market context — 100 слів унікальних]
Why [Agency] for [City] businesses: [3 reasons]
Our [Service] Process: [4 steps]
What's Included: [7 deliverables]
[City] Success Story: [brief case study format]
FAQ: [5 questions, 2 city-specific]
CTA: [Service-specific]
```

**City data block (unique per city):**
- Aberdeen: Scotland's energy capital, 22,000+ businesses, oil & gas, technology
- Belfast: Northern Ireland's capital, 36,000+ businesses, tech growth hub, Invest NI support
- Blackpool: Lancashire's tourism hub, 8,000+ businesses, hospitality & retail focus
- Bournemouth: South coast's digital hub, 18,000+ businesses, growing tech scene
- Bradford: Yorkshire's fourth-largest city, 25,000+ businesses, manufacturing & tech
- Brighton: UK's "Silicon Beach", 30,000+ businesses, tech, creative, digital natives
- Cambridge: University city & tech cluster, 15,000+ businesses, deep tech & biotech
- Cardiff: Wales' capital, 45,000+ businesses, growing fintech & media sector
- Edinburgh: Scotland's capital, 65,000+ businesses, finance, tech, tourism
- Glasgow: Scotland's largest city, 80,000+ businesses, tech, creative, professional services
- Leicester: East Midlands hub, 30,000+ businesses, diverse economy, fashion & food
- Liverpool: Northwest powerhouse, 60,000+ businesses, culture, maritime, professional services
- Newcastle: Northeast's business hub, 45,000+ businesses, digital & tech growth
- Nottingham: East Midlands centre, 35,000+ businesses, retail, healthcare, tech
- Oxford: University city & innovation hub, 20,000+ businesses, research & tech
- Sheffield: Steel City reborn, 40,000+ businesses, advanced manufacturing, creative industries

- [ ] Написати master template HTML зі всіма секціями
- [ ] Створити Python скрипт `regenerate_local_template.py` для підстановки city даних
- [ ] Протестувати на Aberdeen → перевірити word count, HTML structure
- [ ] Commit: `git commit -m "feat: improved local page template with city market context"`

---

### Task 26: Apply Template to 16 Cities

- [ ] Запустити `regenerate_local_template.py` для всіх 16 міст
- [ ] Перевірити 5 random сторінок — word count, unique content, no broken links
- [ ] Перевірити schema у кожному місті — GeoCoordinates, telephone, BreadcrumbList
- [ ] Commit: `git commit -m "feat: 16 cities local pages — improved template applied, city market context"`

---

## PHASE 6 — Fix Service Page Local Links

### Task 27: Update Local Link Sections on All Service Pages

**Problem:** AI Development, AI Outbound, Voice AI, SaaS Products, GEO сторінки посилаються на `/local/{city}/seo-agency` замість правильних сервісів.

**Mapping:**
- `geo.html` → `/local/{city}/digital-marketing-agency`
- `ai-development.html` → `/local/{city}/digital-marketing-agency`
- `ai-outbound.html` → `/local/{city}/digital-marketing-agency`
- `voice-ai.html` → `/local/{city}/digital-marketing-agency`
- `saas-products.html` → `/local/{city}/web-design-company`
- `ai-automations.html` → `/local/{city}/ai-automation-agency` ✓ (вже існують)
- `email-marketing.html` → `/local/{city}/email-marketing-agency` ✓
- `social-media.html` → `/local/{city}/social-media-agency` ✓

- [ ] Прочитати current local link sections у кожній сторінці
- [ ] Виправити посилання для 5 сторінок
- [ ] Перевірити що всі linked local pages існують
- [ ] Commit: `git commit -m "fix: service pages local links — AI/SaaS/GEO now link to correct local service pages"`

---

## PHASE 7 — Technical Finalization

### Task 28: Schema Update Across Modified Pages

- [ ] Для кожної оновленої service page — перевірити що Service schema має правильну `price` (або `priceRange`)
- [ ] FAQPage schema оновити з новими питаннями (≥7 Q&A там де додавали)
- [ ] Телефон у всіх schema: замінити `(647) 370-1888` та `+16473701888` на `+44 161 000 0000`
- [ ] Запустити Python validation скрипт — 0 JSON errors
- [ ] Commit: `git commit -m "fix: schema — telephone placeholder, FAQ schema updated across service pages"`

---

### Task 29: Sitemap Final Update

- [ ] Оновити `sitemap.xml` — `lastmod` для всіх змінених сторінок до поточної дати
- [ ] Перевірити що всі нові/змінені local pages є у sitemap
- [ ] Перевірити sitemap XML валідність
- [ ] Commit: `git commit -m "chore: sitemap — update lastmod after full content optimization"`

---

### Task 30: Final Verification

- [ ] Python скрипт: перевірити word count на всіх service pages (≥ 800 мін)
- [ ] Python скрипт: перевірити meta desc length (≤ 155) — 0 порушень
- [ ] Python скрипт: перевірити JSON-LD validity — 0 errors
- [ ] Python скрипт: перевірити наявність H1 на кожній сторінці
- [ ] Python скрипт: перевірити що всі local link hrefs ведуть на існуючі файли
- [ ] Commit: `git commit -m "chore: final verification — all SEO standards pass"`

---

## SUMMARY

| Phase | Pages | Tasks | Priority |
|-------|-------|-------|----------|
| 1. Core Pages | 5 | 5 | Critical |
| 2. Service Group A | 6 | 6 | High |
| 3. Service Group B | 8 | 8 | High |
| 4. Local Top-5 Cities | 54 | 5 | High |
| 5. Local 16 Cities | ~160 | 2 | Medium |
| 6. Fix Local Links | 5 pages | 1 | Medium |
| 7. Technical | All | 3 | High |
| **TOTAL** | **235+** | **30** | |

## VERIFICATION CHECKLIST (run after each phase)

```python
# Quick verification command
python -c "
import re, glob
files = glob.glob('**/*.html', recursive=True)
issues = []
for f in files:
    content = open(f, encoding='utf-8').read()
    # Word count check (visible text)
    text = re.sub(r'<[^>]+>', ' ', content)
    text = re.sub(r'\s+', ' ', text)
    words = len(text.split())
    if words < 600 and '/local/' in f:
        issues.append(f'Low word count ({words}): {f}')
    # Meta desc
    m = re.search(r'<meta name=\"description\" content=\"([^\"]+)\"', content)
    if m and len(m.group(1)) > 155:
        issues.append(f'Long meta desc ({len(m.group(1))}): {f}')
for i in issues: print(i)
print(f'Issues: {len(issues)}')
"
```
