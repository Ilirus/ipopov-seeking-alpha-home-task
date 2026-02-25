# Seeking Alpha Metrics Panel

Frontend test task built with React, TypeScript, Vite, Tailwind CSS, and TanStack Query.

## Prerequisites

- Node.js 20+
- npm 10+

## Environment

1. Copy `.env.example` to `.env`
2. Set API URL if needed:

```dotenv
VITE_API_BASE_URL=https://seekingalpha.free.beeceptor.com
```

If `.env` is missing, the app uses the default Beeceptor URL.

## Install and run

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — type-check and build production bundle
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run test` — run Vitest
- `npm run test -- --run` — run tests once in CI mode

## Project highlights

- Metrics cards for Rating Summary, Factor Grade, and Quant Ranking
- Conditional content for premium vs non-premium users
- Shared card/skeleton/loader components
- React Query hooks for API data fetching and caching
