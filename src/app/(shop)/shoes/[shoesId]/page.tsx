import React from "react";
import { getProductById } from "../../../../../actions/get-products";
import ProductDetail from "./ProductDetail";

type ProductDetailPageProps = {
  params: { shoesId: string };
};
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProductById(params?.shoesId);
  return (
    <div className="container mx-auto px-4 my-8">
      <ProductDetail product={product} />
    </div>
  );
}
