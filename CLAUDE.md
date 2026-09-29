# frontend-interview-exercises

Scaffolded with [Avahi Frontend Platform](https://github.com/avahi-org/frontend-platform) — **SPA** template.

## Stack

See `package.json` for exact versions. Key tools:

- **React 18 + TypeScript strict** — framework and language
- **Tailwind CSS + Shadcn** — styling and UI primitives
- **TanStack Query** — server state (data fetching, caching)
- **Zustand** — client state (only when `useState` is not enough)
- **React Router v6** — routing

## Code conventions

**Feature co-location** — every feature lives in `src/features/<name>/` and is self-contained:

```
src/features/<name>/
├── index.ts               ← public API: export only the root component
├── <Name>.tsx             ← root component
├── use<Name>.ts           ← TanStack Query hook with exported queryKey
├── <name>.store.ts        ← Zustand store (omit if useState is enough)
├── <Name>.test.tsx        ← tests
└── mocks/
    └── handlers.ts        ← MSW handlers for tests
```

**Rules:**
- Never import across feature boundaries — shared code goes in `src/shared/`
- Sub-components, hooks, and stores are private; only the root component is exported
- Write the MSW handler before writing the test
- Test behavior (what the user sees), not implementation details

## Spec-driven workflow

Before implementing anything non-trivial, create a spec. Specs live in `.avahi/specs/`:

```
.avahi/specs/
  001-user-authentication/
    spec.md    ← requirements and acceptance criteria (fill this first)
    plan.md    ← technical approach, affected files, data shape
    tasks.md   ← ordered implementation checklist
```

**Always read the relevant spec before writing code.** If a spec does not exist for what you are about to build, create one first and confirm requirements before proceeding.

## Issue-first workflow

File a GitHub issue before opening a PR, and reference it in the PR body/title (e.g. `#42`). A CI check (`Verify Linked Issue`, see #44) enforces this — PRs without an issue reference fail the check.

## Issue/PR labels

This repo uses a deliberate label taxonomy (see #17) instead of ad hoc labeling. When filing or triaging an issue, apply the labels that fit:

| Label | Covers |
|-------|--------|
| `exercise` | Content specific to one candidate exercise — scaffold, spec, answer key, scope/constraint decisions, reference implementations |
| `infra` | Cross-cutting repo/platform engineering not tied to one exercise — CI, release, build, lint, deps, distribution |
| `meta` | Repo process/policy, non-code |
| `interviewer-only` | Deliverable is interviewer-facing (answer key, grading rubric) — must never ship in the candidate zip |
| `icebox` | Deprioritized, parked — may be revisited later. No fixed revisit cadence; only reconsidered when explicitly reprioritized |
| `wontfix` | Permanent no — distinct from `icebox`, do not conflate the two |
| `bug` | Real defects in repo code/tooling only |

**Convention, not a label:** intentional planted defects inside exercise apps (e.g. `cart-debug`) are exercise content, not bugs — never tag them `bug`.

`interviewer-only` is opt-in: absence of the label means candidate-facing/neutral, no second label needed.

## Candidate zip contents policy

`package.yml` builds the candidate deliverable via `git archive`, which ships every *tracked* file by default. `.gitattributes` maintains a denylist (`export-ignore`) of internal-only paths that must never reach a candidate: `CLAUDE.md`, `.claude/`, `.avahi/specs/templates/`, `.pre-commit-config.yaml`, and internal-only CI workflows (`container-scan.yml`, `iac-scan.yml`, `secret-scan.yml`, `package.yml`, `verify-linked-issue.yml`). A CI step in `package.yml` re-derives this list and fails the build if anything on it leaks into the built zip (see #18).

**When adding a new internal-only file (agent tooling, internal CI, dev-only config), add it to `.gitattributes`'s denylist in the same change.** Nothing else keeps this in sync — a forgotten entry ships silently until the next `package.yml` run catches it.

This policy is also documented in `README.md`, inside a dev-only marked section (see below) — resolved by #51, no longer candidate-visible.

## README dev/candidate split

`README.md` is the single source of truth for both developer and candidate documentation — there's no separate candidate README file to keep in sync (see #51). Wrap dev-only content in `<!-- DEV-ONLY:START -->` / `<!-- DEV-ONLY:END -->` markers; `package.yml`'s archive-build step strips everything between paired markers before publishing the candidate zip. Everything outside those markers ships to candidates as-is.

**When adding dev-only content to `README.md`, wrap it in a new marker pair — don't create a separate file.** The candidate-zip CI job (`package.yml`) fails the build if a `DEV-ONLY` marker survives stripping, as a regression guard.

## Available commands

| Command | What it does |
|---------|-------------|
| `/feature <name>` | Create a new feature spec (`spec.md`, `plan.md`, `tasks.md`) |
| `/component <name>` | Create a new shared component spec |
| `/bug <description>` | Create a bug investigation spec |

## Avahi platform docs

Full documentation: https://github.com/avahi-org/frontend-platform
