#!/usr/bin/env node
/**
 * Inject mega-menu navigation into all HTML files.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// NEW NAV UL
// ---------------------------------------------------------------------------
const NEW_NAV_UL = `<ul class="nav-links" role="list">
          <li class="nav-has-mega">
            <a href="https://bambinoagency.com/services" class="nav-mega-toggle" aria-haspopup="true" aria-expanded="false">Services <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>
            <div class="mega-menu" role="region" aria-label="Services menu">
              <div class="container">
                <div class="mega-grid">
                  <div class="mega-col">
                    <p class="mega-cat">Search &amp; AI Visibility</p>
                    <a href="https://bambinoagency.com/services/seo">SEO</a>
                    <a href="https://bambinoagency.com/services/geo">GEO / AI Search</a>
                    <a href="https://bambinoagency.com/services/technical-seo">Technical SEO</a>
                    <a href="https://bambinoagency.com/services/local-seo">Local SEO</a>
                    <a href="https://bambinoagency.com/services/enterprise-seo">Enterprise SEO</a>
                    <a href="https://bambinoagency.com/services/international-seo">International SEO</a>
                    <a href="https://bambinoagency.com/services/link-building">Link Building</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Paid Media</p>
                    <a href="https://bambinoagency.com/services/google-ads">Google Ads</a>
                    <a href="https://bambinoagency.com/services/ppc">PPC Management</a>
                    <a href="https://bambinoagency.com/services/meta-ads">Meta Ads</a>
                    <a href="https://bambinoagency.com/services/linkedin-ads">LinkedIn Ads</a>
                    <a href="https://bambinoagency.com/services/youtube-ads">YouTube Ads</a>
                    <a href="https://bambinoagency.com/services/tiktok-ads">TikTok Ads</a>
                    <a href="https://bambinoagency.com/services/pinterest-ads">Pinterest Ads</a>
                    <a href="https://bambinoagency.com/services/google-shopping">Google Shopping</a>
                    <a href="https://bambinoagency.com/services/retail-media">Retail Media</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Social &amp; Creator</p>
                    <a href="https://bambinoagency.com/services/social-media">Social Media</a>
                    <a href="https://bambinoagency.com/services/influencer-marketing">Influencer Marketing</a>
                    <a href="https://bambinoagency.com/services/ugc-content">UGC Content</a>
                    <a href="https://bambinoagency.com/services/community-building">Community Building</a>
                    <p class="mega-cat" style="margin-top:1.2rem">Content &amp; Video</p>
                    <a href="https://bambinoagency.com/services/content-marketing">Content Marketing</a>
                    <a href="https://bambinoagency.com/services/video-marketing">Video Marketing</a>
                    <a href="https://bambinoagency.com/services/digital-pr">Digital PR</a>
                    <a href="https://bambinoagency.com/services/performance-creative">Performance Creative</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Web &amp; Brand</p>
                    <a href="https://bambinoagency.com/services/web-design">Web Design</a>
                    <a href="https://bambinoagency.com/services/webflow">Webflow Development</a>
                    <a href="https://bambinoagency.com/services/branding">Branding</a>
                    <a href="https://bambinoagency.com/services/cro">CRO</a>
                    <a href="https://bambinoagency.com/services/aso">App Store Optimisation</a>
                    <a href="https://bambinoagency.com/services/analytics-ga4">Analytics &amp; GA4</a>
                    <p class="mega-cat" style="margin-top:1.2rem">AI &amp; Automation</p>
                    <a href="https://bambinoagency.com/services/ai-automations">AI Automations</a>
                    <a href="https://bambinoagency.com/services/voice-ai">Voice AI</a>
                    <a href="https://bambinoagency.com/services/ai-outbound">AI Outbound Sales</a>
                    <a href="https://bambinoagency.com/services/conversational-marketing">Conversational Marketing</a>
                    <a href="https://bambinoagency.com/services/marketing-automation">Marketing Automation</a>
                    <a href="https://bambinoagency.com/services/sms-marketing">SMS Marketing</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Operations &amp; Growth</p>
                    <a href="https://bambinoagency.com/services/revops">RevOps</a>
                    <a href="https://bambinoagency.com/services/hubspot">HubSpot</a>
                    <a href="https://bambinoagency.com/services/klaviyo">Klaviyo</a>
                    <a href="https://bambinoagency.com/services/salesforce-marketing-cloud">Salesforce Marketing Cloud</a>
                    <a href="https://bambinoagency.com/services/fractional-cmo">Fractional CMO</a>
                    <a href="https://bambinoagency.com/services/growth-marketing">Growth Marketing</a>
                    <p class="mega-cat" style="margin-top:1.2rem">B2B &amp; Enterprise</p>
                    <a href="https://bambinoagency.com/services/lead-generation">Lead Generation</a>
                    <a href="https://bambinoagency.com/services/abm">Account-Based Marketing</a>
                    <a href="https://bambinoagency.com/services/amazon-marketing">Amazon Marketing</a>
                    <a href="https://bambinoagency.com/services/ctv-advertising">CTV Advertising</a>
                    <a href="https://bambinoagency.com/services/dooh">DOOH Advertising</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">eCommerce &amp; Retention</p>
                    <a href="https://bambinoagency.com/services/shopify-marketing">Shopify Marketing</a>
                    <a href="https://bambinoagency.com/services/amazon-dsp">Amazon DSP</a>
                    <a href="https://bambinoagency.com/services/lifecycle-marketing">Lifecycle Marketing</a>
                    <a href="https://bambinoagency.com/services/subscription-commerce">Subscription Commerce</a>
                    <a href="https://bambinoagency.com/services/email-marketing">Email Marketing</a>
                    <a href="https://bambinoagency.com/services/reputation-management">Reputation Management</a>
                  </div>
                </div>
                <div class="mega-footer">
                  <a href="https://bambinoagency.com/services" class="mega-all">View all 60 services &rarr;</a>
                  <a href="https://bambinoagency.com/contact" class="mega-cta">Get a Free Audit &rarr;</a>
                </div>
              </div>
            </div>
          </li>
          <li><a href="https://bambinoagency.com/industries">Industries</a></li>
          <li><a href="https://bambinoagency.com/about">About</a></li>
          <li><a href="https://bambinoagency.com/blog">Blog</a></li>
          <li><a href="https://bambinoagency.com/pricing">Pricing</a></li>
          <li><a href="https://bambinoagency.com/contact" class="nav-cta">Get a Free Audit &rarr;</a></li>
        </ul>`;

// ---------------------------------------------------------------------------
// NEW MOBILE MENU
// ---------------------------------------------------------------------------
const NEW_MOBILE_MENU = `<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile navigation">
    <button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>
    <a href="https://bambinoagency.com/services" onclick="closeMobileMenu()">Services</a>
    <a href="https://bambinoagency.com/industries" onclick="closeMobileMenu()">Industries</a>
    <a href="https://bambinoagency.com/about" onclick="closeMobileMenu()">About</a>
    <a href="https://bambinoagency.com/blog" onclick="closeMobileMenu()">Blog</a>
    <a href="https://bambinoagency.com/pricing" onclick="closeMobileMenu()">Pricing</a>
    <a href="https://bambinoagency.com/contact" onclick="closeMobileMenu()" style="color: var(--orange);">Get a Free Audit &rarr;</a>
  </div>`;

// ---------------------------------------------------------------------------
// MEGA CSS
// ---------------------------------------------------------------------------
const MEGA_CSS = `
    /* MEGA MENU */
    .nav-has-mega { position: relative; }
    .nav-mega-toggle { display: flex !important; align-items: center; gap: 0.4rem; cursor: pointer; }
    .nav-mega-toggle svg { transition: transform 0.2s ease; flex-shrink: 0; }
    .nav-has-mega.active .nav-mega-toggle svg { transform: rotate(180deg); }
    .mega-menu {
      display: none;
      position: fixed;
      top: 62px;
      left: 0; right: 0;
      background: var(--bg, #F9F9F5);
      border-top: 2px solid var(--orange, #FF4D00);
      box-shadow: 0 8px 40px rgba(0,0,0,0.13);
      z-index: 998;
      padding: 2rem 0 1.5rem;
    }
    .nav-has-mega.active .mega-menu { display: block; animation: megaFadeIn 0.16s ease; }
    @keyframes megaFadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
    .mega-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.5rem 1.2rem; }
    .mega-col { }
    .mega-cat { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--orange, #FF4D00); margin-bottom: 0.45rem; margin-top: 0; line-height: 1.4; }
    .mega-col a { display: block; font-size: 0.81rem; color: var(--text, #1a1a1a); padding: 0.16rem 0; transition: color 0.15s; font-weight: 400; line-height: 1.5; }
    .mega-col a:hover { color: var(--orange, #FF4D00); }
    .mega-col a::after { display: none !important; }
    .mega-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1.2rem; padding-top: 0.9rem; border-top: 1px solid var(--border, #e5e5e0); }
    .mega-all { font-size: 0.84rem; font-weight: 600; color: var(--green, #034C3C); }
    .mega-all:hover { color: var(--orange, #FF4D00); }
    .mega-all::after { display: none !important; }
    .mega-cta { font-size: 0.81rem; font-weight: 700; background: var(--orange, #FF4D00); color: #fff !important; padding: 0.45rem 1.1rem; border-radius: 100px; transition: background 0.15s; }
    .mega-cta:hover { background: #e64500 !important; }
    .mega-cta::after { display: none !important; }
    @media (max-width: 960px) { .mega-menu { display: none !important; } }
`;

// ---------------------------------------------------------------------------
// MEGA JS
// ---------------------------------------------------------------------------
const MEGA_JS = `
    // Mega menu
    (function() {
      var megaParent = document.querySelector('.nav-has-mega');
      var megaTrigger = document.querySelector('.nav-mega-toggle');
      if (!megaParent || !megaTrigger) return;
      megaTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        var open = megaParent.classList.toggle('active');
        megaTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', function(e) {
        if (!megaParent.contains(e.target)) {
          megaParent.classList.remove('active');
          megaTrigger.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          megaParent.classList.remove('active');
          megaTrigger.setAttribute('aria-expanded', 'false');
        }
      });
    })();`;

// ---------------------------------------------------------------------------
// Helpers: glob all HTML files recursively
// ---------------------------------------------------------------------------
function walkDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, .git, docs
      if (!['node_modules', '.git', 'docs'].includes(entry.name)) {
        walkDir(fullPath, results);
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Process one file
// ---------------------------------------------------------------------------
function updateFile(filepath) {
  let content;
  try {
    content = fs.readFileSync(filepath, 'utf-8');
  } catch (e) {
    return { ok: false, reason: `read error: ${e.message}` };
  }

  // Skip already-updated
  if (content.includes('mega-grid')) {
    return { ok: false, reason: 'already updated' };
  }

  // Skip files without our nav
  if (!content.includes('nav-links')) {
    return { ok: false, reason: 'no nav-links' };
  }

  const original = content;

  // 1. Replace <ul class="nav-links" role="list">...</ul>
  const navUlRe = /<ul class="nav-links" role="list">[\s\S]*?<\/ul>/;
  if (navUlRe.test(content)) {
    content = content.replace(navUlRe, NEW_NAV_UL);
  }

  // 2. Replace <div class="mobile-menu" id="mobileMenu"...>...</div>
  const mobileRe = /<div class="mobile-menu" id="mobileMenu"[^>]*>[\s\S]*?<\/div>/;
  if (mobileRe.test(content)) {
    content = content.replace(mobileRe, NEW_MOBILE_MENU);
  }

  // 3. Add mega CSS before first </style>
  if (!content.includes('mega-grid') && content.includes('</style>')) {
    content = content.replace('</style>', MEGA_CSS + '  </style>');
  }

  // 4. Add mega JS after closeMobileMenu function
  if (!content.includes('Mega menu')) {
    const closeFnRe = /function closeMobileMenu\(\)\s*\{[^}]*\}/;
    if (closeFnRe.test(content)) {
      content = content.replace(closeFnRe, (m) => m + MEGA_JS);
    } else if (content.includes('hamburgerBtn')) {
      // fallback: prepend before hamburgerBtn logic
      content = content.replace(
        /(\s*)(const hamburgerBtn|var hamburgerBtn)/,
        (m, ws, decl) => MEGA_JS + '\n' + ws + decl
      );
    }
  }

  if (content === original) {
    return { ok: false, reason: 'no change made' };
  }

  try {
    fs.writeFileSync(filepath, content, 'utf-8');
  } catch (e) {
    return { ok: false, reason: `write error: ${e.message}` };
  }

  return { ok: true };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const htmlFiles = walkDir(ROOT);

let updated = 0, already = 0, skipped = 0;
const errors = [];

for (const fp of htmlFiles) {
  const result = updateFile(fp);
  if (result.ok) {
    updated++;
  } else if (result.reason === 'already updated') {
    already++;
  } else if (result.reason === 'no nav-links') {
    skipped++;
  } else {
    errors.push(`${path.relative(ROOT, fp)}: ${result.reason}`);
  }
}

console.log(`\n✅ Done.`);
console.log(`  Updated : ${updated}`);
console.log(`  Already : ${already}`);
console.log(`  Skipped : ${skipped}`);
console.log(`  Errors  : ${errors.length}`);
if (errors.length) {
  console.log('\nProblems:');
  errors.forEach(e => console.log(`  ${e}`));
}
