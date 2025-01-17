import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Separator } from "@/components/ui/separator";
import SignOutButton from "@/components/SignOutButton";
import { getUserInfor } from "@/app/(auth)/actions/authActions";
import EditProfile from "./EditProfile";

export default async function Profile() {
  const users = await getUserInfor();
  return (
    <Card className=" h-full md:h-[80vh]">
      <CardHeader className="text-xl font-semibold">
        <div className="flex justify-between items-center">
          <div>
            {users?.role === "admin" ? "Admin Profile" : "User Profile"}
          </div>
          <SignOutButton
            className="p-2 border border-gray-300 rounded-md cursor-pointer"
            size={18}
          />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2">
        <EditProfile users={users} />
      </CardContent>
    </Card>
  );
}
