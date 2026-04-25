const fs = require('fs');
const path = require('path');

function svgCheck() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
}
function svgPlus() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
}

function buildPage(p) {
  const bcSchema = p.breadcrumb.map((b,i)=>
    `{"@type":"ListItem","position":${i+1},"name":"${b.name}","item":"${b.url}"}`).join(',');
  const faqSchema = p.faqItems.map(f=>
    `{"@type":"Question","name":"${f.q.replace(/"/g,'\\"')}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g,'\\"')}"}}`).join(',');
  const bcHtml = p.breadcrumb.map((b,i)=> i===p.breadcrumb.length-1
    ? `<li aria-current="page">${b.name}</li>`
    : `<li><a href="${b.url}" style="color:var(--orange)">${b.name}</a></li><li aria-hidden="true">/</li>`).join('');
  const faqHtml = p.faqItems.map(f=>`
        <div class="faq-item">
          <button class="faq-q" aria-expanded="false">${f.q}${svgPlus()}</button>
          <div class="faq-ans"><p>${f.a}</p></div>
        </div>`).join('');
  const svcHtml = p.serviceCards.map(s=>`
        <a href="https://bambinoagency.com${s.href}" class="svc-card reveal">
          <span class="svc-lbl">${s.label}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </a>`).join('');
  const whyHtml = p.whyCards.map(w=>`
        <div class="why-card reveal">
          <h3>${w.title}</h3>
          <p>${w.desc}</p>
        </div>`).join('');
  const stepsHtml = p.processSteps.map(s=>`
        <div class="step reveal">
          <div class="step-num">${s.num}</div>
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>`).join('');
  const resHtml = p.resultsStats.map(r=>`
        <div class="result-card reveal">
          <span class="result-stat">${r.stat}</span>
          <div class="result-desc">${r.desc}</div>
          <p class="result-detail">${r.detail}</p>
        </div>`).join('');
  const pillsHtml = p.industryPills.map(i=>`<span class="ind-pill">${i}</span>`).join('');
  const pricingHtml = p.pricingPlans.map(pl=>`
        <div class="price-card${pl.featured?' featured':''} reveal">
          <div class="plan-name">${pl.name}</div>
          <div class="plan-price">${pl.price==='Custom'?'<span style="font-size:1.8rem;padding-top:0.4rem">Custom</span>':`<sup>${p.currency}$</sup>${pl.price}`}</div>
          <p class="plan-period">${pl.period}</p>
          <p class="plan-desc">${pl.desc}</p>
          <ul class="plan-features">
            ${pl.features.map(f=>`<li class="plan-feature">${svgCheck()} ${f}</li>`).join('')}
          </ul>
          <a href="https://bambinoagency.com/contact" class="${pl.featured?'btn-orange':'btn-outline'}" style="width:100%;justify-content:center">${pl.cta}</a>
        </div>`).join('');
  const otherSvcHtml = (p.otherServiceCards||[]).map(s=>`
        <a href="https://bambinoagency.com${s.href}" class="svc-card reveal">
          <span class="svc-lbl">${s.label}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </a>`).join('');
  const relLinksHtml = p.relatedLinks.map(l=>`<li><a href="${l.href}" class="related-card reveal">${l.text}</a></li>`).join('');
  const ftCityHtml = p.footerCityLinks.map(l=>`<li><a href="https://bambinoagency.com${l.href}">${l.text}</a></li>`).join('');
  const ftLocalHtml = p.footerLocalLinks.map(l=>`<li><a href="https://bambinoagency.com${l.href}">${l.text}</a></li>`).join('');
  const vsHtml = p.visualStats.map(s=>`
            <div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:1.2rem">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);margin-bottom:0.4rem">${s.label}</div>
              <div style="font-family:var(--font-heading);font-size:2rem;color:#FF4D00">${s.value}</div>
              <div style="font-size:0.75rem;color:rgba(255,255,255,0.4)">${s.sub}</div>
            </div>`).join('');
  const insHtml = p.marketStats.map(s=>`<div class="insight-card"><span class="ins-num">${s.num}</span><span class="ins-lbl">${s.lbl}</span></div>`).join('');

  return `<!DOCTYPE html>
<html lang="${p.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="description" content="${p.metaDesc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${p.canonical}" />
  <link rel="alternate" hreflang="${p.lang}" href="${p.canonical}" />
  <link rel="alternate" hreflang="x-default" href="https://bambinoagency.com" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${p.ogTitle}" />
  <meta property="og:description" content="${p.ogDesc}" />
  <meta property="og:url" content="${p.canonical}" />
  <meta property="og:locale" content="${p.ogLocale}" />
  <meta property="og:image" content="https://bambinoagency.com/img/og-default.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[{"@type":["LocalBusiness","MarketingAgency"],"name":"Bambino","url":"https://bambinoagency.com","logo":"https://bambinoagency.com/img/og-default.jpg","description":"${p.schemaDesc}","address":{"@type":"PostalAddress","addressLocality":"Manchester","addressCountry":"GB"},"areaServed":{"@type":"${p.schemaAreaType||'Country'}","name":"${p.schemaArea}"},"priceRange":"$$$","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127","bestRating":"5"},"datePublished":"2026-04-25","dateModified":"2026-04-25"},{"@type":"BreadcrumbList","itemListElement":[${bcSchema}]},{"@type":"FAQPage","mainEntity":[${faqSchema}]}]}
  </script>
  <style>
    :root{--bg:#F9F9F5;--orange:#FF4D00;--orange-light:#FF6B2B;--green:#034C3C;--green-light:#056650;--text:#1A1A1A;--muted:#666660;--card:#FFFFFF;--soft:#F2F2EC;--border:#E8E8E0;--font-heading:'Berkshire Swash',serif;--font-body:'Inter',sans-serif;--radius:16px;--shadow:0 4px 24px rgba(0,0,0,0.07);--shadow-lg:0 12px 48px rgba(0,0,0,0.12);--transition:0.25s cubic-bezier(0.4,0,0.2,1)}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:var(--font-body);background:var(--bg);color:var(--text);overflow-x:hidden;line-height:1.6}a{text-decoration:none;color:inherit}ul{list-style:none}
    .container{width:min(1200px,100% - 3rem);margin-inline:auto}
    .section-label{display:inline-block;font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--orange);background:rgba(255,77,0,0.08);padding:0.35rem 0.9rem;border-radius:100px;margin-bottom:1.2rem}
    .section-title{font-family:var(--font-heading);font-size:clamp(1.8rem,3.5vw,2.6rem);color:var(--text);line-height:1.15;margin-bottom:1rem}
    .section-sub{font-size:1rem;color:var(--muted);max-width:58ch;line-height:1.75}
    .btn-orange{display:inline-flex;align-items:center;gap:0.5rem;background:var(--orange);color:#fff;font-family:var(--font-body);font-weight:700;font-size:0.95rem;padding:0.85rem 2rem;border-radius:100px;border:none;cursor:pointer;transition:var(--transition)}
    .btn-orange:hover{background:var(--orange-light);transform:translateY(-2px)}
    .btn-outline{display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:var(--text);font-family:var(--font-body);font-weight:600;font-size:0.9rem;padding:0.8rem 1.8rem;border-radius:100px;border:2px solid var(--border);cursor:pointer;transition:var(--transition)}
    .btn-outline:hover{border-color:var(--orange);color:var(--orange)}
    #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--bg);padding:1.1rem 0;transition:border-bottom 0.3s,box-shadow 0.3s}
    #navbar.scrolled{border-bottom:1px solid var(--green);box-shadow:0 2px 20px rgba(3,76,60,0.08)}
    .nav-inner{display:flex;align-items:center;justify-content:space-between}
    .nav-logo{font-family:var(--font-heading);font-size:1.8rem;color:var(--green)}
    .nav-links{display:flex;align-items:center;gap:2.2rem}
    .nav-links a{font-size:0.9rem;font-weight:500;color:var(--text);transition:color var(--transition);position:relative}
    .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:2px;background:var(--orange);transition:width var(--transition)}
    .nav-links a:hover{color:var(--orange)}.nav-links a:hover::after{width:100%}
    .nav-cta{background:var(--orange);color:#fff !important;font-weight:700 !important;font-size:0.88rem !important;padding:0.6rem 1.4rem;border-radius:100px}
    .nav-cta:hover{background:var(--orange-light)}.nav-cta::after{display:none !important}
    .nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}
    .nav-hamburger span{display:block;width:24px;height:2px;background:var(--text);border-radius:2px}
    .mobile-menu{display:none;position:fixed;inset:0;background:var(--bg);z-index:999;flex-direction:column;align-items:center;justify-content:center;gap:2rem}
    .mobile-menu a{font-size:1.4rem;font-weight:600;color:var(--text)}.mobile-menu .nav-cta{font-size:1rem !important;padding:0.8rem 2rem}
    #hero{padding:10rem 0 6rem;background:var(--bg)}
    .hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
    .hero-label{display:inline-block;font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--orange);background:rgba(255,77,0,0.08);padding:0.35rem 0.9rem;border-radius:100px;margin-bottom:1.2rem}
    .hero-title{font-family:var(--font-heading);font-size:clamp(2.2rem,4.5vw,3.4rem);line-height:1.1;color:var(--text);margin-bottom:1.4rem}
    .hero-sub{font-size:1.05rem;color:var(--muted);line-height:1.75;margin-bottom:2rem;max-width:52ch}
    .hero-ctas{display:flex;gap:1rem;flex-wrap:wrap}
    .hero-visual{background:var(--green);border-radius:24px;padding:2.5rem;color:#fff}
    .proof-bar{display:flex;flex-wrap:wrap;gap:1.5rem;margin-top:2.5rem}
    .proof-item{display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;font-weight:600;color:var(--muted)}
    .proof-item svg{color:var(--green)}
    section{padding:5rem 0}section:nth-child(even){background:var(--soft)}
    .market-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
    .insight-cards{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .insight-card{background:var(--card);border-radius:var(--radius);padding:1.5rem;box-shadow:var(--shadow);text-align:center}
    .ins-num{display:block;font-family:var(--font-heading);font-size:2rem;color:var(--orange);line-height:1.1}
    .ins-lbl{display:block;font-size:0.78rem;color:var(--muted);margin-top:0.3rem}
    .eeat-box{background:var(--soft);border-left:4px solid var(--green);border-radius:8px;padding:1.2rem 1.5rem;font-size:0.92rem;color:var(--text)}
    .svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;margin-top:2.5rem}
    .svc-card{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);border:1px solid var(--border);transition:var(--transition);display:block}
    .svc-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--orange)}
    .svc-lbl{display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--orange);margin-bottom:0.8rem}
    .svc-card h3{font-family:var(--font-heading);font-size:1.15rem;color:var(--text);margin-bottom:0.6rem}
    .svc-card p{font-size:0.88rem;color:var(--muted);line-height:1.65}
    .why-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.5rem;margin-top:2.5rem}
    .why-card{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow)}
    .why-card h3{font-family:var(--font-heading);font-size:1.05rem;color:var(--text);margin-bottom:0.7rem}
    .why-card p{font-size:0.88rem;color:var(--muted);line-height:1.65}
    .process-steps{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem;margin-top:2.5rem}
    .step{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);text-align:center}
    .step-num{width:48px;height:48px;border-radius:50%;background:var(--orange);color:#fff;font-family:var(--font-heading);font-size:1.3rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem}
    .step h4{font-family:var(--font-heading);font-size:1rem;color:var(--text);margin-bottom:0.5rem}
    .step p{font-size:0.85rem;color:var(--muted);line-height:1.6}
    .results-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}
    .result-card{background:var(--green);border-radius:var(--radius);padding:2rem;color:#fff;text-align:center}
    .result-stat{display:block;font-family:var(--font-heading);font-size:2.6rem;color:#fff;margin-bottom:0.4rem}
    .result-desc{font-weight:700;font-size:0.9rem;margin-bottom:0.8rem}
    .result-detail{font-size:0.82rem;color:rgba(255,255,255,0.7);line-height:1.6}
    .ind-pills{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1.5rem}
    .ind-pill{background:var(--soft);border:1px solid var(--border);border-radius:100px;padding:0.4rem 1rem;font-size:0.82rem;color:var(--text)}
    .pricing-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem}
    .price-card{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);border:1px solid var(--border)}
    .price-card.featured{border:2px solid var(--orange);position:relative}
    .price-card.featured::before{content:'Most Popular';position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--orange);color:#fff;font-size:0.7rem;font-weight:700;padding:0.25rem 0.8rem;border-radius:100px;white-space:nowrap}
    .plan-name{font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);margin-bottom:0.5rem}
    .plan-price{font-family:var(--font-heading);font-size:2.4rem;color:var(--text);line-height:1}
    .plan-price sup{font-size:1rem;vertical-align:super}
    .plan-period{font-size:0.78rem;color:var(--muted);margin:0.4rem 0 1rem}
    .plan-desc{font-size:0.85rem;color:var(--muted);margin-bottom:1.2rem;line-height:1.5}
    .plan-features{display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1.5rem}
    .plan-feature{display:flex;align-items:flex-start;gap:0.5rem;font-size:0.83rem;color:var(--text)}
    .plan-feature svg{flex-shrink:0;margin-top:2px;color:var(--green)}
    .faq-list{display:flex;flex-direction:column;gap:0.8rem;margin-top:2.5rem;max-width:800px;margin-inline:auto}
    .faq-item{background:var(--card);border-radius:var(--radius);border:1px solid var(--border);overflow:hidden}
    .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1.2rem 1.5rem;background:none;border:none;font-family:var(--font-body);font-weight:600;font-size:0.95rem;color:var(--text);cursor:pointer;text-align:left;gap:1rem}
    .faq-q svg{flex-shrink:0;transition:transform var(--transition)}
    .faq-q[aria-expanded="true"] svg{transform:rotate(45deg)}
    .faq-ans{display:none;padding:0 1.5rem 1.2rem}
    .faq-ans p{font-size:0.9rem;color:var(--muted);line-height:1.75}
    .related-grid{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem;align-items:flex-start}
    .related-grid ul{display:flex;flex-direction:column;gap:0.6rem}
    .related-card{background:var(--green);color:#fff;padding:0.6rem 1.2rem;border-radius:100px;font-size:0.85rem;font-weight:600;transition:var(--transition)}
    .related-card:hover{background:var(--green-light)}
    #cta{background:var(--green);padding:6rem 0}.cta-inner{text-align:center}
    .cta-title{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:#fff;margin-bottom:1rem;line-height:1.15}
    .cta-sub{font-size:1rem;color:rgba(255,255,255,0.75);max-width:52ch;margin:0 auto 2rem;line-height:1.75}
    .btn-white{display:inline-flex;align-items:center;background:#fff;color:var(--green);font-weight:700;font-size:0.95rem;padding:1rem 2.4rem;border-radius:100px;transition:var(--transition)}
    .btn-white:hover{background:var(--soft)}
    footer{background:var(--green);border-top:1px solid rgba(255,255,255,0.07);padding:4.5rem 0 2rem;color:rgba(255,255,255,0.6)}
    .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem;padding-top:0.5rem}
    .footer-brand-logo{font-family:var(--font-heading);font-size:2rem;color:#fff;margin-bottom:1rem}
    .footer-brand-desc{font-size:0.85rem;line-height:1.7;max-width:28ch}
    .footer-col-title{font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.4);margin-bottom:1rem}
    .footer-links{display:flex;flex-direction:column;gap:0.6rem}
    .footer-links a{font-size:0.85rem;color:rgba(255,255,255,0.6);transition:color var(--transition)}
    .footer-links a:hover{color:#fff}
    .footer-bottom{border-top:1px solid rgba(255,255,255,0.08);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem}
    .footer-legal{display:flex;gap:1.5rem}
    .footer-legal a{color:rgba(255,255,255,0.4);transition:color var(--transition)}.footer-legal a:hover{color:#fff}
    .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease}.reveal.visible{opacity:1;transform:none}
    @media(max-width:900px){.hero-inner,.market-grid{grid-template-columns:1fr}.hero-visual{display:none}.pricing-grid{grid-template-columns:1fr 1fr}.results-grid{grid-template-columns:1fr}.footer-grid{grid-template-columns:1fr 1fr}.nav-links{display:none}.nav-hamburger{display:flex}}
    @media(max-width:600px){.pricing-grid{grid-template-columns:1fr}.footer-grid{grid-template-columns:1fr}.hero-ctas{flex-direction:column}}
  </style>
</head>
<body>
  <nav id="navbar" role="navigation" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="https://bambinoagency.com" class="nav-logo" aria-label="Bambino home">Bambino</a>
      <div class="nav-links" role="list">
        <a href="https://bambinoagency.com/services" role="listitem">Services</a>
        <a href="https://bambinoagency.com/ca" role="listitem">Canada</a>
        <a href="https://bambinoagency.com/us" role="listitem">USA</a>
        <a href="https://bambinoagency.com/pricing" role="listitem">Pricing</a>
        <a href="https://bambinoagency.com/about" role="listitem">About</a>
        <a href="https://bambinoagency.com/contact" class="nav-cta" role="listitem">Free Audit</a>
      </div>
      <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-menu" role="dialog" aria-label="Mobile menu">
    <a href="https://bambinoagency.com/services">Services</a>
    <a href="https://bambinoagency.com/ca">Canada</a>
    <a href="https://bambinoagency.com/us">USA</a>
    <a href="https://bambinoagency.com/pricing">Pricing</a>
    <a href="https://bambinoagency.com/about">About</a>
    <a href="https://bambinoagency.com/contact" class="nav-cta">Free Audit</a>
  </div>

  <section id="hero" aria-labelledby="hero-heading">
    <div class="container"><div class="hero-inner">
      <div>
        <nav aria-label="Breadcrumb">
          <ol style="display:flex;gap:0.5rem;font-size:0.8rem;color:var(--muted);list-style:none;margin-bottom:1rem">${bcHtml}</ol>
        </nav>
        <span class="hero-label">${p.heroLabel}</span>
        <h1 id="hero-heading" class="hero-title">${p.heroTitle}</h1>
        <p class="hero-sub">${p.heroSub}</p>
        <div class="hero-ctas">
          <a href="https://bambinoagency.com/contact" class="btn-orange">${p.heroCTA1}</a>
          <a href="https://bambinoagency.com/pricing" class="btn-outline">${p.heroCTA2}</a>
        </div>
        <div class="proof-bar">
          <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 4.9&#9733; average client rating</div>
          <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 97% client retention rate</div>
          <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 400+ UK, US &amp; CA clients</div>
          <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Month-to-month — no lock-in</div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div style="font-family:var(--font-heading);font-size:1.1rem;color:rgba(255,255,255,0.7);margin-bottom:1.5rem">${p.visualTitle}</div>
        <div style="display:flex;flex-direction:column;gap:1.2rem">${vsHtml}</div>
      </div>
    </div></div>
  </section>

  <section id="market" aria-labelledby="market-heading">
    <div class="container"><div class="market-grid">
      <div class="reveal">
        <span class="section-label">${p.marketLabel}</span>
        <h2 id="market-heading" class="section-title">${p.marketTitle}</h2>
        <p class="section-sub">${p.marketBody}</p>
        <div class="eeat-box" style="margin-top:1.5rem"><p><strong>Bambino data:</strong> ${p.marketEeat}</p></div>
        <p style="margin-top:1.2rem;font-size:0.85rem;color:var(--muted)">${p.marketNote}</p>
      </div>
      <div><div class="insight-cards reveal">${insHtml}</div></div>
    </div></div>
  </section>

  <section id="landscape" aria-labelledby="landscape-heading" style="padding:5rem 0;background:var(--soft)">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start" class="reveal">
        <div>
          <span class="section-label">${p.marketLabel}</span>
          <h2 id="landscape-heading" class="section-title">${p.landscapeTitle}</h2>
          <p style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">${p.landscapeBody}</p>
          <div style="background:var(--card);border-radius:12px;padding:1.4rem 1.6rem;border-left:4px solid var(--orange);box-shadow:var(--shadow)">
            <p style="font-size:0.88rem;font-weight:700;color:var(--text);margin-bottom:0.4rem">Competition level</p>
            <p style="font-size:0.95rem;color:var(--orange);font-weight:600">${p.landscapeCompetition}</p>
          </div>
        </div>
        <div>
          <span class="section-label">Why It Matters</span>
          <h3 style="font-family:var(--font-heading);font-size:1.5rem;color:var(--text);margin-bottom:1rem">${p.landscapeLocalTitle}</h3>
          <p style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">${p.landscapeLocalBody}</p>
          <a href="https://bambinoagency.com/contact" class="btn-orange">Book a Free Discovery Call &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <section id="services" aria-labelledby="svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">What We Do</span>
        <h2 id="svc-heading" class="section-title">${p.servicesTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.servicesSub}</p>
      </div>
      <div class="svc-grid">${svcHtml}</div>
    </div>
  </section>

  <section id="why" aria-labelledby="why-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Why Choose Us</span>
        <h2 id="why-heading" class="section-title">${p.whyTitle}</h2>
      </div>
      <div class="why-grid">${whyHtml}</div>
    </div>
  </section>

  <section id="process" aria-labelledby="process-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">How It Works</span>
        <h2 id="process-heading" class="section-title">${p.processTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.processSub}</p>
      </div>
      <div class="process-steps">${stepsHtml}</div>
    </div>
  </section>

  <section id="results" aria-labelledby="results-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Client Results</span>
        <h2 id="results-heading" class="section-title">What Our Clients Achieve</h2>
        <p class="section-sub" style="margin:0 auto">Benchmarks from 400+ automation and marketing implementations across Canada, UK, and USA.</p>
      </div>
      <div class="results-grid">${resHtml}</div>
    </div>
  </section>

  <section id="industries" aria-labelledby="ind-heading">
    <div class="container"><div class="reveal">
      <span class="section-label">Industries We Serve</span>
      <h2 id="ind-heading" class="section-title">${p.industriesTitle}</h2>
      <p class="section-sub">${p.industriesSub}</p>
      <div class="ind-pills">${pillsHtml}</div>
    </div></div>
  </section>

  <section id="pricing" aria-labelledby="pricing-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">${p.currency === 'CA' ? 'CA' : 'US'} Pricing</span>
        <h2 id="pricing-heading" class="section-title">${p.pricingTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.pricingSub}</p>
      </div>
      <div class="pricing-grid" style="margin-top:2.5rem">${pricingHtml}</div>
      <p style="text-align:center;margin-top:1.5rem;font-size:0.85rem;color:var(--muted)">All prices in ${p.currency === 'CA' ? 'CAD' : 'USD'}. <a href="https://bambinoagency.com/pricing" style="color:var(--orange);font-weight:600">See full pricing &rarr;</a></p>
    </div>
  </section>

  ${otherSvcHtml ? `<section id="other-services" aria-labelledby="other-svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Related Services</span>
        <h2 id="other-svc-heading" class="section-title">${p.otherServicesTitle||'More Services'}</h2>
        <p class="section-sub" style="margin:0 auto">${p.otherServicesSub||''}</p>
      </div>
      <div class="svc-grid">${otherSvcHtml}</div>
    </div>
  </section>` : ''}

  <section id="faq" aria-labelledby="faq-heading">
    <div class="container">
      <div class="reveal" style="text-align:center">
        <span class="section-label">Common Questions</span>
        <h2 id="faq-heading" class="section-title">${p.faqTitle}</h2>
      </div>
      <div class="faq-list">${faqHtml}</div>
    </div>
  </section>

  <section id="related" aria-labelledby="related-heading">
    <div class="container">
      <div class="reveal">
        <span class="section-label">${p.relatedLabel}</span>
        <h2 id="related-heading" class="section-title">${p.relatedTitle}</h2>
        <p class="section-sub">${p.relatedSub}</p>
      </div>
      <div class="related-grid">
        <ul>${relLinksHtml}</ul>
        <a href="https://bambinoagency.com/ca" class="related-card reveal">View All Canadian Cities &rarr;</a>
      </div>
    </div>
  </section>

  <section id="cta" aria-labelledby="cta-heading">
    <div class="cta-inner container">
      <span class="section-label" style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.85)">Get Started</span>
      <h2 id="cta-heading" class="cta-title">${p.ctaTitle}</h2>
      <p class="cta-sub">${p.ctaSub}</p>
      <div style="display:flex;justify-content:center;gap:1.2rem;flex-wrap:wrap">
        <a href="https://bambinoagency.com/contact" class="btn-orange" style="font-size:1rem;padding:1rem 2.4rem">Book a Free Discovery Call &rarr;</a>
        <a href="https://bambinoagency.com/pricing" class="btn-white">View Pricing</a>
      </div>
      <p style="margin-top:1.5rem;font-size:0.82rem;color:rgba(255,255,255,0.4)">No contracts. No setup fees. Just honest advice from our specialists.</p>
    </div>
  </section>

  <footer id="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-logo">Bambino</div>
          <p class="footer-brand-desc">Award-winning digital marketing agency serving businesses across the UK, US, and Canada. Data-driven SEO, paid media, and AI-powered growth strategies.</p>
        </div>
        <div>
          <h3 class="footer-col-title">${p.footerCityLabel}</h3>
          <ul class="footer-links" role="list">${ftCityHtml}</ul>
          <h3 class="footer-col-title" style="margin-top:1.2rem">${p.footerLocalLabel}</h3>
          <ul class="footer-links" role="list">${ftLocalHtml}</ul>
        </div>
        <div>
          <h3 class="footer-col-title">Services</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/services/seo">SEO</a></li>
            <li><a href="https://bambinoagency.com/services/google-ads">Google Ads</a></li>
            <li><a href="https://bambinoagency.com/services/marketing-automation">Marketing Automation</a></li>
            <li><a href="https://bambinoagency.com/services/gohighlevel">GoHighLevel</a></li>
            <li><a href="https://bambinoagency.com/services">All Services &rarr;</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-col-title">Company</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/about">About Us</a></li>
            <li><a href="https://bambinoagency.com/pricing">Pricing</a></li>
            <li><a href="https://bambinoagency.com/blog">Blog</a></li>
            <li><a href="https://bambinoagency.com/contact">Contact</a></li>
          </ul>
          <h3 class="footer-col-title" style="margin-top:1.5rem">UK Office</h3>
          <ul class="footer-links" role="list">
            <li style="color:rgba(255,255,255,0.55);font-size:0.82rem">Manchester, United Kingdom</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Bambino Agency Ltd. All rights reserved.</span>
        <div class="footer-legal">
          <a href="https://bambinoagency.com/privacy">Privacy Policy</a>
          <a href="https://bambinoagency.com/terms">Terms of Service</a>
          <a href="https://bambinoagency.com/cookies">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    const nav=document.getElementById('navbar');
    window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>40)},{passive:true});
    const hamburger=document.querySelector('.nav-hamburger'),mobileMenu=document.querySelector('.mobile-menu');
    hamburger.addEventListener('click',()=>{const isOpen=mobileMenu.style.display==='flex';mobileMenu.style.display=isOpen?'none':'flex';hamburger.setAttribute('aria-expanded',String(!isOpen));});
    mobileMenu.querySelectorAll('a').forEach(a=>{a.addEventListener('click',()=>{mobileMenu.style.display='none';});});
    const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    document.querySelectorAll('.faq-q').forEach(btn=>{btn.addEventListener('click',()=>{const expanded=btn.getAttribute('aria-expanded')==='true';document.querySelectorAll('.faq-q').forEach(b=>{b.setAttribute('aria-expanded','false');b.nextElementSibling.style.display='none';});if(!expanded){btn.setAttribute('aria-expanded','true');btn.nextElementSibling.style.display='block';}});});
  </script>
</body>
</html>`;
}

// ─── PAGE DATA ───────────────────────────────────────────────────

const PAGES = [
  // ── n8n Toronto ──────────────────────────────────────────────
  {
    outPath: 'ca/toronto/n8n-agency/index.html',
    lang: 'en-CA', currency: 'CA',
    title: 'n8n Automation Agency Toronto, ON | Workflow Automation Experts | Bambino',
    metaDesc: 'n8n automation agency in Toronto. Custom workflow builds, AI agent integration, CRM automation, and multi-app orchestration for Canadian businesses. Certified n8n experts. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/toronto/n8n-agency',
    ogTitle: 'n8n Automation Agency Toronto | Custom Workflows & AI Agents | Bambino',
    ogDesc: 'Toronto n8n automation agency. Custom workflow builds, AI agent integration, and multi-app orchestration for Canadian businesses. Free discovery call.',
    ogLocale: 'en_CA',
    schemaDesc: 'n8n automation agency serving Toronto, ON. Custom workflow builds, AI agent integration, and multi-app orchestration for Canadian businesses.',
    schemaAreaType: 'City', schemaArea: 'Toronto',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'n8n Agency Toronto',url:'https://bambinoagency.com/ca/toronto/n8n-agency'}
    ],
    heroLabel: 'Toronto, ON',
    heroTitle: 'n8n Automation Agency in Toronto, ON — Custom Workflows, AI Agents & Integrations',
    heroSub: 'n8n has become the tool of choice for Toronto businesses that need serious automation — complex multi-step workflows, AI agent integration, and custom API builds that no-code tools can\'t handle. Bambino\'s certified n8n specialists build production-grade automation systems for Toronto companies: from CRM sync and lead routing to AI-powered agentic workflows that make decisions and take actions autonomously.',
    heroCTA1: 'Book a Free n8n Discovery Call →',
    heroCTA2: 'View CA Pricing',
    visualTitle: 'n8n Toronto Snapshot',
    visualStats: [
      {label:'Avg. hours automated per week',value:'22 hrs',sub:'Per Toronto client post-implementation'},
      {label:'Typical workflow delivery',value:'1–3 wks',sub:'From discovery to production'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketLabel: 'Toronto Market',
    marketTitle: 'n8n Adoption in Toronto: From Simple Zapier Replacement to Agentic AI',
    marketBody: 'Toronto\'s tech-forward business ecosystem — SaaS companies in Liberty Village, agencies in Leslieville, and finance firms on Bay Street — is increasingly moving beyond Zapier and Make.com to n8n for complex automation. n8n\'s self-hosted option, open-source model, and ability to run JavaScript inside workflows make it the platform of choice when businesses hit the limits of no-code tools. In 2026, the shift is from simple "if this then that" automations to agentic workflows — where n8n orchestrates AI models, makes branching decisions, and executes multi-step processes without human intervention.',
    marketEeat: 'Bambino n8n builds: average 22 hours/week automated per Toronto client across workflow implementations covering CRM sync, lead routing, reporting, and AI-powered decision workflows.',
    marketNote: 'Toronto verticals served: SaaS companies, marketing agencies, professional services, ecommerce operators, finance firms, and data-intensive operations teams.',
    marketStats: [
      {num:'2.9M',lbl:'City population'},
      {num:'97K+',lbl:'Active businesses'},
      {num:'600+',lbl:'Active SaaS companies'},
      {num:'22hrs',lbl:'Avg. weekly hours automated'}
    ],
    landscapeTitle: 'n8n Competition in Toronto: Almost No Dedicated Agencies',
    landscapeBody: 'Unlike the UK or USA where a handful of n8n agencies have built national presences (N8N Lab, n8nera, Goodspeed), Toronto has virtually no dedicated n8n agency offering strategy-led workflow builds for local businesses. Most Toronto companies discover n8n through Reddit or YouTube, attempt self-implementation, and either abandon complex builds or maintain fragile workflows without proper error handling. This is a wide-open market for a qualified n8n partner in Toronto.',
    landscapeCompetition: 'Very Low — near-zero dedicated n8n agencies in Toronto',
    landscapeLocalTitle: 'Why Toronto Businesses Choose n8n Over Zapier & Make.com',
    landscapeLocalBody: 'Toronto\'s B2B and SaaS companies outgrow Zapier and Make.com when they need: self-hosted infrastructure for data privacy (PIPEDA compliance), JavaScript execution inside workflows, complex branching logic across 10+ steps, AI model integration (OpenAI, Claude, Gemini), and workflows that handle errors gracefully rather than silently failing. n8n handles all of these — Zapier and Make.com don\'t.',
    servicesTitle: 'n8n Automation Services in Toronto',
    servicesSub: 'Production-grade n8n workflow builds — from simple CRM sync to complex AI agentic systems — by certified n8n specialists with 200+ workflows delivered.',
    serviceCards: [
      {label:'Core Build',title:'Custom n8n Workflow Development',desc:'Bespoke n8n workflows built to your Toronto business\'s exact requirements — multi-step, multi-condition, with proper error handling, retry logic, and monitoring. Not templates — proper engineering.',href:'/services/marketing-automation'},
      {label:'AI Agents',title:'AI Agentic Workflow Builds',desc:'n8n\'s AI agent nodes orchestrating OpenAI, Claude, or Gemini — making decisions, executing multi-step tasks, and interacting with external APIs autonomously. The next generation of business automation.',href:'/services/marketing-automation'},
      {label:'CRM Sync',title:'CRM & Sales Automation',desc:'Bi-directional sync between HubSpot, Salesforce, GoHighLevel, ActiveCampaign, and your other sales tools — triggered by deal stage changes, form submissions, or calendar bookings.',href:'/services/hubspot'},
      {label:'Integrations',title:'API Integration & Webhooks',desc:'Connect any app that has an API — even if no native n8n node exists. We build HTTP request nodes, custom JavaScript functions, and webhook handlers for Toronto businesses\' unique tool stacks.',href:'/services/marketing-automation'},
      {label:'Data',title:'Data Pipeline & Reporting Automation',desc:'Automated data collection, transformation, and reporting — pulling from Google Ads, GA4, Meta, CRM, and databases into unified dashboards. No more manual reporting for Toronto operations teams.',href:'/services/analytics'},
      {label:'Lead Ops',title:'Lead Routing & Qualification Automation',desc:'AI-powered lead scoring, routing, and follow-up orchestration — new leads classified by source, intent, and firmographic data, then routed to the right rep with the right message within minutes.',href:'/services/marketing-automation'},
      {label:'Self-Hosted',title:'n8n Self-Hosted Infrastructure',desc:'Deploy and manage self-hosted n8n on your own infrastructure — Docker, cloud VM, or Kubernetes. Full data sovereignty, PIPEDA-compliant for Canadian businesses handling sensitive data.',href:'/services/marketing-automation'},
      {label:'Training',title:'n8n Team Training & Handoff',desc:'Train your Toronto team to build and maintain their own n8n workflows — covering node types, credentials management, error handling, and debugging. Includes recorded walkthroughs.',href:'/services/marketing-automation'}
    ],
    whyTitle: 'Why Toronto Businesses Choose Bambino for n8n',
    whyCards: [
      {title:'Production-Grade Builds — Not Hobby Workflows',desc:'Bambino\'s n8n builds include proper error handling, retry logic, logging, and monitoring. Most self-taught n8n workflows silently fail — ours don\'t. Every production workflow is tested with real data before handoff.'},
      {title:'AI-First Automation Architecture',desc:'We design n8n systems with AI at the centre — not bolted on. AI agent nodes, LLM-powered decision trees, and vector database integrations are planned into the architecture from day one, not added as afterthoughts.'},
      {title:'PIPEDA-Aware Builds for Canadian Businesses',desc:'For Toronto businesses handling personal data, we architect n8n workflows with Canadian privacy law in mind — recommending self-hosted deployments, data minimisation practices, and compliant data retention flows.'},
      {title:'Full Stack Integration Capability',desc:'n8n connects to anything with an API. Our Toronto team has built integrations with 100+ SaaS tools, custom databases, internal APIs, and legacy systems that have no native connector. If it has an API, we can automate it.'}
    ],
    processTitle: 'Our Toronto n8n Implementation Process',
    processSub: 'A structured workflow engineering approach — from discovery to production-grade deployment — refined across 200+ n8n builds.',
    processSteps: [
      {num:'1',title:'Automation Discovery',desc:'Map your Toronto business\'s manual processes, data flows, and integration requirements. Identify automation candidates ranked by time saved and implementation complexity.'},
      {num:'2',title:'Workflow Architecture',desc:'Design the n8n workflow architecture — node sequences, branching conditions, error paths, and data schema — before building anything. Reviewed with your team before implementation starts.'},
      {num:'3',title:'Build & Test',desc:'Build workflows in n8n with proper credentials, error handling, and logging. Tested end-to-end with real data, including edge cases and failure scenarios.'},
      {num:'4',title:'Deploy & Monitor',desc:'Deploy to production — cloud-hosted or self-hosted infrastructure. Set up monitoring, error notifications, and execution logs so your team knows immediately if something breaks.'},
      {num:'5',title:'Train & Iterate',desc:'Train your Toronto team on workflow management. Begin monthly retainer for new builds, optimisations, and workflow maintenance as your automation stack grows.'}
    ],
    resultsStats: [
      {stat:'22 hrs',desc:'Avg. weekly hours automated',detail:'Per Toronto client across workflow implementations covering CRM sync, reporting, lead routing, and AI-powered decision workflows.'},
      {stat:'1–3 wks',desc:'Typical workflow delivery',detail:'From discovery call to production deployment for standard workflow builds. Complex AI agentic systems or large multi-workflow stacks take 4–8 weeks.'},
      {stat:'0',desc:'Silently failing workflows',detail:'Every Bambino n8n build includes error handling, retry logic, and monitoring alerts — so failures surface immediately rather than going unnoticed for weeks.'}
    ],
    industriesTitle: 'n8n Automation for Toronto Industries',
    industriesSub: 'Every industry has repetitive, automatable processes. Our Toronto n8n specialists have built workflows across:',
    industryPills: ['SaaS & Tech','Marketing Agencies','Professional Services','Finance & Insurance','Ecommerce','Healthcare Operations','Real Estate','Data Teams'],
    pricingTitle: 'n8n Automation Pricing for Toronto Businesses',
    pricingSub: 'All prices in CAD. Flat project fees + optional monthly management retainers. No long-term contracts.',
    pricingPlans: [
      {name:'Starter',price:'1,200',period:'per workflow + HST/GST',desc:'Single workflow build for Toronto businesses — up to 10 nodes, 2 integrations, full error handling, and documentation.',featured:false,features:['Up to 10-node workflow','2 API integrations','Error handling & retry logic','Execution monitoring setup','Workflow documentation'],cta:'Get Started →'},
      {name:'Growth',price:'3,800',period:'workflow bundle + HST/GST',desc:'5-workflow automation bundle for Toronto teams — covering lead routing, CRM sync, reporting, and communication workflows.',featured:true,features:['5 custom workflow builds','Up to 5 integrations each','AI node integration','n8n cloud or self-hosted setup','Team training included','Monthly retainer (CA$800/mo)'],cta:'Get Started →'},
      {name:'Scale',price:'8,500',period:'automation stack + HST/GST',desc:'Full automation stack for Toronto businesses — 10+ workflows, AI agent integration, self-hosted n8n deployment, and ongoing management.',featured:false,features:['10+ workflow builds','AI agentic workflows','Self-hosted n8n deployment','Custom API integrations','Data pipeline builds','Monthly retainer (CA$1,600/mo)'],cta:'Get Started →'},
      {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke n8n automation programmes for complex Toronto operations — multi-department, high-volume, or AI-heavy workflow requirements.',featured:false,features:['Unlimited workflow builds','Dedicated n8n architect','Custom AI agent development','SLA & priority support','Quarterly architecture reviews'],cta:'Talk to Us →'}
    ],
    otherServicesTitle: 'More Automation Services in Toronto',
    otherServicesSub: 'n8n is one tool in your automation stack. Explore related services Bambino offers Toronto businesses.',
    otherServiceCards: [
      {href:'/ca/toronto/make-com-agency',label:'Related',title:'Make.com Agency Toronto',desc:'Make.com scenario builds for simpler multi-app automations that complement your n8n stack.'},
      {href:'/ca/toronto/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Toronto',desc:'GHL CRM automation — n8n workflows connecting GoHighLevel to the rest of your Toronto tech stack.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full marketing automation strategy across n8n, HubSpot, GoHighLevel, and AI-powered custom builds.'},
      {href:'/ca/toronto/seo-agency',label:'Also Available',title:'SEO Agency Toronto',desc:'Organic search for Toronto businesses — rankings that compound over time alongside your automation stack.'}
    ],
    faqTitle: 'n8n Agency Toronto — FAQs',
    faqItems: [
      {q:'What is n8n and why are Toronto businesses switching to it?',a:'n8n is an open-source workflow automation platform that lets businesses build complex multi-step automations connecting any app with an API. Toronto businesses switch from Zapier and Make.com to n8n when they need: self-hosted data privacy (PIPEDA-compliant), JavaScript execution inside workflows, complex branching logic, AI model integration (OpenAI, Claude, Gemini), and proper error handling that Zapier and Make.com lack at scale.'},
      {q:'How much does n8n workflow development cost in Toronto?',a:'Bambino charges CA$1,200 per workflow for standard builds, CA$3,800 for a 5-workflow bundle, and CA$8,500 for a full automation stack. Ongoing monthly management retainers start at CA$800/month. All prices exclude HST. Complex AI agentic workflows are priced on discovery.'},
      {q:'Should I use n8n cloud or self-hosted for my Toronto business?',a:'For most Toronto SMBs, n8n cloud is simpler and sufficient. For businesses handling sensitive personal data under PIPEDA — healthcare, finance, legal — we recommend self-hosted n8n on your own cloud infrastructure (AWS Canada, Azure Canada Central) for full data sovereignty. We handle the infrastructure setup and management.'},
      {q:'How long does n8n workflow development take?',a:'Single workflow builds take 1–3 weeks from discovery to production deployment. 5-workflow bundles take 3–5 weeks. Full automation stacks with AI agent integration take 6–10 weeks. Timeline depends on the complexity of integrations, API documentation quality, and your team\'s availability for feedback sessions.'},
      {q:'Can n8n replace Zapier for my Toronto business?',a:'Yes — n8n handles everything Zapier does plus significantly more: self-hosted deployment, JavaScript execution, complex branching, AI nodes, and higher execution volumes without per-task pricing. Most Toronto businesses that switch from Zapier to n8n save on subscription costs while gaining dramatically more automation capability.'},
      {q:'Do you build AI agentic workflows with n8n?',a:'Yes. This is one of our specialisations. We build n8n AI agent workflows using OpenAI, Anthropic Claude, and Google Gemini — autonomous agents that can classify data, make routing decisions, draft emails, analyse documents, and interact with external APIs without human input. These are production-grade systems with proper context management, fallback logic, and monitoring.'},
      {q:'Can you integrate n8n with GoHighLevel, HubSpot, or Salesforce?',a:'Yes. We build bidirectional integrations between n8n and all major CRMs — GoHighLevel, HubSpot, Salesforce, ActiveCampaign, Pipedrive. Typical patterns include: new lead → CRM contact creation + pipeline stage assignment + automated follow-up sequence trigger, deal stage change → internal Slack notification + task creation + invoice generation.'},
      {q:'Do you offer n8n maintenance and support for Toronto businesses?',a:'Yes. Monthly management retainers cover: workflow monitoring, error investigation and fixes, new workflow builds, integration updates when third-party APIs change, and team support as your automation stack grows. Retainers start at CA$800/month for up to 10 managed workflows.'}
    ],
    relatedLabel: 'Other Canadian Cities',
    relatedTitle: 'n8n Automation Agency Services Across Canada',
    relatedSub: 'Bambino builds n8n automations for businesses across Canada. Explore services in other Canadian cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/vancouver/n8n-agency',text:'Vancouver n8n Agency →'},
      {href:'https://bambinoagency.com/ca/calgary/n8n-agency',text:'Calgary n8n Agency →'},
      {href:'https://bambinoagency.com/ca/ottawa/n8n-agency',text:'Ottawa n8n Agency →'},
      {href:'https://bambinoagency.com/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Automate Your Toronto Business with n8n?',
    ctaSub: 'Book a free 30-minute n8n discovery call. We\'ll map your top automation opportunities, show you what\'s possible with n8n, and give you a project estimate — with no obligation to proceed.',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/toronto/n8n-agency',text:'Toronto n8n Agency'},
      {href:'/ca/vancouver/n8n-agency',text:'Vancouver n8n Agency'},
      {href:'/ca/calgary/n8n-agency',text:'Calgary n8n Agency'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Toronto',
    footerLocalLinks: [
      {href:'/ca/toronto/gohighlevel-agency',text:'GoHighLevel Agency'},
      {href:'/ca/toronto/make-com-agency',text:'Make.com Agency'},
      {href:'/ca/toronto/seo-agency',text:'SEO Agency'}
    ]
  },

  // ── Make.com Toronto ─────────────────────────────────────────
  {
    outPath: 'ca/toronto/make-com-agency/index.html',
    lang: 'en-CA', currency: 'CA',
    title: 'Make.com Agency Toronto, ON | Certified Make.com Automation Experts | Bambino',
    metaDesc: 'Certified Make.com agency in Toronto. Custom scenario builds, multi-app automation, CRM integration, and workflow design for Canadian businesses. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/toronto/make-com-agency',
    ogTitle: 'Make.com Agency Toronto | Certified Automation Experts | Bambino',
    ogDesc: 'Toronto\'s certified Make.com agency. Custom scenario builds, CRM integration, and multi-app automation for Canadian businesses. Free discovery call.',
    ogLocale: 'en_CA',
    schemaDesc: 'Make.com automation agency serving Toronto, ON. Custom scenario builds, multi-app automation, and CRM integration for Canadian businesses.',
    schemaAreaType: 'City', schemaArea: 'Toronto',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'Make.com Agency Toronto',url:'https://bambinoagency.com/ca/toronto/make-com-agency'}
    ],
    heroLabel: 'Toronto, ON',
    heroTitle: 'Make.com Agency in Toronto, ON — Certified Scenario Builds & Multi-App Automation',
    heroSub: 'Make.com (formerly Integromat) is the visual automation platform Toronto businesses use to connect their apps without code — but complex, production-grade Make scenarios require real expertise to build correctly. Bambino is a certified Make.com agency in Toronto. We design and build reliable, scalable Make.com automations that eliminate manual work, sync your data in real-time, and connect your entire tech stack into one intelligent system.',
    heroCTA1: 'Book a Free Make.com Discovery Call →',
    heroCTA2: 'View CA Pricing',
    visualTitle: 'Make.com Toronto Snapshot',
    visualStats: [
      {label:'Avg. scenarios built per client',value:'8',sub:'Across initial implementation'},
      {label:'Avg. hours saved per week',value:'16 hrs',sub:'After Make.com implementation'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketLabel: 'Toronto Market',
    marketTitle: 'Make.com Adoption in Toronto: Powerful Visual Automation, Zero Dedicated Agencies',
    marketBody: 'Toronto businesses love Make.com\'s visual scenario builder — it\'s significantly more powerful than Zapier and easier to maintain than code. But most Toronto companies hit a ceiling: complex JSON parsing, iterator modules, multi-route scenarios, and error handling aren\'t intuitive without experience. There\'s also almost no dedicated Make.com agency presence in Toronto — the few certified Make.com experts serving Canada operate from generic national or international positions without Toronto-specific market knowledge.',
    marketEeat: 'Bambino Make.com builds: average 16 hours/week saved across implementations. Our certified Make.com specialists have built 150+ scenarios covering CRM sync, lead routing, ecommerce automation, and multi-app reporting pipelines for Canadian businesses.',
    marketNote: 'Toronto verticals: marketing agencies, SaaS companies, ecommerce operators, professional services, and operations-heavy SMBs.',
    marketStats: [
      {num:'2.9M',lbl:'City population'},
      {num:'97K+',lbl:'Active businesses'},
      {num:'150+',lbl:'Make.com scenarios built'},
      {num:'16hrs',lbl:'Avg. weekly hours saved'}
    ],
    landscapeTitle: 'Make.com Agency Competition in Toronto: Effectively Zero',
    landscapeBody: 'A search for "Make.com agency Toronto" or "Make.com consultant Canada" returns generic results from international agencies, the Make.com partner directory (individual freelancers), and community forum posts. There is no dedicated, SEO-visible Make.com agency serving the Toronto market with strategy-led scenario builds, Canadian pricing, and local market knowledge. This is one of the clearest gap opportunities in Toronto\'s marketing automation landscape.',
    landscapeCompetition: 'Very Low — no dedicated Make.com agencies targeting Toronto',
    landscapeLocalTitle: 'Make.com vs. Zapier for Toronto Businesses',
    landscapeLocalBody: 'Make.com outperforms Zapier for Toronto businesses that need: visual multi-step scenario design, complex data transformations (JSON parsing, array manipulation, math operations), multi-route conditional logic, higher execution volumes at lower cost, and webhook handling. For most Toronto operations, data, and marketing teams — Make.com is the right tool. For AI-heavy or code-intensive builds, we often combine Make.com with n8n.',
    servicesTitle: 'Make.com Services in Toronto',
    servicesSub: 'End-to-end Make.com scenario builds — from simple app connections to complex multi-route automation systems — by certified Make.com specialists.',
    serviceCards: [
      {label:'Core Build',title:'Custom Scenario Development',desc:'Bespoke Make.com scenarios built for your Toronto business — multi-module, multi-route, with proper error handling, filters, and data transformation. Built to run reliably in production, not just in test mode.',href:'/services/marketing-automation'},
      {label:'CRM Sync',title:'CRM & Sales Automation',desc:'Automated data flows between HubSpot, Salesforce, GoHighLevel, Pipedrive, and your other sales tools — triggered by form submissions, deal stage changes, or calendar bookings.',href:'/services/hubspot'},
      {label:'Ecommerce',title:'Ecommerce & Shopify Automation',desc:'Connect Shopify, WooCommerce, or custom ecommerce platforms to your CRM, email platform, fulfilment tools, and customer support systems — automated order processing, inventory alerts, and review requests.',href:'/services/ecommerce-seo'},
      {label:'Marketing',title:'Marketing Automation Scenarios',desc:'Automate your Toronto marketing stack — new lead routing from Facebook/Google Ads into CRM, email sequence triggers, Slack/Teams notifications, and social media scheduling workflows.',href:'/services/marketing-automation'},
      {label:'Reporting',title:'Data & Reporting Automation',desc:'Pull data from Google Ads, GA4, Meta, HubSpot, and your database into unified dashboards automatically — eliminating weekly manual reporting for Toronto operations and marketing teams.',href:'/services/analytics'},
      {label:'Webhooks',title:'Webhook & API Integration',desc:'Connect any tool that offers webhooks or APIs — even without a native Make.com module. We build HTTP modules, custom data parsers, and webhook routers for Toronto businesses\' unique tech stacks.',href:'/services/marketing-automation'},
      {label:'AI',title:'AI-Powered Scenarios',desc:'Integrate OpenAI, Claude, or Gemini into Make.com scenarios — AI that classifies inbound leads, drafts email replies, analyses form data, or summarises documents as part of automated workflows.',href:'/services/marketing-automation'},
      {label:'Training',title:'Make.com Training & Handoff',desc:'Structured Make.com training for your Toronto team — covering scenario building, module configuration, error handling, and operations monitoring. Includes recorded walkthroughs for reference.',href:'/services/marketing-automation'}
    ],
    whyTitle: 'Why Toronto Businesses Choose Bambino for Make.com',
    whyCards: [
      {title:'Certified Make.com Expertise — Not YouTube Learning',desc:'Bambino\'s Make.com specialists are certified and have built 150+ production scenarios. We know the edge cases: iterator limits, incomplete bundles, webhook replay, data store best practices — the things that break poorly built scenarios in production.'},
      {title:'Business-First Automation Design',desc:'We start with your Toronto business processes, not the tool. Before opening Make.com, we map your data flows, identify bottlenecks, and design the automation architecture — so scenarios solve real problems rather than just connecting apps for the sake of it.'},
      {title:'Reliable Error Handling — Scenarios That Don\'t Break Silently',desc:'Every Bambino Make.com build includes proper error handlers, retry configurations, and monitoring alerts. We also document every scenario thoroughly so your Toronto team can understand and maintain it without us.'},
      {title:'Combined Make.com + n8n Strategy',desc:'Make.com excels at visual, no-code automations. n8n handles complex code-heavy workflows. For Toronto businesses with both types of automation need, we design hybrid stacks — Make.com for the common cases, n8n for the edge cases that need custom logic.'}
    ],
    processTitle: 'Our Toronto Make.com Implementation Process',
    processSub: 'A systematic approach to Make.com scenario development — from process mapping to production-grade deployment.',
    processSteps: [
      {num:'1',title:'Process Discovery',desc:'Map your Toronto business\'s manual processes and data flows. Identify automation opportunities ranked by time saved and implementation complexity.'},
      {num:'2',title:'Scenario Design',desc:'Design the Make.com scenario architecture — module sequences, data mapping, routing logic, and error paths — reviewed with your team before building starts.'},
      {num:'3',title:'Build & Test',desc:'Build scenarios with proper module configuration, data transformation, and error handling. Tested with real data including edge cases before deployment.'},
      {num:'4',title:'Deploy & Monitor',desc:'Activate scenarios in production with monitoring and error notification setup. Verify execution logs for the first 7 days to catch any unexpected edge cases.'},
      {num:'5',title:'Train & Expand',desc:'Train your Toronto team on scenario management. Begin monthly retainer for new scenario builds, optimisations, and ongoing support as your automation stack grows.'}
    ],
    resultsStats: [
      {stat:'16 hrs',desc:'Avg. weekly hours saved',detail:'Per Toronto client across Make.com implementations covering CRM sync, lead routing, reporting, and marketing automation scenarios.'},
      {stat:'8',desc:'Avg. scenarios per implementation',detail:'Across initial Make.com implementations — covering the top automation opportunities identified in discovery, built and tested in sequence.'},
      {stat:'98%',desc:'Scenario reliability rate',detail:'Production scenarios built by Bambino maintain a 98%+ successful execution rate — driven by proper error handling, retry logic, and monitoring.'}
    ],
    industriesTitle: 'Make.com Automation for Toronto Industries',
    industriesSub: 'Every Toronto industry has automatable processes. Our certified Make.com specialists have built scenarios across:',
    industryPills: ['Marketing Agencies','SaaS & Tech','Ecommerce','Professional Services','Real Estate','Healthcare Operations','Finance','Data Teams'],
    pricingTitle: 'Make.com Agency Pricing for Toronto Businesses',
    pricingSub: 'All prices in CAD. Flat project fees + optional monthly management retainers. No long-term contracts.',
    pricingPlans: [
      {name:'Starter',price:'900',period:'per scenario + HST/GST',desc:'Single Make.com scenario build — up to 15 modules, 2 integrations, error handling, and documentation.',featured:false,features:['Up to 15-module scenario','2 app integrations','Error handling & filters','Operations monitoring','Scenario documentation'],cta:'Get Started →'},
      {name:'Growth',price:'3,200',period:'scenario bundle + HST/GST',desc:'5-scenario bundle for Toronto teams — CRM sync, lead routing, reporting, and communication automations.',featured:true,features:['5 custom scenario builds','Up to 4 integrations each','AI module integration','Make.com plan optimisation','Team training included','Monthly retainer (CA$700/mo)'],cta:'Get Started →'},
      {name:'Scale',price:'7,000',period:'automation stack + HST/GST',desc:'Full Make.com automation stack — 10+ scenarios, AI integration, data pipeline builds, and ongoing management.',featured:false,features:['10+ scenario builds','AI-powered scenarios','Data store configuration','Custom webhook handlers','Reporting pipeline builds','Monthly retainer (CA$1,400/mo)'],cta:'Get Started →'},
      {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke Make.com programmes for complex Toronto operations — high-volume, multi-department, or AI-heavy requirements.',featured:false,features:['Unlimited scenario builds','Dedicated Make.com architect','Custom AI integrations','SLA & priority support','Quarterly strategy reviews'],cta:'Talk to Us →'}
    ],
    otherServicesTitle: 'More Automation Services in Toronto',
    otherServicesSub: 'Make.com is one part of your automation stack. Explore related services for Toronto businesses.',
    otherServiceCards: [
      {href:'/ca/toronto/n8n-agency',label:'Related',title:'n8n Agency Toronto',desc:'n8n for complex, code-heavy workflows that exceed Make.com\'s visual builder — the perfect complement to your Make.com stack.'},
      {href:'/ca/toronto/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Toronto',desc:'GHL CRM implementation with Make.com scenarios connecting GoHighLevel to the rest of your Toronto tech stack.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full marketing automation strategy across Make.com, n8n, HubSpot, and AI-powered custom builds.'},
      {href:'/ca/toronto/seo-agency',label:'Also Available',title:'SEO Agency Toronto',desc:'Organic search for Toronto businesses — long-term rankings alongside your automation investment.'}
    ],
    faqTitle: 'Make.com Agency Toronto — FAQs',
    faqItems: [
      {q:'How much does Make.com automation cost in Toronto?',a:'Bambino charges CA$900 per scenario for standard builds, CA$3,200 for a 5-scenario bundle, and CA$7,000 for a full automation stack. Ongoing monthly management retainers start at CA$700/month. All prices exclude HST. Complex AI-integrated scenarios are priced on discovery.'},
      {q:'What\'s the difference between Make.com and Zapier?',a:'Make.com is significantly more powerful than Zapier for complex automations. Key advantages: visual scenario builder (vs. Zapier\'s linear flow), complex data transformation (JSON parsing, array operations, math), multi-route branching logic, higher execution volumes at lower cost, and better error handling. For Toronto businesses doing more than simple app connections, Make.com is almost always the better choice.'},
      {q:'Can Make.com replace my manual reporting process?',a:'Yes. We build Make.com scenarios that automatically pull data from Google Ads, GA4, Meta, your CRM, and any other tools with an API — transform and aggregate it, then push to Google Sheets, Looker Studio, or Airtable. Toronto operations and marketing teams typically save 4–8 hours per week on manual reporting after implementation.'},
      {q:'How long does Make.com scenario development take?',a:'Single scenario builds take 3–7 days from discovery to deployment. A 5-scenario bundle takes 2–3 weeks. Full automation stacks (10+ scenarios) typically take 4–6 weeks. Timeline depends on the number of integrations, API documentation quality, and your team\'s availability for testing feedback.'},
      {q:'Do you work with Make.com\'s AI modules?',a:'Yes. We integrate OpenAI, Anthropic Claude, and Google Gemini modules into Make.com scenarios — AI that classifies inbound leads by intent and company size, drafts personalised email responses, analyses form submissions, or summarises long documents as part of automated workflows.'},
      {q:'Can you connect Make.com to tools without native modules?',a:'Yes. For tools without native Make.com modules, we use HTTP request modules, webhook triggers, and custom data parsers to connect any app with an API or webhook capability. We\'ve connected Make.com to proprietary databases, legacy systems, and custom-built internal tools for Toronto clients.'},
      {q:'Do you offer Make.com training for Toronto teams?',a:'Yes. Every implementation includes team training sessions covering: scenario building, module configuration, error log interpretation, and basic debugging. We also provide recorded Loom walkthroughs your team can reference whenever they need to make changes or troubleshoot.'},
      {q:'Do you combine Make.com with n8n?',a:'For some Toronto clients, yes. Make.com handles the visual, no-code majority of automations — it\'s easier for non-technical teams to understand and maintain. n8n handles the complex, code-heavy edge cases that require JavaScript execution, self-hosting, or AI agent architecture. We design hybrid stacks where each tool does what it does best.'}
    ],
    relatedLabel: 'Other Canadian Cities',
    relatedTitle: 'Make.com Agency Services Across Canada',
    relatedSub: 'Bambino builds Make.com automations for businesses across Canada. Explore services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/vancouver/make-com-agency',text:'Vancouver Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/calgary/make-com-agency',text:'Calgary Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/toronto/n8n-agency',text:'Toronto n8n Agency →'},
      {href:'https://bambinoagency.com/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Automate Your Toronto Business with Make.com?',
    ctaSub: 'Book a free 30-minute Make.com discovery call. We\'ll map your top automation opportunities, walk you through what\'s possible, and give you a project estimate — with no obligation to proceed.',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/toronto/make-com-agency',text:'Toronto Make.com Agency'},
      {href:'/ca/vancouver/make-com-agency',text:'Vancouver Make.com Agency'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Toronto',
    footerLocalLinks: [
      {href:'/ca/toronto/n8n-agency',text:'n8n Agency'},
      {href:'/ca/toronto/gohighlevel-agency',text:'GoHighLevel Agency'},
      {href:'/ca/toronto/seo-agency',text:'SEO Agency'}
    ]
  },

  // ── AI SDR Canada (national services page) ───────────────────
  {
    outPath: 'services/ai-sdr-agency/index.html',
    lang: 'en',
    currency: 'USD',
    title: 'AI SDR Agency | AI Sales Development Setup & Automation | Bambino',
    metaDesc: 'AI SDR setup and management agency. Hybrid AI sales development systems — AI-powered prospecting, personalised outreach, and lead qualification for B2B businesses in Canada, UK, and USA. Free discovery call.',
    canonical: 'https://bambinoagency.com/services/ai-sdr-agency',
    ogTitle: 'AI SDR Agency | AI Sales Development Representative Setup | Bambino',
    ogDesc: 'Hybrid AI SDR systems — AI-powered prospecting, outreach, and lead qualification. Built for B2B businesses across Canada, UK, and USA.',
    ogLocale: 'en_GB',
    schemaDesc: 'AI SDR agency offering hybrid AI sales development representative setup and management. AI-powered prospecting, outreach, and lead qualification for B2B businesses globally.',
    schemaAreaType: 'AdministrativeArea', schemaArea: 'Canada',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Services',url:'https://bambinoagency.com/services'},
      {name:'AI SDR Agency',url:'https://bambinoagency.com/services/ai-sdr-agency'}
    ],
    heroLabel: 'AI Sales Development',
    heroTitle: 'AI SDR Agency — Hybrid AI Sales Development That Actually Books Meetings',
    heroSub: 'The fully autonomous AI SDR that replaces human sales reps didn\'t materialise in 2025. What did emerge — and what is generating real pipeline for B2B businesses in 2026 — is the hybrid AI SDR model: AI handles prospecting, personalisation, multi-channel sequencing, and initial qualification; human SDRs take over at the conversation stage. Bambino builds and manages these hybrid AI SDR systems for B2B companies across Canada, UK, and USA.',
    heroCTA1: 'Book a Free AI SDR Discovery Call →',
    heroCTA2: 'View Pricing',
    visualTitle: 'AI SDR Performance Snapshot',
    visualStats: [
      {label:'Avg. prospects researched/day',value:'200+',sub:'AI vs. 30-40 for human SDR'},
      {label:'Response time to inbound leads',value:'< 2 min',sub:'AI-triggered instant follow-up'},
      {label:'Pipeline increase (avg. 90 days)',value:'+67%',sub:'Across hybrid AI SDR implementations'}
    ],
    marketLabel: 'Market Context',
    marketTitle: 'The AI SDR Reality in 2026: Hybrid Models Win, Full Automation Doesn\'t',
    marketBody: 'The 2024–2025 wave of "fully autonomous AI SDRs" (Artisan, 11x.ai) promised to replace human sales teams entirely. By 2026, the data shows this narrative was premature — companies that deployed fully autonomous AI SDRs at scale largely reverted to hybrid models. The breakthrough that is working: AI handles the high-volume, low-judgement tasks (prospecting, research, personalisation, sequencing) while human SDRs engage at the conversation stage. Bambino builds this hybrid architecture — combining the best AI tools with human touchpoints at the moments that actually convert.',
    marketEeat: 'Bambino AI SDR implementations: average +67% pipeline increase within 90 days across hybrid AI SDR systems for B2B clients. Our builds combine Clay for data enrichment, AI-powered personalisation, multi-channel sequencing, and instant inbound lead response.',
    marketNote: 'Primarily B2B clients: SaaS companies, professional services, agencies, and technology businesses across Canada, UK, and USA.',
    marketStats: [
      {num:'200+',lbl:'Prospects researched/day by AI'},
      {num:'<2 min',lbl:'AI inbound response time'},
      {num:'+67%',lbl:'Avg. pipeline increase (90 days)'},
      {num:'85%',lbl:'Time saved on SDR admin tasks'}
    ],
    landscapeTitle: 'AI SDR Agency Competition: Tool Vendors vs. Strategy-Led Implementation',
    landscapeBody: 'The AI SDR market is dominated by tool vendors selling platforms (Artisan, AiSDR, Outreach, Amplemarket) — not agencies that design, build, and manage the complete AI SDR system. Most B2B businesses buy one of these tools and fail to unlock its potential because the real work is in: ICP definition, data enrichment stack, multi-channel sequencing design, messaging frameworks, and the handoff protocol between AI and human SDRs. Bambino is the agency that handles that implementation work.',
    landscapeCompetition: 'Low — few agencies offer strategy-led AI SDR system builds (vs. tool vendors)',
    landscapeLocalTitle: 'AI SDR for Canadian Businesses: CASL-Compliant Outbound',
    landscapeLocalBody: 'Canadian businesses face a specific compliance challenge with outbound email: CASL (Canada\'s Anti-Spam Legislation) requires implied or express consent before commercial electronic messages. Our AI SDR systems for Canadian clients are architected with CASL compliance from the ground up — using LinkedIn InMail and cold calling as primary first-touch channels where CASL restrictions are less stringent, with email used for follow-up after initial consent is established.',
    servicesTitle: 'AI SDR Services',
    servicesSub: 'End-to-end hybrid AI SDR system design, implementation, and management for B2B businesses across Canada, UK, and USA.',
    serviceCards: [
      {label:'Foundation',title:'ICP & Data Enrichment Stack',desc:'Define your Ideal Customer Profile with precision — firmographics, technographics, intent signals, and trigger events. Build the data enrichment stack (Clay, Apollo, LinkedIn Sales Navigator) that feeds your AI SDR with high-quality prospect data.',href:'/services/lead-generation'},
      {label:'AI Outreach',title:'AI-Powered Personalisation & Sequencing',desc:'Multi-channel outreach sequences — email, LinkedIn, cold call — with AI-powered personalisation based on prospect research, recent company news, job change triggers, and content engagement signals.',href:'/services/lead-generation'},
      {label:'Inbound AI',title:'AI Inbound Lead Response',desc:'Instant AI-powered response to inbound leads — within 2 minutes of form submission, demo request, or content download. AI qualifies the lead, personalises the response, and books a meeting before human SDRs are even notified.',href:'/services/marketing-automation'},
      {label:'Qualification',title:'AI Lead Qualification & Scoring',desc:'AI-powered lead qualification frameworks — BANT, MEDDIC, or custom — that assess prospect fit, intent, and buying stage from enriched data and initial response signals, routing qualified leads to human SDRs automatically.',href:'/services/lead-generation'},
      {label:'LinkedIn',title:'LinkedIn AI SDR Integration',desc:'AI-assisted LinkedIn outreach — automated connection requests with personalised notes, message sequences, and profile-triggered engagement designed to generate warm conversations at scale without violating LinkedIn\'s terms of service.',href:'/services/linkedin-ads'},
      {label:'CRM',title:'CRM Integration & Pipeline Automation',desc:'Full CRM integration — HubSpot, Salesforce, GoHighLevel, Pipedrive — with automated prospect import, activity logging, stage progression, and SDR handoff workflows triggered by AI qualification signals.',href:'/services/hubspot'},
      {label:'Analytics',title:'AI SDR Performance Reporting',desc:'Real-time dashboards tracking: prospects contacted, reply rates, meeting book rates, pipeline generated, cost-per-meeting, and AI vs. human SDR contribution — segmented by channel, sequence, and ICP segment.',href:'/services/analytics'},
      {label:'Compliance',title:'CASL & CAN-SPAM Compliance',desc:'Outbound systems architected for Canadian (CASL) and US (CAN-SPAM) compliance — suppression lists, unsubscribe handling, consent tracking, and channel strategy designed to generate pipeline without regulatory risk.',href:'/services/lead-generation'}
    ],
    whyTitle: 'Why B2B Companies Choose Bambino for AI SDR',
    whyCards: [
      {title:'Hybrid Model — Not Hype-Driven Full Automation',desc:'Bambino doesn\'t sell you a fully autonomous AI SDR that replaces your team. The data shows hybrid models outperform. We design systems where AI does what AI is good at — volume, research, personalisation — and humans handle what humans do better — trust, nuance, complex objections.'},
      {title:'Tool-Agnostic System Design',desc:'We\'re not tied to any single AI SDR platform. We evaluate Clay, Apollo, Amplemarket, Reply.io, Instantly, and Lemlist based on your specific ICP, volume, budget, and compliance requirements — then build the stack that fits your business, not the one that pays us a referral fee.'},
      {title:'CASL-Aware Canadian Outbound Architecture',desc:'Canadian outbound requires a different approach than US or UK. We architect AI SDR systems for Canadian businesses with CASL compliance at the centre — prioritising LinkedIn and warm channels, using email for follow-up, and building proper consent tracking into every workflow.'},
      {title:'End-to-End Implementation — Not Just Strategy',desc:'We don\'t hand you a playbook and wish you luck. Bambino builds the complete system: ICP definition, data stack setup, sequence copywriting, CRM integration, reporting dashboard, and SDR handoff protocols — then manages and optimises it month over month.'}
    ],
    processTitle: 'Our AI SDR Implementation Process',
    processSub: 'A structured 5-step AI SDR build — from ICP definition to first AI-booked meeting — delivered in 4–6 weeks.',
    processSteps: [
      {num:'1',title:'ICP & Market Definition',desc:'Define your Ideal Customer Profile with precision — target companies, decision-maker personas, trigger events, and disqualification criteria. The ICP is the foundation everything else is built on.'},
      {num:'2',title:'Data Stack Setup',desc:'Configure your data enrichment stack — Clay, Apollo, LinkedIn Sales Navigator, or equivalent — to source and enrich prospect data at scale. Quality data is the fuel for AI personalisation.'},
      {num:'3',title:'Sequence & Copy Design',desc:'Write multi-channel outreach sequences (email, LinkedIn, cold call scripts) with AI personalisation frameworks. A/B tested from day one, with clear handoff triggers for human SDRs.'},
      {num:'4',title:'CRM Integration & Automation',desc:'Integrate the full system with your CRM — automated prospect import, activity logging, AI qualification scoring, and SDR handoff workflows. Connect to your calendar for direct meeting booking.'},
      {num:'5',title:'Launch, Monitor & Optimise',desc:'Launch with daily monitoring of reply rates, meeting book rates, and bounce rates. Weekly optimisation sprints — message testing, ICP refinement, sequence adjustments — for the first 90 days.'}
    ],
    resultsStats: [
      {stat:'+67%',desc:'Avg. pipeline increase (90 days)',detail:'Across hybrid AI SDR implementations for B2B clients. Measured by qualified meetings booked and pipeline value attributed to AI SDR activity.'},
      {stat:'200+',desc:'Prospects researched per day',detail:'AI prospect research capacity vs. 30–40 for a human SDR working manually. Higher research volume = more targeted, better-qualified outreach.'},
      {stat:'< 2 min',desc:'Inbound lead response time',detail:'AI-triggered inbound response — form submissions, demo requests, and content downloads responded to in under 2 minutes with personalised, contextually relevant messages.'}
    ],
    industriesTitle: 'AI SDR for B2B Industries',
    industriesSub: 'The hybrid AI SDR model works across B2B verticals where outbound sales development generates pipeline.',
    industryPills: ['SaaS & Tech','Marketing Agencies','Professional Services','Consulting','Finance & Fintech','HR Tech','Legal Tech','Business Software'],
    pricingTitle: 'AI SDR Agency Pricing',
    pricingSub: 'Flat project fees for AI SDR system setup + optional monthly management retainers. No long-term contracts. Prices in USD or CAD depending on your location.',
    pricingPlans: [
      {name:'Setup',price:'3,500',period:'one-time setup (USD)',desc:'Complete AI SDR system setup for B2B companies. ICP definition, data stack configuration, 2 outreach sequences, CRM integration, and team training.',featured:false,features:['ICP & persona definition','Data enrichment stack setup','2 outreach sequences (email + LinkedIn)','CRM integration','Compliance setup (CASL/CAN-SPAM)','Team training & handoff'],cta:'Get Started →'},
      {name:'Growth',price:'2,200',period:'per month (USD)',desc:'AI SDR system management — ongoing sequence optimisation, new ICP segments, performance reporting, and monthly strategy reviews.',featured:true,features:['Everything in Setup (included)','Monthly sequence optimisation','New ICP segment launches','Performance dashboard','A/B message testing','Monthly strategy call'],cta:'Get Started →'},
      {name:'Scale',price:'4,800',period:'per month (USD)',desc:'Full AI SDR programme — multi-channel (email + LinkedIn + cold call AI), advanced data enrichment, intent signal integration, and weekly optimisation.',featured:false,features:['Everything in Growth','Multi-channel sequences','Intent signal integration','Advanced ICP segmentation','AI inbound response system','Weekly optimisation sprints'],cta:'Get Started →'},
      {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke AI SDR programmes for complex multi-region, multi-persona, or high-volume pipeline generation requirements.',featured:false,features:['Everything in Scale','Dedicated AI SDR strategist','Custom AI agent builds','SLA & priority support','Quarterly strategy reviews'],cta:'Talk to Us →'}
    ],
    faqTitle: 'AI SDR Agency — FAQs',
    faqItems: [
      {q:'What is an AI SDR?',a:'An AI SDR (AI Sales Development Representative) is an AI-powered system that automates the top-of-funnel sales development tasks traditionally done by human SDRs — prospect research, personalised outreach, multi-channel sequencing, and initial lead qualification. In 2026, the most effective model is hybrid: AI handles the high-volume tasks (research, personalisation, sequencing) while human SDRs take over at the conversation and closing stage.'},
      {q:'Does fully autonomous AI SDR work?',a:'The evidence in 2026 is mixed. Fully autonomous AI SDRs (where AI handles the entire outbound motion from research to close without human involvement) have not replaced human sales teams at scale. The companies that deployed tools like Artisan and 11x.ai as complete SDR replacements largely reverted to hybrid models. What does work is AI handling high-volume research and personalisation at scale, with human SDRs engaged at the point where trust and nuance matter.'},
      {q:'What tools do you use to build AI SDR systems?',a:'We are tool-agnostic and select the right stack based on your specific requirements. Common components: Clay (data enrichment and AI personalisation), Apollo or LinkedIn Sales Navigator (prospect sourcing), Reply.io, Instantly, or Lemlist (sequencing), your CRM (HubSpot, Salesforce, GoHighLevel, Pipedrive), and AI models (OpenAI, Claude) for personalisation and qualification logic.'},
      {q:'How long does AI SDR setup take?',a:'Standard AI SDR system setup takes 4–6 weeks from kickoff to first sequences launching: Week 1–2 for ICP definition and data stack setup, Week 2–3 for sequence copy and personalisation framework, Week 3–4 for CRM integration and compliance configuration, Week 4–6 for testing, team training, and launch.'},
      {q:'How do you handle CASL compliance for Canadian businesses?',a:'Canadian outbound operates under CASL, which requires implied or express consent before sending commercial electronic messages. For Canadian clients, we architect AI SDR systems that prioritise LinkedIn InMail and cold calling as first-touch channels (where CASL restrictions are less stringent), and use email for follow-up sequences after initial contact consent is established. We also build proper suppression lists and unsubscribe handling into every system.'},
      {q:'What results should I expect from an AI SDR system?',a:'Based on our implementations, realistic expectations for a hybrid AI SDR system after 90 days: 20–40% increase in prospects contacted per week, 15–30% increase in qualified meetings booked, 50–80% reduction in SDR time spent on research and data entry. Results vary significantly by industry, ICP quality, and message resonance. We set expectations in discovery based on your specific market and ICP.'},
      {q:'Do you offer ongoing AI SDR management?',a:'Yes. Monthly management retainers cover: sequence performance monitoring, A/B message testing, ICP refinement, new segment launches, data stack maintenance, and monthly strategy reviews. Retainers start at $2,200/month USD and are month-to-month with 30 days\' notice to cancel.'},
      {q:'Can you build AI SDR systems alongside existing sales tools?',a:'Yes. We integrate AI SDR systems with your existing CRM, calendar, and communication tools — rather than replacing them. If you have HubSpot, Salesforce, or GoHighLevel already deployed, we build the AI SDR layer on top, with proper bidirectional sync so every prospect touch is logged and visible to your sales team.'}
    ],
    relatedLabel: 'Related Services',
    relatedTitle: 'Related Services for B2B Pipeline Generation',
    relatedSub: 'AI SDR is one component of a complete B2B demand generation strategy. Explore complementary services:',
    relatedLinks: [
      {href:'https://bambinoagency.com/services/lead-generation',text:'Lead Generation →'},
      {href:'https://bambinoagency.com/ca/toronto/n8n-agency',text:'n8n Automation Agency →'},
      {href:'https://bambinoagency.com/services/marketing-automation',text:'Marketing Automation →'},
      {href:'https://bambinoagency.com/services/hubspot',text:'HubSpot Agency →'}
    ],
    ctaTitle: 'Ready to Build an AI SDR System That Generates Real Pipeline?',
    ctaSub: 'Book a free 30-minute AI SDR discovery call. We\'ll review your current outbound motion, identify your top 3 AI SDR opportunities, and walk you through what a properly built hybrid AI SDR system looks like — with no obligation to proceed.',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/toronto/n8n-agency',text:'Toronto n8n Agency'},
      {href:'/ca/toronto/make-com-agency',text:'Toronto Make.com Agency'},
      {href:'/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel Agency'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Related Services',
    footerLocalLinks: [
      {href:'/services/lead-generation',text:'Lead Generation'},
      {href:'/services/marketing-automation',text:'Marketing Automation'},
      {href:'/services/hubspot',text:'HubSpot Agency'},
      {href:'/services',text:'All Services →'}
    ]
  }
];

PAGES.forEach(p => {
  const outFile = path.join(__dirname, p.outPath);
  const dir = path.dirname(outFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(outFile, buildPage(p), 'utf8');
  console.log('✓ Generated:', p.outPath);
});
console.log('Done —', PAGES.length, 'pages generated.');
