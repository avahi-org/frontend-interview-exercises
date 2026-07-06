# Plan: Project Board

**Date:** 2026-06-02
**Branch:** main

---

## Approach

Pure client state in Zustand (no server). Columns hold ordered cards. All reordering funnels
through one action, `moveCard(cardId, toColumnId, toIndex)`, so any input method (fallback
buttons today, drag-and-drop next) shares the same logic and stays consistent.

## Files

```
src/features/board/
├── index.ts            # exports Board
├── Board.tsx           # root: renders columns, computes prev/next column ids
├── BoardColumn.tsx     # column: header, card list, add-card input  ← drop target TODO
├── BoardCardItem.tsx   # card: title + fallback move controls       ← drag source TODO
├── board.store.ts      # Zustand: columns, moveCard, addCard, getInitialColumns()
└── Board.test.tsx      # seeded render, move-via-button, add-card (all pass)
```

## Data shape

```ts
interface BoardCard { id: string, title: string }
interface BoardColumn { id: string, title: string, cards: BoardCard[] }

moveCard(cardId: string, toColumnId: string, toIndex: number): void  // toIndex clamped
addCard(columnId: string, title: string): void
```

## Where drag-and-drop plugs in

- **Drag source:** `BoardCardItem.tsx` — make each card draggable; carry `card.id`.
- **Drop target:** `BoardColumn.tsx` — accept drops, compute the target index from the drop
  position, then call `moveCard(cardId, column.id, toIndex)`.
- No store changes needed; `moveCard` already handles cross-column moves and in-column reorder.

## Edge cases to consider

- Dropping into an empty column.
- Dropping a card back into its own column at a new index.
- Dropping onto the same position (no-op is fine).
- Drop indicator placement between cards vs at list ends.

## Test plan

- [x] Board renders seeded columns/cards.
- [x] Fallback "move to next column" relocates a card.
- [x] Add card works.
- [ ] (Candidate) Add coverage for the drag-and-drop behavior you implement.
