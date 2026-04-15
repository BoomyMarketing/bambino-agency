"""
fix_dates_and_twitter.py
1. Оновлює dateModified → 2026-04-16 у всіх local pages
2. Додає twitter:image де відсутній
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
TODAY = "2026-04-16"
OG_IMAGE = "https://bambinoagency.com/img/og-default.jpg"

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # 1. Оновити dateModified
    content = re.sub(
        r'"dateModified":\s*"[^"]+"',
        f'"dateModified": "{TODAY}"',
        content
    )

    # 2. Додати twitter:image якщо відсутній
    if 'twitter:image' not in content:
        # Вставити після twitter:description
        content = re.sub(
            r'(<meta\s+name="twitter:description"[^>]+>)',
            f'\\1\n    <meta name="twitter:image" content="{OG_IMAGE}">',
            content
        )
        # Якщо twitter:description не знайдений — вставити після twitter:card
        if 'twitter:image' not in content:
            content = re.sub(
                r'(<meta\s+name="twitter:card"[^>]+>)',
                f'\\1\n    <meta name="twitter:image" content="{OG_IMAGE}">',
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
