import SectionCard from '@/components/ui/section-card'

export default function About() {
    return (
        <div className="container mx-auto px-4 py-8">
            <SectionCard>
                <h1 className="text-3xl font-bold mb-6">О нашем кафе</h1>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Почему мы?</h2>
                        <p className="text-muted-foreground mb-4">
                            Мы открылись в 2024 году, весной. С целью создавать вкусную и качественную еду для наших гостей.
                            Все наши блюда готовятся из свежих продуктов ежедневно.
                        </p>
                        <p className="text-muted-foreground">
                            Мы используем только качественные ингредиенты: свежие овощи, отборное мясо,
                            натуральные соусы и свежую рыбу для роллов.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Часы работы</h2>
                        <ul className="text-muted-foreground space-y-2">
                            <li>Пн-Чт: 10:00 - 23:00</li>
                            <li>Пт-Сб: 10:00 - 00:00</li>
                            <li>Вс: 10:00 - 22:00</li>
                        </ul>
                    </div>
                </div>
            </SectionCard>
        </div>
    )
}