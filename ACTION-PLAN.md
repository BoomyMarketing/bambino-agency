# ACTION PLAN — Bambino Agency SEO
**Дата:** 2026-04-15  
**Базується на:** FULL-AUDIT-REPORT.md  
**Принцип:** Critical спочатку → Quick Wins → Стратегічні задачі

---

## CRITICAL — Виправити негайно (0-3 дні)

### C1. Виправити канадський телефон у schema ❌ CRITICAL
**Проблема:** `"telephone": "(647) 370-1888"` — Toronto prefix на UK сайті  
**Дія:** Масова заміна у всіх 215+ local HTML файлах  
**Команда:** `find . -name "*.html" -exec sed -i 's/(647) 370-1888/+44 ПРАВИЛЬНИЙ НОМЕР/g' {} +`  
**Вплив:** Credibility, LocalBusiness schema валідність  
**Складність:** Низька (batch find & replace)

### C2. Створити og:image та logo
**Проблема:** `/img/og-default.jpg` та `/logo.png` відсутні → 404  
**Дія:**
1. Створити `/img/` папку
2. Додати `og-default.jpg` (1200×630px) — брендована OG картинка
3. Додати `logo.png` (400×120px) — лого для Knowledge Panel
**Вплив:** Соцмережі, schema validation, brand awareness  
**Складність:** Середня (потрібен дизайн)

### C3. Виправити BreadcrumbList URLs у service pages
**Проблема:** `https://bambinoagency.com/services.html` замість `https://bambinoagency.com/services`  
**Файли:** Всі файли у `/services/*.html`  
**Дія:** Find & replace `.html"` → `"` у schema JSON-LD блоках service pages  
**Складність:** Низька

### C4. Виправити GeoCoordinates у local pages
**Проблема:** `"geo": {"@type": "GeoCoordinates"}` — без lat/lng  
**Дія:** Додати координати для кожного міста у шаблон/генератор  
**Manchester:** `"latitude": 53.4808, "longitude": -2.2426`  
**London:** `"latitude": 51.5074, "longitude": -0.1278`  
*(і т.д. для всіх 21 міст)*  
**Складність:** Середня (потрібно оновити генератор або масово)

---

## HIGH — Цього тижня (3-7 днів)

### H1. Виправити meta descriptions на local pages
**Проблема:** Descriptions обрізані з `...` — більше 160 символів  
**Дія:** Оновити шаблон генератора — обмежити до 155 символів, прибрати `...`  
**Приклад фіксу:**
```
Було: "Looking for expert seo agency in Manchester? Bambino delivers proven results for businesses across United Kingdom. Transparent reporting. Get your free strategy s..."
Має бути: "Expert SEO agency in Manchester. Bambino delivers proven results for UK businesses. Transparent reporting & measurable ROI. Get your free audit."
```
**Складність:** Середня (регенерація локальних сторінок)

### H2. Виправити title case на local pages
**Проблема:** "Top-Rated Seo Agency" → має бути "Top-Rated SEO Agency"  
**Дія:** Виправити шаблон генератора: "Seo" → "SEO", "Ppc" → "PPC" etc  
**Складність:** Низька

### H3. Оновити dateModified у local pages schema
**Проблема:** `dateModified: "2025-12-01"` — не оновлювалось  
**Дія:** Масово оновити до актуальної дати, додати логіку автооновлення  
**Складність:** Низька

### H4. Додати twitter:image мета тег
**Проблема:** Відсутній на всіх сторінках  
**Дія:** Додати `<meta name="twitter:image" content="https://bambinoagency.com/img/og-default.jpg">` до всіх templates  
**Складність:** Низька

### H5. Виправити aggregateRating на local pages
**Проблема:** Однакові `ratingValue: 4.9, reviewCount: 127` для всіх міст — неавтентично  
**Дія:**
- Варіант A: Прибрати aggregateRating якщо немає реальних даних по місту
- Варіант B: Зробити загальну рейтинг картку (не прив'язану до міста)  
**Рекомендація:** Варіант A — прибрати фейкові рейтинги per city, залишити на головній  
**Складність:** Середня

---

## MEDIUM — Цього місяця (1-4 тижні)

### M1. Перенести CSS в зовнішній файл
**Проблема:** Inline `<style>` ~40-50KB на кожній з 235 сторінок  
**Дія:**
1. Створити `/assets/css/main.css` зі спільними стилями
2. Додати `<link rel="stylesheet" href="/assets/css/main.css">` до всіх сторінок
3. Залишити лише page-specific стилі inline (якщо є)
**Вплив:** Browser caching, загальна performance, maintainability  
**Складність:** Висока (потрібно зібрати спільні стилі з усіх файлів)

### M2. Оптимізувати завантаження Google Fonts
**Проблема:** Fonts завантажуються sync (render-blocking потенціал)  
**Дія:** Додати `font-display=swap` до Google Fonts URL + `<link rel="preload">`  
**Перевірити:** Чи є однакові fonts на всіх сторінках (Berkshire Swash + Inter vs Playfair Display + Inter)  
**Складність:** Низька

### M3. Уніфікувати шрифти між core pages і local pages
**Проблема:** Core pages = Berkshire Swash + Inter; Local pages = Playfair Display + Inter  
**Дія:** Вибрати один heading font і застосувати скрізь  
**Складність:** Середня

### M4. Покращити About page (E-E-A-T)
**Дія:**
- Додати фото та імена team members
- Додати LinkedIn профілі
- Додати certifications (Google Partner, Meta Blueprint etc)
- Додати founding story (коли, чому, хто)
- Додати press mentions або awards  
**Складність:** Середня (потрібен контент від клієнта)

### M5. Додати case studies секцію
**Дія:** Мінімум 3 детальних case studies з:
- Клієнт (можна анонімний за нішею)
- Проблема → Стратегія → Результат
- Конкретні цифри: traffic growth, ROAS, rankings
- Термін: до 6 місяців  
**Вплив:** E-E-A-T (Experience), конверсія, social proof  
**Складність:** Висока (потрібен контент)

### M6. Покращити internal linking
**Дія:**
- Додати "Related services" блок на кожній service page
- Додати посилання з local pages → відповідні service pages
- Додати breadcrumbs HTML (не тільки schema) на local pages  
**Складність:** Середня

### M7. Додати фавіконку
**Дія:** Створити `/favicon.ico` та `/apple-touch-icon.png` + мета теги  
**Складність:** Низька

---

## LOW — Стратегічні ініціативи (1-3 місяці)

### L1. Створити Blog / Knowledge Hub ⭐ НАЙВАЖЛИВІШЕ СТРАТЕГІЧНО
**Мета:** Topical authority, long-tail traffic, E-E-A-T, GEO citability  
**Структура:**
```
/blog/
  /blog/what-is-seo/
  /blog/how-to-improve-google-rankings/
  /blog/manchester-digital-marketing-guide/
  /blog/ppc-vs-seo-uk/
  /blog/ai-marketing-tools-2026/
  ...
```
**Мінімум:** 10-15 статей для початкового topical authority  
**Вимоги:** Author attribution, datePublished, Article schema  
**Складність:** Висока (довгострокова ініціатива)

### L2. Розширити llms.txt
**Поточний стан:** Базовий — сервіси, ціни, статистика  
**Додати:**
- Expertise areas з деталями
- Methodology descriptions
- Key differentiators
- Team expertise signals
- Link до case studies/blog  
**Складність:** Низька

### L3. Додати Review schema від реальних платформ
**Дія:** Інтегрувати відгуки з Google/Trustpilot з реальними `reviewCount`  
**Складність:** Середня

### L4. Розширити local pages якість
**Поточна проблема:** Шаблонний контент, низька унікальність  
**Дія для топ-10 міст (London, Manchester, Birmingham, Leeds, Bristol...):**
- Унікальний вступний параграф про місцевий ринок
- Локальні статистики
- Місцеві клієнти (якщо є дозвіл)
- Унікальний FAQ по місту  
**Складність:** Висока

### L5. Structured Data розширення
**Додати:**
- `Organization` → `knowsAbout` для service areas
- `Person` schema для team members (на About)
- `Article` schema для майбутнього блогу
- `VideoObject` якщо будуть відео  
**Складність:** Середня

### L6. Перевірити та оновити sitemap
**Дія:**
- Оновити `lastmod` до реальних дат змін
- Перевірити що всі local pages що published є у sitemap
- Видалити неопубліковані URL якщо є
**Складність:** Низька

---

## ПРІОРИТЕТНИЙ ROADMAP

```
Тиждень 1 (Critical):
  ✓ C1 — Виправити телефон
  ✓ C3 — BreadcrumbList URLs
  ✓ C4 — GeoCoordinates (топ 21 міст)
  ✓ H2 — Title case fix
  ✓ H3 — dateModified update
  ✓ H4 — twitter:image

Тиждень 2 (Images + High):
  ✓ C2 — Створити og:image + logo.png
  ✓ H1 — Meta descriptions fix
  ✓ H5 — aggregateRating fix
  ✓ M7 — Favicon

Місяць 1 (Medium):
  ✓ M2 — Google Fonts optimization
  ✓ M3 — Font unification
  ✓ M6 — Internal linking
  ✓ M4 — About page (E-E-A-T) — залежить від клієнта
  ✓ M5 — Case studies — залежить від клієнта

Місяць 2-3 (Strategic):
  ✓ M1 — External CSS file
  ✓ L1 — Blog (найважливіше!)
  ✓ L2 — llms.txt expansion
  ✓ L4 — Local pages quality upgrade (топ міста)
```

---

## KPI ДЛЯ ВІДСТЕЖЕННЯ

| Метрика | Зараз | Ціль 3 міс | Ціль 6 міс |
|---------|-------|-----------|-----------|
| SEO Health Score | 54/100 | 72/100 | 85/100 |
| Schema validation errors | 5+ critical | 0 | 0 |
| Local pages з коректним schema | ~0% | 100% | 100% |
| Blog posts | 0 | 10 | 30 |
| Organic traffic (GSC) | baseline | +30% | +100% |
| Indexed pages | TBD | Всі 235+ | 250+ |
