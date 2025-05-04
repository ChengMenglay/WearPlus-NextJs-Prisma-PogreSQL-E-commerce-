import React from "react";
import getProducts from "../../../../../actions/get-products";
import ProductDetail from "./ProductDetail";
import ProductList from "@/components/ProductList";

type ProductDetailPageProps = {
  params: { shoesId: string };
};
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { shoesId } = await params;
  const product = await getProducts({ productId: shoesId });
  const relatedProducts = await getProducts({
    categoryId: product[0].category.id,
  });
  return (
    <div className="container mx-auto px-4 mt-10">
      <ProductDetail product={product[0]} />
      <div>
        <ProductList products={relatedProducts} title="Related Products" />
      </div>
    </div>
  );
}
