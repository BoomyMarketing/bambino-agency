#!/usr/bin/env python3
"""Add Related Services section to all service pages before the CTA section."""

import os

BASE = "C:/Users/Zver/projects/bambino-agency/services"

RELATED = {
    "seo.html": [
        ("GEO Optimisation", "Get cited by ChatGPT, Perplexity and Google AI Overviews.", "/services/geo"),
        ("Google Ads", "Drive immediate qualified leads alongside your long-term SEO.", "/services/google-ads"),
        ("Content Marketing", "The fuel that powers your SEO strategy — expert UK content.", "/services/content-marketing"),
        ("Web Design", "Fast, conversion-ready websites that maximise your SEO investment.", "/services/web-design"),
    ],
    "geo.html": [
        ("SEO", "The foundation that makes GEO work — technical and on-page excellence.", "/services/seo"),
        ("Content Marketing", "Original, citable content that AI tools want to reference.", "/services/content-marketing"),
        ("AI Automations", "Automate your GEO reporting and monitoring at scale.", "/services/ai-automations"),
    ],
    "google-ads.html": [
        ("SEO", "Build organic visibility that keeps working when the ad budget stops.", "/services/seo"),
        ("Meta Ads", "Reach your audience across Facebook and Instagram too.", "/services/meta-ads"),
        ("PPC Management", "Broader paid search including Bing and Display campaigns.", "/services/ppc"),
        ("Content Marketing", "Landing pages and content that convert your paid traffic.", "/services/content-marketing"),
    ],
    "ppc.html": [
        ("Google Ads", "Full Google Ads management — Search, Shopping and Performance Max.", "/services/google-ads"),
        ("SEO", "Combine paid and organic for maximum search market coverage.", "/services/seo"),
        ("Meta Ads", "Extend your paid reach to Facebook and Instagram audiences.", "/services/meta-ads"),
    ],
    "meta-ads.html": [
        ("Google Ads", "Capture high-intent buyers at the moment they search.", "/services/google-ads"),
        ("Social Media", "Organic social strategy to amplify your paid campaigns.", "/services/social-media"),
        ("Content Marketing", "Creative assets and copy that make your ads perform.", "/services/content-marketing"),
    ],
    "ai-automations.html": [
        ("Voice AI", "AI phone agents that handle inbound calls 24/7.", "/services/voice-ai"),
        ("AI Outbound", "Automated outbound prospecting at scale.", "/services/ai-outbound"),
        ("AI Development", "Custom AI tools built around your specific business logic.", "/services/ai-development"),
    ],
    "ai-outbound.html": [
        ("AI Automations", "Automate the full sales and follow-up workflow end to end.", "/services/ai-automations"),
        ("Voice AI", "Add AI phone follow-up to your outbound sequences.", "/services/voice-ai"),
        ("Google Ads", "Combine outbound with inbound paid search for full coverage.", "/services/google-ads"),
    ],
    "voice-ai.html": [
        ("AI Automations", "Automate the workflows your Voice AI hands off to.", "/services/ai-automations"),
        ("AI Outbound", "Add AI-driven outbound calls to your lead generation mix.", "/services/ai-outbound"),
        ("AI Development", "Custom voice AI built for your specific use case.", "/services/ai-development"),
    ],
    "content-marketing.html": [
        ("SEO", "Content and SEO work together — we do both under one roof.", "/services/seo"),
        ("GEO Optimisation", "Content optimised to be cited by AI search tools.", "/services/geo"),
        ("Social Media", "Distribute your content to the right audiences.", "/services/social-media"),
        ("Email Marketing", "Repurpose your content into high-converting email campaigns.", "/services/email-marketing"),
    ],
    "social-media.html": [
        ("Meta Ads", "Supercharge organic social with targeted paid campaigns.", "/services/meta-ads"),
        ("Content Marketing", "Professional content creation for every platform.", "/services/content-marketing"),
        ("Email Marketing", "Convert your social followers into email subscribers.", "/services/email-marketing"),
    ],
    "email-marketing.html": [
        ("Content Marketing", "Expert content to fuel your email campaigns.", "/services/content-marketing"),
        ("SEO", "Drive email sign-ups through organic search traffic.", "/services/seo"),
        ("Social Media", "Grow your email list through social media channels.", "/services/social-media"),
    ],
    "web-design.html": [
        ("SEO", "Every site we build is SEO-ready from day one.", "/services/seo"),
        ("Google Ads", "Conversion-optimised landing pages for your paid campaigns.", "/services/google-ads"),
        ("Content Marketing", "Compelling copy and content for every page.", "/services/content-marketing"),
    ],
    "ai-development.html": [
        ("AI Automations", "Deploy your custom AI into automated business workflows.", "/services/ai-automations"),
        ("Voice AI", "Add custom voice interfaces to your AI solution.", "/services/voice-ai"),
        ("AI Outbound", "Integrate AI development into your outbound sales stack.", "/services/ai-outbound"),
    ],
    "saas-products.html": [
        ("AI Development", "Custom AI features built into your SaaS product.", "/services/ai-development"),
        ("AI Automations", "Automate operations around your SaaS platform.", "/services/ai-automations"),
        ("SEO", "Drive organic user acquisition for your SaaS product.", "/services/seo"),
    ],
}

def make_card(title, desc, url):
    return f"""            <a href="https://bambinoagency.com{url}" style="display:block; background:#fff; border-radius:16px; padding:1.75rem; box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:0.25s cubic-bezier(0.4,0,0.2,1); text-decoration:none; color:inherit; border:1.5px solid #E8E8E0;">
              <h3 style="font-family:var(--font-heading,'Berkshire Swash',serif); font-size:1.15rem; color:#1A1A1A; margin-bottom:0.5rem;">{title}</h3>
              <p style="font-size:0.9rem; color:#666660; line-height:1.6; margin-bottom:0.75rem;">{desc}</p>
              <span style="font-size:0.85rem; font-weight:700; color:#FF4D00;">Learn more →</span>
            </a>"""

def make_section(cards_html):
    cols = len(cards_html)
    grid_cols = f"repeat({min(cols, 4)}, 1fr)"
    return f"""
  <!-- ── RELATED SERVICES ──────────────────────────────────── -->
  <section aria-labelledby="related-heading" style="padding:5rem 0; background:#F2F2EC;">
    <div class="container" style="width:min(1200px,100% - 3rem);margin-inline:auto;">
      <div style="text-align:center; margin-bottom:2.5rem;">
        <span style="display:inline-block;font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#FF4D00;background:rgba(255,77,0,0.08);padding:0.35rem 0.9rem;border-radius:100px;margin-bottom:1rem;">Related Services</span>
        <h2 id="related-heading" style="font-family:'Berkshire Swash',serif;font-size:clamp(1.8rem,3vw,2.4rem);color:#1A1A1A;margin-bottom:0.75rem;">You Might Also Need</h2>
        <p style="color:#666660;max-width:50ch;margin-inline:auto;font-size:1rem;">Our services work best together. Here are the most common combinations our UK clients use.</p>
      </div>
      <div style="display:grid;grid-template-columns:{grid_cols};gap:1.25rem;">
{chr(10).join(cards_html)}
      </div>
    </div>
  </section>

"""

INSERT_BEFORE = '  <section id="cta-section"'

processed = 0
for filename, services in RELATED.items():
    path = os.path.join(BASE, filename)
    if not os.path.exists(path):
        print(f"SKIP (not found): {filename}")
        continue

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if 'id="related-heading"' in content:
        print(f"SKIP (already has related): {filename}")
        continue

    cards = [make_card(t, d, u) for t, d, u in services]
    section = make_section(cards)

    if INSERT_BEFORE not in content:
        print(f"SKIP (no cta-section found): {filename}")
        continue

    content = content.replace(INSERT_BEFORE, section + INSERT_BEFORE, 1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"OK: {filename} ({len(services)} related services)")
    processed += 1

print(f"\nDone: {processed} files updated.")
