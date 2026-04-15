# FULL SEO AUDIT — Bambino Agency
**URL:** https://bambinoagency.com  
**Дата аудиту:** 2026-04-15  
**Тип бізнесу:** Digital Marketing Agency (B2B, UK-wide, Manchester-based)  
**Структура сайту:** Static HTML на Vercel  
**Сторінок:** ~235 (7 core + 14 service + 1 pricing + 215 local pages)

---

## ПІДСУМОК — SEO HEALTH SCORE

| Категорія | Вага | Оцінка | Бали |
|-----------|------|--------|------|
| Technical SEO | 22% | 52/100 | 11.4 |
| Content Quality | 23% | 58/100 | 13.3 |
| On-Page SEO | 20% | 65/100 | 13.0 |
| Schema / Structured Data | 10% | 45/100 | 4.5 |
| Performance (CWV) | 10% | 50/100 | 5.0 |
| AI Search Readiness | 10% | 70/100 | 7.0 |
| Images | 5% | 5/100 | 0.25 |

### **Загальний SEO Health Score: 54/100 — Needs Improvement**

---

## ТОП-5 КРИТИЧНИХ ПРОБЛЕМ

1. **Немає жодного зображення на сайті** — `og:image` і `logo.png` вказують на неіснуючі файли → соцшеринг і schema зламані
2. **Канадський телефон у schema всіх local сторінок** — `(647) 370-1888` (Toronto prefix) на UK агенції
3. **`.html` розширення в BreadcrumbList schema** — Vercel має `cleanUrls: true`, реальні URL без `.html`, schema некоректна
4. **Inline CSS на кожній сторінці** — немає shared CSS файлу, ~50KB дублюється на кожній з 235 сторінок
5. **Meta descriptions обрізані з `...`** — локальні сторінки мають descriptions > 160 символів що обрізані шаблоном

## ТОП-5 ШВИДКИХ ПЕРЕМОГ

1. Додати `og:image` та `logo.png` файли → фікс за 1 годину
2. Виправити телефон у schema → масова заміна у всіх HTML файлах
3. Виправити BreadcrumbList URLs (прибрати `.html`) → find & replace
4. Виправити title case: "Seo Agency" → "SEO Agency" на всіх local pages
5. Заповнити `GeoCoordinates` у LocalBusiness schema

---

## 1. ТЕХНІЧНИЙ SEO (Оцінка: 52/100)

### 1.1 Crawlability & Indexability ✅ Частково

**Robots.txt:** Структура коректна — Allow для published local pages стоїть перед загальним `Disallow: /local/`. AI боти (GPTBot, ClaudeBot, Google-Extended, PerplexityBot) відкриті — добре.

**Sitemap.xml:** Є, підключений у robots.txt. Містить 235 URL. Дати `lastmod: 2026-03-25` однакові для всіх сторінок — неправдоподібно, Google може ігнорувати.

**Canonical tags:** Присутні на всіх сторінках, self-referencing, без `.html` розширення — коректно.

**CleanUrls:** `vercel.json` має `cleanUrls: true`, `trailingSlash: false` — правильно.

**⚠ Проблема:** `Disallow: /local/` може конфліктувати з непублікованими але зліндексованими сторінками якщо вони потраплять у sitemap.

### 1.2 URL Structure ✅

- Всі URLs lowercase, hyphenated, без trailing slash — відповідає best practice
- Структура: `/local/{city}/{service}` — логічна і SEO-friendly
- Глибина: 3 рівні для local pages — ОК

### 1.3 HTTPS & Security ❓

- Vercel автоматично підтримує HTTPS — припускаємо ОК
- Security headers не перевірялись (потрібен live тест)
- Google Verification файл: `googlea17788b413985782.html` — GSC підключений ✅

### 1.4 Performance ❌

**Критична проблема: Inline CSS**
- Кожна сторінка містить `<style>` блок ~40-50KB CSS
- Жодного зовнішнього CSS файлу немає
- Жодного зовнішнього JS файлу немає
- Наслідки:
  - Немає browser caching між сторінками
  - HTML документи надто великі (~60-80KB на сторінку)
  - При переході між сторінками CSS парситься заново
  
**Google Fonts:**
- `preconnect` до googleapis/gstatic є ✅
- Але завантажується синхронно (render-blocking) — потрібен `display=swap` + preload

**Зображення:**
- Немає жодного зображення на сайті (ні PNG, ні WebP, ні JPG, ні SVG)
- `og:image` вказує на `/img/og-default.jpg` — файл відсутній → 404
- Schema `logo: bambinoagency.com/logo.png` — файл відсутній → 404

### 1.5 Mobile ❓

- `viewport` meta tag присутній на всіх сторінках ✅
- `lang="en-GB"` коректний ✅
- Mobile CSS визначений inline через media queries — не перевірявся live

---

## 2. CONTENT QUALITY (Оцінка: 58/100)

### 2.1 Homepage — bambinoagency.com ⚠️

**Сильні сторони:**
- Конкретні цифри: "320% average traffic growth", "9.1× ROAS", "400+ clients", "97% retention"
- Manchester + UK focus — географічна релевантність
- FAQPage schema з реальними питаннями
- Структура: Hero → Services → Process → Stats → CTA — логічна

**Слабкі сторони:**
- Немає авторського контенту / підписів команди → E-E-A-T слабкий
- Немає case studies або клієнтських відгуків з іменами
- Немає blog / контент-хабу → нульова topical authority
- Відсутні реальні докази: screenshots GSC, before/after звіти
- "400+ clients" — жодного названо по імені

### 2.2 Service Pages (14 сторінок) ⚠️

**Структура:** Hero + Process + Stats + Pricing teaser + FAQ + CTA — хороша
**Обсяг контенту:** ~800-1200 слів — відповідає мінімуму
**Проблеми:**
- Шаблонна структура, мало диференціації між сервісами
- Немає author attribution
- Немає internal linking до blog або related services
- FAQ якісний, але однаковий тон для всіх сервісів

### 2.3 Local Pages (215 сторінок) ❌

**Виявлені проблеми:**
- Meta description обрізана з `...` — шаблон не дотримується 160 символів
- Title case помилка: "Top-Rated Seo Agency" (Seo замість SEO)
- Дата `datePublished: 2025-12-01` і `dateModified: 2025-12-01` — ніколи не оновлювались
- Контент шаблонний — низька унікальність між містами
- FAQ якісний але однаковий по суті для всіх міст (тільки назва міста змінена)

**Позитив:**
- Кожне місто має окремі BreadcrumbList, LocalBusiness schema
- aggregateRating присутній (4.9, 127 відгуків) — але однаковий для всіх міст (не унікальний)
- Canonical URLs коректні

### 2.4 About Page ⚠️

- Є, ~600 слів — відповідає мінімуму
- Потрібно: фото команди, імена, linkedin профілі → E-E-A-T
- Потрібно: founding story, certifications, awards

### 2.5 Blog ❌

**Блог відсутній** — критично для:
- Topical authority
- Long-tail keyword capture
- Internal linking hub
- E-E-A-T (authorship signals)
- GEO citability

---

## 3. ON-PAGE SEO (Оцінка: 65/100)

### 3.1 Title Tags

| Сторінка | Title | Оцінка |
|---------|-------|--------|
| Homepage | "Bambino \| Manchester's Leading Digital Marketing Agency" | ✅ 55 chars |
| About | "About Bambino \| Manchester Digital Marketing Agency" | ✅ 52 chars |
| Services | "Digital Marketing Services UK \| Bambino Agency" | ✅ 48 chars |
| SEO service | "SEO Services UK — Search Engine Optimisation \| Bambino" | ✅ 56 chars |
| Local (MAN SEO) | "Top-Rated Seo Agency Services in Manchester \| Bambino" | ⚠️ "Seo" помилка |

**Проблема:** На local pages "Seo Agency", "Content Marketing Agency" etc — без правильного capitalisation

### 3.2 Meta Descriptions

- Core pages: добрі, з CTA, < 160 символів ✅
- Local pages: обрізані з `...` — шаблон генерує > 160 символів ❌

### 3.3 Open Graph

- og:title, og:description, og:url, og:type, og:locale — присутні ✅
- og:image: вказує на `/img/og-default.jpg` — файл відсутній ❌
- og:image відсутній на core pages (homepage, services тощо) ❌
- twitter:image: відсутній на всіх сторінках ❌

### 3.4 Heading Structure

- H1 присутній на всіх перевірених сторінках ✅
- Ієрархія H1→H2→H3 дотримується ✅

### 3.5 Internal Linking ❌

- Немає cross-linking між service pages і local pages
- Немає внутрішніх посилань на blog (бо його немає)
- Немає посилань до related services
- Footer має links до основних сторінок — базовий рівень

---

## 4. SCHEMA / STRUCTURED DATA (Оцінка: 45/100)

### 4.1 Homepage Schema ⚠️

```json
@graph: [Organization, WebSite, FAQPage, BreadcrumbList]
```
- Organization: logo URL → 404 ❌
- WebSite: sitelinks searchbox → ✅
- FAQPage: 5 питань → ✅
- BreadcrumbList: коректний ✅

### 4.2 Service Pages Schema ❌

```json
@graph: [LocalBusiness+MarketingAgency, Service, FAQPage, BreadcrumbList]
```
- BreadcrumbList URLs містять `.html` (напр. `services.html`) — НЕКОРЕКТНО (cleanUrls: true) ❌
- Service schema — ОК
- datePublished присутній ✅

### 4.3 Local Pages Schema ❌

```json
[LocalBusiness+MarketingAgency, FAQPage, BreadcrumbList]
```
- **telephone: "(647) 370-1888"** — КАНАДСЬКИЙ номер на UK агенції ❌ КРИТИЧНО
- **GeoCoordinates порожні**: `{"@type": "GeoCoordinates"}` — без lat/lng ❌
- **logo відсутній** у LocalBusiness schema
- **aggregateRating однакова** для всіх міст (4.9, 127) — неавтентично
- datePublished: "2025-12-01", dateModified: "2025-12-01" — ніколи не оновлювались ❌
- url в LocalBusiness вказує на local page, не на головний домен — спірно
- BreadcrumbList: `/local/` item з trailing slash — мінорна проблема

---

## 5. PERFORMANCE / CWV (Оцінка: 50/100)

**Розрахункові показники (без live measurement):**

| Метрика | Очікуваний стан | Ризик |
|---------|----------------|-------|
| LCP | Ймовірно > 3s (Google Fonts blocking) | Середній |
| INP | Прийнятний (мінімум JS) | Низький |
| CLS | Ймовірно > 0.1 (Fonts без size-adjust) | Середній |
| TTFB | Vercel Edge → ймовірно < 400ms | Низький |

**Render-blocking ресурси:**
- Google Fonts завантажується без `font-display: swap` → FOUT ризик
- Inline CSS не є render-blocking (на відміну від external) — позитив

**Оптимізація:**
- Немає WebP/AVIF зображень (зображень взагалі немає)
- Немає lazy loading (нема зображень)
- Немає зовнішнього JS файлу → менше запитів

---

## 6. AI SEARCH READINESS (Оцінка: 70/100)

**Сильні сторони:**
- `llms.txt` присутній ✅ — добрий сигнал для AI crawlers
- robots.txt відкриває GPTBot, ClaudeBot, Google-Extended, PerplexityBot ✅
- Структуровані дані (FAQPage) допомагають AI ✅
- Конкретні статистики (320% growth, 9.1× ROAS) — цитабельний контент ✅

**Слабкі сторони:**
- Немає blog/article контенту — AI не може цитувати thought leadership
- Немає author pages з іменами та expertise
- Немає `@type: Article` або `@type: HowTo` schema
- llms.txt базовий — без деталей про expertise areas

---

## 7. IMAGES (Оцінка: 5/100)

**Критично:**
- **Нуль зображень** на всьому сайті
- `og:image: /img/og-default.jpg` — файл відсутній → всі соц мережі покажуть blank
- `logo.png` в schema → відсутній → Google може не показувати logo в Knowledge Panel
- Відсутні: hero images, team photos, case study screenshots, service illustrations
- Немає SVG іконок у власних файлах (інлайн SVG у HTML — прийнятно)

---

## 8. E-E-A-T АНАЛІЗ

| Фактор | Стан | Деталі |
|--------|------|--------|
| Experience | ❌ | Жодних case studies, before/after, реальних результатів |
| Expertise | ⚠️ | Немає author bios, certifications, team profiles |
| Authoritativeness | ❌ | Немає згадок у медіа, awards, партнерств |
| Trustworthiness | ⚠️ | Контакти є, але телефон канадський, адреса неповна |

**Висновок:** E-E-A-T незадовільний для конкурентної digital marketing ніші.

---

## 9. КОНКУРЕНТНА ПОЗИЦІЯ

**Ніша:** Digital marketing agency UK — висококонкурентна  
**Тип контенту:** Pure service/location pages без editorial content  
**Порівняно з топ UK агенціями:** Missing blog, case studies, awards, press mentions, team pages  
**Локальне SEO потенціал:** 215 local pages — гарний масштаб, але якість виконання потребує покращення

---

## ВИСНОВКИ

Сайт має правильну структуру та хороший старт у local SEO (215 сторінок), але страждає від:
1. Відсутності будь-яких медіафайлів (зображення — 0)
2. Шаблонного контенту з технічними помилками (телефон, schema URLs)
3. Відсутності E-E-A-T сигналів
4. Inline CSS архітектури що шкодить performance
5. Відсутності блогу для topical authority

**Пріоритет:** Спочатку виправити технічні помилки, потім E-E-A-T, потім контент-стратегія.
