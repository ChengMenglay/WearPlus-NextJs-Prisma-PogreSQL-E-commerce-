import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, categoryId, detail, price, quantity, sizeId, images } = body;

    if (!name) return NextResponse.json("Name is required", { status: 400 });
    if (!categoryId)
      return NextResponse.json("Category ID is required", { status: 400 });
    if (!detail)
      return NextResponse.json("Detail is required", { status: 400 });
    if (!price) return NextResponse.json("Price is required", { status: 400 });
    if (!quantity)
      return NextResponse.json("Quantity is required", { status: 400 });
    if (!sizeId)
      return NextResponse.json("Size ID is required", { status: 400 });
    if (!Array.isArray(images) || !images.length)
      return NextResponse.json("Images are required", { status: 400 });

    const product = await prisma.product.create({
      data: {
        name,
        categoryId,
        detail,
        price,
        quantity,
        sizeId,
        isFeatured: body.isFeatured ?? false,
        isArchived: body.isArchived ?? false,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") ? true : undefined;

    const product = await prisma.product.findMany({
      where: {
        categoryId,
        sizeId,
        isFeatured,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
      },
      orderBy: { createAt: "desc" }, // Ensure `createdAt` exists in your schema
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
