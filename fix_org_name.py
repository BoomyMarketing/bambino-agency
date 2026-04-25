"""
fix_org_name.py
Changes "name": "Bambino" → "name": "Bambino Agency" in LocalBusiness/Organization
JSON-LD blocks so org_name_matches_site passes (config site.name = "Bambino Agency").
"""

import os
import re
import json

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {'.git', 'node_modules', 'lazy-method', 'scripts', 'docs'}


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    def patch_block(match):
        inner = match.group(1)
        try:
            data = json.loads(inner)
        except json.JSONDecodeError:
            return match.group(0)

        changed = False

        def patch_entity(obj):
            nonlocal changed
            if not isinstance(obj, dict):
                return
            t = obj.get("@type", "")
            types = t if isinstance(t, list) else [t]
            is_org = any(x in types for x in [
                "LocalBusiness", "Organization", "MarketingAgency", "ProfessionalService"
            ])
            if is_org and obj.get("name") == "Bambino":
                obj["name"] = "Bambino Agency"
                changed = True

        if "@graph" in data:
            for item in data["@graph"]:
                patch_entity(item)
        else:
            patch_entity(data)

        if not changed:
            return match.group(0)

        new_inner = json.dumps(data, ensure_ascii=False, indent=2)
        return f'<script type="application/ld+json">\n{new_inner}\n</script>'

    content = re.sub(
        r'<script type="application/ld\+json">([\s\S]*?)</script>',
        patch_block,
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
