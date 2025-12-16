'use client'

import { useState } from 'react'
import { Star, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Review {
    id: number
    name: string
    rating: number
    comment: string
    date: string
}

const sampleReviews: Review[] = [
    {
        id: 1,
        name: 'Даниил Шишков',
        rating: 5,
        comment: 'Очень вкусно, всегда большие порции. Беру суп с бараниной, для меня это самый вкусный суп. Плов с говядиной тоже очень вкусный, порция большая, мяса много.Чай тут очень вкусный.Кутаб взяли с собой, так объелись, что не смогли осилить) ',
        date: '25.03.2025'
    },
    {
        id: 2,
        name: 'Анна Иванова',
        rating: 5,
        comment: 'Это кафе с кавказской кухней. Здесь готовят вкусно, всё свежее. Понравился суп с фрикадельками и кебаб. Зал просторный и чистый. Есть столики для двоих и на компанию. Можно спеть в караоке. В меню есть шаурма, шашлык и пицца. Девушка на кассе приветливая, что очень радует!) Спасибо за обслуживание!',
        date: '19.02.2025'
    },
    {
        id: 3,
        name: 'Яна Демьянова',
        rating: 5,
        comment: 'Хочу оставить свой положительный отзыв о данном заведении! Особенно хочу отметить их шаурму — она просто потрясающая! ',
        date: '22.05.2025'
    },
    {
        id: 4,
        name: 'Наталия',
        rating: 5,
        comment: 'Сидели большой компанией, отмечали день рождения. Заказали шашлык, крылышки, салаты и другие закуски. Все было очень вкусно. Разрешили поставить свою музыку и потанцевать. В заведении чистота и порядок. По ценам совсем недорого. Персонал и руководство приветливые и доброжелательные. ',
        date: '15.04.2025'
    },
    {
        id: 5,
        name: 'Артем Иванов',
        rating: 4,
        comment: 'Посетил данное кафе , очень вкусная еда , быстрое обслуживание все очень вкусно , рекомендую , однозначно вернусь еще . Заказывал цезарь и лагман .',
        date: '26.04.2025'
    },
    {
        id: 6,
        name: 'Любовь M.',
        rating: 5,
        comment: 'Были 7 марта 2025г. Отличное качество. Готовят быстро, вкусно, всё свежее. Очень большой выбор блюд. Очень приветливый персонал.',
        date: '09.03.2025'
    }
]

export default function MapReviews() {
    const [isExpanded, setIsExpanded] = useState(true)
    const [showAll, setShowAll] = useState(false)

    const displayedReviews = showAll ? sampleReviews : sampleReviews.slice(0, 3)

    return (
        <div className="bg-background rounded-lg border border-border shadow-lg p-4 mb-4">
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Отзывы клиентов</h3>
                    <span className="text-sm text-muted-foreground">({sampleReviews.length})</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
            </div>

            {/* Список отзывов */}
            {isExpanded && (
                <>
                    <div className="space-y-3">
                        {displayedReviews.map((review) => (
                            <div key={review.id} className="text-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium">{review.name}</span>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < review.rating
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-1">{review.comment}</p>
                                <span className="text-gray-500 text-xs">{review.date}</span>
                            </div>
                        ))}
                    </div>

                    {/* Кнопка показать еще/свернуть */}
                    {sampleReviews.length > 3 && (
                        <div className="mt-3 pt-3 border-t border-border">
                            <Button
                                variant="link"
                                size="sm"
                                className="text-sm p-0 h-auto font-normal"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? (
                                    <>Свернуть ↑</>
                                ) : (
                                    <>Показать еще {sampleReviews.length - 3} отзыва ↓</>
                                )}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}