"use client";
import React, { FC } from "react";
import { CategoryColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";

interface CategoryClientProps {
  data: CategoryColumn[];
}
export const ClientCategory: FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
        <Header
          title="Categories"
          total={data.length}
          subtitle="Manage categories for your store."
        />
        <Button onClick={() => router.push(`/dashboard/category/new`)}>
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
