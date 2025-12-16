'use client'

import { useEffect, useState } from 'react'
import MapReviews from '@/components/map/MapReviews'

// Полные интерфейсы для типизации Яндекс.Карт
interface YMaps {
    ready: (callback: () => void) => void
    Map: new (container: string | HTMLElement, state: MapState) => MapInstance
    Placemark: new (geometry: number[], properties?: PlacemarkProperties, options?: PlacemarkOptions) => PlacemarkInstance
}

interface MapState {
    center: number[]
    zoom: number
    controls?: string[]
}

interface MapInstance {
    geoObjects: {
        add: (object: any) => void
    }
    events: {
        add: (event: string, callback: (e: any) => void) => void
    }
}

interface PlacemarkProperties {
    hintContent?: string
    balloonContent?: string
}

interface PlacemarkOptions {
    preset?: string
    iconColor?: string
}

interface PlacemarkInstance {
    // Методы Placemark
}

// Выносим константы за пределы компонента для стабильности ссылок
const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY || ''
const MAP_CENTER = process.env.NEXT_PUBLIC_MAP_CENTER || '56.349749, 43.866370'
const MARKER_TITLE = process.env.NEXT_PUBLIC_MAP_MARKER_TITLE || 'Шаурменок'
const BUSINESS_ADDRESS = 'ул. Ефремова, 3в, Нижний Новгород'
const BUSINESS_PHONE = '+7 (999) 123-45-67' // Замените на реальный телефон

export default function FooterMap() {
    const [isMapsLoaded, setIsMapsLoaded] = useState(false)

    // Преобразуем координаты один раз при загрузке
    const [lat, lng] = MAP_CENTER.split(',').map(coord => parseFloat(coord.trim()))

    useEffect(() => {
        // Проверяем наличие необходимых данных
        if (!MAP_API_KEY) {
            console.error('API key for maps is not defined')
            return
        }

        if (isNaN(lat) || isNaN(lng)) {
            console.error('Invalid map center coordinates format:', MAP_CENTER)
            return
        }

        // Если карта уже загружена, переинициализируем
        const ymaps = (window as unknown as { ymaps: YMaps }).ymaps
        if (ymaps) {
            setIsMapsLoaded(true)
            initMap(lat, lng)
            return
        }

        // Загружаем Яндекс.Карты
        const script = document.createElement('script')
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${MAP_API_KEY}&lang=ru_RU`
        script.async = true

        const handleLoad = () => {
            const loadedYmaps = (window as unknown as { ymaps: YMaps }).ymaps
            if (!loadedYmaps) {
                console.error('Yandex Maps API not available')
                return
            }

            loadedYmaps.ready(() => {
                setIsMapsLoaded(true)
                initMap(lat, lng)
            })
        }

        const handleError = () => {
            console.error('Failed to load Yandex Maps')
            setIsMapsLoaded(false)
        }

        script.onload = handleLoad
        script.onerror = handleError

        document.head.appendChild(script)

        // Cleanup function
        return () => {
            if (script.parentNode) {
                script.onload = null
                script.onerror = null
                document.head.removeChild(script)
            }
        }
    }, [lat, lng])

    const initMap = (lat: number, lng: number) => {
        const mapContainer = document.getElementById('footer-map')
        const ymaps = (window as unknown as { ymaps: YMaps }).ymaps

        if (!mapContainer || !ymaps) {
            console.error('Map container or Yandex Maps not available')
            return
        }

        // Очищаем контейнер
        while (mapContainer.firstChild) {
            mapContainer.removeChild(mapContainer.firstChild)
        }

        try {
            // Создаем карту с правильной типизацией
            const map = new ymaps.Map(mapContainer, {
                center: [lat, lng],
                zoom: 16.5,
                controls: ['zoomControl', 'fullscreenControl']
            })

            const placemark = new ymaps.Placemark([lat, lng], {
                hintContent: MARKER_TITLE,
                balloonContent: `
                    <div style="padding: 10px;">
                        <strong>${MARKER_TITLE}</strong><br/>
                        ${BUSINESS_ADDRESS}<br/>
                        📞 ${BUSINESS_PHONE}
                    </div>
                `
            }, {
                preset: 'islands#redFoodIcon',
                iconColor: '#ff0000'
            })

            // Теперь TypeScript знает тип map.geoObjects
            map.geoObjects.add(placemark)

            // Добавляем обработчик ошибок карты
            map.events.add('error', (e: any) => {
                console.error('Yandex Map error:', e)
            })

        } catch (error) {
            console.error('Error initializing map:', error)
            setIsMapsLoaded(false)
        }
    }

    return (
        <section className="w-full bg-muted/50 py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-6">Мы на карте</h2>

                {/* Блок отзывов ПЕРЕД картой */}
                <MapReviews />

                {/* Карта */}
                <div
                    id="footer-map"
                    className="w-full h-64 md:h-80 rounded-lg border border-border bg-background"
                />

                {!isMapsLoaded && (
                    <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg mt-4">
                        <p className="text-muted-foreground">
                            {MAP_API_KEY && MAP_CENTER ? 'Загрузка карты...' : 'Ошибка конфигурации карты'}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}