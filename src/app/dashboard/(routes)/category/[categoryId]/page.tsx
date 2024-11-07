import { getUserInfor } from "@/app/(auth)/actions/authActions";
import { redirect } from "next/navigation";
import React from "react";
import CategoryForm from "./components/Category-Form";
import { prisma } from "@/lib/prisma";
export default async function CategoryId() {
  const user = await getUserInfor();
  // const categories = await prisma.category.findFirst({ where });
  if (!user) {
    redirect("/");
  }
  const category = await prisma.category.findFirst({ where: {} });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={user} />
      </div>
    </div>
  );
}
