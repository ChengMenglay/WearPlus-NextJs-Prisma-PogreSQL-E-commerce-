import React from "react";
import getProducts from "../../../actions/get-products";
import { Billboard } from "@/components/Billboard";
import getBillboard from "../../../actions/get-billboard";
import ProductList from "@/components/ProductList";

const HomePage = async () => {
  const billboards = await getBillboard();
  const newproducts = await getProducts({ isFeatured: true, limit: 5 });
  const jardan = await getProducts({
    isFeatured: true,
    categoryId: "cm37mw7pg000184wrfssnowyv",
    limit: 5,
  });
  return (
    <div className="px-2">
      <Billboard billboards={billboards} />
      <div className="px-4 my-4">
        <ProductList title="New" products={newproducts} />
      </div>
      <div className="px-4 my-4">
        <ProductList title="Jardan" products={jardan} />
      </div>
    </div>
  );
};

export default HomePage;
