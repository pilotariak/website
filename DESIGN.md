# Design System — Pilotariak Website

> Pelota basque community hub. Warm cream canvas, Basque red identity, editorial precision.

---

## 1. Visual Theme & Atmosphere

**Mood:** Rooted and warm. Pilotariak's website feels like an authoritative sports federation combined with the warmth of a regional cultural institution. The UI evokes the materiality of a pelota fronton: cream limestone walls, deep red banners, and the crisp geometry of the court's lines. This is not generic sports design — every decision references Basque visual culture without resorting to kitsch.

**Core philosophy:**

- A **cream white canvas** (`#F7F4EF`) is the page background at all times. Never pure white (`#FFFFFF`), never cold gray. Warm, off-white, tactile.
- A **Basque red** (`#C8102E`) is the single dominant brand color. It earns every pixel — used only for hero zones, primary CTAs, navigation accents, and featured content.
- **Dark ink** (`#141414`) for headings and primary body text. Near-black with warmth, never pure black.
- **Elevation through cards and borders**, not heavy drop shadows. Cards separate from the cream canvas via a warm border (`#E5DED6`).
- The hero section runs a **red-to-cream vertical gradient** (0 → 480px), creating a cinematic fronton-entrance without hard transitions.

**Key characteristics:**

- Desktop-first, fully responsive down to 320px. 80px horizontal gutters on large screens, 24px on mobile.
- **No decorative imagery** as primary content — typography, color, and whitespace do the expressive work. Photos, when used, are full-bleed within contained sections.
- **Phase-driven page structure:** hero (red zone) → section intro (cream transition) → content grid (cream field) → footer (dark ink).
- Rounded, confident geometry. No element below 6px border-radius.
- Built with **Astro** — every component must be SSG-compatible. No client-side-only rendering for above-the-fold content.

---

## 2. Color Palette & Roles

### Brand & Primary

- **Red** (`#C8102E`): Primary brand color. Hero backgrounds, CTA buttons, active navigation indicators, score text, and featured card backgrounds. Use at full opacity only — never tint arbitrarily.
- **Red Dark** (`#970D25`): Gradient bottom stop, pressed/hover state for red buttons, error text on light surfaces.
- **Red Soft** (`#FDE8EC`): Error state backgrounds, highlight chips on light cards, subtle badge backgrounds.
- **Red Border** (`rgba(200, 16, 46, 0.2)`): Error field borders, finals card accent borders.

### Canvas & Surfaces

- **Cream** (`#F7F4EF`): Default page background. Warm off-white — the single most important value in the system. Do not substitute.
- **Card** (`#FFFDFC`): Slightly warmer than cream; used for list cards and content cards that sit on the cream background, creating one step of visual elevation.
- **White** (`#FFFFFF`): Modal surfaces, high-contrast inset content, result cards.
- **Surface Alt** (`#F2EDE7`): Subtle tinted background for alternating page sections (e.g., "About" stripe).
- **Line** (`#E5DED6`): Universal border and divider color. Warm greige — always matches the cream family.

### Ink & Text

- **Ink** (`#141414`): Headings (H1–H3), card titles, primary body text on all light backgrounds.
- **Text** (`#262626`): Body copy, paragraph text — slightly softer than Ink.
- **Muted** (`#7A7A7A`): Eyebrow labels, metadata, secondary captions, placeholder text.
- **Subtle** (`#A8A49E`): Decorative text, disabled states, very secondary info.

### Semantic

- **Green** (`#1F7A5A`): Success states, live/active badges, upcoming status indicators.
- **Green Soft** (`#E6F4EE`): Success badge background.
- **Amber** (`#C8900A`): Finals/championship round highlights, trophy indicators.
- **Amber Soft** (`#FFF8E7`): Finals badge background.

### Dark Surfaces (footer, overlays)

- **Footer BG** (`#141414`): Dark footer background — matches Ink.
- **Footer Surface** (`#1E1E1E`): Slightly elevated panels within the footer.
- **Panel** (`#1E1E1E`): Dark inset surfaces within red hero cards.

### Shadow

- **Shadow** (`rgba(103, 18, 31, 0.10)`): Elevation shadow — red-tinted for brand warmth. Used only on CTAs and featured cards.
- **Shadow Subtle** (`rgba(0, 0, 0, 0.06)`): Neutral low-opacity shadow for standard card hover states.

### Reference Table

| Role            | Value                  | Usage                              |
| --------------- | ---------------------- | ---------------------------------- |
| `--red`         | `#C8102E`              | Brand, CTAs, hero backgrounds      |
| `--red-dark`    | `#970D25`              | Gradient stop, pressed, error text |
| `--red-soft`    | `#FDE8EC`              | Error bg, highlight chips          |
| `--red-border`  | `rgba(200,16,46,0.2)`  | Error borders, finals card accent  |
| `--cream`       | `#F7F4EF`              | Page background                    |
| `--card`        | `#FFFDFC`              | Content card background            |
| `--white`       | `#FFFFFF`              | Modals, high-contrast insets       |
| `--surface-alt` | `#F2EDE7`              | Alternating section background     |
| `--line`        | `#E5DED6`              | Borders, dividers                  |
| `--ink`         | `#141414`              | Headings, titles, footer bg        |
| `--text`        | `#262626`              | Body text                          |
| `--muted`       | `#7A7A7A`              | Secondary text, metadata           |
| `--subtle`      | `#A8A49E`              | Disabled, decorative               |
| `--green`       | `#1F7A5A`              | Success, live indicator            |
| `--green-soft`  | `#E6F4EE`              | Success badge bg                   |
| `--amber`       | `#C8900A`              | Finals, championship               |
| `--amber-soft`  | `#FFF8E7`              | Finals badge bg                    |
| `--panel`       | `#1E1E1E`              | Dark insets on red                 |
| `--shadow`      | `rgba(103,18,31,0.10)` | CTA and featured card shadow       |

---

## 3. Typography Rules

**Font families:**

- **Primary:** `Inter Variable` with fallback `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Load via `@fontsource-variable/inter` or Google Fonts variable font.
- **Monospace:** `ui-monospace, SF Mono, Menlo, Consolas` — code snippets only.

**Scale and hierarchy:**

| Role         | Size             | Weight | Line Height | Letter Spacing | Notes                              |
| ------------ | ---------------- | ------ | ----------- | -------------- | ---------------------------------- |
| Display      | 64px / 4rem      | 900    | 1.0         | −1.5px         | Hero page title, one per page      |
| Heading 1    | 48px / 3rem      | 800    | 1.1         | −0.8px         | Section lead titles                |
| Heading 2    | 36px / 2.25rem   | 800    | 1.15        | −0.5px         | Sub-section titles                 |
| Heading 3    | 28px / 1.75rem   | 700    | 1.2         | −0.3px         | Card titles, feature headings      |
| Heading 4    | 22px / 1.375rem  | 700    | 1.25        | 0              | Minor headings                     |
| Body Large   | 18px / 1.125rem  | 400    | 1.7         | 0              | Hero subheading, intro paragraphs  |
| Body         | 16px / 1rem      | 400    | 1.65        | 0              | Standard paragraph text            |
| Body Strong  | 16px / 1rem      | 600    | 1.65        | 0              | Emphasis in body, link text        |
| Small        | 14px / 0.875rem  | 400    | 1.5         | 0              | Card metadata, captions            |
| Small Strong | 14px / 0.875rem  | 600    | 1.5         | 0              | Badge labels, table headers        |
| Eyebrow      | 12px / 0.75rem   | 700    | 1.2         | +1.5px         | Section labels, always `uppercase` |
| Caption      | 12px / 0.75rem   | 400    | 1.4         | 0              | Image captions, footnotes          |
| Nav Link     | 15px / 0.9375rem | 500    | 1           | 0              | Navigation items                   |
| CTA          | 16px / 1rem      | 700    | 1           | 0              | Button labels                      |

**Principles:**

- Weight 900 is reserved for the single Display title on hero sections only.
- Eyebrow text is always `uppercase` + generous letter-spacing (+1.2–1.5px). If eyebrows are not breathing, they are wrong.
- Heading 1–2 use negative tracking for optical density. Below Heading 3, letter-spacing is 0.
- Line heights: tight (1.0–1.15) for display/headings, relaxed (1.6–1.7) for body.
- Never use font-weight below 400 for any rendered text.

---

## 4. Component Stylings

### Navigation Bar

```
Background:    #FFFFFF (scrolled) / transparent (hero zone top)
Height:        64px
Padding:       0 80px (desktop) / 0 24px (mobile)
Border-bottom: 1px solid #E5DED6 (scrolled only)
Logo:          Pilotariak wordmark, left-aligned
Links:         #262626, 15px weight 500 — hover: #C8102E
CTA button:    Red primary button, right-aligned
Mobile:        Hamburger at 768px, slide-in drawer
```

### Buttons — Primary (Red)

```
Background:    #C8102E
Text:          #FFFFFF, 16px weight 700
Border-radius: 8px
Padding:       12px 24px
Hover:         background #970D25, transform: translateY(-1px)
Active:        scale(0.98)
Shadow:        rgba(103,18,31,0.10) 0 4px 16px
Disabled:      opacity 0.5, cursor not-allowed
```

### Buttons — Secondary (Outlined)

```
Background:    transparent
Text:          #C8102E, 16px weight 700
Border:        2px solid #C8102E
Border-radius: 8px
Padding:       10px 22px
Hover:         background #FDE8EC
```

### Buttons — Ghost (Ink)

```
Background:    transparent
Text:          #262626, 16px weight 500
Border-radius: 8px
Padding:       10px 16px
Hover:         background #F2EDE7
```

### Hero Section

```
Background:    linear-gradient(to bottom, #C8102E 0%, #970D25 45%, #F7F4EF 100%)
Height:        480px minimum (desktop) / 360px (mobile)
Padding:       120px 80px 80px (desktop) / 80px 24px 48px (mobile)
Eyebrow:       rgba(255,255,255,0.75), 12px weight 700, uppercase, +1.5px tracking
Display title: #FFFFFF, 64px weight 900, line-height 1.0, −1.5px tracking
Subtitle:      rgba(255,255,255,0.82), 18px weight 400, line-height 1.7
CTA:           White text / transparent rgba(255,255,255,0.2) border variant on red bg
Decorative:    Two translucent circles rgba(255,255,255,0.07) — top-right and left
```

### Cards — Content / List

```
Background:    #FFFDFC
Border:        1px solid #E5DED6
Border-radius: 12px
Padding:       24px
Shadow:        none (border provides separation)
Hover:         border-color #C8102E, shadow rgba(103,18,31,0.07) 0 4px 12px
Title:         #141414, 20px weight 700
Meta:          #7A7A7A, 14px weight 400
Transition:    border-color 150ms ease, box-shadow 150ms ease
```

### Cards — Featured / Hero Card

```
Background:    #C8102E
Border-radius: 16px
Padding:       28px
Eyebrow:       rgba(255,255,255,0.72), 12px weight 700, uppercase, +1.5px tracking
Title:         #FFFFFF, 28px weight 800
Sub panel:     background #1E1E1E, #FFFFFF text — inset chip for metadata
Shadow:        rgba(103,18,31,0.18) 0 8px 32px
```

### Section Header

```
Layout:        stacked, max-width 640px, centered or left-aligned
Eyebrow:       #7A7A7A, 12px weight 700, uppercase, +1.5px tracking
Title:         #141414, 36–48px weight 800
Subtitle:      #7A7A7A, 18px weight 400, line-height 1.7
Gap:           8px between eyebrow and title, 16px between title and subtitle
Margin-bottom: 48px (before content grid)
```

### Status Badges

| Tone  | Background | Text      | Usage                    |
| ----- | ---------- | --------- | ------------------------ |
| red   | `#FDE8EC`  | `#970D25` | Past events, errors      |
| green | `#E6F4EE`  | `#1F7A5A` | Live, today, active      |
| dark  | `#262626`  | `#FFFFFF` | Finals, completed        |
| soft  | `#EFE8DE`  | `#5D5145` | Upcoming, neutral        |
| amber | `#FFF8E7`  | `#8A5E00` | Championship, semi-final |

```
Shape:    border-radius 9999px
Padding:  5px 12px
Font:     12px weight 700
```

### Data Table

```
Header row:    background #F2EDE7, border-bottom 2px solid #E5DED6
Header text:   #141414, 14px weight 700, uppercase, +0.8px tracking
Body row:      background transparent, border-bottom 1px solid #E5DED6
Body row hover: background #FFFDFC
Cell padding:  14px 16px
Cell text:     #262626, 15px weight 400
Radius:        12px on container, overflow hidden
```

### Score Display

```
Value:       #C8102E, 32px weight 900, tabular-nums
Separator:   #7A7A7A, 24px weight 300
Team name:   #141414, 16px weight 600
Container:   background #FFFFFF, border 1px solid #E5DED6, radius 12px, padding 20px
```

### Footer

```
Background:    #141414
Text:          #A8A49E, 14px weight 400
Heading:       #F7F4EF, 14px weight 700, uppercase, +1px tracking
Link:          #A8A49E — hover: #F7F4EF
Logo area:     Pilotariak wordmark in #F7F4EF
Divider:       1px solid rgba(255,255,255,0.08)
Padding:       64px 80px (desktop) / 48px 24px (mobile)
```

### Form Inputs

```
Background:    #FFFFFF
Border:        1px solid #E5DED6
Border-radius: 8px
Padding:       12px 16px
Font:          16px weight 400, #262626
Placeholder:   #A8A49E
Focus border:  2px solid #C8102E
Focus shadow:  rgba(200,16,46,0.12) 0 0 0 3px
Error border:  1px solid #C8102E
Error text:    #970D25, 13px weight 500
Label:         #141414, 14px weight 600, margin-bottom 6px
```

---

## 5. Layout Principles

### Spacing Scale

| Token | Value    | Usage                                      |
| ----- | -------- | ------------------------------------------ |
| 2xs   | 4px      | Inline gaps (eyebrow → title within stack) |
| xs    | 8px      | Icon/text gap, metadata rows               |
| sm    | 12px     | Card inner gaps                            |
| md    | 16px     | Between stacked text blocks                |
| lg    | 24px     | Card padding, between cards                |
| xl    | 32px     | Section inner spacing                      |
| 2xl   | 48px     | Between major content blocks               |
| 3xl   | 64px     | Section vertical padding                   |
| hero  | 80–120px | Hero vertical padding                      |

### Border-Radius Scale

| Token | Value  | Usage                      |
| ----- | ------ | -------------------------- |
| pill  | 9999px | Status badges, tags        |
| sm    | 6px    | Inline code, small buttons |
| md    | 8px    | Standard buttons, inputs   |
| lg    | 12px   | Content cards, tables      |
| xl    | 16px   | Featured cards, modals     |
| hero  | 20px   | Hero card elements         |

### Grid & Container

- **Max content width:** 1200px, centered, `margin: 0 auto`
- **Horizontal padding:** 80px (≥1280px), 48px (≥1024px), 32px (≥768px), 24px (<768px)
- **Standard content grid:** 12-column, 24px gap
- **Card grid:** 3-column (≥1024px), 2-column (≥640px), 1-column (<640px), 24px gap
- **Feature grid:** 2-column (≥768px), 1-column (<768px), 32–48px gap
- **Hero:** Full-width, internal content max-width 800px, centered

### Hero Gradient Architecture

```
Position:  relative/absolute background layer, top 0, full width
Height:    480px
Gradient:  linear-gradient(to bottom, #C8102E 0%, #970D25 45%, #F7F4EF 100%)
Effect:    Smooth red-to-cream fade — cinematic transition, no hard edge
```

Text in the gradient zone:

- 0–300px: white / `rgba(255,255,255,0.78–0.82)` text
- Below 300px: switch to `#141414` / `#7A7A7A` text

### Whitespace Philosophy

- Section vertical padding: 80px top and bottom minimum.
- Never let two card grids touch without a section header separating them.
- 48px minimum gap between any two major content blocks within a section.
- The cream background IS the whitespace — do not fill it.

---

## 6. Depth & Elevation

| Level | Surface                     | Method                                                              |
| ----- | --------------------------- | ------------------------------------------------------------------- |
| 0     | Cream page bg               | `#F7F4EF` — no border, no shadow                                    |
| 1     | Content card                | `#FFFDFC` + `1px solid #E5DED6`                                     |
| 2     | Featured card / hover state | `#FFFDFC` + `1px solid #C8102E` + `rgba(103,18,31,0.07) 0 4px 12px` |
| 3     | Hero / brand card           | `#C8102E` — color itself signals prominence                         |
| 4     | Modal / drawer              | `#FFFFFF` + `rgba(0,0,0,0.08) 0 8px 32px` + backdrop                |
| 5     | CTA button                  | Red bg + `rgba(103,18,31,0.10) 0 4px 16px`                          |

**Shadow philosophy:** Shadows are red-tinted (`rgba(103,18,31,0.10)`) for brand warmth — never neutral gray. Shadows are used sparingly: only on CTAs, featured cards, and modals. Standard list cards use border only, no shadow.

---

## 7. Do's and Don'ts

### Do

- ✅ Use `#F7F4EF` (cream) as the page background — not `#FFFFFF` or any neutral gray.
- ✅ Use `#C8102E` only for purposeful elements: hero zone, CTA buttons, active nav, scores. One red anchor per visual level.
- ✅ Apply uppercase + letter-spacing (+1.2–1.5px) to all eyebrow labels without exception.
- ✅ Use `#E5DED6` as the universal border/divider on all light surfaces.
- ✅ Switch text from white to ink (`#141414`) once content exits the 300px hero gradient zone.
- ✅ Use weight 800–900 only for Display and H1–H2. Card titles use weight 700.
- ✅ Give Finals/Championship content amber (`#C8900A` / `#FFF8E7`) treatment.
- ✅ Ensure all interactive elements have `min-height: 44px` for adequate touch targets.
- ✅ Use `transition: 150ms ease` on hover color changes, `200ms ease` on transforms.
- ✅ Build all Astro components with semantic HTML (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`).

### Don't

- ❌ Don't use pure white (`#FFFFFF`) as the page background — cream is non-negotiable.
- ❌ Don't use pure black (`#000000`) — use `#141414` for text, `#1E1E1E` for dark surfaces.
- ❌ Don't place dark ink text directly over the red hero gradient — use white/translucent white only.
- ❌ Don't use more than one accent color per page section. Red owns CTAs; green for live/success only; amber for finals only.
- ❌ Don't add box-shadows to standard list cards — `1px solid #E5DED6` border is sufficient.
- ❌ Don't set border-radius below 6px on any interactive element.
- ❌ Don't use `rgba(255,255,255,0.08)` on cream backgrounds — it's invisible. Use `#FFFFFF` with a `#E5DED6` border.
- ❌ Don't skip the 80px section spacing — breathing room is structural, not decorative.
- ❌ Don't use animated gradients or heavy motion — content-forward, not marketing-playground.
- ❌ Don't render critical content client-side only — Astro's SSG must produce accessible HTML.

---

## 8. Responsive Behavior

### Breakpoints

| Name      | Width       | Key Changes                     |
| --------- | ----------- | ------------------------------- |
| Mobile S  | 320–374px   | Single-column, 20px gutters     |
| Mobile    | 375–639px   | Standard mobile, 24px gutters   |
| Tablet    | 640–767px   | 2-column card grid begins       |
| Tablet L  | 768–1023px  | Full nav, 2-column feature grid |
| Desktop   | 1024–1279px | 3-column cards, full layout     |
| Desktop L | ≥1280px     | Max-width 1200px container      |

### Adaptive Patterns

- **Navigation:** Full horizontal at ≥768px → hamburger drawer at <768px.
- **Hero title:** 64px → 48px (tablet) → 36px (mobile); tracking adjusts proportionally.
- **Card grids:** 3-column → 2-column → 1-column with 24px gap throughout.
- **Section padding:** 80px → 64px (tablet) → 48px (mobile).
- **Hero height:** 480px → 420px (tablet) → 320px (mobile).
- **Footer:** 4-column → 2-column → 1-column stacked.

### Accessibility

- All interactive elements: minimum `44 × 44px` touch target.
- Focus states: `2px solid #C8102E` outline + `rgba(200,16,46,0.12) 0 0 0 3px` shadow. Never remove outlines.
- Color contrast: body text (`#262626` on `#F7F4EF`) = 9.8:1, exceeds WCAG AA.
- Red (`#C8102E`) on white: 4.7:1 — meets AA for large text and UI components.
- Respect `prefers-reduced-motion` — disable all CSS transitions and animations when set.

---

## 9. Agent Prompt Guide

### Quick Color Reference

| Name        | Hex / Value            |
| ----------- | ---------------------- |
| Red         | `#C8102E`              |
| Red Dark    | `#970D25`              |
| Red Soft    | `#FDE8EC`              |
| Cream       | `#F7F4EF`              |
| Card        | `#FFFDFC`              |
| Surface Alt | `#F2EDE7`              |
| White       | `#FFFFFF`              |
| Line        | `#E5DED6`              |
| Ink         | `#141414`              |
| Text        | `#262626`              |
| Muted       | `#7A7A7A`              |
| Green       | `#1F7A5A`              |
| Green Soft  | `#E6F4EE`              |
| Amber       | `#C8900A`              |
| Amber Soft  | `#FFF8E7`              |
| Shadow      | `rgba(103,18,31,0.10)` |

### Component Prompts

**Hero section (red zone):**

> "Build a hero with `linear-gradient(to bottom, #C8102E 0%, #970D25 45%, #F7F4EF 100%)` over 480px height. Eyebrow: `rgba(255,255,255,0.75)` 12px weight-700 uppercase +1.5px tracking. Display title: `#FFFFFF` 64px weight-900 line-height 1.0 −1.5px tracking. Subtitle: `rgba(255,255,255,0.82)` 18px weight-400. CTA: white text, `rgba(255,255,255,0.2)` border, 8px radius."

**Content card (cream zone):**

> "Card on cream canvas: background `#FFFDFC`, `border: 1px solid #E5DED6`, `border-radius: 12px`, `padding: 24px`. Title: `#141414` 20px weight-700. Meta: `#7A7A7A` 14px. Hover: `border-color: #C8102E`, `box-shadow: rgba(103,18,31,0.07) 0 4px 12px`. Transition 150ms ease."

**Section header:**

> "Stack: eyebrow `#7A7A7A` 12px weight-700 uppercase +1.5px tracking; title `#141414` 40px weight-800 −0.5px tracking; subtitle `#7A7A7A` 18px weight-400 line-height 1.7. Gap 8px eyebrow→title, 16px title→subtitle. Margin-bottom 48px."

**Status badge:**

> "Pill with `border-radius: 9999px`, `padding: 5px 12px`, 12px weight-700. Green: `#E6F4EE` bg + `#1F7A5A` text. Red: `#FDE8EC` + `#970D25`. Amber: `#FFF8E7` + `#8A5E00`."

**Primary CTA button:**

> "Background `#C8102E`, text `#FFFFFF` 16px weight-700, `border-radius: 8px`, `padding: 12px 24px`. Hover: `background: #970D25`, `transform: translateY(-1px)`. Shadow: `rgba(103,18,31,0.10) 0 4px 16px`. Transition 150ms ease."

**Data table:**

> "Header: `#F2EDE7` bg, `#141414` 14px weight-700 uppercase +0.8px tracking, `border-bottom: 2px solid #E5DED6`. Rows: transparent, `border-bottom: 1px solid #E5DED6`, hover `#FFFDFC`. Cells: `#262626` 15px weight-400, `padding: 14px 16px`. Container: `border-radius: 12px`, `overflow: hidden`."

**Footer:**

> "Background `#141414`. Link text `#A8A49E` 14px weight-400, hover `#F7F4EF`. Section headings `#F7F4EF` 14px weight-700 uppercase +1px tracking. Dividers `rgba(255,255,255,0.08)`. Padding 64px 80px desktop, 48px 24px mobile."

### Iteration Guide

1. **The gradient zone is the contract** — content above 300px from page top uses white text. Below that, switch to ink. Never assume red extends further down.
2. **Cream is not white** — always verify `#F7F4EF`. If it looks like plain white, it is wrong.
3. **Red is earned** — one dominant red element per visual hierarchy level. Primary CTA wins if two elements compete for red.
4. **Borders replace shadows on cards** — `1px solid #E5DED6`, no `box-shadow` on list cards.
5. **Eyebrows always breathe** — uppercase + letter-spacing ≥ 1.2px. If they cannot breathe, they are wrong.
6. **Weight 900 for hero only** — H1/H2 use weight 800, card titles weight 700. Do not promote.
7. **Finals get amber** — `#FFF8E7` bg, `#8A5E00` text, `rgba(200,144,10,0.4)` border. Required for championship content.
8. **Section spacing is load-bearing** — 80px between major sections. Removing it collapses the visual rhythm.
9. **Astro components must be static-renderable** — no `document` or `window` calls at the component top level. Use `client:load` or `client:idle` only for interactive islands.
