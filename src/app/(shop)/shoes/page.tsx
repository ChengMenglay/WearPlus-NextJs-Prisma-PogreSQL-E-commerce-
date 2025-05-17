import React from "react";
import getProducts from "../../../../actions/get-products";
import { getUserId } from "@/app/(auth)/actions/authActions";
import axios from "axios";
import ShoesCompoent from "./component/ShoesCompoent";
import getAllCategory from "../../../../actions/get-category";

interface ShoesPageProps {
  searchParams: {
    page?: string;
    sort?: string;
    price_gte?: string;
    price_lte?: string;
    brand?: string;
  };
}
const ITEMS_PER_PAGE = 12;
export default async function Shoes({ searchParams }: ShoesPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const sortOption = searchParams.sort || "featured";
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const priceGte = searchParams.price_gte
    ? parseFloat(searchParams.price_gte)
    : undefined;
  const priceLte = searchParams.price_lte
    ? parseFloat(searchParams.price_lte)
    : undefined;
  // Determine sort parameters based on the sort option
  let sortParams = {};

  switch (sortOption) {
    case "price_asc":
      sortParams = { orderBy: "price", orderDirection: "asc" };
      break;
    case "price_desc":
      sortParams = { orderBy: "price", orderDirection: "desc" };
      break;
    case "name_asc":
      sortParams = { orderBy: "name", orderDirection: "asc" };
      break;
    case "name_desc":
      sortParams = { orderBy: "name", orderDirection: "desc" };
      break;
    case "date_asc":
      sortParams = { orderBy: "createAt", orderDirection: "asc" };
      break;
    case "date_desc":
      sortParams = { orderBy: "createAt", orderDirection: "desc" };
      break;
    default:
      sortParams = { isFeatured: true };
      break;
  }
  const [products, categories, userId, totalProductsCount] = await Promise.all([
    getProducts({
      ...sortParams,
      limit: ITEMS_PER_PAGE,
      categoryId: searchParams.brand,
      skip: skip,
      price_gte: priceGte,
      price_lte: priceLte,
    }),
    getAllCategory(),
    getUserId(),
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/count?categoryId=${
          searchParams.brand || ""
        }`
      )
      .then((res) => res.data.count)
      .catch(() => 0),
  ]);
  const totalPages = Math.ceil(totalProductsCount / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto my-6 px-4">
      <ShoesCompoent
        title={"Shoes"}
        description={
          "In the WEARPLUS store you will find fashionable sneakers perfect for" +
          " every occasion. We offer a wide selection of sneakers from different" +
          " brands that combine style, comfort and quality. Air Jordan, Yeezy, Nike" +
          " Supreme, Adidas Campus and many more. We invite you to discover our" +
          " collection!"
        }
        userId={userId as string}
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        baseURL={"/shoes"}
        categories={categories}
      />
    </div>
  );
}
