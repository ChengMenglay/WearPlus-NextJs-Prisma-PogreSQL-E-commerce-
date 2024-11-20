"use client";
import React, { FC } from "react";
import { BillboardColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";

interface BillboardClientProps {
  data: BillboardColumn[];
}
export const ClientBillboard: FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
        <Header
          title="Billboards"
          total={data.length}
          subtitle="Manage billboards for your store."
        />
        <Button onClick={() => router.push(`/dashboard/billboard/new`)}>
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
