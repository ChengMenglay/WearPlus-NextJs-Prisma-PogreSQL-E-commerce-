import React from "react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { DeliveryColumn } from "./components/columns";
import { ClientDelivery } from "./components/client";

export default async function DeliveryPage() {
  const deliveries = await prisma.delivery.findMany({
    orderBy: { createdAt: "desc" },
  });
  const formattedDeliveries: DeliveryColumn[] = deliveries.map((item) => ({
    id: item.id,
    name: item.name,
    logo_url: item.logo_url,
    price: Number(item.price),
    description: item.description,
    createdAt: format(item.createdAt, "do, MMMM, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientDelivery data={formattedDeliveries} />
      </div>
    </div>
  );
}
