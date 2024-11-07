"use client";
import React from "react";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Separator } from "../ui/separator";

type Props = {
  id: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  role: string | null | undefined;
};
export default function UserNavbar({ id, name, email, role }: Props) {
  const router = useRouter();
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={"/profile"}>
          <User size={20} />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 space-y-2">
        <h1 className="text-md font-bold">My Account</h1>
        <Separator />
        <div className="">
          <span className=" truncate text-sm ">
            <span className="text-muted-foreground">Name: </span> {name}
          </span>
        </div>
        <div>
          <span className=" truncate text-sm">
            <span className=" text-muted-foreground">Email:</span> {email}
          </span>
        </div>
        <Separator />
        {role === "admin" ? (
          <Button className="w-full" onClick={() => router.push(`/dashboard`)}>
            Admin dashboard
          </Button>
        ) : (
          <Button className="w-full" onClick={() => router.push("/profile")}>
            User dashboard
          </Button>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
