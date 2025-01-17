import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const billboard = await prisma.billboard.findMany();
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, url } = body;
    if (!title) return NextResponse.json("Title is require", { status: 400 });
    if (!url) return NextResponse.json("Image is require", { status: 400 });
    const billboard = await prisma.billboard.create({ data: { title, url } });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
