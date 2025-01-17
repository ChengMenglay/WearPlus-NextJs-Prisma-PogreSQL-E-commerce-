import { Category } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/category`;

const getAllCategory = async (): Promise<Category[]> => {
  const categories = await fetch(URL, { method: "GET" });
  return categories.json();
};

export const getCategoryById = async (
  categoryId: string
): Promise<Category> => {
  const category = await fetch(`${URL}/${categoryId}`, { method: "GET" });
  return category.json();
};
export default getAllCategory;
