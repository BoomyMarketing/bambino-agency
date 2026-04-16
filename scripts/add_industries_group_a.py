import re

industries = {
    'seo.html': {
        'label': 'eCommerce, Legal, Property, Healthcare, SaaS, Professional Services, Hospitality, Education',
        'items': ['eCommerce & Retail', 'Legal & Professional Services', 'Property & Construction', 'Healthcare & Wellness', 'SaaS & Technology', 'Financial Services', 'Hospitality & Tourism', 'Education & Training']
    },
    'google-ads.html': {
        'label': 'eCommerce, Legal, Property, Financial Services, Healthcare, SaaS, Local Services',
        'items': ['eCommerce & Retail', 'Legal Services', 'Property & Estate Agents', 'Financial Services', 'Healthcare & Medical', 'SaaS & Technology', 'Local Trade Services', 'B2B Professional Services']
    },
    'meta-ads.html': {
        'label': 'eCommerce, Fashion, Hospitality, Fitness, Education, Property, Beauty, Retail',
        'items': ['eCommerce & Fashion', 'Hospitality & Food', 'Fitness & Wellness', 'Education & Courses', 'Property & Interiors', 'Beauty & Cosmetics', 'Retail & Consumer Goods', 'Events & Entertainment']
    },
    'web-design.html': {
        'label': 'Startups, eCommerce, Professional Services, Healthcare, SaaS, Property, Legal, Education',
        'items': ['Startups & Scale-ups', 'eCommerce & Retail', 'Professional Services', 'Healthcare & Medical', 'SaaS & Tech Products', 'Property & Construction', 'Legal & Finance', 'Education & Non-profit']
    },
    'content-marketing.html': {
        'label': 'B2B, SaaS, eCommerce, Legal, Healthcare, Finance, Property, Education',
        'items': ['B2B & Professional Services', 'SaaS & Technology', 'eCommerce & Retail', 'Legal & Compliance', 'Healthcare & Pharma', 'Finance & Fintech', 'Property & Construction', 'Education & Training']
    },
    'ppc.html': {
        'label': 'eCommerce, Legal, Property, Finance, Healthcare, SaaS, Local Services, B2B',
        'items': ['eCommerce & Retail', 'Legal Services', 'Property & Estate Agents', 'Finance & Insurance', 'Healthcare & Clinics', 'SaaS & Software', 'Local Trade Services', 'B2B Manufacturing']
    },
}

industry_section_tmpl = '''
  <!-- INDUSTRIES -->
  <section id="industries" aria-labelledby="industries-heading" style="padding: 5rem 0; background: var(--soft);">
    <div class="container">
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="section-label">Who We Help</span>
        <h2 id="industries-heading" class="section-title">Industries We Serve</h2>
        <p class="section-sub" style="margin: 0 auto;">We work with UK businesses across {label}. Every sector has different audiences, seasonality, and competitive dynamics — our strategies reflect that.</p>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; max-width: 800px; margin: 0 auto;">
        {tags}
      </div>
    </div>
  </section>

  <section id="faq"'''

tag_tmpl = '<span style="background: var(--card); border: 1.5px solid var(--border); border-radius: 100px; padding: 0.5rem 1.2rem; font-size: 0.88rem; font-weight: 500; color: var(--text);">{item}</span>'

for fname, data in industries.items():
    fpath = 'C:/Users/Zver/projects/bambino-agency/services/' + fname
    content = open(fpath, encoding='utf-8').read()

    tags = '\n        '.join([tag_tmpl.format(item=i) for i in data['items']])
    section = industry_section_tmpl.format(label=data['label'], tags=tags)

    # Insert before the FAQ section
    old = '\n  <section id="faq"'
    if old in content:
        content = content.replace(old, section, 1)
        print(fname, '- industries inserted OK')
    else:
        print(fname, '- FAQ anchor NOT FOUND')

    open(fpath, 'w', encoding='utf-8').write(content)

print('Industries done')
