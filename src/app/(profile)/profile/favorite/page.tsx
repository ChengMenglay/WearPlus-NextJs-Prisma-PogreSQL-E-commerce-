import { getUserId } from "@/app/(auth)/actions/authActions";
import NoResult from "@/components/no-result";
import { Card } from "@/components/ui/card";
import React from "react";
import { getFavorite } from "../../../../../actions/get-favorite";
import ProductCard from "@/components/ProductCard";

export default async function Favorite() {
  const userId = await getUserId();
  const favorites = await getFavorite(userId as string);
  if (!favorites || favorites.length === 0)
    return (
      <Card className=" h-full md:h-[80vh] p-4">
        <NoResult />
      </Card>
    );

  return (
    <Card className=" h-full md:h-[80vh] p-4 overflow-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        {favorites.map((favorite) => (
          <ProductCard
            key={favorite.id}
            product={favorite.product}
            userId={userId as string}
          />
        ))}
      </div>
    </Card>
  );
}
