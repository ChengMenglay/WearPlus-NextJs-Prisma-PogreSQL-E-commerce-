import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const order = await prisma.order.findMany({
      include: {
        orderItems: true,
        user: true,
        delivery: true,
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, deliveryId, addressId, status, isPaid, note, payment } =
      body;
    if (!userId) return NextResponse.json("User is require", { status: 400 });
    if (!deliveryId)
      return NextResponse.json("Delivery is require", { status: 400 });
    if (!addressId)
      return NextResponse.json("Address is require", { status: 400 });
    if (!status) return NextResponse.json("Status is require", { status: 400 });
    if (isPaid === undefined)
      return NextResponse.json("Is Paid is require", { status: 400 });
    if (!payment)
      return NextResponse.json("Payment is require", { status: 400 });
    const order = await prisma.order.create({
      data: { userId, deliveryId, addressId, status, isPaid, note, payment },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
