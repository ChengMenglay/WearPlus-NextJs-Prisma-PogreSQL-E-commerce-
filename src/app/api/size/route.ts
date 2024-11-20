import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, value } = body;
    if (!name) return NextResponse.json("Name is require", { status: 400 });
    if (!value) return NextResponse.json("Value is require", { status: 400 });
    const size = await prisma.size.create({ data: { name, value } });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[Size_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
