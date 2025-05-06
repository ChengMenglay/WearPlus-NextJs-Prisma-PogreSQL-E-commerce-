import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendOrderNotification } from "../webhook/route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, totalPrice } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: { include: { product: true } },
        delivery: true,
        address: {include:{user:true}},
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    const orderWithTotal = {
      ...order,
      totalPrice: totalPrice || 0,
    };

    //Send notification to admin
    await sendOrderNotification(orderWithTotal);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[TELEGRAM_NOTIFY]", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
