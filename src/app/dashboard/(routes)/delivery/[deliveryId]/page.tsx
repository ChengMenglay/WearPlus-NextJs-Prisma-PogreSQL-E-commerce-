import React from "react";
import DeliveryForm from "./components/Delivery-Form";
import { prisma } from "@/lib/prisma";
export default async function CategoryPage({
  params,
}: {
  params: { deliveryId: string };
}) {
  const delivery = await prisma.delivery.findUnique({
    where: { id: params.deliveryId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DeliveryForm initialData={delivery} />
      </div>
    </div>
  );
}
