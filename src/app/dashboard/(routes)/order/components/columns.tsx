"use client";

import { ColumnDef } from "@tanstack/react-table";
export type OrderColumn = {
  id: string;
  products: string;
  address: string;
  phone: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
  status: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
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
