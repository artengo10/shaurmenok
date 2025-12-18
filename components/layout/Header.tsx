'use client'


import { Product } from '@/lib/data'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Sun, Moon, Search, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCartStore } from '@/lib/stores/cart-store'
import Cart from '@/components/cart/Cart'
import SearchDialog from '@/components/search/SearchDialog'
import { useSearch } from '@/lib/contexts/search-context'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

// Массив навигационных ссылок
const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О нас' },
  { href: '/contact', label: 'Контакты' },
]

export default function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const totalItems = useCartStore((state) => state.totalItems())
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { setSelectedProduct } = useSearch()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const handleSearchSelect = (product: Product) => {
    setSelectedProduct(product)
    setIsSearchOpen(false)
  }

  // Функция для проверки активной ссылки
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">
          {/* Логотип и мобильное меню */}
          <div className="flex items-center gap-4">
            {/* Бургер-меню для мобильных */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetTitle className="sr-only">Меню навигации</SheetTitle>
                <div className="flex flex-col h-full py-6">
                  <div className="flex justify-between items-center mb-8 px-4">
                  </div>

                  <nav className="flex-1 space-y-3 px-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 text-lg font-medium hover:bg-accent rounded-lg transition-colors",
                          isActive(item.href) && "bg-accent text-foreground font-semibold"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/#menu-section"
                      className="block px-4 py-3 text-lg font-medium hover:bg-accent rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Меню
                    </Link>
                  </nav>

                  <div className="border-t border-border mt-8 pt-6 px-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Кафе «Уголок Вкуса» №1
                    </p>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      ул. Исполкома, 6/2, Нижний Новгород
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-23 h-18">
                <Image
                  src="/logo.png"
                  alt="Кафе Уголок Вкуса"
                  fill
                  priority={true}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-primary hidden sm:block">
                Шаурмёнок
              </span>
            </Link>
          </div>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-6 ">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    isActive(item.href) && "text-foreground font-semibold bg-accent"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9" // ← УБРАТЬ hidden sm:flex
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Переключить тему</span>
            </Button>

            <Button
        
              className="h-9 w-9 relative"
              size="icon"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-foreground text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-primary">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {mounted && (
        <>
          <Cart open={isCartOpen} onOpenChange={setIsCartOpen} />
          <SearchDialog
            open={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            onProductSelect={handleSearchSelect}
          />
        </>
      )}
    </>
  )
}