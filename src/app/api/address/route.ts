import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const address = await prisma.address.findMany();
    return NextResponse.json(address);
  } catch (error) {
    console.log("[Address_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { province, addressDetail, userId, note } = body;
    if (!province)
      return NextResponse.json("Province is require", { status: 400 });
    if (!userId)
      return NextResponse.json("User id is require", { status: 400 });
    if (!addressDetail)
      return NextResponse.json("Address detail is require", { status: 400 });
    const address = await prisma.address.create({
      data: { province, addressDetail, userId, note },
    });
    return NextResponse.json(address);
  } catch (error) {
    console.log("[Address_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, province, addressDetail, userId, note } = body;
    if (!id) return NextResponse.json("Id is require", { status: 400 });
    if (!province)
      return NextResponse.json("Province is require", { status: 400 });
    if (!userId)
      return NextResponse.json("User id is require", { status: 400 });
    if (!addressDetail)
      return NextResponse.json("Address detail is require", { status: 400 });
    const address = await prisma.address.update({
      where: { id },
      data: { province, addressDetail, userId, note },
    });
    return NextResponse.json(address);
  } catch (error) {
    console.log("[Address_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json("Id is require", { status: 400 });
    const address = await prisma.address.delete({
      where: { id },
    });
    return NextResponse.json(address);
  } catch (error) {
    console.log("[Address_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
