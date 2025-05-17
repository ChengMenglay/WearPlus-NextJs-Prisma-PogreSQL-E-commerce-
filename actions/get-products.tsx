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
  skip?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  price_gte?: number;
  price_lte?: number;
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
      skip: query.skip,
      orderBy: query.orderBy,
      orderDirection: query.orderDirection,
      price_gte: query.price_gte,
      price_lte: query.price_lte,
    },
  });
  const res = await axios.get(url);
  return res.data;
};
export const getProductById = async (productId: string): Promise<Product> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/${productId}`
  );
  return res.data;
};

export default getProducts;
