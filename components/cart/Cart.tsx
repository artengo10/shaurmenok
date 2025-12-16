'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useCartStore } from '@/lib/stores/cart-store'
import CartTabs from './CartTabs'
import CartOrderForm from './CartOrderForm'
import CartItemsList from './CartItemsList'
import { showToast } from '@/lib/utils/toast'
import {
    isValidPhone,
    isBlacklisted
} from '@/lib/validation'

// Добавляем константы районов прямо в компонент
const DELIVERY_AREAS = [
    { id: 'sormovo', name: 'Сормовский район', price: 1500 },
    { id: 'moscow', name: 'Московский район', price: 1750 },
    { id: 'kanavino', name: 'Канавинский район', price: 1950 },
    { id: 'lenin', name: 'Ленинский район', price: 2150 }
]

interface CartProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function Cart({ open, onOpenChange }: CartProps) {
    const [orderType, setOrderType] = useState('delivery')
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        pickupTime: '',
        district: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { items, totalPrice, clearCart, calculatePrepayment, selectedArea, setDeliveryArea } = useCartStore()
    const subtotal = totalPrice()
    const deliveryCost = orderType === 'delivery' && selectedArea ? selectedArea.price : 0
    const prepayment = calculatePrepayment(orderType, subtotal)
    const finalTotal = subtotal + deliveryCost - prepayment

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleDistrictChange = (area: typeof DELIVERY_AREAS[0]) => {
        setDeliveryArea(area)
        setFormData(prev => ({ ...prev, district: area.name }))
    }

    const handleOrder = async () => {
        console.log('🚀 Начинаем оформление заказа...');

        // Проверка черного списка
        if (isBlacklisted(formData.phone)) {
            showToast.error('Заказ не может быть оформлен');
            return;
        }

        // Проверка номера телефона
        if (!isValidPhone(formData.phone)) {
            showToast.error('Номер телефона должен содержать 10-11 цифр');
            return;
        }

        // Проверка выбора района для доставки
        if (orderType === 'delivery' && !selectedArea) {
            showToast.error('Выберите район доставки');
            return;
        }

        // Базовые проверки заполненности полей
        if (!formData.name || !formData.phone ||
            (orderType === 'delivery' ? !formData.address : !formData.pickupTime)) {
            showToast.error('Заполните все обязательные поля');
            return;
        }

        setIsSubmitting(true);

        try {
            // Получаем токены из переменных окружения
            const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
            const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

            console.log('📋 Проверка конфигурации Telegram:', {
                hasToken: !!TELEGRAM_BOT_TOKEN,
                hasChatId: !!TELEGRAM_CHAT_ID,
                tokenPreview: TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : 'отсутствует',
                chatId: TELEGRAM_CHAT_ID
            });

            // ПРОВЕРЯЕМ НАЛИЧИЕ ТОКЕНОВ С ПОДРОБНЫМ СООБЩЕНИЕМ
            if (!TELEGRAM_BOT_TOKEN) {
                throw new Error('❌ Не найден TELEGRAM_BOT_TOKEN. Проверьте файл .env.local');
            }

            if (!TELEGRAM_CHAT_ID) {
                throw new Error('❌ Не найден TELEGRAM_CHAT_ID. Получите новый через @getidsbot');
            }

            // Тестируем подключение к боту
            console.log('🔄 Тестируем подключение к боту...');
            const testUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
            const testResponse = await fetch(testUrl);

            if (!testResponse.ok) {
                const testError = await testResponse.json();
                if (testResponse.status === 404) {
                    throw new Error('❌ Бот не найден. Проверьте TELEGRAM_BOT_TOKEN');
                }
                throw new Error(`❌ Ошибка бота: ${testError.description || testResponse.status}`);
            }

            // Форматируем сообщение для Telegram
            const message = formatTelegramMessage({
                name: formData.name,
                phone: formData.phone,
                type: orderType,
                address: formData.address,
                district: selectedArea?.name || '',
                pickupTime: formData.pickupTime,
                items: items,
                subtotal: subtotal,
                delivery: deliveryCost,
                total: subtotal + deliveryCost,
                prepayment: prepayment,
                finalTotal: finalTotal
            });

            console.log('📝 Сообщение для Telegram:', message);

            // Отправляем в Telegram напрямую
            const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

            console.log('📡 Отправляем запрос на URL:', url.replace(TELEGRAM_BOT_TOKEN, '***СКРЫТО***'));
            console.log('👥 Chat ID для отправки:', TELEGRAM_CHAT_ID);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                }),
            });

            console.log('📊 Статус ответа Telegram:', response.status);

            const responseData = await response.json();
            console.log('📨 Полный ответ Telegram:', responseData);

            if (!response.ok) {
                // Обрабатываем конкретные ошибки Telegram
                if (responseData.description?.includes('chat not found')) {
                    throw new Error(`❌ Chat ID ${TELEGRAM_CHAT_ID} не найден. Получите новый через @getidsbot`);
                }
                if (responseData.description?.includes('bot was blocked')) {
                    throw new Error('❌ Бот заблокирован пользователем. Разблокируйте бота в Telegram');
                }
                if (responseData.description?.includes('not enough rights')) {
                    throw new Error('❌ У бота нет прав для отправки сообщений в этот чат');
                }
                throw new Error(`❌ Telegram: ${responseData.description || 'Неизвестная ошибка'}`);
            }

            console.log('✅ УСПЕХ! Заказ отправлен в Telegram');

            // Уведомление о предоплате
            if (prepayment > 0) {
                showToast.info(`Требуется предоплата: ${prepayment}₽`);
            }

            showToast.orderCreated();
            clearCart();
            onOpenChange(false);
            setFormData({ name: '', phone: '', address: '', pickupTime: '', district: '' });

        } catch (error: any) {
            console.error('🔥 КРИТИЧЕСКАЯ ОШИБКА:', error.message);

            // Показываем понятное сообщение об ошибке
            let userMessage = error.message;

            if (error.message.includes('.env.local')) {
                userMessage = 'Проверьте файл .env.local с настройками бота';
            } else if (error.message.includes('@getidsbot')) {
                userMessage = 'Получите новый chat_id через @getidsbot в Telegram';
            }

            showToast.error(userMessage);

            // Для разработчика - полная информация
            console.error('🔧 Для разработчика:', {
                error: error.message,
                stack: error.stack,
                env: {
                    hasToken: !!process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN,
                    hasChatId: !!process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
                    tokenPreview: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN?.substring(0, 10) + '...',
                    chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Функция для форматирования сообщения в Telegram
    const formatTelegramMessage = (orderData: any) => {
        const {
            name, phone, type, address, district, pickupTime,
            items, subtotal, delivery, total, prepayment, finalTotal
        } = orderData;

        let message = `<b>🛒 НОВЫЙ ЗАКАЗ ИЗ "ШАУРМЁНОК"!</b>\n\n`;

        // Информация о клиенте
        message += `<b>👤 Клиент:</b> ${name}\n`;
        message += `<b>📞 Телефон:</b> ${phone}\n`;
        message += `<b>📍 Тип заказа:</b> ${type === 'delivery' ? 'Доставка' : 'Самовывоз'}\n`;

        if (type === 'delivery') {
            message += `<b>🏠 Адрес:</b> ${address}\n`;
            if (district) {
                message += `<b>🗺️ Район:</b> ${district}\n`;
            }
        } else {
            message += `<b>⏰ Время самовывоза:</b> ${pickupTime}\n`;
        }

        message += `\n<b>📦 Состав заказа:</b>\n`;
        items.forEach((item: any, index: number) => {
            const itemTotal = item.price * item.quantity;
            message += `${index + 1}. <b>${item.name}</b>\n`;
            message += `   ${item.quantity} × ${item.price}₽ = ${itemTotal}₽\n`;
        });

        message += `\n<b>💰 Итого:</b> ${subtotal}₽\n`;

        if (delivery > 0) {
            message += `<b>🚚 Доставка:</b> +${delivery}₽\n`;
        }

        message += `<b>💳 Предоплата:</b> -${prepayment}₽\n`;
        message += `<b>💵 К оплате:</b> <u>${finalTotal}₽</u>\n\n`;

        message += `<b>⏰ Время заказа:</b> ${new Date().toLocaleString('ru-RU')}\n`;
        message += `<b>📋 ID заказа:</b> ORD-${Date.now().toString().slice(-6)}\n\n`;

        message += `<i>📍 Адрес кафе: ул. Ефремова, 3в, Нижний Новгород</i>\n`;
        message += `<i>📞 Телефон: +7 (999) 123-45-67</i>`;

        return message;
    };

    const isFormInvalid =
        !formData.name ||
        !formData.phone ||
        (orderType === 'delivery' ? !formData.address : !formData.pickupTime) ||
        (orderType === 'delivery' && !selectedArea) ||
        isBlacklisted(formData.phone) ||
        !isValidPhone(formData.phone)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md w-[95vw] max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 mx-auto my-8">
                <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
                    <DialogTitle className="text-2xl font-heading text-center">
                        Ваш заказ
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    <CartTabs value={orderType} onValueChange={setOrderType} />

                    <CartOrderForm
                        orderType={orderType}
                        formData={formData}
                        onInputChange={handleInputChange}
                    />

                    {/* ДОБАВЛЯЕМ ВЫБОР РАЙОНА ДЛЯ ДОСТАВКИ */}
                    {orderType === 'delivery' && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium">Район доставки *
                            </label>
                            <p className="text-xs text-muted-foreground">(выбор района обязателен)</p>
                            <div className="grid grid-cols-2 gap-2">
                                {DELIVERY_AREAS.map((area) => (
                                    <Button
                                        key={area.id}
                                        type="button"
                                        variant={selectedArea?.id === area.id ? "default" : "outline"}
                                        className="h-12 text-sm font-normal"
                                        onClick={() => handleDistrictChange(area)}
                                    >
                                        <div className="text-center">
                                            <div>{area.name}</div>
                                            <div className="text-xs opacity-80">+{area.price}₽</div>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                            {selectedArea && (
                                <p className="text-xs text-muted-foreground">
                                    Выбран: {selectedArea.name} (+{selectedArea.price}₽)
                                </p>
                            )}
                        </div>
                    )}

                    {items.length > 0 && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-3 text-lg">Товары в заказе</h3>
                            <CartItemsList />

                            {/* Блок с предоплатой */}
                            {prepayment > 0 && (
                                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                                        <span className="text-sm font-medium">
                                            💳 Требуется предоплата: {prepayment}₽
                                        </span>
                                    </div>
                                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                        Для заказов от 2000₽ с самовывозом
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {items.length === 0 && (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-muted-foreground text-center text-lg">
                                Корзина пуста
                            </p>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t px-6 py-4 bg-muted/30">
                        {/* Текст об акции */}
                        <div className="text-xs text-muted-foreground text-center mb-3">
                            При покупке 2 любых пицц = 1 мини пицца в подарок !
                        </div>

                        {/* Сумма товаров */}
                        <div className="flex justify-between text-sm mb-1">
                            <span>Товары:</span>
                            <span>{subtotal} ₽</span>
                        </div>

                        {/* Стоимость доставки */}
                        {deliveryCost > 0 && (
                            <div className="flex justify-between text-sm mb-1">
                                <span>Доставка:</span>
                                <span className="text-green-600">+{deliveryCost} ₽</span>
                            </div>
                        )}

                        {/* Общая сумма */}
                        <div className="flex justify-between text-lg font-semibold mb-2 border-t pt-2">
                            <span>Сумма заказа:</span>
                            <span>{subtotal + deliveryCost} ₽</span>
                        </div>

                        {/* Предоплата */}
                        {prepayment > 0 && (
                            <div className="flex justify-between text-amber-600 dark:text-amber-400 mb-2">
                                <span>Предоплата:</span>
                                <span>-{prepayment} ₽</span>
                            </div>
                        )}

                        {/* Итоговая сумма */}
                        <div className="flex justify-between text-lg font-semibold mb-4 border-t pt-2">
                            <span>К оплате:</span>

                            <span className={prepayment > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                                {finalTotal} ₽
                            </span>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleOrder}
                            disabled={isFormInvalid || isSubmitting}
                        >
                            {isSubmitting ? 'Отправка...' :
                                prepayment > 0 ? 'Перейти к предоплате' : 'Оформить заказ'}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}