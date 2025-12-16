'use client'

import { createContext, useContext, useState } from 'react'
import { Product } from '@/lib/data'

interface SearchContextType {
    selectedProduct: Product | null
    setSelectedProduct: (product: Product | null) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    return (
        <SearchContext.Provider value={{ selectedProduct, setSelectedProduct }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}