#!/usr/bin/env python3
"""Replace legacy .html and /local/ internal links with canonical Vercel URLs."""

import argparse
import json
import os
import posixpath
import re
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit

SITE_ROOT = Path(__file__).resolve().parent.parent
DOMAIN = "https://bambinoagency.com"
HREF_RE = re.compile(r"(?P<prefix>\bhref\s*=\s*[\"'])(?P<url>[^\"']+)(?P<suffix>[\"'])", re.IGNORECASE)


def page_url(html_path):
    relative = html_path.relative_to(SITE_ROOT).as_posix()
    return "/index.html" if relative == "index.html" else "/" + relative


def canonical_path(path):
    if path.endswith("/index.html"):
        return path[: -len("/index.html")] or "/"
    if path.endswith(".html"):
        return path[: -len(".html")] or "/"
    return path or "/"


def load_redirects():
    config = json.loads((SITE_ROOT / "vercel.json").read_text(encoding="utf-8"))
    return {
        item["source"].rstrip("/") or "/": item["destination"].rstrip("/") or "/"
        for item in config.get("redirects", [])
    }


def target_exists(href):
    path = urlsplit(href).path.rstrip("/") or "/"
    relative = path.strip("/")
    candidates = [SITE_ROOT / "index.html"] if not relative else [SITE_ROOT / relative / "index.html", SITE_ROOT / (relative + ".html")]
    return any(candidate.exists() for candidate in candidates)


def normalize_href(source, href, redirects):
    if href.startswith(("#", "mailto:", "tel:", "javascript:")):
        return href
    parsed = urlsplit(href)
    if parsed.netloc and parsed.netloc != "bambinoagency.com":
        return href
    resolved = urlsplit(urljoin(DOMAIN + page_url(source), href))
    if resolved.netloc != "bambinoagency.com":
        return href
    path = redirects.get(canonical_path(posixpath.normpath(resolved.path)), canonical_path(posixpath.normpath(resolved.path)))
    return urlunsplit(("", "", path, resolved.query, resolved.fragment))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    redirects = load_redirects()
    files_changed = links_changed = 0
    for root, directories, names in os.walk(SITE_ROOT):
        directories[:] = [name for name in directories if name not in {".git", "node_modules"}]
        for name in names:
            if not name.endswith(".html"):
                continue
            path = Path(root) / name
            content = path.read_text(encoding="utf-8")

            def replace(match):
                nonlocal links_changed
                href = match.group("url")
                if ".html" not in href and "/local/" not in href:
                    return match.group(0)
                normalized = normalize_href(path, href, redirects)
                if normalized == href or not target_exists(normalized):
                    return match.group(0)
                links_changed += 1
                return f"{match.group('prefix')}{normalized}{match.group('suffix')}"

            updated = HREF_RE.sub(replace, content)
            if updated != content:
                files_changed += 1
                if not args.check:
                    path.write_text(updated, encoding="utf-8")
    print(f"legacy links {'found' if args.check else 'normalized'}: {links_changed} across {files_changed} HTML files")
    return 1 if args.check and links_changed else 0


if __name__ == "__main__":
    raise SystemExit(main())
