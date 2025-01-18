import React from "react";
import getProducts, {
  getProductById,
} from "../../../../../actions/get-products";
import ProductDetail from "./ProductDetail";
import ProductList from "@/components/ProductList";

type ProductDetailPageProps = {
  params: { shoesId: string };
};
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProductById(params.shoesId);
  const relatedProducts = await getProducts({
    categoryId: product.category.id,
  });
  return (
    <div className="container mx-auto px-4 mt-10">
      <ProductDetail product={product} />
      <div>
        <ProductList products={relatedProducts} title="Related Products" />
      </div>
    </div>
  );
}
