---
name: graphql-api
description: Query the public Frontis GraphQL API (https://frontis-gateway.pilotariak.com/graphql) for Basque pelota clubs, competitions, categories, specialties and match results. Use when you need Basque pelota league data in a script, app or one-off lookup without authentication.
license: Apache-2.0
---

# graphql-api

Use this skill to query the Frontis GraphQL federation gateway for Basque pelota data.

## When to use

- You need clubs, competitions, categories, specialties or results for the LCAPB, LIDFPB or CTPB leagues.
- You can make an HTTP POST yourself. No sign-up, API key or OAuth is needed.
- For persistent tool access from an AI assistant, prefer the [mcp-server skill](https://pilotariak.com/.well-known/agent-skills/mcp-server/SKILL.md).

## Endpoint

- Gateway: https://frontis-gateway.pilotariak.com/graphql (POST, JSON, no authentication, read-only)
- Docs: https://pilotariak.com/developers/
- GitHub: https://github.com/Pilotariak/frontis

## Required Headers

All requests must include:

- `Content-Type: application/json`
- `X-Pilotariak-League: <league>` — selects which league database to query

Supported league values:

- `lcapb` — Ligue Côte d'Argent de Pelote Basque
- `lidfpb` — Ligue Île-de-France de Pelote Basque
- `ctpb` — Comité Territorial de Pelote Basque

## Subgraphs

Frontis federates six subgraphs into a single schema:

1. **clubs** — Pelota clubs
2. **competitions** — Competition groupings by year
3. **categories** — Age and skill categories (Seniors, Juniors, Vétérans, …)
4. **specialties** — Basque pelota disciplines (Place Libre, Trinquet, Mur à Gauche, …)
5. **results** — Match results — cross-references all other subgraphs
6. **echo** — Liveness / version (no league header required)

## Available Queries

| Query                | Arguments                                                            | Returns           |
| -------------------- | -------------------------------------------------------------------- | ----------------- |
| `clubs`              | —                                                                    | `[Club!]!`        |
| `club(id)`           | `id: ID!`                                                            | `Club`            |
| `competitions(year)` | `year: Int`                                                          | `[Competition!]!` |
| `competition(id)`    | `id: ID!`                                                            | `Competition`     |
| `categories`         | —                                                                    | `[Category!]!`    |
| `category(id)`       | `id: ID!`                                                            | `Category`        |
| `specialties`        | —                                                                    | `[Specialty!]!`   |
| `specialty(id)`      | `id: ID!`                                                            | `Specialty`       |
| `results(...)`       | `competitionId`, `specialtyId`, `categoryId`, `phase` (all optional) | `[Result!]!`      |
| `result(id)`         | `id: ID!`                                                            | `Result`          |
| `version`            | —                                                                    | `String!`         |

## Example — List clubs (LCAPB league)

```bash
curl -s -X POST https://frontis-gateway.pilotariak.com/graphql \
  -H "Content-Type: application/json" \
  -H "X-Pilotariak-League: lcapb" \
  -d '{"query": "{ clubs { id name } }"}'
```

## Example — Finals with rosters (cross-subgraph)

```bash
curl -s -X POST https://frontis-gateway.pilotariak.com/graphql \
  -H "Content-Type: application/json" \
  -H "X-Pilotariak-League: lcapb" \
  -d '{
    "query": "query { results(competitionId: \"1\", phase: \"Finale\") { scores clubA { name } clubB { name } clubALineup { player1 { name } } clubBLineup { player1 { name } } } }"
  }'
```

## Errors

Errors follow the GraphQL spec: HTTP 200 with an `errors[]` array, each with `message` and `extensions.code` (for example `BAD_REQUEST` when `X-Pilotariak-League` is missing, `GRAPHQL_VALIDATION_FAILED` for an unknown field).

## Source

- https://pilotariak.com/frontis/
- https://github.com/Pilotariak/frontis
