import { Favorite } from "@prisma/client";
import axios from "axios";
import { Product } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/favorite`;
type FavoriteWithProduct = Favorite & { product: Product };
export const getFavorite = async (
  userId: string
): Promise<FavoriteWithProduct[]> => {
  try {
    const response = await axios.get(`${URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
