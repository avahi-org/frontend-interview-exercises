# Bug: {{BUG_TITLE}}

**Date:** {{DATE}}
**Branch:** {{BRANCH}}
**Severity:** <!-- critical | high | medium | low -->

---

## Steps to reproduce

1.
2.
3.

**Expected:** <!-- What should happen -->
**Actual:** <!-- What actually happens -->

## Root cause

<!-- Identify the layer first:
  - UI/render bug (wrong output, style, layout)
  - State bug (wrong data shown, stale cache)
  - Network/data bug (wrong API call, bad response handling)
  - TypeScript/runtime error

Then describe the specific cause. Do not write any code until this is filled in. -->

## Fix plan

<!-- Minimal change that addresses the root cause. Do not refactor surrounding code. -->

## Test

<!-- The test that would have caught this bug. Add it to the feature folder. -->
- [ ] Add/update test in `src/features/<name>/<Feature>.test.tsx`
- [ ] Add MSW handler for the edge case if missing
