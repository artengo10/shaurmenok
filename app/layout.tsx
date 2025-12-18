import { ThemeProvider } from '../components/ui/theme-provider'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import './globals.css'
import { SearchProvider } from '../lib/contexts/search-context'
import { Toaster } from '../components/ui/sonner'
import { Comfortaa } from 'next/font/google'
import FooterMap from '../components/layout/FooterMap'
import { SimplePromoBanner } from '../components/ui/simple-promo-banner' // ← Заменяем на новый компонент

// Настройка шрифта Comfortaa
const comfortaa = Comfortaa({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Шаурмёнок | Доставка шаурмы и донера в Нижнем Новгороде',
    template: '%s | Шаурмёнок'
  },
  description: 'Шаурмёнок - лучшая шаурма в Нижнем Новгороде. Свежие ингредиенты, мясо на гриле, быстрая доставка и самовывоз.',
  keywords: 'шаурма, доставка шаурмы, донер, фастфуд, шаурменок, еда на вынос, Нижний Новгород',
  openGraph: {
    title: 'Шаурмёнок - вкусная шаурма с доставкой',
    description: 'Закажите самую вкусную шаурму в Нижнем Новгороде! Быстрая доставка, свежие ингредиенты.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={comfortaa.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SearchProvider>
            <Header />
            <main className="flex-1">{children}</main>
            {/* Добавляем карту на все страницы */}
            <FooterMap />
            <Footer />
            <Toaster />
            <SimplePromoBanner /> {/* ← Добавляем всплывающее уведомление */}
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}