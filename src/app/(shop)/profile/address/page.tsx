import { Card } from "@/components/ui/card";
import React from "react";
import AddressForm from "./AddressForm";

export default function Address() {
  return (
    <Card className=" h-full md:h-[80vh] p-4">
      <AddressForm />
    </Card>
  );
}
