'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

interface Review {
    id: number
    name: string
    rating: number
    comment: string
    date: string
}

export default function ReviewsSection() {
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: 1,
            name: 'Анна',
            rating: 5,
            comment: 'Очень вкусная шаурма и пицца! Быстрая доставка.',
            date: '2024-01-15'
        },
        {
            id: 2,
            name: 'Михаил',
            rating: 4,
            comment: 'Хорошее качество еды, приятное обслуживание.',
            date: '2024-01-10'
        }
    ])

    const [newReview, setNewReview] = useState({
        name: '',
        rating: 0,
        comment: ''
    })

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault()
        if (newReview.rating === 0 || !newReview.name || !newReview.comment) return

        const review: Review = {
            id: Date.now(),
            name: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0]
        }

        setReviews(prev => [review, ...prev])
        setNewReview({ name: '', rating: 0, comment: '' })
    }

    return (
        <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-2xl font-bold mb-6">Отзывы</h3>

            {/* Форма добавления отзыва */}
            <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-muted/30 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Оставить отзыв</h4>

                <div className="grid gap-4 mb-4">
                    {/* Простой input вместо компонента */}
                    <input
                        placeholder="Ваше имя"
                        value={newReview.name}
                        onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    />

                    <div className="flex items-center gap-2">
                        <span className="text-sm">Оценка:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                                className="text-2xl focus:outline-none"
                            >
                                <Star
                                    className={`w-6 h-6 ${star <= newReview.rating
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Простая textarea вместо компонента */}
                    <textarea
                        placeholder="Ваш отзыв..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        rows={3}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    />
                </div>

                <Button type="submit">Отправить отзыв</Button>
            </form>

            {/* Список отзывов */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold">{review.name}</h5>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{review.comment}</p>
                        <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}