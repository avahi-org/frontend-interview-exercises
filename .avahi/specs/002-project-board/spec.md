# Feature: Project Board (Build-the-Missing-Piece Exercise)

**Date:** 2026-06-02
**Branch:** main
**Status:** Built except for drag-and-drop

---

## Summary

A Kanban-style board with columns (To Do / In Progress / Done) and cards. The board is fully
functional: you can add cards and move them between and within columns using the per-card
controls. **The one missing feature is drag-and-drop** — that is the exercise.

This is exercise 2. It lives at route `/board`.

## User stories

- As a user, I want to drag a card to another column, so I can update its status quickly.
- As a user, I want to drag a card to a specific position within a column, so I can prioritize.
- As a user, I want clear feedback while dragging (what I'm dragging, where it will land).

## Acceptance criteria

- [ ] A card can be dragged from one column and dropped into another.
- [ ] A card can be dropped at a **specific position** within a column (between two cards), not
      just appended.
- [ ] Dropping persists through the existing `moveCard(cardId, toColumnId, toIndex)` store action
      — no parallel source of truth.
- [ ] There is visible feedback during the drag (e.g. the dragged card and/or a drop indicator).
- [ ] Existing functionality (add card, the fallback move controls) keeps working.
- [ ] Reasonable keyboard/a11y consideration is a plus (discuss trade-offs even if not fully built).

## Out of scope

- Persistence to a backend, multi-board support, editing/deleting card text, real-time sync.

## Open questions

- Library choice is **yours**. Native HTML5 DnD, `@dnd-kit`, or `react-dnd` are all acceptable —
  none is pre-installed. Be ready to explain the trade-offs of your choice.

---

## Implementation notes

The data layer is done and is the integration seam: `board.store.ts` exposes
`moveCard(cardId, toColumnId, toIndex)` (index is clamped, so it handles append and insert). The
fallback buttons in `BoardCardItem.tsx` already call it — your drag handlers should call the same
action. `TODO (candidate)` markers in `BoardCardItem.tsx` (drag source) and `BoardColumn.tsx`
(drop target) point to where the wiring goes. See `plan.md`.
