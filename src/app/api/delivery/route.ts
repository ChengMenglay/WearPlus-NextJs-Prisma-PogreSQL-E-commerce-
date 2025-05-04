import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const delivery = await prisma.delivery.findMany();
    return NextResponse.json(delivery);
  } catch (error) {
    console.log("[DELIVERY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, logo_url, price, description } = body;
    if (!name) return NextResponse.json("Name is require", { status: 400 });
    if (!logo_url)
      return NextResponse.json("Image is require", { status: 400 });
    if (!price) return NextResponse.json("Price is require", { status: 400 });
    if (!description)
      return NextResponse.json("Description is require", { status: 400 });
    const delivery = await prisma.delivery.create({
      data: { name, logo_url, price, description },
    });
    return NextResponse.json(delivery);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
