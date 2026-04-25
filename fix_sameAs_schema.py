"""
fix_sameAs_schema.py
Fixes 3 audit checks across all HTML pages:
  1. schema_sameAs_for_entity_graph  — adds sameAs to main entity JSON-LD
  2. org_schema_with_same_as         — same fix, org-level
  3. schema_uses_at_id_for_entities  — adds @id to main LocalBusiness/Organization block

Targets: local/, ca/, us/, services/, industries/, root pages
"""

import os
import re
import json

ROOT = os.path.dirname(os.path.abspath(__file__))

SAME_AS = [
    "https://linkedin.com/company/bambinoagency",
    "https://twitter.com/bambinoagency",
    "https://instagram.com/bambinoagency",
    "https://facebook.com/bambinoagency",
]

SAME_AS_JSON = json.dumps(SAME_AS)

# Skip dirs that are not content pages
SKIP_DIRS = {'.git', 'node_modules', 'lazy-method', 'scripts', 'docs'}


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # Find all <script type="application/ld+json"> blocks
    def patch_json_ld(match):
        block_html = match.group(0)
        inner = match.group(1)
        try:
            data = json.loads(inner)
        except json.JSONDecodeError:
            return block_html  # skip malformed blocks

        changed = False

        def patch_entity(obj):
            nonlocal changed
            if not isinstance(obj, dict):
                return obj
            t = obj.get("@type", "")
            types = t if isinstance(t, list) else [t]
            is_main_entity = any(x in types for x in [
                "LocalBusiness", "Organization", "MarketingAgency",
                "ProfessionalService", "WebSite"
            ])
            if is_main_entity:
                # Add @id if missing
                if "@id" not in obj:
                    url = obj.get("url", "")
                    if url:
                        obj["@id"] = url
                        changed = True
                # Add sameAs if missing or empty
                if not obj.get("sameAs"):
                    obj["sameAs"] = SAME_AS
                    changed = True
            return obj

        # Handle both single object and @graph array
        if "@graph" in data:
            for item in data["@graph"]:
                patch_entity(item)
        else:
            patch_entity(data)

        if not changed:
            return block_html

        new_inner = json.dumps(data, ensure_ascii=False, indent=2)
        return f'<script type="application/ld+json">\n{new_inner}\n</script>'

    content = re.sub(
        r'<script type="application/ld\+json">([\s\S]*?)</script>',
        patch_json_ld,
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
            try:
                if fix_file(filepath):
                    changed += 1
                    rel = os.path.relpath(filepath, ROOT)
                    print(f'  fixed: {rel}')
                else:
                    skipped += 1
            except Exception as e:
                errors += 1
                print(f'  ERROR: {filepath}: {e}')

    print(f'\nDone — fixed: {changed}, unchanged: {skipped}, errors: {errors}')


if __name__ == '__main__':
    main()
