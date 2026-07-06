import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { ProductGrid } from './ProductGrid'
import { CartPanel } from './CartPanel'
import { useCartStore } from './cart.store'

export function CartDebug() {
  const lines = useCartStore(state => state.lines)
  const itemCount = lines.reduce((count, line) => count + line.qty, 0)

  const [badgeCount, setBadgeCount] = useState(0)
  useEffect(() => {
    setBadgeCount(itemCount)
  }, [])

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Storefront</h2>
          <p className="text-sm text-muted-foreground">Add products and review your cart.</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <ShoppingCart className="h-4 w-4" />
          <span className="tabular-nums">{badgeCount}</span>
          <span className="text-muted-foreground">items</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <ProductGrid />
        <div className="lg:sticky lg:top-8 lg:self-start">
          <CartPanel />
        </div>
      </div>
    </div>
  )
}
