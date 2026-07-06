# Feature: Cart Storefront (Debugging Exercise)

**Date:** 2026-06-02
**Branch:** main
**Status:** Built — contains known defects to investigate

---

## Summary

A small storefront: a product catalog (loaded from the API via TanStack Query) and a cart
(client state in Zustand). The feature is fully implemented and styled, **but several defects
were reported in QA**. This document is the canonical description of *intended* behavior — use it
to reproduce the reported issues, triage them, and fix them.

This is exercise 1. It lives at route `/cart-debug`.

## User stories

- As a shopper, I want to browse products and filter them by category, so I can find what I want.
- As a shopper, I want to add products to a cart and adjust quantities, so I can buy more than one.
- As a shopper, I want to remove a line from my cart, so I can change my mind.
- As a shopper, I want an accurate subtotal and total, so I trust the checkout.
- As a shopper, I want a promo code to apply when my order qualifies, so I get my discount.

## Acceptance criteria (intended behavior)

- [ ] The catalog renders all products after loading; a loading skeleton shows while fetching.
- [ ] Category filters (All / Electronics / Books / Home) show exactly the matching products.
      "All" shows everything.
- [ ] "Add to cart" adds the product; adding an existing product increments its quantity.
- [ ] The cart quantity stepper: **+** increases and **−** decreases the line quantity; reaching
      0 removes the line.
- [ ] The header badge always reflects the **current** total item count.
- [ ] Removing a line removes **that** line and no other.
- [ ] Subtotal = Σ (line price × line quantity).
- [ ] Promo code `SAVE10` applies 10% off when the cart has **5 or more** items; below that it
      does not apply. Total = subtotal − discount.

## Out of scope

- Real checkout / payment, persistence across reloads, authentication.

## Open questions

- None — behave per the acceptance criteria above. If reality disagrees with this list, that is a
  bug to fix.

---

## Implementation notes

Full-stack slice of the Avahi conventions: TanStack Query (`useProducts`) + MSW
(`mocks/handlers.ts`, running in both node tests and the browser dev worker) + Zustand
(`cart.store.ts`). See `plan.md`.
