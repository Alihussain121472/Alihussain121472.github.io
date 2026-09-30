#!/usr/bin/env python3
"""
bust_cache.py — Asset cache-buster for araknet.tech portfolio
=============================================================
Run this locally after updating any image asset to force browsers
to fetch the new version instead of serving a stale cached copy.

Usage:
    python bust_cache.py

The script reads index.html, appends or increments a ?v=N query
string on every tracked asset src, then writes the file back.
It never changes any other part of the HTML.
"""

import re

TARGET_FILE = "index.html"

# ── Assets tracked for cache-busting ──────────────────────────────────────
# Add any new image paths here when you add images to the project.
TRACKED_ASSETS = [
    # Hero / profile
    "assets/images/syed-ali.jpg",

    # Project preview images
    "assets/images/novabrief-preview.png",
    "assets/images/leads-agent-preview.svg",
    "assets/images/email-agent-preview.svg",
    "assets/images/dha-agent-preview.svg",

    # Certificates
    "assets/images/certificates/szabist-ijict-ml-research-publication.jpg",
    "assets/images/certificates/harvard-cs50-python.svg",
    "assets/images/certificates/google-python-crash-course.jpg",
    "assets/images/certificates/google-technical-support-fundamentals.jpg",
    "assets/images/certificates/cisco-modern-ai.jpg",
    "assets/images/certificates/aieys-web-developer-internship.jpg",
    "assets/images/certificates/aieys-ai-teaching.jpg",
    # Filename with spaces — keep exactly as-is
    "assets/images/certificates/Certificate of participation in AI Confrence in Germany.jpeg",
]

# ── Read ───────────────────────────────────────────────────────────────────
with open(TARGET_FILE, "r", encoding="utf-8") as f:
    content = f.read()

changes = 0

for asset in TRACKED_ASSETS:
    # Match the bare path OR the path with an existing ?v=N suffix
    escaped = re.escape(asset)
    pattern = rf'({escaped})(\?v=(\d+))?'

    def bump(m):
        global changes
        path    = m.group(1)
        version = int(m.group(3)) + 1 if m.group(3) else 1
        changes += 1
        return f"{path}?v={version}"

    content, n = re.subn(pattern, bump, content)
    if n == 0:
        # Asset not found in the file — skip silently
        changes -= n  # undo the global increment for zero matches

# ── Write ──────────────────────────────────────────────────────────────────
with open(TARGET_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print(f"cache-busted {changes} asset reference(s) in {TARGET_FILE}")
