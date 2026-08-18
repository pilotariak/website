// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

/**
 * Cloudflare Worker: Markdown content negotiation for AI agents.
 *
 * When a request includes `Accept: text/markdown`, the Worker fetches the
 * underlying HTML page, strips non-content elements via HTMLRewriter, converts
 * the remainder to Markdown, and returns it with Content-Type: text/markdown.
 * All other requests are forwarded directly to static assets.
 */

export default {
  /** @param {Request} request @param {{ ASSETS: Fetcher }} env */
  async fetch(request, env) {
    const accept = request.headers.get('Accept') ?? '';

    // Not a markdown request — serve static asset as-is
    if (!accept.includes('text/markdown')) {
      return env.ASSETS.fetch(request);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('Content-Type') ?? '';

    // Only convert HTML; pass through CSS/JS/images unchanged
    if (!contentType.includes('text/html')) {
      return response;
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
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        'x-markdown-tokens': String(tokenCount),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};

/**
 * Extract title and description from an HTML response without consuming it.
 * @param {Response} response — must be a clone so the original is still readable
 * @returns {Promise<{title: string, description: string}>}
 */
async function extractMeta(response) {
  let title = '';
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
        if (!title) title = el.getAttribute('content') ?? '';
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

  // Fenced code blocks (before inline code)
  md = md.replace(
    /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
    (_, c) => `\n\`\`\`\n${decodeHtmlEntities(c)}\n\`\`\`\n`,
  );

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => `\`${decodeHtmlEntities(c)}\``);

  // Bold / italic
  md = md.replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, (_, c) => `**${c}**`);
  md = md.replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, (_, c) => `_${c}_`);

  // List items
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `\n- ${innerText(c).trim()}`);
  md = md.replace(/<\/?[uo]l[^>]*>/gi, '\n');

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => `\n${c.trim()}\n`);

  // Horizontal rules
  md = md.replace(/<hr[^>]*\/?>/gi, '\n---\n');

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
