#!/usr/bin/env python3
"""Remove schema dateModified values that predate datePublished."""

import datetime as dt
import json
import os
import re
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent
JSON_LD_TYPE_RE = re.compile(r'\btype\s*=\s*["\']application/ld\+json["\']', re.IGNORECASE)


def remove_invalid_dates(value):
    removed = 0
    if isinstance(value, list):
        for item in value:
            removed += remove_invalid_dates(item)
    elif isinstance(value, dict):
        published = value.get("datePublished")
        modified = value.get("dateModified")
        if isinstance(published, str) and isinstance(modified, str):
            try:
                if dt.date.fromisoformat(modified[:10]) < dt.date.fromisoformat(published[:10]):
                    del value["dateModified"]
                    removed += 1
            except ValueError:
                pass
        for item in value.values():
            removed += remove_invalid_dates(item)
    return removed


def clean_content(content):
    parts = []
    cursor = 0
    lowered = content.lower()
    removed = 0
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
                changed = remove_invalid_dates(data)
                removed += changed
                if changed:
                    parts.append(f"{opening}{json.dumps(data, ensure_ascii=False, separators=(', ', ': '))}</script>")
                else:
                    parts.append(content[start:close_end])
        cursor = close_end
    return "".join(parts), removed


def main():
    files = dates = 0
    for root, directories, names in os.walk(SITE_ROOT):
        directories[:] = [name for name in directories if name not in {".git", "node_modules"}]
        for name in names:
            if not name.endswith(".html"):
                continue
            path = Path(root) / name
            updated, removed = clean_content(path.read_text(encoding="utf-8"))
            if removed:
                path.write_text(updated, encoding="utf-8")
                files += 1
                dates += removed
    print(f"removed {dates} invalid schema dates from {files} HTML files")


if __name__ == "__main__":
    main()
