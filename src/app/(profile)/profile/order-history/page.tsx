import { Card } from "@/components/ui/card";
import React from "react";
import { getOrderHistory } from "../../../../../actions/get-order";
import { getUserId } from "@/app/(auth)/actions/authActions";
import OrderHistoryComponent from "./OrderHistory";
export default async function OrderHistory() {
  const userId = await getUserId();
  const orderHistories = await getOrderHistory(userId as string);
  return (
    <Card className=" h-full md:h-[80vh]">
      <OrderHistoryComponent orderHistory={orderHistories} />
    </Card>
  );
}
