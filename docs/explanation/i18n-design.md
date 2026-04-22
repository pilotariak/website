# Understanding i18n Architecture

## Overview

The site supports English and French. The i18n system is intentionally minimal — a flat key-value
map in `ui.ts`, two utility functions in `utils.ts`, and Astro's built-in locale routing. This
document explains why this approach was chosen over the alternatives, and what its trade-offs are.

---

## The core choice: no i18n library

Several established libraries were available — `i18next`, `linguiJS`, `typesafe-i18n`, or Astro's
own `@astrojs/i18n` integration. All were passed over in favor of a hand-rolled solution.

The reasoning: the site has two locales and a small, stable content set. Library weight and
configuration overhead dominate at this scale. The custom solution is ~30 lines of TypeScript
with no runtime dependencies and full TypeScript inference on translation keys.

The trade-off is that features standard in libraries — pluralization, date formatting, ICU message
syntax — are absent. These are not current requirements. If the site expands to a third locale
or develops complex pluralization needs, migrating to `typesafe-i18n` or `linguiJS` would be the
appropriate next step.

---

## Flat keys vs nested objects

Translation keys are flat strings (`'frontis.hero.subtitle'`) rather than nested objects
(`en.frontis.hero.subtitle`). This is a deliberate ergonomic choice.

Flat keys are simpler to type-check: the TypeScript type of `t()` is `keyof typeof ui['en']`,
which works naturally on a flat object. With nested objects, the type would require recursive
`DeepKeyOf` generics that add complexity without proportional benefit at this scale.

The dotted namespace convention (`<page>.<section>.<name>`) provides the same organizational
clarity as nesting, without the type gymnastics.

---

## Fallback behavior

When a key exists in `en` but not in `fr`, `useTranslations` returns the English string silently.
This means incomplete French translations compile and deploy without errors.

This is a pragmatic choice: strict mode (failing the build on missing translations) would be
correct in a product with a large translation team and formal localization pipelines. For this
site, where French translations are maintained by the same developer who writes the English content,
silent fallback is preferable to build failures on in-progress work.

The risk is shipping untranslated English text to French visitors without warning. The mitigation
is code review — any PR adding keys to `en` should also add the `fr` equivalent.

---

## Route structure: no prefix for the default locale

Astro is configured with `prefixDefaultLocale: false`. This means:

- English routes: `/`, `/frontis`, `/kancha`
- French routes: `/fr/`, `/fr/frontis`, `/fr/kancha`

The alternative — `prefixDefaultLocale: true` — would produce `/en/frontis`, requiring a redirect
from `/frontis`. Pilotariak's primary audience is the French-speaking Basque pelota community, so
both locales are first-class. The decision to keep English unprefixed is somewhat arbitrary;
either convention would work. Unprefixed English was chosen because it matches the most common
convention for English-primary sites and avoids redirect complexity.

---

## Locale resolution at component level

Every component resolves `Astro.currentLocale` independently. There is no global locale context
or store. This is idiomatic Astro: components are stateless render functions that receive locale
from the request context.

The consequence is that `const lang = (Astro.currentLocale ?? 'en') as Lang;` appears repeatedly
across components. This is acceptable duplication — the alternative (a shared context or store)
would introduce a coupling mechanism that is unnecessary for a static site.

---

## HTML content in translations

Some translation values contain inline HTML (e.g., `<code>` tags in architecture descriptions).
These are rendered with `set:html` in the template. This is safe because the values come from
`ui.ts` — a developer-controlled constant — not from user input or external APIs.

The trade-off is that HTML-bearing translation strings are harder to extract for professional
translation tools, which typically process plain text. If the site ever required a translation
agency workflow, the HTML-containing strings would need to be refactored to use component
composition instead.

---

## What is not i18n

The site's URLs, metadata, and structured data (OG tags, hreflang links) are locale-aware via
`Layout.astro`. The `<html lang>` attribute, canonical links, and hreflang alternates are
generated from `Astro.currentLocale`. This is routing-level i18n handled by Astro, distinct from
the string translation system in `ui.ts`.

---

## See Also

- [i18n utilities reference](../reference/i18n.md)
- [How to add a translation key](../how-to/add-a-translation.md)
- [Architecture explanation](architecture.md)
