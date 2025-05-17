"use client";
import NoResult from "@/components/no-result";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useCart from "@/hooks/use-cart";
import { formatter } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Product } from "../../../../../../types";

type CartItemProps = {
  handleCalculateQty: (item: Product, qty: number) => void;
};

export default function CartItem({ handleCalculateQty }: CartItemProps) {
  const cart = useCart();
  
  useEffect(() => {
    cart.items.forEach((item) => {
      handleCalculateQty(item, item.quantity || 1);
    });
  }, [cart.items, handleCalculateQty]);

  const handleQtyChange = (item: Product, delta: number) => {
    const currentQty = item.quantity || 1;
    const newQty = currentQty + delta;
    const sizeId = item.sizes[0].id;
    
    // Let the cart hook handle validation
    cart.updateQuantity(item.id, sizeId, newQty);
  };
  
  return (
    <div className="grid grid-cols-1 gap-2">
      {cart.items.length > 0 ? (
        cart.items.map((item) => (
          <Card key={`${item.id}-${item.sizes[0].id}`} className="flex space-x-4 p-2">
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
                    onClick={() => handleQtyChange(item, -1)}
                  >
                    -
                  </span>
                  <span className="text-lg">{item.quantity || 1}</span>
                  <span
                    className="cursor-pointer text-lg"
                    onClick={() => handleQtyChange(item, 1)}
                  >
                    +
                  </span>
                </div>
                <Button
                  onClick={() => {
                    cart.removeItem(item.id, item.sizes[0].id);
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