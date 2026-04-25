"""
fix_years_signal.py
Adds "Founded in 2023" trust signal to pages missing years_in_business_signal.
Fixes: years_in_business_signal (991 pages)

The checker looks for: 'X years' / 'since YYYY' / founded_year (2023 from config)
Strategy: Add "Since 2023" to the footer brand description paragraph.
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {'.git', 'node_modules', 'lazy-method', 'scripts', 'docs'}
SKIP_FILES = {'cookie-policy', 'privacy-policy', 'privacy', 'terms', 'cookies', 'design-system'}

# Pattern the checker uses (from eeat_checker.py)
YEARS_PATTERN = re.compile(r'\b(since\s+20\d\d|founded\s+in?\s+20\d\d|est\.?\s+20\d\d|\d+\s+years?\s+(of\s+)?(experience|in\s+business|serving))', re.I)


def should_skip(filepath):
    rel = os.path.relpath(filepath, ROOT).replace('\\', '/')
    return any(s in rel for s in SKIP_FILES)


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    if YEARS_PATTERN.search(original):
        return False

    # Strategy 1: Append to footer-brand-desc paragraph
    content = re.sub(
        r'(<p class="footer-brand-desc">)([\s\S]{5,200}?)(</p>)',
        lambda m: f'{m.group(1)}{m.group(2).rstrip(". ")}. Since 2023.{m.group(3)}',
        original,
        count=1
    )

    # Fallback: add a small span after the footer brand logo
    if content == original and 'footer-brand-logo' in original:
        content = re.sub(
            r'(class="footer-brand-logo"[^>]*>Bambino Agency</a>)',
            r'\1<span class="footer-founded" style="font-size:.75rem;opacity:.5;display:block;margin-top:.25rem;">Since 2023</span>',
            original,
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
