'use client'

import Link from 'next/link'
import { Phone, MapPin, MessageCircle } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-muted/80 border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-6 md:py-8">

                {/* Мобильная версия - контакты и часы работы в ряд */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Контакты */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Контакты</h4>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3 text-primary flex-shrink-0" />
                                    <span className="text-xs text-muted-foreground">+7 (969) 625-20-20</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3 text-primary flex-shrink-0" />
                                    <span className="text-xs text-muted-foreground">+7 (831) 2-146-114</span>
                                </div>
                                <div className="flex items-start gap-1">
                                    <MapPin className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-xs text-muted-foreground">ул. Исполкома, 6/2</span>
                                </div>
                            </div>
                        </div>

                        {/* Часы работы */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Часы работы</h4>
                            <div className="space-y-1 text-xs text-muted-foreground">
                                <div className="flex justify-between gap-1">
                                    <span>Пн-Чт:</span>
                                    <span className="font-medium">10-23</span>
                                </div>
                                <div className="flex justify-between gap-1">
                                    <span>Пт-Сб:</span>
                                    <span className="font-medium">10-00</span>
                                </div>
                                <div className="flex justify-between gap-1">
                                    <span>Вс:</span>
                                    <span className="font-medium">10-22</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Десктопная версия */}
                <div className="hidden md:grid md:grid-cols-3 gap-8">

                    {/* Лого и описание */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">Кафе «Уголок Вкуса»</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Уютное кафе с доставкой в Нижнем Новгороде.
                            Готовим с любовью и вниманием к деталям.
                        </p>
                    </div>

                    {/* Контакты */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Контакты</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">+7 (969) 625-20-20</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">+7 (831) 2-146-114</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">ул. Исполкома, 6/2</span>
                            </div>
                        </div>
                    </div>

                    {/* Часы работы - ДЕСКТОПНАЯ ВЕРСИЯ */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Часы работы</h4>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <div className="flex justify-between gap-2"> {/* Уменьшили gap-4 до gap-2 */}
                                <span>Пн-Чт:</span>
                                <span className="font-medium">10:00 - 23:00</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span>Пт-Сб:</span>
                                <span className="font-medium">10:00 - 00:00</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span>Вс:</span>
                                <span className="font-medium">10:00 - 22:00</span>
                            </div>
                        </div>
                    </div>
                    

                </div>

                {/* Соцсети и навигация - общее для обеих версий */}
                <div className="border-t border-border/50 mt-6 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Навигация */}
                        <nav className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Главная
                            </Link>
                            <Link href="/#menu-section" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Меню
                            </Link>
                            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                О нас
                            </Link>
                            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Контакты
                            </Link>
                        </nav>

                        {/* Соцсети */}
                        <div className="flex justify-center md:justify-end gap-3">
                            <a
                                href="https://t.me/ваш_телеграм"
                                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-border/20"
                                aria-label="Telegram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Нижняя часть - копирайт */}
                <div className="border-t border-border/50 mt-4 pt-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-center">
                        <p className="text-xs text-muted-foreground">
                            © {currentYear} Кафе «Уголок Вкуса». Все права защищены.
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                            <Link href="/privacy" className="hover:text-foreground transition-colors">
                                Политика конфиденциальности
                            </Link>
                            <Link href="/terms" className="hover:text-foreground transition-colors">
                                Условия использования
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}