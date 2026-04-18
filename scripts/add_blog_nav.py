#!/usr/bin/env python3
"""Add Blog link to desktop nav and mobile menu across all non-local HTML files."""

import os, glob

BASE = "C:/Users/Zver/projects/bambino-agency"

# Patterns to replace (desktop nav — various orderings found across pages)
NAV_REPLACEMENTS = [
    # Pattern: About -> Pricing -> CTA (most common)
    (
        '<li><a href="https://bambinoagency.com/about">About</a></li>\n          <li><a href="https://bambinoagency.com/pricing">Pricing</a></li>',
        '<li><a href="https://bambinoagency.com/about">About</a></li>\n          <li><a href="https://bambinoagency.com/blog">Blog</a></li>\n          <li><a href="https://bambinoagency.com/pricing">Pricing</a></li>',
    ),
    # Pattern: About -> Pricing -> CTA (single-quote variant)
    (
        "<li><a href='https://bambinoagency.com/about'>About</a></li>\n          <li><a href='https://bambinoagency.com/pricing'>Pricing</a></li>",
        "<li><a href='https://bambinoagency.com/about'>About</a></li>\n          <li><a href='https://bambinoagency.com/blog'>Blog</a></li>\n          <li><a href='https://bambinoagency.com/pricing'>Pricing</a></li>",
    ),
]

# Mobile menu replacements
MOBILE_REPLACEMENTS = [
    (
        '<a href="https://bambinoagency.com/pricing" onclick="closeMobileMenu()">Pricing</a>',
        '<a href="https://bambinoagency.com/blog" onclick="closeMobileMenu()">Blog</a>\n    <a href="https://bambinoagency.com/pricing" onclick="closeMobileMenu()">Pricing</a>',
    ),
]

# Collect all HTML files excluding local/ pages
all_html = glob.glob(os.path.join(BASE, "**/*.html"), recursive=True)
target_files = [f for f in all_html if "/local/" not in f.replace("\\", "/")]

updated = 0
skipped_already = 0

for fpath in target_files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if Blog already in nav
    if '"/blog"' in content or "'/blog'" in content or '"/blog"' in content:
        skipped_already += 1
        continue

    new_content = content
    changed = False

    for old, new in NAV_REPLACEMENTS + MOBILE_REPLACEMENTS:
        if old in new_content:
            new_content = new_content.replace(old, new, 1)
            changed = True

    if changed and new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        rel = fpath.replace(BASE, "").replace("\\", "/").lstrip("/")
        print(f"OK: {rel}")
        updated += 1
    elif not changed:
        rel = fpath.replace(BASE, "").replace("\\", "/").lstrip("/")
        print(f"WARN (pattern not found): {rel}")

print(f"\nDone: {updated} updated, {skipped_already} already had Blog link.")
