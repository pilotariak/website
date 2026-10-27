# Pilotariak — agent authentication

How an AI agent obtains credentials for Pilotariak services. Most of Pilotariak needs **no
credentials at all**; only the Azkena MCP server is protected.

| Surface                               | URL                                              | Auth                   |
| ------------------------------------- | ------------------------------------------------ | ---------------------- |
| Website, `llms.txt`, `/.well-known/*` | `https://pilotariak.com`                         | none                   |
| Frontis GraphQL API (read-only)       | `https://frontis-gateway.pilotariak.com/graphql` | none                   |
| Azkena MCP server (read-only tools)   | `https://mcp.pilotariak.com/mcp`                 | OAuth 2.1 bearer token |

If you only need data, call the GraphQL API directly with an `X-Pilotariak-League` header
(`lcapb`, `lidfpb` or `ctpb`) and skip the rest of this document. See
<https://pilotariak.com/developers/>.

## Discover

Call the MCP endpoint without a token. It answers `401` with a `WWW-Authenticate` challenge
that names the protected-resource metadata (RFC 9728):

```http
POST /mcp HTTP/1.1
Host: mcp.pilotariak.com

HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="OAuth", error="invalid_token",
  resource_metadata="https://mcp.pilotariak.com/.well-known/oauth-protected-resource/mcp"
```

- Protected resource metadata: <https://mcp.pilotariak.com/.well-known/oauth-protected-resource/mcp>
  → `resource: https://mcp.pilotariak.com/mcp`, `authorization_servers: ["https://mcp.pilotariak.com"]`
- Authorization server metadata (RFC 8414): <https://mcp.pilotariak.com/.well-known/oauth-authorization-server>

The authorization server metadata does not publish an `agent_auth` block: there is no
`identity_endpoint`, and no `anonymous`, `identity_assertion` (ID-JAG,
`urn:ietf:params:oauth:token-type:id-jag`) or `service_auth` identity types. Use the standard
OAuth flow below.

## Pick a method

| Method                              | When to use                                           |
| ----------------------------------- | ----------------------------------------------------- |
| OAuth 2.1 authorization code + PKCE | Default for MCP clients (Claude, Cursor, Codex, …)    |
| Pre-shared bearer token             | Self-hosted Azkena deployments only (`MCP_API_TOKEN`) |

Supported values from the metadata: `response_types_supported: ["code"]`,
`grant_types_supported: ["authorization_code", "refresh_token"]`,
`code_challenge_methods_supported: ["S256", "plain"]` (always use `S256`),
`token_endpoint_auth_methods_supported: ["none", "client_secret_basic", "client_secret_post"]`.

## Register

Register your client dynamically (RFC 7591) at the `registration_endpoint`:

```http
POST https://mcp.pilotariak.com/register
Content-Type: application/json

{
  "client_name": "My Agent",
  "redirect_uris": ["http://127.0.0.1:33418/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none"
}
```

The response contains your `client_id` (and a `client_secret` if you asked for a confidential
client). Public clients should use `token_endpoint_auth_method: "none"` together with PKCE.

## Claim

Access is granted by a person, not claimed automatically. Send the user to the
`authorization_endpoint` with a PKCE challenge:

```
https://mcp.pilotariak.com/authorize?response_type=code
  &client_id=<client_id>
  &redirect_uri=http://127.0.0.1:33418/callback
  &code_challenge=<BASE64URL(SHA256(code_verifier))>
  &code_challenge_method=S256
  &resource=https://mcp.pilotariak.com/mcp
  &state=<random>
```

After the user approves on the consent screen, the server redirects to your `redirect_uri`
with `code` and `state` (`response_mode=query`). Check that `state` matches.

## Exchange

Exchange the code at the `token_endpoint`:

```http
POST https://mcp.pilotariak.com/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=<code>&redirect_uri=http://127.0.0.1:33418/callback
&client_id=<client_id>&code_verifier=<code_verifier>
```

The response carries `access_token`, `token_type: "Bearer"`, `expires_in` and a
`refresh_token`. Refresh with `grant_type=refresh_token&refresh_token=<token>&client_id=<client_id>`.

## Use the access_token

Send the token on every MCP request:

```http
POST https://mcp.pilotariak.com/mcp
Authorization: Bearer <access_token>
Content-Type: application/json
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2026-07-28
```

Azkena implements the stateless MCP `2026-07-28` core: there is no `initialize` handshake,
and `server/discover` returns capabilities. Tools: `list_competitions`, `list_clubs`,
`list_categories`, `list_specialties`, `list_results` — all read-only, all take a `league`
argument. Rate limit: 60 requests per minute per client IP.

## Errors

| Status | Body / header                                              | What to do                                                |
| ------ | ---------------------------------------------------------- | --------------------------------------------------------- |
| `401`  | `{"error":"invalid_token"}` + `WWW-Authenticate: Bearer …` | Token missing or expired — refresh or re-run the flow     |
| `400`  | `{"error":"invalid_grant"}` / `invalid_request`            | Bad code, verifier or redirect URI — restart at **Claim** |
| `401`  | `{"error":"invalid_client"}`                               | Unknown `client_id` — register again                      |
| `429`  | rate limited                                               | Back off and retry later                                  |

## Revocation

Revoke a token at the advertised `revocation_endpoint` (RFC 7009):

```http
POST https://mcp.pilotariak.com/token
Content-Type: application/x-www-form-urlencoded

token=<access_or_refresh_token>&client_id=<client_id>
```

Stored data and your rights are described in the privacy policy:
<https://pilotariak.com/privacy/>. Security issues: <https://pilotariak.com/.well-known/security.txt>.
