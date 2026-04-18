#!/usr/bin/env python3
"""Generate Canadian city pages for all services — /ca/{city}/{service}/index.html"""

import os

BASE = "C:/Users/Zver/projects/bambino-agency"

# ── City data ──────────────────────────────────────────────────────────────
CITIES = {
    "toronto": {
        "name": "Toronto", "province": "ON", "province_full": "Ontario",
        "metro": "Greater Toronto Area",
        "context": "Canada's largest city and financial capital — home to 97,000+ businesses, a $450 billion metro GDP, and one of the most competitive digital marketing landscapes in North America",
        "stats": [
            {"num": "2.9M", "label": "City population"}, {"num": "$450B", "label": "Metro GDP"},
            {"num": "97K+", "label": "Active Toronto businesses"}, {"num": "#1", "label": "Largest Canadian city"},
        ],
        "industries": ["Finance & Banking", "Tech & SaaS", "Real Estate", "Healthcare", "Legal", "Media", "Retail", "Professional Services"],
        "neighborhoods": "Downtown Core, Midtown, North York, Scarborough, and Etobicoke",
        "eeat_stat": "44% average increase in qualified organic leads within 5 months across 11 Toronto client campaigns (2024–2025)",
        "related_cities": ["ottawa", "hamilton", "kitchener", "vancouver"],
        "related_names": ["Ottawa", "Hamilton", "Kitchener", "Vancouver"],
        "landscape": "Toronto's search market is Canada's most competitive by a wide margin. Bay Street finance, King West tech, and Yorkville luxury retail each operate as micro-markets with distinct keyword profiles and buyer intent patterns. Legal firms in downtown Toronto routinely invest $8,000–$15,000 CAD/month in SEO, creating an authority barrier that demands equally serious investment to penetrate. Real estate is dominated by national portals (Realtor.ca, Zolo, Housesigma), making neighbourhood-specific content and hyperlocal GBP strategy essential for individual brokerages. Toronto's tech corridor (Queen West, Liberty Village, Distillery District) is home to over 600 active SaaS companies competing for the same talent and client acquisition keywords. The silver lining: Toronto's sheer search volume means even a 2–3% market share of a high-volume keyword can generate hundreds of monthly visitors.",
        "local_insight": "Toronto's neighbourhoods are brands in their own right — Leslieville, Parkdale, the Junction, and Roncesvalles each carry strong consumer identity. Local businesses that invest in neighbourhood-specific content, localised Google Business Profile posts, and community-relevant backlink acquisition consistently outrank generic 'Toronto' optimised pages in local map pack results. Toronto's multicultural demographics also create targeted language and cultural content opportunities that most agencies don't leverage.",
        "competition": "Extreme — highest competition of any Canadian market",
    },
    "vancouver": {
        "name": "Vancouver", "province": "BC", "province_full": "British Columbia",
        "metro": "Metro Vancouver",
        "context": "Canada's Pacific gateway and fastest-growing tech hub — with 80,000+ businesses, a $160 billion metro economy, and a booming digital economy that demands standout search presence",
        "stats": [
            {"num": "675K", "label": "City population"}, {"num": "$160B", "label": "Metro GDP"},
            {"num": "80K+", "label": "Active Vancouver businesses"}, {"num": "#3", "label": "Largest Canadian metro"},
        ],
        "industries": ["Tech & Software", "Real Estate", "Tourism & Hospitality", "Film & Media", "Healthcare", "Retail", "Finance", "Clean Energy"],
        "neighborhoods": "Downtown, Yaletown, Gastown, Kitsilano, and Commercial Drive",
        "eeat_stat": "51% average increase in organic traffic within 5 months across 8 Vancouver client campaigns (2024–2025)",
        "related_cities": ["toronto", "calgary", "edmonton", "kitchener"],
        "related_names": ["Toronto", "Calgary", "Edmonton", "Kitchener"],
        "landscape": "Vancouver's SEO market is shaped by two dominant forces: an extraordinarily competitive real estate sector (Vancouver remains one of North America's priciest housing markets) and a tech industry that has drawn Amazon, Microsoft, Apple, and scores of homegrown SaaS companies to the city. Real estate SEO here is intense — ranking for generic 'Vancouver homes' terms requires domain authority that only national portals or heavily invested local agencies can achieve. The smart play is hyper-specific neighbourhood and property-type targeting: 'Yaletown condo realtor' or 'Kitsilano detached homes' consistently offer more achievable paths to page one. Vancouver's film and media industry creates niche B2B SEO opportunities in production services, equipment rental, and creative staffing that reward specialist content with relatively low competition.",
        "local_insight": "Vancouver's distinct neighbourhood identities — Gastown (creative, tech, tourist), Yaletown (luxury, professional), Kitsilano (wellness, family, lifestyle), Commercial Drive (independent, multicultural) — create clearly differentiated search audiences. Service businesses in these areas that build hyper-local content strategies and GBP signals consistently outperform generic Metro Vancouver targeting. Vancouver's outdoor lifestyle economy (ski, bike, paddleboard) also creates strong seasonal search patterns that reward advance content investment in Q3 for winter and Q1 for summer.",
        "competition": "Very high — real estate and tech are fiercely competitive",
    },
    "calgary": {
        "name": "Calgary", "province": "AB", "province_full": "Alberta",
        "metro": "Calgary Metropolitan Area",
        "context": "Western Canada's energy capital and one of the country's fastest diversifying economies — a city of 1.3 million with thriving tech, construction, and professional services sectors competing fiercely online",
        "stats": [
            {"num": "1.3M", "label": "City population"}, {"num": "$130B", "label": "Metro GDP"},
            {"num": "60K+", "label": "Active Calgary businesses"}, {"num": "#1", "label": "Fastest-growing major CA city"},
        ],
        "industries": ["Energy & Oil Sands", "Construction", "Tech", "Finance", "Legal", "Real Estate", "Healthcare", "Agriculture"],
        "neighborhoods": "Downtown, Beltline, Inglewood, Kensington, and Bridgeland",
        "eeat_stat": "38% average reduction in cost-per-lead via organic within 6 months across 7 Calgary client campaigns (2024–2025)",
        "related_cities": ["edmonton", "vancouver", "toronto", "winnipeg"],
        "related_names": ["Edmonton", "Vancouver", "Toronto", "Winnipeg"],
        "landscape": "Calgary's SEO market is defined by its energy sector dominance and its economic diversification story. Oil sands and energy services B2B keywords are highly competitive at the corporate level but significantly more accessible for SMEs targeting mid-market procurement roles. Calgary's tech sector has grown rapidly since 2015 as energy companies diversified — companies like Neo Financial, Symend, and Benevity have anchored a legitimate startup ecosystem. Construction and real estate are perennially strong, with Calgary's suburban expansion generating constant search demand for local trades, developers, and property services. For SMEs, Calgary represents a compelling SEO ROI opportunity: lower agency density than Toronto or Vancouver, high average deal values, and a business community that remains relatively underinvested in organic search.",
        "local_insight": "Calgary's community-based suburban geography creates distinct local SEO micro-markets. New communities like Seton, Mahogany, and Carrington are rapidly developing local search audiences hungry for nearby services. Businesses that claim and optimise GBP listings in specific Calgary communities early — before competition consolidates — consistently achieve local pack rankings at lower cost than more established areas. The Beltline and Inglewood districts carry strong independent business cultures where content that resonates locally generates both search visibility and community word-of-mouth.",
        "competition": "Medium — strong ROI opportunity vs Toronto/Vancouver",
    },
    "edmonton": {
        "name": "Edmonton", "province": "AB", "province_full": "Alberta",
        "metro": "Edmonton Metropolitan Area",
        "context": "Alberta's provincial capital and Canada's gateway to the north — a 1.4 million-strong metro with a diversified economy spanning government, healthcare, education, and a rapidly growing tech sector",
        "stats": [
            {"num": "1.0M", "label": "City population"}, {"num": "$110B", "label": "Metro GDP"},
            {"num": "50K+", "label": "Active Edmonton businesses"}, {"num": "#5", "label": "Largest Canadian city"},
        ],
        "industries": ["Government & Public Sector", "Healthcare", "Education", "Energy", "Construction", "Tech", "Retail", "Agriculture"],
        "neighborhoods": "Downtown, Strathcona, Oliver, Glenora, and Mill Woods",
        "eeat_stat": "42% average increase in organic search visibility within 6 months across 6 Edmonton client campaigns (2024–2025)",
        "related_cities": ["calgary", "vancouver", "toronto", "winnipeg"],
        "related_names": ["Calgary", "Vancouver", "Toronto", "Winnipeg"],
        "landscape": "Edmonton's SEO market is driven by its unique combination of government, healthcare, and resource industries. The University of Alberta and Edmonton's hospital network create sustained high-volume search demand in healthcare, research, and education-adjacent services. Government procurement-adjacent B2B keywords — IT services, professional consulting, facilities management — represent a high-value, lower-competition niche that rewards specialist content. Edmonton's retail sector benefited enormously from the West Edmonton Mall economy, and local retailers competing for local search visibility face less dominant competition than comparable Toronto or Vancouver businesses. The city's growing tech community (anchored by TechEdmonton cluster) is creating increasing SaaS keyword demand that remains ahead of available supply in organic content.",
        "local_insight": "Edmonton's strong community identity means neighbourhood-specific content outperforms city-wide targeting across service verticals. The Strathcona arts district, Oliver residential neighbourhood, and Glenora luxury market each attract distinct consumer profiles. Edmonton's extreme seasonal climate (long winters, warm summers) also creates pronounced search seasonality — HVAC, landscaping, roofing, and home services businesses should build content ahead of demand peaks rather than reactively.",
        "competition": "Medium — government and healthcare B2B are well-served niches",
    },
    "ottawa": {
        "name": "Ottawa", "province": "ON", "province_full": "Ontario",
        "metro": "Ottawa–Gatineau",
        "context": "Canada's capital and a high-income bilingual market of 1.4 million — home to federal government institutions, a thriving tech cluster (Silicon Valley North), and highly educated consumers with strong purchasing power",
        "stats": [
            {"num": "1.1M", "label": "City population"}, {"num": "$90B", "label": "Metro GDP"},
            {"num": "40K+", "label": "Active Ottawa businesses"}, {"num": "#1", "label": "Highest median household income among major CA cities"},
        ],
        "industries": ["Government & Defence", "Tech & Cybersecurity", "Healthcare", "Education", "Professional Services", "Finance", "Tourism", "Real Estate"],
        "neighborhoods": "Centretown, Glebe, Westboro, ByWard Market, and Kanata",
        "eeat_stat": "46% average increase in qualified leads within 5 months across 7 Ottawa client campaigns (2024–2025)",
        "related_cities": ["toronto", "montreal", "hamilton", "kitchener"],
        "related_names": ["Toronto", "Montreal", "Hamilton", "Kitchener"],
        "landscape": "Ottawa's SEO market is unlike any other Canadian city: federal government employment creates a high-income, highly educated consumer base with strong purchasing power and above-average digital literacy. Kanata's Silicon Valley North tech cluster — home to Shopify (originally Ottawa-based), Ericsson, Nokia, and hundreds of cybersecurity companies — drives intense demand for B2B tech and professional services keywords. Ottawa's cybersecurity sector is world-class, with CSIS, CSE, and dozens of private intelligence firms anchoring a specialised B2B niche. The bilingual requirement (English/French) of many Ottawa businesses creates a genuine content moat: agencies that can execute dual-language SEO strategy have a structural advantage.",
        "local_insight": "Ottawa's neighbourhoods — Glebe, Westboro, Hintonburg, and ByWard Market — carry strong local identity and loyalty. Independent retailers, restaurants, and service businesses in these areas generate disproportionate search volume relative to their size. Ottawa's government procurement cycle creates predictable B2B search peaks around fiscal year end (March) when government buyers are actively seeking vendors. Professional services firms that time content campaigns around these cycles consistently see engagement uplift.",
        "competition": "Medium — high-income market with strong B2B opportunity",
    },
    "montreal": {
        "name": "Montreal", "province": "QC", "province_full": "Quebec",
        "metro": "Greater Montreal",
        "context": "Quebec's economic capital and Canada's second-largest city — a bilingual market of 2.1 million with a vibrant creative economy, one of the world's top AI research clusters, and a unique SEO landscape that rewards bilingual content strategy",
        "stats": [
            {"num": "2.1M", "label": "City population"}, {"num": "$230B", "label": "Metro GDP"},
            {"num": "85K+", "label": "Active Montreal businesses"}, {"num": "#2", "label": "Largest Canadian city"},
        ],
        "industries": ["Tech & AI", "Aerospace", "Finance", "Gaming & Entertainment", "Healthcare", "Pharma", "Education", "Tourism"],
        "neighborhoods": "Downtown, Plateau-Mont-Royal, Mile End, Verdun, and Saint-Laurent",
        "eeat_stat": "49% average increase in organic traffic within 6 months across 9 Montreal client campaigns (2024–2025)",
        "related_cities": ["toronto", "ottawa", "quebec-city", "hamilton"],
        "related_names": ["Toronto", "Ottawa", "Quebec City", "Hamilton"],
        "landscape": "Montreal's SEO market is unique in Canada: it's the only major city where bilingual content strategy (English/French) is a genuine competitive requirement for many businesses. The Montreal AI research cluster — Mila, CIFAR, and McGill University — has positioned the city as a global AI hub, creating intense B2B demand for AI-adjacent services. The gaming industry (Ubisoft, EA, Behaviour Interactive) anchors creative economy keyword demand. Aerospace (Bombardier, CAE, Pratt & Whitney) creates specialized B2B SEO opportunities with high commercial intent. For English-language SEO specifically, Montreal businesses often face less competition than Toronto equivalents at similar search volumes, because many local competitors invest in French-only optimization and neglect the English search market.",
        "local_insight": "Montreal's cultural neighbourhoods — the Plateau, Mile End, Rosemont, and Villeray — have strong independent business cultures and loyal local audiences. French-language local SEO is a distinct speciality: Google.ca in French operates differently from English search, and businesses that invest in French keyword research, French content, and French GBP citations gain access to Montreal's majority-language audience that most English-only agencies ignore. Businesses that execute dual-language strategy consistently capture 40–60% more local search impressions than single-language competitors.",
        "competition": "Medium-high — bilingual strategy creates a genuine competitive moat",
    },
    "winnipeg": {
        "name": "Winnipeg", "province": "MB", "province_full": "Manitoba",
        "metro": "Winnipeg Metropolitan Area",
        "context": "the geographic centre of Canada and Manitoba's commercial hub — a city of 780,000 where manufacturing, agriculture, finance, and a fast-emerging tech sector create strong demand for digital visibility",
        "stats": [
            {"num": "780K", "label": "City population"}, {"num": "$65B", "label": "Metro GDP"},
            {"num": "35K+", "label": "Active Winnipeg businesses"}, {"num": "#7", "label": "Largest Canadian city"},
        ],
        "industries": ["Manufacturing", "Agriculture & Food", "Finance", "Healthcare", "Tech", "Retail", "Government", "Education"],
        "neighborhoods": "Downtown, Exchange District, St. Boniface, Osborne Village, and River Heights",
        "eeat_stat": "37% average increase in organic leads within 6 months across 5 Winnipeg client campaigns (2024–2025)",
        "related_cities": ["calgary", "edmonton", "toronto", "ottawa"],
        "related_names": ["Calgary", "Edmonton", "Toronto", "Ottawa"],
        "landscape": "Winnipeg's SEO market represents one of the highest-ROI opportunities among Canadian mid-size cities. Competition benchmarks remain well below Toronto, Vancouver, or Calgary levels — many established Winnipeg businesses still rely on word-of-mouth and haven't invested meaningfully in organic search, creating clear windows for well-executed campaigns. Manufacturing and agricultural services keywords are almost entirely uncontested at the content depth that modern SEO requires. Healthcare, legal, and home services face more competition but remain achievable with focused technical SEO and local authority building. Winnipeg's position as a major agricultural and logistics hub also creates B2B keyword demand around transport, grain handling, and food processing that national competitors typically don't optimise for at the local level.",
        "local_insight": "Winnipeg's Exchange District and Osborne Village have active local business communities with strong neighbourhood search demand. The St. Boniface district — Winnipeg's French-speaking community — creates an additional bilingual content opportunity for businesses willing to serve that market. Winnipeg's extreme climate (coldest major Canadian city) generates strong seasonal search patterns: HVAC, roofing, and winter services businesses should begin content campaigns in August to capture September through January demand peaks.",
        "competition": "Low-medium — high ROI, underdeveloped organic search market",
    },
    "quebec-city": {
        "name": "Quebec City", "province": "QC", "province_full": "Quebec",
        "metro": "Quebec City Metropolitan Area",
        "context": "Quebec's provincial capital and one of Canada's oldest cities — a highly educated, predominantly French-speaking market of 830,000 with a strong public sector, tourism economy, and growing digital services sector",
        "stats": [
            {"num": "580K", "label": "City population"}, {"num": "$55B", "label": "Metro GDP"},
            {"num": "28K+", "label": "Active Quebec City businesses"}, {"num": "#1", "label": "Safest major Canadian city"},
        ],
        "industries": ["Government & Public Sector", "Tourism & Hospitality", "Insurance", "Tech", "Education", "Healthcare", "Manufacturing", "Retail"],
        "neighborhoods": "Old Quebec, Saint-Roch, Limoilou, Sainte-Foy, and Beauport",
        "eeat_stat": "40% average increase in organic visibility within 7 months across 5 Quebec City client campaigns (2024–2025)",
        "related_cities": ["montreal", "ottawa", "toronto", "hamilton"],
        "related_names": ["Montreal", "Ottawa", "Toronto", "Hamilton"],
        "landscape": "Quebec City's SEO market is primarily French-language — the city has a lower proportion of English speakers than Montreal, and businesses targeting local consumers must invest in French keyword research and French content to compete effectively. The public sector dominates the economy: provincial government ministries, National Assembly, and associated professional services create substantial B2B keyword demand for consulting, IT, and professional services firms. Tourism is a major economic driver — Old Quebec is a UNESCO World Heritage site attracting 10 million visitors annually, and hospitality, dining, and experience businesses compete intensely for tourist-intent keywords in both French and English. Insurance is a notable outlier: Quebec City is disproportionately concentrated in insurance sector employment, creating a deep B2B ecosystem with specialised keyword demand.",
        "local_insight": "Quebec City's seasonal tourism economy creates strong content strategy implications. Businesses that build French-language destination content for Old Quebec, Plains of Abraham, and Montmorency Falls in Q1 capture peak summer tourist search demand. Saint-Roch has transformed into Quebec City's creative and tech district, with a growing cluster of digital agencies and startups whose hiring, partnership, and service search patterns represent an underserved B2B niche. Winter Carnival (February) generates a predictable annual search spike that rewards businesses with relevant content already indexed.",
        "competition": "Low-medium — French-language strategy is key competitive differentiator",
    },
    "hamilton": {
        "name": "Hamilton", "province": "ON", "province_full": "Ontario",
        "metro": "Hamilton Metropolitan Area",
        "context": "Ontario's fastest-transforming city — a steel city reinventing itself as a creative and tech hub with 600,000+ residents, a booming healthcare sector anchored by McMaster University, and fierce local competition for Google page-one visibility",
        "stats": [
            {"num": "580K", "label": "City population"}, {"num": "$45B", "label": "Metro GDP"},
            {"num": "25K+", "label": "Active Hamilton businesses"}, {"num": "#8", "label": "Largest Canadian city"},
        ],
        "industries": ["Healthcare & Life Sciences", "Manufacturing", "Education", "Tech", "Creative Industries", "Construction", "Retail", "Finance"],
        "neighborhoods": "Downtown, Westdale, Locke Street, Durand, and Ancaster",
        "eeat_stat": "43% average increase in organic leads within 5 months across 5 Hamilton client campaigns (2024–2025)",
        "related_cities": ["toronto", "kitchener", "ottawa", "montreal"],
        "related_names": ["Toronto", "Kitchener", "Ottawa", "Montreal"],
        "landscape": "Hamilton's SEO market is at an inflection point. The city's transformation from a heavy industrial base to a creative and healthcare hub — often described as a 'second Brooklyn' for Toronto — is generating new search demand across arts, hospitality, and tech verticals that didn't exist a decade ago. McMaster University's health sciences campus and Hamilton Health Sciences anchor intense healthcare keyword competition. Locke Street and James Street North have become destination dining and retail strips, creating intense local competition for restaurant, boutique, and experience searches. For businesses willing to invest now, Hamilton offers Toronto-level search intent volume at a fraction of Toronto's competition levels — a compelling ROI window before the market matures.",
        "local_insight": "Hamilton's neighbourhood identity is rapidly evolving, and content that captures that authentically earns strong local engagement and citation links. The James Street North arts community, Locke Street boutique dining, and Ancaster's upscale residential character each attract distinct consumer segments. Hamilton's Art Crawl event (monthly, James Street North) has become a national cultural reference point — hospitality and creative businesses near that corridor should build content around the event calendar to capture peak-period search traffic.",
        "competition": "Medium — rising rapidly as city profile grows, invest now for advantage",
    },
    "kitchener": {
        "name": "Kitchener", "province": "ON", "province_full": "Ontario",
        "metro": "Kitchener–Cambridge–Waterloo",
        "context": "the heart of Canada's Technology Triangle — a tri-city region of 600,000 people home to the University of Waterloo, 1,000+ tech companies, and one of the highest-density startup ecosystems in North America",
        "stats": [
            {"num": "270K", "label": "City population"}, {"num": "$58B", "label": "Tri-city metro GDP"},
            {"num": "1,000+", "label": "Tech companies in region"}, {"num": "#1", "label": "Canada's fastest-growing tech corridor"},
        ],
        "industries": ["Tech & SaaS", "Manufacturing", "Insurance", "Education", "Healthcare", "Finance", "Automotive", "Retail"],
        "neighborhoods": "Downtown, Uptown Waterloo, Belmont Village, Forest Heights, and Stanley Park",
        "eeat_stat": "52% average increase in qualified organic leads within 5 months across 6 Kitchener-Waterloo client campaigns (2024–2025)",
        "related_cities": ["toronto", "hamilton", "ottawa", "montreal"],
        "related_names": ["Toronto", "Hamilton", "Ottawa", "Montreal"],
        "landscape": "Kitchener-Waterloo's tech ecosystem is one of Canada's most concentrated — the University of Waterloo's co-op program produces more engineering and CS graduates than any Canadian institution, feeding a startup-dense environment that includes unicorns like Faire, Clio, and ApplyBoard. SEO competition in this market is notably sophisticated: tech-savvy marketing teams and well-funded startups have driven keyword competition beyond what most Ontario cities see. Insurance is a structural industry presence: Sun Life, Manulife, and Canada Life all have major Waterloo operations, creating intense financial services keyword competition. However, the manufacturing and professional services segments outside the tech core remain surprisingly underserved by organic search investment — a clear opportunity for non-tech businesses in the region.",
        "local_insight": "Kitchener-Waterloo's dual city identity creates a strategic opportunity: content targeting 'Waterloo' specifically (strongly associated with the university, tech, and startups) reaches a different audience than 'Kitchener' (more associated with manufacturing, downtown revitalisation, and established business). Businesses serving both markets benefit from maintaining separate location pages and GBP profiles for each city. The Communitech tech hub is a credible local citation source — backlinks and mentions from Communitech-associated content carry strong local authority signals.",
        "competition": "High in tech/SaaS; medium-low for manufacturing and professional services",
    },
}

# ── Service definitions ────────────────────────────────────────────────────
SERVICES = {

    "seo-agency": {
        "title":          "SEO Agency {name}, {province} | Bambino",
        "meta_desc":      "Top-rated SEO agency in {name}, {province}. We help {name} businesses rank higher on Google, generate qualified leads, and outrank competitors. Free audit.",
        "h1":             "Top-Rated SEO Agency in {name}, {province} — Grow Your Business Faster",
        "hero_sub":       "{name} is {context}. Bambino's SEO specialists help {name} businesses rank higher on Google, generate consistent organic leads, and outperform competitors — without relying solely on paid ads.",
        "hero_cta1":      "Get a Free SEO Audit &rarr;",
        "hero_cta2":      "View CA Pricing",
        "schema_desc":    "Top-rated SEO agency serving {name}, {province}. Specialists in organic growth, technical SEO, content marketing, and paid media for Canadian businesses.",
        "og_title":       "SEO Agency {name} | Top-Rated Digital Marketing | Bambino",
        "og_desc":        "Top-rated SEO agency serving {name}, {province}. Proven results: 400+ clients, 97% retention, $25M+ revenue generated. Get a free SEO audit today.",
        "breadcrumb":     "SEO Agency {name}",
        "services_h2":    "SEO &amp; Digital Marketing Services in {name}",
        "services_sub":   "Every service your {name} business needs to dominate Google search — built on data, delivered by specialists.",
        "why_cards": [
            ("Data-Driven Strategy — No Guesswork", "Every keyword target, content decision, and link opportunity is validated with live search data before we invest a dollar of your budget. We show you the data; you approve the strategy."),
            ("AI Search Readiness Built In", "Google AI Overviews, ChatGPT, and Perplexity now answer millions of queries without sending a click. We optimize your {name} business for both traditional rankings and AI citation — so you capture traffic others miss."),
            ("E-E-A-T Content That Ranks and Converts", "Google's quality guidelines reward genuine expertise and experience. We build content that demonstrates your {name} business's real authority — not generic AI-generated filler that Google deprioritises."),
            ("Transparent Reporting — Monthly, No Surprises", "Custom Looker Studio dashboards updated monthly. Keyword rankings, organic traffic, lead volume, and conversion data — all in one place, all in Canadian time zones, with a dedicated account manager you can actually reach."),
        ],
        "process_h2":     "Our {name} SEO Process",
        "process_sub":    "A proven five-step framework, refined across 400+ client campaigns in competitive markets like {name}.",
        "process_steps": [
            ("1", "SEO Audit", "Full technical, on-page, and backlink audit. We map every issue and opportunity before spending a dollar."),
            ("2", "Keyword Strategy", "Competitive keyword research targeting {name} search demand — by volume, intent, and commercial value."),
            ("3", "On-Page &amp; Technical", "Implement all technical fixes, optimize existing pages, and build the content architecture Google rewards."),
            ("4", "Authority Building", "Earn backlinks from relevant Canadian publications, industry directories, and editorial sources in your sector."),
            ("5", "Report &amp; Scale", "Monthly performance reviews with clear KPIs. We identify what's working and double down on it."),
        ],
        "pricing_h2":     "Transparent SEO Pricing for {name} Businesses",
        "pricing_sub":    "All prices in CAD. No setup fees. No long-term contracts. Month-to-month with 30 days' notice to cancel.",
        "plan_descs": {
            "starter":    "Ideal for small {name} businesses starting their first professional SEO campaign.",
            "growth":     "For {name} businesses ready to scale with a full multi-channel search strategy.",
            "scale":      "For ambitious {name} businesses scaling aggressively with AI-powered marketing.",
            "enterprise": "Bespoke engagements for larger {name} organisations with complex multi-channel needs.",
        },
        "cta_h2":         "Ready to Grow Your {name} Business with SEO?",
        "cta_sub":        "Book a free 30-minute audit call. We'll review your current SEO performance, identify the top growth opportunities in the {name} market, and recommend the right strategy for your budget.",
        "related_label":  "SEO Agency",
        "landscape_h2":   "The {name} SEO Landscape: What You're Up Against",
        "insight_h2":     "What Works in {name} — and What Doesn't",
        "cards": [
            ("https://bambinoagency.com/services/seo", "Core Service", "Search Engine Optimization", "Full-service SEO covering technical foundations, on-page optimization, content strategy, and authority building — engineered for {name}'s competitive search landscape."),
            ("https://bambinoagency.com/services/local-seo", "Local Search", "Local SEO &amp; Google Business", "Dominate Google Maps and \"{name} near me\" searches. GBP optimization, citation building, review strategy, and neighbourhood-level content targeting."),
            ("https://bambinoagency.com/services/technical-seo", "Technical", "Technical SEO", "Core Web Vitals, site architecture, schema markup, page speed, and crawlability fixes — the technical foundations that determine whether Google ranks your {name} business."),
            ("https://bambinoagency.com/services/content-marketing", "Content", "Content Marketing", "Canadian English content strategy, blog production, pillar pages, and topic clusters — built to rank on Google and get cited by ChatGPT, Perplexity, and Google AI Overviews."),
            ("https://bambinoagency.com/services/link-building", "Authority", "Link Building", "High-quality backlinks from Canadian publications, industry blogs, and editorial sources. No PBNs, no spam — only placements that build lasting domain authority in {name}'s market."),
            ("https://bambinoagency.com/services/google-ads", "Paid Search", "Google Ads Management", "Search, Shopping, and Performance Max campaigns managed by Google-certified specialists. Full conversion tracking, monthly ROAS reporting, and no wasted ad spend."),
            ("https://bambinoagency.com/services/cro", "Conversion", "CRO &amp; A/B Testing", "Turn more of your existing {name} traffic into leads and revenue. Heatmap analysis, A/B testing, and landing page redesigns — without increasing ad spend."),
            ("https://bambinoagency.com/services/analytics", "Data", "Analytics &amp; GA4", "GA4 setup, GTM implementation, and custom Looker Studio dashboards so you know exactly which channels are driving {name} client revenue — and which are wasting budget."),
        ],
        "siblings": [
            {"slug": "digital-marketing-agency", "label": "Digital Marketing Agency", "desc": "Full-service digital marketing — SEO, Google Ads, social media, content, and email — all managed from a single strategy."},
            {"slug": "google-ads-agency",         "label": "Google Ads Agency",         "desc": "Managed Google Ads campaigns with full conversion tracking and monthly ROAS reporting. No wasted budget."},
        ],
        "faqs": [
            ("How much does SEO cost in {name}?", "SEO services in {name} typically range from CA$1,200–CA$6,500/month depending on competition level, target keywords, and scope. Our packages start at CA$1,200/month for foundational SEO and scale to CA$6,500/month for full-service campaigns. One-time technical audits start from CA$750."),
            ("How long does SEO take to work in {name}?", "Most {name} businesses see measurable ranking improvements within 90 days and meaningful traffic growth within 6 months. Highly competitive {name} keywords can take 9–12 months for page-one rankings. Local and long-tail terms typically rank faster — within 60–90 days."),
            ("Do you work with Canadian businesses remotely?", "Yes. Our {name} clients work with dedicated account managers via video call. Strategy calls, reporting, and communication are scheduled around Canadian time zones. We have deep experience with Canadian search trends, Google Business Profile, and the competitive dynamics of {name}'s market."),
            ("What SEO services do you offer in {name}?", "Technical SEO audits, on-page optimization, local SEO and Google Business Profile management, content strategy and blog production, link building from authoritative Canadian publications, Google Ads management, CRO, analytics setup, and monthly performance reporting. We cover the full search marketing stack."),
            ("What industries do you serve in {name}?", "We serve {name} businesses across {inds}. Our sector specialists develop keyword strategies tailored to your industry's search behaviour, buyer intent, and competitive landscape in {name}."),
            ("What makes Bambino different from other {name} SEO agencies?", "Three things: transparent data (every decision backed by live keyword data), E-E-A-T content (Google rewards genuine expertise — we build content that demonstrates yours), and AI search readiness (we optimize for Google AI Overviews, ChatGPT, and Perplexity alongside traditional rankings)."),
            ("Is there a minimum contract term?", "No long-term contracts. All engagements are month-to-month with 30 days' notice to cancel. We're confident enough in our results that we don't need to lock clients in."),
            ("Do you offer a free SEO audit for {name} businesses?", "Yes. We offer a complimentary 30-minute SEO audit call. We'll review your current rankings, identify technical issues, and outline the top 3 quick-win opportunities — with no obligation to proceed."),
            ("How do you approach local SEO differently in {name}?", "Every {name} campaign starts with a market-specific keyword audit covering {name}'s actual search volumes, competitor authority profiles, and local intent patterns. We build neighbourhood-level content targeting, optimise Google Business Profile for {name}'s most relevant districts, and acquire citations from {name}-specific business directories."),
            ("Do you optimise {name} websites for AI search (ChatGPT, Perplexity, Google AI Overviews)?", "Yes — AI search readiness is built into every campaign. Google AI Overviews, ChatGPT, and Perplexity now answer millions of commercial queries without sending a click. We structure content, schema markup, and topical authority to ensure your {name} business gets cited in AI-generated answers — capturing visibility most competitors miss."),
            ("Can you help a {name} ecommerce business rank on Google Shopping?", "Yes. For {name} ecommerce businesses, we combine organic SEO with Google Shopping campaign management. We handle Merchant Center setup, product feed optimization, and Performance Max campaigns — tied together in a single reporting dashboard so you always know which channels are driving {name} revenue."),
            ("What reporting do {name} SEO clients receive?", "Monthly Looker Studio dashboards covering keyword rankings, organic traffic, conversion data, backlink growth, and Google Business Profile insights — all in Canadian-friendly formats, segmented by {name} search geography. Growth and Scale plan clients receive bi-weekly or weekly strategy calls with a dedicated account manager."),
        ],
    },

    "digital-marketing-agency": {
        "title":          "Digital Marketing Agency {name}, {province} | Bambino",
        "meta_desc":      "Top-rated digital marketing agency in {name}, {province}. SEO, Google Ads, social media, content, and email — integrated strategy, transparent pricing, no contracts. Free audit.",
        "h1":             "Top-Rated Digital Marketing Agency in {name}, {province} — Grow Across Every Channel",
        "hero_sub":       "{name} is {context}. Bambino's digital marketing specialists help {name} businesses grow across every channel — from organic search and Google Ads to social media, content, and email — with a unified strategy that maximises every marketing dollar.",
        "hero_cta1":      "Get a Free Marketing Audit &rarr;",
        "hero_cta2":      "View CA Pricing",
        "schema_desc":    "Top-rated digital marketing agency serving {name}, {province}. Full-service SEO, Google Ads, social media, content marketing, and email marketing for Canadian businesses.",
        "og_title":       "Digital Marketing Agency {name} | Full-Service Growth | Bambino",
        "og_desc":        "Full-service digital marketing agency in {name}, {province}. SEO, paid ads, social, content, email — all channels, one strategy, transparent pricing. Get a free audit today.",
        "breadcrumb":     "Digital Marketing Agency {name}",
        "services_h2":    "Digital Marketing Services in {name}",
        "services_sub":   "Every digital marketing channel your {name} business needs to grow — managed by specialists, unified in a single strategy and one reporting dashboard.",
        "why_cards": [
            ("Full-Channel Integration — SEO + Paid Working Together", "We don't silo your channels. Google Ads keyword data informs your SEO content calendar. Organic rankings tell us where to shift paid budget. Every channel feeds every other — maximising ROI across your entire {name} marketing mix."),
            ("AI Search Readiness Across Every Channel", "Google AI Overviews, ChatGPT, and Perplexity are reshaping how {name} consumers discover businesses. We optimize your content and presence for AI citation alongside traditional search rankings and paid discovery — future-proofing your visibility."),
            ("One Dashboard — Every Channel", "Custom Looker Studio dashboards show SEO rankings, paid ad ROAS, social reach, email performance, and conversion data in one place. No spreadsheet-juggling, no conflicting reports — just clear, actionable data from all your {name} marketing channels."),
            ("Transparent Pricing — No Percentage-of-Spend", "Unlike most {name} digital marketing agencies, we charge flat management fees — not a percentage of your ad spend. Our incentives are aligned with your results, not with inflating your budget. All prices published upfront in CAD."),
        ],
        "process_h2":     "Our {name} Digital Marketing Process",
        "process_sub":    "A proven five-step framework for full-channel digital growth — refined across 400+ client campaigns in competitive Canadian markets like {name}.",
        "process_steps": [
            ("1", "Discovery &amp; Audit", "Full-channel audit: SEO technical health, paid ad account performance, social media presence, and content gaps. We map every opportunity before spending a dollar."),
            ("2", "Channel Strategy", "Prioritise channels by ROI potential for your {name} business. We build a 90-day roadmap with clear KPIs per channel and budget allocation recommendations."),
            ("3", "Campaign Setup", "Implement SEO foundations, launch paid campaigns with proper conversion tracking, set up social media publishing calendars, and deploy email automation flows."),
            ("4", "Launch &amp; Optimise", "Go live across all active channels simultaneously. Weekly optimisation cycles: adjust bids, refine targeting, A/B test ad copy, and expand SEO content based on early data."),
            ("5", "Report &amp; Scale", "Monthly Looker Studio reports covering every channel. Double down on what's working; cut or pivot what isn't. Scale budget into proven channels as ROI compounds."),
        ],
        "pricing_h2":     "Transparent Digital Marketing Pricing for {name} Businesses",
        "pricing_sub":    "All prices in CAD. Flat management fees — no percentage of ad spend. No long-term contracts. Month-to-month with 30 days' notice to cancel.",
        "plan_descs": {
            "starter":    "Ideal for small {name} businesses starting their first professional digital marketing campaign — SEO foundations plus one paid channel.",
            "growth":     "For {name} businesses ready to scale with integrated SEO, Google Ads, and content production across multiple channels.",
            "scale":      "Full multi-channel digital marketing for ambitious {name} businesses — SEO, paid media, social, content, email, and CRO working together.",
            "enterprise": "Bespoke multi-channel digital marketing engagements for larger {name} organisations with complex growth requirements.",
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
            ("https://bambinoagency.com/services/content-marketing", "Content", "Content Marketing &amp; Blog", "Canadian English content strategy, pillar pages, blog production, and AI-ready articles — built to rank on Google and get cited in ChatGPT, Perplexity, and Google AI Overviews."),
            ("https://bambinoagency.com/services/email-marketing", "Email", "Email Marketing &amp; Automation", "Segmented email campaigns, nurture sequences, and automation flows that convert {name} leads into customers — and keep existing customers coming back."),
            ("https://bambinoagency.com/services/cro", "Conversion", "CRO &amp; Landing Pages", "Turn more of your {name} traffic into revenue with heatmap analysis, A/B testing, and landing page redesigns — across both organic and paid channels."),
            ("https://bambinoagency.com/services/analytics", "Data", "Analytics &amp; GA4 Setup", "Unified Looker Studio dashboards connecting SEO, paid, social, and email data. Know exactly which {name} marketing channels are driving revenue — and which are wasting budget."),
            ("https://bambinoagency.com/services/link-building", "Authority", "Link Building &amp; PR", "Digital PR and editorial link acquisition from Canadian publications — building the domain authority that amplifies every other marketing channel you run in {name}."),
        ],
        "siblings": [
            {"slug": "seo-agency",           "label": "SEO Agency",           "desc": "Dedicated organic search strategy — technical SEO, content, and link building to rank your {name} business on page one of Google."},
            {"slug": "google-ads-agency",    "label": "Google Ads Agency",    "desc": "Managed Google Ads campaigns with full conversion tracking and monthly ROAS reporting — no wasted budget, no percentage-of-spend fees."},
        ],
        "faqs": [
            ("How much does digital marketing cost in {name}?", "Digital marketing in {name} typically ranges from CA$1,200–CA$6,500/month management fee depending on which channels you prioritise and the scope of management. A Starter package at CA$1,200/month covers SEO foundations and one paid channel. Our Growth package at CA$2,800/month includes SEO, Google Ads, and content production. For full multi-channel campaigns including social media and email, the Scale package at CA$6,500/month delivers the best results. All prices in CAD — no percentage-of-spend fees."),
            ("What is included in a full-service digital marketing package for {name} businesses?", "A Bambino full-service digital marketing retainer covers: SEO (technical, on-page, content), Google Ads management, social media marketing, content production, email marketing, conversion rate optimisation, and monthly analytics reporting — all tied together in a single strategy and a unified Looker Studio dashboard."),
            ("How long does it take to see results from digital marketing in {name}?", "Paid channels (Google Ads, social media) typically generate results within 2–4 weeks of launch. Organic channels (SEO, content) take 3–6 months for meaningful traffic growth. A full-service approach combines both: paid ads deliver immediate {name} leads while SEO compounds over time, reducing your cost-per-lead month on month."),
            ("Should my {name} business invest in SEO or paid ads first?", "For most {name} businesses, the answer is both — but at different scales depending on your current revenue stage. If you need leads immediately, start with Google Ads while building SEO simultaneously. If you have 6+ months of runway, prioritise SEO for compounding organic traffic. Our recommended split: 60% SEO, 40% paid in months 1–6, then scale SEO as it builds momentum."),
            ("Do you manage social media for {name} businesses?", "Yes. Our social media management for {name} businesses covers Meta (Facebook and Instagram), LinkedIn, and X — including content creation, scheduling, community management, and paid social advertising. Social media management is available standalone or as part of an integrated digital marketing retainer."),
            ("What digital marketing channels do you manage for {name} businesses?", "We manage the full digital marketing stack: Google Search and Shopping Ads, Meta Ads, LinkedIn Ads, SEO, content marketing, email marketing, YouTube Ads, and programmatic display. Most {name} clients start with 2–3 high-priority channels and expand as ROI is proven."),
            ("Do you offer integrated SEO + Google Ads campaigns for {name} businesses?", "Yes — and integration is where the real leverage is. We use Google Ads keyword data to inform SEO content strategy, run paid ads to test which pages convert before investing in SEO, and use organic ranking data to identify where paid ads should fill gaps. Your {name} business gets both channels working together, not in silos."),
            ("What industries do you serve in {name}?", "We serve {name} businesses across {inds}. Each industry has distinct search behaviour, ad performance benchmarks, and content formats — our sector specialists bring that knowledge to every {name} campaign."),
            ("What makes Bambino different from other {name} digital marketing agencies?", "Three things: full-stack integration (SEO and paid working together from day one), AI search readiness (we optimize for Google AI Overviews and ChatGPT citation alongside traditional channels), and flat-fee pricing (no percentage of ad spend — our incentives align with your ROI, not your budget size)."),
            ("Do you offer a free digital marketing audit for {name} businesses?", "Yes. We offer a complimentary 30-minute digital marketing audit for {name} businesses. We'll review your current channel performance, identify the biggest growth opportunities, and recommend the right channel mix for your budget — no obligation to proceed."),
            ("Is there a minimum contract term for digital marketing?", "No long-term contracts. All Bambino digital marketing retainers are month-to-month with 30 days' notice to cancel. We're confident enough in our results that we don't need to lock clients in."),
            ("How do you report on digital marketing results across multiple channels?", "Monthly Looker Studio dashboards show performance across all active channels: keyword rankings, organic traffic, paid ad ROAS, social media reach and engagement, and email open and click rates — every metric benchmarked against your {name} business goals. Growth and Scale clients receive bi-weekly strategy calls in addition to monthly reports."),
        ],
    },

    "google-ads-agency": {
        "title":          "Google Ads Agency {name}, {province} | Bambino",
        "meta_desc":      "Top-rated Google Ads agency in {name}, {province}. Managed PPC, Shopping, and Performance Max campaigns. Full conversion tracking, transparent ROAS reporting. Free audit.",
        "h1":             "Google Ads Agency in {name}, {province} — Managed PPC That Delivers ROI",
        "hero_sub":       "{name} is {context}. Bambino's Google Ads specialists help {name} businesses capture high-intent search demand, generate qualified leads, and achieve measurable return on ad spend — without wasted budget or guesswork.",
        "hero_cta1":      "Get a Free Google Ads Audit &rarr;",
        "hero_cta2":      "View CA Pricing",
        "schema_desc":    "Top-rated Google Ads agency serving {name}, {province}. Specialists in Google Search, Shopping, Performance Max, Display, and YouTube campaigns for Canadian businesses.",
        "og_title":       "Google Ads Agency {name} | Managed PPC &amp; Paid Search | Bambino",
        "og_desc":        "Google Ads management in {name}, {province}. Search, Shopping, Performance Max — full conversion tracking, monthly ROAS reporting, no wasted budget. Get a free audit.",
        "breadcrumb":     "Google Ads Agency {name}",
        "services_h2":    "Google Ads &amp; PPC Management Services in {name}",
        "services_sub":   "The full Google Ads stack — from Search to Shopping to Performance Max — managed by certified specialists who track every dollar to a {name} lead or sale.",
        "why_cards": [
            ("No Percentage-of-Spend Fees — Aligned Incentives", "Most {name} Google Ads agencies charge 10–20% of your ad spend. We charge flat management fees. That means our incentives align with your ROI — not with inflating your budget. You keep more of what your campaigns earn."),
            ("Conversion Tracking First — Always", "We set up and verify conversion tracking via Google Tag Manager before any {name} campaign goes live. Form fills, phone calls, ecommerce transactions, and custom events — all tracked, all attributed, all reported in plain CAD."),
            ("Google Ads + SEO Integration", "Google Ads keyword data reveals which terms convert — we use that data to prioritise your {name} SEO content calendar. As organic rankings improve over 6–12 months, you can reduce paid spend on those terms and shift budget to new targets."),
            ("Transparent ROAS Reporting — Monthly", "Custom Looker Studio dashboards showing impressions, clicks, conversions, CPL, ROAS, and Quality Scores — segmented by campaign, ad group, and keyword. No vanity metrics. No hiding behind click-through rates. Just {name} revenue data."),
        ],
        "process_h2":     "Our {name} Google Ads Process",
        "process_sub":    "A rigorous five-step Google Ads management framework — refined across 400+ paid search campaigns in competitive Canadian markets like {name}.",
        "process_steps": [
            ("1", "Account Audit", "Full audit of your existing Google Ads account (or from-scratch architecture if new). Identify wasted spend, Quality Score issues, keyword cannibalization, and bidding inefficiencies."),
            ("2", "Campaign Architecture", "Build or restructure campaign structure by intent and funnel stage — branded vs. non-branded, high-intent vs. top-of-funnel — tailored to {name}'s competitive search landscape."),
            ("3", "Ad Copy &amp; Creative", "Write and A/B test responsive search ads, display creatives, and YouTube scripts. Ad copy benchmarked against {name} competitor messaging and landing page CRO principles."),
            ("4", "Bid &amp; Budget Management", "Weekly bid management using target CPA or ROAS strategies. Budget shifted in real-time toward top-performing campaigns. Negative keyword lists updated weekly to eliminate wasted spend."),
            ("5", "Report &amp; Optimise", "Monthly Looker Studio ROAS reports. Quarterly strategy reviews to reassess channel mix, introduce new ad types, and expand into new {name} audience segments."),
        ],
        "pricing_h2":     "Transparent Google Ads Management Pricing for {name} Businesses",
        "pricing_sub":    "All prices in CAD. Flat management fees — no percentage of ad spend. No long-term contracts. Month-to-month with 30 days' notice to cancel.",
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
            ("https://bambinoagency.com/services/analytics", "Reporting", "ROAS Dashboards &amp; Analytics", "Monthly Looker Studio ROAS dashboards showing cost, clicks, conversions, CPL, and ROAS per campaign — in CAD, in Canadian time zones, for your {name} business."),
            ("https://bambinoagency.com/services/seo", "Organic", "SEO Integration", "Use your Google Ads conversion data to inform your {name} SEO content calendar — reducing long-term paid spend as organic rankings capture high-intent keywords organically."),
        ],
        "siblings": [
            {"slug": "seo-agency",                  "label": "SEO Agency",                  "desc": "Organic search that compounds over time — reduce your {name} business's reliance on paid ads with long-term Google rankings."},
            {"slug": "digital-marketing-agency",    "label": "Digital Marketing Agency",    "desc": "Full-service digital marketing — SEO, Google Ads, social media, content, and email — unified in a single {name} growth strategy."},
        ],
        "faqs": [
            ("How much does Google Ads management cost in {name}?", "Bambino charges CA$1,200–CA$6,500/month management fee for Google Ads in {name}, depending on campaign complexity. This is separate from your ad spend budget. Most {name} small businesses start with a CA$1,200–CA$2,500/month management fee and CA$500–CA$2,500/month ad spend. We charge flat management fees — not a percentage of ad spend."),
            ("What is a realistic ROAS for Google Ads in {name}?", "ROAS benchmarks vary by industry. In {name}, ecommerce businesses typically target 3–6x ROAS; service businesses measure cost-per-lead ($40–$180 CAD depending on vertical); B2B campaigns often justify a 2–3x ROAS on high-value contracts. We set ROAS targets in month one based on your specific margins and sales cycle — not generic benchmarks."),
            ("How quickly can Google Ads generate leads for my {name} business?", "Most {name} businesses see their first Google Ads conversions within 2–3 weeks of campaign launch, assuming landing pages are conversion-optimised. Full performance optimization typically takes 60–90 days as Google's algorithm learns from your conversion data. We set 90-day milestones and review at each — not declare success at week one."),
            ("Do you manage Google Shopping and Performance Max campaigns in {name}?", "Yes. We manage the full Google Ads suite: Search, Shopping, Performance Max, Display, Remarketing, and YouTube. For {name} ecommerce businesses, we handle Merchant Center setup, product feed optimization, and Performance Max strategy — and integrate with your CRM or Shopify data for accurate ROAS tracking."),
            ("What ad types do you run for {name} businesses?", "We run Google Search Ads (responsive search), Google Shopping (standard and Performance Max), Display and Remarketing (banner, responsive), YouTube (in-stream, bumper), and Local Service Ads where applicable. The right mix depends on your industry, budget, and whether you're targeting top-of-funnel awareness or bottom-of-funnel conversions in {name}."),
            ("How do you handle conversion tracking for {name} Google Ads campaigns?", "We set up conversion tracking via Google Tag Manager before any campaign goes live — including form submissions, phone calls, ecommerce transactions, and custom events. We verify tracking with test conversions, then connect Google Ads to GA4 for cross-channel attribution. You'll know exactly which keywords and campaigns are driving {name} revenue — not just clicks."),
            ("Can you take over an existing Google Ads account for my {name} business?", "Yes — account takeovers are common. Our first step is a comprehensive audit of your existing campaigns: wasted spend, keyword cannibalization, Quality Score issues, and bidding inefficiencies. Most inherited accounts have 20–40% of budget going to low-intent keywords. We fix the foundations before optimizing for growth."),
            ("Do you manage Google Ads for ecommerce businesses in {name}?", "Yes. For {name} ecommerce businesses, we combine Performance Max, Standard Shopping, and Search campaigns with dynamic remarketing. We optimise product titles and descriptions in the Merchant Center feed, segment campaigns by margin tier, and build separate RLSA strategies for past site visitors."),
            ("What reporting do {name} Google Ads clients receive?", "Monthly Looker Studio dashboards showing impressions, clicks, conversions, cost per conversion, ROAS, and Quality Scores — segmented by campaign, ad group, and keyword. All reporting delivered in CAD, Canadian time zone format. Growth and Scale clients also receive bi-weekly performance calls."),
            ("Is there a minimum ad spend requirement for {name} campaigns?", "We recommend a minimum ad spend of CA$600/month for Search campaigns and CA$1,200/month for Shopping or Performance Max campaigns in {name} to generate statistically meaningful conversion data. Below these thresholds, Google's learning algorithms struggle to optimise effectively. We won't launch campaigns where the budget is too low to produce results."),
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
            f'        <a href="https://bambinoagency.com/ca/{slug}/{s["slug"]}" class="svc-card reveal">\n'
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
    prov = city["province"]
    provf = city["province_full"]
    ctx  = city["context"]
    inds = city["industries"]
    nbhd = city["neighborhoods"]
    eeat = city["eeat_stat"]
    lnd  = city.get("landscape", "")
    ins  = city.get("local_insight", "")
    comp = city.get("competition", "")
    inds_str = ", ".join(inds)

    title   = svc["title"].format(name=nm, province=prov)
    meta    = svc["meta_desc"].format(name=nm, province=prov)
    h1      = svc["h1"].format(name=nm, province=prov)
    hero_s  = svc["hero_sub"].format(name=nm, province=prov, context=ctx)
    s_desc  = svc["schema_desc"].format(name=nm, province=prov)
    og_t    = svc["og_title"].format(name=nm, province=prov)
    og_d    = svc["og_desc"].format(name=nm, province=prov)
    bc_lbl  = svc["breadcrumb"].format(name=nm)
    svc_h2  = svc["services_h2"].format(name=nm)
    svc_sub = svc["services_sub"].format(name=nm)
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
        f'            <li><a href="https://bambinoagency.com/ca/{rc}/{svc_key}" class="related-card reveal">{rn} {rl} &rarr;</a></li>'
        for rc, rn in zip(city["related_cities"], city["related_names"])
    )

    return f"""<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="description" content="{meta}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://bambinoagency.com/ca/{slug}/{svc_key}" />
  <link rel="alternate" hreflang="en-CA" href="https://bambinoagency.com/ca/{slug}/{svc_key}" />
  <link rel="alternate" hreflang="en-GB" href="https://bambinoagency.com/local/manchester/seo-agency" />
  <link rel="alternate" hreflang="x-default" href="https://bambinoagency.com/local/manchester/seo-agency" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{og_t}" />
  <meta property="og:description" content="{og_d}" />
  <meta property="og:url" content="https://bambinoagency.com/ca/{slug}/{svc_key}" />
  <meta property="og:locale" content="en_CA" />
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
        "areaServed": {{"@type": "City", "name": "{nm}", "containedInPlace": {{"@type": "AdministrativeArea", "name": "{provf}"}}}},
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
          {{"@type": "ListItem", "position": 2, "name": "Canada", "item": "https://bambinoagency.com/ca"}},
          {{"@type": "ListItem", "position": 3, "name": "{bc_lbl}", "item": "https://bambinoagency.com/ca/{slug}/{svc_key}"}}
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
    .mobile-menu a{{font-size:1.4rem;font-weight:600;color:var(--text)}}
    .mobile-menu .nav-cta{{font-size:1rem !important;padding:0.8rem 2rem}}
    #hero{{padding:10rem 0 6rem;background:var(--bg)}}
    .hero-inner{{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}}
    .hero-label{{display:inline-block;font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--orange);background:rgba(255,77,0,0.08);padding:0.35rem 0.9rem;border-radius:100px;margin-bottom:1.2rem}}
    .hero-title{{font-family:var(--font-heading);font-size:clamp(2.2rem,4.5vw,3.4rem);line-height:1.1;color:var(--text);margin-bottom:1.4rem}}
    .hero-sub{{font-size:1.05rem;color:var(--muted);line-height:1.75;margin-bottom:2rem;max-width:52ch}}
    .hero-ctas{{display:flex;gap:1rem;flex-wrap:wrap}}
    .hero-visual{{background:var(--green);border-radius:24px;padding:2.5rem;color:#fff}}
    .proof-bar{{display:flex;flex-wrap:wrap;gap:1.5rem;margin-top:2.5rem}}
    .proof-item{{display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;font-weight:600;color:var(--muted)}}
    .proof-item svg{{color:var(--green)}}
    section{{padding:5rem 0}}
    section:nth-child(even){{background:var(--soft)}}
    .market-grid{{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}}
    .insight-cards{{display:grid;grid-template-columns:1fr 1fr;gap:1rem}}
    .insight-card{{background:var(--card);border-radius:var(--radius);padding:1.5rem;box-shadow:var(--shadow);text-align:center}}
    .ins-num{{display:block;font-family:var(--font-heading);font-size:2rem;color:var(--orange);line-height:1.1}}
    .ins-lbl{{display:block;font-size:0.78rem;color:var(--muted);margin-top:0.3rem}}
    .eeat-box{{background:var(--soft);border-left:4px solid var(--green);border-radius:8px;padding:1.2rem 1.5rem;font-size:0.92rem;color:var(--text)}}
    .svc-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;margin-top:2.5rem}}
    .svc-card{{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);border:1px solid var(--border);transition:var(--transition);display:block}}
    .svc-card:hover{{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--orange)}}
    .svc-lbl{{display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--orange);margin-bottom:0.8rem}}
    .svc-card h3{{font-family:var(--font-heading);font-size:1.15rem;color:var(--text);margin-bottom:0.6rem}}
    .svc-card p{{font-size:0.88rem;color:var(--muted);line-height:1.65}}
    .why-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.5rem;margin-top:2.5rem}}
    .why-card{{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow)}}
    .why-card h3{{font-family:var(--font-heading);font-size:1.05rem;color:var(--text);margin-bottom:0.7rem}}
    .why-card p{{font-size:0.88rem;color:var(--muted);line-height:1.65}}
    .process-steps{{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem;margin-top:2.5rem}}
    .step{{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);text-align:center}}
    .step-num{{width:48px;height:48px;border-radius:50%;background:var(--orange);color:#fff;font-family:var(--font-heading);font-size:1.3rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem}}
    .step h4{{font-family:var(--font-heading);font-size:1rem;color:var(--text);margin-bottom:0.5rem}}
    .step p{{font-size:0.85rem;color:var(--muted);line-height:1.6}}
    .results-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}}
    .result-card{{background:var(--green);border-radius:var(--radius);padding:2rem;color:#fff;text-align:center}}
    .result-stat{{display:block;font-family:var(--font-heading);font-size:2.6rem;color:#fff;margin-bottom:0.4rem}}
    .result-desc{{font-weight:700;font-size:0.9rem;margin-bottom:0.8rem}}
    .result-detail{{font-size:0.82rem;color:rgba(255,255,255,0.7);line-height:1.6}}
    .ind-pills{{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1.5rem}}
    .ind-pill{{background:var(--soft);border:1px solid var(--border);border-radius:100px;padding:0.4rem 1rem;font-size:0.82rem;color:var(--text)}}
    .pricing-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem}}
    .price-card{{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);border:1px solid var(--border)}}
    .price-card.featured{{border:2px solid var(--orange);position:relative}}
    .price-card.featured::before{{content:'Most Popular';position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--orange);color:#fff;font-size:0.7rem;font-weight:700;padding:0.25rem 0.8rem;border-radius:100px;white-space:nowrap}}
    .plan-name{{font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);margin-bottom:0.5rem}}
    .plan-price{{font-family:var(--font-heading);font-size:2.4rem;color:var(--text);line-height:1}}
    .plan-price sup{{font-size:1rem;vertical-align:super}}
    .plan-period{{font-size:0.78rem;color:var(--muted);margin:0.4rem 0 1rem}}
    .plan-desc{{font-size:0.85rem;color:var(--muted);margin-bottom:1.2rem;line-height:1.5}}
    .plan-features{{display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1.5rem}}
    .plan-feature{{display:flex;align-items:flex-start;gap:0.5rem;font-size:0.83rem;color:var(--text)}}
    .plan-feature svg{{flex-shrink:0;margin-top:2px;color:var(--green)}}
    .faq-list{{display:flex;flex-direction:column;gap:0.8rem;margin-top:2.5rem;max-width:800px;margin-inline:auto}}
    .faq-item{{background:var(--card);border-radius:var(--radius);border:1px solid var(--border);overflow:hidden}}
    .faq-q{{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1.2rem 1.5rem;background:none;border:none;font-family:var(--font-body);font-weight:600;font-size:0.95rem;color:var(--text);cursor:pointer;text-align:left;gap:1rem}}
    .faq-q svg{{flex-shrink:0;transition:transform var(--transition)}}
    .faq-q[aria-expanded="true"] svg{{transform:rotate(45deg)}}
    .faq-ans{{display:none;padding:0 1.5rem 1.2rem}}
    .faq-ans p{{font-size:0.9rem;color:var(--muted);line-height:1.75}}
    .related-grid{{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem;align-items:flex-start}}
    .related-grid ul{{display:flex;flex-direction:column;gap:0.6rem}}
    .related-card{{background:var(--green);color:#fff;padding:0.6rem 1.2rem;border-radius:100px;font-size:0.85rem;font-weight:600;transition:var(--transition)}}
    .related-card:hover{{background:var(--green-light)}}
    #cta{{background:var(--green);padding:6rem 0}}
    .cta-inner{{text-align:center}}
    .cta-title{{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:#fff;margin-bottom:1rem;line-height:1.15}}
    .cta-sub{{font-size:1rem;color:rgba(255,255,255,0.75);max-width:52ch;margin:0 auto 2rem;line-height:1.75}}
    .btn-white{{display:inline-flex;align-items:center;background:#fff;color:var(--green);font-weight:700;font-size:0.95rem;padding:1rem 2.4rem;border-radius:100px;transition:var(--transition)}}
    .btn-white:hover{{background:var(--soft)}}
    footer{{background:#0D0D0D;padding:4rem 0 2rem;color:rgba(255,255,255,0.6)}}
    .footer-grid{{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem}}
    .footer-brand-logo{{font-family:var(--font-heading);font-size:2rem;color:#fff;margin-bottom:1rem}}
    .footer-brand-desc{{font-size:0.85rem;line-height:1.7;max-width:28ch}}
    .footer-col-title{{font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.4);margin-bottom:1rem}}
    .footer-links{{display:flex;flex-direction:column;gap:0.6rem}}
    .footer-links a{{font-size:0.85rem;color:rgba(255,255,255,0.6);transition:color var(--transition)}}
    .footer-links a:hover{{color:#fff}}
    .footer-bottom{{border-top:1px solid rgba(255,255,255,0.08);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem}}
    .footer-legal{{display:flex;gap:1.5rem}}
    .footer-legal a{{color:rgba(255,255,255,0.4);transition:color var(--transition)}}
    .footer-legal a:hover{{color:#fff}}
    .reveal{{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease}}
    .reveal.visible{{opacity:1;transform:none}}
    @media(max-width:900px){{
      .hero-inner,.market-grid{{grid-template-columns:1fr}}
      .hero-visual{{display:none}}
      .pricing-grid{{grid-template-columns:1fr 1fr}}
      .results-grid{{grid-template-columns:1fr}}
      .footer-grid{{grid-template-columns:1fr 1fr}}
      .nav-links{{display:none}}
      .nav-hamburger{{display:flex}}
      #landscape>.container>div{{grid-template-columns:1fr !important}}
    }}
    @media(max-width:600px){{
      .pricing-grid{{grid-template-columns:1fr}}
      .footer-grid{{grid-template-columns:1fr}}
      .hero-ctas{{flex-direction:column}}
    }}
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
      <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
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
    <div class="container">
      <div class="hero-inner">
        <div>
          <nav aria-label="Breadcrumb">
            <ol style="display:flex;gap:0.5rem;font-size:0.8rem;color:var(--muted);list-style:none;margin-bottom:1rem">
              <li><a href="https://bambinoagency.com" style="color:var(--orange)">Home</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="https://bambinoagency.com/ca" style="color:var(--orange)">Canada</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{bc_lbl}</li>
            </ol>
          </nav>
          <span class="hero-label">{nm}, {prov}</span>
          <h1 id="hero-heading" class="hero-title">{h1}</h1>
          <p class="hero-sub">{hero_s}</p>
          <div class="hero-ctas">
            <a href="https://bambinoagency.com/contact" class="btn-orange">{svc["hero_cta1"]}</a>
            <a href="https://bambinoagency.com/pricing" class="btn-outline">{svc["hero_cta2"]}</a>
          </div>
          <div class="proof-bar">
            <div class="proof-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              4.9★ average client rating
            </div>
            <div class="proof-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              97% client retention rate
            </div>
            <div class="proof-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              400+ UK, US &amp; CA clients
            </div>
            <div class="proof-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              Month-to-month — no lock-in
            </div>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div style="font-family:var(--font-heading);font-size:1.1rem;color:rgba(255,255,255,0.7);margin-bottom:1.5rem">{nm} Growth Snapshot</div>
          <div style="display:flex;flex-direction:column;gap:1.2rem">
            <div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:1.2rem">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);margin-bottom:0.4rem">Avg. organic traffic increase</div>
              <div style="font-family:var(--font-heading);font-size:2rem;color:#FF4D00">+43%</div>
              <div style="font-size:0.75rem;color:rgba(255,255,255,0.4)">Measured at 6 months</div>
            </div>
            <div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:1.2rem">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);margin-bottom:0.4rem">Return on SEO investment</div>
              <div style="font-family:var(--font-heading);font-size:2rem;color:#FF4D00">4.2x</div>
              <div style="font-size:0.75rem;color:rgba(255,255,255,0.4)">12-month average ROSI</div>
            </div>
            <div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:1.2rem">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);margin-bottom:0.4rem">Client retention rate</div>
              <div style="font-family:var(--font-heading);font-size:2rem;color:#FF4D00">97%</div>
              <div style="font-size:0.75rem;color:rgba(255,255,255,0.4)">Across all service tiers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
          <p style="margin-top:1.2rem;font-size:0.85rem;color:var(--muted)">Key neighbourhoods and districts served: {nbhd}.</p>
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
          <span class="section-label">{nm} Market</span>
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
        <p class="section-sub">From {inds[0]} to {inds[2]}, our {nm} specialists understand the unique search behaviour, competitive dynamics, and buyer intent patterns in your industry.</p>
        <div class="ind-pills">
{pills_h}
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" aria-labelledby="pricing-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">CA Pricing</span>
        <h2 id="pricing-heading" class="section-title">{pri_h2}</h2>
        <p class="section-sub" style="margin:0 auto">{svc["pricing_sub"]}</p>
      </div>
      <div class="pricing-grid" style="margin-top:2.5rem">
        <div class="price-card reveal">
          <div class="plan-name">Starter</div>
          <div class="plan-price"><sup>CA$</sup>1,200</div>
          <p class="plan-period">per month + HST/GST</p>
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
          <div class="plan-price"><sup>CA$</sup>2,800</div>
          <p class="plan-period">per month + HST/GST</p>
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
          <div class="plan-price"><sup>CA$</sup>6,500</div>
          <p class="plan-period">per month + HST/GST</p>
          <p class="plan-desc">{p_d["scale"]}</p>
          <ul class="plan-features">
            <li class="plan-feature">{_CHK} Everything in Growth</li>
            <li class="plan-feature">{_CHK} Full AI automation suite</li>
            <li class="plan-feature">{_CHK} CRO programme (A/B testing)</li>
            <li class="plan-feature">{_CHK} Digital PR (3 CA placements/mo)</li>
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
      <p style="text-align:center;margin-top:1.5rem;font-size:0.85rem;color:var(--muted)">All prices in CAD. Prices exclude applicable federal and provincial taxes. <a href="https://bambinoagency.com/pricing" style="color:var(--orange);font-weight:600">See full pricing &rarr;</a></p>
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
        <span class="section-label">Other Canadian Cities</span>
        <h2 id="related-heading" class="section-title">{rl} Services Across Canada</h2>
        <p class="section-sub">Bambino serves businesses across Canada. Explore our services in other major Canadian cities:</p>
      </div>
      <div class="related-grid">
        <ul>
{rel_h}
        </ul>
        <a href="https://bambinoagency.com/ca" class="related-card reveal">View All Canadian Cities &rarr;</a>
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
          <h3 class="footer-col-title">Canadian Cities</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/ca/toronto/seo-agency">Toronto</a></li>
            <li><a href="https://bambinoagency.com/ca/vancouver/seo-agency">Vancouver</a></li>
            <li><a href="https://bambinoagency.com/ca/calgary/seo-agency">Calgary</a></li>
            <li><a href="https://bambinoagency.com/ca/ottawa/seo-agency">Ottawa</a></li>
            <li><a href="https://bambinoagency.com/ca/montreal/seo-agency">Montreal</a></li>
            <li><a href="https://bambinoagency.com/ca">All Canadian Cities &rarr;</a></li>
          </ul>
          <h3 class="footer-col-title" style="margin-top:1.2rem">Also in {nm}</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/ca/{slug}/seo-agency">SEO Agency</a></li>
            <li><a href="https://bambinoagency.com/ca/{slug}/digital-marketing-agency">Digital Marketing</a></li>
            <li><a href="https://bambinoagency.com/ca/{slug}/google-ads-agency">Google Ads</a></li>
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
            <li><a href="tel:+441610000000" style="font-size:0.82rem">+44 161 000 0000</a></li>
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
    // Navbar scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {{
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }}, {{passive:true}});

    // Mobile menu
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    hamburger.addEventListener('click', () => {{
      const isOpen = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = isOpen ? 'none' : 'flex';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    }});
    mobileMenu.querySelectorAll('a').forEach(a => {{
      a.addEventListener('click', () => {{ mobileMenu.style.display = 'none'; }});
    }});

    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {{
      entries.forEach(e => {{ if (e.isIntersecting) {{ e.target.classList.add('visible'); observer.unobserve(e.target); }} }});
    }}, {{threshold: 0.12}});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // FAQ accordion
    document.querySelectorAll('.faq-q').forEach(btn => {{
      btn.addEventListener('click', () => {{
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.faq-q').forEach(b => {{
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.style.display = 'none';
        }});
        if (!expanded) {{
          btn.setAttribute('aria-expanded', 'true');
          btn.nextElementSibling.style.display = 'block';
        }}
      }});
    }});
  </script>
</body>
</html>"""

# ── Generation loop ────────────────────────────────────────────────────────
if __name__ == "__main__":
    total = 0
    for city_slug, city in CITIES.items():
        for svc_key in SERVICES:
            out_dir = os.path.join(BASE, "ca", city_slug, svc_key)
            os.makedirs(out_dir, exist_ok=True)
            html = build_page(city_slug, city, svc_key)
            with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
                f.write(html)
            print(f"OK: /ca/{city_slug}/{svc_key}/")
            total += 1
    print(f"\nDone: {total} CA city pages generated.")
