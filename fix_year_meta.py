"""
fix_year_meta.py
Adds "2026" to <title> and meta description where not already present.
Fixes: meta_desc_or_title_includes_year (993 pages)

Strategy:
  - title: append " | 2026" before " | Bambino" or at end if Bambino not found
  - meta description: append " Updated 2026." if no year present
  - Skips: 404, cookie-policy, privacy-policy, terms, design-system, googlea*.html
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
YEAR = "2026"

SKIP_DIRS = {'.git', 'node_modules', 'lazy-method', 'scripts', 'docs'}
SKIP_FILES = {'404.html', 'cookie-policy', 'privacy-policy', 'privacy', 'terms',
              'cookies', 'design-system'}

def should_skip(filepath):
    rel = os.path.relpath(filepath, ROOT).replace('\\', '/')
    for skip in SKIP_FILES:
        if skip in rel:
            return True
    if re.search(r'google[a-z0-9]+\.html', os.path.basename(filepath)):
        return True
    return False


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # --- Fix <title> ---
    def patch_title(m):
        title = m.group(1)
        if YEAR in title:
            return m.group(0)  # already has year
        # Insert before " | Bambino" if present, otherwise before closing
        if '| Bambino' in title:
            new_title = title.replace('| Bambino', f'| {YEAR} | Bambino')
        else:
            new_title = title.rstrip() + f' | {YEAR}'
        return f'<title>{new_title}</title>'

    content = re.sub(r'<title>(.*?)</title>', patch_title, content, flags=re.DOTALL)

    # --- Fix meta name="description" ---
    def patch_meta_desc(m):
        attr = m.group(1)
        desc = m.group(2)
        if YEAR in desc:
            return m.group(0)
        # Trim trailing punctuation and append year
        desc_new = desc.rstrip('. ') + f'. Updated {YEAR}.'
        # Keep under ~165 chars
        if len(desc_new) > 165:
            # Just append year without "Updated"
            desc_new = desc.rstrip('. ') + f' {YEAR}.'
        if len(desc_new) > 165:
            return m.group(0)  # too long, skip
        return f'<meta {attr}content="{desc_new}"'

    content = re.sub(
        r'<meta (name="description" )content="([^"]{30,})"',
        patch_meta_desc,
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
    errors = 0

    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for filename in filenames:
            if not filename.endswith('.html'):
                continue
            filepath = os.path.join(dirpath, filename)
            if should_skip(filepath):
                continue
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
