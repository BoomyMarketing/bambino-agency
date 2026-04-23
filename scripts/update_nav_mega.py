#!/usr/bin/env python3
"""Inject mega-menu navigation into all HTML files."""

import os
import re
import glob

ROOT = r'C:\Users\Инна\Desktop\projects\bambino-agency'

# ---------------------------------------------------------------------------
# NEW NAV UL (replaces the <ul class="nav-links"...>...</ul> block)
# ---------------------------------------------------------------------------
NEW_NAV_UL = '''<ul class="nav-links" role="list">
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
        </ul>'''

# ---------------------------------------------------------------------------
# NEW MOBILE MENU
# ---------------------------------------------------------------------------
NEW_MOBILE_MENU = '''<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile navigation">
    <button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>
    <a href="https://bambinoagency.com/services" onclick="closeMobileMenu()">Services</a>
    <a href="https://bambinoagency.com/industries" onclick="closeMobileMenu()">Industries</a>
    <a href="https://bambinoagency.com/about" onclick="closeMobileMenu()">About</a>
    <a href="https://bambinoagency.com/blog" onclick="closeMobileMenu()">Blog</a>
    <a href="https://bambinoagency.com/pricing" onclick="closeMobileMenu()">Pricing</a>
    <a href="https://bambinoagency.com/contact" onclick="closeMobileMenu()" style="color: var(--orange);">Get a Free Audit &rarr;</a>
  </div>'''

# ---------------------------------------------------------------------------
# MEGA MENU CSS (injected before first </style>)
# ---------------------------------------------------------------------------
MEGA_CSS = '''
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
'''

# ---------------------------------------------------------------------------
# MEGA MENU JS (injected right after closeMobileMenu function)
# ---------------------------------------------------------------------------
MEGA_JS = '''
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
    })();'''


# ---------------------------------------------------------------------------
# REGEXES
# ---------------------------------------------------------------------------
RE_NAV_UL = re.compile(
    r'<ul class="nav-links" role="list">.*?</ul>',
    re.DOTALL
)
RE_MOBILE_MENU = re.compile(
    r'<div class="mobile-menu" id="mobileMenu"[^>]*>.*?</div>',
    re.DOTALL
)
RE_CLOSE_MOBILE_FN = re.compile(
    r'(function closeMobileMenu\(\)\s*\{[^}]*\})',
    re.DOTALL
)


def update_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            with open(filepath, 'r', encoding='latin-1') as f:
                content = f.read()
        except Exception as e:
            return False, f'read error: {e}'

    # Skip already-updated files
    if 'mega-grid' in content:
        return False, 'already updated'

    # Skip files without the nav
    if 'nav-links' not in content:
        return False, 'no nav-links'

    original = content

    # 1. Replace nav ul
    if RE_NAV_UL.search(content):
        content = RE_NAV_UL.sub(NEW_NAV_UL, content, count=1)

    # 2. Replace mobile menu
    if RE_MOBILE_MENU.search(content):
        content = RE_MOBILE_MENU.sub(NEW_MOBILE_MENU, content, count=1)

    # 3. Add mega CSS before first </style>
    if 'mega-grid' not in content and '</style>' in content:
        content = content.replace('</style>', MEGA_CSS + '  </style>', 1)

    # 4. Add mega JS after closeMobileMenu function
    if 'Mega menu' not in content:
        m = RE_CLOSE_MOBILE_FN.search(content)
        if m:
            content = content[:m.end()] + MEGA_JS + content[m.end():]
        elif 'hamburgerBtn' in content:
            # fallback: inject before hamburgerBtn
            content = content.replace(
                'const hamburgerBtn',
                MEGA_JS.strip() + '\n    const hamburgerBtn',
                1
            )

    if content == original:
        return False, 'no change'

    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        return False, f'write error: {e}'

    return True, 'updated'


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------
html_files = glob.glob(os.path.join(ROOT, '**/*.html'), recursive=True)

updated = 0
already = 0
skipped = 0
errors = []

for filepath in sorted(html_files):
    success, msg = update_file(filepath)
    if success:
        updated += 1
    elif msg == 'already updated':
        already += 1
    elif msg == 'no nav-links':
        skipped += 1
    else:
        errors.append(f'{os.path.relpath(filepath, ROOT)}: {msg}')

print(f'\n✅ Done.')
print(f'  Updated : {updated}')
print(f'  Already : {already}')
print(f'  Skipped : {skipped}')
print(f'  Errors  : {len(errors)}')
if errors:
    print('\nErrors:')
    for e in errors:
        print(f'  {e}')
