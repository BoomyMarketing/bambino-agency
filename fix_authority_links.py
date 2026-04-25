"""
fix_authority_links.py
Adds one authority outbound link to every page's footer.
Fixes: external_entity_links + outbound_authority_links (1013 pages)

Inserts a small "Industry resources" line just before </footer>.
Uses gov.uk for UK/CA pages, sba.gov for US pages, wikipedia.org as fallback.
Only adds if no authority link already present on the page.
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {'.git', 'node_modules', 'lazy-method', 'scripts', 'docs'}

AUTHORITY_PATTERN = re.compile(
    r'\.(gov|edu)|wikipedia\.org|nature\.com|hbr\.org|forbes\.com|nytimes\.com|reuters\.com|who\.int',
    re.I
)

# Resources snippet — will be injected before </footer>
RESOURCE_UK = (
    '\n        <div class="footer-resources" style="border-top:1px solid rgba(255,255,255,.08);'
    'padding-top:.75rem;margin-top:.75rem;font-size:.78rem;opacity:.6;">'
    '<span>Industry resources: </span>'
    '<a href="https://www.gov.uk/business-and-self-employed" rel="noopener" target="_blank">'
    'UK Business &amp; Self-Employed (GOV.UK)</a>'
    ' &middot; '
    '<a href="https://en.wikipedia.org/wiki/Digital_marketing" rel="noopener" target="_blank">'
    'Digital Marketing (Wikipedia)</a>'
    '</div>\n    '
)

RESOURCE_US = (
    '\n        <div class="footer-resources" style="border-top:1px solid rgba(255,255,255,.08);'
    'padding-top:.75rem;margin-top:.75rem;font-size:.78rem;opacity:.6;">'
    '<span>Industry resources: </span>'
    '<a href="https://www.sba.gov/business-guide/grow-your-business/marketing-sales" rel="noopener" target="_blank">'
    'Marketing &amp; Sales Guide (SBA.gov)</a>'
    ' &middot; '
    '<a href="https://en.wikipedia.org/wiki/Digital_marketing" rel="noopener" target="_blank">'
    'Digital Marketing (Wikipedia)</a>'
    '</div>\n    '
)

RESOURCE_WIKI = (
    '\n        <div class="footer-resources" style="border-top:1px solid rgba(255,255,255,.08);'
    'padding-top:.75rem;margin-top:.75rem;font-size:.78rem;opacity:.6;">'
    '<span>Industry resources: </span>'
    '<a href="https://en.wikipedia.org/wiki/Digital_marketing" rel="noopener" target="_blank">'
    'Digital Marketing (Wikipedia)</a>'
    ' &middot; '
    '<a href="https://en.wikipedia.org/wiki/Marketing_strategy" rel="noopener" target="_blank">'
    'Marketing Strategy (Wikipedia)</a>'
    '</div>\n    '
)


def get_resource_block(filepath):
    rel = os.path.relpath(filepath, ROOT).replace('\\', '/')
    if rel.startswith('us/'):
        return RESOURCE_US
    elif rel.startswith('ca/') or rel.startswith('local/') or rel.startswith('services/') or rel.startswith('industries/') or '/' not in rel:
        return RESOURCE_UK
    else:
        return RESOURCE_WIKI


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    # Skip if authority link already present
    if AUTHORITY_PATTERN.search(original):
        return False

    if '</footer>' not in original:
        return False

    resource = get_resource_block(filepath)
    content = original.replace('</footer>', resource + '</footer>', 1)

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
