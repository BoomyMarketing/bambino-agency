# Bambino Agency — Master Service Expansion & Optimisation Plan
**Дата створення:** 2026-04-23
**Версія:** 1.0
**Base:** Consolidated з `2026-04-23-canadian-competitor-gap-expansion.md` + `2026-04-23-us-market-gap-expansion.md`
**Мета:** Уніфікований roadmap для додавання 50 нових service pages + пост-launch оптимізації для досягнення TOP-10 по 100+ UK keywords.

> **Для виконавця (агента або людини):** Цей план — операційний master document. Виконувати фази послідовно, мітити `- [x]` після завершення кожного кроку. Перед стартом кожної фази — прочитати prerequisites. Після кожної фази — виконати verification checklist.

---

## ЗМІСТ

1. [Prerequisites](#0-prerequisites)
2. [Template-First Architecture](#1-template-first-architecture)
3. [Phase 1 — TOP 10 Quick Wins (6 тижнів)](#2-phase-1--top-10-quick-wins)
4. [Phase 2 — Priority Services (8 тижнів)](#3-phase-2--priority-services)
5. [Phase 3 — Strategic Services (6 тижнів)](#4-phase-3--strategic-services)
6. [Phase 4 — Integration & Launch (2 тижні)](#5-phase-4--integration--launch)
7. [Post-Launch Optimisation Workflow](#6-post-launch-optimisation-workflow)
8. [Per-Service Page Template](#7-per-service-page-template)
9. [Success Metrics & KPIs](#8-success-metrics--kpis)

---

## 0. PREREQUISITES

Виконати ДО старту Phase 1 — блокує всі нові pages.

### 0.1 Blocking issues (з ACTION-PLAN.md)

- [ ] **P0.1 UK телефон отримати від клієнта** — замінити `+44 161 000 0000` placeholder на реальний
- [ ] **P0.2 Створити `/img/og-default.jpg`** (1200×630px, branded)
- [ ] **P0.3 Створити `/logo.png`** (400×120px, прозорий фон)
- [ ] **P0.4 Створити `/favicon.ico`** + `/apple-touch-icon.png`

### 0.2 Author bylines (E-E-A-T)

- [ ] Підготувати author profiles з credentials:
  - Sophie H. — CEO (MBA Marketing, Google Ads Certified)
  - James M. — Head of SEO (Semrush Academy, Google Analytics Certified)
  - Aisha K. — Ads Director (Google Ads, Meta Blueprint)
  - Tom B. — Head of Web (Google Web Dev, HubSpot CMS)
  - **Додати новий:** Head of RevOps (HubSpot Certified, Salesforce Admin) — потрібен для RevOps/HubSpot/SFMC pages

### 0.3 Base template audit

- [ ] Прочитати `services/seo.html` — baseline HTML template
- [ ] Прочитати `services/ai-automations.html` — приклад premium service page
- [ ] Виявити shared CSS → `/assets/css/main.css`
- [ ] Створити `scripts/generate_service_page.py` — генератор нових service pages з даних

### 0.4 Verification

- [ ] Всі 4 blocking issues resolved
- [ ] Templates audited
- [ ] Author pool готовий
- [ ] Generator script протестовано на одному test file

---

## 1. TEMPLATE-FIRST ARCHITECTURE

### 1.1 Service Page Master Template

Кожна нова service page МАЄ містити ці 10 блоків (у цьому порядку):

```
1. HERO
   - H1 з primary keyword
   - Sub-headline (1-2 речення value prop)
   - Stats bar (3 конкретні цифри)
   - 2 CTAs (primary + secondary)

2. WHAT IS [SERVICE]? (definition block — 150-200 слів, GEO-ready)
   - Direct answer в першому реченні
   - Контекст 2-3 речення
   - Чому це важливо у 2026

3. WHY UK BUSINESSES NEED [SERVICE] (150 слів зі статистикою)

4. OUR [SERVICE] PROCESS (4-6 кроків з timelines)

5. WHAT'S INCLUDED (deliverables list — 6-10 items)

6. [SERVICE] FOR YOUR INDUSTRY (або industries table)

7. CASE STUDY PREVIEW (анонімізована)

8. TOOLS/PLATFORMS WE USE

9. FAQ (7-8 питань з answer-first format)

10. CTA + RELATED SERVICES
```

### 1.2 Technical Requirements (non-negotiable)

Кожна service page:

- [ ] **Word count:** ≥ 2 000 (quick wins) / ≥ 2 500 (premium) / ≥ 3 000 (pillar)
- [ ] **Title tag:** ≤ 60 символів, primary keyword на початку
- [ ] **Meta description:** 140-155 символів, CTA в кінці
- [ ] **H1:** один, містить primary keyword
- [ ] **H2/H3:** hierarchy без пропусків
- [ ] **Internal links:** 5-7 relevant services + 2-3 blog posts + 2-3 local pages
- [ ] **Schema:** Service (з price) + FAQPage (≥7 Q&A) + BreadcrumbList
- [ ] **Canonical URL:** `https://bambinoagency.com/services/{slug}` (без .html, без trailing slash)
- [ ] **OG + Twitter tags:** повний set з image
- [ ] **Mobile-first:** ≥ 16px body text, ≥ 44x44px tap targets
- [ ] **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## 2. PHASE 1 — TOP 10 QUICK WINS (Тиждень 1-6)

Відібрані з обох планів по ROI: max volume × min competition × price point.

### Task 1.1 — CRO Service Page (Canadian P1) 🔴

- [ ] **Target:** "CRO agency UK" (1 900/mo)
- [ ] **File:** `services/cro/index.html`
- [ ] **Word count:** 2 500+
- [ ] **Key sections:** A/B testing process, heatmap tools, UX psychology, eCommerce vs SaaS CRO
- [ ] **Schema:** Service "From £1 500/month"
- [ ] **Internal links:** Web Design, SEO, Shopify Marketing
- [ ] **Commit:** `feat: services — CRO page, 2500+ words`
- [ ] **Deploy & verify:** Rich Results Test → 0 errors

### Task 1.2 — RevOps / GTM Engineering (US P1) 🔴

- [ ] **Target:** "RevOps agency UK" (590/mo) + "GTM engineering UK" (210/mo)
- [ ] **File:** `services/revops/index.html`
- [ ] **Word count:** 3 000+ (pillar)
- [ ] **Key sections:** RevOps maturity model, HubSpot vs Salesforce, first 90 days, pricing models
- [ ] **Schema:** Service "From £4 500/month"
- [ ] **Internal links:** HubSpot (Task 1.5), AI Automations, Lead Gen (Task 1.10), ABM, SaaS industry
- [ ] **Commit:** `feat: services — RevOps/GTM engineering page, 3000+ words`

### Task 1.3 — HubSpot Implementation (US P1) 🔴

- [ ] **Target:** "HubSpot agency UK" (1 300/mo) + "HubSpot partner UK" (880/mo)
- [ ] **File:** `services/hubspot/index.html`
- [ ] **Word count:** 2 500+
- [ ] **Key sections:** All 5 Hubs, tier selection, integrations, data migration, GDPR
- [ ] **Schema:** Service "From £8 500 implementation / £2 500/mo retainer"
- [ ] **Internal links:** RevOps, Marketing Automation, Email Marketing, CRO
- [ ] **Commit:** `feat: services — HubSpot implementation page`

### Task 1.4 — Klaviyo Partner (US P1) 🔴

- [ ] **Target:** "Klaviyo agency UK" (720/mo) + "Klaviyo expert UK" (390/mo)
- [ ] **File:** `services/klaviyo/index.html`
- [ ] **Word count:** 2 500+
- [ ] **Key sections:** 12 must-have flows, segmentation, subscription integration, UK GDPR
- [ ] **Schema:** Service "From £2 500/month"
- [ ] **Internal links:** Shopify Marketing (Task 2.5), Email Marketing, Subscription Commerce (Task 3.4)
- [ ] **Commit:** `feat: services — Klaviyo partner page`

### Task 1.5 — Amazon Marketing (Canadian P1) 🔴

- [ ] **Target:** "Amazon agency UK" (2 400/mo combined)
- [ ] **File:** `services/amazon-marketing/index.html`
- [ ] **Word count:** 2 500+
- [ ] **Key sections:** Amazon PPC, Amazon SEO, A+ content, Brand Registry, DSP teaser
- [ ] **Schema:** Service "From £2 000/month"
- [ ] **Internal links:** Amazon DSP (Task 2.7), Shopify Marketing, Retail Media (Task 2.6)
- [ ] **Commit:** `feat: services — Amazon marketing page`

### Task 1.6 — UGC Content Production (US P1) 🔴

- [ ] **Target:** "UGC agency UK" (1 600/mo) + "UGC creators UK" (590/mo)
- [ ] **File:** `services/ugc-content/index.html`
- [ ] **Word count:** 2 500+
- [ ] **Key sections:** UGC vs Influencer, 500+ creator network, frameworks, performance testing
- [ ] **Schema:** Service "From £2 500/month"
- [ ] **Internal links:** Influencer Marketing (Task 1.8), TikTok Ads (Task 1.9), Meta Ads, Performance Creative
- [ ] **Commit:** `feat: services — UGC production page`

### Task 1.7 — Branding (Canadian P1) 🔴

- [ ] **Target:** "branding agency UK" (2 900/mo)
- [ ] **File:** `services/branding/index.html`
- [ ] **Word count:** 2 500+
- [ ] **Key sections:** 5-stage process, full deliverables, UK trademark considerations, rebrand vs refresh
- [ ] **Schema:** Service "From £15 000 projects"
- [ ] **Internal links:** Web Design, SaaS, Case Studies
- [ ] **Commit:** `feat: services — branding page`

### Task 1.8 — Influencer Marketing (Canadian P1) 🔴

- [ ] **Target:** "influencer marketing agency UK" (1 600/mo)
- [ ] **File:** `services/influencer-marketing/index.html`
- [ ] **Word count:** 2 500+
- [ ] **Key sections:** Nano-Mega tiers, platforms, ASA compliance, campaign types
- [ ] **Schema:** Service + FAQPage
- [ ] **Internal links:** UGC Content, TikTok Ads, Social Media
- [ ] **Commit:** `feat: services — influencer marketing page, ASA compliance`

### Task 1.9 — TikTok Ads (Canadian P1) 🔴

- [ ] **Target:** "TikTok ads agency UK" (1 300/mo)
- [ ] **File:** `services/tiktok-ads/index.html`
- [ ] **Word count:** 2 000+
- [ ] **Key sections:** All ad formats, TikTok Shop UK, creative production, industries
- [ ] **Schema:** Service "From £1 500/month"
- [ ] **Internal links:** Meta Ads, Influencer Marketing, UGC Content
- [ ] **Commit:** `feat: services — TikTok ads page, TikTok Shop focus`

### Task 1.10 — Lead Generation (Canadian P1) 🔴

- [ ] **Target:** "lead generation agency UK" (2 400/mo)
- [ ] **File:** `services/lead-generation/index.html`
- [ ] **Word count:** 2 500+
- [ ] **Key sections:** MQL vs SQL, channels matrix, CPL benchmarks UK industry, GDPR+PECR compliance
- [ ] **Schema:** Service "From £2 500/month"
- [ ] **Internal links:** AI Outbound, LinkedIn Ads (Task 2.2), Google Ads
- [ ] **Commit:** `feat: services — lead generation page, CPL benchmarks`

### Phase 1 Verification Checklist

Після всіх 10 pages published:

- [ ] Всі 10 pages live на bambinoagency.com
- [ ] Rich Results Test: 0 errors на всіх 10
- [ ] Mobile-Friendly Test: PASS на всіх 10
- [ ] Word count ≥ target на всіх 10 (Python script check)
- [ ] Meta desc ≤ 155 chars на всіх 10
- [ ] OG images завантажуються (curl -I перевірка)
- [ ] Sitemap оновлено з 10 новими URLs
- [ ] GSC submitted for indexation (URL Inspection → Request Indexing)
- [ ] Internal linking: кожна з 10 має ≥ 5 внутрішніх лінків на існуючі pages
- [ ] Commit message format consistent: `feat: services — {name} page, {key feature}`

**Після Phase 1:** Run post-launch optimisation workflow (Секція 6) перед стартом Phase 2.

---

## 3. PHASE 2 — PRIORITY SERVICES (Тиждень 7-14)

15 сторінок: 10 з Canadian P2 + 5 з US P1/P2.

### Canadian P2 Services:

- [ ] **Task 2.1** — Digital PR (`services/digital-pr/`) — "digital PR agency UK" (880/mo)
- [ ] **Task 2.2** — LinkedIn Ads (`services/linkedin-ads/`) — "LinkedIn ads UK" (720/mo)
- [ ] **Task 2.3** — Link Building (`services/link-building/`) — "link building UK" (1 300/mo)
- [ ] **Task 2.4** — Local SEO (`services/local-seo/`) — "local SEO UK" (1 900/mo)
- [ ] **Task 2.5** — Shopify Marketing (`services/shopify-marketing/`) — "Shopify agency UK" (1 100/mo)
- [ ] **Task 2.6** — Technical SEO (`services/technical-seo/`) — "technical SEO UK" (590/mo)
- [ ] **Task 2.7** — Reputation Management (`services/reputation-management/`) — "ORM UK" (590/mo)
- [ ] **Task 2.8** — YouTube Ads (`services/youtube-ads/`) — "YouTube ads UK" (720/mo)
- [ ] **Task 2.9** — Video Marketing (`services/video-marketing/`) — "video marketing UK" (720/mo)
- [ ] **Task 2.10** — Fractional CMO (`services/fractional-cmo/`) — "fractional CMO UK" (480/mo)

### US P1/P2 Services:

- [ ] **Task 2.11** — Salesforce Marketing Cloud (`services/salesforce-marketing-cloud/`) — (480/mo)
- [ ] **Task 2.12** — Retail Media (`services/retail-media/`) — "retail media UK" (320/mo)
- [ ] **Task 2.13** — Pinterest Ads (`services/pinterest-ads/`) — "Pinterest ads UK" (480/mo)
- [ ] **Task 2.14** — Webflow (`services/webflow/`) — "Webflow agency UK" (1 300/mo)
- [ ] **Task 2.15** — Affiliate Marketing (`services/affiliate-marketing/`) — (1 900/mo)

### Phase 2 Verification

Same як Phase 1, plus:

- [ ] Cross-linking: кожна нова Phase 2 page лінкує на ≥ 2 Phase 1 pages
- [ ] Services hub page оновлено з 25 cards (14 existing + 10 Phase 1 + 1 first Phase 2 draft)
- [ ] Blog articles supporting Phase 1 pages starting (hub only — articles у Phase 4)

---

## 4. PHASE 3 — STRATEGIC SERVICES (Тиждень 15-20)

15 сторінок: Canadian P3 + US P2/P3.

### Canadian P3:

- [ ] **Task 3.1** — ABM (`services/abm/`) — "ABM agency UK" (320/mo)
- [ ] **Task 3.2** — ASO (`services/aso/`) — "ASO agency UK" (590/mo)
- [ ] **Task 3.3** — Marketing Automation (`services/marketing-automation/`) — (390/mo)
- [ ] **Task 3.4** — Connected TV (`services/ctv-advertising/`) — (210/mo)
- [ ] **Task 3.5** — Growth Marketing (`services/growth-marketing/`) — (880/mo)
- [ ] **Task 3.6** — SMS Marketing (`services/sms-marketing/`) — (480/mo)
- [ ] **Task 3.7** — International SEO (`services/international-seo/`) — (260/mo)
- [ ] **Task 3.8** — Enterprise SEO (`services/enterprise-seo/`) — (170/mo)

### US P2/P3:

- [ ] **Task 3.9** — Amazon DSP (`services/amazon-dsp/`) — (170/mo)
- [ ] **Task 3.10** — DOOH (`services/dooh/`) — (390/mo)
- [ ] **Task 3.11** — Community Building (`services/community-building/`) — (720/mo)
- [ ] **Task 3.12** — Lifecycle Marketing (`services/lifecycle-marketing/`) — (320/mo)
- [ ] **Task 3.13** — Subscription Commerce (`services/subscription-commerce/`) — (260/mo)
- [ ] **Task 3.14** — Performance Creative (`services/performance-creative/`) — (590/mo)
- [ ] **Task 3.15** — Conversational Marketing (`services/conversational-marketing/`) — (880/mo)

### Phase 3 Verification

- [ ] 40 total new service pages live (10 Phase 1 + 15 Phase 2 + 15 Phase 3)
- [ ] Sitemap 3rd update done
- [ ] GSC Coverage report: ≥ 95% indexation rate на new pages
- [ ] GSC Performance report: baseline impressions зафіксовано

---

## 5. PHASE 4 — INTEGRATION & LAUNCH (Тиждень 21-22)

### 5.1 Navigation & Discoverability

- [ ] **Task 4.1** — Services mega-menu з 54 services, організовано по 9 категоріях:
  - Search & AI Visibility
  - Paid Media
  - Social & Creator
  - Content & Video
  - Web & Brand
  - AI & Automation
  - Operations & Growth
  - B2B & Enterprise
  - eCommerce & Retention

- [ ] **Task 4.2** — Footer update: 4-column layout з popular services
- [ ] **Task 4.3** — llms.txt expansion: всі 54 services з описами + pricing
- [ ] **Task 4.4** — Services hub page (`services/index.html`) redesign:
  - Category filter
  - Search widget
  - "What do you need?" quiz
  - 54 service cards
  - ItemList schema

### 5.2 Internal Linking Matrix

- [ ] **Task 4.5** — Cross-link audit (Python script):
  - Each service page → ≥ 5 related services links
  - Each service page → ≥ 2 blog posts links
  - Each service page → ≥ 2 local pages links
  - Each industry page → ≥ 3 relevant service links

### 5.3 Pillar Blog Content

Supporting top 10 new services з Phase 1:

- [ ] **Task 4.6** — `/blog/what-is-revops-uk/` (2 500 words)
- [ ] **Task 4.7** — `/blog/hubspot-vs-salesforce-uk/` (2 500 words)
- [ ] **Task 4.8** — `/blog/ugc-vs-influencer-marketing/` (2 000 words)
- [ ] **Task 4.9** — `/blog/klaviyo-vs-mailchimp-uk/` (2 000 words)
- [ ] **Task 4.10** — `/blog/cro-guide-uk/` (2 500 words)

### 5.4 Local Page Amplification

- [ ] **Task 4.11** — Для TOP-5 нових services (CRO, RevOps, HubSpot, Amazon, UGC) створити по 5 local pages:
  - London, Manchester, Birmingham, Leeds, Bristol
  - 25 нових local service combinations
  - Generator script pattern з existing local pages

### 5.5 Technical Launch

- [ ] **Task 4.12** — Final sitemap update (сумарно +80 URLs)
- [ ] **Task 4.13** — IndexNow submission to Bing
- [ ] **Task 4.14** — GSC bulk URL inspection + request indexing (batch)
- [ ] **Task 4.15** — Update `robots.txt` (no changes needed, AI crawlers already allowed)
- [ ] **Task 4.16** — Deploy to Vercel, smoke test всіх 80 URLs (curl -I → 200)

---

## 6. POST-LAUNCH OPTIMISATION WORKFLOW

Starts **14 днів після** кожної Phase deploy.

### 6.1 Week 2 Post-Launch (per page)

- [ ] **Indexation check:** GSC URL Inspection — "Indexed" status
- [ ] **Rich Results check:** Rich Results Test → valid Service + FAQPage schema
- [ ] **Mobile render check:** Chrome DevTools mobile → visual QA
- [ ] **Core Web Vitals:** PageSpeed Insights → LCP/INP/CLS in "good" range

### 6.2 Week 4 Post-Launch

- [ ] **GSC Performance:** Impressions > 0 (якщо 0 — re-request indexing)
- [ ] **Keyword tracking:** Add target keywords до Ahrefs/Semrush rank tracker
- [ ] **Behavior analytics:** GA4 check:
  - Bounce rate < 70%
  - Avg session duration > 60s
  - Scroll depth > 50% для 50%+ users

### 6.3 Month 2-3 Post-Launch (Content Refresh)

- [ ] **Rank tracking review:** Виявити pages на positions 11-20 → quick win candidates
- [ ] **Content refresh protocol:**
  - Додати 300-500 слів de novo content
  - Update dateModified у schema
  - Додати новий FAQ question (based on People Also Ask)
  - Додати нову статистику з свіжим джерелом
  - Regenerate internal links (додати 1-2 нових)
  - Request re-indexing в GSC
- [ ] **CTR optimisation:** якщо impressions > 500, clicks < 20 → переписати title + meta desc

### 6.4 Month 4+ Post-Launch (Scale or Kill)

Per-page decision matrix:

| Position | Impressions/mo | Action |
|----------|----------------|--------|
| 1-3 | >1 000 | ✅ Keep + optimise CTR |
| 4-10 | >500 | 🔧 Refresh (add depth, stats, FAQ) |
| 11-20 | >200 | 🚀 Scale (add 1 000 words, build 5+ backlinks) |
| 21-50 | >50 | 🔧 Major rewrite or consolidate з similar page |
| 50+ | <50 | ❌ Review: kill/noindex or merge |

### 6.5 Monthly Cadence (Continuous)

- [ ] **Week 1:** Rank tracking review всіх 54 services
- [ ] **Week 2:** GSC Performance review, CTR optimisation targets
- [ ] **Week 3:** Content refresh 2-3 найслабших pages
- [ ] **Week 4:** Build 3-5 backlinks для top-performing pages (Phase 1 priority)

### 6.6 Quarterly Cadence

- [ ] **Technical audit:** Screaming Frog crawl, fix new issues
- [ ] **Schema validation:** Rich Results Test на random 10 pages
- [ ] **Competitor monitoring:** Які pages виросли, які впали? Чому?
- [ ] **Keyword expansion:** PAA + AlsoAsked → нові angles для existing pages
- [ ] **AI citation check:** Test queries в ChatGPT / Perplexity → чи цитує Bambino?
- [ ] **Report to leadership:** MRR pipeline from new services, traffic growth, rankings wins

---

## 7. PER-SERVICE PAGE TEMPLATE

Generic checklist для будь-якої нової service page:

### 7.1 Research Phase (перед написанням)

- [ ] SERP analysis для target keyword — топ 5 competitors
- [ ] Word count median топ 5
- [ ] Structure (H2s) топ 5
- [ ] Featured Snippet format (якщо є)
- [ ] PAA questions (мінімум 5)
- [ ] LSI keywords з Semrush/Ahrefs
- [ ] Potential internal link targets (з existing 14 + new services)

### 7.2 Writing Phase

- [ ] Write content в Markdown чорновик
- [ ] Primary keyword у першому 100 слів
- [ ] LSI keywords природно розподілені (1-2% density)
- [ ] Answer-first format для кожного H2
- [ ] Минімум 2 quotable statistics з джерелом
- [ ] FAQ у форматі як люди реально питають
- [ ] CTA copy-tested (varied: "Get a free audit" / "Book a call" / "Start now")

### 7.3 Development Phase

- [ ] Copy HTML template з `services/seo.html` (baseline)
- [ ] Replace placeholder content з новим
- [ ] Update meta tags (title, description, OG, Twitter, canonical)
- [ ] Add JSON-LD schema (Service + FAQPage + BreadcrumbList)
- [ ] Add internal links (anchor text descriptive, keyword-rich)
- [ ] Add images (WebP, with alt text, lazy-loaded)
- [ ] Mobile preview check
- [ ] Desktop preview check

### 7.4 Pre-Publish QA

Python validation script:

```bash
python scripts/validate_service_page.py services/{slug}/index.html
```

Перевіряє:
- [ ] Word count ≥ target
- [ ] H1 exists + unique
- [ ] Meta desc ≤ 155 chars
- [ ] Canonical URL правильний (без .html)
- [ ] JSON-LD validity
- [ ] All internal links → existing pages (no 404)
- [ ] Image alt text на всіх images
- [ ] Schema: Service + FAQPage + BreadcrumbList presence

### 7.5 Publish Phase

- [ ] Git commit: `feat: services — {name} page, {key feature}`
- [ ] Deploy to Vercel
- [ ] Curl smoke test: `curl -I https://bambinoagency.com/services/{slug}` → 200
- [ ] Rich Results Test → 0 errors
- [ ] Mobile-Friendly Test → PASS
- [ ] Update sitemap.xml
- [ ] GSC: Request indexing
- [ ] Bing Webmaster Tools: Submit URL via IndexNow

### 7.6 Post-Publish Tracking (7 days)

- [ ] Day 1: Verify indexation (GSC URL Inspection)
- [ ] Day 3: First impressions check (GSC)
- [ ] Day 7: Keyword added до rank tracker
- [ ] Day 14: Performance check + first refresh if 0 impressions

---

## 8. SUCCESS METRICS & KPIs

### 8.1 Leading Indicators (monitor щотижня)

| Метрика | Target 30 days | Target 90 days | Target 180 days |
|---------|----------------|---------------|------------------|
| Service pages live | 25 | 40 | 54 |
| Pages indexed | 20 | 38 | 54 |
| Pages з impressions > 100/mo | 15 | 30 | 45 |
| Pages у TOP-20 для target keyword | 8 | 20 | 35 |
| Pages у TOP-10 | 3 | 12 | 25 |
| Pages у TOP-3 | 1 | 5 | 12 |

### 8.2 Business Impact (monitor щомісяця)

| Метрика | Baseline (Q2 2026) | Target Q3 2026 | Target Q4 2026 | Target Q1 2027 |
|---------|---------------------|-----------------|------------------|-----------------|
| Monthly organic sessions | baseline | +15% | +40% | +80% |
| Unique organic visitors | baseline | +20% | +55% | +120% |
| Organic leads/mo | baseline | +10% | +35% | +80% |
| Qualified leads (MQL) | baseline | +15% | +45% | +90% |
| MRR pipeline from new services | £0 | £25K | £95K | £190K |
| New services → signed clients | 0 | 2 | 8 | 18 |

### 8.3 Content Quality (monitor щоквартально)

| Метрика | Target |
|---------|--------|
| Avg word count per service page | ≥ 2 300 |
| Avg time on page | ≥ 2 хв 30 сек |
| Bounce rate | < 65% |
| Scroll depth (50%+) | ≥ 55% users |
| Pages з 0 CTA clicks у 30 днів | 0 |
| Schema validation errors | 0 |

### 8.4 AI Visibility (GEO metrics, monitor щомісяця)

- [ ] ChatGPT test queries: "best [service] agency UK" → чи цитує Bambino?
- [ ] Perplexity test queries: "what is [service]" → чи Bambino у sources?
- [ ] Google AI Overviews: screenshot tracking для 20 target keywords
- [ ] Brand mentions monitoring (Mention.com, Google Alerts)

---

## 9. RISKS & MITIGATION

### 9.1 Content Velocity Risk

**Ризик:** 54 premium service pages за 22 тижні = ~2.5 pages/week. Потребує dedicated resources.

**Mitigation:**
- Option A: Найняти 2 content writers full-time (£3-4K/mo кожен = £6-8K/mo)
- Option B: Використати AI-assisted content production (Claude + human edit) — cuts time 40%
- Option C: Реалістично сповільнити до 1.5 pages/week → 36 тижнів total

### 9.2 Cannibalisation Risk

**Ризик:** Нові pages конкурують з existing (наприклад, RevOps vs Marketing Automation vs AI Automations).

**Mitigation:**
- Intent mapping: кожна page має унікальний primary keyword + unique search intent
- Intent cluster document: `docs/intent-map.md` — перелік всіх keyword-page mappings
- Verification перед launch: Ahrefs "Multiple Pages" check — попередження якщо існуючий ranking збивається
- Internal linking: consolidate intent, не розсіювати

### 9.3 Quality Dilution Risk

**Ризик:** Масове додавання pages може знизити середню якість сайту → Core Update penalty.

**Mitigation:**
- Жорстке Pre-Publish QA (Section 7.4) — no page ships без passing
- Word count floor: ≤ 2 000 слів = auto-reject
- E-E-A-T requirements: author byline, case study, stats з джерелом, updated dates
- Monthly quality audit: Python script → pages < 2 000 words flagged

### 9.4 UK Compliance Risk

**Ризик:** Послуги як Influencer (ASA), SMS (PECR), Amazon (Consumer Rights), Lead Gen (GDPR) — кожна потребує юридичного огляду.

**Mitigation:**
- Compliance checklist per service type
- Legal review для 5 high-risk pages (Influencer, SMS, Affiliate, UGC, Lead Gen)
- Compliance addendum section на кожній відповідній page
- Quarterly ICO/ASA guidance review

---

## 10. EXECUTION ORDER — RECOMMENDED PATH

### Варіант A: Full Team (2 writers + 1 dev + 1 SEO) — 22 тижні

```
Тиждень 1-2: Prerequisites (Section 0) + template setup
Тиждень 3-8: Phase 1 — TOP 10 (1.5 pages/week per writer × 2 = 3/week)
Тиждень 9-16: Phase 2 — 15 priority services (~2/week)
Тиждень 17-20: Phase 3 — 15 strategic services (~4/week — easier writing)
Тиждень 21-22: Phase 4 — Integration (nav, blog, local, launch)
Тиждень 23+: Ongoing optimisation (Section 6)
```

### Варіант B: Solo / Small Team — 36 тижнів

```
Тиждень 1-3: Prerequisites
Тиждень 4-13: Phase 1 (1 page/week)
Тиждень 14-25: Phase 2 (1.25 pages/week)
Тиждень 26-32: Phase 3 (2 pages/week)
Тиждень 33-36: Phase 4 + Launch
Тиждень 37+: Ongoing optimisation
```

### Варіант C: Accelerated (AI-assisted) — 14 тижнів

```
Тиждень 1: Prerequisites + AI content workflow setup
Тиждень 2-5: Phase 1 — TOP 10 (2.5 pages/week з AI draft + human edit)
Тиждень 6-10: Phase 2 — 15 pages (3 pages/week)
Тиждень 11-12: Phase 3 — 15 pages (7.5/week — accelerated)
Тиждень 13-14: Phase 4 — Integration + QA (тиждень 14 = buffer)
```

**Рекомендація:** Варіант A (best quality) або Варіант C (speed) для Phase 1-2, потім sequential.

---

## 11. DEPENDENCY CHAIN

```
Prerequisites (P0)
    ↓
Phase 1 — TOP 10 Quick Wins
    ↓ (min 14 days buffer для indexation)
Phase 2 — 15 Priority Services
    ↓ (min 14 days buffer)
Phase 3 — 15 Strategic Services
    ↓
Phase 4 — Integration & Launch
    ↓
Post-Launch Optimisation (Section 6) — CONTINUOUS
```

**Parallel allowed:**
- Phase 1 Task 1.1-1.5 можна паралельно (різні writers)
- Phase 4 Tasks 4.6-4.10 (blog) можна паралельно з Phase 3 writing
- Local pages (4.11) можна генерувати scripted коли TOP-5 services done

**Serial required:**
- Phase 2 НЕ стартує до Phase 1 indexation verified (14 days post-deploy)
- Navigation update (Task 4.1) — ТІЛЬКИ коли всі service pages live
- Internal linking matrix (Task 4.5) — ТІЛЬКИ коли всі 54 services live

---

## 12. NEXT STEPS — START HERE

**Якщо ти — агент що має виконати цей план, починай з:**

1. [ ] Прочитати `FULL-AUDIT-REPORT.md` та `ACTION-PLAN.md` для блокерів
2. [ ] Resolve Prerequisites 0.1-0.4 (phone, images, favicon)
3. [ ] Setup `scripts/generate_service_page.py` + `scripts/validate_service_page.py`
4. [ ] Почати з Task 1.1 (CRO) як pilot — validate що template + process працюють
5. [ ] Після pilot success — batch Tasks 1.2-1.10 паралельно

**Якщо ти — людина-менеджер:**

1. Узгодити resources (writers + dev + SEO)
2. Вибрати execution variant (A/B/C)
3. Заблокувати час у календарі leadership для Phase verification checkpoints
4. Налаштувати monthly review meeting (після кожного phase)

---

*Master plan підлягає review через 6 тижнів (після Phase 1) з коригуванням priorities на основі actual rankings data.*
*Наступна актуалізація: 2026-06-04*
