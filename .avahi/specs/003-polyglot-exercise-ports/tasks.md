# Tasks: Polyglot Exercise Ports (Vue + Angular)

**Branch:** main

<!-- Work through these in order. Check off as you go. Do not start a phase until the previous
one is verified green — each phase isolates a different source of risk. -->

## Phase 0 — Resolve open questions (spec.md)
- [x] Angular testing stack → **Vitest** (Angular CLI default post-Karma deprecation)
- [x] Angular data-fetching approach → **`httpResource`** (`@angular/common/http`) + signals
- [x] Vue state layer → **Pinia**
- [x] Versioning → **independent per-package**
- [ ] Lint posture for new packages — defaulting to working lint from day one; flagged as an
      assumption, not yet explicitly confirmed
- [ ] Root-level orientation (README/UI listing all 3 release assets) — descoped to a separate
      stretch-goal enhancement ticket, tracked outside this epic's critical path

## Phase 1 — Monorepo restructuring (react only, no port work)
- [ ] Add `pnpm-workspace.yaml`; slim root `package.json` to workspace passthrough scripts
- [ ] `git mv` existing app into `packages/react/`; fix relative paths/config
- [ ] Split `.avahi/answer-keys/cart-debug.md` → `.avahi/answer-keys/react/cart-debug.md`
- [ ] Update root README to describe the monorepo layout and the three stacks
- [ ] Verify `pnpm --filter react test:run`, `type-check`, and `build` are all green
- [ ] Verify no other tooling (pre-commit hooks, `.gitleaks`, IaC scan) hardcodes old root paths

## Phase 2 — CI and release workflow, react-only verification
- [ ] Update `ci.yml` to a matrix over `packages/*`, scoped to `react` for now
- [ ] Update `package.yml` to build a per-stack zip via `git archive HEAD:packages/<stack>`,
      scoped to `react` for now
- [ ] Push a throwaway branch/PR to confirm both workflows pass and the release asset is correct
- [ ] Confirm the zip extracts and runs standalone (fresh clone-like test: unzip to a temp dir,
      `pnpm install`, `pnpm dev`/`build`)

## Phase 3 — Vue port
- [ ] Scaffold `packages/vue/` (Vite + Vue 3 + Vitest + Testing Library + MSW)
- [ ] Build `Home.vue` picker (same two exercise cards/copy as `Home.tsx`)
- [ ] Implement cart-debug idiomatically against `.avahi/specs/001-cart-storefront/spec.md`,
      including intentional defects; write `.avahi/answer-keys/vue/cart-debug.md`
- [ ] Implement board idiomatically against `.avahi/specs/002-project-board/spec.md`, including
      the DnD integration seam
- [ ] Tests: defect-repro coverage for cart-debug, DnD-seam coverage for board
- [ ] Add `packages/vue/README.md` (self-contained setup/run instructions)
- [ ] Wire into CI matrix and release workflow; verify green end-to-end

## Phase 4 — Angular port
- [ ] Scaffold `packages/angular/` (Angular CLI, standalone components) per Phase 0 decisions
- [ ] Build `HomeComponent` picker (same two exercise cards/copy)
- [ ] Implement cart-debug idiomatically; write `.avahi/answer-keys/angular/cart-debug.md`
- [ ] Implement board idiomatically, including the DnD integration seam
- [ ] Tests: defect-repro coverage for cart-debug, DnD-seam coverage for board
- [ ] Add `packages/angular/README.md` (self-contained setup/run instructions)
- [ ] Wire into CI matrix and release workflow; verify green end-to-end

## Phase 5 — Cleanup
- [ ] Root README finalized: monorepo layout, links/description of the three release assets
- [ ] Confirm no cross-package imports anywhere
- [ ] Confirm each package's zip, extracted alone, has everything it needs and nothing it doesn't
- [ ] Delete/update any stale references to the old single-zip release in docs or memory
