import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const where: { isArchived: boolean; categoryId?: string } = {
      isArchived: false,
    };

    // Add categoryId filter if provided
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const count = await prisma.product.count({ where });

    return NextResponse.json({ count });
  } catch (error) {
    console.log("[PRODUCT_COUNT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
