import { Button } from "@/components/ui/button";
import { Heart, List, MapPin, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProfileSidebar() {
  return (
    <div className="flex items-center md:block h-full md:h-[80vh]">
      <Link href={"/profile"}>
        <Button
          variant={"outline"}
          className="md:w-full h-14 flex justify-start md:gap-x-4"
        >
          <User />
          Profile
        </Button>
      </Link>
      <Link href={"/profile" + "/order-history"}>
        <Button
          variant={"outline"}
          className="md:w-full h-14 flex justify-start md:gap-x-4"
        >
          <List />
          Order History
        </Button>
      </Link>
      <Link href={"/profile" + "/favorite"}>
        <Button
          variant={"outline"}
          className="md:w-full h-14 flex justify-start md:gap-x-4"
        >
          <Heart />
          Favorite
        </Button>
      </Link>
      <Link href={"/profile" + "/address"}>
        <Button
          variant={"outline"}
          className="md:w-full h-14 flex justify-start md:gap-x-4"
        >
          <MapPin />
          Address
        </Button>
      </Link>
    </div>
  );
}
