import re

# ============================================================
# GEO PAGE
# ============================================================
fpath = 'C:/Users/Zver/projects/bambino-agency/services/geo.html'
content = open(fpath, encoding='utf-8').read()

# 1. Update hero stats
old_stats = '<div class="hero-stat-item"><span class="num">3&#xd7;</span><span class="label">Average increase in AI citation frequency within 6 months</span></div>\n          <div class="hero-stat-item"><span class="num">400+</span><span class="label">UK businesses optimised for AI search</span></div>\n          <div class="hero-stat-item"><span class="num">97%</span><span class="label">Client retention rate</span></div>'

new_stats = '<div class="hero-stat-item"><span class="num">18%</span><span class="label">avg. AI citation rate<br><small style="font-size:0.7rem;color:var(--muted)">Industry avg: 2&ndash;4%</small></span></div>\n          <div class="hero-stat-item"><span class="num">+1,600%</span><span class="label">UK demand for GEO<br><small style="font-size:0.7rem;color:var(--muted)">YoY search growth 2025</small></span></div>\n          <div class="hero-stat-item"><span class="num">25%</span><span class="label">UK SMEs with GEO<br><small style="font-size:0.7rem;color:var(--muted)">Only 1 in 4 &mdash; first-mover advantage</small></span></div>'

if old_stats in content:
    content = content.replace(old_stats, new_stats, 1)
    print('geo - hero stats OK')
else:
    print('geo - hero stats NOT FOUND')

# 2. Add platform section after process section (before #stats)
platform_section = '''

  <!-- PLATFORM-SPECIFIC GEO -->
  <section style="padding: 6rem 0; background: var(--bg);">
    <div class="container">
      <div style="text-align: center; margin-bottom: 4rem;">
        <span class="section-label">Platform Intelligence</span>
        <h2 class="section-title">How We Optimise for Each AI Platform</h2>
        <p class="section-sub" style="margin: 0 auto;">ChatGPT, Perplexity, and Google AI Overviews each rank content differently. One-size-fits-all GEO doesn&rsquo;t work &mdash; here&rsquo;s how we tailor strategy per platform.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); border-top: 4px solid #10a37f;">
          <div style="font-size: 1.5rem; margin-bottom: 1rem;">&#128172; ChatGPT / SearchGPT</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 1rem;">Citation Signals</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Brand mentions in authoritative publications (BBC, Guardian, industry press)</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Bing-indexed pages (SearchGPT uses Bing&rsquo;s web index)</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Well-structured FAQ content (passage-level indexing)</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>High domain authority backlink profile</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Entity recognition: consistent NAP, Wikipedia presence, Wikidata</span></li>
          </ul>
        </div>
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); border-top: 4px solid #6366f1;">
          <div style="font-size: 1.5rem; margin-bottom: 1rem;">&#128309; Perplexity AI</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 1rem;">Source Citation Signals</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Direct answer format &mdash; favours pages that answer questions in the first 100 words</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Unique data points (original research, proprietary stats)</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Recency signals &mdash; pages updated within 90 days rank more often</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Structured data: FAQPage, Article schema</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Clean crawlability &mdash; no JavaScript rendering barriers</span></li>
          </ul>
        </div>
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); border-top: 4px solid #4285f4;">
          <div style="font-size: 1.5rem; margin-bottom: 1rem;">&#128311; Google AI Overviews</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 1rem;">AI Overview Signals</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>E-E-A-T signals: author credentials, review dates, bylines</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Featured snippet optimisation (position-zero content structure)</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Core Web Vitals &mdash; slow pages are excluded from AIO sources</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>Semantic richness &mdash; covers topic comprehensively, not just target keyword</span></li>
            <li style="font-size: 0.88rem; color: var(--muted); display: flex; gap: 0.5rem;">&#10003; <span>HTTPS, canonical, mobile-friendly &mdash; technical baseline required</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

'''

old_before_stats = '\n  <section id="stats" aria-label="GEO Results">'
new_before_stats = platform_section + '  <section id="stats" aria-label="GEO Results">'

if old_before_stats in content:
    content = content.replace(old_before_stats, new_before_stats, 1)
    print('geo - platform section OK')
else:
    print('geo - platform section NOT FOUND')

# 3. Add 2 FAQ questions to schema
old_faq_tail = '"Which AI platforms do you optimise for?", "acceptedAnswer": { "@type": "Answer", "text": "We optimise for Google AI Overviews, ChatGPT browsing, Perplexity, and Microsoft Copilot - the four platforms responsible for the vast majority of AI search traffic in the UK. Our strategies include structured data, passage-level citability, and brand authority signals that these platforms prioritise." } }\n        ]'

new_faq_tail = '"Which AI platforms do you optimise for?", "acceptedAnswer": { "@type": "Answer", "text": "We optimise for Google AI Overviews, ChatGPT browsing, Perplexity, and Microsoft Copilot - the four platforms responsible for the vast majority of AI search traffic in the UK. Our strategies include structured data, passage-level citability, and brand authority signals that these platforms prioritise." } },\n          { "@type": "Question", "name": "How is GEO optimisation different for ChatGPT versus Perplexity?", "acceptedAnswer": { "@type": "Answer", "text": "ChatGPT (SearchGPT) relies heavily on Bing web index, brand authority, and entity recognition. Perplexity prioritises pages that answer questions directly in the first 100 words, favour recency (pages updated within 90 days), and use clean HTML without JavaScript barriers. Google AI Overviews weight E-E-A-T signals, featured snippet structure, and Core Web Vitals most heavily. We optimise for all three simultaneously with platform-specific content structures." } },\n          { "@type": "Question", "name": "Which UK industries benefit most from GEO optimisation?", "acceptedAnswer": { "@type": "Answer", "text": "Legal services, financial services, healthcare, and property sectors see the highest GEO ROI because prospects use AI assistants to research high-stakes decisions before contacting providers. A solicitor cited by ChatGPT in an answer about what to do after an accident gains authority before a single click. B2B SaaS and professional services are also high-value GEO sectors where buying decisions are research-heavy." } }\n        ]'

if old_faq_tail in content:
    content = content.replace(old_faq_tail, new_faq_tail, 1)
    print('geo - schema FAQ OK')
else:
    print('geo - schema FAQ NOT FOUND')

open(fpath, 'w', encoding='utf-8').write(content)
print('geo - saved')
wc = len(re.sub('<[^>]+>', ' ', content).split())
print(f'geo - word count: {wc}')

# ============================================================
# VOICE AI PAGE
# ============================================================
fpath = 'C:/Users/Zver/projects/bambino-agency/services/voice-ai.html'
content = open(fpath, encoding='utf-8').read()

use_cases_and_cost = '''
  <!-- UK USE CASES -->
  <section style="padding: 6rem 0; background: var(--bg);">
    <div class="container">
      <div style="text-align: center; margin-bottom: 4rem;">
        <span class="section-label">Real UK Applications</span>
        <h2 class="section-title">Voice AI in Action: UK Use Cases</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
          <div style="font-size: 2rem; margin-bottom: 1rem;">&#129463;</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Dental &amp; GP Practices</h3>
          <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">AI receptionist handles appointment booking and confirmation calls 24/7. Typical result: 35% reduction in no-shows, 4&times; call capacity without additional staff.</p>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">&pound;1,200&ndash;&pound;1,800/month &rarr; saves 1+ full-time receptionist</div>
        </div>
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
          <div style="font-size: 2rem; margin-bottom: 1rem;">&#127968;</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Estate Agents &amp; Property</h3>
          <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">AI handles viewing requests, mortgage enquiry qualification, and vendor callbacks instantly. Agents respond only to pre-qualified, high-intent leads.</p>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">3&times; more viewings booked from same enquiry volume</div>
        </div>
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
          <div style="font-size: 2rem; margin-bottom: 1rem;">&#128295;</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Trades &amp; Home Services</h3>
          <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">Plumbers, electricians, and builders miss 40&ndash;60% of inbound calls on-site. Voice AI answers every call, qualifies the job, and books a callback or site visit automatically.</p>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">40% more leads captured from existing call volume</div>
        </div>
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
          <div style="font-size: 2rem; margin-bottom: 1rem;">&#9878;&#65039;</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Legal Services &amp; Solicitors</h3>
          <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">Initial enquiry screening, conflict-of-interest checks, and matter type qualification &mdash; completed by AI before a fee-earner picks up. Compliance-ready, GDPR-compliant recordings.</p>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">Fee-earner time on calls reduced by 65%</div>
        </div>
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
          <div style="font-size: 2rem; margin-bottom: 1rem;">&#127869;&#65039;</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Hospitality &amp; Restaurants</h3>
          <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">Table reservations, special occasion requests, dietary requirements &mdash; handled automatically, 7 days/week. Integration with OpenTable, ResDiary, and most booking systems.</p>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">Zero missed reservation calls</div>
        </div>
        <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow);">
          <div style="font-size: 2rem; margin-bottom: 1rem;">&#128202;</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.75rem;">Financial Services &amp; Accountants</h3>
          <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem;">Prospect qualification (assets, tax situation, company size), appointment booking, and client satisfaction surveys &mdash; automated and FCA-framework aware.</p>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--orange);">Qualified prospect pipeline doubled in 60 days</div>
        </div>
      </div>
    </div>
  </section>

  <!-- COST COMPARISON -->
  <section style="padding: 5rem 0; background: var(--soft);">
    <div class="container">
      <h2 class="section-title" style="text-align: center; margin-bottom: 3rem;">Voice AI vs Human Receptionist: Cost Comparison</h2>
      <div style="max-width: 700px; margin: 0 auto; background: var(--card); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow);">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: var(--green); color: #fff;">
              <th style="padding: 1rem 1.5rem; text-align: left;">Cost Factor</th>
              <th style="padding: 1rem; text-align: center;">Human Receptionist</th>
              <th style="padding: 1rem; text-align: center; color: var(--orange);">Voice AI</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Monthly cost</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--muted);">&pound;2,000&ndash;&pound;2,800</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">&pound;997&ndash;&pound;2,500</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.02);">
              <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Hours available</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--muted);">40 hrs/week</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">168 hrs/week (24/7)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Simultaneous calls</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--muted);">1</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">Unlimited</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.02);">
              <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Cost per call</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--muted);">&pound;9&ndash;&pound;12</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">&pound;0.24&ndash;&pound;0.40</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Sick days / holidays</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--muted);">28 days/year</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">Zero</td>
            </tr>
            <tr>
              <td style="padding: 0.9rem 1.5rem; font-weight: 600;">Setup time</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--muted);">4&ndash;6 weeks hiring</td>
              <td style="padding: 0.9rem; text-align: center; color: var(--orange); font-weight: 700;">2&ndash;3 weeks live</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

'''

old_before_process = '\n  <section id="process" aria-labelledby="process-heading">\n    <div class="container">\n      <div class="process-header reveal">\n        <span class="section-label">How It Works</span>\n        <h2 id="process-heading" class="section-title">Our 4-Step Process</h2>'
new_before_process = use_cases_and_cost + '  <section id="process" aria-labelledby="process-heading">\n    <div class="container">\n      <div class="process-header reveal">\n        <span class="section-label">How It Works</span>\n        <h2 id="process-heading" class="section-title">Our 4-Step Process</h2>'

if old_before_process in content:
    content = content.replace(old_before_process, new_before_process, 1)
    print('voice-ai - use cases + cost table OK')
else:
    print('voice-ai - process anchor NOT FOUND')

open(fpath, 'w', encoding='utf-8').write(content)
print('voice-ai - saved')
wc = len(re.sub('<[^>]+>', ' ', content).split())
print(f'voice-ai - word count: {wc}')

# ============================================================
# AI OUTBOUND PAGE
# ============================================================
fpath = 'C:/Users/Zver/projects/bambino-agency/services/ai-outbound.html'
content = open(fpath, encoding='utf-8').read()

old_stat_meetings = '<div class="hero-stat-item"><span class="num">3x</span><span class="label">More qualified meetings booked compared to manual outbound</span></div>'
new_stat_meetings = '<div class="hero-stat-item"><span class="num">3x</span><span class="label">More qualified meetings<br><small style="font-size:0.7rem;color:var(--muted)">vs manual outbound baseline</small></span></div>'

old_stat_research = '<div class="hero-stat-item"><span class="num">90%</span><span class="label">Reduction in time spent on manual prospecting research</span></div>'
new_stat_research = '<div class="hero-stat-item"><span class="num">90%</span><span class="label">Less time on prospecting<br><small style="font-size:0.7rem;color:var(--muted)">vs manual research process</small></span></div>'

old_stat_reply = '<div class="hero-stat-item"><span class="num">18%</span><span class="label">Average positive reply rate across UK outbound campaigns</span></div>'
new_stat_reply = '<div class="hero-stat-item"><span class="num">18%</span><span class="label">Avg positive reply rate<br><small style="font-size:0.7rem;color:var(--muted)">Industry avg: 2&ndash;5%</small></span></div>'

for old, new, label in [(old_stat_meetings, new_stat_meetings, 'meetings'), (old_stat_research, new_stat_research, 'research'), (old_stat_reply, new_stat_reply, 'reply')]:
    if old in content:
        content = content.replace(old, new, 1)
        print(f'ai-outbound - stat {label} OK')
    else:
        print(f'ai-outbound - stat {label} NOT FOUND')

scale_section = '''
  <!-- SCALE COMPARISON -->
  <section style="padding: 5rem 0; background: var(--soft);">
    <div class="container">
      <h2 class="section-title" style="text-align:center;margin-bottom:3rem;">AI Outbound vs Manual Sales: The Numbers</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;max-width:900px;margin:0 auto;">
        <div style="background:var(--card);border-radius:var(--radius);padding:2rem;text-align:center;box-shadow:var(--shadow);">
          <div style="font-family:var(--font-heading);font-size:2.5rem;color:var(--orange);margin-bottom:0.5rem;">&pound;0.35</div>
          <div style="font-size:0.88rem;color:var(--muted);">Cost per AI outbound touchpoint<br><strong style="color:var(--text)">vs &pound;12&ndash;&pound;18 human SDR equivalent</strong></div>
        </div>
        <div style="background:var(--card);border-radius:var(--radius);padding:2rem;text-align:center;box-shadow:var(--shadow);">
          <div style="font-family:var(--font-heading);font-size:2.5rem;color:var(--orange);margin-bottom:0.5rem;">500+</div>
          <div style="font-size:0.88rem;color:var(--muted);">Personalised contacts per week<br><strong style="color:var(--text)">vs 50&ndash;80 for a human SDR</strong></div>
        </div>
        <div style="background:var(--card);border-radius:var(--radius);padding:2rem;text-align:center;box-shadow:var(--shadow);">
          <div style="font-family:var(--font-heading);font-size:2.5rem;color:var(--orange);margin-bottom:0.5rem;">18%</div>
          <div style="font-size:0.88rem;color:var(--muted);">Avg positive reply rate<br><strong style="color:var(--text)">vs 2&ndash;5% industry cold email average</strong></div>
        </div>
      </div>
    </div>
  </section>

'''

old_before_pricing = '\n  <section id="pricing-teaser" aria-labelledby="pricing-heading">'
new_before_pricing = scale_section + '  <section id="pricing-teaser" aria-labelledby="pricing-heading">'

if old_before_pricing in content:
    content = content.replace(old_before_pricing, new_before_pricing, 1)
    print('ai-outbound - scale section OK')
else:
    print('ai-outbound - pricing-teaser NOT FOUND')

open(fpath, 'w', encoding='utf-8').write(content)
print('ai-outbound - saved')
wc = len(re.sub('<[^>]+>', ' ', content).split())
print(f'ai-outbound - word count: {wc}')

# ============================================================
# AI AUTOMATIONS PAGE
# ============================================================
fpath = 'C:/Users/Zver/projects/bambino-agency/services/ai-automations.html'
content = open(fpath, encoding='utf-8').read()

roi_section = '''
  <!-- ROI CALCULATOR -->
  <section style="padding: 5rem 0; background: var(--soft);">
    <div class="container">
      <h2 class="section-title" style="text-align:center;margin-bottom:3rem;">What 30 Hours Saved Per Week Actually Means</h2>
      <div style="max-width:700px;margin:0 auto;background:var(--card);border-radius:var(--radius);padding:2.5rem;box-shadow:var(--shadow);">
        <p style="font-size:0.95rem;color:var(--muted);line-height:1.75;margin-bottom:2rem;">The &ldquo;30 hours saved&rdquo; headline sounds good. Here&rsquo;s what it means in practice for a typical UK SME (10-person team, average staff cost &pound;35,000/year):</p>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border);">
            <span style="font-size:0.9rem;">Hours saved per week</span>
            <strong>30 hrs</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border);">
            <span style="font-size:0.9rem;">Annual hours reclaimed</span>
            <strong>1,560 hrs</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border);">
            <span style="font-size:0.9rem;">Equivalent staff cost (&pound;17/hr)</span>
            <strong style="color:var(--orange);">&pound;26,520/year</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border);">
            <span style="font-size:0.9rem;">AI automation retainer</span>
            <strong>&pound;11,964/year (&pound;997/mo)</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:1rem;background:rgba(255,77,0,0.05);border-radius:8px;margin-top:0.5rem;">
            <span style="font-weight:700;">Net annual saving</span>
            <strong style="color:var(--orange);font-size:1.1rem;">&pound;14,556</strong>
          </div>
        </div>
        <p style="font-size:0.82rem;color:var(--muted);margin-top:1.5rem;">*Based on UK median hourly rate for admin/marketing roles. Actual results vary by business type and automation scope.</p>
      </div>
    </div>
  </section>

'''

old_before_cta = '\n  <section id="cta-section" aria-labelledby="cta-heading">'
new_before_cta = roi_section + '  <section id="cta-section" aria-labelledby="cta-heading">'

if old_before_cta in content:
    content = content.replace(old_before_cta, new_before_cta, 1)
    print('ai-automations - ROI section OK')
else:
    print('ai-automations - cta-section NOT FOUND')

open(fpath, 'w', encoding='utf-8').write(content)
print('ai-automations - saved')
wc = len(re.sub('<[^>]+>', ' ', content).split())
print(f'ai-automations - word count: {wc}')

print('\nAll done.')
