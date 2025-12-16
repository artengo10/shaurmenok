'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Coffee, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/data'

interface ProductModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
    onAddToCart: (product: Product & { quantity: number }) => void
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    if (!product) return null

    const handleIncrement = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleAddToCart = () => {
        onAddToCart({ ...product, quantity })
        onClose() // Закрываем окно после добавления
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="
                w-[95vw] max-w-[95vw] mx-2 p-0
                sm:w-full sm:max-w-md sm:mx-auto sm:p-6
                rounded-xl sm:rounded-2xl
                h-[70vh] max-h-[70vh] overflow-y-auto
                sm:h-auto sm:max-h-[90vh]
            ">
                <DialogHeader className="p-4 sm:p-0">
                    <DialogTitle className="text-lg sm:text-xl font-semibold">
                        {product.name}
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm">
                        {product.category === 'main' && product.subcategory ?
                            getSubcategoryName(product.subcategory) :
                            product.category === 'sets' ? 'Сет' : 'Акция'
                        }
                    </DialogDescription>
                </DialogHeader>

                {/* Изображение товара */}
                <div className="w-full h-48 sm:h-56 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 mx-0 flex items-center justify-center relative">
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div>
                    )}
                    {product.image && !imageError ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain rounded-lg"
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            sizes="(max-width: 640px) 95vw, 400px"
                            priority
                        />
                    ) : (
                        <Coffee className="h-14 w-14 text-gray-400" />
                    )}
                </div>

                {/* Описание товара */}
                <div className="px-4 sm:px-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        {product.description}
                    </p>

                    {/* Информация о весе */}
                    {product.weight && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                            {product.weight} {product.unit || 'г'}
                        </div>
                    )}

                    {/* Для сетов: состав */}
                    {product.category === 'sets' && product.setIncludes && (
                        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Входит в сет:
                            </p>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                {product.setIncludes.slice(0, 3).map((item, index) => (
                                    <li key={index} className="flex items-center gap-1">
                                        <span className="text-green-500">✓</span> {item}
                                    </li>
                                ))}
                                {product.setIncludes.length > 3 && (
                                    <li className="text-gray-500 text-xs">
                                        + ещё {product.setIncludes.length - 3} позиций
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Для акций: скидка */}
                    {product.isPromotion && product.originalPrice && (
                        <div className="mb-4 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                                <span className="text-xs line-through text-gray-500">
                                    {product.originalPrice} ₽
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Счетчик количества */}
                <div className="px-4 sm:px-0 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Количество:</span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDecrement}
                                disabled={quantity <= 1}
                                className="h-8 w-8 p-0"
                            >
                                <Minus className="h-3 w-3" />
                            </Button>

                            <span className="text-base font-bold min-w-8 text-center">
                                {quantity}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleIncrement}
                                className="h-8 w-8 p-0"
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Итоговая цена и кнопка добавления */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 sm:p-0 sm:border-0 sm:bg-transparent">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-center sm:text-left">
                            <div className="text-lg sm:text-xl font-bold text-primary">
                                {product.price * quantity} ₽
                            </div>
                            {quantity > 1 && (
                                <div className="text-xs text-gray-500">
                                    {product.price} ₽ × {quantity}
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleAddToCart}
                            size="lg"
                            className="
                                w-full sm:w-auto
                                bg-linear-to-r from-amber-500 to-orange-600
                                hover:from-amber-600 hover:to-orange-700
                                text-white font-medium
                                py-3 sm:py-2
                                text-base sm:text-sm
                            "
                        >
                            Добавить в корзину
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Вспомогательная функция для получения названия подкатегории
function getSubcategoryName(subcategory: string): string {
    const names: Record<string, string> = {
        'shawarma': 'Шаурма',
        'doner': 'Донер',
        'shawarma-new': 'Новинка',
        'shashlik': 'Шашлык',
        'sides': 'Гарнир',
        'sauces': 'Соус'
    }
    return names[subcategory] || subcategory
}