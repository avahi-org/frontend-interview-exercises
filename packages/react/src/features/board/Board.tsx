import { Info } from 'lucide-react'
import { useBoardStore } from './board.store'
import { BoardColumn } from './BoardColumn'

export function Board() {
  const columns = useBoardStore(state => state.columns)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Project Board</h2>
        <p className="text-sm text-muted-foreground">Organize work across columns.</p>
      </div>

      <div className="mb-6 flex items-start gap-2 rounded-lg border bg-muted/40 p-4 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <p className="text-muted-foreground">
          This board is fully functional via the controls on each card, but
          {' '}
          <span className="font-medium text-foreground">drag-and-drop is not implemented yet</span>
          . Implement it so cards can be dragged between and within columns.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column, index) => (
          <BoardColumn
            key={column.id}
            column={column}
            prevColumnId={index > 0 ? columns[index - 1].id : null}
            nextColumnId={index < columns.length - 1 ? columns[index + 1].id : null}
          />
        ))}
      </div>
    </div>
  )
}
