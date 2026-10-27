// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

/**
 * NLWeb Schema Map: lists the structured-data feeds published by the site.
 * Referenced from robots.txt with a `schemamap:` directive.
 */

import type { APIRoute } from 'astro';
import { SITE } from '../lib/schema';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url contentType="structuredData/schema.org">
    <loc>${SITE}/schema-feed.jsonl</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
