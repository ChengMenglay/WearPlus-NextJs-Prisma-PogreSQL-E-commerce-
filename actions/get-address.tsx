import axios from "axios";
import { Address } from "../types";
import { getUserId } from "@/app/(auth)/actions/authActions";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/address`;

export const getAllAddress = async (): Promise<Address[]> => {
  try {
    const userId = await getUserId();
    const address = await axios.get(URL + `?userId=${userId}`);
    return address.data;
  } catch (error) {
    console.error("Error fetching address data", error);
    throw error;
  }
};
