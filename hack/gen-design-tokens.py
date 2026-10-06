#!/usr/bin/env python3
# SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
# SPDX-License-Identifier: Apache-2.0
"""Generate the CSS :root design-token block from DESIGN.md.

DESIGN.md frontmatter is the single source of truth. This script renders the
`:root { ... }` block in src/styles/global.css from those tokens.

Usage:
    gen-design-tokens.py            # rewrite global.css in place
    gen-design-tokens.py --check    # exit 1 if global.css is out of date (CI)
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

try:
    import yaml
except ModuleNotFoundError:
    sys.exit("error: PyYAML is required (pip install pyyaml)")

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / "DESIGN.md"
CSS = ROOT / "src" / "styles" / "global.css"

# Map a CSS custom property -> how to source its value from the frontmatter.
# ("c", key)  -> colors[key]      ("s", key) -> spacing[key]
# ("r", key)  -> rounded[key]     ("x", key) -> meta.cssExtras[key]
LAYOUT: list[tuple[str, list[tuple[str, tuple[str, str]]]]] = [
    ("Brand", [
        ("--red", ("c", "brand")),
        ("--red-dark", ("c", "brandDark")),
        ("--red-soft", ("c", "brandSoft")),
        ("--red-border", ("x", "red-border")),
    ]),
    ("Canvas", [
        ("--cream", ("c", "background")),
        ("--card", ("c", "surface")),
        ("--white", ("c", "surfaceElevated")),
        ("--surface-alt", ("c", "surfaceAlt")),
        ("--line", ("c", "border")),
    ]),
    ("Ink", [
        ("--ink", ("c", "textPrimary")),
        ("--text", ("c", "text")),
        ("--muted", ("c", "textMuted")),
        ("--subtle", ("c", "textSubtle")),
    ]),
    ("Semantic", [
        ("--green", ("c", "success")),
        ("--green-soft", ("c", "successSoft")),
        ("--amber", ("c", "championship")),
        ("--amber-soft", ("c", "championshipSoft")),
    ]),
    ("Dark surfaces", [
        ("--panel", ("c", "panel")),
    ]),
    ("Shadow", [
        ("--shadow", ("x", "shadow")),
        ("--shadow-subtle", ("x", "shadow-subtle")),
        ("--error", ("c", "error")),
        ("--info", ("c", "info")),
        ("--focus-ring", ("x", "focus-ring")),
    ]),
    ("Spacing", [
        ("--space-2xs", ("s", "2xs")),
        ("--space-xs", ("s", "xs")),
        ("--space-sm", ("s", "sm")),
        ("--space-md", ("s", "md")),
        ("--space-lg", ("s", "lg")),
        ("--space-xl", ("s", "xl")),
        ("--space-2xl", ("s", "2xl")),
        ("--space-3xl", ("s", "3xl")),
        ("--space-hero", ("s", "hero")),
    ]),
    ("Radius", [
        ("--radius-sm", ("r", "sm")),
        ("--radius-md", ("r", "md")),
        ("--radius-lg", ("r", "lg")),
        ("--radius-xl", ("r", "xl")),
        ("--radius-hero", ("r", "hero")),
        ("--radius-pill", ("r", "pill")),
    ]),
    ("Container", [
        ("--container-max", ("x", "container-max")),
        ("--container-pad", ("x", "container-pad")),
    ]),
    ("Typography", [
        ("--font-sans", ("x", "font-sans")),
    ]),
]


def load_tokens() -> dict:
    text = DESIGN.read_text()
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        sys.exit("error: DESIGN.md has no YAML frontmatter")
    return yaml.safe_load(m.group(1))


def resolve(tokens: dict, source: tuple[str, str]) -> str:
    kind, key = source
    groups = {"c": "colors", "s": "spacing", "r": "rounded"}
    if kind in groups:
        value = tokens[groups[kind]].get(key)
    elif kind == "x":
        value = tokens.get("meta", {}).get("cssExtras", {}).get(key)
    else:  # pragma: no cover
        value = None
    if value is None:
        sys.exit(f"error: token for {source} not found in DESIGN.md")
    return str(value)


def render_root(tokens: dict) -> str:
    lines = [":root {"]
    for i, (group, entries) in enumerate(LAYOUT):
        if i:
            lines.append("")
        lines.append(f"  /* {group} */")
        for prop, source in entries:
            lines.append(f"  {prop}: {resolve(tokens, source)};")
    lines.append("}")
    return "\n".join(lines)


def main() -> int:
    check = "--check" in sys.argv[1:]
    tokens = load_tokens()
    new_root = render_root(tokens)

    css = CSS.read_text()
    if not re.search(r":root\s*\{.*?\n\}", css, re.S):
        sys.exit(f"error: no :root block found in {CSS}")
    updated = re.sub(r":root\s*\{.*?\n\}", lambda _: new_root, css, count=1, flags=re.S)

    if check:
        if updated != css:
            sys.stderr.write(
                "error: src/styles/global.css is out of date with DESIGN.md tokens.\n"
                "       run `make tokens` and commit the result.\n"
            )
            return 1
        print("✅ global.css tokens match DESIGN.md")
        return 0

    if updated != css:
        CSS.write_text(updated)
        print(f"✅ wrote {CSS.relative_to(ROOT)} from DESIGN.md")
    else:
        print("✅ global.css already up to date")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
