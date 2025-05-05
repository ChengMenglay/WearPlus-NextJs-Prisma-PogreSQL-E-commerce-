import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orderItems = await prisma.orderItem.findMany({
      include: { product: true, order: true },
    });
    return NextResponse.json(orderItems);
  } catch (error) {
    console.log("[ORDER_ITEMS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, productId, quantity, size, price } = body;
    if (!orderId || !productId || !quantity || !size || !price) {
      return new NextResponse("Missing info", { status: 400 });
    }
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
        size,
        price,
      },
    });
    return NextResponse.json(orderItem);
  } catch (error) {
    console.log("[ORDER_ITEM_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
