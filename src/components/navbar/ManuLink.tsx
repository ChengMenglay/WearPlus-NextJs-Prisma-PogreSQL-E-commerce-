"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { ListItem } from "./NavLink";
import { useRouter } from "next/navigation";
import { Category } from "../../../types";

type ManuLinkProps = {
  categories: Category[] | null;
};
export default function ManuLink({ categories }: ManuLinkProps) {
  const router = useRouter();
  const availabeProducts: { title: string; href: string }[] = [];
  const list = categories?.map((item) => ({
    title: item.name,
    href: `/shoes/${item.name.toLowerCase().replace(" ", "-")}`,
  }));
  list?.map((list) => availabeProducts.push(list));
  return (
    <NavigationMenu className=" hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => router.push("/shoes")}>
            Shoes
          </NavigationMenuTrigger>
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
          <NavigationMenuLink
            href="/about"
            className={navigationMenuTriggerStyle()}
          >
            About Us
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/stationary-shop"
            className={navigationMenuTriggerStyle()}
          >
            Stationary Shop
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/faq"
            className={navigationMenuTriggerStyle()}
          >
            FAQ
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
