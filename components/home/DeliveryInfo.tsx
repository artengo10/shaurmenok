export default function DeliveryInfo() {
    return (
        <section className="my-6 md:my-10 text-center px-0">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 max-w-3xl mx-auto shadow-md border border-amber-200 dark:border-amber-900/50">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Доставка и самовывоз
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-xs md:text-sm">
                    Забери сам или закажи — доставляем быстро!
                </p>

                {/* Контейнер теперь flex на мобильных, grid на планшетах+ */}
                <div className="flex flex-row md:grid md:grid-cols-2 gap-2 md:gap-4">
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm min-w-0">
                        <div className="w-8 h-8 mx-auto mb-1 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                            <span className="text-lg">🚴</span>
                        </div>
                        <h4 className="font-bold text-sm truncate">Доставка</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
                            30-45 мин
                        </p>
                        <p className="text-amber-600 dark:text-amber-400 font-semibold text-xs">
                            от 150 ₽
                        </p>
                    </div>

                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm min-w-0">
                        <div className="w-8 h-8 mx-auto mb-1 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                            <span className="text-lg">🏃</span>
                        </div>
                        <h4 className="font-bold text-sm truncate">Самовывоз</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
                            5-7 минут
                        </p>
                        <p className="text-amber-600 dark:text-amber-400 font-semibold text-xs">
                            Бесплатно
                        </p>
                    </div>
                </div>


            </div>
        </section>
    )
}