# Previous History

This document preserves the content of this repo's pull requests from before the
private-repo migration (see epic #59). PRs cannot be recreated as real PR objects in the
new repo — no live branches/diffs remain for the merged ones — so their content is
captured here instead, verbatim, for historical/reference purposes.

**This is an abundance-of-caution artifact.** It is not expected to actually be needed;
it exists so nothing is silently lost when the old repo's history is eventually deleted
(#65). See `CLAUDE.md` for a pointer to this file.

Any issue body/comment in the new repo that used to reference one of these PRs by number
now links to that PR's anchor in this file instead (e.g. `PREVIOUS_HISTORY.md#pr-47`).

## Index

- [PR #1 — chore: scaffold frontend interview exercises](#pr-1)
- [PR #2 — ci: publish candidate snapshot zip as rolling release](#pr-2)
- [PR #3 — docs: no-sudo setup instructions (npx pnpm / npm)](#pr-3)
- [PR #4 — chore: sync workflow templates](#pr-4)
- [PR #14 — Restructure into pnpm workspace, move React app to packages/react](#pr-14)
- [PR #15 — chore: sync workflow templates](#pr-15)
- [PR #43 — docs: document issue/PR label policy in CLAUDE.md](#pr-43)
- [PR #46 — ci: add Verify Linked Issue check to enforce issue-first workflow](#pr-46)
- [PR #48 — docs: fix missing blank line between CLAUDE.md sections](#pr-48)
- [PR #50 — ci: exclude internal-only paths from the candidate zip](#pr-50)
- [PR #52 — docs: remove outdated candidate-PR submission workflow](#pr-52)
- [PR #53 — docs: drop redundant bonus-test step from cart-debug spec](#pr-53)
- [PR #54 — docs+ci: split README into dev/candidate content via DEV-ONLY markers](#pr-54)
- [PR #57 — ci: exclude pull_request_template.md from the candidate zip](#pr-57)

---

<a id="pr-1"></a>
## PR #1 — chore: scaffold frontend interview exercises

- **State:** closed (merged)
- **Opened:** 2026-07-06
- **Merged:** 2026-07-06
- **Merge commit:** `237087270c28aa238f53690d1b7b3b338e2ce99f`
- **Branch:** `chore/scaffold-frontend-exercises` → `main`

### Description

Replaces the default Python project scaffold with the React/TS frontend interview app.

## What this brings in
- **Exercise 1 — `/cart-debug`**: shopping cart with planted defects (candidate debugs it)
- **Exercise 2 — `/board`**: Kanban board missing drag-and-drop (candidate builds it)
- Specs under `.avahi/specs/`, `.claude` commands, project README

## CI / compliance
- Added `ci.yml` — type-check → test → build on push/PR
- **Kept** org security scans: gitleaks secret-scan (required check), Trivy container-scan, Checkov iac-scan
- **Removed** Python-only workflows that don't apply to a JS/TS repo: ruff lint, Bandit SAST, pip-audit dep-scan
- Replaced Python README/`.gitignore`; trimmed ruff from pre-commit (kept gitleaks)

## Safety
- Interviewer answer key (`.avahi/answer-keys/`) is gitignored and **not** committed — verified.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

---

<a id="pr-2"></a>
## PR #2 — ci: publish candidate snapshot zip as rolling release

- **State:** closed (merged)
- **Opened:** 2026-07-06
- **Merged:** 2026-07-06
- **Merge commit:** `0a88906a4d8cec7a7bd59ef7a512fb42aca8c930`
- **Branch:** `ci/package-release` → `main`

### Description

Adds a workflow that, on every push/merge to `main`, rebuilds the clean candidate snapshot with `git archive` and publishes it as the **`latest`** GitHub Release asset (replacing the previous zip).

## Why
Gives interviewers a single, always-current download link instead of regenerating the zip locally after each change.

## Safety
- `git archive` includes only tracked files, so the gitignored interviewer answer key is **never** bundled.
- Uses `permissions: contents: write` scoped to this workflow only.

## Caveat
The repo is private, so the release asset is only downloadable by people **with repo access** (interviewers). External candidates still receive the zip via forwarding (OneDrive/Slack) — this just keeps the source of that zip fresh and centralized.

---

<a id="pr-3"></a>
## PR #3 — docs: no-sudo setup instructions (npx pnpm / npm)

- **State:** closed (merged)
- **Opened:** 2026-07-06
- **Merged:** 2026-07-06
- **Merge commit:** `082fe9c989b5ddd6ce64258aa89adf3abd969038`
- **Branch:** `docs/no-sudo-setup` → `main`

### Description

Replaces the `corepack enable` step in the README quick-start with two friction-free options.

## Why
A candidate hit a symlink/permission error on `corepack enable` and had to use `sudo`. `corepack enable` writes symlink shims into the **global Node bin**, which is root-owned on system-wide Node installs — hence the failure. Not related to the project or the zip.

## What changed
README "Getting started" now documents:
- **Option A:** `npx pnpm@9 install` / `npx pnpm@9 dev` (keeps the pinned pnpm 9, no global install)
- **Option B:** `npm install` / `npm run dev` (simplest)

Both require only Node 20+ and no `sudo`.

Merging this auto-rebuilds the `latest` release zip with the corrected instructions inside.

---

<a id="pr-4"></a>
## PR #4 — chore: sync workflow templates

- **State:** closed
- **Opened:** 2026-07-07
- **Merge commit:** `3b3915e397f877b6795640a9f3998185bafdd27b`
- **Branch:** `chore/sync-workflows` → `main`

### Description

Automated update of workflow templates from [`avahi-org/int-gh-automation`](https://github.com/avahi-org/int-gh-automation).

This PR was opened by the centralised sync system to bring this repository's workflow templates in line with the canonical versions. Review the diff and merge when ready — no manual edits required.

> [!WARNING]
> This branch is managed by the sync automation. Subsequent cascades may force-push to keep the branch rebased on the latest default branch commit. Do not commit directly to this branch.

Questions or bug reports: open an issue on [`avahi-org/int-gh-automation`](https://github.com/avahi-org/int-gh-automation/issues).

---

<a id="pr-14"></a>
## PR #14 — Restructure into pnpm workspace, move React app to packages/react

- **State:** closed
- **Opened:** 2026-07-13
- **Merge commit:** `6f21f97711e14c21de96a3bfc5094c84d02bca7e`
- **Branch:** `restructure/pnpm-workspace` → `dev`

### Description

Closes #6. Part of epic #5.

Pure restructuring — no functional change to the React app: same routes, same 5 passing tests,
same clean type-check, same build output. Verified locally after the move:

- `pnpm --filter @exercises/react test:run` — 5/5 passing
- `pnpm --filter @exercises/react type-check` — clean
- `pnpm --filter @exercises/react build` — succeeds, output unchanged

## What changed
- Added `pnpm-workspace.yaml`; root `package.json` now just delegates via `pnpm -r` / `--filter`
- Moved `src/`, vite/tsconfig/tailwind/postcss/eslint config, `public/`, `index.html`,
  `package.json`, `README.md` into `packages/react/` (all as tracked renames — history preserved)
- Split `.avahi/answer-keys/cart-debug.md` → `.avahi/answer-keys/react/cart-debug.md`
- New root `README.md`: monorepo overview instead of candidate-facing instructions (those stay
  in `packages/react/README.md`, unchanged)
- `ci.yml`: added `dev` to the trigger branches (needed for this and future PRs in the epic to
  get CI signal against `dev`) — the actual per-package CI matrix rewrite is #7's job, not this PR

## Found along the way
Flagged on #7: a naive per-package release zip (`git archive HEAD:packages/<stack>`) would drop
the shared `.avahi/specs/001-*`/`002-*` docs, since they intentionally live at the repo root.
Fix is written up in `plan.md`'s "Release changes" section for #7 to pick up.

## Checklist
- [x] `pnpm type-check` passes
- [x] `pnpm test:run` passes
- [x] `pnpm build` succeeds

### Comments

**Solenasth** commented on 2026-09-28:

Closing alongside the polyglot ports epic (#5), which is now iceboxed — this restructure only made sense in service of supporting multiple stack packages. Will reopen/redo if the epic is picked back up.

---

<a id="pr-15"></a>
## PR #15 — chore: sync workflow templates

- **State:** closed
- **Opened:** 2026-07-17
- **Merge commit:** `46beea114e7f98370c3828c55adbaa2ed74cc9de`
- **Branch:** `chore/sync-workflows` → `main`

### Description

Automated update of workflow templates from [`avahi-org/int-gh-automation`](https://github.com/avahi-org/int-gh-automation).

This PR was opened by the centralised sync system to bring this repository's workflow templates in line with the canonical versions. Review the diff and merge when ready — no manual edits required.

> [!WARNING]
> This branch is managed by the sync automation. Subsequent cascades may force-push to keep the branch rebased on the latest default branch commit. Do not commit directly to this branch.

Questions or bug reports: open an issue on [`avahi-org/int-gh-automation`](https://github.com/avahi-org/int-gh-automation/issues).

### Comments

**Solenasth** commented on 2026-09-28:

Closing — this re-adds Python-only workflows (lint-python, sast, pip-audit dep-scan) and pre-commit lines that were deliberately removed in #1 when this repo was scaffolded as JS/TS only, since they don't apply here. The upstream sync automation isn't aware of that per-repo override; not merging this cascade. If it keeps reopening, worth raising with avahi-org/int-gh-automation to exclude this repo from that template set.

---

<a id="pr-43"></a>
## PR #43 — docs: document issue/PR label policy in CLAUDE.md

- **State:** closed (merged)
- **Opened:** 2026-09-29
- **Merged:** 2026-09-29
- **Merge commit:** `c40c1e097138bfa060262a8782cb8d98c8375358`
- **Branch:** `docs/issue-label-policy` → `main`
- **Labels:** meta

### Description

## Summary
- Adds an "Issue/PR labels" section to `CLAUDE.md` documenting the taxonomy established in #17: `exercise`, `infra`, `meta`, `interviewer-only`, plus the `icebox`/`wontfix`/`bug` conventions.
- Audited `.claude/commands/*.md` and `.claude/skills/*/SKILL.md` (`bug`, `feature`, `component`) — none of them create GitHub issues (they only scaffold local specs in `.avahi/specs/`), so no changes were needed there.

Closes #42.

## Test plan
- [x] Docs-only change, no code/build affected
- [x] Reviewed rendered table in `CLAUDE.md` for accuracy against #17's resolution comment

---

<a id="pr-46"></a>
## PR #46 — ci: add Verify Linked Issue check to enforce issue-first workflow

- **State:** closed (merged)
- **Opened:** 2026-09-29
- **Merged:** 2026-09-29
- **Merge commit:** `0abbefdca73b1c7899e294521c41f0a52c62512e`
- **Branch:** `ci/verify-linked-issue` → `main`
- **Labels:** infra

### Description

## Summary
- Adds a new `.github/workflows/verify-linked-issue.yml` workflow using [hattan/verify-linked-issue-action](https://github.com/hattan/verify-linked-issue-action)@v1.1.5, triggered on `opened`/`edited`/`synchronize`/`reopened` against `main`. It regex-scans the PR body for an issue reference (`#N`) and fails the check + comments if none is found.
- Documents the issue-first requirement in `CLAUDE.md`.

Closes #44.

## Not included in this PR (needs a manual repo-settings step)

Making this check **required** in `main`'s branch protection rules is a separate, higher-blast-radius change (it affects how every future PR merges) — flagging it here rather than doing it silently. Once this workflow has run successfully at least once (so the check name is registered), someone with admin access should add "PR references an issue" as a required status check.

## Test plan
- [ ] Confirm the check fails on a PR with no issue reference (this PR itself references #44, so it should pass)
- [ ] Confirm the check passes once an issue number is added to a body that initially lacked one
- [ ] After merge, add the check as a required status check on `main` (manual, see above)

---

<a id="pr-48"></a>
## PR #48 — docs: fix missing blank line between CLAUDE.md sections

- **State:** closed (merged)
- **Opened:** 2026-09-29
- **Merged:** 2026-09-29
- **Merge commit:** `3b9cfcc3e628fb2ca0f31e3905041a2c8d40a316`
- **Branch:** `docs/claude-md-spacing-fix` → `main`
- **Labels:** documentation

### Description

## Summary
Trivial formatting fix: #43 and #46 both inserted a new `##` section right before "## Issue/PR labels" in `CLAUDE.md`, and the squash-merge of #46 landed without a blank line separating the two headings.

Refs #46.

## Test plan
- [x] Whitespace-only change, no functional impact

---

<a id="pr-50"></a>
## PR #50 — ci: exclude internal-only paths from the candidate zip

- **State:** closed (merged)
- **Opened:** 2026-09-29
- **Merged:** 2026-09-29
- **Merge commit:** `ffa94f4479d99445ee6c5fe293f6b84167dbdffa`
- **Branch:** `infra/candidate-zip-cleanup` → `main`
- **Labels:** infra

### Description


## Addendum: policy documentation

Also documents the candidate-zip denylist policy for humans/agents, not just the mechanism:
- `CLAUDE.md` — new "Candidate zip contents policy" section (agent context)
- `README.md` — same content, since it's the only dev-facing doc that exists today. Marked as out-of-place pending the README dev/candidate split, newly filed as **#51**.
- Checked `.claude/skills/*` and `.claude/commands/*` — no changes needed, none of them generate internal-only content (only candidate-facing spec instances under `.avahi/specs/`).


## Addendum: policy documentation

Also documents the candidate-zip denylist policy for humans/agents, not just the mechanism:
- `CLAUDE.md` — new "Candidate zip contents policy" section (agent context)
- `README.md` — same content, since it's the only dev-facing doc that exists today. Marked as out-of-place pending the README dev/candidate split, newly filed as **#51**.
- Checked `.claude/skills/*` and `.claude/commands/*` — no changes needed, none of them generate internal-only content (only candidate-facing spec instances under `.avahi/specs/`).


---

<a id="pr-52"></a>
## PR #52 — docs: remove outdated candidate-PR submission workflow

- **State:** closed (merged)
- **Opened:** 2026-09-29
- **Merged:** 2026-09-29
- **Merge commit:** `b55be4e49b30957694436fc9b5d8077c8b007383`
- **Branch:** `docs/47-remove-outdated-submission-docs` → `main`
- **Labels:** meta

### Description

## Summary
Candidates never interact with GitHub at all — zip delivery, local run, live review, interview ends. No branch, no PR, no push, ever. Two docs still described the old (no-longer-real) candidate-PR-submission model:

- `README.md`'s "How to submit" section (branch off `main`, open a PR, fill out the template) — replaced with a short, honest note.
- `.github/pull_request_template.md` — was entirely shaped around candidate exercise submissions ("Which exercise?" checkboxes, etc.) — replaced with one suited to this repo's actual internal engineering PRs, referencing the issue-first workflow from #44.

Closes #47.

## Stacked PRs
This is the first of a 3-PR stack, per plan: **#47 (this PR) → #26 → #51**, each based on the previous branch, to be merged in that order.

## Test plan
- [x] Docs-only change, no app code affected
- [x] Confirmed no other doc references the old "How to submit" section or old PR template content

---

<a id="pr-53"></a>
## PR #53 — docs: drop redundant bonus-test step from cart-debug spec

- **State:** closed (merged)
- **Opened:** 2026-09-29
- **Merged:** 2026-09-30
- **Merge commit:** `0627d8dc17d04fc15cf87ecba2c05489f0b2520a`
- **Branch:** `docs/26-remove-bonus-test-lines` → `main`
- **Labels:** exercise

### Description

## Summary
`cart-debug` stays pure-diagnosis now that a dedicated testing exercise exists (epic #29, search-with-debounce) — the "(Bonus) Add a test that would have caught it" prompt in `tasks.md`, and the matching "Writing a failing test that pins a defect is a great move" line in `plan.md`, are now redundant leftovers from before that split.

Closes #26.

## Stacked PRs
Second of a 3-PR stack: #47 → **#26 (this PR)** → #51, based on #47's branch, to be merged in that order.

## Test plan
- [x] Docs-only change, no app code affected
- [x] Confirmed no other doc (`spec.md`, `README.md`) repeats this language

---

<a id="pr-54"></a>
## PR #54 — docs+ci: split README into dev/candidate content via DEV-ONLY markers

- **State:** closed (merged)
- **Opened:** 2026-09-29
- **Merged:** 2026-09-30
- **Merge commit:** `fdef02b9e63badcae12485833285fbd3905281d6`
- **Branch:** `infra/51-readme-dev-candidate-split` → `main`
- **Labels:** infra

### Description

## Summary
Resolves #51. Per the design-decision comment on #51 (posted before this implementation, per the issue-first policy), `README.md` stays the single source of truth for both audiences instead of a separately-maintained `README.candidate.md`:

- Dev-only sections are wrapped in `<!-- DEV-ONLY:START -->` / `<!-- DEV-ONLY:END -->` HTML comment markers.
- A new `package.yml` step strips everything between paired markers when building the candidate zip, using the same "unzip → patch → re-zip" shape as #18's verification step.
- The #18 candidate-zip-policy section is wrapped as the first dev-only block; the marker convention itself is documented as a second dev-only block (self-referential, but correct).
- `CLAUDE.md` documents the convention for agent context. Confirmed no `.claude/skills` or `.claude/commands` file references `README.md`, so none need updating.
- Verification step extended to also fail the build if any `DEV-ONLY` text survives in the candidate zip's `README.md`.

## Bug caught and fixed during local testing
The first version used a plain (non-anchored) `sed` range pattern, which matched the marker text anywhere on a line — including inside the prose *describing* the marker convention (which necessarily mentions the literal marker text in backticks). This closed the delete range early and left an orphaned closing marker + leftover content. Fixed by anchoring the pattern to whole-line matches (`^...$`), and re-verified.

## Stacked PRs
Third of a 3-PR stack: #47 → #26 → **#51 (this PR)**, based on #26's branch, to be merged in that order.

## Verification (done locally before pushing)
- Rebuilt the archive, ran the exact strip logic from `package.yml`, confirmed zero `DEV-ONLY` occurrences and a clean `README.md` tail in the result.
- Ran both CI verification checks (denylist + DEV-ONLY marker) against the processed zip — both pass.
- Extracted the fully-processed zip standalone and ran `pnpm install --frozen-lockfile`, `type-check`, `build`, and `test:run` — all green.

## Test plan
- [x] Local end-to-end simulation of the full package.yml pipeline, described above
- [ ] Live CI run on push to `main` (package.yml only triggers on push to `main`, not PRs — same caveat as #50)

---

<a id="pr-57"></a>
## PR #57 — ci: exclude pull_request_template.md from the candidate zip

- **State:** open
- **Opened:** 2026-09-30
- **Merge commit:** `3ef0f4490ee08f6d914caad4bbc9010c41ad675c`
- **Branch:** `infra/56-denylist-pr-template` → `main`
- **Labels:** infra

### Description

## Summary
Found while verifying the real published release zip after merging #47/#26/#51: `.github/pull_request_template.md` was still shipping to candidates, but #47 rewrote its content for internal engineering PRs only — it references `CLAUDE.md` and the issue-first workflow, neither of which apply to a candidate, and `CLAUDE.md` itself is excluded from their copy, making it a dangling reference.

Adds it to the `.gitattributes` denylist and updates the enumeration of denylisted paths in `CLAUDE.md` and `README.md`.

Closes #56.

## Verification (done locally before pushing)
- Rebuilt the archive: confirmed `pull_request_template.md` absent
- Ran the full strip + denylist-check simulation: both pass, no `DEV-ONLY` leakage
- Confirmed `.github/` in the resulting zip now only contains `workflows/ci.yml`, as intended

## Test plan
- [x] Docs/config-only change, no app code affected

---
