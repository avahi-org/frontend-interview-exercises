# Tasks: Cart Storefront (Debugging)

**Branch:** main

The feature is already built. Your job is to make its behavior match `spec.md`.

## Triage loop (repeat per issue)
- [ ] Reproduce the issue in the running app (`pnpm dev` → `/cart-debug`)
- [ ] Form a hypothesis about the root cause; narrow it to a file/function
- [ ] Apply a minimal fix
- [ ] Verify the fix and confirm you didn't break a passing behavior
- [ ] (Bonus) Add a test that would have caught it

## Areas to exercise while reproducing
- [ ] Category filtering
- [ ] Add to cart + quantity stepper (+ / −)
- [ ] Header item-count badge
- [ ] Removing a line
- [ ] Subtotal / total math
- [ ] Promo code `SAVE10` at the qualifying threshold

## Done when
- [ ] App behavior matches every acceptance criterion in `spec.md`
- [ ] `pnpm test` and `pnpm type-check` stay green
