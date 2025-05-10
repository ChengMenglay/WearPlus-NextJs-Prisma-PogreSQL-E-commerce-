import { prisma } from "@/lib/prisma";

import {
  Order,
  OrderItem,
  Product,
  Address,
  Delivery,
  User,
} from "@prisma/client";

// Then use them in your interface
interface OrderWithRelations extends Order {
  orderItems: (OrderItem & { product: Product })[];
  address: Address & { user: User };
  delivery: Delivery;
  totalPrice?: number;
}

export async function sendOrderNotification(order: OrderWithRelations) {
  try {
    const adminChatId = process.env.TELEGRAM_BOT_ADMIN_ID;
    if (!adminChatId) {
      console.error("[TELEGRAM_NOTIFICATION] Admin chat ID not configured");
      return;
    }
    // Fetch order from database
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    // Format order details with proper spacing
    const response = `
🛍️ *ORDER #${orders.length}* | ${new Date(order.createdAt).toLocaleDateString()}

📋 *ITEMS:* ${order.orderItems
      .map((item) => `${item.product.name} (${item.size}) x${item.quantity}`)
      .join(", ")}

💰 ${order.isPaid ? "Paid ✅" : "Pending ⏳"} | ${order.payment} | $${
      order.totalPrice
    }
🔄 *Status:* ${order.status}

👤 ${order.address.user.name} | ${order.address.user.phoneNumber}
📦 ${order.delivery.name} | ${order.address.addressDetail}, ${
      order.address.province
    }
`;

    // Send notification to admin
    await sendTelegramMessage(adminChatId, response, "Markdown");

    console.log("[TELEGRAM_NOTIFICATION] Order notification sent successfully");
    return true;
  } catch (error) {
    console.error("[TELEGRAM_WEBHOOK]", error);
    return false;
  }
}

async function sendTelegramMessage(
  chatId: string,
  text: string,
  parseMode?: string
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: parseMode,
    }),
  });

  const data = await response.json();
  console.log(data);
  return data;
}
