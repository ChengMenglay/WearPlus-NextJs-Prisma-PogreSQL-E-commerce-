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
    const { name, url, description } = body;
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!url) return new NextResponse("Image is required", { status: 400 });
    // Create update data object
    const updateData: {
      name: string;
      url: string;
      description?: string;
    } = {
      name,
      url,
    };

    // Only include description if it's provided
    if (description !== undefined) {
      updateData.description = description;
    }

    const category = await prisma.category.update({
      where: { id: params.categoryId },
      data: updateData,
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
