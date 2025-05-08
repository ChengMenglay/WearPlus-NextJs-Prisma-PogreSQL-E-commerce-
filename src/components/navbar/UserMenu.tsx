"use client";
import React from "react";
import { BadgeCheck, User } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  id: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  role: string | null | undefined;
};
export default function UserNavbar({ name, email, role }: Props) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/user.png" alt="User" />
            <AvatarFallback>
              {name
                ? name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 rounded-lg shadow-md bg-white z-10">
        <DropdownMenuLabel className="p-2 font-semibold text-lg">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Name:</span>
            <span className="text-sm font-medium truncate">{name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Email:</span>
            <span className="text-sm font-medium truncate">{email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer p-2 rounded-md hover:bg-slate-100 duration-200 flex items-center focus:outline-none focus:bg-slate-100">
              <BadgeCheck className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          {role === "admin" ? (
            <DropdownMenuItem
              className="cursor-pointer p-2 rounded-md hover:bg-slate-100 duration-200 flex items-center focus:outline-none focus:bg-slate-100"
              onClick={() => router.push(`/dashboard`)}
            >
              <User className="mr-2 h-4 w-4" />
              Admin Dashboard
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer p-2 rounded-md hover:bg-slate-100 duration-200 flex items-center focus:outline-none focus:bg-slate-100"
              onClick={() => router.push("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              User Dashboard
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}