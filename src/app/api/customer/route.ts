import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phoneNumber, address, role } = body;
    if (!name) return NextResponse.json("Name is require", { status: 400 });
    if (!email) return NextResponse.json("Email is require", { status: 400 });
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail)
      return NextResponse.json("Email provided has already existed", {
        status: 400,
      });
    if (!phoneNumber)
      return NextResponse.json("Phone number is require", { status: 400 });
    if (!password)
      return NextResponse.json("Password is require", { status: 400 });
    if (!address)
      return NextResponse.json("Address is require", { status: 400 });
    if (!role) return NextResponse.json("Role is require", { status: 400 });
    const passwordHash = await bcrypt.hash(password, 10);
    const customer = await prisma.user.create({
      data: { name, email, passwordHash, phoneNumber, address, role },
    });
    return NextResponse.json(customer);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
