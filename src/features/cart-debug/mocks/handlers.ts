import { http, HttpResponse } from 'msw'
import type { Product } from '../useProducts'

/**
 * Seed catalog. Categories are lowercase slugs on purpose — the UI filter
 * has to account for that.
 */
export const mockProducts: Product[] = [
  { id: 1, title: 'Wireless Headphones', price: 79.99, category: 'electronics' },
  { id: 2, title: 'Mechanical Keyboard', price: 119.0, category: 'electronics' },
  { id: 3, title: 'USB-C Hub', price: 34.5, category: 'electronics' },
  { id: 4, title: 'Clean Code', price: 32.5, category: 'books' },
  { id: 5, title: 'The Pragmatic Programmer', price: 41.0, category: 'books' },
  { id: 6, title: 'Ceramic Mug', price: 14.0, category: 'home' },
  { id: 7, title: 'Desk Lamp', price: 39.99, category: 'home' },
]

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts)
  }),
]
