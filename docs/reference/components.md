# Component Reference

All Astro components live in `src/components/`. Each is a `.astro` file with scoped `<style>` blocks
using CSS custom properties from `global.css`.

---

## `Nav`

**File:** `src/components/Nav.astro`

Fixed-position navigation bar. Transparent over the hero gradient; switches to white background
with border when `window.scrollY > 20`.

**Props:** none (locale resolved via `Astro.currentLocale`)

**Slots:** none

**Emitted classes:**
- `.is-scrolled` — added to `<header id="nav">` via scroll listener
- `.is-open` — added to hamburger button and mobile menu when open

**Behavior:**
- Desktop (≥768px): horizontal link bar with `LanguagePicker` and GitHub icon
- Mobile (<768px): hamburger button opens slide-in `#mobile-menu` with `max-height` transition
- Nav links array: `/#pelote-basque`, `/#projets`, `/frontis`, `/kancha`, `/xilo`

**i18n keys used:** `nav.ariaHome`, `nav.ariaMain`, `nav.openMenu`, `nav.pelote`, `nav.projets`

---

## `Hero`

**File:** `src/components/Hero.astro`

Full-width hero section for the home page. Red-to-cream gradient background with two decorative
translucent circles.

**Props:** none

**Slots:** none

**Structure:**
- `.hero__gradient` — `position: absolute; inset: 0` gradient layer
- `.hero__circle--1` — 420×420px, top-right
- `.hero__circle--2` — 260×260px, top-left
- `.hero__content` — constrained to `.container`, `z-index: 1`
- `.hero__actions` — flex row of CTA buttons

**i18n keys used:** `hero.ariaLabel`, `hero.eyebrow`, `hero.subtitle`, `hero.cta.discover`

---

## `Projects`

**File:** `src/components/Projects.astro`

Project card grid displayed on the home page. Renders the Frontis, Kancha, and Xilo project cards.

**Props:** none

**i18n keys used:** `projects.*` namespace

---

## `Features`

**File:** `src/components/Features.astro`

Feature highlight grid. Renders icon + heading + description cards for capability callouts.

**Props:** none

---

## `Stats`

**File:** `src/components/Stats.astro`

Metric counters (e.g., number of clubs, competitions). Renders numeric stat cards.

**Props:** none

---

## `Competitions`

**File:** `src/components/Competitions.astro`

Recent/upcoming competition list or card grid.

**Props:** none

---

## `Cta`

**File:** `src/components/Cta.astro`

Centered call-to-action block with heading, body text, and primary + secondary button.

**Props:** none (content via i18n)

---

## `Footer`

**File:** `src/components/Footer.astro`

Dark footer (`--night` background). Four-column link grid on desktop, two-column on tablet,
single-column on mobile.

**Props:** none

**i18n keys used:** `footer.*` namespace

---

## `LanguagePicker`

**File:** `src/components/LanguagePicker.astro`

Language switcher rendered inside `Nav`. Generates links for all supported locales (`en`, `fr`).

**Props:** none

**Behavior:** Uses `useTranslatedPath` to construct locale-prefixed versions of the current path.
English routes have no prefix (`/frontis`); French routes are prefixed (`/fr/frontis`).

---

## Layout

**File:** `src/layouts/Layout.astro`

Base HTML document wrapper. Sets `<html lang>`, meta tags, OG tags, favicon, hreflang alternates,
and loads `global.css`.

**Props:**

| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | `'Pilotariak — Pelota Basque'` |
| `description` | `string` | Locale-appropriate default description |

**Slots:** default slot renders inside `<body>`

**hreflang links:** Auto-generated for `en` and `fr` from `Astro.url.pathname`.

---

## CSS class conventions

| Pattern | Meaning |
|---------|---------|
| `.reveal` | Element animates in on intersection (IntersectionObserver, threshold 0.12) |
| `.reveal--delay-1` through `--delay-4` | Staggered animation delays |
| `.is-visible` | Added by IntersectionObserver when element enters viewport |
| `.container` | Max-width wrapper: `--container-max` (1200px) with `--container-pad` horizontal padding |
| `.eyebrow` | 12px uppercase label with +1.5px letter-spacing |
| `.eyebrow--light` | White variant for use over the hero gradient |
| `.btn` | Base button style |
| `.btn--primary` | Red background, white label |
| `.btn--secondary` | Outlined red |
| `.btn--white` | White background, red label (hero zone) |
| `.btn--ghost-white` | Transparent, white border and label (hero zone) |
| `.section` | Standard section padding and background |
| `.section--alt` | Alternate section background (`--surface-alt`) |
| `.section-header` | Eyebrow + heading + subtitle stack |

---

## See Also

- [Design Tokens reference](design-tokens.md)
- [i18n utilities reference](i18n.md)
