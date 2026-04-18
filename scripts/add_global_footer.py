#!/usr/bin/env python3
"""Add US & Canada footer links (Worldwide section) to all non-local/us/ca HTML pages."""

import os, glob

BASE = "C:/Users/Zver/projects/bambino-agency"

# Block to insert before the Contact footer section
WORLDWIDE_BLOCK = """         <h3 class="footer-col-title" style="margin-top:1.5rem">Worldwide</h3>
         <ul class="footer-links" role="list">
           <li><a href="https://bambinoagency.com/us">United States &rarr;</a></li>
           <li><a href="https://bambinoagency.com/ca">Canada &rarr;</a></li>
         </ul>
"""

# Patterns to find — the Contact section header in the Company column
ANCHORS = [
    '         <h3 class="footer-col-title" style="margin-top:1.5rem">Contact</h3>',
    '          <h3 class="footer-col-title" style="margin-top:1.5rem">Contact</h3>',
    '         <h3 class="footer-col-title">Contact</h3>',
    '          <h3 class="footer-col-title">Contact</h3>',
    # Variant with space in style value and trailing semicolon
    '          <h3 class="footer-col-title" style="margin-top: 1.5rem;">Contact</h3>',
    # Blog pages — inline-style footer, contact as last li in Company ul
    '          <li><a href="https://bambinoagency.com/contact" style="color: rgba(255,255,255,0.7);">Contact</a></li>',
]

# For blog pages the block goes AFTER (not before) the anchor
BLOG_ANCHOR = '          <li><a href="https://bambinoagency.com/contact" style="color: rgba(255,255,255,0.7);">Contact</a></li>'

WORLDWIDE_BLOG = """          <li><a href="https://bambinoagency.com/contact" style="color: rgba(255,255,255,0.7);">Contact</a></li>
          <li style="margin-top:0.8rem;padding-top:0.8rem;border-top:1px solid rgba(255,255,255,0.1)"><a href="https://bambinoagency.com/us" style="color: rgba(255,255,255,0.7);">United States &rarr;</a></li>
          <li><a href="https://bambinoagency.com/ca" style="color: rgba(255,255,255,0.7);">Canada &rarr;</a></li>"""

all_html = glob.glob(os.path.join(BASE, "**/*.html"), recursive=True)
targets = [
    f for f in all_html
    if not any(x in f.replace("\\", "/") for x in ["/local/", "/us/", "/ca/"])
]

updated = 0
skipped_already = 0
skipped_no_pattern = 0

for fpath in targets:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already added
    if "bambinoagency.com/us" in content or "bambinoagency.com/ca" in content:
        skipped_already += 1
        continue

    new_content = content
    changed = False

    # Blog pages: replace anchor WITH appended worldwide links
    if BLOG_ANCHOR in new_content:
        new_content = new_content.replace(BLOG_ANCHOR, WORLDWIDE_BLOG, 1)
        changed = True
    else:
        for anchor in ANCHORS[:-1]:  # skip blog anchor (last one)
            if anchor in new_content:
                new_content = new_content.replace(anchor, WORLDWIDE_BLOCK + anchor, 1)
                changed = True
                break

    if changed:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        rel = fpath.replace(BASE, "").replace("\\", "/").lstrip("/")
        print(f"OK: {rel}")
        updated += 1
    else:
        rel = fpath.replace(BASE, "").replace("\\", "/").lstrip("/")
        print(f"WARN (no pattern): {rel}")
        skipped_no_pattern += 1

print(f"\nDone: {updated} updated, {skipped_already} already had links, {skipped_no_pattern} no pattern found.")
