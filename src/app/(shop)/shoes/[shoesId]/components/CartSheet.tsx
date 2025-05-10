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
import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function CartSheet() {
  const { isOpen: sheetIsOpen, onOpen, onClose } = useOpenSheet();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleCheckout = () => {
    try {
      setIsLoading(true);
      // No need to manipulate quantities here as they're already stored in the cart items
      onClose();
      router.push("/checkout");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong that can not process the checkout!");
    } finally {
      setIsLoading(false);
    }
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
                <Button disabled={isLoading} onClick={handleCheckout}>
                  {isLoading && <CgSpinnerTwoAlt className="animate-spin" />}
                  <span>{isLoading ? "Loading..." : "Checkout"}</span>
                </Button>
              </div>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
