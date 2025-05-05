import qs from "query-string";
import { Product } from "../types";
import axios from "axios";

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
  const res = await axios.get(url);
  return res.data;
};
export const getProductById = async (productId: string): Promise<Product> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${productId}`);
  return res.data;
};

export default getProducts;
