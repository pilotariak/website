# AGENTS.md — Pilotariak Website

Organization landing page for [Pilotariak](https://github.com/Pilotariak), built with [Astro](https://astro.build).
Deployed to Cloudflare Workers (static assets + `worker.js`). Supports English and French (i18n).

## Architecture

```
website/
├── src/
│   ├── pages/          # Astro file-based routes
│   │   ├── index.astro          # English home (default locale)
│   │   └── fr/                  # French locale pages
│   ├── components/     # Astro/React components
│   ├── layouts/        # Page layout wrappers
│   └── content/        # Markdown/MDX content collections
├── public/             # Static assets (copied as-is)
└── docs/               # Diataxis documentation (tutorials, how-to, reference, explanation)
```

## Dev Setup

Requirements: [Bun](https://bun.sh) ≥ 1.0

```bash
make install     # bun install
make dev         # bun run dev  →  http://localhost:4321
make build       # bun run build  →  ./dist/
make preview     # serve ./dist/ locally
```

## i18n

Configured in `astro.config.mjs`:

- Default locale: `en` (no prefix — `/about`)
- French locale: `fr` prefix (`/fr/about`)
- Translation strings live alongside their pages; follow the existing pattern when adding new content.

## Quality Checks

```bash
make check       # astro check (TypeScript + template types)
make lint        # eslint / dprint linting
```

## Deployment (Cloudflare Workers)

The site deploys automatically via CI on merge to `main`. Manual deploy:

```bash
bunx wrangler deploy
```

Config in `wrangler.jsonc`.

## Agent discovery surface

`worker.js` runs before static assets (`run_worker_first` in `wrangler.jsonc`) and adds:

- Markdown for every page: `Accept: text/markdown`, AI-agent User-Agents, or a `.md` twin
  (`/index.md`, `/frontis.md`, `/fr/index.md`); unknown paths return `404` (markdown body on request)
- `/?mode=agent` JSON summary and RFC 8288 `Link` discovery headers on HTML pages

Static discovery files live in `public/` (`llms.txt`, `auth.md`, `developers/llms.txt`,
`.well-known/{ard.json,ai-catalog.json,api-catalog,mcp/server-card.json,agent-card.json,...}`).
JSON-LD comes from `src/lib/schema.ts` (also feeds `/schema-feed.jsonl`); WebMCP tools are in
`src/scripts/webmcp.ts`. After editing any `SKILL.md`, update its `sha256` digest in
`public/.well-known/agent-skills/index.json` (CI verifies it). Real endpoints: Frontis GraphQL
`https://frontis-gateway.pilotariak.com/graphql` (no auth), Azkena MCP
`https://mcp.pilotariak.com/mcp` (OAuth 2.1).

## Documentation

Docs follow the [Diataxis](https://diataxis.fr/) framework — see `docs/index.md` for the full index:

| Type          | Content                                                    |
| ------------- | ---------------------------------------------------------- |
| Tutorials     | Add a new component from scratch                           |
| How-to guides | Add a project page, add a translation, deploy              |
| Reference     | Components API, i18n helpers, design tokens, make commands |
| Explanation   | Architecture decisions, i18n rationale                     |

Design system documented in `DESIGN.md`.

## Key Conventions

- **Astro** components for static content; use React only when interactivity is needed
- All user-facing text must have translations in both `en` and `fr`
- Design tokens live in `DESIGN.md` — check it before adding new colors or spacing values
- Formatting: `dprint` (config in `dprint.json`)
- License headers required on all source files (checked by `licenserc.toml`)
