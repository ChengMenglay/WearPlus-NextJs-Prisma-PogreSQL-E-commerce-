"use client";
import NoResult from "@/components/no-result";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Order, OrderItem, Product } from "@prisma/client";
import { format } from "date-fns";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

// Define the extended types
type ExtendedOrderItem = OrderItem & {
  product?: Product;
};

type ExtendedOrder = Order & {
  orderItems?: ExtendedOrderItem[];
};

type OrderHistoryProps = {
  orderHistory: ExtendedOrder[];
};

export default function OrderHistoryComponent({
  orderHistory,
}: OrderHistoryProps) {
  if (!orderHistory || orderHistory.length === 0)
    return (
      <div>
        <NoResult />
      </div>
    );

  // Define columns for the DataTable
  const columns: ColumnDef<ExtendedOrder>[] = [
    {
      accessorKey: "orderItems",
      header: "Items",
      cell: ({ row }) => {
        const items = row.original.orderItems || [];
        return <div>{items.map((item) => item.product?.name).join(", ")}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <div>{format(new Date(row.original.createdAt), "do, MMMM, yyyy")}</div>
      ),
    },
    {
      accessorKey: "totalItems",
      header: "Total Items",
      cell: ({ row }) => {
        const items = row.original.orderItems || [];
        return <div>{items.reduce((sum, item) => sum + item.quantity, 0)}</div>;
      },
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => {
        const items = row.original.orderItems || [];
        return (
          <div>
            $
            {items
              .reduce(
                (sum, item) => sum + Number(item.price) * item.quantity,
                0
              )
              .toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === "Completed"
              ? "default"
              : row.original.status === "Pending"
              ? "outline"
              : "destructive"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "isPaid",
      header: "Payment",
      cell: ({ row }) => (
        <Badge variant={row.original.isPaid ? "default" : "outline"}>
          {row.original.isPaid ? "Paid" : "Unpaid"}
        </Badge>
      ),
    },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => <div className="">{row.original.note || "-"}</div>,
    },
  ];

  return (
    <div>
      <CardHeader>
        <CardTitle>Your Order History</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <DataTable columns={columns} data={orderHistory} />
      </CardContent>
    </div>
  );
}
