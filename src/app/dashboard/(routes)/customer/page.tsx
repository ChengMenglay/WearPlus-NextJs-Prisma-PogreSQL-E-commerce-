import React from "react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { CustomerColumn } from "./components/columns";
import { ClientCustomer } from "./components/client";
import { getUserId } from "@/app/(auth)/actions/authActions";

export default async function CustomerPage() {
  const currentId = await getUserId();
  const customer = await prisma.user.findMany({
    where: { id: { not: currentId as string } },
    orderBy: { createdAt: "desc" },
  });
  const formattedCustomers: CustomerColumn[] = customer.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phoneNumber: item.phoneNumber,
    address: item.address,
    role: item.role,
    createAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientCustomer data={formattedCustomers} />
      </div>
    </div>
  );
}
