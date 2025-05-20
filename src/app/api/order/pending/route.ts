import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const order = await prisma.order.findMany({
      where: { userId: userId as string, status: "Pending" },
      include: {
        orderItems: { include: { product: true } },
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
