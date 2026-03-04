# AGENTS.md — Sky3D Project

## Architecture

Monorepo with two independent deployables:

- **`frontend/`** — React 19 + TypeScript 5.9 SPA (Vite 7, Tailwind CSS 4). Deployed to [Statichost](https://statichost.eu) via `statichost.yml`. SPA fallback enabled for React Router.
- **`backend/`** — Strapi v5.33.1 headless CMS. Auto-deploys to Strapi Cloud (EU) on push to `main`. Provides REST API at `https://committed-acoustics-04578c1051.strapiapp.com`.

Data flow: Frontend fetches `/api/products?populate=*` and posts to `/api/orders`. No auth token needed — public role has `find`/`findOne` on Products and `create` on Orders.

## Development

```bash
cd frontend && npm run dev   # Port 5173 — only command needed (backend is on Strapi Cloud)
```

Frontend env: `VITE_API_URL` — set in Statichost dashboard for prod, falls back to `http://localhost:1337` locally. Baked into bundle at build time by Vite.

## Strapi v5 Gotchas (Critical)

- Use **`documentId`** (string) for URLs/relations, never numeric `id`.
- Product fields are **PascalCase**: `Title`, `Description`, `Price`, `Featured`, `Images` — except `inStock` (camelCase).
- `Description` is a rich-text blocks array, not a string. Parse with block-type switch (see `ProductDetailPage.tsx:getDescriptionHtml`).
- Images served via CDN on Strapi Cloud — URLs may already be absolute. `getImageUrl()` in `services/api.ts` handles both relative and absolute URLs.
- CORS origins configured in `backend/config/middlewares.ts` — add new frontend domains there.

## Code Conventions

- **Named exports** with arrow functions, no default exports for components.
- **Type imports**: `import type { Product } from '../types'`.
- Props interfaces: `ComponentNameProps`.
- Forms: React Hook Form + Zod schema (`ContactForm.tsx` is the reference implementation).
- All UI text is **Dutch** (hardcoded, no i18n library yet).
- Styling: Tailwind utility classes. Custom colors via `@theme` in `index.css`: `primary-*` (blue), `accent-*` (purple). Glass effect: `glass` class. Headings font: Poppins (`font-family-display`), body: Inter.

## Key Files

| Purpose | File |
|---|---|
| API client + `getImageUrl` helper | `frontend/src/services/api.ts` |
| TypeScript types (`Product`, `StrapiImage`, `StrapiResponse`) | `frontend/src/types/index.ts` |
| Tailwind theme (colors, fonts, patterns) | `frontend/src/index.css` |
| Routes | `frontend/src/App.tsx` |
| Custom order controller (multipart file upload) | `backend/src/api/order/controllers/order.ts` |
| CORS config | `backend/config/middlewares.ts` |
| Statichost build config | `statichost.yml` |

## Patterns

- **Product links** use `documentId`: `/producten/${product.documentId}`.
- **Image resolution**: prefer `formats.small.url` for thumbnails, `formats.large.url` for detail, fall back to `url`.
- **Out-of-stock**: show amber notice, keep ordering enabled (it becomes a request). Button text changes to "Product Aanvragen".
- **Mobile menu**: fixed overlay, slide-down animation, click-outside-to-close, no backdrop.
- **Loading states**: skeleton components in `Skeletons.tsx`, spinner in `LoadingSpinner.tsx`.
- **File uploads**: order form accepts `.stl`, `.3mf`, `.zip` (max 50 MB). Backend controller handles multipart with manual file upload via Strapi upload service.

## Git Workflow

- Push to `main` auto-deploys both frontend (Statichost) and backend (Strapi Cloud).
- When running git commands in terminal, always pipe through `| cat` to avoid opening a pager.

