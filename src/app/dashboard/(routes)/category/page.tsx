import React from "react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { CategoryColumn } from "./components/columns";
import { ClientCategory } from "./components/client";

export default async function CategoryPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createAt: "desc" },
  });
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createAt: format(item.createAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientCategory data={formattedCategories} />
      </div>
    </div>
  );
}
