import { NextRequest, NextResponse } from "next/server";
import { isBlacklisted, formatPhone } from "@/lib/validation";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    console.log("Order received:", orderData);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("Token exists:", !!token);
    console.log("Chat ID exists:", !!chatId);

    if (!token || !chatId) {
      console.error("Missing Telegram credentials");
      return NextResponse.json(
        { error: "Telegram bot not configured" },
        { status: 500 }
      );
    }
    const formattedPhone = formatPhone(orderData.phone);
    if (isBlacklisted(formattedPhone)) {
      console.log("Blacklisted phone:", formattedPhone);
      return NextResponse.json({ error: "Order rejected" }, { status: 403 });
    }
    // Форматируем сообщение
    const message = `
🛒 НОВЫЙ ЗАКАЗ

<b>Клиент:</b> ${orderData.name}
<b>Телефон:</b> ${orderData.phone}
<b>Тип заказа:</b> ${orderData.type === "delivery" ? "Доставка" : "Самовывоз"}

${
  orderData.type === "delivery"
    ? `<b>Адрес:</b> ${orderData.address}`
    : `<b>Время самовывоза:</b> ${orderData.pickupTime}`
}

<b>Товары:</b>
${orderData.items
  .map(
    (item: CartItem) =>
      `• ${item.name} x${item.quantity} - ${item.price * item.quantity}₽`
  )
  .join("\n")}

<b>Итого:</b> ${orderData.total}₽
${orderData.prepayment > 0 ? `<b>Предоплата:</b> ${orderData.prepayment}₽` : ""}
<b>К оплате:</b> ${orderData.finalTotal}₽

<b>Время заказа:</b> ${new Date().toLocaleString("ru-RU")}
    `.trim();

    console.log("Sending to Telegram...");

    // Отправляем в Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const responseData = await response.json();
    console.log("Telegram response:", responseData);

    if (!response.ok) {
      throw new Error(`Telegram API error: ${JSON.stringify(responseData)}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
