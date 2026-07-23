#!/usr/bin/env python3
"""Remove unverified review markup and location claims from generated JSON-LD."""

import json
import os
import re
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent
JSON_LD_TYPE_RE = re.compile(r'\btype\s*=\s*["\']application/ld\+json["\']', re.IGNORECASE)


def is_local_business(value):
    types = value.get("@type", [])
    if isinstance(types, str):
        types = [types]
    return "LocalBusiness" in types


def sanitize(value):
    changed = False
    if isinstance(value, list):
        for item in value:
            changed = sanitize(item) or changed
    elif isinstance(value, dict):
        for key in ("aggregateRating", "review"):
            if key in value:
                del value[key]
                changed = True
        if is_local_business(value):
            for key in ("address", "areaServed", "geo"):
                if key in value:
                    del value[key]
                    changed = True
        for item in value.values():
            changed = sanitize(item) or changed
    return changed


def clean_content(content):
    parts = []
    cursor = 0
    lowered = content.lower()
    changed = False
    while True:
        start = lowered.find("<script", cursor)
        if start == -1:
            parts.append(content[cursor:])
            break
        tag_end = content.find(">", start)
        close_start = lowered.find("</script>", tag_end)
        if tag_end == -1 or close_start == -1:
            parts.append(content[cursor:])
            break
        close_end = close_start + len("</script>")
        opening = content[start:tag_end + 1]
        data_text = content[tag_end + 1:close_start]
        parts.append(content[cursor:start])
        if not JSON_LD_TYPE_RE.search(opening):
            parts.append(content[start:close_end])
        else:
            try:
                data = json.loads(data_text)
            except json.JSONDecodeError:
                parts.append(content[start:close_end])
            else:
                if sanitize(data):
                    parts.append(f"{opening}{json.dumps(data, ensure_ascii=False, separators=(', ', ': '))}</script>")
                    changed = True
                else:
                    parts.append(content[start:close_end])
        cursor = close_end
    return "".join(parts), changed


def main():
    files = 0
    for root, directories, names in os.walk(SITE_ROOT):
        directories[:] = [name for name in directories if name not in {".git", "node_modules"}]
        for name in names:
            if not name.endswith(".html"):
                continue
            path = Path(root) / name
            content = path.read_text(encoding="utf-8")
            updated, changed = clean_content(content)
            if changed:
                path.write_text(updated, encoding="utf-8")
                files += 1
    print(f"cleaned structured data in {files} HTML files")


if __name__ == "__main__":
    main()
