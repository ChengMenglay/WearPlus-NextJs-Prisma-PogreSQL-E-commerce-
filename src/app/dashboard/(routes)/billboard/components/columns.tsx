"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type BillboardColumn = {
  id: string;
  title: string;
  url: string;
  createAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "image",
    cell: ({ row }) => (
      <Image
        alt={row.original.title}
        width={200}
        height={200}
        src={row.original.url}
        className="rounded-md"
      />
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
