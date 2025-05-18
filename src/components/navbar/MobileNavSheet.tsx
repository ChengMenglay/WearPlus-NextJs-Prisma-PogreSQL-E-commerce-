"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Category } from "../../../types";
import useMobileNav from "@/hooks/use-mobile-nav";
import Link from "next/link";

type MobileNavSheetProps = {
  categories: Category[] | null;
};

export default function MobileNavSheet({ categories }: MobileNavSheetProps) {
  const { isOpen, onOpen, onClose } = useMobileNav();
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <SheetContent className="w-[300px] sm:w-[350px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-6">
          <Link 
            href="/shoes" 
            className="text-lg font-medium hover:text-gray-700"
            onClick={onClose}
          >
            Shoes
          </Link>
          
          {/* Categories submenu */}
          <div className="pl-4 flex flex-col space-y-2">
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/shoes/${category.name.toLowerCase().replace(" ", "-")}`}
                className="text-base hover:text-gray-700"
                onClick={onClose}
              >
                {category.name}
              </Link>
            ))}
          </div>
          
          <Link 
            href="/about" 
            className="text-lg font-medium hover:text-gray-700"
            onClick={onClose}
          >
            About Us
          </Link>
          
          <Link 
            href="/stationary-shop" 
            className="text-lg font-medium hover:text-gray-700"
            onClick={onClose}
          >
            Stationary Shop
          </Link>
          
          <Link 
            href="/faq" 
            className="text-lg font-medium hover:text-gray-700"
            onClick={onClose}
          >
            FAQ
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}