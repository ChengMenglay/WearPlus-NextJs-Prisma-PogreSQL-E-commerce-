"use client";
import useOpenSheet from "@/hooks/open-sheet";
import React, { useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CartItem from "./CartItem";
import { formatter } from "@/lib/utils";
import { Product } from "../../../../../../types";
import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartSheet() {
  const { isOpen: sheetIsOpen, onOpen, onClose } = useOpenSheet();
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const cart = useCart();
  const router = useRouter();

  // Function to handle quantity updates and recalculate the total
  const handleCalculateQty = useCallback(
    (item: Product, qty: number) => {
      setQuantities((prev) => {
        const updatedQuantities = {
          ...prev,
          [item.id]: qty,
        };

        // Recalculate the total based on updated quantities
        const newTotal = Object.entries(updatedQuantities).reduce(
          (acc, [id, quantity]) => {
            const itemPrice = cart.items.find((item) => item.id === id)?.price;
            if (!itemPrice) return acc; // Ensure price is found for the item

            const price = parseFloat(itemPrice); // Ensure price is a float
            return acc + price * quantity;
          },
          0
        );

        setTotal(newTotal);
        return updatedQuantities;
      });
    },
    [cart.items]
  ); // Include cart.items to trigger recalculations when cart changes

  const handleCheckout = () => {
    const newCart: Product[] = [];
    cart.items.map((item) =>
      newCart.push({ ...item, quantity: quantities[item.id] || 1 })
    );
    cart.removeAll();
    newCart.forEach((product) => {
      cart.addItem(product); // Call addItem for each product individually
    });
    onClose();
    router.push("/checkout");
  };
  return (
    <Sheet
      open={sheetIsOpen as boolean}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            <CartItem handleCalculateQty={handleCalculateQty} />
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          {cart.items.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className=" font-bold text-red-600">
                Total: {formatter.format(total)}
              </p>
              <div className="flex justify-end">
                <Button onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
