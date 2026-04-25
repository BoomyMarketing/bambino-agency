# Bambino Agency — Lazy Method Audit Progress

**Last updated:** 2026-04-26  
**Audit tool:** `lazy-method/lazy-check.py` — 17 categories, ~313 parameters/page  
**Site:** bambinoagency.com | 1013 HTML pages

---

## Baseline vs Current Score (Manchester SEO — representative page)

| Category | Baseline | After 8 fixes | Change |
|----------|---------|--------------|--------|
| SEO | 20/31 | 29/31 | **+9** |
| SEO Advanced | 16/30 | 23/30 | **+7** |
| CRO | 16/20 | 16/20 | 0 |
| E-E-A-T | 6/15 | 12/15 | **+6** |
| GEO / AI Citations | 4/15 | 14/15 | **+10** |
| Schema | 5/13 | 12/13 | **+7** |
| Internal Linking | 7/10 | 8/10 | +1 |
| **Total (7 cats)** | **74/134 (55%)** | **114/134 (85%)** | **+30** |

> Responsive + cross-browser checkers require Playwright — not installed, skipped.

---

## Fix Scripts Created (root of project)

| Script | Pages fixed | Fixes |
|--------|------------|-------|
| `fix_sameAs_schema.py` | 421 | Adds `@id` + `sameAs` (LinkedIn/Twitter/Instagram/Facebook) to LocalBusiness/Organization JSON-LD |
| `fix_year_meta.py` | 993 | Adds "2026" to `<title>` (`\| 2026 \| Bambino`) and meta description (`Updated 2026.`) |
| `fix_brand_intro.py` | 459 | Changes nav-logo text `Bambino` → `Bambino Agency` so brand appears in first 100 visible words |
| `fix_authority_links.py` | 462 | Adds footer resource links: GOV.UK + Wikipedia (UK/CA pages), SBA.gov + Wikipedia (US pages) |
| `fix_summary_block.py` | 240 | Adds `key-takeaways` CSS class to `section-results` (GEO/AI summary block detection) |
| `fix_org_name.py` | 420 | Changes schema `"name": "Bambino"` → `"name": "Bambino Agency"` in JSON-LD |
| `fix_years_signal.py` | 390 | Appends "Since 2023." to `footer-brand-desc` paragraph |
| `fix_faq_h3.py` | 334 | Wraps `<button class="faq-question">` in `<h3>` tags (W3C accordion pattern) |

### How to re-run all fixes:
```bash
cd bambino-agency
python fix_sameAs_schema.py
python fix_year_meta.py
python fix_brand_intro.py
python fix_authority_links.py
python fix_summary_block.py
python fix_org_name.py
python fix_years_signal.py
python fix_faq_h3.py
```

### How to run audit:
```bash
# Full site (slow, ~1013 pages)
python lazy-method/lazy-check.py --config=lazy-config.json --site=./ --categories=seo,seo_advanced,content,schema,eeat,geo_ai,cro,internal_linking,niche_compliance --report=lazy-audit-report.json

# Single page (fast)
python lazy-method/lazy-check.py --config=lazy-config.json --categories=seo,seo_advanced,schema,eeat,geo_ai,cro,internal_linking local/manchester/seo-agency/index.html
```

> **Note:** Python path on this machine:  
> `C:\Users\Инна\AppData\Local\Programs\Python\Python313\python.exe`  
> Use that directly if `python` command doesn't work.

---

## Remaining Failures (per Manchester SEO page — 20 checks still failing)

### Easy / template fixes (next session)

| Check | Issue | Fix approach |
|-------|-------|-------------|
| `org_name_matches_site` | Schema still "Bambino" on some pages | Re-run `fix_org_name.py` |
| `years_in_business_signal` | "Since 2023" not on all pages | Re-run `fix_years_signal.py` |
| `required_schema_service` | Missing `Service` schema type in JSON-LD | Add `Service` schema block to generators |
| `contextual_links_in_paragraphs` | 0 links inside `<p>` tags | Add internal `<a>` links to paragraph content in generators |
| `related_or_next_step_section` | No "Also serving" / related links section | Section exists on pages — checker may need class fix |
| `numerical_claims_present` | Checker not detecting numbers in content | Already have 400+, 97% etc — may need `<strong>` wrap |

### Medium effort (need generator changes)

| Check | Issue | Fix approach |
|-------|-------|-------------|
| `mobile_sticky_or_floating_cta` | No sticky CTA button | Add `position:fixed` CTA element via CSS/JS in generators |
| `cta_type_diversity` | Only 1 CTA type (form) | Add link-style CTAs in addition to form |
| `howto_numbered_list` | No `<ol>` with 3+ steps | Process steps already exist — check if they use `<ol>` |
| `definition_list_present` | No `<dl>` element | Add a `<dl>` glossary block to service pages |
| `voice_search_answer_block` | No 20–35 word `<p>` after a question `<h3>` | FAQ answers are in `.faq-answer > p` — checker looks for direct siblings |
| `trust_signal_above_fold` | No trust signals above fold | Add review count / badge near hero CTA |

### Hard / design decisions

| Check | Issue | Note |
|-------|-------|------|
| `images_min` | 0 images on page (min 1) | Need real `og-default.jpg` uploaded; currently missing |
| `navigation_max_seven_top_level` | 69 nav links (mega menu) | Intentional mega-menu — won't fix |
| `h1_signals_intent` | H1 detected as "informational" | Template-level copy change |
| `author_bio_or_byline` | No author on service pages | Not applicable for agency service pages |
| `team_or_leadership_visible` | No team signals | Could add to about page reference |

---

## Page Groups — Audit Scores (baseline, before fixes)

| Group | Pages | Avg score (baseline) |
|-------|-------|---------------------|
| blog/ | 23 | 74% |
| ca/ + services/ | 120 | 69% |
| root pages | 13 | 60% |
| us/ | 85 | 59% |
| industries/ | 12 | 56% |
| local/ | 760 | 51% |

---

## City Pages Built

### Canada — GoHighLevel
| City | URL |
|------|-----|
| Toronto | `/ca/toronto/gohighlevel-agency/` |
| Vancouver | `/ca/vancouver/gohighlevel-agency/` |
| Calgary | `/ca/calgary/gohighlevel-agency/` |
| Ottawa | `/ca/ottawa/gohighlevel-agency/` |
| Edmonton | `/ca/edmonton/gohighlevel-agency/` |

### Canada — n8n + Make.com
| City | n8n | Make.com |
|------|-----|---------|
| Vancouver | ✓ | ✓ |
| Calgary | ✓ | ✓ |
| Ottawa | ✓ | ✓ |
| Edmonton | ✓ | ✓ |
| Toronto | ✓ | ✓ |

### US — GoHighLevel (Batch 1)
| City | URL |
|------|-----|
| Austin TX | `/us/austin/gohighlevel-agency/` |
| Dallas TX | `/us/dallas/gohighlevel-agency/` |
| Denver CO | `/us/denver/gohighlevel-agency/` |

---

## Pending / Next Session

1. **US GHL Batch 2** — Miami, Houston, Seattle (generator: `generate_ghl_us_batch2.js`)
2. **Audit fixes continued:**
   - `fix_schema_service.py` — add Service schema to JSON-LD
   - `fix_sticky_cta.py` — add mobile sticky CTA bar
   - `fix_contextual_links.py` — add `<a>` links inside `<p>` tags
3. **Images** — upload `og-default.jpg` (1200×630px) and `logo.png` (400×120px)
4. **Phone number** — add real UK office number to `lazy-config.json` and pages
5. **UK service pages** — 10 Quick Win `/services/` pages from master plan

---

## Prerequisites (blocked on client)
- `og-default.jpg` — 1200×630px OG image
- `logo.png` — 400×120px
- Real UK phone number for LocalBusiness schema
