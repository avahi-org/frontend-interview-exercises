import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { useProducts } from './useProducts'
import { useCartStore } from './cart.store'
import { formatPrice } from './formatPrice'

const CATEGORIES = ['All', 'Electronics', 'Books', 'Home']

export function ProductGrid() {
  const { data: products, isLoading, isError } = useProducts()
  const addItem = useCartStore(state => state.addItem)
  const [category, setCategory] = useState('All')

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  if (isError || !products) {
    return (
      <div className="rounded-lg border border-destructive p-6 text-center text-sm text-destructive">
        Failed to load products. Please try again.
      </div>
    )
  }

  const visibleProducts
    = category === 'All'
      ? products
      : products.filter(product => product.category === category)

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <Button
            key={cat}
            size="sm"
            variant={category === cat ? 'default' : 'outline'}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {visibleProducts.length === 0
        ? (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No products in this category.
            </p>
          )
        : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {visibleProducts.map(product => (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-base">{product.title}</CardTitle>
                    <p className="text-sm capitalize text-muted-foreground">{product.category}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" onClick={() => addItem(product)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
    </div>
  )
}
