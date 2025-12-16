'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/stores/cart-store'

export default function CartItemsList() {
    const { items, removeItem, updateQuantity } = useCartStore()

    if (items.length === 0) {
        return (
            <p className="text-muted-foreground text-center py-8">
                Корзина пуста
            </p>
        )
    }

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-base truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.price} ₽ × {item.quantity}</p>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        <div className="flex items-center gap-2 bg-muted rounded-md p-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                -
                            </Button>

                            <span className="w-8 text-center font-medium">{item.quantity}</span>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}