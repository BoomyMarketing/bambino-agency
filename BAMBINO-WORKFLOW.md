# BAMBINO-WORKFLOW — SEO Оптимізація Static HTML Agency Sites
**Версія:** 1.0 | **Дата:** 2026-04-15  
**Тип проєктів:** Static HTML сайти digital/marketing агенцій на Vercel/Netlify  
**Формат роботи:** Клієнт надає файл → Claude виконує

> Цей документ — операційний workflow для ведення SEO-оптимізації  
> static HTML сайтів клас "marketing agency" типу Bambino.  
> Адаптується до кожного проєкту, але базова послідовність незмінна.

---

## ЗМІСТ

1. [Старт проєкту — Клонування та структура](#1-старт-проєкту)
2. [Технічний аудит статичного сайту](#2-технічний-аудит)
3. [Schema Markup аудит та фікс](#3-schema-markup)
4. [On-Page SEO — Core Pages](#4-on-page-seo-core-pages)
5. [Local Pages — масова оптимізація](#5-local-pages)
6. [Service Pages — глибина контенту](#6-service-pages)
7. [Performance — CSS/JS оптимізація](#7-performance)
8. [E-E-A-T та Content Strategy](#8-e-e-a-t-та-content-strategy)
9. [GEO та AI Search](#9-geo-та-ai-search)
10. [Images та Media](#10-images-та-media)
11. [Deploy та верифікація](#11-deploy-та-верифікація)
12. [Чеклісти швидкого запуску](#12-чеклісти)

---

## 1. СТАРТ ПРОЄКТУ

### 1.1 Перший огляд (перші 15 хвилин)

```bash
# Клонувати репозиторій
git clone https://TOKEN@github.com/ORG/REPO.git /projects/PROJECT_NAME
cd /projects/PROJECT_NAME

# Огляд структури
ls -la
# Перевірити ключові файли
cat robots.txt
cat sitemap.xml | head -50
cat llms.txt 2>/dev/null || echo "no llms.txt"
cat vercel.json 2>/dev/null || cat netlify.toml 2>/dev/null
cat package.json 2>/dev/null

# Підрахувати сторінки
find . -name "*.html" | wc -l
find ./local -name "*.html" 2>/dev/null | wc -l
find ./services -name "*.html" 2>/dev/null | wc -l
```

### 1.2 Збір контексту про проєкт

Прочитати:
- `index.html` — головна сторінка (повністю)
- `about.html` — авторитет та E-E-A-T
- `services.html` або першу service page
- Один приклад local page
- SEO/workflow MD файли якщо є

### 1.3 Визначити тип бізнесу

| Тип | Ознаки | Пріоритет |
|-----|---------|-----------|
| Local Agency | Одне місто, local pages | Local SEO > Technical |
| National Agency | Багато міст, UK-wide | Technical > Content |
| B2B SaaS | SaaS pricing, integrations | Content > Local |
| eCommerce | Products, cart | Technical > Schema |

### 1.4 Скопіювати workflow файли

```
SEO-WORKFLOW-SYSTEM-2026.md → в корінь проєкту
SEO-CONTENT-WORKFLOW.md → в корінь проєкту
BAMBINO-WORKFLOW.md → в корінь проєкту
```

---

## 2. ТЕХНІЧНИЙ АУДИТ

### 2.1 Robots.txt чеклист

```
□ Синтаксис коректний
□ Sitemap посилання є
□ AI боти відкриті (GPTBot, ClaudeBot, Google-Extended, PerplexityBot)
□ Allow правила стоять ПЕРЕД Disallow для того самого User-agent
□ Disallow не блокує CSS/JS файли
□ Немає конфліктів Allow/Disallow для однакових шляхів
```

### 2.2 Sitemap.xml чеклист

```
□ Формат XML коректний
□ Всі published сторінки є
□ URL без .html розширення (якщо cleanUrls: true)
□ lastmod — реальні дати, не однакові для всього сайту
□ priority — логічна ієрархія (homepage 1.0, services 0.8, local 0.7)
□ changefreq відповідає реальному оновленню
```

### 2.3 Vercel/Netlify конфігурація

```
□ cleanUrls: true — URL без .html
□ trailingSlash: false — без trailing slash
□ redirects — немає конфліктів
□ headers — security headers налаштовані
```

### 2.4 HTML технічна перевірка (по кожному типу сторінок)

```bash
# Перевірити наявність og:image файлу
grep -r "og:image" ./index.html
# Перевірити наявність logo
grep -r "logo" ./index.html | grep "schema"
# Знайти .html у schema (баг)
grep -rn "\.html" ./services/ --include="*.html" | grep "schema\|ld+json"
# Знайти телефон у schema
grep -rn "telephone" ./local/ --include="*.html" | head -3
```

---

## 3. SCHEMA MARKUP

### 3.1 Типова помилка #1 — .html у BreadcrumbList

**Причина:** `cleanUrls: true` на Vercel/Netlify → `.html` автоматично прибирається  
**Симптом:** `"item": "https://domain.com/services.html"` замість `"item": "https://domain.com/services"`  
**Фікс:**
```bash
# Знайти файли з проблемою
grep -rl "\.html\"" ./services/ --include="*.html"
# Масовий фікс (обережно — тільки у schema блоках!)
# Редагувати вручну або через скрипт
```

### 3.2 Типова помилка #2 — Неправильний телефон

**Симптом:** Канадський/американський prefix у UK/AU/IE агенції  
**Перевірка:**
```bash
grep -rn "telephone" ./local/ --include="*.html" | head -5
```
**Фікс:** Масова заміна через правильний номер клієнта

### 3.3 Типова помилка #3 — Порожній GeoCoordinates

**Симптом:** `"geo": {"@type": "GeoCoordinates"}` без lat/lng  
**Координати для UK міст:**
```
Manchester: 53.4808, -2.2426
London: 51.5074, -0.1278
Birmingham: 52.4862, -1.8904
Leeds: 53.8008, -1.5491
Bristol: 51.4545, -2.5879
Edinburgh: 55.9533, -3.1883
Glasgow: 55.8642, -4.2518
Liverpool: 53.4084, -2.9916
Sheffield: 53.3811, -1.4701
Newcastle: 54.9783, -1.6178
```

### 3.4 Типова помилка #4 — Відсутній logo.png

**Симптом:** Schema посилається на `/logo.png` але файл відсутній  
**Перевірка:**
```bash
ls *.png *.jpg *.svg 2>/dev/null || echo "No images in root"
grep -rn "logo" ./index.html | grep "schema\|ld+json"
```

### 3.5 Schema по типах сторінок

**Homepage:**
```json
@graph: [Organization, WebSite (sitelinks), FAQPage, BreadcrumbList]
```

**Service Pages:**
```json
@graph: [LocalBusiness+MarketingAgency, Service (з price), FAQPage, BreadcrumbList]
```

**Local Pages:**
```json
[LocalBusiness+MarketingAgency (з GeoCoordinates), FAQPage, BreadcrumbList]
```

**About Page:**
```json
@graph: [Organization, Person[] (team), BreadcrumbList]
```

**Blog Posts:**
```json
@graph: [Article (з author Person), BreadcrumbList]
```

---

## 4. ON-PAGE SEO — CORE PAGES

### 4.1 Title Tags формула

| Тип | Формула | Приклад | Ліміт |
|-----|---------|---------|-------|
| Homepage | Brand \| City's [Type] Agency | Bambino \| Manchester's Digital Marketing Agency | 60 |
| Service | [Service] [Location] — [Benefit] \| Brand | SEO Services UK — Grow Organic Traffic \| Bambino | 60 |
| Location | [Service] in [City] \| Brand | SEO Agency in Manchester \| Bambino | 60 |
| About | About [Brand] \| [City] [Type] Agency | About Bambino \| Manchester Marketing Agency | 60 |

### 4.2 Meta Description формула

| Тип | Формула | Ліміт |
|-----|---------|-------|
| Homepage | [City] agency [services]. [Stat]. [CTA]. | 155 |
| Service | [Service] for UK businesses. [Benefit]. [Stat]. [CTA]. | 155 |
| Location | [Service] in [City]. [Benefit]. [Social proof]. [CTA]. | 155 |

**Важливо:** НЕ перевищувати 155 символів. НЕ залишати `...` обрізані тексти.

### 4.3 OG / Twitter Meta

Обов'язковий мінімум для кожної сторінки:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://domain.com/page" />
<meta property="og:image" content="https://domain.com/img/og-default.jpg" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_GB" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://domain.com/img/og-default.jpg" />
```

### 4.4 Title Case правила (EN)

```
SEO → SEO (не Seo)
PPC → PPC (не Ppc)
AI → AI (не Ai)
GBP → GBP (не Gbp)
UK → UK (не Uk)
```

---

## 5. LOCAL PAGES

### 5.1 Структура файлів

```
/local/
  {city}/
    {service}/
      index.html    ← Vercel cleanUrls → /local/{city}/{service}
```

### 5.2 Чеклист кожної local page

```
□ Title: "[Service] in [City] | Brand" — без lowercase помилок
□ Meta desc: < 155 символів, без "..."
□ Canonical: https://domain.com/local/{city}/{service} (без .html)
□ og:image: реальний файл
□ twitter:image: присутній
□ Schema LocalBusiness:
  □ telephone — правильний (UK: +44...)
  □ address — addressLocality = City
  □ GeoCoordinates — lat/lng заповнені
  □ aggregateRating — ТІЛЬКИ якщо реальні дані
  □ dateModified — актуальна дата
□ BreadcrumbList — без .html в URLs
□ FAQPage — мінімум 4-5 питань специфічних для міста
```

### 5.3 Якість контенту local pages

**Мінімум:** 500 слів, 40%+ унікальності від інших міст  
**Для топ-міст (London, Manchester, Birmingham):** 600+ слів, 60%+ унікальності

**Секції обов'язкові:**
1. Hero з H1: "[Service] in [City]"
2. Про місцевий ринок (2-3 речення унікальних)
3. Чому обрати нас у [City]
4. Process / How it works
5. Results / Stats
6. FAQ (мінімум 5 питань)
7. CTA

### 5.4 Масові операції з local pages

```bash
# Перевірити всі meta descriptions на довжину
grep -h "meta name=\"description\"" ./local/**/**/*.html | awk -F'"' '{print length($6), $6}' | sort -rn | head -20

# Знайти всі pages без twitter:image
grep -rL "twitter:image" ./local/ --include="*.html" | wc -l

# Перевірити telephone consistency
grep -h "telephone" ./local/**/**/*.html | sort | uniq -c | sort -rn

# Знайти pages з порожнім GeoCoordinates
grep -rl '"GeoCoordinates"}' ./local/ --include="*.html" | wc -l
```

---

## 6. SERVICE PAGES

### 6.1 Чеклист service page

```
□ Унікальний H1 (не дублює title)
□ Hero stat bar — конкретні цифри
□ Процес виконання сервісу (4-6 кроків)
□ Що включено (deliverables list)
□ Pricing teaser або посилання на pricing
□ FAQPage schema + HTML FAQ (≥ 5 питань)
□ CTA секція
□ Internal links → related services
□ Internal links → relevant local pages (топ міста)
□ Schema: Service з price, FAQPage, BreadcrumbList
□ BreadcrumbList без .html
□ datePublished у Schema
```

### 6.2 Мінімальний обсяг

| Сервіс | Мінімум слів | Пріоритет оновлення |
|--------|-------------|---------------------|
| SEO | 1000 | Високий |
| Google Ads | 900 | Високий |
| Meta Ads | 900 | Середній |
| Web Design | 800 | Середній |
| AI services | 800 | Низький (новий ринок) |

---

## 7. PERFORMANCE

### 7.1 CSS архітектура

**Проблема pattern:** Inline `<style>` в кожному HTML файлі  
**Правильний pattern:**
```html
<!-- Зовнішній CSS -->
<link rel="stylesheet" href="/assets/css/main.css" />
<!-- Page-specific inline тільки якщо є -->
```

**Перехід з inline на external:**
1. Зібрати спільний CSS з core pages → `/assets/css/main.css`
2. Зібрати CSS local pages → `/assets/css/local.css` (якщо відрізняється)
3. Замінити `<style>` на `<link>` у всіх файлах
4. Перевірити що нічого не зламалось (diff порівняння)

### 7.2 Google Fonts оптимізація

```html
<!-- Правильно: preconnect + display=swap -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
```

**Ніколи не завантажувати** більше ніж 2 шрифти / 4 варіанти ваги.

### 7.3 Images чеклист

```
□ Favicon: /favicon.ico + /apple-touch-icon.png
□ OG Image: /img/og-default.jpg (1200×630px, < 200KB)
□ Logo: /logo.png (прозорий фон, ≥ 200px wide)
□ Hero images: WebP формат, < 150KB
□ Team photos: WebP, 400×400px, < 80KB
□ loading="lazy" для below-fold images
□ width і height атрибути на всіх <img>
□ alt text на всіх зображеннях
```

---

## 8. E-E-A-T ТА CONTENT STRATEGY

### 8.1 Пріоритет E-E-A-T для agency сайтів

| Фактор | Що потрібно | Де реалізувати |
|--------|------------|----------------|
| Experience | Case studies з цифрами | /case-studies/ або homepage |
| Expertise | Team bios + credentials | /about + author pages |
| Authoritativeness | Press mentions, awards | /about + footer |
| Trustworthiness | Реальний телефон, адреса | Header + footer + schema |

### 8.2 About page мінімум

```
□ Фото команди (реальні, не stock)
□ Імена та ролі
□ LinkedIn профілі
□ Certifications (Google Partner, Meta Blueprint)
□ Роки роботи та founding story
□ Адреса офісу
□ Реальний телефон
□ Schema: Organization + Person[]
```

### 8.3 Blog стратегія для agency

**Структура топіків:**

```
Pillar pages (довгі, 2000+ слів):
  /blog/what-is-seo/
  /blog/digital-marketing-guide-uk/
  /blog/ppc-vs-seo/

Cluster pages (800-1200 слів):
  /blog/local-seo-tips/
  /blog/google-ads-mistakes/
  /blog/meta-ads-best-practices/

News/Updates:
  /blog/google-algorithm-update-2026/
  /blog/ai-search-marketing/
```

**Мінімум для старту:** 10 статей (3 pillar + 7 cluster)

---

## 9. GEO ТА AI SEARCH

### 9.1 llms.txt стандарт

```markdown
# [Brand Name]

> [One-line description]

[Brand] is a [type] based in [city], serving [geography].

## Services
- [Service 1]
- [Service 2]

## Expertise
- [Deep expertise area 1]
- [Deep expertise area 2]

## Stats
- [Key stat 1]
- [Key stat 2]

## Coverage
[Geographic coverage details]

## For AI Systems
[Statement about AI citability + what topics to cite for]
```

### 9.2 AI Crawler robots.txt

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: OAI-SearchBot
Allow: /
```

### 9.3 Контент для AI citability

**Форматування що AI люблять цитувати:**
- Конкретні статистики з джерелом
- Визначення термінів (What is X?)
- Step-by-step процеси
- Порівняльні таблиці
- FAQ у Q&A форматі
- Короткі абзаци (3-4 речення max)

---

## 10. IMAGES ТА MEDIA

### 10.1 Мінімальний image set для агенції

```
/img/
  og-default.jpg          ← 1200×630px, branded, < 200KB
  og-homepage.jpg         ← Унікальна для homepage (опційно)
  og-services.jpg         ← Для service pages (опційно)
/logo.png                 ← Лого для schema, 400×120px
/favicon.ico              ← 32×32px
/apple-touch-icon.png     ← 180×180px
```

### 10.2 Перевірка що файли існують

```bash
# Перевірити OG image
ls ./img/ 2>/dev/null || echo "No /img/ directory"
# Перевірити logo
ls *.png *.jpg *.svg 2>/dev/null
# Перевірити favicon
ls favicon.ico apple-touch-icon.png 2>/dev/null
```

---

## 11. DEPLOY ТА ВЕРИФІКАЦІЯ

### 11.1 Pre-deploy чеклист

```
□ robots.txt коректний
□ sitemap.xml актуальний
□ Canonical URLs без .html
□ Schema без .html в URLs
□ Телефон правильний
□ OG image файл існує
□ Logo файл існує
□ Favicon є
□ Немає порожніх GeoCoordinates
□ dateModified актуальна
```

### 11.2 Post-deploy перевірка

```bash
# Перевірити що clean URLs працюють
curl -I https://domain.com/services      # → 200
curl -I https://domain.com/services.html  # → 301 → /services

# Перевірити OG image
curl -I https://domain.com/img/og-default.jpg  # → 200

# Перевірити sitemap
curl https://domain.com/sitemap.xml | head -20
```

**Online tools після deploy:**
- Google Rich Results Test — перевірити schema
- Facebook Sharing Debugger — перевірити OG
- Twitter Card Validator — перевірити twitter meta
- PageSpeed Insights — перевірити CWV

---

## 12. ЧЕКЛІСТИ ШВИДКОГО ЗАПУСКУ

### 12.1 Новий проєкт (перший день)

```
□ Клонувати репозиторій
□ Прочитати ключові сторінки (index, about, service, local sample)
□ Перевірити robots.txt та sitemap.xml
□ Перевірити vercel.json/netlify.toml
□ Перевірити наявність image файлів
□ Перевірити телефон у schema
□ Перевірити .html у BreadcrumbList
□ Перевірити GeoCoordinates
□ Перевірити meta descriptions довжину
□ Написати FULL-AUDIT-REPORT.md
□ Написати ACTION-PLAN.md
```

### 12.2 Типові швидкі фікси (перший тиждень)

```
□ Масова заміна телефону
□ Масова заміна .html у schema
□ Додати twitter:image мета тег
□ Виправити dateModified
□ Виправити title case (SEO, PPC, AI)
□ Виправити meta desc обрізані
□ Заповнити GeoCoordinates
□ Додати favicon
□ Додати og:image та logo файли
```

### 12.3 Щомісячний maintenance

```
□ Оновити dateModified на змінених сторінках
□ Оновити sitemap lastmod
□ Перевірити нові broken links
□ Перевірити schema у Google Search Console
□ Перевірити coverage report у GSC
□ Опублікувати нову blog статтю (якщо є блог)
□ Перевірити Core Web Vitals у GSC
```

---

## ПРИМІТКИ ДО ПРОЦЕСУ

### Про формат роботи

**Клієнт надає файл → Claude виконує**

- Для масових замін: Claude пише bash скрипти або Python скрипти, клієнт запускає
- Для нових сторінок: Claude пише HTML, клієнт додає у репозиторій
- Для зображень: Claude описує вимоги, клієнт або дизайнер створює

### Про пріоритети

1. **Спочатку фіксити те що шкодить** (некоректний телефон, зламані schema URLs, 404 images)
2. **Потім те що швидко дає ефект** (meta, title, og:image)
3. **Потім стратегічне** (blog, E-E-A-T, внутрішній лінкінг)

### Про масові операції

Завжди:
1. Зробити `git commit` перед масовою операцією (checkpoint)
2. Перевірити на 1-2 файлах вручну перед масовим застосуванням
3. Після масової операції — перевірити декілька random файлів

### Про генератори

Якщо local pages генеруються скриптом:
- Виправляти ШАБЛОН/СКРИПТ, не окремі HTML файли
- Після правки шаблону — регенерувати всі сторінки
- Оновлювати sitemap після регенерації
