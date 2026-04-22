# Pilotariak Website Documentation

Organization landing page for the [Pilotariak](https://github.com/Pilotariak) open-source
ecosystem. Built with Astro 6, deployed to Cloudflare Workers.

---

## Tutorials — learn by doing

Start here if you're new to contributing.

- [Add your first Astro component](tutorials/add-your-first-component.md) — build a bilingual
  component from scratch, wire it into a page, and verify it in both locales

---

## How-to guides — solve a specific problem

For contributors who know the project and need to accomplish a task.

- [Add a new project page](how-to/add-a-project-page.md) — create a new `/myproject` page in
  English and French
- [Add a translation key](how-to/add-a-translation.md) — add or update strings in `ui.ts`
- [Deploy to Cloudflare](how-to/deploy-to-cloudflare.md) — build and publish to the edge network

---

## Reference — technical specifications

Consult these while working, not for sequential reading.

- [Component reference](reference/components.md) — all components, their props, slots, and
  CSS class conventions
- [i18n reference](reference/i18n.md) — `useTranslations`, `useTranslatedPath`, `getLangFromUrl`,
  and `astro.config.mjs` options
- [Design tokens reference](reference/design-tokens.md) — all CSS custom properties for color,
  spacing, radius, and typography
- [Commands reference](reference/commands.md) — `make`, `bun run`, and `wrangler` commands
- [Infrastructure reference](reference/infrastructure.md) — deployment topology, Cloudflare Workers config, URL structure

---

## Explanation — understand the design

Read these away from the keyboard to build understanding.

- [Architecture](explanation/architecture.md) — why Astro, why static, why Cloudflare, and the
  relationship between the website and the Frontis/Kancha projects
- [i18n design](explanation/i18n-design.md) — why a custom i18n system instead of a library,
  flat keys vs nesting, and the fallback behavior trade-offs
