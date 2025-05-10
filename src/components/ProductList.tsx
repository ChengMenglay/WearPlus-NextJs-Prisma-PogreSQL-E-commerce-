import React from "react";
import { Product as ProductType } from "../../types";
import { Separator } from "./ui/separator";
import NoResult from "./no-result";
import ProductCard from "./ProductCard";
import { getUserId } from "@/app/(auth)/actions/authActions";

interface ProductListProps {
  products: ProductType[] | null;
  title: string;
}
export default async function ProductList({ products, title }: ProductListProps) {
  const userId = await getUserId();
  return (
    <div className="container mx-auto my-8">
      <h1 className="font-bold text-2xl">{title}</h1>
      <Separator className="my-3" />
      {products?.length === 0 ? (
        <NoResult />
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {products?.map((product) => (
            <ProductCard key={product.id} userId={userId as string} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
