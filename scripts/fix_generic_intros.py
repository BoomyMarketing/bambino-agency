#!/usr/bin/env python3
"""Replace generic placeholder intros with city+service-specific text on 39 local pages."""

import os, re, glob

BASE = "C:/Users/Zver/projects/bambino-agency/local"
MARKER = "face unique challenges in today's competitive digital landscape. That's why Bambino's"

# City-specific context snippets
CITY_CONTEXT = {
    "brighton": "home to the UK's densest concentration of digital businesses per capita outside London ('Silicon Beach')",
    "edinburgh": "Scotland's capital and one of the UK's most prestigious business addresses, with major financial and professional services clusters",
    "glasgow": "Scotland's largest commercial city and one of the UK's top-5 most competitive local search markets",
    "london": "the world's most competitive local business environment, where first-page Google rankings translate directly into premium client acquisition",
}

# Service-specific value proposition
SERVICE_CONTEXT = {
    "ai-automation-agency": "AI automation and process efficiency — helping local businesses reduce operational costs and scale without proportionally increasing headcount",
    "content-marketing-agency": "content marketing — building topical authority, organic reach, and audience trust for businesses that compete on expertise",
    "digital-marketing-agency": "digital marketing — combining SEO, paid media, content, and social into integrated campaigns that drive compounding growth",
    "email-marketing-agency": "email marketing — nurturing leads, retaining customers, and generating repeat revenue for businesses with established audiences",
    "google-ads-agency": "Google Ads — capturing high-intent search demand with precision targeting, rigorous bid management, and continuous CRO",
    "paid-search-agency": "paid search — capturing high-intent buyer demand through precisely targeted campaigns on Google, Bing, and beyond",
    "ppc-agency": "PPC advertising — maximising return on ad spend through data-driven targeting, creative testing, and conversion optimisation",
    "seo-agency": "SEO — building sustainable organic visibility that generates leads and revenue without the ongoing cost of paid media",
    "seo-company": "search engine optimisation — building lasting organic authority that generates consistent inbound leads and revenue",
    "social-media-agency": "social media marketing — building brand awareness, community engagement, and inbound pipeline through organic and paid social",
    "web-design-company": "web design — creating high-converting websites that rank, load fast, and turn visitors into customers",
    "web-development-company": "web development — building performant, scalable, and SEO-ready digital products that support long-term business growth",
}

files = glob.glob(os.path.join(BASE, "**", "**", "index.html"))
updated = 0

for fpath in files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    if MARKER not in content:
        continue

    # Extract city and service from path
    parts = fpath.replace("\\", "/").split("/")
    # path: .../local/city/service/index.html
    try:
        local_idx = parts.index("local")
        city = parts[local_idx + 1]
        service = parts[local_idx + 2]
    except (ValueError, IndexError):
        print(f"SKIP (can't parse path): {fpath}")
        continue

    city_ctx = CITY_CONTEXT.get(city, f"one of the UK's key regional markets")
    svc_ctx = SERVICE_CONTEXT.get(service, service.replace("-", " "))
    city_name = city.replace("-", " ").title()

    new_para = (
        f"<p>{city_name} is {city_ctx}. "
        f"Bambino specialises in {svc_ctx} — "
        f"and our approach is built specifically for the competitive dynamics of the {city_name} market.</p>"
    )

    # Replace the full generic paragraph
    old_pattern = (
        r'<p>Businesses in [^<]+ face unique challenges in today\'s competitive digital landscape\. '
        r"That\'s why Bambino\'s [^<]+ solutions are specifically tailored to the local market dynamics\.</p>"
    )
    new_content = re.sub(old_pattern, new_para, content, count=1)

    if new_content == content:
        print(f"WARN (no match): {fpath}")
        continue

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"OK: {city}/{service}")
    updated += 1

print(f"\nDone: {updated} pages updated.")
