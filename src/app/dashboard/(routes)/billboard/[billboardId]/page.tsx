import React from "react";
import BillboardForm from "./components/Billboard-Form";
import { prisma } from "@/lib/prisma";
export default async function CategoryPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prisma.billboard.findUnique({
    where: { id: params.billboardId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}
