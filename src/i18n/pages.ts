// SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
// SPDX-License-Identifier: Apache-2.0

/**
 * Long-form content for the prose pages (developers, about, contact, privacy,
 * 404). Paragraph and list strings may contain inline HTML (links, <code>).
 */

import type { Lang } from './ui';

export interface ProseSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
  code?: { label: string; content: string };
}

export interface ProseContent {
  meta: { title: string; description: string };
  schemaType: string;
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  sections: ProseSection[];
}

export type ProsePageKey = 'developers' | 'about' | 'contact' | 'privacy' | 'notFound';

const FRONTIS = 'https://frontis-gateway.pilotariak.com/graphql';
const MCP = 'https://mcp.pilotariak.com/mcp';
const LAST_UPDATED = '2026-10-27';

const graphqlExample = `curl -s -X POST ${FRONTIS} \\
  -H "Content-Type: application/json" \\
  -H "X-Pilotariak-League: lcapb" \\
  -d '{"query":"{ clubs { id name } }"}'`;

const mcpConfigExample = `{
  "mcpServers": {
    "pilotariak": {
      "type": "http",
      "url": "${MCP}"
    }
  }
}`;

const errorExample = `{
  "errors": [{
    "message": "Missing X-Pilotariak-League header",
    "path": ["clubs"],
    "extensions": { "code": "BAD_REQUEST", "serviceName": "clubs" }
  }],
  "data": null
}`;

export const prose: Record<Lang, Record<ProsePageKey, ProseContent>> = {
  en: {
    developers: {
      meta: {
        title: 'Developers — Pilotariak GraphQL API & MCP server | Pilotariak',
        description:
          'Pilotariak developer portal: the public Frontis GraphQL API and the Azkena MCP server for Basque pelota data. Endpoints, authentication, quickstart and errors.',
      },
      schemaType: 'TechArticle',
      eyebrow: 'Developers',
      title: 'Pilotariak developer portal',
      intro:
        'Pilotariak publishes Basque pelota data — clubs, competitions, categories, specialties and match results — through two free, open-source interfaces: the <strong>Frontis GraphQL API</strong> for applications and the <strong>Azkena MCP server</strong> for AI assistants. Both are read-only.',
      sections: [
        {
          id: 'quickstart',
          heading: 'Quickstart',
          paragraphs: [
            'No sign-up or API key is needed for the GraphQL API. Pick a league and send a query:',
          ],
          code: { label: 'List clubs in the LCAPB league', content: graphqlExample },
        },
        {
          id: 'graphql',
          heading: 'Frontis GraphQL API',
          items: [
            `Endpoint: <code>${FRONTIS}</code> (HTTP <code>POST</code>, JSON body)`,
            'Authentication: none — the API is public and read-only',
            'Required header: <code>X-Pilotariak-League</code> = <code>lcapb</code> (Côte d’Argent), <code>lidfpb</code> (Île-de-France) or <code>ctpb</code> (Comité Territorial)',
            'Queries: <code>clubs</code>, <code>club(id)</code>, <code>competitions</code>, <code>competition(id)</code>, <code>categories</code>, <code>category(id)</code>, <code>specialties</code>, <code>specialty(id)</code>, <code>results(competitionId, specialtyId, categoryId, phase)</code>, <code>result(id)</code>, <code>version</code>',
            'Schema: standard GraphQL introspection is enabled, so any GraphQL client or code generator can load it',
            'Full reference: <a href="/.well-known/agent-skills/graphql-api/SKILL.md">graphql-api skill</a> · source on <a href="https://github.com/Pilotariak/frontis">GitHub</a>',
          ],
        },
        {
          id: 'mcp',
          heading: 'Azkena MCP server',
          paragraphs: [
            `Azkena exposes the same data as <a href="https://modelcontextprotocol.io">Model Context Protocol</a> tools so assistants such as Claude, Cursor or Codex can query it in natural language. Endpoint: <code>${MCP}</code> (Streamable HTTP, protocol <code>2026-07-28</code>).`,
            'Tools: <code>list_competitions</code>, <code>list_clubs</code>, <code>list_categories</code>, <code>list_specialties</code>, <code>list_results</code>. Every tool takes a <code>league</code> argument.',
          ],
          code: { label: 'MCP client configuration', content: mcpConfigExample },
        },
        {
          id: 'authentication',
          heading: 'Authentication',
          paragraphs: [
            'The GraphQL API and every discovery document on pilotariak.com are public. The MCP server requires an OAuth 2.1 access token: clients register dynamically, a person approves access on the consent screen, and the client exchanges the code with PKCE (S256). An unauthenticated request returns <code>401</code> with a <code>WWW-Authenticate</code> header pointing at the protected-resource metadata.',
            'The step-by-step agent walkthrough is in <a href="/auth.md">auth.md</a>. Metadata: <a href="https://mcp.pilotariak.com/.well-known/oauth-protected-resource/mcp">protected resource (RFC 9728)</a> · <a href="https://mcp.pilotariak.com/.well-known/oauth-authorization-server">authorization server (RFC 8414)</a>.',
          ],
        },
        {
          id: 'errors',
          heading: 'Errors',
          paragraphs: [
            'GraphQL errors follow the GraphQL specification: the response carries an <code>errors</code> array, each entry with a human-readable <code>message</code> and a machine-readable <code>extensions.code</code> (<code>BAD_REQUEST</code>, <code>GRAPHQL_VALIDATION_FAILED</code>, …). The MCP server returns JSON errors such as <code>{"error":"invalid_token"}</code> with standard OAuth error codes.',
          ],
          code: { label: 'Missing league header', content: errorExample },
        },
        {
          id: 'limits',
          heading: 'Rate limits, versions and environments',
          items: [
            'Azkena allows 60 requests per minute per client IP; beyond that it answers <code>429</code>.',
            'Frontis has no published quota — cache responses and avoid tight polling loops.',
            'Check the deployed gateway version with the <code>{ version }</code> query; changes are listed in each project’s GitHub releases.',
            'There is no separate sandbox: all interfaces are read-only, so no call can modify data.',
          ],
        },
        {
          id: 'discovery',
          heading: 'Machine-readable discovery',
          items: [
            '<a href="/llms.txt">llms.txt</a> — site overview for language models (developer index: <a href="/developers/llms.txt">/developers/llms.txt</a>)',
            '<a href="/.well-known/api-catalog">API catalog (RFC 9727)</a> · <a href="/.well-known/openapi.json">OpenAPI description</a> of the discovery documents',
            '<a href="/.well-known/ard.json">Agentic Resource Discovery catalog</a> · <a href="/.well-known/mcp/server-card.json">MCP server card</a> · <a href="/.well-known/agent-card.json">A2A agent card</a>',
            '<a href="/.well-known/agent-skills/index.json">Agent skills index</a> — SKILL.md files for the GraphQL API, MCP server, projects and sport context',
            'Every page has a markdown version: append <code>.md</code> (for example <a href="/developers.md">/developers.md</a>) or send <code>Accept: text/markdown</code>',
          ],
        },
        {
          id: 'source',
          heading: 'Source code and SDKs',
          paragraphs: [
            'Everything is Apache-2.0 on <a href="https://github.com/Pilotariak">github.com/Pilotariak</a>, including this website (<a href="https://github.com/Pilotariak/website">Pilotariak/website</a>, with an <a href="https://github.com/Pilotariak/website/blob/main/AGENTS.md">AGENTS.md</a> for coding agents). There is no dedicated SDK: any GraphQL or MCP client library works. Issues and pull requests are welcome.',
          ],
        },
      ],
    },
    about: {
      meta: {
        title: 'About Pilotariak — open source for Basque pelota | Pilotariak',
        description:
          'Pilotariak is an open-source software organisation building data tools, APIs and apps for the Basque pelota community.',
      },
      schemaType: 'AboutPage',
      eyebrow: 'About',
      title: 'About Pilotariak',
      intro:
        'Pilotariak is an open-source software organisation for the Basque pelota (pelote basque) community. We build the data tools, APIs and applications that make competition results, clubs and calendars easy to find for players, clubs, fans and developers.',
      sections: [
        {
          id: 'mission',
          heading: 'Why Pilotariak exists',
          paragraphs: [
            'Basque pelota is played across around ten disciplines on both sides of the Pyrenees, from Cesta Punta and Grand Chistera to Main Nue, Paleta, Xare and Rebot. Results are published by regional leagues in different places and formats. Pilotariak gathers that information behind consistent, open interfaces so anyone can build on it.',
          ],
        },
        {
          id: 'projects',
          heading: 'What we build',
          items: [
            '<a href="/frontis/">Frontis</a> — a public GraphQL gateway that federates clubs, competitions, categories, specialties and results',
            '<a href="/kancha/">Kancha</a> — a mobile app (iPhone, Android in development) for live results and competition calendars',
            '<a href="/xilo/">Xilo</a> — a Slack bot that brings results and events into community channels',
            '<a href="/azkena/">Azkena</a> — an MCP server so AI assistants can query Basque pelota data',
          ],
        },
        {
          id: 'data',
          heading: 'Data coverage',
          paragraphs: [
            'Data currently covers the LCAPB (Côte d’Argent), LIDFPB (Île-de-France) and CTPB leagues: clubs, yearly competitions, categories, specialties and match results with scores, sets and lineups.',
          ],
        },
        {
          id: 'open-source',
          heading: 'Open source and governance',
          paragraphs: [
            'Every project is released under the Apache 2.0 licence and developed in the open on <a href="https://github.com/Pilotariak">GitHub</a>, where the organisation has existed since 2019. Pilotariak is maintained by Nicolas Lamirault with community contributors. Contributions follow each repository’s CONTRIBUTING guide and the Developer Certificate of Origin.',
          ],
        },
        {
          id: 'more',
          heading: 'Learn more',
          items: [
            '<a href="/developers/">Developer portal</a> — APIs, authentication and quickstart',
            '<a href="/contact/">Contact</a> — how to reach the maintainers',
            '<a href="/privacy/">Privacy</a> — what this site does and does not collect',
          ],
        },
      ],
    },
    contact: {
      meta: {
        title: 'Contact Pilotariak | Pilotariak',
        description:
          'How to contact the Pilotariak maintainers: GitHub issues for bugs and ideas, a private channel for security and privacy questions.',
      },
      schemaType: 'ContactPage',
      eyebrow: 'Contact',
      title: 'Contact Pilotariak',
      intro:
        'Pilotariak is run in the open by volunteers. The fastest way to reach us depends on what you need — most conversations happen on GitHub so others can benefit from the answer.',
      sections: [
        {
          id: 'issues',
          heading: 'Bugs, data errors and feature ideas',
          paragraphs: [
            'Open an issue on the repository concerned: <a href="https://github.com/Pilotariak/frontis/issues">Frontis</a> (API and data), <a href="https://github.com/Pilotariak/kancha/issues">Kancha</a> (mobile app), <a href="https://github.com/Pilotariak/xilo/issues">Xilo</a> (Slack bot), <a href="https://github.com/Pilotariak/azkena/issues">Azkena</a> (MCP server) or <a href="https://github.com/Pilotariak/website/issues">website</a>. Include the league, competition and a link or screenshot when reporting a wrong result.',
          ],
        },
        {
          id: 'security',
          heading: 'Security and privacy',
          paragraphs: [
            'Report vulnerabilities privately using the contact listed in our <a href="/.well-known/security.txt">security.txt</a> and <a href="https://github.com/Pilotariak/website/blob/main/SECURITY.md">security policy</a>. Please do not open public issues for security problems. The same contact handles privacy requests.',
          ],
        },
        {
          id: 'contribute',
          heading: 'Contributing',
          paragraphs: [
            'Pull requests are welcome on every repository. Read the CONTRIBUTING guide first, sign off your commits (DCO) and use Conventional Commit messages.',
          ],
        },
        {
          id: 'response',
          heading: 'Response times and languages',
          paragraphs: [
            'We answer in English or French. As a volunteer project we reply on a best-effort basis, usually within a few days; security reports are prioritised.',
          ],
        },
      ],
    },
    privacy: {
      meta: {
        title: 'Privacy policy | Pilotariak',
        description:
          'Pilotariak privacy policy: no cookies, no analytics, no tracking on pilotariak.com. What Cloudflare hosting and the Azkena MCP server process.',
      },
      schemaType: 'WebPage',
      eyebrow: 'Privacy',
      title: 'Privacy policy',
      intro:
        'This page explains what personal data pilotariak.com and the Pilotariak services process. Short version: the website sets no cookies, runs no analytics and asks you for no information.',
      updated: LAST_UPDATED,
      sections: [
        {
          id: 'website',
          heading: 'The website',
          items: [
            'No cookies, local storage or tracking pixels are used.',
            'No analytics, advertising or third-party scripts are loaded; fonts are served from pilotariak.com itself.',
            'There are no forms, accounts or newsletters, so we never ask for your name or email address.',
          ],
        },
        {
          id: 'hosting',
          heading: 'Hosting and server logs',
          paragraphs: [
            'The site and APIs run on Cloudflare. To deliver pages and protect against abuse, Cloudflare processes technical request data such as IP address, user agent and requested URL, as described in the <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>. We do not combine this data with any other source and only look at aggregated traffic statistics.',
          ],
        },
        {
          id: 'apis',
          heading: 'APIs and the MCP server',
          paragraphs: [
            'The Frontis GraphQL API needs no account and stores nothing about callers. The Azkena MCP server uses OAuth: it stores the registered client (name and redirect URLs) and the access and refresh tokens it issues, so it can authenticate later requests. Tokens can be revoked at any time.',
            'Competition data comes from results published by the Basque pelota leagues and contains club names and, for some matches, player lineups.',
          ],
        },
        {
          id: 'rights',
          heading: 'Your rights',
          paragraphs: [
            'Under the GDPR you can ask to access, correct or delete personal data that concerns you — for example your name in a published lineup. Use the contact listed in our <a href="/.well-known/security.txt">security.txt</a>; we answer within one month. You can also complain to your data protection authority (in France, the CNIL).',
          ],
        },
        {
          id: 'changes',
          heading: 'Changes',
          paragraphs: [
            'We update this page when our practices change. The history of every change is public in the <a href="https://github.com/Pilotariak/website">website repository</a>.',
          ],
        },
      ],
    },
    notFound: {
      meta: {
        title: 'Page not found | Pilotariak',
        description: 'This page does not exist on pilotariak.com.',
      },
      schemaType: 'WebPage',
      eyebrow: '404',
      title: 'Page not found',
      intro: 'The page you are looking for does not exist or has moved.',
      sections: [
        {
          id: 'next',
          heading: 'Where to go next',
          items: [
            '<a href="/">Home</a> — projects and Basque pelota overview',
            '<a href="/developers/">Developers</a> — GraphQL API and MCP server',
            '<a href="/llms.txt">llms.txt</a> and <a href="/sitemap-index.xml">sitemap</a> — every page on the site',
          ],
        },
      ],
    },
  },
  fr: {
    developers: {
      meta: {
        title: 'Développeurs — API GraphQL & serveur MCP Pilotariak | Pilotariak',
        description:
          'Portail développeurs Pilotariak : l’API GraphQL publique Frontis et le serveur MCP Azkena pour les données de pelote basque. Endpoints, authentification, démarrage rapide et erreurs.',
      },
      schemaType: 'TechArticle',
      eyebrow: 'Développeurs',
      title: 'Portail développeurs Pilotariak',
      intro:
        'Pilotariak publie les données de la pelote basque — clubs, compétitions, catégories, spécialités et résultats — via deux interfaces libres et gratuites : l’<strong>API GraphQL Frontis</strong> pour les applications et le <strong>serveur MCP Azkena</strong> pour les assistants IA. Les deux sont en lecture seule.',
      sections: [
        {
          id: 'quickstart',
          heading: 'Démarrage rapide',
          paragraphs: [
            'L’API GraphQL ne demande ni inscription ni clé d’API. Choisissez une ligue et envoyez une requête :',
          ],
          code: { label: 'Lister les clubs de la ligue LCAPB', content: graphqlExample },
        },
        {
          id: 'graphql',
          heading: 'API GraphQL Frontis',
          items: [
            `Endpoint : <code>${FRONTIS}</code> (HTTP <code>POST</code>, corps JSON)`,
            'Authentification : aucune — l’API est publique et en lecture seule',
            'En-tête obligatoire : <code>X-Pilotariak-League</code> = <code>lcapb</code> (Côte d’Argent), <code>lidfpb</code> (Île-de-France) ou <code>ctpb</code> (Comité Territorial)',
            'Requêtes : <code>clubs</code>, <code>club(id)</code>, <code>competitions</code>, <code>competition(id)</code>, <code>categories</code>, <code>category(id)</code>, <code>specialties</code>, <code>specialty(id)</code>, <code>results(competitionId, specialtyId, categoryId, phase)</code>, <code>result(id)</code>, <code>version</code>',
            'Schéma : l’introspection GraphQL est activée, tout client ou générateur de code GraphQL peut le charger',
            'Référence complète : <a href="/.well-known/agent-skills/graphql-api/SKILL.md">skill graphql-api</a> · code source sur <a href="https://github.com/Pilotariak/frontis">GitHub</a>',
          ],
        },
        {
          id: 'mcp',
          heading: 'Serveur MCP Azkena',
          paragraphs: [
            `Azkena expose les mêmes données sous forme d’outils <a href="https://modelcontextprotocol.io">Model Context Protocol</a> afin que des assistants comme Claude, Cursor ou Codex puissent les interroger en langage naturel. Endpoint : <code>${MCP}</code> (Streamable HTTP, protocole <code>2026-07-28</code>).`,
            'Outils : <code>list_competitions</code>, <code>list_clubs</code>, <code>list_categories</code>, <code>list_specialties</code>, <code>list_results</code>. Chaque outil prend un argument <code>league</code>.',
          ],
          code: { label: 'Configuration d’un client MCP', content: mcpConfigExample },
        },
        {
          id: 'authentication',
          heading: 'Authentification',
          paragraphs: [
            'L’API GraphQL et tous les documents de découverte de pilotariak.com sont publics. Le serveur MCP exige un jeton d’accès OAuth 2.1 : le client s’enregistre dynamiquement, une personne autorise l’accès sur l’écran de consentement, puis le client échange le code avec PKCE (S256). Une requête non authentifiée reçoit un <code>401</code> avec un en-tête <code>WWW-Authenticate</code> pointant vers les métadonnées de la ressource protégée.',
            'Le guide pas à pas pour les agents se trouve dans <a href="/auth.md">auth.md</a>. Métadonnées : <a href="https://mcp.pilotariak.com/.well-known/oauth-protected-resource/mcp">ressource protégée (RFC 9728)</a> · <a href="https://mcp.pilotariak.com/.well-known/oauth-authorization-server">serveur d’autorisation (RFC 8414)</a>.',
          ],
        },
        {
          id: 'errors',
          heading: 'Erreurs',
          paragraphs: [
            'Les erreurs GraphQL suivent la spécification GraphQL : la réponse contient un tableau <code>errors</code>, chaque entrée avec un <code>message</code> lisible et un code machine <code>extensions.code</code> (<code>BAD_REQUEST</code>, <code>GRAPHQL_VALIDATION_FAILED</code>, …). Le serveur MCP renvoie des erreurs JSON comme <code>{"error":"invalid_token"}</code> avec les codes d’erreur OAuth standard.',
          ],
          code: { label: 'En-tête de ligue manquant', content: errorExample },
        },
        {
          id: 'limits',
          heading: 'Limites, versions et environnements',
          items: [
            'Azkena autorise 60 requêtes par minute et par adresse IP ; au-delà il répond <code>429</code>.',
            'Frontis n’a pas de quota publié — mettez les réponses en cache et évitez les sondages trop fréquents.',
            'Vérifiez la version déployée de la passerelle avec la requête <code>{ version }</code> ; les changements sont listés dans les releases GitHub de chaque projet.',
            'Il n’y a pas de bac à sable séparé : toutes les interfaces sont en lecture seule, aucun appel ne peut modifier les données.',
          ],
        },
        {
          id: 'discovery',
          heading: 'Découverte automatisée',
          items: [
            '<a href="/llms.txt">llms.txt</a> — présentation du site pour les modèles de langage (index développeurs : <a href="/developers/llms.txt">/developers/llms.txt</a>)',
            '<a href="/.well-known/api-catalog">Catalogue d’API (RFC 9727)</a> · <a href="/.well-known/openapi.json">description OpenAPI</a> des documents de découverte',
            '<a href="/.well-known/ard.json">Catalogue Agentic Resource Discovery</a> · <a href="/.well-known/mcp/server-card.json">carte du serveur MCP</a> · <a href="/.well-known/agent-card.json">carte d’agent A2A</a>',
            '<a href="/.well-known/agent-skills/index.json">Index des skills d’agent</a> — fichiers SKILL.md pour l’API GraphQL, le serveur MCP, les projets et le contexte sportif',
            'Chaque page existe en markdown : ajoutez <code>.md</code> (par exemple <a href="/fr/developers.md">/fr/developers.md</a>) ou envoyez <code>Accept: text/markdown</code>',
          ],
        },
        {
          id: 'source',
          heading: 'Code source et SDK',
          paragraphs: [
            'Tout est sous licence Apache-2.0 sur <a href="https://github.com/Pilotariak">github.com/Pilotariak</a>, y compris ce site (<a href="https://github.com/Pilotariak/website">Pilotariak/website</a>, avec un <a href="https://github.com/Pilotariak/website/blob/main/AGENTS.md">AGENTS.md</a> pour les agents de code). Il n’existe pas de SDK dédié : n’importe quelle bibliothèque cliente GraphQL ou MCP fonctionne. Issues et pull requests bienvenues.',
          ],
        },
      ],
    },
    about: {
      meta: {
        title: 'À propos de Pilotariak — l’open source pour la pelote basque | Pilotariak',
        description:
          'Pilotariak est une organisation open source qui développe des outils de données, des API et des applications pour la communauté de la pelote basque.',
      },
      schemaType: 'AboutPage',
      eyebrow: 'À propos',
      title: 'À propos de Pilotariak',
      intro:
        'Pilotariak est une organisation de logiciels open source dédiée à la communauté de la pelote basque. Nous développons les outils de données, les API et les applications qui rendent les résultats, les clubs et les calendriers faciles à trouver pour les joueurs, les clubs, le public et les développeurs.',
      sections: [
        {
          id: 'mission',
          heading: 'Pourquoi Pilotariak',
          paragraphs: [
            'La pelote basque se pratique dans une dizaine de spécialités des deux côtés des Pyrénées, de la Cesta Punta et du Grand Chistera à la Main Nue, la Paleta, le Xare ou le Rebot. Les résultats sont publiés par les ligues régionales, à des endroits et sous des formats différents. Pilotariak rassemble ces informations derrière des interfaces ouvertes et cohérentes pour que chacun puisse construire dessus.',
          ],
        },
        {
          id: 'projects',
          heading: 'Nos projets',
          items: [
            '<a href="/fr/frontis/">Frontis</a> — une passerelle GraphQL publique qui fédère clubs, compétitions, catégories, spécialités et résultats',
            '<a href="/fr/kancha/">Kancha</a> — une application mobile (iPhone, Android en développement) pour les résultats en direct et les calendriers',
            '<a href="/fr/xilo/">Xilo</a> — un bot Slack qui apporte résultats et événements dans les canaux de la communauté',
            '<a href="/fr/azkena/">Azkena</a> — un serveur MCP pour que les assistants IA interrogent les données de pelote basque',
          ],
        },
        {
          id: 'data',
          heading: 'Couverture des données',
          paragraphs: [
            'Les données couvrent actuellement les ligues LCAPB (Côte d’Argent), LIDFPB (Île-de-France) et CTPB : clubs, compétitions annuelles, catégories, spécialités et résultats des parties avec scores, manches et compositions d’équipes.',
          ],
        },
        {
          id: 'open-source',
          heading: 'Open source et gouvernance',
          paragraphs: [
            'Chaque projet est publié sous licence Apache 2.0 et développé ouvertement sur <a href="https://github.com/Pilotariak">GitHub</a>, où l’organisation existe depuis 2019. Pilotariak est maintenu par Nicolas Lamirault avec des contributeurs de la communauté. Les contributions suivent le guide CONTRIBUTING de chaque dépôt et le Developer Certificate of Origin.',
          ],
        },
        {
          id: 'more',
          heading: 'En savoir plus',
          items: [
            '<a href="/fr/developers/">Portail développeurs</a> — API, authentification et démarrage rapide',
            '<a href="/fr/contact/">Contact</a> — comment joindre les mainteneurs',
            '<a href="/fr/privacy/">Confidentialité</a> — ce que ce site collecte et ne collecte pas',
          ],
        },
      ],
    },
    contact: {
      meta: {
        title: 'Contacter Pilotariak | Pilotariak',
        description:
          'Comment contacter les mainteneurs de Pilotariak : issues GitHub pour les bugs et idées, canal privé pour la sécurité et la confidentialité.',
      },
      schemaType: 'ContactPage',
      eyebrow: 'Contact',
      title: 'Contacter Pilotariak',
      intro:
        'Pilotariak est développé ouvertement par des bénévoles. Le meilleur moyen de nous joindre dépend de votre besoin — la plupart des échanges ont lieu sur GitHub pour que la réponse profite à tous.',
      sections: [
        {
          id: 'issues',
          heading: 'Bugs, erreurs de données et idées',
          paragraphs: [
            'Ouvrez une issue sur le dépôt concerné : <a href="https://github.com/Pilotariak/frontis/issues">Frontis</a> (API et données), <a href="https://github.com/Pilotariak/kancha/issues">Kancha</a> (application mobile), <a href="https://github.com/Pilotariak/xilo/issues">Xilo</a> (bot Slack), <a href="https://github.com/Pilotariak/azkena/issues">Azkena</a> (serveur MCP) ou <a href="https://github.com/Pilotariak/website/issues">site web</a>. Pour signaler un résultat erroné, indiquez la ligue, la compétition et un lien ou une capture d’écran.',
          ],
        },
        {
          id: 'security',
          heading: 'Sécurité et confidentialité',
          paragraphs: [
            'Signalez les vulnérabilités en privé via le contact indiqué dans notre <a href="/.well-known/security.txt">security.txt</a> et notre <a href="https://github.com/Pilotariak/website/blob/main/SECURITY.md">politique de sécurité</a>. N’ouvrez pas d’issue publique pour un problème de sécurité. Le même contact traite les demandes relatives à la vie privée.',
          ],
        },
        {
          id: 'contribute',
          heading: 'Contribuer',
          paragraphs: [
            'Les pull requests sont bienvenues sur tous les dépôts. Lisez d’abord le guide CONTRIBUTING, signez vos commits (DCO) et utilisez des messages Conventional Commits.',
          ],
        },
        {
          id: 'response',
          heading: 'Délais et langues',
          paragraphs: [
            'Nous répondons en français ou en anglais. Projet bénévole, nous répondons au mieux, généralement sous quelques jours ; les signalements de sécurité sont traités en priorité.',
          ],
        },
      ],
    },
    privacy: {
      meta: {
        title: 'Politique de confidentialité | Pilotariak',
        description:
          'Politique de confidentialité de Pilotariak : aucun cookie, aucune mesure d’audience, aucun pistage sur pilotariak.com. Ce que traitent l’hébergement Cloudflare et le serveur MCP Azkena.',
      },
      schemaType: 'WebPage',
      eyebrow: 'Confidentialité',
      title: 'Politique de confidentialité',
      intro:
        'Cette page explique quelles données personnelles pilotariak.com et les services Pilotariak traitent. En bref : le site ne dépose aucun cookie, n’utilise aucun outil de mesure d’audience et ne vous demande aucune information.',
      updated: LAST_UPDATED,
      sections: [
        {
          id: 'website',
          heading: 'Le site web',
          items: [
            'Aucun cookie, stockage local ou pixel de suivi n’est utilisé.',
            'Aucun script d’analyse, de publicité ou tiers n’est chargé ; les polices sont servies par pilotariak.com.',
            'Il n’y a ni formulaire, ni compte, ni newsletter : nous ne vous demandons jamais votre nom ou votre adresse e-mail.',
          ],
        },
        {
          id: 'hosting',
          heading: 'Hébergement et journaux serveur',
          paragraphs: [
            'Le site et les API sont hébergés chez Cloudflare. Pour servir les pages et protéger contre les abus, Cloudflare traite des données techniques de requête comme l’adresse IP, l’agent utilisateur et l’URL demandée, comme décrit dans la <a href="https://www.cloudflare.com/fr-fr/privacypolicy/">politique de confidentialité de Cloudflare</a>. Nous ne croisons ces données avec aucune autre source et ne consultons que des statistiques de trafic agrégées.',
          ],
        },
        {
          id: 'apis',
          heading: 'API et serveur MCP',
          paragraphs: [
            'L’API GraphQL Frontis ne demande aucun compte et ne conserve rien sur les appelants. Le serveur MCP Azkena utilise OAuth : il conserve le client enregistré (nom et URL de redirection) ainsi que les jetons d’accès et de rafraîchissement émis, afin d’authentifier les requêtes suivantes. Les jetons peuvent être révoqués à tout moment.',
            'Les données de compétition proviennent des résultats publiés par les ligues de pelote basque et contiennent des noms de clubs et, pour certaines parties, la composition des équipes.',
          ],
        },
        {
          id: 'rights',
          heading: 'Vos droits',
          paragraphs: [
            'Conformément au RGPD, vous pouvez demander l’accès, la rectification ou l’effacement des données personnelles vous concernant — par exemple votre nom dans une composition d’équipe publiée. Utilisez le contact indiqué dans notre <a href="/.well-known/security.txt">security.txt</a> ; nous répondons sous un mois. Vous pouvez aussi saisir la CNIL.',
          ],
        },
        {
          id: 'changes',
          heading: 'Modifications',
          paragraphs: [
            'Nous mettons cette page à jour lorsque nos pratiques évoluent. L’historique de chaque modification est public dans le <a href="https://github.com/Pilotariak/website">dépôt du site</a>.',
          ],
        },
      ],
    },
    notFound: {
      meta: {
        title: 'Page introuvable | Pilotariak',
        description: 'Cette page n’existe pas sur pilotariak.com.',
      },
      schemaType: 'WebPage',
      eyebrow: '404',
      title: 'Page introuvable',
      intro: 'La page que vous cherchez n’existe pas ou a été déplacée.',
      sections: [
        {
          id: 'next',
          heading: 'Où aller ensuite',
          items: [
            '<a href="/fr/">Accueil</a> — projets et présentation de la pelote basque',
            '<a href="/fr/developers/">Développeurs</a> — API GraphQL et serveur MCP',
            '<a href="/llms.txt">llms.txt</a> et <a href="/sitemap-index.xml">plan du site</a> — toutes les pages du site',
          ],
        },
      ],
    },
  },
};
