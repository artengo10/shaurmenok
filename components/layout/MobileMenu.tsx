'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Home, Info, Phone } from 'lucide-react'

export default function MobileMenu() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden h-9 w-9">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-sm">
                <div className="flex flex-col h-full">
                    {/* Заголовок */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <h2 className="text-xl font-semibold">Меню</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setOpen(false)}
                            className="h-8 w-8"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Навигация */}
                    <nav className="flex-1 py-6">
                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                <Home className="h-5 w-5" />
                                <span className="font-medium">Главная</span>
                            </Link>

                            <Link
                                href="/about"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                <Info className="h-5 w-5" />
                                <span className="font-medium">О нас</span>
                            </Link>

                            <Link
                                href="/contact"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                <Phone className="h-5 w-5" />
                                <span className="font-medium">Контакты</span>
                            </Link>
                        </div>
                    </nav>

                    {/* Дополнительная информация */}
                    <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground text-center">
                            Шаурмёнок
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}