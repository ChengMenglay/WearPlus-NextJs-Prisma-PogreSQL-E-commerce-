"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type DeliveryColumn = {
  id: string;
  logo_url: string;
  name: string;
  price: number;
  description: string;
  createdAt: string;
};

export const columns: ColumnDef<DeliveryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Image",
    cell: ({ row }) => (
      <Image
        alt={row.original.name}
        width={100}
        height={100}
        src={row.original.logo_url}
        className="rounded-md"
      />
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
