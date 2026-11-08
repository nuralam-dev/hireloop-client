<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- Dev: `npm run dev` — Build: `npm run build` — Lint: `npm run lint`
- Typecheck (no script exists): `npx tsc --noEmit`
- No tests are configured. No CI.

## Stack gotchas

- Next 16 App Router with experimental `cacheComponents`, `partialPrefetching`, and `reactCompiler` enabled in `next.config.ts`. React Compiler handles memoization — do not add manual `useMemo`/`useCallback`/`memo`.
- Tailwind v4 CSS-first: theme tokens live in `src/app/globals.css`; there is no `tailwind.config`. Color/font aliases load Geist via `next/font` in `src/app/layout.tsx`.
- shadcn uses the `base-nova` style built on `@base-ui/react` primitives (NOT Radix). Components in `src/components/ui` were generated into the repo — add new ones with `npx shadcn add`, don't hand-copy Radix-based shadcn code from the web.
- Path alias `@/*` → `./src/*`.

## Auth

- better-auth + MongoDB adapter. Handler is mounted at `src/app/api/auth/[...all]/route.ts` via `toNextJsHandler`.
- `src/lib/auth.ts` hardcodes the connection string `mongodb://localhost:27017/database` — it does NOT read a `MONGODB_URI` env var. Changing the DB means editing that file.
- Auth requires a local `mongod` running; `.env` only holds `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`.

## State of the code

Early scaffold: `src/app/page.tsx` is still the unmodified create-next-app starter; the only real features wired up are the UI kit and auth. Don't assume app routes/features exist.
