"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type CustomerColumn = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  role: string;
  createAt: string;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "role",
    header: "Role",
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
