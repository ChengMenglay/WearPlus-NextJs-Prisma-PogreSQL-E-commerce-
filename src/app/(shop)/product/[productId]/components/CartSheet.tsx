"use client";
import useOpenSheet from "@/hooks/open-sheet";
import React, { useState, useCallback, useEffect } from "react";
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
import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

export default function CartSheet() {
  const { isOpen: sheetIsOpen, onOpen, onClose } = useOpenSheet();
  const [total, setTotal] = useState(0);
  const cart = useCart();
  const router = useRouter();

  // Function to handle quantity updates and recalculate the total
  const handleCalculateQty = useCallback(() => {
    // Recalculate the total based on all items in cart
    const newTotal = cart.items.reduce((acc, cartItem) => {
      const price = parseFloat(cartItem.price);
      const quantity = cartItem.quantity || 1;
      return acc + price * quantity;
    }, 0);

    setTotal(newTotal);
  }, [cart.items]);

  useEffect(() => {
    onClose();
  }, [onClose, router]);

  return (
    <Sheet
      open={sheetIsOpen as boolean}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            <div>
              <CartItem handleCalculateQty={handleCalculateQty} />
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          {cart.items.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className=" font-bold text-red-600">
                Total: {formatter.format(total)}
              </p>
              <div className="flex justify-end">
                <Button onClick={() => router.push("/checkout")}>
                  Checkout
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
