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
          <div class="plan-price">${pl.price==='Custom'?'<span style="font-size:1.8rem;padding-top:0.4rem">Custom</span>':`<sup>$</sup>${pl.price}`}</div>
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
<html lang="en-US">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="description" content="${p.metaDesc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${p.canonical}" />
  <link rel="alternate" hreflang="en-US" href="${p.canonical}" />
  <link rel="alternate" hreflang="x-default" href="https://bambinoagency.com" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${p.ogTitle}" />
  <meta property="og:description" content="${p.ogDesc}" />
  <meta property="og:url" content="${p.canonical}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content="https://bambinoagency.com/img/og-default.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[{"@type":["LocalBusiness","MarketingAgency"],"name":"Bambino","url":"https://bambinoagency.com","logo":"https://bambinoagency.com/img/og-default.jpg","description":"${p.schemaDesc}","address":{"@type":"PostalAddress","addressLocality":"Manchester","addressCountry":"GB"},"areaServed":{"@type":"City","name":"${p.schemaCity}","containedInPlace":{"@type":"AdministrativeArea","name":"${p.schemaState}"}},"priceRange":"$$$","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127","bestRating":"5"},"datePublished":"2026-04-25","dateModified":"2026-04-25"},{"@type":"BreadcrumbList","itemListElement":[${bcSchema}]},{"@type":"FAQPage","mainEntity":[${faqSchema}]}]}
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
        <a href="https://bambinoagency.com/us" role="listitem">USA</a>
        <a href="https://bambinoagency.com/ca" role="listitem">Canada</a>
        <a href="https://bambinoagency.com/pricing" role="listitem">Pricing</a>
        <a href="https://bambinoagency.com/about" role="listitem">About</a>
        <a href="https://bambinoagency.com/contact" class="nav-cta" role="listitem">Free Audit</a>
      </div>
      <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-menu" role="dialog" aria-label="Mobile menu">
    <a href="https://bambinoagency.com/services">Services</a>
    <a href="https://bambinoagency.com/us">USA</a>
    <a href="https://bambinoagency.com/ca">Canada</a>
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
        <p class="section-sub" style="margin:0 auto">Benchmarks from 400+ GoHighLevel and marketing implementations across the US, UK, and Canada.</p>
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
        <span class="section-label">USD Pricing</span>
        <h2 id="pricing-heading" class="section-title">${p.pricingTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.pricingSub}</p>
      </div>
      <div class="pricing-grid" style="margin-top:2.5rem">${pricingHtml}</div>
      <p style="text-align:center;margin-top:1.5rem;font-size:0.85rem;color:var(--muted)">All prices in USD. <a href="https://bambinoagency.com/pricing" style="color:var(--orange);font-weight:600">See full pricing &rarr;</a></p>
    </div>
  </section>

  <section id="other-services" aria-labelledby="other-svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Related Services</span>
        <h2 id="other-svc-heading" class="section-title">${p.otherServicesTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.otherServicesSub}</p>
      </div>
      <div class="svc-grid">${otherSvcHtml}</div>
    </div>
  </section>

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
        <a href="https://bambinoagency.com/us" class="related-card reveal">View All US Cities &rarr;</a>
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
          <p class="footer-brand-desc">Award-winning digital marketing agency serving businesses across the US, UK, and Canada. Data-driven SEO, paid media, and AI-powered growth strategies.</p>
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

// ─── SHARED GHL CONSTANTS ─────────────────────────────────────────

const GHL_SERVICE_CARDS = (city) => [
  {label:'CRM Setup',title:'GoHighLevel CRM Setup & Configuration',desc:`Full GHL CRM architecture for ${city} businesses — pipelines, custom fields, tags, team permissions, and dashboard configuration. Built for your sales process, not a generic template.`,href:'/services/gohighlevel'},
  {label:'Funnels',title:'Funnel & Landing Page Builds',desc:'High-converting GoHighLevel funnels and landing pages — lead capture, webinar registration, sales pages, and VSL funnels — built and A/B-tested for your target audience.',href:'/services/gohighlevel'},
  {label:'Automation',title:'Workflow & Automation Sequences',desc:'GHL automation workflows — lead nurture sequences, appointment reminders, post-purchase follow-ups, re-engagement campaigns, and internal team notifications triggered by CRM events.',href:'/services/marketing-automation'},
  {label:'White Label',title:'White-Label GoHighLevel SaaS Setup',desc:`Configure GoHighLevel as a white-label SaaS platform for ${city} agencies — custom domain, branded mobile app, sub-account structure, and automated onboarding for your clients.`,href:'/services/gohighlevel'},
  {label:'Integrations',title:'Third-Party Integrations & API Connections',desc:'Connect GoHighLevel to your full tech stack — Stripe, Calendly, Zapier, Make.com, n8n, Meta Ads, Google Ads, and hundreds of other tools via native integrations and webhook automation.',href:'/services/marketing-automation'},
  {label:'Migration',title:'CRM Migration to GoHighLevel',desc:'Migrate from HubSpot, Salesforce, ActiveCampaign, Zoho, or any other CRM into GoHighLevel — contacts, pipeline data, tags, custom fields, and automation sequences rebuilt natively in GHL.',href:'/services/gohighlevel'},
  {label:'Reporting',title:'GHL Reporting & Dashboard Setup',desc:'Custom GoHighLevel dashboards and reporting — lead source attribution, pipeline velocity, conversion rates, and campaign ROI — configured for your KPIs and reviewed in monthly strategy calls.',href:'/services/analytics'},
  {label:'Management',title:'Ongoing GHL Management & Optimisation',desc:`Monthly GoHighLevel management retainer for ${city} businesses — campaign monitoring, workflow optimisation, A/B testing, new automation builds, and account health checks.`,href:'/services/gohighlevel'}
];

const GHL_WHY_CARDS = (city) => [
  {title:'Certified GHL Specialists — Not Generalists',desc:'Bambino\'s team holds GoHighLevel certification and has delivered 400+ GHL implementations. We know GHL\'s constraints, workarounds, and optimisation levers — and we build production systems, not tutorial recreations.'},
  {title:`${city} Market Knowledge`,desc:`We understand ${city}'s business ecosystem and the competitive landscape your GHL system needs to win in. Local market context shapes how we architect pipelines, write automation copy, and configure conversion workflows.`},
  {title:'Strategy-Led, Not Template-Driven',desc:'Every Bambino GHL implementation starts with a strategy session — mapping your sales process, identifying automation opportunities, and designing a CRM architecture that matches how your business actually generates revenue.'},
  {title:'Month-to-Month — No Long Contracts',desc:'All Bambino GHL management retainers are month-to-month with 30 days\' notice to cancel. We earn your business every month through results, not contract lock-in.'}
];

const GHL_PROCESS_STEPS = (city) => [
  {num:'1',title:'Discovery & Strategy',desc:`30-minute call to map your ${city} business's sales process, current tech stack, and GoHighLevel goals. We audit your existing CRM (if any) before designing the GHL architecture.`},
  {num:'2',title:'GHL Architecture Design',desc:'Design the full CRM structure — pipeline stages, custom fields, tag taxonomy, sub-account setup — and automation workflow map. Reviewed with your team before building starts.'},
  {num:'3',title:'Build & Configure',desc:'Build the full GoHighLevel account: CRM, funnels, automations, integrations, and reporting dashboards. Includes test data runs to verify all workflows fire correctly.'},
  {num:'4',title:'Migration & Launch',desc:'Migrate existing contacts and pipeline data. Launch with your team and run live test conversions to confirm all automations trigger correctly end-to-end.'},
  {num:'5',title:'Train & Optimise',desc:`Train your ${city} team on day-to-day GHL operations. Begin monthly management retainer — monitoring performance, optimising workflows, and building new automations.`}
];

const GHL_RESULTS = [
  {stat:'14 hrs',desc:'Avg. weekly hours saved',detail:'Per GHL implementation across CRM management, lead follow-up, reporting, and manual data entry that GoHighLevel automates.'},
  {stat:'2–4 wks',desc:'Standard implementation time',detail:'From discovery call to fully operational GoHighLevel account. White-label SaaS builds or large CRM migrations take 4–8 weeks.'},
  {stat:'97%',desc:'Client retention rate',detail:'Across all Bambino GHL management clients. Month-to-month retainers — retained because of results, not contracts.'}
];

const GHL_PRICING = [
  {name:'Starter',price:'1,500',period:'one-time setup',desc:'GoHighLevel account setup for small businesses — CRM, 1 pipeline, 3 automation workflows, and team training.',featured:false,features:['GHL account configuration','1 sales pipeline build','3 automation workflows','Integrations (up to 3)','Team training session'],cta:'Get Started →'},
  {name:'Growth',price:'4,500',period:'one-time setup',desc:'Full GHL implementation — CRM, funnels, automations, integrations, and 90-day management included.',featured:true,features:['Full CRM architecture','3 funnel/landing page builds','10 automation workflows','All integrations','Migration from existing CRM','90-day management included'],cta:'Get Started →'},
  {name:'Scale',price:'9,500',period:'one-time setup',desc:'Enterprise GHL build — white-label SaaS setup, multi-pipeline, advanced automation, and ongoing management.',featured:false,features:['White-label SaaS configuration','Unlimited pipelines','Advanced automation sequences','API & webhook integrations','Full CRM migration','Monthly retainer ($1,200/mo)'],cta:'Get Started →'},
  {name:'Management',price:'900',period:'per month',desc:'Monthly GoHighLevel management retainer — monitoring, optimisation, new workflows, and account support.',featured:false,features:['Monthly strategy call','Workflow monitoring & fixes','New automation builds','A/B testing','Performance reporting','Priority support'],cta:'Get Started →'}
];

const GHL_INDUSTRY_PILLS = ['Marketing Agencies','Real Estate','Coaches & Consultants','Healthcare','Legal Services','Home Services','SaaS Companies','Ecommerce'];

// ─── CITIES ───────────────────────────────────────────────────────

const CITIES = [

  // ── Austin, TX ───────────────────────────────────────────────
  {
    outPath: 'us/austin/gohighlevel-agency/index.html',
    schemaCity: 'Austin', schemaState: 'Texas',
    title: 'GoHighLevel Agency Austin, TX | Certified GHL Setup & CRM Automation | Bambino',
    metaDesc: 'Certified GoHighLevel agency in Austin. CRM setup, funnel builds, automation workflows, and white-label SaaS for Texas businesses. GoHighLevel alternative to HubSpot. Free discovery call.',
    canonical: 'https://bambinoagency.com/us/austin/gohighlevel-agency',
    ogTitle: 'GoHighLevel Agency Austin | Certified GHL Setup & CRM Automation | Bambino',
    ogDesc: 'Certified GoHighLevel agency in Austin TX. CRM setup, funnel builds, automation workflows, and white-label SaaS for Texas businesses. Free discovery call.',
    schemaDesc: 'Certified GoHighLevel agency serving Austin, TX. Full GHL CRM setup, funnel builds, automation workflows, and white-label SaaS configuration for Texas businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'USA',url:'https://bambinoagency.com/us'},
      {name:'GoHighLevel Agency Austin',url:'https://bambinoagency.com/us/austin/gohighlevel-agency'}
    ],
    heroLabel: 'Austin, TX',
    heroTitle: 'GoHighLevel Agency in Austin, TX — Certified GHL Setup, CRM & Automation',
    heroSub: 'Austin\'s tech startup scene, marketing agency community, and rapidly growing small business sector have made GoHighLevel one of the most-discussed CRM platforms in Texas. Bambino is a certified GoHighLevel agency serving Austin businesses — we implement, configure, and manage GHL accounts so your team can focus on growth rather than manual CRM admin. From SaaS company lead pipelines to marketing agency white-label setups, we build GHL systems that match how Austin businesses actually operate.',
    heroCTA1: 'Book a Free GHL Discovery Call →',
    heroCTA2: 'View USD Pricing',
    visualTitle: 'GHL Austin Snapshot',
    visualStats: [
      {label:'Avg. weekly hours saved',value:'14 hrs',sub:'Per GHL implementation'},
      {label:'Standard implementation',value:'2–4 wks',sub:'Discovery to live account'},
      {label:'Client retention rate',value:'97%',sub:'Month-to-month retainers'}
    ],
    marketLabel: 'Austin Market',
    marketTitle: 'GoHighLevel in Austin: Tech Hub Demand, Competitive Agency Landscape',
    marketBody: 'Austin\'s explosive tech growth — from Dell Technologies and Oracle\'s HQ relocation to a dense startup ecosystem in the Domain and East Austin — has created one of the most active GoHighLevel markets in the US. Austin\'s marketing agencies, SaaS companies, coaches, and real estate professionals are heavy GHL users. The platform\'s all-in-one CRM, funnel builder, and automation capabilities align perfectly with Austin\'s fast-moving, growth-obsessed business culture.',
    marketEeat: 'Bambino GHL data: average 14 hours/week saved across GHL implementations. Austin builds include SaaS company lead pipelines, marketing agency white-label setups, real estate automation, and coaching business CRM architectures.',
    marketNote: 'Austin verticals served: SaaS & tech companies, marketing agencies, real estate, coaches & consultants, professional services, healthcare, home services, and ecommerce brands.',
    marketStats: [
      {num:'978K',lbl:'City population'},
      {num:'2.3M',lbl:'Metro population'},
      {num:'TX',lbl:'No state income tax'},
      {num:'#11',lbl:'Largest US city'}
    ],
    landscapeTitle: 'GoHighLevel Agency Competition in Austin: A Crowded But Winnable Market',
    landscapeBody: 'Austin has a handful of GoHighLevel agencies — most are small boutique operations or freelancers positioning around the "Austin digital marketing agency" keyword cluster. Dedicated GHL-specific agency pages for Austin are limited. The main competition for "gohighlevel agency austin" comes from generalist agency pages that mention GHL alongside dozens of other services. A focused, well-built GHL-specific Austin page has a strong path to TOP-3.',
    landscapeCompetition: 'Low-Medium — a few boutique agencies, no dominant dedicated GHL specialists',
    landscapeLocalTitle: 'Why Austin Businesses Choose GoHighLevel',
    landscapeLocalBody: 'Austin\'s fast-growth business culture demands tools that consolidate function. GoHighLevel replaces 5–7 separate SaaS subscriptions — CRM, email marketing, SMS, funnel builder, appointment booking, reputation management, and reporting — into one platform. For Austin\'s cost-conscious startups and scaling agencies, that consolidation translates to $500–$2,000/month in SaaS savings alongside better automation capability.',
    servicesTitle: 'GoHighLevel Services in Austin, TX',
    servicesSub: 'Certified GHL implementation for Austin businesses — from CRM architecture to white-label SaaS configuration. Production builds, not templates.',
    serviceCards: GHL_SERVICE_CARDS('Austin'),
    whyTitle: 'Why Austin Businesses Choose Bambino for GoHighLevel',
    whyCards: GHL_WHY_CARDS('Austin'),
    processTitle: 'Our Austin GHL Implementation Process',
    processSub: 'A structured GoHighLevel implementation approach refined across 400+ GHL builds for US, UK, and Canadian businesses.',
    processSteps: GHL_PROCESS_STEPS('Austin'),
    resultsStats: GHL_RESULTS,
    industriesTitle: 'GoHighLevel for Austin Industries',
    industriesSub: 'Bambino has implemented GoHighLevel for Austin businesses across:',
    industryPills: GHL_INDUSTRY_PILLS,
    pricingTitle: 'GoHighLevel Pricing for Austin Businesses',
    pricingSub: 'All prices in USD. One-time setup fees + optional monthly management retainers. No long-term contracts.',
    pricingPlans: GHL_PRICING,
    otherServicesTitle: 'More Services for Austin Businesses',
    otherServicesSub: 'GoHighLevel is one part of your growth stack. Explore what else Bambino offers Austin businesses.',
    otherServiceCards: [
      {href:'/us/austin/seo-agency',label:'Related',title:'SEO Agency Austin',desc:'Organic search for Austin businesses — compound rankings that drive leads alongside your GHL automation.'},
      {href:'/us/austin/google-ads-agency',label:'Related',title:'Google Ads Agency Austin',desc:'Paid search for Austin businesses — leads flowing directly into your GHL pipelines.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'n8n, Make.com, and HubSpot automation extending your GHL stack for complex multi-system workflows.'},
      {href:'/us/austin/digital-marketing-agency',label:'Also Available',title:'Digital Marketing Agency Austin',desc:'Full-service digital marketing — SEO, PPC, social, and CRM automation working together.'}
    ],
    faqTitle: 'GoHighLevel Agency Austin — FAQs',
    faqItems: [
      {q:'How much does GoHighLevel setup cost in Austin?',a:'Bambino charges $1,500–$9,500 for GoHighLevel implementation in Austin, depending on complexity. The Growth package at $4,500 covers full CRM architecture, 3 funnel builds, 10 automation workflows, CRM migration, and 90 days of management. Ongoing GHL management retainers start at $900/month. All prices in USD.'},
      {q:'What GoHighLevel agencies are in Austin?',a:'Austin has a handful of boutique digital agencies that offer GHL as one of many services, but very few dedicated GoHighLevel specialists. Bambino offers certified GHL implementation — CRM architecture, funnel builds, and automation — as a core service rather than an add-on. We serve Austin businesses remotely across Central Time with dedicated GHL specialists.'},
      {q:'Is GoHighLevel good for Austin SaaS companies?',a:'Yes. Austin\'s SaaS companies use GoHighLevel for: inbound lead capture and CRM pipeline management, trial-to-paid nurture sequences, churn prevention automation, and customer success workflows. GHL\'s white-label capability also makes it ideal for Austin SaaS companies building their own CRM product on top of GHL\'s infrastructure.'},
      {q:'Can you set up GoHighLevel white-label SaaS for an Austin marketing agency?',a:'Yes. We configure GoHighLevel as a white-label SaaS platform for Austin agencies — custom domain and branding, sub-account structure for clients, automated client onboarding sequences, Stripe billing integration, and a branded mobile app. Austin agencies using GHL white-label generate significant recurring revenue from client CRM subscriptions.'},
      {q:'How long does GoHighLevel setup take for Austin businesses?',a:'Standard GHL implementation takes 2–4 weeks. White-label SaaS or CRM migration builds take 4–8 weeks. All implementation is delivered remotely — discovery calls, build reviews, and training conducted via video call in Central Time.'},
      {q:'Can you migrate our Austin business from HubSpot to GoHighLevel?',a:'Yes. We migrate contacts, pipeline data, tags, custom fields, and automation sequences from HubSpot into GoHighLevel. Most Austin businesses that migrate from HubSpot Professional to GoHighLevel save $400–$1,200/month in SaaS costs while gaining GHL\'s SMS, funnel builder, and reputation management capabilities that HubSpot charges extra for.'},
      {q:'Does GoHighLevel work for Austin real estate businesses?',a:'Yes. Austin\'s real estate market is one of the highest-velocity in the US — GoHighLevel is widely used by Austin realtors, brokers, and investors for lead capture, automated follow-up, appointment booking, and long-cycle buyer/seller nurture sequences. We build GHL pipelines mapped to Austin property transaction timelines.'},
      {q:'Is there a contract for GoHighLevel management in Austin?',a:'No long-term contracts. All Bambino GHL management retainers in Austin are month-to-month with 30 days\' notice to cancel. We earn your business every month through results.'}
    ],
    relatedLabel: 'Other US Cities',
    relatedTitle: 'GoHighLevel Agency Services Across the USA',
    relatedSub: 'Bambino implements GoHighLevel for businesses across the United States. Explore GHL services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/us/dallas/gohighlevel-agency',text:'Dallas GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/denver/gohighlevel-agency',text:'Denver GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/miami/gohighlevel-agency',text:'Miami GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/houston/gohighlevel-agency',text:'Houston GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Build Your GoHighLevel System in Austin?',
    ctaSub: 'Book a free 30-minute GHL discovery call. We\'ll map your sales process, show you what\'s possible with GoHighLevel, and provide a project estimate — no obligation.',
    footerCityLabel: 'US Cities',
    footerCityLinks: [
      {href:'/us/austin/gohighlevel-agency',text:'Austin GoHighLevel'},
      {href:'/us/dallas/gohighlevel-agency',text:'Dallas GoHighLevel'},
      {href:'/us/denver/gohighlevel-agency',text:'Denver GoHighLevel'},
      {href:'/us',text:'All US Cities →'}
    ],
    footerLocalLabel: 'Also in Austin',
    footerLocalLinks: [
      {href:'/us/austin/seo-agency',text:'SEO Agency'},
      {href:'/us/austin/google-ads-agency',text:'Google Ads Agency'},
      {href:'/us/austin/digital-marketing-agency',text:'Digital Marketing'}
    ]
  },

  // ── Dallas, TX ───────────────────────────────────────────────
  {
    outPath: 'us/dallas/gohighlevel-agency/index.html',
    schemaCity: 'Dallas', schemaState: 'Texas',
    title: 'GoHighLevel Agency Dallas, TX | Certified GHL Setup & CRM Automation | Bambino',
    metaDesc: 'Certified GoHighLevel agency in Dallas. CRM setup, funnel builds, automation workflows, and white-label SaaS for DFW businesses. GHL specialists. Free discovery call.',
    canonical: 'https://bambinoagency.com/us/dallas/gohighlevel-agency',
    ogTitle: 'GoHighLevel Agency Dallas | Certified GHL Setup & CRM Automation | Bambino',
    ogDesc: 'Certified GoHighLevel agency in Dallas TX. CRM setup, funnel builds, automation workflows, and white-label SaaS for DFW businesses. Free discovery call.',
    schemaDesc: 'Certified GoHighLevel agency serving Dallas, TX. Full GHL CRM setup, funnel builds, automation workflows, and white-label SaaS for DFW businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'USA',url:'https://bambinoagency.com/us'},
      {name:'GoHighLevel Agency Dallas',url:'https://bambinoagency.com/us/dallas/gohighlevel-agency'}
    ],
    heroLabel: 'Dallas, TX',
    heroTitle: 'GoHighLevel Agency in Dallas, TX — Certified GHL Setup, CRM & Automation',
    heroSub: 'Dallas-Fort Worth is one of the fastest-growing business markets in the US — and one of GoHighLevel\'s strongest adoption markets. DFW\'s real estate sector, financial services firms, marketing agencies, and B2B professional services businesses are all heavy GHL users. Bambino is a certified GoHighLevel agency serving Dallas businesses — we implement and manage GHL so your CRM, automation, and client communication runs without manual effort from your team.',
    heroCTA1: 'Book a Free GHL Discovery Call →',
    heroCTA2: 'View USD Pricing',
    visualTitle: 'GHL Dallas Snapshot',
    visualStats: [
      {label:'Avg. weekly hours saved',value:'14 hrs',sub:'Per GHL implementation'},
      {label:'Standard implementation',value:'2–4 wks',sub:'Discovery to live account'},
      {label:'Client retention rate',value:'97%',sub:'Month-to-month retainers'}
    ],
    marketLabel: 'Dallas Market',
    marketTitle: 'GoHighLevel in Dallas: High-Volume B2B Demand in a Major Growth Market',
    marketBody: 'Dallas-Fort Worth is the fourth-largest metro in the US and one of the most business-active markets in the country — home to 23 Fortune 500 HQs, a booming real estate market, a dense financial services sector, and a rapidly growing agency ecosystem. GoHighLevel adoption in DFW is driven by real estate professionals, marketing agencies, healthcare practices, and B2B services firms looking to consolidate their CRM, automation, and marketing into one platform. The scale of Dallas business means GHL implementations need to handle high contact volumes and complex multi-pipeline architectures.',
    marketEeat: 'Bambino GHL data: average 14 hours/week saved per DFW implementation. Dallas builds include high-volume real estate pipelines, financial services CRM automation, B2B professional services lead routing, and marketing agency white-label SaaS setups.',
    marketNote: 'Dallas verticals served: real estate, financial services, marketing agencies, B2B professional services, healthcare, legal services, home services, and corporate training.',
    marketStats: [
      {num:'1.3M',lbl:'City population'},
      {num:'7.8M',lbl:'DFW Metro population'},
      {num:'23',lbl:'Fortune 500 HQs in DFW'},
      {num:'#4',lbl:'Largest US metro'}
    ],
    landscapeTitle: 'GoHighLevel Agency Competition in Dallas: Active But Beatable',
    landscapeBody: 'Dallas has more GHL agency competition than Austin — the larger market size has attracted more generalist digital agencies positioning around GoHighLevel. However, dedicated GoHighLevel specialist agency pages for Dallas (vs. general "digital marketing" pages that mention GHL) are limited. A well-built, GHL-specific Dallas page with proper schema, comprehensive FAQ, and local market context competes strongly against generic national agency pages and local generalists.',
    landscapeCompetition: 'Medium — several digital agencies mention GHL, few are dedicated specialists',
    landscapeLocalTitle: 'Why Dallas Businesses Choose GoHighLevel',
    landscapeLocalBody: 'Dallas\'s high-volume B2B and real estate markets demand CRM systems that scale. GoHighLevel handles Dallas real estate agents managing hundreds of leads simultaneously, DFW marketing agencies building white-label platforms for clients, and B2B service firms running complex multi-stage nurture sequences. The platform\'s consolidation of CRM, SMS, email, funnels, and reporting into one tool is especially valued in Dallas\'s cost-efficient, ROI-focused business culture.',
    servicesTitle: 'GoHighLevel Services in Dallas, TX',
    servicesSub: 'Certified GHL implementation for Dallas and DFW businesses — CRM, funnels, automations, and white-label SaaS. Built for DFW\'s high-volume, competitive market.',
    serviceCards: GHL_SERVICE_CARDS('Dallas'),
    whyTitle: 'Why Dallas Businesses Choose Bambino for GoHighLevel',
    whyCards: GHL_WHY_CARDS('Dallas'),
    processTitle: 'Our Dallas GHL Implementation Process',
    processSub: 'A structured GoHighLevel implementation approach refined across 400+ GHL builds for US, UK, and Canadian businesses.',
    processSteps: GHL_PROCESS_STEPS('Dallas'),
    resultsStats: GHL_RESULTS,
    industriesTitle: 'GoHighLevel for Dallas Industries',
    industriesSub: 'Bambino has implemented GoHighLevel for Dallas and DFW businesses across:',
    industryPills: ['Real Estate','Financial Services','Marketing Agencies','B2B Professional Services','Healthcare','Legal Services','Home Services','Corporate Training'],
    pricingTitle: 'GoHighLevel Pricing for Dallas Businesses',
    pricingSub: 'All prices in USD. One-time setup fees + optional monthly management retainers. No long-term contracts.',
    pricingPlans: GHL_PRICING,
    otherServicesTitle: 'More Services for Dallas Businesses',
    otherServicesSub: 'GoHighLevel is one part of your growth stack. Explore what else Bambino offers Dallas and DFW businesses.',
    otherServiceCards: [
      {href:'/us/dallas/seo-agency',label:'Related',title:'SEO Agency Dallas',desc:'Organic search for Dallas businesses — compound rankings feeding leads into your GHL pipelines.'},
      {href:'/us/dallas/google-ads-agency',label:'Related',title:'Google Ads Agency Dallas',desc:'Paid search for DFW businesses — leads flowing directly into your GoHighLevel CRM.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'n8n and Make.com automation extending your GHL stack for complex multi-system enterprise workflows.'},
      {href:'/us/dallas/digital-marketing-agency',label:'Also Available',title:'Digital Marketing Agency Dallas',desc:'Full-service digital marketing for DFW — SEO, PPC, social, and CRM automation.'}
    ],
    faqTitle: 'GoHighLevel Agency Dallas — FAQs',
    faqItems: [
      {q:'How much does GoHighLevel setup cost in Dallas?',a:'Bambino charges $1,500–$9,500 for GoHighLevel implementation in Dallas, depending on complexity. The Growth package at $4,500 covers full CRM architecture, 3 funnel builds, 10 automation workflows, CRM migration, and 90 days of management. Ongoing GHL management retainers start at $900/month. All prices in USD.'},
      {q:'What GoHighLevel agencies are in Dallas?',a:'Dallas has several digital agencies that offer GoHighLevel as one of many services. Bambino operates as a dedicated GHL specialist — CRM architecture, funnel builds, automation, and white-label SaaS — not a generalist agency that mentions GHL alongside SEO and social media. We serve Dallas and DFW businesses remotely across Central Time.'},
      {q:'Is GoHighLevel suitable for Dallas real estate businesses?',a:'Yes — GoHighLevel is the dominant CRM platform in the Dallas real estate market. DFW realtors, brokers, investors, and mortgage professionals use GHL for lead capture, automated follow-up sequences, appointment booking, long-cycle buyer and seller nurture, and team pipeline management. We build GHL systems mapped to DFW transaction timelines and lead volumes.'},
      {q:'Can GoHighLevel handle high contact volumes for large Dallas businesses?',a:'Yes. GoHighLevel scales to large contact databases and high-volume automation. For Dallas businesses with 10,000+ contacts, we architect GHL with proper tag taxonomy, segmented pipeline structures, and automation workflows that trigger based on contact attributes rather than manual actions — ensuring the system performs reliably at scale.'},
      {q:'Can you build GoHighLevel white-label SaaS for a Dallas marketing agency?',a:'Yes. We configure GoHighLevel white-label for Dallas agencies — custom domain, branded mobile app, sub-account architecture, Stripe billing, and automated client onboarding. Dallas marketing agencies using GHL white-label typically generate $200–$500/month per client in recurring CRM subscription revenue.'},
      {q:'How long does GoHighLevel implementation take in Dallas?',a:'Standard GHL implementation takes 2–4 weeks. White-label SaaS or large CRM migrations take 4–8 weeks. All work is delivered remotely across Central Time — discovery calls, build reviews, and training via video call.'},
      {q:'Can you migrate our Dallas business from Salesforce to GoHighLevel?',a:'Yes. We migrate contact data, pipeline records, custom fields, tags, and rebuild automation sequences from Salesforce into GoHighLevel. Most Dallas businesses that move from Salesforce to GHL save $800–$2,500/month in Salesforce licensing while gaining GHL\'s built-in SMS, funnels, and reputation management.'},
      {q:'Is there a minimum contract for GoHighLevel management in Dallas?',a:'No. All Bambino GHL management retainers in Dallas are month-to-month with 30 days\' notice to cancel. No annual contracts, no setup fees beyond the initial implementation cost.'}
    ],
    relatedLabel: 'Other US Cities',
    relatedTitle: 'GoHighLevel Agency Services Across the USA',
    relatedSub: 'Bambino implements GoHighLevel for businesses across the United States. Explore GHL services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/us/austin/gohighlevel-agency',text:'Austin GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/denver/gohighlevel-agency',text:'Denver GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/houston/gohighlevel-agency',text:'Houston GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/miami/gohighlevel-agency',text:'Miami GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Build Your GoHighLevel System in Dallas?',
    ctaSub: 'Book a free 30-minute GHL discovery call. We\'ll map your sales process, show you what\'s possible with GoHighLevel, and give you a project estimate — no obligation.',
    footerCityLabel: 'US Cities',
    footerCityLinks: [
      {href:'/us/dallas/gohighlevel-agency',text:'Dallas GoHighLevel'},
      {href:'/us/austin/gohighlevel-agency',text:'Austin GoHighLevel'},
      {href:'/us/denver/gohighlevel-agency',text:'Denver GoHighLevel'},
      {href:'/us',text:'All US Cities →'}
    ],
    footerLocalLabel: 'Also in Dallas',
    footerLocalLinks: [
      {href:'/us/dallas/seo-agency',text:'SEO Agency'},
      {href:'/us/dallas/google-ads-agency',text:'Google Ads Agency'},
      {href:'/us/dallas/digital-marketing-agency',text:'Digital Marketing'}
    ]
  },

  // ── Denver, CO ───────────────────────────────────────────────
  {
    outPath: 'us/denver/gohighlevel-agency/index.html',
    schemaCity: 'Denver', schemaState: 'Colorado',
    title: 'GoHighLevel Agency Denver, CO | Certified GHL Setup & CRM Automation | Bambino',
    metaDesc: 'Certified GoHighLevel agency in Denver. CRM setup, funnel builds, automation workflows, and white-label SaaS for Colorado businesses. GHL specialists. Free discovery call.',
    canonical: 'https://bambinoagency.com/us/denver/gohighlevel-agency',
    ogTitle: 'GoHighLevel Agency Denver | Certified GHL Setup & CRM Automation | Bambino',
    ogDesc: 'Certified GoHighLevel agency in Denver CO. CRM setup, funnel builds, automation workflows, and white-label SaaS for Colorado businesses. Free discovery call.',
    schemaDesc: 'Certified GoHighLevel agency serving Denver, CO. Full GHL CRM setup, funnel builds, automation workflows, and white-label SaaS configuration for Colorado businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'USA',url:'https://bambinoagency.com/us'},
      {name:'GoHighLevel Agency Denver',url:'https://bambinoagency.com/us/denver/gohighlevel-agency'}
    ],
    heroLabel: 'Denver, CO',
    heroTitle: 'GoHighLevel Agency in Denver, CO — Certified GHL Setup, CRM & Automation',
    heroSub: 'Denver\'s outdoor lifestyle brands, cannabis industry, real estate market, and growing tech sector have created diverse GoHighLevel adoption across Colorado. Bambino is a certified GoHighLevel agency serving Denver businesses — we implement and manage GHL accounts for Colorado companies that want CRM, automation, and marketing consolidated into one platform. Whether you\'re a Denver real estate broker, marketing agency, or wellness brand, we build GHL systems that match your business model.',
    heroCTA1: 'Book a Free GHL Discovery Call →',
    heroCTA2: 'View USD Pricing',
    visualTitle: 'GHL Denver Snapshot',
    visualStats: [
      {label:'Avg. weekly hours saved',value:'14 hrs',sub:'Per GHL implementation'},
      {label:'Standard implementation',value:'2–4 wks',sub:'Discovery to live account'},
      {label:'Client retention rate',value:'97%',sub:'Month-to-month retainers'}
    ],
    marketLabel: 'Denver Market',
    marketTitle: 'GoHighLevel in Denver: Diverse Industries, Low Agency Competition',
    marketBody: 'Denver\'s business ecosystem is uniquely diverse — a booming real estate market, a significant cannabis industry that relies heavily on CRM and compliant marketing automation, an outdoor and wellness brand community, a growing tech sector anchored by the Colorado Innovation Network, and a large professional services market. GoHighLevel adoption spans all of these verticals. Denver\'s relatively smaller digital agency market compared to Dallas or Austin means that well-targeted GHL-specific pages face meaningfully lower competition.',
    marketEeat: 'Bambino GHL data: average 14 hours/week saved per Denver implementation. Colorado builds include real estate lead automation, wellness and health coaching CRM pipelines, outdoor brand marketing workflows, and agency white-label SaaS setups.',
    marketNote: 'Denver verticals served: real estate, cannabis industry, outdoor & wellness brands, tech companies, marketing agencies, healthcare practices, coaches & consultants, and home services.',
    marketStats: [
      {num:'715K',lbl:'City population'},
      {num:'2.9M',lbl:'Metro population'},
      {num:'CO',lbl:'State of Colorado'},
      {num:'#19',lbl:'Largest US city'}
    ],
    landscapeTitle: 'GoHighLevel Agency Competition in Denver: Low and Winnable',
    landscapeBody: 'Denver has fewer dedicated GoHighLevel agencies than Dallas or Austin. Most Denver digital agencies offer GHL as one tool among many — there are few dedicated GHL specialist pages targeting Denver specifically. A focused Bambino Denver GHL page competes primarily against generalist agency pages and national round-ups, with a realistic path to TOP-3 within 6–10 weeks.',
    landscapeCompetition: 'Low — few dedicated GHL specialists in Denver, mostly generalist agencies',
    landscapeLocalTitle: 'Why Denver Businesses Choose GoHighLevel',
    landscapeLocalBody: 'Denver\'s diverse business community values GoHighLevel for its versatility — real estate agents use it for lead capture and nurture, wellness brands for client onboarding and retention sequences, cannabis businesses for compliant CRM and communication workflows, and marketing agencies for white-label SaaS client management. The platform\'s consolidation of CRM, SMS, email, funnels, and reputation management resonates strongly with Denver\'s cost-efficient, bootstrapped business culture.',
    servicesTitle: 'GoHighLevel Services in Denver, CO',
    servicesSub: 'Certified GHL implementation for Denver and Colorado businesses — CRM, funnels, automations, and white-label SaaS. Built for Colorado\'s diverse business ecosystem.',
    serviceCards: GHL_SERVICE_CARDS('Denver'),
    whyTitle: 'Why Denver Businesses Choose Bambino for GoHighLevel',
    whyCards: GHL_WHY_CARDS('Denver'),
    processTitle: 'Our Denver GHL Implementation Process',
    processSub: 'A structured GoHighLevel implementation approach refined across 400+ GHL builds for US, UK, and Canadian businesses.',
    processSteps: GHL_PROCESS_STEPS('Denver'),
    resultsStats: GHL_RESULTS,
    industriesTitle: 'GoHighLevel for Denver Industries',
    industriesSub: 'Bambino has implemented GoHighLevel for Denver and Colorado businesses across:',
    industryPills: ['Real Estate','Cannabis Industry','Outdoor & Wellness Brands','Tech Companies','Marketing Agencies','Healthcare','Coaches & Consultants','Home Services'],
    pricingTitle: 'GoHighLevel Pricing for Denver Businesses',
    pricingSub: 'All prices in USD. One-time setup fees + optional monthly management retainers. No long-term contracts.',
    pricingPlans: GHL_PRICING,
    otherServicesTitle: 'More Services for Denver Businesses',
    otherServicesSub: 'GoHighLevel is one part of your growth stack. Explore what else Bambino offers Denver and Colorado businesses.',
    otherServiceCards: [
      {href:'/us/denver/seo-agency',label:'Related',title:'SEO Agency Denver',desc:'Organic search for Denver businesses — compound rankings feeding leads into your GHL pipelines.'},
      {href:'/us/denver/google-ads-agency',label:'Related',title:'Google Ads Agency Denver',desc:'Paid search for Colorado businesses — leads flowing directly into your GoHighLevel CRM.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'n8n and Make.com automation extending your GHL stack for complex multi-system workflows.'},
      {href:'/us/denver/digital-marketing-agency',label:'Also Available',title:'Digital Marketing Agency Denver',desc:'Full-service digital marketing for Denver — SEO, PPC, social, and CRM automation.'}
    ],
    faqTitle: 'GoHighLevel Agency Denver — FAQs',
    faqItems: [
      {q:'How much does GoHighLevel setup cost in Denver?',a:'Bambino charges $1,500–$9,500 for GoHighLevel implementation in Denver, depending on complexity. The Growth package at $4,500 covers full CRM architecture, 3 funnel builds, 10 automation workflows, CRM migration, and 90 days of management. Ongoing GHL management retainers start at $900/month. All prices in USD.'},
      {q:'What GoHighLevel agencies are in Denver?',a:'Denver has relatively few dedicated GoHighLevel agencies — most local digital agencies offer GHL as one tool alongside SEO and paid media. Bambino operates as a dedicated GHL specialist, serving Denver businesses remotely across Mountain Time with certified GHL architects rather than generalist account managers.'},
      {q:'Is GoHighLevel good for Denver real estate businesses?',a:'Yes. Denver\'s competitive real estate market requires fast lead response and systematic follow-up — exactly what GoHighLevel automates. We build GHL pipelines for Denver real estate professionals with automated lead nurture sequences, appointment booking workflows, and long-cycle buyer/seller follow-up that continues for months without manual effort.'},
      {q:'Can GoHighLevel work for Denver cannabis businesses?',a:'Yes, with important caveats. GoHighLevel supports compliant CRM and email/SMS marketing for cannabis businesses — managing dispensary customer databases, loyalty program triggers, and compliant communication sequences. We architect GHL cannabis setups with compliance-aware automation, age-gate considerations, and segmented communication workflows that respect state regulatory requirements.'},
      {q:'Can you build GoHighLevel for Denver wellness and coaching businesses?',a:'Yes. Denver\'s wellness coaching, health practice, and lifestyle brand community is an excellent GoHighLevel use case — client onboarding sequences, appointment booking automation, post-session follow-up workflows, course and membership funnels, and retention campaigns. We build GHL systems for Denver coaches and wellness brands that convert prospects and retain clients automatically.'},
      {q:'How long does GoHighLevel setup take for a Denver business?',a:'Standard GHL implementation takes 2–4 weeks from discovery to live account. White-label SaaS or large CRM migrations take 4–8 weeks. All work is delivered remotely across Mountain Time — discovery calls, build reviews, and training conducted via video call.'},
      {q:'Can you migrate our Denver business to GoHighLevel from ActiveCampaign?',a:'Yes. We migrate contacts, tags, custom fields, and automation sequences from ActiveCampaign into GoHighLevel — then rebuild email and SMS workflows natively in GHL. Most Denver businesses that switch from ActiveCampaign to GoHighLevel reduce their SaaS spend while gaining GHL\'s funnel builder, appointment booking, and reputation management tools.'},
      {q:'Is there a contract for GoHighLevel management in Denver?',a:'No long-term contracts. All Bambino GHL management retainers are month-to-month with 30 days\' notice. We earn your business every month through results, not contract lock-in.'}
    ],
    relatedLabel: 'Other US Cities',
    relatedTitle: 'GoHighLevel Agency Services Across the USA',
    relatedSub: 'Bambino implements GoHighLevel for businesses across the United States. Explore GHL services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/us/austin/gohighlevel-agency',text:'Austin GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/dallas/gohighlevel-agency',text:'Dallas GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/miami/gohighlevel-agency',text:'Miami GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/us/seattle/gohighlevel-agency',text:'Seattle GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Build Your GoHighLevel System in Denver?',
    ctaSub: 'Book a free 30-minute GHL discovery call. We\'ll map your sales process, show you what\'s possible with GoHighLevel, and provide a project estimate — no obligation. Mountain Time availability.',
    footerCityLabel: 'US Cities',
    footerCityLinks: [
      {href:'/us/denver/gohighlevel-agency',text:'Denver GoHighLevel'},
      {href:'/us/austin/gohighlevel-agency',text:'Austin GoHighLevel'},
      {href:'/us/dallas/gohighlevel-agency',text:'Dallas GoHighLevel'},
      {href:'/us',text:'All US Cities →'}
    ],
    footerLocalLabel: 'Also in Denver',
    footerLocalLinks: [
      {href:'/us/denver/seo-agency',text:'SEO Agency'},
      {href:'/us/denver/google-ads-agency',text:'Google Ads Agency'},
      {href:'/us/denver/digital-marketing-agency',text:'Digital Marketing'}
    ]
  }
];

// ─── GENERATE ─────────────────────────────────────────────────────
CITIES.forEach(p => {
  const dir = path.dirname(p.outPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p.outPath, buildPage(p), 'utf8');
  console.log(`✓ Generated: ${p.outPath}`);
});
console.log(`Done — ${CITIES.length} pages generated.`);
