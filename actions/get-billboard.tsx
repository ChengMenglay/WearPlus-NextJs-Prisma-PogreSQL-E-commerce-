import { Billboard } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/billboard`;
const getBillboard = async (): Promise<Billboard[]> => {
  const res = await fetch(URL, { method: "GET", cache: "no-store" });
  const data = await res.json();
  return data;
};

export default getBillboard;
