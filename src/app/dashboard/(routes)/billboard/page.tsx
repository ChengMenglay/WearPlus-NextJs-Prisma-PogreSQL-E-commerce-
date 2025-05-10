import React from "react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { BillboardColumn } from "./components/columns";
import { ClientBillboard } from "./components/client";

export default async function BillboardPage() {
  const billboards = await prisma.billboard.findMany({
    orderBy: { createdAt: "desc" },
  });
  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    createAt: format(item.createdAt, "do, MMMM, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientBillboard data={formattedBillboards} />
      </div>
    </div>
  );
}
