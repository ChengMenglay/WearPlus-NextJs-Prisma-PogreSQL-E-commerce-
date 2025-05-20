import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, categoryId, detail, price, stock, type, sizes, images } =
      body;

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
    if (!Array.isArray(images) || !images.length)
      return NextResponse.json("Images are required", { status: 400 });

    const product = await prisma.product.create({
      data: {
        name,
        categoryId,
        detail,
        price,
        stock,
        type,
        sizes: {
          createMany: { data: sizes.map((sizeId) => ({ sizeId })) },
        },
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
    const productId = searchParams.get("productId") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") ? true : undefined;
    const limit = searchParams.get("limit");
    const limitValue = limit ? Number(limit) : undefined;
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!)
      : undefined;
    const orderBy = searchParams.get("orderBy");
    const orderDirection = searchParams.get("orderDirection");
    if (limit && isNaN(limitValue as number)) {
      return new NextResponse("Invalid limit value", { status: 400 });
    }
    const priceGte = searchParams.get("price_gte");
    const priceLte = searchParams.get("price_lte");
    const query: {
      id?: string;
      categoryId?: string;
      isFeatured?: boolean;
      isArchived?: boolean;
      price?: {
        gte?: number;
        lte?: number;
      };
    } = { isArchived: false };
    if (productId) query.id = productId;
    if (categoryId) query.categoryId = categoryId;
    if (isFeatured === true) query.isFeatured = true;
    if (priceGte || priceLte) {
      query.price = {};
      if (priceGte) query.price.gte = parseFloat(priceGte);
      if (priceLte) query.price.lte = parseFloat(priceLte);
    }
    let orderByClause = {};
    if (orderBy) {
      orderByClause = { [orderBy]: orderDirection || "desc" };
    } else {
      orderByClause = { createAt: "desc" };
    }
    const products = await prisma.product.findMany({
      where: query,
      include: {
        images: true,
        category: true,
        sizes: { include: { size: true } },
      },
      take: limitValue,
      orderBy: orderByClause, // Ensure `createdAt` exists in your schema
      ...(skip ? { skip: skip } : {}),
    });

    let filterdProducts = products;
    if (sizeId) {
      filterdProducts = filterdProducts.filter((product) =>
        product.sizes.some((size) => size.sizeId === sizeId)
      );
    }

    return NextResponse.json(filterdProducts);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, stock } = body;
    if (!id || stock === undefined) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const product = await prisma.product.update({
      where: { id },
      data: { stock },
    });
    if (product.stock === 0) {
      await prisma.product.update({
        where: { id },
        data: { status: "Out of Stock", isArchived: true, isFeatured: false },
      });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_STOCK_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
