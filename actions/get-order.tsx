import { Order } from "@prisma/client";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/order`;

export const getOrderHistory = async (userId: string): Promise<Order[]> => {
  try {
    const response = await axios.get(`${URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
