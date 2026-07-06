import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useBoardStore, type BoardColumn as BoardColumnType } from './board.store'
import { BoardCardItem } from './BoardCardItem'

interface BoardColumnProps {
  column: BoardColumnType
  prevColumnId: string | null
  nextColumnId: string | null
}

export function BoardColumn({ column, prevColumnId, nextColumnId }: BoardColumnProps) {
  const addCard = useBoardStore(state => state.addCard)
  const [draft, setDraft] = useState('')

  function handleAdd() {
    const title = draft.trim()
    if (!title) {
      return
    }
    addCard(column.id, title)
    setDraft('')
  }

  // ──────────────────────────────────────────────────────────────────────
  // TODO (candidate): make this column a drop target.
  //
  // When a card is dropped here, call `moveCard(cardId, column.id, toIndex)`
  // from the board store. Computing `toIndex` from the drop position (so a
  // card can be inserted between two existing cards) is part of the exercise.
  // ──────────────────────────────────────────────────────────────────────

  return (
    <section className="flex w-72 shrink-0 flex-col rounded-lg bg-muted/50 p-3">
      <header className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold">{column.title}</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
          {column.cards.length}
        </span>
      </header>

      <ul className="flex min-h-2 flex-1 flex-col gap-2">
        {column.cards.map((card, index) => (
          <BoardCardItem
            key={card.id}
            card={card}
            columnId={column.id}
            index={index}
            cardCount={column.cards.length}
            prevColumnId={prevColumnId}
            nextColumnId={nextColumnId}
          />
        ))}
      </ul>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => event.key === 'Enter' && handleAdd()}
          placeholder="Add a card…"
          aria-label={`Add a card to ${column.title}`}
          className="h-8 flex-1 rounded-md border border-input bg-background px-3 text-sm"
        />
        <Button size="icon" className="h-8 w-8" aria-label={`Add card to ${column.title}`} onClick={handleAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
