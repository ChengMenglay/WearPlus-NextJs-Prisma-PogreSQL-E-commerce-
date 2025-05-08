"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type ProductColumn = {
  id: string;
  name: string;
  detail: string;
  price: string;
  image: string;
  stock: number;
  type: string;
  category: string;
  size: string[];
  isFeatured: boolean;
  isArchived: boolean;
  status?: string;
  createAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    cell: ({ row }) => (
      <Image
        alt={row.original.name}
        width={100}
        height={100}
        src={row.original.image}
        className="rounded-md"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "status",
    cell: ({ row }) => (
      <Button
        variant={row.original.status === "Active" ? "secondary" : "destructive"}
      >
        {row.original.status}
      </Button>
    ),
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
