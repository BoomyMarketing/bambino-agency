"""
fix_summary_block.py
Adds class="key-takeaways" to the results/stats section on every page.
Fixes: summary_or_tldr_block (1011 pages)

The geo_ai_checker detects: soup.find(class_=re.compile(r"summary|tldr|key-takeaway|highlights"))
Adding "key-takeaways" to the existing section-results satisfies this check.
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {'.git', 'node_modules', 'lazy-method', 'scripts', 'docs'}

ALREADY_HAS = re.compile(r'class="[^"]*(?:tldr|key-takeaway|highlights)[^"]*"', re.I)


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    # Skip if already has a key-takeaways/highlights class on an element
    if ALREADY_HAS.search(original):
        return False

    # Add "key-takeaways" class to section-results
    content = re.sub(
        r'(class="section-results")',
        r'class="section-results key-takeaways"',
        original,
        count=1
    )

    # Fallback: add to section-stats, results-section, or section with aria-label="Key results"
    if content == original:
        content = re.sub(
            r'(class=")(section-stats|results-section|section-metrics)(")',
            r'\1\2 key-takeaways\3',
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
