#!/usr/bin/env node
/**
 * Update local page nav to include mega-menu dropdown.
 * Local pages use <ul class="nav-links" id="nav-links" role="list"> pattern.
 */

const fs = require('fs');
const path = require('path');

const LOCAL_ROOT = path.resolve(__dirname, '..', 'local');

const NEW_NAV_UL = `<ul class="nav-links" id="nav-links" role="list">
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

// Match the local page nav ul (has id="nav-links")
const RE_NAV_UL = /<ul class="nav-links" id="nav-links" role="list">[\s\S]*?<\/ul>/;

function walkDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function updateFile(filepath) {
  let content;
  try {
    content = fs.readFileSync(filepath, 'utf-8');
  } catch (e) {
    return { ok: false, reason: `read error` };
  }

  // Skip if already has mega-menu in nav HTML (check for the li element, not just CSS)
  if (content.includes('<li class="nav-has-mega">')) {
    return { ok: false, reason: 'already has mega-menu HTML' };
  }

  if (!RE_NAV_UL.test(content)) {
    return { ok: false, reason: 'no matching nav ul' };
  }

  const original = content;
  content = content.replace(RE_NAV_UL, NEW_NAV_UL);

  if (content === original) {
    return { ok: false, reason: 'no change' };
  }

  try {
    fs.writeFileSync(filepath, content, 'utf-8');
  } catch (e) {
    return { ok: false, reason: `write error` };
  }

  return { ok: true };
}

const files = walkDir(LOCAL_ROOT);
let updated = 0, skipped = 0, errors = [];

for (const fp of files) {
  const result = updateFile(fp);
  if (result.ok) {
    updated++;
  } else if (result.reason === 'already has mega-menu HTML') {
    skipped++;
  } else {
    errors.push(`${path.relative(LOCAL_ROOT, fp)}: ${result.reason}`);
  }
}

console.log(`\n✅ Local pages done.`);
console.log(`  Updated : ${updated}`);
console.log(`  Skipped : ${skipped}`);
console.log(`  Problems: ${errors.length}`);
if (errors.length && errors.length <= 20) {
  errors.forEach(e => console.log(`  ${e}`));
}
