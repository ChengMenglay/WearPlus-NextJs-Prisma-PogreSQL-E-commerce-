import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { productId, sizeId } = await req.json();
    if (!productId)
      return NextResponse.json("Product Id is required", { status: 400 });
    if (!sizeId)
      return NextResponse.json("Size Id is required", { status: 400 });
    const productSize = await prisma.productSize.findUnique({
      where: {
        productId_sizeId: {
          productId,
          sizeId,
        },
      },
      include: {
        size: true,
        product: { include: { images: true, category: true } },
      },
    });
    if (!productSize) {
      return new NextResponse("ProductSize not found!", { status: 400 });
    }
    return NextResponse.json(productSize);
  } catch (error) {
    console.log("[PRODUCTSIZE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
