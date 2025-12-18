'use client'

import { useState, useRef, useEffect } from 'react'
import { HeroSection, DeliveryInfo } from '@/components/home'
import { ProductModal, ProductGrid, CategoryFilter } from '@/components/products'
import { useCartStore } from '@/lib/stores/cart-store'
import { products, Product } from '@/lib/data'
import { useSearch } from '@/lib/contexts/search-context'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('main')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null) // Изменено на null
  const addItem = useCartStore((state) => state.addItem)
  const { selectedProduct, setSelectedProduct } = useSearch()

  const menuSectionRef = useRef<HTMLDivElement>(null)

  // ПРАВИЛЬНАЯ ФИЛЬТРАЦИЯ:
  const filteredProducts = selectedCategory === 'main'
    ? selectedSubcategory
      ? products.filter(product =>
        product.category === 'main' &&
        product.subcategory === selectedSubcategory
      )
      : products.filter(product => product.category === 'main') // Показываем ВСЕ товары main
    : products.filter(product => product.category === selectedCategory)

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleAddToCart = (product: Product & { quantity?: number }) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1
    })
  }

  // Изменяем логику выбора категории
  const handleCategoryChange = (category: string, subcategory?: string) => {
    setSelectedCategory(category)
    // Если передана подкатегория - устанавливаем, иначе сбрасываем
    if (subcategory) {
      setSelectedSubcategory(subcategory)
    } else {
      setSelectedSubcategory(null)
    }
  }

  useEffect(() => {
    if (selectedProduct) {
      setIsModalOpen(true)
    }
  }, [selectedProduct])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <>
      <HeroSection onMenuClick={scrollToMenu} />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <DeliveryInfo />

        <section ref={menuSectionRef} id="menu-section" className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Меню Шаурменка
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            {selectedCategory === 'main' && !selectedSubcategory && 'Все позиции основного меню'}
            {selectedCategory === 'main' && selectedSubcategory && `Выбран: ${getSubcategoryName(selectedSubcategory)}`}
            {selectedCategory === 'sets' && 'Готовые сеты по выгодной цене'}
            {selectedCategory === 'promotions' && 'Специальные предложения и акции'}
          </p>
        </section>

        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory || undefined}
          onCategoryChange={handleCategoryChange}
        />

        {/* Отображаем количество товаров */}
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Найдено: <span className="font-bold text-primary">{filteredProducts.length}</span> позиций
          </p>
        </div>

        <ProductGrid
          products={filteredProducts}
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
        />
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}

// Вспомогательная функция для получения имени подкатегории
function getSubcategoryName(subcategory: string): string {
  const names: Record<string, string> = {
    'shawarma': 'Шаурма',
    'doner': 'Донер',
    'shawarma-new': 'Новинки',
    'shashlik': 'Шашлык',
    'sides': 'Картошка',
    'sauces': 'Соусы',
    'sets': 'Сеты'
  }
  return names[subcategory] || subcategory
}