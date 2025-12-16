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
    default: 'Кафе Уголок Вкуса | Доставка пиццы, роллов, бургеров',
    template: '%s | Кафе Уголок Вкуса'
  },
  description: 'Кафе Уголок Вкуса - доставка вкусной пиццы, свежих роллов, сочных бургеров и других блюд. Быстрая доставка по городу и самовывоз.',
  keywords: 'пицца, роллы, бургеры, доставка еды, кафе, уголок вкуса',
  openGraph: {
    title: 'Кафе Уголок Вкуса',
    description: 'Доставка вкусной пиццы, роллов и бургеров',
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