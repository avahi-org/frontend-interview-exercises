import { useQuery } from '@tanstack/react-query'

export interface Product {
  id: number
  title: string
  price: number
  /** Lowercase category slug, e.g. 'electronics' | 'books' | 'home'. */
  category: string
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json() as Promise<Product[]>
}

export const productsQueryKey = ['products'] as const

/**
 * Server state for the product catalog.
 * Backed by MSW: handlers live in ./mocks/handlers.ts and run in both
 * the test runner (node) and the browser (dev) via the service worker.
 */
export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
  })
}
