import React, { ReactNode } from "react";
import ProfileSidebar from "./ProfileSidebar";
import { getUserId } from "@/app/(auth)/actions/authActions";
import { getPendingOrder } from "../../../../actions/get-order";
export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userId = await getUserId();
  const orderPending = await getPendingOrder(userId as string);
  return (
    <div className="container grid grid-rows-12 md:grid-cols-12 px-4 mx-auto h-[80vh] gap-4 mt-4">
      <div className="row-span-2 lg:col-span-3 md:col-span-4 overflow-x-auto md:overflow-visible">
        <ProfileSidebar orderPending={orderPending} />{" "}
      </div>
      <div className="row-span-10 lg:col-span-9 md:col-span-8 overflow-x-auto md:overflow-visible">
        {children}
      </div>
    </div>
  );
}
