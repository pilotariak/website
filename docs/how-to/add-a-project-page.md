# How to Add a New Project Page

## Context

When the Pilotariak organization ships a new project, it needs a dedicated page at a slug like
`/myproject`. This guide covers adding that page in both English and French, following the
existing structure of `frontis.astro` and `kancha.astro`.

## Prerequisites

- Dev server running (`make dev`)
- Familiarity with Astro page syntax
- Translation keys written for the new project (see [How to add a translation key](add-a-translation.md))

---

## Steps

### 1. Create the English page

Create `src/pages/<slug>.astro` (e.g., `src/pages/myproject.astro`). Copy the structure from
`src/pages/frontis.astro` as a starting point. Update:

- The `<Layout>` `title` and `description` props to use your new `t('myproject.meta.*')` keys
- The hero `<h1>` text to your project name
- All `t('frontis.*')` calls to `t('myproject.*')` equivalents
- All external links (GitHub URL, docs URL)
- Section content to match your project's architecture and features

The minimum required sections are: hero, overview, and CTA.

### 2. Create the French mirror page

Create `src/pages/fr/<slug>.astro` with identical structure. The locale is resolved from the URL
prefix (`/fr/`), so `Astro.currentLocale` returns `'fr'` automatically — no extra configuration
needed.

```astro
---
// src/pages/fr/myproject.astro
import Layout from "../../layouts/Layout.astro";
// ... same imports as the English page
const lang = (Astro.currentLocale ?? "en") as Lang;
const t = useTranslations(lang);
---
<!-- identical template to src/pages/myproject.astro -->
```

### 3. Add translation keys

Open `src/i18n/ui.ts` and add all keys your page uses under both `en` and `fr` objects. See
[How to add a translation key](add-a-translation.md) for the exact steps.

### 4. Register the page in the nav

Open `src/components/Nav.astro`. Locate the `navLinks` array and add a new entry:

```typescript
{ href: tp('/myproject'), label: t('nav.myproject') },
```

Add the matching `nav.myproject` key to `src/i18n/ui.ts` for both locales.

### 5. Add a project card on the home page

Open `src/components/Projects.astro`. Add a new `<article>` card following the existing card
pattern, linking to `tp('/myproject')`. Use the `t('projects.myproject.*')` keys for title,
description, and CTA label.

### 6. Verify both routes

- Open `http://localhost:4321/myproject` — English page renders correctly
- Open `http://localhost:4321/fr/myproject` — French translations appear
- Click the nav link from the home page in both locales — routing works

### Troubleshooting

- **404 on `/myproject`**: Verify the file is at `src/pages/myproject.astro` (not inside `src/pages/fr/`)
- **French page shows English text**: Check the `fr` object in `ui.ts` — missing keys fall back to English silently
- **Nav link missing on mobile**: Verify the key is added in `Nav.astro`'s `navLinks` array, not just the desktop template

## Related Resources

- [i18n utilities reference](../reference/i18n.md)
- [Component reference](../reference/components.md)
- [Understanding i18n architecture](../explanation/i18n-design.md)
