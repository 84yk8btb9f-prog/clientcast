# Contributing to clientcast

Thanks for taking a look. clientcast is a CLI + MCP server (TypeScript, Node 20+) with a separate Next.js viewer app.

## Dev setup

```bash
git clone https://github.com/nikolas-sapa/clientcast
cd clientcast
npm install
npm run build      # tsc -> dist/
npm test           # vitest run
npm run test:watch # vitest, watch mode
```

Run the CLI against your own repo without building:

```bash
npm run dev -- send --dry-run
```

The viewer is a separate app under `viewer/` with its own `package.json`:

```bash
npm run viewer   # cd viewer && npm run dev
```

## Repo layout

- `src/cli.ts` — CLI entry point (commander)
- `src/commands/` — one file per CLI command (`init`, `send`, `status`, `list`, `export`, `config`, `preview`)
- `src/lib/` — core logic: git reading, Claude drafting/classification, scope-creep estimation, config, blob upload, email, notifications
- `src/mcp/` — MCP server (`server.ts`) and tool definitions (`tools.ts`) exposed as `clientcast-mcp`
- `tests/` — vitest unit tests
- `viewer/` — Next.js app for the hosted approval page, deployed separately to Vercel

## Before opening a PR

- `npm test` and `npm run build` both pass
- New behavior in `src/lib/` or `src/commands/` has a corresponding test in `tests/`
- No new required env vars without updating the README's Requirements section
- Keep changes scoped — one concern per PR, small diffs review faster

## Commit style

Short, imperative subject lines (`fix scope-creep estimate rounding`, not `Fixed a bug`). No strict convention enforced beyond that.

## Reporting bugs / requesting features

Use the GitHub issue templates. For security issues, see [SECURITY.md](SECURITY.md) instead of opening a public issue.
