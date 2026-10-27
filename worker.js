// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

/**
 * Cloudflare Worker: Markdown content negotiation for AI agents.
 *
 * When a request includes `Accept: text/markdown` (or comes from a
 * user-initiated AI agent such as Claude-User), the Worker fetches the underlying HTML page, strips
 * non-content elements via HTMLRewriter, converts the remainder to Markdown,
 * and returns it with Content-Type: text/markdown. Every page also has a `.md`
 * twin (`/index.md`, `/frontis.md`), and `/?mode=agent` returns a JSON summary.
 * Agent discovery documents under `/.well-known/` are served from static
 * assets with consistent machine-readable response headers.
 */

const SITE = 'https://pilotariak.com';
const WELL_KNOWN_PREFIX = '/.well-known/';
const WELL_KNOWN_CACHE_CONTROL = 'public, max-age=3600';

// User-initiated AI agents that receive markdown even when asking for HTML.
// Indexing crawlers (GPTBot, ClaudeBot, …) keep HTML so they see JSON-LD,
// canonical and hreflang from the <head>.
const AI_AGENT_UA = /\b(?:ChatGPT-User|Claude-User|Perplexity-User)\b/i;

// Discovery documents advertised on every HTML page (RFC 8288 Link header).
const DISCOVERY_LINKS = [
  `<${SITE}/sitemap-index.xml>; rel="sitemap"`,
  `<${SITE}/llms.txt>; rel="describedby"; type="text/plain"`,
  `<${SITE}/.well-known/api-catalog>; rel="api-catalog"`,
  `<${SITE}/.well-known/ard.json>; rel="ard"; type="application/json"`,
  `<${SITE}/.well-known/agent-card.json>; rel="agent-card"`,
  `<${SITE}/.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
  `<https://mcp.pilotariak.com/mcp>; rel="mcp"`,
  `<${SITE}/.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"`,
  `<${SITE}/developers/>; rel="service-doc"`,
  `<${SITE}/auth.md>; rel="auth"; type="text/markdown"`,
  `<${SITE}/.well-known/security.txt>; rel="security.txt"`,
  `<${SITE}/.well-known/ai.txt>; rel="ai-txt"`,
  `<${SITE}/.well-known/ai.json>; rel="ai-json"`,
];

/**
 * @param {string} pathname
 * @returns {Headers}
 */
function wellKnownHeaders(pathname) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': pathname === '/.well-known/security.txt'
      ? 'public, max-age=86400'
      : WELL_KNOWN_CACHE_CONTROL,
    'X-Content-Type-Options': 'nosniff',
  });

  if (pathname === '/.well-known/api-catalog') {
    headers.set(
      'Content-Type',
      'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    );
  } else if (pathname.endsWith('.md')) {
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
  } else if (pathname.endsWith('.txt')) {
    headers.set('Content-Type', 'text/plain; charset=utf-8');
  } else if (pathname.endsWith('.json')) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  return headers;
}

/**
 * Content types for agent-facing files served from the site root.
 * @param {string} pathname
 * @returns {string | undefined}
 */
function rootContentType(pathname) {
  if (pathname.endsWith('.md')) return 'text/markdown; charset=utf-8';
  if (pathname.endsWith('.txt')) return 'text/plain; charset=utf-8';
  if (pathname.endsWith('.jsonl')) return 'application/jsonl; charset=utf-8';
  if (pathname === '/schemamap.xml') return 'application/xml; charset=utf-8';
  return undefined;
}

/**
 * Copy a response, overriding the given headers.
 * @param {Response} response
 * @param {Headers | Record<string, string>} overrides
 * @returns {Response}
 */
function withHeaders(response, overrides) {
  const headers = new Headers(response.headers);
  for (const [name, value] of new Headers(overrides)) headers.set(name, value);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Markdown twin URL of an HTML page: `/` → `/index.md`, `/frontis/` → `/frontis.md`.
 * @param {string} pathname
 * @returns {string}
 */
function markdownPathFor(pathname) {
  const path = pathname.replace(/\/+$/, '');
  if (path === '' || path === '/fr') return `${path}/index.md`;
  return `${path}.md`;
}

/**
 * HTML page path behind a markdown twin: `/index.md` → `/`, `/frontis.md` → `/frontis/`.
 * @param {string} pathname
 * @returns {string}
 */
function htmlPathFor(pathname) {
  const path = pathname.slice(0, -'.md'.length);
  return path.endsWith('/index') ? path.slice(0, -'index'.length) : `${path}/`;
}

/**
 * Fetch an asset, following same-origin trailing-slash redirects internally.
 * @param {{ ASSETS: Fetcher }} env
 * @param {Request} request
 * @param {string} pathname
 * @returns {Promise<Response>}
 */
async function fetchAsset(env, request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.search = '';

  const response = await env.ASSETS.fetch(new Request(url, request));
  const location = response.headers.get('Location');
  if (response.status >= 300 && response.status < 400 && location) {
    const next = new URL(location, url);
    if (next.origin === url.origin && next.pathname !== url.pathname) {
      return env.ASSETS.fetch(new Request(next, request));
    }
  }
  return response;
}

export default {
  /** @param {Request} request @param {{ ASSETS: Fetcher }} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname.startsWith(WELL_KNOWN_PREFIX)) {
      const response = await env.ASSETS.fetch(request);
      return response.ok ? withHeaders(response, wellKnownHeaders(pathname)) : problem(response.status, pathname);
    }

    if (url.searchParams.get('mode') === 'agent') {
      return agentView();
    }

    const accept = request.headers.get('Accept') ?? '';
    const wantsMarkdown = accept.includes('text/markdown')
      || AI_AGENT_UA.test(request.headers.get('User-Agent') ?? '');

    let response = await env.ASSETS.fetch(request);

    // Static agent files (auth.md, llms.txt, schemamap.xml, …): fix content type.
    const staticType = rootContentType(pathname);
    if (response.ok && staticType) {
      return withHeaders(response, {
        'Content-Type': staticType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': WELL_KNOWN_CACHE_CONTROL,
      });
    }

    // `.md` twin of an HTML page (e.g. /index.md, /frontis.md).
    const isTwin = response.status === 404 && pathname.endsWith('.md');
    if (isTwin) {
      response = await fetchAsset(env, request, htmlPathFor(pathname));
    }

    const contentType = response.headers.get('Content-Type') ?? '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    if (!wantsMarkdown && !isTwin) {
      const links = [...DISCOVERY_LINKS];
      if (response.ok) {
        links.unshift(`<${markdownPathFor(pathname)}>; rel="alternate"; type="text/markdown"`);
      }
      return withHeaders(response, { Link: links.join(', '), Vary: 'Accept, User-Agent' });
    }

    const markdownHeaders = {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept, User-Agent',
      'Cache-Control': 'public, max-age=3600',
    };

    if (response.status === 404) {
      return new Response(notFoundMarkdown(pathname), { status: 404, headers: markdownHeaders });
    }

    // Extract metadata before consuming the response body
    const { title, description } = await extractMeta(response.clone());

    // Strip non-content elements (including <head>) at the edge
    const cleaned = new HTMLRewriter()
      .on('head, nav, header, footer, script, style, noscript, aside, form, [aria-hidden="true"]', {
        element(el) {
          el.remove();
        },
      })
      .transform(response);

    const html = await cleaned.text();
    const markdown = htmlToMarkdown(html, title, description);
    const tokenCount = Math.ceil(markdown.length / 4);

    return new Response(markdown, {
      status: response.status,
      headers: { ...markdownHeaders, 'x-markdown-tokens': String(tokenCount) },
    });
  },
};

/**
 * RFC 9457 problem details for missing discovery documents.
 * @param {number} status
 * @param {string} pathname
 * @returns {Response}
 */
function problem(status, pathname) {
  const notFound = status === 404;
  const body = {
    type: 'about:blank',
    title: notFound ? 'Not Found' : 'Error',
    status,
    detail: notFound
      ? `No discovery document at ${pathname}. See ${SITE}/.well-known/api-catalog or ${SITE}/llms.txt.`
      : `Request for ${pathname} failed.`,
  };

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/problem+json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

/**
 * Markdown body for unknown paths, pointing agents to the site indexes.
 * @param {string} pathname
 * @returns {string}
 */
function notFoundMarkdown(pathname) {
  return `# 404 — Page not found

The path \`${pathname}\` does not exist on pilotariak.com.

Start from one of these indexes instead:

- [llms.txt](${SITE}/llms.txt) — site overview for AI agents
- [Sitemap](${SITE}/sitemap-index.xml) — every page on the site
- [Developers](${SITE}/developers/) — Frontis GraphQL API and Azkena MCP server
- [Home](${SITE}/)
`;
}

/**
 * Machine-readable summary served at `/?mode=agent`.
 * @returns {Response}
 */
function agentView() {
  const body = {
    name: 'Pilotariak',
    description:
      'Open-source software organisation for the Basque pelota community: public competition, club and result data via GraphQL and MCP.',
    url: `${SITE}/`,
    whenToUse: [
      'Look up Basque pelota clubs, competitions, categories, specialties or match results for a French league (lcapb, lidfpb, ctpb).',
      'Give an AI assistant tool access to Basque pelota data over the Model Context Protocol.',
      'Learn about the Pilotariak open-source projects (Frontis, Kancha, Xilo, Azkena).',
    ],
    apis: [
      {
        name: 'Frontis GraphQL API',
        type: 'graphql',
        endpoint: 'https://frontis-gateway.pilotariak.com/graphql',
        authentication: 'none',
        requiredHeaders: { 'X-Pilotariak-League': 'lcapb | lidfpb | ctpb' },
        access: 'read-only',
        docs: `${SITE}/developers/`,
        skill: `${SITE}/.well-known/agent-skills/graphql-api/SKILL.md`,
      },
    ],
    mcp: [
      {
        name: 'Azkena MCP server',
        transport: 'streamable-http',
        endpoint: 'https://mcp.pilotariak.com/mcp',
        authentication: 'oauth2',
        protectedResourceMetadata: 'https://mcp.pilotariak.com/.well-known/oauth-protected-resource',
        authorizationServerMetadata: 'https://mcp.pilotariak.com/.well-known/oauth-authorization-server',
        tools: ['list_competitions', 'list_clubs', 'list_categories', 'list_specialties', 'list_results'],
        serverCard: `${SITE}/.well-known/mcp/server-card.json`,
        authGuide: `${SITE}/auth.md`,
      },
    ],
    discovery: {
      llmsTxt: `${SITE}/llms.txt`,
      ard: `${SITE}/.well-known/ard.json`,
      apiCatalog: `${SITE}/.well-known/api-catalog`,
      agentCard: `${SITE}/.well-known/agent-card.json`,
      agentSkills: `${SITE}/.well-known/agent-skills/index.json`,
      sitemap: `${SITE}/sitemap-index.xml`,
    },
    source: 'https://github.com/Pilotariak',
    license: 'Apache-2.0',
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': WELL_KNOWN_CACHE_CONTROL,
      Vary: 'Accept',
    },
  });
}

/**
 * Extract title and description from an HTML response without consuming it.
 * @param {Response} response — must be a clone so the original is still readable
 * @returns {Promise<{title: string, description: string}>}
 */
async function extractMeta(response) {
  let title = '';
  let ogTitle = '';
  let description = '';

  const transformed = new HTMLRewriter()
    .on('title', {
      text(chunk) {
        title += chunk.text;
      },
    })
    .on('meta[name="description"]', {
      element(el) {
        description = el.getAttribute('content') ?? '';
      },
    })
    .on('meta[property="og:title"]', {
      element(el) {
        ogTitle = el.getAttribute('content') ?? '';
      },
    })
    .on('meta[property="og:description"]', {
      element(el) {
        if (!description) description = el.getAttribute('content') ?? '';
      },
    })
    .transform(response);

  // Consume the stream so handlers fire
  await transformed.text();

  // Prefer the og:title attribute: text handlers can receive a node twice.
  if (ogTitle) title = ogTitle;

  return {
    title: decodeHtmlEntities(title.trim()),
    description: decodeHtmlEntities(description.trim()),
  };
}

/**
 * Convert cleaned HTML to Markdown using lightweight regex transforms.
 * @param {string} html
 * @param {string} title
 * @param {string} description
 * @returns {string}
 */
function htmlToMarkdown(html, title = '', description = '') {
  const pageTitle = title;
  const pageDesc = description;

  let md = html;

  // Headings (strip inner tags before emitting)
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n# ${innerText(t)}\n`);
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n## ${innerText(t)}\n`);
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n### ${innerText(t)}\n`);
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n#### ${innerText(t)}\n`);

  // Links
  md = md.replace(
    /<a\b[^>]*\bhref=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, text) => {
      const t = innerText(text).trim();
      return t ? `[${t}](${href})` : '';
    },
  );

  // Fenced code blocks (before inline code). Kept aside so whitespace
  // normalisation below does not strip their indentation.
  const codeBlocks = [];
  md = md.replace(
    /<pre\b[^>]*><code\b[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
    (_, c) => {
      codeBlocks.push(`\`\`\`\n${decodeHtmlEntities(c).replace(/^\n+|\s+$/g, '')}\n\`\`\``);
      return `\n\u0000${codeBlocks.length - 1}\u0000\n`;
    },
  );

  // Figure captions become their own paragraph
  md = md.replace(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/gi, (_, c) => `\n${innerText(c).trim()}\n`);

  // Inline code
  md = md.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => `\`${decodeHtmlEntities(c)}\``);

  // Bold / italic
  md = md.replace(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, (_, c) => `**${c}**`);
  md = md.replace(/<(?:em|i)\b[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, (_, c) => `_${c}_`);

  // List items
  md = md.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `\n- ${innerText(c).trim()}`);
  md = md.replace(/<\/?[uo]l\b[^>]*>/gi, '\n');

  // Paragraphs
  md = md.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => `\n${c.trim()}\n`);

  // Horizontal rules
  md = md.replace(/<hr\b[^>]*\/?>/gi, '\n---\n');

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Strip all remaining tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode remaining HTML entities
  md = decodeHtmlEntities(md);

  // Normalise whitespace
  md = md.replace(/\t/g, ' ');
  md = md.replace(/[ \t]{2,}/g, ' ');
  md = md.replace(/^ +/gm, '');
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.replace(/\u0000(\d+)\u0000/g, (_, i) => codeBlocks[Number(i)]);
  md = md.trim();

  // Prepend title / description
  const front = [];
  if (pageTitle) front.push(`# ${pageTitle}`);
  if (pageDesc) front.push(`\n> ${pageDesc}`);

  return front.length > 0 ? `${front.join('\n')}\n\n${md}` : md;
}

/** Strip all HTML tags from a string. */
function innerText(html) {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ''));
}

/** Decode common HTML entities. */
function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}
