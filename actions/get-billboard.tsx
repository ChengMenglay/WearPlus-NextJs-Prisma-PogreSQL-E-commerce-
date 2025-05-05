import axios from "axios";
import { Billboard } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/billboard`;

const getBillboard = async (): Promise<Billboard[]> => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching billboard data", error);
    throw error;
  }
};

export default getBillboard;