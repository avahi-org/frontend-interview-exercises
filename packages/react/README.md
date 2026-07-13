# Frontend Interview Exercises

Two self-contained exercises built on the Avahi SPA template. Run `pnpm dev` and open the home
page (`/`) to pick one.

| # | Route | What it is | Your task |
|---|-------|-----------|-----------|
| 1 | `/cart-debug` | A finished shopping cart with reported defects | **Debug it.** Reproduce, triage, and fix the issues so behavior matches the spec. |
| 2 | `/board` | A working Kanban board missing one feature | **Build it.** Implement drag-and-drop for cards (any approach). |

Each exercise has a spec under `.avahi/specs/` — **read it first**:
- `001-cart-storefront/` — intended cart behavior (your triage reference)
- `002-project-board/` — the drag-and-drop requirement and where it plugs in

## Getting started

**Requires Node 20+.** No global installs or `sudo` needed — pick either option:

**Option A — use the pinned pnpm 9 via `npx` (recommended):**

```bash
npx pnpm@9 install
npx pnpm@9 dev        # http://localhost:5173
```

**Option B — use npm (simplest, if you'd rather not touch pnpm):**

```bash
npm install
npm run dev           # http://localhost:5173
```

> Avoid `corepack enable` — it writes symlinks into your global Node `bin`, which fails without
> `sudo` on system-wide Node installs. The two options above sidestep that entirely.

Other scripts (prefix with `npx pnpm@9` or `npm run`):

```bash
test        # Vitest, watch mode — green to start; you may add tests
test:run    # Vitest, single run (what CI runs)
type-check  # TypeScript strict — clean to start
build       # Production build
```

> **Note on `pnpm lint`:** the scaffold's ESLint preset (`@antfu/eslint-config@2.27`) is not
> compatible with the installed ESLint 9.39 (its `react-hooks` plugin calls a removed API), so
> `pnpm lint` does not currently run. Type-check and tests are the source of truth. Getting lint
> working again (upgrading the antfu config) is a fair optional discussion.

## How to submit

1. Create a branch off `main` (e.g. `solution/<your-name>`) — `main` is protected.
2. Do your work; keep commits reasonably scoped.
3. Open a **pull request** into `main` and fill out the template.
4. CI (type-check, tests, build) runs automatically and must be green.

---

## Stack

| Concern | Tool |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Shadcn |
| Server state | TanStack Query |
| Client state | Zustand |
| Routing | React Router v6 |
| Testing | Vitest + React Testing Library + MSW |
| Linting | @antfu/eslint-config (see note above) |

## Project structure

```
src/
├── app/                     # Router, root layout, Home page
├── features/                # Feature modules (co-located)
│   ├── cart-debug/          # Exercise 1 — shopping cart
│   │   ├── index.ts
│   │   ├── CartDebug.tsx
│   │   ├── CartPanel.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── useProducts.ts        # TanStack Query hook
│   │   ├── cart.store.ts         # Zustand store
│   │   ├── CartDebug.test.tsx
│   │   └── mocks/handlers.ts     # MSW handlers
│   └── board/               # Exercise 2 — Kanban board
│       ├── index.ts
│       ├── Board.tsx
│       ├── BoardColumn.tsx
│       ├── BoardCardItem.tsx
│       ├── board.store.ts        # moveCard() is the drag-and-drop seam
│       └── Board.test.tsx
├── shared/
│   ├── components/ui/       # Shadcn components
│   └── hooks/               # Shared hooks
├── lib/
│   ├── utils.ts             # cn() helper
│   └── query-client.ts      # TanStack Query client
└── test/
    ├── setup.ts             # Vitest global setup
    └── server.ts            # MSW server instance
```

## Feature co-location pattern

Each feature owns everything it needs:

```
features/<name>/
├── index.ts              # Public API — export only what pages need
├── <Name>.tsx            # Root component
├── use<Name>.ts          # Data fetching (TanStack Query)
├── <name>.store.ts       # Client state (Zustand) — skip if useState is enough
├── <Name>.test.tsx       # Tests
└── mocks/handlers.ts     # MSW API mocks
```

Cross-feature imports are forbidden. Shared code goes in `src/shared/`.

## Adding Shadcn components

```bash
npx shadcn@latest add <component>
```

Components install into `src/shared/components/ui/`. The `components.json` file maps the install
paths to the project structure.
