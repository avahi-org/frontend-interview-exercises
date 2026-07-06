# Tasks: Project Board (Build Drag-and-Drop)

**Branch:** main

The board works via the per-card fallback controls. Add drag-and-drop.

## Decide
- [ ] Pick an approach (native HTML5 DnD / @dnd-kit / react-dnd); install a lib if you choose one
- [ ] Note the trade-offs of your choice (you'll be asked)

## Build
- [ ] Make cards a drag source (`BoardCardItem.tsx`) carrying the card id
- [ ] Make columns a drop target (`BoardColumn.tsx`)
- [ ] Compute the target index from drop position (support inserting between cards)
- [ ] Call `moveCard(cardId, toColumnId, toIndex)` on drop — reuse the existing store action
- [ ] Add drag feedback (dragged card style and/or a drop indicator)

## Verify
- [ ] Drag between columns works
- [ ] Drag to reorder within a column works
- [ ] Empty-column drop works
- [ ] Existing add-card + fallback controls still work
- [ ] `pnpm test` and `pnpm type-check` stay green
- [ ] (Bonus) a test for the new behavior; (bonus) keyboard/a11y consideration
