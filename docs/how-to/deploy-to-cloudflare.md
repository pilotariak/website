# How to Deploy to Cloudflare Workers

## Context

The site is deployed as a static asset bundle to Cloudflare Workers via Wrangler. The `wrangler.jsonc`
at the project root points Cloudflare to the `./dist` directory produced by `make build`.

## Prerequisites

- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) installed and authenticated
- Cloudflare account with Workers access
- Production build created (`make build`)

---

## Steps

### 1. Build the site

```bash
make build
```

Output goes to `./dist`. You should see:

```
✓ Built in Xms
dist/
  _worker.js
  index.html
  frontis/index.html
  fr/index.html
  ...
```

If the build fails, run `make check` first to catch type errors.

### 2. Authenticate with Cloudflare

If not already logged in:

```bash
wrangler login
```

This opens a browser window for OAuth authentication. Return to the terminal after approving.

### 3. Deploy

```bash
wrangler deploy
```

Wrangler reads `wrangler.jsonc` and uploads `./dist` as the asset directory for the
`pilotariak-website` worker. Output ends with:

```
Deployed pilotariak-website triggers (1 route)
  https://pilotariak-website.<your-subdomain>.workers.dev
```

### 4. Verify the deployment

Open the URL from step 3. Check:

- Home page loads with red hero
- `/frontis` and `/kancha` routes serve correctly
- `/fr/` prefix loads French translations
- No 404s on static assets (fonts, favicon)

### 5. Configure a custom domain (optional)

In the Cloudflare dashboard, navigate to **Workers & Pages → pilotariak-website → Settings →
Domains & Routes**. Add a custom domain or route pattern to map `pilotariak.io` (or your domain)
to the worker.

### Troubleshooting

- **`wrangler deploy` fails with "assets directory not found"**: Run `make build` first. The
  `./dist` directory must exist.
- **`wrangler: command not found`**: Install with `bun add -g wrangler` or `npm install -g wrangler`.
- **404 on `/fr/frontis`**: Astro's i18n routing generates these pages statically. Verify `dist/fr/frontis/index.html` exists after the build.
- **Authentication error**: Run `wrangler whoami` to check login state. Re-run `wrangler login` if needed.

## Related Resources

- [Commands reference](../reference/commands.md)
- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
