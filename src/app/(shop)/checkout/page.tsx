import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import ProductTable from "./components/ProductTable";
import { Separator } from "@/components/ui/separator";
import CheckoutForm from "./components/Checkout";

export default function Checkout() {
  return (
    <Card className="container mx-auto p-4 my-10">
      <CardTitle className="text-center text-2xl font-bold">Checkout</CardTitle>
      <CardContent>
        <ProductTable />
        <div>
          <Separator className="my-2" />
          <CheckoutForm />
        </div>
      </CardContent>
    </Card>
  );
}
