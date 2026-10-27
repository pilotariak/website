---
name: mcp-server
description: Query Basque pelota competitions, clubs, categories, specialties and match results through the Azkena MCP server at https://mcp.pilotariak.com/mcp (OAuth 2.1). Use when an AI assistant needs ongoing tool access to Basque pelota league data instead of hand-written GraphQL queries.
license: Apache-2.0
---

# mcp-server

Use this skill to access Basque pelota data through the Azkena Model Context Protocol (MCP) server.

## When to use

- The user wants their assistant (Claude, Cursor, Codex, …) to answer questions about Basque pelota clubs, competitions or results for the LCAPB, LIDFPB or CTPB leagues.
- You can hold an OAuth token for repeated calls. For a single scripted lookup without auth, use the [graphql-api skill](https://pilotariak.com/.well-known/agent-skills/graphql-api/SKILL.md) instead.

## Endpoint

- MCP server: https://mcp.pilotariak.com/mcp (Streamable HTTP, stateless MCP `2026-07-28` — no `initialize` handshake; use `server/discover`)
- Server card: https://pilotariak.com/.well-known/mcp/server-card.json

## Tools

| Tool                | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `list_competitions` | All competitions for a league                                        |
| `list_clubs`        | All clubs in a league                                                |
| `list_categories`   | Player categories (divisions/series)                                 |
| `list_specialties`  | Basque pelota disciplines (trinquet, chistera, …)                    |
| `list_results`      | Match results with filters (competition, specialty, category, phase) |

Every tool takes a `league` argument (`lcapb`, `lidfpb`, `ctpb`).

## Connection

```json
{
  "mcpServers": {
    "pilotariak": { "type": "http", "url": "https://mcp.pilotariak.com/mcp" }
  }
}
```

MCP clients that support OAuth discover the authorization server from the `401` challenge and run the flow automatically. Manual walkthrough: https://pilotariak.com/auth.md

## Constraints

- **Authentication:** OAuth 2.1 bearer token (dynamic client registration, PKCE S256, user consent)
- **Access:** read-only — no write/mutation tools exposed
- **Rate limits:** 60 requests per minute per client IP
- **Availability:** best-effort, no uptime SLA

## Documentation

- Developer portal: https://pilotariak.com/developers/
- Agent authentication: https://pilotariak.com/auth.md
- Source & issues: https://github.com/Pilotariak/azkena
- Underlying data API: [graphql-api skill](https://pilotariak.com/.well-known/agent-skills/graphql-api/SKILL.md)
