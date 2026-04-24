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
  {"@context":"https://schema.org","@graph":[{"@type":["LocalBusiness","MarketingAgency"],"name":"Bambino","url":"https://bambinoagency.com","logo":"https://bambinoagency.com/img/og-default.jpg","description":"${p.schemaDesc}","address":{"@type":"PostalAddress","addressLocality":"Manchester","addressCountry":"GB"},"areaServed":{"@type":"City","name":"Vancouver","containedInPlace":{"@type":"AdministrativeArea","name":"British Columbia"}},"priceRange":"$$$","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127","bestRating":"5"},"datePublished":"2026-04-25","dateModified":"2026-04-25"},{"@type":"BreadcrumbList","itemListElement":[${bcSchema}]},{"@type":"FAQPage","mainEntity":[${faqSchema}]}]}
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

// ─── PAGE DATA ───────────────────────────────────────────────────

const PAGES = [

  // ── n8n Vancouver ─────────────────────────────────────────────
  {
    outPath: 'ca/vancouver/n8n-agency/index.html',
    title: 'n8n Automation Agency Vancouver, BC | Workflow Automation Experts | Bambino',
    metaDesc: 'n8n automation agency in Vancouver. Custom workflow builds, AI agent integration, CRM automation, and multi-app orchestration for BC businesses. PIPEDA-aware self-hosted option. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/vancouver/n8n-agency',
    ogTitle: 'n8n Automation Agency Vancouver | Custom Workflows & AI Agents | Bambino',
    ogDesc: 'Vancouver n8n automation agency. Custom workflow builds, AI agent integration, and multi-app orchestration for BC businesses. Free discovery call.',
    schemaDesc: 'n8n automation agency serving Vancouver, BC. Custom workflow builds, AI agent integration, and multi-app orchestration for Canadian businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'n8n Agency Vancouver',url:'https://bambinoagency.com/ca/vancouver/n8n-agency'}
    ],
    heroLabel: 'Vancouver, BC',
    heroTitle: 'n8n Automation Agency in Vancouver, BC — Custom Workflows, AI Agents & Integrations',
    heroSub: 'Vancouver\'s tech corridor — from Yaletown startups to North Shore professional services — is adopting n8n as the automation layer that replaces fragile Zapier chains and costly Make.com subscriptions. Bambino\'s certified n8n specialists build production-grade workflow systems for Vancouver businesses: AI agentic pipelines, self-hosted PIPEDA-compliant deployments, and complex multi-app orchestration that scales with your operation.',
    heroCTA1: 'Book a Free n8n Discovery Call →',
    heroCTA2: 'View CA Pricing',
    visualTitle: 'n8n Vancouver Snapshot',
    visualStats: [
      {label:'Avg. hours automated per week',value:'20 hrs',sub:'Per Vancouver client post-implementation'},
      {label:'Typical workflow delivery',value:'1–3 wks',sub:'Discovery to production deployment'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketLabel: 'Vancouver Market',
    marketTitle: 'n8n in Vancouver: Tech-Forward Businesses Choosing Open-Source Automation',
    marketBody: 'Vancouver\'s technology sector — game studios in Gastown, SaaS companies on Robson, and cleantech firms on the waterfront — has a strong preference for open-source and privacy-first tools. n8n\'s self-hosted architecture, JavaScript execution capability, and absence of per-task pricing make it the platform of choice when Vancouver businesses outgrow Zapier and Make.com. BC\'s PIPEDA obligations and CASL requirements make self-hosted n8n an especially compelling choice for businesses handling customer data.',
    marketEeat: 'Bambino n8n builds: average 20 hours/week automated per Vancouver client. BC builds include full self-hosted infrastructure setup, PIPEDA-aware data routing, and AI agentic workflows for tech and professional services businesses.',
    marketNote: 'Vancouver verticals served: SaaS & tech companies, marketing agencies, professional services, cleantech, real estate, healthcare, media, and data operations teams.',
    marketStats: [
      {num:'675K',lbl:'City population'},
      {num:'2.6M',lbl:'Metro population'},
      {num:'#3',lbl:'Largest Canadian city'},
      {num:'20hrs',lbl:'Avg. weekly hours automated'}
    ],
    landscapeTitle: 'n8n Competition in Vancouver: A Near-Empty Market',
    landscapeBody: 'There are no dedicated n8n agencies with a specific Vancouver presence. The national agencies that offer n8n (predominantly UK-based or Toronto-centric) have minimal Vancouver-specific content or local market knowledge. Vancouver businesses searching "n8n agency Vancouver" currently find generic freelancer profiles and non-localised national agency pages. A focused, well-built Bambino Vancouver n8n page has a clear path to TOP-3 within 4–8 weeks.',
    landscapeCompetition: 'Very Low — zero dedicated n8n agencies in Vancouver',
    landscapeLocalTitle: 'Why Vancouver Businesses Choose n8n Over Zapier & Make.com',
    landscapeLocalBody: 'Vancouver\'s tech and creative businesses outgrow Zapier and Make.com when they need: PIPEDA-compliant self-hosted data processing, complex JavaScript execution inside workflows, AI model integration (OpenAI, Claude, Gemini), branching logic across 10+ steps, and volume-based automation without per-task pricing. n8n delivers all of this on infrastructure you control — either cloud-hosted or on BC-based servers.',
    servicesTitle: 'n8n Automation Services in Vancouver',
    servicesSub: 'Production-grade n8n workflow builds — from API integrations to full AI agentic systems — by certified specialists with 200+ workflows delivered for Canadian businesses.',
    serviceCards: [
      {label:'Core Build',title:'Custom n8n Workflow Development',desc:'Bespoke n8n workflows engineered for Vancouver businesses — multi-step, multi-condition, with proper error handling, retry logic, and execution monitoring. Real builds, not Zapier clones.',href:'/services/marketing-automation'},
      {label:'AI Agents',title:'AI Agentic Workflow Builds',desc:'n8n AI agent nodes orchestrating OpenAI, Claude, or Gemini — autonomous systems that classify data, make routing decisions, draft content, and interact with APIs without human intervention.',href:'/services/marketing-automation'},
      {label:'Self-Hosted',title:'Self-Hosted n8n on BC Infrastructure',desc:'Deploy self-hosted n8n on AWS Canada (ca-central-1) or Azure Canada Central — full data sovereignty, PIPEDA-compliant, no data leaving Canadian jurisdiction. We handle all infrastructure setup and ongoing management.',href:'/services/marketing-automation'},
      {label:'CRM Sync',title:'CRM & Sales Automation',desc:'Bidirectional sync between HubSpot, Salesforce, GoHighLevel, ActiveCampaign, and your Vancouver tech stack — triggered by deal stage changes, form submissions, or calendar bookings.',href:'/services/hubspot'},
      {label:'Integrations',title:'API Integration & Custom Connectors',desc:'Connect any tool with an API — even without a native n8n node. We build HTTP request nodes, custom JavaScript functions, and webhook handlers for Vancouver businesses\' unique tool stacks.',href:'/services/marketing-automation'},
      {label:'Data',title:'Data Pipeline & Reporting Automation',desc:'Automated data collection, transformation, and delivery — pulling from Google Ads, GA4, Meta, Shopify, and CRM into unified reporting dashboards. No more manual data exports.',href:'/services/analytics'},
      {label:'Lead Ops',title:'Lead Routing & Qualification Automation',desc:'AI-powered lead scoring, routing, and follow-up orchestration — new leads classified by source, intent, and company data, then routed to the right rep with the right message within minutes.',href:'/services/marketing-automation'},
      {label:'Training',title:'n8n Team Training & Documentation',desc:'Train your Vancouver team to build and maintain their own workflows — covering node types, credentials management, error handling, and debugging. Includes written and recorded documentation.',href:'/services/marketing-automation'}
    ],
    whyTitle: 'Why Vancouver Businesses Choose Bambino for n8n',
    whyCards: [
      {title:'Production-Grade — Not Freelancer Hobby Builds',desc:'Every Bambino n8n workflow includes error handling, retry logic, execution logging, and monitoring alerts. Most self-taught n8n builds silently fail for days before anyone notices. Ours don\'t.'},
      {title:'PIPEDA-Aware Architecture for BC Businesses',desc:'We architect n8n systems with British Columbia\'s PIPEDA obligations in mind — recommending self-hosted deployments on Canadian infrastructure, data minimisation practices, and compliant retention policies for businesses handling personal data.'},
      {title:'AI-First Workflow Design',desc:'Bambino designs n8n systems with AI at the centre — agent nodes, LLM-powered decision trees, and vector database integration planned from day one, not bolted on as afterthoughts. Vancouver\'s tech community expects this level of sophistication.'},
      {title:'Full API Integration Capability',desc:'Our Vancouver team has built integrations with 100+ SaaS tools, custom databases, internal APIs, and legacy systems. If it has an API endpoint, we can automate it — regardless of whether an n8n node exists natively.'}
    ],
    processTitle: 'Our Vancouver n8n Implementation Process',
    processSub: 'A structured workflow engineering approach refined across 200+ n8n builds for Canadian businesses.',
    processSteps: [
      {num:'1',title:'Automation Discovery',desc:'Map your Vancouver business\'s manual processes, data flows, and integration requirements. Identify automation candidates ranked by hours saved and build complexity.'},
      {num:'2',title:'Workflow Architecture',desc:'Design the n8n workflow structure — node sequences, branching conditions, error paths, and data schema — before building. Reviewed with your team before implementation starts.'},
      {num:'3',title:'Build & Test',desc:'Build workflows in n8n with proper credentials, error handling, and execution logging. Tested end-to-end with real data — including edge cases and failure scenarios.'},
      {num:'4',title:'Deploy & Monitor',desc:'Deploy to cloud-hosted or self-hosted BC infrastructure. Set up monitoring, error notifications, and execution dashboards so your team knows immediately if something breaks.'},
      {num:'5',title:'Train & Iterate',desc:'Train your Vancouver team to manage and extend workflows. Monthly retainer available for new builds, optimisations, and maintenance as your automation stack scales.'}
    ],
    resultsStats: [
      {stat:'20 hrs',desc:'Avg. weekly hours automated',detail:'Per Vancouver client across CRM sync, reporting, lead routing, and AI workflow implementations.'},
      {stat:'1–3 wks',desc:'Typical workflow delivery',detail:'Discovery to production deployment for standard workflow builds. Complex AI agentic systems or large stacks take 4–8 weeks.'},
      {stat:'0',desc:'Silently failing workflows',detail:'Every Bambino n8n build includes error handling, retry logic, and monitoring alerts — failures surface immediately, not weeks later.'}
    ],
    industriesTitle: 'n8n Automation for Vancouver Industries',
    industriesSub: 'Our Vancouver n8n specialists have automated workflows across:',
    industryPills: ['SaaS & Tech','Game Studios','Marketing Agencies','Cleantech','Real Estate','Healthcare Operations','Professional Services','Data Teams'],
    pricingTitle: 'n8n Automation Pricing for Vancouver Businesses',
    pricingSub: 'All prices in CAD. Flat project fees + optional monthly management retainers. No long-term contracts — cancel anytime with 30 days\' notice.',
    pricingPlans: [
      {name:'Starter',price:'1,200',period:'per workflow + GST/HST',desc:'Single workflow build for Vancouver businesses — up to 10 nodes, 2 integrations, full error handling, and documentation.',featured:false,features:['Up to 10-node workflow','2 API integrations','Error handling & retry logic','Execution monitoring setup','Workflow documentation'],cta:'Get Started →'},
      {name:'Growth',price:'3,800',period:'workflow bundle + GST/HST',desc:'5-workflow automation bundle for Vancouver teams — covering lead routing, CRM sync, reporting, and communication workflows.',featured:true,features:['5 custom workflow builds','Up to 5 integrations each','AI node integration','n8n cloud or self-hosted setup','Team training included','Monthly retainer (CA$800/mo)'],cta:'Get Started →'},
      {name:'Scale',price:'8,500',period:'automation stack + GST/HST',desc:'Full automation stack for Vancouver businesses — 10+ workflows, AI agent integration, self-hosted n8n on BC infrastructure, and ongoing management.',featured:false,features:['10+ workflow builds','AI agentic workflows','Self-hosted n8n on BC infra','Custom API integrations','Data pipeline builds','Monthly retainer (CA$1,600/mo)'],cta:'Get Started →'},
      {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke n8n automation programmes for complex Vancouver operations — multi-department, high-volume, or AI-heavy workflow requirements.',featured:false,features:['Unlimited workflow builds','Dedicated n8n architect','Custom AI agent development','SLA & priority support','Quarterly architecture reviews'],cta:'Talk to Us →'}
    ],
    otherServicesTitle: 'More Automation Services in Vancouver',
    otherServicesSub: 'n8n is one layer in your automation stack. Explore related services Bambino offers Vancouver businesses.',
    otherServiceCards: [
      {href:'/ca/vancouver/make-com-agency',label:'Related',title:'Make.com Agency Vancouver',desc:'Make.com scenario builds for simpler multi-app automations — a lighter complement to your n8n stack for visual workflows.'},
      {href:'/ca/vancouver/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Vancouver',desc:'GHL CRM automation — n8n workflows connecting GoHighLevel to the rest of your Vancouver tech stack.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full marketing automation strategy across n8n, HubSpot, GoHighLevel, and AI-powered custom builds.'},
      {href:'/ca/vancouver/seo-agency',label:'Also Available',title:'SEO Agency Vancouver',desc:'Organic search for Vancouver businesses — rankings that compound over time alongside your automation infrastructure.'}
    ],
    faqTitle: 'n8n Agency Vancouver — FAQs',
    faqItems: [
      {q:'What is n8n and why are Vancouver businesses adopting it?',a:'n8n is an open-source workflow automation platform for building complex multi-step automations between any apps with an API. Vancouver businesses choose n8n over Zapier and Make.com for: self-hosted PIPEDA-compliant data processing on BC infrastructure, JavaScript execution inside workflows, complex branching logic, AI model integration (OpenAI, Claude, Gemini), and volume-based automation without per-task charges.'},
      {q:'How much does n8n workflow development cost in Vancouver?',a:'Bambino charges CA$1,200 per workflow for standard builds, CA$3,800 for a 5-workflow bundle, and CA$8,500 for a full automation stack. Monthly management retainers start at CA$800/month. Prices exclude GST. Complex AI agentic workflows are scoped on discovery call.'},
      {q:'Can you deploy self-hosted n8n on Canadian infrastructure for our Vancouver business?',a:'Yes — this is a core offering. We deploy self-hosted n8n on AWS Canada (ca-central-1) or Azure Canada Central, keeping all data on Canadian soil and compliant with PIPEDA. We handle server provisioning, n8n installation, SSL configuration, and ongoing infrastructure management. Monthly infrastructure management is included in Scale and Enterprise tiers.'},
      {q:'How does n8n compare to Make.com for Vancouver businesses?',a:'Make.com (formerly Integromat) is an excellent visual automation tool ideal for straightforward multi-app connections. n8n is better when you need: self-hosted data sovereignty, JavaScript execution, complex branching across many steps, AI agent node integration, and higher execution volumes without escalating per-operation costs. Most Vancouver businesses use Make.com for simple scenarios and n8n for complex automation stacks.'},
      {q:'Can you integrate n8n with Shopify, HubSpot, or Salesforce for our Vancouver business?',a:'Yes. We build bidirectional integrations between n8n and all major platforms — Shopify, HubSpot, Salesforce, GoHighLevel, ActiveCampaign, Klaviyo, and more. Typical patterns: new Shopify order → CRM contact update + fulfilment notification + inventory sync, or HubSpot deal stage change → Slack notification + task creation + contract send trigger.'},
      {q:'Do you build AI agentic workflows with n8n in Vancouver?',a:'Yes — this is one of our specialisations. We build n8n AI agent workflows using OpenAI GPT-4, Anthropic Claude, and Google Gemini — systems that can classify inbound leads, draft personalised follow-up emails, analyse documents, summarise call transcripts, and interact with external APIs autonomously. Production-grade with proper context management, fallback logic, and monitoring.'},
      {q:'How long does n8n implementation take for a Vancouver business?',a:'Single workflow builds take 1–3 weeks from discovery to production. 5-workflow bundles take 3–5 weeks. Full automation stacks with AI agent integration and self-hosted infrastructure take 6–10 weeks. Timeline depends on integration complexity, API documentation quality, and your team\'s availability for review sessions.'},
      {q:'Do you offer ongoing n8n support and maintenance in Vancouver?',a:'Yes. Monthly management retainers cover: workflow monitoring, error investigation and fixes, new workflow builds, integration updates when third-party APIs change, and team support. Retainers start at CA$800/month for up to 10 managed workflows. All retainers are month-to-month — no long-term contracts.'}
    ],
    relatedLabel: 'Other Canadian Cities',
    relatedTitle: 'n8n Automation Agency Services Across Canada',
    relatedSub: 'Bambino builds n8n automations for businesses across Canada. Explore services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/toronto/n8n-agency',text:'Toronto n8n Agency →'},
      {href:'https://bambinoagency.com/ca/calgary/n8n-agency',text:'Calgary n8n Agency →'},
      {href:'https://bambinoagency.com/ca/ottawa/n8n-agency',text:'Ottawa n8n Agency →'},
      {href:'https://bambinoagency.com/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Automate Your Vancouver Business with n8n?',
    ctaSub: 'Book a free 30-minute n8n discovery call. We\'ll map your top automation opportunities, show you what\'s possible with n8n, and provide a project estimate — with no obligation to proceed.',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/vancouver/n8n-agency',text:'Vancouver n8n Agency'},
      {href:'/ca/toronto/n8n-agency',text:'Toronto n8n Agency'},
      {href:'/ca/calgary/n8n-agency',text:'Calgary n8n Agency'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Vancouver',
    footerLocalLinks: [
      {href:'/ca/vancouver/gohighlevel-agency',text:'GoHighLevel Agency'},
      {href:'/ca/vancouver/make-com-agency',text:'Make.com Agency'},
      {href:'/ca/vancouver/seo-agency',text:'SEO Agency'}
    ]
  },

  // ── Make.com Vancouver ─────────────────────────────────────────
  {
    outPath: 'ca/vancouver/make-com-agency/index.html',
    title: 'Make.com Agency Vancouver, BC | Certified Make Automation Experts | Bambino',
    metaDesc: 'Certified Make.com agency in Vancouver. Visual scenario builds, multi-app automation, CRM integration, and workflow optimisation for BC businesses. Make Partner. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/vancouver/make-com-agency',
    ogTitle: 'Make.com Agency Vancouver | Certified Make Automation Experts | Bambino',
    ogDesc: 'Vancouver Make.com agency. Visual scenario builds, multi-app automation, and CRM integration for BC businesses. Certified Make Partner. Free discovery call.',
    schemaDesc: 'Certified Make.com agency serving Vancouver, BC. Visual automation scenario builds, multi-app integrations, and workflow optimisation for Canadian businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'Make.com Agency Vancouver',url:'https://bambinoagency.com/ca/vancouver/make-com-agency'}
    ],
    heroLabel: 'Vancouver, BC',
    heroTitle: 'Make.com Agency in Vancouver, BC — Certified Make Automation, Scenarios & Integrations',
    heroSub: 'Make.com (formerly Integromat) is the visual automation platform Vancouver businesses use to connect their apps, automate repetitive tasks, and build multi-step workflows without engineering resources. Bambino\'s certified Make.com specialists build production scenarios for Vancouver companies — from simple Shopify–Slack notifications to complex multi-branch CRM automation that replaces hours of daily admin work.',
    heroCTA1: 'Book a Free Make.com Call →',
    heroCTA2: 'View CA Pricing',
    visualTitle: 'Make.com Vancouver Snapshot',
    visualStats: [
      {label:'Avg. scenarios per client',value:'12',sub:'Deployed in first 90 days'},
      {label:'Typical scenario delivery',value:'3–7 days',sub:'Discovery to live deployment'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketLabel: 'Vancouver Market',
    marketTitle: 'Make.com in Vancouver: Visual Automation for BC\'s Creative & Tech Economy',
    marketBody: 'Vancouver\'s business ecosystem — agencies in Yaletown, tech startups in Gastown, and ecommerce brands across Metro Vancouver — has embraced Make.com for its visual scenario builder, deep app library (1,000+ connectors), and ability to automate complex multi-app workflows without writing code. In 2026, Make.com is the tool of choice for Vancouver teams that need Zapier\'s ease-of-use at n8n\'s power level — and who don\'t have developer resources to build custom integrations.',
    marketEeat: 'Bambino Make.com builds: average 12 scenarios deployed per Vancouver client in the first 90 days, covering lead routing, CRM sync, reporting automation, and ecommerce order workflows.',
    marketNote: 'Vancouver verticals served: creative agencies, ecommerce brands, SaaS companies, real estate, professional services, media and entertainment, healthcare, and operations-heavy businesses.',
    marketStats: [
      {num:'675K',lbl:'City population'},
      {num:'2.6M',lbl:'Metro population'},
      {num:'12',lbl:'Avg. scenarios per client'},
      {num:'1,000+',lbl:'Make.com app connectors'}
    ],
    landscapeTitle: 'Make.com Competition in Vancouver: Virtually No Dedicated Agencies',
    landscapeBody: 'Vancouver has no dedicated Make.com agencies with a specific local presence. Generic national automation agencies exist but lack Vancouver market context and local business knowledge. Most Vancouver businesses that use Make.com are self-implementing — often with poorly structured scenarios that break on edge cases, have no error handling, and can\'t scale beyond basic use cases. This represents a clear opportunity for a well-positioned local Make.com partner.',
    landscapeCompetition: 'Very Low — zero dedicated Make.com agencies in Vancouver',
    landscapeLocalTitle: 'Why Vancouver Businesses Choose Make.com',
    landscapeLocalBody: 'Make.com sits between Zapier (easy but limited) and n8n (powerful but code-heavy). Vancouver businesses choose Make.com when they need: a visual drag-and-drop interface that non-developers can maintain, 1,000+ app connectors including niche tools, complex multi-branch scenario logic, data transformation without writing code, and scenario scheduling with granular trigger control. For straightforward-to-moderately-complex automation, Make.com is often the fastest path.',
    servicesTitle: 'Make.com Automation Services in Vancouver',
    servicesSub: 'Certified Make.com scenario builds for Vancouver businesses — from quick CRM integrations to complex multi-branch automation systems. Production-grade, not templates.',
    serviceCards: [
      {label:'Core Build',title:'Custom Make.com Scenario Development',desc:'Bespoke Make.com scenarios for Vancouver businesses — multi-module, multi-branch, with proper error handling, filters, and router logic. Built by certified Make specialists who understand the platform\'s constraints and capabilities.',href:'/services/marketing-automation'},
      {label:'CRM Automation',title:'CRM Integration & Sales Workflow',desc:'Connect HubSpot, Salesforce, GoHighLevel, Pipedrive, or ActiveCampaign to your Vancouver tech stack — automated contact creation, deal stage triggers, pipeline notifications, and follow-up sequences.',href:'/services/hubspot'},
      {label:'Ecommerce',title:'Ecommerce Automation Scenarios',desc:'Shopify, WooCommerce, and BigCommerce automation — order notifications, inventory sync, customer lifecycle triggers, refund workflows, and multi-channel fulfilment coordination for Vancouver ecommerce brands.',href:'/services/marketing-automation'},
      {label:'Lead Ops',title:'Lead Capture & Routing Automation',desc:'Automated lead intake from Typeform, HubSpot forms, Facebook Lead Ads, LinkedIn Lead Gen, and website forms — routed, scored, tagged, and assigned in your CRM within minutes of submission.',href:'/services/marketing-automation'},
      {label:'Reporting',title:'Reporting & Analytics Automation',desc:'Scheduled data collection from Google Ads, Meta, GA4, and CRM — transformed and delivered to Google Sheets, Notion, Airtable, or email dashboards. No more manual reporting for Vancouver marketing teams.',href:'/services/analytics'},
      {label:'Communication',title:'Slack, Email & Notification Workflows',desc:'Automated internal notifications, client status updates, and team alerts — triggered by CRM events, form submissions, payment events, or scheduled report delivery. Keep your Vancouver team informed without manual effort.',href:'/services/marketing-automation'},
      {label:'Audit & Fix',title:'Make.com Scenario Audit & Optimisation',desc:'Inherited a chaotic Make.com account? We audit existing scenarios for errors, inefficiencies, and structural problems — then rebuild or optimise to production standards with proper error handling and documentation.',href:'/services/marketing-automation'},
      {label:'Training',title:'Make.com Team Training',desc:'Train your Vancouver team to build and maintain Make.com scenarios independently — covering module types, data mapping, error handlers, iterators, and scenario scheduling. Includes written and video documentation.',href:'/services/marketing-automation'}
    ],
    whyTitle: 'Why Vancouver Businesses Choose Bambino for Make.com',
    whyCards: [
      {title:'Certified Make.com Specialists',desc:'Bambino\'s team holds Make.com partner certification. We understand the platform\'s module system, data handling, rate limiting, and error architecture — not just surface-level drag-and-drop. Production scenarios, not hobby builds.'},
      {title:'Error-First Scenario Design',desc:'Most Make.com scenarios break silently on edge cases — null values, API timeouts, malformed data. Bambino builds error handlers, fallback routes, and notification alerts into every scenario from the start.'},
      {title:'Vancouver Business Context',desc:'We understand the Vancouver business landscape — tech agencies, ecommerce brands, real estate, and creative studios. Scenarios are built for your actual workflows, not generic templates adapted from YouTube tutorials.'},
      {title:'n8n Integration Capability',desc:'When your automation needs exceed Make.com\'s constraints, Bambino can extend your stack with n8n — we build hybrid automation architectures where Make.com handles simple scenarios and n8n handles complex agentic workflows.'}
    ],
    processTitle: 'Our Vancouver Make.com Build Process',
    processSub: 'A structured scenario engineering approach refined across hundreds of Make.com builds for Canadian and UK businesses.',
    processSteps: [
      {num:'1',title:'Automation Audit',desc:'Map your Vancouver business\'s manual workflows, tool stack, and integration requirements. Identify Make.com automation opportunities ranked by hours saved and build complexity.'},
      {num:'2',title:'Scenario Architecture',desc:'Design scenario structures — module sequences, router branches, data transformations, error handlers — before building. Reviewed with your team before implementation starts.'},
      {num:'3',title:'Build & Test',desc:'Build scenarios in Make.com with proper filters, error handlers, and data mapping. Tested with real data — including malformed inputs, API timeout scenarios, and edge cases.'},
      {num:'4',title:'Deploy & Monitor',desc:'Activate scenarios with optimised scheduling and operation usage. Set up email error notifications and scenario monitoring so your team is alerted immediately if something fails.'},
      {num:'5',title:'Train & Expand',desc:'Walk your Vancouver team through scenario management. Monthly retainer for new builds, scenario updates, and optimisation as your automation requirements grow.'}
    ],
    resultsStats: [
      {stat:'12',desc:'Avg. scenarios deployed',detail:'Per Vancouver client in the first 90 days — covering CRM sync, lead routing, reporting, ecommerce, and communication workflows.'},
      {stat:'3–7 days',desc:'Typical scenario delivery',detail:'From discovery call to live production deployment for standard Make.com scenario builds.'},
      {stat:'0',desc:'Silent failures',detail:'Every Bambino Make.com build includes error handlers, fallback routes, and alert notifications — scenario failures surface immediately.'}
    ],
    industriesTitle: 'Make.com Automation for Vancouver Industries',
    industriesSub: 'Our Vancouver Make.com specialists have built automation scenarios across:',
    industryPills: ['Creative Agencies','Ecommerce Brands','SaaS Companies','Real Estate','Professional Services','Media & Entertainment','Healthcare Ops','Hospitality'],
    pricingTitle: 'Make.com Automation Pricing for Vancouver Businesses',
    pricingSub: 'All prices in CAD. Flat project fees + optional monthly management retainers. No long-term contracts.',
    pricingPlans: [
      {name:'Starter',price:'900',period:'per scenario + GST/HST',desc:'Single Make.com scenario for Vancouver businesses — up to 8 modules, 2 app connections, error handling, and documentation.',featured:false,features:['Up to 8-module scenario','2 app connections','Error handling & filters','Scenario scheduling setup','Build documentation'],cta:'Get Started →'},
      {name:'Growth',price:'3,200',period:'scenario bundle + GST/HST',desc:'5-scenario bundle for Vancouver teams — CRM sync, lead routing, reporting, ecommerce, and communication automation.',featured:true,features:['5 custom scenario builds','Up to 4 app connections each','Router & iterator logic','Error handler on every scenario','Team training included','Monthly retainer (CA$700/mo)'],cta:'Get Started →'},
      {name:'Scale',price:'7,500',period:'automation stack + GST/HST',desc:'Full Make.com automation stack for Vancouver businesses — 10+ scenarios, cross-app orchestration, and ongoing management.',featured:false,features:['10+ scenario builds','Complex multi-branch logic','Scenario audit & rebuild','Operations usage optimisation','Data transformation modules','Monthly retainer (CA$1,400/mo)'],cta:'Get Started →'},
      {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke Make.com automation programmes for complex Vancouver operations with high scenario volumes or multi-department requirements.',featured:false,features:['Unlimited scenario builds','Dedicated Make specialist','Account architecture review','SLA & priority support','n8n integration if needed'],cta:'Talk to Us →'}
    ],
    otherServicesTitle: 'More Automation Services in Vancouver',
    otherServicesSub: 'Make.com is one tool in your automation stack. Explore related Bambino services for Vancouver businesses.',
    otherServiceCards: [
      {href:'/ca/vancouver/n8n-agency',label:'Related',title:'n8n Agency Vancouver',desc:'For complex automation beyond Make.com — AI agent workflows, self-hosted PIPEDA-compliant deployments, and JavaScript-powered orchestration.'},
      {href:'/ca/vancouver/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Vancouver',desc:'GHL CRM setup and automation — Make.com scenarios connecting GoHighLevel to your full Vancouver tech stack.'},
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full automation strategy across Make.com, n8n, HubSpot, and AI-powered custom builds for growing businesses.'},
      {href:'/ca/vancouver/seo-agency',label:'Also Available',title:'SEO Agency Vancouver',desc:'Organic search growth for Vancouver businesses — compound rankings that work alongside your automation stack.'}
    ],
    faqTitle: 'Make.com Agency Vancouver — FAQs',
    faqItems: [
      {q:'What is Make.com and why do Vancouver businesses use it?',a:'Make.com (formerly Integromat) is a visual automation platform that connects 1,000+ apps through drag-and-drop scenario builders. Vancouver businesses use it to automate repetitive multi-app workflows — lead routing, CRM sync, ecommerce operations, reporting, and client communications — without needing developer resources. It sits between Zapier (simpler) and n8n (more powerful) in terms of capability.'},
      {q:'How much does Make.com scenario development cost in Vancouver?',a:'Bambino charges CA$900 per scenario for standard builds, CA$3,200 for a 5-scenario bundle, and CA$7,500 for a full automation stack. Monthly management retainers start at CA$700/month. All prices exclude GST. Complex multi-branch scenarios with custom data transformation are scoped on discovery call.'},
      {q:'What\'s the difference between Make.com and Zapier for Vancouver businesses?',a:'Make.com offers significantly more power than Zapier at similar price points: visual multi-branch scenario logic, iterators, aggregators, data store modules, and far better error handling. Make.com is harder to learn than Zapier but much more capable. For Vancouver businesses that have outgrown Zapier\'s linear automation model, Make.com is typically the next step before n8n.'},
      {q:'Can you migrate our Zapier Zaps to Make.com?',a:'Yes. We audit existing Zapier workflows, map the logic to Make.com scenario architecture, rebuild in Make.com with improved error handling and structure, and test before you cancel your Zapier subscription. Most Vancouver businesses that migrate from Zapier to Make.com reduce their automation costs while gaining significantly more capability.'},
      {q:'Can Make.com connect to GoHighLevel, HubSpot, or Shopify?',a:'Yes. Make.com has native connectors for GoHighLevel, HubSpot, Shopify, Salesforce, ActiveCampaign, Klaviyo, and hundreds of other platforms. For tools without native modules, we use HTTP request modules and webhook triggers to build custom connections.'},
      {q:'Do you offer Make.com account audits for Vancouver businesses?',a:'Yes. We audit existing Make.com accounts for structural problems, error-prone scenarios, operation inefficiencies, and missing error handlers — then provide a written audit report with recommendations, followed by rebuild or optimisation work as needed.'},
      {q:'When should a Vancouver business use Make.com versus n8n?',a:'Use Make.com when you want visual scenario building your team can maintain without coding, when your automations are moderately complex (not requiring JavaScript execution), and when 1,000+ native app connectors cover your stack. Use n8n when you need self-hosted PIPEDA-compliant data processing, JavaScript inside workflows, AI agent nodes, or very high execution volumes. Many Vancouver businesses use both — Make.com for simpler scenarios, n8n for complex agentic workflows.'},
      {q:'Do you offer ongoing Make.com management for Vancouver businesses?',a:'Yes. Monthly management retainers cover: scenario monitoring, error investigation and fixes, new scenario builds, connector updates when third-party APIs change, operations usage optimisation, and team support. Retainers start at CA$700/month for up to 10 managed scenarios. All retainers are month-to-month.'}
    ],
    relatedLabel: 'Other Canadian Cities',
    relatedTitle: 'Make.com Automation Agency Services Across Canada',
    relatedSub: 'Bambino builds Make.com automations for businesses across Canada. Explore services in other cities:',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/toronto/make-com-agency',text:'Toronto Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/calgary/make-com-agency',text:'Calgary Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/ottawa/make-com-agency',text:'Ottawa Make.com Agency →'},
      {href:'https://bambinoagency.com/ca/vancouver/n8n-agency',text:'Vancouver n8n Agency →'}
    ],
    ctaTitle: 'Ready to Automate Your Vancouver Business with Make.com?',
    ctaSub: 'Book a free 30-minute Make.com discovery call. We\'ll map your top automation opportunities, show you what\'s achievable with Make.com, and give you a project estimate — with no obligation to proceed.',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/vancouver/make-com-agency',text:'Vancouver Make.com Agency'},
      {href:'/ca/toronto/make-com-agency',text:'Toronto Make.com Agency'},
      {href:'/ca/calgary/make-com-agency',text:'Calgary Make.com Agency'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Vancouver',
    footerLocalLinks: [
      {href:'/ca/vancouver/n8n-agency',text:'n8n Agency'},
      {href:'/ca/vancouver/gohighlevel-agency',text:'GoHighLevel Agency'},
      {href:'/ca/vancouver/seo-agency',text:'SEO Agency'}
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
