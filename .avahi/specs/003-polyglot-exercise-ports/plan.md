# Plan: Polyglot Exercise Ports (Vue + Angular)

**Date:** 2026-07-13
**Branch:** dev

---

## Approach

Convert the repo into a pnpm workspace with one package per stack. Move the existing `src/` app
and its config verbatim into `packages/react/` (via `git mv`, preserving history) with zero
behavioral change. Scaffold `packages/vue/` (Vue 3 + Vite + Vitest + Testing Library) and
`packages/angular/` (Angular CLI, standalone components) from scratch, each reimplementing the
two exercises idiomatically against the shared spec contract that stays at the repo root. Root
tooling (`pnpm-workspace.yaml`, a thin root `package.json`) ties the three together for CI, while
every package stays independently runnable via `pnpm --filter <pkg> <script>`.

## Target repo layout

```
/
├── pnpm-workspace.yaml
├── package.json                       # root: workspace-wide scripts only (delegates via --filter)
├── .avahi/
│   ├── specs/                         # UNCHANGED — shared, framework-agnostic contracts
│   │   ├── 001-cart-storefront/
│   │   ├── 002-project-board/
│   │   └── 003-polyglot-exercise-ports/
│   └── answer-keys/                   # gitignored; now split per stack
│       ├── react/cart-debug.md
│       ├── vue/cart-debug.md
│       └── angular/cart-debug.md
├── packages/
│   ├── react/                         # current app, moved as-is
│   │   ├── package.json
│   │   ├── src/... (unchanged)
│   │   └── README.md
│   ├── vue/                           # new
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── app/                   # router + Home.vue picker
│   │   │   ├── features/cart-debug/
│   │   │   ├── features/board/
│   │   │   └── shared/
│   │   └── README.md
│   └── angular/                       # new
│       ├── package.json
│       ├── src/app/                   # routing + HomeComponent picker
│       │   ├── features/cart-debug/
│       │   └── features/board/
│       └── README.md
└── .github/workflows/
    ├── ci.yml                         # matrix over [react, vue, angular]
    └── package.yml                    # builds + publishes 3 zip assets
```

## Migration steps — `packages/react` (do this first, in isolation)

1. `git mv` `src/`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `tailwind.config.ts`,
   `postcss.config.js`, `components.json`, `public/`, `eslint.config.js` into `packages/react/`.
2. Update `packages/react/package.json` (`name`, relative paths); dependencies unchanged.
3. Add `pnpm-workspace.yaml` (`packages: - packages/*`) and slim the root `package.json` down to
   workspace-wide passthrough scripts.
4. Update `.github/workflows/ci.yml` and `package.yml` to operate on `packages/react` only —
   confirm everything is still green — **before** starting any Vue/Angular work. This isolates
   "did the move break anything" from "does the new stack work."

## Vue port

- Vite + Vue 3 + `@testing-library/vue` + Vitest (Vitest's Vue plugin is first-class, no
  parallel test runner needed) + MSW (framework-agnostic, reused as-is for mocking).
- Router: `vue-router`, same two routes (`/cart-debug`, `/board`) + `Home.vue` picker with the
  same two cards/copy as `Home.tsx`.
- State layer: **Pinia** (per spec.md decision) for cart/board client state — Vue's official,
  core-team-maintained store library and the current de facto standard taught in the official
  docs/tutorial.
- Both exercises re-implemented against `.avahi/specs/001-*` / `002-*` acceptance criteria, with
  their own intentionally-planted defects (cart-debug) and their own DnD integration seam (board)
  — chosen idiomatically for Vue, not copied verbatim from the React defect list.

## Angular port

- Angular CLI app, standalone components (Angular 17+ style, no NgModules) to keep ceremony
  comparable to the Vite-based packages.
- Router: Angular Router, same two routes + `HomeComponent` picker.
- State layer: a service + Angular signals for cart/board client state.
- Data fetching: **`httpResource`** (`@angular/common/http`) wrapping `HttpClient`, exposed via
  signals — first-party, no extra dependency, direct Angular equivalent of TanStack Query's role
  without porting a React-ecosystem library.
- Testing: **Vitest** — the Angular CLI's own default for new projects since Karma's deprecation,
  scaffolded via `ng new`/CLI testing builder rather than added as a third-party choice.

## CI changes (`ci.yml`)

- Matrix strategy over `packages/{react,vue,angular}`; each entry runs its own
  type-check/test/build (and lint, where wired) independently — one stack's failure must not
  block or mask another's status in the PR checks UI.

## Release changes (`package.yml`)

- **Gap found during Phase 1 (#6):** archiving only `HEAD:packages/<stack>` would silently drop
  `.avahi/specs/001-cart-storefront/` and `002-project-board/` — they intentionally stay at the
  repo root as the single shared, edited-once contract, but every package's README tells the
  candidate to read them first. A naive per-package archive breaks that.
- Fix: assemble each zip in two parts so it's genuinely self-contained on extraction, while specs
  are still authored exactly once at the root:
  ```bash
  # 1. the package itself, at the zip's top level
  mkdir -p build/<name> && git archive HEAD:packages/<stack> | tar -x -C build/<name>
  # 2. the shared specs, copied in (not moved/duplicated in source — root stays canonical)
  mkdir -p build/<name>/.avahi/specs
  cp -r .avahi/specs/001-cart-storefront build/<name>/.avahi/specs/
  cp -r .avahi/specs/002-project-board build/<name>/.avahi/specs/
  (cd build && zip -r ../frontend-interview-exercises-<stack>.zip <name>)
  ```
  (`.avahi/answer-keys/` is gitignored/untracked, so neither `git archive` nor a plain `cp` from a
  clean checkout of tracked specs pulls it in — no risk of leaking it into a candidate zip.)
- Upload all three as separate assets on the existing rolling "latest" release (same
  clobber-on-update behavior as today, just three assets instead of one).
- Confirm each package's own README is self-contained enough to work when the zip is extracted
  standalone (no implicit dependency on root-level files that won't be present, other than the
  `.avahi/specs/` copy step above).

## Data shape

No API/data shape changes. Product/board fixture data is conceptually identical across stacks;
each package owns its own mock-handler implementation (MSW for React/Vue; Angular's
`HttpTestingController`/interceptor-based equivalent, or MSW if it fits cleanly — TBD during
Angular implementation) since the wiring differs even when the payloads don't.

## Test plan

- [ ] `pnpm --filter react test:run` and `build` still green immediately after the move (no
      regressions from relocating into `packages/react`)
- [ ] `pnpm --filter vue test:run` covers both exercises' acceptance criteria, including
      defect-repro tests for cart-debug and the DnD seam for board
- [ ] `pnpm --filter angular test` (or equivalent) covers the same
- [ ] CI matrix is green independently for all three packages
- [ ] Release workflow produces exactly three zip assets; unzip each and confirm it contains only
      its own package plus whatever it needs to run fully standalone
