import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, GripVertical } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useBoardStore, type BoardCard } from './board.store'

interface BoardCardItemProps {
  card: BoardCard
  columnId: string
  index: number
  cardCount: number
  prevColumnId: string | null
  nextColumnId: string | null
}

export function BoardCardItem({
  card,
  columnId,
  index,
  cardCount,
  prevColumnId,
  nextColumnId,
}: BoardCardItemProps) {
  const moveCard = useBoardStore(state => state.moveCard)

  // ──────────────────────────────────────────────────────────────────────
  // TODO (candidate): make this card draggable.
  //
  // The data layer is already done — `moveCard(cardId, toColumnId, toIndex)`
  // moves a card anywhere on the board and is what the fallback buttons below
  // call. Wire up drag-and-drop so a card can be dragged between and within
  // columns, then call `moveCard` with the drop target on drop.
  //
  // You can use any approach: the native HTML5 Drag and Drop API, @dnd-kit,
  // react-dnd — whatever you're comfortable with. No library is pre-installed,
  // so the choice (and the trade-offs) are yours to explain.
  // ──────────────────────────────────────────────────────────────────────

  return (
    <li className="group rounded-md border bg-card p-3 shadow-sm">
      <div className="flex items-start gap-2">
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <p className="flex-1 text-sm">{card.title}</p>
      </div>

      {/* Fallback controls — these prove the data layer works without drag-and-drop. */}
      <div className="mt-2 flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          aria-label="Move up"
          disabled={index === 0}
          onClick={() => moveCard(card.id, columnId, index - 1)}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          aria-label="Move down"
          disabled={index === cardCount - 1}
          onClick={() => moveCard(card.id, columnId, index + 1)}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          aria-label="Move to previous column"
          disabled={!prevColumnId}
          onClick={() => prevColumnId && moveCard(card.id, prevColumnId, Number.MAX_SAFE_INTEGER)}
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          aria-label="Move to next column"
          disabled={!nextColumnId}
          onClick={() => nextColumnId && moveCard(card.id, nextColumnId, Number.MAX_SAFE_INTEGER)}
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </li>
  )
}
