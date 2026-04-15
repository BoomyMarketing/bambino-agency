"""
fix_meta_descriptions.py
Замінює шаблонні обрізані meta descriptions у local pages
на унікальні, < 155 символів, без "..."
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

# Людський лейбл для кожного service slug
SERVICE_LABELS = {
    'seo-agency':                ('SEO agency', 'SEO services'),
    'seo-company':               ('SEO company', 'SEO'),
    'ppc-agency':                ('PPC agency', 'pay-per-click advertising'),
    'ai-automation-agency':      ('AI automation agency', 'AI automation'),
    'ai-automation':             ('AI automation agency', 'AI automation'),
    'content-marketing-agency':  ('content marketing agency', 'content marketing'),
    'digital-marketing-agency':  ('digital marketing agency', 'digital marketing'),
    'email-marketing-agency':    ('email marketing agency', 'email marketing'),
    'google-ads-agency':         ('Google Ads agency', 'Google Ads'),
    'social-media-agency':       ('social media agency', 'social media marketing'),
    'web-design-company':        ('web design company', 'web design'),
    'web-development-company':   ('web development company', 'web development'),
    'paid-search-agency':        ('paid search agency', 'paid search & PPC'),
    'online-marketing-agency':   ('online marketing agency', 'online marketing'),
    'voice-ai':                  ('Voice AI agency', 'Voice AI solutions'),
}

# Правила формулювання по типу сервісу — intro CTA
SERVICE_HOOKS = {
    'seo-agency':                'Rank higher on Google with',
    'seo-company':               'Grow your organic traffic with',
    'ppc-agency':                'Drive targeted traffic with',
    'ai-automation-agency':      'Automate and scale your business with',
    'content-marketing-agency':  'Attract and convert customers with',
    'digital-marketing-agency':  'Grow your business online with',
    'email-marketing-agency':    'Nurture leads and boost revenue with',
    'google-ads-agency':         'Maximise your Google Ads ROI with',
    'social-media-agency':       'Build your brand and generate leads with',
    'web-design-company':        'Get a high-converting website from',
    'web-development-company':   'Build fast, scalable websites with',
    'paid-search-agency':        'Get more from your ad spend with',
    'online-marketing-agency':   'Grow your business online with',
    'voice-ai':                  'Transform customer experience with',
}

def get_parts(filepath):
    """Повертає (city, service_slug) з шляху файлу."""
    parts = filepath.replace('\\', '/').split('/')
    try:
        local_idx = parts.index('local')
        city = parts[local_idx + 1]
        service = parts[local_idx + 2]
        return city, service
    except (ValueError, IndexError):
        return None, None

def city_name(slug):
    """Перетворити slug міста у display назву."""
    return slug.capitalize()

def build_description(city_slug, service_slug):
    """Генерує meta description < 155 символів."""
    city = city_name(city_slug)
    label_tuple = SERVICE_LABELS.get(service_slug)
    hook = SERVICE_HOOKS.get(service_slug, 'Grow your business with')

    if not label_tuple:
        # Fallback: capitalize slug
        label = service_slug.replace('-', ' ').title()
        desc = f"Expert {label} services in {city}. Bambino delivers proven results for UK businesses. Free audit available."
    else:
        label, keyword = label_tuple
        # Template A: hook-based
        desc = f"{hook} Bambino's {label} in {city}. Results-driven strategies, transparent reporting. Get your free audit today."

    # Якщо > 155 — скорочуємо
    if len(desc) > 155:
        desc = f"Expert {label_tuple[0] if label_tuple else service_slug} in {city}. Bambino helps UK businesses grow faster. Proven results. Free audit."

    # Остаточна перевірка
    if len(desc) > 155:
        desc = desc[:152] + '...'

    return desc

def fix_file(filepath):
    city, service = get_parts(filepath)
    if not city or not service:
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # Генеруємо нову description
    new_desc = build_description(city, service)

    # Замінити meta name="description"
    content = re.sub(
        r'(<meta\s+name="description"\s+content=")[^"]*(")',
        lambda m: m.group(1) + new_desc + m.group(2),
        content
    )

    # Також замінити og:description якщо воно теж обрізане з "..."
    current_og = re.search(r'og:description"[^>]*content="([^"]*)"', content)
    if current_og and '...' in current_og.group(1):
        content = re.sub(
            r'(property="og:description"\s+content=")[^"]*(")',
            lambda m: m.group(1) + new_desc + m.group(2),
            content
        )
        content = re.sub(
            r'(og:description"[^>]*content=")[^"]*(")',
            lambda m: m.group(1) + new_desc + m.group(2),
            content
        )

    # twitter:description також
    current_tw = re.search(r'twitter:description"[^>]*content="([^"]*)"', content)
    if current_tw and '...' in current_tw.group(1):
        content = re.sub(
            r'(name="twitter:description"\s+content=")[^"]*(")',
            lambda m: m.group(1) + new_desc + m.group(2),
            content
        )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    changed = 0
    skipped = 0

    local_dir = os.path.join(ROOT, 'local')
    for dirpath, dirnames, filenames in os.walk(local_dir):
        dirnames[:] = [d for d in dirnames if d != '.git']
        for filename in filenames:
            if filename != 'index.html':
                continue
            filepath = os.path.join(dirpath, filename)
            try:
                if fix_file(filepath):
                    changed += 1
                else:
                    skipped += 1
            except Exception as e:
                print(f'ERROR: {filepath}: {e}')

    print(f'Fixed: {changed} files, No change: {skipped}')

    # Показати приклади
    print('\nSample descriptions:')
    samples = [
        ('manchester', 'seo-agency'),
        ('london', 'google-ads-agency'),
        ('birmingham', 'web-design-company'),
        ('edinburgh', 'ai-automation-agency'),
        ('bournemouth', 'ppc-agency'),
    ]
    for city, service in samples:
        desc = build_description(city, service)
        print(f'  [{len(desc)}] {city}/{service}: {desc}')

if __name__ == '__main__':
    main()
