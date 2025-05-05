import axios from "axios";
import { Delivery } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/delivery`;

export const getAllDelivery = async (): Promise<Delivery[]> => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching delivery data", error);
    throw error;
  }
};
