# Plan: Cart Storefront

**Date:** 2026-06-02
**Branch:** main

---

## Approach

Catalog is server state via TanStack Query against `/api/products` (MSW-backed, offline). Cart is
client state in a Zustand store. Presentational components read the store and the query; price math
and discount logic are derived in `CartPanel`.

## Files

```
src/features/cart-debug/
├── index.ts             # exports CartDebug
├── CartDebug.tsx        # root: header badge + layout (grid + cart panel)
├── ProductGrid.tsx      # catalog + category filter + "Add to cart"
├── CartPanel.tsx        # cart lines, stepper, remove, promo, totals
├── useProducts.ts       # TanStack Query hook (productsQueryKey)
├── cart.store.ts        # Zustand: lines + addItem/incrementQty/decrementQty/removeLine/clear
├── formatPrice.ts       # $0.00 helper
├── CartDebug.test.tsx   # asserts correct behavior only (stays green)
└── mocks/handlers.ts    # GET /api/products → seed catalog
```

## Data shape

```ts
interface Product { id: number, title: string, price: number, category: string }
interface CartLine { id: number, title: string, price: number, qty: number }
```

## API / query keys

```ts
export const productsQueryKey = ['products'] as const
// GET /api/products
```

## Edge cases

- Loading: skeleton grid.
- Error: inline error message.
- Empty cart: "Your cart is empty" placeholder.
- Empty filtered category: "No products in this category."

## Test plan

- [x] Catalog renders after load.
- [x] Adding a product places it in the cart.
- Tests intentionally assert only correct behavior so the suite passes; finding the defects is the
  exercise. Writing a failing test that pins a defect is a great move.
