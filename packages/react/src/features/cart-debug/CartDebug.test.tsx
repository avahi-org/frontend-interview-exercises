import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { CartDebug } from './CartDebug'
import { useCartStore } from './cart.store'
import { mockProducts } from './mocks/handlers'

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('CartDebug', () => {
  beforeEach(() => {
    useCartStore.setState({ lines: [] })
  })

  it('renders the product catalog after loading', async () => {
    renderWithProviders(<CartDebug />)
    await waitFor(() => {
      expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument()
    })
  })

  it('adds a product to the cart', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CartDebug />)

    await waitFor(() => screen.getByText(mockProducts[0].title))

    const addButtons = await screen.findAllByRole('button', { name: /add to cart/i })
    await user.click(addButtons[0])

    // The title now appears twice: once in the catalog, once in the cart line.
    await waitFor(() => {
      expect(screen.getAllByText(mockProducts[0].title)).toHaveLength(2)
    })
  })
})
