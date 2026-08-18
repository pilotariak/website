---
name: mcp-server
description: Access Basque pelota data (competitions, results, players, frontons) through the Azkena Model Context Protocol server at https://pilotariak.com/azkena. No authentication required.
license: Apache-2.0
---
# mcp-server

Use this skill to access Basque pelota data through the Azkena Model Context Protocol (MCP) server.

## Endpoint
- MCP Server: https://pilotariak.com/azkena
- Server card: https://pilotariak.com/.well-known/mcp.json

## Capabilities
- **tools:** true
- **resources:** true
- **prompts:** false

## Available Data
- Competitions
- Results and standings
- Player profiles
- Disciplines

## Connection
Connect your AI agent to `https://pilotariak.com/azkena` using the Model Context Protocol (MCP). No authentication required. Read-only access.

## Source
- https://pilotariak.com/.well-known/mcp.json
- https://github.com/Pilotariak/azkena
