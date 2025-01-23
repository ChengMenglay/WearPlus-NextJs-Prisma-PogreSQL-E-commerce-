import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    const category = await prisma.category.findUnique({
      where: { id: params.categoryId },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const body = await req.json();
    const { name, url } = body;
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!url) return new NextResponse("Image is required", { status: 400 });
    const category = await prisma.category.update({
      where: { id: params.categoryId },
      data: { name, url },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    const category = await prisma.category.delete({
      where: { id: params.categoryId },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
