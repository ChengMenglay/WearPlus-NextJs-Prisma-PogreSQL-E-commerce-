"use client";
import React, { FC } from "react";
import { ProductColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";

interface ProductClientProps {
  data: ProductColumn[];
}
export const ClientProduct: FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const [filterdProduct, setFilterdProduct] = React.useState(data);
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
        <Header
          title="Products"
          total={data.length}
          subtitle="Manage products for your store."
        />
        <div className="flex items-center gap-2">
          <Button
            variant={"destructive"}
            onClick={() =>
              setFilterdProduct(data.filter((item) => item.stock < 10))
            }
          >
            Low Stock
          </Button>
          <Button onClick={() => router.push(`/dashboard/product/new`)}>
            Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={filterdProduct} />
    </>
  );
};
