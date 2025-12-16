import { toast } from "sonner";


export const showToast = {
  // Успешное добавление в корзину
  addedToCart: (productName: string, quantity: number = 1) => {
    toast.success("✅ Добавлено в корзину", {
      description: `${quantity} × ${productName}`,
      duration: 2500,
      icon: "🛒",
    });
  },

  // Информационное уведомление о предоплате
  info: (message: string) => {
    toast.info("Доставка", {
      description: message,
      duration: 3000,
    });
  },

  // Удаление из корзины
  removedFromCart: (productName: string) => {
    toast.info("🗑️ Удалено из корзины", {
      description: productName,
      duration: 2000,
    });
  },

  // Оформление заказа
  orderCreated: () => {
    toast.success("🎉 Заказ оформлен!", {
      description: "Скоро с вами свяжутся для подтверждения",
      duration: 4000,
      icon: "📞",
    });
  },

  // Очистка корзины
  cartCleared: () => {
    toast.info("🧹 Корзина очищена", {
      duration: 2000,
      icon: "✅",
    });
  },

  // Обновление количества
  quantityUpdated: (productName: string, quantity: number) => {
    toast.info("✏️ Количество изменено", {
      description: `${productName}: ${quantity} шт.`,
      duration: 2000,
    });
  },

  // Ошибка
  error: (message: string) => {
    toast.error("❌ Ошибка", {
      description: message,
      duration: 3000,
    });
  },

  // Предупреждение
  warning: (message: string) => {
    toast.warning("⚠️ Внимание", {
      description: message,
      duration: 3000,
    });
  },
};

