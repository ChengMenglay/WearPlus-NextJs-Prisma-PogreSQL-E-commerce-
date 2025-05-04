"use client";
import React, { FC } from "react";
import { DeliveryColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";

interface DeliveryProps {
  data: DeliveryColumn[];
}
export const ClientDelivery: FC<DeliveryProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
        <Header
          title="Deliveries"
          total={data.length}
          subtitle="Manage deliveries for your store."
        />
        <Button onClick={() => router.push(`/dashboard/delivery/new`)}>
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
