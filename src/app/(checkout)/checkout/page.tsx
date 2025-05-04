import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import ProductTable from "./components/ProductTable";
import { Separator } from "@/components/ui/separator";
import CheckoutForm from "./components/Checkout";
import { prisma } from "@/lib/prisma";
import { getAllDelivery } from "../../../../actions/get-delivery";

export default async function Checkout() {
  const addresses = await prisma.address.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
  const deliveries = await getAllDelivery();
  return (
    <>
      <Card className="container mx-auto p-6 my-10">
        <CardTitle className="text-center text-2xl font-bold">
          Checkout
        </CardTitle>
        <CardContent>
          <ProductTable />
          <div>
            <Separator className="my-2" />
            <CheckoutForm addresses={addresses} deliveryOptions={deliveries} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
