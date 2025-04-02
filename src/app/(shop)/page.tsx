import React from "react";
import getProducts from "../../../actions/get-products";
import { Billboard } from "@/components/Billboard";
import getBillboard from "../../../actions/get-billboard";
import ProductList from "@/components/ProductList";
import FavBrand from "@/components/FavBrand";
import getAllCategory from "../../../actions/get-category";
import StationaryStore from "@/components/StationaryStore";
import BrandLogo from "@/components/BrandLogo";
import { Separator } from "@/components/ui/separator";

const HomePage = async () => {
  const [billboards, newproducts, jardan, nike, traviscott, latestBrand] =
    await Promise.all([
      getBillboard(),
      getProducts({ isFeatured: true, limit: 5 }),
      getProducts({
        isFeatured: true,
        categoryId: "cm37mw7pg000184wrfssnowyv",
        limit: 5,
      }),
      getProducts({
        isFeatured: true,
        categoryId: "cm37lltfl000016e7ei0nsd68",
        limit: 5,
      }),
      getProducts({
        isFeatured: true,
        categoryId: "cm61ubika00003btw9kxh8lm0",
        limit: 5,
      }),
      getAllCategory({ limit: 4 }),
    ]);
  return (
    <div className="px-2">
      <Billboard billboards={billboards} />
      <div className="px-4 my-8">
        <ProductList title="New" products={newproducts} />
      </div>
      <div className="px-4 my-8">
        <ProductList title="Jardan" products={jardan} />
      </div>
      <div className="px-4 my-8">
        <FavBrand categories={latestBrand} />
      </div>
      <div className="px-4 my-8">
        <ProductList title="Travis Scott" products={traviscott} />
      </div>
      <div className="px-4 my-8">
        <ProductList title="Nike" products={nike} />
      </div>
      <div className="px-4 my-8">
        <StationaryStore />
      </div>
      <div className="px-4 my-8">
        <Separator className="my-4" />
        <BrandLogo />
        <Separator className="my-4" />
      </div>
    </div>
  );
};

export default HomePage;
