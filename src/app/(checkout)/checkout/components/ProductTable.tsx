"use client";
import NoResult from "@/components/no-result";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCart from "@/hooks/use-cart";
import { formatter } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductTable() {
  const { items, removeItem, updateQuantity } = useCart();

  const handleQtyChange = (id: string, sizeId: string, delta: number) => {
    const item = items.find(
      (item) => item.id === id && item.sizes.some((size) => size.id === sizeId)
    );

    if (!item) return;

    const currentQty = item.quantity || 1;
    const newQty = currentQty + delta;

    // Let the cart hook handle validation
    updateQuantity(id, sizeId, newQty);
  };

  return (
    <>
      {items.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={`${item.id}-${item.sizes[0].id}`}>
                <TableCell>
                  <div className="flex sm:gap-10 gap-4">
                    <div className="relative sm:w-[100px] w-[70px] sm:h-[100px] h-[70px]">
                      <Image
                        alt={item.name}
                        src={item.images[0].url}
                        fill
                        quality={100}
                        className="object-cover"
                      />
                    </div>
                    <div className="sm:space-y-2">
                      <h1 className="sm:text-lg text-sm font-semibold">
                        {item.name}
                      </h1>
                      <p className="font-bold text-red-600">
                        {formatter.format(Number(item.price))}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.sizes[0].size.name}</TableCell>
                <TableCell>
                  <div className=" p-1 space-x-4">
                    <span
                      className="cursor-pointer text-lg"
                      onClick={() =>
                        handleQtyChange(item.id, item.sizes[0].id, -1)
                      }
                    >
                      -
                    </span>
                    <span className="text-lg">{item.quantity || 1}</span>
                    <span
                      className="cursor-pointer text-lg"
                      onClick={() =>
                        handleQtyChange(item.id, item.sizes[0].id, 1)
                      }
                    >
                      +
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-red-600 font-bold">
                  {formatter.format(
                    Number(item.quantity || 1) * Number(item.price)
                  )}
                </TableCell>
                <TableCell className="text-red-600 font-bold">
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => removeItem(item.id, item.sizes[0].id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center my-10">
          <NoResult />
        </div>
      )}
    </>
  );
}
