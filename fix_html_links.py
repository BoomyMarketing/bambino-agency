"""
fix_html_links.py
Масово прибирає .html з усіх посилань та schema URLs на bambinoagency.com
Vercel cleanUrls: true — .html не потрібен у жодному посиланні.

Правила замін:
1. https://bambinoagency.com/index.html → https://bambinoagency.com/
2. https://bambinoagency.com/PAGE.html  → https://bambinoagency.com/PAGE
3. /local/CITY/SERVICE/index.html"     → /local/CITY/SERVICE"   (relative paths у footer)
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

RULES = [
    # index.html → /  (homepage)
    (
        r'https://bambinoagency\.com/index\.html',
        'https://bambinoagency.com/'
    ),
    # /local/.../index.html"  → /local/..."   (relative footer links)
    (
        r'(/local/[^"\'>\s]+)/index\.html(["\'\s>])',
        r'\1\2'
    ),
    # https://bambinoagency.com/anything.html → remove .html
    # Виключаємо googlea17788b413985782.html (verification file)
    (
        r'https://bambinoagency\.com/(?!googlea17788b413985782)([^"\'>\s#?]+)\.html',
        r'https://bambinoagency.com/\1'
    ),
]

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original
    for pattern, replacement in RULES:
        content = re.sub(pattern, replacement, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    changed = 0
    skipped = 0
    errors = []

    for dirpath, dirnames, filenames in os.walk(ROOT):
        # Пропускаємо .git
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
                errors.append(f'{filepath}: {e}')

    print(f'\n✅ Виправлено файлів: {changed}')
    print(f'   Без змін:         {skipped}')
    if errors:
        print(f'   Помилки ({len(errors)}):')
        for e in errors:
            print(f'     {e}')

if __name__ == '__main__':
    main()
