"use client";
import NoResult from "@/components/no-result";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useCart from "@/hooks/use-cart";
import { formatter } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Product } from "../../../../../../types";
import { toast } from "react-toastify";

type CartItemProps = {
  handleCalculateQty: (item: Product, qty: number) => void;
};
export default function CartItem({ handleCalculateQty }: CartItemProps) {
  const cart = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(() =>
    cart.items.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: 1, // Default quantity is 1 for all items
      }),
      {}
    )
  );
  useEffect(() => {
    cart.items.forEach((item) => {
      handleCalculateQty(item, quantities[item.id]);
    });
  }, [cart.items, quantities, handleCalculateQty]);

  const handleQtyChange = (id: string, delta: number, data: Product) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      const newQty = currentQty + delta;

      // Prevent exceeding stock or going below 1
      if (newQty > data.stock) {
        toast.info("Product out of stock!");
        return prev; // Keep the quantity unchanged
      }
      if (newQty < 1) {
        return prev; // Prevent quantity from going below 1
      }

      return {
        ...prev,
        [id]: newQty,
      };
    });
  };
  return (
    <div className="grid grid-cols-1 gap-2">
      {cart.items.length > 0 ? (
        cart.items.map((item) => (
          <Card key={item.id} className="flex space-x-4 p-2">
            <div className="relative w-[130px] h-[130px]">
              <Image
                alt={item.name}
                src={item.images[0].url}
                fill
                quality={100}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="space-y-1">
                <h1 className="text-sm font-semibold">{item.name}</h1>
                <p className="font-bold text-red-600">
                  {formatter.format(Number(item.price))}
                </p>
                <p>Size: {item.sizes[0].size.name}</p>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="flex border p-1 space-x-4">
                  <span
                    className="cursor-pointer text-lg"
                    onClick={() => handleQtyChange(item.id,   -1, item)}
                  >
                    -
                  </span>
                  <span className="text-lg">{quantities[item.id] ?? 1}</span>
                  <span
                    className="cursor-pointer text-lg"
                    onClick={() => handleQtyChange(item.id, 1, item)}
                  >
                    +
                  </span>
                </div>
                <Button
                  onClick={() => {
                    cart.removeItem(item.id);
                  }}
                  variant={"destructive"}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="my-10">
          <NoResult />
        </div>
      )}
    </div>
  );
}
