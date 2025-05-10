import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");
    if (!userId) {
      return new NextResponse("User id are required!", {
        status: 400,
      });
    }
    const where: { userId: string; productId?: string } = { userId };

    if (productId) {
      where.productId = productId;
    }
    const favorite = await prisma.favorite.findMany({
      where,
      include: { product: { include: { images: true, category: true } } },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error("[FAVORITE GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const { userId, productId } = await request.json();
    if (!userId || !productId) {
      return new NextResponse("User id or Product id are required!", {
        status: 400,
      });
    }
    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId, productId },
    });
    if (existingFavorite) {
      return NextResponse.json(existingFavorite);
    }
    const favorite = await prisma.favorite.create({
      data: { userId, productId },
    });
    return NextResponse.json(favorite);
  } catch (error) {
    console.error("[FAVORITE POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return new NextResponse("Favorite id are required!", {
        status: 400,
      });
    }
    const favorite = await prisma.favorite.delete({
      where: { id },
    });
    return NextResponse.json(favorite);
  } catch (error) {
    console.error("[FAVORITE DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
