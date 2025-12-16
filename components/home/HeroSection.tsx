'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
    onMenuClick: () => void
}

export default function HeroSection({ onMenuClick }: HeroSectionProps) {
    return (
        <section className="relative min-h-[520px] md:min-h-[720px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900/15 via-orange-900/10 to-amber-800/20">
            {/* Фоновая картинка */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/banner/shawarma-banner.jpg"
                    alt="Вкуснейшая шаурма в Шаурменке"
                    fill
                    className="object-cover scale-105"
                    priority
                    quality={90}
                />
            </div>

            {/* Градиентное затемнение с улучшенной читаемостью */}
            <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/70 via-black/45 to-black/25 md:bg-gradient-to-br md:from-black/65 md:via-black/35 md:to-transparent" />

            <div className="container relative z-10 px-5 md:px-6">
                <div className="max-w-2xl mx-auto text-center animate-fade-in-up py-14 md:py-20">
                    {/* Логотип/Название */}
                    <div className="mb-8 md:mb-12 space-y-3">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl tracking-tight leading-tight">
                            ШАУРМЁНОК
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-amber-200 font-semibold drop-shadow-lg">
                            Настоящая шаурма с мясом на гриле
                        </p>
                    </div>

                    {/* Контактная информация */}
                    <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
                        <a
                            href="tel:+79991234567"
                            className="text-xl sm:text-2xl md:text-3xl text-white hover:text-amber-300 transition-colors font-bold drop-shadow-lg block hover:scale-105 transform duration-200"
                        >
                            +7 (999) 123-45-67
                        </a>
                        <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-5 py-3 border border-amber-400/40">
                            <span className="text-base sm:text-lg md:text-xl text-white/95 font-medium drop-shadow">
                                ул. Ефремова, 3в, Нижний Новгород
                            </span>
                        </div>
                    </div>

                    {/* Кнопка призыва к действию */}
                    <div className="mb-10 md:mb-12 px-2">
                        <Button
                            size="lg"
                            onClick={onMenuClick}
                            className="text-lg px-12 py-7 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold rounded-2xl transform hover:-translate-y-1 active:translate-y-0 min-h-[60px] md:min-h-[68px]"
                        >
                            <span className="drop-shadow">Выбрать шаурму</span>
                        </Button>
                    </div>

                    {/* Преимущества */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-5 mb-8 px-2">
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-5 py-3 border border-amber-500/40 shadow-lg">
                            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse" />
                            <span className="font-semibold text-white text-sm sm:text-base">Готовим за 5 минут</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-5 py-3 border border-amber-500/40 shadow-lg">
                            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                            <span className="font-semibold text-white text-sm sm:text-base">Мясо на гриле</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-5 py-3 border border-amber-500/40 shadow-lg">
                            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                            <span className="font-semibold text-white text-sm sm:text-base">Доставка 24/7</span>
                        </div>
                    </div>

                    {/* Время работы */}
                    <div className="bg-gradient-to-r from-black/30 to-black/20 backdrop-blur-sm rounded-xl p-4 mx-auto max-w-sm border border-white/10">
                        <p className="text-white/90 text-sm md:text-base font-medium">
                            🕒 Работаем <span className="text-amber-300">с 10:00 до 23:00</span> • Без выходных
                        </p>
                    </div>
                </div>
            </div>

            {/* Декоративный элемент внизу */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-amber-900/20 to-transparent z-5"></div>
        </section>
    )
}