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
        sizes: { include: { size: true } },
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
    const { name, categoryId, detail, price, stock, sizes, type, images } =
      body;

    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 });
    }
    if (!name) return NextResponse.json("Name is required", { status: 400 });
    if (!categoryId)
      return NextResponse.json("Category ID is required", { status: 400 });
    if (!detail)
      return NextResponse.json("Detail is required", { status: 400 });
    if (!price) return NextResponse.json("Price is required", { status: 400 });
    if (!stock) return NextResponse.json("Stock is required", { status: 400 });
    if (!type) return NextResponse.json("Type is required", { status: 400 });
    if (!Array.isArray(sizes) || !sizes.length)
      return NextResponse.json("Sizes are required", { status: 400 });
    if (!images || !images.length)
      return NextResponse.json("Images are required", { status: 400 });

    // Validate category
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      return NextResponse.json("Category does not exist", { status: 400 });
    }

    // Validate sizes
    const sizeIdsExist = await prisma.size.findMany({
      where: { id: { in: sizes } },
    });
    if (sizeIdsExist.length !== sizes.length) {
      return NextResponse.json("Some size IDs are invalid", { status: 400 });
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: params.productId },
      data: {
        name,
        categoryId,
        detail,
        price,
        stock,
        type,
        sizes: {
          deleteMany: {},
          createMany: { data: sizes.map((sizeId) => ({ sizeId })) },
        },
        isFeatured: body.isFeatured ?? false,
        isArchived: body.isArchived ?? false,
        images: {
          deleteMany: {},
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
      },
      include: {
        images: true,
        category: true,
        sizes: { include: { size: true } },
      },
    });

    return NextResponse.json(updatedProduct);
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
