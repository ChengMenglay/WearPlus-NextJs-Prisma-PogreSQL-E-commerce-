"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type CategoryColumn = {
  id: string;
  name: string;
  url: string | null;
  createAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "url",
    cell: ({ row }) => (
      <Image
        alt={row.original.name}
        width={200}
        height={200}
        src={row.original.url ? row.original.url : ""}
        className="rounded-md"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
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
