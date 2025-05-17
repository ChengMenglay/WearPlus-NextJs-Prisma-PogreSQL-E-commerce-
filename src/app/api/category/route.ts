import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, url, description } = body;
    if (!name) return NextResponse.json("Name is require", { status: 400 });
    if (!url) return NextResponse.json("Image is require", { status: 400 });
    const category = await prisma.category.create({
      data: { name, url, description },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || null;
    const limitValue = limit ? Number(limit) : undefined;
    if (limit && isNaN(limitValue as number)) {
      return new NextResponse("Invalid limit value", { status: 400 });
    }
    const category = await prisma.category.findMany({
      take: limitValue,
      orderBy: { createAt: "desc" },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
