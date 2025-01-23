"use client";
import React from "react";
import { Button } from "../ui/button";
import { Search, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import useOpenSheet from "@/hooks/open-sheet";
import CartSheet from "@/app/(shop)/shoes/[shoesId]/components/CartSheet";

export default function NavbarAction() {
  const cart = useCart();
  const { onOpen } = useOpenSheet();
  const handleOpenSheet = () => {
    onOpen();
  };
  return (
    <div className="flex space-x-2 items-center">
      <CartSheet />
      <Search size={18} />
      <Button variant={"outline"} onClick={handleOpenSheet}>
        <ShoppingCart size={18} />
        <span>{cart.items.length}</span>
      </Button>
    </div>
  );
}
