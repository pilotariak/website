# How to Add a Translation Key

## Context

All user-visible strings in the site are stored in `src/i18n/ui.ts`. When adding text to any
component or page, you add a key to both the `en` and `fr` objects, then call `t('your.key')` in
the template. This guide covers adding new keys and using them.

## Prerequisites

- `src/i18n/ui.ts` open in your editor
- TypeScript language server active (key lookups are type-checked)

---

## Steps

### 1. Identify the namespace

Keys follow a dot-separated `<namespace>.<section>.<name>` convention. Use the component or page
name as the namespace:

| Context | Example key |
|---------|-------------|
| Home page hero | `hero.subtitle` |
| Frontis page meta | `frontis.meta.title` |
| Navigation | `nav.pelote` |
| A new project page | `myproject.hero.subtitle` |

### 2. Add the English key

Open `src/i18n/ui.ts`. Find the `en` object — it is the first and authoritative locale. Add your
key:

```typescript
export const ui = {
  en: {
    // ... existing keys ...
    'myproject.hero.subtitle': 'A brief description of the project.',
    'myproject.hero.github': 'View on GitHub',
  },
```

### 3. Add the French translation

In the same file, find the `fr` object and add the matching key:

```typescript
  fr: {
    // ... existing keys ...
    'myproject.hero.subtitle': 'Une description brève du projet.',
    'myproject.hero.github': 'Voir sur GitHub',
  },
```

If you omit a key from `fr`, `useTranslations` silently falls back to the English value.
This is intentional for keys you haven't translated yet — but do not ship untranslated content
to production deliberately.

### 4. Use the key in a component or page

In any `.astro` file:

```astro
---
import { useTranslations } from '../i18n/utils';
import type { Lang } from '../i18n/utils';

const lang = (Astro.currentLocale ?? 'en') as Lang;
const t = useTranslations(lang);
---

<h1>{t('myproject.hero.subtitle')}</h1>
```

The TypeScript type of `t()` is inferred from the keys present in `ui[defaultLang]`. If you
mistype a key, the compiler reports an error before the browser sees it.

### 5. Handle HTML content in translations

If a translation contains inline HTML (e.g., `<strong>`, `<code>`), use `set:html`:

```astro
<p set:html={t('myproject.arch.01.body')} />
```

Never use `set:html` for user-supplied strings — only for keys in `ui.ts` that you control.

### Troubleshooting

- **TypeScript error on `t('key')`**: The key is not present in the `en` object. Add it there first.
- **French page shows English text**: The key exists in `en` but not `fr`. Add it.
- **HTML renders as escaped text**: Use `set:html` instead of `{t('key')}`.

## Related Resources

- [i18n utilities reference](../reference/i18n.md)
- [Understanding i18n architecture](../explanation/i18n-design.md)
