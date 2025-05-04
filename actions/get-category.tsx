import { Category } from "../types";
import qs from "query-string";

const URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/category`
  : "";

type Query = {
  limit?: number;
};

const getAllCategory = async (query: Query = {}): Promise<Category[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: query.limit ? { limit: query.limit } : {},
    });

    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error; // Re-throw to let the caller handle it
  }
};

export const getCategoryById = async (
  categoryId: string
): Promise<Category> => {
  try {
    const response = await fetch(`${URL}/${categoryId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch category by ID: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error; // Re-throw to let the caller handle it
  }
};

export default getAllCategory;
