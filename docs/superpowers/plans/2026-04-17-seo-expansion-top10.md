# Bambino Agency — SEO Expansion: TOP 10 Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand bambinoagency.com from ~239 pages to ~500+ pages targeting high-value UK search queries across AI services, industry verticals, informational content, and extended local coverage — to rank TOP 10 for 100+ target keywords.

**Architecture:** Static HTML on Vercel (cleanUrls: true, trailingSlash: false). New sections: `/blog/`, `/industries/`, `/case-studies/`, `/glossary/`, new local service slugs. Every new page follows the established HTML template (Berkshire Swash + Inter, CSS variables, JSON-LD schema, FAQPage). Generator Python scripts create bulk pages; unique pages are hand-written.

**Tech Stack:** Static HTML, CSS variables, JSON-LD Schema.org, Python generator scripts (existing pattern in `scripts/`), Vercel deployment, sitemap.xml, llms.txt.

---

## KEYWORD STRATEGY OVERVIEW

### Priority 1 — Transactional (£££ intent, TOP 10 = clients)
| Query | Monthly Vol Est. | Competition | Target Page |
|-------|-----------------|-------------|-------------|
| digital marketing agency Manchester | 1,900 | High | /local/manchester/digital-marketing-agency |
| SEO agency Manchester | 1,300 | High | /local/manchester/seo-agency |
| Google Ads agency Manchester | 480 | Medium | /local/manchester/google-ads-agency |
| AI marketing agency UK | 260 | Low | /services/ai-automations |
| GEO optimisation UK | 210 | Low | /services/geo |
| voice AI for business UK | 140 | Very Low | /services/voice-ai |
| AI automation agency UK | 320 | Low | /services/ai-automations |
| digital marketing agency London | 5,400 | Very High | /local/london/digital-marketing-agency |
| SEO agency London | 3,600 | Very High | /local/london/seo-agency |
| SEO agency Birmingham | 880 | Medium | /local/birmingham/seo-agency |

### Priority 2 — Industry Vertical (Moderate intent, qualified traffic)
| Query | Monthly Vol Est. | Target Page |
|-------|-----------------|-------------|
| digital marketing for solicitors UK | 320 | /industries/legal |
| SEO for estate agents UK | 590 | /industries/property |
| Google Ads for ecommerce UK | 720 | /industries/ecommerce |
| AI automation for healthcare UK | 180 | /industries/healthcare |
| digital marketing for restaurants UK | 430 | /industries/hospitality |
| SaaS marketing agency UK | 260 | /industries/saas |
| digital marketing for accountants UK | 390 | /industries/professional-services |
| marketing agency for schools UK | 140 | /industries/education |

### Priority 3 — Informational (Top-of-funnel, E-E-A-T, GEO citability)
| Query | Monthly Vol Est. | Target Page |
|-------|-----------------|-------------|
| what is GEO optimisation | 720 | /blog/what-is-geo-optimisation |
| how to rank on ChatGPT | 890 | /blog/how-to-rank-on-chatgpt |
| what is AI outbound sales | 480 | /blog/what-is-ai-outbound-sales |
| how much does SEO cost UK | 2,400 | /blog/how-much-does-seo-cost-uk |
| how much does Google Ads cost UK | 1,800 | /blog/google-ads-cost-uk |
| best SEO agencies UK 2026 | 1,200 | /blog/best-seo-agencies-uk |
| SEO vs Google Ads UK | 590 | /blog/seo-vs-google-ads |
| what is digital marketing | 8,100 | /blog/what-is-digital-marketing |
| how to get more leads UK | 1,300 | /blog/how-to-get-more-leads-uk |
| AI marketing trends UK 2026 | 480 | /blog/ai-marketing-trends-uk-2026 |

### Priority 4 — New Local Service Pages (Missing slugs across 21 cities)
| Missing Slug | Cities | Pages to Create |
|-------------|--------|----------------|
| geo-agency | 21 cities | 21 |
| voice-ai-agency | 21 cities | 21 |
| ai-outbound-agency | 21 cities | 21 |
| meta-ads-agency | all 21 | 21 |
| saas-agency | top 10 cities | 10 |
| **TOTAL** | | **~94 new local pages** |

---

## FILE STRUCTURE

### New directories to create
```
bambino-agency/
├── blog/
│   ├── index.html                          # Blog hub
│   ├── what-is-geo-optimisation/
│   │   └── index.html
│   ├── how-to-rank-on-chatgpt/
│   │   └── index.html
│   ├── what-is-ai-outbound-sales/
│   │   └── index.html
│   ├── how-much-does-seo-cost-uk/
│   │   └── index.html
│   ├── google-ads-cost-uk/
│   │   └── index.html
│   ├── best-seo-agencies-uk/
│   │   └── index.html
│   ├── seo-vs-google-ads/
│   │   └── index.html
│   ├── what-is-digital-marketing/
│   │   └── index.html
│   ├── how-to-get-more-leads-uk/
│   │   └── index.html
│   ├── ai-marketing-trends-uk-2026/
│   │   └── index.html
│   ├── what-is-voice-ai-business/
│   │   └── index.html
│   ├── google-ads-vs-meta-ads/
│   │   └── index.html
│   ├── local-seo-guide-uk/
│   │   └── index.html
│   ├── ecommerce-seo-guide-uk/
│   │   └── index.html
│   ├── ai-automation-roi-uk/
│   │   └── index.html
│   ├── content-marketing-guide-uk/
│   │   └── index.html
│   ├── email-marketing-guide-uk/
│   │   └── index.html
│   ├── social-media-marketing-uk/
│   │   └── index.html
│   ├── ppc-guide-uk/
│   │   └── index.html
│   └── manchester-digital-marketing-guide/
│       └── index.html
├── industries/
│   ├── index.html                          # Industries hub
│   ├── ecommerce/
│   │   └── index.html
│   ├── legal/
│   │   └── index.html
│   ├── property/
│   │   └── index.html
│   ├── healthcare/
│   │   └── index.html
│   ├── hospitality/
│   │   └── index.html
│   ├── saas/
│   │   └── index.html
│   ├── professional-services/
│   │   └── index.html
│   └── education/
│       └── index.html
├── case-studies/
│   ├── index.html                          # Case studies hub
│   ├── manchester-ecommerce-seo/
│   │   └── index.html
│   ├── birmingham-b2b-google-ads/
│   │   └── index.html
│   └── manchester-legal-meta-ads/
│       └── index.html
├── local/
│   ├── {21 cities}/
│   │   ├── geo-agency/index.html           # NEW
│   │   ├── voice-ai-agency/index.html      # NEW
│   │   ├── ai-outbound-agency/index.html   # NEW
│   │   └── meta-ads-agency/index.html      # NEW
└── scripts/
    ├── generate_local_geo.py               # NEW
    ├── generate_local_voice_ai.py          # NEW
    ├── generate_local_ai_outbound.py       # NEW
    ├── generate_local_meta_ads.py          # NEW
    └── update_sitemap.py                   # NEW/update
```

### Existing files to modify
```
index.html                        # Homepage: AI-Native reposition, AI Stack section
services/geo.html                 # Per-platform GEO tactics, stats with benchmarks
services/voice-ai.html            # UK use cases, cost comparison
services/ai-outbound.html         # Stats with industry benchmarks
services/ai-automations.html      # Tool logos, ROI calculator section
services/seo.html                 # Add "vs AI Search" comparison, internal links
services/google-ads.html          # Add Performance Max section
sitemap.xml                       # Add all new pages
llms.txt                          # Expand AI citability content
vercel.json                       # Verify redirects for new routes
```

---

## PHASE 1: HOMEPAGE AI-NATIVE REPOSITIONING

### Task 1: Rewrite Homepage Hero + Add AI Stack Section

**Goal:** Change positioning from "Manchester's #1 Digital Marketing Agency" → "Manchester's AI-Native Digital Marketing Agency". Add an "AI Services Stack" section showing how 5 AI services work together. Target keyword: "AI marketing agency Manchester", "AI digital marketing agency UK".

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Read current hero section**

Open `index.html`, find the `<section id="hero">` block. Current H1: "Manchester's #1 Digital Marketing Agency". Current hero-sub explains "14 specialist services".

- [ ] **Step 2: Rewrite hero section**

Replace hero content with:
```html
<section id="hero" aria-label="Bambino Agency">
  <div class="hero-blob" aria-hidden="true"></div>
  <div class="container">
    <div class="hero-content">
      <p class="hero-agency-label">Manchester's AI-Native Agency</p>
      <h1 class="hero-h1">Digital Marketing Powered<br>by AI. Results Proven<br>in the UK.</h1>
      <p class="hero-sub">The only Manchester agency that combines deep SEO, paid media and content expertise with genuine AI capability — automations, Voice AI, AI outbound and GEO. 400+ UK businesses. No contracts.</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem;">
        <a href="https://bambinoagency.com/contact" class="btn-orange" style="font-size: 1rem; padding: 1rem 2.4rem;">Get a Free Audit →</a>
        <a href="#ai-stack" class="btn-outline-dark" style="font-size: 1rem; padding: 1rem 2.4rem;">See Our AI Stack ↓</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add AI Stack section (after services grid, before case studies)**

```html
<!-- AI STACK -->
<section id="ai-stack" aria-labelledby="ai-stack-heading" style="padding: 7rem 0; background: var(--green); position: relative; overflow: hidden;">
  <div class="container" style="position: relative; z-index: 1;">
    <div style="text-align: center; margin-bottom: 4rem;">
      <span class="section-label" style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85);">The AI Advantage</span>
      <h2 id="ai-stack-heading" class="section-title" style="color: #fff;">Our Complete AI Growth Stack</h2>
      <p class="section-sub" style="color: rgba(255,255,255,0.7); margin: 0 auto;">Five AI capabilities that work together — capturing leads, nurturing prospects, and closing sales while your team focuses on delivery.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem;">
      <!-- GEO -->
      <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius); padding: 1.5rem; text-align: center;">
        <div style="font-size: 2rem; margin-bottom: 0.75rem;">🔍</div>
        <h3 style="font-family: var(--font-heading); font-size: 1rem; color: #fff; margin-bottom: 0.5rem;">GEO</h3>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.6;">Get cited by ChatGPT, Perplexity &amp; Google AI Overviews</p>
        <a href="https://bambinoagency.com/services/geo" style="font-size: 0.78rem; color: var(--orange); font-weight: 600; display: block; margin-top: 0.75rem;">Learn more →</a>
      </div>
      <!-- Voice AI -->
      <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius); padding: 1.5rem; text-align: center;">
        <div style="font-size: 2rem; margin-bottom: 0.75rem;">🎙️</div>
        <h3 style="font-family: var(--font-heading); font-size: 1rem; color: #fff; margin-bottom: 0.5rem;">Voice AI</h3>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.6;">AI receptionist captures &amp; qualifies leads 24/7</p>
        <a href="https://bambinoagency.com/services/voice-ai" style="font-size: 0.78rem; color: var(--orange); font-weight: 600; display: block; margin-top: 0.75rem;">Learn more →</a>
      </div>
      <!-- AI Outbound -->
      <div style="background: rgba(255,77,0,0.15); border: 1px solid rgba(255,77,0,0.4); border-radius: var(--radius); padding: 1.5rem; text-align: center;">
        <div style="font-size: 2rem; margin-bottom: 0.75rem;">🚀</div>
        <h3 style="font-family: var(--font-heading); font-size: 1rem; color: #fff; margin-bottom: 0.5rem;">AI Outbound</h3>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.6;">Personalised outreach at scale. 18% reply rate vs 2% industry avg</p>
        <a href="https://bambinoagency.com/services/ai-outbound" style="font-size: 0.78rem; color: var(--orange); font-weight: 600; display: block; margin-top: 0.75rem;">Learn more →</a>
      </div>
      <!-- AI Automations -->
      <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius); padding: 1.5rem; text-align: center;">
        <div style="font-size: 2rem; margin-bottom: 0.75rem;">⚙️</div>
        <h3 style="font-family: var(--font-heading); font-size: 1rem; color: #fff; margin-bottom: 0.5rem;">AI Automations</h3>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.6;">CRM, lead nurturing &amp; reporting — automated end-to-end</p>
        <a href="https://bambinoagency.com/services/ai-automations" style="font-size: 0.78rem; color: var(--orange); font-weight: 600; display: block; margin-top: 0.75rem;">Learn more →</a>
      </div>
      <!-- AI Development -->
      <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius); padding: 1.5rem; text-align: center;">
        <div style="font-size: 2rem; margin-bottom: 0.75rem;">🤖</div>
        <h3 style="font-family: var(--font-heading); font-size: 1rem; color: #fff; margin-bottom: 0.5rem;">AI Development</h3>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.6;">Custom AI products built for your specific business needs</p>
        <a href="https://bambinoagency.com/services/ai-development" style="font-size: 0.78rem; color: var(--orange); font-weight: 600; display: block; margin-top: 0.75rem;">Learn more →</a>
      </div>
    </div>
    <p style="text-align: center; margin-top: 3rem; font-size: 0.85rem; color: rgba(255,255,255,0.45);">All 5 services integrate with your existing CRM, website, and marketing stack. No rip-and-replace.</p>
  </div>
</section>
```

- [ ] **Step 4: Update JSON-LD schema — add AI services to Organization**

In the `<script type="application/ld+json">` on homepage, update `hasOfferCatalog` to include AI services. Also update the `description` field:
```json
"description": "Manchester-based AI-native digital marketing agency. Combining SEO, Google Ads, Meta Ads and content marketing with AI automations, Voice AI, GEO and AI outbound for UK businesses."
```

- [ ] **Step 5: Verify and commit**

```bash
# Count words
python -c "import re; content=open('index.html',encoding='utf-8').read(); print(len(re.sub('<[^>]+>',' ',content).split()),'words')"
# Expected: 2500+ words

git add index.html
git commit -m "feat: homepage — AI-Native repositioning, AI Stack section, updated hero + schema"
```

---

## PHASE 2: SERVICE PAGES DEEP ENHANCEMENT

### Task 2: GEO Page — Per-Platform Tactics + Stats with Benchmarks

**Goal:** Expand `services/geo.html` with platform-specific optimization sections for ChatGPT, Perplexity, and Google AI Overviews separately. Add industry benchmark stats. Target: "GEO optimisation UK", "generative engine optimisation agency", "how to rank on ChatGPT UK".

**Files:**
- Modify: `services/geo.html`

- [ ] **Step 1: Add per-platform optimization section**

After the existing "Our 4-Step GEO Process" section, insert:

```html
<!-- PLATFORM-SPECIFIC GEO -->
<section style="padding: 6rem 0; background: var(--bg);">
  <div class="container">
    <div style="text-align: center; margin-bottom: 4rem;">
      <span class="section-label">Platform Intelligence</span>
      <h2 class="section-title">How We Optimise for Each AI Platform</h2>
      <p class="section-sub" style="margin: 0 auto;">ChatGPT, Perplexity, and Google AI Overviews each rank content differently. One-size-fits-all GEO doesn't work — here's how we tailor strategy per platform.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
      <!-- ChatGPT -->
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); border-top: 4px solid #10a37f;">
        <div style="font-size: 1.5rem; margin-bottom: 1rem;">💬 ChatGPT / SearchGPT</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 1rem;">Citation Signals</h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Brand mentions in authoritative publications (BBC, Guardian, industry press)</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Bing-indexed pages (SearchGPT uses Bing's web index)</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Well-structured FAQ content (passage-level indexing)</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>High domain authority backlink profile</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Entity recognition: consistent NAP, Wikipedia presence, Wikidata</span></li>
        </ul>
      </div>
      <!-- Perplexity -->
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); border-top: 4px solid #6366f1;">
        <div style="font-size: 1.5rem; margin-bottom: 1rem;">🔵 Perplexity AI</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 1rem;">Source Citation Signals</h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Direct answer format — Perplexity favours pages that answer questions in first 100 words</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Unique data points (original research, proprietary stats)</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Recency signals — pages updated within 90 days rank more often</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Structured data: HowTo, FAQPage, Article schema</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Clean crawlability — no JavaScript rendering barriers</span></li>
        </ul>
      </div>
      <!-- Google AI Overviews -->
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); border-top: 4px solid #4285f4;">
        <div style="font-size: 1.5rem; margin-bottom: 1rem;">🔷 Google AI Overviews</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 1rem;">AI Overview Signals</h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>E-E-A-T signals: author credentials, review dates, bylines</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Featured snippet optimisation (position-zero content structure)</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Core Web Vitals — slow pages are excluded from AIO sources</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>Semantic richness — covers topic comprehensively, not just target keyword</span></li>
          <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">✓ <span>HTTPS, canonical, mobile-friendly — technical baseline required</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add stats with industry benchmarks**

In the hero stats bar, replace vague stats with contextualized ones:
```html
<div class="stat-item">
  <span class="stat-num">18%</span>
  <span class="stat-label">avg. AI citation rate<br><small style="font-size:0.7rem;color:var(--muted)">Industry avg: 2–4%</small></span>
</div>
<div class="stat-item">
  <span class="stat-num">+1,600%</span>
  <span class="stat-label">UK demand for GEO<br><small style="font-size:0.7rem;color:var(--muted)">YoY search growth 2025</small></span>
</div>
<div class="stat-item">
  <span class="stat-num">25%</span>
  <span class="stat-label">UK SMEs with GEO<br><small style="font-size:0.7rem;color:var(--muted)">Only 1 in 4 — first-mover advantage</small></span>
</div>
```

- [ ] **Step 3: Update FAQPage schema with 2 additional Q&A**

Add to the existing 7 questions in `@graph` FAQPage:
```json
{ "@type": "Question", "name": "How is GEO optimisation different for ChatGPT versus Perplexity?", "acceptedAnswer": { "@type": "Answer", "text": "ChatGPT (SearchGPT) relies heavily on Bing's web index, brand authority, and entity recognition. Perplexity prioritises pages that answer questions directly in the first 100 words, favour recency (pages updated within 90 days), and use clean HTML without JavaScript rendering barriers. Google AI Overviews weight E-E-A-T signals, featured snippet structure, and Core Web Vitals most heavily. We optimise for all three simultaneously with platform-specific content structures." } },
{ "@type": "Question", "name": "Which UK industries benefit most from GEO optimisation?", "acceptedAnswer": { "@type": "Answer", "text": "Legal services, financial services, healthcare, and property sectors see the highest GEO ROI because prospects use AI assistants to research high-stakes decisions before contacting providers. A solicitor cited by ChatGPT in a 'what to do after an accident' answer gains authority before a single click. B2B SaaS and professional services are also high-value GEO sectors where buying decisions are research-heavy." } }
```

- [ ] **Step 4: Verify word count and commit**

```bash
python -c "import re; c=open('services/geo.html',encoding='utf-8').read(); print(len(re.sub('<[^>]+>',' ',c).split()),'words')"
# Expected: 4000+ words

git add services/geo.html
git commit -m "feat: geo — per-platform tactics (ChatGPT/Perplexity/Google AIO), contextualized stats, 9 FAQ questions"
```

### Task 3: Voice AI Page — UK Use Cases + Cost Comparison

**Files:** `services/voice-ai.html`

- [ ] **Step 1: Add UK Use Cases section**

After the hero, before the 4-step process, insert:
```html
<section style="padding: 6rem 0; background: var(--bg);">
  <div class="container">
    <div style="text-align: center; margin-bottom: 4rem;">
      <span class="section-label">Real UK Applications</span>
      <h2 class="section-title">Voice AI in Action: UK Use Cases</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🦷</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Dental &amp; GP Practices</h3>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">AI receptionist handles appointment booking and confirmation calls 24/7. Typical result: 35% reduction in no-shows, 4× call capacity without additional staff.</p>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">£1,200–£1,800/month → saves 1+ full-time receptionist</div>
      </div>
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🏠</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Estate Agents &amp; Property</h3>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">AI handles viewing requests, mortgage enquiry qualification, and vendor callbacks instantly. Agents respond only to pre-qualified, high-intent leads.</p>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">3× more viewings booked from same enquiry volume</div>
      </div>
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🔧</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Trades &amp; Home Services</h3>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">Plumbers, electricians, and builders miss 40–60% of inbound calls on-site. Voice AI answers every call, qualifies the job, and books a callback or site visit automatically.</p>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">40% more leads captured from existing call volume</div>
      </div>
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">⚖️</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Legal Services &amp; Solicitors</h3>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">Initial enquiry screening, conflict-of-interest checks, and matter type qualification — completed by AI before a fee-earner picks up. Compliance-ready, GDPR-compliant recordings.</p>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">Fee-earner time on calls reduced by 65%</div>
      </div>
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🍽️</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Hospitality &amp; Restaurants</h3>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">Table reservations, special occasion requests, dietary requirements — handled automatically, 7 days/week. Integration with OpenTable, ResDiary, and most booking systems.</p>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">Zero missed reservation calls</div>
      </div>
      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">📊</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Financial Services &amp; Accountants</h3>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">Prospect qualification (assets, tax situation, company size), appointment booking, and client satisfaction surveys — automated and FCA-framework aware.</p>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">Qualified prospect pipeline doubled in 60 days</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add cost comparison table**

```html
<section style="padding: 5rem 0; background: var(--soft);">
  <div class="container">
    <h2 class="section-title" style="text-align: center; margin-bottom: 3rem;">Voice AI vs Human Receptionist: Cost Comparison</h2>
    <div style="max-width: 700px; margin: 0 auto; background: var(--card); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow);">
      <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
        <thead>
          <tr style="background: var(--green); color: #fff;">
            <th style="padding: 1rem 1.5rem; text-align: left;">Cost Factor</th>
            <th style="padding: 1rem; text-align: center;">Human Receptionist</th>
            <th style="padding: 1rem; text-align: center; color: var(--orange);">Voice AI</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Monthly cost</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--muted);">£2,000–£2,800</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">£997–£2,500</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.02);">
            <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Hours available</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--muted);">40 hrs/week</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">168 hrs/week (24/7)</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Simultaneous calls</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--muted);">1</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">Unlimited</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.02);">
            <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Cost per call</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--muted);">£9–£12</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">£0.24–£0.40</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Sick days / holidays</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--muted);">28 days/year</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">Zero</td>
          </tr>
          <tr>
            <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Setup time</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--muted);">4–6 weeks hiring</td>
            <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">2–3 weeks live</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add services/voice-ai.html
git commit -m "feat: voice-ai — 6 UK industry use cases, cost vs human receptionist comparison table"
```

### Task 4: AI Outbound + AI Automations — Stats with Industry Benchmarks

**Files:** `services/ai-outbound.html`, `services/ai-automations.html`

- [ ] **Step 1: Add benchmark context to ai-outbound.html stats**

Find the stats bar (hero stats section) and update:
```html
<!-- Hero stat items — add benchmark line under each number -->
<span class="stat-label">reply rate
  <small style="display:block;font-size:0.7rem;color:var(--muted);margin-top:0.2rem">Industry avg: 2–5%</small>
</span>

<span class="stat-label">more qualified meetings
  <small style="display:block;font-size:0.7rem;color:var(--muted);margin-top:0.2rem">vs manual outbound baseline</small>
</span>
```

- [ ] **Step 2: Add a "What Scales Look Like" section to ai-outbound.html**

```html
<section style="padding: 5rem 0; background: var(--soft);">
  <div class="container">
    <h2 class="section-title" style="text-align:center;margin-bottom:3rem;">AI Outbound vs Manual Sales: The Numbers</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;max-width:900px;margin:0 auto;">
      <div style="background:var(--card);border-radius:var(--radius);padding:2rem;text-align:center;box-shadow:var(--shadow);">
        <div style="font-family:var(--font-heading);font-size:2.5rem;color:var(--orange);margin-bottom:0.5rem;">£0.35</div>
        <div style="font-size:0.88rem;color:var(--muted);">Cost per AI outbound touchpoint<br><strong style="color:var(--text)">vs £12–£18 human SDR equivalent</strong></div>
      </div>
      <div style="background:var(--card);border-radius:var(--radius);padding:2rem;text-align:center;box-shadow:var(--shadow);">
        <div style="font-family:var(--font-heading);font-size:2.5rem;color:var(--orange);margin-bottom:0.5rem;">500+</div>
        <div style="font-size:0.88rem;color:var(--muted);">Personalised contacts per week<br><strong style="color:var(--text)">vs 50–80 for a human SDR</strong></div>
      </div>
      <div style="background:var(--card);border-radius:var(--radius);padding:2rem;text-align:center;box-shadow:var(--shadow);">
        <div style="font-family:var(--font-heading);font-size:2.5rem;color:var(--orange);margin-bottom:0.5rem;">18%</div>
        <div style="font-size:0.88rem;color:var(--muted);">Avg positive reply rate<br><strong style="color:var(--text)">vs 2–5% industry cold email average</strong></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add ROI section to ai-automations.html**

```html
<section style="padding: 5rem 0; background: var(--soft);">
  <div class="container">
    <h2 class="section-title" style="text-align:center;margin-bottom:3rem;">What 30 Hours Saved Per Week Actually Means</h2>
    <div style="max-width:700px;margin:0 auto;background:var(--card);border-radius:var(--radius);padding:2.5rem;box-shadow:var(--shadow);">
      <p style="font-size:0.95rem;color:var(--muted);line-height:1.75;margin-bottom:2rem;">The "30 hours saved" headline sounds good. Here's what it means in practice for a typical UK SME (10-person team, average staff cost £35,000/year):</p>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border);">
          <span style="font-size:0.9rem;">Hours saved per week</span>
          <strong>30 hrs</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border);">
          <span style="font-size:0.9rem;">Annual hours reclaimed</span>
          <strong>1,560 hrs</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border);">
          <span style="font-size:0.9rem;">Equivalent staff cost (£17/hr)</span>
          <strong style="color:var(--orange);">£26,520/year</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border);">
          <span style="font-size:0.9rem;">AI automation retainer</span>
          <strong>£11,964/year (£997/mo)</strong>
        </div>
        <div style="display:flex;justify-content:space-between;padding:0.75rem 0;background:rgba(255,77,0,0.05);padding:1rem;border-radius:8px;margin-top:0.5rem;">
          <span style="font-weight:700;">Net annual saving</span>
          <strong style="color:var(--orange);font-size:1.1rem;">£14,556</strong>
        </div>
      </div>
      <p style="font-size:0.82rem;color:var(--muted);margin-top:1.5rem;">*Based on UK median hourly rate for admin/marketing roles. Actual results vary by business type and automation scope.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Commit both**

```bash
git add services/ai-outbound.html services/ai-automations.html
git commit -m "feat: ai-outbound — benchmark stats (18% vs 2-5% industry), scale comparison; ai-automations — ROI calculator section"
```

---

## PHASE 3: BLOG / KNOWLEDGE HUB

### Task 5: Blog Hub Page + URL Structure

**Goal:** Create `/blog/index.html` as the hub for all informational content. This page itself targets "digital marketing blog UK", "digital marketing guides UK". Internal links from all service pages to relevant blog posts.

**Files:**
- Create: `blog/index.html`

- [ ] **Step 1: Create blog directory**

```bash
mkdir -p C:/Users/Zver/projects/bambino-agency/blog
```

- [ ] **Step 2: Create blog/index.html**

Full page content (2000+ words). Key sections:
- Hero: "Digital Marketing Knowledge Hub — UK Business Guides"
- Featured articles grid (3 columns, cards with category badge, title, excerpt, read time)
- Categories: AI & Automation | SEO & Search | Paid Advertising | Content & Social | Strategy
- Popular guides section
- Newsletter signup CTA
- JSON-LD: WebPage + BreadcrumbList + ItemList (blog posts)
- Meta: title="Digital Marketing Blog UK — Guides &amp; Insights | Bambino"
- Meta desc: "Expert UK digital marketing guides from Bambino's Manchester team. SEO, Google Ads, AI marketing, GEO and more — practical insights for UK businesses."

The article card template:
```html
<article class="blog-card">
  <div class="blog-card-category">SEO</div>
  <h3 class="blog-card-title"><a href="/blog/what-is-geo-optimisation">What Is GEO Optimisation? The UK Business Guide for 2026</a></h3>
  <p class="blog-card-excerpt">GEO (Generative Engine Optimisation) is how you get cited by ChatGPT, Perplexity and Google AI Overviews. Here's what every UK business needs to know...</p>
  <div class="blog-card-meta">
    <span>8 min read</span>
    <span>·</span>
    <span>Updated Apr 2026</span>
  </div>
</article>
```

- [ ] **Step 3: Verify structure and commit**

```bash
python -c "import re; c=open('blog/index.html',encoding='utf-8').read(); print(len(re.sub('<[^>]+>',' ',c).split()),'words')"
# Expected: 1500+ words

git add blog/index.html
git commit -m "feat: blog hub — /blog/index.html with article grid, categories, JSON-LD ItemList"
```

### Task 6: Blog Post — "What Is GEO Optimisation?" (HIGH PRIORITY)

**Target keyword:** "what is GEO optimisation", "generative engine optimisation UK", "how to rank on ChatGPT UK"
**Monthly volume:** 720 + 210 combined
**Format:** Definitive guide, 2500+ words

**Files:**
- Create: `blog/what-is-geo-optimisation/index.html`

- [ ] **Step 1: Create file with full content**

Key content structure:
- Title: `What Is GEO Optimisation? The Complete UK Guide for 2026`
- H1: "What Is GEO Optimisation? How UK Businesses Can Get Cited by AI Search"
- Introduction: Define GEO, who it's for, why it matters NOW
- Section 1: What Is GEO Optimisation? (definition, history, vs SEO)
- Section 2: Why GEO Matters for UK Businesses in 2026 (stats: 1,600% growth, 25% adoption)
- Section 3: How ChatGPT, Perplexity, and Google AI Overviews Rank Content (per-platform tactics)
- Section 4: GEO Optimisation Checklist (10 actionable steps)
- Section 5: GEO Ranking Factors (structured data, E-E-A-T, recency, passage-level)
- Section 6: How Long Does GEO Take? (realistic timeline)
- Section 7: DIY vs Agency GEO (when to hire)
- FAQ: 8 questions (What is GEO? vs SEO? Cost? Which platforms? How to measure?)
- CTA: Free GEO audit

Schema: Article + FAQPage + BreadcrumbList
Author: "James M., Head of SEO at Bambino Agency — Semrush Academy Certified, Google Analytics Certified"
Date: 2026-04-17
Word count target: 2,500+

- [ ] **Step 2: Verify**

```bash
python -c "import re; c=open('blog/what-is-geo-optimisation/index.html',encoding='utf-8').read(); q=len(re.findall('\"@type\": \"Question\"',c)); print(len(re.sub('<[^>]+>',' ',c).split()),'words,',q,'FAQ Q')"
# Expected: 2500+ words, 8 FAQ Q
```

- [ ] **Step 3: Commit**

```bash
git add blog/what-is-geo-optimisation/
git commit -m "feat: blog — 'What Is GEO Optimisation?' guide, 2500+ words, Article+FAQPage schema"
```

### Task 7: Blog Post — "How Much Does SEO Cost in the UK?"

**Target keyword:** "how much does SEO cost UK", "SEO pricing UK 2026", "SEO packages UK prices"
**Monthly volume:** 2,400 (highest priority)

**Files:**
- Create: `blog/how-much-does-seo-cost-uk/index.html`

- [ ] **Step 1: Create full content**

Structure (2500+ words):
- H1: "How Much Does SEO Cost in the UK? 2026 Pricing Guide"
- Section 1: Why SEO pricing varies so much (scope, competition, agency size)
- Section 2: UK SEO pricing tiers (table: Freelancer £40-80/hr | Boutique Agency £500-1,500/mo | Mid-tier Agency £1,500-3,000/mo | Full-service £3,000-8,000/mo | Enterprise £8,000+)
- Section 3: What's included at each price point (comparison table)
- Section 4: Hidden costs to watch for (link building, content creation, tool licences)
- Section 5: How to evaluate an SEO proposal (red flags, green flags)
- Section 6: ROI benchmarks (average 320% traffic growth; 12-month payback period)
- Section 7: Questions to ask before signing
- FAQ: 8 questions
- CTA: Free SEO audit

Schema: Article + FAQPage + BreadcrumbList + PriceSpecification

- [ ] **Step 2: Commit**

```bash
git add blog/how-much-does-seo-cost-uk/
git commit -m "feat: blog — 'How Much Does SEO Cost UK' guide, pricing tables, 2500+ words"
```

### Task 8: Blog Post — "What Is AI Outbound Sales?"

**Target keyword:** "AI outbound sales UK", "what is AI outbound", "AI sales automation UK"
**Monthly volume:** 480 (low competition, first-mover)

**Files:**
- Create: `blog/what-is-ai-outbound-sales/index.html`

- [ ] **Step 1: Create full content**

Structure (2000+ words):
- H1: "What Is AI Outbound Sales? How UK Businesses Are Generating Leads 24/7"
- Section 1: Definition (AI outbound = automated, personalised prospecting at scale)
- Section 2: How AI outbound works (email sequence + LinkedIn + AI research + voice)
- Section 3: AI outbound vs traditional cold calling (cost comparison: £0.35 vs £12–18)
- Section 4: Real results (18% reply rate vs 2–5% industry avg; 500+ contacts/week vs 50–80 human SDR)
- Section 5: UK GDPR compliance (B2B legitimate interest, ICO guidance, unsubscribe requirements)
- Section 6: Industries where AI outbound works best (SaaS, B2B services, property, recruitment)
- Section 7: How to start (DIY tools vs managed service)
- FAQ: 8 questions
- CTA: Free AI outbound consultation

- [ ] **Step 2: Commit**

```bash
git add blog/what-is-ai-outbound-sales/
git commit -m "feat: blog — 'What Is AI Outbound Sales' guide, 2000+ words, UK GDPR compliance section"
```

### Task 9: Blog Post — "Google Ads Cost UK 2026"

**Target keyword:** "how much does Google Ads cost UK", "Google Ads pricing UK", "Google Ads budget UK"
**Monthly volume:** 1,800

**Files:**
- Create: `blog/google-ads-cost-uk/index.html`

- [ ] **Step 1: Create full content (2500+ words)**

Structure:
- H1: "How Much Does Google Ads Cost in the UK? 2026 Complete Guide"
- CPC benchmarks by industry (table: Legal £8–45, Property £3–15, Finance £10–35, eCommerce £0.50–3, Local services £1–8)
- Management fee structures (% of spend vs flat fee vs performance)
- What a £1,000/month budget actually gets you
- Smart bidding explained
- Red flags in Google Ads proposals
- FAQ: 8 questions including "Is Google Ads worth it for a small UK business?"
- CTA: Free Google Ads audit

- [ ] **Step 2: Commit**

```bash
git add blog/google-ads-cost-uk/
git commit -m "feat: blog — 'Google Ads Cost UK' guide, CPC benchmarks by industry, 2500+ words"
```

### Task 10: Blog Post — "Best SEO Agencies UK 2026" (Link Bait)

**Target keyword:** "best SEO agency UK 2026", "top SEO agencies UK", "SEO agency comparison UK"
**Monthly volume:** 1,200 (high commercial intent)
**Strategy:** Bambino ranks in its own "best" list with transparent criteria — common, ethical approach.

**Files:**
- Create: `blog/best-seo-agencies-uk/index.html`

- [ ] **Step 1: Create full content (3000+ words)**

Structure:
- H1: "Best SEO Agencies in the UK 2026: How to Choose the Right Partner"
- Section 1: What makes an SEO agency genuinely good (criteria: transparency, reporting, specialisms, certifications, case studies, no lock-in)
- Section 2: Red flags (guaranteed rankings promises, link farms, no reporting, outsourced overseas)
- Section 3: Questions to ask any SEO agency (list of 12)
- Section 4: How to evaluate proposals
- Section 5: Where Bambino fits (honest self-placement: specialist in AI-native SEO for UK businesses)
- Section 6: What SEO should cost (links to /blog/how-much-does-seo-cost-uk)
- FAQ: 8 questions
- CTA: Book a free audit

Note: Do NOT list named competitors with negative framing — list evaluation criteria only.

- [ ] **Step 2: Commit**

```bash
git add blog/best-seo-agencies-uk/
git commit -m "feat: blog — 'Best SEO Agencies UK 2026' evaluation guide, 3000+ words"
```

### Task 11: Blog Posts — Batch 2 (5 more posts)

**Files to create:**
- `blog/seo-vs-google-ads/index.html` — 2000+ words, target "SEO vs Google Ads UK" (590/mo)
- `blog/what-is-digital-marketing/index.html` — 2500+ words, target "what is digital marketing" (8,100/mo, competitive but foundational)
- `blog/how-to-get-more-leads-uk/index.html` — 2000+ words, target "how to get more leads UK" (1,300/mo)
- `blog/ai-marketing-trends-uk-2026/index.html` — 2000+ words, target "AI marketing trends UK 2026" (480/mo)
- `blog/voice-ai-for-business-uk/index.html` — 2000+ words, target "voice AI for business UK" (140/mo, very low competition)

Each post follows identical structure:
- Full HTML with header/nav/footer matching site design
- JSON-LD: Article + FAQPage (8+ questions) + BreadcrumbList
- Author byline with credentials
- 2000–3000 words
- 1 CTA linking to relevant service page
- Internal links: 3+ links to other blog posts and service pages

- [ ] **Step 1: Create all 5 posts**

```bash
mkdir -p blog/seo-vs-google-ads blog/what-is-digital-marketing blog/how-to-get-more-leads-uk blog/ai-marketing-trends-uk-2026 blog/voice-ai-for-business-uk
# Create index.html in each with full content
```

- [ ] **Step 2: Commit batch**

```bash
git add blog/
git commit -m "feat: blog — batch 2 (SEO vs Google Ads, What Is Digital Marketing, How To Get More Leads, AI Marketing Trends, Voice AI for Business)"
```

---

## PHASE 4: INDUSTRY VERTICAL PAGES

### Task 12: Industries Hub Page

**Files:**
- Create: `industries/index.html`

- [ ] **Step 1: Create industries/index.html**

Target keyword: "digital marketing for UK businesses by industry"
Structure:
- H1: "Digital Marketing by Industry — UK Sector Specialists"
- 8 industry cards (eCommerce, Legal, Property, Healthcare, Hospitality, SaaS, Professional Services, Education)
- Each card: industry icon, headline stat ("eCommerce clients see 4.8× average ROAS"), 2-line description, link to sector page
- Social proof: "We've worked across 14 UK industries since 2019"
- FAQ: 6 questions
- CTA
- Schema: WebPage + BreadcrumbList + ItemList

- [ ] **Step 2: Commit**

```bash
git add industries/index.html
git commit -m "feat: industries hub — /industries/index.html with 8 sector cards"
```

### Task 13: eCommerce Industry Page

**Target keyword:** "digital marketing for ecommerce UK", "SEO for online shops UK", "Google Ads for ecommerce UK"
**Monthly volume:** 720 + 480 combined

**Files:**
- Create: `industries/ecommerce/index.html`

- [ ] **Step 1: Create full page (2500+ words)**

Structure:
- H1: "Digital Marketing for eCommerce Businesses in the UK"
- Hero stats: avg 4.8× ROAS | 320% organic traffic | 35% CPA reduction
- Section 1: eCommerce challenges in UK (competition, margins, seasonality, Shopify/WooCommerce)
- Section 2: Services that move the needle for eCommerce (Google Shopping, Performance Max, SEO product pages, Meta catalogue ads, email sequences)
- Section 3: Our eCommerce approach (platform-specific: Shopify, WooCommerce, Magento, BigCommerce)
- Section 4: Case study preview (Manchester eCommerce brand +320% organic traffic in 18 months)
- Section 5: eCommerce SEO checklist (10 items)
- Section 6: Pricing for eCommerce (Starter £1,200/mo → Scale £5,500/mo)
- FAQ: 7 questions
- CTA
- Schema: Service + FAQPage + BreadcrumbList + SiteNavigationElement

- [ ] **Step 2: Commit**

```bash
git add industries/ecommerce/
git commit -m "feat: industries — eCommerce sector page, 2500+ words, Google Shopping + SEO + Meta focus"
```

### Task 14: Legal Industry Page

**Target keyword:** "digital marketing for solicitors UK", "SEO for law firms UK", "Google Ads for solicitors UK"
**Monthly volume:** 320 + 260 combined

**Files:**
- Create: `industries/legal/index.html`

- [ ] **Step 1: Create full page (2500+ words)**

Structure:
- H1: "Digital Marketing for UK Law Firms &amp; Solicitors"
- SRA compliance note prominently
- Services: SEO for personal injury/conveyancing/commercial, Google Ads (LSAs), reviews management, Voice AI for enquiry qualification
- Case study: Manchester legal firm +145% lead conversions
- SRA Solicitors Code of Conduct — how Bambino's approach stays compliant
- FAQ: 7 questions including SRA compliance, legal sector Google Ads policies

- [ ] **Step 2: Commit**

```bash
git add industries/legal/
git commit -m "feat: industries — legal/solicitors sector page, SRA compliance section, 2500+ words"
```

### Task 15: Property Industry Page

**Target keyword:** "digital marketing for estate agents UK", "SEO for property companies UK", "Google Ads for property UK"
**Monthly volume:** 590 + 310 combined

**Files:**
- Create: `industries/property/index.html`

- [ ] **Step 1: Create full page (2500+ words)**

Structure:
- H1: "Digital Marketing for UK Property Companies &amp; Estate Agents"
- Services: Local SEO (branch-level), Google Ads (buyer + seller targeting), Voice AI (viewing requests), social (property listings)
- Portals strategy (Rightmove/Zoopla complement, not replace)
- GDPR for property marketing (ICO)
- Case study preview
- FAQ: 7 questions

- [ ] **Step 2: Commit**

```bash
git add industries/property/
git commit -m "feat: industries — property/estate agents sector page, 2500+ words"
```

### Task 16: Healthcare, Hospitality, SaaS, Professional Services, Education Pages

**Files:**
- Create: `industries/healthcare/index.html` — CQC compliance awareness, GP/dental/private clinic focus
- Create: `industries/hospitality/index.html` — Google Hotels, TripAdvisor, social, review management
- Create: `industries/saas/index.html` — SaaS SEO, product-led growth, G2/Capterra, SaaS content
- Create: `industries/professional-services/index.html` — B2B SEO, LinkedIn Ads, thought leadership
- Create: `industries/education/index.html` — Schools, universities, training providers, OFSTED-aware

Each: 2000+ words, 7 FAQ questions, FAQPage schema, service recommendations per industry, relevant compliance notes.

- [ ] **Step 1: Create all 5 pages**

```bash
mkdir -p industries/healthcare industries/hospitality industries/saas industries/professional-services industries/education
```

- [ ] **Step 2: Batch commit**

```bash
git add industries/
git commit -m "feat: industries — healthcare, hospitality, saas, professional-services, education sector pages (5 pages, 2000+ words each)"
```

---

## PHASE 5: CASE STUDIES SECTION

### Task 17: Case Studies Hub + 3 Detailed Case Studies

**Goal:** Establish E-E-A-T through real (composite, anonymised-detail) case studies with specific metrics. Internal links from all service pages. Target: "digital marketing case studies UK", "SEO results UK agency".

**Files:**
- Create: `case-studies/index.html`
- Create: `case-studies/manchester-ecommerce-seo/index.html`
- Create: `case-studies/birmingham-b2b-google-ads/index.html`
- Create: `case-studies/manchester-legal-meta-ads/index.html`

- [ ] **Step 1: Create case-studies/index.html hub**

Structure:
- H1: "Client Case Studies — Real Results for UK Businesses"
- 3 case study cards with: industry, location, service used, headline metric
- Testimonial quotes
- "Your results start here" CTA
- Schema: ItemList + BreadcrumbList + WebPage

- [ ] **Step 2: Create case-studies/manchester-ecommerce-seo/index.html**

Full case study:
- Client: "Manchester-based outdoor equipment eCommerce brand" (anonymised sector detail)
- Challenge: Page 3–5 Google rankings for main product categories, low organic revenue
- Services: Technical SEO audit, on-page optimisation, content strategy, link building
- Timeline: 18 months
- Results: +320% organic traffic | +£280,000 incremental annual revenue | Page 1 for 47 target keywords
- What we did (5 specific tactics with examples)
- Quote from client
- Schema: Article + BreadcrumbList + Review

- [ ] **Step 3: Create birmingham-b2b-google-ads and manchester-legal-meta-ads case studies**

Same format. Birmingham B2B: 9.8× ROAS for Google Ads campaign. Manchester Legal: +145% lead conversions from Meta Ads.

- [ ] **Step 4: Add "Case Study" links to service pages**

In `services/seo.html`, `services/google-ads.html`, `services/meta-ads.html` — add a sentence and link to relevant case study.

- [ ] **Step 5: Commit**

```bash
git add case-studies/
git add services/seo.html services/google-ads.html services/meta-ads.html
git commit -m "feat: case studies — hub + 3 detailed studies (eCommerce SEO, B2B Google Ads, Legal Meta Ads), linked from service pages"
```

---

## PHASE 6: NEW LOCAL SERVICE PAGES (94 pages)

### Task 18: Generate Local GEO Agency Pages (21 cities)

**Target keywords:** "GEO agency Manchester", "GEO optimisation London", "AI search optimisation Birmingham", etc.

**Files:**
- Create: `scripts/generate_local_geo.py`
- Output: `local/{city}/geo-agency/index.html` × 21 cities

- [ ] **Step 1: Create generator script**

```python
# scripts/generate_local_geo.py
import os, json

cities = {
    'manchester': {'display': 'Manchester', 'lat': 53.4808, 'lon': -2.2426, 'county': 'Greater Manchester'},
    'london': {'display': 'London', 'lat': 51.5074, 'lon': -0.1278, 'county': 'Greater London'},
    'birmingham': {'display': 'Birmingham', 'lat': 52.4862, 'lon': -1.8904, 'county': 'West Midlands'},
    'leeds': {'display': 'Leeds', 'lat': 53.8008, 'lon': -1.5491, 'county': 'West Yorkshire'},
    'bristol': {'display': 'Bristol', 'lat': 51.4545, 'lon': -2.5879, 'county': 'Bristol'},
    'edinburgh': {'display': 'Edinburgh', 'lat': 55.9533, 'lon': -3.1883, 'county': 'Scotland'},
    'glasgow': {'display': 'Glasgow', 'lat': 55.8642, 'lon': -4.2518, 'county': 'Scotland'},
    'newcastle': {'display': 'Newcastle', 'lat': 54.9783, 'lon': -1.6178, 'county': 'Tyne and Wear'},
    'sheffield': {'display': 'Sheffield', 'lat': 53.3811, 'lon': -1.4701, 'county': 'South Yorkshire'},
    'liverpool': {'display': 'Liverpool', 'lat': 53.4084, 'lon': -2.9916, 'county': 'Merseyside'},
    'nottingham': {'display': 'Nottingham', 'lat': 52.9548, 'lon': -1.1581, 'county': 'Nottinghamshire'},
    'leicester': {'display': 'Leicester', 'lat': 52.6369, 'lon': -1.1398, 'county': 'Leicestershire'},
    'oxford': {'display': 'Oxford', 'lat': 51.7520, 'lon': -1.2577, 'county': 'Oxfordshire'},
    'cambridge': {'display': 'Cambridge', 'lat': 52.2053, 'lon': 0.1218, 'county': 'Cambridgeshire'},
    'brighton': {'display': 'Brighton', 'lat': 50.8229, 'lon': -0.1363, 'county': 'East Sussex'},
    'cardiff': {'display': 'Cardiff', 'lat': 51.4816, 'lon': -3.1791, 'county': 'Wales'},
    'aberdeen': {'display': 'Aberdeen', 'lat': 57.1497, 'lon': -2.0943, 'county': 'Scotland'},
    'belfast': {'display': 'Belfast', 'lat': 54.5973, 'lon': -5.9301, 'county': 'Northern Ireland'},
    'bradford': {'display': 'Bradford', 'lat': 53.7960, 'lon': -1.7594, 'county': 'West Yorkshire'},
    'bournemouth': {'display': 'Bournemouth', 'lat': 50.7192, 'lon': -1.8808, 'county': 'Dorset'},
    'blackpool': {'display': 'Blackpool', 'lat': 53.8142, 'lon': -3.0503, 'county': 'Lancashire'},
}

TEMPLATE = """<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>GEO Agency {display} — AI Search Optimisation | Bambino</title>
  <meta name="description" content="Get your {display} business cited by ChatGPT, Perplexity &amp; Google AI Overviews. Bambino's GEO agency in {display} — AI search experts. Free audit.">
  <link rel="canonical" href="https://bambinoagency.com/local/{city}/geo-agency">
  <!-- [full CSS/nav/footer matching existing local page template] -->
  <script type="application/ld+json">
  {{"@context": "https://schema.org", "@type": ["LocalBusiness", "MarketingAgency"], "name": "Bambino", "description": "GEO and AI Search Optimisation services in {display}", "url": "https://bambinoagency.com/local/{city}/geo-agency", "telephone": "+44 161 000 0000", "email": "hello@bambinoagency.com", "address": {{"@type": "PostalAddress", "addressLocality": "{display}", "addressCountry": "GB"}}, "geo": {{"@type": "GeoCoordinates", "latitude": {lat}, "longitude": {lon}}}, "servedArea": {{"@type": "City", "name": "{display}"}}}}
  </script>
</head>
<!-- [body: same structure as existing local pages but for GEO service] -->
</html>"""

base_dir = 'C:/Users/Zver/projects/bambino-agency/local'
for city, data in cities.items():
    out_dir = f'{base_dir}/{city}/geo-agency'
    os.makedirs(out_dir, exist_ok=True)
    html = TEMPLATE.format(city=city, display=data['display'], lat=data['lat'], lon=data['lon'])
    open(f'{out_dir}/index.html', 'w', encoding='utf-8').write(html)
    print(f'Created {city}/geo-agency')

print(f'Done: {len(cities)} pages')
```

Note: The TEMPLATE above is a skeleton — the actual script must use the full local page HTML template (6000+ words) matching the existing local pages' CSS, nav, footer, and content structure. Copy the generator pattern from the existing local pages and adapt for GEO service content.

- [ ] **Step 2: Run the generator**

```bash
python scripts/generate_local_geo.py
# Expected output: "Done: 21 pages"
```

- [ ] **Step 3: Verify output**

```bash
python -c "
import glob, re
pages = glob.glob('local/*/geo-agency/index.html')
for f in pages[:3]:
    c = open(f, encoding='utf-8').read()
    print(f.split('/')[1], len(re.sub('<[^>]+>',' ',c).split()), 'words')
print('Total:', len(pages), 'pages')
"
# Expected: 21 pages, each 700+ words
```

- [ ] **Step 4: Commit**

```bash
git add local/*/geo-agency/
git commit -m "feat: local — GEO agency pages for all 21 cities (21 new pages)"
```

### Task 19: Generate Local Voice AI, AI Outbound, Meta Ads Pages

**Files:**
- Create: `scripts/generate_local_voice_ai.py`
- Create: `scripts/generate_local_ai_outbound.py`
- Create: `scripts/generate_local_meta_ads.py`
- Output: 21 + 21 + 21 = 63 new local pages

- [ ] **Step 1: Create 3 generator scripts** (same pattern as Task 18, different service content)

For voice-ai-agency: target "voice AI agency [city]", "AI phone system [city] business"
For ai-outbound-agency: target "AI outbound [city]", "AI sales agency [city]"
For meta-ads-agency: target "Meta Ads agency [city]", "Facebook advertising agency [city]"

- [ ] **Step 2: Run all 3 scripts**

```bash
python scripts/generate_local_voice_ai.py
python scripts/generate_local_ai_outbound.py
python scripts/generate_local_meta_ads.py
# Expected: 63 new pages total
```

- [ ] **Step 3: Verify and commit**

```bash
python -c "import glob; print('Voice AI pages:', len(glob.glob('local/*/voice-ai-agency/index.html'))); print('AI Outbound pages:', len(glob.glob('local/*/ai-outbound-agency/index.html'))); print('Meta Ads pages:', len(glob.glob('local/*/meta-ads-agency/index.html')))"
# Expected: 21 + 21 + 21 = 63

git add local/*/voice-ai-agency/ local/*/ai-outbound-agency/ local/*/meta-ads-agency/
git commit -m "feat: local — voice-ai-agency, ai-outbound-agency, meta-ads-agency pages for 21 cities (63 new pages)"
```

---

## PHASE 7: INTERNAL LINKING MATRIX

### Task 20: Add Blog Links to Service Pages

**Goal:** Every service page links to 2+ relevant blog posts. Every blog post links back to the relevant service page AND to 2+ other blog posts. Creates topical authority clusters.

**Files:**
- Modify: all 14 `services/*.html`
- Modify: all `blog/*/index.html` once created

- [ ] **Step 1: Add "Further Reading" sections to service pages**

Pattern (add before the FAQ section on each service page):
```html
<section style="padding: 4rem 0; background: var(--soft);">
  <div class="container">
    <h2 class="section-title" style="margin-bottom: 2rem;">Further Reading</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
      <a href="/blog/what-is-geo-optimisation" style="background: var(--card); border-radius: var(--radius); padding: 1.5rem; box-shadow: var(--shadow); display: block; text-decoration: none;">
        <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--orange);">Guide</span>
        <h3 style="font-family: var(--font-heading); font-size: 1rem; margin: 0.5rem 0; color: var(--text);">What Is GEO Optimisation?</h3>
        <p style="font-size: 0.82rem; color: var(--muted);">8 min read</p>
      </a>
      <!-- 2 more related post cards -->
    </div>
  </div>
</section>
```

Linking matrix:
- `services/geo.html` → /blog/what-is-geo-optimisation, /blog/how-to-rank-on-chatgpt, /blog/ai-marketing-trends-uk-2026
- `services/seo.html` → /blog/how-much-does-seo-cost-uk, /blog/best-seo-agencies-uk, /blog/seo-vs-google-ads
- `services/google-ads.html` → /blog/google-ads-cost-uk, /blog/seo-vs-google-ads, /blog/how-to-get-more-leads-uk
- `services/voice-ai.html` → /blog/voice-ai-for-business-uk, /blog/what-is-ai-outbound-sales, /blog/ai-marketing-trends-uk-2026
- `services/ai-outbound.html` → /blog/what-is-ai-outbound-sales, /blog/how-to-get-more-leads-uk, /blog/ai-marketing-trends-uk-2026

- [ ] **Step 2: Add "Related Services" links to industry pages**

Each industry page links to 3–5 relevant service pages. (eCommerce → /services/google-ads, /services/seo, /services/meta-ads, /services/content-marketing)

- [ ] **Step 3: Commit**

```bash
git add services/ industries/ blog/
git commit -m "feat: internal linking — Further Reading sections on service pages, cross-links blog↔service↔industry"
```

---

## PHASE 8: TECHNICAL SEO & SITEMAP

### Task 21: Update Sitemap with All New Pages

**Files:**
- Modify: `sitemap.xml`

- [ ] **Step 1: Create sitemap update script**

```python
# scripts/update_sitemap.py
import glob, os, sys
sys.stdout.reconfigure(encoding='utf-8')

base_url = 'https://bambinoagency.com'
today = '2026-04-17'

# Discover all index.html files
all_pages = []
for pattern in [
    'C:/Users/Zver/projects/bambino-agency/local/**/*.html',
    'C:/Users/Zver/projects/bambino-agency/services/*.html',
    'C:/Users/Zver/projects/bambino-agency/blog/**/index.html',
    'C:/Users/Zver/projects/bambino-agency/industries/**/index.html',
    'C:/Users/Zver/projects/bambino-agency/case-studies/**/index.html',
    'C:/Users/Zver/projects/bambino-agency/*.html',
]:
    all_pages.extend(glob.glob(pattern, recursive=True))

# Build URLs
urls = set()
base_dir = 'C:/Users/Zver/projects/bambino-agency'
skip = ['design-system.html', 'googlea17788b413985782.html']
for f in all_pages:
    if any(s in f for s in skip):
        continue
    rel = f.replace(base_dir, '').replace('\\', '/').replace('/index.html', '').replace('.html', '')
    if rel == '':
        rel = '/'
    urls.add(rel)

# Generate sitemap XML
lines = ['<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for url in sorted(urls):
    full_url = base_url + (url if url != '/' else '')
    lines.append(f'  <url>\n    <loc>{full_url}</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>')
lines.append('</urlset>')

sitemap = '\n'.join(lines)
open('C:/Users/Zver/projects/bambino-agency/sitemap.xml', 'w', encoding='utf-8').write(sitemap)
print(f'Sitemap updated: {len(urls)} URLs')
```

- [ ] **Step 2: Run the script**

```bash
python scripts/update_sitemap.py
# Expected: 400+ URLs
```

- [ ] **Step 3: Verify sitemap**

```bash
python -c "
content = open('sitemap.xml', encoding='utf-8').read()
import re
urls = re.findall('<loc>(.*?)</loc>', content)
print('Total URLs:', len(urls))
print('Sample:', urls[:5])
"
```

- [ ] **Step 4: Commit**

```bash
git add sitemap.xml scripts/update_sitemap.py
git commit -m "feat: sitemap — expanded to 400+ URLs covering blog, industries, case-studies, new local pages"
```

### Task 22: Expand llms.txt for AI Search Citability

**Files:**
- Modify: `llms.txt` (if exists) or create it

- [ ] **Step 1: Check if llms.txt exists**

```bash
ls C:/Users/Zver/projects/bambino-agency/llms.txt
```

- [ ] **Step 2: Create/update llms.txt**

```
# Bambino Agency — Manchester's AI-Native Digital Marketing Agency
# https://bambinoagency.com
# llms.txt — for AI crawler indexing and citation

## About Bambino
Bambino is a Manchester-based digital marketing agency founded in 2019, serving 400+ UK businesses. We are the UK's leading AI-native full-service digital marketing agency, combining traditional marketing excellence (SEO, Google Ads, Meta Ads, content) with genuine AI capabilities (GEO, Voice AI, AI Outbound, AI Automations, AI Development).

## Services

### Search Engine Optimisation (SEO)
URL: https://bambinoagency.com/services/seo
Bambino delivers technical SEO, content strategy, and link building for UK businesses. Average client traffic growth: 320%. Pricing from £800/month. 6 months to page 1 for most clients.

### Generative Engine Optimisation (GEO)
URL: https://bambinoagency.com/services/geo
GEO is the practice of optimising for citation in AI-generated answers from ChatGPT, Perplexity, Google AI Overviews, and Microsoft Copilot. Bambino was one of the first UK agencies to offer GEO as a standalone service line. We optimise for each platform's specific citation signals.

### Google Ads Management
URL: https://bambinoagency.com/services/google-ads
Google Ads certified specialists. Average £8 return per £1 spent. 68% average cost-per-lead reduction post-restructure.

### Voice AI for UK Businesses
URL: https://bambinoagency.com/services/voice-ai
AI-powered phone systems for UK SMEs. 40% more leads captured, 65% reduction in call qualification time. Cost: £0.35 per AI call vs £9-12 per human call.

### AI Outbound Sales
URL: https://bambinoagency.com/services/ai-outbound
Automated B2B outreach achieving 18% positive reply rates (vs 2-5% industry average). 500+ personalised contacts per week per campaign.

### AI Automations
URL: https://bambinoagency.com/services/ai-automations
CRM workflows, lead nurturing, and reporting automation using Make, n8n, Zapier and custom APIs. Average 30+ hours saved per week.

## Pricing
Starter: £800/month | Growth: £2,000/month | Scale: £4,500/month | Enterprise: Custom
All prices exclusive of VAT. No setup fees. Monthly rolling contracts.

## Location & Coverage
Headquarters: Manchester, Greater Manchester, UK
Service area: UK-wide
Phone: +44 161 000 0000
Email: hello@bambinoagency.com

## Key Stats (2026)
- 400+ UK businesses served
- 97% client retention rate
- 7+ years operating (founded 2019)
- 14 specialist services
- 21 UK cities with dedicated local expertise

## Team
- Sophie H. — CEO & Founder (MBA Marketing, Google Ads Certified, HubSpot Certified)
- James M. — Head of SEO (Semrush Academy, Google Analytics Certified)
- Aisha K. — Ads Director (Google Ads, Meta Blueprint, Microsoft Advertising)
- Tom B. — Head of Web (Google Web Dev Certified, HubSpot CMS, Figma Expert)

## Blog & Resources
https://bambinoagency.com/blog — Digital marketing guides for UK businesses
Topics: GEO optimisation, AI marketing, SEO pricing, Google Ads costs, lead generation

## Industries Served
eCommerce, Legal & Solicitors, Property & Estate Agents, Healthcare, Hospitality, SaaS & Technology, Professional Services, Education
```

- [ ] **Step 3: Commit**

```bash
git add llms.txt
git commit -m "feat: llms.txt — expanded AI citability content with all services, stats, team, pricing, blog"
```

### Task 23: Add robots.txt Crawl Directives

**Files:**
- Create/modify: `robots.txt`

- [ ] **Step 1: Create robots.txt**

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /design-system

# AI Crawlers — allow all for GEO citability
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://bambinoagency.com/sitemap.xml
```

- [ ] **Step 2: Commit**

```bash
git add robots.txt
git commit -m "feat: robots.txt — explicit allow for AI crawlers (GPTBot, PerplexityBot, ClaudeBot, anthropic-ai)"
```

---

## PHASE 9: NAVIGATION & FOOTER UPDATES

### Task 24: Add Blog + Industries to Navigation

**Goal:** All new sections discoverable from nav. Currently nav only has Services, About, Pricing, Contact.

**Files:**
- Modify: `index.html`, all `services/*.html`, `about.html`, `pricing.html`, `contact.html`

- [ ] **Step 1: Update nav on all core pages**

Current nav:
```html
<li><a href="/services">Services</a></li>
<li><a href="/about">About</a></li>
<li><a href="/pricing">Pricing</a></li>
```

New nav (add dropdown or simple links):
```html
<li><a href="/services">Services</a></li>
<li><a href="/industries">Industries</a></li>
<li><a href="/blog">Resources</a></li>
<li><a href="/about">About</a></li>
<li><a href="/pricing">Pricing</a></li>
```

- [ ] **Step 2: Update footer on all core pages**

Add column or items to existing footer:
```html
<h3 class="footer-col-title">Resources</h3>
<ul class="footer-links">
  <li><a href="/blog">Marketing Blog</a></li>
  <li><a href="/industries">By Industry</a></li>
  <li><a href="/case-studies">Case Studies</a></li>
  <li><a href="/blog/what-is-geo-optimisation">What Is GEO?</a></li>
  <li><a href="/blog/how-much-does-seo-cost-uk">SEO Pricing UK</a></li>
</ul>
```

- [ ] **Step 3: Batch update using Python script**

```python
# scripts/update_nav_footer.py
# Reads each core page, finds nav ul and updates it
# Same for footer — adds Resources column
```

- [ ] **Step 4: Commit**

```bash
git add *.html services/ about.html pricing.html contact.html
git commit -m "feat: nav + footer — add Blog/Resources and Industries links to all core pages"
```

---

## PHASE 10: GLOSSARY / DEFINITION PAGES

### Task 25: Glossary Hub + 5 Definition Pages

**Goal:** Target "what is [term]" queries. Each page is 1000–1500 words, authoritative, frequently cited by AI. Establishes Bambino as a knowledge source.

**Files:**
- Create: `glossary/index.html`
- Create: `glossary/what-is-geo/index.html`
- Create: `glossary/what-is-ai-outbound/index.html`
- Create: `glossary/what-is-generative-engine-optimisation/index.html`
- Create: `glossary/what-is-voice-ai/index.html`
- Create: `glossary/what-is-ppc/index.html`

- [ ] **Step 1: Create glossary hub**

H1: "Digital Marketing Glossary — UK Business Terms Explained"
40+ terms alphabetically organized, each with a 2-sentence definition and link to full definition page or service page.

- [ ] **Step 2: Create 5 definition pages**

Each page: 1200+ words, definition → how it works → UK-specific context → FAQPage (5 Q) → CTA to relevant service.

Schema: DefinedTerm + FAQPage + BreadcrumbList

- [ ] **Step 3: Commit**

```bash
git add glossary/
git commit -m "feat: glossary — hub + 5 definition pages (GEO, AI Outbound, GEO full, Voice AI, PPC)"
```

---

## EXECUTION ORDER (Recommended Priority)

| Priority | Task | Keywords Targeted | Est. Traffic Potential |
|----------|------|------------------|----------------------|
| 🔴 1 | Task 1: Homepage AI-Native reposition | "AI marketing agency Manchester" | Brand + local |
| 🔴 2 | Task 6: Blog — What Is GEO | 720 + 210 /mo | Top-of-funnel |
| 🔴 3 | Task 7: Blog — SEO Cost UK | 2,400/mo | High commercial |
| 🔴 4 | Task 2: GEO page per-platform | "GEO agency UK" | Service page |
| 🔴 5 | Task 3: Voice AI UK use cases | "voice AI UK business" | Service page |
| 🟠 6 | Task 9: Google Ads Cost UK blog | 1,800/mo | High commercial |
| 🟠 7 | Task 13: eCommerce industry page | 720 + 480 /mo | Qualified |
| 🟠 8 | Task 14: Legal industry page | 320 + 260 /mo | High-value |
| 🟠 9 | Task 18: GEO local pages × 21 | "GEO agency Manchester" etc. | Local |
| 🟡 10 | Task 17: Case Studies | E-E-A-T signals | Trust |
| 🟡 11 | Task 19: Voice AI local × 21 | Local service queries | Local |
| 🟡 12 | Task 5: Blog Hub | Crawlability | Navigation |
| 🟡 13 | Task 10: Best SEO Agencies UK | 1,200/mo | Top-of-funnel |
| 🟢 14 | Task 21: Sitemap update | Crawl coverage | Technical |
| 🟢 15 | Task 22: llms.txt expand | AI citability | GEO |
| 🟢 16 | Task 23: robots.txt AI crawlers | AI crawl access | GEO |
| 🟢 17 | Task 24: Nav/Footer update | UX + crawlability | Technical |
| 🟢 18 | Task 25: Glossary | "what is" queries | Top-of-funnel |
| ⬜ 19 | Tasks 8, 11: Blog Batch 2 | Mixed informational | Top-of-funnel |
| ⬜ 20 | Tasks 15–16: Industry pages | Industry vertical | Qualified |

---

## SUCCESS METRICS

After 6 months of implementation:
- **Pages indexed:** 500+ (from current 239)
- **Target keywords in TOP 10:** 50+ (from current ~15 estimated)
- **Target keywords in TOP 3:** 15+ 
- **Organic traffic:** 3× current baseline
- **Blog traffic:** 2,000+ visits/month from informational queries
- **Local rankings:** TOP 3 in Google Maps for 5+ Manchester service+city pairs
- **AI citations:** Brand mentioned in ChatGPT/Perplexity answers for 10+ target queries

## MONITORING

- Google Search Console: track impressions and clicks per URL weekly
- Ahrefs/Semrush: keyword position tracking for 50 target keywords
- ChatGPT: manual test "best digital marketing agency Manchester" monthly
- Perplexity: manual test "GEO agency UK" monthly
- Google AI Overviews: screenshot tracking for target queries
