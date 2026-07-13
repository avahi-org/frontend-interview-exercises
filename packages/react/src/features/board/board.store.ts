import { create } from 'zustand'

export interface BoardCard {
  id: string
  title: string
}

export interface BoardColumn {
  id: string
  title: string
  cards: BoardCard[]
}

interface BoardStore {
  columns: BoardColumn[]
  /**
   * Move a card to a target column at a target index. This is the single
   * seam the UI uses to reorder the board — fallback buttons call it today,
   * and a drag-and-drop implementation should call the exact same action.
   * `toIndex` is clamped, so passing a large number appends to the column.
   */
  moveCard: (cardId: string, toColumnId: string, toIndex: number) => void
  addCard: (columnId: string, title: string) => void
}

let nextId = 100
function createId() {
  nextId += 1
  return `card-${nextId}`
}

export function getInitialColumns(): BoardColumn[] {
  return [
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        { id: 'card-1', title: 'Set up project repository' },
        { id: 'card-2', title: 'Write product requirements' },
        { id: 'card-3', title: 'Design database schema' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        { id: 'card-4', title: 'Build authentication flow' },
        { id: 'card-5', title: 'Implement dashboard layout' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        { id: 'card-6', title: 'Pick a tech stack' },
      ],
    },
  ]
}

export const useBoardStore = create<BoardStore>(set => ({
  columns: getInitialColumns(),

  moveCard: (cardId, toColumnId, toIndex) => {
    set((state) => {
      let moved: BoardCard | undefined

      // Remove the card from wherever it currently is.
      const withoutCard = state.columns.map((column) => {
        const index = column.cards.findIndex(card => card.id === cardId)
        if (index === -1) {
          return column
        }
        moved = column.cards[index]
        return { ...column, cards: column.cards.filter(card => card.id !== cardId) }
      })

      if (!moved) {
        return {}
      }

      // Insert it into the target column at the (clamped) target index.
      const columns = withoutCard.map((column) => {
        if (column.id !== toColumnId) {
          return column
        }
        const cards = [...column.cards]
        const clampedIndex = Math.max(0, Math.min(toIndex, cards.length))
        cards.splice(clampedIndex, 0, moved as BoardCard)
        return { ...column, cards }
      })

      return { columns }
    })
  },

  addCard: (columnId, title) => {
    set((state) => ({
      columns: state.columns.map(column =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, { id: createId(), title }] }
          : column,
      ),
    }))
  },
}))
