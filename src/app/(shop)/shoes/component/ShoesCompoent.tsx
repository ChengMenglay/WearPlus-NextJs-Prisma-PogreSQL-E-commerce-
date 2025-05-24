import React from "react";
import { Category, Product } from "../../../../../types";
import Heading from "@/components/Heading";
import ProductCard from "@/components/ProductCard";
import PaginationShoes from "@/components/PaginationShoes";
import FilterSheet from "./FilterSheet";
import NoResult from "@/components/no-result";

interface ShoesComponentProps {
  title: string;
  description: string;
  products: Product[];
  userId: string;
  currentPage: number;
  totalPages: number;
  baseURL: string;
  categories?: Category[];
}
export default function ShoesCompoent({
  title,
  description,
  products,
  currentPage,
  userId,
  totalPages,
  baseURL,
  categories,
}: ShoesComponentProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Heading title={title} description={description} />
        <FilterSheet baseURL={baseURL} categories={categories as Category[]} />
      </div>
      <div className="my-8">
        {products.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                userId={userId as string}
              />
            ))}
          </div>
        ) : (
          <NoResult />
        )}
      </div>
      {totalPages > 1 && products.length >= 12 && (
        <div className="my-4">
          <PaginationShoes
            currentPage={currentPage}
            totalPages={totalPages}
            baseURL={baseURL}
          />
        </div>
      )}
    </>
  );
}
