import { Delivery } from "../types";

const URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/delivery`
  : "";

export const getAllDelivery = async (): Promise<Delivery[]> => {
  try {
    const response = await fetch(URL, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching delivery data", error);
    throw error;
  }
};
