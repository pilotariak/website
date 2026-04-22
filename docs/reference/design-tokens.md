# Design Tokens Reference

**Source:** `src/styles/global.css` — defined as CSS custom properties on `:root`

All values from `DESIGN.md` are implemented as CSS variables. Reference them as `var(--name)` in
component `<style>` blocks or inline styles.

---

## Color Tokens

### Brand

| Token | Value | Role |
|-------|-------|------|
| `--red` | `#C8102E` | Brand primary — CTAs, hero bg, active states, scores |
| `--red-dark` | `#970D25` | Gradient bottom stop, pressed states, error text |
| `--red-soft` | `#FDE8EC` | Error/highlight backgrounds, badge chips |
| `--red-border` | `rgba(200,16,46,0.2)` | Error borders, card accent rings on hover |

### Canvas & Surfaces

| Token | Value | Role |
|-------|-------|------|
| `--cream` | `#F7F4EF` | Page background — never substitute with white |
| `--card` | `#FFFDFC` | Content card background |
| `--white` | `#FFFFFF` | Modals, hero-zone buttons |
| `--surface-alt` | `#F2EDE7` | Alternating section backgrounds, table headers |
| `--line` | `#E5DED6` | Universal borders and dividers |

### Text

| Token | Value | Role |
|-------|-------|------|
| `--ink` | `#141414` | Headings, card titles, footer background |
| `--text` | `#262626` | Body copy and paragraph text |
| `--muted` | `#7A7A7A` | Secondary text, metadata, eyebrow labels |
| `--subtle` | `#A8A49E` | Disabled states, decorative text |

### Semantic Status

| Token | Value | Role |
|-------|-------|------|
| `--green` | `#1F7A5A` | Live/success indicators (`--info` alias) |
| `--green-soft` | `#E6F4EE` | Success badge background |
| `--amber` | `#C8900A` | Championship highlights — finals only |
| `--amber-soft` | `#FFF8E7` | Championship badge background |
| `--error` | `#C8102E` | Form error states (alias of `--red`) |
| `--info` | `#1F7A5A` | Informational states (alias of `--green`) |

### Dark Surfaces

| Token | Value | Role |
|-------|-------|------|
| `--panel` | `#1E1E1E` | Dark inset surfaces within hero cards |

### Shadows

| Token | Value | Role |
|-------|-------|------|
| `--shadow` | `rgba(103,18,31,0.10)` | CTA and featured card elevation |
| `--shadow-subtle` | `rgba(0,0,0,0.06)` | Card hover states |
| `--focus-ring` | `rgba(200,16,46,0.12)` | Focus outline glow |

---

## Spacing Tokens

Base unit: 4px (scale steps at 4/8/12/16/24/32/48/64/96px)

| Token | Value | Semantic use |
|-------|-------|-------------|
| `--space-2xs` | `4px` | Inline micro-gaps, eyebrow-to-title |
| `--space-xs` | `8px` | Icon-to-text gaps, metadata rows |
| `--space-sm` | `12px` | Internal card element gaps |
| `--space-md` | `16px` | Between stacked text blocks |
| `--space-lg` | `24px` | Card padding, adjacent card gap |
| `--space-xl` | `32px` | Major content groups within section |
| `--space-2xl` | `48px` | Between content blocks in section |
| `--space-3xl` | `64px` | Section vertical padding (desktop) |
| `--space-hero` | `96px` | Hero section vertical padding |

---

## Border Radius Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | `6px` | Code chips, small utility buttons |
| `--radius-md` | `8px` | Standard buttons, form inputs |
| `--radius-lg` | `12px` | Content cards, data tables |
| `--radius-xl` | `16px` | Featured hero cards, subgraph cards |
| `--radius-hero` | `20px` | Hero card inset elements |
| `--radius-pill` | `9999px` | Status badges, filter tags |

---

## Container Tokens

| Token | Value | Description |
|-------|-------|-------------|
| `--container-max` | `1200px` | Maximum content width |
| `--container-pad` | `clamp(24px, 5vw, 80px)` | Responsive horizontal padding |

---

## Typography Token

| Token | Value |
|-------|-------|
| `--font-sans` | `"Inter Variable", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |

Monospace fallback (used inline in components): `ui-monospace, SF Mono, Menlo, Consolas, monospace`

---

## See Also

- [DESIGN.md](../../DESIGN.md) — full design system specification
- [Component reference](components.md) — where tokens are applied
