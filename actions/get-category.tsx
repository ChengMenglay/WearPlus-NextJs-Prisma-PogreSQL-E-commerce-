import { Category } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/category`;

const getAllCategory = async (): Promise<Category[]> => {
  const categories = await fetch(URL, { method: "GET", cache: "no-store" });
  return categories.json();
};

export const getCategoryById = async (
  categoryId: string
): Promise<Category> => {
  const category = await fetch(`${URL}/${categoryId}`, {
    method: "GET",
    cache: "no-store",
  });
  return category.json();
};
export default getAllCategory;
