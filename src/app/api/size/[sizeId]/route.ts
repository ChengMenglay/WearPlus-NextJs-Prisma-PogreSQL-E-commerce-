import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }
    const size = await prisma.size.findUnique({
      where: { id: params.sizeId },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const body = await req.json();
    const { name, value } = body;
    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value) return new NextResponse("Value is required", { status: 400 });
    const size = await prisma.size.update({
      where: { id: params.sizeId },
      data: { name, value },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[Size_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }
    const size = await prisma.size.delete({
      where: { id: params.sizeId },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
