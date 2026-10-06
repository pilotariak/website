#!/usr/bin/env python3
# SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
# SPDX-License-Identifier: Apache-2.0
"""Generate CSS design tokens from DESIGN.md — the single source of truth.

DESIGN.md frontmatter owns every token value. This script renders the
`:root { ... }` blocks of both src/styles/global.css and preview.html from
those tokens, and audits preview.html swatch labels so the visual catalog
cannot advertise a hex that disagrees with the source.

Usage:
    gen-design-tokens.py            # rewrite the generated files in place
    gen-design-tokens.py --check    # exit 1 if any file is out of date (CI)
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
PREVIEW = ROOT / "preview.html"

# Source of each CSS custom property in the frontmatter:
#   ("c", key) -> colors[key]   ("s", key) -> spacing[key]
#   ("r", key) -> rounded[key]  ("x", key) -> meta.cssExtras[key]
Source = tuple[str, str]
Group = tuple[str, list[tuple[str, Source]]]

# Full token block rendered into src/styles/global.css.
GLOBAL_LAYOUT: list[Group] = [
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

# Colour block rendered into preview.html (its catalog uses no spacing/radius,
# but adds two preview-only helpers: --night and --shadow-lg).
PREVIEW_LAYOUT: list[Group] = [
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
    ("Text", [
        ("--ink", ("c", "textPrimary")),
        ("--text", ("c", "text")),
        ("--muted", ("c", "textMuted")),
        ("--subtle", ("c", "textSubtle")),
    ]),
    ("Status", [
        ("--green", ("c", "success")),
        ("--green-soft", ("c", "successSoft")),
        ("--amber", ("c", "championship")),
        ("--amber-soft", ("c", "championshipSoft")),
    ]),
    ("Dark", [
        ("--panel", ("c", "panel")),
        ("--night", ("x", "night")),
    ]),
    ("Shadows", [
        ("--shadow", ("x", "shadow")),
        ("--shadow-lg", ("x", "shadow-lg")),
    ]),
    ("Aliases", [
        ("--error", ("c", "error")),
        ("--info", ("c", "info")),
        ("--focus-ring", ("x", "focus-ring")),
    ]),
]

ROOT_RE = re.compile(r":root\s*\{.*?\}", re.S)


def load_tokens() -> dict:
    text = DESIGN.read_text()
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        sys.exit("error: DESIGN.md has no YAML frontmatter")
    return yaml.safe_load(m.group(1))


def resolve(tokens: dict, source: Source) -> str:
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


def render_root(tokens: dict, layout: list[Group], var_indent: int, brace_indent: int) -> str:
    vi, bi = " " * var_indent, " " * brace_indent
    lines = [":root {"]
    for i, (group, entries) in enumerate(layout):
        if i:
            lines.append("")
        lines.append(f"{vi}/* {group} */")
        for prop, source in entries:
            lines.append(f"{vi}{prop}: {resolve(tokens, source)};")
    lines.append(f"{bi}}}")
    return "\n".join(lines)


def value_map(tokens: dict) -> dict[str, str]:
    """var name -> resolved value (lowercased), across every layout."""
    out: dict[str, str] = {}
    for layout in (GLOBAL_LAYOUT, PREVIEW_LAYOUT):
        for _, entries in layout:
            for prop, source in entries:
                out[prop[2:]] = resolve(tokens, source).lower()
    return out


def rewrite_root(path: Path, new_root: str) -> tuple[str, str]:
    text = path.read_text()
    if not ROOT_RE.search(text):
        sys.exit(f"error: no :root block found in {path}")
    return text, ROOT_RE.sub(lambda _: new_root, text, count=1)


def audit_preview_labels(tokens: dict, text: str) -> list[str]:
    """Every `--var · #hex` swatch label must match the token's value."""
    values = value_map(tokens)
    problems: list[str] = []
    for var, hex_shown in re.findall(r"--([a-z0-9-]+)\s*·\s*(#[0-9A-Fa-f]{6})", text):
        want = values.get(var)
        if want is None:
            problems.append(f"preview.html: swatch label --{var} has no matching token")
        elif want != hex_shown.lower():
            problems.append(
                f"preview.html: swatch label --{var} shows {hex_shown} but token is {want}"
            )
    return problems


def main() -> int:
    check = "--check" in sys.argv[1:]
    tokens = load_tokens()

    targets = [
        (CSS, render_root(tokens, GLOBAL_LAYOUT, 2, 0)),
        (PREVIEW, render_root(tokens, PREVIEW_LAYOUT, 6, 4)),
    ]

    stale: list[str] = []
    for path, new_root in targets:
        old, updated = rewrite_root(path, new_root)
        rel = path.relative_to(ROOT)
        if check:
            if updated != old:
                stale.append(str(rel))
        elif updated != old:
            path.write_text(updated)
            print(f"✅ wrote {rel} from DESIGN.md")
        else:
            print(f"✅ {rel} already up to date")

    problems = audit_preview_labels(tokens, PREVIEW.read_text())

    if check:
        if stale:
            sys.stderr.write(
                "error: these files are out of date with DESIGN.md tokens:\n"
                + "".join(f"  - {s}\n" for s in stale)
                + "       run `make tokens` and commit the result.\n"
            )
        for p in problems:
            sys.stderr.write(f"error: {p}\n")
        if stale or problems:
            return 1
        print("✅ global.css + preview.html tokens match DESIGN.md")
        return 0

    for p in problems:
        sys.stderr.write(f"warning: {p}\n")
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
