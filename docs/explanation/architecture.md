# Architecture

## Overview

The Pilotariak website is an organization landing page — a static brochure site that presents
the Pilotariak open-source ecosystem (Frontis, Kancha, Xilo) to developers and contributors. This
context explains most of the architectural choices: no backend, no CMS, no database, just HTML
and CSS that deploys to an edge network in seconds.

---

## Why Astro

Astro was chosen because the site's content is almost entirely static. Every page is known at
build time, no user-generated content exists, and there are no interactive data requirements
beyond scroll animations.

Astro's core contribution is the **Islands Architecture**: components render to HTML at build time,
and JavaScript ships only to the parts of the page that need it (called "islands"). For this site,
the only JavaScript in production is:

- The `IntersectionObserver` scroll-reveal animation on page load
- The nav hamburger toggle for mobile
- The scroll state listener that switches the nav from transparent to white

Everything else — typography, layout, card grids — is pure HTML and CSS. There is no React,
no Vue, no Svelte hydration payload. The consequence is extremely fast time-to-interactive,
which matters for an organization landing page whose first impression is performance.

Astro 6 (the version in use) also provides a first-class i18n routing layer that generates
locale-specific static pages without a runtime locale resolver. See
[Understanding i18n architecture](i18n-design.md) for the details of that choice.

---

## Static vs dynamic

An earlier consideration was using a headless CMS (e.g., Contentful, Sanity) to let
non-developers update page content. This was rejected because:

1. The content changes infrequently — a new project page per major release, roughly once a year
2. CMS integration adds runtime dependencies and build complexity for negligible editorial gain
3. The audience for content changes is developers who are already comfortable with pull requests
4. Keeping strings in `ui.ts` keeps translations type-checked and review-visible in diffs

The result is that all content lives in the repository. This is a deliberate trade-off: less
operational flexibility in exchange for simpler infrastructure, zero runtime dependencies, and
full content auditability in git history.

---

## Cloudflare Workers for static assets

The build artifact is deployed to Cloudflare Workers using the assets binding in `wrangler.jsonc`.
This is Cloudflare's recommended pattern for serving static sites from their edge network.

The choice of Cloudflare over Netlify, Vercel, or GitHub Pages is driven by:

- **Edge distribution**: Cloudflare's network serves the site from the datacenter nearest the
  visitor, with no origin latency
- **Zero cold starts**: Static assets are cached at the edge; there is no serverless function
  boot time
- **Wrangler integration**: The same toolchain (Wrangler) used for the Pilotariak organization's
  other Cloudflare infrastructure reduces context switching

The trade-off is that Cloudflare Workers' asset binding is a relatively newer pattern compared
to Netlify or Vercel deployments. If the CDN strategy changes, the Wrangler config is the only
coupling point — the Astro build output is CDN-agnostic HTML.

---

## Design system in CSS

The design system is encoded as CSS custom properties in `global.css`, not as a component
library or Tailwind classes. This is intentional:

- **No build-time CSS purging**: There are no utility class names to purge; the stylesheet is
  small by construction
- **Browser-native cascading**: Custom properties cascade and inherit normally, making theming
  straightforward
- **Single source of truth**: `DESIGN.md` documents the intention; `global.css` is the
  implementation. Any AI agent generating new components can read both files and produce
  consistent output without installing a package

The alternative — Tailwind CSS — was considered but rejected because the design system has
strong semantic naming requirements (Basque-specific color names, editorial-specific spacing
semantics) that do not map naturally to Tailwind's utility-first vocabulary.

---

## Component granularity

Components are coarse-grained: one file per major page section (`Hero`, `Nav`, `Footer`,
`Projects`). This reflects the site's structure — sections are not reused across pages; they
exist once.

Finer-grained components (e.g., a `Card` component) would be appropriate if card layouts were
used across multiple pages with varying props. Currently, each page that has cards renders them
inline with page-specific data. If a second or third page needs the same card pattern, extracting
a shared component becomes worthwhile. The current approach avoids premature abstraction at the
cost of some duplication.

---

## Relationship to Frontis and Kancha

The website is a presentation layer only. It does not consume the Frontis GraphQL API at build
time or runtime. The Frontis page (`/frontis`) describes the API architecture in static HTML — it
does not query live data. This is appropriate for a v0.3 state of the ecosystem where API
stability is not yet guaranteed and documentation changes frequently.

When the Frontis API reaches a stable schema, one reasonable evolution would be to use Astro's
`getStaticPaths` with a GraphQL client to render real competition data at build time. That change
would be purely additive — no current architectural commitment blocks it.

---

## See Also

- [i18n Architecture](i18n-design.md)
- [Commands reference](../reference/commands.md)
- [Design Tokens reference](../reference/design-tokens.md)
