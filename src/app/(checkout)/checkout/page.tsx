import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import ProductTable from "./components/ProductTable";
import { Separator } from "@/components/ui/separator";
import CheckoutForm from "./components/Checkout";
import { getAllDelivery } from "../../../../actions/get-delivery";
import { getAllAddress } from "../../../../actions/get-address";
import { getUserId } from "@/app/(auth)/actions/authActions";

export default async function Checkout() {
  const addresses = await getAllAddress();
  const deliveries = await getAllDelivery();
  const userId = await getUserId();
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
            <CheckoutForm
              userId={userId}
              addresses={addresses}
              deliveryOptions={deliveries}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
