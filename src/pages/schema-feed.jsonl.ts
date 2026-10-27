// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

/**
 * NLWeb schema feed: one schema.org JSON-LD object per line, built from the
 * same source as the pages' `<script type="application/ld+json">`.
 */

import type { APIRoute } from 'astro';
import { organization, projectSlugs, softwareApplication, website } from '../lib/schema';

export const GET: APIRoute = () => {
  const items = [
    organization(),
    website('en'),
    ...projectSlugs.flatMap((slug) => [softwareApplication(slug, 'en'), softwareApplication(slug, 'fr')]),
  ];
  const body = items
    .map((item) => JSON.stringify({ '@context': 'https://schema.org', ...item }))
    .join('\n');

  return new Response(`${body}\n`, {
    headers: { 'Content-Type': 'application/jsonl; charset=utf-8' },
  });
};
