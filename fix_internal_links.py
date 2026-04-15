"""
fix_internal_links.py — M6
1. Виправляє footer legal links на local pages
   /contact → /privacy-policy, /terms, /cookie-policy
2. Оновлює "Top Locations" у service pages — показує правильний service slug
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

# Mapping: service filename → local slug + display name
SERVICE_TO_LOCAL = {
    'seo':                ('seo-agency',               'SEO'),
    'google-ads':         ('google-ads-agency',         'Google Ads'),
    'ppc':                ('ppc-agency',                'PPC'),
    'social-media':       ('social-media-agency',       'Social Media'),
    'web-design':         ('web-design-company',        'Web Design'),
    'email-marketing':    ('email-marketing-agency',    'Email Marketing'),
    'ai-automations':     ('ai-automation-agency',      'AI Automation'),
    'content-marketing':  ('content-marketing-agency',  'Content Marketing'),
    'meta-ads':           ('seo-agency',                'SEO'),   # no meta-ads local → fallback SEO
    'ai-development':     ('seo-agency',                'SEO'),   # no local → fallback
    'ai-outbound':        ('seo-agency',                'SEO'),
    'saas-products':      ('seo-agency',                'SEO'),
    'voice-ai':           ('seo-agency',                'SEO'),
    'geo':                ('seo-agency',                'SEO'),
}

TOP_CITIES = ['manchester', 'london', 'birmingham', 'leeds', 'bristol', 'edinburgh', 'glasgow', 'newcastle']

def build_locations_html(local_slug, label):
    """Будує новий Top Locations список для service page."""
    lines = []
    for city in TOP_CITIES:
        city_label = city.capitalize()
        lines.append(f'            <li><a href="https://bambinoagency.com/local/{city}/{local_slug}">{label} {city_label}</a></li>')
    return '\n'.join(lines)

def fix_service_page(filepath):
    """Оновлює Top Locations у service page footer."""
    stem = os.path.splitext(os.path.basename(filepath))[0]
    mapping = SERVICE_TO_LOCAL.get(stem)
    if not mapping:
        return False

    local_slug, label = mapping

    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # Замінити блок Top Locations
    new_locations = build_locations_html(local_slug, label)
    content = re.sub(
        r'(<h3 class="footer-col-title">Top Locations</h3>\s*<ul class="footer-links"[^>]*>\s*)([^<][\s\S]*?)(\s*</ul>)',
        lambda m: m.group(1) + '\n' + new_locations + '\n          ' + m.group(3),
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def fix_local_legal_links(filepath):
    """Виправляє footer legal links на local pages."""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # Замінити href до Privacy Policy, Terms, Cookie Policy
    # Зараз всі три вказують на /contact
    content = re.sub(
        r'(<a href="https://bambinoagency\.com/contact">Privacy Policy</a>)',
        '<a href="https://bambinoagency.com/privacy-policy">Privacy Policy</a>',
        content
    )
    content = re.sub(
        r'(<a href="https://bambinoagency\.com/contact">Terms of Service</a>)',
        '<a href="https://bambinoagency.com/terms">Terms of Service</a>',
        content
    )
    content = re.sub(
        r'(<a href="https://bambinoagency\.com/contact">Cookie Policy</a>)',
        '<a href="https://bambinoagency.com/cookie-policy">Cookie Policy</a>',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    # 1. Fix service pages Top Locations
    svc_changed = 0
    services_dir = os.path.join(ROOT, 'services')
    for filename in os.listdir(services_dir):
        if not filename.endswith('.html'):
            continue
        filepath = os.path.join(services_dir, filename)
        try:
            if fix_service_page(filepath):
                svc_changed += 1
                print(f'  Services FIXED: {filename}')
        except Exception as e:
            print(f'  ERROR {filename}: {e}')

    print(f'Service pages updated: {svc_changed}')

    # 2. Fix local pages legal links
    local_changed = 0
    local_dir = os.path.join(ROOT, 'local')
    for dirpath, dirnames, filenames in os.walk(local_dir):
        dirnames[:] = [d for d in dirnames if d != '.git']
        for filename in filenames:
            if not filename.endswith('.html'):
                continue
            filepath = os.path.join(dirpath, filename)
            try:
                if fix_local_legal_links(filepath):
                    local_changed += 1
            except Exception as e:
                print(f'  ERROR {filepath}: {e}')

    print(f'Local pages legal links fixed: {local_changed}')

if __name__ == '__main__':
    main()
