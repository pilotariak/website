// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

import { ui, defaultLang, type Lang } from './ui';

export { type Lang };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ((ui[lang] as Record<string, string>)[key as string] ??
      (ui[defaultLang] as Record<string, string>)[key as string] ??
      key) as string;
  };
}

/** Returns a function that prepends the locale prefix to a path.
 *  The default locale has no prefix (prefixDefaultLocale: false). */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string): string {
    return lang === defaultLang ? path : `/${lang}${path}`;
  };
}
