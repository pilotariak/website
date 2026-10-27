// @ts-check
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://pilotariak.com';
const BUILD_TIME = new Date().toISOString();

// Content that lives outside the page file itself.
const PROSE_PAGES = ['developers', 'about', 'contact', 'privacy'];

function isShallowClone() {
  try {
    return execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'true';
  } catch {
    return true;
  }
}

const shallow = isShallowClone();

/**
 * Last commit date touching the files behind a URL. Falls back to the build
 * time for shallow clones (every file would share one date) and new files.
 * @param {string} url
 * @returns {string}
 */
function lastModified(url) {
  if (shallow) return BUILD_TIME;
  const path = new URL(url).pathname.replace(/^\/|\/$/g, '');
  const page = `src/pages/${path || 'index'}.astro`;
  const slug = path.replace(/^fr\/?/, '');
  const files = [page];
  if (PROSE_PAGES.includes(slug)) files.push('src/i18n/pages.ts', 'src/components/ProsePage.astro');
  if (slug === 'azkena') files.push('src/components/AzkenaPage.astro');
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files.filter(existsSync)], {
      encoding: 'utf8',
    }).trim();
    return date || BUILD_TIME;
  } catch {
    return BUILD_TIME;
  }
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => ({ ...item, lastmod: lastModified(item.url) }),
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
