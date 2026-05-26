# Portfolio Microservices Monorepo

A Turborepo monorepo with three Next.js 15 apps and a shared types package.

| App | Port | Role |
|-----|------|------|
| `apps/web` | 3000 | Frontend shell (fetches via rewrites) |
| `apps/projects` | 3001 | Projects JSON API + MDX content |
| `apps/blog` | 3002 | Blog JSON API + MDX content |

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) 9+

## Setup

```bash
pnpm install
pnpm build
pnpm dev
```

On Windows, use `pnpm dev` (not `turbo dev` directly). Turbo runs in **stream** mode to avoid TUI spawn errors in PowerShell.

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `apps/web/.env.example` to `apps/web/.env.local` (already provided for local dev):

```
PROJECTS_API_URL=http://localhost:3001
BLOG_API_URL=http://localhost:3002
```

## API endpoints

**Projects** (`:3001`)

- `GET /api/projects` — list projects
- `GET /api/projects/[slug]` — project detail with MDX body

**Blog** (`:3002`)

- `GET /api/blog` — list posts
- `GET /api/blog/[slug]` — post detail with MDX body

The web app proxies these at `/api/projects/*` and `/api/blog/*` via Next.js rewrites.

## Content

- Project MDX: `apps/projects/content/*.mdx`
- Blog MDX: `apps/blog/content/*.mdx`

## Shared types

`packages/types` exports DTOs consumed by all apps. Build it with:

```bash
pnpm --filter @portfolio/types build
```

Turbo runs this automatically before app builds.

## Deploy to Vercel

Use **three Vercel projects** (web, projects, blog) from the same repo. See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for step-by-step instructions.
