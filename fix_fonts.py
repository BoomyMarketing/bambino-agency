"""
fix_fonts.py — M2
Виправляє Google Fonts на local pages:
  1. Додає &display=swap до Playfair Display URL
  2. Додає preconnect до fonts.gstatic.com (відсутній)
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

OLD_FONTS_LINE = 'href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap"'
NEW_FONTS_LINE = 'href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap"'

# Нова стрічка preconnect до gstatic
GSTATIC_PRECONNECT = '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # 1. Додати display=swap якщо Playfair без нього
    # Перевірити: чи є Playfair і чи вже є display=swap
    if 'Playfair+Display' in content:
        # Додати display=swap якщо немає в тому ж URL
        content = re.sub(
            r'(https://fonts\.googleapis\.com/css2\?family=Playfair[^"\']*?)(?<!display=swap)(")',
            lambda m: m.group(1) + ('&display=swap' if 'display=swap' not in m.group(1) else '') + m.group(2),
            content
        )

    # 2. Додати preconnect до gstatic якщо немає
    if 'fonts.gstatic.com' not in content and 'fonts.googleapis.com' in content:
        content = re.sub(
            r'(\s*<link rel="preconnect" href="https://fonts\.googleapis\.com">)',
            r'\1\n' + GSTATIC_PRECONNECT,
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

    print(f'Fonts fixed: {changed} files, No change: {skipped}')

if __name__ == '__main__':
    main()
