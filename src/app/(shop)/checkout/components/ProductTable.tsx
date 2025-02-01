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

export default function ProductTable() {
  const cart = useCart();
  return (
    <>
      {cart.items.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow>
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
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-red-600 font-bold">
                  {formatter.format(
                    (item?.quantity as number) * parseFloat(item.price)
                  )}
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
