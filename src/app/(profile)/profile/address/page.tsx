import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import AddressForm from "./AddressForm";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getUserInfor } from "@/app/(auth)/actions/authActions";

export default async function Address() {
  const session = await auth();
  const userId = session?.user.id;
  const user = (await session?.user) && (await getUserInfor());
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
  const provinces = await prisma.province.findMany();
  return (
    <Card className=" h-full md:h-[80vh]">
      <CardContent className="my-4 p-2">
        <AddressForm
          user={user ? user : null}
          addresses={addresses}
          provinces={provinces}
        />
      </CardContent>
    </Card>
  );
}
