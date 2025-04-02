import React from "react";
import { Card } from "../ui/card";
import UserNavbar from "./UserMenu";
import { auth } from "@/auth";
import { getUserInfor } from "@/app/(auth)/actions/authActions";
import Link from "next/link";
import ManuLink from "./ManuLink";
import getAllCategory from "../../../actions/get-category";
import NavbarAction from "./navbar-action";

export default async function Navbar() {
  const session = await auth();
  const users = session?.user && (await getUserInfor());
  const categories = await getAllCategory();
  return (
    <Card className="w-full h-16 rounded-none sticky top-0 z-50 flex justify-center px-4">
      <div className=" container h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-black text-2xl sm:text-2xl">
          WEARPLUS
        </Link>
        <div>
          <ManuLink categories={categories} />
        </div>
        <div className="flex space-x-4 items-center justify-center">
          <NavbarAction />
          {users ? (
            <UserNavbar
              id={users.id}
              name={users.name}
              email={users.email}
              role={users.role}
            />
          ) : (
            <Link href={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </Card>
  );
}
