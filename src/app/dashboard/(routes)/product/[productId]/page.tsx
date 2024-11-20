import React from "react";
import { prisma } from "@/lib/prisma";
import ProductForm from "./components/Product-Form";
export default async function SizePage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: { images: true },
  });
  const category = await prisma.category.findMany();
  const size = await prisma.size.findMany();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm category={category} size={size} initialData={product} />
      </div>
    </div>
  );
}
