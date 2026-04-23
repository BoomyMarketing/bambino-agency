#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const about = fs.readFileSync(path.join(ROOT, 'about.html'), 'utf-8');

// Extract parts from about.html
const styleStart = about.indexOf('<style>');
const styleEnd = about.indexOf('</style>') + 8;
const style = about.slice(styleStart, styleEnd);

const navStart = about.indexOf('<nav id="navbar"');
const navEnd = about.indexOf('</nav>', navStart) + 6;
const nav = about.slice(navStart, navEnd);

const footerStart = about.indexOf('<footer id="footer"');
const footerEnd = about.indexOf('</footer>') + 9;
const footer = about.slice(footerStart, footerEnd);

const lastScriptStart = about.lastIndexOf('<script>');
const lastScriptEnd = about.indexOf('</script>', lastScriptStart) + 9;
const script = about.slice(lastScriptStart, lastScriptEnd);

const extraCSS = `
    /* === 404 page === */
    .error-wrap { min-height: calc(100vh - 160px); display: flex; align-items: center; padding: 8rem 0 5rem; }
    .error-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .error-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--orange); display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.2rem; }
    .error-label::before { content: ''; display: block; width: 28px; height: 2px; background: var(--orange); border-radius: 2px; }
    .error-h1 { font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.1; color: var(--text); margin-bottom: 1.2rem; }
    .error-sub { font-size: 1.05rem; color: var(--muted); line-height: 1.75; margin-bottom: 2rem; max-width: 46ch; }
    .error-btns { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
    .btn-outline-dark { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; font-weight: 600; color: var(--text); padding: 0.85rem 2rem; border-radius: 100px; border: 2px solid var(--border); transition: var(--transition); font-family: var(--font-body); text-decoration: none; }
    .btn-outline-dark:hover { border-color: var(--orange); color: var(--orange); }
    .error-visual { position: relative; display: flex; align-items: center; justify-content: center; min-height: 380px; }
    .error-blob { width: 380px; height: 380px; background: var(--orange); opacity: 0.07; border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
    .error-num { position: absolute; font-family: var(--font-heading); font-size: 9rem; color: var(--orange); opacity: 0.18; line-height: 1; }
    .error-icon { position: absolute; font-size: 3.5rem; bottom: 30%; }
    .popular-links { padding: 5rem 0; background: var(--soft); }
    .popular-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.2rem; margin-top: 2.2rem; }
    .pop-card { background: var(--card); border: 1.5px solid var(--border); border-radius: 14px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; transition: var(--transition); text-decoration: none; color: inherit; }
    .pop-card:hover { border-color: var(--orange); box-shadow: 0 12px 40px rgba(0,0,0,0.09); transform: translateY(-3px); }
    .pop-card-icon { font-size: 1.4rem; line-height: 1; }
    .pop-card h3 { font-family: var(--font-heading); font-size: 1.05rem; color: var(--text); margin: 0.25rem 0 0; }
    .pop-card p { font-size: 0.85rem; color: var(--muted); margin: 0; line-height: 1.6; flex: 1; }
    .pop-card-cta { font-size: 0.85rem; font-weight: 700; color: var(--orange); margin-top: 0.4rem; }
    @media (max-width: 768px) {
      .error-inner { grid-template-columns: 1fr; gap: 2rem; }
      .error-visual { display: none; }
    }`;

const styledBlock = style.replace('</style>', extraCSS + '\n  </style>');

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Not Found | Bambino Agency</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="description" content="The page you were looking for doesn't exist or may have moved. Find our services, blog, and contact details on the Bambino Agency website." />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="https://bambinoagency.com/" />
  <meta property="og:title" content="Page Not Found | Bambino Agency" />
  <meta property="og:description" content="The page you were looking for doesn't exist. Discover Bambino's UK digital marketing services." />
  <meta property="og:url" content="https://bambinoagency.com/404" />
  <meta property="og:locale" content="en_GB" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  ${styledBlock}
</head>
<body>

  ${nav}

  <!-- ── 404 Hero ── -->
  <section class="error-wrap">
    <div class="container">
      <div class="error-inner">

        <div class="error-content">
          <p class="error-label">404 &mdash; Page Not Found</p>
          <h1 class="error-h1">This Page Took a Wrong Turn Somewhere</h1>
          <p class="error-sub">The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved. Use the links below to find what you need &mdash; or drop us a message and we&rsquo;ll help you out.</p>
          <div class="error-btns">
            <a href="https://bambinoagency.com/" class="btn-orange">Back to Homepage &rarr;</a>
            <a href="https://bambinoagency.com/services" class="btn-outline-dark">View All Services</a>
          </div>
        </div>

        <div class="error-visual" aria-hidden="true">
          <div class="error-blob"></div>
          <div class="error-num">404</div>
          <div class="error-icon">&#x1F50D;</div>
        </div>

      </div>
    </div>
  </section>

  <!-- ── Popular Links ── -->
  <section class="popular-links">
    <div class="container">
      <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem;">Maybe you were looking for</p>
      <h2 style="font-family:var(--font-heading);font-size:clamp(1.6rem,3vw,2.2rem);color:var(--text);margin-bottom:0.4rem;">Popular Pages</h2>
      <p style="font-size:0.95rem;color:var(--muted);max-width:60ch;">Here are some of the most visited sections of our site. If you still can&rsquo;t find what you need, <a href="https://bambinoagency.com/contact" style="color:var(--orange);font-weight:600;">get in touch</a>.</p>
      <div class="popular-grid">
        <a href="https://bambinoagency.com/services/seo" class="pop-card">
          <div class="pop-card-icon">&#x1F50E;</div>
          <h3>SEO Services</h3>
          <p>Technical audits, content strategy, and link building. Average 67% organic traffic growth in year one.</p>
          <span class="pop-card-cta">Learn more &rarr;</span>
        </a>
        <a href="https://bambinoagency.com/services/google-ads" class="pop-card">
          <div class="pop-card-icon">&#x1F4CA;</div>
          <h3>Google Ads / PPC</h3>
          <p>Search, Shopping, and Performance Max campaigns managed by certified specialists. Average 6.2x ROAS.</p>
          <span class="pop-card-cta">Learn more &rarr;</span>
        </a>
        <a href="https://bambinoagency.com/services/geo" class="pop-card">
          <div class="pop-card-icon">&#x1F916;</div>
          <h3>GEO / AI Search</h3>
          <p>Get cited by ChatGPT, Perplexity, and Google AI Overviews. The new frontier of brand visibility.</p>
          <span class="pop-card-cta">Learn more &rarr;</span>
        </a>
        <a href="https://bambinoagency.com/services/ai-automations" class="pop-card">
          <div class="pop-card-icon">&#x26A1;</div>
          <h3>AI Automations</h3>
          <p>Automate lead routing, reporting, CRM enrichment, and more. Clients save 15&ndash;30 hours per week.</p>
          <span class="pop-card-cta">Learn more &rarr;</span>
        </a>
        <a href="https://bambinoagency.com/services/voice-ai" class="pop-card">
          <div class="pop-card-icon">&#x1F4DE;</div>
          <h3>Voice AI</h3>
          <p>AI phone agents for inbound calls, appointment booking, and lead qualification. Runs 24/7.</p>
          <span class="pop-card-cta">Learn more &rarr;</span>
        </a>
        <a href="https://bambinoagency.com/services/web-design" class="pop-card">
          <div class="pop-card-icon">&#x1F5A5;&#xFE0F;</div>
          <h3>Web Design</h3>
          <p>Fast, conversion-optimised websites built for UK businesses. Webflow, Framer, and bespoke. From &pound;2,500.</p>
          <span class="pop-card-cta">Learn more &rarr;</span>
        </a>
        <a href="https://bambinoagency.com/pricing" class="pop-card">
          <div class="pop-card-icon">&#x1F4B7;</div>
          <h3>Pricing</h3>
          <p>Transparent monthly pricing. Starter from &pound;800/mo. No lock-in contracts. No exit fees.</p>
          <span class="pop-card-cta">View pricing &rarr;</span>
        </a>
        <a href="https://bambinoagency.com/contact" class="pop-card">
          <div class="pop-card-icon">&#x2709;&#xFE0F;</div>
          <h3>Get a Free Audit</h3>
          <p>Free 30-minute strategy session. We&rsquo;ll review your current marketing and show you what&rsquo;s possible.</p>
          <span class="pop-card-cta">Book now &rarr;</span>
        </a>
      </div>
    </div>
  </section>

  ${footer}

  ${script}

</body>
</html>`;

const outPath = path.join(ROOT, '404.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Created 404.html — ' + html.length + ' bytes (' + html.split('\n').length + ' lines)');
