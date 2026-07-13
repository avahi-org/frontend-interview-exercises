import { useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { useCartStore } from './cart.store'
import { formatPrice } from './formatPrice'

const PROMO_CODE = 'SAVE10'
const DISCOUNT_MIN_ITEMS = 5

export function CartPanel() {
  const lines = useCartStore(state => state.lines)
  const incrementQty = useCartStore(state => state.incrementQty)
  const decrementQty = useCartStore(state => state.decrementQty)
  const removeLine = useCartStore(state => state.removeLine)
  const clear = useCartStore(state => state.clear)

  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = lines.reduce((sum, line) => sum + line.price, 0)
  const itemCount = lines.reduce((count, line) => count + line.qty, 0)

  const qualifiesForDiscount = itemCount > DISCOUNT_MIN_ITEMS
  const discount = promoApplied && qualifiesForDiscount ? subtotal * 0.1 : 0
  const total = subtotal - discount

  if (lines.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Your cart is empty. Add a product to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Your cart</CardTitle>
        <Button variant="ghost" size="sm" onClick={clear}>Clear</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {lines.map(line => (
            <li key={line.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{line.title}</p>
                <p className="text-xs text-muted-foreground">{formatPrice(line.price)} each</p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  aria-label={`Decrease ${line.title}`}
                  onClick={() => decrementQty(line.id)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  aria-label={`Increase ${line.title}`}
                  onClick={() => incrementQty(line.id)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  aria-label={`Remove ${line.title}`}
                  onClick={() => removeLine(line.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-2 border-t pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={event => setPromoInput(event.target.value)}
              placeholder="Promo code"
              className="h-8 flex-1 rounded-md border border-input bg-background px-3 text-sm"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPromoApplied(promoInput.trim().toUpperCase() === PROMO_CODE)}
            >
              Apply
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Use code
            {' '}
            <span className="font-mono font-semibold">{PROMO_CODE}</span>
            {' '}
            for 10% off orders of
            {' '}
            {DISCOUNT_MIN_ITEMS}
            {' '}
            items or more.
          </p>
        </div>

        <div className="space-y-1 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span className="tabular-nums">
                -
                {formatPrice(discount)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
