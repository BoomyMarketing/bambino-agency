"""
fix_faq_h3.py
Wraps FAQ question buttons in <h3> tags so they register as question-format H3s.
Fixes: question_format_h3, voice_friendly_questions, question_format_headings (geo_ai)

Before: <button class="faq-question" ...>Question?</button>
After:  <h3 class="faq-h3"><button class="faq-question" ...>Question?</button></h3>

W3C recommended accordion pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {'.git', 'node_modules', 'lazy-method', 'scripts', 'docs'}


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    # Skip if FAQ buttons already wrapped in h3
    if '<h3 class="faq-h3">' in original:
        return False

    if 'faq-question' not in original:
        return False

    # Wrap every <button class="faq-question"...>...</button> in <h3 class="faq-h3">
    content = re.sub(
        r'(<button\s[^>]*class="[^"]*faq-question[^"]*"[^>]*>[\s\S]*?</button>)',
        r'<h3 class="faq-h3" style="margin:0;font-size:inherit;font-weight:inherit;">\1</h3>',
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
