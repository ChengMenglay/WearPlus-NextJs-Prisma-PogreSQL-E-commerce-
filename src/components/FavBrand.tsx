import React from "react";
import { Separator } from "./ui/separator";
import { Category } from "../../types";
import FavBrandCard from "./FavBrandCard";

type FavBrandProps = {
  categories: Category[] | null;
};
export default function FavBrand({ categories }: FavBrandProps) {
  return (
    <div className="container mx-auto my-8">
      <h1 className="font-bold text-3xl">{"Your favorite brands"}</h1>
      <Separator className="my-3" />
      <div className="grid   md:grid-cols-4 sm:grid-cols-3 grid-cols-2 mb-10 w-full group">
        {categories?.map((category) => (
          <FavBrandCard
            key={category.id}
            title={category.name}
            image_url={category.url as string}
            link={category.name.split(" ").join("-").toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
}
