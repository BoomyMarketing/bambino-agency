#!/usr/bin/env node
/**
 * Update mega-menu grid content in ALL HTML files that already have mega-menu.
 * Replaces the inner <div class="mega-grid">...</div> and footer link count.
 * Handles both nav formats (with/without id="nav-links").
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const NEW_MEGA_GRID = `<div class="mega-grid">
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
                    <a href="https://bambinoagency.com/services/podcast-advertising">Podcast Advertising</a>
                  </div>
                  <div class="mega-col">
                    <p class="mega-cat">Social &amp; Creator</p>
                    <a href="https://bambinoagency.com/services/social-media">Social Media</a>
                    <a href="https://bambinoagency.com/services/influencer-marketing">Influencer Marketing</a>
                    <a href="https://bambinoagency.com/services/ugc-content">UGC Content</a>
                    <a href="https://bambinoagency.com/services/community-building">Community Building</a>
                    <a href="https://bambinoagency.com/services/experiential-marketing">Experiential Marketing</a>
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
                    <a href="https://bambinoagency.com/services/framer">Framer Development</a>
                    <a href="https://bambinoagency.com/services/branding">Branding</a>
                    <a href="https://bambinoagency.com/services/cro">CRO</a>
                    <a href="https://bambinoagency.com/services/aso">App Store Optimisation</a>
                    <a href="https://bambinoagency.com/services/analytics-ga4">Analytics &amp; GA4</a>
                    <a href="https://bambinoagency.com/services/attribution-mmm">Attribution &amp; MMM</a>
                    <a href="https://bambinoagency.com/services/cdp">CDP Implementation</a>
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
                    <a href="https://bambinoagency.com/services/plg">Product-Led Growth</a>
                    <p class="mega-cat" style="margin-top:1.2rem">B2B &amp; Enterprise</p>
                    <a href="https://bambinoagency.com/services/lead-generation">Lead Generation</a>
                    <a href="https://bambinoagency.com/services/abm">Account-Based Marketing</a>
                    <a href="https://bambinoagency.com/services/amazon-marketing">Amazon Marketing</a>
                    <a href="https://bambinoagency.com/services/demand-generation">Demand Generation</a>
                    <a href="https://bambinoagency.com/services/b2b-saas-growth">B2B SaaS Growth</a>
                    <a href="https://bambinoagency.com/services/sdr-bdr-as-a-service">SDR / BDR as a Service</a>
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
                </div>`;

function walkDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'docs'].includes(entry.name)) {
        walkDir(fullPath, results);
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const RE_MEGA_GRID = /<div class="mega-grid">[\s\S]*?<\/div>\s*<\/div>\s*<div class="mega-footer">/;

let updated = 0, skipped = 0, errors = [];

const files = walkDir(ROOT);

for (const fp of files) {
  let content;
  try { content = fs.readFileSync(fp, 'utf-8'); } catch(e) { errors.push(path.relative(ROOT, fp) + ': read error'); continue; }

  if (!content.includes('mega-grid')) { skipped++; continue; }

  // Already has podcast-advertising link → already up to date
  if (content.includes('podcast-advertising')) { skipped++; continue; }

  const original = content;

  // Replace mega-grid block
  if (RE_MEGA_GRID.test(content)) {
    content = content.replace(RE_MEGA_GRID, NEW_MEGA_GRID + '\n                <div class="mega-footer">');
  } else {
    errors.push(path.relative(ROOT, fp) + ': regex no match');
    continue;
  }

  // Update "View all 60 services" → "View all services"
  content = content.replace(/View all \d+ services/g, 'View all services');

  if (content === original) { skipped++; continue; }

  try { fs.writeFileSync(fp, content, 'utf-8'); } catch(e) { errors.push(path.relative(ROOT, fp) + ': write error'); continue; }

  console.log('  ✓ ' + path.relative(ROOT, fp));
  updated++;
}

console.log(`\n✅ Done. Updated: ${updated}, Skipped: ${skipped}, Problems: ${errors.length}`);
if (errors.length) errors.forEach(e => console.log('  ✗ ' + e));
