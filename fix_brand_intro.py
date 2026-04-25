"""
fix_brand_intro.py
Ensures "Bambino Agency" appears in the first ~100 visible words on every page.
Fixes: brand_in_first_100_words (1013 pages)

Strategy: Change nav-logo text from "Bambino" to "Bambino Agency"
so the full brand name appears within the first visible words on every page.

Skips: pages already containing "Bambino Agency" in the logo.
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {'.git', 'node_modules', 'lazy-method', 'scripts', 'docs'}


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    # Replace nav-logo with "Bambino" only (not already "Bambino Agency")
    # Pattern: class="nav-logo">Bambino< (without "Agency" after)
    content = re.sub(
        r'(class="nav-logo"[^>]*>)Bambino(?!\s*Agency)(<)',
        r'\1Bambino Agency\2',
        original
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


def main():
    changed = 0
    skipped = 0
    errors = 0

    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
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
                errors += 1
                print(f'  ERROR: {filepath}: {e}')

    print(f'Done — fixed: {changed}, unchanged: {skipped}, errors: {errors}')


if __name__ == '__main__':
    main()
