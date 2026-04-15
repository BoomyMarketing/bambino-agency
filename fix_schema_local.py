"""
fix_schema_local.py
1. Заповнює GeoCoordinates для кожного міста
2. Прибирає aggregateRating (фейкові однакові дані для всіх міст)
3. Виправляє description "Seo Agency" → "SEO Agency" та інші в schema
"""

import os
import re
import json

ROOT = os.path.dirname(os.path.abspath(__file__))

# Координати міст UK
GEO = {
    'aberdeen':     (57.1497, -2.0943),
    'belfast':      (54.5973, -5.9301),
    'birmingham':   (52.4862, -1.8904),
    'blackpool':    (53.8175, -3.0357),
    'bournemouth':  (50.7192, -1.8808),
    'bradford':     (53.7960, -1.7594),
    'brighton':     (50.8229, -0.1363),
    'bristol':      (51.4545, -2.5879),
    'cambridge':    (52.2053, 0.1218),
    'cardiff':      (51.4816, -3.1791),
    'edinburgh':    (55.9533, -3.1883),
    'glasgow':      (55.8642, -4.2518),
    'leeds':        (53.8008, -1.5491),
    'leicester':    (52.6369, -1.1398),
    'liverpool':    (53.4084, -2.9916),
    'london':       (51.5074, -0.1278),
    'manchester':   (53.4808, -2.2426),
    'newcastle':    (54.9783, -1.6178),
    'nottingham':   (52.9548, -1.1581),
    'oxford':       (51.7520, -1.2577),
    'sheffield':    (53.3811, -1.4701),
}

def get_city_from_path(filepath):
    """Отримати назву міста з шляху файлу."""
    parts = filepath.replace('\\', '/').split('/')
    try:
        local_idx = parts.index('local')
        return parts[local_idx + 1].lower()
    except (ValueError, IndexError):
        return None

def fix_geo_coordinates(content, city):
    """Замінити порожній GeoCoordinates на реальні координати."""
    if city not in GEO:
        return content
    lat, lng = GEO[city]
    # Замінити {"@type": "GeoCoordinates"} (без lat/lng) на повний об'єкт
    content = re.sub(
        r'"geo":\s*\{"@type":\s*"GeoCoordinates"\}',
        f'"geo": {{"@type": "GeoCoordinates", "latitude": {lat}, "longitude": {lng}}}',
        content
    )
    return content

def fix_aggregate_rating(content):
    """Прибрати aggregateRating з local pages (дані не унікальні по місту)."""
    content = re.sub(
        r',\s*"aggregateRating":\s*\{"@type":\s*"AggregateRating",[^}]+\}',
        '',
        content
    )
    return content

def fix_schema_description(content):
    """Виправити lowercase acronyms у schema description полях."""
    replacements = [
        (r'"description":\s*"([^"]*)\bSeo\b([^"]*)"', lambda m: f'"description": "{m.group(1).replace("Seo", "SEO")}{m.group(2)}"'),
        (r'"description":\s*"([^"]*)\bPpc\b([^"]*)"', lambda m: f'"description": "{m.group(1).replace("Ppc", "PPC")}{m.group(2)}"'),
        (r'"description":\s*"([^"]*)\bAi\b([^"]*)"',  lambda m: f'"description": "{m.group(1).replace("Ai", "AI")}{m.group(2)}"'),
    ]
    # Simple regex approach
    content = re.sub(r'("description":\s*"[^"]*)\bSeo\b([^"]*")', r'\1SEO\2', content)
    content = re.sub(r'("description":\s*"[^"]*)\bPpc\b([^"]*")', r'\1PPC\2', content)
    content = re.sub(r'("description":\s*"[^"]*)\bAi\b([^"]*")',  r'\1AI\2', content)
    # Also fix "name" fields in schema
    content = re.sub(r'("name":\s*"[^"]*)\bSeo\b([^"]*")', r'\1SEO\2', content)
    content = re.sub(r'("name":\s*"[^"]*)\bPpc\b([^"]*")', r'\1PPC\2', content)
    content = re.sub(r'("name":\s*"[^"]*)\bAi\b([^"]*")',  r'\1AI\2', content)
    return content

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original
    city = get_city_from_path(filepath)

    if city:
        content = fix_geo_coordinates(content, city)
        content = fix_aggregate_rating(content)

    content = fix_schema_description(content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    changed = 0
    skipped = 0

    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d != '.git']
        for filename in filenames:
            if not filename.endswith('.html'):
                continue
            filepath = os.path.join(dirpath, filename)
            try:
                if fix_file(filepath):
                    changed += 1
                else:
                    skipped += 1
            except Exception as e:
                print(f'ERROR: {filepath}: {e}')

    print(f'Fixed: {changed} files, No change: {skipped} files')

if __name__ == '__main__':
    main()
