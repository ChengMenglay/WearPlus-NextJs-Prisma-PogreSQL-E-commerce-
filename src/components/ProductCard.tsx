"use client";
import React from "react";
import { Product } from "../../types";
import { Card } from "./ui/card";
import Image from "next/image";
import { formatter } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ProductCard = {
  product: Product;
};
export default function ProductCard({ product }: ProductCard) {
  const router = useRouter();
  return (
    <Card
      className="p-3 space-y-4 cursor-pointer"
      onClick={() => router.push(`/shoes/${product.id}`)}
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          alt={product.name + product.id}
          src={product.images[0]?.url}
          className=" object-contain"
          fill
        />
      </div>
      <div>
        <h1 className="text-sm font-semibold truncate">{product.name}</h1>
        <p className="text-xs font-semibold text-gray-400">
          {product.type === "Men"
            ? "Men's shoes"
            : product.type === "Women"
            ? "Wowen's shoes"
            : product.type === "Kids"
            ? "Kid's shoes"
            : null}
        </p>
        <p className="text-md font-bold my-2">
          {formatter.format(Number(product.price))}
        </p>
      </div>
    </Card>
  );
}
