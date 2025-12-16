'use client'

import { Product } from '@/lib/data/index'
import ProductCard from './ProductCard'

interface ProductGridProps {
    products: Product[]
    onProductSelect: (product: Product) => void
    onAddToCart: (product: Product & { quantity?: number }) => void
}

export default function ProductGrid({ products, onProductSelect, onAddToCart }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1 sm:gap-2 md:gap-4 lg:gap-4">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onProductSelect}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    )
}