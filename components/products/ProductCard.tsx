'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coffee, Star, Flame, Badge } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/data/products.types'

interface ProductCardProps {
    product: Product
    onSelect: (product: Product) => void
    onAddToCart: (product: Product & { quantity?: number }) => void
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
    const [quantity, setQuantity] = useState(1)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onAddToCart({ ...product, quantity })
    }

    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation()
        setQuantity(prev => prev + 1)
    }

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const renderSizeInfo = () => {
        if (product.weight && product.unit) {
            return `${product.weight} ${product.unit}`
        }
        return null
    }

    // Бейджи для товаров
    const renderBadge = () => {
        if (product.badge === 'new') {
            return (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                    <Star size={10} /> NEW
                </div>
            )
        }
        if (product.badge === 'hit') {
            return (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                    <Flame size={10} /> ХИТ
                </div>
            )
        }
        if (product.badge === 'recommended') {
            return (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                    <Badge size={10} /> TOP
                </div>
            )
        }
        return null
    }

    // Для акционных товаров
    const renderDiscount = () => {
        if (product.isPromotion && product.originalPrice) {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            return (
                <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    -{discount}%
                </div>
            )
        }
        return null
    }

    // Для сетов - отображение состава
    const renderSetInfo = () => {
        if (product.category === 'sets' && product.setIncludes) {
            return (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                        Входит в сет:
                    </p>
                    <ul className="text-xs text-gray-500 dark:text-gray-400">
                        {product.setIncludes.slice(0, 2).map((item, index) => (
                            <li key={index} className="flex items-center gap-1">
                                <span className="text-green-500">✓</span> {item}
                            </li>
                        ))}
                        {product.setIncludes.length > 2 && (
                            <li className="text-gray-400 text-xs">
                                +{product.setIncludes.length - 2} more...
                            </li>
                        )}
                    </ul>
                </div>
            )
        }
        return null
    }

    return (
        <Card
            className="cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] h-full flex flex-col relative overflow-hidden border border-gray-200 dark:border-gray-800"
            onClick={() => onSelect(product)}
        >
            {/* Бейджи */}
            {renderBadge()}
            {renderDiscount()}

            <CardHeader className="p-3 flex-1">
                {/* Изображение товара */}
                <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div>
                    )}
                    {product.image && !imageError ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    ) : (
                        <Coffee className="h-10 w-10 text-gray-400" />
                    )}
                </div>

                {/* Название и описание */}
                <CardTitle className="text-sm sm:text-base font-bold leading-tight line-clamp-2">
                    {product.name}
                </CardTitle>

                {renderSizeInfo() && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {renderSizeInfo()}
                    </div>
                )}

                <CardDescription className="text-xs sm:text-sm line-clamp-2 mt-2">
                    {product.description}
                </CardDescription>

                {/* Информация о сете */}
                {renderSetInfo()}
            </CardHeader>

            <CardContent className="p-3 pt-0">
                <div className="flex flex-col gap-2">
                    {/* Цена */}
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                {product.price} ₽
                            </span>
                            {product.isPromotion && product.originalPrice && (
                                <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                                    {product.originalPrice} ₽
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Счетчик и кнопка */}
                    <div className="flex flex-col gap-2">
                        {/* Счетчик */}
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={handleDecrement}
                            >
                                -
                            </Button>

                            <span className="text-sm font-semibold min-w-[2rem] text-center text-gray-800 dark:text-gray-200">
                                {quantity}
                            </span>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </div>

                        {/* Кнопка "Добавить" */}
                        <Button
                            onClick={handleAddToCartClick}
                            size="sm"
                            className="w-full text-xs sm:text-sm h-9 font-medium bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-md"
                        >
                            Добавить
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}