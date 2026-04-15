"""
fix_head_tags.py
Додає до всіх сторінок (крім local):
  1. og:image якщо відсутній
  2. og:image:width / og:image:height
  3. favicon + apple-touch-icon мета теги
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
OG_IMAGE = "https://bambinoagency.com/img/og-default.jpg"

OG_IMAGE_TAGS = f'''  <meta property="og:image" content="{OG_IMAGE}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />'''

FAVICON_TAGS = '''  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />'''

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # 1. Додати og:image після og:locale якщо немає
    if 'og:image' not in content:
        content = re.sub(
            r'(<meta\s+property="og:locale"[^>]+>)',
            r'\1\n' + OG_IMAGE_TAGS,
            content
        )
        # Fallback — після og:url
        if 'og:image' not in content:
            content = re.sub(
                r'(<meta\s+property="og:url"[^>]+>)',
                r'\1\n' + OG_IMAGE_TAGS,
                content
            )

    # 2. Додати favicon якщо немає
    if 'favicon' not in content:
        # Вставити після </title> або після першого <meta>
        content = re.sub(
            r'(</title>)',
            r'\1\n' + FAVICON_TAGS,
            content,
            count=1
        )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    changed = 0
    skipped = 0

    # Core pages тільки (local pages вже мають og:image)
    target_files = []

    # Root HTML files
    for f in os.listdir(ROOT):
        if f.endswith('.html') and f != 'googlea17788b413985782.html' and f != 'design-system.html':
            target_files.append(os.path.join(ROOT, f))

    # Service pages
    services_dir = os.path.join(ROOT, 'services')
    if os.path.isdir(services_dir):
        for f in os.listdir(services_dir):
            if f.endswith('.html'):
                target_files.append(os.path.join(services_dir, f))

    for filepath in target_files:
        try:
            if fix_file(filepath):
                rel = os.path.relpath(filepath, ROOT)
                print(f'  FIXED: {rel}')
                changed += 1
            else:
                skipped += 1
        except Exception as e:
            print(f'  ERROR: {filepath}: {e}')

    print(f'\nFixed: {changed}, No change: {skipped}')

if __name__ == '__main__':
    main()
