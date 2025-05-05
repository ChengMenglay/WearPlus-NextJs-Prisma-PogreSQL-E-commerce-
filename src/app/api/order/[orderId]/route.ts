import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { orderId: string } }) {
  try {
    if (!params.orderId) {
      return new NextResponse("OrderId Id is required", { status: 400 });
    }
    const order = await prisma.order.findUnique({
      where: { id: params.orderId },
      include: {
        orderItems: true,
        user: true,
        delivery: true,
        address: true,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const body = await req.json();
    const { userId, deliveryId, addressId, status, isPaid, note, payment } =
      body;
    if (!params.orderId) {
      return new NextResponse("Order Id is required", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("User Id is required", { status: 400 });
    }
    if (!deliveryId) {
      return new NextResponse("Delivery Id is required", { status: 400 });
    }
    if (!addressId) {
      return new NextResponse("Address Id is required", { status: 400 });
    }
    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }
    if (!isPaid) {
      return new NextResponse("Is Paid is required", { status: 400 });
    }
    if (!payment) {
      return new NextResponse("Payment is required", { status: 400 });
    }
    const order = await prisma.order.update({
      where: { id: params.orderId },
      data: { userId, deliveryId, addressId, status, isPaid, note, payment },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("Order Id is required", { status: 400 });
    }
    const order = await prisma.order.delete({
      where: { id: params.orderId },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
