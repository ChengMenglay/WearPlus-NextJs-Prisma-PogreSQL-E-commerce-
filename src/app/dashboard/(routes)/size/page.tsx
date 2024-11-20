import React from "react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { SizeColumn } from "./components/columns";
import { ClientSize } from "./components/client";

export default async function CategoryPage() {
  const sizes = await prisma.size.findMany({
    orderBy: { createAt: "desc" },
  });
  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientSize data={formattedSizes} />
      </div>
    </div>
  );
}
