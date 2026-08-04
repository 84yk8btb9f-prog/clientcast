# Security Policy

## Supported Versions

clientcast is pre-1.0 and released as a single rolling line. Only the latest
version on npm receives security fixes.

| Version | Supported |
|---|---|
| latest (0.x) | Yes |
| older 0.x | No |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Email **niksapa150@gmail.com** with:

- A description of the vulnerability and its impact
- Steps to reproduce (or a proof of concept)
- Affected version(s)

Expect an acknowledgment within a few days. If confirmed, a fix will be
released and the report credited (unless you'd prefer to stay anonymous).

## Scope notes

- Update payloads sent via `clientcast send` go to a **publicly readable**
  Vercel Blob URL by design — this is documented behavior, not a
  vulnerability. See the Privacy section of the README.
- Report exposure of the underlying blob store, auth bypass on the hosted
  viewer, injection in the CLI/MCP tools, or leakage of API keys/secrets.
