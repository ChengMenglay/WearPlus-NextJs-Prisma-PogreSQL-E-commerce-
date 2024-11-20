import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 });
    }
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: {
        images: true,
        category: true,
        size: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();
    const { name, categoryId, detail, price, quantity, sizeId, images } = body;
    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 });
    }
    if (!name) return NextResponse.json("Name is require", { status: 400 });
    if (!categoryId)
      return NextResponse.json("Category id is require", { status: 400 });
    if (!detail) return NextResponse.json("Detail is require", { status: 400 });
    if (!price) return NextResponse.json("Price is require", { status: 400 });
    if (!quantity)
      return NextResponse.json("Quantity is require", { status: 400 });
    if (!sizeId)
      return NextResponse.json("Size id is require", { status: 400 });
    if (!images || !images.length)
      return NextResponse.json("Images are require", { status: 400 });
    await prisma.product.update({
      where: { id: params.productId },
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
          deleteMany: {},
        },
      },
    });
    const product = await prisma.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 });
    }
    const product = await prisma.product.delete({
      where: { id: params.productId },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
