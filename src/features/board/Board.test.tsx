import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { Board } from './Board'
import { getInitialColumns, useBoardStore } from './board.store'

function getColumn(title: string): HTMLElement {
  return screen.getByText(title).closest('section') as HTMLElement
}

describe('Board', () => {
  beforeEach(() => {
    useBoardStore.setState({ columns: getInitialColumns() })
  })

  it('renders the seeded columns and cards', () => {
    render(<Board />)
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(within(getColumn('To Do')).getByText('Set up project repository')).toBeInTheDocument()
  })

  it('moves a card to the next column via the fallback control', async () => {
    const user = userEvent.setup()
    render(<Board />)

    const card = screen.getByText('Set up project repository').closest('li') as HTMLElement
    await user.click(within(card).getByRole('button', { name: /move to next column/i }))

    expect(within(getColumn('In Progress')).getByText('Set up project repository')).toBeInTheDocument()
    expect(within(getColumn('To Do')).queryByText('Set up project repository')).not.toBeInTheDocument()
  })

  it('adds a card to a column', async () => {
    const user = userEvent.setup()
    render(<Board />)

    await user.type(screen.getByLabelText('Add a card to Done'), 'Ship the release')
    await user.click(screen.getByRole('button', { name: 'Add card to Done' }))

    expect(within(getColumn('Done')).getByText('Ship the release')).toBeInTheDocument()
  })
})
