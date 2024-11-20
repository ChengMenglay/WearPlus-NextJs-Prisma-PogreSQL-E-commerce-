"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { OrderColumn } from "./columns";
import { prisma } from "@/lib/prisma";

type CellActionProps = {
  data: OrderColumn;
  status1: string;
  status2: string;
};
export default function CellAction({
  data,
  status1,
  status2,
}: CellActionProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="w-8 h-8">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              prisma.order.update({
                where: { id: data.id },
                data: { status: status1 },
              })
            }
          >
            {status1}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              prisma.order.update({
                where: { id: data.id },
                data: { status: status2 },
              })
            }
          >
            {status2}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
