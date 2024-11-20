import React from "react";
import { prisma } from "@/lib/prisma";
import CustomerForm from "./components/Customer-Form";
export default async function CustomerPage({
  params,
}: {
  params: { customerId: string };
}) {
  const customer = await prisma.user.findUnique({
    where: { id: params.customerId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerForm initialData={customer} />
      </div>
    </div>
  );
}
