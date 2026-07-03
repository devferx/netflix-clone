# Spec 02 — Because You Liked (Like button + personalized recommendations)

**State:** Implemented
**Date:** 2026-07-01
**Depends on:** none (extends existing `useUserMoviePreferences` store and `movie-card`/`MovieModal`/`MovieHero` components)

**Objective:** Wire the existing (currently inert) Like/Dislike buttons in `movie-card`, `MovieModal`, and `MovieHero` to persist liked/disliked movies per profile in `localStorage`, and add a "Because you liked `<title>`" recommendation section to the home page that shows up to 5 randomly-chosen liked movies (re-randomized on every page load), each with its own TMDB-recommendations slider fetched through a Server Action.

## Scope

### In scope

- Wire `onClick` handlers for the existing `Like`/`Dislike` icon buttons (currently rendered but non-functional) in:
  - `src/components/ui/movie-card.tsx`
  - `src/domains/home/components/movie-modal.tsx`
  - `src/components/ui/movie-hero.tsx` (shared by the home hero and `/movie/[id]`)
- Like button: toggles the movie in `likedMoviesByProfileId` via the existing `useUserMoviePreferences().updateLikedMovies`.
- Dislike button: removes the movie from liked (if present) and toggles it in `dislikedMoviesByProfileId` via `updateDislikedMovies`. This is one-directional for now — liking a movie does **not** clear an existing dislike.
- Visual "active" state for the Like icon (filled) when the current movie is liked, in all three locations above.
- New `getCurrentLikedMovies()` selector on `useUserMoviePreferences`.
- New `getMovieRecommendations(movieId)` in `src/services/movies.ts`, calling TMDB `/movie/{id}/recommendations`.
- New Server Action that, given a list of liked-movie IDs, fetches recommendations for each and returns only the ones with ≥1 result.
- New `BecauseYouLiked` client component (`src/domains/home/components`) that:
  - Reads the current profile's liked movies from `localStorage`.
  - Renders nothing if there are zero liked movies.
  - Renders a skeleton while recommendations are loading, if there is ≥1 liked movie.
  - Picks up to 5 random liked movies (once per mount/page load) as row sources.
  - Renders one `MovieSlider` per source movie with ≥1 TMDB recommendation, titled "Because you liked `<title>`". Source movies with zero recommendations render no row.
- Mounting `BecauseYouLiked` in `src/app/page.tsx`, placed after the last existing slider, right before `<Footer />`.
- Refactoring `MovieHero`'s props from separate primitives (`movieId`, `title`, `overview`, `backdrop_path`) to a single `movie: Movie` prop, since it now needs the full object to read/write like state, and it's shared between the home hero and `/movie/[id]`. Both call sites (`src/app/page.tsx`, `src/app/movie/[id]/page.tsx`) are updated accordingly — the detail page maps its `MovieDetails` response to a `Movie`-shaped object (`genres` → `genre_ids`).

### Out of scope

- Liking a movie clearing an existing dislike (reverse direction) — explicitly deferred.
- Any server-side/account-level persistence of likes — still `localStorage` only, no backend involved.
- Switching between TMDB `/recommendations` and `/similar`, or making the endpoint configurable.
- Pagination of recommendations — only TMDB page 1 is used, matching existing `MovieSlider` usage elsewhere in the app.
- Filtering recommendations by disliked movies.
- Changes to the existing "My List" (`Plus`/`Check`) behavior.
- "Because you liked" rows on any other route (`/my-list`, `/search`, `/watch/[id]`) — home page only.

## Data model

### Store change — `src/store/movies/user-movie-preferences.ts`

Add a selector that mirrors `getCurrentUserMovies` from `user-movies-store.ts`:

```ts
getCurrentLikedMovies: () => Movie[]
```

Implementation reads `likedMoviesByProfileId[currentProfileId]` and returns `Object.values(...)`, returning `[]` if there's no active profile. No changes to the persisted shape (`likedMoviesByProfileId` / `dislikedMoviesByProfileId`, localStorage key `user-categories`).

### New service function — `src/services/movies.ts`

```ts
export const getMovieRecommendations = async (
  movieId: string | number,
): Promise<Movie[]> => {
  const { data } = await movieApi.get<GetMovieList>(
    `/movie/${movieId}/recommendations`,
  )
  return data.results
}
```

Reuses the existing `GetMovieList` interface (same shape as `/discover/movie`).

### New Server Action — `src/domains/home/actions/get-movies-recommendations.ts`

```ts
'use server'

export async function getMoviesRecommendations(
  movieIds: number[],
): Promise<Record<number, Movie[]>>
```

Calls `getMovieRecommendations` for each id in parallel, then returns only the entries whose `Movie[]` is non-empty (empty-result ids are dropped here, so `BecauseYouLiked` never has to special-case them).

### New utility — `src/utils/get-random-items.ts`

```ts
export function getRandomItems<T>(items: T[], count: number): T[]
```

Fisher–Yates shuffle + `slice(0, count)`. Used to pick up to 5 random liked movies client-side on each mount.

### `MovieHero` prop shape change — `src/components/ui/movie-hero.tsx`

```ts
interface Props {
  movie: Movie
  movieLogo?: string | null
  paddingBottom?: boolean
}
```

Replaces the current `movieId` / `title` / `overview` / `backdrop_path` primitives (all of which are fields already on `Movie`).

## Implementation plan

1. **Add `getMovieRecommendations`** to `src/services/movies.ts` (TMDB `/movie/{id}/recommendations`, reusing `GetMovieList`). System still builds/runs unchanged.

2. **Add `getCurrentLikedMovies`** selector to `src/store/movies/user-movie-preferences.ts`. No consumers yet; store still behaves as before.

3. **Add `getRandomItems` utility** to `src/utils/get-random-items.ts` and export it from `src/utils/index.ts`. Unused until step 8.

4. **Wire Like/Dislike in `movie-card.tsx`**: add `onClick` handlers using `updateLikedMovies` / `updateDislikedMovies` (+ `isMovieLiked` read via `useStore`), and toggle the `Like` icon's filled/active style. Card is independently testable at this point.

5. **Wire Like/Dislike in `movie-modal.tsx`**: same pattern, using `currentMovie` from `useMovieModalStore` (already typed as `Movie`).

6. **Refactor `MovieHero`** to accept `movie: Movie` instead of the four primitives, add Like/Dislike buttons + active state inside it, and update both call sites:

   - `src/app/page.tsx`: pass `movie={firstPopularMovie}` directly.
   - `src/app/movie/[id]/page.tsx`: map `movieDetails` (`MovieDetails`) to a `Movie`-shaped object (`genre_ids: movieDetails.genres.map(g => g.id)`) before passing it in.
     App still builds and both hero usages render correctly with working Like/Dislike.

7. **Add the Server Action** `src/domains/home/actions/get-movies-recommendations.ts` (`getMoviesRecommendations`). Not yet called from anywhere — verified via type-check only.

8. **Add `BecauseYouLiked` component** in `src/domains/home/components/because-you-liked.tsx`:

   - Reads liked movies via `useStore(useUserMoviePreferences, (s) => s.getCurrentLikedMovies())`.
   - Returns `null` if the liked list is empty (or not yet hydrated).
   - On mount, once hydrated liked movies are available and non-empty: pick up to 5 random movies via `getRandomItems`, show skeleton, call `getMoviesRecommendations(ids)`, then render one `MovieSlider` per returned entry titled `Because you liked ${movie.title}`.
   - Export it from `src/domains/home/components/index.ts`.

9. **Mount `<BecauseYouLiked />`** in `src/app/page.tsx`, after the last `MovieSlider`/`TopRatedMovies` row and before `<Footer />`. Feature complete and visible end-to-end.

## Acceptance criteria

- [ ] Clicking Like on a movie (card, modal, or hero) adds it to `likedMoviesByProfileId[currentProfileId]` in `localStorage` (key `user-categories`).
- [ ] Clicking Like again on the same movie removes it (toggle behavior).
- [ ] The Like icon renders in a visually filled/active state whenever the movie is currently liked, consistently in `movie-card`, `MovieModal`, and `MovieHero`.
- [ ] Clicking Dislike on a liked movie removes it from `likedMoviesByProfileId` and adds it to `dislikedMoviesByProfileId`.
- [ ] Clicking Dislike again on the same movie toggles the dislike off.
- [ ] Liking a movie does not clear an existing dislike on it (one-directional, per spec).
- [ ] With zero liked movies for the active profile, no "Because you liked" section renders on the home page.
- [ ] With ≥1 liked movies, a skeleton placeholder renders on initial home page load, replaced by real content once the Server Action resolves.
- [ ] Up to 5 randomly chosen liked movies are used as row sources; each source movie with ≥1 TMDB recommendation renders its own row titled "Because you liked `<title>`".
- [ ] A source movie with zero TMDB recommendations renders no row (not even empty/placeholder).
- [ ] With more than 5 liked movies, reloading the home page can surface a different random subset of source movies across reloads.
- [ ] Recommendations are fetched exclusively through the Server Action (`getMoviesRecommendations`) — no TMDB key or `movieApi` call is reachable from client bundle code.
- [ ] `/movie/[id]` detail page and home hero both render correctly with working Like/Dislike after the `MovieHero` prop refactor.
- [ ] `bun run lint` and `bun run ts:check` both pass with no new errors.

## Decisions taken and discarded

- **TMDB `/movie/{id}/recommendations` over `/similar`** — chosen per explicit user preference; matches the "Because you liked" framing better than generic similarity.
- **Server Action over a Route Handler** — chosen per explicit user preference to fetch recommendations for client-known liked-movie IDs while keeping the TMDB key server-only (per `CLAUDE.md`, TMDB calls stay server-side).
- **One slider per liked source movie (max 5), not one aggregated slider** — chosen per explicit user preference (Option A); matches real Netflix's multiple "Because you watched X" rows instead of a single row with a mixed bag of recommendations under one arbitrary title.
- **Dislike only removes Like for now; Like does not reciprocally clear Dislike** — explicitly scoped down by the user ("by the moment"); full mutual exclusivity deferred to a future spec.
- **`MovieHero` refactored to a single `movie: Movie` prop** instead of four separate primitives — the component is shared between the home hero and the detail-page hero, and both now need the full object to drive Like/Dislike state; passing four+ primitives plus a movie object would duplicate data unnecessarily.
- **Random subset of liked movies is recomputed once per client mount** (i.e., once per full page load), not reactively on every store update — satisfies "every refresh shows random ones" while preventing rows from reshuffling under the user while they're liking/unliking movies within the same session.
- **Rows with zero recommendations are skipped entirely** rather than rendering an empty/placeholder row — keeps the section visually clean, consistent with how Netflix hides empty rows.
- **Recommendations are capped to TMDB's page 1 (~20 results)**, not paginated — consistent with how `MovieSlider` is already used for every other row in the app (`Popular movies`, `Watch with family`, etc.).

## Identified risks

- **Extra TMDB calls per home page visit**: fetching recommendations for up to 5 movies adds up to 5 extra API calls per visitor session (via the Server Action). Acceptable at current scale; revisit if TMDB rate limits become an issue.
- **`MovieHero` prop refactor touches two call sites**: `src/app/page.tsx` and `src/app/movie/[id]/page.tsx`. The `MovieDetails` → `Movie` mapping (`genres` → `genre_ids`) must stay correct, or the detail-page hero's Like/Dislike state and card genre display could regress. Mitigated by running `bun run ts:check` after the refactor.
- **Hydration mismatch risk in `BecauseYouLiked`**: liked movies only exist in `localStorage`, unavailable during SSR. Must use the existing `useStore` wrapper (not the raw store hook) to avoid a server/client render mismatch, consistent with the pattern already established in `movie-card.tsx`.
