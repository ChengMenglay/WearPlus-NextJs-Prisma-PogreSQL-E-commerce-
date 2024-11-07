import React from "react";
import { Card } from "../ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Search, ShoppingCart } from "lucide-react";
import { ListItem } from "./NavLink";
import UserNavbar from "./UserMenu";
import { Button } from "../ui/button";
import { auth } from "@/auth";
import { getUserInfor } from "@/app/(auth)/actions/authActions";
import Link from "next/link";

const availabeProducts: { title: string; href: string }[] = [
  {
    title: "NIKE",
    href: "/nike",
  },
  {
    title: "Jordan",
    href: "/jordan",
  },
  {
    title: "Adidas",
    href: "/adidas",
  },
  {
    title: "New Balance",
    href: "/new_balance",
  },
];
export default async function Navbar() {
  const session = await auth();
  const users = session?.user && (await getUserInfor());

  return (
    <Card className="w-full h-16 rounded-none flex justify-center px-4">
      <div className=" container h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-black text-xl sm:text-2xl">
          WEARPLUS
        </Link>
        <NavigationMenu className=" hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Available Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] grid-cols-1 lg:w-[600px] ">
                  {availabeProducts.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Streetwear</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] grid-cols-1 lg:w-[600px] ">
                  {availabeProducts.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Stationary Shop
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex space-x-4 items-center justify-center">
          <Search size={18} />
          <ShoppingCart size={18} />
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
