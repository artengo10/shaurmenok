'use client'

import { useState, useEffect } from 'react'
import { X, Pizza } from 'lucide-react'

export function SimplePromoBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Показываем баннер через 7 секунд
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  // Не рендерим пока компонент не смонтирован и не прошло 7 секунд
  if (!mounted || !isVisible) return null

  return (
    <>
      {/* Для мобилок - сверху с анимацией */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="bg-gray-800/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-gray-800 p-3 shadow-lg rounded-b-2xl border border-gray-700/60 dark:border-white/60 mx-4 mt-2 animate-in slide-in-from-top duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="bg-green-500/20 p-1.5 rounded-full">
                <Pizza size={16} className="text-green-400 dark:text-green-600" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold block">🍕 Акция!</span>
                <span className="text-xs text-gray-300 dark:text-gray-600">Добавили новые акции !</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-300 dark:text-gray-500 hover:bg-gray-700/50 dark:hover:bg-gray-200/50 p-1 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Для ПК - снизу с анимацией */}
      <div className="hidden md:block fixed bottom-4 right-4 z-50">
        <div className="bg-gray-800/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-gray-800 p-4 shadow-xl rounded-2xl border border-gray-700/60 dark:border-white/60 max-w-sm animate-in slide-in-from-right duration-500 fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-green-500/20 p-2 rounded-full flex-shrink-0">
              <Pizza size={20} className="text-green-400 dark:text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-sm mb-1">🎉 Специальная акция!</h3>
                <button
                  onClick={handleClose}
                  className="text-gray-300 dark:text-gray-500 hover:bg-gray-700/50 dark:hover:bg-gray-200/50 p-1 rounded-full transition-colors flex-shrink-0 ml-2"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-300 dark:text-gray-600 mb-3">
                Закажите <strong>2 любые пиццы</strong> и получите <strong>мини пиццу в подарок</strong>
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-xs font-medium transition-colors duration-300 transform hover:scale-[1.02]"
              >
                Понятно, спасибо!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}