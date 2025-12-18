'use client'

import { useState } from 'react'

interface CategoryFilterProps {
    selectedCategory: string
    selectedSubcategory?: string
    onCategoryChange: (category: string, subcategory?: string) => void
}

// Основные категории
const mainCategories = [
    { id: 'main', name: 'Основное меню', hasSubcategories: true, icon: '🍽️' },
    { id: 'sets', name: 'Сеты', hasSubcategories: false, icon: '📦' },
    { id: 'promotions', name: 'Акции', hasSubcategories: false, icon: '🔥' },
]

// Подкатегории для "Основного меню"
const subcategories = [
    { id: '', name: 'Все', icon: '📋' },
    { id: 'shawarma', name: 'Шаурма', icon: '🌯' },
    { id: 'doner', name: 'Донар', icon: '🥙' },
    { id: 'shawarma-new', name: 'Новинки', icon: '⭐' },
    { id: 'shashlik', name: 'Шашлык', icon: '🍖' },
    { id: 'sides', name: 'Картошка', icon: '🍟' },
    { id: 'sauces', name: 'Гарниры/Соусы', icon: '🥫' },
    
]

export default function CategoryFilter({
    selectedCategory,
    selectedSubcategory,
    onCategoryChange
}: CategoryFilterProps) {
    const [showSubcategories, setShowSubcategories] = useState(false)

    const handleMainCategoryClick = (categoryId: string) => {
        if (categoryId === 'main') {
            const newShowState = !showSubcategories
            setShowSubcategories(newShowState)

            // При первом открытии показываем все товары
            if (newShowState && selectedCategory !== 'main') {
                onCategoryChange('main', '')
            }
        } else {
            setShowSubcategories(false)
            onCategoryChange(categoryId)
        }
    }

    const handleSubcategoryClick = (subcategoryId: string) => {
        onCategoryChange('main', subcategoryId)
    }

    return (
        <div className="mb-8 px-2">
            {/* Основная категория "Основное меню" ВВЕРХУ */}
            <div className="flex flex-col gap-2 mb-4">
                {/* Кнопка "Основное меню" - всегда видна */}
                <button
                    onClick={() => handleMainCategoryClick('main')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm sm:text-base transition-all whitespace-nowrap font-semibold w-full justify-center ${selectedCategory === 'main'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
                        }`}
                >
                    <span className="text-lg">🍽️</span>
                    <span>Основное меню</span>
                    <span className="text-xs ml-1">
                        {showSubcategories && selectedCategory === 'main' ? '▲' : '▼'}
                    </span>
                </button>

                {/* Подкатегории ПОД "Основным меню", но НАД остальными категориями */}
                {selectedCategory === 'main' && showSubcategories && (
                    <div className="animate-fade-in bg-white dark:bg-gray-900 p-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-2">
                        <div className="text-center mb-2">
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                Выберите тип:
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1.5">
                            {subcategories.map(sub => (
                                <button
                                    key={sub.id || 'all'}
                                    onClick={() => handleSubcategoryClick(sub.id)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${selectedSubcategory === sub.id
                                            ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600'
                                            : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                        }`}
                                >
                                    <span className="text-xs">{sub.icon}</span>
                                    <span>{sub.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Остальные основные категории ("Сеты", "Акции") - ТЕПЕРЬ НИЖЕ подкатегорий */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-2">
                    {mainCategories
                        .filter(cat => cat.id !== 'main') // Исключаем "Основное меню"
                        .map(category => (
                            <button
                                key={category.id}
                                onClick={() => handleMainCategoryClick(category.id)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm sm:text-base transition-all whitespace-nowrap font-semibold w-full sm:w-auto justify-center ${selectedCategory === category.id
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
                                    }`}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span>{category.name}</span>
                            </button>
                        ))}
                </div>
            </div>

            {/* Индикатор выбранной категории */}
            {selectedCategory === 'main' && selectedSubcategory && (
                <div className="text-center mt-2">
                    <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full">
                        <span className="text-xs font-medium text-amber-800 dark:text-amber-300">
                            Выбрано: {subcategories.find(s => s.id === selectedSubcategory)?.name || 'Все'}
                        </span>
                        <button
                            onClick={() => onCategoryChange('main', '')}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}