import axios from "axios";
import { Category } from "../types";
import qs from "query-string";

type Query = {
  limit?: number;
};

const getAllCategory = async (query: Query = {}): Promise<Category[]> => {
  try {
    const url = qs.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/category`,
      query: query.limit ? { limit: query.limit } : {},
    });

    const response = await axios.get(url);
    return await response.data;
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

export const getCategoryByName = async (
  name: string
): Promise<Category | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/category`
    );
    const categories: Category[] = response.data;
    let category = categories.find((item) => item.name === name);
    if (!category) {
      category = categories.find((item) => {
        const transformedName = item.name.toLowerCase().replace(/ /g, "-");
        return transformedName === name.toLowerCase();
      });
    }
    return category || null;
  } catch (error) {
    console.error("Error fetching category by name:", error);
    return null;
  }
};

export default getAllCategory;
