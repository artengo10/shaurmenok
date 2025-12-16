'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, ChefHat } from 'lucide-react'

export default function MrCornerError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Аватар мистера Уголка */}
                <div className="relative">
                    <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <ChefHat className="h-16 w-16 text-primary-foreground" />
                    </div>
                    <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center absolute -top-2 -right-2">
                        <span className="text-destructive-foreground text-2xl">😢</span>
                    </div>
                </div>

                {/* Текст */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                        Ой-ой-ой!
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Мистер Уголок Вкуса крайне сожалеет, но этой страницы не существует.
                    </p>
                    <p className="text-muted-foreground">
                        Возможно, вы искали что-то вкусненькое, но забрели не туда?
                    </p>
                </div>

                {/* Кнопки */}
                <div className="space-y-4 pt-4">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            Вернуться на главную
                        </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                        <Link href="/#menu-section" className="flex items-center gap-2">
                            <ChefHat className="h-5 w-5" />
                            Посмотреть меню
                        </Link>
                    </Button>
                </div>

                {/* Милое сообщение */}
                <div className="pt-8">
                    <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">P.S.</span> Не расстраивайтесь!
                            Пока вы здесь, мы приготовим для вас что-то особенное 🍕
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}