import React from "react";
import { getCategoryByName } from "../../../../../actions/get-category";
import getProducts from "../../../../../actions/get-products";
import axios from "axios";
import ShoesCompoent from "../component/ShoesCompoent";
import { getUserId } from "@/app/(auth)/actions/authActions";

interface ShoesPageListProps {
  params: {
    shoesId: string;
  };
  searchParams: {
    page?: string;
    sort?: string;
    price_gte?: string;
    price_lte?: string;
    brand?: string;
  };
}
const ITEMS_PER_PAGE = 12;
export default async function ShoesPageList({
  searchParams,
  params,
}: ShoesPageListProps) {
  const { shoesId } = await params;
  const category = await getCategoryByName(shoesId);
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

  const [products, userId, totalProductsCount] = await Promise.all([
    getProducts({
      ...sortParams,
      limit: ITEMS_PER_PAGE,
      categoryId: category?.id as string,
      skip: skip,
      price_gte: priceGte,
      price_lte: priceLte,
    }),
    getUserId(),
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/count?categoryId=${
          category?.id || ""
        }`
      )
      .then((res) => res.data.count)
      .catch(() => 0),
  ]);
  const totalPages = Math.ceil(totalProductsCount / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto my-6 px-4">
      <ShoesCompoent
        title={category?.name as string}
        description={category?.description as string}
        userId={userId as string}
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        baseURL={`/shoes/${shoesId}`}
      />
    </div>
  );
}
