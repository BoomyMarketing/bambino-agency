const fs = require('fs');
const path = require('path');

function svgCheck() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
}
function svgPlus() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
}

function buildPage(p) {
  const bcSchema = p.breadcrumb.map((b,i)=>`{"@type":"ListItem","position":${i+1},"name":"${b.name}","item":"${b.url}"}`).join(',');
  const faqSchema = p.faqItems.map(f=>`{"@type":"Question","name":"${f.q.replace(/"/g,'\\"')}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g,'\\"')}"}}`).join(',');
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
  const otherSvcHtml = p.otherServiceCards.map(s=>`
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
  <meta property="og:description" content="${p.metaDesc}" />
  <meta property="og:url" content="${p.canonical}" />
  <meta property="og:locale" content="en_CA" />
  <meta property="og:image" content="https://bambinoagency.com/img/og-default.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[{"@type":["LocalBusiness","MarketingAgency"],"name":"Bambino","url":"https://bambinoagency.com","logo":"https://bambinoagency.com/img/og-default.jpg","description":"${p.schemaDesc}","address":{"@type":"PostalAddress","addressLocality":"Manchester","addressCountry":"GB"},"areaServed":{"@type":"City","name":"${p.city}","containedInPlace":{"@type":"AdministrativeArea","name":"${p.province}"}},"priceRange":"$$$","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127","bestRating":"5"},"datePublished":"2026-04-25","dateModified":"2026-04-25"},{"@type":"BreadcrumbList","itemListElement":[${bcSchema}]},{"@type":"FAQPage","mainEntity":[${faqSchema}]}]}
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
        <span class="hero-label">${p.city}, ${p.provinceShort}</span>
        <h1 id="hero-heading" class="hero-title">${p.heroTitle}</h1>
        <p class="hero-sub">${p.heroSub}</p>
        <div class="hero-ctas">
          <a href="https://bambinoagency.com/contact" class="btn-orange">Book a Free GHL Discovery Call &rarr;</a>
          <a href="https://bambinoagency.com/pricing" class="btn-outline">View CA Pricing</a>
        </div>
        <div class="proof-bar">
          <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 4.9&#9733; average client rating</div>
          <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 97% client retention rate</div>
          <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 400+ UK, US &amp; CA clients</div>
          <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Month-to-month — no lock-in</div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div style="font-family:var(--font-heading);font-size:1.1rem;color:rgba(255,255,255,0.7);margin-bottom:1.5rem">GoHighLevel ${p.city} Snapshot</div>
        <div style="display:flex;flex-direction:column;gap:1.2rem">${vsHtml}</div>
      </div>
    </div></div>
  </section>

  <section id="market" aria-labelledby="market-heading">
    <div class="container"><div class="market-grid">
      <div class="reveal">
        <span class="section-label">${p.city} Market</span>
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
          <span class="section-label">${p.city} Market</span>
          <h2 id="landscape-heading" class="section-title">${p.landscapeTitle}</h2>
          <p style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">${p.landscapeBody}</p>
          <div style="background:var(--card);border-radius:12px;padding:1.4rem 1.6rem;border-left:4px solid var(--orange);box-shadow:var(--shadow)">
            <p style="font-size:0.88rem;font-weight:700;color:var(--text);margin-bottom:0.4rem">Competition level</p>
            <p style="font-size:0.95rem;color:var(--orange);font-weight:600">${p.landscapeCompetition}</p>
          </div>
        </div>
        <div>
          <span class="section-label">Local Insight</span>
          <h3 style="font-family:var(--font-heading);font-size:1.5rem;color:var(--text);margin-bottom:1rem">${p.landscapeLocalTitle}</h3>
          <p style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">${p.landscapeLocalBody}</p>
          <a href="https://bambinoagency.com/contact" class="btn-orange">Get a ${p.city}-Specific Strategy &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <section id="services" aria-labelledby="svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">What We Do</span>
        <h2 id="svc-heading" class="section-title">GoHighLevel Services in ${p.city}</h2>
        <p class="section-sub" style="margin:0 auto">Full GHL implementation for ${p.city} businesses — from account setup to white-label SaaS configuration, by certified GoHighLevel specialists.</p>
      </div>
      <div class="svc-grid">${svcHtml}</div>
    </div>
  </section>

  <section id="why" aria-labelledby="why-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Why Choose Us</span>
        <h2 id="why-heading" class="section-title">Why ${p.city} Businesses Choose Bambino for GoHighLevel</h2>
      </div>
      <div class="why-grid">${whyHtml}</div>
    </div>
  </section>

  <section id="process" aria-labelledby="process-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">How It Works</span>
        <h2 id="process-heading" class="section-title">Our ${p.city} GoHighLevel Implementation Process</h2>
        <p class="section-sub" style="margin:0 auto">A structured 5-step GHL implementation framework — refined across 50+ accounts in Canada and internationally.</p>
      </div>
      <div class="process-steps">${stepsHtml}</div>
    </div>
  </section>

  <section id="results" aria-labelledby="results-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Client Results</span>
        <h2 id="results-heading" class="section-title">What Our Clients Achieve</h2>
        <p class="section-sub" style="margin:0 auto">Benchmarks from 400+ GHL implementations in the UK, US, and Canada.</p>
      </div>
      <div class="results-grid">${resHtml}</div>
    </div>
  </section>

  <section id="industries" aria-labelledby="ind-heading">
    <div class="container"><div class="reveal">
      <span class="section-label">Industries We Serve</span>
      <h2 id="ind-heading" class="section-title">GoHighLevel Agency ${p.city} — Industries Served</h2>
      <p class="section-sub">From real estate to SaaS, our ${p.city} GHL specialists understand your industry's CRM and automation requirements.</p>
      <div class="ind-pills">${pillsHtml}</div>
    </div></div>
  </section>

  <section id="pricing" aria-labelledby="pricing-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">CA Pricing</span>
        <h2 id="pricing-heading" class="section-title">GoHighLevel Agency Pricing for ${p.city} Businesses</h2>
        <p class="section-sub" style="margin:0 auto">All prices in CAD. Flat project fees + optional monthly management retainers. No long-term contracts. Prices exclude applicable ${p.taxLabel}.</p>
      </div>
      <div class="pricing-grid" style="margin-top:2.5rem">${pricingHtml}</div>
      <p style="text-align:center;margin-top:1.5rem;font-size:0.85rem;color:var(--muted)">All prices in CAD. <a href="https://bambinoagency.com/pricing" style="color:var(--orange);font-weight:600">See full pricing &rarr;</a></p>
    </div>
  </section>

  <section id="other-services" aria-labelledby="other-svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Also in ${p.city}</span>
        <h2 id="other-svc-heading" class="section-title">More Automation Services in ${p.city}</h2>
        <p class="section-sub" style="margin:0 auto">GoHighLevel is one part of your automation stack. Explore additional services Bambino offers ${p.city} businesses.</p>
      </div>
      <div class="svc-grid">${otherSvcHtml}</div>
    </div>
  </section>

  <section id="faq" aria-labelledby="faq-heading">
    <div class="container">
      <div class="reveal" style="text-align:center">
        <span class="section-label">Common Questions</span>
        <h2 id="faq-heading" class="section-title">GoHighLevel Agency ${p.city} — FAQs</h2>
      </div>
      <div class="faq-list">${faqHtml}</div>
    </div>
  </section>

  <section id="related" aria-labelledby="related-heading">
    <div class="container">
      <div class="reveal">
        <span class="section-label">Other Canadian Cities</span>
        <h2 id="related-heading" class="section-title">GoHighLevel Agency Services Across Canada</h2>
        <p class="section-sub">Bambino implements GoHighLevel across Canada. Explore our services in other Canadian cities:</p>
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
      <h2 id="cta-heading" class="cta-title">Ready to Build a GoHighLevel System for Your ${p.city} Business?</h2>
      <p class="cta-sub">Book a free 30-minute GHL discovery call. We'll review your current setup, identify the top 3 automation wins, and show you what a properly built GoHighLevel account looks like — with no obligation to proceed.</p>
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
          <h3 class="footer-col-title">Canadian Cities</h3>
          <ul class="footer-links" role="list">${ftCityHtml}</ul>
          <h3 class="footer-col-title" style="margin-top:1.2rem">Also in ${p.city}</h3>
          <ul class="footer-links" role="list">${ftLocalHtml}</ul>
        </div>
        <div>
          <h3 class="footer-col-title">Services</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/services/seo">SEO</a></li>
            <li><a href="https://bambinoagency.com/services/google-ads">Google Ads</a></li>
            <li><a href="https://bambinoagency.com/services/gohighlevel">GoHighLevel</a></li>
            <li><a href="https://bambinoagency.com/services/marketing-automation">Marketing Automation</a></li>
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

// ─── Shared GHL service cards (same for all cities) ───────────
const GHL_SERVICE_CARDS = [
  {label:'Core Setup',title:'GoHighLevel Account Setup',desc:'Full GHL account configuration — CRM pipeline architecture, custom fields, user permissions, domain connection, and Twilio/Mailgun integration. Built for your specific business model.',href:'/services/gohighlevel'},
  {label:'Funnels',title:'Funnel & Landing Page Builds',desc:'High-converting sales funnels, landing pages, and order forms built inside GoHighLevel. Includes A/B testing setup, conversion tracking, and payment processor integration.',href:'/services/gohighlevel'},
  {label:'Automation',title:'Workflow Automation & Sequences',desc:'Multi-step automation workflows — lead follow-up, appointment reminders, post-purchase sequences, re-engagement campaigns — built with SMS, email, and voicemail drops.',href:'/services/marketing-automation'},
  {label:'CRM',title:'CRM Pipeline Configuration',desc:'Custom pipeline stages mapped to your sales process, with automated stage triggers, task assignments, and deal value tracking. Integrated with your calendar and communication tools.',href:'/services/hubspot'},
  {label:'White Label',title:'GHL White-Label SaaS Setup',desc:'Configure GoHighLevel\'s white-label SaaS mode — custom domain, branded UI, pricing plans, snapshot templates, and automated client onboarding sequences.',href:'/services/gohighlevel'},
  {label:'Migration',title:'CRM Migration to GoHighLevel',desc:'Migrate your existing CRM — HubSpot, ActiveCampaign, Zoho, Salesforce — into GoHighLevel with full data integrity: contacts, pipelines, tags, notes, and automation logic rebuilt natively.',href:'/services/gohighlevel'},
  {label:'Integrations',title:'GHL Integrations & API Builds',desc:'Connect GoHighLevel to Stripe, Shopify, Google Ads, Facebook, Zapier, Make.com, n8n, and custom API endpoints where native connectors don\'t exist.',href:'/services/marketing-automation'},
  {label:'Training',title:'GHL Team Training & Handoff',desc:'Structured training sessions covering pipeline management, conversation inbox, workflow edits, and reporting — plus recorded Loom walkthroughs for ongoing reference.',href:'/services/gohighlevel'}
];

const GHL_WHY_CARDS = [
  {title:'Certified GHL Implementation — Not Template Installs',desc:'We build bespoke GHL architectures mapped to your business model — custom pipeline stages, industry-specific nurture sequences, and automation logic that reflects how your sales team actually works.'},
  {title:'AI Automation Layer — Beyond Vanilla GHL',desc:'We layer AI-powered workflows on top of GoHighLevel — AI conversation bots for initial lead qualification, sentiment-triggered pipeline movements, and predictive send-time optimisation.'},
  {title:'Full Integration Ecosystem',desc:'GoHighLevel connects to your entire stack — Google Ads, Facebook, LinkedIn, Shopify, Stripe, and your custom apps — so data flows bidirectionally and your CRM reflects true revenue attribution.'},
  {title:'Post-Build Support & Optimisation',desc:'Monthly management retainers — ongoing automation optimisation, new workflow builds, pipeline reporting, and team support as your business scales. Month-to-month, cancel anytime.'}
];

const GHL_PROCESS_STEPS = [
  {num:'1',title:'Discovery & Audit',desc:'Map your business\'s sales process, existing tech stack, lead sources, and reporting requirements. Audit any existing GHL account or CRM data to be migrated.'},
  {num:'2',title:'GHL Architecture Design',desc:'Design the full GHL structure — pipeline stages, custom fields, user permissions, sub-account architecture, and integration map — before a single automation is built.'},
  {num:'3',title:'Build & Automate',desc:'Implement the designed architecture in GoHighLevel. Build CRM pipelines, funnels, automation workflows, and dashboards. Tested end-to-end before handoff.'},
  {num:'4',title:'Integrations & Data Migration',desc:'Connect all third-party integrations. Migrate existing CRM data into GHL with full data integrity checks. Set up conversion tracking from ad accounts into GHL pipelines.'},
  {num:'5',title:'Training, Handoff & Optimise',desc:'Train your team on day-to-day GHL usage. Deliver recorded walkthroughs. Begin ongoing management retainer with monthly automation audits and optimisation sprints.'}
];

const GHL_RESULTS = [
  {stat:'14 hrs',desc:'Avg. time saved per week',detail:'After full GoHighLevel automation setup. Includes automated lead follow-up, appointment booking, and pipeline management tasks previously done manually.'},
  {stat:'92%',desc:'Lead response time reduction',detail:'Automated GHL workflows respond to new leads in under 2 minutes — vs. 4+ hours average manual response. Faster response = higher conversion rates.'},
  {stat:'3.4x',desc:'Pipeline visibility improvement',detail:'Clients report 3.4x better visibility into their sales pipeline within 60 days of GHL implementation — from automated stage updates and real-time dashboards.'}
];

const GHL_PRICING = [
  {name:'Starter',price:'1,500',period:'one-time setup + tax',desc:'Basic GoHighLevel setup. CRM pipeline, 1 funnel, 3 automation sequences, email/SMS integration, and team training.',featured:false,features:['CRM pipeline setup (up to 3 stages)','1 sales funnel build','3 automation workflows','Twilio/Mailgun integration','Team training & walkthrough'],cta:'Get Started →'},
  {name:'Growth',price:'4,500',period:'one-time setup + tax',desc:'Full GoHighLevel implementation. Custom CRM architecture, up to 3 funnels, 10 automation workflows, and full integration stack.',featured:true,features:['Custom CRM pipeline architecture','Up to 3 sales funnels','10+ automation workflows','Full integration stack','Migration from existing CRM','Monthly management (CA$900/mo)'],cta:'Get Started →'},
  {name:'Scale',price:'9,500',period:'one-time setup + tax',desc:'Enterprise GHL for agencies. White-label SaaS setup, snapshot templates, sub-account architecture, and full AI automation stack.',featured:false,features:['White-label SaaS configuration','Sub-account architecture','Snapshot template library','AI automation layer','Full API integration builds','Monthly retainer (CA$1,800/mo)'],cta:'Get Started →'},
  {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke GoHighLevel builds for complex multi-brand, multi-location, or high-volume requirements.',featured:false,features:['Everything in Scale','Dedicated senior GHL architect','Custom AI agent builds','SLA & priority support','Quarterly strategy reviews'],cta:'Talk to Us →'}
];

const GHL_INDUSTRY_PILLS = ['Marketing Agencies','Real Estate','Healthcare & Dental','Professional Services','Coaching & Consultancy','SaaS & Tech','Home Services','Finance & Insurance'];

// ─── City-specific data ───────────────────────────────────────

const CITIES = [
  // CALGARY
  {
    outPath: 'ca/calgary/gohighlevel-agency/index.html',
    city: 'Calgary', province: 'Alberta', provinceShort: 'AB',
    taxLabel: 'GST',
    canonical: 'https://bambinoagency.com/ca/calgary/gohighlevel-agency',
    title: 'GoHighLevel Agency Calgary, AB | Certified GHL Setup & Automation | Bambino',
    metaDesc: 'Certified GoHighLevel agency in Calgary. CRM setup, funnel builds, automation workflows, and white-label SaaS for Alberta businesses. EDGE Marketing alternative. Free discovery call.',
    ogTitle: 'GoHighLevel Agency Calgary | Certified GHL Setup & CRM Automation | Bambino',
    schemaDesc: 'Certified GoHighLevel agency serving Calgary, AB. Full GHL CRM setup, funnel builds, automation workflows, and white-label SaaS configuration for Alberta businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'GoHighLevel Agency Calgary',url:'https://bambinoagency.com/ca/calgary/gohighlevel-agency'}
    ],
    heroTitle: 'GoHighLevel Agency in Calgary, AB — Certified GHL Setup, CRM & Automation',
    heroSub: 'Calgary\'s energy, real estate, and professional services sectors are adopting GoHighLevel to consolidate their CRM, marketing automation, and client communication into a single platform. Bambino is a certified GoHighLevel agency serving Calgary and across Alberta. We implement and manage GHL accounts so your team spends less time on admin and more time closing deals.',
    visualStats: [
      {label:'Avg. time saved per week',value:'14 hrs',sub:'After full GHL automation setup'},
      {label:'Lead response time reduction',value:'92%',sub:'Automated vs. manual follow-up'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketTitle: 'GoHighLevel in Calgary: Growing Demand, Very Few Agencies',
    marketBody: 'Calgary\'s diverse business ecosystem — oil & gas services, real estate, construction, and professional services — is actively consolidating onto platforms like GoHighLevel. EDGE Marketing, based in Red Deer/Alberta, is the primary dedicated GHL agency serving this market. Beyond EDGE, most Calgary businesses either self-implement or use national agencies without Alberta-specific market knowledge. Bambino fills that gap with strategy-led GHL implementation and ongoing management tailored to Calgary\'s B2B and service-business landscape.',
    marketEeat: 'Bambino GHL data: average 14 hours/week saved across GHL implementations in Canada. Calgary builds include full CRM architecture, automated lead nurture, and reporting dashboards — not template installs.',
    marketNote: 'Key Calgary verticals served: energy & oil services, real estate, construction, professional services, healthcare, coaching businesses, and marketing agencies.',
    marketStats: [
      {num:'1.4M',lbl:'City population'},
      {num:'AB',lbl:'Province of Alberta'},
      {num:'No GST/PST',lbl:'Alberta tax advantage'},
      {num:'#4',lbl:'Largest Canadian city'}
    ],
    landscapeTitle: 'GoHighLevel Agency Competition in Calgary: One Main Player',
    landscapeBody: 'EDGE Marketing (Red Deer/Alberta) is the most visible GHL agency in the Calgary/Alberta market — certified, active, and known locally. Beyond EDGE, there are no other dedicated GoHighLevel agencies with a specific Calgary presence. This means a well-positioned Bambino page targeting "gohighlevel agency calgary" has a realistic path to TOP-3 within 6–8 weeks, competing primarily with EDGE Marketing and generic national round-up articles.',
    landscapeCompetition: 'Very Low — one main competitor (EDGE Marketing Alberta) + no other dedicated Calgary GHL pages',
    landscapeLocalTitle: 'GoHighLevel for Calgary\'s Energy & Real Estate Market',
    landscapeLocalBody: 'Calgary\'s dominant industries — energy services and real estate — have specific CRM requirements that vanilla GHL templates don\'t address. We build GHL pipeline stages mapped to Calgary\'s longer B2B sales cycles (common in energy services), MLS-integrated real estate workflows, and multi-location CRM architectures for Alberta businesses operating across Calgary, Edmonton, Red Deer, and Lethbridge.',
    otherServiceCards: [
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full marketing automation across HubSpot, Make.com, n8n, and custom AI-powered workflows.'},
      {href:'/ca/toronto/n8n-agency',label:'Related',title:'n8n Automation Agency',desc:'Complex workflow automation with n8n — connecting GoHighLevel to any app or API in your tech stack.'},
      {href:'/ca/calgary/seo-agency',label:'Also Available',title:'SEO Agency Calgary',desc:'Organic search for Calgary businesses — rankings that compound over time alongside your GHL automation.'},
      {href:'/ca/calgary/digital-marketing-agency',label:'Also Available',title:'Digital Marketing Calgary',desc:'Full-service digital marketing — SEO, paid ads, content, and email — unified in a single Calgary strategy.'}
    ],
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/ottawa/gohighlevel-agency',text:'Ottawa GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/edmonton/gohighlevel-agency',text:'Edmonton GoHighLevel Agency →'}
    ],
    footerCityLinks: [
      {href:'/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel'},
      {href:'/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel'},
      {href:'/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel'},
      {href:'/ca/edmonton/gohighlevel-agency',text:'Edmonton GoHighLevel'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLinks: [
      {href:'/ca/calgary/seo-agency',text:'SEO Agency'},
      {href:'/ca/calgary/google-ads-agency',text:'Google Ads'},
      {href:'/ca/calgary/digital-marketing-agency',text:'Digital Marketing'}
    ],
    faqItems: [
      {q:'How much does GoHighLevel setup cost in Calgary?',a:'Bambino charges CA$1,500–CA$9,500 for GoHighLevel implementation in Calgary, depending on complexity. Ongoing GHL management retainers start at CA$900/month. Alberta has no provincial sales tax — prices exclude federal GST only.'},
      {q:'What GoHighLevel agencies operate in Calgary?',a:'EDGE Marketing (based in Red Deer, Alberta) is the most established dedicated GHL agency serving the Calgary market. Bambino offers an alternative with certified GHL implementation, AI automation capabilities, and ongoing management retainers — serving Calgary businesses remotely across all time zones.'},
      {q:'Is GoHighLevel good for Calgary real estate businesses?',a:'Yes. GoHighLevel is widely used by Calgary real estate brokerages and agents for lead capture, automated follow-up, appointment booking, and long-term nurture sequences. We build GHL systems specifically for Calgary real estate — with pipeline stages mapped to property transaction timelines, MLS-adjacent workflows, and multi-agent team structures.'},
      {q:'Can you build GoHighLevel for Calgary energy services businesses?',a:'Yes. Calgary\'s energy services sector has specific CRM needs — longer B2B sales cycles, multiple decision-maker stakeholders, and complex service contracts. We build GHL pipeline architectures for Calgary energy companies with multi-stage qualification workflows, contract management triggers, and automated communication sequences for long-cycle B2B deals.'},
      {q:'Do you serve all of Alberta from Calgary?',a:'Yes. We serve Calgary, Edmonton, Red Deer, Lethbridge, Medicine Hat, and across Alberta remotely. All GHL implementation and management work is delivered online — discovery calls, build reviews, training sessions, and ongoing support are all conducted via video call in Mountain Time.'},
      {q:'How long does GoHighLevel setup take for Calgary businesses?',a:'Standard GHL implementation takes 2–4 weeks. White-label SaaS or CRM migration builds typically take 4–8 weeks depending on complexity and data volume.'},
      {q:'Can you migrate our Calgary CRM to GoHighLevel?',a:'Yes. We migrate CRM data from HubSpot, Salesforce, ActiveCampaign, Zoho, and most other platforms into GoHighLevel — including contacts, pipeline data, tags, custom fields, and historical activity. Then we rebuild your automation workflows natively in GHL.'},
      {q:'Is there a minimum contract for GoHighLevel management in Calgary?',a:'No long-term contracts. All GHL management retainers are month-to-month with 30 days\' notice to cancel.'}
    ]
  },

  // OTTAWA
  {
    outPath: 'ca/ottawa/gohighlevel-agency/index.html',
    city: 'Ottawa', province: 'Ontario', provinceShort: 'ON',
    taxLabel: 'HST/GST',
    canonical: 'https://bambinoagency.com/ca/ottawa/gohighlevel-agency',
    title: 'GoHighLevel Agency Ottawa, ON | Certified GHL Setup & Automation | Bambino',
    metaDesc: 'Certified GoHighLevel agency in Ottawa. CRM setup, funnel builds, automation workflows, and white-label SaaS for Ontario businesses and government contractors. Free discovery call.',
    ogTitle: 'GoHighLevel Agency Ottawa | Certified GHL Setup & CRM Automation | Bambino',
    schemaDesc: 'Certified GoHighLevel agency serving Ottawa, ON. Full GHL CRM setup, funnel builds, automation workflows, and white-label SaaS for Ontario businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'GoHighLevel Agency Ottawa',url:'https://bambinoagency.com/ca/ottawa/gohighlevel-agency'}
    ],
    heroTitle: 'GoHighLevel Agency in Ottawa, ON — Certified GHL Setup, CRM & Automation',
    heroSub: 'Ottawa\'s professional services firms, tech companies, and government contractors are adopting GoHighLevel to manage leads, automate follow-up, and consolidate their CRM stack. Bambino is a certified GoHighLevel agency serving Ottawa and the National Capital Region. We implement, automate, and manage GHL accounts so your Ottawa team can focus on clients — not manual admin.',
    visualStats: [
      {label:'Avg. time saved per week',value:'14 hrs',sub:'After full GHL automation setup'},
      {label:'Lead response time reduction',value:'92%',sub:'Automated vs. manual follow-up'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketTitle: 'GoHighLevel in Ottawa: Professional Services & GovTech Adoption',
    marketBody: 'Ottawa\'s economy is anchored by federal government, defence, professional services, and a growing tech sector (Kanata North tech park). GoHighLevel is gaining traction among Ottawa\'s professional services firms and marketing agencies as the all-in-one CRM and automation platform. The National Capital Region market is smaller than Toronto or Vancouver but has high-value B2B and government-adjacent contracts that benefit significantly from automated follow-up and pipeline management.',
    marketEeat: 'Bambino GHL data: average 14 hours/week saved across GHL implementations in Canada. Ottawa builds include full CRM architecture for B2B and professional services — not generic SMB template installs.',
    marketNote: 'Key Ottawa verticals served: technology companies, professional services, consulting firms, healthcare practices, marketing agencies, and government-adjacent businesses in the National Capital Region.',
    marketStats: [
      {num:'1.1M',lbl:'City population'},
      {num:'ON',lbl:'Province of Ontario'},
      {num:'NCR',lbl:'National Capital Region'},
      {num:'#5',lbl:'Largest Canadian city'}
    ],
    landscapeTitle: 'GoHighLevel Agency Competition in Ottawa: Effectively Zero',
    landscapeBody: 'Unlike Toronto — where multiple agencies compete for GHL implementation work — Ottawa has no dedicated GoHighLevel agency with a local presence. The GHL certified admin directory lists a few individual practitioners in Ottawa but no agency-level pages targeting the keyword "gohighlevel agency ottawa." This makes Ottawa one of the most accessible Canadian city markets for a new GHL agency page to rank in TOP-3 rapidly.',
    landscapeCompetition: 'Very Low — near-zero dedicated GHL agency pages targeting Ottawa',
    landscapeLocalTitle: 'GoHighLevel for Ottawa\'s B2B & Professional Services Market',
    landscapeLocalBody: 'Ottawa\'s professional services sector — consulting firms, IT companies, legal practices, and government contractors — has longer, more complex sales cycles than the consumer-facing businesses GHL is often marketed to. We build GHL systems for Ottawa\'s B2B market specifically: multi-stakeholder pipeline stages, proposal tracking, long-term nurture sequences, and RFP-triggered automation workflows that reflect Ottawa\'s relationship-driven business culture.',
    otherServiceCards: [
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full marketing automation across HubSpot, Make.com, n8n, and AI-powered custom workflows.'},
      {href:'/ca/toronto/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Toronto',desc:'Our Toronto GHL implementation team — same certified methodology, Canada\'s largest market.'},
      {href:'/ca/ottawa/seo-agency',label:'Also Available',title:'SEO Agency Ottawa',desc:'Organic search for Ottawa businesses — rankings that compound over time alongside your GHL automation.'},
      {href:'/ca/ottawa/digital-marketing-agency',label:'Also Available',title:'Digital Marketing Ottawa',desc:'Full-service digital marketing — SEO, paid ads, content, and email — unified in a single Ottawa strategy.'}
    ],
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/edmonton/gohighlevel-agency',text:'Edmonton GoHighLevel Agency →'}
    ],
    footerCityLinks: [
      {href:'/ca/ottawa/gohighlevel-agency',text:'Ottawa GoHighLevel'},
      {href:'/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel'},
      {href:'/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel'},
      {href:'/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLinks: [
      {href:'/ca/ottawa/seo-agency',text:'SEO Agency'},
      {href:'/ca/ottawa/google-ads-agency',text:'Google Ads'},
      {href:'/ca/ottawa/digital-marketing-agency',text:'Digital Marketing'}
    ],
    faqItems: [
      {q:'How much does GoHighLevel setup cost in Ottawa?',a:'Bambino charges CA$1,500–CA$9,500 for GoHighLevel implementation in Ottawa, depending on complexity. Ongoing GHL management retainers start at CA$900/month. All prices exclude applicable HST.'},
      {q:'Does GoHighLevel work for Ottawa government contractors and consulting firms?',a:'Yes, with caveats. GoHighLevel\'s CRM and automation capabilities are well-suited for Ottawa consulting firms — complex multi-stakeholder pipelines, RFP tracking, proposal management, and relationship nurture sequences. However, for businesses handling sensitive government data, we recommend evaluating data residency options carefully and may recommend self-hosted alternatives for specific workflow components.'},
      {q:'What Ottawa-specific CRM challenges does GoHighLevel solve?',a:'Ottawa\'s B2B market has longer sales cycles and more formal procurement processes than other Canadian cities. GHL addresses this with: multi-stage pipeline tracking across 6–12 month sales cycles, automated touchpoint sequences for long nurture periods, contract and proposal tracking with automated follow-up, and team collaboration features for Ottawa\'s commonly remote or hybrid consulting teams.'},
      {q:'Can you serve Ottawa businesses entirely remotely?',a:'Yes. All GoHighLevel implementation and management work is delivered remotely — discovery calls, build reviews, training sessions, and ongoing support via video call in Eastern Time. We have clients across Ontario served entirely online.'},
      {q:'How long does GoHighLevel implementation take for Ottawa businesses?',a:'Standard GHL implementation takes 2–4 weeks. Complex builds — multi-stakeholder CRM, white-label SaaS, or large CRM migrations — typically take 4–8 weeks.'},
      {q:'Do you build GoHighLevel for Ottawa tech companies in Kanata North?',a:'Yes. Ottawa\'s Kanata North tech park is home to 500+ tech companies with B2B sales motions that benefit significantly from GoHighLevel\'s pipeline automation and AI-powered follow-up capabilities. We build GHL systems specifically for SaaS and enterprise tech sales cycles.'},
      {q:'Can you migrate our Ottawa business\'s CRM to GoHighLevel?',a:'Yes. We migrate from HubSpot, Salesforce, ActiveCampaign, Zoho, and most other CRMs — including contacts, pipelines, tags, custom fields, and historical activity — then rebuild automation workflows natively in GHL.'},
      {q:'Is there a minimum contract for GoHighLevel management in Ottawa?',a:'No long-term contracts. All management retainers are month-to-month with 30 days\' notice to cancel.'}
    ]
  },

  // EDMONTON
  {
    outPath: 'ca/edmonton/gohighlevel-agency/index.html',
    city: 'Edmonton', province: 'Alberta', provinceShort: 'AB',
    taxLabel: 'GST',
    canonical: 'https://bambinoagency.com/ca/edmonton/gohighlevel-agency',
    title: 'GoHighLevel Agency Edmonton, AB | Certified GHL Setup & Automation | Bambino',
    metaDesc: 'Certified GoHighLevel agency in Edmonton. CRM setup, funnel builds, automation workflows, and white-label SaaS for Alberta businesses. Free discovery call.',
    ogTitle: 'GoHighLevel Agency Edmonton | Certified GHL Setup & CRM Automation | Bambino',
    schemaDesc: 'Certified GoHighLevel agency serving Edmonton, AB. Full GHL CRM setup, funnel builds, automation workflows, and white-label SaaS for Alberta businesses.',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'GoHighLevel Agency Edmonton',url:'https://bambinoagency.com/ca/edmonton/gohighlevel-agency'}
    ],
    heroTitle: 'GoHighLevel Agency in Edmonton, AB — Certified GHL Setup, CRM & Automation',
    heroSub: 'Edmonton is Alberta\'s provincial capital and a fast-growing hub for professional services, construction, healthcare, and retail. GoHighLevel is the platform Edmonton businesses choose to consolidate their CRM, automate lead follow-up, and manage client communication without a complex tech stack. Bambino is a certified GoHighLevel agency serving Edmonton and Northern Alberta — building GHL systems that actually work in production.',
    visualStats: [
      {label:'Avg. time saved per week',value:'14 hrs',sub:'After full GHL automation setup'},
      {label:'Lead response time reduction',value:'92%',sub:'Automated vs. manual follow-up'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketTitle: 'GoHighLevel in Edmonton: Alberta\'s Capital, Open Market',
    marketBody: 'Edmonton\'s business landscape — government, healthcare, construction, and a growing tech sector around the University of Alberta — is adopting marketing automation and CRM platforms at an accelerating pace. EDGE Marketing (Red Deer/Alberta) is the primary GHL agency serving the Alberta market, but Edmonton-specific GoHighLevel agency pages are essentially non-existent. This creates a straightforward ranking opportunity for a well-built GHL agency page targeting Edmonton.',
    marketEeat: 'Bambino GHL data: average 14 hours/week saved across GHL implementations in Canada. Edmonton builds tailored to Alberta\'s B2B and service sector — not consumer-focused templates.',
    marketNote: 'Key Edmonton verticals served: government-adjacent services, healthcare, construction, professional services, retail, real estate, and University of Alberta ecosystem businesses.',
    marketStats: [
      {num:'1.1M',lbl:'City population'},
      {num:'AB',lbl:'Province of Alberta'},
      {num:'No PST',lbl:'Alberta tax advantage'},
      {num:'Capital',lbl:'Alberta provincial capital'}
    ],
    landscapeTitle: 'GoHighLevel Agency Competition in Edmonton: Near Zero',
    landscapeBody: 'A search for "gohighlevel agency edmonton" returns the GHL official directory, generic Canadian round-up articles, and a few individual certified admins — but no dedicated agency pages optimised for this term. EDGE Marketing (Alberta) has national Alberta presence but no Edmonton-specific landing page. This is one of the clearest city-level SEO gaps in Canada\'s GoHighLevel market.',
    landscapeCompetition: 'Very Low — effectively zero dedicated GoHighLevel agency pages for Edmonton',
    landscapeLocalTitle: 'GoHighLevel for Edmonton\'s Construction, Healthcare & Government Markets',
    landscapeLocalBody: 'Edmonton\'s key industries have specific CRM workflow requirements. Construction companies need GHL pipeline stages for tendering, project kickoff, and handoff — not standard lead nurture. Healthcare practices need appointment booking automation with recall sequences. Government-adjacent services need formal proposal tracking and long-cycle relationship management. We build GHL systems mapped to these Edmonton-specific business models.',
    otherServiceCards: [
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full marketing automation across HubSpot, Make.com, n8n, and AI-powered custom builds.'},
      {href:'/ca/calgary/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Calgary',desc:'Our Calgary GHL team — same certified methodology for Alberta\'s largest city.'},
      {href:'/ca/edmonton/seo-agency',label:'Also Available',title:'SEO Agency Edmonton',desc:'Organic search for Edmonton businesses — rankings that compound over time alongside your GHL automation.'},
      {href:'/ca/edmonton/digital-marketing-agency',label:'Also Available',title:'Digital Marketing Edmonton',desc:'Full-service digital marketing — SEO, paid ads, content, and email — unified in a single Edmonton strategy.'}
    ],
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/ottawa/gohighlevel-agency',text:'Ottawa GoHighLevel Agency →'}
    ],
    footerCityLinks: [
      {href:'/ca/edmonton/gohighlevel-agency',text:'Edmonton GoHighLevel'},
      {href:'/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel'},
      {href:'/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel'},
      {href:'/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLinks: [
      {href:'/ca/edmonton/seo-agency',text:'SEO Agency'},
      {href:'/ca/edmonton/google-ads-agency',text:'Google Ads'},
      {href:'/ca/edmonton/digital-marketing-agency',text:'Digital Marketing'}
    ],
    faqItems: [
      {q:'How much does GoHighLevel setup cost in Edmonton?',a:'Bambino charges CA$1,500–CA$9,500 for GoHighLevel implementation in Edmonton, depending on complexity. Ongoing GHL management retainers start at CA$900/month. Alberta has no provincial sales tax — prices exclude federal GST only.'},
      {q:'Is GoHighLevel a good fit for Edmonton construction companies?',a:'Yes. Edmonton\'s large construction sector benefits from GoHighLevel\'s pipeline management for tendering and project workflows — automated follow-up on submitted tenders, project kickoff communication sequences, subcontractor coordination workflows, and post-project review requests. We build GHL systems mapped to construction industry sales cycles rather than the generic SMB funnels most GHL templates are built for.'},
      {q:'Do you serve Edmonton healthcare practices?',a:'Yes. Edmonton healthcare practices — dental, physiotherapy, chiropractic, and specialist clinics — use GoHighLevel for appointment booking automation, recall sequences, review generation, and patient communication management. We configure GHL\'s calendar and automation features specifically for healthcare appointment workflows.'},
      {q:'How does GoHighLevel compare to HubSpot for Edmonton businesses?',a:'For most Edmonton SMBs and mid-market businesses, GoHighLevel is more cost-effective than HubSpot and includes phone/SMS, booking, reputation management, and website builder natively. HubSpot has more depth for complex enterprise marketing automation. We assess which platform fits your specific Edmonton business requirements — we\'re certified in both and recommend the right tool, not the one with better margins for us.'},
      {q:'Can you serve all of Northern Alberta from Edmonton?',a:'Yes. We serve Edmonton, Fort McMurray, Grande Prairie, Lloydminster, and across Northern Alberta entirely remotely. All GHL implementation and management is delivered online in Mountain Time.'},
      {q:'How long does GoHighLevel implementation take for Edmonton businesses?',a:'Standard GHL implementation takes 2–4 weeks. Complex builds typically take 4–8 weeks.'},
      {q:'Do you offer GoHighLevel training for Edmonton teams?',a:'Yes. Every implementation includes structured team training sessions covering pipeline management, conversation inbox, workflow edits, and reporting — plus recorded Loom walkthroughs for reference.'},
      {q:'Is there a minimum contract for GoHighLevel management in Edmonton?',a:'No long-term contracts. All management retainers are month-to-month with 30 days\' notice to cancel.'}
    ]
  }
];

// Generate all pages
CITIES.forEach(city => {
  const p = {
    ...city,
    serviceCards: GHL_SERVICE_CARDS,
    whyCards: GHL_WHY_CARDS,
    processSteps: GHL_PROCESS_STEPS,
    resultsStats: GHL_RESULTS,
    industryPills: GHL_INDUSTRY_PILLS,
    pricingPlans: GHL_PRICING
  };
  const outFile = path.join(__dirname, p.outPath);
  const dir = path.dirname(outFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(outFile, buildPage(p), 'utf8');
  console.log('✓ Generated:', p.outPath);
});
console.log('Done —', CITIES.length, 'pages generated.');
