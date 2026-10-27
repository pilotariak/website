// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

/**
 * WebMCP: expose read-only in-page tools to browser agents.
 * https://webmachinelearning.github.io/webmcp/
 *
 * Registers with `document.modelContext` and falls back to
 * `navigator.modelContext` for older implementations. No-op elsewhere.
 */

interface ToolResult {
  content: { type: 'text'; text: string }[];
}

interface Tool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
}

interface ModelContext {
  registerTool: (tool: Tool) => unknown;
}

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const FRONTIS_URL = 'https://frontis-gateway.pilotariak.com/graphql';
const LEAGUES = ['lcapb', 'lidfpb', 'ctpb'];
const RESOURCES = ['clubs', 'competitions', 'categories', 'specialties'];
const PAGES = ['home', 'frontis', 'kancha', 'xilo', 'azkena', 'developers', 'about', 'contact', 'privacy'];

const projects = [
  { name: 'Frontis', kind: 'GraphQL API gateway', url: '/frontis/', source: 'https://github.com/Pilotariak/frontis' },
  { name: 'Kancha', kind: 'iOS & Android mobile app', url: '/kancha/', source: 'https://github.com/Pilotariak/kancha' },
  { name: 'Xilo', kind: 'Slack bot', url: '/xilo/', source: 'https://github.com/Pilotariak/xilo' },
  { name: 'Azkena', kind: 'MCP server', url: '/azkena/', source: 'https://github.com/Pilotariak/azkena' },
];

const text = (value: unknown): ToolResult => ({
  content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }],
});

const localePrefix = () => (document.documentElement.lang === 'fr' ? '/fr' : '');

const tools: Tool[] = [
  {
    name: 'list_projects',
    description: 'List the Pilotariak open-source projects with their page and source repository.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () => text(projects.map((p) => ({ ...p, url: new URL(localePrefix() + p.url, location.origin).href }))),
  },
  {
    name: 'get_developer_resources',
    description:
      'Get the endpoints and authentication requirements of the Pilotariak APIs (Frontis GraphQL, Azkena MCP) and discovery documents.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () =>
      text({
        graphql: { endpoint: FRONTIS_URL, auth: 'none', header: 'X-Pilotariak-League', leagues: LEAGUES },
        mcp: { endpoint: 'https://mcp.pilotariak.com/mcp', auth: 'OAuth 2.1 (see /auth.md)' },
        docs: new URL('/developers/', location.origin).href,
        llmsTxt: new URL('/llms.txt', location.origin).href,
      }),
  },
  {
    name: 'list_basque_pelota_data',
    description:
      'List Basque pelota clubs, competitions, categories or specialties for a league, live from the Frontis GraphQL API. Returns id and name for each item.',
    inputSchema: {
      type: 'object',
      properties: {
        resource: { type: 'string', enum: RESOURCES, description: 'Which collection to list.' },
        league: {
          type: 'string',
          enum: LEAGUES,
          description: 'League: lcapb (Côte d’Argent), lidfpb (Île-de-France), ctpb (Comité Territorial).',
        },
      },
      required: ['resource', 'league'],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ resource, league }) => {
      if (!RESOURCES.includes(String(resource)) || !LEAGUES.includes(String(league))) {
        return text(`Invalid input. resource must be one of ${RESOURCES.join(', ')}; league one of ${LEAGUES.join(', ')}.`);
      }
      const response = await fetch(FRONTIS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Pilotariak-League': String(league) },
        body: JSON.stringify({ query: `{ ${resource} { id name } }` }),
      });
      if (!response.ok) return text(`Frontis returned HTTP ${response.status}.`);
      return text(await response.json());
    },
  },
  {
    name: 'open_page',
    description: 'Navigate the browser to a Pilotariak page in the current language.',
    inputSchema: {
      type: 'object',
      properties: { page: { type: 'string', enum: PAGES } },
      required: ['page'],
    },
    execute: async ({ page }) => {
      if (!PAGES.includes(String(page))) return text(`Unknown page. Use one of ${PAGES.join(', ')}.`);
      const path = page === 'home' ? '/' : `/${page}/`;
      location.assign(localePrefix() + path);
      return text(`Opening ${path}`);
    },
  },
];

for (const tool of tools) {
  if (document.modelContext?.registerTool) {
    document.modelContext.registerTool(tool);
  } else {
    navigator.modelContext?.registerTool(tool);
  }
}

export {};
