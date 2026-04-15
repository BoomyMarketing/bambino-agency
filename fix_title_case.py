"""
fix_title_case.py
Виправляє title case у <title>, og:title, twitter:title та FAQ questions
Тільки у local pages та service pages.
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

# Замінити у заголовках (в контексті title/og/twitter атрибутів)
# Порядок важливий — довші патерни спочатку
REPLACEMENTS = [
    (' Ai ', ' AI '),
    (' Ai\b', ' AI'),
    ('>Best Ai ', '>Best AI '),
    ('Ppc ', 'PPC '),
    (' Ppc ', ' PPC '),
    ('Seo ', 'SEO '),
    (' Seo ', ' SEO '),
    ('Seo\b', 'SEO'),
]

# Regex замін — більш точні
REGEX_RULES = [
    # Title tag
    (r'(<title>[^<]*)\bAi\b([^<]*</title>)', r'\1AI\2'),
    (r'(<title>[^<]*)\bPpc\b([^<]*</title>)', r'\1PPC\2'),
    (r'(<title>[^<]*)\bSeo\b([^<]*</title>)', r'\1SEO\2'),
    # og:title
    (r'(og:title"[^>]*content=")([^"]*)\bAi\b([^"]*")', r'\1\2AI\3'),
    (r'(og:title"[^>]*content=")([^"]*)\bPpc\b([^"]*")', r'\1\2PPC\3'),
    (r'(og:title"[^>]*content=")([^"]*)\bSeo\b([^"]*")', r'\1\2SEO\3'),
    # twitter:title
    (r'(twitter:title"[^>]*content=")([^"]*)\bAi\b([^"]*")', r'\1\2AI\3'),
    (r'(twitter:title"[^>]*content=")([^"]*)\bPpc\b([^"]*")', r'\1\2PPC\3'),
    (r'(twitter:title"[^>]*content=")([^"]*)\bSeo\b([^"]*")', r'\1\2SEO\3'),
    # Schema "name" fields in FAQ questions (broader match)
    (r'("name":\s*"[^"]*)\bAi\b([^"]*")', r'\1AI\2'),
    (r'("name":\s*"[^"]*)\bPpc\b([^"]*")', r'\1PPC\2'),
    (r'("name":\s*"[^"]*)\bSeo\b([^"]*")', r'\1SEO\2'),
    # H1 tags
    (r'(<h1[^>]*>[^<]*)\bAi\b([^<]*</h1>)', r'\1AI\2'),
    (r'(<h1[^>]*>[^<]*)\bPpc\b([^<]*</h1>)', r'\1PPC\2'),
    (r'(<h1[^>]*>[^<]*)\bSeo\b([^<]*</h1>)', r'\1SEO\2'),
]

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original
    for pattern, replacement in REGEX_RULES:
        content = re.sub(pattern, replacement, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    changed = 0
    skipped = 0

    # Тільки local/ та services/ — core pages не мають цих помилок
    target_dirs = [
        os.path.join(ROOT, 'local'),
        os.path.join(ROOT, 'services'),
    ]

    for target_dir in target_dirs:
        for dirpath, dirnames, filenames in os.walk(target_dir):
            dirnames[:] = [d for d in dirnames if d != '.git']
            for filename in filenames:
                if not filename.endswith('.html'):
                    continue
                filepath = os.path.join(dirpath, filename)
                try:
                    if fix_file(filepath):
                        rel = os.path.relpath(filepath, ROOT)
                        print(f'  FIXED: {rel}')
                        changed += 1
                    else:
                        skipped += 1
                except Exception as e:
                    print(f'  ERROR: {filepath}: {e}')

    print(f'\nFixed: {changed} files, No change: {skipped} files')

if __name__ == '__main__':
    main()
