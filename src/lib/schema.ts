// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

/**
 * schema.org JSON-LD for Pilotariak. Single source for the `<script
 * type="application/ld+json">` blocks in Layout and for the NLWeb schema feed
 * (`/schema-feed.jsonl`), so pages and feed never drift apart.
 */

import { useTranslations, useTranslatedPath, type Lang } from '../i18n/utils';

export const SITE = 'https://pilotariak.com';
const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

type JsonLd = Record<string, unknown>;

export type ProjectSlug = 'frontis' | 'kancha' | 'xilo' | 'azkena';

const projects: Record<
  ProjectSlug,
  { name: string; category: string; extra: JsonLd }
> = {
  frontis: {
    name: 'Frontis',
    category: 'DeveloperApplication',
    extra: {
      applicationSubCategory: 'GraphQL API gateway',
      operatingSystem: 'Any',
      featureList: [
        'Public GraphQL endpoint: https://frontis-gateway.pilotariak.com/graphql',
        'Clubs, competitions, categories, specialties and results',
        'No authentication; league selected with the X-Pilotariak-League header',
      ],
    },
  },
  kancha: {
    name: 'Kancha',
    category: 'SportsApplication',
    extra: { operatingSystem: 'iOS, Android' },
  },
  xilo: {
    name: 'Xilo',
    category: 'CommunicationApplication',
    extra: { operatingSystem: 'Slack' },
  },
  azkena: {
    name: 'Azkena',
    category: 'DeveloperApplication',
    extra: {
      applicationSubCategory: 'Model Context Protocol server',
      operatingSystem: 'Any',
      featureList: [
        'MCP endpoint: https://mcp.pilotariak.com/mcp (Streamable HTTP)',
        'Tools: list_competitions, list_clubs, list_categories, list_specialties, list_results',
        'OAuth 2.1 with dynamic client registration and PKCE',
      ],
    },
  },
};

export const projectSlugs = Object.keys(projects) as ProjectSlug[];

export function organization(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Pilotariak',
    url: `${SITE}/`,
    logo: `${SITE}/icon-512.png`,
    image: `${SITE}/og-image.png`,
    description:
      'Open-source software organisation for the Basque pelota community: data tools, APIs and mobile applications.',
    foundingDate: '2019',
    knowsAbout: ['Basque pelota', 'Pelote basque', 'GraphQL', 'Model Context Protocol'],
    sameAs: ['https://github.com/Pilotariak'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        url: 'https://github.com/Pilotariak/website/issues',
        availableLanguage: ['English', 'French'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'security',
        url: `${SITE}/.well-known/security.txt`,
        availableLanguage: ['English', 'French'],
      },
    ],
  };
}

export function website(lang: Lang): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Pilotariak',
    url: `${SITE}/`,
    inLanguage: ['en', 'fr'],
    publisher: { '@id': ORG_ID },
    description: useTranslations(lang)('index.description'),
  };
}

export function softwareApplication(slug: ProjectSlug, lang: Lang): JsonLd {
  const t = useTranslations(lang);
  const tp = useTranslatedPath(lang);
  const { name, category, extra } = projects[slug];
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE}/${slug}/#software`,
    name,
    url: `${SITE}${tp(`/${slug}/`)}`,
    description: t(`${slug}.meta.description`),
    applicationCategory: category,
    ...extra,
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    codeRepository: `https://github.com/Pilotariak/${slug}`,
    sameAs: [`https://github.com/Pilotariak/${slug}`],
    publisher: { '@id': ORG_ID },
    inLanguage: lang,
  };
}

/** Project list shown on the home page. */
export function projectList(lang: Lang): JsonLd {
  return {
    '@type': 'ItemList',
    '@id': `${SITE}/#projects`,
    name: 'Pilotariak open-source projects',
    itemListElement: projectSlugs.map((slug, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: softwareApplication(slug, lang),
    })),
  };
}

export function webPage(
  { url, name, description, lang, type = 'WebPage' }: {
    url: string;
    name: string;
    description: string;
    lang: Lang;
    type?: string;
  },
): JsonLd {
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbs(items: { name: string; url: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Wrap nodes in a single `@graph` document. */
export function graph(nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
