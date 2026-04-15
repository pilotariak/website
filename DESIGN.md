# Design System — Pilotariak Website

> Pelota basque community hub. Warm cream canvas, Basque red identity, editorial precision.

---

## 1. Visual Theme & Atmosphere

The Pilotariak website embodies a **rooted, warm authority** — the feeling of stepping into a well-run Basque sports federation. The interface evokes the materiality of a pelota fronton: cream limestone walls, deep red banners, and the crisp geometry of the court's white lines. This is not generic sports design — every decision references Basque visual culture without resorting to kitsch.

The overall mood is **disciplined yet welcoming**. The cream canvas absorbs visual noise, letting the Basque red earn every pixel it occupies. The experience feels editorial and content-forward, like a respected regional institution's yearbook: structured, warm, and completely sure of itself.

**Key Characteristics:**

- An **unwavering warm cream canvas** (`#F7F4EF`) grounds every screen — never pure white, never cold. This single value is more important than any other in the system.
- A **single dominant Basque Red** (`#C8102E`) drives the hero zone, primary actions, and featured content. It is not decorative — it earns each appearance.
- **Near-black ink** (`#141414`) for all headings and primary text — warm dark, not pure black.
- **Phase-driven page structure:** cinematic red hero → cream transition → content grid → dark footer. The page tells a story from the fronton entrance to the match records.
- Desktop-first with generous 80px gutters on large screens, gracefully collapsing to 24px on mobile.
- Built with **Astro** for static generation — all above-the-fold content renders as semantic HTML before any JavaScript runs.

---

## 2. Color Palette & Roles

### Brand & Primary

- **Basque Crimson Red** (`#C8102E`) — The single brand anchor. Used for hero card backgrounds, primary call-to-action buttons, active navigation indicators, and score displays. Always at full opacity — never tinted or used decoratively.
- **Fronton Dark Red** (`#970D25`) — Deeper variant for the gradient bottom stop, pressed button states, and error text on light surfaces. The shadow the Red casts on itself.
- **Blush Soft Red** (`#FDE8EC`) — Whisper-light pink tint for error state backgrounds, score badge chips on light cards, and subtle inline highlights.
- **Crimson Border Veil** (`rgba(200, 16, 46, 0.2)`) — Semi-transparent red for error field borders and championship card accent rings.

### Canvas & Surfaces

- **Warm Limestone Cream** (`#F7F4EF`) — The page background. Warm off-white that evokes fronton stone walls. The single most important value in the system — do not substitute with pure white or neutral gray.
- **Pearl Card White** (`#FFFDFC`) — Slightly warmer than cream; used for list cards and content cards sitting on the cream canvas, creating one gentle step of visual elevation through warmth difference alone.
- **Pure White** (`#FFFFFF`) — Reserved for modal surfaces, high-contrast inset content, and final match result cards where maximum legibility is needed.
- **Linen Tint** (`#F2EDE7`) — Subtle warm tint for alternating section backgrounds, providing section separation without introducing a new color.
- **Warm Greige Line** (`#E5DED6`) — The universal border and divider. Warm greige that belongs to the cream family — close enough to cream to be subtle, distinct enough to define edges.

### Ink & Text

- **Deep Ink** (`#141414`) — Headings, card titles, and primary body text on all light backgrounds. Near-black with warmth — never pure black.
- **Charcoal Text** (`#262626`) — Body copy and paragraph text — fractionally softer than Deep Ink for extended reading comfort.
- **Warm Muted Gray** (`#7A7A7A`) — Eyebrow labels, metadata, secondary captions, and placeholder text. The voice behind the voice.
- **Pale Stone Gray** (`#A8A49E`) — Decorative text, disabled states, and the softest secondary information.

### Semantic & Status

- **Tournament Green** (`#1F7A5A`) — Live match indicators, active badges, and upcoming event markers.
- **Tournament Green Soft** (`#E6F4EE`) — Soft background tint for green status badges.
- **Championship Amber** (`#C8900A`) — Finals and championship round highlights, trophy indicators. Reserved strictly for the highest-stakes moments.
- **Championship Amber Soft** (`#FFF8E7`) — Warm background tint for amber championship badges.

### Dark Surfaces

- **Fronton Night** (`#141414`) — Dark footer background, matching Deep Ink — a purposeful echo that grounds the page.
- **Panel Dark** (`#1E1E1E`) — Slightly elevated dark surfaces within the footer and dark inset chips within red hero cards.

### Shadows

- **Warm Red Shadow** (`rgba(103, 18, 31, 0.10)`) — The only elevation shadow used on CTAs and featured hero cards. Red-tinted for brand warmth — never cool neutral gray.
- **Subtle Card Veil** (`rgba(0, 0, 0, 0.06)`) — Near-invisible neutral shadow used only on card hover states to add dimensional feedback without weight.

### Reference Table

| CSS Variable    | Value                  | Usage                                     |
| --------------- | ---------------------- | ----------------------------------------- |
| `--red`         | `#C8102E`              | Brand, CTAs, hero backgrounds             |
| `--red-dark`    | `#970D25`              | Gradient stop, pressed states, error text |
| `--red-soft`    | `#FDE8EC`              | Error backgrounds, highlight chips        |
| `--red-border`  | `rgba(200,16,46,0.2)`  | Error borders, championship card accent   |
| `--cream`       | `#F7F4EF`              | Page background                           |
| `--card`        | `#FFFDFC`              | Content card background                   |
| `--white`       | `#FFFFFF`              | Modals, high-contrast insets              |
| `--surface-alt` | `#F2EDE7`              | Alternating section backgrounds           |
| `--line`        | `#E5DED6`              | Universal borders and dividers            |
| `--ink`         | `#141414`              | Headings, titles, footer background       |
| `--text`        | `#262626`              | Body text                                 |
| `--muted`       | `#7A7A7A`              | Secondary text, metadata                  |
| `--subtle`      | `#A8A49E`              | Disabled states, decorative text          |
| `--green`       | `#1F7A5A`              | Live/success indicators                   |
| `--green-soft`  | `#E6F4EE`              | Success badge background                  |
| `--amber`       | `#C8900A`              | Championship highlights                   |
| `--amber-soft`  | `#FFF8E7`              | Championship badge background             |
| `--panel`       | `#1E1E1E`              | Dark inset surfaces                       |
| `--shadow`      | `rgba(103,18,31,0.10)` | CTA and featured card elevation           |

---

## 3. Typography Rules

**Primary font family:** Inter Variable with fallback `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Load as a variable font for weight flexibility. Monospace fallback `ui-monospace, SF Mono, Menlo, Consolas` for code only.

**Character:** Inter Variable at high weights (700–900) delivers the confident, compressed authority of a sports federation's printed materials. At body weights (400–500) it becomes neutral and invisible — which is exactly right.

### Hierarchy & Weights

- **Display (Hero Title):** 64px at weight 900, very tight line-height (1.0), aggressive negative letter-spacing (−1.5px). One per page maximum. Used exclusively in the hero gradient zone with white text.
- **Heading 1:** 48px at weight 800, tight line-height (1.1), negative tracking (−0.8px). Section lead titles on the cream canvas.
- **Heading 2:** 36px at weight 800, snug line-height (1.15), light negative tracking (−0.5px). Sub-section titles and major card group headers.
- **Heading 3:** 28px at weight 700, comfortable line-height (1.2), subtle negative tracking (−0.3px). Card titles and feature headings.
- **Heading 4:** 22px at weight 700, balanced line-height (1.25), no tracking. Minor headings and sidebar labels.
- **Body Large:** 18px at weight 400, relaxed line-height (1.7), no tracking. Hero subtitles and introductory paragraphs.
- **Body:** 16px at weight 400, generous line-height (1.65), no tracking. Standard paragraph text throughout.
- **Body Strong:** 16px at weight 600, generous line-height (1.65), no tracking. Emphasis within body copy and body-level link text.
- **Small:** 14px at weight 400, comfortable line-height (1.5). Card metadata and image captions.
- **Small Strong:** 14px at weight 600, comfortable line-height (1.5). Badge labels and table column headers.
- **Eyebrow:** 12px at weight 700, tight line-height (1.2), generous positive letter-spacing (+1.5px), always rendered in `uppercase`. Section category labels — always breathing, never tight.
- **Caption:** 12px at weight 400, relaxed line-height (1.4). Image captions and footnotes.
- **Navigation Link:** 15px at weight 500, single line-height (1.0). Navigation bar items.
- **CTA Button:** 16px at weight 700, single line-height (1.0). Button labels at all sizes.

### Principles

- Weight 900 is strictly reserved for the single Display hero title per page. No exceptions.
- Eyebrow labels are always `uppercase` with letter-spacing of at least +1.2px — if they are not visibly breathing, they are wrong.
- Headings 1 and 2 use negative letter-spacing for visual density and confidence. Below Heading 3, letter-spacing returns to 0.
- Line heights follow a tension arc: tight (1.0–1.15) at display sizes, loosening to relaxed (1.65–1.7) for body reading.
- No font-weight below 400 anywhere in the rendered interface.

---

## 4. Component Stylings

### Navigation Bar

A clean horizontal bar floating above the hero gradient at the top of every page. When the user scrolls past the hero zone, the bar transitions to a crisp white background (Pure White `#FFFFFF`) with a warm hairline border underneath (1px Warm Greige Line `#E5DED6`), signaling a shift from the red world to the cream world. At the top of the hero, the bar is transparent — part of the gradient scene.

The Pilotariak wordmark sits left-aligned. Navigation links use Charcoal Text (`#262626`) at 15px medium weight, transitioning smoothly to Basque Crimson Red (`#C8102E`) on hover. A single red primary CTA button sits right-aligned. On screens below 768px, the navigation collapses to a compact hamburger icon that opens a slide-in drawer.

### Buttons — Primary (Red)

Confident and warm. The primary button uses a solid Basque Crimson Red (`#C8102E`) background with pure white 16px weight-700 label. Corners are moderately rounded (8px) — decisive, not playful. On hover, the background deepens to Fronton Dark Red (`#970D25`) and the button lifts gently upward (translateY −1px), accompanied by a warm red-tinted shadow (rgba(103,18,31,0.10) at 4px 16px spread). On press, the button compresses slightly (scale 0.98). Disabled state uses 50% opacity.

### Buttons — Secondary (Outlined)

The same confidence expressed through restraint. Transparent background with a 2px Basque Crimson Red (`#C8102E`) border and matching 16px weight-700 red label. On hover, the interior fills with the lightest blush (Blush Soft Red `#FDE8EC`), making the button feel responsive without shouting. Corners match the primary at moderately rounded (8px).

### Buttons — Ghost (Ink)

For tertiary actions where red would be too assertive. Transparent background, Charcoal Text (`#262626`) at 16px weight-500, with gently rounded corners (8px). Hover introduces a warm linen fill (Linen Tint `#F2EDE7`) — just enough feedback to acknowledge the interaction.

### Hero Section

The cinematic entrance of every major page. A full-width vertical gradient flows from Basque Crimson Red (`#C8102E`) at the top through Fronton Dark Red (`#970D25`) at 45% to Warm Limestone Cream (`#F7F4EF`) at the bottom — a 480px descent from the fronton arch into the cream field below. Desktop padding is generous: 120px top, 80px bottom, 80px horizontal. Mobile scales to 80px top, 48px bottom, 24px horizontal.

Inside the red zone: a small uppercase eyebrow label in translucent white (`rgba(255,255,255,0.75)`) with 12px weight-700 and +1.5px letter-spacing floats above the Display title. The main title is pure white (`#FFFFFF`), 64px weight-900, compressed line-height (1.0) and negative tracking (−1.5px). The subtitle uses a slightly softer translucent white (`rgba(255,255,255,0.82)`) at 18px weight-400 for warmth. Two large translucent circles (`rgba(255,255,255,0.07)`) reinforce the gradient zone decoratively without adding visual noise.

### Cards — Content / List

The workhorse of the page. Pearl Card White (`#FFFDFC`) background with a gentle 1px warm border (Warm Greige Line `#E5DED6`) and subtly rounded corners (12px). Internal padding is comfortable (24px) with no shadow in the default state — the border alone provides all necessary separation from the cream canvas. On hover, the border transitions smoothly to Basque Crimson Red (`#C8102E`) and a whisper-soft warm shadow appears (`rgba(103,18,31,0.07)` at 4px 12px) — a 150ms ease transition for both properties. Title text is Deep Ink (`#141414`) at 20px weight-700; metadata uses Warm Muted Gray (`#7A7A7A`) at 14px.

### Cards — Featured / Hero Card

The highest-stakes content presentation. Full Basque Crimson Red (`#C8102E`) background with generously rounded corners (16px) and comfortable inner padding (28px). A small uppercase eyebrow label appears in semi-transparent white (`rgba(255,255,255,0.72)`) at 12px weight-700 with +1.5px letter-spacing. The card title is pure white at 28px weight-800. An inset dark chip (Panel Dark `#1E1E1E` background, white text) carries secondary metadata, creating depth within the red field. The card casts a warm substantial shadow (`rgba(103,18,31,0.18)` at 8px 32px) — the most elevated element on any cream page.

### Section Header

An editorial preamble before every content grid. The header stacks three elements with precise spacing: an uppercase eyebrow label (Warm Muted Gray `#7A7A7A`, 12px weight-700, +1.5px tracking) sits 8px above a bold section title (Deep Ink `#141414`, 36–48px weight-800, −0.5px tracking), which sits 16px above a supporting subtitle (Warm Muted Gray, 18px weight-400, line-height 1.7). The header block has a generous 48px margin below it before the content grid begins. Maximum width is constrained to 640px — section headers never compete with content for horizontal space.

### Status Badges

Small pill-shaped labels that communicate event states at a glance. Shape is fully rounded (border-radius 9999px) with snug padding (5px vertical, 12px horizontal) and 12px weight-700 text. Five variants:

- **Red (past/error):** Blush Soft Red (`#FDE8EC`) background with Fronton Dark Red (`#970D25`) text — for past events and warning states.
- **Green (live/today):** Tournament Green Soft (`#E6F4EE`) background with Tournament Green (`#1F7A5A`) text — for live matches and confirmed events.
- **Dark (completed/finals):** Charcoal Text (`#262626`) background with pure white text — for completed matches and finals.
- **Soft (upcoming):** A gentle warm blend (`#EFE8DE`) background with warm stone text (`#5D5145`) — for upcoming neutral events.
- **Amber (championship):** Championship Amber Soft (`#FFF8E7`) background with warm amber text (`#8A5E00`) — strictly for championship and semi-final content.

### Data Table

Clean editorial presentation for match results and rankings. The header row uses a warm Linen Tint (`#F2EDE7`) background with a thicker warm border below (2px Warm Greige Line `#E5DED6`). Header text is Deep Ink at 14px weight-700, rendered in `uppercase` with +0.8px letter-spacing. Body rows use transparent backgrounds separated by hairline borders (1px Warm Greige Line). Row hover introduces a Pearl Card White (`#FFFDFC`) fill — just enough to confirm the selection. Cell text is Charcoal (`#262626`) at 15px weight-400 with comfortable 14px/16px padding. The containing element uses 12px rounded corners with hidden overflow to maintain clean edges.

### Score Display

Purpose-built for match results. The score value is Basque Crimson Red (`#C8102E`) at 32px weight-900 with tabular numeric alignment for clean column stacking. The score separator is Warm Muted Gray at 24px weight-300 — intentionally light to signal "versus" without competition. Team names are Deep Ink (`#141414`) at 16px weight-600. The score container uses Pure White (`#FFFFFF`) background, 1px Warm Greige Line border, 12px rounded corners, and 20px padding.

### Footer

A night-mode counterpart to the cream page body. Fronton Night background (`#141414`) with Pale Stone Gray (`#A8A49E`) body text at 14px weight-400. Footer section headings use a warm off-white (Warm Limestone Cream `#F7F4EF`) at 14px weight-700 in `uppercase` with +1px letter-spacing. Links inherit the stone gray and warm to near-cream on hover. Section divisions use an ultra-subtle white hairline (`rgba(255,255,255,0.08)`). Desktop padding is generous (64px vertical, 80px horizontal); mobile uses 48px/24px.

### Form Inputs

Inputs use Pure White (`#FFFFFF`) backgrounds with a 1px Warm Greige Line border and moderately rounded corners (8px). Label text is Deep Ink at 14px weight-600 with 6px clearance above the input. Placeholder text uses Pale Stone Gray (`#A8A49E`). On focus, the border thickens to 2px Basque Crimson Red (`#C8102E`) and a warm glow ring appears (`rgba(200,16,46,0.12)` at 3px spread) — unmistakable, branded, accessible. Error states use a 1px Basque Crimson Red border with Fronton Dark Red (`#970D25`) error message text at 13px weight-500 below the field.

---

## 5. Layout Principles

### Spacing Scale

The spacing system is an 8px-based scale with named tokens for consistent rhythm:

- **2xs (4px):** Inline micro-gaps — eyebrow to title within a text stack.
- **xs (8px):** Icon-to-text gaps and metadata row spacing.
- **sm (12px):** Internal gaps between elements within a card.
- **md (16px):** Between stacked text blocks within a section.
- **lg (24px):** Card internal padding, gap between adjacent cards.
- **xl (32px):** Inner spacing between major content groups within a section.
- **2xl (48px):** Between major content blocks within a section.
- **3xl (64px):** Section vertical padding on desktop.
- **hero (80–120px):** Hero section vertical padding — dramatic, uncompromising breathing room.

### Corner Rounding Scale

- **Pill (9999px):** Status badges and filter tags — fully circular ends.
- **Small (6px):** Inline code chips and small utility buttons.
- **Medium (8px):** Standard buttons and form inputs — decisive, not playful.
- **Large (12px):** Content cards and data tables — soft but confident.
- **Extra Large (16px):** Featured hero cards and modal dialogs — generous, editorial.
- **Hero (20px):** Hero card inset elements — the most rounded surfaces in the system.

### Grid & Container

The content container has a maximum width of 1200px, centered with auto margins. Horizontal padding scales with viewport: 80px at 1280px and above, 48px at 1024–1279px, 32px at 768–1023px, and 24px below 768px.

Content uses a 12-column grid with 24px gutters. Card grids use 3 columns on desktop (1024px+), collapsing to 2 columns at tablet (640px+) and a single column on mobile — always with 24px gap. Feature grids use 2 columns from 768px and stack to a single column below. Hero sections are always full-width with internal content constrained to 800px centered.

### Hero Gradient Architecture

The hero background is a full-width fixed-height layer (480px desktop, scaling to 420px tablet, 320px mobile) positioned absolutely at the top of the page. The gradient runs from Basque Crimson Red (`#C8102E`) at 0% through Fronton Dark Red (`#970D25`) at 45% to Warm Limestone Cream (`#F7F4EF`) at 100% — a smooth, cinematic descent with no hard edge. Content in the upper 300px of this zone uses white and translucent white text. Below 300px, text must switch to Deep Ink and Warm Muted Gray.

### Whitespace Philosophy

Section padding is never less than 80px top and bottom — the cream canvas is the whitespace, and compressing it destroys the breathing room that makes the design feel authoritative rather than cramped. No two card grids should touch without a section header between them. 48px is the minimum gap between any two major content blocks within a section.

---

## 6. Depth & Elevation

The elevation system uses border color, background warmth, and restrained shadow to communicate depth — never stacked heavy shadows.

- **Level 0 (Page canvas):** Warm Limestone Cream (`#F7F4EF`) with no border or shadow — the ground state.
- **Level 1 (Content card):** Pearl Card White (`#FFFDFC`) with a 1px Warm Greige Line border — separation through warmth difference and a hairline edge.
- **Level 2 (Hovered/featured card):** Pearl Card White with a 1px Basque Crimson Red border plus a whisper-soft warm shadow (`rgba(103,18,31,0.07)` at 4px 12px) — a gentle lift signal.
- **Level 3 (Hero brand card):** Full Basque Crimson Red background — color itself is the elevation signal. No shadow needed.
- **Level 4 (Modal/drawer):** Pure White with a diffuse neutral shadow (`rgba(0,0,0,0.08)` at 8px 32px) plus a darkened backdrop.
- **Level 5 (CTA button):** Red background with a warm red shadow (`rgba(103,18,31,0.10)` at 4px 16px) — the most tangible depth in the system.

Shadows are always red-tinted for brand warmth. Standard list cards never use shadows — the Warm Greige Line border is sufficient.

---

## 7. Do's and Don'ts

### Do

- ✅ Use Warm Limestone Cream (`#F7F4EF`) as the page background — not Pure White or any neutral gray.
- ✅ Use Basque Crimson Red (`#C8102E`) only for purposeful, high-signal elements: hero zone, primary CTAs, active navigation state, score values. One red anchor per visual hierarchy level.
- ✅ Always render eyebrow labels in `uppercase` with letter-spacing of at least +1.2px — if they cannot breathe, they are wrong.
- ✅ Use Warm Greige Line (`#E5DED6`) as the universal border and divider on all light surfaces.
- ✅ Switch text from white/translucent-white to Deep Ink as soon as content exits the 300px hero gradient zone.
- ✅ Reserve weight 900 for the Display hero title. H1/H2 use weight 800. Card titles use weight 700.
- ✅ Give Finals and Championship content the Amber treatment — Championship Amber Soft (`#FFF8E7`) background, warm amber text (`#8A5E00`), and a Championship Amber border.
- ✅ Ensure all interactive elements are at minimum 44px × 44px for touch accessibility.
- ✅ Use 150ms ease transitions on hover color changes, 200ms ease on transform properties.
- ✅ Build all Astro components with semantic HTML — `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`.

### Don't

- ❌ Don't use Pure White (`#FFFFFF`) as the page background — Warm Limestone Cream is non-negotiable.
- ❌ Don't use pure black (`#000000`) — Deep Ink (`#141414`) for text, Panel Dark (`#1E1E1E`) for dark surfaces.
- ❌ Don't place dark ink text directly over the red hero gradient — use white or translucent-white text only.
- ❌ Don't introduce more than one accent color per page section — Red for CTAs, Green for live/success only, Amber for championship only.
- ❌ Don't add box-shadows to standard list cards — the 1px Warm Greige Line border provides all necessary separation.
- ❌ Don't use corner-rounding below 6px on any interactive element.
- ❌ Don't place semi-transparent white overlays on the cream background — they are invisible. Use Pearl Card White with a Warm Greige Line border instead.
- ❌ Don't compress section spacing below 80px — the breathing room is structural, not decorative.
- ❌ Don't use animated gradients or heavy motion — this is content-forward editorial, not a marketing playground.
- ❌ Don't render critical content client-side only — Astro SSG must produce accessible HTML before JavaScript runs.

---

## 8. Responsive Behavior

### Breakpoints

| Name      | Width       | Key Changes                                  |
| --------- | ----------- | -------------------------------------------- |
| Mobile S  | 320–374px   | Single-column, 20px gutters, compressed hero |
| Mobile    | 375–639px   | Standard mobile layout, 24px gutters         |
| Tablet    | 640–767px   | 2-column card grid, 32px gutters             |
| Tablet L  | 768–1023px  | Full horizontal nav, 2-column feature grid   |
| Desktop   | 1024–1279px | 3-column cards, full layout                  |
| Desktop L | ≥1280px     | Max-width 1200px container, 80px gutters     |

### Adaptive Patterns

- **Navigation:** Full horizontal bar at 768px and above; below 768px, collapses to a hamburger with a slide-in drawer.
- **Hero title:** Scales from 64px Display (desktop) → 48px (tablet) → 36px (mobile), with letter-spacing adjusting proportionally.
- **Card grids:** 3-column → 2-column → 1-column, always with 24px gap.
- **Section padding:** 80px desktop → 64px tablet → 48px mobile, preserving breathing room at every size.
- **Hero height:** 480px desktop → 420px tablet → 320px mobile.
- **Footer columns:** 4-column → 2-column → single stacked column.

### Accessibility

- All interactive elements: minimum 44 × 44px touch target (WCAG 2.1 AA).
- Focus states: 2px solid Basque Crimson Red outline with a warm glow ring (`rgba(200,16,46,0.12)` at 3px spread) — never removed or hidden.
- Color contrast: Charcoal Text (`#262626`) on Warm Limestone Cream (`#F7F4EF`) achieves 9.8:1 — exceeds WCAG AA and AAA requirements for body text.
- Basque Crimson Red (`#C8102E`) on Pure White achieves 4.7:1 — meets WCAG AA for large text and UI components.
- Respect `prefers-reduced-motion` — all CSS transitions and transform animations are disabled when set.

---

## 9. Design System Notes for Stitch Generation

When creating new screens for this project, reference these specific instructions to keep output consistent with the Pilotariak visual language.

### Language to Use

- **Atmosphere:** "Rooted warm authority — a Basque sports federation's editorial presence"
- **Background:** "Warm Limestone Cream (`#F7F4EF`)" — never describe it as white or off-white
- **Hero zone:** "Cinematic red-to-cream vertical gradient from Basque Crimson Red to Warm Limestone Cream over 480px"
- **Card corners:** "Subtly rounded corners (12px)" — not "rounded-xl" or "card radius"
- **Card border:** "Warm hairline border in Warm Greige Line (`#E5DED6`)" — not "light gray border"
- **Shadows on cards:** "No shadow — border separation only"
- **CTA button shadow:** "Warm red-tinted glow shadow (`rgba(103,18,31,0.10)` at 4px 16px spread)"
- **Typography emphasis:** "Compressed, confident headings at weight 800–900 with negative letter-spacing"

### Color References

Always pair the descriptive name with the hex code when prompting:

- Page background: "Warm Limestone Cream (`#F7F4EF`)"
- Primary CTA: "Basque Crimson Red (`#C8102E`)"
- Card surface: "Pearl Card White (`#FFFDFC`)"
- Border/divider: "Warm Greige Line (`#E5DED6`)"
- Primary text: "Deep Ink (`#141414`)"
- Secondary text: "Warm Muted Gray (`#7A7A7A`)"
- Live/success: "Tournament Green (`#1F7A5A`)"
- Championship: "Championship Amber (`#C8900A`)"

### Component Prompts

**Hero section:**

> "Build a hero section with a cinematic vertical gradient from Basque Crimson Red (`#C8102E`) through Fronton Dark Red (`#970D25`) to Warm Limestone Cream (`#F7F4EF`) over 480px height. Inside the red zone: uppercase eyebrow in translucent white (`rgba(255,255,255,0.75)`) at 12px weight-700 with +1.5px letter-spacing. Display title pure white at 64px weight-900 with −1.5px tracking. Subtitle in softer translucent white (`rgba(255,255,255,0.82)`) at 18px weight-400."

**Content card:**

> "Create a card with Pearl Card White (`#FFFDFC`) background, a warm hairline border in Warm Greige Line (`#E5DED6`), subtly rounded corners (12px), and comfortable 24px padding. No shadow in default state — the border alone separates it from the Warm Limestone Cream canvas. On hover, the border warms to Basque Crimson Red (`#C8102E`) and a whisper-soft warm shadow appears. Title is Deep Ink at 20px weight-700. Metadata uses Warm Muted Gray at 14px."

**Section header:**

> "Stack three elements: an uppercase eyebrow in Warm Muted Gray (`#7A7A7A`) at 12px weight-700 with +1.5px letter-spacing; a bold section title in Deep Ink (`#141414`) at 40px weight-800 with −0.5px tracking; a supporting subtitle in Warm Muted Gray at 18px weight-400 with generous line-height (1.7). Gap 8px eyebrow to title, 16px title to subtitle. 48px margin below the block."

**Status badge:**

> "Fully rounded pill (border-radius 9999px) with 5px/12px padding and 12px weight-700 text. Live/active: Tournament Green Soft (`#E6F4EE`) background with Tournament Green (`#1F7A5A`) text. Past/error: Blush Soft Red (`#FDE8EC`) with Fronton Dark Red (`#970D25`). Championship: Championship Amber Soft (`#FFF8E7`) with warm amber text (`#8A5E00`)."

**Primary CTA button:**

> "Solid Basque Crimson Red (`#C8102E`) background with pure white 16px weight-700 label, moderately rounded corners (8px), comfortable padding (12px top/bottom, 24px left/right). On hover, deepens to Fronton Dark Red (`#970D25`) and lifts gently upward with a warm red-tinted shadow (`rgba(103,18,31,0.10)` at 4px 16px). Smooth 150ms ease transitions."

**Data table:**

> "Header row with warm Linen Tint (`#F2EDE7`) background and a thicker warm border below (2px Warm Greige Line `#E5DED6`). Header text in Deep Ink at 14px weight-700 uppercase with +0.8px letter-spacing. Body rows separated by hairline Warm Greige Line borders with Pearl Card White (`#FFFDFC`) hover fill. Comfortable 14px/16px cell padding. 12px rounded corners on the container."

**Footer:**

> "Dark footer on Fronton Night (`#141414`). Link text in Pale Stone Gray (`#A8A49E`) at 14px weight-400 warming to Warm Limestone Cream on hover. Section headings in Warm Limestone Cream (`#F7F4EF`) at 14px weight-700 uppercase with +1px letter-spacing. Section divisions as ultra-subtle white hairlines (`rgba(255,255,255,0.08)`). Generous 64px/80px padding on desktop."

### Iteration Guide

1. **The gradient zone is the contract** — above 300px from page top, all text is white or translucent-white. Below that, switch without exception to Deep Ink and Warm Muted Gray.
2. **Cream is not white** — always verify the page background is Warm Limestone Cream (`#F7F4EF`). If it looks like pure white, it is wrong.
3. **Red is earned** — one dominant red element per visual hierarchy level. If two elements compete for red, the primary call-to-action wins.
4. **Borders replace shadows on cards** — the Warm Greige Line border (`1px solid #E5DED6`) is all a list card needs. No box-shadow.
5. **Eyebrows must breathe** — uppercase and letter-spacing of at least +1.2px, always. Non-negotiable.
6. **Weight 900 for the hero only** — H1/H2 use weight 800, card titles weight 700. Never promote a heading upward in weight.
7. **Championship content earns amber** — Championship Amber Soft background, warm amber text, Championship Amber border ring. Do not use the regular soft/dark badge for finals content.
8. **Section spacing is load-bearing** — 80px between page sections. Removing it collapses the editorial rhythm.
9. **Astro-first rendering** — no `document` or `window` at component top level. Use `client:load` or `client:idle` only for interactive islands.
