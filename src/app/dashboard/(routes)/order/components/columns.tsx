"use client";

import { ColumnDef } from "@tanstack/react-table";
export type OrderColumn = {
  id: string;
  customer:string;
  address: string;
  phone: string;
  products: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
  status: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
