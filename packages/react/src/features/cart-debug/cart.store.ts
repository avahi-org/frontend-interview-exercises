import { create } from 'zustand'
import type { Product } from './useProducts'

export interface CartLine {
  id: number
  title: string
  price: number
  qty: number
}

interface CartStore {
  lines: CartLine[]
  addItem: (product: Product) => void
  incrementQty: (id: number) => void
  decrementQty: (id: number) => void
  removeLine: (id: number) => void
  clear: () => void
}

/**
 * Client state for the cart. The product catalog (server state) lives in
 * useProducts via TanStack Query.
 */
export const useCartStore = create<CartStore>((set) => ({
  lines: [],

  addItem: (product) => {
    set((state) => {
      const existing = state.lines.find(line => line.id === product.id)
      if (existing) {
        return {
          lines: state.lines.map(line =>
            line.id === product.id ? { ...line, qty: line.qty + 1 } : line,
          ),
        }
      }
      return {
        lines: [...state.lines, { id: product.id, title: product.title, price: product.price, qty: 1 }],
      }
    })
  },

  incrementQty: (id) => {
    set((state) => {
      const line = state.lines.find(item => item.id === id)
      if (line) {
        line.qty += 1
      }
      return { lines: state.lines }
    })
  },

  decrementQty: (id) => {
    set((state) => ({
      lines: state.lines
        .map(line => (line.id === id ? { ...line, qty: line.qty - 1 } : line))
        .filter(line => line.qty > 0),
    }))
  },

  removeLine: (id) => {
    set((state) => {
      const next = [...state.lines]
      next.splice(id, 1)
      return { lines: next }
    })
  },

  clear: () => set({ lines: [] }),
}))
