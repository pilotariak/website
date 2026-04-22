# Commands Reference

Two equivalent command sets are available: `make` targets and `bun run` scripts. Both invoke the
same underlying Astro CLI operations.

---

## Make targets

Run from the project root. `make help` lists all targets with descriptions.

### Development

| Command | Description |
|---------|-------------|
| `make install` | Install dependencies via `bun install` |
| `make dev` | Start Astro dev server at `http://localhost:4321` with HMR |
| `make build` | Build static site to `./dist/` |
| `make preview` | Serve the production build locally for inspection |

### Quality

| Command | Description |
|---------|-------------|
| `make check` | Run `astro check` — TypeScript and template type errors |
| `make lint` | Run configured linters (see `dprint.json`) |

### Maintenance

| Command | Description |
|---------|-------------|
| `make clean` | Delete `dist/` and `.astro/` build artifacts |

---

## Bun scripts

Defined in `package.json` under `"scripts"`.

| Command | Equivalent Make target | Description |
|---------|------------------------|-------------|
| `bun run dev` | `make dev` | Start dev server |
| `bun run build` | `make build` | Build to `./dist/` |
| `bun run preview` | `make preview` | Preview built site |
| `bun run astro` | — | Raw Astro CLI passthrough |

---

## Wrangler (deployment)

Configured via `wrangler.jsonc`. Requires Wrangler CLI installed separately.

| Command | Description |
|---------|-------------|
| `wrangler login` | Authenticate with Cloudflare account |
| `wrangler deploy` | Deploy `./dist/` to Cloudflare Workers |
| `wrangler dev` | Local Cloudflare Workers emulation (serves built `./dist/`) |
| `wrangler whoami` | Show currently authenticated Cloudflare account |

---

## Dev server

| Property | Value |
|----------|-------|
| Default URL | `http://localhost:4321` |
| HMR | Enabled (file changes reload automatically) |
| i18n routes | `/` (English), `/fr/` (French) |
| Node requirement | `>=22.12.0` (see `engines` in `package.json`) |

---

## Build output

`make build` produces:

```
dist/
├── _worker.js          # Cloudflare Worker entry
├── index.html          # English home
├── frontis/
│   └── index.html
├── kancha/
│   └── index.html
├── xilo/
│   └── index.html
└── fr/
    ├── index.html      # French home
    ├── frontis/index.html
    ├── kancha/index.html
    └── xilo/index.html
```

---

## See Also

- [How to deploy to Cloudflare](../how-to/deploy-to-cloudflare.md)
