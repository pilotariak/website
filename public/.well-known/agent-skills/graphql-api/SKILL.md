# graphql-api

Use this skill to query the Frontis GraphQL federation gateway for Basque pelota data.

## Endpoint

- Gateway: https://pilotariak.com/frontis
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

| Query | Arguments | Returns |
|---|---|---|
| `clubs` | — | `[Club!]!` |
| `club(id)` | `id: ID!` | `Club` |
| `competitions(year)` | `year: Int` | `[Competition!]!` |
| `competition(id)` | `id: ID!` | `Competition` |
| `categories` | — | `[Category!]!` |
| `category(id)` | `id: ID!` | `Category` |
| `specialties` | — | `[Specialty!]!` |
| `specialty(id)` | `id: ID!` | `Specialty` |
| `results(...)` | `competitionId`, `specialtyId`, `categoryId`, `phase` (all optional) | `[Result!]!` |
| `result(id)` | `id: ID!` | `Result` |
| `version` | — | `String!` |

## Example — List clubs (LCAPB league)

```bash
curl -s -X POST https://pilotariak.com/frontis \
  -H "Content-Type: application/json" \
  -H "X-Pilotariak-League: lcapb" \
  -d '{"query": "{ clubs { id name } }"}'
```

## Example — Finals with rosters (cross-subgraph)

```bash
curl -s -X POST https://pilotariak.com/frontis \
  -H "Content-Type: application/json" \
  -H "X-Pilotariak-League: lcapb" \
  -d '{
    "query": "query { results(competitionId: \"1\", phase: \"Finale\") { scores clubA { name } clubB { name } clubALineup { player1 { name } } clubBLineup { player1 { name } } } }"
  }'
```

## Source

- https://pilotariak.com/frontis
- https://github.com/Pilotariak/frontis
