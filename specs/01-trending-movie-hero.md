# 01 — Trending movie hero

**State:** Approved
**Dependencies:** None (uses the same already-configured TMDB service)
**Date:** 2026-07-01
**Objective:** Replace the movie used for the home hero (currently the first result of `getPopularMovies()`) with a randomly selected result of `GET /trending/movie/day`, re-picked on every page load, including its logo.

## Scope

**In scope:**

- New service function `getTrendingMovies()` in `src/services/movies.ts` that calls `GET /trending/movie/day` and returns `Movie[]` (reusing the existing `GetMovieList` interface — the trending response has the same `{ page, results, total_pages, total_results }` shape, with extra fields like `media_type` on each result that we simply don't read).
- `src/app/page.tsx`: fetch trending movies, randomly select one result as the hero movie (re-selected on every request), fetch `getMovieImages(heroMovie.id)` for its `movieLogo`, and pass `movieId` / `title` / `overview` / `backdrop_path` / `movieLogo` to `MovieHero` (same pattern already used in `src/app/movie/[id]/page.tsx`). The random pick happens server-side, on each request — `page.tsx` already renders dynamically per request because it reads the `profile` cookie via `cookies()`, so no additional `dynamic`/`revalidate` config is needed for the hero to vary on refresh.
- `getPopularMovies()` keeps feeding the "Popular movies" slider — it's no longer used to pick the hero.
- A fade-in effect on the home hero when it loads (Netflix-style), scoped to the home page only. `MovieHero` (`src/components/ui/movie-hero.tsx`) gains an optional `fadeIn?: boolean` prop (default `false`) that applies a CSS opacity animation (`animate-hero-fade-in`, defined in `src/app/globals.css` via Tailwind v4's `@theme`/`@keyframes`) to the whole `<header>` (image + text together). Only `src/app/page.tsx` passes `fadeIn`; the movie detail page's `<MovieHero>` (`src/app/movie/[id]/page.tsx`) is unaffected.

**Not in scope:**

- Any change to `getPopularMovies()` usage elsewhere (e.g. `generateStaticParams` in `movie/[id]/page.tsx`).
- Client-side randomization (e.g. re-rolling the hero without a full page refresh) — the random pick is made server-side on each request/refresh only.
- Using trending data to feed any slider.
- Fallback/error handling if the trending endpoint returns an empty list — follows the existing codebase convention of trusting TMDB to return data.
- A dedicated TypeScript interface for the trending response — reuses `GetMovieList`/`Movie`.

## Data model

No new data structures are introduced — the trending endpoint's response is consumed through the existing `GetMovieList` / `Movie` types.

## Implementation plan

1. Add `getTrendingMovies` to `src/services/movies.ts`:
   ```ts
   export const getTrendingMovies = async (): Promise<Movie[]> => {
     const { data } = await movieApi.get<GetMovieList>('/trending/movie/day')
     return data.results
   }
   ```
2. Export it from `src/services/index.ts` (or wherever the barrel re-exports `movies.ts`, matching the existing pattern for `getPopularMovies`, etc.).
3. In `src/app/page.tsx`:
   - Add `getTrendingMovies` and `getMovieImages` to the imports from `@/services`.
   - Fetch `trendingMovies` alongside the existing `Promise.all` (`popularMovies`, `topRatedMovies`, `popularFamilyMovies`, `horrorMovies`).
   - Randomly pick one entry via a `getRandomItem<T>(items: T[]): T` helper in `src/utils/get-random-item.ts` (exported from `src/utils/index.ts`): `const heroMovie = getRandomItem(trendingMovies)`. The helper exists because ESLint's `react-hooks/purity` rule (`eslint-plugin-react-hooks`) forbids calling `Math.random()` directly inside a component's render body — wrapping it in a separate, non-component module satisfies the rule while keeping the pick server-side.
   - Fetch `const { movieLogo } = await getMovieImages(heroMovie.id)` after the trending fetch resolves.
   - Replace `firstPopularMovie` references in the `<MovieHero />` JSX with `heroMovie`, and pass the new `movieLogo` prop.
4. Add the fade-in effect:
   - In `src/app/globals.css`, add `--animate-hero-fade-in: hero-fade-in 1s ease-in-out;` to the `@theme` block and a matching `@keyframes hero-fade-in { from { opacity: 0 } to { opacity: 1 } }` block.
   - In `src/components/ui/movie-hero.tsx`, add a `fadeIn?: boolean` prop (default `false`) and apply `fadeIn && 'animate-hero-fade-in'` via `clsx` on the `<header>` element.
   - In `src/app/page.tsx`, pass `fadeIn` to `<MovieHero />`. Do not pass it from `src/app/movie/[id]/page.tsx`.
5. Run `bun run ts:check` and `bun run lint` to confirm no type/lint regressions.
6. Manually verify in the browser: refreshing `/` repeatedly shows different trending movies as the hero (with logo if available), the hero fades in on load, "Popular movies" slider is unaffected, and the movie detail page's hero does not fade in.

## Acceptance criteria

- [ ] `getTrendingMovies()` exists in `src/services/movies.ts`, calls `GET /trending/movie/day`, and returns `Movie[]`.
- [ ] `getTrendingMovies` is exported from the services barrel and importable via `@/services`.
- [ ] `src/app/page.tsx` no longer derives the hero movie from `getPopularMovies()`; it uses a randomly selected result of `getTrendingMovies()` instead.
- [ ] Refreshing `/` re-picks the hero movie server-side on each request (no client-side re-roll).
- [ ] `MovieHero` on the home page receives `movieLogo` sourced from `getMovieImages(heroMovie.id)`.
- [ ] The "Popular movies" slider still renders using `getPopularMovies()`, unchanged.
- [ ] `MovieHero` supports an optional `fadeIn` prop that applies a CSS opacity fade-in animation; only the home page passes it, the movie detail page's hero is unaffected.
- [ ] `bun run ts:check` passes with no new errors.
- [ ] `bun run lint` passes with no new errors.
- [ ] Manually refreshing `/` several times shows different trending-movie backdrops/titles/overviews (and logo, when TMDB has one for that movie), the hero visibly fades in on each load, and the rest of the sliders render as before.

## Decisions taken and discarded

- **Reuse `GetMovieList`/`Movie` types instead of a new trending-specific interface** — the trending response shape matches `GetMovieList` closely enough for our needs (we only read `results`); a new interface would just duplicate it for no gain.
- **Hero = random trending result, re-picked per request (not always the first)** — supersedes the original "always the first" decision; the user wants variety across visits/refreshes. The pick is made server-side, on each request, since `page.tsx` is already rendered dynamically per request (it reads the `profile` cookie via `cookies()`), so no extra `dynamic`/`revalidate` config or client-side re-roll logic is needed.
- **No fallback if trending is empty** — discarded a "fallback to popular movies" safety net to stay consistent with the rest of the codebase, which doesn't guard against empty TMDB responses anywhere else.
- **`getPopularMovies()` stays as the source for the "Popular movies" slider** — discarded the option of unifying it with trending data, since the request was specifically about the hero banner, not the slider content.
- **Add `movieLogo` to the hero** — discarded leaving it out, since `MovieHero` already supports it and the pattern (`getMovieImages` → `movieLogo`) is already established on the movie detail page; wiring it up now avoids a visibly plain hero when a logo is available.
