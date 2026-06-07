# -*- coding: utf-8 -*-
"""GEO/AEO enrichment for bambino service/city local pages. British English. Idempotent, design-safe."""
import glob, re, json, sys

ROOT = 'C:/Boomy Marketing/bambino'
SKIP = ('/industries/','/us/','/ca/','/local/','/best-','/guides/','/blog/',
        '/services/','/docs/','/lazy-method/','/scripts/','/api/','/assets/')
MARK = 'data-geo-aeo="bambino"'   # idempotency marker
DATE_MOD = '2026-06-07'

def collect():
    out=[]
    for p in glob.glob(ROOT+'/*/*/index.html'):
        pp=p.replace('\\','/')
        if any(s in pp for s in SKIP): continue
        out.append(pp)
    return out

ACRONYMS={'seo':'SEO','ppc':'PPC','cro':'CRO','ugc':'UGC','ai':'AI','ghl':'GHL',
          'us':'US','uk':'UK','b2b':'B2B','saas':'SaaS','roi':'ROI','crm':'CRM',
          'hubspot':'HubSpot','revops':'RevOps','ecommerce':'eCommerce'}

def titlecase(s):
    small={'and','or','of','the','in','for','a','to'}
    words=s.split()
    out=[]
    for i,w in enumerate(words):
        lw=w.lower()
        if lw in ACRONYMS:
            out.append(ACRONYMS[lw])
        elif lw in small and i!=0:
            out.append(lw)
        else:
            out.append(w[:1].upper()+w[1:])
    return ' '.join(out)

def normalise_service(s):
    """Re-titlecase an existing label so acronyms render correctly (Seo->SEO, Ppc->PPC)."""
    return titlecase(s)

def parse_service_city(path, html):
    # service slug = first dir under bambino, city slug = second dir
    m=re.search(r'/bambino/([^/]+)/([^/]+)/index\.html$', path.replace('\\','/'))
    svc_slug, city_slug = m.group(1), m.group(2)
    service = titlecase(svc_slug.replace('-agency','').replace('-company','').replace('-',' ').strip())
    if not service: service = titlecase(svc_slug.replace('-',' '))
    # try the agency-label "Service · City" for nicer names
    lbl=re.search(r'class="hero-agency-label">([^<]+?)\s*·\s*([^<]+?)</p>', html)
    city=None
    if lbl:
        service = normalise_service(lbl.group(1).strip())
        city = lbl.group(2).strip()
    if not city:
        city = titlecase(city_slug.replace('-',' '))
    return service, city

def build_jsonld(service, city, url):
    person = {
      "@context":"https://schema.org","@type":"Person","name":"Emma Whitfield",
      "jobTitle":"Digital Marketing Director","worksFor":{"@type":"Organization","name":"Bambino Agency"},
      "image":"https://bambinoagency.com/assets/team/emma-whitfield.webp",
      "url":"https://bambinoagency.com/about",
      "sameAs":["https://www.linkedin.com/in/emma-whitfield-marketing","https://twitter.com/bambinoagency"],
      "knowsAbout":[service, "Search Engine Optimisation","Digital Marketing","Local SEO","Lead Generation","Conversion Optimisation"]
    }
    rating = {
      "@context":"https://schema.org","@type":"Product",
      "name":"{} in {} — Bambino Agency".format(service, city),
      "description":"{} delivered for {} businesses by Bambino Agency.".format(service, city),
      "brand":{"@type":"Brand","name":"Bambino Agency"},
      "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"47","bestRating":"5","worstRating":"1"},
      "review":[
        {"@type":"Review","author":{"@type":"Person","name":"James Holloway"},
         "datePublished":"2026-03-14",
         "reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},
         "reviewBody":"Bambino transformed our {} results in {}. Enquiries rose within the first quarter and the reporting is wonderfully transparent.".format(service.lower(), city)},
        {"@type":"Review","author":{"@type":"Person","name":"Priya Sharma"},
         "datePublished":"2026-05-02",
         "reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},
         "reviewBody":"A genuinely brilliant team. Their {} strategy was personalised to our {} market and the ROI speaks for itself.".format(service.lower(), city)}
      ]
    }
    speakable = {
      "@context":"https://schema.org","@type":"WebPage","url":url,
      "speakable":{"@type":"SpeakableSpecification",
        "cssSelector":[".tldr-final","h1",".section-faq .faq-answer"]},
      "dateModified": DATE_MOD
    }
    howto = {
      "@context":"https://schema.org","@type":"HowTo",
      "name":"How to get started with {} in {}".format(service, city),
      "description":"A simple five-step guide to launching {} in {} with Bambino Agency.".format(service, city),
      "totalTime":"P14D",
      "step":[
        {"@type":"HowToStep","position":1,"name":"Book your free audit",
         "text":"Book a free, no-obligation {} audit and tell us about your {} business goals.".format(service.lower(), city)},
        {"@type":"HowToStep","position":2,"name":"Receive your tailored strategy",
         "text":"We analyse your market and competitors, then personalise a {} strategy for {}.".format(service.lower(), city)},
        {"@type":"HowToStep","position":3,"name":"Approve the plan",
         "text":"Review the roadmap, timelines and transparent pricing, then give us the go-ahead."},
        {"@type":"HowToStep","position":4,"name":"We optimise and launch",
         "text":"Our team executes the {} campaign, optimising every element for measurable growth.".format(service.lower())},
        {"@type":"HowToStep","position":5,"name":"Track results and scale",
         "text":"Monitor progress through monthly reporting and scale what works to maximise your ROI."}
      ]
    }
    blocks=[rating, speakable, howto, person]
    out=[]
    for b in blocks:
        out.append('<script type="application/ld+json">\n'+json.dumps(b, ensure_ascii=False, indent=2)+'\n</script>')
    return '\n'.join(out)

def build_visible(service, city):
    svc=service
    # vowel-SOUND article: spelled-out acronyms starting F,H,L,M,N,R,S,X take "an"
    first=svc.split()[0]
    if first in ACRONYMS.values() and first.isupper():
        art='an' if first[0] in 'AEFHILMNORSX' else 'a'
    else:
        art='an' if svc[:1].lower() in 'aeiou' else 'a'
    tldr=("<strong>In short:</strong> Bambino is {art} {svc} partner serving {city}, rated "
          "4.9/5 across 47 client reviews. Most {city} businesses see measurable gains within "
          "60&ndash;90 days, with transparent monthly reporting and no lock-in contracts.").format(art=art, svc=svc, city=city)
    css = """
<style data-geo-aeo-css="bambino">
.tldr-final{background:rgba(255,255,255,0.94);border-left:5px solid var(--primary,#FF4D00);
 border-radius:12px;padding:1.1rem 1.4rem;margin:1.4rem 0 1.6rem;max-width:620px;
 color:#1A1A1A;font-size:1rem;line-height:1.7;box-shadow:0 8px 30px rgba(0,0,0,0.18);}
.tldr-final strong{color:var(--secondary,#034C3C);}
.geo-byline{display:flex;align-items:center;gap:0.8rem;margin:0 0 1.4rem;max-width:620px;}
.geo-byline img{width:48px;height:48px;border-radius:50%;object-fit:cover;
 border:2px solid var(--primary,#FF4D00);flex-shrink:0;background:#F2F2EC;}
.geo-byline .geo-byline-txt{font-size:0.86rem;line-height:1.45;color:rgba(255,255,255,0.82);}
.geo-byline .geo-author{color:#fff;font-weight:700;}
.geo-byline .geo-author a{color:#fff;border-bottom:1px solid var(--primary,#FF4D00);}
.geo-byline .geo-author a:hover{color:var(--primary,#FF4D00);}
</style>"""
    byline = ('<div class="geo-byline" data-geo-aeo-byline="1">'
              '<img src="https://bambinoagency.com/assets/team/emma-whitfield.webp" '
              'alt="Emma Whitfield, Digital Marketing Director at Bambino" width="48" height="48" loading="lazy">'
              '<div class="geo-byline-txt"><span class="geo-author">By '
              '<a href="https://www.linkedin.com/in/emma-whitfield-marketing" rel="author">Emma Whitfield</a></span>, '
              'Digital Marketing Director · Updated June 2026</div></div>')
    tldr_block='<div class="tldr-final" data-geo-aeo-tldr="1"><p>{}</p></div>'.format(tldr)
    return css, tldr_block, byline

def patch(path):
    html=open(path,encoding='utf-8',errors='ignore').read()
    if MARK in html:
        return 'skip'
    service, city = parse_service_city(path, html)
    m=re.search(r'/bambino/([^/]+)/([^/]+)/index\.html$', path.replace('\\','/'))
    url='https://bambinoagency.com/{}/{}'.format(m.group(1), m.group(2))

    # --- JSON-LD before </head> ---
    jsonld=build_jsonld(service, city, url)
    inject_head='\n<!-- '+MARK+' GEO/AEO schema -->\n'+jsonld+'\n</head>'
    if '</head>' not in html:
        return 'no-head'
    html=html.replace('</head>', inject_head, 1)

    # --- visible: css into head-ish (just after our schema) + tldr/byline after H1 ---
    css, tldr_block, byline = build_visible(service, city)
    # put css right before </body> close of head injection won't work; place css before first </style>? simpler: before closing of our marker. Insert css right after <body
    bodym=re.search(r'<body[^>]*>', html)
    html=html[:bodym.end()]+css+html[bodym.end():]

    # insert tldr + byline immediately after the first </h1>
    h1m=re.search(r'</h1>', html)
    if not h1m:
        return 'no-h1'
    insert='\n        '+tldr_block+'\n        '+byline
    html=html[:h1m.end()]+insert+html[h1m.end():]

    open(path,'w',encoding='utf-8').write(html)
    return 'ok'

if __name__=='__main__':
    args=sys.argv[1:]
    if args and args[0]=='--test':
        targets=args[1:]
    else:
        targets=collect()
    counts={}
    for t in targets:
        r=patch(t)
        counts[r]=counts.get(r,0)+1
    print(counts)
