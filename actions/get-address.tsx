import { Address } from "../types";

const URL = process.env.NEXT_PUBLIC_API_URL;
export const getAllAddress = async (): Promise<Address[]> => {
  try {
    const address = await fetch(`${URL}/api/address`, { method: "GET" });
    if (!address.ok) {
      throw new Error(`Failed to fetch address: ${address.statusText}`);
    }
    const data = await address.json();
    return data;
  } catch (error) {
    console.error("Error fetching address data", error);
    throw error;
  }
};
