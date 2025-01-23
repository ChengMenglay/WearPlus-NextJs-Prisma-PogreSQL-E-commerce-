"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Button } from "@/components/ui/button";

export type ProductColumn = {
  id: string;
  name: string;
  detail: string;
  price: string;
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
    accessorKey: "category",
    header: "Category",
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
    accessorKey: "createAt",
    header: "Date",
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
    accessorKey: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
