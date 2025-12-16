'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Product, products } from '@/lib/data'


interface SearchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onProductSelect: (product: Product) => void
}

export default function SearchDialog({ open, onOpenChange, onProductSelect }: SearchDialogProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts([])
            return
        }

        const query = searchQuery.toLowerCase().trim()
        const results = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        )
        setFilteredProducts(results.slice(0, 10)) // Ограничиваем результаты
    }, [searchQuery])

    const handleProductClick = (product: Product) => {
        onProductSelect(product)
        onOpenChange(false)
        setSearchQuery('')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Поиск товаров</DialogTitle>
                </DialogHeader>

                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Найти пиццу, роллы, напитки..."
                        className="pl-10 pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                    {searchQuery && (
                        <X
                            className="absolute right-3 top-3 h-4 w-4 cursor-pointer text-muted-foreground"
                            onClick={() => setSearchQuery('')}
                        />
                    )}
                </div>

                <div className="max-h-60 overflow-y-auto">
                    {searchQuery && filteredProducts.length === 0 && (
                        <p className="p-4 text-center text-muted-foreground">Ничего не найдено</p>
                    )}

                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer rounded-lg"
                            onClick={() => handleProductClick(product)}
                        >
                            <div className="flex-1">
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{product.price} ₽</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}