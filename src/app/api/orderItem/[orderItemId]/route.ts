import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

<<<<<<< HEAD
export async function GET({ params }: { params: { orderItemId: string } }) {
=======
export async function GET(
  request: Request,
  { params }: { params: { orderItemId: string } }
) {
>>>>>>> feature/checkout
  try {
    if (!params.orderItemId) {
      return new NextResponse("OrderItem ID is required", { status: 400 });
    }
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: params.orderItemId },
      include: {
        order: true,
        product: true,
      },
    });
    return NextResponse.json(orderItem);
  } catch (error) {
    console.log("[ORDERITEM_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { orderItemId: string } }
) {
  try {
    const body = await req.json();
    const { orderId, productId, quantity, size, price } = body;
    if (!orderId || !productId || !quantity || !size || !price) {
      return new NextResponse("Missing info", { status: 400 });
    }
    const orderItem = await prisma.orderItem.update({
      where: { id: params.orderItemId },
      data: { orderId, productId, quantity, size, price },
    });
    return NextResponse.json(orderItem);
  } catch (error) {
    console.log("[ORDERITEM_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

<<<<<<< HEAD
export async function DELETE({ params }: { params: { orderItemId: string } }) {
=======
export async function DELETE(
  request: Request,
  { params }: { params: { orderItemId: string } }
) {
>>>>>>> feature/checkout
  try {
    if (!params.orderItemId) {
      return new NextResponse("OrderItem ID is required", { status: 400 });
    }
    const orderItem = await prisma.orderItem.delete({
      where: { id: params.orderItemId },
    });
    return NextResponse.json(orderItem);
  } catch (error) {
    console.log("[ORDERITEM_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> feature/checkout
