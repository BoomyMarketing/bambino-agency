import re, sys

additions = {
    'seo.html': {
        'schema': [
            ('How do you build backlinks for UK websites?', 'We focus on quality over quantity - acquiring links from authoritative UK publications, industry directories, and relevant blogs. We never use black-hat link schemes. Every backlink we build is editorially placed and aligned with Google UK guidelines.'),
            ('How do you measure SEO success?', 'We track keyword rankings in Google UK, organic traffic from Google Search Console, conversion rates from organic visitors, and revenue attributed to organic search. You receive a clear monthly report with all metrics explained in plain English - no vanity stats, only metrics that matter to your bottom line.'),
        ],
        'html': [
            ('How do you build backlinks for UK websites?', 'We focus on quality over quantity - acquiring links from authoritative UK publications, industry directories, and relevant blogs. We never use black-hat link schemes. Every backlink is editorially placed and aligned with Google UK guidelines.'),
            ('How do you measure SEO success?', 'We track keyword rankings in Google UK, organic traffic from Google Search Console, conversion rates from organic visitors, and revenue attributed to organic search. You receive a clear monthly report - no vanity stats, only metrics that matter to your bottom line.'),
        ]
    },
    'google-ads.html': {
        'schema': [
            ('How do you ensure we do not waste budget on irrelevant clicks?', 'We build tightly-themed ad groups with negative keyword lists updated weekly, match type strategies that protect your budget, and conversion tracking on every meaningful action. Our aim is profitable clicks, not cheap clicks.'),
            ('Do you have experience with Google Ads in competitive UK markets?', 'Yes - we manage campaigns across legal, property, financial services, healthcare, eCommerce, and professional services in the UK. Competitive markets require smarter bidding, better ad creative, and stronger landing pages - which is exactly where our certified team excels.'),
        ],
        'html': [
            ('How do you ensure we don\'t waste budget on irrelevant clicks?', 'We build tightly-themed ad groups with negative keyword lists updated weekly, match type strategies that protect your budget, and conversion tracking on every meaningful action. Our aim is profitable clicks, not cheap ones.'),
            ('Do you have experience with Google Ads in competitive UK markets?', 'Yes - we manage campaigns across legal, property, financial services, healthcare, eCommerce and professional services in the UK. Competitive markets need smarter bidding, better creative, and stronger landing pages - which is where our certified team excels.'),
        ]
    },
    'meta-ads.html': {
        'schema': [
            ('How long before we see results from Meta Ads?', 'Most campaigns enter a learning phase of 7-14 days as the algorithm optimises delivery. After that, you typically see stable results within 4-6 weeks. E-commerce clients often see earlier results via catalogue-based shopping campaigns.'),
            ('Do you comply with UK GDPR when running Meta Ads?', 'Yes. We ensure all pixel implementations include appropriate consent mechanisms, retargeting audiences are built on consent-based data, and ad targeting complies with UK ICO guidelines. We will not run campaigns that risk your GDPR compliance.'),
        ],
        'html': [
            ('How long before we see results from Meta Ads?', 'Campaigns enter a learning phase of 7-14 days as the algorithm optimises. After that, stable results typically appear within 4-6 weeks. E-commerce clients often see earlier returns via catalogue-based shopping campaigns.'),
            ('Do you comply with UK GDPR when running Meta Ads?', 'Yes. All pixel implementations include appropriate consent mechanisms, retargeting audiences are built on consent-based data, and targeting complies with UK ICO guidelines. We will not run campaigns that risk your GDPR compliance.'),
        ]
    },
    'web-design.html': {
        'schema': [
            ('Will my website be fast and pass Core Web Vitals?', 'Yes - website performance is central to how we build. We optimise every site for Core Web Vitals (LCP, INP, CLS), ensuring fast loading, smooth interactivity, and visual stability. This directly impacts both your SEO rankings and your conversion rate.'),
            ('Do you offer ongoing website support after launch?', 'Yes. We offer ongoing maintenance retainers that cover security updates, performance monitoring, content changes, and conversion optimisation. Many clients keep us on monthly after launch to continue improving their site performance.'),
        ],
        'html': [
            ('Will my website be fast and pass Core Web Vitals?', 'Website performance is central to how we build. We optimise every site for Core Web Vitals (LCP, INP, CLS), ensuring fast loading, smooth interactivity, and visual stability - which directly impacts your SEO and conversion rate.'),
            ('Do you offer ongoing website support after launch?', 'Yes. We offer maintenance retainers covering security updates, performance monitoring, content changes, and conversion optimisation. Many clients keep us on monthly after launch to continuously improve their site.'),
        ]
    },
    'content-marketing.html': {
        'schema': [
            ('How do you ensure content ranks on Google UK?', 'Every piece of content is built around keyword research specific to UK search behaviour, includes E-E-A-T signals, and is structured for both search engines and real readers. We also conduct competitor gap analysis to identify quick-win ranking opportunities.'),
            ('Can content marketing work alongside paid advertising?', 'Absolutely - and it is a powerful combination. Content marketing builds long-term organic visibility and authority, while paid ads drive immediate traffic. Together, they create a full-funnel strategy that reaches your audience at every stage of their buying journey.'),
        ],
        'html': [
            ('How do you ensure content ranks on Google UK?', 'Every piece is built around UK-specific keyword research, includes E-E-A-T signals, and is structured for both search engines and real readers. We also conduct competitor gap analysis to identify quick-win ranking opportunities.'),
            ('Can content marketing work alongside paid advertising?', 'Absolutely - it is a powerful combination. Content builds long-term organic authority while paid ads drive immediate traffic. Together, they create a full-funnel strategy reaching your audience at every stage of their buying journey.'),
        ]
    },
    'ppc.html': {
        'schema': [
            ('What reporting do you provide for PPC campaigns?', 'Monthly detailed reports covering impressions, clicks, CTR, CPC, conversions, CPA, and ROAS - all benchmarked against your industry and previous periods. We explain what changed, why it changed, and what we are optimising next. No jargon, just clear commercial insights.'),
            ('Do you manage PPC for eCommerce businesses in the UK?', 'Yes - eCommerce PPC is one of our specialisms. We manage Shopping campaigns, Performance Max, Dynamic Search Ads, and remarketing for UK online retailers. We are experienced with Shopify, WooCommerce, and custom eCommerce platforms.'),
        ],
        'html': [
            ('What reporting do you provide for PPC campaigns?', 'Monthly reports covering impressions, clicks, CTR, CPC, conversions, CPA, and ROAS - benchmarked against your industry and previous periods. We explain what changed, why, and what we are optimising next. No jargon, just clear commercial insights.'),
            ('Do you manage PPC for eCommerce businesses in the UK?', 'Yes - eCommerce PPC is a specialism. We manage Shopping campaigns, Performance Max, Dynamic Search Ads, and remarketing for UK retailers. Experienced with Shopify, WooCommerce, and custom eCommerce platforms.'),
        ]
    },
}

plus_svg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'

for fname, data in additions.items():
    fpath = 'C:/Users/Zver/projects/bambino-agency/services/' + fname
    content = open(fpath, encoding='utf-8').read()

    # 1. Add to schema FAQPage - find the closing pattern of mainEntity array
    schema_inserts = ''
    for q, a in data['schema']:
        schema_inserts += ',\n          { "@type": "Question", "name": "' + q + '", "acceptedAnswer": { "@type": "Answer", "text": "' + a + '" } }'

    # The last question in schema ends with: } }\n        ]\n      },
    old_schema_end = '} }\n        ]\n      },'
    new_schema_end = '} }' + schema_inserts + '\n        ]\n      },'
    if old_schema_end in content:
        content = content.replace(old_schema_end, new_schema_end, 1)
        print(fname, '- schema OK')
    else:
        print(fname, '- schema pattern NOT FOUND, trying alternative')
        # Try: } }\n        ]\n      }\n    ]
        alt = '} }\n        ]\n      }\n    ]'
        if alt in content:
            content = content.replace(alt, '} }' + schema_inserts + '\n        ]\n      }\n    ]', 1)
            print(fname, '- schema alt OK')
        else:
            print(fname, '- SCHEMA FAILED')

    # 2. Add HTML faq-items before closing of faq-list
    html_inserts = ''
    for q, a in data['html']:
        html_inserts += '\n        <div class="faq-item">\n          <button class="faq-question" aria-expanded="false">' + q + plus_svg + '</button>\n          <div class="faq-answer"><p>' + a + '</p></div>\n        </div>'

    # Find: </div>\n      </div>\n    </div>\n  </section>\n\n  <section id="cta-section"
    old_html = '</div>\n      </div>\n    </div>\n  </section>\n\n  <section id="cta-section"'
    new_html = html_inserts + '\n      </div>\n    </div>\n  </section>\n\n  <section id="cta-section"'
    if old_html in content:
        # Replace only once (last occurrence in faq section)
        idx = content.rfind(old_html)
        content = content[:idx] + new_html + content[idx+len(old_html):]
        print(fname, '- HTML OK')
    else:
        print(fname, '- HTML pattern NOT FOUND')

    open(fpath, 'w', encoding='utf-8').write(content)

print('All done')
