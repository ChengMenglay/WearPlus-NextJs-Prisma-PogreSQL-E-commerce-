import { Button } from "@/components/ui/button";
import { Heart, List, MapPin, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Order, OrderItem, Product } from "@prisma/client";

type ExtendedOrderItem = OrderItem & {
  product?: Product;
};

type ExtendedOrder = Order & {
  orderItems?: ExtendedOrderItem[];
};

type OrderPendingProps = {
  orderPending: ExtendedOrder[];
};

export default function ProfileSidebar({ orderPending }: OrderPendingProps) {
  return (
    <div className="flex items-center md:block h-full md:h-[80vh]">
      <Link href={"/profile"}>
        <Button
          variant={"outline"}
          className="md:w-full h-14 flex justify-start md:gap-x-4"
        >
          <User />
          Profile
        </Button>
      </Link>
      <Link href={"/profile" + "/order-history"}>
        <Button
          variant={"outline"}
          className="md:w-full h-14 flex justify-between md:gap-x-4"
        >
          <span className="flex items-center space-x-4">
            <List />
            <span> Order History</span>
          </span>
          {orderPending?.length > 0 && (
            <span className=" py-1 px-3 rounded-full bg-red-400 text-white">
              {orderPending?.length || 0}
            </span>
          )}
        </Button>
      </Link>
      <Link href={"/profile" + "/favorite"}>
        <Button
          variant={"outline"}
          className="md:w-full h-14 flex justify-start md:gap-x-4"
        >
          <Heart />
          Favorite
        </Button>
      </Link>
      <Link href={"/profile" + "/address"}>
        <Button
          variant={"outline"}
          className="md:w-full h-14 flex justify-start md:gap-x-4"
        >
          <MapPin />
          Address
        </Button>
      </Link>
    </div>
  );
}
