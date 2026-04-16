industries = {
    'geo.html': {
        'label': 'Local Services, Hospitality, Retail, Healthcare, Property, Legal, Food & Drink, Fitness',
        'items': ['Local Trade Services', 'Hospitality & Restaurants', 'Retail & High Street', 'Healthcare & Clinics', 'Property & Estate Agents', 'Legal & Solicitors', 'Food & Drink', 'Fitness & Leisure']
    },
    'email-marketing.html': {
        'label': 'eCommerce, SaaS, B2B, Healthcare, Finance, Education, Hospitality, Professional Services',
        'items': ['eCommerce & Retail', 'SaaS & Software', 'B2B Professional Services', 'Healthcare & Wellness', 'Finance & Insurance', 'Education & Training', 'Hospitality & Events', 'Charities & Non-profit']
    },
    'social-media.html': {
        'label': 'eCommerce, Hospitality, Fashion, Fitness, Property, Beauty, Education, Events',
        'items': ['eCommerce & Fashion', 'Hospitality & Food', 'Fitness & Wellness', 'Property & Interiors', 'Beauty & Lifestyle', 'Education & Coaching', 'Events & Entertainment', 'B2B & Professional']
    },
    'ai-automations.html': {
        'label': 'Legal, Property, Healthcare, Finance, eCommerce, SaaS, Professional Services, Recruitment',
        'items': ['Legal Services', 'Property & Estate Agents', 'Healthcare & Clinics', 'Finance & Accountancy', 'eCommerce & Retail', 'SaaS & Technology', 'Recruitment & HR', 'Professional Services']
    },
    'ai-development.html': {
        'label': 'SaaS, Fintech, Healthcare, Retail, Legal, Logistics, Education, Manufacturing',
        'items': ['SaaS Startups & Scale-ups', 'Fintech & Finance', 'Healthcare & MedTech', 'Retail & eCommerce', 'Legal Technology', 'Logistics & Supply Chain', 'EdTech & Training', 'Manufacturing & Industry']
    },
    'ai-outbound.html': {
        'label': 'SaaS, B2B Services, Recruitment, Property, Finance, Legal, Consulting, Technology',
        'items': ['SaaS & Software Sales', 'B2B Professional Services', 'Recruitment & Staffing', 'Property & Commercial Real Estate', 'Finance & Investment', 'Legal & Compliance', 'Management Consulting', 'Technology & IT Services']
    },
    'voice-ai.html': {
        'label': 'Healthcare, Legal, Property, Finance, Hospitality, Retail, Trade Services, Insurance',
        'items': ['Healthcare & Clinics', 'Legal Services', 'Property & Estate Agents', 'Finance & Insurance', 'Hospitality & Bookings', 'Retail & eCommerce', 'Trade & Home Services', 'Customer Support Centres']
    },
    'saas-products.html': {
        'label': 'Fintech, HealthTech, PropTech, LegalTech, EdTech, HR Tech, LogisticsTech, B2B SaaS',
        'items': ['Fintech & Payments', 'HealthTech & MedTech', 'PropTech & Real Estate', 'LegalTech & Compliance', 'EdTech & Learning', 'HR Tech & Recruitment', 'Logistics & Supply Chain', 'B2B Enterprise SaaS']
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

    if 'Industries We Serve' in content:
        print(fname, '- already has industries, skipping')
        continue

    tags = '\n        '.join([tag_tmpl.format(item=i) for i in data['items']])
    section = industry_section_tmpl.format(label=data['label'], tags=tags)

    old = '\n  <section id="faq"'
    if old in content:
        content = content.replace(old, section, 1)
        print(fname, '- industries inserted OK')
    else:
        print(fname, '- FAQ anchor NOT FOUND')

    open(fpath, 'w', encoding='utf-8').write(content)

print('Done')
