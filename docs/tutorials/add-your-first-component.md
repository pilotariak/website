# Tutorial: Add Your First Astro Component

## What You'll Learn

- Create an Astro component that follows the Pilotariak design system
- Wire a new component into an existing page
- Use i18n translation keys inside a component
- Apply CSS custom properties from `global.css`

## What You'll Build

A `Announcement` banner component that sits below the hero on the home page. It shows a short
message with a badge and a link, styled with the Warm Limestone Cream canvas and Basque Crimson Red
accent.

**Estimated time:** 20 minutes

## Prerequisites

- [Bun](https://bun.sh) >= 1.0 installed
- Dev server running (`make dev` or `bun run dev`) at `localhost:4321`
- Basic familiarity with HTML and CSS

---

## Step 1: Start the development server

Open your terminal in the project root and run:

```bash
make dev
```

You should see output ending with:

```
 astro  v6.x.x ready in Xms

 ┃ Local    http://localhost:4321/
 ┃ Network  use --host to expose
```

Open `http://localhost:4321` in your browser. You should see the Pilotariak homepage with the red
hero section.

---

## Step 2: Create the component file

Create a new file at `src/components/Announcement.astro`:

```astro
---
// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

interface Props {
  message: string;
  href: string;
  label: string;
}

const { message, href, label } = Astro.props;
---

<div class="announcement">
  <span class="announcement__badge">New</span>
  <p class="announcement__text">{message}</p>
  <a href={href} class="announcement__link">
    {label}
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</div>

<style>
  .announcement {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: var(--radius-pill);
    padding: var(--space-xs) var(--space-lg);
    width: fit-content;
    margin: 0 auto var(--space-2xl);
  }

  .announcement__badge {
    background-color: var(--red);
    color: var(--white);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: var(--radius-pill);
    flex-shrink: 0;
  }

  .announcement__text {
    font-size: 14px;
    color: var(--text);
  }

  .announcement__link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
    color: var(--red);
    white-space: nowrap;
    transition: color 150ms ease;
  }

  .announcement__link:hover {
    color: var(--red-dark);
  }
</style>
```

Notice that `var(--space-md)`, `var(--card)`, and `var(--red)` reference the design tokens defined
in `src/styles/global.css` — no new values needed.

---

## Step 3: Add translation keys

Open `src/i18n/ui.ts` and find the English translations object. Add three new keys inside the `en`
object:

```typescript
'announcement.message': 'Frontis now supports GraphQL Federation v2.',
'announcement.link': 'Learn more',
'announcement.label': 'Announcement',
```

Add matching French translations inside the `fr` object:

```typescript
'announcement.message': 'Frontis supporte désormais GraphQL Federation v2.',
'announcement.link': 'En savoir plus',
'announcement.label': 'Annonce',
```

Save the file. The TypeScript type for `t()` auto-infers valid keys from `ui.ts`, so if you
mistype a key, your editor will highlight it.

---

## Step 4: Add the component to the home page

Open `src/pages/index.astro`. At the top, import your new component:

```astro
---
import Announcement from "../components/Announcement.astro";
---
```

Inside the `<main>` element, add the component between `<Hero />` and `<Projects />`:

```astro
<main id="main" tabindex="-1">
  <Hero />
  <Announcement
    message={t('announcement.message')}
    href="/frontis"
    label={t('announcement.link')}
  />
  <Projects />
</main>
```

---

## Step 5: Verify in the browser

Switch to your browser at `http://localhost:4321`. You should see a small pill-shaped banner with
a red "New" badge, your message text, and a "Learn more" link appearing between the hero and the
projects grid.

Try resizing the browser to a narrow width (below 640px). The banner wraps gracefully because of
`width: fit-content` and the flex layout.

Now open `http://localhost:4321/fr`. You should see the French message text automatically.

---

## What You've Accomplished

You've built a fully functional, bilingual Astro component that:

- Uses the design system CSS tokens — no hardcoded colors
- Follows the SPDX license header convention
- Integrates with the i18n system via typed translation keys
- Adapts to both language routes automatically

## Next Steps

- **Add more states**: See [How to add a new translation key](../how-to/add-a-translation.md) to
  expand i18n coverage.
- **Create a full project page**: See [How to add a project page](../how-to/add-a-project-page.md).
- **Understand the design tokens**: See [Design Tokens reference](../reference/design-tokens.md).
- **Understand why Astro was chosen**: See [Architecture explanation](../explanation/architecture.md).
