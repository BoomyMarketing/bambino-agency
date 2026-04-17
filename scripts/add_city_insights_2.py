#!/usr/bin/env python3
"""Add unique Local Market Insights sections to remaining 6 city seo-agency pages."""

import os

BASE = "C:/Users/Zver/projects/bambino-agency/local"

CITIES = {
    "aberdeen": {
        "name": "Aberdeen",
        "title": "Aberdeen's Digital Marketing Landscape",
        "subtitle": "Key facts about Aberdeen's business environment — and what they mean for your SEO strategy.",
        "stats": [
            ("£14B+", "Aberdeen City Region Economy", "Scotland's third-largest city economy is heavily concentrated in energy, life sciences, and professional services — all sectors where B2B buyers rely heavily on organic search to evaluate and shortlist providers."),
            ("200,000+", "Businesses in North East Scotland", "The North East Scotland business community is close-knit and reputation-driven. Strong organic rankings amplify word-of-mouth and position your brand as the authority in your sector before prospects pick up the phone."),
            ("Oil &amp; Gas Capital", "of the UK", "Aberdeen's energy sector — now transitioning to net zero and renewables — creates specialist B2B search demand that requires deep sector understanding. Generic national agency campaigns consistently underperform here."),
            ("35%", "Growth in Tech Sector Jobs (2020–2025)", "The diversification of Aberdeen's economy beyond oil and gas is driving rapid growth in digital-first sectors. Businesses that establish SEO authority now will capture the next wave of commercial search demand."),
        ],
        "tags": ["Energy &amp; Oil", "Life Sciences", "Professional Services", "Maritime", "Tech &amp; Renewables", "Hospitality"],
    },
    "belfast": {
        "name": "Belfast",
        "title": "Belfast's Digital Marketing Landscape",
        "subtitle": "Key facts about Belfast's business environment — and what they mean for your SEO strategy.",
        "stats": [
            ("£25B+", "Belfast City Region Economy", "Belfast has undergone a remarkable economic transformation over the past two decades and is now one of the UK's fastest-growing city economies — with strong momentum in tech, professional services, and tourism."),
            ("70,000+", "Businesses in Greater Belfast", "A growing and diversifying business base means the competition for first-page rankings is intensifying across almost every sector. Proactive SEO investment is shifting from optional to essential."),
            ("#1", "UK City for Tech Jobs Growth (per capita)", "Belfast's tech sector — anchored by Citi, Concentrix, and a thriving startup ecosystem — has made the city a hotspot for digital talent and innovation. Tech firms here compete globally for search visibility."),
            ("5M+", "Annual Tourist Visits", "Belfast's booming tourism economy — driven by Game of Thrones filming locations, the Titanic Quarter, and the Causeway Coastal Route — creates significant hospitality and experience-based search demand year-round."),
        ],
        "tags": ["Tech &amp; Fintech", "Professional Services", "Tourism &amp; Hospitality", "Legal", "Property &amp; Development", "Creative &amp; Media"],
    },
    "blackpool": {
        "name": "Blackpool",
        "title": "Blackpool's Digital Marketing Landscape",
        "subtitle": "Key facts about Blackpool's business environment — and what they mean for your SEO strategy.",
        "stats": [
            ("£1.8B+", "Blackpool Visitor Economy", "Blackpool's economy is anchored by tourism and hospitality, attracting over 18 million visitors annually. For businesses in these sectors, ranking for seasonal and event-based search terms is critical to capturing peak demand."),
            ("18M+", "Annual Visitors to Blackpool", "More annual visitors than any UK seaside resort. The search intent behind this visitor traffic — accommodation, entertainment, food, attractions — creates high-volume, high-intent keyword opportunities for local businesses."),
            ("3rd", "Most Deprived Large Town in England", "The economic regeneration agenda in Blackpool means local businesses that establish strong digital presence now will benefit disproportionately as public and private investment drives renewed commercial activity over the next decade."),
            ("£300M+", "Blackpool Town Deal Investment", "Government and private investment in Blackpool's regeneration is creating new commercial opportunities across hospitality, retail, and professional services. Organic search is the primary discovery channel for businesses in these emerging spaces."),
        ],
        "tags": ["Tourism &amp; Hospitality", "Leisure &amp; Entertainment", "Retail", "Property", "Health &amp; Wellness", "Events"],
    },
    "bournemouth": {
        "name": "Bournemouth",
        "title": "Bournemouth's Digital Marketing Landscape",
        "subtitle": "Key facts about Bournemouth's business environment — and what they mean for your SEO strategy.",
        "stats": [
            ("£8B+", "BCP Economy (Bournemouth, Christchurch, Poole)", "The combined BCP conurbation is one of the South Coast's largest economies, with particular strength in financial services, digital, and professional services — all sectors where search visibility drives significant B2B and B2C revenue."),
            ("60,000+", "Businesses in BCP Area", "A densely populated business community spanning Bournemouth, Christchurch, and Poole creates intense competition for local search rankings. First-page visibility is a meaningful competitive differentiator here."),
            ("Top-5", "UK Digital Hub Outside London", "Bournemouth is consistently ranked among the UK's top digital hubs outside of London, with a growing cluster of agencies, fintechs, and software businesses that generate significant digital-first search demand."),
            ("8M+", "Annual Coastal Visitors", "The South Coast's most popular beach destination draws enormous seasonal visitor demand. Hospitality, retail, and leisure businesses that rank for coastal visitor searches capture disproportionate revenue during peak seasons."),
        ],
        "tags": ["Financial Services", "Digital &amp; Tech", "Professional Services", "Hospitality &amp; Tourism", "Property", "Retail"],
    },
    "bradford": {
        "name": "Bradford",
        "title": "Bradford's Digital Marketing Landscape",
        "subtitle": "Key facts about Bradford's business environment — and what they mean for your SEO strategy.",
        "stats": [
            ("£10B+", "Bradford District Economy", "Bradford's economy — closely linked to the wider West Yorkshire Combined Authority — encompasses manufacturing, professional services, retail, and a growing creative sector. The 2025 City of Culture status is accelerating commercial investment and search demand."),
            ("60,000+", "Businesses in Bradford District", "Bradford's business community spans a wide range of sectors, from traditional manufacturing and textiles to emerging digital and creative industries. The competition for organic search visibility is increasing across all of them."),
            ("UK City of Culture", "2025", "Bradford's City of Culture designation is bringing unprecedented national and international attention — and search volume — to the city. Businesses that rank well now will capture this incoming audience before competitors establish authority."),
            ("40%", "Under-35 Population Share", "Bradford has one of the youngest populations of any UK city, creating a digital-first consumer base that discovers and evaluates businesses almost exclusively online. SEO is not optional in this demographic context — it's essential."),
        ],
        "tags": ["Manufacturing &amp; Textiles", "Creative &amp; Digital", "Professional Services", "Retail", "Hospitality", "Property &amp; Development"],
    },
    "brighton": {
        "name": "Brighton",
        "title": "Brighton's Digital Marketing Landscape",
        "subtitle": "Key facts about Brighton's business environment — and what they mean for your SEO strategy.",
        "stats": [
            ("£7B+", "Brighton &amp; Hove Economy", "Brighton's economy punches well above its size, driven by a world-class creative and tech sector known as 'Silicon Beach.' The density of digital agencies, software companies, and professional services businesses makes organic search fiercely competitive."),
            ("12,000+", "Digital Economy Businesses", "Brighton has more digital economy businesses per capita than any UK city outside London. This concentration creates intense search competition — and significant revenue for businesses that break through to first page."),
            ("'Silicon Beach'", "UK's #1 Tech Hub Outside London (per capita)", "Brighton's reputation as a hub for digital agencies, SaaS companies, and creative businesses generates large B2B search volume. Decision-makers here are digitally sophisticated and conduct thorough online research before choosing suppliers."),
            ("9M+", "Annual Visitors", "Brighton attracts over 9 million visitors annually, making tourism and hospitality one of the city's defining economic sectors. Seasonal search peaks around Pride, the Brighton Festival, and summer beach traffic create predictable ranking opportunities."),
        ],
        "tags": ["Tech &amp; Digital", "Creative &amp; Media", "Professional Services", "Hospitality &amp; Tourism", "Retail", "Health &amp; Wellness"],
    },
}

INSERT_BEFORE = '    <!-- ── RESULTS STRIP'


def make_section(city_key, data):
    stats_html = ""
    for val, label, desc in data["stats"]:
        stats_html += f"""            <div style="background: #fff; border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
                <div style="font-size: 2rem; font-family: var(--font-heading); color: var(--primary); margin-bottom: 0.5rem;">{val}</div>
                <div style="font-weight: 600; color: var(--text); margin-bottom: 0.5rem;">{label}</div>
                <p style="font-size: 0.9rem; color: var(--text-muted);">{desc}</p>
            </div>
"""
    tags_html = ""
    for tag in data["tags"]:
        tags_html += f'                <span style="display:inline-block;background:var(--primary);color:#fff;border-radius:100px;padding:0.3rem 0.9rem;font-size:0.8rem;font-weight:600;">{tag}</span>\n'

    return f"""

<!-- ── LOCAL MARKET INSIGHTS ─────────────────────────────── -->
<section style="padding: 5rem 0; background: var(--bg-soft, #F2F2EC);">
    <div class="container">
        <div class="section-header reveal" style="text-align:center; margin-bottom: 3rem;">
            <span class="section-label">Local Market Intelligence</span>
            <h2 style="font-family: var(--font-heading); font-size: clamp(1.8rem,3.5vw,2.5rem); margin-bottom: 0.75rem;">{data["title"]}</h2>
            <p style="color: var(--text-muted); max-width: 55ch; margin-inline: auto;">{data["subtitle"]}</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
{stats_html}        </div>
        <div style="text-align:center;">
            <p style="font-weight:600;color:var(--text);margin-bottom:1rem;">Key {data["name"]} sectors we serve:</p>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;">
{tags_html}            </div>
        </div>
    </div>
</section>

"""


processed = 0
for city_key, data in CITIES.items():
    path = os.path.join(BASE, city_key, "seo-agency", "index.html")
    if not os.path.exists(path):
        print(f"SKIP (not found): {city_key}")
        continue

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "LOCAL MARKET INSIGHTS" in content or "Local Market Insights" in content:
        print(f"SKIP (already has insights): {city_key}")
        continue

    if INSERT_BEFORE not in content:
        print(f"SKIP (no results strip marker): {city_key}")
        continue

    section = make_section(city_key, data)
    content = content.replace(INSERT_BEFORE, section + INSERT_BEFORE, 1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"OK: {city_key}")
    processed += 1

print(f"\nDone: {processed} cities updated.")
