"use client";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import useOpenSheet from "@/hooks/open-sheet";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CartSheet from "@/app/(shop)/product/[productId]/components/CartSheet";

export default function NavbarAction() {
  const cart = useCart();
  const { onOpen } = useOpenSheet();
  const router = useRouter();
  const handleOpenSheet = () => {
    onOpen();
  };
  return (
    <div className="flex md:space-x-2 space-x-1 items-center">
      <CartSheet />
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => router.push("/profile/favorite")}
      >
        <FaRegHeart size={18} />
      </Button>
      <Button variant={"outline"} onClick={handleOpenSheet}>
        <ShoppingCart size={18} />
        <span>{cart.items.length}</span>
      </Button>
    </div>
  );
}
