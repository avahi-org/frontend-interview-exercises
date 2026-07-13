# Feature: Polyglot Exercise Ports (Vue + Angular)

**Date:** 2026-07-13
**Branch:** main
**Status:** Draft
**Tracking epic:** [avahi-org/frontend-interview-exercises#5](https://github.com/avahi-org/frontend-interview-exercises/issues/5)

---

## Summary

Give candidates a choice of frontend stack for the take-home. Port the two existing exercises
(cart-debug, board) to Vue and Angular, each reimplemented idiomatically for its framework rather
than transliterated line-for-line from the React version. This repo becomes a **pnpm workspace
monorepo** with one self-contained package per stack (`packages/react`, `packages/vue`,
`packages/angular`), so it remains the single source of truth for all three — the shared,
framework-agnostic behavior contract (`.avahi/specs/001-*`, `002-*`) stays at the root and is
what every port is built against. The release pipeline changes from one combined zip to **one
zip per stack**; a candidate downloads only the stack they chose and never sees the other two.

Stack selection happens at distribution time (which zip an interviewer sends, or which release
asset a candidate downloads) — not inside a single running app. What *does* stay consistent
across stacks is the in-app experience once you're in a package: the same two-exercise picker
UI (today's `Home.tsx`) re-implemented natively per framework (`Home.vue`, `HomeComponent`).

## User stories

- As a candidate, I want to do the take-home in the stack I'm strongest in (React, Vue, or
  Angular), so the exercise measures my skill rather than my unfamiliarity with a framework.
- As a candidate, I want the exercise picker (choosing between "Debug the Storefront" and "Build
  the Board") to feel native to my stack, not like a foreign app bolted on.
- As a candidate, I want my downloaded zip to contain only my chosen stack — no unrelated
  frameworks, dependencies, or code to sift through.
- As a maintainer, I want one repo holding all three stacks so changes to exercise intent (bug
  descriptions, acceptance criteria, scoring rubric) are made once at the shared spec level, not
  copy-pasted three times.
- As a maintainer, I want CI to verify each stack independently, so a broken Vue port can't hide
  behind a passing React build (or vice versa).

## Acceptance criteria

- [ ] Repo restructured into a pnpm workspace: `packages/react/`, `packages/vue/`,
      `packages/angular/`. The current app moves into `packages/react/` with no functional or
      behavioral change (same routes, same tests passing, same build output).
- [ ] `packages/vue` and `packages/angular` each implement **both** exercises (cart-debug, board)
      using idiomatic patterns for that framework — not a literal port of React component
      structure — while satisfying the same acceptance criteria already written in
      `.avahi/specs/001-cart-storefront/spec.md` and `002-project-board/spec.md`.
- [ ] Each package ships its own native "pick an exercise" home view equivalent to today's
      `Home.tsx` (same two cards, same copy/intent).
- [ ] Each package is fully self-contained: own `package.json`, own test runner config, own
      README with setup/run instructions. A candidate never needs to look outside their package.
- [ ] `.avahi/specs/001-*` and `002-*` remain the single shared, framework-agnostic behavior
      contract referenced by all three packages. Per-stack implementation detail (answer keys)
      moves under a per-stack path, e.g. `.avahi/answer-keys/<stack>/cart-debug.md`.
- [ ] CI runs an independent job per package (type-check, test, build at minimum) so one stack's
      failure doesn't block or mask another's.
- [ ] The release workflow publishes **three separate zip assets** (one per stack) on every push
      to `main`, each containing only that stack's package. No combined all-stacks zip.
- [ ] Existing React candidate experience is unchanged after the move into `packages/react`
      (submission process — branch off `main`, PR back in — is unaffected).

## Out of scope

- Bug-for-bug parity between stacks. Idiomatic reinterpretation was chosen deliberately: the
  *acceptance criteria* are the shared contract, not the specific implementation bugs or where
  they live in the code.
- A live, running "pick your framework" app. Stack choice happens at zip-distribution time.
- Backend/API changes. MSW (or its per-stack equivalent) is reused/adapted, not replaced.
- Changing the interview submission process (branch + PR into `main`) beyond adjusting for the
  new `packages/<stack>` paths.
- A polished root landing README/UI listing all three release assets — tracked as a separate
  stretch-goal enhancement ticket, not required for this epic to ship.

## Decisions

- **Angular test runner: Vitest.** As of late-2025 the Angular CLI made Vitest the default for
  new projects and Karma is deprecated (no new features/bug fixes). Vitest is now the "vanilla"
  CLI-default choice — consistent with using basic/default tooling instead of reaching for extra
  libraries, and it happens to match the test runner already used by React and Vue.
- **Angular data fetching: `httpResource` (`@angular/common/http`) + signals.** This is a
  first-party, no-install wrapper around `HttpClient` — the direct Angular-native equivalent of
  "don't port TanStack Query, use the basic tool," mirroring how the React app uses TanStack
  Query as the standard (not Redux-heavyweight) choice and Zustand instead of Redux for client
  state.
- **Vue state layer: Pinia.** Pinia has been Vue's official, core-team-maintained state library
  since Feb 2022 and is what the official Vue docs and tutorial teach today — the Vue-idiomatic
  default, same status Zustand/TanStack Query hold in the React app.
- **Versioning: independent per-package.** Each package (`packages/react`, `packages/vue`,
  `packages/angular`) has its own version number and release cadence; they are not bumped
  together.

## Open questions

- **Lint posture for new packages:** the React package currently has intentionally-broken lint
  (antfu config vs. ESLint 9 incompatibility, documented in its README) with type-check + tests
  as the actual source of truth. Default assumption for this epic: Vue and Angular are fresh
  scaffolds and should ship with **working lint from day one** (no reason to inherit a legacy
  incompatibility that doesn't exist yet in a new package) — flagged here in case that's wrong.

---

## Implementation notes

See `plan.md` for the monorepo layout, migration steps, and CI/release workflow changes.
