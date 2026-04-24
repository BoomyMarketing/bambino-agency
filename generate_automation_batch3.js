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
          <div class="plan-price">${pl.price==='Custom'?'<span style="font-size:1.8rem;padding-top:0.4rem">Custom</span>':`<sup>CA$</sup>${pl.price}`}</div>
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
<html lang="en-CA">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="description" content="${p.metaDesc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${p.canonical}" />
  <link rel="alternate" hreflang="en-CA" href="${p.canonical}" />
  <link rel="alternate" hreflang="x-default" href="https://bambinoagency.com" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${p.ogTitle}" />
  <meta property="og:description" content="${p.ogDesc}" />
  <meta property="og:url" content="${p.canonical}" />
  <meta property="og:locale" content="en_CA" />
  <meta property="og:image" content="https://bambinoagency.com/img/og-default.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[{"@type":["LocalBusiness","MarketingAgency"],"name":"Bambino","url":"https://bambinoagency.com","logo":"https://bambinoagency.com/img/og-default.jpg","description":"${p.schemaDesc}","address":{"@type":"PostalAddress","addressLocality":"Manchester","addressCountry":"GB"},"areaServed":{"@type":"City","name":"${p.schemaCity}","containedInPlace":{"@type":"AdministrativeArea","name":"${p.schemaProv}"}},"priceRange":"$$$","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127","bestRating":"5"},"datePublished":"2026-04-25","dateModified":"2026-04-25"},{"@type":"BreadcrumbList","itemListElement":[${bcSchema}]},{"@type":"FAQPage","mainEntity":[${faqSchema}]}]}
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
        <span class="section-label">CA Pricing</span>
        <h2 id="pricing-heading" class="section-title">${p.pricingTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.pricingSub}</p>
      </div>
      <div class="pricing-grid" style="margin-top:2.5rem">${pricingHtml}</div>
      <p style="text-align:center;margin-top:1.5rem;font-size:0.85rem;color:var(--muted)">All prices in CAD. <a href="https://bambinoagency.com/pricing" style="color:var(--orange);font-weight:600">See full pricing &rarr;</a></p>
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

// ─── SHARED CONSTANTS ─────────────────────────────────────────────

const MAKE_SVC = (city) => [
  {label:'Core Build',title:'Custom Make.com Scenario Development',desc:`Bespoke Make.com scenarios for ${city} businesses — multi-module, multi-branch, with proper error handling, filters, and router logic. Production builds by certified specialists.`,href:'/services/marketing-automation'},
  {label:'CRM Automation',title:'CRM Integration & Sales Workflow',desc:`Connect HubSpot, Salesforce, GoHighLevel, or ActiveCampaign to your ${city} tech stack — automated contact creation, deal stage triggers, pipeline notifications, and follow-up sequences.`,href:'/services/hubspot'},
  {label:'Ecommerce',title:'Ecommerce Automation Scenarios',desc:'Shopify, WooCommerce, and BigCommerce automation — order notifications, inventory sync, customer lifecycle triggers, and multi-channel fulfilment coordination.',href:'/services/marketing-automation'},
  {label:'Lead Ops',title:'Lead Capture & Routing Automation',desc:'Automated lead intake from forms, Facebook Lead Ads, and LinkedIn Lead Gen — routed, scored, tagged, and assigned in your CRM within minutes of submission.',href:'/services/marketing-automation'},
  {label:'Reporting',title:'Reporting & Analytics Automation',desc:'Scheduled data collection from Google Ads, Meta, GA4, and CRM — delivered to Google Sheets, Notion, or Airtable. No more manual exports.',href:'/services/analytics'},
  {label:'Communication',title:'Slack, Email & Notification Workflows',desc:'Automated internal notifications, client updates, and team alerts — triggered by CRM events, form submissions, payment events, or scheduled delivery.',href:'/services/marketing-automation'},
  {label:'Audit & Fix',title:'Make.com Scenario Audit & Optimisation',desc:'Audit existing scenarios for errors, inefficiencies, and structural problems — then rebuild to production standards with error handling and documentation.',href:'/services/marketing-automation'},
  {label:'Training',title:`Make.com Team Training`,desc:`Train your ${city} team to build and maintain scenarios independently — module types, data mapping, error handlers, iterators, and scheduling.`,href:'/services/marketing-automation'}
];

const MAKE_STEPS = (city) => [
  {num:'1',title:'Automation Audit',desc:`Map your ${city} business's manual workflows, tool stack, and integration requirements. Identify Make.com opportunities ranked by hours saved.`},
  {num:'2',title:'Scenario Architecture',desc:'Design scenario structures — module sequences, router branches, data transformations, error handlers — before building. Reviewed with your team first.'},
  {num:'3',title:'Build & Test',desc:'Build scenarios with proper filters, error handlers, and data mapping. Tested with real data — including malformed inputs and API timeout scenarios.'},
  {num:'4',title:'Deploy & Monitor',desc:'Activate scenarios with optimised scheduling. Set up error notifications so your team is alerted immediately if something fails.'},
  {num:'5',title:'Train & Expand',desc:`Walk your ${city} team through scenario management. Monthly retainer for new builds, updates, and optimisation as requirements grow.`}
];

const MAKE_RESULTS = [
  {stat:'12',desc:'Avg. scenarios deployed',detail:'Per Canadian client in the first 90 days — CRM sync, lead routing, reporting, ecommerce, and communication workflows.'},
  {stat:'3–7 days',desc:'Typical scenario delivery',detail:'From discovery call to live production deployment for standard Make.com scenario builds.'},
  {stat:'0',desc:'Silent failures',detail:'Every Bambino Make.com build includes error handlers, fallback routes, and alert notifications — failures surface immediately.'}
];

const MAKE_PRICING_GST = [
  {name:'Starter',price:'900',period:'per scenario + GST',desc:'Single scenario — up to 8 modules, 2 app connections, error handling, and documentation.',featured:false,features:['Up to 8-module scenario','2 app connections','Error handling & filters','Scenario scheduling setup','Build documentation'],cta:'Get Started →'},
  {name:'Growth',price:'3,200',period:'scenario bundle + GST',desc:'5-scenario bundle — CRM sync, lead routing, reporting, ecommerce, and communication automation.',featured:true,features:['5 custom scenario builds','Up to 4 app connections each','Router & iterator logic','Error handler on every scenario','Team training included','Monthly retainer (CA$700/mo)'],cta:'Get Started →'},
  {name:'Scale',price:'7,500',period:'automation stack + GST',desc:'Full Make.com stack — 10+ scenarios, cross-app orchestration, and ongoing management.',featured:false,features:['10+ scenario builds','Complex multi-branch logic','Scenario audit & rebuild','Operations usage optimisation','Data transformation modules','Monthly retainer (CA$1,400/mo)'],cta:'Get Started →'},
  {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke Make.com programmes for complex operations with high scenario volumes or multi-department requirements.',featured:false,features:['Unlimited scenario builds','Dedicated Make specialist','Account architecture review','SLA & priority support','n8n integration if needed'],cta:'Talk to Us →'}
];

const MAKE_PRICING_HST = [
  {name:'Starter',price:'900',period:'per scenario + HST',desc:'Single scenario — up to 8 modules, 2 app connections, error handling, and documentation.',featured:false,features:['Up to 8-module scenario','2 app connections','Error handling & filters','Scenario scheduling setup','Build documentation'],cta:'Get Started →'},
  {name:'Growth',price:'3,200',period:'scenario bundle + HST',desc:'5-scenario bundle — CRM sync, lead routing, reporting, ecommerce, and communication automation.',featured:true,features:['5 custom scenario builds','Up to 4 app connections each','Router & iterator logic','Error handler on every scenario','Team training included','Monthly retainer (CA$700/mo)'],cta:'Get Started →'},
  {name:'Scale',price:'7,500',period:'automation stack + HST',desc:'Full Make.com stack — 10+ scenarios, cross-app orchestration, and ongoing management.',featured:false,features:['10+ scenario builds','Complex multi-branch logic','Scenario audit & rebuild','Operations usage optimisation','Data transformation modules','Monthly retainer (CA$1,400/mo)'],cta:'Get Started →'},
  {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke Make.com programmes for complex operations with high scenario volumes or multi-department requirements.',featured:false,features:['Unlimited scenario builds','Dedicated Make specialist','Account architecture review','SLA & priority support','n8n integration if needed'],cta:'Talk to Us →'}
];

const N8N_SVC = (city, prov) => [
  {label:'Core Build',title:'Custom n8n Workflow Development',desc:`Bespoke n8n workflows for ${city} businesses — multi-step, multi-condition, with proper error handling, retry logic, and execution monitoring. Production builds, not templates.`,href:'/services/marketing-automation'},
  {label:'AI Agents',title:'AI Agentic Workflow Builds',desc:'n8n AI agent nodes orchestrating OpenAI, Claude, or Gemini — autonomous systems that classify data, make routing decisions, draft content, and interact with APIs without human input.',href:'/services/marketing-automation'},
  {label:'CRM Sync',title:'CRM & Sales Automation',desc:`Bidirectional sync between HubSpot, Salesforce, GoHighLevel, ActiveCampaign, and your ${city} tech stack — triggered by deal stages, form submissions, or calendar bookings.`,href:'/services/hubspot'},
  {label:'Integrations',title:'API Integration & Custom Connectors',desc:'Connect any tool with an API — HTTP request nodes, custom JavaScript functions, and webhook handlers for your unique stack.',href:'/services/marketing-automation'},
  {label:'Data',title:'Data Pipeline & Reporting Automation',desc:`Automated data collection from Google Ads, GA4, Meta, and CRM into unified dashboards — no more manual reporting for ${city} teams.`,href:'/services/analytics'},
  {label:'Lead Ops',title:'Lead Routing & Qualification Automation',desc:'AI-powered lead scoring, routing, and follow-up — new leads classified, tagged, and assigned to the right rep within minutes of submission.',href:'/services/marketing-automation'},
  {label:'Self-Hosted',title:'n8n Self-Hosted Infrastructure',desc:`Deploy self-hosted n8n on AWS Canada or Azure Canada Central — full data sovereignty, PIPEDA-compliant for ${prov} businesses handling sensitive customer data.`,href:'/services/marketing-automation'},
  {label:'Training',title:'n8n Team Training & Documentation',desc:`Train your ${city} team to build and maintain their own workflows. Covers node types, credentials, error handling, and debugging. Written and video documentation included.`,href:'/services/marketing-automation'}
];

const N8N_STEPS = (city) => [
  {num:'1',title:'Automation Discovery',desc:`Map your ${city} business's manual processes, data flows, and integration requirements. Identify automation candidates ranked by time saved.`},
  {num:'2',title:'Workflow Architecture',desc:'Design the n8n workflow structure — node sequences, branching conditions, error paths, and data schema — reviewed with your team before building starts.'},
  {num:'3',title:'Build & Test',desc:'Build workflows with proper credentials, error handling, and execution logging. Tested with real data — including edge cases and failure scenarios.'},
  {num:'4',title:'Deploy & Monitor',desc:'Deploy to cloud-hosted or self-hosted infrastructure. Set up monitoring, error notifications, and dashboards so your team knows immediately if something fails.'},
  {num:'5',title:'Train & Iterate',desc:`Train your ${city} team to manage and extend workflows. Monthly retainer for new builds, optimisations, and maintenance as your stack grows.`}
];

const N8N_RESULTS = [
  {stat:'19 hrs',desc:'Avg. weekly hours automated',detail:'Per Canadian client across CRM sync, reporting, lead routing, and AI workflow implementations.'},
  {stat:'1–3 wks',desc:'Typical workflow delivery',detail:'Discovery to production deployment for standard workflow builds. AI agentic systems take 4–8 weeks.'},
  {stat:'0',desc:'Silently failing workflows',detail:'Every Bambino n8n build includes error handling, retry logic, and monitoring alerts — failures surface immediately.'}
];

// ─── PAGES ────────────────────────────────────────────────────────

const PAGES = [

  // ── Make.com Ottawa ──────────────────────────────────────────
  {
    outPath: 'ca/ottawa/make-com-agency/index.html',
    schemaCity:'Ottawa', schemaProv:'Ontario',
    title: 'Make.com Agency Ottawa, ON | Certified Make Automation Experts | Bambino',
    metaDesc: 'Certified Make.com agency in Ottawa. Visual scenario builds, multi-app automation, CRM integration, and workflow optimisation for Ontario businesses. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/ottawa/make-com-agency',
    ogTitle: 'Make.com Agency Ottawa | Certified Make Automation Experts | Bambino',
    ogDesc: 'Ottawa Make.com agency. Visual scenario builds, CRM integration, and multi-app automation for Ontario businesses. Free discovery call.',
    schemaDesc: 'Certified Make.com agency serving Ottawa, ON. Visual automation scenario builds and multi-app integrations for Ottawa government tech, consulting, and professional services businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'Make.com Agency Ottawa',url:'https://bambinoagency.com/ca/ottawa/make-com-agency'}
    ],
    heroLabel: 'Ottawa, ON',
    heroTitle: 'Make.com Agency in Ottawa, ON — Certified Make Automation, Scenarios & Integrations',
    heroSub: 'Ottawa\'s consulting firms, government technology suppliers, and professional services businesses run complex multi-tool workflows that cost staff hours every week. Make.com\'s visual scenario builder and 1,000+ app connectors let Ottawa businesses automate these workflows without developer resources. Bambino\'s certified Make.com specialists build production scenarios for Ottawa — from CRM integrations and reporting automation to multi-branch client communication workflows.',
    heroCTA1: 'Book a Free Make.com Call →',
    heroCTA2: 'View CA Pricing',
    visualTitle: 'Make.com Ottawa Snapshot',
    visualStats: [
      {label:'Avg. scenarios per client',value:'11',sub:'Deployed in first 90 days'},
      {label:'Typical scenario delivery',value:'3–7 days',sub:'Discovery to live deployment'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketLabel: 'Ottawa Market',
    marketTitle: 'Make.com in Ottawa: Automating Government Tech, Consulting & Professional Services',
    marketBody: 'Ottawa\'s business ecosystem is anchored by federal government technology suppliers, IT consulting firms, defence contractors, and a dense cluster of professional services businesses. These organisations manage complex multi-system data flows — procurement pipeline updates, client deliverable tracking, compliance reporting, and multi-stakeholder communication chains — that make excellent Make.com automation candidates. The visual, no-code nature of Make.com is particularly suited to Ottawa\'s non-developer business operators who need powerful automation they can manage themselves.',
    marketEeat: 'Bambino Make.com builds: average 11 scenarios deployed per Ottawa client in the first 90 days — covering CRM integrations, consulting workflow automation, reporting delivery, and client communication triggers.',
    marketNote: 'Ottawa verticals served: federal government suppliers, IT consulting, defence technology, law firms, real estate, healthcare, SaaS companies, and B2B professional services.',
    marketStats: [
      {num:'1.0M',lbl:'City population'},
      {num:'ON',lbl:'Province of Ontario'},
      {num:'11',lbl:'Avg. scenarios per client'},
      {num:'1,000+',lbl:'Make.com app connectors'}
    ],
    landscapeTitle: 'Make.com Competition in Ottawa: Zero Dedicated Agencies',
    landscapeBody: 'There are no dedicated Make.com agencies serving Ottawa specifically. National automation agencies exist but have no Ottawa market knowledge, no experience with federal procurement workflows, and no understanding of Ottawa\'s consulting sector operational patterns. Ottawa businesses searching "make.com agency ottawa" find only generic national pages and freelancer listings. This is a clear, uncontested keyword opportunity.',
    landscapeCompetition: 'Zero — no dedicated Make.com agencies in Ottawa',
    landscapeLocalTitle: 'Why Ottawa Businesses Choose Make.com',
    landscapeLocalBody: 'Ottawa\'s professional services and consulting businesses choose Make.com for its accessibility — a visual scenario builder their team can maintain without coding — combined with genuine power: 1,000+ app connectors, complex multi-branch logic, data transformation modules, and reliable scheduled triggers. For Ottawa organisations that want more than Zapier but need something their non-developer team can manage, Make.com is the right tool.',
    servicesTitle: 'Make.com Automation Services in Ottawa',
    servicesSub: 'Certified Make.com scenario builds for Ottawa businesses — CRM integrations, consulting workflow automation, reporting, and client communication. Production-grade, not templates.',
    serviceCards: MAKE_SVC('Ottawa'),
    whyTitle: 'Why Ottawa Businesses Choose Bambino for Make.com',
    whyCards: [
      {title:'Certified Make.com Specialists',desc:'Bambino holds Make.com partner certification. We understand the platform\'s module system, data handling, rate limiting, and error architecture — not surface-level drag-and-drop. Every scenario is production-grade.'},
      {title:'Ottawa Sector Expertise',desc:'We understand Ottawa\'s unique business context — federal procurement timelines, consulting firm billing cycles, government contractor compliance workflows. Scenarios are built for how Ottawa businesses actually operate.'},
      {title:'Error-First Scenario Design',desc:'Most Make.com scenarios break silently on edge cases — null values, API timeouts, malformed payloads. Bambino builds error handlers, fallback routes, and notification alerts into every scenario from day one.'},
      {title:'n8n Upgrade Path',desc:'When Make.com\'s constraints become limiting — complex AI workflows, high execution volumes, PIPEDA self-hosted requirements — Bambino can extend your stack with n8n. We build hybrid architectures for Ottawa businesses that need both.'}
    ],
    processTitle: 'Our Ottawa Make.com Build Process',
    processSub: 'Structured scenario engineering refined across hundreds of Make.com builds for Canadian and UK businesses.',
    processSteps: MAKE_STEPS('Ottawa'),
    resultsStats: MAKE_RESULTS,
    industriesTitle: 'Make.com Automation for Ottawa Industries',
    industriesSub: 'Our Ottawa Make.com specialists have built automation scenarios across:',
    industryPills: ['Government Tech Suppliers','IT Consulting','Defence Technology','Professional Services','Law Firms','Real Estate','Healthcare','SaaS Companies'],
    pricingTitle: 'Make.com Automation Pricing for Ottawa Businesses',
    pricingSub: 'All prices in CAD. Ontario businesses pay HST on services. Flat project fees + optional monthly retainers. No long-term contracts.',
    pricingPlans: MAKE_PRICING_HST,
    otherServicesTitle: 'More Automation Services in Ottawa',
    otherServicesSub: 'Make.com is one layer in your automation stack. Explore related Bambino services for Ottawa businesses.',
    otherServiceCards: [
      {href:'/ca/ottawa/n8n-agency',label:'Related',title:'n8n Agency Ottawa',desc:'For complex automation beyond Make.com — AI agent workflows, self-hosted PIPEDA-compliant deployments, and JavaScript-powered orchestration.'},
      {href:'/ca/ottawa/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Ottawa',desc:'GHL CRM setup and automation — Make.com scenarios connecting GoHighLevel to your Ottawa tech stack.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full automation strategy across Make.com, n8n, HubSpot, and AI-powered custom builds.'},
      {href:'/ca/ottawa/seo-agency',label:'Also Available',title:'SEO Agency Ottawa',desc:'Organic search for Ottawa businesses — compound rankings that work alongside your automation stack.'}
    ],
    faqTitle: 'Make.com Agency Ottawa — FAQs',
    faqItems: [
      {q:'What is Make.com and why do Ottawa businesses use it?',a:'Make.com (formerly Integromat) is a visual automation platform connecting 1,000+ apps through drag-and-drop scenario builders. Ottawa businesses use it to automate multi-app workflows — CRM updates, lead routing, reporting, client communication, and compliance tracking — without developer resources. It offers more power than Zapier at similar price points, with visual multi-branch logic that non-developers can maintain.'},
      {q:'How much does Make.com scenario development cost in Ottawa?',a:'Bambino charges CA$900 per scenario for standard builds, CA$3,200 for a 5-scenario bundle, and CA$7,500 for a full automation stack. Monthly management retainers start at CA$700/month. All prices exclude HST (Ontario 13%). Complex multi-branch scenarios are scoped on discovery call.'},
      {q:'Are there any Make.com agencies in Ottawa?',a:'There are currently no dedicated Make.com agencies operating specifically in Ottawa. Most automation work is either self-implemented or handled by Toronto-based national agencies without Ottawa market knowledge. Bambino fills this gap with certified Make.com builds delivered remotely for Ottawa businesses, with specific expertise in government supplier, consulting, and professional services workflows.'},
      {q:'Can Make.com help Ottawa consulting firms automate client workflows?',a:'Yes. Ottawa consulting firms commonly use Make.com for: new client onboarding triggers (contract signed → CRM contact created + project folder created + welcome email sent), deliverable tracking notifications, timesheet and billing automation, client report delivery schedules, and team task assignment workflows. These scenarios typically deploy in 3–7 days.'},
      {q:'Can Make.com integrate with the tools Ottawa government suppliers use?',a:'Make.com has native connectors for most common enterprise tools — Salesforce, HubSpot, Microsoft 365, SharePoint, Slack, Jira, and hundreds more. For government-specific procurement portals and systems without native connectors, we build HTTP request modules and webhook-based integrations. Any system with an API or webhook capability can be connected.'},
      {q:'What\'s the difference between Make.com and n8n for Ottawa businesses?',a:'Make.com is the better choice when you want a visual interface your team can maintain without coding and when 1,000+ native connectors cover your stack. n8n is better for Ottawa businesses with PIPEDA self-hosted requirements (federal data residency), JavaScript execution needs, AI agent node integration, or very high execution volumes. Many Ottawa businesses use both — Make.com for simpler scenarios, n8n for complex agentic workflows requiring Canadian data residency.'},
      {q:'Can you migrate our Ottawa business from Zapier to Make.com?',a:'Yes. We audit existing Zapier workflows, map the logic to Make.com scenario architecture, rebuild with improved error handling, and test before you cancel your Zapier subscription. Most Ottawa businesses that migrate from Zapier to Make.com gain significantly more automation capability while reducing or maintaining costs.'},
      {q:'Do you offer ongoing Make.com management for Ottawa businesses?',a:'Yes. Monthly management retainers cover: scenario monitoring, error investigation and fixes, new scenario builds, connector updates when third-party APIs change, operations usage optimisation, and team support. Retainers start at CA$700/month for up to 10 managed scenarios. All retainers are month-to-month — Ontario businesses pay HST on retainer invoices.'}
    ],
    relatedLabel: 'Other Canadian Cities',
    relatedTitle: 'Make.com Agency Services Across Canada',
    relatedSub: 'Bambino builds Make.com automations for businesses across Canada. Explore services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/toronto/make-com-agency',text:'Toronto Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/vancouver/make-com-agency',text:'Vancouver Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/calgary/make-com-agency',text:'Calgary Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/ottawa/n8n-agency',text:'Ottawa n8n Agency →'}
    ],
    ctaTitle: 'Ready to Automate Your Ottawa Business with Make.com?',
    ctaSub: 'Book a free 30-minute Make.com discovery call. We\'ll map your top automation opportunities and provide a project estimate — no obligation. Eastern Time availability.',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/ottawa/make-com-agency',text:'Ottawa Make.com Agency'},
      {href:'/ca/toronto/make-com-agency',text:'Toronto Make.com Agency'},
      {href:'/ca/calgary/make-com-agency',text:'Calgary Make.com Agency'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Ottawa',
    footerLocalLinks: [
      {href:'/ca/ottawa/n8n-agency',text:'n8n Agency'},
      {href:'/ca/ottawa/gohighlevel-agency',text:'GoHighLevel Agency'},
      {href:'/ca/ottawa/seo-agency',text:'SEO Agency'}
    ]
  },

  // ── n8n Edmonton ──────────────────────────────────────────────
  {
    outPath: 'ca/edmonton/n8n-agency/index.html',
    schemaCity:'Edmonton', schemaProv:'Alberta',
    title: 'n8n Automation Agency Edmonton, AB | Workflow Automation Experts | Bambino',
    metaDesc: 'n8n automation agency in Edmonton. Custom workflow builds, AI agent integration, CRM automation, and self-hosted PIPEDA-compliant deployments for Alberta businesses. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/edmonton/n8n-agency',
    ogTitle: 'n8n Automation Agency Edmonton | Custom Workflows & AI Agents | Bambino',
    ogDesc: 'Edmonton n8n automation agency. Custom workflows, AI agent integration, and self-hosted deployments for Alberta businesses. Free discovery call.',
    schemaDesc: 'n8n automation agency serving Edmonton, AB. Custom workflow builds, AI agent integration, and multi-app orchestration for Edmonton construction, healthcare, and government businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'n8n Agency Edmonton',url:'https://bambinoagency.com/ca/edmonton/n8n-agency'}
    ],
    heroLabel: 'Edmonton, AB',
    heroTitle: 'n8n Automation Agency in Edmonton, AB — Custom Workflows, AI Agents & Integrations',
    heroSub: 'Edmonton\'s construction, healthcare, government services, and energy sectors generate enormous volumes of manual workflow — data entry, CRM updates, reporting, compliance documentation, and inter-department communication. Bambino\'s certified n8n specialists build production-grade automation for Edmonton businesses: AI agentic pipelines, PIPEDA-compliant self-hosted deployments, and multi-system workflow orchestration that runs without human intervention.',
    heroCTA1: 'Book a Free n8n Discovery Call →',
    heroCTA2: 'View CA Pricing',
    visualTitle: 'n8n Edmonton Snapshot',
    visualStats: [
      {label:'Avg. hours automated per week',value:'17 hrs',sub:'Per Edmonton client post-implementation'},
      {label:'Typical workflow delivery',value:'1–3 wks',sub:'Discovery to production deployment'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketLabel: 'Edmonton Market',
    marketTitle: 'n8n in Edmonton: Construction, Healthcare & Government Automating Workflows',
    marketBody: 'Edmonton\'s economy — built on construction, healthcare, government services, petrochemical support, and a growing tech sector at the University of Alberta — relies on high-volume operational processes that are ripe for automation. n8n\'s ability to connect any API, handle complex conditional logic, and deploy on self-hosted Canadian infrastructure makes it the platform of choice for Edmonton businesses that need data sovereignty, flexibility, and automation at scale. Alberta\'s no-PST tax environment adds budget headroom for automation investment.',
    marketEeat: 'Bambino n8n builds: average 17 hours/week automated per Edmonton client. Alberta builds include construction project management triggers, healthcare operations workflow, government reporting automation, and energy services CRM sync.',
    marketNote: 'Edmonton verticals served: construction & trades, healthcare operations, government services, petrochemical support, professional services, real estate, university-adjacent tech, and franchise operations.',
    marketStats: [
      {num:'1.1M',lbl:'City population'},
      {num:'AB',lbl:'No PST — GST only'},
      {num:'#5',lbl:'Largest Canadian city'},
      {num:'17hrs',lbl:'Avg. weekly hours automated'}
    ],
    landscapeTitle: 'n8n Competition in Edmonton: A Completely Empty Market',
    landscapeBody: 'There are zero dedicated n8n agencies serving Edmonton. National automation agencies with n8n capability are Toronto-centric with no Edmonton market presence or industry knowledge. Edmonton businesses searching "n8n agency edmonton" find nothing — no dedicated agency pages, no Edmonton-specific automation content, and no local competition whatsoever. This is one of the most commercially uncontested keyword opportunities in Canadian B2B digital marketing.',
    landscapeCompetition: 'Zero — no dedicated n8n agencies in Edmonton',
    landscapeLocalTitle: 'Why Edmonton Businesses Choose n8n',
    landscapeLocalBody: 'Edmonton\'s operational businesses — construction crews tracking project data, healthcare operations managing patient-adjacent workflows, government contractors handling compliance documentation — need automation that handles complex multi-step logic reliably. n8n delivers: self-hosted deployments for data sovereignty, JavaScript execution for complex transformations, AI agent integration for document processing, and zero per-task pricing that scales with Edmonton\'s high-volume operational workflows. Alberta\'s GST-only tax environment makes the investment even more accessible.',
    servicesTitle: 'n8n Automation Services in Edmonton',
    servicesSub: 'Production-grade n8n workflow builds for Edmonton businesses — construction, healthcare, government, and professional services. Certified specialists, PIPEDA-aware.',
    serviceCards: N8N_SVC('Edmonton', 'Alberta'),
    whyTitle: 'Why Edmonton Businesses Choose Bambino for n8n',
    whyCards: [
      {title:'Production-Grade Builds — Not Fragile Scripts',desc:'Every Bambino n8n workflow includes error handling, retry logic, execution logging, and monitoring alerts. Edmonton\'s operational businesses need automation that fails loudly and recovers gracefully — not silent breakdowns that go unnoticed for weeks.'},
      {title:'Edmonton Industry Context',desc:'We understand Edmonton\'s dominant verticals — construction project milestones, healthcare operations compliance, government contractor reporting cycles, and petrochemical support B2B sales patterns. Automations are built around how Edmonton businesses actually work.'},
      {title:'PIPEDA-Aware Architecture',desc:'For Edmonton businesses in healthcare, government services, or professional services handling personal data, we architect n8n on self-hosted Alberta-accessible infrastructure — AWS ca-central-1 or Azure Canada Central — keeping all workflow data on Canadian soil.'},
      {title:'Alberta GST-Only Pricing',desc:'All Bambino automation services in Alberta are priced exclusive of GST only — no PST. Edmonton businesses benefit from Alberta\'s tax advantage on every project and monthly retainer invoice.'}
    ],
    processTitle: 'Our Edmonton n8n Implementation Process',
    processSub: 'Structured workflow engineering refined across 200+ n8n builds for Canadian operational and professional services businesses.',
    processSteps: N8N_STEPS('Edmonton'),
    resultsStats: N8N_RESULTS,
    industriesTitle: 'n8n Automation for Edmonton Industries',
    industriesSub: 'Our Edmonton n8n specialists have built automation workflows across:',
    industryPills: ['Construction & Trades','Healthcare Operations','Government Services','Petrochemical Support','Professional Services','Real Estate','University-Adjacent Tech','Franchise Operations'],
    pricingTitle: 'n8n Automation Pricing for Edmonton Businesses',
    pricingSub: 'All prices in CAD. Alberta businesses pay GST only — no PST. Flat project fees + optional monthly retainers. No long-term contracts.',
    pricingPlans: [
      {name:'Starter',price:'1,200',period:'per workflow + GST',desc:'Single workflow build — up to 10 nodes, 2 integrations, full error handling, and documentation.',featured:false,features:['Up to 10-node workflow','2 API integrations','Error handling & retry logic','Execution monitoring setup','Workflow documentation'],cta:'Get Started →'},
      {name:'Growth',price:'3,800',period:'workflow bundle + GST',desc:'5-workflow automation bundle — CRM sync, lead routing, reporting, and communication workflows.',featured:true,features:['5 custom workflow builds','Up to 5 integrations each','AI node integration','n8n cloud or self-hosted setup','Team training included','Monthly retainer (CA$800/mo)'],cta:'Get Started →'},
      {name:'Scale',price:'8,500',period:'automation stack + GST',desc:'Full automation stack — 10+ workflows, AI agent integration, self-hosted n8n on Canadian infrastructure.',featured:false,features:['10+ workflow builds','AI agentic workflows','Self-hosted on CA infra','Custom API integrations','Data pipeline builds','Monthly retainer (CA$1,600/mo)'],cta:'Get Started →'},
      {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke n8n automation for large Edmonton construction, healthcare, or government supplier operations.',featured:false,features:['Unlimited workflow builds','Dedicated n8n architect','Custom AI agent development','SLA & priority support','Quarterly architecture reviews'],cta:'Talk to Us →'}
    ],
    otherServicesTitle: 'More Automation Services in Edmonton',
    otherServicesSub: 'n8n is one layer in your automation stack. Explore related Bambino services for Edmonton businesses.',
    otherServiceCards: [
      {href:'/ca/edmonton/make-com-agency',label:'Related',title:'Make.com Agency Edmonton',desc:'Make.com scenario builds for simpler multi-app automations — a visual complement to your n8n stack.'},
      {href:'/ca/edmonton/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Edmonton',desc:'GHL CRM automation — n8n workflows connecting GoHighLevel to your Edmonton tech stack.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full automation strategy across n8n, HubSpot, GoHighLevel, and AI-powered custom builds.'},
      {href:'/ca/edmonton/seo-agency',label:'Also Available',title:'SEO Agency Edmonton',desc:'Organic search growth for Edmonton businesses — compound rankings that work alongside your automation infrastructure.'}
    ],
    faqTitle: 'n8n Agency Edmonton — FAQs',
    faqItems: [
      {q:'What is n8n and why are Edmonton businesses adopting it?',a:'n8n is an open-source workflow automation platform for building complex multi-step automations between any apps with an API. Edmonton businesses choose n8n over Zapier and Make.com for: self-hosted deployments on Canadian infrastructure for data sovereignty, JavaScript execution inside workflows, complex branching logic, AI model integration (OpenAI, Claude, Gemini), and volume-based automation with no per-task charges — important for Edmonton\'s high-volume construction, healthcare, and government operations.'},
      {q:'How much does n8n workflow development cost in Edmonton?',a:'Bambino charges CA$1,200 per workflow for standard builds, CA$3,800 for a 5-workflow bundle, and CA$8,500 for a full automation stack. Monthly management retainers start at CA$800/month. All prices exclude GST (Alberta has no PST). Complex AI agentic workflows are scoped on a discovery call.'},
      {q:'Are there any n8n agencies in Edmonton?',a:'There are currently no dedicated n8n agencies operating specifically in Edmonton. Automation work in Edmonton is either self-implemented or handled by national agencies with no local market knowledge. Bambino fills this gap with certified n8n builds delivered remotely for Edmonton businesses, with expertise in Edmonton\'s construction, healthcare, government, and professional services verticals.'},
      {q:'Can n8n automate Edmonton construction workflows?',a:'Yes. Edmonton construction companies use n8n for: project milestone triggers (stage completion → subcontractor notification + invoice trigger + document update), site inspection report routing, permit deadline reminders, supplier order automation, and crew communication workflows. We build these systems with construction project management tools like Procore, Buildertrend, or custom spreadsheet-based tracking as data sources.'},
      {q:'Can n8n automate healthcare operations workflows for Edmonton organisations?',a:'Yes. Edmonton healthcare operations teams use n8n for: patient intake workflow automation, staff scheduling notifications, compliance documentation triggers, appointment reminder sequences, and inter-department data synchronisation. For healthcare data, we architect self-hosted n8n on Canadian infrastructure with PIPEDA-compliant data handling — keeping all patient-adjacent data on Canadian soil.'},
      {q:'Do you build AI agentic workflows for Edmonton businesses?',a:'Yes. We build n8n AI agent workflows using OpenAI GPT-4, Anthropic Claude, and Google Gemini — systems that classify documents, route approvals, draft communications, summarise reports, and interact with external systems autonomously. For Edmonton\'s construction and government sectors, AI agents are particularly useful for document classification, RFP response drafting, and compliance document processing.'},
      {q:'How long does n8n implementation take for an Edmonton business?',a:'Single workflow builds take 1–3 weeks from discovery to production deployment. 5-workflow bundles take 3–5 weeks. Full automation stacks with AI agent integration take 6–10 weeks. All implementation is delivered remotely — discovery calls, workflow reviews, and training conducted via video call in Mountain Time.'},
      {q:'Do you offer ongoing n8n support and maintenance for Edmonton businesses?',a:'Yes. Monthly management retainers cover: workflow monitoring, error investigation and fixes, new workflow builds, integration updates when third-party APIs change, and team support. Retainers start at CA$800/month for up to 10 managed workflows. All retainers are month-to-month — Alberta businesses pay GST only on retainer invoices.'}
    ],
    relatedLabel: 'Other Canadian Cities',
    relatedTitle: 'n8n Automation Agency Services Across Canada',
    relatedSub: 'Bambino builds n8n automations for businesses across Canada. Explore services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/calgary/n8n-agency',text:'Calgary n8n Agency →'},
      {href:'https://bambinoagency.com/ca/toronto/n8n-agency',text:'Toronto n8n Agency →'},
      {href:'https://bambinoagency.com/ca/vancouver/n8n-agency',text:'Vancouver n8n Agency →'},
      {href:'https://bambinoagency.com/ca/edmonton/gohighlevel-agency',text:'Edmonton GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Automate Your Edmonton Business with n8n?',
    ctaSub: 'Book a free 30-minute n8n discovery call. We\'ll map your automation opportunities and give you a project estimate — no obligation. Mountain Time availability.',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/edmonton/n8n-agency',text:'Edmonton n8n Agency'},
      {href:'/ca/calgary/n8n-agency',text:'Calgary n8n Agency'},
      {href:'/ca/toronto/n8n-agency',text:'Toronto n8n Agency'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Edmonton',
    footerLocalLinks: [
      {href:'/ca/edmonton/gohighlevel-agency',text:'GoHighLevel Agency'},
      {href:'/ca/edmonton/make-com-agency',text:'Make.com Agency'},
      {href:'/ca/edmonton/seo-agency',text:'SEO Agency'}
    ]
  },

  // ── Make.com Edmonton ─────────────────────────────────────────
  {
    outPath: 'ca/edmonton/make-com-agency/index.html',
    schemaCity:'Edmonton', schemaProv:'Alberta',
    title: 'Make.com Agency Edmonton, AB | Certified Make Automation Experts | Bambino',
    metaDesc: 'Certified Make.com agency in Edmonton. Visual scenario builds, multi-app automation, CRM integration, and workflow optimisation for Alberta businesses. GST only. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/edmonton/make-com-agency',
    ogTitle: 'Make.com Agency Edmonton | Certified Make Automation Experts | Bambino',
    ogDesc: 'Edmonton Make.com agency. Visual scenario builds, CRM integration, and multi-app automation for Alberta businesses. Certified Make Partner. Free discovery call.',
    schemaDesc: 'Certified Make.com agency serving Edmonton, AB. Visual automation scenario builds and multi-app integrations for Edmonton construction, healthcare, and government businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'Make.com Agency Edmonton',url:'https://bambinoagency.com/ca/edmonton/make-com-agency'}
    ],
    heroLabel: 'Edmonton, AB',
    heroTitle: 'Make.com Agency in Edmonton, AB — Certified Make Automation, Scenarios & Integrations',
    heroSub: 'Edmonton\'s construction firms, healthcare operations teams, government service providers, and professional services businesses lose hours every week to manual multi-app workflows. Make.com\'s visual scenario builder connects your tools and automates these processes without developer resources. Bambino\'s certified Make.com specialists build production scenarios for Edmonton — from CRM integrations and GoHighLevel automation to complex multi-branch construction project workflows.',
    heroCTA1: 'Book a Free Make.com Call →',
    heroCTA2: 'View CA Pricing',
    visualTitle: 'Make.com Edmonton Snapshot',
    visualStats: [
      {label:'Avg. scenarios per client',value:'10',sub:'Deployed in first 90 days'},
      {label:'Typical scenario delivery',value:'3–7 days',sub:'Discovery to live deployment'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketLabel: 'Edmonton Market',
    marketTitle: 'Make.com in Edmonton: Automation for Alberta\'s Operational Economy',
    marketBody: 'Edmonton\'s economy runs on operations — construction project management, healthcare scheduling, government service delivery, and petrochemical support logistics. These businesses share a common challenge: high-volume, multi-tool workflows that consume staff time and introduce errors when done manually. Make.com\'s 1,000+ app connectors, visual scenario builder, and powerful multi-branch logic make it the accessible automation platform for Edmonton\'s non-developer business operators who need real automation capability without coding.',
    marketEeat: 'Bambino Make.com builds: average 10 scenarios deployed per Edmonton client in the first 90 days — covering CRM integrations, GoHighLevel automation, reporting delivery, and construction/healthcare workflow triggers.',
    marketNote: 'Edmonton verticals served: construction & trades, healthcare operations, government services, petrochemical support, professional services, real estate, and franchise operations.',
    marketStats: [
      {num:'1.1M',lbl:'City population'},
      {num:'AB',lbl:'No PST — GST only'},
      {num:'10',lbl:'Avg. scenarios per client'},
      {num:'1,000+',lbl:'Make.com app connectors'}
    ],
    landscapeTitle: 'Make.com Competition in Edmonton: A Completely Open Market',
    landscapeBody: 'There are zero dedicated Make.com agencies serving Edmonton. National automation agencies have no Edmonton presence or industry knowledge. Edmonton businesses searching "make.com agency edmonton" find generic freelancer profiles and national round-up articles — no dedicated local agency page. This makes "make.com agency edmonton" one of the most commercially uncontested keywords in Alberta digital marketing.',
    landscapeCompetition: 'Zero — no dedicated Make.com agencies in Edmonton',
    landscapeLocalTitle: 'Why Edmonton Businesses Choose Make.com',
    landscapeLocalBody: 'Edmonton\'s operationally-oriented businesses — construction project managers, healthcare admins, government service coordinators — need automation their team can manage without developer support. Make.com delivers: a visual interface non-developers can work with, 1,000+ app connectors including GoHighLevel, HubSpot, Procore, and Microsoft 365, complex multi-branch scenario logic, and reliable scheduling. For Edmonton teams that want powerful automation without writing code, Make.com is the right platform.',
    servicesTitle: 'Make.com Automation Services in Edmonton',
    servicesSub: 'Certified Make.com scenario builds for Edmonton businesses — construction, healthcare, government, and professional services. Production-grade, not templates.',
    serviceCards: MAKE_SVC('Edmonton'),
    whyTitle: 'Why Edmonton Businesses Choose Bambino for Make.com',
    whyCards: [
      {title:'Certified Make.com Specialists',desc:'Bambino holds Make.com partner certification. We understand the platform\'s module system, data handling, rate limiting, and error architecture. Production scenarios — not tutorials recreated from YouTube.'},
      {title:'Edmonton Industry Context',desc:'We understand Edmonton\'s dominant sectors — construction project workflows, healthcare operations scheduling, government service delivery cycles. Scenarios are built for how Edmonton businesses actually operate, not generic templates.'},
      {title:'Error-First Scenario Design',desc:'Most Make.com scenarios break silently on edge cases. Bambino builds error handlers, fallback routes, and notification alerts into every scenario from day one — so failures surface immediately, not weeks later.'},
      {title:'Alberta GST-Only Pricing',desc:'All Bambino services in Alberta are priced exclusive of GST only — no PST. Edmonton businesses save the 8% Ontario provincial tax compared to national agencies pricing out of Toronto.'}
    ],
    processTitle: 'Our Edmonton Make.com Build Process',
    processSub: 'Structured scenario engineering refined across hundreds of Make.com builds for Canadian operational and professional services businesses.',
    processSteps: MAKE_STEPS('Edmonton'),
    resultsStats: MAKE_RESULTS,
    industriesTitle: 'Make.com Automation for Edmonton Industries',
    industriesSub: 'Our Edmonton Make.com specialists have built automation scenarios across:',
    industryPills: ['Construction & Trades','Healthcare Operations','Government Services','Petrochemical Support','Professional Services','Real Estate','Franchise Operations','Marketing Agencies'],
    pricingTitle: 'Make.com Automation Pricing for Edmonton Businesses',
    pricingSub: 'All prices in CAD. Alberta businesses pay GST only — no PST. Flat project fees + optional monthly retainers. No long-term contracts.',
    pricingPlans: MAKE_PRICING_GST,
    otherServicesTitle: 'More Automation Services in Edmonton',
    otherServicesSub: 'Make.com is one layer in your automation stack. Explore related Bambino services for Edmonton businesses.',
    otherServiceCards: [
      {href:'/ca/edmonton/n8n-agency',label:'Related',title:'n8n Agency Edmonton',desc:'For complex automation beyond Make.com — AI agent workflows, self-hosted PIPEDA-compliant deployments, and JavaScript-powered orchestration.'},
      {href:'/ca/edmonton/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Edmonton',desc:'GHL CRM setup and automation — Make.com scenarios connecting GoHighLevel to your full Edmonton tech stack.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full automation strategy across Make.com, n8n, HubSpot, and AI-powered custom builds.'},
      {href:'/ca/edmonton/seo-agency',label:'Also Available',title:'SEO Agency Edmonton',desc:'Organic search growth for Edmonton businesses — compound rankings that work alongside your automation stack.'}
    ],
    faqTitle: 'Make.com Agency Edmonton — FAQs',
    faqItems: [
      {q:'What is Make.com and why do Edmonton businesses use it?',a:'Make.com (formerly Integromat) is a visual automation platform connecting 1,000+ apps through drag-and-drop scenario builders. Edmonton businesses use it to automate multi-app workflows — construction project triggers, CRM updates, healthcare scheduling notifications, government reporting, and team communications — without developer resources. More powerful than Zapier, more accessible than n8n.'},
      {q:'How much does Make.com scenario development cost in Edmonton?',a:'Bambino charges CA$900 per scenario for standard builds, CA$3,200 for a 5-scenario bundle, and CA$7,500 for a full automation stack. Monthly management retainers start at CA$700/month. All prices exclude GST (Alberta has no PST). Edmonton businesses pay less in tax than Ontario-based clients. Complex multi-branch scenarios are scoped on discovery call.'},
      {q:'Are there any Make.com agencies in Edmonton?',a:'There are currently no dedicated Make.com agencies operating specifically in Edmonton. Most automation work is self-implemented or handled by national agencies with no Edmonton industry knowledge. Bambino fills this gap with certified Make.com builds for Edmonton\'s construction, healthcare, government, and professional services businesses — delivered remotely with Mountain Time availability.'},
      {q:'Can Make.com automate Edmonton construction workflows?',a:'Yes. Edmonton construction companies use Make.com for: project stage completion triggers (milestone reached → subcontractor notification + invoice generation + document update), site inspection report routing, permit deadline reminder sequences, supplier reorder triggers, and crew communication workflows. Make.com connects to Procore, Buildertrend, QuickBooks, Slack, and most construction tech tools natively.'},
      {q:'Can Make.com work with GoHighLevel for Edmonton real estate businesses?',a:'Yes. Make.com has a native GoHighLevel connector. We build scenarios for Edmonton real estate businesses connecting GHL to their other tools — web form submission → GHL contact creation + pipeline assignment + automated follow-up trigger, appointment booked → CRM update + Slack notification + calendar block. Standard patterns deploy in 3–5 days.'},
      {q:'What\'s the difference between Make.com and n8n for Edmonton businesses?',a:'Make.com is better when you want a visual interface your team can maintain without coding, and when 1,000+ native connectors cover your stack. n8n is better when you need self-hosted data sovereignty for healthcare or government compliance, JavaScript execution, AI agent integration, or very high execution volumes without per-operation pricing. Many Edmonton businesses use both — Make.com for straightforward multi-app scenarios, n8n for complex data pipelines and AI workflows.'},
      {q:'Do you offer Make.com account audits for Edmonton businesses?',a:'Yes. We audit existing Make.com accounts for structural problems, error-prone scenarios, operation inefficiencies, and missing error handlers — then provide a written audit report with rebuild or optimisation recommendations. Useful for Edmonton businesses that have grown their Make.com account organically and ended up with fragile, undocumented scenarios.'},
      {q:'Do you offer ongoing Make.com management for Edmonton businesses?',a:'Yes. Monthly management retainers cover: scenario monitoring, error investigation and fixes, new scenario builds, connector updates when third-party APIs change, and team support. Retainers start at CA$700/month for up to 10 managed scenarios. All retainers are month-to-month — Alberta businesses pay GST only on retainer invoices.'}
    ],
    relatedLabel: 'Other Canadian Cities',
    relatedTitle: 'Make.com Agency Services Across Canada',
    relatedSub: 'Bambino builds Make.com automations for businesses across Canada. Explore services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/calgary/make-com-agency',text:'Calgary Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/toronto/make-com-agency',text:'Toronto Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/vancouver/make-com-agency',text:'Vancouver Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/edmonton/n8n-agency',text:'Edmonton n8n Agency →'}
    ],
    ctaTitle: 'Ready to Automate Your Edmonton Business with Make.com?',
    ctaSub: 'Book a free 30-minute Make.com discovery call. We\'ll map your top automation opportunities and give you a project estimate — no obligation. Mountain Time availability.',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/edmonton/make-com-agency',text:'Edmonton Make.com Agency'},
      {href:'/ca/calgary/make-com-agency',text:'Calgary Make.com Agency'},
      {href:'/ca/toronto/make-com-agency',text:'Toronto Make.com Agency'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Edmonton',
    footerLocalLinks: [
      {href:'/ca/edmonton/n8n-agency',text:'n8n Agency'},
      {href:'/ca/edmonton/gohighlevel-agency',text:'GoHighLevel Agency'},
      {href:'/ca/edmonton/seo-agency',text:'SEO Agency'}
    ]
  }
];

// ─── GENERATE ─────────────────────────────────────────────────────
PAGES.forEach(p => {
  const dir = path.dirname(p.outPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p.outPath, buildPage(p), 'utf8');
  console.log(`✓ Generated: ${p.outPath}`);
});
console.log(`Done — ${PAGES.length} pages generated.`);
