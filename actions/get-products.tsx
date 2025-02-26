import qs from "query-string";
import { Product } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/product`;

interface Query {
  productId?: string;
  categoryId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  limit?: number;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      productId: query.productId,
      categoryId: query.categoryId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
      limit: query.limit,
    },
  });
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const data = await res.json();
  return data;
};
export const getProductById = async (productId: string): Promise<Product> => {
  const res = await fetch(`${URL}/${productId}`, {
    method: "GET",
    cache: "no-store",
  });
  return res.json();
};

export default getProducts;
