# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A Netflix UI clone built with Next.js 16 (App Router), React 19, and TypeScript. Movie data comes from The Movie Database (TMDB) API. There is no backend/database — all persistent state (selected profile, saved movies) lives in the browser via `zustand` + `localStorage`, with a `profile` cookie used for server-side route gating.

## Commands

This project uses `bun` (see `bun.lock`), but the npm-style scripts work with any package manager.

- `bun install` — install dependencies
- `bun run dev` — start dev server (Next.js with Turbopack) at http://localhost:3000
- `bun run build` — production build
- `bun run start` — run the production build
- `bun run lint` — ESLint (`next/core-web-vitals`, `next/typescript`, prettier config)
- `bun run ts:check` — TypeScript type-check with no emit (`tsc --noEmit`)
- `bun run format` — format the codebase with Prettier (`prettier-plugin-tailwindcss` sorts Tailwind classes)

There is no test runner configured in this repo.

### Environment

Requires a `.env` with `THE_MOVIE_DB_API_KEY` (a TMDB v4 read access token) — see `.env.example`. Used server-side only in `src/services/movie-api.ts`.

## Architecture

### Routing / data fetching (`src/app`)

App Router pages are async Server Components that fetch data directly from `src/services` at request time (no client-side data fetching/SWR/React Query). Key routes:

- `/` — home feed (`src/app/page.tsx`): reads the `profile` cookie server-side and `redirect()`s to `/select-profile` if absent, then fetches several movie lists in parallel.
- `/select-profile` — profile picker, sets the `profile` cookie via `cookies-next` and the client profile store.
- `/movie/[id]` — movie detail page.
- `/watch/[id]` — plays a trailer; force-dynamic (`export const dynamic = 'force-dynamic'`, `revalidate = 0`) since it picks the first `Trailer`-type video from the TMDB videos response.
- `/my-list` — profile's saved movies (client-persisted, not server data).
- `/search` — search page.

Profile gating is intentionally cookie-based (checked in Server Components) while the _content_ of the selected profile lives in client-side zustand state — the two are kept in sync manually wherever a profile is selected (see `setCookie` calls in `profile-card.tsx` and `navbar.tsx`).

### Feature organization: `components` vs `domains`

- `src/components/ui` — generic, reusable, feature-agnostic UI (navbar, footer, movie-card, buttons, icons).
- `src/domains/<feature>/components` — components specific to one feature/route, e.g. `domains/home`, `domains/movie`, `domains/watch`, `domains/my-list`, `domains/select-profile`. Each domain has its own `index.ts` barrel export.

When adding a new component, check whether it's reusable across features (`components/ui`) or belongs to a single page/feature (`domains/<feature>/components`).

### Data layer

- `src/services/movie-api.ts` — a single configured `axios` instance (base URL + TMDB bearer auth) — all TMDB calls go through this instance.
- `src/services/movies.ts` — one exported async function per TMDB endpoint used by the app (e.g. `getPopularMovies`, `getTopRatedMovies`, `getMovieDetails`, `getMovieCast`, `getMovieImages`, `getMovieVideos`, `getMovieBySearch`). Add new TMDB calls here rather than calling `movieApi` directly from components/pages.
- `src/interfaces` — raw TMDB API response shapes (`GetMovieList`, `GetMovieCredits`, etc.).
- `src/models` — the app's own domain types (`Movie`, `MovieDetails`, `Cast`, `Video`, `Profile`), which functions in `services/movies.ts` map API responses onto.

### State (`src/store`, zustand)

All stores use `zustand`'s `persist` middleware (localStorage) and are re-exported from `src/store/index.ts`.

- `profile-store.ts` — selected profile; exposes `getCurrentProfileId()` as a plain (non-hook) accessor used by other stores/services that need the active profile outside of React.
- `user-movies-store.ts` / `user-movie-preferences.ts` — per-profile saved movies, keyed by profile id (`userMoviesMap[profileId][movieId]`) so each profile has an independent list.
- `ui/movie-modal-store.ts` — controls the global movie detail modal shown over the home feed.
- `use-store.tsx` — a wrapper hook (`useStore`) around zustand selectors that defers reading state until after mount (returns `undefined` on first render). This exists to avoid SSR/client hydration mismatches for persisted state, since `persist` hydrates from `localStorage` only on the client. **Use this wrapper (not the store hook directly) when reading persisted store state in a component that renders during SSR.**

### Styling

Tailwind CSS v4 (config via `@tailwindcss/postcss` in `postcss.config.js`, no `tailwind.config.js`). Prettier auto-sorts class names via `prettier-plugin-tailwindcss` — run `bun run format` after editing class lists rather than hand-ordering them.

### Path aliases

`@/*` maps to `src/*` (see `tsconfig.json`). Use `@/...` imports instead of relative paths across top-level folders (`@/services`, `@/store`, `@/models`, `@/components/ui`, `@/domains/...`, etc.).
