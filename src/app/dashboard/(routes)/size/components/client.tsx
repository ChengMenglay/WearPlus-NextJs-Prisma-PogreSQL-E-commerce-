"use client";
import React, { FC } from "react";
import { SizeColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";

interface SizeClientProps {
  data: SizeColumn[];
}
export const ClientSize: FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
        <Header
          title="Sizes"
          total={data.length}
          subtitle="Manage sizes for your store."
        />
        <Button onClick={() => router.push(`/dashboard/size/new`)}>
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="value" columns={columns} data={data} />
    </>
  );
};
