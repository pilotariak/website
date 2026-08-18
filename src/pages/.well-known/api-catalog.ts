// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

import type { APIRoute } from 'astro';

/**
 * RFC 9727 API Catalog — served as a prerendered static endpoint.
 *
 * In development (astro dev): served by the Vite dev server at
 *   http://localhost:4321/.well-known/api-catalog
 *
 * In production (Cloudflare Workers): the Worker intercepts this path
 * before reaching static assets and serves the same catalog directly,
 * so this prerendered file acts as a zero-cost fallback.
 */

const API_CATALOG = {
  linkset: [
    {
      anchor: 'https://pilotariak.com/.well-known/api-catalog',
      item: [
        { href: 'https://pilotariak.com/azkena' },
        { href: 'https://pilotariak.com/.well-known/mcp.json' },
        { href: 'https://pilotariak.com/llms.txt' },
        { href: 'https://pilotariak.com/frontis' },
        { href: 'https://pilotariak.com/xilo' },
      ],
    },
    {
      // Azkena — Pilotariak MCP server (Model Context Protocol)
      anchor: 'https://pilotariak.com/azkena',
      'service-desc': [
        { href: 'https://pilotariak.com/.well-known/mcp.json', type: 'application/json' },
      ],
      'service-doc': [
        { href: 'https://pilotariak.com/', type: 'text/html' },
        { href: 'https://github.com/Pilotariak', type: 'text/html' },
      ],
    },
    {
      anchor: 'https://pilotariak.com/.well-known/mcp.json',
      'service-desc': [
        { href: 'https://pilotariak.com/.well-known/mcp.json', type: 'application/json' },
      ],
      'service-doc': [{ href: 'https://pilotariak.com/', type: 'text/html' }],
    },
    {
      anchor: 'https://pilotariak.com/llms.txt',
      'service-desc': [{ href: 'https://pilotariak.com/llms.txt', type: 'text/plain' }],
      'service-doc': [{ href: 'https://pilotariak.com/', type: 'text/html' }],
    },
    {
      anchor: 'https://pilotariak.com/frontis',
      'service-doc': [
        { href: 'https://pilotariak.com/frontis', type: 'text/html' },
        { href: 'https://github.com/Pilotariak/frontis', type: 'text/html' },
      ],
    },
    {
      anchor: 'https://pilotariak.com/xilo',
      'service-doc': [
        { href: 'https://pilotariak.com/xilo', type: 'text/html' },
        { href: 'https://github.com/Pilotariak/xilo', type: 'text/html' },
      ],
    },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(API_CATALOG, null, 2), {
    status: 200,
    headers: {
      'Content-Type':
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
