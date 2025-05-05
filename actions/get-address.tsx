import axios from "axios";
import { Address } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/address`;

export const getAllAddress = async (): Promise<Address[]> => {
  try {
    const address = await axios.get(URL);
    return address.data;
  } catch (error) {
    console.error("Error fetching address data", error);
    throw error;
  }
};