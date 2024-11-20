import React from "react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { OrderColumn } from "./components/columns";
import { ClientOrder } from "./components/client";
import { formatter } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

export default async function OrderPage() {
  const Orders = await prisma.order.findMany({
    where: { status: "Pending" },
    include: {
      orderItems: { include: { product: true } },
      address: { include: { user: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  const formattedOrder: OrderColumn[] = Orders.map((item) => ({
    id: item.id,
    products: item.orderItems.map((i) => i.product.name).join(","),
    address: item.address.province + ", " + item.address.addressDetail,
    phone: item.address.user.phoneNumber || "",
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price) * item.quantity;
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    status: item.status,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientOrder data={formattedOrder} />
      </div>
    </div>
  );
}
