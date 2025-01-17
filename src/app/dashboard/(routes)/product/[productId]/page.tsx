import React from "react";
import { prisma } from "@/lib/prisma";
import ProductForm from "./components/Product-Form";
export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: { images: true, sizes: { include: { size: true } } },
  });
  const category = await prisma.category.findMany();
  const size = await prisma.size.findMany();
  const transformedProduct = product
    ? {
        ...product,
        sizes: product.sizes.map((item) => item.size) || [], // Map to size IDs
      }
    : null;
  return (
    <div className="flex-col h-full">
      <div className="space-y-4 p-8 pt-6 ">
        <ProductForm
          category={category}
          size={size}
          initialData={transformedProduct}
        />
      </div>
    </div>
  );
}
