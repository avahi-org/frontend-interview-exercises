# frontend-interview-exercises

A polyglot monorepo of frontend take-home exercises. This repo is the single source of truth for
all supported stacks — candidates only ever interact with **one** stack at a time, delivered as a
self-contained zip built from one of the packages below.

> Note: this root README is for maintainers. If you're a candidate working from a downloaded zip,
> the README you actually need shipped inside it — start there instead.

## Stacks

| Package | Status | Framework |
|---|---|---|
| [`packages/react`](packages/react) | Available | React 18 + Vite |
| `packages/vue` | In progress | Vue 3 + Vite |
| `packages/angular` | In progress | Angular |

Tracking epic: [avahi-org/frontend-interview-exercises#5](https://github.com/avahi-org/frontend-interview-exercises/issues/5).

## Exercises (shared across every stack)

Each stack implements the same two exercises, framework-idiomatically, against the same
behavior contract:

| # | What it is | The task | Shared spec |
|---|-----------|----------|-------------|
| 1 | A shopping cart with reported defects | Debug it — reproduce, triage, and fix | `.avahi/specs/001-cart-storefront/` |
| 2 | A Kanban board missing one feature | Build it — implement drag-and-drop | `.avahi/specs/002-project-board/` |

These specs are the framework-agnostic contract: they describe *intended behavior*, not
implementation. Every stack's port is built and evaluated against them. Per-stack implementation
notes (the interviewer answer key) live under `.avahi/answer-keys/<stack>/` and are gitignored —
never shipped to candidates.

## Repo layout

```
/
├── pnpm-workspace.yaml
├── package.json              # workspace root — delegates via `pnpm -r` / `--filter`
├── .avahi/
│   ├── specs/                # shared, framework-agnostic behavior contracts (001, 002, ...)
│   └── answer-keys/          # gitignored; per-stack (react/, vue/, angular/)
└── packages/
    ├── react/                # self-contained React app — see its own README
    ├── vue/                  # self-contained Vue app (in progress)
    └── angular/              # self-contained Angular app (in progress)
```

Each package owns its own `package.json`, test runner config, and README. Cross-package imports
are forbidden — shared code within a stack goes in that package's own `shared/` directory.

## Working in this repo

```bash
pnpm install                        # installs all workspace packages
pnpm --filter @exercises/react dev  # run a specific package
pnpm build                          # build every package
pnpm test:run                       # test every package
```

## Release process

On every push to `main`, CI publishes one zip **per stack** as a release asset — not a combined
bundle. A candidate downloads only the stack they're doing the exercise in.
