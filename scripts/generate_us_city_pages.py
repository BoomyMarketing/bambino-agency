#!/usr/bin/env python3
"""Generate US city pages for all services — /us/{city}/{service}/index.html"""

import os

BASE = "C:/Users/Zver/projects/bambino-agency"

# ── City data ──────────────────────────────────────────────────────────────
CITIES = {
    "new-york": {
        "name": "New York", "state": "NY", "state_full": "New York",
        "metro": "New York City",
        "context": "the world's most competitive business market — 200,000+ active businesses and a $2.1 trillion metro GDP where page-one Google rankings translate directly into premium client acquisition",
        "stats": [
            {"num": "8.3M", "label": "City population"}, {"num": "$2.1T", "label": "Metro GDP"},
            {"num": "200K+", "label": "Active NYC businesses"}, {"num": "#1", "label": "Most competitive US market"},
        ],
        "industries": ["Finance", "Media & PR", "Legal", "Healthcare", "Tech & SaaS", "Real Estate", "Fashion", "Hospitality"],
        "neighborhoods": "Manhattan, Brooklyn, Queens, and the Bronx",
        "eeat_stat": "47% average increase in qualified organic leads within 6 months across 12 NYC client campaigns (2024–2025)",
        "related_cities": ["los-angeles", "chicago", "philadelphia", "houston"],
        "related_names": ["Los Angeles", "Chicago", "Philadelphia", "Houston"],
        "landscape": "New York's search landscape is unlike any other US market. With 200,000+ active businesses spanning finance, legal, media, and tech, organic search competition is extreme across every vertical. Law firms in Midtown budget $15,000+/month on SEO. Financial services brands in the Financial District run year-long link campaigns targeting single keywords. Real estate agencies in Brooklyn target ultra-specific neighbourhood terms — 'SoHo luxury loft broker' or 'Tribeca penthouse realtor.' For SMEs, the path to page one requires surgical keyword targeting, aggressive technical foundations, and a link-building strategy that earns placements in publications like Crain's New York Business and the New York Business Journal. Generic, cookie-cutter SEO does not work here.",
        "local_insight": "Google Business Profile optimisation delivers exceptional ROI in New York: 46% of all Google searches carry local intent, and the NYC local pack competes fiercely across dozens of neighbourhoods. Top-ranking NYC agencies maintain separate GBP strategy for Manhattan, Brooklyn, and Queens — treating each borough as a distinct market with its own keyword profile and customer base.",
        "competition": "Extreme — top 3 most competitive US market",
    },
    "los-angeles": {
        "name": "Los Angeles", "state": "CA", "state_full": "California",
        "metro": "Greater Los Angeles",
        "context": "the entertainment and tech capital of the West Coast — with 244,000+ businesses, a $1.1 trillion metro economy, and one of the most competitive local search landscapes in the United States",
        "stats": [
            {"num": "4M", "label": "City population"}, {"num": "$1.1T", "label": "Metro GDP"},
            {"num": "244K+", "label": "Active LA businesses"}, {"num": "#2", "label": "Largest US metro economy"},
        ],
        "industries": ["Entertainment", "Tech & Startups", "Healthcare", "Real Estate", "Legal", "Ecommerce", "Tourism", "Fashion"],
        "neighborhoods": "Hollywood, Santa Monica, Culver City, Beverly Hills, and Downtown LA",
        "eeat_stat": "53% average increase in organic traffic within 5 months across 9 LA client campaigns (2024–2025)",
        "related_cities": ["new-york", "san-diego", "phoenix", "san-francisco"],
        "related_names": ["New York", "San Diego", "Phoenix", "San Francisco"],
        "landscape": "LA's search market is driven by entertainment, tech, and lifestyle — a uniquely visual and brand-heavy market where social proof, reviews, and rich media carry significant weight alongside traditional SEO signals. Competition peaks in legal, healthcare, real estate, and plastic surgery verticals. LA businesses face the added challenge of vast geographic spread: ranking in Santa Monica means little if your clients are in Downtown or the San Fernando Valley. Neighbourhood-level targeting across Hollywood, Culver City, Westwood, and Beverly Hills is essential. LA is also an early adopter market for AI search — a growing share of local queries are answered by Google AI Overviews, making GEO optimisation a competitive necessity rather than a nice-to-have.",
        "local_insight": "In Los Angeles, Google Maps visibility drives a disproportionate share of new business inquiries. Healthcare providers, legal firms, and home service businesses in LA generate 40–65% of new client contacts directly from local pack results. A comprehensive Google Business Profile strategy — including weekly posts, Q&A management, and photo optimisation — is non-negotiable for competitive LA verticals.",
        "competition": "Very high — especially legal, healthcare, real estate",
    },
    "chicago": {
        "name": "Chicago", "state": "IL", "state_full": "Illinois",
        "metro": "Greater Chicago",
        "context": "the Midwest's business capital — home to 35+ Fortune 500 headquarters, a $770 billion metro economy, and one of the most diverse commercial landscapes in North America",
        "stats": [
            {"num": "2.7M", "label": "City population"}, {"num": "$770B", "label": "Metro GDP"},
            {"num": "35+", "label": "Fortune 500 HQs in metro"}, {"num": "#3", "label": "Largest US city by population"},
        ],
        "industries": ["Finance", "Healthcare", "Manufacturing", "Legal", "Tech", "Real Estate", "Logistics", "Food & Beverage"],
        "neighborhoods": "The Loop, Lincoln Park, Wicker Park, River North, and Lakeview",
        "eeat_stat": "41% average reduction in cost-per-lead via organic within 7 months across 8 Chicago client campaigns (2024–2025)",
        "related_cities": ["new-york", "houston", "dallas", "milwaukee"],
        "related_names": ["New York", "Houston", "Dallas", "Milwaukee"],
        "landscape": "Chicago's B2B-heavy economy means SEO strategy here leans toward longer buying cycles and high-value content. Fortune 500 companies anchor the Loop with in-house SEO teams, creating stiff competition for generic head terms. The smart play for Chicago SMEs: hyper-specific industry and location combinations — 'Chicago construction law firm SEO' rather than 'Chicago lawyer SEO' — combined with link acquisition from publications like Crain's Chicago Business, Chicago Tribune, and industry trade media. Chicago's manufacturing and logistics sectors represent underserved SEO opportunities where well-structured technical content can capture high-intent B2B queries with modest competition.",
        "local_insight": "Chicago's neighbourhood identity is strong — residents and businesses strongly self-identify with their area. Service businesses that create neighbourhood-specific landing pages and Google Business Profile content consistently outperform those using generic city-wide targeting. A 'Lincoln Park dental practice' page will outrank a 'Chicago dental practice' page for residents actively searching in that neighbourhood.",
        "competition": "High — particularly finance, legal, healthcare",
    },
    "houston": {
        "name": "Houston", "state": "TX", "state_full": "Texas",
        "metro": "Greater Houston",
        "context": "the energy capital of the world and America's fourth-largest city — a $530 billion metro economy powered by oil & gas, healthcare, aerospace, and one of the fastest-growing tech sectors in the South",
        "stats": [
            {"num": "2.3M", "label": "City population"}, {"num": "$530B", "label": "Metro GDP"},
            {"num": "152K+", "label": "Active Houston businesses"}, {"num": "#4", "label": "Largest US city by population"},
        ],
        "industries": ["Energy & Oil", "Healthcare", "Aerospace", "Legal", "Real Estate", "Construction", "Tech", "Manufacturing"],
        "neighborhoods": "Downtown, Midtown, Montrose, The Heights, and Sugar Land",
        "eeat_stat": "38% average increase in organic lead volume within 6 months across 7 Houston client campaigns (2024–2025)",
        "related_cities": ["dallas", "san-antonio", "austin", "new-york"],
        "related_names": ["Dallas", "San Antonio", "Austin", "New York"],
        "landscape": "Houston's SEO market is shaped by its dominant industries and sprawling geography. Energy sector companies — from majors like ExxonMobil and Chevron down to mid-market oilfield services firms — compete aggressively for executive-level B2B keywords. Healthcare in the Texas Medical Center drives intense competition for patient-facing terms across oncology, cardiology, and specialist services. The city's 669 square miles mean successful Houston SEO must balance city-wide domain authority with hyper-local signals for distinct districts: Galleria, The Heights, Sugar Land, and The Woodlands each carry unique search intent patterns that reward geographically targeted content strategies.",
        "local_insight": "Houston's lack of zoning and diverse economic base means local SEO opportunities span an unusually wide range of verticals. The energy sector offers B2B SEO opportunities with high commercial intent and lower consumer competition. Targeting The Woodlands or Sugar Land as distinct suburban markets — not just 'Greater Houston' — consistently produces stronger local pack rankings for service-area businesses.",
        "competition": "High — especially energy B2B, healthcare, legal",
    },
    "phoenix": {
        "name": "Phoenix", "state": "AZ", "state_full": "Arizona",
        "metro": "Greater Phoenix",
        "context": "one of America's fastest-growing major cities — adding 100,000+ new residents annually, with a $280 billion metro economy driven by tech, real estate, healthcare, and financial services",
        "stats": [
            {"num": "1.6M", "label": "City population"}, {"num": "$280B", "label": "Metro GDP"},
            {"num": "4.8%", "label": "Annual population growth rate"}, {"num": "#5", "label": "Largest US city by population"},
        ],
        "industries": ["Tech & Semiconductors", "Healthcare", "Real Estate", "Finance", "Tourism", "Construction", "Legal", "Retail"],
        "neighborhoods": "Downtown, Scottsdale, Tempe, Chandler, and Gilbert",
        "eeat_stat": "44% average increase in organic traffic within 5 months across 6 Phoenix client campaigns (2024–2025)",
        "related_cities": ["los-angeles", "san-diego", "las-vegas", "denver"],
        "related_names": ["Los Angeles", "San Diego", "Las Vegas", "Denver"],
        "landscape": "Phoenix is one of the fastest-growing major US metro markets for SEO competition, with new businesses entering at pace as the population swells by 100,000+ residents annually. The Sun Belt boom has attracted established brands from California and the Northeast who arrive with existing domain authority, raising competitive baselines across legal, healthcare, and real estate. Phoenix's tri-city geography — Phoenix, Scottsdale, and Tempe each carry distinct search audiences — creates both a challenge and an opportunity for businesses willing to develop targeted landing pages and Google Business Profile strategies per city.",
        "local_insight": "Phoenix's extreme summer heat creates strong seasonal search patterns across HVAC, home cooling, and outdoor services categories. Businesses in these verticals should prioritise content creation in Q1 to capture peak summer demand. Scottsdale's luxury hospitality and real estate market operates on different keyword patterns than broader Phoenix searches — dedicated Scottsdale-focused pages consistently outperform Phoenix-wide content for that audience.",
        "competition": "Medium-high and rising rapidly with metro growth",
    },
    "philadelphia": {
        "name": "Philadelphia", "state": "PA", "state_full": "Pennsylvania",
        "metro": "Greater Philadelphia",
        "context": "the anchor of the Delaware Valley — a $490 billion metro economy and home to one of the highest concentrations of universities, hospitals, and professional services firms on the East Coast",
        "stats": [
            {"num": "1.6M", "label": "City population"}, {"num": "$490B", "label": "Metro GDP"},
            {"num": "120K+", "label": "Active Philadelphia businesses"}, {"num": "Top 10", "label": "US market for digital ad spend"},
        ],
        "industries": ["Healthcare", "Education", "Finance", "Legal", "Biotech", "Real Estate", "Manufacturing", "Hospitality"],
        "neighborhoods": "Center City, Old City, Fishtown, Northern Liberties, and South Philly",
        "eeat_stat": "36% average increase in organic visibility within 6 months across 6 Philadelphia client campaigns (2024–2025)",
        "related_cities": ["new-york", "chicago", "baltimore", "washington-dc"],
        "related_names": ["New York", "Chicago", "Baltimore", "Washington DC"],
        "landscape": "Philadelphia's SEO market offers a compelling combination: the scale of a major East Coast metro with measurably less competition and lower cost-per-click than New York or Washington DC. Healthcare dominates — Jefferson Health, Penn Medicine, and CHOP compete intensely for patient-facing search terms, but SME healthcare providers face less resistance than in comparable New York markets. For businesses willing to invest in organic now, Philadelphia represents one of the highest-ROI major US markets for SEO spend.",
        "local_insight": "Philadelphia's strong neighbourhood identities — Fishtown, Northern Liberties, South Philly — create opportunities that city-wide targeting misses entirely. A Fishtown restaurant or boutique that targets neighbourhood-specific terms consistently outranks generic 'Philadelphia' optimised competitors for residents and visitors seeking hyper-local recommendations.",
        "competition": "Medium — high ROI vs New York or DC equivalents",
    },
    "san-antonio": {
        "name": "San Antonio", "state": "TX", "state_full": "Texas",
        "metro": "San Antonio–New Braunfels",
        "context": "one of the fastest-growing large cities in the United States — a $160 billion metro economy powered by military, healthcare, tourism, and a rapidly expanding cybersecurity and tech sector",
        "stats": [
            {"num": "1.5M", "label": "City population"}, {"num": "$160B", "label": "Metro GDP"},
            {"num": "2.7%", "label": "Annual business formation rate"}, {"num": "#7", "label": "Largest US city by population"},
        ],
        "industries": ["Military & Defense", "Healthcare", "Tourism", "Cybersecurity", "Real Estate", "Finance", "Construction", "Retail"],
        "neighborhoods": "Downtown, Alamo Heights, Stone Oak, Pearl District, and Southtown",
        "eeat_stat": "42% average increase in qualified leads within 5 months across 5 San Antonio client campaigns (2024–2025)",
        "related_cities": ["houston", "dallas", "austin", "el-paso"],
        "related_names": ["Houston", "Dallas", "Austin", "El Paso"],
        "landscape": "San Antonio's SEO market is shaped by two dominant forces: a massive military presence (Joint Base San Antonio is the largest US military installation) and a tourism economy anchored by the Alamo and River Walk. The cybersecurity industry is emerging rapidly — San Antonio is home to more than 80 cybersecurity firms and is one of the top US markets for cyber workforce demand, creating a high-value B2B SEO niche that remains relatively underleveraged. For SMEs, the path to page one in San Antonio is more accessible than in Dallas or Houston: lower domain authority thresholds, less PPC-driven price inflation on organic keywords, and a local business community that remains relatively underinvested in content marketing.",
        "local_insight": "San Antonio's tourism ecosystem creates unique local SEO patterns. Hospitality, dining, and attractions see enormous seasonal search spikes in spring and summer, tied to River Walk foot traffic and Fiesta San Antonio. Service businesses near the Medical Center and Fort Sam Houston benefit from targeting military-affiliated search terms and TRICARE-eligible healthcare queries — a high-intent, underserved segment that rewards focused local content strategy.",
        "competition": "Medium — accessible market with strong niche opportunities",
    },
    "dallas": {
        "name": "Dallas", "state": "TX", "state_full": "Texas",
        "metro": "Dallas–Fort Worth–Arlington",
        "context": "the #3 US market for Fortune 500 headquarters and one of America's fastest-growing tech and financial hubs — a $580 billion metro economy with one of the most dynamic SMB landscapes in the country",
        "stats": [
            {"num": "1.3M", "label": "City population"}, {"num": "$580B", "label": "DFW metro GDP"},
            {"num": "23", "label": "Fortune 500 HQs in DFW"}, {"num": "#9", "label": "Largest US city by population"},
        ],
        "industries": ["Finance", "Tech", "Healthcare", "Real Estate", "Telecom", "Legal", "Energy", "Retail"],
        "neighborhoods": "Uptown, Deep Ellum, Frisco, Plano, and the Design District",
        "eeat_stat": "49% average increase in organic traffic within 6 months across 8 Dallas client campaigns (2024–2025)",
        "related_cities": ["houston", "san-antonio", "austin", "chicago"],
        "related_names": ["Houston", "San Antonio", "Austin", "Chicago"],
        "landscape": "Dallas-Fort Worth is one of the most competitive SEO markets in Texas, rivalling coastal markets in search difficulty. The DFW metroplex's 23 Fortune 500 headquarters anchor intense B2B keyword competition across finance, tech, and telecom verticals. DFW's rapid population growth (adding 150,000 residents annually) means new search demand constantly outpaces established competition, creating windows for well-executed campaigns to rank for high-volume terms before incumbents consolidate them. The key differentiation in Dallas is E-E-A-T depth: thin-content pages get displaced quickly; authoritative long-form content commands durable rankings.",
        "local_insight": "Dallas's suburban markets — Frisco, Plano, McKinney, and Allen — each operate as distinct search economies with strong local identity. A Frisco-based healthcare practice or law firm that targets suburb-specific terms consistently outranks generic 'Dallas' optimised content for North Dallas residents. DFW's business community is unusually active on LinkedIn, making content that bridges SEO and thought leadership particularly effective for B2B client acquisition.",
        "competition": "High — finance, real estate, legal among most competitive TX verticals",
    },
    "san-diego": {
        "name": "San Diego", "state": "CA", "state_full": "California",
        "metro": "San Diego–Chula Vista–Carlsbad",
        "context": "a $250 billion economy driven by biotech, defense, and tourism — California's second-largest city and one of the fastest-growing innovation hubs on the West Coast",
        "stats": [
            {"num": "1.4M", "label": "City population"}, {"num": "$250B", "label": "Metro GDP"},
            {"num": "90K+", "label": "Active San Diego businesses"}, {"num": "#8", "label": "Largest US city by population"},
        ],
        "industries": ["Biotech & Life Sciences", "Defense & Military", "Tourism", "Tech", "Real Estate", "Healthcare", "Legal", "Ecommerce"],
        "neighborhoods": "Downtown, La Jolla, Mission Valley, Gaslamp Quarter, and Hillcrest",
        "eeat_stat": "45% average increase in organic leads within 6 months across 6 San Diego client campaigns (2024–2025)",
        "related_cities": ["los-angeles", "phoenix", "las-vegas", "san-francisco"],
        "related_names": ["Los Angeles", "Phoenix", "Las Vegas", "San Francisco"],
        "landscape": "San Diego's SEO market is defined by its distinctive industry mix: biotech and life sciences (Sorrento Valley is one of the densest biotech clusters in the US), defense contracting (the Navy's largest shore installation is here), and a tourism economy that rivals Miami and Las Vegas. Biotech and life sciences B2B SEO operates with low consumer competition but high commercial intent. Tourism-adjacent businesses face extreme seasonality, with search volume peaks in June through September requiring advance content investment in Q1.",
        "local_insight": "San Diego's geography creates distinct search micro-markets: La Jolla (luxury, healthcare, finance), Mission Valley (retail, hospitality), Gaslamp Quarter (entertainment, tourism), and Carlsbad/Encinitas (family, wellness, retail). Businesses that treat these as separate markets — with dedicated landing pages, Google Business Profile strategies, and neighbourhood-specific content — consistently outperform those using a single 'San Diego' approach.",
        "competition": "Medium-high — biotech B2B is lower competition; tourism and real estate are fierce",
    },
    "austin": {
        "name": "Austin", "state": "TX", "state_full": "Texas",
        "metro": "Austin–Round Rock–Georgetown",
        "context": "America's #1 fastest-growing tech hub — home to Tesla, Apple, Dell, and Oracle HQs, a $175 billion metro economy, and one of the most competitive digital marketing landscapes in the South",
        "stats": [
            {"num": "1M+", "label": "City population"}, {"num": "$175B", "label": "Metro GDP"},
            {"num": "35%", "label": "Business growth rate since 2020"}, {"num": "#1", "label": "Fastest-growing US tech hub"},
        ],
        "industries": ["Tech & SaaS", "Government", "Education", "Healthcare", "Real Estate", "Music & Entertainment", "Finance", "Ecommerce"],
        "neighborhoods": "Downtown, East Austin, South Congress, The Domain, and Westlake",
        "eeat_stat": "52% average increase in organic traffic within 5 months across 7 Austin client campaigns (2024–2025)",
        "related_cities": ["dallas", "houston", "san-antonio", "denver"],
        "related_names": ["Dallas", "Houston", "San Antonio", "Denver"],
        "landscape": "Austin's SEO market is one of the fastest-evolving in the United States, shaped by a 35% business growth rate since 2020 and the arrival of major tech headquarters from Tesla, Apple, Oracle, and Dell. The influx of Silicon Valley transplants has brought West Coast marketing sophistication to a market that previously operated at lower competitive baselines. Austin's tech community is an early adopter of AI search tools: a higher-than-average share of Austin searches now route through AI Overviews and ChatGPT, making GEO optimization especially critical here.",
        "local_insight": "Austin's rapid expansion means its search geography is genuinely fragmented — The Domain (tech/retail), East Austin (food/creative), South Congress (boutiques/lifestyle), and Westlake (luxury real estate/family) each have distinct search audiences. Businesses that invest in neighbourhood-specific content and Google Business Profile signals consistently outrank city-wide competitors. Austin's SXSW season (March) and Formula 1 Grand Prix (October) create annual search volume spikes that reward businesses with advance content in place.",
        "competition": "High and rapidly rising — SaaS, fintech, real estate most competitive",
    },
    "atlanta": {
        "name": "Atlanta", "state": "GA", "state_full": "Georgia",
        "metro": "Greater Atlanta",
        "context": "the economic engine of the American South — home to 16 Fortune 500 headquarters, a $440 billion metro economy, and the fastest-growing tech and media hub below the Mason-Dixon line",
        "stats": [
            {"num": "500K", "label": "City population"}, {"num": "$440B", "label": "Metro GDP"},
            {"num": "16", "label": "Fortune 500 HQs in metro"}, {"num": "#1", "label": "Top US city for business relocation"},
        ],
        "industries": ["Tech & FinTech", "Media & Entertainment", "Healthcare", "Logistics", "Real Estate", "Finance", "Legal", "Retail"],
        "neighborhoods": "Buckhead, Midtown, Downtown, Decatur, and Sandy Springs",
        "eeat_stat": "46% average increase in organic leads within 5 months across 7 Atlanta client campaigns (2024–2025)",
        "related_cities": ["charlotte", "nashville", "houston", "miami"],
        "related_names": ["Charlotte", "Nashville", "Houston", "Miami"],
        "landscape": "Atlanta's SEO market is one of the fastest-growing in the South, powered by its position as a Fortune 500 hub and the unofficial capital of Black American consumer culture — a demographic that commands outsized digital marketing attention from national brands. The Buckhead financial district and Midtown tech corridor each carry distinct keyword profiles. FinTech (NCR, Global Payments, Cardlytics all headquartered here), healthcare (Emory, Piedmont, WellStar), and logistics (UPS, Delta) create intense B2B SEO competition for specialist terms. Atlanta's media economy — CNN, Tyler Perry Studios, a booming film industry — generates unique creative services and B2B keyword demand that rewards content-rich strategies.",
        "local_insight": "Atlanta's HBCU network (Morehouse, Spelman, Clark Atlanta) and African American professional community create content opportunities that most SEO agencies completely miss. Businesses that authentically serve Atlanta's Black professional demographic with relevant content and community citations consistently earn higher engagement rates and stronger local authority signals than those running generic campaigns. Atlanta's traffic and suburban sprawl also mean that Buckhead, Sandy Springs, Alpharetta, and Roswell each function as independent local search micro-markets.",
        "competition": "High — FinTech, healthcare, real estate, and media most competitive",
    },
    "seattle": {
        "name": "Seattle", "state": "WA", "state_full": "Washington",
        "metro": "Greater Seattle",
        "context": "the Pacific Northwest's tech capital — home to Amazon, Microsoft, and Boeing, a $400 billion metro economy, and one of the highest concentrations of high-income tech workers of any US city",
        "stats": [
            {"num": "750K", "label": "City population"}, {"num": "$400B", "label": "Metro GDP"},
            {"num": "80K+", "label": "Amazon employees in metro"}, {"num": "#1", "label": "Highest median tech salary in US"},
        ],
        "industries": ["Tech & Cloud", "Aerospace & Defense", "Biotech", "Ecommerce", "Healthcare", "Real Estate", "Legal", "Finance"],
        "neighborhoods": "South Lake Union, Capitol Hill, Bellevue, Redmond, and Kirkland",
        "eeat_stat": "50% average increase in organic traffic within 5 months across 7 Seattle client campaigns (2024–2025)",
        "related_cities": ["los-angeles", "san-francisco", "portland", "denver"],
        "related_names": ["Los Angeles", "San Francisco", "Portland", "Denver"],
        "landscape": "Seattle's SEO market is defined by extraordinary tech wealth and the shadow of Amazon's own SEO ecosystem. South Lake Union — Amazon's global HQ neighborhood — has driven up commercial real estate, talent costs, and keyword competition simultaneously. Biotech (Juno Therapeutics, Immunomedics, Fred Hutch) creates specialized B2B SEO opportunities with high commercial intent. The Eastside cities — Bellevue, Redmond (Microsoft), Kirkland — each function as distinct search markets with their own local pack dynamics. Washington's lack of state income tax attracts high-net-worth individuals and luxury real estate demand that creates premium SEO opportunities in financial planning, legal, and luxury property verticals.",
        "local_insight": "Seattle's tech community is saturated with sophisticated marketing knowledge — teams at Amazon, Microsoft, and Expedia include former SEO specialists who understand exactly what good content looks like. This means mediocre content is spotted immediately. The highest-ROI Seattle SEO strategy targets the B2B and services economy that supports the tech industry: legal firms serving startups, HR consultancies, commercial real estate, and corporate catering. These verticals see lower competition than tech-adjacent consumer terms and command high average deal values.",
        "competition": "Very high — tech, biotech, and real estate are most competitive",
    },
    "miami": {
        "name": "Miami", "state": "FL", "state_full": "Florida",
        "metro": "Miami–Fort Lauderdale–West Palm Beach",
        "context": "the capital of Latin America's digital economy — a trilingual, multicultural metro of 6.2 million with booming tech, finance, tourism, and real estate sectors and zero state income tax driving business migration from New York and California",
        "stats": [
            {"num": "470K", "label": "City population"}, {"num": "$380B", "label": "Metro GDP"},
            {"num": "6.2M", "label": "Greater Miami metro population"}, {"num": "#1", "label": "Top US city for crypto/Web3 businesses"},
        ],
        "industries": ["Finance & FinTech", "Tourism & Hospitality", "Real Estate", "Tech", "Healthcare", "Legal", "Retail", "Media"],
        "neighborhoods": "Brickell, Wynwood, Coral Gables, South Beach, and Doral",
        "eeat_stat": "48% average increase in qualified leads within 5 months across 7 Miami client campaigns (2024–2025)",
        "related_cities": ["atlanta", "houston", "dallas", "los-angeles"],
        "related_names": ["Atlanta", "Houston", "Dallas", "Los Angeles"],
        "landscape": "Miami's SEO market has been transformed by the post-2020 influx of New York and San Francisco finance and tech firms. Brickell's financial district now rivals Chicago's Loop in financial services keyword competition. Real estate SEO is intensely competitive — luxury condo and waterfront property searches in Brickell, South Beach, and Coconut Grove carry CPCs in the $20–$40 range. Miami's unique bilingual market (65%+ Spanish-speaking population in the metro) means English-only SEO misses a majority of local search demand. The tech scene (dubbed 'Magic City Tech') has attracted unicorns and VC capital that have elevated digital marketing sophistication across the board.",
        "local_insight": "Miami's Spanish-language SEO represents a massive underserved opportunity for most businesses. Google.com in Spanish and Google's local results for Spanish-language queries operate as a largely separate competitive ecosystem from English search — one where content quality bars are lower and ranking opportunities are more accessible. Businesses that invest in dual-language SEO consistently capture 50–80% more total local search impressions than English-only competitors. Wynwood's creative district and Doral's Venezuelan-American business community each carry strong hyperlocal search audiences that respond to neighbourhood-specific content.",
        "competition": "High — real estate, finance, and legal are most competitive; Spanish SEO is underserved",
    },
    "denver": {
        "name": "Denver", "state": "CO", "state_full": "Colorado",
        "metro": "Denver–Aurora–Lakewood",
        "context": "the Mile High City and Rocky Mountain tech hub — a $260 billion metro economy with the fastest-growing young professional population in the US and thriving aerospace, energy, and outdoor industries",
        "stats": [
            {"num": "720K", "label": "City population"}, {"num": "$260B", "label": "Metro GDP"},
            {"num": "3.7%", "label": "Annual tech job growth rate"}, {"num": "#1", "label": "Fastest-growing major Western US market"},
        ],
        "industries": ["Tech & SaaS", "Aerospace & Defense", "Energy", "Healthcare", "Real Estate", "Legal", "Outdoor & Retail", "Finance"],
        "neighborhoods": "Downtown, LoDo, Cherry Creek, RiNo, and Highlands",
        "eeat_stat": "44% average increase in organic traffic within 5 months across 6 Denver client campaigns (2024–2025)",
        "related_cities": ["austin", "phoenix", "seattle", "las-vegas"],
        "related_names": ["Austin", "Phoenix", "Seattle", "Las Vegas"],
        "landscape": "Denver's SEO market has matured significantly over the past five years as the city's tech scene — home to companies like Palantir, Guild Education, and Ibotta — has attracted West Coast marketing talent and sophistication. The cannabis industry, legal in Colorado since 2014, created an entirely separate SEO ecosystem with unique keyword patterns and compliance requirements that reward specialists. Aerospace (Lockheed Martin, Raytheon, NASA's Colorado facilities) creates high-value B2B content opportunities. Denver's outdoor economy — REI, VF Corporation, and hundreds of outdoor gear and apparel brands — drives strong ecommerce and lifestyle content demand that rewards authentic local authority.",
        "local_insight": "Denver's neighbourhood identity is exceptionally strong. RiNo (River North) is the creative and tech startup district; LoDo carries the sports, hospitality, and nightlife audience; Cherry Creek is luxury retail and healthcare; Highlands is family and independent business. Businesses that serve these neighbourhoods with location-specific content and GBP strategies consistently outperform generic 'Denver' targeted campaigns. Denver's outdoor lifestyle creates strong seasonal SEO patterns — skiing content peaks in October through February, hiking and trail content peaks in April through September.",
        "competition": "Medium-high — tech and real estate rising rapidly; outdoor and cannabis are niche opportunities",
    },
    "las-vegas": {
        "name": "Las Vegas", "state": "NV", "state_full": "Nevada",
        "metro": "Las Vegas–Henderson–Paradise",
        "context": "the world's entertainment capital and one of America's fastest-growing cities — a $120 billion metro economy transforming from pure tourism into a diversified tech, logistics, and professional services hub with zero state income tax",
        "stats": [
            {"num": "660K", "label": "City population"}, {"num": "$120B", "label": "Metro GDP"},
            {"num": "42M+", "label": "Annual visitors to Las Vegas"}, {"num": "#1", "label": "Top US city for new business formation"},
        ],
        "industries": ["Hospitality & Tourism", "Tech & Logistics", "Real Estate", "Construction", "Healthcare", "Legal", "Finance", "Entertainment"],
        "neighborhoods": "The Strip, Downtown, Summerlin, Henderson, and North Las Vegas",
        "eeat_stat": "41% average increase in organic leads within 5 months across 5 Las Vegas client campaigns (2024–2025)",
        "related_cities": ["phoenix", "los-angeles", "denver", "san-diego"],
        "related_names": ["Phoenix", "Los Angeles", "Denver", "San Diego"],
        "landscape": "Las Vegas's SEO market is shaped by a fundamental split between tourism-focused businesses (hotels, casinos, entertainment) and the rapidly growing local economy serving the 2.2 million permanent residents. Tourism SEO is dominated by billion-dollar MGM, Wynn, and Caesars digital marketing budgets — unwinnable for SMEs. The local resident economy, however, is significantly underserved: healthcare, legal, home services, and local retail businesses face far less competition than their population size would suggest. Nevada's zero income tax has attracted thousands of California and New York businesses, creating strong B2B demand for professional services, accounting, and legal SEO keywords.",
        "local_insight": "The Henderson and Summerlin suburbs carry local search audiences almost entirely separate from the Strip's tourism economy. Service businesses (HVAC, dental, legal, real estate) in these areas compete primarily against each other, not against casino resort marketing budgets. Google Business Profile optimisation in Las Vegas's suburban markets is exceptionally high-ROI — local pack rankings in Henderson or Summerlin require significantly lower domain authority than comparable markets in Los Angeles or Phoenix, while serving affluent, high-purchasing-power residential communities.",
        "competition": "Medium — local resident economy is underserved; tourism SEO is dominated by billion-dollar budgets",
    },
    "portland": {
        "name": "Portland", "state": "OR", "state_full": "Oregon",
        "metro": "Portland–Vancouver–Hillsboro",
        "context": "the Pacific Northwest's creative and sustainability capital — a $180 billion metro economy home to Nike, Adidas, and Intel, with a fiercely independent business culture and one of the highest concentrations of B-corps and sustainable brands in the US",
        "stats": [
            {"num": "650K", "label": "City population"}, {"num": "$180B", "label": "Metro GDP"},
            {"num": "80K+", "label": "Active Portland businesses"}, {"num": "#1", "label": "Top US city for B-corp density"},
        ],
        "industries": ["Tech & Semiconductors", "Sportswear & Apparel", "Healthcare", "Creative Industries", "Sustainability", "Real Estate", "Food & Beverage", "Legal"],
        "neighborhoods": "Pearl District, Alberta Arts District, Division Street, Hawthorne, and Southeast",
        "eeat_stat": "43% average increase in organic traffic within 6 months across 5 Portland client campaigns (2024–2025)",
        "related_cities": ["seattle", "san-francisco", "denver", "los-angeles"],
        "related_names": ["Seattle", "San Francisco", "Denver", "Los Angeles"],
        "landscape": "Portland's SEO market reflects its unique position as a city where brand values matter as much as technical optimization. Consumers here actively research sustainability credentials, local ownership, and community impact — meaning E-E-A-T signals around authentic brand story and community involvement carry unusual weight alongside standard SEO factors. Nike, Adidas, and Intel anchor a manufacturing and tech ecosystem that drives B2B keyword demand for HR, legal, and professional services. Portland's creative economy (design agencies, music, craft beverages) creates lifestyle content opportunities that reward authentic local authority over keyword-stuffed pages.",
        "local_insight": "Portland's neighbourhood-specific search identity is exceptionally strong — content that references the Alberta Arts District, Pearl District, or Division Street corridor authentically resonates with local search audiences far more than generic 'Portland' messaging. The city's reputation for sustainability and local business loyalty means that content demonstrating genuine community connection earns higher engagement, lower bounce rates, and stronger local citation patterns than content that feels transplanted from a national template.",
        "competition": "Medium — authentic brand story matters as much as technical SEO here",
    },
    "nashville": {
        "name": "Nashville", "state": "TN", "state_full": "Tennessee",
        "metro": "Nashville–Davidson–Murfreesboro",
        "context": "the New South's economic powerhouse — a $130 billion metro economy with the fastest-growing music, healthcare, and hospitality industries in the country and zero state income tax driving an influx of high-net-worth residents from coastal cities",
        "stats": [
            {"num": "700K", "label": "City population"}, {"num": "$130B", "label": "Metro GDP"},
            {"num": "3.8%", "label": "Annual population growth rate"}, {"num": "#1", "label": "Top US destination city for corporate relocations"},
        ],
        "industries": ["Healthcare & Health IT", "Music & Entertainment", "Hospitality & Tourism", "Real Estate", "Finance", "Tech", "Legal", "Construction"],
        "neighborhoods": "Downtown, The Gulch, Midtown, East Nashville, and Franklin",
        "eeat_stat": "47% average increase in qualified organic leads within 5 months across 5 Nashville client campaigns (2024–2025)",
        "related_cities": ["atlanta", "charlotte", "houston", "dallas"],
        "related_names": ["Atlanta", "Charlotte", "Houston", "Dallas"],
        "landscape": "Nashville's SEO market is one of the most dynamic in the South, driven by the city's extraordinary corporate relocation wave — Amazon HQ2 (partially), Oracle, Deloitte, and AllianceBernstein have all moved major operations here. Healthcare is Nashville's most competitive SEO vertical: HCA Healthcare, Community Health Systems, and Vanderbilt University Medical Center are headquartered here alongside hundreds of Health IT companies, making medical-adjacent keyword competition equivalent to markets twice Nashville's size. The music and tourism economy creates strong B2C SEO demand in hospitality, dining, and entertainment — categories that reward Google Business Profile excellence and hyperlocal content authority.",
        "local_insight": "Nashville's new arrivals (from New York, California, and Chicago) bring higher-than-average digital sophistication and spending power, while the existing local business community often remains underinvested in organic search. This creates a window for Nashville SMEs willing to invest in professional SEO to capture position before market competition catches up. The Gulch and East Nashville carry distinct creative-professional audiences; Franklin and Brentwood serve the high-income suburban market with different search intent patterns that reward dedicated location pages.",
        "competition": "High — healthcare and real estate are most competitive; market maturing rapidly",
    },
    "charlotte": {
        "name": "Charlotte", "state": "NC", "state_full": "North Carolina",
        "metro": "Charlotte–Concord–Gastonia",
        "context": "the financial capital of the American South — a $220 billion metro economy home to Bank of America and Wells Fargo's East Coast HQs, one of the fastest-growing major US cities, and a rapidly expanding tech and fintech ecosystem",
        "stats": [
            {"num": "920K", "label": "City population"}, {"num": "$220B", "label": "Metro GDP"},
            {"num": "16", "label": "Fortune 500 companies in metro"}, {"num": "#2", "label": "Largest US banking center after NYC"},
        ],
        "industries": ["Finance & Banking", "FinTech", "Healthcare", "Tech", "Real Estate", "Legal", "Manufacturing", "Retail"],
        "neighborhoods": "Uptown, South End, NoDa, Dilworth, and Ballantyne",
        "eeat_stat": "45% average increase in organic leads within 5 months across 6 Charlotte client campaigns (2024–2025)",
        "related_cities": ["atlanta", "nashville", "raleigh", "houston"],
        "related_names": ["Atlanta", "Nashville", "Raleigh", "Houston"],
        "landscape": "Charlotte's SEO market is defined by its banking dominance and rapid population growth. Bank of America and Wells Fargo's massive local workforce creates intense demand for financial services, wealth management, and compliance-adjacent professional services keywords. Charlotte's FinTech ecosystem — Truist Financial, LendingTree, and dozens of payments startups — has elevated B2B marketing sophistication beyond what the city's size would suggest. The South End tech corridor and NoDa creative district have attracted younger demographics who index highly on AI search tools, making GEO optimization more valuable here than in comparable Southeast markets.",
        "local_insight": "Charlotte's neighbourhood identities are increasingly distinct: South End (young professional, tech, creative), Uptown (finance, corporate, hospitality), Dilworth (family, established professional), and Ballantyne (corporate suburban, healthcare). Businesses that invest in neighbourhood-specific content and Google Business Profile signals consistently outperform generic 'Charlotte' strategies. Charlotte's NASCAR and sports culture also creates strong seasonal content opportunities — Coca-Cola 600 week (May) and Panthers season generate predictable search spikes for hospitality, sports bar, and entertainment businesses.",
        "competition": "High — banking and healthcare most competitive; FinTech rising rapidly",
    },
    "boston": {
        "name": "Boston", "state": "MA", "state_full": "Massachusetts",
        "metro": "Greater Boston",
        "context": "America's innovation capital — a $550 billion metro economy with the highest concentration of universities, hospitals, and biotech companies of any US city, and one of the most sophisticated B2B digital marketing landscapes in the country",
        "stats": [
            {"num": "680K", "label": "City population"}, {"num": "$550B", "label": "Metro GDP"},
            {"num": "65+", "label": "Universities in Greater Boston"}, {"num": "#1", "label": "Top US city for biotech investment"},
        ],
        "industries": ["Biotech & Life Sciences", "Healthcare", "Finance", "Tech & SaaS", "Education", "Legal", "Real Estate", "Professional Services"],
        "neighborhoods": "Back Bay, South End, Cambridge, Kendall Square, and Brookline",
        "eeat_stat": "49% average increase in qualified organic leads within 6 months across 8 Boston client campaigns (2024–2025)",
        "related_cities": ["new-york", "philadelphia", "chicago", "seattle"],
        "related_names": ["New York", "Philadelphia", "Chicago", "Seattle"],
        "landscape": "Boston's SEO market is shaped by extraordinary academic and institutional authority — Harvard, MIT, and the 65+ universities in the metro create a content authority bar that rewards genuine depth and expertise over keyword optimization. Kendall Square (Cambridge) is the world's most biotech-dense square mile, and the B2B keyword competition in life sciences, clinical trials, and medtech rivals any US market. Boston's healthcare systems (Mass General, Brigham and Women's, Boston Children's) dominate consumer healthcare searches, making SME healthcare SEO a matter of hyper-specific specialty targeting. The financial district and professional services economy offer the most accessible high-ROI SEO opportunities for well-executed content campaigns.",
        "local_insight": "Boston's neighbourhood-level search dynamics are unusually complex: Cambridge carries 'MIT/Harvard adjacent' authority associations that make it distinct from Boston proper in search engines. Kendall Square searches carry strong B2B intent; Beacon Hill and Back Bay carry luxury consumer and legal intent; South End carries creative and hospitality intent. Boston's strong alumni network culture means content that authentically references local institutions, history, and community carries measurably higher engagement and shareability than generic content — translating into natural backlinks and local citation signals.",
        "competition": "Very high — biotech, healthcare, and finance are most competitive; institutional content authority is paramount",
    },
}

# ── Service definitions ────────────────────────────────────────────────────
SERVICES = {

    "seo-agency": {
        "title":          "SEO Agency {name}, {state} | Bambino",
        "meta_desc":      "Top-rated SEO agency in {name}, {state}. We help {name} businesses rank higher on Google, generate qualified leads, and outrank competitors. Free audit.",
        "h1":             "Top-Rated SEO Agency in {name}, {state} — Grow Your Business Faster",
        "hero_sub":       "{name} is {context}. Bambino's SEO specialists help {name} businesses rank higher on Google, generate consistent organic leads, and outperform competitors — without relying solely on paid ads.",
        "hero_cta1":      "Get a Free SEO Audit &rarr;",
        "hero_cta2":      "View US Pricing",
        "schema_desc":    "Top-rated SEO agency serving {name}, {state}. Specialists in organic growth, technical SEO, content marketing, and paid media for US businesses.",
        "og_title":       "SEO Agency {name} | Top-Rated Digital Marketing | Bambino",
        "og_desc":        "Top-rated SEO agency serving {name}, {state}. Proven results: 400+ clients, 97% retention, $25M+ revenue generated. Get a free SEO audit today.",
        "breadcrumb":     "SEO Agency {name}",
        "services_h2":    "SEO &amp; Digital Marketing Services in {name}",
        "services_sub":   "Every service your {name} business needs to dominate Google search — built on data, delivered by specialists.",
        "why_cards": [
            ("Data-Driven Strategy — No Guesswork", "Every keyword target, content decision, and link opportunity is validated with live search data before we invest a dollar of your budget. We show you the data; you approve the strategy."),
            ("AI Search Readiness Built In", "Google AI Overviews, ChatGPT, and Perplexity now answer millions of queries without sending a click. We optimize your {name} business for both traditional rankings and AI citation — so you capture traffic others miss."),
            ("E-E-A-T Content That Ranks and Converts", "Google's quality guidelines reward genuine expertise and experience. We build content that demonstrates your {name} business's real authority — not generic AI-generated filler that Google deprioritises."),
            ("Transparent Reporting — Monthly, No Surprises", "Custom Looker Studio dashboards updated monthly. Keyword rankings, organic traffic, lead volume, and conversion data — all in one place, all in US time zones, with a dedicated account manager you can actually reach."),
        ],
        "process_h2":     "Our {name} SEO Process",
        "process_sub":    "A proven five-step framework, refined across 400+ client campaigns in competitive markets like {name}.",
        "process_steps": [
            ("1", "SEO Audit", "Full technical, on-page, and backlink audit. We map every issue and opportunity before spending a dollar."),
            ("2", "Keyword Strategy", "Competitive keyword research targeting {name} search demand — by volume, intent, and commercial value."),
            ("3", "On-Page &amp; Technical", "Implement all technical fixes, optimize existing pages, and build the content architecture Google rewards."),
            ("4", "Authority Building", "Earn backlinks from relevant US publications, industry directories, and editorial sources in your sector."),
            ("5", "Report &amp; Scale", "Monthly performance reviews with clear KPIs. We identify what's working and double down on it."),
        ],
        "pricing_h2":     "Transparent SEO Pricing for {name} Businesses",
        "pricing_sub":    "All prices in USD. No setup fees. No long-term contracts. Month-to-month with 30 days' notice to cancel.",
        "plan_descs": {
            "starter":    "Ideal for small {name} businesses starting their first professional SEO campaign.",
            "growth":     "For {name} businesses ready to scale with a full multi-channel search strategy.",
            "scale":      "For ambitious {name} businesses scaling aggressively with AI-powered marketing.",
            "enterprise": "Bespoke engagements for larger {name} organizations with complex multi-channel needs.",
        },
        "cta_h2":         "Ready to Grow Your {name} Business with SEO?",
        "cta_sub":        "Book a free 30-minute audit call. We'll review your current SEO performance, identify the top growth opportunities in the {name} market, and recommend the right strategy for your budget.",
        "related_label":  "SEO Agency",
        "landscape_h2":   "The {name} SEO Landscape: What You're Up Against",
        "insight_h2":     "What Works in {name} — and What Doesn't",
        "cards": [
            ("https://bambinoagency.com/services/seo", "Core Service", "Search Engine Optimization", "Full-service SEO covering technical foundations, on-page optimization, content strategy, and authority building — engineered for {name}'s competitive search landscape."),
            ("https://bambinoagency.com/services/local-seo", "Local Search", "Local SEO &amp; Google Business", "Dominate Google Maps and \"{name} near me\" searches. GBP optimization, citation building, review strategy, and neighborhood-level content targeting."),
            ("https://bambinoagency.com/services/technical-seo", "Technical", "Technical SEO", "Core Web Vitals, site architecture, schema markup, page speed, and crawlability fixes — the technical foundations that determine whether Google ranks your {name} business."),
            ("https://bambinoagency.com/services/content-marketing", "Content", "Content Marketing", "US English content strategy, blog production, pillar pages, and topic clusters — built to rank on Google and get cited by ChatGPT, Perplexity, and Google AI Overviews."),
            ("https://bambinoagency.com/services/link-building", "Authority", "Link Building", "High-quality backlinks from US publications, industry blogs, and editorial sources. No PBNs, no spam — only placements that build lasting domain authority in {name}'s market."),
            ("https://bambinoagency.com/services/google-ads", "Paid Search", "Google Ads Management", "Search, Shopping, and Performance Max campaigns managed by Google-certified specialists. Full conversion tracking, monthly ROAS reporting, and no wasted ad spend."),
            ("https://bambinoagency.com/services/cro", "Conversion", "CRO &amp; A/B Testing", "Turn more of your existing {name} traffic into leads and revenue. Heatmap analysis, A/B testing, and landing page redesigns — without increasing ad spend."),
            ("https://bambinoagency.com/services/analytics", "Data", "Analytics &amp; GA4", "GA4 setup, GTM implementation, and custom Looker Studio dashboards so you know exactly which channels are driving {name} client revenue — and which are wasting budget."),
        ],
        "siblings": [
            {"slug": "digital-marketing-agency", "label": "Digital Marketing Agency", "desc": "Full-service digital marketing — SEO, Google Ads, social media, content, and email — all managed from a single strategy."},
            {"slug": "google-ads-agency",         "label": "Google Ads Agency",         "desc": "Managed Google Ads campaigns with full conversion tracking and monthly ROAS reporting. No wasted budget."},
        ],
        "faqs": [
            ("How much does SEO cost in {name}?", "SEO services in {name} typically range from $1,000–$5,500/month depending on competition level, target keywords, and scope. Our packages start at $1,000/month for foundational SEO and scale to $5,500/month for full-service campaigns. One-time technical audits start from $600."),
            ("How long does SEO take to work in {name}?", "Most {name} businesses see measurable ranking improvements within 90 days and meaningful traffic growth within 6 months. Highly competitive {name} keywords can take 9–12 months for page-one rankings. Local and long-tail terms typically rank faster — within 60–90 days."),
            ("Do you work with US businesses remotely?", "Yes. Our {name} clients work with dedicated account managers via video call. Strategy calls, reporting, and communication are scheduled around US time zones. We have deep experience with US search trends, Google Business Profile, American English content, and the competitive dynamics of {name}'s market."),
            ("What SEO services do you offer in {name}?", "Technical SEO audits, on-page optimization, local SEO and Google Business Profile management, content strategy and blog production, link building from authoritative US publications, Google Ads management, CRO, analytics setup, and monthly performance reporting. We cover the full search marketing stack."),
            ("What industries do you serve in {name}?", "We serve {name} businesses across {inds}. Our sector specialists develop keyword strategies tailored to your industry's search behavior, buyer intent, and competitive landscape in {name}."),
            ("What makes Bambino different from other {name} SEO agencies?", "Three things: transparent data (every decision backed by live keyword data), E-E-A-T content (Google rewards genuine expertise — we build content that demonstrates yours), and AI search readiness (we optimize for Google AI Overviews, ChatGPT, and Perplexity alongside traditional rankings)."),
            ("Is there a minimum contract term?", "No long-term contracts. All engagements are month-to-month with 30 days' notice to cancel. We're confident enough in our results that we don't need to lock clients in."),
            ("Do you offer a free SEO audit for {name} businesses?", "Yes. We offer a complimentary 30-minute SEO audit call. We'll review your current rankings, identify technical issues, and outline the top 3 quick-win opportunities — with no obligation to proceed."),
            ("How do you approach local SEO differently in {name}?", "Every {name} campaign starts with a market-specific keyword audit covering {name}'s actual search volumes, competitor authority profiles, and local intent patterns. We build neighbourhood-level content targeting, optimise Google Business Profile for {name}'s most relevant districts, and acquire citations from {name}-specific business directories."),
            ("Do you optimise {name} websites for AI search (ChatGPT, Perplexity, Google AI Overviews)?", "Yes — AI search readiness is built into every campaign. Google AI Overviews, ChatGPT, and Perplexity now answer millions of commercial queries without sending a click. We structure content, schema markup, and topical authority to ensure your {name} business gets cited in AI-generated answers — capturing visibility most competitors miss."),
            ("Can you help a {name} ecommerce business rank on Google Shopping?", "Yes. For {name} ecommerce businesses, we combine organic SEO with Google Shopping campaign management. We handle Merchant Center setup, product feed optimization, and Performance Max campaigns — tied together in a single reporting dashboard so you always know which channels are driving {name} revenue."),
            ("What reporting do {name} SEO clients receive?", "Monthly Looker Studio dashboards covering keyword rankings, organic traffic, conversion data, backlink growth, and Google Business Profile insights — all in US-friendly formats, segmented by {name} search geography. Growth and Scale plan clients receive bi-weekly or weekly strategy calls with a dedicated account manager."),
        ],
    },

    "digital-marketing-agency": {
        "title":          "Digital Marketing Agency {name}, {state} | Bambino",
        "meta_desc":      "Top-rated digital marketing agency in {name}, {state}. SEO, Google Ads, social media, content, and email — integrated strategy, transparent pricing, no contracts. Free audit.",
        "h1":             "Top-Rated Digital Marketing Agency in {name}, {state} — Grow Across Every Channel",
        "hero_sub":       "{name} is {context}. Bambino's digital marketing specialists help {name} businesses grow across every channel — from organic search and Google Ads to social media, content, and email — with a unified strategy that maximises every marketing dollar.",
        "hero_cta1":      "Get a Free Marketing Audit &rarr;",
        "hero_cta2":      "View US Pricing",
        "schema_desc":    "Top-rated digital marketing agency serving {name}, {state}. Full-service SEO, Google Ads, social media, content marketing, and email marketing for US businesses.",
        "og_title":       "Digital Marketing Agency {name} | Full-Service Growth | Bambino",
        "og_desc":        "Full-service digital marketing agency in {name}, {state}. SEO, paid ads, social, content, email — all channels, one strategy, transparent pricing. Get a free audit today.",
        "breadcrumb":     "Digital Marketing Agency {name}",
        "services_h2":    "Digital Marketing Services in {name}",
        "services_sub":   "Every digital marketing channel your {name} business needs to grow — managed by specialists, unified in a single strategy and one reporting dashboard.",
        "why_cards": [
            ("Full-Channel Integration — SEO + Paid Working Together", "We don't silo your channels. Google Ads keyword data informs your SEO content calendar. Organic rankings tell us where to shift paid budget. Every channel feeds every other — maximising ROI across your entire {name} marketing mix."),
            ("AI Search Readiness Across Every Channel", "Google AI Overviews, ChatGPT, and Perplexity are reshaping how {name} consumers discover businesses. We optimize your content and presence for AI citation alongside traditional search rankings and paid discovery — future-proofing your visibility."),
            ("One Dashboard — Every Channel", "Custom Looker Studio dashboards show SEO rankings, paid ad ROAS, social reach, email performance, and conversion data in one place. No spreadsheet-juggling, no conflicting reports — just clear, actionable data from all your {name} marketing channels."),
            ("Transparent Pricing — No Percentage-of-Spend", "Unlike most {name} digital marketing agencies, we charge flat management fees — not a percentage of your ad spend. Our incentives are aligned with your results, not with inflating your budget. All prices published upfront in USD."),
        ],
        "process_h2":     "Our {name} Digital Marketing Process",
        "process_sub":    "A proven five-step framework for full-channel digital growth — refined across 400+ client campaigns in competitive US markets like {name}.",
        "process_steps": [
            ("1", "Discovery &amp; Audit", "Full-channel audit: SEO technical health, paid ad account performance, social media presence, and content gaps. We map every opportunity before spending a dollar."),
            ("2", "Channel Strategy", "Prioritise channels by ROI potential for your {name} business. We build a 90-day roadmap with clear KPIs per channel and budget allocation recommendations."),
            ("3", "Campaign Setup", "Implement SEO foundations, launch paid campaigns with proper conversion tracking, set up social media publishing calendars, and deploy email automation flows."),
            ("4", "Launch &amp; Optimise", "Go live across all active channels simultaneously. Weekly optimisation cycles: adjust bids, refine targeting, A/B test ad copy, and expand SEO content based on early data."),
            ("5", "Report &amp; Scale", "Monthly Looker Studio reports covering every channel. Double down on what's working; cut or pivot what isn't. Scale budget into proven channels as ROI compounds."),
        ],
        "pricing_h2":     "Transparent Digital Marketing Pricing for {name} Businesses",
        "pricing_sub":    "All prices in USD. Flat management fees — no percentage of ad spend. No long-term contracts. Month-to-month with 30 days' notice to cancel.",
        "plan_descs": {
            "starter":    "Ideal for small {name} businesses starting their first professional digital marketing campaign — SEO foundations plus one paid channel.",
            "growth":     "For {name} businesses ready to scale with integrated SEO, Google Ads, and content production across multiple channels.",
            "scale":      "Full multi-channel digital marketing for ambitious {name} businesses — SEO, paid media, social, content, email, and CRO working together.",
            "enterprise": "Bespoke multi-channel digital marketing engagements for larger {name} organizations with complex growth requirements.",
        },
        "cta_h2":         "Ready to Grow Your {name} Business Across Every Channel?",
        "cta_sub":        "Book a free 30-minute digital marketing audit. We'll review your current channel mix, identify the biggest growth opportunities in the {name} market, and recommend the right strategy for your budget.",
        "related_label":  "Digital Marketing Agency",
        "landscape_h2":   "The {name} Digital Marketing Landscape",
        "insight_h2":     "Digital Marketing Insights for {name} Businesses",
        "cards": [
            ("https://bambinoagency.com/services/seo", "Organic Growth", "Search Engine Optimization", "Full-service SEO — technical, on-page, content, and authority building — that compounds month-on-month to reduce your {name} business's reliance on paid acquisition."),
            ("https://bambinoagency.com/services/google-ads", "Paid Search", "Google Ads &amp; PPC", "Search, Shopping, and Performance Max campaigns that generate {name} leads immediately while your organic strategy builds momentum. Google-certified management."),
            ("https://bambinoagency.com/services/social-media", "Social", "Social Media Marketing", "Meta, LinkedIn, Instagram, and X — organic content calendars and paid social campaigns targeting your exact {name} audience by interest, demographics, and behaviour."),
            ("https://bambinoagency.com/services/content-marketing", "Content", "Content Marketing &amp; Blog", "US English content strategy, pillar pages, blog production, and AI-ready articles — built to rank on Google and get cited in ChatGPT, Perplexity, and Google AI Overviews."),
            ("https://bambinoagency.com/services/email-marketing", "Email", "Email Marketing &amp; Automation", "Segmented email campaigns, nurture sequences, and automation flows that convert {name} leads into customers — and keep existing customers coming back."),
            ("https://bambinoagency.com/services/cro", "Conversion", "CRO &amp; Landing Pages", "Turn more of your {name} traffic into revenue with heatmap analysis, A/B testing, and landing page redesigns — across both organic and paid channels."),
            ("https://bambinoagency.com/services/analytics", "Data", "Analytics &amp; GA4 Setup", "Unified Looker Studio dashboards connecting SEO, paid, social, and email data. Know exactly which {name} marketing channels are driving revenue — and which are wasting budget."),
            ("https://bambinoagency.com/services/link-building", "Authority", "Link Building &amp; PR", "Digital PR and editorial link acquisition from US publications — building the domain authority that amplifies every other marketing channel you run in {name}."),
        ],
        "siblings": [
            {"slug": "seo-agency",           "label": "SEO Agency",           "desc": "Dedicated organic search strategy — technical SEO, content, and link building to rank your {name} business on page one of Google."},
            {"slug": "google-ads-agency",    "label": "Google Ads Agency",    "desc": "Managed Google Ads campaigns with full conversion tracking and monthly ROAS reporting — no wasted budget, no percentage-of-spend fees."},
        ],
        "faqs": [
            ("How much does digital marketing cost in {name}?", "Digital marketing in {name} typically ranges from $1,000–$5,500/month management fee depending on which channels you prioritise and the scope of management. A Starter package at $1,000/month covers SEO foundations and one paid channel. Our Growth package at $2,500/month includes SEO, Google Ads, and content production. For full multi-channel campaigns including social media and email, the Scale package at $5,500/month delivers the best results. All prices in USD — no percentage-of-spend fees."),
            ("What is included in a full-service digital marketing package for {name} businesses?", "A Bambino full-service digital marketing retainer covers: SEO (technical, on-page, content), Google Ads management, social media marketing, content production, email marketing, conversion rate optimisation, and monthly analytics reporting — all tied together in a single strategy and a unified Looker Studio dashboard."),
            ("How long does it take to see results from digital marketing in {name}?", "Paid channels (Google Ads, social media) typically generate results within 2–4 weeks of launch. Organic channels (SEO, content) take 3–6 months for meaningful traffic growth. A full-service approach combines both: paid ads deliver immediate {name} leads while SEO compounds over time, reducing your cost-per-lead month on month."),
            ("Should my {name} business invest in SEO or paid ads first?", "For most {name} businesses, the answer is both — but at different scales depending on your current revenue stage. If you need leads immediately, start with Google Ads while building SEO simultaneously. If you have 6+ months of runway, prioritise SEO for compounding organic traffic. Our recommended split: 60% SEO, 40% paid in months 1–6, then scale SEO as it builds momentum."),
            ("Do you manage social media for {name} businesses?", "Yes. Our social media management for {name} businesses covers Meta (Facebook and Instagram), LinkedIn, and X — including content creation, scheduling, community management, and paid social advertising. Social media management is available standalone or as part of an integrated digital marketing retainer."),
            ("What digital marketing channels do you manage for {name} businesses?", "We manage the full digital marketing stack: Google Search and Shopping Ads, Meta Ads, LinkedIn Ads, SEO, content marketing, email marketing, YouTube Ads, and programmatic display. Most {name} clients start with 2–3 high-priority channels and expand as ROI is proven."),
            ("Do you offer integrated SEO + Google Ads campaigns for {name} businesses?", "Yes — and integration is where the real leverage is. We use Google Ads keyword data to inform SEO content strategy, run paid ads to test which pages convert before investing in SEO, and use organic ranking data to identify where paid ads should fill gaps. Your {name} business gets both channels working together, not in silos."),
            ("What industries do you serve in {name}?", "We serve {name} businesses across {inds}. Each industry has distinct search behavior, ad performance benchmarks, and content formats — our sector specialists bring that knowledge to every {name} campaign."),
            ("What makes Bambino different from other {name} digital marketing agencies?", "Three things: full-stack integration (SEO and paid working together from day one), AI search readiness (we optimize for Google AI Overviews and ChatGPT citation alongside traditional channels), and flat-fee pricing (no percentage of ad spend — our incentives align with your ROI, not your budget size)."),
            ("Do you offer a free digital marketing audit for {name} businesses?", "Yes. We offer a complimentary 30-minute digital marketing audit for {name} businesses. We'll review your current channel performance, identify the biggest growth opportunities, and recommend the right channel mix for your budget — no obligation to proceed."),
            ("Is there a minimum contract term for digital marketing?", "No long-term contracts. All Bambino digital marketing retainers are month-to-month with 30 days' notice to cancel. We're confident enough in our results that we don't need to lock clients in."),
            ("How do you report on digital marketing results across multiple channels?", "Monthly Looker Studio dashboards show performance across all active channels: keyword rankings, organic traffic, paid ad ROAS, social media reach and engagement, and email open and click rates — every metric benchmarked against your {name} business goals. Growth and Scale clients receive bi-weekly strategy calls in addition to monthly reports."),
        ],
    },

    "google-ads-agency": {
        "title":          "Google Ads Agency {name}, {state} | Bambino",
        "meta_desc":      "Top-rated Google Ads agency in {name}, {state}. Managed PPC, Shopping, and Performance Max campaigns. Full conversion tracking, transparent ROAS reporting. Free audit.",
        "h1":             "Google Ads Agency in {name}, {state} — Managed PPC That Delivers ROI",
        "hero_sub":       "{name} is {context}. Bambino's Google Ads specialists help {name} businesses capture high-intent search demand, generate qualified leads, and achieve measurable return on ad spend — without wasted budget or guesswork.",
        "hero_cta1":      "Get a Free Google Ads Audit &rarr;",
        "hero_cta2":      "View US Pricing",
        "schema_desc":    "Top-rated Google Ads agency serving {name}, {state}. Specialists in Google Search, Shopping, Performance Max, Display, and YouTube campaigns for US businesses.",
        "og_title":       "Google Ads Agency {name} | Managed PPC &amp; Paid Search | Bambino",
        "og_desc":        "Google Ads management in {name}, {state}. Search, Shopping, Performance Max — full conversion tracking, monthly ROAS reporting, no wasted budget. Get a free audit.",
        "breadcrumb":     "Google Ads Agency {name}",
        "services_h2":    "Google Ads &amp; PPC Management Services in {name}",
        "services_sub":   "The full Google Ads stack — from Search to Shopping to Performance Max — managed by certified specialists who track every dollar to a {name} lead or sale.",
        "why_cards": [
            ("No Percentage-of-Spend Fees — Aligned Incentives", "Most {name} Google Ads agencies charge 10–20% of your ad spend. We charge flat management fees. That means our incentives align with your ROI — not with inflating your budget. You keep more of what your campaigns earn."),
            ("Conversion Tracking First — Always", "We set up and verify conversion tracking via Google Tag Manager before any {name} campaign goes live. Form fills, phone calls, ecommerce transactions, and custom events — all tracked, all attributed, all reported in plain USD."),
            ("Google Ads + SEO Integration", "Google Ads keyword data reveals which terms convert — we use that data to prioritise your {name} SEO content calendar. As organic rankings improve over 6–12 months, you can reduce paid spend on those terms and shift budget to new targets."),
            ("Transparent ROAS Reporting — Monthly", "Custom Looker Studio dashboards showing impressions, clicks, conversions, CPL, ROAS, and Quality Scores — segmented by campaign, ad group, and keyword. No vanity metrics. No hiding behind click-through rates. Just {name} revenue data."),
        ],
        "process_h2":     "Our {name} Google Ads Process",
        "process_sub":    "A rigorous five-step Google Ads management framework — refined across 400+ paid search campaigns in competitive US markets like {name}.",
        "process_steps": [
            ("1", "Account Audit", "Full audit of your existing Google Ads account (or from-scratch architecture if new). Identify wasted spend, Quality Score issues, keyword cannibalization, and bidding inefficiencies."),
            ("2", "Campaign Architecture", "Build or restructure campaign structure by intent and funnel stage — branded vs. non-branded, high-intent vs. top-of-funnel — tailored to {name}'s competitive search landscape."),
            ("3", "Ad Copy &amp; Creative", "Write and A/B test responsive search ads, display creatives, and YouTube scripts. Ad copy benchmarked against {name} competitor messaging and landing page CRO principles."),
            ("4", "Bid &amp; Budget Management", "Weekly bid management using target CPA or ROAS strategies. Budget shifted in real-time toward top-performing campaigns. Negative keyword lists updated weekly to eliminate wasted spend."),
            ("5", "Report &amp; Optimise", "Monthly Looker Studio ROAS reports. Quarterly strategy reviews to reassess channel mix, introduce new ad types, and expand into new {name} audience segments."),
        ],
        "pricing_h2":     "Transparent Google Ads Management Pricing for {name} Businesses",
        "pricing_sub":    "All prices in USD. Flat management fees — no percentage of ad spend. No long-term contracts. Month-to-month with 30 days' notice to cancel.",
        "plan_descs": {
            "starter":    "Ideal for small {name} businesses launching their first Google Search campaign. Up to 2 active campaigns, full conversion tracking, and monthly ROAS reporting.",
            "growth":     "For {name} businesses scaling paid search across multiple campaigns — Search, Shopping, and Display — with bi-weekly optimisation and strategy calls.",
            "scale":      "Full Google Ads stack for ambitious {name} businesses: Performance Max, Shopping, Search, Display, Remarketing, and YouTube, with advanced attribution.",
            "enterprise": "Bespoke Google Ads management for larger {name} advertisers with complex multi-account, multi-brand, or international campaign requirements.",
        },
        "cta_h2":         "Ready to Get More {name} Leads from Google Ads?",
        "cta_sub":        "Book a free 30-minute Google Ads audit call. We'll review your current campaign performance, identify the top 3 quick wins, and show you exactly what a well-managed account looks like — with no obligation to proceed.",
        "related_label":  "Google Ads Agency",
        "landscape_h2":   "Google Ads Competition in {name}: What You're Bidding Against",
        "insight_h2":     "Paid Search Strategy for {name}: Local Market Intelligence",
        "cards": [
            ("https://bambinoagency.com/services/google-ads", "Core Service", "Google Search Ads", "Responsive search ads targeting high-intent {name} keywords — structured by campaign, ad group, and match type to maximise Quality Score, lower CPC, and drive qualified conversions."),
            ("https://bambinoagency.com/services/google-ads", "Shopping", "Google Shopping &amp; Performance Max", "Product feed optimisation, Merchant Center setup, and Performance Max strategy for {name} ecommerce businesses. Full ROAS tracking from ad click to purchase."),
            ("https://bambinoagency.com/services/google-ads", "Display", "Display &amp; Remarketing", "Banner and responsive display campaigns targeting {name} in-market audiences and remarketing to past site visitors across the Google Display Network."),
            ("https://bambinoagency.com/services/google-ads", "Video", "YouTube Ads", "In-stream, bumper, and discovery YouTube ad campaigns for {name} businesses building brand awareness alongside bottom-of-funnel Search conversion campaigns."),
            ("https://bambinoagency.com/services/analytics", "Tracking", "Conversion Tracking &amp; GA4", "GTM setup, GA4 configuration, and cross-channel attribution — so every {name} lead, call, and purchase is correctly attributed to the keyword and campaign that generated it."),
            ("https://bambinoagency.com/services/cro", "CRO", "Landing Page Optimisation", "CRO audits and A/B tests on the landing pages your {name} Google Ads traffic hits. Higher conversion rates mean lower effective CPL — without increasing ad spend."),
            ("https://bambinoagency.com/services/analytics", "Reporting", "ROAS Dashboards &amp; Analytics", "Monthly Looker Studio ROAS dashboards showing cost, clicks, conversions, CPL, and ROAS per campaign — in USD, in US time zones, for your {name} business."),
            ("https://bambinoagency.com/services/seo", "Organic", "SEO Integration", "Use your Google Ads conversion data to inform your {name} SEO content calendar — reducing long-term paid spend as organic rankings capture high-intent keywords organically."),
        ],
        "siblings": [
            {"slug": "seo-agency",                  "label": "SEO Agency",                  "desc": "Organic search that compounds over time — reduce your {name} business's reliance on paid ads with long-term Google rankings."},
            {"slug": "digital-marketing-agency",    "label": "Digital Marketing Agency",    "desc": "Full-service digital marketing — SEO, Google Ads, social media, content, and email — unified in a single {name} growth strategy."},
        ],
        "faqs": [
            ("How much does Google Ads management cost in {name}?", "Bambino charges $1,000–$5,500/month management fee for Google Ads in {name}, depending on campaign complexity. This is separate from your ad spend budget. Most {name} small businesses start with a $1,000–$2,000/month management fee and $500–$2,000/month ad spend. We charge flat management fees — not a percentage of ad spend."),
            ("What is a realistic ROAS for Google Ads in {name}?", "ROAS benchmarks vary by industry. In {name}, ecommerce businesses typically target 3–6x ROAS; service businesses measure cost-per-lead ($30–$150 depending on vertical); B2B campaigns often justify a 2–3x ROAS on high-value contracts. We set ROAS targets in month one based on your specific margins and sales cycle — not generic benchmarks."),
            ("How quickly can Google Ads generate leads for my {name} business?", "Most {name} businesses see their first Google Ads conversions within 2–3 weeks of campaign launch, assuming landing pages are conversion-optimised. Full performance optimization typically takes 60–90 days as Google's algorithm learns from your conversion data. We set 90-day milestones and review at each — not declare success at week one."),
            ("Do you manage Google Shopping and Performance Max campaigns in {name}?", "Yes. We manage the full Google Ads suite: Search, Shopping, Performance Max, Display, Remarketing, and YouTube. For {name} ecommerce businesses, we handle Merchant Center setup, product feed optimization, and Performance Max strategy — and integrate with your CRM or Shopify data for accurate ROAS tracking."),
            ("What ad types do you run for {name} businesses?", "We run Google Search Ads (responsive search), Google Shopping (standard and Performance Max), Display and Remarketing (banner, responsive), YouTube (in-stream, bumper), and Local Service Ads where applicable. The right mix depends on your industry, budget, and whether you're targeting top-of-funnel awareness or bottom-of-funnel conversions in {name}."),
            ("How do you handle conversion tracking for {name} Google Ads campaigns?", "We set up conversion tracking via Google Tag Manager before any campaign goes live — including form submissions, phone calls, ecommerce transactions, and custom events. We verify tracking with test conversions, then connect Google Ads to GA4 for cross-channel attribution. You'll know exactly which keywords and campaigns are driving {name} revenue — not just clicks."),
            ("Can you take over an existing Google Ads account for my {name} business?", "Yes — account takeovers are common. Our first step is a comprehensive audit of your existing campaigns: wasted spend, keyword cannibalization, Quality Score issues, and bidding inefficiencies. Most inherited accounts have 20–40% of budget going to low-intent keywords. We fix the foundations before optimizing for growth."),
            ("Do you manage Google Ads for ecommerce businesses in {name}?", "Yes. For {name} ecommerce businesses, we combine Performance Max, Standard Shopping, and Search campaigns with dynamic remarketing. We optimise product titles and descriptions in the Merchant Center feed, segment campaigns by margin tier, and build separate RLSA strategies for past site visitors."),
            ("What reporting do {name} Google Ads clients receive?", "Monthly Looker Studio dashboards showing impressions, clicks, conversions, cost per conversion, ROAS, and Quality Scores — segmented by campaign, ad group, and keyword. All reporting delivered in USD, US time zone format. Growth and Scale clients also receive bi-weekly performance calls."),
            ("Is there a minimum ad spend requirement for {name} campaigns?", "We recommend a minimum ad spend of $500/month for Search campaigns and $1,000/month for Shopping or Performance Max campaigns in {name} to generate statistically meaningful conversion data. Below these thresholds, Google's learning algorithms struggle to optimise effectively. We won't launch campaigns where the budget is too low to produce results."),
            ("Do you also offer SEO alongside Google Ads for {name} businesses?", "Yes, and we recommend running both together. Google Ads conversion data reveals which keywords drive revenue — we use that data to prioritise your {name} SEO content calendar. As organic rankings improve over 6–12 months, you can reduce paid spend on those terms and shift budget to new targets, lowering your long-term cost-per-lead."),
            ("Is there a minimum contract term for Google Ads management?", "No long-term contracts. All Google Ads management retainers are month-to-month with 30 days' notice to cancel. Our client retention rate is 97% because our results keep clients — not our contract terms."),
        ],
    },
}

# ── Helper functions ───────────────────────────────────────────────────────
def _cards_html(cards, name):
    rows = []
    for href, lbl, h3, p in cards:
        rows.append(
            f'        <a href="{href}" class="svc-card reveal">\n'
            f'          <span class="svc-lbl">{lbl}</span>\n'
            f'          <h3>{h3}</h3>\n'
            f'          <p>{p.format(name=name)}</p>\n'
            f'        </a>'
        )
    return "\n".join(rows)

def _why_html(why_cards, name):
    rows = []
    for h3, p in why_cards:
        rows.append(
            f'        <div class="why-card reveal">\n'
            f'          <h3>{h3}</h3>\n'
            f'          <p>{p.format(name=name)}</p>\n'
            f'        </div>'
        )
    return "\n".join(rows)

def _steps_html(steps):
    rows = []
    for num, h4, p in steps:
        rows.append(
            f'        <div class="step reveal">\n'
            f'          <div class="step-num">{num}</div>\n'
            f'          <h4>{h4}</h4>\n'
            f'          <p>{p}</p>\n'
            f'        </div>'
        )
    return "\n".join(rows)

_ICON = ('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
         'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
         '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>')
_CHK  = ('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
         'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
         '<polyline points="20 6 9 17 4 12"/></svg>')

def _faq_html(faqs, name, inds):
    rows = []
    for q, a in faqs:
        qf = q.format(name=name, inds=inds)
        af = a.format(name=name, inds=inds)
        rows.append(
            f'        <div class="faq-item">\n'
            f'          <button class="faq-q" aria-expanded="false">{qf}{_ICON}</button>\n'
            f'          <div class="faq-ans"><p>{af}</p></div>\n'
            f'        </div>'
        )
    return "\n".join(rows)

def _schema_faqs(faqs, name, inds):
    items = []
    for q, a in faqs:
        qf = q.format(name=name, inds=inds).replace('"', '\\"')
        af = a.format(name=name, inds=inds).replace('"', '\\"')
        items.append(
            f'          {{\n'
            f'            "@type": "Question",\n'
            f'            "name": "{qf}",\n'
            f'            "acceptedAnswer": {{"@type": "Answer", "text": "{af}"}}\n'
            f'          }}'
        )
    return ",\n".join(items)

def _sibling_html(slug, siblings):
    rows = []
    for s in siblings:
        rows.append(
            f'        <a href="https://bambinoagency.com/us/{slug}/{s["slug"]}" class="svc-card reveal">\n'
            f'          <span class="svc-lbl">Also Available</span>\n'
            f'          <h3>{s["label"]}</h3>\n'
            f'          <p>{s["desc"]}</p>\n'
            f'        </a>'
        )
    return "\n".join(rows)

# ── Page builder ───────────────────────────────────────────────────────────
def build_page(slug, city, svc_key):
    svc  = SERVICES[svc_key]
    nm   = city["name"]
    st   = city["state"]
    stf  = city["state_full"]
    ctx  = city["context"]
    inds = city["industries"]
    nbhd = city["neighborhoods"]
    eeat = city["eeat_stat"]
    lnd  = city.get("landscape", "")
    ins  = city.get("local_insight", "")
    comp = city.get("competition", "")
    inds_str = ", ".join(inds)

    title   = svc["title"].format(name=nm, state=st)
    meta    = svc["meta_desc"].format(name=nm, state=st)
    h1      = svc["h1"].format(name=nm, state=st)
    hero_s  = svc["hero_sub"].format(name=nm, state=st, context=ctx)
    s_desc  = svc["schema_desc"].format(name=nm, state=st)
    og_t    = svc["og_title"].format(name=nm, state=st)
    og_d    = svc["og_desc"].format(name=nm, state=st)
    bc_lbl  = svc["breadcrumb"].format(name=nm)
    svc_h2  = svc["services_h2"].format(name=nm)
    svc_sub = svc["services_sub"].format(name=nm)
    why_h2_sub = ""
    pro_h2  = svc["process_h2"].format(name=nm)
    pro_sub = svc["process_sub"].format(name=nm)
    pri_h2  = svc["pricing_h2"].format(name=nm)
    cta_h   = svc["cta_h2"].format(name=nm)
    cta_s   = svc["cta_sub"].format(name=nm)
    rl      = svc["related_label"]
    lnd_h2  = svc["landscape_h2"].format(name=nm)
    ins_h2  = svc["insight_h2"].format(name=nm)
    p_d     = {k: v.format(name=nm) for k, v in svc["plan_descs"].items()}

    stats_h  = "\n".join(
        f'          <div class="insight-card"><span class="ins-num">{s["num"]}</span><span class="ins-lbl">{s["label"]}</span></div>'
        for s in city["stats"]
    )
    pills_h  = "\n".join(f'          <span class="ind-pill">{i}</span>' for i in inds)
    cards_h  = _cards_html(svc["cards"], nm)
    why_h    = _why_html(svc["why_cards"], nm)
    steps_h  = _steps_html(svc["process_steps"])
    faq_h    = _faq_html(svc["faqs"], nm, inds_str)
    scm_fqs  = _schema_faqs(svc["faqs"], nm, inds_str)
    sibs_h   = _sibling_html(slug, svc["siblings"])
    rel_h    = "\n".join(
        f'            <li><a href="https://bambinoagency.com/us/{rc}/{svc_key}" class="related-card reveal">{rn} {rl} &rarr;</a></li>'
        for rc, rn in zip(city["related_cities"], city["related_names"])
    )

    return f"""<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="description" content="{meta}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://bambinoagency.com/us/{slug}/{svc_key}" />
  <link rel="alternate" hreflang="en-US" href="https://bambinoagency.com/us/{slug}/{svc_key}" />
  <link rel="alternate" hreflang="en-GB" href="https://bambinoagency.com/local/manchester/seo-agency" />
  <link rel="alternate" hreflang="x-default" href="https://bambinoagency.com/local/manchester/seo-agency" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{og_t}" />
  <meta property="og:description" content="{og_d}" />
  <meta property="og:url" content="https://bambinoagency.com/us/{slug}/{svc_key}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content="https://bambinoagency.com/img/og-default.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@graph": [
      {{
        "@type": ["LocalBusiness", "MarketingAgency"],
        "name": "Bambino",
        "url": "https://bambinoagency.com",
        "logo": "https://bambinoagency.com/img/og-default.jpg",
        "description": "{s_desc}",
        "address": {{"@type": "PostalAddress", "addressLocality": "Manchester", "addressCountry": "GB"}},
        "areaServed": {{"@type": "City", "name": "{nm}", "containedInPlace": {{"@type": "State", "name": "{stf}"}}}},
        "telephone": "+44-161-000-0000",
        "priceRange": "$$$",
        "aggregateRating": {{"@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5"}},
        "datePublished": "2026-04-19",
        "dateModified": "2026-04-19"
      }},
      {{
        "@type": "BreadcrumbList",
        "itemListElement": [
          {{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://bambinoagency.com/"}},
          {{"@type": "ListItem", "position": 2, "name": "US", "item": "https://bambinoagency.com/us"}},
          {{"@type": "ListItem", "position": 3, "name": "{bc_lbl}", "item": "https://bambinoagency.com/us/{slug}/{svc_key}"}}
        ]
      }},
      {{
        "@type": "FAQPage",
        "mainEntity": [
{scm_fqs}
        ]
      }}
    ]
  }}
  </script>

  <style>
    :root {{
      --bg:#F9F9F5;--orange:#FF4D00;--orange-light:#FF6B2B;
      --green:#034C3C;--green-light:#056650;--text:#1A1A1A;--muted:#666660;
      --card:#FFFFFF;--soft:#F2F2EC;--border:#E8E8E0;
      --font-heading:'Berkshire Swash',serif;--font-body:'Inter',sans-serif;
      --radius:16px;--shadow:0 4px 24px rgba(0,0,0,0.07);--shadow-lg:0 12px 48px rgba(0,0,0,0.12);
      --transition:0.25s cubic-bezier(0.4,0,0.2,1);
    }}
    *,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
    html{{scroll-behavior:smooth}}
    body{{font-family:var(--font-body);background:var(--bg);color:var(--text);overflow-x:hidden;line-height:1.6}}
    a{{text-decoration:none;color:inherit}}
    ul{{list-style:none}}
    .container{{width:min(1200px,100% - 3rem);margin-inline:auto}}
    .section-label{{display:inline-block;font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--orange);background:rgba(255,77,0,0.08);padding:0.35rem 0.9rem;border-radius:100px;margin-bottom:1.2rem}}
    .section-title{{font-family:var(--font-heading);font-size:clamp(1.8rem,3.5vw,2.6rem);color:var(--text);line-height:1.15;margin-bottom:1rem}}
    .section-sub{{font-size:1rem;color:var(--muted);max-width:58ch;line-height:1.75}}
    .btn-orange{{display:inline-flex;align-items:center;gap:0.5rem;background:var(--orange);color:#fff;font-family:var(--font-body);font-weight:700;font-size:0.95rem;padding:0.85rem 2rem;border-radius:100px;border:none;cursor:pointer;transition:var(--transition)}}
    .btn-orange:hover{{background:var(--orange-light);transform:translateY(-2px)}}
    .btn-outline{{display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:var(--text);font-family:var(--font-body);font-weight:600;font-size:0.9rem;padding:0.8rem 1.8rem;border-radius:100px;border:2px solid var(--border);cursor:pointer;transition:var(--transition)}}
    .btn-outline:hover{{border-color:var(--orange);color:var(--orange)}}
    #navbar{{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--bg);padding:1.1rem 0;transition:border-bottom 0.3s,box-shadow 0.3s}}
    #navbar.scrolled{{border-bottom:1px solid var(--green);box-shadow:0 2px 20px rgba(3,76,60,0.08)}}
    .nav-inner{{display:flex;align-items:center;justify-content:space-between}}
    .nav-logo{{font-family:var(--font-heading);font-size:1.8rem;color:var(--green)}}
    .nav-links{{display:flex;align-items:center;gap:2.2rem}}
    .nav-links a{{font-size:0.9rem;font-weight:500;color:var(--text);transition:color var(--transition);position:relative}}
    .nav-links a::after{{content:'';position:absolute;bottom:-3px;left:0;width:0;height:2px;background:var(--orange);transition:width var(--transition)}}
    .nav-links a:hover{{color:var(--orange)}}
    .nav-links a:hover::after{{width:100%}}
    .nav-cta{{background:var(--orange);color:#fff !important;font-weight:700 !important;font-size:0.88rem !important;padding:0.6rem 1.4rem;border-radius:100px}}
    .nav-cta:hover{{background:var(--orange-light)}}
    .nav-cta::after{{display:none !important}}
    .nav-hamburger{{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}}
    .nav-hamburger span{{display:block;width:24px;height:2px;background:var(--text);border-radius:2px}}
    .mobile-menu{{display:none;position:fixed;inset:0;background:var(--bg);z-index:999;flex-direction:column;align-items:center;justify-content:center;gap:2rem}}
    .mobile-menu.open{{display:flex}}
    .mobile-menu a{{font-family:var(--font-heading);font-size:2rem;color:var(--text);transition:color var(--transition)}}
    .mobile-menu a:hover{{color:var(--orange)}}
    .mobile-close{{position:absolute;top:1.5rem;right:1.5rem;font-size:1.8rem;cursor:pointer;background:none;border:none;color:var(--text)}}
    #hero{{min-height:50vh;display:flex;align-items:center;padding-top:5rem;background:var(--soft);position:relative;overflow:hidden}}
    .hero-blob{{position:absolute;bottom:-10%;right:-8%;width:450px;height:450px;background:var(--orange);opacity:0.06;border-radius:60% 40% 55% 45%/50% 60% 40% 50%;pointer-events:none}}
    .hero-content{{padding:4rem 0;position:relative;z-index:2;max-width:780px}}
    .breadcrumb{{display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;color:var(--muted);margin-bottom:1.5rem;flex-wrap:wrap}}
    .breadcrumb a{{color:var(--muted);transition:color var(--transition)}}
    .breadcrumb a:hover{{color:var(--orange)}}
    .hero-label{{font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--orange);display:flex;align-items:center;gap:0.6rem;margin-bottom:1.2rem}}
    .hero-label::before{{content:'';display:block;width:28px;height:2px;background:var(--orange);border-radius:2px}}
    .hero-h1{{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.4rem);line-height:1.08;color:var(--text);margin-bottom:1.2rem}}
    .hero-sub{{font-size:1.05rem;color:var(--muted);max-width:60ch;line-height:1.75;margin-bottom:2rem}}
    .hero-actions{{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2.5rem}}
    .hero-stats{{display:flex;gap:2.5rem;flex-wrap:wrap;padding-top:2rem;border-top:1px solid var(--border)}}
    .hero-stat .num{{font-family:var(--font-heading);font-size:1.8rem;color:var(--orange);display:block}}
    .hero-stat .lbl{{font-size:0.78rem;color:var(--muted)}}
    #proof{{background:var(--green);padding:1.2rem 0}}
    .proof-inner{{display:flex;align-items:center;justify-content:center;gap:3rem;flex-wrap:wrap}}
    .proof-item{{display:flex;align-items:center;gap:0.6rem;color:rgba(255,255,255,0.85);font-size:0.88rem;font-weight:600}}
    .proof-item svg{{color:var(--orange)}}
    #market{{padding:5rem 0;background:var(--bg)}}
    .market-grid{{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}}
    .insight-cards{{display:grid;grid-template-columns:1fr 1fr;gap:1rem}}
    .insight-card{{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.4rem;text-align:center;box-shadow:var(--shadow)}}
    .ins-num{{font-family:var(--font-heading);font-size:2rem;color:var(--orange);display:block}}
    .ins-lbl{{font-size:0.8rem;color:var(--muted);margin-top:0.25rem;display:block}}
    .eeat-box{{background:rgba(255,77,0,0.06);border-left:4px solid var(--orange);border-radius:0 12px 12px 0;padding:1.4rem 1.6rem;margin-top:1.5rem}}
    .eeat-box p{{font-size:0.9rem;color:var(--text);line-height:1.7}}
    #services{{padding:5rem 0;background:var(--soft)}}
    .svc-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.2rem;margin-top:2.5rem}}
    .svc-card{{background:var(--card);border:1.5px solid var(--border);border-radius:var(--radius);padding:1.6rem;transition:var(--transition);display:block}}
    .svc-card:hover{{border-color:var(--orange);box-shadow:var(--shadow-lg);transform:translateY(-3px)}}
    .svc-card h3{{font-family:var(--font-heading);font-size:1.05rem;color:var(--text);margin-bottom:0.5rem}}
    .svc-card p{{font-size:0.85rem;color:var(--muted);line-height:1.65}}
    .svc-lbl{{font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem;display:block}}
    #why{{padding:5rem 0;background:var(--bg)}}
    .why-grid{{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:2.5rem}}
    .why-card{{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);border-top:3px solid var(--orange)}}
    .why-card h3{{font-family:var(--font-heading);font-size:1.1rem;margin-bottom:0.6rem;color:var(--text)}}
    .why-card p{{font-size:0.88rem;color:var(--muted);line-height:1.7}}
    #process{{padding:5rem 0;background:var(--soft)}}
    .process-steps{{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-top:2.5rem}}
    .step{{text-align:center;padding:1.5rem 1rem}}
    .step-num{{width:48px;height:48px;background:var(--orange);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:1.2rem;margin:0 auto 1rem}}
    .step h4{{font-size:0.9rem;font-weight:700;color:var(--text);margin-bottom:0.4rem}}
    .step p{{font-size:0.8rem;color:var(--muted);line-height:1.6}}
    #results{{padding:5rem 0;background:var(--bg)}}
    .results-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}}
    .result-card{{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow)}}
    .result-stat{{font-family:var(--font-heading);font-size:2.2rem;color:var(--orange);display:block;margin-bottom:0.3rem}}
    .result-desc{{font-size:0.88rem;color:var(--text);font-weight:600;margin-bottom:0.4rem}}
    .result-detail{{font-size:0.82rem;color:var(--muted);line-height:1.6}}
    #industries{{padding:5rem 0;background:var(--soft)}}
    .ind-pills{{display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:2rem}}
    .ind-pill{{background:var(--card);border:1.5px solid var(--border);border-radius:100px;padding:0.55rem 1.2rem;font-size:0.85rem;font-weight:600;color:var(--text);transition:var(--transition);cursor:default}}
    .ind-pill:hover{{border-color:var(--orange);color:var(--orange)}}
    #pricing{{padding:5rem 0;background:var(--bg)}}
    .pricing-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;margin-top:2.5rem;align-items:start}}
    .price-card{{background:var(--card);border-radius:var(--radius);padding:1.8rem;box-shadow:var(--shadow);border:2px solid transparent;position:relative}}
    .price-card.featured{{border-color:var(--orange)}}
    .price-card.featured::before{{content:'Most Popular';position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--orange);color:#fff;font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:0.25rem 0.9rem;border-radius:100px;white-space:nowrap}}
    .plan-name{{font-family:var(--font-heading);font-size:1.2rem;margin-bottom:0.4rem}}
    .plan-price{{font-family:var(--font-heading);font-size:2.4rem;color:var(--orange);line-height:1}}
    .plan-price sup{{font-size:1.2rem;vertical-align:super}}
    .plan-period{{font-size:0.8rem;color:var(--muted);margin-bottom:0.8rem}}
    .plan-desc{{font-size:0.82rem;color:var(--muted);line-height:1.6;margin-bottom:1.2rem;padding-bottom:1.2rem;border-bottom:1px solid var(--border)}}
    .plan-features{{display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1.5rem}}
    .plan-feature{{font-size:0.82rem;color:var(--text);display:flex;align-items:flex-start;gap:0.5rem}}
    .plan-feature svg{{flex-shrink:0;margin-top:2px;color:var(--orange)}}
    #other-services{{padding:4rem 0;background:var(--soft)}}
    #faq{{padding:5rem 0;background:var(--bg)}}
    .faq-list{{max-width:760px;margin:2.5rem auto 0;display:flex;flex-direction:column;gap:0.8rem}}
    .faq-item{{background:var(--card);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}}
    .faq-q{{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1.2rem 1.6rem;background:none;border:none;cursor:pointer;font-family:var(--font-body);font-size:0.95rem;font-weight:600;color:var(--text);text-align:left;transition:color var(--transition)}}
    .faq-q:hover{{color:var(--orange)}}
    .faq-q svg{{flex-shrink:0;transition:transform var(--transition)}}
    .faq-item.open .faq-q svg{{transform:rotate(45deg)}}
    .faq-ans{{max-height:0;overflow:hidden;transition:max-height 0.4s ease}}
    .faq-item.open .faq-ans{{max-height:400px}}
    .faq-ans p{{padding:0 1.6rem 1.2rem;font-size:0.9rem;color:var(--muted);line-height:1.75}}
    #related{{padding:4rem 0;background:var(--soft)}}
    .related-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-top:2rem}}
    .related-card{{background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:1.2rem 1.4rem;transition:var(--transition);font-weight:600;font-size:0.9rem;display:block}}
    .related-card:hover{{border-color:var(--orange);color:var(--orange)}}
    #landscape{{padding:5rem 0;background:var(--soft)}}
    #cta{{background:var(--green);padding:5rem 0;position:relative;overflow:hidden}}
    #cta::before{{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:rgba(255,255,255,0.03);border-radius:50%}}
    .cta-inner{{text-align:center;position:relative;z-index:1}}
    .cta-title{{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:#fff;margin-bottom:1rem;line-height:1.15}}
    .cta-sub{{color:rgba(255,255,255,0.7);max-width:50ch;margin:0 auto 2rem;line-height:1.7}}
    .btn-white{{display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:rgba(255,255,255,0.85);border:2px solid rgba(255,255,255,0.3);font-weight:600;font-size:0.95rem;padding:0.85rem 2rem;border-radius:100px;cursor:pointer;transition:var(--transition);font-family:var(--font-body)}}
    .btn-white:hover{{border-color:rgba(255,255,255,0.8);color:#fff}}
    #footer{{background:var(--green);border-top:1px solid rgba(255,255,255,0.07);padding:4rem 0 2rem}}
    .footer-grid{{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem}}
    .footer-brand-logo{{font-family:var(--font-heading);font-size:2rem;color:#fff;margin-bottom:0.8rem}}
    .footer-brand-desc{{font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:1.5rem;max-width:34ch}}
    .footer-col-title{{font-size:0.72rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:1.2rem}}
    .footer-links{{display:flex;flex-direction:column;gap:0.6rem}}
    .footer-links a{{font-size:0.85rem;color:rgba(255,255,255,0.65);transition:color var(--transition)}}
    .footer-links a:hover{{color:var(--orange)}}
    .footer-bottom{{border-top:1px solid rgba(255,255,255,0.07);padding-top:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}}
    .footer-bottom p{{font-size:0.8rem;color:rgba(255,255,255,0.35)}}
    @keyframes revealFallback{{to{{opacity:1;transform:none}}}}
    .reveal{{opacity:0;transform:translateY(30px);transition:opacity 0.6s,transform 0.6s;animation:revealFallback 0.6s ease 0.2s forwards}}
    .reveal.visible{{opacity:1;transform:none}}
    @media(max-width:1024px){{.pricing-grid{{grid-template-columns:repeat(2,1fr)}}.footer-grid{{grid-template-columns:1fr 1fr}}}}
    @media(max-width:768px){{
      .nav-links{{display:none}}.nav-hamburger{{display:flex}}
      .market-grid{{grid-template-columns:1fr}}
      #landscape>.container>div{{grid-template-columns:1fr !important}}
      .why-grid{{grid-template-columns:1fr}}
      .process-steps{{grid-template-columns:1fr 1fr}}
      .results-grid{{grid-template-columns:1fr}}
      .pricing-grid{{grid-template-columns:1fr}}
      .footer-grid{{grid-template-columns:1fr;gap:2rem}}
      .footer-bottom{{flex-direction:column;text-align:center}}
    }}
    @media(max-width:480px){{.process-steps{{grid-template-columns:1fr}}.insight-cards{{grid-template-columns:1fr}}}}
  </style>
</head>
<body>

  <nav id="navbar" role="navigation" aria-label="Main navigation">
    <div class="container">
      <div class="nav-inner">
        <a href="https://bambinoagency.com/" class="nav-logo" aria-label="Bambino Agency — Home">Bambino</a>
        <ul class="nav-links" role="list">
          <li><a href="https://bambinoagency.com/services">Services</a></li>
          <li><a href="https://bambinoagency.com/industries">Industries</a></li>
          <li><a href="https://bambinoagency.com/about">About</a></li>
          <li><a href="https://bambinoagency.com/blog">Blog</a></li>
          <li><a href="https://bambinoagency.com/pricing">Pricing</a></li>
          <li><a href="https://bambinoagency.com/contact" class="nav-cta">Get a Free Audit &rarr;</a></li>
        </ul>
        <button class="nav-hamburger" aria-label="Open menu" id="hamburgerBtn"><span></span><span></span><span></span></button>
      </div>
    </div>
  </nav>

  <div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile navigation">
    <button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>
    <a href="https://bambinoagency.com/services" onclick="closeMobileMenu()">Services</a>
    <a href="https://bambinoagency.com/industries" onclick="closeMobileMenu()">Industries</a>
    <a href="https://bambinoagency.com/about" onclick="closeMobileMenu()">About</a>
    <a href="https://bambinoagency.com/blog" onclick="closeMobileMenu()">Blog</a>
    <a href="https://bambinoagency.com/pricing" onclick="closeMobileMenu()">Pricing</a>
    <a href="https://bambinoagency.com/contact" onclick="closeMobileMenu()" style="color:var(--orange)">Get a Free Audit &rarr;</a>
  </div>

  <section id="hero" aria-label="{bc_lbl}">
    <div class="hero-blob" aria-hidden="true"></div>
    <div class="container">
      <div class="hero-content">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="https://bambinoagency.com/">Home</a><span aria-hidden="true">/</span>
          <a href="https://bambinoagency.com/us">United States</a><span aria-hidden="true">/</span>
          <span aria-current="page">{bc_lbl}</span>
        </nav>
        <p class="hero-label">{bc_lbl} — {nm}, {st}</p>
        <h1 class="hero-h1">{h1}</h1>
        <p class="hero-sub">{hero_s}</p>
        <div class="hero-actions">
          <a href="https://bambinoagency.com/contact" class="btn-orange">{svc["hero_cta1"]}</a>
          <a href="#pricing" class="btn-outline">{svc["hero_cta2"]}</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><span class="num">400+</span><span class="lbl">Clients across UK, US &amp; Canada</span></div>
          <div class="hero-stat"><span class="num">97%</span><span class="lbl">Client retention rate</span></div>
          <div class="hero-stat"><span class="num">$25M+</span><span class="lbl">Revenue generated for clients</span></div>
          <div class="hero-stat"><span class="num">No</span><span class="lbl">Long-term contracts required</span></div>
        </div>
      </div>
    </div>
  </section>

  <div id="proof" role="complementary" aria-label="Trust signals">
    <div class="container">
      <div class="proof-inner">
        <div class="proof-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Google &#8203;4.9 (127 reviews)
        </div>
        <div class="proof-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          Clutch Top Agency 2026
        </div>
        <div class="proof-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          400+ US &amp; UK clients
        </div>
        <div class="proof-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          Month-to-month — no lock-in
        </div>
      </div>
    </div>
  </div>

  <section id="market" aria-labelledby="market-heading">
    <div class="container">
      <div class="market-grid">
        <div class="reveal">
          <span class="section-label">{nm} Market</span>
          <h2 id="market-heading" class="section-title">{nm} Digital Market Overview</h2>
          <p class="section-sub">{nm} is {ctx}. Understanding the local competitive dynamics — search volumes, industry concentration, and seasonal demand patterns — is the foundation of every strategy we build for {nm} clients.</p>
          <div class="eeat-box" style="margin-top:1.5rem">
            <p><strong>Bambino {nm} data:</strong> {eeat}. Our methodology combines technical SEO foundations with AI-search-ready content architecture to capture both traditional and generative engine traffic.</p>
          </div>
          <p style="margin-top:1.2rem;font-size:0.85rem;color:var(--muted)">Key neighborhoods and districts served: {nbhd}.</p>
        </div>
        <div>
          <div class="insight-cards reveal">
{stats_h}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="landscape" aria-labelledby="landscape-heading" style="padding:5rem 0;background:var(--soft)">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start" class="reveal">
        <div>
          <span class="section-label">{nm} SEO Market</span>
          <h2 id="landscape-heading" class="section-title">{lnd_h2}</h2>
          <p style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">{lnd}</p>
          <div style="background:var(--card);border-radius:12px;padding:1.4rem 1.6rem;border-left:4px solid var(--orange);box-shadow:var(--shadow)">
            <p style="font-size:0.88rem;font-weight:700;color:var(--text);margin-bottom:0.4rem">Competition level</p>
            <p style="font-size:0.95rem;color:var(--orange);font-weight:600">{comp}</p>
          </div>
        </div>
        <div>
          <span class="section-label">Local Insight</span>
          <h3 style="font-family:var(--font-heading);font-size:1.5rem;color:var(--text);margin-bottom:1rem">{ins_h2}</h3>
          <p style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">{ins}</p>
          <a href="https://bambinoagency.com/contact" class="btn-orange">Get a {nm}-Specific Strategy &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <section id="services" aria-labelledby="svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">What We Do</span>
        <h2 id="svc-heading" class="section-title">{svc_h2}</h2>
        <p class="section-sub" style="margin:0 auto">{svc_sub}</p>
      </div>
      <div class="svc-grid">
{cards_h}
      </div>
    </div>
  </section>

  <section id="why" aria-labelledby="why-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Why Choose Us</span>
        <h2 id="why-heading" class="section-title">Why {nm} Businesses Choose Bambino</h2>
      </div>
      <div class="why-grid">
{why_h}
      </div>
    </div>
  </section>

  <section id="process" aria-labelledby="process-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">How It Works</span>
        <h2 id="process-heading" class="section-title">{pro_h2}</h2>
        <p class="section-sub" style="margin:0 auto">{pro_sub}</p>
      </div>
      <div class="process-steps">
{steps_h}
      </div>
    </div>
  </section>

  <section id="results" aria-labelledby="results-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Client Results</span>
        <h2 id="results-heading" class="section-title">What Our Clients Achieve</h2>
        <p class="section-sub" style="margin:0 auto">Across 400+ campaigns in the UK, US, and Canada — here are the benchmarks our clients consistently hit.</p>
      </div>
      <div class="results-grid">
        <div class="result-card reveal">
          <span class="result-stat">+43%</span>
          <div class="result-desc">Avg. organic traffic increase</div>
          <p class="result-detail">Measured at month 6 across all active campaigns. Includes new keyword rankings, improved positions, and featured snippet capture.</p>
        </div>
        <div class="result-card reveal">
          <span class="result-stat">4.2x</span>
          <div class="result-desc">Return on SEO investment</div>
          <p class="result-detail">Based on tracked organic conversions vs. monthly retainer cost. Calculated at 12 months across clients with conversion tracking in place.</p>
        </div>
        <div class="result-card reveal">
          <span class="result-stat">90 days</span>
          <div class="result-desc">Average time to first ranking movement</div>
          <p class="result-detail">Most clients see measurable keyword improvements within 90 days and significant lead volume growth by month 6. Highly competitive terms take 9–12 months.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="industries" aria-labelledby="ind-heading">
    <div class="container">
      <div class="reveal">
        <span class="section-label">Industries We Serve</span>
        <h2 id="ind-heading" class="section-title">{bc_lbl} — Every {nm} Sector</h2>
        <p class="section-sub">From {inds[0]} to {inds[2]}, our {nm} specialists understand the unique search behavior, competitive dynamics, and buyer intent patterns in your industry.</p>
        <div class="ind-pills">
{pills_h}
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" aria-labelledby="pricing-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">US Pricing</span>
        <h2 id="pricing-heading" class="section-title">{pri_h2}</h2>
        <p class="section-sub" style="margin:0 auto">{svc["pricing_sub"]}</p>
      </div>
      <div class="pricing-grid" style="margin-top:2.5rem">
        <div class="price-card reveal">
          <div class="plan-name">Starter</div>
          <div class="plan-price"><sup>$</sup>1,000</div>
          <p class="plan-period">per month + applicable tax</p>
          <p class="plan-desc">{p_d["starter"]}</p>
          <ul class="plan-features">
            <li class="plan-feature">{_CHK} Technical SEO audit</li>
            <li class="plan-feature">{_CHK} On-page optimization (10 pages)</li>
            <li class="plan-feature">{_CHK} Google Business Profile management</li>
            <li class="plan-feature">{_CHK} 2 blog posts per month</li>
            <li class="plan-feature">{_CHK} Monthly ranking report</li>
          </ul>
          <a href="https://bambinoagency.com/contact" class="btn-outline" style="width:100%;justify-content:center">Get Started &rarr;</a>
        </div>
        <div class="price-card featured reveal">
          <div class="plan-name">Growth</div>
          <div class="plan-price"><sup>$</sup>2,500</div>
          <p class="plan-period">per month + applicable tax</p>
          <p class="plan-desc">{p_d["growth"]}</p>
          <ul class="plan-features">
            <li class="plan-feature">{_CHK} Everything in Starter</li>
            <li class="plan-feature">{_CHK} Google &amp; Meta Ads management</li>
            <li class="plan-feature">{_CHK} 4 blog posts + 2 landing pages</li>
            <li class="plan-feature">{_CHK} GA4 analytics setup &amp; dashboard</li>
            <li class="plan-feature">{_CHK} Bi-weekly strategy calls</li>
          </ul>
          <a href="https://bambinoagency.com/contact" class="btn-orange" style="width:100%;justify-content:center">Get Started &rarr;</a>
        </div>
        <div class="price-card reveal">
          <div class="plan-name">Scale</div>
          <div class="plan-price"><sup>$</sup>5,500</div>
          <p class="plan-period">per month + applicable tax</p>
          <p class="plan-desc">{p_d["scale"]}</p>
          <ul class="plan-features">
            <li class="plan-feature">{_CHK} Everything in Growth</li>
            <li class="plan-feature">{_CHK} Full AI automation suite</li>
            <li class="plan-feature">{_CHK} CRO programme (A/B testing)</li>
            <li class="plan-feature">{_CHK} Digital PR (3 US placements/mo)</li>
            <li class="plan-feature">{_CHK} Weekly strategy &amp; reporting calls</li>
          </ul>
          <a href="https://bambinoagency.com/contact" class="btn-outline" style="width:100%;justify-content:center">Get Started &rarr;</a>
        </div>
        <div class="price-card reveal">
          <div class="plan-name">Enterprise</div>
          <div class="plan-price" style="font-size:1.8rem;padding-top:0.4rem">Custom</div>
          <p class="plan-period">tailored to your business</p>
          <p class="plan-desc">{p_d["enterprise"]}</p>
          <ul class="plan-features">
            <li class="plan-feature">{_CHK} Everything in Scale</li>
            <li class="plan-feature">{_CHK} Dedicated senior strategy team</li>
            <li class="plan-feature">{_CHK} Custom AI &amp; SaaS development</li>
            <li class="plan-feature">{_CHK} SLA &amp; priority support</li>
          </ul>
          <a href="https://bambinoagency.com/contact" class="btn-outline" style="width:100%;justify-content:center">Talk to Us &rarr;</a>
        </div>
      </div>
      <p style="text-align:center;margin-top:1.5rem;font-size:0.85rem;color:var(--muted)">All prices in USD. Prices exclude applicable state and local taxes. <a href="https://bambinoagency.com/pricing" style="color:var(--orange);font-weight:600">See full pricing &rarr;</a></p>
    </div>
  </section>

  <section id="other-services" aria-labelledby="other-svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Also in {nm}</span>
        <h2 id="other-svc-heading" class="section-title">More Ways Bambino Helps {nm} Businesses</h2>
        <p class="section-sub" style="margin:0 auto">We offer additional digital marketing services for {nm} businesses alongside our {bc_lbl} offering.</p>
      </div>
      <div class="svc-grid">
{sibs_h}
      </div>
    </div>
  </section>

  <section id="faq" aria-labelledby="faq-heading">
    <div class="container">
      <div class="reveal" style="text-align:center">
        <span class="section-label">Common Questions</span>
        <h2 id="faq-heading" class="section-title">{bc_lbl} — FAQs</h2>
      </div>
      <div class="faq-list">
{faq_h}
      </div>
    </div>
  </section>

  <section id="related" aria-labelledby="related-heading">
    <div class="container">
      <div class="reveal">
        <span class="section-label">Other US Cities</span>
        <h2 id="related-heading" class="section-title">{rl} Services Across the US</h2>
        <p class="section-sub">Bambino serves businesses across the United States. Explore our services in other major US cities:</p>
      </div>
      <div class="related-grid">
        <ul>
{rel_h}
        </ul>
        <a href="https://bambinoagency.com/us" class="related-card reveal">View All US Cities &rarr;</a>
      </div>
    </div>
  </section>

  <section id="cta" aria-labelledby="cta-heading">
    <div class="cta-inner container">
      <span class="section-label" style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.85)">Get Started</span>
      <h2 id="cta-heading" class="cta-title">{cta_h}</h2>
      <p class="cta-sub">{cta_s}</p>
      <div style="display:flex;justify-content:center;gap:1.2rem;flex-wrap:wrap">
        <a href="https://bambinoagency.com/contact" class="btn-orange" style="font-size:1rem;padding:1rem 2.4rem">Get a Free Audit &rarr;</a>
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
          <h3 class="footer-col-title">US Cities</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/us/new-york/seo-agency">New York</a></li>
            <li><a href="https://bambinoagency.com/us/los-angeles/seo-agency">Los Angeles</a></li>
            <li><a href="https://bambinoagency.com/us/chicago/seo-agency">Chicago</a></li>
            <li><a href="https://bambinoagency.com/us/houston/seo-agency">Houston</a></li>
            <li><a href="https://bambinoagency.com/us/dallas/seo-agency">Dallas</a></li>
            <li><a href="https://bambinoagency.com/us/austin/seo-agency">Austin</a></li>
            <li><a href="https://bambinoagency.com/us">All US Cities &rarr;</a></li>
          </ul>
          <h3 class="footer-col-title" style="margin-top:1.2rem">Also in {nm}</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/us/{slug}/seo-agency">SEO Agency</a></li>
            <li><a href="https://bambinoagency.com/us/{slug}/digital-marketing-agency">Digital Marketing</a></li>
            <li><a href="https://bambinoagency.com/us/{slug}/google-ads-agency">Google Ads</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-col-title">Services</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/services/seo">SEO</a></li>
            <li><a href="https://bambinoagency.com/services/local-seo">Local SEO</a></li>
            <li><a href="https://bambinoagency.com/services/google-ads">Google Ads</a></li>
            <li><a href="https://bambinoagency.com/services/content-marketing">Content Marketing</a></li>
            <li><a href="https://bambinoagency.com/services/cro">CRO</a></li>
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
            <li><a href="mailto:hello@bambinoagency.com">hello@bambinoagency.com</a></li>
            <li><a href="https://bambinoagency.com/contact" style="display:inline-flex;align-items:center;gap:0.4rem;background:var(--orange);color:#fff;padding:0.5rem 1.2rem;border-radius:100px;font-size:0.8rem;font-weight:700;margin-top:0.6rem">Free Audit &rarr;</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Bambino Agency. All rights reserved.</p>
        <nav style="display:flex;gap:1.5rem" aria-label="Legal">
          <a href="https://bambinoagency.com/privacy-policy" style="font-size:0.8rem;color:rgba(255,255,255,0.35)">Privacy Policy</a>
          <a href="https://bambinoagency.com/terms" style="font-size:0.8rem;color:rgba(255,255,255,0.35)">Terms</a>
        </nav>
      </div>
    </div>
  </footer>

  <script>
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));
    document.getElementById('hamburgerBtn').addEventListener('click', () => document.getElementById('mobileMenu').classList.add('open'));
    document.getElementById('mobileClose').addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
    function closeMobileMenu() {{ document.getElementById('mobileMenu').classList.remove('open'); }}
    document.querySelectorAll('.faq-q').forEach(btn => {{
      btn.addEventListener('click', () => {{
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => {{ i.classList.remove('open'); i.querySelector('.faq-q').setAttribute('aria-expanded','false'); }});
        if (!isOpen) {{ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }}
      }});
    }});
    const observer = new IntersectionObserver(entries => entries.forEach(e => {{ if (e.isIntersecting) e.target.classList.add('visible'); }}), {{threshold:0.08}});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>
</body>
</html>"""

# ── Generate all pages ─────────────────────────────────────────────────────
generated = 0
for city_slug, city in CITIES.items():
    for svc_key in SERVICES:
        out_dir = os.path.join(BASE, "us", city_slug, svc_key)
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "index.html")
        html = build_page(city_slug, city, svc_key)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"OK: /us/{city_slug}/{svc_key}/")
        generated += 1

print(f"\nDone: {generated} US city pages generated.")
