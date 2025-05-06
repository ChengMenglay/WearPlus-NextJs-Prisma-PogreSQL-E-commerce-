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
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  const router = useRouter();
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
            onClick={async () => {
              const response = await axios.put("/api/order", {
                orderId: data.id,
                status: status1,
              });
              if (response.status === 200) {
                toast.success("Order status has been changed.");
                router.refresh();
              }
            }}
          >
            {status1}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              const response = await axios.put("/api/order", {
                orderId: data.id,
                status: status2,
              });
              if (response.status === 200) {
                toast.success("Order status has been changed.");
                router.refresh();
              }
            }}
          >
            {status2}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
