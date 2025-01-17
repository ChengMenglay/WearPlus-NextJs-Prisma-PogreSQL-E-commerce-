import React from "react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { ProductColumn } from "./components/columns";
import { ClientProduct } from "./components/client";
import { formatter } from "@/lib/utils";

export default async function ProductPage() {
  const products = await prisma.product.findMany({
    include: { sizes: { include: { size: true } }, category: true },
    orderBy: { createAt: "desc" },
  });
  const formattedProduct: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    detail: item.detail,
    price: formatter.format(Number(item.price)),
    stock: item.stock,
    type: item.type,
    category: item.category.name,
    size: item.sizes.map((size) => size.size.value),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createAt: format(item.createAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientProduct data={formattedProduct} />
      </div>
    </div>
  );
}
