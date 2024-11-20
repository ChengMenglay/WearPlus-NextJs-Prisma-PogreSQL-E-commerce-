import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    if (!params.customerId) {
      return new NextResponse("Customer Id is required", { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id: params.customerId },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const body = await req.json();
    const { name, email, phoneNumber, address, role } = body;

    if (!params.customerId) {
      return new NextResponse("Customer Id is required", { status: 400 });
    }
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!email) return new NextResponse("Email is required", { status: 400 });
    if (!phoneNumber)
      return new NextResponse("Phone number is required", { status: 400 });
    if (!address)
      return new NextResponse("Address is required", { status: 400 });
    if (!role) return new NextResponse("Role is required", { status: 400 });
    const customer = await prisma.user.update({
      where: { id: params.customerId },
      data: { name, email, phoneNumber, address, role },
    });
    return NextResponse.json(customer);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    if (!params.customerId) {
      return new NextResponse("Customer Id is required", { status: 400 });
    }
    const customer = await prisma.user.delete({
      where: { id: params.customerId },
    });
    return NextResponse.json(customer);
  } catch (error) {
    console.log("[Customer_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
