# VERSE

Luxury fashion storefront built with Next.js (App Router) and Tailwind CSS.

## Project Structure

- `frontend/` — Next.js app (UI, pages, components, assets)
- `backend/` — reserved for an API/service layer (currently empty)

## Prerequisites

- Node.js + npm (or yarn/pnpm/bun)

## Getting Started (Frontend)

From the repo root:

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000

## Common Scripts (Frontend)

Run these inside `frontend/`:

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production server (after build)
- `npm run lint` — run ESLint

## Key Folders (Frontend)

- `frontend/app/` — routes and layouts (e.g. `app/page.tsx`, `app/about/page.tsx`)
- `frontend/components/` — UI components grouped by page/section
- `frontend/public/images/` — static images used across the site

## Deployment

The frontend can be deployed to Vercel (or any platform that supports Next.js). Build with `npm run build` and run with `npm run start`.

## Backend

`backend/` is intentionally left as a placeholder for future API/services.
