import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { deliveryId: string } }
) {
  try {
    if (!params.deliveryId) {
      return new NextResponse("DeliveryId Id is required", { status: 400 });
    }
    const delivery = await prisma.delivery.findUnique({
      where: { id: params.deliveryId },
    });
    return NextResponse.json(delivery);
  } catch (error) {
    console.log("[DELIVERY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { deliveryId: string } }
) {
  try {
    const body = await req.json();
    const { name, logo_url, price, description } = body;
    if (!params.deliveryId) {
      return NextResponse.json("Delivery id is require", { status: 400 });
    }
    if (!name) return NextResponse.json("Name is require", { status: 400 });
    if (!logo_url)
      return NextResponse.json("Image is require", { status: 400 });
    if (!price) return NextResponse.json("Price is require", { status: 400 });
    if (!description)
      return NextResponse.json("Description is require", { status: 400 });
    const delivery = await prisma.delivery.update({
      where: { id: params.deliveryId },
      data: { name, logo_url, price, description },
    });
    return NextResponse.json(delivery);
  } catch (error) {
    console.log("[DELIVERY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { deliveryId: string } }
) {
  try {
    if (!params.deliveryId) {
      return new NextResponse("Delivery Id is required", { status: 400 });
    }
    const delivery = await prisma.delivery.delete({
      where: { id: params.deliveryId },
    });
    return NextResponse.json(delivery);
  } catch (error) {
    console.log("[DELIVERY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
