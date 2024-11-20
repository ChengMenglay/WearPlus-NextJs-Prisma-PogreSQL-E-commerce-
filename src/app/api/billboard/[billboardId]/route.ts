import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    const billboard = await prisma.billboard.findUnique({
      where: { id: params.billboardId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const body = await req.json();
    const { title, url } = body;
    if (!params.billboardId) {
      return NextResponse.json("Billboard id is require", { status: 400 });
    }
    if (!title) return NextResponse.json("Title is require", { status: 400 });
    if (!url) return NextResponse.json("Image is require", { status: 400 });
    const billboard = await prisma.billboard.update({
      where: { id: params.billboardId },
      data: { title, url },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    const billboard = await prisma.billboard.delete({
      where: { id: params.billboardId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
