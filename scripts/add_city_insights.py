#!/usr/bin/env python3
"""Add unique Local Market Insights sections to top-10 city seo-agency pages."""

import os, re

BASE = "C:/Users/Zver/projects/bambino-agency/local"

CITIES = {
    "glasgow": {
        "name": "Glasgow",
        "intro": [
            "Glasgow is Scotland's largest city and one of the UK's most commercially dynamic markets. With over 50,000 businesses registered in the Glasgow City Region and an economy worth more than £13 billion annually, the competition for top Google rankings is intense — and growing. Bambino's approach to Glasgow SEO is built on direct knowledge of Scotland's distinct search behaviour and buyer psychology.",
            "The city's commercial heartbeat spans the financial services corridor along St Vincent Street, the creative and professional cluster of the Merchant City, the tech and innovation ecosystem growing around Glasgow Science Centre, and a hospitality and retail scene that anchors the city centre. Each district has its own competitive dynamics and search intent patterns that a generic national agency will never fully understand.",
            "Glasgow's digital market is also shaped by Scotland's bilingual considerations (Scots Gaelic for some sectors), its distinct legal system, and buyer preferences that differ meaningfully from English cities. Bambino structures Glasgow SEO campaigns around these nuances — targeting the right audiences, with the right content signals, for the right local intent.",
        ],
        "stats": [
            ("50,000+", "Businesses in Glasgow City Region", "Making Glasgow one of the UK's top-5 most competitive local search markets — and one of the highest-value for businesses that achieve first-page rankings."),
            ("£13B+", "Glasgow's Annual Economy", "Scotland's largest economy creates fierce competition across professional services, tech, hospitality, and retail — all sectors where organic search drives the majority of new business."),
            ("#1", "Scottish City for Business Formation", "More new businesses launch in Glasgow each year than any other Scottish city. Establishing SEO authority early is critical before the market becomes more crowded."),
            ("8% YoY", "Glasgow Tech Sector Growth", "Glasgow's growing tech ecosystem means increasing competition for digital-first keywords. Businesses that invest in SEO now are building a moat before the next wave of competitors arrives."),
        ],
        "industry_tags": ["Financial Services", "Professional Services", "Tech &amp; Innovation", "Hospitality &amp; Leisure", "Retail", "Healthcare"],
    },
    "edinburgh": {
        "name": "Edinburgh",
        "intro": [
            "Edinburgh is Scotland's capital and one of the UK's most prestigious business addresses. The city is home to major financial institutions — Standard Life Aberdeen, Baillie Gifford, and the Scottish headquarters of RBS, Lloyds, and Barclays — alongside a thriving legal services sector, world-class universities, and a tourism economy that attracts 4.5 million visitors annually. Competition for top Google rankings is fierce, particularly in high-value professional services sectors.",
            "The Edinburgh business landscape divides into several distinct commercial zones: the financial services cluster along George Street and Charlotte Square, the Old Town's hospitality and tourism economy, the Quartermile innovation district where fintech startups are clustering, and the Leith waterfront redevelopment bringing new retail and hospitality businesses. Each zone requires a different SEO strategy to capture the right local intent.",
            "Edinburgh's YMYL (financial services, legal, healthcare) concentration means Google applies heightened E-E-A-T scrutiny to Edinburgh-focused content in these sectors. Bambino's Edinburgh SEO campaigns are built with this in mind — demonstrating genuine expertise, authoritativeness, and trustworthiness signals that satisfy both search engines and prospective clients.",
        ],
        "stats": [
            ("100,000+", "Finance Sector Jobs in Scotland", "Edinburgh anchors Scotland's financial services industry. Firms in this sector competing for high-value client searches need robust E-E-A-T signals that generic agencies cannot provide."),
            ("4.5M", "Annual Tourist Visitors", "Edinburgh's tourism economy creates enormous search volume for hospitality, experiences, and services — with peak seasons around the Festival (August) and Hogmanay creating predictable SEO opportunities."),
            ("#1", "UK City Ranked for Business Competitiveness (Outside London)", "Edinburgh consistently ranks as the most business-competitive UK city outside of London in major independent surveys — meaning the bar for standing out online is exceptionally high."),
            ("£5B+", "Edinburgh's Knowledge Economy", "Professional services, financial services, and tech together generate over £5B annually — and the majority of new B2B client relationships in these sectors now begin with a Google search."),
        ],
        "industry_tags": ["Financial Services", "Legal &amp; Professional", "Tourism &amp; Hospitality", "Tech &amp; Fintech", "Property &amp; Development", "Education"],
    },
    "liverpool": {
        "name": "Liverpool",
        "intro": [
            "Liverpool is undergoing its most significant commercial transformation in decades. The waterfront and Baltic Triangle have become magnets for creative agencies, tech startups, and professional services businesses — while the city's maritime heritage continues to sustain one of the UK's most active logistics and trade sectors. With a city region economy of over £35 billion and a population of 900,000+, Liverpool represents a high-value SEO market that many national agencies underestimate.",
            "The city's commercial districts each carry distinct search dynamics: the business quarter around Old Hall Street and Exchange Flags, the creative cluster in the Baltic Triangle, the retail intensity of Liverpool ONE and Church Street, and the growing life sciences and biomedical sector anchored around Knowledge Quarter Liverpool (KQ Liverpool). Understanding which buyers are searching in which areas — and what they expect to see — is the difference between a generic SEO retainer and one that actually moves the revenue needle.",
            "Liverpool's creative economy is worth over £4 billion annually, and its professional services sector has grown substantially since the city's designation as a European Capital of Culture in 2008. Bambino's Liverpool SEO strategies are designed to capture the attention of high-intent buyers in these competitive verticals — with content and authority signals that resonate with Liverpool's distinct market identity.",
        ],
        "stats": [
            ("£35B+", "Liverpool City Region Economy", "One of the UK's largest regional economies — and one of the most competitively contested for organic search, particularly across professional services, hospitality, and creative industries."),
            ("50,000+", "Businesses in Liverpool City Region", "A dense business ecosystem creates intense competition for local search rankings. First-page visibility translates directly into a significant share of commercial enquiries."),
            ("£4B+", "Liverpool's Creative Economy", "The Baltic Triangle and wider creative sector generate billions in economic value — and search visibility is the primary discovery mechanism for creative agencies, studios, and production companies."),
            ("2.4x", "Post-2008 Growth in Professional Services", "Since the Capital of Culture designation, Liverpool's professional services sector has grown 2.4x. This growth brings intensifying search competition that makes proactive SEO essential."),
        ],
        "industry_tags": ["Creative &amp; Digital", "Professional Services", "Logistics &amp; Maritime", "Hospitality &amp; Tourism", "Life Sciences", "Retail"],
    },
    "newcastle": {
        "name": "Newcastle",
        "intro": [
            "Newcastle upon Tyne is the Northeast England's undisputed commercial capital — and one of the UK's fastest-growing tech cities. Home to Sage Group (FTSE 100), Ubisoft's largest UK studio, and a rapidly expanding fintech and digital cluster, Newcastle's tech sector now employs over 80,000 people across Tyne and Wear. This concentration of digital-first businesses creates both fierce competition for online visibility and significant opportunity for businesses that rank well.",
            "The Newcastle business landscape spans several distinct commercial zones: the Quayside and Central Business District for professional services, the Ouseburn Valley for creative and tech businesses, the Grey Street financial corridor, and the expanding science and innovation campus at Science Central and Helix. Each area attracts different buyer types and search intent — requiring a city-specific SEO strategy rather than a generic regional approach.",
            "The Northeast's strong regional identity also shapes search behaviour. Newcastle buyers prioritise local expertise and trust signals over national brand names in many sectors — which is why a locally-aware SEO strategy that speaks to Northeast business culture consistently outperforms generic national approaches in this market.",
        ],
        "stats": [
            ("80,000+", "Tech Sector Jobs in Tyne and Wear", "Newcastle's tech cluster — anchored by Sage, Ubisoft, and hundreds of growing digital businesses — creates intense competition for software, digital agency, and B2B technology keywords."),
            ("30,000+", "Businesses in Newcastle City", "A large and diverse business base across professional services, tech, hospitality, and retail makes Newcastle one of the Northeast's most competitive local search markets."),
            ("#2", "UK City for Tech Job Growth (Outside London)", "Newcastle's rapid tech expansion creates new demand for digital skills, services, and tools every month — and the businesses supplying those services need visible organic search presence to capture it."),
            ("67%", "Northeast Buyers Prefer Local Expertise", "Research consistently shows Northeast consumers and B2B buyers favour providers with visible local expertise — making locally-optimised content and signals a competitive advantage in this market."),
        ],
        "industry_tags": ["Tech &amp; Software", "Financial Services", "Creative &amp; Digital", "Professional Services", "Healthcare &amp; Life Sciences", "Hospitality"],
    },
    "sheffield": {
        "name": "Sheffield",
        "intro": [
            "Sheffield is one of the UK's most compelling business reinvention stories. The former Steel City has transformed into a knowledge economy anchored by two world-class universities (Sheffield and Sheffield Hallam, with over 60,000 students combined), a rapidly growing creative and digital sector that earned international attention when Channel 4 chose Sheffield for its new Creative Hub, and an advanced manufacturing sector that remains globally competitive. The result is a city with intense competition for professional services, tech, and creative sector search terms.",
            "Sheffield's commercial geography reflects this transformation: the Creative Industries Quarter and Kelham Island host hundreds of digital agencies, studios, and creative businesses; the Heart of the City II development has reshaped the city centre retail and professional services landscape; and the Advanced Manufacturing Park in Rotherham represents a £200M+ investment in the wider Sheffield City Region's industrial future. Each of these zones generates distinct local search demand.",
            "Sheffield's dual identity — Northern grit and graduate talent — creates a unique buyer psychology. Businesses here respond well to direct, value-led content that demonstrates expertise without corporate polish. Bambino's Sheffield SEO campaigns reflect this — combining technical rigour with content that speaks authentically to the city's commercial culture.",
        ],
        "stats": [
            ("60,000+", "University Students in Sheffield", "Two major universities create a highly educated, research-active population and a continuous pipeline of talent and innovation — plus significant search volume across student services, accommodation, and graduate employers."),
            ("40,000+", "Businesses in Sheffield City Region", "A diverse business base spanning advanced manufacturing, creative industries, professional services, and tech creates competitive pressure across multiple search verticals simultaneously."),
            ("£3B+", "Creative &amp; Digital Economy Value", "Sheffield's creative and digital sector has grown substantially since Channel 4's arrival. Agencies and digital businesses in the city now compete globally — and need SEO that reflects that ambition."),
            ("3rd", "Most Affordable Major UK City for Business", "Lower overheads attract growing businesses — which means increasing competition in Sheffield's key commercial sectors, making proactive SEO investment critical to maintaining visibility."),
        ],
        "industry_tags": ["Creative &amp; Digital", "Advanced Manufacturing", "Professional Services", "Education &amp; Research", "Hospitality &amp; Leisure", "Tech"],
    },
    "leicester": {
        "name": "Leicester",
        "intro": [
            "Leicester is one of the UK's most economically diverse cities — and one of the most underestimated from an SEO perspective. The city has one of the UK's highest concentrations of small businesses per capita, particularly in fashion and textiles (the UK's original textile manufacturing hub), food and hospitality (Leicester's curry mile is nationally famous), professional services, and e-commerce. This business density creates intense competition for local search rankings across virtually every commercial category.",
            "The city's commercial structure is shaped by several distinct sectors: the historic textile and fashion industry centred around the city's industrial heritage, a rapidly growing food and hospitality economy driven by one of the UK's most diverse populations, a professional services sector serving both business and consumer markets, and an expanding digital economy anchored by De Montfort University's technology and creative programmes. Each sector has different search behaviour and competitive dynamics.",
            "Leicester's cultural diversity is also an SEO factor — the city has significant communities whose search behaviour, preferred platforms, and trust signals differ from the national average. Bambino's Leicester strategies account for this, building authority across the audiences that matter most to your specific business, not just the generic majority.",
        ],
        "stats": [
            ("#1", "UK City for Retail Startups per Capita", "Leicester's entrepreneurial culture — particularly in fashion, food, and consumer retail — creates intense competition for e-commerce and retail search terms, and significant opportunity for businesses that rank well."),
            ("30,000+", "Businesses in Leicester City", "One of the UK's most dense business ecosystems for city-size. The sheer volume of competing businesses makes strong SEO a commercial necessity, not an optional extra."),
            ("60%", "Leicester Consumers Search Locally Before Buying", "Local intent is particularly strong in Leicester's market — meaning Google Business Profile optimisation and local landing pages are often the highest-ROI SEO investment for Leicester businesses."),
            ("£5B+", "Leicester City Region Economy", "A growing regional economy with significant retail, manufacturing, and professional services activity creates sustained demand for digital marketing across all major sectors."),
        ],
        "industry_tags": ["Retail &amp; E-commerce", "Fashion &amp; Textiles", "Food &amp; Hospitality", "Professional Services", "Healthcare", "Education"],
    },
    "nottingham": {
        "name": "Nottingham",
        "intro": [
            "Nottingham is the East Midlands' commercial capital and one of the UK's most rapidly evolving digital economies. The city has emerged as a significant gaming and interactive media hub — with over 50 game development studios based in Nottingham and the surrounding region, including Rebellion and several notable independents — alongside strong professional services, retail, and healthcare sectors. Two universities (Nottingham and Nottingham Trent, 65,000+ students combined) feed the talent pipeline that makes Nottingham's digital sector increasingly competitive.",
            "The city's commercial geography reflects its diverse economy: the Lace Market creative quarter for design, digital, and creative agencies; the Southside mixed-use development attracting professional services; the Nottingham Castle Cultural Quarter driving tourism and hospitality; and the Biomedical Campus at Queen's Medical Centre representing the city's growing life sciences ambitions. Each zone creates distinct local search demand that a city-specific SEO strategy can capture.",
            "Nottingham's competitive advantage in several digital niches — gaming, creative tech, and university-linked professional services — creates specific keyword opportunities for businesses in these sectors. Bambino's Nottingham campaigns are designed to capitalise on these niches through cluster content, digital PR, and technical SEO that positions our clients as the definitive local authorities in their space.",
        ],
        "stats": [
            ("50+", "Game Studios in Greater Nottingham", "Nottingham's gaming and interactive media cluster creates significant B2B demand for tech services, recruitment, and professional services — and a highly digital-native audience across all sectors."),
            ("65,000+", "University Students in Nottingham", "Two major research universities generate sustained demand across student services, graduate employers, and the innovation economy — as well as a year-round audience for hospitality and leisure businesses."),
            ("25,000+", "Businesses in Nottingham City", "A competitive SME landscape means businesses need proactive SEO strategies to maintain visibility as the market grows and digital sophistication increases."),
            ("£7B+", "Nottingham City Region Economy", "A growing economy anchored by healthcare, education, creative industries, and professional services creates high-value search demand across multiple verticals."),
        ],
        "industry_tags": ["Gaming &amp; Creative Tech", "Professional Services", "Healthcare &amp; Life Sciences", "Retail &amp; Hospitality", "Education", "Property"],
    },
    "oxford": {
        "name": "Oxford",
        "intro": [
            "Oxford occupies a unique position in the UK business landscape: a world-famous academic and knowledge economy city with a business environment defined by exceptional concentration of expertise. Home to AstraZeneca's global R&D operations, the UK's leading biomedical research cluster, Oxford University's 100+ spin-out companies, and a highly educated professional population, Oxford's commercial market is unlike any other UK city outside London. Competition for professional services, biotech, and knowledge economy search terms is intense — and buyers expect demonstrable expertise, not generic content.",
            "Oxford's commercial districts span several distinct zones: the traditional city centre professional services cluster around St Giles' and the High Street, the Osney Mead industrial and tech estate, the rapidly developing Oxford North innovation district designed to house the next generation of deep-tech businesses, and the Oxford Science Park and Milton Park campus that house hundreds of biotech and pharma companies. Each location serves different buyer types with different search intent.",
            "The exceptional concentration of YMYL activity in Oxford — healthcare, financial services, legal, and academic research — means Google applies its strictest E-E-A-T standards to Oxford-focused content in these sectors. Bambino builds Oxford SEO campaigns with authoritative content, credentialed author attribution, and structured data that satisfies both search engine quality standards and the sophisticated buyer expectations of Oxford's market.",
        ],
        "stats": [
            ("100+", "Oxford University Spinout Companies", "Oxford's deep academic-commercial linkage creates a uniquely knowledge-intensive business ecosystem where demonstrating genuine expertise through content is not just an SEO tactic — it's the only way to win buyer trust."),
            ("£4B+", "Oxford Biotech &amp; Pharma Sector", "The Oxford-Cambridge Arc is one of Europe's leading life sciences clusters. Companies in this sector competing for research, clinical, and investor-facing searches require exceptional E-E-A-T content signals."),
            ("#1", "UK City for Graduate Employment Rate", "Oxford's exceptionally well-educated workforce means buyers across all sectors are sophisticated, research-intensive, and sceptical of generic marketing claims — making content quality and E-E-A-T the primary SEO levers."),
            ("£2.5B+", "Annual Tourism Economy", "Oxford attracts 9+ million visitors annually. The hospitality, retail, and experience economy that serves them creates high search volume and significant commercial opportunity for well-positioned businesses."),
        ],
        "industry_tags": ["Biotech &amp; Pharma", "Professional Services", "Technology &amp; Deep Tech", "Tourism &amp; Hospitality", "Education &amp; Research", "Property"],
    },
    "cambridge": {
        "name": "Cambridge",
        "intro": [
            "Cambridge is the Silicon Fen — Europe's most concentrated technology and life sciences cluster, and one of the world's leading innovation ecosystems. AstraZeneca's global headquarters, ARM Holdings, Autonomy, and hundreds of deep-tech and biotech companies call Cambridge home, alongside one of the world's most prestigious universities and its 100+ commercial spinouts. The result is a market where search competition for professional services, technology, and B2B services is among the most sophisticated and well-funded in the UK.",
            "The Cambridge business geography spans the established West Cambridge Science Park, the new Biomedical Campus adjacent to Addenbrooke's Hospital, the Cambridge North tech cluster, and the city centre professional services zone. Each area serves a distinct audience — from deep-tech startups needing investment and talent, to established pharma businesses seeking specialist B2B services, to consumer-facing hospitality businesses serving the city's tourist and academic populations.",
            "Cambridge's STEM concentration means buyers across virtually all sectors are technically literate, research-intensive, and resistant to generic marketing claims. The highest-performing SEO strategies in Cambridge lead with data, demonstrate expertise through depth and accuracy, and earn authority through genuinely citable content — all of which aligns directly with the E-E-A-T standards Google applies most strictly to this market.",
        ],
        "stats": [
            ("5,000+", "Tech Companies in the Cambridge Cluster", "Europe's densest concentration of technology businesses creates fierce competition for B2B technology, professional services, and talent-related search terms — and significant commercial value for businesses that achieve top rankings."),
            ("60,000+", "Life Sciences Jobs in Cambridge Region", "The Cambridge biomedical and pharma cluster employs over 60,000 people and generates billions in annual economic output — creating sustained demand for specialist services across legal, financial, clinical, and technical sectors."),
            ("Fastest", "Growing Per-Capita Economy in the UK", "Cambridge's sustained economic growth driven by tech and biotech investment means new competitors enter the market constantly. Businesses that establish SEO authority early build compounding advantages that are difficult to overtake."),
            ("9M+", "Annual Visitors", "Cambridge's academic tourism and international visitor economy creates high search volume for hospitality, experiences, and consumer services — with significant seasonal peaks and a globally diverse audience."),
        ],
        "industry_tags": ["Technology &amp; Deep Tech", "Biotech &amp; Life Sciences", "Professional Services", "Tourism &amp; Hospitality", "Education &amp; Research", "Property"],
    },
    "cardiff": {
        "name": "Cardiff",
        "intro": [
            "Cardiff is the UK's fastest-growing capital city — and one of its most interesting SEO markets. The Welsh capital's economy is anchored by a major public sector (Welsh Government, BBC Wales, S4C, NHS Wales), a rapidly expanding professional services sector, a thriving hospitality and tourism economy driven by sports events and cultural tourism, and a growing tech and creative cluster centred on Cardiff Bay. For businesses targeting Cardiff's commercial market, understanding the unique dynamics of a bilingual, capital city environment is essential.",
            "Cardiff's commercial geography has been transformed over the past two decades: Cardiff Bay's regeneration created a new business district housing media companies, professional services, and hospitality businesses; Cardiff city centre's retail and leisure economy has expanded significantly; the Central Square development has become the new home for BBC Wales, Transport for Wales, and major professional services firms; and the Knowledge Quarter surrounding Cardiff University and University Hospital is growing rapidly. Each zone creates distinct local search demand.",
            "Cardiff's bilingual status creates unique opportunities for businesses that optimise for Welsh-language search terms alongside English. While the proportion of Welsh-language searches is relatively small for most commercial sectors, the signal value — demonstrating genuine local commitment — is disproportionately valuable for building trust with Welsh public sector buyers and Welsh-identifying consumers. Bambino's Cardiff strategies account for these nuances.",
        ],
        "stats": [
            ("30,000+", "Businesses in Cardiff Capital Region", "A growing and diversifying business base across public sector services, tech, hospitality, professional services, and creative industries creates competitive pressure across multiple search verticals."),
            ("10,000+", "Media &amp; Creative Jobs in Cardiff", "BBC Wales, S4C, and hundreds of independent production companies make Cardiff one of the UK's most important media cities — creating significant B2B search demand for specialist services."),
            ("Fastest", "Growing Capital City Economy in UK (2024)", "Cardiff's rapid economic expansion means new competitors enter key commercial search categories every quarter. Businesses that invest in SEO proactively capture market position before the market matures."),
            ("21M+", "Annual Visitor Economy", "Cardiff's sports (Principality Stadium, Cardiff City Stadium), cultural, and events tourism economy generates enormous hospitality and consumer search volume — with predictable peaks around major events and the Six Nations."),
        ],
        "industry_tags": ["Media &amp; Creative", "Professional Services", "Public Sector", "Tourism &amp; Events", "Tech &amp; Digital", "Healthcare"],
    },
}

INTRO_PATTERN = re.compile(
    r'(<p>Businesses in \w+ face unique challenges.*?</p>\s*)(<p>The \w+ digital marketplace.*?</p>\s*)?(<p>Bambino.*?</p>\s*){1,5}',
    re.DOTALL
)

def make_intro_html(city_key, data):
    name = data["name"]
    paras = "\n".join(f"                <p>{p}</p>" for p in data["intro"])
    return paras

def make_insights_section(data):
    name = data["name"]
    stats_html = "\n".join(
        f"""            <div style="background: #fff; border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
                <div style="font-size: 2rem; font-family: var(--font-heading); color: var(--primary); margin-bottom: 0.5rem;">{stat}</div>
                <div style="font-weight: 600; color: var(--text); margin-bottom: 0.5rem;">{label}</div>
                <p style="font-size: 0.9rem; color: var(--text-muted);">{desc}</p>
            </div>"""
        for stat, label, desc in data["stats"]
    )
    tags_html = "\n".join(
        f'                <span style="display:inline-block;background:var(--primary);color:#fff;border-radius:100px;padding:0.3rem 0.9rem;font-size:0.8rem;font-weight:600;">{tag}</span>'
        for tag in data["industry_tags"]
    )
    return f"""
<!-- ── LOCAL MARKET INSIGHTS ─────────────────────────────── -->
<section style="padding: 5rem 0; background: var(--bg-soft, #F2F2EC);">
    <div class="container">
        <div class="section-header reveal" style="text-align:center; margin-bottom: 3rem;">
            <span class="section-label">Local Market Intelligence</span>
            <h2 style="font-family: var(--font-heading); font-size: clamp(1.8rem,3.5vw,2.5rem); margin-bottom: 0.75rem;">{name}'s Digital Marketing Landscape</h2>
            <p style="color: var(--text-muted); max-width: 55ch; margin-inline: auto;">Key facts about {name}'s business environment — and what they mean for your SEO strategy.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
{stats_html}
        </div>
        <div style="text-align:center;">
            <p style="font-weight:600;color:var(--text);margin-bottom:1rem;">Key {name} sectors we serve:</p>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;">
{tags_html}
            </div>
        </div>
    </div>
</section>

"""

INSERT_BEFORE = '    <!-- ── RESULTS STRIP'

processed = 0
for city_key, data in CITIES.items():
    path = os.path.join(BASE, city_key, "seo-agency", "index.html")
    if not os.path.exists(path):
        print(f"SKIP (not found): {city_key}")
        continue

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "Local Market Insights" in content:
        print(f"SKIP (already has insights): {city_key}")
        continue

    # Replace generic intro paragraphs with city-specific ones
    name = data["name"]
    old_generic_start = f"<p>Businesses in {name} face unique challenges"
    if old_generic_start in content:
        # Find the entire block of generic paragraphs and replace
        # Pattern: from the first <p> of generic intro to the </div> before </aside>
        start_idx = content.index(old_generic_start)
        # Find where the intro-content div ends (before <aside)
        end_marker = "\n            </div>\n            <aside"
        end_idx = content.index(end_marker, start_idx)

        new_paras = make_intro_html(city_key, data)
        content = content[:start_idx] + new_paras + content[end_idx:]
        print(f"  Replaced generic intro for {name}")
    else:
        print(f"  NOTE: Generic intro not found for {name}, skipping intro replacement")

    # Add Local Market Insights section before results strip
    if INSERT_BEFORE not in content:
        print(f"SKIP (no results strip): {city_key}")
        continue

    insights = make_insights_section(data)
    content = content.replace(INSERT_BEFORE, insights + INSERT_BEFORE, 1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"OK: {city_key}")
    processed += 1

print(f"\nDone: {processed} cities updated.")
